<?php
/**
 * Public PHP API for themes and other plugins.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * Plugin version.
 *
 * @return string
 */
function memberglut_get_version() {
	return MEMBERGLUT_VERSION;
}

/**
 * Whether a user has a role.
 *
 * @param int    $user_id User ID (0 = current).
 * @param string $role    Role slug.
 * @return bool
 */
function memberglut_user_has_role( $user_id = 0, $role = '' ) {
	$user = get_userdata( $user_id ? $user_id : get_current_user_id() );
	return $user && in_array( $role, (array) $user->roles, true );
}

/**
 * Roles of a user.
 *
 * @param int $user_id User ID (0 = current).
 * @return string[]
 */
function memberglut_get_user_roles( $user_id = 0 ) {
	$user = get_userdata( $user_id ? $user_id : get_current_user_id() );
	return $user ? array_values( (array) $user->roles ) : array();
}

/**
 * Display name of a role.
 *
 * @param string $role_slug Role.
 * @return string
 */
function memberglut_format_role_name( $role_slug ) {
	$names = wp_roles()->get_names();
	return isset( $names[ $role_slug ] ) ? translate_user_role( $names[ $role_slug ] ) : ucwords( str_replace( array( '_', '-' ), ' ', $role_slug ) );
}

/**
 * Alias kept for 1.x themes.
 *
 * @return bool
 */
function memberglut_is_pro() {
	return memberglut_is_pro_active();
}

/**
 * Pro information page.
 *
 * @return string
 */
function memberglut_get_pro_url() {
	return 'https://appglut.com/memberglut-pro/';
}

/**
 * Member object for a user.
 *
 * @param int $user_id User (0 = current).
 * @return MemberGlut_Member
 */
function memberglut_get_member( $user_id = 0 ) {
	return new MemberGlut_Member( $user_id ? $user_id : get_current_user_id() );
}

/**
 * Whether a user has access to a plan (ID or slug), or to any plan when $plan is empty.
 *
 * @param int|string $plan    Plan.
 * @param int        $user_id User (0 = current).
 * @return bool
 */
function memberglut_user_has_plan( $plan = 0, $user_id = 0 ) {
	return memberglut_get_member( $user_id )->has_plan( $plan );
}

/**
 * Plans a user has access to.
 *
 * @param int $user_id User (0 = current).
 * @return array[]
 */
function memberglut_get_user_plans( $user_id = 0 ) {
	return memberglut_get_member( $user_id )->get_plans();
}

/**
 * Give a plan to a user.
 *
 * @param int        $user_id User.
 * @param int|string $plan    Plan.
 * @param array      $args    See MemberGlut_Subscription_Service::create().
 * @return array|WP_Error
 */
function memberglut_add_user_plan( $user_id, $plan, $args = array() ) {
	return memberglut_get_member( $user_id )->add_plan( $plan, $args );
}

/**
 * 1.x name: the user's main membership.
 *
 * @param int $user_id User (0 = current).
 * @return array|null
 */
function memberglut_get_user_membership( $user_id = 0 ) {
	$subs = MemberGlut_Subscription_Service::access_subscriptions( $user_id ? $user_id : get_current_user_id() );
	return $subs ? $subs[0] : null;
}
