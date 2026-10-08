import React, { useEffect, useState } from 'react';
import { __, sprintf, _n } from '@wordpress/i18n';
import { Modal, Select, Radio, InputNumber, DatePicker, Alert, Form } from 'antd';
import dayjs from 'dayjs';
import { planOptions } from '../services/lookups';

/** Pick a plan for one or many subscriptions. */
export function ChangePlanModal({ open, count = 1, gatewayManaged, onCancel, onOk }) {
  const [plan, setPlan] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (open) setPlan(null); }, [open]);
  return (
    <Modal
      open={open}
      title={<span className="mg-modal-title">{__( 'Change plan', 'memberglut' )}</span>}
      onCancel={onCancel}
      okButtonProps={{ disabled: !plan }}
      confirmLoading={saving}
      okText={__( 'Change plan', 'memberglut' )}
      onOk={async () => { setSaving(true); try { await onOk(plan); } finally { setSaving(false); } }}
      destroyOnClose
    >
      <p className="mg-modal-intro">{sprintf( _n( 'The member keeps their dates; only the plan (and its role) changes.', 'The %d members keep their dates; only the plan (and its role) changes.', count, 'memberglut' ), count )}</p>
      {gatewayManaged && <Alert type="warning" showIcon style={{ marginBottom: 12 }} message={__( 'This subscription is billed by a payment gateway. The change is made in MemberGlut only — the amount charged at the gateway stays the same.', 'memberglut' )} />}
      <Select value={plan} onChange={setPlan} options={planOptions()} placeholder={__( 'Choose a plan', 'memberglut' )} style={{ width: '100%' }} />
    </Modal>
  );
}

/** Extend expiry by days or to a date. */
export function ExtendModal({ open, count = 1, onCancel, onOk }) {
  const [mode, setMode] = useState('days');
  const [days, setDays] = useState(30);
  const [date, setDate] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (open) { setMode('days'); setDays(30); setDate(null); } }, [open]);
  return (
    <Modal
      open={open}
      title={<span className="mg-modal-title">{__( 'Extend expiry', 'memberglut' )}</span>}
      onCancel={onCancel}
      confirmLoading={saving}
      okButtonProps={{ disabled: mode === 'date' && !date }}
      okText={__( 'Extend', 'memberglut' )}
      onOk={async () => { setSaving(true); try { await onOk(mode === 'days' ? { days } : { date: date.format('YYYY-MM-DD') }); } finally { setSaving(false); } }}
      destroyOnClose
    >
      <p className="mg-modal-intro">{sprintf( _n( 'Applies to %d subscription.', 'Applies to %d subscriptions.', count, 'memberglut' ), count )}</p>
      <Radio.Group value={mode} onChange={(e) => setMode(e.target.value)} style={{ marginBottom: 14 }}>
        <Radio value="days">{__( 'Add days', 'memberglut' )}</Radio>
        <Radio value="date">{__( 'Set a new date', 'memberglut' )}</Radio>
      </Radio.Group>
      <div>
        {mode === 'days'
          ? <InputNumber min={1} max={3650} value={days} onChange={(v) => setDays(v || 1)} addonAfter={__( 'days', 'memberglut' )} />
          : <DatePicker value={date} onChange={setDate} disabledDate={(d) => d && d < dayjs().startOf('day')} />}
      </div>
    </Modal>
  );
}

/** Edit a subscription: plan, status, start, expiry. */
export function EditSubscriptionModal({ open, sub, isNew, onCancel, onOk, statuses }) {
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (open) {
      form.setFieldsValue(sub && !isNew
        ? { plan_id: sub.plan_id, status: sub.status, start: sub.started ? dayjs(sub.started) : null, expires: sub.expires ? dayjs(sub.expires) : null }
        : { plan_id: null, status: 'active', start: dayjs(), expiry: 'plan' });
    }
  }, [open]);
  const expiry = Form.useWatch('expiry', form);
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      confirmLoading={saving}
      title={<span className="mg-modal-title">{isNew ? __( 'Add a plan', 'memberglut' ) : __( 'Edit subscription', 'memberglut' )}</span>}
      okText={__( 'Save', 'memberglut' )}
      onOk={async () => {
        const v = await form.validateFields();
        setSaving(true);
        try { await onOk(v); } finally { setSaving(false); }
      }}
      destroyOnClose
    >
      {sub && sub.gateway_managed && !isNew && <Alert type="warning" showIcon style={{ marginBottom: 12 }} message={__( 'Billed by a payment gateway: plan and date changes are made in MemberGlut only. Cancel and Expire also stop the gateway subscription.', 'memberglut' )} />}
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item name="plan_id" label={__( 'Plan', 'memberglut' )} rules={[{ required: true, message: __( 'Choose a plan.', 'memberglut' ) }]}><Select options={planOptions()} /></Form.Item>
        <Form.Item name="status" label={__( 'Status', 'memberglut' )}>
          <Select options={Object.entries(statuses).filter(([k]) => !isNew || ['active', 'trialing', 'pending', 'on_hold'].includes(k)).map(([value, label]) => ({ value, label }))} />
        </Form.Item>
        <div className="mg-form-grid">
          <Form.Item name="start" label={__( 'Start', 'memberglut' )}><DatePicker style={{ width: '100%' }} /></Form.Item>
          {isNew ? (
            <Form.Item name="expiry" label={__( 'Expires', 'memberglut' )}>
              <Select options={[{ value: 'plan', label: __( 'From the plan’s duration', 'memberglut' ) }, { value: 'never', label: __( 'Never', 'memberglut' ) }, { value: 'date', label: __( 'On a date…', 'memberglut' ) }]} />
            </Form.Item>
          ) : (
            <Form.Item name="expires" label={__( 'Expires', 'memberglut' )} extra={__( 'Empty = never. A past date ends access now.', 'memberglut' )}><DatePicker style={{ width: '100%' }} allowClear /></Form.Item>
          )}
          {isNew && expiry === 'date' && <Form.Item name="expiry_date" label={__( 'Expiry date', 'memberglut' )} rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} /></Form.Item>}
        </div>
      </Form>
    </Modal>
  );
}
