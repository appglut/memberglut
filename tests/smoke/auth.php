<?php
/**
 * Smoke test (development only — not shipped, see .distignore). Run with tests/smoke/run.sh.
 *
 * @package MemberGlut
 */

// phpcs:ignoreFile -- CLI test script that prints plain-text results.

defined( 'ABSPATH' ) || exit;

$GLOBALS['mails'] = array();
add_filter( 'pre_wp_mail', function ( $r, $a ) { $GLOBALS['mails'][] = $a; return true; }, 10, 2 );
list( $s, $d ) = memberglut_smoke_rest( 'POST', '/forms/pages/create', array() );
echo "pages $s created=" . wp_json_encode( $d['created'] ) . "\n";
MemberGlut_Settings::update( array( 'honeypot' => false ) ); // timing check would block an instant script submit
wp_set_current_user( 0 );
$pub = function ( $route, $data ) {
	$action = str_replace( '-', '_', $route );
	$data['_mgnonce'] = wp_create_nonce( 'memberglut_' . $action );
	return memberglut_smoke_rest( 'POST', '/public/' . $route, $data );
};
$free = MemberGlut_Plans::get( 'free' );
$email = 'reg' . wp_rand() . '@example.com';
list( $s, $r ) = $pub( 'register', array( 'plan' => $free['id'], 'mg' => array( 'email' => 'bad', 'password' => 'short', 'password_confirm' => 'x' ) ) );
echo "invalid $s " . wp_json_encode( $r['data']['fields'] ) . "\n";
list( $s, $r ) = $pub( 'register', array( 'plan' => $free['id'], 'mg' => array( 'email' => $email, 'password' => 'Secret123!', 'password_confirm' => 'Secret123!', 'first_name' => 'Hamza', 'agree_privacy' => 1, 'phone' => '+880 1711 000000', 'country' => 'BD' ) ) );
echo "register $s redirect=" . ( $r['redirect'] ?? '' ) . " message=" . ( $r['message'] ?? '' ) . "\n";
$u = get_user_by( 'email', $email );
echo "user roles=" . implode( ',', $u->roles ) . " plans=" . implode( ',', MemberGlut_Subscription_Service::active_plan_ids( $u->ID ) ) . " phone=" . get_user_meta( $u->ID, 'phone', true ) . " consents=" . count( MemberGlut_Agreements::consents( $u->ID ) ) . " logged_in=" . get_current_user_id() . "\n";
echo "mails: " . implode( ' | ', array_map( fn( $m ) => $m['subject'], $GLOBALS['mails'] ) ) . "\n";
wp_set_current_user( 0 );
list( $s, $r ) = $pub( 'login', array( 'log' => $email, 'pwd' => 'wrong' ) ); echo "login bad $s {$r['message']}\n";
list( $s, $r ) = $pub( 'login', array( 'log' => $email, 'pwd' => 'Secret123!' ) ); echo "login ok $s redirect=" . ( $r['redirect'] ?? '' ) . "\n";
wp_set_current_user( 0 ); $GLOBALS['mails'] = array();
list( $s, $r ) = $pub( 'lost-password', array( 'user_login' => $email ) ); echo "lost $s {$r['message']}\n";
preg_match( '/key=([^&\s]+)&(?:amp;)?login=([^\s<"&]+)/', $GLOBALS['mails'][0]['message'] ?? '', $m );
echo "reset mail: " . ( $GLOBALS['mails'][0]['subject'] ?? 'NONE' ) . " link has key=" . ( $m ? 'y' : 'n' ) . "\n";
if ( $m ) { list( $s, $r ) = $pub( 'reset-password', array( 'key' => urldecode( $m[1] ), 'login' => urldecode( $m[2] ), 'pass1' => 'NewPass456!', 'pass2' => 'NewPass456!' ) ); echo "reset $s {$r['message']}\n"; }
echo "new password works: " . ( wp_check_password( 'NewPass456!', get_user_by( 'email', $email )->user_pass ) ? 'y' : 'n' ) . "\n";
// Admin approval mode.
wp_set_current_user( 1 ); MemberGlut_Settings::update( array( 'approval' => 'admin' ) ); wp_set_current_user( 0 );
$e2 = 'pend' . wp_rand() . '@example.com';
list( $s, $r ) = $pub( 'register', array( 'plan' => $free['id'], 'mg' => array( 'email' => $e2, 'password' => 'Secret123!', 'password_confirm' => 'Secret123!', 'agree_privacy' => 1 ) ) );
$u2 = get_user_by( 'email', $e2 );
echo "admin approval: $s msg=" . substr( $r['message'] ?? '', 0, 40 ) . " status=" . MemberGlut_Approval::status( $u2->ID ) . " sub=" . MemberGlut_Subscription_Service::for_user( $u2->ID )[0]['status'] . "\n";
list( $s, $r ) = $pub( 'login', array( 'log' => $e2, 'pwd' => 'Secret123!' ) ); echo "pending login $s {$r['message']}\n";
wp_set_current_user( 1 ); MemberGlut_Approval::approve( $u2->ID ); echo "after approve sub=" . MemberGlut_Subscription_Service::for_user( $u2->ID )[0]['status'] . "\n";
MemberGlut_Settings::update( array( 'approval' => 'auto', 'honeypot' => true ) );
require_once ABSPATH . 'wp-admin/includes/user.php'; wp_delete_user( $u->ID ); wp_delete_user( $u2->ID );
