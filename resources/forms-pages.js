import { a8 as __, cV as jsxRuntimeExports, P as Page, b as App, d8 as reactExports, bh as faFileLines, c2 as faUserPlus, bJ as faRightToBracket, bp as faIdCard, bS as faTableColumns, b4 as faCode, c as Button, q as FontAwesomeIcon, c9 as faWandMagicSparkles, aZ as faCheck, bX as faTriangleExclamation, aL as faArrowUpRightFromSquare, aK as faArrowUp, aH as faArrowDown, bu as faLock, bB as faPen, bW as faTrashCan, bF as faPlus, aD as createRoot } from "./chunks/Page-C9tSda4_.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { S as SettingsPanel, C as CopyCode } from "./chunks/SettingsPanel-CkQlSWRJ.js";
import { Z as getFormsConfig, av as saveFormsConfig, S as Select, T as Tooltip, q as createPages } from "./chunks/api-Dio4a_nt.js";
import { L, b as planOptions } from "./chunks/lookups-DN25OZmC.js";
import { b as planPrice } from "./chunks/format-CNHKAmkn.js";
import { S as Spin } from "./chunks/index-BDXpcJpj.js";
import { T as Tag } from "./chunks/index-QResbeLU.js";
import { A as Alert } from "./chunks/index-CoZNuKmg.js";
import { F as Form } from "./chunks/index-BRTJlPnN.js";
import { I as Input } from "./chunks/index-vq8i8Snb.js";
import { S as Switch } from "./chunks/index-B-UY_eZJ.js";
import { M as Modal } from "./chunks/index-CoXNCXsy.js";
import "./chunks/index-p4FwzSnn.js";
import "./chunks/index-BcvGEOpP.js";
import "./chunks/index-DgFmLSfn.js";
import "./chunks/index-fHKxISrQ.js";
import "./chunks/useBreakpoint-CPqLtmmb.js";
const PAGE_SLOTS = [
  ["page_register", __("Registration & checkout", "memberglut"), "[memberglut_register]", __("Account fields, plan choice and payment. Plan signup links open this page.", "memberglut")],
  ["page_login", __("Login", "memberglut"), "[memberglut_login]", __("Replaces wp-login.php when “Use MemberGlut pages” is on.", "memberglut")],
  ["page_account", __("My Account", "memberglut"), "[memberglut_account]", __("Profile, subscriptions, payments. Default target of the redirects.", "memberglut")],
  ["page_lost", __("Lost password", "memberglut"), "[memberglut_lost_password]", __("Request and set a new password. Reset emails link here.", "memberglut")],
  ["page_pricing", __("Pricing", "memberglut"), "[memberglut_plans]", __("Pricing table of your plans. Used by the “Pricing page” restriction action.", "memberglut")],
  ["page_thanks", __("Thank you", "memberglut"), "[memberglut_receipt]", __("Shown after a paid checkout with the order details and bank instructions.", "memberglut")]
];
const LOCKED_KEYS = ["email", "password"];
const NO_PROFILE = ["password", "password_confirm", "username", "email"];
const FIELD_TYPES = ["text", "textarea", "email", "url", "tel", "number", "date", "select", "radio", "checkbox", "country", "hidden"].map((t) => ({ value: t, label: t }));
function FieldBuilder({ values, update }) {
  const [editing, setEditing] = reactExports.useState(null);
  const [form] = Form.useForm();
  const list = values.reg_fields || [];
  const set = (i, patch) => update("reg_fields", list.map((f, j) => j === i ? { ...f, ...patch } : f));
  const move = (i, d) => {
    const n = [...list];
    [n[i], n[i + d]] = [n[i + d], n[i]];
    update("reg_fields", n);
  };
  const type = Form.useWatch("type", form);
  const open = (i) => {
    setEditing(i);
    form.setFieldsValue(i === "new" ? { type: "text", label: "", key: "", options: "", required: false } : list[i]);
  };
  const save = async () => {
    const v = await form.validateFields();
    if (editing === "new") {
      if (list.some((f) => f.key === v.key)) {
        form.setFields([{ name: "key", errors: [__("This key is already used.", "memberglut")] }]);
        return;
      }
      update("reg_fields", [...list, { ...v, on: true, required: !!v.required, custom: true }]);
    } else {
      set(editing, { label: v.label, type: v.type, options: v.options || "", required: !!v.required });
    }
    setEditing(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-field-list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-field-row mg-field-head", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Field", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Label on the form", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Required", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Show", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
      ] }),
      list.map((f, i) => {
        const locked = LOCKED_KEYS.includes(f.key);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mg-field-row ${!f.on && !locked ? "off" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mg-order-btns", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", type: "text", disabled: i === 0, onClick: () => move(i, -1), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowUp }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", type: "text", disabled: i === list.length - 1, onClick: () => move(i, 1), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowDown }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: f.key }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: f.type }),
            f.custom && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "pink", bordered: false, children: __("custom", "memberglut") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { size: "small", value: f.label, onChange: (e) => set(i, { label: e.target.value }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", checked: locked || f.required, disabled: locked, onChange: (v) => set(i, { required: v }) }),
          locked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Always shown", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLock, className: "mg-muted" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", checked: f.on, onChange: (v) => set(i, { on: v }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            f.custom && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", type: "text", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPen }), onClick: () => open(i) }),
            f.custom && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", type: "text", danger: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }), onClick: () => update("reg_fields", list.filter((x, j) => j !== i)) })
          ] })
        ] }, f.key);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), onClick: () => open("new"), style: { marginTop: 12 }, children: __("Add custom field", "memberglut") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", style: { marginTop: 10 }, children: __("Custom fields are saved as user meta, shown on the user’s profile screen and the member page, exported with members, editable in My Account (when listed under Profile form) and usable in emails as {field:key}.", "memberglut") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: editing === "new" ? __("Add custom field", "memberglut") : __("Edit field", "memberglut") }), open: editing !== null, onCancel: () => setEditing(null), okText: __("Save field", "memberglut"), destroyOnClose: true, onOk: save, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { form, layout: "vertical", requiredMark: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "label", label: __("Label", "memberglut"), rules: [{ required: true, message: __("Enter a label.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: __("Company", "memberglut"), onChange: (e) => {
        if (editing === "new" && !form.isFieldTouched("key")) form.setFieldValue("key", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, ""));
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "key", label: __("Meta key", "memberglut"), rules: [{ required: true, pattern: /^[a-z0-9_]+$/, message: __("Lowercase letters, numbers and _ only.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "company", disabled: editing !== "new" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "type", label: __("Type", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: FIELD_TYPES }) })
      ] }),
      ["select", "radio", "checkbox"].includes(type) && /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "options", label: __("Choices", "memberglut"), extra: __("One per line. Use value|Label to store a different value.", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input.TextArea, { rows: 4 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "required", valuePropName: "checked", label: __("Required", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {}) })
    ] }) })
  ] });
}
function PagesSlots({ values, update, status, setStatus, pages, setPages }) {
  const { message } = App.useApp();
  const [creating, setCreating] = reactExports.useState("");
  const missing = PAGE_SLOTS.filter(([k]) => !values[k]);
  const create = async (slots, key) => {
    setCreating(key);
    try {
      const r = await createPages(slots);
      setPages(r.lookups);
      Object.entries(r.created).forEach(([k, id]) => update(k, id));
      setStatus(r.pages);
      message.success(sprintf(__("%d pages created.", "memberglut"), Object.keys(r.created).length));
    } catch (e) {
      message.error(e.message);
    } finally {
      setCreating("");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-block", style: { marginTop: 6 }, children: [
    missing.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-mig-option", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "t", children: sprintf(__("%d pages are not set", "memberglut"), missing.length) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "s", children: __("Create them with the right shortcode in one click. You can edit them like any page.", "memberglut") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", loading: creating === "all", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faWandMagicSparkles }), onClick: () => create(missing.map(([k]) => k), "all"), children: __("Create missing pages", "memberglut") })
    ] }),
    PAGE_SLOTS.map(([key, label, code, desc]) => {
      const st = status[key] || {};
      const same = st.id === values[key];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-page-slot", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-page-slot-main", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "t", children: [
            label,
            " ",
            values[key] ? /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCheck, className: "ok" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "orange", bordered: false, children: __("Not set", "memberglut") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "s", children: [
            desc,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(CopyCode, { code })
          ] }),
          values[key] && same && st.id && !st.has_code && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { style: { marginTop: 8 }, type: "warning", showIcon: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTriangleExclamation }), message: sprintf(__("This page does not contain %s yet. Add the shortcode or the MemberGlut block.", "memberglut"), code) }),
          values[key] && same && st.status && st.status !== "publish" && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { style: { marginTop: 8 }, type: "warning", showIcon: true, message: __("This page is not published, so links to it do not work.", "memberglut") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowClear: true, showSearch: true, optionFilterProp: "label", value: values[key] || void 0, onChange: (v) => update(key, v || 0), options: pages, placeholder: __("Choose a page", "memberglut"), style: { width: 230 } }),
        values[key] ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faArrowUpRightFromSquare }), href: `post.php?post=${values[key]}&action=edit` }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading: creating === key, onClick: () => create([key], key), children: __("Create", "memberglut") })
      ] }, key);
    })
  ] });
}
function PricingPreview({ values }) {
  const chosen = values.pricing_plans && values.pricing_plans.length ? values.pricing_plans.map((id) => L.plans.find((p) => p.id === id)).filter(Boolean) : L.plans.filter((p) => p.status === "active").sort((a, b) => a.group === b.group ? a.tier - b.tier : a.group.localeCompare(b.group));
  const plans = chosen.filter((p) => p.status === "active" && !p.hide_in_table);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-subhead", style: { marginTop: 18 }, children: [
      __("Preview", "memberglut"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Inactive and hidden plans are left out.", "memberglut") })
    ] }),
    !plans.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-note", children: __("No active plan to show.", "memberglut") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mg-pricing-preview ${values.pricing_dark ? "dark" : ""}`, style: { "--cols": values.pricing_layout === "cards" ? Math.min(values.pricing_columns, plans.length) : 1 }, children: plans.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `pp ${p.featured ? "feat" : ""}`, style: { "--c": p.color }, children: [
      p.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rib", children: __("Most popular", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: p.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pr", children: planPrice(p) }),
      values.pricing_features && (p.features || []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: f }, f)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "btn", children: values.pricing_button })
    ] }, p.id)) })
  ] });
}
const DEFAULTS = {
  page_register: 0,
  page_login: 0,
  page_account: 0,
  page_lost: 0,
  page_pricing: 0,
  page_thanks: 0,
  reg_fields: [],
  reg_title: "Create your account",
  reg_button: "Join now",
  plan_picker: "cards",
  reg_show_login_link: true,
  reg_ajax: true,
  login_with: "both",
  login_title: "Welcome back",
  login_button: "Log in",
  login_remember: true,
  login_lost_link: true,
  login_register_link: true,
  profile_fields: ["first_name", "last_name", "display_name", "phone", "country"],
  profile_email_confirm: true,
  pricing_layout: "cards",
  pricing_plans: [],
  pricing_features: true,
  pricing_button: "Choose plan",
  pricing_current: true,
  pricing_dark: false,
  pricing_columns: 3
};
const firstSlug = L.plans[0] && L.plans[0].slug || "gold";
function sections(extra) {
  return [
    {
      key: "pages",
      title: __("Membership pages", "memberglut"),
      icon: faFileLines,
      desc: __("The pages MemberGlut links to. Each holds a shortcode or block.", "memberglut"),
      render: (ctx) => /* @__PURE__ */ jsxRuntimeExports.jsx(PagesSlots, { ...ctx, ...extra })
    },
    {
      key: "register",
      title: __("Registration form", "memberglut"),
      icon: faUserPlus,
      desc: __("Fields and text of the sign-up and checkout form.", "memberglut"),
      errorKeys: ["reg_fields"],
      fields: [
        { key: "reg_title", type: "text", label: __("Form title", "memberglut") },
        { key: "reg_button", type: "text", label: __("Button text", "memberglut") },
        { key: "plan_picker", type: "radio", label: __("Plan choice style", "memberglut"), tip: __("Hidden when the form is opened with a ?plan= link. Only active plans that are not hidden from the pricing table are offered.", "memberglut"), options: [{ value: "cards", label: __("Cards", "memberglut") }, { value: "radio", label: __("List", "memberglut") }, { value: "select", label: __("Dropdown", "memberglut") }] },
        { key: "reg_show_login_link", type: "switch", label: __("“Already a member? Log in” link", "memberglut") },
        { key: "reg_ajax", type: "switch", label: __("Submit without reloading the page", "memberglut"), tip: __("Without JavaScript the form still works and reloads the page.", "memberglut") },
        { type: "heading", key: "h_fields", label: __("Fields", "memberglut"), tip: __("Payment fields, agreements, captcha and honeypot are added automatically (Global Settings).", "memberglut") }
      ],
      render: (ctx) => /* @__PURE__ */ jsxRuntimeExports.jsx(FieldBuilder, { ...ctx })
    },
    {
      key: "login",
      title: __("Login form", "memberglut"),
      icon: faRightToBracket,
      desc: __("Text and options of the front-end login form.", "memberglut"),
      fields: [
        { key: "login_with", type: "radio", label: __("Log in with", "memberglut"), options: [{ value: "both", label: __("Username or email", "memberglut") }, { value: "email", label: __("Email only", "memberglut") }, { value: "username", label: __("Username only", "memberglut") }] },
        { key: "login_title", type: "text", label: __("Form title", "memberglut") },
        { key: "login_button", type: "text", label: __("Button text", "memberglut") },
        { key: "login_remember", type: "switch", label: __("“Remember me” checkbox", "memberglut"), tip: __("Hidden when Security › Log out when the browser closes is on.", "memberglut") },
        { key: "login_lost_link", type: "switch", label: __("“Lost your password?” link", "memberglut") },
        { key: "login_register_link", type: "switch", label: __("“Join now” link", "memberglut"), tip: __("Hidden while new registrations are turned off.", "memberglut") }
      ]
    },
    {
      key: "profile",
      title: __("Profile form", "memberglut"),
      icon: faIdCard,
      desc: __("What members can change in My Account › Edit profile.", "memberglut"),
      fields: [
        { key: "profile_fields", type: "custom", label: __("Editable fields", "memberglut"), render: ({ value, onChange, values }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", value: value || [], onChange, style: { width: "100%" }, options: (values.reg_fields || []).filter((f) => !NO_PROFILE.includes(f.key)).map((f) => ({ value: f.key, label: f.label + (f.custom ? ` (${__("custom", "memberglut")})` : "") })) }) },
        { key: "profile_email_confirm", type: "switch", label: __("Confirm email changes", "memberglut"), tip: __("The new address must be confirmed from a link (the “Confirm email change” email) before it is used.", "memberglut") }
      ]
    },
    {
      key: "pricing",
      title: __("Pricing table", "memberglut"),
      icon: faTableColumns,
      desc: __("How [memberglut_plans] and the Pricing block show your plans.", "memberglut"),
      fields: [
        { key: "pricing_layout", type: "radio", label: __("Layout", "memberglut"), options: [{ value: "cards", label: __("Cards", "memberglut") }, { value: "compare", label: __("Comparison table", "memberglut") }, { value: "list", label: __("List", "memberglut") }] },
        { key: "pricing_plans", type: "multiselect", label: __("Plans to show", "memberglut"), tip: __("In this order. Empty shows every active plan, grouped and ordered by their upgrade path.", "memberglut"), placeholder: __("All active plans", "memberglut"), options: planOptions() },
        { key: "pricing_columns", type: "number", label: __("Columns", "memberglut"), min: 1, max: 4, show: (v) => v.pricing_layout === "cards" },
        { key: "pricing_features", type: "switch", label: __("Show feature lists", "memberglut") },
        { key: "pricing_current", type: "switch", label: __("Mark the member’s current plan", "memberglut"), tip: __("Logged-in members see “Current plan” and Upgrade / Downgrade buttons (when allowed by the plan and Global Settings › Member account).", "memberglut") },
        { key: "pricing_button", type: "text", label: __("Button text", "memberglut") },
        { key: "pricing_dark", type: "switch", label: __("Dark style", "memberglut") }
      ],
      render: ({ values }) => /* @__PURE__ */ jsxRuntimeExports.jsx(PricingPreview, { values })
    },
    {
      key: "shortcodes",
      title: __("Shortcodes & blocks", "memberglut"),
      icon: faCode,
      desc: __("Every MemberGlut shortcode. Each one is also a block in the editor (category “MemberGlut”).", "memberglut"),
      render: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-sc-table", children: [
        [`[memberglut_register plan="${firstSlug}"]`, __("Registration + checkout. plan= preselects a plan.", "memberglut")],
        ['[memberglut_login redirect="/members/"]', __("Login form.", "memberglut")],
        ["[memberglut_account]", __("My Account with tabs.", "memberglut")],
        ["[memberglut_lost_password]", __("Lost / reset password form.", "memberglut")],
        ["[memberglut_profile]", __("Edit profile form on its own.", "memberglut")],
        ['[memberglut_plans group="Main"]', __("Pricing table.", "memberglut")],
        [`[memberglut_buy plan="${firstSlug}"]`, __("Buy / join button for one plan.", "memberglut")],
        ["[memberglut_receipt]", __("Order details on the Thank-you page.", "memberglut")],
        ["[memberglut_payments]", __("The member’s payment history.", "memberglut")],
        [`[memberglut_restrict plans="${firstSlug}" roles="editor"]…[/memberglut_restrict]`, __('Show the inner content only to these plans or roles. Use not="slug" to hide from a plan.', "memberglut")],
        ["[memberglut_logged_in]…[/memberglut_logged_in]", __("Only for logged-in users.", "memberglut")],
        ["[memberglut_logged_out]…[/memberglut_logged_out]", __("Only for visitors.", "memberglut")],
        ['[memberglut_member field="first_name"]', __("Print a field of the current member (core or custom field).", "memberglut")],
        [`[memberglut_expiry plan="${firstSlug}"]`, __("Expiry date of the member’s plan.", "memberglut")],
        [`[memberglut_members plan="${firstSlug}" limit="20"]`, __("Simple list of members of a plan (names and avatars).", "memberglut")],
        [`[memberglut_count plan="${firstSlug}"]`, __("Number of members (social proof).", "memberglut")]
      ].map(([c, d]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-sc-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CopyCode, { code: c }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: d })
      ] }, c)) })
    }
  ];
}
function FormsPages() {
  const { message } = App.useApp();
  const [values, setValues] = reactExports.useState(DEFAULTS);
  const [status, setStatus] = reactExports.useState({});
  const [pages, setPages] = reactExports.useState(L.pages);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    getFormsConfig().then((r) => {
      setValues({ ...DEFAULTS, ...r.values });
      setStatus(r.pages || {});
    }).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  }, []);
  const save = async (v) => {
    setSaving(true);
    try {
      const r = await saveFormsConfig(v);
      setValues({ ...DEFAULTS, ...r.values });
      setStatus(r.pages || {});
      setErrors({});
      message.success(__("Forms & pages saved.", "memberglut"));
      return true;
    } catch (e) {
      setErrors(e.fields || {});
      message.error(e.message);
      return false;
    } finally {
      setSaving(false);
    }
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-loading", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, { size: "large" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsPanel,
    {
      title: __("Forms & Pages", "memberglut"),
      subtitle: __("The pages members use, and the fields and text of each form.", "memberglut"),
      sections: sections({ status, setStatus, pages, setPages }),
      values,
      setValues,
      onSave: save,
      saving,
      errors
    }
  );
}
function FormsPagesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "", wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormsPages, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(FormsPagesPage, {}));
