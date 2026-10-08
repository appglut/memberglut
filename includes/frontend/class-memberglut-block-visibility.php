<?php
/**
 * “Membership visibility” on every block: show or hide a block for plans, roles, logged-in or logged-out users.
 *
 * Attribute: memberglutVisibility = { mode: show|hide, who: logged_in|logged_out|plans|roles, plans: [], roles: [] }.
 * Applies to navigation link blocks too (menu items in block themes).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Block_Visibility class.
 */
class MemberGlut_Block_Visibility {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_filter( 'register_block_type_args', array( __CLASS__, 'add_attribute' ), 10, 2 );
		add_filter( 'render_block', array( __CLASS__, 'render' ), 10, 2 );
	}

	/**
	 * Declare the attribute on every block so server rendering keeps it.
	 *
	 * @param array  $args Block args.
	 * @param string $name Block name.
	 * @return array
	 */
	public static function add_attribute( $args, $name ) {
		if ( ! isset( $args['attributes'] ) || ! is_array( $args['attributes'] ) ) {
			$args['attributes'] = array();
		}
		$args['attributes']['memberglutVisibility'] = array( 'type' => 'object' );
		return $args;
	}

	/**
	 * Whether a block is visible to the current user.
	 *
	 * @param array $v Visibility attribute.
	 * @return bool
	 */
	public static function is_visible( $v ) {
		if ( empty( $v['who'] ) ) {
			return true;
		}
		$who     = array(
			'who'   => $v['who'],
			'plans' => isset( $v['plans'] ) ? (array) $v['plans'] : array(),
			'roles' => isset( $v['roles'] ) ? (array) $v['roles'] : array(),
		);
		$user_id = get_current_user_id();
		// Administrators see plan/role-limited blocks (to manage the site); login-state blocks follow the real state.
		if ( in_array( $who['who'], array( 'plans', 'roles' ), true ) && memberglut_user_bypasses_restrictions( $user_id ) ) {
			return true;
		}
		$match = MemberGlut_Access::user_passes( $who, $user_id );
		return isset( $v['mode'] ) && 'hide' === $v['mode'] ? ! $match : $match;
	}

	/**
	 * Remove hidden blocks from the output.
	 *
	 * @param string $content Block HTML.
	 * @param array  $block   Block.
	 * @return string
	 */
	public static function render( $content, $block ) {
		if ( empty( $block['attrs']['memberglutVisibility'] ) || is_admin() || ( defined( 'REST_REQUEST' ) && REST_REQUEST && ! empty( $_GET['context'] ) && 'edit' === $_GET['context'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only context check.
			return $content;
		}
		if ( ! self::is_visible( (array) $block['attrs']['memberglutVisibility'] ) ) {
			MemberGlut_Cache::no_cache();
			return '';
		}
		MemberGlut_Cache::no_cache();
		return $content;
	}
}
