import { cV as jsxRuntimeExports, P as Page, b as App, d8 as reactExports, d6 as queryArg, a8 as __, cW as link, a2 as StatusBadge, c as Button, q as FontAwesomeIcon, b9 as faEllipsis, bs as faLayerGroup, aX as faCalendarPlus, aO as faBan, E as PageHeader, ba as faEnvelope, bF as faPlus, a1 as StatCard, c7 as faUsers, b0 as faCircleCheck, b_ as faUserClock, bn as faHourglassEnd, aj as _n, bZ as faUserCheck, bW as faTrashCan, ca as faXmark, bv as faMagnifyingGlass, bf as faFileExport, bd as faEye, c6 as faUserXmark, bA as faPaperPlane, aD as createRoot } from "./chunks/Page-BUA-PWqe.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { d as dayjs } from "./chunks/dayjs.min-Bm93or1s.js";
import { A as Avatar, C as ChangePlanModal, a as ExtendModal } from "./chunks/MemberModals-Brf3Xb3R.js";
import { a0 as getMembers, S as Select, T as Tooltip, o as bulkMembers, z as exportMembers, R as Radio, l as addMember, n as broadcast, aD as searchUsers } from "./chunks/api-BM7DBw7H.js";
import { S as SUB_STATUS, d as date, i as initials, G as GATEWAY, m as money } from "./chunks/format-DaGJt-sA.js";
import { b as planOptions } from "./chunks/lookups-DOjv_COY.js";
import { D as Dropdown, F as ForwardTable, C as Checkbox } from "./chunks/Table-D-hy_ITf.js";
import { I as Input } from "./chunks/index-C2zsmztB.js";
import { P as Popconfirm } from "./chunks/index-Bkp9TiIj.js";
import { F as Form } from "./chunks/index-BVdNfLbm.js";
import { M as Modal } from "./chunks/index-C5EZBHzb.js";
import { D as DatePicker } from "./chunks/index-BeGMKRU0.js";
import { S as Spin } from "./chunks/index-B04I5vrr.js";
import "./chunks/useBreakpoint-CSmdvqeW.js";
import "./chunks/index-sggwWRB7.js";
import "./chunks/index-B-TTpDsc.js";
function UserSearch({ value, onChange }) {
  const [options, setOptions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const timer = reactExports.useRef();
  const search = (q) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLoading(true);
      searchUsers(q).then(setOptions).finally(() => setLoading(false));
    }, 250);
  };
  reactExports.useEffect(() => {
    search("");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Select,
    {
      showSearch: true,
      value,
      onChange,
      filterOption: false,
      onSearch: search,
      options,
      notFoundContent: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, { size: "small" }) : null,
      placeholder: __("Search by name, username or email…", "memberglut")
    }
  );
}
function AddMemberModal({ open, onClose, onSaved }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [saving, setSaving] = reactExports.useState(false);
  const who = Form.useWatch("who", form);
  const expiry = Form.useWatch("expiry", form);
  const submit = async () => {
    const v = await form.validateFields();
    setSaving(true);
    try {
      await addMember({
        ...v,
        start: v.start ? v.start.format("YYYY-MM-DD") : "",
        expiry_date: v.expiry_date ? v.expiry_date.format("YYYY-MM-DD") : ""
      });
      message.success(__("Member added.", "memberglut"));
      form.resetFields();
      onSaved();
    } catch (e) {
      form.setFields(Object.entries(e.fields || {}).map(([name, msg]) => ({ name, errors: [msg] })));
      message.error(e.message);
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Add member", "memberglut") }), open, onCancel: onClose, onOk: submit, okText: __("Add member", "memberglut"), confirmLoading: saving, width: 620, destroyOnClose: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-modal-intro", children: __("Give a plan to someone without payment, for example a comp account or an offline sale.", "memberglut") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { form, layout: "vertical", requiredMark: false, initialValues: { who: "existing", status: "active", start: dayjs(), expiry: "plan", send_email: true }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "who", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio.Group, { optionType: "button", buttonStyle: "solid", options: [{ value: "existing", label: __("Existing user", "memberglut") }, { value: "new", label: __("New user", "memberglut") }] }) }),
      who === "new" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "first_name", label: __("First name", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "last_name", label: __("Last name", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "email", label: __("Email", "memberglut"), rules: [{ required: true, type: "email", message: __("Enter a valid email.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "username", label: __("Username", "memberglut"), tooltip: __("Empty creates one from the email address.", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {}) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "user_id", label: __("User", "memberglut"), rules: [{ required: true, message: __("Choose a user.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserSearch, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "plan_id", label: __("Plan", "memberglut"), rules: [{ required: true, message: __("Choose a plan.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: planOptions() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "status", label: __("Status", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: ["active", "trialing", "pending", "on_hold"].map((s) => ({ value: s, label: SUB_STATUS[s] })) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "start", label: __("Start date", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "expiry", label: __("Expires", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: [{ value: "plan", label: __("From the plan’s duration", "memberglut") }, { value: "never", label: __("Never", "memberglut") }, { value: "date", label: __("On a date…", "memberglut") }] }) }),
        expiry === "date" && /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "expiry_date", label: __("Expiry date", "memberglut"), rules: [{ required: true, message: __("Choose a date.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" } }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "send_email", valuePropName: "checked", style: { marginBottom: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { children: who === "new" ? __("Email the login details and a set-password link", "memberglut") : __("Send the “Subscription activated” email", "memberglut") }) })
    ] })
  ] });
}
function EmailMembersModal({ open, onClose, selected }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [sending, setSending] = reactExports.useState(false);
  const send = async () => {
    const v = await form.validateFields();
    setSending(true);
    try {
      const r = await broadcast(selected.length ? { ...v, ids: selected } : v);
      message.success(sprintf(_n("Email queued for %d member. It is sent in the background.", "Email queued for %d members. It is sent in batches in the background.", r.recipients, "memberglut"), r.recipients));
      form.resetFields();
      onClose();
    } catch (e) {
      message.error(e.message);
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Email members", "memberglut") }), open, onCancel: onClose, onOk: send, confirmLoading: sending, okText: __("Send email", "memberglut"), okButtonProps: { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPaperPlane }) }, width: 640, destroyOnClose: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { form, layout: "vertical", requiredMark: false, initialValues: { plans: [], statuses: ["active", "trialing"] }, children: [
    selected.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-note", style: { marginTop: 0, marginBottom: 16 }, children: sprintf(_n("Sending to %d selected member.", "Sending to %d selected members.", selected.length, "memberglut"), selected.length) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "plans", label: __("Plans", "memberglut"), tooltip: __("Empty sends to every plan.", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", options: planOptions(), placeholder: __("All plans", "memberglut") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "statuses", label: __("Subscription status", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", options: Object.entries(SUB_STATUS).map(([value, label]) => ({ value, label })) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "subject", label: __("Subject", "memberglut"), rules: [{ required: true, message: __("Enter a subject.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "body", label: __("Message", "memberglut"), rules: [{ required: true, message: __("Write a message.", "memberglut") }], extra: __("Smart tags such as {first_name} and {plan_name} work here. Uses your email template and sender.", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input.TextArea, { rows: 7 }) })
  ] }) });
}
function Members() {
  const { message, modal } = App.useApp();
  const [rows, setRows] = reactExports.useState([]);
  const [total, setTotal] = reactExports.useState(0);
  const [counts, setCounts] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(true);
  const [status, setStatus] = reactExports.useState(queryArg("status") || "");
  const [search, setSearch] = reactExports.useState("");
  const [plan, setPlan] = reactExports.useState(Number(queryArg("plan")) || null);
  const [gateway, setGateway] = reactExports.useState(null);
  const [page, setPage] = reactExports.useState(1);
  const [pageSize, setPageSize] = reactExports.useState(10);
  const [sort, setSort] = reactExports.useState({});
  const [selected, setSelected] = reactExports.useState([]);
  const [addOpen, setAddOpen] = reactExports.useState(queryArg("add") === "1");
  const [mailOpen, setMailOpen] = reactExports.useState(false);
  const [planModal, setPlanModal] = reactExports.useState(null);
  const [extendModal, setExtendModal] = reactExports.useState(null);
  const filters = { status, search, plan, gateway };
  const load = reactExports.useCallback(() => {
    setLoading(true);
    getMembers({ ...filters, page, per_page: pageSize, orderby: sort.field, order: sort.order }).then((r) => {
      setRows(r.items);
      setTotal(r.total);
      setCounts(r.counts || {});
    }).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  }, [status, search, plan, gateway, page, pageSize, sort.field, sort.order]);
  reactExports.useEffect(() => {
    const t = setTimeout(load, search ? 300 : 0);
    return () => clearTimeout(t);
  }, [load]);
  const afterAction = (r, label) => {
    if (r && r.queued) message.success(sprintf(__("%d members are being updated in the background.", "memberglut"), r.queued));
    else if (r && typeof r.done === "number") message.success(sprintf(__("%1$s: %2$d updated%3$s.", "memberglut"), label, r.done, r.failed ? sprintf(__(", %d failed", "memberglut"), r.failed) : ""));
    else message.success(label);
    setSelected([]);
    load();
  };
  const bulk = async (action, ids, args, label) => {
    try {
      afterAction(await bulkMembers(action, ids, args), label);
    } catch (e) {
      message.error(e.message);
    }
  };
  const exportCsv = async () => {
    try {
      await exportMembers({ status, search, plan, gateway });
    } catch (e) {
      message.error(e.message);
    }
  };
  const tabs = [["", __("All", "memberglut"), counts.all || 0], ...Object.keys(SUB_STATUS).map((s) => [s, SUB_STATUS[s], counts[s] || 0])];
  const rowActions = (r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-row-actions", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: link("member_detail", { user: r.user_id }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEye }),
      " ",
      __("View", "memberglut")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-action-sep", children: "|" }),
    !r.approved ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { onClick: () => bulk("approve", [r.id], {}, __("Approved", "memberglut")), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserCheck }),
      " ",
      __("Approve", "memberglut")
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${r.email}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEnvelope }),
      " ",
      __("Email", "memberglut")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-action-sep", children: "|" }),
    r.account_only ? /* @__PURE__ */ jsxRuntimeExports.jsx(Popconfirm, { title: __("Reject this registration?", "memberglut"), description: __("The account cannot log in. The “Account rejected” email is sent if it is on.", "memberglut"), okButtonProps: { danger: true }, onConfirm: () => bulk("reject", [r.id], {}, __("Rejected", "memberglut")), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "mg-action-delete", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserXmark }),
      " ",
      __("Reject", "memberglut")
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Popconfirm, { title: __("Remove this membership?", "memberglut"), description: __("The WordPress user and payments are kept.", "memberglut"), okButtonProps: { danger: true }, onConfirm: () => bulk("remove", [r.id], {}, __("Membership removed", "memberglut")), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "mg-action-delete", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }),
      " ",
      __("Remove", "memberglut")
    ] }) })
  ] });
  const columns = [
    {
      title: __("Member", "memberglut"),
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-user-cell", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { style: { background: "#fff1f3", color: "#e94560", fontWeight: 600 }, children: initials(r.name) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link("member_detail", { user: r.user_id }), className: "mg-strong-link", children: r.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: r.email }),
          rowActions(r)
        ] })
      ] })
    },
    { title: __("Plan", "memberglut"), dataIndex: "plan", key: "plan", render: (v, r) => r.account_only ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: __("No plan yet", "memberglut") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-plan-pill", style: { "--c": r.plan_color }, children: v }) },
    {
      title: __("Status", "memberglut"),
      dataIndex: "status",
      key: "status",
      render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: v, label: SUB_STATUS[v] }),
        r.account_status === "pending_email" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: __("Email not confirmed", "memberglut") }),
        r.account_status === "pending_admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: __("Needs approval", "memberglut") })
      ] })
    },
    { title: __("Payment", "memberglut"), dataIndex: "gateway", key: "gateway", render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: GATEWAY[v] || v }) },
    { title: __("Started", "memberglut"), dataIndex: "started", key: "started", sorter: true, render: date },
    { title: __("Expires", "memberglut"), dataIndex: "expires", key: "expires", sorter: true, render: (v, r) => r.account_only ? "—" : v ? date(v) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: __("Never", "memberglut") }) },
    { title: __("Spent", "memberglut"), dataIndex: "total_spent", key: "spent", align: "right", sorter: true, render: (v) => money(v) },
    {
      title: "",
      width: 48,
      render: (v, r) => r.account_only ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(Dropdown, { trigger: ["click"], menu: {
        items: [
          { key: "plan", label: __("Change plan", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLayerGroup }) },
          { key: "extend", label: __("Extend expiry", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalendarPlus }) },
          { key: "cancel", label: __("Cancel subscription", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBan }), disabled: ["canceled", "expired"].includes(r.status) },
          { type: "divider" },
          { key: "user", label: __("Edit WordPress user", "memberglut") }
        ],
        onClick: ({ key }) => {
          if (key === "plan") setPlanModal({ ids: [r.id], gatewayManaged: r.gateway_managed });
          else if (key === "extend") setExtendModal({ ids: [r.id] });
          else if (key === "cancel") {
            modal.confirm({
              title: __("Cancel this subscription?", "memberglut"),
              content: __("Automatic renewal stops. Depending on Global Settings › Member account, access ends now or at the end of the period.", "memberglut"),
              okText: __("Cancel subscription", "memberglut"),
              okButtonProps: { danger: true },
              cancelText: __("Keep", "memberglut"),
              onOk: () => bulk("cancel", [r.id], {}, __("Subscription canceled", "memberglut"))
            });
          } else window.location.href = `user-edit.php?user_id=${r.user_id}`;
        }
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEnvelope }), onClick: () => {
            setSelected([]);
            setMailOpen(true);
          }, children: __("Email members", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), onClick: () => setAddOpen(true), children: __("Add member", "memberglut") })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-stats-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUsers }), label: __("All members", "memberglut"), value: counts.all || 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleCheck }), label: __("Active", "memberglut"), value: (counts.active || 0) + (counts.trialing || 0), hint: sprintf(__("%d on a free trial", "memberglut"), counts.trialing || 0), trend: "up" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserClock }), label: __("Pending", "memberglut"), value: counts.pending || 0, hint: __("Waiting for approval or payment", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faHourglassEnd }), label: __("Expired or canceled", "memberglut"), value: (counts.expired || 0) + (counts.canceled || 0), trend: "down" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-filter-tabs", children: tabs.map(([key, label, n]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: `mg-filter-tab ${status === key ? "active" : ""}`, onClick: () => {
      setStatus(key);
      setPage(1);
    }, children: [
      label,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-filter-count", children: n })
    ] }, key || "all")) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-table-wrap", children: [
      selected.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-bulk-bar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sprintf(_n("%d selected", "%d selected", selected.length, "memberglut"), selected.length) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserCheck }), onClick: () => bulk("approve", selected, {}, __("Approve", "memberglut")), children: __("Approve", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLayerGroup }), onClick: () => setPlanModal({ ids: selected.filter((id) => id > 0) }), children: __("Change plan", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalendarPlus }), onClick: () => setExtendModal({ ids: selected.filter((id) => id > 0) }), children: __("Extend", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEnvelope }), onClick: () => setMailOpen(true), children: __("Email", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mg-bulk-btn", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBan }), onClick: () => modal.confirm({ title: __("Expire these memberships now?", "memberglut"), content: __("Access ends immediately and gateway subscriptions are stopped.", "memberglut"), okButtonProps: { danger: true }, onOk: () => bulk("expire", selected.filter((id) => id > 0), {}, __("Expired", "memberglut")) }), children: __("Expire now", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mg-bulk-btn", danger: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }), onClick: () => modal.confirm({ title: __("Remove these memberships?", "memberglut"), content: __("WordPress users are kept. Payments stay in the history.", "memberglut"), okButtonProps: { danger: true }, onOk: () => bulk("remove", selected.filter((id) => id > 0), {}, __("Removed", "memberglut")) }), children: __("Remove", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "text", className: "mg-bulk-clear", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faXmark }), onClick: () => setSelected([]), children: __("Clear", "memberglut") })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-table-toolbar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-table-toolbar-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { allowClear: true, prefix: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMagnifyingGlass }), placeholder: __("Search name, email or username…", "memberglut"), value: search, onChange: (e) => {
            setSearch(e.target.value);
            setPage(1);
          }, style: { width: 300 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, placeholder: __("All plans", "memberglut"), value: plan, onChange: (v) => {
            setPlan(v || null);
            setPage(1);
          }, options: planOptions(), style: { width: 170 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, placeholder: __("All payment methods", "memberglut"), value: gateway, onChange: (v) => {
            setGateway(v || null);
            setPage(1);
          }, options: Object.entries(GATEWAY).map(([value, label]) => ({ value, label })), style: { width: 200 } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-table-toolbar-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Export the filtered list to CSV", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileExport }), onClick: exportCsv, children: __("Export", "memberglut") }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ForwardTable,
        {
          rowKey: "id",
          loading,
          columns,
          dataSource: rows,
          rowSelection: { selectedRowKeys: selected, onChange: setSelected, preserveSelectedRowKeys: true },
          onChange: (p, f, s) => {
            setPage(p.current);
            setPageSize(p.pageSize);
            setSort(s && s.order ? { field: s.columnKey, order: s.order === "ascend" ? "asc" : "desc" } : {});
          },
          pagination: { current: page, pageSize, total, showSizeChanger: true, showTotal: (t) => sprintf(__("%d members", "memberglut"), t) }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddMemberModal, { open: addOpen, onClose: () => setAddOpen(false), onSaved: () => {
      setAddOpen(false);
      load();
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EmailMembersModal, { open: mailOpen, onClose: () => setMailOpen(false), selected }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChangePlanModal,
      {
        open: !!planModal,
        count: planModal ? planModal.ids.length : 1,
        gatewayManaged: planModal && planModal.gatewayManaged,
        onCancel: () => setPlanModal(null),
        onOk: async (planId) => {
          await bulk("change_plan", planModal.ids, { plan_id: planId }, __("Plan changed", "memberglut"));
          setPlanModal(null);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExtendModal,
      {
        open: !!extendModal,
        count: extendModal ? extendModal.ids.length : 1,
        onCancel: () => setExtendModal(null),
        onOk: async (args) => {
          await bulk("extend", extendModal.ids, args, __("Extended", "memberglut"));
          setExtendModal(null);
        }
      }
    )
  ] });
}
function MembersPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "members", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Members, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(MembersPage, {}));
