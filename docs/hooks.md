# MemberGlut hooks

Generated from the source. Every hook below is public API for add-ons (MemberGlut Pro and third parties).
See `examples/pro-extension-example.php` for a working add-on that uses the main extension points.

## Main extension points

| Area | Hooks |
|---|---|
| Gateways | `memberglut_gateways` (class names or instances extending `MemberGlut_Gateway`) |
| Checkout & pricing | `memberglut_order_summary` (context has `data` and `current`; lines may carry `info`), `memberglut_plan_change_amount`, `memberglut_checkout_fields`, `memberglut_coupon_is_valid`, `memberglut_coupon_settings_schema`, `memberglut_registration_validate`, `memberglut_plan_price_label`, `memberglut_stripe_subscription_params`, `memberglut_change_price_amount`, `memberglut_manual_renewal_gateways` |
| Content rules | `memberglut_rule_targets`, `memberglut_sanitize_rule_target`, `memberglut_rule_target_matches`, `memberglut_rule_target_post_ids`, `memberglut_rule_conditions`, `memberglut_sanitize_rule_condition`, `memberglut_user_passes_condition`, `memberglut_rule_settings_schema`, `memberglut_access_decision` |
| Plans | `memberglut_plan_settings_schema`, `memberglut_plan`, `memberglut_plan_columns`, `memberglut_plan_validation_errors`, `memberglut_registration_forms`, `memberglut_can_join_plan` |
| Forms | `memberglut_field_types`, `memberglut_render_field`, `memberglut_validate_field`, `memberglut_sanitize_field`, `memberglut_skip_field`, `memberglut_sanitize_reg_field`, `memberglut_login_form_after_fields`, `memberglut_register_form_after_fields`, `memberglut_profile_fields`, `memberglut_registration_fields` (context: plan, plans, form — several registration forms), `memberglut_register_form_values`, `memberglut_form_setting`, `memberglut_public_forms` + `memberglut_form_action` (add-on forms, posted to `/public/{form}` or posted back), `memberglut_check_password` |
| Account | `memberglut_account_tabs`, `memberglut_account_tab_content`, `memberglut_account_tab_html` (any tab, built-in ones too), `memberglut_account_subscription_actions`, `memberglut_account_subscription_op`, `memberglut_account_payment_links` |
| Settings | `memberglut_settings_schema`, `memberglut_forms_schema` |
| Emails | `memberglut_email_triggers`, `memberglut_email_tags`, `memberglut_email_attachments`, `memberglut_send_email` |
| Access | `memberglut_active_rules`, `memberglut_on_hold_keeps_access`, `memberglut_paywall_extra`, `memberglut_max_sessions` |
| Admin UI | `memberglut_admin_pages`, `memberglut_screen_caps`, `memberglut_admin_enqueue`, JS `window.memberglutAdmin.registerSection(screen, section)` (screens: `settings`, `forms`, `plan`, `rule`, `coupon`), `registerRuleTarget()`, `registerRuleCondition()`, `registerFieldOption()`, `registerScreen()`, `registerMenuItem()`, `registerToolbar()` (`coupons`, `member`), `needsKit`; shared UI kit `window.memberglutUI` (React, antd, MemberGlut components); `MEMBERGLUT_ADDON_API` = 2 |
| Shortcodes & blocks | `memberglut_shortcodes`, `memberglut_blocks`, `memberglut_rest_controllers` |

### Admin JS registry

```js
// Enqueue on memberglut_admin_enqueue with 'memberglut-registry' as a dependency.
memberglutAdmin.registerSection('plan', {
  key: 'drip', title: 'Dripping',
  fields: [{ key: 'drip_days', type: 'number', label: 'Unlock after (days)' }],
});
```

Declare the saved keys on the server (`memberglut_plan_settings_schema`, `memberglut_settings_schema`, `memberglut_forms_schema`, `memberglut_rule_settings_schema`) as `key => [ 'type' => …, 'default' => … ]`; they are sanitized with the same rules as core settings.

## Actions (51)

| Hook | Where |
|---|---|
| `memberglut_access_denied` | `includes/frontend/class-memberglut-restriction-frontend.php:483` |
| `memberglut_account_activated` | `includes/services/class-memberglut-approval.php:155` |
| `memberglut_account_pending` | `includes/services/class-memberglut-approval.php:78`<br>`includes/services/class-memberglut-approval.php:81`<br>`includes/services/class-memberglut-approval.php:121` |
| `memberglut_activate` | `includes/core/class-memberglut-install.php:105` |
| `memberglut_admin_enqueue` | `includes/class-memberglut-app.php:239` |
| `memberglut_after_expiration_sweep` | `includes/services/class-memberglut-subscription-service.php:724` |
| `memberglut_bank_payment_pending` | `includes/gateways/class-memberglut-gateway-bank.php:59`<br>`includes/services/class-memberglut-payments.php:414`<br>`includes/services/class-memberglut-payments.php:438` |
| `memberglut_before_account_delete` | `includes/frontend/class-memberglut-account.php:792` |
| `memberglut_before_expiration_sweep` | `includes/services/class-memberglut-subscription-service.php:692` |
| `memberglut_cache_cleared` | `includes/core/functions-core.php:349` |
| `memberglut_cancel_gateway_subscription` | `includes/services/class-memberglut-subscription-service.php:461`<br>`includes/services/class-memberglut-subscription-service.php:485`<br>`includes/services/class-memberglut-subscription-service.php:514`<br>`includes/services/class-memberglut-subscription-service.php:542`<br>`includes/services/class-memberglut-subscription-service.php:563`<br>`includes/services/class-memberglut-subscription-service.php:791` |
| `memberglut_checkout_fields` | `includes/services/class-memberglut-checkout.php:520` |
| `memberglut_data_deleted` | `includes/services/class-memberglut-tools.php:729` |
| `memberglut_deactivate` | `includes/core/class-memberglut-plugin.php:144` |
| `memberglut_email_sent` | `includes/services/class-memberglut-mailer.php:471` |
| `memberglut_event_recorded` | `includes/core/class-memberglut-logger.php:88` |
| `memberglut_init` | `includes/core/class-memberglut-plugin.php:121` |
| `memberglut_login_form_after_fields` | `templates/forms/login.php:54` |
| `memberglut_login_locked` | `includes/services/class-memberglut-security.php:170` |
| `memberglut_member_approved` | `includes/services/class-memberglut-approval.php:153` |
| `memberglut_member_rejected` | `includes/services/class-memberglut-approval.php:183` |
| `memberglut_payment_completed` | `includes/services/class-memberglut-payments.php:184` |
| `memberglut_payment_failed` | `includes/services/class-memberglut-payments.php:211` |
| `memberglut_payment_refunded` | `includes/services/class-memberglut-payments.php:279` |
| `memberglut_personal_data_erased` | `includes/services/class-memberglut-privacy.php:287` |
| `memberglut_plan_deleted` | `includes/services/class-memberglut-plans.php:660` |
| `memberglut_plan_saved` | `includes/services/class-memberglut-plans.php:513`<br>`includes/services/class-memberglut-plans.php:573` |
| `memberglut_profile_updated` | `includes/frontend/class-memberglut-account.php:664` |
| `memberglut_public_routes` | `includes/rest/class-memberglut-rest-public.php:34` |
| `memberglut_register_form_after_fields` | `templates/forms/register.php:106` |
| `memberglut_renewal_payment_pending` | `includes/services/class-memberglut-payments.php:416`<br>`includes/services/class-memberglut-payments.php:447` |
| `memberglut_role_created` | `includes/services/class-memberglut-roles-service.php:375` |
| `memberglut_role_deleted` | `includes/services/class-memberglut-roles-service.php:454` |
| `memberglut_role_saved` | `includes/services/class-memberglut-roles-service.php:316` |
| `memberglut_rule_deleted` | `includes/services/class-memberglut-rules.php:437` |
| `memberglut_rule_saved` | `includes/services/class-memberglut-rules.php:418` |
| `memberglut_sending_own_reset` | `includes/frontend/class-memberglut-auth.php:587` |
| `memberglut_settings_updated` | `includes/core/class-memberglut-settings.php:735` |
| `memberglut_subscription_access_lost` | `includes/services/class-memberglut-subscription-service.php:352` |
| `memberglut_subscription_activated` | `includes/services/class-memberglut-subscription-service.php:304` |
| `memberglut_subscription_canceled` | `includes/services/class-memberglut-subscription-service.php:492`<br>`includes/services/class-memberglut-subscription-service.php:546` |
| `memberglut_subscription_created` | `includes/services/class-memberglut-subscription-service.php:280` |
| `memberglut_subscription_cycles_complete` | `includes/services/class-memberglut-subscription-service.php:460` |
| `memberglut_subscription_deleted` | `includes/services/class-memberglut-subscription-service.php:576` |
| `memberglut_subscription_expired` | `includes/gateways/class-memberglut-gateway-stripe.php:645`<br>`includes/services/class-memberglut-subscription-service.php:518` |
| `memberglut_subscription_plan_changed` | `includes/services/class-memberglut-subscription-service.php:615` |
| `memberglut_subscription_renewed` | `includes/services/class-memberglut-subscription-service.php:458` |
| `memberglut_subscription_status_changed` | `includes/services/class-memberglut-subscription-service.php:281`<br>`includes/services/class-memberglut-subscription-service.php:345` |
| `memberglut_user_registered` | `includes/frontend/class-memberglut-auth.php:268`<br>`includes/services/class-memberglut-members.php:389` |
| `memberglut_user_roles_synced` | `includes/services/class-memberglut-role-sync.php:139` |
| `memberglut_webhook_received` | `includes/gateways/class-memberglut-gateway-paypal.php:514`<br>`includes/gateways/class-memberglut-gateway-stripe.php:660` |

## Filters (85)

| Hook | Where |
|---|---|
| `memberglut_access_decision` | `includes/services/class-memberglut-access.php:137`<br>`includes/services/class-memberglut-access.php:187` |
| `memberglut_account_payment_links` | `includes/frontend/class-memberglut-account.php:552` |
| `memberglut_account_subscription_actions` | `includes/frontend/class-memberglut-account.php:331` |
| `memberglut_account_subscription_op` | `includes/frontend/class-memberglut-account.php:759` |
| `memberglut_account_tab_content` | `includes/frontend/class-memberglut-account.php:242` |
| `memberglut_account_tab_html` | `includes/frontend/class-memberglut-account.php:251` |
| `memberglut_account_tabs` | `includes/frontend/class-memberglut-account.php:96` |
| `memberglut_active_rules` | `includes/services/class-memberglut-rules.php:51` |
| `memberglut_admin_notices` | `includes/admin/class-memberglut-admin-notices.php:97` |
| `memberglut_admin_pages` | `includes/class-memberglut-app.php:90` |
| `memberglut_agreements` | `includes/frontend/class-memberglut-agreements.php:46` |
| `memberglut_always_open_pages` | `includes/services/class-memberglut-rules.php:495` |
| `memberglut_blocks` | `includes/frontend/class-memberglut-blocks.php:78` |
| `memberglut_can_join_plan` | `includes/services/class-memberglut-plans.php:896` |
| `memberglut_capability_groups` | `includes/services/class-memberglut-roles-service.php:192` |
| `memberglut_change_price_amount` | `includes/gateways/class-memberglut-gateway-stripe.php:534` |
| `memberglut_check_password` | `includes/frontend/class-memberglut-fields.php:304` |
| `memberglut_client_ip` | `includes/core/functions-core.php:315` |
| `memberglut_components` | `includes/core/class-memberglut-plugin.php:48` |
| `memberglut_countries` | `includes/frontend/class-memberglut-fields.php:349` |
| `memberglut_coupon_is_valid` | `includes/services/class-memberglut-coupons.php:248` |
| `memberglut_coupon_settings_schema` | `includes/services/class-memberglut-coupons.php:58` |
| `memberglut_dashboard_stats` | `includes/services/class-memberglut-dashboard.php:194` |
| `memberglut_email_attachments` | `includes/services/class-memberglut-mailer.php:460` |
| `memberglut_email_tags` | `includes/services/class-memberglut-mailer.php:314` |
| `memberglut_email_triggers` | `includes/services/class-memberglut-mailer.php:85` |
| `memberglut_failed_login_ip_limit` | `includes/services/class-memberglut-security.php:79` |
| `memberglut_field_types` | `includes/core/class-memberglut-settings.php:191` |
| `memberglut_form_action` | `includes/frontend/class-memberglut-auth.php:503`<br>`includes/rest/class-memberglut-rest-public.php:92` |
| `memberglut_form_setting` | `includes/core/functions-core.php:35` |
| `memberglut_format_price` | `includes/core/functions-core.php:140` |
| `memberglut_gateways` | `includes/gateways/class-memberglut-gateways.php:39` |
| `memberglut_is_always_open_request` | `includes/frontend/class-memberglut-restriction-frontend.php:110` |
| `memberglut_is_pro_active` | `includes/core/functions-core.php:274` |
| `memberglut_limit_sessions_for_user` | `includes/services/class-memberglut-security.php:222` |
| `memberglut_login_history_size` | `includes/services/class-memberglut-security.php:405` |
| `memberglut_manual_renewal_gateways` | `includes/services/class-memberglut-payments.php:400` |
| `memberglut_max_sessions` | `includes/services/class-memberglut-security.php:238` |
| `memberglut_member_export_columns` | `includes/services/class-memberglut-members.php:591` |
| `memberglut_member_export_row` | `includes/services/class-memberglut-members.php:634` |
| `memberglut_member_field` | `includes/frontend/class-memberglut-account.php:939` |
| `memberglut_on_hold_keeps_access` | `includes/services/class-memberglut-access.php:108` |
| `memberglut_order_summary` | `includes/services/class-memberglut-pricing.php:105` |
| `memberglut_page_url` | `includes/core/functions-core.php:243` |
| `memberglut_paywall_extra` | `includes/services/class-memberglut-access.php:415` |
| `memberglut_plan` | `includes/services/class-memberglut-plans.php:213` |
| `memberglut_plan_change_amount` | `includes/services/class-memberglut-pricing.php:65` |
| `memberglut_plan_columns` | `includes/services/class-memberglut-plans.php:412` |
| `memberglut_plan_price_label` | `includes/services/class-memberglut-plans.php:921` |
| `memberglut_plan_settings_schema` | `includes/services/class-memberglut-plans.php:37` |
| `memberglut_plan_validation_errors` | `includes/services/class-memberglut-plans.php:368` |
| `memberglut_profile_fields` | `includes/frontend/class-memberglut-account.php:393` |
| `memberglut_profile_validate` | `includes/frontend/class-memberglut-account.php:646` |
| `memberglut_public_forms` | `includes/rest/class-memberglut-rest-public.php:30` |
| `memberglut_redirect_url` | `includes/services/class-memberglut-redirects.php:133`<br>`includes/services/class-memberglut-redirects.php:148`<br>`includes/services/class-memberglut-redirects.php:172` |
| `memberglut_register_form_values` | `includes/frontend/class-memberglut-shortcodes.php:285` |
| `memberglut_registration_fields` | `includes/frontend/class-memberglut-fields.php:35` |
| `memberglut_registration_forms` | `includes/services/class-memberglut-plans.php:480` |
| `memberglut_registration_result` | `includes/frontend/class-memberglut-auth.php:299` |
| `memberglut_registration_validate` | `includes/frontend/class-memberglut-auth.php:222` |
| `memberglut_render_field` | `includes/frontend/class-memberglut-fields.php:85` |
| `memberglut_restricted_post_types` | `includes/admin/class-memberglut-post-access-admin.php:41` |
| `memberglut_restriction_message` | `includes/services/class-memberglut-access.php:374` |
| `memberglut_rule_conditions` | `includes/services/class-memberglut-rules.php:82` |
| `memberglut_rule_settings_schema` | `includes/services/class-memberglut-rules.php:92` |
| `memberglut_rule_target_matches` | `includes/services/class-memberglut-rules.php:572`<br>`includes/services/class-memberglut-rules.php:603` |
| `memberglut_rule_target_post_ids` | `includes/services/class-memberglut-rules.php:719` |
| `memberglut_rule_targets` | `includes/services/class-memberglut-rules.php:73` |
| `memberglut_sanitize_field` | `includes/frontend/class-memberglut-fields.php:242` |
| `memberglut_sanitize_reg_field` | `includes/core/class-memberglut-settings.php:641` |
| `memberglut_sanitize_rule_condition` | `includes/services/class-memberglut-rules.php:402` |
| `memberglut_sanitize_rule_target` | `includes/rest/class-memberglut-rest-rules.php:361`<br>`includes/services/class-memberglut-rules.php:284` |
| `memberglut_screen_caps` | `includes/core/class-memberglut-permissions.php:91` |
| `memberglut_send_email` | `includes/services/class-memberglut-mailer.php:438` |
| `memberglut_setup_checklist` | `includes/services/class-memberglut-dashboard.php:296` |
| `memberglut_skip_field` | `includes/frontend/class-memberglut-fields.php:174` |
| `memberglut_status_checks` | `includes/services/class-memberglut-tools.php:570` |
| `memberglut_stripe_subscription_params` | `includes/gateways/class-memberglut-gateway-stripe.php:364` |
| `memberglut_sweep_skip_subscription` | `includes/services/class-memberglut-subscription-service.php:707` |
| `memberglut_sync_user_roles` | `includes/services/class-memberglut-role-sync.php:40` |
| `memberglut_teaser` | `includes/services/class-memberglut-access.php:340` |
| `memberglut_template_path` | `includes/core/functions-core.php:286` |
| `memberglut_user_bypasses_restrictions` | `includes/core/functions-core.php:265` |
| `memberglut_user_passes_condition` | `includes/services/class-memberglut-access.php:116` |
| `memberglut_validate_field` | `includes/frontend/class-memberglut-fields.php:237` |
