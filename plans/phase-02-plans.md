> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 2 — Membership Plans

| | |
|---|---|
| **Depends on** | P0, P1 (currency format, gateways enabled), P3 for the role list (can use lookups of WP roles earlier) |
| **Unlocks** | P4 engine, P6 members, P7 rules (plan selector), P8 pricing/picker, P9 checkout & coupons |
| **Screens** | Plans (`Plans.jsx`), Plan editor (`PlanEditor.jsx`) |


### 2.1 Backend
* `MemberGlut_Plan` model ↔ table + `settings` JSON; REST `GET/POST /plans`, `GET/PUT/DELETE /plans/{id}`, `POST /plans/{id}/duplicate`, `PATCH /plans/{id}/status`, `PUT /plans/order` (group reorder), `GET /plans/{id}/rules`.
* List payload adds computed `members` (subscriptions with access status), `revenue` (completed − refunded), `sold_out`, `signup_url` (built from `page_register` permalink + `?plan=slug`).
* Slug: unique, `sanitize_title`, generated from name when empty; changing a slug warns that old signup links break.
* Validation: name required; price > 0 for paid; recurring requires `duration` ≥ 1; `end_date` in the future for `duration_type=date`; `calendar_start` valid `MM-DD`; `cycles` 2–120; role must exist; gateways ⊆ known gateways.

### 2.2 Plan editor — every field

| Section | Field | Behaviour to implement | Also affects |
|---|---|---|---|
| General | `name` | Shown in admin, pricing table, checkout, emails `{plan_name}` | Emails, account |
| | `slug` | `?plan=` signup links, `[memberglut_buy plan=]`, `[memberglut_expiry plan=]`, `[memberglut_register plan=]` | Shortcodes |
| | `description` | Pricing table + checkout summary | Forms › pricing |
| | `features` (tags) | Stored in `settings.features`; pricing table bullets; comparison layout union | Forms › `pricing_features`, `pricing_layout=compare` |
| | `status` | Inactive = not purchasable (checkout rejects, hidden from pricing/plan picker), existing subs untouched | Rules editor plan list (show “inactive” tag), Settings `default_plan` (only active) |
| | `color` | Admin pills, pricing accent | Members/Plans/Dashboard |
| | `featured` | “Most popular” ribbon in pricing table | Forms › pricing |
| Pricing | `type` free/paid | Free: no gateway, price 0, activates immediately (subject to approval) | Checkout, coupons (only paid plans) |
| | `billing` one_time/recurring | Recurring creates gateway subscriptions; one-time = single payment + access length | Access length section visibility |
| | `price` | Amount in store currency (`decimals`, zero-decimal currencies) | Payments, coupons, MRR |
| | `duration` (bill every) | Billing interval; for gateways: Stripe `interval`/`interval_count`, PayPal `frequency` | `next_payment_at` |
| | `limit_cycles`, `cycles`, `after_cycles` | Count `billing_cycles_done` on each successful renewal; at N → cancel gateway sub; `keep` = status active, `expires_at` NULL; `expire` = expire at period end | Subscription engine, account display “3 of 12 payments” |
| | `signup_fee` | Added to first payment (Stripe `add_invoice_items`, PayPal `setup_fee`, one-time: added to amount); charged again on plan change only when `fee_on_change` | Pricing display “+ fee”, coupons (Decision: coupon does not discount the fee) |
| | `trial`, `trial_length` | Status `trialing`, `trial_ends_at`; Stripe `trial_period_days`/`trial_end`, PayPal trial billing cycle; card still collected (SetupIntent) | Email `trial_ending`, Dashboard |
| | `one_trial` | User meta `memberglut_used_trial`; checkout drops the trial when set | Checkout |
| | `gateways` | ∩ globally enabled gateways; editor shows a warning chip for selected-but-disabled gateways | Checkout |
| Access length | `duration_type` unlimited/fixed/date/calendar (only non-recurring) | `memberglut_calculate_expiry( $plan, $start )`: unlimited → NULL; fixed → +length unit; date → `end_date` 23:59 site TZ; calendar → next occurrence of `calendar_start` after start (join 2026-10-08, start 01-01 → 2027-01-01) | Members “Expires”, Add member “From the plan’s duration”, emails `{expiration_date}` |
| | `duration`, `end_date`, `calendar_start` | as above | |
| Access & role | `role` | Role added on activation (Phase 4) | Roles screen counts, rules `who=roles` |
| | `keep_roles` | On → `add_role`; off → `set_role` (never for administrators / `manage_options`) | Role sync |
| | `expire_role` | On end: remove plan role (only if no other active sub grants it and the user didn’t have it before), then add `expire_role`; if user ends with no role → WP `default_role` | Role sync |
| | `who_can_buy` anyone/new/members + `buy_plans` | Checked at checkout and when rendering buy buttons/pricing (“Members only” label). `new` = user never had any subscription (guests OK) | Checkout, pricing table |
| | `max_members` | Count subscriptions in access statuses + pending; ≥ limit → “Sold out” in pricing, checkout rejects (race-safe re-check inside the checkout transaction) | Pricing table |
| | `hide_in_table` | Excluded from `[memberglut_plans]` and the registration plan picker even if listed in `pricing_plans`; still reachable by `?plan=` link | Forms › pricing, register |
| | *PlanRules panel* | `GET /plans/{id}/rules`; “Protect content for this plan” → rule editor `?plan=id` (already pre-fills) | Rules |
| Upgrades | `group` | Distinct groups (D14); one plan per user per group (buying another plan in the group = change) | Account, checkout, Plans upgrade-path cards |
| | `order` (UpgradeOrder) | Saves `plan_order` for **all** plans in the group (`PUT /plans/order`) | Plans list path cards |
| | `allow_upgrade`, `allow_downgrade` | AND-ed with Settings `allow_change` / `allow_downgrade` | Account buttons, pricing `pricing_current` |
| | `fee_on_change` | Signup fee on plan change | Checkout |
| Sign-up | `form` | Only “Default” unless filter adds forms (D2) | Registration |
| | `approval` inherit/auto/email/admin | Overrides global approval (§2.1) | Approval service |
| | `redirect` inherit/page + `redirect_page` | §2.4 precedence | Redirect resolver |
| | `send_welcome` | Skip the `activated` email for this plan when off (the email’s global toggle still applies) | Emails |
| | signup link / buy button | Built from real `page_register` permalink, not `/register/` | Forms |

### 2.3 Plans list
Toggle status (`PATCH`), duplicate (D15), copy signup link (real URL), delete (D16, Popconfirm already disables when members > 0 — also enforce server-side), member count links to `members?plan=id` (**Members page must read the `plan` query arg on load**), revenue, card view, upgrade-path card per group (drag order lives in each plan’s Upgrades tab).

### 2.4 Default plans
Keep creating Free/Basic/Pro/Premium on first install (migrated to new columns), but **only if the table is empty and no legacy data exists**; make them `inactive` except Free? → Recommendation: create only “Free” active + the 3 paid as inactive examples, to avoid selling unconfigured plans.

**Acceptance:** create/edit/duplicate/delete/reorder plans; all field rules enforced server-side; signup URL correct with any permalink structure.

---

## Option relations — plan fields that reach other sections

| Plan field | Reaches | Rule to respect |
|---|---|---|
| `slug` | signup URL (`page_register` + `?plan=`), shortcodes `plan=` | changing slug breaks old links → warn |
| `status` | P8 plan picker & pricing (hidden), P9 checkout (rejected), P7 rule plan selector (show “inactive” tag), P1 `default_plan` options | existing subscriptions unaffected |
| `type`, `billing`, `price`, `duration` | P9 pricing maths & gateway products/prices, P12 MRR, P5 tags `{plan_price}` `{plan_duration}` | price change → new gateway price, old subs keep old price |
| `limit_cycles`, `cycles`, `after_cycles` | P4 cycle counting, P9 gateway cancel, P10 “3 of 12 payments” | — |
| `signup_fee`, `fee_on_change` | P9 order summary, P10 plan change | coupon does not discount the fee |
| `trial`, `trial_length`, `one_trial` | P4 `trialing`, P5 `trial_ending`, P9 Stripe/PayPal trial | recurring only |
| `gateways` | P9 checkout methods ∩ Settings enabled gateways | warn on disabled gateway |
| `duration_type`, `duration`, `end_date`, `calendar_start` | P4 `calculate_expiry`, P6 Add member “From the plan's duration”, P5 `{expiration_date}` | non-recurring only |
| `role`, `keep_roles`, `expire_role` | P4 role sync, P3 role delete guard + user counts | admins never changed |
| `who_can_buy`, `buy_plans` | P9 checkout guard, P8 pricing/buy button labels | `buy_plans` cleared when a plan is deleted |
| `max_members` | P8 “Sold out”, P9 race-safe guard | counts access statuses + pending |
| `hide_in_table` | P8 pricing & plan picker (overrides Forms `pricing_plans`) | link still works |
| `featured`, `color`, `features`, `description` | P8 pricing table, admin pills | — |
| `group`, `order` | P10 upgrade/downgrade, P8 `pricing_current` buttons, Plans path cards, one plan per group (P9) | — |
| `allow_upgrade`, `allow_downgrade` | P10 + P8 buttons | AND with Settings `allow_change`/`allow_downgrade` (§2.13) |
| `form` | P8 registration | default only in free (D2) |
| `approval` | P8 approval service | overrides Settings `approval` (§2.1) |
| `redirect`, `redirect_page` | P8 redirect resolver | precedence §2.4 |
| `send_welcome` | P5 `activated` email | email global toggle still applies |
| Plan delete | rules, coupons, Forms `pricing_plans`, Settings `default_plan`, other plans `buy_plans`, post meta | D16 |

## Step-by-step

- [ ] 1. `MemberGlut_Plan` model: map columns + `settings` JSON ↔ the React shape in `PlanEditor.jsx NEW_PLAN`.
- [ ] 2. REST: list (with `members`, `revenue`, `sold_out`, `signup_url`), get, create, update, delete, duplicate, status, order, rules.
- [ ] 3. Server validation (see “2.1 Backend” above), slug uniqueness/generation.
- [ ] 4. `memberglut_calculate_expiry()` helper + unit tests for 4 duration types.
- [ ] 5. Plan editor: role options from lookups (P3), group select with “+ New group” (D14), `UpgradeOrder` from real plans and `PUT /plans/order`, `PlanRules` from `GET /plans/{id}/rules`, gateway warning chip, signup link from `signup_url`.
- [ ] 6. Plans list: toggle → `PATCH`, duplicate with “also add to rules” dialog (D15), copy real signup link, delete guard (D16, server enforced), member link `members?plan=id`.
- [ ] 7. Delete cascade: remove plan id from rules/coupons/forms/settings/other plans (D16).
- [ ] 8. Default plans on first install (Free active, others inactive examples) only when no legacy data.
- [ ] 9. Fire `memberglut_plan_saved` / `memberglut_plan_deleted`.

## Definition of done
- All 40 editor fields persist and reload; conditional `show()` fields match server validation.
- Signup URL correct with plain and pretty permalinks.
