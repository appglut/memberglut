> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 1 — Global Settings persistence

| | |
|---|---|
| **Depends on** | P0 (settings store, REST base, lookups) |
| **Unlocks** | every phase that reads a setting (all of them) |
| **Screen** | Global Settings (`assets/src/pages/Settings.jsx`, `components/SettingsPanel.jsx`) |
| **Important** | This phase only **stores and validates**. Behaviour is built in the phase shown in the table below. Do not skip the relations — they tell later phases where to read each option. |


Wire `Settings.jsx` to `GET/PUT /settings`. This phase **only stores and validates** every option; the behaviour of each option is implemented in the phase listed in the “Built in” column (Appendix A is the full registry).

Tasks:
1. Server-side validation mirroring UI limits (e.g. `teaser_words` 10–500, `password_min` 6–64, `failed_attempts` 2–20, `lockout_minutes` 1–1440, `max_sessions` 1–10, `retry_max` 1–10, `retry_interval` 1–30, `renew_days_before` 0–365, `decimals` 0–4, `recaptcha_score` 0–1).
2. Conditional requirements: `restrict_redirect_url` required when `restrict_action=redirect`; Stripe keys required when `stripe_enabled` (warn, don’t block); captcha keys required for the chosen provider; `sender_email` valid.
3. Replace hard-coded option lists with lookups (roles, plans, pages).
4. Section deep links: `?tab=<section>` already supported by `SettingsPanel` — used by Emails (“Sender & design”) and Dashboard (“Connect a payment gateway” → `tab=payments`). Add sub-tab support (`&sub=stripe`).
5. Add missing fields: `paypal_webhook_id` (D19); remove `admin_bypass` (D11).
6. Unsaved-changes guard already in SettingsPanel — keep.

**Acceptance:** every field round-trips; invalid values are rejected with field-level messages; secrets are masked.

---

## Option relations — every Settings section → where it acts

### General
| Option | Acts in | Related to (must stay consistent) |
|---|---|---|
| `default_plan` | P4 (`user_register`) | Roles “Make default for new users” (WP `default_role`) — D3; only active **free** plans — D4; plan delete clears it — D16 |
| `private_site`, `private_site_exceptions`, `private_feed` | P7 | Forms page slots login/register/lost always open (§2.2); rule target `site` shares the always-open list (D13); rescue link (P3) must stay reachable |
| `hide_admin_bar_roles` | P8/P11 | Roles list (lookups); multi-role rule D20 |
| `block_admin_roles`, `admin_redirect_page` | P8/P11 | Redirects: login target `admin` falls back to `account` for blocked roles (§2.4); `admin_redirect_page` default = `page_account` |

### Content restriction
| Option | Acts in | Related to |
|---|---|---|
| `restrict_action`, `restrict_redirect_url` | P7 | Rule editor action `inherit`, per-post override, Rules list “Others see” column, `page_pricing` for action `pricing`, `respect_redirect_to` |
| `msg_logged_out`, `msg_logged_in` | P7 | Rule `custom_message`/`message`, per-post messages, tags `{login_link}` `{register_link}` `{pricing_link}` → page slots |
| `teaser`, `teaser_words` | P7 | rule/per-post teaser, REST & feed teasers, action `login` |
| `hide_in_lists` | P7 | rule `in_lists`, per-post override, `protect_search` (D12) |
| `protect_rest`, `protect_feed`, `protect_search` | P7 | `private_feed` (General) |
| `restrict_comments`, `members_only_comments` | P7 | subscription access statuses (§2.7) |

### Login & registration
| Option | Acts in | Related to |
|---|---|---|
| `allow_registration` | P8 | Register form, login “Join now” link (`login_register_link`), pricing buttons, `register_url` filter; replaces WP `users_can_register` checks (P15) |
| `replace_wp_pages`, `custom_login_slug` | P8 | All 4 auth page slots, reset-password email link (P5), rescue link (P3), private site (P7) |
| `approval` | P8 | Plan `approval` override, Emails activation/pending/approved/rejected/admin_pending_review (P5), Members pending tab & approve (P6), Dashboard pending (P12), D7 for paid plans — full map §2.1 |
| `auto_login` | P8 | approval status, redirects after registration |
| `password_min`, `password_strength`, `show_password_toggle` | P8, P10 | register, reset, account change-password |
| `terms_*`, `privacy_*` | P8/P11 | GDPR consent (D10), Member detail consent, GDPR export |
| `email_whitelist`, `email_blacklist` | P8, P10 | registration + profile email change (admins bypass in Add member) |

### Redirects
| Option | Acts in | Related to |
|---|---|---|
| `redirect_login/_url`, `redirect_logout/_url`, `redirect_register/_url`, `role_redirects` | P8 resolver | Plan `redirect`/`redirect_page`, `page_thanks`, `block_admin_roles` — precedence §2.4 |
| `respect_redirect_to` | P8 | Restriction action `pricing` return promise (P7) |
| `redirect_logged_in_from_forms` | P8 | `page_login`, `page_register`, `page_account` |

### Member account
| Option | Acts in | Related to |
|---|---|---|
| `tab_*` (7) | P10 | `limit_sessions` (activity tab), Forms `profile_fields`, GDPR (delete tab) |
| `allow_cancel`, `cancel_access` | P10 | status `canceled` (§2.7), gateway cancel (P9), email `canceled`/`admin_canceled` |
| `allow_renew`, `renew_days_before` | P10 | non-recurring plans only; email `expiring_soon` days (separate value) |
| `allow_change`, `allow_downgrade` | P10 | Plan `allow_upgrade`/`allow_downgrade`, group order, `fee_on_change`, Forms `pricing_current` (§2.13), D17 |
| `allow_abandon` | P10 | D9 |

### Payments (General / Stripe / PayPal / Bank / Renewals)
| Option | Acts in | Related to |
|---|---|---|
| currency format (5) | P9 | **every** money display: admin `money()`, pricing table, checkout, emails `{plan_price}` `{payment_amount}`, CSV exports |
| `test_mode` | P9 | `stripe_mode`, `paypal_mode` (D5), admin notice, checkout badge |
| `stripe_*` | P9 | Plan `gateways`, Dashboard checklist “gateway”, System status webhook check, account “Update payment method” (`stripe_save_cards`) |
| `paypal_*` (+ new `paypal_webhook_id`) | P9 | same as Stripe (D19) |
| `bank_*` | P9 | email `pending_manual` `{bank_details}`, thank-you page, Payments “Mark as paid”, subscription `pending` vs `active`, D8 |
| `retry_*` | P9 | status `on_hold`, email `payment_failed`, D6 |
| `refund_revokes` | P9 | Payments refund, webhooks refund event |

### Email settings
| `sender_*`, `admin_recipients`, `email_html`, `email_logo`, `email_color`, `email_footer` | P5 | all 23 emails, test send, broadcast (P6), Add member email (P6) — §2.9 |
|---|---|---|

### Security / Captcha / Privacy / Advanced
| Option | Acts in | Related to |
|---|---|---|
| `limit_sessions`, `max_sessions`, `session_behavior` | P11 | Member detail Logins + “Log out everywhere” (P6), account activity tab (P10), Dashboard activity event |
| `limit_failed`, `failed_attempts`, `lockout_minutes` | P11 | our login form + wp-login + XML-RPC |
| `honeypot` | P11 | register, login, lost, checkout forms |
| `logout_on_close` | P11 | Forms `login_remember` (hide checkbox) |
| `captcha_*` | P11 | forms listed in `captcha_on` (P8/P9) |
| `gdpr_*` | P11 | Agreements (D10), payments anonymise, logins, custom fields |
| `load_assets`, `exclude_cache` | P14 | shortcodes/blocks, restricted pages, account/checkout |
| `renewals_engine` | P0/P4 | Tools status next run |
| `debug_log` | P0/P13 | **same option** as Tools › Logs “Logging on” (§2.12) |
| `delete_on_uninstall` | P14 | Tools “Delete all data”, legacy `memberglut_remove_data_on_uninstall` |

## Step-by-step

- [ ] 1. `GET /settings` returns `{values, defaults}` (secrets masked); `PUT /settings` validates and saves.
- [ ] 2. Server validation mirroring UI min/max/enum (see the numbered list at the top of this file) + conditional requirements.
- [ ] 3. `Settings.jsx`: load defaults from server, keep JS `DEFAULTS` only as fallback; show field-level errors.
- [ ] 4. Replace role/plan/page option lists with lookups; `default_plan` lists active free plans (D4).
- [ ] 5. Add `paypal_webhook_id` field (PayPal tab); remove `admin_bypass` from DEFAULTS (D11).
- [ ] 6. `SettingsPanel`: support `?tab=…&sub=…` deep links (Payments sub-tabs).
- [ ] 7. Fire `memberglut_settings_updated`; listeners: flush rewrite rules on `custom_login_slug` change, reschedule on `renewals_engine` change, clear access caches on restriction options change.
- [ ] 8. Write each option's tip text so it mentions the related option where relevant (e.g. `retry_interval` D6, `protect_search` D12).

## Definition of done
- Every field round-trips; reload shows saved values; invalid input rejected per field.
- Changing `custom_login_slug` takes effect without manual permalink flush.
