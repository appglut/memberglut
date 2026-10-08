> Legend: **§2.x** = cross-section rule in [01-dependency-map.md](01-dependency-map.md) · **00-overview §0.x/§1.x** = audit/architecture · numbered headings like “7.3” are local to the phase file · **D#** = decision in [02-decisions.md](02-decisions.md) · **Pn** = `phase-NN-*.md` · Option keys are listed in [appendix-a-option-registry.md](appendix-a-option-registry.md).

# Phase 17 — QA, WordPress.org compliance, release

| | |
|---|---|
| **Depends on** | all phases |
| **Unlocks** | release |


* **Automated:** PHPUnit (WP test suite) for settings sanitisation, subscription state machine, expiry maths, role sync, access engine matrix, pricing maths, coupon validation, webhook signature verification, migration. JS: unit tests for `format.js`, API layer.
* **Manual matrix:** each phase’s acceptance list; block themes (Twenty Twenty-Five) + classic theme; Elementor page; multisite; PHP 7.4 and 8.3; WP 6.x and 7.0; logged-out/cache-on scenarios.
* **Security pass:** `/security-review`, PHPCS WordPress + Plugin Check plugin, `php -l` on all files, every REST route permission callback reviewed, every `$wpdb` call prepared, every echo escaped, no `eval`/remote code, nonces on forms.
* **Guideline 5:** no locked features, no license checks.
* **Release:** build (`npm run build`), exclude `node_modules`, `assets/src`, `*.html` research, `Errors_from_team.txt`, this plan, tests from the zip; readme “External services” (Stripe, PayPal, Google reCAPTCHA, hCaptcha, Cloudflare Turnstile); version bump + changelog + upgrade notice (“database update — back up first”).

---

## Cross-section regression checklist (run after every phase, not only at the end)

- [ ] Change each option in Appendix A and verify **every consumer listed** for it.
- [ ] Approval chain §2.1 (all 3 modes × free/paid plan).
- [ ] Page slots §2.2: unset a page → every consumer falls back gracefully (no fatal, no broken links).
- [ ] Redirect precedence §2.4 table, each row.
- [ ] Plan delete/deactivate cascade §2.3.
- [ ] Status → access table §2.7.
- [ ] Restriction precedence §2.8 with per-post + 2 overlapping rules.
- [ ] Currency format identical in admin, front, emails, CSV.
- [ ] Logging toggles in Settings and Tools stay in sync §2.12.

## Step-by-step
- [ ] 1. PHPUnit + JS tests green.
- [ ] 2. Plugin Check + PHPCS + `php -l`.
- [ ] 3. `/security-review`.
- [ ] 4. Manual matrix (themes, PHP/WP versions, multisite, cache).
- [ ] 5. Build zip without dev files; readme + external services + changelog.
