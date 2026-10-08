import React, { useEffect, useMemo, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import {
  App, Button, Input, Tag, Segmented, Modal, Form, Select, Switch, Tooltip, Upload, Skeleton, Empty, Dropdown, Table, Alert,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faCopy, faTrashCan, faFloppyDisk, faMagnifyingGlass, faFileExport, faFileImport, faLock, faCheck, faBan,
  faMinus, faEllipsis, faUserShield, faCircleInfo, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Page, { PageHeader } from '../components/Page';
import * as api from '../services/api';

const STATE_OPTS = [
  { value: 'grant', icon: faCheck, label: __( 'Grant', 'memberglut' ) },
  { value: 'unset', icon: faMinus, label: __( 'Not set', 'memberglut' ) },
  { value: 'deny', icon: faBan, label: __( 'Deny', 'memberglut' ) },
];

function CapToggle({ value, onChange, disabled }) {
  return (
    <div className={`mg-tri ${disabled ? 'is-disabled' : ''}`}>
      {STATE_OPTS.map((o) => (
        <Tooltip key={o.value} title={o.label}>
          <button type="button" disabled={disabled} className={`${o.value} ${value === o.value ? 'on' : ''}`} onClick={() => onChange(o.value)}>
            <FontAwesomeIcon icon={o.icon} />
          </button>
        </Tooltip>
      ))}
    </div>
  );
}

function NewRoleModal({ open, onClose, roles, onCreate, source }) {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (open) form.setFieldsValue({ name: source ? sprintf( __( '%s (copy)', 'memberglut' ), source.name ) : '', slug: source ? `${source.slug}_copy` : '', clone: source ? source.slug : 'subscriber' });
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
  return (
    <Modal title={<span className="mg-modal-title">{source ? __( 'Clone role', 'memberglut' ) : __( 'Add role', 'memberglut' )}</span>} open={open} onCancel={onClose} okText={source ? __( 'Clone role', 'memberglut' ) : __( 'Create role', 'memberglut' )} confirmLoading={saving} onOk={submit} destroyOnClose>
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item name="name" label={__( 'Role name', 'memberglut' )} rules={[{ required: true, message: __( 'Enter a name.', 'memberglut' ) }]}><Input placeholder={__( 'e.g. Course Instructor', 'memberglut' )} /></Form.Item>
        <Form.Item name="slug" label={__( 'Role key', 'memberglut' )} extra={__( 'Lowercase letters, numbers and underscores. Cannot be changed later. Empty creates it from the name.', 'memberglut' )} normalize={(v) => (v || '').toLowerCase().replace(/[^a-z0-9_]/g, '_')}><Input placeholder="course_instructor" /></Form.Item>
        {!source && (
          <Form.Item name="clone" label={__( 'Start with the capabilities of', 'memberglut' )}>
            <Select options={[{ value: '', label: __( '— No capabilities —', 'memberglut' ) }, ...roles.map((r) => ({ value: r.slug, label: r.name }))]} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}

function DeleteRoleModal({ role, roles, onClose, onDeleted }) {
  const { message } = App.useApp();
  const [replacement, setReplacement] = useState('subscriber');
  const [saving, setSaving] = useState(false);
  if (!role) return null;
  const used = role.used_by_plans || [];
  const submit = async () => {
    setSaving(true);
    try {
      const list = await api.deleteRole(role.slug, replacement);
      onDeleted(list);
      message.success(__( 'Role deleted.', 'memberglut' ));
    } catch (e) {
      message.error(e.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <Modal open title={<span className="mg-modal-title">{sprintf( __( 'Delete “%s”?', 'memberglut' ), role.name )}</span>} onCancel={onClose} onOk={submit} okText={__( 'Delete role', 'memberglut' )} okButtonProps={{ danger: true }} confirmLoading={saving}>
      <p>{sprintf( __( '%d users have this role. Users who have no other role get the role below.', 'memberglut' ), role.users )}</p>
      {used.length > 0 && <Alert type="warning" showIcon style={{ marginBottom: 12 }} message={sprintf( __( 'Used by the plans %s. They will give the role below instead.', 'memberglut' ), used.map((p) => p.name).join(', ') )} />}
      <Select value={replacement} onChange={setReplacement} style={{ width: '100%' }} options={roles.filter((r) => r.slug !== role.slug && r.slug !== 'administrator').map((r) => ({ value: r.slug, label: r.name }))} />
    </Modal>
  );
}

function ImportModal({ data, onClose, onDone }) {
  const { message } = App.useApp();
  const [preview, setPreview] = useState(null);
  const [choices, setChoices] = useState({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!data) return;
    api.previewRoleImport({ data }).then((rows) => {
      setPreview(rows);
      setChoices(Object.fromEntries(rows.map((r) => [r.slug, r.state === 'new' ? 'import' : (r.state === 'changed' ? 'overwrite' : 'skip')])));
    }).catch((e) => { message.error(e.message); onClose(); });
  }, [data]);
  if (!data) return null;
  const STATE = { new: [__( 'New', 'memberglut' ), 'green'], changed: [__( 'Differs', 'memberglut' ), 'orange'], same: [__( 'Same', 'memberglut' ), 'default'], protected: [__( 'Protected', 'memberglut' ), 'red'] };
  const submit = async () => {
    setSaving(true);
    try {
      const r = await api.importRoles({ data, choices });
      message.success(sprintf( __( 'Import done: %1$d created, %2$d updated, %3$d skipped.', 'memberglut' ), r.summary.created, r.summary.updated, r.summary.skipped ));
      onDone(r);
    } catch (e) {
      message.error(e.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <Modal open width={760} title={<span className="mg-modal-title">{__( 'Import roles', 'memberglut' )}</span>} onCancel={onClose} onOk={submit} okText={__( 'Import', 'memberglut' )} confirmLoading={saving}>
      {!preview ? <Skeleton active /> : (
        <Table size="small" rowKey="slug" pagination={false} dataSource={preview} columns={[
          { title: __( 'Role', 'memberglut' ), dataIndex: 'name', render: (v, r) => <><b>{v}</b><div className="mg-muted">{r.slug} · {sprintf( __( '%d capabilities', 'memberglut' ), r.caps )}</div></> },
          { title: __( 'On this site', 'memberglut' ), dataIndex: 'state', render: (v, r) => <><Tag color={STATE[v][1]} bordered={false}>{STATE[v][0]}</Tag>{v === 'changed' && <div className="mg-muted">{sprintf( __( '+%1$d · −%2$d · %3$d changed', 'memberglut' ), r.diff.added.length, r.diff.removed.length, r.diff.changed.length )}</div>}</> },
          {
            title: __( 'Action', 'memberglut' ), render: (v, r) => (
              <Select size="small" style={{ width: 170 }} value={choices[r.slug]} disabled={r.state === 'protected'} onChange={(c) => setChoices({ ...choices, [r.slug]: c })}
                options={r.state === 'new' ? [{ value: 'import', label: __( 'Import', 'memberglut' ) }, { value: 'skip', label: __( 'Skip', 'memberglut' ) }]
                  : [{ value: 'overwrite', label: __( 'Overwrite', 'memberglut' ) }, { value: 'rename', label: __( 'Import as a copy', 'memberglut' ) }, { value: 'skip', label: __( 'Skip', 'memberglut' ) }]} />
            ),
          },
        ]} />
      )}
    </Modal>
  );
}

function Roles() {
  const { message, modal } = App.useApp();
  const [roles, setRoles] = useState([]);
  const [groups, setGroups] = useState([]);
  const [caps, setCaps] = useState({});
  const [custom, setCustom] = useState([]);
  const [current, setCurrent] = useState('');
  const [group, setGroup] = useState('all');
  const [search, setSearch] = useState('');
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [cloneFrom, setCloneFrom] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [importData, setImportData] = useState(null);
  const [newCap, setNewCap] = useState('');
  const [options, setOptions] = useState({ multi_roles: true, rescue: true });

  const applyCaps = (c) => { setGroups(c.groups); setCaps(c.roleCaps); setCustom(c.custom || []); };

  useEffect(() => {
    Promise.all([api.getRoles(), api.getCapabilities(), api.getRoleOptions()]).then(([r, c, o]) => {
      setRoles(r);
      applyCaps(c);
      setOptions(o);
      const fromUrl = new URLSearchParams(window.location.search).get('role');
      setCurrent((r.find((x) => x.slug === fromUrl) || r.find((x) => x.slug === 'memberglut_premium') || r.find((x) => !x.protected) || r[0]).slug);
    }).catch((e) => message.error(e.message));
  }, []);

  const role = roles.find((r) => r.slug === current);
  const roleCaps = caps[current] || {};
  const visibleGroups = groups.filter((g) => group === 'all' || g.key === group);
  const counts = useMemo(() => {
    const vals = Object.entries(roleCaps).filter(([k]) => !/^level_\d+$/.test(k)).map(([, v]) => v);
    return { grant: vals.filter((v) => v === 'grant').length, deny: vals.filter((v) => v === 'deny').length };
  }, [roleCaps]);

  const setCap = (cap, state) => {
    setCaps((all) => {
      const next = { ...(all[current] || {}) };
      if (state === 'unset') delete next[cap]; else next[cap] = state;
      return { ...all, [current]: next };
    });
    setDirty(true);
  };
  const setGroupState = (g, state) => g.caps.forEach((c) => setCap(c, state));

  const save = async () => {
    setSaving(true);
    try {
      const r = await api.saveRole({ slug: current, caps: roleCaps });
      setCaps((all) => ({ ...all, [current]: r.caps }));
      setRoles(r.roles);
      setDirty(false);
      message.success(sprintf( __( '“%s” saved.', 'memberglut' ), role.name ));
    } catch (e) {
      message.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  const switchRole = (slug) => {
    if (dirty) {
      modal.confirm({
        title: __( 'Discard unsaved changes?', 'memberglut' ),
        onOk: () => api.getCapabilities().then((c) => { applyCaps(c); setDirty(false); setCurrent(slug); }),
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
    const r = cloneFrom ? await api.cloneRole(cloneFrom.slug, v) : await api.createRole(v);
    afterCreate(r);
    setNewOpen(false);
    setCloneFrom(null);
    message.success(__( 'Role created.', 'memberglut' ));
  };

  const makeDefault = async () => {
    try {
      setRoles(await api.makeDefaultRole(current));
      message.success(__( 'Default role changed.', 'memberglut' ));
    } catch (e) { message.error(e.message); }
  };

  const exportRoles = async () => {
    try {
      await api.exportRoles([]);
    } catch (e) { message.error(e.message); }
  };

  const readImport = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try { setImportData(JSON.parse(reader.result)); } catch (e) { message.error(__( 'This file is not valid JSON.', 'memberglut' )); }
    };
    reader.readAsText(file);
    return false;
  };

  const addCap = async () => {
    try {
      if (dirty) await api.saveRole({ slug: current, caps: roleCaps });
      const r = await api.addCapability(newCap, current);
      applyCaps(r);
      setDirty(false);
      setNewCap('');
      message.success(sprintf( __( 'Capability %s added and granted.', 'memberglut' ), r.cap ));
    } catch (e) { message.error(e.message); }
  };

  const removeCap = (cap) => modal.confirm({
    title: sprintf( __( 'Remove the capability %s?', 'memberglut' ), cap ),
    content: __( 'It is removed from every role.', 'memberglut' ),
    okButtonProps: { danger: true },
    onOk: async () => {
      try { applyCaps(await api.deleteCapability(cap)); } catch (e) { message.error(e.message); }
    },
  });

  const saveOption = async (key, v) => {
    const next = { ...options, [key]: v };
    setOptions(next);
    try { setOptions(await api.saveRoleOptions(next)); message.success(__( 'Saved.', 'memberglut' )); } catch (e) { message.error(e.message); }
  };

  if (!role) return <Skeleton active paragraph={{ rows: 12 }} />;
  const locked = role.protected;

  return (
    <>
      <PageHeader
        title={__( 'Roles & Capabilities', 'memberglut' )}
        subtitle={__( 'Create roles for your members and choose exactly what each role can do.', 'memberglut' )}
        actions={(
          <>
            <Upload accept=".json,application/json" showUploadList={false} beforeUpload={readImport}>
              <Button size="large" icon={<FontAwesomeIcon icon={faFileImport} />}>{__( 'Import', 'memberglut' )}</Button>
            </Upload>
            <Button size="large" icon={<FontAwesomeIcon icon={faFileExport} />} onClick={exportRoles}>{__( 'Export', 'memberglut' )}</Button>
            <Button size="large" type="primary" icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => { setCloneFrom(null); setNewOpen(true); }}>{__( 'Add role', 'memberglut' )}</Button>
          </>
        )}
      />

      <div className="mg-roles-layout">
        <aside className="mg-role-list">
          {roles.map((r) => (
            <button key={r.slug} type="button" className={r.slug === current ? 'active' : ''} onClick={() => switchRole(r.slug)}>
              <span className="n">{r.name}{r.protected && <FontAwesomeIcon icon={faLock} className="lock" />}</span>
              <span className="m">{r.slug}</span>
              <span className="c">{r.users}</span>
              <span className="tags">
                {r.isDefault && <Tag color="blue" bordered={false}>{__( 'Default', 'memberglut' )}</Tag>}
                {!r.builtin && <Tag color="pink" bordered={false}>{__( 'Custom', 'memberglut' )}</Tag>}
                {r.used_by_plans.length > 0 && <Tooltip title={r.used_by_plans.map((p) => p.name).join(', ')}><Tag bordered={false}>{__( 'Plan', 'memberglut' )}</Tag></Tooltip>}
              </span>
            </button>
          ))}
          <div className="mg-role-options">
            <div className="mg-role-opt">
              <div><b>{__( 'Multiple roles per user', 'memberglut' )}</b><span>{__( 'Checkboxes instead of one dropdown on the user screens.', 'memberglut' )}</span></div>
              <Switch size="small" checked={options.multi_roles} onChange={(v) => saveOption('multi_roles', v)} />
            </div>
            <div className="mg-role-opt">
              <div><b>{__( 'Admin rescue link', 'memberglut' )}</b><span>{__( 'Locked out? wp-login.php?action=memberglut_rescue emails a 15-minute link that restores the Administrator role.', 'memberglut' )}</span></div>
              <Switch size="small" checked={options.rescue} onChange={(v) => saveOption('rescue', v)} />
            </div>
          </div>
        </aside>

        <section className="mg-role-editor">
          <div className="mg-role-head">
            <div>
              <div className="mg-role-title">{role.name} {locked && <Tag icon={<FontAwesomeIcon icon={faLock} style={{ marginRight: 4 }} />} bordered={false}>{__( 'Protected', 'memberglut' )}</Tag>}</div>
              <div className="mg-muted">{sprintf( __( '%1$s · %2$d users · %3$d granted · %4$d denied', 'memberglut' ), role.slug, role.users, counts.grant, counts.deny )}</div>
            </div>
            <div className="mg-fs-actions">
              {dirty && <span className="mg-fs-unsaved">{__( 'Unsaved changes', 'memberglut' )}</span>}
              <Dropdown trigger={['click']} menu={{
                items: [
                  { key: 'clone', icon: <FontAwesomeIcon icon={faCopy} />, label: __( 'Clone role', 'memberglut' ) },
                  { key: 'default', icon: <FontAwesomeIcon icon={faUserShield} />, label: __( 'Make default for new users', 'memberglut' ), disabled: role.isDefault || locked },
                  { type: 'divider' },
                  { key: 'delete', icon: <FontAwesomeIcon icon={faTrashCan} />, label: __( 'Delete role', 'memberglut' ), danger: true, disabled: role.builtin || role.isDefault },
                ],
                onClick: ({ key }) => {
                  if (key === 'delete') setDeleting(role);
                  else if (key === 'clone') { setCloneFrom(role); setNewOpen(true); } else makeDefault();
                },
              }}>
                <Button icon={<FontAwesomeIcon icon={faEllipsis} />} />
              </Dropdown>
              <Button type="primary" disabled={!dirty || locked} loading={saving} icon={<FontAwesomeIcon icon={faFloppyDisk} />} onClick={save} className="mg-save-btn">{__( 'Save role', 'memberglut' )}</Button>
            </div>
          </div>

          {locked && <div className="mg-fs-note mg-note-warn"><FontAwesomeIcon icon={faCircleInfo} /> {__( 'The Administrator role is protected so you cannot lock yourself out. Its capabilities can be viewed but not changed.', 'memberglut' )}</div>}
          {role.used_by_plans.length > 0 && <div className="mg-fs-note"><FontAwesomeIcon icon={faCircleInfo} /> {sprintf( __( 'Members get this role from the plans: %s.', 'memberglut' ), role.used_by_plans.map((p) => p.name).join(', ') )}</div>}

          <div className="mg-cap-toolbar">
            <Segmented value={group} onChange={setGroup} options={[{ value: 'all', label: __( 'All', 'memberglut' ) }, ...groups.filter((g) => g.caps.length || g.key === 'custom').map((g) => ({ value: g.key, label: g.label }))]} />
            <Input allowClear prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />} placeholder={__( 'Find a capability…', 'memberglut' )} value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 230 }} />
          </div>

          <div className="mg-cap-legend">
            <span><i className="grant"><FontAwesomeIcon icon={faCheck} /></i>{__( 'Grant', 'memberglut' )}</span>
            <span><i className="unset"><FontAwesomeIcon icon={faMinus} /></i>{__( 'Not set — another role of the user may grant it', 'memberglut' )}</span>
            <span><i className="deny"><FontAwesomeIcon icon={faBan} /></i>{__( 'Deny — wins over every other role', 'memberglut' )}</span>
          </div>

          {visibleGroups.map((g) => {
            const list = g.caps.filter((c) => !search || c.includes(search.toLowerCase()));
            if (!list.length) return null;
            return (
              <div key={g.key} className="mg-cap-group">
                <div className="mg-cap-group-head">
                  <b>{g.label}</b>
                  <span className="mg-muted">{sprintf( __( '%1$d of %2$d granted', 'memberglut' ), g.caps.filter((c) => roleCaps[c] === 'grant').length, g.caps.length )}</span>
                  {!locked && (
                    <span className="mg-cap-group-actions">
                      <a onClick={() => setGroupState(g, 'grant')}>{__( 'Grant all', 'memberglut' )}</a>
                      <a onClick={() => setGroupState(g, 'unset')}>{__( 'Clear', 'memberglut' )}</a>
                    </span>
                  )}
                </div>
                <div className="mg-cap-grid">
                  {list.map((c) => (
                    <div key={c} className={`mg-cap s-${roleCaps[c] || 'unset'}`}>
                      <code>{c}</code>
                      {g.key === 'custom' && !locked && <Tooltip title={__( 'Remove from every role', 'memberglut' )}><button type="button" className="mg-cap-remove" onClick={() => removeCap(c)}><FontAwesomeIcon icon={faXmark} /></button></Tooltip>}
                      <CapToggle value={roleCaps[c] || 'unset'} onChange={(s) => setCap(c, s)} disabled={locked} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {visibleGroups.every((g) => !g.caps.some((c) => !search || c.includes(search.toLowerCase()))) && <Empty description={__( 'No capability matches.', 'memberglut' )} />}

          {!locked && (
            <div className="mg-cap-add">
              <Input value={newCap} onChange={(e) => setNewCap(e.target.value.replace(/[^a-z0-9_]/gi, '_').toLowerCase())} onPressEnter={() => newCap && addCap()} placeholder={__( 'new_custom_capability', 'memberglut' )} style={{ maxWidth: 320 }} />
              <Button icon={<FontAwesomeIcon icon={faPlus} />} disabled={!newCap || custom.includes(newCap)} onClick={addCap}>{__( 'Add custom capability', 'memberglut' )}</Button>
            </div>
          )}
        </section>
      </div>

      <NewRoleModal open={newOpen} roles={roles} source={cloneFrom} onClose={() => { setNewOpen(false); setCloneFrom(null); }} onCreate={create} />
      {deleting && <DeleteRoleModal role={deleting} roles={roles} onClose={() => setDeleting(null)} onDeleted={(list) => { setRoles(list); setDeleting(null); setCurrent('subscriber'); }} />}
      {importData && <ImportModal data={importData} onClose={() => setImportData(null)} onDone={(r) => { setRoles(r.roles); applyCaps(r); setImportData(null); }} />}
    </>
  );
}

export function RolesPage() {
  return <Page active="roles"><Roles /></Page>;
}
