> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 11 — Security, captcha, privacy & GDPR

| | |
|---|---|
| **Depends on** | P0 (`logins` table), P8 (forms call the security hooks) |
| **Unlocks** | P6 Logins tab data, P10 activity tab, GDPR compliance |
| **Screens** | Settings › Security, Captcha, Privacy & GDPR, General (admin bar / wp-admin); WP Tools › Export/Erase Personal Data |


### 11.1 Security (Settings › Security)
| Option | Implementation |
|---|---|
| `limit_sessions`, `max_sessions`, `session_behavior` | On `wp_login` (after auth): count `WP_Session_Tokens` sessions; `logout_oldest` destroys oldest beyond max; `block` → `authenticate` returns error before login (“Already logged in on N devices — log out there or reset”). Exempt `manage_options` (D20). Event `login_blocked`. |
| `limit_failed`, `failed_attempts`, `lockout_minutes` | `wp_login_failed` counter per username **and** per IP (transients); `authenticate` priority 1 rejects while locked (generic message, remaining minutes); reset on success; applies to wp-login, our forms, XML-RPC. Log `login` source. |
| `honeypot` | hidden field + minimum fill time on register/login/lost/checkout forms. |
| `logout_on_close` | force non-persistent auth cookie (remember = false) on our forms; on wp-login unset `rememberme` in `login_init`; hide “Remember me”. |

### 11.2 Captcha (Settings › Captcha)
`captcha_provider` none/recaptcha/hcaptcha/turnstile, `captcha_on` (register, login, lost_password, checkout — also wp-login equivalents when `replace_wp_pages` is off? → yes for login/register/lost on wp-login), reCAPTCHA `recaptcha_version` v2/v3, `recaptcha_score` (v3), keys per provider. Server verification via `wp_remote_post`, fail closed with friendly error; scripts loaded only on pages with a protected form. Declare services in readme.

### 11.3 Privacy & GDPR (Settings › Privacy)
* `gdpr_consent` + `gdpr_consent_text` (`{privacy_policy}` tag → link to `privacy_page` / WP privacy page) — D10; consents stored `{type, text, page_id, time, ip}`.
* `gdpr_exporter` → `wp_privacy_personal_data_exporters`: subscriptions, payments, logins, consents, custom fields, notes? (no — admin notes excluded).
* `gdpr_eraser` + `gdpr_eraser_payments` anonymize/delete → `wp_privacy_personal_data_erasers`: delete subscriptions’ personal links (keep anonymised rows for stats), logins, consents, custom fields; payments anonymised (user_id 0, email/IP cleared) or deleted.
* `wp_add_privacy_policy_content` suggested text.

### 11.4 Settings › General items owned here
`hide_admin_bar_roles`, `block_admin_roles`, `admin_redirect_page` — implemented as in §8.6 (D20).

---

## Option relations

| Option | Applies to | Related |
|---|---|---|
| `limit_sessions`, `max_sessions`, `session_behavior` | every login (exempt admins, D20) | Member detail Logins / Log out everywhere (P6), account activity (P10), Dashboard activity event |
| `limit_failed`, `failed_attempts`, `lockout_minutes` | our forms + wp-login + XML-RPC | logs source `login` |
| `honeypot` | register, login, lost, checkout | P8, P9 |
| `logout_on_close` | auth cookie | Forms `login_remember` hidden (P8) |
| `captcha_provider`, `captcha_on`, keys, version, score | forms in `captcha_on` (+ wp-login equivalents) | P8, P9; readme external services |
| `terms_*`, `privacy_*`, `gdpr_consent*` | Agreements renderer on registration + checkout (D10) | P8, P9, Member detail consent (P6) |
| `gdpr_exporter` | subscriptions, payments, logins, consents, custom fields | P4, P9, P8 |
| `gdpr_eraser`, `gdpr_eraser_payments` | same data; payments anonymise/delete | P9, account delete tab (P10) |
| `hide_admin_bar_roles`, `block_admin_roles`, `admin_redirect_page` | front admin bar, wp-admin | redirects `admin` fallback (§2.4), D20 |

## Step-by-step

- [ ] 1. Login history writer (`wp_login`, session verifier, last seen) + `memberglut_last_login`.
- [ ] 2. Session limit (logout oldest / block).
- [ ] 3. Failed-login limiter (username + IP).
- [ ] 4. Honeypot + min fill time helper used by all forms.
- [ ] 5. `logout_on_close`.
- [ ] 6. Captcha providers (render + verify), only loaded with protected forms.
- [ ] 7. Agreements renderer + consent store (D10).
- [ ] 8. Privacy exporter/eraser + privacy policy text.
- [ ] 9. Admin bar / wp-admin block (if not already done in P8).

## Definition of done
- Lockouts and session limits work on wp-login and our forms; GDPR export/erase include MemberGlut data.
