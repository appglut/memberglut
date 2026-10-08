import React from 'react';
import { ConfigProvider, App as AntApp } from 'antd';
import Header from './Header';
import './memberglut.css';

/** Ant Design theme shared by every screen: the brand colour and the Inter font. */
export const THEME = {
  token: {
    colorPrimary: '#e94560',
    colorLink: '#e94560',
    borderRadius: 8,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  components: {
    Switch: { colorPrimary: '#e94560', colorPrimaryHover: '#d63a54' },
    Table: { headerBg: '#f8fafc', headerColor: '#64748b', rowHoverBg: '#fff7f8' },
  },
};

/**
 * Frame for a page: theme, header and the content area.
 *
 * @param {string}  active   Header tab to highlight.
 * @param {boolean} wide     Use the settings layout (grey background, side nav) instead of the list layout.
 */
export default function Page({ active, wide = false, children }) {
  return (
    <ConfigProvider theme={THEME} direction={typeof memberglut_admin !== 'undefined' && memberglut_admin.rtl ? 'rtl' : 'ltr'}>
      <AntApp>
        <div className={wide ? 'mg-fs-page' : 'mg-list-page'}>
          <Header active={active} />
          {wide ? <div className="mg-fs-body">{children}</div> : <div className="mg-content">{children}</div>}
        </div>
      </AntApp>
    </ConfigProvider>
  );
}

/** Title + subtitle on the left, actions on the right. */
export function PageHeader({ title, subtitle, actions, back }) {
  return (
    <div className="mg-page-header">
      <div>
        {back && <a href={back.href} className="mg-back-link">{back.label}</a>}
        <div className="mg-page-title">{title}</div>
        {subtitle && <div className="mg-page-subtitle">{subtitle}</div>}
      </div>
      {actions && <div className="mg-page-actions">{actions}</div>}
    </div>
  );
}

/** One statistic card for the stats row. */
export function StatCard({ label, value, hint, trend, icon }) {
  return (
    <div className="mg-stat-card">
      <div className="mg-stat-label">{icon && <span className="mg-stat-ic">{icon}</span>}{label}</div>
      <div className="mg-stat-value">{value}</div>
      {hint && <div className={`mg-stat-change ${trend || ''}`}>{hint}</div>}
    </div>
  );
}

/** Coloured status pill used in every table. */
export function StatusBadge({ status, label }) {
  return <span className={`mg-status-badge s-${status}`}>{label || status}</span>;
}
