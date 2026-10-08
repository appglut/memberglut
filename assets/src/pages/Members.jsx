import React, { useEffect, useState, useCallback, useRef } from 'react';
import { __, sprintf, _n } from '@wordpress/i18n';
import {
  App, Table, Button, Input, Select, Modal, Form, Radio, DatePicker, Dropdown, Avatar, Tooltip, Popconfirm, Checkbox, Spin,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faMagnifyingGlass, faFileExport, faEnvelope, faCircleCheck, faLayerGroup, faCalendarPlus,
  faBan, faTrashCan, faXmark, faEye, faUserCheck, faUsers, faUserClock, faHourglassEnd, faEllipsis, faPaperPlane, faUserXmark,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import Page, { PageHeader, StatCard, StatusBadge } from '../components/Page';
import { link, queryArg } from '../components/adminData';
import { ChangePlanModal, ExtendModal } from '../components/MemberModals';
import * as api from '../services/api';
import { money, date, SUB_STATUS, GATEWAY, initials } from '../services/format';
import { L, planOptions } from '../services/lookups';
import UserSearch from '../components/UserSearch';

function AddMemberModal({ open, onClose, onSaved }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const who = Form.useWatch('who', form);
  const expiry = Form.useWatch('expiry', form);

  const submit = async () => {
    const v = await form.validateFields();
    setSaving(true);
    try {
      await api.addMember({
        ...v,
        start: v.start ? v.start.format('YYYY-MM-DD') : '',
        expiry_date: v.expiry_date ? v.expiry_date.format('YYYY-MM-DD') : '',
      });
      message.success(__( 'Member added.', 'memberglut' ));
      form.resetFields();
      onSaved();
    } catch (e) {
      form.setFields(Object.entries(e.fields || {}).map(([name, msg]) => ({ name, errors: [msg] })));
      message.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={<span className="mg-modal-title">{__( 'Add member', 'memberglut' )}</span>} open={open} onCancel={onClose} onOk={submit} okText={__( 'Add member', 'memberglut' )} confirmLoading={saving} width={620} destroyOnClose>
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
            <Form.Item name="username" label={__( 'Username', 'memberglut' )} tooltip={__( 'Empty creates one from the email address.', 'memberglut' )}><Input /></Form.Item>
          </div>
        ) : (
          <Form.Item name="user_id" label={__( 'User', 'memberglut' )} rules={[{ required: true, message: __( 'Choose a user.', 'memberglut' ) }]}>
            <UserSearch />
          </Form.Item>
        )}
        <div className="mg-form-grid">
          <Form.Item name="plan_id" label={__( 'Plan', 'memberglut' )} rules={[{ required: true, message: __( 'Choose a plan.', 'memberglut' ) }]}><Select options={planOptions()} /></Form.Item>
          <Form.Item name="status" label={__( 'Status', 'memberglut' )}><Select options={['active', 'trialing', 'pending', 'on_hold'].map((s) => ({ value: s, label: SUB_STATUS[s] }))} /></Form.Item>
          <Form.Item name="start" label={__( 'Start date', 'memberglut' )}><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="expiry" label={__( 'Expires', 'memberglut' )}>
            <Select options={[{ value: 'plan', label: __( 'From the plan’s duration', 'memberglut' ) }, { value: 'never', label: __( 'Never', 'memberglut' ) }, { value: 'date', label: __( 'On a date…', 'memberglut' ) }]} />
          </Form.Item>
          {expiry === 'date' && <Form.Item name="expiry_date" label={__( 'Expiry date', 'memberglut' )} rules={[{ required: true, message: __( 'Choose a date.', 'memberglut' ) }]}><DatePicker style={{ width: '100%' }} /></Form.Item>}
        </div>
        <Form.Item name="send_email" valuePropName="checked" style={{ marginBottom: 0 }}>
          <Checkbox>{who === 'new' ? __( 'Email the login details and a set-password link', 'memberglut' ) : __( 'Send the “Subscription activated” email', 'memberglut' )}</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
}

function EmailMembersModal({ open, onClose, selected }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [sending, setSending] = useState(false);
  const send = async () => {
    const v = await form.validateFields();
    setSending(true);
    try {
      const r = await api.broadcast(selected.length ? { ...v, ids: selected } : v);
      message.success(sprintf( _n( 'Email queued for %d member. It is sent in the background.', 'Email queued for %d members. It is sent in batches in the background.', r.recipients, 'memberglut' ), r.recipients ));
      form.resetFields();
      onClose();
    } catch (e) { message.error(e.message); } finally { setSending(false); }
  };
  return (
    <Modal title={<span className="mg-modal-title">{__( 'Email members', 'memberglut' )}</span>} open={open} onCancel={onClose} onOk={send} confirmLoading={sending} okText={__( 'Send email', 'memberglut' )} okButtonProps={{ icon: <FontAwesomeIcon icon={faPaperPlane} /> }} width={640} destroyOnClose>
      <Form form={form} layout="vertical" requiredMark={false} initialValues={{ plans: [], statuses: ['active', 'trialing'] }}>
        {selected.length > 0 ? (
          <div className="mg-fs-note" style={{ marginTop: 0, marginBottom: 16 }}>{sprintf( _n( 'Sending to %d selected member.', 'Sending to %d selected members.', selected.length, 'memberglut' ), selected.length )}</div>
        ) : (
          <div className="mg-form-grid">
            <Form.Item name="plans" label={__( 'Plans', 'memberglut' )} tooltip={__( 'Empty sends to every plan.', 'memberglut' )}><Select mode="multiple" options={planOptions()} placeholder={__( 'All plans', 'memberglut' )} /></Form.Item>
            <Form.Item name="statuses" label={__( 'Subscription status', 'memberglut' )}><Select mode="multiple" options={Object.entries(SUB_STATUS).map(([value, label]) => ({ value, label }))} /></Form.Item>
          </div>
        )}
        <Form.Item name="subject" label={__( 'Subject', 'memberglut' )} rules={[{ required: true, message: __( 'Enter a subject.', 'memberglut' ) }]}><Input /></Form.Item>
        <Form.Item name="body" label={__( 'Message', 'memberglut' )} rules={[{ required: true, message: __( 'Write a message.', 'memberglut' ) }]} extra={__( 'Smart tags such as {first_name} and {plan_name} work here. Uses your email template and sender.', 'memberglut' )}><Input.TextArea rows={7} /></Form.Item>
      </Form>
    </Modal>
  );
}

function Members() {
  const { message, modal } = App.useApp();
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(queryArg('status') || '');
  const [search, setSearch] = useState('');
  const [plan, setPlan] = useState(Number(queryArg('plan')) || null);
  const [gateway, setGateway] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState({});
  const [selected, setSelected] = useState([]);
  const [addOpen, setAddOpen] = useState(queryArg('add') === '1');
  const [mailOpen, setMailOpen] = useState(false);
  const [planModal, setPlanModal] = useState(null); // { ids, gatewayManaged }
  const [extendModal, setExtendModal] = useState(null); // { ids }

  const filters = { status, search, plan, gateway };

  const load = useCallback(() => {
    setLoading(true);
    api.getMembers({ ...filters, page, per_page: pageSize, orderby: sort.field, order: sort.order })
      .then((r) => { setRows(r.items); setTotal(r.total); setCounts(r.counts || {}); })
      .catch((e) => message.error(e.message))
      .finally(() => setLoading(false));
  }, [status, search, plan, gateway, page, pageSize, sort.field, sort.order]);

  useEffect(() => {
    const t = setTimeout(load, search ? 300 : 0);
    return () => clearTimeout(t);
  }, [load]);

  const afterAction = (r, label) => {
    if (r && r.queued) message.success(sprintf( __( '%d members are being updated in the background.', 'memberglut' ), r.queued ));
    else if (r && typeof r.done === 'number') message.success(sprintf( __( '%1$s: %2$d updated%3$s.', 'memberglut' ), label, r.done, r.failed ? sprintf( __( ', %d failed', 'memberglut' ), r.failed ) : '' ));
    else message.success(label);
    setSelected([]);
    load();
  };

  const bulk = async (action, ids, args, label) => {
    try { afterAction(await api.bulkMembers(action, ids, args), label); } catch (e) { message.error(e.message); }
  };

  const exportCsv = async () => {
    try {
      await api.exportMembers({ status, search, plan, gateway });
    } catch (e) { message.error(e.message); }
  };

  const tabs = [['', __( 'All', 'memberglut' ), counts.all || 0], ...Object.keys(SUB_STATUS).map((s) => [s, SUB_STATUS[s], counts[s] || 0])];

  const rowActions = (r) => (
    <div className="mg-row-actions">
      <a href={link('member_detail', { user: r.user_id })}><FontAwesomeIcon icon={faEye} /> {__( 'View', 'memberglut' )}</a>
      <span className="mg-action-sep">|</span>
      {!r.approved
        ? <a onClick={() => bulk('approve', [r.id], {}, __( 'Approved', 'memberglut' ))}><FontAwesomeIcon icon={faUserCheck} /> {__( 'Approve', 'memberglut' )}</a>
        : <a href={`mailto:${r.email}`}><FontAwesomeIcon icon={faEnvelope} /> {__( 'Email', 'memberglut' )}</a>}
      <span className="mg-action-sep">|</span>
      {r.account_only ? (
        <Popconfirm title={__( 'Reject this registration?', 'memberglut' )} description={__( 'The account cannot log in. The “Account rejected” email is sent if it is on.', 'memberglut' )} okButtonProps={{ danger: true }} onConfirm={() => bulk('reject', [r.id], {}, __( 'Rejected', 'memberglut' ))}>
          <a className="mg-action-delete"><FontAwesomeIcon icon={faUserXmark} /> {__( 'Reject', 'memberglut' )}</a>
        </Popconfirm>
      ) : (
        <Popconfirm title={__( 'Remove this membership?', 'memberglut' )} description={__( 'The WordPress user and payments are kept.', 'memberglut' )} okButtonProps={{ danger: true }} onConfirm={() => bulk('remove', [r.id], {}, __( 'Membership removed', 'memberglut' ))}>
          <a className="mg-action-delete"><FontAwesomeIcon icon={faTrashCan} /> {__( 'Remove', 'memberglut' )}</a>
        </Popconfirm>
      )}
    </div>
  );

  const columns = [
    {
      title: __( 'Member', 'memberglut' ), dataIndex: 'name', key: 'name', sorter: true,
      render: (v, r) => (
        <div className="mg-user-cell">
          <Avatar style={{ background: '#fff1f3', color: '#e94560', fontWeight: 600 }}>{initials(r.name)}</Avatar>
          <div>
            <a href={link('member_detail', { user: r.user_id })} className="mg-strong-link">{r.name}</a>
            <div className="mg-muted">{r.email}</div>
            {rowActions(r)}
          </div>
        </div>
      ),
    },
    { title: __( 'Plan', 'memberglut' ), dataIndex: 'plan', key: 'plan', render: (v, r) => (r.account_only ? <span className="mg-muted">{__( 'No plan yet', 'memberglut' )}</span> : <span className="mg-plan-pill" style={{ '--c': r.plan_color }}>{v}</span>) },
    {
      title: __( 'Status', 'memberglut' ), dataIndex: 'status', key: 'status', render: (v, r) => (
        <>
          <StatusBadge status={v} label={SUB_STATUS[v]} />
          {r.account_status === 'pending_email' && <div className="mg-muted">{__( 'Email not confirmed', 'memberglut' )}</div>}
          {r.account_status === 'pending_admin' && <div className="mg-muted">{__( 'Needs approval', 'memberglut' )}</div>}
        </>
      ),
    },
    { title: __( 'Payment', 'memberglut' ), dataIndex: 'gateway', key: 'gateway', render: (v) => <span className="mg-muted">{GATEWAY[v] || v}</span> },
    { title: __( 'Started', 'memberglut' ), dataIndex: 'started', key: 'started', sorter: true, render: date },
    { title: __( 'Expires', 'memberglut' ), dataIndex: 'expires', key: 'expires', sorter: true, render: (v, r) => (r.account_only ? '—' : (v ? date(v) : <span className="mg-muted">{__( 'Never', 'memberglut' )}</span>)) },
    { title: __( 'Spent', 'memberglut' ), dataIndex: 'total_spent', key: 'spent', align: 'right', sorter: true, render: (v) => money(v) },
    {
      title: '', width: 48, render: (v, r) => (r.account_only ? null : (
        <Dropdown trigger={['click']} menu={{
          items: [
            { key: 'plan', label: __( 'Change plan', 'memberglut' ), icon: <FontAwesomeIcon icon={faLayerGroup} /> },
            { key: 'extend', label: __( 'Extend expiry', 'memberglut' ), icon: <FontAwesomeIcon icon={faCalendarPlus} /> },
            { key: 'cancel', label: __( 'Cancel subscription', 'memberglut' ), icon: <FontAwesomeIcon icon={faBan} />, disabled: ['canceled', 'expired'].includes(r.status) },
            { type: 'divider' },
            { key: 'user', label: __( 'Edit WordPress user', 'memberglut' ) },
          ],
          onClick: ({ key }) => {
            if (key === 'plan') setPlanModal({ ids: [r.id], gatewayManaged: r.gateway_managed });
            else if (key === 'extend') setExtendModal({ ids: [r.id] });
            else if (key === 'cancel') {
              modal.confirm({
                title: __( 'Cancel this subscription?', 'memberglut' ),
                content: __( 'Automatic renewal stops. Depending on Global Settings › Member account, access ends now or at the end of the period.', 'memberglut' ),
                okText: __( 'Cancel subscription', 'memberglut' ), okButtonProps: { danger: true }, cancelText: __( 'Keep', 'memberglut' ),
                onOk: () => bulk('cancel', [r.id], {}, __( 'Subscription canceled', 'memberglut' )),
              });
            } else window.location.href = `user-edit.php?user_id=${r.user_id}`;
          },
        }}>
          <Button type="text" icon={<FontAwesomeIcon icon={faEllipsis} />} />
        </Dropdown>
      )),
    },
  ];

  return (
    <>
      <PageHeader
        title={__( 'Members', 'memberglut' )}
        subtitle={__( 'Everyone with a membership plan: status, dates and payments.', 'memberglut' )}
        actions={(
          <>
            <Button size="large" icon={<FontAwesomeIcon icon={faEnvelope} />} onClick={() => { setSelected([]); setMailOpen(true); }}>{__( 'Email members', 'memberglut' )}</Button>
            <Button size="large" type="primary" icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setAddOpen(true)}>{__( 'Add member', 'memberglut' )}</Button>
          </>
        )}
      />

      <div className="mg-stats-row">
        <StatCard icon={<FontAwesomeIcon icon={faUsers} />} label={__( 'All members', 'memberglut' )} value={counts.all || 0} />
        <StatCard icon={<FontAwesomeIcon icon={faCircleCheck} />} label={__( 'Active', 'memberglut' )} value={(counts.active || 0) + (counts.trialing || 0)} hint={sprintf( __( '%d on a free trial', 'memberglut' ), counts.trialing || 0 )} trend="up" />
        <StatCard icon={<FontAwesomeIcon icon={faUserClock} />} label={__( 'Pending', 'memberglut' )} value={counts.pending || 0} hint={__( 'Waiting for approval or payment', 'memberglut' )} />
        <StatCard icon={<FontAwesomeIcon icon={faHourglassEnd} />} label={__( 'Expired or canceled', 'memberglut' )} value={(counts.expired || 0) + (counts.canceled || 0)} trend="down" />
      </div>

      <div className="mg-filter-tabs">
        {tabs.map(([key, label, n]) => (
          <button key={key || 'all'} type="button" className={`mg-filter-tab ${status === key ? 'active' : ''}`} onClick={() => { setStatus(key); setPage(1); }}>
            {label} <span className="mg-filter-count">{n}</span>
          </button>
        ))}
      </div>

      <div className="mg-table-wrap">
        {selected.length > 0 ? (
          <div className="mg-bulk-bar">
            <span>{sprintf( _n( '%d selected', '%d selected', selected.length, 'memberglut' ), selected.length )}</span>
            <Button className="mg-bulk-btn" icon={<FontAwesomeIcon icon={faUserCheck} />} onClick={() => bulk('approve', selected, {}, __( 'Approve', 'memberglut' ))}>{__( 'Approve', 'memberglut' )}</Button>
            <Button className="mg-bulk-btn" icon={<FontAwesomeIcon icon={faLayerGroup} />} onClick={() => setPlanModal({ ids: selected.filter((id) => id > 0) })}>{__( 'Change plan', 'memberglut' )}</Button>
            <Button className="mg-bulk-btn" icon={<FontAwesomeIcon icon={faCalendarPlus} />} onClick={() => setExtendModal({ ids: selected.filter((id) => id > 0) })}>{__( 'Extend', 'memberglut' )}</Button>
            <Button className="mg-bulk-btn" icon={<FontAwesomeIcon icon={faEnvelope} />} onClick={() => setMailOpen(true)}>{__( 'Email', 'memberglut' )}</Button>
            <Button className="mg-bulk-btn" icon={<FontAwesomeIcon icon={faBan} />} onClick={() => modal.confirm({ title: __( 'Expire these memberships now?', 'memberglut' ), content: __( 'Access ends immediately and gateway subscriptions are stopped.', 'memberglut' ), okButtonProps: { danger: true }, onOk: () => bulk('expire', selected.filter((id) => id > 0), {}, __( 'Expired', 'memberglut' )) })}>{__( 'Expire now', 'memberglut' )}</Button>
            <Button className="mg-bulk-btn" danger icon={<FontAwesomeIcon icon={faTrashCan} />} onClick={() => modal.confirm({ title: __( 'Remove these memberships?', 'memberglut' ), content: __( 'WordPress users are kept. Payments stay in the history.', 'memberglut' ), okButtonProps: { danger: true }, onOk: () => bulk('remove', selected.filter((id) => id > 0), {}, __( 'Removed', 'memberglut' )) })}>{__( 'Remove', 'memberglut' )}</Button>
            <Button type="text" className="mg-bulk-clear" icon={<FontAwesomeIcon icon={faXmark} />} onClick={() => setSelected([])}>{__( 'Clear', 'memberglut' )}</Button>
          </div>
        ) : (
          <div className="mg-table-toolbar">
            <div className="mg-table-toolbar-left">
              <Input allowClear prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />} placeholder={__( 'Search name, email or username…', 'memberglut' )} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} style={{ width: 300 }} />
              <Select allowClear placeholder={__( 'All plans', 'memberglut' )} value={plan} onChange={(v) => { setPlan(v || null); setPage(1); }} options={planOptions()} style={{ width: 170 }} />
              <Select allowClear placeholder={__( 'All payment methods', 'memberglut' )} value={gateway} onChange={(v) => { setGateway(v || null); setPage(1); }} options={Object.entries(GATEWAY).map(([value, label]) => ({ value, label }))} style={{ width: 200 }} />
            </div>
            <div className="mg-table-toolbar-right">
              <Tooltip title={__( 'Export the filtered list to CSV', 'memberglut' )}>
                <Button icon={<FontAwesomeIcon icon={faFileExport} />} onClick={exportCsv}>{__( 'Export', 'memberglut' )}</Button>
              </Tooltip>
            </div>
          </div>
        )}
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={rows}
          rowSelection={{ selectedRowKeys: selected, onChange: setSelected, preserveSelectedRowKeys: true }}
          onChange={(p, f, s) => {
            setPage(p.current); setPageSize(p.pageSize);
            setSort(s && s.order ? { field: s.columnKey, order: s.order === 'ascend' ? 'asc' : 'desc' } : {});
          }}
          pagination={{ current: page, pageSize, total, showSizeChanger: true, showTotal: (t) => sprintf( __( '%d members', 'memberglut' ), t ) }}
        />
      </div>

      <AddMemberModal open={addOpen} onClose={() => setAddOpen(false)} onSaved={() => { setAddOpen(false); load(); }} />
      <EmailMembersModal open={mailOpen} onClose={() => setMailOpen(false)} selected={selected} />
      <ChangePlanModal open={!!planModal} count={planModal ? planModal.ids.length : 1} gatewayManaged={planModal && planModal.gatewayManaged} onCancel={() => setPlanModal(null)}
        onOk={async (planId) => { await bulk('change_plan', planModal.ids, { plan_id: planId }, __( 'Plan changed', 'memberglut' )); setPlanModal(null); }} />
      <ExtendModal open={!!extendModal} count={extendModal ? extendModal.ids.length : 1} onCancel={() => setExtendModal(null)}
        onOk={async (args) => { await bulk('extend', extendModal.ids, args, __( 'Extended', 'memberglut' )); setExtendModal(null); }} />
    </>
  );
}

export function MembersPage() {
  return <Page active="members"><Members /></Page>;
}
