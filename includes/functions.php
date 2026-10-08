<?php
/**
 * MemberGlut Helper Functions
 *
 * @package MemberGlut
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Check if user has specific MemberGlut role
 *
 * @param int $user_id User ID (optional, defaults to current user)
 * @param string $role Role slug to check
 * @return bool
 */
function memberglut_user_has_role($user_id = null, $role = '') {
    if (!$user_id) {
        $user_id = get_current_user_id();
    }
    
    if (!$user_id || empty($role)) {
        return false;
    }
    
    $user = get_user_by('id', $user_id);
    
    if (!$user) {
        return false;
    }
    
    return in_array($role, $user->roles);
}

/**
 * Check if user has access to specific capability
 *
 * @param int $user_id User ID (optional, defaults to current user)
 * @param string $capability Capability to check
 * @return bool
 */
function memberglut_user_can($user_id = null, $capability = '') {
    if (!$user_id) {
        $user_id = get_current_user_id();
    }
    
    if (!$user_id || empty($capability)) {
        return false;
    }
    
    return user_can($user_id, $capability);
}

/**
 * Get user's MemberGlut roles
 *
 * @param int $user_id User ID (optional, defaults to current user)
 * @return array Array of MemberGlut role slugs
 */
function memberglut_get_user_roles($user_id = null) {
    if (!$user_id) {
        $user_id = get_current_user_id();
    }
    
    if (!$user_id) {
        return array();
    }
    
    $user = get_user_by('id', $user_id);
    
    if (!$user) {
        return array();
    }
    
    $memberglut_roles = array();
    
    foreach ($user->roles as $role) {
        if (strpos($role, 'memberglut_') === 0) {
            $memberglut_roles[] = $role;
        }
    }
    
    return $memberglut_roles;
}

/**
 * Get user's membership status
 *
 * @param int $user_id User ID (optional, defaults to current user)
 * @return array|false Membership info or false if not found
 */
function memberglut_get_user_membership($user_id = null) {
    if (!$user_id) {
        $user_id = get_current_user_id();
    }

    if (!$user_id) {
        return false;
    }

    global $wpdb;

    // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared,PluginCheck.Security.DirectDB.UnescapedDBParameter,WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Table name uses {$wpdb->prefix}, user membership lookup needs real-time data.
    $membership = $wpdb->get_row(
        $wpdb->prepare(
            "SELECT * FROM {$wpdb->prefix}memberglut_user_memberships WHERE user_id = %d AND status = 'active' ORDER BY created_at DESC LIMIT 1",
            $user_id
        ),
        ARRAY_A
    );

    return $membership ? $membership : false;
}

/**
 * Check if content is restricted
 *
 * @param int $post_id Post ID (optional, defaults to current post)
 * @return bool
 */
function memberglut_is_content_restricted($post_id = null) {
    if (!$post_id) {
        global $post;
        $post_id = $post ? $post->ID : 0;
    }
    
    if (!$post_id) {
        return false;
    }
    
    $required_roles = get_post_meta($post_id, '_memberglut_required_roles', true);
    
    return !empty($required_roles) && is_array($required_roles);
}

/**
 * Check if current user can access content
 *
 * @param int $post_id Post ID (optional, defaults to current post)
 * @return bool
 */
function memberglut_user_can_access_content($post_id = null) {
    if (!memberglut_is_content_restricted($post_id)) {
        return true;
    }
    
    if (!$post_id) {
        global $post;
        $post_id = $post ? $post->ID : 0;
    }
    
    if (!$post_id) {
        return true;
    }
    
    $required_roles = get_post_meta($post_id, '_memberglut_required_roles', true);
    
    if (empty($required_roles)) {
        return true;
    }
    
    // Check if user is logged in
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
 * Get all MemberGlut roles
 *
 * @return array
 */
function memberglut_get_roles() {
    $roles_manager = MemberGlut_Roles::get_instance();
    return $roles_manager->get_memberglut_roles();
}

/**
 * Create a new MemberGlut role
 *
 * @param string $slug Role slug
 * @param string $name Role name
 * @param array $capabilities Capabilities array
 * @param string $description Role description
 * @return string|WP_Error Role slug on success, WP_Error on failure
 */
function memberglut_create_role($slug, $name, $capabilities = array(), $description = '') {
    $roles_manager = MemberGlut_Roles::get_instance();
    return $roles_manager->create_custom_role($slug, $name, $capabilities, $description);
}

/**
 * Assign role to user
 *
 * @param int $user_id User ID
 * @param string $role_slug Role slug
 * @return bool|WP_Error True on success, WP_Error on failure
 */
function memberglut_assign_role($user_id, $role_slug) {
    $roles_manager = MemberGlut_Roles::get_instance();
    return $roles_manager->assign_role_to_user($user_id, $role_slug);
}

/**
 * Get restriction message for content
 *
 * @param int $post_id Post ID (optional, defaults to current post)
 * @return string
 */
function memberglut_get_restriction_message($post_id = null) {
    if (!$post_id) {
        global $post;
        $post_id = $post ? $post->ID : 0;
    }
    
    $custom_message = '';
    
    if ($post_id) {
        $custom_message = get_post_meta($post_id, '_memberglut_restriction_message', true);
    }
    
    if (!empty($custom_message)) {
        return $custom_message;
    }
    
    return get_option('memberglut_restriction_message', esc_html__('This content is restricted to members only.', 'memberglut'));
}

/**
 * Display login form
 *
 * @param array $args Arguments for wp_login_form
 * @return string
 */
function memberglut_login_form($args = array()) {
    if (is_user_logged_in()) {
        return '<p>' . esc_html__('You are already logged in.', 'memberglut') . '</p>';
    }

    $defaults = array(
        'echo' => false,
        'form_id' => 'memberglut-login-form',
        'label_username' => esc_html__('Username or Email', 'memberglut'),
        'label_password' => esc_html__('Password', 'memberglut'),
        'label_remember' => esc_html__('Remember Me', 'memberglut'),
        'label_log_in' => esc_html__('Log In', 'memberglut'),
    );
    
    $args = wp_parse_args($args, $defaults);
    
    return wp_login_form($args);
}

/**
 * Get member statistics
 *
 * @return array
 */
function memberglut_get_member_stats() {
    global $wpdb;
    
    $roles_manager = MemberGlut_Roles::get_instance();
    $memberglut_roles = $roles_manager->get_memberglut_roles();
    
    $stats = array(
        'total_members' => 0,
        'roles' => array(),
    );
    
    // Count members by role
    foreach ($memberglut_roles as $role_slug => $role_data) {
        $users = get_users(array('role' => $role_slug, 'count_total' => true));
        $count = is_array($users) ? count($users) : $users;
        
        $stats['roles'][$role_slug] = array(
            'name' => $role_data['name'],
            'count' => $count,
        );
        
        $stats['total_members'] += $count;
    }
    
    return $stats;
}

/**
 * Log membership activity
 *
 * @param int $user_id User ID
 * @param string $action Action performed
 * @param string $details Additional details
 * @return bool
 */
function memberglut_log_activity($user_id, $action, $details = '') {
    // In free version, just use WordPress meta
    // Pro version could use dedicated activity table

    // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash -- $_SERVER values are not slashed.
    // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- IP address is stored in user meta, not displayed.
    $ip_address = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field($_SERVER['REMOTE_ADDR']) : ''; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash -- $_SERVER values are not slashed.

    $activity = array(
        'user_id' => $user_id,
        'action' => $action,
        'details' => $details,
        'timestamp' => current_time('mysql'),
        'ip_address' => $ip_address,
    );
    
    $user_activities = get_user_meta($user_id, '_memberglut_activities', true);
    
    if (!is_array($user_activities)) {
        $user_activities = array();
    }
    
    // Keep only last 10 activities in free version
    if (count($user_activities) >= 10) {
        array_shift($user_activities);
    }
    
    $user_activities[] = $activity;
    
    return update_user_meta($user_id, '_memberglut_activities', $user_activities);
}

/**
 * Get user activities
 *
 * @param int $user_id User ID
 * @param int $limit Number of activities to retrieve
 * @return array
 */
function memberglut_get_user_activities($user_id, $limit = 10) {
    $activities = get_user_meta($user_id, '_memberglut_activities', true);
    
    if (!is_array($activities)) {
        return array();
    }
    
    // Sort by timestamp (newest first)
    usort($activities, function($a, $b) {
        return strtotime($b['timestamp']) - strtotime($a['timestamp']);
    });
    
    return array_slice($activities, 0, $limit);
}

/**
 * Format role name for display
 *
 * @param string $role_slug Role slug
 * @return string
 */
function memberglut_format_role_name($role_slug) {
    // Remove memberglut_ prefix and format
    $formatted = str_replace('memberglut_', '', $role_slug);
    $formatted = str_replace('_', ' ', $formatted);
    $formatted = ucwords($formatted);
    
    return $formatted;
}

/**
 * Check if user registration is enabled
 *
 * @return bool
 */
function memberglut_is_registration_enabled() {
    return get_option('users_can_register', false);
}

/**
 * Get registration URL
 *
 * @return string
 */
function memberglut_get_registration_url() {
    return wp_registration_url();
}

/**
 * Get login URL with redirect
 *
 * @param string $redirect_to Redirect URL after login
 * @return string
 */
function memberglut_get_login_url($redirect_to = '') {
    if (empty($redirect_to)) {
        $redirect_to = get_permalink();
    }
    
    return wp_login_url($redirect_to);
}

/**
 * Check if current page is MemberGlut admin page
 *
 * @return bool
 */
function memberglut_is_admin_page() {
    $screen = get_current_screen();
    
    if (!$screen) {
        return false;
    }
    
    return strpos($screen->id, 'memberglut') !== false;
}

/**
 * Get plugin version
 *
 * @return string
 */
function memberglut_get_version() {
    return MEMBERGLUT_VERSION;
}

/**
 * Check if pro version is available and active
 *
 * @return bool
 */
function memberglut_is_pro() {
    return memberglut_is_pro_active();
}

/**
 * Get pro upgrade URL
 *
 * @return string
 */
function memberglut_get_pro_url() {
    return admin_url('admin.php?page=memberglut-pro');
}

/**
 * Sanitize role slug
 *
 * @param string $slug Role slug
 * @return string
 */
function memberglut_sanitize_role_slug($slug) {
    $slug = sanitize_key($slug);
    
    // Ensure memberglut prefix
    if (strpos($slug, 'memberglut_') !== 0) {
        $slug = 'memberglut_' . $slug;
    }
    
    return $slug;
}

/**
 * Get available capabilities for selection
 *
 * @return array
 */
function memberglut_get_capabilities() {
    $roles_manager = MemberGlut_Roles::get_instance();
    return $roles_manager->get_available_capabilities();
}

/**
 * Display member info widget
 *
 * @param array $args Widget arguments
 * @return string
 */
function memberglut_member_info_widget($args = array()) {
    if (!is_user_logged_in()) {
        return memberglut_login_form();
    }
    
    $defaults = array(
        'show_name' => true,
        'show_email' => false,
        'show_role' => true,
        'show_since' => true,
        'show_logout' => true,
    );
    
    $args = wp_parse_args($args, $defaults);
    
    $current_user = wp_get_current_user();
    $membership = memberglut_get_user_membership();
    
    ob_start();
    ?>
    <div class="memberglut-member-widget">
        <?php if ($args['show_name']): ?>
            <p><strong><?php esc_html_e('Welcome,', 'memberglut'); ?></strong> <?php echo esc_html($current_user->display_name); ?></p>
        <?php endif; ?>

        <?php if ($args['show_email']): ?>
            <p><strong><?php esc_html_e('Email:', 'memberglut'); ?></strong> <?php echo esc_html($current_user->user_email); ?></p>
        <?php endif; ?>

        <?php if ($args['show_role']): ?>
            <?php $user_roles = memberglut_get_user_roles(); ?>
            <?php if (!empty($user_roles)): ?>
                <p><strong><?php esc_html_e('Member Type:', 'memberglut'); ?></strong>
                   <?php echo esc_html(memberglut_format_role_name($user_roles[0])); ?>
                </p>
            <?php endif; ?>
        <?php endif; ?>

        <?php if ($args['show_since'] && $membership): ?>
            <p><strong><?php esc_html_e('Member Since:', 'memberglut'); ?></strong>
               <?php echo esc_html(date_i18n(get_option('date_format'), strtotime($membership['start_date']))); ?>
            </p>
        <?php endif; ?>

        <?php if ($args['show_logout']): ?>
            <p><a href="<?php echo esc_url(wp_logout_url()); ?>"><?php esc_html_e('Logout', 'memberglut'); ?></a></p>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}