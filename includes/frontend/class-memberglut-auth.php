<?php
/**
 * Front-end authentication: registration (with plan choice), login, lost and reset password.
 *
 * Every form works with JavaScript (REST /public/*) and without (POST to the same page, handled on
 * template_redirect). Both paths call the same methods here.
 *
 * Reads: Login & registration settings, Redirects (§2.4), approval (§2.1), Forms & Pages fields, captcha/honeypot.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Auth class.
 */
class MemberGlut_Auth {

	/**
	 * Result of a non-JS submission, shown by the form on the same request.
	 *
	 * @var array
	 */
	public static $results = array();

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'template_redirect', array( __CLASS__, 'handle_post' ), 5 );
		add_action( 'template_redirect', array( __CLASS__, 'skip_forms_when_logged_in' ), 6 );
		add_filter( 'login_redirect', array( __CLASS__, 'login_redirect' ), 20, 3 );
		add_filter( 'logout_redirect', array( __CLASS__, 'logout_redirect' ), 20, 3 );
		add_action( 'retrieve_password_key', array( __CLASS__, 'core_reset_key' ), 10, 2 );
		add_filter( 'send_retrieve_password_email', array( __CLASS__, 'suppress_core_reset_email' ), 10, 3 );
		add_action( 'after_password_reset', array( __CLASS__, 'after_core_reset' ) );
	}

	/* ---------------------------------------------------------------------
	 * Helpers
	 * ------------------------------------------------------------------ */

	/**
	 * Password reset URL: the Lost password page when set (and replace_wp_pages is on), else wp-login.php.
	 *
	 * @param WP_User $user User.
	 * @param string  $key  Reset key.
	 * @return string
	 */
	public static function reset_url( $user, $key ) {
		$page = memberglut_page_url( 'lost' );
		if ( $page && memberglut_setting( 'replace_wp_pages', true ) ) {
			return add_query_arg( array( 'key' => rawurlencode( $key ), 'login' => rawurlencode( $user->user_login ) ), $page );
		}
		return network_site_url( 'wp-login.php?action=rp&key=' . rawurlencode( $key ) . '&login=' . rawurlencode( $user->user_login ), 'login' );
	}

	/**
	 * Send the MemberGlut password reset email.
	 *
	 * @param WP_User $user User.
	 * @return true|WP_Error
	 */
	public static function send_reset( $user ) {
		$key = get_password_reset_key( $user );
		if ( is_wp_error( $key ) ) {
			return $key;
		}
		$ok = MemberGlut_Mailer::send( 'reset_password', null, array( 'user' => $user, 'reset_link' => self::reset_url( $user, $key ) ), null, true );
		if ( ! $ok ) {
			return new WP_Error( 'memberglut_mail_failed', __( 'The email could not be sent. Please contact us.', 'memberglut' ), array( 'status' => 500 ) );
		}
		memberglut_event( 'password_reset', __( 'Password reset email sent', 'memberglut' ), array( 'user_id' => $user->ID, 'object_type' => 'user', 'object_id' => $user->ID, 'actor_id' => get_current_user_id() ) );
		return true;
	}

	/**
	 * Whether an email may register (Allowed email addresses: whitelist / blacklist; blacklist wins).
	 *
	 * @param string $email Email.
	 * @return bool
	 */
	public static function email_allowed( $email ) {
		$email  = strtolower( trim( $email ) );
		$domain = substr( strrchr( $email, '@' ), 0 );
		$match  = static function ( $list ) use ( $email, $domain ) {
			foreach ( (array) $list as $entry ) {
				$entry = strtolower( trim( $entry ) );
				if ( '' === $entry ) {
					continue;
				}
				if ( 0 === strpos( $entry, '@' ) ? ( $domain === $entry || '.' . ltrim( substr( $entry, 1 ), '.' ) === substr( $domain, -strlen( '.' . ltrim( substr( $entry, 1 ), '.' ) ) ) ) : $entry === $email ) {
					return true;
				}
			}
			return false;
		};
		if ( $match( memberglut_setting( 'email_blacklist', array() ) ) ) {
			return false;
		}
		$white = (array) memberglut_setting( 'email_whitelist', array() );
		return ! $white || $match( $white );
	}

	/**
	 * Plan requested by the form (attribute, ?plan= or the picker).
	 *
	 * @param array $data Submitted data.
	 * @return array|null
	 */
	public static function requested_plan( $data ) {
		$v = isset( $data['plan'] ) ? $data['plan'] : '';
		if ( '' === $v || null === $v ) {
			return null;
		}
		return MemberGlut_Plans::get( is_numeric( $v ) ? (int) $v : sanitize_title( (string) $v ) );
	}

	/**
	 * Plans offered in the registration plan picker.
	 *
	 * @param int $user_id User (0 = visitor).
	 * @return array[]
	 */
	public static function pickable_plans( $user_id = 0 ) {
		$out = array();
		foreach ( MemberGlut_Plans::all( 'active' ) as $p ) {
			if ( $p['hide_in_table'] ) {
				continue;
			}
			if ( true === MemberGlut_Plans::can_join( $p, $user_id ) ) {
				$out[] = $p;
			}
		}
		return $out;
	}

	/* ---------------------------------------------------------------------
	 * Registration
	 * ------------------------------------------------------------------ */

	/**
	 * Register (visitor) or join a plan (logged-in member).
	 *
	 * @param array $data Raw form data: mg[] fields, plan, coupon, redirect_to, gateway, captcha/honeypot fields.
	 * @return array|WP_Error [ redirect, message, checkout? ]
	 */
	public static function register( $data ) {
		$input   = isset( $data['mg'] ) && is_array( $data['mg'] ) ? $data['mg'] : array();
		$user_id = get_current_user_id();
		$errors  = array();
		$plan    = self::requested_plan( $data );

		$guard = MemberGlut_Form_Guard::verify( $plan && 'paid' === $plan['type'] ? 'checkout' : 'register', $data );
		if ( is_wp_error( $guard ) ) {
			return $guard;
		}
		if ( ! $user_id && ! memberglut_setting( 'allow_registration', true ) ) {
			return new WP_Error( 'memberglut_registration_closed', __( 'Registration is closed.', 'memberglut' ), array( 'status' => 403 ) );
		}
		if ( ! empty( $data['plan'] ) && ! $plan ) {
			return new WP_Error( 'memberglut_plan', __( 'This plan does not exist.', 'memberglut' ), array( 'status' => 400, 'fields' => array( 'plan' => __( 'Choose a plan.', 'memberglut' ) ) ) );
		}
		if ( ! $plan && self::pickable_plans( $user_id ) && 'none' !== ( isset( $data['plan'] ) ? $data['plan'] : '' ) ) {
			$errors['plan'] = __( 'Choose a plan.', 'memberglut' );
		}
		if ( $plan ) {
			$renewal = class_exists( 'MemberGlut_Checkout' ) && MemberGlut_Checkout::renewable_sub( $user_id, $plan );
			$can     = MemberGlut_Plans::can_join( $plan, $user_id );
			// Renewing a plan you have is not “joining”: buyer restrictions don't apply.
			if ( is_wp_error( $can ) && ! ( $renewal && in_array( $can->get_error_code(), array( 'memberglut_plan_new_only', 'memberglut_plan_members_only', 'memberglut_plan_sold_out' ), true ) ) ) {
				$errors['plan'] = $can->get_error_message();
			}
			if ( ! $renewal && $user_id && MemberGlut_Subscription_Service::user_has_plan( $user_id, $plan['id'] ) ) {
				$errors['plan'] = __( 'You already have this plan.', 'memberglut' );
			}
		}

		$clean = array();
		if ( ! $user_id ) {
			list( $clean, $field_errors ) = MemberGlut_Fields::validate( MemberGlut_Fields::registration_fields(), $input );
			$errors                       = array_merge( $errors, $field_errors );
			$email                        = isset( $clean['email'] ) ? $clean['email'] : '';
			if ( $email && empty( $errors['email'] ) ) {
				if ( email_exists( $email ) ) {
					$login = memberglut_page_url( 'login' ) ? memberglut_page_url( 'login' ) : wp_login_url();
					/* translators: %s: login link */
					$errors['email'] = sprintf( __( 'An account with this email already exists. <a href="%s">Log in</a> instead.', 'memberglut' ), esc_url( $login ) );
				} elseif ( ! self::email_allowed( $email ) ) {
					$errors['email'] = __( 'Registration with this email address is not allowed.', 'memberglut' );
				}
			}
			if ( isset( $clean['username'] ) && '' !== $clean['username'] ) {
				$username = sanitize_user( $clean['username'], true );
				if ( ! validate_username( $username ) || $username !== $clean['username'] ) {
					$errors['username'] = __( 'Use letters, numbers and . _ - @ only.', 'memberglut' );
				} elseif ( username_exists( $username ) ) {
					$errors['username'] = __( 'This username is taken.', 'memberglut' );
				}
			}
			if ( isset( $clean['password'] ) && empty( $errors['password'] ) ) {
				$check = MemberGlut_Fields::check_password( $clean['password'] );
				if ( true !== $check ) {
					$errors['password'] = $check;
				}
			}
			if ( isset( $clean['password_confirm'] ) && isset( $clean['password'] ) && $clean['password'] !== $clean['password_confirm'] && empty( $errors['password'] ) ) {
				$errors['password_confirm'] = __( 'The passwords do not match.', 'memberglut' );
			}
			$errors = array_merge( $errors, MemberGlut_Agreements::validate( 'register', $input ) );
		}
		if ( $plan && 'paid' === $plan['type'] ) {
			$errors = array_merge( $errors, MemberGlut_Agreements::validate( 'checkout', $input, $user_id ) );
			if ( class_exists( 'MemberGlut_Checkout' ) ) {
				$errors = array_merge( $errors, MemberGlut_Checkout::validate( $plan, $data, $user_id ) );
			}
		}
		$errors = apply_filters( 'memberglut_registration_validate', $errors, $data, $plan, $user_id );
		if ( $errors ) {
			return new WP_Error( 'memberglut_invalid', __( 'Please check the highlighted fields.', 'memberglut' ), array( 'status' => 400, 'fields' => $errors ) );
		}

		// Create the account.
		$new_user = false;
		if ( ! $user_id ) {
			$user_id = self::create_user( $clean );
			if ( is_wp_error( $user_id ) ) {
				return $user_id;
			}
			$new_user = true;
			MemberGlut_Agreements::record( 'register', $user_id );
		}
		if ( $plan && 'paid' === $plan['type'] ) {
			MemberGlut_Agreements::record( 'checkout', $user_id, $new_user ? $user_id : $user_id );
		}

		$mode     = MemberGlut_Approval::mode_for( $plan );
		$approved = ! $new_user || 'auto' === $mode;
		$result   = array( 'redirect' => '', 'message' => '' );

		// Join the plan.
		if ( $plan && 'free' === $plan['type'] ) {
			$joined = self::join_free_plan( $user_id, $plan, $approved );
			if ( is_wp_error( $joined ) ) {
				return $joined;
			}
		} elseif ( $plan && 'paid' === $plan['type'] ) {
			if ( ! class_exists( 'MemberGlut_Checkout' ) ) {
				return new WP_Error( 'memberglut_no_checkout', __( 'Payments are not available.', 'memberglut' ), array( 'status' => 500 ) );
			}
			$checkout = MemberGlut_Checkout::start( $user_id, $plan, $data, $approved );
			if ( is_wp_error( $checkout ) ) {
				return $checkout;
			}
			$result['checkout'] = $checkout;
		} elseif ( $new_user && memberglut_setting( 'default_plan' ) ) {
			$default = MemberGlut_Plans::get( (int) memberglut_setting( 'default_plan' ) );
			if ( $default && 'active' === $default['status'] ) {
				MemberGlut_Subscription_Service::create( $user_id, $default['id'], array( 'status' => $approved ? 'active' : 'pending', 'source' => 'default_plan', 'send_email' => false ) );
			}
		}

		if ( $new_user ) {
			do_action( 'memberglut_user_registered', $user_id, array( 'plan' => $plan, 'source' => 'registration' ) );
			if ( ! $approved ) {
				MemberGlut_Approval::start( $user_id, $mode );
			}
		}

		$requested = isset( $data['redirect_to'] ) ? (string) $data['redirect_to'] : '';
		if ( $new_user && $approved && memberglut_setting( 'auto_login', true ) && ! is_user_logged_in() ) {
			wp_set_current_user( $user_id );
			wp_set_auth_cookie( $user_id, false, is_ssl() );
			do_action( 'wp_login', get_userdata( $user_id )->user_login, get_userdata( $user_id ) );
		}

		if ( ! empty( $result['checkout']['redirect'] ) ) {
			$result['redirect'] = $result['checkout']['redirect'];
		} elseif ( ! empty( $result['checkout']['client'] ) ) {
			// The browser finishes the payment, then goes to checkout.return_url.
			$result['redirect'] = '';
		} elseif ( ! $approved ) {
			$result['message'] = 'email' === $mode
				? __( 'Almost done! We sent you an email. Click the link in it to confirm your address and activate your account.', 'memberglut' )
				: __( 'Thanks for signing up! Your account is waiting for approval. We will email you once it is approved.', 'memberglut' );
		} else {
			$result['redirect'] = is_user_logged_in()
				? MemberGlut_Redirects::after_registration( $user_id, $plan, $requested )
				: ( memberglut_page_url( 'login' ) ? add_query_arg( 'registered', 1, memberglut_page_url( 'login' ) ) : wp_login_url() );
			if ( ! is_user_logged_in() ) {
				memberglut_flash( 'success', __( 'Your account is ready. Please log in.', 'memberglut' ) );
			}
		}
		return apply_filters( 'memberglut_registration_result', $result, $user_id, $plan );
	}

	/**
	 * Create the WordPress user from validated fields.
	 *
	 * @param array $clean Clean values.
	 * @return int|WP_Error
	 */
	private static function create_user( $clean ) {
		$email    = $clean['email'];
		$username = ! empty( $clean['username'] ) ? sanitize_user( $clean['username'], true ) : MemberGlut_Members::username_from_email( $email );
		$first    = isset( $clean['first_name'] ) ? $clean['first_name'] : '';
		$last     = isset( $clean['last_name'] ) ? $clean['last_name'] : '';
		$display  = ! empty( $clean['display_name'] ) ? $clean['display_name'] : trim( $first . ' ' . $last );
		MemberGlut_Subscription_Service::$suppress_default_plan = true;
		$user_id = wp_insert_user(
			array(
				'user_login'   => $username,
				'user_email'   => $email,
				'user_pass'    => $clean['password'],
				'first_name'   => $first,
				'last_name'    => $last,
				'display_name' => $display ? $display : $username,
				'user_url'     => isset( $clean['website'] ) ? $clean['website'] : '',
				'description'  => isset( $clean['bio'] ) ? $clean['bio'] : '',
				'role'         => get_option( 'default_role', 'subscriber' ),
			)
		);
		MemberGlut_Subscription_Service::$suppress_default_plan = false;
		if ( is_wp_error( $user_id ) ) {
			return new WP_Error( 'memberglut_user_error', $user_id->get_error_message(), array( 'status' => 400 ) );
		}
		$custom = array();
		foreach ( MemberGlut_Settings::custom_fields() as $f ) {
			if ( array_key_exists( $f['key'], $clean ) ) {
				$custom[ $f['key'] ] = $clean[ $f['key'] ];
			}
		}
		MemberGlut_Fields::save( $user_id, $custom );
		update_user_meta( $user_id, 'memberglut_registered_via', 'form' );
		/* translators: %s: user */
		memberglut_event( 'registered', sprintf( __( '%s registered', 'memberglut' ), $display ? $display : $username ), array( 'user_id' => $user_id, 'object_type' => 'user', 'object_id' => $user_id, 'actor_id' => 0 ) );
		return $user_id;
	}

	/**
	 * Join a free plan. A plan already held in the same group is replaced (one plan per group).
	 *
	 * @param int   $user_id  User.
	 * @param array $plan     Plan.
	 * @param bool  $approved Account approved.
	 * @return array|WP_Error
	 */
	public static function join_free_plan( $user_id, $plan, $approved = true ) {
		$current = MemberGlut_Subscription_Service::in_group( $user_id, $plan['group'] );
		if ( $current ) {
			// Moving to a free plan ends the current one (and its billing) first.
			MemberGlut_Subscription_Service::cancel( $current['id'], true, true );
		}
		return MemberGlut_Subscription_Service::create( $user_id, $plan['id'], array( 'status' => $approved ? 'active' : 'pending', 'source' => 'registration' ) );
	}

	/* ---------------------------------------------------------------------
	 * Login
	 * ------------------------------------------------------------------ */

	/**
	 * Log in.
	 *
	 * @param array $data log, pwd, remember, redirect_to + guard fields.
	 * @return array|WP_Error [ redirect ]
	 */
	public static function login( $data ) {
		$guard = MemberGlut_Form_Guard::verify( 'login', $data );
		if ( is_wp_error( $guard ) ) {
			return $guard;
		}
		$login = isset( $data['log'] ) ? trim( wp_unslash( (string) $data['log'] ) ) : '';
		$pass  = isset( $data['pwd'] ) ? (string) $data['pwd'] : '';
		if ( '' === $login || '' === $pass ) {
			return new WP_Error( 'memberglut_empty', __( 'Enter your username or email and your password.', 'memberglut' ), array( 'status' => 400 ) );
		}
		$with = memberglut_form_setting( 'login_with', 'both' );
		if ( 'email' === $with && ! is_email( $login ) ) {
			return new WP_Error( 'memberglut_email_only', __( 'Log in with your email address.', 'memberglut' ), array( 'status' => 400 ) );
		}
		if ( 'username' === $with && is_email( $login ) ) {
			return new WP_Error( 'memberglut_username_only', __( 'Log in with your username.', 'memberglut' ), array( 'status' => 400 ) );
		}
		if ( is_email( $login ) ) {
			$u = get_user_by( 'email', $login );
			if ( $u ) {
				$login = $u->user_login;
			}
		}
		$remember = ! empty( $data['remember'] ) && memberglut_form_setting( 'login_remember', true ) && ! memberglut_setting( 'logout_on_close', false );
		$user     = wp_signon( array( 'user_login' => $login, 'user_password' => $pass, 'remember' => $remember ), is_ssl() );
		if ( is_wp_error( $user ) ) {
			$code = $user->get_error_code();
			if ( in_array( $code, array( 'invalid_username', 'invalid_email', 'incorrect_password' ), true ) ) {
				return new WP_Error( 'memberglut_login_failed', __( 'The username / email or password is not correct.', 'memberglut' ), array( 'status' => 401 ) );
			}
			return new WP_Error( $code, $user->get_error_message(), array( 'status' => 401 ) );
		}
		wp_set_current_user( $user->ID );
		return array( 'redirect' => MemberGlut_Redirects::after_login( $user->ID, isset( $data['redirect_to'] ) ? (string) $data['redirect_to'] : '' ) );
	}

	/* ---------------------------------------------------------------------
	 * Lost / reset password
	 * ------------------------------------------------------------------ */

	/**
	 * Send a reset link. Always answers the same way so accounts can't be discovered.
	 *
	 * @param array $data user_login + guard fields.
	 * @return array|WP_Error
	 */
	public static function lost_password( $data ) {
		$guard = MemberGlut_Form_Guard::verify( 'lost_password', $data );
		if ( is_wp_error( $guard ) ) {
			return $guard;
		}
		$login = isset( $data['user_login'] ) ? trim( sanitize_text_field( wp_unslash( (string) $data['user_login'] ) ) ) : '';
		if ( '' === $login ) {
			return new WP_Error( 'memberglut_empty', __( 'Enter your username or email address.', 'memberglut' ), array( 'status' => 400, 'fields' => array( 'user_login' => __( 'Enter your username or email address.', 'memberglut' ) ) ) );
		}
		$user = is_email( $login ) ? get_user_by( 'email', $login ) : get_user_by( 'login', $login );
		$key  = 'memberglut_lost_' . md5( strtolower( $login ) . memberglut_client_ip() );
		if ( $user && ! get_transient( $key ) ) {
			set_transient( $key, 1, MINUTE_IN_SECONDS );
			self::send_reset( $user );
		}
		return array( 'message' => __( 'If an account matches, we sent an email with a link to set a new password. Check your inbox.', 'memberglut' ) );
	}

	/**
	 * Set a new password from a reset link.
	 *
	 * @param array $data key, login, pass1, pass2.
	 * @return array|WP_Error
	 */
	public static function reset_password( $data ) {
		$key   = isset( $data['key'] ) ? sanitize_text_field( wp_unslash( (string) $data['key'] ) ) : '';
		$login = isset( $data['login'] ) ? sanitize_user( wp_unslash( (string) $data['login'] ) ) : '';
		$user  = check_password_reset_key( $key, $login );
		if ( is_wp_error( $user ) ) {
			return new WP_Error( 'memberglut_invalid_key', __( 'This password reset link is invalid or has expired. Request a new one.', 'memberglut' ), array( 'status' => 400 ) );
		}
		$p1 = isset( $data['pass1'] ) ? (string) $data['pass1'] : '';
		$p2 = isset( $data['pass2'] ) ? (string) $data['pass2'] : '';
		$ok = MemberGlut_Fields::check_password( $p1 );
		if ( true !== $ok ) {
			return new WP_Error( 'memberglut_weak', $ok, array( 'status' => 400, 'fields' => array( 'pass1' => $ok ) ) );
		}
		if ( $p1 !== $p2 ) {
			return new WP_Error( 'memberglut_mismatch', __( 'The passwords do not match.', 'memberglut' ), array( 'status' => 400, 'fields' => array( 'pass2' => __( 'The passwords do not match.', 'memberglut' ) ) ) );
		}
		remove_action( 'after_password_reset', array( __CLASS__, 'after_core_reset' ) );
		reset_password( $user, $p1 );
		MemberGlut_Mailer::send( 'password_changed', null, array( 'user' => $user ) );
		memberglut_event( 'password_changed', __( 'Password changed with a reset link', 'memberglut' ), array( 'user_id' => $user->ID, 'object_type' => 'user', 'object_id' => $user->ID, 'actor_id' => $user->ID ) );
		memberglut_flash( 'success', __( 'Your password has been changed. You can log in now.', 'memberglut' ) );
		$login_url = memberglut_page_url( 'login' ) ? memberglut_page_url( 'login' ) : wp_login_url();
		return array( 'redirect' => $login_url, 'message' => __( 'Your password has been changed. You can log in now.', 'memberglut' ) );
	}

	/* ---------------------------------------------------------------------
	 * Non-JS submissions
	 * ------------------------------------------------------------------ */

	/**
	 * Forms post back to their own page with mg_action; process before output.
	 *
	 * @return void
	 */
	public static function handle_post() {
		if ( 'POST' !== ( isset( $_SERVER['REQUEST_METHOD'] ) ? $_SERVER['REQUEST_METHOD'] : '' ) || empty( $_POST['mg_action'] ) ) { // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
			return;
		}
		$action = sanitize_key( wp_unslash( $_POST['mg_action'] ) );
		$nonce  = isset( $_POST['_mgnonce'] ) ? sanitize_text_field( wp_unslash( $_POST['_mgnonce'] ) ) : '';
		if ( ! wp_verify_nonce( $nonce, 'memberglut_' . $action ) ) {
			self::$results[ $action ] = new WP_Error( 'memberglut_nonce', __( 'Your session expired. Please try again.', 'memberglut' ) );
			return;
		}
		$data = wp_unslash( $_POST ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Each handler sanitizes its own fields.
		switch ( $action ) {
			case 'register':
				$res = self::register( $data );
				break;
			case 'login':
				$res = self::login( $data );
				break;
			case 'lost_password':
				$res = self::lost_password( $data );
				break;
			case 'reset_password':
				$res = self::reset_password( $data );
				break;
			default:
				$res = apply_filters( 'memberglut_form_action', null, $action, $data );
		}
		if ( null === $res ) {
			return;
		}
		if ( ! is_wp_error( $res ) && ! empty( $res['redirect'] ) ) {
			wp_safe_redirect( $res['redirect'] );
			exit;
		}
		self::$results[ $action ] = $res;
	}

	/**
	 * Logged-in users who open the login or registration page go to My Account (Redirects setting).
	 *
	 * @return void
	 */
	public static function skip_forms_when_logged_in() {
		if ( ! is_user_logged_in() || ! is_singular() || ! memberglut_setting( 'redirect_logged_in_from_forms', true ) ) {
			return;
		}
		$id = (int) get_queried_object_id();
		// The registration page stays available to members who choose a plan (?plan=) — it is the checkout.
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only.
		if ( $id === memberglut_page_id( 'register' ) && ! empty( $_GET['plan'] ) ) {
			return;
		}
		if ( in_array( $id, array_filter( array( memberglut_page_id( 'login' ), memberglut_page_id( 'register' ) ) ), true ) && memberglut_page_url( 'account' ) && memberglut_page_id( 'account' ) !== $id ) {
			wp_safe_redirect( memberglut_page_url( 'account' ) );
			exit;
		}
	}

	/* ---------------------------------------------------------------------
	 * WordPress core integration
	 * ------------------------------------------------------------------ */

	/**
	 * Logins through wp-login.php follow the same redirect rules.
	 *
	 * @param string           $redirect_to Default.
	 * @param string           $requested   Requested.
	 * @param WP_User|WP_Error $user        User.
	 * @return string
	 */
	public static function login_redirect( $redirect_to, $requested, $user ) {
		if ( ! $user instanceof WP_User ) {
			return $redirect_to;
		}
		// An explicit request (e.g. back to wp-admin after a session timeout) is kept for admins.
		if ( user_can( $user, 'manage_options' ) && $requested ) {
			return $redirect_to;
		}
		return MemberGlut_Redirects::after_login( $user->ID, $requested );
	}

	/**
	 * Logout redirects (per-role, then global).
	 *
	 * @param string  $redirect_to Default.
	 * @param string  $requested   Requested.
	 * @param WP_User $user        User.
	 * @return string
	 */
	public static function logout_redirect( $redirect_to, $requested, $user ) {
		if ( $requested && false === strpos( $requested, 'wp-login.php' ) ) {
			return $redirect_to;
		}
		return MemberGlut_Redirects::after_logout( $user instanceof WP_User ? $user->ID : 0 );
	}

	/**
	 * Core lost-password requests: send our email (with a link to the Lost password page) instead of WordPress’s.
	 *
	 * @param string $user_login Login.
	 * @param string $key        Key.
	 * @return void
	 */
	public static function core_reset_key( $user_login, $key ) {
		if ( ! self::takes_over_reset_email() || did_action( 'memberglut_sending_own_reset' ) ) {
			return;
		}
		$user = get_user_by( 'login', $user_login );
		if ( $user && doing_action( 'retrieve_password_key' ) && did_action( 'retrieve_password' ) ) {
			do_action( 'memberglut_sending_own_reset' );
			MemberGlut_Mailer::send( 'reset_password', null, array( 'user' => $user, 'reset_link' => self::reset_url( $user, $key ) ), null, true );
		}
	}

	/**
	 * Don't send the core reset email when ours is sent.
	 *
	 * @param bool    $send       Send.
	 * @param string  $user_login Login.
	 * @param WP_User $user_data  User.
	 * @return bool
	 */
	public static function suppress_core_reset_email( $send, $user_login, $user_data ) {
		return self::takes_over_reset_email() ? false : $send;
	}

	/**
	 * Whether the MemberGlut reset email replaces the core one.
	 *
	 * @return bool
	 */
	private static function takes_over_reset_email() {
		$email = MemberGlut_Mailer::get( 'reset_password' );
		return memberglut_setting( 'replace_wp_pages', true ) && $email && ! empty( $email['enabled'] );
	}

	/**
	 * Password reset through wp-login.php → “Password changed” email.
	 *
	 * @param WP_User $user User.
	 * @return void
	 */
	public static function after_core_reset( $user ) {
		MemberGlut_Mailer::send( 'password_changed', null, array( 'user' => $user ) );
	}
}
