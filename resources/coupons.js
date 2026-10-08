import { a8 as __, cU as jsxRuntimeExports, P as Page, b as App, d7 as reactExports, q as FontAwesomeIcon, b4 as faCopy, bB as faPenToSquare, bV as faTrashCan, a2 as StatusBadge, E as PageHeader, c as Button, bf as faFileImport, bE as faPlus, p as Drawer, c8 as faWandMagicSparkles, aD as createRoot } from "./chunks/Page-uv7jJYOd.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { d as dayjs } from "./chunks/dayjs.min-Cgo1VKL0.js";
import { O as getCoupons, R as Radio, S as Select, ao as saveCoupon } from "./chunks/api-Bis6erdL.js";
import { m as money, d as date } from "./chunks/format-DY4jIcju.js";
import { a as PLANS } from "./chunks/demoData-DGZGffIB.js";
import { P as Popconfirm } from "./chunks/index-D2idIAPA.js";
import { T as Tag } from "./chunks/index-DIYjU850.js";
import { P as Progress } from "./chunks/progress-Dk_fv2PJ.js";
import { U as Upload } from "./chunks/index-BE1J450M.js";
import { F as ForwardTable } from "./chunks/Table-BSiHada8.js";
import { F as Form } from "./chunks/index-sZSO_VI9.js";
import { I as Input } from "./chunks/index-B1n7UfX_.js";
import { T as TypedInputNumber, D as DatePicker } from "./chunks/index-DEtLiZPs.js";
import { S as Switch } from "./chunks/index-Dfx4LXY8.js";
import "./chunks/lookups-CFy9Aj1i.js";
import "./chunks/index-BgGiENMb.js";
import "./chunks/useBreakpoint-D8Ns16_a.js";
import "./chunks/index-CIIETatw.js";
const STATUS = { active: __("Active", "memberglut"), scheduled: __("Scheduled", "memberglut"), expired: __("Expired", "memberglut"), inactive: __("Inactive", "memberglut") };
function CouponDrawer({ coupon, onClose, onSave }) {
  const [form] = Form.useForm();
  const type = Form.useWatch("type", form);
  reactExports.useEffect(() => {
    if (coupon) form.setFieldsValue({ ...coupon, starts: coupon.starts ? dayjs(coupon.starts) : null, expires: coupon.expires ? dayjs(coupon.expires) : null, enabled: coupon.status !== "inactive" });
  }, [coupon]);
  const gen = () => form.setFieldValue("code", Math.random().toString(36).slice(2, 10).toUpperCase());
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Drawer,
    {
      open: !!coupon,
      onClose,
      width: 520,
      title: (coupon == null ? void 0 : coupon.id) ? sprintf(__("Edit coupon %s", "memberglut"), coupon.code) : __("New coupon", "memberglut"),
      destroyOnClose: true,
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onClose, style: { marginRight: 8 }, children: __("Cancel", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", onClick: async () => onSave(await form.validateFields()), children: __("Save coupon", "memberglut") })
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { form, layout: "vertical", requiredMark: false, initialValues: { type: "percent", amount: 10, plans: [], max_uses: 0, per_user: 1, new_users_only: false, recurring: false, enabled: true }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { label: __("Code", "memberglut"), required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "code", noStyle: true, rules: [{ required: true, message: __("Enter a code.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { style: { textTransform: "uppercase" }, placeholder: "WELCOME20" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faWandMagicSparkles }), onClick: gen, children: __("Generate", "memberglut") })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "type", label: __("Discount", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio.Group, { optionType: "button", buttonStyle: "solid", options: [{ value: "percent", label: "%" }, { value: "fixed", label: __("Amount", "memberglut") }] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "amount", label: type === "percent" ? __("Percent off", "memberglut") : __("Amount off", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 0, max: type === "percent" ? 100 : void 0, addonAfter: type === "percent" ? "%" : void 0, addonBefore: type === "fixed" ? "$" : void 0, style: { width: "100%" } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "plans", label: __("Plans", "memberglut"), extra: __("Empty = every paid plan.", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", options: PLANS.filter((p) => p.type === "paid").map((p) => ({ value: p.id, label: p.name })), placeholder: __("All paid plans", "memberglut") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "recurring", label: __("For subscriptions, apply to", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio.Group, { options: [{ value: false, label: __("The first payment only", "memberglut") }, { value: true, label: __("Every payment", "memberglut") }] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "starts", label: __("Starts", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "expires", label: __("Expires", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "max_uses", label: __("Total uses", "memberglut"), extra: __("0 = unlimited", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 0, style: { width: "100%" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "per_user", label: __("Uses per member", "memberglut"), extra: __("0 = unlimited", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 0, style: { width: "100%" } }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "new_users_only", valuePropName: "checked", label: __("New customers only", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "enabled", valuePropName: "checked", label: __("Enabled", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {}) })
      ] })
    }
  );
}
function Coupons() {
  const { message } = App.useApp();
  const [rows, setRows] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [editing, setEditing] = reactExports.useState(null);
  reactExports.useEffect(() => {
    getCoupons().then(setRows).finally(() => setLoading(false));
  }, []);
  const save = async (v) => {
    const c = await saveCoupon({ ...editing, ...v, code: v.code.toUpperCase(), starts: v.starts ? v.starts.format("YYYY-MM-DD") : "", expires: v.expires ? v.expires.format("YYYY-MM-DD") : "", status: v.enabled ? "active" : "inactive", uses: editing.uses || 0 });
    setRows(editing.id ? rows.map((r) => r.id === c.id ? c : r) : [c, ...rows]);
    setEditing(null);
    message.success(__("Coupon saved.", "memberglut"));
  };
  const columns = [
    {
      title: __("Code", "memberglut"),
      dataIndex: "code",
      render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mg-coupon-code", onClick: () => {
          var _a;
          (_a = navigator.clipboard) == null ? void 0 : _a.writeText(v);
          message.success(__("Code copied.", "memberglut"));
        }, children: [
          v,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCopy })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-row-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { onClick: () => setEditing(r), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPenToSquare }),
            " ",
            __("Edit", "memberglut")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-action-sep", children: "|" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Popconfirm, { title: __("Delete this coupon?", "memberglut"), okButtonProps: { danger: true }, onConfirm: () => setRows(rows.filter((x) => x.id !== r.id)), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "mg-action-delete", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }),
            " ",
            __("Delete", "memberglut")
          ] }) })
        ] })
      ] })
    },
    { title: __("Discount", "memberglut"), render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: r.type === "percent" ? `${r.amount}%` : money(r.amount) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: r.recurring ? __("every payment", "memberglut") : __("first payment", "memberglut") })
    ] }) },
    { title: __("Plans", "memberglut"), dataIndex: "plans", render: (v) => v.length ? v.map((id) => {
      var _a;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: (_a = PLANS.find((p) => p.id === id)) == null ? void 0 : _a.name }, id);
    }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: __("All paid plans", "memberglut") }) },
    { title: __("Used", "memberglut"), render: (v, r) => r.max_uses ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 140 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { percent: r.uses / r.max_uses * 100, size: "small", format: () => `${r.uses}/${r.max_uses}`, strokeColor: "#e94560" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      r.uses,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: "/ ∞" })
    ] }) },
    { title: __("Valid", "memberglut"), render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mg-muted", children: [
      r.starts ? date(r.starts) : __("Now", "memberglut"),
      " → ",
      r.expires ? date(r.expires) : __("No end", "memberglut"),
      r.new_users_only && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        __("New customers only", "memberglut")
      ] })
    ] }) },
    { title: __("Status", "memberglut"), dataIndex: "status", render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: v, label: STATUS[v] }) }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: __("Coupons", "memberglut"),
        subtitle: __("Discount codes for checkout: percent or fixed, per plan, with dates and usage limits.", "memberglut"),
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { accept: ".csv", showUploadList: false, beforeUpload: () => {
            message.success(__("Codes imported.", "memberglut"));
            return false;
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileImport }), children: __("Import CSV", "memberglut") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), onClick: () => setEditing({}), children: __("New coupon", "memberglut") })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-table-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable, { rowKey: "id", loading, columns, dataSource: rows, pagination: false }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CouponDrawer, { coupon: editing, onClose: () => setEditing(null), onSave: save })
  ] });
}
function CouponsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "payments", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Coupons, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(CouponsPage, {}));
