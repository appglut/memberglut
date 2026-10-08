/**
 * Data localized by PHP (memberglut_admin) with safe fallbacks, shared by the headers and the nav menu.
 */
const admin = typeof memberglut_admin !== 'undefined' ? memberglut_admin : {};

export const _pg = admin.pages || {
  dashboard: 'dashboard.html',
  members: 'members.html',
  member_detail: 'member-detail.html',
  plans: 'plans.html',
  plan_editor: 'plan-editor.html',
  rules: 'content-rules.html',
  rule_editor: 'rule-editor.html',
  roles: 'roles.html',
  payments: 'payments.html',
  coupons: 'coupons.html',
  emails: 'emails.html',
  forms: 'forms-pages.html',
  settings: 'settings.html',
  tools: 'tools.html',
  pro_features: 'pro-features.html',
};

export const _dashboard = admin.dashboard_url || '/wp-admin/';

export const _pluginUrl = admin.plugin_url || '';

export const _siteUrl = admin.site_url || '';

/** Build a link to a MemberGlut page with extra query args, e.g. link('plan_editor', { plan_id: 3 }). */
export function link(page, args = {}) {
  const base = _pg[page] || '#';
  const qs = new URLSearchParams(args).toString();
  if (!qs) return base;
  return base + (base.includes('?') ? '&' : '?') + qs;
}

/** Read a query arg from the current URL. */
export function queryArg(name) {
  return new URLSearchParams(window.location.search).get(name);
}
