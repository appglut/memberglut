<?php
/**
 * MemberGlut Admin Interface Class
 *
 * @package MemberGlut
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class MemberGlut_Admin {
    
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
        // Admin menu
        add_action('admin_menu', array($this, 'add_admin_menu'));
        
        // Admin scripts and styles
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        
        // Meta boxes for posts/pages
        add_action('add_meta_boxes', array($this, 'add_content_restriction_meta_box'));
        add_action('save_post', array($this, 'save_content_restriction_meta'));
        
        // Settings
        add_action('admin_init', array($this, 'register_settings'));
        
        // Plugin action links
        add_filter('plugin_action_links_' . MEMBERGLUT_PLUGIN_BASENAME, array($this, 'plugin_action_links'));
        
        // Admin notices
        add_action('admin_notices', array($this, 'admin_notices'));
        
        // AJAX handlers for admin-specific functionality
        add_action('wp_ajax_memberglut_get_role_data', array($this, 'ajax_get_role_data'));

        // AJAX handlers for plan management
        add_action('wp_ajax_memberglut_create_plan', array($this, 'ajax_create_plan'));
        add_action('wp_ajax_memberglut_update_plan', array($this, 'ajax_update_plan'));
        add_action('wp_ajax_memberglut_delete_plan', array($this, 'ajax_delete_plan'));
        add_action('wp_ajax_memberglut_get_plan', array($this, 'ajax_get_plan'));
        add_action('wp_ajax_memberglut_add_plan_feature', array($this, 'ajax_add_plan_feature'));
        add_action('wp_ajax_memberglut_get_plan_features', array($this, 'ajax_get_plan_features'));
        add_action('wp_ajax_memberglut_delete_plan_feature', array($this, 'ajax_delete_plan_feature'));
        add_action('wp_ajax_memberglut_assign_user_plan', array($this, 'ajax_assign_user_plan'));
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        // The React screens (MemberGlut_App) own the menu unless they are turned off.
        if (memberglut_use_react_admin()) {
            return;
        }

        // Main menu
        add_menu_page(
            __('MemberGlut', 'memberglut'),
            __('MemberGlut', 'memberglut'),
            'manage_options',
            'memberglut',
            array($this, 'dashboard_page'),
            'dashicons-groups',
            30
        );
        
        // Dashboard submenu
        add_submenu_page(
            'memberglut',
            esc_html__('Dashboard', 'memberglut'),
            esc_html__('Dashboard', 'memberglut'),
            'manage_options',
            'memberglut',
            array($this, 'dashboard_page')
        );
        
        // Roles submenu
        add_submenu_page(
            'memberglut',
            esc_html__('Member Roles', 'memberglut'),
            esc_html__('Member Roles', 'memberglut'),
            'manage_options',
            'memberglut-roles',
            array($this, 'roles_page')
        );
        
        // Members submenu
        add_submenu_page(
            'memberglut',
            esc_html__('Members', 'memberglut'),
            esc_html__('Members', 'memberglut'),
            'manage_options',
            'memberglut-members',
            array($this, 'members_page')
        );

        // Membership Plans submenu
        add_submenu_page(
            'memberglut',
            esc_html__('Membership Plans', 'memberglut'),
            esc_html__('Membership Plans', 'memberglut'),
            'manage_options',
            'memberglut-plans',
            array($this, 'plans_page')
        );

        // Settings submenu
        add_submenu_page(
            'memberglut',
            esc_html__('Settings', 'memberglut'),
            esc_html__('Settings', 'memberglut'),
            'manage_options',
            'memberglut-settings',
            array($this, 'settings_page')
        );
        
        // Extensions submenu
        add_submenu_page(
            'memberglut',
            esc_html__('Extensions', 'memberglut'),
            esc_html__('Extensions', 'memberglut'),
            'manage_options',
            'memberglut-extensions',
            array($this, 'extensions_page')
        );
        
        // Pro features submenu (if not pro)
        if (!memberglut_is_pro_active()) {
            add_submenu_page(
                'memberglut',
                __('Go Pro', 'memberglut'),
                '<span style="color: #f18500;">' . esc_html__('Go Pro', 'memberglut') . '</span>',
                'manage_options',
                'memberglut-pro',
                array($this, 'pro_page')
            );
        }
    }
    
    /**
     * Enqueue admin scripts and styles
     */
    public function enqueue_admin_scripts($hook_suffix) {
        // The React screens load their own bundle and use the same `memberglut_admin` variable name.
        if (MemberGlut_App::get_instance()->is_app_page()) {
            return;
        }

        // Only load on MemberGlut pages
        if (strpos($hook_suffix, 'memberglut') === false && $hook_suffix !== 'post.php' && $hook_suffix !== 'post-new.php') {
            return;
        }
        
        // Styles
        wp_enqueue_style('memberglut-admin', MEMBERGLUT_PLUGIN_URL . 'assets/css/admin.css', array(), MEMBERGLUT_VERSION);
        
        // Scripts
        wp_enqueue_script('memberglut-admin', MEMBERGLUT_PLUGIN_URL . 'assets/js/admin.js', array('jquery'), MEMBERGLUT_VERSION, true);
        
        // Localize script
        wp_localize_script('memberglut-admin', 'memberglut_admin', array(
            'ajax_url' => esc_url(admin_url('admin-ajax.php')),
            'nonce' => wp_create_nonce('memberglut_admin_nonce'),
            'strings' => array(
                'confirm_delete' => esc_html__('Are you sure you want to delete this role?', 'memberglut'),
                'loading' => esc_html__('Loading...', 'memberglut'),
                'error' => esc_html__('An error occurred. Please try again.', 'memberglut'),
                'success' => esc_html__('Operation completed successfully.', 'memberglut'),
                'show_capabilities' => esc_html__('Show Capabilities', 'memberglut'),
                'hide_capabilities' => esc_html__('Hide Capabilities', 'memberglut'),
            ),
        ));
    }
    
    /**
     * Dashboard page
     */
    public function dashboard_page() {
        $stats = $this->get_dashboard_stats();
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('MemberGlut Dashboard', 'memberglut'); ?></h1>
            
            <div class="memberglut-dashboard">
                <div class="memberglut-stats-grid">
                    <div class="memberglut-stat-card">
                        <div class="stat-icon">👥</div>
                        <div class="stat-content">
                            <h3><?php echo number_format($stats['total_members']); ?></h3>
                            <p><?php esc_html_e('Total Members', 'memberglut'); ?></p>
                        </div>
                    </div>
                    
                    <div class="memberglut-stat-card">
                        <div class="stat-icon">🏷️</div>
                        <div class="stat-content">
                            <h3><?php echo number_format($stats['total_roles']); ?></h3>
                            <p><?php esc_html_e('Member Roles', 'memberglut'); ?></p>
                        </div>
                    </div>
                    
                    <div class="memberglut-stat-card">
                        <div class="stat-icon">🔒</div>
                        <div class="stat-content">
                            <h3><?php echo number_format($stats['restricted_content']); ?></h3>
                            <p><?php esc_html_e('Restricted Content', 'memberglut'); ?></p>
                        </div>
                    </div>
                    
                    <div class="memberglut-stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-content">
                            <h3><?php echo number_format($stats['active_memberships']); ?></h3>
                            <p><?php esc_html_e('Active Memberships', 'memberglut'); ?></p>
                        </div>
                    </div>

                    <div class="memberglut-stat-card">
                        <div class="stat-icon">💎</div>
                        <div class="stat-content">
                            <h3><?php echo number_format($stats['total_plans']); ?></h3>
                            <p><?php esc_html_e('Membership Plans', 'memberglut'); ?></p>
                        </div>
                    </div>
                </div>
                
                <div class="memberglut-dashboard-content">
                    <div class="memberglut-dashboard-left">
                        <div class="memberglut-card">
                            <h2><?php esc_html_e('Quick Actions', 'memberglut'); ?></h2>
                            <div class="memberglut-quick-actions">
                                <a href="<?php echo esc_url(admin_url('admin.php?page=memberglut-roles')); ?>" class="button button-primary">
                                    <?php esc_html_e('Manage Roles', 'memberglut'); ?>
                                </a>
                                <a href="<?php echo esc_url(admin_url('admin.php?page=memberglut-members')); ?>" class="button button-secondary">
                                    <?php esc_html_e('View Members', 'memberglut'); ?>
                                </a>
                                <a href="<?php echo esc_url(admin_url('admin.php?page=memberglut-plans')); ?>" class="button button-secondary">
                                    <?php esc_html_e('Membership Plans', 'memberglut'); ?>
                                </a>
                                <a href="<?php echo esc_url(admin_url('admin.php?page=memberglut-settings')); ?>" class="button button-secondary">
                                    <?php esc_html_e('Settings', 'memberglut'); ?>
                                </a>
                            </div>
                        </div>
                        
                        <div class="memberglut-card">
                            <h2><?php esc_html_e('Recent Activity', 'memberglut'); ?></h2>
                            <?php $this->display_recent_activity(); ?>
                        </div>
                    </div>
                    
                    <div class="memberglut-dashboard-right">
                        <?php if (!memberglut_is_pro_active()): ?>
                        <div class="memberglut-card memberglut-pro-card">
                            <h2><?php esc_html_e('Upgrade to Pro', 'memberglut'); ?></h2>
                            <p><?php esc_html_e('Unlock powerful features with MemberGlut Pro:', 'memberglut'); ?></p>
                            <ul class="memberglut-pro-features">
                                <?php foreach (array_slice(memberglut_get_pro_features(), 0, 5) as $feature): ?>
                                    <li>✨ <?php echo esc_html($feature); ?></li>
                                <?php endforeach; ?>
                            </ul>
                            <a href="<?php echo esc_url(admin_url('admin.php?page=memberglut-pro')); ?>" class="button button-primary">
                                <?php esc_html_e('Learn More', 'memberglut'); ?>
                            </a>
                        </div>
                        <?php endif; ?>
                        
                        <div class="memberglut-card">
                            <h2><?php esc_html_e('System Info', 'memberglut'); ?></h2>
                            <table class="memberglut-system-info">
                                <tr>
                                    <td><?php esc_html_e('Plugin Version:', 'memberglut'); ?></td>
                                    <td><?php echo esc_html(MEMBERGLUT_VERSION); ?></td>
                                </tr>
                                <tr>
                                    <td><?php esc_html_e('WordPress Version:', 'memberglut'); ?></td>
                                    <td><?php echo esc_html(get_bloginfo('version')); ?></td>
                                </tr>
                                <tr>
                                    <td><?php esc_html_e('PHP Version:', 'memberglut'); ?></td>
                                    <td><?php echo esc_html(PHP_VERSION); ?></td>
                                </tr>
                                <tr>
                                    <td><?php esc_html_e('Pro Status:', 'memberglut'); ?></td>
                                    <td><?php echo memberglut_is_pro_active() ? esc_html__('Active', 'memberglut') : esc_html__('Not Active', 'memberglut'); ?></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
    
    /**
     * Roles management page
     */
    public function roles_page() {
        $roles_manager = MemberGlut_Roles::get_instance();
        $all_roles = $roles_manager->get_all_roles();
        $memberglut_roles = $roles_manager->get_memberglut_roles();
        $capabilities = $roles_manager->get_available_capabilities();
        
        // Check if role creation should be disabled
        $role_limit_reached = !memberglut_is_pro_active() && count($memberglut_roles) >= 3;
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('Member Roles', 'memberglut'); ?></h1>
            
            <div class="memberglut-roles-page">
                <!-- Create New Role -->
                <div class="memberglut-card">
                    <h2><?php esc_html_e('Create New Role', 'memberglut'); ?></h2>
                    
                    <?php if (!memberglut_is_pro_active()): ?>
                        <div class="memberglut-limitation-notice <?php echo $role_limit_reached ? 'limit-reached' : ''; ?>">
                            <p>
                                <?php if ($role_limit_reached): ?>
                                    <strong><?php esc_html_e('Role limit reached!', 'memberglut'); ?></strong>
                                    <?php esc_html_e('Free version is limited to 3 custom roles.', 'memberglut'); ?>
                                <?php else: ?>
                                    <?php /* translators: %d: number of custom roles used */ printf(esc_html__('Free version: %d of 3 custom roles used.', 'memberglut'), count($memberglut_roles)); ?>
                                <?php endif; ?>
                                <a href="<?php echo esc_url(admin_url('admin.php?page=memberglut-pro')); ?>"><?php esc_html_e('Upgrade to Pro', 'memberglut'); ?></a>
                                <?php esc_html_e('for unlimited roles.', 'memberglut'); ?>
                            </p>
                        </div>
                    <?php endif; ?>
                    
                    <form id="memberglut-create-role-form" class="memberglut-form <?php echo $role_limit_reached ? 'disabled' : ''; ?>">
                        <table class="form-table">
                            <tr>
                                <th scope="row">
                                    <label for="role_name"><?php esc_html_e('Role Name', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="text" id="role_name" name="role_name" class="regular-text" required <?php echo $role_limit_reached ? 'disabled' : ''; ?>>
                                    <p class="description"><?php esc_html_e('Display name for the role (e.g., "Gold Member")', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="role_slug"><?php esc_html_e('Role Slug', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="text" id="role_slug" name="role_slug" class="regular-text" required <?php echo $role_limit_reached ? 'disabled' : ''; ?>>
                                    <p class="description"><?php esc_html_e('Unique identifier (e.g., "gold_member"). Will be prefixed with "memberglut_"', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="role_description"><?php esc_html_e('Description', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <textarea id="role_description" name="role_description" class="large-text" rows="3" <?php echo $role_limit_reached ? 'disabled' : ''; ?>></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><?php esc_html_e('Capabilities', 'memberglut'); ?></th>
                                <td>
                                    <div class="memberglut-capabilities-grid">
                                        <?php foreach ($capabilities as $cap_key => $cap_label): ?>
                                            <label class="memberglut-capability-item">
                                                <input type="checkbox" name="capabilities[<?php echo esc_attr($cap_key); ?>]" value="1" <?php echo $role_limit_reached ? 'disabled' : ''; ?>>
                                                <?php echo esc_html($cap_label); ?>
                                            </label>
                                        <?php endforeach; ?>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        
                        <p class="submit">
                            <button type="submit" class="button button-primary" <?php echo $role_limit_reached ? 'disabled' : ''; ?>>
                                <?php echo $role_limit_reached ? esc_html__('Limit Reached', 'memberglut') : esc_html__('Create Role', 'memberglut'); ?>
                            </button>
                        </p>
                    </form>
                </div>
                
                <!-- Existing Roles -->
                <div class="memberglut-card">
                    <h2><?php esc_html_e('Existing Roles', 'memberglut'); ?></h2>
                    
                    <div class="memberglut-roles-grid">
                        <?php foreach ($all_roles as $role_slug => $role_data): ?>
                            <div class="memberglut-role-card <?php echo strpos($role_slug, 'memberglut_') === 0 ? 'custom-role' : 'default-role'; ?>">
                                <div class="role-header">
                                    <h3><?php echo esc_html($role_data['name']); ?></h3>
                                    <span class="role-slug"><?php echo esc_html($role_slug); ?></span>
                                </div>
                                
                                <div class="role-capabilities">
                                    <?php if (!empty($role_data['capabilities'])): ?>
                                        <?php
                                        $active_caps = array_keys(array_filter($role_data['capabilities']));
                                        $cap_count = count($active_caps);
                                        ?>
                                        <div class="role-capabilities-summary">
                                            <span class="capabilities-count">
                                                <?php
                                                /* translators: %d: number of capabilities */
                                                printf(esc_html__('%d Capabilities', 'memberglut'), $cap_count); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- $cap_count is an integer count, safe for use in printf.
                                                ?>
                                            </span>
                                            <button type="button" class="toggle-capabilities" data-role="<?php echo esc_attr($role_slug); ?>">
                                                <?php esc_html_e('Show Capabilities', 'memberglut'); ?>
                                            </button>
                                        </div>
                                        <div class="role-capabilities-list" id="capabilities-<?php echo esc_attr($role_slug); ?>">
                                            <ul>
                                                <?php foreach ($active_caps as $cap): ?>
                                                    <li><?php echo esc_html(isset($capabilities[$cap]) ? $capabilities[$cap] : $cap); ?></li>
                                                <?php endforeach; ?>
                                            </ul>
                                        </div>
                                    <?php else: ?>
                                        <span class="capabilities-count"><?php esc_html_e('No capabilities assigned', 'memberglut'); ?></span>
                                    <?php endif; ?>
                                </div>
                                
                                <div class="role-actions">
                                    <?php if (strpos($role_slug, 'memberglut_') === 0): ?>
                                        <button class="button edit-role" data-role="<?php echo esc_attr($role_slug); ?>">
                                            <?php esc_html_e('Edit', 'memberglut'); ?>
                                        </button>
                                        <button class="button delete-role" data-role="<?php echo esc_attr($role_slug); ?>">
                                            <?php esc_html_e('Delete', 'memberglut'); ?>
                                        </button>
                                    <?php else: ?>
                                        <span class="description"><?php esc_html_e('WordPress Default Role', 'memberglut'); ?></span>
                                    <?php endif; ?>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Edit Role Modal -->
        <div id="memberglut-edit-role-modal" class="memberglut-modal" style="display: none;">
            <div class="memberglut-modal-content">
                <div class="memberglut-modal-header">
                    <h2><?php esc_html_e('Edit Role', 'memberglut'); ?></h2>
                    <button class="memberglut-modal-close">&times;</button>
                </div>
                <form id="memberglut-edit-role-form">
                    <input type="hidden" id="edit_role_slug" name="role_slug">
                    <table class="form-table">
                        <tr>
                            <th scope="row">
                                <label for="edit_role_name"><?php esc_html_e('Role Name', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <input type="text" id="edit_role_name" name="role_name" class="regular-text" required>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="edit_role_description"><?php esc_html_e('Description', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <textarea id="edit_role_description" name="role_description" class="large-text" rows="3"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"><?php esc_html_e('Capabilities', 'memberglut'); ?></th>
                            <td>
                                <div class="memberglut-capabilities-grid" id="edit-capabilities-grid">
                                    <!-- Capabilities will be loaded dynamically -->
                                </div>
                            </td>
                        </tr>
                    </table>
                    <p class="submit">
                        <button type="submit" class="button button-primary">
                            <?php esc_html_e('Update Role', 'memberglut'); ?>
                        </button>
                        <button type="button" class="button memberglut-modal-close">
                            <?php esc_html_e('Cancel', 'memberglut'); ?>
                        </button>
                    </p>
                </form>
            </div>
        </div>
        <?php
    }
    
    /**
     * Members management page
     */
    public function members_page() {
        $roles_manager = MemberGlut_Roles::get_instance();
        $memberglut_roles = $roles_manager->get_memberglut_roles();
        
        // Get users with MemberGlut roles
        $members = get_users(array(
            'role__in' => array_keys($memberglut_roles),
            'number' => 50, // Free version limitation
        ));
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('Members', 'memberglut'); ?></h1>
            
            <div class="memberglut-members-page">
                <!-- Assign Role Form -->
                <div class="memberglut-card">
                    <h2><?php esc_html_e('Assign Member Role', 'memberglut'); ?></h2>
                    <form id="memberglut-assign-role-form">
                        <table class="form-table">
                            <tr>
                                <th scope="row">
                                    <label for="select_user"><?php esc_html_e('Select User', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <select id="select_user" name="user_id" class="regular-text" required>
                                        <option value=""><?php esc_html_e('Choose a user...', 'memberglut'); ?></option>
                                        <?php
                                        $all_users = get_users(array('number' => 100));
                                        foreach ($all_users as $user):
                                        ?>
                                            <option value="<?php echo esc_attr($user->ID); ?>">
                                                <?php echo esc_html($user->display_name . ' (' . $user->user_email . ')'); ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="select_role"><?php esc_html_e('Member Role', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <select id="select_role" name="role_slug" required>
                                        <option value=""><?php esc_html_e('Choose a role...', 'memberglut'); ?></option>
                                        <?php foreach ($memberglut_roles as $role_slug => $role_data): ?>
                                            <option value="<?php echo esc_attr($role_slug); ?>">
                                                <?php echo esc_html($role_data['name']); ?>
                                            </option>
                                        <?php endforeach; ?>
                                        <option value="remove"><?php esc_html_e('Remove MemberGlut Role', 'memberglut'); ?></option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                        <p class="submit">
                            <button type="submit" class="button button-primary">
                                <?php esc_html_e('Assign Role', 'memberglut'); ?>
                            </button>
                        </p>
                    </form>
                </div>
                
                <!-- Current Members -->
                <div class="memberglut-card">
                    <h2><?php esc_html_e('Current Members', 'memberglut'); ?></h2>
                    
                    <?php if (!memberglut_is_pro_active()): ?>
                        <div class="memberglut-limitation-notice">
                            <p><?php esc_html_e('Free version shows up to 50 members.', 'memberglut'); ?>
                               <a href="<?php echo esc_url(admin_url('admin.php?page=memberglut-pro')); ?>"><?php esc_html_e('Upgrade to Pro', 'memberglut'); ?></a>
                               <?php esc_html_e('for unlimited member management.', 'memberglut'); ?>
                            </p>
                        </div>
                    <?php endif; ?>
                    
                    <table class="wp-list-table widefat fixed striped">
                        <thead>
                            <tr>
                                <th><?php esc_html_e('User', 'memberglut'); ?></th>
                                <th><?php esc_html_e('Email', 'memberglut'); ?></th>
                                <th><?php esc_html_e('Member Role', 'memberglut'); ?></th>
                                <th><?php esc_html_e('Member Since', 'memberglut'); ?></th>
                                <th><?php esc_html_e('Status', 'memberglut'); ?></th>
                                <th><?php esc_html_e('Actions', 'memberglut'); ?></th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($members)): ?>
                                <tr>
                                    <td colspan="6" style="text-align: center;">
                                        <?php esc_html_e('No members found.', 'memberglut'); ?>
                                    </td>
                                </tr>
                            <?php else: ?>
                                <?php foreach ($members as $member): ?>
                                    <?php $membership_info = $this->get_user_membership_info($member->ID); ?>
                                    <tr>
                                        <td>
                                            <strong><?php echo esc_html($member->display_name); ?></strong>
                                            <br><small><?php echo esc_html($member->user_login); ?></small>
                                        </td>
                                        <td><?php echo esc_html($member->user_email); ?></td>
                                        <td>
                                            <?php
                                            $user_roles = array_intersect($member->roles, array_keys($memberglut_roles));
                                            foreach ($user_roles as $role) {
                                                echo '<span class="memberglut-role-badge">' . esc_html($memberglut_roles[$role]['name']) . '</span>';
                                            }
                                            ?>
                                        </td>
                                        <td>
                                            <?php echo $membership_info ? esc_html(date_i18n(get_option('date_format'), strtotime($membership_info['start_date']))) : '—'; ?>
                                        </td>
                                        <td>
                                            <span class="memberglut-status-badge <?php echo $membership_info && $membership_info['status'] === 'active' ? 'active' : 'inactive'; ?>">
                                                <?php echo $membership_info ? esc_html(ucfirst($membership_info['status'])) : esc_html__('Inactive', 'memberglut'); ?>
                                            </span>
                                        </td>
                                        <td>
                                            <a href="<?php echo esc_url(get_edit_user_link($member->ID)); ?>" class="button button-small">
                                                <?php esc_html_e('Edit', 'memberglut'); ?>
                                            </a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <?php
    }

    /**
     * Membership Plans page
     */
    public function plans_page() {
        $db = MemberGlut_DB::get_instance();

        // Ensure tables exist before querying
        $db->maybe_create_tables();

        $plans = $db->get_plans();

        // Check if plan creation should be disabled
        $plan_limit_reached = !memberglut_is_pro_active() && count($plans) >= 3;
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('Membership Plans', 'memberglut'); ?></h1>

            <div class="memberglut-plans-page">
                <!-- Create New Plan -->
                <div class="memberglut-card">
                    <h2><?php esc_html_e('Create New Plan', 'memberglut'); ?></h2>

                    <?php if (!memberglut_is_pro_active()): ?>
                        <div class="memberglut-limitation-notice <?php echo $plan_limit_reached ? 'limit-reached' : ''; ?>">
                            <p>
                                <?php if ($plan_limit_reached): ?>
                                    <strong><?php esc_html_e('Plan limit reached!', 'memberglut'); ?></strong>
                                    <?php esc_html_e('Free version is limited to 3 custom plans.', 'memberglut'); ?>
                                <?php else: ?>
                                    <?php /* translators: %d: number of custom plans used */ printf(esc_html__('Free version: %d of 3 custom plans used.', 'memberglut'), count($plans)); ?>
                                <?php endif; ?>
                                <a href="<?php echo esc_url(admin_url('admin.php?page=memberglut-pro')); ?>"><?php esc_html_e('Upgrade to Pro', 'memberglut'); ?></a>
                                <?php esc_html_e('for unlimited plans.', 'memberglut'); ?>
                            </p>
                        </div>
                    <?php endif; ?>

                    <form id="memberglut-create-plan-form" class="memberglut-form <?php echo $plan_limit_reached ? 'disabled' : ''; ?>">
                        <table class="form-table">
                            <tr>
                                <th scope="row">
                                    <label for="plan_name"><?php esc_html_e('Plan Name', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="text" id="plan_name" name="plan_name" class="regular-text" required <?php echo $plan_limit_reached ? 'disabled' : ''; ?>>
                                    <p class="description"><?php esc_html_e('Display name for the plan (e.g., "Gold Plan")', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="plan_slug"><?php esc_html_e('Plan Slug', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="text" id="plan_slug" name="plan_slug" class="regular-text" <?php echo $plan_limit_reached ? 'disabled' : ''; ?>>
                                    <p class="description"><?php esc_html_e('Unique identifier (e.g., "gold_plan"). Leave blank to auto-generate.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="plan_description"><?php esc_html_e('Description', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <textarea id="plan_description" name="plan_description" class="large-text" rows="3" <?php echo $plan_limit_reached ? 'disabled' : ''; ?>></textarea>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="plan_price"><?php esc_html_e('Price', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="number" id="plan_price" name="plan_price" class="small-text" step="0.01" min="0" value="0" <?php echo $plan_limit_reached ? 'disabled' : ''; ?>>
                                    <p class="description"><?php esc_html_e('Enter 0 for free plans.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="plan_billing_cycle"><?php esc_html_e('Billing Cycle', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <select id="plan_billing_cycle" name="plan_billing_cycle" <?php echo $plan_limit_reached ? 'disabled' : ''; ?>>
                                        <option value="lifetime"><?php esc_html_e('Lifetime (One-time)', 'memberglut'); ?></option>
                                        <option value="daily"><?php esc_html_e('Daily', 'memberglut'); ?></option>
                                        <option value="weekly"><?php esc_html_e('Weekly', 'memberglut'); ?></option>
                                        <option value="monthly"><?php esc_html_e('Monthly', 'memberglut'); ?></option>
                                        <option value="quarterly"><?php esc_html_e('Quarterly', 'memberglut'); ?></option>
                                        <option value="yearly"><?php esc_html_e('Yearly', 'memberglut'); ?></option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="plan_duration"><?php esc_html_e('Duration (days)', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="number" id="plan_duration" name="plan_duration" class="small-text" min="0" value="0" <?php echo $plan_limit_reached ? 'disabled' : ''; ?>>
                                    <p class="description"><?php esc_html_e('Number of days the plan is valid. Enter 0 for lifetime plans.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="plan_trial_days"><?php esc_html_e('Trial Days', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="number" id="plan_trial_days" name="plan_trial_days" class="small-text" min="0" value="0" <?php echo $plan_limit_reached ? 'disabled' : ''; ?>>
                                    <p class="description"><?php esc_html_e('Number of free trial days. Enter 0 for no trial.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="plan_color"><?php esc_html_e('Plan Color', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="color" id="plan_color" name="plan_color" value="#2271b1" <?php echo $plan_limit_reached ? 'disabled' : ''; ?>>
                                    <p class="description"><?php esc_html_e('Color for plan badges and cards.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="plan_icon"><?php esc_html_e('Plan Icon', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <select id="plan_icon" name="plan_icon" <?php echo $plan_limit_reached ? 'disabled' : ''; ?>>
                                        <option value="dashicons-admin-users"><?php esc_html_e('Users', 'memberglut'); ?></option>
                                        <option value="dashicons-star-filled"><?php esc_html_e('Star', 'memberglut'); ?></option>
                                        <option value="dashicons-awards"><?php esc_html_e('Awards', 'memberglut'); ?></option>
                                        <option value="dashicons-heart"><?php esc_html_e('Heart', 'memberglut'); ?></option>
                                        <option value="dashicons-tickets-alt"><?php esc_html_e('Tickets', 'memberglut'); ?></option>
                                        <option value="dashicons-cart"><?php esc_html_e('Shopping Cart', 'memberglut'); ?></option>
                                        <option value="dashicons-tag"><?php esc_html_e('Tag', 'memberglut'); ?></option>
                                        <option value="dashicons-money-alt"><?php esc_html_e('Money', 'memberglut'); ?></option>
                                        <option value="dashicons-smiley"><?php esc_html_e('Smiley', 'memberglut'); ?></option>
                                        <option value="dashicons-thumbs-up"><?php esc_html_e('Thumbs Up', 'memberglut'); ?></option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="plan_order"><?php esc_html_e('Display Order', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="number" id="plan_order" name="plan_order" class="small-text" min="0" value="0" <?php echo $plan_limit_reached ? 'disabled' : ''; ?>>
                                    <p class="description"><?php esc_html_e('Lower numbers appear first.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="plan_status"><?php esc_html_e('Status', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <label>
                                        <input type="checkbox" name="plan_status" value="active" checked <?php echo $plan_limit_reached ? 'disabled' : ''; ?>>
                                        <?php esc_html_e('Active', 'memberglut'); ?>
                                    </label>
                                    <p class="description"><?php esc_html_e('Uncheck to hide this plan from new members.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                        </table>

                        <p class="submit">
                            <button type="submit" class="button button-primary" <?php echo $plan_limit_reached ? 'disabled' : ''; ?>>
                                <?php echo $plan_limit_reached ? esc_html__('Limit Reached', 'memberglut') : esc_html__('Create Plan', 'memberglut'); ?>
                            </button>
                        </p>
                    </form>
                </div>

                <!-- Existing Plans -->
                <div class="memberglut-card">
                    <h2><?php esc_html_e('Existing Plans', 'memberglut'); ?></h2>

                    <div class="memberglut-plans-grid">
                        <?php foreach ($plans as $plan): ?>
                            <?php
                            $stats = $db->get_plan_stats($plan['id']);
                            $features = $db->get_plan_features($plan['id']);
                            ?>
                            <div class="memberglut-plan-card" style="border-left-color: <?php echo esc_attr($plan['plan_color']); ?>;">
                                <div class="plan-header">
                                    <div class="plan-icon">
                                        <span class="dashicons <?php echo esc_attr($plan['plan_icon']); ?>" style="color: <?php echo esc_attr($plan['plan_color']); ?>;"></span>
                                    </div>
                                    <div class="plan-title">
                                        <h3><?php echo esc_html($plan['plan_name']); ?></h3>
                                        <span class="plan-slug"><?php echo esc_html($plan['plan_slug']); ?></span>
                                    </div>
                                    <div class="plan-status <?php echo $plan['plan_status'] === 'active' ? 'active' : 'inactive'; ?>">
                                        <?php echo esc_html(ucfirst($plan['plan_status'])); ?>
                                    </div>
                                </div>

                                <div class="plan-description">
                                    <?php echo esc_html($plan['plan_description']); ?>
                                </div>

                                <div class="plan-price">
                                    <?php if ($plan['plan_price'] > 0): ?>
                                        <span class="price-amount"><?php echo number_format($plan['plan_price'], 2); ?></span>
                                        <?php if ($plan['plan_billing_cycle'] === 'lifetime'): ?>
                                            <span class="price-cycle"><?php esc_html_e('one-time', 'memberglut'); ?></span>
                                        <?php else: ?>
                                            <span class="price-cycle">/<?php echo esc_html($plan['plan_billing_cycle']); ?></span>
                                        <?php endif; ?>
                                    <?php else: ?>
                                        <span class="price-free"><?php esc_html_e('Free', 'memberglut'); ?></span>
                                    <?php endif; ?>
                                </div>

                                <?php if (!empty($features)): ?>
                                    <div class="plan-features">
                                        <ul>
                                            <?php foreach ($features as $feature): ?>
                                                <li>
                                                    <span class="dashicons <?php echo esc_attr($feature['feature_icon']); ?>"></span>
                                                    <?php echo esc_html($feature['feature_name']); ?>
                                                </li>
                                            <?php endforeach; ?>
                                        </ul>
                                    </div>
                                <?php endif; ?>

                                <div class="plan-stats">
                                    <span class="stat-item">
                                        <strong><?php echo number_format($stats['total']); ?></strong>
                                        <?php esc_html_e('Total Members', 'memberglut'); ?>
                                    </span>
                                    <span class="stat-item">
                                        <strong><?php echo number_format($stats['active']); ?></strong>
                                        <?php esc_html_e('Active', 'memberglut'); ?>
                                    </span>
                                </div>

                                <div class="plan-actions">
                                    <button class="button button-small edit-plan" data-plan="<?php echo esc_attr($plan['id']); ?>">
                                        <?php esc_html_e('Edit', 'memberglut'); ?>
                                    </button>
                                    <button class="button button-small manage-features" data-plan="<?php echo esc_attr($plan['id']); ?>" data-plan-name="<?php echo esc_attr($plan['plan_name']); ?>">
                                        <?php esc_html_e('Features', 'memberglut'); ?>
                                    </button>
                                    <button class="button button-small button-link-delete delete-plan" data-plan="<?php echo esc_attr($plan['id']); ?>">
                                        <?php esc_html_e('Delete', 'memberglut'); ?>
                                    </button>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Plan Modal -->
        <div id="memberglut-edit-plan-modal" class="memberglut-modal" style="display: none;">
            <div class="memberglut-modal-content">
                <div class="memberglut-modal-header">
                    <h2><?php esc_html_e('Edit Plan', 'memberglut'); ?></h2>
                    <button class="memberglut-modal-close">&times;</button>
                </div>
                <form id="memberglut-edit-plan-form">
                    <input type="hidden" id="edit_plan_id" name="plan_id">
                    <table class="form-table">
                        <tr>
                            <th scope="row">
                                <label for="edit_plan_name"><?php esc_html_e('Plan Name', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <input type="text" id="edit_plan_name" name="plan_name" class="regular-text" required>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="edit_plan_description"><?php esc_html_e('Description', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <textarea id="edit_plan_description" name="plan_description" class="large-text" rows="3"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="edit_plan_price"><?php esc_html_e('Price', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <input type="number" id="edit_plan_price" name="plan_price" class="small-text" step="0.01" min="0" value="0">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="edit_plan_billing_cycle"><?php esc_html_e('Billing Cycle', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <select id="edit_plan_billing_cycle" name="plan_billing_cycle">
                                    <option value="lifetime"><?php esc_html_e('Lifetime (One-time)', 'memberglut'); ?></option>
                                    <option value="daily"><?php esc_html_e('Daily', 'memberglut'); ?></option>
                                    <option value="weekly"><?php esc_html_e('Weekly', 'memberglut'); ?></option>
                                    <option value="monthly"><?php esc_html_e('Monthly', 'memberglut'); ?></option>
                                    <option value="quarterly"><?php esc_html_e('Quarterly', 'memberglut'); ?></option>
                                    <option value="yearly"><?php esc_html_e('Yearly', 'memberglut'); ?></option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="edit_plan_duration"><?php esc_html_e('Duration (days)', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <input type="number" id="edit_plan_duration" name="plan_duration" class="small-text" min="0" value="0">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="edit_plan_trial_days"><?php esc_html_e('Trial Days', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <input type="number" id="edit_plan_trial_days" name="plan_trial_days" class="small-text" min="0" value="0">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="edit_plan_color"><?php esc_html_e('Plan Color', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <input type="color" id="edit_plan_color" name="plan_color" value="#2271b1">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="edit_plan_icon"><?php esc_html_e('Plan Icon', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <select id="edit_plan_icon" name="plan_icon">
                                    <option value="dashicons-admin-users"><?php esc_html_e('Users', 'memberglut'); ?></option>
                                    <option value="dashicons-star-filled"><?php esc_html_e('Star', 'memberglut'); ?></option>
                                    <option value="dashicons-awards"><?php esc_html_e('Awards', 'memberglut'); ?></option>
                                    <option value="dashicons-heart"><?php esc_html_e('Heart', 'memberglut'); ?></option>
                                    <option value="dashicons-tickets-alt"><?php esc_html_e('Tickets', 'memberglut'); ?></option>
                                    <option value="dashicons-cart"><?php esc_html_e('Shopping Cart', 'memberglut'); ?></option>
                                    <option value="dashicons-tag"><?php esc_html_e('Tag', 'memberglut'); ?></option>
                                    <option value="dashicons-money-alt"><?php esc_html_e('Money', 'memberglut'); ?></option>
                                    <option value="dashicons-smiley"><?php esc_html_e('Smiley', 'memberglut'); ?></option>
                                    <option value="dashicons-thumbs-up"><?php esc_html_e('Thumbs Up', 'memberglut'); ?></option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="edit_plan_order"><?php esc_html_e('Display Order', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <input type="number" id="edit_plan_order" name="plan_order" class="small-text" min="0" value="0">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="edit_plan_status"><?php esc_html_e('Status', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <label>
                                    <input type="checkbox" name="plan_status" value="active">
                                    <?php esc_html_e('Active', 'memberglut'); ?>
                                </label>
                            </td>
                        </tr>
                    </table>
                    <p class="submit">
                        <button type="submit" class="button button-primary">
                            <?php esc_html_e('Update Plan', 'memberglut'); ?>
                        </button>
                        <button type="button" class="button memberglut-modal-close">
                            <?php esc_html_e('Cancel', 'memberglut'); ?>
                        </button>
                    </p>
                </form>
            </div>
        </div>

        <!-- Manage Features Modal -->
        <div id="memberglut-features-modal" class="memberglut-modal" style="display: none;">
            <div class="memberglut-modal-content">
                <div class="memberglut-modal-header">
                    <h2><?php esc_html_e('Manage Plan Features', 'memberglut'); ?></h2>
                    <button class="memberglut-modal-close">&times;</button>
                </div>
                <div class="memberglut-modal-body">
                    <input type="hidden" id="features_plan_id">

                    <!-- Add Feature Form -->
                    <div class="memberglut-add-feature-form">
                        <h3><?php esc_html_e('Add New Feature', 'memberglut'); ?></h3>
                        <table class="form-table">
                            <tr>
                                <th scope="row">
                                    <label for="feature_name"><?php esc_html_e('Feature Name', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="text" id="feature_name" name="feature_name" class="regular-text" required>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="feature_icon"><?php esc_html_e('Icon', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <select id="feature_icon" name="feature_icon">
                                        <option value="dashicons-yes"><?php esc_html_e('Checkmark', 'memberglut'); ?></option>
                                        <option value="dashicons-star-filled"><?php esc_html_e('Star', 'memberglut'); ?></option>
                                        <option value="dashicons-awards"><?php esc_html_e('Awards', 'memberglut'); ?></option>
                                        <option value="dashicons-lock-open"><?php esc_html_e('Unlock', 'memberglut'); ?></option>
                                        <option value="dashicons-download"><?php esc_html_e('Download', 'memberglut'); ?></option>
                                        <option value="dashicons-email"><?php esc_html_e('Email', 'memberglut'); ?></option>
                                        <option value="dashicons-groups"><?php esc_html_e('Groups', 'memberglut'); ?></option>
                                        <option value="dashicons-sos"><?php esc_html_e('Support', 'memberglut'); ?></option>
                                        <option value="dashicons-businessperson"><?php esc_html_e('Consulting', 'memberglut'); ?></option>
                                        <option value="dashicons-calendar-alt"><?php esc_html_e('Events', 'memberglut'); ?></option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                        <p>
                            <button type="button" id="add-feature-btn" class="button button-primary">
                                <?php esc_html_e('Add Feature', 'memberglut'); ?>
                            </button>
                        </p>
                    </div>

                    <!-- Existing Features List -->
                    <div class="memberglut-features-list">
                        <h3><?php esc_html_e('Existing Features', 'memberglut'); ?></h3>
                        <div id="features-container"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Assign Plan to User Modal -->
        <div id="memberglut-assign-plan-modal" class="memberglut-modal" style="display: none;">
            <div class="memberglut-modal-content">
                <div class="memberglut-modal-header">
                    <h2><?php esc_html_e('Assign Plan to User', 'memberglut'); ?></h2>
                    <button class="memberglut-modal-close">&times;</button>
                </div>
                <form id="memberglut-assign-plan-form">
                    <input type="hidden" id="assign_plan_id" name="plan_id">
                    <table class="form-table">
                        <tr>
                            <th scope="row">
                                <label for="assign_user_id"><?php esc_html_e('User', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <select id="assign_user_id" name="user_id" class="regular-text" required>
                                    <option value=""><?php esc_html_e('Select a user...', 'memberglut'); ?></option>
                                    <?php
                                    $users = get_users(array('number' => 100));
                                    foreach ($users as $user):
                                    ?>
                                        <option value="<?php echo esc_attr($user->ID); ?>">
                                            <?php echo esc_html($user->display_name . ' (' . $user->user_email . ')'); ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="assign_duration"><?php esc_html_e('Duration (days)', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <input type="number" id="assign_duration" name="duration" class="small-text" min="0" value="0">
                                <p class="description"><?php esc_html_e('Override default duration. 0 = use plan default.', 'memberglut'); ?></p>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label for="assign_status"><?php esc_html_e('Status', 'memberglut'); ?></label>
                            </th>
                            <td>
                                <select id="assign_status" name="status">
                                    <option value="active"><?php esc_html_e('Active', 'memberglut'); ?></option>
                                    <option value="pending"><?php esc_html_e('Pending', 'memberglut'); ?></option>
                                    <option value="cancelled"><?php esc_html_e('Cancelled', 'memberglut'); ?></option>
                                    <option value="expired"><?php esc_html_e('Expired', 'memberglut'); ?></option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <p class="submit">
                        <button type="submit" class="button button-primary">
                            <?php esc_html_e('Assign Plan', 'memberglut'); ?>
                        </button>
                        <button type="button" class="button memberglut-modal-close">
                            <?php esc_html_e('Cancel', 'memberglut'); ?>
                        </button>
                    </p>
                </form>
            </div>
        </div>

        <?php
    }

    /**
     * Settings page
     */
    public function settings_page() {
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- settings-updated is a WordPress core parameter, nonce is verified by settings_fields() below.
        if (isset($_GET['settings-updated'])) {
            echo '<div class="notice notice-success"><p>' . esc_html__('Settings saved successfully!', 'memberglut') . '</p></div>';
        }
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('MemberGlut Settings', 'memberglut'); ?></h1>
            
            <form method="post" action="options.php">
                <?php
                settings_fields('memberglut_settings');
                do_settings_sections('memberglut_settings');
                ?>
                
                <div class="memberglut-settings-page">
                    <div class="memberglut-card">
                        <h2><?php esc_html_e('General Settings', 'memberglut'); ?></h2>
                        <table class="form-table">
                            <tr>
                                <th scope="row">
                                    <label for="memberglut_default_role"><?php esc_html_e('Default Member Role', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <select id="memberglut_default_role" name="memberglut_default_role">
                                        <option value="subscriber"><?php esc_html_e('Subscriber (No Membership)', 'memberglut'); ?></option>
                                        <?php
                                        $roles_manager = MemberGlut_Roles::get_instance();
                                        $memberglut_roles = $roles_manager->get_memberglut_roles();
                                        $current_default = get_option('memberglut_default_role', 'memberglut_basic');
                                        
                                        foreach ($memberglut_roles as $role_slug => $role_data):
                                        ?>
                                            <option value="<?php echo esc_attr($role_slug); ?>" <?php selected($current_default, $role_slug); ?>>
                                                <?php echo esc_html($role_data['name']); ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                    <p class="description"><?php esc_html_e('Role assigned to new users upon registration.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="memberglut_enable_content_restriction"><?php esc_html_e('Content Restriction', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <label>
                                        <input type="checkbox" id="memberglut_enable_content_restriction" name="memberglut_enable_content_restriction" value="1" 
                                               <?php checked(get_option('memberglut_enable_content_restriction', true)); ?>>
                                        <?php esc_html_e('Enable content restriction features', 'memberglut'); ?>
                                    </label>
                                    <p class="description"><?php esc_html_e('Allow restricting content based on member roles.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="memberglut_restriction_message"><?php esc_html_e('Default Restriction Message', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <textarea id="memberglut_restriction_message" name="memberglut_restriction_message" class="large-text" rows="3"><?php echo esc_textarea(get_option('memberglut_restriction_message', __('This content is restricted to members only.', 'memberglut'))); ?></textarea>
                                    <p class="description"><?php esc_html_e('Message shown when content is restricted.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="memberglut-card">
                        <h2><?php esc_html_e('Custom Login & Registration', 'memberglut'); ?></h2>
                        <div style="margin-bottom: 20px;">
                            <button type="button" id="memberglut-show-docs" class="button button-secondary">
                                📚 <?php esc_html_e('View Shortcode Documentation', 'memberglut'); ?>
                            </button>
                        </div>
                        <table class="form-table">
                            <tr>
                                <th scope="row">
                                    <label for="memberglut_override_wp_login"><?php esc_html_e('Override WordPress Login', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <label>
                                        <input type="checkbox" id="memberglut_override_wp_login" name="memberglut_override_wp_login" value="1" 
                                               <?php checked(get_option('memberglut_override_wp_login', false)); ?>>
                                        <?php esc_html_e('Replace WordPress default login system with custom forms', 'memberglut'); ?>
                                    </label>
                                    <p class="description"><?php esc_html_e('Redirects wp-login.php to your custom login page and customizes all login URLs.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="memberglut_whole_site_login_control"><?php esc_html_e('Whole Site Login Control', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <label>
                                        <input type="checkbox" id="memberglut_whole_site_login_control" name="memberglut_whole_site_login_control" value="1" 
                                               <?php checked(get_option('memberglut_whole_site_login_control', false)); ?>>
                                        <?php esc_html_e('Restrict entire site to logged-in users only', 'memberglut'); ?>
                                    </label>
                                    <p class="description"><?php esc_html_e('Redirects all non-logged-in visitors to the login page. Admin pages and login/register forms are excluded.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr id="memberglut_whole_site_allowed_pages_row" style="display: <?php echo get_option('memberglut_whole_site_login_control', false) ? 'table-row' : 'none'; ?>;">
                                <th scope="row">
                                    <label for="memberglut_whole_site_allowed_pages"><?php esc_html_e('Allowed Public Pages', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <textarea id="memberglut_whole_site_allowed_pages" name="memberglut_whole_site_allowed_pages" class="large-text" rows="3" placeholder="<?php esc_attr_e('/login\n/register\n/privacy-policy', 'memberglut'); ?>"><?php echo esc_textarea(get_option('memberglut_whole_site_allowed_pages', "/login\n/register\n/privacy-policy")); ?></textarea>
                                    <p class="description"><?php esc_html_e('Enter URLs (one per line) that should remain accessible to non-logged-in users. Relative paths like "/contact" or full URLs.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="memberglut_custom_login_url"><?php esc_html_e('Custom Login Page URL', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="text" id="memberglut_custom_login_url" name="memberglut_custom_login_url" class="regular-text" 
                                           value="<?php echo esc_attr(get_option('memberglut_custom_login_url', '')); ?>" 
                                           placeholder="/login">
                                    <p class="description"><?php esc_html_e('Relative URL path for your custom login page (e.g., /login). Make sure to add the [memberglut_login_form] shortcode to this page.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="memberglut_custom_register_url"><?php esc_html_e('Custom Registration Page URL', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="text" id="memberglut_custom_register_url" name="memberglut_custom_register_url" class="regular-text" 
                                           value="<?php echo esc_attr(get_option('memberglut_custom_register_url', '')); ?>" 
                                           placeholder="/register">
                                    <p class="description"><?php esc_html_e('Relative URL path for your custom registration page (e.g., /register). Make sure to add the [memberglut_register_form] shortcode to this page.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="memberglut_custom_lostpassword_url"><?php esc_html_e('Custom Lost Password Page URL', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="text" id="memberglut_custom_lostpassword_url" name="memberglut_custom_lostpassword_url" class="regular-text" 
                                           value="<?php echo esc_attr(get_option('memberglut_custom_lostpassword_url', '')); ?>" 
                                           placeholder="/lost-password">
                                    <p class="description"><?php esc_html_e('Relative URL path for your custom lost password page (e.g., /lost-password).', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="memberglut_hide_admin_bar"><?php esc_html_e('Hide Admin Bar', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <label>
                                        <input type="checkbox" id="memberglut_hide_admin_bar" name="memberglut_hide_admin_bar" value="1" 
                                               <?php checked(get_option('memberglut_hide_admin_bar', false)); ?>>
                                        <?php esc_html_e('Hide admin bar for non-admin users', 'memberglut'); ?>
                                    </label>
                                    <p class="description"><?php esc_html_e('Only users with "manage_options" capability will see the admin bar.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="memberglut_auto_login_after_register"><?php esc_html_e('Auto-login After Registration', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <label>
                                        <input type="checkbox" id="memberglut_auto_login_after_register" name="memberglut_auto_login_after_register" value="1" 
                                               <?php checked(get_option('memberglut_auto_login_after_register', true)); ?>>
                                        <?php esc_html_e('Automatically log in users after successful registration', 'memberglut'); ?>
                                    </label>
                                    <p class="description"><?php esc_html_e('Users will be logged in immediately after registering without needing to verify email.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="memberglut-card">
                        <h2><?php esc_html_e('Redirect Settings', 'memberglut'); ?></h2>
                        <table class="form-table">
                            <tr>
                                <th scope="row">
                                    <label for="memberglut_login_redirect"><?php esc_html_e('Login Redirect URL', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="url" id="memberglut_login_redirect" name="memberglut_login_redirect" class="regular-text" 
                                           value="<?php echo esc_url(get_option('memberglut_login_redirect', '')); ?>">
                                    <p class="description"><?php esc_html_e('Redirect users here after login (leave blank for default).', 'memberglut'); ?></p>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <label for="memberglut_logout_redirect_url"><?php esc_html_e('Logout Redirect URL', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <input type="url" id="memberglut_logout_redirect_url" name="memberglut_logout_redirect_url" class="regular-text" 
                                           value="<?php echo esc_url(get_option('memberglut_logout_redirect_url', '')); ?>">
                                    <p class="description"><?php esc_html_e('Redirect users here after logout (leave blank for default).', 'memberglut'); ?></p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="memberglut-card">
                        <h2><?php esc_html_e('Advanced Settings', 'memberglut'); ?></h2>
                        <table class="form-table">
                            <tr>
                                <th scope="row">
                                    <label for="memberglut_remove_data_on_uninstall"><?php esc_html_e('Remove Data on Uninstall', 'memberglut'); ?></label>
                                </th>
                                <td>
                                    <label>
                                        <input type="checkbox" id="memberglut_remove_data_on_uninstall" name="memberglut_remove_data_on_uninstall" value="1" 
                                               <?php checked(get_option('memberglut_remove_data_on_uninstall', false)); ?>>
                                        <?php esc_html_e('Remove all plugin data when uninstalling', 'memberglut'); ?>
                                    </label>
                                    <p class="description"><?php esc_html_e('Warning: This will permanently delete all roles, memberships, and settings.', 'memberglut'); ?></p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <?php submit_button(); ?>
            </form>
        </div>

        <!-- Documentation Modal -->
        <div id="memberglut-docs-modal" class="memberglut-modal" style="display: none;">
            <div class="memberglut-modal-content" style="max-width: 800px;">
                <div class="memberglut-modal-header">
                    <h2>📚 <?php esc_html_e('Login & Register Shortcode Documentation', 'memberglut'); ?></h2>
                    <button class="memberglut-modal-close">&times;</button>
                </div>
                <div class="memberglut-modal-body" style="padding: 20px;">
                    <div class="memberglut-docs-tabs">
                        <button class="memberglut-docs-tab active" data-tab="login"><?php esc_html_e('Login Form', 'memberglut'); ?></button>
                        <button class="memberglut-docs-tab" data-tab="register"><?php esc_html_e('Register Form', 'memberglut'); ?></button>
                        <button class="memberglut-docs-tab" data-tab="examples"><?php esc_html_e('Examples', 'memberglut'); ?></button>
                    </div>

                    <div id="login-tab" class="memberglut-docs-content active">
                        <h3><?php esc_html_e('Login Form Shortcode', 'memberglut'); ?></h3>
                        <p><?php esc_html_e('Use the <code>[memberglut_login_form]</code> shortcode to display a login form anywhere on your site.', 'memberglut'); ?></p>
                        
                        <h4><?php esc_html_e('Complete Shortcode with All Parameters:', 'memberglut'); ?></h4>
                        <div class="memberglut-code-block">
                            <pre><code>[memberglut_login_form 
    redirect="https://example.com/dashboard"
    register_url="/register"
    lost_password_url="/forgot-password"
    show_register_link="true"
    show_lost_password_link="true"
    show_remember_me="true"
    show_title="true"
    title="Welcome Back"
    button_text="Sign In Now"
    username_label="Username or Email"
    password_label="Your Password"
    remember_label="Keep me logged in"
    register_text="Don't have an account? Sign up here"
    lost_password_text="Forgot your password?"
    form_style="compact"
    button_style="primary"
    width="400px"
    ajax="true"
    placeholder="false"]</code></pre>
                        </div>

                        <h4><?php esc_html_e('Parameter Reference:', 'memberglut'); ?></h4>
                        <table class="wp-list-table widefat fixed striped">
                            <thead>
                                <tr>
                                    <th><?php esc_html_e('Parameter', 'memberglut'); ?></th>
                                    <th><?php esc_html_e('Description', 'memberglut'); ?></th>
                                    <th><?php esc_html_e('Default', 'memberglut'); ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><code>redirect</code></td><td><?php esc_html_e('Where to redirect after login', 'memberglut'); ?></td><td><?php esc_html_e('Current page', 'memberglut'); ?></td></tr>
                                <tr><td><code>show_register_link</code></td><td><?php esc_html_e('Show registration link', 'memberglut'); ?></td><td>true</td></tr>
                                <tr><td><code>show_lost_password_link</code></td><td><?php esc_html_e('Show lost password link', 'memberglut'); ?></td><td>true</td></tr>
                                <tr><td><code>show_remember_me</code></td><td><?php esc_html_e('Show remember me checkbox', 'memberglut'); ?></td><td>true</td></tr>
                                <tr><td><code>show_title</code></td><td><?php esc_html_e('Show form title', 'memberglut'); ?></td><td>true</td></tr>
                                <tr><td><code>title</code></td><td><?php esc_html_e('Form title text', 'memberglut'); ?></td><td>Login</td></tr>
                                <tr><td><code>form_style</code></td><td><?php esc_html_e('Form design', 'memberglut'); ?></td><td>default (compact/minimal)</td></tr>
                                <tr><td><code>width</code></td><td><?php esc_html_e('Maximum form width', 'memberglut'); ?></td><td><?php esc_html_e('Auto', 'memberglut'); ?></td></tr>
                                <tr><td><code>ajax</code></td><td><?php esc_html_e('Enable AJAX submission', 'memberglut'); ?></td><td>true</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="register-tab" class="memberglut-docs-content" style="display: none;">
                        <h3><?php esc_html_e('Register Form Shortcode', 'memberglut'); ?></h3>
                        <p><?php esc_html_e('Use the <code>[memberglut_register_form]</code> shortcode to display a registration form.', 'memberglut'); ?></p>
                        
                        <h4><?php esc_html_e('Basic Usage:', 'memberglut'); ?></h4>
                        <div class="memberglut-code-block">
                            <pre><code>[memberglut_register_form]</code></pre>
                        </div>

                        <h4><?php esc_html_e('With Parameters:', 'memberglut'); ?></h4>
                        <div class="memberglut-code-block">
                            <pre><code>[memberglut_register_form 
    redirect="https://example.com/welcome"
    show_login_link="true"
    title="Join Our Community"
    button_text="Create Account"
    default_role="memberglut_basic"]</code></pre>
                        </div>

                        <h4><?php esc_html_e('Available Parameters:', 'memberglut'); ?></h4>
                        <table class="wp-list-table widefat fixed striped">
                            <thead>
                                <tr>
                                    <th><?php esc_html_e('Parameter', 'memberglut'); ?></th>
                                    <th><?php esc_html_e('Description', 'memberglut'); ?></th>
                                    <th><?php esc_html_e('Default', 'memberglut'); ?></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td><code>redirect</code></td><td><?php esc_html_e('Where to redirect after registration', 'memberglut'); ?></td><td><?php esc_html_e('Current page', 'memberglut'); ?></td></tr>
                                <tr><td><code>show_login_link</code></td><td><?php esc_html_e('Show login link', 'memberglut'); ?></td><td>true</td></tr>
                                <tr><td><code>title</code></td><td><?php esc_html_e('Form title text', 'memberglut'); ?></td><td>Register</td></tr>
                                <tr><td><code>button_text</code></td><td><?php esc_html_e('Submit button text', 'memberglut'); ?></td><td>Register</td></tr>
                                <tr><td><code>default_role</code></td><td><?php esc_html_e('Role assigned to new users', 'memberglut'); ?></td><td>subscriber</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div id="examples-tab" class="memberglut-docs-content" style="display: none;">
                        <h3><?php esc_html_e('Common Usage Examples', 'memberglut'); ?></h3>
                        
                        <h4><?php esc_html_e('1. Simple Login Form', 'memberglut'); ?></h4>
                        <div class="memberglut-code-block">
                            <pre><code>[memberglut_login_form]</code></pre>
                        </div>

                        <h4><?php esc_html_e('2. Compact Professional Style', 'memberglut'); ?></h4>
                        <div class="memberglut-code-block">
                            <pre><code>[memberglut_login_form form_style="compact" width="350px" title="Sign In"]</code></pre>
                        </div>

                        <h4><?php esc_html_e('3. Minimal Modern Style', 'memberglut'); ?></h4>
                        <div class="memberglut-code-block">
                            <pre><code>[memberglut_login_form form_style="minimal" show_title="false" placeholder="true"]</code></pre>
                        </div>

                        <h4><?php esc_html_e('4. Custom Redirect After Login', 'memberglut'); ?></h4>
                        <div class="memberglut-code-block">
                            <pre><code>[memberglut_login_form redirect="https://yoursite.com/dashboard"]</code></pre>
                        </div>

                        <h4><?php esc_html_e('5. Hide Registration Link', 'memberglut'); ?></h4>
                        <div class="memberglut-code-block">
                            <pre><code>[memberglut_login_form show_register_link="false"]</code></pre>
                        </div>

                        <h4><?php esc_html_e('6. Custom Text Labels', 'memberglut'); ?></h4>
                        <div class="memberglut-code-block">
                            <pre><code>[memberglut_login_form 
    title="Member Login"
    username_label="Email Address"
    password_label="Your Password"
    button_text="Sign In"
    register_text="New member? Join us here"]</code></pre>
                        </div>

                        <h4><?php esc_html_e('7. Registration Form with Custom Role', 'memberglut'); ?></h4>
                        <div class="memberglut-code-block">
                            <pre><code>[memberglut_register_form 
    title="Become a Member"
    button_text="Join Now"
    default_role="memberglut_basic"
    redirect="/welcome"]</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
    
    /**
     * Pro features page
     */
    public function pro_page() {
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('MemberGlut Pro Features', 'memberglut'); ?></h1>
            
            <div class="memberglut-pro-page">
                <div class="memberglut-pro-hero">
                    <h2><?php esc_html_e('Unlock the Full Power of MemberGlut', 'memberglut'); ?></h2>
                    <p><?php esc_html_e('Upgrade to MemberGlut Pro and get access to powerful membership management features.', 'memberglut'); ?></p>
                </div>
                
                <div class="memberglut-comparison-table">
                    <table class="wp-list-table widefat fixed striped">
                        <thead>
                            <tr>
                                <th><?php esc_html_e('Feature', 'memberglut'); ?></th>
                                <th><?php esc_html_e('Free', 'memberglut'); ?></th>
                                <th><?php esc_html_e('Pro', 'memberglut'); ?></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><?php esc_html_e('Custom Member Roles', 'memberglut'); ?></td>
                                <td><span class="limited">3 <?php esc_html_e('Roles', 'memberglut'); ?></span></td>
                                <td><span class="unlimited">♾️ <?php esc_html_e('Unlimited', 'memberglut'); ?></span></td>
                            </tr>
                            <tr>
                                <td><?php esc_html_e('Member Management', 'memberglut'); ?></td>
                                <td><span class="limited">50 <?php esc_html_e('Members', 'memberglut'); ?></span></td>
                                <td><span class="unlimited">♾️ <?php esc_html_e('Unlimited', 'memberglut'); ?></span></td>
                            </tr>
                            <tr>
                                <td><?php esc_html_e('Content Restrictions', 'memberglut'); ?></td>
                                <td><span class="included">✅</span></td>
                                <td><span class="included">✅ <?php esc_html_e('Advanced', 'memberglut'); ?></span></td>
                            </tr>
                            <?php foreach (memberglut_get_pro_features() as $feature): ?>
                                <tr>
                                    <td><?php echo esc_html($feature); ?></td>
                                    <td><span class="not-included">❌</span></td>
                                    <td><span class="included">✅</span></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                
                <div class="memberglut-pro-cta">
                    <h3><?php esc_html_e('Ready to Upgrade?', 'memberglut'); ?></h3>
                    <p><?php esc_html_e('Get MemberGlut Pro today and take your membership site to the next level!', 'memberglut'); ?></p>
                    <a href="#" class="button button-primary button-hero" target="_blank">
                        <?php esc_html_e('Upgrade to Pro Now', 'memberglut'); ?>
                    </a>
                </div>
            </div>
        </div>
        <?php
    }
    
    /**
     * Extensions page
     */
    public function extensions_page() {
        $extensions = MemberGlut_Extensions::get_instance();
        $all_features = $extensions->get_registered_features();
        $free_features = $extensions->get_registered_features('free');
        $pro_features = $extensions->get_registered_features('pro');
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('MemberGlut Extensions', 'memberglut'); ?></h1>
            
            <div class="memberglut-extensions-page">
                <!-- Active Features -->
                <div class="memberglut-card">
                    <h2><?php esc_html_e('Active Features', 'memberglut'); ?></h2>
                    <div class="memberglut-extensions-grid">
                        <?php foreach ($free_features as $feature_id => $feature): ?>
                            <div class="memberglut-extension-card active-feature">
                                <span class="extension-status free"><?php esc_html_e('Free', 'memberglut'); ?></span>
                                <h3><?php echo esc_html($feature['name']); ?></h3>
                                <p><?php echo esc_html($feature['description']); ?></p>
                                <div class="extension-actions">
                                    <span class="dashicons dashicons-yes-alt" style="color: #00a32a;"></span>
                                    <span><?php esc_html_e('Active', 'memberglut'); ?></span>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                
                <!-- Pro Features -->
                <div class="memberglut-card">
                    <h2><?php esc_html_e('Pro Features', 'memberglut'); ?></h2>
                    
                    <?php if (!memberglut_is_pro_active()): ?>
                        <div class="memberglut-limitation-notice limit-reached">
                            <p>
                                <strong><?php esc_html_e('Unlock Premium Features!', 'memberglut'); ?></strong>
                                <?php esc_html_e('Upgrade to MemberGlut Pro to access these powerful features.', 'memberglut'); ?>
                                <a href="<?php echo esc_url($extensions->get_upgrade_url()); ?>" target="_blank"><?php esc_html_e('Upgrade Now', 'memberglut'); ?></a>
                            </p>
                        </div>
                    <?php endif; ?>
                    
                    <div class="memberglut-extensions-grid">
                        <?php foreach ($pro_features as $feature_id => $feature): ?>
                            <div class="memberglut-extension-card pro-feature">
                                <span class="extension-status pro"><?php esc_html_e('Pro', 'memberglut'); ?></span>
                                <h3><?php echo esc_html($feature['name']); ?></h3>
                                <p><?php echo esc_html($feature['description']); ?></p>
                                <div class="extension-actions">
                                    <?php if (memberglut_is_pro_active()): ?>
                                        <button class="button button-primary activate-feature" data-feature="<?php echo esc_attr($feature_id); ?>">
                                            <?php esc_html_e('Activate', 'memberglut'); ?>
                                        </button>
                                    <?php else: ?>
                                        <a href="<?php echo esc_url($extensions->get_upgrade_url($feature_id)); ?>" class="button button-secondary" target="_blank">
                                            <?php esc_html_e('Upgrade to Pro', 'memberglut'); ?>
                                        </a>
                                    <?php endif; ?>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
                
                <!-- Pro Benefits -->
                <?php if (!memberglut_is_pro_active()): ?>
                    <div class="memberglut-card">
                        <h2><?php esc_html_e('Why Upgrade to Pro?', 'memberglut'); ?></h2>
                        <div class="memberglut-pro-benefits-grid">
                            <div class="memberglut-pro-benefit">
                                <span class="dashicons dashicons-groups" style="font-size: 32px; color: #667eea;"></span>
                                <h3><?php esc_html_e('Unlimited Members', 'memberglut'); ?></h3>
                                <p><?php esc_html_e('Manage unlimited members with advanced bulk operations and import/export tools.', 'memberglut'); ?></p>
                            </div>
                            <div class="memberglut-pro-benefit">
                                <span class="dashicons dashicons-admin-settings" style="font-size: 32px; color: #667eea;"></span>
                                <h3><?php esc_html_e('Advanced Restrictions', 'memberglut'); ?></h3>
                                <p><?php esc_html_e('Time-based restrictions, IP-based access, and content dripping features.', 'memberglut'); ?></p>
                            </div>
                            <div class="memberglut-pro-benefit">
                                <span class="dashicons dashicons-email-alt" style="font-size: 32px; color: #667eea;"></span>
                                <h3><?php esc_html_e('Email Automation', 'memberglut'); ?></h3>
                                <p><?php esc_html_e('Automated welcome emails, expiration notices, and membership reminders.', 'memberglut'); ?></p>
                            </div>
                            <div class="memberglut-pro-benefit">
                                <span class="dashicons dashicons-chart-line" style="font-size: 32px; color: #667eea;"></span>
                                <h3><?php esc_html_e('Analytics & Reports', 'memberglut'); ?></h3>
                                <p><?php esc_html_e('Detailed insights into member activity, content access patterns, and more.', 'memberglut'); ?></p>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="<?php echo esc_url($extensions->get_upgrade_url()); ?>" class="button button-primary button-hero" target="_blank">
                                <?php esc_html_e('Upgrade to MemberGlut Pro', 'memberglut'); ?>
                            </a>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php
    }
    
    /**
     * Add content restriction meta box
     */
    public function add_content_restriction_meta_box() {
        $post_types = apply_filters('memberglut_restricted_post_types', array('post', 'page'));
        
        foreach ($post_types as $post_type) {
            add_meta_box(
                'memberglut_content_restriction',
                __('MemberGlut Access Control', 'memberglut'),
                array($this, 'content_restriction_meta_box'),
                $post_type,
                'side',
                'high'
            );
        }
    }
    
    /**
     * Content restriction meta box
     */
    public function content_restriction_meta_box($post) {
        wp_nonce_field('memberglut_save_restriction', 'memberglut_restriction_nonce');
        
        $required_roles = get_post_meta($post->ID, '_memberglut_required_roles', true);
        $custom_message = get_post_meta($post->ID, '_memberglut_restriction_message', true);
        
        $roles_manager = MemberGlut_Roles::get_instance();
        $memberglut_roles = $roles_manager->get_memberglut_roles();
        ?>
        <div class="memberglut-restriction-meta">
            <p><strong><?php esc_html_e('Restrict this content to:', 'memberglut'); ?></strong></p>
            
            <label>
                <input type="checkbox" name="memberglut_public_content" value="1" <?php checked(empty($required_roles)); ?>>
                <?php esc_html_e('Public (No Restrictions)', 'memberglut'); ?>
            </label><br><br>
            
            <?php if (!empty($memberglut_roles)): ?>
                <div class="memberglut-roles-list">
                    <?php foreach ($memberglut_roles as $role_slug => $role_data): ?>
                        <label>
                            <input type="checkbox" name="memberglut_required_roles[]" value="<?php echo esc_attr($role_slug); ?>" 
                                   <?php checked(is_array($required_roles) && in_array($role_slug, $required_roles)); ?>>
                            <?php echo esc_html($role_data['name']); ?>
                        </label><br>
                    <?php endforeach; ?>
                </div>
            <?php else: ?>
                <p><em><?php esc_html_e('No member roles created yet.', 'memberglut'); ?></em></p>
            <?php endif; ?>
            
            <p><strong><?php esc_html_e('Custom Restriction Message:', 'memberglut'); ?></strong></p>
            <textarea name="memberglut_restriction_message" class="widefat" rows="3" placeholder="<?php esc_attr_e('Leave blank to use default message', 'memberglut'); ?>"><?php echo esc_textarea($custom_message); ?></textarea>
        </div>
        <?php
    }
    
    /**
     * Save content restriction meta
     */
    public function save_content_restriction_meta($post_id) {
        // Verify nonce - sanitize before verification
        $nonce = isset($_POST['memberglut_restriction_nonce']) ? sanitize_text_field(wp_unslash($_POST['memberglut_restriction_nonce'])) : '';
        if (empty($nonce) || !wp_verify_nonce($nonce, 'memberglut_save_restriction')) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        // Save required roles
        if (isset($_POST['memberglut_public_content'])) {
            delete_post_meta($post_id, '_memberglut_required_roles');
        } else {
            $required_roles = isset($_POST['memberglut_required_roles'])
                ? array_map('sanitize_key', wp_unslash($_POST['memberglut_required_roles']))
                : array();
            update_post_meta($post_id, '_memberglut_required_roles', $required_roles);
        }

        // Save custom message
        $custom_message = isset($_POST['memberglut_restriction_message'])
            ? sanitize_textarea_field(wp_unslash($_POST['memberglut_restriction_message']))
            : '';
        if (!empty($custom_message)) {
            update_post_meta($post_id, '_memberglut_restriction_message', $custom_message);
        } else {
            delete_post_meta($post_id, '_memberglut_restriction_message');
        }
    }
    
    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('memberglut_settings', 'memberglut_default_role', array(
            'type' => 'string',
            'sanitize_callback' => array($this, 'sanitize_default_role_setting'),
        ));
        register_setting('memberglut_settings', 'memberglut_enable_content_restriction', array(
            'type' => 'boolean',
            'sanitize_callback' => 'rest_sanitize_boolean',
        ));
        register_setting('memberglut_settings', 'memberglut_restriction_message', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
        ));
        register_setting('memberglut_settings', 'memberglut_login_redirect', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
        ));
        register_setting('memberglut_settings', 'memberglut_logout_redirect_url', array(
            'type' => 'string',
            'sanitize_callback' => 'esc_url_raw',
        ));
        register_setting('memberglut_settings', 'memberglut_remove_data_on_uninstall', array(
            'type' => 'boolean',
            'sanitize_callback' => 'rest_sanitize_boolean',
        ));

        // Custom login system settings
        register_setting('memberglut_settings', 'memberglut_override_wp_login', array(
            'type' => 'boolean',
            'sanitize_callback' => 'rest_sanitize_boolean',
        ));
        register_setting('memberglut_settings', 'memberglut_custom_login_url', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_title',
        ));
        register_setting('memberglut_settings', 'memberglut_custom_register_url', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_title',
        ));
        register_setting('memberglut_settings', 'memberglut_custom_lostpassword_url', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_title',
        ));
        register_setting('memberglut_settings', 'memberglut_hide_admin_bar', array(
            'type' => 'boolean',
            'sanitize_callback' => 'rest_sanitize_boolean',
        ));
        register_setting('memberglut_settings', 'memberglut_auto_login_after_register', array(
            'type' => 'boolean',
            'sanitize_callback' => 'rest_sanitize_boolean',
        ));
        register_setting('memberglut_settings', 'memberglut_whole_site_login_control', array(
            'type' => 'boolean',
            'sanitize_callback' => 'rest_sanitize_boolean',
        ));
        register_setting('memberglut_settings', 'memberglut_whole_site_allowed_pages', array(
            'type' => 'string',
            'sanitize_callback' => 'sanitize_textarea_field',
        ));
    }

    /**
     * Sanitize default role setting - SECURITY: Only allow safe roles
     *
     * @param string $role The role to sanitize.
     * @return string The sanitized role (subscriber if invalid).
     */
    public function sanitize_default_role_setting($role) {
        $role = sanitize_key($role);

        // SECURITY: Only allow safe roles for registration
        // Never allow administrative roles like administrator, editor, author
        $allowed_registration_roles = array('subscriber', 'memberglut_basic', 'memberglut_premium', 'memberglut_vip');

        if (in_array($role, $allowed_registration_roles, true) && get_role($role)) {
            return $role;
        }

        // Return safest default if invalid
        return 'subscriber';
    }

    /**
     * Plugin action links
     */
    public function plugin_action_links($links) {
        $settings_link = '<a href="' . esc_url(admin_url('admin.php?page=memberglut-settings')) . '">' . esc_html__('Settings', 'memberglut') . '</a>';
        array_unshift($links, $settings_link);

        if (!memberglut_is_pro_active()) {
            $pro_link = '<a href="' . esc_url(admin_url('admin.php?page=memberglut-pro')) . '" style="color: #f18500; font-weight: bold;">' . esc_html__('Go Pro', 'memberglut') . '</a>';
            array_unshift($links, $pro_link);
        }
        
        return $links;
    }
    
    /**
     * Admin notices
     */
    public function admin_notices() {
        // Show welcome notice on first activation
        if (get_option('memberglut_show_welcome_notice', false)) {
            ?>
            <div class="notice notice-success is-dismissible">
                <p>
                    <strong><?php esc_html_e('Welcome to MemberGlut!', 'memberglut'); ?></strong> 
                    <?php esc_html_e('Thank you for installing MemberGlut. Get started by', 'memberglut'); ?> 
                    <a href="<?php echo esc_url(admin_url('admin.php?page=memberglut-roles')); ?>"><?php esc_html_e('creating your first member role', 'memberglut'); ?></a>.
                </p>
            </div>
            <?php
            delete_option('memberglut_show_welcome_notice');
        }
        
        // Show notice if whole site login control is temporarily disabled due to too many redirects
        $redirect_count = get_transient('memberglut_redirect_count');
        if ($redirect_count && $redirect_count > 10 && get_option('memberglut_whole_site_login_control', false)) {
            ?>
            <div class="notice notice-warning is-dismissible">
                <p>
                    <strong><?php esc_html_e('MemberGlut Notice:', 'memberglut'); ?></strong>
                    <?php esc_html_e('Whole site login control has been temporarily disabled due to potential redirect loops. This will automatically reset in 5 minutes, or you can ', 'memberglut'); ?>
                    <a href="<?php echo esc_url(admin_url('admin.php?page=memberglut-settings')); ?>"><?php esc_html_e('check your login page settings', 'memberglut'); ?></a>.
                </p>
            </div>
            <?php
        }
    }
    
    /**
     * Get dashboard stats
     */
    private function get_dashboard_stats() {
        global $wpdb;

        // Check cache first
        $cache_key = 'memberglut_dashboard_stats';
        $cached = wp_cache_get($cache_key, 'memberglut_stats');
        if (false !== $cached) {
            return $cached;
        }

        $roles_manager = MemberGlut_Roles::get_instance();
        $memberglut_roles = $roles_manager->get_memberglut_roles();

        // Count members
        $total_members = 0;
        foreach (array_keys($memberglut_roles) as $role) {
            $users = count_users();
            if (isset($users['avail_roles'][$role])) {
                $total_members += $users['avail_roles'][$role];
            }
        }

        // Count restricted content
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery -- No higher-level abstraction for aggregate meta queries.
        $restricted_content = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM {$wpdb->postmeta} WHERE meta_key = %s",
                '_memberglut_required_roles'
            )
        );

        // Count active memberships
        $memberships_table = $wpdb->prefix . 'memberglut_user_memberships';
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,PluginCheck.Security.DirectDB.UnescapedDBParameter -- Caching handled above, table name is trusted from $wpdb->prefix.
        $active_memberships = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM {$memberships_table} WHERE status = %s", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is trusted from $wpdb->prefix.
                'active'
            )
        );

        // Count membership plans
        $db = MemberGlut_DB::get_instance();
        $plans_table = $db->get_table_name('plans');
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,PluginCheck.Security.DirectDB.UnescapedDBParameter -- Table name is trusted from get_table_name().
        $total_plans = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM {$plans_table} WHERE plan_status = %s", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is trusted from get_table_name().
                'active'
            )
        );

        $result = array(
            'total_members' => $total_members,
            'total_roles' => count($memberglut_roles),
            'restricted_content' => intval($restricted_content),
            'active_memberships' => intval($active_memberships),
            'total_plans' => intval($total_plans),
        );

        // Cache for 5 minutes
        wp_cache_set($cache_key, $result, 'memberglut_stats', 300);

        return $result;
    }
    
    /**
     * Display recent activity
     */
    private function display_recent_activity() {
        global $wpdb;

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,PluginCheck.Security.DirectDB.UnescapedDBParameter -- Table name uses {$wpdb->prefix}, caching not needed for admin display.
        $recent_activities = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT um.*, u.display_name, u.user_email
                 FROM {$wpdb->prefix}memberglut_user_memberships AS um
                 INNER JOIN {$wpdb->users} AS u ON um.user_id = u.ID
                 ORDER BY um.created_at DESC
                 LIMIT %d",
                5
            )
        );

        if (empty($recent_activities)) {
            echo '<p>' . esc_html__('No recent activity.', 'memberglut') . '</p>';
            return;
        }

        echo '<ul class="memberglut-activity-list">';
        foreach ($recent_activities as $activity) {
            $role_name = ucwords(str_replace(array('memberglut_', '_'), array('', ' '), $activity->role_slug));
            $time_ago = human_time_diff(strtotime($activity->created_at), current_time('timestamp'));

            echo '<li>';
            echo '<strong>' . esc_html($activity->display_name) . '</strong> ';
            /* translators: %s: role name */
            echo sprintf(esc_html__('assigned to %s role', 'memberglut'), '<em>' . esc_html($role_name) . '</em>');
            /* translators: %s: time difference */
            echo '<br><small>' . sprintf(esc_html__('%s ago', 'memberglut'), esc_html($time_ago)) . '</small>';
            echo '</li>';
        }
        echo '</ul>';
    }
    
    /**
     * Get user membership info
     */
    private function get_user_membership_info($user_id) {
        global $wpdb;

        $memberships_table = $wpdb->prefix . 'memberglut_user_memberships';

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,PluginCheck.Security.DirectDB.UnescapedDBParameter -- Table name is trusted from $wpdb->prefix, single row lookup.
        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM {$memberships_table} WHERE user_id = %d AND status = %s ORDER BY created_at DESC LIMIT 1", // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is trusted from $wpdb->prefix.
                $user_id,
                'active'
            ),
            ARRAY_A
        );
    }
    
    
    /**
     * AJAX handler for getting role data
     */
    public function ajax_get_role_data() {
        // Verify nonce - sanitize before verification
        $nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';
        if (!wp_verify_nonce($nonce, 'memberglut_admin_nonce')) {
            wp_die(esc_html__('Security check failed', 'memberglut'));
        }

        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Insufficient permissions', 'memberglut'));
        }

        $role_slug = isset($_POST['role_slug']) ? sanitize_key(wp_unslash($_POST['role_slug'])) : '';
        
        if (empty($role_slug)) {
            wp_send_json_error(esc_html__('Role slug is required', 'memberglut'));
        }
        
        $roles_manager = MemberGlut_Roles::get_instance();
        $all_roles = $roles_manager->get_all_roles();
        $available_capabilities = $roles_manager->get_available_capabilities();
        
        if (isset($all_roles[$role_slug])) {
            $role_data = $all_roles[$role_slug];
            
            // Get description from custom roles table if it's a custom role
            $description = '';
            if (strpos($role_slug, 'memberglut_') === 0) {
                global $wpdb;
                $table_name = $wpdb->prefix . 'memberglut_custom_roles';
                // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,PluginCheck.Security.DirectDB.UnescapedDBParameter -- Single row lookup in AJAX, table name trusted.
                $custom_role = $wpdb->get_row(
                    $wpdb->prepare("SELECT role_description FROM {$table_name} WHERE role_slug = %s", $role_slug), // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Table name is trusted from $wpdb->prefix.
                    ARRAY_A
                );
                if ($custom_role) {
                    $description = $custom_role['role_description'];
                }
            }
            
            wp_send_json_success(array(
                'slug' => $role_slug,
                'name' => $role_data['name'],
                'description' => $description,
                'capabilities' => $role_data['capabilities'],
                'available_capabilities' => $available_capabilities
            ));
        } else {
            wp_send_json_error(esc_html__('Role not found', 'memberglut'));
        }
    }

    /**
     * AJAX: Create plan
     */
    public function ajax_create_plan() {
        // Verify nonce - sanitize before verification
        $nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';
        if (!wp_verify_nonce($nonce, 'memberglut_admin_nonce')) {
            wp_send_json_error(esc_html__('Security check failed', 'memberglut'));
        }

        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Insufficient permissions', 'memberglut'));
        }

        $db = MemberGlut_DB::get_instance();

        // Check plan limit for free version
        if (!memberglut_is_pro_active()) {
            $existing_plans = $db->get_plans();
            if (count($existing_plans) >= 3) {
                wp_send_json_error(esc_html__('Plan limit reached. Upgrade to Pro for unlimited plans.', 'memberglut'));
            }
        }

        // Sanitize and validate inputs
        $plan_data = array(
            'plan_name' => isset($_POST['plan_name']) ? sanitize_text_field(wp_unslash($_POST['plan_name'])) : '',
            'plan_slug' => isset($_POST['plan_slug']) ? sanitize_title(wp_unslash($_POST['plan_slug'])) : '',
            'plan_description' => isset($_POST['plan_description']) ? sanitize_textarea_field(wp_unslash($_POST['plan_description'])) : '',
            'plan_price' => isset($_POST['plan_price']) ? floatval($_POST['plan_price']) : 0,
            'plan_billing_cycle' => isset($_POST['plan_billing_cycle']) ? sanitize_key($_POST['plan_billing_cycle']) : '',
            'plan_duration' => isset($_POST['plan_duration']) ? intval($_POST['plan_duration']) : 0,
            'plan_trial_days' => isset($_POST['plan_trial_days']) ? intval($_POST['plan_trial_days']) : 0,
            'plan_color' => isset($_POST['plan_color']) ? sanitize_hex_color(wp_unslash($_POST['plan_color'])) : '',
            'plan_icon' => isset($_POST['plan_icon']) ? sanitize_key($_POST['plan_icon']) : '',
            'plan_order' => isset($_POST['plan_order']) ? intval($_POST['plan_order']) : 0,
            'plan_status' => isset($_POST['plan_status']) ? sanitize_key($_POST['plan_status']) : '',
        );

        $plan_id = $db->add_plan($plan_data);

        if ($plan_id) {
            wp_send_json_success(array('plan_id' => $plan_id));
        } else {
            wp_send_json_error(esc_html__('Failed to create plan.', 'memberglut'));
        }
    }

    /**
     * AJAX: Get plan
     */
    public function ajax_get_plan() {
        // Verify nonce - sanitize before verification
        $nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';
        if (!wp_verify_nonce($nonce, 'memberglut_admin_nonce')) {
            wp_send_json_error(esc_html__('Security check failed', 'memberglut'));
        }

        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Insufficient permissions', 'memberglut'));
        }

        $plan_id = isset($_POST['plan_id']) ? intval($_POST['plan_id']) : 0;
        $db = MemberGlut_DB::get_instance();
        $plan = $db->get_plan($plan_id);

        if ($plan) {
            wp_send_json_success($plan);
        } else {
            wp_send_json_error(esc_html__('Plan not found.', 'memberglut'));
        }
    }

    /**
     * AJAX: Update plan
     */
    public function ajax_update_plan() {
        // Verify nonce - sanitize before verification
        $nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';
        if (!wp_verify_nonce($nonce, 'memberglut_admin_nonce')) {
            wp_send_json_error(esc_html__('Security check failed', 'memberglut'));
        }

        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Insufficient permissions', 'memberglut'));
        }

        $plan_id = isset($_POST['plan_id']) ? intval($_POST['plan_id']) : 0;
        $db = MemberGlut_DB::get_instance();

        // Sanitize and validate inputs
        $plan_data = array(
            'plan_name' => isset($_POST['plan_name']) ? sanitize_text_field(wp_unslash($_POST['plan_name'])) : '',
            'plan_description' => isset($_POST['plan_description']) ? sanitize_textarea_field(wp_unslash($_POST['plan_description'])) : '',
            'plan_price' => isset($_POST['plan_price']) ? floatval($_POST['plan_price']) : 0,
            'plan_billing_cycle' => isset($_POST['plan_billing_cycle']) ? sanitize_key($_POST['plan_billing_cycle']) : '',
            'plan_duration' => isset($_POST['plan_duration']) ? intval($_POST['plan_duration']) : 0,
            'plan_trial_days' => isset($_POST['plan_trial_days']) ? intval($_POST['plan_trial_days']) : 0,
            'plan_color' => isset($_POST['plan_color']) ? sanitize_hex_color(wp_unslash($_POST['plan_color'])) : '',
            'plan_icon' => isset($_POST['plan_icon']) ? sanitize_key($_POST['plan_icon']) : '',
            'plan_order' => isset($_POST['plan_order']) ? intval($_POST['plan_order']) : 0,
            'plan_status' => isset($_POST['plan_status']) ? sanitize_key($_POST['plan_status']) : '',
        );

        $result = $db->update_plan($plan_id, $plan_data);

        if ($result !== false) {
            wp_send_json_success(array('plan_id' => $plan_id));
        } else {
            wp_send_json_error(esc_html__('Failed to update plan.', 'memberglut'));
        }
    }

    /**
     * AJAX: Delete plan
     */
    public function ajax_delete_plan() {
        // Verify nonce - sanitize before verification
        $nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';
        if (!wp_verify_nonce($nonce, 'memberglut_admin_nonce')) {
            wp_send_json_error(esc_html__('Security check failed', 'memberglut'));
        }

        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Insufficient permissions', 'memberglut'));
        }

        $plan_id = isset($_POST['plan_id']) ? intval($_POST['plan_id']) : 0;
        $db = MemberGlut_DB::get_instance();

        $result = $db->delete_plan($plan_id);

        if ($result) {
            wp_send_json_success();
        } else {
            wp_send_json_error(esc_html__('Failed to delete plan.', 'memberglut'));
        }
    }

    /**
     * AJAX: Add plan feature
     */
    public function ajax_add_plan_feature() {
        // Verify nonce - sanitize before verification
        $nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';
        if (!wp_verify_nonce($nonce, 'memberglut_admin_nonce')) {
            wp_send_json_error(esc_html__('Security check failed', 'memberglut'));
        }

        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Insufficient permissions', 'memberglut'));
        }

        $plan_id = isset($_POST['plan_id']) ? intval($_POST['plan_id']) : 0;
        $feature_name = isset($_POST['feature_name']) ? sanitize_text_field(wp_unslash($_POST['feature_name'])) : '';
        $feature_icon = isset($_POST['feature_icon']) ? sanitize_key($_POST['feature_icon']) : '';
        $feature_description = isset($_POST['feature_description']) ? sanitize_textarea_field(wp_unslash($_POST['feature_description'])) : '';

        $db = MemberGlut_DB::get_instance();

        // Get current feature count for ordering
        $features = $db->get_plan_features($plan_id);
        $feature_order = count($features);

        $result = $db->add_plan_feature($plan_id, $feature_name, $feature_description, $feature_icon, $feature_order);

        if ($result) {
            wp_send_json_success(array('feature_id' => $result));
        } else {
            wp_send_json_error(esc_html__('Failed to add feature.', 'memberglut'));
        }
    }

    /**
     * AJAX: Get plan features
     */
    public function ajax_get_plan_features() {
        // Verify nonce - sanitize before verification
        $nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';
        if (!wp_verify_nonce($nonce, 'memberglut_admin_nonce')) {
            wp_send_json_error(esc_html__('Security check failed', 'memberglut'));
        }

        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Insufficient permissions', 'memberglut'));
        }

        $plan_id = isset($_POST['plan_id']) ? intval($_POST['plan_id']) : 0;
        $db = MemberGlut_DB::get_instance();
        $features = $db->get_plan_features($plan_id);

        wp_send_json_success($features);
    }

    /**
     * AJAX: Delete plan feature
     */
    public function ajax_delete_plan_feature() {
        // Verify nonce - sanitize before verification
        $nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';
        if (!wp_verify_nonce($nonce, 'memberglut_admin_nonce')) {
            wp_send_json_error(esc_html__('Security check failed', 'memberglut'));
        }

        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Insufficient permissions', 'memberglut'));
        }

        $feature_id = isset($_POST['feature_id']) ? intval($_POST['feature_id']) : 0;
        $db = MemberGlut_DB::get_instance();

        $result = $db->delete_plan_feature($feature_id);

        if ($result) {
            wp_send_json_success();
        } else {
            wp_send_json_error(esc_html__('Failed to delete feature.', 'memberglut'));
        }
    }

    /**
     * AJAX: Assign plan to user
     */
    public function ajax_assign_user_plan() {
        // Verify nonce - sanitize before verification
        $nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';
        if (!wp_verify_nonce($nonce, 'memberglut_admin_nonce')) {
            wp_send_json_error(esc_html__('Security check failed', 'memberglut'));
        }

        // Check permissions
        if (!current_user_can('manage_options')) {
            wp_send_json_error(esc_html__('Insufficient permissions', 'memberglut'));
        }

        $plan_id = isset($_POST['plan_id']) ? intval($_POST['plan_id']) : 0;
        $user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;
        $duration = isset($_POST['duration']) ? intval($_POST['duration']) : null;
        $status = isset($_POST['status']) ? sanitize_key($_POST['status']) : 'active';

        $db = MemberGlut_DB::get_instance();

        $result = $db->assign_user_plan($user_id, $plan_id, $duration, $status);

        if ($result) {
            wp_send_json_success();
        } else {
            wp_send_json_error(esc_html__('Failed to assign plan.', 'memberglut'));
        }
    }

}