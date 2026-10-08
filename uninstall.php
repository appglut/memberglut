<?php
/**
 * Uninstall: removes all MemberGlut data only when Global Settings › Advanced › “Delete all data when the plugin is
 * deleted” is on (or the 1.x option memberglut_remove_data_on_uninstall). Same routine as Data & Logs › Delete all
 * MemberGlut data. Runs on every site of a network.
 *
 * @package MemberGlut
 */

defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

if ( ! defined( 'MEMBERGLUT_PLUGIN_PATH' ) ) {
	define( 'MEMBERGLUT_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
}
if ( ! defined( 'MEMBERGLUT_VERSION' ) ) {
	define( 'MEMBERGLUT_VERSION', '2.0.0' );
}
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/core/class-memberglut-autoloader.php';
MemberGlut_Autoloader::register();
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/core/functions-core.php';

/**
 * Remove the data of the current site when asked to.
 *
 * @return void
 */
function memberglut_uninstall_site() {
	global $wpdb;
	$settings = get_option( 'memberglut_settings', array() );
	$wanted   = ( is_array( $settings ) && ! empty( $settings['delete_on_uninstall'] ) ) || get_option( 'memberglut_remove_data_on_uninstall' );
	// Schedules are removed in any case: their callbacks are gone.
	wp_clear_scheduled_hook( 'memberglut_hourly' );
	wp_clear_scheduled_hook( 'memberglut_daily' );
	$as = $wpdb->prefix . 'actionscheduler_actions';
	if ( $wpdb->get_var( $wpdb->prepare( 'SHOW TABLES LIKE %s', $as ) ) === $as ) { // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Uninstall.
		$wpdb->query( $wpdb->prepare( "DELETE FROM `{$as}` WHERE hook LIKE %s AND status = 'pending'", $wpdb->esc_like( 'memberglut_' ) . '%' ) ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Uninstall.
	}
	if ( $wanted ) {
		MemberGlut_Tools::delete_all_data();
	}
}

if ( is_multisite() ) {
	foreach ( get_sites( array( 'fields' => 'ids', 'number' => 0 ) ) as $memberglut_site ) {
		switch_to_blog( $memberglut_site );
		memberglut_uninstall_site();
		restore_current_blog();
	}
} else {
	memberglut_uninstall_site();
}
