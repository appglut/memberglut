<?php
/**
 * Checkout: validates the order, creates the pending subscription + payment, hands over to the gateway, confirms
 * the return and renders the payment section of the registration form and the receipt.
 *
 * Guards: plan purchasable (status, sold out, who can join), gateway allowed for the plan and enabled, coupon
 * rules, one trial per person, duplicate purchase. Plan changes inside a group: upgrade = new checkout that ends
 * the old plan when paid; downgrade = scheduled at the end of the period (decision D17).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Checkout class.
 */
class MemberGlut_Checkout {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'template_redirect', array( __CLASS__, 'handle_return' ), 3 );
		add_filter( 'memberglut_shortcodes', array( __CLASS__, 'shortcodes' ) );
		add_filter( 'memberglut_rest_controllers', array( __CLASS__, 'controllers' ) );
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'register_script' ), 6 );
	}

	/**
	 * Add [memberglut_receipt].
	 *
	 * @param array $map Shortcodes.
	 * @return array
	 */
	public static function shortcodes( $map ) {
		$map['memberglut_receipt'] = array( __CLASS__, 'receipt' );
		return $map;
	}

	/**
	 * Add the checkout REST controller.
	 *
	 * @param array $list Controllers.
	 * @return array
	 */
	public static function controllers( $list ) {
		$list[] = 'MemberGlut_REST_Checkout';
		return $list;
	}

	/**
	 * Checkout script (Stripe.js / PayPal SDK are loaded on demand by it).
	 *
	 * @return void
	 */
	public static function register_script() {
		$stripe = MemberGlut_Gateways::get( 'stripe' );
		$paypal = MemberGlut_Gateways::get( 'paypal' );
		wp_register_script( 'memberglut-checkout', MEMBERGLUT_PLUGIN_URL . 'assets/frontend/memberglut-checkout.js', array( 'memberglut' ), MEMBERGLUT_VERSION, true );
		wp_localize_script(
			'memberglut-checkout',
			'memberglutCheckout',
			array(
				'rest'   => esc_url_raw( rest_url( 'memberglut/v1/public/checkout/' ) ),
				'stripe' => $stripe && $stripe->is_available() ? $stripe->client_config() : null,
				'paypal' => $paypal && $paypal->is_available() ? $paypal->client_config() : null,
				'locale' => str_replace( '_', '-', get_locale() ),
				'i18n'   => array(
					'pay'         => __( 'Pay now', 'memberglut' ),
					'processing'  => __( 'Processing…', 'memberglut' ),
					'payWith'     => __( 'Complete the payment below.', 'memberglut' ),
					'couponOk'    => __( 'Coupon applied.', 'memberglut' ),
					'failed'      => __( 'The payment did not go through. You can try again.', 'memberglut' ),
					'stripeError' => __( 'The card form could not be loaded. Please reload the page.', 'memberglut' ),
				),
			)
		);
	}

	/* ---------------------------------------------------------------------
	 * Validation & order
	 * ------------------------------------------------------------------ */

	/**
	 * Coupon row from submitted data (validated).
	 *
	 * @param array  $plan    Plan.
	 * @param array  $data    Data.
	 * @param int    $user_id User.
	 * @param string $email   Email.
	 * @return array|null|WP_Error
	 */
	public static function coupon_from( $plan, $data, $user_id = 0, $email = '' ) {
		$code = isset( $data['coupon'] ) ? trim( (string) $data['coupon'] ) : '';
		if ( '' === $code ) {
			return null;
		}
		$row = MemberGlut_Coupons::find_by_code( $code );
		$ok  = MemberGlut_Coupons::check( $row, $plan, $user_id, $email );
		return is_wp_error( $ok ) ? $ok : $row;
	}

	/**
	 * Whether the order needs a payment method.
	 *
	 * @param array $s Summary.
	 * @return bool
	 */
	public static function needs_gateway( $s ) {
		return $s['total'] > 0 || ( $s['recurring'] && $s['renewal'] > 0 );
	}

	/**
	 * Gateways offered for a plan.
	 *
	 * @param array $plan Plan.
	 * @return MemberGlut_Gateway[]
	 */
	public static function gateways_for( $plan ) {
		$out = array();
		foreach ( MemberGlut_Plans::available_gateways( $plan ) as $id ) {
			$g = MemberGlut_Gateways::get( $id );
			if ( $g && $g->is_available() && ( 'recurring' !== $plan['billing'] || $g->supports( 'recurring' ) ) ) {
				$out[ $id ] = $g;
			}
		}
		return $out;
	}

	/**
	 * Extra validation of a paid checkout (called by MemberGlut_Auth::register()).
	 *
	 * @param array $plan    Plan.
	 * @param array $data    Data.
	 * @param int   $user_id User.
	 * @return array Errors keyed by field.
	 */
	public static function validate( $plan, $data, $user_id ) {
		$errors = array();
		$email  = isset( $data['mg']['email'] ) ? sanitize_email( $data['mg']['email'] ) : '';
		$coupon = self::coupon_from( $plan, $data, $user_id, $email );
		if ( is_wp_error( $coupon ) ) {
			$errors['coupon'] = $coupon->get_error_message();
			$coupon           = null;
		}
		$renew   = self::renewable_sub( $user_id, $plan );
		$current = $user_id && ! $renew ? MemberGlut_Subscription_Service::in_group( $user_id, $plan['group'] ) : null;
		$s       = MemberGlut_Pricing::summary( $plan, $coupon, $user_id, array( 'change' => (bool) $current, 'renewal' => (bool) $renew ) );
		if ( self::needs_gateway( $s ) && ! self::is_downgrade( $current, $plan ) ) {
			$gateways = self::gateways_for( $plan );
			$chosen   = isset( $data['gateway'] ) ? sanitize_key( $data['gateway'] ) : '';
			if ( ! $gateways ) {
				$errors['gateway'] = __( 'No payment method is available for this plan. Please contact us.', 'memberglut' );
			} elseif ( ! isset( $gateways[ $chosen ] ) ) {
				$errors['gateway'] = __( 'Choose a payment method.', 'memberglut' );
			}
		}
		return $errors;
	}

	/**
	 * Subscription a member can renew early with this plan (Member account › Allow renewal): a paid, non-recurring
	 * plan they have now, ending within “renew_days_before” days.
	 *
	 * @param int   $user_id User.
	 * @param array $plan    Plan.
	 * @return array|null
	 */
	public static function renewable_sub( $user_id, $plan ) {
		if ( ! $user_id || ! memberglut_setting( 'allow_renew', true ) || 'paid' !== $plan['type'] || 'recurring' === $plan['billing'] ) {
			return null;
		}
		$window = (int) memberglut_setting( 'renew_days_before', 15 ) * DAY_IN_SECONDS;
		foreach ( MemberGlut_Subscription_Service::for_user( $user_id ) as $s ) {
			if ( (int) $s['plan_id'] === (int) $plan['id'] && MemberGlut_Subscription_Service::grants_access( $s ) && $s['expires_at'] && strtotime( $s['expires_at'] . ' UTC' ) - time() <= $window ) {
				return $s;
			}
		}
		return null;
	}

	/**
	 * Whether moving from a subscription to a plan is a downgrade.
	 *
	 * @param array|null $current Current subscription.
	 * @param array      $plan    Target plan.
	 * @return bool
	 */
	public static function is_downgrade( $current, $plan ) {
		if ( ! $current ) {
			return false;
		}
		$cur = MemberGlut_Plans::get( $current['plan_id'] );
		return $cur && $plan['tier'] < $cur['tier'];
	}

	/**
	 * Start a paid checkout.
	 *
	 * @param int   $user_id  User.
	 * @param array $plan     Plan.
	 * @param array $data     Form data (gateway, coupon, redirect_to).
	 * @param bool  $approved Account approved.
	 * @return array|WP_Error [ redirect ] | [ client, return_url ] | [ message ]
	 */
	public static function start( $user_id, $plan, $data, $approved = true ) {
		$user  = get_userdata( $user_id );
		$renew = self::renewable_sub( $user_id, $plan );
		if ( $renew ) {
			return self::start_renewal( $user, $plan, $renew, $data );
		}
		$current = MemberGlut_Subscription_Service::in_group( $user_id, $plan['group'] );
		if ( $current ) {
			$cur_plan = MemberGlut_Plans::get( $current['plan_id'] );
			$up       = $cur_plan && $plan['tier'] > $cur_plan['tier'];
			if ( ! memberglut_setting( 'allow_change', true ) || ( $up && ! $plan['allow_upgrade'] ) || ( ! $up && ( ! $plan['allow_downgrade'] || ! memberglut_setting( 'allow_downgrade', true ) ) ) ) {
				return new WP_Error( 'memberglut_change_not_allowed', __( 'Changing to this plan is not possible from your current plan.', 'memberglut' ), array( 'status' => 403 ) );
			}
			if ( ! $up ) {
				return self::schedule_downgrade( $current, $plan );
			}
		}
		$coupon = self::coupon_from( $plan, $data, $user_id, $user->user_email );
		if ( is_wp_error( $coupon ) ) {
			return $coupon;
		}
		$s        = MemberGlut_Pricing::summary( $plan, $coupon, $user_id, array( 'change' => (bool) $current ) );
		$gateway  = self::needs_gateway( $s ) ? MemberGlut_Gateways::get( isset( $data['gateway'] ) ? sanitize_key( $data['gateway'] ) : '' ) : MemberGlut_Gateways::get( 'free' );
		if ( ! $gateway || ( 'free' !== $gateway->id && ! isset( self::gateways_for( $plan )[ $gateway->id ] ) ) ) {
			return new WP_Error( 'memberglut_gateway', __( 'Choose a payment method.', 'memberglut' ), array( 'status' => 400, 'fields' => array( 'gateway' => __( 'Choose a payment method.', 'memberglut' ) ) ) );
		}

		// Reuse an abandoned pending checkout of the same plan instead of piling up rows.
		foreach ( MemberGlut_Subscription_Service::for_user( $user_id ) as $old ) {
			if ( (int) $old['plan_id'] === (int) $plan['id'] && 'pending' === $old['status'] && ! empty( $old['meta']['awaiting_payment'] ) ) {
				memberglut_repo( 'payments' )->update_where( array( 'subscription_id' => $old['id'], 'status' => 'pending' ), array( 'status' => 'failed', 'note' => 'Abandoned checkout' ) );
				memberglut_repo( 'subscriptions' )->delete( $old['id'] );
				MemberGlut_Subscription_Service::flush( $user_id );
			}
		}

		$sub = MemberGlut_Subscription_Service::create(
			$user_id,
			$plan['id'],
			array(
				'status'          => 'pending',
				'source'          => 'checkout',
				'gateway'         => $gateway->id,
				'billing_amount'  => $s['recurring'] ? $s['renewal'] : $s['total'],
				'coupon_id'       => $s['coupon_id'] ? $s['coupon_id'] : null,
				'trial'           => $s['trial'],
				'allow_duplicate' => false,
				'meta'            => array(
					'awaiting_payment' => true,
					'redirect_to'      => isset( $data['redirect_to'] ) ? esc_url_raw( (string) $data['redirect_to'] ) : '',
					// 100 % off every payment: nothing will ever be billed, access lasts until canceled.
					'free_forever'     => $s['recurring'] && ! $s['renewal'] && 'free' === $gateway->id,
				),
			)
		);
		if ( is_wp_error( $sub ) ) {
			return $sub;
		}
		$payment = MemberGlut_Payments::create(
			array(
				'user_id'         => $user_id,
				'subscription_id' => $sub['id'],
				'plan_id'         => $plan['id'],
				'type'            => $current ? 'upgrade' : 'new',
				'gateway'         => $gateway->id,
				'summary'         => $s,
				'meta'            => array(
					'change_from' => $current ? (int) $current['id'] : 0,
					'trial'       => $s['trial'],
					'redirect_to' => isset( $data['redirect_to'] ) ? esc_url_raw( (string) $data['redirect_to'] ) : '',
				),
			)
		);
		$ctx = array( 'user' => $user, 'plan' => $plan, 'summary' => $s, 'payment' => $payment, 'subscription' => MemberGlut_Subscription_Service::get( $sub['id'] ), 'data' => $data );
		$res = $gateway->process( $ctx );
		if ( is_wp_error( $res ) ) {
			MemberGlut_Payments::fail( $payment['id'], $res->get_error_message() );
			return new WP_Error( $res->get_error_code(), $res->get_error_message(), array( 'status' => 400, 'fields' => array( 'gateway' => $res->get_error_message() ) ) );
		}
		if ( ! empty( $res['complete'] ) ) {
			$done = MemberGlut_Payments::complete( $payment['id'], isset( $res['complete_args'] ) ? $res['complete_args'] : array() );
			if ( is_wp_error( $done ) ) {
				return $done;
			}
			return array( 'redirect' => self::after_payment_url( MemberGlut_Payments::get( $payment['id'] ) ) );
		}
		$res['payment']    = (int) $payment['id'];
		$res['summary']    = array( 'total' => $s['total'], 'text' => $s['text'] );
		return $res;
	}

	/**
	 * Early renewal of a non-recurring plan: a “renewal” payment on the existing subscription; once paid the new
	 * period starts at the current expiry date (MemberGlut_Subscription_Service::renew()).
	 *
	 * @param WP_User $user  User.
	 * @param array   $plan  Plan.
	 * @param array   $sub   Subscription being renewed.
	 * @param array   $data  Form data.
	 * @return array|WP_Error
	 */
	private static function start_renewal( $user, $plan, $sub, $data ) {
		$coupon = self::coupon_from( $plan, $data, $user->ID, $user->user_email );
		if ( is_wp_error( $coupon ) ) {
			return $coupon;
		}
		$s       = MemberGlut_Pricing::summary( $plan, $coupon, $user->ID, array( 'renewal' => true ) );
		$gateway = self::needs_gateway( $s ) ? MemberGlut_Gateways::get( isset( $data['gateway'] ) ? sanitize_key( $data['gateway'] ) : '' ) : MemberGlut_Gateways::get( 'free' );
		if ( ! $gateway || ( 'free' !== $gateway->id && ! isset( self::gateways_for( $plan )[ $gateway->id ] ) ) ) {
			return new WP_Error( 'memberglut_gateway', __( 'Choose a payment method.', 'memberglut' ), array( 'status' => 400, 'fields' => array( 'gateway' => __( 'Choose a payment method.', 'memberglut' ) ) ) );
		}
		// Drop an unfinished renewal attempt.
		memberglut_repo( 'payments' )->update_where( array( 'subscription_id' => $sub['id'], 'type' => 'renewal', 'status' => 'pending' ), array( 'status' => 'failed', 'note' => 'Abandoned checkout' ) );
		$redirect = isset( $data['redirect_to'] ) ? esc_url_raw( (string) $data['redirect_to'] ) : '';
		$payment  = MemberGlut_Payments::create(
			array(
				'user_id'         => $user->ID,
				'subscription_id' => $sub['id'],
				'plan_id'         => $plan['id'],
				'type'            => 'renewal',
				'gateway'         => $gateway->id,
				'summary'         => $s,
				'meta'            => array( 'redirect_to' => $redirect ? $redirect : memberglut_page_url( 'account', array( 'tab' => 'subscriptions' ) ) ),
			)
		);
		$res = $gateway->process( array( 'user' => $user, 'plan' => $plan, 'summary' => $s, 'payment' => $payment, 'subscription' => $sub, 'data' => $data ) );
		if ( is_wp_error( $res ) ) {
			MemberGlut_Payments::fail( $payment['id'], $res->get_error_message() );
			return new WP_Error( $res->get_error_code(), $res->get_error_message(), array( 'status' => 400, 'fields' => array( 'gateway' => $res->get_error_message() ) ) );
		}
		if ( ! empty( $res['complete'] ) ) {
			$done = MemberGlut_Payments::complete( $payment['id'], isset( $res['complete_args'] ) ? $res['complete_args'] : array() );
			if ( is_wp_error( $done ) ) {
				return $done;
			}
			return array( 'redirect' => self::after_payment_url( MemberGlut_Payments::get( $payment['id'] ) ) );
		}
		$res['payment'] = (int) $payment['id'];
		$res['summary'] = array( 'total' => $s['total'], 'text' => $s['text'] );
		return $res;
	}

	/**
	 * Downgrade at the end of the period (decision D17).
	 *
	 * @param array $current Current subscription.
	 * @param array $plan    Target plan.
	 * @return array|WP_Error
	 */
	public static function schedule_downgrade( $current, $plan ) {
		if ( 'free' === $plan['type'] ) {
			$res = MemberGlut_Auth::join_free_plan( $current['user_id'], $plan );
			return is_wp_error( $res ) ? $res : array( 'redirect' => memberglut_page_url( 'account', array( 'tab' => 'subscriptions' ) ), 'message' => __( 'Your plan has been changed.', 'memberglut' ) );
		}
		$cur_plan = MemberGlut_Plans::get( $current['plan_id'] );
		$gateway  = MemberGlut_Gateways::get( $current['gateway'] );
		if ( $current['gateway_subscription_id'] && $gateway && $gateway->supports( 'change_price' ) && 'recurring' === $plan['billing'] ) {
			$r = $gateway->change_price( $current, $plan );
			if ( is_wp_error( $r ) ) {
				return $r;
			}
		} elseif ( $current['gateway_subscription_id'] && ( ! $cur_plan || 'recurring' === $cur_plan['billing'] ) ) {
			return new WP_Error( 'memberglut_change_not_supported', __( 'This payment method cannot change plans automatically. Cancel your current plan, then choose the new one when it ends.', 'memberglut' ), array( 'status' => 400 ) );
		}
		memberglut_repo( 'subscriptions' )->update( $current['id'], array( 'scheduled_plan_id' => (int) $plan['id'] ) );
		memberglut_event(
			'plan_change',
			/* translators: 1: plan, 2: date */
			sprintf( __( 'Downgrade to %1$s scheduled for %2$s', 'memberglut' ), $plan['name'], $current['expires_at'] ? memberglut_format_date( $current['expires_at'] ) : __( 'the end of the period', 'memberglut' ) ),
			array( 'user_id' => $current['user_id'], 'object_type' => 'subscription', 'object_id' => $current['id'] )
		);
		$when = $current['expires_at'] ? memberglut_format_date( $current['expires_at'] ) : __( 'the end of your current period', 'memberglut' );
		memberglut_flash( 'success', sprintf( /* translators: 1: plan, 2: date */ __( 'You will move to %1$s on %2$s.', 'memberglut' ), $plan['name'], $when ) );
		return array( 'redirect' => memberglut_page_url( 'account', array( 'tab' => 'subscriptions' ) ) ? memberglut_page_url( 'account', array( 'tab' => 'subscriptions' ) ) : home_url( '/' ) );
	}

	/**
	 * Where the buyer goes after paying (§2.4: redirect_to → plan page → Thank-you → registration redirect).
	 *
	 * @param array $payment Payment.
	 * @return string
	 */
	public static function after_payment_url( $payment ) {
		$plan = MemberGlut_Plans::get( $payment['plan_id'] );
		return MemberGlut_Redirects::after_registration( (int) $payment['user_id'], $plan, isset( $payment['meta']['redirect_to'] ) ? $payment['meta']['redirect_to'] : '', true, array( 'mg_payment' => $payment['id'], 'mg_key' => $payment['meta']['key'] ) );
	}

	/**
	 * Payment from mg_payment + mg_key (receipt, return page, browser callbacks).
	 *
	 * @param int    $id  Payment.
	 * @param string $key Key.
	 * @return array|null
	 */
	public static function payment_by_key( $id, $key ) {
		$p = MemberGlut_Payments::get( (int) $id );
		if ( ! $p || empty( $p['meta']['key'] ) || ! hash_equals( (string) $p['meta']['key'], (string) $key ) ) {
			return null;
		}
		return $p;
	}

	/**
	 * Back from the gateway: confirm the payment, then continue to the right page.
	 *
	 * @return void
	 */
	public static function handle_return() {
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- Authorized by the payment key.
		if ( empty( $_GET['mg_confirm'] ) || empty( $_GET['mg_payment'] ) || empty( $_GET['mg_key'] ) ) {
			return;
		}
		$p = self::payment_by_key( absint( $_GET['mg_payment'] ), sanitize_text_field( wp_unslash( $_GET['mg_key'] ) ) );
		// phpcs:enable
		if ( ! $p ) {
			return;
		}
		MemberGlut_Cache::no_cache();
		if ( 'pending' === $p['status'] ) {
			$g = MemberGlut_Gateways::get( $p['gateway'] );
			if ( $g ) {
				$res = $g->confirm( $p, $_GET ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
				if ( is_wp_error( $res ) ) {
					memberglut_flash( 'error', $res->get_error_message() );
				}
			}
			$p = MemberGlut_Payments::get( $p['id'] );
		}
		if ( 'completed' === $p['status'] ) {
			$next = self::after_payment_url( $p );
			$here = MemberGlut_Access::current_url();
			if ( untrailingslashit( strtok( $next, '?' ) ) !== untrailingslashit( strtok( $here, '?' ) ) ) {
				wp_safe_redirect( $next );
				exit;
			}
		}
	}

	/* ---------------------------------------------------------------------
	 * Front end
	 * ------------------------------------------------------------------ */

	/**
	 * Payment section of the registration form (methods, coupon, summary). Hidden by CSS for free plans.
	 *
	 * @param array[] $plans   Plans the form may submit.
	 * @param int     $user_id User.
	 * @return string
	 */
	public static function render_section( $plans, $user_id = 0 ) {
		$paid = array_values( array_filter( (array) $plans, static function ( $p ) {
			return 'paid' === $p['type'];
		} ) );
		if ( ! $paid ) {
			return '';
		}
		MemberGlut_Assets::need();
		wp_enqueue_script( 'memberglut-checkout' );
		$by_gateway = array();
		foreach ( $paid as $p ) {
			foreach ( self::gateways_for( $p ) as $id => $g ) {
				$by_gateway[ $id ]['gateway']  = $g;
				$by_gateway[ $id ]['plans'][]  = (int) $p['id'];
			}
		}
		$single = 1 === count( $paid ) ? $paid[0] : null;
		$s      = $single ? MemberGlut_Pricing::summary( $single, null, $user_id, array( 'change' => $user_id && MemberGlut_Subscription_Service::in_group( $user_id, $single['group'] ) ) ) : null;
		ob_start();
		?>
		<div class="mg-checkout" data-mg-checkout>
			<div class="mg-field mg-coupon" data-field="coupon">
				<label for="mg-coupon"><?php esc_html_e( 'Coupon code', 'memberglut' ); ?></label>
				<span class="mg-coupon-row">
					<input type="text" id="mg-coupon" name="coupon" autocomplete="off" placeholder="<?php esc_attr_e( 'Optional', 'memberglut' ); ?>">
					<button type="button" class="mg-button mg-button-secondary" data-mg-apply-coupon><?php esc_html_e( 'Apply', 'memberglut' ); ?></button>
				</span>
				<span class="mg-field-error" role="alert"></span>
			</div>
			<div class="mg-summary" data-mg-summary>
				<?php echo $s ? self::summary_html( $s ) : ''; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in summary_html(). ?>
			</div>
			<div class="mg-field mg-gateways" data-field="gateway">
				<span class="mg-label"><?php esc_html_e( 'Payment method', 'memberglut' ); ?></span>
				<?php if ( ! $by_gateway ) : ?>
					<p class="mg-help"><?php esc_html_e( 'No payment method is available yet. Please contact us.', 'memberglut' ); ?></p>
				<?php else : ?>
					<div class="mg-gateway-options">
						<?php $first = true; foreach ( $by_gateway as $id => $row ) : // phpcs:ignore Squiz.ControlStructures.ControlSignature.NewlineAfterOpenBrace ?>
							<label class="mg-gateway-option" data-plans="<?php echo esc_attr( implode( ',', $row['plans'] ) ); ?>">
								<input type="radio" name="gateway" value="<?php echo esc_attr( $id ); ?>" <?php checked( $first ); ?>>
								<span><?php echo esc_html( $row['gateway']->title() ); ?><?php echo 'test' === $row['gateway']->mode() && current_user_can( 'manage_options' ) ? ' <em class="mg-test">' . esc_html__( 'test mode', 'memberglut' ) . '</em>' : ''; ?></span>
							</label>
							<?php $first = false; ?>
						<?php endforeach; ?>
					</div>
					<?php if ( isset( $by_gateway['bank'] ) ) : ?>
						<div class="mg-gateway-note" data-gateway-note="bank"><?php esc_html_e( 'You will see our bank details after placing the order. Your membership starts when we receive the payment.', 'memberglut' ); ?></div>
					<?php endif; ?>
				<?php endif; ?>
				<span class="mg-field-error" role="alert"></span>
			</div>
			<?php
			/**
			 * Extra checkout fields (order bumps, pricing fields, tax number…). Validate them with
			 * memberglut_registration_validate and read them in memberglut_order_summary.
			 *
			 * @param array[] $plans   Plans offered.
			 * @param int     $user_id User.
			 */
			do_action( 'memberglut_checkout_fields', $plans, $user_id );
			?>
			<div class="mg-pay-area" data-mg-pay-area hidden></div>
		</div>
		<?php
		return (string) ob_get_clean();
	}

	/**
	 * Order summary HTML.
	 *
	 * @param array $s Summary.
	 * @return string
	 */
	public static function summary_html( $s ) {
		$html = '<table class="mg-summary-table"><tbody>';
		foreach ( $s['lines'] as $line ) {
			$html .= '<tr><th>' . esc_html( $line['label'] ) . '</th><td>' . esc_html( ( $line['amount'] < 0 ? '−' : '' ) . memberglut_format_price( abs( $line['amount'] ), $s['currency'] ) ) . '</td></tr>';
		}
		$html .= '<tr class="mg-total"><th>' . esc_html__( 'Due today', 'memberglut' ) . '</th><td>' . esc_html( memberglut_format_price( $s['total'], $s['currency'] ) ) . '</td></tr>';
		$html .= '</tbody></table><p class="mg-summary-text">' . esc_html( $s['text'] ) . '</p>';
		return $html;
	}

	/**
	 * [memberglut_receipt] — order details on the Thank-you page.
	 *
	 * @return string
	 */
	public static function receipt() {
		MemberGlut_Assets::need( false );
		MemberGlut_Cache::no_cache();
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- Authorized by the payment key.
		$p = ! empty( $_GET['mg_payment'] ) && ! empty( $_GET['mg_key'] ) ? self::payment_by_key( absint( $_GET['mg_payment'] ), sanitize_text_field( wp_unslash( $_GET['mg_key'] ) ) ) : null;
		// phpcs:enable
		if ( ! $p && is_user_logged_in() ) {
			$rows = memberglut_repo( 'payments' )->query( array( 'where' => array( 'user_id' => get_current_user_id() ), 'orderby' => 'id DESC', 'per_page' => 1 ) );
			$p    = $rows ? $rows[0] : null;
		}
		if ( ! $p ) {
			return MemberGlut_Shortcodes::notice() . '<p class="mg-receipt-empty">' . esc_html__( 'Thank you! We could not find your order details on this page, but you will receive them by email.', 'memberglut' ) . '</p>';
		}
		return memberglut_get_template(
			'checkout/receipt.php',
			array(
				'payment' => $p,
				'plan'    => MemberGlut_Plans::get( $p['plan_id'] ),
				'sub'     => $p['subscription_id'] ? MemberGlut_Subscription_Service::get( $p['subscription_id'] ) : null,
				'notice'  => MemberGlut_Shortcodes::notice(),
				'gateway' => MemberGlut_Gateways::get( $p['gateway'] ),
			)
		);
	}
}
