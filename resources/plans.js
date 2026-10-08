import { cV as jsxRuntimeExports, P as Page, b as App, d8 as reactExports, cW as link, q as FontAwesomeIcon, bQ as faStar, a8 as __, E as PageHeader, c as Button, bF as faPlus, R as React, aJ as faArrowRight, bT as faTableList, bR as faTableCellsLarge, c7 as faUsers, bC as faPenToSquare, b5 as faCopy, bt as faLink, bW as faTrashCan, ao as _siteUrl, aE as createRoot } from "./chunks/Page-DwAue1bn.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { G as getPlans, T as Tooltip } from "./chunks/api-BB7d3L8U.js";
import { b as planPrice, m as money, p as planDuration } from "./chunks/format-pGmZIQcp.js";
import { T as Tag } from "./chunks/index-DAwOKiJ9.js";
import { S as Switch } from "./chunks/index-BdHVDZgL.js";
import { S as Segmented } from "./chunks/index-jcrWDM9i.js";
import { F as ForwardTable } from "./chunks/Table-DA1U2jgW.js";
import { P as Popconfirm } from "./chunks/index-CKF9N8du.js";
import "./chunks/index-CeeYjpwl.js";
import "./chunks/lookups-BPwJCRM2.js";
import "./chunks/index-bTvZrssX.js";
import "./chunks/useBreakpoint-BRPI9HCX.js";
import "./chunks/index-DYg9RGnF.js";
import "./chunks/index-wzDtlKHr.js";
function Plans() {
  const { message } = App.useApp();
  const [plans, setPlans] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("");
  const [view, setView] = reactExports.useState("table");
  reactExports.useEffect(() => {
    getPlans().then(setPlans).finally(() => setLoading(false));
  }, []);
  const toggle = (p, on) => {
    setPlans(plans.map((x) => x.id === p.id ? { ...x, status: on ? "active" : "inactive" } : x));
    message.success(on ? __("Plan is active and can be bought.", "memberglut") : __("Plan hidden. Current members keep it.", "memberglut"));
  };
  const copyLink = (p) => {
    var _a;
    (_a = navigator.clipboard) == null ? void 0 : _a.writeText(`${_siteUrl || "https://yoursite.com"}/register/?plan=${p.slug}`);
    message.success(__("Signup link copied.", "memberglut"));
  };
  const rows = plans.filter((p) => !filter || p.status === filter);
  const groups = [...new Set(plans.map((p) => p.group))];
  const actions = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-row-actions", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: link("plan_editor", { id: p.id }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPenToSquare }),
      " ",
      __("Edit", "memberglut")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-action-sep", children: "|" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { onClick: () => message.success(__("Plan duplicated.", "memberglut")), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCopy }),
      " ",
      __("Duplicate", "memberglut")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-action-sep", children: "|" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { onClick: () => copyLink(p), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLink }),
      " ",
      __("Signup link", "memberglut")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-action-sep", children: "|" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Popconfirm,
      {
        title: __("Delete this plan?", "memberglut"),
        description: p.members ? sprintf(__("%d members have it. Make it inactive instead to keep them.", "memberglut"), p.members) : __("This cannot be undone.", "memberglut"),
        okButtonProps: { danger: true, disabled: p.members > 0 },
        onConfirm: () => setPlans(plans.filter((x) => x.id !== p.id)),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "mg-action-delete", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }),
          " ",
          __("Delete", "memberglut")
        ] })
      }
    )
  ] });
  const columns = [
    {
      title: __("Plan", "memberglut"),
      dataIndex: "name",
      render: (v, p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-plan-cell", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-plan-dot", style: { background: p.color } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link("plan_editor", { id: p.id }), className: "mg-strong-link", children: v }),
          p.featured && /* @__PURE__ */ jsxRuntimeExports.jsxs(Tag, { color: "gold", bordered: false, style: { marginLeft: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faStar }),
            " ",
            __("Featured", "memberglut")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: p.description }),
          actions(p)
        ] })
      ] })
    },
    { title: __("Price", "memberglut"), dataIndex: "price", render: (v, p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: planPrice(p) }),
      p.trial && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: __("Free trial", "memberglut") }),
      p.signup_fee > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-muted", children: [
        "+ ",
        money(p.signup_fee),
        " ",
        __("sign-up fee", "memberglut")
      ] })
    ] }) },
    { title: __("Access length", "memberglut"), render: (v, p) => p.billing === "recurring" ? __("Until canceled", "memberglut") : planDuration(p) },
    { title: __("Role", "memberglut"), dataIndex: "role", render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: v }) },
    { title: __("Members", "memberglut"), dataIndex: "members", align: "right", render: (v, p) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link("members", { plan: p.id }), children: v }) },
    { title: __("Revenue", "memberglut"), dataIndex: "revenue", align: "right", render: (v) => money(v) },
    { title: __("Active", "memberglut"), dataIndex: "status", align: "center", render: (v, p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", checked: v === "active", onChange: (on) => toggle(p, on) }) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: __("Membership Plans", "memberglut"),
        subtitle: __("What people can buy or join. Each plan sets a price, how long access lasts and the role members get.", "memberglut"),
        actions: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), href: link("plan_editor"), children: __("New plan", "memberglut") })
      }
    ),
    groups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-path-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-path-title", children: [
        sprintf(__("Upgrade path · %s group", "memberglut"), g),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Members can move up or down this path from their account. Change the order in each plan’s “Upgrades” tab.", "memberglut") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-path", children: plans.filter((p) => p.group === g).sort((a, b) => a.tier - b.tier).map((p, i, arr) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: link("plan_editor", { id: p.id, tab: "upgrades" }), className: `mg-path-step ${p.status !== "active" ? "off" : ""}`, style: { "--c": p.color }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: planPrice(p) })
        ] }),
        i < arr.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowRight, className: "mg-path-arrow" })
      ] }, p.id)) })
    ] }, g)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-list-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-filter-tabs", style: { marginBottom: 0 }, children: [["", __("All", "memberglut"), plans.length], ["active", __("Active", "memberglut"), plans.filter((p) => p.status === "active").length], ["inactive", __("Inactive", "memberglut"), plans.filter((p) => p.status !== "active").length]].map(([k, l, n]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: `mg-filter-tab ${filter === k ? "active" : ""}`, onClick: () => setFilter(k), children: [
        l,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-filter-count", children: n })
      ] }, k || "all")) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Segmented, { value: view, onChange: setView, options: [{ value: "table", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableList }) }, { value: "cards", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTableCellsLarge }) }] })
    ] }),
    view === "table" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-table-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable, { rowKey: "id", loading, columns, dataSource: rows, pagination: false }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-plan-grid", children: [
      rows.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mg-plan-tile ${p.status !== "active" ? "off" : ""}`, style: { "--c": p.color }, children: [
        p.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-plan-ribbon", children: __("Featured", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-plan-tile-name", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-plan-tile-price", children: planPrice(p) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: p.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-plan-tile-stats", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUsers }),
            " ",
            p.members
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: money(p.revenue) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Active", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", checked: p.status === "active", onChange: (on) => toggle(p, on) }) })
        ] }),
        actions(p)
      ] }, p.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "mg-plan-tile mg-plan-tile-new", href: link("plan_editor"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("New plan", "memberglut") })
      ] })
    ] })
  ] });
}
function PlansPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "plans", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plans, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(PlansPage, {}));
