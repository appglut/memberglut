# MemberGlut — Implementation Plans

Step-by-step plans to make every screen, option and shortcode of MemberGlut actually work.
Audit date: 2026-10-08 · plugin 1.1.5 · the React admin is design-only today (demo data, no REST API).

## How to use this folder

1. Read **[00-overview.md](00-overview.md)**: what exists today, plus the target architecture.
2. Read **[01-dependency-map.md](01-dependency-map.md)**: the rules for how options in one section change behaviour in other sections. **This is the contract between phases.**
3. Agree on **[02-decisions.md](02-decisions.md)** (D1–D20) before writing code.
4. Build the phases **in the order below**, one file at a time. Each phase file has:
   - **Header**: depends on / unlocks / screens / files
   - **Spec**: what to build, field by field
   - **Option relations**: which other sections read what this phase builds, and which options from other sections this phase must read
   - **Step-by-step**: checklist to tick
   - **Definition of done**
5. After every phase, run the **cross-section regression checklist** in [phase-17-qa-release.md](phase-17-qa-release.md).
6. Tick the tracker below and the options in [appendix-a-option-registry.md](appendix-a-option-registry.md).

## Rules while implementing

- **Never build a consumer without checking its source in `01-dependency-map.md`.** For example, a redirect must go through the single resolver (§2.4). Access checks must use the subscription statuses (§2.7).
- **When a phase adds or changes an option, update** Appendix A (registry) and every phase file that lists it under "Option relations".
- **One write path per data type.** Subscriptions only through the subscription service (P4). Emails only through the mailer (P5). Access decisions only through `MemberGlut_Access` (P7). Redirects only through `MemberGlut_Redirects` (P8).
- **Free plugin stays fully functional:** no Pro checks around free features (WordPress.org guideline 5, see `Errors_from_team.txt`).
- Every REST route needs a capability check. Every query uses `$wpdb->prepare`. Every output is escaped.

## Build order & tracker

| # | File | Builds | Depends on | Status |
|---|---|---|---|---|
| 0 | [phase-00-foundations.md](phase-00-foundations.md) | schema, settings store, REST base, lookups, scheduler, logger, events, caps | — |✅ |
| 1 | [phase-15-legacy-migration.md](phase-15-legacy-migration.md) *(migration step only)* | 1.1.5 → new schema/options | P0 |◐ migrations done, cleanup pending |
| 2 | [phase-01-global-settings.md](phase-01-global-settings.md) | persistence + validation for ~120 settings | P0 |✅ |
| 3 | [phase-03-roles-capabilities.md](phase-03-roles-capabilities.md) | role editor, deny caps, multi-role, rescue | P0 |✅ |
| 4 | [phase-02-plans.md](phase-02-plans.md) | plans list + 40-field editor | P0, P1, P3 |✅ |
| 5 | [phase-04-subscription-engine.md](phase-04-subscription-engine.md) | lifecycle, role sync, expiry, jobs | P2, P3 |✅ |
| 6 | [phase-05-emails.md](phase-05-emails.md) | mailer + 23 emails | P1, P4 |✅ |
| 7 | [phase-06-members.md](phase-06-members.md) | members list, member detail, bulk, broadcast | P4, P5 |✅ |
| 8 | [phase-07-content-restriction.md](phase-07-content-restriction.md) | rules engine, per-post, blocks, menus, shortcodes | P1–P4 |✅ |
| 9 | [phase-08-forms-pages-auth.md](phase-08-forms-pages-auth.md) | pages, register/login/reset, approval, wp-login, pricing | P1, P2, P4, P5 |✅ |
| 10 | [phase-09-checkout-payments-coupons.md](phase-09-checkout-payments-coupons.md) | Stripe, bank, PayPal, coupons, payments admin | P2, P4, P5, P8 |✅ |
| 11 | [phase-11-security-privacy.md](phase-11-security-privacy.md) | sessions, lockout, captcha, GDPR | P0, P8 |✅ |
| 12 | [phase-10-my-account.md](phase-10-my-account.md) | account tabs + self-service | P8, P9, P11 |✅ |
| 13 | [phase-12-dashboard.md](phase-12-dashboard.md) | stats, chart, checklist | P4, P7, P9 |✅ |
| 14 | [phase-13-data-logs.md](phase-13-data-logs.md) | export/import, logs, status, maintenance | most | ☐ |
| 15 | [phase-14-advanced-performance.md](phase-14-advanced-performance.md) | assets, cache, uninstall, i18n, templates | P7–P10 | ☐ |
| 16 | [phase-15-legacy-migration.md](phase-15-legacy-migration.md) *(cleanup)* | remove legacy code | P7, P8, P13 | ☐ |
| 17 | [phase-16-pro-extension-points.md](phase-16-pro-extension-points.md) | hooks/slots for Pro (**add each hook during its phase**) | all | ☐ |
| 18 | [phase-17-qa-release.md](phase-17-qa-release.md) | tests, compliance, release | all | ☐ |

Phase numbers are IDs, not the order. P11 is built before P10 because the account activity tab needs login history.

## Reference files

| File | Contents |
|---|---|
| [appendix-a-option-registry.md](appendix-a-option-registry.md) | every option → default → building phase → consumers |
| [appendix-b-rest-endpoints.md](appendix-b-rest-endpoints.md) | REST endpoint replacing each demo `api.js` function |
| [appendix-c-hooks.md](appendix-c-hooks.md) | actions & filters to fire |
| [appendix-d-shortcodes-blocks.md](appendix-d-shortcodes-blocks.md) | shortcodes, attributes, blocks |
| [appendix-e-gaps.md](appendix-e-gaps.md) | competitor features (`free_features.html`) not yet in the UI |

## Rough size

| Phase | Size |
|---|---|
| P0, P4, P7, P8 | L |
| P9 | XL (Stripe → bank → PayPal → coupons) |
| P1, P2, P3, P5, P6, P10, P11, P12, P13, P15, P16 | M |
| P14, P17 | S–M |
