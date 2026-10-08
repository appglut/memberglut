<?php
/**
 * MemberGlut Roles Management Class
 *
 * @package MemberGlut
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class MemberGlut_Roles {
    
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
        // AJAX hooks for role management
        add_action('wp_ajax_memberglut_create_role', array($this, 'ajax_create_role'));
        add_action('wp_ajax_memberglut_update_role', array($this, 'ajax_update_role'));
        add_action('wp_ajax_memberglut_delete_role', array($this, 'ajax_delete_role'));
        add_action('wp_ajax_memberglut_assign_role', array($this, 'ajax_assign_role'));
        
        // User profile hooks
        add_action('show_user_profile', array($this, 'add_user_role_fields'));
        add_action('edit_user_profile', array($this, 'add_user_role_fields'));
        add_action('personal_options_update', array($this, 'save_user_role_fields'));
        add_action('edit_user_profile_update', array($this, 'save_user_role_fields'));
    }
    
    /**
     * Get all available roles (WordPress + MemberGlut)
     */
    public function get_all_roles() {
        global $wp_roles;
        
        if (!isset($wp_roles)) {
            $wp_roles = new WP_Roles();
        }
        
        return $wp_roles->roles;
    }
    
    /**
     * Get MemberGlut specific roles
     */
    public function get_memberglut_roles() {
        $all_roles = $this->get_all_roles();
        $memberglut_roles = array();
        
        foreach ($all_roles as $role_slug => $role_data) {
            if (strpos($role_slug, 'memberglut_') === 0) {
                $memberglut_roles[$role_slug] = $role_data;
            }
        }
        
        return $memberglut_roles;
    }
    
    /**
     * Get custom created roles from database
     */
    public function get_custom_roles() {
        global $wpdb;

        $table_name = $wpdb->prefix . 'memberglut_custom_roles';

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.DirectDatabaseQuery.DirectQuery,PluginCheck.Security.DirectDB.UnescapedDBParameter -- Table name from $wpdb->prefix, no caching needed.
        $results = $wpdb->get_results(
            $wpdb->prepare("SELECT * FROM {$table_name} ORDER BY role_name ASC"), // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name from $wpdb->prefix.
            ARRAY_A
        );

        return $results ? $results : array();
    }
    
    /**
     * Create a new custom role
     */
    public function create_custom_role($role_slug, $role_name, $capabilities = array(), $description = '') {
        // Extension point: Before role creation
        do_action('memberglut_before_role_creation', $role_slug, $role_name, $capabilities, $description);
        
        // Sanitize inputs
        $role_slug = sanitize_key($role_slug);
        $role_name = sanitize_text_field($role_name);
        $description = sanitize_textarea_field($description);
        
        // Validate role slug
        if (empty($role_slug) || empty($role_name)) {
            return new WP_Error('invalid_data', __('Role slug and name are required.', 'memberglut'));
        }
        
        // Check if role already exists
        if (get_role($role_slug)) {
            return new WP_Error('role_exists', __('A role with this slug already exists.', 'memberglut'));
        }
        
        // Ensure memberglut prefix for custom roles
        if (strpos($role_slug, 'memberglut_') !== 0) {
            $role_slug = 'memberglut_' . $role_slug;
        }
        
        // Default capabilities
        if (empty($capabilities)) {
            $capabilities = array('read' => true);
        }
        
        // Add the role to WordPress
        $result = add_role($role_slug, $role_name, $capabilities);
        
        if ($result) {
            // Save to custom roles table
            global $wpdb;
            $table_name = $wpdb->prefix . 'memberglut_custom_roles';

            // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery -- No caching needed for write operation during role creation.
            $wpdb->insert(
                $table_name,
                array(
                    'role_slug' => $role_slug,
                    'role_name' => $role_name,
                    'role_description' => $description,
                    'capabilities' => maybe_serialize($capabilities),
                    'is_default' => 0,
                ),
                array('%s', '%s', '%s', '%s', '%d')
            );
            
            // Extension point: After successful role creation
            do_action('memberglut_after_role_created', $role_slug, $role_name, $capabilities, $description);
            
            return $role_slug;
        }
        
        // Extension point: After failed role creation
        do_action('memberglut_role_creation_failed', $role_slug, $role_name);
        
        return new WP_Error('role_creation_failed', __('Failed to create role.', 'memberglut'));
    }
    
    /**
     * Update an existing role
     */
    public function update_role($role_slug, $role_name = '', $capabilities = array(), $description = '') {
        $role = get_role($role_slug);
        
        if (!$role) {
            return new WP_Error('role_not_found', __('Role not found.', 'memberglut'));
        }
        
        // Update capabilities if provided
        if (!empty($capabilities)) {
            // Remove all current capabilities
            foreach ($role->capabilities as $cap => $granted) {
                $role->remove_cap($cap);
            }
            
            // Add new capabilities
            foreach ($capabilities as $cap => $granted) {
                if ($granted) {
                    $role->add_cap($cap);
                }
            }
        }
        
        // Update in custom roles table if it's a custom role
        if (strpos($role_slug, 'memberglut_') === 0) {
            global $wpdb;
            $table_name = $wpdb->prefix . 'memberglut_custom_roles';
            
            $update_data = array();
            
            if (!empty($role_name)) {
                $update_data['role_name'] = sanitize_text_field($role_name);
            }
            
            if (!empty($description)) {
                $update_data['role_description'] = sanitize_textarea_field($description);
            }

            if (!empty($capabilities)) {
                $update_data['capabilities'] = maybe_serialize($capabilities);
            }

            if (!empty($update_data)) {
                // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- No caching needed for write operation during role update.
                $wpdb->update(
                    $table_name,
                    $update_data,
                    array('role_slug' => $role_slug),
                    array('%s', '%s', '%s'),
                    array('%s')
                );
            }
        }

        return true;
    }

    /**
     * Delete a custom role
     */
    public function delete_role($role_slug) {
        // Don't allow deletion of default WordPress roles
        $protected_roles = array('administrator', 'editor', 'author', 'contributor', 'subscriber');

        if (in_array($role_slug, $protected_roles)) {
            return new WP_Error('protected_role', __('Cannot delete protected WordPress roles.', 'memberglut'));
        }

        // Check if users are assigned to this role
        $users = get_users(array('role' => $role_slug));

        if (!empty($users)) {
            $user_count = count($users);
            /* translators: %d: number of users */
            // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery -- get_users() is a wrapper for WP_User_Query, which is the proper abstraction.
            return new WP_Error('role_in_use',
                sprintf(
                    /* translators: %d: number of users */
                    __('Cannot delete role. %d users are currently assigned to this role.', 'memberglut'),
                    $user_count
                )
            );
        }

        // Remove from WordPress
        remove_role($role_slug);

        // Remove from custom roles table
        global $wpdb;
        $table_name = $wpdb->prefix . 'memberglut_custom_roles';

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- No caching needed for write operation during role deletion.
        $wpdb->delete(
            $table_name,
            array('role_slug' => $role_slug),
            array('%s')
        );

        return true;
    }
    
    /**
     * Assign role to user
     */
    public function assign_role_to_user($user_id, $role_slug) {
        $user = get_user_by('id', $user_id);
        
        if (!$user) {
            return new WP_Error('user_not_found', __('User not found.', 'memberglut'));
        }
        
        $role = get_role($role_slug);
        
        if (!$role) {
            return new WP_Error('role_not_found', __('Role not found.', 'memberglut'));
        }
        
        // Set the new role
        $user->set_role($role_slug);
        
        // Log the assignment
        $this->log_role_assignment($user_id, $role_slug);
        
        return true;
    }
    
    /**
     * Log role assignment
     */
    private function log_role_assignment($user_id, $role_slug) {
        global $wpdb;

        $table_name = $wpdb->prefix . 'memberglut_user_memberships';

        // Deactivate previous memberships
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Logging operation, caching not applicable.
        $wpdb->update(
            $table_name,
            array('status' => 'inactive'),
            array('user_id' => $user_id, 'status' => 'active'),
            array('%s'),
            array('%d', '%s')
        );

        // Add new membership record
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery -- Logging operation, caching not applicable.
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
     * Get available capabilities
     */
    public function get_available_capabilities() {
        $capabilities = array(
            // Basic WordPress capabilities
            'read' => __('Read', 'memberglut'),
            'edit_posts' => __('Edit Posts', 'memberglut'),
            'publish_posts' => __('Publish Posts', 'memberglut'),
            'edit_pages' => __('Edit Pages', 'memberglut'),
            'publish_pages' => __('Publish Pages', 'memberglut'),
            'upload_files' => __('Upload Files', 'memberglut'),
            'edit_comments' => __('Edit Comments', 'memberglut'),
            'moderate_comments' => __('Moderate Comments', 'memberglut'),
            
            // MemberGlut specific capabilities
            'memberglut_basic_access' => __('Basic Content Access', 'memberglut'),
            'memberglut_premium_access' => __('Premium Content Access', 'memberglut'),
            'memberglut_vip_access' => __('VIP Content Access', 'memberglut'),
        );
        
        // Add pro capabilities if available
        if (memberglut_is_pro_active()) {
            $capabilities = apply_filters('memberglut_pro_capabilities', $capabilities);
        }
        
        return apply_filters('memberglut_available_capabilities', $capabilities);
    }
    
    /**
     * AJAX: Create role
     */
    public function ajax_create_role() {
        check_ajax_referer('memberglut_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Permission denied.', 'memberglut'));
        }

        $role_slug = isset($_POST['role_slug']) ? sanitize_key(wp_unslash($_POST['role_slug'])) : '';
        $role_name = isset($_POST['role_name']) ? sanitize_text_field(wp_unslash($_POST['role_name'])) : '';
        $description = isset($_POST['description']) ? sanitize_textarea_field(wp_unslash($_POST['description'])) : '';
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Capabilities are sanitized with array_map on the next line.
        $capabilities = isset($_POST['capabilities']) ? wp_unslash($_POST['capabilities']) : array();
        $capabilities = array_map('sanitize_key', $capabilities);

        // Free version limitation
        if (!memberglut_is_pro_active()) {
            $existing_custom_roles = $this->get_custom_roles();
            if (count($existing_custom_roles) >= 3) {
                wp_send_json_error(esc_html__('Free version is limited to 3 custom roles. Upgrade to Pro for unlimited roles.', 'memberglut'));
            }
        }

        $result = $this->create_custom_role($role_slug, $role_name, $capabilities, $description);

        if (is_wp_error($result)) {
            wp_send_json_error($result->get_error_message());
        }

        wp_send_json_success(array(
            'message' => esc_html__('Role created successfully.', 'memberglut'),
            'role_slug' => $result
        ));
    }
    
    /**
     * AJAX: Update role
     */
    public function ajax_update_role() {
        check_ajax_referer('memberglut_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Permission denied.', 'memberglut'));
        }

        $role_slug = isset($_POST['role_slug']) ? sanitize_key(wp_unslash($_POST['role_slug'])) : '';
        $role_name = isset($_POST['role_name']) ? sanitize_text_field(wp_unslash($_POST['role_name'])) : '';
        $description = isset($_POST['description']) ? sanitize_textarea_field(wp_unslash($_POST['description'])) : '';
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Capabilities are sanitized with array_map on the next line.
        $capabilities = isset($_POST['capabilities']) ? wp_unslash($_POST['capabilities']) : array();
        $capabilities = array_map('sanitize_key', $capabilities);

        $result = $this->update_role($role_slug, $role_name, $capabilities, $description);

        if (is_wp_error($result)) {
            wp_send_json_error($result->get_error_message());
        }

        wp_send_json_success(array(
            'message' => esc_html__('Role updated successfully.', 'memberglut')
        ));
    }

    /**
     * AJAX: Delete role
     */
    public function ajax_delete_role() {
        check_ajax_referer('memberglut_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Permission denied.', 'memberglut'));
        }

        $role_slug = isset($_POST['role_slug']) ? sanitize_key(wp_unslash($_POST['role_slug'])) : '';

        $result = $this->delete_role($role_slug);

        if (is_wp_error($result)) {
            wp_send_json_error($result->get_error_message());
        }

        wp_send_json_success(array(
            'message' => esc_html__('Role deleted successfully.', 'memberglut')
        ));
    }

    /**
     * AJAX: Assign role
     */
    public function ajax_assign_role() {
        check_ajax_referer('memberglut_admin_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Permission denied.', 'memberglut'));
        }

        $user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;
        $role_slug = isset($_POST['role_slug']) ? sanitize_key(wp_unslash($_POST['role_slug'])) : '';

        $result = $this->assign_role_to_user($user_id, $role_slug);

        if (is_wp_error($result)) {
            wp_send_json_error($result->get_error_message());
        }

        wp_send_json_success(array(
            'message' => esc_html__('Role assigned successfully.', 'memberglut')
        ));
    }
    
    /**
     * Add role fields to user profile
     */
    public function add_user_role_fields($user) {
        if (!current_user_can('manage_options')) {
            return;
        }
        
        $memberglut_roles = $this->get_memberglut_roles();
        $user_roles = $user->roles;
        ?>
        <h2><?php esc_html_e('MemberGlut Membership', 'memberglut'); ?></h2>
        <table class="form-table">
            <tr>
                <th><label for="memberglut_role"><?php esc_html_e('Member Role', 'memberglut'); ?></label></th>
                <td>
                    <select name="memberglut_role" id="memberglut_role">
                        <option value=""><?php esc_html_e('No MemberGlut Role', 'memberglut'); ?></option>
                        <?php foreach ($memberglut_roles as $role_slug => $role_data): ?>
                            <option value="<?php echo esc_attr($role_slug); ?>"
                                    <?php selected(in_array($role_slug, $user_roles)); ?>>
                                <?php echo esc_html($role_data['name']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                    <p class="description"><?php esc_html_e('Assign a MemberGlut role to this user.', 'memberglut'); ?></p>
                </td>
            </tr>
        </table>
        <?php
    }
    
    /**
     * Save user role fields
     */
    public function save_user_role_fields($user_id) {
        // phpcs:ignore WordPress.Security.NonceVerification.Missing -- Nonce is verified by WordPress core in user profile update.
        if (!current_user_can('manage_options')) {
            return;
        }

        if (isset($_POST['memberglut_role'])) { // phpcs:ignore WordPress.Security.NonceVerification.Missing -- Nonce verified by WordPress core in user profile update.
            $new_role = sanitize_key(wp_unslash($_POST['memberglut_role'])); // phpcs:ignore WordPress.Security.NonceVerification.Missing -- Nonce verified by WordPress core in user profile update.

            if (!empty($new_role)) {
                $this->assign_role_to_user($user_id, $new_role);
            } else {
                // Remove MemberGlut roles but keep other roles
                $user = get_user_by('id', $user_id);
                $current_roles = $user->roles;

                foreach ($current_roles as $role) {
                    if (strpos($role, 'memberglut_') === 0) {
                        $user->remove_role($role);
                    }
                }

                // Ensure user has at least subscriber role
                if (empty($user->roles)) {
                    $user->set_role('subscriber');
                }
            }
        }
    }
}