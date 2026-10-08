<?php
/**
 * Smoke test (development only — not shipped, see .distignore). Run with tests/smoke/run.sh.
 *
 * @package MemberGlut
 */

// phpcs:ignoreFile -- CLI test script that prints plain-text results.

defined( 'ABSPATH' ) || exit;

add_filter( 'pre_wp_mail', '__return_true' );
$silver = MemberGlut_Plans::get( 'silver' );
MemberGlut_Plans::set_gateway_ids( $silver['id'], array() );
$secret = 'whsec_test';
MemberGlut_Settings::update( array( 'stripe_enabled' => true, 'stripe_test_publishable' => 'pk_test_x', 'stripe_test_secret' => 'sk_test_x', 'stripe_webhook_secret' => $secret ) );
$u = wp_create_user( 'whk' . wp_rand(), 'Secret123!', 'whk' . wp_rand() . '@example.com' );
$sub = MemberGlut_Subscription_Service::create( $u, $silver['id'], array( 'status' => 'pending', 'gateway' => 'stripe', 'meta' => array( 'awaiting_payment' => true ) ) );
memberglut_repo( 'subscriptions' )->update( $sub['id'], array( 'gateway_subscription_id' => 'sub_whk' ) );
$p = MemberGlut_Payments::create( array( 'user_id' => $u, 'subscription_id' => $sub['id'], 'plan_id' => $silver['id'], 'type' => 'new', 'gateway' => 'stripe', 'summary' => MemberGlut_Pricing::summary( $silver ) ) );
$send = function ( $event ) use ( $secret ) {
	$payload = wp_json_encode( $event ); $t = time();
	$req = new WP_REST_Request( 'POST', '/memberglut/v1/webhook/stripe' ); $req->set_body( $payload );
	$req->set_header( 'stripe-signature', 't=' . $t . ',v1=' . hash_hmac( 'sha256', $t . '.' . $payload, $secret ) );
	return rest_do_request( $req )->get_status();
};
$end = time() + 30 * DAY_IN_SECONDS;
$inv = array( 'id' => 'in_1', 'subscription' => 'sub_whk', 'amount_paid' => 900, 'currency' => 'usd', 'payment_intent' => 'pi_whk', 'billing_reason' => 'subscription_create', 'lines' => array( 'data' => array( array( 'period' => array( 'end' => $end ) ) ) ) );
echo "create invoice " . $send( array( 'id' => 'evt_a', 'type' => 'invoice.paid', 'data' => array( 'object' => $inv ) ) );
$s = MemberGlut_Subscription_Service::get( $sub['id'] ); $pp = MemberGlut_Payments::get( $p['id'] );
echo " sub={$s['status']} expires={$s['expires_at']} pay={$pp['status']} txn={$pp['transaction_id']}\n";
echo "replay " . $send( array( 'id' => 'evt_a', 'type' => 'invoice.paid', 'data' => array( 'object' => $inv ) ) ) . " payments=" . memberglut_repo( 'payments' )->count( array( 'where' => array( 'user_id' => $u ) ) ) . "\n";
$inv2 = array_merge( $inv, array( 'id' => 'in_2', 'payment_intent' => 'pi_whk2', 'billing_reason' => 'subscription_cycle', 'lines' => array( 'data' => array( array( 'period' => array( 'end' => $end + 30 * DAY_IN_SECONDS ) ) ) ) ) );
echo "renewal " . $send( array( 'id' => 'evt_b', 'type' => 'invoice.paid', 'data' => array( 'object' => $inv2 ) ) );
$s = MemberGlut_Subscription_Service::get( $sub['id'] );
echo " expires={$s['expires_at']} payments=" . memberglut_repo( 'payments' )->count( array( 'where' => array( 'user_id' => $u ) ) ) . "\n";
echo "deleted " . $send( array( 'id' => 'evt_c', 'type' => 'customer.subscription.deleted', 'data' => array( 'object' => array( 'id' => 'sub_whk', 'status' => 'canceled' ) ) ) );
echo " sub=" . MemberGlut_Subscription_Service::get( $sub['id'] )['status'] . "\n";
require_once ABSPATH . 'wp-admin/includes/user.php'; wp_delete_user( $u );
memberglut_repo( 'payments' )->delete_where( array( 'id >' => 0 ) );
MemberGlut_Settings::update( array( 'stripe_enabled' => false, 'stripe_test_publishable' => '', 'stripe_test_secret' => '', 'stripe_webhook_secret' => '' ) );
echo "silver gateway ids: " . wp_json_encode( MemberGlut_Plans::gateway_ids( $silver['id'] ) ) . "\n";
