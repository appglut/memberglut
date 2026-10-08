<?php
/**
 * MemberGlut Extensions Manager
 * Handles Pro features and extensibility framework
 *
 * @package MemberGlut
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class MemberGlut_Extensions {
    
    private static $instance = null;
    private $registered_features = array();
    private $active_features = array();
    
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
        $this->register_core_features();
    }
    
    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Feature management hooks
        add_action('init', array($this, 'load_active_features'), 5);
        add_action('admin_init', array($this, 'check_pro_status'));
        
        // AJAX hooks for Pro features
        add_action('wp_ajax_memberglut_get_pro_info', array($this, 'ajax_get_pro_info'));
        add_action('wp_ajax_memberglut_activate_feature', array($this, 'ajax_activate_feature'));
        
        // Extension points
        add_action('memberglut_before_content_restriction', array($this, 'before_content_restriction'), 10, 2);
        add_action('memberglut_after_content_restriction', array($this, 'after_content_restriction'), 10, 2);
        add_action('memberglut_before_role_creation', array($this, 'before_role_creation'), 10, 2);
        add_action('memberglut_after_role_creation', array($this, 'after_role_creation'), 10, 2);
    }
    
    /**
     * Register core features (free and pro)
     */
    private function register_core_features() {
        // Free features
        $this->register_feature('basic_roles', array(
            'name' => __('Basic Member Roles', 'memberglut'),
            'description' => __('Create up to 3 custom member roles', 'memberglut'),
            'type' => 'free',
            'status' => 'active',
            'class' => 'MemberGlut_Roles',
            'file' => 'class-memberglut-roles.php'
        ));
        
        $this->register_feature('content_restriction', array(
            'name' => __('Content Restriction', 'memberglut'),
            'description' => __('Restrict posts and pages to specific member roles', 'memberglut'),
            'type' => 'free',
            'status' => 'active',
            'class' => 'MemberGlut_Access_Control',
            'file' => 'class-memberglut-access-control.php'
        ));
        
        // Pro features
        $this->register_feature('unlimited_roles', array(
            'name' => __('Unlimited Custom Roles', 'memberglut'),
            'description' => __('Create unlimited custom member roles with advanced permissions', 'memberglut'),
            'type' => 'pro',
            'status' => 'available',
            'requires' => array('basic_roles'),
            'upgrade_url' => 'https://appglut.com/memberglut-pro'
        ));
        
        $this->register_feature('advanced_restrictions', array(
            'name' => __('Advanced Content Restrictions', 'memberglut'),
            'description' => __('Time-based restrictions, IP restrictions, and more', 'memberglut'),
            'type' => 'pro',
            'status' => 'available',
            'requires' => array('content_restriction'),
            'upgrade_url' => 'https://appglut.com/memberglut-pro'
        ));
        
        $this->register_feature('membership_expiration', array(
            'name' => __('Membership Expiration', 'memberglut'),
            'description' => __('Set expiration dates for memberships with automatic renewals', 'memberglut'),
            'type' => 'pro',
            'status' => 'available',
            'upgrade_url' => 'https://appglut.com/memberglut-pro'
        ));
        
        $this->register_feature('email_notifications', array(
            'name' => __('Email Notifications', 'memberglut'),
            'description' => __('Automated emails for registration, expiration, and upgrades', 'memberglut'),
            'type' => 'pro',
            'status' => 'available',
            'upgrade_url' => 'https://appglut.com/memberglut-pro'
        ));
        
        $this->register_feature('import_export', array(
            'name' => __('Import/Export Members', 'memberglut'),
            'description' => __('Bulk import/export member data via CSV', 'memberglut'),
            'type' => 'pro',
            'status' => 'available',
            'upgrade_url' => 'https://appglut.com/memberglut-pro'
        ));
        
        $this->register_feature('analytics', array(
            'name' => __('Advanced Analytics', 'memberglut'),
            'description' => __('Detailed reports on member activity and content access', 'memberglut'),
            'type' => 'pro',
            'status' => 'available',
            'upgrade_url' => 'https://appglut.com/memberglut-pro'
        ));
        
        $this->register_feature('payment_integration', array(
            'name' => __('Payment Gateway Integration', 'memberglut'),
            'description' => __('Accept payments via Stripe, PayPal, and more', 'memberglut'),
            'type' => 'pro',
            'status' => 'available',
            'upgrade_url' => 'https://appglut.com/memberglut-pro'
        ));
        
        $this->register_feature('member_dashboard', array(
            'name' => __('Member Dashboard', 'memberglut'),
            'description' => __('Frontend dashboard for members to manage their accounts', 'memberglut'),
            'type' => 'pro',
            'status' => 'available',
            'upgrade_url' => 'https://appglut.com/memberglut-pro'
        ));
        
        $this->register_feature('custom_registration', array(
            'name' => __('Custom Registration Forms', 'memberglut'),
            'description' => __('Create custom registration forms with additional fields', 'memberglut'),
            'type' => 'pro',
            'status' => 'available',
            'upgrade_url' => 'https://appglut.com/memberglut-pro'
        ));
        
        $this->register_feature('bulk_management', array(
            'name' => __('Bulk Member Management', 'memberglut'),
            'description' => __('Bulk operations for managing large numbers of members', 'memberglut'),
            'type' => 'pro',
            'status' => 'available',
            'upgrade_url' => 'https://appglut.com/memberglut-pro'
        ));
    }
    
    /**
     * Register a feature
     */
    public function register_feature($feature_id, $feature_data) {
        $defaults = array(
            'name' => '',
            'description' => '',
            'type' => 'free', // free, pro, addon
            'status' => 'inactive', // active, inactive, available
            'version' => '1.0.0',
            'requires' => array(),
            'class' => '',
            'file' => '',
            'callback' => null,
            'upgrade_url' => '',
            'settings' => array()
        );
        
        $this->registered_features[$feature_id] = wp_parse_args($feature_data, $defaults);
        
        do_action('memberglut_feature_registered', $feature_id, $this->registered_features[$feature_id]);
    }
    
    /**
     * Get registered features
     */
    public function get_registered_features($type = 'all') {
        if ($type === 'all') {
            return $this->registered_features;
        }
        
        return array_filter($this->registered_features, function($feature) use ($type) {
            return $feature['type'] === $type;
        });
    }
    
    /**
     * Get active features
     */
    public function get_active_features() {
        return $this->active_features;
    }
    
    /**
     * Check if feature is active
     */
    public function is_feature_active($feature_id) {
        return isset($this->active_features[$feature_id]);
    }
    
    /**
     * Check if feature is available (registered but not necessarily active)
     */
    public function is_feature_available($feature_id) {
        return isset($this->registered_features[$feature_id]);
    }
    
    /**
     * Activate a feature
     */
    public function activate_feature($feature_id) {
        if (!$this->is_feature_available($feature_id)) {
            return new WP_Error('feature_not_found', __('Feature not found.', 'memberglut'));
        }
        
        $feature = $this->registered_features[$feature_id];
        
        // Check if pro feature and pro is not active
        if ($feature['type'] === 'pro' && !memberglut_is_pro_active()) {
            return new WP_Error('pro_required', __('This feature requires MemberGlut Pro.', 'memberglut'));
        }
        
        // Check requirements
        foreach ($feature['requires'] as $required_feature) {
            if (!$this->is_feature_active($required_feature)) {
                return new WP_Error('requirements_not_met',
                    sprintf(
                        /* translators: %s: required feature name */
                        __('This feature requires %s to be active.', 'memberglut'),
                        $required_feature
                    )
                );
            }
        }
        
        // Load feature class if specified
        if (!empty($feature['class']) && !empty($feature['file'])) {
            $file_path = MEMBERGLUT_PLUGIN_PATH . 'includes/' . $feature['file'];
            if (file_exists($file_path)) {
                require_once $file_path;
                
                if (class_exists($feature['class'])) {
                    $this->active_features[$feature_id] = $feature['class']::get_instance();
                }
            }
        }
        
        // Execute callback if specified
        if (is_callable($feature['callback'])) {
            call_user_func($feature['callback']);
        }
        
        // Update feature status
        $this->registered_features[$feature_id]['status'] = 'active';
        
        do_action('memberglut_feature_activated', $feature_id, $feature);
        
        return true;
    }
    
    /**
     * Deactivate a feature
     */
    public function deactivate_feature($feature_id) {
        if (!$this->is_feature_active($feature_id)) {
            return new WP_Error('feature_not_active', __('Feature is not active.', 'memberglut'));
        }
        
        unset($this->active_features[$feature_id]);
        $this->registered_features[$feature_id]['status'] = 'inactive';
        
        do_action('memberglut_feature_deactivated', $feature_id);
        
        return true;
    }
    
    /**
     * Load active features
     */
    public function load_active_features() {
        foreach ($this->registered_features as $feature_id => $feature) {
            if ($feature['status'] === 'active' || ($feature['type'] === 'free' && $feature['status'] !== 'inactive')) {
                $this->activate_feature($feature_id);
            }
        }
        
        do_action('memberglut_features_loaded');
    }
    
    /**
     * Check Pro status and update feature availability
     */
    public function check_pro_status() {
        $is_pro = memberglut_is_pro_active();
        
        foreach ($this->registered_features as $feature_id => &$feature) {
            if ($feature['type'] === 'pro') {
                $feature['status'] = $is_pro ? 'available' : 'requires_pro';
            }
        }
    }
    
    /**
     * Get Pro features list
     */
    public function get_pro_features() {
        return $this->get_registered_features('pro');
    }
    
    /**
     * Get upgrade URL for a feature
     */
    public function get_upgrade_url($feature_id = '') {
        if (!empty($feature_id) && isset($this->registered_features[$feature_id])) {
            return $this->registered_features[$feature_id]['upgrade_url'];
        }
        
        return apply_filters('memberglut_upgrade_url', 'https://appglut.com/memberglut-pro');
    }
    
    /**
     * Render Pro feature placeholder
     */
    public function render_pro_placeholder($feature_id, $args = array()) {
        if (!$this->is_feature_available($feature_id)) {
            return '';
        }
        
        $feature = $this->registered_features[$feature_id];
        $defaults = array(
            'title' => $feature['name'],
            'description' => $feature['description'],
            'button_text' => __('Upgrade to Pro', 'memberglut'),
            'upgrade_url' => $this->get_upgrade_url($feature_id),
            'style' => 'card' // card, banner, inline
        );
        
        $args = wp_parse_args($args, $defaults);
        
        ob_start();
        ?>
        <div class="memberglut-pro-placeholder memberglut-pro-placeholder-<?php echo esc_attr($args['style']); ?>">
            <div class="memberglut-pro-placeholder-content">
                <h3><?php echo esc_html($args['title']); ?></h3>
                <p><?php echo esc_html($args['description']); ?></p>
                <a href="<?php echo esc_url($args['upgrade_url']); ?>" class="memberglut-btn memberglut-btn-primary" target="_blank">
                    <?php echo esc_html($args['button_text']); ?>
                </a>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * Extension point: Before content restriction
     */
    public function before_content_restriction($post_id, $required_roles) {
        do_action('memberglut_pro_before_content_restriction', $post_id, $required_roles);
    }
    
    /**
     * Extension point: After content restriction
     */
    public function after_content_restriction($post_id, $restriction_applied) {
        do_action('memberglut_pro_after_content_restriction', $post_id, $restriction_applied);
    }
    
    /**
     * Extension point: Before role creation
     */
    public function before_role_creation($role_slug, $role_data) {
        do_action('memberglut_pro_before_role_creation', $role_slug, $role_data);
    }
    
    /**
     * Extension point: After role creation
     */
    public function after_role_creation($role_slug, $success) {
        do_action('memberglut_pro_after_role_creation', $role_slug, $success);
    }
    
    /**
     * AJAX: Get Pro info
     */
    public function ajax_get_pro_info() {
        check_ajax_referer('memberglut_admin_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error(__('Permission denied.', 'memberglut'));
        }
        
        $pro_features = $this->get_pro_features();
        $is_pro = memberglut_is_pro_active();
        
        wp_send_json_success(array(
            'is_pro' => $is_pro,
            'features' => $pro_features,
            'upgrade_url' => $this->get_upgrade_url()
        ));
    }
    
    /**
     * AJAX: Activate feature
     */
    public function ajax_activate_feature() {
        check_ajax_referer('memberglut_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(__('Permission denied.', 'memberglut'));
        }

        if (!isset($_POST['feature_id'])) {
            wp_send_json_error(__('Feature ID is required.', 'memberglut'));
        }

        $feature_id = sanitize_key(wp_unslash($_POST['feature_id']));
        $result = $this->activate_feature($feature_id);
        
        if (is_wp_error($result)) {
            wp_send_json_error($result->get_error_message());
        }
        
        wp_send_json_success(array(
            'message' => __('Feature activated successfully.', 'memberglut')
        ));
    }
    
    /**
     * Get feature settings
     */
    public function get_feature_settings($feature_id) {
        if (!$this->is_feature_available($feature_id)) {
            return array();
        }
        
        return $this->registered_features[$feature_id]['settings'];
    }
    
    /**
     * Update feature settings
     */
    public function update_feature_settings($feature_id, $settings) {
        if (!$this->is_feature_available($feature_id)) {
            return false;
        }
        
        $this->registered_features[$feature_id]['settings'] = $settings;
        update_option('memberglut_feature_settings_' . $feature_id, $settings);
        
        do_action('memberglut_feature_settings_updated', $feature_id, $settings);
        
        return true;
    }
}