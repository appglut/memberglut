<?php
/**
 * GDPR tools (Global Settings › Privacy & GDPR): personal data exporter and eraser for Tools › Export / Erase
 * Personal Data, and the suggested privacy policy text.
 *
 * Exported: memberships, payments, login history, consents, custom profile fields. Admin notes are not personal
 * data of the member and stay out.
 * Erased: login history, consents, custom fields and activity; ended memberships are anonymised (kept for stats);
 * active memberships are retained until they end; payments are anonymised or deleted (gdpr_eraser_payments).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Privacy class.
 */
class MemberGlut_Privacy {

	const PER_PAGE = 200;

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_filter( 'wp_privacy_personal_data_exporters', array( __CLASS__, 'register_exporters' ) );
		add_filter( 'wp_privacy_personal_data_erasers', array( __CLASS__, 'register_erasers' ) );
		add_action( 'admin_init', array( __CLASS__, 'policy_text' ) );
	}

	/**
	 * Register exporters.
	 *
	 * @param array $exporters Exporters.
	 * @return array
	 */
	public static function register_exporters( $exporters ) {
		if ( ! memberglut_setting( 'gdpr_exporter', true ) ) {
			return $exporters;
		}
		$exporters['memberglut-membership'] = array( 'exporter_friendly_name' => __( 'MemberGlut memberships and profile', 'memberglut' ), 'callback' => array( __CLASS__, 'export_membership' ) );
		$exporters['memberglut-payments']   = array( 'exporter_friendly_name' => __( 'MemberGlut payments', 'memberglut' ), 'callback' => array( __CLASS__, 'export_payments' ) );
		$exporters['memberglut-logins']     = array( 'exporter_friendly_name' => __( 'MemberGlut login history', 'memberglut' ), 'callback' => array( __CLASS__, 'export_logins' ) );
		return $exporters;
	}

	/**
	 * Register the eraser.
	 *
	 * @param array $erasers Erasers.
	 * @return array
	 */
	public static function register_erasers( $erasers ) {
		if ( memberglut_setting( 'gdpr_eraser', true ) ) {
			$erasers['memberglut'] = array( 'eraser_friendly_name' => __( 'MemberGlut', 'memberglut' ), 'callback' => array( __CLASS__, 'erase' ) );
		}
		return $erasers;
	}

	/**
	 * name/value pairs, skipping empty values.
	 *
	 * @param array $pairs label => value.
	 * @return array
	 */
	private static function data( $pairs ) {
		$out = array();
		foreach ( $pairs as $name => $value ) {
			if ( '' !== (string) $value && null !== $value ) {
				$out[] = array( 'name' => $name, 'value' => $value );
			}
		}
		return $out;
	}

	/**
	 * Memberships, consents and custom fields.
	 *
	 * @param string $email Email.
	 * @param int    $page  Page.
	 * @return array
	 */
	public static function export_membership( $email, $page = 1 ) {
		$user  = get_user_by( 'email', $email );
		$items = array();
		if ( $user ) {
			$statuses = MemberGlut_Lookups::statuses();
			foreach ( memberglut_repo( 'subscriptions' )->query( array( 'where' => array( 'user_id' => $user->ID ), 'orderby' => 'id ASC' ) ) as $s ) {
				$plan    = MemberGlut_Plans::get( $s['plan_id'] );
				$items[] = array(
					'group_id'    => 'memberglut-memberships',
					'group_label' => __( 'Memberships', 'memberglut' ),
					'item_id'     => 'memberglut-sub-' . $s['id'],
					'data'        => self::data(
						array(
							__( 'Plan', 'memberglut' )         => $plan ? $plan['name'] : '#' . $s['plan_id'],
							__( 'Status', 'memberglut' )       => isset( $statuses[ $s['status'] ] ) ? $statuses[ $s['status'] ] : $s['status'],
							__( 'Started', 'memberglut' )      => $s['start_date'] ? memberglut_format_date( $s['start_date'] ) : '',
							__( 'Expires', 'memberglut' )      => $s['expires_at'] ? memberglut_format_date( $s['expires_at'] ) : '',
							__( 'Canceled', 'memberglut' )     => $s['canceled_at'] ? memberglut_format_date( $s['canceled_at'] ) : '',
							__( 'Payment method', 'memberglut' ) => $s['gateway'],
						)
					),
				);
			}
			foreach ( MemberGlut_Agreements::consents( $user->ID ) as $i => $c ) {
				$items[] = array(
					'group_id'    => 'memberglut-consents',
					'group_label' => __( 'Consents', 'memberglut' ),
					'item_id'     => 'memberglut-consent-' . $i,
					'data'        => self::data(
						array(
							__( 'Agreement', 'memberglut' ) => isset( $c['label'] ) ? $c['label'] : ( isset( $c['type'] ) ? $c['type'] : '' ),
							__( 'Text', 'memberglut' )      => isset( $c['text'] ) ? wp_strip_all_tags( $c['text'] ) : '',
							__( 'Date', 'memberglut' )      => isset( $c['time'] ) ? wp_date( get_option( 'date_format' ), strtotime( $c['time'] ) ) : '',
							__( 'IP address', 'memberglut' ) => isset( $c['ip'] ) ? $c['ip'] : '',
						)
					),
				);
			}
			$fields = array();
			foreach ( MemberGlut_Settings::custom_fields() as $f ) {
				$v = get_user_meta( $user->ID, $f['key'], true );
				if ( '' !== $v && null !== $v && array() !== $v ) {
					$fields[ isset( $f['label'] ) && $f['label'] ? $f['label'] : $f['key'] ] = is_array( $v ) ? implode( ', ', $v ) : (string) $v;
				}
			}
			if ( $fields ) {
				$items[] = array(
					'group_id'    => 'memberglut-profile',
					'group_label' => __( 'Membership profile', 'memberglut' ),
					'item_id'     => 'memberglut-profile-' . $user->ID,
					'data'        => self::data( $fields ),
				);
			}
		}
		return array( 'data' => $items, 'done' => true );
	}

	/**
	 * WHERE for the payments of an email (account or guest checkout).
	 *
	 * @param string $email Email.
	 * @return array
	 */
	private static function payment_args( $email ) {
		global $wpdb;
		$user = get_user_by( 'email', $email );
		return array( 'raw_where' => $user ? $wpdb->prepare( '(user_id = %d OR email = %s)', $user->ID, $email ) : $wpdb->prepare( 'email = %s', $email ) );
	}

	/**
	 * Payments.
	 *
	 * @param string $email Email.
	 * @param int    $page  Page.
	 * @return array
	 */
	public static function export_payments( $email, $page = 1 ) {
		$rows  = memberglut_repo( 'payments' )->query( self::payment_args( $email ) + array( 'orderby' => 'id ASC', 'page' => (int) $page, 'per_page' => self::PER_PAGE ) );
		$items = array();
		foreach ( $rows as $p ) {
			$plan    = $p['plan_id'] ? MemberGlut_Plans::get( $p['plan_id'] ) : null;
			$items[] = array(
				'group_id'    => 'memberglut-payments',
				'group_label' => __( 'Payments', 'memberglut' ),
				'item_id'     => 'memberglut-payment-' . $p['id'],
				'data'        => self::data(
					array(
						__( 'Payment', 'memberglut' )        => '#' . $p['id'],
						__( 'Date', 'memberglut' )           => memberglut_format_date( $p['created_at'] ),
						__( 'Plan', 'memberglut' )           => $plan ? $plan['name'] : '',
						__( 'Amount', 'memberglut' )         => memberglut_format_price( $p['amount'], $p['currency'] ),
						__( 'Status', 'memberglut' )         => $p['status'],
						__( 'Payment method', 'memberglut' ) => $p['gateway'],
						__( 'Transaction ID', 'memberglut' ) => $p['transaction_id'],
						__( 'Coupon', 'memberglut' )         => $p['coupon_code'],
						__( 'IP address', 'memberglut' )     => $p['ip'],
					)
				),
			);
		}
		return array( 'data' => $items, 'done' => count( $rows ) < self::PER_PAGE );
	}

	/**
	 * Login history.
	 *
	 * @param string $email Email.
	 * @param int    $page  Page.
	 * @return array
	 */
	public static function export_logins( $email, $page = 1 ) {
		$user = get_user_by( 'email', $email );
		if ( ! $user ) {
			return array( 'data' => array(), 'done' => true );
		}
		$rows  = memberglut_repo( 'logins' )->query( array( 'where' => array( 'user_id' => $user->ID ), 'orderby' => 'id ASC', 'page' => (int) $page, 'per_page' => self::PER_PAGE ) );
		$items = array();
		foreach ( $rows as $l ) {
			$items[] = array(
				'group_id'    => 'memberglut-logins',
				'group_label' => __( 'Login history', 'memberglut' ),
				'item_id'     => 'memberglut-login-' . $l['id'],
				'data'        => self::data(
					array(
						__( 'Date', 'memberglut' )       => memberglut_format_date( $l['created_at'], get_option( 'date_format' ) . ' ' . get_option( 'time_format' ) ),
						__( 'IP address', 'memberglut' ) => $l['ip'],
						__( 'Device', 'memberglut' )     => $l['device_label'],
						__( 'Browser', 'memberglut' )    => $l['user_agent'],
					)
				),
			);
		}
		return array( 'data' => $items, 'done' => count( $rows ) < self::PER_PAGE );
	}

	/**
	 * Erase / anonymise.
	 *
	 * @param string $email Email.
	 * @param int    $page  Page.
	 * @return array
	 */
	public static function erase( $email, $page = 1 ) {
		$removed  = false;
		$retained = false;
		$messages = array();
		$user     = get_user_by( 'email', $email );

		if ( $user ) {
			$uid = $user->ID;
			if ( memberglut_repo( 'logins' )->delete_where( array( 'user_id' => $uid ) ) ) {
				$removed = true;
			}
			if ( get_user_meta( $uid, 'memberglut_consents', true ) ) {
				delete_user_meta( $uid, 'memberglut_consents' );
				$removed = true;
			}
			foreach ( MemberGlut_Settings::custom_fields() as $f ) {
				if ( delete_user_meta( $uid, $f['key'] ) ) {
					$removed = true;
				}
			}
			if ( memberglut_repo( 'events' )->delete_where( array( 'user_id' => $uid ) ) ) {
				$removed = true;
			}
			memberglut_repo( 'coupon_uses' )->update_where( array( 'user_id' => $uid ), array( 'user_id' => 0, 'email' => '' ) );

			$keep = array( 'active', 'trialing', 'on_hold', 'canceled', 'pending' );
			foreach ( memberglut_repo( 'subscriptions' )->query( array( 'where' => array( 'user_id' => $uid ) ) ) as $s ) {
				if ( in_array( $s['status'], $keep, true ) && ( ! $s['expires_at'] || strtotime( $s['expires_at'] . ' UTC' ) > time() || 'pending' === $s['status'] ) ) {
					$retained = true;
					continue;
				}
				memberglut_repo( 'subscriptions' )->update( $s['id'], array( 'user_id' => 0, 'gateway_customer_id' => '' ) );
				$removed = true;
			}
			if ( $retained ) {
				$messages[] = __( 'Active memberships were kept. Cancel them first, then erase again.', 'memberglut' );
			}
			MemberGlut_Subscription_Service::flush( $uid );
		}

		$args = self::payment_args( $email );
		if ( 'delete' === memberglut_setting( 'gdpr_eraser_payments', 'anonymize' ) ) {
			$ids = wp_list_pluck( memberglut_repo( 'payments' )->query( $args + array( 'per_page' => 0 ) ), 'id' );
			foreach ( $ids as $id ) {
				memberglut_repo( 'payments' )->delete( $id );
				memberglut_repo( 'events' )->delete_where( array( 'object_type' => 'payment', 'object_id' => (int) $id ) );
			}
			$removed = $removed || (bool) $ids;
		} else {
			$n = 0;
			foreach ( memberglut_repo( 'payments' )->query( $args + array( 'per_page' => 0 ) ) as $p ) {
				memberglut_repo( 'payments' )->update( $p['id'], array( 'user_id' => 0, 'email' => '', 'ip' => '' ) );
				++$n;
			}
			if ( $n ) {
				$removed    = true;
				$messages[] = __( 'Payments were anonymised and kept for accounting.', 'memberglut' );
			}
		}
		do_action( 'memberglut_personal_data_erased', $email, $user ? $user->ID : 0 );
		return array( 'items_removed' => $removed, 'items_retained' => $retained, 'messages' => $messages, 'done' => true );
	}

	/**
	 * Suggested privacy policy text (Settings › Privacy › Policy guide).
	 *
	 * @return void
	 */
	public static function policy_text() {
		if ( ! function_exists( 'wp_add_privacy_policy_content' ) ) {
			return;
		}
		$text  = '<p class="privacy-policy-tutorial">' . esc_html__( 'MemberGlut stores the data below for members. Adapt it to your setup.', 'memberglut' ) . '</p>';
		$text .= '<p><strong class="privacy-policy-tutorial">' . esc_html__( 'Suggested text:', 'memberglut' ) . '</strong> ';
		$text .= esc_html__( 'When you register or buy a membership we store your name, email address, the plan you joined, its dates and status, and the details of your payments (amount, date, payment method and the reference from the payment provider — never your full card number). We record the agreements you accept with the date and IP address, and a history of your logins (date, IP address and device) to keep your account secure. Card and PayPal payments are processed by Stripe or PayPal under their own privacy policies. Memberships and payments are kept as long as your account exists and as required by tax law; you can ask us to export or erase your data.', 'memberglut' ) . '</p>';
		$captcha = memberglut_setting( 'captcha_provider', 'none' );
		if ( 'none' !== $captcha ) {
			$names = array( 'recaptcha' => 'Google reCAPTCHA', 'hcaptcha' => 'hCaptcha', 'turnstile' => 'Cloudflare Turnstile' );
			/* translators: %s: captcha service */
			$text .= '<p>' . esc_html( sprintf( __( 'Our forms are protected by %s, which receives your IP address and browser details to tell people from bots.', 'memberglut' ), $names[ $captcha ] ) ) . '</p>';
		}
		wp_add_privacy_policy_content( 'MemberGlut', wp_kses_post( $text ) );
	}
}
