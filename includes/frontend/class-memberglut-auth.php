<?php
/**
 * Front-end authentication: registration, login, lost/reset password (completed in Phase 8).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Auth class.
 */
class MemberGlut_Auth {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {}

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
			return new WP_Error( 'memberglut_mail_failed', __( 'The email could not be sent. Check the mail settings of your site.', 'memberglut' ), array( 'status' => 500 ) );
		}
		memberglut_event( 'password_reset', __( 'Password reset email sent', 'memberglut' ), array( 'user_id' => $user->ID, 'object_type' => 'user', 'object_id' => $user->ID ) );
		return true;
	}
}
