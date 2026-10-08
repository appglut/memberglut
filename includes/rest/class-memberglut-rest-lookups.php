<?php
/**
 * Lookup endpoints: /lookups, /lookups/posts, /lookups/terms, /lookups/users, /lookups/pages.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Lookups class.
 */
class MemberGlut_REST_Lookups extends MemberGlut_REST_Controller {

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		register_rest_route(
			self::NS,
			'/lookups(?:/(?P<kind>posts|terms|users|pages))?',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get' ),
				'permission_callback' => array( 'MemberGlut_Permissions', 'can_access_admin' ),
			)
		);
	}

	/**
	 * Handle a lookup request.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function get( WP_REST_Request $request ) {
		$search  = sanitize_text_field( (string) $request->get_param( 'search' ) );
		$include = array_filter( array_map( 'absint', (array) $request->get_param( 'include' ) ) );
		switch ( $request->get_param( 'kind' ) ) {
			case 'posts':
				$type = (string) $request->get_param( 'type' );
				return rest_ensure_response( MemberGlut_Lookups::search_posts( $search, $type ? $type : 'any', $include ) );
			case 'terms':
				return rest_ensure_response( MemberGlut_Lookups::search_terms( (string) $request->get_param( 'taxonomy' ), $search, $include ) );
			case 'users':
				return rest_ensure_response( MemberGlut_Lookups::search_users( $search, $include ) );
			case 'pages':
				return rest_ensure_response( MemberGlut_Lookups::pages() );
		}
		return rest_ensure_response( MemberGlut_Lookups::all() );
	}
}
