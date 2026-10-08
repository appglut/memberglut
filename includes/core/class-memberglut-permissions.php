<?php
/**
 * MemberGlut admin capabilities and the screen/route permission map.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Permissions class.
 */
class MemberGlut_Permissions {

	/**
	 * Admin capabilities: cap => label.
	 *
	 * @return array
	 */
	public static function caps() {
		return array(
			'memberglut_manage_members'  => __( 'Manage members', 'memberglut' ),
			'memberglut_manage_plans'    => __( 'Manage plans', 'memberglut' ),
			'memberglut_manage_rules'    => __( 'Manage content rules', 'memberglut' ),
			'memberglut_manage_roles'    => __( 'Manage roles & capabilities', 'memberglut' ),
			'memberglut_view_payments'   => __( 'View payments', 'memberglut' ),
			'memberglut_manage_payments' => __( 'Refund and record payments, manage coupons', 'memberglut' ),
			'memberglut_manage_emails'   => __( 'Manage emails', 'memberglut' ),
			'memberglut_manage_settings' => __( 'Manage settings, forms and tools', 'memberglut' ),
		);
	}

	/**
	 * Access capabilities kept for the default member roles.
	 *
	 * @return string[]
	 */
	public static function access_caps() {
		return array( 'memberglut_basic_access', 'memberglut_premium_access', 'memberglut_vip_access' );
	}

	/**
	 * Give every MemberGlut admin capability to administrators.
	 *
	 * @return void
	 */
	public static function grant_admin_caps() {
		$role = get_role( 'administrator' );
		if ( ! $role ) {
			return;
		}
		foreach ( array_keys( self::caps() ) as $cap ) {
			if ( ! $role->has_cap( $cap ) ) {
				$role->add_cap( $cap );
			}
		}
	}

	/**
	 * Capability required for each admin screen slug.
	 *
	 * @return array
	 */
	public static function screen_caps() {
		return array(
			'memberglut'              => 'memberglut_manage_members',
			'memberglut-members'      => 'memberglut_manage_members',
			'memberglut-member'       => 'memberglut_manage_members',
			'memberglut-plans'        => 'memberglut_manage_plans',
			'memberglut-plan-editor'  => 'memberglut_manage_plans',
			'memberglut-rules'        => 'memberglut_manage_rules',
			'memberglut-rule-editor'  => 'memberglut_manage_rules',
			'memberglut-roles'        => 'memberglut_manage_roles',
			'memberglut-payments'     => 'memberglut_view_payments',
			'memberglut-coupons'      => 'memberglut_manage_payments',
			'memberglut-emails'       => 'memberglut_manage_emails',
			'memberglut-forms'        => 'memberglut_manage_settings',
			'memberglut-tools'        => 'memberglut_manage_settings',
			'memberglut-settings'     => 'memberglut_manage_settings',
			'memberglut-pro-features' => 'memberglut_manage_settings',
		);
	}

	/**
	 * Capability for a screen.
	 *
	 * @param string $slug Page slug.
	 * @return string
	 */
	public static function screen_cap( $slug ) {
		$map = self::screen_caps();
		return isset( $map[ $slug ] ) ? $map[ $slug ] : 'manage_options';
	}

	/**
	 * Whether the current user can open any MemberGlut screen.
	 *
	 * @return bool
	 */
	public static function can_access_admin() {
		foreach ( array_unique( self::screen_caps() ) as $cap ) {
			if ( current_user_can( $cap ) ) {
				return true;
			}
		}
		return false;
	}
}
