<?php
$GLOBALS['mails'] = array();
add_filter( 'pre_wp_mail', function ( $r, $a ) { $GLOBALS['mails'][] = $a; return true; }, 10, 2 );
$subjects = function () { $s = array_map( fn( $m ) => $m['subject'], $GLOBALS['mails'] ); $GLOBALS['mails'] = array(); return implode( ' | ', $s ); };
foreach ( MemberGlut_Coupons::all() as $c ) MemberGlut_Coupons::delete( $c['id'] );
MemberGlut_Settings::update( array( 'honeypot' => false, 'bank_enabled' => true, 'refund_revokes' => true ) );
$silver = MemberGlut_Plans::get( 'silver' );
$was_status = $silver['status'];
memberglut_repo( 'plans' )->update( $silver['id'], array( 'plan_status' => 'active' ) ); MemberGlut_Plans::flush();
$silver = MemberGlut_Plans::get( 'silver' );
echo "silver gateways for checkout: " . implode( ',', array_keys( MemberGlut_Checkout::gateways_for( $silver ) ) ) . "\n";

// Coupons via REST.
list( $s, $c ) = rest( 'POST', '/coupons', array( 'code' => 'bad code!', 'type' => 'percent', 'amount' => 150 ) );
echo "coupon invalid $s " . wp_json_encode( $c['data']['fields'] ?? $c ) . "\n";
list( $s, $c50 ) = rest( 'POST', '/coupons', array( 'code' => 'half50', 'type' => 'percent', 'amount' => 50, 'plans' => array( $silver['id'] ) ) );
echo "coupon half $s code={$c50['code']} status={$c50['status']}\n";
list( $s, $c100 ) = rest( 'POST', '/coupons', array( 'code' => 'FREEALL', 'type' => 'percent', 'amount' => 100, 'recurring' => true ) );
list( $s, $dup ) = rest( 'POST', '/coupons', array( 'code' => 'HALF50', 'type' => 'fixed', 'amount' => 1 ) ); echo "dup $s {$dup['message']}\n";
list( $s, $imp ) = rest( 'POST', '/coupons/import', array( 'csv' => "code,type,amount\nIMPA,percent,10\nIMPB,fixed,5\n,percent,1\n" ) );
echo "import $s created={$imp['created']} updated={$imp['updated']} errors=" . count( $imp['errors'] ) . " total=" . count( $imp['coupons'] ) . "\n";
echo "summary 50%: " . MemberGlut_Pricing::summary( $silver, MemberGlut_Coupons::find_by_code( 'HALF50' ) )['text'] . "\n";

wp_set_current_user( 0 );
$pub = function ( $route, $data ) { $data['_mgnonce'] = wp_create_nonce( 'memberglut_' . str_replace( '-', '_', $route ) ); return rest( 'POST', '/public/' . $route, $data ); };
$base = array( 'password' => 'Secret123!', 'password_confirm' => 'Secret123!', 'agree_privacy' => 1, 'agree_gdpr' => 1 );

// Bank checkout.
$e1 = 'bank' . wp_rand() . '@example.com';
list( $s, $r ) = $pub( 'register', array( 'plan' => $silver['id'], 'mg' => $base + array( 'email' => $e1 ) ) );
echo "no gateway $s " . wp_json_encode( $r['data']['fields'] ?? $r ) . "\n";
list( $s, $r ) = $pub( 'register', array( 'plan' => $silver['id'], 'gateway' => 'bank', 'coupon' => 'NOPE', 'mg' => $base + array( 'email' => $e1 ) ) );
echo "bad coupon $s " . wp_json_encode( $r['data']['fields'] ?? $r ) . "\n";
list( $s, $r ) = $pub( 'register', array( 'plan' => $silver['id'], 'gateway' => 'bank', 'coupon' => 'half50', 'mg' => $base + array( 'email' => $e1 ) ) );
echo "bank register $s redirect=" . ( $r['redirect'] ?? '' ) . " msg=" . ( $r['message'] ?? '' ) . "\n";
$u1 = get_user_by( 'email', $e1 );
$sub = MemberGlut_Subscription_Service::for_user( $u1->ID )[0];
$pay = memberglut_repo( 'payments' )->query( array( 'where' => array( 'user_id' => $u1->ID ) ) )[0];
echo "sub={$sub['status']} pay={$pay['status']} amount={$pay['amount']} discount={$pay['discount']} coupon={$pay['coupon_code']} mails: " . $subjects() . "\n";
wp_set_current_user( 1 );
list( $s, $list ) = rest( 'GET', '/payments', null, array( 'status' => 'pending' ) );
echo "list pending $s total={$list['total']} summary.pending=" . wp_json_encode( $list['summary']['pending'] ) . "\n";
list( $s, $d ) = rest( 'POST', "/payments/{$pay['id']}/mark-paid", array() );
echo "mark-paid $s status={$d['status']} log=" . implode( ' / ', array_column( $d['log'], 'text' ) ) . "\n";
$sub = MemberGlut_Subscription_Service::get( $sub['id'] );
echo "sub now {$sub['status']} expires={$sub['expires_at']} has_plan=" . ( memberglut_user_has_plan( $silver["id"], $u1->ID ) ? 'y' : 'n' ) . " coupon uses=" . MemberGlut_Coupons::find_by_code( 'HALF50' )['uses'] . " mails: " . $subjects() . "\n";
list( $s, $d ) = rest( 'POST', "/payments/{$pay['id']}/mark-paid", array() ); echo "mark-paid again $s\n";
list( $s, $d ) = rest( 'POST', "/payments/{$pay['id']}/resend-receipt", array() ); echo "resend $s mails: " . $subjects() . "\n";
list( $s, $d ) = rest( 'POST', "/payments/{$pay['id']}/refund", array() );
echo "refund $s status={$d['status']} refunded={$d['refunded']}\n";
echo "after refund sub=" . MemberGlut_Subscription_Service::get( $sub['id'] )['status'] . " has_plan=" . ( memberglut_user_has_plan( $silver["id"], $u1->ID ) ? 'y' : 'n' ) . " mails: " . $subjects() . "\n";

// Free 100% coupon checkout (recurring, every payment).
wp_set_current_user( 0 );
$e2 = 'free' . wp_rand() . '@example.com';
list( $s, $r ) = $pub( 'register', array( 'plan' => $silver['id'], 'coupon' => 'FREEALL', 'mg' => $base + array( 'email' => $e2 ) ) );
$u2 = get_user_by( 'email', $e2 );
$sub2 = MemberGlut_Subscription_Service::for_user( $u2->ID )[0];
echo "100% coupon $s sub={$sub2['status']} gateway={$sub2['gateway']} next=" . var_export( $sub2["next_payment_at"], true ) . " expires=" . var_export( $sub2["expires_at"], true ) . " redirect=" . ( $r['redirect'] ?? '' ) . "\n";

// Manual payment.
wp_set_current_user( 1 );
$u3 = wp_create_user( 'manual' . wp_rand(), 'Secret123!', 'man' . wp_rand() . '@example.com' );
list( $s, $m ) = rest( 'POST', '/payments', array( 'member' => 0, 'plan' => 0 ) ); echo "manual invalid $s " . wp_json_encode( array_keys( $m['data']['fields'] ?? array() ) ) . "\n";
list( $s, $m ) = rest( 'POST', '/payments', array( 'member' => $u3, 'plan' => $silver['id'], 'amount' => 9, 'status' => 'completed', 'activate' => true, 'note' => 'cash' ) );
echo "manual $s status={$m['status']} type={$m['type']} plan=" . ( memberglut_user_has_plan( $silver["id"], $u3 ) ? 'y' : 'n' ) . "\n";
list( $s, $sum ) = rest( 'GET', '/payments/summary' ); echo "summary " . wp_json_encode( $sum ) . "\n";
list( $s, $one ) = rest( 'GET', '/payments/' . $m['id'] ); echo "show $s log=" . count( $one['log'] ) . "\n";
list( $s, $x ) = rest( 'GET', '/payments/999999' ); echo "missing $s\n";

// Permissions.
$sub_user = wp_create_user( 'subsc' . wp_rand(), 'Secret123!', 'sub' . wp_rand() . '@example.com' );
wp_set_current_user( $sub_user ); list( $s ) = rest( 'GET', '/payments' ); list( $s2 ) = rest( 'GET', '/coupons' ); echo "subscriber payments=$s coupons=$s2\n";
wp_set_current_user( 1 );

// Stripe with mocked HTTP.
MemberGlut_Settings::update( array( 'stripe_enabled' => true, 'stripe_test_publishable' => 'pk_test_x', 'stripe_test_secret' => 'sk_test_x' ) );
$GLOBALS['stripe_calls'] = array();
add_filter( 'pre_http_request', function ( $pre, $args, $url ) {
	if ( false === strpos( $url, 'api.stripe.com' ) ) return $pre;
	$GLOBALS['stripe_calls'][] = $args['method'] . ' ' . preg_replace( '#https://api.stripe.com/v1/#', '', $url );
	$path = parse_url( $url, PHP_URL_PATH );
	$body = array( 'id' => 'obj_' . count( $GLOBALS['stripe_calls'] ), 'object' => 'x' );
	if ( strpos( $path, 'customers' ) !== false ) $body['id'] = 'cus_123';
	if ( strpos( $path, 'products' ) !== false ) $body['id'] = 'prod_123';
	if ( strpos( $path, 'prices' ) !== false ) $body['id'] = 'price_123';
	if ( strpos( $path, 'subscriptions' ) !== false ) $body = array( 'id' => 'sub_123', 'status' => 'incomplete', 'latest_invoice' => array( 'id' => 'in_1', 'payment_intent' => array( 'id' => 'pi_1', 'client_secret' => 'pi_1_secret', 'status' => 'requires_payment_method' ) ), 'pending_setup_intent' => null );
	if ( strpos( $path, 'payment_intents' ) !== false ) $body = array( 'id' => 'pi_2', 'client_secret' => 'pi_2_secret', 'status' => 'requires_payment_method' );
	return array( 'response' => array( 'code' => 200, 'message' => 'OK' ), 'body' => wp_json_encode( $body ), 'headers' => array(), 'cookies' => array() );
}, 10, 3 );
echo "silver gateways now: " . implode( ',', array_keys( MemberGlut_Checkout::gateways_for( $silver ) ) ) . "\n";
wp_set_current_user( 0 );
$e4 = 'str' . wp_rand() . '@example.com';
list( $s, $r ) = $pub( 'register', array( 'plan' => $silver['id'], 'gateway' => 'stripe', 'mg' => $base + array( 'email' => $e4 ) ) );
echo "stripe register $s keys=" . implode( ',', array_keys( (array) $r ) ) . " checkout=" . wp_json_encode( $r["checkout"] ?? null ) . "\n";
echo "stripe calls: " . implode( ' ; ', $GLOBALS['stripe_calls'] ) . "\n";
// Webhook signature.
$secret = 'whsec_test'; MemberGlut_Settings::update( array( 'stripe_webhook_secret' => $secret ) );
$payload = wp_json_encode( array( 'id' => 'evt_1', 'type' => 'ping', 'data' => array( 'object' => array() ) ) );
$t = time(); $sig = 't=' . $t . ',v1=' . hash_hmac( 'sha256', $t . '.' . $payload, $secret );
$g = MemberGlut_Gateways::get( 'stripe' );
echo "sig ok=" . var_export( $g->verify_signature( $payload, $sig, $secret ), true ) . " bad=" . var_export( $g->verify_signature( $payload, 't=' . $t . ',v1=abc', $secret ), true ) . "\n";
$req = new WP_REST_Request( 'POST', '/memberglut/v1/webhook/stripe' ); $req->set_body( $payload ); $req->set_header( 'stripe-signature', 'bad' );
echo "webhook bad sig status=" . rest_do_request( $req )->get_status() . "\n";
$req->set_header( 'stripe-signature', $sig ); echo "webhook good sig status=" . rest_do_request( $req )->get_status() . "\n";

// Cleanup.
wp_set_current_user( 1 );
require_once ABSPATH . 'wp-admin/includes/user.php';
foreach ( array( $u1->ID, $u2->ID, $u3, $sub_user, get_user_by( 'email', $e4 ) ? get_user_by( 'email', $e4 )->ID : 0 ) as $id ) if ( $id ) wp_delete_user( $id );
foreach ( MemberGlut_Coupons::all() as $c ) MemberGlut_Coupons::delete( $c['id'] );
memberglut_repo( 'payments' )->delete_where( array( 'id >' => 0 ) );
memberglut_repo( 'plans' )->update( $silver['id'], array( 'plan_status' => $was_status ) ); MemberGlut_Plans::flush();
MemberGlut_Settings::update( array( 'honeypot' => true, 'bank_enabled' => false, 'stripe_enabled' => false, 'stripe_test_publishable' => '', 'stripe_test_secret' => '', 'stripe_webhook_secret' => '' ) );
echo "done\n";
