<?php
/**
 * Global settings endpoints: GET/PUT /settings.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Settings class.
 */
class MemberGlut_REST_Settings extends MemberGlut_REST_Controller {

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$this->route( '/settings', 'GET', 'get', 'memberglut_manage_settings' );
		$this->route( '/settings', 'PUT,POST', 'update', 'memberglut_manage_settings' );
	}

	/**
	 * Current values (secrets masked) and defaults.
	 *
	 * @return WP_REST_Response
	 */
	public function get() {
		return rest_ensure_response(
			array(
				'values'   => MemberGlut_Settings::for_client(),
				'defaults' => MemberGlut_Settings::defaults(),
			)
		);
	}

	/**
	 * Save settings.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function update( WP_REST_Request $request ) {
		$body   = $this->body( $request );
		$values = isset( $body['values'] ) && is_array( $body['values'] ) ? $body['values'] : $body;
		$saved  = MemberGlut_Settings::update( $values );
		if ( is_wp_error( $saved ) ) {
			return $this->as_rest_error( $saved );
		}
		return rest_ensure_response(
			array(
				'values'   => MemberGlut_Settings::for_client(),
				'defaults' => MemberGlut_Settings::defaults(),
			)
		);
	}
}
