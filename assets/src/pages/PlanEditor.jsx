import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { App, Spin, Button, Tag, AutoComplete, Alert } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo, faTag, faHourglassHalf, faKey, faArrowUpWideShort, faUserPlus, faChevronLeft,
  faArrowUp, faArrowDown, faGift, faCalendarDays, faInfinity, faRepeat, faMoneyBill, faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import Page from '../components/Page';
import SettingsPanel, { CopyCode } from '../components/SettingsPanel';
import { link, queryArg } from '../components/adminData';
import * as api from '../services/api';
import { L, roleOptions as lookupRoles, pageOptions, signupUrl } from '../services/lookups';

const NEW_PLAN = {
  name: '', slug: '', description: '', features: [], status: 'active', color: '#e94560', featured: false, group: 'Main',
  type: 'paid', price: 10, billing: 'recurring', duration: { length: 1, unit: 'month' }, limit_cycles: false, cycles: 12, after_cycles: 'expire',
  trial: false, trial_length: { length: 7, unit: 'day' }, one_trial: true, signup_fee: 0, gateways: ['stripe', 'paypal', 'bank'],
  duration_type: 'unlimited', end_date: '', calendar_start: '01-01',
  role: 'subscriber', keep_roles: true, expire_role: '', who_can_buy: 'anyone', buy_plans: [], hide_in_table: false, max_members: 0,
  allow_upgrade: true, allow_downgrade: true, fee_on_change: false, order: null,
  approval: 'inherit', form: 'default', redirect: 'inherit', redirect_page: 0, send_welcome: true,
};

const roleOptions = lookupRoles((r) => r.slug !== 'administrator');
const currentId = Number(queryArg('id')) || 0;
const planOptions = L.plans.filter((p) => p.id !== currentId).map((p) => ({ value: p.id, label: p.name }));
const gatewayOptions = L.gateways.map((g) => ({ value: g.value, label: g.enabled ? g.label : sprintf( __( '%s (not enabled)', 'memberglut' ), g.label ) }));
const formOptions = Object.entries(L.forms || { default: __( 'Default registration form', 'memberglut' ) }).map(([value, label]) => ({ value, label }));
const symbol = L.currency.symbol || '$';

/** Order of the plans in the group; this plan included (or appended when new). */
function groupOrder(values) {
  if (values.order) return values.order;
  const ids = L.plans.filter((p) => p.group === values.group && p.id !== currentId).sort((a, b) => a.tier - b.tier).map((p) => p.id);
  const self = L.plans.find((p) => p.id === currentId);
  if (!currentId || !self || self.group !== values.group) return [...ids, currentId || 'new'];
  const all = L.plans.filter((p) => p.group === values.group).sort((a, b) => a.tier - b.tier).map((p) => p.id);
  return all;
}

function UpgradeOrder({ values, setValues }) {
  const list = groupOrder(values);
  const move = (i, dir) => {
    const next = [...list];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    setValues((v) => ({ ...v, order: next }));
  };
  return (
    <div className="mg-fs-block">
      <div className="mg-fs-subhead">{__( 'Order in the group', 'memberglut' )}<span>{__( 'Lowest at the top. Moving down the list is an upgrade.', 'memberglut' )}</span></div>
      <ol className="mg-order-list">
        {list.map((id, i) => {
          const self = id === currentId || id === 'new';
          const p = self ? { name: values.name || __( 'This plan', 'memberglut' ), color: values.color } : (L.plans.find((x) => x.id === id) || { name: `#${id}` });
          return (
            <li key={id} className={self ? 'self' : ''}>
              <span className="mg-plan-dot" style={{ background: p.color }} />
              <b>{p.name}</b>{self && <Tag color="pink" bordered={false}>{__( 'this plan', 'memberglut' )}</Tag>}
              {!self && p.status !== 'active' && <Tag bordered={false}>{__( 'inactive', 'memberglut' )}</Tag>}
              <span className="mg-order-btns">
                <Button size="small" type="text" disabled={i === 0} onClick={() => move(i, -1)} icon={<FontAwesomeIcon icon={faArrowUp} />} />
                <Button size="small" type="text" disabled={i === list.length - 1} onClick={() => move(i, 1)} icon={<FontAwesomeIcon icon={faArrowDown} />} />
              </span>
            </li>
          );
        })}
      </ol>
      <div className="mg-muted" style={{ marginTop: 10 }}>{__( 'Members can move along this path from their account when Global Settings › Member account › “Members can upgrade / downgrade” is on as well.', 'memberglut' )}</div>
    </div>
  );
}

function PlanRules({ values }) {
  const [rules, setRules] = useState(null);
  useEffect(() => {
    if (!currentId) { setRules([]); return; }
    api.getPlanRules(currentId).then(setRules).catch(() => setRules([]));
  }, []);
  return (
    <div className="mg-fs-block">
      <div className="mg-fs-subhead">{__( 'Content this plan unlocks', 'memberglut' )}<span>{__( 'Content rules that list this plan. Add the plan to a rule to give it more access.', 'memberglut' )}</span></div>
      {rules === null ? <Spin size="small" /> : rules.length === 0 ? <div className="mg-fs-note">{currentId ? __( 'No rule uses this plan yet.', 'memberglut' ) : __( 'Save the plan first, then protect content for it.', 'memberglut' )}</div> : (
        <ul className="mg-link-list">
          {rules.map((r) => <li key={r.id}><a href={link('rule_editor', { id: r.id })}>{r.title}</a><Tag bordered={false} color={r.status === 'active' ? 'green' : 'default'}>{r.status}</Tag></li>)}
        </ul>
      )}
      {currentId > 0 && <Button href={link('rule_editor', { plan: currentId })} style={{ marginTop: 10 }}>{__( 'Protect content for this plan', 'memberglut' )}</Button>}
      {values.name && <div className="mg-muted" style={{ marginTop: 12 }}>{sprintf( __( 'Posts can also be locked to “%s” from the MemberGlut box in the post editor.', 'memberglut' ), values.name )}</div>}
    </div>
  );
}

function GroupInput({ value, onChange }) {
  return (
    <AutoComplete
      value={value}
      onChange={onChange}
      options={L.groups.map((g) => ({ value: g }))}
      filterOption={(input, o) => o.value.toLowerCase().includes((input || '').toLowerCase())}
      placeholder={__( 'Main', 'memberglut' )}
      style={{ width: 260 }}
    />
  );
}

const disabledGateways = (v) => (v.gateways || []).filter((g) => !(L.gateways.find((x) => x.value === g) || {}).enabled);

const SECTIONS = [
  {
    key: 'general', title: __( 'General', 'memberglut' ), icon: faCircleInfo, desc: __( 'Name and how the plan appears in pricing tables.', 'memberglut' ), fields: [
      { key: 'name', type: 'text', label: __( 'Plan name', 'memberglut' ), placeholder: __( 'e.g. Gold', 'memberglut' ) },
      { key: 'slug', type: 'text', label: __( 'Slug', 'memberglut' ), tip: __( 'Used in signup links (?plan=gold) and shortcodes. Empty creates it from the name. Changing it breaks links you already shared.', 'memberglut' ), placeholder: 'gold' },
      { key: 'description', type: 'textarea', label: __( 'Description', 'memberglut' ), tip: __( 'Shown in the pricing table and at checkout.', 'memberglut' ), rows: 3 },
      { key: 'features', type: 'tags', label: __( 'Feature list', 'memberglut' ), tip: __( 'Bullet points for the pricing table. Press Enter after each one.', 'memberglut' ), placeholder: __( 'All premium articles', 'memberglut' ) },
      { key: 'status', type: 'radio', label: __( 'Status', 'memberglut' ), tip: __( 'Inactive plans cannot be bought, but members who have them keep them.', 'memberglut' ), options: [{ value: 'active', label: __( 'Active', 'memberglut' ) }, { value: 'inactive', label: __( 'Inactive', 'memberglut' ) }] },
      { key: 'color', type: 'color', label: __( 'Colour', 'memberglut' ), tip: __( 'Badge colour in the admin and in the pricing table.', 'memberglut' ) },
      { key: 'featured', type: 'switch', label: __( 'Highlight in the pricing table', 'memberglut' ), tip: __( 'Adds a “Most popular” ribbon.', 'memberglut' ) },
    ],
  },
  {
    key: 'pricing', title: __( 'Pricing', 'memberglut' ), icon: faTag, desc: __( 'What the plan costs and how often members pay.', 'memberglut' ), fields: [
      {
        key: 'type', type: 'cards', label: __( 'Plan type', 'memberglut' ), options: [
          { value: 'free', label: __( 'Free', 'memberglut' ), desc: __( 'No payment. Good for a starter tier or lead magnet.', 'memberglut' ), icon: faGift },
          { value: 'paid', label: __( 'Paid', 'memberglut' ), desc: __( 'One payment or a subscription.', 'memberglut' ), icon: faMoneyBill },
        ],
      },
      { key: 'billing', type: 'radio', label: __( 'Billing', 'memberglut' ), options: [{ value: 'one_time', label: __( 'One payment', 'memberglut' ) }, { value: 'recurring', label: __( 'Recurring subscription', 'memberglut' ) }], show: (v) => v.type === 'paid' },
      { key: 'price', type: 'price', prefix: symbol, label: __( 'Price', 'memberglut' ), show: (v) => v.type === 'paid' },
      { key: 'duration', type: 'duration', label: __( 'Bill every', 'memberglut' ), show: (v) => v.type === 'paid' && v.billing === 'recurring' },
      { key: 'limit_cycles', type: 'switch', label: __( 'Stop after a number of payments', 'memberglut' ), tip: __( 'Pay in installments: e.g. 3 monthly payments for a course.', 'memberglut' ), show: (v) => v.type === 'paid' && v.billing === 'recurring' },
      { key: 'cycles', type: 'number', label: __( 'Number of payments', 'memberglut' ), min: 2, max: 120, show: (v) => v.type === 'paid' && v.billing === 'recurring' && v.limit_cycles },
      { key: 'after_cycles', type: 'radio', label: __( 'After the last payment', 'memberglut' ), options: [{ value: 'keep', label: __( 'Keep access forever', 'memberglut' ) }, { value: 'expire', label: __( 'End access', 'memberglut' ) }], show: (v) => v.type === 'paid' && v.billing === 'recurring' && v.limit_cycles },
      { key: 'signup_fee', type: 'price', prefix: symbol, label: __( 'Sign-up fee', 'memberglut' ), tip: __( 'Added once to the first payment (charged at the start of a free trial). Coupons do not discount it.', 'memberglut' ), show: (v) => v.type === 'paid' },
      { key: 'trial', type: 'switch', label: __( 'Free trial', 'memberglut' ), tip: __( 'Members pay nothing until the trial ends. Card details are still collected.', 'memberglut' ), show: (v) => v.type === 'paid' && v.billing === 'recurring' },
      { key: 'trial_length', type: 'duration', label: __( 'Trial length', 'memberglut' ), show: (v) => v.type === 'paid' && v.billing === 'recurring' && v.trial },
      { key: 'one_trial', type: 'switch', label: __( 'One trial per person', 'memberglut' ), tip: __( 'Users who already had a trial on any plan pay from the first day.', 'memberglut' ), show: (v) => v.type === 'paid' && v.billing === 'recurring' && v.trial },
      {
        key: 'gateways', type: 'multiselect', label: __( 'Payment methods', 'memberglut' ), tip: __( 'Methods offered for this plan. Set them up in Global Settings › Payments.', 'memberglut' ), options: gatewayOptions, show: (v) => v.type === 'paid',
        after: (v) => (disabledGateways(v).length ? <Alert type="warning" showIcon style={{ marginTop: 8 }} message={sprintf( __( 'Not enabled in Global Settings › Payments: %s. They are not offered until you enable them.', 'memberglut' ), disabledGateways(v).join(', ') )} action={<a href={link('settings', { tab: 'payments' })}>{__( 'Open', 'memberglut' )}</a>} /> : null),
      },
    ],
  },
  {
    key: 'length', title: __( 'Access length', 'memberglut' ), icon: faHourglassHalf, desc: __( 'How long access lasts. Recurring plans last until the member cancels or a payment fails.', 'memberglut' ), fields: [
      { key: 'length_info', type: 'info', label: __( 'Recurring plan', 'memberglut' ), text: __( 'Access renews with every payment. Change the billing period in Pricing.', 'memberglut' ), show: (v) => v.type === 'paid' && v.billing === 'recurring' },
      {
        key: 'duration_type', type: 'cards', label: __( 'Access lasts', 'memberglut' ), show: (v) => !(v.type === 'paid' && v.billing === 'recurring'), options: [
          { value: 'unlimited', label: __( 'Forever', 'memberglut' ), desc: __( 'Lifetime access.', 'memberglut' ), icon: faInfinity },
          { value: 'fixed', label: __( 'A set time', 'memberglut' ), desc: __( 'e.g. 30 days or 1 year from joining.', 'memberglut' ), icon: faRepeat },
          { value: 'date', label: __( 'Until a date', 'memberglut' ), desc: __( 'Everyone expires on the same day.', 'memberglut' ), icon: faCalendarDays },
          { value: 'calendar', label: __( 'Calendar year', 'memberglut' ), desc: __( 'Ends on the yearly renewal date (e.g. club seasons).', 'memberglut' ), icon: faCalendarCheck },
        ],
      },
      { key: 'duration', type: 'duration', label: __( 'Length', 'memberglut' ), show: (v) => !(v.type === 'paid' && v.billing === 'recurring') && v.duration_type === 'fixed' },
      { key: 'end_date', type: 'date', label: __( 'Ends on', 'memberglut' ), show: (v) => !(v.type === 'paid' && v.billing === 'recurring') && v.duration_type === 'date' },
      { key: 'calendar_start', type: 'text', label: __( 'Year starts on (MM-DD)', 'memberglut' ), tip: __( '01-01 for a calendar year, 07-01 for a July fiscal year.', 'memberglut' ), show: (v) => !(v.type === 'paid' && v.billing === 'recurring') && v.duration_type === 'calendar' },
    ],
  },
  {
    key: 'access', title: __( 'Access & role', 'memberglut' ), icon: faKey, desc: __( 'The role members get, and who is allowed to buy this plan.', 'memberglut' ), fields: [
      { key: 'role', type: 'select', label: __( 'Give this role', 'memberglut' ), tip: __( 'Added when the plan becomes active. Create roles in Roles & Capabilities.', 'memberglut' ), options: roleOptions },
      { key: 'keep_roles', type: 'switch', label: __( 'Keep the user’s other roles', 'memberglut' ), tip: __( 'Off replaces the user’s role. Administrators are never changed.', 'memberglut' ) },
      { key: 'expire_role', type: 'select', label: __( 'Role after the plan ends', 'memberglut' ), tip: __( 'The plan role is removed unless another active plan gives it or the user had it before joining.', 'memberglut' ), options: [{ value: '', label: __( '— Just remove the plan role —', 'memberglut' ) }, ...roleOptions] },
      {
        key: 'who_can_buy', type: 'select', label: __( 'Who can join', 'memberglut' ), options: [
          { value: 'anyone', label: __( 'Anyone', 'memberglut' ) },
          { value: 'new', label: __( 'New users only', 'memberglut' ) },
          { value: 'members', label: __( 'Only members of certain plans', 'memberglut' ) },
        ],
      },
      { key: 'buy_plans', type: 'multiselect', label: __( 'Members of', 'memberglut' ), options: planOptions, show: (v) => v.who_can_buy === 'members' },
      { key: 'max_members', type: 'number', label: __( 'Member limit', 'memberglut' ), tip: __( '0 = no limit. When full, the plan shows “Sold out”.', 'memberglut' ), min: 0 },
      { key: 'hide_in_table', type: 'switch', label: __( 'Hide from the pricing table', 'memberglut' ), tip: __( 'Only people with the signup link can join.', 'memberglut' ) },
    ],
    render: (ctx) => <PlanRules {...ctx} />,
  },
  {
    key: 'upgrades', title: __( 'Upgrades', 'memberglut' ), icon: faArrowUpWideShort, desc: __( 'Plans in the same group form a path members can move along.', 'memberglut' ), fields: [
      { key: 'group', type: 'custom', label: __( 'Plan group', 'memberglut' ), tip: __( 'A member holds one plan per group. Type a new name to create a group.', 'memberglut' ), render: ({ value, onChange }) => <GroupInput value={value} onChange={onChange} /> },
      { key: 'allow_upgrade', type: 'switch', label: __( 'Members can upgrade to this plan', 'memberglut' ) },
      { key: 'allow_downgrade', type: 'switch', label: __( 'Members can downgrade to this plan', 'memberglut' ) },
      { key: 'fee_on_change', type: 'switch', label: __( 'Charge the sign-up fee on plan changes', 'memberglut' ) },
    ],
    render: (ctx) => <UpgradeOrder {...ctx} />,
  },
  {
    key: 'signup', title: __( 'Sign-up', 'memberglut' ), icon: faUserPlus, desc: __( 'The form, approval and the page members see after joining.', 'memberglut' ), fields: [
      { key: 'form', type: 'select', label: __( 'Registration form', 'memberglut' ), tip: __( 'Edit forms in Forms & Pages.', 'memberglut' ), options: formOptions },
      { key: 'approval', type: 'select', label: __( 'Approval', 'memberglut' ), tip: __( 'Overrides Global Settings › Login & registration › New account approval for people joining this plan.', 'memberglut' ), options: [{ value: 'inherit', label: __( 'Use the global setting', 'memberglut' ) }, { value: 'auto', label: __( 'Automatic', 'memberglut' ) }, { value: 'email', label: __( 'Email confirmation', 'memberglut' ) }, { value: 'admin', label: __( 'Admin approval', 'memberglut' ) }] },
      { key: 'redirect', type: 'select', label: __( 'After joining', 'memberglut' ), tip: __( 'A “return to the page they came from” redirect (Global Settings › Redirects) still wins.', 'memberglut' ), options: [{ value: 'inherit', label: __( 'Use the global redirect', 'memberglut' ) }, { value: 'page', label: __( 'Go to a page', 'memberglut' ) }] },
      { key: 'redirect_page', type: 'select', label: __( 'Page', 'memberglut' ), options: pageOptions(), show: (v) => v.redirect === 'page' },
      { key: 'send_welcome', type: 'switch', label: __( 'Send the “Subscription activated” email', 'memberglut' ), tip: __( 'The email must also be on in Emails.', 'memberglut' ) },
      { key: 'signup_link', type: 'custom', label: __( 'Signup link', 'memberglut' ), tip: __( 'Opens the registration page with this plan selected.', 'memberglut' ), render: ({ values }) => <CopyCode code={values.signup_url && values.slug === values.saved_slug ? values.signup_url : signupUrl(values.slug)} /> },
      { key: 'buy_button', type: 'custom', label: __( 'Buy button shortcode', 'memberglut' ), render: ({ values }) => <CopyCode code={`[memberglut_buy plan="${values.slug || 'plan'}"]`} /> },
    ],
  },
];

function PlanEditor() {
  const { message } = App.useApp();
  const [values, setValues] = useState(NEW_PLAN);
  const [loading, setLoading] = useState(!!currentId);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!currentId) return;
    api.getPlan(currentId)
      .then((p) => setValues({ ...NEW_PLAN, ...p, saved_slug: p.slug }))
      .catch((e) => message.error(e.message))
      .finally(() => setLoading(false));
  }, []);

  const save = async (v) => {
    if (!v.name.trim()) { setErrors({ name: __( 'Give the plan a name.', 'memberglut' ) }); message.error(__( 'Give the plan a name.', 'memberglut' )); return false; }
    setSaving(true);
    try {
      const saved = await api.savePlan({ ...v, id: currentId || undefined });
      if (v.order) {
        await api.savePlanOrder(saved.group, v.order.map((id) => (id === 'new' ? saved.id : id)));
      }
      setErrors({});
      message.success(currentId ? __( 'Plan updated.', 'memberglut' ) : __( 'Plan created.', 'memberglut' ));
      if (!currentId) {
        window.location.href = link('plan_editor', { id: saved.id });
        return true;
      }
      setValues({ ...NEW_PLAN, ...saved, saved_slug: saved.slug, order: null });
      return true;
    } catch (e) {
      setErrors(e.fields || {});
      message.error(e.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="mg-loading"><Spin size="large" /></div>;

  return (
    <SettingsPanel
      screen="plan"
      back={{ href: link('plans'), label: <><FontAwesomeIcon icon={faChevronLeft} /> {__( 'All plans', 'memberglut' )}</> }}
      title={currentId ? sprintf( __( 'Edit plan: %s', 'memberglut' ), values.name ) : __( 'New plan', 'memberglut' )}
      titleExtra={currentId > 0 && (
        <div className="mg-fs-formname">
          <span className="mg-fs-id">ID {currentId}</span>
          <a className="mg-muted" href={link('members', { plan: currentId })}>{sprintf( __( '%d members', 'memberglut' ), values.members || 0 )}</a>
        </div>
      )}
      sections={SECTIONS}
      values={values}
      setValues={setValues}
      onSave={save}
      saving={saving}
      errors={errors}
      saveLabel={currentId ? __( 'Update plan', 'memberglut' ) : __( 'Create plan', 'memberglut' )}
    />
  );
}

export function PlanEditorPage() {
  return <Page active="plans" wide><PlanEditor /></Page>;
}
