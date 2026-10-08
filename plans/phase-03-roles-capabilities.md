> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 3 — Roles & Capabilities

| | |
|---|---|
| **Depends on** | P0 |
| **Unlocks** | P2 role select, P4 role sync, P7 `who=roles`, P1 role-based settings (admin bar, wp-admin block, role redirects) |
| **Screen** | Roles & Capabilities (`Roles.jsx`); WP user screens (`user-edit.php`, `user-new.php`, `profile.php`); wp-login rescue |


### 3.1 Backend (`MemberGlut_Roles`, `MemberGlut_Capabilities` refactor)
* `GET /roles` → slug, name, users (`count_users()`), builtin (WP core five), protected (`administrator`), isDefault (`get_option('default_role')`), custom, used_by_plans (plan ids using it as `role`/`expire_role`).
* `GET /capabilities` → groups: General, Posts, Pages, Users, Appearance, Plugins, MemberGlut, Custom, **plus generated groups** per public CPT (from `get_post_type_object()->cap`), per taxonomy (`->cap`), and third-party groups via filter `memberglut_capability_groups` (WooCommerce/EDD/etc. ship their own caps). `roleCaps` map: `grant` (true), `deny` (false), unset (absent).
* `PUT /roles/{slug}` caps map; `POST /roles` (name, slug immutable, clone source); `POST /roles/{slug}/clone`; `POST /roles/{slug}/default`; `DELETE /roles/{slug}` (not builtin, not default, not used by a plan unless `replacement` given; users moved to `default_role`); `POST /capabilities` (add custom cap to registry + grant on current role); `DELETE /capabilities/{cap}` (only custom, removes from all roles).
* **Deny wins:** filter `user_has_cap` (priority 999): for every role of the user, if the role stores the cap as `false` → `$allcaps[cap] = false`. Skip for super admins. Never allow deny on `administrator` (protected, read-only in UI).
* **Import/export:** `GET /roles/export?roles[]=` → JSON {version, roles:[{slug,name,caps}]}; `POST /roles/import/preview` → per role: new / exists (with diff) / protected; `POST /roles/import` with choice per role: import, skip, overwrite, rename. The Upload button currently just shows a toast — build a preview modal.
* Every change writes an `events` row (`object_type=role`, `cap_change`) — replaces the `memberglut_capability_log` option.

### 3.2 Role options (left column)
| Option | Implementation | Linked to |
|---|---|---|
| *Multiple roles per user* (`multi_roles`) | On `user-edit.php`/`profile.php`/`user-new.php`: hide core role dropdown, render role checkboxes (primary first in `wp_capabilities`), save with `set_role` + `add_role`. Respect `promote_users` and editable_roles. | Plan `keep_roles`; Member detail “Role” shows all roles |
| *Admin rescue link* (`rescue`) | `login_form_memberglut_rescue` handler on wp-login.php: form asking for email; if the account is (or was flagged as) an administrator / super admin, email a 15-minute single-use signed link; link restores `administrator` role + MemberGlut caps; rate limit 3/hour per IP (transient). Must stay reachable even with `replace_wp_pages`, `custom_login_slug` and `private_site`. | Security, wp-login override |

Persist both in `memberglut_role_options` via `PUT /roles/options`.

### 3.3 MemberGlut caps
Register the caps from 00-overview §1.4; give them to administrators; show them in the MemberGlut group; access caps `memberglut_basic_access/premium/vip` stay for back-compat (default roles).

**Acceptance:** grant/deny/unset round-trip; a denied cap is false even if another role grants it; administrator cannot be edited; deleting a role in use by a plan is refused; import preview works; rescue link restores access.

---

## Option relations

| Item | Reaches | Rule |
|---|---|---|
| Role list (lookups) | P1 `hide_admin_bar_roles`, `block_admin_roles`, `role_redirects`; P2 plan `role`/`expire_role`; P7 rules/blocks/menus `roles`; P13 convert users | single source = WP roles |
| “Make default for new users” (WP `default_role`) | P8 registration creates users with it; P4 fallback role after expiry | D3 — separate from `default_plan` |
| Delete role | P2 plans using it (`used_by_plans`) | blocked unless replacement; users → `default_role` |
| Deny state | `user_has_cap` everywhere | deny wins over grants; never on administrator |
| `multi_roles` | WP user screens; P2 `keep_roles` produces multi-role users; P6 Member detail shows all roles | — |
| `rescue` | wp-login `action=memberglut_rescue` | must bypass P8 `replace_wp_pages`, `custom_login_slug` and P7 `private_site` |
| MemberGlut caps group | P0 permission map for every screen/REST route | administrators always keep them |
| Capability changes | `events` (P13 access log) | replaces `memberglut_capability_log` option (P15) |
| Import/export | P13 setup export includes roles | protected roles never overwritten |

## Step-by-step

- [ ] 1. `GET /roles` (counts, flags, `used_by_plans`) and `GET /capabilities` (static + generated CPT/taxonomy groups + `memberglut_capability_groups` filter + custom registry).
- [ ] 2. `PUT /roles/{slug}` tri-state save (grant=true, deny=false, unset=removed).
- [ ] 3. `user_has_cap` priority 999 deny enforcement + unit tests (two roles, one grants, one denies).
- [ ] 4. Create / clone / make default / delete (guards) endpoints; custom capability add/remove.
- [ ] 5. Import preview modal (import/skip/overwrite/rename) + export download.
- [ ] 6. Role options endpoint; multi-role checkboxes on user screens.
- [ ] 7. Rescue flow on wp-login with token + rate limit + email.
- [ ] 8. Events for every change; wire `Roles.jsx` (remove demo `ROLE_CAPS`).

## Definition of done
- Administrator read-only; denied cap is false for a multi-role user; role used by a plan cannot be deleted silently; rescue restores admin.
