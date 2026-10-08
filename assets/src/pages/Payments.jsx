import React, { useEffect, useMemo, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import {
  App, Table, Button, Input, Select, DatePicker, Drawer, Descriptions, Modal, Form, InputNumber, Timeline, Space, Popconfirm,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass, faFileExport, faPlus, faSackDollar, faRotateLeft, faTriangleExclamation, faBuildingColumns,
  faCircleCheck, faPaperPlane, faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import Page, { PageHeader, StatCard, StatusBadge } from '../components/Page';
import { link } from '../components/adminData';
import * as api from '../services/api';
import { money, date, dateTime, PAY_STATUS, GATEWAY } from '../services/format';
import { PLANS, MEMBERS } from '../services/demoData';

function PaymentDrawer({ p, onClose }) {
  const { message, modal } = App.useApp();
  if (!p) return null;
  const refund = () => modal.confirm({
    title: sprintf( __( 'Refund %s?', 'memberglut' ), money(p.amount) ),
    content: __( 'The refund is sent through the gateway. If “A full refund ends access” is on, the member loses the plan.', 'memberglut' ),
    okText: __( 'Refund', 'memberglut' ), okButtonProps: { danger: true },
    onOk: () => message.success(__( 'Refund sent.', 'memberglut' )),
  });
  return (
    <Drawer open={!!p} onClose={onClose} width={480} title={sprintf( __( 'Payment #%d', 'memberglut' ), p.id )}
      extra={<StatusBadge status={p.status} label={PAY_STATUS[p.status]} />}
      footer={(
        <Space wrap>
          {p.status === 'pending' && p.gateway === 'bank' && <Button type="primary" icon={<FontAwesomeIcon icon={faCircleCheck} />} onClick={() => message.success(__( 'Marked as paid. The subscription is active.', 'memberglut' ))}>{__( 'Mark as paid', 'memberglut' )}</Button>}
          {p.status === 'completed' && <Button danger icon={<FontAwesomeIcon icon={faRotateLeft} />} onClick={refund}>{__( 'Refund', 'memberglut' )}</Button>}
          <Button icon={<FontAwesomeIcon icon={faPaperPlane} />} onClick={() => message.success(__( 'Receipt sent.', 'memberglut' ))}>{__( 'Resend receipt', 'memberglut' )}</Button>
        </Space>
      )}
    >
      <div className="mg-pay-amount">{money(p.amount)}<span>{p.currency}</span></div>
      <Descriptions column={1} size="small" className="mg-desc" items={[
        { label: __( 'Member', 'memberglut' ), children: <a href={link('member_detail', { id: p.member_id })}>{p.name}</a> },
        { label: __( 'Email', 'memberglut' ), children: p.email },
        { label: __( 'Plan', 'memberglut' ), children: p.plan },
        { label: __( 'Type', 'memberglut' ), children: p.type === 'renewal' ? __( 'Renewal', 'memberglut' ) : __( 'New subscription', 'memberglut' ) },
        { label: __( 'Method', 'memberglut' ), children: GATEWAY[p.gateway] },
        { label: __( 'Transaction ID', 'memberglut' ), children: p.transaction_id ? <span className="mg-url">{p.transaction_id} <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></span> : '—' },
        { label: __( 'Coupon', 'memberglut' ), children: p.coupon || '—' },
        { label: __( 'Date', 'memberglut' ), children: dateTime(p.date) },
      ]} />
      <div className="mg-fs-subhead" style={{ marginTop: 22 }}>{__( 'Log', 'memberglut' )}</div>
      <Timeline items={[
        { color: 'gray', children: <>{__( 'Checkout started', 'memberglut' )}<div className="mg-muted">{dateTime(p.date)}</div></> },
        { color: p.status === 'failed' ? 'red' : 'green', children: <>{p.status === 'failed' ? __( 'Card declined (insufficient funds)', 'memberglut' ) : __( 'Gateway confirmed the payment', 'memberglut' )}<div className="mg-muted">{dateTime(p.date)}</div></> },
        { color: 'blue', children: <>{__( 'Receipt email sent', 'memberglut' )}<div className="mg-muted">{dateTime(p.date)}</div></> },
      ]} />
    </Drawer>
  );
}

function Payments() {
  const { message } = App.useApp();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [gateway, setGateway] = useState(null);
  const [search, setSearch] = useState('');
  const [range, setRange] = useState(null);
  const [open, setOpen] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => { api.getPayments().then(setRows).finally(() => setLoading(false)); }, []);

  const sum = (s) => rows.filter((r) => r.status === s).reduce((n, r) => n + r.amount, 0);
  const counts = useMemo(() => rows.reduce((c, r) => ({ ...c, [r.status]: (c[r.status] || 0) + 1 }), {}), [rows]);
  const filtered = rows.filter((r) => (!status || r.status === status) && (!gateway || r.gateway === gateway)
    && (!search || `${r.id} ${r.name} ${r.email} ${r.transaction_id}`.toLowerCase().includes(search.toLowerCase()))
    && (!range || (r.date >= range[0].format('YYYY-MM-DD') && r.date <= range[1].format('YYYY-MM-DD 23:59:59'))));

  const columns = [
    { title: '#', dataIndex: 'id', width: 80, render: (v, r) => <a onClick={() => setOpen(r)} className="mg-strong-link">#{v}</a> },
    { title: __( 'Member', 'memberglut' ), dataIndex: 'name', render: (v, r) => <><a href={link('member_detail', { id: r.member_id })}>{v}</a><div className="mg-muted">{r.email}</div></> },
    { title: __( 'Plan', 'memberglut' ), dataIndex: 'plan', render: (v, r) => <>{v}<div className="mg-muted">{r.type === 'renewal' ? __( 'Renewal', 'memberglut' ) : __( 'New', 'memberglut' )}{r.coupon && ` · ${r.coupon}`}</div></> },
    { title: __( 'Method', 'memberglut' ), dataIndex: 'gateway', render: (v) => GATEWAY[v] },
    { title: __( 'Status', 'memberglut' ), dataIndex: 'status', render: (v) => <StatusBadge status={v} label={PAY_STATUS[v]} /> },
    { title: __( 'Date', 'memberglut' ), dataIndex: 'date', sorter: (a, b) => a.date.localeCompare(b.date), defaultSortOrder: 'descend', render: date },
    { title: __( 'Amount', 'memberglut' ), dataIndex: 'amount', align: 'right', sorter: (a, b) => a.amount - b.amount, render: (v, r) => <b className={r.status === 'refunded' ? 'mg-strike' : ''}>{money(v)}</b> },
  ];

  return (
    <>
      <PageHeader
        title={__( 'Payments', 'memberglut' )}
        subtitle={__( 'Every payment from every gateway, with refunds and bank transfers to confirm.', 'memberglut' )}
        actions={(
          <>
            <Button size="large" icon={<FontAwesomeIcon icon={faFileExport} />} onClick={() => message.success(__( 'payments.csv downloaded.', 'memberglut' ))}>{__( 'Export CSV', 'memberglut' )}</Button>
            <Button size="large" type="primary" icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setAddOpen(true)}>{__( 'Add manual payment', 'memberglut' )}</Button>
          </>
        )}
      />

      <div className="mg-stats-row">
        <StatCard icon={<FontAwesomeIcon icon={faSackDollar} />} label={__( 'Completed', 'memberglut' )} value={money(sum('completed'))} hint={sprintf( __( '%d payments', 'memberglut' ), counts.completed || 0 )} trend="up" />
        <StatCard icon={<FontAwesomeIcon icon={faBuildingColumns} />} label={__( 'Waiting (bank transfer)', 'memberglut' )} value={money(sum('pending'))} hint={sprintf( __( '%d to confirm', 'memberglut' ), counts.pending || 0 )} />
        <StatCard icon={<FontAwesomeIcon icon={faTriangleExclamation} />} label={__( 'Failed', 'memberglut' )} value={counts.failed || 0} hint={__( 'Retries run automatically', 'memberglut' )} trend="down" />
        <StatCard icon={<FontAwesomeIcon icon={faRotateLeft} />} label={__( 'Refunded', 'memberglut' )} value={money(sum('refunded'))} trend="down" />
      </div>

      <div className="mg-filter-tabs">
        {[['', __( 'All', 'memberglut' ), rows.length], ...Object.entries(PAY_STATUS).map(([k, l]) => [k, l, counts[k] || 0])].map(([k, l, n]) => (
          <button key={k || 'all'} type="button" className={`mg-filter-tab ${status === k ? 'active' : ''}`} onClick={() => setStatus(k)}>{l} <span className="mg-filter-count">{n}</span></button>
        ))}
      </div>

      <div className="mg-table-wrap">
        <div className="mg-table-toolbar">
          <div className="mg-table-toolbar-left">
            <Input allowClear prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />} placeholder={__( 'Search ID, member, email or transaction…', 'memberglut' )} value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 320 }} />
            <Select allowClear placeholder={__( 'All methods', 'memberglut' )} value={gateway} onChange={setGateway} options={['stripe', 'paypal', 'bank', 'manual'].map((g) => ({ value: g, label: GATEWAY[g] }))} style={{ width: 170 }} />
            <DatePicker.RangePicker value={range} onChange={setRange} />
          </div>
        </div>
        <Table rowKey="id" loading={loading} columns={columns} dataSource={filtered} onRow={(r) => ({ onDoubleClick: () => setOpen(r) })}
          pagination={{ pageSize: 10, showTotal: (t) => sprintf( __( '%d payments', 'memberglut' ), t ) }}
          summary={(data) => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={6}><span className="mg-muted">{__( 'Total on this page (completed)', 'memberglut' )}</span></Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right"><b>{money(data.filter((r) => r.status === 'completed').reduce((n, r) => n + r.amount, 0))}</b></Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </div>

      <PaymentDrawer p={open} onClose={() => setOpen(null)} />

      <Modal title={<span className="mg-modal-title">{__( 'Add manual payment', 'memberglut' )}</span>} open={addOpen} onCancel={() => setAddOpen(false)} okText={__( 'Add payment', 'memberglut' )}
        onOk={async () => { await form.validateFields(); setAddOpen(false); message.success(__( 'Payment recorded.', 'memberglut' )); }} destroyOnClose>
        <p className="mg-modal-intro">{__( 'Record a payment taken outside the site (cash, invoice, another shop).', 'memberglut' )}</p>
        <Form form={form} layout="vertical" requiredMark={false} initialValues={{ status: 'completed', activate: true }}>
          <Form.Item name="member" label={__( 'Member', 'memberglut' )} rules={[{ required: true, message: __( 'Choose a member.', 'memberglut' ) }]}><Select showSearch optionFilterProp="label" options={MEMBERS.map((m) => ({ value: m.id, label: `${m.name} (${m.email})` }))} /></Form.Item>
          <div className="mg-form-grid">
            <Form.Item name="plan" label={__( 'Plan', 'memberglut' )} rules={[{ required: true, message: __( 'Choose a plan.', 'memberglut' ) }]}><Select options={PLANS.map((p) => ({ value: p.id, label: p.name }))} /></Form.Item>
            <Form.Item name="amount" label={__( 'Amount', 'memberglut' )} rules={[{ required: true, message: __( 'Enter the amount.', 'memberglut' ) }]}><InputNumber min={0} step={0.01} addonBefore="$" style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="status" label={__( 'Status', 'memberglut' )}><Select options={Object.entries(PAY_STATUS).map(([value, label]) => ({ value, label }))} /></Form.Item>
            <Form.Item name="date" label={__( 'Date', 'memberglut' )}><DatePicker style={{ width: '100%' }} /></Form.Item>
          </div>
          <Form.Item name="note" label={__( 'Note', 'memberglut' )}><Input.TextArea rows={2} /></Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export function PaymentsPage() {
  return <Page active="payments"><Payments /></Page>;
}
