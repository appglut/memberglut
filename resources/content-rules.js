import { aJ as faArrowRightFromBracket, a8 as __, bJ as faRightToBracket, bw as faMessage, cV as jsxRuntimeExports, P as Page, b as App, d8 as reactExports, cW as link, q as FontAwesomeIcon, bt as faLink, bS as faTableColumns, c1 as faUserPen, aR as faBoxArchive, bj as faFolderTree, bh as faFileLines, bm as faGlobe, bC as faPenToSquare, b5 as faCopy, bW as faTrashCan, E as PageHeader, c as Button, bF as faPlus, a1 as StatCard, bO as faShieldHalved, c0 as faUserLock, bv as faMagnifyingGlass, b8 as faCubes, aP as faBars, b4 as faCode, bP as faSliders, aD as createRoot } from "./chunks/Page-BUA-PWqe.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { ab as getRuleStats, a3 as getPerPostRules, ac as getRules, y as duplicateRule, v as deleteRule, aF as setRuleStatus } from "./chunks/api-BM7DBw7H.js";
import { f as fromNow } from "./chunks/format-DaGJt-sA.js";
import { L, r as roleName, a as planById } from "./chunks/lookups-DOjv_COY.js";
import { P as Popconfirm } from "./chunks/index-Bkp9TiIj.js";
import { S as Switch } from "./chunks/index-DGAtssNh.js";
import { T as Tabs } from "./chunks/index-DiRpu2og.js";
import { I as Input } from "./chunks/index-C2zsmztB.js";
import { F as ForwardTable } from "./chunks/Table-D-hy_ITf.js";
import { T as Tag } from "./chunks/index-DB9Yoa9e.js";
import "./chunks/dayjs.min-Bm93or1s.js";
import "./chunks/index-sggwWRB7.js";
import "./chunks/useBreakpoint-CSmdvqeW.js";
import "./chunks/index-B04I5vrr.js";
const PROTECT_ICON = {
  site: faGlobe,
  post_type: faFileLines,
  pages: faFileLines,
  posts: faFileLines,
  children: faFileLines,
  taxonomy: faFolderTree,
  archive: faBoxArchive,
  author: faUserPen,
  template: faTableColumns,
  url: faLink
};
const ACTION_LABEL = {
  message: [faMessage, __("Show message", "memberglut")],
  login: [faRightToBracket, __("Login form", "memberglut")],
  redirect: [faArrowRightFromBracket, __("Redirect", "memberglut")],
  pricing: [faArrowRightFromBracket, __("Pricing page", "memberglut")]
};
function actionCell(v) {
  if (v === "inherit") {
    const g = ACTION_LABEL[(L.settings_global || {}).action] || ACTION_LABEL.message;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mg-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSliders }),
      " ",
      sprintf(__("Global: %s", "memberglut"), g[1])
    ] });
  }
  const a = ACTION_LABEL[v] || ACTION_LABEL.message;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mg-muted", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: a[0] }),
    " ",
    a[1]
  ] });
}
function whoSummary(r) {
  if (r.who === "logged_in") return /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: __("Any logged-in user", "memberglut") });
  if (r.who === "logged_out") return /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: __("Logged-out visitors", "memberglut") });
  if (r.who === "roles") return r.roles.map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, color: "blue", children: roleName(x) }, x));
  return r.plans.map((id) => {
    const p = planById(id);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-plan-pill", style: { "--c": p ? p.color : "#94a3b8" }, children: p ? p.name : `#${id}` }, id);
  });
}
function ContentRules() {
  const { message } = App.useApp();
  const [rules, setRules] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  const [stats, setStats] = reactExports.useState(null);
  const [perPost, setPerPost] = reactExports.useState(null);
  const load = () => getRules({ search }).then(setRules).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  reactExports.useEffect(() => {
    const t = setTimeout(load, search ? 300 : 0);
    return () => clearTimeout(t);
  }, [search]);
  reactExports.useEffect(() => {
    getRuleStats().then(setStats).catch(() => {
    });
  }, []);
  const toggle = async (r, on) => {
    try {
      const n = await setRuleStatus(r.id, on ? "active" : "inactive");
      setRules(rules.map((x) => x.id === r.id ? { ...x, status: n.status } : x));
    } catch (e) {
      message.error(e.message);
    }
  };
  const duplicate = async (r) => {
    try {
      await duplicateRule(r.id);
      message.success(__("Rule duplicated (inactive).", "memberglut"));
      load();
    } catch (e) {
      message.error(e.message);
    }
  };
  const remove = async (r) => {
    try {
      await deleteRule(r.id);
      setRules(rules.filter((x) => x.id !== r.id));
      message.success(__("Rule deleted.", "memberglut"));
    } catch (e) {
      message.error(e.message);
    }
  };
  const columns = [
    {
      title: __("Rule", "memberglut"),
      dataIndex: "title",
      render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link("rule_editor", { id: r.id }), className: "mg-strong-link", children: v }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-protect-list", children: [
          r.protect.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: PROTECT_ICON[p.type] || faFileLines }),
            " ",
            r.summary.protect[i]
          ] }, i)),
          r.exclude.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ex", children: sprintf(__("except %s", "memberglut"), r.summary.exclude.join(", ")) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-row-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: link("rule_editor", { id: r.id }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPenToSquare }),
            " ",
            __("Edit", "memberglut")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-action-sep", children: "|" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { onClick: () => duplicate(r), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCopy }),
            " ",
            __("Duplicate", "memberglut")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-action-sep", children: "|" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Popconfirm, { title: __("Delete this rule?", "memberglut"), description: __("The content becomes public again unless another rule protects it.", "memberglut"), okButtonProps: { danger: true }, onConfirm: () => remove(r), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "mg-action-delete", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }),
            " ",
            __("Delete", "memberglut")
          ] }) })
        ] })
      ] })
    },
    { title: __("Who can access", "memberglut"), render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-tag-wrap", children: whoSummary(r) }) },
    { title: __("Others see", "memberglut"), dataIndex: "action", render: actionCell },
    { title: __("Priority", "memberglut"), dataIndex: "priority", align: "center", sorter: (a, b) => a.priority - b.priority },
    { title: __("Updated", "memberglut"), dataIndex: "updated", render: fromNow },
    { title: __("Active", "memberglut"), dataIndex: "status", align: "center", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", checked: v === "active", onChange: (on) => toggle(r, on) }) }
  ];
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faShieldHalved }), label: __("Active rules", "memberglut"), value: stats ? stats.active : "…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileLines }), label: __("Protected posts & pages", "memberglut"), value: stats ? stats.protected.toLocaleString() : "…", hint: __("by rules + per-post settings", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserLock }), label: __("Blocked views (7 days)", "memberglut"), value: stats ? stats.views.toLocaleString() : "…", hint: __("visitors who saw a paywall", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRightToBracket }), label: __("Joined after a paywall", "memberglut"), value: stats ? stats.conversions : "…", hint: stats ? sprintf(__("%s%% conversion", "memberglut"), stats.rate) : "", trend: "up" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-table-wrap mg-tabs-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { onChange: (k) => {
      if (k === "posts" && !perPost) getPerPostRules().then(setPerPost).catch(() => setPerPost([]));
    }, items: [
      {
        key: "rules",
        label: __("Rules", "memberglut"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-table-toolbar", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-table-toolbar-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { allowClear: true, prefix: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMagnifyingGlass }), placeholder: __("Search rules…", "memberglut"), value: search, onChange: (e) => setSearch(e.target.value), style: { width: 280 } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-table-toolbar-right mg-muted", children: __("When rules overlap, the one with the higher priority decides.", "memberglut") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable, { rowKey: "id", loading, columns, dataSource: rules, pagination: false, locale: { emptyText: __("No rules yet. Create one to protect content.", "memberglut") } })
        ] })
      },
      {
        key: "posts",
        label: __("Locked one by one", "memberglut"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-note", style: { margin: "16px 20px" }, children: __("Posts and pages with their own settings in the MemberGlut access box of the post editor. These settings win over rules.", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable, { rowKey: "id", pagination: { pageSize: 20 }, loading: perPost === null, dataSource: perPost || [], locale: { emptyText: __("No post has its own access settings.", "memberglut") }, columns: [
            { title: __("Title", "memberglut"), dataIndex: "title", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: r.edit_url, className: "mg-strong-link", children: v }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: r.type }),
              r.status !== "publish" && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: r.status })
            ] }) },
            { title: __("Who can access", "memberglut"), dataIndex: "access" },
            { title: __("Others see", "memberglut"), dataIndex: "action", render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: v }) },
            { title: "", align: "right", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: r.view_url, target: "_blank", rel: "noreferrer", children: __("View", "memberglut") }),
              " · ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: r.edit_url, children: __("Edit post", "memberglut") })
            ] }) }
          ] })
        ] })
      }
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-tool-grid", children: [
      [faCubes, __("Blocks", "memberglut"), __("Every block has a “Membership visibility” panel: show it to plans, roles, logged-in or logged-out users, or hide it from them.", "memberglut")],
      [faBars, __("Menus", "memberglut"), __("In Appearance › Menus, each item can be shown only to certain plans or roles. Navigation blocks use the block panel.", "memberglut")],
      [faCode, __("Shortcode", "memberglut"), /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        __("Lock part of a post:", "memberglut"),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: '[memberglut_restrict plans="gold"]…[/memberglut_restrict]' })
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
