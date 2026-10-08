<?php
/**
 * Gateway webhooks: POST /webhook/{gateway}. Each gateway verifies its own signature.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Webhooks class.
 */
class MemberGlut_REST_Webhooks extends MemberGlut_REST_Controller {

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$this->route( '/webhook/(?P<gateway>[a-z0-9_\-]+)', 'POST', 'handle', false );
	}

	/**
	 * Dispatch.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function handle( WP_REST_Request $request ) {
		$g = MemberGlut_Gateways::get( (string) $request['gateway'] );
		if ( ! $g || ! $g->is_enabled() ) {
			return $this->error( 'unknown_gateway', 'Unknown gateway', 404 );
		}
		$res = $g->handle_webhook( $request );
		return is_wp_error( $res ) ? $res : rest_ensure_response( $res );
	}
}
