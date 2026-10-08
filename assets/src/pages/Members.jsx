import React, { useEffect, useMemo, useState } from 'react';
import { __, sprintf, _n } from '@wordpress/i18n';
import {
  App, Table, Button, Input, Select, Modal, Form, Radio, DatePicker, Switch, Dropdown, Avatar, Tooltip, Popconfirm, Checkbox,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faMagnifyingGlass, faFileExport, faEnvelope, faCircleCheck, faLayerGroup, faCalendarPlus,
  faBan, faTrashCan, faXmark, faEye, faUserCheck, faUsers, faUserClock, faHourglassEnd, faEllipsis, faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import Page, { PageHeader, StatCard, StatusBadge } from '../components/Page';
import { link, queryArg } from '../components/adminData';
import * as api from '../services/api';
import { money, date, SUB_STATUS, GATEWAY, initials } from '../services/format';
import { PLANS } from '../services/demoData';

const planOptions = PLANS.map((p) => ({ value: p.id, label: p.name }));

function AddMemberModal({ open, onClose, onSaved }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const who = Form.useWatch('who', form);
  const expiry = Form.useWatch('expiry', form);

  const submit = async () => {
    const v = await form.validateFields();
    setSaving(true);
    await api.saveMember(v);
    setSaving(false);
    message.success(__( 'Member added.', 'memberglut' ));
    form.resetFields();
    onSaved();
  };

  return (
    <Modal
      title={<span className="mg-modal-title">{__( 'Add member', 'memberglut' )}</span>}
      open={open}
      onCancel={onClose}
      onOk={submit}
      okText={__( 'Add member', 'memberglut' )}
      confirmLoading={saving}
      width={620}
      destroyOnClose
    >
      <p className="mg-modal-intro">{__( 'Give a plan to someone without payment, for example a comp account or an offline sale.', 'memberglut' )}</p>
      <Form form={form} layout="vertical" requiredMark={false} initialValues={{ who: 'existing', status: 'active', start: dayjs(), expiry: 'plan', send_email: true }}>
        <Form.Item name="who">
          <Radio.Group optionType="button" buttonStyle="solid" options={[{ value: 'existing', label: __( 'Existing user', 'memberglut' ) }, { value: 'new', label: __( 'New user', 'memberglut' ) }]} />
        </Form.Item>
        {who === 'new' ? (
          <div className="mg-form-grid">
            <Form.Item name="first_name" label={__( 'First name', 'memberglut' )}><Input /></Form.Item>
            <Form.Item name="last_name" label={__( 'Last name', 'memberglut' )}><Input /></Form.Item>
            <Form.Item name="email" label={__( 'Email', 'memberglut' )} rules={[{ required: true, type: 'email', message: __( 'Enter a valid email.', 'memberglut' ) }]}><Input /></Form.Item>
            <Form.Item name="username" label={__( 'Username', 'memberglut' )} tooltip={__( 'Empty uses the email address.', 'memberglut' )}><Input /></Form.Item>
          </div>
        ) : (
          <Form.Item name="user_id" label={__( 'User', 'memberglut' )} rules={[{ required: true, message: __( 'Choose a user.', 'memberglut' ) }]}>
            <Select showSearch placeholder={__( 'Search by name, username or email…', 'memberglut' )} optionFilterProp="label" options={[{ value: 1, label: 'admin (admin@example.com)' }, { value: 2, label: 'editor (editor@example.com)' }, { value: 3, label: 'jane (jane@example.com)' }]} />
          </Form.Item>
        )}
        <div className="mg-form-grid">
          <Form.Item name="plan_id" label={__( 'Plan', 'memberglut' )} rules={[{ required: true, message: __( 'Choose a plan.', 'memberglut' ) }]}><Select options={planOptions} /></Form.Item>
          <Form.Item name="status" label={__( 'Status', 'memberglut' )}><Select options={['active', 'trialing', 'pending', 'on_hold'].map((s) => ({ value: s, label: SUB_STATUS[s] }))} /></Form.Item>
          <Form.Item name="start" label={__( 'Start date', 'memberglut' )}><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="expiry" label={__( 'Expires', 'memberglut' )}>
            <Select options={[{ value: 'plan', label: __( 'From the plan’s duration', 'memberglut' ) }, { value: 'never', label: __( 'Never', 'memberglut' ) }, { value: 'date', label: __( 'On a date…', 'memberglut' ) }]} />
          </Form.Item>
          {expiry === 'date' && <Form.Item name="expiry_date" label={__( 'Expiry date', 'memberglut' )}><DatePicker style={{ width: '100%' }} /></Form.Item>}
        </div>
        <Form.Item name="send_email" valuePropName="checked" style={{ marginBottom: 0 }}>
          <Checkbox>{who === 'new' ? __( 'Email the login details and a set-password link', 'memberglut' ) : __( 'Send the “Subscription activated” email', 'memberglut' )}</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
}

function EmailMembersModal({ open, onClose, preselected }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const send = async () => {
    await form.validateFields();
    message.success(__( 'Email queued. It is sent in batches in the background.', 'memberglut' ));
    onClose();
  };
  return (
    <Modal title={<span className="mg-modal-title">{__( 'Email members', 'memberglut' )}</span>} open={open} onCancel={onClose} onOk={send} okText={__( 'Send email', 'memberglut' )} okButtonProps={{ icon: <FontAwesomeIcon icon={faPaperPlane} /> }} width={640} destroyOnClose>
      <Form form={form} layout="vertical" requiredMark={false} initialValues={{ plans: [], statuses: ['active', 'trialing'] }}>
        {preselected ? (
          <div className="mg-fs-note" style={{ marginTop: 0, marginBottom: 16 }}>{sprintf( _n( 'Sending to %d selected member.', 'Sending to %d selected members.', preselected, 'memberglut' ), preselected )}</div>
        ) : (
          <div className="mg-form-grid">
            <Form.Item name="plans" label={__( 'Plans', 'memberglut' )} tooltip={__( 'Empty sends to every plan.', 'memberglut' )}><Select mode="multiple" options={planOptions} placeholder={__( 'All plans', 'memberglut' )} /></Form.Item>
            <Form.Item name="statuses" label={__( 'Subscription status', 'memberglut' )}><Select mode="multiple" options={Object.entries(SUB_STATUS).map(([value, label]) => ({ value, label }))} /></Form.Item>
          </div>
        )}
        <Form.Item name="subject" label={__( 'Subject', 'memberglut' )} rules={[{ required: true, message: __( 'Enter a subject.', 'memberglut' ) }]}><Input /></Form.Item>
        <Form.Item name="body" label={__( 'Message', 'memberglut' )} rules={[{ required: true, message: __( 'Write a message.', 'memberglut' ) }]} extra={__( 'Smart tags such as {first_name} and {plan_name} work here.', 'memberglut' )}><Input.TextArea rows={7} /></Form.Item>
      </Form>
    </Modal>
  );
}

function Members() {
  const { message, modal } = App.useApp();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [plan, setPlan] = useState(null);
  const [gateway, setGateway] = useState(null);
  const [selected, setSelected] = useState([]);
  const [addOpen, setAddOpen] = useState(queryArg('add') === '1');
  const [mailOpen, setMailOpen] = useState(false);

  useEffect(() => { api.getMembers().then(setRows).finally(() => setLoading(false)); }, []);

  const counts = useMemo(() => rows.reduce((c, r) => ({ ...c, [r.status]: (c[r.status] || 0) + 1 }), {}), [rows]);
  const filtered = rows.filter((r) => (!status || r.status === status)
    && (!plan || r.plan_id === plan)
    && (!gateway || r.gateway === gateway)
    && (!search || `${r.name} ${r.email} ${r.username}`.toLowerCase().includes(search.toLowerCase())));

  const bulk = (label) => {
    message.success(sprintf( __( '%1$s: %2$d members updated.', 'memberglut' ), label, selected.length ));
    setSelected([]);
  };

  const tabs = [['', __( 'All', 'memberglut' ), rows.length], ...Object.keys(SUB_STATUS).map((s) => [s, SUB_STATUS[s], counts[s] || 0])];

  const columns = [
    {
      title: __( 'Member', 'memberglut' ), dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name),
      render: (v, r) => (
        <div className="mg-user-cell">
          <Avatar style={{ background: '#fff1f3', color: '#e94560', fontWeight: 600 }}>{initials(r.name)}</Avatar>
          <div>
            <a href={link('member_detail', { id: r.id })} className="mg-strong-link">{r.name}</a>
            <div className="mg-muted">{r.email}</div>
            <div className="mg-row-actions">
              <a href={link('member_detail', { id: r.id })}><FontAwesomeIcon icon={faEye} /> {__( 'View', 'memberglut' )}</a>
              <span className="mg-action-sep">|</span>
              {r.status === 'pending' ? <a onClick={() => message.success(__( 'Member approved.', 'memberglut' ))}><FontAwesomeIcon icon={faUserCheck} /> {__( 'Approve', 'memberglut' )}</a> : <a href={`mailto:${r.email}`}><FontAwesomeIcon icon={faEnvelope} /> {__( 'Email', 'memberglut' )}</a>}
              <span className="mg-action-sep">|</span>
              <Popconfirm title={__( 'Remove this membership?', 'memberglut' )} description={__( 'The WordPress user is kept.', 'memberglut' )} onConfirm={() => message.success(__( 'Membership removed.', 'memberglut' ))}>
                <a className="mg-action-delete"><FontAwesomeIcon icon={faTrashCan} /> {__( 'Remove', 'memberglut' )}</a>
              </Popconfirm>
            </div>
          </div>
        </div>
      ),
    },
    { title: __( 'Plan', 'memberglut' ), dataIndex: 'plan', render: (v, r) => <span className="mg-plan-pill" style={{ '--c': PLANS.find((p) => p.id === r.plan_id)?.color }}>{v}</span> },
    { title: __( 'Status', 'memberglut' ), dataIndex: 'status', render: (v) => <StatusBadge status={v} label={SUB_STATUS[v]} /> },
    { title: __( 'Payment', 'memberglut' ), dataIndex: 'gateway', render: (v) => <span className="mg-muted">{GATEWAY[v]}</span> },
    { title: __( 'Started', 'memberglut' ), dataIndex: 'started', sorter: (a, b) => a.started.localeCompare(b.started), render: date },
    { title: __( 'Expires', 'memberglut' ), dataIndex: 'expires', sorter: (a, b) => String(a.expires).localeCompare(String(b.expires)), render: (v) => (v ? date(v) : <span className="mg-muted">{__( 'Never', 'memberglut' )}</span>) },
    { title: __( 'Spent', 'memberglut' ), dataIndex: 'total_spent', align: 'right', sorter: (a, b) => a.total_spent - b.total_spent, render: (v) => money(v) },
    {
      title: '', width: 48, render: (v, r) => (
        <Dropdown trigger={['click']} menu={{
          items: [
            { key: 'plan', label: __( 'Change plan', 'memberglut' ), icon: <FontAwesomeIcon icon={faLayerGroup} /> },
            { key: 'extend', label: __( 'Extend expiry', 'memberglut' ), icon: <FontAwesomeIcon icon={faCalendarPlus} /> },
            { key: 'cancel', label: __( 'Cancel subscription', 'memberglut' ), icon: <FontAwesomeIcon icon={faBan} /> },
            { type: 'divider' },
            { key: 'user', label: __( 'Edit WordPress user', 'memberglut' ) },
          ],
          onClick: ({ key }) => message.info(sprintf( __( '%s opens here.', 'memberglut' ), key )),
        }}>
          <Button type="text" icon={<FontAwesomeIcon icon={faEllipsis} />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title={__( 'Members', 'memberglut' )}
        subtitle={__( 'Everyone with a membership plan: status, dates and payments.', 'memberglut' )}
        actions={(
          <>
            <Button size="large" icon={<FontAwesomeIcon icon={faEnvelope} />} onClick={() => setMailOpen(true)}>{__( 'Email members', 'memberglut' )}</Button>
            <Button size="large" type="primary" icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setAddOpen(true)}>{__( 'Add member', 'memberglut' )}</Button>
          </>
        )}
      />

      <div className="mg-stats-row">
        <StatCard icon={<FontAwesomeIcon icon={faUsers} />} label={__( 'All members', 'memberglut' )} value={rows.length} />
        <StatCard icon={<FontAwesomeIcon icon={faCircleCheck} />} label={__( 'Active', 'memberglut' )} value={(counts.active || 0) + (counts.trialing || 0)} hint={sprintf( __( '%d on a free trial', 'memberglut' ), counts.trialing || 0 )} trend="up" />
        <StatCard icon={<FontAwesomeIcon icon={faUserClock} />} label={__( 'Waiting for approval', 'memberglut' )} value={counts.pending || 0} />
        <StatCard icon={<FontAwesomeIcon icon={faHourglassEnd} />} label={__( 'Expired or canceled', 'memberglut' )} value={(counts.expired || 0) + (counts.canceled || 0)} trend="down" />
      </div>

      <div className="mg-filter-tabs">
        {tabs.map(([key, label, n]) => (
          <button key={key || 'all'} type="button" className={`mg-filter-tab ${status === key ? 'active' : ''}`} onClick={() => setStatus(key)}>
            {label} <span className="mg-filter-count">{n}</span>
          </button>
        ))}
      </div>

      <div className="mg-table-wrap">
        {selected.length > 0 ? (
          <div className="mg-bulk-bar">
            <span>{sprintf( _n( '%d selected', '%d selected', selected.length, 'memberglut' ), selected.length )}</span>
            <Button className="mg-bulk-btn" icon={<FontAwesomeIcon icon={faUserCheck} />} onClick={() => bulk(__( 'Approve', 'memberglut' ))}>{__( 'Approve', 'memberglut' )}</Button>
            <Button className="mg-bulk-btn" icon={<FontAwesomeIcon icon={faLayerGroup} />} onClick={() => bulk(__( 'Change plan', 'memberglut' ))}>{__( 'Change plan', 'memberglut' )}</Button>
            <Button className="mg-bulk-btn" icon={<FontAwesomeIcon icon={faCalendarPlus} />} onClick={() => bulk(__( 'Extend', 'memberglut' ))}>{__( 'Extend', 'memberglut' )}</Button>
            <Button className="mg-bulk-btn" icon={<FontAwesomeIcon icon={faEnvelope} />} onClick={() => setMailOpen(true)}>{__( 'Email', 'memberglut' )}</Button>
            <Button className="mg-bulk-btn" icon={<FontAwesomeIcon icon={faBan} />} onClick={() => bulk(__( 'Expire', 'memberglut' ))}>{__( 'Expire now', 'memberglut' )}</Button>
            <Button className="mg-bulk-btn" danger icon={<FontAwesomeIcon icon={faTrashCan} />} onClick={() => modal.confirm({ title: __( 'Remove these memberships?', 'memberglut' ), content: __( 'WordPress users are kept. Payments stay in the history.', 'memberglut' ), okButtonProps: { danger: true }, onOk: () => bulk(__( 'Remove', 'memberglut' )) })}>{__( 'Remove', 'memberglut' )}</Button>
            <Button type="text" className="mg-bulk-clear" icon={<FontAwesomeIcon icon={faXmark} />} onClick={() => setSelected([])}>{__( 'Clear', 'memberglut' )}</Button>
          </div>
        ) : (
          <div className="mg-table-toolbar">
            <div className="mg-table-toolbar-left">
              <Input allowClear prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />} placeholder={__( 'Search name, email or username…', 'memberglut' )} value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 300 }} />
              <Select allowClear placeholder={__( 'All plans', 'memberglut' )} value={plan} onChange={setPlan} options={planOptions} style={{ width: 160 }} />
              <Select allowClear placeholder={__( 'All payment methods', 'memberglut' )} value={gateway} onChange={setGateway} options={Object.entries(GATEWAY).map(([value, label]) => ({ value, label }))} style={{ width: 200 }} />
            </div>
            <div className="mg-table-toolbar-right">
              <Tooltip title={__( 'Export the filtered list to CSV', 'memberglut' )}>
                <Button icon={<FontAwesomeIcon icon={faFileExport} />} onClick={() => message.success(__( 'Export started.', 'memberglut' ))}>{__( 'Export', 'memberglut' )}</Button>
              </Tooltip>
            </div>
          </div>
        )}
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={filtered}
          rowSelection={{ selectedRowKeys: selected, onChange: setSelected }}
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => sprintf( __( '%d members', 'memberglut' ), t ) }}
        />
      </div>

      <AddMemberModal open={addOpen} onClose={() => setAddOpen(false)} onSaved={() => setAddOpen(false)} />
      <EmailMembersModal open={mailOpen} onClose={() => setMailOpen(false)} preselected={selected.length} />
    </>
  );
}

export function MembersPage() {
  return <Page active="members"><Members /></Page>;
}
