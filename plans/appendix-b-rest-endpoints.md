> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Appendix B — REST endpoint map

| `api.js` function (demo today) | Endpoint | Phase |
|---|---|---|
| `getStats` | `GET /dashboard/stats` | 12 |
| `getActivity` | `GET /events?limit=7` | 12 |
| `getSetupChecklist` | `GET /dashboard/checklist` | 12 |
| `getPlans` / `getPlan` | `GET /plans`, `GET /plans/{id}` | 2 |
| `savePlan` / `deletePlan` | `POST /plans`, `PUT /plans/{id}`, `DELETE /plans/{id}` | 2 |
| *(new)* | `POST /plans/{id}/duplicate`, `PATCH /plans/{id}/status`, `PUT /plans/order`, `GET /plans/{id}/rules` | 2 |
| `getMembers` | `GET /members` (+ `/members/counts`) | 6 |
| `getMember` | `GET /members/user/{user_id}` | 6 |
| `saveMember` | `POST /members` (add), `PATCH /subscriptions/{id}`, `POST /subscriptions/{id}/{cancel|expire|change-plan|extend}`, `DELETE /subscriptions/{id}` | 6 |
| *(new)* | `POST /members/bulk`, `POST /members/broadcast`, `GET /members/export`, `POST /members/user/{id}/{approve|reject|password-reset|logout-all}`, `GET/POST/DELETE /members/user/{id}/notes` | 6 |
| `getRules` / `getRule` / `saveRule` | `GET /rules`, `GET /rules/{id}`, `POST/PUT /rules/{id}` | 7 |
| *(new)* | `DELETE /rules/{id}`, `POST /rules/{id}/duplicate`, `PATCH /rules/{id}/status`, `GET /rules/per-post`, `GET /rules/stats`, `POST /rules/test` | 7 |
| `getRoles` / `getCapabilities` / `saveRole` | `GET /roles`, `GET /capabilities`, `PUT /roles/{slug}` | 3 |
| *(new)* | `POST /roles`, `POST /roles/{slug}/clone`, `POST /roles/{slug}/default`, `DELETE /roles/{slug}`, `POST/DELETE /capabilities`, `GET /roles/export`, `POST /roles/import/preview`, `POST /roles/import`, `GET/PUT /roles/options` | 3 |
| `getPayments` | `GET /payments` (+ `/payments/summary`) | 9 |
| *(new)* | `GET /payments/{id}`, `POST /payments`, `POST /payments/{id}/{mark-paid|refund|resend-receipt}`, `GET /payments/export` | 9 |
| `getCoupons` / `saveCoupon` | `GET /coupons`, `POST/PUT /coupons/{id}` | 9 |
| *(new)* | `DELETE /coupons/{id}`, `POST /coupons/import` | 9 |
| `getEmails` / `saveEmails` | `GET /emails`, `PUT /emails` | 5 |
| *(new)* | `POST /emails/{key}/reset`, `POST /emails/{key}/test`, `GET /emails/{key}/preview` | 5 |
| `getPages` | `GET /lookups/pages` (+ `/lookups`, `/lookups/posts`, `/lookups/terms`, `/lookups/users`, `/lookups/templates`, `/lookups/authors`) | 0 |
| `getSettings` / `saveSettings` | `GET /settings`, `PUT /settings` | 1 |
| `getFormsConfig` / `saveFormsConfig` | `GET /forms`, `PUT /forms`, `POST /forms/pages/create` | 8 |
| `getLogs` | `GET /logs`, `DELETE /logs` | 13 |
| *(new)* | `GET /events`, `GET /logins`, `GET /tools/status`, `GET /tools/export/{members|setup}`, `POST /tools/import/preview`, `POST /tools/import`, `POST /tools/convert`, `POST /tools/maintenance/{task}` | 13 |
| *(public, front-end)* | `POST /public/register`, `POST /public/login`, `POST /public/lost-password`, `POST /public/reset-password`, `POST /public/checkout`, `POST /public/coupon/validate`, `POST /public/account/{action}`, `POST /webhook/{gateway}` | 8–10 |

