> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# 0. Audit summary

### 0.1 What exists

| Layer | State |
|---|---|
| **React admin** (15 screens, Vite → `resources/`) | Complete **design stage**. Every screen reads demo data from `services/demoData.js`. Saves are simulated (`services/api.js`, `IS_DEMO = true`); settings/forms/emails persist only to `localStorage`. |
| **REST API** `memberglut/v1` | **Does not exist.** `rest_url` is localized and `api.request()` is ready, but no `register_rest_route` anywhere. |
| **PHP — plans** (`class-memberglut-db.php`) | Tables `memberglut_plans`, `memberglut_user_plans`, `memberglut_plan_features`; CRUD helpers. Schema is much smaller than the UI (no group, type, billing, trial unit, role, signup fee…). |
| **PHP — access control** (`class-memberglut-access-control.php`) | Per-post role restriction via `_memberglut_required_roles` meta, whole-site login wall, content/excerpt/title/REST/feed/search/menu/widget/comment filters. Role-based only, no plans, no rules engine. |
| **PHP — forms** (`class-memberglut-forms.php`) | `[memberglut_login_form]`, `[memberglut_register_form]`, AJAX login/register, wp-login override via slugs. Uses WP `users_can_register`. |
| **PHP — roles/caps** | Create/update/delete roles (AJAX), capability registry option, capability log option, `user_has_cap` passthrough filter. No deny state. |
| **PHP — classic admin** (`class-memberglut-admin.php`, 2,360 lines) | Old screens, disabled when React admin is on (`memberglut_use_react_admin` filter, default true). Still registers the post metabox + settings + AJAX plan handlers. |
| **Legacy tables** | `memberglut_user_memberships`, `memberglut_custom_roles`, `memberglut_access_restrictions` (created by `MemberGlut_Main::create_tables`, mostly unused). |
| **Front-end JS** (`assets/js/frontend.js`) | jQuery; **hijacks any login form on any page** (fallback block). Enqueued on every page. Must be replaced. |
| **Payments, coupons, emails, account area, logs, scheduler, security, GDPR** | **Nothing** in PHP. |

### 0.2 Screens and their options (inventory used by this plan)

| Screen | File | Options / actions to implement |
|---|---|---|
| Dashboard | `Dashboard.jsx` | 4 stat cards, revenue/members chart (12 months), MRR, setup checklist (5), members by plan, recent activity, shortcode card, quick actions |
| Members | `Members.jsx` | stat cards, status tabs (6 statuses), search, plan filter, gateway filter, CSV export, row actions (view, approve/email, remove), row menu (change plan, extend, cancel, edit WP user), bulk (approve, change plan, extend, email, expire, remove), **Add member** modal (existing/new user, plan, status, start, expiry plan/never/date, send email), **Email members** modal (plans, statuses, subject, body) |
| Member detail | `MemberDetail.jsx` | hero actions (approve, email, edit user, add plan), subscription card + manage (change plan, change dates, cancel, expire), payments/activity/logins tabs, profile card, admin notes, account actions (password reset, log out everywhere, remove memberships), edit-subscription modal |
| Plans | `Plans.jsx` | upgrade-path cards per group, status filter, table/card view, toggle active, duplicate, copy signup link, delete (blocked with members), member count link, revenue |
| Plan editor | `PlanEditor.jsx` | **6 sections, 40 fields** (see Phase 2) |
| Content rules | `ContentRules.jsx` | 4 stat cards, rules table (search, duplicate, delete, active toggle, priority sort), “Locked one by one” tab, tiles (blocks, menus, shortcode) |
| Rule editor | `RuleEditor.jsx` | **5 sections**: rule meta, protect/except target lists (10 target types), who can access (4 modes + extra users), what others see (5 actions, message, teaser, list behaviour), live access tester |
| Roles & capabilities | `Roles.jsx` | role list, tri-state caps (grant / not set / deny), cap groups, search, grant-all/clear per group, add custom cap, add role (clone), clone role, make default, delete role, import/export JSON, options *Multiple roles per user* and *Admin rescue link* |
| Payments | `Payments.jsx` | stat cards, status tabs, search, method filter, date range, totals row, drawer (mark paid, refund, resend receipt, log), CSV export, add manual payment |
| Coupons | `Coupons.jsx` | list (copy code, usage bar, validity, status), drawer (code + generate, % / fixed, amount, plans, first/every payment, starts, expires, total uses, per member, new customers only, enabled), CSV import, delete |
| Emails | `Emails.jsx` | 23 emails in 4 groups, on/off per email, subject, heading, body, reminder days (3 emails), smart tags, preview, send test, restore default, link to sender settings |
| Forms & Pages | `FormsPages.jsx` | 6 page slots (+create missing / create one), registration form (title, button, plan picker, login link, AJAX, field builder with custom fields), login form (6), profile form (2), pricing table (7 + live preview), shortcode reference (16) |
| Global settings | `Settings.jsx` | **11 sections, ~120 options** (General, Content restriction, Login & registration, Redirects + per-role redirects, Member account, Payments [General/Stripe/PayPal/Bank/Renewals], Email settings, Security, Captcha, Privacy & GDPR, Advanced) |
| Data & Logs | `Tools.jsx` | export members, convert users → members, setup export/import, logs (+ retention settings), access log, system status, 6 maintenance tasks |
| Pro features | `ProFeatures.jsx`, `proFeatures.js` | marketing list only (Pro is a separate plugin) |


## 1. Architecture decisions

### 1.1 Directory layout (new)

```
includes/
  core/            class-mg-install.php (schema+migrations), class-mg-settings.php, class-mg-logger.php,
                   class-mg-events.php, class-mg-scheduler.php, class-mg-capabilities-map.php, functions-*.php
  models/          class-mg-plan.php, class-mg-subscription.php, class-mg-payment.php, class-mg-coupon.php,
                   class-mg-rule.php, class-mg-member.php (user wrapper)
  repositories/    one per table (query builders, all $wpdb->prepare)
  services/        class-mg-subscription-service.php, class-mg-role-sync.php, class-mg-access.php (decision engine),
                   class-mg-checkout.php, class-mg-pricing.php (amount maths), class-mg-mailer.php,
                   class-mg-redirects.php, class-mg-approval.php, class-mg-sessions.php, class-mg-stats.php
  gateways/        abstract-mg-gateway.php, class-mg-gateway-stripe.php, class-mg-gateway-paypal.php,
                   class-mg-gateway-bank.php, class-mg-gateway-manual.php, class-mg-gateway-free.php
  rest/            abstract controller + one controller per resource (Appendix B)
  frontend/        shortcodes, blocks (server render), account area, forms handlers, templates loader
  admin/           post/term metabox + block-editor sidebar, user profile fields, nav-menu fields, notices
  integrations/    privacy (exporter/eraser), cache plugins, site health
templates/         overridable front-end templates (yourtheme/memberglut/…)
blocks/            block.json + editor JS per block (built by Vite as extra entries)
assets/src/        (existing React admin) + new `frontend/` entry (checkout, account, forms JS — vanilla or Preact, no jQuery)
```

Keep `MemberGlut_*` class prefix for new classes too (`MemberGlut_Subscription`…) to match the codebase; the `mg` above is just shorthand.

### 1.2 Storage model

| Data | Storage | Why |
|---|---|---|
| Global settings (Settings.jsx `DEFAULTS`) | one option `memberglut_settings` (array, autoload) | one REST read/write, matches the screen |
| Forms & pages config (FormsPages.jsx `DEFAULTS`) | option `memberglut_forms` | separate screen, separate save |
| Email templates | option `memberglut_emails` (keyed by email key) — defaults live in PHP, only overrides are stored | “Restore default” = delete the override |
| Role extras (deny lists, rescue/multi-role toggles) | denies stored in the WP role array as `false` + option `memberglut_role_options` | WP-native, survives plugin deactivation harmlessly |
| Custom capability registry | option `memberglut_registered_capabilities` (exists) | |
| Plans, subscriptions, payments, coupons, coupon uses, rules, events, logs, login history, daily stats | **custom tables** (Phase 0) | volume + filtering + reporting |
| Per-post restriction | post meta `_memberglut_access` (JSON) | migrate `_memberglut_required_roles` |
| Per-term restriction (optional, see Appendix E) | term meta `_memberglut_access` | |
| User-level data | user meta: `memberglut_account_status`, `memberglut_activation_key`, `memberglut_pending_email`, `memberglut_used_trial`, `memberglut_consents`, `memberglut_notes`, `memberglut_last_login`, `memberglut_role_sources`, custom field keys, gateway customer ids | |

### 1.3 Admin data flow

* All screens talk to **REST `memberglut/v1`** with `X-WP-Nonce` (already wired in `api.request()`).
* Replace every function body in `services/api.js` with `request()` — the screens keep their signatures (Appendix B lists each).
* **Remove module-level demo imports from pages.** Today `PlanEditor`, `RuleEditor`, `ContentRules`, `Members`, `MemberDetail`, `Payments`, `Coupons`, `Settings`, `FormsPages`, `Tools` build their `<Select>` options from `PLANS`, `ROLES`, `PAGES`, `RULES`, `MEMBERS`, `PAYMENTS`, `ACTIVITY` at import time. Add a **lookups** payload localized by PHP into `memberglut_admin.lookups` (plans, roles, pages, post types, taxonomies, page templates, groups, gateways enabled, currency format, custom fields, email tags) plus `GET /lookups` to refresh after edits. Pages read lookups instead of demo constants.
* Hard-coded placeholders to replace with live data: `RuleEditor` `POST_TYPES/POSTS/TERMS/ARCHIVES/authors/templates`; `ContentRules` `PER_POST` and stat numbers; `MemberDetail` notes, logins, activity, phone, consent; `Tools` `Status` checks/env/counts; `Emails` `SAMPLE`/`DEFAULT_BODY`; `Dashboard` checklist.
* Post/term/user pickers must be **async search selects** (`GET /lookups/posts?search=`, `/lookups/terms`, `/lookups/users`), not static lists.
* `format.js` `money()` must use the currency settings (currency, position, separators, decimals) from lookups.
* Delete `IS_DEMO`, `demoData.js` (keep shapes as JSDoc in `api.js`).

### 1.4 Permissions

Introduce granular caps (already present in demo cap group): `memberglut_manage_members`, `memberglut_manage_plans`, `memberglut_manage_rules`, `memberglut_view_payments` (+ `memberglut_manage_payments` for refunds/mark paid), `memberglut_manage_settings`, `memberglut_manage_roles`. Administrators get all on activation/upgrade. Map each admin page (`MemberGlut_App::pages()` currently uses `manage_options` for all) and each REST route to its cap.

### 1.5 Background work

Bundle **Action Scheduler** (composer `woocommerce/action-scheduler`, loaded only if not already present) as the default engine (`renewals_engine = action_scheduler`), with a WP-Cron fallback (`wp_cron`, daily). One abstraction `MemberGlut_Scheduler::schedule($hook, $args, $when)` so the setting just swaps the backend.

### 1.6 Coding rules (from `Errors_from_team.txt` — WP.org rejections)

Every new handler: nonce/REST permission callback + capability check, `sanitize_*` on input, `esc_*`/`wp_kses_post` on output, `$wpdb->prepare` on every query, prefixed names, enqueue (no inline `<script>`), no remote assets except declared third-party services (Stripe.js, PayPal SDK, captcha) which must be listed in readme “External services”. **No feature in free may be locked behind Pro checks** (guideline 5).
