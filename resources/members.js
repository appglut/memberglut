import { cU as jsxRuntimeExports, P as Page, b as App, d7 as reactExports, d5 as queryArg, a8 as __, cV as link, q as FontAwesomeIcon, bc as faEye, bY as faUserCheck, b9 as faEnvelope, bV as faTrashCan, a2 as StatusBadge, c as Button, b8 as faEllipsis, br as faLayerGroup, aW as faCalendarPlus, aO as faBan, E as PageHeader, bE as faPlus, a1 as StatCard, c6 as faUsers, a$ as faCircleCheck, bZ as faUserClock, bm as faHourglassEnd, aj as _n, c9 as faXmark, bu as faMagnifyingGlass, be as faFileExport, bz as faPaperPlane, aD as createRoot } from "./chunks/Page-uv7jJYOd.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { R as Radio, d as dayjs } from "./chunks/index-yo_nZXOO.js";
import { A as getMembers, S as Select, T as Tooltip } from "./chunks/api-BaJbRTwg.js";
import { S as SUB_STATUS, d as date, i as initials, G as GATEWAY, m as money } from "./chunks/format-d8T3zh3m.js";
import { b as PLANS } from "./chunks/demoData-D03BbErT.js";
import { A as Avatar } from "./chunks/index-D0f8XMqO.js";
import { P as Popconfirm } from "./chunks/index-3fEq35Ry.js";
import { D as Dropdown } from "./chunks/index-CcJNww40.js";
import { I as Input } from "./chunks/index-B1n7UfX_.js";
import { F as ForwardTable, C as Checkbox } from "./chunks/Table-DWPhuWqo.js";
import { F as Form } from "./chunks/index-B5V2cciq.js";
import { M as Modal } from "./chunks/index-DPqxb72Q.js";
import { D as DatePicker } from "./chunks/index-BFmP7jBX.js";
import "./chunks/lookups-DHSS-Myl.js";
import "./chunks/useBreakpoint-DzDOjlX5.js";
import "./chunks/index-BPzm35Wd.js";
import "./chunks/index-CIIETatw.js";
const planOptions = PLANS.map((p) => ({ value: p.id, label: p.name }));
function AddMemberModal({ open, onClose, onSaved }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [saving, setSaving] = reactExports.useState(false);
  const who = Form.useWatch("who", form);
  const expiry = Form.useWatch("expiry", form);
  const submit = async () => {
    const v = await form.validateFields();
    setSaving(true);
    await (void 0)(v);
    setSaving(false);
    message.success(__("Member added.", "memberglut"));
    form.resetFields();
    onSaved();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Add member", "memberglut") }),
      open,
      onCancel: onClose,
      onOk: submit,
      okText: __("Add member", "memberglut"),
      confirmLoading: saving,
      width: 620,
      destroyOnClose: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-modal-intro", children: __("Give a plan to someone without payment, for example a comp account or an offline sale.", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { form, layout: "vertical", requiredMark: false, initialValues: { who: "existing", status: "active", start: dayjs(), expiry: "plan", send_email: true }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "who", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio.Group, { optionType: "button", buttonStyle: "solid", options: [{ value: "existing", label: __("Existing user", "memberglut") }, { value: "new", label: __("New user", "memberglut") }] }) }),
          who === "new" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "first_name", label: __("First name", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "last_name", label: __("Last name", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "email", label: __("Email", "memberglut"), rules: [{ required: true, type: "email", message: __("Enter a valid email.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "username", label: __("Username", "memberglut"), tooltip: __("Empty uses the email address.", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {}) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "user_id", label: __("User", "memberglut"), rules: [{ required: true, message: __("Choose a user.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { showSearch: true, placeholder: __("Search by name, username or email…", "memberglut"), optionFilterProp: "label", options: [{ value: 1, label: "admin (admin@example.com)" }, { value: 2, label: "editor (editor@example.com)" }, { value: 3, label: "jane (jane@example.com)" }] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "plan_id", label: __("Plan", "memberglut"), rules: [{ required: true, message: __("Choose a plan.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: planOptions }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "status", label: __("Status", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: ["active", "trialing", "pending", "on_hold"].map((s) => ({ value: s, label: SUB_STATUS[s] })) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "start", label: __("Start date", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "expiry", label: __("Expires", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: [{ value: "plan", label: __("From the plan’s duration", "memberglut") }, { value: "never", label: __("Never", "memberglut") }, { value: "date", label: __("On a date…", "memberglut") }] }) }),
            expiry === "date" && /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "expiry_date", label: __("Expiry date", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" } }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "send_email", valuePropName: "checked", style: { marginBottom: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { children: who === "new" ? __("Email the login details and a set-password link", "memberglut") : __("Send the “Subscription activated” email", "memberglut") }) })
        ] })
      ]
    }
  );
}
function EmailMembersModal({ open, onClose, preselected }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const send = async () => {
    await form.validateFields();
    message.success(__("Email queued. It is sent in batches in the background.", "memberglut"));
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Email members", "memberglut") }), open, onCancel: onClose, onOk: send, okText: __("Send email", "memberglut"), okButtonProps: { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPaperPlane }) }, width: 640, destroyOnClose: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { form, layout: "vertical", requiredMark: false, initialValues: { plans: [], statuses: ["active", "trialing"] }, children: [
    preselected ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-note", style: { marginTop: 0, marginBottom: 16 }, children: sprintf(_n("Sending to %d selected member.", "Sending to %d selected members.", preselected, "memberglut"), preselected) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "plans", label: __("Plans", "memberglut"), tooltip: __("Empty sends to every plan.", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", options: planOptions, placeholder: __("All plans", "memberglut") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "statuses", label: __("Subscription status", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", options: Object.entries(SUB_STATUS).map(([value, label]) => ({ value, label })) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "subject", label: __("Subject", "memberglut"), rules: [{ required: true, message: __("Enter a subject.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "body", label: __("Message", "memberglut"), rules: [{ required: true, message: __("Write a message.", "memberglut") }], extra: __("Smart tags such as {first_name} and {plan_name} work here.", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input.TextArea, { rows: 7 }) })
  ] }) });
}
function Members() {
  const { message, modal } = App.useApp();
  const [rows, setRows] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [status, setStatus] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const [plan, setPlan] = reactExports.useState(null);
  const [gateway, setGateway] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState([]);
  const [addOpen, setAddOpen] = reactExports.useState(queryArg("add") === "1");
  const [mailOpen, setMailOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    getMembers().then(setRows).finally(() => setLoading(false));
  }, []);
  const counts = reactExports.useMemo(() => rows.reduce((c, r) => ({ ...c, [r.status]: (c[r.status] || 0) + 1 }), {}), [rows]);
  const filtered = rows.filter((r) => (!status || r.status === status) && (!plan || r.plan_id === plan) && (!gateway || r.gateway === gateway) && (!search || `${r.name} ${r.email} ${r.username}`.toLowerCase().includes(search.toLowerCase())));
  const bulk = (label) => {
    message.success(sprintf(__("%1$s: %2$d members updated.", "memberglut"), label, selected.length));
    setSelected([]);
  };
  const tabs = [["", __("All", "memberglut"), rows.length], ...Object.keys(SUB_STATUS).map((s) => [s, SUB_STATUS[s], counts[s] || 0])];
  const columns = [
    {
      title: __("Member", "memberglut"),
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-user-cell", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { style: { background: "#fff1f3", color: "#e94560", fontWeight: 600 }, children: initials(r.name) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link("member_detail", { id: r.id }), className: "mg-strong-link", children: r.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: r.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-row-actions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: link("member_detail", { id: r.id }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEye }),
              " ",
              __("View", "memberglut")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-action-sep", children: "|" }),
            r.status === "pending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { onClick: () => message.success(__("Member approved.", "memberglut")), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserCheck }),
              " ",
              __("Approve", "memberglut")
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${r.email}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEnvelope }),
              " ",
              __("Email", "memberglut")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-action-sep", children: "|" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Popconfirm, { title: __("Remove this membership?", "memberglut"), description: __("The WordPress user is kept.", "memberglut"), onConfirm: () => message.success(__("Membership removed.", "memberglut")), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "mg-action-delete", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }),
              " ",
              __("Remove", "memberglut")
            ] }) })
          ] })
        ] })
      ] })
    },
    { title: __("Plan", "memberglut"), dataIndex: "plan", render: (v, r) => {
      var _a;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-plan-pill", style: { "--c": (_a = PLANS.find((p) => p.id === r.plan_id)) == null ? void 0 : _a.color }, children: v });
    } },
    { title: __("Status", "memberglut"), dataIndex: "status", render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: v, label: SUB_STATUS[v] }) },
    { title: __("Payment", "memberglut"), dataIndex: "gateway", render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: GATEWAY[v] }) },
    { title: __("Started", "memberglut"), dataIndex: "started", sorter: (a, b) => a.started.localeCompare(b.started), render: date },
    { title: __("Expires", "memberglut"), dataIndex: "expires", sorter: (a, b) => String(a.expires).localeCompare(String(b.expires)), render: (v) => v ? date(v) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: __("Never", "memberglut") }) },
    { title: __("Spent", "memberglut"), dataIndex: "total_spent", align: "right", sorter: (a, b) => a.total_spent - b.total_spent, render: (v) => money(v) },
    {
      title: "",
      width: 48,
      render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Dropdown, { trigger: ["click"], menu: {
        items: [
          { key: "plan", label: __("Change plan", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLayerGroup }) },
          { key: "extend", label: __("Extend expiry", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalendarPlus }) },
          { key: "cancel", label: __("Cancel subscription", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBan }) },
          { type: "divider" },
          { key: "user", label: __("Edit WordPress user", "memberglut") }
        ],
        onClick: ({ key }) => message.info(sprintf(__("%s opens here.", "memberglut"), key))
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "text", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEllipsis }) }) })
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: __("Members", "memberglut"),
        subtitle: __("Everyone with a membership plan: status, dates and payments.", "memberglut"),
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEnvelope }), onClick: () => setMailOpen(true), children: __("Email members", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), onClick: () => setAddOpen(true), children: __("Add member", "memberglut") })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-stats-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUsers }), label: __("All members", "memberglut"), value: rows.length }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleCheck }), label: __("Active", "memberglut"), value: (counts.active || 0) + (counts.trialing || 0), hint: sprintf(__("%d on a free trial", "memberglut"), counts.trialing || 0), trend: "up" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserClock }), label: __("Waiting for approval", "memberglut"), value: counts.pending || 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHourglassEnd }), label: __("Expired or canceled", "memberglut"), value: (counts.expired || 0) + (counts.canceled || 0), trend: "down" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-filter-tabs", children: tabs.map(([key, label, n]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: `mg-filter-tab ${status === key ? "active" : ""}`, onClick: () => setStatus(key), children: [
      label,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-filter-count", children: n })
    ] }, key || "all")) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-table-wrap", children: [
      selected.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-bulk-bar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sprintf(_n("%d selected", "%d selected", selected.length, "memberglut"), selected.length) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserCheck }), onClick: () => bulk(__("Approve", "memberglut")), children: __("Approve", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLayerGroup }), onClick: () => bulk(__("Change plan", "memberglut")), children: __("Change plan", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalendarPlus }), onClick: () => bulk(__("Extend", "memberglut")), children: __("Extend", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEnvelope }), onClick: () => setMailOpen(true), children: __("Email", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBan }), onClick: () => bulk(__("Expire", "memberglut")), children: __("Expire now", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mg-bulk-btn", danger: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }), onClick: () => modal.confirm({ title: __("Remove these memberships?", "memberglut"), content: __("WordPress users are kept. Payments stay in the history.", "memberglut"), okButtonProps: { danger: true }, onOk: () => bulk(__("Remove", "memberglut")) }), children: __("Remove", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "text", className: "mg-bulk-clear", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faXmark }), onClick: () => setSelected([]), children: __("Clear", "memberglut") })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-table-toolbar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-table-toolbar-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { allowClear: true, prefix: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMagnifyingGlass }), placeholder: __("Search name, email or username…", "memberglut"), value: search, onChange: (e) => setSearch(e.target.value), style: { width: 300 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, placeholder: __("All plans", "memberglut"), value: plan, onChange: setPlan, options: planOptions, style: { width: 160 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, placeholder: __("All payment methods", "memberglut"), value: gateway, onChange: setGateway, options: Object.entries(GATEWAY).map(([value, label]) => ({ value, label })), style: { width: 200 } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-table-toolbar-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Export the filtered list to CSV", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileExport }), onClick: () => message.success(__("Export started.", "memberglut")), children: __("Export", "memberglut") }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ForwardTable,
        {
          rowKey: "id",
          loading,
          columns,
          dataSource: filtered,
          rowSelection: { selectedRowKeys: selected, onChange: setSelected },
          pagination: { pageSize: 10, showSizeChanger: true, showTotal: (t) => sprintf(__("%d members", "memberglut"), t) }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddMemberModal, { open: addOpen, onClose: () => setAddOpen(false), onSaved: () => setAddOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EmailMembersModal, { open: mailOpen, onClose: () => setMailOpen(false), preselected: selected.length })
  ] });
}
function MembersPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "members", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Members, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(MembersPage, {}));
