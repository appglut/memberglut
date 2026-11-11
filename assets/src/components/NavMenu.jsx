import React, { useState } from 'react';
import { Drawer } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGaugeHigh, faUsers, faLayerGroup, faShieldHalved, faUserGear, faCreditCard, faTicket,
  faEnvelope, faGear, faToolbox, faStar, faHouse,
} from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';
import { __ } from '@wordpress/i18n';
import { _pg, _dashboard, _pluginUrl, _isPro } from './adminData';

import './app-header.css';

/** Map of admin page slug → menu key, so the current page is highlighted. */
const CURRENT = {
  'memberglut': 'dashboard',
  'memberglut-members': 'members',
  'memberglut-member': 'members',
  'memberglut-plans': 'plans',
  'memberglut-plan-editor': 'plans',
  'memberglut-rules': 'rules',
  'memberglut-rule-editor': 'rules',
  'memberglut-roles': 'roles',
  'memberglut-payments': 'payments',
  'memberglut-coupons': 'coupons',
  'memberglut-emails': 'emails',
  'memberglut-forms': 'forms',
  'memberglut-settings': 'settings',
  'memberglut-tools': 'tools',
  'memberglut-pro-features': 'pro',
};

const CORE_MENU = [
  { key: 'dashboard', label: __( 'Dashboard', 'memberglut' ), icon: faGaugeHigh, href: _pg.dashboard },
  { key: 'members', label: __( 'Members', 'memberglut' ), icon: faUsers, href: _pg.members },
  { key: 'plans', label: __( 'Membership Plans', 'memberglut' ), icon: faLayerGroup, href: _pg.plans },
  { key: 'rules', label: __( 'Content Rules', 'memberglut' ), icon: faShieldHalved, href: _pg.rules },
  { key: 'roles', label: __( 'Roles & Capabilities', 'memberglut' ), icon: faUserGear, href: _pg.roles },
  { key: 'payments', label: __( 'Payments', 'memberglut' ), icon: faCreditCard, href: _pg.payments },
  { key: 'coupons', label: __( 'Coupons', 'memberglut' ), icon: faTicket, href: _pg.coupons },
  { key: 'emails', label: __( 'Emails', 'memberglut' ), icon: faEnvelope, href: _pg.emails },
  { key: 'forms', label: __( 'Forms & Pages', 'memberglut' ), icon: faFileLines, href: _pg.forms },
  { key: 'tools', label: __( 'Data & Logs', 'memberglut' ), icon: faToolbox, href: _pg.tools },
  { key: 'settings', label: __( 'Global Settings', 'memberglut' ), icon: faGear, href: _pg.settings },
  { key: 'pro', label: _isPro ? __( 'Pro Modules', 'memberglut' ) : __( 'Pro Features', 'memberglut' ), icon: faStar, href: _pg.pro_features },
];

/**
 * Menu with the add-on screens: memberglutAdmin.registerMenuItem({ key, label, href, icon, after, pages }).
 * `after` is the key of the item to insert after (default: before Data & Logs); `pages` are admin page slugs that
 * highlight the item.
 */
function buildMenu() {
  const list = [...CORE_MENU];
  const extra = ((typeof window !== 'undefined' && window.memberglutAdmin) || {}).menu || [];
  extra.forEach((item) => {
    if (!item || !item.key || !item.href) return;
    const at = list.findIndex((i) => i.key === (item.after || 'emails'));
    list.splice(at === -1 ? list.length - 1 : at + 1, 0, { ...item, icon: item.icon || faStar });
    (item.pages || []).forEach((slug) => { CURRENT[slug] = item.key; });
  });
  return list;
}

export const MENU = buildMenu();

/**
 * Three-bar button for the left of every header. Opens a side menu with the main MemberGlut pages.
 */
export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const page = new URLSearchParams(window.location.search).get('page') || '';
  const current = CURRENT[page] || '';

  return (
    <>
      <button type="button" className="mg-hamburger" aria-label={__( 'Open menu', 'memberglut' )} aria-expanded={open} onClick={() => setOpen(true)}>
        <span /><span /><span />
      </button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="left"
        width={280}
        closable
        title={<img src={_pluginUrl + 'global-assets/images/memberglut-logo.svg'} alt="MemberGlut" className="mg-drawer-logo" />}
        rootClassName="mg-nav-drawer"
        styles={{ body: { padding: '12px 0' }, header: { background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)', borderBottom: 0 } }}
      >
        <nav className="mg-nav-list">
          {MENU.filter((i) => i.href).map((i) => (
            <a key={i.key} href={i.href} className={`${i.key === current ? 'active' : ''} ${i.key === 'pro' ? 'is-pro' : ''}`}>
              <span className="ic"><FontAwesomeIcon icon={i.icon} /></span>
              {i.label}
            </a>
          ))}
        </nav>
        <div className="mg-nav-foot">
          <a href={_dashboard}><span className="ic"><FontAwesomeIcon icon={faHouse} /></span>{__( 'WordPress Dashboard', 'memberglut' )}</a>
        </div>
      </Drawer>
    </>
  );
}
