> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Appendix E — Gaps vs. `free_features.html`

Features the competitor research marks **P1/P2** that the current UI does **not** expose. Decide per item; recommended additions are cheap once the phases above exist.

| Item (priority) | Recommendation | Where |
|---|---|---|
| Taxonomy term edit-screen restriction (P1) | add term meta box using the per-post component | P7 |
| Lockout-safe defaults (P1) | covered (admin bypass D11, deactivation unlocks) | P7 |
| Multiple roles per user on user-new.php (P1) | covered in P3 | P3 |
| Per-role behaviour settings (P1, UM-style) | partially covered (admin bar, wp-admin, redirects per role); defer the rest | — |
| Payment buttons per plan (P2) | `[memberglut_buy]` covers | P8 |
| Membership column in WP Users list (P2) | add sortable “Membership” column + plan filter on `users.php` | P6 |
| Administrator rescue (P2) | covered | P3 |
| Role hierarchy / priority (P2) | `level` exists in demo ROLES only; add later (used for role-redirect order) | — |
| Renewals via Action Scheduler (P2) | covered | P0 |
| Analytics growth tab, revenue report with export (P2) | Dashboard covers basics; detailed reports are Pro | P12 |
| Gutenberg blocks for all forms (P1) | covered (Appendix D) | P8–10 |
| Elementor widgets / page-builder restriction (P2) | later integration module | — |
| REST API for integrations (P2), WP-CLI (P3) | admin REST exists; add `wp memberglut member list|grant|revoke` later | — |
| Widget visibility (P3) | small add-on to P7 | P7 |
| Login page customizer (P2) | not in UI; skip or later | — |
| Avatar upload, public profiles, directory (P2) | Pro/community | — |
| WooCommerce members-only products (P1) | Pro integration per `proFeatures.js` | P16 |

