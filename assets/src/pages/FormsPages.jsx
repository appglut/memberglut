import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { App, Spin, Select, Button, Switch, Input, Tag, Modal, Form, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileLines, faUserPlus, faRightToBracket, faIdCard, faTableColumns, faCode, faPlus, faArrowUp, faArrowDown,
  faTrashCan, faLock, faArrowUpRightFromSquare, faWandMagicSparkles, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import Page from '../components/Page';
import SettingsPanel, { CopyCode } from '../components/SettingsPanel';
import * as api from '../services/api';
import { PAGES, PLANS } from '../services/demoData';

const PAGE_SLOTS = [
  ['page_register', __( 'Registration & checkout', 'memberglut' ), '[memberglut_register]', __( 'Account fields, plan choice and payment.', 'memberglut' )],
  ['page_login', __( 'Login', 'memberglut' ), '[memberglut_login]', __( 'Replaces wp-login.php when that option is on.', 'memberglut' )],
  ['page_account', __( 'My Account', 'memberglut' ), '[memberglut_account]', __( 'Profile, subscriptions, payments.', 'memberglut' )],
  ['page_lost', __( 'Lost password', 'memberglut' ), '[memberglut_lost_password]', __( 'Request and set a new password.', 'memberglut' )],
  ['page_pricing', __( 'Pricing', 'memberglut' ), '[memberglut_plans]', __( 'Pricing table of your plans.', 'memberglut' )],
  ['page_thanks', __( 'Thank you', 'memberglut' ), '[memberglut_receipt]', __( 'Shown after checkout with the order details.', 'memberglut' )],
];

const CORE_FIELDS = [
  { key: 'email', label: 'Email', type: 'email', on: true, required: true, locked: true },
  { key: 'username', label: 'Username', type: 'text', on: false, required: true },
  { key: 'password', label: 'Password', type: 'password', on: true, required: true, locked: true },
  { key: 'password_confirm', label: 'Confirm password', type: 'password', on: true, required: true },
  { key: 'first_name', label: 'First name', type: 'text', on: true, required: false },
  { key: 'last_name', label: 'Last name', type: 'text', on: true, required: false },
  { key: 'display_name', label: 'Display name', type: 'text', on: false, required: false },
  { key: 'website', label: 'Website', type: 'url', on: false, required: false },
  { key: 'bio', label: 'Biographical info', type: 'textarea', on: false, required: false },
  { key: 'phone', label: 'Phone', type: 'tel', on: true, required: false, custom: true },
  { key: 'country', label: 'Country', type: 'country', on: true, required: false, custom: true },
];

const FIELD_TYPES = ['text', 'textarea', 'email', 'url', 'tel', 'number', 'date', 'select', 'radio', 'checkbox', 'country', 'hidden'].map((t) => ({ value: t, label: t }));

function FieldBuilder({ values, update }) {
  const [adding, setAdding] = useState(false);
  const [form] = Form.useForm();
  const list = values.reg_fields;
  const set = (i, patch) => update('reg_fields', list.map((f, j) => (j === i ? { ...f, ...patch } : f)));
  const move = (i, d) => { const n = [...list]; [n[i], n[i + d]] = [n[i + d], n[i]]; update('reg_fields', n); };
  return (
    <div className="mg-fs-block">
      <div className="mg-field-list">
        <div className="mg-field-row mg-field-head"><span /><span>{__( 'Field', 'memberglut' )}</span><span>{__( 'Label on the form', 'memberglut' )}</span><span>{__( 'Required', 'memberglut' )}</span><span>{__( 'Show', 'memberglut' )}</span><span /></div>
        {list.map((f, i) => (
          <div key={f.key} className={`mg-field-row ${!f.on ? 'off' : ''}`}>
            <span className="mg-order-btns">
              <Button size="small" type="text" disabled={i === 0} onClick={() => move(i, -1)} icon={<FontAwesomeIcon icon={faArrowUp} />} />
              <Button size="small" type="text" disabled={i === list.length - 1} onClick={() => move(i, 1)} icon={<FontAwesomeIcon icon={faArrowDown} />} />
            </span>
            <span><code>{f.key}</code> <Tag bordered={false}>{f.type}</Tag>{f.custom && <Tag color="pink" bordered={false}>{__( 'custom', 'memberglut' )}</Tag>}</span>
            <Input size="small" value={f.label} onChange={(e) => set(i, { label: e.target.value })} />
            <Switch size="small" checked={f.required} disabled={f.locked} onChange={(v) => set(i, { required: v })} />
            {f.locked ? <Tooltip title={__( 'Always shown', 'memberglut' )}><FontAwesomeIcon icon={faLock} className="mg-muted" /></Tooltip> : <Switch size="small" checked={f.on} onChange={(v) => set(i, { on: v })} />}
            {f.custom ? <Button size="small" type="text" danger icon={<FontAwesomeIcon icon={faTrashCan} />} onClick={() => update('reg_fields', list.filter((x, j) => j !== i))} /> : <span />}
          </div>
        ))}
      </div>
      <Button icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setAdding(true)} style={{ marginTop: 12 }}>{__( 'Add custom field', 'memberglut' )}</Button>
      <div className="mg-muted" style={{ marginTop: 10 }}>{__( 'Custom fields are saved as user meta, shown on the member’s admin profile, exported with members and usable in emails as {field:key}.', 'memberglut' )}</div>

      <Modal title={<span className="mg-modal-title">{__( 'Add custom field', 'memberglut' )}</span>} open={adding} onCancel={() => setAdding(false)} okText={__( 'Add field', 'memberglut' )} destroyOnClose
        onOk={async () => { const v = await form.validateFields(); update('reg_fields', [...list, { ...v, on: true, required: !!v.required, custom: true }]); setAdding(false); form.resetFields(); }}>
        <Form form={form} layout="vertical" requiredMark={false} initialValues={{ type: 'text' }}>
          <Form.Item name="label" label={__( 'Label', 'memberglut' )} rules={[{ required: true }]}><Input placeholder={__( 'Company', 'memberglut' )} /></Form.Item>
          <div className="mg-form-grid">
            <Form.Item name="key" label={__( 'Meta key', 'memberglut' )} rules={[{ required: true, pattern: /^[a-z0-9_]+$/, message: __( 'Lowercase letters, numbers and _ only.', 'memberglut' ) }]}><Input placeholder="company" /></Form.Item>
            <Form.Item name="type" label={__( 'Type', 'memberglut' )}><Select options={FIELD_TYPES} /></Form.Item>
          </div>
          <Form.Item name="options" label={__( 'Choices (for select, radio, checkbox)', 'memberglut' )}><Input.TextArea rows={3} placeholder={'One per line'} /></Form.Item>
          <Form.Item name="required" valuePropName="checked" label={__( 'Required', 'memberglut' )}><Switch /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

function PagesSlots({ values, update }) {
  const { message } = App.useApp();
  const missing = PAGE_SLOTS.filter(([k]) => !values[k]).length;
  return (
    <div className="mg-fs-block" style={{ marginTop: 6 }}>
      {missing > 0 && (
        <div className="mg-mig-option">
          <div><div className="t">{sprintf( __( '%d pages are not set', 'memberglut' ), missing )}</div><div className="s">{__( 'Create them with the right shortcode in one click. You can edit them like any page.', 'memberglut' )}</div></div>
          <Button type="primary" icon={<FontAwesomeIcon icon={faWandMagicSparkles} />} onClick={() => { PAGE_SLOTS.forEach(([k], i) => { if (!values[k]) update(k, 11 + i); }); message.success(__( 'Pages created.', 'memberglut' )); }}>{__( 'Create missing pages', 'memberglut' )}</Button>
        </div>
      )}
      {PAGE_SLOTS.map(([key, label, code, desc]) => (
        <div key={key} className="mg-page-slot">
          <div className="mg-page-slot-main">
            <div className="t">{label} {values[key] ? <FontAwesomeIcon icon={faCheck} className="ok" /> : <Tag color="orange" bordered={false}>{__( 'Not set', 'memberglut' )}</Tag>}</div>
            <div className="s">{desc} <CopyCode code={code} /></div>
          </div>
          <Select allowClear value={values[key]} onChange={(v) => update(key, v)} options={PAGES} placeholder={__( 'Choose a page', 'memberglut' )} style={{ width: 230 }} />
          {values[key] ? <Button icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />} href={`post.php?post=${values[key]}&action=edit`} /> : <Button onClick={() => update(key, 99)}>{__( 'Create', 'memberglut' )}</Button>}
        </div>
      ))}
    </div>
  );
}

const DEFAULTS = {
  page_register: 11, page_login: 12, page_account: 13, page_lost: 14, page_pricing: 15, page_thanks: null,
  reg_fields: CORE_FIELDS, reg_title: 'Create your account', reg_button: 'Join now', plan_picker: 'cards', reg_show_login_link: true, reg_ajax: true,
  login_with: 'both', login_title: 'Welcome back', login_button: 'Log in', login_remember: true, login_lost_link: true, login_register_link: true,
  profile_fields: ['first_name', 'last_name', 'display_name', 'phone', 'country'], profile_email_confirm: true,
  pricing_layout: 'cards', pricing_plans: [1, 2, 3], pricing_features: true, pricing_button: 'Choose plan', pricing_current: true, pricing_dark: false, pricing_columns: 3,
};

const SECTIONS = [
  {
    key: 'pages', title: __( 'Membership pages', 'memberglut' ), icon: faFileLines, desc: __( 'The pages MemberGlut links to. Each holds a shortcode or block.', 'memberglut' ),
    render: (ctx) => <PagesSlots {...ctx} />,
  },
  {
    key: 'register', title: __( 'Registration form', 'memberglut' ), icon: faUserPlus, desc: __( 'Fields and text of the sign-up and checkout form.', 'memberglut' ), fields: [
      { key: 'reg_title', type: 'text', label: __( 'Form title', 'memberglut' ) },
      { key: 'reg_button', type: 'text', label: __( 'Button text', 'memberglut' ) },
      { key: 'plan_picker', type: 'radio', label: __( 'Plan choice style', 'memberglut' ), tip: __( 'Hidden when the form is opened with a ?plan= link.', 'memberglut' ), options: [{ value: 'cards', label: __( 'Cards', 'memberglut' ) }, { value: 'radio', label: __( 'List', 'memberglut' ) }, { value: 'select', label: __( 'Dropdown', 'memberglut' ) }] },
      { key: 'reg_show_login_link', type: 'switch', label: __( '“Already a member? Log in” link', 'memberglut' ) },
      { key: 'reg_ajax', type: 'switch', label: __( 'Submit without reloading the page', 'memberglut' ) },
      { type: 'heading', key: 'h_fields', label: __( 'Fields', 'memberglut' ), tip: __( 'Payment fields are added automatically for paid plans.', 'memberglut' ) },
    ],
    render: (ctx) => <FieldBuilder {...ctx} />,
  },
  {
    key: 'login', title: __( 'Login form', 'memberglut' ), icon: faRightToBracket, desc: __( 'Text and options of the front-end login form.', 'memberglut' ), fields: [
      { key: 'login_with', type: 'radio', label: __( 'Log in with', 'memberglut' ), options: [{ value: 'both', label: __( 'Username or email', 'memberglut' ) }, { value: 'email', label: __( 'Email only', 'memberglut' ) }, { value: 'username', label: __( 'Username only', 'memberglut' ) }] },
      { key: 'login_title', type: 'text', label: __( 'Form title', 'memberglut' ) },
      { key: 'login_button', type: 'text', label: __( 'Button text', 'memberglut' ) },
      { key: 'login_remember', type: 'switch', label: __( '“Remember me” checkbox', 'memberglut' ) },
      { key: 'login_lost_link', type: 'switch', label: __( '“Lost your password?” link', 'memberglut' ) },
      { key: 'login_register_link', type: 'switch', label: __( '“Join now” link', 'memberglut' ) },
    ],
  },
  {
    key: 'profile', title: __( 'Profile form', 'memberglut' ), icon: faIdCard, desc: __( 'What members can change in My Account › Edit profile.', 'memberglut' ), fields: [
      { key: 'profile_fields', type: 'multiselect', label: __( 'Editable fields', 'memberglut' ), options: CORE_FIELDS.filter((f) => !['password', 'password_confirm', 'username'].includes(f.key)).map((f) => ({ value: f.key, label: f.label })) },
      { key: 'profile_email_confirm', type: 'switch', label: __( 'Confirm email changes', 'memberglut' ), tip: __( 'The new address must be confirmed from a link before it is used.', 'memberglut' ) },
    ],
  },
  {
    key: 'pricing', title: __( 'Pricing table', 'memberglut' ), icon: faTableColumns, desc: __( 'How [memberglut_plans] and the Pricing block show your plans.', 'memberglut' ), fields: [
      { key: 'pricing_layout', type: 'radio', label: __( 'Layout', 'memberglut' ), options: [{ value: 'cards', label: __( 'Cards', 'memberglut' ) }, { value: 'compare', label: __( 'Comparison table', 'memberglut' ) }, { value: 'list', label: __( 'List', 'memberglut' ) }] },
      { key: 'pricing_plans', type: 'multiselect', label: __( 'Plans to show', 'memberglut' ), options: PLANS.map((p) => ({ value: p.id, label: p.name })) },
      { key: 'pricing_columns', type: 'number', label: __( 'Columns', 'memberglut' ), min: 1, max: 4, show: (v) => v.pricing_layout === 'cards' },
      { key: 'pricing_features', type: 'switch', label: __( 'Show feature lists', 'memberglut' ) },
      { key: 'pricing_current', type: 'switch', label: __( 'Mark the member’s current plan', 'memberglut' ), tip: __( 'Logged-in members see “Current plan” and Upgrade / Downgrade buttons.', 'memberglut' ) },
      { key: 'pricing_button', type: 'text', label: __( 'Button text', 'memberglut' ) },
      { key: 'pricing_dark', type: 'switch', label: __( 'Dark style', 'memberglut' ) },
    ],
    render: ({ values }) => (
      <div className={`mg-pricing-preview ${values.pricing_dark ? 'dark' : ''}`} style={{ '--cols': values.pricing_layout === 'cards' ? values.pricing_columns : 1 }}>
        {PLANS.filter((p) => values.pricing_plans.includes(p.id)).map((p) => (
          <div key={p.id} className={`pp ${p.featured ? 'feat' : ''}`} style={{ '--c': p.color }}>
            {p.featured && <span className="rib">{__( 'Most popular', 'memberglut' )}</span>}
            <b>{p.name}</b>
            <div className="pr">{p.price ? `$${p.price}` : __( 'Free', 'memberglut' )}<small>{p.billing === 'recurring' ? ` / ${p.duration.unit}` : ''}</small></div>
            {values.pricing_features && <ul><li>{p.description}</li></ul>}
            <span className="btn">{values.pricing_button}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    key: 'shortcodes', title: __( 'Shortcodes & blocks', 'memberglut' ), icon: faCode, desc: __( 'Every MemberGlut shortcode. Each one is also a block in the editor.', 'memberglut' ),
    render: () => (
      <div className="mg-sc-table">
        {[
          ['[memberglut_register plan="gold"]', __( 'Registration + checkout. plan= preselects a plan.', 'memberglut' )],
          ['[memberglut_login redirect="/members/"]', __( 'Login form.', 'memberglut' )],
          ['[memberglut_account]', __( 'My Account with tabs.', 'memberglut' )],
          ['[memberglut_lost_password]', __( 'Lost / reset password form.', 'memberglut' )],
          ['[memberglut_profile]', __( 'Edit profile form on its own.', 'memberglut' )],
          ['[memberglut_plans group="Main"]', __( 'Pricing table.', 'memberglut' )],
          ['[memberglut_buy plan="gold"]', __( 'Buy / join button for one plan.', 'memberglut' )],
          ['[memberglut_receipt]', __( 'Order details on the Thank-you page.', 'memberglut' )],
          ['[memberglut_payments]', __( 'The member’s payment history.', 'memberglut' )],
          ['[memberglut_restrict plans="2,3" roles="editor"]…[/memberglut_restrict]', __( 'Show the inner content only to these plans or roles. Use not="2" to hide from a plan.', 'memberglut' )],
          ['[memberglut_logged_in]…[/memberglut_logged_in]', __( 'Only for logged-in users.', 'memberglut' )],
          ['[memberglut_logged_out]…[/memberglut_logged_out]', __( 'Only for visitors.', 'memberglut' )],
          ['[memberglut_member field="first_name"]', __( 'Print a field of the current member.', 'memberglut' )],
          ['[memberglut_expiry plan="gold"]', __( 'Expiry date of the member’s plan.', 'memberglut' )],
          ['[memberglut_members plan="3" limit="20"]', __( 'Simple list of members of a plan.', 'memberglut' )],
          ['[memberglut_count plan="3"]', __( 'Number of members (social proof).', 'memberglut' )],
        ].map(([c, d]) => <div key={c} className="mg-sc-row"><CopyCode code={c} /><span>{d}</span></div>)}
      </div>
    ),
  },
];

function FormsPages() {
  const { message } = App.useApp();
  const [values, setValues] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { api.getFormsConfig(DEFAULTS).then(setValues).finally(() => setLoading(false)); }, []);

  const save = async (v) => {
    setSaving(true);
    await api.saveFormsConfig(v);
    setSaving(false);
    message.success(__( 'Forms & pages saved.', 'memberglut' ));
    return true;
  };

  if (loading) return <div className="mg-loading"><Spin size="large" /></div>;

  return (
    <SettingsPanel
      title={__( 'Forms & Pages', 'memberglut' )}
      subtitle={__( 'The pages members use, and the fields and text of each form.', 'memberglut' )}
      sections={SECTIONS}
      values={values}
      setValues={setValues}
      onSave={save}
      saving={saving}
    />
  );
}

export function FormsPagesPage() {
  return <Page active="" wide><FormsPages /></Page>;
}
