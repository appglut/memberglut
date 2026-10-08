# Smoke tests

End-to-end scripts that exercise each area through the real services and REST API on a development site.
They print one line per check and clean up the data they create. They are not shipped in the release zip.

```
php tests/smoke/boot.php tests/smoke/checkout.php
```

| Script | Covers |
|---|---|
| `auth.php` | registration, login, lost/reset password, admin approval |
| `checkout.php` | coupons (REST + CSV import), bank checkout, mark paid, receipts, refunds, 100 % coupons, manual payments, permissions, Stripe with mocked HTTP, webhook signatures |
| `stripe-webhooks.php` | invoice.paid (first + renewal), replay idempotency, subscription deleted |
| `account.php` | account tabs, profile + email change, password, renewal, cancel/abandon gating, member shortcodes, account deletion |
| `security-privacy.php` | failed-login lockout, session limits, login history, GDPR export/erase |
| `dashboard.php` | dashboard numbers, snapshot, checklist, event filters |
| `tools.php` | status, logs, setup export/import with plan remapping, convert users, maintenance confirmations, Site Health |
| `blocks.php` | block registration, server rendering, members-only wrapper, ServerSideRender endpoint |

Set `WP_LOAD=/path/to/wp-load.php` when the plugin is not inside `wp-content/plugins/`.
