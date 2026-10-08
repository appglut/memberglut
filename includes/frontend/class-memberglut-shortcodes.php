<?php
/**
 * Shortcodes (plans/appendix-d-shortcodes-blocks.md). Each one is also available as a block.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Shortcodes class.
 */
class MemberGlut_Shortcodes {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'register_all' ) );
	}

	/**
	 * Shortcode tag => callback.
	 *
	 * @return array
	 */
	public static function map() {
		return apply_filters(
			'memberglut_shortcodes',
			array(
				'memberglut_restrict'   => array( __CLASS__, 'restrict' ),
				'memberglut_logged_in'  => array( __CLASS__, 'logged_in' ),
				'memberglut_logged_out' => array( __CLASS__, 'logged_out' ),
				'memberglut_content'    => array( __CLASS__, 'legacy_content' ),
				'memberglut_register'   => array( __CLASS__, 'register' ),
				'memberglut_login'      => array( __CLASS__, 'login' ),
				'memberglut_lost_password' => array( __CLASS__, 'lost_password' ),
				'memberglut_plans'      => array( __CLASS__, 'plans' ),
				'memberglut_buy'        => array( __CLASS__, 'buy' ),
				'memberglut_login_form'    => array( __CLASS__, 'login' ),
				'memberglut_register_form' => array( __CLASS__, 'register' ),
			)
		);
	}

	/**
	 * Register all shortcodes.
	 *
	 * @return void
	 */
	public static function register_all() {
		foreach ( self::map() as $tag => $cb ) {
			add_shortcode( $tag, $cb );
		}
	}

	/**
	 * Plan IDs from a comma list of IDs or slugs.
	 *
	 * @param string $list List.
	 * @return int[]
	 */
	public static function plan_ids( $list ) {
		$ids = array();
		foreach ( array_filter( array_map( 'trim', explode( ',', (string) $list ) ) ) as $v ) {
			$p = MemberGlut_Plans::get( is_numeric( $v ) ? (int) $v : sanitize_title( $v ) );
			if ( $p ) {
				$ids[] = (int) $p['id'];
			}
		}
		return $ids;
	}

	/**
	 * [memberglut_restrict plans="2,gold" roles="editor" not="silver" logged_in="1" message="…"]…[/memberglut_restrict]
	 *
	 * Shows the content to members of the plans OR users with the roles (and, with logged_in="1", to anyone logged in;
	 * logged_in="0" means only visitors). not="" hides it from members of those plans.
	 *
	 * @param array  $atts    Attributes.
	 * @param string $content Content.
	 * @return string
	 */
	public static function restrict( $atts, $content = '' ) {
		$a       = shortcode_atts( array( 'plans' => '', 'roles' => '', 'not' => '', 'logged_in' => '', 'message' => '', 'show_message' => '1' ), $atts, 'memberglut_restrict' );
		$user_id = get_current_user_id();
		$plans   = self::plan_ids( $a['plans'] );
		$roles   = array_filter( array_map( 'sanitize_key', array_map( 'trim', explode( ',', $a['roles'] ) ) ) );
		$not     = self::plan_ids( $a['not'] );
		$allowed = false;

		if ( memberglut_user_bypasses_restrictions( $user_id ) && '0' !== $a['logged_in'] ) {
			$allowed = true;
		} elseif ( '0' === $a['logged_in'] ) {
			$allowed = ! $user_id;
		} elseif ( ! $plans && ! $roles ) {
			$allowed = $user_id > 0; // Nothing listed: any logged-in user.
		} else {
			$allowed = ( $plans && MemberGlut_Access::user_passes( array( 'who' => 'plans', 'plans' => $plans ), $user_id ) )
				|| ( $roles && MemberGlut_Access::user_passes( array( 'who' => 'roles', 'roles' => $roles ), $user_id ) )
				|| ( '1' === $a['logged_in'] && $user_id );
		}
		if ( $allowed && $not && $user_id && array_intersect( $not, MemberGlut_Subscription_Service::active_plan_ids( $user_id ) ) && ! memberglut_user_bypasses_restrictions( $user_id ) ) {
			$allowed = false;
		}
		if ( $allowed ) {
			MemberGlut_Cache::no_cache();
			return do_shortcode( $content );
		}
		MemberGlut_Cache::no_cache();
		if ( '0' === $a['show_message'] ) {
			return '';
		}
		MemberGlut_Assets::need( false );
		$message = $a['message'] ? '<p>' . esc_html( $a['message'] ) . '</p>' : ( $user_id ? memberglut_setting( 'msg_logged_in' ) : memberglut_setting( 'msg_logged_out' ) );
		$html    = MemberGlut_Access::message_html( $message, array( 'plans' => $plans ), get_post() );
		return '<div class="memberglut-restrict-fallback">' . $html . '</div>';
	}

	/**
	 * [memberglut_logged_in]…[/memberglut_logged_in]
	 *
	 * @param array  $atts    Attributes.
	 * @param string $content Content.
	 * @return string
	 */
	public static function logged_in( $atts, $content = '' ) {
		MemberGlut_Cache::no_cache();
		return is_user_logged_in() ? do_shortcode( $content ) : '';
	}

	/**
	 * [memberglut_logged_out]…[/memberglut_logged_out]
	 *
	 * @param array  $atts    Attributes.
	 * @param string $content Content.
	 * @return string
	 */
	public static function logged_out( $atts, $content = '' ) {
		MemberGlut_Cache::no_cache();
		return is_user_logged_in() ? '' : do_shortcode( $content );
	}

	/**
	 * 1.x [memberglut_content roles="…" message="…"].
	 *
	 * @param array  $atts    Attributes.
	 * @param string $content Content.
	 * @return string
	 */
	public static function legacy_content( $atts, $content = '' ) {
		$a = shortcode_atts( array( 'roles' => '', 'message' => '' ), $atts, 'memberglut_content' );
		if ( '' === $a['roles'] ) {
			return do_shortcode( $content );
		}
		$roles = array();
		foreach ( array_map( 'trim', explode( ',', $a['roles'] ) ) as $r ) {
			$roles[] = get_role( $r ) ? $r : ( get_role( 'memberglut_' . $r ) ? 'memberglut_' . $r : $r );
		}
		return self::restrict( array( 'roles' => implode( ',', $roles ), 'message' => $a['message'] ), $content );
	}

	/* ---------------------------------------------------------------------
	 * Forms
	 * ------------------------------------------------------------------ */

	/**
	 * Hidden fields every MemberGlut form posts (nonce, action, redirect).
	 *
	 * @param string $action   Action.
	 * @param string $redirect redirect_to.
	 * @return string
	 */
	public static function form_hidden( $action, $redirect = '' ) {
		$html  = '<input type="hidden" name="mg_action" value="' . esc_attr( $action ) . '">';
		$html .= '<input type="hidden" name="_mgnonce" value="' . esc_attr( wp_create_nonce( 'memberglut_' . $action ) ) . '">';
		if ( $redirect ) {
			$html .= '<input type="hidden" name="redirect_to" value="' . esc_attr( $redirect ) . '">';
		}
		return $html;
	}

	/**
	 * Requested redirect_to (sanitized).
	 *
	 * @param string $fallback Fallback.
	 * @return string
	 */
	public static function requested_redirect( $fallback = '' ) {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only.
		$r = isset( $_REQUEST['redirect_to'] ) ? esc_url_raw( wp_unslash( $_REQUEST['redirect_to'] ) ) : '';
		return $r ? $r : $fallback;
	}

	/**
	 * Flash / result notice HTML.
	 *
	 * @param WP_Error|array|null $result Result.
	 * @return string
	 */
	public static function notice( $result = null ) {
		$html  = '';
		$flash = memberglut_get_flash();
		if ( $flash ) {
			$html .= '<div class="mg-notice mg-notice-' . esc_attr( $flash['type'] ) . '" role="status">' . wp_kses( $flash['text'], array( 'a' => array( 'href' => true ) ) ) . '</div>';
		}
		if ( is_wp_error( $result ) ) {
			$html .= '<div class="mg-notice mg-notice-error" role="alert">' . wp_kses( $result->get_error_message(), array( 'a' => array( 'href' => true ) ) ) . '</div>';
		} elseif ( is_array( $result ) && ! empty( $result['message'] ) ) {
			$html .= '<div class="mg-notice mg-notice-success" role="status">' . esc_html( $result['message'] ) . '</div>';
		}
		return '<div class="mg-notices">' . $html . '</div>';
	}

	/**
	 * Field errors of a non-JS result.
	 *
	 * @param WP_Error|array|null $result Result.
	 * @return array
	 */
	private static function field_errors( $result ) {
		if ( is_wp_error( $result ) ) {
			$data = $result->get_error_data();
			return is_array( $data ) && ! empty( $data['fields'] ) ? $data['fields'] : array();
		}
		return array();
	}

	/**
	 * [memberglut_register plan="gold" redirect=""] — registration, plan choice and checkout.
	 *
	 * @param array $atts Attributes.
	 * @return string
	 */
	public static function register( $atts = array() ) {
		$a = shortcode_atts( array( 'plan' => '', 'redirect' => '' ), $atts, 'memberglut_register' );
		MemberGlut_Assets::need();
		MemberGlut_Cache::no_cache();
		$user_id = get_current_user_id();
		$result  = isset( MemberGlut_Auth::$results['register'] ) ? MemberGlut_Auth::$results['register'] : null;
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only plan preselection.
		$wanted = $a['plan'] ? $a['plan'] : ( isset( $_GET['plan'] ) ? sanitize_title( wp_unslash( $_GET['plan'] ) ) : '' );
		$plan   = $wanted ? MemberGlut_Plans::get( is_numeric( $wanted ) ? (int) $wanted : $wanted ) : null;

		if ( ! $user_id && ! memberglut_setting( 'allow_registration', true ) ) {
			return self::notice() . '<div class="mg-form-wrap"><p>' . esc_html__( 'Registration is closed at the moment.', 'memberglut' ) . '</p>' . self::login_link() . '</div>';
		}
		$plans = MemberGlut_Auth::pickable_plans( $user_id );
		if ( $user_id ) {
			$plans = array_values( array_filter( $plans, static function ( $p ) use ( $user_id ) {
				return ! MemberGlut_Subscription_Service::user_has_plan( $user_id, $p['id'] );
			} ) );
		}
		$plan_error = '';
		if ( $plan ) {
			$can = MemberGlut_Plans::can_join( $plan, $user_id );
			if ( is_wp_error( $can ) ) {
				$plan_error = $can->get_error_message();
				$plan       = null;
			} elseif ( $user_id && MemberGlut_Subscription_Service::user_has_plan( $user_id, $plan['id'] ) ) {
				$plan_error = __( 'You already have this plan.', 'memberglut' );
				$plan       = null;
			}
		}
		if ( $user_id && ! $plan && ! $plans ) {
			$account = memberglut_page_url( 'account' );
			return self::notice() . '<div class="mg-form-wrap"><p>' . esc_html( sprintf( /* translators: %s: name */ __( 'You are logged in as %s.', 'memberglut' ), wp_get_current_user()->display_name ) ) . '</p>' . ( $account ? '<p><a class="mg-button" href="' . esc_url( $account ) . '">' . esc_html__( 'Go to my account', 'memberglut' ) . '</a></p>' : '' ) . '</div>';
		}
		$posted = is_wp_error( $result ) && isset( $_POST['mg'] ) ? (array) wp_unslash( $_POST['mg'] ) : array(); // phpcs:ignore WordPress.Security.NonceVerification.Missing,WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Re-displaying the submitted values, escaped on output.
		unset( $posted['password'], $posted['password_confirm'] );
		$checkout = class_exists( 'MemberGlut_Checkout' ) ? MemberGlut_Checkout::render_section( $plan ? array( $plan ) : $plans, $user_id ) : '';
		return memberglut_get_template(
			'forms/register.php',
			array(
				'user_id'     => $user_id,
				'fields'      => $user_id ? array() : MemberGlut_Fields::registration_fields(),
				'values'      => $posted,
				'errors'      => self::field_errors( $result ),
				'notice'      => self::notice( $result ),
				'plan'        => $plan,
				'plans'       => $plan ? array() : $plans,
				'plan_error'  => $plan_error,
				'picker'      => memberglut_form_setting( 'plan_picker', 'cards' ),
				'title'       => $user_id ? __( 'Choose your plan', 'memberglut' ) : memberglut_form_setting( 'reg_title', '' ),
				'button'      => memberglut_form_setting( 'reg_button', __( 'Join now', 'memberglut' ) ),
				'login_link'  => ! $user_id && memberglut_form_setting( 'reg_show_login_link', true ) ? self::login_link( __( 'Already a member?', 'memberglut' ) ) : '',
				'agreements'  => ( $user_id ? '' : MemberGlut_Agreements::render( 'register' ) ),
				'checkout'    => $checkout,
				'guard'       => MemberGlut_Form_Guard::render( 'register' ),
				'hidden'      => self::form_hidden( 'register', self::requested_redirect( $a['redirect'] ) ),
				'ajax'        => (bool) memberglut_form_setting( 'reg_ajax', true ),
				'selected'    => is_wp_error( $result ) && isset( $_POST['plan'] ) ? sanitize_text_field( wp_unslash( $_POST['plan'] ) ) : ( $plan ? $plan['id'] : '' ), // phpcs:ignore WordPress.Security.NonceVerification.Missing
			)
		);
	}

	/**
	 * “Already a member? Log in” link.
	 *
	 * @param string $lead Text before the link.
	 * @return string
	 */
	private static function login_link( $lead = '' ) {
		$url = memberglut_page_url( 'login' ) ? memberglut_page_url( 'login' ) : wp_login_url();
		$r   = self::requested_redirect();
		if ( $r ) {
			$url = add_query_arg( 'redirect_to', rawurlencode( $r ), $url );
		}
		return '<p class="mg-switch">' . esc_html( $lead ) . ' <a href="' . esc_url( $url ) . '">' . esc_html__( 'Log in', 'memberglut' ) . '</a></p>';
	}

	/**
	 * [memberglut_login redirect="" title=""] — login form.
	 *
	 * @param array $atts Attributes.
	 * @return string
	 */
	public static function login( $atts = array() ) {
		$a = shortcode_atts( array( 'redirect' => '', 'title' => null ), $atts, 'memberglut_login' );
		MemberGlut_Assets::need();
		MemberGlut_Cache::no_cache();
		if ( is_user_logged_in() ) {
			$user = wp_get_current_user();
			return '<div class="mg-form-wrap mg-logged-in"><p>' . esc_html( sprintf( /* translators: %s: name */ __( 'You are logged in as %s.', 'memberglut' ), $user->display_name ) ) . '</p><p>' . ( memberglut_page_url( 'account' ) ? '<a class="mg-button" href="' . esc_url( memberglut_page_url( 'account' ) ) . '">' . esc_html__( 'My account', 'memberglut' ) . '</a> ' : '' ) . '<a href="' . esc_url( wp_logout_url( home_url( '/' ) ) ) . '">' . esc_html__( 'Log out', 'memberglut' ) . '</a></p></div>';
		}
		$result   = isset( MemberGlut_Auth::$results['login'] ) ? MemberGlut_Auth::$results['login'] : null;
		$with     = memberglut_form_setting( 'login_with', 'both' );
		$labels   = array( 'both' => __( 'Username or email', 'memberglut' ), 'email' => __( 'Email', 'memberglut' ), 'username' => __( 'Username', 'memberglut' ) );
		$register = memberglut_page_url( 'register' ) ? memberglut_page_url( 'register' ) : ( get_option( 'users_can_register' ) ? wp_registration_url() : '' );
		return memberglut_get_template(
			'forms/login.php',
			array(
				'notice'        => self::notice( $result ),
				'title'         => null === $a['title'] ? memberglut_form_setting( 'login_title', '' ) : $a['title'],
				'button'        => memberglut_form_setting( 'login_button', __( 'Log in', 'memberglut' ) ),
				'login_label'   => $labels[ $with ],
				'login_type'    => 'email' === $with ? 'email' : 'text',
				'login_value'   => is_wp_error( $result ) && isset( $_POST['log'] ) ? sanitize_text_field( wp_unslash( $_POST['log'] ) ) : '', // phpcs:ignore WordPress.Security.NonceVerification.Missing
				'remember'      => memberglut_form_setting( 'login_remember', true ) && ! memberglut_setting( 'logout_on_close', false ),
				'lost_url'      => memberglut_form_setting( 'login_lost_link', true ) ? ( memberglut_page_url( 'lost' ) ? memberglut_page_url( 'lost' ) : wp_lostpassword_url() ) : '',
				'register_url'  => memberglut_form_setting( 'login_register_link', true ) && memberglut_setting( 'allow_registration', true ) ? $register : '',
				'guard'         => MemberGlut_Form_Guard::render( 'login' ),
				'hidden'        => self::form_hidden( 'login', self::requested_redirect( $a['redirect'] ) ),
				'toggle'        => (bool) memberglut_setting( 'show_password_toggle', true ),
			)
		);
	}

	/**
	 * [memberglut_lost_password] — request a reset link, or set a new password from the link.
	 *
	 * @param array $atts Attributes.
	 * @return string
	 */
	public static function lost_password( $atts = array() ) {
		MemberGlut_Assets::need();
		MemberGlut_Cache::no_cache();
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- The reset key is checked by WordPress.
		$key   = isset( $_GET['key'] ) ? sanitize_text_field( wp_unslash( $_GET['key'] ) ) : '';
		$login = isset( $_GET['login'] ) ? sanitize_user( wp_unslash( $_GET['login'] ) ) : '';
		// phpcs:enable
		if ( $key && $login ) {
			$result = isset( MemberGlut_Auth::$results['reset_password'] ) ? MemberGlut_Auth::$results['reset_password'] : null;
			$valid  = ! is_wp_error( check_password_reset_key( $key, $login ) );
			return memberglut_get_template(
				'forms/reset-password.php',
				array(
					'notice' => self::notice( $result ),
					'valid'  => $valid,
					'key'    => $key,
					'login'  => $login,
					'errors' => self::field_errors( $result ),
					'hidden' => self::form_hidden( 'reset_password' ),
					'lost'   => remove_query_arg( array( 'key', 'login' ) ),
					'pass'   => MemberGlut_Fields::render( array( 'key' => 'password', 'label' => __( 'New password', 'memberglut' ), 'type' => 'password', 'required' => true ), '', 'mgreset' ),
				)
			);
		}
		$result = isset( MemberGlut_Auth::$results['lost_password'] ) ? MemberGlut_Auth::$results['lost_password'] : null;
		return memberglut_get_template(
			'forms/lost-password.php',
			array(
				'notice' => self::notice( $result ),
				'guard'  => MemberGlut_Form_Guard::render( 'lost_password' ),
				'hidden' => self::form_hidden( 'lost_password' ),
				'login'  => memberglut_page_url( 'login' ) ? memberglut_page_url( 'login' ) : wp_login_url(),
				'done'   => is_array( $result ),
			)
		);
	}

	/* ---------------------------------------------------------------------
	 * Pricing
	 * ------------------------------------------------------------------ */

	/**
	 * Button state of a plan for the current user.
	 *
	 * @param array $plan    Plan.
	 * @param int   $user_id User.
	 * @return array [ label, url, state: join|current|upgrade|downgrade|disabled, note ]
	 */
	public static function plan_button( $plan, $user_id, $label = '' ) {
		$label = $label ? $label : memberglut_form_setting( 'pricing_button', __( 'Choose plan', 'memberglut' ) );
		if ( MemberGlut_Plans::is_sold_out( $plan ) ) {
			return array( 'label' => __( 'Sold out', 'memberglut' ), 'url' => '', 'state' => 'disabled', 'note' => '' );
		}
		if ( $user_id && memberglut_form_setting( 'pricing_current', true ) ) {
			if ( MemberGlut_Subscription_Service::user_has_plan( $user_id, $plan['id'] ) ) {
				return array( 'label' => __( 'Current plan', 'memberglut' ), 'url' => memberglut_page_url( 'account', array( 'tab' => 'subscriptions' ) ), 'state' => 'current', 'note' => '' );
			}
			$current = MemberGlut_Subscription_Service::in_group( $user_id, $plan['group'] );
			if ( $current ) {
				$cur_plan = MemberGlut_Plans::get( $current['plan_id'] );
				$up       = $cur_plan && $plan['tier'] > $cur_plan['tier'];
				$allowed  = memberglut_setting( 'allow_change', true ) && ( $up ? $plan['allow_upgrade'] : ( $plan['allow_downgrade'] && memberglut_setting( 'allow_downgrade', true ) ) );
				if ( ! $allowed ) {
					return array( 'label' => $up ? __( 'Upgrade', 'memberglut' ) : __( 'Downgrade', 'memberglut' ), 'url' => '', 'state' => 'disabled', 'note' => __( 'Not available from your plan.', 'memberglut' ) );
				}
				return array( 'label' => $up ? __( 'Upgrade', 'memberglut' ) : __( 'Downgrade', 'memberglut' ), 'url' => MemberGlut_Plans::signup_url( $plan['slug'] ), 'state' => $up ? 'upgrade' : 'downgrade', 'note' => '' );
			}
		}
		$can = MemberGlut_Plans::can_join( $plan, $user_id );
		if ( is_wp_error( $can ) && 'memberglut_plan_no_gateway' !== $can->get_error_code() ) {
			return array( 'label' => $label, 'url' => '', 'state' => 'disabled', 'note' => $can->get_error_message() );
		}
		return array( 'label' => $label, 'url' => MemberGlut_Plans::signup_url( $plan['slug'] ), 'state' => 'join', 'note' => '' );
	}

	/**
	 * [memberglut_plans group="" plans="" layout="" columns=""] — pricing table.
	 *
	 * @param array $atts Attributes.
	 * @return string
	 */
	public static function plans( $atts = array() ) {
		$a = shortcode_atts( array( 'group' => '', 'plans' => '', 'layout' => '', 'columns' => '', 'button' => '' ), $atts, 'memberglut_plans' );
		MemberGlut_Assets::need( false );
		$user_id = get_current_user_id();
		if ( $user_id ) {
			MemberGlut_Cache::no_cache();
		}
		$ids = $a['plans'] ? self::plan_ids( $a['plans'] ) : array_map( 'intval', (array) memberglut_form_setting( 'pricing_plans', array() ) );
		$all = array();
		if ( $ids ) {
			foreach ( $ids as $id ) {
				$p = MemberGlut_Plans::get( $id );
				if ( $p ) {
					$all[] = $p;
				}
			}
		} else {
			$all = MemberGlut_Plans::all( 'active' );
		}
		$plans = array_values( array_filter( $all, static function ( $p ) use ( $a ) {
			return 'active' === $p['status'] && ! $p['hide_in_table'] && ( ! $a['group'] || strtolower( $p['group'] ) === strtolower( $a['group'] ) );
		} ) );
		if ( ! $ids ) {
			usort( $plans, static function ( $x, $y ) {
				return strcmp( $x['group'], $y['group'] ) ?: ( $x['tier'] <=> $y['tier'] );
			} );
		}
		$rows = array();
		foreach ( $plans as $p ) {
			$rows[] = array( 'plan' => $p, 'button' => self::plan_button( $p, $user_id, $a['button'] ) );
		}
		$layout = in_array( $a['layout'], array( 'cards', 'compare', 'list' ), true ) ? $a['layout'] : memberglut_form_setting( 'pricing_layout', 'cards' );
		$cols   = $a['columns'] ? max( 1, min( 4, (int) $a['columns'] ) ) : (int) memberglut_form_setting( 'pricing_columns', 3 );
		return memberglut_get_template(
			'pricing/table.php',
			array(
				'rows'     => $rows,
				'layout'   => $layout,
				'columns'  => min( $cols, max( 1, count( $rows ) ) ),
				'features' => (bool) memberglut_form_setting( 'pricing_features', true ),
				'dark'     => (bool) memberglut_form_setting( 'pricing_dark', false ),
			)
		);
	}

	/**
	 * [memberglut_buy plan="gold" label=""] — join / buy button for one plan.
	 *
	 * @param array $atts Attributes.
	 * @return string
	 */
	public static function buy( $atts = array() ) {
		$a    = shortcode_atts( array( 'plan' => '', 'label' => '' ), $atts, 'memberglut_buy' );
		$plan = MemberGlut_Plans::get( is_numeric( $a['plan'] ) ? (int) $a['plan'] : sanitize_title( $a['plan'] ) );
		if ( ! $plan ) {
			return current_user_can( 'memberglut_manage_plans' ) ? '<p class="mg-notice mg-notice-error">' . esc_html__( 'MemberGlut: this plan does not exist.', 'memberglut' ) . '</p>' : '';
		}
		MemberGlut_Assets::need( false );
		if ( is_user_logged_in() ) {
			MemberGlut_Cache::no_cache();
		}
		$label = $a['label'] ? $a['label'] : sprintf( /* translators: 1: plan, 2: price */ __( 'Join %1$s — %2$s', 'memberglut' ), $plan['name'], MemberGlut_Plans::price_label( $plan ) );
		$b     = self::plan_button( $plan, get_current_user_id(), $label );
		if ( ! $b['url'] ) {
			return '<span class="mg-button is-disabled" aria-disabled="true">' . esc_html( $b['label'] ) . '</span>' . ( $b['note'] ? '<span class="mg-help">' . esc_html( $b['note'] ) . '</span>' : '' );
		}
		return '<a class="mg-button mg-buy is-' . esc_attr( $b['state'] ) . '" href="' . esc_url( $b['url'] ) . '">' . esc_html( $b['label'] ) . '</a>';
	}
}
