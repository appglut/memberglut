import { a8 as __, cU as jsxRuntimeExports, P as Page, b as App, d7 as reactExports, a0 as Skeleton, E as PageHeader, c as Button, cV as link, q as FontAwesomeIcon, bj as faGear, bh as faFloppyDisk, c3 as faUserShield, bX as faUser, bA as faPen, bc as faEye, bz as faPaperPlane, bK as faRotateLeft, aD as createRoot } from "./chunks/Page-uv7jJYOd.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { a as SmartTags } from "./chunks/SettingsPanel-JeHdAjF2.js";
import { G as getEmails, af as saveEmails, ad as resetEmail, ab as previewEmail, as as testEmail } from "./chunks/api-fY3e1Vcq.js";
import "./chunks/lookups-DHSS-Myl.js";
import { S as Switch } from "./chunks/index-Dfx4LXY8.js";
import { T as Tag } from "./chunks/index-C4fpz-4h.js";
import { S as Segmented } from "./chunks/index-wYjIfrAo.js";
import { T as TypedInputNumber } from "./chunks/index-CeqreKgZ.js";
import { I as Input } from "./chunks/index-B1n7UfX_.js";
import { M as Modal } from "./chunks/index-X7sZdAeO.js";
import "./chunks/dayjs.min-Cgo1VKL0.js";
import "./chunks/index-YNfV1lQJ.js";
import "./chunks/index-C0jBAFnu.js";
import "./chunks/index-CQ9IQMWb.js";
const GROUPS = [
  ["account", __("Account", "memberglut")],
  ["subscription", __("Subscription", "memberglut")],
  ["payment", __("Payment", "memberglut")],
  ["admin", __("To the admin", "memberglut")]
];
const REMINDERS = ["expiring_soon", "renewal_reminder", "trial_ending"];
function Preview({ email }) {
  const [data, setData] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    let live = true;
    const t = setTimeout(() => {
      previewEmail(email.key, { subject: email.subject, heading: email.heading, body: email.body }).then((d) => {
        if (live) setData(d);
      }).catch((e) => {
        if (live) setError(e.message);
      });
    }, 250);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [email.key, email.subject, email.heading, email.body]);
  if (error) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-note", children: error });
  if (!data) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { active: true, paragraph: { rows: 8 } });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-preview", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-email-meta", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: __("Subject:", "memberglut") }),
      " ",
      data.subject
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: __("Email preview", "memberglut"), className: "mg-email-iframe", srcDoc: data.html, sandbox: "" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", style: { marginTop: 8 }, children: __("Smart tags are filled with sample data (your account and a paid plan).", "memberglut") })
  ] });
}
function Emails() {
  const { message } = App.useApp();
  const [emails, setEmails] = reactExports.useState(null);
  const [tags, setTags] = reactExports.useState([]);
  const [current, setCurrent] = reactExports.useState("register");
  const [mode, setMode] = reactExports.useState("edit");
  const [dirty, setDirty] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [testOpen, setTestOpen] = reactExports.useState(false);
  const [testTo, setTestTo] = reactExports.useState("");
  const [sending, setSending] = reactExports.useState(false);
  const apply = (d) => {
    setEmails(d.emails);
    setTags(d.tags);
  };
  reactExports.useEffect(() => {
    getEmails().then(apply).catch((e) => message.error(e.message));
    const admin = typeof memberglut_admin !== "undefined" ? memberglut_admin : {};
    setTestTo(admin.user && admin.user.email || "");
  }, []);
  reactExports.useEffect(() => {
    const warn = (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  if (!emails) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { active: true, paragraph: { rows: 12 } });
  const email = emails.find((e) => e.key === current) || emails[0];
  const set = (key, patch) => {
    setEmails(emails.map((e) => e.key === key ? { ...e, ...patch } : e));
    setDirty(true);
  };
  const save = async () => {
    setSaving(true);
    try {
      apply(await saveEmails(emails));
      setDirty(false);
      message.success(__("Emails saved.", "memberglut"));
    } catch (e) {
      message.error(e.message);
    } finally {
      setSaving(false);
    }
  };
  const reset = async () => {
    try {
      const d = await resetEmail(email.key);
      setEmails(emails.map((e) => e.key === email.key ? { ...e, subject: d.subject, heading: d.heading, body: d.body, is_default: true } : e));
      message.success(__("Default text restored.", "memberglut"));
    } catch (e) {
      message.error(e.message);
    }
  };
  const sendTest = async () => {
    setSending(true);
    try {
      await testEmail(email.key, { to: testTo, subject: email.subject, heading: email.heading, body: email.body });
      setTestOpen(false);
      message.success(sprintf(__("Test sent to %s.", "memberglut"), testTo));
    } catch (e) {
      message.error(e.message);
    } finally {
      setSending(false);
    }
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", type: "primary", disabled: !dirty, loading: saving, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFloppyDisk }), onClick: save, className: "mg-save-btn", children: __("Save emails", "memberglut") })
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
              !email.enabled && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: __("Off", "memberglut") }),
              " ",
              !email.is_default && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "pink", bordered: false, children: __("Customized", "memberglut") })
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 1, max: 90, value: email.days, onChange: (v) => set(email.key, { days: v || 1 }), addonAfter: email.key === "trial_ending" ? __("days before the trial ends", "memberglut") : email.key === "renewal_reminder" ? __("days before the automatic renewal", "memberglut") : __("days before the expiry date", "memberglut") })
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              __("Message", "memberglut"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: __("(a line with only a link becomes a button)", "memberglut") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input.TextArea, { className: "mg-editor", rows: 12, value: email.body, onChange: (e) => set(email.key, { body: e.target.value }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SmartTags, { tags }),
          !email.is_default && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "mg-reset-link", onClick: reset, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRotateLeft }),
            " ",
            __("Restore the default text", "memberglut")
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Preview, { email })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Send a test email", "memberglut") }), open: testOpen, onCancel: () => setTestOpen(false), okText: __("Send", "memberglut"), confirmLoading: sending, onOk: sendTest, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-modal-intro", children: __("Smart tags are filled with sample data. Unsaved changes are included.", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: testTo, onChange: (e) => setTestTo(e.target.value), placeholder: "you@example.com" })
    ] })
  ] });
}
function EmailsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Emails, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(EmailsPage, {}));
