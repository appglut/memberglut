<?php
add_filter( 'pre_wp_mail', '__return_true' );
echo "components: " . ( has_filter( 'authenticate', array( 'MemberGlut_Security', 'check_lockout' ) ) ? 'security ' : '' ) . ( has_filter( 'wp_privacy_personal_data_exporters', array( 'MemberGlut_Privacy', 'register_exporters' ) ) ? 'privacy' : '' ) . "\n";
$_SERVER['REMOTE_ADDR'] = '203.0.113.' . wp_rand( 1, 200 );
$_SERVER['HTTP_USER_AGENT'] = 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 Chrome/120 Safari/537.36';
$login = 'sec' . wp_rand(); $email = $login . '@example.com';
$uid = wp_create_user( $login, 'Secret123!', $email );
MemberGlut_Settings::update( array( 'limit_failed' => true, 'failed_attempts' => 3, 'lockout_minutes' => 15, 'limit_sessions' => true, 'max_sessions' => 2, 'session_behavior' => 'logout_oldest' ) );
wp_set_current_user( 0 );
$try = function ( $pwd ) use ( $login ) { $r = wp_signon( array( 'user_login' => $login, 'user_password' => $pwd ), false ); return is_wp_error( $r ) ? $r->get_error_code() : 'ok'; };
echo "1 " . $try( 'bad' ) . " 2 " . $try( 'bad' ) . " 3 " . $try( 'bad' ) . "\n";
echo "locked right pwd: " . $try( 'Secret123!' ) . " left=" . MemberGlut_Security::locked_for( $login ) . "\n";
MemberGlut_Security::reset_failed( $login );
// IP limit (6) still counting? reset ip too done by reset_failed. Logins:
foreach ( array( 1, 2, 3 ) as $i ) { echo "login$i " . $try( 'Secret123!' ) . " "; }
echo "\nsessions=" . count( MemberGlut_Security::sessions( $uid ) ) . " history=" . memberglut_repo( 'logins' )->count( array( 'where' => array( 'user_id' => $uid ) ) ) . " ended=" . memberglut_repo( 'logins' )->count( array( 'where' => array( 'user_id' => $uid, 'ended_at IS NOT NULL' => true ) ) ) . "\n";
$row = memberglut_repo( 'logins' )->query( array( 'where' => array( 'user_id' => $uid ), 'orderby' => 'id DESC', 'per_page' => 1 ) )[0];
echo "device={$row['device_label']} ip={$row['ip']} verifier_live=" . ( isset( MemberGlut_Security::sessions( $uid )[ $row['session_verifier'] ] ) ? 'y' : 'n' ) . " last_login=" . ( get_user_meta( $uid, 'memberglut_last_login', true ) ? 'y' : 'n' ) . "\n";
MemberGlut_Settings::update( array( 'session_behavior' => 'block' ) );
echo "block: " . $try( 'Secret123!' ) . "\n";
wp_set_current_user( 1 );
list( $s, $l ) = rest( 'GET', '/logins', null, array( 'user' => $uid ) );
echo "rest logins $s n=" . count( (array) $l ) . " current=" . count( array_filter( array_column( (array) $l, 'current' ) ) ) . "\n";
list( $s ) = rest( 'POST', "/members/user/$uid/logout-all", array() );
echo "logout-all $s sessions=" . count( MemberGlut_Security::sessions( $uid ) ) . " open rows=" . memberglut_repo( 'logins' )->count( array( 'where' => array( 'user_id' => $uid, 'ended_at IS NULL' => true ) ) ) . "\n";
wp_set_current_user( 0 );
echo "after logout-all block lifts: " . $try( 'Secret123!' ) . "\n";
// Admin exempt.
MemberGlut_Settings::update( array( 'max_sessions' => 1 ) );
$adm = get_userdata( 1 );
echo "admin limited? " . ( is_wp_error( MemberGlut_Security::check_sessions( $adm ) ) ? 'y' : 'n' ) . "\n";

// Privacy.
wp_set_current_user( 1 );
MemberGlut_Agreements::record( 'register', $uid );
$free = MemberGlut_Plans::get( 'free' );
$sub = MemberGlut_Subscription_Service::create( $uid, $free['id'], array( 'status' => 'active' ) );
$p = MemberGlut_Payments::create( array( 'user_id' => $uid, 'plan_id' => $free['id'], 'type' => 'manual', 'gateway' => 'manual', 'amount' => 5, 'subtotal' => 5 ) );
$ex = apply_filters( 'wp_privacy_personal_data_exporters', array() );
foreach ( array( 'memberglut-membership', 'memberglut-payments', 'memberglut-logins' ) as $k ) { $r = call_user_func( $ex[ $k ]['callback'], $email, 1 ); echo "export $k items=" . count( $r['data'] ) . " done=" . var_export( $r['done'], true ) . "\n"; }
$er = apply_filters( 'wp_privacy_personal_data_erasers', array() );
$r = call_user_func( $er['memberglut']['callback'], $email, 1 );
echo "erase removed=" . var_export( $r['items_removed'], true ) . " retained=" . var_export( $r['items_retained'], true ) . " msgs=" . implode( ' / ', $r['messages'] ) . "\n";
echo "after: logins=" . memberglut_repo( 'logins' )->count( array( 'where' => array( 'user_id' => $uid ) ) ) . " consents=" . count( MemberGlut_Agreements::consents( $uid ) ) . " sub user=" . MemberGlut_Subscription_Service::get( $sub['id'] )['user_id'] . " payment user=" . MemberGlut_Payments::get( $p['id'] )['user_id'] . " email='" . MemberGlut_Payments::get( $p['id'] )['email'] . "'\n";
MemberGlut_Subscription_Service::expire( $sub['id'] );
$r = call_user_func( $er['memberglut']['callback'], $email, 1 );
echo "erase2 retained=" . var_export( $r['items_retained'], true ) . " sub user=" . memberglut_repo( 'subscriptions' )->find( $sub['id'] )['user_id'] . "\n";

// Cleanup.
require_once ABSPATH . 'wp-admin/includes/user.php'; wp_delete_user( $uid );
memberglut_repo( 'subscriptions' )->delete( $sub['id'] ); memberglut_repo( 'payments' )->delete( $p['id'] );
MemberGlut_Settings::update( array( 'failed_attempts' => 5, 'limit_sessions' => false, 'max_sessions' => 1, 'session_behavior' => 'logout_oldest' ) );
MemberGlut_Security::reset_failed( $login );
echo "done\n";
