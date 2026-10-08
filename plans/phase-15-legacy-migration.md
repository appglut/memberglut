> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 15 — Legacy migration & cleanup

| | |
|---|---|
| **Depends on** | P0 schema (run the migration as part of P0's migration list, but finish cleanup after P7/P8 replace the legacy code) |
| **Unlocks** | safe upgrade from 1.1.5 |
| **Touches** | legacy tables, options, post meta, shortcodes, `class-memberglut-admin.php`, `class-memberglut-access-control.php`, `class-memberglut-forms.php`, `class-memberglut.php`, `class-memberglut-extensions.php`, `assets/js/frontend.js` |


One migration step (`db_version` bump) run once, idempotent, logged:

| Legacy | New |
|---|---|
| `memberglut_user_plans` rows | `subscriptions` (status kept, `end_date`→`expires_at`, `trial_end_date`→`trial_ends_at`, `auto_renew` dropped, `source=import`) |
| `memberglut_plans` old columns (`plan_billing_cycle`, `plan_duration`, `plan_trial_days`) | `billing`, `duration_*`, `trial_*` (lifetime → one_time/unlimited; monthly → recurring 1 month; yearly → recurring 1 year; price 0 → type free) |
| `memberglut_plan_features` | plan `settings.features` |
| `memberglut_user_memberships` (role log) | `events` (`grant`) |
| `memberglut_custom_roles` | nothing to do (roles live in WP); drop table |
| `memberglut_access_restrictions` | drop (unused) |
| `_memberglut_required_roles` + `_memberglut_restriction_message`, `_memberglut_redirect_type/_url`, `_memberglut_excerpt_type`, `_memberglut_teaser_length`, `_memberglut_hide_menu_item`, `_memberglut_allow_comments` | `_memberglut_access` {who: roles, roles, message…} |
| options `memberglut_restriction_message` | `msg_logged_out` + `msg_logged_in` |
| `memberglut_enable_content_restriction` | (always on; if false at migration, create no rules and keep per-post meta inactive → show notice) |
| `memberglut_whole_site_login_control`, `memberglut_whole_site_allowed_pages` (paths) | `private_site`, `private_site_exceptions` (resolve paths to page IDs; unresolved paths kept in a hidden `private_site_paths` array still honoured) |
| `memberglut_override_wp_login`, `memberglut_custom_login_url`, `_register_url`, `_lostpassword_url` | `replace_wp_pages`, `custom_login_slug`, page slots (resolve slugs to pages) |
| `memberglut_hide_admin_bar` (bool) | `hide_admin_bar_roles` = all non-admin roles if true |
| `memberglut_auto_login_after_register` | `auto_login` |
| `memberglut_login_redirect`, `memberglut_logout_redirect_url` (note: code reads `memberglut_logout_redirect` — bug) | `redirect_login=url` + URL, `redirect_logout=url` + URL |
| `memberglut_default_role` | D3 |
| `memberglut_remove_data_on_uninstall` | `delete_on_uninstall` |
| `memberglut_capability_log` option | `events` |
| `memberglut_registered_capabilities` | kept |
| Shortcodes `[memberglut_login_form]`, `[memberglut_register_form]`, `[memberglut_content]`, `[memberglut_member_info]` | aliases of `[memberglut_login]`, `[memberglut_register]`, `[memberglut_restrict roles=]`, `[memberglut_member]` |
| WP `users_can_register` checks in forms | `allow_registration` |

Cleanup after migration: delete `class-memberglut-admin.php` classic screens (keep only what moved: metabox → new admin module, settings registration removed), `MemberGlut::check_content_access`/`filter_restricted_*` (dead code), `MemberGlut_Extensions` feature-activation AJAX (pro placeholders — risk under guideline 5), `memberglut_get_pro_features()` list, legacy jQuery forms, `Errors_from_team.txt`/HTML research files from the release zip, the `memberglut_use_react_admin` fallback (or keep as a dev switch). Update readme (features, external services, changelog).

---

## Option relations (legacy → new owner)

| Legacy item | New option / owner | Owner phase |
|---|---|---|
| `memberglut_whole_site_*` | `private_site`, `private_site_exceptions` | P7 |
| `memberglut_override_wp_login`, `memberglut_custom_*_url` | `replace_wp_pages`, `custom_login_slug`, page slots | P8 |
| `memberglut_hide_admin_bar` | `hide_admin_bar_roles` | P11 |
| `memberglut_login_redirect`, `memberglut_logout_redirect_url` | `redirect_login(_url)`, `redirect_logout(_url)` | P8 |
| `memberglut_auto_login_after_register` | `auto_login` | P8 |
| `memberglut_restriction_message` | `msg_logged_out`, `msg_logged_in` | P7 |
| `memberglut_default_role` | WP `default_role` (D3) | P3 |
| `memberglut_remove_data_on_uninstall` | `delete_on_uninstall` | P14 |
| `memberglut_capability_log` | events | P3 |
| `_memberglut_*` post meta | `_memberglut_access` | P7 |
| `user_plans`, `plan_features`, old plan columns | `subscriptions`, plan `settings.features`, new columns | P2, P4 |
| Legacy shortcodes | aliases | P7, P8, P10 |
| `users_can_register` checks | `allow_registration` | P8 |

## Step-by-step

- [ ] 1. Write the migration (idempotent, logged, batched for big sites) — schedule it inside P0.
- [ ] 2. Backup notice in the upgrade notice + admin notice “database updated”.
- [ ] 3. After P7: delete legacy access-control filters; after P8: legacy forms and `frontend.js`; after P13: classic admin screens and extensions AJAX.
- [ ] 4. Register legacy shortcode aliases.
- [ ] 5. Fix-forward: drop legacy tables in a later migration (one release after), not immediately.
- [ ] 6. Test upgrade with a copy of a real 1.1.5 site.

## Definition of done
- A 1.1.5 site upgrades with identical access behaviour for previously restricted posts and same redirects/login URLs.
