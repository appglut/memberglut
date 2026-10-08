=== MemberGlut - Membership, Roles & Content Restriction ===
Contributors: appglut
Tags: membership, subscriptions, content restriction, paywall, user roles
Requires at least: 6.2
Tested up to: 7.1
Stable tag: 2.0.0
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Sell memberships, take payments, protect content and manage user roles — all in one free plugin.

== Description ==

MemberGlut turns your WordPress site into a membership site in minutes.

**In short:**

* ✅ Free and paid membership plans
* ✅ Stripe, PayPal and bank transfer payments
* ✅ Protect any post, page, category or the whole site
* ✅ A ready-made “My Account” page for members
* ✅ Registration, login and pricing pages in one click
* ✅ Full user role & capability editor
* ✅ 23 ready-to-use emails
* ✅ Everything below is free — no locked features

= 📦 Membership Plans =

* Free or paid plans
* One-time payment or recurring (daily, weekly, monthly, yearly)
* Free trials
* Sign-up fees
* Limit the number of payments (e.g. 12 monthly payments)
* Access for a set time, until a date, for a calendar year, or forever
* Limit how many members can join a plan (“Sold out”)
* Choose who can buy a plan (anyone, new members, or members of other plans)
* Plan groups with upgrade and downgrade paths
* Upgrades start right away, downgrades at the end of the period
* Give a WordPress role with each plan
* Set a different role when the plan ends
* Duplicate, reorder, activate or deactivate plans
* Copy a sign-up link for any plan

= 💳 Payments =

* Stripe: cards, Apple Pay, Google Pay, 3-D Secure
* PayPal: one-time payments and subscriptions
* Bank transfer with your own instructions
* Manual payments recorded by the admin
* Test mode for safe testing
* Automatic retries when a renewal payment fails
* Refunds from the admin (full or partial)
* Receipts and a thank-you page
* Members can update their card
* Payments list with filters, totals and CSV export

= 🏷️ Coupons =

* Percent or fixed amount off
* Limit to certain plans
* Start and end dates
* Total uses and uses per member
* First payment only or every payment
* New customers only
* Import coupons from CSV

= 🔒 Content Restriction =

* Protect posts, pages and custom post types
* Protect categories, tags and custom taxonomies
* Protect child pages, authors, page templates and URL patterns
* Make the whole site members-only (with public pages you choose)
* Per-post access settings in the block editor and classic editor
* Show a teaser, a custom message, a login form, or redirect
* Hide locked posts from blog lists, archives, search, sitemaps and the REST API
* Show or hide menu items and widgets by plan, role or login state
* Show or hide any block by plan or role
* “Members-only content” block and shortcode
* Rule tester: see what any user would see on any URL
* Administrators always keep access

= 👤 Member Account Page =

* Dashboard with current memberships
* Edit profile (with email change confirmation)
* Change password
* View, cancel, renew and upgrade memberships
* Update payment card
* Payment history with receipts
* Login activity and “log out other devices”
* Delete account (optional)
* Turn each tab on or off

= 📝 Registration & Login =

* Registration, login, lost password, account, pricing and thank-you pages created in one click
* Custom registration fields (text, select, checkbox, date, country and more)
* Login with email, username or both
* Password strength rules and strength meter
* Terms, privacy and GDPR consent checkboxes
* Approve new members manually or by email confirmation
* Custom login URL and redirect away from wp-login.php
* Redirects after login, logout and registration (also per role)
* Pricing table with cards, comparison or list layout

= 🛡️ Security =

* Limit how many devices a member can use at once
* Lock out after too many failed logins
* Honeypot spam protection
* Google reCAPTCHA (v2 / v3), hCaptcha or Cloudflare Turnstile
* Hide the admin bar by role
* Block wp-admin by role
* Login history for every member

= 🔐 Privacy & GDPR =

* WordPress “Export Personal Data” includes membership data
* WordPress “Erase Personal Data” removes or anonymises it
* Consent records with date and IP
* Suggested privacy policy text

= 👥 Members Management =

* Members list with search, filters and bulk actions
* Add members and give or remove plans by hand
* Extend, put on hold, cancel or change a member’s plan
* Private notes on members
* Full activity history for every member
* Send an email to members of chosen plans
* Export members to CSV
* Turn existing users into members in one click

= 🎭 Roles & Capabilities =

* Create, edit, clone and delete roles
* Add and remove capabilities
* Set the default role for new users
* Import and export roles

= ✉️ Emails =

* 23 emails for members and admins (welcome, receipt, renewal, expiry, cancel…)
* Edit subject and text with smart tags
* Live preview and test send
* Reminders before expiry, renewal and trial end
* Your own sender name, address and footer

= 📊 Dashboard & Tools =

* Dashboard: active members, revenue, MRR, churn and a 12-month chart
* Setup checklist for new sites
* Recent activity
* Export / import your setup to another site (settings, plans, rules, roles, emails, coupons)
* Logs and access log
* System status and Site Health checks
* Maintenance tools (run expirations, recount, sync roles, clear cache)

= 🧩 Shortcodes & Blocks =

* [memberglut_register] — registration and checkout
* [memberglut_login] — login form
* [memberglut_account] — My Account page
* [memberglut_plans] — pricing table
* [memberglut_restrict]…[/memberglut_restrict] — members-only content
* [memberglut_member], [memberglut_expiry], [memberglut_members], [memberglut_count] and more
* Every shortcode is also a block

= ⚙️ For Developers =

* REST API
* Template overrides in your theme
* 100+ actions and filters
* Background jobs with Action Scheduler
* Translation ready, RTL ready, WPML and Polylang compatible
* Works with caching plugins (member pages are never cached)
* Multisite compatible

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
