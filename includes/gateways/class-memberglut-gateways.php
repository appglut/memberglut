<?php
/**
 * Gateway registry (filter memberglut_gateways adds more, e.g. from Pro).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Gateways class.
 */
class MemberGlut_Gateways {

	/**
	 * Instances.
	 *
	 * @var MemberGlut_Gateway[]|null
	 */
	private static $gateways = null;

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'memberglut_cancel_gateway_subscription', array( __CLASS__, 'cancel_subscription' ), 10, 2 );
		add_action( 'admin_notices', array( __CLASS__, 'test_mode_notice' ) );
	}

	/**
	 * All gateways.
	 *
	 * @return MemberGlut_Gateway[]
	 */
	public static function all() {
		if ( null === self::$gateways ) {
			$classes        = apply_filters( 'memberglut_gateways', array( 'MemberGlut_Gateway_Stripe', 'MemberGlut_Gateway_Paypal', 'MemberGlut_Gateway_Bank', 'MemberGlut_Gateway_Manual', 'MemberGlut_Gateway_Free' ) );
			self::$gateways = array();
			foreach ( $classes as $class ) {
				$g = is_object( $class ) ? $class : ( class_exists( $class ) ? new $class() : null );
				if ( $g instanceof MemberGlut_Gateway ) {
					self::$gateways[ $g->id ] = $g;
				}
			}
		}
		return self::$gateways;
	}

	/**
	 * Gateway by ID.
	 *
	 * @param string $id ID.
	 * @return MemberGlut_Gateway|null
	 */
	public static function get( $id ) {
		$all = self::all();
		return isset( $all[ $id ] ) ? $all[ $id ] : null;
	}

	/**
	 * Checkout gateways (Stripe, PayPal, bank and add-ons; not manual/free).
	 *
	 * @return MemberGlut_Gateway[]
	 */
	public static function checkout_gateways() {
		return array_filter(
			self::all(),
			static function ( $g ) {
				return ! in_array( $g->id, array( 'manual', 'free' ), true );
			}
		);
	}

	/**
	 * For the admin lookups.
	 *
	 * @return array
	 */
	public static function for_client() {
		$out = array();
		foreach ( self::checkout_gateways() as $g ) {
			$out[] = array(
				'value'      => $g->id,
				'label'      => $g->title(),
				'enabled'    => $g->is_available(),
				'configured' => $g->is_configured(),
				'mode'       => $g->mode(),
				'recurring'  => $g->supports( 'recurring' ),
			);
		}
		return $out;
	}

	/**
	 * Whether any enabled gateway runs in test mode.
	 *
	 * @return bool
	 */
	public static function any_in_test_mode() {
		foreach ( self::checkout_gateways() as $g ) {
			if ( $g->is_enabled() && 'test' === $g->mode() && ! in_array( $g->id, array( 'bank' ), true ) ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Route a cancellation from the subscription engine to the gateway.
	 *
	 * @param array  $sub  Subscription.
	 * @param string $when now|period_end|cycles_complete.
	 * @return void
	 */
	public static function cancel_subscription( $sub, $when ) {
		if ( empty( $sub['gateway_subscription_id'] ) ) {
			return;
		}
		$g = self::get( $sub['gateway'] );
		if ( ! $g ) {
			return;
		}
		$res = $g->cancel_subscription( $sub, $when );
		if ( is_wp_error( $res ) ) {
			memberglut_log( 'error', 'payment', sprintf( 'Could not cancel %s subscription %s: %s', $sub['gateway'], $sub['gateway_subscription_id'], $res->get_error_message() ) );
			memberglut_event( 'gateway_error', sprintf( /* translators: 1: gateway, 2: error */ __( 'The %1$s subscription could not be canceled: %2$s. Cancel it in the %1$s dashboard.', 'memberglut' ), $g->title(), $res->get_error_message() ), array( 'user_id' => $sub['user_id'], 'object_type' => 'subscription', 'object_id' => $sub['id'], 'actor_id' => 0 ) );
		}
	}

	/**
	 * Admin notice while payments run in test mode.
	 *
	 * @return void
	 */
	public static function test_mode_notice() {
		if ( ! current_user_can( 'memberglut_manage_settings' ) || ! self::any_in_test_mode() ) {
			return;
		}
		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
		if ( $screen && false !== strpos( (string) $screen->id, 'memberglut' ) ) {
			return; // The React screens show their own badge.
		}
		echo '<div class="notice notice-warning"><p><strong>MemberGlut:</strong> ' . esc_html__( 'Payments are in test mode. No real money is charged.', 'memberglut' ) . ' <a href="' . esc_url( admin_url( 'admin.php?page=memberglut-settings&tab=payments' ) ) . '">' . esc_html__( 'Payment settings', 'memberglut' ) . '</a></p></div>';
	}
}
