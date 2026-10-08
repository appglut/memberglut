> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 4 — Subscription engine

| | |
|---|---|
| **Depends on** | P0, P2 (plans), P3 (roles) |
| **Unlocks** | P5 triggers, P6 admin actions, P7 “has access”, P8 free signups, P9 paid activation, P10 self-service, P12 stats |
| **Screens** | none directly (service layer); Tools “Run expirations now” / “Sync roles” call it |


The heart of the plugin. Everything that grants/removes access goes through **`MemberGlut_Subscription_Service`** — admin actions, checkout, webhooks, scheduler, imports.

### 4.1 API
```
create( user_id, plan_id, args )      // status, start, expires (plan|never|date), source, gateway, trial, coupon, send_email
activate( sub ) · renew( sub, payment ) · cancel( sub, by, immediately? ) · expire( sub, reason )
put_on_hold( sub ) · change_plan( sub, new_plan, mode: upgrade|downgrade|admin ) · update_dates( sub, start, expires )
abandon( sub ) · delete( sub )
user_has_access_to_plan( user_id, plan_id ) · get_user_active_plan_ids( user_id ) · get_user_subscriptions( user_id )
```
Every transition: validates the state machine (§2.7), updates `updated_at`, writes an `events` row, fires `memberglut_subscription_status_changed( $sub, $old, $new )` and specific hooks (Appendix C), triggers emails (Phase 5) and role sync.

### 4.2 Role sync (`MemberGlut_Role_Sync`)
* On access gain: add/set plan role per `keep_roles`; record in user meta `memberglut_role_sources[role] = [sub ids]` and whether the user already had the role before (`pre_existing`).
* On access loss: remove the plan role only if no other access-granting subscription lists it **and** it wasn’t pre-existing; apply `expire_role`; fallback to WP `default_role` if no roles left.
* Never touch users with `manage_options`.
* Tools › “Sync roles with plans” = recompute for all users from scratch (batched).

### 4.3 Expiry computation
`memberglut_calculate_expiry()` (Phase 2) for one-time/free plans; recurring plans: `expires_at` = current period end (= `next_payment_at`), extended on every renewal.

### 4.4 Scheduled jobs (implement the Phase 0 hooks)
* **Expiration sweep:** `canceled` with `expires_at` ≤ now → `expired`; `active` non-recurring with `expires_at` ≤ now → `expired`; `trialing` past `trial_ends_at` without gateway → depends on payment (manual plans: create pending renewal payment); scheduled downgrades (`scheduled_plan_id`) applied at period end; limited-cycle plans finished.
* **Bank renewals** (D8), **payment retries** (D6) — Phase 9 fills the gateway parts.
* Engine choice: `renewals_engine` (Action Scheduler hourly vs WP-Cron daily).
* Tools › “Run expirations now” calls the sweep synchronously.

### 4.5 Default plan
`user_register` (priority 20, runs for users created by any plugin): if `default_plan` set and the user has no subscription created in the same request (e.g. our registration form already assigned one) → `create( source=default_plan )`.

### 4.6 PHP API for developers (free_features “PHP API”)
`memberglut_get_member( $user_id )->has_plan( $id|$slug )`, `->get_plans()`, `->add_plan( $id, $args )`, `->remove_plan( $id )`, `memberglut_user_has_access( $post_id, $user_id )`. Keep the existing functions in `functions.php` working (re-implement on top of the service).

**Acceptance:** state-machine unit tests for every transition; role sync never removes pre-existing roles; expiry dates correct for all four duration types and DST/timezone (store UTC, display site TZ).

---

## Option relations

| Engine behaviour | Driven by option | Defined in |
|---|---|---|
| Expiry date | plan `duration_type` / `duration` / `end_date` / `calendar_start` | P2 |
| Role on activation / end | plan `role`, `keep_roles`, `expire_role`; WP `default_role` fallback | P2, P3 |
| New-user plan | `default_plan` | P1 (D3/D4) |
| `canceled` keeps access? | `cancel_access` | P1 Member account |
| Status during retries | `retry_status`, `retry_max` | P1 Payments › Renewals (D6) |
| Full refund ends access | `refund_revokes` | P1 Payments › Renewals |
| Bank renewal flow | `bank_activate` (+ D8) | P1 Payments › Bank |
| Downgrade timing | D17 | — |
| Cycle limit | plan `limit_cycles`, `cycles`, `after_cycles` | P2 |
| Trial | plan `trial*`, `one_trial` | P2 |
| Pending until approved | `approval` / plan `approval` | P1 / P2 (§2.1) |
| Engine schedule | `renewals_engine` | P1 Advanced |
| Emails sent on transitions | each email `enabled`, plan `send_welcome` | P5 |
| Access statuses used by rules | §2.7 table | — |

## Step-by-step

- [ ] 1. `MemberGlut_Subscription` model + status constants + allowed transitions table.
- [ ] 2. `MemberGlut_Subscription_Service` methods (“4.1 API” above) — each: validate, persist, event, hook, email trigger placeholder, role sync.
- [ ] 3. `MemberGlut_Role_Sync` with `memberglut_role_sources` and `pre_existing` tracking.
- [ ] 4. `user_has_access_to_plan()` / `get_user_active_plan_ids()` with per-request cache.
- [ ] 5. Scheduled jobs: expiration sweep, scheduled downgrades, cycle completion.
- [ ] 6. `user_register` default plan (priority 20, skip if already assigned in the request).
- [ ] 7. Developer API (`memberglut_get_member()`), re-implement `functions.php` helpers on top.
- [ ] 8. Unit tests: every transition, role sync edge cases, timezone/DST expiry.

## Definition of done
- No code outside this service writes `subscriptions` directly.
- Roles always match access after any transition; Tools sync is idempotent.
