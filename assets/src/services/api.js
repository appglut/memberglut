/**
 * Data layer for the admin screens: every call goes to the REST API (namespace memberglut/v1).
 * Errors throw an Error with `.status`, `.code` and `.fields` ({ key: message }) when the server sends them.
 */

const admin = typeof memberglut_admin !== 'undefined' ? memberglut_admin : {};

/** Build a query string, dropping empty values. Arrays become key[]=a&key[]=b. */
function qs(params = {}) {
  const parts = [];
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length)) return;
    if (Array.isArray(v)) v.forEach((x) => parts.push(`${encodeURIComponent(k)}[]=${encodeURIComponent(x)}`));
    else parts.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  });
  return parts.length ? `?${parts.join('&')}` : '';
}

/** REST call. */
export async function request(path, { method = 'GET', body, query } = {}) {
  const base = admin.rest_url || '/wp-json/memberglut/v1/';
  const res = await fetch(base + path.replace(/^\//, '') + qs(query), {
    method,
    headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': admin.rest_nonce || '' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.code = data.code;
    err.fields = (data.data && data.data.fields) || {};
    throw err;
  }
  return data;
}

/** Download a file returned by an endpoint (CSV/JSON exports). */
export async function download(path, query, fallbackName = 'export.csv') {
  const base = admin.rest_url || '/wp-json/memberglut/v1/';
  const res = await fetch(base + path.replace(/^\//, '') + qs(query), { headers: { 'X-WP-Nonce': admin.rest_nonce || '' }, credentials: 'same-origin' });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || `Download failed (${res.status})`);
  }
  const type = res.headers.get('Content-Type') || '';
  if (type.includes('application/json') && !path.includes('setup')) {
    return res.json(); // Queued export: { queued: true, ... }
  }
  const blob = await res.blob();
  const cd = res.headers.get('Content-Disposition') || '';
  const m = cd.match(/filename="?([^";]+)"?/);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = m ? m[1] : fallbackName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  return { downloaded: true };
}

const get = (path, query) => request(path, { query });
const post = (path, body) => request(path, { method: 'POST', body: body || {} });
const put = (path, body) => request(path, { method: 'PUT', body: body || {} });
const patch = (path, body) => request(path, { method: 'PATCH', body: body || {} });
const del = (path, query) => request(path, { method: 'DELETE', query });

/* Lookups */
export const getLookups = () => get('lookups');
export const searchPosts = (search, type, include) => get('lookups/posts', { search, type, include });
export const searchTerms = (taxonomy, search, include) => get('lookups/terms', { taxonomy, search, include });
export const searchUsers = (search, include) => get('lookups/users', { search, include });

/* Dashboard */
export const getStats = () => get('dashboard/stats');
export const getActivity = (limit = 7) => get('events', { per_page: limit }).then((r) => r.items);
export const getSetupChecklist = () => get('dashboard/checklist');

/* Plans */
export const getPlans = (query) => get('plans', query);
export const getPlan = (id) => get(`plans/${id}`);
export const savePlan = (plan) => (plan.id ? put(`plans/${plan.id}`, plan) : post('plans', plan));
export const deletePlan = (id) => del(`plans/${id}`);
export const duplicatePlan = (id, withRules) => post(`plans/${id}/duplicate`, { with_rules: !!withRules });
export const setPlanStatus = (id, status) => patch(`plans/${id}/status`, { status });
export const savePlanOrder = (group, ids) => put('plans/order', { group, ids });
export const getPlanRules = (id) => get(`plans/${id}/rules`);

/* Members & subscriptions */
export const getMembers = (query) => get('members', query);
export const getMemberCounts = (query) => get('members/counts', query);
export const getMember = (userId) => get(`members/user/${userId}`);
export const addMember = (data) => post('members', data);
export const bulkMembers = (action, ids, args = {}) => post('members/bulk', { action, ids, args });
export const broadcast = (data) => post('members/broadcast', data);
export const exportMembers = (query) => download('members/export', query, 'members.csv');
export const memberAction = (userId, action, data) => post(`members/user/${userId}/${action}`, data);
export const getNotes = (userId) => get(`members/user/${userId}/notes`);
export const addNote = (userId, text) => post(`members/user/${userId}/notes`, { text });
export const deleteNote = (userId, noteId) => del(`members/user/${userId}/notes/${noteId}`);
export const updateSubscription = (id, data) => patch(`subscriptions/${id}`, data);
export const subscriptionAction = (id, action, data) => post(`subscriptions/${id}/${action}`, data);
export const deleteSubscription = (id) => del(`subscriptions/${id}`);
export const getEvents = (query) => get('events', query);
export const getLogins = (query) => get('logins', query);

/* Content rules */
export const getRules = (query) => get('rules', query);
export const getRule = (id) => get(`rules/${id}`);
export const saveRule = (r) => (r.id ? put(`rules/${r.id}`, r) : post('rules', r));
export const deleteRule = (id) => del(`rules/${id}`);
export const duplicateRule = (id) => post(`rules/${id}/duplicate`);
export const setRuleStatus = (id, status) => patch(`rules/${id}/status`, { status });
export const getPerPostRules = (query) => get('rules/per-post', query);
export const getRuleStats = () => get('rules/stats');
export const testRule = (data) => post('rules/test', data);

/* Roles */
export const getRoles = () => get('roles');
export const getCapabilities = () => get('capabilities');
export const saveRole = (r) => put(`roles/${r.slug}`, r);
export const createRole = (r) => post('roles', r);
export const cloneRole = (slug, data) => post(`roles/${slug}/clone`, data);
export const makeDefaultRole = (slug) => post(`roles/${slug}/default`);
export const deleteRole = (slug, replacement) => del(`roles/${slug}`, { replacement });
export const addCapability = (cap, role) => post('capabilities', { cap, role });
export const deleteCapability = (cap) => del(`capabilities/${cap}`);
export const exportRoles = (roles) => download('roles/export', { roles }, 'roles.json');
export const previewRoleImport = (data) => post('roles/import/preview', data);
export const importRoles = (data) => post('roles/import', data);
export const getRoleOptions = () => get('roles/options');
export const saveRoleOptions = (o) => put('roles/options', o);

/* Payments & coupons */
export const getPayments = (query) => get('payments', query);
export const getPaymentSummary = (query) => get('payments/summary', query);
export const getPayment = (id) => get(`payments/${id}`);
export const addPayment = (data) => post('payments', data);
export const paymentAction = (id, action, data) => post(`payments/${id}/${action}`, data);
export const exportPayments = (query) => download('payments/export', query, 'payments.csv');
export const getCoupons = (query) => get('coupons', query);
export const saveCoupon = (c) => (c.id ? put(`coupons/${c.id}`, c) : post('coupons', c));
export const deleteCoupon = (id) => del(`coupons/${id}`);
export const importCoupons = (csv) => post('coupons/import', { csv });

/* Emails */
export const getEmails = () => get('emails');
export const saveEmails = (list) => put('emails', { emails: list });
export const resetEmail = (key) => post(`emails/${key}/reset`);
export const testEmail = (key, data) => post(`emails/${key}/test`, data);
export const previewEmail = (key, data) => post(`emails/${key}/preview`, data);

/* Pages, settings, forms, logs */
export const getPages = () => get('lookups/pages');
export const getSettings = () => get('settings');
export const saveSettings = (values) => put('settings', { values });
export const getFormsConfig = () => get('forms');
export const saveFormsConfig = (values) => put('forms', { values });
export const createPages = (slots) => post('forms/pages/create', { slots });
export const getLogs = (query) => get('logs', query);
export const clearLogs = () => del('logs');

/* Tools */
export const getStatus = () => get('tools/status');
export const exportSetup = (sections) => download('tools/export/setup', { sections }, 'memberglut-setup.json');
export const previewSetupImport = (data) => post('tools/import/preview', data);
export const importSetup = (data) => post('tools/import', data);
export const convertUsers = (role, planId, sendEmail) => post('tools/convert', { role, plan_id: planId, send_email: !!sendEmail });
export const runMaintenance = (task, data) => post(`tools/maintenance/${task}`, data);
export const exportMembersTool = (query) => download('members/export', query, 'members.csv');
