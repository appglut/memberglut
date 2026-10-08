import { cU as jsxRuntimeExports, P as Page, b as App, d7 as reactExports, cV as link, a8 as __, a2 as StatusBadge, E as PageHeader, c as Button, q as FontAwesomeIcon, be as faFileExport, bE as faPlus, a1 as StatCard, bL as faSackDollar, aS as faBuildingColumns, bW as faTriangleExclamation, bK as faRotateLeft, bu as faMagnifyingGlass, p as Drawer, aL as faArrowUpRightFromSquare, a$ as faCircleCheck, bz as faPaperPlane, aD as createRoot } from "./chunks/Page-uv7jJYOd.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { Q as getPayments, S as Select, h as Space } from "./chunks/api-fY3e1Vcq.js";
import { G as GATEWAY, d as date, P as PAY_STATUS, m as money, a as dateTime } from "./chunks/format-HbjcUD4E.js";
import { M as MEMBERS, b as PLANS } from "./chunks/demoData-BM0HoCev.js";
import { F as Form } from "./chunks/index-D28DLv47.js";
import { I as Input } from "./chunks/index-B1n7UfX_.js";
import { D as DatePicker } from "./chunks/index-CQ9IQMWb.js";
import { F as ForwardTable } from "./chunks/Table-2b7eYoRI.js";
import { M as Modal } from "./chunks/index-X7sZdAeO.js";
import { T as TypedInputNumber } from "./chunks/index-CeqreKgZ.js";
import { D as Descriptions, T as Timeline } from "./chunks/Timeline-BA7_DK87.js";
import "./chunks/dayjs.min-Cgo1VKL0.js";
import "./chunks/lookups-DHSS-Myl.js";
import "./chunks/useBreakpoint-I0WrFief.js";
import "./chunks/index-CIIETatw.js";
function PaymentDrawer({ p, onClose }) {
  const { message, modal } = App.useApp();
  if (!p) return null;
  const refund = () => modal.confirm({
    title: sprintf(__("Refund %s?", "memberglut"), money(p.amount)),
    content: __("The refund is sent through the gateway. If “A full refund ends access” is on, the member loses the plan.", "memberglut"),
    okText: __("Refund", "memberglut"),
    okButtonProps: { danger: true },
    onOk: () => message.success(__("Refund sent.", "memberglut"))
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Drawer,
    {
      open: !!p,
      onClose,
      width: 480,
      title: sprintf(__("Payment #%d", "memberglut"), p.id),
      extra: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: p.status, label: PAY_STATUS[p.status] }),
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(Space, { wrap: true, children: [
        p.status === "pending" && p.gateway === "bank" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleCheck }), onClick: () => message.success(__("Marked as paid. The subscription is active.", "memberglut")), children: __("Mark as paid", "memberglut") }),
        p.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { danger: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRotateLeft }), onClick: refund, children: __("Refund", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPaperPlane }), onClick: () => message.success(__("Receipt sent.", "memberglut")), children: __("Resend receipt", "memberglut") })
      ] }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-pay-amount", children: [
          money(p.amount),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.currency })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Descriptions, { column: 1, size: "small", className: "mg-desc", items: [
          { label: __("Member", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link("member_detail", { id: p.member_id }), children: p.name }) },
          { label: __("Email", "memberglut"), children: p.email },
          { label: __("Plan", "memberglut"), children: p.plan },
          { label: __("Type", "memberglut"), children: p.type === "renewal" ? __("Renewal", "memberglut") : __("New subscription", "memberglut") },
          { label: __("Method", "memberglut"), children: GATEWAY[p.gateway] },
          { label: __("Transaction ID", "memberglut"), children: p.transaction_id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mg-url", children: [
            p.transaction_id,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowUpRightFromSquare })
          ] }) : "—" },
          { label: __("Coupon", "memberglut"), children: p.coupon || "—" },
          { label: __("Date", "memberglut"), children: dateTime(p.date) }
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-subhead", style: { marginTop: 22 }, children: __("Log", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { items: [
          { color: "gray", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            __("Checkout started", "memberglut"),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: dateTime(p.date) })
          ] }) },
          { color: p.status === "failed" ? "red" : "green", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            p.status === "failed" ? __("Card declined (insufficient funds)", "memberglut") : __("Gateway confirmed the payment", "memberglut"),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: dateTime(p.date) })
          ] }) },
          { color: "blue", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            __("Receipt email sent", "memberglut"),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: dateTime(p.date) })
          ] }) }
        ] })
      ]
    }
  );
}
function Payments() {
  const { message } = App.useApp();
  const [rows, setRows] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [status, setStatus] = reactExports.useState("");
  const [gateway, setGateway] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [range, setRange] = reactExports.useState(null);
  const [open, setOpen] = reactExports.useState(null);
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [form] = Form.useForm();
  reactExports.useEffect(() => {
    getPayments().then(setRows).finally(() => setLoading(false));
  }, []);
  const sum = (s) => rows.filter((r) => r.status === s).reduce((n, r) => n + r.amount, 0);
  const counts = reactExports.useMemo(() => rows.reduce((c, r) => ({ ...c, [r.status]: (c[r.status] || 0) + 1 }), {}), [rows]);
  const filtered = rows.filter((r) => (!status || r.status === status) && (!gateway || r.gateway === gateway) && (!search || `${r.id} ${r.name} ${r.email} ${r.transaction_id}`.toLowerCase().includes(search.toLowerCase())) && (!range || r.date >= range[0].format("YYYY-MM-DD") && r.date <= range[1].format("YYYY-MM-DD 23:59:59")));
  const columns = [
    { title: "#", dataIndex: "id", width: 80, render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { onClick: () => setOpen(r), className: "mg-strong-link", children: [
      "#",
      v
    ] }) },
    { title: __("Member", "memberglut"), dataIndex: "name", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link("member_detail", { id: r.member_id }), children: v }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: r.email })
    ] }) },
    { title: __("Plan", "memberglut"), dataIndex: "plan", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      v,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-muted", children: [
        r.type === "renewal" ? __("Renewal", "memberglut") : __("New", "memberglut"),
        r.coupon && ` · ${r.coupon}`
      ] })
    ] }) },
    { title: __("Method", "memberglut"), dataIndex: "gateway", render: (v) => GATEWAY[v] },
    { title: __("Status", "memberglut"), dataIndex: "status", render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: v, label: PAY_STATUS[v] }) },
    { title: __("Date", "memberglut"), dataIndex: "date", sorter: (a, b) => a.date.localeCompare(b.date), defaultSortOrder: "descend", render: date },
    { title: __("Amount", "memberglut"), dataIndex: "amount", align: "right", sorter: (a, b) => a.amount - b.amount, render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: r.status === "refunded" ? "mg-strike" : "", children: money(v) }) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: __("Payments", "memberglut"),
        subtitle: __("Every payment from every gateway, with refunds and bank transfers to confirm.", "memberglut"),
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileExport }), onClick: () => message.success(__("payments.csv downloaded.", "memberglut")), children: __("Export CSV", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), onClick: () => setAddOpen(true), children: __("Add manual payment", "memberglut") })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-stats-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faSackDollar }), label: __("Completed", "memberglut"), value: money(sum("completed")), hint: sprintf(__("%d payments", "memberglut"), counts.completed || 0), trend: "up" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBuildingColumns }), label: __("Waiting (bank transfer)", "memberglut"), value: money(sum("pending")), hint: sprintf(__("%d to confirm", "memberglut"), counts.pending || 0) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTriangleExclamation }), label: __("Failed", "memberglut"), value: counts.failed || 0, hint: __("Retries run automatically", "memberglut"), trend: "down" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRotateLeft }), label: __("Refunded", "memberglut"), value: money(sum("refunded")), trend: "down" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-filter-tabs", children: [["", __("All", "memberglut"), rows.length], ...Object.entries(PAY_STATUS).map(([k, l]) => [k, l, counts[k] || 0])].map(([k, l, n]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: `mg-filter-tab ${status === k ? "active" : ""}`, onClick: () => setStatus(k), children: [
      l,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-filter-count", children: n })
    ] }, k || "all")) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-table-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-table-toolbar", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-table-toolbar-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { allowClear: true, prefix: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMagnifyingGlass }), placeholder: __("Search ID, member, email or transaction…", "memberglut"), value: search, onChange: (e) => setSearch(e.target.value), style: { width: 320 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, placeholder: __("All methods", "memberglut"), value: gateway, onChange: setGateway, options: ["stripe", "paypal", "bank", "manual"].map((g) => ({ value: g, label: GATEWAY[g] })), style: { width: 170 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker.RangePicker, { value: range, onChange: setRange })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ForwardTable,
        {
          rowKey: "id",
          loading,
          columns,
          dataSource: filtered,
          onRow: (r) => ({ onDoubleClick: () => setOpen(r) }),
          pagination: { pageSize: 10, showTotal: (t) => sprintf(__("%d payments", "memberglut"), t) },
          summary: (data) => /* @__PURE__ */ jsxRuntimeExports.jsxs(ForwardTable.Summary.Row, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable.Summary.Cell, { index: 0, colSpan: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: __("Total on this page (completed)", "memberglut") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable.Summary.Cell, { index: 1, align: "right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: money(data.filter((r) => r.status === "completed").reduce((n, r) => n + r.amount, 0)) }) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentDrawer, { p: open, onClose: () => setOpen(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Modal,
      {
        title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Add manual payment", "memberglut") }),
        open: addOpen,
        onCancel: () => setAddOpen(false),
        okText: __("Add payment", "memberglut"),
        onOk: async () => {
          await form.validateFields();
          setAddOpen(false);
          message.success(__("Payment recorded.", "memberglut"));
        },
        destroyOnClose: true,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-modal-intro", children: __("Record a payment taken outside the site (cash, invoice, another shop).", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { form, layout: "vertical", requiredMark: false, initialValues: { status: "completed", activate: true }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "member", label: __("Member", "memberglut"), rules: [{ required: true, message: __("Choose a member.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { showSearch: true, optionFilterProp: "label", options: MEMBERS.map((m) => ({ value: m.id, label: `${m.name} (${m.email})` })) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "plan", label: __("Plan", "memberglut"), rules: [{ required: true, message: __("Choose a plan.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: PLANS.map((p) => ({ value: p.id, label: p.name })) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "amount", label: __("Amount", "memberglut"), rules: [{ required: true, message: __("Enter the amount.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 0, step: 0.01, addonBefore: "$", style: { width: "100%" } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "status", label: __("Status", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: Object.entries(PAY_STATUS).map(([value, label]) => ({ value, label })) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "date", label: __("Date", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" } }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "note", label: __("Note", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input.TextArea, { rows: 2 }) })
          ] })
        ]
      }
    )
  ] });
}
function PaymentsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "payments", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Payments, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(PaymentsPage, {}));
