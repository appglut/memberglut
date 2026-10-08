> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 7 — Content restriction

| | |
|---|---|
| **Depends on** | P1 (restriction settings), P2 (plans), P3 (roles), P4 (has access), P8 page slots for `{login_link}`/`pricing` (can stub until P8) |
| **Unlocks** | paywall conversions (P8/P9), Dashboard/Content Rules stats (P12) |
| **Screens** | Content Rules (`ContentRules.jsx`), Rule editor (`RuleEditor.jsx`), block editor sidebar, classic metabox, Appearance › Menus, every block's inspector |


### 7.1 Decision engine (`MemberGlut_Access`)
`decide( $context, $user_id ) → Decision{ allowed, source: post|rule:{id}|site, action, redirect, message, teaser, in_lists }`, where context = post / term archive / special page / URL. Implements §2.8 precedence. Cached per request; restricted-ID sets cached in transients and invalidated on rule save, post save/term change, plan change.

**Who matching** (`access.who`): `plans` → user has access-granting sub in any listed plan; `roles` → any listed role; `logged_in`; `logged_out`; `users` (“Also allow these users”, usernames → resolved to IDs on save, ignored for `logged_out`).

### 7.2 Rule targets (protect & except) — matching for each

| Target | Singular match | Archive/list match |
|---|---|---|
| `site` | everything except always-open list (D13) | everything |
| `post_type` | `get_post_type()` | post type archive + all lists of that type |
| `pages` / `posts` | ID in list | those IDs |
| `children` | ancestors include listed ID (`include_children` also applies to `pages` targets) | — |
| `taxonomy` (+ terms) | `has_term()` | term archives of those terms + posts in lists |
| `archive` (front, blog, search, 404, author_archive, pt_archive) | conditional tags | — |
| `author` | `post_author` in list | author archives |
| `template` | `get_page_template_slug()` (lookups list real templates incl. block theme templates) | — |
| `url` | glob (`/members/*`) or regex if it starts with `^` against the request path (without home path); validate regex on save | any request |

`exclude` uses the same matcher and is checked after protect. Pickers become async searches (00-overview §1.3).

### 7.3 Enforcement points (with the option that controls each)

| Point | Hook | Controlled by |
|---|---|---|
| Single content | `the_content` (priority late), `get_the_excerpt` | action `message`/`login`, `teaser`/`teaser_words`, messages |
| Redirect actions | `template_redirect` (priority 1) | action `redirect`/`pricing` |
| Full-page protection for non-`the_content` templates (block themes, builders) | `template_redirect` + `render_block` of `core/post-content` | same |
| Lists | `pre_get_posts` (all front-end non-singular queries incl. widgets/blocks queries) / `the_content` on archives | `hide_in_lists` (+ rule/post `in_lists`) |
| Search | `pre_get_posts` `is_search` | `protect_search` |
| REST | `rest_prepare_{post_type}` for every public type + `rest_{post_type}_query` | `protect_rest` |
| Feeds | `the_content_feed`, `the_excerpt_rss` | `protect_feed`; whole feed when `private_site && private_feed` |
| Comments | `comments_open`, `comments_array`, `comments_template` | `restrict_comments`; `members_only_comments` via `pre_comment_approved`/`comments_open` for users without any access-granting sub |
| Private site | `template_redirect` priority 0 (replace legacy whole-site code) | `private_site`, `private_site_exceptions`, `private_feed`; REST: anonymous REST is not blocked except post content filtering (keep auth endpoints working) |
| Cache | send `nocache_headers()`, `DONOTCACHEPAGE` on denied/personalised pages | `exclude_cache` (Phase 14) |

Messages: `msg_logged_out` vs `msg_logged_in` chosen by login state; rule `custom_message` replaces both (one message). Tags available **everywhere**: `{login_link}`, `{register_link}`, `{pricing_link}`, `{post_title}`, `{plans}` (names of plans that would unlock it) — unify the two tip texts. Output via template `templates/restriction/message.php` (overridable), sanitised with `wp_kses_post`.
Teaser: `excerpt` = first `teaser_words` words of stripped content (or manual excerpt); `fade` = same + CSS gradient overlay. Action `login` = teaser + inline login form (`[memberglut_login]`) + register link.

### 7.4 Per-post settings (“MemberGlut box”)
* Block editor: `PluginDocumentSettingPanel` (registered via `register_post_meta` with `show_in_rest`) + classic metabox fallback for non-block post types — for **all public post types**.
* Fields: Access (`inherit` rules / everyone / logged_in / logged_out / plans / roles), plans, roles, action override, redirect URL, message for visitors, message for logged-in non-members, teaser override, in-lists override, “Hide from menus”. Show which rule currently applies (“Protected by rule *Premium articles*”).
* Meta `_memberglut_access` JSON. Per-post wins over rules (§2.8).
* `GET /rules/per-post` lists locked posts for the “Locked one by one” tab (replace `PER_POST` constant).
* Bulk edit / quick edit column “Access” in posts lists (nice-to-have).

### 7.5 Blocks, menus, widgets, shortcodes
* **Block visibility** (ContentRules tile): add attribute `memberglutVisibility {who, plans, roles, mode: show|hide}` to every block via `blocks.registerBlockType` filter + InspectorControls panel “Membership visibility”; enforce in `render_block` (server). Works in FSE templates.
* **Menus** (tile): per item fields (everyone / logged in / logged out / plans / roles) via `wp_nav_menu_item_custom_fields` + `wp_update_nav_menu_item`; enforce in `wp_nav_menu_objects`; block navigation via `render_block` on `core/navigation-link`/`core/navigation-submenu` (attribute added in editor). Remove the legacy behaviour that rewrites restricted items to “Members Only #restricted”.
* **Widgets** (legacy instance key exists): add the field to `in_widget_form` (optional, Appendix E).
* **Shortcodes:** `[memberglut_restrict plans="" roles="" not="" logged_in=""]` with fallback message; `[memberglut_logged_in]`, `[memberglut_logged_out]` (Appendix D). Legacy `[memberglut_content roles=]` stays as alias.

### 7.6 Rules screen
* `GET /rules?search=`, `POST/PUT/DELETE /rules/{id}`, `POST /rules/{id}/duplicate`, `PATCH /rules/{id}/status`.
* Validation: title required, at least one protect target, target values non-empty, regex valid, plans/roles exist.
* Stat cards: Active rules; Protected posts & pages (count of distinct post IDs matched by active rules + per-post meta, cached); Blocked views (7 days) and Joined after a paywall → **paywall tracking**: on each denial increment `stats_daily(paywall_views, rule_id|0)` (skip bots via UA check, skip admins, count once per visitor per post per day with a cookie); set cookie `mg_paywall={post,rule,time}`; on registration/checkout within 30 days increment `paywall_conversions`. Conversion % = conversions / views.
* Columns “Others see” must handle `inherit` (show the global action, e.g. “Global: Show message”) — the current `ACTION_LABEL` map has no `inherit` entry and would crash.

### 7.7 Access tester
`POST /rules/test {rule (unsaved values), rule_id?, user: 'guest'|user_id, url}` → resolve URL (`url_to_postid`, else parse request into a `WP_Query`-like context incl. archives), run the engine with the unsaved rule substituted, return allowed/blocked + deciding source + what the visitor sees. User select = async user search + “logged-out visitor”.

**Acceptance:** matrix tests (target × who × action × list mode); deactivating the plugin unlocks everything; administrators always pass; REST and feeds never leak full content of restricted posts.

---

## Option relations

| Restriction piece | Reads | Defined in |
|---|---|---|
| Rule `who=plans` | access statuses (active, trialing, canceled-until-end, `on_hold` only if `retry_status=active`) | P4 §2.7 |
| Rule `who=roles` | role list | P3 |
| Rule `action=inherit` | `restrict_action`, `restrict_redirect_url` | P1 |
| Action `pricing` | `page_pricing`, `respect_redirect_to` | P8, P1 (§2.4) |
| Action `login` | `[memberglut_login]` + Forms login options | P8 |
| Message tags | page slots (§2.2), plan names | P8, P2 |
| `teaser=inherit` | `teaser`, `teaser_words` | P1 |
| `in_lists=inherit` | `hide_in_lists`, `protect_search` (D12) | P1 |
| REST / feeds / comments | `protect_rest`, `protect_feed`, `private_feed`, `restrict_comments`, `members_only_comments` | P1 |
| Private site wall | `private_site`, `private_site_exceptions`; always-open list (D13) | P1, P8 |
| Per-post box | wins over rules (§2.8) | — |
| Cache headers on denied pages | `exclude_cache` | P14 |
| Paywall stats & conversions | registration/checkout hooks | P8, P9 → P12 |
| Plan delete | removes plan from rules | P2 (D16) |
| Admin bypass | `manage_options` (D11) | — |
| Rule tester | same engine | — |

## Step-by-step

- [ ] 1. Rule model/repository + REST (CRUD, duplicate, status, per-post list, stats, test).
- [ ] 2. Target matchers (10 types) for singular + list contexts; regex validation on save.
- [ ] 3. `MemberGlut_Access::decide()` with precedence and field-by-field inheritance; per-request + transient caches; invalidation hooks.
- [ ] 4. Enforcement hooks table (“7.3” above) — replace legacy `MemberGlut_Access_Control` filters one by one.
- [ ] 5. Restriction message template + teaser/fade CSS.
- [ ] 6. Private site wall (replace legacy whole-site code) with always-open list.
- [ ] 7. Per-post sidebar panel + classic metabox for all public post types; `register_post_meta`.
- [ ] 8. Block visibility attribute + inspector panel + `render_block` enforcement.
- [ ] 9. Menu item fields + nav block visibility; remove “Members Only” rewrite.
- [ ] 10. Shortcodes `[memberglut_restrict]`, `[memberglut_logged_in]`, `[memberglut_logged_out]` (+ legacy alias).
- [ ] 11. Paywall tracking (views cookie, conversions) into `stats_daily`.
- [ ] 12. Wire Rules list (fix `ACTION_LABEL` missing `inherit`, real stats) and Rule editor (async pickers, real tester).

## Definition of done
- Matrix tests pass; plugin deactivation unlocks everything; REST/feeds never leak; admins always see content.
