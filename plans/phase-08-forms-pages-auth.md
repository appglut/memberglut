> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 8 — Forms & Pages, front-end auth

| | |
|---|---|
| **Depends on** | P1 (login/registration/redirect/security options), P2 (plans), P4 (free activation), P5 (emails) |
| **Unlocks** | P9 checkout (shares the register form), P10 account, page-slot consumers in every phase (§2.2) |
| **Screens** | Forms & Pages (`FormsPages.jsx`); front-end register/login/lost-password/pricing; wp-login.php |


### 8.1 Pages
* `GET/PUT /forms` (FormsPages config). Page slots store page IDs; validate page exists and is published.
* “Create missing pages” / per-slot “Create”: `POST /forms/pages/create {slots[]}` → `wp_insert_post` with the matching **block** (or shortcode in classic sites), title from the slot label, saves IDs, returns new IDs (UI currently fakes IDs 11+i / 99).
* Warn if a selected page doesn’t contain its shortcode/block.
* Dashboard checklist + System status read these.

### 8.2 Registration & checkout form (`[memberglut_register plan=""]`, block)
* Fields from `reg_fields`: order, label, required, show; locked email/password always on; username off → generate from email; `password_confirm` match; custom field types (text, textarea, email, url, tel, number, date, select, radio, checkbox, country, hidden) with `options` (one per line); key validation (`^[a-z0-9_]+$`, unique, not reserved: `user_login`, `user_pass`, `user_email`, `role`, WP core meta keys, `memberglut_*`).
* Custom fields: saved as user meta; shown/editable on WP user profile screen; Member detail; export; `{field:key}`; GDPR export.
* Text: `reg_title`, `reg_button`; `reg_show_login_link` → link to `page_login` (hidden when `allow_registration` off? no—login link is fine).
* Plan picker: `plan_picker` cards/radio/select listing active, non-hidden, purchasable plans (respects `who_can_buy`, `max_members`); hidden when `?plan=slug` or `plan` attribute is set; logged-in users see only account-less checkout (account fields skipped).
* Auto-appended: payment section for paid plans (Phase 9), coupon field, Agreements (§2.14), captcha (if `register` or `checkout` in `captcha_on`), honeypot (`honeypot`), password strength meter (`password_min`, `password_strength`) and show/hide toggle (`show_password_toggle`).
* `reg_ajax`: submit via REST `POST /public/register` (nonce, works logged-out) with inline errors; non-JS fallback POST handled on `template_redirect` (both share one handler).
* Server checks in order: `allow_registration` (off → form replaced by message; admins still add members), honeypot, captcha, whitelist/blacklist (`@domain` entries = domain match, others exact, case-insensitive; blacklist wins), email unique, username unique/valid, password policy, required fields, agreements, plan purchasable, coupon valid.
* Create user with WP `default_role` (then role sync applies plan role) → consents stored → approval (§2.1) → free plan: subscription created (`active` or `pending`) / paid: checkout (Phase 9) → `register` email → auto-login if `auto_login` and active → redirect (§2.4) → paywall conversion tracking.

### 8.3 Approval flows (`MemberGlut_Approval`)
* `email`: account status `pending_email`, activation key (hashed, 48h), `activation` email with `{activation_link}` → landing on `page_login?mg_activate=…` → status `approved`, pending subs (not awaiting payment) activated, optional auto-login; “Resend activation email” link in the login error.
* `admin`: status `pending_admin`, `pending_review` + `admin_pending_review` emails; Members approve/reject (single & bulk) → `approved` / `rejected` emails; rejected users can’t log in (option to delete — keep manual).
* `authenticate` filter (priority 30) blocks non-approved accounts with a clear message, for our login **and** wp-login.php.
* Existing users at upgrade time are treated as `approved` (no meta = approved).

### 8.4 Login (`[memberglut_login redirect=""]`, block)
`login_with` both/email/username (enforced in our form handler; also optionally on wp-login via `authenticate` when `replace_wp_pages` on), `login_title`, `login_button`, `login_remember` (hidden when `logout_on_close`), `login_lost_link` → `page_lost`, `login_register_link` → `page_register` (hidden when `allow_registration` off), captcha (`login` in `captcha_on`), honeypot, failed-login limit (Phase 11), session limit (Phase 11), approval check, redirect resolver. AJAX + non-JS fallback. Logged-in visitors: `redirect_logged_in_from_forms` → account, otherwise “You are logged in as X · Log out”.

### 8.5 Lost / reset password (`[memberglut_lost_password]`)
Request step (user/email, captcha if `lost_password` in `captcha_on`, generic success message to avoid user enumeration) → `reset_password` email with link to `page_lost?key=&login=` → set new password (policy + meter + toggle) → `password_changed` email → redirect to login (or auto-login). Uses core `check_password_reset_key`/`reset_password`.

### 8.6 wp-login.php replacement (Settings › Login & registration)
* `replace_wp_pages`: filters `login_url`, `register_url`, `lostpassword_url`, `logout_url` (redirect param) to the pages; `login_init` redirects GET `action` in (login, register, lostpassword, rp, resetpass) to pages; **never** redirect POST, `logout`, `postpass`, `interim-login`, `confirmaction`, `memberglut_rescue`, or when the page slot is empty.
* `custom_login_slug`: rewrite rule `^{slug}/?$` → login page (or core wp-login if no page); direct `wp-login.php` GET → 404 (except whitelisted actions above, and except when coming from the slug); flush rewrites on change; show the URL prominently and warn to note it.
* Hidden admin bar & wp-admin block: Settings › General (Phase 11 list) — `show_admin_bar` filter (`hide_admin_bar_roles`), `admin_init` redirect (`block_admin_roles` → `admin_redirect_page`), allow `admin-ajax.php`, `admin-post.php`, `async-upload.php`, REST, cron (D20).

### 8.7 Pricing table (`[memberglut_plans group=""]`, block)
`pricing_layout` cards/compare/list, `pricing_plans` (order as selected; empty = all active non-hidden), `group` attribute overrides, `pricing_columns` (cards), `pricing_features`, `pricing_current` (logged-in: “Current plan” badge, Upgrade/Downgrade buttons per §2.13, disabled “Members only”/“Sold out” states), `pricing_button` text, `pricing_dark`, plan `featured` ribbon, `hide_in_table`, prices formatted with currency settings, trial/fee lines. Buttons link to `page_register?plan=slug`. Template overridable. Admin live preview should use the same lookups data (not demo `PLANS`).

### 8.8 Profile form
Covered in Phase 10 (account tab) — options `profile_fields` (**must list custom fields too**) and `profile_email_confirm`.

### 8.9 Shortcode reference section
Static list stays, but make each code reflect real slugs (e.g. first plan slug) and add block names.

**Acceptance:** full register → approve → login → reset cycle for each approval mode, with and without JS; wp-login replacement never locks out admins (rescue still works).

---

## Option relations

| Forms option | Also affects | Section |
|---|---|---|
| Page slots (6) | everything in §2.2 (signup links, redirects, tags, private site, checklist, status) | P2, P5, P7, P9, P10, P12, P13 |
| `reg_fields` (custom fields) | profile options, WP user screen, Member detail, export, `{field:key}`, GDPR export (§2.10) | P10, P6, P13, P5, P11 |
| `plan_picker` | plan `status`, `hide_in_table`, `who_can_buy`, `max_members` | P2 |
| `reg_ajax` | must also work without JS | — |
| `reg_show_login_link` | `page_login` | — |
| `login_with` | optional enforcement on wp-login when `replace_wp_pages` | P1 |
| `login_remember` | hidden when `logout_on_close` | P11 |
| `login_lost_link` / `login_register_link` | `page_lost` / `page_register` + `allow_registration` | P1 |
| `profile_fields`, `profile_email_confirm` | account profile tab, `email_change` email | P10, P5 |
| `pricing_*` | plan `featured`, `hide_in_table`, `max_members`, `who_can_buy`, group order, Settings `allow_change`/`allow_downgrade` (§2.13), currency | P2, P1, P9 |

| Settings option used here | From |
|---|---|
| `allow_registration`, `approval`, `auto_login`, password options, agreements, white/blacklist | P1 Login & registration |
| all redirects + `role_redirects` | P1 Redirects (§2.4) |
| `replace_wp_pages`, `custom_login_slug` | P1 |
| `hide_admin_bar_roles`, `block_admin_roles`, `admin_redirect_page` | P1 General (D20) |
| captcha, honeypot, failed-login limit, session limit | P11 (hooks are called from these forms) |

## Step-by-step

- [ ] 1. `GET/PUT /forms`, `POST /forms/pages/create`; page-contains-shortcode warning.
- [ ] 2. Field engine: render + validate core and custom fields; reserved key list.
- [ ] 3. `[memberglut_register]` + block: plan picker, `?plan=`, logged-in mode, appended sections (payment placeholder for P9, coupon, agreements, captcha, honeypot, meter).
- [ ] 4. Registration handler (shared REST + non-JS): validation order (“8.2” above), create user, consents, approval, free subscription, email, auto-login, redirect, paywall conversion.
- [ ] 5. Approval service: email activation (key, landing, resend), admin approval, `authenticate` block.
- [ ] 6. `[memberglut_login]` + handler; logged-in state.
- [ ] 7. `[memberglut_lost_password]` request + reset steps.
- [ ] 8. `MemberGlut_Redirects` resolver (§2.4) used by login/logout/register/checkout.
- [ ] 9. wp-login replacement + custom slug (whitelisted actions incl. rescue) + admin bar / wp-admin block.
- [ ] 10. `[memberglut_plans]` + block + `[memberglut_buy]`; admin pricing preview from real plans.
- [ ] 11. Custom fields on WP user profile screen.
- [ ] 12. Remove legacy jQuery forms/`frontend.js` (keep shortcode aliases → P15).

## Definition of done
- Register → (approve) → login → reset works for auto/email/admin, with and without JS; admins can never be locked out.
