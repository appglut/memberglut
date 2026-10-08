<?php
/**
 * Email engine: the 23 MemberGlut emails, their defaults and overrides, smart tags, the HTML template and sending.
 *
 * Overrides are stored in the `memberglut_emails` option (only what differs from the defaults). Sender and design
 * come from Global Settings › Email settings and apply to every email (plans/01-dependency-map.md §2.9).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Mailer class.
 */
class MemberGlut_Mailer {

	const OPTION    = 'memberglut_emails';
	const REMINDERS = array( 'expiring_soon', 'renewal_reminder', 'trial_ending' );

	/**
	 * Errors raised by wp_mail during our last send.
	 *
	 * @var string
	 */
	private static $last_error = '';

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'wp_mail_failed', array( __CLASS__, 'capture_failure' ) );
	}

	/**
	 * Default emails.
	 *
	 * @return array key => definition
	 */
	public static function registry() {
		$hi  = "Hi {first_name},\n\n";
		$sig = "\n\n{site_name}";
		$e   = array(
			'register'             => array( 'account', 'member', __( 'Welcome / registration', 'memberglut' ), __( 'Sent when a new account is created.', 'memberglut' ), 'Welcome to {site_name}, {display_name}!', $hi . "Welcome to {site_name}! Your account is ready.\n\nUsername: {username}\nLog in here: {login_url}{set_password_line}\n\nSee you inside," . $sig ),
			'activation'           => array( 'account', 'member', __( 'Email activation', 'memberglut' ), __( 'Sent when the plan or form requires the email address to be confirmed.', 'memberglut' ), 'Please confirm your email address', $hi . "Please confirm your email address to activate your account:\n\n{activation_link}\n\nThe link works for 48 hours. If you did not sign up, ignore this email." . $sig ),
			'pending_review'       => array( 'account', 'member', __( 'Account pending review', 'memberglut' ), __( 'Sent when registration needs admin approval.', 'memberglut' ), 'Your account is awaiting approval', $hi . "Thanks for signing up at {site_name}. Your account is waiting for approval. We will email you as soon as it is approved." . $sig ),
			'approved'             => array( 'account', 'member', __( 'Account approved', 'memberglut' ), __( 'Sent when an admin approves the account.', 'memberglut' ), 'Your account at {site_name} is now active', $hi . "Good news: your account has been approved.\n\nLog in here: {login_url}" . $sig ),
			'rejected'             => array( 'account', 'member', __( 'Account rejected', 'memberglut' ), __( 'Sent when an admin rejects the registration.', 'memberglut' ), 'Your registration was not approved', $hi . "We are sorry, your registration at {site_name} was not approved.\n\nIf you think this is a mistake, reply to this email." . $sig, false ),
			'reset_password'       => array( 'account', 'member', __( 'Password reset', 'memberglut' ), __( 'Sent from the lost-password form.', 'memberglut' ), 'Reset your password for {site_name}', $hi . "Someone asked to reset the password of your account ({username}).\n\nSet a new password here:\n{reset_link}\n\nIf this was not you, ignore this email and nothing will change." . $sig ),
			'password_changed'     => array( 'account', 'member', __( 'Password changed', 'memberglut' ), __( 'Sent after the password is changed.', 'memberglut' ), 'Your {site_name} password was changed', $hi . "The password of your account was just changed.\n\nIf you did not do this, reset your password right away: {lost_password_url}" . $sig, false ),
			'email_change'         => array( 'account', 'member', __( 'Confirm email change', 'memberglut' ), __( 'Sent to the new address when a member changes their email.', 'memberglut' ), 'Confirm your new email address', $hi . "Please confirm that you want to use this email address for your {site_name} account:\n\n{confirm_link}\n\nThe link works for 48 hours." . $sig ),
			'account_deleted'      => array( 'account', 'member', __( 'Account deleted', 'memberglut' ), __( 'Sent after a member deletes their account.', 'memberglut' ), 'Your account has been deleted', $hi . "Your account at {site_name} has been deleted, as you asked. We are sorry to see you go." . $sig, false ),
			'activated'            => array( 'subscription', 'member', __( 'Subscription activated', 'memberglut' ), __( 'Sent when a plan becomes active.', 'memberglut' ), 'Your {plan_name} membership is active', $hi . "Your {plan_name} membership is now active.\n\nPlan: {plan_name}\nPrice: {plan_price}\nRenews / expires: {expiration_date}\n\nManage it any time from your account: {account_url}" . $sig ),
			'renewed'              => array( 'subscription', 'member', __( 'Subscription renewed', 'memberglut' ), __( 'Sent after a successful renewal.', 'memberglut' ), 'Your {plan_name} membership was renewed', $hi . "Your {plan_name} membership was renewed. Thank you!\n\nNext renewal / expiry: {expiration_date}\n\nYour account: {account_url}" . $sig ),
			'canceled'             => array( 'subscription', 'member', __( 'Subscription canceled', 'memberglut' ), __( 'Sent when a subscription is canceled or abandoned.', 'memberglut' ), 'Your {plan_name} membership was canceled', $hi . "Your {plan_name} membership was canceled. {access_until_line}\n\nYou can join again any time: {pricing_url}" . $sig ),
			'expired'              => array( 'subscription', 'member', __( 'Subscription expired', 'memberglut' ), __( 'Sent when access ends.', 'memberglut' ), 'Your {plan_name} membership has expired', $hi . "Your {plan_name} membership has expired.\n\nRenew it here to get your access back: {pricing_url}" . $sig ),
			'expiring_soon'        => array( 'subscription', 'member', __( 'Expiration reminder', 'memberglut' ), __( 'Sent a set number of days before a non-renewing plan expires.', 'memberglut' ), 'Your {plan_name} membership expires on {expiration_date}', $hi . "Your {plan_name} membership expires on {expiration_date}.\n\nRenew it from your account to keep your access: {account_url}" . $sig ),
			'renewal_reminder'     => array( 'subscription', 'member', __( 'Renewal reminder', 'memberglut' ), __( 'Sent a set number of days before an automatic renewal.', 'memberglut' ), 'Your {plan_name} membership renews soon', $hi . "Your {plan_name} membership renews on {next_payment_date} for {plan_price}.\n\nNothing to do if you want to keep it. Manage it here: {account_url}" . $sig ),
			'trial_ending'         => array( 'subscription', 'member', __( 'Trial ending', 'memberglut' ), __( 'Sent before a free trial converts to paid.', 'memberglut' ), 'Your free trial ends on {trial_end_date}', $hi . "Your free trial of {plan_name} ends on {trial_end_date}. After that you will be charged {plan_price}.\n\nManage your membership here: {account_url}" . $sig ),
			'receipt'              => array( 'payment', 'member', __( 'Payment receipt', 'memberglut' ), __( 'Sent after every completed payment.', 'memberglut' ), 'Receipt for your payment #{payment_id}', $hi . "Thank you for your payment.\n\n{order_breakdown}\n\nPayment #{payment_id} · {payment_date} · {payment_gateway}\n\nYour account: {account_url}" . $sig ),
			'payment_failed'       => array( 'payment', 'member', __( 'Payment failed', 'memberglut' ), __( 'Sent when a renewal charge fails.', 'memberglut' ), 'Your latest payment failed', $hi . "We could not take the payment for your {plan_name} membership.\n\nPlease update your payment method from your account so you do not lose access: {account_url}\n\nWe will try again automatically in a few days." . $sig ),
			'pending_manual'       => array( 'payment', 'member', __( 'Pending bank transfer', 'memberglut' ), __( 'Sent with bank details after a bank-transfer checkout.', 'memberglut' ), 'Complete your order with a bank transfer', $hi . "Thanks for your order of {plan_name}. Please transfer {payment_amount} using these details:\n\n{bank_details}\n\nReference: #{payment_id}\n\nYour membership starts as soon as we receive the payment." . $sig ),
			'admin_new_member'     => array( 'admin', 'admin', __( 'New member', 'memberglut' ), __( 'Sent to the admin for every new member.', 'memberglut' ), '[{site_name}] New member: {display_name}', "New member on {site_name}:\n\nName: {display_name}\nEmail: {user_email}\nPlan: {plan_name} ({subscription_status})\n\nView: {admin_member_url}" ),
			'admin_new_payment'    => array( 'admin', 'admin', __( 'New payment', 'memberglut' ), __( 'Sent to the admin for every completed payment.', 'memberglut' ), '[{site_name}] New payment of {payment_amount}', "New payment on {site_name}:\n\n{display_name} ({user_email}) paid {payment_amount} for {plan_name} via {payment_gateway}.\n\nPayment #{payment_id}: {admin_payment_url}" ),
			'admin_pending_review' => array( 'admin', 'admin', __( 'Account needs review', 'memberglut' ), __( 'Sent when a registration is waiting for approval.', 'memberglut' ), '[{site_name}] New user awaiting review', "{display_name} ({user_email}) signed up and is waiting for approval.\n\nReview: {admin_member_url}" ),
			'admin_canceled'       => array( 'admin', 'admin', __( 'Subscription canceled', 'memberglut' ), __( 'Sent when a member cancels.', 'memberglut' ), '[{site_name}] {display_name} canceled {plan_name}', "{display_name} ({user_email}) canceled {plan_name}.\n\n{access_until_line}\n\nView: {admin_member_url}", false ),
		);
		$out = array();
		foreach ( $e as $key => $d ) {
			$out[ $key ] = array(
				'key'       => $key,
				'group'     => $d[0],
				'recipient' => $d[1],
				'name'      => $d[2],
				'desc'      => $d[3],
				'subject'   => $d[4],
				'heading'   => '',
				'body'      => $d[5],
				'enabled'   => isset( $d[6] ) ? (bool) $d[6] : true,
				'days'      => in_array( $key, self::REMINDERS, true ) ? ( 'trial_ending' === $key ? 3 : 7 ) : null,
			);
		}
		return apply_filters( 'memberglut_email_triggers', $out );
	}

	/**
	 * All emails with overrides applied.
	 *
	 * @return array key => email
	 */
	public static function all() {
		$defaults  = self::registry();
		$overrides = get_option( self::OPTION, array() );
		$overrides = is_array( $overrides ) ? $overrides : array();
		$out       = array();
		foreach ( $defaults as $key => $email ) {
			$o                  = isset( $overrides[ $key ] ) && is_array( $overrides[ $key ] ) ? $overrides[ $key ] : array();
			$merged             = array_merge( $email, array_intersect_key( $o, array_flip( array( 'enabled', 'subject', 'heading', 'body', 'days' ) ) ) );
			$merged['is_default'] = $merged['subject'] === $email['subject'] && $merged['body'] === $email['body'] && '' === $merged['heading'];
			$out[ $key ]        = $merged;
		}
		return $out;
	}

	/**
	 * One email.
	 *
	 * @param string $key Key.
	 * @return array|null
	 */
	public static function get( $key ) {
		$all = self::all();
		return isset( $all[ $key ] ) ? $all[ $key ] : null;
	}

	/**
	 * Save emails (list or map) — only differences from the defaults are stored.
	 *
	 * @param array $emails Emails.
	 * @return array All emails.
	 */
	public static function save( $emails ) {
		$defaults  = self::registry();
		$overrides = get_option( self::OPTION, array() );
		$overrides = is_array( $overrides ) ? $overrides : array();
		foreach ( $emails as $email ) {
			if ( ! is_array( $email ) || empty( $email['key'] ) || ! isset( $defaults[ $email['key'] ] ) ) {
				continue;
			}
			$key = $email['key'];
			$d   = $defaults[ $key ];
			$o   = array();
			if ( isset( $email['enabled'] ) && (bool) $email['enabled'] !== $d['enabled'] ) {
				$o['enabled'] = (bool) $email['enabled'];
			}
			foreach ( array( 'subject', 'heading' ) as $f ) {
				if ( isset( $email[ $f ] ) ) {
					$v = sanitize_text_field( (string) $email[ $f ] );
					if ( $v !== $d[ $f ] ) {
						$o[ $f ] = $v;
					}
				}
			}
			if ( isset( $email['body'] ) ) {
				$v = wp_kses_post( (string) $email['body'] );
				if ( $v !== $d['body'] ) {
					$o['body'] = $v;
				}
			}
			if ( null !== $d['days'] && isset( $email['days'] ) ) {
				$days = max( 1, min( 90, (int) $email['days'] ) );
				if ( $days !== $d['days'] ) {
					$o['days'] = $days;
				}
			}
			if ( $o ) {
				$overrides[ $key ] = $o;
			} else {
				unset( $overrides[ $key ] );
			}
		}
		update_option( self::OPTION, $overrides, false );
		MemberGlut_Settings::update_forms( array( 'emails_reviewed' => true ) );
		return self::all();
	}

	/**
	 * Restore the default subject, heading and text of an email (keeps the on/off switch and reminder days).
	 *
	 * @param string $key Key.
	 * @return array|null
	 */
	public static function reset( $key ) {
		$overrides = get_option( self::OPTION, array() );
		if ( isset( $overrides[ $key ] ) ) {
			$overrides[ $key ] = array_intersect_key( $overrides[ $key ], array_flip( array( 'enabled', 'days' ) ) );
			if ( ! $overrides[ $key ] ) {
				unset( $overrides[ $key ] );
			}
			update_option( self::OPTION, $overrides, false );
		}
		return self::get( $key );
	}

	/* ---------------------------------------------------------------------
	 * Tags
	 * ------------------------------------------------------------------ */

	/**
	 * Tag list for the editor.
	 *
	 * @return array[] [ tag, label ]
	 */
	public static function tags_for_client() {
		$tags = array(
			'{display_name}'        => __( 'Member display name', 'memberglut' ),
			'{first_name}'          => __( 'First name', 'memberglut' ),
			'{last_name}'           => __( 'Last name', 'memberglut' ),
			'{username}'            => __( 'Username', 'memberglut' ),
			'{user_email}'          => __( 'Member email', 'memberglut' ),
			'{plan_name}'           => __( 'Plan name', 'memberglut' ),
			'{plan_price}'          => __( 'Plan price', 'memberglut' ),
			'{plan_duration}'       => __( 'Plan duration', 'memberglut' ),
			'{start_date}'          => __( 'Subscription start date', 'memberglut' ),
			'{expiration_date}'     => __( 'Expiration / renewal date', 'memberglut' ),
			'{next_payment_date}'   => __( 'Next payment date', 'memberglut' ),
			'{trial_end_date}'      => __( 'Trial end date', 'memberglut' ),
			'{subscription_status}' => __( 'Subscription status', 'memberglut' ),
			'{payment_id}'          => __( 'Payment ID', 'memberglut' ),
			'{payment_amount}'      => __( 'Payment amount', 'memberglut' ),
			'{payment_date}'        => __( 'Payment date', 'memberglut' ),
			'{payment_gateway}'     => __( 'Payment method', 'memberglut' ),
			'{order_breakdown}'     => __( 'Price, fee, discount and total', 'memberglut' ),
			'{coupon_code}'         => __( 'Coupon used', 'memberglut' ),
			'{bank_details}'        => __( 'Bank transfer instructions', 'memberglut' ),
			'{account_url}'         => __( 'My Account page link', 'memberglut' ),
			'{login_url}'           => __( 'Login page link', 'memberglut' ),
			'{pricing_url}'         => __( 'Pricing page link', 'memberglut' ),
			'{lost_password_url}'   => __( 'Lost password page link', 'memberglut' ),
			'{reset_link}'          => __( 'Password reset link', 'memberglut' ),
			'{activation_link}'     => __( 'Email activation link', 'memberglut' ),
			'{site_name}'           => __( 'Site title', 'memberglut' ),
			'{site_url}'            => __( 'Site address', 'memberglut' ),
			'{admin_email}'         => __( 'Admin email', 'memberglut' ),
		);
		foreach ( MemberGlut_Settings::custom_fields() as $f ) {
			/* translators: %s: field label */
			$tags[ '{field:' . $f['key'] . '}' ] = sprintf( __( 'Custom field: %s', 'memberglut' ), $f['label'] );
		}
		$out = array();
		foreach ( $tags as $tag => $label ) {
			$out[] = array( 'tag' => $tag, 'label' => $label );
		}
		return $out;
	}

	/**
	 * Tag values for a context.
	 *
	 * Context keys: user_id, user (WP_User), subscription (row), plan (client plan), payment (row), and any
	 * extra tag values without braces (reset_link, activation_link, confirm_link, set_password_link…).
	 *
	 * @param array $c Context.
	 * @return array tag => value
	 */
	public static function tag_values( $c ) {
		$user = isset( $c['user'] ) && $c['user'] instanceof WP_User ? $c['user'] : ( ! empty( $c['user_id'] ) ? get_userdata( $c['user_id'] ) : null );
		$sub  = isset( $c['subscription'] ) ? $c['subscription'] : null;
		$plan = isset( $c['plan'] ) ? $c['plan'] : ( $sub ? MemberGlut_Plans::get( $sub['plan_id'] ) : null );
		$pay  = isset( $c['payment'] ) ? $c['payment'] : null;
		if ( ! $plan && $pay && ! empty( $pay['plan_id'] ) ) {
			$plan = MemberGlut_Plans::get( $pay['plan_id'] );
		}
		$statuses = MemberGlut_Lookups::statuses();
		$gateways = array();
		foreach ( MemberGlut_Lookups::gateways() as $g ) {
			$gateways[ $g['value'] ] = $g['label'];
		}
		$gateways += array( 'manual' => __( 'Manual', 'memberglut' ), 'free' => __( 'Free', 'memberglut' ) );
		$expires = $sub ? ( $sub['expires_at'] ? memberglut_format_date( $sub['expires_at'] ) : __( 'never', 'memberglut' ) ) : '';
		$v       = array(
			'display_name'        => $user ? $user->display_name : '',
			'first_name'          => $user ? ( $user->first_name ? $user->first_name : $user->display_name ) : '',
			'last_name'           => $user ? $user->last_name : '',
			'username'            => $user ? $user->user_login : '',
			'user_email'          => $user ? $user->user_email : '',
			'plan_name'           => $plan ? $plan['name'] : '',
			'plan_price'          => $plan ? MemberGlut_Plans::price_label( $plan ) : '',
			'plan_duration'       => $plan ? MemberGlut_Plans::access_label( $plan ) : '',
			'start_date'          => $sub ? memberglut_format_date( $sub['start_date'] ) : '',
			'expiration_date'     => $expires,
			'next_payment_date'   => $sub && $sub['next_payment_at'] ? memberglut_format_date( $sub['next_payment_at'] ) : $expires,
			'trial_end_date'      => $sub && $sub['trial_ends_at'] ? memberglut_format_date( $sub['trial_ends_at'] ) : '',
			'subscription_status' => $sub && isset( $statuses[ $sub['status'] ] ) ? $statuses[ $sub['status'] ] : '',
			'access_until_line'   => $sub && 'canceled' === $sub['status'] && $sub['expires_at'] ? sprintf( /* translators: %s: date */ __( 'You keep access until %s.', 'memberglut' ), $expires ) : '',
			'payment_id'          => $pay ? $pay['id'] : '',
			'payment_amount'      => $pay ? memberglut_format_price( $pay['amount'], $pay['currency'] ) : '',
			'payment_date'        => $pay ? memberglut_format_date( $pay['created_at'] ) : '',
			'payment_gateway'     => $pay && isset( $gateways[ $pay['gateway'] ] ) ? $gateways[ $pay['gateway'] ] : ( $pay ? $pay['gateway'] : '' ),
			'order_breakdown'     => $pay ? self::order_breakdown( $pay, $plan ) : '',
			'coupon_code'         => $pay ? $pay['coupon_code'] : '',
			'bank_details'        => memberglut_setting( 'bank_instructions', '' ),
			'account_url'         => memberglut_page_url( 'account' ) ? memberglut_page_url( 'account' ) : home_url( '/' ),
			'login_url'           => memberglut_page_url( 'login' ) ? memberglut_page_url( 'login' ) : wp_login_url(),
			'pricing_url'         => memberglut_page_url( 'pricing' ) ? memberglut_page_url( 'pricing' ) : home_url( '/' ),
			'lost_password_url'   => memberglut_page_url( 'lost' ) ? memberglut_page_url( 'lost' ) : wp_lostpassword_url(),
			'site_name'           => wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ),
			'site_url'            => home_url( '/' ),
			'admin_email'         => get_option( 'admin_email' ),
			'admin_member_url'    => $user ? admin_url( 'admin.php?page=memberglut-member&user=' . $user->ID ) : '',
			'admin_payment_url'   => $pay ? admin_url( 'admin.php?page=memberglut-payments&payment=' . $pay['id'] ) : '',
			'reset_link'          => '',
			'activation_link'     => '',
			'confirm_link'        => '',
			'set_password_line'   => '',
		);
		if ( ! empty( $c['set_password_link'] ) ) {
			/* translators: %s: link */
			$v['set_password_line'] = "\n" . sprintf( __( 'Set your password: %s', 'memberglut' ), $c['set_password_link'] );
		}
		foreach ( $c as $k => $value ) {
			if ( is_scalar( $value ) && ! in_array( $k, array( 'user_id' ), true ) ) {
				$v[ $k ] = (string) $value;
			}
		}
		if ( $user ) {
			foreach ( MemberGlut_Settings::custom_fields() as $f ) {
				$meta                       = get_user_meta( $user->ID, $f['key'], true );
				$v[ 'field:' . $f['key'] ]  = is_array( $meta ) ? implode( ', ', $meta ) : (string) $meta;
			}
		}
		return apply_filters( 'memberglut_email_tags', $v, $c );
	}

	/**
	 * Plain-text order breakdown.
	 *
	 * @param array      $pay  Payment row.
	 * @param array|null $plan Plan.
	 * @return string
	 */
	private static function order_breakdown( $pay, $plan ) {
		$lines   = array();
		$lines[] = sprintf( '%s: %s', $plan ? $plan['name'] : __( 'Membership', 'memberglut' ), memberglut_format_price( $pay['subtotal'], $pay['currency'] ) );
		if ( (float) $pay['signup_fee'] > 0 ) {
			$lines[] = sprintf( '%s: %s', __( 'Sign-up fee', 'memberglut' ), memberglut_format_price( $pay['signup_fee'], $pay['currency'] ) );
		}
		if ( (float) $pay['discount'] > 0 ) {
			$lines[] = sprintf( '%s%s: -%s', __( 'Discount', 'memberglut' ), $pay['coupon_code'] ? ' (' . $pay['coupon_code'] . ')' : '', memberglut_format_price( $pay['discount'], $pay['currency'] ) );
		}
		if ( (float) $pay['tax'] > 0 ) {
			$lines[] = sprintf( '%s: %s', __( 'Tax', 'memberglut' ), memberglut_format_price( $pay['tax'], $pay['currency'] ) );
		}
		$lines[] = sprintf( '%s: %s', __( 'Total', 'memberglut' ), memberglut_format_price( $pay['amount'], $pay['currency'] ) );
		return implode( "\n", $lines );
	}

	/**
	 * Replace {tags} in a string.
	 *
	 * @param string $text   Text.
	 * @param array  $values Tag values.
	 * @param bool   $html   Escape values for HTML.
	 * @return string
	 */
	public static function replace_tags( $text, $values, $html = false ) {
		return preg_replace_callback(
			'/\{([a-z_]+(?::[a-z0-9_]+)?)\}/',
			static function ( $m ) use ( $values, $html ) {
				if ( ! array_key_exists( $m[1], $values ) ) {
					return '';
				}
				return $html ? esc_html( $values[ $m[1] ] ) : $values[ $m[1] ];
			},
			(string) $text
		);
	}

	/* ---------------------------------------------------------------------
	 * Rendering & sending
	 * ------------------------------------------------------------------ */

	/**
	 * Render an email.
	 *
	 * @param array $email   Email definition (subject, heading, body, name).
	 * @param array $context Context.
	 * @return array [ subject, body, html (bool) ]
	 */
	public static function render( $email, $context ) {
		$values  = self::tag_values( $context );
		$subject = wp_strip_all_tags( self::replace_tags( $email['subject'], $values ) );
		$html    = (bool) memberglut_setting( 'email_html', true );
		if ( ! $html ) {
			$body = wp_strip_all_tags( self::replace_tags( $email['body'], $values ) );
			$foot = wp_strip_all_tags( self::replace_tags( memberglut_setting( 'email_footer', '' ), $values ) );
			return array( $subject, $body . ( $foot ? "\n\n--\n" . $foot : '' ), false );
		}
		$content = wpautop( make_clickable( self::replace_tags( $email['body'], $values, true ) ) );
		$content = self::buttonize( $content );
		$heading = self::replace_tags( $email['heading'] ? $email['heading'] : $email['name'], $values, true );
		$body    = memberglut_get_template(
			'emails/wrapper.php',
			array(
				'heading' => $heading,
				'content' => $content,
				'logo'    => memberglut_setting( 'email_logo', '' ),
				'color'   => memberglut_setting( 'email_color', '#e94560' ),
				'footer'  => nl2br( esc_html( self::replace_tags( memberglut_setting( 'email_footer', '' ), $values ) ) ),
				'site'    => $values['site_name'],
				'url'     => home_url( '/' ),
			)
		);
		return array( $subject, $body, true );
	}

	/**
	 * Lines that contain only a link become buttons in the HTML template.
	 *
	 * @param string $html HTML.
	 * @return string
	 */
	private static function buttonize( $html ) {
		return preg_replace( '#<p>\s*<a href="([^"]+)"[^>]*>([^<]+)</a>\s*</p>#', '<p><a class="mg-btn" href="$1">$2</a></p>', $html );
	}

	/**
	 * Admin notification recipients.
	 *
	 * @return string[]
	 */
	public static function admin_recipients() {
		$list = array_filter( array_map( 'trim', explode( ',', (string) memberglut_setting( 'admin_recipients', '' ) ) ), 'is_email' );
		return $list ? $list : array( get_option( 'admin_email' ) );
	}

	/**
	 * Send one of the MemberGlut emails.
	 *
	 * @param string            $key     Email key.
	 * @param string|array|null $to      Recipient(s); null = the member (or the admins for admin emails).
	 * @param array             $context Context.
	 * @param array|null        $email   Override definition (test sends with unsaved text).
	 * @param bool              $force   Send even when the email is off (test sends).
	 * @return bool
	 */
	public static function send( $key, $to = null, $context = array(), $email = null, $force = false ) {
		$def = self::get( $key );
		if ( ! $def ) {
			return false;
		}
		$email = $email ? array_merge( $def, $email ) : $def;
		if ( ! $force && empty( $email['enabled'] ) ) {
			return false;
		}
		if ( ! apply_filters( 'memberglut_send_email', true, $key, $to, $context ) ) {
			return false;
		}
		if ( null === $to ) {
			if ( 'admin' === $def['recipient'] ) {
				$to = self::admin_recipients();
			} else {
				$user = isset( $context['user'] ) && $context['user'] instanceof WP_User ? $context['user'] : ( ! empty( $context['user_id'] ) ? get_userdata( $context['user_id'] ) : null );
				$to   = $user ? $user->user_email : '';
			}
		}
		if ( ! $to ) {
			return false;
		}
		list( $subject, $body, $html ) = self::render( $email, $context );
		$ok = self::mail( $to, $subject, $body, $html );
		$uid = ! empty( $context['user_id'] ) ? (int) $context['user_id'] : ( isset( $context['user'] ) && $context['user'] instanceof WP_User ? $context['user']->ID : null );
		if ( $ok ) {
			if ( ! $force ) {
				/* translators: %s: email name */
				memberglut_event( 'email_sent', sprintf( __( 'Email sent: %s', 'memberglut' ), $def['name'] ), array( 'user_id' => 'admin' === $def['recipient'] ? null : $uid, 'object_type' => 'email', 'data' => array( 'key' => $key ) ) );
			}
		} else {
			memberglut_log( 'error', 'email', sprintf( 'Email “%s” could not be sent: %s', $def['name'], self::$last_error ? self::$last_error : 'wp_mail returned false' ), array( 'to' => $to ) );
		}
		do_action( 'memberglut_email_sent', $key, $to, $ok, $context );
		return $ok;
	}

	/**
	 * Send any email with the MemberGlut sender and template (member broadcasts).
	 *
	 * @param string|array $to      Recipient(s).
	 * @param string       $subject Subject (tags allowed).
	 * @param string       $body    Body (tags allowed).
	 * @param array        $context Context for tags.
	 * @return bool
	 */
	public static function send_custom( $to, $subject, $body, $context = array() ) {
		list( $s, $b, $html ) = self::render( array( 'subject' => $subject, 'heading' => $subject, 'body' => $body, 'name' => $subject ), $context );
		return self::mail( $to, $s, $b, $html );
	}

	/**
	 * wp_mail with the MemberGlut sender.
	 *
	 * @param string|array $to      To.
	 * @param string       $subject Subject.
	 * @param string       $body    Body.
	 * @param bool         $html    HTML.
	 * @return bool
	 */
	public static function mail( $to, $subject, $body, $html ) {
		$headers = array( 'Content-Type: ' . ( $html ? 'text/html' : 'text/plain' ) . '; charset=UTF-8' );
		$name    = memberglut_setting( 'sender_name', '' );
		$name    = $name ? $name : wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
		$from    = memberglut_setting( 'sender_email', '' );
		$set_name = static function () use ( $name ) {
			return $name;
		};
		$set_from = static function ( $email ) use ( $from ) {
			return $from ? $from : $email;
		};
		add_filter( 'wp_mail_from_name', $set_name, 99 );
		add_filter( 'wp_mail_from', $set_from, 99 );
		self::$last_error = '';
		$ok = wp_mail( $to, $subject, $body, $headers );
		remove_filter( 'wp_mail_from_name', $set_name, 99 );
		remove_filter( 'wp_mail_from', $set_from, 99 );
		if ( ! $ok ) {
			update_option( 'memberglut_last_mail_error', array( 'time' => time(), 'error' => self::$last_error ), false );
		}
		return $ok;
	}

	/**
	 * Remember wp_mail errors.
	 *
	 * @param WP_Error $error Error.
	 * @return void
	 */
	public static function capture_failure( $error ) {
		self::$last_error = $error instanceof WP_Error ? $error->get_error_message() : '';
	}

	/**
	 * Sample context for previews and test sends.
	 *
	 * @return array
	 */
	public static function sample_context() {
		$user = wp_get_current_user();
		$plan = null;
		foreach ( MemberGlut_Plans::all() as $p ) {
			if ( 'paid' === $p['type'] ) {
				$plan = $p;
				break;
			}
		}
		$plan = $plan ? $plan : array( 'id' => 0, 'name' => 'Gold', 'type' => 'paid', 'price' => 89, 'billing' => 'recurring', 'duration' => array( 'length' => 1, 'unit' => 'year' ), 'duration_type' => 'unlimited', 'end_date' => '' );
		$now  = memberglut_now();
		$end  = memberglut_add_duration( $now, 1, 'year' );
		return array(
			'user'              => $user,
			'plan'              => $plan,
			'subscription'      => array( 'id' => 0, 'plan_id' => $plan['id'], 'status' => 'active', 'start_date' => $now, 'expires_at' => $end, 'next_payment_at' => $end, 'trial_ends_at' => memberglut_add_duration( $now, 7, 'day' ) ),
			'payment'           => array( 'id' => 5003, 'plan_id' => $plan['id'], 'amount' => $plan['price'], 'subtotal' => $plan['price'], 'signup_fee' => 0, 'discount' => 0, 'tax' => 0, 'currency' => memberglut_setting( 'currency', 'USD' ), 'gateway' => 'stripe', 'coupon_code' => '', 'created_at' => $now ),
			'reset_link'        => add_query_arg( array( 'key' => 'sample', 'login' => $user->user_login ), memberglut_page_url( 'lost' ) ? memberglut_page_url( 'lost' ) : wp_lostpassword_url() ),
			'activation_link'   => add_query_arg( 'mg_activate', 'sample', memberglut_page_url( 'login' ) ? memberglut_page_url( 'login' ) : wp_login_url() ),
			'confirm_link'      => add_query_arg( 'mg_confirm_email', 'sample', memberglut_page_url( 'account' ) ? memberglut_page_url( 'account' ) : home_url( '/' ) ),
		);
	}

	/* ---------------------------------------------------------------------
	 * Reminders
	 * ------------------------------------------------------------------ */

	/**
	 * Daily: expiration, renewal and trial reminders. Each is sent once per subscription period.
	 *
	 * @return int Emails sent.
	 */
	public static function send_reminders() {
		$sent = 0;
		$repo = memberglut_repo( 'subscriptions' );
		$now  = memberglut_now();
		$jobs = array(
			'expiring_soon'    => array( 'column' => 'expires_at', 'where' => array( 'status' => array( 'active', 'canceled' ) ) ),
			'renewal_reminder' => array( 'column' => 'next_payment_at', 'where' => array( 'status' => 'active' ) ),
			'trial_ending'     => array( 'column' => 'trial_ends_at', 'where' => array( 'status' => 'trialing' ) ),
		);
		foreach ( $jobs as $key => $job ) {
			$email = self::get( $key );
			if ( ! $email || empty( $email['enabled'] ) ) {
				continue;
			}
			$until = gmdate( 'Y-m-d H:i:s', time() + (int) $email['days'] * DAY_IN_SECONDS );
			$where = array_merge( $job['where'], array( $job['column'] . ' >' => $now, $job['column'] . ' <=' => $until ) );
			foreach ( $repo->query( array( 'where' => $where, 'per_page' => 500 ) ) as $sub ) {
				$plan = MemberGlut_Plans::get( $sub['plan_id'] );
				if ( ! $plan ) {
					continue;
				}
				$recurring = 'paid' === $plan['type'] && 'recurring' === $plan['billing'];
				// Expiration reminders are for plans that do not renew by themselves; renewal reminders for those that do.
				if ( 'expiring_soon' === $key && $recurring && 'canceled' !== $sub['status'] && $sub['gateway_subscription_id'] ) {
					continue;
				}
				if ( 'renewal_reminder' === $key && ( ! $recurring || ! $sub['gateway_subscription_id'] ) ) {
					continue;
				}
				$meta   = is_array( $sub['meta'] ) ? $sub['meta'] : array();
				$target = $sub[ $job['column'] ];
				if ( isset( $meta['reminders'][ $key ] ) && $meta['reminders'][ $key ] === $target ) {
					continue;
				}
				if ( self::send( $key, null, array( 'user_id' => $sub['user_id'], 'subscription' => $sub, 'plan' => $plan ) ) ) {
					++$sent;
				}
				$meta['reminders'][ $key ] = $target;
				$repo->update( $sub['id'], array( 'meta' => $meta ) );
			}
		}
		if ( $sent ) {
			memberglut_log( 'info', 'email', sprintf( '%d reminder emails sent', $sent ) );
		}
		return $sent;
	}
}
