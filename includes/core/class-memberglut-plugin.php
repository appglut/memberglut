<?php
/**
 * Plugin orchestrator: boots every component.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Plugin class.
 */
final class MemberGlut_Plugin {

	/**
	 * Instance.
	 *
	 * @var MemberGlut_Plugin|null
	 */
	private static $instance = null;

	/**
	 * Get the instance.
	 *
	 * @return MemberGlut_Plugin
	 */
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Boot.
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'load_textdomain' ), 0 );

		MemberGlut_Install::init();
		MemberGlut_Scheduler::init();
		MemberGlut_REST::init();

		/**
		 * Components: each class has a static init() that adds its hooks.
		 * Filterable so add-ons can replace or extend a component.
		 */
		$components = apply_filters( 'memberglut_components', $this->components() );
		foreach ( $components as $class ) {
			if ( class_exists( $class ) && method_exists( $class, 'init' ) ) {
				call_user_func( array( $class, 'init' ) );
			}
		}

		if ( is_admin() ) {
			MemberGlut_App::get_instance();
		}

		add_action( 'init', array( $this, 'maybe_flush_rewrite' ), 99 );
		add_action( 'init', array( $this, 'loaded' ), 1 );
	}

	/**
	 * Component classes, in boot order.
	 *
	 * @return string[]
	 */
	private function components() {
		return array(
			'MemberGlut_Settings_Hooks',
			'MemberGlut_Roles_Service',
			'MemberGlut_Subscription_Service',
			'MemberGlut_Members',
			'MemberGlut_Mailer',
			'MemberGlut_Email_Triggers',
			'MemberGlut_Access',
			'MemberGlut_Restriction_Frontend',
			'MemberGlut_Post_Access_Admin',
			'MemberGlut_Menu_Visibility',
			'MemberGlut_Block_Visibility',
			'MemberGlut_Auth',
			'MemberGlut_Login_Screen',
			'MemberGlut_Approval',
			'MemberGlut_Security',
			'MemberGlut_Captcha',
			'MemberGlut_Shortcodes',
			'MemberGlut_Blocks',
			'MemberGlut_Assets',
			'MemberGlut_Account',
			'MemberGlut_Checkout',
			'MemberGlut_Payments',
			'MemberGlut_Gateways',
			'MemberGlut_Privacy',
			'MemberGlut_User_Profile',
			'MemberGlut_Stats',
			'MemberGlut_Dashboard',
			'MemberGlut_Tools',
			'MemberGlut_Site_Health',
			'MemberGlut_Cache',
			'MemberGlut_WPML',
			'MemberGlut_Admin_Notices',
		);
	}

	/**
	 * Translations.
	 *
	 * @return void
	 */
	public function load_textdomain() {
		// phpcs:ignore PluginCheck.CodeAnalysis.DiscouragedFunctions.load_plugin_textdomainFound -- Allows translations shipped in /languages.
		load_plugin_textdomain( 'memberglut', false, dirname( MEMBERGLUT_PLUGIN_BASENAME ) . '/languages' );
	}

	/**
	 * Fire memberglut_init for add-ons (Pro).
	 *
	 * @return void
	 */
	public function loaded() {
		do_action( 'memberglut_init' );
	}

	/**
	 * Flush rewrite rules once after activation or a login-slug change.
	 *
	 * @return void
	 */
	public function maybe_flush_rewrite() {
		if ( get_option( 'memberglut_flush_rewrite' ) ) {
			delete_option( 'memberglut_flush_rewrite' );
			flush_rewrite_rules( false );
		}
	}

	/**
	 * Deactivation: remove schedules and rewrite rules. Data and roles are untouched.
	 *
	 * @return void
	 */
	public static function deactivate() {
		MemberGlut_Scheduler::unschedule_all();
		flush_rewrite_rules( false );
		do_action( 'memberglut_deactivate' );
	}
}
