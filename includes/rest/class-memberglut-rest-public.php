<?php
/**
 * Public endpoints used by the front-end forms (JavaScript path). Each one verifies the form nonce.
 *
 * POST /public/register · /public/login · /public/lost-password · /public/reset-password
 * (checkout, coupon and account actions are added by their own phases through the same controller).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Public class.
 */
class MemberGlut_REST_Public extends MemberGlut_REST_Controller {

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		foreach ( array( 'register', 'login', 'lost-password', 'reset-password' ) as $route ) {
			$this->route( '/public/' . $route, 'POST', 'handle', false );
		}
		do_action( 'memberglut_public_routes', $this );
	}

	/**
	 * Submitted data (form-encoded or JSON).
	 *
	 * @param WP_REST_Request $request Request.
	 * @return array
	 */
	public static function data( WP_REST_Request $request ) {
		$json = $request->get_json_params();
		$data = is_array( $json ) && $json ? $json : (array) $request->get_body_params();
		return wp_unslash( $data );
	}

	/**
	 * Check the per-form nonce (forms work for logged-out visitors, so the REST cookie nonce can't be used).
	 *
	 * @param array  $data   Data.
	 * @param string $action Action.
	 * @return true|WP_Error
	 */
	public static function check_nonce( $data, $action ) {
		$nonce = isset( $data['_mgnonce'] ) ? sanitize_text_field( (string) $data['_mgnonce'] ) : '';
		if ( ! wp_verify_nonce( $nonce, 'memberglut_' . $action ) ) {
			return new WP_Error( 'memberglut_nonce', __( 'Your session expired. Reload the page and try again.', 'memberglut' ), array( 'status' => 403 ) );
		}
		return true;
	}

	/**
	 * Handle a form.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function handle( WP_REST_Request $request ) {
		$route  = basename( $request->get_route() );
		$action = str_replace( '-', '_', $route );
		$data   = self::data( $request );
		$ok     = self::check_nonce( $data, $action );
		if ( is_wp_error( $ok ) ) {
			return $ok;
		}
		switch ( $action ) {
			case 'register':
				$res = MemberGlut_Auth::register( $data );
				break;
			case 'login':
				$res = MemberGlut_Auth::login( $data );
				break;
			case 'lost_password':
				$res = MemberGlut_Auth::lost_password( $data );
				break;
			case 'reset_password':
				$res = MemberGlut_Auth::reset_password( $data );
				break;
			default:
				$res = new WP_Error( 'memberglut_unknown', __( 'Unknown form.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( is_wp_error( $res ) ) {
			$d = $res->get_error_data();
			$d = is_array( $d ) ? $d : array();
			if ( empty( $d['status'] ) ) {
				$d['status'] = 400;
			}
			return new WP_Error( $res->get_error_code(), $res->get_error_message(), $d );
		}
		return rest_ensure_response( array_merge( array( 'success' => true ), $res ) );
	}
}
