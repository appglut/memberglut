import { a8 as __, cV as jsxRuntimeExports, P as Page, E as PageHeader, d6 as queryArg, b as App, d8 as reactExports, q as FontAwesomeIcon, c7 as faUsers, c as Button, bf as faFileExport, b$ as faUserGear, bk as faGear, bg as faFileImport, bv as faMagnifyingGlass, bW as faTrashCan, b5 as faCopy, b0 as faCircleCheck, bX as faTriangleExclamation, bn as faHourglassEnd, aU as faCalculator, bK as faRotate, aS as faBroom, bc as faEraser, aD as createRoot } from "./chunks/Page-IjLhTpkA.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { ag as getRoles, S as Select, N as exportSetup, a4 as getLogs, q as clearLogs, a0 as getEvents, ao as getStatus, I as exportMembers, s as convertUsers, aC as previewSetupImport, aN as saveSettings, aE as runMaintenance, ar as importSetup } from "./chunks/api-bTN0wgJl.js";
import { a as dateTime } from "./chunks/format-DqybqfzJ.js";
import { b as planOptions } from "./chunks/lookups-BorBkD6H.js";
import { T as Tabs } from "./chunks/index-CIFeBIlA.js";
import { C as Checkbox, F as ForwardTable } from "./chunks/Table-vL4FzABu.js";
import { U as Upload } from "./chunks/index-52E4Djqj.js";
import { S as Switch } from "./chunks/index-1uPwKzTk.js";
import { T as TypedInputNumber, D as DatePicker } from "./chunks/index-JzziSPeX.js";
import { I as Input } from "./chunks/index-D_WImSsm.js";
import { T as Tag } from "./chunks/index-BGwJdhy2.js";
import { S as Spin } from "./chunks/index-Cx3mrKAm.js";
import { M as Modal } from "./chunks/index-CP2VMNWD.js";
import { A as Alert } from "./chunks/index-B58vIpI9.js";
import "./chunks/useBreakpoint-Cs-_AIQv.js";
import "./chunks/progress-CN1XNwD9.js";
const LEVEL_COLOR = { info: "blue", warning: "orange", error: "red", debug: "default" };
const SECTIONS = [
  ["settings", __("Global settings", "memberglut")],
  ["plans", __("Plans", "memberglut")],
  ["rules", __("Content rules", "memberglut")],
  ["roles", __("Roles & capabilities", "memberglut")],
  ["emails", __("Emails", "memberglut")],
  ["coupons", __("Coupons", "memberglut")]
];
const SECTION_LABEL = Object.fromEntries(SECTIONS);
function ImportPreview({ file, preview, onClose, onDone }) {
  const { message } = App.useApp();
  const [picked, setPicked] = reactExports.useState(Object.keys(preview || {}));
  const [busy, setBusy] = reactExports.useState(false);
  const apply = async () => {
    setBusy(true);
    try {
      const res = await importSetup({ data: file, sections: picked });
      const errors = Object.values(res).flatMap((s) => s.errors || []);
      if (errors.length) {
        Modal.warning({ title: __("Imported with some problems", "memberglut"), content: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: errors.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: e }, e)) }) });
      } else {
        message.success(__("Setup imported.", "memberglut"));
      }
      onDone();
    } catch (e) {
      message.error(e.message);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      open: !!preview,
      onCancel: onClose,
      onOk: apply,
      confirmLoading: busy,
      okText: __("Import", "memberglut"),
      okButtonProps: { disabled: !picked.length },
      title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Import setup", "memberglut") }),
      width: 560,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-modal-intro", children: __("Plans are matched by slug, rules by name, coupons by code and roles by slug. Rules and coupons are linked to the matching plans on this site.", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox.Group, { value: picked, onChange: setPicked, style: { width: "100%" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-import-rows", children: Object.entries(preview || {}).map(([key, b]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-import-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: key, children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: SECTION_LABEL[key] || key }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: sprintf(__("%1$d new · %2$d changed · %3$d unchanged", "memberglut"), b.new.length, b.changed.length, b.unchanged.length) }),
          (b.new.length > 0 || b.changed.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-import-names", children: [
            b.new.slice(0, 8).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "green", bordered: false, children: n }, `n${n}`)),
            b.changed.slice(0, 8).map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "orange", bordered: false, children: n }, `c${n}`))
          ] })
        ] }, key)) }) })
      ]
    }
  );
}
function ImportExport() {
  const { message } = App.useApp();
  const [plans, setPlans] = reactExports.useState([]);
  const [customFields, setCustomFields] = reactExports.useState(true);
  const [inactive, setInactive] = reactExports.useState(true);
  const [roles, setRoles] = reactExports.useState([]);
  const [role, setRole] = reactExports.useState("subscriber");
  const [toPlan, setToPlan] = reactExports.useState(null);
  const [sendEmail, setSendEmail] = reactExports.useState(false);
  const [converting, setConverting] = reactExports.useState(false);
  const [sections, setSections] = reactExports.useState(SECTIONS.map(([k]) => k));
  const [file, setFile] = reactExports.useState(null);
  const [preview, setPreview] = reactExports.useState(null);
  reactExports.useEffect(() => {
    getRoles().then((r) => setRoles(r.filter((x) => x.slug !== "administrator"))).catch(() => {
    });
  }, []);
  const exportMembers$1 = () => exportMembers({ plans, custom_fields: customFields ? 1 : 0, include_inactive: inactive ? 1 : 0 }).then((r) => {
    if (r && r.queued) message.info(__("The export is large and is being prepared. You will get an email when it is ready.", "memberglut"));
  }).catch((e) => message.error(e.message));
  const convert = async () => {
    if (!toPlan) {
      message.error(__("Choose a plan.", "memberglut"));
      return;
    }
    setConverting(true);
    try {
      const r = await convertUsers(role, toPlan, sendEmail);
      message.success(r.queued ? sprintf(__("%d users are being converted in the background.", "memberglut"), r.total) : sprintf(__("%1$d of %2$d users are now members.", "memberglut"), r.converted, r.total));
    } catch (e) {
      message.error(e.message);
    } finally {
      setConverting(false);
    }
  };
  const readImport = (f) => {
    f.text().then((txt) => {
      let data;
      try {
        data = JSON.parse(txt);
      } catch (e) {
        message.error(__("This file is not valid JSON.", "memberglut"));
        return;
      }
      previewSetupImport({ data }).then((p) => {
        setFile(data);
        setPreview(p);
      }).catch((e) => message.error(e.message));
    });
    return false;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-tools-grid", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-tools-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-tool-h", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUsers }),
        " ",
        __("Export members", "memberglut")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-mig-intro", children: __("A CSV with profile fields, plans, dates, status and lifetime value. Opens in Excel or Google Sheets.", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", value: plans, onChange: setPlans, options: planOptions(), placeholder: __("All plans", "memberglut"), style: { width: "100%", marginBottom: 10 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: customFields, onChange: (e) => setCustomFields(e.target.checked), children: __("Include custom fields", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: inactive, onChange: (e) => setInactive(e.target.checked), style: { margin: "6px 0 14px" }, children: __("Include expired and canceled members", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileExport }), onClick: exportMembers$1, children: __("Export members", "memberglut") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-tools-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-tool-h", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserGear }),
        " ",
        __("Turn existing users into members", "memberglut")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-mig-intro", children: __("Give a plan to every WordPress user who has a role. Users who already have the plan are skipped.", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-inline-form", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Users with role", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: role, onChange: setRole, options: roles.map((r) => ({ value: r.slug, label: `${r.name} (${r.users})` })), style: { width: 200 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("get plan", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: toPlan, onChange: setToPlan, options: planOptions((p) => p.status === "active"), placeholder: __("Choose…", "memberglut"), style: { width: 160 } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: sendEmail, onChange: (e) => setSendEmail(e.target.checked), style: { marginTop: 10 }, children: __("Send them the “membership active” email", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { style: { marginTop: 14 }, loading: converting, onClick: convert, children: __("Convert users", "memberglut") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-tools-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-tool-h", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faGear }),
        " ",
        __("Settings, plans, rules & roles", "memberglut")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-mig-intro", children: __("Move your setup to another site as one JSON file. Members, payments, API keys and page choices are not included.", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox.Group, { value: sections, onChange: setSections, style: { width: "100%" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-check-list", children: SECTIONS.map(([k, l]) => /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: k, children: l }, k)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, marginTop: 14 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", disabled: !sections.length, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileExport }), onClick: () => exportSetup(sections).catch((e) => message.error(e.message)), children: __("Export", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { accept: ".json,application/json", showUploadList: false, beforeUpload: readImport, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileImport }), children: __("Import", "memberglut") }) })
      ] })
    ] }),
    preview && /* @__PURE__ */ jsxRuntimeExports.jsx(ImportPreview, { file, preview, onClose: () => setPreview(null), onDone: () => setPreview(null) })
  ] });
}
function Logs() {
  const { message, modal } = App.useApp();
  const [data, setData] = reactExports.useState({ items: [], total: 0, sources: [], settings: null });
  const [loading, setLoading] = reactExports.useState(true);
  const [level, setLevel] = reactExports.useState(null);
  const [source, setSource] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [query, setQuery] = reactExports.useState("");
  const [range, setRange] = reactExports.useState(null);
  const [page, setPage] = reactExports.useState(1);
  const [settings, setSettings] = reactExports.useState(null);
  const load = reactExports.useCallback(() => {
    setLoading(true);
    getLogs({
      level: level || "",
      source: source || "",
      search: query,
      page,
      per_page: 20,
      from: range ? range[0].format("YYYY-MM-DD") : "",
      to: range ? range[1].format("YYYY-MM-DD") : ""
    }).then((r) => {
      setData(r);
      setSettings((s) => s || r.settings);
    }).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  }, [level, source, query, range, page]);
  reactExports.useEffect(load, [load]);
  reactExports.useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);
  const saveSetting = (patch) => {
    setSettings({ ...settings, ...patch });
    saveSettings(patch).then(() => message.success(__("Saved.", "memberglut"))).catch((e) => message.error(e.message));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-tools-card", children: [
    settings && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-log-settings", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", checked: settings.debug_log, onChange: (v) => saveSetting({ debug_log: v }) }),
        " ",
        __("Logging on", "memberglut")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        __("Keep logs for", "memberglut"),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { size: "small", min: 1, max: 365, value: settings.log_retention_days, onChange: (v) => v && setSettings({ ...settings, log_retention_days: v }), onBlur: () => saveSetting({ log_retention_days: settings.log_retention_days }), style: { width: 70 } }),
        " ",
        __("days", "memberglut")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", checked: settings.log_debug, disabled: !settings.debug_log, onChange: (v) => saveSetting({ log_debug: v }) }),
        " ",
        __("Include debug messages", "memberglut")
      ] }),
      !settings.debug_log && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: __("Errors are always logged.", "memberglut") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-log-filters", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { allowClear: true, prefix: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMagnifyingGlass }), placeholder: __("Search messages…", "memberglut"), value: search, onChange: (e) => setSearch(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, placeholder: __("All levels", "memberglut"), value: level, onChange: (v) => {
        setLevel(v);
        setPage(1);
      }, options: Object.keys(LEVEL_COLOR).map((l) => ({ value: l, label: l })), style: { width: 140 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, placeholder: __("All sources", "memberglut"), value: source, onChange: (v) => {
        setSource(v);
        setPage(1);
      }, options: (data.sources || []).map((s) => ({ value: s, label: s })), style: { width: 160 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker.RangePicker, { value: range, onChange: (v) => {
        setRange(v);
        setPage(1);
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { danger: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }), onClick: () => modal.confirm({
        title: __("Delete all log lines?", "memberglut"),
        okButtonProps: { danger: true },
        okText: __("Clear logs", "memberglut"),
        onOk: () => clearLogs().then(() => {
          message.success(__("Logs cleared.", "memberglut"));
          setPage(1);
          load();
        })
      }), children: __("Clear logs", "memberglut") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ForwardTable,
      {
        rowKey: "id",
        size: "middle",
        loading,
        dataSource: data.items,
        pagination: { current: page, pageSize: 20, total: data.total, showSizeChanger: false, onChange: setPage },
        expandable: { rowExpandable: (r) => !!r.context, expandedRowRender: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mg-log-context", children: JSON.stringify(r.context, null, 2) }) },
        columns: [
          { title: __("Time", "memberglut"), dataIndex: "date", width: 190, render: dateTime },
          { title: __("Level", "memberglut"), dataIndex: "level", width: 100, render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: LEVEL_COLOR[v], bordered: false, children: v }) },
          { title: __("Source", "memberglut"), dataIndex: "source", width: 130 },
          { title: __("Message", "memberglut"), dataIndex: "message" }
        ]
      }
    )
  ] });
}
function Activity() {
  const { message } = App.useApp();
  const [data, setData] = reactExports.useState({ items: [], total: 0 });
  const [loading, setLoading] = reactExports.useState(true);
  const [page, setPage] = reactExports.useState(1);
  const [type, setType] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [query, setQuery] = reactExports.useState("");
  const [range, setRange] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);
  reactExports.useEffect(() => {
    setLoading(true);
    getEvents({
      page,
      per_page: 25,
      type: type || "",
      search: query,
      from: range ? range[0].format("YYYY-MM-DD") : "",
      to: range ? range[1].format("YYYY-MM-DD") : ""
    }).then(setData).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  }, [page, type, query, range]);
  const TYPES = ["grant", "activate", "pending", "approve", "reject", "cancel", "expire", "hold", "revoke", "plan_change", "dates_changed", "payment_completed", "payment_refund", "payment_failed", "login_locked", "logout_all", "email_changed", "password_changed", "note"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-tools-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-mig-intro", style: { marginTop: 0 }, children: __("Every time access is granted, changed or removed, by whom, and why. Kept for the life of the membership.", "memberglut") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-log-filters", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { allowClear: true, prefix: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMagnifyingGlass }), placeholder: __("Search details…", "memberglut"), value: search, onChange: (e) => setSearch(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, placeholder: __("All events", "memberglut"), value: type, onChange: (v) => {
        setType(v);
        setPage(1);
      }, options: TYPES.map((t) => ({ value: t, label: t })), style: { width: 180 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker.RangePicker, { value: range, onChange: (v) => {
        setRange(v);
        setPage(1);
      } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ForwardTable,
      {
        rowKey: "id",
        size: "middle",
        loading,
        dataSource: data.items,
        pagination: { current: page, pageSize: 25, total: data.total, showSizeChanger: false, onChange: setPage },
        columns: [
          { title: __("Time", "memberglut"), dataIndex: "date", width: 190, render: dateTime },
          { title: __("Event", "memberglut"), dataIndex: "type", width: 150, render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: v }) },
          { title: __("Details", "memberglut"), dataIndex: "text" },
          { title: __("By", "memberglut"), dataIndex: "by", width: 140 }
        ]
      }
    )
  ] });
}
function Status() {
  const { message } = App.useApp();
  const [s, setS] = reactExports.useState(null);
  reactExports.useEffect(() => {
    getStatus().then(setS).catch((e) => message.error(e.message));
  }, []);
  if (!s) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card mg-tools-card", style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, {}) });
  const copy = () => {
    var _a;
    const lines = ["### MemberGlut system status", ...Object.entries(s.environment).map(([k, v]) => `${k}: ${v}`), "", "### Counts", ...Object.entries(s.counts).map(([k, v]) => `${k}: ${v}`), "", "### Checks", ...s.checks.map((c) => `${c.ok ? "[ok]" : "[!!]"} ${c.label}${c.note ? ` — ${c.note}` : ""}`)];
    (_a = navigator.clipboard) == null ? void 0 : _a.writeText(lines.join("\n")).then(() => message.success(__("Copied. Paste it in your support request.", "memberglut")));
  };
  const LABELS = { members: __("Active members", "memberglut"), plans: __("Plans", "memberglut"), rules: __("Rules", "memberglut"), payments: __("Payments", "memberglut"), roles: __("Roles", "memberglut") };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-tools-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCopy }), onClick: copy, children: __("Copy for support", "memberglut") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-status-grid", children: Object.entries(s.counts).map(([k, n]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-status-stat", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: Number(n).toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: LABELS[k] || k })
    ] }, k)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-tool-h", children: __("Health checks", "memberglut") }),
    s.checks.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-check", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: c.ok ? faCircleCheck : faTriangleExclamation, style: { color: c.ok ? "#10b981" : "#f59e0b" } }),
      c.label,
      c.note && /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: c.note })
    ] }, c.key)),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-tool-h", children: __("Environment", "memberglut") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "mg-env", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: Object.entries(s.environment).map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: k }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: v })
    ] }, k)) }) })
  ] });
}
function DangerModal({ task, onClose }) {
  const { message } = App.useApp();
  const [word, setWord] = reactExports.useState("");
  const [include, setInclude] = reactExports.useState([]);
  const [busy, setBusy] = reactExports.useState(false);
  const expected = task.key === "delete-all" ? "DELETE" : "RESET";
  const run = async () => {
    setBusy(true);
    try {
      const r = await runMaintenance(task.key, { confirm: word, include });
      message.success(r.message);
      onClose();
      if (task.key === "delete-all") setTimeout(() => window.location.reload(), 800);
    } catch (e) {
      message.error(e.message);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      open: true,
      onCancel: onClose,
      onOk: run,
      confirmLoading: busy,
      okText: task.title,
      okButtonProps: { danger: true, disabled: word !== expected },
      title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: task.title }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { type: "error", showIcon: true, message: task.desc, style: { marginBottom: 14 } }),
        task.key === "reset-settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox.Group, { value: include, onChange: setInclude, style: { marginBottom: 12 }, options: [
          { value: "forms", label: __("Also reset Forms & Pages", "memberglut") },
          { value: "emails", label: __("Also reset email texts", "memberglut") }
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: sprintf(__("Type %s to confirm.", "memberglut"), expected) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: word, onChange: (e) => setWord(e.target.value), placeholder: expected })
      ]
    }
  );
}
function Maintenance() {
  const { message } = App.useApp();
  const [busy, setBusy] = reactExports.useState("");
  const [danger, setDanger] = reactExports.useState(null);
  const tasks = [
    { key: "expirations", icon: faHourglassEnd, title: __("Run expirations now", "memberglut"), desc: __("Expire overdue subscriptions and update roles without waiting for the scheduler.", "memberglut") },
    { key: "recount", icon: faCalculator, title: __("Recount members", "memberglut"), desc: __("Rebuild the member counts and revenue totals shown on plans and the dashboard.", "memberglut") },
    { key: "sync-roles", icon: faRotate, title: __("Sync roles with plans", "memberglut"), desc: __("Give every active member their plan’s role again, and remove roles from expired members.", "memberglut") },
    { key: "clear-cache", icon: faBroom, title: __("Clear cached data", "memberglut"), desc: __("Delete MemberGlut transients (stats, access cache).", "memberglut") },
    { key: "reset-settings", icon: faEraser, title: __("Reset settings", "memberglut"), desc: __("Put Global Settings back to their defaults. Plans, members and payments are kept.", "memberglut"), danger: true },
    { key: "delete-all", icon: faTrashCan, title: __("Delete all MemberGlut data", "memberglut"), desc: __("Remove every plan, member subscription, payment, rule, log and setting. WordPress users stay. This cannot be undone.", "memberglut"), danger: true }
  ];
  const run = (t) => {
    if (t.danger) {
      setDanger(t);
      return;
    }
    setBusy(t.key);
    runMaintenance(t.key).then((r) => message.success(r.message)).catch((e) => message.error(e.message)).finally(() => setBusy(""));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-tools-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-task-grid", children: tasks.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mg-task ${t.danger ? "danger" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-task-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: t.icon, style: { marginRight: 8, color: t.danger ? "#dc2626" : "#e94560" } }),
        t.title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-task-d", children: t.desc }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { danger: t.danger, loading: busy === t.key, onClick: () => run(t), children: __("Run", "memberglut") })
    ] }, t.key)) }),
    danger && /* @__PURE__ */ jsxRuntimeExports.jsx(DangerModal, { task: danger, onClose: () => setDanger(null) })
  ] });
}
function Tools() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: __("Data & Logs", "memberglut"), subtitle: __("Import and export, logs, system status and maintenance.", "memberglut") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { className: "mg-page-tabs", defaultActiveKey: queryArg("tab") || "transfer", destroyInactiveTabPane: true, items: [
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
