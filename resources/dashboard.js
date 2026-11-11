import { dl as jsxRuntimeExports, P as Page, dB as reactExports, O as PageHeader, d as Button, ag as __, dm as link, u as FontAwesomeIcon, c3 as faShieldHalved, bH as faLayerGroup, bV as faPlus, a6 as Skeleton, a7 as StatCard, co as faUsers, c1 as faSackDollar, cj as faUserPlus, bD as faHourglassHalf, aX as faArrowRight, bf as faCircleCheck, be as faCircle, b_ as faRightToBracket, cf as faUserClock, cn as faUserXmark, bl as faCreditCard, bi as faClockRotateLeft } from "./chunks/client-CTTyQOnd.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { a as CopyCode } from "./chunks/SettingsPanel-CL4JwW_5.js";
import { as as getStats, ak as getPlans, a6 as getEvents, ar as getSetupChecklist, E as Empty, T as Tooltip } from "./chunks/api-BoF1RtIE.js";
import { d as dayjs } from "./chunks/lookups-2moJUDPH.js";
import { m as money, b as fromNow } from "./chunks/format-CXuEAMXg.js";
import { S as Segmented } from "./chunks/index-BoUobS93.js";
import { P as Progress } from "./chunks/progress-Dds9qb8O.js";
import { b as boot } from "./chunks/boot-Di0iJtho.js";
import "./chunks/registry-Cs5PTTmS.js";
import "./chunks/index-BedyQTUQ.js";
import "./chunks/index-D-VkJOw2.js";
import "./chunks/index-d8vYGx8q.js";
import "./chunks/index-C6h9-TWP.js";
import "./chunks/index-DLAXZnY0.js";
import "./chunks/index-DNVHX8xZ.js";
import "./chunks/index-42CDOxMR.js";
function BarChart({ data, field, format }) {
  const max = Math.max(...data.map((d) => d[field]), 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-bars", children: data.map((d, i) => {
    const label = dayjs(`${d.month}-01`).format("MMM");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: `${label}: ${format(d[field])}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-bar-fill", style: { height: `${d[field] / max * 100}%` } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
    ] }) }, i);
  }) });
}
const ACTIVITY_ICON = {
  grant: faUserPlus,
  payment: faCreditCard,
  cancel: faUserXmark,
  expire: faHourglassHalf,
  pending: faUserClock,
  login: faRightToBracket
};
const ACTIVITY_GROUP = {
  grant: "grant",
  activate: "grant",
  approve: "grant",
  registered: "grant",
  plan_change: "grant",
  payment_completed: "payment",
  payment_created: "payment",
  payment_receipt: "payment",
  payment_failed: "cancel",
  payment_refund: "cancel",
  cancel: "cancel",
  revoke: "cancel",
  reject: "cancel",
  expire: "expire",
  hold: "expire",
  pending: "pending",
  login_locked: "login",
  login_blocked: "login"
};
const ACTIVITY_TYPES = Object.keys(ACTIVITY_GROUP).join(",");
const trendText = (v, tpl) => sprintf(tpl, v >= 0 ? "▲" : "▼", Math.abs(v));
function Dashboard() {
  const [stats, setStats] = reactExports.useState(null);
  const [plans, setPlans] = reactExports.useState([]);
  const [activity, setActivity] = reactExports.useState([]);
  const [checklist, setChecklist] = reactExports.useState([]);
  const [metric, setMetric] = reactExports.useState("revenue");
  reactExports.useEffect(() => {
    Promise.all([getStats(), getPlans().catch(() => []), getEvents({ per_page: 7, type: ACTIVITY_TYPES }).then((r) => r.items).catch(() => []), getSetupChecklist().catch(() => [])]).then(([s, p, a, c]) => {
      setStats(s);
      setPlans(p);
      setActivity(a);
      setChecklist(c);
    });
  }, []);
  const done = checklist.filter((c) => c.done).length;
  const totalMembers = plans.reduce((n, p) => n + p.members, 0) || 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: __("Dashboard", "memberglut"),
        subtitle: __("How your membership site is doing today.", "memberglut"),
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faShieldHalved }), href: link("rule_editor"), children: __("Protect content", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLayerGroup }), href: link("plan_editor"), children: __("New plan", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), href: link("members", { add: 1 }), children: __("Add member", "memberglut") })
        ] })
      }
    ),
    !stats ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { active: true, paragraph: { rows: 8 } }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-stats-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUsers }), label: __("Active members", "memberglut"), value: stats.active_members.toLocaleString(), hint: sprintf(__("%d waiting for approval", "memberglut"), stats.pending) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSackDollar }), label: __("Revenue this month", "memberglut"), value: money(stats.revenue_month), hint: trendText(stats.revenue_change, __("%1$s %2$s%% vs last month", "memberglut")), trend: stats.revenue_change >= 0 ? "up" : "down" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserPlus }), label: __("New members (30 days)", "memberglut"), value: stats.new_members_30d, hint: `${trendText(stats.new_members_change, __("%1$s %2$s%%", "memberglut"))} · ${sprintf(__("%d canceled", "memberglut"), stats.canceled_30d)}`, trend: stats.new_members_change >= 0 ? "up" : "down" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHourglassHalf }), label: __("Expiring in 7 days", "memberglut"), value: stats.expiring_7d, hint: sprintf(__("Churn %s%% this month", "memberglut"), stats.churn), trend: "down" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-dash-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-card-flush", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card-head", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-title", children: metric === "revenue" ? __("Revenue", "memberglut") : __("Active members", "memberglut") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-sub", children: __("Last 12 months", "memberglut") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Segmented, { value: metric, onChange: setMetric, options: [{ value: "revenue", label: __("Revenue", "memberglut") }, { value: "members", label: __("Members", "memberglut") }] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BarChart, { data: stats.chart, field: metric, format: metric === "revenue" ? money : (v) => v }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card-foot", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              __("Monthly recurring revenue", "memberglut"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: money(stats.mrr) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: link("payments"), children: [
              __("View payments", "memberglut"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowRight })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-title", children: __("Get started", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-sub", style: { marginBottom: 12 }, children: sprintf(__("%1$d of %2$d steps done", "memberglut"), done, checklist.length) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { percent: Math.round(done / (checklist.length || 1) * 100), showInfo: false, strokeColor: "#e94560" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mg-checklist", children: checklist.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: c.done ? "done" : "", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: c.done ? faCircleCheck : faCircle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.label }),
            !c.done && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link(c.target, c.args || {}), children: __("Do it", "memberglut") })
          ] }, c.key)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card-head-plain", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-title", children: __("Members by plan", "memberglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link("plans"), children: __("All plans", "memberglut") })
          ] }),
          plans.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-plan-bar", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-plan-bar-top", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("i", { style: { background: p.color } }),
                p.name,
                p.status !== "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs("em", { children: [
                  " · ",
                  __("inactive", "memberglut")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: p.members })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { percent: p.members / totalMembers * 100, showInfo: false, strokeColor: p.color, size: "small" })
          ] }, p.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card-head-plain", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-title", children: __("Recent activity", "memberglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link("tools", { tab: "activity" }), children: __("Full log", "memberglut") })
          ] }),
          activity.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mg-activity", children: activity.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `ic t-${ACTIVITY_GROUP[a.type] || "other"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: ACTIVITY_ICON[ACTIVITY_GROUP[a.type]] || faClockRotateLeft }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: a.text }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: fromNow(a.date) })
            ] })
          ] }, a.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-title", children: __("Shortcodes", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-sub", style: { marginBottom: 14 }, children: __("Place these on any page, or use the MemberGlut blocks in the editor.", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-shortcodes", children: [
            ["[memberglut_register]", __("Registration + checkout", "memberglut")],
            ["[memberglut_login]", __("Login form", "memberglut")],
            ["[memberglut_account]", __("My Account page", "memberglut")],
            ["[memberglut_plans]", __("Pricing table", "memberglut")],
            ["[memberglut_lost_password]", __("Lost password", "memberglut")],
            ['[memberglut_restrict plans="2,3"]…[/memberglut_restrict]', __("Lock part of a post", "memberglut")]
          ].map(([code, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-shortcode-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CopyCode, { code })
          ] }, code)) })
        ] })
      ] })
    ] })
  ] });
}
function DashboardPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) });
}
boot(DashboardPage);
