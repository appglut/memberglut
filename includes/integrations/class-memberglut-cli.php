<?php
/**
 * WP-CLI: wp memberglut …
 *
 *   wp memberglut plans [--status=<active|inactive>] [--format=<table|csv|json|yaml|count>]
 *   wp memberglut members [--plan=<id|slug>] [--status=<status>] [--search=<text>] [--limit=<n>] [--format=…]
 *   wp memberglut member <user>
 *   wp memberglut grant <user> <plan> [--expires=<YYYY-MM-DD|never>] [--no-email]
 *   wp memberglut revoke <user> <plan>
 *   wp memberglut run <expirations|recount|sync-roles|clear-cache|reminders>
 *   wp memberglut status
 *
 * <user> is an ID, login or email. <plan> is an ID or slug.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * Manage MemberGlut plans and members.
 */
class MemberGlut_CLI {

	/**
	 * Register the command.
	 *
	 * @return void
	 */
	public static function register() {
		if ( defined( 'WP_CLI' ) && WP_CLI && class_exists( 'WP_CLI' ) ) {
			WP_CLI::add_command( 'memberglut', __CLASS__ );
		}
	}

	/**
	 * Resolve a user.
	 *
	 * @param string $value ID, login or email.
	 * @return WP_User
	 */
	private function user( $value ) {
		$user = is_numeric( $value ) ? get_userdata( (int) $value ) : ( is_email( $value ) ? get_user_by( 'email', $value ) : get_user_by( 'login', $value ) );
		if ( ! $user ) {
			WP_CLI::error( sprintf( 'User “%s” not found.', $value ) );
		}
		return $user;
	}

	/**
	 * Resolve a plan.
	 *
	 * @param string $value ID or slug.
	 * @return array
	 */
	private function plan( $value ) {
		$plan = MemberGlut_Plans::get( is_numeric( $value ) ? (int) $value : sanitize_title( $value ) );
		if ( ! $plan ) {
			WP_CLI::error( sprintf( 'Plan “%s” not found.', $value ) );
		}
		return $plan;
	}

	/**
	 * List membership plans.
	 *
	 * ## OPTIONS
	 *
	 * [--status=<status>]
	 * : active or inactive.
	 *
	 * [--format=<format>]
	 * : table, csv, json, yaml or count.
	 * ---
	 * default: table
	 * ---
	 *
	 * @param array $args  Args.
	 * @param array $assoc Options.
	 * @return void
	 */
	public function plans( $args, $assoc ) {
		$rows = array();
		foreach ( MemberGlut_Plans::all( isset( $assoc['status'] ) ? $assoc['status'] : null ) as $p ) {
			$rows[] = array(
				'id'      => $p['id'],
				'slug'    => $p['slug'],
				'name'    => $p['name'],
				'type'    => $p['type'],
				'price'   => 'paid' === $p['type'] ? $p['price'] : 0,
				'billing' => isset( $p['billing'] ) ? $p['billing'] : '',
				'role'    => $p['role'],
				'status'  => $p['status'],
			);
		}
		WP_CLI\Utils\format_items( isset( $assoc['format'] ) ? $assoc['format'] : 'table', $rows, array( 'id', 'slug', 'name', 'type', 'price', 'billing', 'role', 'status' ) );
	}

	/**
	 * List members (one row per subscription).
	 *
	 * ## OPTIONS
	 *
	 * [--plan=<plan>]
	 * : Plan ID or slug.
	 *
	 * [--status=<status>]
	 * : active, trialing, pending, on_hold, canceled, expired…
	 *
	 * [--search=<text>]
	 * : Name, username or email.
	 *
	 * [--limit=<n>]
	 * : Maximum rows (0 = all).
	 * ---
	 * default: 100
	 * ---
	 *
	 * [--format=<format>]
	 * : table, csv, json, yaml or count.
	 * ---
	 * default: table
	 * ---
	 *
	 * @param array $args  Args.
	 * @param array $assoc Options.
	 * @return void
	 */
	public function members( $args, $assoc ) {
		$f = array(
			'page'     => 1,
			'per_page' => isset( $assoc['limit'] ) ? max( 0, (int) $assoc['limit'] ) : 100,
		);
		if ( ! empty( $assoc['plan'] ) ) {
			$f['plan'] = $this->plan( $assoc['plan'] )['id'];
		}
		foreach ( array( 'status', 'search' ) as $k ) {
			if ( ! empty( $assoc[ $k ] ) ) {
				$f[ $k ] = sanitize_text_field( $assoc[ $k ] );
			}
		}
		list( $items ) = MemberGlut_Members::query( $f );
		$rows          = array();
		foreach ( $items as $m ) {
			$rows[] = array(
				'user_id' => $m['user_id'],
				'name'    => $m['name'],
				'email'   => $m['email'],
				'plan'    => $m['plan'],
				'status'  => $m['status'],
				'started' => $m['started'],
				'expires' => $m['expires'] ? $m['expires'] : 'never',
			);
		}
		WP_CLI\Utils\format_items( isset( $assoc['format'] ) ? $assoc['format'] : 'table', $rows, array( 'user_id', 'name', 'email', 'plan', 'status', 'started', 'expires' ) );
	}

	/**
	 * Show one member's memberships.
	 *
	 * ## OPTIONS
	 *
	 * <user>
	 * : User ID, login or email.
	 *
	 * [--format=<format>]
	 * : table, csv, json or yaml.
	 * ---
	 * default: table
	 * ---
	 *
	 * @param array $args  Args.
	 * @param array $assoc Options.
	 * @return void
	 */
	public function member( $args, $assoc ) {
		$user = $this->user( $args[0] );
		$rows = array();
		foreach ( MemberGlut_Subscription_Service::for_user( $user->ID ) as $s ) {
			$plan   = MemberGlut_Plans::get( (int) $s['plan_id'] );
			$rows[] = array(
				'subscription' => $s['id'],
				'plan'         => $plan ? $plan['name'] : '#' . $s['plan_id'],
				'status'       => $s['status'],
				'start'        => $s['start_date'],
				'expires'      => $s['expires_at'] ? $s['expires_at'] : 'never',
				'gateway'      => $s['gateway'],
			);
		}
		WP_CLI::log( sprintf( '%s <%s> · roles: %s', $user->display_name, $user->user_email, implode( ', ', (array) $user->roles ) ) );
		WP_CLI\Utils\format_items( isset( $assoc['format'] ) ? $assoc['format'] : 'table', $rows, array( 'subscription', 'plan', 'status', 'start', 'expires', 'gateway' ) );
	}

	/**
	 * Give a user a plan without payment.
	 *
	 * ## OPTIONS
	 *
	 * <user>
	 * : User ID, login or email.
	 *
	 * <plan>
	 * : Plan ID or slug.
	 *
	 * [--expires=<date>]
	 * : YYYY-MM-DD, or "never". Default: the plan's duration.
	 *
	 * [--no-email]
	 * : Do not send the activation email.
	 *
	 * @param array $args  Args.
	 * @param array $assoc Options.
	 * @return void
	 */
	public function grant( $args, $assoc ) {
		$user    = $this->user( $args[0] );
		$plan    = $this->plan( $args[1] );
		$expires = 'plan';
		if ( ! empty( $assoc['expires'] ) ) {
			$expires = 'never' === $assoc['expires'] ? 'never' : memberglut_parse_date( $assoc['expires'], true );
			if ( ! $expires ) {
				WP_CLI::error( 'Use --expires=YYYY-MM-DD or --expires=never.' );
			}
		}
		$res = MemberGlut_Subscription_Service::create(
			$user->ID,
			$plan['id'],
			array(
				'status'     => 'active',
				'expires'    => $expires,
				'source'     => 'cli',
				'send_email' => (bool) \WP_CLI\Utils\get_flag_value( $assoc, 'email', true ), // --no-email sets email=false.
			)
		);
		if ( is_wp_error( $res ) ) {
			WP_CLI::error( $res->get_error_message() );
		}
		WP_CLI::success( sprintf( '%s now has %s (subscription #%d).', $user->user_login, $plan['name'], $res['id'] ) );
	}

	/**
	 * End a user's plan now.
	 *
	 * ## OPTIONS
	 *
	 * <user>
	 * : User ID, login or email.
	 *
	 * <plan>
	 * : Plan ID or slug.
	 *
	 * @param array $args Args.
	 * @return void
	 */
	public function revoke( $args ) {
		$user = $this->user( $args[0] );
		$plan = $this->plan( $args[1] );
		if ( ! memberglut_get_member( $user->ID )->remove_plan( $plan['id'] ) ) {
			WP_CLI::error( sprintf( '%s has no active %s membership.', $user->user_login, $plan['name'] ) );
		}
		WP_CLI::success( sprintf( '%s removed from %s.', $plan['name'], $user->user_login ) );
	}

	/**
	 * Run a maintenance task now.
	 *
	 * ## OPTIONS
	 *
	 * <task>
	 * : expirations, recount, sync-roles, clear-cache or reminders.
	 *
	 * @param array $args Args.
	 * @return void
	 */
	public function run( $args ) {
		$task = $args[0];
		if ( 'reminders' === $task ) {
			MemberGlut_Mailer::send_reminders();
			WP_CLI::success( 'Reminder emails processed.' );
			return;
		}
		if ( ! in_array( $task, array( 'expirations', 'recount', 'sync-roles', 'clear-cache' ), true ) ) {
			WP_CLI::error( 'Unknown task. Use expirations, recount, sync-roles, clear-cache or reminders.' );
		}
		$res = MemberGlut_Tools::maintenance( $task );
		if ( is_wp_error( $res ) ) {
			WP_CLI::error( $res->get_error_message() );
		}
		WP_CLI::success( wp_strip_all_tags( $res['message'] ) );
	}

	/**
	 * System status: counts, environment and health checks.
	 *
	 * @return void
	 */
	public function status() {
		foreach ( MemberGlut_Tools::environment() as $label => $value ) {
			WP_CLI::log( sprintf( '%-28s %s', $label, is_scalar( $value ) ? $value : wp_json_encode( $value ) ) );
		}
		foreach ( MemberGlut_Tools::status()['counts'] as $key => $n ) {
			WP_CLI::log( sprintf( '%-28s %d', ucfirst( $key ), $n ) );
		}
		foreach ( MemberGlut_Tools::checks() as $c ) {
			WP_CLI::log( sprintf( '[%s] %s', $c['ok'] ? 'ok' : '!!', isset( $c['label'] ) ? $c['label'] : $c['key'] ) );
		}
	}
}
