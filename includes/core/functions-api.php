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
