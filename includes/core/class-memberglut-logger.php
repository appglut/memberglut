<?php
/**
 * Debug log and audit events.
 *
 * Debug log lines (`logs` table) are written only when Settings › Advanced › Debug log is on. Audit events (`events`
 * table) are always written: they drive the member activity timeline, the payment log, the dashboard activity and
 * the access log.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Logger class.
 */
class MemberGlut_Logger {

	const LEVELS = array( 'debug', 'info', 'warning', 'error' );

	/**
	 * Write a debug log line.
	 *
	 * @param string $level   Level.
	 * @param string $source  Source.
	 * @param string $message Message.
	 * @param array  $context Context.
	 * @return void
	 */
	public static function log( $level, $source, $message, $context = array() ) {
		$level = in_array( $level, self::LEVELS, true ) ? $level : 'info';
		// Errors are always kept; everything else only with the debug log on.
		if ( 'error' !== $level && ! memberglut_setting( 'debug_log', false ) ) {
			return;
		}
		if ( 'debug' === $level && ! memberglut_setting( 'log_debug', false ) ) {
			return;
		}
		if ( ! self::tables_ready() ) {
			return;
		}
		memberglut_repo( 'logs' )->insert(
			array(
				'level'      => $level,
				'source'     => sanitize_key( $source ),
				'message'    => wp_strip_all_tags( (string) $message ),
				'context'    => $context ? $context : null,
				'created_at' => memberglut_now(),
			)
		);
	}

	/**
	 * Record an audit event.
	 *
	 * @param string $event   Event type.
	 * @param string $message Text.
	 * @param array  $args    user_id, object_type, object_id, actor_id, data, created_at.
	 * @return int
	 */
	public static function event( $event, $message, $args = array() ) {
		if ( ! self::tables_ready() ) {
			return 0;
		}
		$args = wp_parse_args(
			$args,
			array(
				'user_id'     => null,
				'object_type' => '',
				'object_id'   => null,
				'actor_id'    => get_current_user_id(),
				'data'        => null,
				'created_at'  => null,
			)
		);
		$id = memberglut_repo( 'events' )->insert(
			array(
				'user_id'     => $args['user_id'] ? (int) $args['user_id'] : null,
				'object_type' => sanitize_key( $args['object_type'] ),
				'object_id'   => $args['object_id'] ? (int) $args['object_id'] : null,
				'event'       => sanitize_key( $event ),
				'message'     => wp_strip_all_tags( (string) $message ),
				'actor_id'    => (int) $args['actor_id'],
				'data'        => $args['data'],
				'created_at'  => $args['created_at'] ? $args['created_at'] : memberglut_now(),
			)
		);
		do_action( 'memberglut_event_recorded', $id, $event, $message, $args );
		return $id;
	}

	/**
	 * Delete log lines older than the retention setting.
	 *
	 * @return int Rows deleted.
	 */
	public static function cleanup() {
		$days = (int) memberglut_setting( 'log_retention_days', 30 );
		$date = gmdate( 'Y-m-d H:i:s', time() - $days * DAY_IN_SECONDS );
		return memberglut_repo( 'logs' )->delete_where( array( 'created_at <' => $date ) );
	}

	/**
	 * Tables exist (avoid errors during activation).
	 *
	 * @return bool
	 */
	private static function tables_ready() {
		return (int) get_option( MemberGlut_Install::VERSION_OPTION, 0 ) >= 1;
	}
}
