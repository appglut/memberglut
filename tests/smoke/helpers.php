<?php
/**
 * Smoke-test helpers (development only — not shipped, see .distignore).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * Internal REST request against memberglut/v1.
 *
 * @param string     $method Method.
 * @param string     $path   Path under memberglut/v1.
 * @param array|null $body   JSON body.
 * @param array      $query  Query params.
 * @return array [ status, data ]
 */
function memberglut_smoke_rest( $method, $path, $body = null, $query = array() ) {
	$r = new WP_REST_Request( $method, '/memberglut/v1' . $path );
	if ( null !== $body ) {
		$r->set_header( 'content-type', 'application/json' );
		$r->set_body( wp_json_encode( $body ) );
	}
	foreach ( $query as $k => $v ) {
		$r->set_param( $k, $v );
	}
	$res = rest_do_request( $r );
	return array( $res->get_status(), $res->get_data() );
}
