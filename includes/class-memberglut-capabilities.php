<?php
/**
 * MemberGlut Capabilities Management Class
 *
 * @package MemberGlut
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class MemberGlut_Capabilities {
    
    private static $instance = null;
    
    /**
     * Get singleton instance
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        $this->init_hooks();
    }
    
    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Setup capabilities on init
        add_action('init', array($this, 'setup_capabilities'));
        
        // Add custom capabilities to administrator role
        add_action('wp_loaded', array($this, 'add_admin_capabilities'));
        
        // AJAX hooks for capability management
        add_action('wp_ajax_memberglut_add_capability', array($this, 'ajax_add_capability'));
        add_action('wp_ajax_memberglut_remove_capability', array($this, 'ajax_remove_capability'));
        add_action('wp_ajax_memberglut_get_role_capabilities', array($this, 'ajax_get_role_capabilities'));
        
        // Filter to modify capabilities dynamically
        add_filter('user_has_cap', array($this, 'filter_user_capabilities'), 10, 4);
    }
    
    /**
     * Setup default capabilities
     */
    public function setup_capabilities() {
        // Register default MemberGlut capabilities
        $this->register_default_capabilities();
        
        // Allow plugins to register additional capabilities
        do_action('memberglut_register_capabilities');
    }
    
    /**
     * Register default MemberGlut capabilities
     */
    private function register_default_capabilities() {
        $default_capabilities = array(
            // Basic access capabilities
            'memberglut_basic_access' => __('Basic Content Access', 'memberglut'),
            'memberglut_premium_access' => __('Premium Content Access', 'memberglut'),
            'memberglut_vip_access' => __('VIP Content Access', 'memberglut'),
            
            // Content management capabilities
            'memberglut_view_restricted_posts' => __('View Restricted Posts', 'memberglut'),
            'memberglut_view_restricted_pages' => __('View Restricted Pages', 'memberglut'),
            'memberglut_download_files' => __('Download Protected Files', 'memberglut'),
            
            // Community capabilities
            'memberglut_post_comments' => __('Post Comments on Restricted Content', 'memberglut'),
            'memberglut_access_forums' => __('Access Member Forums', 'memberglut'),
            'memberglut_private_messaging' => __('Send Private Messages', 'memberglut'),
            
            // E-commerce capabilities (for pro version)
            'memberglut_view_member_prices' => __('View Member Prices', 'memberglut'),
            'memberglut_member_discounts' => __('Access Member Discounts', 'memberglut'),
            'memberglut_early_access' => __('Early Access to Products', 'memberglut'),
        );
        
        // Allow filtering of default capabilities
        $default_capabilities = apply_filters('memberglut_default_capabilities', $default_capabilities);
        
        // Store capabilities in option for reference
        update_option('memberglut_registered_capabilities', $default_capabilities);
    }
    
    /**
     * Add capabilities to administrator role
     */
    public function add_admin_capabilities() {
        $admin_role = get_role('administrator');
        
        if ($admin_role) {
            $capabilities = $this->get_registered_capabilities();
            
            foreach (array_keys($capabilities) as $capability) {
                $admin_role->add_cap($capability);
            }
        }
    }
    
    /**
     * Get all registered capabilities
     */
    public function get_registered_capabilities() {
        $capabilities = get_option('memberglut_registered_capabilities', array());
        
        // Add WordPress default capabilities that are relevant
        $wp_capabilities = array(
            'read' => __('Read', 'memberglut'),
            'edit_posts' => __('Edit Posts', 'memberglut'),
            'publish_posts' => __('Publish Posts', 'memberglut'),
            'edit_pages' => __('Edit Pages', 'memberglut'),
            'publish_pages' => __('Publish Pages', 'memberglut'),
            'upload_files' => __('Upload Files', 'memberglut'),
            'edit_comments' => __('Edit Comments', 'memberglut'),
            'moderate_comments' => __('Moderate Comments', 'memberglut'),
            'edit_others_posts' => __('Edit Others Posts', 'memberglut'),
            'edit_others_pages' => __('Edit Others Pages', 'memberglut'),
        );
        
        $all_capabilities = array_merge($wp_capabilities, $capabilities);
        
        return apply_filters('memberglut_available_capabilities', $all_capabilities);
    }
    
    /**
     * Get capabilities for a specific role
     */
    public function get_role_capabilities($role_slug) {
        $role = get_role($role_slug);
        
        if (!$role) {
            return array();
        }
        
        return $role->capabilities;
    }
    
    /**
     * Add capability to role
     */
    public function add_capability_to_role($role_slug, $capability, $grant = true) {
        $role = get_role($role_slug);
        
        if (!$role) {
            return new WP_Error('role_not_found', __('Role not found.', 'memberglut'));
        }
        
        // Validate capability
        $registered_caps = $this->get_registered_capabilities();
        if (!array_key_exists($capability, $registered_caps)) {
            return new WP_Error('invalid_capability', __('Invalid capability.', 'memberglut'));
        }
        
        if ($grant) {
            $role->add_cap($capability);
        } else {
            $role->remove_cap($capability);
        }
        
        // Log the capability change
        $this->log_capability_change($role_slug, $capability, $grant ? 'added' : 'removed');
        
        return true;
    }
    
    /**
     * Remove capability from role
     */
    public function remove_capability_from_role($role_slug, $capability) {
        return $this->add_capability_to_role($role_slug, $capability, false);
    }
    
    /**
     * Bulk update role capabilities
     */
    public function update_role_capabilities($role_slug, $capabilities) {
        $role = get_role($role_slug);
        
        if (!$role) {
            return new WP_Error('role_not_found', __('Role not found.', 'memberglut'));
        }
        
        $registered_caps = $this->get_registered_capabilities();
        
        // Remove all current capabilities
        foreach (array_keys($role->capabilities) as $cap) {
            $role->remove_cap($cap);
        }
        
        // Add new capabilities
        foreach ($capabilities as $capability => $granted) {
            if ($granted && array_key_exists($capability, $registered_caps)) {
                $role->add_cap($capability);
            }
        }
        
        // Log the bulk update
        $this->log_capability_change($role_slug, 'bulk_update', 'updated');
        
        return true;
    }
    
    /**
     * Check if user has specific capability
     */
    public function user_has_capability($user_id, $capability) {
        return user_can($user_id, $capability);
    }
    
    /**
     * Get user capabilities
     */
    public function get_user_capabilities($user_id) {
        $user = get_user_by('id', $user_id);
        
        if (!$user) {
            return array();
        }
        
        $capabilities = array();
        $registered_caps = $this->get_registered_capabilities();
        
        foreach (array_keys($registered_caps) as $capability) {
            if (user_can($user_id, $capability)) {
                $capabilities[$capability] = true;
            }
        }
        
        return $capabilities;
    }
    
    /**
     * Register new custom capability
     */
    public function register_capability($capability_key, $capability_label, $description = '') {
        // Free version limitation
        if (!memberglut_is_pro_active()) {
            $registered_caps = $this->get_registered_capabilities();
            $memberglut_caps = array_filter($registered_caps, function($key) {
                return strpos($key, 'memberglut_') === 0;
            }, ARRAY_FILTER_USE_KEY);
            
            if (count($memberglut_caps) >= 10) {
                return new WP_Error('capability_limit', __('Free version is limited to 10 custom capabilities. Upgrade to Pro for unlimited capabilities.', 'memberglut'));
            }
        }
        
        $capabilities = get_option('memberglut_registered_capabilities', array());
        
        // Validate capability key
        if (empty($capability_key) || !preg_match('/^[a-z_]+$/', $capability_key)) {
            return new WP_Error('invalid_capability_key', __('Capability key must contain only lowercase letters and underscores.', 'memberglut'));
        }
        
        // Ensure memberglut prefix for custom capabilities
        if (strpos($capability_key, 'memberglut_') !== 0) {
            $capability_key = 'memberglut_' . $capability_key;
        }
        
        // Check if capability already exists
        if (array_key_exists($capability_key, $capabilities)) {
            return new WP_Error('capability_exists', __('Capability already exists.', 'memberglut'));
        }
        
        $capabilities[$capability_key] = sanitize_text_field($capability_label);
        
        update_option('memberglut_registered_capabilities', $capabilities);
        
        // Add to administrator role
        $admin_role = get_role('administrator');
        if ($admin_role) {
            $admin_role->add_cap($capability_key);
        }
        
        return $capability_key;
    }
    
    /**
     * Unregister custom capability
     */
    public function unregister_capability($capability_key) {
        // Don't allow removing default WordPress capabilities
        $wp_default_caps = array('read', 'edit_posts', 'publish_posts', 'edit_pages', 'publish_pages', 'upload_files');
        
        if (in_array($capability_key, $wp_default_caps)) {
            return new WP_Error('protected_capability', __('Cannot remove default WordPress capabilities.', 'memberglut'));
        }
        
        $capabilities = get_option('memberglut_registered_capabilities', array());
        
        if (!array_key_exists($capability_key, $capabilities)) {
            return new WP_Error('capability_not_found', __('Capability not found.', 'memberglut'));
        }
        
        // Remove from all roles
        global $wp_roles;
        foreach ($wp_roles->roles as $role_slug => $role_data) {
            $role = get_role($role_slug);
            if ($role) {
                $role->remove_cap($capability_key);
            }
        }
        
        // Remove from registered capabilities
        unset($capabilities[$capability_key]);
        update_option('memberglut_registered_capabilities', $capabilities);
        
        return true;
    }
    
    /**
     * Get capability groups for organization
     */
    public function get_capability_groups() {
        $groups = array(
            'content' => array(
                'label' => __('Content Access', 'memberglut'),
                'capabilities' => array(
                    'memberglut_basic_access',
                    'memberglut_premium_access',
                    'memberglut_vip_access',
                    'memberglut_view_restricted_posts',
                    'memberglut_view_restricted_pages',
                    'memberglut_download_files',
                )
            ),
            'community' => array(
                'label' => __('Community Features', 'memberglut'),
                'capabilities' => array(
                    'memberglut_post_comments',
                    'memberglut_access_forums',
                    'memberglut_private_messaging',
                )
            ),
            'ecommerce' => array(
                'label' => __('E-commerce', 'memberglut'),
                'capabilities' => array(
                    'memberglut_view_member_prices',
                    'memberglut_member_discounts',
                    'memberglut_early_access',
                )
            ),
            'wordpress' => array(
                'label' => __('WordPress Default', 'memberglut'),
                'capabilities' => array(
                    'read',
                    'edit_posts',
                    'publish_posts',
                    'edit_pages',
                    'publish_pages',
                    'upload_files',
                    'edit_comments',
                    'moderate_comments',
                )
            )
        );
        
        return apply_filters('memberglut_capability_groups', $groups);
    }
    
    /**
     * Filter user capabilities dynamically
     */
    public function filter_user_capabilities($all_caps, $caps, $args, $user) {
        // Allow pro version to modify capabilities dynamically
        $all_caps = apply_filters('memberglut_filter_user_capabilities', $all_caps, $caps, $args, $user);
        
        return $all_caps;
    }
    
    /**
     * Log capability changes
     */
    private function log_capability_change($role_slug, $capability, $action) {
        $log_entry = array(
            'role' => $role_slug,
            'capability' => $capability,
            'action' => $action,
            'user_id' => get_current_user_id(),
            'timestamp' => current_time('mysql'),
        );
        
        $capability_log = get_option('memberglut_capability_log', array());
        
        // Keep only last 100 entries in free version
        if (count($capability_log) >= 100) {
            array_shift($capability_log);
        }
        
        $capability_log[] = $log_entry;
        
        update_option('memberglut_capability_log', $capability_log);
    }
    
    /**
     * Get capability change log
     */
    public function get_capability_log($limit = 50) {
        $log = get_option('memberglut_capability_log', array());
        
        // Sort by timestamp (newest first)
        usort($log, function($a, $b) {
            return strtotime($b['timestamp']) - strtotime($a['timestamp']);
        });
        
        return array_slice($log, 0, $limit);
    }
    
    /**
     * AJAX: Add capability to role
     */
    public function ajax_add_capability() {
        check_ajax_referer('memberglut_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(__('Permission denied.', 'memberglut'));
        }

        if (!isset($_POST['role_slug']) || !isset($_POST['capability'])) {
            wp_send_json_error(__('Missing required parameters.', 'memberglut'));
        }

        $role_slug = sanitize_key($_POST['role_slug']);
        $capability = sanitize_key($_POST['capability']);
        
        $result = $this->add_capability_to_role($role_slug, $capability, true);
        
        if (is_wp_error($result)) {
            wp_send_json_error($result->get_error_message());
        }
        
        wp_send_json_success(array(
            'message' => __('Capability added successfully.', 'memberglut')
        ));
    }
    
    /**
     * AJAX: Remove capability from role
     */
    public function ajax_remove_capability() {
        check_ajax_referer('memberglut_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(__('Permission denied.', 'memberglut'));
        }

        if (!isset($_POST['role_slug']) || !isset($_POST['capability'])) {
            wp_send_json_error(__('Missing required parameters.', 'memberglut'));
        }

        $role_slug = sanitize_key($_POST['role_slug']);
        $capability = sanitize_key($_POST['capability']);
        
        $result = $this->remove_capability_from_role($role_slug, $capability);
        
        if (is_wp_error($result)) {
            wp_send_json_error($result->get_error_message());
        }
        
        wp_send_json_success(array(
            'message' => __('Capability removed successfully.', 'memberglut')
        ));
    }
    
    /**
     * AJAX: Get role capabilities
     */
    public function ajax_get_role_capabilities() {
        check_ajax_referer('memberglut_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(__('Permission denied.', 'memberglut'));
        }

        if (!isset($_POST['role_slug'])) {
            wp_send_json_error(__('Missing required parameters.', 'memberglut'));
        }

        $role_slug = sanitize_key($_POST['role_slug']);
        $capabilities = $this->get_role_capabilities($role_slug);
        $available_capabilities = $this->get_registered_capabilities();
        
        wp_send_json_success(array(
            'capabilities' => $capabilities,
            'available_capabilities' => $available_capabilities
        ));
    }
}