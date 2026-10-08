import React, { useEffect, useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Button, Skeleton, Segmented, Progress, Tooltip, Empty } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faSackDollar, faUserPlus, faHourglassHalf, faPlus, faLayerGroup, faShieldHalved,
  faCircleCheck, faCircle, faArrowRight, faCreditCard, faUserXmark, faRightToBracket, faUserClock, faClockRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import Page, { PageHeader, StatCard } from '../components/Page';
import { link } from '../components/adminData';
import { CopyCode } from '../components/SettingsPanel';
import * as api from '../services/api';
import { money, fromNow } from '../services/format';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Small dependency-free bar chart. */
function BarChart({ data, field, format }) {
  const max = Math.max(...data.map((d) => d[field]), 1);
  const now = new Date().getMonth();
  return (
    <div className="mg-bars">
      {data.map((d, i) => {
        const label = MONTHS[(now - (data.length - 1 - i) + 12) % 12];
        return (
          <Tooltip key={i} title={`${label}: ${format(d[field])}`}>
            <div className="mg-bar">
              <div className="mg-bar-fill" style={{ height: `${(d[field] / max) * 100}%` }} />
              <span>{label}</span>
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}

const ACTIVITY_ICON = {
  grant: faUserPlus, payment: faCreditCard, cancel: faUserXmark, expire: faHourglassHalf,
  pending: faUserClock, login: faRightToBracket,
};

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [plans, setPlans] = useState([]);
  const [activity, setActivity] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [metric, setMetric] = useState('revenue');

  useEffect(() => {
    Promise.all([api.getStats(), api.getPlans(), api.getActivity(), api.getSetupChecklist()]).then(([s, p, a, c]) => {
      setStats(s); setPlans(p); setActivity(a); setChecklist(c);
    });
  }, []);

  const done = checklist.filter((c) => c.done).length;
  const totalMembers = plans.reduce((n, p) => n + p.members, 0) || 1;

  return (
    <>
      <PageHeader
        title={__( 'Dashboard', 'memberglut' )}
        subtitle={__( 'How your membership site is doing today.', 'memberglut' )}
        actions={(
          <>
            <Button size="large" icon={<FontAwesomeIcon icon={faShieldHalved} />} href={link('rule_editor')}>{__( 'Protect content', 'memberglut' )}</Button>
            <Button size="large" icon={<FontAwesomeIcon icon={faLayerGroup} />} href={link('plan_editor')}>{__( 'New plan', 'memberglut' )}</Button>
            <Button size="large" type="primary" icon={<FontAwesomeIcon icon={faPlus} />} href={link('members', { add: 1 })}>{__( 'Add member', 'memberglut' )}</Button>
          </>
        )}
      />

      {!stats ? <Skeleton active paragraph={{ rows: 8 }} /> : (
        <>
          <div className="mg-stats-row">
            <StatCard icon={<FontAwesomeIcon icon={faUsers} />} label={__( 'Active members', 'memberglut' )} value={stats.active_members.toLocaleString()} hint={sprintf( __( '%d waiting for approval', 'memberglut' ), stats.pending )} />
            <StatCard icon={<FontAwesomeIcon icon={faSackDollar} />} label={__( 'Revenue this month', 'memberglut' )} value={money(stats.revenue_month)} hint={sprintf( __( '▲ %s%% vs last month', 'memberglut' ), stats.revenue_change )} trend="up" />
            <StatCard icon={<FontAwesomeIcon icon={faUserPlus} />} label={__( 'New members (30 days)', 'memberglut' )} value={stats.new_members_30d} hint={sprintf( __( '▲ %s%% · %d canceled', 'memberglut' ), stats.new_members_change, stats.canceled_30d )} trend="up" />
            <StatCard icon={<FontAwesomeIcon icon={faHourglassHalf} />} label={__( 'Expiring in 7 days', 'memberglut' )} value={stats.expiring_7d} hint={sprintf( __( 'Churn %s%% this month', 'memberglut' ), stats.churn )} trend="down" />
          </div>

          <div className="mg-dash-grid">
            <div className="mg-card mg-card-flush">
              <div className="mg-card-head">
                <div>
                  <div className="mg-card-title">{metric === 'revenue' ? __( 'Revenue', 'memberglut' ) : __( 'Active members', 'memberglut' )}</div>
                  <div className="mg-card-sub">{__( 'Last 12 months', 'memberglut' )}</div>
                </div>
                <Segmented value={metric} onChange={setMetric} options={[{ value: 'revenue', label: __( 'Revenue', 'memberglut' ) }, { value: 'members', label: __( 'Members', 'memberglut' ) }]} />
              </div>
              <BarChart data={stats.chart} field={metric} format={metric === 'revenue' ? money : (v) => v} />
              <div className="mg-card-foot">
                <span>{__( 'Monthly recurring revenue', 'memberglut' )} <b>{money(stats.mrr)}</b></span>
                <a href={link('payments')}>{__( 'View payments', 'memberglut' )} <FontAwesomeIcon icon={faArrowRight} /></a>
              </div>
            </div>

            <div className="mg-card">
              <div className="mg-card-title">{__( 'Get started', 'memberglut' )}</div>
              <div className="mg-card-sub" style={{ marginBottom: 12 }}>{sprintf( __( '%1$d of %2$d steps done', 'memberglut' ), done, checklist.length )}</div>
              <Progress percent={Math.round((done / (checklist.length || 1)) * 100)} showInfo={false} strokeColor="#e94560" />
              <ul className="mg-checklist">
                {checklist.map((c) => (
                  <li key={c.key} className={c.done ? 'done' : ''}>
                    <FontAwesomeIcon icon={c.done ? faCircleCheck : faCircle} />
                    <span>{c.label}</span>
                    {!c.done && <a href={c.key === 'gateway' ? link('settings', { tab: 'payments' }) : link(c.key === 'emails' ? 'emails' : 'forms')}>{__( 'Do it', 'memberglut' )}</a>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mg-card">
              <div className="mg-card-head-plain">
                <div className="mg-card-title">{__( 'Members by plan', 'memberglut' )}</div>
                <a href={link('plans')}>{__( 'All plans', 'memberglut' )}</a>
              </div>
              {plans.map((p) => (
                <div key={p.id} className="mg-plan-bar">
                  <div className="mg-plan-bar-top">
                    <span><i style={{ background: p.color }} />{p.name}{p.status !== 'active' && <em> · {__( 'inactive', 'memberglut' )}</em>}</span>
                    <b>{p.members}</b>
                  </div>
                  <Progress percent={(p.members / totalMembers) * 100} showInfo={false} strokeColor={p.color} size="small" />
                </div>
              ))}
            </div>

            <div className="mg-card">
              <div className="mg-card-head-plain">
                <div className="mg-card-title">{__( 'Recent activity', 'memberglut' )}</div>
                <a href={link('tools', { tab: 'activity' })}>{__( 'Full log', 'memberglut' )}</a>
              </div>
              {activity.length === 0 ? <Empty /> : (
                <ul className="mg-activity">
                  {activity.map((a) => (
                    <li key={a.id}>
                      <span className={`ic t-${a.type}`}><FontAwesomeIcon icon={ACTIVITY_ICON[a.type] || faClockRotateLeft} /></span>
                      <div><div>{a.text}</div><small>{fromNow(a.date)}</small></div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mg-card mg-span-2">
              <div className="mg-card-title">{__( 'Shortcodes', 'memberglut' )}</div>
              <div className="mg-card-sub" style={{ marginBottom: 14 }}>{__( 'Place these on any page, or use the MemberGlut blocks in the editor.', 'memberglut' )}</div>
              <div className="mg-shortcodes">
                {[
                  ['[memberglut_register]', __( 'Registration + checkout', 'memberglut' )],
                  ['[memberglut_login]', __( 'Login form', 'memberglut' )],
                  ['[memberglut_account]', __( 'My Account page', 'memberglut' )],
                  ['[memberglut_plans]', __( 'Pricing table', 'memberglut' )],
                  ['[memberglut_lost_password]', __( 'Lost password', 'memberglut' )],
                  ['[memberglut_restrict plans="2,3"]…[/memberglut_restrict]', __( 'Lock part of a post', 'memberglut' )],
                ].map(([code, label]) => (
                  <div key={code} className="mg-shortcode-item"><span>{label}</span><CopyCode code={code} /></div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function DashboardPage() {
  return <Page active="dashboard"><Dashboard /></Page>;
}
