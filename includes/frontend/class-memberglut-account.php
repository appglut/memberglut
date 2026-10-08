<?php
/**
 * Member account (Global Settings › Member account) and the member shortcodes:
 * [memberglut_account tab=""], [memberglut_profile], [memberglut_payments limit=""], [memberglut_member field=""],
 * [memberglut_expiry plan="" format=""], [memberglut_members plan="" limit="" fields=""], [memberglut_count plan="" status=""].
 *
 * Every account form posts back to the page (mg_action + nonce, handled through memberglut_form_action) and
 * redirects to its tab with a flash message. Each self-service option is checked again on the server.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Account class.
 */
class MemberGlut_Account {

	const PENDING_EMAIL_META = 'memberglut_pending_email';
	const DIRECTORY_META     = 'memberglut_directory';

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_filter( 'memberglut_shortcodes', array( __CLASS__, 'shortcodes' ) );
		add_filter( 'memberglut_form_action', array( __CLASS__, 'handle' ), 10, 3 );
		add_action( 'template_redirect', array( __CLASS__, 'handle_links' ), 4 );
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'register_script' ) );
	}

	/**
	 * Shortcodes.
	 *
	 * @param array $map Map.
	 * @return array
	 */
	public static function shortcodes( $map ) {
		return array_merge(
			$map,
			array(
				'memberglut_account'  => array( __CLASS__, 'account' ),
				'memberglut_profile'  => array( __CLASS__, 'profile_shortcode' ),
				'memberglut_payments' => array( __CLASS__, 'payments_shortcode' ),
				'memberglut_member'   => array( __CLASS__, 'member_shortcode' ),
				'memberglut_expiry'   => array( __CLASS__, 'expiry_shortcode' ),
				'memberglut_members'  => array( __CLASS__, 'members_shortcode' ),
				'memberglut_count'    => array( __CLASS__, 'count_shortcode' ),
			)
		);
	}

	/**
	 * Card update script (Stripe), enqueued only when the card form is shown.
	 *
	 * @return void
	 */
	public static function register_script() {
		wp_register_script( 'memberglut-account', MEMBERGLUT_PLUGIN_URL . 'assets/frontend/memberglut-account.js', array( 'memberglut' ), MEMBERGLUT_VERSION, true );
	}

	/* ---------------------------------------------------------------------
	 * Tabs
	 * ------------------------------------------------------------------ */

	/**
	 * Enabled tabs: key => label.
	 *
	 * @param int $user_id User.
	 * @return array
	 */
	public static function tabs( $user_id = 0 ) {
		$all  = array(
			'dashboard'     => __( 'Dashboard', 'memberglut' ),
			'profile'       => __( 'Profile', 'memberglut' ),
			'password'      => __( 'Password', 'memberglut' ),
			'subscriptions' => __( 'Memberships', 'memberglut' ),
			'payments'      => __( 'Payments', 'memberglut' ),
			'activity'      => __( 'Activity', 'memberglut' ),
			'delete'        => __( 'Delete account', 'memberglut' ),
		);
		$tabs = array();
		foreach ( $all as $key => $label ) {
			if ( memberglut_setting( 'tab_' . $key, 'delete' !== $key ) ) {
				$tabs[ $key ] = $label;
			}
		}
		if ( $user_id && user_can( $user_id, 'manage_options' ) ) {
			unset( $tabs['delete'] ); // Never for administrators.
		}
		return apply_filters( 'memberglut_account_tabs', $tabs, $user_id );
	}

	/**
	 * URL of an account tab.
	 *
	 * @param string $tab  Tab.
	 * @param array  $args Extra args.
	 * @return string
	 */
	public static function url( $tab = '', $args = array() ) {
		$base = memberglut_page_url( 'account' );
		if ( ! $base ) {
			$base = is_singular() ? get_permalink() : home_url( '/' );
		}
		return add_query_arg( array_merge( $tab ? array( 'tab' => $tab ) : array(), $args ), $base );
	}

	/**
	 * [memberglut_account tab=""]
	 *
	 * @param array $atts Attributes.
	 * @return string
	 */
	public static function account( $atts = array() ) {
		$atts = shortcode_atts( array( 'tab' => '' ), $atts, 'memberglut_account' );
		if ( ! is_user_logged_in() ) {
			return MemberGlut_Shortcodes::login( array( 'redirect' => self::current_url() ) );
		}
		MemberGlut_Assets::need();
		MemberGlut_Cache::no_cache();
		$user = wp_get_current_user();
		$tabs = self::tabs( $user->ID );
		if ( ! $tabs ) {
			return '';
		}
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Navigation only.
		$tab = isset( $_GET['tab'] ) ? sanitize_key( wp_unslash( $_GET['tab'] ) ) : sanitize_key( $atts['tab'] );
		if ( ! isset( $tabs[ $tab ] ) ) {
			$tab = (string) key( $tabs );
		}
		$content = self::render_tab( $tab, $user );
		return memberglut_get_template(
			'account/account.php',
			array(
				'user'    => $user,
				'tabs'    => $tabs,
				'current' => $tab,
				'notice'  => MemberGlut_Shortcodes::notice( self::result() ),
				'content' => $content,
				'logout'  => wp_logout_url( self::url() ),
				'urls'    => array_combine( array_keys( $tabs ), array_map( array( __CLASS__, 'url' ), array_keys( $tabs ) ) ),
			)
		);
	}

	/**
	 * Current page URL (without the notice cookie args).
	 *
	 * @return string
	 */
	private static function current_url() {
		$uri = isset( $_SERVER['REQUEST_URI'] ) ? esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '/';
		return home_url( $uri );
	}

	/**
	 * Result of a non-redirected post (errors).
	 *
	 * @return WP_Error|array|null
	 */
	private static function result() {
		foreach ( MemberGlut_Auth::$results as $action => $res ) {
			if ( 0 === strpos( $action, 'account_' ) ) {
				return $res;
			}
		}
		return null;
	}

	/**
	 * Field errors of the last post of an action.
	 *
	 * @param string $action Action.
	 * @return array
	 */
	private static function errors( $action ) {
		$res = isset( MemberGlut_Auth::$results[ $action ] ) ? MemberGlut_Auth::$results[ $action ] : null;
		if ( is_wp_error( $res ) ) {
			$d = $res->get_error_data();
			return is_array( $d ) && ! empty( $d['fields'] ) ? $d['fields'] : array();
		}
		return array();
	}

	/**
	 * Put server-side field errors into rendered fields.
	 *
	 * @param string $html   Fields HTML.
	 * @param array  $errors key => message.
	 * @return string
	 */
	public static function with_errors( $html, $errors ) {
		foreach ( $errors as $key => $msg ) {
			$html = preg_replace(
				'/(data-field="' . preg_quote( $key, '/' ) . '".*?<span class="mg-field-error" role="alert">)(<\/span>)/s',
				'$1' . str_replace( array( '\\', '$' ), array( '\\\\', '\\$' ), esc_html( $msg ) ) . '$2',
				$html,
				1
			);
			$html = preg_replace( '/(<div class="mg-field[^"]*)(" data-field="' . preg_quote( $key, '/' ) . '")/', '$1 has-error$2', $html, 1 );
		}
		return $html;
	}

	/**
	 * Render one tab.
	 *
	 * @param string  $tab  Tab.
	 * @param WP_User $user User.
	 * @return string
	 */
	public static function render_tab( $tab, $user ) {
		switch ( $tab ) {
			case 'dashboard':
				return self::tab_dashboard( $user );
			case 'profile':
				return self::tab_profile( $user );
			case 'password':
				return self::tab_password( $user );
			case 'subscriptions':
				return self::tab_subscriptions( $user );
			case 'payments':
				return self::payments_table( $user->ID );
			case 'activity':
				return self::tab_activity( $user );
			case 'delete':
				return self::tab_delete( $user );
		}
		return (string) apply_filters( 'memberglut_account_tab_content', '', $tab, $user );
	}

	/**
	 * Client-ready subscription rows with the actions allowed.
	 *
	 * @param int $user_id User.
	 * @return array[]
	 */
	public static function subscriptions( $user_id ) {
		$out      = array();
		$statuses = MemberGlut_Lookups::statuses();
		foreach ( MemberGlut_Subscription_Service::for_user( $user_id ) as $s ) {
			$plan = MemberGlut_Plans::get( $s['plan_id'] );
			if ( ! $plan ) {
				continue;
			}
			$out[] = array(
				'sub'          => $s,
				'plan'         => $plan,
				'status_label' => isset( $statuses[ $s['status'] ] ) ? $statuses[ $s['status'] ] : $s['status'],
				'access'       => MemberGlut_Subscription_Service::grants_access( $s ),
				'actions'      => self::actions_for( $s, $plan ),
				'scheduled'    => $s['scheduled_plan_id'] ? MemberGlut_Plans::get( $s['scheduled_plan_id'] ) : null,
			);
		}
		return $out;
	}

	/**
	 * Actions a member may take on a subscription.
	 *
	 * @param array $s    Subscription.
	 * @param array $plan Plan.
	 * @return array key => [ label, url? | op? , confirm? ]
	 */
	public static function actions_for( $s, $plan ) {
		$a      = array();
		$access = MemberGlut_Subscription_Service::grants_access( $s );
		if ( memberglut_setting( 'allow_cancel', true ) && in_array( $s['status'], array( 'active', 'trialing', 'on_hold' ), true ) ) {
			$a['cancel'] = array(
				'label'   => __( 'Cancel', 'memberglut' ),
				'op'      => 'cancel',
				'confirm' => 'now' === memberglut_setting( 'cancel_access', 'period_end' ) || ! $s['expires_at']
					? __( 'Cancel this membership? Your access ends now.', 'memberglut' )
					/* translators: %s: date */
					: sprintf( __( 'Cancel this membership? You keep access until %s.', 'memberglut' ), memberglut_format_date( $s['expires_at'] ) ),
			);
		}
		if ( $access && class_exists( 'MemberGlut_Checkout' ) && MemberGlut_Checkout::renewable_sub( $s['user_id'], $plan ) ) {
			$a['renew'] = array( 'label' => __( 'Renew', 'memberglut' ), 'url' => self::checkout_url( $plan ) );
		}
		if ( $access && in_array( $s['status'], array( 'active', 'trialing' ), true ) && memberglut_setting( 'allow_change', true ) ) {
			foreach ( MemberGlut_Plans::all( 'active' ) as $p ) {
				if ( (int) $p['id'] === (int) $plan['id'] || $p['group'] !== $plan['group'] ) {
					continue;
				}
				$up = $p['tier'] > $plan['tier'];
				if ( ( $up && ! $p['allow_upgrade'] ) || ( ! $up && ( ! $p['allow_downgrade'] || ! memberglut_setting( 'allow_downgrade', true ) ) ) ) {
					continue;
				}
				if ( true !== MemberGlut_Plans::can_join( $p, $s['user_id'] ) && 'new' !== $p['who_can_buy'] ) {
					continue;
				}
				$a[ 'change_' . $p['id'] ] = array(
					/* translators: %s: plan name */
					'label' => sprintf( $up ? __( 'Upgrade to %s', 'memberglut' ) : __( 'Switch to %s', 'memberglut' ), $p['name'] ),
					'url'   => self::checkout_url( $p ),
				);
			}
		}
		if ( 'stripe' === $s['gateway'] && $s['gateway_subscription_id'] && $access && 'canceled' !== $s['status'] && memberglut_setting( 'stripe_save_cards', true ) ) {
			$g = MemberGlut_Gateways::get( 'stripe' );
			if ( $g && $g->is_configured() ) {
				$a['card'] = array( 'label' => __( 'Update payment method', 'memberglut' ), 'op' => 'card' );
			}
		}
		if ( memberglut_setting( 'allow_abandon', false ) && in_array( $s['status'], array( 'canceled', 'expired', 'pending', 'on_hold', 'active', 'trialing' ), true ) ) {
			$a['abandon'] = array( 'label' => __( 'Remove', 'memberglut' ), 'op' => 'abandon', 'confirm' => __( 'Remove this membership from your account? This cannot be undone.', 'memberglut' ) );
		}
		return apply_filters( 'memberglut_account_subscription_actions', $a, $s, $plan );
	}

	/**
	 * Checkout (registration page) URL of a plan.
	 *
	 * @param array $plan Plan.
	 * @return string
	 */
	private static function checkout_url( $plan ) {
		$base = memberglut_page_url( 'register' );
		return $base ? add_query_arg( 'plan', $plan['slug'], $base ) : '';
	}

	/**
	 * Dashboard.
	 *
	 * @param WP_User $user User.
	 * @return string
	 */
	private static function tab_dashboard( $user ) {
		$subs = array_filter(
			self::subscriptions( $user->ID ),
			static function ( $r ) {
				return $r['access'] || 'pending' === $r['sub']['status'] || 'on_hold' === $r['sub']['status'];
			}
		);
		return memberglut_get_template(
			'account/dashboard.php',
			array(
				'user'    => $user,
				'subs'    => $subs,
				'tabs'    => self::tabs( $user->ID ),
				'pricing' => memberglut_page_url( 'pricing' ),
			)
		);
	}

	/**
	 * Profile field definitions shown in the profile form (Forms › Profile form).
	 *
	 * @return array[]
	 */
	public static function profile_fields() {
		$out = array();
		foreach ( (array) memberglut_form_setting( 'profile_fields', array() ) as $key ) {
			if ( in_array( $key, array( 'email', 'username', 'password', 'password_confirm' ), true ) ) {
				continue;
			}
			$f = MemberGlut_Fields::get( $key );
			if ( ! $f ) {
				$labels = array( 'first_name' => __( 'First name', 'memberglut' ), 'last_name' => __( 'Last name', 'memberglut' ), 'display_name' => __( 'Display name', 'memberglut' ), 'website' => __( 'Website', 'memberglut' ), 'bio' => __( 'Biographical info', 'memberglut' ) );
				if ( ! isset( $labels[ $key ] ) ) {
					continue;
				}
				$f = array( 'key' => $key, 'label' => $labels[ $key ], 'type' => 'website' === $key ? 'url' : ( 'bio' === $key ? 'textarea' : 'text' ) );
			}
			if ( 'display_name' === $key ) {
				$f['required'] = true;
			}
			$out[] = $f;
		}
		return apply_filters( 'memberglut_profile_fields', $out );
	}

	/**
	 * Profile form.
	 *
	 * @param WP_User $user User.
	 * @return string
	 */
	private static function tab_profile( $user ) {
		$pending = get_user_meta( $user->ID, self::PENDING_EMAIL_META, true );
		$fields  = '';
		foreach ( self::profile_fields() as $f ) {
			$fields .= MemberGlut_Fields::render( $f, MemberGlut_Fields::user_value( $user, $f['key'] ) );
		}
		$fields = self::with_errors( $fields, self::errors( 'account_profile' ) );
		return memberglut_get_template(
			'account/profile.php',
			array(
				'user'      => $user,
				'fields'    => $fields,
				'errors'    => self::errors( 'account_profile' ),
				'pending'   => is_array( $pending ) && ! empty( $pending['email'] ) && $pending['expires'] > time() ? $pending['email'] : '',
				'directory' => (bool) get_user_meta( $user->ID, self::DIRECTORY_META, true ),
				'hidden'    => MemberGlut_Shortcodes::form_hidden( 'account_profile' ),
				'cancel'    => MemberGlut_Shortcodes::form_hidden( 'account_cancel_email' ),
			)
		);
	}

	/**
	 * Password form.
	 *
	 * @param WP_User $user User.
	 * @return string
	 */
	private static function tab_password( $user ) {
		$new = MemberGlut_Fields::render( array( 'key' => 'password', 'label' => __( 'New password', 'memberglut' ), 'type' => 'password', 'required' => true ) );
		$rep = MemberGlut_Fields::render( array( 'key' => 'password_confirm', 'label' => __( 'Repeat the new password', 'memberglut' ), 'type' => 'password', 'required' => true ) );
		return memberglut_get_template(
			'account/password.php',
			array(
				'user'   => $user,
				'fields' => self::with_errors( $new . $rep, self::errors( 'account_password' ) ),
				'errors' => self::errors( 'account_password' ),
				'hidden' => MemberGlut_Shortcodes::form_hidden( 'account_password' ),
			)
		);
	}

	/**
	 * Memberships.
	 *
	 * @param WP_User $user User.
	 * @return string
	 */
	private static function tab_subscriptions( $user ) {
		$card = '';
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Display only; the secret was created by a nonce-checked post.
		$card_sub = isset( $_GET['mg_card'] ) ? absint( $_GET['mg_card'] ) : 0;
		if ( $card_sub ) {
			$secret = get_transient( 'memberglut_card_' . $user->ID . '_' . $card_sub );
			$g      = MemberGlut_Gateways::get( 'stripe' );
			if ( $secret && $g ) {
				wp_enqueue_script( 'memberglut-account' );
				wp_localize_script(
					'memberglut-account',
					'memberglutAccount',
					array(
						'stripeKey' => $g->client_config()['key'] ?? '',
						'secret'    => $secret,
						'returnUrl' => self::url( 'subscriptions', array( 'mg_card_done' => $card_sub ) ),
						'i18n'      => array( 'save' => __( 'Save card', 'memberglut' ), 'saving' => __( 'Saving…', 'memberglut' ), 'error' => __( 'The card could not be saved. Please try again.', 'memberglut' ) ),
					)
				);
				$card = $card_sub;
			}
		}
		return memberglut_get_template(
			'account/subscriptions.php',
			array(
				'user'    => $user,
				'rows'    => self::subscriptions( $user->ID ),
				'card'    => $card,
				'pricing' => memberglut_page_url( 'pricing' ),
				'nonce'   => wp_create_nonce( 'memberglut_account_sub' ),
			)
		);
	}

	/**
	 * Login history.
	 *
	 * @param WP_User $user User.
	 * @return string
	 */
	private static function tab_activity( $user ) {
		$live    = MemberGlut_Security::sessions( $user->ID );
		$current = MemberGlut_Security::verifier( wp_get_session_token() );
		$rows    = array();
		foreach ( memberglut_repo( 'logins' )->query( array( 'where' => array( 'user_id' => $user->ID ), 'orderby' => 'id DESC', 'per_page' => 15 ) ) as $l ) {
			$rows[] = array(
				'date'    => $l['created_at'],
				'last'    => $l['last_seen_at'],
				'ip'      => $l['ip'],
				'device'  => $l['device_label'],
				'active'  => ! $l['ended_at'] && isset( $live[ $l['session_verifier'] ] ),
				'current' => $current && $l['session_verifier'] === $current,
			);
		}
		return memberglut_get_template(
			'account/activity.php',
			array(
				'user'   => $user,
				'rows'   => $rows,
				'others' => max( 0, count( $live ) - ( $current && isset( $live[ $current ] ) ? 1 : 0 ) ),
				'hidden' => MemberGlut_Shortcodes::form_hidden( 'account_logout_others' ),
			)
		);
	}

	/**
	 * Delete account.
	 *
	 * @param WP_User $user User.
	 * @return string
	 */
	private static function tab_delete( $user ) {
		return memberglut_get_template(
			'account/delete.php',
			array(
				'user'   => $user,
				'errors' => self::errors( 'account_delete' ),
				'hidden' => MemberGlut_Shortcodes::form_hidden( 'account_delete' ),
			)
		);
	}

	/**
	 * Payments of a user.
	 *
	 * @param int $user_id User.
	 * @param int $limit   Rows.
	 * @return string
	 */
	public static function payments_table( $user_id, $limit = 50 ) {
		$rows = array();
		foreach ( memberglut_repo( 'payments' )->query( array( 'where' => array( 'user_id' => $user_id, 'status' => array( 'completed', 'pending', 'refunded', 'failed' ) ), 'orderby' => 'id DESC', 'per_page' => max( 1, (int) $limit ) ) ) as $p ) {
			$plan   = $p['plan_id'] ? MemberGlut_Plans::get( $p['plan_id'] ) : null;
			$rows[] = array(
				'payment' => $p,
				'plan'    => $plan ? $plan['name'] : '',
				'receipt' => ! empty( $p['meta']['key'] ) && memberglut_page_url( 'thanks' ) ? add_query_arg( array( 'mg_payment' => $p['id'], 'mg_key' => $p['meta']['key'] ), memberglut_page_url( 'thanks' ) ) : '',
			);
		}
		return memberglut_get_template( 'account/payments.php', array( 'rows' => $rows ) );
	}

	/* ---------------------------------------------------------------------
	 * Actions
	 * ------------------------------------------------------------------ */

	/**
	 * memberglut_form_action handler.
	 *
	 * @param mixed  $res    Result so far.
	 * @param string $action Action.
	 * @param array  $data   Data (unslashed).
	 * @return mixed
	 */
	public static function handle( $res, $action, $data ) {
		if ( 0 !== strpos( $action, 'account_' ) ) {
			return $res;
		}
		if ( ! is_user_logged_in() ) {
			return new WP_Error( 'memberglut_login', __( 'Please log in again.', 'memberglut' ) );
		}
		$user = wp_get_current_user();
		switch ( $action ) {
			case 'account_profile':
				return self::save_profile( $user, $data );
			case 'account_cancel_email':
				delete_user_meta( $user->ID, self::PENDING_EMAIL_META );
				return self::done( 'profile', __( 'The email change was canceled.', 'memberglut' ) );
			case 'account_password':
				return self::change_password( $user, $data );
			case 'account_sub':
				return self::subscription_action( $user, $data );
			case 'account_logout_others':
				if ( ! memberglut_setting( 'tab_activity', true ) ) {
					return self::disabled();
				}
				MemberGlut_Security::end_all_sessions( $user->ID, true );
				memberglut_event( 'logout_all', __( 'Logged out of other devices', 'memberglut' ), array( 'user_id' => $user->ID, 'object_type' => 'user', 'object_id' => $user->ID ) );
				return self::done( 'activity', __( 'You were logged out of your other devices.', 'memberglut' ) );
			case 'account_delete':
				return self::delete_account( $user, $data );
		}
		return $res;
	}

	/**
	 * Success: flash + back to the tab.
	 *
	 * @param string $tab  Tab.
	 * @param string $text Message.
	 * @return array
	 */
	private static function done( $tab, $text ) {
		memberglut_flash( 'success', $text );
		return array( 'redirect' => self::url( $tab ), 'message' => $text );
	}

	/**
	 * Option switched off.
	 *
	 * @return WP_Error
	 */
	private static function disabled() {
		return new WP_Error( 'memberglut_disabled', __( 'This option is not available.', 'memberglut' ), array( 'status' => 403 ) );
	}

	/**
	 * Save the profile (and start an email change).
	 *
	 * @param WP_User $user User.
	 * @param array   $data Data.
	 * @return array|WP_Error
	 */
	public static function save_profile( $user, $data ) {
		if ( ! memberglut_setting( 'tab_profile', true ) && ! has_shortcode( (string) get_post_field( 'post_content', get_queried_object_id() ), 'memberglut_profile' ) ) {
			return self::disabled();
		}
		$input                    = isset( $data['mg'] ) && is_array( $data['mg'] ) ? $data['mg'] : array();
		list( $clean, $errors )   = MemberGlut_Fields::validate( self::profile_fields(), $input, $user->ID );
		$email                    = isset( $input['email'] ) ? sanitize_email( (string) $input['email'] ) : $user->user_email;
		$email_changed            = strtolower( $email ) !== strtolower( $user->user_email );
		if ( $email_changed ) {
			if ( ! is_email( $email ) ) {
				$errors['email'] = __( 'Enter a valid email address.', 'memberglut' );
			} elseif ( email_exists( $email ) ) {
				$errors['email'] = __( 'Another account already uses this email address.', 'memberglut' );
			} elseif ( ! MemberGlut_Auth::email_allowed( $email ) ) {
				$errors['email'] = __( 'This email address is not allowed.', 'memberglut' );
			}
		}
		$errors = apply_filters( 'memberglut_profile_validate', $errors, $clean, $user );
		if ( $errors ) {
			return new WP_Error( 'memberglut_invalid', __( 'Please check the highlighted fields.', 'memberglut' ), array( 'status' => 400, 'fields' => $errors ) );
		}
		MemberGlut_Fields::save( $user->ID, $clean );
		update_user_meta( $user->ID, self::DIRECTORY_META, ! empty( $data['directory'] ) ? 1 : 0 );
		$message = __( 'Your profile was saved.', 'memberglut' );
		if ( $email_changed ) {
			if ( memberglut_form_setting( 'profile_email_confirm', true ) ) {
				$key = wp_generate_password( 32, false );
				update_user_meta( $user->ID, self::PENDING_EMAIL_META, array( 'email' => $email, 'hash' => wp_hash_password( $key ), 'expires' => time() + 2 * DAY_IN_SECONDS ) );
				MemberGlut_Mailer::send( 'email_change', $email, array( 'user' => $user, 'confirm_link' => self::url( 'profile', array( 'mg_confirm_email' => $key, 'mg_u' => $user->ID ) ) ), null, true );
				/* translators: %s: new email */
				$message = sprintf( __( 'Your profile was saved. We sent a confirmation link to %s — your email changes once you click it.', 'memberglut' ), $email );
			} else {
				wp_update_user( array( 'ID' => $user->ID, 'user_email' => $email ) );
			}
		}
		do_action( 'memberglut_profile_updated', $user->ID, $clean );
		return self::done( 'profile', $message );
	}

	/**
	 * Change the password.
	 *
	 * @param WP_User $user User.
	 * @param array   $data Data.
	 * @return array|WP_Error
	 */
	public static function change_password( $user, $data ) {
		if ( ! memberglut_setting( 'tab_password', true ) ) {
			return self::disabled();
		}
		$input   = isset( $data['mg'] ) && is_array( $data['mg'] ) ? $data['mg'] : array();
		$current = isset( $data['current_password'] ) ? (string) $data['current_password'] : '';
		$new     = isset( $input['password'] ) ? (string) $input['password'] : '';
		$repeat  = isset( $input['password_confirm'] ) ? (string) $input['password_confirm'] : '';
		$errors  = array();
		if ( ! wp_check_password( $current, $user->user_pass, $user->ID ) ) {
			$errors['current_password'] = __( 'Your current password is not correct.', 'memberglut' );
		}
		$check = MemberGlut_Fields::check_password( $new );
		if ( true !== $check ) {
			$errors['password'] = $check;
		} elseif ( $new !== $repeat ) {
			$errors['password_confirm'] = __( 'The passwords do not match.', 'memberglut' );
		}
		if ( $errors ) {
			return new WP_Error( 'memberglut_invalid', __( 'Please check the highlighted fields.', 'memberglut' ), array( 'status' => 400, 'fields' => $errors ) );
		}
		add_filter( 'send_password_change_email', '__return_false' );
		wp_update_user( array( 'ID' => $user->ID, 'user_pass' => $new ) );
		remove_filter( 'send_password_change_email', '__return_false' );
		MemberGlut_Security::end_all_sessions( $user->ID, true );
		MemberGlut_Mailer::send( 'password_changed', null, array( 'user_id' => $user->ID ) );
		memberglut_event( 'password_changed', __( 'Password changed by the member', 'memberglut' ), array( 'user_id' => $user->ID, 'object_type' => 'user', 'object_id' => $user->ID ) );
		return self::done( 'password', __( 'Your password was changed. Other devices were logged out.', 'memberglut' ) );
	}

	/**
	 * Cancel / remove / update card.
	 *
	 * @param WP_User $user User.
	 * @param array   $data Data: op, sub.
	 * @return array|WP_Error
	 */
	public static function subscription_action( $user, $data ) {
		$op  = isset( $data['op'] ) ? sanitize_key( $data['op'] ) : '';
		$sub = MemberGlut_Subscription_Service::get( isset( $data['sub'] ) ? absint( $data['sub'] ) : 0 );
		if ( ! $sub || (int) $sub['user_id'] !== (int) $user->ID ) {
			return new WP_Error( 'memberglut_not_found', __( 'Membership not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		$plan    = MemberGlut_Plans::get( $sub['plan_id'] );
		$allowed = $plan ? self::actions_for( $sub, $plan ) : array();
		if ( ! isset( $allowed[ $op ] ) || ! memberglut_setting( 'tab_subscriptions', true ) ) {
			return self::disabled();
		}
		switch ( $op ) {
			case 'cancel':
				$r = MemberGlut_Subscription_Service::cancel( $sub['id'], false, true );
				if ( is_wp_error( $r ) ) {
					return $r;
				}
				return self::done(
					'subscriptions',
					'canceled' === $r['status'] && $r['expires_at']
						/* translators: %s: date */
						? sprintf( __( 'Your membership was canceled. You keep access until %s.', 'memberglut' ), memberglut_format_date( $r['expires_at'] ) )
						: __( 'Your membership was canceled.', 'memberglut' )
				);
			case 'abandon':
				$r = MemberGlut_Subscription_Service::abandon( $sub['id'] );
				return is_wp_error( $r ) ? $r : self::done( 'subscriptions', __( 'The membership was removed from your account.', 'memberglut' ) );
			case 'card':
				$g = MemberGlut_Gateways::get( 'stripe' );
				$r = $g ? $g->start_card_update( $sub ) : new WP_Error( 'memberglut_gateway', __( 'Card payments are not available.', 'memberglut' ) );
				if ( is_wp_error( $r ) ) {
					return $r;
				}
				set_transient( 'memberglut_card_' . $user->ID . '_' . $sub['id'], $r['secret'], HOUR_IN_SECONDS );
				return array( 'redirect' => self::url( 'subscriptions', array( 'mg_card' => $sub['id'] ) ) . '#mg-card' );
		}
		return self::disabled();
	}

	/**
	 * Delete the account.
	 *
	 * @param WP_User $user User.
	 * @param array   $data Data.
	 * @return array|WP_Error
	 */
	public static function delete_account( $user, $data ) {
		if ( ! isset( self::tabs( $user->ID )['delete'] ) ) {
			return self::disabled();
		}
		$errors = array();
		if ( ! wp_check_password( isset( $data['password'] ) ? (string) $data['password'] : '', $user->user_pass, $user->ID ) ) {
			$errors['password'] = __( 'Your password is not correct.', 'memberglut' );
		}
		if ( empty( $data['confirm'] ) ) {
			$errors['confirm'] = __( 'Please confirm that you want to delete your account.', 'memberglut' );
		}
		if ( $errors ) {
			return new WP_Error( 'memberglut_invalid', __( 'Please check the highlighted fields.', 'memberglut' ), array( 'status' => 400, 'fields' => $errors ) );
		}
		$email = $user->user_email;
		MemberGlut_Mailer::send( 'account_deleted', $email, array( 'user' => $user ) );
		do_action( 'memberglut_before_account_delete', $user->ID );
		// Ends gateway subscriptions and removes memberships (MemberGlut_Subscription_Service::on_delete_user).
		require_once ABSPATH . 'wp-admin/includes/user.php';
		wp_logout();
		wp_delete_user( $user->ID );
		// Payments follow the GDPR eraser setting (anonymised or deleted).
		if ( class_exists( 'MemberGlut_Privacy' ) ) {
			MemberGlut_Privacy::erase( $email );
		}
		memberglut_log( 'info', 'member', sprintf( 'Member #%d deleted their account', $user->ID ) );
		memberglut_flash( 'success', __( 'Your account was deleted.', 'memberglut' ) );
		return array( 'redirect' => home_url( '/' ) );
	}

	/**
	 * Links: email change confirmation, return from the card form.
	 *
	 * @return void
	 */
	public static function handle_links() {
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- Authorized by the emailed key / Stripe's SetupIntent check.
		if ( isset( $_GET['mg_confirm_email'], $_GET['mg_u'] ) ) {
			$uid     = absint( $_GET['mg_u'] );
			$key     = sanitize_text_field( wp_unslash( $_GET['mg_confirm_email'] ) );
			$pending = get_user_meta( $uid, self::PENDING_EMAIL_META, true );
			if ( ! is_array( $pending ) || empty( $pending['hash'] ) || $pending['expires'] < time() || ! wp_check_password( $key, $pending['hash'] ) ) {
				memberglut_flash( 'error', __( 'This confirmation link is not valid or has expired.', 'memberglut' ) );
			} elseif ( email_exists( $pending['email'] ) ) {
				delete_user_meta( $uid, self::PENDING_EMAIL_META );
				memberglut_flash( 'error', __( 'Another account already uses this email address.', 'memberglut' ) );
			} else {
				wp_update_user( array( 'ID' => $uid, 'user_email' => $pending['email'] ) );
				delete_user_meta( $uid, self::PENDING_EMAIL_META );
				memberglut_event( 'email_changed', __( 'Email address changed by the member', 'memberglut' ), array( 'user_id' => $uid, 'object_type' => 'user', 'object_id' => $uid ) );
				memberglut_flash( 'success', __( 'Your new email address is confirmed.', 'memberglut' ) );
			}
			wp_safe_redirect( remove_query_arg( array( 'mg_confirm_email', 'mg_u' ) ) );
			exit;
		}
		if ( isset( $_GET['mg_card_done'], $_GET['setup_intent'] ) && is_user_logged_in() ) {
			$sub = MemberGlut_Subscription_Service::get( absint( $_GET['mg_card_done'] ) );
			$g   = MemberGlut_Gateways::get( 'stripe' );
			if ( $sub && (int) $sub['user_id'] === get_current_user_id() && $g ) {
				$r = $g->finish_card_update( $sub, sanitize_text_field( wp_unslash( $_GET['setup_intent'] ) ) );
				delete_transient( 'memberglut_card_' . $sub['user_id'] . '_' . $sub['id'] );
				memberglut_flash( is_wp_error( $r ) ? 'error' : 'success', is_wp_error( $r ) ? $r->get_error_message() : __( 'Your payment method was updated.', 'memberglut' ) );
			}
			wp_safe_redirect( remove_query_arg( array( 'mg_card_done', 'setup_intent', 'setup_intent_client_secret', 'redirect_status' ) ) );
			exit;
		}
		// phpcs:enable
	}

	/* ---------------------------------------------------------------------
	 * Shortcodes
	 * ------------------------------------------------------------------ */

	/**
	 * [memberglut_profile]
	 *
	 * @return string
	 */
	public static function profile_shortcode() {
		if ( ! is_user_logged_in() ) {
			return MemberGlut_Shortcodes::login( array( 'redirect' => self::current_url() ) );
		}
		MemberGlut_Assets::need();
		MemberGlut_Cache::no_cache();
		return '<div class="mg-account mg-account-standalone">' . MemberGlut_Shortcodes::notice( isset( MemberGlut_Auth::$results['account_profile'] ) ? MemberGlut_Auth::$results['account_profile'] : null ) . self::tab_profile( wp_get_current_user() ) . '</div>';
	}

	/**
	 * [memberglut_payments limit=""]
	 *
	 * @param array $atts Attributes.
	 * @return string
	 */
	public static function payments_shortcode( $atts = array() ) {
		$atts = shortcode_atts( array( 'limit' => 50 ), $atts, 'memberglut_payments' );
		if ( ! is_user_logged_in() ) {
			return '';
		}
		MemberGlut_Assets::need();
		MemberGlut_Cache::no_cache();
		return '<div class="mg-account mg-account-standalone">' . self::payments_table( get_current_user_id(), (int) $atts['limit'] ) . '</div>';
	}

	/**
	 * [memberglut_member field=""] — a value of the current member: core or custom field, plan, plans, expiry, status.
	 *
	 * @param array $atts Attributes.
	 * @return string
	 */
	public static function member_shortcode( $atts = array() ) {
		$atts = shortcode_atts( array( 'field' => 'display_name', 'default' => '' ), $atts, 'memberglut_member' );
		$user = wp_get_current_user();
		if ( ! $user->exists() ) {
			return esc_html( $atts['default'] );
		}
		$field = sanitize_key( $atts['field'] );
		$subs  = MemberGlut_Subscription_Service::access_subscriptions( $user->ID );
		switch ( $field ) {
			case 'plan':
			case 'plans':
				$names = array_filter(
					array_map(
						static function ( $s ) {
							$p = MemberGlut_Plans::get( $s['plan_id'] );
							return $p ? $p['name'] : '';
						},
						$subs
					)
				);
				$value = 'plan' === $field ? (string) reset( $names ) : implode( ', ', $names );
				break;
			case 'expiry':
			case 'expires':
				$first = reset( $subs );
				$value = $first ? ( $first['expires_at'] ? memberglut_format_date( $first['expires_at'] ) : __( 'Never', 'memberglut' ) ) : '';
				break;
			case 'status':
				$first    = reset( $subs );
				$statuses = MemberGlut_Lookups::statuses();
				$value    = $first ? $statuses[ $first['status'] ] : '';
				break;
			case 'email':
				$value = $user->user_email;
				break;
			case 'username':
				$value = $user->user_login;
				break;
			case 'id':
				$value = (string) $user->ID;
				break;
			default:
				$value = MemberGlut_Fields::user_value( $user, $field );
				if ( null === $value || '' === $value ) {
					$value = in_array( $field, array( 'display_name', 'first_name', 'last_name', 'user_url', 'description' ), true ) ? $user->{$field} : '';
				}
				if ( is_array( $value ) ) {
					$value = implode( ', ', $value );
				}
		}
		$value = apply_filters( 'memberglut_member_field', (string) $value, $field, $user );
		return esc_html( '' !== $value ? $value : $atts['default'] );
	}

	/**
	 * [memberglut_expiry plan="" format=""]
	 *
	 * @param array $atts Attributes.
	 * @return string
	 */
	public static function expiry_shortcode( $atts = array() ) {
		$atts = shortcode_atts( array( 'plan' => '', 'format' => '', 'never' => __( 'Never', 'memberglut' ), 'none' => '' ), $atts, 'memberglut_expiry' );
		$uid  = get_current_user_id();
		if ( ! $uid ) {
			return esc_html( $atts['none'] );
		}
		$ids = MemberGlut_Shortcodes::plan_ids( $atts['plan'] );
		foreach ( MemberGlut_Subscription_Service::access_subscriptions( $uid ) as $s ) {
			if ( ! $ids || in_array( (int) $s['plan_id'], $ids, true ) ) {
				return esc_html( $s['expires_at'] ? memberglut_format_date( $s['expires_at'], sanitize_text_field( $atts['format'] ) ) : $atts['never'] );
			}
		}
		return esc_html( $atts['none'] );
	}

	/**
	 * [memberglut_members plan="" limit="12" fields="avatar,name"] — members who chose to be listed (profile option).
	 *
	 * @param array $atts Attributes.
	 * @return string
	 */
	public static function members_shortcode( $atts = array() ) {
		global $wpdb;
		$atts   = shortcode_atts( array( 'plan' => '', 'limit' => 12, 'fields' => 'avatar,name' ), $atts, 'memberglut_members' );
		$ids    = MemberGlut_Shortcodes::plan_ids( $atts['plan'] );
		$fields = array_intersect( array_map( 'trim', explode( ',', strtolower( $atts['fields'] ) ) ), array( 'avatar', 'name', 'plan', 'since' ) );
		$table  = memberglut_repo( 'subscriptions' )->table();
		$plans  = $ids ? ' AND s.plan_id IN (' . implode( ',', array_map( 'intval', $ids ) ) . ')' : '';
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Plugin table; plan IDs are integers, values prepared.
		$rows = $wpdb->get_results( $wpdb->prepare( "SELECT s.user_id, MIN(s.start_date) AS since, MIN(s.plan_id) AS plan_id FROM `{$table}` s INNER JOIN {$wpdb->usermeta} m ON m.user_id = s.user_id AND m.meta_key = %s AND m.meta_value = '1' WHERE s.status IN ('active','trialing','canceled') AND (s.expires_at IS NULL OR s.expires_at > %s){$plans} GROUP BY s.user_id ORDER BY since DESC LIMIT %d", self::DIRECTORY_META, memberglut_now(), max( 1, min( 100, (int) $atts['limit'] ) ) ), ARRAY_A );
		if ( ! $rows ) {
			return '<p class="mg-members-empty">' . esc_html__( 'No members to show yet.', 'memberglut' ) . '</p>';
		}
		$html = '<ul class="mg-members">';
		foreach ( $rows as $r ) {
			$u = get_userdata( $r['user_id'] );
			if ( ! $u ) {
				continue;
			}
			$html .= '<li class="mg-member">';
			if ( in_array( 'avatar', $fields, true ) ) {
				$html .= get_avatar( $u->ID, 64, '', '', array( 'class' => 'mg-member-avatar' ) );
			}
			if ( in_array( 'name', $fields, true ) ) {
				$html .= '<span class="mg-member-name">' . esc_html( $u->display_name ) . '</span>';
			}
			if ( in_array( 'plan', $fields, true ) ) {
				$p     = MemberGlut_Plans::get( $r['plan_id'] );
				$html .= $p ? '<span class="mg-member-plan">' . esc_html( $p['name'] ) . '</span>' : '';
			}
			if ( in_array( 'since', $fields, true ) && $r['since'] ) {
				/* translators: %s: date */
				$html .= '<span class="mg-member-since">' . esc_html( sprintf( __( 'Member since %s', 'memberglut' ), memberglut_format_date( $r['since'], 'M Y' ) ) ) . '</span>';
			}
			$html .= '</li>';
		}
		return $html . '</ul>';
	}

	/**
	 * [memberglut_count plan="" status="active"]
	 *
	 * @param array $atts Attributes.
	 * @return string
	 */
	public static function count_shortcode( $atts = array() ) {
		$atts   = shortcode_atts( array( 'plan' => '', 'status' => 'active' ), $atts, 'memberglut_count' );
		$status = array_intersect( array_map( 'trim', explode( ',', $atts['status'] ) ), array( 'active', 'trialing', 'pending', 'on_hold', 'canceled', 'expired' ) );
		$where  = array( 'status' => $status ? array_values( $status ) : array( 'active' ) );
		$ids    = MemberGlut_Shortcodes::plan_ids( $atts['plan'] );
		if ( $ids ) {
			$where['plan_id'] = $ids;
		}
		$key   = 'memberglut_count_' . md5( wp_json_encode( $where ) );
		$count = get_transient( $key );
		if ( false === $count ) {
			global $wpdb;
			$repo  = memberglut_repo( 'subscriptions' );
			$table = $repo->table();
			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Plugin table; where built by the repository.
			$count = (int) $wpdb->get_var( "SELECT COUNT(DISTINCT user_id) FROM `{$table}` WHERE " . $repo->build_where( $where ) );
			set_transient( $key, $count, 10 * MINUTE_IN_SECONDS );
		}
		return esc_html( number_format_i18n( (int) $count ) );
	}
}
