<?php
/**
 * Daily counters (stats_daily): paywall views and conversions, daily snapshots for the dashboard chart.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Stats class.
 */
class MemberGlut_Stats {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'memberglut_user_registered', array( __CLASS__, 'conversion' ) );
		add_action( 'memberglut_payment_completed', array( __CLASS__, 'conversion_payment' ) );
	}

	/**
	 * Table name.
	 *
	 * @return string
	 */
	private static function table() {
		return MemberGlut_Install::table( 'stats_daily' );
	}

	/**
	 * Add to a counter for today (site timezone).
	 *
	 * @param string $metric    Metric.
	 * @param int    $object_id Rule / plan ID or 0.
	 * @param float  $by        Amount.
	 * @param string $date      Y-m-d (default today).
	 * @return void
	 */
	public static function increment( $metric, $object_id = 0, $by = 1, $date = '' ) {
		global $wpdb;
		$date  = $date ? $date : wp_date( 'Y-m-d' );
		$table = self::table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Plugin table upsert.
		$wpdb->query( $wpdb->prepare( "INSERT INTO `{$table}` (stat_date, metric, object_id, value) VALUES (%s, %s, %d, %f) ON DUPLICATE KEY UPDATE value = value + VALUES(value)", $date, $metric, (int) $object_id, (float) $by ) );
	}

	/**
	 * Set a counter.
	 *
	 * @param string $metric    Metric.
	 * @param float  $value     Value.
	 * @param string $date      Y-m-d.
	 * @param int    $object_id Object.
	 * @return void
	 */
	public static function set( $metric, $value, $date, $object_id = 0 ) {
		global $wpdb;
		$table = self::table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Plugin table upsert.
		$wpdb->query( $wpdb->prepare( "INSERT INTO `{$table}` (stat_date, metric, object_id, value) VALUES (%s, %s, %d, %f) ON DUPLICATE KEY UPDATE value = VALUES(value)", $date, $metric, (int) $object_id, (float) $value ) );
	}

	/**
	 * Sum of a metric between two dates (inclusive, Y-m-d).
	 *
	 * @param string   $metric    Metric.
	 * @param string   $from      From.
	 * @param string   $to        To.
	 * @param int|null $object_id Only this object.
	 * @return float
	 */
	public static function sum( $metric, $from, $to, $object_id = null ) {
		global $wpdb;
		$table = self::table();
		$sql   = $wpdb->prepare( "SELECT COALESCE(SUM(value),0) FROM `{$table}` WHERE metric = %s AND stat_date BETWEEN %s AND %s", $metric, $from, $to ); // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Plugin table.
		if ( null !== $object_id ) {
			$sql .= $wpdb->prepare( ' AND object_id = %d', $object_id );
		}
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.NotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Prepared above.
		return (float) $wpdb->get_var( $sql );
	}

	/**
	 * Values of a metric per day.
	 *
	 * @param string $metric Metric.
	 * @param string $from   From.
	 * @param string $to     To.
	 * @return array date => value
	 */
	public static function series( $metric, $from, $to ) {
		global $wpdb;
		$table = self::table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Plugin table.
		$rows = $wpdb->get_results( $wpdb->prepare( "SELECT stat_date, SUM(value) AS v FROM `{$table}` WHERE metric = %s AND stat_date BETWEEN %s AND %s GROUP BY stat_date", $metric, $from, $to ), ARRAY_A );
		$out  = array();
		foreach ( (array) $rows as $r ) {
			$out[ $r['stat_date'] ] = (float) $r['v'];
		}
		return $out;
	}

	/**
	 * Very small bot check (paywall views are only counted for people).
	 *
	 * @return bool
	 */
	public static function is_bot() {
		$ua = isset( $_SERVER['HTTP_USER_AGENT'] ) ? strtolower( sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) ) : '';
		return '' === $ua || (bool) preg_match( '/bot|crawl|spider|slurp|facebookexternalhit|preview|monitor|curl|wget|python|headless/', $ua );
	}

	/**
	 * Joined after seeing a paywall (within 30 days).
	 *
	 * @return void
	 */
	public static function conversion() {
		if ( empty( $_COOKIE['mg_paywall'] ) ) {
			return;
		}
		$c = json_decode( sanitize_text_field( wp_unslash( $_COOKIE['mg_paywall'] ) ), true );
		if ( ! is_array( $c ) || empty( $c['t'] ) || $c['t'] < time() - 30 * DAY_IN_SECONDS ) {
			return;
		}
		self::increment( 'paywall_conversions', isset( $c['r'] ) ? (int) $c['r'] : 0 );
		if ( ! headers_sent() ) {
			setcookie( 'mg_paywall', '', time() - 3600, COOKIEPATH ? COOKIEPATH : '/', COOKIE_DOMAIN, is_ssl(), true );
		}
		unset( $_COOKIE['mg_paywall'] );
	}

	/**
	 * Paid conversions count too (first payment of a new subscription).
	 *
	 * @param array $payment Payment.
	 * @return void
	 */
	public static function conversion_payment( $payment ) {
		if ( 'new' === $payment['type'] ) {
			self::conversion();
		}
	}
}
