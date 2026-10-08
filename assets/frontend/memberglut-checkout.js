/**
 * MemberGlut checkout: order summary + coupon, payment method per plan, Stripe Payment Element, PayPal buttons.
 * Stripe.js and the PayPal SDK are loaded only when the buyer pays with them.
 */
(function () {
	'use strict';
	var cfg = window.memberglutCheckout || {};
	var i18n = cfg.i18n || {};
	var mg = window.memberglut;
	if (!mg) { return; }

	function qs(el, sel) { return el.querySelector(sel); }
	function qsa(el, sel) { return Array.prototype.slice.call(el.querySelectorAll(sel)); }
	function postJSON(path, body) {
		return fetch(cfg.rest + path, {
			method: 'POST', credentials: 'same-origin',
			headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': (window.memberglutFront || {}).nonce || '' },
			body: JSON.stringify(body)
		}).then(function (r) { return r.json().then(function (d) { if (!r.ok) { throw d; } return d; }); });
	}
	function loadScript(src) {
		return new Promise(function (resolve, reject) {
			var existing = document.querySelector('script[src="' + src + '"]');
			if (existing && existing.getAttribute('data-loaded')) { resolve(); return; }
			var s = existing || document.createElement('script');
			s.src = src;
			s.async = true;
			s.addEventListener('load', function () { s.setAttribute('data-loaded', '1'); resolve(); });
			s.addEventListener('error', reject);
			if (!existing) { document.head.appendChild(s); }
		});
	}

	/* ------------------------------------------------------------------
	 * Summary, coupon and methods follow the chosen plan
	 * ---------------------------------------------------------------- */
	function refresh(form, withCoupon) {
		var box = qs(form, '[data-mg-checkout]');
		var plan = mg.selectedPlan(form);
		if (!box || !plan || !plan.id || plan.type !== 'paid') { return Promise.resolve(); }
		var coupon = qs(form, 'input[name="coupon"]');
		var email = qs(form, 'input[name="mg[email]"]');
		return postJSON('summary', { plan: plan.id, coupon: withCoupon && coupon ? coupon.value : '', email: email ? email.value : '' }).then(function (d) {
			qs(box, '[data-mg-summary]').innerHTML = d.html;
			box.classList.toggle('no-payment', !d.needs_payment);
			qsa(box, '.mg-gateway-option').forEach(function (opt) {
				var ok = (opt.getAttribute('data-plans') || '').split(',').indexOf(String(plan.id)) !== -1;
				opt.hidden = !ok;
				if (!ok) { qs(opt, 'input').checked = false; }
			});
			var first = qsa(box, '.mg-gateway-option:not([hidden]) input');
			if (first.length && !first.some(function (i) { return i.checked; })) { first[0].checked = true; }
			showNote(form);
			var field = qs(box, '[data-field="coupon"]');
			field.classList.toggle('has-error', !!d.coupon_error);
			qs(field, '.mg-field-error').textContent = d.coupon_error || (d.coupon_ok ? i18n.couponOk : '');
			field.classList.toggle('is-ok', !!d.coupon_ok);
		}).catch(function () {});
	}
	function showNote(form) {
		var chosen = qs(form, 'input[name="gateway"]:checked');
		qsa(form, '[data-gateway-note]').forEach(function (n) {
			n.hidden = !chosen || n.getAttribute('data-gateway-note') !== chosen.value;
		});
	}
	document.addEventListener('memberglut:plan', function (e) { refresh(e.target, true); }, true);
	document.addEventListener('change', function (e) {
		var form = e.target.closest && e.target.closest('form[data-mg-form]');
		if (form && e.target.name === 'gateway') { showNote(form); }
	});
	document.addEventListener('click', function (e) {
		var btn = e.target.closest && e.target.closest('[data-mg-apply-coupon]');
		if (!btn) { return; }
		e.preventDefault();
		refresh(btn.closest('form'), true);
	});
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Enter' && e.target.name === 'coupon') {
			e.preventDefault();
			refresh(e.target.closest('form'), true);
		}
	});

	/* ------------------------------------------------------------------
	 * After the form is submitted: pay
	 * ---------------------------------------------------------------- */
	function lockForm(form) {
		qsa(form, '.mg-fields, .mg-plan-picker, .mg-coupon, .mg-gateways, .mg-agreement, .mg-actions, .mg-switch').forEach(function (el) { el.hidden = true; });
		var area = qs(form, '[data-mg-pay-area]');
		area.hidden = false;
		area.innerHTML = '<p class="mg-pay-intro">' + (i18n.payWith || '') + '</p><div class="mg-pay-element"></div><div class="mg-pay-error mg-field-error" role="alert"></div>';
		area.scrollIntoView({ behavior: 'smooth', block: 'center' });
		return area;
	}
	function payError(area, msg) {
		var e = qs(area, '.mg-pay-error');
		e.textContent = msg || i18n.failed;
	}
	function poll(payment, key, tries) {
		return postJSON('status', { payment: payment, key: key }).then(function (d) {
			if (d.status === 'completed' && d.redirect) { window.location.href = d.redirect; return; }
			if (tries > 0) { return new Promise(function (r) { setTimeout(r, 1500); }).then(function () { return poll(payment, key, tries - 1); }); }
			window.location.reload();
		});
	}

	function payStripe(form, c, res) {
		var area = lockForm(form);
		if (!cfg.stripe || !cfg.stripe.key) { payError(area, i18n.stripeError); return; }
		loadScript('https://js.stripe.com/v3/').then(function () {
			var stripe = window.Stripe(cfg.stripe.key, { locale: 'auto' });
			var elements = stripe.elements({ clientSecret: c.secret, appearance: { theme: 'stripe', variables: { colorPrimary: getComputedStyle(document.documentElement).getPropertyValue('--mg-accent').trim() || '#e94560' } } });
			var element = elements.create('payment', { wallets: cfg.stripe.wallets ? { applePay: 'auto', googlePay: 'auto' } : { applePay: 'never', googlePay: 'never' } });
			element.mount(qs(area, '.mg-pay-element'));
			var btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'mg-button mg-submit';
			btn.textContent = (res.summary && res.summary.total > 0 ? (i18n.pay || 'Pay') : (i18n.pay || 'Pay'));
			area.appendChild(btn);
			var key = new URL(c.return_url, window.location.href).searchParams.get('mg_key');
			btn.addEventListener('click', function () {
				btn.disabled = true;
				btn.textContent = i18n.processing;
				payError(area, '');
				var confirm = c.type === 'setup'
					? stripe.confirmSetup({ elements: elements, confirmParams: { return_url: c.return_url }, redirect: 'if_required' })
					: stripe.confirmPayment({ elements: elements, confirmParams: { return_url: c.return_url }, redirect: 'if_required' });
				confirm.then(function (r) {
					if (r.error) {
						btn.disabled = false;
						btn.textContent = i18n.pay;
						payError(area, r.error.message);
						return;
					}
					poll(res.payment, key, 8);
				});
			});
		}).catch(function () { payError(area, i18n.stripeError); });
	}

	function payPaypal(form, c) {
		var area = lockForm(form);
		var src = 'https://www.paypal.com/sdk/js?client-id=' + encodeURIComponent(c.client_id) + '&currency=' + encodeURIComponent(c.currency) + (c.type === 'subscription' ? '&vault=true&intent=subscription' : '&intent=capture');
		var base = { payment: c.payment, key: c.key };
		function call(op, extra) { return postJSON('paypal', Object.assign({ op: op }, base, extra || {})); }
		function done(d) { if (d.redirect) { window.location.href = d.redirect; } else { window.location.href = c.return_url; } }
		loadScript(src).then(function () {
			var opts = { style: { layout: 'vertical', label: c.type === 'subscription' ? 'subscribe' : 'pay' }, onError: function (err) { payError(area, err && err.message); }, onCancel: function () { payError(area, i18n.failed); } };
			if (c.type === 'subscription') {
				opts.createSubscription = function () { return call('create_subscription').then(function (d) { return d.id; }); };
				opts.onApprove = function (data) { return call('approve_subscription', { subscription_id: data.subscriptionID }).then(done).catch(function (e) { payError(area, e && e.message); }); };
			} else {
				opts.createOrder = function () { return call('create_order').then(function (d) { return d.id; }); };
				opts.onApprove = function (data) { return call('capture_order', { order_id: data.orderID }).then(done).catch(function (e) { payError(area, e && e.message); }); };
			}
			window.paypal.Buttons(opts).render(qs(area, '.mg-pay-element'));
		}).catch(function () { payError(area, i18n.failed); });
	}

	mg.hooks.afterSubmit.push(function (res, form) {
		var c = res && res.checkout && res.checkout.client;
		if (!c) { return false; }
		mg.busy(form, false);
		if (res.message) { mg.notice(form, 'success', String(res.message).replace(/</g, '&lt;')); }
		if (c.gateway === 'stripe') { payStripe(form, c, res.checkout); return true; }
		if (c.gateway === 'paypal') { payPaypal(form, c); return true; }
		return false;
	});

	document.addEventListener('DOMContentLoaded', function () {
		qsa(document, 'form[data-mg-form]').forEach(function (f) { if (qs(f, '[data-mg-checkout]')) { refresh(f, false); } });
	});
}());
