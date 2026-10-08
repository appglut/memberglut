<?php
/**
 * MemberGlut Access Control Class
 *
 * @package MemberGlut
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class MemberGlut_Access_Control {

    private static $instance = null;
    private static $checking_access = false; // Prevent recursive calls
    private $cache_group = 'memberglut_access_control';
    private $cache_expiration = 3600; // 1 hour

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
        // Whole site login control
        add_action('template_redirect', array($this, 'check_whole_site_access'), 0);
        
        // Content filtering hooks
        add_action('template_redirect', array($this, 'check_page_access'), 1);
        add_filter('the_content', array($this, 'filter_content'), 10);
        add_filter('get_the_excerpt', array($this, 'filter_excerpt'), 10);
        add_filter('the_title', array($this, 'filter_title'), 10, 2);
        
        // Query modification
        add_action('pre_get_posts', array($this, 'filter_posts_query'));
        
        // Menu filtering
        add_filter('wp_nav_menu_objects', array($this, 'filter_nav_menu_items'), 10, 2);
        
        // Widget filtering
        add_filter('widget_display_callback', array($this, 'filter_widget_display'), 10, 3);
        
        // Comment filtering
        add_filter('comments_open', array($this, 'filter_comments_access'), 10, 2);
        
        // AJAX hooks
        add_action('wp_ajax_memberglut_set_content_restriction', array($this, 'ajax_set_content_restriction'));
        add_action('wp_ajax_memberglut_bulk_set_restrictions', array($this, 'ajax_bulk_set_restrictions'));
        
        // REST API restrictions
        add_filter('rest_prepare_post', array($this, 'filter_rest_post'), 10, 3);
        add_filter('rest_prepare_page', array($this, 'filter_rest_page'), 10, 3);
        
        // Search filtering
        add_filter('posts_where', array($this, 'filter_search_where'), 10, 2);
        
        // Archive filtering
        add_action('pre_get_posts', array($this, 'filter_archive_posts'));
        
        // Feed filtering
        add_filter('the_content_feed', array($this, 'filter_feed_content'));
        add_filter('the_excerpt_rss', array($this, 'filter_feed_excerpt'));
        
        // Reset redirect counter on successful login
        add_action('wp_login', array($this, 'reset_redirect_counter'));
    }
    
    /**
     * Check whole site access control
     */
    public function check_whole_site_access() {
        // Prevent recursive calls
        if (self::$checking_access) {
            return;
        }
        
        // Skip if whole site login control is not enabled
        if (!get_option('memberglut_whole_site_login_control', false)) {
            return;
        }
        
        // Set flag to prevent recursive calls
        self::$checking_access = true;

        // Skip for admin area
        if (is_admin()) {
            self::$checking_access = false;
            return;
        }

        // Skip for AJAX requests
        if (wp_doing_ajax()) {
            self::$checking_access = false;
            return;
        }

        // Skip for REST API requests
        if (defined('REST_REQUEST') && REST_REQUEST) {
            self::$checking_access = false;
            return;
        }

        // Skip for cron jobs
        if (wp_doing_cron()) {
            self::$checking_access = false;
            return;
        }

        // Skip if user is already logged in
        if (is_user_logged_in()) {
            self::$checking_access = false;
            return;
        }

        // Prevent infinite redirect loops - check if already redirected
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Nonce verification not applicable for GET parameter checking.
        if (isset($_GET['memberglut_redirect']) || isset($_SESSION['memberglut_redirecting'])) {
            self::$checking_access = false;
            return;
        }
        
        // Emergency brake - if too many redirects, temporarily disable
        $redirect_count = get_transient('memberglut_redirect_count');
        if ($redirect_count && $redirect_count > 10) {
            // Disable for 5 minutes if too many redirects
            self::$checking_access = false;
            return;
        }

        // Get current URL path
        $request_uri = isset($_SERVER['REQUEST_URI']) ? sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '';
        $current_path = wp_parse_url($request_uri, PHP_URL_PATH);
        
        // Always allow WordPress core login/register pages to prevent infinite loops
        $wp_core_pages = array(
            '/wp-login.php',
            '/wp-register.php', 
            '/wp-admin/',
            '/xmlrpc.php',
            '/wp-cron.php',
            '/wp-json/',
            '/favicon.ico',
            '/robots.txt'
        );
        
        foreach ($wp_core_pages as $core_page) {
            if (strpos($current_path, $core_page) !== false) {
                self::$checking_access = false;
                return;
            }
        }
        
        // Get login URL path to prevent redirecting to itself
        $login_url = get_option('memberglut_custom_login_url', '');
        if (!empty($login_url)) {
            $login_path = wp_parse_url(home_url($login_url), PHP_URL_PATH);
            if ($current_path === $login_path || strpos($current_path, $login_path) === 0) {
                self::$checking_access = false;
                return; // Don't redirect if we're already on the login page
            }
        }
        
        // Get allowed public pages
        $allowed_pages = get_option('memberglut_whole_site_allowed_pages', "/login\n/register\n/privacy-policy");
        $allowed_pages = array_filter(array_map('trim', explode("\n", $allowed_pages)));
        
        // Add custom login/register URLs to allowed pages automatically
        $custom_register_url = get_option('memberglut_custom_register_url', '');
        if (!empty($custom_register_url)) {
            $allowed_pages[] = $custom_register_url;
        }
        
        // Check if current page is in allowed list
        foreach ($allowed_pages as $allowed_page) {
            $allowed_page = trim($allowed_page);
            
            if (empty($allowed_page)) {
                continue;
            }
            
            // Handle both relative paths and full URLs
            if (strpos($allowed_page, 'http') === 0) {
                $allowed_path = wp_parse_url($allowed_page, PHP_URL_PATH);
            } else {
                $allowed_path = $allowed_page;
            }
            
            // Normalize paths (remove trailing slashes)
            $allowed_path = rtrim($allowed_path, '/');
            $current_path_clean = rtrim($current_path, '/');
            
            // Check for exact match or if current path starts with allowed path
            if ($current_path_clean === $allowed_path || strpos($current_path_clean, $allowed_path) === 0) {
                self::$checking_access = false;
                return;
            }
        }

        // Increment redirect counter for emergency brake
        $redirect_count = get_transient('memberglut_redirect_count');
        $redirect_count = $redirect_count ? $redirect_count + 1 : 1;
        set_transient('memberglut_redirect_count', $redirect_count, 300); // 5 minutes
        
        // Set session flag to prevent infinite loops (if sessions are available)
        if (session_status() === PHP_SESSION_NONE) {
            @session_start();
        }
        $_SESSION['memberglut_redirecting'] = true;

        // Determine redirect URL
        if (!empty($login_url)) {
            $redirect_url = home_url($login_url);
        } else {
            $redirect_url = wp_login_url();
        }

        // Add redirect parameter and loop prevention
        $request_uri = isset($_SERVER['REQUEST_URI']) ? sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '';
        $redirect_url = add_query_arg(array(
            'redirect_to' => urlencode($request_uri),
            'memberglut_redirect' => '1'
        ), $redirect_url);

        // Apply filter for custom redirect logic
        $redirect_url = apply_filters('memberglut_whole_site_redirect_url', $redirect_url, $current_path);

        // Clear session flag after redirect
        if (isset($_SESSION['memberglut_redirecting'])) {
            unset($_SESSION['memberglut_redirecting']);
        }

        // Reset the flag before redirect
        self::$checking_access = false;

        wp_safe_redirect($redirect_url);
        exit;
    }

    /**
     * Check if current page/post is accessible
     */
    public function check_page_access() {
        if (is_admin() || !is_singular()) {
            return;
        }
        
        global $post;
        
        if (!$post) {
            return;
        }
        
        // Check if content is restricted
        if (!$this->user_can_access_content($post->ID)) {
            $this->handle_access_denied($post->ID);
        }
    }
    
    /**
     * Filter post content
     */
    public function filter_content($content) {
        global $post;
        
        if (!$post || is_admin() || is_feed()) {
            return $content;
        }
        
        // Extension point: Before content filtering
        do_action('memberglut_before_content_filter', $post->ID, $content);
        
        // Check access
        if (!$this->user_can_access_content($post->ID)) {
            $restriction_message = $this->get_restriction_message($post->ID);
            
            // Extension point: After restriction applied
            do_action('memberglut_after_content_restricted', $post->ID, $restriction_message);
            
            return apply_filters('memberglut_restriction_message', $restriction_message, $post->ID);
        }
        
        // Extension point: Content accessible
        do_action('memberglut_content_accessible', $post->ID, $content);
        
        return apply_filters('memberglut_accessible_content', $content, $post->ID);
    }
    
    /**
     * Filter post excerpt
     */
    public function filter_excerpt($excerpt) {
        global $post;
        
        if (!$post || is_admin()) {
            return $excerpt;
        }
        
        if (!$this->user_can_access_content($post->ID)) {
            return $this->get_restriction_excerpt($post->ID);
        }
        
        return $excerpt;
    }
    
    /**
     * Filter post title
     */
    public function filter_title($title, $post_id = null) {
        if (is_admin() || !$post_id) {
            return $title;
        }
        
        $restriction_type = get_post_meta($post_id, '_memberglut_restriction_type', true);
        
        if ($restriction_type === 'hide_title' && !$this->user_can_access_content($post_id)) {
            return __('Restricted Content', 'memberglut');
        }
        
        return $title;
    }
    
    /**
     * Filter posts in queries
     */
    public function filter_posts_query($query) {
        // Don't filter admin queries or main query on singular pages
        if (is_admin() || $query->is_singular()) {
            return;
        }
        
        // Don't filter if user can manage options
        if (current_user_can('manage_options')) {
            return;
        }
        
        // Skip if content restriction is not enabled
        if (!get_option('memberglut_enable_content_restriction', true)) {
            return;
        }
        
        // Limit to main queries only to prevent memory issues
        if (!$query->is_main_query()) {
            return;
        }
        
        // Add meta query to exclude restricted content
        $meta_query = $query->get('meta_query', array());
        
        if (!is_array($meta_query)) {
            $meta_query = array();
        }
        
        // Only show content user can access
        $user_roles = $this->get_current_user_roles();
        
        if (empty($user_roles)) {
            // Not logged in - only show public content
            $meta_query[] = array(
                'relation' => 'OR',
                array(
                    'key' => '_memberglut_required_roles',
                    'compare' => 'NOT EXISTS'
                ),
                array(
                    'key' => '_memberglut_required_roles',
                    'value' => '',
                    'compare' => '='
                )
            );
        } else {
            // Logged in - show public content or content for user's roles
            $role_queries = array();
            
            foreach ($user_roles as $role) {
                $role_queries[] = array(
                    'key' => '_memberglut_required_roles',
                    'value' => '"' . $role . '"',
                    'compare' => 'LIKE'
                );
            }
            
            $meta_query[] = array(
                'relation' => 'OR',
                array(
                    'key' => '_memberglut_required_roles',
                    'compare' => 'NOT EXISTS'
                ),
                array(
                    'key' => '_memberglut_required_roles',
                    'value' => '',
                    'compare' => '='
                ),
                array(
                    'relation' => 'OR',
                    ...$role_queries
                )
            );
        }
        
        $query->set('meta_query', $meta_query);
    }
    
    /**
     * Filter navigation menu items
     */
    public function filter_nav_menu_items($items, $args) {
        if (is_admin()) {
            return $items;
        }
        
        foreach ($items as $key => $item) {
            if ($item->object === 'post' || $item->object === 'page') {
                if (!$this->user_can_access_content($item->object_id)) {
                    $hide_menu_item = get_post_meta($item->object_id, '_memberglut_hide_menu_item', true);
                    
                    if ($hide_menu_item) {
                        unset($items[$key]);
                    } else {
                        // Replace title with restriction notice
                        $items[$key]->title = __('Members Only', 'memberglut');
                        $items[$key]->url = '#restricted';
                        $items[$key]->classes[] = 'memberglut-restricted-menu-item';
                    }
                }
            }
        }
        
        return $items;
    }
    
    /**
     * Filter widget display
     */
    public function filter_widget_display($instance, $widget, $args) {
        // Check if widget has restriction settings
        if (isset($instance['memberglut_restricted_roles'])) {
            $required_roles = $instance['memberglut_restricted_roles'];
            
            if (!empty($required_roles)) {
                $user_roles = $this->get_current_user_roles();
                
                if (empty(array_intersect($user_roles, $required_roles))) {
                    return false; // Hide widget
                }
            }
        }
        
        return $instance;
    }
    
    /**
     * Filter comments access
     */
    public function filter_comments_access($open, $post_id) {
        if (!$this->user_can_access_content($post_id)) {
            $allow_comments = get_post_meta($post_id, '_memberglut_allow_comments', true);
            
            if (!$allow_comments) {
                return false;
            }
        }
        
        return $open;
    }
    
    /**
     * Filter REST API post response
     */
    public function filter_rest_post($response, $post, $request) {
        return $this->filter_rest_response($response, $post, $request);
    }
    
    /**
     * Filter REST API page response
     */
    public function filter_rest_page($response, $post, $request) {
        return $this->filter_rest_response($response, $post, $request);
    }
    
    /**
     * Filter REST API response
     */
    private function filter_rest_response($response, $post, $request) {
        if (!$this->user_can_access_content($post->ID)) {
            $data = $response->get_data();
            
            // Replace content with restriction message
            $data['content']['rendered'] = $this->get_restriction_message($post->ID);
            $data['excerpt']['rendered'] = $this->get_restriction_excerpt($post->ID);
            
            // Optionally hide title
            $restriction_type = get_post_meta($post->ID, '_memberglut_restriction_type', true);
            if ($restriction_type === 'hide_title') {
                $data['title']['rendered'] = __('Restricted Content', 'memberglut');
            }
            
            $response->set_data($data);
        }
        
        return $response;
    }
    
    /**
     * Filter search query WHERE clause
     */
    public function filter_search_where($where, $query) {
        if (!$query->is_search() || is_admin()) {
            return $where;
        }

        // Don't filter for administrators
        if (current_user_can('manage_options')) {
            return $where;
        }

        global $wpdb;

        $user_roles = $this->get_current_user_roles();

        if (empty($user_roles)) {
            // Not logged in - exclude all restricted content
            $where .= $wpdb->prepare(
                " AND {$wpdb->posts}.ID NOT IN (
                    SELECT post_id FROM {$wpdb->postmeta}
                    WHERE meta_key = %s
                    AND meta_value != %s
                )",
                '_memberglut_required_roles',
                ''
            );
        } else {
            // Logged in - exclude content user can't access
            // Build role fragments for the query (using esc_like for safety)
            $role_fragments = array();
            foreach ($user_roles as $role) {
                $role_fragments[] = $wpdb->prepare(
                    "meta_value LIKE %s",
                    '%' . $wpdb->esc_like('"' . $role . '"') . '%'
                );
            }

            $role_sql = implode(' OR ', $role_fragments);

            // Build SQL with role filter - $role_sql is constructed from prepared $wpdb->prepare() fragments
            // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared,WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- $role_sql is constructed from prepared $wpdb->prepare() fragments.
            $sql = " AND ({$wpdb->posts}.ID NOT IN (
                SELECT post_id FROM {$wpdb->postmeta}
                WHERE meta_key = %s
                AND meta_value != %s
            ) OR {$wpdb->posts}.ID IN (
                SELECT post_id FROM {$wpdb->postmeta}
                WHERE meta_key = %s
                AND ({$role_sql})
            ))";
            // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared -- $sql is properly prepared with placeholders below.
            $where .= $wpdb->prepare($sql, '_memberglut_required_roles', '', '_memberglut_required_roles');
        }

        return $where;
    }
    
    /**
     * Filter archive posts
     */
    public function filter_archive_posts($query) {
        if (!$query->is_main_query() || is_admin() || is_singular()) {
            return;
        }
        
        if (is_category() || is_tag() || is_archive()) {
            $this->filter_posts_query($query);
        }
    }
    
    /**
     * Filter feed content
     */
    public function filter_feed_content($content) {
        global $post;
        
        if (!$post) {
            return $content;
        }
        
        if (!$this->user_can_access_content($post->ID)) {
            return $this->get_restriction_excerpt($post->ID);
        }
        
        return $content;
    }
    
    /**
     * Filter feed excerpt
     */
    public function filter_feed_excerpt($excerpt) {
        global $post;
        
        if (!$post) {
            return $excerpt;
        }
        
        if (!$this->user_can_access_content($post->ID)) {
            return $this->get_restriction_excerpt($post->ID);
        }
        
        return $excerpt;
    }
    
    /**
     * Check if user can access specific content
     */
    public function user_can_access_content($post_id) {
        // Administrators always have access
        if (current_user_can('manage_options')) {
            return true;
        }
        
        // Get required roles for this content
        $required_roles = get_post_meta($post_id, '_memberglut_required_roles', true);
        
        // If no restrictions, allow access
        if (empty($required_roles) || !is_array($required_roles)) {
            return true;
        }
        
        // Check if user is logged in
        if (!is_user_logged_in()) {
            return false;
        }
        
        // Get current user roles
        $user_roles = $this->get_current_user_roles();
        
        // Check if user has any of the required roles
        return !empty(array_intersect($user_roles, $required_roles));
    }
    
    /**
     * Get current user's roles
     */
    private function get_current_user_roles() {
        if (!is_user_logged_in()) {
            return array();
        }
        
        $current_user = wp_get_current_user();
        return $current_user->roles;
    }
    
    /**
     * Handle access denied
     */
    private function handle_access_denied($post_id) {
        $redirect_type = get_post_meta($post_id, '_memberglut_redirect_type', true);
        $redirect_url = get_post_meta($post_id, '_memberglut_redirect_url', true);
        
        switch ($redirect_type) {
            case 'login':
                $redirect_url = wp_login_url(get_permalink($post_id));
                break;
            case 'custom':
                if (empty($redirect_url)) {
                    $redirect_url = home_url();
                }
                break;
            case 'membership_page':
                $membership_page = get_option('memberglut_membership_page_id');
                if ($membership_page) {
                    $redirect_url = get_permalink($membership_page);
                } else {
                    $redirect_url = home_url();
                }
                break;
            default:
                // Show restriction message on the same page
                return;
        }

        wp_safe_redirect($redirect_url);
        exit;
    }
    
    /**
     * Get restriction message for content
     */
    private function get_restriction_message($post_id) {
        $custom_message = get_post_meta($post_id, '_memberglut_restriction_message', true);
        
        if (!empty($custom_message)) {
            $message = $custom_message;
        } else {
            $message = get_option('memberglut_restriction_message', 
                __('This content is restricted to members only.', 'memberglut')
            );
        }
        
        $required_roles = get_post_meta($post_id, '_memberglut_required_roles', true);
        $show_required_roles = get_post_meta($post_id, '_memberglut_show_required_roles', true);
        
        ob_start();
        ?>
        <div class="memberglut-restriction-notice">
            <div class="memberglut-restriction-content">
                <h3><?php esc_html_e('Content Restricted', 'memberglut'); ?></h3>
                <p><?php echo esc_html($message); ?></p>
                
                <?php if ($show_required_roles && !empty($required_roles)): ?>
                    <p class="memberglut-required-roles">
                        <strong><?php esc_html_e('Required membership:', 'memberglut'); ?></strong>
                        <?php
                        $role_names = array();
                        foreach ($required_roles as $role_slug) {
                            $role_obj = get_role($role_slug);
                            if ($role_obj) {
                                $role_names[] = ucwords(str_replace(array('memberglut_', '_'), array('', ' '), $role_slug));
                            }
                        }
                        echo esc_html(implode(', ', $role_names));
                        ?>
                    </p>
                <?php endif; ?>
                
                <div class="memberglut-restriction-actions">
                    <?php if (!is_user_logged_in()): ?>
                        <a href="<?php echo esc_url(wp_login_url(get_permalink($post_id))); ?>" class="memberglut-btn memberglut-btn-primary">
                            <?php esc_html_e('Login', 'memberglut'); ?>
                        </a>
                        <?php if (get_option('users_can_register')): ?>
                            <a href="<?php echo esc_url(wp_registration_url()); ?>" class="memberglut-btn memberglut-btn-secondary">
                                <?php esc_html_e('Register', 'memberglut'); ?>
                            </a>
                        <?php endif; ?>
                    <?php else: ?>
                        <a href="<?php echo esc_url(home_url()); ?>" class="memberglut-btn memberglut-btn-secondary">
                            <?php esc_html_e('Go Home', 'memberglut'); ?>
                        </a>
                        <?php
                        $membership_page = get_option('memberglut_membership_page_id');
                        if ($membership_page):
                        ?>
                            <a href="<?php echo esc_url(get_permalink($membership_page)); ?>" class="memberglut-btn memberglut-btn-primary">
                                <?php esc_html_e('Upgrade Membership', 'memberglut'); ?>
                            </a>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * Get restriction excerpt
     */
    private function get_restriction_excerpt($post_id) {
        $excerpt_type = get_post_meta($post_id, '_memberglut_excerpt_type', true);
        
        switch ($excerpt_type) {
            case 'custom':
                $custom_excerpt = get_post_meta($post_id, '_memberglut_custom_excerpt', true);
                return !empty($custom_excerpt) ? $custom_excerpt : __('This content is restricted.', 'memberglut');
            
            case 'teaser':
                $teaser_length = get_post_meta($post_id, '_memberglut_teaser_length', true);
                $teaser_length = !empty($teaser_length) ? intval($teaser_length) : 55;
                
                $post = get_post($post_id);
                $content = wp_strip_all_tags($post->post_content);
                $excerpt = wp_trim_words($content, $teaser_length);
                
                return $excerpt . '... ' . __('[Content restricted to members]', 'memberglut');
            
            default:
                return __('This content is restricted to members only.', 'memberglut');
        }
    }
    
    /**
     * Set content restriction
     */
    public function set_content_restriction($post_id, $required_roles, $options = array()) {
        // Validate post
        $post = get_post($post_id);
        if (!$post) {
            return new WP_Error('invalid_post', __('Invalid post ID.', 'memberglut'));
        }

        // Validate roles
        if (!empty($required_roles)) {
            foreach ($required_roles as $role) {
                if (!get_role($role)) {
                    /* translators: %s: role slug */
                    return new WP_Error('invalid_role', sprintf(__('Role "%s" does not exist.', 'memberglut'), $role));
                }
            }
        }

        // Save required roles
        if (!empty($required_roles)) {
            update_post_meta($post_id, '_memberglut_required_roles', $required_roles);
        } else {
            delete_post_meta($post_id, '_memberglut_required_roles');
        }

        // Save additional options
        $meta_fields = array(
            'restriction_message',
            'redirect_type',
            'redirect_url',
            'show_required_roles',
            'hide_menu_item',
            'allow_comments',
            'excerpt_type',
            'custom_excerpt',
            'teaser_length'
        );

        foreach ($meta_fields as $field) {
            $meta_key = '_memberglut_' . $field;

            if (isset($options[$field])) {
                update_post_meta($post_id, $meta_key, $options[$field]);
            }
        }

        // Clear cache for this post
        $this->clear_restriction_cache($post_id);

        return true;
    }
    
    /**
     * Remove content restriction
     */
    public function remove_content_restriction($post_id) {
        $meta_keys = array(
            '_memberglut_required_roles',
            '_memberglut_restriction_message',
            '_memberglut_redirect_type',
            '_memberglut_redirect_url',
            '_memberglut_show_required_roles',
            '_memberglut_hide_menu_item',
            '_memberglut_allow_comments',
            '_memberglut_excerpt_type',
            '_memberglut_custom_excerpt',
            '_memberglut_teaser_length'
        );

        foreach ($meta_keys as $meta_key) {
            delete_post_meta($post_id, $meta_key);
        }

        // Clear cache for this post
        $this->clear_restriction_cache($post_id);

        return true;
    }

    /**
     * Clear restriction cache for a specific post
     */
    private function clear_restriction_cache($post_id) {
        wp_cache_delete('content_restriction_' . $post_id, $this->cache_group);
        wp_cache_delete('restrictions_for_content_' . $post_id, $this->cache_group);
    }

    /**
     * Get content restriction settings
     */
    public function get_content_restriction($post_id) {
        // Check cache first
        $cache_key = 'content_restriction_' . $post_id;
        $cached = wp_cache_get($cache_key, $this->cache_group);

        if (false !== $cached) {
            return $cached;
        }

        $restriction = array(
            'required_roles' => get_post_meta($post_id, '_memberglut_required_roles', true),
            'restriction_message' => get_post_meta($post_id, '_memberglut_restriction_message', true),
            'redirect_type' => get_post_meta($post_id, '_memberglut_redirect_type', true),
            'redirect_url' => get_post_meta($post_id, '_memberglut_redirect_url', true),
            'show_required_roles' => get_post_meta($post_id, '_memberglut_show_required_roles', true),
            'hide_menu_item' => get_post_meta($post_id, '_memberglut_hide_menu_item', true),
            'allow_comments' => get_post_meta($post_id, '_memberglut_allow_comments', true),
            'excerpt_type' => get_post_meta($post_id, '_memberglut_excerpt_type', true),
            'custom_excerpt' => get_post_meta($post_id, '_memberglut_custom_excerpt', true),
            'teaser_length' => get_post_meta($post_id, '_memberglut_teaser_length', true),
        );

        // Set defaults
        $restriction['redirect_type'] = !empty($restriction['redirect_type']) ? $restriction['redirect_type'] : 'message';
        $restriction['excerpt_type'] = !empty($restriction['excerpt_type']) ? $restriction['excerpt_type'] : 'default';
        $restriction['teaser_length'] = !empty($restriction['teaser_length']) ? $restriction['teaser_length'] : 55;

        // Cache the result
        wp_cache_set($cache_key, $restriction, $this->cache_group, $this->cache_expiration);

        return $restriction;
    }

    /**
     * Get all restrictions for specific content
     */
    public function get_restrictions_for_content($post_id) {
        // Check cache first
        $cache_key = 'restrictions_for_content_' . $post_id;
        $cached = wp_cache_get($cache_key, $this->cache_group);

        if (false !== $cached) {
            return $cached;
        }

        $restriction_data = $this->get_content_restriction($post_id);

        // Set defaults
        $restriction_data['redirect_type'] = !empty($restriction_data['redirect_type']) ? $restriction_data['redirect_type'] : 'message';
        $restriction_data['excerpt_type'] = !empty($restriction_data['excerpt_type']) ? $restriction_data['excerpt_type'] : 'default';
        $restriction_data['teaser_length'] = !empty($restriction_data['teaser_length']) ? $restriction_data['teaser_length'] : 55;

        // Cache the result
        wp_cache_set($cache_key, $restriction_data, $this->cache_group, $this->cache_expiration);

        return $restriction_data;
    }

    /**
     * Bulk set restrictions
     */
    public function bulk_set_restrictions($post_ids, $required_roles, $options = array()) {
        if (!is_array($post_ids)) {
            $post_ids = array($post_ids);
        }
        
        $results = array();
        
        foreach ($post_ids as $post_id) {
            $result = $this->set_content_restriction($post_id, $required_roles, $options);
            $results[$post_id] = $result;
        }
        
        return $results;
    }
    
    /**
     * Get restricted content statistics
     */
    public function get_restriction_stats() {
        global $wpdb;

        // Check cache first
        $cache_key = 'memberglut_restriction_stats';
        $cached = wp_cache_get($cache_key, $this->cache_group);

        if (false !== $cached) {
            return $cached;
        }

        // Count total restricted posts
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery -- No higher-level abstraction available for this specific aggregate query.
        $total_restricted = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM {$wpdb->postmeta} WHERE meta_key = %s",
                '_memberglut_required_roles'
            )
        );

        // Count by post type
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery -- No higher-level abstraction available for this specific aggregate query with joins.
        $by_post_type = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT p.post_type, COUNT(*) as count
                 FROM {$wpdb->posts} p
                 INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id
                 WHERE pm.meta_key = %s
                 AND p.post_status = %s
                 GROUP BY p.post_type",
                '_memberglut_required_roles',
                'publish'
            )
        );

        $result = array(
            'total_restricted' => intval($total_restricted),
            'by_post_type' => $by_post_type,
        );

        // Cache for 1 hour
        wp_cache_set($cache_key, $result, $this->cache_group, $this->cache_expiration);

        return $result;
    }
    
    /**
     * AJAX: Set content restriction
     */
    public function ajax_set_content_restriction() {
        check_ajax_referer('memberglut_admin_nonce', 'nonce');
        
        if (!current_user_can('edit_posts')) {
            wp_send_json_error(__('Permission denied.', 'memberglut'));
        }
        
        $post_id = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;

        if (empty($post_id)) {
            wp_send_json_error(__('Invalid post ID.', 'memberglut'));
        }

        // Sanitize and extract inputs
        $required_roles = isset($_POST['required_roles'])
            ? array_map('sanitize_key', wp_unslash($_POST['required_roles']))
            : array();
        $options = isset($_POST['options'])
            ? array_map('sanitize_text_field', wp_unslash($_POST['options']))
            : array();
        
        $result = $this->set_content_restriction($post_id, $required_roles, $options);
        
        if (is_wp_error($result)) {
            wp_send_json_error($result->get_error_message());
        }
        
        wp_send_json_success(array(
            'message' => __('Content restriction updated successfully.', 'memberglut')
        ));
    }
    
    /**
     * AJAX: Bulk set restrictions
     */
    public function ajax_bulk_set_restrictions() {
        check_ajax_referer('memberglut_admin_nonce', 'nonce');
        
        if (!current_user_can('edit_posts')) {
            wp_send_json_error(__('Permission denied.', 'memberglut'));
        }
        
        // Sanitize and extract inputs
        $post_ids = isset($_POST['post_ids']) ? array_map('intval', wp_unslash($_POST['post_ids'])) : array();
        $required_roles = isset($_POST['required_roles'])
            ? array_map('sanitize_key', wp_unslash($_POST['required_roles']))
            : array();
        $options = isset($_POST['options'])
            ? array_map('sanitize_text_field', wp_unslash($_POST['options']))
            : array();

        // Free version limitation
        if (!memberglut_is_pro_active() && count($post_ids) > 10) {
            wp_send_json_error(__('Free version is limited to 10 posts per bulk operation. Upgrade to Pro for unlimited bulk operations.', 'memberglut'));
        }
        
        $results = $this->bulk_set_restrictions($post_ids, $required_roles, $options);
        
        $success_count = 0;
        $error_count = 0;
        
        foreach ($results as $result) {
            if (is_wp_error($result)) {
                $error_count++;
            } else {
                $success_count++;
            }
        }

        $success_count = intval($success_count);
        $error_count = intval($error_count);
        $message = sprintf(
            /* translators: %1$d: number of successful updates, %2$d: number of errors */
            __('%1$d items updated successfully, %2$d errors.', 'memberglut'),
            $success_count,
            $error_count
        );
        
        wp_send_json_success(array(
            'message' => $message,
            'success_count' => $success_count,
            'error_count' => $error_count
        ));
    }
    
    /**
     * Check if content type supports restrictions
     */
    public function content_type_supports_restrictions($post_type) {
        $supported_types = apply_filters('memberglut_supported_post_types', array('post', 'page'));
        return in_array($post_type, $supported_types);
    }
    
    /**
     * Get restriction templates
     */
    public function get_restriction_templates() {
        $templates = array(
            'basic' => array(
                'name' => __('Basic Restriction', 'memberglut'),
                'message' => __('This content is restricted to members only.', 'memberglut'),
                'redirect_type' => 'login',
                'show_required_roles' => false,
            ),
            'premium' => array(
                'name' => __('Premium Content', 'memberglut'),
                'message' => __('This premium content is only available to premium members.', 'memberglut'),
                'redirect_type' => 'membership_page',
                'show_required_roles' => true,
            ),
            'coming_soon' => array(
                'name' => __('Coming Soon', 'memberglut'),
                'message' => __('This content will be available soon to our members.', 'memberglut'),
                'redirect_type' => 'message',
                'show_required_roles' => false,
            ),
        );
        
        return apply_filters('memberglut_restriction_templates', $templates);
    }
    
    /**
     * Reset redirect counter on successful login
     */
    public function reset_redirect_counter() {
        delete_transient('memberglut_redirect_count');
        
        // Clear session flag if exists
        if (session_status() !== PHP_SESSION_NONE && isset($_SESSION['memberglut_redirecting'])) {
            unset($_SESSION['memberglut_redirecting']);
        }
    }
}