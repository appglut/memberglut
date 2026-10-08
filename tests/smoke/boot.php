<?php
/**
 * Smoke-test bootstrap: loads WordPress as user 1 and runs one test script.
 *
 * Usage (from the plugin folder, on a development site — tests create and delete their own data):
 *   php tests/smoke/boot.php tests/smoke/checkout.php
 * Set WP_LOAD to the path of wp-load.php if the plugin is not in wp-content/plugins/.
 *
 * @package MemberGlut
 */

define( 'WP_USE_THEMES', false );
$_SERVER['HTTP_HOST'] = getenv( 'WP_HOST' ) ? getenv( 'WP_HOST' ) : 'localhost';
require getenv( 'WP_LOAD' ) ? getenv( 'WP_LOAD' ) : dirname( __DIR__, 5 ) . '/wp-load.php';
wp_set_current_user( 1 );

/**
 * Internal REST request.
 *
 * @param string     $method Method.
 * @param string     $path   Path under memberglut/v1.
 * @param array|null $body   JSON body.
 * @param array      $query  Query params.
 * @return array [ status, data ]
 */
function rest( $method, $path, $body = null, $query = array() ) {
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
require $argv[1];
