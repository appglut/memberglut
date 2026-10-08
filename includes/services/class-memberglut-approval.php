<?php
/**
 * Account approval (plans/01-dependency-map.md §2.1).
 *
 * `memberglut_account_status` user meta: approved (or missing) | pending_email | pending_admin | rejected.
 * Pending and rejected accounts cannot log in. Subscriptions created while the account is pending stay `pending`
 * and are activated on approval — except those still waiting for a payment (meta.awaiting_payment).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Approval class.
 */
class MemberGlut_Approval {

	const META         = 'memberglut_account_status';
	const KEY_META     = 'memberglut_activation_key';
	const KEY_LIFETIME = 2 * DAY_IN_SECONDS;

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_filter( 'authenticate', array( __CLASS__, 'block_unapproved' ), 30, 3 );
		add_action( 'template_redirect', array( __CLASS__, 'handle_activation_link' ), 1 );
		add_action( 'login_init', array( __CLASS__, 'handle_activation_link' ) );
	}

	/**
	 * Account status.
	 *
	 * @param int $user_id User.
	 * @return string approved|pending_email|pending_admin|rejected
	 */
	public static function status( $user_id ) {
		$s = (string) get_user_meta( $user_id, self::META, true );
		return in_array( $s, array( 'pending_email', 'pending_admin', 'rejected' ), true ) ? $s : 'approved';
	}

	/**
	 * Whether an account waits for approval or confirmation.
	 *
	 * @param int $user_id User.
	 * @return bool
	 */
	public static function is_pending( $user_id ) {
		return in_array( self::status( $user_id ), array( 'pending_email', 'pending_admin' ), true );
	}

	/**
	 * Approval mode for a plan: the plan's own setting, else the global one.
	 *
	 * @param array|null $plan Plan.
	 * @return string auto|email|admin
	 */
	public static function mode_for( $plan = null ) {
		if ( $plan && ! empty( $plan['approval'] ) && 'inherit' !== $plan['approval'] ) {
			return $plan['approval'];
		}
		return memberglut_setting( 'approval', 'auto' );
	}

	/**
	 * Put a new account in a pending state and send the matching emails.
	 *
	 * @param int    $user_id User.
	 * @param string $mode    email|admin.
	 * @return void
	 */
	public static function start( $user_id, $mode ) {
		if ( 'email' === $mode ) {
			update_user_meta( $user_id, self::META, 'pending_email' );
			do_action( 'memberglut_account_pending', $user_id, 'email', self::activation_link( $user_id ) );
		} elseif ( 'admin' === $mode ) {
			update_user_meta( $user_id, self::META, 'pending_admin' );
			do_action( 'memberglut_account_pending', $user_id, 'admin', '' );
		}
		$user = get_userdata( $user_id );
		memberglut_event(
			'pending',
			/* translators: %s: user */
			'email' === $mode ? sprintf( __( '%s must confirm their email address', 'memberglut' ), $user ? $user->display_name : '#' . $user_id ) : sprintf( __( '%s is waiting for approval', 'memberglut' ), $user ? $user->display_name : '#' . $user_id ),
			array( 'user_id' => $user_id, 'object_type' => 'user', 'object_id' => $user_id, 'actor_id' => 0 )
		);
	}

	/**
	 * New activation link (the key is stored hashed).
	 *
	 * @param int $user_id User.
	 * @return string
	 */
	public static function activation_link( $user_id ) {
		$key = wp_generate_password( 32, false );
		update_user_meta( $user_id, self::KEY_META, array( 'hash' => wp_hash_password( $key ), 'expires' => time() + self::KEY_LIFETIME ) );
		$base = memberglut_page_url( 'login' );
		$base = $base ? $base : wp_login_url();
		return add_query_arg( array( 'mg_activate' => rawurlencode( $key ), 'u' => $user_id ), $base );
	}

	/**
	 * Resend the activation email.
	 *
	 * @param int $user_id User.
	 * @return bool
	 */
	public static function resend( $user_id ) {
		if ( 'pending_email' !== self::status( $user_id ) ) {
			return false;
		}
		$throttle = 'memberglut_resend_' . $user_id;
		if ( get_transient( $throttle ) ) {
			return false;
		}
		set_transient( $throttle, 1, 2 * MINUTE_IN_SECONDS );
		do_action( 'memberglut_account_pending', $user_id, 'email', self::activation_link( $user_id ) );
		return true;
	}

	/**
	 * Approve an account: active from now on, pending subscriptions (not waiting for a payment) start.
	 *
	 * @param int  $user_id User.
	 * @param bool $by_email Confirmed through the email link (no "approved" email then).
	 * @return true|WP_Error
	 */
	public static function approve( $user_id, $by_email = false ) {
		$user = get_userdata( $user_id );
		if ( ! $user ) {
			return new WP_Error( 'memberglut_no_user', __( 'User not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		$was = self::status( $user_id );
		delete_user_meta( $user_id, self::META );
		delete_user_meta( $user_id, self::KEY_META );
		foreach ( MemberGlut_Subscription_Service::for_user( $user_id ) as $sub ) {
			if ( 'pending' === $sub['status'] && empty( $sub['meta']['awaiting_payment'] ) ) {
				MemberGlut_Subscription_Service::activate( $sub['id'] );
			}
		}
		if ( 'approved' !== $was ) {
			memberglut_event(
				'approve',
				/* translators: %s: user */
				$by_email ? sprintf( __( '%s confirmed their email address', 'memberglut' ), $user->display_name ) : sprintf( __( '%s was approved', 'memberglut' ), $user->display_name ),
				array( 'user_id' => $user_id, 'object_type' => 'user', 'object_id' => $user_id )
			);
			if ( ! $by_email ) {
				do_action( 'memberglut_member_approved', $user_id );
			}
			do_action( 'memberglut_account_activated', $user_id, $by_email );
		}
		return true;
	}

	/**
	 * Reject an account: it can't log in; pending subscriptions are abandoned.
	 *
	 * @param int $user_id User.
	 * @return true|WP_Error
	 */
	public static function reject( $user_id ) {
		$user = get_userdata( $user_id );
		if ( ! $user ) {
			return new WP_Error( 'memberglut_no_user', __( 'User not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( user_can( $user, 'manage_options' ) ) {
			return new WP_Error( 'memberglut_protected', __( 'Administrators cannot be rejected.', 'memberglut' ), array( 'status' => 403 ) );
		}
		update_user_meta( $user_id, self::META, 'rejected' );
		foreach ( MemberGlut_Subscription_Service::for_user( $user_id ) as $sub ) {
			if ( 'pending' === $sub['status'] ) {
				MemberGlut_Subscription_Service::abandon( $sub['id'] );
			}
		}
		WP_Session_Tokens::get_instance( $user_id )->destroy_all();
		/* translators: %s: user */
		memberglut_event( 'reject', sprintf( __( '%s was rejected', 'memberglut' ), $user->display_name ), array( 'user_id' => $user_id, 'object_type' => 'user', 'object_id' => $user_id ) );
		do_action( 'memberglut_member_rejected', $user_id );
		return true;
	}

	/**
	 * Pending or rejected accounts can't log in (our forms and wp-login.php).
	 *
	 * @param WP_User|WP_Error|null $user     User.
	 * @param string                $username Username.
	 * @param string                $password Password.
	 * @return WP_User|WP_Error|null
	 */
	public static function block_unapproved( $user, $username, $password ) {
		if ( ! $user instanceof WP_User || user_can( $user, 'manage_options' ) ) {
			return $user;
		}
		switch ( self::status( $user->ID ) ) {
			case 'pending_email':
				$resend = add_query_arg( array( 'mg_resend' => $user->ID, '_mgnonce' => wp_create_nonce( 'memberglut_resend_' . $user->ID ) ), memberglut_page_url( 'login' ) ? memberglut_page_url( 'login' ) : wp_login_url() );
				/* translators: %s: link */
				return new WP_Error( 'memberglut_pending_email', sprintf( __( 'Please confirm your email address first. We sent you a link. <a href="%s">Send it again</a>', 'memberglut' ), esc_url( $resend ) ) );
			case 'pending_admin':
				return new WP_Error( 'memberglut_pending_admin', __( 'Your account is waiting for approval. We will email you once it is approved.', 'memberglut' ) );
			case 'rejected':
				return new WP_Error( 'memberglut_rejected', __( 'Your registration was not approved.', 'memberglut' ) );
		}
		return $user;
	}

	/**
	 * Activation link and "send it again" link (front end on the login page, or wp-login.php).
	 *
	 * @return void
	 */
	public static function handle_activation_link() {
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- The emailed key (activation) or a nonce (resend) is checked below.
		if ( isset( $_GET['mg_resend'], $_GET['_mgnonce'] ) ) {
			$uid = absint( $_GET['mg_resend'] );
			if ( wp_verify_nonce( sanitize_text_field( wp_unslash( $_GET['_mgnonce'] ) ), 'memberglut_resend_' . $uid ) ) {
				self::resend( $uid );
			}
			memberglut_flash( 'success', __( 'If your account is waiting for confirmation, we sent the link again. Check your inbox.', 'memberglut' ) );
			wp_safe_redirect( remove_query_arg( array( 'mg_resend', '_mgnonce' ) ) );
			exit;
		}
		if ( empty( $_GET['mg_activate'] ) || empty( $_GET['u'] ) ) {
			return;
		}
		$uid  = absint( $_GET['u'] );
		$key  = sanitize_text_field( wp_unslash( $_GET['mg_activate'] ) );
		// phpcs:enable
		$data = get_user_meta( $uid, self::KEY_META, true );
		$back = remove_query_arg( array( 'mg_activate', 'u' ) );
		if ( 'pending_email' === self::status( $uid ) && is_array( $data ) && ! empty( $data['hash'] ) && $data['expires'] > time() && wp_check_password( $key, $data['hash'] ) ) {
			self::approve( $uid, true );
			memberglut_flash( 'success', __( 'Thanks, your email address is confirmed. You can log in now.', 'memberglut' ) );
			if ( memberglut_setting( 'auto_login', true ) && ! is_user_logged_in() ) {
				wp_set_current_user( $uid );
				wp_set_auth_cookie( $uid, false );
				// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- Core / third-party hook fired on purpose.
				do_action( 'wp_login', get_userdata( $uid )->user_login, get_userdata( $uid ) );
				wp_safe_redirect( MemberGlut_Redirects::after_registration( $uid ) );
				exit;
			}
		} elseif ( 'approved' === self::status( $uid ) ) {
			memberglut_flash( 'success', __( 'Your email address is already confirmed. You can log in.', 'memberglut' ) );
		} else {
			memberglut_flash( 'error', __( 'This confirmation link is invalid or has expired. Log in to get a new one.', 'memberglut' ) );
		}
		wp_safe_redirect( $back );
		exit;
	}
}
