> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 16 — Pro extension points

| | |
|---|---|
| **Depends on** | the free feature each hook sits in |
| **Unlocks** | MemberGlut Pro (separate plugin) |
| **Screens** | Pro Features (`ProFeatures.jsx`, `proFeatures.js`) + JS slot registry for all React screens |


Free must stay fully functional; Pro is a separate plugin (`memberglut_is_pro_active` filter already exists). Provide hooks so every Pro feature in `proFeatures.js` can plug in without editing free:

| Pro feature group | Extension point in free |
|---|---|
| Content dripping, metered paywall, AND/OR rules, scheduled rules, custom-field restriction, hide everywhere, search-engine access | `memberglut_access_decision` filter (post-decision), `memberglut_rule_targets` / `memberglut_rule_conditions` filters (extra target/condition types rendered by the Rule editor through a registry passed in lookups), `memberglut_rule_saved` |
| Protected downloads | `memberglut_access_decision` + `[memberglut_restrict]` reuse |
| More gateways, proration, teams, tax/VAT, invoices, multi-currency, PWYW, gifts, pause, order bumps, auto-renew choice, advanced coupons, pay-per-post, pricing fields | `memberglut_gateways`, `memberglut_order_summary`, `memberglut_plan_change_amount`, `memberglut_plan_editor_sections` (extra Plan editor sections via a JS registry `window.memberglutAdmin.registerSection`), `memberglut_checkout_fields`, `memberglut_payment_completed`, `memberglut_coupon_is_valid` |
| Forms (60+ fields, conditional, multi-step, several forms, popup) | `memberglut_registration_forms`, `memberglut_field_types`, `memberglut_render_field`, `memberglut_validate_field` |
| Social login, 2FA, magic link, invite codes, password policies | `memberglut_login_form_after_fields`, `authenticate` priority slots, `memberglut_registration_validate` |
| Community, marketing, integrations, notifications, reports | lifecycle actions (Appendix C), `memberglut_account_tabs`, `memberglut_email_triggers` (custom emails registered into the Emails screen), REST namespace sharing |
| Admin UI | JS slot registry so Pro screens/sections render inside the same React shell (menu items via `memberglut_admin_pages` filter in `MemberGlut_App::pages()`) |

Also: reconcile `proFeatures.js` with free (D2), keep the Pro page purely informational (no disabled controls inside free screens).

---

## Option relations

| Hook | Lives in | Phase |
|---|---|---|
| `memberglut_access_decision`, `memberglut_rule_targets` | access engine | P7 |
| `memberglut_gateways`, `memberglut_order_summary`, `memberglut_plan_change_amount`, `memberglut_coupon_is_valid` | checkout | P9 |
| `memberglut_registration_forms`, `memberglut_field_types` | forms (plan editor `form` select reads it — D2) | P8, P2 |
| `memberglut_account_tabs` | account | P10 |
| `memberglut_email_triggers`, `memberglut_email_tags` | mailer / Emails screen | P5 |
| `memberglut_capability_groups` | roles | P3 |
| `memberglut_admin_pages`, JS section registry | admin app, Plan/Rule editors | P0, P2, P7 |

## Step-by-step

- [ ] 1. Add each hook while building its phase (don't leave for the end) — this file is the checklist.
- [ ] 2. JS registry `window.memberglutAdmin.registerSection(screen, section)` used by `SettingsPanel`.
- [ ] 3. Reconcile `proFeatures.js` with free (D2).
- [ ] 4. Document hooks (developer docs page / `docs/hooks.md`).

## Definition of done
- A sample Pro add-on can add a gateway, a rule condition, an account tab and a Plan editor section without editing free files.
