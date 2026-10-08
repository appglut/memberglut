/**
 * MemberGlut in the block editor:
 *  - “MemberGlut access” document panel (per-post access settings, stored in the _memberglut_access meta).
 *  - “Membership visibility” panel on every block (memberglutVisibility attribute).
 * Written against the wp.* globals so it needs no build step.
 */
(function (wp, cfg) {
	'use strict';
	if (!wp || !cfg) {
		return;
	}
	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var useState = wp.element.useState;
	var useEffect = wp.element.useEffect;
	var __ = wp.i18n.__;
	var sprintf = wp.i18n.sprintf;
	var C = wp.components;
	var useSelect = wp.data.useSelect;
	var useDispatch = wp.data.useDispatch;
	var META = '_memberglut_access';

	var EMPTY = { who: 'inherit', plans: [], roles: [], action: 'inherit', redirect_url: '', msg_logged_out: '', msg_logged_in: '', teaser: 'inherit', in_lists: 'inherit', hide_in_menus: false };

	function parse(raw) {
		if (!raw) {
			return Object.assign({}, EMPTY);
		}
		try {
			return Object.assign({}, EMPTY, JSON.parse(raw));
		} catch (e) {
			return Object.assign({}, EMPTY);
		}
	}

	function toggleIn(list, value, on) {
		var out = (list || []).filter(function (x) { return x !== value; });
		if (on) {
			out.push(value);
		}
		return out;
	}

	function PlanChecks(props) {
		return el('div', { className: 'mg-checks' }, cfg.plans.map(function (p) {
			return el(C.CheckboxControl, {
				key: p.id,
				label: p.name + (p.status !== 'active' ? ' (' + __('inactive', 'memberglut') + ')' : ''),
				checked: (props.value || []).indexOf(p.id) !== -1,
				onChange: function (on) { props.onChange(toggleIn(props.value, p.id, on)); }
			});
		}));
	}

	function RoleChecks(props) {
		return el('div', { className: 'mg-checks' }, cfg.roles.map(function (r) {
			return el(C.CheckboxControl, {
				key: r.slug,
				label: r.name,
				checked: (props.value || []).indexOf(r.slug) !== -1,
				onChange: function (on) { props.onChange(toggleIn(props.value, r.slug, on)); }
			});
		}));
	}

	/* ------------------------------------------------------------------
	 * Document panel
	 * ---------------------------------------------------------------- */

	function AccessPanel() {
		var data = useSelect(function (select) {
			var ed = select('core/editor');
			return {
				postType: ed.getCurrentPostType(),
				postId: ed.getCurrentPostId(),
				meta: ed.getEditedPostAttribute('meta') || {}
			};
		}, []);
		var editPost = useDispatch('core/editor').editPost;
		var _rule = useState(null);
		var rule = _rule[0];
		var setRule = _rule[1];

		useEffect(function () {
			if (!data.postId) {
				return;
			}
			wp.apiFetch({ path: '/memberglut/v1/rules/applies?post=' + data.postId }).then(setRule).catch(function () { setRule(false); });
		}, [data.postId]);

		if (cfg.postTypes.indexOf(data.postType) === -1 || !cfg.canManage) {
			return null;
		}
		var a = parse(data.meta[META]);
		var set = function (patch) {
			var next = Object.assign({}, a, patch);
			var meta = {};
			meta[META] = next.who === 'inherit' ? '' : JSON.stringify(next);
			editPost({ meta: meta });
		};
		var Panel = (wp.editor && wp.editor.PluginDocumentSettingPanel) || (wp.editPost && wp.editPost.PluginDocumentSettingPanel);
		var restricted = ['logged_in', 'logged_out', 'plans', 'roles'].indexOf(a.who) !== -1;

		return el(Panel, { name: 'memberglut-access', title: __('MemberGlut access', 'memberglut'), className: 'memberglut-access-panel' },
			rule && rule.id ? el('p', { className: 'mg-rule-note' },
				sprintf(__('Protected by the rule “%s”.', 'memberglut'), rule.title), ' ',
				el('a', { href: cfg.ruleEditor + '&id=' + rule.id, target: '_blank', rel: 'noreferrer' }, __('Edit rule', 'memberglut'))
			) : (rule === null ? null : el('p', { className: 'mg-rule-note' }, __('No content rule protects this item.', 'memberglut'))),
			el(C.SelectControl, {
				label: __('Who can see it', 'memberglut'),
				value: a.who,
				options: [
					{ value: 'inherit', label: __('Follow content rules', 'memberglut') },
					{ value: 'everyone', label: __('Everyone (public, ignore rules)', 'memberglut') },
					{ value: 'logged_in', label: __('Logged-in users', 'memberglut') },
					{ value: 'logged_out', label: __('Logged-out visitors', 'memberglut') },
					{ value: 'plans', label: __('Members of plans', 'memberglut') },
					{ value: 'roles', label: __('User roles', 'memberglut') }
				],
				onChange: function (v) { set({ who: v }); },
				help: __('These settings win over content rules.', 'memberglut')
			}),
			a.who === 'plans' ? el(PlanChecks, { value: a.plans, onChange: function (v) { set({ plans: v }); } }) : null,
			a.who === 'roles' ? el(RoleChecks, { value: a.roles, onChange: function (v) { set({ roles: v }); } }) : null,
			restricted ? el(Fragment, null,
				el(C.SelectControl, {
					label: __('Others see', 'memberglut'),
					value: a.action,
					options: [
						{ value: 'inherit', label: sprintf(__('Global setting (%s)', 'memberglut'), cfg.global.action) },
						{ value: 'message', label: __('A message', 'memberglut') },
						{ value: 'login', label: __('The login form', 'memberglut') },
						{ value: 'redirect', label: __('A redirect', 'memberglut') },
						{ value: 'pricing', label: __('The pricing page', 'memberglut') }
					],
					onChange: function (v) { set({ action: v }); }
				}),
				a.action === 'redirect' ? el(C.TextControl, { label: __('Redirect URL', 'memberglut'), value: a.redirect_url, placeholder: '/join/', onChange: function (v) { set({ redirect_url: v }); } }) : null,
				['message', 'login', 'inherit'].indexOf(a.action) !== -1 ? el(Fragment, null,
					el(C.TextareaControl, { label: __('Message for visitors', 'memberglut'), help: __('Empty uses the global message. Tags: {login_link}, {register_link}, {pricing_link}, {plans}.', 'memberglut'), value: a.msg_logged_out, onChange: function (v) { set({ msg_logged_out: v }); } }),
					el(C.TextareaControl, { label: __('Message for logged-in users without access', 'memberglut'), value: a.msg_logged_in, onChange: function (v) { set({ msg_logged_in: v }); } }),
					el(C.SelectControl, {
						label: __('Teaser', 'memberglut'), value: a.teaser,
						options: [
							{ value: 'inherit', label: sprintf(__('Global setting (%s)', 'memberglut'), cfg.global.teaser) },
							{ value: 'none', label: __('None', 'memberglut') },
							{ value: 'excerpt', label: __('Excerpt', 'memberglut') },
							{ value: 'fade', label: __('Excerpt with fade', 'memberglut') }
						],
						onChange: function (v) { set({ teaser: v }); }
					})
				) : null,
				el(C.SelectControl, {
					label: __('In blog, archives & search', 'memberglut'), value: a.in_lists,
					options: [
						{ value: 'inherit', label: sprintf(__('Global setting (%s)', 'memberglut'), cfg.global.in_lists) },
						{ value: 'show_excerpt', label: __('Show with teaser only', 'memberglut') },
						{ value: 'hide', label: __('Hide', 'memberglut') },
						{ value: 'show', label: __('Show normally', 'memberglut') }
					],
					onChange: function (v) { set({ in_lists: v }); }
				}),
				el(C.ToggleControl, { label: __('Hide from menus for people without access', 'memberglut'), checked: !!a.hide_in_menus, onChange: function (v) { set({ hide_in_menus: v }); } })
			) : null
		);
	}

	if (wp.plugins && wp.plugins.registerPlugin) {
		wp.plugins.registerPlugin('memberglut-access', { render: AccessPanel, icon: 'lock' });
	}

	/* ------------------------------------------------------------------
	 * Block visibility
	 * ---------------------------------------------------------------- */

	wp.hooks.addFilter('blocks.registerBlockType', 'memberglut/visibility-attribute', function (settings) {
		if (!settings.attributes) {
			settings.attributes = {};
		}
		settings.attributes.memberglutVisibility = { type: 'object' };
		return settings;
	});

	var withVisibility = wp.compose.createHigherOrderComponent(function (BlockEdit) {
		return function (props) {
			var v = props.attributes.memberglutVisibility || {};
			var set = function (patch) {
				var next = Object.assign({ mode: 'show', who: '', plans: [], roles: [] }, v, patch);
				props.setAttributes({ memberglutVisibility: next.who ? next : undefined });
			};
			return el(Fragment, null,
				el(BlockEdit, props),
				props.isSelected ? el(wp.blockEditor.InspectorControls, null,
					el(C.PanelBody, { title: __('Membership visibility', 'memberglut'), initialOpen: !!v.who, icon: 'lock' },
						el(C.SelectControl, {
							label: __('Who sees this block', 'memberglut'),
							value: v.who || '',
							options: [
								{ value: '', label: __('Everyone', 'memberglut') },
								{ value: 'logged_in', label: __('Logged-in users', 'memberglut') },
								{ value: 'logged_out', label: __('Logged-out visitors', 'memberglut') },
								{ value: 'plans', label: __('Members of plans', 'memberglut') },
								{ value: 'roles', label: __('User roles', 'memberglut') }
							],
							onChange: function (who) { set({ who: who }); }
						}),
						v.who ? el(C.RadioControl, {
							label: __('Mode', 'memberglut'),
							selected: v.mode || 'show',
							options: [
								{ value: 'show', label: __('Show only to them', 'memberglut') },
								{ value: 'hide', label: __('Hide from them', 'memberglut') }
							],
							onChange: function (mode) { set({ mode: mode }); }
						}) : null,
						v.who === 'plans' ? el(PlanChecks, { value: v.plans, onChange: function (plans) { set({ plans: plans }); } }) : null,
						v.who === 'roles' ? el(RoleChecks, { value: v.roles, onChange: function (roles) { set({ roles: roles }); } }) : null,
						v.who ? el('p', { className: 'components-base-control__help' }, __('Administrators always see blocks limited to plans or roles.', 'memberglut')) : null
					)
				) : null
			);
		};
	}, 'withMemberglutVisibility');

	wp.hooks.addFilter('editor.BlockEdit', 'memberglut/visibility-panel', withVisibility);

	// Small badge on blocks with a visibility rule.
	var withBadge = wp.compose.createHigherOrderComponent(function (BlockListBlock) {
		return function (props) {
			var v = props.attributes && props.attributes.memberglutVisibility;
			if (!v || !v.who) {
				return el(BlockListBlock, props);
			}
			return el(BlockListBlock, Object.assign({}, props, { className: (props.className ? props.className + ' ' : '') + 'memberglut-has-visibility' }));
		};
	}, 'withMemberglutBadge');
	wp.hooks.addFilter('editor.BlockListBlock', 'memberglut/visibility-badge', withBadge);
}(window.wp, window.memberglutEditor));
