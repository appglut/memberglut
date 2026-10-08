<?php
/**
 * Installation, database schema and migrations.
 *
 * `memberglut_schema_version` holds the number of the last migration that ran. Migrations are ordered, run once and
 * are safe to repeat.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Install class.
 */
class MemberGlut_Install {

	const VERSION_OPTION = 'memberglut_schema_version';

	/**
	 * Migrations: number => method.
	 *
	 * @return array
	 */
	private static function migrations() {
		return array(
			1 => 'migration_create_tables',
			2 => 'migration_legacy_data',
			3 => 'migration_legacy_post_meta',
		);
	}

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'maybe_upgrade' ), 0 );
		add_action( 'wp_initialize_site', array( __CLASS__, 'on_new_site' ), 20 );
		add_filter( 'wpmu_drop_tables', array( __CLASS__, 'drop_tables' ) );
	}

	/**
	 * A network site is deleted: drop its MemberGlut tables too.
	 *
	 * @param string[] $tables Tables WordPress drops.
	 * @return string[]
	 */
	public static function drop_tables( $tables ) {
		foreach ( self::tables() as $t ) {
			$tables[] = self::table( $t );
		}
		return $tables;
	}

	/**
	 * Plugin activation.
	 *
	 * @param bool $network_wide Network activation.
	 * @return void
	 */
	public static function activate( $network_wide = false ) {
		if ( is_multisite() && $network_wide ) {
			foreach ( get_sites( array( 'fields' => 'ids', 'number' => 0 ) ) as $site_id ) {
				switch_to_blog( $site_id );
				self::install();
				restore_current_blog();
			}
			return;
		}
		self::install();
	}

	/**
	 * New site in a network where the plugin is network-active.
	 *
	 * @param WP_Site $site Site.
	 * @return void
	 */
	public static function on_new_site( $site ) {
		if ( ! function_exists( 'is_plugin_active_for_network' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		if ( is_plugin_active_for_network( MEMBERGLUT_PLUGIN_BASENAME ) ) {
			switch_to_blog( $site->blog_id );
			self::install();
			restore_current_blog();
		}
	}

	/**
	 * Install or upgrade the current site.
	 *
	 * @return void
	 */
	public static function install() {
		self::create_roles();
		MemberGlut_Permissions::grant_admin_caps();
		self::run_migrations();
		self::maybe_create_default_plans();
		update_option( 'memberglut_version', MEMBERGLUT_VERSION );
		MemberGlut_Scheduler::schedule_recurring();
		update_option( 'memberglut_flush_rewrite', 1 );
		do_action( 'memberglut_activate' );
	}

	/**
	 * Run pending migrations on every request until up to date (cheap option check).
	 *
	 * @return void
	 */
	public static function maybe_upgrade() {
		if ( (int) get_option( self::VERSION_OPTION, 0 ) < max( array_keys( self::migrations() ) ) || get_option( 'memberglut_version' ) !== MEMBERGLUT_VERSION ) {
			self::install();
		}
	}

	/**
	 * Run migrations newer than the stored version.
	 *
	 * @return void
	 */
	private static function run_migrations() {
		$current = (int) get_option( self::VERSION_OPTION, 0 );
		foreach ( self::migrations() as $number => $method ) {
			if ( $number <= $current ) {
				continue;
			}
			call_user_func( array( __CLASS__, $method ) );
			update_option( self::VERSION_OPTION, $number );
			memberglut_log( 'info', 'system', sprintf( 'Database migration %d (%s) done.', $number, $method ) );
		}
	}

	/**
	 * Default member roles.
	 *
	 * @return void
	 */
	private static function create_roles() {
		$roles = array(
			'memberglut_basic'   => array( __( 'Basic Member', 'memberglut' ), array( 'read' => true, 'memberglut_basic_access' => true ) ),
			'memberglut_premium' => array( __( 'Premium Member', 'memberglut' ), array( 'read' => true, 'memberglut_basic_access' => true, 'memberglut_premium_access' => true ) ),
			'memberglut_vip'     => array( __( 'VIP Member', 'memberglut' ), array( 'read' => true, 'memberglut_basic_access' => true, 'memberglut_premium_access' => true, 'memberglut_vip_access' => true ) ),
		);
		foreach ( $roles as $slug => $role ) {
			if ( ! get_role( $slug ) ) {
				add_role( $slug, $role[0], $role[1] );
			}
		}
	}

	/**
	 * Full table name.
	 *
	 * @param string $name Short name.
	 * @return string
	 */
	public static function table( $name ) {
		global $wpdb;
		return $wpdb->prefix . 'memberglut_' . $name;
	}

	/**
	 * All tables owned by the plugin (short names).
	 *
	 * @return string[]
	 */
	public static function tables() {
		return array( 'plans', 'subscriptions', 'payments', 'coupons', 'coupon_uses', 'rules', 'events', 'logs', 'logins', 'stats_daily' );
	}

	/**
	 * Legacy tables from 1.1.x.
	 *
	 * @return string[]
	 */
	public static function legacy_tables() {
		return array( 'user_plans', 'plan_features', 'user_memberships', 'custom_roles', 'access_restrictions' );
	}

	/**
	 * Migration 1: create / update every table.
	 *
	 * @return void
	 */
	public static function migration_create_tables() {
		global $wpdb;
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		$c = $wpdb->get_charset_collate();
		$t = array();
		foreach ( self::tables() as $name ) {
			$t[ $name ] = self::table( $name );
		}

		$sql = array();

		$sql[] = "CREATE TABLE {$t['plans']} (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			plan_name varchar(190) NOT NULL DEFAULT '',
			plan_slug varchar(190) NOT NULL DEFAULT '',
			plan_description text NULL,
			plan_status varchar(20) NOT NULL DEFAULT 'active',
			plan_order int(11) NOT NULL DEFAULT 0,
			plan_color varchar(20) NOT NULL DEFAULT '#e94560',
			plan_group varchar(100) NOT NULL DEFAULT 'Main',
			plan_type varchar(10) NOT NULL DEFAULT 'paid',
			billing varchar(20) NOT NULL DEFAULT 'one_time',
			plan_price decimal(12,4) NOT NULL DEFAULT 0,
			duration_length int(11) NOT NULL DEFAULT 1,
			duration_unit varchar(10) NOT NULL DEFAULT 'month',
			duration_type varchar(20) NOT NULL DEFAULT 'unlimited',
			end_date date NULL,
			calendar_start char(5) NOT NULL DEFAULT '01-01',
			signup_fee decimal(12,4) NOT NULL DEFAULT 0,
			trial_enabled tinyint(1) NOT NULL DEFAULT 0,
			trial_length int(11) NOT NULL DEFAULT 7,
			trial_unit varchar(10) NOT NULL DEFAULT 'day',
			role varchar(100) NOT NULL DEFAULT '',
			featured tinyint(1) NOT NULL DEFAULT 0,
			max_members int(11) NOT NULL DEFAULT 0,
			settings longtext NULL,
			created_at datetime NULL,
			updated_at datetime NULL,
			PRIMARY KEY  (id),
			UNIQUE KEY plan_slug (plan_slug),
			KEY plan_status (plan_status),
			KEY plan_group (plan_group, plan_order)
		) $c;";

		$sql[] = "CREATE TABLE {$t['subscriptions']} (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			user_id bigint(20) unsigned NOT NULL DEFAULT 0,
			plan_id bigint(20) unsigned NOT NULL DEFAULT 0,
			status varchar(20) NOT NULL DEFAULT 'pending',
			start_date datetime NULL,
			expires_at datetime NULL,
			trial_ends_at datetime NULL,
			canceled_at datetime NULL,
			next_payment_at datetime NULL,
			scheduled_plan_id bigint(20) unsigned NULL,
			gateway varchar(30) NOT NULL DEFAULT '',
			gateway_customer_id varchar(190) NOT NULL DEFAULT '',
			gateway_subscription_id varchar(190) NOT NULL DEFAULT '',
			billing_amount decimal(12,4) NOT NULL DEFAULT 0,
			billing_cycles_done int(11) NOT NULL DEFAULT 0,
			billing_cycles_total int(11) NOT NULL DEFAULT 0,
			retry_count int(11) NOT NULL DEFAULT 0,
			coupon_id bigint(20) unsigned NULL,
			source varchar(30) NOT NULL DEFAULT '',
			meta longtext NULL,
			created_at datetime NULL,
			updated_at datetime NULL,
			PRIMARY KEY  (id),
			KEY user_status (user_id, status),
			KEY plan_status (plan_id, status),
			KEY expires_at (expires_at),
			KEY next_payment_at (next_payment_at),
			KEY gateway_subscription_id (gateway_subscription_id)
		) $c;";

		$sql[] = "CREATE TABLE {$t['payments']} (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			user_id bigint(20) unsigned NOT NULL DEFAULT 0,
			subscription_id bigint(20) unsigned NULL,
			plan_id bigint(20) unsigned NULL,
			type varchar(20) NOT NULL DEFAULT 'new',
			status varchar(20) NOT NULL DEFAULT 'pending',
			currency char(3) NOT NULL DEFAULT 'USD',
			subtotal decimal(12,4) NOT NULL DEFAULT 0,
			discount decimal(12,4) NOT NULL DEFAULT 0,
			signup_fee decimal(12,4) NOT NULL DEFAULT 0,
			tax decimal(12,4) NOT NULL DEFAULT 0,
			amount decimal(12,4) NOT NULL DEFAULT 0,
			refunded_amount decimal(12,4) NOT NULL DEFAULT 0,
			gateway varchar(30) NOT NULL DEFAULT '',
			transaction_id varchar(190) NOT NULL DEFAULT '',
			coupon_code varchar(64) NOT NULL DEFAULT '',
			email varchar(190) NOT NULL DEFAULT '',
			note text NULL,
			ip varchar(45) NOT NULL DEFAULT '',
			meta longtext NULL,
			created_at datetime NULL,
			updated_at datetime NULL,
			PRIMARY KEY  (id),
			KEY user_id (user_id),
			KEY subscription_id (subscription_id),
			KEY status_created (status, created_at),
			KEY transaction_id (transaction_id)
		) $c;";

		$sql[] = "CREATE TABLE {$t['coupons']} (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			code varchar(64) NOT NULL DEFAULT '',
			type varchar(10) NOT NULL DEFAULT 'percent',
			amount decimal(12,4) NOT NULL DEFAULT 0,
			plans longtext NULL,
			recurring tinyint(1) NOT NULL DEFAULT 0,
			starts_at date NULL,
			expires_at date NULL,
			max_uses int(11) NOT NULL DEFAULT 0,
			per_user int(11) NOT NULL DEFAULT 1,
			new_users_only tinyint(1) NOT NULL DEFAULT 0,
			enabled tinyint(1) NOT NULL DEFAULT 1,
			uses int(11) NOT NULL DEFAULT 0,
			meta longtext NULL,
			created_at datetime NULL,
			updated_at datetime NULL,
			PRIMARY KEY  (id),
			UNIQUE KEY code (code)
		) $c;";

		$sql[] = "CREATE TABLE {$t['coupon_uses']} (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			coupon_id bigint(20) unsigned NOT NULL DEFAULT 0,
			user_id bigint(20) unsigned NOT NULL DEFAULT 0,
			email varchar(190) NOT NULL DEFAULT '',
			payment_id bigint(20) unsigned NULL,
			created_at datetime NULL,
			PRIMARY KEY  (id),
			KEY coupon_user (coupon_id, user_id),
			KEY coupon_email (coupon_id, email)
		) $c;";

		$sql[] = "CREATE TABLE {$t['rules']} (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			title varchar(190) NOT NULL DEFAULT '',
			status varchar(20) NOT NULL DEFAULT 'active',
			priority int(11) NOT NULL DEFAULT 10,
			note text NULL,
			protect longtext NULL,
			exclude longtext NULL,
			include_children tinyint(1) NOT NULL DEFAULT 1,
			access longtext NULL,
			action varchar(20) NOT NULL DEFAULT 'inherit',
			redirect bigint(20) unsigned NOT NULL DEFAULT 0,
			custom_message tinyint(1) NOT NULL DEFAULT 0,
			message longtext NULL,
			teaser varchar(20) NOT NULL DEFAULT 'inherit',
			in_lists varchar(20) NOT NULL DEFAULT 'inherit',
			created_at datetime NULL,
			updated_at datetime NULL,
			PRIMARY KEY  (id),
			KEY status_priority (status, priority)
		) $c;";

		$sql[] = "CREATE TABLE {$t['events']} (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			user_id bigint(20) unsigned NULL,
			object_type varchar(30) NOT NULL DEFAULT '',
			object_id bigint(20) unsigned NULL,
			event varchar(40) NOT NULL DEFAULT '',
			message text NULL,
			actor_id bigint(20) unsigned NOT NULL DEFAULT 0,
			data longtext NULL,
			created_at datetime NULL,
			PRIMARY KEY  (id),
			KEY user_id (user_id),
			KEY object (object_type, object_id),
			KEY event_created (event, created_at),
			KEY created_at (created_at)
		) $c;";

		$sql[] = "CREATE TABLE {$t['logs']} (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			level varchar(10) NOT NULL DEFAULT 'info',
			source varchar(30) NOT NULL DEFAULT '',
			message text NULL,
			context longtext NULL,
			created_at datetime NULL,
			PRIMARY KEY  (id),
			KEY level_source (level, source),
			KEY created_at (created_at)
		) $c;";

		$sql[] = "CREATE TABLE {$t['logins']} (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			user_id bigint(20) unsigned NOT NULL DEFAULT 0,
			ip varchar(45) NOT NULL DEFAULT '',
			user_agent varchar(255) NOT NULL DEFAULT '',
			device_label varchar(100) NOT NULL DEFAULT '',
			session_verifier varchar(64) NOT NULL DEFAULT '',
			created_at datetime NULL,
			last_seen_at datetime NULL,
			ended_at datetime NULL,
			PRIMARY KEY  (id),
			KEY user_created (user_id, created_at),
			KEY session_verifier (session_verifier)
		) $c;";

		$sql[] = "CREATE TABLE {$t['stats_daily']} (
			stat_date date NOT NULL,
			metric varchar(40) NOT NULL DEFAULT '',
			object_id bigint(20) unsigned NOT NULL DEFAULT 0,
			value decimal(16,4) NOT NULL DEFAULT 0,
			PRIMARY KEY  (stat_date, metric, object_id)
		) $c;";

		foreach ( $sql as $statement ) {
			dbDelta( $statement );
		}
	}

	/**
	 * Whether a table exists.
	 *
	 * @param string $table Full table name.
	 * @return bool
	 */
	public static function table_exists( $table ) {
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Schema check.
		return $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $table ) ) === $table;
	}

	/**
	 * Whether a column exists.
	 *
	 * @param string $table  Full table name.
	 * @param string $column Column.
	 * @return bool
	 */
	public static function column_exists( $table, $column ) {
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Schema check, table name from the plugin.
		return (bool) $wpdb->get_var( $wpdb->prepare( "SHOW COLUMNS FROM `{$table}` LIKE %s", $column ) );
	}

	/**
	 * Migration 2: data and options from 1.1.x.
	 *
	 * @return void
	 */
	public static function migration_legacy_data() {
		global $wpdb;
		// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- One-time migration on plugin tables.
		$plans = self::table( 'plans' );
		$now   = memberglut_now();

		// Old plan columns → new columns.
		if ( self::column_exists( $plans, 'plan_billing_cycle' ) ) {
			// phpcs:ignore PluginCheck.Security.DirectDB.UnescapedDBParameter -- Table names are built from $wpdb->prefix and the plugin table list; values are prepared.
			$rows = $wpdb->get_results( "SELECT * FROM `{$plans}`", ARRAY_A );
			foreach ( $rows as $row ) {
				$cycle    = isset( $row['plan_billing_cycle'] ) ? $row['plan_billing_cycle'] : 'lifetime';
				$price    = (float) $row['plan_price'];
				$settings = json_decode( (string) $row['settings'], true );
				$settings = is_array( $settings ) ? $settings : array();
				$data     = array(
					'plan_type'     => $price > 0 ? 'paid' : 'free',
					'billing'       => 'one_time',
					'duration_type' => 'unlimited',
					'created_at'    => $row['created_at'] ? $row['created_at'] : $now,
					'updated_at'    => $now,
				);
				if ( in_array( $cycle, array( 'monthly', 'yearly', 'weekly', 'daily' ), true ) && $price > 0 ) {
					$data['billing']         = 'recurring';
					$data['duration_length'] = 1;
					$data['duration_unit']   = array( 'monthly' => 'month', 'yearly' => 'year', 'weekly' => 'week', 'daily' => 'day' )[ $cycle ];
				} elseif ( 'lifetime' !== $cycle && ! empty( $row['plan_duration'] ) ) {
					$data['duration_type']   = 'fixed';
					$data['duration_length'] = (int) $row['plan_duration'];
					$data['duration_unit']   = 'day';
				}
				if ( ! empty( $row['plan_trial_days'] ) ) {
					$data['trial_enabled'] = 1;
					$data['trial_length']  = (int) $row['plan_trial_days'];
					$data['trial_unit']    = 'day';
				}
				$features_table = self::table( 'plan_features' );
				if ( self::table_exists( $features_table ) && empty( $settings['features'] ) ) {
					// phpcs:ignore PluginCheck.Security.DirectDB.UnescapedDBParameter -- Table names are built from $wpdb->prefix and the plugin table list; values are prepared.
					$settings['features'] = $wpdb->get_col( $wpdb->prepare( "SELECT feature_name FROM `{$features_table}` WHERE plan_id = %d ORDER BY feature_order ASC", $row['id'] ) );
				}
				$data['settings'] = wp_json_encode( $settings );
				$wpdb->update( $plans, $data, array( 'id' => $row['id'] ) );
			}
		}

		// Old user plans → subscriptions (only once: skip if subscriptions already has rows).
		$old_subs = self::table( 'user_plans' );
		$subs     = self::table( 'subscriptions' );
		// phpcs:ignore PluginCheck.Security.DirectDB.UnescapedDBParameter -- Table names are built from $wpdb->prefix and the plugin table list; values are prepared.
		if ( self::table_exists( $old_subs ) && ! (int) $wpdb->get_var( "SELECT COUNT(*) FROM `{$subs}`" ) ) {
			// phpcs:ignore PluginCheck.Security.DirectDB.UnescapedDBParameter -- Table names are built from $wpdb->prefix and the plugin table list; values are prepared.
			$rows = $wpdb->get_results( "SELECT * FROM `{$old_subs}`", ARRAY_A );
			foreach ( $rows as $row ) {
				$status = in_array( $row['status'], array( 'active', 'expired', 'canceled', 'pending', 'trialing', 'on_hold' ), true ) ? $row['status'] : 'active';
				$wpdb->insert(
					$subs,
					array(
						'user_id'       => (int) $row['user_id'],
						'plan_id'       => (int) $row['plan_id'],
						'status'        => $status,
						'start_date'    => $row['start_date'] ? $row['start_date'] : $now,
						'expires_at'    => $row['end_date'],
						'trial_ends_at' => $row['trial_end_date'],
						'source'        => 'import',
						'meta'          => wp_json_encode( array( 'legacy_id' => (int) $row['id'] ) ),
						'created_at'    => $row['created_at'] ? $row['created_at'] : $now,
						'updated_at'    => $now,
					)
				);
			}
		}
		// phpcs:enable

		self::migrate_legacy_options();
	}

	/**
	 * Map the 1.1.x options to the new settings.
	 *
	 * @return void
	 */
	private static function migrate_legacy_options() {
		if ( get_option( MemberGlut_Settings::OPTION ) ) {
			return; // Already configured with the new screens.
		}
		$s = array();
		$f = array();

		if ( get_option( 'memberglut_whole_site_login_control' ) ) {
			$s['private_site'] = true;
		}
		$paths = (string) get_option( 'memberglut_whole_site_allowed_pages', '' );
		if ( $paths ) {
			$pages = array();
			$other = array();
			foreach ( array_filter( array_map( 'trim', explode( "\n", $paths ) ) ) as $path ) {
				$page = get_page_by_path( trim( $path, '/' ) );
				if ( $page ) {
					$pages[] = $page->ID;
				} else {
					$other[] = $path;
				}
			}
			$s['private_site_exceptions'] = $pages;
			$s['private_site_paths']      = $other;
		}
		if ( false !== get_option( 'memberglut_override_wp_login', false ) ) {
			$s['replace_wp_pages'] = (bool) get_option( 'memberglut_override_wp_login' );
		}
		foreach ( array( 'login' => 'page_login', 'register' => 'page_register', 'lostpassword' => 'page_lost' ) as $old => $slot ) {
			$slug = trim( (string) get_option( 'memberglut_custom_' . $old . '_url', '' ), '/' );
			if ( $slug ) {
				$page = get_page_by_path( $slug );
				if ( $page ) {
					$f[ $slot ] = $page->ID;
				}
			}
		}
		if ( get_option( 'memberglut_hide_admin_bar' ) ) {
			$s['hide_admin_bar_roles'] = array_values( array_diff( array_keys( wp_roles()->get_names() ), array( 'administrator' ) ) );
		}
		if ( false !== get_option( 'memberglut_auto_login_after_register', false ) ) {
			$s['auto_login'] = (bool) get_option( 'memberglut_auto_login_after_register' );
		}
		$login = (string) get_option( 'memberglut_login_redirect', '' );
		if ( $login ) {
			$s['redirect_login']     = 'url';
			$s['redirect_login_url'] = $login;
		}
		$logout = (string) get_option( 'memberglut_logout_redirect_url', '' );
		if ( $logout ) {
			$s['redirect_logout']     = 'url';
			$s['redirect_logout_url'] = $logout;
		}
		$msg = (string) get_option( 'memberglut_restriction_message', '' );
		if ( $msg && 'This content is restricted to members only.' !== $msg ) {
			$s['msg_logged_out'] = '<p>' . esc_html( $msg ) . '</p>';
			$s['msg_logged_in']  = '<p>' . esc_html( $msg ) . '</p>';
		}
		if ( get_option( 'memberglut_remove_data_on_uninstall' ) ) {
			$s['delete_on_uninstall'] = true;
		}
		if ( get_option( 'users_can_register' ) === '0' && get_option( 'memberglut_registration_enabled' ) === '' ) {
			$s['allow_registration'] = false;
		}
		// Decision D3: the legacy "default role" becomes the WordPress default role.
		$legacy_role = (string) get_option( 'memberglut_default_role', '' );
		if ( $legacy_role && get_role( $legacy_role ) && 'memberglut_basic' !== $legacy_role ) {
			update_option( 'default_role', $legacy_role );
		}

		if ( $s ) {
			MemberGlut_Settings::update( $s );
		}
		if ( $f ) {
			MemberGlut_Settings::update_forms( $f );
		}

		// Capability change log → events.
		$log = get_option( 'memberglut_capability_log', array() );
		if ( is_array( $log ) ) {
			foreach ( $log as $entry ) {
				if ( empty( $entry['role'] ) ) {
					continue;
				}
				MemberGlut_Logger::event(
					'cap_change',
					sprintf( '%s %s on role %s', isset( $entry['action'] ) ? $entry['action'] : 'changed', isset( $entry['capability'] ) ? $entry['capability'] : '', $entry['role'] ),
					array( 'object_type' => 'role', 'actor_id' => isset( $entry['user_id'] ) ? (int) $entry['user_id'] : 0, 'created_at' => isset( $entry['timestamp'] ) ? get_gmt_from_date( $entry['timestamp'] ) : null )
				);
			}
		}
	}

	/**
	 * Migration 3: per-post restriction meta from 1.1.x → `_memberglut_access`.
	 *
	 * @return void
	 */
	public static function migration_legacy_post_meta() {
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- One-time migration.
		$ids = $wpdb->get_col( "SELECT DISTINCT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_memberglut_required_roles'" );
		foreach ( $ids as $post_id ) {
			if ( get_post_meta( $post_id, '_memberglut_access', true ) ) {
				continue;
			}
			$roles = get_post_meta( $post_id, '_memberglut_required_roles', true );
			if ( empty( $roles ) || ! is_array( $roles ) ) {
				continue;
			}
			$message  = (string) get_post_meta( $post_id, '_memberglut_restriction_message', true );
			$redirect = (string) get_post_meta( $post_id, '_memberglut_redirect_url', true );
			$access   = array(
				'who'          => 'roles',
				'roles'        => array_values( array_map( 'sanitize_key', $roles ) ),
				'plans'        => array(),
				'action'       => $redirect ? 'redirect' : 'inherit',
				'redirect_url' => $redirect,
				'msg_logged_out' => $message ? '<p>' . esc_html( $message ) . '</p>' : '',
				'msg_logged_in'  => $message ? '<p>' . esc_html( $message ) . '</p>' : '',
				'teaser'       => 'inherit',
				'in_lists'     => 'inherit',
				'hide_in_menus' => (bool) get_post_meta( $post_id, '_memberglut_hide_menu_item', true ),
			);
			update_post_meta( $post_id, '_memberglut_access', wp_slash( wp_json_encode( $access ) ) );
		}
	}

	/**
	 * Example plans on a brand-new install: Free is active, the paid examples are inactive until configured.
	 *
	 * @return void
	 */
	private static function maybe_create_default_plans() {
		global $wpdb;
		if ( get_option( 'memberglut_default_plans_v2' ) ) {
			return;
		}
		update_option( 'memberglut_default_plans_v2', 1 );
		$table = self::table( 'plans' );
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Install check.
		if ( (int) $wpdb->get_var( "SELECT COUNT(*) FROM `{$table}`" ) > 0 ) {
			return;
		}
		$now     = memberglut_now();
		$base    = array( 'role' => 'memberglut_basic', 'created_at' => $now, 'updated_at' => $now, 'plan_group' => 'Main' );
		$plans   = array(
			array( 'plan_name' => __( 'Free', 'memberglut' ), 'plan_slug' => 'free', 'plan_description' => __( 'Read free articles and join the newsletter.', 'memberglut' ), 'plan_status' => 'active', 'plan_order' => 1, 'plan_color' => '#64748b', 'plan_type' => 'free', 'billing' => 'one_time', 'plan_price' => 0, 'duration_type' => 'unlimited', 'role' => 'memberglut_basic', 'features' => array( __( 'Free articles', 'memberglut' ), __( 'Newsletter', 'memberglut' ) ) ),
			array( 'plan_name' => __( 'Silver', 'memberglut' ), 'plan_slug' => 'silver', 'plan_description' => __( 'All premium articles and monthly Q&A.', 'memberglut' ), 'plan_status' => 'inactive', 'plan_order' => 2, 'plan_color' => '#94a3b8', 'plan_type' => 'paid', 'billing' => 'recurring', 'plan_price' => 9, 'duration_length' => 1, 'duration_unit' => 'month', 'role' => 'memberglut_premium', 'features' => array( __( 'All premium articles', 'memberglut' ), __( 'Monthly Q&A', 'memberglut' ) ) ),
			array( 'plan_name' => __( 'Gold', 'memberglut' ), 'plan_slug' => 'gold', 'plan_description' => __( 'Everything in Silver plus courses and downloads.', 'memberglut' ), 'plan_status' => 'inactive', 'plan_order' => 3, 'plan_color' => '#f59e0b', 'plan_type' => 'paid', 'billing' => 'recurring', 'plan_price' => 89, 'duration_length' => 1, 'duration_unit' => 'year', 'role' => 'memberglut_vip', 'featured' => 1, 'features' => array( __( 'Everything in Silver', 'memberglut' ), __( 'Courses', 'memberglut' ), __( 'Downloads', 'memberglut' ) ) ),
		);
		foreach ( $plans as $plan ) {
			$features = $plan['features'];
			unset( $plan['features'] );
			$plan['settings'] = wp_json_encode( array( 'features' => $features ) );
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery -- Install.
			$wpdb->insert( $table, array_merge( $base, $plan ) );
		}
	}
}
