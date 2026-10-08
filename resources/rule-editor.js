import { a8 as __, bP as faSliders, bO as faShieldHalved, bs as faLayerGroup, c5 as faUserTag, bJ as faRightToBracket, c3 as faUserSecret, bZ as faUserCheck, bw as faMessage, aJ as faArrowRightFromBracket, bV as faTags, be as faEyeSlash, c8 as faVial, cV as jsxRuntimeExports, c as Button, q as FontAwesomeIcon, ca as faXmark, bF as faPlus, d8 as reactExports, P as Page, b as App, d6 as queryArg, a_ as faChevronLeft, cW as link, aD as createRoot } from "./chunks/Page-hmVJ7ZEb.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { S as SettingsPanel } from "./chunks/SettingsPanel-CQqU9qOj.js";
import { S as Select, aQ as searchUsers, h as Space, aP as searchTerms, aO as searchPosts, aZ as testRule, ah as getRule, aM as saveRule } from "./chunks/api-VgcaUgLl.js";
import { b as planOptions, c as roleOptions, L, p as pageOptions } from "./chunks/lookups-PfwO7D-y.js";
import { I as Input } from "./chunks/index-CH-t94NL.js";
import { A as Alert } from "./chunks/index-BwEO_KtO.js";
import { S as Spin } from "./chunks/index-meZbse2h.js";
import "./chunks/index-DyME-zn4.js";
import "./chunks/index-nAZOmPrG.js";
import "./chunks/index-GRmK3Eb7.js";
import "./chunks/index-C0PWwl2H.js";
import "./chunks/index-Dq9_nZbq.js";
import "./chunks/index-BCEmSWRh.js";
const TARGETS = [
  { value: "site", label: __("Whole site", "memberglut") },
  { value: "post_type", label: __("All of a post type", "memberglut") },
  { value: "pages", label: __("Specific pages", "memberglut") },
  { value: "posts", label: __("Specific posts", "memberglut") },
  { value: "children", label: __("Child pages of", "memberglut") },
  { value: "taxonomy", label: __("Posts in a category / tag", "memberglut") },
  { value: "archive", label: __("Archive & special pages", "memberglut") },
  { value: "author", label: __("Posts by author", "memberglut") },
  { value: "template", label: __("Page template", "memberglut") },
  { value: "url", label: __("URL pattern", "memberglut") }
];
const ARCHIVES = [
  { value: "front", label: __("Front page", "memberglut") },
  { value: "blog", label: __("Blog page", "memberglut") },
  { value: "search", label: __("Search results", "memberglut") },
  { value: "404", label: __("404 page", "memberglut") },
  { value: "author_archive", label: __("Author archives", "memberglut") },
  { value: "pt_archive", label: __("Post type archives", "memberglut") }
];
const LABELS = { posts: {}, terms: {}, authors: {} };
function AsyncSelect({ value = [], onChange, fetcher, kind, placeholder }) {
  const [options, setOptions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const timer = reactExports.useRef();
  const run = (q) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLoading(true);
      fetcher(q).then((list) => {
        list.forEach((o) => {
          LABELS[kind][o.value] = o.label;
        });
        setOptions(list);
      }).finally(() => setLoading(false));
    }, 250);
  };
  reactExports.useEffect(() => {
    run("");
  }, [fetcher]);
  const selected = (value || []).map((v) => ({ value: v, label: LABELS[kind][v] || `#${v}` }));
  const merged = [...selected, ...options.filter((o) => !(value || []).includes(o.value))];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Select,
    {
      mode: "multiple",
      value,
      onChange,
      filterOption: false,
      onSearch: run,
      options: merged,
      notFoundContent: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, { size: "small" }) : null,
      placeholder,
      style: { width: "100%" }
    }
  );
}
function TargetList({ value = [], onChange, addLabel, empty }) {
  const set = (i, patch) => onChange(value.map((t, j) => j === i ? { ...t, ...patch } : t));
  const control = (t, i) => {
    switch (t.type) {
      case "site":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: __("Everything except the login, registration, password, pricing, account and thank-you pages, and Global Settings › public pages.", "memberglut") });
      case "post_type":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: t.post_type, onChange: (v) => set(i, { post_type: v }), options: L.post_types, placeholder: __("Post type", "memberglut"), style: { width: "100%" } });
      case "pages":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AsyncSelect, { kind: "posts", value: t.posts, onChange: (v) => set(i, { posts: v }), fetcher: (q) => searchPosts(q, "page"), placeholder: __("Search pages…", "memberglut") });
      case "posts":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AsyncSelect, { kind: "posts", value: t.posts, onChange: (v) => set(i, { posts: v }), fetcher: (q) => searchPosts(q, "any"), placeholder: __("Search titles…", "memberglut") });
      case "children":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AsyncSelect, { kind: "posts", value: t.posts, onChange: (v) => set(i, { posts: v }), fetcher: (q) => searchPosts(q, "page"), placeholder: __("Parent pages…", "memberglut") });
      case "taxonomy":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Space.Compact, { style: { width: "100%" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: t.taxonomy || "category", onChange: (v) => set(i, { taxonomy: v, terms: [] }), options: L.taxonomies, style: { width: 170 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AsyncSelect, { kind: "terms", value: t.terms, onChange: (v) => set(i, { terms: v }), fetcher: (q) => searchTerms(t.taxonomy || "category", q), placeholder: __("Terms", "memberglut") }, t.taxonomy || "category") })
        ] });
      case "archive":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", value: t.archives || [], onChange: (v) => set(i, { archives: v }), options: ARCHIVES, style: { width: "100%" } });
      case "author":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AsyncSelect, { kind: "authors", value: t.authors, onChange: (v) => set(i, { authors: v }), fetcher: (q) => searchUsers(q), placeholder: __("Search authors…", "memberglut") });
      case "template":
        return L.templates.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: t.template, onChange: (v) => set(i, { template: v }), options: L.templates, placeholder: __("Template", "memberglut"), style: { width: "100%" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: __("Your theme has no custom page templates.", "memberglut") });
      case "url":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: t.pattern, onChange: (e) => set(i, { pattern: e.target.value }), placeholder: "/members/*  or  ^/course/[0-9]+/$" });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-target-list", children: [
    value.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-note", style: { marginTop: 0 }, children: empty }),
    value.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-target-row", children: [
      i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-or", children: __("OR", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: t.type, onChange: (v) => set(i, { type: v, posts: [], terms: [], authors: [], archives: [] }), options: TARGETS, style: { width: 230 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-target-value", children: control(t, i) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "text", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faXmark }), onClick: () => onChange(value.filter((x, j) => j !== i)) })
    ] }, i)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), onClick: () => onChange([...value, { type: "pages", posts: [] }]), children: addLabel })
  ] });
}
function AccessTester({ values }) {
  const [user, setUser] = reactExports.useState("guest");
  const [users, setUsers] = reactExports.useState([]);
  const [url, setUrl] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const [checking, setChecking] = reactExports.useState(false);
  const timer = reactExports.useRef();
  const search = (q) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => searchUsers(q).then(setUsers), 250);
  };
  reactExports.useEffect(() => {
    search("");
  }, []);
  const check = async () => {
    setChecking(true);
    try {
      const r = await testRule({ rule: values, user, url });
      setResult({ type: r.allowed ? "success" : "warning", text: r.text });
    } catch (e) {
      setResult({ type: "error", text: e.message });
    } finally {
      setChecking(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-tester", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select,
        {
          showSearch: true,
          filterOption: false,
          onSearch: search,
          value: user,
          onChange: setUser,
          style: { width: 260 },
          options: [{ value: "guest", label: __("A logged-out visitor", "memberglut") }, ...users]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: url, onChange: (e) => setUrl(e.target.value), onPressEnter: check, addonBefore: __("URL", "memberglut"), placeholder: `${L.site.url}…` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", loading: checking, disabled: !url, onClick: check, children: __("Check", "memberglut") })
    ] }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { style: { marginTop: 14 }, showIcon: true, type: result.type, message: result.text })
  ] });
}
const NEW_RULE = {
  title: "",
  status: "active",
  priority: 10,
  note: "",
  protect: [{ type: "taxonomy", taxonomy: "category", terms: [] }],
  exclude: [],
  include_children: true,
  who: "plans",
  plans: [],
  roles: [],
  users: [],
  action: "inherit",
  redirect: 0,
  custom_message: false,
  message: "",
  teaser: "inherit",
  in_lists: "inherit"
};
const GLOBAL_ACTION = { message: __("Show a message", "memberglut"), login: __("Show login form", "memberglut"), redirect: __("Redirect", "memberglut"), pricing: __("Pricing page", "memberglut") };
const SECTIONS = [
  {
    key: "rule",
    title: __("Rule", "memberglut"),
    icon: faSliders,
    desc: __("Name and priority. Only admins see the name.", "memberglut"),
    fields: [
      { key: "title", type: "text", label: __("Rule name", "memberglut"), placeholder: __("e.g. Premium articles", "memberglut") },
      { key: "status", type: "radio", label: __("Status", "memberglut"), options: [{ value: "active", label: __("Active", "memberglut") }, { value: "inactive", label: __("Inactive", "memberglut") }] },
      { key: "priority", type: "number", label: __("Priority", "memberglut"), tip: __("When two rules match the same content, the higher number decides. Settings made on a post itself always win.", "memberglut"), min: 0, max: 999 },
      { key: "note", type: "textarea", label: __("Admin note", "memberglut"), rows: 2 }
    ]
  },
  {
    key: "protect",
    title: __("Content to protect", "memberglut"),
    icon: faShieldHalved,
    desc: __("Matches any of the items below.", "memberglut"),
    errorKeys: ["protect", "exclude"],
    renderTop: ({ values, update, errors }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TargetList, { value: values.protect, onChange: (v) => update("protect", v), addLabel: __("Add content", "memberglut"), empty: __("Nothing selected yet.", "memberglut") }),
      errors.protect && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-error", children: errors.protect }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-subhead", style: { marginTop: 26 }, children: [
        __("Except", "memberglut"),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Leave these open even though they match above, e.g. a free first lesson.", "memberglut") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TargetList, { value: values.exclude, onChange: (v) => update("exclude", v), addLabel: __("Add exception", "memberglut"), empty: __("No exceptions.", "memberglut") }),
      errors.exclude && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-error", children: errors.exclude })
    ] }),
    fields: [
      { key: "include_children", type: "switch", label: __("Include child pages", "memberglut"), tip: __("Child pages of a protected page are protected too.", "memberglut") }
    ]
  },
  {
    key: "access",
    title: __("Who can access", "memberglut"),
    icon: faUserCheck,
    desc: __("Everyone else is shown the action in “What others see”. Administrators always have access.", "memberglut"),
    fields: [
      {
        key: "who",
        type: "cards",
        label: __("Allow", "memberglut"),
        options: [
          { value: "plans", label: __("Members of plans", "memberglut"), icon: faLayerGroup, desc: __("Active, trialing or canceled-but-not-ended members.", "memberglut") },
          { value: "roles", label: __("User roles", "memberglut"), icon: faUserTag, desc: __("Any user with one of the roles.", "memberglut") },
          { value: "logged_in", label: __("Logged-in users", "memberglut"), icon: faRightToBracket, desc: __("Any account, no plan needed.", "memberglut") },
          { value: "logged_out", label: __("Logged-out visitors", "memberglut"), icon: faUserSecret, desc: __("e.g. a “join now” landing page.", "memberglut") }
        ]
      },
      { key: "plans", type: "multiselect", label: __("Plans", "memberglut"), options: planOptions(), show: (v) => v.who === "plans" },
      { key: "roles", type: "multiselect", label: __("Roles", "memberglut"), options: roleOptions(), show: (v) => v.who === "roles" },
      { key: "users", type: "tags", label: __("Also allow these users", "memberglut"), tip: __("Usernames that always have access, whatever their plan.", "memberglut"), placeholder: "username", show: (v) => v.who !== "logged_out" }
    ]
  },
  {
    key: "action",
    title: __("What others see", "memberglut"),
    icon: faEyeSlash,
    desc: __("Leave on “Use global setting” to follow Global Settings › Content restriction.", "memberglut"),
    fields: [
      {
        key: "action",
        type: "cards",
        label: __("Action", "memberglut"),
        options: [
          { value: "inherit", label: __("Use global setting", "memberglut"), icon: faSliders, desc: GLOBAL_ACTION[(L.settings_global || {}).action] },
          { value: "message", label: __("Show a message", "memberglut"), icon: faMessage },
          { value: "login", label: __("Show login form", "memberglut"), icon: faRightToBracket },
          { value: "redirect", label: __("Redirect", "memberglut"), icon: faArrowRightFromBracket },
          { value: "pricing", label: __("Pricing page", "memberglut"), icon: faTags, desc: __("Returns here after joining.", "memberglut") }
        ]
      },
      { key: "redirect", type: "select", label: __("Redirect to", "memberglut"), options: pageOptions(), show: (v) => v.action === "redirect" },
      { key: "custom_message", type: "switch", label: __("Custom message for this rule", "memberglut"), tip: __("Replaces both global messages (visitors and logged-in users).", "memberglut"), show: (v) => ["message", "login", "inherit"].includes(v.action) },
      { key: "message", type: "editor", label: __("Message", "memberglut"), tip: __("HTML allowed. Tags: {login_link}, {register_link}, {pricing_link}, {post_title}, {plans}.", "memberglut"), show: (v) => v.custom_message && ["message", "login", "inherit"].includes(v.action) },
      { key: "teaser", type: "select", label: __("Teaser", "memberglut"), options: [{ value: "inherit", label: __("Use global setting", "memberglut") }, { value: "none", label: __("None", "memberglut") }, { value: "excerpt", label: __("Excerpt", "memberglut") }, { value: "fade", label: __("Excerpt with fade", "memberglut") }], show: (v) => v.action !== "redirect" && v.action !== "pricing" },
      { key: "in_lists", type: "select", label: __("In blog, archives & search", "memberglut"), options: [{ value: "inherit", label: __("Use global setting", "memberglut") }, { value: "show_excerpt", label: __("Show with teaser only", "memberglut") }, { value: "hide", label: __("Hide", "memberglut") }, { value: "show", label: __("Show normally (still locked on the post)", "memberglut") }] }
    ]
  },
  {
    key: "test",
    title: __("Test access", "memberglut"),
    icon: faVial,
    desc: __("Check what a user would see on a URL with the rule as it is now (unsaved changes included).", "memberglut"),
    render: (ctx) => /* @__PURE__ */ jsxRuntimeExports.jsx(AccessTester, { ...ctx })
  }
];
function RuleEditor() {
  const { message } = App.useApp();
  const id = Number(queryArg("id")) || 0;
  const plan = Number(queryArg("plan")) || 0;
  const [values, setValues] = reactExports.useState({ ...NEW_RULE, plans: plan ? [plan] : [] });
  const [loading, setLoading] = reactExports.useState(!!id);
  const [saving, setSaving] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (!id) return;
    getRule(id).then((r) => {
      ["posts", "terms", "authors"].forEach((k) => Object.assign(LABELS[k], (r.labels || {})[k] || {}));
      setValues({ ...NEW_RULE, ...r });
    }).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  }, []);
  const save = async (v) => {
    setSaving(true);
    try {
      const saved = await saveRule({ ...v, id: id || void 0 });
      setErrors({});
      message.success(__("Rule saved.", "memberglut"));
      if (!id) {
        window.location.href = link("rule_editor", { id: saved.id });
      } else {
        setValues({ ...NEW_RULE, ...saved });
      }
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
  const sections = SECTIONS.map((s) => s.renderTop ? { ...s, renderTop: (ctx) => s.renderTop({ ...ctx, errors }) } : s);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsPanel,
    {
      back: { href: link("rules"), label: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faChevronLeft }),
        " ",
        __("All rules", "memberglut")
      ] }) },
      title: id ? sprintf(__("Edit rule: %s", "memberglut"), values.title) : __("New content rule", "memberglut"),
      subtitle: __("Choose what to protect, who may see it, and what everyone else gets.", "memberglut"),
      sections,
      initialSection: queryArg("tab") || (id ? "rule" : "protect"),
      values,
      setValues,
      onSave: save,
      saving,
      errors,
      saveLabel: __("Save rule", "memberglut")
    }
  );
}
function RuleEditorPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "rules", wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RuleEditor, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(RuleEditorPage, {}));
