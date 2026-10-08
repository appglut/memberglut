<?php
/**
 * Example add-on for MemberGlut — how a separate plugin (e.g. MemberGlut Pro) extends the free plugin without
 * editing its files. Copy into its own plugin to try it. Every hook used here is listed in docs/hooks.md.
 *
 * It adds:
 *  1. a payment gateway (“Invoice”),
 *  2. a content-rule condition (“Members for at least N days”) and a rule target (“Posts older than N days”),
 *  3. a My Account tab,
 *  4. a Plan editor section with its own setting,
 *  5. a Global Settings field.
 *
 * Plugin Name: MemberGlut Example Add-on
 * Requires Plugins: memberglut
 *
 * @package MemberGlutExample
 */

defined( 'ABSPATH' ) || exit;

/* -------------------------------------------------------------------------
 * 1. Gateway
 * ---------------------------------------------------------------------- */

add_action(
	'plugins_loaded',
	static function () {
		if ( ! class_exists( 'MemberGlut_Gateway' ) ) {
			return;
		}

		/**
		 * Pay later by invoice: the payment stays pending until an admin marks it paid.
		 */
		class MemberGlut_Example_Gateway_Invoice extends MemberGlut_Gateway {
			/**
			 * ID.
			 *
			 * @var string
			 */
			public $id = 'invoice';

			/**
			 * Features.
			 *
			 * @var string[]
			 */
			protected $features = array( 'one_time' );

			/**
			 * Title.
			 *
			 * @return string
			 */
			public function title() {
				return 'Invoice';
			}

			/**
			 * Enabled through the add-on's own setting (see 5.).
			 *
			 * @return bool
			 */
			public function is_enabled() {
				return (bool) memberglut_setting( 'example_invoice_enabled', false );
			}

			/**
			 * Start the payment.
			 *
			 * @param array $ctx user, plan, summary, payment, subscription, data.
			 * @return array
			 */
			public function process( $ctx ) {
				return array( 'redirect' => $this->return_url( $ctx['payment'] ) );
			}
		}

		add_filter(
			'memberglut_gateways',
			static function ( $classes ) {
				$classes[] = 'MemberGlut_Example_Gateway_Invoice';
				return $classes;
			}
		);
	},
	5
);

/* -------------------------------------------------------------------------
 * 2. Rule condition and rule target
 * ---------------------------------------------------------------------- */

add_filter(
	'memberglut_rule_conditions',
	static function ( $conditions ) {
		$conditions[] = 'member_days';
		return $conditions;
	}
);

// Keep the condition's own setting (sent by the Rule editor as condition.days).
add_filter(
	'memberglut_sanitize_rule_condition',
	static function ( $clean, $who, $raw ) {
		return 'member_days' === $who ? array( 'days' => max( 1, absint( isset( $raw['days'] ) ? $raw['days'] : 30 ) ) ) : $clean;
	},
	10,
	3
);

// Decide the condition.
add_filter(
	'memberglut_user_passes_condition',
	static function ( $passes, $who, $user_id ) {
		if ( 'member_days' !== $who['who'] || ! $user_id ) {
			return $passes;
		}
		$days  = isset( $who['condition']['days'] ) ? (int) $who['condition']['days'] : 30;
		$since = null;
		foreach ( MemberGlut_Subscription_Service::access_subscriptions( $user_id ) as $s ) {
			$since = null === $since ? $s['start_date'] : min( $since, $s['start_date'] );
		}
		return $since && strtotime( $since . ' UTC' ) <= time() - $days * DAY_IN_SECONDS;
	},
	10,
	3
);

add_filter(
	'memberglut_rule_targets',
	static function ( $targets ) {
		$targets[] = 'older_than';
		return $targets;
	}
);
add_filter(
	'memberglut_sanitize_rule_target',
	static function ( $clean, $raw ) {
		if ( 'older_than' === $clean['type'] ) {
			$clean['days'] = max( 1, absint( isset( $raw['days'] ) ? $raw['days'] : 90 ) );
		}
		return $clean;
	},
	10,
	2
);
add_filter(
	'memberglut_rule_target_matches',
	static function ( $match, $target, $subject, $kind ) {
		if ( 'older_than' !== $target['type'] || 'post' !== $kind ) {
			return $match;
		}
		return strtotime( $subject->post_date_gmt . ' UTC' ) < time() - (int) $target['days'] * DAY_IN_SECONDS;
	},
	10,
	4
);

/* -------------------------------------------------------------------------
 * 3. My Account tab
 * ---------------------------------------------------------------------- */

add_filter(
	'memberglut_account_tabs',
	static function ( $tabs ) {
		$tabs['downloads'] = 'Downloads';
		return $tabs;
	}
);
add_filter(
	'memberglut_account_tab_content',
	static function ( $html, $tab, $user ) {
		if ( 'downloads' !== $tab ) {
			return $html;
		}
		return '<h2 class="mg-account-title">Downloads</h2><p>' . esc_html( sprintf( 'Hello %s, your files will appear here.', $user->display_name ) ) . '</p>';
	},
	10,
	3
);

/* -------------------------------------------------------------------------
 * 4. Plan editor section + 5. Global Settings field
 * ---------------------------------------------------------------------- */

// Server side: declare the values so they are sanitized and saved.
add_filter(
	'memberglut_plan_settings_schema',
	static function ( $schema ) {
		$schema['example_welcome_gift'] = array( 'type' => 'text', 'default' => '' );
		return $schema;
	}
);
add_filter(
	'memberglut_settings_schema',
	static function ( $schema ) {
		$schema['example_invoice_enabled'] = array( 'type' => 'bool', 'default' => false );
		return $schema;
	}
);
add_filter(
	'memberglut_rule_settings_schema',
	static function ( $schema ) {
		$schema['example_note_for_members'] = array( 'type' => 'text', 'default' => '' );
		return $schema;
	}
);

// Admin side: register the sections and rule items in the React screens.
add_action(
	'memberglut_admin_enqueue',
	static function () {
		wp_add_inline_script(
			'memberglut-registry',
			'memberglutAdmin.registerSection("plan",{key:"example",title:"Welcome gift",fields:[{key:"example_welcome_gift",type:"text",label:"Gift sent to new members"}]});'
			. 'memberglutAdmin.registerSection("settings",{key:"example",title:"Invoices",fields:[{key:"example_invoice_enabled",type:"switch",label:"Offer “Invoice” at checkout"}]});'
			. 'memberglutAdmin.registerRuleCondition({value:"member_days",label:"Members for N days",desc:"Members whose membership started at least N days ago.",fields:[{key:"days",type:"number",label:"Days"}]});'
			. 'memberglutAdmin.registerRuleTarget({value:"older_than",label:"Posts older than",fields:[{key:"days",type:"number",label:"Days"}]});'
		);
	}
);
