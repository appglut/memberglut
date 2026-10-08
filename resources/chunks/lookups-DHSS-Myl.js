const admin = typeof memberglut_admin !== "undefined" ? memberglut_admin : {};
const L = {
  plans: [],
  groups: ["Main"],
  roles: [],
  pages: [],
  gateways: [],
  site: { url: "/" },
  signup_base: "",
  currency: { code: "USD", symbol: "$", position: "before", thousand: ",", decimal: ".", decimals: 2 },
  ...admin.lookups || {}
};
admin.user || {};
const roleOptions = (filter) => L.roles.filter(filter || (() => true)).map((r) => ({ value: r.slug, label: r.name }));
const roleName = (slug) => (L.roles.find((r) => r.slug === slug) || {}).name || slug;
const pageOptions = () => L.pages;
const signupUrl = (slug) => {
  const base = L.signup_base || `${(L.site.url || "/").replace(/\/$/, "")}/register/`;
  return `${base}${base.includes("?") ? "&" : "?"}plan=${encodeURIComponent(slug || "plan")}`;
};
export {
  L,
  roleOptions as a,
  pageOptions as p,
  roleName as r,
  signupUrl as s
};
