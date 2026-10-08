<?php
/**
 * Connects lifecycle hooks to the emails (plans/phase-05-emails.md, trigger table).
 *
 * Account emails that belong to a single flow (password reset, email change, account deleted) are sent by that
 * flow directly through MemberGlut_Mailer::send().
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Email_Triggers class.
 */
class MemberGlut_Email_Triggers {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'memberglut_subscription_created', array( __CLASS__, 'created' ), 10, 3 );
		add_action( 'memberglut_subscription_activated', array( __CLASS__, 'activated' ), 10, 3 );
		add_action( 'memberglut_subscription_renewed', array( __CLASS__, 'renewed' ), 10, 2 );
		add_action( 'memberglut_subscription_canceled', array( __CLASS__, 'canceled' ), 10, 3 );
		add_action( 'memberglut_subscription_expired', array( __CLASS__, 'expired' ), 10, 2 );
		add_action( 'memberglut_payment_completed', array( __CLASS__, 'payment_completed' ), 10, 2 );
		add_action( 'memberglut_payment_failed', array( __CLASS__, 'payment_failed' ), 10, 2 );
		add_action( 'memberglut_bank_payment_pending', array( __CLASS__, 'bank_pending' ), 10, 2 );
		add_action( 'memberglut_user_registered', array( __CLASS__, 'registered' ), 10, 2 );
		add_action( 'memberglut_account_pending', array( __CLASS__, 'account_pending' ), 10, 3 );
		add_action( 'memberglut_member_approved', array( __CLASS__, 'approved' ) );
		add_action( 'memberglut_member_rejected', array( __CLASS__, 'rejected' ) );
		add_action( 'memberglut_daily', array( 'MemberGlut_Mailer', 'send_reminders' ) );
	}

	/**
	 * Whether a subscription asked for member emails (Add member › “Send email”).
	 *
	 * @param array $sub Row.
	 * @return bool
	 */
	private static function wants_email( $sub ) {
		return ! isset( $sub['meta']['send_email'] ) || $sub['meta']['send_email'];
	}

	/**
	 * First subscription of a user → admin “New member”.
	 *
	 * @param array $sub      Row.
	 * @param array $plan     Plan.
	 * @param bool  $is_first First subscription of the user.
	 * @return void
	 */
	public static function created( $sub, $plan, $is_first ) {
		if ( $is_first && 'default_plan' !== $sub['source'] && 'import' !== $sub['source'] ) {
			MemberGlut_Mailer::send( 'admin_new_member', null, array( 'user_id' => $sub['user_id'], 'subscription' => $sub, 'plan' => $plan ) );
		}
	}

	/**
	 * First activation → “Subscription activated” (plan › Send the email must be on).
	 *
	 * @param array $sub   Row.
	 * @param array $plan  Plan.
	 * @param bool  $first First activation.
	 * @return void
	 */
	public static function activated( $sub, $plan, $first ) {
		if ( $first && ! empty( $plan['send_welcome'] ) && self::wants_email( $sub ) ) {
			MemberGlut_Mailer::send( 'activated', null, array( 'user_id' => $sub['user_id'], 'subscription' => $sub, 'plan' => $plan ) );
		}
	}

	/**
	 * Renewal.
	 *
	 * @param array $sub  Row.
	 * @param array $plan Plan.
	 * @return void
	 */
	public static function renewed( $sub, $plan ) {
		MemberGlut_Mailer::send( 'renewed', null, array( 'user_id' => $sub['user_id'], 'subscription' => $sub, 'plan' => $plan ) );
	}

	/**
	 * Cancel / abandon.
	 *
	 * @param array $sub       Row.
	 * @param array $plan      Plan.
	 * @param bool  $by_member By the member.
	 * @return void
	 */
	public static function canceled( $sub, $plan, $by_member ) {
		$ctx = array( 'user_id' => $sub['user_id'], 'subscription' => $sub, 'plan' => $plan );
		MemberGlut_Mailer::send( 'canceled', null, $ctx );
		if ( $by_member ) {
			MemberGlut_Mailer::send( 'admin_canceled', null, $ctx );
		}
	}

	/**
	 * Expired.
	 *
	 * @param array $sub  Row.
	 * @param array $plan Plan.
	 * @return void
	 */
	public static function expired( $sub, $plan ) {
		// No "expired" email right after a cancel-now: the member just got "canceled".
		if ( ! empty( $sub['canceled_at'] ) && strtotime( $sub['canceled_at'] . ' UTC' ) > time() - 300 ) {
			return;
		}
		MemberGlut_Mailer::send( 'expired', null, array( 'user_id' => $sub['user_id'], 'subscription' => $sub, 'plan' => $plan ) );
	}

	/**
	 * Payment completed → receipt + admin notice.
	 *
	 * @param array      $payment Payment row.
	 * @param array|null $sub     Subscription row.
	 * @return void
	 */
	public static function payment_completed( $payment, $sub = null ) {
		$ctx = array( 'user_id' => $payment['user_id'], 'payment' => $payment, 'subscription' => $sub );
		if ( (float) $payment['amount'] > 0 ) {
			MemberGlut_Mailer::send( 'receipt', $payment['email'] ? $payment['email'] : null, $ctx );
			MemberGlut_Mailer::send( 'admin_new_payment', null, $ctx );
		}
	}

	/**
	 * Payment failed.
	 *
	 * @param array      $payment Payment row.
	 * @param array|null $sub     Subscription row.
	 * @return void
	 */
	public static function payment_failed( $payment, $sub = null ) {
		MemberGlut_Mailer::send( 'payment_failed', null, array( 'user_id' => $payment['user_id'], 'payment' => $payment, 'subscription' => $sub ) );
	}

	/**
	 * Bank transfer pending.
	 *
	 * @param array      $payment Payment row.
	 * @param array|null $sub     Subscription row.
	 * @return void
	 */
	public static function bank_pending( $payment, $sub = null ) {
		MemberGlut_Mailer::send( 'pending_manual', null, array( 'user_id' => $payment['user_id'], 'payment' => $payment, 'subscription' => $sub ) );
	}

	/**
	 * New account.
	 *
	 * @param int   $user_id User.
	 * @param array $ctx     Extra context (set_password_link…).
	 * @return void
	 */
	public static function registered( $user_id, $ctx = array() ) {
		MemberGlut_Mailer::send( 'register', null, array_merge( array( 'user_id' => $user_id ), (array) $ctx ) );
	}

	/**
	 * Account waiting for email confirmation or admin approval.
	 *
	 * @param int    $user_id User.
	 * @param string $mode    email|admin.
	 * @param string $link    Activation link (email mode).
	 * @return void
	 */
	public static function account_pending( $user_id, $mode, $link = '' ) {
		if ( 'email' === $mode ) {
			MemberGlut_Mailer::send( 'activation', null, array( 'user_id' => $user_id, 'activation_link' => $link ) );
			return;
		}
		MemberGlut_Mailer::send( 'pending_review', null, array( 'user_id' => $user_id ) );
		MemberGlut_Mailer::send( 'admin_pending_review', null, array( 'user_id' => $user_id ) );
	}

	/**
	 * Approved.
	 *
	 * @param int $user_id User.
	 * @return void
	 */
	public static function approved( $user_id ) {
		MemberGlut_Mailer::send( 'approved', null, array( 'user_id' => $user_id ) );
	}

	/**
	 * Rejected.
	 *
	 * @param int $user_id User.
	 * @return void
	 */
	public static function rejected( $user_id ) {
		MemberGlut_Mailer::send( 'rejected', null, array( 'user_id' => $user_id ) );
	}
}
