import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { App, Switch, Input, InputNumber, Button, Segmented, Skeleton, Tag, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPaperPlane, faEye, faPen, faUser, faUserShield, faGear, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import Page, { PageHeader } from '../components/Page';
import { SmartTags } from '../components/SettingsPanel';
import { link } from '../components/adminData';
import * as api from '../services/api';
import { currentUser } from '../services/lookups';

const GROUPS = [
  ['account', __( 'Account', 'memberglut' )],
  ['subscription', __( 'Subscription', 'memberglut' )],
  ['payment', __( 'Payment', 'memberglut' )],
  ['admin', __( 'To the admin', 'memberglut' )],
];

const REMINDERS = ['expiring_soon', 'renewal_reminder', 'trial_ending'];

/** Server-rendered preview (real template, colours and logo from Email settings). */
function Preview({ email }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let live = true;
    const t = setTimeout(() => {
      api.previewEmail(email.key, { subject: email.subject, heading: email.heading, body: email.body })
        .then((d) => { if (live) setData(d); })
        .catch((e) => { if (live) setError(e.message); });
    }, 250);
    return () => { live = false; clearTimeout(t); };
  }, [email.key, email.subject, email.heading, email.body]);
  if (error) return <div className="mg-fs-note">{error}</div>;
  if (!data) return <Skeleton active paragraph={{ rows: 8 }} />;
  return (
    <div className="mg-email-preview">
      <div className="mg-email-meta"><b>{__( 'Subject:', 'memberglut' )}</b> {data.subject}</div>
      <iframe title={__( 'Email preview', 'memberglut' )} className="mg-email-iframe" srcDoc={data.html} sandbox="" />
      <div className="mg-muted" style={{ marginTop: 8 }}>{__( 'Smart tags are filled with sample data (your account and a paid plan).', 'memberglut' )}</div>
    </div>
  );
}

function Emails() {
  const { message } = App.useApp();
  const [emails, setEmails] = useState(null);
  const [tags, setTags] = useState([]);
  const [current, setCurrent] = useState('register');
  const [mode, setMode] = useState('edit');
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testOpen, setTestOpen] = useState(false);
  const [testTo, setTestTo] = useState('');
  const [sending, setSending] = useState(false);

  const apply = (d) => { setEmails(d.emails); setTags(d.tags); };

  useEffect(() => {
    api.getEmails().then(apply).catch((e) => message.error(e.message));
    const admin = typeof memberglut_admin !== 'undefined' ? memberglut_admin : {};
    setTestTo((admin.user && admin.user.email) || '');
  }, []);

  useEffect(() => {
    const warn = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  if (!emails) return <Skeleton active paragraph={{ rows: 12 }} />;

  const email = emails.find((e) => e.key === current) || emails[0];
  const set = (key, patch) => { setEmails(emails.map((e) => (e.key === key ? { ...e, ...patch } : e))); setDirty(true); };
  const save = async () => {
    setSaving(true);
    try {
      apply(await api.saveEmails(emails));
      setDirty(false);
      message.success(__( 'Emails saved.', 'memberglut' ));
    } catch (e) { message.error(e.message); } finally { setSaving(false); }
  };
  const reset = async () => {
    try {
      const d = await api.resetEmail(email.key);
      setEmails(emails.map((e) => (e.key === email.key ? { ...e, subject: d.subject, heading: d.heading, body: d.body, is_default: true } : e)));
      message.success(__( 'Default text restored.', 'memberglut' ));
    } catch (e) { message.error(e.message); }
  };
  const sendTest = async () => {
    setSending(true);
    try {
      await api.testEmail(email.key, { to: testTo, subject: email.subject, heading: email.heading, body: email.body });
      setTestOpen(false);
      message.success(sprintf( __( 'Test sent to %s.', 'memberglut' ), testTo ));
    } catch (e) { message.error(e.message); } finally { setSending(false); }
  };

  return (
    <>
      <PageHeader
        title={__( 'Emails', 'memberglut' )}
        subtitle={__( 'Every email MemberGlut sends. Turn each on or off and change its words.', 'memberglut' )}
        actions={(
          <>
            <Button size="large" icon={<FontAwesomeIcon icon={faGear} />} href={link('settings', { tab: 'emails' })}>{__( 'Sender & design', 'memberglut' )}</Button>
            {dirty && <span className="mg-fs-unsaved">{__( 'Unsaved changes', 'memberglut' )}</span>}
            <Button size="large" type="primary" disabled={!dirty} loading={saving} icon={<FontAwesomeIcon icon={faFloppyDisk} />} onClick={save} className="mg-save-btn">{__( 'Save emails', 'memberglut' )}</Button>
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
              <h2>{email.name} {!email.enabled && <Tag bordered={false}>{__( 'Off', 'memberglut' )}</Tag>} {!email.is_default && <Tag color="pink" bordered={false}>{__( 'Customized', 'memberglut' )}</Tag>}</h2>
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
                  <InputNumber min={1} max={90} value={email.days} onChange={(v) => set(email.key, { days: v || 1 })} addonAfter={email.key === 'trial_ending' ? __( 'days before the trial ends', 'memberglut' ) : (email.key === 'renewal_reminder' ? __( 'days before the automatic renewal', 'memberglut' ) : __( 'days before the expiry date', 'memberglut' ))} />
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
                <label>{__( 'Message', 'memberglut' )} <span className="mg-muted">{__( '(a line with only a link becomes a button)', 'memberglut' )}</span></label>
                <Input.TextArea className="mg-editor" rows={12} value={email.body} onChange={(e) => set(email.key, { body: e.target.value })} />
              </div>
              <SmartTags tags={tags} />
              {!email.is_default && <a className="mg-reset-link" onClick={reset}><FontAwesomeIcon icon={faRotateLeft} /> {__( 'Restore the default text', 'memberglut' )}</a>}
            </div>
          ) : <Preview email={email} />}
        </section>
      </div>

      <Modal title={<span className="mg-modal-title">{__( 'Send a test email', 'memberglut' )}</span>} open={testOpen} onCancel={() => setTestOpen(false)} okText={__( 'Send', 'memberglut' )} confirmLoading={sending} onOk={sendTest}>
        <p className="mg-modal-intro">{__( 'Smart tags are filled with sample data. Unsaved changes are included.', 'memberglut' )}</p>
        <Input type="email" value={testTo} onChange={(e) => setTestTo(e.target.value)} placeholder="you@example.com" />
      </Modal>
    </>
  );
}

export function EmailsPage() {
  return <Page active=""><Emails /></Page>;
}
