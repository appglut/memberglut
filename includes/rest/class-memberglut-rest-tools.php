<?php
/**
 * Data & Logs endpoints:
 * GET/DELETE /logs · GET /tools/status · GET /tools/export/setup · POST /tools/import/preview · POST /tools/import ·
 * POST /tools/convert · POST /tools/maintenance/{task}
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Tools class.
 */
class MemberGlut_REST_Tools extends MemberGlut_REST_Controller {

	const CAP = 'memberglut_manage_settings';

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$this->route( '/logs', 'GET', 'logs', self::CAP );
		$this->route( '/logs', 'DELETE', 'clear_logs', self::CAP );
		$this->route( '/tools/status', 'GET', 'status', self::CAP );
		$this->route( '/tools/export/setup', 'GET', 'export_setup', self::CAP );
		$this->route( '/tools/import/preview', 'POST', 'import_preview', self::CAP );
		$this->route( '/tools/import', 'POST', 'import', self::CAP );
		$this->route( '/tools/convert', 'POST', 'convert', 'memberglut_manage_members' );
		$this->route( '/tools/maintenance/(?P<task>[a-z-]+)', 'POST', 'maintenance', self::CAP );
	}

	/**
	 * Log lines.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function logs( WP_REST_Request $request ) {
		list( $page, $per_page ) = $this->pagination( $request, 20 );
		$where                   = array();
		if ( $request->get_param( 'level' ) ) {
			$where['level'] = sanitize_key( $request->get_param( 'level' ) );
		}
		if ( $request->get_param( 'source' ) ) {
			$where['source'] = sanitize_key( $request->get_param( 'source' ) );
		}
		if ( $request->get_param( 'from' ) ) {
			$where['created_at >='] = memberglut_parse_date( sanitize_text_field( $request->get_param( 'from' ) ) );
		}
		if ( $request->get_param( 'to' ) ) {
			$where['created_at <='] = memberglut_parse_date( sanitize_text_field( $request->get_param( 'to' ) ), true );
		}
		$repo = memberglut_repo( 'logs' );
		$args = array( 'where' => $where, 'search' => sanitize_text_field( (string) $request->get_param( 'search' ) ), 'orderby' => 'id DESC', 'page' => $page, 'per_page' => $per_page );
		$rows = array_map(
			static function ( $l ) {
				return array(
					'id'      => (int) $l['id'],
					'level'   => $l['level'],
					'source'  => $l['source'],
					'message' => $l['message'],
					'context' => $l['context'],
					'date'    => memberglut_iso( $l['created_at'] ),
				);
			},
			$repo->query( $args )
		);
		global $wpdb;
		$table = $repo->table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Plugin table.
		$sources = $wpdb->get_col( "SELECT DISTINCT source FROM `{$table}` ORDER BY source" );
		return $this->paginated(
			$rows,
			$repo->count( $args ),
			$page,
			$per_page,
			array(
				'sources'  => $sources,
				'settings' => array(
					'debug_log'          => (bool) memberglut_setting( 'debug_log', false ),
					'log_retention_days' => (int) memberglut_setting( 'log_retention_days', 30 ),
					'log_debug'          => (bool) memberglut_setting( 'log_debug', false ),
				),
			)
		);
	}

	/**
	 * Delete all log lines.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function clear_logs( WP_REST_Request $request ) {
		$n = memberglut_repo( 'logs' )->delete_where( array( 'id >' => 0 ) );
		return rest_ensure_response( array( 'deleted' => (int) $n ) );
	}

	/**
	 * System status.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function status( WP_REST_Request $request ) {
		return rest_ensure_response( MemberGlut_Tools::status() );
	}

	/**
	 * Setup file.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function export_setup( WP_REST_Request $request ) {
		$sections = $request->get_param( 'sections' );
		$sections = is_array( $sections ) ? $sections : array_filter( explode( ',', (string) $sections ) );
		$response = rest_ensure_response( MemberGlut_Tools::export_setup( array_map( 'sanitize_key', $sections ) ) );
		$response->header( 'Content-Disposition', 'attachment; filename="memberglut-setup-' . gmdate( 'Y-m-d' ) . '.json"' );
		return $response;
	}

	/**
	 * Import preview.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function import_preview( WP_REST_Request $request ) {
		$b   = $this->body( $request );
		$res = MemberGlut_Tools::import_preview( isset( $b['data'] ) ? $b['data'] : null );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( $res );
	}

	/**
	 * Import.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function import( WP_REST_Request $request ) {
		$b        = $this->body( $request );
		$sections = isset( $b['sections'] ) ? array_map( 'sanitize_key', (array) $b['sections'] ) : array();
		$res      = MemberGlut_Tools::import( isset( $b['data'] ) ? $b['data'] : null, $sections );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( $res );
	}

	/**
	 * Convert users.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function convert( WP_REST_Request $request ) {
		$b   = $this->body( $request );
		$res = MemberGlut_Tools::convert( isset( $b['role'] ) ? (string) $b['role'] : '', isset( $b['plan_id'] ) ? (int) $b['plan_id'] : 0, ! empty( $b['send_email'] ) );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( $res );
	}

	/**
	 * Maintenance task.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function maintenance( WP_REST_Request $request ) {
		$res = MemberGlut_Tools::maintenance( (string) $request['task'], $this->body( $request ) );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( $res );
	}
}
