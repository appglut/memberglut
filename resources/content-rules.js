import { bs as faLink, a8 as __, bi as faFolderTree, bg as faFileLines, bl as faGlobe, aJ as faArrowRightFromBracket, bI as faRightToBracket, bv as faMessage, cU as jsxRuntimeExports, P as Page, b as App, d7 as reactExports, cV as link, q as FontAwesomeIcon, bB as faPenToSquare, b4 as faCopy, bV as faTrashCan, E as PageHeader, c as Button, bE as faPlus, a1 as StatCard, bN as faShieldHalved, b$ as faUserLock, bu as faMagnifyingGlass, b7 as faCubes, aP as faBars, b3 as faCode, aD as createRoot } from "./chunks/Page-uv7jJYOd.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { O as getRules } from "./chunks/api-BaJbRTwg.js";
import { f as fromNow } from "./chunks/format-d8T3zh3m.js";
import { b as PLANS } from "./chunks/demoData-D03BbErT.js";
import { P as Popconfirm } from "./chunks/index-3fEq35Ry.js";
import { S as Switch } from "./chunks/index-Dfx4LXY8.js";
import { T as Tabs } from "./chunks/index-DfyMi8Rc.js";
import { I as Input } from "./chunks/index-B1n7UfX_.js";
import { F as ForwardTable } from "./chunks/Table-DWPhuWqo.js";
import { T as Tag } from "./chunks/index-BN7GKNU8.js";
import "./chunks/index-yo_nZXOO.js";
import "./chunks/lookups-DHSS-Myl.js";
import "./chunks/index-BPzm35Wd.js";
import "./chunks/index-CcJNww40.js";
import "./chunks/useBreakpoint-DzDOjlX5.js";
import "./chunks/index-CIIETatw.js";
const PROTECT_LABEL = {
  site: [faGlobe, __("Whole site", "memberglut")],
  post_type: [faFileLines, __("All of a post type", "memberglut")],
  pages: [faFileLines, __("Specific pages", "memberglut")],
  posts: [faFileLines, __("Specific posts", "memberglut")],
  taxonomy: [faFolderTree, __("Category / tag", "memberglut")],
  url: [faLink, __("URL pattern", "memberglut")]
};
const ACTION_LABEL = {
  message: [faMessage, __("Show message", "memberglut")],
  login: [faRightToBracket, __("Login form", "memberglut")],
  redirect: [faArrowRightFromBracket, __("Redirect", "memberglut")],
  pricing: [faArrowRightFromBracket, __("Pricing page", "memberglut")]
};
function protectSummary(p) {
  var _a;
  if (p.type === "taxonomy") return `${p.taxonomy}: ${p.terms.join(", ")}`;
  if (p.type === "post_type") return p.post_type;
  if (p.type === "url") return p.pattern;
  if (p.posts) return p.posts.join(", ");
  return (_a = PROTECT_LABEL[p.type]) == null ? void 0 : _a[1];
}
function whoSummary(a) {
  if (a.who === "logged_in") return /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: __("Any logged-in user", "memberglut") });
  if (a.who === "logged_out") return /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: __("Logged-out visitors", "memberglut") });
  if (a.who === "roles") return a.roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, color: "blue", children: r }, r));
  return a.plans.map((id) => {
    const p = PLANS.find((x) => x.id === id);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-plan-pill", style: { "--c": p == null ? void 0 : p.color }, children: p == null ? void 0 : p.name }, id);
  });
}
const PER_POST = [
  { id: 41, title: "Ultimate Productivity Guide (PDF)", type: "page", access: "Gold, Lifetime", action: "Redirect to pricing" },
  { id: 52, title: "Live Q&A — March recording", type: "post", access: "Silver, Gold", action: "Message + excerpt" },
  { id: 63, title: "Members Lounge", type: "page", access: "Logged-in users", action: "Login form" }
];
function ContentRules() {
  const { message } = App.useApp();
  const [rules, setRules] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  reactExports.useEffect(() => {
    getRules().then(setRules).finally(() => setLoading(false));
  }, []);
  const columns = [
    {
      title: __("Rule", "memberglut"),
      dataIndex: "title",
      render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link("rule_editor", { id: r.id }), className: "mg-strong-link", children: v }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-protect-list", children: [
          r.protect.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: PROTECT_LABEL[p.type][0] }),
            " ",
            protectSummary(p)
          ] }, i)),
          r.exclude.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ex", children: sprintf(__("except %s", "memberglut"), r.exclude.map(protectSummary).join(", ")) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-row-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: link("rule_editor", { id: r.id }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPenToSquare }),
            " ",
            __("Edit", "memberglut")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-action-sep", children: "|" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { onClick: () => message.success(__("Rule duplicated.", "memberglut")), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCopy }),
            " ",
            __("Duplicate", "memberglut")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-action-sep", children: "|" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Popconfirm, { title: __("Delete this rule?", "memberglut"), description: __("The content becomes public again unless another rule protects it.", "memberglut"), okButtonProps: { danger: true }, onConfirm: () => setRules(rules.filter((x) => x.id !== r.id)), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "mg-action-delete", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }),
            " ",
            __("Delete", "memberglut")
          ] }) })
        ] })
      ] })
    },
    { title: __("Who can access", "memberglut"), render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-tag-wrap", children: whoSummary(r.access) }) },
    { title: __("Others see", "memberglut"), dataIndex: "action", render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mg-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: ACTION_LABEL[v][0] }),
      " ",
      ACTION_LABEL[v][1]
    ] }) },
    { title: __("Priority", "memberglut"), dataIndex: "priority", align: "center", sorter: (a, b) => a.priority - b.priority },
    { title: __("Updated", "memberglut"), dataIndex: "updated", render: fromNow },
    { title: __("Active", "memberglut"), dataIndex: "status", align: "center", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", checked: v === "active", onChange: (on) => setRules(rules.map((x) => x.id === r.id ? { ...x, status: on ? "active" : "inactive" } : x)) }) }
  ];
  const filtered = rules.filter((r) => !search || r.title.toLowerCase().includes(search.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: __("Content Rules", "memberglut"),
        subtitle: __("Lock posts, pages, categories, post types or URLs to plans, roles or logged-in users.", "memberglut"),
        actions: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), href: link("rule_editor"), children: __("New rule", "memberglut") })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-stats-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faShieldHalved }), label: __("Active rules", "memberglut"), value: rules.filter((r) => r.status === "active").length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileLines }), label: __("Protected posts & pages", "memberglut"), value: "148", hint: __("by rules + per-post settings", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserLock }), label: __("Blocked views (7 days)", "memberglut"), value: "2,317", hint: __("visitors who saw a paywall", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRightToBracket }), label: __("Joined after a paywall", "memberglut"), value: "38", hint: __("1.6% conversion", "memberglut"), trend: "up" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-table-wrap mg-tabs-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { items: [
      {
        key: "rules",
        label: __("Rules", "memberglut"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-table-toolbar", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-table-toolbar-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { allowClear: true, prefix: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMagnifyingGlass }), placeholder: __("Search rules…", "memberglut"), value: search, onChange: (e) => setSearch(e.target.value), style: { width: 280 } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-table-toolbar-right mg-muted", children: __("When rules overlap, the one with the higher priority decides.", "memberglut") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable, { rowKey: "id", loading, columns, dataSource: filtered, pagination: false })
        ] })
      },
      {
        key: "posts",
        label: __("Locked one by one", "memberglut"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-note", style: { margin: "16px 20px" }, children: __("Posts and pages locked from the MemberGlut box in the post editor. These settings win over rules.", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable, { rowKey: "id", pagination: false, dataSource: PER_POST, columns: [
            { title: __("Title", "memberglut"), dataIndex: "title", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `post.php?post=${r.id}&action=edit`, className: "mg-strong-link", children: v }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: r.type })
            ] }) },
            { title: __("Who can access", "memberglut"), dataIndex: "access" },
            { title: __("Others see", "memberglut"), dataIndex: "action", render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: v }) },
            { title: "", align: "right", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `post.php?post=${r.id}&action=edit`, children: __("Edit post", "memberglut") }) }
          ] })
        ] })
      }
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-tool-grid", children: [
      [faCubes, __("Blocks", "memberglut"), __("Every block has a “Membership visibility” panel: show it to plans, roles, logged-in or logged-out users.", "memberglut")],
      [faBars, __("Menus", "memberglut"), __("In Appearance › Menus, each item can be shown only to certain plans or roles.", "memberglut")],
      [faCode, __("Shortcode", "memberglut"), /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        __("Lock part of a post:", "memberglut"),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: '[memberglut_restrict plans="2,3"]…[/memberglut_restrict]' })
      ] })]
    ].map(([icon, t, d]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-tool-tile", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: d })
      ] })
    ] }, t)) })
  ] });
}
function ContentRulesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "rules", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContentRules, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(ContentRulesPage, {}));
