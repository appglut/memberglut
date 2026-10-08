import { cV as jsxRuntimeExports, P as Page, E as PageHeader, a8 as __, d6 as queryArg, b as App, d8 as reactExports, q as FontAwesomeIcon, c7 as faUsers, c as Button, bf as faFileExport, b$ as faUserGear, bk as faGear, bg as faFileImport, bv as faMagnifyingGlass, bW as faTrashCan, b0 as faCircleCheck, bX as faTriangleExclamation, bn as faHourglassEnd, aU as faCalculator, bK as faRotate, aS as faBroom, bc as faEraser, aD as createRoot } from "./chunks/Page-C9tSda4_.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { S as Select, $ as getLogs } from "./chunks/api-Dio4a_nt.js";
import { a as dateTime } from "./chunks/format-CNHKAmkn.js";
import { P as PLANS, R as ROLES, A as ACTIVITY } from "./chunks/demoData-BRskJB-O.js";
import { T as Tabs } from "./chunks/index-p4FwzSnn.js";
import { C as Checkbox, F as ForwardTable } from "./chunks/Table-BvILjgAE.js";
import { U as Upload } from "./chunks/index-YerrIPbS.js";
import { S as Switch } from "./chunks/index-B-UY_eZJ.js";
import { T as TypedInputNumber, D as DatePicker } from "./chunks/index-fHKxISrQ.js";
import { I as Input } from "./chunks/index-vq8i8Snb.js";
import { T as Tag } from "./chunks/index-QResbeLU.js";
import "./chunks/lookups-DN25OZmC.js";
import "./chunks/useBreakpoint-CPqLtmmb.js";
import "./chunks/index-BDXpcJpj.js";
import "./chunks/progress-1lGvYr_h.js";
const LEVEL_COLOR = { info: "blue", warning: "orange", error: "red", debug: "default" };
function ImportExport() {
  const { message } = App.useApp();
  const [plans, setPlans] = reactExports.useState([]);
  const [role, setRole] = reactExports.useState("subscriber");
  const [toPlan, setToPlan] = reactExports.useState(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-tools-grid", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-tools-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-tool-h", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUsers }),
        " ",
        __("Export members", "memberglut")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-mig-intro", children: __("A CSV with profile fields, plans, dates, status and lifetime value. Opens in Excel or Google Sheets.", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", value: plans, onChange: setPlans, options: PLANS.map((p) => ({ value: p.id, label: p.name })), placeholder: __("All plans", "memberglut"), style: { width: "100%", marginBottom: 10 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { defaultChecked: true, children: __("Include custom fields", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { defaultChecked: true, style: { margin: "6px 0 14px" }, children: __("Include expired and canceled members", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileExport }), onClick: () => message.success(__("members.csv downloaded.", "memberglut")), children: __("Export members", "memberglut") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-tools-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-tool-h", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserGear }),
        " ",
        __("Turn existing users into members", "memberglut")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-mig-intro", children: __("Give a plan to every WordPress user who has a role. Useful when you start using MemberGlut on an existing site.", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-inline-form", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Users with role", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: role, onChange: setRole, options: ROLES.map((r) => ({ value: r.slug, label: `${r.name} (${r.users})` })), style: { width: 200 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("get plan", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: toPlan, onChange: setToPlan, options: PLANS.map((p) => ({ value: p.id, label: p.name })), style: { width: 140 } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { style: { marginTop: 14 }, onClick: () => message.success(sprintf(__("%d users are now members.", "memberglut"), ROLES.find((r) => r.slug === role).users)), children: __("Convert users", "memberglut") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-tools-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-tool-h", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faGear }),
        " ",
        __("Settings, plans, rules & roles", "memberglut")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-mig-intro", children: __("Move your setup to another site as one JSON file. Members and payments are not included.", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-check-list", children: [__("Global settings", "memberglut"), __("Plans", "memberglut"), __("Content rules", "memberglut"), __("Roles & capabilities", "memberglut"), __("Emails", "memberglut"), __("Coupons", "memberglut")].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { defaultChecked: true, children: l }, l)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileExport }), onClick: () => message.success(__("memberglut-setup.json downloaded.", "memberglut")), children: __("Export", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { accept: ".json", showUploadList: false, beforeUpload: () => {
          message.info(__("A preview of what will change opens here.", "memberglut"));
          return false;
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileImport }), children: __("Import", "memberglut") }) })
      ] })
    ] })
  ] });
}
function Logs() {
  const { message } = App.useApp();
  const [rows, setRows] = reactExports.useState([]);
  const [level, setLevel] = reactExports.useState(null);
  const [source, setSource] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  reactExports.useEffect(() => {
    getLogs().then(setRows);
  }, []);
  const filtered = rows.filter((r) => (!level || r.level === level) && (!source || r.source === source) && (!search || r.message.toLowerCase().includes(search.toLowerCase())));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-tools-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-log-settings", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", defaultChecked: true }),
        " ",
        __("Logging on", "memberglut")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        __("Keep logs for", "memberglut"),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { size: "small", min: 1, max: 365, defaultValue: 30, style: { width: 70 } }),
        " ",
        __("days", "memberglut")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small" }),
        " ",
        __("Include debug messages", "memberglut")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-log-filters", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { allowClear: true, prefix: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMagnifyingGlass }), placeholder: __("Search messages…", "memberglut"), value: search, onChange: (e) => setSearch(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, placeholder: __("All levels", "memberglut"), value: level, onChange: setLevel, options: Object.keys(LEVEL_COLOR).map((l) => ({ value: l, label: l })), style: { width: 140 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, placeholder: __("All sources", "memberglut"), value: source, onChange: setSource, options: ["subscription", "payment", "access", "email", "login", "cron"].map((s) => ({ value: s, label: s })), style: { width: 160 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker.RangePicker, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { danger: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }), onClick: () => {
        setRows([]);
        message.success(__("Logs cleared.", "memberglut"));
      }, children: __("Clear logs", "memberglut") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable, { rowKey: "id", size: "middle", dataSource: filtered, pagination: { pageSize: 10 }, columns: [
      { title: __("Time", "memberglut"), dataIndex: "date", width: 190, render: dateTime },
      { title: __("Level", "memberglut"), dataIndex: "level", width: 100, render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: LEVEL_COLOR[v], bordered: false, children: v }) },
      { title: __("Source", "memberglut"), dataIndex: "source", width: 130 },
      { title: __("Message", "memberglut"), dataIndex: "message" }
    ] })
  ] });
}
function Activity() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-tools-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-mig-intro", style: { marginTop: 0 }, children: __("Every time access is granted, changed or removed, by whom, and why. Kept for the life of the membership.", "memberglut") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable, { rowKey: "id", size: "middle", pagination: false, dataSource: ACTIVITY.concat(ACTIVITY.map((a) => ({ ...a, id: a.id + 50 }))), columns: [
      { title: __("Time", "memberglut"), dataIndex: "date", width: 190, render: dateTime },
      { title: __("Event", "memberglut"), dataIndex: "type", width: 120, render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: v }) },
      { title: __("Details", "memberglut"), dataIndex: "text" },
      { title: __("By", "memberglut"), width: 120, render: (v, r) => r.type === "grant" && r.id % 2 === 0 ? "admin" : __("system", "memberglut") }
    ] })
  ] });
}
function Status() {
  const checks = [
    [true, __("Membership pages are set", "memberglut"), ""],
    [true, __("Renewals and expirations are scheduled (Action Scheduler)", "memberglut"), __("Next run in 23 minutes", "memberglut")],
    [false, __("Stripe webhook received recently", "memberglut"), __("No webhook in 7 days — check the URL in Stripe", "memberglut")],
    [true, __("Site uses HTTPS", "memberglut"), ""],
    [false, __("A caching plugin is active", "memberglut"), __("Make sure member pages are excluded", "memberglut")],
    [true, __("Emails can be sent", "memberglut"), ""]
  ];
  const env = [
    ["MemberGlut", typeof memberglut_admin !== "undefined" && memberglut_admin.version || "1.1.5"],
    ["WordPress", "6.8"],
    ["PHP", "8.2.12"],
    ["MySQL", "8.0.36"],
    ["Memory limit", "256M"],
    ["Max upload", "64M"],
    ["WP-Cron", __("Enabled", "memberglut")],
    ["Active plugins", "14"],
    ["Theme", "Twenty Twenty-Five"],
    ["Multisite", __("No", "memberglut")]
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-tools-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-status-grid", children: [["671", __("Active members", "memberglut")], ["4", __("Plans", "memberglut")], ["4", __("Rules", "memberglut")], ["1,284", __("Payments", "memberglut")], ["8", __("Roles", "memberglut")]].map(([n, l]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-status-stat", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: n }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: l })
    ] }, l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-tool-h", children: __("Health checks", "memberglut") }),
    checks.map(([ok, t, note]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-check", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: ok ? faCircleCheck : faTriangleExclamation, style: { color: ok ? "#10b981" : "#f59e0b" } }),
      t,
      note && /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: note })
    ] }, t)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-tool-h", children: __("Environment", "memberglut") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "mg-env", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: env.map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: k }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: v })
    ] }, k)) }) })
  ] });
}
function Maintenance() {
  const { message, modal } = App.useApp();
  const tasks = [
    [faHourglassEnd, __("Run expirations now", "memberglut"), __("Expire overdue subscriptions and update roles without waiting for the scheduler.", "memberglut"), false],
    [faCalculator, __("Recount members", "memberglut"), __("Rebuild the member counts and revenue totals shown on plans and the dashboard.", "memberglut"), false],
    [faRotate, __("Sync roles with plans", "memberglut"), __("Give every active member their plan’s role again, and remove roles from expired members.", "memberglut"), false],
    [faBroom, __("Clear cached data", "memberglut"), __("Delete MemberGlut transients (stats, access cache).", "memberglut"), false],
    [faEraser, __("Reset settings", "memberglut"), __("Put Global Settings back to their defaults. Plans, members and payments are kept.", "memberglut"), true],
    [faTrashCan, __("Delete all MemberGlut data", "memberglut"), __("Remove every plan, member subscription, payment, rule, log and setting. WordPress users stay. This cannot be undone.", "memberglut"), true]
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card mg-tools-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-task-grid", children: tasks.map(([icon, t, d, danger]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mg-task ${danger ? "danger" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-task-t", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon, style: { marginRight: 8, color: danger ? "#dc2626" : "#e94560" } }),
      t
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-task-d", children: d }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { danger, onClick: () => danger ? modal.confirm({ title: t, content: d, okButtonProps: { danger: true }, okText: __("Yes, continue", "memberglut"), onOk: () => message.success(__("Done.", "memberglut")) }) : message.success(__("Done.", "memberglut")), children: __("Run", "memberglut") })
  ] }, t)) }) });
}
function Tools() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: __("Data & Logs", "memberglut"), subtitle: __("Import and export, logs, system status and maintenance.", "memberglut") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { className: "mg-page-tabs", defaultActiveKey: queryArg("tab") || "transfer", items: [
      { key: "transfer", label: __("Import / Export", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImportExport, {}) },
      { key: "logs", label: __("Logs", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logs, {}) },
      { key: "activity", label: __("Access log", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, {}) },
      { key: "status", label: __("System status", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Status, {}) },
      { key: "maintenance", label: __("Maintenance", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Maintenance, {}) }
    ] })
  ] });
}
function ToolsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tools, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(ToolsPage, {}));
