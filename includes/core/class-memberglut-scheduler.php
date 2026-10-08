<?php
/**
 * Background work: recurring jobs and one-off batches.
 *
 * Two recurring hooks carry all periodic work:
 *  - memberglut_hourly : expiration sweep, scheduled plan changes.
 *  - memberglut_daily  : reminder emails, payment retries, bank renewals, log cleanup, stats snapshot.
 *
 * Settings › Advanced › renewals_engine picks Action Scheduler (hourly, bundled) or WP-Cron (daily).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Scheduler class.
 */
class MemberGlut_Scheduler {

	const GROUP = 'memberglut';

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'ensure_scheduled' ), 20 );
		add_action( 'memberglut_settings_updated', array( __CLASS__, 'on_settings_updated' ), 10, 2 );
		add_action( 'memberglut_daily', array( 'MemberGlut_Logger', 'cleanup' ), 50 );
	}

	/**
	 * Whether Action Scheduler should be used.
	 *
	 * @return bool
	 */
	public static function uses_action_scheduler() {
		return 'action_scheduler' === memberglut_setting( 'renewals_engine', 'action_scheduler' ) && function_exists( 'as_schedule_recurring_action' );
	}

	/**
	 * Whether the Action Scheduler data store is ready.
	 *
	 * @return bool
	 */
	public static function as_ready() {
		return class_exists( 'ActionScheduler', false ) && method_exists( 'ActionScheduler', 'is_initialized' ) && ActionScheduler::is_initialized();
	}

	/**
	 * Schedule recurring hooks if missing (cheap check, runs on init).
	 *
	 * @return void
	 */
	public static function ensure_scheduled() {
		if ( self::uses_action_scheduler() ) {
			if ( ! self::as_ready() ) {
				return;
			}
			if ( function_exists( 'as_has_scheduled_action' ) && ! as_has_scheduled_action( 'memberglut_hourly', array(), self::GROUP ) ) {
				as_schedule_recurring_action( time() + 60, HOUR_IN_SECONDS, 'memberglut_hourly', array(), self::GROUP );
			}
			if ( function_exists( 'as_has_scheduled_action' ) && ! as_has_scheduled_action( 'memberglut_daily', array(), self::GROUP ) ) {
				as_schedule_recurring_action( time() + 300, DAY_IN_SECONDS, 'memberglut_daily', array(), self::GROUP );
			}
			return;
		}
		if ( ! wp_next_scheduled( 'memberglut_hourly' ) ) {
			wp_schedule_event( time() + 60, 'daily', 'memberglut_hourly' );
		}
		if ( ! wp_next_scheduled( 'memberglut_daily' ) ) {
			wp_schedule_event( time() + 300, 'daily', 'memberglut_daily' );
		}
	}

	/**
	 * Called on activation.
	 *
	 * @return void
	 */
	public static function schedule_recurring() {
		if ( did_action( 'init' ) ) {
			self::ensure_scheduled();
		}
	}

	/**
	 * Remove every recurring schedule from both engines.
	 *
	 * @return void
	 */
	public static function unschedule_all() {
		if ( function_exists( 'as_unschedule_all_actions' ) ) {
			as_unschedule_all_actions( 'memberglut_hourly', array(), self::GROUP );
			as_unschedule_all_actions( 'memberglut_daily', array(), self::GROUP );
		}
		wp_clear_scheduled_hook( 'memberglut_hourly' );
		wp_clear_scheduled_hook( 'memberglut_daily' );
	}

	/**
	 * Engine switched: move the schedules.
	 *
	 * @param array $new New settings.
	 * @param array $old Old settings.
	 * @return void
	 */
	public static function on_settings_updated( $new, $old ) {
		if ( $new['renewals_engine'] !== $old['renewals_engine'] ) {
			self::unschedule_all();
			self::ensure_scheduled();
		}
	}

	/**
	 * Run a hook in the background as soon as possible.
	 *
	 * @param string $hook Hook.
	 * @param array  $args Args (one array passed as the first argument).
	 * @return void
	 */
	public static function enqueue( $hook, $args = array() ) {
		if ( function_exists( 'as_enqueue_async_action' ) && self::as_ready() ) {
			as_enqueue_async_action( $hook, array( $args ), self::GROUP );
			return;
		}
		wp_schedule_single_event( time(), $hook, array( $args ) );
	}

	/**
	 * Run a hook at a given time.
	 *
	 * @param int    $timestamp When (UTC timestamp).
	 * @param string $hook      Hook.
	 * @param array  $args      Args.
	 * @return void
	 */
	public static function at( $timestamp, $hook, $args = array() ) {
		if ( function_exists( 'as_schedule_single_action' ) && self::as_ready() ) {
			as_schedule_single_action( $timestamp, $hook, array( $args ), self::GROUP );
			return;
		}
		wp_schedule_single_event( $timestamp, $hook, array( $args ) );
	}

	/**
	 * Next run of a recurring hook (UTC timestamp or 0).
	 *
	 * @param string $hook Hook.
	 * @return int
	 */
	public static function next_run( $hook ) {
		if ( self::uses_action_scheduler() && function_exists( 'as_next_scheduled_action' ) && self::as_ready() ) {
			$next = as_next_scheduled_action( $hook, array(), self::GROUP );
			return is_int( $next ) ? $next : ( true === $next ? time() : 0 );
		}
		return (int) wp_next_scheduled( $hook );
	}
}
