<?php
/**
 * Login security (Global Settings › Security, Captcha):
 *
 *  - login history in the logins table (device, IP, last seen, ended) + memberglut_last_login
 *  - simultaneous sessions limit (logout_oldest | block), administrators exempt (D20)
 *  - failed-login lockout per username and per IP — wp-login, MemberGlut forms and XML-RPC all go through `authenticate`
 *  - “Log out when the browser closes” (no persistent cookie), also on wp-login.php
 *  - captcha on the wp-login.php login / register / lost password forms (MemberGlut forms use MemberGlut_Form_Guard)
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Security class.
 */
class MemberGlut_Security {

	const LAST_SEEN_META = 'memberglut_last_seen';
	const SEEN_EVERY     = 300;

	/**
	 * Session token created by the login in progress (from set_logged_in_cookie).
	 *
	 * @var string
	 */
	private static $new_token = '';

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_filter( 'authenticate', array( __CLASS__, 'check_lockout' ), 99, 2 );
		add_filter( 'authenticate', array( __CLASS__, 'check_sessions' ), 100 );
		add_action( 'wp_login_failed', array( __CLASS__, 'login_failed' ), 10, 2 );
		add_action( 'set_logged_in_cookie', array( __CLASS__, 'capture_token' ), 10, 6 );
		add_action( 'wp_login', array( __CLASS__, 'on_login' ), 20, 2 );
		add_action( 'wp_logout', array( __CLASS__, 'on_logout' ) );
		add_action( 'init', array( __CLASS__, 'touch_session' ), 20 );

		// wp-login.php.
		add_action( 'login_init', array( __CLASS__, 'wp_login_no_remember' ), 5 );
		add_action( 'login_head', array( __CLASS__, 'wp_login_css' ) );
		add_action( 'login_form', array( __CLASS__, 'wp_login_captcha_login' ) );
		add_action( 'register_form', array( __CLASS__, 'wp_login_captcha_register' ) );
		add_action( 'lostpassword_form', array( __CLASS__, 'wp_login_captcha_lost' ) );
		add_filter( 'authenticate', array( __CLASS__, 'wp_login_verify_login' ), 30 );
		add_filter( 'registration_errors', array( __CLASS__, 'wp_login_verify_register' ) );
		add_action( 'lostpassword_post', array( __CLASS__, 'wp_login_verify_lost' ) );
	}

	/* ---------------------------------------------------------------------
	 * Failed logins
	 * ------------------------------------------------------------------ */

	/**
	 * Transient keys of a username and the current IP.
	 *
	 * @param string $username Username or email.
	 * @return array [ user key, ip key ]
	 */
	private static function keys( $username ) {
		return array(
			'memberglut_fl_u_' . md5( strtolower( trim( (string) $username ) ) ),
			'memberglut_fl_ip_' . md5( memberglut_client_ip() ),
		);
	}

	/**
	 * Attempts allowed per IP (several people can share one).
	 *
	 * @return int
	 */
	private static function ip_limit() {
		return (int) apply_filters( 'memberglut_failed_login_ip_limit', (int) memberglut_setting( 'failed_attempts', 5 ) * 2 );
	}

	/**
	 * Seconds left of a lockout for a username / the current IP (0 = not locked).
	 *
	 * @param string $username Username.
	 * @return int
	 */
	public static function locked_for( $username ) {
		if ( ! memberglut_setting( 'limit_failed', true ) ) {
			return 0;
		}
		$left = 0;
		foreach ( self::keys( $username ) as $key ) {
			$until = (int) get_transient( $key . '_lock' );
			if ( $until > time() ) {
				$left = max( $left, $until - time() );
			}
		}
		return $left;
	}

	/**
	 * Refuse logins while locked, even with the right password.
	 *
	 * @param WP_User|WP_Error|null $user     Result so far.
	 * @param string                $username Username.
	 * @return WP_User|WP_Error|null
	 */
	public static function check_lockout( $user, $username ) {
		if ( '' === (string) $username ) {
			return $user;
		}
		$left = self::locked_for( $username );
		if ( $left ) {
			$minutes = (int) ceil( $left / MINUTE_IN_SECONDS );
			return new WP_Error(
				'memberglut_locked',
				/* translators: %d: minutes */
				sprintf( _n( 'Too many failed login attempts. Please try again in %d minute.', 'Too many failed login attempts. Please try again in %d minutes.', $minutes, 'memberglut' ), $minutes )
			);
		}
		return $user;
	}

	/**
	 * Count a failed login.
	 *
	 * @param string   $username Username.
	 * @param WP_Error $error    Error (WP 5.4+).
	 * @return void
	 */
	public static function login_failed( $username, $error = null ) {
		if ( ! memberglut_setting( 'limit_failed', true ) || '' === (string) $username ) {
			return;
		}
		// Refusals that are not a wrong password don't count (lockout itself, captcha, session limit…).
		if ( $error instanceof WP_Error && ! array_intersect( $error->get_error_codes(), array( 'invalid_username', 'invalid_email', 'incorrect_password' ) ) ) {
			return;
		}
		$window = max( 1, (int) memberglut_setting( 'lockout_minutes', 15 ) ) * MINUTE_IN_SECONDS;
		$limits = array( (int) memberglut_setting( 'failed_attempts', 5 ), self::ip_limit() );
		foreach ( self::keys( $username ) as $i => $key ) {
			$count = (int) get_transient( $key ) + 1;
			set_transient( $key, $count, $window );
			if ( $count >= $limits[ $i ] ) {
				set_transient( $key . '_lock', time() + $window, $window );
				delete_transient( $key );
				memberglut_log(
					'warning',
					'login',
					/* translators: 1: username, 2: IP */
					sprintf( 'Login locked after %1$d failed attempts (%2$s)', $count, 0 === $i ? 'username ' . sanitize_user( $username ) : 'IP ' . memberglut_client_ip() ),
					array( 'ip' => memberglut_client_ip() )
				);
				if ( 0 === $i ) {
					$user = is_email( $username ) ? get_user_by( 'email', $username ) : get_user_by( 'login', $username );
					if ( $user ) {
						memberglut_event( 'login_locked', __( 'Login locked after too many failed attempts', 'memberglut' ), array( 'user_id' => $user->ID, 'object_type' => 'user', 'object_id' => $user->ID ) );
					}
				}
			}
		}
	}

	/**
	 * Clear the counters of a username and IP.
	 *
	 * @param string $username Username.
	 * @return void
	 */
	public static function reset_failed( $username ) {
		foreach ( self::keys( $username ) as $key ) {
			delete_transient( $key );
			delete_transient( $key . '_lock' );
		}
	}

	/* ---------------------------------------------------------------------
	 * Sessions
	 * ------------------------------------------------------------------ */

	/**
	 * Live sessions of a user, keyed by verifier (sha256 of the token), oldest first.
	 *
	 * @param int $user_id User.
	 * @return array
	 */
	public static function sessions( $user_id ) {
		$all = get_user_meta( $user_id, 'session_tokens', true );
		$out = array();
		foreach ( is_array( $all ) ? $all : array() as $verifier => $s ) {
			if ( isset( $s['expiration'] ) && $s['expiration'] >= time() ) {
				$out[ $verifier ] = $s;
			}
		}
		uasort(
			$out,
			static function ( $a, $b ) {
				return ( isset( $a['login'] ) ? $a['login'] : 0 ) - ( isset( $b['login'] ) ? $b['login'] : 0 );
			}
		);
		return $out;
	}

	/**
	 * Verifier of a token.
	 *
	 * @param string $token Token.
	 * @return string
	 */
	public static function verifier( $token ) {
		return $token ? hash( 'sha256', $token ) : '';
	}

	/**
	 * Whether the session limit applies to a user.
	 *
	 * @param WP_User $user User.
	 * @return bool
	 */
	private static function limited( $user ) {
		return memberglut_setting( 'limit_sessions', false ) && ! user_can( $user, 'manage_options' ) && (bool) apply_filters( 'memberglut_limit_sessions_for_user', true, $user );
	}

	/**
	 * “Block new logins” behaviour.
	 *
	 * @param WP_User|WP_Error|null $user Result so far.
	 * @return WP_User|WP_Error|null
	 */
	public static function check_sessions( $user ) {
		if ( ! $user instanceof WP_User || ! self::limited( $user ) || 'block' !== memberglut_setting( 'session_behavior', 'logout_oldest' ) ) {
			return $user;
		}
		$max = max( 1, (int) memberglut_setting( 'max_sessions', 1 ) );
		if ( count( self::sessions( $user->ID ) ) >= $max ) {
			memberglut_event( 'login_blocked', __( 'Login refused: too many active sessions', 'memberglut' ), array( 'user_id' => $user->ID, 'object_type' => 'user', 'object_id' => $user->ID ) );
			return new WP_Error(
				'memberglut_too_many_sessions',
				/* translators: %d: number of devices */
				sprintf( _n( 'You are already logged in on %d device. Log out there first, or reset your password to end all sessions.', 'You are already logged in on %d devices. Log out there first, or reset your password to end all sessions.', $max, 'memberglut' ), $max )
			);
		}
		return $user;
	}

	/**
	 * Remember the token of the session being created.
	 *
	 * @param string $cookie     Cookie.
	 * @param int    $expire     Expire.
	 * @param int    $expiration Expiration.
	 * @param int    $user_id    User.
	 * @param string $scheme     Scheme.
	 * @param string $token      Session token.
	 * @return void
	 */
	public static function capture_token( $cookie, $expire, $expiration, $user_id, $scheme = 'logged_in', $token = '' ) {
		self::$new_token = (string) $token;
	}

	/**
	 * After a successful login: reset counters, write history, enforce the session limit.
	 *
	 * @param string  $login Username.
	 * @param WP_User $user  User.
	 * @return void
	 */
	public static function on_login( $login, $user ) {
		if ( ! $user instanceof WP_User ) {
			return;
		}
		self::reset_failed( $login );
		self::reset_failed( $user->user_email );
		$verifier = self::verifier( self::$new_token );
		$now      = memberglut_now();
		$agent    = isset( $_SERVER['HTTP_USER_AGENT'] ) ? substr( sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ), 0, 255 ) : '';
		memberglut_repo( 'logins' )->insert(
			array(
				'user_id'          => $user->ID,
				'ip'               => memberglut_client_ip(),
				'user_agent'       => $agent,
				'device_label'     => self::device_label( $agent ),
				'session_verifier' => $verifier,
				'created_at'       => $now,
				'last_seen_at'     => $now,
			)
		);
		update_user_meta( $user->ID, 'memberglut_last_login', $now );
		update_user_meta( $user->ID, self::LAST_SEEN_META, time() );

		if ( self::limited( $user ) && 'logout_oldest' === memberglut_setting( 'session_behavior', 'logout_oldest' ) ) {
			$max      = max( 1, (int) memberglut_setting( 'max_sessions', 1 ) );
			$sessions = self::sessions( $user->ID );
			unset( $sessions[ $verifier ] );
			$extra = count( $sessions ) - ( $max - 1 );
			if ( $extra > 0 ) {
				self::end_sessions( $user->ID, array_slice( array_keys( $sessions ), 0, $extra ) );
				memberglut_event( 'sessions_ended', __( 'Older sessions logged out (session limit)', 'memberglut' ), array( 'user_id' => $user->ID, 'object_type' => 'user', 'object_id' => $user->ID ) );
			}
		}
		self::prune( $user->ID );
	}

	/**
	 * Destroy sessions by verifier and close their history rows.
	 *
	 * @param int      $user_id   User.
	 * @param string[] $verifiers Verifiers.
	 * @return void
	 */
	public static function end_sessions( $user_id, $verifiers ) {
		if ( ! $verifiers ) {
			return;
		}
		$all = get_user_meta( $user_id, 'session_tokens', true );
		if ( is_array( $all ) ) {
			foreach ( $verifiers as $v ) {
				unset( $all[ $v ] );
			}
			if ( $all ) {
				update_user_meta( $user_id, 'session_tokens', $all );
			} else {
				delete_user_meta( $user_id, 'session_tokens' );
			}
		}
		memberglut_repo( 'logins' )->update_where( array( 'user_id' => $user_id, 'session_verifier' => array_values( $verifiers ), 'ended_at IS NULL' => true ), array( 'ended_at' => memberglut_now() ) );
	}

	/**
	 * Log out everywhere (member detail, account page).
	 *
	 * @param int  $user_id      User.
	 * @param bool $keep_current Keep the current session.
	 * @return void
	 */
	public static function end_all_sessions( $user_id, $keep_current = false ) {
		$current = $keep_current && get_current_user_id() === (int) $user_id ? self::verifier( wp_get_session_token() ) : '';
		$ids     = array_diff( array_keys( (array) get_user_meta( $user_id, 'session_tokens', true ) ), array( $current ) );
		self::end_sessions( $user_id, array_values( $ids ) );
		$where = array( 'user_id' => $user_id, 'ended_at IS NULL' => true );
		if ( $current ) {
			$where['session_verifier !='] = $current;
		}
		memberglut_repo( 'logins' )->update_where( $where, array( 'ended_at' => memberglut_now() ) );
	}

	/**
	 * Close the history row of the session being logged out.
	 *
	 * @param int $user_id User (WP 5.5+).
	 * @return void
	 */
	public static function on_logout( $user_id = 0 ) {
		$verifier = self::verifier( wp_get_session_token() );
		if ( $user_id && $verifier ) {
			memberglut_repo( 'logins' )->update_where( array( 'user_id' => (int) $user_id, 'session_verifier' => $verifier, 'ended_at IS NULL' => true ), array( 'ended_at' => memberglut_now() ) );
		}
	}

	/**
	 * Update “last seen” of the current session at most every 5 minutes.
	 *
	 * @return void
	 */
	public static function touch_session() {
		$uid = get_current_user_id();
		if ( ! $uid || wp_doing_cron() ) {
			return;
		}
		$last = (int) get_user_meta( $uid, self::LAST_SEEN_META, true );
		if ( time() - $last < self::SEEN_EVERY ) {
			return;
		}
		update_user_meta( $uid, self::LAST_SEEN_META, time() );
		$verifier = self::verifier( wp_get_session_token() );
		if ( $verifier ) {
			memberglut_repo( 'logins' )->update_where( array( 'user_id' => $uid, 'session_verifier' => $verifier ), array( 'last_seen_at' => memberglut_now() ) );
		}
	}

	/**
	 * Keep the newest 50 history rows per user.
	 *
	 * @param int $user_id User.
	 * @return void
	 */
	private static function prune( $user_id ) {
		$keep = (int) apply_filters( 'memberglut_login_history_size', 50 );
		$rows = memberglut_repo( 'logins' )->query( array( 'where' => array( 'user_id' => $user_id ), 'orderby' => 'id DESC', 'per_page' => 1, 'page' => $keep + 1 ) );
		if ( $rows ) {
			memberglut_repo( 'logins' )->delete_where( array( 'user_id' => $user_id, 'id <=' => (int) $rows[0]['id'] ) );
		}
	}

	/**
	 * Short device label from a user agent, e.g. “Chrome on Windows”.
	 *
	 * @param string $ua User agent.
	 * @return string
	 */
	public static function device_label( $ua ) {
		if ( '' === $ua ) {
			return __( 'Unknown device', 'memberglut' );
		}
		$browsers = array( 'Edg/' => 'Edge', 'OPR/' => 'Opera', 'Firefox/' => 'Firefox', 'Chrome/' => 'Chrome', 'Safari/' => 'Safari' );
		$systems  = array( 'iPhone' => 'iPhone', 'iPad' => 'iPad', 'Android' => 'Android', 'Windows' => 'Windows', 'Mac OS X' => 'macOS', 'Linux' => 'Linux' );
		$b        = '';
		$o        = '';
		foreach ( $browsers as $needle => $name ) {
			if ( false !== strpos( $ua, $needle ) ) {
				$b = $name;
				break;
			}
		}
		foreach ( $systems as $needle => $name ) {
			if ( false !== strpos( $ua, $needle ) ) {
				$o = $name;
				break;
			}
		}
		if ( $b && $o ) {
			/* translators: 1: browser, 2: operating system */
			return sprintf( __( '%1$s on %2$s', 'memberglut' ), $b, $o );
		}
		return $b ? $b : ( $o ? $o : __( 'Unknown device', 'memberglut' ) );
	}

	/* ---------------------------------------------------------------------
	 * wp-login.php
	 * ------------------------------------------------------------------ */

	/**
	 * No “Remember me” when sessions end with the browser.
	 *
	 * @return void
	 */
	public static function wp_login_no_remember() {
		if ( memberglut_setting( 'logout_on_close', false ) ) {
			unset( $_POST['rememberme'] ); // phpcs:ignore WordPress.Security.NonceVerification.Missing -- Removing a value, not reading it.
		}
	}

	/**
	 * Hide the checkbox and style the captcha on wp-login.php.
	 *
	 * @return void
	 */
	public static function wp_login_css() {
		$css = '.login .mg-captcha{margin:0 0 16px;transform-origin:0 0}';
		if ( memberglut_setting( 'logout_on_close', false ) ) {
			$css .= '.login .forgetmenot{display:none}';
		}
		echo '<style>' . esc_html( $css ) . '</style>';
	}

	/**
	 * Captcha widget on a wp-login.php form.
	 *
	 * @param string $form Form key.
	 * @return void
	 */
	private static function wp_login_widget( $form ) {
		if ( ! MemberGlut_Form_Guard::captcha_on( $form ) ) {
			return;
		}
		echo MemberGlut_Form_Guard::captcha_markup( $form ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped when built.
		if ( 'recaptcha' === memberglut_setting( 'captcha_provider' ) && 'v3' === memberglut_setting( 'recaptcha_version', 'v3' ) ) {
			// wp-login.php does not load memberglut.js: fetch the v3 token here.
			wp_add_inline_script(
				'memberglut-recaptcha',
				'(function(){var f=document.querySelectorAll("input[data-mg-recaptcha-v3]");f.forEach(function(i){function t(){grecaptcha.ready(function(){grecaptcha.execute(i.dataset.mgRecaptchaV3,{action:i.dataset.action}).then(function(v){i.value=v;});});}t();setInterval(t,90000);});})();'
			);
		}
	}

	/**
	 * Login form widget.
	 *
	 * @return void
	 */
	public static function wp_login_captcha_login() {
		self::wp_login_widget( 'login' );
	}

	/**
	 * Register form widget.
	 *
	 * @return void
	 */
	public static function wp_login_captcha_register() {
		self::wp_login_widget( 'register' );
	}

	/**
	 * Lost password form widget.
	 *
	 * @return void
	 */
	public static function wp_login_captcha_lost() {
		self::wp_login_widget( 'lost_password' );
	}

	/**
	 * Whether this request is a form post on wp-login.php.
	 *
	 * @return bool
	 */
	private static function is_wp_login_post() {
		return isset( $GLOBALS['pagenow'] ) && 'wp-login.php' === $GLOBALS['pagenow'] && 'POST' === ( isset( $_SERVER['REQUEST_METHOD'] ) ? $_SERVER['REQUEST_METHOD'] : '' ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Compared only.
	}

	/**
	 * Verify the captcha of a wp-login.php login.
	 *
	 * @param WP_User|WP_Error|null $user Result so far.
	 * @return WP_User|WP_Error|null
	 */
	public static function wp_login_verify_login( $user ) {
		if ( ! self::is_wp_login_post() || ! isset( $_POST['log'] ) || ! MemberGlut_Form_Guard::captcha_on( 'login' ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Missing -- Core login form has no nonce.
			return $user;
		}
		$ok = MemberGlut_Form_Guard::verify_captcha( 'login', wp_unslash( $_POST ) ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
		return is_wp_error( $ok ) ? $ok : $user;
	}

	/**
	 * Verify the captcha of a wp-login.php registration.
	 *
	 * @param WP_Error $errors Errors.
	 * @return WP_Error
	 */
	public static function wp_login_verify_register( $errors ) {
		if ( self::is_wp_login_post() && MemberGlut_Form_Guard::captcha_on( 'register' ) ) {
			$ok = MemberGlut_Form_Guard::verify_captcha( 'register', wp_unslash( $_POST ) ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
			if ( is_wp_error( $ok ) ) {
				$errors->add( $ok->get_error_code(), $ok->get_error_message() );
			}
		}
		return $errors;
	}

	/**
	 * Verify the captcha of a wp-login.php lost password request.
	 *
	 * @param WP_Error $errors Errors.
	 * @return void
	 */
	public static function wp_login_verify_lost( $errors ) {
		if ( self::is_wp_login_post() && MemberGlut_Form_Guard::captcha_on( 'lost_password' ) ) {
			$ok = MemberGlut_Form_Guard::verify_captcha( 'lost_password', wp_unslash( $_POST ) ); // phpcs:ignore WordPress.Security.NonceVerification.Missing
			if ( is_wp_error( $ok ) ) {
				$errors->add( $ok->get_error_code(), $ok->get_error_message() );
			}
		}
	}
}
