<?php
/**
 * Plugin Name: MemberGlut - Membership, Roles & Content Restriction
 * Plugin URI: https://wordpress.org/plugins/memberglut/
 * Description: Membership plans, subscriptions, payments, content restriction, member accounts and a full role & capability editor.
 * Version: 2.0.0
 * Author: AppGlut
 * Author URI: https://appglut.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: memberglut
 * Domain Path: /languages
 * Requires at least: 6.2
 * Tested up to: 7.1
 * Requires PHP: 7.4
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

define( 'MEMBERGLUT_VERSION', '2.0.0' );
define( 'MEMBERGLUT_PLUGIN_FILE', __FILE__ );
define( 'MEMBERGLUT_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'MEMBERGLUT_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'MEMBERGLUT_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

// Action Scheduler (bundled; it negotiates versions with other copies, e.g. WooCommerce's).
if ( is_readable( MEMBERGLUT_PLUGIN_PATH . 'vendor/woocommerce/action-scheduler/action-scheduler.php' ) ) {
	require_once MEMBERGLUT_PLUGIN_PATH . 'vendor/woocommerce/action-scheduler/action-scheduler.php';
}

require_once MEMBERGLUT_PLUGIN_PATH . 'includes/core/class-memberglut-autoloader.php';
MemberGlut_Autoloader::register();
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/core/functions-core.php';
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/core/functions-api.php';

register_activation_hook( __FILE__, array( 'MemberGlut_Install', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'MemberGlut_Plugin', 'deactivate' ) );

MemberGlut_Plugin::instance();
