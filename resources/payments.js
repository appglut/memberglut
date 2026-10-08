import { a8 as __, cV as jsxRuntimeExports, P as Page, b as App, d8 as reactExports, d6 as queryArg, cW as link, a2 as StatusBadge, E as PageHeader, c as Button, q as FontAwesomeIcon, bf as faFileExport, bF as faPlus, a1 as StatCard, bM as faSackDollar, aT as faBuildingColumns, bX as faTriangleExclamation, bL as faRotateLeft, bv as faMagnifyingGlass, p as Drawer, aL as faArrowUpRightFromSquare, b0 as faCircleCheck, bA as faPaperPlane, aD as createRoot } from "./chunks/Page-C9tSda4_.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { U as UserSearch } from "./chunks/UserSearch-CYCDjZSt.js";
import { a6 as getPayments, H as exportPayments, S as Select, a5 as getPayment, h as Space, au as paymentAction, n as addPayment } from "./chunks/api-CeNclfze.js";
import { G as GATEWAY, d as date, P as PAY_STATUS, m as money, a as dateTime } from "./chunks/format-DjWmiSLr.js";
import { L, b as planOptions } from "./chunks/lookups-Cfp9TqGS.js";
import { I as Input } from "./chunks/index-vq8i8Snb.js";
import { D as DatePicker, T as TypedInputNumber } from "./chunks/index-BAtZnDy4.js";
import { F as ForwardTable } from "./chunks/Table-DI4ycSpx.js";
import { S as Spin } from "./chunks/index-BDXpcJpj.js";
import { D as Descriptions, T as Timeline } from "./chunks/Timeline-BZra2Fnc.js";
import { F as Form } from "./chunks/index-DsIT1xbC.js";
import { M as Modal } from "./chunks/index-BQkH4N-D.js";
import { S as Switch } from "./chunks/index-B-UY_eZJ.js";
import "./chunks/useBreakpoint-ChmeCqU6.js";
const TYPE = {
  new: __("New subscription", "memberglut"),
  renewal: __("Renewal", "memberglut"),
  upgrade: __("Upgrade", "memberglut"),
  change: __("Plan change", "memberglut"),
  manual: __("Manual", "memberglut")
};
const LOG_COLOR = { completed: "green", failed: "red", refund: "orange", refunded: "orange", created: "gray", receipt: "blue" };
const canManage = L.can ? L.can.manage_payments !== false : true;
function PaymentDrawer({ id, onClose, onChanged }) {
  const { message, modal } = App.useApp();
  const [p, setP] = reactExports.useState(null);
  const [busy, setBusy] = reactExports.useState("");
  reactExports.useEffect(() => {
    setP(null);
    if (id) getPayment(id).then(setP).catch((e) => {
      message.error(e.message);
      onClose();
    });
  }, [id]);
  const run = async (action, data, ok) => {
    setBusy(action);
    try {
      const res = await paymentAction(p.id, action, data);
      setP(res);
      onChanged();
      message.success(ok);
    } catch (e) {
      message.error(e.message);
    } finally {
      setBusy("");
    }
  };
  const refund = () => {
    let amount = null;
    const left = p.amount - p.refunded;
    modal.confirm({
      title: sprintf(__("Refund %s?", "memberglut"), money(left, p.currency)),
      content: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: __("The refund is sent through the gateway. If “A full refund ends access” is on, the member loses the plan.", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 0.01, max: left, step: 0.01, placeholder: __("Full amount", "memberglut"), style: { width: "100%" }, onChange: (v) => {
          amount = v;
        } })
      ] }),
      okText: __("Refund", "memberglut"),
      okButtonProps: { danger: true },
      onOk: () => run("refund", { amount }, __("Refund sent.", "memberglut"))
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Drawer,
    {
      open: !!id,
      onClose,
      width: 480,
      title: sprintf(__("Payment #%d", "memberglut"), id || 0),
      extra: p && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: p.status, label: PAY_STATUS[p.status] }),
      footer: p && canManage && /* @__PURE__ */ jsxRuntimeExports.jsxs(Space, { wrap: true, children: [
        p.status === "pending" && ["bank", "manual"].includes(p.gateway) && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", loading: busy === "mark-paid", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleCheck }), onClick: () => run("mark-paid", {}, __("Marked as paid. The subscription is active.", "memberglut")), children: __("Mark as paid", "memberglut") }),
        p.refundable && p.refunded < p.amount && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { danger: true, loading: busy === "refund", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRotateLeft }), onClick: refund, children: __("Refund", "memberglut") }),
        p.email && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading: busy === "resend-receipt", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPaperPlane }), onClick: () => run("resend-receipt", {}, __("Receipt sent.", "memberglut")), children: __("Resend receipt", "memberglut") })
      ] }),
      children: !p ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", padding: 40 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-pay-amount", children: [
          money(p.amount, p.currency),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.currency })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Descriptions, { column: 1, size: "small", className: "mg-desc", items: [
          { label: __("Member", "memberglut"), children: p.member_id ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link("member_detail", { id: p.member_id }), children: p.name }) : p.name },
          { label: __("Email", "memberglut"), children: p.email || "—" },
          { label: __("Plan", "memberglut"), children: p.plan || "—" },
          { label: __("Type", "memberglut"), children: TYPE[p.type] || p.type },
          { label: __("Method", "memberglut"), children: GATEWAY[p.gateway] || p.gateway },
          { label: __("Transaction ID", "memberglut"), children: p.transaction_id ? p.transaction_url ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "mg-url", href: p.transaction_url, target: "_blank", rel: "noreferrer", children: [
            p.transaction_id,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowUpRightFromSquare })
          ] }) : p.transaction_id : "—" },
          ...p.subtotal !== p.amount ? [{ label: __("Subtotal", "memberglut"), children: money(p.subtotal, p.currency) }] : [],
          ...p.signup_fee ? [{ label: __("Sign-up fee", "memberglut"), children: money(p.signup_fee, p.currency) }] : [],
          { label: __("Coupon", "memberglut"), children: p.coupon ? `${p.coupon} (−${money(p.discount, p.currency)})` : "—" },
          ...p.refunded ? [{ label: __("Refunded", "memberglut"), children: money(p.refunded, p.currency) }] : [],
          { label: __("Date", "memberglut"), children: dateTime(p.date) },
          ...p.note ? [{ label: __("Note", "memberglut"), children: p.note }] : []
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-subhead", style: { marginTop: 22 }, children: __("Log", "memberglut") }),
        p.log && p.log.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { items: p.log.map((e) => ({ color: LOG_COLOR[e.type] || "blue", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          e.text,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: dateTime(e.date) })
        ] }) })) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-muted", children: __("Nothing logged yet.", "memberglut") })
      ] })
    }
  );
}
function ManualPaymentModal({ open, onClose, onSaved }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [saving, setSaving] = reactExports.useState(false);
  const status = Form.useWatch("status", form);
  const submit = async () => {
    const v = await form.validateFields();
    setSaving(true);
    try {
      await addPayment({ ...v, date: v.date ? v.date.format("YYYY-MM-DD HH:mm:ss") : "" });
      message.success(__("Payment recorded.", "memberglut"));
      form.resetFields();
      onSaved();
    } catch (e) {
      form.setFields(Object.entries(e.fields || {}).map(([name, err]) => ({ name, errors: [err] })));
      message.error(e.message);
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Add manual payment", "memberglut") }),
      open,
      onCancel: onClose,
      okText: __("Add payment", "memberglut"),
      confirmLoading: saving,
      onOk: submit,
      destroyOnClose: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-modal-intro", children: __("Record a payment taken outside the site (cash, invoice, another shop).", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Form,
          {
            form,
            layout: "vertical",
            requiredMark: false,
            initialValues: { status: "completed", activate: true },
            onValuesChange: (c) => {
              if (c.plan) {
                const pl = L.plans.find((x) => x.id === c.plan);
                if (pl && form.getFieldValue("amount") == null) form.setFieldValue("amount", pl.price || 0);
              }
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "member", label: __("Member", "memberglut"), rules: [{ required: true, message: __("Choose a member.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserSearch, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "plan", label: __("Plan", "memberglut"), rules: [{ required: true, message: __("Choose a plan.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: planOptions() }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "amount", label: __("Amount", "memberglut"), rules: [{ required: true, message: __("Enter the amount.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 0, step: 0.01, addonBefore: L.currency.symbol, style: { width: "100%" } }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "status", label: __("Status", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: Object.entries(PAY_STATUS).map(([value, label]) => ({ value, label })) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "date", label: __("Date", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { showTime: true, style: { width: "100%" } }) })
              ] }),
              status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "activate", valuePropName: "checked", label: __("Give the member this plan", "memberglut"), extra: __("Starts the subscription, or renews it if the member already has this plan.", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "note", label: __("Note", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input.TextArea, { rows: 2 }) })
            ]
          }
        )
      ]
    }
  );
}
function Payments() {
  const { message } = App.useApp();
  const [rows, setRows] = reactExports.useState([]);
  const [total, setTotal] = reactExports.useState(0);
  const [summary, setSummary] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [status, setStatus] = reactExports.useState(queryArg("status") || "");
  const [gateway, setGateway] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [query, setQuery] = reactExports.useState("");
  const [range, setRange] = reactExports.useState(null);
  const [page, setPage] = reactExports.useState(1);
  const [pageSize, setPageSize] = reactExports.useState(20);
  const [sort, setSort] = reactExports.useState({ field: "date", order: "desc" });
  const [open, setOpen] = reactExports.useState(queryArg("id") ? Number(queryArg("id")) : null);
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const user = queryArg("user") || "";
  const filters = {
    status,
    gateway: gateway || "",
    search: query,
    user,
    from: range ? range[0].format("YYYY-MM-DD") : "",
    to: range ? range[1].format("YYYY-MM-DD") : ""
  };
  const load = reactExports.useCallback(() => {
    setLoading(true);
    getPayments({ ...filters, page, per_page: pageSize, orderby: sort.field, order: sort.order }).then((r) => {
      setRows(r.items);
      setTotal(r.total);
      setSummary(r.summary);
    }).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  }, [JSON.stringify(filters), page, pageSize, sort.field, sort.order]);
  reactExports.useEffect(load, [load]);
  reactExports.useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);
  const s = summary || { completed: { count: 0, total: 0 }, pending: { count: 0, total: 0 }, failed: { count: 0, total: 0 }, refunded: { count: 0, total: 0 } };
  const allCount = ["completed", "pending", "failed", "refunded"].reduce((n, k) => n + s[k].count, 0);
  const columns = [
    { title: "#", dataIndex: "id", key: "id", width: 80, sorter: true, render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { onClick: () => setOpen(v), className: "mg-strong-link", children: [
      "#",
      v
    ] }) },
    { title: __("Member", "memberglut"), dataIndex: "name", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      r.member_id ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link("member_detail", { id: r.member_id }), children: v }) : v,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: r.email })
    ] }) },
    { title: __("Plan", "memberglut"), dataIndex: "plan", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      v || "—",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-muted", children: [
        TYPE[r.type] || r.type,
        r.coupon && ` · ${r.coupon}`
      ] })
    ] }) },
    { title: __("Method", "memberglut"), dataIndex: "gateway", render: (v) => GATEWAY[v] || v },
    { title: __("Status", "memberglut"), dataIndex: "status", render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: v, label: PAY_STATUS[v] || v }) },
    { title: __("Date", "memberglut"), dataIndex: "date", key: "date", sorter: true, defaultSortOrder: "descend", render: date },
    { title: __("Amount", "memberglut"), dataIndex: "amount", key: "amount", align: "right", sorter: true, render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: r.status === "refunded" ? "mg-strike" : "", children: money(v, r.currency) }) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: __("Payments", "memberglut"),
        subtitle: __("Every payment from every gateway, with refunds and bank transfers to confirm.", "memberglut"),
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileExport }), onClick: () => exportPayments(filters).catch((e) => message.error(e.message)), children: __("Export CSV", "memberglut") }),
          canManage && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), onClick: () => setAddOpen(true), children: __("Add manual payment", "memberglut") })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-stats-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSackDollar }), label: __("Completed", "memberglut"), value: money(s.completed.total), hint: sprintf(__("%d payments", "memberglut"), s.completed.count), trend: "up" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBuildingColumns }), label: __("Waiting for payment", "memberglut"), value: money(s.pending.total), hint: sprintf(__("%d to confirm", "memberglut"), s.pending.count) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTriangleExclamation }), label: __("Failed", "memberglut"), value: s.failed.count, hint: __("Retries run automatically", "memberglut"), trend: "down" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRotateLeft }), label: __("Refunded", "memberglut"), value: money(s.refunded.total), trend: "down" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-filter-tabs", children: [["", __("All", "memberglut"), allCount], ...Object.entries(PAY_STATUS).map(([k, l]) => [k, l, s[k] ? s[k].count : 0])].map(([k, l, n]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: `mg-filter-tab ${status === k ? "active" : ""}`, onClick: () => {
      setStatus(k);
      setPage(1);
    }, children: [
      l,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-filter-count", children: n })
    ] }, k || "all")) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-table-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-table-toolbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-table-toolbar-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { allowClear: true, prefix: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMagnifyingGlass }), placeholder: __("Search ID, member, email or transaction…", "memberglut"), value: search, onChange: (e) => setSearch(e.target.value), style: { width: 320 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, placeholder: __("All methods", "memberglut"), value: gateway, onChange: (v) => {
          setGateway(v);
          setPage(1);
        }, options: Object.keys(GATEWAY).map((g) => ({ value: g, label: GATEWAY[g] })), style: { width: 170 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker.RangePicker, { value: range, onChange: (v) => {
          setRange(v);
          setPage(1);
        } })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ForwardTable,
        {
          rowKey: "id",
          loading,
          columns,
          dataSource: rows,
          onRow: (r) => ({ onDoubleClick: () => setOpen(r.id) }),
          onChange: (pg, f, sorter) => {
            setPage(pg.current);
            setPageSize(pg.pageSize);
            setSort({ field: sorter.columnKey || "date", order: sorter.order === "ascend" ? "asc" : "desc" });
          },
          pagination: { current: page, pageSize, total, showSizeChanger: true, showTotal: (t) => sprintf(__("%d payments", "memberglut"), t) },
          summary: (data) => /* @__PURE__ */ jsxRuntimeExports.jsxs(ForwardTable.Summary.Row, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable.Summary.Cell, { index: 0, colSpan: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: __("Total on this page (completed)", "memberglut") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable.Summary.Cell, { index: 1, align: "right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: money(data.filter((r) => r.status === "completed").reduce((n, r) => n + r.amount, 0)) }) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentDrawer, { id: open, onClose: () => setOpen(null), onChanged: load }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ManualPaymentModal, { open: addOpen, onClose: () => setAddOpen(false), onSaved: () => {
      setAddOpen(false);
      load();
    } })
  ] });
}
function PaymentsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "payments", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Payments, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(PaymentsPage, {}));
