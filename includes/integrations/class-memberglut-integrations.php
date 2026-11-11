<?php
/**
 * Free integrations with other plugins. Each part only loads when its plugin is active.
 *
 *  - Elementor: "MemberGlut access" controls on every widget, section, column and container.
 *  - Beaver Builder: "MemberGlut access" field in the Advanced tab of modules, columns and rows.
 *  - Bricks: "MemberGlut plan" and "MemberGlut login state" element conditions.
 *  - Easy Digital Downloads: a download can grant a plan on purchase (removed again on refund).
 *  - GiveWP: a donation form can grant a plan on a completed donation (removed again on refund).
 *  - [memberglut_security_badge]: a small trust badge.
 *
 * Administrators and users who bypass restrictions always see builder elements.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Integrations class.
 */
class MemberGlut_Integrations {

	/**
	 * Post meta: plan granted by an EDD download / GiveWP form.
	 */
	const GRANT_META = '_memberglut_grant_plan';

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_filter( 'memberglut_shortcodes', array( __CLASS__, 'shortcodes' ) );
		add_action( 'plugins_loaded', array( __CLASS__, 'load' ), 20 );
		if ( did_action( 'plugins_loaded' ) ) {
			self::load();
		}
	}

	/**
	 * Load the parts whose plugin is active.
	 *
	 * @return void
	 */
	public static function load() {
		static $done = false;
		if ( $done ) {
			return;
		}
		$done = true;

		// Elementor.
		add_action( 'elementor/element/common/_section_style/after_section_end', array( __CLASS__, 'elementor_controls' ), 10, 2 );
		add_action( 'elementor/element/section/section_advanced/after_section_end', array( __CLASS__, 'elementor_controls' ), 10, 2 );
		add_action( 'elementor/element/column/section_advanced/after_section_end', array( __CLASS__, 'elementor_controls' ), 10, 2 );
		add_action( 'elementor/element/container/section_layout/after_section_end', array( __CLASS__, 'elementor_controls' ), 10, 2 );
		foreach ( array( 'widget', 'section', 'column', 'container' ) as $type ) {
			add_filter( 'elementor/frontend/' . $type . '/should_render', array( __CLASS__, 'elementor_should_render' ), 10, 2 );
		}
		add_action( 'elementor/widgets/register', array( __CLASS__, 'elementor_widget' ) );

		// Beaver Builder.
		add_filter( 'fl_builder_register_settings_form', array( __CLASS__, 'beaver_form' ), 10, 2 );
		add_filter( 'fl_builder_is_node_visible', array( __CLASS__, 'beaver_visible' ), 10, 2 );

		// Bricks.
		add_filter( 'bricks/conditions/groups', array( __CLASS__, 'bricks_groups' ) );
		add_filter( 'bricks/conditions/options', array( __CLASS__, 'bricks_options' ) );
		add_filter( 'bricks/conditions/result', array( __CLASS__, 'bricks_result' ), 10, 3 );

		// EDD and GiveWP: plan on purchase / donation.
		if ( function_exists( 'EDD' ) || class_exists( 'Easy_Digital_Downloads' ) ) {
			add_action( 'add_meta_boxes_download', array( __CLASS__, 'grant_meta_box' ) );
			add_action( 'save_post_download', array( __CLASS__, 'save_grant_meta' ) );
			add_action( 'edd_complete_purchase', array( __CLASS__, 'edd_complete' ) );
			add_action( 'edd_update_payment_status', array( __CLASS__, 'edd_status' ), 10, 3 );
		}
		if ( class_exists( 'Give' ) || function_exists( 'give_get_payment_form_id' ) ) {
			add_action( 'add_meta_boxes_give_forms', array( __CLASS__, 'grant_meta_box' ) );
			add_action( 'save_post_give_forms', array( __CLASS__, 'save_grant_meta' ) );
			add_action( 'give_complete_donation', array( __CLASS__, 'give_complete' ) );
			add_action( 'give_update_payment_status', array( __CLASS__, 'give_status' ), 10, 3 );
		}
	}

	/* ---------------------------------------------------------------------
	 * Shared audience helpers
	 * ------------------------------------------------------------------ */

	/**
	 * Audience choices.
	 *
	 * @return array value => label
	 */
	public static function audiences() {
		return array(
			''           => __( 'Everyone', 'memberglut' ),
			'logged_in'  => __( 'Logged-in users', 'memberglut' ),
			'logged_out' => __( 'Logged-out visitors', 'memberglut' ),
			'plans'      => __( 'Members of these plans', 'memberglut' ),
			'no_plan'    => __( 'Users without these plans', 'memberglut' ),
			'roles'      => __( 'These roles', 'memberglut' ),
		);
	}

	/**
	 * Plan choices.
	 *
	 * @return array id => name
	 */
	public static function plan_choices() {
		$out = array();
		foreach ( MemberGlut_Plans::all() as $p ) {
			$out[ (string) $p['id'] ] = $p['name'];
		}
		return $out;
	}

	/**
	 * Role choices.
	 *
	 * @return array slug => name
	 */
	public static function role_choices() {
		$out = array();
		foreach ( wp_roles()->roles as $slug => $r ) {
			$out[ $slug ] = translate_user_role( $r['name'] );
		}
		return $out;
	}

	/**
	 * Whether the current user may see an element with this audience.
	 *
	 * @param string $who   Audience ('' = everyone).
	 * @param array  $plans Plans.
	 * @param array  $roles Roles.
	 * @return bool
	 */
	public static function visible( $who, $plans = array(), $roles = array() ) {
		if ( '' === (string) $who || 'everyone' === $who ) {
			return true;
		}
		$uid = get_current_user_id();
		if ( memberglut_user_bypasses_restrictions( $uid ) ) {
			return true;
		}
		$plans = array_values( array_filter( array_map( 'intval', (array) $plans ) ) );
		$roles = array_values( array_filter( array_map( 'sanitize_key', (array) $roles ) ) );
		if ( 'no_plan' === $who ) {
			return ! MemberGlut_Access::user_passes( array( 'who' => 'plans', 'plans' => $plans ), $uid );
		}
		return MemberGlut_Access::user_passes( array( 'who' => $who, 'plans' => $plans, 'roles' => $roles ), $uid );
	}

	/* ---------------------------------------------------------------------
	 * Elementor
	 * ------------------------------------------------------------------ */

	/**
	 * Add the controls section.
	 *
	 * @param object $element Element (\Elementor\Controls_Stack).
	 * @param array  $args    Args.
	 * @return void
	 */
	public static function elementor_controls( $element, $args = array() ) {
		if ( ! class_exists( '\Elementor\Controls_Manager' ) ) {
			return;
		}
		$element->start_controls_section(
			'memberglut_access_section',
			array(
				'label' => __( 'MemberGlut access', 'memberglut' ),
				'tab'   => \Elementor\Controls_Manager::TAB_ADVANCED,
			)
		);
		$element->add_control(
			'memberglut_who',
			array(
				'label'   => __( 'Show to', 'memberglut' ),
				'type'    => \Elementor\Controls_Manager::SELECT,
				'default' => '',
				'options' => self::audiences(),
			)
		);
		$element->add_control(
			'memberglut_plans',
			array(
				'label'       => __( 'Plans', 'memberglut' ),
				'type'        => \Elementor\Controls_Manager::SELECT2,
				'multiple'    => true,
				'label_block' => true,
				'options'     => self::plan_choices(),
				'condition'   => array( 'memberglut_who' => array( 'plans', 'no_plan' ) ),
			)
		);
		$element->add_control(
			'memberglut_roles',
			array(
				'label'       => __( 'Roles', 'memberglut' ),
				'type'        => \Elementor\Controls_Manager::SELECT2,
				'multiple'    => true,
				'label_block' => true,
				'options'     => self::role_choices(),
				'condition'   => array( 'memberglut_who' => 'roles' ),
			)
		);
		$element->add_control(
			'memberglut_note',
			array(
				'type'            => \Elementor\Controls_Manager::RAW_HTML,
				'raw'             => esc_html__( 'Hidden elements are not sent to the browser. Administrators always see them.', 'memberglut' ),
				'content_classes' => 'elementor-descriptor',
			)
		);
		$element->end_controls_section();
	}

	/**
	 * Register the MemberGlut widget.
	 *
	 * @param object $manager Widgets manager.
	 * @return void
	 */
	public static function elementor_widget( $manager ) {
		if ( class_exists( '\Elementor\Widget_Base' ) && is_object( $manager ) && method_exists( $manager, 'register' ) ) {
			$manager->register( new MemberGlut_Elementor_Widget() );
		}
	}

	/**
	 * Skip rendering for users outside the audience (never inside the editor).
	 *
	 * @param bool   $should  Render.
	 * @param object $element Element.
	 * @return bool
	 */
	public static function elementor_should_render( $should, $element ) {
		if ( ! $should || ! is_object( $element ) || ! method_exists( $element, 'get_settings_for_display' ) ) {
			return $should;
		}
		if ( class_exists( '\Elementor\Plugin' ) && isset( \Elementor\Plugin::$instance->editor ) && \Elementor\Plugin::$instance->editor->is_edit_mode() ) {
			return $should;
		}
		$s = (array) $element->get_settings_for_display();
		return self::visible( isset( $s['memberglut_who'] ) ? $s['memberglut_who'] : '', isset( $s['memberglut_plans'] ) ? $s['memberglut_plans'] : array(), isset( $s['memberglut_roles'] ) ? $s['memberglut_roles'] : array() );
	}

	/* ---------------------------------------------------------------------
	 * Beaver Builder
	 * ------------------------------------------------------------------ */

	/**
	 * Add the field to the Advanced tab of modules, columns and rows.
	 *
	 * @param array  $form Form.
	 * @param string $id   Form id.
	 * @return array
	 */
	public static function beaver_form( $form, $id ) {
		$fields = array(
			'memberglut_who'   => array(
				'type'    => 'select',
				'label'   => __( 'MemberGlut: show to', 'memberglut' ),
				'default' => '',
				'options' => self::audiences(),
				'toggle'  => array(
					'plans'   => array( 'fields' => array( 'memberglut_plans' ) ),
					'no_plan' => array( 'fields' => array( 'memberglut_plans' ) ),
					'roles'   => array( 'fields' => array( 'memberglut_roles' ) ),
				),
			),
			'memberglut_plans' => array(
				'type'         => 'select',
				'label'        => __( 'Plans', 'memberglut' ),
				'options'      => self::plan_choices(),
				'multi-select' => true,
			),
			'memberglut_roles' => array(
				'type'         => 'select',
				'label'        => __( 'Roles', 'memberglut' ),
				'options'      => self::role_choices(),
				'multi-select' => true,
			),
		);
		if ( 'module_advanced' === $id && isset( $form['sections'] ) ) {
			$form['sections']['memberglut'] = array( 'title' => __( 'MemberGlut access', 'memberglut' ), 'fields' => $fields );
		} elseif ( in_array( $id, array( 'row', 'col' ), true ) && isset( $form['tabs']['advanced']['sections'] ) ) {
			$form['tabs']['advanced']['sections']['memberglut'] = array( 'title' => __( 'MemberGlut access', 'memberglut' ), 'fields' => $fields );
		}
		return $form;
	}

	/**
	 * Node visibility.
	 *
	 * @param bool   $visible Visible.
	 * @param object $node    Node.
	 * @return bool
	 */
	public static function beaver_visible( $visible, $node ) {
		if ( ! $visible || ! is_object( $node ) || empty( $node->settings ) ) {
			return $visible;
		}
		if ( class_exists( 'FLBuilderModel' ) && FLBuilderModel::is_builder_active() ) {
			return $visible;
		}
		$s = $node->settings;
		return self::visible( isset( $s->memberglut_who ) ? $s->memberglut_who : '', isset( $s->memberglut_plans ) ? $s->memberglut_plans : array(), isset( $s->memberglut_roles ) ? $s->memberglut_roles : array() );
	}

	/* ---------------------------------------------------------------------
	 * Bricks
	 * ------------------------------------------------------------------ */

	/**
	 * Condition group.
	 *
	 * @param array $groups Groups.
	 * @return array
	 */
	public static function bricks_groups( $groups ) {
		$groups[] = array( 'name' => 'memberglut', 'label' => 'MemberGlut' );
		return $groups;
	}

	/**
	 * Conditions.
	 *
	 * @param array $options Options.
	 * @return array
	 */
	public static function bricks_options( $options ) {
		$options[] = array(
			'key'     => 'memberglut_plan',
			'group'   => 'memberglut',
			'label'   => __( 'Has plan', 'memberglut' ),
			'compare' => array( 'type' => 'select', 'options' => array( '==' => __( 'is', 'memberglut' ), '!=' => __( 'is not', 'memberglut' ) ), 'placeholder' => __( 'is', 'memberglut' ) ),
			'value'   => array( 'type' => 'select', 'options' => array( 'any' => __( 'Any active plan', 'memberglut' ) ) + self::plan_choices() ),
		);
		$options[] = array(
			'key'     => 'memberglut_member',
			'group'   => 'memberglut',
			'label'   => __( 'Is a member', 'memberglut' ),
			'compare' => array( 'type' => 'select', 'options' => array( '==' => __( 'is', 'memberglut' ), '!=' => __( 'is not', 'memberglut' ) ), 'placeholder' => __( 'is', 'memberglut' ) ),
			'value'   => array( 'type' => 'select', 'options' => array( '1' => __( 'Yes', 'memberglut' ) ) ),
		);
		return $options;
	}

	/**
	 * Evaluate a condition.
	 *
	 * @param bool   $result    Result.
	 * @param string $key       Condition key.
	 * @param array  $condition Condition.
	 * @return bool
	 */
	public static function bricks_result( $result, $key, $condition ) {
		if ( ! in_array( $key, array( 'memberglut_plan', 'memberglut_member' ), true ) ) {
			return $result;
		}
		$uid     = get_current_user_id();
		$compare = isset( $condition['compare'] ) ? $condition['compare'] : '==';
		$value   = isset( $condition['value'] ) ? (string) $condition['value'] : 'any';
		$plans   = $uid ? MemberGlut_Subscription_Service::active_plan_ids( $uid ) : array();
		$has     = 'memberglut_member' === $key || 'any' === $value ? (bool) $plans : in_array( (int) $value, array_map( 'intval', $plans ), true );
		return '!=' === $compare ? ! $has : $has;
	}

	/* ---------------------------------------------------------------------
	 * EDD / GiveWP: grant a plan
	 * ------------------------------------------------------------------ */

	/**
	 * Meta box on downloads and donation forms.
	 *
	 * @return void
	 */
	public static function grant_meta_box() {
		$screen = get_current_screen();
		add_meta_box( 'memberglut-grant', __( 'MemberGlut membership', 'memberglut' ), array( __CLASS__, 'render_grant_box' ), $screen ? $screen->post_type : null, 'side' );
	}

	/**
	 * Render the meta box.
	 *
	 * @param WP_Post $post Post.
	 * @return void
	 */
	public static function render_grant_box( $post ) {
		$current = (int) get_post_meta( $post->ID, self::GRANT_META, true );
		wp_nonce_field( 'memberglut_grant_' . $post->ID, 'memberglut_grant_nonce' );
		echo '<p><label for="memberglut-grant-plan">' . esc_html__( 'Give this plan to the buyer:', 'memberglut' ) . '</label></p>';
		echo '<select id="memberglut-grant-plan" name="memberglut_grant_plan" class="widefat"><option value="0">' . esc_html__( '— None —', 'memberglut' ) . '</option>';
		foreach ( self::plan_choices() as $id => $name ) {
			echo '<option value="' . esc_attr( $id ) . '" ' . selected( $current, (int) $id, false ) . '>' . esc_html( $name ) . '</option>';
		}
		echo '</select><p class="description">' . esc_html__( 'Granted when the payment completes and removed again if it is refunded. Guests get it once their purchase is linked to an account.', 'memberglut' ) . '</p>';
	}

	/**
	 * Save the meta box.
	 *
	 * @param int $post_id Post.
	 * @return void
	 */
	public static function save_grant_meta( $post_id ) {
		$nonce = isset( $_POST['memberglut_grant_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['memberglut_grant_nonce'] ) ) : '';
		if ( ! $nonce || ! wp_verify_nonce( $nonce, 'memberglut_grant_' . $post_id ) || ! current_user_can( 'edit_post', $post_id ) || ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) ) {
			return;
		}
		$plan = isset( $_POST['memberglut_grant_plan'] ) ? absint( $_POST['memberglut_grant_plan'] ) : 0;
		if ( $plan && MemberGlut_Plans::get( $plan ) ) {
			update_post_meta( $post_id, self::GRANT_META, $plan );
		} else {
			delete_post_meta( $post_id, self::GRANT_META );
		}
	}

	/**
	 * Give or remove the plans of a list of items.
	 *
	 * @param int    $user_id User.
	 * @param int[]  $items   Downloads / forms.
	 * @param bool   $grant   Grant (true) or remove (false).
	 * @param string $source  Source label.
	 * @param string $ref     Order reference.
	 * @return void
	 */
	private static function apply_items( $user_id, $items, $grant, $source, $ref ) {
		if ( ! $user_id ) {
			return;
		}
		foreach ( array_unique( array_map( 'intval', $items ) ) as $item ) {
			$plan = (int) get_post_meta( $item, self::GRANT_META, true );
			if ( ! $plan || ! MemberGlut_Plans::get( $plan ) ) {
				continue;
			}
			$member = memberglut_get_member( $user_id );
			if ( $grant ) {
				if ( ! $member->has_plan( $plan ) ) {
					$member->add_plan( $plan, array( 'source' => $source, 'meta' => array( 'order' => $ref ) ) );
				}
			} else {
				$member->remove_plan( $plan );
			}
		}
	}

	/**
	 * Downloads in an EDD payment.
	 *
	 * @param int $payment_id Payment.
	 * @return int[]
	 */
	private static function edd_items( $payment_id ) {
		$cart = function_exists( 'edd_get_payment_meta_cart_details' ) ? (array) edd_get_payment_meta_cart_details( $payment_id ) : array();
		return array_filter( array_map( static function ( $i ) {
			return isset( $i['id'] ) ? (int) $i['id'] : 0;
		}, $cart ) );
	}

	/**
	 * EDD purchase completed.
	 *
	 * @param int $payment_id Payment.
	 * @return void
	 */
	public static function edd_complete( $payment_id ) {
		$user = function_exists( 'edd_get_payment_user_id' ) ? (int) edd_get_payment_user_id( $payment_id ) : 0;
		self::apply_items( $user, self::edd_items( $payment_id ), true, 'edd', 'edd:' . $payment_id );
	}

	/**
	 * EDD payment refunded or revoked.
	 *
	 * @param int    $payment_id Payment.
	 * @param string $new        New status.
	 * @param string $old        Old status.
	 * @return void
	 */
	public static function edd_status( $payment_id, $new, $old ) {
		if ( ! in_array( $new, array( 'refunded', 'revoked' ), true ) ) {
			return;
		}
		$user = function_exists( 'edd_get_payment_user_id' ) ? (int) edd_get_payment_user_id( $payment_id ) : 0;
		self::apply_items( $user, self::edd_items( $payment_id ), false, 'edd', 'edd:' . $payment_id );
	}

	/**
	 * GiveWP donation completed.
	 *
	 * @param int $payment_id Donation.
	 * @return void
	 */
	public static function give_complete( $payment_id ) {
		$user = function_exists( 'give_get_payment_user_id' ) ? (int) give_get_payment_user_id( $payment_id ) : 0;
		$form = function_exists( 'give_get_payment_form_id' ) ? (int) give_get_payment_form_id( $payment_id ) : 0;
		self::apply_items( $user, array( $form ), true, 'givewp', 'give:' . $payment_id );
	}

	/**
	 * GiveWP donation refunded.
	 *
	 * @param int    $payment_id Donation.
	 * @param string $new        New status.
	 * @param string $old        Old status.
	 * @return void
	 */
	public static function give_status( $payment_id, $new, $old ) {
		if ( 'refunded' !== $new ) {
			return;
		}
		$user = function_exists( 'give_get_payment_user_id' ) ? (int) give_get_payment_user_id( $payment_id ) : 0;
		$form = function_exists( 'give_get_payment_form_id' ) ? (int) give_get_payment_form_id( $payment_id ) : 0;
		self::apply_items( $user, array( $form ), false, 'givewp', 'give:' . $payment_id );
	}

	/* ---------------------------------------------------------------------
	 * Security badge
	 * ------------------------------------------------------------------ */

	/**
	 * Register shortcodes.
	 *
	 * @param array $map Shortcodes.
	 * @return array
	 */
	public static function shortcodes( $map ) {
		$map['memberglut_security_badge'] = array( __CLASS__, 'security_badge' );
		return $map;
	}

	/**
	 * [memberglut_security_badge text=""]
	 *
	 * @param array $atts Attributes.
	 * @return string
	 */
	public static function security_badge( $atts = array() ) {
		$atts = shortcode_atts( array( 'text' => '' ), (array) $atts, 'memberglut_security_badge' );
		$bits = array();
		if ( is_ssl() ) {
			$bits[] = __( 'Encrypted connection (HTTPS)', 'memberglut' );
		}
		if ( memberglut_setting( 'limit_failed', true ) ) {
			$bits[] = __( 'Brute-force protection', 'memberglut' );
		}
		if ( 'none' !== memberglut_setting( 'captcha_provider', 'none' ) || memberglut_setting( 'honeypot', true ) ) {
			$bits[] = __( 'Spam protection', 'memberglut' );
		}
		$gateways = array();
		foreach ( MemberGlut_Gateways::all() as $g ) {
			if ( $g->is_enabled() && in_array( $g->id, array( 'stripe', 'paypal' ), true ) ) {
				$gateways[] = $g->title();
			}
		}
		if ( $gateways ) {
			/* translators: %s: gateways */
			$bits[] = sprintf( __( 'Payments handled by %s', 'memberglut' ), implode( ', ', $gateways ) );
		}
		$title = '' !== $atts['text'] ? $atts['text'] : __( 'Secure membership site', 'memberglut' );
		$out   = '<div class="mg-security-badge" style="display:inline-flex;gap:10px;align-items:flex-start;padding:10px 14px;border:1px solid #d1fae5;background:#f0fdf4;border-radius:10px;font-size:13px;line-height:1.4;color:#065f46">';
		$out  .= '<span aria-hidden="true" style="font-size:20px;line-height:1">&#128274;</span><span><strong>' . esc_html( $title ) . '</strong>';
		if ( $bits ) {
			$out .= '<br>' . esc_html( implode( ' · ', $bits ) );
		}
		$out .= '</span></div>';
		return $out;
	}
}
