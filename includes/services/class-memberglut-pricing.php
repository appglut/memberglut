<?php
/**
 * Order maths: one summary used by the checkout UI, the gateways and the payment rows.
 *
 *  - subtotal  = plan price (first period)
 *  - signup fee = first purchase, or plan change when the target plan charges it on changes
 *  - discount  = coupon on the plan price only
 *  - trial     = first charge is only the sign-up fee; the price starts after the trial
 *  - recurring = amount of each renewal (coupon kept only when it applies to every payment)
 *
 * Pro can change the result (tax, proration) with the memberglut_order_summary filter.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Pricing class.
 */
class MemberGlut_Pricing {

	/**
	 * Whether the user gets the plan's free trial.
	 *
	 * @param array $plan    Plan.
	 * @param int   $user_id User (0 = new).
	 * @return bool
	 */
	public static function has_trial( $plan, $user_id = 0 ) {
		if ( 'paid' !== $plan['type'] || 'recurring' !== $plan['billing'] || empty( $plan['trial'] ) ) {
			return false;
		}
		if ( $plan['one_trial'] && $user_id && get_user_meta( $user_id, 'memberglut_used_trial', true ) ) {
			return false;
		}
		return true;
	}

	/**
	 * Order summary.
	 *
	 * @param array      $plan    Plan.
	 * @param array|null $coupon  Coupon row (already validated).
	 * @param int        $user_id User.
	 * @param array      $context change (bool): plan change of an existing member; renewal (bool): early renewal, no sign-up fee.
	 * @return array
	 */
	public static function summary( $plan, $coupon = null, $user_id = 0, $context = array() ) {
		$currency  = memberglut_setting( 'currency', 'USD' );
		$change    = ! empty( $context['change'] );
		$price     = 'paid' === $plan['type'] ? (float) $plan['price'] : 0.0;
		$fee       = 'paid' === $plan['type'] && empty( $context['renewal'] ) && ( ! $change || $plan['fee_on_change'] ) ? (float) $plan['signup_fee'] : 0.0;
		$trial     = self::has_trial( $plan, $user_id );
		$recurring = 'paid' === $plan['type'] && 'recurring' === $plan['billing'];
		$discount  = $coupon ? MemberGlut_Coupons::discount( $coupon, $price ) : 0.0;
		$first     = $trial ? 0.0 : max( 0, $price - $discount );
		$renewal   = $recurring ? max( 0, $price - ( $coupon && $coupon['recurring'] ? $discount : 0 ) ) : 0.0;

		$lines   = array();
		$lines[] = array( 'label' => $plan['name'] . ( $recurring ? ' (' . MemberGlut_Plans::period_label( $plan['duration'] ) . ')' : '' ), 'amount' => $price );
		if ( $fee > 0 ) {
			$lines[] = array( 'label' => __( 'Sign-up fee', 'memberglut' ), 'amount' => $fee );
		}
		if ( $discount > 0 ) {
			/* translators: %s: coupon code */
			$lines[] = array( 'label' => sprintf( __( 'Coupon %s', 'memberglut' ), $coupon['code'] ), 'amount' => -$discount );
		}
		if ( $trial ) {
			/* translators: %s: trial length */
			$lines[] = array( 'label' => sprintf( __( 'Free trial (%s)', 'memberglut' ), MemberGlut_Plans::period_label( $plan['trial_length'] ) ), 'amount' => -( $price - $discount ) );
		}
		$total = memberglut_round( $first + $fee, $currency );
		$s     = array(
			'currency'      => $currency,
			'plan_id'       => (int) $plan['id'],
			'subtotal'      => memberglut_round( $price, $currency ),
			'signup_fee'    => memberglut_round( $fee, $currency ),
			'discount'      => memberglut_round( $discount, $currency ),
			'tax'           => 0.0,
			'total'         => $total,
			'recurring'     => $recurring,
			'renewal'       => memberglut_round( $renewal, $currency ),
			'trial'         => $trial,
			'trial_days'    => $trial ? self::days( $plan['trial_length'] ) : 0,
			'coupon_id'     => $coupon ? (int) $coupon['id'] : 0,
			'coupon_code'   => $coupon ? $coupon['code'] : '',
			'coupon_recurring' => $coupon ? (bool) $coupon['recurring'] : false,
			'change'        => $change,
			'lines'         => $lines,
		);
		$s['text'] = self::describe( $s, $plan );
		return apply_filters( 'memberglut_order_summary', $s, $plan, $coupon, $user_id, $context );
	}

	/**
	 * Approximate days of a duration (Stripe trial_period_days).
	 *
	 * @param array $d Duration.
	 * @return int
	 */
	public static function days( $d ) {
		$start = memberglut_now();
		return (int) max( 1, round( ( strtotime( memberglut_add_duration( $start, $d['length'], $d['unit'] ) . ' UTC' ) - strtotime( $start . ' UTC' ) ) / DAY_IN_SECONDS ) );
	}

	/**
	 * Human summary, e.g. “$10.00 today, then $9.00 / month”.
	 *
	 * @param array $s    Summary.
	 * @param array $plan Plan.
	 * @return string
	 */
	public static function describe( $s, $plan ) {
		$today = memberglut_format_price( $s['total'], $s['currency'] );
		if ( ! $s['recurring'] ) {
			/* translators: %s: amount */
			return sprintf( __( '%s today', 'memberglut' ), $today );
		}
		$then = memberglut_format_price( $s['renewal'], $s['currency'] ) . ' / ' . MemberGlut_Plans::period_label( $plan['duration'] );
		if ( $s['trial'] ) {
			/* translators: 1: amount today, 2: trial length, 3: price per period */
			return sprintf( __( '%1$s today, %3$s after the %2$s free trial', 'memberglut' ), $today, MemberGlut_Plans::period_label( $plan['trial_length'] ), $then );
		}
		if ( $plan['limit_cycles'] && $plan['cycles'] > 1 ) {
			/* translators: 1: amount today, 2: renewal amount, 3: number of payments */
			return sprintf( __( '%1$s today, then %2$s (%3$d payments in total)', 'memberglut' ), $today, $then, $plan['cycles'] );
		}
		/* translators: 1: amount today, 2: renewal */
		return sprintf( __( '%1$s today, then %2$s', 'memberglut' ), $today, $then );
	}
}
