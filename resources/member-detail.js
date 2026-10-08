import { cV as jsxRuntimeExports, P as Page, b as App, d8 as reactExports, d6 as queryArg, a0 as Skeleton, q as FontAwesomeIcon, a_ as faChevronLeft, a8 as __, cW as link, c as Button, bZ as faUserCheck, ba as faEnvelope, c1 as faUserPen, bF as faPlus, a2 as StatusBadge, bz as faNoteSticky, bW as faTrashCan, br as faKey, bI as faRightFromBracket, b9 as faEllipsis, bs as faLayerGroup, aX as faCalendarPlus, aP as faBan, aE as createRoot } from "./chunks/Page-DwAue1bn.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { q as dayjs, J as getMember, g as PAYMENTS, S as Select, h as PLANS } from "./chunks/api-Brv-883T.js";
import { i as initials, d as date, G as GATEWAY, P as PAY_STATUS, m as money, a as dateTime, f as fromNow, S as SUB_STATUS, b as planPrice } from "./chunks/format-DUqbTEWL.js";
import { A as Avatar } from "./chunks/index-a_klCc8e.js";
import { T as Tabs } from "./chunks/index-DbvrDALF.js";
import { F as ForwardTable } from "./chunks/Table-Dszdb13s.js";
import { T as Timeline, D as Descriptions } from "./chunks/Timeline-e_yzr0-s.js";
import { T as Tag } from "./chunks/index-DCZRJZ7q.js";
import { I as Input } from "./chunks/index-DR_RfPho.js";
import { P as Popconfirm } from "./chunks/index-ZXRyaDui.js";
import { M as Modal } from "./chunks/index-f93o2WLB.js";
import { F as Form } from "./chunks/index-CATG0Lu4.js";
import { D as DatePicker } from "./chunks/index-dboLsXN4.js";
import { D as Dropdown } from "./chunks/index-DOVNlVrd.js";
import "./chunks/useBreakpoint-DMP4aqmU.js";
import "./chunks/index-CjCriZ9v.js";
import "./chunks/index-CJWEZhJV.js";
import "./chunks/index-DYg9RGnF.js";
function SubscriptionCard({ m, onAction }) {
  const plan = PLANS.find((p) => p.id === m.plan_id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-sub-card", style: { "--c": plan.color }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-sub-head", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-sub-name", children: [
          plan.name,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: m.status, label: SUB_STATUS[m.status] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-muted", children: [
          planPrice(plan),
          " · ",
          GATEWAY[m.gateway]
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dropdown, { trigger: ["click"], menu: {
        items: [
          { key: "change", label: __("Change plan", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLayerGroup }) },
          { key: "extend", label: __("Change dates", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCalendarPlus }) },
          { key: "cancel", label: __("Cancel (keep access until it ends)", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBan }) },
          { key: "expire", label: __("Expire now", "memberglut"), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBan }), danger: true }
        ],
        onClick: ({ key }) => onAction(key)
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEllipsis }), children: __("Manage", "memberglut") }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-sub-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Started", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: date(m.started) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Expires", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: m.expires ? date(m.expires) : __("Never", "memberglut") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Next payment", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: plan.billing === "recurring" && m.status === "active" ? `${money(plan.price)} · ${date(m.expires)}` : "—" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Role given", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: plan.role.replace("memberglut_", "") })
      ] })
    ] })
  ] });
}
function MemberDetail() {
  const { message } = App.useApp();
  const [m, setM] = reactExports.useState(null);
  const [notes, setNotes] = reactExports.useState([{ id: 1, author: "admin", text: "Asked for an invoice with company VAT number.", date: dayjs().subtract(3, "day").format() }]);
  const [note, setNote] = reactExports.useState("");
  const [editOpen, setEditOpen] = reactExports.useState(null);
  reactExports.useEffect(() => {
    getMember(queryArg("id")).then(setM);
  }, []);
  if (!m) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { active: true, avatar: true, paragraph: { rows: 10 } });
  const payments = PAYMENTS.filter((p) => p.member_id === m.id).concat(PAYMENTS.slice(0, 2).map((p) => ({ ...p, id: p.id + 900, name: m.name })));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: link("members"), className: "mg-back-link", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faChevronLeft }),
      " ",
      __("All members", "memberglut")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-member-hero", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { size: 64, style: { background: "#e94560", fontSize: 22, fontWeight: 700 }, children: initials(m.name) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-member-hero-main", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-page-title", children: m.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-member-meta", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "@",
            m.username
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sprintf(__("Member since %s", "memberglut"), date(m.started)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-page-actions", children: [
        m.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserCheck }), children: __("Approve", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEnvelope }), href: `mailto:${m.email}`, children: __("Email", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserPen }), href: `user-edit.php?user_id=${m.user_id}`, children: __("Edit user", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), onClick: () => setEditOpen("add"), children: __("Add plan", "memberglut") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-detail-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-title", children: __("Subscriptions", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SubscriptionCard, { m, onAction: (k) => setEditOpen(k) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card mg-card-tabs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { items: [
          {
            key: "payments",
            label: __("Payments", "memberglut"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable, { size: "middle", rowKey: "id", pagination: false, dataSource: payments, columns: [
              { title: "#", dataIndex: "id" },
              { title: __("Date", "memberglut"), dataIndex: "date", render: date },
              { title: __("Plan", "memberglut"), dataIndex: "plan" },
              { title: __("Method", "memberglut"), dataIndex: "gateway", render: (v) => GATEWAY[v] },
              { title: __("Status", "memberglut"), dataIndex: "status", render: (v) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: v, label: PAY_STATUS[v] }) },
              { title: __("Amount", "memberglut"), dataIndex: "amount", align: "right", render: (v) => money(v) }
            ] })
          },
          {
            key: "activity",
            label: __("Activity", "memberglut"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { style: { marginTop: 12 }, items: [
              { color: "green", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: __("Subscription activated", "memberglut") }),
                " · Silver",
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: dateTime(m.started) })
              ] }) },
              { color: "blue", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: __("Payment completed", "memberglut") }),
                " · $9.00 Stripe",
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: dateTime(m.started) })
              ] }) },
              { color: "gray", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: __("Email sent", "memberglut") }),
                " · ",
                __("Welcome / registration", "memberglut"),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: dateTime(m.started) })
              ] }) },
              { color: "gray", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: __("Account created", "memberglut") }),
                " · ",
                __("via registration form", "memberglut"),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: dateTime(m.started) })
              ] }) }
            ] })
          },
          {
            key: "logins",
            label: __("Logins", "memberglut"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable, { size: "middle", rowKey: "t", pagination: false, dataSource: [
              { t: 1, date: m.last_login, ip: "103.48.17.22", device: "Chrome · Windows", current: true },
              { t: 2, date: dayjs(m.last_login).subtract(2, "day").format(), ip: "103.48.17.22", device: "Safari · iPhone" },
              { t: 3, date: dayjs(m.last_login).subtract(9, "day").format(), ip: "182.160.3.9", device: "Firefox · Linux" }
            ], columns: [
              { title: __("When", "memberglut"), dataIndex: "date", render: (v) => fromNow(v) },
              { title: __("Device", "memberglut"), dataIndex: "device", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                v,
                " ",
                r.current && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "green", bordered: false, children: __("Active now", "memberglut") })
              ] }) },
              { title: "IP", dataIndex: "ip" }
            ] })
          }
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-title", children: __("Profile", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Descriptions, { column: 1, size: "small", className: "mg-desc", items: [
            { label: __("User ID", "memberglut"), children: m.user_id },
            { label: __("Role", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: m.role }) },
            { label: __("Registered", "memberglut"), children: date(m.started) },
            { label: __("Last login", "memberglut"), children: fromNow(m.last_login) },
            { label: __("Lifetime value", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: money(m.total_spent) }) },
            { label: __("Phone", "memberglut"), children: "+880 1711-000000" },
            { label: __("Consent", "memberglut"), children: sprintf(__("Terms & privacy accepted on %s", "memberglut"), date(m.started)) }
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card-title", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faNoteSticky, style: { marginRight: 8, color: "#e94560" } }),
            __("Admin notes", "memberglut"),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-notes-hint", children: __("Only admins see these", "memberglut") })
          ] }),
          notes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-note", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-note-head", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: n.author }),
              " · ",
              fromNow(n.date),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "mg-note-del", onClick: () => setNotes(notes.filter((x) => x.id !== n.id)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-note-text", children: n.text })
          ] }, n.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input.TextArea, { rows: 3, value: note, onChange: (e) => setNote(e.target.value), placeholder: __("Add a private note…", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { style: { marginTop: 8 }, disabled: !note.trim(), onClick: () => {
            setNotes([...notes, { id: Date.now(), author: "admin", text: note, date: dayjs().format() }]);
            setNote("");
          }, children: __("Add note", "memberglut") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-card mg-danger-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-card-title", children: __("Account", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-danger-list", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { block: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faKey }), onClick: () => message.success(__("Password reset email sent.", "memberglut")), children: __("Send password reset", "memberglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { block: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faRightFromBracket }), onClick: () => message.success(__("Logged out of all devices.", "memberglut")), children: __("Log out everywhere", "memberglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Popconfirm, { title: __("Remove all memberships of this user?", "memberglut"), onConfirm: () => message.success(__("Memberships removed.", "memberglut")), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { block: true, danger: true, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }), children: __("Remove memberships", "memberglut") }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: !!editOpen,
        onCancel: () => setEditOpen(null),
        onOk: () => {
          setEditOpen(null);
          message.success(__("Subscription updated.", "memberglut"));
        },
        title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: editOpen === "add" ? __("Add a plan", "memberglut") : __("Edit subscription", "memberglut") }),
        okText: __("Save", "memberglut"),
        destroyOnClose: true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { layout: "vertical", initialValues: { plan_id: m.plan_id, status: m.status, start: dayjs(m.started), end: m.expires ? dayjs(m.expires) : null }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "plan_id", label: __("Plan", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: PLANS.map((p) => ({ value: p.id, label: p.name })) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "status", label: __("Status", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: Object.entries(SUB_STATUS).map(([value, label]) => ({ value, label })) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "start", label: __("Start", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "end", label: __("Expires", "memberglut"), extra: __("Empty = never", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" } }) })
          ] })
        ] })
      }
    )
  ] });
}
function MemberDetailPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "members", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MemberDetail, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(MemberDetailPage, {}));
