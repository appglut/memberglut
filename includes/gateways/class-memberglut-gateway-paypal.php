<?php
/**
 * PayPal (Payments › PayPal): Smart Buttons with Orders v2 for one-time payments and the Subscriptions API for
 * recurring plans (trial, sign-up fee, coupon price override), refunds and verified webhooks.
 *
 * External service: PayPal — https://www.paypal.com/webapps/mpp/ua/privacy-full (declared in readme.txt).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Gateway_Paypal class.
 */
class MemberGlut_Gateway_Paypal extends MemberGlut_Gateway {

	/**
	 * ID.
	 *
	 * @var string
	 */
	public $id = 'paypal';

	/**
	 * Features.
	 *
	 * @var string[]
	 */
	protected $features = array( 'one_time', 'recurring', 'refunds', 'trial', 'cancel' );

	/**
	 * Title.
	 *
	 * @return string
	 */
	public function title() {
		return 'PayPal';
	}

	/**
	 * Mode (global test mode wins).
	 *
	 * @return string
	 */
	public function mode() {
		return memberglut_setting( 'test_mode', true ) || 'sandbox' === memberglut_setting( 'paypal_mode', 'sandbox' ) ? 'test' : 'live';
	}

	/**
	 * API base.
	 *
	 * @return string
	 */
	private function base() {
		return 'test' === $this->mode() ? 'https://api-m.sandbox.paypal.com/' : 'https://api-m.paypal.com/';
	}

	/**
	 * Keys present.
	 *
	 * @return bool
	 */
	public function is_configured() {
		return '' !== (string) memberglut_setting( 'paypal_client_id', '' ) && '' !== (string) memberglut_setting( 'paypal_secret', '' );
	}

	/**
	 * Checkout script settings.
	 *
	 * @return array
	 */
	public function client_config() {
		return array( 'client_id' => (string) memberglut_setting( 'paypal_client_id', '' ) );
	}

	/**
	 * OAuth token (cached).
	 *
	 * @return string|WP_Error
	 */
	private function token() {
		$key   = 'memberglut_paypal_token_' . $this->mode() . '_' . md5( (string) memberglut_setting( 'paypal_client_id', '' ) );
		$token = get_transient( $key );
		if ( $token ) {
			return $token;
		}
		$res = wp_remote_post(
			$this->base() . 'v1/oauth2/token',
			array(
				'timeout' => 30,
				'headers' => array( 'Authorization' => 'Basic ' . base64_encode( memberglut_setting( 'paypal_client_id', '' ) . ':' . memberglut_setting( 'paypal_secret', '' ) ) ), // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode -- HTTP Basic auth.
				'body'    => array( 'grant_type' => 'client_credentials' ),
			)
		);
		$body = is_wp_error( $res ) ? null : json_decode( wp_remote_retrieve_body( $res ), true );
		if ( empty( $body['access_token'] ) ) {
			memberglut_log( 'error', 'payment', 'PayPal authentication failed' );
			return new WP_Error( 'memberglut_paypal', __( 'Could not connect to PayPal. Check the client ID and secret.', 'memberglut' ) );
		}
		set_transient( $key, $body['access_token'], max( 60, (int) $body['expires_in'] - 120 ) );
		return $body['access_token'];
	}

	/**
	 * Call the PayPal API.
	 *
	 * @param string $method Method.
	 * @param string $path   Path.
	 * @param array  $body   JSON body.
	 * @param string $idem   PayPal-Request-Id.
	 * @return array|WP_Error
	 */
	public function api( $method, $path, $body = null, $idem = '' ) {
		$token = $this->token();
		if ( is_wp_error( $token ) ) {
			return $token;
		}
		$args = array(
			'method'  => $method,
			'timeout' => 30,
			'headers' => array( 'Authorization' => 'Bearer ' . $token, 'Content-Type' => 'application/json', 'Prefer' => 'return=representation' ),
		);
		if ( $idem ) {
			$args['headers']['PayPal-Request-Id'] = $idem;
		}
		if ( null !== $body ) {
			$args['body'] = wp_json_encode( $body );
		}
		$res = wp_remote_request( $this->base() . ltrim( $path, '/' ), $args );
		if ( is_wp_error( $res ) ) {
			return new WP_Error( 'memberglut_paypal', __( 'Could not reach PayPal. Please try again.', 'memberglut' ) );
		}
		$code = (int) wp_remote_retrieve_response_code( $res );
		$data = json_decode( wp_remote_retrieve_body( $res ), true );
		if ( $code >= 400 ) {
			$msg = isset( $data['details'][0]['description'] ) ? $data['details'][0]['description'] : ( isset( $data['message'] ) ? $data['message'] : __( 'PayPal error.', 'memberglut' ) );
			memberglut_log( 'error', 'payment', sprintf( 'PayPal %s %s → %d: %s', $method, $path, $code, $msg ) );
			return new WP_Error( 'memberglut_paypal', $msg, array( 'status' => 400 ) );
		}
		return is_array( $data ) ? $data : array();
	}

	/**
	 * Amount object.
	 *
	 * @param float  $amount   Amount.
	 * @param string $currency Currency.
	 * @return array
	 */
	private function money( $amount, $currency ) {
		return array( 'currency_code' => strtoupper( $currency ), 'value' => number_format( (float) $amount, memberglut_is_zero_decimal( $currency ) ? 0 : 2, '.', '' ) );
	}

	/**
	 * Interval unit.
	 *
	 * @param string $unit day|week|month|year.
	 * @return string
	 */
	private function unit( $unit ) {
		return strtoupper( $unit );
	}

	/**
	 * Product + billing plan of a plan for the current price (created on demand).
	 *
	 * @param array $plan Plan.
	 * @param array $s    Summary.
	 * @return string|WP_Error PayPal plan ID.
	 */
	private function billing_plan( $plan, $s ) {
		$ids = MemberGlut_Plans::gateway_ids( $plan['id'] );
		$k   = 'paypal_' . $this->mode();
		if ( empty( $ids[ $k ]['product'] ) ) {
			$p = $this->api( 'POST', 'v1/catalogs/products', array( 'name' => $plan['name'], 'type' => 'DIGITAL', 'category' => 'SOFTWARE' ), 'mg-prod-' . $plan['id'] . '-' . md5( home_url() ) );
			if ( is_wp_error( $p ) ) {
				return $p;
			}
			$ids[ $k ]['product'] = $p['id'];
			MemberGlut_Plans::set_gateway_ids( $plan['id'], $ids );
		}
		$sig = md5( $s['currency'] . '|' . $plan['price'] . '|' . $plan['duration']['unit'] . $plan['duration']['length'] . '|' . ( $s['trial'] ? $s['trial_days'] : 0 ) . '|' . ( $plan['limit_cycles'] ? $plan['cycles'] : 0 ) );
		if ( ! empty( $ids[ $k ]['plans'][ $sig ] ) ) {
			return $ids[ $k ]['plans'][ $sig ];
		}
		$cycles = array();
		$seq    = 1;
		if ( $s['trial'] ) {
			$cycles[] = array( 'frequency' => array( 'interval_unit' => 'DAY', 'interval_count' => min( 365, $s['trial_days'] ) ), 'tenure_type' => 'TRIAL', 'sequence' => $seq++, 'total_cycles' => 1, 'pricing_scheme' => array( 'fixed_price' => $this->money( 0, $s['currency'] ) ) );
		}
		$cycles[] = array(
			'frequency'      => array( 'interval_unit' => $this->unit( $plan['duration']['unit'] ), 'interval_count' => $plan['duration']['length'] ),
			'tenure_type'    => 'REGULAR',
			'sequence'       => $seq,
			'total_cycles'   => $plan['limit_cycles'] ? (int) $plan['cycles'] : 0,
			'pricing_scheme' => array( 'fixed_price' => $this->money( $plan['price'], $s['currency'] ) ),
		);
		$pp = $this->api(
			'POST',
			'v1/billing/plans',
			array(
				'product_id'          => $ids[ $k ]['product'],
				'name'                => $plan['name'],
				'billing_cycles'      => $cycles,
				'payment_preferences' => array( 'auto_bill_outstanding' => true, 'payment_failure_threshold' => max( 1, (int) memberglut_setting( 'retry_max', 3 ) ) ),
			)
		);
		if ( is_wp_error( $pp ) ) {
			return $pp;
		}
		$ids[ $k ]['plans'][ $sig ] = $pp['id'];
		MemberGlut_Plans::set_gateway_ids( $plan['id'], $ids );
		return $pp['id'];
	}

	/**
	 * Checkout: the browser shows the PayPal buttons, which call create_order / create_subscription.
	 *
	 * @param array $ctx Context.
	 * @return array
	 */
	public function process( $ctx ) {
		return array(
			'client' => array(
				'gateway'   => 'paypal',
				'type'      => $ctx['summary']['recurring'] ? 'subscription' : 'order',
				'payment'   => (int) $ctx['payment']['id'],
				'key'       => $ctx['payment']['meta']['key'],
				'client_id' => (string) memberglut_setting( 'paypal_client_id', '' ),
				'currency'  => strtoupper( $ctx['summary']['currency'] ),
				'return_url' => $this->return_url( $ctx['payment'] ),
			),
		);
	}

	/**
	 * Create the order (one-time) for a pending payment.
	 *
	 * @param array $payment Payment.
	 * @return array|WP_Error [ id ]
	 */
	public function create_order( $payment ) {
		$plan  = MemberGlut_Plans::get( $payment['plan_id'] );
		$order = $this->api(
			'POST',
			'v2/checkout/orders',
			array(
				'intent'         => 'CAPTURE',
				'purchase_units' => array(
					array(
						'reference_id' => 'mg-' . $payment['id'],
						'custom_id'    => (string) $payment['id'],
						'description'  => $plan ? $plan['name'] : get_bloginfo( 'name' ),
						'amount'       => $this->money( $payment['amount'], $payment['currency'] ),
					),
				),
				'application_context' => array( 'shipping_preference' => 'NO_SHIPPING', 'user_action' => 'PAY_NOW', 'brand_name' => wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ) ),
			),
			'mg-order-' . $payment['id']
		);
		if ( is_wp_error( $order ) ) {
			return $order;
		}
		MemberGlut_Payments::update_meta( $payment['id'], array( 'paypal_order' => $order['id'] ) );
		return array( 'id' => $order['id'] );
	}

	/**
	 * Capture an approved order and complete the payment.
	 *
	 * @param array  $payment  Payment.
	 * @param string $order_id Order.
	 * @return true|WP_Error
	 */
	public function capture_order( $payment, $order_id ) {
		if ( empty( $payment['meta']['paypal_order'] ) || $payment['meta']['paypal_order'] !== $order_id ) {
			return new WP_Error( 'memberglut_paypal', __( 'This PayPal order does not belong to the payment.', 'memberglut' ) );
		}
		$c = $this->api( 'POST', 'v2/checkout/orders/' . rawurlencode( $order_id ) . '/capture', new stdClass(), 'mg-cap-' . $payment['id'] );
		if ( is_wp_error( $c ) ) {
			return $c;
		}
		$capture = isset( $c['purchase_units'][0]['payments']['captures'][0] ) ? $c['purchase_units'][0]['payments']['captures'][0] : null;
		if ( ! $capture || ! in_array( $capture['status'], array( 'COMPLETED', 'PENDING' ), true ) ) {
			return new WP_Error( 'memberglut_paypal', __( 'PayPal did not complete the payment.', 'memberglut' ) );
		}
		if ( 'COMPLETED' === $capture['status'] ) {
			MemberGlut_Payments::complete( $payment['id'], array( 'transaction_id' => $capture['id'] ) );
		} else {
			memberglut_repo( 'payments' )->update( $payment['id'], array( 'transaction_id' => $capture['id'] ) );
		}
		return true;
	}

	/**
	 * Create the PayPal subscription for a pending payment.
	 *
	 * @param array $payment Payment.
	 * @return array|WP_Error [ id ]
	 */
	public function create_subscription( $payment ) {
		$plan = MemberGlut_Plans::get( $payment['plan_id'] );
		$sub  = MemberGlut_Subscription_Service::get( $payment['subscription_id'] );
		$user = get_userdata( $payment['user_id'] );
		if ( ! $plan || ! $sub || ! $user ) {
			return new WP_Error( 'memberglut_paypal', __( 'Payment not found.', 'memberglut' ) );
		}
		$coupon = ! empty( $payment['meta']['coupon_id'] ) ? memberglut_repo( 'coupons' )->find( (int) $payment['meta']['coupon_id'] ) : null;
		$s      = MemberGlut_Pricing::summary( $plan, $coupon, $user->ID, array( 'change' => ! empty( $payment['meta']['change_from'] ) ) );
		$pp     = $this->billing_plan( $plan, $s );
		if ( is_wp_error( $pp ) ) {
			return $pp;
		}
		$body = array(
			'plan_id'             => $pp,
			'custom_id'           => (string) $payment['id'],
			'subscriber'          => array( 'email_address' => $user->user_email ),
			'application_context' => array( 'shipping_preference' => 'NO_SHIPPING', 'user_action' => 'SUBSCRIBE_NOW', 'brand_name' => wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ) ),
		);
		$override = array();
		if ( $s['signup_fee'] > 0 ) {
			$override['payment_preferences'] = array( 'setup_fee' => $this->money( $s['signup_fee'], $s['currency'] ), 'setup_fee_failure_action' => 'CANCEL' );
		}
		if ( $coupon && $s['discount'] > 0 ) {
			$seq                        = $s['trial'] ? 2 : 1;
			$override['billing_cycles'] = array( array( 'sequence' => $seq, 'pricing_scheme' => array( 'fixed_price' => $this->money( $s['recurring'] && $coupon['recurring'] ? $s['renewal'] : $plan['price'] - $s['discount'], $s['currency'] ) ) ) );
		}
		if ( $override ) {
			$body['plan'] = $override;
		}
		$r = $this->api( 'POST', 'v1/billing/subscriptions', $body, 'mg-psub-' . $payment['id'] );
		if ( is_wp_error( $r ) ) {
			return $r;
		}
		memberglut_repo( 'subscriptions' )->update( $sub['id'], array( 'gateway_subscription_id' => $r['id'] ) );
		MemberGlut_Payments::update_meta( $payment['id'], array( 'paypal_sub' => $r['id'] ) );
		return array( 'id' => $r['id'] );
	}

	/**
	 * After the buyer approved the subscription.
	 *
	 * @param array  $payment Payment.
	 * @param string $sub_id  PayPal subscription.
	 * @return true|WP_Error|null
	 */
	public function approve_subscription( $payment, $sub_id ) {
		if ( empty( $payment['meta']['paypal_sub'] ) || $payment['meta']['paypal_sub'] !== $sub_id ) {
			return new WP_Error( 'memberglut_paypal', __( 'This PayPal subscription does not belong to the payment.', 'memberglut' ) );
		}
		return $this->confirm( $payment, array() );
	}

	/**
	 * Check a payment's PayPal state.
	 *
	 * @param array $payment Payment.
	 * @param array $data    Data.
	 * @return true|WP_Error|null
	 */
	public function confirm( $payment, $data ) {
		$meta = (array) $payment['meta'];
		if ( ! empty( $meta['paypal_sub'] ) ) {
			$s = $this->api( 'GET', 'v1/billing/subscriptions/' . rawurlencode( $meta['paypal_sub'] ) );
			if ( is_wp_error( $s ) ) {
				return $s;
			}
			if ( in_array( $s['status'], array( 'ACTIVE', 'APPROVED' ), true ) ) {
				$end = ! empty( $s['billing_info']['next_billing_time'] ) ? memberglut_parse_date( $s['billing_info']['next_billing_time'] ) : '';
				MemberGlut_Payments::complete( $payment['id'], array( 'gateway_subscription_id' => $s['id'], 'transaction_id' => $s['id'], 'period_end' => $end ) );
				return true;
			}
			return null;
		}
		if ( ! empty( $meta['paypal_order'] ) ) {
			$o = $this->api( 'GET', 'v2/checkout/orders/' . rawurlencode( $meta['paypal_order'] ) );
			if ( ! is_wp_error( $o ) && 'APPROVED' === $o['status'] ) {
				return $this->capture_order( $payment, $o['id'] );
			}
			if ( ! is_wp_error( $o ) && 'COMPLETED' === $o['status'] ) {
				$capture = $o['purchase_units'][0]['payments']['captures'][0];
				MemberGlut_Payments::complete( $payment['id'], array( 'transaction_id' => $capture['id'] ) );
				return true;
			}
		}
		return null;
	}

	/**
	 * Refund a capture or a subscription sale.
	 *
	 * @param array $payment Payment.
	 * @param float $amount  Amount.
	 * @return true|WP_Error
	 */
	public function refund( $payment, $amount ) {
		$txn  = $payment['transaction_id'];
		$body = array( 'amount' => $this->money( $amount, $payment['currency'] ) );
		if ( 0 === strpos( $txn, 'I-' ) ) {
			return new WP_Error( 'memberglut_paypal', __( 'Refund this subscription payment from your PayPal account (no transaction to refund yet).', 'memberglut' ) );
		}
		$r = ! empty( $payment['meta']['paypal_sale'] )
			? $this->api( 'POST', 'v1/payments/sale/' . rawurlencode( $txn ) . '/refund', array( 'amount' => array( 'total' => $body['amount']['value'], 'currency' => $body['amount']['currency_code'] ) ) )
			: $this->api( 'POST', 'v2/payments/captures/' . rawurlencode( $txn ) . '/refund', $body, 'mg-re-' . $payment['id'] . '-' . $body['amount']['value'] );
		return is_wp_error( $r ) ? $r : true;
	}

	/**
	 * Cancel at PayPal (PayPal has no “at period end”: access stays until then in MemberGlut).
	 *
	 * @param array  $sub  Subscription.
	 * @param string $when When.
	 * @return true|WP_Error
	 */
	public function cancel_subscription( $sub, $when = 'now' ) {
		$r = $this->api( 'POST', 'v1/billing/subscriptions/' . rawurlencode( $sub['gateway_subscription_id'] ) . '/cancel', array( 'reason' => 'Canceled from ' . wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ) ) );
		if ( is_wp_error( $r ) && false !== stripos( $r->get_error_message(), 'not' ) ) {
			return true; // Already canceled.
		}
		return is_wp_error( $r ) ? $r : true;
	}

	/**
	 * Dashboard link.
	 *
	 * @param array $payment Payment.
	 * @return string
	 */
	public function transaction_url( $payment ) {
		$base = 'test' === $this->mode() ? 'https://www.sandbox.paypal.com/' : 'https://www.paypal.com/';
		if ( 0 === strpos( $payment['transaction_id'], 'I-' ) ) {
			return $base . 'billing/subscriptions/' . rawurlencode( $payment['transaction_id'] );
		}
		return $base . 'activity/payment/' . rawurlencode( $payment['transaction_id'] );
	}

	/**
	 * Webhook (verified through the PayPal API with the Webhook ID).
	 *
	 * @param WP_REST_Request $request Request.
	 * @return array|WP_Error
	 */
	public function handle_webhook( $request ) {
		$event = json_decode( $request->get_body(), true );
		if ( ! is_array( $event ) || empty( $event['event_type'] ) ) {
			return new WP_Error( 'memberglut_payload', 'Invalid payload', array( 'status' => 400 ) );
		}
		$verify = $this->api(
			'POST',
			'v1/notifications/verify-webhook-signature',
			array(
				'auth_algo'         => $request->get_header( 'paypal_auth_algo' ),
				'cert_url'          => $request->get_header( 'paypal_cert_url' ),
				'transmission_id'   => $request->get_header( 'paypal_transmission_id' ),
				'transmission_sig'  => $request->get_header( 'paypal_transmission_sig' ),
				'transmission_time' => $request->get_header( 'paypal_transmission_time' ),
				'webhook_id'        => (string) memberglut_setting( 'paypal_webhook_id', '' ),
				'webhook_event'     => $event,
			)
		);
		if ( is_wp_error( $verify ) || empty( $verify['verification_status'] ) || 'SUCCESS' !== $verify['verification_status'] ) {
			memberglut_log( 'warning', 'webhook', 'PayPal webhook failed verification' );
			return new WP_Error( 'memberglut_signature', 'Invalid signature', array( 'status' => 400 ) );
		}
		$this->webhook_seen();
		$seen = 'memberglut_wh_' . md5( $event['id'] );
		if ( get_transient( $seen ) ) {
			return array( 'received' => true, 'duplicate' => true );
		}
		set_transient( $seen, 1, 3 * DAY_IN_SECONDS );
		memberglut_log( 'info', 'webhook', 'PayPal webhook ' . $event['event_type'] );
		$r = isset( $event['resource'] ) ? $event['resource'] : array();
		switch ( $event['event_type'] ) {
			case 'PAYMENT.CAPTURE.COMPLETED':
				$pid = isset( $r['custom_id'] ) ? (int) $r['custom_id'] : 0;
				if ( $pid ) {
					MemberGlut_Payments::complete( $pid, array( 'transaction_id' => $r['id'] ) );
				}
				break;
			case 'PAYMENT.SALE.COMPLETED':
				$this->on_sale( $r );
				break;
			case 'BILLING.SUBSCRIPTION.CANCELLED':
			case 'BILLING.SUBSCRIPTION.EXPIRED':
				$sub = isset( $r['id'] ) ? memberglut_repo( 'subscriptions' )->find_by( array( 'gateway_subscription_id' => $r['id'] ) ) : null;
				if ( $sub && in_array( $sub['status'], array( 'active', 'trialing', 'on_hold' ), true ) ) {
					MemberGlut_Subscription_Service::transition( $sub['id'], 'canceled', array( 'canceled_at' => memberglut_now(), 'next_payment_at' => null ), __( '(canceled at PayPal)', 'memberglut' ) );
				}
				break;
			case 'BILLING.SUBSCRIPTION.SUSPENDED':
			case 'BILLING.SUBSCRIPTION.PAYMENT.FAILED':
				$sub = isset( $r['id'] ) ? memberglut_repo( 'subscriptions' )->find_by( array( 'gateway_subscription_id' => $r['id'] ) ) : null;
				if ( $sub ) {
					$p = MemberGlut_Payments::create( array( 'user_id' => $sub['user_id'], 'subscription_id' => $sub['id'], 'plan_id' => $sub['plan_id'], 'type' => 'renewal', 'gateway' => 'paypal', 'amount' => $sub['billing_amount'], 'transaction_id' => $event['id'] ) );
					MemberGlut_Payments::fail( $p['id'], __( 'PayPal payment failed', 'memberglut' ) );
				}
				break;
			case 'PAYMENT.CAPTURE.REFUNDED':
			case 'PAYMENT.SALE.REFUNDED':
				$this->on_refund( $r );
				break;
		}
		do_action( 'memberglut_webhook_received', 'paypal', $event );
		return array( 'received' => true );
	}

	/**
	 * Subscription payment (first one or renewal).
	 *
	 * @param array $r Sale resource.
	 * @return void
	 */
	private function on_sale( $r ) {
		$sub = ! empty( $r['billing_agreement_id'] ) ? memberglut_repo( 'subscriptions' )->find_by( array( 'gateway_subscription_id' => $r['billing_agreement_id'] ) ) : null;
		if ( ! $sub ) {
			return;
		}
		$amount  = isset( $r['amount']['total'] ) ? (float) $r['amount']['total'] : 0;
		$pending = memberglut_repo( 'payments' )->find_by( array( 'subscription_id' => $sub['id'], 'status' => 'pending' ) );
		if ( $pending && 'renewal' !== $pending['type'] ) {
			MemberGlut_Payments::update_meta( $pending['id'], array( 'paypal_sale' => true ) );
			MemberGlut_Payments::complete( $pending['id'], array( 'transaction_id' => $r['id'], 'amount' => $amount ) );
			return;
		}
		$p = MemberGlut_Payments::record_renewal( $sub, $amount, $r['id'] );
		MemberGlut_Payments::update_meta( $p['id'], array( 'paypal_sale' => true ) );
	}

	/**
	 * Refund made at PayPal.
	 *
	 * @param array $r Refund resource.
	 * @return void
	 */
	private function on_refund( $r ) {
		$capture = '';
		foreach ( isset( $r['links'] ) ? $r['links'] : array() as $l ) {
			if ( 'up' === $l['rel'] ) {
				$capture = basename( $l['href'] );
			}
		}
		$capture = $capture ? $capture : ( isset( $r['sale_id'] ) ? $r['sale_id'] : '' );
		$payment = $capture ? memberglut_repo( 'payments' )->find_by( array( 'transaction_id' => $capture ) ) : null;
		if ( ! $payment ) {
			return;
		}
		$amount = isset( $r['amount']['value'] ) ? (float) $r['amount']['value'] : ( isset( $r['amount']['total'] ) ? (float) $r['amount']['total'] : 0 );
		if ( $amount > 0 && (float) $payment['refunded_amount'] + $amount <= (float) $payment['amount'] + 0.001 ) {
			MemberGlut_Payments::refund( $payment['id'], $amount, false );
		}
	}
}
