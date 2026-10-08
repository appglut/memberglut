<?php
/**
 * Plugin Name: MemberGlut - Role & User Management
 * Plugin URI: https://wordpress.org/plugins/memberglut/
 * Description: A powerful membership plugin with custom roles, capabilities, and access control. Create unlimited member roles and manage site access with ease.
 * Version: 1.1.5
 * Author: AppGlut
 * Author URI: https://appglut.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: memberglut
 * Requires at least: 5.0
 * Tested up to: 7.0
 * Requires PHP: 7.4
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('MEMBERGLUT_VERSION', '1.1.5');
define('MEMBERGLUT_PLUGIN_URL', plugin_dir_url(__FILE__));
define('MEMBERGLUT_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('MEMBERGLUT_PLUGIN_FILE', __FILE__);
define('MEMBERGLUT_PLUGIN_BASENAME', plugin_basename(__FILE__));

// Include required files
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/class-memberglut.php';
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/class-memberglut-db.php';
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/class-memberglut-roles.php';
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/class-memberglut-capabilities.php';
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/class-memberglut-access-control.php';
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/class-memberglut-forms.php';
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/class-memberglut-extensions.php';
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/class-memberglut-admin.php';
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/class-memberglut-app.php';
require_once MEMBERGLUT_PLUGIN_PATH . 'includes/functions.php';

/**
 * Main plugin class
 */
class MemberGlut_Main {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        // Load translations on init hook (WordPress 6.7.0+ requirement)
        add_action('init', array($this, 'load_translations'), 0);
        // Initialize plugin components after translations are loaded
        add_action('init', array($this, 'init_components'), 1);
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
        register_uninstall_hook(__FILE__, array('MemberGlut_Main', 'uninstall'));
    }

    /**
     * Load plugin translations (must run on init hook for WordPress 6.7.0+)
     */
    public function load_translations() {
        // phpcs:ignore PluginCheck.CodeAnalysis.DiscouragedFunctions.load_plugin_textdomainFound -- Load is needed for custom translation files outside WP.org.
        load_plugin_textdomain('memberglut', false, dirname(MEMBERGLUT_PLUGIN_BASENAME) . '/languages');
    }

    /**
     * Initialize plugin components (runs after translations are loaded)
     */
    public function init_components() {
        // Initialize plugin components
        MemberGlut::get_instance();
        MemberGlut_DB::get_instance();
        MemberGlut_Roles::get_instance();
        MemberGlut_Capabilities::get_instance();
        MemberGlut_Access_Control::get_instance();
        MemberGlut_Forms::get_instance();
        MemberGlut_Extensions::get_instance();

        // Initialize admin if in admin area
        if (is_admin()) {
            MemberGlut_Admin::get_instance();
            MemberGlut_App::get_instance();
        }

        // Hook for pro version features
        do_action('memberglut_init');
    }
    
    public function activate() {
        // Create default roles and capabilities
        $this->create_default_roles();
        
        // Create database tables
        $this->create_tables();
        
        // Set default options
        $this->set_default_options();
        
        // Flush rewrite rules
        flush_rewrite_rules();
        
        // Hook for pro version activation
        do_action('memberglut_activate');
    }
    
    public function deactivate() {
        flush_rewrite_rules();
        do_action('memberglut_deactivate');
    }
    
    public static function uninstall() {
        // Remove plugin data if user chooses to
        if (get_option('memberglut_remove_data_on_uninstall', false)) {
            self::remove_plugin_data();
        }
        do_action('memberglut_uninstall');
    }
    
    private function create_default_roles() {
        // Basic Member Role (Free)
        add_role('memberglut_basic', esc_html__('Basic Member', 'memberglut'), array(
            'read' => true,
            'memberglut_basic_access' => true,
        ));

        // Premium Member Role (Free)
        add_role('memberglut_premium', esc_html__('Premium Member', 'memberglut'), array(
            'read' => true,
            'memberglut_basic_access' => true,
            'memberglut_premium_access' => true,
        ));

        // VIP Member Role (Free)
        add_role('memberglut_vip', esc_html__('VIP Member', 'memberglut'), array(
            'read' => true,
            'memberglut_basic_access' => true,
            'memberglut_premium_access' => true,
            'memberglut_vip_access' => true,
        ));
    }
    
    private function create_tables() {
        global $wpdb;
        
        $charset_collate = $wpdb->get_charset_collate();
        
        // User memberships table
        $table_name = $wpdb->prefix . 'memberglut_user_memberships';
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            role_slug varchar(50) NOT NULL,
            start_date datetime DEFAULT CURRENT_TIMESTAMP,
            end_date datetime NULL,
            status varchar(20) DEFAULT 'active',
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY role_slug (role_slug),
            KEY status (status)
        ) $charset_collate;";
        
        // Custom roles table
        $table_name2 = $wpdb->prefix . 'memberglut_custom_roles';
        $sql2 = "CREATE TABLE $table_name2 (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            role_slug varchar(50) NOT NULL,
            role_name varchar(100) NOT NULL,
            role_description text,
            capabilities longtext,
            is_default tinyint(1) DEFAULT 0,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY role_slug (role_slug)
        ) $charset_collate;";
        
        // Access restrictions table (Pro feature)
        $table_name3 = $wpdb->prefix . 'memberglut_access_restrictions';
        $sql3 = "CREATE TABLE $table_name3 (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            content_id bigint(20) NOT NULL,
            content_type varchar(50) NOT NULL,
            required_roles longtext,
            restriction_type varchar(50) DEFAULT 'hide',
            custom_message text,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY content_id (content_id),
            KEY content_type (content_type)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
        dbDelta($sql2);
        dbDelta($sql3);
    }
    
    private function set_default_options() {
        // Default settings
        $default_options = array(
            'memberglut_version' => MEMBERGLUT_VERSION,
            'memberglut_default_role' => 'memberglut_basic',
            'memberglut_registration_enabled' => true,
            'memberglut_login_redirect' => '',
            'memberglut_logout_redirect_url' => '',
            'memberglut_remove_data_on_uninstall' => false,
            'memberglut_enable_content_restriction' => true,
            'memberglut_restriction_message' => esc_html__('This content is restricted to members only.', 'memberglut'),
            // Custom login system settings
            'memberglut_override_wp_login' => false,
            'memberglut_custom_login_url' => '',
            'memberglut_custom_register_url' => '',
            'memberglut_custom_lostpassword_url' => '',
            'memberglut_hide_admin_bar' => false,
            'memberglut_auto_login_after_register' => true,
            'memberglut_whole_site_login_control' => false,
            'memberglut_whole_site_allowed_pages' => "/login\n/register\n/privacy-policy",
        );
        
        foreach ($default_options as $option_name => $option_value) {
            if (get_option($option_name) === false) {
                add_option($option_name, $option_value);
            }
        }
    }
    
    private static function remove_plugin_data() {
        global $wpdb;

        // Remove custom roles
        $custom_roles = array('memberglut_basic', 'memberglut_premium', 'memberglut_vip');
        foreach ($custom_roles as $role) {
            remove_role($role);
        }

        // Remove database tables
        $tables = array(
            $wpdb->prefix . 'memberglut_user_memberships',
            $wpdb->prefix . 'memberglut_custom_roles',
            $wpdb->prefix . 'memberglut_access_restrictions'
        );

        foreach ($tables as $table) {
            // phpcs:ignore WordPress.DB.DirectDatabaseQuery.SchemaChange,WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.NotPrepared,WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- This is an uninstall routine dropping custom tables, table name is from trusted prefix.
            $wpdb->query("DROP TABLE IF EXISTS `{$table}`");
        }

        // Remove options
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- This is an uninstall routine removing plugin options.
        $wpdb->query($wpdb->prepare("DELETE FROM {$wpdb->options} WHERE option_name LIKE %s", 'memberglut_%'));

        // Clear any cached data
        wp_cache_flush();
    }
}

// Initialize the plugin
function memberglut_init() {
    return MemberGlut_Main::get_instance();
}

// Start the plugin
memberglut_init();

// Helper function to check if pro version is active
function memberglut_is_pro_active() {
    return apply_filters('memberglut_is_pro_active', false);
}

// Helper function to get pro features list
function memberglut_get_pro_features() {
    return apply_filters('memberglut_pro_features', array(
        esc_html__('Unlimited Custom Roles', 'memberglut'),
        esc_html__('Advanced Content Restrictions', 'memberglut'),
        esc_html__('Membership Expiration & Renewals', 'memberglut'),
        esc_html__('Email Notifications', 'memberglut'),
        esc_html__('Import/Export Members', 'memberglut'),
        esc_html__('Advanced Reports & Analytics', 'memberglut'),
        esc_html__('Payment Gateway Integration', 'memberglut'),
        esc_html__('Bulk Member Management', 'memberglut'),
        esc_html__('Custom Registration Forms', 'memberglut'),
        esc_html__('Member Dashboard', 'memberglut'),
        esc_html__('Priority Support', 'memberglut'),
    ));
}