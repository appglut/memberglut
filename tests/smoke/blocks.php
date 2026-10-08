<?php
/**
 * Smoke test (development only — not shipped, see .distignore). Run with tests/smoke/run.sh.
 *
 * @package MemberGlut
 */

// phpcs:ignoreFile -- CLI test script that prints plain-text results.

defined( 'ABSPATH' ) || exit;

$reg = WP_Block_Type_Registry::get_instance();
$names = array_filter( array_keys( $reg->get_all_registered() ), fn( $n ) => 0 === strpos( $n, 'memberglut/' ) );
echo count( $names ) . " blocks: " . implode( ',', $names ) . "\n";
echo "count block: " . trim( wp_strip_all_tags( do_blocks( '<!-- wp:memberglut/count {"status":"active"} /-->' ) ) ) . "\n";
echo "plans block len=" . strlen( do_blocks( '<!-- wp:memberglut/plans {"layout":"cards"} /-->' ) ) . "\n";
$free = MemberGlut_Plans::get( 'free' );
$wrapped = '<!-- wp:memberglut/restrict {"plans":[' . $free['id'] . '],"message":"Only free members"} --><!-- wp:paragraph --><p>SECRET</p><!-- /wp:paragraph --><!-- /wp:memberglut/restrict -->';
wp_set_current_user( 0 );
$out = do_blocks( $wrapped ); echo "guest: secret=" . ( strpos( $out, 'SECRET' ) ? 'y' : 'n' ) . " msg=" . ( strpos( $out, 'Only free members' ) ? 'y' : 'n' ) . "\n";
wp_set_current_user( 1 );
$out = do_blocks( $wrapped ); echo "admin: secret=" . ( strpos( $out, 'SECRET' ) ? 'y' : 'n' ) . "\n";
$r = new WP_REST_Request( 'GET', '/wp/v2/block-renderer/memberglut/count' ); $r->set_param( 'context', 'edit' ); $r->set_param( 'attributes', array( 'status' => 'active' ) );
$res = rest_do_request( $r ); echo "SSR status=" . $res->get_status() . " rendered=" . trim( wp_strip_all_tags( $res->get_data()['rendered'] ?? '' ) ) . "\n";
