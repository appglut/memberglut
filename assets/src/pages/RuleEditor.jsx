import React, { useEffect, useRef, useState } from 'react';
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
import { L, planOptions, roleOptions, pageOptions } from '../services/lookups';

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

const ARCHIVES = [
  { value: 'front', label: __( 'Front page', 'memberglut' ) }, { value: 'blog', label: __( 'Blog page', 'memberglut' ) },
  { value: 'search', label: __( 'Search results', 'memberglut' ) }, { value: '404', label: __( '404 page', 'memberglut' ) },
  { value: 'author_archive', label: __( 'Author archives', 'memberglut' ) }, { value: 'pt_archive', label: __( 'Post type archives', 'memberglut' ) },
];

/** Labels of selected items, filled from the rule payload and search results. */
const LABELS = { posts: {}, terms: {}, authors: {} };

/** Select that searches the server as you type. */
function AsyncSelect({ value = [], onChange, fetcher, kind, placeholder }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef();
  const run = (q) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLoading(true);
      fetcher(q).then((list) => {
        list.forEach((o) => { LABELS[kind][o.value] = o.label; });
        setOptions(list);
      }).finally(() => setLoading(false));
    }, 250);
  };
  useEffect(() => { run(''); }, [fetcher]);
  const selected = (value || []).map((v) => ({ value: v, label: LABELS[kind][v] || `#${v}` }));
  const merged = [...selected, ...options.filter((o) => !(value || []).includes(o.value))];
  return (
    <Select mode="multiple" value={value} onChange={onChange} filterOption={false} onSearch={run} options={merged}
      notFoundContent={loading ? <Spin size="small" /> : null} placeholder={placeholder} style={{ width: '100%' }} />
  );
}

/** Editor for a list of “what” targets (used for Protect and Exclude). */
function TargetList({ value = [], onChange, addLabel, empty }) {
  const set = (i, patch) => onChange(value.map((t, j) => (j === i ? { ...t, ...patch } : t)));
  const control = (t, i) => {
    switch (t.type) {
      case 'site': return <span className="mg-muted">{__( 'Everything except the login, registration, password, pricing, account and thank-you pages, and Global Settings › public pages.', 'memberglut' )}</span>;
      case 'post_type': return <Select value={t.post_type} onChange={(v) => set(i, { post_type: v })} options={L.post_types} placeholder={__( 'Post type', 'memberglut' )} style={{ width: '100%' }} />;
      case 'pages':
        return <AsyncSelect kind="posts" value={t.posts} onChange={(v) => set(i, { posts: v })} fetcher={(q) => api.searchPosts(q, 'page')} placeholder={__( 'Search pages…', 'memberglut' )} />;
      case 'posts':
        return <AsyncSelect kind="posts" value={t.posts} onChange={(v) => set(i, { posts: v })} fetcher={(q) => api.searchPosts(q, 'any')} placeholder={__( 'Search titles…', 'memberglut' )} />;
      case 'children':
        return <AsyncSelect kind="posts" value={t.posts} onChange={(v) => set(i, { posts: v })} fetcher={(q) => api.searchPosts(q, 'page')} placeholder={__( 'Parent pages…', 'memberglut' )} />;
      case 'taxonomy':
        return (
          <Space.Compact style={{ width: '100%' }}>
            <Select value={t.taxonomy || 'category'} onChange={(v) => set(i, { taxonomy: v, terms: [] })} options={L.taxonomies} style={{ width: 170 }} />
            <div style={{ flex: 1 }}>
              <AsyncSelect key={t.taxonomy || 'category'} kind="terms" value={t.terms} onChange={(v) => set(i, { terms: v })} fetcher={(q) => api.searchTerms(t.taxonomy || 'category', q)} placeholder={__( 'Terms', 'memberglut' )} />
            </div>
          </Space.Compact>
        );
      case 'archive': return <Select mode="multiple" value={t.archives || []} onChange={(v) => set(i, { archives: v })} options={ARCHIVES} style={{ width: '100%' }} />;
      case 'author':
        return <AsyncSelect kind="authors" value={t.authors} onChange={(v) => set(i, { authors: v })} fetcher={(q) => api.searchUsers(q)} placeholder={__( 'Search authors…', 'memberglut' )} />;
      case 'template':
        return L.templates.length
          ? <Select value={t.template} onChange={(v) => set(i, { template: v })} options={L.templates} placeholder={__( 'Template', 'memberglut' )} style={{ width: '100%' }} />
          : <span className="mg-muted">{__( 'Your theme has no custom page templates.', 'memberglut' )}</span>;
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
          <Select value={t.type} onChange={(v) => set(i, { type: v, posts: [], terms: [], authors: [], archives: [] })} options={TARGETS} style={{ width: 230 }} />
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
  const [users, setUsers] = useState([]);
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [checking, setChecking] = useState(false);
  const timer = useRef();
  const search = (q) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => api.searchUsers(q).then(setUsers), 250);
  };
  useEffect(() => { search(''); }, []);
  const check = async () => {
    setChecking(true);
    try {
      const r = await api.testRule({ rule: values, user, url });
      setResult({ type: r.allowed ? 'success' : 'warning', text: r.text });
    } catch (e) {
      setResult({ type: 'error', text: e.message });
    } finally { setChecking(false); }
  };
  return (
    <div className="mg-fs-block">
      <div className="mg-tester">
        <Select showSearch filterOption={false} onSearch={search} value={user} onChange={setUser} style={{ width: 260 }}
          options={[{ value: 'guest', label: __( 'A logged-out visitor', 'memberglut' ) }, ...users]} />
        <Input value={url} onChange={(e) => setUrl(e.target.value)} onPressEnter={check} addonBefore={__( 'URL', 'memberglut' )} placeholder={`${L.site.url}…`} />
        <Button type="primary" loading={checking} disabled={!url} onClick={check}>{__( 'Check', 'memberglut' )}</Button>
      </div>
      {result && <Alert style={{ marginTop: 14 }} showIcon type={result.type} message={result.text} />}
    </div>
  );
}

const NEW_RULE = {
  title: '', status: 'active', priority: 10, note: '',
  protect: [{ type: 'taxonomy', taxonomy: 'category', terms: [] }], exclude: [], include_children: true,
  who: 'plans', plans: [], roles: [], users: [],
  action: 'inherit', redirect: 0, custom_message: false, message: '', teaser: 'inherit', in_lists: 'inherit',
};

const GLOBAL_ACTION = { message: __( 'Show a message', 'memberglut' ), login: __( 'Show login form', 'memberglut' ), redirect: __( 'Redirect', 'memberglut' ), pricing: __( 'Pricing page', 'memberglut' ) };

const SECTIONS = [
  {
    key: 'rule', title: __( 'Rule', 'memberglut' ), icon: faSliders, desc: __( 'Name and priority. Only admins see the name.', 'memberglut' ), fields: [
      { key: 'title', type: 'text', label: __( 'Rule name', 'memberglut' ), placeholder: __( 'e.g. Premium articles', 'memberglut' ) },
      { key: 'status', type: 'radio', label: __( 'Status', 'memberglut' ), options: [{ value: 'active', label: __( 'Active', 'memberglut' ) }, { value: 'inactive', label: __( 'Inactive', 'memberglut' ) }] },
      { key: 'priority', type: 'number', label: __( 'Priority', 'memberglut' ), tip: __( 'When two rules match the same content, the higher number decides. Settings made on a post itself always win.', 'memberglut' ), min: 0, max: 999 },
      { key: 'note', type: 'textarea', label: __( 'Admin note', 'memberglut' ), rows: 2 },
    ],
  },
  {
    key: 'protect', title: __( 'Content to protect', 'memberglut' ), icon: faShieldHalved, desc: __( 'Matches any of the items below.', 'memberglut' ), errorKeys: ['protect', 'exclude'],
    renderTop: ({ values, update, errors }) => (
      <>
        <TargetList value={values.protect} onChange={(v) => update('protect', v)} addLabel={__( 'Add content', 'memberglut' )} empty={__( 'Nothing selected yet.', 'memberglut' )} />
        {errors.protect && <div className="mg-fs-error">{errors.protect}</div>}
        <div className="mg-fs-subhead" style={{ marginTop: 26 }}>{__( 'Except', 'memberglut' )}<span>{__( 'Leave these open even though they match above, e.g. a free first lesson.', 'memberglut' )}</span></div>
        <TargetList value={values.exclude} onChange={(v) => update('exclude', v)} addLabel={__( 'Add exception', 'memberglut' )} empty={__( 'No exceptions.', 'memberglut' )} />
        {errors.exclude && <div className="mg-fs-error">{errors.exclude}</div>}
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
          { value: 'plans', label: __( 'Members of plans', 'memberglut' ), icon: faLayerGroup, desc: __( 'Active, trialing or canceled-but-not-ended members.', 'memberglut' ) },
          { value: 'roles', label: __( 'User roles', 'memberglut' ), icon: faUserTag, desc: __( 'Any user with one of the roles.', 'memberglut' ) },
          { value: 'logged_in', label: __( 'Logged-in users', 'memberglut' ), icon: faRightToBracket, desc: __( 'Any account, no plan needed.', 'memberglut' ) },
          { value: 'logged_out', label: __( 'Logged-out visitors', 'memberglut' ), icon: faUserSecret, desc: __( 'e.g. a “join now” landing page.', 'memberglut' ) },
        ],
      },
      { key: 'plans', type: 'multiselect', label: __( 'Plans', 'memberglut' ), options: planOptions(), show: (v) => v.who === 'plans' },
      { key: 'roles', type: 'multiselect', label: __( 'Roles', 'memberglut' ), options: roleOptions(), show: (v) => v.who === 'roles' },
      { key: 'users', type: 'tags', label: __( 'Also allow these users', 'memberglut' ), tip: __( 'Usernames that always have access, whatever their plan.', 'memberglut' ), placeholder: 'username', show: (v) => v.who !== 'logged_out' },
    ],
  },
  {
    key: 'action', title: __( 'What others see', 'memberglut' ), icon: faEyeSlash, desc: __( 'Leave on “Use global setting” to follow Global Settings › Content restriction.', 'memberglut' ), fields: [
      {
        key: 'action', type: 'cards', label: __( 'Action', 'memberglut' ), options: [
          { value: 'inherit', label: __( 'Use global setting', 'memberglut' ), icon: faSliders, desc: GLOBAL_ACTION[(L.settings_global || {}).action] },
          { value: 'message', label: __( 'Show a message', 'memberglut' ), icon: faMessage },
          { value: 'login', label: __( 'Show login form', 'memberglut' ), icon: faRightToBracket },
          { value: 'redirect', label: __( 'Redirect', 'memberglut' ), icon: faArrowRightFromBracket },
          { value: 'pricing', label: __( 'Pricing page', 'memberglut' ), icon: faTags, desc: __( 'Returns here after joining.', 'memberglut' ) },
        ],
      },
      { key: 'redirect', type: 'select', label: __( 'Redirect to', 'memberglut' ), options: pageOptions(), show: (v) => v.action === 'redirect' },
      { key: 'custom_message', type: 'switch', label: __( 'Custom message for this rule', 'memberglut' ), tip: __( 'Replaces both global messages (visitors and logged-in users).', 'memberglut' ), show: (v) => ['message', 'login', 'inherit'].includes(v.action) },
      { key: 'message', type: 'editor', label: __( 'Message', 'memberglut' ), tip: __( 'HTML allowed. Tags: {login_link}, {register_link}, {pricing_link}, {post_title}, {plans}.', 'memberglut' ), show: (v) => v.custom_message && ['message', 'login', 'inherit'].includes(v.action) },
      { key: 'teaser', type: 'select', label: __( 'Teaser', 'memberglut' ), options: [{ value: 'inherit', label: __( 'Use global setting', 'memberglut' ) }, { value: 'none', label: __( 'None', 'memberglut' ) }, { value: 'excerpt', label: __( 'Excerpt', 'memberglut' ) }, { value: 'fade', label: __( 'Excerpt with fade', 'memberglut' ) }], show: (v) => v.action !== 'redirect' && v.action !== 'pricing' },
      { key: 'in_lists', type: 'select', label: __( 'In blog, archives & search', 'memberglut' ), options: [{ value: 'inherit', label: __( 'Use global setting', 'memberglut' ) }, { value: 'show_excerpt', label: __( 'Show with teaser only', 'memberglut' ) }, { value: 'hide', label: __( 'Hide', 'memberglut' ) }, { value: 'show', label: __( 'Show normally (still locked on the post)', 'memberglut' ) }] },
    ],
  },
  {
    key: 'test', title: __( 'Test access', 'memberglut' ), icon: faVial, desc: __( 'Check what a user would see on a URL with the rule as it is now (unsaved changes included).', 'memberglut' ),
    render: (ctx) => <AccessTester {...ctx} />,
  },
];

function RuleEditor() {
  const { message } = App.useApp();
  const id = Number(queryArg('id')) || 0;
  const plan = Number(queryArg('plan')) || 0;
  const [values, setValues] = useState({ ...NEW_RULE, plans: plan ? [plan] : [] });
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!id) return;
    api.getRule(id).then((r) => {
      ['posts', 'terms', 'authors'].forEach((k) => Object.assign(LABELS[k], (r.labels || {})[k] || {}));
      setValues({ ...NEW_RULE, ...r });
    }).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  }, []);

  const save = async (v) => {
    setSaving(true);
    try {
      const saved = await api.saveRule({ ...v, id: id || undefined });
      setErrors({});
      message.success(__( 'Rule saved.', 'memberglut' ));
      if (!id) {
        window.location.href = link('rule_editor', { id: saved.id });
      } else {
        setValues({ ...NEW_RULE, ...saved });
      }
      return true;
    } catch (e) {
      setErrors(e.fields || {});
      message.error(e.message);
      return false;
    } finally { setSaving(false); }
  };

  if (loading) return <div className="mg-loading"><Spin size="large" /></div>;

  // Errors are also given to renderTop through ctx.
  const sections = SECTIONS.map((s) => (s.renderTop ? { ...s, renderTop: (ctx) => s.renderTop({ ...ctx, errors }) } : s));

  return (
    <SettingsPanel
      back={{ href: link('rules'), label: <><FontAwesomeIcon icon={faChevronLeft} /> {__( 'All rules', 'memberglut' )}</> }}
      title={id ? sprintf( __( 'Edit rule: %s', 'memberglut' ), values.title ) : __( 'New content rule', 'memberglut' )}
      subtitle={__( 'Choose what to protect, who may see it, and what everyone else gets.', 'memberglut' )}
      sections={sections}
      initialSection={queryArg('tab') || (id ? 'rule' : 'protect')}
      values={values}
      setValues={setValues}
      onSave={save}
      saving={saving}
      errors={errors}
      saveLabel={__( 'Save rule', 'memberglut' )}
    />
  );
}

export function RuleEditorPage() {
  return <Page active="rules" wide><RuleEditor /></Page>;
}
