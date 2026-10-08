import { a8 as __, bk as faGear, bO as faShieldHalved, bJ as faRightToBracket, aN as faArrowsTurnRight, b2 as faCircleUser, b6 as faCreditCard, ba as faEnvelope, c0 as faUserLock, c4 as faUserShield, bN as faScaleBalanced, bP as faSliders, cV as jsxRuntimeExports, P as Page, b as App, d8 as reactExports, aD as createRoot } from "./chunks/Page-BUA-PWqe.js";
import { C as CopyCode, S as SettingsPanel } from "./chunks/SettingsPanel-B6tbNAXN.js";
import { S as Select, ad as getSettings, aA as saveSettings } from "./chunks/api-BM7DBw7H.js";
import { c as roleOptions$1, L, p as pageOptions$1 } from "./chunks/lookups-DOjv_COY.js";
import { F as ForwardTable } from "./chunks/Table-D-hy_ITf.js";
import { I as Input } from "./chunks/index-C2zsmztB.js";
import { S as Spin } from "./chunks/index-B04I5vrr.js";
import "./chunks/dayjs.min-Bm93or1s.js";
import "./chunks/index-DiRpu2og.js";
import "./chunks/index-DB9Yoa9e.js";
import "./chunks/index-sggwWRB7.js";
import "./chunks/index-C8TTcjuW.js";
import "./chunks/index-BeGMKRU0.js";
import "./chunks/index-DGAtssNh.js";
import "./chunks/useBreakpoint-CSmdvqeW.js";
const roleOptions = roleOptions$1();
const freePlanOptions = L.plans.filter((p) => p.type === "free" && p.status === "active").map((p) => ({ value: p.id, label: p.name }));
const pageOptions = pageOptions$1();
const site = (L.site.url || "https://yoursite.com/").replace(/\/$/, "");
const DEFAULTS = {
  // General
  default_plan: null,
  private_site: false,
  private_site_exceptions: [],
  private_site_paths: [],
  private_feed: false,
  hide_admin_bar_roles: ["subscriber", "memberglut_basic", "memberglut_premium", "memberglut_vip"],
  block_admin_roles: ["subscriber", "memberglut_basic", "memberglut_premium", "memberglut_vip"],
  admin_redirect_page: 0,
  // Content restriction
  restrict_action: "message",
  restrict_redirect_url: "",
  msg_logged_out: "<h3>Members only</h3>\n<p>This content is for members. {login_link} or {register_link} to read it.</p>",
  msg_logged_in: "<h3>Upgrade to continue</h3>\n<p>Your current plan does not include this content. {pricing_link}</p>",
  teaser: "excerpt",
  teaser_words: 55,
  hide_in_lists: "show_excerpt",
  protect_rest: true,
  protect_feed: true,
  protect_search: false,
  restrict_comments: true,
  members_only_comments: false,
  // Login & registration
  allow_registration: true,
  replace_wp_pages: true,
  custom_login_slug: "",
  approval: "auto",
  auto_login: true,
  password_min: 8,
  password_strength: "medium",
  show_password_toggle: true,
  terms_required: false,
  terms_page: 0,
  privacy_required: true,
  privacy_page: 0,
  email_whitelist: [],
  email_blacklist: [],
  // Redirects
  redirect_login: "account",
  redirect_login_url: "",
  redirect_logout: "home",
  redirect_logout_url: "",
  redirect_register: "account",
  redirect_register_url: "",
  respect_redirect_to: true,
  redirect_logged_in_from_forms: true,
  role_redirects: [{ role: "memberglut_vip", login: "/vip-lounge/", logout: "" }],
  // Account
  tab_dashboard: true,
  tab_profile: true,
  tab_password: true,
  tab_subscriptions: true,
  tab_payments: true,
  tab_activity: true,
  tab_delete: false,
  allow_cancel: true,
  allow_renew: true,
  renew_days_before: 15,
  allow_change: true,
  allow_downgrade: true,
  allow_abandon: false,
  cancel_access: "period_end",
  // Payments
  currency: "USD",
  currency_position: "before",
  thousand_sep: ",",
  decimal_sep: ".",
  decimals: 2,
  test_mode: true,
  stripe_enabled: false,
  stripe_mode: "test",
  stripe_test_publishable: "",
  stripe_test_secret: "",
  stripe_live_publishable: "",
  stripe_live_secret: "",
  stripe_webhook_secret: "",
  stripe_wallets: true,
  stripe_save_cards: true,
  paypal_enabled: false,
  paypal_mode: "sandbox",
  paypal_client_id: "",
  paypal_secret: "",
  paypal_webhook_id: "",
  bank_enabled: false,
  bank_title: "Bank transfer",
  bank_instructions: "Account name: …\nIBAN: …\nUse your order number as the reference.",
  bank_activate: "on_confirm",
  retry_failed: true,
  retry_max: 3,
  retry_interval: 3,
  retry_status: "on_hold",
  refund_revokes: true,
  // Emails
  sender_name: "",
  sender_email: "",
  admin_recipients: "",
  email_html: true,
  email_logo: "",
  email_color: "#e94560",
  email_footer: "{site_name} · You receive this email because you have an account with us.",
  // Security
  limit_sessions: false,
  max_sessions: 1,
  session_behavior: "logout_oldest",
  limit_failed: true,
  failed_attempts: 5,
  lockout_minutes: 15,
  honeypot: true,
  logout_on_close: false,
  captcha_provider: "none",
  captcha_on: ["register", "login"],
  recaptcha_version: "v3",
  recaptcha_site_key: "",
  recaptcha_secret_key: "",
  recaptcha_score: 0.5,
  hcaptcha_site_key: "",
  hcaptcha_secret_key: "",
  turnstile_site_key: "",
  turnstile_secret_key: "",
  // Privacy
  gdpr_consent: true,
  gdpr_consent_text: "I agree to the storage of my data as described in the {privacy_policy}.",
  gdpr_exporter: true,
  gdpr_eraser: true,
  gdpr_eraser_payments: "anonymize",
  // Advanced
  delete_on_uninstall: false,
  load_assets: "needed",
  exclude_cache: true,
  debug_log: false,
  log_retention_days: 30,
  log_debug: false,
  renewals_engine: "action_scheduler"
};
const currencyOptions = ["USD", "EUR", "GBP", "CAD", "AUD", "NZD", "CHF", "SEK", "NOK", "DKK", "PLN", "CZK", "INR", "BDT", "PKR", "SGD", "HKD", "MYR", "IDR", "ZAR", "BRL", "MXN", "AED", "SAR", "QAR", "KWD", "TRY", "EGP", "NGN", "JPY", "KRW"].map((c) => ({ value: c, label: c }));
const redirectOptions = [
  { value: "account", label: __("My Account page", "memberglut") },
  { value: "home", label: __("Home page", "memberglut") },
  { value: "same", label: __("Stay on the same page", "memberglut") },
  { value: "admin", label: __("WordPress dashboard", "memberglut") },
  { value: "url", label: __("Custom URL…", "memberglut") }
];
function RoleRedirects({ values, setValues }) {
  const rows = values.role_redirects || [];
  const set = (i, k, v) => setValues((s) => ({ ...s, role_redirects: rows.map((r, j) => j === i ? { ...r, [k]: v } : r) }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-subhead", children: [
      __("Per-role redirects", "memberglut"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Override the global redirect for a role. Leave a URL empty to use the global setting.", "memberglut") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ForwardTable,
      {
        size: "small",
        pagination: false,
        rowKey: (r, i) => i,
        dataSource: rows,
        columns: [
          { title: __("Role", "memberglut"), dataIndex: "role", width: 220, render: (v, r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: v, options: roleOptions, onChange: (x) => set(i, "role", x), style: { width: "100%" } }) },
          { title: __("After login", "memberglut"), dataIndex: "login", render: (v, r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: v, placeholder: "/members/", onChange: (e) => set(i, "login", e.target.value) }) },
          { title: __("After logout", "memberglut"), dataIndex: "logout", render: (v, r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: v, placeholder: "/", onChange: (e) => set(i, "logout", e.target.value) }) },
          { title: "", width: 40, render: (v, r, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "mg-link-danger", onClick: () => setValues((s) => ({ ...s, role_redirects: rows.filter((x, j) => j !== i) })), children: "✕" }) }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "mg-add-row", onClick: () => setValues((s) => ({ ...s, role_redirects: [...rows, { role: "subscriber", login: "", logout: "" }] })), children: [
      "+ ",
      __("Add role redirect", "memberglut")
    ] })
  ] });
}
const SECTIONS = [
  {
    key: "general",
    title: __("General", "memberglut"),
    icon: faGear,
    desc: __("Site-wide membership behaviour.", "memberglut"),
    fields: [
      { key: "default_plan", type: "select", label: __("Plan for new users", "memberglut"), tip: __("Give this plan to every new WordPress user, including users created by other plugins. Leave empty to give none.", "memberglut"), options: [{ value: 0, label: __("— None —", "memberglut") }, ...freePlanOptions] },
      { key: "private_site", type: "switch", label: __("Members-only site", "memberglut"), tip: __("Only logged-in users can see the site. The login, registration and password pages always stay open.", "memberglut") },
      { key: "private_site_exceptions", type: "multiselect", label: __("Pages that stay public", "memberglut"), tip: __("Extra pages visitors can open while the site is members-only (e.g. Pricing, About).", "memberglut"), options: pageOptions, show: (v) => v.private_site },
      { key: "private_site_paths", type: "tags", label: __("Other public addresses", "memberglut"), tip: __("Paths that are not pages, e.g. /shop/ or /events/*. A * at the end matches everything below.", "memberglut"), placeholder: "/events/*", show: (v) => v.private_site },
      { key: "private_feed", type: "switch", label: __("Private RSS feed", "memberglut"), tip: __("Also lock the RSS feeds while the site is members-only.", "memberglut"), show: (v) => v.private_site },
      { key: "hide_admin_bar_roles", type: "multiselect", label: __("Hide the admin bar for", "memberglut"), tip: __("Roles that do not see the WordPress toolbar on the front end. Administrators always see it.", "memberglut"), options: roleOptions.filter((r) => r.value !== "administrator") },
      { key: "block_admin_roles", type: "multiselect", label: __("Block wp-admin for", "memberglut"), tip: __("These roles are sent to the page below when they open /wp-admin. AJAX requests keep working.", "memberglut"), options: roleOptions.filter((r) => r.value !== "administrator") },
      { key: "admin_redirect_page", type: "select", label: __("Send blocked users to", "memberglut"), tip: __("A user is blocked only when all of their roles are in the list above.", "memberglut"), options: [{ value: 0, label: __("My Account page (Forms & Pages)", "memberglut") }, ...pageOptions] }
    ]
  },
  {
    key: "restriction",
    title: __("Content restriction", "memberglut"),
    icon: faShieldHalved,
    desc: __("What visitors see when they open content they cannot access. Each rule and each post can override this.", "memberglut"),
    fields: [
      {
        key: "restrict_action",
        type: "cards",
        label: __("Default action", "memberglut"),
        tip: __("Used when a rule or post does not choose its own action.", "memberglut"),
        options: [
          { value: "message", label: __("Show a message", "memberglut"), desc: __("Replace the content with the restriction message.", "memberglut") },
          { value: "login", label: __("Show login form", "memberglut"), desc: __("Inline login + register links under the teaser.", "memberglut") },
          { value: "redirect", label: __("Redirect", "memberglut"), desc: __("Send the visitor to another URL.", "memberglut") },
          { value: "pricing", label: __("Redirect to pricing", "memberglut"), desc: __("Go to the Pricing page and return here after joining.", "memberglut") }
        ]
      },
      { key: "restrict_redirect_url", type: "url", label: __("Redirect URL", "memberglut"), placeholder: site + "/join/", show: (v) => v.restrict_action === "redirect" },
      { key: "msg_logged_out", type: "editor", label: __("Message for visitors (logged out)", "memberglut"), tip: __("HTML allowed. Tags: {login_link}, {register_link}, {pricing_link}, {post_title}.", "memberglut") },
      { key: "msg_logged_in", type: "editor", label: __("Message for logged-in users without access", "memberglut"), tip: __("Shown to members whose plan does not include this content.", "memberglut") },
      {
        key: "teaser",
        type: "radio",
        label: __("Teaser before the message", "memberglut"),
        tip: __("Show the start of the content to make people want to join.", "memberglut"),
        options: [
          { value: "none", label: __("None", "memberglut") },
          { value: "excerpt", label: __("Excerpt", "memberglut") },
          { value: "fade", label: __("Excerpt with fade", "memberglut") }
        ]
      },
      { key: "teaser_words", type: "number", label: __("Teaser length", "memberglut"), suffix: __("words", "memberglut"), min: 10, max: 500, show: (v) => v.teaser !== "none" },
      {
        key: "hide_in_lists",
        type: "select",
        label: __("Restricted posts in lists", "memberglut"),
        tip: __("How restricted posts appear in the blog, archives, search results and widgets.", "memberglut"),
        options: [
          { value: "show_excerpt", label: __("Show them with the teaser only", "memberglut") },
          { value: "hide", label: __("Hide them completely", "memberglut") },
          { value: "show", label: __("Show them normally (content still locked on the post)", "memberglut") }
        ]
      },
      { key: "protect_rest", type: "switch", label: __("Protect the REST API", "memberglut"), tip: __("Restricted posts are not returned in full by /wp-json/wp/v2 to users without access.", "memberglut") },
      { key: "protect_feed", type: "switch", label: __("Protect RSS feeds", "memberglut"), tip: __("Feeds show only the teaser of restricted posts.", "memberglut") },
      { key: "protect_search", type: "switch", label: __("Remove from search results", "memberglut"), tip: __("Restricted posts never appear in site search for users without access, even when lists show them with a teaser.", "memberglut") },
      { key: "restrict_comments", type: "switch", label: __("Lock comments on restricted posts", "memberglut"), tip: __("Hide the comments and comment form when the content is locked.", "memberglut") },
      { key: "members_only_comments", type: "switch", label: __("Only members can comment anywhere", "memberglut"), tip: __("Users without an active plan cannot comment on any post.", "memberglut") }
    ],
    hint: __("Administrators always see all content. If MemberGlut is deactivated, every restriction is lifted — nothing is changed permanently.", "memberglut")
  },
  {
    key: "login",
    title: __("Login & registration", "memberglut"),
    icon: faRightToBracket,
    desc: __("How people sign up and sign in. Each registration form can override the approval method.", "memberglut"),
    fields: [
      { key: "allow_registration", type: "switch", label: __("Allow new registrations", "memberglut"), tip: __("Turn off for invite-only sites. Admins can still add members.", "memberglut") },
      { key: "replace_wp_pages", type: "switch", label: __("Use MemberGlut pages instead of wp-login.php", "memberglut"), tip: __("Login, registration and lost-password links point to your front-end pages (set in Forms & Pages).", "memberglut") },
      { key: "custom_login_slug", type: "text", label: __("Custom login address", "memberglut"), tip: __("Optional. wp-login.php then redirects to your login page. Keep a note of it.", "memberglut"), prefix: site + "/", placeholder: "member-login" },
      {
        key: "approval",
        type: "cards",
        label: __("New account approval", "memberglut"),
        options: [
          { value: "auto", label: __("Automatic", "memberglut"), desc: __("Accounts are active right away.", "memberglut") },
          { value: "email", label: __("Email confirmation", "memberglut"), desc: __("The member clicks a link in an email first.", "memberglut") },
          { value: "admin", label: __("Admin approval", "memberglut"), desc: __("You approve each account from Members.", "memberglut") }
        ]
      },
      { key: "auto_login", type: "switch", label: __("Log in after registration", "memberglut"), tip: __("Only when the account is active right away.", "memberglut") },
      { type: "heading", key: "h_pw", label: __("Passwords", "memberglut") },
      { key: "password_min", type: "number", label: __("Minimum password length", "memberglut"), min: 6, max: 64, suffix: __("characters", "memberglut") },
      { key: "password_strength", type: "radio", label: __("Required strength", "memberglut"), options: [{ value: "any", label: __("Any", "memberglut") }, { value: "medium", label: __("Medium", "memberglut") }, { value: "strong", label: __("Strong", "memberglut") }] },
      { key: "show_password_toggle", type: "switch", label: __("Show / hide password button", "memberglut") },
      { type: "heading", key: "h_legal", label: __("Agreements", "memberglut") },
      { key: "terms_required", type: "switch", label: __("Require Terms & Conditions", "memberglut"), tip: __("Adds a required checkbox to every registration form. The time of consent is saved.", "memberglut") },
      { key: "terms_page", type: "select", label: __("Terms page", "memberglut"), options: [{ value: 0, label: __("— Choose a page —", "memberglut") }, ...pageOptions], show: (v) => v.terms_required },
      { key: "privacy_required", type: "switch", label: __("Require Privacy Policy consent", "memberglut") },
      { key: "privacy_page", type: "select", label: __("Privacy page", "memberglut"), options: [{ value: 0, label: __("WordPress privacy policy page", "memberglut") }, ...pageOptions], show: (v) => v.privacy_required },
      { type: "heading", key: "h_emails", label: __("Allowed email addresses", "memberglut") },
      { key: "email_whitelist", type: "tags", label: __("Only allow", "memberglut"), tip: __("Registration is limited to these emails or domains (e.g. @company.com). Empty allows everyone.", "memberglut"), placeholder: "@company.com" },
      { key: "email_blacklist", type: "tags", label: __("Block", "memberglut"), tip: __("Emails or domains that cannot register (e.g. @mailinator.com).", "memberglut"), placeholder: "@mailinator.com" }
    ]
  },
  {
    key: "redirects",
    title: __("Redirects", "memberglut"),
    icon: faArrowsTurnRight,
    desc: __("Where members go after they log in, log out or register.", "memberglut"),
    fields: [
      { key: "redirect_login", type: "select", label: __("After login", "memberglut"), options: redirectOptions },
      { key: "redirect_login_url", type: "url", label: __("Login redirect URL", "memberglut"), placeholder: site + "/members/", show: (v) => v.redirect_login === "url" },
      { key: "redirect_logout", type: "select", label: __("After logout", "memberglut"), options: redirectOptions.filter((o) => o.value !== "admin") },
      { key: "redirect_logout_url", type: "url", label: __("Logout redirect URL", "memberglut"), show: (v) => v.redirect_logout === "url" },
      { key: "redirect_register", type: "select", label: __("After registration", "memberglut"), tip: __("Paid plans go to the Thank-You page after payment instead.", "memberglut"), options: redirectOptions },
      { key: "redirect_register_url", type: "url", label: __("Registration redirect URL", "memberglut"), show: (v) => v.redirect_register === "url" },
      { key: "respect_redirect_to", type: "switch", label: __("Return to the page they came from", "memberglut"), tip: __("When a visitor logs in from a locked page, send them back to it instead of the redirect above.", "memberglut") },
      { key: "redirect_logged_in_from_forms", type: "switch", label: __("Skip login & register pages when logged in", "memberglut"), tip: __("Logged-in users who open these pages go to My Account.", "memberglut") }
    ],
    render: ({ values, setValues }) => /* @__PURE__ */ jsxRuntimeExports.jsx(RoleRedirects, { values, setValues })
  },
  {
    key: "account",
    title: __("Member account", "memberglut"),
    icon: faCircleUser,
    desc: __("The My Account page and what members can do on their own.", "memberglut"),
    fields: [
      { type: "heading", key: "h_tabs", label: __("Account tabs", "memberglut"), tip: __("Tabs shown on the My Account page.", "memberglut") },
      { key: "tab_dashboard", type: "switch", label: __("Dashboard", "memberglut"), tip: __("Greeting, active plans and quick links.", "memberglut") },
      { key: "tab_profile", type: "switch", label: __("Edit profile", "memberglut") },
      { key: "tab_password", type: "switch", label: __("Change password", "memberglut") },
      { key: "tab_subscriptions", type: "switch", label: __("Subscriptions", "memberglut"), tip: __("Plans with status, dates and actions.", "memberglut") },
      { key: "tab_payments", type: "switch", label: __("Payment history", "memberglut") },
      { key: "tab_activity", type: "switch", label: __("Login activity", "memberglut"), tip: __("Recent logins with device and IP.", "memberglut") },
      { key: "tab_delete", type: "switch", label: __("Delete account", "memberglut"), tip: __("Members can delete their own account after entering their password.", "memberglut") },
      { type: "heading", key: "h_self", label: __("Self-service", "memberglut") },
      { key: "allow_cancel", type: "switch", label: __("Members can cancel", "memberglut"), tip: __("Stops automatic renewal.", "memberglut") },
      { key: "cancel_access", type: "radio", label: __("After canceling", "memberglut"), options: [{ value: "period_end", label: __("Keep access until the period ends", "memberglut") }, { value: "now", label: __("Remove access now", "memberglut") }], show: (v) => v.allow_cancel },
      { key: "allow_renew", type: "switch", label: __("Members can renew early", "memberglut"), tip: __("For plans that do not renew automatically.", "memberglut") },
      { key: "renew_days_before", type: "number", label: __("Show the renew button", "memberglut"), suffix: __("days before expiry", "memberglut"), min: 0, max: 365, show: (v) => v.allow_renew },
      { key: "allow_change", type: "switch", label: __("Members can upgrade", "memberglut"), tip: __("Move to a higher plan in the same group.", "memberglut") },
      { key: "allow_downgrade", type: "switch", label: __("Members can downgrade", "memberglut"), show: (v) => v.allow_change },
      { key: "allow_abandon", type: "switch", label: __("Members can remove a plan", "memberglut"), tip: __("Deletes the subscription from their account straight away.", "memberglut") }
    ]
  },
  {
    key: "payments",
    title: __("Payments", "memberglut"),
    icon: faCreditCard,
    desc: __("Currency and payment gateways for paid plans.", "memberglut"),
    subs: [
      {
        key: "general",
        title: __("General", "memberglut"),
        fields: [
          { key: "currency", type: "select", label: __("Currency", "memberglut"), options: currencyOptions },
          { key: "currency_position", type: "select", label: __("Currency position", "memberglut"), options: [{ value: "before", label: "$99" }, { value: "before_space", label: "$ 99" }, { value: "after", label: "99$" }, { value: "after_space", label: "99 $" }] },
          { key: "thousand_sep", type: "text", label: __("Thousand separator", "memberglut") },
          { key: "decimal_sep", type: "text", label: __("Decimal separator", "memberglut") },
          { key: "decimals", type: "number", label: __("Decimals", "memberglut"), min: 0, max: 4 },
          { key: "test_mode", type: "switch", label: __("Test mode", "memberglut"), tip: __("All gateways use their sandbox / test keys, whatever their own Mode says. A notice is shown in the admin while any gateway is in test mode.", "memberglut") }
        ]
      },
      {
        key: "stripe",
        title: "Stripe",
        desc: __("Cards, Apple Pay, Google Pay, Link and local methods through the Stripe Payment Element. One-time and recurring.", "memberglut"),
        fields: [
          { key: "stripe_enabled", type: "switch", label: __("Enable Stripe", "memberglut") },
          { key: "stripe_mode", type: "radio", label: __("Mode", "memberglut"), options: [{ value: "test", label: __("Test", "memberglut") }, { value: "live", label: __("Live", "memberglut") }], show: (v) => v.stripe_enabled },
          { key: "stripe_test_publishable", type: "text", label: __("Test publishable key", "memberglut"), placeholder: "pk_test_…", show: (v) => v.stripe_enabled && v.stripe_mode === "test" },
          { key: "stripe_test_secret", type: "password", label: __("Test secret key", "memberglut"), placeholder: "sk_test_…", show: (v) => v.stripe_enabled && v.stripe_mode === "test" },
          { key: "stripe_live_publishable", type: "text", label: __("Live publishable key", "memberglut"), placeholder: "pk_live_…", show: (v) => v.stripe_enabled && v.stripe_mode === "live" },
          { key: "stripe_live_secret", type: "password", label: __("Live secret key", "memberglut"), placeholder: "sk_live_…", show: (v) => v.stripe_enabled && v.stripe_mode === "live" },
          { key: "stripe_webhook_url", type: "custom", label: __("Webhook URL", "memberglut"), tip: __("Add this endpoint in Stripe → Developers → Webhooks so renewals, failed payments and refunds reach your site.", "memberglut"), render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(CopyCode, { code: site + "/wp-json/memberglut/v1/webhook/stripe" }), show: (v) => v.stripe_enabled },
          { key: "stripe_webhook_secret", type: "password", label: __("Webhook signing secret", "memberglut"), placeholder: "whsec_…", show: (v) => v.stripe_enabled },
          { key: "stripe_wallets", type: "switch", label: __("Apple Pay & Google Pay", "memberglut"), show: (v) => v.stripe_enabled },
          { key: "stripe_save_cards", type: "switch", label: __("Members can update their card", "memberglut"), tip: __("Adds “Update payment method” to the Subscriptions tab.", "memberglut"), show: (v) => v.stripe_enabled }
        ]
      },
      {
        key: "paypal",
        title: "PayPal",
        desc: __("PayPal Checkout with Smart Buttons. One-time payments and PayPal subscriptions.", "memberglut"),
        fields: [
          { key: "paypal_enabled", type: "switch", label: __("Enable PayPal", "memberglut") },
          { key: "paypal_mode", type: "radio", label: __("Mode", "memberglut"), options: [{ value: "sandbox", label: __("Sandbox", "memberglut") }, { value: "live", label: __("Live", "memberglut") }], show: (v) => v.paypal_enabled },
          { key: "paypal_client_id", type: "text", label: __("Client ID", "memberglut"), show: (v) => v.paypal_enabled },
          { key: "paypal_secret", type: "password", label: __("Client secret", "memberglut"), show: (v) => v.paypal_enabled },
          { key: "paypal_webhook_url", type: "custom", label: __("Webhook URL", "memberglut"), tip: __("Add this URL in PayPal Developer › Apps › your app › Webhooks, with all billing and payment events.", "memberglut"), render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(CopyCode, { code: site + "/wp-json/memberglut/v1/webhook/paypal" }), show: (v) => v.paypal_enabled },
          { key: "paypal_webhook_id", type: "text", label: __("Webhook ID", "memberglut"), tip: __("Shown by PayPal after you add the webhook. Needed to verify that notifications really come from PayPal.", "memberglut"), show: (v) => v.paypal_enabled }
        ]
      },
      {
        key: "bank",
        title: __("Bank transfer", "memberglut"),
        desc: __("Offline payment. The order stays pending until you mark it paid in Payments.", "memberglut"),
        fields: [
          { key: "bank_enabled", type: "switch", label: __("Enable bank transfer", "memberglut") },
          { key: "bank_title", type: "text", label: __("Title at checkout", "memberglut"), show: (v) => v.bank_enabled },
          { key: "bank_instructions", type: "textarea", label: __("Payment instructions", "memberglut"), tip: __("Shown after checkout and sent in the “Pending bank transfer” email.", "memberglut"), rows: 4, show: (v) => v.bank_enabled },
          { key: "bank_activate", type: "radio", label: __("Give access", "memberglut"), options: [{ value: "on_confirm", label: __("When I mark it paid", "memberglut") }, { value: "now", label: __("Right away", "memberglut") }], show: (v) => v.bank_enabled }
        ]
      },
      {
        key: "renewals",
        title: __("Renewals", "memberglut"),
        desc: __("What happens when a recurring payment fails.", "memberglut"),
        fields: [
          { key: "retry_failed", type: "switch", label: __("Retry failed payments", "memberglut") },
          { key: "retry_max", type: "number", label: __("Maximum retries", "memberglut"), min: 1, max: 10, show: (v) => v.retry_failed },
          { key: "retry_interval", type: "number", label: __("Days between retries", "memberglut"), tip: __("Stripe and PayPal retry on their own schedule; this applies to bank-transfer renewals. For all gateways, MemberGlut ends the plan after the maximum number of failed payments.", "memberglut"), min: 1, max: 30, suffix: __("days", "memberglut"), show: (v) => v.retry_failed },
          { key: "retry_status", type: "select", label: __("Access while retrying", "memberglut"), options: [{ value: "on_hold", label: __("Pause access (on hold)", "memberglut") }, { value: "active", label: __("Keep access", "memberglut") }], show: (v) => v.retry_failed },
          { key: "refund_revokes", type: "switch", label: __("A full refund ends access", "memberglut") }
        ]
      }
    ]
  },
  {
    key: "emails",
    title: __("Email settings", "memberglut"),
    icon: faEnvelope,
    desc: __("Sender and design for every MemberGlut email. Edit each email in Emails.", "memberglut"),
    fields: [
      { key: "sender_name", type: "text", label: __("Sender name", "memberglut"), tip: __("Empty uses the site title.", "memberglut") },
      { key: "sender_email", type: "email", label: __("Sender email", "memberglut"), tip: __("Use an address on your own domain so emails are not marked as spam.", "memberglut"), placeholder: "noreply@yoursite.com" },
      { key: "admin_recipients", type: "text", label: __("Admin notifications go to", "memberglut"), tip: __("Separate several addresses with commas. Empty uses the WordPress admin email.", "memberglut"), placeholder: "admin@yoursite.com" },
      { key: "email_html", type: "switch", label: __("Use the HTML template", "memberglut"), tip: __("Off sends plain text.", "memberglut") },
      { key: "email_logo", type: "url", label: __("Logo URL", "memberglut"), show: (v) => v.email_html },
      { key: "email_color", type: "color", label: __("Accent colour", "memberglut"), show: (v) => v.email_html },
      { key: "email_footer", type: "textarea", label: __("Footer text", "memberglut"), rows: 2, show: (v) => v.email_html }
    ]
  },
  {
    key: "security",
    title: __("Security", "memberglut"),
    icon: faUserLock,
    desc: __("Stop account sharing, password guessing and bot sign-ups.", "memberglut"),
    fields: [
      { key: "limit_sessions", type: "switch", label: __("Prevent account sharing", "memberglut"), tip: __("Limit how many devices can be logged in to one account at the same time.", "memberglut") },
      { key: "max_sessions", type: "number", label: __("Devices at once", "memberglut"), min: 1, max: 10, show: (v) => v.limit_sessions },
      { key: "session_behavior", type: "radio", label: __("When the limit is reached", "memberglut"), options: [{ value: "logout_oldest", label: __("Log out the oldest device", "memberglut") }, { value: "block", label: __("Block the new login", "memberglut") }], show: (v) => v.limit_sessions },
      { key: "limit_failed", type: "switch", label: __("Limit failed logins", "memberglut") },
      { key: "failed_attempts", type: "number", label: __("Allowed attempts", "memberglut"), min: 2, max: 20, show: (v) => v.limit_failed },
      { key: "lockout_minutes", type: "number", label: __("Lock for", "memberglut"), suffix: __("minutes", "memberglut"), min: 1, max: 1440, show: (v) => v.limit_failed },
      { key: "honeypot", type: "switch", label: __("Honeypot on forms", "memberglut"), tip: __("A hidden field that catches bots without bothering people.", "memberglut") },
      { key: "logout_on_close", type: "switch", label: __("Log out when the browser closes", "memberglut"), tip: __("Ignores “Remember me”.", "memberglut") }
    ]
  },
  {
    key: "captcha",
    title: __("Captcha", "memberglut"),
    icon: faUserShield,
    desc: __("Create keys in the provider’s dashboard and paste them here.", "memberglut"),
    fields: [
      { key: "captcha_provider", type: "radio", label: __("Provider", "memberglut"), options: [{ value: "none", label: __("None", "memberglut") }, { value: "recaptcha", label: "reCAPTCHA" }, { value: "hcaptcha", label: "hCaptcha" }, { value: "turnstile", label: "Turnstile" }] },
      { key: "captcha_on", type: "multiselect", label: __("Protect these forms", "memberglut"), options: [{ value: "register", label: __("Registration", "memberglut") }, { value: "login", label: __("Login", "memberglut") }, { value: "lost_password", label: __("Lost password", "memberglut") }, { value: "checkout", label: __("Checkout", "memberglut") }], show: (v) => v.captcha_provider !== "none" },
      { key: "recaptcha_version", type: "select", label: __("Version", "memberglut"), options: [{ value: "v3", label: __("reCAPTCHA v3 (invisible, score based)", "memberglut") }, { value: "v2", label: __("reCAPTCHA v2 (“I’m not a robot” checkbox)", "memberglut") }], show: (v) => v.captcha_provider === "recaptcha" },
      { key: "recaptcha_site_key", type: "text", label: __("Site key", "memberglut"), show: (v) => v.captcha_provider === "recaptcha" },
      { key: "recaptcha_secret_key", type: "password", label: __("Secret key", "memberglut"), show: (v) => v.captcha_provider === "recaptcha" },
      { key: "recaptcha_score", type: "number", label: __("Minimum score", "memberglut"), tip: __("0.0 (likely bot) to 1.0 (likely human).", "memberglut"), min: 0, max: 1, step: 0.1, show: (v) => v.captcha_provider === "recaptcha" && v.recaptcha_version === "v3" },
      { key: "hcaptcha_site_key", type: "text", label: __("Site key", "memberglut"), show: (v) => v.captcha_provider === "hcaptcha" },
      { key: "hcaptcha_secret_key", type: "password", label: __("Secret key", "memberglut"), show: (v) => v.captcha_provider === "hcaptcha" },
      { key: "turnstile_site_key", type: "text", label: __("Site key", "memberglut"), show: (v) => v.captcha_provider === "turnstile" },
      { key: "turnstile_secret_key", type: "password", label: __("Secret key", "memberglut"), show: (v) => v.captcha_provider === "turnstile" }
    ]
  },
  {
    key: "privacy",
    title: __("Privacy & GDPR", "memberglut"),
    icon: faScaleBalanced,
    desc: __("Consent and the WordPress personal-data tools.", "memberglut"),
    fields: [
      { key: "gdpr_consent", type: "switch", label: __("Consent checkbox at checkout", "memberglut"), tip: __("The time and text of the consent are stored with the member.", "memberglut") },
      { key: "gdpr_consent_text", type: "textarea", label: __("Consent text", "memberglut"), rows: 2, show: (v) => v.gdpr_consent },
      { key: "gdpr_exporter", type: "switch", label: __("Include membership data in “Export Personal Data”", "memberglut"), tip: __("Tools → Export Personal Data will add plans, payments and login history.", "memberglut") },
      { key: "gdpr_eraser", type: "switch", label: __("Erase membership data in “Erase Personal Data”", "memberglut") },
      { key: "gdpr_eraser_payments", type: "radio", label: __("Payment records on erase", "memberglut"), tip: __("Tax law often requires keeping invoices, so the default keeps them without personal details.", "memberglut"), options: [{ value: "anonymize", label: __("Anonymize", "memberglut") }, { value: "delete", label: __("Delete", "memberglut") }], show: (v) => v.gdpr_eraser }
    ]
  },
  {
    key: "advanced",
    title: __("Advanced", "memberglut"),
    icon: faSliders,
    desc: __("Performance and data handling for the whole plugin.", "memberglut"),
    fields: [
      { key: "load_assets", type: "radio", label: __("Load MemberGlut CSS & JS", "memberglut"), options: [{ value: "needed", label: __("Only where used", "memberglut") }, { value: "everywhere", label: __("On every page", "memberglut") }] },
      { key: "exclude_cache", type: "switch", label: __("Exclude member pages from cache", "memberglut"), tip: __("Sends no-cache headers on account, checkout and restricted pages so one member never sees another member’s data.", "memberglut") },
      { key: "renewals_engine", type: "select", label: __("Run renewals and expirations with", "memberglut"), options: [{ value: "action_scheduler", label: __("Action Scheduler (hourly, recommended)", "memberglut") }, { value: "wp_cron", label: __("WP-Cron (daily)", "memberglut") }] },
      { key: "debug_log", type: "switch", label: __("Debug log", "memberglut"), tip: __("Log payments, webhooks and access decisions to Data & Logs. Errors are always logged. Same switch as “Logging on” in Data & Logs.", "memberglut") },
      { key: "log_retention_days", type: "number", label: __("Keep logs for", "memberglut"), suffix: __("days", "memberglut"), min: 1, max: 365 },
      { key: "log_debug", type: "switch", label: __("Include debug messages", "memberglut"), show: (v) => v.debug_log },
      { key: "delete_on_uninstall", type: "switch", label: __("Delete data on uninstall", "memberglut"), tip: __("When the plugin is deleted (not just deactivated), remove plans, members, payments, rules, logs and settings. Custom roles are removed too. This cannot be undone.", "memberglut") }
    ]
  }
];
function Settings() {
  const { message } = App.useApp();
  const [values, setValues] = reactExports.useState(DEFAULTS);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    getSettings().then((r) => setValues({ ...DEFAULTS, ...r.values })).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  }, []);
  const save = async (v) => {
    if (v.sender_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.sender_email)) {
      setErrors({ sender_email: __("Enter a valid sender email address.", "memberglut") });
      message.error(__("Enter a valid sender email address.", "memberglut"));
      return false;
    }
    setSaving(true);
    try {
      const r = await saveSettings(v);
      setValues({ ...DEFAULTS, ...r.values });
      setErrors({});
      message.success(__("Global settings saved.", "memberglut"));
      return true;
    } catch (e) {
      setErrors(e.fields || {});
      message.error(e.message);
      return false;
    } finally {
      setSaving(false);
    }
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-loading", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, { size: "large" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsPanel,
    {
      title: __("Global Settings", "memberglut"),
      subtitle: __("Options for the whole membership site. Plans and rules can override many of them.", "memberglut"),
      sections: SECTIONS,
      values,
      setValues,
      onSave: save,
      saving,
      errors
    }
  );
}
function SettingsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "settings", wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(SettingsPage, {}));
