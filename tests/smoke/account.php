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
$subjects = function () { $s = array_map( fn( $m ) => $m['subject'], $GLOBALS['mails'] ); $GLOBALS['mails'] = array(); return implode( ' | ', $s ); };
add_filter( 'wp_redirect', function ( $l ) { throw new Exception( 'REDIRECT ' . $l ); } );
MemberGlut_Settings::update( array( 'bank_enabled' => true, 'tab_delete' => true, 'allow_abandon' => false, 'allow_cancel' => true, 'cancel_access' => 'period_end' ) );
$plan = MemberGlut_Plans::save( array( 'name' => 'Yearly pass P10', 'type' => 'paid', 'billing' => 'one_time', 'price' => 20, 'duration_type' => 'fixed', 'duration' => array( 'length' => 1, 'unit' => 'month' ), 'gateways' => array( 'bank' ), 'status' => 'active', 'group' => 'P10' ) );
if ( is_wp_error( $plan ) ) { echo "plan error: " . wp_json_encode( $plan->get_error_data() ) . "\n"; return; }
echo "plan {$plan['id']} billing={$plan['billing']} label=" . MemberGlut_Plans::price_label( $plan ) . "\n";
$uid = wp_create_user( 'acct' . wp_rand(), 'Secret123!', 'acct' . wp_rand() . '@example.com' );
wp_update_user( array( 'ID' => $uid, 'display_name' => 'Acct Tester', 'first_name' => 'Acct' ) );
wp_set_current_user( $uid );
$sub = MemberGlut_Subscription_Service::create( $uid, $plan['id'], array( 'status' => 'active' ) );
echo "sub {$sub['status']} expires={$sub['expires_at']}\n";
$u = wp_get_current_user();

// Tabs render.
foreach ( array_keys( MemberGlut_Account::tabs( $uid ) ) as $t ) {
	$_GET['tab'] = $t;
	$html = MemberGlut_Account::account();
	echo "tab $t len=" . strlen( $html ) . ( strpos( $html, 'is-active' ) ? '' : ' NOACTIVE' ) . "\n";
}
$_GET['tab'] = 'subscriptions';
$html = MemberGlut_Account::account();
echo "subs actions: cancel=" . ( strpos( $html, 'value="cancel"' ) ? 'y' : 'n' ) . " renew=" . ( strpos( $html, '>Renew<' ) ? 'y' : 'n' ) . " abandon=" . ( strpos( $html, 'value="abandon"' ) ? 'y' : 'n' ) . "\n";
unset( $_GET['tab'] );

// Profile.
$r = MemberGlut_Account::save_profile( $u, array( 'mg' => array( 'email' => 'bad', 'display_name' => '' ) ) );
echo "profile invalid: " . wp_json_encode( $r->get_error_data()['fields'] ) . "\n";
$GLOBALS['mails'] = array();
$new_email = 'changed' . wp_rand() . '@example.com';
$r = MemberGlut_Account::save_profile( $u, array( 'mg' => array( 'email' => $new_email, 'display_name' => 'Acct Renamed', 'first_name' => 'A' ), 'directory' => 1 ) );
echo "profile ok: " . substr( $r['message'], 0, 60 ) . "… email now=" . ( get_userdata( $uid )->user_email === $new_email ? 'changed' : 'unchanged' ) . " name=" . get_userdata( $uid )->display_name . " mails: " . ( $m = $GLOBALS['mails'] ) [0]['subject'] . " to=" . ( $m[0]['to'] === $new_email ? 'new' : 'other' ) . "\n";
preg_match( '/mg_confirm_email=([A-Za-z0-9]+)(?:&|&amp;|&#038;)mg_u=(\d+)/', $m[0]['message'], $mm ); $GLOBALS['mails'] = array();
$_GET['mg_confirm_email'] = 'wrong'; $_GET['mg_u'] = $uid;
try { MemberGlut_Account::handle_links(); } catch ( Exception $e ) { echo "bad key → " . $GLOBALS['memberglut_flash']['text'] . "\n"; }
$_GET['mg_confirm_email'] = $mm[1] ?? '';
try { MemberGlut_Account::handle_links(); } catch ( Exception $e ) { echo "good key → " . $GLOBALS['memberglut_flash']['text'] . " email now=" . ( get_userdata( $uid )->user_email === $new_email ? 'changed' : 'unchanged' ) . "\n"; }
unset( $_GET['mg_confirm_email'], $_GET['mg_u'] );
clean_user_cache( $uid ); $u = get_userdata( $uid ); wp_set_current_user( $uid );

// Password.
$r = MemberGlut_Account::change_password( $u, array( 'current_password' => 'nope', 'mg' => array( 'password' => 'short', 'password_confirm' => 'x' ) ) );
echo "pwd invalid: " . implode( ',', array_keys( $r->get_error_data()['fields'] ) ) . "\n";
$r = MemberGlut_Account::change_password( $u, array( 'current_password' => 'Secret123!', 'mg' => array( 'password' => 'NewSecret456!', 'password_confirm' => 'NewSecret456!' ) ) );
MemberGlut_Settings::update( array() );
echo "pwd ok: " . ( is_wp_error( $r ) ? $r->get_error_message() : $r['message'] ) . " works=" . ( wp_check_password( 'NewSecret456!', get_userdata( $uid )->user_pass ) ? 'y' : 'n' ) . " mails: " . $subjects() . "\n";

// Renewal checkout (bank) — within window because 1 month < 15 days? set expiry close.
memberglut_repo( 'subscriptions' )->update( $sub['id'], array( 'expires_at' => gmdate( 'Y-m-d H:i:s', time() + 5 * DAY_IN_SECONDS ) ) ); MemberGlut_Subscription_Service::flush( $uid );
$old_exp = MemberGlut_Subscription_Service::get( $sub['id'] )['expires_at'];
echo "renewable=" . ( MemberGlut_Checkout::renewable_sub( $uid, $plan ) ? 'y' : 'n' ) . "\n";
$res = MemberGlut_Auth::register( array( 'plan' => $plan['id'], 'gateway' => 'bank', 'mg' => array( 'agree_gdpr' => 1, 'agree_privacy' => 1 ), 'mg_hp_time' => ( time() - 10 ) . '.' . substr( wp_hash( 'mg_hp_' . ( time() - 10 ) ), 0, 12 ) ) );
echo "renew register: " . ( is_wp_error( $res ) ? $res->get_error_message() . ' ' . wp_json_encode( $res->get_error_data() ) : 'ok' ) . "\n";
$pay = memberglut_repo( 'payments' )->query( array( 'where' => array( 'user_id' => $uid ), 'orderby' => 'id DESC', 'per_page' => 1 ) )[0] ?? null;
if ( $pay ) {
	echo "renew payment type={$pay['type']} sub=" . ( (int) $pay['subscription_id'] === (int) $sub['id'] ? 'same' : 'other' ) . " amount={$pay['amount']} fee={$pay['signup_fee']} subs=" . count( MemberGlut_Subscription_Service::for_user( $uid ) ) . "\n";
	MemberGlut_Payments::complete( $pay['id'] );
	$s2 = MemberGlut_Subscription_Service::get( $sub['id'] );
	echo "after paid: expires {$old_exp} → {$s2['expires_at']} status={$s2['status']}\n";
}
$GLOBALS['mails'] = array();

// Cancel / abandon gating.
MemberGlut_Settings::update( array( 'allow_cancel' => false ) );
$r = MemberGlut_Account::subscription_action( $u, array( 'op' => 'cancel', 'sub' => $sub['id'] ) );
echo "cancel when off: " . ( is_wp_error( $r ) ? $r->get_error_code() : 'ALLOWED' ) . "\n";
MemberGlut_Settings::update( array( 'allow_cancel' => true ) );
$r = MemberGlut_Account::subscription_action( $u, array( 'op' => 'cancel', 'sub' => $sub['id'] ) );
echo "cancel: " . ( is_wp_error( $r ) ? $r->get_error_message() : $r['message'] ) . " status=" . MemberGlut_Subscription_Service::get( $sub['id'] )['status'] . " mails: " . $subjects() . "\n";
$r = MemberGlut_Account::subscription_action( $u, array( 'op' => 'abandon', 'sub' => $sub['id'] ) ); echo "abandon when off: " . ( is_wp_error( $r ) ? $r->get_error_code() : 'ALLOWED' ) . "\n";
$other = wp_create_user( 'oth' . wp_rand(), 'x', 'oth' . wp_rand() . '@example.com' );
$r = MemberGlut_Account::subscription_action( get_userdata( $other ), array( 'op' => 'cancel', 'sub' => $sub['id'] ) ); echo "other user's sub: " . $r->get_error_code() . "\n";

// Shortcodes.
echo "member name=" . do_shortcode( '[memberglut_member field="display_name"]' ) . " plan=" . do_shortcode( '[memberglut_member field="plan"]' ) . " email=" . ( do_shortcode( '[memberglut_member field="email"]' ) === esc_html( $new_email ) ? 'ok' : 'bad' ) . "\n";
echo "expiry=" . do_shortcode( '[memberglut_expiry plan="' . $plan['slug'] . '"]' ) . " count=" . do_shortcode( '[memberglut_count plan="' . $plan['slug'] . '" status="active,canceled"]' ) . "\n";
$dir = do_shortcode( '[memberglut_members plan="' . $plan['slug'] . '" fields="name,plan"]' );
echo "directory has member=" . ( strpos( $dir, 'Acct Renamed' ) ? 'y' : 'n' ) . "\n";
echo "payments sc rows=" . substr_count( do_shortcode( '[memberglut_payments]' ), '<tr>' ) - 1 . "\n";

// Delete account.
clean_user_cache( $uid ); $u = get_userdata( $uid );
$r = MemberGlut_Account::delete_account( $u, array( 'password' => 'wrong' ) ); echo "delete invalid: " . implode( ',', array_keys( $r->get_error_data()['fields'] ) ) . "\n";
$r = MemberGlut_Account::delete_account( $u, array( 'password' => 'NewSecret456!', 'confirm' => 1 ) );
echo "delete: redirect=" . ( $r['redirect'] ?? '' ) . " user exists=" . ( get_userdata( $uid ) ? 'y' : 'n' ) . " subs=" . memberglut_repo( 'subscriptions' )->count( array( 'where' => array( 'user_id' => $uid ) ) ) . " payments w/ user=" . memberglut_repo( 'payments' )->count( array( 'where' => array( 'user_id' => $uid ) ) ) . " mails: " . $subjects() . "\n";
$adm = get_userdata( 1 ); echo "admin delete tab: " . ( isset( MemberGlut_Account::tabs( 1 )['delete'] ) ? 'SHOWN' : 'hidden' ) . "\n";

// Cleanup.
wp_set_current_user( 1 );
require_once ABSPATH . 'wp-admin/includes/user.php'; wp_delete_user( $other );
memberglut_repo( 'payments' )->delete_where( array( 'plan_id' => $plan['id'] ) );
memberglut_repo( 'subscriptions' )->delete_where( array( 'plan_id' => $plan['id'] ) );
MemberGlut_Plans::delete( $plan['id'] );
MemberGlut_Settings::update( array( 'bank_enabled' => false, 'tab_delete' => false ) );
echo "done\n";
