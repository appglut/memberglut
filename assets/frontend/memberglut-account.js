/**
 * MemberGlut account: replace the card of a Stripe subscription (SetupIntent + Payment Element).
 * Stripe.js is loaded only on this screen.
 */
(function () {
	'use strict';
	var cfg = window.memberglutAccount || {};
	var box = document.querySelector('[data-mg-card-form]');
	if (!box || !cfg.secret || !cfg.stripeKey) { return; }
	var btn = box.querySelector('.mg-submit');
	var err = box.querySelector('.mg-pay-error');
	var i18n = cfg.i18n || {};
	var s = document.createElement('script');
	s.src = 'https://js.stripe.com/v3/';
	s.async = true;
	s.onerror = function () { err.textContent = i18n.error; };
	s.onload = function () {
		var stripe = window.Stripe(cfg.stripeKey, { locale: 'auto' });
		var elements = stripe.elements({ clientSecret: cfg.secret, appearance: { theme: 'stripe' } });
		elements.create('payment').mount(box.querySelector('.mg-pay-element'));
		box.scrollIntoView({ behavior: 'smooth', block: 'center' });
		btn.addEventListener('click', function () {
			btn.disabled = true;
			btn.textContent = i18n.saving;
			err.textContent = '';
			stripe.confirmSetup({ elements: elements, confirmParams: { return_url: cfg.returnUrl } }).then(function (r) {
				// Only reached on an error; success redirects to returnUrl.
				btn.disabled = false;
				btn.textContent = i18n.save;
				err.textContent = (r.error && r.error.message) || i18n.error;
			});
		});
	};
	document.head.appendChild(s);
}());
