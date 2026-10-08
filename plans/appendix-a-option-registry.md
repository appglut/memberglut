> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Appendix A — Complete option registry

Legend: **Built in** = phase that implements the behaviour. **Consumers** = other places that must read it.

### A.1 Global Settings (`memberglut_settings`)

| Key | Default | Built in | Consumers / related |
|---|---|---|---|
| `default_plan` | null | P4 | Roles “default role” (D3/D4), Plans delete (D16) |
| `private_site` | false | P7 | always-open list (D13), page slots, `private_feed` |
| `private_site_exceptions` | [] | P7 | Pages lookups |
| `private_feed` | false | P7 | feeds |
| `hide_admin_bar_roles` | non-admin member roles | P11/P8 | Roles list (D20) |
| `block_admin_roles` | non-admin member roles | P11/P8 | login redirect `admin` fallback (§2.4) |
| `admin_redirect_page` | Account page | P8 | Page slots |
| `restrict_action` | message | P7 | rules/per-post `inherit`, Rules list “Others see” |
| `restrict_redirect_url` | '' | P7 | action redirect precedence |
| `msg_logged_out` | html | P7 | rules/per-post messages, tags |
| `msg_logged_in` | html | P7 | same |
| `teaser` | excerpt | P7 | rules/per-post `inherit`, feeds |
| `teaser_words` | 55 | P7 | REST/feed teasers |
| `hide_in_lists` | show_excerpt | P7 | rule `in_lists`, search (D12) |
| `protect_rest` | true | P7 | — |
| `protect_feed` | true | P7 | `private_feed` |
| `protect_search` | false | P7 | D12 |
| `restrict_comments` | true | P7 | — |
| `members_only_comments` | false | P7 | subscription access statuses |
| `allow_registration` | true | P8 | register form, login “Join now” link, `register_url`, pricing buttons |
| `replace_wp_pages` | true | P8 | page slots, reset email links, rescue link |
| `custom_login_slug` | '' | P8 | rewrite, rescue link, private site |
| `approval` | auto | P8 | §2.1 |
| `auto_login` | true | P8 | approval |
| `password_min` | 8 | P8 | register, reset, account password |
| `password_strength` | medium | P8 | same |
| `show_password_toggle` | true | P8 | same |
| `terms_required` / `terms_page` | false / page | P8 | Agreements (D10), Member detail consent |
| `privacy_required` / `privacy_page` | true / page | P8 | Agreements, `{privacy_policy}` tag |
| `email_whitelist` / `email_blacklist` | [] | P8 | register, profile email change |
| `redirect_login` / `_url` | account | P8 | §2.4 |
| `redirect_logout` / `_url` | home | P8 | §2.4 |
| `redirect_register` / `_url` | account | P8 | §2.4 |
| `respect_redirect_to` | true | P8 | paywall `pricing` action |
| `redirect_logged_in_from_forms` | true | P8 | page_login/page_register |
| `role_redirects` | [] | P8 | Roles list |
| `tab_dashboard` … `tab_delete` (7) | see UI | P10 | account shortcode |
| `allow_cancel` / `cancel_access` | true / period_end | P10 | status `canceled`, gateway cancel |
| `allow_renew` / `renew_days_before` | true / 15 | P10 | `expiring_soon` email (different N) |
| `allow_change` / `allow_downgrade` | true / true | P10 | plan `allow_upgrade/downgrade`, pricing `pricing_current` |
| `allow_abandon` | false | P10 | D9 |
| `currency`, `currency_position`, `thousand_sep`, `decimal_sep`, `decimals` | USD… | P9 | all money display (admin + front + emails), gateways |
| `test_mode` | true | P9 | D5, admin notice |
| `stripe_enabled`, `stripe_mode`, `stripe_test_publishable`, `stripe_test_secret`, `stripe_live_publishable`, `stripe_live_secret`, `stripe_webhook_secret`, `stripe_wallets`, `stripe_save_cards` | | P9 | plan gateways, checklist, status, account card update |
| `paypal_enabled`, `paypal_mode`, `paypal_client_id`, `paypal_secret`, **`paypal_webhook_id` (new)** | | P9 | same |
| `bank_enabled`, `bank_title`, `bank_instructions`, `bank_activate` | | P9 | `pending_manual` email `{bank_details}`, thank-you page, Payments mark paid |
| `retry_failed`, `retry_max`, `retry_interval`, `retry_status` | | P9 | D6, status `on_hold`, `payment_failed` email |
| `refund_revokes` | true | P9 | Payments refund, webhooks |
| `sender_name`, `sender_email`, `admin_recipients`, `email_html`, `email_logo`, `email_color`, `email_footer` | | P5 | all emails, broadcast, test |
| `limit_sessions`, `max_sessions`, `session_behavior` | | P11 | logins tab, account activity |
| `limit_failed`, `failed_attempts`, `lockout_minutes` | | P11 | wp-login + our forms |
| `honeypot` | true | P11 | all forms |
| `logout_on_close` | false | P11 | Forms `login_remember` |
| `captcha_provider`, `captcha_on`, `recaptcha_version`, `recaptcha_site_key`, `recaptcha_secret_key`, `recaptcha_score`, `hcaptcha_*`, `turnstile_*` | | P11 | forms |
| `gdpr_consent`, `gdpr_consent_text` | | P11 | Agreements (D10) |
| `gdpr_exporter`, `gdpr_eraser`, `gdpr_eraser_payments` | | P11 | payments, logins, custom fields |
| `load_assets` | needed | P14 | shortcodes/blocks |
| `exclude_cache` | true | P14 | restriction, account, checkout |
| `renewals_engine` | action_scheduler | P0/P4 | Tools status |
| `debug_log` (+ new `log_retention_days`, `log_debug`) | false | P0/P13 | Tools › Logs (§2.12) |
| `delete_on_uninstall` | false | P14 | Tools delete-all |
| ~~`admin_bypass`~~ | — | — | removed (D11) |

### A.2 Forms & Pages (`memberglut_forms`)

| Key | Built in | Consumers |
|---|---|---|
| `page_register`, `page_login`, `page_account`, `page_lost`, `page_pricing`, `page_thanks` | P8 | §2.2 |
| `reg_fields` | P8 | §2.10 |
| `reg_title`, `reg_button`, `plan_picker`, `reg_show_login_link`, `reg_ajax` | P8 | register form |
| `login_with`, `login_title`, `login_button`, `login_remember`, `login_lost_link`, `login_register_link` | P8 | login form, `logout_on_close`, `allow_registration` |
| `profile_fields`, `profile_email_confirm` | P10 | account profile, `email_change` email |
| `pricing_layout`, `pricing_plans`, `pricing_columns`, `pricing_features`, `pricing_current`, `pricing_button`, `pricing_dark` | P8 | pricing shortcode/block, plan `hide_in_table`/`featured`/`max_members` |

### A.3 Plan settings — see Phase 2 table (40 fields).
### A.4 Rule fields — `title, status, priority, note, protect[], exclude[], include_children, who, plans, roles, users, action, redirect, custom_message, message, teaser, in_lists` (Phase 7). `logged_in_note` in `NEW_RULE` is unused → remove.
### A.5 Coupon fields — Phase 9.9. ### A.6 Email fields — `enabled, subject, heading, body, days` (Phase 5).
### A.7 Role options — `multi_roles`, `rescue` (Phase 3). ### A.8 Tools-only — `log_retention_days`, `log_debug`, export checkboxes (request params, not stored).

