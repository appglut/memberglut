<?php
/**
 * Base class of a payment gateway.
 *
 * A gateway turns a pending payment (and subscription) into money: process() starts the payment, confirm() checks
 * the result when the buyer returns, handle_webhook() keeps renewals, failures, refunds and cancellations in sync.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Gateway class.
 */
abstract class MemberGlut_Gateway {

	/**
	 * Gateway ID (stripe, paypal, bank…).
	 *
	 * @var string
	 */
	public $id = '';

	/**
	 * Features: one_time, recurring, refunds, trial, update_card, cancel.
	 *
	 * @var string[]
	 */
	protected $features = array( 'one_time' );

	/**
	 * Title shown at checkout.
	 *
	 * @return string
	 */
	abstract public function title();

	/**
	 * Enabled in Global Settings.
	 *
	 * @return bool
	 */
	public function is_enabled() {
		return (bool) memberglut_setting( $this->id . '_enabled', false );
	}

	/**
	 * Has the keys it needs.
	 *
	 * @return bool
	 */
	public function is_configured() {
		return true;
	}

	/**
	 * Offered at checkout.
	 *
	 * @return bool
	 */
	public function is_available() {
		return $this->is_enabled() && $this->is_configured();
	}

	/**
	 * Whether a feature is supported.
	 *
	 * @param string $feature Feature.
	 * @return bool
	 */
	public function supports( $feature ) {
		return in_array( $feature, $this->features, true );
	}

	/**
	 * Effective mode (decision D5: global test mode wins).
	 *
	 * @return string test|live
	 */
	public function mode() {
		return 'test';
	}

	/**
	 * Start the payment.
	 *
	 * @param array $ctx user (WP_User), plan, summary, payment, subscription, data.
	 * @return array|WP_Error [ complete => bool ] | [ redirect => url ] | [ client => array ].
	 */
	abstract public function process( $ctx );

	/**
	 * Check the result when the buyer comes back (return URL).
	 *
	 * @param array $payment Payment.
	 * @param array $data    Query data.
	 * @return true|WP_Error|null True when completed, null when still pending.
	 */
	public function confirm( $payment, $data ) {
		return null;
	}

	/**
	 * Refund.
	 *
	 * @param array $payment Payment.
	 * @param float $amount  Amount.
	 * @return true|WP_Error
	 */
	public function refund( $payment, $amount ) {
		return new WP_Error( 'memberglut_no_refunds', __( 'This payment method does not support refunds. Refund the customer yourself, then record it.', 'memberglut' ) );
	}

	/**
	 * Stop a gateway subscription.
	 *
	 * @param array  $sub  Subscription.
	 * @param string $when now|period_end|cycles_complete.
	 * @return true|WP_Error
	 */
	public function cancel_subscription( $sub, $when = 'now' ) {
		return true;
	}

	/**
	 * Webhook.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return array|WP_Error Response body.
	 */
	public function handle_webhook( $request ) {
		return new WP_Error( 'memberglut_no_webhooks', 'No webhooks.', array( 'status' => 404 ) );
	}

	/**
	 * Dashboard link of a transaction.
	 *
	 * @param array $payment Payment.
	 * @return string
	 */
	public function transaction_url( $payment ) {
		return '';
	}

	/**
	 * Settings the checkout script needs (public keys only).
	 *
	 * @return array
	 */
	public function client_config() {
		return array();
	}

	/**
	 * Remember that a webhook arrived (System status).
	 *
	 * @return void
	 */
	protected function webhook_seen() {
		update_option( 'memberglut_last_webhook_' . $this->id, time(), false );
	}

	/**
	 * Return URL after an off-site / 3-D Secure payment.
	 *
	 * @param array $payment Payment.
	 * @return string
	 */
	public function return_url( $payment ) {
		$base = memberglut_page_url( 'thanks' );
		$base = $base ? $base : ( memberglut_page_url( 'account' ) ? memberglut_page_url( 'account' ) : home_url( '/' ) );
		return add_query_arg( array( 'mg_payment' => $payment['id'], 'mg_key' => $payment['meta']['key'], 'mg_confirm' => $this->id ), $base );
	}
}
