> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# 3. Decisions & conflicts to settle first

> Settle these **before Phase 0**. Each decision lists the recommendation; the phase files assume it. If you change a decision, search the `plans/` folder for its D-number and update every reference.


Each has a **recommendation**; adopt it unless the product owner says otherwise.

| # | Conflict found in the UI | Recommendation |
|---|---|---|
| D1 | Members list rows are **subscriptions** (plan/status/gateway per row) but Member detail shows one person. | List = one row per subscription (`id` = subscription id, links use `user_id`). Member detail is keyed by `user_id` and renders **all** subscriptions (SubscriptionCard per row). |
| D2 | Pro list advertises things the free UI already has: *Fixed-period plans* (free has “Until a date” and “Calendar year”), *Plan limits* (free has `max_members`), *Several registration forms* (free Plan editor has a `form` select with “Business form”). | Free keeps what its UI shows (guideline 5). Edit `proFeatures.js` to remove/reword duplicates. Plan editor `form` select lists only “Default registration form” unless forms are added through the `memberglut_registration_forms` filter (Pro). |
| D3 | Three “default for new users” controls: Settings `default_plan`, Roles “Make default for new users” (WP `default_role`), legacy `memberglut_default_role` (forces a role on every registration). | `default_role` = WP role for new users (Roles screen). `default_plan` = plan granted on `user_register` (its role is applied by role sync on top). Delete legacy `memberglut_default_role` behaviour (migrate its value into WP `default_role` once if it differs, Phase 15). |
| D4 | `default_plan` select only offers plan id 1 (demo filter). | Offer all **active free plans** (granting a paid plan for free is “Add member”, not a default). |
| D5 | Global `test_mode` and per-gateway `stripe_mode` / `paypal_mode`. | Effective mode = `test_mode ? test : gateway_mode`. Admin notice (and a badge in Payments) when any gateway is effectively in test. |
| D6 | Stripe and PayPal run their own retry schedules; our `retry_max`, `retry_interval` can’t be pushed to them. | For gateway-managed subscriptions our settings decide **status during retries** (`retry_status`) and **when we give up** (cancel at the gateway after `retry_max` failed invoices). `retry_interval` applies to our own retries (bank/manual renewals and future gateways without native dunning). Explain this in the field tip. |
| D7 | Paid plan + admin approval: charge first or approve first? | Charge at checkout, subscription stays `pending` until approved; rejection offers a one-click refund. Email confirmation: same (activate on confirm). |
| D8 | Bank transfer on recurring plans. | Allowed. On each renewal date create a `pending` renewal payment, send `pending_manual`, apply renewals settings while unpaid. |
| D9 | `allow_abandon` “deletes the subscription”. | Soft-delete: status `abandoned`, role removed, hidden from lists, kept for reports/audit. |
| D10 | Terms + privacy (registration) vs GDPR consent (checkout) overlap. | One Agreements block on both forms; registration shows terms/privacy checkboxes, checkout adds the GDPR text **only** if the user did not already consent at registration. |
| D11 | `admin_bypass` is in Settings `DEFAULTS` but has no field; the hint says admins always see everything. | Hard-code admin bypass (users with `manage_options`, filterable via `memberglut_user_bypasses_restrictions`). Remove from DEFAULTS. |
| D12 | `protect_search` overlaps `hide_in_lists=hide`. | Keep both: `hide_in_lists` covers blog/archives/widgets/search; `protect_search` additionally hides from search when lists use `show_excerpt`/`show`. Note it in the tip. |
| D13 | Rule target “Whole site” vs Settings `private_site`. | Both kept: `private_site` = login wall for everyone; rule `site` = plan/role wall. Both share the **always-open list**: login, register, lost password pages (+ activation/email-confirm endpoints), `private_site_exceptions`, wp-login actions needed for auth, REST auth routes, webhooks. |
| D14 | Plan editor `group` select is hard-coded (Main/Courses). | Groups = distinct `plan_group` values; select with “+ New group”. |
| D15 | Duplicate plan: copy rules too? | Duplicate creates an inactive copy “X (copy)”; dialog checkbox “Also give the copy access to the same rules” (adds the new id to those rules’ `access.plans`). |
| D16 | Delete plan when it has members. | Blocked if **any** subscription row exists (any status); suggest deactivating. On delete: remove from rules, coupons, `pricing_plans`, `default_plan`, other plans’ `buy_plans`, post meta, block attributes are left (they evaluate to “no plan”). |
| D17 | Upgrade/downgrade billing in free (proration is Pro). | Upgrade: immediate, new full period, full price (+ signup fee if `fee_on_change`). Downgrade: scheduled at period end (`scheduled_plan_id`). Filter `memberglut_plan_change_amount` lets Pro prorate. |
| D18 | Admin edits a gateway-managed subscription (change plan/dates). | Local change only, with a warning in the modal; **Cancel** and **Expire now** also cancel at the gateway. |
| D19 | PayPal webhook verification needs a Webhook ID — no field exists. | Add `paypal_webhook_id` field under the PayPal tab. |
| D20 | Who is limited by `limit_sessions`, `block_admin_roles`, `hide_admin_bar_roles` when a user has several roles? | Session limit: everyone except `manage_options`. Admin bar / wp-admin block: applied only if **all** of the user’s roles are in the list. |
