> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 5 — Email engine + Emails screen

| | |
|---|---|
| **Depends on** | P0, P1 (email settings), P4 (lifecycle events to trigger on) |
| **Unlocks** | email side of P6, P8, P9, P10, P11 |
| **Screens** | Emails (`Emails.jsx`); Settings › Email settings (sender & design) |


### 5.1 Engine (`MemberGlut_Mailer`)
* `send( $key, $to, $context )` → checks the email’s `enabled`, builds subject/heading/body from override or PHP default, replaces tags, wraps in the HTML template (`email_html`, `email_logo`, `email_color`, `email_footer`, heading) or sends plain text, sets From from `sender_name`/`sender_email` (fallback site title / `wordpress@domain`) **only for MemberGlut emails** (headers, not global `wp_mail_from` filters), logs `email_sent` event + `logs` row on failure (`wp_mail_failed`).
* Admin emails go to `admin_recipients` (comma list) or `admin_email`.
* Template file `templates/emails/wrapper.php` overridable from theme.
* Tags (server-side registry, also returned to the UI so `EMAIL_TAGS` is not hard-coded): all tags in `demoData.EMAIL_TAGS` **plus** `{field:<key>}` for each custom field, `{order_breakdown}`, `{coupon_code}`. Unknown tags are left empty. Values HTML-escaped in HTML mode.

### 5.2 The 23 emails — triggers

| Key | Recipient | Trigger (phase) |
|---|---|---|
| `register` | member | account created via our registration form or Add member (new user) (P8, P6) |
| `activation` | member | approval = email (P8); “resend activation” link |
| `pending_review` | member | approval = admin (P8) |
| `approved` / `rejected` | member | Members approve/reject (P6) |
| `reset_password` | member | our lost-password form and Member detail “Send password reset” — replace core email via `retrieve_password_message`/`retrieve_password_title` filters when `replace_wp_pages` is on so the link points to `page_lost` |
| `password_changed` | member | password changed in account/reset (P10) — also suppress core `password_change_email` duplicate |
| `email_change` | new address | profile email change with `profile_email_confirm` (P10) |
| `account_deleted` | member | account deletion tab (P10) |
| `activated` | member | subscription → active the first time (respect plan `send_welcome`; Add member “send email” for existing users) |
| `renewed` | member | successful renewal |
| `canceled` | member | cancel/abandon |
| `expired` | member | expire |
| `expiring_soon` (days) | member | daily reminders job: non-renewing subs with `expires_at` in N days |
| `renewal_reminder` (days) | member | recurring subs with `next_payment_at` in N days |
| `trial_ending` (days) | member | `trial_ends_at` in N days |
| `receipt` | member | payment completed; “Resend receipt” in Payments |
| `payment_failed` | member | renewal failed (P9) with `{account_url}` to update card |
| `pending_manual` | member | bank checkout / bank renewal with `{bank_details}` = `bank_instructions` |
| `admin_new_member` | admin | first subscription of a user created |
| `admin_new_payment` | admin | payment completed |
| `admin_pending_review` | admin | registration waiting for approval |
| `admin_canceled` | admin | member cancels |

Reminders are de-duplicated per subscription + period (`meta.reminders_sent[key] = period_end`).

### 5.3 Emails screen wiring
`GET /emails` (defaults merged with overrides + `is_default` flags), `PUT /emails` (all) or `PUT /emails/{key}`, `POST /emails/{key}/reset` (restore default — current UI resets body only from 3 JS defaults; move all defaults to PHP), `POST /emails/{key}/test` (`to`, uses sample context **and** current unsaved subject/body from the request), `GET /emails/{key}/preview` optional (server render so the preview uses the real wrapper/colour/logo). Mark “emails reviewed” for the dashboard checklist when the screen is saved once.

**Acceptance:** every trigger sends exactly once; disabled emails never send; test send works with unsaved edits; HTML and plain modes correct.

---

## Option relations

| Email / option | Triggered or changed from | Section |
|---|---|---|
| Sender, admin recipients, HTML template, logo, colour, footer | Settings › Email settings | P1 (§2.9) |
| `register` | Registration (P8), Add member new user (P6) | — |
| `activation`, `pending_review`, `admin_pending_review` | Approval = email/admin (Settings `approval` or plan `approval`) | P8 (§2.1) |
| `approved`, `rejected` | Members approve/reject (single + bulk) | P6 |
| `reset_password` | Lost-password form (P8), Member detail “Send password reset” (P6); link target `page_lost` when `replace_wp_pages` | P8 |
| `password_changed` | account password tab, reset form | P10/P8 |
| `email_change` | profile with `profile_email_confirm` | P10 (Forms) |
| `account_deleted` | account `tab_delete` | P10 |
| `activated` | first activation; respects plan `send_welcome`; Add member “send email” | P4/P2/P6 |
| `renewed`, `receipt`, `admin_new_payment` | payment completed / renewal | P9 |
| `canceled`, `admin_canceled` | `allow_cancel` self-service, admin cancel | P10/P6 |
| `expired` | expiration sweep, expire now, refund with `refund_revokes` | P4/P9 |
| `expiring_soon` / `renewal_reminder` / `trial_ending` (+ `days`) | daily reminders job | P4 scheduler |
| `payment_failed` | renewal failure (retry settings) | P9 (D6) |
| `pending_manual` | bank checkout/renewal; `{bank_details}` = `bank_instructions` | P9 (D8) |
| `admin_new_member` | first subscription of a user | P4 |
| Tags `{field:key}` | Forms custom fields | P8 (§2.10) |
| Tags `{account_url}` `{login_url}` `{reset_link}` | Forms page slots | §2.2 |
| Prices in tags | currency settings | P1 |
| Dashboard checklist “Review the member emails” | first save of Emails screen | P12 |

## Step-by-step

- [ ] 1. PHP registry of the 23 emails (key, group, recipient, name, desc, default subject/heading/body, `days` for reminders).
- [ ] 2. `MemberGlut_Mailer::send()` with tags, wrapper template, plain-text mode, headers From, admin recipients, logging.
- [ ] 3. Tag registry (core + custom fields + filter) exposed to the UI; remove hard-coded `EMAIL_TAGS`/`SAMPLE`/`DEFAULT_BODY` from JS.
- [ ] 4. REST: get/save/reset/test/preview.
- [ ] 5. Hook each trigger to the P4 service events (listener class, one method per email).
- [ ] 6. Reminders job with de-duplication.
- [ ] 7. Replace core reset/password-changed emails when MemberGlut handles the flow (no duplicates).
- [ ] 8. Emails screen wiring + “reviewed” flag.

## Definition of done
- Each trigger sends once, disabled emails never send, test send uses unsaved edits, HTML & plain both correct.
