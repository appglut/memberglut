import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { App, Tabs, Button, Select, Upload, Table, Tag, Input, DatePicker, Switch, InputNumber, Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileExport, faFileImport, faMagnifyingGlass, faTrashCan, faCircleCheck, faTriangleExclamation,
  faUsers, faGear, faUserGear, faRotate, faBroom, faHourglassEnd, faCalculator, faEraser,
} from '@fortawesome/free-solid-svg-icons';
import Page, { PageHeader } from '../components/Page';
import { queryArg } from '../components/adminData';
import * as api from '../services/api';
import { dateTime } from '../services/format';
import { PLANS, ROLES, ACTIVITY } from '../services/demoData';

const LEVEL_COLOR = { info: 'blue', warning: 'orange', error: 'red', debug: 'default' };

function ImportExport() {
  const { message } = App.useApp();
  const [plans, setPlans] = useState([]);
  const [role, setRole] = useState('subscriber');
  const [toPlan, setToPlan] = useState(1);
  return (
    <div className="mg-tools-grid">
      <div className="mg-card mg-tools-card">
        <div className="mg-tool-h"><FontAwesomeIcon icon={faUsers} /> {__( 'Export members', 'memberglut' )}</div>
        <p className="mg-mig-intro">{__( 'A CSV with profile fields, plans, dates, status and lifetime value. Opens in Excel or Google Sheets.', 'memberglut' )}</p>
        <Select mode="multiple" value={plans} onChange={setPlans} options={PLANS.map((p) => ({ value: p.id, label: p.name }))} placeholder={__( 'All plans', 'memberglut' )} style={{ width: '100%', marginBottom: 10 }} />
        <Checkbox defaultChecked>{__( 'Include custom fields', 'memberglut' )}</Checkbox><br />
        <Checkbox defaultChecked style={{ margin: '6px 0 14px' }}>{__( 'Include expired and canceled members', 'memberglut' )}</Checkbox><br />
        <Button type="primary" icon={<FontAwesomeIcon icon={faFileExport} />} onClick={() => message.success(__( 'members.csv downloaded.', 'memberglut' ))}>{__( 'Export members', 'memberglut' )}</Button>
      </div>

      <div className="mg-card mg-tools-card">
        <div className="mg-tool-h"><FontAwesomeIcon icon={faUserGear} /> {__( 'Turn existing users into members', 'memberglut' )}</div>
        <p className="mg-mig-intro">{__( 'Give a plan to every WordPress user who has a role. Useful when you start using MemberGlut on an existing site.', 'memberglut' )}</p>
        <div className="mg-inline-form">
          <span>{__( 'Users with role', 'memberglut' )}</span>
          <Select value={role} onChange={setRole} options={ROLES.map((r) => ({ value: r.slug, label: `${r.name} (${r.users})` }))} style={{ width: 200 }} />
          <span>{__( 'get plan', 'memberglut' )}</span>
          <Select value={toPlan} onChange={setToPlan} options={PLANS.map((p) => ({ value: p.id, label: p.name }))} style={{ width: 140 }} />
        </div>
        <Button style={{ marginTop: 14 }} onClick={() => message.success(sprintf( __( '%d users are now members.', 'memberglut' ), ROLES.find((r) => r.slug === role).users ))}>{__( 'Convert users', 'memberglut' )}</Button>
      </div>

      <div className="mg-card mg-tools-card">
        <div className="mg-tool-h"><FontAwesomeIcon icon={faGear} /> {__( 'Settings, plans, rules & roles', 'memberglut' )}</div>
        <p className="mg-mig-intro">{__( 'Move your setup to another site as one JSON file. Members and payments are not included.', 'memberglut' )}</p>
        <div className="mg-check-list">
          {[__( 'Global settings', 'memberglut' ), __( 'Plans', 'memberglut' ), __( 'Content rules', 'memberglut' ), __( 'Roles & capabilities', 'memberglut' ), __( 'Emails', 'memberglut' ), __( 'Coupons', 'memberglut' )].map((l) => <Checkbox key={l} defaultChecked>{l}</Checkbox>)}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <Button type="primary" icon={<FontAwesomeIcon icon={faFileExport} />} onClick={() => message.success(__( 'memberglut-setup.json downloaded.', 'memberglut' ))}>{__( 'Export', 'memberglut' )}</Button>
          <Upload accept=".json" showUploadList={false} beforeUpload={() => { message.info(__( 'A preview of what will change opens here.', 'memberglut' )); return false; }}>
            <Button icon={<FontAwesomeIcon icon={faFileImport} />}>{__( 'Import', 'memberglut' )}</Button>
          </Upload>
        </div>
      </div>
    </div>
  );
}

function Logs() {
  const { message } = App.useApp();
  const [rows, setRows] = useState([]);
  const [level, setLevel] = useState(null);
  const [source, setSource] = useState(null);
  const [search, setSearch] = useState('');
  useEffect(() => { api.getLogs().then(setRows); }, []);
  const filtered = rows.filter((r) => (!level || r.level === level) && (!source || r.source === source) && (!search || r.message.toLowerCase().includes(search.toLowerCase())));
  return (
    <div className="mg-card mg-tools-card">
      <div className="mg-log-settings">
        <label><Switch size="small" defaultChecked /> {__( 'Logging on', 'memberglut' )}</label>
        <label>{__( 'Keep logs for', 'memberglut' )} <InputNumber size="small" min={1} max={365} defaultValue={30} style={{ width: 70 }} /> {__( 'days', 'memberglut' )}</label>
        <label><Switch size="small" /> {__( 'Include debug messages', 'memberglut' )}</label>
      </div>
      <div className="mg-log-filters">
        <Input allowClear prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />} placeholder={__( 'Search messages…', 'memberglut' )} value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select allowClear placeholder={__( 'All levels', 'memberglut' )} value={level} onChange={setLevel} options={Object.keys(LEVEL_COLOR).map((l) => ({ value: l, label: l }))} style={{ width: 140 }} />
        <Select allowClear placeholder={__( 'All sources', 'memberglut' )} value={source} onChange={setSource} options={['subscription', 'payment', 'access', 'email', 'login', 'cron'].map((s) => ({ value: s, label: s }))} style={{ width: 160 }} />
        <DatePicker.RangePicker />
        <Button danger icon={<FontAwesomeIcon icon={faTrashCan} />} onClick={() => { setRows([]); message.success(__( 'Logs cleared.', 'memberglut' )); }}>{__( 'Clear logs', 'memberglut' )}</Button>
      </div>
      <Table rowKey="id" size="middle" dataSource={filtered} pagination={{ pageSize: 10 }} columns={[
        { title: __( 'Time', 'memberglut' ), dataIndex: 'date', width: 190, render: dateTime },
        { title: __( 'Level', 'memberglut' ), dataIndex: 'level', width: 100, render: (v) => <Tag color={LEVEL_COLOR[v]} bordered={false}>{v}</Tag> },
        { title: __( 'Source', 'memberglut' ), dataIndex: 'source', width: 130 },
        { title: __( 'Message', 'memberglut' ), dataIndex: 'message' },
      ]} />
    </div>
  );
}

function Activity() {
  return (
    <div className="mg-card mg-tools-card">
      <p className="mg-mig-intro" style={{ marginTop: 0 }}>{__( 'Every time access is granted, changed or removed, by whom, and why. Kept for the life of the membership.', 'memberglut' )}</p>
      <Table rowKey="id" size="middle" pagination={false} dataSource={ACTIVITY.concat(ACTIVITY.map((a) => ({ ...a, id: a.id + 50 })))} columns={[
        { title: __( 'Time', 'memberglut' ), dataIndex: 'date', width: 190, render: dateTime },
        { title: __( 'Event', 'memberglut' ), dataIndex: 'type', width: 120, render: (v) => <Tag bordered={false}>{v}</Tag> },
        { title: __( 'Details', 'memberglut' ), dataIndex: 'text' },
        { title: __( 'By', 'memberglut' ), width: 120, render: (v, r) => (r.type === 'grant' && r.id % 2 === 0 ? 'admin' : __( 'system', 'memberglut' )) },
      ]} />
    </div>
  );
}

function Status() {
  const checks = [
    [true, __( 'Membership pages are set', 'memberglut' ), ''],
    [true, __( 'Renewals and expirations are scheduled (Action Scheduler)', 'memberglut' ), __( 'Next run in 23 minutes', 'memberglut' )],
    [false, __( 'Stripe webhook received recently', 'memberglut' ), __( 'No webhook in 7 days — check the URL in Stripe', 'memberglut' )],
    [true, __( 'Site uses HTTPS', 'memberglut' ), ''],
    [false, __( 'A caching plugin is active', 'memberglut' ), __( 'Make sure member pages are excluded', 'memberglut' )],
    [true, __( 'Emails can be sent', 'memberglut' ), ''],
  ];
  const env = [
    ['MemberGlut', (typeof memberglut_admin !== 'undefined' && memberglut_admin.version) || '1.1.5'], ['WordPress', '6.8'], ['PHP', '8.2.12'], ['MySQL', '8.0.36'],
    ['Memory limit', '256M'], ['Max upload', '64M'], ['WP-Cron', __( 'Enabled', 'memberglut' )], ['Active plugins', '14'], ['Theme', 'Twenty Twenty-Five'], ['Multisite', __( 'No', 'memberglut' )],
  ];
  return (
    <div className="mg-card mg-tools-card">
      <div className="mg-status-grid">
        {[['671', __( 'Active members', 'memberglut' )], ['4', __( 'Plans', 'memberglut' )], ['4', __( 'Rules', 'memberglut' )], ['1,284', __( 'Payments', 'memberglut' )], ['8', __( 'Roles', 'memberglut' )]].map(([n, l]) => <div key={l} className="mg-status-stat"><b>{n}</b><span>{l}</span></div>)}
      </div>
      <div className="mg-tool-h">{__( 'Health checks', 'memberglut' )}</div>
      {checks.map(([ok, t, note]) => (
        <div key={t} className="mg-check"><FontAwesomeIcon icon={ok ? faCircleCheck : faTriangleExclamation} style={{ color: ok ? '#10b981' : '#f59e0b' }} />{t}{note && <em>{note}</em>}</div>
      ))}
      <div className="mg-tool-h">{__( 'Environment', 'memberglut' )}</div>
      <table className="mg-env"><tbody>{env.map(([k, v]) => <tr key={k}><th>{k}</th><td>{v}</td></tr>)}</tbody></table>
    </div>
  );
}

function Maintenance() {
  const { message, modal } = App.useApp();
  const tasks = [
    [faHourglassEnd, __( 'Run expirations now', 'memberglut' ), __( 'Expire overdue subscriptions and update roles without waiting for the scheduler.', 'memberglut' ), false],
    [faCalculator, __( 'Recount members', 'memberglut' ), __( 'Rebuild the member counts and revenue totals shown on plans and the dashboard.', 'memberglut' ), false],
    [faRotate, __( 'Sync roles with plans', 'memberglut' ), __( 'Give every active member their plan’s role again, and remove roles from expired members.', 'memberglut' ), false],
    [faBroom, __( 'Clear cached data', 'memberglut' ), __( 'Delete MemberGlut transients (stats, access cache).', 'memberglut' ), false],
    [faEraser, __( 'Reset settings', 'memberglut' ), __( 'Put Global Settings back to their defaults. Plans, members and payments are kept.', 'memberglut' ), true],
    [faTrashCan, __( 'Delete all MemberGlut data', 'memberglut' ), __( 'Remove every plan, member subscription, payment, rule, log and setting. WordPress users stay. This cannot be undone.', 'memberglut' ), true],
  ];
  return (
    <div className="mg-card mg-tools-card">
      <div className="mg-task-grid">
        {tasks.map(([icon, t, d, danger]) => (
          <div key={t} className={`mg-task ${danger ? 'danger' : ''}`}>
            <div className="mg-task-t"><FontAwesomeIcon icon={icon} style={{ marginRight: 8, color: danger ? '#dc2626' : '#e94560' }} />{t}</div>
            <div className="mg-task-d">{d}</div>
            <Button danger={danger} onClick={() => (danger
              ? modal.confirm({ title: t, content: d, okButtonProps: { danger: true }, okText: __( 'Yes, continue', 'memberglut' ), onOk: () => message.success(__( 'Done.', 'memberglut' )) })
              : message.success(__( 'Done.', 'memberglut' )))}>{__( 'Run', 'memberglut' )}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tools() {
  return (
    <>
      <PageHeader title={__( 'Data & Logs', 'memberglut' )} subtitle={__( 'Import and export, logs, system status and maintenance.', 'memberglut' )} />
      <Tabs className="mg-page-tabs" defaultActiveKey={queryArg('tab') || 'transfer'} items={[
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
