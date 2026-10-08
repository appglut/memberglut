import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { App, Switch, Input, InputNumber, Button, Segmented, Skeleton, Tag, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPaperPlane, faEye, faPen, faUser, faUserShield, faGear, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import Page, { PageHeader } from '../components/Page';
import { SmartTags } from '../components/SettingsPanel';
import { link } from '../components/adminData';
import * as api from '../services/api';
import { EMAIL_TAGS } from '../services/demoData';

const GROUPS = [
  ['account', __( 'Account', 'memberglut' )],
  ['subscription', __( 'Subscription', 'memberglut' )],
  ['payment', __( 'Payment', 'memberglut' )],
  ['admin', __( 'To the admin', 'memberglut' )],
];

const DEFAULT_BODY = {
  register: 'Hi {first_name},\n\nWelcome to {site_name}! Your account is ready.\n\nUsername: {username}\nLog in here: {login_url}\n\nSee you inside,\n{site_name}',
  activated: 'Hi {first_name},\n\nYour {plan_name} membership is now active.\n\nPlan: {plan_name}\nPrice: {plan_price}\nRenews / expires: {expiration_date}\n\nManage it any time from your account: {account_url}',
  payment_failed: 'Hi {first_name},\n\nWe could not take the payment for your {plan_name} membership.\n\nPlease update your card from your account so you do not lose access: {account_url}\n\nWe will try again automatically in a few days.',
};

const REMINDERS = ['expiring_soon', 'renewal_reminder', 'trial_ending'];

const SAMPLE = {
  '{first_name}': 'Aisha', '{display_name}': 'Aisha Rahman', '{last_name}': 'Rahman', '{username}': 'aisha', '{user_email}': 'aisha@example.com',
  '{plan_name}': 'Gold', '{plan_price}': '$89.00 / year', '{plan_duration}': '1 year', '{start_date}': 'Oct 6, 2026', '{expiration_date}': 'Oct 6, 2027',
  '{subscription_status}': 'Active', '{payment_id}': '5003', '{payment_amount}': '$89.00', '{payment_gateway}': 'Stripe', '{site_name}': 'My Membership Site',
  '{site_url}': 'https://yoursite.com', '{account_url}': 'https://yoursite.com/account/', '{login_url}': 'https://yoursite.com/login/', '{reset_link}': 'https://yoursite.com/reset/…', '{admin_email}': 'admin@yoursite.com',
};
const fill = (text = '') => Object.entries(SAMPLE).reduce((t, [k, v]) => t.split(k).join(v), text);

function Emails() {
  const { message } = App.useApp();
  const [emails, setEmails] = useState(null);
  const [current, setCurrent] = useState('register');
  const [mode, setMode] = useState('edit');
  const [dirty, setDirty] = useState(false);
  const [testOpen, setTestOpen] = useState(false);
  const [testTo, setTestTo] = useState('admin@yoursite.com');

  useEffect(() => { api.getEmails().then((list) => setEmails(list.map((e) => ({ heading: '', days: 7, ...e, body: e.body || DEFAULT_BODY[e.key] || `Hi {first_name},\n\n${e.desc}\n\n{site_name}` })))); }, []);

  if (!emails) return <Skeleton active paragraph={{ rows: 12 }} />;

  const email = emails.find((e) => e.key === current);
  const set = (key, patch) => { setEmails(emails.map((e) => (e.key === key ? { ...e, ...patch } : e))); setDirty(true); };
  const save = async () => { await api.saveEmails(emails); setDirty(false); message.success(__( 'Emails saved.', 'memberglut' )); };

  return (
    <>
      <PageHeader
        title={__( 'Emails', 'memberglut' )}
        subtitle={__( 'Every email MemberGlut sends. Turn each on or off and change its words.', 'memberglut' )}
        actions={(
          <>
            <Button size="large" icon={<FontAwesomeIcon icon={faGear} />} href={link('settings', { tab: 'emails' })}>{__( 'Sender & design', 'memberglut' )}</Button>
            {dirty && <span className="mg-fs-unsaved">{__( 'Unsaved changes', 'memberglut' )}</span>}
            <Button size="large" type="primary" disabled={!dirty} icon={<FontAwesomeIcon icon={faFloppyDisk} />} onClick={save} className="mg-save-btn">{__( 'Save emails', 'memberglut' )}</Button>
          </>
        )}
      />

      <div className="mg-email-layout">
        <aside className="mg-email-list">
          {GROUPS.map(([g, label]) => (
            <div key={g} className="mg-email-group">
              <div className="mg-email-group-title">{label}</div>
              {emails.filter((e) => e.group === g).map((e) => (
                <div key={e.key} className={`mg-email-item ${e.key === current ? 'active' : ''} ${!e.enabled ? 'off' : ''}`} onClick={() => setCurrent(e.key)}>
                  <FontAwesomeIcon icon={e.recipient === 'admin' ? faUserShield : faUser} className="who" />
                  <span>{e.name}</span>
                  <Switch size="small" checked={e.enabled} onClick={(v, ev) => ev.stopPropagation()} onChange={(v) => set(e.key, { enabled: v })} />
                </div>
              ))}
            </div>
          ))}
        </aside>

        <section className="mg-email-editor">
          <div className="mg-email-editor-head">
            <div>
              <h2>{email.name} {!email.enabled && <Tag bordered={false}>{__( 'Off', 'memberglut' )}</Tag>}</h2>
              <p>{email.desc} <span className="mg-muted">· {email.recipient === 'admin' ? __( 'Sent to the admin', 'memberglut' ) : __( 'Sent to the member', 'memberglut' )}</span></p>
            </div>
            <div className="mg-fs-actions">
              <Segmented value={mode} onChange={setMode} options={[{ value: 'edit', label: __( 'Edit', 'memberglut' ), icon: <FontAwesomeIcon icon={faPen} /> }, { value: 'preview', label: __( 'Preview', 'memberglut' ), icon: <FontAwesomeIcon icon={faEye} /> }]} />
              <Button icon={<FontAwesomeIcon icon={faPaperPlane} />} onClick={() => setTestOpen(true)}>{__( 'Send test', 'memberglut' )}</Button>
            </div>
          </div>

          {mode === 'edit' ? (
            <div className="mg-email-form">
              {REMINDERS.includes(email.key) && (
                <div className="mg-email-field">
                  <label>{__( 'Send', 'memberglut' )}</label>
                  <InputNumber min={1} max={90} value={email.days} onChange={(v) => set(email.key, { days: v })} addonAfter={email.key === 'trial_ending' ? __( 'days before the trial ends', 'memberglut' ) : __( 'days before the date', 'memberglut' )} />
                </div>
              )}
              <div className="mg-email-field">
                <label>{__( 'Subject', 'memberglut' )}</label>
                <Input value={email.subject} onChange={(e) => set(email.key, { subject: e.target.value })} />
              </div>
              <div className="mg-email-field">
                <label>{__( 'Heading', 'memberglut' )} <span className="mg-muted">{__( '(optional, shown at the top of the HTML template)', 'memberglut' )}</span></label>
                <Input value={email.heading} placeholder={email.name} onChange={(e) => set(email.key, { heading: e.target.value })} />
              </div>
              <div className="mg-email-field">
                <label>{__( 'Message', 'memberglut' )}</label>
                <Input.TextArea className="mg-editor" rows={12} value={email.body} onChange={(e) => set(email.key, { body: e.target.value })} />
              </div>
              <SmartTags tags={EMAIL_TAGS} />
              <a className="mg-reset-link" onClick={() => set(email.key, { body: DEFAULT_BODY[email.key] || '', subject: email.subject })}><FontAwesomeIcon icon={faRotateLeft} /> {__( 'Restore the default text', 'memberglut' )}</a>
            </div>
          ) : (
            <div className="mg-email-preview">
              <div className="mg-email-meta"><b>{__( 'Subject:', 'memberglut' )}</b> {fill(email.subject)}</div>
              <div className="mg-email-frame">
                <div className="mg-email-brand">My Membership Site</div>
                <div className="mg-email-card">
                  <h1>{fill(email.heading || email.name)}</h1>
                  {fill(email.body).split('\n').map((line, i) => (line ? <p key={i}>{line}</p> : <br key={i} />))}
                </div>
                <div className="mg-email-foot">{__( 'My Membership Site · You receive this email because you have an account with us.', 'memberglut' )}</div>
              </div>
            </div>
          )}
        </section>
      </div>

      <Modal title={<span className="mg-modal-title">{__( 'Send a test email', 'memberglut' )}</span>} open={testOpen} onCancel={() => setTestOpen(false)} okText={__( 'Send', 'memberglut' )}
        onOk={() => { setTestOpen(false); message.success(sprintf( __( 'Test sent to %s.', 'memberglut' ), testTo )); }}>
        <p className="mg-modal-intro">{__( 'Smart tags are filled with sample data.', 'memberglut' )}</p>
        <Input value={testTo} onChange={(e) => setTestTo(e.target.value)} />
      </Modal>
    </>
  );
}

export function EmailsPage() {
  return <Page active=""><Emails /></Page>;
}
