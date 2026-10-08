/**
 * MemberGlut blocks in the editor: each shortcode block is previewed with ServerSideRender and configured in the
 * sidebar; “Members-only content” wraps inner blocks. Written against the wp.* globals so it needs no build step.
 */
(function (wp, cfg) {
	'use strict';
	if (!wp || !wp.blocks || !cfg) {
		return;
	}
	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var __ = wp.i18n.__;
	var C = wp.components;
	var BE = wp.blockEditor;
	var SSR = wp.serverSideRender;

	function control(key, a, value, set) {
		var common = { key: key, label: a.label, help: a.help || undefined, value: value, __nextHasNoMarginBottom: true, __next40pxDefaultSize: true };
		if (a.control === 'select') {
			return el(C.SelectControl, Object.assign(common, { options: a.options, onChange: function (v) { set(key, v); } }));
		}
		if (a.control === 'toggle') {
			return el(C.ToggleControl, { key: key, label: a.label, checked: !!value, onChange: function (v) { set(key, v); } });
		}
		return el(C.TextControl, Object.assign(common, { onChange: function (v) { set(key, v); } }));
	}

	cfg.blocks.forEach(function (b) {
		var attributes = {};
		Object.keys(b.attributes).forEach(function (k) { attributes[k] = { type: b.attributes[k].type, default: b.attributes[k].default }; });
		wp.blocks.registerBlockType(b.name, {
			apiVersion: 3,
			title: b.title,
			description: b.description,
			category: 'memberglut',
			icon: b.icon,
			attributes: attributes,
			supports: { html: false, align: ['wide', 'full'] },
			edit: function (props) {
				var blockProps = BE.useBlockProps();
				function set(k, v) { var o = {}; o[k] = v; props.setAttributes(o); }
				var keys = Object.keys(b.attributes);
				return el(Fragment, null,
					keys.length ? el(BE.InspectorControls, null,
						el(C.PanelBody, { title: __('Settings', 'memberglut') },
							keys.map(function (k) { return control(k, b.attributes[k], props.attributes[k], set); }))) : null,
					el('div', blockProps,
						el(C.Disabled, null, el(SSR, { block: b.name, attributes: props.attributes, httpMethod: 'POST' }))));
			},
			save: function () { return null; }
		});
	});

	function multi(label, options, value, onChange) {
		return el(C.FormTokenField, {
			label: label,
			value: (value || []).map(function (v) { var o = options.find(function (x) { return x.value === v; }); return o ? o.label : String(v); }),
			suggestions: options.map(function (o) { return o.label; }),
			onChange: function (tokens) {
				onChange(tokens.map(function (t) { var o = options.find(function (x) { return x.label === t; }); return o ? o.value : null; }).filter(function (v) { return v !== null; }));
			},
			__experimentalExpandOnFocus: true,
			__next40pxDefaultSize: true,
			__nextHasNoMarginBottom: true
		});
	}

	wp.blocks.registerBlockType('memberglut/restrict', {
		apiVersion: 3,
		title: __('Members-only content', 'memberglut'),
		description: __('Shows the blocks inside only to the members you choose; others see a message.', 'memberglut'),
		category: 'memberglut',
		icon: 'lock',
		attributes: {
			plans: { type: 'array', default: [] },
			roles: { type: 'array', default: [] },
			not: { type: 'array', default: [] },
			logged_in: { type: 'string', default: '' },
			message: { type: 'string', default: '' },
			show_message: { type: 'boolean', default: true }
		},
		supports: { html: false, align: ['wide', 'full'] },
		edit: function (props) {
			var a = props.attributes;
			var blockProps = BE.useBlockProps({ className: 'mg-restrict-editor' });
			var who = a.logged_in === '0' ? __('Visitors only', 'memberglut')
				: (a.plans.length || a.roles.length ? __('Members of the chosen plans / roles', 'memberglut') : __('Any logged-in user', 'memberglut'));
			return el(Fragment, null,
				el(BE.InspectorControls, null,
					el(C.PanelBody, { title: __('Who can see this', 'memberglut') },
						el(C.SelectControl, {
							label: __('Audience', 'memberglut'), value: a.logged_in, __nextHasNoMarginBottom: true, __next40pxDefaultSize: true,
							options: [
								{ value: '', label: __('Plans / roles below (empty = logged-in users)', 'memberglut') },
								{ value: '1', label: __('Any logged-in user', 'memberglut') },
								{ value: '0', label: __('Visitors who are not logged in', 'memberglut') }
							],
							onChange: function (v) { props.setAttributes({ logged_in: v }); }
						}),
						a.logged_in !== '0' ? multi(__('Plans', 'memberglut'), cfg.plans, a.plans, function (v) { props.setAttributes({ plans: v }); }) : null,
						a.logged_in !== '0' ? multi(__('Roles', 'memberglut'), cfg.roles, a.roles, function (v) { props.setAttributes({ roles: v }); }) : null,
						a.logged_in !== '0' ? multi(__('Hide from members of', 'memberglut'), cfg.plans, a.not, function (v) { props.setAttributes({ not: v }); }) : null,
						el(C.ToggleControl, { label: __('Show a message to others', 'memberglut'), checked: a.show_message, onChange: function (v) { props.setAttributes({ show_message: v }); }, __nextHasNoMarginBottom: true }),
						a.show_message ? el(C.TextareaControl, { label: __('Message', 'memberglut'), help: __('Empty = the default restriction message.', 'memberglut'), value: a.message, onChange: function (v) { props.setAttributes({ message: v }); }, __nextHasNoMarginBottom: true }) : null)),
				el('div', blockProps,
					el('div', { className: 'mg-restrict-editor-label' }, '🔒 ' + who),
					el(BE.InnerBlocks, null)));
		},
		save: function () { return el(BE.InnerBlocks.Content); }
	});
}(window.wp, window.memberglutBlocks));
