import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { App, Spin, Select, Input, Button, Alert, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft, faSliders, faShieldHalved, faUserCheck, faEyeSlash, faVial, faPlus, faXmark,
  faLayerGroup, faUserTag, faRightToBracket, faUserSecret, faMessage, faArrowRightFromBracket, faTags,
} from '@fortawesome/free-solid-svg-icons';
import Page from '../components/Page';
import SettingsPanel from '../components/SettingsPanel';
import { link, queryArg } from '../components/adminData';
import * as api from '../services/api';
import { PLANS, ROLES, PAGES } from '../services/demoData';

const TARGETS = [
  { value: 'site', label: __( 'Whole site', 'memberglut' ) },
  { value: 'post_type', label: __( 'All of a post type', 'memberglut' ) },
  { value: 'pages', label: __( 'Specific pages', 'memberglut' ) },
  { value: 'posts', label: __( 'Specific posts', 'memberglut' ) },
  { value: 'children', label: __( 'Child pages of', 'memberglut' ) },
  { value: 'taxonomy', label: __( 'Posts in a category / tag', 'memberglut' ) },
  { value: 'archive', label: __( 'Archive & special pages', 'memberglut' ) },
  { value: 'author', label: __( 'Posts by author', 'memberglut' ) },
  { value: 'template', label: __( 'Page template', 'memberglut' ) },
  { value: 'url', label: __( 'URL pattern', 'memberglut' ) },
];

const POST_TYPES = [{ value: 'post', label: __( 'Posts', 'memberglut' ) }, { value: 'page', label: __( 'Pages', 'memberglut' ) }, { value: 'course', label: 'Courses' }, { value: 'lesson', label: 'Lessons' }, { value: 'download', label: 'Downloads' }];
const POSTS = ['Ultimate Productivity Guide', 'Live Q&A — March recording', 'Members Lounge', 'Course intro (free)', 'Downloads', 'Members Area'].map((t) => ({ value: t, label: t }));
const TERMS = ['Premium', 'Tutorials', 'Interviews', 'News'].map((t) => ({ value: t, label: t }));
const ARCHIVES = [
  { value: 'front', label: __( 'Front page', 'memberglut' ) }, { value: 'blog', label: __( 'Blog page', 'memberglut' ) },
  { value: 'search', label: __( 'Search results', 'memberglut' ) }, { value: '404', label: __( '404 page', 'memberglut' ) },
  { value: 'author_archive', label: __( 'Author archives', 'memberglut' ) }, { value: 'pt_archive', label: __( 'Post type archives', 'memberglut' ) },
];

/** Editor for a list of “what” targets (used for Protect and Exclude). */
function TargetList({ value = [], onChange, addLabel, empty }) {
  const set = (i, patch) => onChange(value.map((t, j) => (j === i ? { ...t, ...patch } : t)));
  const control = (t, i) => {
    switch (t.type) {
      case 'site': return <span className="mg-muted">{__( 'Everything except login, registration and password pages.', 'memberglut' )}</span>;
      case 'post_type': return <Select value={t.post_type} onChange={(v) => set(i, { post_type: v })} options={POST_TYPES} placeholder={__( 'Post type', 'memberglut' )} style={{ width: '100%' }} />;
      case 'pages': case 'posts': case 'children':
        return <Select mode="multiple" value={t.posts || []} onChange={(v) => set(i, { posts: v })} options={POSTS} placeholder={__( 'Search titles…', 'memberglut' )} style={{ width: '100%' }} />;
      case 'taxonomy':
        return (
          <Space.Compact style={{ width: '100%' }}>
            <Select value={t.taxonomy || 'category'} onChange={(v) => set(i, { taxonomy: v })} options={[{ value: 'category', label: __( 'Category', 'memberglut' ) }, { value: 'post_tag', label: __( 'Tag', 'memberglut' ) }, { value: 'course_cat', label: 'Course category' }]} style={{ width: 150 }} />
            <Select mode="multiple" value={t.terms || []} onChange={(v) => set(i, { terms: v })} options={TERMS} placeholder={__( 'Terms', 'memberglut' )} style={{ flex: 1 }} />
          </Space.Compact>
        );
      case 'archive': return <Select mode="multiple" value={t.archives || []} onChange={(v) => set(i, { archives: v })} options={ARCHIVES} style={{ width: '100%' }} />;
      case 'author': return <Select mode="multiple" value={t.authors || []} onChange={(v) => set(i, { authors: v })} options={[{ value: 'admin', label: 'admin' }, { value: 'editor', label: 'editor' }]} style={{ width: '100%' }} />;
      case 'template': return <Select value={t.template} onChange={(v) => set(i, { template: v })} options={[{ value: 'full-width', label: 'Full width' }, { value: 'landing', label: 'Landing' }]} style={{ width: '100%' }} />;
      case 'url': return <Input value={t.pattern} onChange={(e) => set(i, { pattern: e.target.value })} placeholder="/members/*  or  ^/course/[0-9]+/$" />;
      default: return null;
    }
  };
  return (
    <div className="mg-target-list">
      {value.length === 0 && <div className="mg-fs-note" style={{ marginTop: 0 }}>{empty}</div>}
      {value.map((t, i) => (
        <div key={i} className="mg-target-row">
          {i > 0 && <span className="mg-or">{__( 'OR', 'memberglut' )}</span>}
          <Select value={t.type} onChange={(v) => set(i, { type: v })} options={TARGETS} style={{ width: 230 }} />
          <div className="mg-target-value">{control(t, i)}</div>
          <Button type="text" icon={<FontAwesomeIcon icon={faXmark} />} onClick={() => onChange(value.filter((x, j) => j !== i))} />
        </div>
      ))}
      <Button icon={<FontAwesomeIcon icon={faPlus} />} onClick={() => onChange([...value, { type: 'pages', posts: [] }])}>{addLabel}</Button>
    </div>
  );
}

function AccessTester({ values }) {
  const [user, setUser] = useState('guest');
  const [url, setUrl] = useState('/premium/how-to-start/');
  const [result, setResult] = useState(null);
  const check = () => {
    const allowed = user === 'admin' || (user === 'gold' && values.who === 'plans' && values.plans.includes(3));
    setResult(allowed
      ? { type: 'success', text: __( 'Allowed: this user can see the content.', 'memberglut' ) }
      : { type: 'warning', text: sprintf( __( 'Blocked by “%s”. The visitor sees: %s.', 'memberglut' ), values.title || __( 'this rule', 'memberglut' ), values.action ) });
  };
  return (
    <div className="mg-fs-block">
      <div className="mg-tester">
        <Select value={user} onChange={setUser} style={{ width: 240 }} options={[
          { value: 'guest', label: __( 'A logged-out visitor', 'memberglut' ) },
          { value: 'free', label: 'aisha0 (Free)' }, { value: 'gold', label: 'yusuf3 (Gold)' }, { value: 'admin', label: 'admin (Administrator)' },
        ]} />
        <Input value={url} onChange={(e) => setUrl(e.target.value)} addonBefore={__( 'URL', 'memberglut' )} />
        <Button type="primary" onClick={check}>{__( 'Check', 'memberglut' )}</Button>
      </div>
      {result && <Alert style={{ marginTop: 14 }} showIcon type={result.type} message={result.text} />}
    </div>
  );
}

const NEW_RULE = {
  title: '', status: 'active', priority: 10, note: '',
  protect: [{ type: 'taxonomy', taxonomy: 'category', terms: [] }], exclude: [], include_children: true,
  who: 'plans', plans: [], roles: [], users: [], logged_in_note: '',
  action: 'inherit', redirect: '', custom_message: false, message: '', teaser: 'inherit', in_lists: 'inherit',
};

const SECTIONS = [
  {
    key: 'rule', title: __( 'Rule', 'memberglut' ), icon: faSliders, desc: __( 'Name and priority. Only admins see the name.', 'memberglut' ), fields: [
      { key: 'title', type: 'text', label: __( 'Rule name', 'memberglut' ), placeholder: __( 'e.g. Premium articles', 'memberglut' ) },
      { key: 'status', type: 'radio', label: __( 'Status', 'memberglut' ), options: [{ value: 'active', label: __( 'Active', 'memberglut' ) }, { value: 'inactive', label: __( 'Inactive', 'memberglut' ) }] },
      { key: 'priority', type: 'number', label: __( 'Priority', 'memberglut' ), tip: __( 'When two rules match the same content, the higher number decides.', 'memberglut' ), min: 0, max: 999 },
      { key: 'note', type: 'textarea', label: __( 'Admin note', 'memberglut' ), rows: 2 },
    ],
  },
  {
    key: 'protect', title: __( 'Content to protect', 'memberglut' ), icon: faShieldHalved, desc: __( 'Matches any of the items below.', 'memberglut' ),
    renderTop: ({ values, update }) => (
      <>
        <TargetList value={values.protect} onChange={(v) => update('protect', v)} addLabel={__( 'Add content', 'memberglut' )} empty={__( 'Nothing selected yet.', 'memberglut' )} />
        <div className="mg-fs-subhead" style={{ marginTop: 26 }}>{__( 'Except', 'memberglut' )}<span>{__( 'Leave these open even though they match above, e.g. a free first lesson.', 'memberglut' )}</span></div>
        <TargetList value={values.exclude} onChange={(v) => update('exclude', v)} addLabel={__( 'Add exception', 'memberglut' )} empty={__( 'No exceptions.', 'memberglut' )} />
      </>
    ),
    fields: [
      { key: 'include_children', type: 'switch', label: __( 'Include child pages', 'memberglut' ), tip: __( 'Child pages of a protected page are protected too.', 'memberglut' ) },
    ],
  },
  {
    key: 'access', title: __( 'Who can access', 'memberglut' ), icon: faUserCheck, desc: __( 'Everyone else is shown the action in “What others see”. Administrators always have access.', 'memberglut' ), fields: [
      {
        key: 'who', type: 'cards', label: __( 'Allow', 'memberglut' ), options: [
          { value: 'plans', label: __( 'Members of plans', 'memberglut' ), icon: faLayerGroup, desc: __( 'Active or trialing members.', 'memberglut' ) },
          { value: 'roles', label: __( 'User roles', 'memberglut' ), icon: faUserTag, desc: __( 'Any user with one of the roles.', 'memberglut' ) },
          { value: 'logged_in', label: __( 'Logged-in users', 'memberglut' ), icon: faRightToBracket, desc: __( 'Any account, no plan needed.', 'memberglut' ) },
          { value: 'logged_out', label: __( 'Logged-out visitors', 'memberglut' ), icon: faUserSecret, desc: __( 'e.g. a “join now” landing page.', 'memberglut' ) },
        ],
      },
      { key: 'plans', type: 'multiselect', label: __( 'Plans', 'memberglut' ), options: PLANS.map((p) => ({ value: p.id, label: p.name })), show: (v) => v.who === 'plans' },
      { key: 'roles', type: 'multiselect', label: __( 'Roles', 'memberglut' ), options: ROLES.map((r) => ({ value: r.slug, label: r.name })), show: (v) => v.who === 'roles' },
      { key: 'users', type: 'tags', label: __( 'Also allow these users', 'memberglut' ), tip: __( 'Usernames that always have access, whatever their plan.', 'memberglut' ), placeholder: 'username', show: (v) => v.who !== 'logged_out' },
    ],
  },
  {
    key: 'action', title: __( 'What others see', 'memberglut' ), icon: faEyeSlash, desc: __( 'Leave on “Use global setting” to follow Global Settings › Content restriction.', 'memberglut' ), fields: [
      {
        key: 'action', type: 'cards', label: __( 'Action', 'memberglut' ), options: [
          { value: 'inherit', label: __( 'Use global setting', 'memberglut' ), icon: faSliders },
          { value: 'message', label: __( 'Show a message', 'memberglut' ), icon: faMessage },
          { value: 'login', label: __( 'Show login form', 'memberglut' ), icon: faRightToBracket },
          { value: 'redirect', label: __( 'Redirect', 'memberglut' ), icon: faArrowRightFromBracket },
          { value: 'pricing', label: __( 'Pricing page', 'memberglut' ), icon: faTags },
        ],
      },
      { key: 'redirect', type: 'select', label: __( 'Redirect to', 'memberglut' ), options: PAGES, show: (v) => v.action === 'redirect' },
      { key: 'custom_message', type: 'switch', label: __( 'Custom message for this rule', 'memberglut' ), show: (v) => ['message', 'login', 'inherit'].includes(v.action) },
      { key: 'message', type: 'editor', label: __( 'Message', 'memberglut' ), tip: __( 'Tags: {login_link}, {register_link}, {pricing_link}, {plans}.', 'memberglut' ), show: (v) => v.custom_message && ['message', 'login', 'inherit'].includes(v.action) },
      { key: 'teaser', type: 'select', label: __( 'Teaser', 'memberglut' ), options: [{ value: 'inherit', label: __( 'Use global setting', 'memberglut' ) }, { value: 'none', label: __( 'None', 'memberglut' ) }, { value: 'excerpt', label: __( 'Excerpt', 'memberglut' ) }, { value: 'fade', label: __( 'Excerpt with fade', 'memberglut' ) }], show: (v) => v.action !== 'redirect' && v.action !== 'pricing' },
      { key: 'in_lists', type: 'select', label: __( 'In blog, archives & search', 'memberglut' ), options: [{ value: 'inherit', label: __( 'Use global setting', 'memberglut' ) }, { value: 'show_excerpt', label: __( 'Show with teaser only', 'memberglut' ) }, { value: 'hide', label: __( 'Hide', 'memberglut' ) }] },
    ],
  },
  {
    key: 'test', title: __( 'Test access', 'memberglut' ), icon: faVial, desc: __( 'Check what a user would see on a URL with the rule as it is now (unsaved changes included).', 'memberglut' ),
    render: (ctx) => <AccessTester {...ctx} />,
  },
];

function RuleEditor() {
  const { message } = App.useApp();
  const id = queryArg('id');
  const plan = queryArg('plan');
  const [values, setValues] = useState({ ...NEW_RULE, plans: plan ? [Number(plan)] : [] });
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.getRule(id).then((r) => {
      if (r) setValues({ ...NEW_RULE, ...r, who: r.access.who, plans: r.access.plans, roles: r.access.roles });
    }).finally(() => setLoading(false));
  }, [id]);

  const save = async (v) => {
    if (!v.title.trim()) { message.error(__( 'Give the rule a name.', 'memberglut' )); return false; }
    if (!v.protect.length) { message.error(__( 'Choose the content to protect.', 'memberglut' )); return false; }
    setSaving(true);
    await api.saveRule(v);
    setSaving(false);
    message.success(__( 'Rule saved.', 'memberglut' ));
    return true;
  };

  if (loading) return <div className="mg-loading"><Spin size="large" /></div>;

  return (
    <SettingsPanel
      back={{ href: link('rules'), label: <><FontAwesomeIcon icon={faChevronLeft} /> {__( 'All rules', 'memberglut' )}</> }}
      title={id ? sprintf( __( 'Edit rule: %s', 'memberglut' ), values.title ) : __( 'New content rule', 'memberglut' )}
      subtitle={__( 'Choose what to protect, who may see it, and what everyone else gets.', 'memberglut' )}
      sections={SECTIONS}
      initialSection={id ? 'rule' : 'protect'}
      values={values}
      setValues={setValues}
      onSave={save}
      saving={saving}
      saveLabel={__( 'Save rule', 'memberglut' )}
    />
  );
}

export function RuleEditorPage() {
  return <Page active="rules" wide><RuleEditor /></Page>;
}
