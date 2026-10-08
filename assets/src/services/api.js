/**
 * Data layer for the admin screens.
 *
 * DESIGN STAGE: every function returns demo data (services/demoData.js) after a short delay, and saves are
 * only simulated (settings are kept in this browser's localStorage so the screens feel real). To connect
 * the backend, replace the body of each function with a call to `request()` — the screens do not change.
 */
import {
  PLANS, MEMBERS, PAYMENTS, COUPONS, RULES, ROLES, CAP_GROUPS, ROLE_CAPS, EMAILS, PAGES, ACTIVITY, LOGS,
} from './demoData';

const admin = typeof memberglut_admin !== 'undefined' ? memberglut_admin : {};

/** Real REST call, ready for when the endpoints exist (namespace memberglut/v1). */
export async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch((admin.rest_url || '/wp-json/memberglut/v1/') + path, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': admin.rest_nonce || '' },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

export const IS_DEMO = true;

const wait = (v, ms = 250) => new Promise((r) => setTimeout(() => r(structuredClone(v)), ms));

function store(key, fallback) {
  try { const v = localStorage.getItem('memberglut_demo_' + key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
}
function keep(key, value) {
  try { localStorage.setItem('memberglut_demo_' + key, JSON.stringify(value)); } catch (e) { /* private mode */ }
}

/* Dashboard */
export const getStats = () => wait({
  active_members: 671, new_members_30d: 94, new_members_change: 12.4,
  revenue_month: 3842, revenue_change: 8.1, mrr: 4120,
  pending: 6, expiring_7d: 14, canceled_30d: 9, churn: 2.3,
  chart: Array.from({ length: 12 }, (_, i) => ({ month: i, members: 420 + i * 21 + (i % 3) * 9, revenue: 2100 + i * 160 + (i % 4) * 90 })),
});
export const getActivity = () => wait(ACTIVITY);
export const getSetupChecklist = () => wait([
  { key: 'pages', label: 'Create the membership pages', done: true },
  { key: 'plan', label: 'Create your first paid plan', done: true },
  { key: 'gateway', label: 'Connect a payment gateway', done: false },
  { key: 'rule', label: 'Protect some content', done: true },
  { key: 'emails', label: 'Review the member emails', done: false },
]);

/* Plans */
export const getPlans = () => wait(PLANS);
export const getPlan = (id) => wait(PLANS.find((p) => p.id === Number(id)) || null);
export const savePlan = (plan) => wait({ ...plan, id: plan.id || Date.now() }, 500);
export const deletePlan = () => wait(true);

/* Members */
export const getMembers = () => wait(MEMBERS);
export const getMember = (id) => wait(MEMBERS.find((m) => m.id === Number(id)) || MEMBERS[0]);
export const saveMember = (m) => wait(m, 500);

/* Content rules */
export const getRules = () => wait(RULES);
export const getRule = (id) => wait(RULES.find((r) => r.id === Number(id)) || null);
export const saveRule = (r) => wait({ ...r, id: r.id || Date.now() }, 500);

/* Roles */
export const getRoles = () => wait(ROLES);
export const getCapabilities = () => wait({ groups: CAP_GROUPS, roleCaps: ROLE_CAPS });
export const saveRole = (r) => wait(r, 500);

/* Payments & coupons */
export const getPayments = () => wait(PAYMENTS);
export const getCoupons = () => wait(COUPONS);
export const saveCoupon = (c) => wait({ ...c, id: c.id || Date.now() }, 400);

/* Emails */
export const getEmails = () => wait(store('emails', EMAILS));
export const saveEmails = (list) => { keep('emails', list); return wait(true, 400); };

/* Pages, settings, logs */
export const getPages = () => wait(PAGES);
export const getSettings = (defaults) => wait({ ...defaults, ...store('settings', {}) });
export const saveSettings = (values) => { keep('settings', values); return wait(true, 500); };
export const getFormsConfig = (defaults) => wait({ ...defaults, ...store('forms', {}) });
export const saveFormsConfig = (values) => { keep('forms', values); return wait(true, 500); };
export const getLogs = () => wait(LOGS);
