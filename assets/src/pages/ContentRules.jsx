import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { App, Table, Button, Switch, Tag, Popconfirm, Input, Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faPenToSquare, faCopy, faTrashCan, faMagnifyingGlass, faGlobe, faFileLines, faFolderTree, faLink,
  faCubes, faBars, faCode, faUserLock, faRightToBracket, faArrowRightFromBracket, faMessage, faShieldHalved,
  faBoxArchive, faUserPen, faTableColumns, faSliders,
} from '@fortawesome/free-solid-svg-icons';
import Page, { PageHeader, StatCard } from '../components/Page';
import { link } from '../components/adminData';
import * as api from '../services/api';
import { fromNow } from '../services/format';
import { L, planById, roleName } from '../services/lookups';

export const PROTECT_ICON = {
  site: faGlobe, post_type: faFileLines, pages: faFileLines, posts: faFileLines, children: faFileLines,
  taxonomy: faFolderTree, archive: faBoxArchive, author: faUserPen, template: faTableColumns, url: faLink,
};

const ACTION_LABEL = {
  message: [faMessage, __( 'Show message', 'memberglut' )],
  login: [faRightToBracket, __( 'Login form', 'memberglut' )],
  redirect: [faArrowRightFromBracket, __( 'Redirect', 'memberglut' )],
  pricing: [faArrowRightFromBracket, __( 'Pricing page', 'memberglut' )],
};

function actionCell(v) {
  if (v === 'inherit') {
    const g = ACTION_LABEL[(L.settings_global || {}).action] || ACTION_LABEL.message;
    return <span className="mg-muted"><FontAwesomeIcon icon={faSliders} /> {sprintf( __( 'Global: %s', 'memberglut' ), g[1] )}</span>;
  }
  const a = ACTION_LABEL[v] || ACTION_LABEL.message;
  return <span className="mg-muted"><FontAwesomeIcon icon={a[0]} /> {a[1]}</span>;
}

function whoSummary(r) {
  if (r.who === 'logged_in') return <Tag bordered={false}>{__( 'Any logged-in user', 'memberglut' )}</Tag>;
  if (r.who === 'logged_out') return <Tag bordered={false}>{__( 'Logged-out visitors', 'memberglut' )}</Tag>;
  if (r.who === 'roles') return r.roles.map((x) => <Tag key={x} bordered={false} color="blue">{roleName(x)}</Tag>);
  return r.plans.map((id) => {
    const p = planById(id);
    return <span key={id} className="mg-plan-pill" style={{ '--c': p ? p.color : '#94a3b8' }}>{p ? p.name : `#${id}`}</span>;
  });
}

function ContentRules() {
  const { message } = App.useApp();
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState(null);
  const [perPost, setPerPost] = useState(null);

  const load = () => api.getRules({ search }).then(setRules).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  useEffect(() => { const t = setTimeout(load, search ? 300 : 0); return () => clearTimeout(t); }, [search]);
  useEffect(() => { api.getRuleStats().then(setStats).catch(() => {}); }, []);

  const toggle = async (r, on) => {
    try {
      const n = await api.setRuleStatus(r.id, on ? 'active' : 'inactive');
      setRules(rules.map((x) => (x.id === r.id ? { ...x, status: n.status } : x)));
    } catch (e) { message.error(e.message); }
  };
  const duplicate = async (r) => {
    try { await api.duplicateRule(r.id); message.success(__( 'Rule duplicated (inactive).', 'memberglut' )); load(); } catch (e) { message.error(e.message); }
  };
  const remove = async (r) => {
    try { await api.deleteRule(r.id); setRules(rules.filter((x) => x.id !== r.id)); message.success(__( 'Rule deleted.', 'memberglut' )); } catch (e) { message.error(e.message); }
  };

  const columns = [
    {
      title: __( 'Rule', 'memberglut' ), dataIndex: 'title', render: (v, r) => (
        <div>
          <a href={link('rule_editor', { id: r.id })} className="mg-strong-link">{v}</a>
          <div className="mg-protect-list">
            {r.protect.map((p, i) => <span key={i}><FontAwesomeIcon icon={PROTECT_ICON[p.type] || faFileLines} /> {r.summary.protect[i]}</span>)}
            {r.exclude.length > 0 && <span className="ex">{sprintf( __( 'except %s', 'memberglut' ), r.summary.exclude.join(', ') )}</span>}
          </div>
          <div className="mg-row-actions">
            <a href={link('rule_editor', { id: r.id })}><FontAwesomeIcon icon={faPenToSquare} /> {__( 'Edit', 'memberglut' )}</a>
            <span className="mg-action-sep">|</span>
            <a onClick={() => duplicate(r)}><FontAwesomeIcon icon={faCopy} /> {__( 'Duplicate', 'memberglut' )}</a>
            <span className="mg-action-sep">|</span>
            <Popconfirm title={__( 'Delete this rule?', 'memberglut' )} description={__( 'The content becomes public again unless another rule protects it.', 'memberglut' )} okButtonProps={{ danger: true }} onConfirm={() => remove(r)}>
              <a className="mg-action-delete"><FontAwesomeIcon icon={faTrashCan} /> {__( 'Delete', 'memberglut' )}</a>
            </Popconfirm>
          </div>
        </div>
      ),
    },
    { title: __( 'Who can access', 'memberglut' ), render: (v, r) => <div className="mg-tag-wrap">{whoSummary(r)}</div> },
    { title: __( 'Others see', 'memberglut' ), dataIndex: 'action', render: actionCell },
    { title: __( 'Priority', 'memberglut' ), dataIndex: 'priority', align: 'center', sorter: (a, b) => a.priority - b.priority },
    { title: __( 'Updated', 'memberglut' ), dataIndex: 'updated', render: fromNow },
    { title: __( 'Active', 'memberglut' ), dataIndex: 'status', align: 'center', render: (v, r) => <Switch size="small" checked={v === 'active'} onChange={(on) => toggle(r, on)} /> },
  ];

  return (
    <>
      <PageHeader
        title={__( 'Content Rules', 'memberglut' )}
        subtitle={__( 'Lock posts, pages, categories, post types or URLs to plans, roles or logged-in users.', 'memberglut' )}
        actions={<Button size="large" type="primary" icon={<FontAwesomeIcon icon={faPlus} />} href={link('rule_editor')}>{__( 'New rule', 'memberglut' )}</Button>}
      />

      <div className="mg-stats-row">
        <StatCard icon={<FontAwesomeIcon icon={faShieldHalved} />} label={__( 'Active rules', 'memberglut' )} value={stats ? stats.active : '…'} />
        <StatCard icon={<FontAwesomeIcon icon={faFileLines} />} label={__( 'Protected posts & pages', 'memberglut' )} value={stats ? stats.protected.toLocaleString() : '…'} hint={__( 'by rules + per-post settings', 'memberglut' )} />
        <StatCard icon={<FontAwesomeIcon icon={faUserLock} />} label={__( 'Blocked views (7 days)', 'memberglut' )} value={stats ? stats.views.toLocaleString() : '…'} hint={__( 'visitors who saw a paywall', 'memberglut' )} />
        <StatCard icon={<FontAwesomeIcon icon={faRightToBracket} />} label={__( 'Joined after a paywall', 'memberglut' )} value={stats ? stats.conversions : '…'} hint={stats ? sprintf( __( '%s%% conversion', 'memberglut' ), stats.rate ) : ''} trend="up" />
      </div>

      <div className="mg-table-wrap mg-tabs-wrap">
        <Tabs onChange={(k) => { if (k === 'posts' && !perPost) api.getPerPostRules().then(setPerPost).catch(() => setPerPost([])); }} items={[
          {
            key: 'rules', label: __( 'Rules', 'memberglut' ), children: (
              <>
                <div className="mg-table-toolbar">
                  <div className="mg-table-toolbar-left">
                    <Input allowClear prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />} placeholder={__( 'Search rules…', 'memberglut' )} value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: 280 }} />
                  </div>
                  <div className="mg-table-toolbar-right mg-muted">{__( 'When rules overlap, the one with the higher priority decides.', 'memberglut' )}</div>
                </div>
                <Table rowKey="id" loading={loading} columns={columns} dataSource={rules} pagination={false} locale={{ emptyText: __( 'No rules yet. Create one to protect content.', 'memberglut' ) }} />
              </>
            ),
          },
          {
            key: 'posts', label: __( 'Locked one by one', 'memberglut' ), children: (
              <>
                <div className="mg-fs-note" style={{ margin: '16px 20px' }}>{__( 'Posts and pages with their own settings in the MemberGlut access box of the post editor. These settings win over rules.', 'memberglut' )}</div>
                <Table rowKey="id" pagination={{ pageSize: 20 }} loading={perPost === null} dataSource={perPost || []} locale={{ emptyText: __( 'No post has its own access settings.', 'memberglut' ) }} columns={[
                  { title: __( 'Title', 'memberglut' ), dataIndex: 'title', render: (v, r) => <><a href={r.edit_url} className="mg-strong-link">{v}</a> <Tag bordered={false}>{r.type}</Tag>{r.status !== 'publish' && <Tag bordered={false}>{r.status}</Tag>}</> },
                  { title: __( 'Who can access', 'memberglut' ), dataIndex: 'access' },
                  { title: __( 'Others see', 'memberglut' ), dataIndex: 'action', render: (v) => <span className="mg-muted">{v}</span> },
                  { title: '', align: 'right', render: (v, r) => <><a href={r.view_url} target="_blank" rel="noreferrer">{__( 'View', 'memberglut' )}</a> · <a href={r.edit_url}>{__( 'Edit post', 'memberglut' )}</a></> },
                ]} />
              </>
            ),
          },
        ]} />
      </div>

      <div className="mg-tool-grid">
        {[
          [faCubes, __( 'Blocks', 'memberglut' ), __( 'Every block has a “Membership visibility” panel: show it to plans, roles, logged-in or logged-out users, or hide it from them.', 'memberglut' )],
          [faBars, __( 'Menus', 'memberglut' ), __( 'In Appearance › Menus, each item can be shown only to certain plans or roles. Navigation blocks use the block panel.', 'memberglut' )],
          [faCode, __( 'Shortcode', 'memberglut' ), <>{__( 'Lock part of a post:', 'memberglut' )} <code>[memberglut_restrict plans="gold"]…[/memberglut_restrict]</code></>],
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
