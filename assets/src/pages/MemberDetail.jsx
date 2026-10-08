import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import {
  App, Avatar, Button, Skeleton, Table, Tag, Timeline, Input, Dropdown, Tabs, Descriptions, Popconfirm, Empty, Alert,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft, faEnvelope, faUserPen, faLayerGroup, faCalendarPlus, faBan, faPlus, faEllipsis, faNoteSticky,
  faTrashCan, faKey, faRightFromBracket, faUserCheck, faUserXmark, faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import Page, { StatusBadge } from '../components/Page';
import { link, queryArg } from '../components/adminData';
import { ChangePlanModal, EditSubscriptionModal } from '../components/MemberModals';
import * as api from '../services/api';
import { money, date, dateTime, fromNow, SUB_STATUS, PAY_STATUS, GATEWAY, initials, planPrice } from '../services/format';
import { roleName } from '../services/lookups';

const EVENT_COLOR = { grant: 'green', activate: 'green', approve: 'green', payment: 'blue', renew: 'blue', cancel: 'orange', hold: 'orange', expire: 'red', revoke: 'red', reject: 'red', pending: 'gray' };

function SubscriptionCard({ s, onAction }) {
  const plan = s.plan || { name: `#${s.plan_id}`, color: '#94a3b8' };
  return (
    <div className="mg-sub-card" style={{ '--c': plan.color }}>
      <div className="mg-sub-head">
        <div>
          <div className="mg-sub-name">{plan.name} <StatusBadge status={s.status} label={SUB_STATUS[s.status] || s.status} /></div>
          <div className="mg-muted">{s.plan ? planPrice(s.plan) : ''} · {GATEWAY[s.gateway] || s.gateway}{s.gateway_managed ? ` · ${s.gateway_subscription_id}` : ''}</div>
        </div>
        <Dropdown trigger={['click']} menu={{
          items: [
            { key: 'change', label: __( 'Change plan', 'memberglut' ), icon: <FontAwesomeIcon icon={faLayerGroup} /> },
            { key: 'edit', label: __( 'Change dates / status', 'memberglut' ), icon: <FontAwesomeIcon icon={faCalendarPlus} /> },
            { key: 'activate', label: __( 'Activate', 'memberglut' ), icon: <FontAwesomeIcon icon={faUserCheck} />, disabled: !['pending', 'on_hold', 'expired'].includes(s.status) },
            { key: 'cancel', label: __( 'Cancel (keep access until it ends)', 'memberglut' ), icon: <FontAwesomeIcon icon={faBan} />, disabled: ['canceled', 'expired'].includes(s.status) },
            { key: 'expire', label: __( 'Expire now', 'memberglut' ), icon: <FontAwesomeIcon icon={faBan} />, danger: true, disabled: s.status === 'expired' },
            { type: 'divider' },
            { key: 'delete', label: __( 'Remove membership', 'memberglut' ), icon: <FontAwesomeIcon icon={faTrashCan} />, danger: true },
          ],
          onClick: ({ key }) => onAction(key, s),
        }}>
          <Button icon={<FontAwesomeIcon icon={faEllipsis} />}>{__( 'Manage', 'memberglut' )}</Button>
        </Dropdown>
      </div>
      {s.scheduled_plan && <Alert type="info" showIcon style={{ margin: '10px 0' }} message={sprintf( __( 'Moves to %1$s on %2$s.', 'memberglut' ), s.scheduled_plan.name, date(s.expires) )} />}
      <div className="mg-sub-grid">
        <div><span>{__( 'Started', 'memberglut' )}</span><b>{date(s.started)}</b></div>
        <div><span>{s.status === 'canceled' ? __( 'Access until', 'memberglut' ) : __( 'Expires', 'memberglut' )}</span><b>{s.expires ? date(s.expires) : __( 'Never', 'memberglut' )}</b></div>
        <div><span>{__( 'Next payment', 'memberglut' )}</span><b>{s.next_payment && ['active', 'trialing'].includes(s.status) ? `${money(s.billing_amount)} · ${date(s.next_payment)}` : '—'}</b></div>
        <div><span>{__( 'Role given', 'memberglut' )}</span><b>{s.plan && s.plan.role ? roleName(s.plan.role) : '—'}</b></div>
        {s.cycles_total > 0 && <div><span>{__( 'Payments', 'memberglut' )}</span><b>{sprintf( __( '%1$d of %2$d', 'memberglut' ), s.cycles_done, s.cycles_total )}</b></div>}
        {s.trial_ends && <div><span>{__( 'Trial ends', 'memberglut' )}</span><b>{date(s.trial_ends)}</b></div>}
      </div>
    </div>
  );
}

function PaymentsTab({ userId }) {
  const [rows, setRows] = useState(null);
  useEffect(() => { api.getPayments({ user: userId, per_page: 50 }).then((r) => setRows(r.items || [])).catch(() => setRows([])); }, [userId]);
  if (!rows) return <Skeleton active />;
  return (
    <Table size="middle" rowKey="id" pagination={false} dataSource={rows} locale={{ emptyText: __( 'No payments yet.', 'memberglut' ) }} columns={[
      { title: '#', dataIndex: 'id', render: (v) => <a href={link('payments', { payment: v })}>#{v}</a> },
      { title: __( 'Date', 'memberglut' ), dataIndex: 'date', render: date },
      { title: __( 'Plan', 'memberglut' ), dataIndex: 'plan' },
      { title: __( 'Method', 'memberglut' ), dataIndex: 'gateway', render: (v) => GATEWAY[v] || v },
      { title: __( 'Status', 'memberglut' ), dataIndex: 'status', render: (v) => <StatusBadge status={v} label={PAY_STATUS[v]} /> },
      { title: __( 'Amount', 'memberglut' ), dataIndex: 'amount', align: 'right', render: (v, r) => money(v, r.currency) },
    ]} />
  );
}

function ActivityTab({ userId }) {
  const [items, setItems] = useState(null);
  useEffect(() => { api.getEvents({ user: userId, per_page: 50 }).then((r) => setItems(r.items)).catch(() => setItems([])); }, [userId]);
  if (!items) return <Skeleton active />;
  if (!items.length) return <Empty description={__( 'No activity yet.', 'memberglut' )} />;
  return (
    <Timeline style={{ marginTop: 12 }} items={items.map((e) => ({
      color: EVENT_COLOR[e.type] || 'gray',
      children: <><b>{e.text}</b><div className="mg-muted">{dateTime(e.date)} · {e.by}</div></>,
    }))} />
  );
}

function LoginsTab({ userId }) {
  const [rows, setRows] = useState(null);
  useEffect(() => { api.getLogins({ user: userId }).then(setRows).catch(() => setRows([])); }, [userId]);
  if (!rows) return <Skeleton active />;
  return (
    <Table size="middle" rowKey="id" pagination={false} dataSource={rows} locale={{ emptyText: __( 'No logins recorded yet.', 'memberglut' ) }} columns={[
      { title: __( 'When', 'memberglut' ), dataIndex: 'date', render: (v) => fromNow(v) },
      { title: __( 'Device', 'memberglut' ), dataIndex: 'device', render: (v, r) => <>{v || __( 'Unknown device', 'memberglut' )} {r.current && <Tag color="green" bordered={false}>{__( 'Active now', 'memberglut' )}</Tag>}</> },
      { title: 'IP', dataIndex: 'ip' },
    ]} />
  );
}

function MemberDetail() {
  const { message, modal } = App.useApp();
  const userId = Number(queryArg('user') || queryArg('id'));
  const [m, setM] = useState(null);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [edit, setEdit] = useState(null); // { sub, isNew }
  const [changePlan, setChangePlan] = useState(null);

  const load = () => api.getMember(userId).then(setM).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  if (error) return <Alert type="error" showIcon message={error} action={<a href={link('members')}>{__( 'All members', 'memberglut' )}</a>} />;
  if (!m) return <Skeleton active avatar paragraph={{ rows: 10 }} />;

  const run = async (fn, ok) => {
    try {
      const r = await fn();
      if (r && r.user) setM(r); else load();
      if (ok) message.success(ok);
    } catch (e) { message.error(e.message); }
  };

  const subAction = (key, s) => {
    if (key === 'change') setChangePlan(s);
    else if (key === 'edit') setEdit({ sub: s, isNew: false });
    else if (key === 'activate') run(() => api.subscriptionAction(s.id, 'activate'), __( 'Subscription activated.', 'memberglut' ));
    else if (key === 'cancel') {
      modal.confirm({
        title: __( 'Cancel this subscription?', 'memberglut' ),
        content: s.gateway_managed ? __( 'Automatic renewal is stopped at the payment gateway too.', 'memberglut' ) : __( 'Automatic renewal stops.', 'memberglut' ),
        okText: __( 'Cancel subscription', 'memberglut' ), cancelText: __( 'Keep', 'memberglut' ), okButtonProps: { danger: true },
        onOk: () => run(() => api.subscriptionAction(s.id, 'cancel'), __( 'Subscription canceled.', 'memberglut' )),
      });
    } else if (key === 'expire') {
      modal.confirm({
        title: __( 'Expire now?', 'memberglut' ), content: __( 'Access ends immediately.', 'memberglut' ), okButtonProps: { danger: true },
        onOk: () => run(() => api.subscriptionAction(s.id, 'expire'), __( 'Subscription expired.', 'memberglut' )),
      });
    } else if (key === 'delete') {
      modal.confirm({
        title: __( 'Remove this membership?', 'memberglut' ), content: __( 'The subscription is deleted. Payments are kept.', 'memberglut' ), okButtonProps: { danger: true },
        onOk: () => run(async () => { await api.deleteSubscription(s.id); }, __( 'Membership removed.', 'memberglut' )),
      });
    }
  };

  const saveEdit = async (v) => {
    const fmt = (d) => (d ? d.format('YYYY-MM-DD') : '');
    if (edit.isNew) {
      await run(() => api.addMember({ who: 'existing', user_id: userId, plan_id: v.plan_id, status: v.status, start: fmt(v.start), expiry: v.expiry, expiry_date: fmt(v.expiry_date), send_email: true }), __( 'Plan added.', 'memberglut' ));
    } else {
      await run(() => api.updateSubscription(edit.sub.id, { plan_id: v.plan_id, status: v.status, start: fmt(v.start), expires: fmt(v.expires) }), __( 'Subscription updated.', 'memberglut' ));
    }
    setEdit(null);
  };

  const pending = ['pending_email', 'pending_admin'].includes(m.account_status);
  const u = m.user;

  return (
    <>
      <a href={link('members')} className="mg-back-link"><FontAwesomeIcon icon={faChevronLeft} /> {__( 'All members', 'memberglut' )}</a>
      <div className="mg-member-hero">
        <Avatar size={64} src={u.avatar} style={{ background: '#e94560', fontSize: 22, fontWeight: 700 }}>{initials(u.name)}</Avatar>
        <div className="mg-member-hero-main">
          <div className="mg-page-title">{u.name} {m.account_status === 'rejected' && <Tag color="red" bordered={false}>{__( 'Rejected', 'memberglut' )}</Tag>}</div>
          <div className="mg-member-meta">
            <span>{u.email}</span><span>@{u.username}</span><span>{sprintf( __( 'Registered %s', 'memberglut' ), date(u.registered) )}</span>
          </div>
        </div>
        <div className="mg-page-actions">
          {pending && <Button type="primary" icon={<FontAwesomeIcon icon={faUserCheck} />} onClick={() => run(() => api.memberAction(userId, 'approve'), __( 'Member approved.', 'memberglut' ))}>{__( 'Approve', 'memberglut' )}</Button>}
          {pending && <Popconfirm title={__( 'Reject this registration?', 'memberglut' )} okButtonProps={{ danger: true }} onConfirm={() => run(() => api.memberAction(userId, 'reject'), __( 'Registration rejected.', 'memberglut' ))}><Button danger icon={<FontAwesomeIcon icon={faUserXmark} />}>{__( 'Reject', 'memberglut' )}</Button></Popconfirm>}
          <Button icon={<FontAwesomeIcon icon={faEnvelope} />} href={`mailto:${u.email}`}>{__( 'Email', 'memberglut' )}</Button>
          <Button icon={<FontAwesomeIcon icon={faUserPen} />} href={u.edit_url}>{__( 'Edit user', 'memberglut' )}</Button>
          <Button type="primary" icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setEdit({ sub: null, isNew: true })}>{__( 'Add plan', 'memberglut' )}</Button>
        </div>
      </div>

      {m.account_status === 'pending_email' && <Alert style={{ marginBottom: 16 }} type="warning" showIcon message={__( 'This member has not confirmed their email address yet.', 'memberglut' )} action={<Button size="small" icon={<FontAwesomeIcon icon={faPaperPlane} />} onClick={() => run(() => api.memberAction(userId, 'resend-activation'), __( 'Confirmation email sent again.', 'memberglut' ))}>{__( 'Resend', 'memberglut' )}</Button>} />}
      {m.account_status === 'pending_admin' && <Alert style={{ marginBottom: 16 }} type="warning" showIcon message={__( 'This account is waiting for your approval. It cannot log in yet.', 'memberglut' )} />}

      <div className="mg-detail-grid">
        <div>
          <div className="mg-card">
            <div className="mg-card-title">{__( 'Subscriptions', 'memberglut' )}</div>
            {m.subscriptions.length === 0 ? <Empty description={__( 'No plan yet.', 'memberglut' )} /> : m.subscriptions.map((s) => <SubscriptionCard key={s.id} s={s} onAction={subAction} />)}
          </div>

          <div className="mg-card mg-card-tabs">
            <Tabs items={[
              { key: 'payments', label: __( 'Payments', 'memberglut' ), children: <PaymentsTab userId={userId} /> },
              { key: 'activity', label: __( 'Activity', 'memberglut' ), children: <ActivityTab userId={userId} /> },
              { key: 'logins', label: __( 'Logins', 'memberglut' ), children: <LoginsTab userId={userId} /> },
            ]} />
          </div>
        </div>

        <div>
          <div className="mg-card">
            <div className="mg-card-title">{__( 'Profile', 'memberglut' )}</div>
            <Descriptions column={1} size="small" className="mg-desc" items={[
              { label: __( 'User ID', 'memberglut' ), children: u.id },
              { label: __( 'Roles', 'memberglut' ), children: u.roles.map((r) => <Tag key={r} bordered={false}>{r}</Tag>) },
              { label: __( 'Registered', 'memberglut' ), children: date(u.registered) },
              { label: __( 'Last login', 'memberglut' ), children: u.last_login ? fromNow(u.last_login) : '—' },
              { label: __( 'Lifetime value', 'memberglut' ), children: <b>{money(m.ltv)}</b> },
              ...m.fields.map((f) => ({ label: f.label, children: f.value || '—' })),
              { label: __( 'Consent', 'memberglut' ), children: m.consents.length ? m.consents.map((c, i) => <div key={i}>{sprintf( __( '%1$s accepted on %2$s', 'memberglut' ), c.label || c.type, dateTime(c.time) )}</div>) : '—' },
            ]} />
          </div>

          <div className="mg-card">
            <div className="mg-card-title"><FontAwesomeIcon icon={faNoteSticky} style={{ marginRight: 8, color: '#e94560' }} />{__( 'Admin notes', 'memberglut' )} <span className="mg-notes-hint">{__( 'Only admins see these', 'memberglut' )}</span></div>
            {m.notes.map((n) => (
              <div key={n.id} className="mg-note">
                <div className="mg-note-head"><strong>{n.author}</strong> · {fromNow(n.date)}
                  <button type="button" className="mg-note-del" onClick={() => api.deleteNote(userId, n.id).then((notes) => setM({ ...m, notes }))}><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
                <div className="mg-note-text">{n.text}</div>
              </div>
            ))}
            <Input.TextArea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder={__( 'Add a private note…', 'memberglut' )} />
            <Button style={{ marginTop: 8 }} disabled={!note.trim()} onClick={() => api.addNote(userId, note).then((notes) => { setM({ ...m, notes }); setNote(''); }).catch((e) => message.error(e.message))}>{__( 'Add note', 'memberglut' )}</Button>
          </div>

          <div className="mg-card mg-danger-card">
            <div className="mg-card-title">{__( 'Account', 'memberglut' )}</div>
            <div className="mg-danger-list">
              <Button block icon={<FontAwesomeIcon icon={faKey} />} onClick={() => run(() => api.memberAction(userId, 'password-reset'), __( 'Password reset email sent.', 'memberglut' ))}>{__( 'Send password reset', 'memberglut' )}</Button>
              <Button block icon={<FontAwesomeIcon icon={faRightFromBracket} />} disabled={!m.sessions} onClick={() => run(() => api.memberAction(userId, 'logout-all'), __( 'Logged out of all devices.', 'memberglut' ))}>{sprintf( __( 'Log out everywhere (%d)', 'memberglut' ), m.sessions )}</Button>
              <Popconfirm title={__( 'Remove all memberships of this user?', 'memberglut' )} okButtonProps={{ danger: true }} onConfirm={() => run(() => api.memberAction(userId, 'remove-all'), __( 'Memberships removed.', 'memberglut' ))}>
                <Button block danger icon={<FontAwesomeIcon icon={faTrashCan} />} disabled={!m.subscriptions.length}>{__( 'Remove memberships', 'memberglut' )}</Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>

      <EditSubscriptionModal open={!!edit} sub={edit && edit.sub} isNew={edit && edit.isNew} statuses={SUB_STATUS} onCancel={() => setEdit(null)} onOk={saveEdit} />
      <ChangePlanModal open={!!changePlan} gatewayManaged={changePlan && changePlan.gateway_managed} onCancel={() => setChangePlan(null)}
        onOk={async (planId) => { await run(() => api.subscriptionAction(changePlan.id, 'change-plan', { plan_id: planId }), __( 'Plan changed.', 'memberglut' )); setChangePlan(null); }} />
    </>
  );
}

export function MemberDetailPage() {
  return <Page active="members"><MemberDetail /></Page>;
}
