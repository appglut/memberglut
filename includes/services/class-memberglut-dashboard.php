<?php
/**
 * Dashboard numbers (cached 5 minutes, cleared on subscription and payment changes) and the setup checklist.
 *
 * Definitions match the Members and Payments screens:
 *  - active members  = distinct users with a subscription that grants access (active, trialing, canceled until expiry)
 *  - revenue         = completed payments minus refunds, by creation month in the site timezone
 *  - MRR             = active recurring subscriptions normalised to one month
 *  - churn           = subscriptions canceled this month ÷ active members at the start of the month
 *
 * A daily snapshot of active members (stats_daily, metric active_members) keeps the members chart right even after
 * subscriptions are deleted; months without a snapshot are rebuilt from subscription history.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Dashboard class.
 */
class MemberGlut_Dashboard {

	const CACHE = 'memberglut_dashboard_stats';

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'memberglut_daily', array( __CLASS__, 'snapshot' ) );
		foreach ( array( 'memberglut_subscription_status_changed', 'memberglut_subscription_renewed', 'memberglut_payment_completed', 'memberglut_payment_refunded', 'memberglut_member_approved', 'memberglut_member_rejected', 'memberglut_account_pending' ) as $hook ) {
			add_action( $hook, array( __CLASS__, 'flush' ) );
		}
	}

	/**
	 * Clear the cached numbers.
	 *
	 * @return void
	 */
	public static function flush() {
		delete_transient( self::CACHE );
	}

	/**
	 * UTC MySQL date of a site-timezone date string.
	 *
	 * @param string $local Local date (Y-m-d H:i:s).
	 * @return string
	 */
	private static function utc( $local ) {
		return get_gmt_from_date( $local );
	}

	/**
	 * Active members at a moment (UTC), rebuilt from subscription history.
	 *
	 * @param string $at UTC date.
	 * @return int
	 */
	public static function active_at( $at ) {
		global $wpdb;
		$t = memberglut_repo( 'subscriptions' )->table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Plugin table.
		return (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(DISTINCT user_id) FROM `{$t}` WHERE user_id > 0 AND status NOT IN ('pending','abandoned') AND start_date IS NOT NULL AND start_date <= %s AND (expires_at IS NULL OR expires_at > %s)", $at, $at ) );
	}

	/**
	 * Active members now (same rule as grants_access()).
	 *
	 * @return int
	 */
	public static function active_now() {
		global $wpdb;
		$t = memberglut_repo( 'subscriptions' )->table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Plugin table.
		return (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(DISTINCT user_id) FROM `{$t}` WHERE user_id > 0 AND ( status IN ('active','trialing') OR ( status = 'canceled' AND expires_at > %s ) )", memberglut_now() ) );
	}

	/**
	 * Net revenue between two UTC dates.
	 *
	 * @param string $from UTC from (inclusive).
	 * @param string $to   UTC to (exclusive).
	 * @return float
	 */
	public static function revenue( $from, $to ) {
		global $wpdb;
		$t = memberglut_repo( 'payments' )->table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Plugin table.
		return round( (float) $wpdb->get_var( $wpdb->prepare( "SELECT COALESCE(SUM(amount - refunded_amount),0) FROM `{$t}` WHERE status IN ('completed','refunded') AND created_at >= %s AND created_at < %s", $from, $to ) ), 2 );
	}

	/**
	 * Monthly recurring revenue.
	 *
	 * @return float
	 */
	public static function mrr() {
		$per_month = array( 'day' => 30.44, 'week' => 4.345, 'month' => 1, 'year' => 1 / 12 );
		$total     = 0.0;
		foreach ( memberglut_repo( 'subscriptions' )->query( array( 'where' => array( 'status' => 'active', 'next_payment_at IS NOT NULL' => true ) ) ) as $s ) {
			$plan = MemberGlut_Plans::get( $s['plan_id'] );
			if ( ! $plan || 'paid' !== $plan['type'] || 'recurring' !== $plan['billing'] ) {
				continue;
			}
			$amount = null !== $s['billing_amount'] && '' !== $s['billing_amount'] ? (float) $s['billing_amount'] : (float) $plan['price'];
			$unit   = isset( $per_month[ $plan['duration']['unit'] ] ) ? $per_month[ $plan['duration']['unit'] ] : 1;
			$total += $amount * $unit / max( 1, (int) $plan['duration']['length'] );
		}
		return round( $total, 2 );
	}

	/**
	 * Percentage change (one decimal; 0 when there is nothing to compare with).
	 *
	 * @param float $now  Now.
	 * @param float $prev Before.
	 * @return float
	 */
	private static function change( $now, $prev ) {
		if ( $prev <= 0 ) {
			return $now > 0 ? 100.0 : 0.0;
		}
		return round( ( $now - $prev ) / $prev * 100, 1 );
	}

	/**
	 * Distinct members who joined between two UTC dates.
	 *
	 * @param string $from From.
	 * @param string $to   To.
	 * @return int
	 */
	private static function joined( $from, $to ) {
		global $wpdb;
		$t = memberglut_repo( 'subscriptions' )->table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Plugin table.
		return (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(DISTINCT user_id) FROM `{$t}` WHERE user_id > 0 AND status NOT IN ('pending','abandoned') AND created_at >= %s AND created_at < %s", $from, $to ) );
	}

	/**
	 * All dashboard numbers.
	 *
	 * @param bool $fresh Skip the cache.
	 * @return array
	 */
	public static function stats( $fresh = false ) {
		$cached = $fresh ? false : get_transient( self::CACHE );
		if ( is_array( $cached ) ) {
			return $cached;
		}
		$now        = memberglut_now();
		$month      = self::utc( wp_date( 'Y-m-01 00:00:00' ) );
		$prev_month = self::utc( wp_date( 'Y-m-01 00:00:00', strtotime( '-1 month', strtotime( wp_date( 'Y-m-15' ) ) ) ) );
		$d30        = gmdate( 'Y-m-d H:i:s', time() - 30 * DAY_IN_SECONDS );
		$d60        = gmdate( 'Y-m-d H:i:s', time() - 60 * DAY_IN_SECONDS );
		$d7         = gmdate( 'Y-m-d H:i:s', time() + 7 * DAY_IN_SECONDS );
		$subs       = memberglut_repo( 'subscriptions' );

		// Revenue this month vs the same span of last month.
		$elapsed      = time() - strtotime( $month . ' UTC' );
		$rev_month    = self::revenue( $month, gmdate( 'Y-m-d H:i:s', time() + 1 ) );
		$rev_prev     = self::revenue( $prev_month, gmdate( 'Y-m-d H:i:s', strtotime( $prev_month . ' UTC' ) + $elapsed ) );
		$new_30       = self::joined( $d30, gmdate( 'Y-m-d H:i:s', time() + 1 ) );
		$new_prev     = self::joined( $d60, $d30 );
		$active_start = self::snapshot_value( wp_date( 'Y-m-d', strtotime( $month . ' UTC' ) - 1 ) );
		if ( null === $active_start ) {
			$active_start = self::active_at( $month );
		}
		$canceled_month = $subs->count( array( 'where' => array( 'canceled_at >=' => $month ) ) );

		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Count of a user meta value.
		$pending = (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM {$wpdb->usermeta} WHERE meta_key = %s AND meta_value IN ('pending_admin','pending_email')", MemberGlut_Approval::META ) );

		$out = array(
			'active_members'     => self::active_now(),
			'pending'            => $pending,
			'revenue_month'      => $rev_month,
			'revenue_change'     => self::change( $rev_month, $rev_prev ),
			'mrr'                => self::mrr(),
			'new_members_30d'    => $new_30,
			'new_members_change' => self::change( $new_30, $new_prev ),
			'canceled_30d'       => $subs->count( array( 'where' => array( 'canceled_at >=' => $d30 ) ) ),
			'expiring_7d'        => $subs->count( array( 'where' => array( 'status' => array( 'active', 'canceled' ), 'next_payment_at IS NULL' => true, 'expires_at >' => $now, 'expires_at <=' => $d7 ) ) ),
			'churn'              => $active_start ? round( $canceled_month / $active_start * 100, 1 ) : 0.0,
			'chart'              => self::chart(),
			'currency'           => memberglut_setting( 'currency', 'USD' ),
			'generated'          => memberglut_iso( $now ),
		);
		$out = apply_filters( 'memberglut_dashboard_stats', $out );
		set_transient( self::CACHE, $out, 5 * MINUTE_IN_SECONDS );
		return $out;
	}

	/**
	 * 12 months of members and revenue, oldest first.
	 *
	 * @return array[] { month: Y-m, members, revenue }
	 */
	public static function chart() {
		$out   = array();
		$first = strtotime( wp_date( 'Y-m-15' ) );
		for ( $i = 11; $i >= 0; $i-- ) {
			$mid        = strtotime( "-{$i} month", $first );
			$start      = self::utc( wp_date( 'Y-m-01 00:00:00', $mid ) );
			$next_local = wp_date( 'Y-m-01 00:00:00', strtotime( '+1 month', $mid ) );
			$end        = self::utc( $next_local );
			$is_current = 0 === $i;
			if ( $is_current ) {
				$members = self::active_now();
			} else {
				$snap    = self::snapshot_value( wp_date( 'Y-m-t', $mid ) );
				$members = null === $snap ? self::active_at( $end ) : (int) $snap;
			}
			$out[] = array(
				'month'   => wp_date( 'Y-m', $mid ),
				'members' => $members,
				'revenue' => self::revenue( $start, $end ),
			);
		}
		return $out;
	}

	/**
	 * Stored active-members snapshot of a day.
	 *
	 * @param string $date Y-m-d.
	 * @return int|null
	 */
	private static function snapshot_value( $date ) {
		global $wpdb;
		$t = MemberGlut_Install::table( 'stats_daily' );
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Plugin table.
		$v = $wpdb->get_var( $wpdb->prepare( "SELECT value FROM `{$t}` WHERE stat_date = %s AND metric = 'active_members' AND object_id = 0", $date ) );
		return null === $v ? null : (int) $v;
	}

	/**
	 * Daily: store today's active members (per plan too).
	 *
	 * @return void
	 */
	public static function snapshot() {
		$today = wp_date( 'Y-m-d' );
		MemberGlut_Stats::set( 'active_members', self::active_now(), $today );
		foreach ( MemberGlut_Plans::member_counts() as $plan_id => $n ) {
			MemberGlut_Stats::set( 'active_members', (int) $n, $today, (int) $plan_id );
		}
		self::flush();
	}

	/**
	 * Setup checklist.
	 *
	 * @return array[] key, label, done, target, args
	 */
	public static function checklist() {
		$pages_done = true;
		foreach ( array( 'register', 'login', 'account', 'lost' ) as $slot ) {
			if ( ! memberglut_page_url( $slot ) ) {
				$pages_done = false;
				break;
			}
		}
		$paid = false;
		foreach ( MemberGlut_Plans::all( 'active' ) as $p ) {
			if ( 'paid' === $p['type'] ) {
				$paid = true;
				break;
			}
		}
		$gateway = false;
		foreach ( MemberGlut_Gateways::all() as $g ) {
			if ( ! in_array( $g->id, array( 'free', 'manual' ), true ) && $g->is_enabled() && $g->is_configured() ) {
				$gateway = true;
				break;
			}
		}
		global $wpdb;
		$protect = memberglut_repo( 'rules' )->count( array( 'where' => array( 'status' => 'active' ) ) ) > 0;
		if ( ! $protect ) {
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Existence check.
			$protect = (bool) $wpdb->get_var( $wpdb->prepare( "SELECT 1 FROM {$wpdb->postmeta} WHERE meta_key = %s AND meta_value NOT LIKE %s LIMIT 1", '_memberglut_access', '%"who":"inherit"%' ) );
		}
		$items = array(
			array( 'key' => 'pages', 'label' => __( 'Create the membership pages', 'memberglut' ), 'done' => $pages_done, 'target' => 'forms', 'args' => array() ),
			array( 'key' => 'plan', 'label' => __( 'Create a paid plan', 'memberglut' ), 'done' => $paid, 'target' => 'plan_editor', 'args' => array() ),
			array( 'key' => 'gateway', 'label' => __( 'Set up a payment method', 'memberglut' ), 'done' => $gateway, 'target' => 'settings', 'args' => array( 'tab' => 'payments' ) ),
			array( 'key' => 'rule', 'label' => __( 'Protect some content', 'memberglut' ), 'done' => $protect, 'target' => 'rule_editor', 'args' => array() ),
			array( 'key' => 'emails', 'label' => __( 'Review the member emails', 'memberglut' ), 'done' => (bool) memberglut_form_setting( 'emails_reviewed', false ), 'target' => 'emails', 'args' => array() ),
		);
		return apply_filters( 'memberglut_setup_checklist', $items );
	}
}
