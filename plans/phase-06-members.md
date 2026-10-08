> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 6 — Members & Member detail

| | |
|---|---|
| **Depends on** | P4 (all actions go through the service), P5 (emails), P2 (plans) |
| **Unlocks** | admin operations; P12 counts reuse its queries |
| **Screens** | Members (`Members.jsx`), Member detail (`MemberDetail.jsx`); optional Users list column |


### 6.1 Members list
* `GET /members?status=&plan=&gateway=&search=&orderby=&order=&page=&per_page=` — **server-side** filtering/sorting/pagination (UI filters client-side; switch the Table to remote mode). Row = subscription (D1) joined with user (name, email, username), plan (name, color), `total_spent` (sum completed payments of the user), `last_login`.
* `GET /members/counts` for status tabs and stat cards (All, Active+trialing, trialing, pending, expired+canceled).
* Read `?plan=` and `?add=1` from the URL on load (`add` already handled).
* Row actions: View (`member_detail?user=`), Approve (pending) / Email (`mailto:`), Remove (`DELETE /subscriptions/{id}` — keeps WP user and payments).
* Row menu: Change plan (modal: plan select → `change_plan` admin mode), Extend expiry (modal: +N days / to date), Cancel subscription (keep access until end, per `cancel_access`), Edit WordPress user (`user-edit.php?user_id=`). **The menu currently shows a toast — build the modals.**
* Bulk (`POST /members/bulk {action, ids, args}`): approve, change plan (modal), extend (modal), email (opens Email modal preselected), expire now, remove. Large selections run as background batches.
* Export: `GET /members/export?…same filters` → CSV (streamed; batched via scheduler above ~2,000 rows with a download link when ready). Columns: user id, username, email, first/last name, plan, status, start, expires, gateway, total spent, last login, custom fields (Tools option), consent date.

### 6.2 Add member modal (`POST /members`)
* `who=existing`: user search (`/lookups/users`), `who=new`: first/last name, email (unique, honours whitelist/blacklist? **No** — admin bypasses), username (empty → derived from email, unique).
* `plan_id`, `status` (active|trialing|pending|on_hold), `start`, `expiry` (plan → `calculate_expiry`, never → NULL, date → `expiry_date`).
* `send_email`: new user → `wp_new_user_notification` replaced by our `register` email with set-password link (`get_password_reset_key`); existing user → `activated` email.
* Source = `admin`; event “Admin added X to Plan manually”.

### 6.3 Email members modal (`POST /members/broadcast`)
Filters plans (empty = all), statuses (default active+trialing) **or** explicit `ids` when preselected; subject/body with tags; queued in batches (e.g. 50 per action) via scheduler, uses the email wrapper; result logged as event; rate-safe.

### 6.4 Member detail (`GET /members/user/{user_id}`)
* Hero: approve (if account pending), email, edit user, **Add plan** (same modal as edit with empty sub).
* Subscriptions: one card **per subscription** (D1) with Manage menu: change plan, change dates, cancel (keep access), expire now → `PATCH /subscriptions/{id}` / actions. Next payment = `next_payment_at` + `billing_amount` for recurring active. “Role given” = plan role.
* Tabs: Payments (`GET /payments?user=`), Activity (`GET /events?user=`), Logins (`GET /logins?user=` with “Active now” from WP session tokens).
* Profile: user id, roles (all), registered, last login (`memberglut_last_login` set on `wp_login`), lifetime value, **custom fields from Forms config**, consent records.
* Admin notes: `GET/POST/DELETE /members/user/{id}/notes` (user meta `memberglut_notes` [{id, author_id, text, date}]), author shown as display name.
* Account: Send password reset (`retrieve_password( $user_login )` → our email), Log out everywhere (`WP_Session_Tokens::get_instance($id)->destroy_all()` + mark logins ended), Remove memberships (all subs → `delete`, roles synced).
* Edit-subscription modal (plan, status, start, expires) with D18 warning for gateway subs.

**Acceptance:** all list actions/bulk actions persist and are logged; counts match; export opens in Excel (UTF-8 BOM); notes are admin-only.

---

## Option relations

| Action / data | Depends on | Section |
|---|---|---|
| Status tabs & counts | subscription statuses §2.7 (+ hidden `abandoned`) | P4 |
| Approve / reject / pending card | approval flow §2.1; emails approved/rejected | P8, P5 |
| Add member → expiry “From the plan” | plan duration fields | P2 |
| Add member → send email | `register` (new user) / `activated` (existing) | P5 |
| Change plan / extend / cancel / expire | service + D17/D18; `cancel_access` | P4, P1 |
| Remove membership | role sync | P4 |
| Email members | sender settings, tags, scheduler batches | P5, P0 |
| Export CSV | Forms custom fields (“include custom fields” in Tools) | P8, P13 |
| Logins tab, Log out everywhere | `logins` table, sessions | P11 |
| Profile card custom fields, consent | Forms `reg_fields`, Agreements | P8, P11 |
| Payments tab, LTV | payments | P9 |
| `?plan=` filter link | Plans list member count | P2 |

## Step-by-step

- [ ] 1. `GET /members` server-side (D1 row = subscription), `GET /members/counts`; switch Table to remote pagination/sort.
- [ ] 2. Read `?plan=`, `?status=` on load.
- [ ] 3. Row actions + row menu modals (change plan, extend, cancel) — replace toasts.
- [ ] 4. Bulk endpoint + background batches for large selections.
- [ ] 5. Add member endpoint (existing/new user, username generation, expiry modes, email).
- [ ] 6. Broadcast endpoint + batch job.
- [ ] 7. Export CSV (UTF-8 BOM, streaming/batch).
- [ ] 8. Member detail by `user_id`: all subscriptions, payments/activity/logins tabs, profile (custom fields), notes CRUD, account actions, edit-subscription modal with D18 warning.
- [ ] 9. (Appendix E) Users list “Membership” column + plan filter.

## Definition of done
- Every button changes real data, logs an event, and the counts update.
