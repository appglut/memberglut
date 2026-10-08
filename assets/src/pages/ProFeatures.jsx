import React, { useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faStar, faCrown, faCheck } from '@fortawesome/free-solid-svg-icons';
import Page from '../components/Page';
import { PRO_GROUPS } from './proFeatures';

const UPGRADE_URL = 'https://appglut.com/memberglut-pro/';

function ProFeatures() {
  const [q, setQ] = useState('');
  const [group, setGroup] = useState('all');
  const total = PRO_GROUPS.reduce((n, g) => n + g.features.length, 0);
  const match = (f) => !q || `${f.name} ${f.desc}`.toLowerCase().includes(q.toLowerCase());
  const top = PRO_GROUPS.flatMap((g) => g.features.filter((f) => f.top).map((f) => ({ ...f, icon: g.icon })));

  return (
    <div className="mg-pro">
      <div className="mg-pro-hero">
        <span className="mg-pro-badge"><FontAwesomeIcon icon={faCrown} /> MemberGlut Pro</span>
        <h1>{__( 'Grow your membership business', 'memberglut' )}</h1>
        <p>{sprintf( __( '%d more features on top of everything in MemberGlut: content dripping, protected downloads, team plans, invoices, tax, social login, integrations and more.', 'memberglut' ), total )}</p>
        <div className="mg-pro-cta">
          <Button type="primary" size="large" href={UPGRADE_URL} target="_blank" icon={<FontAwesomeIcon icon={faStar} />}>{__( 'Get MemberGlut Pro', 'memberglut' )}</Button>
          <span>{__( 'Your free plans, members and settings keep working. Pro adds on top.', 'memberglut' )}</span>
        </div>
      </div>

      {!q && group === 'all' && (
        <>
          <h2 className="mg-pro-h2">{__( 'Most wanted', 'memberglut' )}</h2>
          <div className="mg-pro-top">
            {top.map((f) => (
              <div key={f.name} className="mg-pro-top-card">
                <span className="ic"><FontAwesomeIcon icon={f.icon} /></span>
                <b>{f.name}</b>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mg-pro-bar">
        <Input allowClear size="large" prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />} placeholder={__( 'Search Pro features…', 'memberglut' )} value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="mg-pro-chips">
          <button type="button" className={group === 'all' ? 'active' : ''} onClick={() => setGroup('all')}>{__( 'All', 'memberglut' )}</button>
          {PRO_GROUPS.map((g) => <button key={g.key} type="button" className={group === g.key ? 'active' : ''} onClick={() => setGroup(g.key)}>{g.title}</button>)}
        </div>
      </div>

      {PRO_GROUPS.filter((g) => group === 'all' || g.key === group).map((g) => {
        const list = g.features.filter(match);
        if (!list.length) return null;
        return (
          <section key={g.key} className="mg-pro-group">
            <h2 className="mg-pro-h2"><span className="ic"><FontAwesomeIcon icon={g.icon} /></span>{g.title}<small>{list.length}</small></h2>
            <div className="mg-pro-grid">
              {list.map((f) => (
                <div key={f.name} className="mg-pro-card">
                  <div className="t"><FontAwesomeIcon icon={faCheck} />{f.name}{f.top && <span className="pill">{__( 'Popular', 'memberglut' )}</span>}</div>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <div className="mg-pro-foot">
        <h2>{__( 'Ready for more?', 'memberglut' )}</h2>
        <Button type="primary" size="large" href={UPGRADE_URL} target="_blank" icon={<FontAwesomeIcon icon={faStar} />}>{__( 'Upgrade to Pro', 'memberglut' )}</Button>
      </div>
    </div>
  );
}

export function ProFeaturesPage() {
  return <Page active=""><ProFeatures /></Page>;
}
