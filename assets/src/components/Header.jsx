import React from 'react';
import { __ } from '@wordpress/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChevronLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { _pg, _dashboard, _pluginUrl } from './adminData';
import NavMenu from './NavMenu';

export { _pg };

/**
 * Top bar of every MemberGlut screen. The tabs are the most used pages; everything else is in the
 * three-bar side menu (NavMenu).
 *
 * @param {string} active Key of the active tab: dashboard, members, plans, rules, payments, settings.
 */
export default function Header({ active }) {
  const items = [
    { key: 'dashboard', label: __( 'Dashboard', 'memberglut' ), href: _pg.dashboard },
    { key: 'members', label: __( 'Members', 'memberglut' ), href: _pg.members },
    { key: 'plans', label: __( 'Plans', 'memberglut' ), href: _pg.plans },
    { key: 'rules', label: __( 'Content Rules', 'memberglut' ), href: _pg.rules },
    { key: 'payments', label: __( 'Payments', 'memberglut' ), href: _pg.payments },
    { key: 'settings', label: __( 'Global Settings', 'memberglut' ), href: _pg.settings },
  ];

  return (
    <header className="mg-header">
      <div className="mg-header-left">
        <NavMenu />
        <a href={_dashboard} className="mg-header-back" title={__( 'Back to WordPress Admin', 'memberglut' )}>
          <span style={{ marginTop: '0.5px' }}><FontAwesomeIcon icon={faChevronLeft} /></span>
          <FontAwesomeIcon icon={faHouse} />
        </a>
        <img src={_pluginUrl + 'global-assets/images/memberglut-logo.svg'} alt="MemberGlut" className="mg-logo-img" />
      </div>
      <nav className="mg-header-nav">
        {items.map((n) => (
          <a key={n.key} href={n.href} className={n.key === active ? 'active' : ''}>{n.label}</a>
        ))}
      </nav>
      <div className="mg-header-right">
        <a href={_pg.pro_features} className="mg-header-pro">
          <FontAwesomeIcon icon={faStar} /> {__( 'Go Pro', 'memberglut' )}
        </a>
      </div>
    </header>
  );
}
