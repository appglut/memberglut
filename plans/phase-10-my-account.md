> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 10 — My Account & self-service

| | |
|---|---|
| **Depends on** | P4, P5, P8 (profile/password components, redirects), P9 (update card, renew, change-plan checkout), P11 (login history) |
| **Unlocks** | member self-service |
| **Screens** | front-end `[memberglut_account]`; Settings › Member account; Forms › Profile form |


### 10.1 `[memberglut_account]` (block) — tabs (Settings › Member account)
Tabs filterable (`memberglut_account_tabs`), each toggled by its option; URL `?tab=` (or endpoint rewrite `account/{tab}`):

| Option | Tab content |
|---|---|
| `tab_dashboard` | greeting, active plans with status/expiry, quick links |
| `tab_profile` | profile form: `profile_fields` (core + custom), email change with `profile_email_confirm` (pending email + `email_change` email, confirm link, old address kept until confirmed), whitelist/blacklist on new email |
| `tab_password` | current + new password (policy, meter, toggle) → `password_changed` email |
| `tab_subscriptions` | each sub: status, start, expiry/next payment, cycles, actions below, gateway cancel; “Update payment method” when Stripe + `stripe_save_cards` |
| `tab_payments` | `[memberglut_payments]` list (receipts) |
| `tab_activity` | login history (device, IP, time, “this device”) + “Log out other devices” |
| `tab_delete` | password confirmation → cancel gateway subs → `wp_delete_user` (reassign none) or anonymise per GDPR settings → `account_deleted` email → logout. Never for admins. |

### 10.2 Self-service actions (each server-checked)
| Option | Action |
|---|---|
| `allow_cancel` + `cancel_access` | Cancel → gateway cancel at period end (`period_end`) or immediately (`now` → `expire`); `canceled` + `admin_canceled` emails |
| `allow_renew` + `renew_days_before` | “Renew” button for non-recurring paid plans when `expires_at` within N days → checkout for the same plan, new period starts at current `expires_at` |
| `allow_change` (+ plan `allow_upgrade`) | Upgrade to higher plan in same group (D17) |
| `allow_downgrade` (+ plan `allow_downgrade`) | Downgrade scheduled at period end (D17) |
| `allow_abandon` | Remove plan (D9) |

Also `[memberglut_profile]`, `[memberglut_payments]`, `[memberglut_expiry plan=""]`, `[memberglut_member field=""]` (Appendix D).

**Acceptance:** each toggle hides the UI **and** the server rejects the action when off.

---

## Option relations

| Account option | Related | Section |
|---|---|---|
| `tab_profile` | Forms `profile_fields` (incl. custom fields), `profile_email_confirm`, white/blacklist | P8, P1 |
| `tab_password` | password policy options | P1 |
| `tab_subscriptions` | statuses §2.7, `stripe_save_cards`, cycles, D17 | P4, P9 |
| `tab_payments` | payments, receipts | P9 |
| `tab_activity` | `logins`, `limit_sessions` | P11 |
| `tab_delete` | GDPR eraser settings, gateway cancel | P11, P9 |
| `allow_cancel` + `cancel_access` | gateway cancel; emails `canceled`, `admin_canceled` | P9, P5 |
| `allow_renew` + `renew_days_before` | non-recurring paid plans; checkout | P9 |
| `allow_change` / `allow_downgrade` | plan `allow_upgrade`/`allow_downgrade`, group order, `fee_on_change` (§2.13) | P2 |
| `allow_abandon` | D9, role sync | P4 |
| Account page URL | `page_account` → redirects, `{account_url}`, `admin_redirect_page` | §2.2 |
| Cache | `exclude_cache` | P14 |

## Step-by-step

- [ ] 1. Account shortcode/block with tab router (`?tab=` or endpoint rewrite) + `memberglut_account_tabs` filter.
- [ ] 2. Dashboard tab.
- [ ] 3. Profile tab (+ email change confirmation flow) and `[memberglut_profile]`.
- [ ] 4. Password tab.
- [ ] 5. Subscriptions tab with actions (cancel, renew, upgrade, downgrade, abandon, update card) — server checks each option.
- [ ] 6. Payments tab / `[memberglut_payments]`.
- [ ] 7. Activity tab + log out other devices.
- [ ] 8. Delete account tab.
- [ ] 9. `[memberglut_member]`, `[memberglut_expiry]`, `[memberglut_members]`, `[memberglut_count]`.

## Definition of done
- Each toggle hides UI and the server refuses the action when off; no-cache headers on every account view.
