import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { App, Table, Button, Switch, Popconfirm, Tooltip, Segmented, Tag } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faPenToSquare, faCopy, faLink, faTrashCan, faArrowRight, faTableList, faTableCellsLarge, faStar, faUsers,
} from '@fortawesome/free-solid-svg-icons';
import Page, { PageHeader } from '../components/Page';
import { link, _siteUrl } from '../components/adminData';
import * as api from '../services/api';
import { money, planPrice, planDuration } from '../services/format';

function Plans() {
  const { message } = App.useApp();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [view, setView] = useState('table');

  useEffect(() => { api.getPlans().then(setPlans).finally(() => setLoading(false)); }, []);

  const toggle = (p, on) => {
    setPlans(plans.map((x) => (x.id === p.id ? { ...x, status: on ? 'active' : 'inactive' } : x)));
    message.success(on ? __( 'Plan is active and can be bought.', 'memberglut' ) : __( 'Plan hidden. Current members keep it.', 'memberglut' ));
  };
  const copyLink = (p) => {
    navigator.clipboard?.writeText(`${_siteUrl || 'https://yoursite.com'}/register/?plan=${p.slug}`);
    message.success(__( 'Signup link copied.', 'memberglut' ));
  };

  const rows = plans.filter((p) => !filter || p.status === filter);
  const groups = [...new Set(plans.map((p) => p.group))];

  const actions = (p) => (
    <div className="mg-row-actions">
      <a href={link('plan_editor', { id: p.id })}><FontAwesomeIcon icon={faPenToSquare} /> {__( 'Edit', 'memberglut' )}</a>
      <span className="mg-action-sep">|</span>
      <a onClick={() => message.success(__( 'Plan duplicated.', 'memberglut' ))}><FontAwesomeIcon icon={faCopy} /> {__( 'Duplicate', 'memberglut' )}</a>
      <span className="mg-action-sep">|</span>
      <a onClick={() => copyLink(p)}><FontAwesomeIcon icon={faLink} /> {__( 'Signup link', 'memberglut' )}</a>
      <span className="mg-action-sep">|</span>
      <Popconfirm
        title={__( 'Delete this plan?', 'memberglut' )}
        description={p.members ? sprintf( __( '%d members have it. Make it inactive instead to keep them.', 'memberglut' ), p.members ) : __( 'This cannot be undone.', 'memberglut' )}
        okButtonProps={{ danger: true, disabled: p.members > 0 }}
        onConfirm={() => setPlans(plans.filter((x) => x.id !== p.id))}
      >
        <a className="mg-action-delete"><FontAwesomeIcon icon={faTrashCan} /> {__( 'Delete', 'memberglut' )}</a>
      </Popconfirm>
    </div>
  );

  const columns = [
    {
      title: __( 'Plan', 'memberglut' ), dataIndex: 'name', render: (v, p) => (
        <div className="mg-plan-cell">
          <span className="mg-plan-dot" style={{ background: p.color }} />
          <div>
            <a href={link('plan_editor', { id: p.id })} className="mg-strong-link">{v}</a>
            {p.featured && <Tag color="gold" bordered={false} style={{ marginLeft: 8 }}><FontAwesomeIcon icon={faStar} /> {__( 'Featured', 'memberglut' )}</Tag>}
            <div className="mg-muted">{p.description}</div>
            {actions(p)}
          </div>
        </div>
      ),
    },
    { title: __( 'Price', 'memberglut' ), dataIndex: 'price', render: (v, p) => <><b>{planPrice(p)}</b>{p.trial && <div className="mg-muted">{__( 'Free trial', 'memberglut' )}</div>}{p.signup_fee > 0 && <div className="mg-muted">+ {money(p.signup_fee)} {__( 'sign-up fee', 'memberglut' )}</div>}</> },
    { title: __( 'Access length', 'memberglut' ), render: (v, p) => (p.billing === 'recurring' ? __( 'Until canceled', 'memberglut' ) : planDuration(p)) },
    { title: __( 'Role', 'memberglut' ), dataIndex: 'role', render: (v) => <Tag bordered={false}>{v}</Tag> },
    { title: __( 'Members', 'memberglut' ), dataIndex: 'members', align: 'right', render: (v, p) => <a href={link('members', { plan: p.id })}>{v}</a> },
    { title: __( 'Revenue', 'memberglut' ), dataIndex: 'revenue', align: 'right', render: (v) => money(v) },
    { title: __( 'Active', 'memberglut' ), dataIndex: 'status', align: 'center', render: (v, p) => <Switch size="small" checked={v === 'active'} onChange={(on) => toggle(p, on)} /> },
  ];

  return (
    <>
      <PageHeader
        title={__( 'Membership Plans', 'memberglut' )}
        subtitle={__( 'What people can buy or join. Each plan sets a price, how long access lasts and the role members get.', 'memberglut' )}
        actions={<Button size="large" type="primary" icon={<FontAwesomeIcon icon={faPlus} />} href={link('plan_editor')}>{__( 'New plan', 'memberglut' )}</Button>}
      />

      {groups.map((g) => (
        <div key={g} className="mg-path-card">
          <div className="mg-path-title">{sprintf( __( 'Upgrade path · %s group', 'memberglut' ), g )}<span>{__( 'Members can move up or down this path from their account. Change the order in each plan’s “Upgrades” tab.', 'memberglut' )}</span></div>
          <div className="mg-path">
            {plans.filter((p) => p.group === g).sort((a, b) => a.tier - b.tier).map((p, i, arr) => (
              <React.Fragment key={p.id}>
                <a href={link('plan_editor', { id: p.id, tab: 'upgrades' })} className={`mg-path-step ${p.status !== 'active' ? 'off' : ''}`} style={{ '--c': p.color }}>
                  <b>{p.name}</b><span>{planPrice(p)}</span>
                </a>
                {i < arr.length - 1 && <FontAwesomeIcon icon={faArrowRight} className="mg-path-arrow" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}

      <div className="mg-list-bar">
        <div className="mg-filter-tabs" style={{ marginBottom: 0 }}>
          {[['', __( 'All', 'memberglut' ), plans.length], ['active', __( 'Active', 'memberglut' ), plans.filter((p) => p.status === 'active').length], ['inactive', __( 'Inactive', 'memberglut' ), plans.filter((p) => p.status !== 'active').length]].map(([k, l, n]) => (
            <button key={k || 'all'} type="button" className={`mg-filter-tab ${filter === k ? 'active' : ''}`} onClick={() => setFilter(k)}>{l} <span className="mg-filter-count">{n}</span></button>
          ))}
        </div>
        <Segmented value={view} onChange={setView} options={[{ value: 'table', icon: <FontAwesomeIcon icon={faTableList} /> }, { value: 'cards', icon: <FontAwesomeIcon icon={faTableCellsLarge} /> }]} />
      </div>

      {view === 'table' ? (
        <div className="mg-table-wrap">
          <Table rowKey="id" loading={loading} columns={columns} dataSource={rows} pagination={false} />
        </div>
      ) : (
        <div className="mg-plan-grid">
          {rows.map((p) => (
            <div key={p.id} className={`mg-plan-tile ${p.status !== 'active' ? 'off' : ''}`} style={{ '--c': p.color }}>
              {p.featured && <span className="mg-plan-ribbon">{__( 'Featured', 'memberglut' )}</span>}
              <div className="mg-plan-tile-name">{p.name}</div>
              <div className="mg-plan-tile-price">{planPrice(p)}</div>
              <div className="mg-muted">{p.description}</div>
              <div className="mg-plan-tile-stats">
                <span><FontAwesomeIcon icon={faUsers} /> {p.members}</span>
                <span>{money(p.revenue)}</span>
                <Tooltip title={__( 'Active', 'memberglut' )}><Switch size="small" checked={p.status === 'active'} onChange={(on) => toggle(p, on)} /></Tooltip>
              </div>
              {actions(p)}
            </div>
          ))}
          <a className="mg-plan-tile mg-plan-tile-new" href={link('plan_editor')}><FontAwesomeIcon icon={faPlus} /><span>{__( 'New plan', 'memberglut' )}</span></a>
        </div>
      )}
    </>
  );
}

export function PlansPage() {
  return <Page active="plans"><Plans /></Page>;
}
