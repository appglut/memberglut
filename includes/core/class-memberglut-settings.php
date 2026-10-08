<?php
/**
 * Settings store.
 *
 * Global settings live in the `memberglut_settings` option and the Forms & Pages screen in `memberglut_forms`.
 * Every key has a schema entry: type, default and limits. The schema is the single source of the defaults; the
 * React screens receive them from the REST API.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Settings class.
 */
class MemberGlut_Settings {

	const OPTION       = 'memberglut_settings';
	const FORMS_OPTION = 'memberglut_forms';

	/**
	 * Per-request cache of the stored values.
	 *
	 * @var array
	 */
	private static $cache = array();

	/**
	 * Schema of the global settings.
	 *
	 * Types: bool, int, float, enum, text, textarea, html, url, email, color, page, plan, roles, pages, tags, secret,
	 * role_redirects, captcha_forms.
	 *
	 * @return array
	 */
	public static function schema() {
		static $schema = null;
		if ( null !== $schema ) {
			return self::with_extensions( $schema, 'memberglut_settings_schema' );
		}
		$member_roles = array( 'subscriber', 'memberglut_basic', 'memberglut_premium', 'memberglut_vip' );
		$schema       = array(
			// General.
			'default_plan'                  => array( 'type' => 'plan', 'default' => 0 ),
			'private_site'                  => array( 'type' => 'bool', 'default' => false ),
			'private_site_exceptions'       => array( 'type' => 'pages', 'default' => array() ),
			'private_site_paths'            => array( 'type' => 'tags', 'default' => array() ),
			'private_feed'                  => array( 'type' => 'bool', 'default' => false ),
			'hide_admin_bar_roles'          => array( 'type' => 'roles', 'default' => $member_roles ),
			'block_admin_roles'             => array( 'type' => 'roles', 'default' => $member_roles ),
			'admin_redirect_page'           => array( 'type' => 'page', 'default' => 0 ),
			// Content restriction.
			'restrict_action'               => array( 'type' => 'enum', 'default' => 'message', 'options' => array( 'message', 'login', 'redirect', 'pricing' ) ),
			'restrict_redirect_url'         => array( 'type' => 'url', 'default' => '' ),
			'msg_logged_out'                => array( 'type' => 'html', 'default' => "<h3>Members only</h3>\n<p>This content is for members. {login_link} or {register_link} to read it.</p>" ),
			'msg_logged_in'                 => array( 'type' => 'html', 'default' => "<h3>Upgrade to continue</h3>\n<p>Your current plan does not include this content. {pricing_link}</p>" ),
			'teaser'                        => array( 'type' => 'enum', 'default' => 'excerpt', 'options' => array( 'none', 'excerpt', 'fade' ) ),
			'teaser_words'                  => array( 'type' => 'int', 'default' => 55, 'min' => 10, 'max' => 500 ),
			'hide_in_lists'                 => array( 'type' => 'enum', 'default' => 'show_excerpt', 'options' => array( 'show_excerpt', 'hide', 'show' ) ),
			'protect_rest'                  => array( 'type' => 'bool', 'default' => true ),
			'protect_feed'                  => array( 'type' => 'bool', 'default' => true ),
			'protect_search'                => array( 'type' => 'bool', 'default' => false ),
			'restrict_comments'             => array( 'type' => 'bool', 'default' => true ),
			'members_only_comments'         => array( 'type' => 'bool', 'default' => false ),
			// Login & registration.
			'allow_registration'            => array( 'type' => 'bool', 'default' => true ),
			'replace_wp_pages'              => array( 'type' => 'bool', 'default' => true ),
			'custom_login_slug'             => array( 'type' => 'slug', 'default' => '' ),
			'approval'                      => array( 'type' => 'enum', 'default' => 'auto', 'options' => array( 'auto', 'email', 'admin' ) ),
			'auto_login'                    => array( 'type' => 'bool', 'default' => true ),
			'password_min'                  => array( 'type' => 'int', 'default' => 8, 'min' => 6, 'max' => 64 ),
			'password_strength'             => array( 'type' => 'enum', 'default' => 'medium', 'options' => array( 'any', 'medium', 'strong' ) ),
			'show_password_toggle'          => array( 'type' => 'bool', 'default' => true ),
			'terms_required'                => array( 'type' => 'bool', 'default' => false ),
			'terms_page'                    => array( 'type' => 'page', 'default' => 0 ),
			'privacy_required'              => array( 'type' => 'bool', 'default' => true ),
			'privacy_page'                  => array( 'type' => 'page', 'default' => 0 ),
			'email_whitelist'               => array( 'type' => 'tags', 'default' => array() ),
			'email_blacklist'               => array( 'type' => 'tags', 'default' => array() ),
			// Redirects.
			'redirect_login'                => array( 'type' => 'enum', 'default' => 'account', 'options' => array( 'account', 'home', 'same', 'admin', 'url' ) ),
			'redirect_login_url'            => array( 'type' => 'url', 'default' => '' ),
			'redirect_logout'               => array( 'type' => 'enum', 'default' => 'home', 'options' => array( 'account', 'home', 'same', 'url' ) ),
			'redirect_logout_url'           => array( 'type' => 'url', 'default' => '' ),
			'redirect_register'             => array( 'type' => 'enum', 'default' => 'account', 'options' => array( 'account', 'home', 'same', 'admin', 'url' ) ),
			'redirect_register_url'         => array( 'type' => 'url', 'default' => '' ),
			'respect_redirect_to'           => array( 'type' => 'bool', 'default' => true ),
			'redirect_logged_in_from_forms' => array( 'type' => 'bool', 'default' => true ),
			'role_redirects'                => array( 'type' => 'role_redirects', 'default' => array() ),
			// Member account.
			'tab_dashboard'                 => array( 'type' => 'bool', 'default' => true ),
			'tab_profile'                   => array( 'type' => 'bool', 'default' => true ),
			'tab_password'                  => array( 'type' => 'bool', 'default' => true ),
			'tab_subscriptions'             => array( 'type' => 'bool', 'default' => true ),
			'tab_payments'                  => array( 'type' => 'bool', 'default' => true ),
			'tab_activity'                  => array( 'type' => 'bool', 'default' => true ),
			'tab_delete'                    => array( 'type' => 'bool', 'default' => false ),
			'allow_cancel'                  => array( 'type' => 'bool', 'default' => true ),
			'allow_renew'                   => array( 'type' => 'bool', 'default' => true ),
			'renew_days_before'             => array( 'type' => 'int', 'default' => 15, 'min' => 0, 'max' => 365 ),
			'allow_change'                  => array( 'type' => 'bool', 'default' => true ),
			'allow_downgrade'               => array( 'type' => 'bool', 'default' => true ),
			'allow_abandon'                 => array( 'type' => 'bool', 'default' => false ),
			'cancel_access'                 => array( 'type' => 'enum', 'default' => 'period_end', 'options' => array( 'period_end', 'now' ) ),
			// Payments.
			'currency'                      => array( 'type' => 'enum', 'default' => 'USD', 'options' => array_keys( memberglut_currencies() ) ),
			'currency_position'             => array( 'type' => 'enum', 'default' => 'before', 'options' => array( 'before', 'before_space', 'after', 'after_space' ) ),
			'thousand_sep'                  => array( 'type' => 'text', 'default' => ',', 'raw' => true ),
			'decimal_sep'                   => array( 'type' => 'text', 'default' => '.', 'raw' => true ),
			'decimals'                      => array( 'type' => 'int', 'default' => 2, 'min' => 0, 'max' => 4 ),
			'test_mode'                     => array( 'type' => 'bool', 'default' => true ),
			'stripe_enabled'                => array( 'type' => 'bool', 'default' => false ),
			'stripe_mode'                   => array( 'type' => 'enum', 'default' => 'test', 'options' => array( 'test', 'live' ) ),
			'stripe_test_publishable'       => array( 'type' => 'text', 'default' => '' ),
			'stripe_test_secret'            => array( 'type' => 'secret', 'default' => '' ),
			'stripe_live_publishable'       => array( 'type' => 'text', 'default' => '' ),
			'stripe_live_secret'            => array( 'type' => 'secret', 'default' => '' ),
			'stripe_webhook_secret'         => array( 'type' => 'secret', 'default' => '' ),
			'stripe_wallets'                => array( 'type' => 'bool', 'default' => true ),
			'stripe_save_cards'             => array( 'type' => 'bool', 'default' => true ),
			'paypal_enabled'                => array( 'type' => 'bool', 'default' => false ),
			'paypal_mode'                   => array( 'type' => 'enum', 'default' => 'sandbox', 'options' => array( 'sandbox', 'live' ) ),
			'paypal_client_id'              => array( 'type' => 'text', 'default' => '' ),
			'paypal_secret'                 => array( 'type' => 'secret', 'default' => '' ),
			'paypal_webhook_id'             => array( 'type' => 'text', 'default' => '' ),
			'bank_enabled'                  => array( 'type' => 'bool', 'default' => false ),
			'bank_title'                    => array( 'type' => 'text', 'default' => 'Bank transfer' ),
			'bank_instructions'             => array( 'type' => 'textarea', 'default' => "Account name: …\nIBAN: …\nUse your order number as the reference." ),
			'bank_activate'                 => array( 'type' => 'enum', 'default' => 'on_confirm', 'options' => array( 'on_confirm', 'now' ) ),
			'retry_failed'                  => array( 'type' => 'bool', 'default' => true ),
			'retry_max'                     => array( 'type' => 'int', 'default' => 3, 'min' => 1, 'max' => 10 ),
			'retry_interval'                => array( 'type' => 'int', 'default' => 3, 'min' => 1, 'max' => 30 ),
			'retry_status'                  => array( 'type' => 'enum', 'default' => 'on_hold', 'options' => array( 'on_hold', 'active' ) ),
			'refund_revokes'                => array( 'type' => 'bool', 'default' => true ),
			// Emails.
			'sender_name'                   => array( 'type' => 'text', 'default' => '' ),
			'sender_email'                  => array( 'type' => 'email', 'default' => '' ),
			'admin_recipients'              => array( 'type' => 'emails', 'default' => '' ),
			'email_html'                    => array( 'type' => 'bool', 'default' => true ),
			'email_logo'                    => array( 'type' => 'url', 'default' => '' ),
			'email_color'                   => array( 'type' => 'color', 'default' => '#e94560' ),
			'email_footer'                  => array( 'type' => 'textarea', 'default' => '{site_name} · You receive this email because you have an account with us.' ),
			// Security.
			'limit_sessions'                => array( 'type' => 'bool', 'default' => false ),
			'max_sessions'                  => array( 'type' => 'int', 'default' => 1, 'min' => 1, 'max' => 10 ),
			'session_behavior'              => array( 'type' => 'enum', 'default' => 'logout_oldest', 'options' => array( 'logout_oldest', 'block' ) ),
			'limit_failed'                  => array( 'type' => 'bool', 'default' => true ),
			'failed_attempts'               => array( 'type' => 'int', 'default' => 5, 'min' => 2, 'max' => 20 ),
			'lockout_minutes'               => array( 'type' => 'int', 'default' => 15, 'min' => 1, 'max' => 1440 ),
			'honeypot'                      => array( 'type' => 'bool', 'default' => true ),
			'logout_on_close'               => array( 'type' => 'bool', 'default' => false ),
			// Captcha.
			'captcha_provider'              => array( 'type' => 'enum', 'default' => 'none', 'options' => array( 'none', 'recaptcha', 'hcaptcha', 'turnstile' ) ),
			'captcha_on'                    => array( 'type' => 'list', 'default' => array( 'register', 'login' ), 'options' => array( 'register', 'login', 'lost_password', 'checkout' ) ),
			'recaptcha_version'             => array( 'type' => 'enum', 'default' => 'v3', 'options' => array( 'v3', 'v2' ) ),
			'recaptcha_site_key'            => array( 'type' => 'text', 'default' => '' ),
			'recaptcha_secret_key'          => array( 'type' => 'secret', 'default' => '' ),
			'recaptcha_score'               => array( 'type' => 'float', 'default' => 0.5, 'min' => 0, 'max' => 1 ),
			'hcaptcha_site_key'             => array( 'type' => 'text', 'default' => '' ),
			'hcaptcha_secret_key'           => array( 'type' => 'secret', 'default' => '' ),
			'turnstile_site_key'            => array( 'type' => 'text', 'default' => '' ),
			'turnstile_secret_key'          => array( 'type' => 'secret', 'default' => '' ),
			// Privacy.
			'gdpr_consent'                  => array( 'type' => 'bool', 'default' => true ),
			'gdpr_consent_text'             => array( 'type' => 'textarea', 'default' => 'I agree to the storage of my data as described in the {privacy_policy}.' ),
			'gdpr_exporter'                 => array( 'type' => 'bool', 'default' => true ),
			'gdpr_eraser'                   => array( 'type' => 'bool', 'default' => true ),
			'gdpr_eraser_payments'          => array( 'type' => 'enum', 'default' => 'anonymize', 'options' => array( 'anonymize', 'delete' ) ),
			// Advanced.
			'delete_on_uninstall'           => array( 'type' => 'bool', 'default' => false ),
			'load_assets'                   => array( 'type' => 'enum', 'default' => 'needed', 'options' => array( 'needed', 'everywhere' ) ),
			'exclude_cache'                 => array( 'type' => 'bool', 'default' => true ),
			'debug_log'                     => array( 'type' => 'bool', 'default' => false ),
			'log_retention_days'            => array( 'type' => 'int', 'default' => 30, 'min' => 1, 'max' => 365 ),
			'log_debug'                     => array( 'type' => 'bool', 'default' => false ),
			'renewals_engine'               => array( 'type' => 'enum', 'default' => 'action_scheduler', 'options' => array( 'action_scheduler', 'wp_cron' ) ),
		);
		return self::with_extensions( $schema, 'memberglut_settings_schema' );
	}

	/**
	 * Registration field types (add-ons add more with memberglut_field_types and render / validate them with
	 * memberglut_render_field and memberglut_validate_field).
	 *
	 * @return string[]
	 */
	public static function field_types() {
		$core = array( 'text', 'textarea', 'email', 'url', 'tel', 'number', 'date', 'select', 'radio', 'checkbox', 'country', 'hidden', 'password' );
		return array_values( array_unique( array_merge( $core, array_map( 'sanitize_key', (array) apply_filters( 'memberglut_field_types', array() ) ) ) ) );
	}

	/**
	 * Add-on settings (memberglut_settings_schema / memberglut_forms_schema): key => [ type, default, … ].
	 * Core keys cannot be replaced.
	 *
	 * @param array  $schema Core schema.
	 * @param string $hook   Filter.
	 * @return array
	 */
	private static function with_extensions( $schema, $hook ) {
		$extra = (array) apply_filters( $hook, array() );
		foreach ( $extra as $key => $def ) {
			if ( isset( $schema[ $key ] ) || ! is_array( $def ) || empty( $def['type'] ) || ! array_key_exists( 'default', $def ) ) {
				unset( $extra[ $key ] );
			}
		}
		return $schema + $extra;
	}

	/**
	 * Schema of the Forms & Pages screen.
	 *
	 * @return array
	 */
	public static function forms_schema() {
		static $schema = null;
		if ( null !== $schema ) {
			return self::with_extensions( $schema, 'memberglut_forms_schema' );
		}
		$schema = array(
			'page_register'         => array( 'type' => 'page', 'default' => 0 ),
			'page_login'            => array( 'type' => 'page', 'default' => 0 ),
			'page_account'          => array( 'type' => 'page', 'default' => 0 ),
			'page_lost'             => array( 'type' => 'page', 'default' => 0 ),
			'page_pricing'          => array( 'type' => 'page', 'default' => 0 ),
			'page_thanks'           => array( 'type' => 'page', 'default' => 0 ),
			'reg_fields'            => array( 'type' => 'reg_fields', 'default' => self::default_reg_fields() ),
			'reg_title'             => array( 'type' => 'text', 'default' => 'Create your account' ),
			'reg_button'            => array( 'type' => 'text', 'default' => 'Join now' ),
			'plan_picker'           => array( 'type' => 'enum', 'default' => 'cards', 'options' => array( 'cards', 'radio', 'select' ) ),
			'reg_show_login_link'   => array( 'type' => 'bool', 'default' => true ),
			'reg_ajax'              => array( 'type' => 'bool', 'default' => true ),
			'login_with'            => array( 'type' => 'enum', 'default' => 'both', 'options' => array( 'both', 'email', 'username' ) ),
			'login_title'           => array( 'type' => 'text', 'default' => 'Welcome back' ),
			'login_button'          => array( 'type' => 'text', 'default' => 'Log in' ),
			'login_remember'        => array( 'type' => 'bool', 'default' => true ),
			'login_lost_link'       => array( 'type' => 'bool', 'default' => true ),
			'login_register_link'   => array( 'type' => 'bool', 'default' => true ),
			'profile_fields'        => array( 'type' => 'list', 'default' => array( 'first_name', 'last_name', 'display_name', 'phone', 'country' ) ),
			'profile_email_confirm' => array( 'type' => 'bool', 'default' => true ),
			'pricing_layout'        => array( 'type' => 'enum', 'default' => 'cards', 'options' => array( 'cards', 'compare', 'list' ) ),
			'pricing_plans'         => array( 'type' => 'plans', 'default' => array() ),
			'pricing_features'      => array( 'type' => 'bool', 'default' => true ),
			'pricing_button'        => array( 'type' => 'text', 'default' => 'Choose plan' ),
			'pricing_current'       => array( 'type' => 'bool', 'default' => true ),
			'pricing_dark'          => array( 'type' => 'bool', 'default' => false ),
			'pricing_columns'       => array( 'type' => 'int', 'default' => 3, 'min' => 1, 'max' => 4 ),
			'emails_reviewed'       => array( 'type' => 'bool', 'default' => false ),
		);
		return self::with_extensions( $schema, 'memberglut_forms_schema' );
	}

	/**
	 * Default registration fields (core fields + two custom examples).
	 *
	 * @return array
	 */
	public static function default_reg_fields() {
		return array(
			array( 'key' => 'email', 'label' => 'Email', 'type' => 'email', 'on' => true, 'required' => true, 'locked' => true ),
			array( 'key' => 'username', 'label' => 'Username', 'type' => 'text', 'on' => false, 'required' => true ),
			array( 'key' => 'password', 'label' => 'Password', 'type' => 'password', 'on' => true, 'required' => true, 'locked' => true ),
			array( 'key' => 'password_confirm', 'label' => 'Confirm password', 'type' => 'password', 'on' => true, 'required' => true ),
			array( 'key' => 'first_name', 'label' => 'First name', 'type' => 'text', 'on' => true, 'required' => false ),
			array( 'key' => 'last_name', 'label' => 'Last name', 'type' => 'text', 'on' => true, 'required' => false ),
			array( 'key' => 'display_name', 'label' => 'Display name', 'type' => 'text', 'on' => false, 'required' => false ),
			array( 'key' => 'website', 'label' => 'Website', 'type' => 'url', 'on' => false, 'required' => false ),
			array( 'key' => 'bio', 'label' => 'Biographical info', 'type' => 'textarea', 'on' => false, 'required' => false ),
			array( 'key' => 'phone', 'label' => 'Phone', 'type' => 'tel', 'on' => true, 'required' => false, 'custom' => true ),
			array( 'key' => 'country', 'label' => 'Country', 'type' => 'country', 'on' => true, 'required' => false, 'custom' => true ),
		);
	}

	/**
	 * Keys of the core (non-custom) registration fields.
	 *
	 * @return string[]
	 */
	public static function core_field_keys() {
		return array( 'email', 'username', 'password', 'password_confirm', 'first_name', 'last_name', 'display_name', 'website', 'bio' );
	}

	/**
	 * Defaults of a schema.
	 *
	 * @param array $schema Schema.
	 * @return array
	 */
	public static function defaults_of( $schema ) {
		$out = array();
		foreach ( $schema as $key => $def ) {
			$out[ $key ] = $def['default'];
		}
		return $out;
	}

	/**
	 * All global settings (stored values merged over defaults).
	 *
	 * @return array
	 */
	public static function all() {
		return self::load( self::OPTION, self::schema() );
	}

	/**
	 * All Forms & Pages values.
	 *
	 * @return array
	 */
	public static function forms() {
		return self::load( self::FORMS_OPTION, self::forms_schema() );
	}

	/**
	 * Read one global setting.
	 *
	 * @param string $key     Key.
	 * @param mixed  $default Fallback when the key is unknown.
	 * @return mixed
	 */
	public static function get( $key, $default = null ) {
		$all = self::all();
		return array_key_exists( $key, $all ) ? $all[ $key ] : $default;
	}

	/**
	 * Read one Forms & Pages value.
	 *
	 * @param string $key     Key.
	 * @param mixed  $default Fallback.
	 * @return mixed
	 */
	public static function form( $key, $default = null ) {
		$all = self::forms();
		return array_key_exists( $key, $all ) ? $all[ $key ] : $default;
	}

	/**
	 * Load an option merged over its defaults.
	 *
	 * @param string $option Option name.
	 * @param array  $schema Schema.
	 * @return array
	 */
	private static function load( $option, $schema ) {
		if ( ! isset( self::$cache[ $option ] ) ) {
			$stored = get_option( $option, array() );
			if ( ! is_array( $stored ) ) {
				$stored = array();
			}
			self::$cache[ $option ] = array_merge( self::defaults_of( $schema ), array_intersect_key( $stored, $schema ) );
		}
		return self::$cache[ $option ];
	}

	/**
	 * Update global settings. Unknown keys are ignored; masked secrets keep the stored value.
	 *
	 * @param array $input  Raw values.
	 * @param bool  $merge  Merge with stored values (true) or replace everything (false).
	 * @return array|WP_Error Saved values or errors keyed by field.
	 */
	public static function update( array $input, $merge = true ) {
		return self::save( self::OPTION, self::schema(), $input, $merge, 'memberglut_settings_updated' );
	}

	/**
	 * Update Forms & Pages values.
	 *
	 * @param array $input Raw values.
	 * @param bool  $merge Merge with stored values.
	 * @return array|WP_Error
	 */
	public static function update_forms( array $input, $merge = true ) {
		return self::save( self::FORMS_OPTION, self::forms_schema(), $input, $merge, 'memberglut_forms_updated' );
	}

	/**
	 * Validate and store.
	 *
	 * @param string $option Option name.
	 * @param array  $schema Schema.
	 * @param array  $input  Raw input.
	 * @param bool   $merge  Merge with stored values.
	 * @param string $action Action fired after saving.
	 * @return array|WP_Error
	 */
	private static function save( $option, $schema, array $input, $merge, $action ) {
		$old     = self::load( $option, $schema );
		$values  = $merge ? $old : self::defaults_of( $schema );
		$errors  = array();
		$stored  = get_option( $option, array() );
		$stored  = is_array( $stored ) ? $stored : array();
		foreach ( $input as $key => $raw ) {
			if ( ! isset( $schema[ $key ] ) ) {
				continue;
			}
			$def = $schema[ $key ];
			if ( 'secret' === $def['type'] ) {
				// The client sends the masked value back when the field was not touched: keep what is stored.
				// An empty string means the admin cleared the field.
				if ( ! is_string( $raw ) || self::is_masked( $raw ) ) {
					$values[ $key ] = isset( $stored[ $key ] ) ? $stored[ $key ] : $def['default'];
					continue;
				}
			}
			$clean = self::sanitize( $raw, $def, $key );
			if ( is_wp_error( $clean ) ) {
				$errors[ $key ] = $clean->get_error_message();
				continue;
			}
			$values[ $key ] = $clean;
		}

		$cross = 'memberglut_settings_updated' === $action ? self::cross_validate( $values ) : array();
		$errors = array_merge( $errors, $cross );
		if ( $errors ) {
			/* translators: %s: first error */
			$message = 1 === count( $errors ) ? reset( $errors ) : sprintf( __( 'Some settings are not valid: %s', 'memberglut' ), reset( $errors ) );
			return new WP_Error( 'memberglut_invalid_settings', $message, array( 'status' => 400, 'fields' => $errors ) );
		}

		update_option( $option, $values, true );
		self::$cache = array();
		do_action( $action, $values, $old );
		return $values;
	}

	/**
	 * Rules that involve several fields.
	 *
	 * @param array $v Values.
	 * @return array Errors keyed by field.
	 */
	private static function cross_validate( $v ) {
		$errors = array();
		if ( 'redirect' === $v['restrict_action'] && '' === $v['restrict_redirect_url'] ) {
			$errors['restrict_redirect_url'] = __( 'Enter the URL to redirect to.', 'memberglut' );
		}
		foreach ( array( 'login', 'logout', 'register' ) as $k ) {
			if ( 'url' === $v[ 'redirect_' . $k ] && '' === $v[ 'redirect_' . $k . '_url' ] ) {
				$errors[ 'redirect_' . $k . '_url' ] = __( 'Enter a URL or choose another option.', 'memberglut' );
			}
		}
		if ( $v['custom_login_slug'] && in_array( $v['custom_login_slug'], array( 'wp-admin', 'wp-login', 'admin', 'login', 'wp-json', 'feed' ), true ) ) {
			$errors['custom_login_slug'] = __( 'This address is reserved. Choose another one.', 'memberglut' );
		}
		return $errors;
	}

	/**
	 * Sanitize one value by its schema entry.
	 *
	 * @param mixed  $raw Raw value.
	 * @param array  $def Schema entry.
	 * @param string $key Key (for messages).
	 * @return mixed|WP_Error
	 */
	public static function sanitize( $raw, $def, $key = '' ) {
		switch ( $def['type'] ) {
			case 'bool':
				return (bool) rest_sanitize_boolean( $raw );
			case 'int':
				if ( ! is_numeric( $raw ) ) {
					return new WP_Error( 'invalid', __( 'Enter a number.', 'memberglut' ) );
				}
				$n = (int) $raw;
				if ( ( isset( $def['min'] ) && $n < $def['min'] ) || ( isset( $def['max'] ) && $n > $def['max'] ) ) {
					/* translators: 1: minimum, 2: maximum */
					return new WP_Error( 'range', sprintf( __( 'Enter a number between %1$d and %2$d.', 'memberglut' ), $def['min'], $def['max'] ) );
				}
				return $n;
			case 'float':
				if ( ! is_numeric( $raw ) ) {
					return new WP_Error( 'invalid', __( 'Enter a number.', 'memberglut' ) );
				}
				$f = (float) $raw;
				if ( ( isset( $def['min'] ) && $f < $def['min'] ) || ( isset( $def['max'] ) && $f > $def['max'] ) ) {
					/* translators: 1: minimum, 2: maximum */
					return new WP_Error( 'range', sprintf( __( 'Enter a number between %1$s and %2$s.', 'memberglut' ), $def['min'], $def['max'] ) );
				}
				return $f;
			case 'enum':
				return in_array( $raw, $def['options'], true ) ? $raw : new WP_Error( 'invalid', __( 'Choose one of the options.', 'memberglut' ) );
			case 'list':
				$list = array_values( array_intersect( (array) $raw, isset( $def['options'] ) ? $def['options'] : array_map( 'sanitize_key', (array) $raw ) ) );
				return array_map( 'sanitize_key', $list );
			case 'text':
				if ( ! empty( $def['raw'] ) ) {
					return is_string( $raw ) ? wp_strip_all_tags( $raw ) : '';
				}
				return sanitize_text_field( (string) $raw );
			case 'secret':
				return trim( sanitize_text_field( (string) $raw ) );
			case 'slug':
				return sanitize_title( (string) $raw );
			case 'textarea':
				return sanitize_textarea_field( (string) $raw );
			case 'html':
				return wp_kses_post( (string) $raw );
			case 'url':
				$raw = trim( (string) $raw );
				if ( '' === $raw ) {
					return '';
				}
				$url = esc_url_raw( $raw );
				return $url ? $url : new WP_Error( 'invalid', __( 'Enter a valid URL.', 'memberglut' ) );
			case 'email':
				$raw = trim( (string) $raw );
				if ( '' === $raw ) {
					return '';
				}
				return is_email( $raw ) ? sanitize_email( $raw ) : new WP_Error( 'invalid', __( 'Enter a valid email address.', 'memberglut' ) );
			case 'emails':
				$list = array_filter( array_map( 'trim', explode( ',', (string) $raw ) ) );
				foreach ( $list as $email ) {
					if ( ! is_email( $email ) ) {
						/* translators: %s: email address */
						return new WP_Error( 'invalid', sprintf( __( '%s is not a valid email address.', 'memberglut' ), $email ) );
					}
				}
				return implode( ', ', array_map( 'sanitize_email', $list ) );
			case 'color':
				$c = sanitize_hex_color( (string) $raw );
				return $c ? $c : $def['default'];
			case 'page':
				$id = absint( $raw );
				if ( $id && 'page' !== get_post_type( $id ) ) {
					return new WP_Error( 'invalid', __( 'Choose an existing page.', 'memberglut' ) );
				}
				return $id;
			case 'pages':
				return array_values( array_filter( array_map( 'absint', (array) $raw ), static function ( $id ) {
					return $id && 'page' === get_post_type( $id );
				} ) );
			case 'plan':
				return absint( $raw );
			case 'plans':
				return array_values( array_filter( array_map( 'absint', (array) $raw ) ) );
			case 'roles':
				$roles = wp_roles()->get_names();
				return array_values( array_filter( array_map( 'sanitize_key', (array) $raw ), static function ( $r ) use ( $roles ) {
					return isset( $roles[ $r ] );
				} ) );
			case 'tags':
				return array_values( array_unique( array_filter( array_map( static function ( $t ) {
					return strtolower( trim( sanitize_text_field( (string) $t ) ) );
				}, (array) $raw ) ) ) );
			case 'role_redirects':
				$out = array();
				foreach ( (array) $raw as $row ) {
					if ( ! is_array( $row ) || empty( $row['role'] ) ) {
						continue;
					}
					$out[] = array(
						'role'   => sanitize_key( $row['role'] ),
						'login'  => isset( $row['login'] ) ? esc_url_raw( self::url_or_path( $row['login'] ) ) : '',
						'logout' => isset( $row['logout'] ) ? esc_url_raw( self::url_or_path( $row['logout'] ) ) : '',
					);
				}
				return $out;
			case 'reg_fields':
				return self::sanitize_reg_fields( $raw );
		}
		return sanitize_text_field( (string) $raw );
	}

	/**
	 * Turn a relative path into a full URL on this site.
	 *
	 * @param string $value Path or URL.
	 * @return string
	 */
	public static function url_or_path( $value ) {
		$value = trim( (string) $value );
		if ( '' === $value ) {
			return '';
		}
		return 0 === strpos( $value, '/' ) ? home_url( $value ) : $value;
	}

	/**
	 * Validate the registration field list.
	 *
	 * @param mixed $raw Raw list.
	 * @return array|WP_Error
	 */
	public static function sanitize_reg_fields( $raw ) {
		$types    = self::field_types();
		$core     = self::core_field_keys();
		$reserved = array( 'user_login', 'user_pass', 'user_email', 'user_url', 'role', 'nickname', 'description', 'rich_editing', 'admin_color', 'wp_capabilities', 'session_tokens', 'plan', 'coupon', 'redirect_to' );
		$out      = array();
		$seen     = array();
		foreach ( (array) $raw as $f ) {
			if ( ! is_array( $f ) || empty( $f['key'] ) ) {
				continue;
			}
			$key = sanitize_key( $f['key'] );
			if ( isset( $seen[ $key ] ) ) {
				/* translators: %s: field key */
				return new WP_Error( 'duplicate', sprintf( __( 'The field key “%s” is used twice.', 'memberglut' ), $key ) );
			}
			$custom = ! in_array( $key, $core, true );
			if ( $custom && ( in_array( $key, $reserved, true ) || 0 === strpos( $key, 'memberglut' ) || 0 === strpos( $key, 'wp_' ) ) ) {
				/* translators: %s: field key */
				return new WP_Error( 'reserved', sprintf( __( 'The field key “%s” is reserved by WordPress or MemberGlut.', 'memberglut' ), $key ) );
			}
			$seen[ $key ] = true;
			$type         = in_array( isset( $f['type'] ) ? $f['type'] : 'text', $types, true ) ? $f['type'] : 'text';
			$locked       = in_array( $key, array( 'email', 'password' ), true );
			$options      = isset( $f['options'] ) ? $f['options'] : '';
			if ( is_array( $options ) ) {
				$options = implode( "\n", $options );
			}
			$out[] = array(
				'key'      => $key,
				'label'    => sanitize_text_field( isset( $f['label'] ) ? $f['label'] : $key ),
				'type'     => $type,
				'on'       => $locked ? true : ! empty( $f['on'] ),
				'required' => $locked ? true : ! empty( $f['required'] ),
				'locked'   => $locked,
				'custom'   => $custom,
				'options'  => sanitize_textarea_field( (string) $options ),
			);
		}
		// Email and password can never be removed.
		foreach ( array( 'email', 'password' ) as $must ) {
			if ( ! isset( $seen[ $must ] ) ) {
				foreach ( self::default_reg_fields() as $d ) {
					if ( $d['key'] === $must ) {
						$d['custom']  = false;
						$d['options'] = '';
						array_unshift( $out, $d );
					}
				}
			}
		}
		return $out;
	}

	/**
	 * Custom registration fields only.
	 *
	 * @return array
	 */
	public static function custom_fields() {
		return array_values( array_filter( (array) self::form( 'reg_fields', array() ), static function ( $f ) {
			return ! empty( $f['custom'] );
		} ) );
	}

	/**
	 * Mask a secret for the client.
	 *
	 * @param string $value Secret.
	 * @return string
	 */
	public static function mask( $value ) {
		if ( '' === (string) $value ) {
			return '';
		}
		return '••••••••' . substr( (string) $value, -4 );
	}

	/**
	 * Whether a value is a masked secret sent back by the client.
	 *
	 * @param string $value Value.
	 * @return bool
	 */
	public static function is_masked( $value ) {
		return 0 === strpos( (string) $value, '••••' );
	}

	/**
	 * Global settings for the client: secrets masked.
	 *
	 * @return array
	 */
	public static function for_client() {
		$values = self::all();
		foreach ( self::schema() as $key => $def ) {
			if ( 'secret' === $def['type'] ) {
				$values[ $key ] = self::mask( $values[ $key ] );
			}
		}
		return $values;
	}

	/**
	 * Defaults for the client.
	 *
	 * @return array
	 */
	public static function defaults() {
		return self::defaults_of( self::schema() );
	}

	/**
	 * Forget the per-request cache (after direct option changes).
	 *
	 * @return void
	 */
	public static function flush() {
		self::$cache = array();
	}

	/**
	 * Reset global settings to defaults.
	 *
	 * @return void
	 */
	public static function reset() {
		$old = self::all();
		delete_option( self::OPTION );
		self::flush();
		do_action( 'memberglut_settings_updated', self::all(), $old );
	}
}
