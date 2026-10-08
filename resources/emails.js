import { a8 as __, cV as jsxRuntimeExports, P as Page, b as App, d8 as reactExports, a0 as Skeleton, E as PageHeader, c as Button, cW as link, q as FontAwesomeIcon, bk as faGear, bi as faFloppyDisk, c4 as faUserShield, bY as faUser, bB as faPen, bd as faEye, bA as faPaperPlane, bL as faRotateLeft, aE as createRoot } from "./chunks/Page-DwAue1bn.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { a as SmartTags } from "./chunks/SettingsPanel-CwFaDHbp.js";
import { C as getEmails, E as EMAIL_TAGS, a7 as saveEmails } from "./chunks/api-Brv-883T.js";
import { S as Switch } from "./chunks/index-BdHVDZgL.js";
import { T as Tag } from "./chunks/index-DCZRJZ7q.js";
import { S as Segmented } from "./chunks/index-jcrWDM9i.js";
import { T as TypedInputNumber } from "./chunks/index-BzZf0YwZ.js";
import { I as Input } from "./chunks/index-DR_RfPho.js";
import { M as Modal } from "./chunks/index-f93o2WLB.js";
import "./chunks/index-DbvrDALF.js";
import "./chunks/index-CjCriZ9v.js";
import "./chunks/index-dboLsXN4.js";
import "./chunks/index-CJWEZhJV.js";
const GROUPS = [
  ["account", __("Account", "memberglut")],
  ["subscription", __("Subscription", "memberglut")],
  ["payment", __("Payment", "memberglut")],
  ["admin", __("To the admin", "memberglut")]
];
const DEFAULT_BODY = {
  register: "Hi {first_name},\n\nWelcome to {site_name}! Your account is ready.\n\nUsername: {username}\nLog in here: {login_url}\n\nSee you inside,\n{site_name}",
  activated: "Hi {first_name},\n\nYour {plan_name} membership is now active.\n\nPlan: {plan_name}\nPrice: {plan_price}\nRenews / expires: {expiration_date}\n\nManage it any time from your account: {account_url}",
  payment_failed: "Hi {first_name},\n\nWe could not take the payment for your {plan_name} membership.\n\nPlease update your card from your account so you do not lose access: {account_url}\n\nWe will try again automatically in a few days."
};
const REMINDERS = ["expiring_soon", "renewal_reminder", "trial_ending"];
const SAMPLE = {
  "{first_name}": "Aisha",
  "{display_name}": "Aisha Rahman",
  "{last_name}": "Rahman",
  "{username}": "aisha",
  "{user_email}": "aisha@example.com",
  "{plan_name}": "Gold",
  "{plan_price}": "$89.00 / year",
  "{plan_duration}": "1 year",
  "{start_date}": "Oct 6, 2026",
  "{expiration_date}": "Oct 6, 2027",
  "{subscription_status}": "Active",
  "{payment_id}": "5003",
  "{payment_amount}": "$89.00",
  "{payment_gateway}": "Stripe",
  "{site_name}": "My Membership Site",
  "{site_url}": "https://yoursite.com",
  "{account_url}": "https://yoursite.com/account/",
  "{login_url}": "https://yoursite.com/login/",
  "{reset_link}": "https://yoursite.com/reset/…",
  "{admin_email}": "admin@yoursite.com"
};
const fill = (text = "") => Object.entries(SAMPLE).reduce((t, [k, v]) => t.split(k).join(v), text);
function Emails() {
  const { message } = App.useApp();
  const [emails, setEmails] = reactExports.useState(null);
  const [current, setCurrent] = reactExports.useState("register");
  const [mode, setMode] = reactExports.useState("edit");
  const [dirty, setDirty] = reactExports.useState(false);
  const [testOpen, setTestOpen] = reactExports.useState(false);
  const [testTo, setTestTo] = reactExports.useState("admin@yoursite.com");
  reactExports.useEffect(() => {
    getEmails().then((list) => setEmails(list.map((e) => ({ heading: "", days: 7, ...e, body: e.body || DEFAULT_BODY[e.key] || `Hi {first_name},

${e.desc}

{site_name}` }))));
  }, []);
  if (!emails) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { active: true, paragraph: { rows: 12 } });
  const email = emails.find((e) => e.key === current);
  const set = (key, patch) => {
    setEmails(emails.map((e) => e.key === key ? { ...e, ...patch } : e));
    setDirty(true);
  };
  const save = async () => {
    await saveEmails(emails);
    setDirty(false);
    message.success(__("Emails saved.", "memberglut"));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: __("Emails", "memberglut"),
        subtitle: __("Every email MemberGlut sends. Turn each on or off and change its words.", "memberglut"),
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faGear }), href: link("settings", { tab: "emails" }), children: __("Sender & design", "memberglut") }),
          dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-fs-unsaved", children: __("Unsaved changes", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", type: "primary", disabled: !dirty, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFloppyDisk }), onClick: save, className: "mg-save-btn", children: __("Save emails", "memberglut") })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "mg-email-list", children: GROUPS.map(([g, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-email-group-title", children: label }),
        emails.filter((e) => e.group === g).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mg-email-item ${e.key === current ? "active" : ""} ${!e.enabled ? "off" : ""}`, onClick: () => setCurrent(e.key), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: e.recipient === "admin" ? faUserShield : faUser, className: "who" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: e.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", checked: e.enabled, onClick: (v, ev) => ev.stopPropagation(), onChange: (v) => set(e.key, { enabled: v }) })
        ] }, e.key))
      ] }, g)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mg-email-editor", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-editor-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
              email.name,
              " ",
              !email.enabled && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: __("Off", "memberglut") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              email.desc,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mg-muted", children: [
                "· ",
                email.recipient === "admin" ? __("Sent to the admin", "memberglut") : __("Sent to the member", "memberglut")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-actions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Segmented, { value: mode, onChange: setMode, options: [{ value: "edit", label: __("Edit", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPen }) }, { value: "preview", label: __("Preview", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEye }) }] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPaperPlane }), onClick: () => setTestOpen(true), children: __("Send test", "memberglut") })
          ] })
        ] }),
        mode === "edit" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-form", children: [
          REMINDERS.includes(email.key) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: __("Send", "memberglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 1, max: 90, value: email.days, onChange: (v) => set(email.key, { days: v }), addonAfter: email.key === "trial_ending" ? __("days before the trial ends", "memberglut") : __("days before the date", "memberglut") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: __("Subject", "memberglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: email.subject, onChange: (e) => set(email.key, { subject: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              __("Heading", "memberglut"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: __("(optional, shown at the top of the HTML template)", "memberglut") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: email.heading, placeholder: email.name, onChange: (e) => set(email.key, { heading: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-field", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: __("Message", "memberglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input.TextArea, { className: "mg-editor", rows: 12, value: email.body, onChange: (e) => set(email.key, { body: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SmartTags, { tags: EMAIL_TAGS }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "mg-reset-link", onClick: () => set(email.key, { body: DEFAULT_BODY[email.key] || "", subject: email.subject }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRotateLeft }),
            " ",
            __("Restore the default text", "memberglut")
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-preview", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-meta", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: __("Subject:", "memberglut") }),
            " ",
            fill(email.subject)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-frame", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-email-brand", children: "My Membership Site" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: fill(email.heading || email.name) }),
              fill(email.body).split("\n").map((line, i) => line ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: line }, i) : /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}, i))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-email-foot", children: __("My Membership Site · You receive this email because you have an account with us.", "memberglut") })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Modal,
      {
        title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Send a test email", "memberglut") }),
        open: testOpen,
        onCancel: () => setTestOpen(false),
        okText: __("Send", "memberglut"),
        onOk: () => {
          setTestOpen(false);
          message.success(sprintf(__("Test sent to %s.", "memberglut"), testTo));
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-modal-intro", children: __("Smart tags are filled with sample data.", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: testTo, onChange: (e) => setTestTo(e.target.value) })
        ]
      }
    )
  ] });
}
function EmailsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Emails, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(EmailsPage, {}));
