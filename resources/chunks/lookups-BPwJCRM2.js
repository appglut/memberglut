const admin = typeof memberglut_admin !== "undefined" ? memberglut_admin : {};
const L = {
  plans: [],
  roles: [],
  pages: [],
  site: { url: "/" },
  currency: { code: "USD", symbol: "$", position: "before", thousand: ",", decimal: ".", decimals: 2 },
  ...admin.lookups || {}
};
admin.user || {};
const roleOptions = (filter) => L.roles.filter(() => true).map((r) => ({ value: r.slug, label: r.name }));
const pageOptions = () => L.pages;
export {
  L,
  pageOptions as p,
  roleOptions as r
};
