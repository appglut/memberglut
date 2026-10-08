<?php
/**
 * MemberGlut Custom Forms Class
 *
 * @package MemberGlut
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class MemberGlut_Forms {
    
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
        // Add shortcodes
        add_shortcode('memberglut_login_form', array($this, 'login_form_shortcode'));
        add_shortcode('memberglut_register_form', array($this, 'register_form_shortcode'));
        
        // // Handle form submissions
         add_action('template_redirect', array($this, 'handle_form_submissions'));
        
        // // Enqueue styles and scripts
         add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'), 10);
        
        // // Override WordPress login system if enabled
        add_action('init', array($this, 'override_login_system'));
        
        // // Handle AJAX login/registration
         add_action('wp_ajax_nopriv_memberglut_ajax_login', array($this, 'ajax_login'));
         add_action('wp_ajax_nopriv_memberglut_ajax_register', array($this, 'ajax_register'));
    }
    
    /**
     * Enqueue scripts and styles
     */
    public function enqueue_scripts() {
        // Only enqueue on pages that might have the forms
        if (!$this->should_load_scripts()) {
            return;
        }
        
        wp_enqueue_style(
            'memberglut-forms',
            MEMBERGLUT_PLUGIN_URL . 'assets/css/frontend.css',
            array(),
            MEMBERGLUT_VERSION
        );
        
        wp_enqueue_script(
            'memberglut-forms-js',
            MEMBERGLUT_PLUGIN_URL . 'assets/js/frontend.js',
            array('jquery'),
            MEMBERGLUT_VERSION,
            true
        );
        
        wp_localize_script('memberglut-forms-js', 'memberglut_ajax', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('memberglut_ajax_nonce'),
            'messages' => array(
                'login_success' => __('Login successful! Redirecting...', 'memberglut'),
                'register_success' => __('Registration successful! Please check your email.', 'memberglut'),
                'processing' => __('Processing...', 'memberglut'),
                'error' => __('An error occurred. Please try again.', 'memberglut')
            )
        ));
    }
    
    /**
     * Check if we should load scripts
     */
    private function should_load_scripts() {
        global $post;
        
        // Always load on frontend (not admin)
        if (is_admin()) {
            return false;
        }
        
        // Load if post contains shortcodes
        if ($post && (
            has_shortcode($post->post_content, 'memberglut_login_form') ||
            has_shortcode($post->post_content, 'memberglut_register_form')
        )) {
            return true;
        }
        
        // Load on custom login/register pages
        $login_url = get_option('memberglut_custom_login_url', '');
        $register_url = get_option('memberglut_custom_register_url', '');

        $request_uri = isset($_SERVER['REQUEST_URI']) ? sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '';

        if (!empty($login_url) && strpos($request_uri, $login_url) !== false) {
            return true;
        }

        if (!empty($register_url) && strpos($request_uri, $register_url) !== false) {
            return true;
        }
        
        return true;
    }
    
    /**
     * Login form shortcode
     */
    public function login_form_shortcode($atts) {
        $atts = shortcode_atts(array(
            // URLs and redirects
            'redirect' => '',
            'register_url' => '',
            'lost_password_url' => '',
            
            // Visibility options
            'show_register_link' => 'true',
            'show_lost_password_link' => 'true',
            'show_remember_me' => 'true',
            'show_title' => 'true',
            
            // Text customization
            'title' => __('Login', 'memberglut'),
            'button_text' => __('Login', 'memberglut'),
            'username_label' => __('Username or Email', 'memberglut'),
            'password_label' => __('Password', 'memberglut'),
            'remember_label' => __('Remember Me', 'memberglut'),
            'register_text' => __('Don\'t have an account? Register', 'memberglut'),
            'lost_password_text' => __('Lost Password?', 'memberglut'),
            
            // Form styling
            'form_style' => 'default', // default, compact, minimal
            'button_style' => 'primary', // primary, secondary, custom
            'width' => '', // max width in pixels or percentage
            
            // Advanced options
            'ajax' => 'true',
            'placeholder' => 'false', // use placeholders instead of labels
        ), $atts);
        
        if (is_user_logged_in()) {
            return $this->get_logged_in_message();
        }
        
        ob_start();
        
        $form_id = 'memberglut-login-form-' . uniqid();
        
        // Build form wrapper classes
        $wrapper_classes = array('memberglut-login-form-wrapper');
        if ($atts['form_style'] !== 'default') {
            $wrapper_classes[] = 'memberglut-form-' . esc_attr($atts['form_style']);
        }
        
        // Build form container style
        $container_style = '';
        if (!empty($atts['width'])) {
            $container_style = 'style="max-width: ' . esc_attr($atts['width']) . ';"';
        }

        // Determine button classes
        $button_classes = array('memberglut-btn', 'memberglut-btn-full');
        if ($atts['button_style'] === 'primary') {
            $button_classes[] = 'memberglut-btn-primary';
        } elseif ($atts['button_style'] === 'secondary') {
            $button_classes[] = 'memberglut-btn-secondary';
        }

        // Set AJAX data attribute
        $ajax_attr = $atts['ajax'] === 'true' ? 'data-ajax="true"' : 'data-ajax="false"';
        ?>
        <div class="<?php echo esc_attr(implode(' ', $wrapper_classes)); ?>">
            <div class="memberglut-form-container" <?php echo esc_attr($container_style); ?>>
                <?php if ($atts['show_title'] === 'true'): ?>
                    <h3 class="memberglut-form-title"><?php echo esc_html($atts['title']); ?></h3>
                <?php endif; ?>
                
                <?php $this->show_messages(); ?>

                <form class="memberglut-login-form" method="post" <?php echo esc_attr($ajax_attr); ?>>
                    <div class="memberglut-form-row">
                        <?php if ($atts['placeholder'] === 'true'): ?>
                            <input type="text" id="memberglut_username_<?php echo esc_attr($form_id); ?>" name="username"
                                   placeholder="<?php echo esc_attr($atts['username_label']); ?>"
                                   value="<?php echo esc_attr(isset($_POST['username']) ? sanitize_text_field(wp_unslash($_POST['username'])) : ''); // phpcs:ignore WordPress.Security.NonceVerification.Missing -- Nonce verified on form submission, this is for displaying previously entered value. ?>" required />
                        <?php else: ?>
                            <label for="memberglut_username_<?php echo esc_attr($form_id); ?>"><?php echo esc_html($atts['username_label']); ?></label>
                            <input type="text" id="memberglut_username_<?php echo esc_attr($form_id); ?>" name="username"
                                   value="<?php echo esc_attr(isset($_POST['username']) ? sanitize_text_field(wp_unslash($_POST['username'])) : ''); // phpcs:ignore WordPress.Security.NonceVerification.Missing -- Nonce verified on form submission, this is for displaying previously entered value. ?>" required />
                        <?php endif; ?>
                    </div>
                    
                    <div class="memberglut-form-row">
                        <?php if ($atts['placeholder'] === 'true'): ?>
                            <input type="password" id="memberglut_password_<?php echo esc_attr($form_id); ?>" name="password" 
                                   placeholder="<?php echo esc_attr($atts['password_label']); ?>" required />
                        <?php else: ?>
                            <label for="memberglut_password_<?php echo esc_attr($form_id); ?>"><?php echo esc_html($atts['password_label']); ?></label>
                            <input type="password" id="memberglut_password_<?php echo esc_attr($form_id); ?>" name="password" required />
                        <?php endif; ?>
                    </div>
                    
                    <?php if ($atts['show_remember_me'] === 'true'): ?>
                        <div class="memberglut-form-row">
                            <label>
                                <input type="checkbox" name="remember" value="1" />
                                <?php echo esc_html($atts['remember_label']); ?>
                            </label>
                        </div>
                    <?php endif; ?>
                    
                    <div class="memberglut-form-row">
                        <button type="submit" class="<?php echo esc_attr(implode(' ', $button_classes)); ?>">
                            <?php echo esc_html($atts['button_text']); ?>
                        </button>
                    </div>
                    
                    <?php wp_nonce_field('memberglut_login_nonce', 'login_nonce'); ?>
                    <input type="hidden" name="action" value="memberglut_login" />
                    <input type="hidden" name="redirect_to" value="<?php echo esc_attr($atts['redirect']); ?>" />
                </form>
                
                <?php if ($atts['show_register_link'] === 'true' || $atts['show_lost_password_link'] === 'true'): ?>
                    <div class="memberglut-form-links">
                        <?php if ($atts['show_register_link'] === 'true'): ?>
                            <?php 
                            // Use custom register URL from shortcode parameter first, then plugin setting
                            if (!empty($atts['register_url'])) {
                                $register_url = esc_url($atts['register_url']);
                            } else {
                                $register_url = get_option('memberglut_custom_register_url', '');
                                if (empty($register_url)) {
                                    $register_url = wp_registration_url();
                                } else {
                                    $register_url = home_url($register_url);
                                }
                            }
                            ?>
                            <a href="<?php echo esc_url($register_url); ?>" class="memberglut-register-link">
                                <?php echo esc_html($atts['register_text']); ?>
                            </a>
                        <?php endif; ?>
                        
                        <?php if ($atts['show_lost_password_link'] === 'true'): ?>
                            <?php 
                            // Use custom lost password URL from shortcode parameter first, then plugin setting
                            if (!empty($atts['lost_password_url'])) {
                                $lostpassword_url = esc_url($atts['lost_password_url']);
                            } else {
                                $lostpassword_url = get_option('memberglut_custom_lostpassword_url', '');
                                if (empty($lostpassword_url)) {
                                    $lostpassword_url = wp_lostpassword_url();
                                } else {
                                    $lostpassword_url = home_url($lostpassword_url);
                                }
                            }
                            ?>
                            <a href="<?php echo esc_url($lostpassword_url); ?>" class="memberglut-lost-password-link">
                                <?php echo esc_html($atts['lost_password_text']); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * Register form shortcode
     */
    public function register_form_shortcode($atts) {
        $atts = shortcode_atts(array(
            'redirect' => '',
            'show_login_link' => 'true',
            'title' => __('Register', 'memberglut'),
            'button_text' => __('Register', 'memberglut'),
            'default_role' => get_option('default_role', 'subscriber'),
        ), $atts);

        // SECURITY: Validate default_role - only allow safe roles
        $allowed_registration_roles = array('subscriber', 'memberglut_basic', 'memberglut_premium', 'memberglut_vip');
        if (!empty($atts['default_role']) && !in_array($atts['default_role'], $allowed_registration_roles, true)) {
            $atts['default_role'] = 'subscriber'; // Fall back to safest default
        }

        if (!get_option('users_can_register')) {
            return '<p>' . __('User registration is currently not allowed.', 'memberglut') . '</p>';
        }
        
        if (is_user_logged_in()) {
            return $this->get_logged_in_message();
        }
        
        ob_start();
        ?>
        <div class="memberglut-register-form-wrapper">
            <div class="memberglut-form-container">
                <h3 class="memberglut-form-title"><?php echo esc_html($atts['title']); ?></h3>
                
                <?php $this->show_messages(); ?>
                
                <form class="memberglut-register-form" method="post">
                    <div class="memberglut-form-row">
                        <label for="memberglut_reg_username"><?php esc_html_e('Username', 'memberglut'); ?> *</label>
                        <input type="text" id="memberglut_reg_username" name="username" required />
                    </div>

                    <div class="memberglut-form-row">
                        <label for="memberglut_reg_email"><?php esc_html_e('Email', 'memberglut'); ?> *</label>
                        <input type="email" id="memberglut_reg_email" name="email" required />
                    </div>

                    <div class="memberglut-form-row">
                        <label for="memberglut_reg_password"><?php esc_html_e('Password', 'memberglut'); ?> *</label>
                        <input type="password" id="memberglut_reg_password" name="password" required />
                    </div>

                    <div class="memberglut-form-row">
                        <label for="memberglut_reg_first_name"><?php esc_html_e('First Name', 'memberglut'); ?></label>
                        <input type="text" id="memberglut_reg_first_name" name="first_name" />
                    </div>

                    <div class="memberglut-form-row">
                        <label for="memberglut_reg_last_name"><?php esc_html_e('Last Name', 'memberglut'); ?></label>
                        <input type="text" id="memberglut_reg_last_name" name="last_name" />
                    </div>
                    
                    <div class="memberglut-form-row">
                        <button type="submit" class="memberglut-btn memberglut-btn-primary memberglut-btn-full">
                            <?php echo esc_html($atts['button_text']); ?>
                        </button>
                    </div>
                    
                    <?php wp_nonce_field('memberglut_register_nonce', 'register_nonce'); ?>
                    <input type="hidden" name="action" value="memberglut_register" />
                    <input type="hidden" name="redirect_to" value="<?php echo esc_attr($atts['redirect']); ?>" />
                    <input type="hidden" name="default_role" value="<?php echo esc_attr($atts['default_role']); ?>" />
                </form>
                
                <?php if ($atts['show_login_link'] === 'true'): ?>
                    <div class="memberglut-form-links">
                        <?php 
                        $login_url = get_option('memberglut_custom_login_url', '');
                        if (empty($login_url)) {
                            $login_url = wp_login_url();
                        } else {
                            $login_url = home_url($login_url);
                        }
                        ?>
                        <a href="<?php echo esc_url($login_url); ?>" class="memberglut-login-link">
                            <?php esc_html_e('Already have an account? Login', 'memberglut'); ?>
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * Get logged in message
     */
    private function get_logged_in_message() {
        $current_user = wp_get_current_user();
        $logout_url = wp_logout_url();

        ob_start();
        ?>
        <div class="memberglut-logged-in-message">
            <?php
            /* translators: %s: user display name */
            printf(esc_html__('Welcome back, %s!', 'memberglut'), '<strong>' . esc_html($current_user->display_name) . '</strong>');
            ?>
            <p><a href="<?php echo esc_url($logout_url); ?>" class="memberglut-btn memberglut-btn-secondary"><?php esc_html_e('Logout', 'memberglut'); ?></a></p>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * Handle form submissions
     */
    public function handle_form_submissions() {
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash -- $_SERVER values are not slashed like $_POST.
        $request_method = isset($_SERVER['REQUEST_METHOD']) ? sanitize_text_field($_SERVER['REQUEST_METHOD']) : '';
        if ($request_method !== 'POST') {
            return;
        }

        // Handle login form - nonce verified in process_login()
        // phpcs:ignore WordPress.Security.NonceVerification.Missing -- Nonce verification is done in process_login() method.
        if (isset($_POST['action']) && $_POST['action'] === 'memberglut_login') {
            $this->process_login();
        }

        // Handle register form - nonce verified in process_registration()
        // phpcs:ignore WordPress.Security.NonceVerification.Missing -- Nonce verification is done in process_registration() method.
        if (isset($_POST['action']) && $_POST['action'] === 'memberglut_register') {
            $this->process_registration();
        }
    }

    /**
     * Process login
     */
    private function process_login() {
        // Verify nonce - sanitize before verification
        $nonce = isset($_POST['login_nonce']) ? sanitize_text_field(wp_unslash($_POST['login_nonce'])) : '';
        if (!wp_verify_nonce($nonce, 'memberglut_login_nonce')) {
            wp_safe_redirect(add_query_arg('login_error', urlencode(esc_html__('Security check failed.', 'memberglut')), wp_get_referer()));
            exit;
        }

        $username = isset($_POST['username']) ? sanitize_user(wp_unslash($_POST['username'])) : '';
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Password should not be sanitized to avoid altering the actual value.
        $password = isset($_POST['password']) ? wp_unslash($_POST['password']) : '';
        $remember = isset($_POST['remember']) ? true : false;
        $redirect_to = isset($_POST['redirect_to']) && !empty($_POST['redirect_to']) ? esc_url_raw(wp_unslash($_POST['redirect_to'])) : '';

        // Validate input
        if (empty($username) || empty($password)) {
            wp_safe_redirect(add_query_arg('login_error', urlencode(esc_html__('Please enter both username and password.', 'memberglut')), wp_get_referer()));
            exit;
        }

        $creds = array(
            'user_login' => $username,
            'user_password' => $password,
            'remember' => $remember
        );

        $user = wp_signon($creds, false);

        if (is_wp_error($user)) {
            wp_safe_redirect(add_query_arg('login_error', urlencode($user->get_error_message()), wp_get_referer()));
            exit;
        }

        // Successful login - determine redirect
        if (!empty($redirect_to)) {
            $redirect_url = $redirect_to;
        } else {
            $redirect_url = get_option('memberglut_login_redirect', '');
            if (empty($redirect_url)) {
                $redirect_url = home_url();
            }
        }

        wp_safe_redirect(apply_filters('memberglut_login_redirect_url', $redirect_url, $user));
        exit;
    }

    /**
     * Process registration
     */
    private function process_registration() {
        // Verify nonce - sanitize before verification
        $nonce = isset($_POST['register_nonce']) ? sanitize_text_field(wp_unslash($_POST['register_nonce'])) : '';
        if (!wp_verify_nonce($nonce, 'memberglut_register_nonce')) {
            wp_die(esc_html__('Security check failed.', 'memberglut'));
        }

        if (!get_option('users_can_register')) {
            wp_safe_redirect(add_query_arg('register_error', urlencode(esc_html__('User registration is currently not allowed.', 'memberglut')), wp_get_referer()));
            exit;
        }

        $username = isset($_POST['username']) ? sanitize_user(wp_unslash($_POST['username'])) : '';
        $email = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Password should not be sanitized to avoid altering the actual value.
        $password = isset($_POST['password']) ? wp_unslash($_POST['password']) : '';
        $first_name = isset($_POST['first_name']) ? sanitize_text_field(wp_unslash($_POST['first_name'])) : '';
        $last_name = isset($_POST['last_name']) ? sanitize_text_field(wp_unslash($_POST['last_name'])) : '';
        $default_role = isset($_POST['default_role']) ? sanitize_key($_POST['default_role']) : '';
        $redirect_to = isset($_POST['redirect_to']) ? esc_url_raw(wp_unslash($_POST['redirect_to'])) : '';

        // Create user
        $user_id = wp_create_user($username, $password, $email);

        if (is_wp_error($user_id)) {
            wp_safe_redirect(add_query_arg('register_error', urlencode($user_id->get_error_message()), wp_get_referer()));
            exit;
        }

        // Update user meta
        if (!empty($first_name)) {
            update_user_meta($user_id, 'first_name', $first_name);
        }
        if (!empty($last_name)) {
            update_user_meta($user_id, 'last_name', $last_name);
        }

        // Set user role - SECURITY: Only allow safe roles for registration
        // Allowlist of roles that unprivileged users can register for
        $allowed_registration_roles = array('subscriber', 'memberglut_basic', 'memberglut_premium', 'memberglut_vip');
        if (!empty($default_role) && in_array($default_role, $allowed_registration_roles, true) && get_role($default_role)) {
            $user = new WP_User($user_id);
            $user->set_role($default_role);
        }

        // Send notification emails
        wp_new_user_notification($user_id, null, 'both');

        // Auto-login user
        $creds = array(
            'user_login' => $username,
            'user_password' => $password,
            'remember' => false
        );

        $user = wp_signon($creds, false);

        // Redirect
        if (!empty($redirect_to)) {
            $redirect_url = $redirect_to;
        } else {
            $redirect_url = get_option('memberglut_login_redirect', '');
            if (empty($redirect_url)) {
                $redirect_url = home_url();
            }
        }

        wp_safe_redirect(add_query_arg('registration_success', '1', apply_filters('memberglut_register_redirect_url', $redirect_url)));
        exit;
    }
    
    /**
     * Show messages
     */
    private function show_messages() {
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- These are display-only GET parameters from redirects, sanitized before use.
        if (isset($_GET['login_error'])) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Display-only GET parameter from redirect.
            $error = sanitize_text_field(wp_unslash($_GET['login_error'])); // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Display-only GET parameter from redirect.
            echo '<div class="memberglut-error">' . esc_html(urldecode($error)) . '</div>';
        }

        // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- These are display-only GET parameters from redirects, sanitized before use.
        if (isset($_GET['register_error'])) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Display-only GET parameter from redirect.
            $error = sanitize_text_field(wp_unslash($_GET['register_error'])); // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Display-only GET parameter from redirect.
            echo '<div class="memberglut-error">' . esc_html(urldecode($error)) . '</div>';
        }

        // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- These are display-only GET parameters from redirects.
        if (isset($_GET['registration_success'])) {
            echo '<div class="memberglut-success">' . esc_html__('Registration successful! Welcome!', 'memberglut') . '</div>';
        }

        // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- These are display-only GET parameters from redirects.
        if (isset($_GET['login_success'])) {
            echo '<div class="memberglut-success">' . esc_html__('Login successful! Redirecting...', 'memberglut') . '</div>';
        }
    }
    
   public function override_login_system() {
    // Only proceed if option is enabled
    if (!get_option('memberglut_override_wp_login', false)) {
        return;
    }

    // // Redirect wp-login.php to custom login page
    add_action('login_init', array($this, 'redirect_login_page'));

    // // Hide admin bar for non-admin users
    if (get_option('memberglut_hide_admin_bar', false)) {
        add_action('after_setup_theme', array($this, 'hide_admin_bar'));
    }

    // // Override URLs
     add_filter('login_url', array($this, 'custom_login_url'), 10, 3);
   
   if (get_option('memberglut_override_wp_login', false)) {
    add_filter('logout_url', array($this, 'custom_logout_url'), 10, 2);
}

     add_filter('lostpassword_url', array($this, 'custom_lostpassword_url'), 10, 2);
     add_filter('register_url', array($this, 'custom_register_url'));
}

/**
 * Redirect wp-login.php to a custom login page
 */
public function redirect_login_page() {
    // Ensure this is not CLI, REST, or AJAX
    if (defined('DOING_AJAX') && DOING_AJAX) return;
    if (defined('REST_REQUEST') && REST_REQUEST) return;
    if (php_sapi_name() === 'cli') return;

    $custom_login_slug = get_option('memberglut_custom_login_url', '');

    // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Checking if WordPress core action parameter exists.
    if (!empty($custom_login_slug) && !isset($_GET['action'])) {
        $custom_url = home_url($custom_login_slug);

        // Prevent redirect loop
        $request_uri = isset($_SERVER['REQUEST_URI']) ? sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '';
        if ($request_uri !== wp_parse_url($custom_url, PHP_URL_PATH)) {
            wp_safe_redirect($custom_url);
            exit;
        }
    }
}

/**
 * Example: Hide admin bar for non-admins
 */
public function hide_admin_bar() {
    if (!current_user_can('administrator')) {
        show_admin_bar(false);
    }
}

/**
 * Customize login/logout URLs (optional examples)
 */
public function custom_login_url($login_url, $redirect, $force_reauth) {
    $slug = get_option('memberglut_custom_login_url', '');
    return !empty($slug) ? home_url($slug) : $login_url;
}

public function custom_logout_url($logout_url, $redirect) {
    if (!empty($redirect)) {
        return add_query_arg('redirect_to', esc_url_raw($redirect), wp_logout_url());
    }
    return $logout_url; // fallback to original
}


public function custom_lostpassword_url($lostpassword_url, $redirect) {
    $slug = get_option('memberglut_custom_lostpassword_url', '');
    return !empty($slug) ? home_url($slug) : $lostpassword_url;
}

public function custom_register_url($register_url) {
    $slug = get_option('memberglut_custom_register_url', '');
    return !empty($slug) ? home_url($slug) : $register_url;
}
   
    
  

    
    /**
     * AJAX login handler
     */
    public function ajax_login() {
        // Verify nonce - sanitize before verification
        $nonce = isset($_POST['nonce']) ? sanitize_text_field(wp_unslash($_POST['nonce'])) : '';
        if (!wp_verify_nonce($nonce, 'memberglut_ajax_nonce')) {
            wp_send_json_error(array('message' => esc_html__('Security check failed.', 'memberglut')));
        }

        $username = isset($_POST['username']) ? sanitize_user(wp_unslash($_POST['username'])) : '';
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Password should not be sanitized to avoid altering the actual value.
        $password = isset($_POST['password']) ? wp_unslash($_POST['password']) : '';
        $remember = isset($_POST['remember']) ? true : false;

        $creds = array(
            'user_login' => $username,
            'user_password' => $password,
            'remember' => $remember
        );

        $user = wp_signon($creds, false);

        if (is_wp_error($user)) {
            wp_send_json_error(array('message' => $user->get_error_message()));
        }

        // Determine redirect URL
        $redirect_url = get_option('memberglut_login_redirect', '');
        if (empty($redirect_url)) {
            $redirect_url = home_url();
        }

        wp_send_json_success(array(
            'message' => esc_html__('Login successful!', 'memberglut'),
            'redirect_url' => apply_filters('memberglut_login_redirect_url', $redirect_url, $user)
        ));
    }
    
    /**
     * AJAX registration handler
     */
    public function ajax_register() {
        check_ajax_referer('memberglut_ajax_nonce', 'nonce');

        if (!get_option('users_can_register')) {
            wp_send_json_error(array('message' => esc_html__('User registration is currently not allowed.', 'memberglut')));
        }

        $username = isset($_POST['username']) ? sanitize_user(wp_unslash($_POST['username'])) : '';
        $email = isset($_POST['email']) ? sanitize_email(wp_unslash($_POST['email'])) : '';
        // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Password should not be sanitized to avoid altering the actual value.
        $password = isset($_POST['password']) ? wp_unslash($_POST['password']) : '';
        $first_name = isset($_POST['first_name']) ? sanitize_text_field(wp_unslash($_POST['first_name'])) : '';
        $last_name = isset($_POST['last_name']) ? sanitize_text_field(wp_unslash($_POST['last_name'])) : '';
        $default_role = isset($_POST['default_role']) ? sanitize_key($_POST['default_role']) : '';

        // Validate required fields
        if (empty($username) || empty($email) || empty($password)) {
            wp_send_json_error(array('message' => esc_html__('Please fill in all required fields.', 'memberglut')));
        }

        // Create user
        $user_id = wp_create_user($username, $password, $email);

        if (is_wp_error($user_id)) {
            wp_send_json_error(array('message' => $user_id->get_error_message()));
        }

        // Update user meta
        if (!empty($first_name)) {
            update_user_meta($user_id, 'first_name', $first_name);
        }
        if (!empty($last_name)) {
            update_user_meta($user_id, 'last_name', $last_name);
        }

        // Set user role - SECURITY: Only allow safe roles for registration
        // Allowlist of roles that unprivileged users can register for
        $allowed_registration_roles = array('subscriber', 'memberglut_basic', 'memberglut_premium', 'memberglut_vip');
        if (!empty($default_role) && in_array($default_role, $allowed_registration_roles, true) && get_role($default_role)) {
            $user = new WP_User($user_id);
            $user->set_role($default_role);
        }

        // Send notification emails
        wp_new_user_notification($user_id, null, 'both');

        // Auto-login if enabled
        if (get_option('memberglut_auto_login_after_register', true)) {
            $creds = array(
                'user_login' => $username,
                'user_password' => $password,
                'remember' => false
            );
            wp_signon($creds, false);
        }

        // Determine redirect URL
        $redirect_url = get_option('memberglut_login_redirect', '');
        if (empty($redirect_url)) {
            $redirect_url = home_url();
        }

        wp_send_json_success(array(
            'message' => esc_html__('Registration successful!', 'memberglut'),
            'redirect_url' => apply_filters('memberglut_register_redirect_url', $redirect_url)
        ));
    }
}