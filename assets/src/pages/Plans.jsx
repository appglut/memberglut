import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { App, Table, Button, Switch, Popconfirm, Tooltip, Segmented, Tag, Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faPenToSquare, faCopy, faLink, faTrashCan, faArrowRight, faTableList, faTableCellsLarge, faStar, faUsers,
} from '@fortawesome/free-solid-svg-icons';
import Page, { PageHeader } from '../components/Page';
import { link } from '../components/adminData';
import * as api from '../services/api';
import { money, planPrice, planDuration } from '../services/format';
import { roleName } from '../services/lookups';

function Plans() {
  const { message, modal } = App.useApp();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [view, setView] = useState('table');

  const load = () => api.getPlans().then(setPlans).catch((e) => message.error(e.message)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const replace = (np) => setPlans((all) => all.map((x) => (x.id === np.id ? np : x)));

  const toggle = async (p, on) => {
    try {
      replace(await api.setPlanStatus(p.id, on ? 'active' : 'inactive'));
      message.success(on ? __( 'Plan is active and can be bought.', 'memberglut' ) : __( 'Plan hidden. Current members keep it.', 'memberglut' ));
    } catch (e) { message.error(e.message); }
  };
  const copyLink = (p) => {
    navigator.clipboard?.writeText(p.signup_url);
    message.success(__( 'Signup link copied.', 'memberglut' ));
  };
  const duplicate = (p) => {
    let withRules = true;
    modal.confirm({
      title: sprintf( __( 'Duplicate “%s”?', 'memberglut' ), p.name ),
      content: (
        <>
          <p>{__( 'The copy is created as inactive so you can review it before selling it.', 'memberglut' )}</p>
          <Checkbox defaultChecked onChange={(e) => { withRules = e.target.checked; }}>{__( 'Also give the copy access to the same content rules', 'memberglut' )}</Checkbox>
        </>
      ),
      okText: __( 'Duplicate', 'memberglut' ),
      onOk: async () => {
        try {
          const np = await api.duplicatePlan(p.id, withRules);
          setPlans((all) => [...all, np]);
          message.success(__( 'Plan duplicated.', 'memberglut' ));
        } catch (e) { message.error(e.message); }
      },
    });
  };
  const remove = async (p) => {
    try {
      await api.deletePlan(p.id);
      setPlans((all) => all.filter((x) => x.id !== p.id));
      message.success(__( 'Plan deleted.', 'memberglut' ));
    } catch (e) { message.error(e.message); }
  };

  const rows = plans.filter((p) => !filter || p.status === filter);
  const groups = [...new Set(plans.map((p) => p.group))];

  const actions = (p) => (
    <div className="mg-row-actions">
      <a href={link('plan_editor', { id: p.id })}><FontAwesomeIcon icon={faPenToSquare} /> {__( 'Edit', 'memberglut' )}</a>
      <span className="mg-action-sep">|</span>
      <a onClick={() => duplicate(p)}><FontAwesomeIcon icon={faCopy} /> {__( 'Duplicate', 'memberglut' )}</a>
      <span className="mg-action-sep">|</span>
      <a onClick={() => copyLink(p)}><FontAwesomeIcon icon={faLink} /> {__( 'Signup link', 'memberglut' )}</a>
      <span className="mg-action-sep">|</span>
      <Popconfirm
        title={__( 'Delete this plan?', 'memberglut' )}
        description={p.subscriptions ? sprintf( __( '%d members have it. Make it inactive instead to keep them.', 'memberglut' ), p.subscriptions ) : __( 'It is also removed from rules, coupons and the pricing table. This cannot be undone.', 'memberglut' )}
        okButtonProps={{ danger: true, disabled: p.subscriptions > 0 }}
        onConfirm={() => remove(p)}
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
    { title: __( 'Price', 'memberglut' ), dataIndex: 'price', render: (v, p) => <><b>{planPrice(p)}</b>{p.trial && <div className="mg-muted">{__( 'Free trial', 'memberglut' )}</div>}{p.sold_out && <div><Tag color="red" bordered={false}>{__( 'Sold out', 'memberglut' )}</Tag></div>}{p.signup_fee > 0 && <div className="mg-muted">+ {money(p.signup_fee)} {__( 'sign-up fee', 'memberglut' )}</div>}</> },
    { title: __( 'Access length', 'memberglut' ), render: (v, p) => planDuration(p) },
    { title: __( 'Role', 'memberglut' ), dataIndex: 'role', render: (v) => (v ? <Tag bordered={false}>{roleName(v)}</Tag> : <span className="mg-muted">—</span>) },
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
