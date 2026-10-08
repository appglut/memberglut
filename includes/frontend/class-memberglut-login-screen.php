<?php
/**
 * wp-login.php replacement, custom login address, hidden admin bar and blocked wp-admin.
 *
 * Settings: Login & registration › replace_wp_pages, custom_login_slug; General › hide_admin_bar_roles,
 * block_admin_roles, admin_redirect_page. Never blocks: POST requests, logout, postpass, confirmaction,
 * interim logins and the administrator rescue link.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Login_Screen class.
 */
class MemberGlut_Login_Screen {

	/**
	 * Actions of wp-login.php that are never redirected or blocked.
	 */
	const ALWAYS_ALLOWED = array( 'logout', 'postpass', 'confirmaction', 'memberglut_rescue', 'confirm_admin_email', 'interim-login' );

	/**
	 * Whether the current wp-login.php load comes through the custom login address.
	 *
	 * @var bool
	 */
	private static $via_slug = false;

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_filter( 'login_url', array( __CLASS__, 'login_url' ), 20, 3 );
		add_filter( 'register_url', array( __CLASS__, 'register_url' ), 20 );
		add_filter( 'lostpassword_url', array( __CLASS__, 'lostpassword_url' ), 20, 2 );
		add_action( 'login_init', array( __CLASS__, 'redirect_wp_login' ), 1 );
		add_action( 'init', array( __CLASS__, 'custom_slug' ), 1 );
		add_filter( 'site_url', array( __CLASS__, 'site_url' ), 20, 4 );
		add_filter( 'show_admin_bar', array( __CLASS__, 'admin_bar' ), 20 );
		add_action( 'admin_init', array( __CLASS__, 'block_admin' ), 1 );
	}

	/**
	 * Whether wp-login.php is replaced by the front-end pages.
	 *
	 * @return bool
	 */
	private static function replacing() {
		return (bool) memberglut_setting( 'replace_wp_pages', true );
	}

	/**
	 * Login URL → Login page.
	 *
	 * @param string $url          URL.
	 * @param string $redirect     Redirect.
	 * @param bool   $force_reauth Force reauth.
	 * @return string
	 */
	public static function login_url( $url, $redirect, $force_reauth ) {
		if ( $force_reauth || is_admin() && ! wp_doing_ajax() && false !== strpos( $url, 'interim-login' ) ) {
			return $url;
		}
		$page = self::replacing() ? memberglut_page_url( 'login' ) : '';
		if ( $page ) {
			return $redirect ? add_query_arg( 'redirect_to', rawurlencode( $redirect ), $page ) : $page;
		}
		return $url;
	}

	/**
	 * Register URL → Registration page.
	 *
	 * @param string $url URL.
	 * @return string
	 */
	public static function register_url( $url ) {
		$page = self::replacing() ? memberglut_page_url( 'register' ) : '';
		return $page ? $page : $url;
	}

	/**
	 * Lost password URL → Lost password page.
	 *
	 * @param string $url      URL.
	 * @param string $redirect Redirect.
	 * @return string
	 */
	public static function lostpassword_url( $url, $redirect ) {
		$page = self::replacing() ? memberglut_page_url( 'lost' ) : '';
		if ( $page ) {
			return $redirect ? add_query_arg( 'redirect_to', rawurlencode( $redirect ), $page ) : $page;
		}
		return $url;
	}

	/**
	 * Send GET visits of wp-login.php to the front-end pages; hide wp-login.php behind the custom address.
	 *
	 * @return void
	 */
	public static function redirect_wp_login() {
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- Routing only.
		$action = isset( $_REQUEST['action'] ) ? sanitize_key( wp_unslash( $_REQUEST['action'] ) ) : 'login';
		$method = isset( $_SERVER['REQUEST_METHOD'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_METHOD'] ) ) : 'GET';
		if ( in_array( $action, self::ALWAYS_ALLOWED, true ) || isset( $_REQUEST['interim-login'] ) || 'POST' === $method ) {
			return;
		}
		$slug = memberglut_setting( 'custom_login_slug', '' );
		if ( $slug && ! self::$via_slug && ! self::replacing() ) {
			// Custom address without front-end pages: wp-login.php itself is hidden.
			self::not_found();
		}
		if ( ! self::replacing() ) {
			return;
		}
		$map = array( 'login' => 'login', 'register' => 'register', 'lostpassword' => 'lost', 'retrievepassword' => 'lost', 'rp' => 'lost', 'resetpass' => 'lost' );
		if ( ! isset( $map[ $action ] ) ) {
			return;
		}
		$url = memberglut_page_url( $map[ $action ] );
		if ( ! $url ) {
			if ( $slug && ! self::$via_slug ) {
				self::not_found();
			}
			return;
		}
		$args = array();
		foreach ( array( 'redirect_to', 'key', 'login' ) as $k ) {
			if ( ! empty( $_GET[ $k ] ) ) {
				$args[ $k ] = rawurlencode( sanitize_text_field( wp_unslash( $_GET[ $k ] ) ) );
			}
		}
		if ( 'rp' === $action && ! empty( $_COOKIE[ 'wp-resetpass-' . COOKIEHASH ] ) && empty( $args['key'] ) ) {
			list( $login, $key ) = array_pad( explode( ':', sanitize_text_field( wp_unslash( $_COOKIE[ 'wp-resetpass-' . COOKIEHASH ] ) ), 2 ), 2, '' );
			$args['login']       = rawurlencode( $login );
			$args['key']         = rawurlencode( $key );
		}
		// phpcs:enable
		wp_safe_redirect( $args ? add_query_arg( $args, $url ) : $url );
		exit;
	}

	/**
	 * Custom login address: /slug serves the login page (or wp-login.php when no page is set).
	 *
	 * @return void
	 */
	public static function custom_slug() {
		$slug = memberglut_setting( 'custom_login_slug', '' );
		if ( ! $slug || is_admin() ) {
			return;
		}
		$uri  = isset( $_SERVER['REQUEST_URI'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '';
		$path = trim( MemberGlut_Rules::path_of( home_url( $uri ) ), '/' );
		if ( $path !== $slug ) {
			return;
		}
		$page = memberglut_page_url( 'login' );
		if ( $page && self::replacing() ) {
			$query = (string) wp_parse_url( $uri, PHP_URL_QUERY );
			wp_safe_redirect( $page . ( $query ? ( false !== strpos( $page, '?' ) ? '&' : '?' ) . $query : '' ) );
			exit;
		}
		self::$via_slug = true;
		global $pagenow, $error, $interim_login, $action, $user_login; // phpcs:ignore WordPress.WP.GlobalVariablesOverride -- wp-login.php expects these globals.
		$pagenow = 'wp-login.php'; // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- Serving wp-login.php under the custom address.
		require_once ABSPATH . 'wp-login.php';
		exit;
	}

	/**
	 * Forms on wp-login.php post to the custom address while it hides wp-login.php.
	 *
	 * @param string $url     URL.
	 * @param string $path    Path.
	 * @param string $scheme  Scheme.
	 * @param int    $blog_id Blog.
	 * @return string
	 */
	public static function site_url( $url, $path, $scheme, $blog_id ) {
		$slug = memberglut_setting( 'custom_login_slug', '' );
		if ( ! $slug || false === strpos( $path, 'wp-login.php' ) || self::replacing() && memberglut_page_url( 'login' ) ) {
			return $url;
		}
		// Keep the rescue link, logout and other always-allowed actions on wp-login.php itself.
		foreach ( self::ALWAYS_ALLOWED as $a ) {
			if ( false !== strpos( $path, 'action=' . $a ) ) {
				return $url;
			}
		}
		return str_replace( 'wp-login.php', $slug, $url );
	}

	/**
	 * 404 for hidden wp-login.php.
	 *
	 * @return void
	 */
	private static function not_found() {
		status_header( 404 );
		nocache_headers();
		wp_safe_redirect( home_url( '/404' ) );
		exit;
	}

	/**
	 * Hide the toolbar when all of the user's roles are in “Hide the admin bar for” (decision D20).
	 *
	 * @param bool $show Show.
	 * @return bool
	 */
	public static function admin_bar( $show ) {
		if ( ! $show || ! is_user_logged_in() || current_user_can( 'manage_options' ) ) {
			return $show;
		}
		$roles = (array) wp_get_current_user()->roles;
		$hide  = (array) memberglut_setting( 'hide_admin_bar_roles', array() );
		return $roles && ! array_diff( $roles, $hide ) ? false : $show;
	}

	/**
	 * Send blocked roles away from wp-admin (AJAX, admin-post and uploads keep working).
	 *
	 * @return void
	 */
	public static function block_admin() {
		if ( wp_doing_ajax() || wp_doing_cron() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || ! is_user_logged_in() ) {
			return;
		}
		global $pagenow;
		if ( in_array( $pagenow, array( 'admin-post.php', 'async-upload.php', 'admin-ajax.php' ), true ) ) {
			return;
		}
		if ( ! MemberGlut_Redirects::is_blocked_from_admin( get_current_user_id() ) ) {
			return;
		}
		$page = (int) memberglut_setting( 'admin_redirect_page', 0 );
		$url  = $page ? get_permalink( $page ) : MemberGlut_Redirects::account_url();
		wp_safe_redirect( $url ? $url : home_url( '/' ) );
		exit;
	}
}
