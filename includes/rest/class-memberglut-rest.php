<?php
/**
 * Registers every REST controller.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST class.
 */
class MemberGlut_REST {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'register' ) );
	}

	/**
	 * Controller class names.
	 *
	 * @return string[]
	 */
	public static function controllers() {
		return apply_filters(
			'memberglut_rest_controllers',
			array(
				'MemberGlut_REST_Lookups',
				'MemberGlut_REST_Settings',
				'MemberGlut_REST_Plans',
				'MemberGlut_REST_Roles',
				'MemberGlut_REST_Members',
				'MemberGlut_REST_Emails',
				'MemberGlut_REST_Rules',
				'MemberGlut_REST_Forms',
				'MemberGlut_REST_Payments',
				'MemberGlut_REST_Coupons',
				'MemberGlut_REST_Dashboard',
				'MemberGlut_REST_Tools',
				'MemberGlut_REST_Public',
				'MemberGlut_REST_Webhooks',
			)
		);
	}

	/**
	 * Register routes of every available controller.
	 *
	 * @return void
	 */
	public static function register() {
		foreach ( self::controllers() as $class ) {
			if ( class_exists( $class ) ) {
				$controller = new $class();
				$controller->register_routes();
			}
		}
	}
}
