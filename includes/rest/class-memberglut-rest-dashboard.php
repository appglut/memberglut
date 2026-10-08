<?php
/**
 * Dashboard endpoints: GET /dashboard/stats (?fresh=1) · GET /dashboard/checklist.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Dashboard class.
 */
class MemberGlut_REST_Dashboard extends MemberGlut_REST_Controller {

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$this->route( '/dashboard/stats', 'GET', 'stats', 'memberglut_manage_members' );
		$this->route( '/dashboard/checklist', 'GET', 'checklist', 'memberglut_manage_settings' );
	}

	/**
	 * Numbers.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function stats( WP_REST_Request $request ) {
		return rest_ensure_response( MemberGlut_Dashboard::stats( (bool) $request->get_param( 'fresh' ) ) );
	}

	/**
	 * Checklist.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function checklist( WP_REST_Request $request ) {
		return rest_ensure_response( MemberGlut_Dashboard::checklist() );
	}
}
