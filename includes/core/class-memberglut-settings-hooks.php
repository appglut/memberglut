<?php
/**
 * Reactions to settings changes that belong to no single feature.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Settings_Hooks class.
 */
class MemberGlut_Settings_Hooks {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'memberglut_settings_updated', array( __CLASS__, 'settings_updated' ), 10, 2 );
		add_action( 'memberglut_forms_updated', array( __CLASS__, 'forms_updated' ), 10, 2 );
	}

	/**
	 * Global settings changed.
	 *
	 * @param array $new New values.
	 * @param array $old Old values.
	 * @return void
	 */
	public static function settings_updated( $new, $old ) {
		if ( $new['custom_login_slug'] !== $old['custom_login_slug'] ) {
			update_option( 'memberglut_flush_rewrite', 1 );
		}
		memberglut_clear_cache();
	}

	/**
	 * Forms & pages changed.
	 *
	 * @param array $new New values.
	 * @param array $old Old values.
	 * @return void
	 */
	public static function forms_updated( $new, $old ) {
		foreach ( array( 'page_login', 'page_register', 'page_lost', 'page_account' ) as $slot ) {
			if ( $new[ $slot ] !== $old[ $slot ] ) {
				update_option( 'memberglut_flush_rewrite', 1 );
			}
		}
		memberglut_clear_cache();
	}
}
