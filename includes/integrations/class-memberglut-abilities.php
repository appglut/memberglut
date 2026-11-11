<?php
/**
 * WordPress Abilities API (WP 6.9+): MemberGlut abilities for AI agents, MCP adapters and the REST API.
 *
 * Abilities (category "memberglut"):
 *   memberglut/list-plans      read   memberglut_manage_plans
 *   memberglut/list-members    read   memberglut_manage_members
 *   memberglut/get-member      read   memberglut_manage_members
 *   memberglut/get-stats       read   memberglut_manage_members
 *   memberglut/grant-plan      write  memberglut_manage_members
 *   memberglut/revoke-plan     write  memberglut_manage_members
 *
 * Every ability checks the capability of the current user, so a client only gets what its user may do.
 * Does nothing on WordPress versions without the Abilities API.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Abilities class.
 */
class MemberGlut_Abilities {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		if ( ! function_exists( 'wp_register_ability' ) ) {
			return;
		}
		add_action( 'wp_abilities_api_categories_init', array( __CLASS__, 'category' ) );
		add_action( 'wp_abilities_api_init', array( __CLASS__, 'register' ) );
	}

	/**
	 * Category.
	 *
	 * @return void
	 */
	public static function category() {
		wp_register_ability_category(
			'memberglut',
			array(
				'label'       => __( 'Memberships', 'memberglut' ),
				'description' => __( 'Read and manage MemberGlut membership plans and members.', 'memberglut' ),
			)
		);
	}

	/**
	 * Permission callback for a capability.
	 *
	 * @param string $cap Capability.
	 * @return callable
	 */
	private static function can( $cap ) {
		return static function () use ( $cap ) {
			return current_user_can( $cap );
		};
	}

	/**
	 * Shared user + plan input schema.
	 *
	 * @return array
	 */
	private static function user_plan_schema() {
		return array(
			'type'                 => 'object',
			'properties'           => array(
				'user' => array( 'type' => array( 'integer', 'string' ), 'description' => __( 'User ID, login or email.', 'memberglut' ) ),
				'plan' => array( 'type' => array( 'integer', 'string' ), 'description' => __( 'Plan ID or slug.', 'memberglut' ) ),
			),
			'required'             => array( 'user', 'plan' ),
			'additionalProperties' => true,
		);
	}

	/**
	 * Register the abilities.
	 *
	 * @return void
	 */
	public static function register() {
		$read  = array( 'readonly' => true, 'destructive' => false, 'idempotent' => true );
		$write = array( 'readonly' => false, 'destructive' => false, 'idempotent' => true );
		$meta  = static function ( $annotations ) {
			return array( 'annotations' => $annotations, 'show_in_rest' => true );
		};

		wp_register_ability(
			'memberglut/list-plans',
			array(
				'label'               => __( 'List membership plans', 'memberglut' ),
				'description'         => __( 'Returns every membership plan with price, billing, role, status and member count.', 'memberglut' ),
				'category'            => 'memberglut',
				'input_schema'        => array(
					'type'                 => 'object',
					'properties'           => array( 'status' => array( 'type' => 'string', 'enum' => array( 'active', 'inactive' ) ) ),
					'additionalProperties' => false,
				),
				'output_schema'       => array( 'type' => 'array', 'items' => array( 'type' => 'object' ) ),
				'execute_callback'    => array( __CLASS__, 'list_plans' ),
				'permission_callback' => self::can( 'memberglut_manage_plans' ),
				'meta'                => $meta( $read ),
			)
		);
		wp_register_ability(
			'memberglut/list-members',
			array(
				'label'               => __( 'List members', 'memberglut' ),
				'description'         => __( 'Members with their plan and status. Filter by plan, status or a search text.', 'memberglut' ),
				'category'            => 'memberglut',
				'input_schema'        => array(
					'type'                 => 'object',
					'properties'           => array(
						'plan'     => array( 'type' => array( 'integer', 'string' ) ),
						'status'   => array( 'type' => 'string' ),
						'search'   => array( 'type' => 'string' ),
						'page'     => array( 'type' => 'integer', 'minimum' => 1, 'default' => 1 ),
						'per_page' => array( 'type' => 'integer', 'minimum' => 1, 'maximum' => 100, 'default' => 20 ),
					),
					'additionalProperties' => false,
				),
				'output_schema'       => array( 'type' => 'object' ),
				'execute_callback'    => array( __CLASS__, 'list_members' ),
				'permission_callback' => self::can( 'memberglut_manage_members' ),
				'meta'                => $meta( $read ),
			)
		);
		wp_register_ability(
			'memberglut/get-member',
			array(
				'label'               => __( 'Get a member', 'memberglut' ),
				'description'         => __( 'One user’s memberships (plan, status, start, expiry) and roles.', 'memberglut' ),
				'category'            => 'memberglut',
				'input_schema'        => array(
					'type'       => 'object',
					'properties' => array( 'user' => array( 'type' => array( 'integer', 'string' ), 'description' => __( 'User ID, login or email.', 'memberglut' ) ) ),
					'required'   => array( 'user' ),
				),
				'output_schema'       => array( 'type' => 'object' ),
				'execute_callback'    => array( __CLASS__, 'get_member' ),
				'permission_callback' => self::can( 'memberglut_manage_members' ),
				'meta'                => $meta( $read ),
			)
		);
		wp_register_ability(
			'memberglut/get-stats',
			array(
				'label'               => __( 'Membership statistics', 'memberglut' ),
				'description'         => __( 'Active members, new members, revenue, MRR and churn from the MemberGlut dashboard.', 'memberglut' ),
				'category'            => 'memberglut',
				'output_schema'       => array( 'type' => 'object' ),
				'execute_callback'    => array( __CLASS__, 'get_stats' ),
				'permission_callback' => self::can( 'memberglut_manage_members' ),
				'meta'                => $meta( $read ),
			)
		);
		wp_register_ability(
			'memberglut/grant-plan',
			array(
				'label'               => __( 'Give a member a plan', 'memberglut' ),
				'description'         => __( 'Gives a user a membership plan without payment. Optional "expires" (YYYY-MM-DD or "never") and "send_email".', 'memberglut' ),
				'category'            => 'memberglut',
				'input_schema'        => self::user_plan_schema(),
				'output_schema'       => array( 'type' => 'object' ),
				'execute_callback'    => array( __CLASS__, 'grant_plan' ),
				'permission_callback' => self::can( 'memberglut_manage_members' ),
				'meta'                => $meta( $write ),
			)
		);
		wp_register_ability(
			'memberglut/revoke-plan',
			array(
				'label'               => __( 'Remove a plan from a member', 'memberglut' ),
				'description'         => __( 'Ends the user’s membership of a plan now.', 'memberglut' ),
				'category'            => 'memberglut',
				'input_schema'        => self::user_plan_schema(),
				'output_schema'       => array( 'type' => 'object' ),
				'execute_callback'    => array( __CLASS__, 'revoke_plan' ),
				'permission_callback' => self::can( 'memberglut_manage_members' ),
				'meta'                => $meta( array( 'readonly' => false, 'destructive' => true, 'idempotent' => true ) ),
			)
		);
	}

	/**
	 * Resolve a user.
	 *
	 * @param mixed $value ID, login or email.
	 * @return WP_User|WP_Error
	 */
	private static function user( $value ) {
		$value = is_scalar( $value ) ? (string) $value : '';
		$user  = is_numeric( $value ) ? get_userdata( (int) $value ) : ( is_email( $value ) ? get_user_by( 'email', $value ) : get_user_by( 'login', $value ) );
		return $user ? $user : new WP_Error( 'memberglut_no_user', __( 'User not found.', 'memberglut' ) );
	}

	/**
	 * Resolve a plan.
	 *
	 * @param mixed $value ID or slug.
	 * @return array|WP_Error
	 */
	private static function plan( $value ) {
		$value = is_scalar( $value ) ? (string) $value : '';
		$plan  = MemberGlut_Plans::get( is_numeric( $value ) ? (int) $value : sanitize_title( $value ) );
		return $plan ? $plan : new WP_Error( 'memberglut_no_plan', __( 'Plan not found.', 'memberglut' ) );
	}

	/**
	 * List plans.
	 *
	 * @param array $input Input.
	 * @return array
	 */
	public static function list_plans( $input = array() ) {
		$status = is_array( $input ) && ! empty( $input['status'] ) ? (string) $input['status'] : null;
		$out    = array();
		foreach ( MemberGlut_Plans::all( $status ) as $p ) {
			$out[] = array_intersect_key( $p, array_flip( array( 'id', 'slug', 'name', 'description', 'type', 'price', 'billing', 'role', 'status', 'members', 'signup_url' ) ) );
		}
		return $out;
	}

	/**
	 * List members.
	 *
	 * @param array $input Input.
	 * @return array|WP_Error
	 */
	public static function list_members( $input = array() ) {
		$input = is_array( $input ) ? $input : array();
		$f     = array(
			'page'     => max( 1, isset( $input['page'] ) ? (int) $input['page'] : 1 ),
			'per_page' => max( 1, min( 100, isset( $input['per_page'] ) ? (int) $input['per_page'] : 20 ) ),
		);
		if ( ! empty( $input['plan'] ) ) {
			$plan = self::plan( $input['plan'] );
			if ( is_wp_error( $plan ) ) {
				return $plan;
			}
			$f['plan'] = $plan['id'];
		}
		foreach ( array( 'status', 'search' ) as $k ) {
			if ( ! empty( $input[ $k ] ) ) {
				$f[ $k ] = sanitize_text_field( (string) $input[ $k ] );
			}
		}
		list( $items, $total ) = MemberGlut_Members::query( $f );
		$keep                  = array_flip( array( 'user_id', 'name', 'username', 'email', 'plan_id', 'plan', 'status', 'started', 'expires', 'next_payment', 'total_spent' ) );
		return array(
			'total' => $total,
			'items' => array_map( static function ( $m ) use ( $keep ) {
				return array_intersect_key( $m, $keep );
			}, $items ),
		);
	}

	/**
	 * One member.
	 *
	 * @param array $input Input.
	 * @return array|WP_Error
	 */
	public static function get_member( $input = array() ) {
		$user = self::user( is_array( $input ) && isset( $input['user'] ) ? $input['user'] : '' );
		if ( is_wp_error( $user ) ) {
			return $user;
		}
		$subs = array();
		foreach ( MemberGlut_Subscription_Service::for_user( $user->ID ) as $s ) {
			$plan   = MemberGlut_Plans::get( (int) $s['plan_id'] );
			$subs[] = array(
				'id'      => (int) $s['id'],
				'plan_id' => (int) $s['plan_id'],
				'plan'    => $plan ? $plan['name'] : '',
				'status'  => $s['status'],
				'start'   => memberglut_iso( $s['start_date'] ),
				'expires' => memberglut_iso( $s['expires_at'] ),
			);
		}
		return array(
			'user_id'       => $user->ID,
			'name'          => $user->display_name,
			'email'         => $user->user_email,
			'roles'         => array_values( (array) $user->roles ),
			'registered'    => memberglut_iso( $user->user_registered ),
			'subscriptions' => $subs,
		);
	}

	/**
	 * Dashboard stats.
	 *
	 * @return array
	 */
	public static function get_stats() {
		return (array) MemberGlut_Dashboard::stats();
	}

	/**
	 * Grant a plan.
	 *
	 * @param array $input Input.
	 * @return array|WP_Error
	 */
	public static function grant_plan( $input = array() ) {
		$input = is_array( $input ) ? $input : array();
		$user  = self::user( isset( $input['user'] ) ? $input['user'] : '' );
		$plan  = self::plan( isset( $input['plan'] ) ? $input['plan'] : '' );
		if ( is_wp_error( $user ) ) {
			return $user;
		}
		if ( is_wp_error( $plan ) ) {
			return $plan;
		}
		$expires = 'plan';
		if ( ! empty( $input['expires'] ) ) {
			$expires = 'never' === $input['expires'] ? 'never' : memberglut_parse_date( (string) $input['expires'], true );
			if ( ! $expires ) {
				return new WP_Error( 'memberglut_bad_date', __( 'Use YYYY-MM-DD or "never" for expires.', 'memberglut' ) );
			}
		}
		$sub = MemberGlut_Subscription_Service::create(
			$user->ID,
			$plan['id'],
			array(
				'status'     => 'active',
				'expires'    => $expires,
				'source'     => 'ability',
				'send_email' => ! isset( $input['send_email'] ) || (bool) $input['send_email'],
				'actor_id'   => get_current_user_id(),
			)
		);
		if ( is_wp_error( $sub ) ) {
			return $sub;
		}
		return array( 'subscription_id' => (int) $sub['id'], 'status' => $sub['status'], 'expires' => memberglut_iso( $sub['expires_at'] ) );
	}

	/**
	 * Revoke a plan.
	 *
	 * @param array $input Input.
	 * @return array|WP_Error
	 */
	public static function revoke_plan( $input = array() ) {
		$input = is_array( $input ) ? $input : array();
		$user  = self::user( isset( $input['user'] ) ? $input['user'] : '' );
		$plan  = self::plan( isset( $input['plan'] ) ? $input['plan'] : '' );
		if ( is_wp_error( $user ) ) {
			return $user;
		}
		if ( is_wp_error( $plan ) ) {
			return $plan;
		}
		return array( 'removed' => memberglut_get_member( $user->ID )->remove_plan( $plan['id'] ) );
	}
}
