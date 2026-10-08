<?php
/**
 * Public checkout endpoints: order summary (coupon / plan change), PayPal button callbacks, payment status.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Checkout class.
 */
class MemberGlut_REST_Checkout extends MemberGlut_REST_Controller {

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$this->route( '/public/checkout/summary', 'POST', 'summary', false );
		$this->route( '/public/checkout/paypal', 'POST', 'paypal', false );
		$this->route( '/public/checkout/status', 'POST', 'status', false );
	}

	/**
	 * Order summary for the plan and coupon currently chosen in the form.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function summary( WP_REST_Request $request ) {
		$d       = MemberGlut_REST_Public::data( $request );
		$plan    = MemberGlut_Plans::get( isset( $d['plan'] ) ? (int) $d['plan'] : 0 );
		$user_id = get_current_user_id();
		if ( ! $plan || 'active' !== $plan['status'] ) {
			return $this->error( 'plan', __( 'Choose a plan.', 'memberglut' ) );
		}
		$coupon = MemberGlut_Checkout::coupon_from( $plan, $d, $user_id, isset( $d['email'] ) ? sanitize_email( $d['email'] ) : '' );
		$error  = '';
		if ( is_wp_error( $coupon ) ) {
			$error  = $coupon->get_error_message();
			$coupon = null;
		}
		$change = $user_id && MemberGlut_Subscription_Service::in_group( $user_id, $plan['group'] );
		$s      = MemberGlut_Pricing::summary( $plan, $coupon, $user_id, array( 'change' => (bool) $change ) );
		return rest_ensure_response(
			array(
				'html'          => MemberGlut_Checkout::summary_html( $s ),
				'total'         => $s['total'],
				'needs_payment' => MemberGlut_Checkout::needs_gateway( $s ),
				'gateways'      => array_keys( MemberGlut_Checkout::gateways_for( $plan ) ),
				'coupon_error'  => $error,
				'coupon_ok'     => (bool) $coupon,
			)
		);
	}

	/**
	 * PayPal buttons: create the order / subscription, capture / approve.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function paypal( WP_REST_Request $request ) {
		$d = MemberGlut_REST_Public::data( $request );
		$p = MemberGlut_Checkout::payment_by_key( isset( $d['payment'] ) ? (int) $d['payment'] : 0, isset( $d['key'] ) ? (string) $d['key'] : '' );
		$g = MemberGlut_Gateways::get( 'paypal' );
		if ( ! $p || ! $g || 'paypal' !== $p['gateway'] ) {
			return $this->error( 'payment', __( 'Payment not found.', 'memberglut' ), 404 );
		}
		switch ( isset( $d['op'] ) ? $d['op'] : '' ) {
			case 'create_order':
				$r = $g->create_order( $p );
				break;
			case 'capture_order':
				$r = $g->capture_order( $p, sanitize_text_field( (string) $d['order_id'] ) );
				break;
			case 'create_subscription':
				$r = $g->create_subscription( $p );
				break;
			case 'approve_subscription':
				$r = $g->approve_subscription( $p, sanitize_text_field( (string) $d['subscription_id'] ) );
				break;
			default:
				$r = new WP_Error( 'memberglut_op', 'Unknown operation', array( 'status' => 400 ) );
		}
		if ( is_wp_error( $r ) ) {
			return $this->as_rest_error( $r );
		}
		$p = MemberGlut_Payments::get( $p['id'] );
		return rest_ensure_response( array_merge( is_array( $r ) ? $r : array(), array( 'status' => $p['status'], 'redirect' => 'completed' === $p['status'] ? MemberGlut_Checkout::after_payment_url( $p ) : '' ) ) );
	}

	/**
	 * Status of a payment (after the browser confirmed a Stripe payment).
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function status( WP_REST_Request $request ) {
		$d = MemberGlut_REST_Public::data( $request );
		$p = MemberGlut_Checkout::payment_by_key( isset( $d['payment'] ) ? (int) $d['payment'] : 0, isset( $d['key'] ) ? (string) $d['key'] : '' );
		if ( ! $p ) {
			return $this->error( 'payment', __( 'Payment not found.', 'memberglut' ), 404 );
		}
		if ( 'pending' === $p['status'] ) {
			$g = MemberGlut_Gateways::get( $p['gateway'] );
			if ( $g ) {
				$res = $g->confirm( $p, array() );
				if ( is_wp_error( $res ) ) {
					return $this->as_rest_error( $res );
				}
			}
			$p = MemberGlut_Payments::get( $p['id'] );
		}
		return rest_ensure_response( array( 'status' => $p['status'], 'redirect' => 'completed' === $p['status'] ? MemberGlut_Checkout::after_payment_url( $p ) : '' ) );
	}
}
