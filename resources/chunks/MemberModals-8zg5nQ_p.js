import { dB as reactExports, dl as jsxRuntimeExports, ar as _n, ag as __ } from "./client-CTTyQOnd.js";
import { s as sprintf } from "./sprintf-DmNrJSYG.js";
import { b as planOptions, d as dayjs } from "./lookups-2moJUDPH.js";
import { M as Modal } from "./index-BYeBYKdc.js";
import { A as Alert } from "./index-DBTNcr8l.js";
import { S as Select, R as Radio } from "./api-BoF1RtIE.js";
import { T as TypedInputNumber } from "./index-C6h9-TWP.js";
import { D as DatePicker } from "./index-DLAXZnY0.js";
import { F as Form } from "./index-Cb3PZqfZ.js";
function ChangePlanModal({ open, count = 1, gatewayManaged, onCancel, onOk }) {
  const [plan, setPlan] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open) setPlan(null);
  }, [open]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      open,
      title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Change plan", "memberglut") }),
      onCancel,
      okButtonProps: { disabled: !plan },
      confirmLoading: saving,
      okText: __("Change plan", "memberglut"),
      onOk: async () => {
        setSaving(true);
        try {
          await onOk(plan);
        } finally {
          setSaving(false);
        }
      },
      destroyOnClose: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-modal-intro", children: sprintf(_n("The member keeps their dates; only the plan (and its role) changes.", "The %d members keep their dates; only the plan (and its role) changes.", count, "memberglut"), count) }),
        gatewayManaged && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { type: "warning", showIcon: true, style: { marginBottom: 12 }, message: __("This subscription is billed by a payment gateway. The change is made in MemberGlut only — the amount charged at the gateway stays the same.", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: plan, onChange: setPlan, options: planOptions(), placeholder: __("Choose a plan", "memberglut"), style: { width: "100%" } })
      ]
    }
  );
}
function ExtendModal({ open, count = 1, onCancel, onOk }) {
  const [mode, setMode] = reactExports.useState("days");
  const [days, setDays] = reactExports.useState(30);
  const [date, setDate] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open) {
      setMode("days");
      setDays(30);
      setDate(null);
    }
  }, [open]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      open,
      title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Extend expiry", "memberglut") }),
      onCancel,
      confirmLoading: saving,
      okButtonProps: { disabled: mode === "date" && !date },
      okText: __("Extend", "memberglut"),
      onOk: async () => {
        setSaving(true);
        try {
          await onOk(mode === "days" ? { days } : { date: date.format("YYYY-MM-DD") });
        } finally {
          setSaving(false);
        }
      },
      destroyOnClose: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-modal-intro", children: sprintf(_n("Applies to %d subscription.", "Applies to %d subscriptions.", count, "memberglut"), count) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Radio.Group, { value: mode, onChange: (e) => setMode(e.target.value), style: { marginBottom: 14 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "days", children: __("Add days", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "date", children: __("Set a new date", "memberglut") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: mode === "days" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 1, max: 3650, value: days, onChange: (v) => setDays(v || 1), addonAfter: __("days", "memberglut") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { value: date, onChange: setDate, disabledDate: (d) => d && d < dayjs().startOf("day") }) })
      ]
    }
  );
}
function EditSubscriptionModal({ open, sub, isNew, onCancel, onOk, statuses }) {
  const [form] = Form.useForm();
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open) {
      form.setFieldsValue(sub && !isNew ? { plan_id: sub.plan_id, status: sub.status, start: sub.started ? dayjs(sub.started) : null, expires: sub.expires ? dayjs(sub.expires) : null } : { plan_id: null, status: "active", start: dayjs(), expiry: "plan" });
    }
  }, [open]);
  const expiry = Form.useWatch("expiry", form);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      open,
      onCancel,
      confirmLoading: saving,
      title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: isNew ? __("Add a plan", "memberglut") : __("Edit subscription", "memberglut") }),
      okText: __("Save", "memberglut"),
      onOk: async () => {
        const v = await form.validateFields();
        setSaving(true);
        try {
          await onOk(v);
        } finally {
          setSaving(false);
        }
      },
      destroyOnClose: true,
      children: [
        sub && sub.gateway_managed && !isNew && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { type: "warning", showIcon: true, style: { marginBottom: 12 }, message: __("Billed by a payment gateway: plan and date changes are made in MemberGlut only. Cancel and Expire also stop the gateway subscription.", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { form, layout: "vertical", requiredMark: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "plan_id", label: __("Plan", "memberglut"), rules: [{ required: true, message: __("Choose a plan.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: planOptions() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "status", label: __("Status", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: Object.entries(statuses).filter(([k]) => !isNew || ["active", "trialing", "pending", "on_hold"].includes(k)).map(([value, label]) => ({ value, label })) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "start", label: __("Start", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" } }) }),
            isNew ? /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "expiry", label: __("Expires", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: [{ value: "plan", label: __("From the plan’s duration", "memberglut") }, { value: "never", label: __("Never", "memberglut") }, { value: "date", label: __("On a date…", "memberglut") }] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "expires", label: __("Expires", "memberglut"), extra: __("Empty = never. A past date ends access now.", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" }, allowClear: true }) }),
            isNew && expiry === "date" && /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "expiry_date", label: __("Expiry date", "memberglut"), rules: [{ required: true }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" } }) })
          ] })
        ] })
      ]
    }
  );
}
export {
  ChangePlanModal as C,
  EditSubscriptionModal as E,
  ExtendModal as a
};
