<?php
/**
 * Subscription engine: the only place that changes subscriptions.
 *
 * Status → access (plans/01-dependency-map.md §2.7):
 *   active, trialing        → access
 *   canceled                → access until expires_at
 *   pending, on_hold        → no access (on_hold is only used when Renewals › Access while retrying = Pause access)
 *   expired, abandoned      → no access (abandoned is hidden from lists)
 *
 * Every transition writes an event, fires hooks (emails and gateways listen to them) and re-syncs the user's roles.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Subscription_Service class.
 */
class MemberGlut_Subscription_Service {

	const STATUSES        = array( 'pending', 'active', 'trialing', 'on_hold', 'canceled', 'expired', 'abandoned' );
	const ACCESS_STATUSES = array( 'active', 'trialing', 'canceled' );
	const GATEWAY_GRACE   = 3 * DAY_IN_SECONDS;

	/**
	 * When true, the default plan is not given on user_register (our own registration assigns a plan itself).
	 *
	 * @var bool
	 */
	public static $suppress_default_plan = false;

	/**
	 * Per-request cache of active plan IDs per user.
	 *
	 * @var array
	 */
	private static $cache = array();

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'user_register', array( __CLASS__, 'give_default_plan' ), 20 );
		add_action( 'memberglut_hourly', array( __CLASS__, 'expiration_sweep' ) );
		add_action( 'delete_user', array( __CLASS__, 'on_delete_user' ) );
		add_action( 'memberglut_sync_roles_batch', array( __CLASS__, 'sync_roles_batch' ) );
	}

	/* ---------------------------------------------------------------------
	 * Reading
	 * ------------------------------------------------------------------ */

	/**
	 * One subscription row.
	 *
	 * @param int $id ID.
	 * @return array|null
	 */
	public static function get( $id ) {
		return memberglut_repo( 'subscriptions' )->find( (int) $id );
	}

	/**
	 * Subscriptions of a user, newest first.
	 *
	 * @param int  $user_id           User.
	 * @param bool $include_abandoned Include abandoned rows.
	 * @return array[]
	 */
	public static function for_user( $user_id, $include_abandoned = false ) {
		$where = array( 'user_id' => (int) $user_id );
		if ( ! $include_abandoned ) {
			$where['status !='] = 'abandoned';
		}
		return memberglut_repo( 'subscriptions' )->query( array( 'where' => $where, 'orderby' => 'id DESC' ) );
	}

	/**
	 * Whether a subscription currently grants access.
	 *
	 * @param array $sub Row.
	 * @return bool
	 */
	public static function grants_access( $sub ) {
		if ( in_array( $sub['status'], array( 'active', 'trialing' ), true ) ) {
			return true;
		}
		if ( 'canceled' === $sub['status'] ) {
			return ! empty( $sub['expires_at'] ) && strtotime( $sub['expires_at'] . ' UTC' ) > time();
		}
		return false;
	}

	/**
	 * Subscriptions of a user that grant access.
	 *
	 * @param int $user_id User.
	 * @return array[]
	 */
	public static function access_subscriptions( $user_id ) {
		return array_values( array_filter( self::for_user( $user_id ), array( __CLASS__, 'grants_access' ) ) );
	}

	/**
	 * Plan IDs the user currently has access to (cached per request).
	 *
	 * @param int $user_id User.
	 * @return int[]
	 */
	public static function active_plan_ids( $user_id ) {
		$user_id = (int) $user_id;
		if ( ! $user_id ) {
			return array();
		}
		if ( ! isset( self::$cache[ $user_id ] ) ) {
			self::$cache[ $user_id ] = array_values( array_unique( array_map( 'intval', wp_list_pluck( self::access_subscriptions( $user_id ), 'plan_id' ) ) ) );
		}
		return self::$cache[ $user_id ];
	}

	/**
	 * Whether the user has access to a plan.
	 *
	 * @param int $user_id User.
	 * @param int $plan_id Plan.
	 * @return bool
	 */
	public static function user_has_plan( $user_id, $plan_id ) {
		return in_array( (int) $plan_id, self::active_plan_ids( $user_id ), true );
	}

	/**
	 * Whether the user has access to any plan.
	 *
	 * @param int $user_id User.
	 * @return bool
	 */
	public static function is_member( $user_id ) {
		return (bool) self::active_plan_ids( $user_id );
	}

	/**
	 * Access-granting subscription of a user in a plan group (one plan per group).
	 *
	 * @param int    $user_id User.
	 * @param string $group   Group.
	 * @param int    $exclude Subscription to ignore.
	 * @return array|null
	 */
	public static function in_group( $user_id, $group, $exclude = 0 ) {
		foreach ( self::access_subscriptions( $user_id ) as $sub ) {
			if ( (int) $sub['id'] === (int) $exclude ) {
				continue;
			}
			$plan = MemberGlut_Plans::get( $sub['plan_id'] );
			if ( $plan && $plan['group'] === $group ) {
				return $sub;
			}
		}
		return null;
	}

	/**
	 * Forget cached plan IDs.
	 *
	 * @param int $user_id User (0 = all).
	 * @return void
	 */
	public static function flush( $user_id = 0 ) {
		if ( $user_id ) {
			unset( self::$cache[ (int) $user_id ] );
		} else {
			self::$cache = array();
		}
	}

	/* ---------------------------------------------------------------------
	 * Creating
	 * ------------------------------------------------------------------ */

	/**
	 * Create a subscription.
	 *
	 * Args: status (pending|active|trialing|on_hold), start (UTC), expires ('plan' | 'never' | UTC date),
	 * source, gateway, gateway_customer_id, gateway_subscription_id, billing_amount, coupon_id, trial (bool),
	 * send_email (bool, default true), allow_duplicate (bool), meta (array), actor_id.
	 *
	 * @param int   $user_id User.
	 * @param int   $plan_id Plan.
	 * @param array $args    Args.
	 * @return array|WP_Error Subscription row.
	 */
	public static function create( $user_id, $plan_id, $args = array() ) {
		$user = get_userdata( $user_id );
		$plan = MemberGlut_Plans::get( $plan_id );
		if ( ! $user ) {
			return new WP_Error( 'memberglut_no_user', __( 'User not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( ! $plan ) {
			return new WP_Error( 'memberglut_no_plan', __( 'Plan not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		$args = wp_parse_args(
			$args,
			array(
				'status'                  => 'active',
				'start'                   => memberglut_now(),
				'expires'                 => 'plan',
				'source'                  => 'admin',
				'gateway'                 => '',
				'gateway_customer_id'     => '',
				'gateway_subscription_id' => '',
				'billing_amount'          => 'paid' === $plan['type'] ? $plan['price'] : 0,
				'coupon_id'               => null,
				'trial'                   => false,
				'send_email'              => true,
				'allow_duplicate'         => false,
				'meta'                    => array(),
			)
		);
		if ( ! in_array( $args['status'], array( 'pending', 'active', 'trialing', 'on_hold' ), true ) ) {
			$args['status'] = 'active';
		}
		if ( ! $args['allow_duplicate'] && self::user_has_plan( $user_id, $plan_id ) ) {
			return new WP_Error( 'memberglut_duplicate', __( 'This member already has this plan.', 'memberglut' ), array( 'status' => 409 ) );
		}
		$start   = $args['start'] ? $args['start'] : memberglut_now();
		$expires = null;
		$trial   = null;
		$recurring = 'paid' === $plan['type'] && 'recurring' === $plan['billing'];
		if ( 'trialing' === $args['status'] || $args['trial'] ) {
			$trial = memberglut_add_duration( $start, $plan['trial_length']['length'], $plan['trial_length']['unit'] );
		}
		if ( 'plan' === $args['expires'] ) {
			$expires = $trial ? $trial : MemberGlut_Plans::calculate_expiry( $plan, $start );
		} elseif ( 'never' === $args['expires'] || null === $args['expires'] || '' === $args['expires'] ) {
			$expires = null;
		} else {
			$expires = (string) $args['expires'];
		}
		$meta = (array) $args['meta'];
		$meta['send_email'] = (bool) $args['send_email'];
		$id = memberglut_repo( 'subscriptions' )->insert(
			array(
				'user_id'                 => (int) $user_id,
				'plan_id'                 => (int) $plan_id,
				'status'                  => $args['status'],
				'start_date'              => $start,
				'expires_at'              => $expires,
				'trial_ends_at'           => $trial,
				'next_payment_at'         => $recurring ? $expires : null,
				'gateway'                 => $args['gateway'] ? sanitize_key( $args['gateway'] ) : ( 'free' === $plan['type'] ? 'free' : 'manual' ),
				'gateway_customer_id'     => (string) $args['gateway_customer_id'],
				'gateway_subscription_id' => (string) $args['gateway_subscription_id'],
				'billing_amount'          => (float) $args['billing_amount'],
				'billing_cycles_total'    => $recurring && $plan['limit_cycles'] ? (int) $plan['cycles'] : 0,
				'coupon_id'               => $args['coupon_id'] ? (int) $args['coupon_id'] : null,
				'source'                  => sanitize_key( $args['source'] ),
				'meta'                    => $meta,
			)
		);
		if ( ! $id ) {
			return new WP_Error( 'memberglut_db_error', __( 'The subscription could not be saved.', 'memberglut' ), array( 'status' => 500 ) );
		}
		if ( $trial ) {
			update_user_meta( $user_id, 'memberglut_used_trial', time() );
		}
		self::flush( $user_id );
		$sub = self::get( $id );
		$is_first = ! memberglut_repo( 'subscriptions' )->count( array( 'where' => array( 'user_id' => (int) $user_id, 'id !=' => $id ) ) );
		memberglut_event(
			'grant' === $args['source'] ? 'grant' : ( 'pending' === $sub['status'] ? 'pending' : 'grant' ),
			/* translators: 1: user, 2: plan, 3: status */
			sprintf( __( '%1$s joined %2$s (%3$s)', 'memberglut' ), $user->display_name, $plan['name'], $sub['status'] ),
			array( 'user_id' => $user_id, 'object_type' => 'subscription', 'object_id' => $id, 'data' => array( 'source' => $sub['source'], 'plan_id' => $plan_id ) )
		);
		do_action( 'memberglut_subscription_created', $sub, $plan, $is_first );
		do_action( 'memberglut_subscription_status_changed', $sub, null, $sub['status'] );
		if ( self::grants_access( $sub ) ) {
			self::mark_activated( $sub, $plan );
		}
		MemberGlut_Role_Sync::sync_user( $user_id );
		return self::get( $id );
	}

	/**
	 * First activation bookkeeping + hook (welcome emails listen to it).
	 *
	 * @param array $sub  Row.
	 * @param array $plan Plan.
	 * @return void
	 */
	private static function mark_activated( $sub, $plan ) {
		$meta  = is_array( $sub['meta'] ) ? $sub['meta'] : array();
		$first = empty( $meta['activated_at'] );
		if ( $first ) {
			$meta['activated_at'] = memberglut_now();
			memberglut_repo( 'subscriptions' )->update( $sub['id'], array( 'meta' => $meta ) );
			$sub['meta'] = $meta;
		}
		do_action( 'memberglut_subscription_activated', $sub, $plan, $first );
	}

	/* ---------------------------------------------------------------------
	 * Transitions
	 * ------------------------------------------------------------------ */

	/**
	 * Change status (and other columns) of a subscription.
	 *
	 * @param int    $id     Subscription.
	 * @param string $status New status.
	 * @param array  $data   Other columns to update.
	 * @param string $reason Event text addition.
	 * @return array|WP_Error Updated row.
	 */
	public static function transition( $id, $status, $data = array(), $reason = '' ) {
		$sub = self::get( $id );
		if ( ! $sub ) {
			return new WP_Error( 'memberglut_not_found', __( 'Subscription not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( ! in_array( $status, self::STATUSES, true ) ) {
			return new WP_Error( 'memberglut_bad_status', __( 'Unknown status.', 'memberglut' ), array( 'status' => 400 ) );
		}
		$old        = $sub['status'];
		// A canceled subscription whose period just ran out still counts as "had access" for this transition.
		$had_access = self::grants_access( $sub ) || ( 'canceled' === $old && 'canceled' !== $status );
		$data['status'] = $status;
		memberglut_repo( 'subscriptions' )->update( $id, $data );
		self::flush( $sub['user_id'] );
		$new  = self::get( $id );
		$plan = MemberGlut_Plans::get( $new['plan_id'] );
		$user = get_userdata( $new['user_id'] );
		if ( $old !== $status ) {
			memberglut_event(
				self::event_for( $status ),
				/* translators: 1: user, 2: plan, 3: old status, 4: new status */
				trim( sprintf( __( '%1$s · %2$s: %3$s → %4$s', 'memberglut' ), $user ? $user->display_name : '#' . $new['user_id'], $plan ? $plan['name'] : '#' . $new['plan_id'], $old, $status ) . ' ' . $reason ),
				array( 'user_id' => $new['user_id'], 'object_type' => 'subscription', 'object_id' => $id, 'data' => array( 'from' => $old, 'to' => $status ) )
			);
			memberglut_log( 'info', 'subscription', sprintf( 'Subscription #%d %s → %s %s', $id, $old, $status, $reason ) );
			do_action( 'memberglut_subscription_status_changed', $new, $old, $status );
		}
		$has_access = self::grants_access( $new );
		if ( ! $had_access && $has_access && $plan ) {
			self::mark_activated( $new, $plan );
		}
		if ( $had_access && ! $has_access ) {
			do_action( 'memberglut_subscription_access_lost', $new, $plan, $old );
		}
		MemberGlut_Role_Sync::sync_user( $new['user_id'], ( $had_access && ! $has_access ) ? $new : null );
		return self::get( $id );
	}

	/**
	 * Event type for a status.
	 *
	 * @param string $status Status.
	 * @return string
	 */
	private static function event_for( $status ) {
		$map = array( 'active' => 'activate', 'trialing' => 'activate', 'canceled' => 'cancel', 'expired' => 'expire', 'pending' => 'pending', 'on_hold' => 'hold', 'abandoned' => 'revoke' );
		return isset( $map[ $status ] ) ? $map[ $status ] : 'status';
	}

	/**
	 * Activate (after payment, approval, or by an admin).
	 *
	 * @param int   $id   Subscription.
	 * @param array $args trial (bool), expires (UTC|null to recalc).
	 * @return array|WP_Error
	 */
	public static function activate( $id, $args = array() ) {
		$sub = self::get( $id );
		if ( ! $sub ) {
			return new WP_Error( 'memberglut_not_found', __( 'Subscription not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		$plan = MemberGlut_Plans::get( $sub['plan_id'] );
		$data = array();
		$status = ! empty( $args['trial'] ) || ( $sub['trial_ends_at'] && strtotime( $sub['trial_ends_at'] . ' UTC' ) > time() && 'trialing' === $sub['status'] ) ? 'trialing' : 'active';
		// Pending subscriptions start when they are activated.
		if ( 'pending' === $sub['status'] && $plan ) {
			$start               = memberglut_now();
			$data['start_date']  = $start;
			if ( $sub['trial_ends_at'] ) {
				$data['trial_ends_at'] = memberglut_add_duration( $start, $plan['trial_length']['length'], $plan['trial_length']['unit'] );
				$data['expires_at']    = $data['trial_ends_at'];
				$status                = 'trialing';
			} else {
				$data['expires_at'] = MemberGlut_Plans::calculate_expiry( $plan, $start );
			}
			if ( 'paid' === $plan['type'] && 'recurring' === $plan['billing'] ) {
				$data['next_payment_at'] = $data['expires_at'];
			}
		}
		if ( array_key_exists( 'expires', $args ) ) {
			$data['expires_at'] = $args['expires'];
			if ( $plan && 'recurring' === $plan['billing'] ) {
				$data['next_payment_at'] = $args['expires'];
			}
		}
		if ( isset( $args['gateway_subscription_id'] ) ) {
			$data['gateway_subscription_id'] = (string) $args['gateway_subscription_id'];
		}
		$data['retry_count'] = 0;
		return self::transition( $id, $status, $data );
	}

	/**
	 * Renew after a successful renewal payment: extend the period, count the cycle.
	 *
	 * @param int   $id   Subscription.
	 * @param array $args period_end (UTC, from the gateway) optional.
	 * @return array|WP_Error
	 */
	public static function renew( $id, $args = array() ) {
		$sub  = self::get( $id );
		$plan = $sub ? MemberGlut_Plans::get( $sub['plan_id'] ) : null;
		if ( ! $sub || ! $plan ) {
			return new WP_Error( 'memberglut_not_found', __( 'Subscription not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		$base = $sub['expires_at'] && strtotime( $sub['expires_at'] . ' UTC' ) > time() ? $sub['expires_at'] : memberglut_now();
		if ( ! empty( $args['period_end'] ) ) {
			$end = $args['period_end'];
		} elseif ( 'recurring' === $plan['billing'] ) {
			$end = memberglut_add_duration( $base, $plan['duration']['length'], $plan['duration']['unit'] );
		} else {
			$end = MemberGlut_Plans::calculate_expiry( $plan, $base );
		}
		$cycles = (int) $sub['billing_cycles_done'] + 1;
		$data   = array(
			'expires_at'          => $end,
			'next_payment_at'     => 'recurring' === $plan['billing'] ? $end : null,
			'billing_cycles_done' => $cycles,
			'retry_count'         => 0,
			'canceled_at'         => null,
			'trial_ends_at'       => $sub['trial_ends_at'],
		);
		$status = 'active';
		$done   = $sub['billing_cycles_total'] > 0 && $cycles >= (int) $sub['billing_cycles_total'];
		if ( $done ) {
			$data['next_payment_at'] = null;
			if ( 'keep' === $plan['after_cycles'] ) {
				$data['expires_at'] = null; // Paid in full: access forever.
			} else {
				$status              = 'canceled';
				$data['canceled_at'] = memberglut_now();
			}
		}
		$renewed = self::transition( $id, $status, $data, $done ? __( '(last payment)', 'memberglut' ) : '' );
		if ( ! is_wp_error( $renewed ) ) {
			do_action( 'memberglut_subscription_renewed', $renewed, $plan, $cycles );
			if ( $done ) {
				do_action( 'memberglut_subscription_cycles_complete', $renewed, $plan );
				do_action( 'memberglut_cancel_gateway_subscription', $renewed, 'cycles_complete' );
			}
		}
		return $renewed;
	}

	/**
	 * Cancel. Access stays until the period ends unless Member account › After canceling = Remove access now,
	 * or $immediately, or the plan has no end date (lifetime).
	 *
	 * @param int  $id          Subscription.
	 * @param bool $immediately End access now.
	 * @param bool $by_member   Canceled by the member (emails to admin).
	 * @return array|WP_Error
	 */
	public static function cancel( $id, $immediately = false, $by_member = false ) {
		$sub = self::get( $id );
		if ( ! $sub ) {
			return new WP_Error( 'memberglut_not_found', __( 'Subscription not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( in_array( $sub['status'], array( 'canceled', 'expired', 'abandoned' ), true ) && ! $immediately ) {
			return $sub;
		}
		$now_mode = $immediately || 'now' === memberglut_setting( 'cancel_access', 'period_end' ) || empty( $sub['expires_at'] ) || ! self::grants_access( $sub );
		do_action( 'memberglut_cancel_gateway_subscription', $sub, $now_mode ? 'now' : 'period_end' );
		if ( $now_mode ) {
			$res = self::expire( $id, $by_member ? __( '(canceled by member)', 'memberglut' ) : __( '(canceled)', 'memberglut' ) );
		} else {
			$res = self::transition( $id, 'canceled', array( 'canceled_at' => memberglut_now(), 'next_payment_at' => null ), $by_member ? __( '(by member)', 'memberglut' ) : '' );
		}
		if ( ! is_wp_error( $res ) ) {
			do_action( 'memberglut_subscription_canceled', $res, MemberGlut_Plans::get( $res['plan_id'] ), $by_member );
		}
		return $res;
	}

	/**
	 * Expire now.
	 *
	 * @param int    $id     Subscription.
	 * @param string $reason Reason text.
	 * @return array|WP_Error
	 */
	public static function expire( $id, $reason = '' ) {
		$sub = self::get( $id );
		if ( ! $sub ) {
			return new WP_Error( 'memberglut_not_found', __( 'Subscription not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( 'expired' === $sub['status'] ) {
			return $sub;
		}
		$expires = $sub['expires_at'] && strtotime( $sub['expires_at'] . ' UTC' ) <= time() ? $sub['expires_at'] : memberglut_now();
		if ( $sub['gateway_subscription_id'] && ! in_array( $sub['status'], array( 'canceled' ), true ) ) {
			do_action( 'memberglut_cancel_gateway_subscription', $sub, 'now' );
		}
		$res = self::transition( $id, 'expired', array( 'expires_at' => $expires, 'next_payment_at' => null ), $reason );
		if ( ! is_wp_error( $res ) ) {
			do_action( 'memberglut_subscription_expired', $res, MemberGlut_Plans::get( $res['plan_id'] ) );
		}
		return $res;
	}

	/**
	 * Put on hold (failed payment with Access while retrying = Pause access).
	 *
	 * @param int $id Subscription.
	 * @return array|WP_Error
	 */
	public static function put_on_hold( $id ) {
		return self::transition( $id, 'on_hold' );
	}

	/**
	 * Abandon: removed by the member from their account (decision D9, soft delete).
	 *
	 * @param int $id Subscription.
	 * @return array|WP_Error
	 */
	public static function abandon( $id ) {
		$sub = self::get( $id );
		if ( $sub && $sub['gateway_subscription_id'] ) {
			do_action( 'memberglut_cancel_gateway_subscription', $sub, 'now' );
		}
		$res = self::transition( $id, 'abandoned', array( 'next_payment_at' => null, 'canceled_at' => memberglut_now() ) );
		if ( ! is_wp_error( $res ) ) {
			do_action( 'memberglut_subscription_canceled', $res, MemberGlut_Plans::get( $res['plan_id'] ), true );
		}
		return $res;
	}

	/**
	 * Delete a subscription row (admin “Remove membership”). Payments stay.
	 *
	 * @param int $id Subscription.
	 * @return true|WP_Error
	 */
	public static function delete( $id ) {
		$sub = self::get( $id );
		if ( ! $sub ) {
			return new WP_Error( 'memberglut_not_found', __( 'Subscription not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( $sub['gateway_subscription_id'] && self::grants_access( $sub ) ) {
			do_action( 'memberglut_cancel_gateway_subscription', $sub, 'now' );
		}
		$had  = self::grants_access( $sub );
		$plan = MemberGlut_Plans::get( $sub['plan_id'] );
		$user = get_userdata( $sub['user_id'] );
		memberglut_repo( 'subscriptions' )->delete( $id );
		self::flush( $sub['user_id'] );
		memberglut_event(
			'revoke',
			/* translators: 1: plan, 2: user */
			sprintf( __( 'Membership %1$s removed from %2$s', 'memberglut' ), $plan ? $plan['name'] : '#' . $sub['plan_id'], $user ? $user->display_name : '#' . $sub['user_id'] ),
			array( 'user_id' => $sub['user_id'], 'object_type' => 'subscription', 'object_id' => $id )
		);
		do_action( 'memberglut_subscription_deleted', $sub, $plan );
		MemberGlut_Role_Sync::sync_user( $sub['user_id'], $had ? $sub : null );
		return true;
	}

	/**
	 * Admin change of plan (local only — decision D18). Dates are kept.
	 *
	 * @param int $id      Subscription.
	 * @param int $plan_id New plan.
	 * @return array|WP_Error
	 */
	public static function change_plan( $id, $plan_id ) {
		$sub  = self::get( $id );
		$plan = MemberGlut_Plans::get( $plan_id );
		if ( ! $sub || ! $plan ) {
			return new WP_Error( 'memberglut_not_found', __( 'Subscription or plan not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( (int) $sub['plan_id'] === (int) $plan_id ) {
			return $sub;
		}
		$old_plan = MemberGlut_Plans::get( $sub['plan_id'] );
		memberglut_repo( 'subscriptions' )->update(
			$id,
			array(
				'plan_id'              => (int) $plan_id,
				'billing_amount'       => 'paid' === $plan['type'] ? $plan['price'] : 0,
				'billing_cycles_total' => 'recurring' === $plan['billing'] && $plan['limit_cycles'] ? (int) $plan['cycles'] : 0,
				'scheduled_plan_id'    => null,
			)
		);
		self::flush( $sub['user_id'] );
		$new = self::get( $id );
		memberglut_event(
			'plan_change',
			/* translators: 1: old plan, 2: new plan */
			sprintf( __( 'Plan changed from %1$s to %2$s', 'memberglut' ), $old_plan ? $old_plan['name'] : '#' . $sub['plan_id'], $plan['name'] ),
			array( 'user_id' => $sub['user_id'], 'object_type' => 'subscription', 'object_id' => $id, 'data' => array( 'from' => (int) $sub['plan_id'], 'to' => (int) $plan_id ) )
		);
		do_action( 'memberglut_subscription_plan_changed', $new, $old_plan, $plan );
		MemberGlut_Role_Sync::sync_user( $sub['user_id'] );
		return $new;
	}

	/**
	 * Admin edit (Edit subscription modal / Extend): plan, status, start, expires.
	 *
	 * @param int   $id   Subscription.
	 * @param array $data plan_id, status, start (date|ISO), expires (date|ISO|''), extend_days.
	 * @return array|WP_Error
	 */
	public static function admin_update( $id, $data ) {
		$sub = self::get( $id );
		if ( ! $sub ) {
			return new WP_Error( 'memberglut_not_found', __( 'Subscription not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( ! empty( $data['plan_id'] ) && (int) $data['plan_id'] !== (int) $sub['plan_id'] ) {
			$res = self::change_plan( $id, (int) $data['plan_id'] );
			if ( is_wp_error( $res ) ) {
				return $res;
			}
		}
		$cols = array();
		if ( ! empty( $data['start'] ) ) {
			$cols['start_date'] = memberglut_parse_date( $data['start'] );
		}
		if ( array_key_exists( 'expires', $data ) ) {
			$cols['expires_at'] = $data['expires'] ? memberglut_parse_date( $data['expires'], true ) : null;
		}
		if ( ! empty( $data['extend_days'] ) ) {
			$base               = $sub['expires_at'] && strtotime( $sub['expires_at'] . ' UTC' ) > time() ? $sub['expires_at'] : memberglut_now();
			$cols['expires_at'] = memberglut_add_duration( $base, (int) $data['extend_days'], 'day' );
		}
		$plan = MemberGlut_Plans::get( ! empty( $data['plan_id'] ) ? $data['plan_id'] : $sub['plan_id'] );
		if ( array_key_exists( 'expires_at', $cols ) && $plan && 'recurring' === $plan['billing'] && in_array( $sub['status'], array( 'active', 'trialing' ), true ) ) {
			$cols['next_payment_at'] = $cols['expires_at'];
		}
		$status = ! empty( $data['status'] ) && in_array( $data['status'], self::STATUSES, true ) ? $data['status'] : self::get( $id )['status'];
		// An expiry date in the past ends access straight away.
		if ( ! empty( $cols['expires_at'] ) && strtotime( $cols['expires_at'] . ' UTC' ) <= time() && in_array( $status, array( 'active', 'trialing', 'canceled' ), true ) ) {
			$status = 'expired';
		}
		if ( 'expired' === $status && 'expired' !== $sub['status'] ) {
			if ( $cols ) {
				memberglut_repo( 'subscriptions' )->update( $id, $cols );
			}
			return self::expire( $id, __( '(by admin)', 'memberglut' ) );
		}
		if ( 'canceled' === $status && 'canceled' !== $sub['status'] ) {
			if ( $cols ) {
				memberglut_repo( 'subscriptions' )->update( $id, $cols );
			}
			return self::cancel( $id );
		}
		$res = self::transition( $id, $status, $cols, __( '(by admin)', 'memberglut' ) );
		if ( ! is_wp_error( $res ) && isset( $cols['expires_at'] ) ) {
			memberglut_event( 'dates_changed', sprintf( /* translators: %s: date */ __( 'Expiry date set to %s', 'memberglut' ), $res['expires_at'] ? memberglut_format_date( $res['expires_at'] ) : __( 'never', 'memberglut' ) ), array( 'user_id' => $res['user_id'], 'object_type' => 'subscription', 'object_id' => $id ) );
		}
		return $res;
	}

	/* ---------------------------------------------------------------------
	 * Scheduled work
	 * ------------------------------------------------------------------ */

	/**
	 * Expire overdue subscriptions. Gateway-managed recurring subscriptions get a grace period for late webhooks.
	 *
	 * @return array Counts.
	 */
	public static function expiration_sweep() {
		$repo   = memberglut_repo( 'subscriptions' );
		$now    = memberglut_now();
		$grace  = gmdate( 'Y-m-d H:i:s', time() - self::GATEWAY_GRACE );
		$counts = array( 'expired' => 0, 'downgraded' => 0 );

		do_action( 'memberglut_before_expiration_sweep' );

		// Canceled with the period over.
		foreach ( $repo->query( array( 'where' => array( 'status' => 'canceled', 'expires_at IS NOT NULL' => true, 'expires_at <=' => $now ), 'per_page' => 500 ) ) as $sub ) {
			self::expire( $sub['id'], __( '(end of period)', 'memberglut' ) );
			++$counts['expired'];
		}
		// Active / trialing / on hold, not renewed.
		foreach ( $repo->query( array( 'where' => array( 'status' => array( 'active', 'trialing', 'on_hold' ), 'expires_at IS NOT NULL' => true, 'expires_at <=' => $now ), 'per_page' => 500 ) ) as $sub ) {
			if ( ! empty( $sub['scheduled_plan_id'] ) && in_array( $sub['status'], array( 'active' ), true ) && ! $sub['gateway_subscription_id'] ) {
				continue; // Handled below.
			}
			if ( $sub['gateway_subscription_id'] && $sub['expires_at'] > $grace ) {
				continue; // The gateway may still send the renewal.
			}
			if ( apply_filters( 'memberglut_sweep_skip_subscription', false, $sub ) ) {
				continue;
			}
			self::expire( $sub['id'], __( '(not renewed)', 'memberglut' ) );
			++$counts['expired'];
		}
		// Scheduled downgrades of local subscriptions take effect at period end.
		foreach ( $repo->query( array( 'where' => array( 'scheduled_plan_id IS NOT NULL' => true, 'status' => array( 'active', 'trialing' ), 'expires_at IS NOT NULL' => true, 'expires_at <=' => $now ), 'per_page' => 200 ) ) as $sub ) {
			if ( $sub['gateway_subscription_id'] ) {
				continue; // Gateways switch the price themselves; the webhook calls apply_scheduled_change().
			}
			self::apply_scheduled_change( $sub['id'] );
			++$counts['downgraded'];
		}
		if ( $counts['expired'] || $counts['downgraded'] ) {
			memberglut_log( 'info', 'cron', sprintf( 'Expiration sweep: %d expired, %d plan changes applied', $counts['expired'], $counts['downgraded'] ) );
		}
		do_action( 'memberglut_after_expiration_sweep', $counts );
		return $counts;
	}

	/**
	 * Apply a scheduled plan change (downgrade at period end, decision D17).
	 *
	 * @param int $id Subscription.
	 * @return array|WP_Error
	 */
	public static function apply_scheduled_change( $id ) {
		$sub = self::get( $id );
		if ( ! $sub || empty( $sub['scheduled_plan_id'] ) ) {
			return new WP_Error( 'memberglut_nothing_scheduled', __( 'No plan change is scheduled.', 'memberglut' ) );
		}
		$plan = MemberGlut_Plans::get( $sub['scheduled_plan_id'] );
		$res  = self::change_plan( $id, $sub['scheduled_plan_id'] );
		if ( is_wp_error( $res ) || ! $plan ) {
			return $res;
		}
		// Start the new plan's period now.
		$start = memberglut_now();
		memberglut_repo( 'subscriptions' )->update(
			$id,
			array(
				'start_date'      => $start,
				'expires_at'      => MemberGlut_Plans::calculate_expiry( $plan, $start ),
				'next_payment_at' => 'recurring' === $plan['billing'] ? MemberGlut_Plans::calculate_expiry( $plan, $start ) : null,
			)
		);
		return self::get( $id );
	}

	/* ---------------------------------------------------------------------
	 * WordPress users
	 * ------------------------------------------------------------------ */

	/**
	 * Give the default plan to new users (any source), unless our own registration assigns one.
	 *
	 * @param int $user_id User.
	 * @return void
	 */
	public static function give_default_plan( $user_id ) {
		if ( self::$suppress_default_plan ) {
			return;
		}
		$plan_id = (int) memberglut_setting( 'default_plan', 0 );
		if ( ! $plan_id ) {
			return;
		}
		$plan = MemberGlut_Plans::get( $plan_id );
		if ( ! $plan || 'active' !== $plan['status'] ) {
			return;
		}
		self::create( $user_id, $plan_id, array( 'source' => 'default_plan', 'send_email' => false ) );
	}

	/**
	 * A WordPress user is deleted: cancel gateway subscriptions and remove the subscription rows. Payments stay.
	 *
	 * @param int $user_id User.
	 * @return void
	 */
	public static function on_delete_user( $user_id ) {
		foreach ( self::for_user( $user_id, true ) as $sub ) {
			if ( $sub['gateway_subscription_id'] && self::grants_access( $sub ) ) {
				do_action( 'memberglut_cancel_gateway_subscription', $sub, 'now' );
			}
			memberglut_repo( 'subscriptions' )->delete( $sub['id'] );
		}
		self::flush( $user_id );
	}

	/**
	 * Re-sync roles of every member in batches (Tools › Sync roles with plans).
	 *
	 * @param array $args offset.
	 * @return void
	 */
	public static function sync_roles_batch( $args = array() ) {
		global $wpdb;
		$offset = isset( $args['offset'] ) ? (int) $args['offset'] : 0;
		$table  = memberglut_repo( 'subscriptions' )->table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Plugin table.
		$ids = $wpdb->get_col( $wpdb->prepare( "SELECT DISTINCT user_id FROM `{$table}` ORDER BY user_id LIMIT 200 OFFSET %d", $offset ) );
		foreach ( $ids as $uid ) {
			MemberGlut_Role_Sync::sync_user( (int) $uid, null, true );
		}
		if ( count( $ids ) === 200 ) {
			MemberGlut_Scheduler::enqueue( 'memberglut_sync_roles_batch', array( 'offset' => $offset + 200 ) );
		} else {
			memberglut_log( 'info', 'cron', 'Role sync finished' );
		}
	}
}
