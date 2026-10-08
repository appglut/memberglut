import { d as dayjs } from "./dayjs.min-Cgo1VKL0.js";
const d = (days) => dayjs().subtract(days, "day").format("YYYY-MM-DD HH:mm:ss");
const f = (days) => dayjs().add(days, "day").format("YYYY-MM-DD HH:mm:ss");
const PLANS = [
  { id: 1, name: "Free", slug: "free", status: "active", group: "Main", tier: 1, type: "free", price: 0, signup_fee: 0, billing: "one_time", duration_type: "unlimited", duration: { length: 1, unit: "month" }, trial: false, role: "memberglut_basic", members: 412, revenue: 0, color: "#64748b", description: "Read free articles and join the newsletter." },
  { id: 2, name: "Silver", slug: "silver", status: "active", group: "Main", tier: 2, type: "paid", price: 9, signup_fee: 0, billing: "recurring", duration_type: "fixed", duration: { length: 1, unit: "month" }, trial: true, trial_length: { length: 7, unit: "day" }, role: "memberglut_premium", members: 186, revenue: 1674, color: "#94a3b8", description: "All premium articles and monthly Q&A." },
  { id: 3, name: "Gold", slug: "gold", status: "active", group: "Main", tier: 3, type: "paid", price: 89, signup_fee: 10, billing: "recurring", duration_type: "fixed", duration: { length: 1, unit: "year" }, trial: false, role: "memberglut_vip", members: 73, revenue: 6497, color: "#f59e0b", featured: true, description: "Everything in Silver plus courses and downloads." },
  { id: 4, name: "Lifetime", slug: "lifetime", status: "inactive", group: "Main", tier: 4, type: "paid", price: 299, signup_fee: 0, billing: "one_time", duration_type: "unlimited", duration: { length: 1, unit: "year" }, trial: false, role: "memberglut_vip", members: 12, revenue: 3588, color: "#7c3aed", description: "Pay once, keep Gold access forever." }
];
const FIRST = ["Aisha", "Omar", "Fatima", "Yusuf", "Maryam", "Ibrahim", "Zainab", "Hamza", "Khadija", "Bilal", "Sara", "Ali", "Noor", "Hassan", "Amina", "Musa", "Layla", "Idris", "Huda", "Zayd", "Ruqayya", "Tariq", "Safiya", "Anas", "Hafsa"];
const LAST = ["Rahman", "Khan", "Hossain", "Ahmed", "Malik", "Siddiqui", "Chowdhury", "Karim", "Islam", "Haque"];
const STATUSES = ["active", "active", "active", "active", "trialing", "pending", "canceled", "expired", "active", "on_hold"];
const GATEWAYS = ["stripe", "paypal", "bank", "manual", "stripe"];
const MEMBERS = FIRST.map((first, i) => {
  const last = LAST[i % LAST.length];
  const p = PLANS[[1, 2, 0, 1, 2, 3, 1, 0][i % 8]];
  const status = STATUSES[i % STATUSES.length];
  return {
    id: 100 + i,
    user_id: 20 + i,
    name: `${first} ${last}`,
    username: `${first.toLowerCase()}${i}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    plan_id: p.id,
    plan: p.name,
    status,
    gateway: p.type === "free" ? "free" : GATEWAYS[i % GATEWAYS.length],
    started: d(5 + i * 9),
    expires: p.duration_type === "unlimited" ? null : status === "expired" ? d(i + 1) : f(3 + i * 4),
    role: p.role,
    total_spent: p.price * (i % 4 + 1),
    last_login: d(i % 6),
    approved: status !== "pending"
  };
});
MEMBERS.filter((m) => m.gateway !== "free").slice(0, 18).map((m, i) => ({
  id: 5e3 + i,
  member_id: m.id,
  name: m.name,
  email: m.email,
  plan: m.plan,
  amount: PLANS.find((p) => p.id === m.plan_id).price + (i === 2 ? 10 : 0),
  currency: "USD",
  gateway: m.gateway,
  status: ["completed", "completed", "completed", "pending", "failed", "refunded", "completed"][i % 7],
  type: i % 3 === 0 ? "renewal" : "new",
  transaction_id: m.gateway === "stripe" ? `pi_3P${(918273 + i * 77).toString(36)}` : m.gateway === "paypal" ? `PAY-${83920 + i}` : "",
  coupon: i === 4 ? "WELCOME20" : "",
  date: d(i * 2)
}));
[
  { id: 1, code: "WELCOME20", type: "percent", amount: 20, plans: [2, 3], uses: 41, max_uses: 100, per_user: 1, new_users_only: true, recurring: false, starts: "", expires: f(40), status: "active" },
  { id: 2, code: "RAMADAN", type: "percent", amount: 30, plans: [], uses: 128, max_uses: 0, per_user: 1, new_users_only: false, recurring: true, starts: "", expires: d(5), status: "expired" },
  { id: 3, code: "GOLD10", type: "fixed", amount: 10, plans: [3], uses: 7, max_uses: 50, per_user: 1, new_users_only: false, recurring: false, starts: f(2), expires: "", status: "scheduled" }
];
[
  { id: 1, title: "Premium articles", status: "active", priority: 10, protect: [{ type: "taxonomy", taxonomy: "category", terms: ["Premium"] }], exclude: [], access: { who: "plans", plans: [2, 3, 4], roles: [] }, action: "message", teaser: "excerpt", updated: d(2) },
  { id: 2, title: "Courses (Gold only)", status: "active", priority: 20, protect: [{ type: "post_type", post_type: "course" }], exclude: [{ type: "posts", posts: ["Course intro (free)"] }], access: { who: "plans", plans: [3, 4], roles: [] }, action: "redirect", redirect: "/pricing/", teaser: "none", updated: d(6) },
  { id: 3, title: "Members area", status: "active", priority: 5, protect: [{ type: "pages", posts: ["Members Area", "Downloads"] }], exclude: [], access: { who: "logged_in", plans: [], roles: [] }, action: "login", teaser: "none", updated: d(12) },
  { id: 4, title: "Partner resources", status: "inactive", priority: 0, protect: [{ type: "url", pattern: "/partners/*" }], exclude: [], access: { who: "roles", plans: [], roles: ["editor"] }, action: "message", teaser: "none", updated: d(30) }
];
const ROLES = [
  { slug: "administrator", name: "Administrator", users: 2, builtin: true, protected: true, level: 10 },
  { slug: "editor", name: "Editor", users: 3, builtin: true, level: 7 },
  { slug: "author", name: "Author", users: 5, builtin: true, level: 2 },
  { slug: "contributor", name: "Contributor", users: 1, builtin: true, level: 1 },
  { slug: "subscriber", name: "Subscriber", users: 214, builtin: true, isDefault: true, level: 0 },
  { slug: "memberglut_basic", name: "Basic Member", users: 412, builtin: false, level: 0 },
  { slug: "memberglut_premium", name: "Premium Member", users: 186, builtin: false, level: 0 },
  { slug: "memberglut_vip", name: "VIP Member", users: 85, builtin: false, level: 0 }
];
const CAP_GROUPS = [
  { key: "general", label: "General", caps: ["read", "edit_dashboard", "upload_files", "unfiltered_html", "manage_options", "export", "import"] },
  { key: "posts", label: "Posts", caps: ["edit_posts", "edit_others_posts", "edit_published_posts", "publish_posts", "delete_posts", "delete_others_posts", "delete_published_posts", "read_private_posts", "manage_categories"] },
  { key: "pages", label: "Pages", caps: ["edit_pages", "edit_others_pages", "edit_published_pages", "publish_pages", "delete_pages", "delete_others_pages", "read_private_pages"] },
  { key: "users", label: "Users", caps: ["list_users", "create_users", "edit_users", "delete_users", "promote_users", "remove_users"] },
  { key: "appearance", label: "Appearance", caps: ["switch_themes", "edit_theme_options", "edit_themes", "install_themes", "customize"] },
  { key: "plugins", label: "Plugins", caps: ["activate_plugins", "install_plugins", "edit_plugins", "update_plugins", "delete_plugins"] },
  { key: "memberglut", label: "MemberGlut", caps: ["memberglut_manage_members", "memberglut_manage_plans", "memberglut_manage_rules", "memberglut_view_payments", "memberglut_manage_settings", "memberglut_basic_access", "memberglut_premium_access", "memberglut_vip_access"] },
  { key: "custom", label: "Custom", caps: ["access_course_library", "view_member_directory"] }
];
({
  administrator: Object.fromEntries(CAP_GROUPS.flatMap((g) => g.caps).map((c) => [c, "grant"]))
});
const PAGES = [
  { value: 11, label: "Register" },
  { value: 12, label: "Login" },
  { value: 13, label: "My Account" },
  { value: 14, label: "Lost Password" },
  { value: 15, label: "Pricing" },
  { value: 16, label: "Thank You" },
  { value: 17, label: "Members Area" },
  { value: 18, label: "Downloads" },
  { value: 2, label: "Sample Page" },
  { value: 3, label: "Privacy Policy" },
  { value: 19, label: "Terms & Conditions" }
];
const ACTIVITY = [
  { id: 1, type: "grant", text: "Aisha Rahman joined Silver", date: d(0) },
  { id: 2, type: "payment", text: "Payment #5003 of $89.00 received from Yusuf Ahmed (Stripe)", date: d(0) },
  { id: 3, type: "cancel", text: "Zainab Siddiqui canceled Gold (access until period end)", date: d(1) },
  { id: 4, type: "expire", text: "Hamza Chowdhury’s Silver plan expired", date: d(1) },
  { id: 5, type: "pending", text: "Khadija Karim is waiting for approval", date: d(2) },
  { id: 6, type: "grant", text: "Admin added Bilal Islam to Gold manually", date: d(3) },
  { id: 7, type: "login", text: "Blocked a third concurrent login for omar1", date: d(3) }
];
Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  level: ["info", "info", "warning", "error", "info", "debug"][i % 6],
  source: ["subscription", "payment", "access", "email", "login", "cron"][i % 6],
  message: [
    "Subscription #212 activated for user 31 (Silver)",
    "Stripe webhook invoice.paid processed for sub_1P8x…",
    "Denied access to “Premium Guide” for a guest: rule #1",
    "Email “Payment failed” could not be sent: wp_mail returned false",
    "Login blocked: active session limit (2) reached for user 27",
    "Expiration sweep: 3 subscriptions expired, roles updated"
  ][i % 6],
  date: d(i * 0.4)
}));
export {
  ACTIVITY as A,
  MEMBERS as M,
  PAGES as P,
  ROLES as R,
  PLANS as a
};
