> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# 2. Cross-section dependency map

> Use this file as the **contract** between phases. When you build a consumer, look up its source here; when you change a source, update every consumer listed.


These are the options that are defined in one place and **change behaviour somewhere else**. Every phase below references this list; when building a consumer, wire it to these sources.

### 2.1 Approval / account status (5 sources → 7 consumers)

```
Settings › Login & registration › approval (auto|email|admin)
   └─ overridden by Plan editor › Sign-up › approval (inherit|auto|email|admin)
        └─ (future) overridden per registration form (filter)
Consumers:
   • Registration handler (Phase 8)           → sets memberglut_account_status, subscription status 'pending'
   • Login handler / authenticate filter      → blocks pending/rejected users (with “resend activation” link)
   • Settings › auto_login                    → only logs in when status is active
   • Emails: activation, pending_review, approved, rejected, admin_pending_review
   • Members: “Waiting for approval” card, Pending tab, Approve row action, bulk Approve
   • Member detail: Approve button
   • Dashboard: “%d waiting for approval”, activity “is waiting for approval”
   • Checkout (paid plan + admin approval)    → see Decision D7
```

### 2.2 Membership pages (Forms & Pages › page slots) → used everywhere

| Page slot | Consumed by |
|---|---|
| `page_register` | Plan signup link (`?plan=slug`) in Plan editor & Plans list (**currently hard-coded `/register/`**), `register_url` filter when `replace_wp_pages`, `{register_link}` tag in restriction messages, “Join now” link on login form, private-site always-open list, buy-button shortcode, pricing-table buttons |
| `page_login` | `login_url` filter, `{login_link}`/`{login_url}` tags, action `login` fallback, private-site always-open list, `custom_login_slug` target, activation link landing, email-change confirmation landing |
| `page_account` | redirects `account` option (login/register/logout), `admin_redirect_page` default, `redirect_logged_in_from_forms`, `{account_url}` tag, payment-failed email link, “Update payment method” |
| `page_lost` | `lostpassword_url` filter, “Lost your password?” link, `{reset_link}` target, private-site always-open list |
| `page_pricing` | rule/global action `pricing`, `{pricing_link}` tag, upgrade links in account |
| `page_thanks` | after paid checkout (precedence §2.4), bank-transfer instructions display, `[memberglut_receipt]` |
| Setup checklist “Create the membership pages” | Dashboard |
| System status “Membership pages are set” | Tools |

### 2.3 Plans are referenced by

Rules (`access.plans`), per-post access, block visibility, menu item visibility, `[memberglut_restrict plans=]`, coupons (`plans`), Forms › `pricing_plans`, Settings › `default_plan`, other plans’ `buy_plans` (who can join), Tools convert users, members/payments filters, email tags.
**→ Deleting or deactivating a plan must update/validate all of these** (Phase 2 delete flow).

### 2.4 Redirect precedence (single resolver `MemberGlut_Redirects`)

| Event | Order (first match wins) |
|---|---|
| After **login** | 1. `redirect_to` from the request if `respect_redirect_to` (validated with `wp_validate_redirect`) → 2. per-role redirect (`role_redirects`, first role of the user that has a row) → 3. `redirect_login` (+ `redirect_login_url`). `admin` target falls back to `account` if the user’s roles are in `block_admin_roles`. |
| After **logout** | 1. per-role logout URL → 2. `redirect_logout` |
| After **registration (free plan / no plan)** | 1. `redirect_to` (paywall return) if `respect_redirect_to` → 2. plan `redirect=page` → `redirect_page` → 3. `redirect_register` |
| After **paid checkout** | 1. `redirect_to` if `respect_redirect_to` → 2. plan `redirect_page` → 3. `page_thanks` → 4. `redirect_register` |
| Restricted content, action `redirect` | per-post URL → rule `redirect` page → global `restrict_redirect_url` |
| Restricted content, action `pricing` | `page_pricing` + `?redirect_to=<current>` (enables the “return here after joining” promise) |
| Logged-in user opens login/register page | `redirect_logged_in_from_forms` → `page_account` |
| Blocked wp-admin | `admin_redirect_page` |

### 2.5 Roles ↔ plans

* Plan `role`, `keep_roles`, `expire_role` → Role sync service (Phase 4).
* Roles screen: user counts change with plans; **deleting a role** used by a plan as `role`/`expire_role` must be blocked or force a replacement; “Make default for new users” writes WP `default_role` and interacts with Settings › `default_plan` (Decision D3).
* Roles screen *Multiple roles per user* ↔ plan `keep_roles` (multi-role users are normal when keep_roles is on).
* Settings › `hide_admin_bar_roles`, `block_admin_roles`, per-role redirects, rules `who=roles`, block/menu visibility by role all read the role list → Roles screen is the single source.
* Tools › “Sync roles with plans”.

### 2.6 Gateways

Plan `gateways` ∩ Settings enabled gateways (`stripe_enabled`, `paypal_enabled`, `bank_enabled`) = methods at checkout. Settings › `test_mode` vs `stripe_mode`/`paypal_mode` (Decision D5). `stripe_save_cards` → account “Update payment method”. `bank_activate` → subscription status + `pending_manual` email + Payments “Mark as paid”. `refund_revokes` → Payments refund + webhooks. Renewals settings → subscription status + `payment_failed` email. Dashboard checklist “Connect a payment gateway”. Tools status “Stripe webhook received recently”.

### 2.7 Subscription status → access

| Status | Grants access? | Set by |
|---|---|---|
| `active` | yes | activation, renewal, admin, retry with `retry_status=active` |
| `trialing` | yes | trial start |
| `pending` | **no** | awaiting payment (bank `on_confirm`), awaiting email/admin approval |
| `on_hold` | **no** | failed payment with `retry_status=on_hold` |
| `canceled` | yes **until `expires_at`** when `cancel_access=period_end`; otherwise moved straight to `expired` | member/admin cancel |
| `expired` | no | scheduler, “Expire now”, full refund with `refund_revokes` |
| `abandoned` (internal) | no, hidden from lists | `allow_abandon` (Decision D9) |

Consumers of “has access”: rules engine (`who=plans` says “Active or trialing members”), per-post, blocks, menus, shortcodes, `members_only_comments`, `who_can_buy=members`, `max_members` count, Dashboard “active members”, Members stat “Active”.

### 2.8 Content restriction precedence

`admin bypass` → `private_site` wall (with always-open pages) → **per-post settings (win over rules)** → highest-priority matching **rule** (tie: lowest rule ID) → public.
For the deny outcome, each property is resolved **field by field**: per-post override → rule value → global setting (`inherit` = fall through). Fields: `action`, `redirect`, `message` (logged-out / logged-in), `teaser`, `in_lists`.

### 2.9 Email settings → every email

`sender_name`, `sender_email`, `admin_recipients`, `email_html`, `email_logo`, `email_color`, `email_footer` apply to all 23 emails, test sends, member broadcasts and the new-user email from Add member.

### 2.10 Custom registration fields → 6 consumers

Forms › `reg_fields` (custom) → registration form, Forms › `profile_fields` options (**currently only core fields are offered — must include custom fields**), WP user profile screen, Member detail profile card (**Phone is hard-coded**), member CSV export (“Include custom fields”), email tags `{field:key}` (**not in `EMAIL_TAGS` yet**), GDPR exporter.

### 2.11 Session/login data

Settings › `limit_sessions`, `max_sessions`, `session_behavior`, `logout_on_close`, `login_remember` (Forms) → login handler. Login history table → Member detail “Logins” tab, account tab `tab_activity`, “Log out everywhere”, Dashboard activity (“Blocked a third concurrent login”), logs source `login`.

### 2.12 Logging toggles appear in two places

Settings › Advanced › `debug_log` **and** Tools › Logs (“Logging on”, “Keep logs for N days”, “Include debug messages”) → must be the **same options** (`debug_log`, `log_retention_days`, `log_debug`) — see Phase 13.

### 2.13 Upgrade / downgrade

Plan `group`, `order` (UpgradeOrder), `allow_upgrade`, `allow_downgrade`, `fee_on_change` + Settings › `allow_change`, `allow_downgrade` + Forms › `pricing_current` → account Upgrade/Downgrade buttons, pricing table buttons, checkout “change plan” mode. Both the global and the plan switch must be on.

### 2.14 Agreements appear three times

Settings › `terms_required`/`terms_page`, `privacy_required`/`privacy_page` (registration) and Privacy › `gdpr_consent`/`gdpr_consent_text` (checkout) → one “Agreements” renderer used by registration and checkout forms; one consent store; shown on Member detail “Consent”; included in GDPR export (Decision D10).

---

## 2.15 Section × section matrix

Rows = section that **defines** something; columns = sections that **must read it**. ● = strong dependency.

| Defines ↓ / Reads → | Settings | Plans | Roles | Subs engine | Emails | Members | Restriction | Forms/Auth | Checkout | Account | Security | Dashboard | Tools |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Settings** | | ● gateways, currency | | ● cancel/retry/refund, default_plan | ● sender/design | ● | ● global action/messages/lists | ● login/registration/redirects | ● payments | ● account options | ● | | ● logging |
| **Plans** | ● default_plan | | ● role usage | ● expiry, roles, cycles | ● tags | ● filters | ● access.plans | ● picker/pricing/signup link | ● price/fee/trial/gateways | ● upgrades | | ● | ● export/convert |
| **Roles** | ● admin bar/wp-admin/redirects | ● role select | | ● role sync | | ● | ● who=roles | ● default_role | | | | | ● convert |
| **Subs engine** | | ● counts | ● counts | | ● triggers | ● | ● has access | ● free activation | ● activation/renewal | ● actions | | ● | ● sweep/sync |
| **Emails** | | | | | | ● approve/broadcast | | ● | ● | ● | | ● checklist | |
| **Restriction** | | ● PlanRules | | | | | | ● paywall return | ● conversions | | | ● stats | |
| **Forms/Pages** | ● page selects | ● signup URL | | | ● tags/urls | ● custom fields | ● tags, always-open | | ● hosts checkout | ● profile | ● agreements | ● checklist | ● status/export |
| **Checkout** | | ● revenue | | ● | ● receipts | ● LTV | | | | ● update card/renew | | ● revenue/MRR | ● webhook status |
| **Security** | | | | | | ● logins | | ● hooks in forms | ● captcha | ● activity | | ● activity | |
