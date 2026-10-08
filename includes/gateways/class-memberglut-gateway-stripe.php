<?php
/**
 * Stripe (Payments › Stripe): Payment Element for one-time payments and subscriptions, trials, sign-up fees,
 * coupons, 3-D Secure, card updates, refunds and webhooks. Talks to the Stripe API directly (no SDK).
 *
 * External service: Stripe, Inc. — https://stripe.com/privacy (declared in readme.txt).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Gateway_Stripe class.
 */
class MemberGlut_Gateway_Stripe extends MemberGlut_Gateway {

	const API     = 'https://api.stripe.com/v1/';
	const VERSION = '2024-06-20';

	/**
	 * ID.
	 *
	 * @var string
	 */
	public $id = 'stripe';

	/**
	 * Features.
	 *
	 * @var string[]
	 */
	protected $features = array( 'one_time', 'recurring', 'refunds', 'trial', 'update_card', 'cancel', 'change_price' );

	/**
	 * Title.
	 *
	 * @return string
	 */
	public function title() {
		return __( 'Card / Stripe', 'memberglut' );
	}

	/**
	 * Mode: global test mode wins (D5).
	 *
	 * @return string
	 */
	public function mode() {
		return memberglut_setting( 'test_mode', true ) || 'test' === memberglut_setting( 'stripe_mode', 'test' ) ? 'test' : 'live';
	}

	/**
	 * Secret key of the effective mode.
	 *
	 * @return string
	 */
	private function secret() {
		return (string) memberglut_setting( 'test' === $this->mode() ? 'stripe_test_secret' : 'stripe_live_secret', '' );
	}

	/**
	 * Publishable key of the effective mode.
	 *
	 * @return string
	 */
	public function publishable() {
		return (string) memberglut_setting( 'test' === $this->mode() ? 'stripe_test_publishable' : 'stripe_live_publishable', '' );
	}

	/**
	 * Keys present.
	 *
	 * @return bool
	 */
	public function is_configured() {
		return '' !== $this->secret() && '' !== $this->publishable();
	}

	/**
	 * Checkout script settings.
	 *
	 * @return array
	 */
	public function client_config() {
		return array(
			'key'     => $this->publishable(),
			'wallets' => (bool) memberglut_setting( 'stripe_wallets', true ),
		);
	}

	/* ---------------------------------------------------------------------
	 * API
	 * ------------------------------------------------------------------ */

	/**
	 * Call the Stripe API.
	 *
	 * @param string $method GET|POST|DELETE.
	 * @param string $path   Path (e.g. "customers").
	 * @param array  $params Params.
	 * @param string $idem   Idempotency key.
	 * @return array|WP_Error
	 */
	public function api( $method, $path, $params = array(), $idem = '' ) {
		$args = array(
			'method'  => $method,
			'timeout' => 30,
			'headers' => array(
				'Authorization'  => 'Bearer ' . $this->secret(),
				'Stripe-Version' => self::VERSION,
				'Content-Type'   => 'application/x-www-form-urlencoded',
			),
		);
		if ( $idem ) {
			$args['headers']['Idempotency-Key'] = $idem;
		}
		$url = self::API . ltrim( $path, '/' );
		if ( 'GET' === $method ) {
			$url = $params ? $url . '?' . http_build_query( $params ) : $url;
		} else {
			$args['body'] = http_build_query( $params );
		}
		$res = wp_remote_request( $url, $args );
		if ( is_wp_error( $res ) ) {
			memberglut_log( 'error', 'payment', 'Stripe request failed: ' . $res->get_error_message() );
			return new WP_Error( 'memberglut_stripe', __( 'Could not reach Stripe. Please try again.', 'memberglut' ) );
		}
		$body = json_decode( wp_remote_retrieve_body( $res ), true );
		$code = (int) wp_remote_retrieve_response_code( $res );
		if ( $code >= 400 || ! is_array( $body ) ) {
			$msg = isset( $body['error']['message'] ) ? $body['error']['message'] : __( 'Stripe error.', 'memberglut' );
			memberglut_log( 'error', 'payment', sprintf( 'Stripe %s %s → %d: %s', $method, $path, $code, $msg ) );
			return new WP_Error( 'memberglut_stripe', $msg, array( 'status' => 400, 'stripe' => isset( $body['error'] ) ? $body['error'] : null ) );
		}
		memberglut_log( 'debug', 'payment', sprintf( 'Stripe %s %s → %d', $method, $path, $code ) );
		return $body;
	}

	/**
	 * Stripe customer of a user (created on demand, one per mode).
	 *
	 * @param WP_User $user User.
	 * @return string|WP_Error
	 */
	public function customer( $user ) {
		$key = 'memberglut_stripe_customer_' . $this->mode();
		$id  = (string) get_user_meta( $user->ID, $key, true );
		if ( $id ) {
			return $id;
		}
		$c = $this->api( 'POST', 'customers', array( 'email' => $user->user_email, 'name' => $user->display_name, 'metadata' => array( 'user_id' => $user->ID, 'site' => home_url() ) ), 'mg-cus-' . $user->ID . '-' . $this->mode() );
		if ( is_wp_error( $c ) ) {
			return $c;
		}
		update_user_meta( $user->ID, $key, $c['id'] );
		return $c['id'];
	}

	/**
	 * Product of a plan.
	 *
	 * @param array $plan Plan.
	 * @return string|WP_Error
	 */
	private function product( $plan ) {
		$ids = MemberGlut_Plans::gateway_ids( $plan['id'] );
		$k   = 'stripe_' . $this->mode();
		if ( ! empty( $ids[ $k ]['product'] ) ) {
			return $ids[ $k ]['product'];
		}
		$p = $this->api( 'POST', 'products', array( 'name' => $plan['name'], 'metadata' => array( 'memberglut_plan' => $plan['id'] ) ), 'mg-prod-' . $plan['id'] . '-' . $this->mode() . '-' . md5( home_url() ) );
		if ( is_wp_error( $p ) ) {
			return $p;
		}
		$ids[ $k ]['product'] = $p['id'];
		MemberGlut_Plans::set_gateway_ids( $plan['id'], $ids );
		return $p['id'];
	}

	/**
	 * Recurring price of a plan for its current amount and interval (a new price when they change).
	 *
	 * @param array  $plan     Plan.
	 * @param string $currency Currency.
	 * @return string|WP_Error
	 */
	public function price( $plan, $currency ) {
		$product = $this->product( $plan );
		if ( is_wp_error( $product ) ) {
			return $product;
		}
		$amount = memberglut_to_minor( $plan['price'], $currency );
		$sig    = md5( strtolower( $currency ) . '|' . $amount . '|' . $plan['duration']['unit'] . '|' . $plan['duration']['length'] );
		$ids    = MemberGlut_Plans::gateway_ids( $plan['id'] );
		$k      = 'stripe_' . $this->mode();
		if ( ! empty( $ids[ $k ]['prices'][ $sig ] ) ) {
			return $ids[ $k ]['prices'][ $sig ];
		}
		$price = $this->api(
			'POST',
			'prices',
			array(
				'product'     => $product,
				'currency'    => strtolower( $currency ),
				'unit_amount' => $amount,
				'recurring'   => array( 'interval' => $plan['duration']['unit'], 'interval_count' => $plan['duration']['length'] ),
				'metadata'    => array( 'memberglut_plan' => $plan['id'] ),
			)
		);
		if ( is_wp_error( $price ) ) {
			return $price;
		}
		$ids[ $k ]['prices'][ $sig ] = $price['id'];
		MemberGlut_Plans::set_gateway_ids( $plan['id'], $ids );
		return $price['id'];
	}

	/**
	 * Stripe coupon mirroring a MemberGlut coupon.
	 *
	 * @param int    $coupon_id Coupon.
	 * @param string $currency  Currency.
	 * @return string|WP_Error|null
	 */
	private function coupon( $coupon_id, $currency ) {
		$row = $coupon_id ? memberglut_repo( 'coupons' )->find( $coupon_id ) : null;
		if ( ! $row ) {
			return null;
		}
		$sig  = md5( $row['type'] . '|' . $row['amount'] . '|' . (int) $row['recurring'] . '|' . strtolower( $currency ) );
		$meta = (array) $row['meta'];
		$k    = 'stripe_' . $this->mode();
		if ( ! empty( $meta[ $k ][ $sig ] ) ) {
			return $meta[ $k ][ $sig ];
		}
		$params = array( 'duration' => $row['recurring'] ? 'forever' : 'once', 'name' => $row['code'], 'metadata' => array( 'memberglut_coupon' => $row['id'] ) );
		if ( 'percent' === $row['type'] ) {
			$params['percent_off'] = (float) $row['amount'];
		} else {
			$params['amount_off'] = memberglut_to_minor( $row['amount'], $currency );
			$params['currency']   = strtolower( $currency );
		}
		$c = $this->api( 'POST', 'coupons', $params );
		if ( is_wp_error( $c ) ) {
			return $c;
		}
		$meta[ $k ][ $sig ] = $c['id'];
		memberglut_repo( 'coupons' )->update( $row['id'], array( 'meta' => $meta ) );
		return $c['id'];
	}

	/* ---------------------------------------------------------------------
	 * Checkout
	 * ------------------------------------------------------------------ */

	/**
	 * Create the PaymentIntent or Subscription; the browser confirms it with the Payment Element.
	 *
	 * @param array $ctx Context.
	 * @return array|WP_Error
	 */
	public function process( $ctx ) {
		$user     = $ctx['user'];
		$plan     = $ctx['plan'];
		$s        = $ctx['summary'];
		$payment  = $ctx['payment'];
		$sub      = $ctx['subscription'];
		$currency = strtolower( $s['currency'] );
		$customer = $this->customer( $user );
		if ( is_wp_error( $customer ) ) {
			return $customer;
		}
		$meta = array( 'memberglut_payment' => $payment['id'], 'memberglut_subscription' => $sub ? $sub['id'] : 0, 'user_id' => $user->ID, 'site' => home_url() );

		if ( ! $s['recurring'] ) {
			$pi = $this->api(
				'POST',
				'payment_intents',
				array(
					'amount'                    => memberglut_to_minor( $s['total'], $currency ),
					'currency'                  => $currency,
					'customer'                  => $customer,
					'description'               => $plan['name'],
					'receipt_email'             => $user->user_email,
					'automatic_payment_methods' => array( 'enabled' => 'true' ),
					'metadata'                  => $meta,
				),
				'mg-pi-' . $payment['id']
			);
			if ( is_wp_error( $pi ) ) {
				return $pi;
			}
			MemberGlut_Payments::update_meta( $payment['id'], array( 'stripe_pi' => $pi['id'] ) );
			memberglut_repo( 'payments' )->update( $payment['id'], array( 'transaction_id' => $pi['id'] ) );
			return array( 'client' => array( 'gateway' => 'stripe', 'type' => 'payment', 'secret' => $pi['client_secret'], 'return_url' => $this->return_url( $payment ), 'amount' => memberglut_to_minor( $s['total'], $currency ), 'currency' => $currency ) );
		}

		$price = $this->price( $plan, $s['currency'] );
		if ( is_wp_error( $price ) ) {
			return $price;
		}
		$params = array(
			'customer'         => $customer,
			'items'            => array( array( 'price' => $price ) ),
			'payment_behavior' => 'default_incomplete',
			'payment_settings' => array( 'save_default_payment_method' => 'on_subscription' ),
			'expand'           => array( 'latest_invoice.payment_intent', 'pending_setup_intent' ),
			'metadata'         => $meta,
		);
		if ( $s['trial'] ) {
			$params['trial_period_days'] = $s['trial_days'];
		}
		if ( $s['signup_fee'] > 0 ) {
			$product                   = $this->product( $plan );
			$params['add_invoice_items'] = array(
				array(
					'price_data' => array(
						'currency'    => $currency,
						'product'     => is_wp_error( $product ) ? '' : $product,
						'unit_amount' => memberglut_to_minor( $s['signup_fee'], $currency ),
					),
				),
			);
		}
		if ( $s['coupon_id'] ) {
			$coupon = $this->coupon( $s['coupon_id'], $s['currency'] );
			if ( is_wp_error( $coupon ) ) {
				return $coupon;
			}
			if ( $coupon ) {
				$params['discounts'] = array( array( 'coupon' => $coupon ) );
			}
		}
		$stripe_sub = $this->api( 'POST', 'subscriptions', $params, 'mg-sub-' . $payment['id'] );
		if ( is_wp_error( $stripe_sub ) ) {
			return $stripe_sub;
		}
		memberglut_repo( 'subscriptions' )->update( $sub['id'], array( 'gateway_subscription_id' => $stripe_sub['id'], 'gateway_customer_id' => $customer ) );
		MemberGlut_Payments::update_meta( $payment['id'], array( 'stripe_sub' => $stripe_sub['id'] ) );
		$pi = isset( $stripe_sub['latest_invoice']['payment_intent'] ) ? $stripe_sub['latest_invoice']['payment_intent'] : null;
		if ( is_array( $pi ) && ! empty( $pi['client_secret'] ) ) {
			memberglut_repo( 'payments' )->update( $payment['id'], array( 'transaction_id' => $pi['id'] ) );
			return array( 'client' => array( 'gateway' => 'stripe', 'type' => 'payment', 'secret' => $pi['client_secret'], 'return_url' => $this->return_url( $payment ), 'amount' => isset( $pi['amount'] ) ? (int) $pi['amount'] : memberglut_to_minor( $s['total'], $currency ), 'currency' => $currency ) );
		}
		$si = isset( $stripe_sub['pending_setup_intent'] ) ? $stripe_sub['pending_setup_intent'] : null;
		if ( is_array( $si ) && ! empty( $si['client_secret'] ) ) {
			return array( 'client' => array( 'gateway' => 'stripe', 'type' => 'setup', 'secret' => $si['client_secret'], 'return_url' => $this->return_url( $payment ), 'currency' => $currency ) );
		}
		// Nothing to confirm (e.g. 100 % discount and no fee).
		if ( in_array( $stripe_sub['status'], array( 'active', 'trialing' ), true ) ) {
			return array( 'complete' => true, 'complete_args' => array( 'gateway_subscription_id' => $stripe_sub['id'], 'period_end' => gmdate( 'Y-m-d H:i:s', (int) $stripe_sub['current_period_end'] ) ) );
		}
		return new WP_Error( 'memberglut_stripe', __( 'Stripe did not return a payment to confirm.', 'memberglut' ) );
	}

	/**
	 * The buyer is back from Stripe (3-D Secure / redirect methods): check and complete.
	 *
	 * @param array $payment Payment.
	 * @param array $data    Query args.
	 * @return true|WP_Error|null
	 */
	public function confirm( $payment, $data ) {
		$meta = (array) $payment['meta'];
		if ( ! empty( $meta['stripe_sub'] ) ) {
			$s = $this->api( 'GET', 'subscriptions/' . $meta['stripe_sub'] );
			if ( is_wp_error( $s ) ) {
				return $s;
			}
			if ( in_array( $s['status'], array( 'active', 'trialing' ), true ) ) {
				MemberGlut_Payments::complete( $payment['id'], array( 'gateway_subscription_id' => $s['id'], 'period_end' => gmdate( 'Y-m-d H:i:s', (int) $s['current_period_end'] ) ) );
				return true;
			}
			return 'incomplete_expired' === $s['status'] ? new WP_Error( 'memberglut_stripe', __( 'The payment was not completed.', 'memberglut' ) ) : null;
		}
		if ( ! empty( $meta['stripe_pi'] ) ) {
			$pi = $this->api( 'GET', 'payment_intents/' . $meta['stripe_pi'] );
			if ( is_wp_error( $pi ) ) {
				return $pi;
			}
			if ( 'succeeded' === $pi['status'] ) {
				MemberGlut_Payments::complete( $payment['id'], array( 'transaction_id' => $pi['id'] ) );
				return true;
			}
			if ( in_array( $pi['status'], array( 'requires_payment_method', 'canceled' ), true ) ) {
				return new WP_Error( 'memberglut_stripe', isset( $pi['last_payment_error']['message'] ) ? $pi['last_payment_error']['message'] : __( 'The payment was not completed.', 'memberglut' ) );
			}
		}
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
		$txn    = $payment['transaction_id'];
		$params = array( 'amount' => memberglut_to_minor( $amount, $payment['currency'] ), 'metadata' => array( 'memberglut_payment' => $payment['id'] ) );
		if ( 0 === strpos( $txn, 'pi_' ) ) {
			$params['payment_intent'] = $txn;
		} elseif ( 0 === strpos( $txn, 'ch_' ) ) {
			$params['charge'] = $txn;
		} elseif ( 0 === strpos( $txn, 'in_' ) ) {
			$inv = $this->api( 'GET', 'invoices/' . $txn );
			if ( is_wp_error( $inv ) ) {
				return $inv;
			}
			$params['payment_intent'] = is_array( $inv['payment_intent'] ) ? $inv['payment_intent']['id'] : $inv['payment_intent'];
		} else {
			return new WP_Error( 'memberglut_stripe', __( 'No Stripe transaction to refund.', 'memberglut' ) );
		}
		$r = $this->api( 'POST', 'refunds', $params, 'mg-re-' . $payment['id'] . '-' . $params['amount'] . '-' . (int) round( (float) $payment['refunded_amount'] * 100 ) );
		return is_wp_error( $r ) ? $r : true;
	}

	/**
	 * Cancel at Stripe.
	 *
	 * @param array  $sub  Subscription.
	 * @param string $when now|period_end|cycles_complete.
	 * @return true|WP_Error
	 */
	public function cancel_subscription( $sub, $when = 'now' ) {
		if ( 'period_end' === $when ) {
			$r = $this->api( 'POST', 'subscriptions/' . $sub['gateway_subscription_id'], array( 'cancel_at_period_end' => 'true' ) );
		} else {
			$r = $this->api( 'DELETE', 'subscriptions/' . $sub['gateway_subscription_id'] );
		}
		if ( is_wp_error( $r ) ) {
			$err = $r->get_error_data();
			if ( isset( $err['stripe']['code'] ) && 'resource_missing' === $err['stripe']['code'] ) {
				return true; // Already gone.
			}
			return $r;
		}
		return true;
	}

	/**
	 * SetupIntent to replace the card of a subscription (account › Update payment method).
	 *
	 * @param array $sub Subscription.
	 * @return array|WP_Error [ secret ]
	 */
	public function start_card_update( $sub ) {
		$user = get_userdata( $sub['user_id'] );
		$cus  = $sub['gateway_customer_id'] ? $sub['gateway_customer_id'] : $this->customer( $user );
		if ( is_wp_error( $cus ) ) {
			return $cus;
		}
		$si = $this->api( 'POST', 'setup_intents', array( 'customer' => $cus, 'usage' => 'off_session', 'automatic_payment_methods' => array( 'enabled' => 'true' ), 'metadata' => array( 'memberglut_subscription' => $sub['id'], 'purpose' => 'card_update' ) ) );
		return is_wp_error( $si ) ? $si : array( 'secret' => $si['client_secret'], 'id' => $si['id'] );
	}

	/**
	 * Use the card of a confirmed SetupIntent for the subscription.
	 *
	 * @param array  $sub   Subscription.
	 * @param string $si_id SetupIntent.
	 * @return true|WP_Error
	 */
	public function finish_card_update( $sub, $si_id ) {
		$si = $this->api( 'GET', 'setup_intents/' . rawurlencode( $si_id ) );
		if ( is_wp_error( $si ) ) {
			return $si;
		}
		if ( 'succeeded' !== $si['status'] || empty( $si['payment_method'] ) || (string) ( isset( $si['metadata']['memberglut_subscription'] ) ? $si['metadata']['memberglut_subscription'] : '' ) !== (string) $sub['id'] ) {
			return new WP_Error( 'memberglut_stripe', __( 'The card could not be saved.', 'memberglut' ) );
		}
		$pm = is_array( $si['payment_method'] ) ? $si['payment_method']['id'] : $si['payment_method'];
		$r  = $this->api( 'POST', 'subscriptions/' . $sub['gateway_subscription_id'], array( 'default_payment_method' => $pm ) );
		if ( is_wp_error( $r ) ) {
			return $r;
		}
		if ( $sub['gateway_customer_id'] ) {
			$this->api( 'POST', 'customers/' . $sub['gateway_customer_id'], array( 'invoice_settings' => array( 'default_payment_method' => $pm ) ) );
		}
		// Retry an open invoice right away after a failed renewal.
		if ( 'on_hold' === $sub['status'] || $sub['retry_count'] > 0 ) {
			$inv = $this->api( 'GET', 'invoices', array( 'subscription' => $sub['gateway_subscription_id'], 'status' => 'open', 'limit' => 1 ) );
			if ( ! is_wp_error( $inv ) && ! empty( $inv['data'][0]['id'] ) ) {
				$this->api( 'POST', 'invoices/' . $inv['data'][0]['id'] . '/pay' );
			}
		}
		return true;
	}

	/**
	 * Switch the price at the next renewal (downgrade without proration, decision D17).
	 *
	 * @param array $sub  Subscription.
	 * @param array $plan New plan.
	 * @return true|WP_Error
	 */
	public function change_price( $sub, $plan ) {
		$s = $this->api( 'GET', 'subscriptions/' . $sub['gateway_subscription_id'] );
		if ( is_wp_error( $s ) ) {
			return $s;
		}
		$price = $this->price( $plan, isset( $s['currency'] ) ? $s['currency'] : memberglut_setting( 'currency', 'USD' ) );
		if ( is_wp_error( $price ) ) {
			return $price;
		}
		$r = $this->api( 'POST', 'subscriptions/' . $sub['gateway_subscription_id'], array( 'items' => array( array( 'id' => $s['items']['data'][0]['id'], 'price' => $price ) ), 'proration_behavior' => 'none', 'cancel_at_period_end' => 'false' ) );
		return is_wp_error( $r ) ? $r : true;
	}

	/**
	 * Dashboard link.
	 *
	 * @param array $payment Payment.
	 * @return string
	 */
	public function transaction_url( $payment ) {
		$base = 'https://dashboard.stripe.com/' . ( 'test' === $this->mode() ? 'test/' : '' );
		$txn  = $payment['transaction_id'];
		if ( 0 === strpos( $txn, 'in_' ) ) {
			return $base . 'invoices/' . rawurlencode( $txn );
		}
		return $base . 'payments/' . rawurlencode( $txn );
	}

	/* ---------------------------------------------------------------------
	 * Webhooks
	 * ------------------------------------------------------------------ */

	/**
	 * Verify the Stripe-Signature header (HMAC-SHA256, 5-minute tolerance).
	 *
	 * @param string $payload Raw body.
	 * @param string $header  Header.
	 * @return bool
	 */
	public static function verify_signature( $payload, $header, $secret ) {
		if ( ! $secret || ! $header ) {
			return false;
		}
		$t    = 0;
		$sigs = array();
		foreach ( explode( ',', $header ) as $part ) {
			$kv = explode( '=', trim( $part ), 2 );
			if ( 2 !== count( $kv ) ) {
				continue;
			}
			if ( 't' === $kv[0] ) {
				$t = (int) $kv[1];
			} elseif ( 'v1' === $kv[0] ) {
				$sigs[] = $kv[1];
			}
		}
		if ( ! $t || abs( time() - $t ) > 300 ) {
			return false;
		}
		$expected = hash_hmac( 'sha256', $t . '.' . $payload, $secret );
		foreach ( $sigs as $sig ) {
			if ( hash_equals( $expected, $sig ) ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Handle a webhook event.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return array|WP_Error
	 */
	public function handle_webhook( $request ) {
		$payload = $request->get_body();
		if ( ! self::verify_signature( $payload, (string) $request->get_header( 'stripe_signature' ), (string) memberglut_setting( 'stripe_webhook_secret', '' ) ) ) {
			memberglut_log( 'warning', 'webhook', 'Stripe webhook with an invalid signature rejected' );
			return new WP_Error( 'memberglut_signature', 'Invalid signature', array( 'status' => 400 ) );
		}
		$event = json_decode( $payload, true );
		if ( ! is_array( $event ) || empty( $event['type'] ) ) {
			return new WP_Error( 'memberglut_payload', 'Invalid payload', array( 'status' => 400 ) );
		}
		$this->webhook_seen();
		$seen = 'memberglut_wh_' . md5( $event['id'] );
		if ( get_transient( $seen ) ) {
			return array( 'received' => true, 'duplicate' => true );
		}
		set_transient( $seen, 1, 3 * DAY_IN_SECONDS );
		memberglut_log( 'info', 'webhook', 'Stripe webhook ' . $event['type'], array( 'id' => $event['id'] ) );
		$o = isset( $event['data']['object'] ) ? $event['data']['object'] : array();
		switch ( $event['type'] ) {
			case 'payment_intent.succeeded':
				$this->on_payment_intent_succeeded( $o );
				break;
			case 'payment_intent.payment_failed':
				$pid = isset( $o['metadata']['memberglut_payment'] ) ? (int) $o['metadata']['memberglut_payment'] : 0;
				if ( $pid && empty( $o['invoice'] ) ) {
					MemberGlut_Payments::fail( $pid, isset( $o['last_payment_error']['message'] ) ? $o['last_payment_error']['message'] : '' );
				}
				break;
			case 'invoice.paid':
				$this->on_invoice_paid( $o );
				break;
			case 'invoice.payment_failed':
				$this->on_invoice_failed( $o );
				break;
			case 'customer.subscription.updated':
				$this->on_subscription_updated( $o );
				break;
			case 'customer.subscription.deleted':
				$sub = $this->local_sub( $o['id'] );
				if ( $sub && ! in_array( $sub['status'], array( 'expired', 'abandoned' ), true ) ) {
					memberglut_repo( 'subscriptions' )->update( $sub['id'], array( 'gateway_subscription_id' => $sub['gateway_subscription_id'] ) );
					MemberGlut_Subscription_Service::transition( $sub['id'], 'expired', array( 'next_payment_at' => null, 'expires_at' => memberglut_now() ), __( '(Stripe subscription ended)', 'memberglut' ) );
					do_action( 'memberglut_subscription_expired', MemberGlut_Subscription_Service::get( $sub['id'] ), MemberGlut_Plans::get( $sub['plan_id'] ) );
				}
				break;
			case 'charge.refunded':
				$this->on_charge_refunded( $o );
				break;
			case 'setup_intent.succeeded':
				if ( isset( $o['metadata']['purpose'] ) && 'card_update' === $o['metadata']['purpose'] ) {
					$sub = MemberGlut_Subscription_Service::get( (int) $o['metadata']['memberglut_subscription'] );
					if ( $sub ) {
						$this->finish_card_update( $sub, $o['id'] );
					}
				}
				break;
		}
		do_action( 'memberglut_webhook_received', 'stripe', $event );
		return array( 'received' => true );
	}

	/**
	 * Local subscription of a Stripe subscription ID.
	 *
	 * @param string $stripe_id ID.
	 * @return array|null
	 */
	private function local_sub( $stripe_id ) {
		return $stripe_id ? memberglut_repo( 'subscriptions' )->find_by( array( 'gateway_subscription_id' => (string) $stripe_id ) ) : null;
	}

	/**
	 * One-time payment succeeded.
	 *
	 * @param array $pi PaymentIntent.
	 * @return void
	 */
	private function on_payment_intent_succeeded( $pi ) {
		if ( ! empty( $pi['invoice'] ) ) {
			return; // Subscription invoices are handled by invoice.paid.
		}
		$pid = isset( $pi['metadata']['memberglut_payment'] ) ? (int) $pi['metadata']['memberglut_payment'] : 0;
		if ( $pid ) {
			MemberGlut_Payments::complete( $pid, array( 'transaction_id' => $pi['id'] ) );
		}
	}

	/**
	 * Period end of an invoice.
	 *
	 * @param array $inv Invoice.
	 * @return string
	 */
	private function invoice_period_end( $inv ) {
		$end = 0;
		foreach ( isset( $inv['lines']['data'] ) ? $inv['lines']['data'] : array() as $line ) {
			if ( isset( $line['period']['end'] ) ) {
				$end = max( $end, (int) $line['period']['end'] );
			}
		}
		return $end ? gmdate( 'Y-m-d H:i:s', $end ) : '';
	}

	/**
	 * Invoice paid: first payment or renewal.
	 *
	 * @param array $inv Invoice.
	 * @return void
	 */
	private function on_invoice_paid( $inv ) {
		$sub = $this->local_sub( isset( $inv['subscription'] ) ? $inv['subscription'] : '' );
		if ( ! $sub ) {
			return;
		}
		$amount = (float) $inv['amount_paid'] / ( memberglut_is_zero_decimal( $inv['currency'] ) ? 1 : 100 );
		$txn    = ! empty( $inv['payment_intent'] ) ? ( is_array( $inv['payment_intent'] ) ? $inv['payment_intent']['id'] : $inv['payment_intent'] ) : $inv['id'];
		$end    = $this->invoice_period_end( $inv );
		if ( 'subscription_create' === $inv['billing_reason'] ) {
			$pending = memberglut_repo( 'payments' )->find_by( array( 'subscription_id' => $sub['id'], 'status' => 'pending' ) );
			if ( $pending ) {
				MemberGlut_Payments::complete( $pending['id'], array( 'transaction_id' => $txn, 'period_end' => $end, 'amount' => $amount ) );
			}
			return;
		}
		if ( $amount <= 0 && 'subscription_update' === $inv['billing_reason'] ) {
			return;
		}
		if ( ! empty( $sub['scheduled_plan_id'] ) && 'subscription_cycle' === $inv['billing_reason'] ) {
			MemberGlut_Subscription_Service::change_plan( $sub['id'], (int) $sub['scheduled_plan_id'] );
			$sub = MemberGlut_Subscription_Service::get( $sub['id'] );
		}
		// Trial ended and the first real charge went through, or a normal renewal.
		MemberGlut_Payments::record_renewal( $sub, $amount, $txn, $end );
	}

	/**
	 * Invoice payment failed.
	 *
	 * @param array $inv Invoice.
	 * @return void
	 */
	private function on_invoice_failed( $inv ) {
		$sub = $this->local_sub( isset( $inv['subscription'] ) ? $inv['subscription'] : '' );
		if ( ! $sub ) {
			return;
		}
		if ( 'subscription_create' === $inv['billing_reason'] ) {
			return; // The buyer is still on the checkout and sees the error there.
		}
		$amount = (float) $inv['amount_due'] / ( memberglut_is_zero_decimal( $inv['currency'] ) ? 1 : 100 );
		$p      = MemberGlut_Payments::create(
			array(
				'user_id'         => $sub['user_id'],
				'subscription_id' => $sub['id'],
				'plan_id'         => $sub['plan_id'],
				'type'            => 'renewal',
				'gateway'         => 'stripe',
				'amount'          => $amount,
				'transaction_id'  => $inv['id'] . '#' . (int) $inv['attempt_count'],
			)
		);
		MemberGlut_Payments::fail( $p['id'], isset( $inv['last_finalization_error']['message'] ) ? $inv['last_finalization_error']['message'] : __( 'Card declined', 'memberglut' ) );
	}

	/**
	 * Subscription changed at Stripe (cancel at period end, status).
	 *
	 * @param array $s Stripe subscription.
	 * @return void
	 */
	private function on_subscription_updated( $s ) {
		$sub = $this->local_sub( $s['id'] );
		if ( ! $sub ) {
			return;
		}
		if ( ! empty( $s['cancel_at_period_end'] ) && in_array( $sub['status'], array( 'active', 'trialing' ), true ) ) {
			MemberGlut_Subscription_Service::transition( $sub['id'], 'canceled', array( 'canceled_at' => memberglut_now(), 'next_payment_at' => null, 'expires_at' => gmdate( 'Y-m-d H:i:s', (int) $s['current_period_end'] ) ), __( '(canceled at Stripe)', 'memberglut' ) );
		} elseif ( empty( $s['cancel_at_period_end'] ) && 'canceled' === $sub['status'] && 'active' === $s['status'] ) {
			MemberGlut_Subscription_Service::transition( $sub['id'], 'active', array( 'canceled_at' => null, 'next_payment_at' => gmdate( 'Y-m-d H:i:s', (int) $s['current_period_end'] ) ), __( '(resumed at Stripe)', 'memberglut' ) );
		}
	}

	/**
	 * Refund made in the Stripe dashboard (or by us — then it is already recorded).
	 *
	 * @param array $charge Charge.
	 * @return void
	 */
	private function on_charge_refunded( $charge ) {
		$pi      = isset( $charge['payment_intent'] ) ? $charge['payment_intent'] : '';
		$payment = $pi ? memberglut_repo( 'payments' )->find_by( array( 'transaction_id' => $pi ) ) : null;
		if ( ! $payment && ! empty( $charge['invoice'] ) ) {
			$payment = memberglut_repo( 'payments' )->find_by( array( 'transaction_id' => $charge['invoice'] ) );
		}
		if ( ! $payment ) {
			return;
		}
		$total = (float) $charge['amount_refunded'] / ( memberglut_is_zero_decimal( $charge['currency'] ) ? 1 : 100 );
		$delta = memberglut_round( $total - (float) $payment['refunded_amount'], $payment['currency'] );
		if ( $delta > 0 ) {
			MemberGlut_Payments::refund( $payment['id'], $delta, false );
		}
	}
}
