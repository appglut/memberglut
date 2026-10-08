# MemberGlut hooks

Generated from the source. Every hook below is public API for add-ons (MemberGlut Pro and third parties).
See `examples/pro-extension-example.php` for a working add-on that uses the main extension points.

## Main extension points

| Area | Hooks |
|---|---|
| Gateways | `memberglut_gateways` (class names or instances extending `MemberGlut_Gateway`) |
| Checkout & pricing | `memberglut_order_summary`, `memberglut_plan_change_amount`, `memberglut_checkout_fields`, `memberglut_coupon_is_valid`, `memberglut_registration_validate` |
| Content rules | `memberglut_rule_targets`, `memberglut_sanitize_rule_target`, `memberglut_rule_target_matches`, `memberglut_rule_target_post_ids`, `memberglut_rule_conditions`, `memberglut_sanitize_rule_condition`, `memberglut_user_passes_condition`, `memberglut_rule_settings_schema`, `memberglut_access_decision` |
| Plans | `memberglut_plan_settings_schema`, `memberglut_plan`, `memberglut_plan_columns`, `memberglut_plan_validation_errors`, `memberglut_registration_forms`, `memberglut_can_join_plan` |
| Forms | `memberglut_field_types`, `memberglut_render_field`, `memberglut_validate_field`, `memberglut_sanitize_field`, `memberglut_login_form_after_fields`, `memberglut_profile_fields` |
| Account | `memberglut_account_tabs`, `memberglut_account_tab_content`, `memberglut_account_subscription_actions` |
| Settings | `memberglut_settings_schema`, `memberglut_forms_schema` |
| Emails | `memberglut_email_triggers`, `memberglut_email_tags`, `memberglut_send_email` |
| Admin UI | `memberglut_admin_pages`, `memberglut_screen_caps`, `memberglut_admin_enqueue`, JS `window.memberglutAdmin.registerSection(screen, section)`, `registerRuleTarget()`, `registerRuleCondition()` (screens: `settings`, `forms`, `plan`, `rule`) |
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

## Actions (48)

| Hook | Where |
|---|---|
| `memberglut_access_denied` | `includes/frontend/class-memberglut-restriction-frontend.php:483` |
| `memberglut_account_activated` | `includes/services/class-memberglut-approval.php:155` |
| `memberglut_account_pending` | `includes/services/class-memberglut-approval.php:78`<br>`includes/services/class-memberglut-approval.php:81`<br>`includes/services/class-memberglut-approval.php:121` |
| `memberglut_activate` | `includes/core/class-memberglut-install.php:105` |
| `memberglut_admin_enqueue` | `includes/class-memberglut-app.php:231` |
| `memberglut_after_expiration_sweep` | `includes/services/class-memberglut-subscription-service.php:724` |
| `memberglut_bank_payment_pending` | `includes/gateways/class-memberglut-gateway-bank.php:59`<br>`includes/services/class-memberglut-payments.php:403`<br>`includes/services/class-memberglut-payments.php:419` |
| `memberglut_before_account_delete` | `includes/frontend/class-memberglut-account.php:751` |
| `memberglut_before_expiration_sweep` | `includes/services/class-memberglut-subscription-service.php:692` |
| `memberglut_cache_cleared` | `includes/core/functions-core.php:343` |
| `memberglut_cancel_gateway_subscription` | `includes/services/class-memberglut-subscription-service.php:461`<br>`includes/services/class-memberglut-subscription-service.php:485`<br>`includes/services/class-memberglut-subscription-service.php:514` |
| `memberglut_checkout_fields` | `includes/services/class-memberglut-checkout.php:518` |
| `memberglut_data_deleted` | `includes/services/class-memberglut-tools.php:729` |
| `memberglut_deactivate` | `includes/core/class-memberglut-plugin.php:144` |
| `memberglut_email_sent` | `includes/services/class-memberglut-mailer.php:463` |
| `memberglut_event_recorded` | `includes/core/class-memberglut-logger.php:88` |
| `memberglut_init` | `includes/core/class-memberglut-plugin.php:121` |
| `memberglut_login_form_after_fields` | `templates/forms/login.php:54` |
| `memberglut_member_approved` | `includes/services/class-memberglut-approval.php:153` |
| `memberglut_member_rejected` | `includes/services/class-memberglut-approval.php:183` |
| `memberglut_payment_completed` | `includes/services/class-memberglut-payments.php:182` |
| `memberglut_payment_failed` | `includes/services/class-memberglut-payments.php:209` |
| `memberglut_payment_refunded` | `includes/services/class-memberglut-payments.php:277` |
| `memberglut_personal_data_erased` | `includes/services/class-memberglut-privacy.php:287` |
| `memberglut_plan_deleted` | `includes/services/class-memberglut-plans.php:660` |
| `memberglut_plan_saved` | `includes/services/class-memberglut-plans.php:513`<br>`includes/services/class-memberglut-plans.php:573` |
| `memberglut_profile_updated` | `includes/frontend/class-memberglut-account.php:641` |
| `memberglut_public_routes` | `includes/rest/class-memberglut-rest-public.php:27` |
| `memberglut_role_created` | `includes/services/class-memberglut-roles-service.php:375` |
| `memberglut_role_deleted` | `includes/services/class-memberglut-roles-service.php:454` |
| `memberglut_role_saved` | `includes/services/class-memberglut-roles-service.php:316` |
| `memberglut_rule_deleted` | `includes/services/class-memberglut-rules.php:432` |
| `memberglut_rule_saved` | `includes/services/class-memberglut-rules.php:413` |
| `memberglut_sending_own_reset` | `includes/frontend/class-memberglut-auth.php:583` |
| `memberglut_settings_updated` | `includes/core/class-memberglut-settings.php:719` |
| `memberglut_subscription_access_lost` | `includes/services/class-memberglut-subscription-service.php:352` |
| `memberglut_subscription_activated` | `includes/services/class-memberglut-subscription-service.php:304` |
| `memberglut_subscription_canceled` | `includes/services/class-memberglut-subscription-service.php:492`<br>`includes/services/class-memberglut-subscription-service.php:546` |
| `memberglut_subscription_created` | `includes/services/class-memberglut-subscription-service.php:280` |
| `memberglut_subscription_cycles_complete` | `includes/services/class-memberglut-subscription-service.php:460` |
| `memberglut_subscription_deleted` | `includes/services/class-memberglut-subscription-service.php:576` |
| `memberglut_subscription_expired` | `includes/gateways/class-memberglut-gateway-stripe.php:615`<br>`includes/services/class-memberglut-subscription-service.php:518` |
| `memberglut_subscription_plan_changed` | `includes/services/class-memberglut-subscription-service.php:615` |
| `memberglut_subscription_renewed` | `includes/services/class-memberglut-subscription-service.php:458` |
| `memberglut_subscription_status_changed` | `includes/services/class-memberglut-subscription-service.php:281`<br>`includes/services/class-memberglut-subscription-service.php:345` |
| `memberglut_user_registered` | `includes/frontend/class-memberglut-auth.php:267`<br>`includes/services/class-memberglut-members.php:386` |
| `memberglut_user_roles_synced` | `includes/services/class-memberglut-role-sync.php:139` |
| `memberglut_webhook_received` | `includes/gateways/class-memberglut-gateway-paypal.php:504`<br>`includes/gateways/class-memberglut-gateway-stripe.php:630` |

## Filters (65)

| Hook | Where |
|---|---|
| `memberglut_access_decision` | `includes/services/class-memberglut-access.php:136`<br>`includes/services/class-memberglut-access.php:186` |
| `memberglut_account_subscription_actions` | `includes/frontend/class-memberglut-account.php:315` |
| `memberglut_account_tab_content` | `includes/frontend/class-memberglut-account.php:235` |
| `memberglut_account_tabs` | `includes/frontend/class-memberglut-account.php:96` |
| `memberglut_admin_notices` | `includes/admin/class-memberglut-admin-notices.php:97` |
| `memberglut_admin_pages` | `includes/class-memberglut-app.php:87` |
| `memberglut_agreements` | `includes/frontend/class-memberglut-agreements.php:46` |
| `memberglut_always_open_pages` | `includes/services/class-memberglut-rules.php:490` |
| `memberglut_blocks` | `includes/frontend/class-memberglut-blocks.php:78` |
| `memberglut_can_join_plan` | `includes/services/class-memberglut-plans.php:896` |
| `memberglut_capability_groups` | `includes/services/class-memberglut-roles-service.php:192` |
| `memberglut_client_ip` | `includes/core/functions-core.php:309` |
| `memberglut_components` | `includes/core/class-memberglut-plugin.php:48` |
| `memberglut_countries` | `includes/frontend/class-memberglut-fields.php:308` |
| `memberglut_coupon_is_valid` | `includes/services/class-memberglut-coupons.php:200` |
| `memberglut_dashboard_stats` | `includes/services/class-memberglut-dashboard.php:194` |
| `memberglut_email_tags` | `includes/services/class-memberglut-mailer.php:314` |
| `memberglut_email_triggers` | `includes/services/class-memberglut-mailer.php:85` |
| `memberglut_failed_login_ip_limit` | `includes/services/class-memberglut-security.php:79` |
| `memberglut_field_types` | `includes/core/class-memberglut-settings.php:190` |
| `memberglut_form_action` | `includes/frontend/class-memberglut-auth.php:499` |
| `memberglut_format_price` | `includes/core/functions-core.php:134` |
| `memberglut_gateways` | `includes/gateways/class-memberglut-gateways.php:39` |
| `memberglut_is_always_open_request` | `includes/frontend/class-memberglut-restriction-frontend.php:110` |
| `memberglut_is_pro_active` | `includes/core/functions-core.php:268` |
| `memberglut_limit_sessions_for_user` | `includes/services/class-memberglut-security.php:222` |
| `memberglut_login_history_size` | `includes/services/class-memberglut-security.php:389` |
| `memberglut_member_export_columns` | `includes/services/class-memberglut-members.php:588` |
| `memberglut_member_export_row` | `includes/services/class-memberglut-members.php:631` |
| `memberglut_member_field` | `includes/frontend/class-memberglut-account.php:898` |
| `memberglut_order_summary` | `includes/services/class-memberglut-pricing.php:97` |
| `memberglut_page_url` | `includes/core/functions-core.php:237` |
| `memberglut_plan` | `includes/services/class-memberglut-plans.php:213` |
| `memberglut_plan_change_amount` | `includes/services/class-memberglut-pricing.php:61` |
| `memberglut_plan_columns` | `includes/services/class-memberglut-plans.php:412` |
| `memberglut_plan_settings_schema` | `includes/services/class-memberglut-plans.php:37` |
| `memberglut_plan_validation_errors` | `includes/services/class-memberglut-plans.php:368` |
| `memberglut_profile_fields` | `includes/frontend/class-memberglut-account.php:377` |
| `memberglut_profile_validate` | `includes/frontend/class-memberglut-account.php:623` |
| `memberglut_redirect_url` | `includes/services/class-memberglut-redirects.php:133`<br>`includes/services/class-memberglut-redirects.php:148`<br>`includes/services/class-memberglut-redirects.php:172` |
| `memberglut_registration_forms` | `includes/services/class-memberglut-plans.php:480` |
| `memberglut_registration_result` | `includes/frontend/class-memberglut-auth.php:297` |
| `memberglut_registration_validate` | `includes/frontend/class-memberglut-auth.php:221` |
| `memberglut_render_field` | `includes/frontend/class-memberglut-fields.php:76` |
| `memberglut_restricted_post_types` | `includes/admin/class-memberglut-post-access-admin.php:41` |
| `memberglut_restriction_message` | `includes/services/class-memberglut-access.php:373` |
| `memberglut_rule_conditions` | `includes/services/class-memberglut-rules.php:77` |
| `memberglut_rule_settings_schema` | `includes/services/class-memberglut-rules.php:87` |
| `memberglut_rule_target_matches` | `includes/services/class-memberglut-rules.php:567`<br>`includes/services/class-memberglut-rules.php:598` |
| `memberglut_rule_target_post_ids` | `includes/services/class-memberglut-rules.php:714` |
| `memberglut_rule_targets` | `includes/services/class-memberglut-rules.php:68` |
| `memberglut_sanitize_field` | `includes/frontend/class-memberglut-fields.php:220` |
| `memberglut_sanitize_rule_condition` | `includes/services/class-memberglut-rules.php:397` |
| `memberglut_sanitize_rule_target` | `includes/rest/class-memberglut-rest-rules.php:361`<br>`includes/services/class-memberglut-rules.php:279` |
| `memberglut_screen_caps` | `includes/core/class-memberglut-permissions.php:91` |
| `memberglut_send_email` | `includes/services/class-memberglut-mailer.php:438` |
| `memberglut_setup_checklist` | `includes/services/class-memberglut-dashboard.php:296` |
| `memberglut_status_checks` | `includes/services/class-memberglut-tools.php:570` |
| `memberglut_sweep_skip_subscription` | `includes/services/class-memberglut-subscription-service.php:707` |
| `memberglut_sync_user_roles` | `includes/services/class-memberglut-role-sync.php:40` |
| `memberglut_teaser` | `includes/services/class-memberglut-access.php:339` |
| `memberglut_template_path` | `includes/core/functions-core.php:280` |
| `memberglut_user_bypasses_restrictions` | `includes/core/functions-core.php:259` |
| `memberglut_user_passes_condition` | `includes/services/class-memberglut-access.php:115` |
| `memberglut_validate_field` | `includes/frontend/class-memberglut-fields.php:215` |

