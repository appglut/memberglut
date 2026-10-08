> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 9 — Checkout, gateways, coupons, payments

| | |
|---|---|
| **Depends on** | P1 (payments settings), P2 (plan pricing fields), P4 (activation/renewal), P5 (receipts), P8 (register form hosts checkout) |
| **Unlocks** | P10 update card / renew / change plan, P12 revenue & MRR |
| **Screens** | Payments (`Payments.jsx`), Coupons (`Coupons.jsx`), Settings › Payments, front-end checkout & thank-you page |


### 9.1 Pricing maths (`MemberGlut_Pricing`)
One function returns the order summary used by checkout UI, gateways and payments rows: subtotal (plan price), signup fee (first payment / plan change with `fee_on_change`), coupon discount (on plan price; first payment or recurring), trial (first charge 0 + fee?) — **Decision: signup fee is charged at trial start**, total, recurring amount, currency rules (zero-decimal currencies JPY/KRW ignore `decimals`; Stripe amounts in minor units). Filter `memberglut_order_summary` (Pro tax, proration).

### 9.2 Gateway abstraction
`MemberGlut_Gateway` (id, title, supports: one_time, recurring, refunds, update_card, trial; `is_available( $plan )`; `process_checkout( $order )`; `handle_webhook( $request )`; `refund( $payment, $amount )`; `cancel_subscription( $sub )`; `get_mode()`). Registry filter `memberglut_gateways` (Pro adds more). Webhook routes `POST /webhook/{gateway}` (public, signature-verified). Store `last_webhook_at` per gateway for System status.

### 9.3 Stripe (`stripe_*`)
* Keys per effective mode (D5); `stripe_enabled`.
* Checkout: Payment Element (Stripe.js from js.stripe.com — declare in readme). One-time → PaymentIntent; recurring → Customer + Subscription (`payment_behavior=default_incomplete`, expand `latest_invoice.payment_intent`), trial → SetupIntent / `trial_end`; signup fee → `add_invoice_items`; coupon → Stripe Coupon created lazily per MemberGlut coupon (`duration: once|forever`, percent/amount_off in currency); Products/Prices created lazily per plan + price + currency + mode, stored in plan settings; price change → new Price (existing subs keep old price).
* `stripe_wallets`: Payment Element `wallets` option on/off (Apple Pay domain verification note in the field tip).
* `stripe_webhook_secret`: verify `Stripe-Signature` (HMAC-SHA256, 5-minute tolerance). Events: `payment_intent.succeeded/payment_failed`, `invoice.paid` (renewal → `renew`, count cycles), `invoice.payment_failed` (→ retry logic D6, `payment_failed` email), `customer.subscription.updated` (cancel_at_period_end, status), `customer.subscription.deleted` (→ expire), `charge.refunded` (→ refund flow), `setup_intent.succeeded`. Idempotency via event id stored in `logs`/transient.
* `stripe_save_cards`: account “Update payment method” → SetupIntent → set default payment method on customer + subscription.
* No Stripe PHP SDK: small `wp_remote_request` client (keeps the plugin light).

### 9.4 PayPal (`paypal_*`)
JS SDK buttons; one-time → Orders v2 create/capture; recurring → Catalog Product + Billing Plan per plan/price (lazy), Subscriptions API (trial cycle, `setup_fee`, coupon via `plan` override in subscription create); webhooks verified with `paypal_webhook_id` (D19) through `/v1/notifications/verify-webhook-signature`; events `PAYMENT.CAPTURE.COMPLETED`, `PAYMENT.SALE.COMPLETED` (renewal), `BILLING.SUBSCRIPTION.ACTIVATED/CANCELLED/SUSPENDED/PAYMENT.FAILED`, `PAYMENT.CAPTURE.REFUNDED`; refunds via captures API.

### 9.5 Bank transfer (`bank_*`)
`bank_title` at checkout; `bank_instructions` shown on the thank-you page and in `pending_manual` (`{bank_details}`); `bank_activate` on_confirm → subscription `pending` until “Mark as paid”; now → `active` immediately with payment `pending`. Recurring: D8.

### 9.6 Free / 100 % discount
Gateway `free`: skips payment, still records a 0 payment row only if a coupon made it free (for coupon usage tracking).

### 9.7 Checkout flow
Registration form (Phase 8) or logged-in “change/buy plan” mode → server creates `pending` subscription + `pending` payment → gateway → success callback / webhook → payment `completed` → `activate` (or keep `pending` for approval D7) → emails `receipt`, `activated`, `admin_new_payment`, `admin_new_member` → redirect (§2.4). Guards: duplicate active plan purchase blocked; `one_trial`; `who_can_buy`; `max_members`; plan active; gateway allowed for plan; CSRF; idempotent completion (webhook + return URL race).

### 9.8 Renewals & dunning (Settings › Payments › Renewals)
`retry_failed`, `retry_max`, `retry_interval`, `retry_status` (status during retries: `on_hold` or keep `active`), `refund_revokes` (full refund → `expire` + cancel gateway sub; partial refund → no access change). Implementation per D6/D8. Events + `payment_failed` email each failure; after `retry_max` → cancel at gateway + `expire`.

### 9.9 Coupons
* REST: `GET/POST /coupons`, `PUT/DELETE /coupons/{id}`, `POST /coupons/import` (CSV: `code,type,amount,plans(slugs|ids;),recurring,starts,expires,max_uses,per_user,new_users_only,enabled`; report created/skipped/errors), `POST /public/coupon/validate` (checkout AJAX).
* Every drawer field: code (uppercase, unique, `Generate` random 8 chars), type/amount (percent ≤ 100), plans (empty = all paid plans), recurring (first vs every payment), starts/expires (site TZ dates), max_uses (0 = ∞), per_user (by user id, and by email for guests), new_users_only (no previous completed payment / subscription), enabled.
* Computed status: inactive (disabled) → scheduled (starts in future) → expired (past expiry **or** uses ≥ max_uses) → active.
* `uses` incremented on completed payment (not on pending), `coupon_uses` row; refund does not decrement (configurable filter).
* Payments rows store `coupon_code`.

### 9.10 Currency & test mode (Settings › Payments › General)
`currency`, `currency_position`, `thousand_sep`, `decimal_sep`, `decimals` → PHP `memberglut_format_price()` + JS `money()` (lookups). Validate the currency is supported by enabled gateways (PayPal currency list) and warn. `test_mode` → D5 + admin notice on all admin pages + “TEST” badge on checkout for admins.

### 9.11 Payments screen
* `GET /payments?status=&gateway=&search=&from=&to=&user=&page=` (server-side), `GET /payments/summary` (stat cards by status, honour filters), `GET /payments/{id}` (with events log for the drawer timeline — replace fake timeline), `POST /payments` (manual payment: member, plan, amount, status, date, note; checkbox in initialValues `activate: true` has **no field in the modal** — add “Activate/extend the plan” switch → creates or renews the subscription), `POST /payments/{id}/mark-paid` (bank: completes payment + activates/renews), `POST /payments/{id}/refund` (gateway refund; `refund_revokes`), `POST /payments/{id}/resend-receipt`, `GET /payments/export` CSV.
* Transaction ID links to gateway dashboard (Stripe/PayPal URLs per mode).
* Summary row = completed total on page (already client-side; fine).

**Acceptance:** Stripe + PayPal sandbox end-to-end for one-time, recurring, trial, fee, coupon (first/every), renewal, failure → retry → recovery/expiry, refund (dashboard and admin); bank on_confirm/now; webhooks replay-safe.

---

## Option relations

| Item | Reads / affects | Section |
|---|---|---|
| Order summary | plan price, `signup_fee`, `fee_on_change`, trial, coupon, currency rules | P2, P1 |
| Methods at checkout | plan `gateways` ∩ `stripe_enabled`/`paypal_enabled`/`bank_enabled` | P2, P1 (§2.6) |
| Gateway keys/mode | `test_mode` + gateway mode (D5) | P1 |
| Bank | `bank_title`, `bank_instructions` (thank-you + `pending_manual`), `bank_activate`, D8 | P1, P5 |
| Renewal failures | `retry_*` (D6) → `on_hold`/`active`, `payment_failed` email | P1, P4, P5 |
| Refund | `refund_revokes` → expire | P1, P4 |
| Coupon plans | plan list (paid only); plan delete cascade | P2 |
| Coupon `new_users_only`, `per_user` | payments/subscriptions history | — |
| Guards | `who_can_buy`, `max_members`, `one_trial`, plan status, one plan per group | P2 |
| Activation after payment | approval pending (D7) | P8 |
| Redirect after payment | §2.4 (`page_thanks`, plan redirect, `redirect_to`) | P8 |
| Admin “Add manual payment” | can create/extend subscription | P4 |
| Status webhooks timestamp | Tools System status | P13 |
| Checklist “Connect a payment gateway” | gateway enabled + keys | P12 |
| Update card | `stripe_save_cards` | P10 |

## Step-by-step

- [ ] 1. `MemberGlut_Pricing` order summary + zero-decimal currency handling + tests.
- [ ] 2. Gateway abstraction, registry, webhook route, idempotency store, `last_webhook_at`.
- [ ] 3. Checkout orchestration (pending sub + pending payment → gateway → completion) with all guards.
- [ ] 4. Free / 100 % coupon gateway.
- [ ] 5. Stripe: client, products/prices/coupons lazy creation, Payment Element, one-time, subscription, trial, fee, webhooks, refunds, update card.
- [ ] 6. Bank transfer + thank-you page + mark paid + bank renewals (D8).
- [ ] 7. PayPal: orders, subscriptions, webhooks (needs `paypal_webhook_id`), refunds.
- [ ] 8. Renewals/dunning logic (D6) + `refund_revokes`.
- [ ] 9. Coupons REST, CSV import, validation endpoint, status computation, usage tracking.
- [ ] 10. Payments REST (list, summary, detail with events, manual payment + “activate plan” switch, mark paid, refund, resend receipt, export).
- [ ] 11. `memberglut_format_price()` + JS `money()`; test-mode admin notice & checkout badge.
- [ ] 12. `[memberglut_receipt]`.
- [ ] 13. Readme “External services” for Stripe/PayPal.

## Definition of done
- Sandbox end-to-end for every scenario in the Acceptance line above; webhooks replay-safe; currency display identical in admin, front and emails.
