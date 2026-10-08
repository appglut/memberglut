<?php
/**
 * MemberGlut Database Management Class
 *
 * @package MemberGlut
 * @since 1.1.5
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class MemberGlut_DB {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        // Initialize database tables (after translations are loaded)
        add_action('init', array($this, 'maybe_create_tables'), 10);
        // Also check on admin init for existing installations
        add_action('admin_init', array($this, 'maybe_create_tables'), 5);
        // Create default plans after init (translations must be loaded first)
        add_action('init', array($this, 'maybe_create_default_plans'), 20);
    }

    /**
     * Get table names
     */
    public function get_table_name($table) {
        global $wpdb;
        $prefix = $wpdb->prefix . 'memberglut_';

        $tables = array(
            'plans' => $prefix . 'plans',
            'user_plans' => $prefix . 'user_plans',
            'plan_features' => $prefix . 'plan_features',
        );

        return isset($tables[$table]) ? $tables[$table] : '';
    }

    /**
     * Clear plan cache
     */
    private function clear_plan_cache($plan_id = null) {
        // Clear all plans cache
        wp_cache_delete('memberglut_plans_active', 'memberglut');
        wp_cache_delete('memberglut_plans_', 'memberglut');
        wp_cache_delete('memberglut_plans_any', 'memberglut');

        // Clear specific plan cache if provided
        if ($plan_id) {
            wp_cache_delete('memberglut_plan_' . $plan_id, 'memberglut');
        }
    }

    /**
     * Create database tables
     */
    public function create_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

        // Plans table
        $plans_table = $this->get_table_name('plans');
        $sql_plans = "CREATE TABLE $plans_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            plan_name varchar(100) NOT NULL,
            plan_slug varchar(100) NOT NULL,
            plan_description text,
            plan_price decimal(10,2) DEFAULT 0.00,
            plan_billing_cycle varchar(20) DEFAULT 'lifetime',
            plan_duration int DEFAULT 0,
            plan_trial_days int DEFAULT 0,
            plan_status varchar(20) DEFAULT 'active',
            plan_order int DEFAULT 0,
            plan_capabilities longtext,
            plan_color varchar(20) DEFAULT '#2271b1',
            plan_icon varchar(50) DEFAULT 'dashicons-admin-users',
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            UNIQUE KEY plan_slug (plan_slug),
            KEY plan_status (plan_status),
            KEY plan_order (plan_order)
        ) $charset_collate;";
        dbDelta($sql_plans);

        // User plans table
        $user_plans_table = $this->get_table_name('user_plans');
        $sql_user_plans = "CREATE TABLE $user_plans_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            plan_id mediumint(9) NOT NULL,
            start_date datetime DEFAULT CURRENT_TIMESTAMP,
            end_date datetime NULL,
            trial_end_date datetime NULL,
            status varchar(20) DEFAULT 'active',
            auto_renew tinyint(1) DEFAULT 0,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY user_id (user_id),
            KEY plan_id (plan_id),
            KEY status (status)
        ) $charset_collate;";
        dbDelta($sql_user_plans);

        // Plan features table
        $plan_features_table = $this->get_table_name('plan_features');
        $sql_features = "CREATE TABLE $plan_features_table (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            plan_id mediumint(9) NOT NULL,
            feature_name varchar(100) NOT NULL,
            feature_description text,
            feature_icon varchar(50) DEFAULT 'dashicons-yes',
            feature_order int DEFAULT 0,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY plan_id (plan_id),
            KEY feature_order (feature_order)
        ) $charset_collate;";
        dbDelta($sql_features);
    }

    /**
     * Maybe create tables (check version first)
     */
    public function maybe_create_tables() {
        global $wpdb;

        // Check if plans table exists
        $plans_table = $this->get_table_name('plans');
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Schema check during initialization.
        $table_exists = $wpdb->get_var($wpdb->prepare("SHOW TABLES LIKE %s", $plans_table));

        $version = get_option('memberglut_db_version', '0');

        // Create tables if version doesn't match or tables don't exist
        if ($version !== MEMBERGLUT_VERSION || !$table_exists) {
            $this->create_tables();
            update_option('memberglut_db_version', MEMBERGLUT_VERSION);
        }
    }

    /**
     * Maybe create default plans (called after translations are loaded)
     */
    public function maybe_create_default_plans() {
        $created = get_option('memberglut_default_plans_created', '0');
        if ($created === '1') {
            return;
        }

        $this->create_default_plans();
        update_option('memberglut_default_plans_created', '1');
    }

    /**
     * Create default plans
     */
    private function create_default_plans() {
        global $wpdb;
        $plans_table = $this->get_table_name('plans');

        // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared,WordPress.DB.DirectDatabaseQuery.DirectQuery,PluginCheck.Security.DirectDB.UnescapedDBParameter,WordPress.DB.DirectDatabaseQuery.NoCaching -- Table from get_table_name(), initialization check.
        $existing = $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM $plans_table"));
        if ($existing > 0) {
            return;
        }

        $default_plans = array(
            array(
                'plan_name' => __('Free Plan', 'memberglut'),
                'plan_slug' => 'free',
                'plan_description' => __('Basic access for free members', 'memberglut'),
                'plan_price' => 0,
                'plan_billing_cycle' => 'lifetime',
                'plan_status' => 'active',
                'plan_order' => 1,
                'plan_color' => '#646970',
                'plan_icon' => 'dashicons-star-filled',
            ),
            array(
                'plan_name' => __('Basic Plan', 'memberglut'),
                'plan_slug' => 'basic',
                'plan_description' => __('Perfect for getting started', 'memberglut'),
                'plan_price' => 9.99,
                'plan_billing_cycle' => 'monthly',
                'plan_duration' => 30,
                'plan_status' => 'active',
                'plan_order' => 2,
                'plan_color' => '#2271b1',
                'plan_icon' => 'dashicons-awards',
            ),
            array(
                'plan_name' => __('Pro Plan', 'memberglut'),
                'plan_slug' => 'pro',
                'plan_description' => __('For serious members', 'memberglut'),
                'plan_price' => 29.99,
                'plan_billing_cycle' => 'monthly',
                'plan_duration' => 30,
                'plan_status' => 'active',
                'plan_order' => 3,
                'plan_color' => '#00a32a',
                'plan_icon' => 'dashicons-awards',
            ),
            array(
                'plan_name' => __('Premium Plan', 'memberglut'),
                'plan_slug' => 'premium',
                'plan_description' => __('Ultimate access with all features', 'memberglut'),
                'plan_price' => 99.99,
                'plan_billing_cycle' => 'yearly',
                'plan_duration' => 365,
                'plan_status' => 'active',
                'plan_order' => 4,
                'plan_color' => '#f18500',
                'plan_icon' => 'dashicons-awards',
            ),
        );

        foreach ($default_plans as $plan) {
            // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.SchemaChange -- Default plan creation during initialization.
            $wpdb->insert($plans_table, $plan);
        }

        // Add default features for each plan
        $features = array(
            'free' => array(
                array('feature_name' => __('Basic Content Access', 'memberglut'), 'feature_icon' => 'dashicons-unlock'),
                array('feature_name' => __('Community Forum Access', 'memberglut'), 'feature_icon' => 'dashicons-groups'),
            ),
            'basic' => array(
                array('feature_name' => __('All Free Features', 'memberglut'), 'feature_icon' => 'dashicons-yes'),
                array('feature_name' => __('Premium Content Access', 'memberglut'), 'feature_icon' => 'dashicons-lock-open'),
                array('feature_name' => __('Email Support', 'memberglut'), 'feature_icon' => 'dashicons-email'),
            ),
            'pro' => array(
                array('feature_name' => __('All Basic Features', 'memberglut'), 'feature_icon' => 'dashicons-yes'),
                array('feature_name' => __('VIP Content Access', 'memberglut'), 'feature_icon' => 'dashicons-star-filled'),
                array('feature_name' => __('Priority Support', 'memberglut'), 'feature_icon' => 'dashicons-sos'),
                array('feature_name' => __('Downloads Access', 'memberglut'), 'feature_icon' => 'dashicons-download'),
            ),
            'premium' => array(
                array('feature_name' => __('All Pro Features', 'memberglut'), 'feature_icon' => 'dashicons-yes'),
                array('feature_name' => __('1-on-1 Coaching', 'memberglut'), 'feature_icon' => 'dashicons-businessperson'),
                array('feature_name' => __('Exclusive Events', 'memberglut'), 'feature_icon' => 'dashicons-calendar-alt'),
                array('feature_name' => __('Unlimited Downloads', 'memberglut'), 'feature_icon' => 'dashicons-download'),
                array('feature_name' => __('API Access', 'memberglut'), 'feature_icon' => 'dashicons-admin-generic'),
            ),
        );

        foreach ($features as $plan_slug => $plan_features) {
            $plan = $this->get_plan_by_slug($plan_slug);
            if ($plan) {
                foreach ($plan_features as $index => $feature) {
                    $this->add_plan_feature($plan['id'], $feature['feature_name'], '', $feature['feature_icon'], $index);
                }
            }
        }
    }

    /**
     * Get all plans
     */
    public function get_plans($status = 'active') {
        global $wpdb;
        $plans_table = $this->get_table_name('plans');

        // Check cache first
        $cache_key = 'memberglut_plans_' . $status;
        $cached = wp_cache_get($cache_key, 'memberglut');
        if (false !== $cached) {
            return $cached;
        }

        $sql = "SELECT * FROM $plans_table";
        if ($status) {
            $sql .= $wpdb->prepare(" WHERE plan_status = %s", $status);
        }
        $sql .= " ORDER BY plan_order ASC, id ASC";

        // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared,WordPress.DB.DirectDatabaseQuery.DirectQuery,PluginCheck.Security.DirectDB.UnescapedDBParameter -- $sql uses trusted table name and prepared WHERE, caching implemented.
        $results = $wpdb->get_results($sql, ARRAY_A);

        // Cache the results
        wp_cache_set($cache_key, $results, 'memberglut');

        return $results;
    }

    /**
     * Get plan by ID
     */
    public function get_plan($plan_id) {
        global $wpdb;
        $plans_table = $this->get_table_name('plans');

        // Check cache first
        $cache_key = 'memberglut_plan_' . $plan_id;
        $cached = wp_cache_get($cache_key, 'memberglut');
        if (false !== $cached) {
            return $cached;
        }

        // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared,PluginCheck.Security.DirectDB.UnescapedDBParameter,WordPress.DB.DirectDatabaseQuery.DirectQuery -- Table name uses {$wpdb->prefix}.
        $result = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM {$wpdb->prefix}memberglut_plans WHERE id = %d",
                $plan_id
            ),
            ARRAY_A
        );

        // Cache the result
        if ($result) {
            wp_cache_set($cache_key, $result, 'memberglut');
        }

        return $result;
    }

    /**
     * Get plan by slug
     */
    public function get_plan_by_slug($slug) {
        global $wpdb;
        $plans_table = $this->get_table_name('plans');

        // Check cache first
        $cache_key = 'memberglut_plan_slug_' . $slug;
        $cached = wp_cache_get($cache_key, 'memberglut');
        if (false !== $cached) {
            return $cached;
        }

        // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared,PluginCheck.Security.DirectDB.UnescapedDBParameter,WordPress.DB.DirectDatabaseQuery.DirectQuery -- Table name uses {$wpdb->prefix}.
        $result = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM {$wpdb->prefix}memberglut_plans WHERE plan_slug = %s",
                $slug
            ),
            ARRAY_A
        );

        // Cache the result
        if ($result) {
            wp_cache_set($cache_key, $result, 'memberglut');
            // Also cache by ID for consistency
            wp_cache_set('memberglut_plan_' . $result['id'], $result, 'memberglut');
        }

        return $result;
    }

    /**
     * Add a new plan
     */
    public function add_plan($data) {
        global $wpdb;
        $plans_table = $this->get_table_name('plans');

        $defaults = array(
            'plan_name' => '',
            'plan_slug' => '',
            'plan_description' => '',
            'plan_price' => 0,
            'plan_billing_cycle' => 'lifetime',
            'plan_duration' => 0,
            'plan_trial_days' => 0,
            'plan_status' => 'active',
            'plan_order' => 0,
            'plan_capabilities' => '',
            'plan_color' => '#2271b1',
            'plan_icon' => 'dashicons-admin-users',
        );

        $data = wp_parse_args($data, $defaults);

        // Generate slug if not provided
        if (empty($data['plan_slug'])) {
            $data['plan_slug'] = sanitize_title($data['plan_name']);
        }

        // Check for duplicate slug
        $existing = $this->get_plan_by_slug($data['plan_slug']);
        if ($existing) {
            $data['plan_slug'] = $data['plan_slug'] . '-' . time();
        }

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,PluginCheck.Security.DirectDB.UnescapedDBParameter -- Write operation with cache clearing.
        $result = $wpdb->insert($plans_table, $data);

        if ($result) {
            // Clear plan caches after adding
            $this->clear_plan_cache();
            return $wpdb->insert_id;
        }

        return false;
    }

    /**
     * Update a plan
     */
    public function update_plan($plan_id, $data) {
        global $wpdb;
        $plans_table = $this->get_table_name('plans');

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct update required, cache cleared below.
        $result = $wpdb->update(
            $plans_table,
            $data,
            array('id' => $plan_id),
            array('%s', '%s', '%s', '%f', '%s', '%d', '%d', '%s', '%d', '%s', '%s', '%s'),
            array('%d')
        );

        // Clear plan caches after updating
        $this->clear_plan_cache($plan_id);

        return $result;
    }

    /**
     * Delete a plan
     */
    public function delete_plan($plan_id) {
        global $wpdb;
        $plans_table = $this->get_table_name('plans');
        $user_plans_table = $this->get_table_name('user_plans');
        $features_table = $this->get_table_name('plan_features');

        // Delete plan
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct delete required, cache cleared below.
        $wpdb->delete($plans_table, array('id' => $plan_id), array('%d'));

        // Delete associated user plans
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct delete required, cache cleared below.
        $wpdb->delete($user_plans_table, array('plan_id' => $plan_id), array('%d'));

        // Delete associated features
        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct delete required, cache cleared below.
        $wpdb->delete($features_table, array('plan_id' => $plan_id), array('%d'));

        // Clear plan caches after deleting
        $this->clear_plan_cache($plan_id);

        return true;
    }

    /**
     * Get plan features
     */
    public function get_plan_features($plan_id) {
        global $wpdb;

        // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared,PluginCheck.Security.DirectDB.UnescapedDBParameter,WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Table name uses {$wpdb->prefix}.
        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM {$wpdb->prefix}memberglut_plan_features WHERE plan_id = %d ORDER BY feature_order ASC",
                $plan_id
            ),
            ARRAY_A
        );
    }

    /**
     * Add plan feature
     */
    public function add_plan_feature($plan_id, $feature_name, $feature_description = '', $feature_icon = 'dashicons-yes', $feature_order = 0) {
        global $wpdb;
        $features_table = $this->get_table_name('plan_features');

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery -- Direct insert required for this operation.
        return $wpdb->insert(
            $features_table,
            array(
                'plan_id' => $plan_id,
                'feature_name' => $feature_name,
                'feature_description' => $feature_description,
                'feature_icon' => $feature_icon,
                'feature_order' => $feature_order,
            ),
            array('%d', '%s', '%s', '%s', '%d')
        );
    }

    /**
     * Update plan feature
     */
    public function update_plan_feature($feature_id, $data) {
        global $wpdb;
        $features_table = $this->get_table_name('plan_features');

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct update required for this operation.
        return $wpdb->update(
            $features_table,
            $data,
            array('id' => $feature_id),
            array('%s', '%s', '%s', '%d'),
            array('%d')
        );
    }

    /**
     * Delete plan feature
     */
    public function delete_plan_feature($feature_id) {
        global $wpdb;
        $features_table = $this->get_table_name('plan_features');

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Direct delete required for this operation.
        return $wpdb->delete($features_table, array('id' => $feature_id), array('%d'));
    }

    /**
     * Get user plans
     */
    public function get_user_plans($user_id) {
        global $wpdb;

        // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared,PluginCheck.Security.DirectDB.UnescapedDBParameter,WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Table names use {$wpdb->prefix}.
        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT up.*, p.plan_name, p.plan_slug, p.plan_color
                FROM {$wpdb->prefix}memberglut_user_plans up
                JOIN {$wpdb->prefix}memberglut_plans p ON up.plan_id = p.id
                WHERE up.user_id = %d
                ORDER BY up.created_at DESC",
                $user_id
            ),
            ARRAY_A
        );
    }

    /**
     * Get active user plan
     */
    public function get_active_user_plan($user_id) {
        global $wpdb;

        // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared,PluginCheck.Security.DirectDB.UnescapedDBParameter,WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Table names use {$wpdb->prefix}.
        return $wpdb->get_row(
            $wpdb->prepare(
                "SELECT up.*, p.plan_name, p.plan_slug, p.plan_color
                FROM {$wpdb->prefix}memberglut_user_plans up
                JOIN {$wpdb->prefix}memberglut_plans p ON up.plan_id = p.id
                WHERE up.user_id = %d AND up.status = 'active'
                ORDER BY up.created_at DESC
                LIMIT 1",
                $user_id
            ),
            ARRAY_A
        );
    }

    /**
     * Assign plan to user
     */
    public function assign_user_plan($user_id, $plan_id, $duration_days = null, $status = 'active') {
        global $wpdb;
        $user_plans_table = $this->get_table_name('user_plans');

        $plan = $this->get_plan($plan_id);
        if (!$plan) {
            return false;
        }

        $data = array(
            'user_id' => $user_id,
            'plan_id' => $plan_id,
            'status' => $status,
        );

        // Calculate end date
        if ($duration_days) {
            $data['end_date'] = gmdate('Y-m-d H:i:s', strtotime("+$duration_days days"));
        } elseif ($plan['plan_duration'] > 0 && $plan['plan_billing_cycle'] !== 'lifetime') {
            $data['end_date'] = gmdate('Y-m-d H:i:s', strtotime("+{$plan['plan_duration']} days"));
        }

        // Set trial end date if applicable
        if ($plan['plan_trial_days'] > 0) {
            $data['trial_end_date'] = gmdate('Y-m-d H:i:s', strtotime("+{$plan['plan_trial_days']} days"));
        }

        // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- This is a write operation, caching not applicable.
        return $wpdb->insert($user_plans_table, $data);
    }

    /**
     * Get plan stats
     */
    public function get_plan_stats($plan_id) {
        global $wpdb;

        // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared,PluginCheck.Security.DirectDB.UnescapedDBParameter,WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Table name uses {$wpdb->prefix}.
        $total = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM {$wpdb->prefix}memberglut_user_plans WHERE plan_id = %d",
                $plan_id
            )
        );

        // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared,PluginCheck.Security.DirectDB.UnescapedDBParameter,WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Table name uses {$wpdb->prefix}.
        $active = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT COUNT(*) FROM {$wpdb->prefix}memberglut_user_plans WHERE plan_id = %d AND status = 'active'",
                $plan_id
            )
        );

        return array(
            'total' => intval($total),
            'active' => intval($active),
        );
    }
}
