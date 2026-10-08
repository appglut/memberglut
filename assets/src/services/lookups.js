/**
 * Lookup lists localized by PHP (memberglut_admin.lookups): plans, roles, pages, post types, currency…
 * Available synchronously at import time, so screens can build their select options at module level.
 */
const admin = typeof memberglut_admin !== 'undefined' ? memberglut_admin : {};

export const L = {
  plans: [], groups: ['Main'], roles: [], pages: [], post_types: [], taxonomies: [], templates: [],
  gateways: [], custom_fields: [], email_tags: [], statuses: {}, test_mode: false, site: { url: '/', name: '' },
  signup_base: '', can: {},
  currency: { code: 'USD', symbol: '$', position: 'before', thousand: ',', decimal: '.', decimals: 2 },
  ...(admin.lookups || {}),
};

export const currentUser = admin.user || { id: 0, name: '' };

/** Plan by id. */
export const planById = (id) => L.plans.find((p) => p.id === Number(id));

/** { value, label } options of plans. */
export const planOptions = (filter) => L.plans.filter(filter || (() => true)).map((p) => ({ value: p.id, label: p.status === 'active' ? p.name : `${p.name} (inactive)` }));

/** { value, label } options of roles. */
export const roleOptions = (filter) => L.roles.filter(filter || (() => true)).map((r) => ({ value: r.slug, label: r.name }));

/** Role display name. */
export const roleName = (slug) => (L.roles.find((r) => r.slug === slug) || {}).name || slug;

/** Pages as { value, label }. */
export const pageOptions = () => L.pages;

/** Signup link for a plan slug. */
export const signupUrl = (slug) => {
  const base = L.signup_base || `${(L.site.url || '/').replace(/\/$/, '')}/register/`;
  return `${base}${base.includes('?') ? '&' : '?'}plan=${encodeURIComponent(slug || 'plan')}`;
};
