<?php
/**
 * Admin notices: membership pages not set up yet, and a one-time note after upgrading from 1.x.
 * (The test-mode notice lives in MemberGlut_Gateways.) Each notice can be dismissed.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Admin_Notices class.
 */
class MemberGlut_Admin_Notices {

	const DISMISSED = 'memberglut_dismissed_notices';

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'admin_init', array( __CLASS__, 'dismiss' ) );
		add_action( 'admin_notices', array( __CLASS__, 'render' ) );
	}

	/**
	 * Dismissed notice keys (per user).
	 *
	 * @return string[]
	 */
	private static function dismissed() {
		return (array) get_user_meta( get_current_user_id(), self::DISMISSED, true );
	}

	/**
	 * Handle a dismiss link.
	 *
	 * @return void
	 */
	public static function dismiss() {
		if ( empty( $_GET['memberglut_dismiss'] ) ) {
			return;
		}
		$key = sanitize_key( wp_unslash( $_GET['memberglut_dismiss'] ) );
		check_admin_referer( 'memberglut_dismiss_' . $key );
		$list   = self::dismissed();
		$list[] = $key;
		update_user_meta( get_current_user_id(), self::DISMISSED, array_values( array_unique( $list ) ) );
		wp_safe_redirect( remove_query_arg( array( 'memberglut_dismiss', '_wpnonce' ) ) );
		exit;
	}

	/**
	 * Notices to show.
	 *
	 * @return array[] key, type, html
	 */
	private static function notices() {
		$out = array();
		if ( ! current_user_can( 'memberglut_manage_settings' ) ) {
			return $out;
		}
		$missing = array();
		foreach ( array( 'register' => __( 'Registration', 'memberglut' ), 'login' => __( 'Login', 'memberglut' ), 'account' => __( 'My account', 'memberglut' ) ) as $slot => $label ) {
			if ( ! memberglut_page_url( $slot ) ) {
				$missing[] = $label;
			}
		}
		if ( $missing ) {
			$out[] = array(
				'key'  => 'pages',
				'type' => 'warning',
				'html' => sprintf(
					/* translators: 1: page names, 2: link */
					__( 'MemberGlut needs a few pages to work: %1$s. <a href="%2$s">Create them in one click</a>.', 'memberglut' ),
					esc_html( implode( ', ', $missing ) ),
					esc_url( admin_url( 'admin.php?page=memberglut-forms' ) )
				),
			);
		}
		foreach ( MemberGlut_Install::legacy_tables() as $t ) {
			if ( MemberGlut_Install::table_exists( MemberGlut_Install::table( $t ) ) ) {
				$out[] = array(
					'key'  => 'upgraded_v2',
					'type' => 'info',
					'html' => sprintf(
						/* translators: %s: link */
						__( 'MemberGlut 2.0 moved your plans, members and settings to the new system. Have a look at the new <a href="%s">dashboard</a>.', 'memberglut' ),
						esc_url( admin_url( 'admin.php?page=memberglut' ) )
					),
				);
				break;
			}
		}
		return apply_filters( 'memberglut_admin_notices', $out );
	}

	/**
	 * Print the notices on the WordPress dashboard, the plugins screen and MemberGlut screens.
	 *
	 * @return void
	 */
	public static function render() {
		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
		if ( ! $screen || ! ( in_array( $screen->id, array( 'dashboard', 'plugins' ), true ) || false !== strpos( $screen->id, 'memberglut' ) ) ) {
			return;
		}
		$dismissed = self::dismissed();
		foreach ( self::notices() as $n ) {
			if ( in_array( $n['key'], $dismissed, true ) ) {
				continue;
			}
			$url = wp_nonce_url( add_query_arg( 'memberglut_dismiss', $n['key'] ), 'memberglut_dismiss_' . $n['key'] );
			printf(
				'<div class="notice notice-%1$s"><p>%2$s <a href="%3$s" style="margin-left:8px">%4$s</a></p></div>',
				esc_attr( $n['type'] ),
				wp_kses( $n['html'], array( 'a' => array( 'href' => true ) ) ),
				esc_url( $url ),
				esc_html__( 'Dismiss', 'memberglut' )
			);
		}
	}
}
