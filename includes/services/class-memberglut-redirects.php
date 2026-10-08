<?php
/**
 * Single redirect resolver (plans/01-dependency-map.md §2.4).
 *
 * Login:        redirect_to (if respect_redirect_to) → per-role redirect → redirect_login.
 * Logout:       per-role logout URL → redirect_logout.
 * Registration: redirect_to → plan "after joining" page → redirect_register.
 * Paid checkout: redirect_to → plan page → Thank-you page → redirect_register.
 * A target of "WordPress dashboard" falls back to My Account for roles blocked from wp-admin.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Redirects class.
 */
class MemberGlut_Redirects {

	/**
	 * URL for one of the redirect options (account, home, same, admin, url).
	 *
	 * @param string $option  Option value.
	 * @param string $custom  Custom URL.
	 * @param int    $user_id User.
	 * @param string $same    URL of the current page.
	 * @return string
	 */
	public static function target( $option, $custom, $user_id = 0, $same = '' ) {
		switch ( $option ) {
			case 'home':
				return home_url( '/' );
			case 'same':
				return $same ? $same : ( wp_get_referer() ? wp_get_referer() : home_url( '/' ) );
			case 'admin':
				if ( $user_id && self::is_blocked_from_admin( $user_id ) ) {
					return self::account_url();
				}
				return admin_url();
			case 'url':
				return $custom ? $custom : home_url( '/' );
			case 'account':
			default:
				return self::account_url();
		}
	}

	/**
	 * My Account URL (or home when not set).
	 *
	 * @return string
	 */
	public static function account_url() {
		$url = memberglut_page_url( 'account' );
		return $url ? $url : home_url( '/' );
	}

	/**
	 * Whether the user's roles are all in “Block wp-admin for” (decision D20).
	 *
	 * @param int $user_id User.
	 * @return bool
	 */
	public static function is_blocked_from_admin( $user_id ) {
		$user = get_userdata( $user_id );
		if ( ! $user || user_can( $user, 'manage_options' ) || empty( $user->roles ) ) {
			return false;
		}
		$blocked = (array) memberglut_setting( 'block_admin_roles', array() );
		return ! array_diff( (array) $user->roles, $blocked );
	}

	/**
	 * A redirect_to value that is safe to use, or ''.
	 *
	 * @param string $url Requested URL.
	 * @return string
	 */
	public static function safe_requested( $url ) {
		if ( ! $url || ! memberglut_setting( 'respect_redirect_to', true ) ) {
			return '';
		}
		$url = wp_validate_redirect( esc_url_raw( $url ), '' );
		// Never send people back to the login / register forms.
		foreach ( array( 'login', 'register', 'lost' ) as $slot ) {
			$page = memberglut_page_url( $slot );
			if ( $page && 0 === strpos( $url, $page ) ) {
				return '';
			}
		}
		if ( false !== strpos( $url, 'wp-login.php' ) ) {
			return '';
		}
		return $url;
	}

	/**
	 * First matching per-role redirect.
	 *
	 * @param int    $user_id User.
	 * @param string $which   login|logout.
	 * @return string
	 */
	public static function role_redirect( $user_id, $which ) {
		$user = get_userdata( $user_id );
		if ( ! $user ) {
			return '';
		}
		foreach ( (array) memberglut_setting( 'role_redirects', array() ) as $row ) {
			if ( in_array( $row['role'], (array) $user->roles, true ) && ! empty( $row[ $which ] ) ) {
				return $row[ $which ];
			}
		}
		return '';
	}

	/**
	 * After login.
	 *
	 * @param int    $user_id   User.
	 * @param string $requested redirect_to from the request.
	 * @return string
	 */
	public static function after_login( $user_id, $requested = '' ) {
		$url = self::safe_requested( $requested );
		if ( ! $url ) {
			$url = self::role_redirect( $user_id, 'login' );
		}
		if ( ! $url ) {
			$url = self::target( memberglut_setting( 'redirect_login', 'account' ), memberglut_setting( 'redirect_login_url', '' ), $user_id, $requested );
		}
		return (string) apply_filters( 'memberglut_redirect_url', $url, 'login', $user_id );
	}

	/**
	 * After logout.
	 *
	 * @param int    $user_id User who logged out.
	 * @param string $same    Page they were on.
	 * @return string
	 */
	public static function after_logout( $user_id, $same = '' ) {
		$url = self::role_redirect( $user_id, 'logout' );
		if ( ! $url ) {
			$url = self::target( memberglut_setting( 'redirect_logout', 'home' ), memberglut_setting( 'redirect_logout_url', '' ), 0, $same );
		}
		return (string) apply_filters( 'memberglut_redirect_url', $url, 'logout', $user_id );
	}

	/**
	 * After registration / joining a plan.
	 *
	 * @param int        $user_id   User.
	 * @param array|null $plan      Plan joined.
	 * @param string     $requested redirect_to (paywall return).
	 * @param bool       $paid      A payment was made (goes to the Thank-you page).
	 * @param array      $args      Extra query args for the Thank-you page.
	 * @return string
	 */
	public static function after_registration( $user_id, $plan = null, $requested = '', $paid = false, $args = array() ) {
		$url = self::safe_requested( $requested );
		if ( ! $url && $plan && 'page' === $plan['redirect'] && $plan['redirect_page'] ) {
			$url = get_permalink( $plan['redirect_page'] );
		}
		if ( ! $url && $paid ) {
			$url = memberglut_page_url( 'thanks', $args );
		}
		if ( ! $url ) {
			$url = self::target( memberglut_setting( 'redirect_register', 'account' ), memberglut_setting( 'redirect_register_url', '' ), $user_id, $requested );
		}
		return (string) apply_filters( 'memberglut_redirect_url', $url, 'register', $user_id, $plan );
	}
}
