<?php
/**
 * Coupon endpoints: GET/POST /coupons · PUT/DELETE /coupons/{id} · POST /coupons/import.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Coupons class.
 */
class MemberGlut_REST_Coupons extends MemberGlut_REST_Controller {

	const CAP = 'memberglut_manage_payments';

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$this->route( '/coupons', 'GET', 'index', self::CAP );
		$this->route( '/coupons', 'POST', 'create', self::CAP );
		$this->route( '/coupons/import', 'POST', 'import', self::CAP );
		$this->route( '/coupons/(?P<id>\d+)', 'PUT,POST', 'update', self::CAP );
		$this->route( '/coupons/(?P<id>\d+)', 'DELETE', 'destroy', self::CAP );
	}

	/**
	 * List.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function index( WP_REST_Request $request ) {
		return rest_ensure_response( MemberGlut_Coupons::all( sanitize_text_field( (string) $request->get_param( 'search' ) ) ) );
	}

	/**
	 * Create.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function create( WP_REST_Request $request ) {
		$d = $this->body( $request );
		unset( $d['id'] );
		$c = MemberGlut_Coupons::save( $d );
		return is_wp_error( $c ) ? $this->as_rest_error( $c ) : rest_ensure_response( $c );
	}

	/**
	 * Update.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function update( WP_REST_Request $request ) {
		$d       = $this->body( $request );
		$d['id'] = (int) $request['id'];
		$c       = MemberGlut_Coupons::save( $d );
		return is_wp_error( $c ) ? $this->as_rest_error( $c ) : rest_ensure_response( $c );
	}

	/**
	 * Delete.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function destroy( WP_REST_Request $request ) {
		MemberGlut_Coupons::delete( (int) $request['id'] );
		return rest_ensure_response( array( 'deleted' => true ) );
	}

	/**
	 * CSV import.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function import( WP_REST_Request $request ) {
		$b   = $this->body( $request );
		$csv = isset( $b['csv'] ) ? (string) $b['csv'] : '';
		if ( '' === trim( $csv ) ) {
			return $this->error( 'empty', __( 'The file is empty.', 'memberglut' ) );
		}
		return rest_ensure_response( MemberGlut_Coupons::import( $csv ) + array( 'coupons' => MemberGlut_Coupons::all() ) );
	}
}
