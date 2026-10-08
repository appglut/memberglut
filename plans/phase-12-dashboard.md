> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 12 — Dashboard & statistics

| | |
|---|---|
| **Depends on** | P4, P6, P7 (paywall stats), P9 (payments), P0 (`stats_daily`, events) |
| **Unlocks** | — |
| **Screen** | Dashboard (`Dashboard.jsx`) |


* `GET /dashboard/stats`: `active_members` (distinct users with access), `pending` (accounts awaiting approval), `revenue_month` + `revenue_change` (vs previous month, completed − refunds, site TZ), `mrr` (sum of active recurring subs normalised to monthly: day×30.44, week×4.345, year÷12), `new_members_30d` + change, `canceled_30d`, `expiring_7d`, `churn` (cancellations this month ÷ active at month start), `chart` 12 months `{month, members, revenue}` from `stats_daily` snapshots (backfill from subscriptions/payments on first run).
* `GET /dashboard/checklist`: pages set (all 6 or the 4 essentials), a paid active plan exists, a gateway is enabled with keys, any active rule or per-post restriction exists, emails reviewed flag. **Fix links:** `plan` → plan editor, `rule` → rule editor, `pages` → forms, `gateway` → settings `tab=payments`, `emails` → emails (current code sends `plan` and `rule` to Forms).
* Members by plan (from `/plans`), recent activity (`GET /events?limit=7`), shortcode card (static).
* Event-type icons map already exists; ensure event types match (`grant, payment, cancel, expire, pending, login`).
* Cache stats in a transient (5 min), cleared on subscription/payment changes; Tools › “Recount members” rebuilds.

---

## Option relations

| Dashboard element | Source | Section |
|---|---|---|
| Active members, expiring 7d, churn, members by plan | subscriptions + access statuses | P4 |
| Pending approval | account status | P8 (§2.1) |
| Revenue, MRR, chart | payments, plan billing intervals, `stats_daily`, currency format | P9, P2, P1 |
| Checklist: pages | Forms page slots | P8 |
| Checklist: paid plan | plans | P2 |
| Checklist: gateway | `stripe_*`/`paypal_*`/`bank_*` | P9 |
| Checklist: protect content | rules + per-post meta | P7 |
| Checklist: emails | Emails “reviewed” flag | P5 |
| Recent activity | events | P0 |
| Cache invalidation | subscription/payment changes; Tools “Recount members” | P13 |

## Step-by-step

- [ ] 1. `GET /dashboard/stats` with the definitions above; transient cache + invalidation.
- [ ] 2. Daily snapshot job + backfill from history.
- [ ] 3. `GET /dashboard/checklist`; fix the “Do it” link map.
- [ ] 4. Wire `Dashboard.jsx` (stats, plans, events, checklist).

## Definition of done
- Numbers match Members/Payments screens for the same period.
