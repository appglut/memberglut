<?php
/**
 * Keeps a user's roles in line with their plans.
 *
 * Rules (plans/phase-04-subscription-engine.md):
 *  - A plan's role is added while the user has access (plan "Keep the user's other roles" off → other roles removed).
 *  - When access ends, the plan role is removed only if MemberGlut added it (the user did not have it before) and no
 *    other active plan gives it. Then the plan's "Role after the plan ends" is added.
 *  - A user left without any role gets the WordPress default role.
 *  - Users who can manage_options are never touched.
 *
 * `memberglut_managed_roles` user meta: role => true when it existed before MemberGlut wanted to add it.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Role_Sync class.
 */
class MemberGlut_Role_Sync {

	const META          = 'memberglut_managed_roles';
	const REPLACED_META = 'memberglut_replaced_roles';

	/**
	 * Recompute the roles of one user.
	 *
	 * @param int        $user_id User.
	 * @param array|null $ended   Subscription that just lost access (to apply its "role after the plan ends").
	 * @param bool       $full    Full resync (Tools): also add roles of active plans that were removed by hand.
	 * @return void
	 */
	public static function sync_user( $user_id, $ended = null, $full = false ) {
		$user = get_userdata( $user_id );
		if ( ! $user || user_can( $user, 'manage_options' ) || ( is_multisite() && is_super_admin( $user_id ) ) ) {
			return;
		}
		if ( ! apply_filters( 'memberglut_sync_user_roles', true, $user_id ) ) {
			return;
		}
		$managed = get_user_meta( $user_id, self::META, true );
		$managed = is_array( $managed ) ? $managed : array();
		$desired = array();
		$replace = false;
		foreach ( MemberGlut_Subscription_Service::access_subscriptions( $user_id ) as $sub ) {
			$plan = MemberGlut_Plans::get( $sub['plan_id'] );
			if ( ! $plan || ! $plan['role'] || ! get_role( $plan['role'] ) ) {
				continue;
			}
			$desired[ $plan['role'] ] = true;
			if ( ! $plan['keep_roles'] ) {
				$replace = true;
			}
		}

		$changed = false;
		$roles   = (array) $user->roles;

		// Add roles of active plans.
		foreach ( array_keys( $desired ) as $role ) {
			if ( ! array_key_exists( $role, $managed ) ) {
				$managed[ $role ] = in_array( $role, $roles, true ); // Pre-existing?
				$changed          = true;
			}
			if ( ! in_array( $role, $roles, true ) ) {
				$user->add_role( $role );
				$roles[] = $role;
				$changed = true;
			}
		}

		// "Keep the user's other roles" off: only plan roles remain. The removed roles are given back when no
		// replacing plan is active any more.
		$replaced = get_user_meta( $user_id, self::REPLACED_META, true );
		$replaced = is_array( $replaced ) ? $replaced : array();
		if ( $replace ) {
			foreach ( $roles as $role ) {
				if ( ! isset( $desired[ $role ] ) ) {
					$user->remove_role( $role );
					$replaced[] = $role;
					$changed    = true;
				}
			}
			$roles = array_keys( $desired );
			if ( $replaced ) {
				update_user_meta( $user_id, self::REPLACED_META, array_values( array_unique( $replaced ) ) );
			}
		} elseif ( $replaced ) {
			foreach ( $replaced as $role ) {
				if ( get_role( $role ) && ! in_array( $role, $roles, true ) && 'administrator' !== $role ) {
					$user->add_role( $role );
					$roles[] = $role;
				}
			}
			delete_user_meta( $user_id, self::REPLACED_META );
			$changed = true;
		}

		// Remove roles MemberGlut added that no active plan gives any more.
		foreach ( $managed as $role => $pre_existing ) {
			if ( isset( $desired[ $role ] ) ) {
				continue;
			}
			if ( ! $pre_existing && in_array( $role, $roles, true ) ) {
				$user->remove_role( $role );
				$roles = array_values( array_diff( $roles, array( $role ) ) );
			}
			unset( $managed[ $role ] );
			$changed = true;
		}

		// Role after the plan ends (not when the member still has a plan in the same group, e.g. after an upgrade).
		if ( $ended ) {
			$plan = MemberGlut_Plans::get( $ended['plan_id'] );
			if ( $plan && $plan['expire_role'] && get_role( $plan['expire_role'] ) && ! MemberGlut_Subscription_Service::in_group( $user_id, $plan['group'], $ended['id'] ) && ! in_array( $plan['expire_role'], $roles, true ) ) {
				$user->add_role( $plan['expire_role'] );
				$roles[] = $plan['expire_role'];
				$changed = true;
			}
		}

		// Never leave a user without a role.
		if ( ! $roles ) {
			$default = get_option( 'default_role', 'subscriber' );
			if ( get_role( $default ) ) {
				$user->add_role( $default );
				$changed = true;
			}
		}

		if ( $changed ) {
			if ( $managed ) {
				update_user_meta( $user_id, self::META, $managed );
			} else {
				delete_user_meta( $user_id, self::META );
			}
			do_action( 'memberglut_user_roles_synced', $user_id, $roles );
		}
	}
}
