import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { App, Table, Button, Switch, Tag, Popconfirm, Input, Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faPenToSquare, faCopy, faTrashCan, faMagnifyingGlass, faGlobe, faFileLines, faFolderTree, faLink,
  faCubes, faBars, faCode, faUserLock, faRightToBracket, faArrowRightFromBracket, faMessage, faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';
import Page, { PageHeader, StatCard } from '../components/Page';
import { link } from '../components/adminData';
import * as api from '../services/api';
import { fromNow } from '../services/format';
import { PLANS } from '../services/demoData';

export const PROTECT_LABEL = {
  site: [faGlobe, __( 'Whole site', 'memberglut' )],
  post_type: [faFileLines, __( 'All of a post type', 'memberglut' )],
  pages: [faFileLines, __( 'Specific pages', 'memberglut' )],
  posts: [faFileLines, __( 'Specific posts', 'memberglut' )],
  taxonomy: [faFolderTree, __( 'Category / tag', 'memberglut' )],
  url: [faLink, __( 'URL pattern', 'memberglut' )],
};

const ACTION_LABEL = {
  message: [faMessage, __( 'Show message', 'memberglut' )],
  login: [faRightToBracket, __( 'Login form', 'memberglut' )],
  redirect: [faArrowRightFromBracket, __( 'Redirect', 'memberglut' )],
  pricing: [faArrowRightFromBracket, __( 'Pricing page', 'memberglut' )],
};

export function protectSummary(p) {
  if (p.type === 'taxonomy') return `${p.taxonomy}: ${p.terms.join(', ')}`;
  if (p.type === 'post_type') return p.post_type;
  if (p.type === 'url') return p.pattern;
  if (p.posts) return p.posts.join(', ');
  return PROTECT_LABEL[p.type]?.[1];
}

function whoSummary(a) {
  if (a.who === 'logged_in') return <Tag bordered={false}>{__( 'Any logged-in user', 'memberglut' )}</Tag>;
  if (a.who === 'logged_out') return <Tag bordered={false}>{__( 'Logged-out visitors', 'memberglut' )}</Tag>;
  if (a.who === 'roles') return a.roles.map((r) => <Tag key={r} bordered={false} color="blue">{r}</Tag>);
  return a.plans.map((id) => {
    const p = PLANS.find((x) => x.id === id);
    return <span key={id} className="mg-plan-pill" style={{ '--c': p?.color }}>{p?.name}</span>;
  });
}

const PER_POST = [
  { id: 41, title: 'Ultimate Productivity Guide (PDF)', type: 'page', access: 'Gold, Lifetime', action: 'Redirect to pricing' },
  { id: 52, title: 'Live Q&A — March recording', type: 'post', access: 'Silver, Gold', action: 'Message + excerpt' },
  { id: 63, title: 'Members Lounge', type: 'page', access: 'Logged-in users', action: 'Login form' },
];

function ContentRules() {
  const { message } = App.useApp();
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { api.getRules().then(setRules).finally(() => setLoading(false)); }, []);

  const columns = [
    {
      title: __( 'Rule', 'memberglut' ), dataIndex: 'title', render: (v, r) => (
        <div>
          <a href={link('rule_editor', { id: r.id })} className="mg-strong-link">{v}</a>
          <div className="mg-protect-list">
            {r.protect.map((p, i) => <span key={i}><FontAwesomeIcon icon={PROTECT_LABEL[p.type][0]} /> {protectSummary(p)}</span>)}
            {r.exclude.length > 0 && <span className="ex">{sprintf( __( 'except %s', 'memberglut' ), r.exclude.map(protectSummary).join(', ') )}</span>}
          </div>
          <div className="mg-row-actions">
            <a href={link('rule_editor', { id: r.id })}><FontAwesomeIcon icon={faPenToSquare} /> {__( 'Edit', 'memberglut' )}</a>
            <span className="mg-action-sep">|</span>
            <a onClick={() => message.success(__( 'Rule duplicated.', 'memberglut' ))}><FontAwesomeIcon icon={faCopy} /> {__( 'Duplicate', 'memberglut' )}</a>
            <span className="mg-action-sep">|</span>
            <Popconfirm title={__( 'Delete this rule?', 'memberglut' )} description={__( 'The content becomes public again unless another rule protects it.', 'memberglut' )} okButtonProps={{ danger: true }} onConfirm={() => setRules(rules.filter((x) => x.id !== r.id))}>
              <a className="mg-action-delete"><FontAwesomeIcon icon={faTrashCan} /> {__( 'Delete', 'memberglut' )}</a>
            </Popconfirm>
          </div>
        </div>
      ),
    },
    { title: __( 'Who can access', 'memberglut' ), render: (v, r) => <div className="mg-tag-wrap">{whoSummary(r.access)}</div> },
    { title: __( 'Others see', 'memberglut' ), dataIndex: 'action', render: (v) => <span className="mg-muted"><FontAwesomeIcon icon={ACTION_LABEL[v][0]} /> {ACTION_LABEL[v][1]}</span> },
    { title: __( 'Priority', 'memberglut' ), dataIndex: 'priority', align: 'center', sorter: (a, b) => a.priority - b.priority },
    { title: __( 'Updated', 'memberglut' ), dataIndex: 'updated', render: fromNow },
    { title: __( 'Active', 'memberglut' ), dataIndex: 'status', align: 'center', render: (v, r) => <Switch size="small" checked={v === 'active'} onChange={(on) => setRules(rules.map((x) => (x.id === r.id ? { ...x, status: on ? 'active' : 'inactive' } : x)))} /> },
  ];

  const filtered = rules.filter((r) => !search || r.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <PageHeader
        title={__( 'Content Rules', 'memberglut' )}
        subtitle={__( 'Lock posts, pages, categories, post types or URLs to plans, roles or logged-in users.', 'memberglut' )}
        actions={<Button size="large" type="primary" icon={<FontAwesomeIcon icon={faPlus} />} href={link('rule_editor')}>{__( 'New rule', 'memberglut' )}</Button>}
      />

      <div className="mg-stats-row">
        <StatCard icon={<FontAwesomeIcon icon={faShieldHalved} />} label={__( 'Active rules', 'memberglut' )} value={rules.filter((r) => r.status === 'active').length} />
        <StatCard icon={<FontAwesomeIcon icon={faFileLines} />} label={__( 'Protected posts & pages', 'memberglut' )} value="148" hint={__( 'by rules + per-post settings', 'memberglut' )} />
        <StatCard icon={<FontAwesomeIcon icon={faUserLock} />} label={__( 'Blocked views (7 days)', 'memberglut' )} value="2,317" hint={__( 'visitors who saw a paywall', 'memberglut' )} />
        <StatCard icon={<FontAwesomeIcon icon={faRightToBracket} />} label={__( 'Joined after a paywall', 'memberglut' )} value="38" hint={__( '1.6% conversion', 'memberglut' )} trend="up" />
      </div>

      <div className="mg-table-wrap mg-tabs-wrap">
        <Tabs items={[
          {
            key: 'rules', label: __( 'Rules', 'memberglut' ), children: (
              <>
                <div className="mg-table-toolbar">
                  <div className="mg-table-toolbar-left">
                    <Input allowClear prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />} placeholder={__( 'Search rules…', 'memberglut' )} value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 280 }} />
                  </div>
                  <div className="mg-table-toolbar-right mg-muted">{__( 'When rules overlap, the one with the higher priority decides.', 'memberglut' )}</div>
                </div>
                <Table rowKey="id" loading={loading} columns={columns} dataSource={filtered} pagination={false} />
              </>
            ),
          },
          {
            key: 'posts', label: __( 'Locked one by one', 'memberglut' ), children: (
              <>
                <div className="mg-fs-note" style={{ margin: '16px 20px' }}>{__( 'Posts and pages locked from the MemberGlut box in the post editor. These settings win over rules.', 'memberglut' )}</div>
                <Table rowKey="id" pagination={false} dataSource={PER_POST} columns={[
                  { title: __( 'Title', 'memberglut' ), dataIndex: 'title', render: (v, r) => <><a href={`post.php?post=${r.id}&action=edit`} className="mg-strong-link">{v}</a> <Tag bordered={false}>{r.type}</Tag></> },
                  { title: __( 'Who can access', 'memberglut' ), dataIndex: 'access' },
                  { title: __( 'Others see', 'memberglut' ), dataIndex: 'action', render: (v) => <span className="mg-muted">{v}</span> },
                  { title: '', align: 'right', render: (v, r) => <a href={`post.php?post=${r.id}&action=edit`}>{__( 'Edit post', 'memberglut' )}</a> },
                ]} />
              </>
            ),
          },
        ]} />
      </div>

      <div className="mg-tool-grid">
        {[
          [faCubes, __( 'Blocks', 'memberglut' ), __( 'Every block has a “Membership visibility” panel: show it to plans, roles, logged-in or logged-out users.', 'memberglut' )],
          [faBars, __( 'Menus', 'memberglut' ), __( 'In Appearance › Menus, each item can be shown only to certain plans or roles.', 'memberglut' )],
          [faCode, __( 'Shortcode', 'memberglut' ), <>{__( 'Lock part of a post:', 'memberglut' )} <code>[memberglut_restrict plans="2,3"]…[/memberglut_restrict]</code></>],
        ].map(([icon, t, d]) => (
          <div key={t} className="mg-tool-tile">
            <span className="ic"><FontAwesomeIcon icon={icon} /></span>
            <div><b>{t}</b><p>{d}</p></div>
          </div>
        ))}
      </div>
    </>
  );
}

export function ContentRulesPage() {
  return <Page active="rules"><ContentRules /></Page>;
}
