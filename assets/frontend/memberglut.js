/**
 * MemberGlut front end: AJAX forms, password toggle and strength meter, captcha tokens, plan picker.
 * Forms also work without JavaScript (they post back to the page).
 * Checkout code hooks in through window.memberglut.hooks (see memberglut-checkout.js).
 */
(function () {
	'use strict';
	var cfg = window.memberglutFront || {};
	var i18n = cfg.i18n || {};
	var hooks = { beforeSubmit: [], afterSubmit: [] };
	window.memberglut = window.memberglut || {};
	window.memberglut.hooks = hooks;

	function qs(el, sel) { return el.querySelector(sel); }
	function qsa(el, sel) { return Array.prototype.slice.call(el.querySelectorAll(sel)); }

	/* Password visibility */
	document.addEventListener('click', function (e) {
		var btn = e.target.closest && e.target.closest('[data-mg-toggle]');
		if (!btn) { return; }
		var input = btn.parentNode.querySelector('input');
		if (!input) { return; }
		var show = input.type === 'password';
		input.type = show ? 'text' : 'password';
		btn.setAttribute('aria-label', show ? (i18n.hide || 'Hide password') : (i18n.show || 'Show password'));
		btn.classList.toggle('is-on', show);
	});

	/* Strength meter (uses WordPress zxcvbn when loaded) */
	document.addEventListener('input', function (e) {
		var input = e.target;
		if (!input.matches || !input.matches('input[data-mg-strength]')) { return; }
		var wrap = input.closest('.mg-field');
		var meter = wrap && qs(wrap, '.mg-strength');
		if (!meter) { return; }
		var v = input.value;
		var score = 0;
		if (window.wp && wp.passwordStrength && wp.passwordStrength.meter) {
			score = Math.max(0, wp.passwordStrength.meter(v, wp.passwordStrength.userInputDisallowedList ? wp.passwordStrength.userInputDisallowedList() : [], v));
		} else {
			score = (v.length >= 8) + (/[a-z]/.test(v) && /[A-Z]/.test(v)) + /\d/.test(v) + /[^a-zA-Z0-9]/.test(v);
		}
		var labels = [i18n.veryWeak, i18n.veryWeak, i18n.weak, i18n.medium, i18n.strong];
		meter.setAttribute('data-score', v ? score : '');
		qs(meter, '.mg-strength-text').textContent = v ? (labels[score] || '') : '';
	});

	/* Plan picker → let the payment section know which plan is chosen */
	function selectedPlan(form) {
		var r = qs(form, 'input[name="plan"]:checked') || qs(form, 'select[name="plan"]') || qs(form, 'input[type="hidden"][name="plan"]');
		if (!r) { return null; }
		var opt = r.tagName === 'SELECT' ? r.options[r.selectedIndex] : r;
		return { id: r.value, type: opt ? opt.getAttribute('data-mg-plan-type') : '' };
	}
	window.memberglut.selectedPlan = selectedPlan;
	function planChanged(form) {
		var p = selectedPlan(form);
		form.setAttribute('data-plan-type', p && p.type ? p.type : '');
		form.dispatchEvent(new CustomEvent('memberglut:plan', { detail: p }));
	}
	document.addEventListener('change', function (e) {
		var form = e.target.closest && e.target.closest('form[data-mg-form]');
		if (form && e.target.name === 'plan') { planChanged(form); }
	});

	/* Errors */
	function clearErrors(form) {
		qsa(form, '.mg-field.has-error').forEach(function (f) { f.classList.remove('has-error'); });
		qsa(form, '.mg-field-error').forEach(function (s) { s.innerHTML = ''; });
	}
	function notices(form) {
		var wrap = form.parentNode.querySelector('.mg-notices');
		if (!wrap) {
			wrap = document.createElement('div');
			wrap.className = 'mg-notices';
			form.parentNode.insertBefore(wrap, form);
		}
		return wrap;
	}
	function notice(form, type, html) {
		var n = notices(form);
		n.innerHTML = html ? '<div class="mg-notice mg-notice-' + type + '" role="' + (type === 'error' ? 'alert' : 'status') + '"></div>' : '';
		if (html) {
			n.firstChild.innerHTML = html; // Server messages are escaped (links allowed).
			n.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}
	function showErrors(form, fields) {
		var first = null;
		Object.keys(fields || {}).forEach(function (key) {
			var field = qs(form, '[data-field="' + key + '"]');
			if (!field) { return; }
			field.classList.add('has-error');
			var span = qs(field, '.mg-field-error');
			if (span) { span.innerHTML = fields[key]; }
			first = first || field;
		});
		if (first) {
			var input = qs(first, 'input,select,textarea');
			if (input) { input.focus({ preventScroll: true }); }
			first.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}
	window.memberglut.notice = notice;
	window.memberglut.showErrors = showErrors;

	function busy(form, on) {
		var btn = qs(form, '.mg-submit');
		form.classList.toggle('is-busy', on);
		if (btn) {
			btn.disabled = on;
			btn.textContent = on ? '…' : btn.getAttribute('data-mg-label');
		}
	}
	window.memberglut.busy = busy;

	/* reCAPTCHA v3: fetch a token right before submitting */
	function captchaToken(form) {
		var field = qs(form, 'input[data-mg-recaptcha-v3]');
		if (!field || !window.grecaptcha) { return Promise.resolve(); }
		return new Promise(function (resolve) {
			grecaptcha.ready(function () {
				grecaptcha.execute(field.getAttribute('data-mg-recaptcha-v3'), { action: field.getAttribute('data-action') || 'submit' }).then(function (t) {
					field.value = t;
					resolve();
				}, resolve);
			});
		});
	}

	function endpoint(form) {
		return (cfg.rest || '/wp-json/memberglut/v1/public/') + form.getAttribute('data-mg-form').replace(/_/g, '-');
	}

	function post(url, form, extra) {
		var body = new FormData(form);
		Object.keys(extra || {}).forEach(function (k) { body.append(k, extra[k]); });
		return fetch(url, { method: 'POST', body: body, credentials: 'same-origin', headers: { 'X-WP-Nonce': cfg.nonce || '' } })
			.then(function (res) {
				return res.json().catch(function () { return {}; }).then(function (data) { return { ok: res.ok, data: data }; });
			});
	}
	window.memberglut.post = post;

	document.addEventListener('submit', function (e) {
		var form = e.target;
		if (!form.matches || !form.matches('form[data-mg-ajax="1"]') || !window.fetch || !window.FormData) { return; }
		e.preventDefault();
		if (form.classList.contains('is-busy')) { return; }
		clearErrors(form);
		notice(form, '', '');
		busy(form, true);
		var ctx = { form: form, extra: {}, abort: false };
		var chain = captchaToken(form);
		hooks.beforeSubmit.forEach(function (fn) { chain = chain.then(function () { return fn(ctx); }); });
		chain.then(function () {
			if (ctx.abort) { busy(form, false); return null; }
			return post(endpoint(form), form, ctx.extra);
		}).then(function (r) {
			if (!r) { return; }
			if (!r.ok) {
				busy(form, false);
				var fields = r.data && r.data.data && r.data.data.fields;
				if (fields && Object.keys(fields).length) { showErrors(form, fields); }
				notice(form, 'error', (r.data && r.data.message) || i18n.error);
				if (window.grecaptcha && qs(form, '.g-recaptcha')) { grecaptcha.reset(); }
				if (window.hcaptcha && qs(form, '.h-captcha')) { hcaptcha.reset(); }
				if (window.turnstile && qs(form, '.cf-turnstile')) { turnstile.reset(); }
				return;
			}
			var res = r.data || {};
			var handled = false;
			hooks.afterSubmit.forEach(function (fn) { handled = fn(res, form) || handled; });
			if (handled) { return; }
			if (res.redirect) {
				window.location.href = res.redirect;
				return;
			}
			busy(form, false);
			if (res.message) {
				notice(form, 'success', res.message.replace(/</g, '&lt;'));
				if (form.getAttribute('data-mg-form') !== 'login') { form.style.display = 'none'; }
			}
		}).catch(function () {
			busy(form, false);
			notice(form, 'error', i18n.error);
		});
	});

	/* Confirm before destructive account actions (cancel, remove, delete). */
	document.addEventListener('submit', function (e) {
		var form = e.target;
		var msg = form.getAttribute && form.getAttribute('data-mg-confirm');
		if (msg && !window.confirm(msg)) { e.preventDefault(); e.stopImmediatePropagation(); }
	}, true);

	document.addEventListener('DOMContentLoaded', function () {
		qsa(document, 'form[data-mg-form]').forEach(planChanged);
	});
}());
