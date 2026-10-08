> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 13 — Data & Logs (Tools)

| | |
|---|---|
| **Depends on** | almost everything (exports/imports touch plans, rules, roles, emails, coupons, settings, members) |
| **Unlocks** | migration tools, support diagnostics |
| **Screen** | Data & Logs (`Tools.jsx`) |


### 13.1 Import / Export tab
| Card | Implementation |
|---|---|
| Export members | `GET /tools/export/members?plans[]=&custom_fields=1&include_inactive=1` → CSV (same columns as §6.1). Wire the two checkboxes (currently `defaultChecked` without state). |
| Turn existing users into members | `POST /tools/convert {role, plan_id}` → batch job; skips users who already have that plan; source `convert`; returns count; role counts from `/roles`. Optional: “send activated email” checkbox (default off). |
| Settings, plans, rules & roles | `GET /tools/export/setup?sections[]=settings,plans,rules,roles,emails,coupons` → JSON `{version, site, exported_at, sections}` (secrets excluded); `POST /tools/import/preview` → per section: items new/changed/unchanged with mapping (plans matched by slug, rules by title, coupons by code, roles by slug); `POST /tools/import` applies with ID remapping (rules/coupons reference plan IDs). Wire the 6 checkboxes. |

### 13.2 Logs tab
`GET /logs?level=&source=&search=&from=&to=&page=`, `DELETE /logs`; settings row: “Logging on” = `debug_log`, “Keep logs for” = `log_retention_days` (new, default 30, 1–365), “Include debug messages” = `log_debug` (new) — **same options as Settings › Advanced** (§2.12); daily cleanup job deletes older rows (also caps `events` older than N days? No — access log is kept “for the life of the membership”; only `logs` are pruned).

### 13.3 Access log tab
`GET /events?type=&user=&from=&to=&page=` with “By” = actor display name or “system”. Pagination (current table has none).

### 13.4 System status tab
`GET /tools/status`: counts (active members, plans, rules, payments, roles); health checks — membership pages set, scheduler working + next run time (Action Scheduler or `wp_next_scheduled`), last Stripe/PayPal webhook within 7 days (only if enabled), HTTPS (`is_ssl()`/home URL scheme), caching plugin active (detect WP Rocket, LiteSpeed, W3TC, WP Super Cache, WP Fastest Cache, SG Optimizer… → note about exclusions/`exclude_cache`), emails can be sent (no `wp_mail_failed` in last 24h; button “Send test”); environment (MemberGlut, WP, PHP, MySQL, memory limit, max upload, WP-Cron disabled?, active plugins count, theme, multisite). “Copy for support” button. Also register a **Site Health** section (`debug_information` filter) and tests.

### 13.5 Maintenance tab (`POST /tools/maintenance/{task}`)
| Task | Effect |
|---|---|
| Run expirations now | expiration sweep (Phase 4) synchronously, return counts |
| Recount members | rebuild cached counts/revenue + stats backfill |
| Sync roles with plans | role sync for all users (batched) |
| Clear cached data | delete `memberglut_*` transients + object cache group |
| Reset settings (danger) | delete `memberglut_settings` (and optionally forms/emails — ask in the confirm) |
| Delete all MemberGlut data (danger) | type-to-confirm (“DELETE”), truncate/drop all tables, delete options/meta/transients, remove custom roles created by MemberGlut (users moved to `default_role`), keep WP users |

All dangerous tasks require `manage_options` + nonce + typed confirmation.

---

## Option relations

| Tools item | Related | Section |
|---|---|---|
| Logs settings row | **same options** as Settings › Advanced `debug_log` + new `log_retention_days`, `log_debug` (§2.12) | P1, P0 |
| Export members | Forms custom fields, statuses | P8, P4 |
| Convert users | roles (counts), plans, role sync | P3, P2, P4 |
| Setup export/import | settings (no secrets), plans, rules (plan ID remap), roles (protected rules), emails, coupons (plan ID remap) | P1, P2, P7, P3, P5, P9 |
| Access log | events | P0 |
| Status: pages set | page slots | P8 |
| Status: scheduler | `renewals_engine` | P0 |
| Status: webhook recent | gateway `last_webhook_at` (only if enabled) | P9 |
| Status: caching plugin | `exclude_cache` | P14 |
| Status: emails | `wp_mail_failed` | P5 |
| Maintenance tasks | P4 sweep, P4 role sync, P12 recount, P0 caches, P1 reset, P14 uninstall routine | — |

## Step-by-step

- [ ] 1. Members CSV export (filters + 2 checkboxes wired).
- [ ] 2. Convert users batch job.
- [ ] 3. Setup export JSON + import preview + apply with ID remapping.
- [ ] 4. Logs list/filter/clear + retention job; unify logging options.
- [ ] 5. Access log list with pagination and actor names.
- [ ] 6. System status + Site Health integration + “Copy for support”.
- [ ] 7. Maintenance endpoints with typed confirmation for danger tasks.
- [ ] 8. Finally delete `demoData.js` and `IS_DEMO` (last screen now live).

## Definition of done
- Setup exported from site A imports into site B with working rules/coupons referencing the right plans.
