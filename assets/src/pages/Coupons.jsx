import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import {
  App, Table, Button, Drawer, Form, Input, InputNumber, Select, Radio, DatePicker, Switch, Progress, Popconfirm, Upload, Tag,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrashCan, faWandMagicSparkles, faFileImport, faCopy } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import Page, { PageHeader, StatusBadge } from '../components/Page';
import * as api from '../services/api';
import { money, date } from '../services/format';
import { L, planOptions, planById } from '../services/lookups';

const STATUS = { active: __( 'Active', 'memberglut' ), scheduled: __( 'Scheduled', 'memberglut' ), expired: __( 'Expired', 'memberglut' ), inactive: __( 'Inactive', 'memberglut' ) };

function CouponDrawer({ coupon, onClose, onSave }) {
  const [form] = Form.useForm();
  const type = Form.useWatch('type', form);
  useEffect(() => {
    if (coupon && coupon.id) form.setFieldsValue({ ...coupon, starts: coupon.starts ? dayjs(coupon.starts) : null, expires: coupon.expires ? dayjs(coupon.expires) : null });
  }, [coupon]);
  const gen = () => form.setFieldValue('code', Math.random().toString(36).slice(2, 10).toUpperCase());
  return (
    <Drawer open={!!coupon} onClose={onClose} width={520} title={coupon?.id ? sprintf( __( 'Edit coupon %s', 'memberglut' ), coupon.code ) : __( 'New coupon', 'memberglut' )} destroyOnClose
      footer={<div style={{ textAlign: 'right' }}><Button onClick={onClose} style={{ marginRight: 8 }}>{__( 'Cancel', 'memberglut' )}</Button><Button type="primary" onClick={async () => onSave(await form.validateFields(), form)}>{__( 'Save coupon', 'memberglut' )}</Button></div>}>
      <Form form={form} layout="vertical" requiredMark={false} initialValues={{ type: 'percent', amount: 10, plans: [], max_uses: 0, per_user: 1, new_users_only: false, recurring: false, enabled: true }}>
        <Form.Item label={__( 'Code', 'memberglut' )} required>
          <div style={{ display: 'flex', gap: 8 }}>
            <Form.Item name="code" noStyle rules={[{ required: true, message: __( 'Enter a code.', 'memberglut' ) }]}><Input style={{ textTransform: 'uppercase' }} placeholder="WELCOME20" /></Form.Item>
            <Button icon={<FontAwesomeIcon icon={faWandMagicSparkles} />} onClick={gen}>{__( 'Generate', 'memberglut' )}</Button>
          </div>
        </Form.Item>
        <div className="mg-form-grid">
          <Form.Item name="type" label={__( 'Discount', 'memberglut' )}><Radio.Group optionType="button" buttonStyle="solid" options={[{ value: 'percent', label: '%' }, { value: 'fixed', label: __( 'Amount', 'memberglut' ) }]} /></Form.Item>
          <Form.Item name="amount" label={type === 'percent' ? __( 'Percent off', 'memberglut' ) : __( 'Amount off', 'memberglut' )}><InputNumber min={0} max={type === 'percent' ? 100 : undefined} addonAfter={type === 'percent' ? '%' : undefined} addonBefore={type === 'fixed' ? L.currency.symbol : undefined} style={{ width: '100%' }} /></Form.Item>
        </div>
        <Form.Item name="plans" label={__( 'Plans', 'memberglut' )} extra={__( 'Empty = every paid plan.', 'memberglut' )}><Select mode="multiple" options={planOptions((p) => p.type === 'paid')} placeholder={__( 'All paid plans', 'memberglut' )} /></Form.Item>
        <Form.Item name="recurring" label={__( 'For subscriptions, apply to', 'memberglut' )}><Radio.Group options={[{ value: false, label: __( 'The first payment only', 'memberglut' ) }, { value: true, label: __( 'Every payment', 'memberglut' ) }]} /></Form.Item>
        <div className="mg-form-grid">
          <Form.Item name="starts" label={__( 'Starts', 'memberglut' )}><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="expires" label={__( 'Expires', 'memberglut' )}><DatePicker style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="max_uses" label={__( 'Total uses', 'memberglut' )} extra={__( '0 = unlimited', 'memberglut' )}><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
          <Form.Item name="per_user" label={__( 'Uses per member', 'memberglut' )} extra={__( '0 = unlimited', 'memberglut' )}><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
        </div>
        <Form.Item name="new_users_only" valuePropName="checked" label={__( 'New customers only', 'memberglut' )}><Switch /></Form.Item>
        <Form.Item name="enabled" valuePropName="checked" label={__( 'Enabled', 'memberglut' )}><Switch /></Form.Item>
      </Form>
    </Drawer>
  );
}

function Coupons() {
  const { message } = App.useApp();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => { api.getCoupons().then(setRows).catch((e) => message.error(e.message)).finally(() => setLoading(false)); }, []);

  const save = async (v, form) => {
    try {
      const c = await api.saveCoupon({ id: editing.id, ...v, code: v.code.toUpperCase(), starts: v.starts ? v.starts.format('YYYY-MM-DD') : '', expires: v.expires ? v.expires.format('YYYY-MM-DD') : '' });
      setRows(editing.id ? rows.map((r) => (r.id === c.id ? c : r)) : [c, ...rows]);
      setEditing(null);
      message.success(__( 'Coupon saved.', 'memberglut' ));
    } catch (e) {
      form.setFields(Object.entries(e.fields || {}).map(([name, err]) => ({ name, errors: [err] })));
      message.error(e.message);
    }
  };

  const remove = (id) => api.deleteCoupon(id)
    .then(() => { setRows((rs) => rs.filter((x) => x.id !== id)); message.success(__( 'Coupon deleted.', 'memberglut' )); })
    .catch((e) => message.error(e.message));

  const importCsv = (file) => {
    file.text().then((csv) => api.importCoupons(csv)).then((r) => {
      setRows(r.coupons);
      message.success(sprintf( __( '%1$d created, %2$d updated.', 'memberglut' ), r.created || 0, r.updated || 0 ));
      (r.errors || []).slice(0, 3).forEach((er) => message.warning(er));
    }).catch((e) => message.error(e.message));
    return false;
  };

  const columns = [
    {
      title: __( 'Code', 'memberglut' ), dataIndex: 'code', render: (v, r) => (
        <div>
          <span className="mg-coupon-code" onClick={() => { navigator.clipboard?.writeText(v); message.success(__( 'Code copied.', 'memberglut' )); }}>{v} <FontAwesomeIcon icon={faCopy} /></span>
          <div className="mg-row-actions">
            <a onClick={() => setEditing(r)}><FontAwesomeIcon icon={faPenToSquare} /> {__( 'Edit', 'memberglut' )}</a>
            <span className="mg-action-sep">|</span>
            <Popconfirm title={__( 'Delete this coupon?', 'memberglut' )} okButtonProps={{ danger: true }} onConfirm={() => remove(r.id)}>
              <a className="mg-action-delete"><FontAwesomeIcon icon={faTrashCan} /> {__( 'Delete', 'memberglut' )}</a>
            </Popconfirm>
          </div>
        </div>
      ),
    },
    { title: __( 'Discount', 'memberglut' ), render: (v, r) => <><b>{r.type === 'percent' ? `${r.amount}%` : money(r.amount)}</b><div className="mg-muted">{r.recurring ? __( 'every payment', 'memberglut' ) : __( 'first payment', 'memberglut' )}</div></> },
    { title: __( 'Plans', 'memberglut' ), dataIndex: 'plans', render: (v) => (v.length ? v.map((id) => <Tag key={id} bordered={false}>{planById(id)?.name || `#${id}`}</Tag>) : <span className="mg-muted">{__( 'All paid plans', 'memberglut' )}</span>) },
    { title: __( 'Used', 'memberglut' ), render: (v, r) => (r.max_uses ? <div style={{ width: 140 }}><Progress percent={(r.uses / r.max_uses) * 100} size="small" format={() => `${r.uses}/${r.max_uses}`} strokeColor="#e94560" /></div> : <>{r.uses} <span className="mg-muted">/ ∞</span></>) },
    { title: __( 'Valid', 'memberglut' ), render: (v, r) => <span className="mg-muted">{r.starts ? date(r.starts) : __( 'Now', 'memberglut' )} → {r.expires ? date(r.expires) : __( 'No end', 'memberglut' )}{r.new_users_only && <><br />{__( 'New customers only', 'memberglut' )}</>}</span> },
    { title: __( 'Status', 'memberglut' ), dataIndex: 'status', render: (v) => <StatusBadge status={v} label={STATUS[v]} /> },
  ];

  return (
    <>
      <PageHeader
        title={__( 'Coupons', 'memberglut' )}
        subtitle={__( 'Discount codes for checkout: percent or fixed, per plan, with dates and usage limits.', 'memberglut' )}
        actions={(
          <>
            <Upload accept=".csv" showUploadList={false} beforeUpload={importCsv}>
              <Button size="large" icon={<FontAwesomeIcon icon={faFileImport} />}>{__( 'Import CSV', 'memberglut' )}</Button>
            </Upload>
            <Button size="large" type="primary" icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setEditing({})}>{__( 'New coupon', 'memberglut' )}</Button>
          </>
        )}
      />
      <div className="mg-table-wrap">
        <Table rowKey="id" loading={loading} columns={columns} dataSource={rows} pagination={false} />
      </div>
      <CouponDrawer coupon={editing} onClose={() => setEditing(null)} onSave={save} />
    </>
  );
}

export function CouponsPage() {
  return <Page active="payments"><Coupons /></Page>;
}
