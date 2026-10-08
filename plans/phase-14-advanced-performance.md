> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 14 — Advanced, performance, compatibility, uninstall

| | |
|---|---|
| **Depends on** | P7–P10 (front-end output exists) |
| **Unlocks** | release readiness |
| **Screens** | Settings › Advanced; theme templates; uninstall |


| Option / topic | Implementation |
|---|---|
| `load_assets` needed/everywhere | Front-end CSS/JS registered, enqueued only when a MemberGlut shortcode/block renders (`has_shortcode`, `has_block`, render callbacks enqueue late), on restricted content with teaser/login, on account/checkout pages; `everywhere` enqueues globally. Remove the global jQuery `frontend.js` and its “enhance any login form” fallback. |
| `exclude_cache` | `nocache_headers()` + `DONOTCACHEPAGE`/`DONOTCACHEOBJECT` on account, checkout, login/register/lost, thank-you and any denied/teaser render; integrations for LiteSpeed (`litespeed_control_set_nocache`), WP Rocket (`rocket_cache_reject_uri` for the pages), cookie-based variation note. |
| `renewals_engine` | Phase 0 scheduler swap. |
| `debug_log` | Phase 0 logger. |
| `delete_on_uninstall` | `uninstall.php` (replace `register_uninstall_hook` static method) honouring the new option **and** legacy `memberglut_remove_data_on_uninstall`; same routine as “Delete all data”; per-site on multisite. |
| Templates | `memberglut_locate_template()` with theme override `yourtheme/memberglut/…` for forms, account, pricing, restriction message, emails. |
| i18n | `languages/` folder + `.pot` generation (`wp i18n make-pot`), JS translations (`wp_set_script_translations` already used), RTL CSS, `wpml-config.xml` for plan names/emails/messages. |
| Multisite | per-site tables/options; network activation creates tables for all sites; `wp_initialize_site`/`wp_uninitialize_site`. |
| Performance | indexes listed in Phase 0; per-request caches; restricted-ID transients; avoid `meta_query LIKE` (legacy `filter_posts_query` does this — replace). |
| HPOS | only if a WooCommerce integration is added later. |

---

## Option relations

| Option / topic | Touches | Section |
|---|---|---|
| `load_assets` | every shortcode/block (P7–P10), restricted teaser/login output | — |
| `exclude_cache` | account, checkout, auth pages, thank-you, denied pages; Tools caching check | P7–P10, P13 |
| `renewals_engine` | scheduler | P0 |
| `debug_log` | logger, Tools | P0, P13 |
| `delete_on_uninstall` | uninstall routine = Tools “Delete all data”; legacy option | P13, P15 |
| Templates override | forms, account, pricing, restriction message, emails | P5, P7, P8, P10 |
| i18n / RTL / WPML | all strings, plan names, emails, messages | all |
| Multisite | install, uninstall, per-site settings | P0 |

## Step-by-step

- [ ] 1. Conditional asset loading + remove global jQuery script.
- [ ] 2. Cache exclusion headers + cache plugin integrations.
- [ ] 3. `uninstall.php` (honours new + legacy option, multisite aware).
- [ ] 4. Template loader with theme overrides.
- [ ] 5. `languages/`, `.pot`, RTL CSS, `wpml-config.xml`.
- [ ] 6. Performance review: indexes, caches, no `meta_query LIKE`.

## Definition of done
- Pages without MemberGlut output load no MemberGlut assets; uninstall with the option on leaves no tables/options.
