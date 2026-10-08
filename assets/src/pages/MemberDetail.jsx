import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import {
  App, Avatar, Button, Skeleton, Table, Tag, Timeline, Input, Modal, Form, Select, DatePicker, Dropdown, Tabs, Descriptions, Popconfirm,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft, faEnvelope, faUserPen, faLayerGroup, faCalendarPlus, faBan, faPlus, faEllipsis, faNoteSticky,
  faTrashCan, faKey, faRightFromBracket, faUserCheck,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import Page, { StatusBadge } from '../components/Page';
import { link, queryArg } from '../components/adminData';
import * as api from '../services/api';
import { money, date, dateTime, fromNow, SUB_STATUS, PAY_STATUS, GATEWAY, initials, planPrice } from '../services/format';
import { PLANS, PAYMENTS } from '../services/demoData';

function SubscriptionCard({ m, onAction }) {
  const plan = PLANS.find((p) => p.id === m.plan_id);
  return (
    <div className="mg-sub-card" style={{ '--c': plan.color }}>
      <div className="mg-sub-head">
        <div>
          <div className="mg-sub-name">{plan.name} <StatusBadge status={m.status} label={SUB_STATUS[m.status]} /></div>
          <div className="mg-muted">{planPrice(plan)} · {GATEWAY[m.gateway]}</div>
        </div>
        <Dropdown trigger={['click']} menu={{
          items: [
            { key: 'change', label: __( 'Change plan', 'memberglut' ), icon: <FontAwesomeIcon icon={faLayerGroup} /> },
            { key: 'extend', label: __( 'Change dates', 'memberglut' ), icon: <FontAwesomeIcon icon={faCalendarPlus} /> },
            { key: 'cancel', label: __( 'Cancel (keep access until it ends)', 'memberglut' ), icon: <FontAwesomeIcon icon={faBan} /> },
            { key: 'expire', label: __( 'Expire now', 'memberglut' ), icon: <FontAwesomeIcon icon={faBan} />, danger: true },
          ],
          onClick: ({ key }) => onAction(key),
        }}>
          <Button icon={<FontAwesomeIcon icon={faEllipsis} />}>{__( 'Manage', 'memberglut' )}</Button>
        </Dropdown>
      </div>
      <div className="mg-sub-grid">
        <div><span>{__( 'Started', 'memberglut' )}</span><b>{date(m.started)}</b></div>
        <div><span>{__( 'Expires', 'memberglut' )}</span><b>{m.expires ? date(m.expires) : __( 'Never', 'memberglut' )}</b></div>
        <div><span>{__( 'Next payment', 'memberglut' )}</span><b>{plan.billing === 'recurring' && m.status === 'active' ? `${money(plan.price)} · ${date(m.expires)}` : '—'}</b></div>
        <div><span>{__( 'Role given', 'memberglut' )}</span><b>{plan.role.replace('memberglut_', '')}</b></div>
      </div>
    </div>
  );
}

function MemberDetail() {
  const { message } = App.useApp();
  const [m, setM] = useState(null);
  const [notes, setNotes] = useState([{ id: 1, author: 'admin', text: 'Asked for an invoice with company VAT number.', date: dayjs().subtract(3, 'day').format() }]);
  const [note, setNote] = useState('');
  const [editOpen, setEditOpen] = useState(null);

  useEffect(() => { api.getMember(queryArg('id')).then(setM); }, []);

  if (!m) return <Skeleton active avatar paragraph={{ rows: 10 }} />;

  const payments = PAYMENTS.filter((p) => p.member_id === m.id).concat(PAYMENTS.slice(0, 2).map((p) => ({ ...p, id: p.id + 900, name: m.name })));

  return (
    <>
      <a href={link('members')} className="mg-back-link"><FontAwesomeIcon icon={faChevronLeft} /> {__( 'All members', 'memberglut' )}</a>
      <div className="mg-member-hero">
        <Avatar size={64} style={{ background: '#e94560', fontSize: 22, fontWeight: 700 }}>{initials(m.name)}</Avatar>
        <div className="mg-member-hero-main">
          <div className="mg-page-title">{m.name}</div>
          <div className="mg-member-meta">
            <span>{m.email}</span><span>@{m.username}</span><span>{sprintf( __( 'Member since %s', 'memberglut' ), date(m.started) )}</span>
          </div>
        </div>
        <div className="mg-page-actions">
          {m.status === 'pending' && <Button type="primary" icon={<FontAwesomeIcon icon={faUserCheck} />}>{__( 'Approve', 'memberglut' )}</Button>}
          <Button icon={<FontAwesomeIcon icon={faEnvelope} />} href={`mailto:${m.email}`}>{__( 'Email', 'memberglut' )}</Button>
          <Button icon={<FontAwesomeIcon icon={faUserPen} />} href={`user-edit.php?user_id=${m.user_id}`}>{__( 'Edit user', 'memberglut' )}</Button>
          <Button type="primary" icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setEditOpen('add')}>{__( 'Add plan', 'memberglut' )}</Button>
        </div>
      </div>

      <div className="mg-detail-grid">
        <div>
          <div className="mg-card">
            <div className="mg-card-title">{__( 'Subscriptions', 'memberglut' )}</div>
            <SubscriptionCard m={m} onAction={(k) => setEditOpen(k)} />
          </div>

          <div className="mg-card mg-card-tabs">
            <Tabs items={[
              {
                key: 'payments', label: __( 'Payments', 'memberglut' ), children: (
                  <Table size="middle" rowKey="id" pagination={false} dataSource={payments} columns={[
                    { title: '#', dataIndex: 'id' },
                    { title: __( 'Date', 'memberglut' ), dataIndex: 'date', render: date },
                    { title: __( 'Plan', 'memberglut' ), dataIndex: 'plan' },
                    { title: __( 'Method', 'memberglut' ), dataIndex: 'gateway', render: (v) => GATEWAY[v] },
                    { title: __( 'Status', 'memberglut' ), dataIndex: 'status', render: (v) => <StatusBadge status={v} label={PAY_STATUS[v]} /> },
                    { title: __( 'Amount', 'memberglut' ), dataIndex: 'amount', align: 'right', render: (v) => money(v) },
                  ]} />
                ),
              },
              {
                key: 'activity', label: __( 'Activity', 'memberglut' ), children: (
                  <Timeline style={{ marginTop: 12 }} items={[
                    { color: 'green', children: <><b>{__( 'Subscription activated', 'memberglut' )}</b> · Silver<div className="mg-muted">{dateTime(m.started)}</div></> },
                    { color: 'blue', children: <><b>{__( 'Payment completed', 'memberglut' )}</b> · $9.00 Stripe<div className="mg-muted">{dateTime(m.started)}</div></> },
                    { color: 'gray', children: <><b>{__( 'Email sent', 'memberglut' )}</b> · {__( 'Welcome / registration', 'memberglut' )}<div className="mg-muted">{dateTime(m.started)}</div></> },
                    { color: 'gray', children: <><b>{__( 'Account created', 'memberglut' )}</b> · {__( 'via registration form', 'memberglut' )}<div className="mg-muted">{dateTime(m.started)}</div></> },
                  ]} />
                ),
              },
              {
                key: 'logins', label: __( 'Logins', 'memberglut' ), children: (
                  <Table size="middle" rowKey="t" pagination={false} dataSource={[
                    { t: 1, date: m.last_login, ip: '103.48.17.22', device: 'Chrome · Windows', current: true },
                    { t: 2, date: dayjs(m.last_login).subtract(2, 'day').format(), ip: '103.48.17.22', device: 'Safari · iPhone' },
                    { t: 3, date: dayjs(m.last_login).subtract(9, 'day').format(), ip: '182.160.3.9', device: 'Firefox · Linux' },
                  ]} columns={[
                    { title: __( 'When', 'memberglut' ), dataIndex: 'date', render: (v) => fromNow(v) },
                    { title: __( 'Device', 'memberglut' ), dataIndex: 'device', render: (v, r) => <>{v} {r.current && <Tag color="green" bordered={false}>{__( 'Active now', 'memberglut' )}</Tag>}</> },
                    { title: 'IP', dataIndex: 'ip' },
                  ]} />
                ),
              },
            ]} />
          </div>
        </div>

        <div>
          <div className="mg-card">
            <div className="mg-card-title">{__( 'Profile', 'memberglut' )}</div>
            <Descriptions column={1} size="small" className="mg-desc" items={[
              { label: __( 'User ID', 'memberglut' ), children: m.user_id },
              { label: __( 'Role', 'memberglut' ), children: <Tag bordered={false}>{m.role}</Tag> },
              { label: __( 'Registered', 'memberglut' ), children: date(m.started) },
              { label: __( 'Last login', 'memberglut' ), children: fromNow(m.last_login) },
              { label: __( 'Lifetime value', 'memberglut' ), children: <b>{money(m.total_spent)}</b> },
              { label: __( 'Phone', 'memberglut' ), children: '+880 1711-000000' },
              { label: __( 'Consent', 'memberglut' ), children: sprintf( __( 'Terms & privacy accepted on %s', 'memberglut' ), date(m.started) ) },
            ]} />
          </div>

          <div className="mg-card">
            <div className="mg-card-title"><FontAwesomeIcon icon={faNoteSticky} style={{ marginRight: 8, color: '#e94560' }} />{__( 'Admin notes', 'memberglut' )} <span className="mg-notes-hint">{__( 'Only admins see these', 'memberglut' )}</span></div>
            {notes.map((n) => (
              <div key={n.id} className="mg-note">
                <div className="mg-note-head"><strong>{n.author}</strong> · {fromNow(n.date)}
                  <button type="button" className="mg-note-del" onClick={() => setNotes(notes.filter((x) => x.id !== n.id))}><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
                <div className="mg-note-text">{n.text}</div>
              </div>
            ))}
            <Input.TextArea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder={__( 'Add a private note…', 'memberglut' )} />
            <Button style={{ marginTop: 8 }} disabled={!note.trim()} onClick={() => { setNotes([...notes, { id: Date.now(), author: 'admin', text: note, date: dayjs().format() }]); setNote(''); }}>{__( 'Add note', 'memberglut' )}</Button>
          </div>

          <div className="mg-card mg-danger-card">
            <div className="mg-card-title">{__( 'Account', 'memberglut' )}</div>
            <div className="mg-danger-list">
              <Button block icon={<FontAwesomeIcon icon={faKey} />} onClick={() => message.success(__( 'Password reset email sent.', 'memberglut' ))}>{__( 'Send password reset', 'memberglut' )}</Button>
              <Button block icon={<FontAwesomeIcon icon={faRightFromBracket} />} onClick={() => message.success(__( 'Logged out of all devices.', 'memberglut' ))}>{__( 'Log out everywhere', 'memberglut' )}</Button>
              <Popconfirm title={__( 'Remove all memberships of this user?', 'memberglut' )} onConfirm={() => message.success(__( 'Memberships removed.', 'memberglut' ))}>
                <Button block danger icon={<FontAwesomeIcon icon={faTrashCan} />}>{__( 'Remove memberships', 'memberglut' )}</Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={!!editOpen}
        onCancel={() => setEditOpen(null)}
        onOk={() => { setEditOpen(null); message.success(__( 'Subscription updated.', 'memberglut' )); }}
        title={<span className="mg-modal-title">{editOpen === 'add' ? __( 'Add a plan', 'memberglut' ) : __( 'Edit subscription', 'memberglut' )}</span>}
        okText={__( 'Save', 'memberglut' )}
        destroyOnClose
      >
        <Form layout="vertical" initialValues={{ plan_id: m.plan_id, status: m.status, start: dayjs(m.started), end: m.expires ? dayjs(m.expires) : null }}>
          <Form.Item name="plan_id" label={__( 'Plan', 'memberglut' )}><Select options={PLANS.map((p) => ({ value: p.id, label: p.name }))} /></Form.Item>
          <Form.Item name="status" label={__( 'Status', 'memberglut' )}><Select options={Object.entries(SUB_STATUS).map(([value, label]) => ({ value, label }))} /></Form.Item>
          <div className="mg-form-grid">
            <Form.Item name="start" label={__( 'Start', 'memberglut' )}><DatePicker style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="end" label={__( 'Expires', 'memberglut' )} extra={__( 'Empty = never', 'memberglut' )}><DatePicker style={{ width: '100%' }} /></Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export function MemberDetailPage() {
  return <Page active="members"><MemberDetail /></Page>;
}
