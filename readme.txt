=== MemberGlut - Membership, Roles & Content Restriction ===
Contributors: appglut
Tags: membership, subscriptions, content restriction, paywall, user roles
Requires at least: 6.2
Tested up to: 7.1
Stable tag: 2.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Membership plans, recurring payments with Stripe and PayPal, content restriction, member accounts and a full role & capability editor.

== Description ==

MemberGlut turns WordPress into a membership site: sell free or paid plans, protect content, and give members a self-service account — with a modern admin that also manages user roles and capabilities.

= Plans & subscriptions =
* Free and paid plans: one-time or recurring (day, week, month, year), limited number of payments, free trials, sign-up fees.
* Access for a fixed length, until a date, for a calendar year or forever.
* Plan groups with upgrade and downgrade paths (upgrades now, downgrades at the end of the period).
* Member limits (“Sold out”), who can buy a plan, approval by email or by an administrator.
* Each plan can give a WordPress role, keep or replace existing roles, and set a role when it ends.

= Payments =
* Stripe (cards, Apple Pay, Google Pay, Payment Element, 3-D Secure), PayPal (one-time and subscriptions), bank transfer and manual payments.
* Coupons: percent or fixed, per plan, dates, total and per-member limits, first payment or every payment, CSV import.
* Failed-payment retries and on-hold status, refunds from the admin, receipts and a thank-you page.
* Test mode switch for every gateway.

= Content restriction =
* Rules for posts, pages, custom post types, categories, tags, custom taxonomies, URLs and the whole site.
* Per-post access settings in the block editor and the classic editor.
* Teasers, custom messages, redirects, hide locked posts from lists, menu items and widgets.
* “Members-only content” block, block visibility on any block, and the [memberglut_restrict] shortcode.
* Rule tester: check what any user would see on any URL.

= Members =
* Members list with filters, bulk actions, CSV export, notes, emails to members and a full activity log per member.
* My Account page: profile, password, memberships (cancel, renew, upgrade, update card), payments, login activity and account deletion — each part can be switched off.
* Registration, login, lost-password and pricing pages created in one click; custom registration fields; terms, privacy and GDPR consent.

= Security & privacy =
* Limit simultaneous sessions, lock out repeated failed logins, honeypot and timing check, Google reCAPTCHA v2/v3, hCaptcha or Cloudflare Turnstile.
* Hide the admin bar and block wp-admin by role, custom login URL.
* WordPress personal data export and erase tools include MemberGlut data.

= Roles & capabilities =
* Create, clone and edit roles; add and remove capabilities; import and export roles.

= Emails =
* 23 member and admin emails with tags, live preview, test sends and reminders before expiry, renewal and trial end.

= Tools =
* Dashboard with members, revenue, MRR, churn and a setup checklist.
* Export and import your setup (settings, plans, rules, roles, emails, coupons) between sites.
* Logs, access log, system status and maintenance tasks; Site Health integration.

= For developers =
* REST API (memberglut/v1), template overrides in yourtheme/memberglut/, many actions and filters, Action Scheduler for background work.
* Translation ready, RTL ready, WPML and Polylang compatible.

== Installation ==

1. Install the plugin from Plugins › Add New, or upload the `memberglut` folder to `/wp-content/plugins/`.
2. Activate it.
3. Open MemberGlut › Dashboard and follow the “Get started” checklist: create the membership pages, a plan, a payment method and a content rule.

== Frequently Asked Questions ==

= Do I need a payment gateway? =

Only for paid plans. Free plans, content restriction, member accounts and the role editor work without one.

= Which pages does MemberGlut need? =

Registration, Login, My Account and Lost password (Pricing and Thank-you are optional). Forms & Pages › “Create pages” makes them for you.

= Can I override the templates? =

Yes. Copy any file from `wp-content/plugins/memberglut/templates/` to `wp-content/themes/your-theme/memberglut/` and edit it there.

= Does it work with caching plugins? =

Yes. Member pages send no-cache headers and are excluded from WP Rocket and LiteSpeed Cache automatically (Global Settings › Advanced).

= I used MemberGlut 1.x. What happens to my data? =

Plans, memberships, per-post restrictions and settings are moved to the new system automatically when you update. The old shortcodes keep working. Please back up your database before updating.

= What happens to my data if I delete the plugin? =

Nothing is removed unless you turn on Global Settings › Advanced › “Delete all data when the plugin is deleted”.

== External services ==

MemberGlut connects to the services below only when you turn them on. Nothing is sent to any of them by default.

= Stripe =
Used to take card payments when the Stripe gateway is enabled. When a member pays, their email, name, the plan and the amount are sent to Stripe from your server (api.stripe.com), and the Stripe.js library is loaded from js.stripe.com on the checkout and account pages so card details go straight to Stripe. Stripe sends payment notifications (webhooks) back to your site.
[Terms of service](https://stripe.com/legal/ssa) · [Privacy policy](https://stripe.com/privacy)

= PayPal =
Used to take PayPal payments when the PayPal gateway is enabled. The plan and amount (and the member's email for subscriptions) are sent to PayPal from your server (api-m.paypal.com), and the PayPal JavaScript SDK is loaded from www.paypal.com on the checkout page. PayPal sends payment notifications (webhooks) back to your site.
[User agreement](https://www.paypal.com/legalhub/useragreement-full) · [Privacy statement](https://www.paypal.com/myaccount/privacy/privacyhub)

= Google reCAPTCHA =
Used when reCAPTCHA is chosen in Global Settings › Captcha, on the forms you select. The script is loaded from www.google.com and the visitor's answer and IP address are sent to Google to be checked when the form is submitted.
[Terms of service](https://policies.google.com/terms) · [Privacy policy](https://policies.google.com/privacy)

= hCaptcha =
Used when hCaptcha is chosen in Global Settings › Captcha. The script is loaded from js.hcaptcha.com and the visitor's answer and IP address are sent to hCaptcha (api.hcaptcha.com) when the form is submitted.
[Terms of service](https://www.hcaptcha.com/terms) · [Privacy policy](https://www.hcaptcha.com/privacy)

= Cloudflare Turnstile =
Used when Turnstile is chosen in Global Settings › Captcha. The script is loaded from challenges.cloudflare.com and the visitor's answer and IP address are sent to Cloudflare when the form is submitted.
[Terms of service](https://www.cloudflare.com/website-terms/) · [Privacy policy](https://www.cloudflare.com/privacypolicy/)

== Screenshots ==

1. Dashboard with members, revenue and the setup checklist.
2. Plan editor.
3. Content rule editor with the rule tester.
4. Members list and member details.
5. Payments and coupons.
6. My Account page.
7. Role and capability editor.

== Changelog ==

= 2.0.0 =
* New: membership plans with one-time and recurring billing, trials, sign-up fees, plan groups, upgrades and downgrades.
* New: Stripe, PayPal, bank transfer and manual payments; coupons; refunds; receipts.
* New: content rules for any content type, taxonomy, URL or the whole site, rule tester, block visibility and members-only block.
* New: My Account page with self-service memberships, payments, activity and account deletion.
* New: registration, login, lost-password and pricing pages and blocks; custom registration fields; agreements and GDPR consent.
* New: 23 customizable emails with reminders.
* New: session limits, failed-login lockout, captcha, privacy export/erase.
* New: dashboard, setup export/import, logs, access log, system status and maintenance tools.
* New: REST API, template overrides, WPML/Polylang support, uninstall option.
* Changed: completely new admin; data from 1.x is migrated automatically and old shortcodes keep working.

= 1.1.5 =
* Whole-site login control, shortcode documentation, login form styles.

= 1.0.5 =
* Role management and content restriction improvements.

= 1.0.0 =
* Initial release.

== Upgrade Notice ==

= 2.0.0 =
Major update with plans, payments and a new admin. Your 1.x data is migrated automatically — please back up your database before updating.
