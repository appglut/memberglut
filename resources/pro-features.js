import { bO as faShieldHalved, b6 as faCreditCard, bG as faRectangleList, c0 as faUserLock, bD as faPeopleGroup, bb as faEnvelopesBulk, bE as faPlug, aQ as faBell, aY as faChartLine, cV as jsxRuntimeExports, P as Page, d8 as reactExports, q as FontAwesomeIcon, b7 as faCrown, a8 as __, c as Button, bQ as faStar, bv as faMagnifyingGlass, aZ as faCheck, aD as createRoot } from "./chunks/Page-hmVJ7ZEb.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { I as Input } from "./chunks/index-CH-t94NL.js";
const PRO_GROUPS = [
  {
    key: "protection",
    icon: faShieldHalved,
    title: "Advanced content protection",
    features: [
      { name: "Content dripping", desc: "Release posts, lessons or whole categories a set number of days after a member joins, or on a fixed date. Members see when each item unlocks and get an email when it does.", top: true },
      { name: "Protected file downloads", desc: "Keep files in a private folder that cannot be opened by direct link. Members download through a secure link, with download limits, logs and Amazon S3 support.", top: true },
      { name: "Metered paywall", desc: "Let visitors read a few locked articles each month before the paywall appears, with a “2 of 3 free articles left” banner." },
      { name: "AND / OR / NOT rules", desc: "Build rules from several conditions at once: plan, role, registration date, profile fields, email domain and more." },
      { name: "Scheduled rules", desc: "Turn a rule on or off between two dates, or show members only the posts published after they joined." },
      { name: "Hide everywhere", desc: "Remove locked content from the blog, search, archives, sitemaps, custom lists and the REST API, not just the single post." },
      { name: "Advanced block visibility", desc: "Combine plan, schedule and device conditions on any block, and drip individual blocks." },
      { name: "Custom field restriction", desc: "Lock posts based on their ACF or Meta Box field values." },
      { name: "Search engine access", desc: "Let verified search engine bots index locked content while visitors still see the paywall, with the right structured data." }
    ]
  },
  {
    key: "billing",
    icon: faCreditCard,
    title: "Advanced billing",
    features: [
      { name: "More payment gateways", desc: "Authorize.Net, Mollie, Paystack, Razorpay and Paddle, alongside Stripe, PayPal and bank transfer.", top: true },
      { name: "Pro-rated plan changes", desc: "When a member upgrades or downgrades mid-cycle, the unused time of their current plan is credited against the new one.", top: true },
      { name: "Team & group memberships", desc: "Sell plans with seats. The buyer invites their team by link, email or CSV, and everyone gets the owner’s access.", top: true },
      { name: "Tax & EU VAT", desc: "Tax rates by country and state, VAT number validation, reverse charge for businesses, and tax on invoices.", top: true },
      { name: "PDF invoices", desc: "A numbered PDF invoice for every payment with your company details and logo, downloadable by you and the member.", top: true },
      { name: "Multiple currencies", desc: "Show prices in the visitor’s own currency, detected from their location or chosen from a switcher." },
      { name: "Pay what you want", desc: "Let members choose their price above a minimum. Great for donations and supporters." },
      { name: "Fixed-period plans", desc: "Plans that all end on the same date, such as a season pass, whatever day members join." },
      { name: "Gift memberships", desc: "Buy a plan for someone else with a delivery date and message. The recipient claims it from an email link." },
      { name: "Pause subscriptions", desc: "Members pause billing for a few months instead of canceling, within limits you set." },
      { name: "Order bumps", desc: "Offer an extra plan or add-on at checkout that members add with one click." },
      { name: "Auto-renew choice", desc: "Let members choose at checkout whether their plan renews automatically." },
      { name: "Advanced coupons", desc: "Auto-apply coupons from a link, one use per email, and gift / redemption codes." },
      { name: "Plan limits & schedules", desc: "Sell a plan only between two dates, cap the number of members (“Sold out”), and move members to another plan when theirs ends." },
      { name: "Pay per post", desc: "Sell access to one post, page or file without a full membership, with an optional access window." },
      { name: "Pricing fields", desc: "Add paid options and add-ons to the registration form with a live total." }
    ]
  },
  {
    key: "forms",
    icon: faRectangleList,
    title: "Advanced forms & profiles",
    features: [
      { name: "60+ form fields", desc: "File upload, address, date & time, map, signature, rating, repeater, calculations, hidden and more.", top: true },
      { name: "Conditional logic", desc: "Show or hide fields and form steps based on earlier answers." },
      { name: "Multi-step forms", desc: "Split long forms into steps with a progress bar." },
      { name: "Several registration forms", desc: "Different forms for different plans or roles, each with its own fields." },
      { name: "Save & continue", desc: "Members save a half-finished form and come back to it from an emailed link." },
      { name: "Popup forms", desc: "Open login and registration in a popup from any button or link." },
      { name: "Form style designer", desc: "Change colours, fonts, spacing and buttons of every form without CSS." },
      { name: "Profile completeness", desc: "A progress bar that asks members to finish their profile, with the option to require it." }
    ]
  },
  {
    key: "login",
    icon: faUserLock,
    title: "Login & security",
    features: [
      { name: "Social login", desc: "Sign up and log in with Google, Facebook, X, LinkedIn, Microsoft, GitHub and more.", top: true },
      { name: "Two-factor authentication", desc: "Authenticator app or email codes, backup codes and a “remember this device” option. Require it for some roles.", top: true },
      { name: "Passwordless login", desc: "Members log in with a one-time link sent to their email." },
      { name: "Invite codes", desc: "Only people with a valid code can register. Codes can have limits, dates and their own plan." },
      { name: "Session control per role", desc: "Different device limits for each role, and a “log out other devices” button for members." },
      { name: "Password policies", desc: "Force a password change on first login or after a number of days." },
      { name: "More spam protection", desc: "Akismet checks on registrations, phone verification by SMS code, and a math captcha." }
    ]
  },
  {
    key: "community",
    icon: faPeopleGroup,
    title: "Community",
    features: [
      { name: "Member directory", desc: "Searchable member directories with filters on any field, several layouts and a map view.", top: true },
      { name: "Public profiles", desc: "Profile pages with cover photo, custom tabs and privacy controls." },
      { name: "Private messaging", desc: "Members message each other, with blocking and email notifications." },
      { name: "Activity & notifications", desc: "An activity feed and an on-site notification bell for messages and membership events." },
      { name: "Groups", desc: "Members create and join groups with their own discussion." },
      { name: "Verified badges", desc: "A verified badge, granted by request or automatically by plan." },
      { name: "Announcements", desc: "Notices shown only to certain plans or roles." }
    ]
  },
  {
    key: "marketing",
    icon: faEnvelopesBulk,
    title: "Email marketing & automation",
    features: [
      { name: "Mailchimp", desc: "Add members to an audience, tag them by plan and move tags on upgrade, cancel or expiry.", top: true },
      { name: "Brevo, MailerLite, Kit & more", desc: "The same list and tag sync for Brevo, MailerLite, Kit, ActiveCampaign, Klaviyo, AWeber, GetResponse and MailPoet." },
      { name: "Zapier & webhooks", desc: "Send membership events to 5,000+ apps, or to your own URL with retries and signatures." },
      { name: "Google Sheets", desc: "Add every new member as a row in a spreadsheet." }
    ]
  },
  {
    key: "integrations",
    icon: faPlug,
    title: "Integrations",
    features: [
      { name: "LMS plugins", desc: "Sell LearnDash, LifterLMS, Sensei, MasterStudy and Tutor LMS courses with your plans, enroll on purchase and unenroll on expiry.", top: true },
      { name: "WooCommerce memberships", desc: "Members-only products and prices, free shipping for members, and MemberGlut forms in WooCommerce checkout and My Account." },
      { name: "Communities", desc: "Give access to BuddyBoss groups, FluentCommunity spaces and bbPress forums by plan." },
      { name: "Affiliates", desc: "Pay affiliates for membership sales with AffiliateWP or SliceWP." },
      { name: "Multisite sign-up", desc: "Create a new site in the network when someone joins a plan." }
    ]
  },
  {
    key: "notifications",
    icon: faBell,
    title: "Notifications",
    features: [
      { name: "Email automations", desc: "Unlimited reminders sent days before or after any membership event, each with its own text, per plan.", top: true },
      { name: "Email designer", desc: "Design your email template visually: logo, colours, buttons and footer." },
      { name: "SMS notifications", desc: "Text members about renewals, failed payments and new content." }
    ]
  },
  {
    key: "reports",
    icon: faChartLine,
    title: "Reports & tools",
    features: [
      { name: "Revenue reports", desc: "MRR, churn, lifetime value, revenue by plan and gateway, and conversion rates, for any period.", top: true },
      { name: "Import members", desc: "Import members from a CSV with their plans, dates and status, in the background.", top: true },
      { name: "Member journey", desc: "See which pages members visit and which page led them to join." },
      { name: "Text editor", desc: "Change any front-end text of MemberGlut from one screen." },
      { name: "Remote API", desc: "Create and update members from other apps with API keys." }
    ]
  }
];
const UPGRADE_URL = "https://appglut.com/memberglut-pro/";
function ProFeatures() {
  const [q, setQ] = reactExports.useState("");
  const [group, setGroup] = reactExports.useState("all");
  const total = PRO_GROUPS.reduce((n, g) => n + g.features.length, 0);
  const match = (f) => !q || `${f.name} ${f.desc}`.toLowerCase().includes(q.toLowerCase());
  const top = PRO_GROUPS.flatMap((g) => g.features.filter((f) => f.top).map((f) => ({ ...f, icon: g.icon })));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-pro", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-pro-hero", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mg-pro-badge", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCrown }),
        " MemberGlut Pro"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: __("Grow your membership business", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: sprintf(__("%d more features on top of everything in MemberGlut: content dripping, protected downloads, team plans, invoices, tax, social login, integrations and more.", "memberglut"), total) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-pro-cta", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", size: "large", href: UPGRADE_URL, target: "_blank", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faStar }), children: __("Get MemberGlut Pro", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Your free plans, members and settings keep working. Pro adds on top.", "memberglut") })
      ] })
    ] }),
    !q && group === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mg-pro-h2", children: __("Most wanted", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-pro-top", children: top.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-pro-top-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: f.icon }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: f.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: f.desc })
      ] }, f.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-pro-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { allowClear: true, size: "large", prefix: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faMagnifyingGlass }), placeholder: __("Search Pro features…", "memberglut"), value: q, onChange: (e) => setQ(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-pro-chips", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: group === "all" ? "active" : "", onClick: () => setGroup("all"), children: __("All", "memberglut") }),
        PRO_GROUPS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: group === g.key ? "active" : "", onClick: () => setGroup(g.key), children: g.title }, g.key))
      ] })
    ] }),
    PRO_GROUPS.filter((g) => group === "all" || g.key === group).map((g) => {
      const list = g.features.filter(match);
      if (!list.length) return null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mg-pro-group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mg-pro-h2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: g.icon }) }),
          g.title,
          /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: list.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-pro-grid", children: list.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-pro-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faCheck }),
            f.name,
            f.top && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pill", children: __("Popular", "memberglut") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: f.desc })
        ] }, f.name)) })
      ] }, g.key);
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-pro-foot", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: __("Ready for more?", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", size: "large", href: UPGRADE_URL, target: "_blank", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faStar }), children: __("Upgrade to Pro", "memberglut") })
    ] })
  ] });
}
function ProFeaturesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProFeatures, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(ProFeaturesPage, {}));
