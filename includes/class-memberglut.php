<?php
/**
 * Core MemberGlut Class
 *
 * @package MemberGlut
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class MemberGlut {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        $this->init_hooks();
    }
    
    private function init_hooks() {
        // Content restriction hooks - disabled in favor of MemberGlut_Access_Control class
        // add_action('template_redirect', array($this, 'check_content_access'));
        // add_filter('the_content', array($this, 'filter_restricted_content'), 10);
        // add_filter('get_the_excerpt', array($this, 'filter_restricted_excerpt'), 10);
        
        // User registration hooks
        add_action('user_register', array($this, 'assign_default_role'));
        
        // Login/logout redirects
        add_filter('login_redirect', array($this, 'custom_login_redirect'), 10, 3);
        add_filter('logout_redirect', array($this, 'custom_logout_redirect'), 10, 3);
        
        // Shortcodes
        add_action('init', array($this, 'register_shortcodes'));
        
        // AJAX hooks
        add_action('wp_ajax_memberglut_check_access', array($this, 'ajax_check_access'));
        add_action('wp_ajax_nopriv_memberglut_check_access', array($this, 'ajax_check_access'));
        
        // Enqueue scripts
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_scripts'));
    }
    
    /**
     * Check if user has access to current content
     */
    public function check_content_access() {
        if (!get_option('memberglut_enable_content_restriction', true)) {
            return;
        }
        
        global $post;
        
        if (!is_singular() || !$post) {
            return;
        }
        
        $required_roles = get_post_meta($post->ID, '_memberglut_required_roles', true);
        
        if (empty($required_roles)) {
            return;
        }
        
        if (!$this->user_has_required_access($required_roles)) {
            $redirect_url = get_option('memberglut_restriction_redirect', wp_login_url(get_permalink()));
            wp_safe_redirect($redirect_url);
            exit;
        }
    }
    
    /**
     * Filter restricted content
     */
    public function filter_restricted_content($content) {
        if (!get_option('memberglut_enable_content_restriction', true)) {
            return $content;
        }
        
        global $post;
        
        if (!$post || is_admin()) {
            return $content;
        }
        
        $required_roles = get_post_meta($post->ID, '_memberglut_required_roles', true);
        
        if (empty($required_roles)) {
            return $content;
        }
        
        if (!$this->user_has_required_access($required_roles)) {
            $restriction_message = get_post_meta($post->ID, '_memberglut_restriction_message', true);
            
            if (empty($restriction_message)) {
                $restriction_message = get_option('memberglut_restriction_message', 
                    __('This content is restricted to members only.', 'memberglut')
                );
            }
            
            $login_url = wp_login_url(get_permalink());
            $register_url = wp_registration_url();
            
            ob_start();
            ?>
            <div class="memberglut-restriction-notice">
                <div class="memberglut-restriction-content">
                    <h3><?php esc_html_e('Content Restricted', 'memberglut'); ?></h3>
                    <p><?php echo esc_html($restriction_message); ?></p>
                    <div class="memberglut-restriction-actions">
                        <a href="<?php echo esc_url($login_url); ?>" class="memberglut-btn memberglut-btn-primary">
                            <?php esc_html_e('Login', 'memberglut'); ?>
                        </a>
                        <?php if (get_option('users_can_register')): ?>
                            <a href="<?php echo esc_url($register_url); ?>" class="memberglut-btn memberglut-btn-secondary">
                                <?php esc_html_e('Register', 'memberglut'); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
            <?php
            return ob_get_clean();
        }
        
        return $content;
    }
    
    /**
     * Filter restricted excerpts
     */
    public function filter_restricted_excerpt($excerpt) {
        if (!get_option('memberglut_enable_content_restriction', true)) {
            return $excerpt;
        }
        
        global $post;
        
        if (!$post) {
            return $excerpt;
        }
        
        $required_roles = get_post_meta($post->ID, '_memberglut_required_roles', true);
        
        if (empty($required_roles)) {
            return $excerpt;
        }
        
        if (!$this->user_has_required_access($required_roles)) {
            return esc_html__('This content is restricted to members only.', 'memberglut');
        }
        
        return $excerpt;
    }
    
    /**
     * Check if current user has required access
     */
    public function user_has_required_access($required_roles) {
        if (empty($required_roles) || !is_array($required_roles)) {
            return true;
        }
        
        if (!is_user_logged_in()) {
            return false;
        }
        
        $current_user = wp_get_current_user();
        
        // Administrators always have access
        if (in_array('administrator', $current_user->roles)) {
            return true;
        }
        
        // Check if user has any of the required roles
        foreach ($required_roles as $required_role) {
            if (in_array($required_role, $current_user->roles)) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Assign default role to new users
     */
    public function assign_default_role($user_id) {
        $default_role = get_option('memberglut_default_role', 'memberglut_basic');
        
        if ($default_role && $default_role !== 'subscriber') {
            $user = new WP_User($user_id);
            $user->set_role($default_role);
            
            // Log membership assignment
            $this->log_membership_assignment($user_id, $default_role);
        }
    }
    
    /**
     * Log membership assignment
     */
    private function log_membership_assignment($user_id, $role_slug) {
        global $wpdb;

        $table_name = $wpdb->prefix . 'memberglut_user_memberships';

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- This is a logging operation during user registration, caching not applicable.
        $wpdb->insert(
            $table_name,
            array(
                'user_id' => $user_id,
                'role_slug' => $role_slug,
                'status' => 'active',
                'start_date' => current_time('mysql'),
            ),
            array('%d', '%s', '%s', '%s')
        );
    }
    
    /**
     * Custom login redirect
     */
    public function custom_login_redirect($redirect_to, $request, $user) {
        $custom_redirect = get_option('memberglut_login_redirect');
        
        if (!empty($custom_redirect) && !is_wp_error($user)) {
            return $custom_redirect;
        }
        
        return $redirect_to;
    }
    
    /**
     * Custom logout redirect
     */
    public function custom_logout_redirect($redirect_to, $requested_redirect_to, $user) {
        $custom_redirect = get_option('memberglut_logout_redirect');
        
        if (!empty($custom_redirect)) {
            return $custom_redirect;
        }
        
        return $redirect_to;
    }
    
    /**
     * Register shortcodes
     */
    public function register_shortcodes() {
        add_shortcode('memberglut_content', array($this, 'shortcode_restricted_content'));
       // add_shortcode('memberglut_login_form', array($this, 'shortcode_login_form'));
        add_shortcode('memberglut_member_info', array($this, 'shortcode_member_info'));
        
        // Pro shortcodes
        if (memberglut_is_pro_active()) {
            do_action('memberglut_register_pro_shortcodes');
        }
    }
    
    /**
     * Restricted content shortcode
     * Usage: [memberglut_content roles="basic,premium"]Content here[/memberglut_content]
     */
    public function shortcode_restricted_content($atts, $content = '') {
        $atts = shortcode_atts(array(
            'roles' => '',
            'message' => '',
        ), $atts, 'memberglut_content');
        
        if (empty($atts['roles'])) {
            return $content;
        }
        
        $required_roles = array_map('trim', explode(',', $atts['roles']));
        
        if ($this->user_has_required_access($required_roles)) {
            return do_shortcode($content);
        }
        
        $message = !empty($atts['message']) ? $atts['message'] : 
                   __('This content is restricted to members only.', 'memberglut');
        
        return '<div class="memberglut-shortcode-restriction">' . esc_html($message) . '</div>';
    }
    
    /**
     * Login form shortcode
     */
    public function shortcode_login_form($atts) {
        if (is_user_logged_in()) {
            return '<p>' . esc_html__('You are already logged in.', 'memberglut') . '</p>';
        }

        $atts = shortcode_atts(array(
            'redirect' => '',
            'form_id' => 'memberglut-login-form',
            'label_username' => esc_html__('Username or Email', 'memberglut'),
            'label_password' => esc_html__('Password', 'memberglut'),
            'label_remember' => esc_html__('Remember Me', 'memberglut'),
            'label_log_in' => esc_html__('Log In', 'memberglut'),
        ), $atts, 'memberglut_login_form');
        
        $redirect_url = !empty($atts['redirect']) ? $atts['redirect'] : '';
        
        return wp_login_form(array(
            'echo' => false,
            'redirect' => $redirect_url,
            'form_id' => $atts['form_id'],
            'label_username' => $atts['label_username'],
            'label_password' => $atts['label_password'],
            'label_remember' => $atts['label_remember'],
            'label_log_in' => $atts['label_log_in'],
        ));
    }
    
    /**
     * Member info shortcode
     */
    public function shortcode_member_info($atts) {
        if (!is_user_logged_in()) {
            return '<p>' . esc_html__('Please log in to view your member information.', 'memberglut') . '</p>';
        }
        
        $atts = shortcode_atts(array(
            'show' => 'role', // role, name, email, all
        ), $atts, 'memberglut_member_info');
        
        $current_user = wp_get_current_user();
        $output = '';
        
        switch ($atts['show']) {
            case 'name':
                $output = $current_user->display_name;
                break;
            case 'email':
                $output = $current_user->user_email;
                break;
            case 'role':
                $roles = $current_user->roles;
                $role_names = array();
                foreach ($roles as $role) {
                    $role_obj = get_role($role);
                    if ($role_obj) {
                        $role_names[] = ucwords(str_replace('_', ' ', $role));
                    }
                }
                $output = implode(', ', $role_names);
                break;
            case 'all':
                $output = '<div class="memberglut-member-info">';
                $output .= '<p><strong>' . esc_html__('Name:', 'memberglut') . '</strong> ' . esc_html($current_user->display_name) . '</p>';
                $output .= '<p><strong>' . esc_html__('Email:', 'memberglut') . '</strong> ' . esc_html($current_user->user_email) . '</p>';
                $output .= '<p><strong>' . esc_html__('Role:', 'memberglut') . '</strong> ' . esc_html(implode(', ', array_map(function($role) {
                    return ucwords(str_replace('_', ' ', $role));
                }, $current_user->roles))) . '</p>';
                $output .= '</div>';
                break;
        }
        
        return $output;
    }
    
    /**
     * AJAX check access
     */
    public function ajax_check_access() {
        check_ajax_referer('memberglut_nonce', 'nonce');

        if (!isset($_POST['content_id'])) {
            wp_send_json_error(__('Content ID is required.', 'memberglut'));
        }

        $content_id = intval($_POST['content_id']);
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Roles are sanitized with array_map on next line.
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash -- wp_unslash is applied before array_map sanitization.
        $required_roles = isset($_POST['required_roles']) ? array_map('sanitize_key', wp_unslash($_POST['required_roles'])) : array();
        
        $has_access = $this->user_has_required_access($required_roles);
        
        wp_send_json(array(
            'success' => true,
            'has_access' => $has_access,
            'user_logged_in' => is_user_logged_in(),
        ));
    }
    
    /**
     * Enqueue frontend scripts
     */
    public function enqueue_frontend_scripts() {
        wp_enqueue_style('memberglut-frontend', MEMBERGLUT_PLUGIN_URL . 'assets/css/frontend.css', array(), MEMBERGLUT_VERSION);
        
        wp_enqueue_script('memberglut-frontend', MEMBERGLUT_PLUGIN_URL . 'assets/js/frontend.js', array('jquery'), MEMBERGLUT_VERSION, true);
        
        wp_localize_script('memberglut-frontend', 'memberglut_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('memberglut_nonce'),
            'strings' => array(
                'loading' => __('Loading...', 'memberglut'),
                'error' => __('An error occurred. Please try again.', 'memberglut'),
            ),
        ));
    }
}