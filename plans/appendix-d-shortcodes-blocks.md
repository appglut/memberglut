> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Appendix D — Shortcodes & blocks

Each shortcode gets a matching block (`memberglut/<name>`, server-rendered via the same callback, `block.json`, editor preview with `ServerSideRender`).

| Shortcode | Attributes | Phase |
|---|---|---|
| `[memberglut_register]` | `plan` (slug/id) | 8/9 |
| `[memberglut_login]` | `redirect` | 8 |
| `[memberglut_account]` | `tab` (default) | 10 |
| `[memberglut_lost_password]` | — | 8 |
| `[memberglut_profile]` | — | 10 |
| `[memberglut_plans]` | `group`, `plans`, `layout`, `columns` | 8 |
| `[memberglut_buy]` | `plan`, `label` | 8 |
| `[memberglut_receipt]` | — (reads payment from session/query with key) | 9 |
| `[memberglut_payments]` | `limit` | 10 |
| `[memberglut_restrict]…` | `plans`, `roles`, `not`, `logged_in`, `message` | 7 |
| `[memberglut_logged_in]…` / `[memberglut_logged_out]…` | — | 7 |
| `[memberglut_member]` | `field` (core or custom key, `plan`, `expiry`) | 10 |
| `[memberglut_expiry]` | `plan`, `format` | 10 |
| `[memberglut_members]` | `plan`, `limit`, `fields` (public data only — names/avatars; opt-in privacy) | 10 |
| `[memberglut_count]` | `plan`, `status` | 10 |
| Legacy aliases | `memberglut_login_form`, `memberglut_register_form`, `memberglut_content`, `memberglut_member_info` | 15 |

Plus non-shortcode blocks/extensions: “Membership visibility” panel on every block, navigation-link visibility, “Content restriction” wrapper block (optional, = `[memberglut_restrict]`).

