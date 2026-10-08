<?php
/**
 * Smoke test (development only — not shipped, see .distignore). Run with tests/smoke/run.sh.
 *
 * @package MemberGlut
 */

// phpcs:ignoreFile -- CLI test script that prints plain-text results.

defined( 'ABSPATH' ) || exit;

add_filter( 'pre_wp_mail', '__return_true' );
list( $s, $st ) = memberglut_smoke_rest( 'GET', '/dashboard/stats', null, array( 'fresh' => 1 ) );
echo "stats $s " . wp_json_encode( array_diff_key( $st, array( 'chart' => 1 ) ) ) . "\n";
echo "chart months=" . count( $st['chart'] ) . " last=" . wp_json_encode( end( $st['chart'] ) ) . "\n";
// Compare with Members screen count.
list( $s, $m ) = memberglut_smoke_rest( 'GET', '/members', null, array( 'status' => 'active', 'per_page' => 1 ) );
echo "members screen counts=" . wp_json_encode( $m['counts'] ?? null ) . "\n";
// Add a payment this month and a member; cache invalidation.
$silver = MemberGlut_Plans::get( 'silver' );
$u = wp_create_user( 'dash' . wp_rand(), 'x', 'dash' . wp_rand() . '@example.com' );
$sub = MemberGlut_Subscription_Service::create( $u, $silver['id'], array( 'status' => 'active' ) );
$p = MemberGlut_Payments::add_manual( array( 'member' => $u, 'plan' => $silver['id'], 'amount' => 12.5, 'status' => 'completed' ) );
list( $s, $st2 ) = memberglut_smoke_rest( 'GET', '/dashboard/stats' );
echo "after: active {$st['active_members']}→{$st2['active_members']} revenue {$st['revenue_month']}→{$st2['revenue_month']} new30 {$st['new_members_30d']}→{$st2['new_members_30d']} mrr {$st['mrr']}→{$st2['mrr']}\n";
MemberGlut_Dashboard::snapshot();
echo "snapshot today=" . MemberGlut_Stats::sum( 'active_members', wp_date( 'Y-m-d' ), wp_date( 'Y-m-d' ), 0 ) . "\n";
list( $s, $c ) = memberglut_smoke_rest( 'GET', '/dashboard/checklist' );
echo "checklist $s " . implode( ' ', array_map( fn( $i ) => $i['key'] . '=' . ( $i['done'] ? 'y' : 'n' ) . '>' . $i['target'], $c ) ) . "\n";
list( $s, $ev ) = memberglut_smoke_rest( 'GET', '/events', null, array( 'type' => 'grant,payment_completed', 'per_page' => 5 ) );
echo "events filtered $s n=" . count( $ev['items'] ) . " types=" . implode( ',', array_unique( array_column( $ev['items'], 'type' ) ) ) . "\n";
require_once ABSPATH . 'wp-admin/includes/user.php'; wp_delete_user( $u ); memberglut_repo( 'payments' )->delete( $p['id'] );
global $wpdb; $wpdb->query( "DELETE FROM " . MemberGlut_Install::table( 'stats_daily' ) . " WHERE metric = 'active_members'" );
MemberGlut_Dashboard::flush();
