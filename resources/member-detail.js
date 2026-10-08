import { cV as jsxRuntimeExports, P as Page, b as App, d6 as queryArg, d8 as reactExports, a8 as __, cW as link, a0 as Skeleton, q as FontAwesomeIcon, a_ as faChevronLeft, c as Button, bZ as faUserCheck, c6 as faUserXmark, ba as faEnvelope, c1 as faUserPen, bF as faPlus, bA as faPaperPlane, bz as faNoteSticky, bW as faTrashCan, br as faKey, bI as faRightFromBracket, a2 as StatusBadge, b9 as faEllipsis, bs as faLayerGroup, aX as faCalendarPlus, aO as faBan, aD as createRoot } from "./chunks/Page-C9tSda4_.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { A as Avatar, E as EditSubscriptionModal, C as ChangePlanModal } from "./chunks/MemberModals-BTEJQON7.js";
import { au as memberAction, E as Empty, v as deleteNote, m as addNote, aR as subscriptionAction, a3 as getMember, z as deleteSubscription, a7 as getPayments, _ as getEvents, a1 as getLogins, l as addMember, aV as updateSubscription } from "./chunks/api-B7vDfSa0.js";
import { i as initials, d as date, f as fromNow, m as money, a as dateTime, S as SUB_STATUS, G as GATEWAY, b as planPrice, P as PAY_STATUS } from "./chunks/format-DjWmiSLr.js";
import { r as roleName } from "./chunks/lookups-Cfp9TqGS.js";
import { A as Alert } from "./chunks/index-CoZNuKmg.js";
import { T as Tag } from "./chunks/index-DblzLh6y.js";
import { P as Popconfirm } from "./chunks/index-CBMipQNv.js";
import { T as Tabs } from "./chunks/index-WOnEJu5p.js";
import { D as Descriptions, T as Timeline } from "./chunks/Timeline-DIVvfqPO.js";
import { I as Input } from "./chunks/index-vq8i8Snb.js";
import { D as Dropdown, F as ForwardTable } from "./chunks/Table-B97Zri6O.js";
import "./chunks/useBreakpoint-DJXkR6lG.js";
import "./chunks/index-CRoY-Qmr.js";
import "./chunks/index-BrCu-FXS.js";
import "./chunks/index-_8mLokV3.js";
import "./chunks/index-BUcQTrsH.js";
import "./chunks/index-BDXpcJpj.js";
const EVENT_COLOR = { grant: "green", activate: "green", approve: "green", payment: "blue", renew: "blue", cancel: "orange", hold: "orange", expire: "red", revoke: "red", reject: "red", pending: "gray" };
function SubscriptionCard({ s, onAction }) {
  const plan = s.plan || { name: `#${s.plan_id}`, color: "#94a3b8" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-sub-card", style: { "--c": plan.color }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-sub-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-sub-name", children: [
          plan.name,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: s.status, label: SUB_STATUS[s.status] || s.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-muted", children: [
          s.plan ? planPrice(s.plan) : "",
          " · ",
          GATEWAY[s.gateway] || s.gateway,
          s.gateway_managed ? ` · ${s.gateway_subscription_id}` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dropdown, { trigger: ["click"], menu: {
        items: [
          { key: "change", label: __("Change plan", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLayerGroup }) },
          { key: "edit", label: __("Change dates / status", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalendarPlus }) },
          { key: "activate", label: __("Activate", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserCheck }), disabled: !["pending", "on_hold", "expired"].includes(s.status) },
          { key: "cancel", label: __("Cancel (keep access until it ends)", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBan }), disabled: ["canceled", "expired"].includes(s.status) },
          { key: "expire", label: __("Expire now", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBan }), danger: true, disabled: s.status === "expired" },
          { type: "divider" },
          { key: "delete", label: __("Remove membership", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }), danger: true }
        ],
        onClick: ({ key }) => onAction(key, s)
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEllipsis }), children: __("Manage", "memberglut") }) })
    ] }),
    s.scheduled_plan && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { type: "info", showIcon: true, style: { margin: "10px 0" }, message: sprintf(__("Moves to %1$s on %2$s.", "memberglut"), s.scheduled_plan.name, date(s.expires)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-sub-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Started", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: date(s.started) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.status === "canceled" ? __("Access until", "memberglut") : __("Expires", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: s.expires ? date(s.expires) : __("Never", "memberglut") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Next payment", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: s.next_payment && ["active", "trialing"].includes(s.status) ? `${money(s.billing_amount)} · ${date(s.next_payment)}` : "—" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Role given", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: s.plan && s.plan.role ? roleName(s.plan.role) : "—" })
      ] }),
      s.cycles_total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Payments", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: sprintf(__("%1$d of %2$d", "memberglut"), s.cycles_done, s.cycles_total) })
      ] }),
      s.trial_ends && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Trial ends", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: date(s.trial_ends) })
      ] })
    ] })
  ] });
}
function PaymentsTab({ userId }) {
  const [rows, setRows] = reactExports.useState(null);
  reactExports.useEffect(() => {
    getPayments({ user: userId, per_page: 50 }).then((r) => setRows(r.items || [])).catch(() => setRows([]));
  }, [userId]);
  if (!rows) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { active: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable, { size: "middle", rowKey: "id", pagination: false, dataSource: rows, locale: { emptyText: __("No payments yet.", "memberglut") }, columns: [
    { title: "#", dataIndex: "id", render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: link("payments", { payment: v }), children: [
      "#",
      v
    ] }) },
    { title: __("Date", "memberglut"), dataIndex: "date", render: date },
    { title: __("Plan", "memberglut"), dataIndex: "plan" },
    { title: __("Method", "memberglut"), dataIndex: "gateway", render: (v) => GATEWAY[v] || v },
    { title: __("Status", "memberglut"), dataIndex: "status", render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: v, label: PAY_STATUS[v] }) },
    { title: __("Amount", "memberglut"), dataIndex: "amount", align: "right", render: (v, r) => money(v, r.currency) }
  ] });
}
function ActivityTab({ userId }) {
  const [items, setItems] = reactExports.useState(null);
  reactExports.useEffect(() => {
    getEvents({ user: userId, per_page: 50 }).then((r) => setItems(r.items)).catch(() => setItems([]));
  }, [userId]);
  if (!items) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { active: true });
  if (!items.length) return /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { description: __("No activity yet.", "memberglut") });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { style: { marginTop: 12 }, items: items.map((e) => ({
    color: EVENT_COLOR[e.type] || "gray",
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: e.text }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-muted", children: [
        dateTime(e.date),
        " · ",
        e.by
      ] })
    ] })
  })) });
}
function LoginsTab({ userId }) {
  const [rows, setRows] = reactExports.useState(null);
  reactExports.useEffect(() => {
    getLogins({ user: userId }).then(setRows).catch(() => setRows([]));
  }, [userId]);
  if (!rows) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { active: true });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable, { size: "middle", rowKey: "id", pagination: false, dataSource: rows, locale: { emptyText: __("No logins recorded yet.", "memberglut") }, columns: [
    { title: __("When", "memberglut"), dataIndex: "date", render: (v) => fromNow(v) },
    { title: __("Device", "memberglut"), dataIndex: "device", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      v || __("Unknown device", "memberglut"),
      " ",
      r.current && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "green", bordered: false, children: __("Active now", "memberglut") })
    ] }) },
    { title: "IP", dataIndex: "ip" }
  ] });
}
function MemberDetail() {
  const { message, modal } = App.useApp();
  const userId = Number(queryArg("user") || queryArg("id"));
  const [m, setM] = reactExports.useState(null);
  const [error, setError] = reactExports.useState("");
  const [note, setNote] = reactExports.useState("");
  const [edit, setEdit] = reactExports.useState(null);
  const [changePlan, setChangePlan] = reactExports.useState(null);
  const load = () => getMember(userId).then(setM).catch((e) => setError(e.message));
  reactExports.useEffect(() => {
    load();
  }, []);
  if (error) return /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { type: "error", showIcon: true, message: error, action: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: link("members"), children: __("All members", "memberglut") }) });
  if (!m) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { active: true, avatar: true, paragraph: { rows: 10 } });
  const run = async (fn, ok) => {
    try {
      const r = await fn();
      if (r && r.user) setM(r);
      else load();
      if (ok) message.success(ok);
    } catch (e) {
      message.error(e.message);
    }
  };
  const subAction = (key, s) => {
    if (key === "change") setChangePlan(s);
    else if (key === "edit") setEdit({ sub: s, isNew: false });
    else if (key === "activate") run(() => subscriptionAction(s.id, "activate"), __("Subscription activated.", "memberglut"));
    else if (key === "cancel") {
      modal.confirm({
        title: __("Cancel this subscription?", "memberglut"),
        content: s.gateway_managed ? __("Automatic renewal is stopped at the payment gateway too.", "memberglut") : __("Automatic renewal stops.", "memberglut"),
        okText: __("Cancel subscription", "memberglut"),
        cancelText: __("Keep", "memberglut"),
        okButtonProps: { danger: true },
        onOk: () => run(() => subscriptionAction(s.id, "cancel"), __("Subscription canceled.", "memberglut"))
      });
    } else if (key === "expire") {
      modal.confirm({
        title: __("Expire now?", "memberglut"),
        content: __("Access ends immediately.", "memberglut"),
        okButtonProps: { danger: true },
        onOk: () => run(() => subscriptionAction(s.id, "expire"), __("Subscription expired.", "memberglut"))
      });
    } else if (key === "delete") {
      modal.confirm({
        title: __("Remove this membership?", "memberglut"),
        content: __("The subscription is deleted. Payments are kept.", "memberglut"),
        okButtonProps: { danger: true },
        onOk: () => run(async () => {
          await deleteSubscription(s.id);
        }, __("Membership removed.", "memberglut"))
      });
    }
  };
  const saveEdit = async (v) => {
    const fmt = (d) => d ? d.format("YYYY-MM-DD") : "";
    if (edit.isNew) {
      await run(() => addMember({ who: "existing", user_id: userId, plan_id: v.plan_id, status: v.status, start: fmt(v.start), expiry: v.expiry, expiry_date: fmt(v.expiry_date), send_email: true }), __("Plan added.", "memberglut"));
    } else {
      await run(() => updateSubscription(edit.sub.id, { plan_id: v.plan_id, status: v.status, start: fmt(v.start), expires: fmt(v.expires) }), __("Subscription updated.", "memberglut"));
    }
    setEdit(null);
  };
  const pending = ["pending_email", "pending_admin"].includes(m.account_status);
  const u = m.user;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: link("members"), className: "mg-back-link", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faChevronLeft }),
      " ",
      __("All members", "memberglut")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-member-hero", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { size: 64, src: u.avatar, style: { background: "#e94560", fontSize: 22, fontWeight: 700 }, children: initials(u.name) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-member-hero-main", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-page-title", children: [
          u.name,
          " ",
          m.account_status === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "red", bordered: false, children: __("Rejected", "memberglut") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-member-meta", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: u.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "@",
            u.username
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sprintf(__("Registered %s", "memberglut"), date(u.registered)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-page-actions", children: [
        pending && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserCheck }), onClick: () => run(() => memberAction(userId, "approve"), __("Member approved.", "memberglut")), children: __("Approve", "memberglut") }),
        pending && /* @__PURE__ */ jsxRuntimeExports.jsx(Popconfirm, { title: __("Reject this registration?", "memberglut"), okButtonProps: { danger: true }, onConfirm: () => run(() => memberAction(userId, "reject"), __("Registration rejected.", "memberglut")), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { danger: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserXmark }), children: __("Reject", "memberglut") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEnvelope }), href: `mailto:${u.email}`, children: __("Email", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserPen }), href: u.edit_url, children: __("Edit user", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), onClick: () => setEdit({ sub: null, isNew: true }), children: __("Add plan", "memberglut") })
      ] })
    ] }),
    m.account_status === "pending_email" && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { style: { marginBottom: 16 }, type: "warning", showIcon: true, message: __("This member has not confirmed their email address yet.", "memberglut"), action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "small", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPaperPlane }), onClick: () => run(() => memberAction(userId, "resend-activation"), __("Confirmation email sent again.", "memberglut")), children: __("Resend", "memberglut") }) }),
    m.account_status === "pending_admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { style: { marginBottom: 16 }, type: "warning", showIcon: true, message: __("This account is waiting for your approval. It cannot log in yet.", "memberglut") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-detail-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-title", children: __("Subscriptions", "memberglut") }),
          m.subscriptions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { description: __("No plan yet.", "memberglut") }) : m.subscriptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionCard, { s, onAction: subAction }, s.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card mg-card-tabs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { items: [
          { key: "payments", label: __("Payments", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentsTab, { userId }) },
          { key: "activity", label: __("Activity", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTab, { userId }) },
          { key: "logins", label: __("Logins", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginsTab, { userId }) }
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-title", children: __("Profile", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Descriptions, { column: 1, size: "small", className: "mg-desc", items: [
            { label: __("User ID", "memberglut"), children: u.id },
            { label: __("Roles", "memberglut"), children: u.roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: r }, r)) },
            { label: __("Registered", "memberglut"), children: date(u.registered) },
            { label: __("Last login", "memberglut"), children: u.last_login ? fromNow(u.last_login) : "—" },
            { label: __("Lifetime value", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: money(m.ltv) }) },
            ...m.fields.map((f) => ({ label: f.label, children: f.value || "—" })),
            { label: __("Consent", "memberglut"), children: m.consents.length ? m.consents.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: sprintf(__("%1$s accepted on %2$s", "memberglut"), c.label || c.type, dateTime(c.time)) }, i)) : "—" }
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card-title", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faNoteSticky, style: { marginRight: 8, color: "#e94560" } }),
            __("Admin notes", "memberglut"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-notes-hint", children: __("Only admins see these", "memberglut") })
          ] }),
          m.notes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-note", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-note-head", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: n.author }),
              " · ",
              fromNow(n.date),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "mg-note-del", onClick: () => deleteNote(userId, n.id).then((notes) => setM({ ...m, notes })), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-note-text", children: n.text })
          ] }, n.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input.TextArea, { rows: 3, value: note, onChange: (e) => setNote(e.target.value), placeholder: __("Add a private note…", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { style: { marginTop: 8 }, disabled: !note.trim(), onClick: () => addNote(userId, note).then((notes) => {
            setM({ ...m, notes });
            setNote("");
          }).catch((e) => message.error(e.message)), children: __("Add note", "memberglut") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-danger-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-title", children: __("Account", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-danger-list", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { block: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faKey }), onClick: () => run(() => memberAction(userId, "password-reset"), __("Password reset email sent.", "memberglut")), children: __("Send password reset", "memberglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { block: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRightFromBracket }), disabled: !m.sessions, onClick: () => run(() => memberAction(userId, "logout-all"), __("Logged out of all devices.", "memberglut")), children: sprintf(__("Log out everywhere (%d)", "memberglut"), m.sessions) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Popconfirm, { title: __("Remove all memberships of this user?", "memberglut"), okButtonProps: { danger: true }, onConfirm: () => run(() => memberAction(userId, "remove-all"), __("Memberships removed.", "memberglut")), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { block: true, danger: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }), disabled: !m.subscriptions.length, children: __("Remove memberships", "memberglut") }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditSubscriptionModal, { open: !!edit, sub: edit && edit.sub, isNew: edit && edit.isNew, statuses: SUB_STATUS, onCancel: () => setEdit(null), onOk: saveEdit }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChangePlanModal,
      {
        open: !!changePlan,
        gatewayManaged: changePlan && changePlan.gateway_managed,
        onCancel: () => setChangePlan(null),
        onOk: async (planId) => {
          await run(() => subscriptionAction(changePlan.id, "change-plan", { plan_id: planId }), __("Plan changed.", "memberglut"));
          setChangePlan(null);
        }
      }
    )
  ] });
}
function MemberDetailPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "members", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MemberDetail, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(MemberDetailPage, {}));
