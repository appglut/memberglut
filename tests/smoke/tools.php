<?php
add_filter( 'pre_wp_mail', '__return_true' );
list( $s, $st ) = rest( 'GET', '/tools/status' );
echo "status $s counts=" . wp_json_encode( $st['counts'] ) . "\n";
foreach ( $st['checks'] as $c ) echo "  " . ( $c['ok'] ? 'OK  ' : 'WARN' ) . " {$c['label']}" . ( $c['note'] ? " — {$c['note']}" : '' ) . "\n";
echo "env: " . implode( ', ', array_map( fn( $k, $v ) => "$k=$v", array_keys( $st['environment'] ), $st['environment'] ) ) . "\n";
MemberGlut_Settings::update( array( 'debug_log' => true ) );
memberglut_log( 'info', 'tools', 'P13 log line' ); memberglut_log( 'error', 'payment', 'P13 error line' );
list( $s, $l ) = rest( 'GET', '/logs', null, array( 'level' => 'error', 'search' => 'P13' ) );
echo "logs $s total={$l['total']} sources=" . implode( ',', $l['sources'] ) . " settings=" . wp_json_encode( $l['settings'] ) . "\n";

// Setup export.
$silver = MemberGlut_Plans::get( 'silver' );
MemberGlut_Coupons::save( array( 'code' => 'P13SILVER', 'type' => 'percent', 'amount' => 10, 'plans' => array( $silver['id'] ) ) );
$file = MemberGlut_Tools::export_setup();
echo "export sections=" . implode( ',', array_keys( $file['sections'] ) ) . " plans=" . count( $file['sections']['plans'] ) . " rules=" . count( $file['sections']['rules'] ) . " coupons=" . count( $file['sections']['coupons'] ) . "\n";
echo "secrets leaked=" . ( array_key_exists( 'stripe_test_secret', $file['sections']['settings'] ) ? 'YES' : 'no' ) . " page ids=" . ( array_key_exists( 'page_account', $file['sections']['forms'] ) ? 'YES' : 'no' ) . "\n";
$coupon_in_file = current( array_filter( $file['sections']['coupons'], fn( $c ) => 'P13SILVER' === $c['code'] ) );
echo "coupon plans in file=" . wp_json_encode( $coupon_in_file['plans'] ) . "\n";
// Simulate another site: a new plan + coupon pointing at it; drop local coupon so it is recreated.
$new_plan = $file['sections']['plans'][0]; $new_plan['slug'] = 'p13-imported'; $new_plan['name'] = 'P13 Imported'; $new_plan['id'] = 999;
$file['sections']['plans'][] = $new_plan;
$file['sections']['coupons'][] = array( 'code' => 'P13NEW', 'type' => 'fixed', 'amount' => 3, 'plans' => array( 'p13-imported', 'silver' ), 'recurring' => false, 'starts' => '', 'expires' => '', 'max_uses' => 0, 'per_user' => 1, 'new_users_only' => false, 'enabled' => true );
MemberGlut_Coupons::delete( MemberGlut_Coupons::find_by_code( 'P13SILVER' )['id'] );
$json = json_decode( wp_json_encode( $file ), true );
list( $s, $pv ) = rest( 'POST', '/tools/import/preview', array( 'data' => $json ) );
echo "preview $s " . implode( ' ', array_map( fn( $k, $b ) => "$k:" . count( $b['new'] ) . '/' . count( $b['changed'] ) . '/' . count( $b['unchanged'] ), array_keys( $pv ), $pv ) ) . "\n";
list( $s, $im ) = rest( 'POST', '/tools/import', array( 'data' => $json ) );
echo "import $s " . implode( ' ', array_map( fn( $k, $b ) => "$k:+{$b['created']}~{$b['updated']}" . ( $b['errors'] ? '!' . implode( '|', $b['errors'] ) : '' ), array_keys( $im ), $im ) ) . "\n";
$imp = MemberGlut_Plans::get( 'p13-imported' );
$c = MemberGlut_Coupons::to_client( MemberGlut_Coupons::find_by_code( 'P13NEW' ) );
echo "remap: new plan id=" . ( $imp ? $imp['id'] : 'none' ) . " coupon plans=" . wp_json_encode( $c['plans'] ) . " (silver={$silver['id']})\n";
$c2 = MemberGlut_Coupons::find_by_code( 'P13SILVER' ); echo "recreated P13SILVER plans=" . wp_json_encode( $c2 ? $c2['plans'] : null ) . "\n";
list( $s, $bad ) = rest( 'POST', '/tools/import/preview', array( 'data' => array( 'foo' => 1 ) ) ); echo "bad file $s\n";

// Convert users.
$r1 = wp_create_user( 'conv1' . wp_rand(), 'x', 'c1' . wp_rand() . '@example.com' ); $r2 = wp_create_user( 'conv2' . wp_rand(), 'x', 'c2' . wp_rand() . '@example.com' );
( new WP_User( $r1 ) )->set_role( 'contributor' ); ( new WP_User( $r2 ) )->set_role( 'contributor' );
$free = MemberGlut_Plans::get( 'free' );
list( $s, $cv ) = rest( 'POST', '/tools/convert', array( 'role' => 'contributor', 'plan_id' => $free['id'] ) );
list( $s2, $cv2 ) = rest( 'POST', '/tools/convert', array( 'role' => 'contributor', 'plan_id' => $free['id'] ) );
echo "convert $s total={$cv['total']} converted={$cv['converted']} second run converted={$cv2['converted']}\n";

// Maintenance.
foreach ( array( 'expirations', 'recount', 'clear-cache', 'sync-roles' ) as $t ) { list( $s, $m ) = rest( 'POST', "/tools/maintenance/$t", array() ); echo "maint $t $s {$m['message']}\n"; }
list( $s, $m ) = rest( 'POST', '/tools/maintenance/delete-all', array( 'confirm' => 'nope' ) ); echo "delete-all unconfirmed $s {$m['message']}\n";
list( $s, $m ) = rest( 'POST', '/tools/maintenance/reset-settings', array() ); echo "reset unconfirmed $s\n";
wp_set_current_user( $r1 ); list( $s ) = rest( 'GET', '/tools/status' ); echo "contributor status=$s\n"; wp_set_current_user( 1 );
// Site health.
$info = apply_filters( 'debug_information', array() ); echo "site health info fields=" . count( $info['memberglut']['fields'] ) . "\n";
echo "site health test: " . MemberGlut_Site_Health::result( 'pages' )['status'] . "\n";

// Cleanup.
require_once ABSPATH . 'wp-admin/includes/user.php'; wp_delete_user( $r1 ); wp_delete_user( $r2 );
foreach ( array( 'P13NEW', 'P13SILVER' ) as $code ) { $x = MemberGlut_Coupons::find_by_code( $code ); if ( $x ) MemberGlut_Coupons::delete( $x['id'] ); }
if ( $imp ) MemberGlut_Plans::delete( $imp['id'] );
memberglut_repo( 'logs' )->delete_where( array( 'message LIKE' => '%P13%' ) );
MemberGlut_Settings::update( array( 'debug_log' => false ) );
echo "done\n";
