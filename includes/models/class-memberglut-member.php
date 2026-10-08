<?php
/**
 * A member: a WordPress user with subscriptions. Developer-facing wrapper.
 *
 * $member = memberglut_get_member( $user_id );
 * $member->has_plan( 'gold' ); $member->add_plan( 3 ); $member->remove_plan( 3 );
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Member class.
 */
class MemberGlut_Member {

	/**
	 * User ID.
	 *
	 * @var int
	 */
	public $id = 0;

	/**
	 * Constructor.
	 *
	 * @param int $user_id User ID.
	 */
	public function __construct( $user_id ) {
		$this->id = (int) $user_id;
	}

	/**
	 * WordPress user.
	 *
	 * @return WP_User|false
	 */
	public function user() {
		return get_userdata( $this->id );
	}

	/**
	 * Resolve a plan ID or slug.
	 *
	 * @param int|string $plan Plan.
	 * @return int
	 */
	private function plan_id( $plan ) {
		$p = MemberGlut_Plans::get( $plan );
		return $p ? (int) $p['id'] : 0;
	}

	/**
	 * Whether the member has access to a plan (ID or slug), or to any plan when empty.
	 *
	 * @param int|string $plan Plan.
	 * @return bool
	 */
	public function has_plan( $plan = 0 ) {
		if ( ! $plan ) {
			return MemberGlut_Subscription_Service::is_member( $this->id );
		}
		return MemberGlut_Subscription_Service::user_has_plan( $this->id, $this->plan_id( $plan ) );
	}

	/**
	 * Plans the member has access to (client shape).
	 *
	 * @return array[]
	 */
	public function get_plans() {
		return array_values( array_filter( array_map( array( 'MemberGlut_Plans', 'get' ), MemberGlut_Subscription_Service::active_plan_ids( $this->id ) ) ) );
	}

	/**
	 * All subscription rows.
	 *
	 * @return array[]
	 */
	public function get_subscriptions() {
		return MemberGlut_Subscription_Service::for_user( $this->id );
	}

	/**
	 * Give a plan.
	 *
	 * @param int|string $plan Plan.
	 * @param array      $args See MemberGlut_Subscription_Service::create().
	 * @return array|WP_Error
	 */
	public function add_plan( $plan, $args = array() ) {
		return MemberGlut_Subscription_Service::create( $this->id, $this->plan_id( $plan ), wp_parse_args( $args, array( 'source' => 'api' ) ) );
	}

	/**
	 * End a plan now.
	 *
	 * @param int|string $plan Plan.
	 * @return bool
	 */
	public function remove_plan( $plan ) {
		$id = $this->plan_id( $plan );
		$ok = false;
		foreach ( MemberGlut_Subscription_Service::access_subscriptions( $this->id ) as $sub ) {
			if ( (int) $sub['plan_id'] === $id ) {
				$ok = ! is_wp_error( MemberGlut_Subscription_Service::expire( $sub['id'], __( '(removed via API)', 'memberglut' ) ) ) || $ok;
			}
		}
		return $ok;
	}

	/**
	 * Expiry date (UTC) of a plan, null for never, false when the member does not have it.
	 *
	 * @param int|string $plan Plan.
	 * @return string|null|false
	 */
	public function get_expiry( $plan ) {
		$id = $this->plan_id( $plan );
		foreach ( MemberGlut_Subscription_Service::access_subscriptions( $this->id ) as $sub ) {
			if ( (int) $sub['plan_id'] === $id ) {
				return $sub['expires_at'];
			}
		}
		return false;
	}
}
