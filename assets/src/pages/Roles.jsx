import React, { useEffect, useMemo, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import {
  App, Button, Input, Tag, Segmented, Modal, Form, Select, Switch, Tooltip, Upload, Skeleton, Empty, Dropdown,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faCopy, faTrashCan, faFloppyDisk, faMagnifyingGlass, faFileExport, faFileImport, faLock, faCheck, faBan,
  faMinus, faEllipsis, faUserShield, faCircleInfo,
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

function NewRoleModal({ open, onClose, roles, onCreate }) {
  const [form] = Form.useForm();
  return (
    <Modal title={<span className="mg-modal-title">{__( 'Add role', 'memberglut' )}</span>} open={open} onCancel={onClose} okText={__( 'Create role', 'memberglut' )} onOk={async () => { const v = await form.validateFields(); onCreate(v); form.resetFields(); }} destroyOnClose>
      <Form form={form} layout="vertical" requiredMark={false} initialValues={{ clone: 'subscriber' }}>
        <Form.Item name="name" label={__( 'Role name', 'memberglut' )} rules={[{ required: true, message: __( 'Enter a name.', 'memberglut' ) }]}><Input placeholder={__( 'e.g. Course Instructor', 'memberglut' )} /></Form.Item>
        <Form.Item name="slug" label={__( 'Role key', 'memberglut' )} extra={__( 'Lowercase letters, numbers and underscores. Cannot be changed later.', 'memberglut' )}><Input placeholder="course_instructor" /></Form.Item>
        <Form.Item name="clone" label={__( 'Start with the capabilities of', 'memberglut' )}>
          <Select options={[{ value: '', label: __( '— No capabilities —', 'memberglut' ) }, ...roles.map((r) => ({ value: r.slug, label: r.name }))]} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

function Roles() {
  const { message, modal } = App.useApp();
  const [roles, setRoles] = useState([]);
  const [groups, setGroups] = useState([]);
  const [caps, setCaps] = useState({});
  const [current, setCurrent] = useState('memberglut_premium');
  const [group, setGroup] = useState('all');
  const [search, setSearch] = useState('');
  const [dirty, setDirty] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [newCap, setNewCap] = useState('');
  const [options, setOptions] = useState({ multi_roles: true, rescue: true });

  useEffect(() => {
    Promise.all([api.getRoles(), api.getCapabilities()]).then(([r, c]) => { setRoles(r); setGroups(c.groups); setCaps(c.roleCaps); });
  }, []);

  const role = roles.find((r) => r.slug === current);
  const roleCaps = caps[current] || {};
  const visibleGroups = groups.filter((g) => group === 'all' || g.key === group);
  const counts = useMemo(() => {
    const vals = Object.values(roleCaps);
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
    await api.saveRole({ slug: current, caps: roleCaps });
    setDirty(false);
    message.success(sprintf( __( '“%s” saved.', 'memberglut' ), role.name ));
  };

  const switchRole = (slug) => {
    if (dirty) {
      modal.confirm({ title: __( 'Discard unsaved changes?', 'memberglut' ), onOk: () => { setDirty(false); setCurrent(slug); } });
      return;
    }
    setCurrent(slug);
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
            <Upload accept=".json" showUploadList={false} beforeUpload={() => { message.info(__( 'Preview of the imported roles opens here.', 'memberglut' )); return false; }}>
              <Button size="large" icon={<FontAwesomeIcon icon={faFileImport} />}>{__( 'Import', 'memberglut' )}</Button>
            </Upload>
            <Button size="large" icon={<FontAwesomeIcon icon={faFileExport} />} onClick={() => message.success(__( 'roles.json downloaded.', 'memberglut' ))}>{__( 'Export', 'memberglut' )}</Button>
            <Button size="large" type="primary" icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setNewOpen(true)}>{__( 'Add role', 'memberglut' )}</Button>
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
              </span>
            </button>
          ))}
          <div className="mg-role-options">
            <div className="mg-role-opt">
              <div><b>{__( 'Multiple roles per user', 'memberglut' )}</b><span>{__( 'Checkboxes instead of one dropdown on the user screen.', 'memberglut' )}</span></div>
              <Switch size="small" checked={options.multi_roles} onChange={(v) => setOptions({ ...options, multi_roles: v })} />
            </div>
            <div className="mg-role-opt">
              <div><b>{__( 'Admin rescue link', 'memberglut' )}</b><span>{__( 'Locked out? wp-login.php?action=memberglut_rescue emails a 15-minute link that restores the Administrator role.', 'memberglut' )}</span></div>
              <Switch size="small" checked={options.rescue} onChange={(v) => setOptions({ ...options, rescue: v })} />
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
                  { key: 'default', icon: <FontAwesomeIcon icon={faUserShield} />, label: __( 'Make default for new users', 'memberglut' ), disabled: role.isDefault },
                  { type: 'divider' },
                  { key: 'delete', icon: <FontAwesomeIcon icon={faTrashCan} />, label: __( 'Delete role', 'memberglut' ), danger: true, disabled: role.builtin || role.isDefault },
                ],
                onClick: ({ key }) => {
                  if (key === 'delete') {
                    modal.confirm({ title: sprintf( __( 'Delete “%s”?', 'memberglut' ), role.name ), content: sprintf( __( '%d users will be moved to the default role.', 'memberglut' ), role.users ), okButtonProps: { danger: true }, onOk: () => { setRoles(roles.filter((r) => r.slug !== current)); setCurrent('subscriber'); } });
                  } else message.success(key === 'clone' ? __( 'Role cloned.', 'memberglut' ) : __( 'Default role changed.', 'memberglut' ));
                },
              }}>
                <Button icon={<FontAwesomeIcon icon={faEllipsis} />} />
              </Dropdown>
              <Button type="primary" disabled={!dirty} icon={<FontAwesomeIcon icon={faFloppyDisk} />} onClick={save} className="mg-save-btn">{__( 'Save role', 'memberglut' )}</Button>
            </div>
          </div>

          {locked && <div className="mg-fs-note mg-note-warn"><FontAwesomeIcon icon={faCircleInfo} /> {__( 'The Administrator role is protected so you cannot lock yourself out. Its capabilities can be viewed but not changed.', 'memberglut' )}</div>}

          <div className="mg-cap-toolbar">
            <Segmented value={group} onChange={setGroup} options={[{ value: 'all', label: __( 'All', 'memberglut' ) }, ...groups.map((g) => ({ value: g.key, label: g.label }))]} />
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
              <Input value={newCap} onChange={(e) => setNewCap(e.target.value.replace(/[^a-z0-9_]/gi, '_').toLowerCase())} placeholder={__( 'new_custom_capability', 'memberglut' )} style={{ maxWidth: 320 }} />
              <Button icon={<FontAwesomeIcon icon={faPlus} />} disabled={!newCap} onClick={() => {
                setGroups(groups.map((g) => (g.key === 'custom' ? { ...g, caps: [...g.caps, newCap] } : g)));
                setCap(newCap, 'grant');
                setNewCap('');
              }}>{__( 'Add custom capability', 'memberglut' )}</Button>
            </div>
          )}
        </section>
      </div>

      <NewRoleModal open={newOpen} roles={roles} onClose={() => setNewOpen(false)} onCreate={(v) => {
        const slug = v.slug || v.name.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        setRoles([...roles, { slug, name: v.name, users: 0, builtin: false, level: 0 }]);
        setCaps({ ...caps, [slug]: { ...(caps[v.clone] || {}) } });
        setCurrent(slug);
        setNewOpen(false);
        message.success(__( 'Role created.', 'memberglut' ));
      }} />
    </>
  );
}

export function RolesPage() {
  return <Page active="roles"><Roles /></Page>;
}
