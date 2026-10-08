<?php
/**
 * Blocks (plans/appendix-d-shortcodes-blocks.md): every shortcode as a server-rendered block (memberglut/<name>)
 * using the same callback, plus the “Members-only content” wrapper block (= [memberglut_restrict]).
 * The editor side is assets/editor/memberglut-blocks.js (wp.* globals, ServerSideRender preview, no build step).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Blocks class.
 */
class MemberGlut_Blocks {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'register' ), 20 );
		add_filter( 'block_categories_all', array( __CLASS__, 'category' ) );
		add_action( 'enqueue_block_assets', array( __CLASS__, 'editor_css' ) );
	}

	/**
	 * Outline of the members-only wrapper in the editor.
	 *
	 * @return void
	 */
	public static function editor_css() {
		if ( ! is_admin() ) {
			return;
		}
		wp_register_style( 'memberglut-blocks-editor', false, array(), MEMBERGLUT_VERSION );
		wp_enqueue_style( 'memberglut-blocks-editor' );
		wp_add_inline_style( 'memberglut-blocks-editor', '.mg-restrict-editor{border:1px dashed #e94560;border-radius:8px;padding:12px 16px}.mg-restrict-editor-label{font-size:12px;font-weight:600;color:#e94560;margin-bottom:8px}' );
	}

	/**
	 * Block definitions: name => [ shortcode, title, description, icon, attributes ].
	 * Attribute: [ type, default, label, control (text|number|select|toggle), options ].
	 *
	 * @return array
	 */
	public static function definitions() {
		$text = static function ( $label, $help = '' ) {
			return array( 'type' => 'string', 'default' => '', 'label' => $label, 'control' => 'text', 'help' => $help );
		};
		$tabs = array( array( 'value' => '', 'label' => __( 'First enabled tab', 'memberglut' ) ) );
		foreach ( array( 'dashboard', 'profile', 'password', 'subscriptions', 'payments', 'activity' ) as $t ) {
			$tabs[] = array( 'value' => $t, 'label' => ucfirst( $t ) );
		}
		$plan_help = __( 'Plan slugs or IDs, comma separated.', 'memberglut' );
		$defs      = array(
			'register'       => array( 'memberglut_register', __( 'Registration form', 'memberglut' ), __( 'Sign-up and checkout form.', 'memberglut' ), 'id-alt', array( 'plan' => $text( __( 'Plan', 'memberglut' ), __( 'Preselect a plan (slug or ID). Empty = let the visitor choose.', 'memberglut' ) ), 'redirect' => $text( __( 'Redirect after sign-up', 'memberglut' ) ) ) ),
			'login'          => array( 'memberglut_login', __( 'Login form', 'memberglut' ), __( 'Log in with username or email.', 'memberglut' ), 'lock', array( 'redirect' => $text( __( 'Redirect after login', 'memberglut' ) ) ) ),
			'lost-password'  => array( 'memberglut_lost_password', __( 'Lost password form', 'memberglut' ), __( 'Request and set a new password.', 'memberglut' ), 'unlock', array() ),
			'account'        => array( 'memberglut_account', __( 'My account', 'memberglut' ), __( 'Member account with tabs.', 'memberglut' ), 'admin-users', array( 'tab' => array( 'type' => 'string', 'default' => '', 'label' => __( 'Default tab', 'memberglut' ), 'control' => 'select', 'options' => $tabs ) ) ),
			'profile'        => array( 'memberglut_profile', __( 'Profile form', 'memberglut' ), __( 'Edit profile fields.', 'memberglut' ), 'businessperson', array() ),
			'plans'          => array( 'memberglut_plans', __( 'Pricing table', 'memberglut' ), __( 'Membership plans with join buttons.', 'memberglut' ), 'grid-view', array(
				'group'   => $text( __( 'Group', 'memberglut' ) ),
				'plans'   => $text( __( 'Plans', 'memberglut' ), $plan_help ),
				'layout'  => array( 'type' => 'string', 'default' => '', 'label' => __( 'Layout', 'memberglut' ), 'control' => 'select', 'options' => array( array( 'value' => '', 'label' => __( 'Default', 'memberglut' ) ), array( 'value' => 'cards', 'label' => __( 'Cards', 'memberglut' ) ), array( 'value' => 'compare', 'label' => __( 'Comparison', 'memberglut' ) ), array( 'value' => 'list', 'label' => __( 'List', 'memberglut' ) ) ) ),
				'columns' => array( 'type' => 'string', 'default' => '', 'label' => __( 'Columns', 'memberglut' ), 'control' => 'text' ),
				'button'  => $text( __( 'Button text', 'memberglut' ) ),
			) ),
			'buy'            => array( 'memberglut_buy', __( 'Join button', 'memberglut' ), __( 'Button to join one plan.', 'memberglut' ), 'cart', array( 'plan' => $text( __( 'Plan', 'memberglut' ), __( 'Slug or ID.', 'memberglut' ) ), 'label' => $text( __( 'Button text', 'memberglut' ) ) ) ),
			'receipt'        => array( 'memberglut_receipt', __( 'Payment receipt', 'memberglut' ), __( 'Shows the receipt on the thank-you page.', 'memberglut' ), 'media-text', array() ),
			'payments'       => array( 'memberglut_payments', __( 'Payment history', 'memberglut' ), __( 'Payments of the logged-in member.', 'memberglut' ), 'money-alt', array( 'limit' => array( 'type' => 'string', 'default' => '50', 'label' => __( 'Rows', 'memberglut' ), 'control' => 'text' ) ) ),
			'member'         => array( 'memberglut_member', __( 'Member field', 'memberglut' ), __( 'A value of the logged-in member (name, email, plan, expiry, custom field…).', 'memberglut' ), 'id', array( 'field' => array( 'type' => 'string', 'default' => 'display_name', 'label' => __( 'Field', 'memberglut' ), 'control' => 'text', 'help' => 'display_name, first_name, email, plan, plans, expiry, status, …' ), 'default' => $text( __( 'Fallback text', 'memberglut' ) ) ) ),
			'expiry'         => array( 'memberglut_expiry', __( 'Membership expiry', 'memberglut' ), __( 'Expiry date of the member’s plan.', 'memberglut' ), 'calendar-alt', array( 'plan' => $text( __( 'Plan', 'memberglut' ), $plan_help ), 'format' => $text( __( 'Date format', 'memberglut' ), __( 'PHP date format. Empty = site format.', 'memberglut' ) ) ) ),
			'members'        => array( 'memberglut_members', __( 'Member directory', 'memberglut' ), __( 'Members who chose to be listed.', 'memberglut' ), 'groups', array( 'plan' => $text( __( 'Plans', 'memberglut' ), $plan_help ), 'limit' => array( 'type' => 'string', 'default' => '12', 'label' => __( 'Number of members', 'memberglut' ), 'control' => 'text' ), 'fields' => array( 'type' => 'string', 'default' => 'avatar,name', 'label' => __( 'Show', 'memberglut' ), 'control' => 'text', 'help' => 'avatar, name, plan, since' ) ) ),
			'count'          => array( 'memberglut_count', __( 'Member count', 'memberglut' ), __( 'Number of members.', 'memberglut' ), 'chart-bar', array( 'plan' => $text( __( 'Plans', 'memberglut' ), $plan_help ), 'status' => array( 'type' => 'string', 'default' => 'active', 'label' => __( 'Statuses', 'memberglut' ), 'control' => 'text', 'help' => 'active, trialing, canceled…' ) ) ),
		);
		return apply_filters( 'memberglut_blocks', $defs );
	}

	/**
	 * Wrapper block attributes (= [memberglut_restrict]).
	 *
	 * @return array
	 */
	public static function restrict_attributes() {
		return array(
			'plans'        => array( 'type' => 'array', 'default' => array() ),
			'roles'        => array( 'type' => 'array', 'default' => array() ),
			'not'          => array( 'type' => 'array', 'default' => array() ),
			'logged_in'    => array( 'type' => 'string', 'default' => '' ),
			'message'      => array( 'type' => 'string', 'default' => '' ),
			'show_message' => array( 'type' => 'boolean', 'default' => true ),
		);
	}

	/**
	 * “MemberGlut” inserter category.
	 *
	 * @param array $cats Categories.
	 * @return array
	 */
	public static function category( $cats ) {
		array_unshift( $cats, array( 'slug' => 'memberglut', 'title' => __( 'MemberGlut', 'memberglut' ), 'icon' => null ) );
		return $cats;
	}

	/**
	 * Register the blocks and the editor script.
	 *
	 * @return void
	 */
	public static function register() {
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}
		wp_register_script(
			'memberglut-blocks',
			MEMBERGLUT_PLUGIN_URL . 'assets/editor/memberglut-blocks.js',
			array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-block-editor', 'wp-server-side-render', 'wp-i18n' ),
			MEMBERGLUT_VERSION,
			true
		);
		wp_set_script_translations( 'memberglut-blocks', 'memberglut', MEMBERGLUT_PLUGIN_PATH . 'languages' );

		$client = array();
		foreach ( self::definitions() as $name => $d ) {
			list( $tag, $title, $desc, $icon, $attrs ) = $d;
			$schema = array();
			foreach ( $attrs as $key => $a ) {
				$schema[ $key ] = array( 'type' => $a['type'], 'default' => $a['default'] );
			}
			register_block_type(
				'memberglut/' . $name,
				array(
					'api_version'     => 3,
					'title'           => $title,
					'category'        => 'memberglut',
					'attributes'      => $schema,
					'editor_script'   => 'memberglut-blocks',
					'supports'        => array( 'html' => false, 'align' => array( 'wide', 'full' ) ),
					'render_callback' => static function ( $atts ) use ( $tag ) {
						return self::render_shortcode( $tag, $atts );
					},
				)
			);
			$client[] = array( 'name' => 'memberglut/' . $name, 'title' => $title, 'description' => $desc, 'icon' => $icon, 'attributes' => $attrs );
		}

		register_block_type(
			'memberglut/restrict',
			array(
				'api_version'     => 3,
				'title'           => __( 'Members-only content', 'memberglut' ),
				'category'        => 'memberglut',
				'attributes'      => self::restrict_attributes(),
				'editor_script'   => 'memberglut-blocks',
				'supports'        => array( 'html' => false, 'align' => array( 'wide', 'full' ) ),
				'render_callback' => array( __CLASS__, 'render_restrict' ),
			)
		);

		$plans = array();
		foreach ( MemberGlut_Plans::all() as $p ) {
			$plans[] = array( 'value' => (int) $p['id'], 'label' => $p['name'] );
		}
		$roles = array();
		foreach ( wp_roles()->get_names() as $slug => $label ) {
			$roles[] = array( 'value' => $slug, 'label' => translate_user_role( $label ) );
		}
		wp_localize_script( 'memberglut-blocks', 'memberglutBlocks', array( 'blocks' => $client, 'plans' => $plans, 'roles' => $roles ) );
	}

	/**
	 * Render a shortcode callback from block attributes.
	 *
	 * @param string $tag   Shortcode.
	 * @param array  $atts  Attributes.
	 * @return string
	 */
	public static function render_shortcode( $tag, $atts ) {
		$map = MemberGlut_Shortcodes::map();
		if ( ! isset( $map[ $tag ] ) || ! is_callable( $map[ $tag ] ) ) {
			return '';
		}
		$clean = array();
		foreach ( (array) $atts as $k => $v ) {
			if ( is_scalar( $v ) && '' !== (string) $v && 'className' !== $k && 'align' !== $k ) {
				$clean[ $k ] = (string) $v;
			}
		}
		$html = (string) call_user_func( $map[ $tag ], $clean, '', $tag );
		$cls  = 'wp-block-memberglut-' . str_replace( array( 'memberglut_', '_' ), array( '', '-' ), $tag );
		if ( ! empty( $atts['className'] ) ) {
			$cls .= ' ' . sanitize_html_class( $atts['className'] );
		}
		if ( ! empty( $atts['align'] ) ) {
			$cls .= ' align' . sanitize_key( $atts['align'] );
		}
		return '' === $html ? '' : '<div class="' . esc_attr( $cls ) . '">' . $html . '</div>';
	}

	/**
	 * Members-only wrapper.
	 *
	 * @param array  $atts    Attributes.
	 * @param string $content Inner blocks HTML.
	 * @return string
	 */
	public static function render_restrict( $atts, $content ) {
		$atts = wp_parse_args( $atts, array( 'plans' => array(), 'roles' => array(), 'not' => array(), 'logged_in' => '', 'message' => '', 'show_message' => true ) );
		return MemberGlut_Shortcodes::restrict(
			array(
				'plans'        => implode( ',', array_map( 'intval', (array) $atts['plans'] ) ),
				'roles'        => implode( ',', array_map( 'sanitize_key', (array) $atts['roles'] ) ),
				'not'          => implode( ',', array_map( 'intval', (array) $atts['not'] ) ),
				'logged_in'    => in_array( (string) $atts['logged_in'], array( '0', '1' ), true ) ? (string) $atts['logged_in'] : '',
				'message'      => (string) $atts['message'],
				'show_message' => $atts['show_message'] ? '1' : '0',
			),
			$content
		);
	}
}
