import { aZ as faCheck, bx as faMinus, aP as faBan, a8 as __, cV as jsxRuntimeExports, P as Page, b as App, d8 as reactExports, a0 as Skeleton, E as PageHeader, c as Button, q as FontAwesomeIcon, bg as faFileImport, bf as faFileExport, bF as faPlus, bu as faLock, b9 as faEllipsis, b5 as faCopy, c4 as faUserShield, bW as faTrashCan, bi as faFloppyDisk, b1 as faCircleInfo, bv as faMagnifyingGlass, aE as createRoot } from "./chunks/Page-DwAue1bn.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { W as getRoles, z as getCapabilities, c as Empty, ab as saveRole, T as Tooltip, S as Select } from "./chunks/api-Brv-883T.js";
import { U as Upload } from "./chunks/index-C46497LZ.js";
import { T as Tag } from "./chunks/index-DCZRJZ7q.js";
import { S as Switch } from "./chunks/index-BdHVDZgL.js";
import { D as Dropdown } from "./chunks/index-DOVNlVrd.js";
import { S as Segmented } from "./chunks/index-jcrWDM9i.js";
import { I as Input } from "./chunks/index-DR_RfPho.js";
import { F as Form } from "./chunks/index-CATG0Lu4.js";
import { M as Modal } from "./chunks/index-f93o2WLB.js";
import "./chunks/progress-D4jg5yhU.js";
import "./chunks/useBreakpoint-DMP4aqmU.js";
const STATE_OPTS = [
  { value: "grant", icon: faCheck, label: __("Grant", "memberglut") },
  { value: "unset", icon: faMinus, label: __("Not set", "memberglut") },
  { value: "deny", icon: faBan, label: __("Deny", "memberglut") }
];
function CapToggle({ value, onChange, disabled }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mg-tri ${disabled ? "is-disabled" : ""}`, children: STATE_OPTS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: o.label, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled, className: `${o.value} ${value === o.value ? "on" : ""}`, onClick: () => onChange(o.value), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: o.icon }) }) }, o.value)) });
}
function NewRoleModal({ open, onClose, roles, onCreate }) {
  const [form] = Form.useForm();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Add role", "memberglut") }), open, onCancel: onClose, okText: __("Create role", "memberglut"), onOk: async () => {
    const v = await form.validateFields();
    onCreate(v);
    form.resetFields();
  }, destroyOnClose: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { form, layout: "vertical", requiredMark: false, initialValues: { clone: "subscriber" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "name", label: __("Role name", "memberglut"), rules: [{ required: true, message: __("Enter a name.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: __("e.g. Course Instructor", "memberglut") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "slug", label: __("Role key", "memberglut"), extra: __("Lowercase letters, numbers and underscores. Cannot be changed later.", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "course_instructor" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "clone", label: __("Start with the capabilities of", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: [{ value: "", label: __("— No capabilities —", "memberglut") }, ...roles.map((r) => ({ value: r.slug, label: r.name }))] }) })
  ] }) });
}
function Roles() {
  const { message, modal } = App.useApp();
  const [roles, setRoles] = reactExports.useState([]);
  const [groups, setGroups] = reactExports.useState([]);
  const [caps, setCaps] = reactExports.useState({});
  const [current, setCurrent] = reactExports.useState("memberglut_premium");
  const [group, setGroup] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [dirty, setDirty] = reactExports.useState(false);
  const [newOpen, setNewOpen] = reactExports.useState(false);
  const [newCap, setNewCap] = reactExports.useState("");
  const [options, setOptions] = reactExports.useState({ multi_roles: true, rescue: true });
  reactExports.useEffect(() => {
    Promise.all([getRoles(), getCapabilities()]).then(([r, c]) => {
      setRoles(r);
      setGroups(c.groups);
      setCaps(c.roleCaps);
    });
  }, []);
  const role = roles.find((r) => r.slug === current);
  const roleCaps = caps[current] || {};
  const visibleGroups = groups.filter((g) => group === "all" || g.key === group);
  const counts = reactExports.useMemo(() => {
    const vals = Object.values(roleCaps);
    return { grant: vals.filter((v) => v === "grant").length, deny: vals.filter((v) => v === "deny").length };
  }, [roleCaps]);
  const setCap = (cap, state) => {
    setCaps((all) => {
      const next = { ...all[current] || {} };
      if (state === "unset") delete next[cap];
      else next[cap] = state;
      return { ...all, [current]: next };
    });
    setDirty(true);
  };
  const setGroupState = (g, state) => g.caps.forEach((c) => setCap(c, state));
  const save = async () => {
    await saveRole({ slug: current, caps: roleCaps });
    setDirty(false);
    message.success(sprintf(__("“%s” saved.", "memberglut"), role.name));
  };
  const switchRole = (slug) => {
    if (dirty) {
      modal.confirm({ title: __("Discard unsaved changes?", "memberglut"), onOk: () => {
        setDirty(false);
        setCurrent(slug);
      } });
      return;
    }
    setCurrent(slug);
  };
  if (!role) return /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { active: true, paragraph: { rows: 12 } });
  const locked = role.protected;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: __("Roles & Capabilities", "memberglut"),
        subtitle: __("Create roles for your members and choose exactly what each role can do.", "memberglut"),
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { accept: ".json", showUploadList: false, beforeUpload: () => {
            message.info(__("Preview of the imported roles opens here.", "memberglut"));
            return false;
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileImport }), children: __("Import", "memberglut") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileExport }), onClick: () => message.success(__("roles.json downloaded.", "memberglut")), children: __("Export", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), onClick: () => setNewOpen(true), children: __("Add role", "memberglut") })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-roles-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "mg-role-list", children: [
        roles.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: r.slug === current ? "active" : "", onClick: () => switchRole(r.slug), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "n", children: [
            r.name,
            r.protected && /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLock, className: "lock" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "m", children: r.slug }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "c", children: r.users }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tags", children: [
            r.isDefault && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "blue", bordered: false, children: __("Default", "memberglut") }),
            !r.builtin && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "pink", bordered: false, children: __("Custom", "memberglut") })
          ] })
        ] }, r.slug)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-role-options", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-role-opt", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: __("Multiple roles per user", "memberglut") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Checkboxes instead of one dropdown on the user screen.", "memberglut") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", checked: options.multi_roles, onChange: (v) => setOptions({ ...options, multi_roles: v }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-role-opt", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: __("Admin rescue link", "memberglut") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Locked out? wp-login.php?action=memberglut_rescue emails a 15-minute link that restores the Administrator role.", "memberglut") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", checked: options.rescue, onChange: (v) => setOptions({ ...options, rescue: v }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mg-role-editor", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-role-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-role-title", children: [
              role.name,
              " ",
              locked && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faLock, style: { marginRight: 4 } }), bordered: false, children: __("Protected", "memberglut") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: sprintf(__("%1$s · %2$d users · %3$d granted · %4$d denied", "memberglut"), role.slug, role.users, counts.grant, counts.deny) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-actions", children: [
            dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-fs-unsaved", children: __("Unsaved changes", "memberglut") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Dropdown, { trigger: ["click"], menu: {
              items: [
                { key: "clone", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCopy }), label: __("Clone role", "memberglut") },
                { key: "default", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserShield }), label: __("Make default for new users", "memberglut"), disabled: role.isDefault },
                { type: "divider" },
                { key: "delete", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }), label: __("Delete role", "memberglut"), danger: true, disabled: role.builtin || role.isDefault }
              ],
              onClick: ({ key }) => {
                if (key === "delete") {
                  modal.confirm({ title: sprintf(__("Delete “%s”?", "memberglut"), role.name), content: sprintf(__("%d users will be moved to the default role.", "memberglut"), role.users), okButtonProps: { danger: true }, onOk: () => {
                    setRoles(roles.filter((r) => r.slug !== current));
                    setCurrent("subscriber");
                  } });
                } else message.success(key === "clone" ? __("Role cloned.", "memberglut") : __("Default role changed.", "memberglut"));
              }
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEllipsis }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", disabled: !dirty, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFloppyDisk }), onClick: save, className: "mg-save-btn", children: __("Save role", "memberglut") })
          ] })
        ] }),
        locked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-note mg-note-warn", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleInfo }),
          " ",
          __("The Administrator role is protected so you cannot lock yourself out. Its capabilities can be viewed but not changed.", "memberglut")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-cap-toolbar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Segmented, { value: group, onChange: setGroup, options: [{ value: "all", label: __("All", "memberglut") }, ...groups.map((g) => ({ value: g.key, label: g.label }))] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { allowClear: true, prefix: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMagnifyingGlass }), placeholder: __("Find a capability…", "memberglut"), value: search, onChange: (e) => setSearch(e.target.value), style: { width: 230 } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-cap-legend", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "grant", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCheck }) }),
            __("Grant", "memberglut")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "unset", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMinus }) }),
            __("Not set — another role of the user may grant it", "memberglut")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: "deny", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faBan }) }),
            __("Deny — wins over every other role", "memberglut")
          ] })
        ] }),
        visibleGroups.map((g) => {
          const list = g.caps.filter((c) => !search || c.includes(search.toLowerCase()));
          if (!list.length) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-cap-group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-cap-group-head", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: g.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: sprintf(__("%1$d of %2$d granted", "memberglut"), g.caps.filter((c) => roleCaps[c] === "grant").length, g.caps.length) }),
              !locked && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mg-cap-group-actions", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { onClick: () => setGroupState(g, "grant"), children: __("Grant all", "memberglut") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { onClick: () => setGroupState(g, "unset"), children: __("Clear", "memberglut") })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-cap-grid", children: list.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mg-cap s-${roleCaps[c] || "unset"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: c }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CapToggle, { value: roleCaps[c] || "unset", onChange: (s) => setCap(c, s), disabled: locked })
            ] }, c)) })
          ] }, g.key);
        }),
        visibleGroups.every((g) => !g.caps.some((c) => !search || c.includes(search.toLowerCase()))) && /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { description: __("No capability matches.", "memberglut") }),
        !locked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-cap-add", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newCap, onChange: (e) => setNewCap(e.target.value.replace(/[^a-z0-9_]/gi, "_").toLowerCase()), placeholder: __("new_custom_capability", "memberglut"), style: { maxWidth: 320 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), disabled: !newCap, onClick: () => {
            setGroups(groups.map((g) => g.key === "custom" ? { ...g, caps: [...g.caps, newCap] } : g));
            setCap(newCap, "grant");
            setNewCap("");
          }, children: __("Add custom capability", "memberglut") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewRoleModal, { open: newOpen, roles, onClose: () => setNewOpen(false), onCreate: (v) => {
      const slug = v.slug || v.name.toLowerCase().replace(/[^a-z0-9]+/g, "_");
      setRoles([...roles, { slug, name: v.name, users: 0, builtin: false, level: 0 }]);
      setCaps({ ...caps, [slug]: { ...caps[v.clone] || {} } });
      setCurrent(slug);
      setNewOpen(false);
      message.success(__("Role created.", "memberglut"));
    } })
  ] });
}
function RolesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "roles", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Roles, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(RolesPage, {}));
