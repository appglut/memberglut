import React, { useCallback, useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import {
  App, Table, Button, Input, Select, DatePicker, Drawer, Descriptions, Modal, Form, InputNumber, Timeline, Space, Switch, Spin,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass, faFileExport, faPlus, faSackDollar, faRotateLeft, faTriangleExclamation, faBuildingColumns,
  faCircleCheck, faPaperPlane, faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import Page, { PageHeader, StatCard, StatusBadge } from '../components/Page';
import { link, queryArg } from '../components/adminData';
import UserSearch from '../components/UserSearch';
import * as api from '../services/api';
import { money, date, dateTime, PAY_STATUS, GATEWAY } from '../services/format';
import { L, planOptions } from '../services/lookups';

const TYPE = {
  new: __( 'New subscription', 'memberglut' ),
  renewal: __( 'Renewal', 'memberglut' ),
  upgrade: __( 'Upgrade', 'memberglut' ),
  change: __( 'Plan change', 'memberglut' ),
  manual: __( 'Manual', 'memberglut' ),
};
const LOG_COLOR = { completed: 'green', failed: 'red', refund: 'orange', refunded: 'orange', created: 'gray', receipt: 'blue' };
const canManage = L.can ? L.can.manage_payments !== false : true;

function PaymentDrawer({ id, onClose, onChanged }) {
  const { message, modal } = App.useApp();
  const [p, setP] = useState(null);
  const [busy, setBusy] = useState('');

  useEffect(() => {
    setP(null);
    if (id) api.getPayment(id).then(setP).catch((e) => { message.error(e.message); onClose(); });
  }, [id]);

  const run = async (action, data, ok) => {
    setBusy(action);
    try {
      const res = await api.paymentAction(p.id, action, data);
      setP(res);
      onChanged();
      message.success(ok);
    } catch (e) {
      message.error(e.message);
    } finally {
      setBusy('');
    }
  };

  const refund = () => {
    let amount = null;
    const left = p.amount - p.refunded;
    modal.confirm({
      title: sprintf( __( 'Refund %s?', 'memberglut' ), money(left, p.currency) ),
      content: (
        <>
          <p>{__( 'The refund is sent through the gateway. If “A full refund ends access” is on, the member loses the plan.', 'memberglut' )}</p>
          <InputNumber min={0.01} max={left} step={0.01} placeholder={__( 'Full amount', 'memberglut' )} style={{ width: '100%' }} onChange={(v) => { amount = v; }} />
        </>
      ),
      okText: __( 'Refund', 'memberglut' ), okButtonProps: { danger: true },
      onOk: () => run('refund', { amount }, __( 'Refund sent.', 'memberglut' )),
    });
  };

  return (
    <Drawer open={!!id} onClose={onClose} width={480} title={sprintf( __( 'Payment #%d', 'memberglut' ), id || 0 )}
      extra={p && <StatusBadge status={p.status} label={PAY_STATUS[p.status]} />}
      footer={p && canManage && (
        <Space wrap>
          {p.status === 'pending' && ['bank', 'manual'].includes(p.gateway) && (
            <Button type="primary" loading={busy === 'mark-paid'} icon={<FontAwesomeIcon icon={faCircleCheck} />} onClick={() => run('mark-paid', {}, __( 'Marked as paid. The subscription is active.', 'memberglut' ))}>{__( 'Mark as paid', 'memberglut' )}</Button>
          )}
          {p.refundable && p.refunded < p.amount && <Button danger loading={busy === 'refund'} icon={<FontAwesomeIcon icon={faRotateLeft} />} onClick={refund}>{__( 'Refund', 'memberglut' )}</Button>}
          {p.email && <Button loading={busy === 'resend-receipt'} icon={<FontAwesomeIcon icon={faPaperPlane} />} onClick={() => run('resend-receipt', {}, __( 'Receipt sent.', 'memberglut' ))}>{__( 'Resend receipt', 'memberglut' )}</Button>}
        </Space>
      )}
    >
      {!p ? <div style={{ textAlign: 'center', padding: 40 }}><Spin /></div> : (
        <>
          <div className="mg-pay-amount">{money(p.amount, p.currency)}<span>{p.currency}</span></div>
          <Descriptions column={1} size="small" className="mg-desc" items={[
            { label: __( 'Member', 'memberglut' ), children: p.member_id ? <a href={link('member_detail', { id: p.member_id })}>{p.name}</a> : p.name },
            { label: __( 'Email', 'memberglut' ), children: p.email || '—' },
            { label: __( 'Plan', 'memberglut' ), children: p.plan || '—' },
            { label: __( 'Type', 'memberglut' ), children: TYPE[p.type] || p.type },
            { label: __( 'Method', 'memberglut' ), children: GATEWAY[p.gateway] || p.gateway },
            { label: __( 'Transaction ID', 'memberglut' ), children: p.transaction_id ? (p.transaction_url ? <a className="mg-url" href={p.transaction_url} target="_blank" rel="noreferrer">{p.transaction_id} <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a> : p.transaction_id) : '—' },
            ...(p.subtotal !== p.amount ? [{ label: __( 'Subtotal', 'memberglut' ), children: money(p.subtotal, p.currency) }] : []),
            ...(p.signup_fee ? [{ label: __( 'Sign-up fee', 'memberglut' ), children: money(p.signup_fee, p.currency) }] : []),
            { label: __( 'Coupon', 'memberglut' ), children: p.coupon ? `${p.coupon} (−${money(p.discount, p.currency)})` : '—' },
            ...(p.refunded ? [{ label: __( 'Refunded', 'memberglut' ), children: money(p.refunded, p.currency) }] : []),
            { label: __( 'Date', 'memberglut' ), children: dateTime(p.date) },
            ...(p.note ? [{ label: __( 'Note', 'memberglut' ), children: p.note }] : []),
          ]} />
          <div className="mg-fs-subhead" style={{ marginTop: 22 }}>{__( 'Log', 'memberglut' )}</div>
          {p.log && p.log.length ? (
            <Timeline items={p.log.map((e) => ({ color: LOG_COLOR[e.type] || 'blue', children: <>{e.text}<div className="mg-muted">{dateTime(e.date)}</div></> }))} />
          ) : <p className="mg-muted">{__( 'Nothing logged yet.', 'memberglut' )}</p>}
        </>
      )}
    </Drawer>
  );
}

function ManualPaymentModal({ open, onClose, onSaved }) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const status = Form.useWatch('status', form);

  const submit = async () => {
    const v = await form.validateFields();
    setSaving(true);
    try {
      await api.addPayment({ ...v, date: v.date ? v.date.format('YYYY-MM-DD HH:mm:ss') : '' });
      message.success(__( 'Payment recorded.', 'memberglut' ));
      form.resetFields();
      onSaved();
    } catch (e) {
      form.setFields(Object.entries(e.fields || {}).map(([name, err]) => ({ name, errors: [err] })));
      message.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={<span className="mg-modal-title">{__( 'Add manual payment', 'memberglut' )}</span>} open={open} onCancel={onClose} okText={__( 'Add payment', 'memberglut' )}
      confirmLoading={saving} onOk={submit} destroyOnClose>
      <p className="mg-modal-intro">{__( 'Record a payment taken outside the site (cash, invoice, another shop).', 'memberglut' )}</p>
      <Form form={form} layout="vertical" requiredMark={false} initialValues={{ status: 'completed', activate: true }}
        onValuesChange={(c) => {
          if (c.plan) {
            const pl = L.plans.find((x) => x.id === c.plan);
            if (pl && form.getFieldValue('amount') == null) form.setFieldValue('amount', pl.price || 0);
          }
        }}>
        <Form.Item name="member" label={__( 'Member', 'memberglut' )} rules={[{ required: true, message: __( 'Choose a member.', 'memberglut' ) }]}><UserSearch /></Form.Item>
        <div className="mg-form-grid">
          <Form.Item name="plan" label={__( 'Plan', 'memberglut' )} rules={[{ required: true, message: __( 'Choose a plan.', 'memberglut' ) }]}><Select options={planOptions()} /></Form.Item>
          <Form.Item name="amount" label={__( 'Amount', 'memberglut' )} rules={[{ required: true, message: __( 'Enter the amount.', 'memberglut' ) }]}><InputNumber min={0} step={0.01} addonBefore={L.currency.symbol} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="status" label={__( 'Status', 'memberglut' )}><Select options={Object.entries(PAY_STATUS).map(([value, label]) => ({ value, label }))} /></Form.Item>
          <Form.Item name="date" label={__( 'Date', 'memberglut' )}><DatePicker showTime style={{ width: '100%' }} /></Form.Item>
        </div>
        {status === 'completed' && (
          <Form.Item name="activate" valuePropName="checked" label={__( 'Give the member this plan', 'memberglut' )} extra={__( 'Starts the subscription, or renews it if the member already has this plan.', 'memberglut' )}><Switch /></Form.Item>
        )}
        <Form.Item name="note" label={__( 'Note', 'memberglut' )}><Input.TextArea rows={2} /></Form.Item>
      </Form>
    </Modal>
  );
}

function Payments() {
  const { message } = App.useApp();
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(queryArg('status') || '');
  const [gateway, setGateway] = useState(null);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [range, setRange] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({ field: 'date', order: 'desc' });
  const [open, setOpen] = useState(queryArg('id') ? Number(queryArg('id')) : null);
  const [addOpen, setAddOpen] = useState(false);
  const user = queryArg('user') || '';

  const filters = {
    status, gateway: gateway || '', search: query, user,
    from: range ? range[0].format('YYYY-MM-DD') : '', to: range ? range[1].format('YYYY-MM-DD') : '',
  };

  const load = useCallback(() => {
    setLoading(true);
    api.getPayments({ ...filters, page, per_page: pageSize, orderby: sort.field, order: sort.order })
      .then((r) => { setRows(r.items); setTotal(r.total); setSummary(r.summary); })
      .catch((e) => message.error(e.message))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters), page, pageSize, sort.field, sort.order]);

  useEffect(load, [load]);
  useEffect(() => { const t = setTimeout(() => { setQuery(search); setPage(1); }, 300); return () => clearTimeout(t); }, [search]);

  const s = summary || { completed: { count: 0, total: 0 }, pending: { count: 0, total: 0 }, failed: { count: 0, total: 0 }, refunded: { count: 0, total: 0 } };
  const allCount = ['completed', 'pending', 'failed', 'refunded'].reduce((n, k) => n + s[k].count, 0);

  const columns = [
    { title: '#', dataIndex: 'id', key: 'id', width: 80, sorter: true, render: (v) => <a onClick={() => setOpen(v)} className="mg-strong-link">#{v}</a> },
    { title: __( 'Member', 'memberglut' ), dataIndex: 'name', render: (v, r) => <>{r.member_id ? <a href={link('member_detail', { id: r.member_id })}>{v}</a> : v}<div className="mg-muted">{r.email}</div></> },
    { title: __( 'Plan', 'memberglut' ), dataIndex: 'plan', render: (v, r) => <>{v || '—'}<div className="mg-muted">{TYPE[r.type] || r.type}{r.coupon && ` · ${r.coupon}`}</div></> },
    { title: __( 'Method', 'memberglut' ), dataIndex: 'gateway', render: (v) => GATEWAY[v] || v },
    { title: __( 'Status', 'memberglut' ), dataIndex: 'status', render: (v) => <StatusBadge status={v} label={PAY_STATUS[v] || v} /> },
    { title: __( 'Date', 'memberglut' ), dataIndex: 'date', key: 'date', sorter: true, defaultSortOrder: 'descend', render: date },
    { title: __( 'Amount', 'memberglut' ), dataIndex: 'amount', key: 'amount', align: 'right', sorter: true, render: (v, r) => <b className={r.status === 'refunded' ? 'mg-strike' : ''}>{money(v, r.currency)}</b> },
  ];

  return (
    <>
      <PageHeader
        title={__( 'Payments', 'memberglut' )}
        subtitle={__( 'Every payment from every gateway, with refunds and bank transfers to confirm.', 'memberglut' )}
        actions={(
          <>
            <Button size="large" icon={<FontAwesomeIcon icon={faFileExport} />} onClick={() => api.exportPayments(filters).catch((e) => message.error(e.message))}>{__( 'Export CSV', 'memberglut' )}</Button>
            {canManage && <Button size="large" type="primary" icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setAddOpen(true)}>{__( 'Add manual payment', 'memberglut' )}</Button>}
          </>
        )}
      />

      <div className="mg-stats-row">
        <StatCard icon={<FontAwesomeIcon icon={faSackDollar} />} label={__( 'Completed', 'memberglut' )} value={money(s.completed.total)} hint={sprintf( __( '%d payments', 'memberglut' ), s.completed.count )} trend="up" />
        <StatCard icon={<FontAwesomeIcon icon={faBuildingColumns} />} label={__( 'Waiting for payment', 'memberglut' )} value={money(s.pending.total)} hint={sprintf( __( '%d to confirm', 'memberglut' ), s.pending.count )} />
        <StatCard icon={<FontAwesomeIcon icon={faTriangleExclamation} />} label={__( 'Failed', 'memberglut' )} value={s.failed.count} hint={__( 'Retries run automatically', 'memberglut' )} trend="down" />
        <StatCard icon={<FontAwesomeIcon icon={faRotateLeft} />} label={__( 'Refunded', 'memberglut' )} value={money(s.refunded.total)} trend="down" />
      </div>

      <div className="mg-filter-tabs">
        {[['', __( 'All', 'memberglut' ), allCount], ...Object.entries(PAY_STATUS).map(([k, l]) => [k, l, s[k] ? s[k].count : 0])].map(([k, l, n]) => (
          <button key={k || 'all'} type="button" className={`mg-filter-tab ${status === k ? 'active' : ''}`} onClick={() => { setStatus(k); setPage(1); }}>{l} <span className="mg-filter-count">{n}</span></button>
        ))}
      </div>

      <div className="mg-table-wrap">
        <div className="mg-table-toolbar">
          <div className="mg-table-toolbar-left">
            <Input allowClear prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />} placeholder={__( 'Search ID, member, email or transaction…', 'memberglut' )} value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 320 }} />
            <Select allowClear placeholder={__( 'All methods', 'memberglut' )} value={gateway} onChange={(v) => { setGateway(v); setPage(1); }} options={Object.keys(GATEWAY).map((g) => ({ value: g, label: GATEWAY[g] }))} style={{ width: 170 }} />
            <DatePicker.RangePicker value={range} onChange={(v) => { setRange(v); setPage(1); }} />
          </div>
        </div>
        <Table rowKey="id" loading={loading} columns={columns} dataSource={rows} onRow={(r) => ({ onDoubleClick: () => setOpen(r.id) })}
          onChange={(pg, f, sorter) => {
            setPage(pg.current); setPageSize(pg.pageSize);
            setSort({ field: sorter.columnKey || 'date', order: sorter.order === 'ascend' ? 'asc' : 'desc' });
          }}
          pagination={{ current: page, pageSize, total, showSizeChanger: true, showTotal: (t) => sprintf( __( '%d payments', 'memberglut' ), t ) }}
          summary={(data) => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={6}><span className="mg-muted">{__( 'Total on this page (completed)', 'memberglut' )}</span></Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right"><b>{money(data.filter((r) => r.status === 'completed').reduce((n, r) => n + r.amount, 0))}</b></Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </div>

      <PaymentDrawer id={open} onClose={() => setOpen(null)} onChanged={load} />
      <ManualPaymentModal open={addOpen} onClose={() => setAddOpen(false)} onSaved={() => { setAddOpen(false); load(); }} />
    </>
  );
}

export function PaymentsPage() {
  return <Page active="payments"><Payments /></Page>;
}
