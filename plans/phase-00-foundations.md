> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 0 — Foundations

| | |
|---|---|
| **Depends on** | nothing — start here |
| **Unlocks** | every other phase |
| **Screens touched** | none visible (admin data layer `assets/src/services/api.js`, `MemberGlut_App`) |
| **Main files** | `includes/core/*`, `includes/rest/abstract-*`, `memberglut.php`, `assets/src/services/api.js`, `assets/src/components/adminData.js` |


**Goal:** everything later phases need. No visible feature change yet.

### 0.1 Schema & migrations (`MemberGlut_Install`)

Single `memberglut_db_version` with ordered migration callbacks (not “re-run dbDelta when plugin version changes” as today). Run on activation and `admin_init`/`init` if behind; multisite: per-site on `wp_initialize_site`.

Tables (all `{$wpdb->prefix}memberglut_*`, `bigint unsigned` ids):

**`plans`** (alter existing): keep `id, plan_name, plan_slug, plan_description, plan_price, plan_status, plan_order, plan_color, created_at, updated_at`; add
`plan_group varchar(100)`, `plan_type varchar(10)` (free|paid), `billing varchar(20)` (one_time|recurring), `duration_length int`, `duration_unit varchar(10)`, `duration_type varchar(20)` (unlimited|fixed|date|calendar), `end_date date NULL`, `calendar_start char(5)`, `signup_fee decimal(12,4)`, `trial_enabled tinyint`, `trial_length int`, `trial_unit varchar(10)`, `role varchar(100)`, `featured tinyint`, `max_members int`, `settings longtext` (JSON: everything else — features, keep_roles, expire_role, who_can_buy, buy_plans, hide_in_table, allow_upgrade, allow_downgrade, fee_on_change, limit_cycles, cycles, after_cycles, one_trial, gateways, approval, form, redirect, redirect_page, send_welcome, gateway product/price ids per mode). Change money columns to `decimal(12,4)`. Drop use of `plan_billing_cycle`, `plan_duration`, `plan_trial_days`, `plan_capabilities`, `plan_icon` after migration.

**`subscriptions`** (replaces `user_plans`): `id, user_id, plan_id, status, start_date, expires_at NULL, trial_ends_at NULL, canceled_at NULL, next_payment_at NULL, scheduled_plan_id NULL, gateway, gateway_customer_id, gateway_subscription_id, billing_amount, billing_cycles_done, billing_cycles_total, retry_count, coupon_id NULL, source (registration|checkout|admin|import|default_plan|convert), meta longtext, created_at, updated_at`; indexes on `(user_id,status)`, `(plan_id,status)`, `expires_at`, `gateway_subscription_id`.

**`payments`**: `id, user_id, subscription_id, plan_id, type (new|renewal|upgrade|manual|signup_fee), status (pending|completed|failed|refunded), currency, subtotal, discount, signup_fee, tax(0, reserved for Pro), amount, refunded_amount, gateway, transaction_id, coupon_code, note, ip, meta, created_at, updated_at`.

**`coupons`**: `id, code UNIQUE, type (percent|fixed), amount, plans (JSON), recurring tinyint, starts_at, expires_at, max_uses, per_user, new_users_only, enabled, uses, created_at, updated_at`.
**`coupon_uses`**: `id, coupon_id, user_id, email, payment_id, created_at`.

**`rules`**: `id, title, status, priority, note, protect JSON, exclude JSON, include_children, access JSON {who, plans, roles, users}, action, redirect, custom_message, message, teaser, in_lists, created_at, updated_at`.

**`events`** (activity / access / audit log — drives Dashboard recent activity, Member activity tab, Payment drawer log, Tools access log, capability change log): `id, user_id NULL, object_type (subscription|payment|user|rule|role|plan|email|system), object_id NULL, event (grant|revoke|activate|renew|cancel|expire|payment|refund|pending|approve|reject|login_blocked|note|email_sent|cap_change…), message, actor_id (0 = system), data JSON, created_at`.

**`logs`** (debug log): `id, level (debug|info|warning|error), source (subscription|payment|access|email|login|cron|webhook), message, context JSON, created_at`.

**`logins`**: `id, user_id, ip (stored as-is; anonymised by eraser), user_agent, device_label, session_verifier, created_at, last_seen_at, ended_at`.

**`stats_daily`**: `date, metric (paywall_views|paywall_conversions|revenue|new_members|cancellations|active_members), object_id (rule/plan id or 0), value` — PK `(date,metric,object_id)`.

### 0.2 Settings store (`MemberGlut_Settings`)
* `get( $key )` with the **PHP copy of every default** in Settings.jsx `DEFAULTS` and FormsPages.jsx `DEFAULTS` (single source: PHP; React receives defaults from `GET /settings`, so `Settings.jsx DEFAULTS` becomes a fallback only).
* Typed sanitize schema per key (bool, int with min/max as in the UI, enum, url, email, page id exists, role exists, plan exists, html via `wp_kses_post`, tags arrays). Secret keys (`*_secret*`, `*_secret_key`) are never returned in full to the client (return `••••last4` + `has_value`), and an empty submitted value means “unchanged”.
* Action `memberglut_settings_updated( $new, $old )` so consumers can react (flush rewrite on `custom_login_slug`, reschedule on `renewals_engine`, etc.).

### 0.3 REST base
`MemberGlut_REST_Controller` (namespace `memberglut/v1`, permission callback per cap, consistent error format `{code,message,data:{status}}`, pagination headers `X-WP-Total`/`X-WP-TotalPages`), and the `/lookups*` endpoints (00-overview §1.3).

### 0.4 Logger & events
`memberglut_log( $level, $source, $message, $context )` — writes only if `debug_log` is on (and `debug` level only if `log_debug`). `memberglut_event( … )` always writes (it is the audit trail).

### 0.5 Scheduler
`MemberGlut_Scheduler` (00-overview §1.5). Recurring jobs registered here and implemented in later phases:
`memberglut_expiration_sweep` (hourly/daily), `memberglut_reminders` (daily), `memberglut_retry_payments` (daily), `memberglut_bank_renewals` (daily), `memberglut_cleanup_logs` (daily), `memberglut_stats_snapshot` (daily), one-off `memberglut_send_broadcast_batch`, `memberglut_convert_users_batch`, `memberglut_export_batch`.
Switching `renewals_engine` unschedules from one backend and schedules on the other.

### 0.6 Admin app plumbing
* Permission map (00-overview §1.4) in `MemberGlut_App`.
* Localize `lookups`, currency format, enabled gateways, effective test mode, custom fields, email tags.
* Fix `api.js` → real requests, keep the shapes.

**Acceptance:** fresh install creates all tables; upgrade from 1.1.5 migrates (Phase 15) without data loss; `GET /settings` returns defaults; unit tests for settings sanitisation.

---

## Option relations (who depends on what this phase builds)

| Built here | Used by | What breaks if it is wrong |
|---|---|---|
| `plans` table (new columns + `settings` JSON) | P2 Plans, P4 engine, P7 rules (`access.plans`), P8 pricing/picker, P9 checkout & coupons, P12 stats | plan editor fields can't be saved, pricing shows wrong data |
| `subscriptions` table | P4, P6 Members, P7 access (“has access”), P9 renewals, P10 account, P12 stats | nobody gets access |
| `payments`, `coupons`, `coupon_uses` | P9, P6 (spent / LTV), P12 revenue/MRR, P13 export | revenue & LTV wrong |
| `rules` | P7, P2 PlanRules panel, P13 setup export | content not protected |
| `events` | P4/P6/P9 timelines, P12 recent activity, P13 access log, P3 capability log | no audit trail |
| `logs` + `debug_log`/`log_retention_days`/`log_debug` | every phase (webhooks, emails, cron), P13 Logs tab | silent failures |
| `logins` | P11 sessions, P6 Logins tab, P10 activity tab, P11 GDPR eraser | — |
| `stats_daily` | P7 paywall stats, P12 chart | empty charts |
| Settings store `memberglut_settings` (+ PHP defaults) | **all phases** — see Appendix A | options ignored |
| Forms store `memberglut_forms` | P8, P10, P2 (signup URL from `page_register`), §2.2 consumers | broken links |
| Lookups payload | every React screen select (plans, roles, pages, post types, terms, templates, custom fields, email tags, currency format) | screens keep showing demo data |
| Scheduler + `renewals_engine` | P4 expiry, P5 reminders, P6 broadcast, P9 retries/bank renewals, P13 batch jobs & status | members never expire |
| Granular caps (`memberglut_manage_*`) | P3 Roles MemberGlut group, every REST route, `MemberGlut_App::pages()` | editors locked out / over-privileged |

## Step-by-step

- [ ] 1. Create `includes/core/class-memberglut-install.php` with `memberglut_db_version` + ordered migration list; call it on activation, `admin_init`, `init`, and `wp_initialize_site`.
- [ ] 2. Migration #1: create the 9 new tables and alter `plans` (exact columns in “0.1 Schema & migrations” above). Keep legacy tables untouched (P15 migrates them).
- [ ] 3. Repositories: one class per table with `find`, `query(args)` (filters, search, order, paginate), `insert`, `update`, `delete` — all `$wpdb->prepare`.
- [ ] 4. `MemberGlut_Settings`: PHP defaults copied from `Settings.jsx DEFAULTS` + `FormsPages.jsx DEFAULTS`, sanitize schema per key, secret masking, `memberglut_settings_updated` action.
- [ ] 5. `memberglut_log()` + `memberglut_event()` helpers.
- [ ] 6. `MemberGlut_Scheduler` (Action Scheduler via composer, WP-Cron fallback), register the recurring hooks with empty callbacks.
- [ ] 7. Register granular caps; give them to administrators; map `MemberGlut_App::pages()` to caps.
- [ ] 8. `MemberGlut_REST_Controller` base + `/lookups`, `/lookups/{posts,terms,users,pages,templates,authors}`.
- [ ] 9. Localize `memberglut_admin.lookups`, currency format, enabled gateways, effective test mode.
- [ ] 10. Rewrite `services/api.js` bodies to `request()`; create `services/lookups.js` hook (`useLookups()`); `format.js money()` reads currency settings.
- [ ] 11. Remove module-level demo imports from every page (list in 00-overview §1.3) — replace with lookups/async selects. Delete `IS_DEMO` and `demoData.js` at the end of P13 (when the last screen is live).
- [ ] 12. Add composer + autoload (or manual requires) and update `memberglut.php` bootstrap.

## Definition of done
- Fresh install creates every table; `php -l` clean; activation on multisite works.
- `GET /settings`, `GET /lookups` return real data with the right permissions.
- No React screen imports `demoData.js` for option lists.
