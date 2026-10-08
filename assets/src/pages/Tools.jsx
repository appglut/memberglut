import React, { useCallback, useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import {
  App, Tabs, Button, Select, Upload, Table, Tag, Input, DatePicker, Switch, InputNumber, Checkbox, Modal, Spin, Alert,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileExport, faFileImport, faMagnifyingGlass, faTrashCan, faCircleCheck, faTriangleExclamation,
  faUsers, faGear, faUserGear, faRotate, faBroom, faHourglassEnd, faCalculator, faEraser, faCopy,
} from '@fortawesome/free-solid-svg-icons';
import Page, { PageHeader } from '../components/Page';
import { queryArg } from '../components/adminData';
import * as api from '../services/api';
import { dateTime } from '../services/format';
import { planOptions } from '../services/lookups';

const LEVEL_COLOR = { info: 'blue', warning: 'orange', error: 'red', debug: 'default' };
const SECTIONS = [
  ['settings', __( 'Global settings', 'memberglut' )],
  ['plans', __( 'Plans', 'memberglut' )],
  ['rules', __( 'Content rules', 'memberglut' )],
  ['roles', __( 'Roles & capabilities', 'memberglut' )],
  ['emails', __( 'Emails', 'memberglut' )],
  ['coupons', __( 'Coupons', 'memberglut' )],
];
const SECTION_LABEL = Object.fromEntries(SECTIONS);

function ImportPreview({ file, preview, onClose, onDone }) {
  const { message } = App.useApp();
  const [picked, setPicked] = useState(Object.keys(preview || {}));
  const [busy, setBusy] = useState(false);
  const apply = async () => {
    setBusy(true);
    try {
      const res = await api.importSetup({ data: file, sections: picked });
      const errors = Object.values(res).flatMap((s) => s.errors || []);
      if (errors.length) {
        Modal.warning({ title: __( 'Imported with some problems', 'memberglut' ), content: <ul>{errors.map((e) => <li key={e}>{e}</li>)}</ul> });
      } else {
        message.success(__( 'Setup imported.', 'memberglut' ));
      }
      onDone();
    } catch (e) {
      message.error(e.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal open={!!preview} onCancel={onClose} onOk={apply} confirmLoading={busy} okText={__( 'Import', 'memberglut' )} okButtonProps={{ disabled: !picked.length }}
      title={<span className="mg-modal-title">{__( 'Import setup', 'memberglut' )}</span>} width={560}>
      <p className="mg-modal-intro">{__( 'Plans are matched by slug, rules by name, coupons by code and roles by slug. Rules and coupons are linked to the matching plans on this site.', 'memberglut' )}</p>
      <Checkbox.Group value={picked} onChange={setPicked} style={{ width: '100%' }}>
        <div className="mg-import-rows">
          {Object.entries(preview || {}).map(([key, b]) => (
            <div key={key} className="mg-import-row">
              <Checkbox value={key}><b>{SECTION_LABEL[key] || key}</b></Checkbox>
              <span className="mg-muted">
                {sprintf( __( '%1$d new · %2$d changed · %3$d unchanged', 'memberglut' ), b.new.length, b.changed.length, b.unchanged.length )}
              </span>
              {(b.new.length > 0 || b.changed.length > 0) && (
                <div className="mg-import-names">
                  {b.new.slice(0, 8).map((n) => <Tag key={`n${n}`} color="green" bordered={false}>{n}</Tag>)}
                  {b.changed.slice(0, 8).map((n) => <Tag key={`c${n}`} color="orange" bordered={false}>{n}</Tag>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </Checkbox.Group>
    </Modal>
  );
}

function ImportExport() {
  const { message } = App.useApp();
  const [plans, setPlans] = useState([]);
  const [customFields, setCustomFields] = useState(true);
  const [inactive, setInactive] = useState(true);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState('subscriber');
  const [toPlan, setToPlan] = useState(null);
  const [sendEmail, setSendEmail] = useState(false);
  const [converting, setConverting] = useState(false);
  const [sections, setSections] = useState(SECTIONS.map(([k]) => k));
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => { api.getRoles().then((r) => setRoles(r.filter((x) => x.slug !== 'administrator'))).catch(() => {}); }, []);

  const exportMembers = () => api.exportMembers({ plans, custom_fields: customFields ? 1 : 0, include_inactive: inactive ? 1 : 0 })
    .then((r) => { if (r && r.queued) message.info(__( 'The export is large and is being prepared. You will get an email when it is ready.', 'memberglut' )); })
    .catch((e) => message.error(e.message));

  const convert = async () => {
    if (!toPlan) { message.error(__( 'Choose a plan.', 'memberglut' )); return; }
    setConverting(true);
    try {
      const r = await api.convertUsers(role, toPlan, sendEmail);
      message.success(r.queued
        ? sprintf( __( '%d users are being converted in the background.', 'memberglut' ), r.total )
        : sprintf( __( '%1$d of %2$d users are now members.', 'memberglut' ), r.converted, r.total ));
    } catch (e) {
      message.error(e.message);
    } finally {
      setConverting(false);
    }
  };

  const readImport = (f) => {
    f.text().then((txt) => {
      let data;
      try { data = JSON.parse(txt); } catch (e) { message.error(__( 'This file is not valid JSON.', 'memberglut' )); return; }
      api.previewSetupImport({ data }).then((p) => { setFile(data); setPreview(p); }).catch((e) => message.error(e.message));
    });
    return false;
  };

  return (
    <div className="mg-tools-grid">
      <div className="mg-card mg-tools-card">
        <div className="mg-tool-h"><FontAwesomeIcon icon={faUsers} /> {__( 'Export members', 'memberglut' )}</div>
        <p className="mg-mig-intro">{__( 'A CSV with profile fields, plans, dates, status and lifetime value. Opens in Excel or Google Sheets.', 'memberglut' )}</p>
        <Select mode="multiple" value={plans} onChange={setPlans} options={planOptions()} placeholder={__( 'All plans', 'memberglut' )} style={{ width: '100%', marginBottom: 10 }} />
        <Checkbox checked={customFields} onChange={(e) => setCustomFields(e.target.checked)}>{__( 'Include custom fields', 'memberglut' )}</Checkbox><br />
        <Checkbox checked={inactive} onChange={(e) => setInactive(e.target.checked)} style={{ margin: '6px 0 14px' }}>{__( 'Include expired and canceled members', 'memberglut' )}</Checkbox><br />
        <Button type="primary" icon={<FontAwesomeIcon icon={faFileExport} />} onClick={exportMembers}>{__( 'Export members', 'memberglut' )}</Button>
      </div>

      <div className="mg-card mg-tools-card">
        <div className="mg-tool-h"><FontAwesomeIcon icon={faUserGear} /> {__( 'Turn existing users into members', 'memberglut' )}</div>
        <p className="mg-mig-intro">{__( 'Give a plan to every WordPress user who has a role. Users who already have the plan are skipped.', 'memberglut' )}</p>
        <div className="mg-inline-form">
          <span>{__( 'Users with role', 'memberglut' )}</span>
          <Select value={role} onChange={setRole} options={roles.map((r) => ({ value: r.slug, label: `${r.name} (${r.users})` }))} style={{ width: 200 }} />
          <span>{__( 'get plan', 'memberglut' )}</span>
          <Select value={toPlan} onChange={setToPlan} options={planOptions((p) => p.status === 'active')} placeholder={__( 'Choose…', 'memberglut' )} style={{ width: 160 }} />
        </div>
        <Checkbox checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)} style={{ marginTop: 10 }}>{__( 'Send them the “membership active” email', 'memberglut' )}</Checkbox><br />
        <Button style={{ marginTop: 14 }} loading={converting} onClick={convert}>{__( 'Convert users', 'memberglut' )}</Button>
      </div>

      <div className="mg-card mg-tools-card">
        <div className="mg-tool-h"><FontAwesomeIcon icon={faGear} /> {__( 'Settings, plans, rules & roles', 'memberglut' )}</div>
        <p className="mg-mig-intro">{__( 'Move your setup to another site as one JSON file. Members, payments, API keys and page choices are not included.', 'memberglut' )}</p>
        <Checkbox.Group value={sections} onChange={setSections} style={{ width: '100%' }}>
          <div className="mg-check-list">
            {SECTIONS.map(([k, l]) => <Checkbox key={k} value={k}>{l}</Checkbox>)}
          </div>
        </Checkbox.Group>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <Button type="primary" disabled={!sections.length} icon={<FontAwesomeIcon icon={faFileExport} />} onClick={() => api.exportSetup(sections).catch((e) => message.error(e.message))}>{__( 'Export', 'memberglut' )}</Button>
          <Upload accept=".json,application/json" showUploadList={false} beforeUpload={readImport}>
            <Button icon={<FontAwesomeIcon icon={faFileImport} />}>{__( 'Import', 'memberglut' )}</Button>
          </Upload>
        </div>
      </div>
      {preview && <ImportPreview file={file} preview={preview} onClose={() => setPreview(null)} onDone={() => setPreview(null)} />}
    </div>
  );
}

function Logs() {
  const { message, modal } = App.useApp();
  const [data, setData] = useState({ items: [], total: 0, sources: [], settings: null });
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState(null);
  const [source, setSource] = useState(null);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [range, setRange] = useState(null);
  const [page, setPage] = useState(1);
  const [settings, setSettings] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api.getLogs({
      level: level || '', source: source || '', search: query, page, per_page: 20,
      from: range ? range[0].format('YYYY-MM-DD') : '', to: range ? range[1].format('YYYY-MM-DD') : '',
    }).then((r) => { setData(r); setSettings((s) => s || r.settings); }).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  }, [level, source, query, range, page]);
  useEffect(load, [load]);
  useEffect(() => { const t = setTimeout(() => { setQuery(search); setPage(1); }, 300); return () => clearTimeout(t); }, [search]);

  const saveSetting = (patch) => {
    setSettings({ ...settings, ...patch });
    api.saveSettings(patch).then(() => message.success(__( 'Saved.', 'memberglut' ))).catch((e) => message.error(e.message));
  };

  return (
    <div className="mg-card mg-tools-card">
      {settings && (
        <div className="mg-log-settings">
          <label><Switch size="small" checked={settings.debug_log} onChange={(v) => saveSetting({ debug_log: v })} /> {__( 'Logging on', 'memberglut' )}</label>
          <label>{__( 'Keep logs for', 'memberglut' )} <InputNumber size="small" min={1} max={365} value={settings.log_retention_days} onChange={(v) => v && setSettings({ ...settings, log_retention_days: v })} onBlur={() => saveSetting({ log_retention_days: settings.log_retention_days })} style={{ width: 70 }} /> {__( 'days', 'memberglut' )}</label>
          <label><Switch size="small" checked={settings.log_debug} disabled={!settings.debug_log} onChange={(v) => saveSetting({ log_debug: v })} /> {__( 'Include debug messages', 'memberglut' )}</label>
          {!settings.debug_log && <span className="mg-muted">{__( 'Errors are always logged.', 'memberglut' )}</span>}
        </div>
      )}
      <div className="mg-log-filters">
        <Input allowClear prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />} placeholder={__( 'Search messages…', 'memberglut' )} value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select allowClear placeholder={__( 'All levels', 'memberglut' )} value={level} onChange={(v) => { setLevel(v); setPage(1); }} options={Object.keys(LEVEL_COLOR).map((l) => ({ value: l, label: l }))} style={{ width: 140 }} />
        <Select allowClear placeholder={__( 'All sources', 'memberglut' )} value={source} onChange={(v) => { setSource(v); setPage(1); }} options={(data.sources || []).map((s) => ({ value: s, label: s }))} style={{ width: 160 }} />
        <DatePicker.RangePicker value={range} onChange={(v) => { setRange(v); setPage(1); }} />
        <Button danger icon={<FontAwesomeIcon icon={faTrashCan} />} onClick={() => modal.confirm({
          title: __( 'Delete all log lines?', 'memberglut' ), okButtonProps: { danger: true }, okText: __( 'Clear logs', 'memberglut' ),
          onOk: () => api.clearLogs().then(() => { message.success(__( 'Logs cleared.', 'memberglut' )); setPage(1); load(); }),
        })}>{__( 'Clear logs', 'memberglut' )}</Button>
      </div>
      <Table rowKey="id" size="middle" loading={loading} dataSource={data.items}
        pagination={{ current: page, pageSize: 20, total: data.total, showSizeChanger: false, onChange: setPage }}
        expandable={{ rowExpandable: (r) => !!r.context, expandedRowRender: (r) => <pre className="mg-log-context">{JSON.stringify(r.context, null, 2)}</pre> }}
        columns={[
          { title: __( 'Time', 'memberglut' ), dataIndex: 'date', width: 190, render: dateTime },
          { title: __( 'Level', 'memberglut' ), dataIndex: 'level', width: 100, render: (v) => <Tag color={LEVEL_COLOR[v]} bordered={false}>{v}</Tag> },
          { title: __( 'Source', 'memberglut' ), dataIndex: 'source', width: 130 },
          { title: __( 'Message', 'memberglut' ), dataIndex: 'message' },
        ]} />
    </div>
  );
}

function Activity() {
  const { message } = App.useApp();
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [type, setType] = useState(null);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [range, setRange] = useState(null);
  useEffect(() => { const t = setTimeout(() => { setQuery(search); setPage(1); }, 300); return () => clearTimeout(t); }, [search]);
  useEffect(() => {
    setLoading(true);
    api.getEvents({
      page, per_page: 25, type: type || '', search: query,
      from: range ? range[0].format('YYYY-MM-DD') : '', to: range ? range[1].format('YYYY-MM-DD') : '',
    }).then(setData).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  }, [page, type, query, range]);
  const TYPES = ['grant', 'activate', 'pending', 'approve', 'reject', 'cancel', 'expire', 'hold', 'revoke', 'plan_change', 'dates_changed', 'payment_completed', 'payment_refund', 'payment_failed', 'login_locked', 'logout_all', 'email_changed', 'password_changed', 'note'];
  return (
    <div className="mg-card mg-tools-card">
      <p className="mg-mig-intro" style={{ marginTop: 0 }}>{__( 'Every time access is granted, changed or removed, by whom, and why. Kept for the life of the membership.', 'memberglut' )}</p>
      <div className="mg-log-filters">
        <Input allowClear prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />} placeholder={__( 'Search details…', 'memberglut' )} value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select allowClear placeholder={__( 'All events', 'memberglut' )} value={type} onChange={(v) => { setType(v); setPage(1); }} options={TYPES.map((t) => ({ value: t, label: t }))} style={{ width: 180 }} />
        <DatePicker.RangePicker value={range} onChange={(v) => { setRange(v); setPage(1); }} />
      </div>
      <Table rowKey="id" size="middle" loading={loading} dataSource={data.items}
        pagination={{ current: page, pageSize: 25, total: data.total, showSizeChanger: false, onChange: setPage }}
        columns={[
          { title: __( 'Time', 'memberglut' ), dataIndex: 'date', width: 190, render: dateTime },
          { title: __( 'Event', 'memberglut' ), dataIndex: 'type', width: 150, render: (v) => <Tag bordered={false}>{v}</Tag> },
          { title: __( 'Details', 'memberglut' ), dataIndex: 'text' },
          { title: __( 'By', 'memberglut' ), dataIndex: 'by', width: 140 },
        ]} />
    </div>
  );
}

function Status() {
  const { message } = App.useApp();
  const [s, setS] = useState(null);
  useEffect(() => { api.getStatus().then(setS).catch((e) => message.error(e.message)); }, []);
  if (!s) return <div className="mg-card mg-tools-card" style={{ textAlign: 'center', padding: 40 }}><Spin /></div>;
  const copy = () => {
    const lines = ['### MemberGlut system status', ...Object.entries(s.environment).map(([k, v]) => `${k}: ${v}`), '', '### Counts', ...Object.entries(s.counts).map(([k, v]) => `${k}: ${v}`), '', '### Checks', ...s.checks.map((c) => `${c.ok ? '[ok]' : '[!!]'} ${c.label}${c.note ? ` — ${c.note}` : ''}`)];
    navigator.clipboard?.writeText(lines.join('\n')).then(() => message.success(__( 'Copied. Paste it in your support request.', 'memberglut' )));
  };
  const LABELS = { members: __( 'Active members', 'memberglut' ), plans: __( 'Plans', 'memberglut' ), rules: __( 'Rules', 'memberglut' ), payments: __( 'Payments', 'memberglut' ), roles: __( 'Roles', 'memberglut' ) };
  return (
    <div className="mg-card mg-tools-card">
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button icon={<FontAwesomeIcon icon={faCopy} />} onClick={copy}>{__( 'Copy for support', 'memberglut' )}</Button>
      </div>
      <div className="mg-status-grid">
        {Object.entries(s.counts).map(([k, n]) => <div key={k} className="mg-status-stat"><b>{Number(n).toLocaleString()}</b><span>{LABELS[k] || k}</span></div>)}
      </div>
      <div className="mg-tool-h">{__( 'Health checks', 'memberglut' )}</div>
      {s.checks.map((c) => (
        <div key={c.key} className="mg-check"><FontAwesomeIcon icon={c.ok ? faCircleCheck : faTriangleExclamation} style={{ color: c.ok ? '#10b981' : '#f59e0b' }} />{c.label}{c.note && <em>{c.note}</em>}</div>
      ))}
      <div className="mg-tool-h">{__( 'Environment', 'memberglut' )}</div>
      <table className="mg-env"><tbody>{Object.entries(s.environment).map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}</tbody></table>
    </div>
  );
}

function DangerModal({ task, onClose }) {
  const { message } = App.useApp();
  const [word, setWord] = useState('');
  const [include, setInclude] = useState([]);
  const [busy, setBusy] = useState(false);
  const expected = task.key === 'delete-all' ? 'DELETE' : 'RESET';
  const run = async () => {
    setBusy(true);
    try {
      const r = await api.runMaintenance(task.key, { confirm: word, include });
      message.success(r.message);
      onClose();
      if (task.key === 'delete-all') setTimeout(() => window.location.reload(), 800);
    } catch (e) {
      message.error(e.message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <Modal open onCancel={onClose} onOk={run} confirmLoading={busy} okText={task.title} okButtonProps={{ danger: true, disabled: word !== expected }}
      title={<span className="mg-modal-title">{task.title}</span>}>
      <Alert type="error" showIcon message={task.desc} style={{ marginBottom: 14 }} />
      {task.key === 'reset-settings' && (
        <Checkbox.Group value={include} onChange={setInclude} style={{ marginBottom: 12 }} options={[
          { value: 'forms', label: __( 'Also reset Forms & Pages', 'memberglut' ) },
          { value: 'emails', label: __( 'Also reset email texts', 'memberglut' ) },
        ]} />
      )}
      <p>{sprintf( __( 'Type %s to confirm.', 'memberglut' ), expected )}</p>
      <Input value={word} onChange={(e) => setWord(e.target.value)} placeholder={expected} />
    </Modal>
  );
}

function Maintenance() {
  const { message } = App.useApp();
  const [busy, setBusy] = useState('');
  const [danger, setDanger] = useState(null);
  const tasks = [
    { key: 'expirations', icon: faHourglassEnd, title: __( 'Run expirations now', 'memberglut' ), desc: __( 'Expire overdue subscriptions and update roles without waiting for the scheduler.', 'memberglut' ) },
    { key: 'recount', icon: faCalculator, title: __( 'Recount members', 'memberglut' ), desc: __( 'Rebuild the member counts and revenue totals shown on plans and the dashboard.', 'memberglut' ) },
    { key: 'sync-roles', icon: faRotate, title: __( 'Sync roles with plans', 'memberglut' ), desc: __( 'Give every active member their plan’s role again, and remove roles from expired members.', 'memberglut' ) },
    { key: 'clear-cache', icon: faBroom, title: __( 'Clear cached data', 'memberglut' ), desc: __( 'Delete MemberGlut transients (stats, access cache).', 'memberglut' ) },
    { key: 'reset-settings', icon: faEraser, title: __( 'Reset settings', 'memberglut' ), desc: __( 'Put Global Settings back to their defaults. Plans, members and payments are kept.', 'memberglut' ), danger: true },
    { key: 'delete-all', icon: faTrashCan, title: __( 'Delete all MemberGlut data', 'memberglut' ), desc: __( 'Remove every plan, member subscription, payment, rule, log and setting. WordPress users stay. This cannot be undone.', 'memberglut' ), danger: true },
  ];
  const run = (t) => {
    if (t.danger) { setDanger(t); return; }
    setBusy(t.key);
    api.runMaintenance(t.key).then((r) => message.success(r.message)).catch((e) => message.error(e.message)).finally(() => setBusy(''));
  };
  return (
    <div className="mg-card mg-tools-card">
      <div className="mg-task-grid">
        {tasks.map((t) => (
          <div key={t.key} className={`mg-task ${t.danger ? 'danger' : ''}`}>
            <div className="mg-task-t"><FontAwesomeIcon icon={t.icon} style={{ marginRight: 8, color: t.danger ? '#dc2626' : '#e94560' }} />{t.title}</div>
            <div className="mg-task-d">{t.desc}</div>
            <Button danger={t.danger} loading={busy === t.key} onClick={() => run(t)}>{__( 'Run', 'memberglut' )}</Button>
          </div>
        ))}
      </div>
      {danger && <DangerModal task={danger} onClose={() => setDanger(null)} />}
    </div>
  );
}

function Tools() {
  return (
    <>
      <PageHeader title={__( 'Data & Logs', 'memberglut' )} subtitle={__( 'Import and export, logs, system status and maintenance.', 'memberglut' )} />
      <Tabs className="mg-page-tabs" defaultActiveKey={queryArg('tab') || 'transfer'} destroyInactiveTabPane items={[
        { key: 'transfer', label: __( 'Import / Export', 'memberglut' ), children: <ImportExport /> },
        { key: 'logs', label: __( 'Logs', 'memberglut' ), children: <Logs /> },
        { key: 'activity', label: __( 'Access log', 'memberglut' ), children: <Activity /> },
        { key: 'status', label: __( 'System status', 'memberglut' ), children: <Status /> },
        { key: 'maintenance', label: __( 'Maintenance', 'memberglut' ), children: <Maintenance /> },
      ]} />
    </>
  );
}

export function ToolsPage() {
  return <Page active=""><Tools /></Page>;
}
