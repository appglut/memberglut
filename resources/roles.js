import { aZ as faCheck, bx as faMinus, aO as faBan, a8 as __, cW as jsxRuntimeExports, P as Page, b as App, d9 as reactExports, a0 as Skeleton, E as PageHeader, c as Button, q as FontAwesomeIcon, bg as faFileImport, bf as faFileExport, bF as faPlus, bu as faLock, b9 as faEllipsis, b5 as faCopy, c5 as faUserShield, bX as faTrashCan, bi as faFloppyDisk, b1 as faCircleInfo, bv as faMagnifyingGlass, cb as faXmark, aD as createRoot } from "./chunks/Page-Ch8DcxYv.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { ag as getRoles, Z as getCapabilities, af as getRoleOptions, T as Tooltip, E as Empty, K as exportRoles, aL as saveRoleOptions, ax as makeDefaultRole, aK as saveRole, v as deleteCapability, k as addCapability, S as Select, r as cloneRole, u as createRole, aB as previewRoleImport, z as deleteRole, aq as importRoles } from "./chunks/api-C3opcxY4.js";
import { U as Upload } from "./chunks/index-BDu_JW7A.js";
import { T as Tag } from "./chunks/index-8aTEZ5cr.js";
import { S as Switch } from "./chunks/index-DYGuXoRz.js";
import { D as Dropdown, F as ForwardTable } from "./chunks/Table-Bxvjbdok.js";
import { S as Segmented } from "./chunks/index-B15yPtij.js";
import { I as Input } from "./chunks/index-D-BW9vN4.js";
import { F as Form } from "./chunks/index--FwfDeQZ.js";
import { M as Modal } from "./chunks/index-BtIaElEq.js";
import { A as Alert } from "./chunks/index-dB_sQhvz.js";
import "./chunks/progress-C7I7l5SB.js";
import "./chunks/useBreakpoint-m1SzewdH.js";
import "./chunks/index-D6ChUS7m.js";
const STATE_OPTS = [
  { value: "grant", icon: faCheck, label: __("Grant", "memberglut") },
  { value: "unset", icon: faMinus, label: __("Not set", "memberglut") },
  { value: "deny", icon: faBan, label: __("Deny", "memberglut") }
];
function CapToggle({ value, onChange, disabled }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mg-tri ${disabled ? "is-disabled" : ""}`, children: STATE_OPTS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: o.label, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled, className: `${o.value} ${value === o.value ? "on" : ""}`, onClick: () => onChange(o.value), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: o.icon }) }) }, o.value)) });
}
function NewRoleModal({ open, onClose, roles, onCreate, source }) {
  const [form] = Form.useForm();
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open) form.setFieldsValue({ name: source ? sprintf(__("%s (copy)", "memberglut"), source.name) : "", slug: source ? `${source.slug}_copy` : "", clone: source ? source.slug : "subscriber" });
  }, [open]);
  const submit = async () => {
    const v = await form.validateFields();
    setSaving(true);
    try {
      await onCreate(v);
      form.resetFields();
    } catch (e) {
      form.setFields(Object.entries(e.fields || {}).map(([name, msg]) => ({ name, errors: [msg] })));
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: source ? __("Clone role", "memberglut") : __("Add role", "memberglut") }), open, onCancel: onClose, okText: source ? __("Clone role", "memberglut") : __("Create role", "memberglut"), confirmLoading: saving, onOk: submit, destroyOnClose: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { form, layout: "vertical", requiredMark: false, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "name", label: __("Role name", "memberglut"), rules: [{ required: true, message: __("Enter a name.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: __("e.g. Course Instructor", "memberglut") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "slug", label: __("Role key", "memberglut"), extra: __("Lowercase letters, numbers and underscores. Cannot be changed later. Empty creates it from the name.", "memberglut"), normalize: (v) => (v || "").toLowerCase().replace(/[^a-z0-9_]/g, "_"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "course_instructor" }) }),
    !source && /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "clone", label: __("Start with the capabilities of", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: [{ value: "", label: __("— No capabilities —", "memberglut") }, ...roles.map((r) => ({ value: r.slug, label: r.name }))] }) })
  ] }) });
}
function DeleteRoleModal({ role, roles, onClose, onDeleted }) {
  const { message } = App.useApp();
  const [replacement, setReplacement] = reactExports.useState("subscriber");
  const [saving, setSaving] = reactExports.useState(false);
  if (!role) return null;
  const used = role.used_by_plans || [];
  const submit = async () => {
    setSaving(true);
    try {
      const list = await deleteRole(role.slug, replacement);
      onDeleted(list);
      message.success(__("Role deleted.", "memberglut"));
    } catch (e) {
      message.error(e.message);
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { open: true, title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: sprintf(__("Delete “%s”?", "memberglut"), role.name) }), onCancel: onClose, onOk: submit, okText: __("Delete role", "memberglut"), okButtonProps: { danger: true }, confirmLoading: saving, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: sprintf(__("%d users have this role. Users who have no other role get the role below.", "memberglut"), role.users) }),
    used.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { type: "warning", showIcon: true, style: { marginBottom: 12 }, message: sprintf(__("Used by the plans %s. They will give the role below instead.", "memberglut"), used.map((p) => p.name).join(", ")) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: replacement, onChange: setReplacement, style: { width: "100%" }, options: roles.filter((r) => r.slug !== role.slug && r.slug !== "administrator").map((r) => ({ value: r.slug, label: r.name })) })
  ] });
}
function ImportModal({ data, onClose, onDone }) {
  const { message } = App.useApp();
  const [preview, setPreview] = reactExports.useState(null);
  const [choices, setChoices] = reactExports.useState({});
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!data) return;
    previewRoleImport({ data }).then((rows) => {
      setPreview(rows);
      setChoices(Object.fromEntries(rows.map((r) => [r.slug, r.state === "new" ? "import" : r.state === "changed" ? "overwrite" : "skip"])));
    }).catch((e) => {
      message.error(e.message);
      onClose();
    });
  }, [data]);
  if (!data) return null;
  const STATE = { new: [__("New", "memberglut"), "green"], changed: [__("Differs", "memberglut"), "orange"], same: [__("Same", "memberglut"), "default"], protected: [__("Protected", "memberglut"), "red"] };
  const submit = async () => {
    setSaving(true);
    try {
      const r = await importRoles({ data, choices });
      message.success(sprintf(__("Import done: %1$d created, %2$d updated, %3$d skipped.", "memberglut"), r.summary.created, r.summary.updated, r.summary.skipped));
      onDone(r);
    } catch (e) {
      message.error(e.message);
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { open: true, width: 760, title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Import roles", "memberglut") }), onCancel: onClose, onOk: submit, okText: __("Import", "memberglut"), confirmLoading: saving, children: !preview ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { active: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ForwardTable, { size: "small", rowKey: "slug", pagination: false, dataSource: preview, columns: [
    { title: __("Role", "memberglut"), dataIndex: "name", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: v }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-muted", children: [
        r.slug,
        " · ",
        sprintf(__("%d capabilities", "memberglut"), r.caps)
      ] })
    ] }) },
    { title: __("On this site", "memberglut"), dataIndex: "state", render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: STATE[v][1], bordered: false, children: STATE[v][0] }),
      v === "changed" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-muted", children: sprintf(__("+%1$d · −%2$d · %3$d changed", "memberglut"), r.diff.added.length, r.diff.removed.length, r.diff.changed.length) })
    ] }) },
    {
      title: __("Action", "memberglut"),
      render: (v, r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select,
        {
          size: "small",
          style: { width: 170 },
          value: choices[r.slug],
          disabled: r.state === "protected",
          onChange: (c) => setChoices({ ...choices, [r.slug]: c }),
          options: r.state === "new" ? [{ value: "import", label: __("Import", "memberglut") }, { value: "skip", label: __("Skip", "memberglut") }] : [{ value: "overwrite", label: __("Overwrite", "memberglut") }, { value: "rename", label: __("Import as a copy", "memberglut") }, { value: "skip", label: __("Skip", "memberglut") }]
        }
      )
    }
  ] }) });
}
function Roles() {
  const { message, modal } = App.useApp();
  const [roles, setRoles] = reactExports.useState([]);
  const [groups, setGroups] = reactExports.useState([]);
  const [caps, setCaps] = reactExports.useState({});
  const [custom, setCustom] = reactExports.useState([]);
  const [current, setCurrent] = reactExports.useState("");
  const [group, setGroup] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [dirty, setDirty] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [newOpen, setNewOpen] = reactExports.useState(false);
  const [cloneFrom, setCloneFrom] = reactExports.useState(null);
  const [deleting, setDeleting] = reactExports.useState(null);
  const [importData, setImportData] = reactExports.useState(null);
  const [newCap, setNewCap] = reactExports.useState("");
  const [options, setOptions] = reactExports.useState({ multi_roles: true, rescue: true });
  const applyCaps = (c) => {
    setGroups(c.groups);
    setCaps(c.roleCaps);
    setCustom(c.custom || []);
  };
  reactExports.useEffect(() => {
    Promise.all([getRoles(), getCapabilities(), getRoleOptions()]).then(([r, c, o]) => {
      setRoles(r);
      applyCaps(c);
      setOptions(o);
      const fromUrl = new URLSearchParams(window.location.search).get("role");
      setCurrent((r.find((x) => x.slug === fromUrl) || r.find((x) => x.slug === "memberglut_premium") || r.find((x) => !x.protected) || r[0]).slug);
    }).catch((e) => message.error(e.message));
  }, []);
  const role = roles.find((r) => r.slug === current);
  const roleCaps = caps[current] || {};
  const visibleGroups = groups.filter((g) => group === "all" || g.key === group);
  const counts = reactExports.useMemo(() => {
    const vals = Object.entries(roleCaps).filter(([k]) => !/^level_\d+$/.test(k)).map(([, v]) => v);
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
    setSaving(true);
    try {
      const r = await saveRole({ slug: current, caps: roleCaps });
      setCaps((all) => ({ ...all, [current]: r.caps }));
      setRoles(r.roles);
      setDirty(false);
      message.success(sprintf(__("“%s” saved.", "memberglut"), role.name));
    } catch (e) {
      message.error(e.message);
    } finally {
      setSaving(false);
    }
  };
  const switchRole = (slug) => {
    if (dirty) {
      modal.confirm({
        title: __("Discard unsaved changes?", "memberglut"),
        onOk: () => getCapabilities().then((c) => {
          applyCaps(c);
          setDirty(false);
          setCurrent(slug);
        })
      });
      return;
    }
    setCurrent(slug);
  };
  const afterCreate = (r) => {
    setRoles(r.roles);
    applyCaps(r);
    setCurrent(r.slug);
    setDirty(false);
  };
  const create = async (v) => {
    const r = cloneFrom ? await cloneRole(cloneFrom.slug, v) : await createRole(v);
    afterCreate(r);
    setNewOpen(false);
    setCloneFrom(null);
    message.success(__("Role created.", "memberglut"));
  };
  const makeDefault = async () => {
    try {
      setRoles(await makeDefaultRole(current));
      message.success(__("Default role changed.", "memberglut"));
    } catch (e) {
      message.error(e.message);
    }
  };
  const exportRoles$1 = async () => {
    try {
      await exportRoles([]);
    } catch (e) {
      message.error(e.message);
    }
  };
  const readImport = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        setImportData(JSON.parse(reader.result));
      } catch (e) {
        message.error(__("This file is not valid JSON.", "memberglut"));
      }
    };
    reader.readAsText(file);
    return false;
  };
  const addCap = async () => {
    try {
      if (dirty) await saveRole({ slug: current, caps: roleCaps });
      const r = await addCapability(newCap, current);
      applyCaps(r);
      setDirty(false);
      setNewCap("");
      message.success(sprintf(__("Capability %s added and granted.", "memberglut"), r.cap));
    } catch (e) {
      message.error(e.message);
    }
  };
  const removeCap = (cap) => modal.confirm({
    title: sprintf(__("Remove the capability %s?", "memberglut"), cap),
    content: __("It is removed from every role.", "memberglut"),
    okButtonProps: { danger: true },
    onOk: async () => {
      try {
        applyCaps(await deleteCapability(cap));
      } catch (e) {
        message.error(e.message);
      }
    }
  });
  const saveOption = async (key, v) => {
    const next = { ...options, [key]: v };
    setOptions(next);
    try {
      setOptions(await saveRoleOptions(next));
      message.success(__("Saved.", "memberglut"));
    } catch (e) {
      message.error(e.message);
    }
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { accept: ".json,application/json", showUploadList: false, beforeUpload: readImport, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileImport }), children: __("Import", "memberglut") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFileExport }), onClick: exportRoles$1, children: __("Export", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "large", type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), onClick: () => {
            setCloneFrom(null);
            setNewOpen(true);
          }, children: __("Add role", "memberglut") })
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
            !r.builtin && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "pink", bordered: false, children: __("Custom", "memberglut") }),
            r.used_by_plans.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: r.used_by_plans.map((p) => p.name).join(", "), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { bordered: false, children: __("Plan", "memberglut") }) })
          ] })
        ] }, r.slug)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-role-options", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-role-opt", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: __("Multiple roles per user", "memberglut") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Checkboxes instead of one dropdown on the user screens.", "memberglut") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", checked: options.multi_roles, onChange: (v) => saveOption("multi_roles", v) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-role-opt", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: __("Admin rescue link", "memberglut") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Locked out? wp-login.php?action=memberglut_rescue emails a 15-minute link that restores the Administrator role.", "memberglut") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "small", checked: options.rescue, onChange: (v) => saveOption("rescue", v) })
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
                { key: "default", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faUserShield }), label: __("Make default for new users", "memberglut"), disabled: role.isDefault || locked },
                { type: "divider" },
                { key: "delete", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTrashCan }), label: __("Delete role", "memberglut"), danger: true, disabled: role.builtin || role.isDefault }
              ],
              onClick: ({ key }) => {
                if (key === "delete") setDeleting(role);
                else if (key === "clone") {
                  setCloneFrom(role);
                  setNewOpen(true);
                } else makeDefault();
              }
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faEllipsis }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", disabled: !dirty || locked, loading: saving, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFloppyDisk }), onClick: save, className: "mg-save-btn", children: __("Save role", "memberglut") })
          ] })
        ] }),
        locked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-note mg-note-warn", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleInfo }),
          " ",
          __("The Administrator role is protected so you cannot lock yourself out. Its capabilities can be viewed but not changed.", "memberglut")
        ] }),
        role.used_by_plans.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-note", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCircleInfo }),
          " ",
          sprintf(__("Members get this role from the plans: %s.", "memberglut"), role.used_by_plans.map((p) => p.name).join(", "))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-cap-toolbar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Segmented, { value: group, onChange: setGroup, options: [{ value: "all", label: __("All", "memberglut") }, ...groups.filter((g) => g.caps.length || g.key === "custom").map((g) => ({ value: g.key, label: g.label }))] }),
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
              g.key === "custom" && !locked && /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: __("Remove from every role", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "mg-cap-remove", onClick: () => removeCap(c), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faXmark }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CapToggle, { value: roleCaps[c] || "unset", onChange: (s) => setCap(c, s), disabled: locked })
            ] }, c)) })
          ] }, g.key);
        }),
        visibleGroups.every((g) => !g.caps.some((c) => !search || c.includes(search.toLowerCase()))) && /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { description: __("No capability matches.", "memberglut") }),
        !locked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-cap-add", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newCap, onChange: (e) => setNewCap(e.target.value.replace(/[^a-z0-9_]/gi, "_").toLowerCase()), onPressEnter: () => newCap && addCap(), placeholder: __("new_custom_capability", "memberglut"), style: { maxWidth: 320 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), disabled: !newCap || custom.includes(newCap), onClick: addCap, children: __("Add custom capability", "memberglut") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewRoleModal, { open: newOpen, roles, source: cloneFrom, onClose: () => {
      setNewOpen(false);
      setCloneFrom(null);
    }, onCreate: create }),
    deleting && /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteRoleModal, { role: deleting, roles, onClose: () => setDeleting(null), onDeleted: (list) => {
      setRoles(list);
      setDeleting(null);
      setCurrent("subscriber");
    } }),
    importData && /* @__PURE__ */ jsxRuntimeExports.jsx(ImportModal, { data: importData, onClose: () => setImportData(null), onDone: (r) => {
      setRoles(r.roles);
      applyCaps(r);
      setImportData(null);
    } })
  ] });
}
function RolesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "roles", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Roles, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(RolesPage, {}));
