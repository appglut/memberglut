<?php
/**
 * Payments: create, complete, fail (dunning), refund, mark paid, manual payments, queries and export.
 *
 * Completing a payment drives the subscription: new → activate (or stay pending while the account waits for
 * approval, decision D7), renewal → renew, upgrade → activate the new plan and end the old one (decision D17).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared,WordPress.DB.PreparedSQL.NotPrepared -- Plugin tables; values prepared.

/**
 * MemberGlut_Payments class.
 */
class MemberGlut_Payments {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'memberglut_daily', array( __CLASS__, 'manual_renewals' ), 20 );
	}

	/**
	 * One payment row.
	 *
	 * @param int $id ID.
	 * @return array|null
	 */
	public static function get( $id ) {
		return memberglut_repo( 'payments' )->find( (int) $id );
	}

	/**
	 * Create a pending payment.
	 *
	 * @param array $a user_id, subscription_id, plan_id, type, gateway, summary (from MemberGlut_Pricing) or amounts, email, note, status.
	 * @return array Row.
	 */
	public static function create( $a ) {
		$s    = isset( $a['summary'] ) ? $a['summary'] : array();
		$user = ! empty( $a['user_id'] ) ? get_userdata( $a['user_id'] ) : null;
		$id   = memberglut_repo( 'payments' )->insert(
			array(
				'user_id'         => isset( $a['user_id'] ) ? (int) $a['user_id'] : 0,
				'subscription_id' => ! empty( $a['subscription_id'] ) ? (int) $a['subscription_id'] : null,
				'plan_id'         => ! empty( $a['plan_id'] ) ? (int) $a['plan_id'] : null,
				'type'            => isset( $a['type'] ) ? $a['type'] : 'new',
				'status'          => isset( $a['status'] ) ? $a['status'] : 'pending',
				'currency'        => isset( $s['currency'] ) ? $s['currency'] : memberglut_setting( 'currency', 'USD' ),
				'subtotal'        => isset( $a['subtotal'] ) ? $a['subtotal'] : ( isset( $s['subtotal'] ) ? $s['subtotal'] : 0 ),
				'discount'        => isset( $a['discount'] ) ? $a['discount'] : ( isset( $s['discount'] ) ? $s['discount'] : 0 ),
				'signup_fee'      => isset( $a['signup_fee'] ) ? $a['signup_fee'] : ( isset( $s['signup_fee'] ) ? $s['signup_fee'] : 0 ),
				'tax'             => isset( $s['tax'] ) ? $s['tax'] : 0,
				'amount'          => isset( $a['amount'] ) ? $a['amount'] : ( isset( $s['total'] ) ? $s['total'] : 0 ),
				'gateway'         => isset( $a['gateway'] ) ? $a['gateway'] : '',
				'transaction_id'  => isset( $a['transaction_id'] ) ? $a['transaction_id'] : '',
				'coupon_code'     => isset( $s['coupon_code'] ) ? $s['coupon_code'] : ( isset( $a['coupon_code'] ) ? $a['coupon_code'] : '' ),
				'email'           => isset( $a['email'] ) ? $a['email'] : ( $user ? $user->user_email : '' ),
				'note'            => isset( $a['note'] ) ? $a['note'] : '',
				'ip'              => memberglut_client_ip(),
				'created_at'      => ! empty( $a['created_at'] ) ? $a['created_at'] : memberglut_now(),
				'meta'            => array_merge(
					array(
						'key'       => wp_generate_password( 20, false ),
						'coupon_id' => isset( $s['coupon_id'] ) ? (int) $s['coupon_id'] : 0,
					),
					isset( $a['meta'] ) ? (array) $a['meta'] : array()
				),
			)
		);
		self::log( $id, 'created', __( 'Payment created', 'memberglut' ) );
		return self::get( $id );
	}

	/**
	 * Merge meta.
	 *
	 * @param int   $id    Payment.
	 * @param array $patch Meta.
	 * @return void
	 */
	public static function update_meta( $id, $patch ) {
		$p = self::get( $id );
		if ( $p ) {
			memberglut_repo( 'payments' )->update( $id, array( 'meta' => array_merge( (array) $p['meta'], $patch ) ) );
		}
	}

	/**
	 * Audit line for a payment (shown in the payment drawer).
	 *
	 * @param int    $id      Payment.
	 * @param string $event   Event.
	 * @param string $message Text.
	 * @return void
	 */
	public static function log( $id, $event, $message ) {
		$p = self::get( $id );
		memberglut_event( 'payment_' . $event, $message, array( 'user_id' => $p ? $p['user_id'] : null, 'object_type' => 'payment', 'object_id' => $id ) );
	}

	/**
	 * Complete a payment and apply it to the subscription.
	 *
	 * @param int   $id   Payment.
	 * @param array $args transaction_id, period_end (UTC), gateway_subscription_id, gateway_customer_id.
	 * @return array|WP_Error Payment row.
	 */
	public static function complete( $id, $args = array() ) {
		$p = self::get( $id );
		if ( ! $p ) {
			return new WP_Error( 'memberglut_not_found', __( 'Payment not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( 'completed' === $p['status'] ) {
			return $p; // Idempotent (webhook + return page).
		}
		$update = array( 'status' => 'completed', 'updated_at' => memberglut_now() );
		if ( ! empty( $args['transaction_id'] ) ) {
			$update['transaction_id'] = (string) $args['transaction_id'];
		}
		if ( isset( $args['amount'] ) ) {
			$update['amount'] = (float) $args['amount'];
		}
		memberglut_repo( 'payments' )->update( $id, $update );
		$p = self::get( $id );
		/* translators: 1: amount, 2: gateway */
		self::log( $id, 'completed', sprintf( __( 'Payment of %1$s completed (%2$s)', 'memberglut' ), memberglut_format_price( $p['amount'], $p['currency'] ), $p['gateway'] ) );
		memberglut_log( 'info', 'payment', sprintf( 'Payment #%d completed: %s %s via %s', $id, $p['amount'], $p['currency'], $p['gateway'] ) );

		if ( ! empty( $p['meta']['coupon_id'] ) ) {
			MemberGlut_Coupons::record_use( (int) $p['meta']['coupon_id'], (int) $p['user_id'], $p['email'], $id );
		}

		$sub = $p['subscription_id'] ? MemberGlut_Subscription_Service::get( $p['subscription_id'] ) : null;
		if ( $sub ) {
			$cols = array();
			foreach ( array( 'gateway_subscription_id', 'gateway_customer_id' ) as $k ) {
				if ( ! empty( $args[ $k ] ) ) {
					$cols[ $k ] = (string) $args[ $k ];
				}
			}
			if ( $cols ) {
				memberglut_repo( 'subscriptions' )->update( $sub['id'], $cols );
			}
			if ( 'renewal' === $p['type'] ) {
				MemberGlut_Subscription_Service::renew( $sub['id'], ! empty( $args['period_end'] ) ? array( 'period_end' => $args['period_end'] ) : array() );
			} elseif ( MemberGlut_Approval::is_pending( (int) $p['user_id'] ) ) {
				// Paid, but the account waits for approval (D7): activated on approval.
				$meta                     = (array) $sub['meta'];
				$meta['awaiting_payment'] = false;
				memberglut_repo( 'subscriptions' )->update( $sub['id'], array( 'meta' => $meta ) );
			} elseif ( in_array( $sub['status'], array( 'pending', 'on_hold', 'expired' ), true ) || ( 'active' === $sub['status'] && ! empty( $sub['meta']['awaiting_payment'] ) ) ) {
				$meta                     = (array) $sub['meta'];
				$meta['awaiting_payment'] = false;
				memberglut_repo( 'subscriptions' )->update( $sub['id'], array( 'meta' => $meta ) );
				$act = array();
				if ( ! empty( $args['period_end'] ) ) {
					$act['expires'] = $args['period_end'];
				}
				MemberGlut_Subscription_Service::activate( $sub['id'], $act );
				// Count the first billing cycle.
				if ( empty( $p['meta']['trial'] ) && (float) $p['subtotal'] > 0 ) {
					memberglut_repo( 'subscriptions' )->update( $sub['id'], array( 'billing_cycles_done' => 1 ) );
				}
			}
			// Upgrade: the previous plan of the group ends now.
			if ( ! empty( $p['meta']['change_from'] ) ) {
				$old = MemberGlut_Subscription_Service::get( (int) $p['meta']['change_from'] );
				if ( $old && (int) $old['id'] !== (int) $sub['id'] && MemberGlut_Subscription_Service::grants_access( $old ) ) {
					MemberGlut_Subscription_Service::expire( $old['id'], __( '(changed plan)', 'memberglut' ) );
				}
			}
			$sub = MemberGlut_Subscription_Service::get( $sub['id'] );
		}
		MemberGlut_Stats::increment( 'revenue', (int) $p['plan_id'], (float) $p['amount'] );
		do_action( 'memberglut_payment_completed', $p, $sub );
		return $p;
	}

	/**
	 * Mark a payment failed. Renewal failures go through the dunning rules (decision D6).
	 *
	 * @param int    $id     Payment.
	 * @param string $reason Reason.
	 * @return array|WP_Error
	 */
	public static function fail( $id, $reason = '' ) {
		$p = self::get( $id );
		if ( ! $p ) {
			return new WP_Error( 'memberglut_not_found', __( 'Payment not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( 'failed' !== $p['status'] ) {
			memberglut_repo( 'payments' )->update( $id, array( 'status' => 'failed', 'note' => trim( $p['note'] . ' ' . $reason ) ) );
			/* translators: %s: reason */
			self::log( $id, 'failed', sprintf( __( 'Payment failed: %s', 'memberglut' ), $reason ? $reason : __( 'declined', 'memberglut' ) ) );
			memberglut_log( 'warning', 'payment', sprintf( 'Payment #%d failed: %s', $id, $reason ) );
		}
		$p   = self::get( $id );
		$sub = $p['subscription_id'] ? MemberGlut_Subscription_Service::get( $p['subscription_id'] ) : null;
		if ( $sub && 'renewal' === $p['type'] ) {
			self::renewal_failed( $sub );
		}
		do_action( 'memberglut_payment_failed', $p, $sub );
		return $p;
	}

	/**
	 * Dunning: Renewals › Retry failed payments / Maximum retries / Access while retrying.
	 *
	 * @param array $sub Subscription.
	 * @return void
	 */
	public static function renewal_failed( $sub ) {
		$count = (int) $sub['retry_count'] + 1;
		memberglut_repo( 'subscriptions' )->update( $sub['id'], array( 'retry_count' => $count ) );
		$max = memberglut_setting( 'retry_failed', true ) ? (int) memberglut_setting( 'retry_max', 3 ) : 0;
		if ( $count > $max ) {
			MemberGlut_Subscription_Service::expire( $sub['id'], __( '(payment failed)', 'memberglut' ) );
			return;
		}
		if ( 'on_hold' === memberglut_setting( 'retry_status', 'on_hold' ) && 'on_hold' !== $sub['status'] ) {
			MemberGlut_Subscription_Service::put_on_hold( $sub['id'] );
		} elseif ( 'active' === memberglut_setting( 'retry_status', 'on_hold' ) && $sub['expires_at'] && strtotime( $sub['expires_at'] . ' UTC' ) < time() + DAY_IN_SECONDS ) {
			// Keep access while retrying: push the end a little so the sweep does not expire it.
			memberglut_repo( 'subscriptions' )->update( $sub['id'], array( 'expires_at' => memberglut_add_duration( memberglut_now(), max( 1, (int) memberglut_setting( 'retry_interval', 3 ) ), 'day' ) ) );
		}
	}

	/**
	 * Refund (through the gateway when it supports refunds).
	 *
	 * @param int        $id     Payment.
	 * @param float|null $amount Amount (null = full).
	 * @param bool       $remote Call the gateway (false when the gateway already refunded, e.g. a webhook).
	 * @return array|WP_Error
	 */
	public static function refund( $id, $amount = null, $remote = true ) {
		$p = self::get( $id );
		if ( ! $p ) {
			return new WP_Error( 'memberglut_not_found', __( 'Payment not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( ! in_array( $p['status'], array( 'completed', 'refunded' ), true ) ) {
			return new WP_Error( 'memberglut_not_refundable', __( 'Only completed payments can be refunded.', 'memberglut' ), array( 'status' => 400 ) );
		}
		$left   = (float) $p['amount'] - (float) $p['refunded_amount'];
		$amount = null === $amount ? $left : min( $left, (float) $amount );
		if ( $amount <= 0 ) {
			return new WP_Error( 'memberglut_not_refundable', __( 'This payment is already refunded.', 'memberglut' ), array( 'status' => 400 ) );
		}
		if ( $remote ) {
			$gateway = MemberGlut_Gateways::get( $p['gateway'] );
			if ( $gateway && $gateway->supports( 'refunds' ) && $p['transaction_id'] ) {
				$res = $gateway->refund( $p, $amount );
				if ( is_wp_error( $res ) ) {
					self::log( $id, 'refund_failed', sprintf( /* translators: %s: error */ __( 'Refund failed: %s', 'memberglut' ), $res->get_error_message() ) );
					return $res;
				}
			}
		}
		$refunded = memberglut_round( (float) $p['refunded_amount'] + $amount, $p['currency'] );
		$full     = $refunded >= (float) $p['amount'] - 0.001;
		memberglut_repo( 'payments' )->update( $id, array( 'refunded_amount' => $refunded, 'status' => $full ? 'refunded' : 'completed' ) );
		/* translators: %s: amount */
		self::log( $id, 'refunded', sprintf( __( 'Refunded %s', 'memberglut' ), memberglut_format_price( $amount, $p['currency'] ) ) );
		MemberGlut_Stats::increment( 'refunds', (int) $p['plan_id'], $amount );
		$p   = self::get( $id );
		$sub = $p['subscription_id'] ? MemberGlut_Subscription_Service::get( $p['subscription_id'] ) : null;
		if ( $full && $sub && memberglut_setting( 'refund_revokes', true ) && MemberGlut_Subscription_Service::grants_access( $sub ) ) {
			MemberGlut_Subscription_Service::expire( $sub['id'], __( '(refunded)', 'memberglut' ) );
		}
		do_action( 'memberglut_payment_refunded', $p, $amount, $sub );
		return $p;
	}

	/**
	 * Admin “Add manual payment”.
	 *
	 * @param array $d member (user ID), plan, amount, status, date, note, activate.
	 * @return array|WP_Error
	 */
	public static function add_manual( $d ) {
		$user_id = isset( $d['member'] ) ? (int) $d['member'] : 0;
		$plan    = MemberGlut_Plans::get( isset( $d['plan'] ) ? (int) $d['plan'] : 0 );
		$errors  = array();
		if ( ! get_userdata( $user_id ) ) {
			$errors['member'] = __( 'Choose a member.', 'memberglut' );
		}
		if ( ! $plan ) {
			$errors['plan'] = __( 'Choose a plan.', 'memberglut' );
		}
		$amount = isset( $d['amount'] ) ? round( (float) $d['amount'], 4 ) : -1;
		if ( $amount < 0 ) {
			$errors['amount'] = __( 'Enter the amount.', 'memberglut' );
		}
		if ( $errors ) {
			return new WP_Error( 'memberglut_invalid', reset( $errors ), array( 'status' => 400, 'fields' => $errors ) );
		}
		$status = isset( $d['status'] ) && in_array( $d['status'], array( 'completed', 'pending', 'failed', 'refunded' ), true ) ? $d['status'] : 'completed';
		$date   = ! empty( $d['date'] ) ? memberglut_parse_date( $d['date'] ) : memberglut_now();
		$sub_id = null;
		$type   = 'manual';
		if ( ! empty( $d['activate'] ) && 'completed' === $status ) {
			$existing = null;
			foreach ( MemberGlut_Subscription_Service::for_user( $user_id ) as $s ) {
				if ( (int) $s['plan_id'] === (int) $plan['id'] && in_array( $s['status'], array( 'active', 'trialing', 'canceled', 'on_hold', 'pending', 'expired' ), true ) ) {
					$existing = $s;
					break;
				}
			}
			if ( $existing ) {
				$sub_id = (int) $existing['id'];
				$type   = in_array( $existing['status'], array( 'pending' ), true ) ? 'new' : 'renewal';
			} else {
				$sub = MemberGlut_Subscription_Service::create( $user_id, $plan['id'], array( 'status' => 'pending', 'source' => 'admin', 'gateway' => 'manual', 'meta' => array( 'awaiting_payment' => true ) ) );
				if ( is_wp_error( $sub ) ) {
					return $sub;
				}
				$sub_id = (int) $sub['id'];
				$type   = 'new';
			}
		}
		$p = self::create(
			array(
				'user_id'         => $user_id,
				'subscription_id' => $sub_id,
				'plan_id'         => $plan['id'],
				'type'            => $type,
				'status'          => 'pending',
				'gateway'         => 'manual',
				'amount'          => $amount,
				'subtotal'        => $amount,
				'note'            => isset( $d['note'] ) ? sanitize_textarea_field( $d['note'] ) : '',
				'created_at'      => $date,
				'meta'            => array( 'manual_type' => $type, 'recorded_by' => get_current_user_id() ),
			)
		);
		if ( 'completed' === $status ) {
			return self::complete( $p['id'] );
		}
		if ( 'pending' !== $status ) {
			memberglut_repo( 'payments' )->update( $p['id'], array( 'status' => $status, 'refunded_amount' => 'refunded' === $status ? $amount : 0 ) );
		}
		return self::get( $p['id'] );
	}

	/**
	 * A renewal charged by a gateway (webhook): record the payment and renew.
	 *
	 * @param array  $sub            Subscription.
	 * @param float  $amount         Amount.
	 * @param string $transaction_id Gateway transaction.
	 * @param string $period_end     UTC end of the new period.
	 * @return array Payment.
	 */
	public static function record_renewal( $sub, $amount, $transaction_id, $period_end = '' ) {
		$existing = $transaction_id ? memberglut_repo( 'payments' )->find_by( array( 'transaction_id' => $transaction_id ) ) : null;
		if ( $existing ) {
			return $existing;
		}
		$plan = MemberGlut_Plans::get( $sub['plan_id'] );
		$p    = self::create(
			array(
				'user_id'         => $sub['user_id'],
				'subscription_id' => $sub['id'],
				'plan_id'         => $sub['plan_id'],
				'type'            => 'renewal',
				'gateway'         => $sub['gateway'],
				'amount'          => $amount,
				'subtotal'        => $plan ? $plan['price'] : $amount,
				'discount'        => $plan ? max( 0, $plan['price'] - $amount ) : 0,
				'transaction_id'  => $transaction_id,
			)
		);
		return self::complete( $p['id'], array( 'period_end' => $period_end ) );
	}

	/**
	 * Daily: renewals of subscriptions without automatic billing (bank transfer and manual, decision D8).
	 * A pending renewal payment is created when the period ends; unpaid ones follow the retry rules.
	 *
	 * @return void
	 */
	public static function manual_renewals() {
		$repo = memberglut_repo( 'subscriptions' );
		$soon = gmdate( 'Y-m-d H:i:s', time() + DAY_IN_SECONDS );
		foreach ( $repo->query( array( 'where' => array( 'status' => array( 'active', 'on_hold' ), 'gateway' => 'bank', 'gateway_subscription_id' => '', 'next_payment_at IS NOT NULL' => true, 'next_payment_at <=' => $soon ), 'per_page' => 200 ) ) as $sub ) {
			$plan = MemberGlut_Plans::get( $sub['plan_id'] );
			if ( ! $plan || 'recurring' !== $plan['billing'] ) {
				continue;
			}
			$open = memberglut_repo( 'payments' )->find_by( array( 'subscription_id' => $sub['id'], 'type' => 'renewal', 'status' => 'pending' ) );
			if ( $open ) {
				$age = ( time() - strtotime( $open['created_at'] . ' UTC' ) ) / DAY_IN_SECONDS;
				$due = ( (int) $sub['retry_count'] + 1 ) * max( 1, (int) memberglut_setting( 'retry_interval', 3 ) );
				if ( $age >= $due ) {
					self::renewal_failed( $sub );
					do_action( 'memberglut_bank_payment_pending', $open, MemberGlut_Subscription_Service::get( $sub['id'] ) );
				}
				continue;
			}
			$s = MemberGlut_Pricing::summary( $plan, null, $sub['user_id'], array( 'change' => true ) );
			$p = self::create(
				array(
					'user_id'         => $sub['user_id'],
					'subscription_id' => $sub['id'],
					'plan_id'         => $sub['plan_id'],
					'type'            => 'renewal',
					'gateway'         => 'bank',
					'amount'          => $sub['billing_amount'] > 0 ? $sub['billing_amount'] : $s['renewal'],
					'subtotal'        => $plan['price'],
				)
			);
			do_action( 'memberglut_bank_payment_pending', $p, $sub );
		}
	}

	/* ---------------------------------------------------------------------
	 * Queries
	 * ------------------------------------------------------------------ */

	/**
	 * Client shape.
	 *
	 * @param array $p Row.
	 * @return array
	 */
	public static function to_client( $p ) {
		$user = $p['user_id'] ? get_userdata( $p['user_id'] ) : null;
		$plan = $p['plan_id'] ? MemberGlut_Plans::get( $p['plan_id'] ) : null;
		return array(
			'id'              => (int) $p['id'],
			'member_id'       => (int) $p['user_id'],
			'user_id'         => (int) $p['user_id'],
			'name'            => $user ? $user->display_name : ( $p['email'] ? $p['email'] : __( 'Deleted user', 'memberglut' ) ),
			'email'           => $user ? $user->user_email : $p['email'],
			'plan'            => $plan ? $plan['name'] : '',
			'plan_id'         => (int) $p['plan_id'],
			'subscription_id' => (int) $p['subscription_id'],
			'amount'          => (float) $p['amount'],
			'subtotal'        => (float) $p['subtotal'],
			'discount'        => (float) $p['discount'],
			'signup_fee'      => (float) $p['signup_fee'],
			'tax'             => (float) $p['tax'],
			'refunded'        => (float) $p['refunded_amount'],
			'currency'        => $p['currency'],
			'gateway'         => $p['gateway'],
			'status'          => $p['status'],
			'type'            => $p['type'],
			'transaction_id'  => $p['transaction_id'],
			'transaction_url' => self::transaction_url( $p ),
			'coupon'          => $p['coupon_code'],
			'note'            => $p['note'],
			'date'            => memberglut_iso( $p['created_at'] ),
			'refundable'      => 'completed' === $p['status'] && ( ! MemberGlut_Gateways::get( $p['gateway'] ) || ! $p['transaction_id'] || MemberGlut_Gateways::get( $p['gateway'] )->supports( 'refunds' ) ),
		);
	}

	/**
	 * Link to the transaction in the gateway dashboard.
	 *
	 * @param array $p Payment.
	 * @return string
	 */
	public static function transaction_url( $p ) {
		$g = MemberGlut_Gateways::get( $p['gateway'] );
		return $g && $p['transaction_id'] ? $g->transaction_url( $p ) : '';
	}

	/**
	 * WHERE args from filters.
	 *
	 * @param array $f status, gateway, search, from, to, user, plan.
	 * @return array
	 */
	public static function filter_args( $f ) {
		$where = array();
		if ( ! empty( $f['status'] ) ) {
			$where['status'] = $f['status'];
		}
		if ( ! empty( $f['gateway'] ) ) {
			$where['gateway'] = $f['gateway'];
		}
		if ( ! empty( $f['user'] ) ) {
			$where['user_id'] = (int) $f['user'];
		}
		if ( ! empty( $f['plan'] ) ) {
			$where['plan_id'] = (int) $f['plan'];
		}
		if ( ! empty( $f['from'] ) ) {
			$where['created_at >='] = memberglut_parse_date( $f['from'] );
		}
		if ( ! empty( $f['to'] ) ) {
			$where['created_at <='] = memberglut_parse_date( $f['to'], true );
		}
		$args = array( 'where' => $where );
		if ( ! empty( $f['search'] ) ) {
			global $wpdb;
			$search = trim( (string) $f['search'] );
			$like   = '%' . $wpdb->esc_like( ltrim( $search, '#' ) ) . '%';
			$users  = get_users( array( 'search' => '*' . $search . '*', 'search_columns' => array( 'user_login', 'user_email', 'display_name' ), 'fields' => 'ID', 'number' => 200 ) );
			$parts  = array( $wpdb->prepare( 'transaction_id LIKE %s OR email LIKE %s OR coupon_code LIKE %s', $like, $like, $like ) );
			if ( ctype_digit( ltrim( $search, '#' ) ) ) {
				$parts[] = $wpdb->prepare( 'id = %d', (int) ltrim( $search, '#' ) );
			}
			if ( $users ) {
				$parts[] = 'user_id IN (' . implode( ',', array_map( 'intval', $users ) ) . ')';
			}
			$args['raw_where'] = implode( ' OR ', $parts );
		}
		return $args;
	}

	/**
	 * Totals per status for the stat cards.
	 *
	 * @param array $f Filters (status ignored).
	 * @return array
	 */
	public static function summary( $f = array() ) {
		unset( $f['status'] );
		$args  = self::filter_args( $f );
		$repo  = memberglut_repo( 'payments' );
		$table = $repo->table();
		global $wpdb;
		// phpcs:ignore PluginCheck.Security.DirectDB.UnescapedDBParameter -- Table names are built from $wpdb->prefix and the plugin table list; values are prepared.
		$rows  = $wpdb->get_results( "SELECT status, COUNT(*) AS n, COALESCE(SUM(amount),0) AS total, COALESCE(SUM(refunded_amount),0) AS refunded FROM `{$table}` WHERE " . self::where_for( $args ) . ' GROUP BY status', ARRAY_A );
		$out   = array();
		foreach ( array( 'completed', 'pending', 'failed', 'refunded' ) as $s ) {
			$out[ $s ] = array( 'count' => 0, 'total' => 0.0 );
		}
		$refunded_total = 0.0;
		foreach ( (array) $rows as $r ) {
			$out[ $r['status'] ] = array( 'count' => (int) $r['n'], 'total' => round( (float) $r['total'], 2 ) );
			$refunded_total     += (float) $r['refunded'];
		}
		$out['refunded']['total'] = round( $refunded_total, 2 );
		$out['net']               = round( $out['completed']['total'] + $out['refunded']['total'] - $refunded_total, 2 );
		return $out;
	}

	/**
	 * WHERE SQL for args (uses the repository builder).
	 *
	 * @param array $args Args.
	 * @return string
	 */
	private static function where_for( $args ) {
		$repo = memberglut_repo( 'payments' );
		$sql  = $repo->build_where( isset( $args['where'] ) ? $args['where'] : array() );
		if ( ! empty( $args['raw_where'] ) ) {
			$sql .= ' AND (' . $args['raw_where'] . ')';
		}
		return $sql;
	}

	/**
	 * Stream payments as CSV.
	 *
	 * @param array $f Filters.
	 * @return void
	 */
	public static function stream_csv( $f ) {
		nocache_headers();
		header( 'Content-Type: text/csv; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename="memberglut-payments-' . gmdate( 'Y-m-d' ) . '.csv"' );
		$out = fopen( 'php://output', 'w' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fopen -- Streaming.
		fwrite( $out, "\xEF\xBB\xBF" ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fwrite -- BOM.
		fputcsv( $out, array( 'ID', 'Date', 'Member', 'Email', 'Plan', 'Type', 'Method', 'Status', 'Currency', 'Subtotal', 'Sign-up fee', 'Discount', 'Tax', 'Amount', 'Refunded', 'Coupon', 'Transaction ID', 'Note' ) );
		$args = self::filter_args( $f );
		$page = 1;
		do {
			$rows = memberglut_repo( 'payments' )->query( array_merge( $args, array( 'orderby' => 'id DESC', 'page' => $page, 'per_page' => 500 ) ) );
			foreach ( $rows as $p ) {
				$c = self::to_client( $p );
				fputcsv( $out, array_map( array( 'MemberGlut_Members', 'csv_safe' ), array( $c['id'], $p['created_at'], $c['name'], $c['email'], $c['plan'], $c['type'], $c['gateway'], $c['status'], $c['currency'], $c['subtotal'], $c['signup_fee'], $c['discount'], $c['tax'], $c['amount'], $c['refunded'], $c['coupon'], $c['transaction_id'], $c['note'] ) ) );
			}
			++$page;
		} while ( count( $rows ) === 500 );
		fclose( $out ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose -- Streaming.
		exit;
	}
}
