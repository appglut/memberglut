<?php
/**
 * MemberGlut admin app.
 *
 * Registers the admin menu of the React screens (built by Vite into resources/), enqueues the right
 * bundle for each page and renders the full-width page shell.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_App class.
 */
class MemberGlut_App {

	/**
	 * Single instance.
	 *
	 * @var MemberGlut_App|null
	 */
	private static $instance = null;

	/**
	 * Admin page slug => [ build entry, browser title, show in menu ].
	 *
	 * @var array
	 */
	private $pages = array();

	/**
	 * Get singleton instance.
	 *
	 * @return MemberGlut_App
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor — wire up hooks.
	 */
	private function __construct() {
		add_action( 'admin_menu', array( $this, 'register_menus' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		add_action( 'admin_head', array( $this, 'admin_head_styles' ) );
		add_filter( 'admin_title', array( $this, 'filter_admin_title' ), 10, 2 );
		add_filter( 'admin_body_class', array( $this, 'add_body_class' ) );
		add_filter( 'script_loader_tag', array( $this, 'add_module_attribute' ), 10, 2 );
	}

	/**
	 * The screens. Order is the menu order.
	 *
	 * @return array
	 */
	private function pages() {
		if ( $this->pages ) {
			return $this->pages;
		}
		$this->pages = array(
			'memberglut'              => array( 'dashboard', __( 'Dashboard', 'memberglut' ), true ),
			'memberglut-members'      => array( 'members', __( 'Members', 'memberglut' ), true ),
			'memberglut-plans'        => array( 'plans', __( 'Membership Plans', 'memberglut' ), true ),
			'memberglut-rules'        => array( 'content-rules', __( 'Content Rules', 'memberglut' ), true ),
			'memberglut-roles'        => array( 'roles', __( 'Roles & Capabilities', 'memberglut' ), true ),
			'memberglut-payments'     => array( 'payments', __( 'Payments', 'memberglut' ), true ),
			'memberglut-coupons'      => array( 'coupons', __( 'Coupons', 'memberglut' ), true ),
			'memberglut-emails'       => array( 'emails', __( 'Emails', 'memberglut' ), true ),
			'memberglut-forms'        => array( 'forms-pages', __( 'Forms & Pages', 'memberglut' ), true ),
			'memberglut-tools'        => array( 'tools', __( 'Data & Logs', 'memberglut' ), true ),
			'memberglut-settings'     => array( 'settings', __( 'Global Settings', 'memberglut' ), true ),
			'memberglut-pro-features' => array( 'pro-features', __( 'Pro Features', 'memberglut' ), true ),
			// Hidden screens, opened from the lists.
			'memberglut-member'       => array( 'member-detail', __( 'Member', 'memberglut' ), false ),
			'memberglut-plan-editor'  => array( 'plan-editor', __( 'Edit Plan', 'memberglut' ), false ),
			'memberglut-rule-editor'  => array( 'rule-editor', __( 'Edit Rule', 'memberglut' ), false ),
		);
		return $this->pages;
	}

	/**
	 * Current MemberGlut page slug, or '' when not on one.
	 *
	 * @return string
	 */
	private function current_page() {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';
		return isset( $this->pages()[ $page ] ) ? $page : '';
	}

	/**
	 * Whether the current request is a MemberGlut React screen.
	 *
	 * @return bool
	 */
	public function is_app_page() {
		return '' !== $this->current_page();
	}

	/**
	 * Register the admin menu.
	 *
	 * @return void
	 */
	public function register_menus() {
		add_menu_page(
			__( 'MemberGlut', 'memberglut' ),
			__( 'MemberGlut', 'memberglut' ),
			MemberGlut_Permissions::screen_cap( 'memberglut' ),
			'memberglut',
			array( $this, 'render_page' ),
			MEMBERGLUT_PLUGIN_URL . 'global-assets/images/logo.svg',
			30
		);

		foreach ( $this->pages() as $slug => $page ) {
			$label = $page[1];
			if ( 'memberglut-pro-features' === $slug ) {
				$label = '<span style="color:#fbbf24;">' . esc_html__( '⭐ Pro Features', 'memberglut' ) . '</span>';
			}
			add_submenu_page(
				$page[2] ? 'memberglut' : '__memberglut_hidden',
				$page[1],
				$label,
				MemberGlut_Permissions::screen_cap( $slug ),
				$slug,
				array( $this, 'render_page' )
			);
		}
	}

	/**
	 * Browser tab title.
	 *
	 * @param string $admin_title Full admin title.
	 * @param string $title       Page title.
	 * @return string
	 */
	public function filter_admin_title( $admin_title, $title ) {
		$page = $this->is_app_page() ? $this->current_page() : '';
		if ( '' === $page ) {
			return $admin_title;
		}
		return $this->pages()[ $page ][1] . ' ‹ MemberGlut ‹ ' . get_bloginfo( 'name' );
	}

	/**
	 * Body class for styling.
	 *
	 * @param string $classes Existing classes.
	 * @return string
	 */
	public function add_body_class( $classes ) {
		return $this->is_app_page() ? $classes . ' memberglut-admin-page' : $classes;
	}

	/**
	 * Menu icon opacity everywhere; full-width layout on MemberGlut screens.
	 *
	 * @return void
	 */
	public function admin_head_styles() {
		echo '<style>#adminmenu .toplevel_page_memberglut .wp-menu-image img{opacity:1!important;width:20px;height:20px;padding-top:7px;}</style>';
		if ( ! $this->is_app_page() ) {
			return;
		}
		?>
		<style>
			#adminmenumain, #wpadminbar, #wpfooter, .update-nag, .notice, .error, .updated { display: none !important; }
			html.wp-toolbar { padding-top: 0 !important; height: auto !important; overflow: auto !important; }
			body { overflow: auto !important; height: auto !important; }
			#wpwrap { height: auto !important; min-height: 100vh !important; overflow: visible !important; }
			#wpcontent { margin-left: 0 !important; padding-left: 0 !important; height: auto !important; overflow: visible !important; }
			#wpbody { padding-top: 0 !important; height: auto !important; overflow: visible !important; }
			#wpbody-content { overflow: visible !important; padding-bottom: 0 !important; }
			.wrap { margin: 0 !important; }
			.mg-skeleton { animation: mg-shimmer 1.5s infinite; background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%); background-size: 200% 100%; border-radius: 6px; }
			@keyframes mg-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
		</style>
		<?php
	}

	/**
	 * Enqueue the bundle of the current screen.
	 *
	 * @return void
	 */
	public function enqueue_assets() {
		if ( ! $this->is_app_page() ) {
			return;
		}

		$page       = $this->current_page();
		$entry      = $this->pages()[ $page ][0];
		$build_url  = MEMBERGLUT_PLUGIN_URL . 'resources';
		$build_path = MEMBERGLUT_PLUGIN_PATH . 'resources';
		$handle     = 'memberglut-' . $entry;

		wp_enqueue_script( 'wp-i18n' );

		if ( file_exists( $build_path . '/' . $entry . '.js' ) ) {
			wp_enqueue_script( $handle, $build_url . '/' . $entry . '.js', array( 'wp-i18n' ), MEMBERGLUT_VERSION, true );
			wp_set_script_translations( $handle, 'memberglut', MEMBERGLUT_PLUGIN_PATH . 'languages' );
		}

		$css_files = glob( $build_path . '/assets/*.css' );
		foreach ( (array) $css_files as $css_file ) {
			$name = pathinfo( $css_file, PATHINFO_FILENAME );
			wp_enqueue_style( 'memberglut-' . $name, $build_url . '/assets/' . basename( $css_file ), array(), MEMBERGLUT_VERSION );
		}

		$url  = static function ( $slug ) {
			return admin_url( 'admin.php?page=' . $slug );
		};
		$data = array(
			'ajax_url'      => admin_url( 'admin-ajax.php' ),
			'nonce'         => wp_create_nonce( 'memberglut_nonce' ),
			'rest_url'      => esc_url_raw( rest_url( 'memberglut/v1/' ) ),
			'rest_nonce'    => wp_create_nonce( 'wp_rest' ),
			'plugin_url'    => MEMBERGLUT_PLUGIN_URL,
			'site_url'      => home_url(),
			'dashboard_url' => admin_url( 'index.php' ),
			'version'       => MEMBERGLUT_VERSION,
			'lookups'       => MemberGlut_Lookups::all(),
			'rtl'           => is_rtl(),
			'user'          => array(
				'id'   => get_current_user_id(),
				'name'  => wp_get_current_user()->display_name,
				'email' => wp_get_current_user()->user_email,
			),
			'pages'         => array(
				'dashboard'     => $url( 'memberglut' ),
				'members'       => $url( 'memberglut-members' ),
				'member_detail' => $url( 'memberglut-member' ),
				'plans'         => $url( 'memberglut-plans' ),
				'plan_editor'   => $url( 'memberglut-plan-editor' ),
				'rules'         => $url( 'memberglut-rules' ),
				'rule_editor'   => $url( 'memberglut-rule-editor' ),
				'roles'         => $url( 'memberglut-roles' ),
				'payments'      => $url( 'memberglut-payments' ),
				'coupons'       => $url( 'memberglut-coupons' ),
				'emails'        => $url( 'memberglut-emails' ),
				'forms'         => $url( 'memberglut-forms' ),
				'settings'      => $url( 'memberglut-settings' ),
				'tools'         => $url( 'memberglut-tools' ),
				'pro_features'  => $url( 'memberglut-pro-features' ),
			),
		);

		if ( wp_script_is( $handle, 'enqueued' ) ) {
			wp_localize_script( $handle, 'memberglut_admin', $data );
		} else {
			wp_register_script( 'memberglut-bootstrap', '', array(), MEMBERGLUT_VERSION, false );
			wp_enqueue_script( 'memberglut-bootstrap' );
			wp_localize_script( 'memberglut-bootstrap', 'memberglut_admin', $data );
		}
	}

	/**
	 * Vite builds ES modules.
	 *
	 * @param string $tag    Script tag.
	 * @param string $handle Script handle.
	 * @return string
	 */
	public function add_module_attribute( $tag, $handle ) {
		if ( 0 === strpos( $handle, 'memberglut-' ) && 'memberglut-bootstrap' !== $handle && 'memberglut-admin' !== $handle && $this->is_app_page() ) {
			$tag = str_replace( '<script ', '<script type="module" ', $tag );
		}
		return $tag;
	}

	/**
	 * Page shell: the React root with a skeleton that is replaced when the bundle loads.
	 *
	 * @return void
	 */
	public function render_page() {
		if ( ! current_user_can( MemberGlut_Permissions::screen_cap( $this->current_page() ) ) ) {
			wp_die( esc_html__( 'Sorry, you are not allowed to access this page.', 'memberglut' ) );
		}

		if ( ! file_exists( MEMBERGLUT_PLUGIN_PATH . 'resources/' . $this->pages()[ $this->current_page() ][0] . '.js' ) ) {
			echo '<div class="wrap" style="padding:40px;font-size:15px;"><h1>MemberGlut</h1><p>';
			esc_html_e( 'The admin screens are not built yet. Run "npm install" and "npm run build" in the plugin folder.', 'memberglut' );
			echo '</p></div>';
			return;
		}
		?>
		<div id="memberglut-root">
			<header style="display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 24px;background:linear-gradient(135deg,#0f0f1a 0%,#1a1a2e 50%,#16213e 100%);">
				<div style="display:flex;gap:12px;align-items:center;">
					<div style="width:38px;height:38px;border-radius:8px;background:rgba(255,255,255,.08)"></div>
					<div style="width:150px;height:30px;border-radius:6px;background:rgba(255,255,255,.08)"></div>
				</div>
				<div style="width:480px;max-width:50%;height:36px;border-radius:8px;background:rgba(255,255,255,.06)"></div>
				<div style="width:90px;height:32px;border-radius:8px;background:rgba(255,255,255,.08)"></div>
			</header>
			<div style="max-width:1280px;margin:0 auto;padding:32px;">
				<div class="mg-skeleton" style="width:220px;height:30px;margin-bottom:10px;"></div>
				<div class="mg-skeleton" style="width:340px;height:16px;margin-bottom:28px;"></div>
				<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px;">
					<?php for ( $i = 0; $i < 4; $i++ ) : ?>
						<div style="background:#fff;border:1px solid #e8ecf1;border-radius:12px;padding:20px;">
							<div class="mg-skeleton" style="width:90px;height:14px;"></div>
							<div class="mg-skeleton" style="width:70px;height:28px;margin-top:12px;"></div>
						</div>
					<?php endfor; ?>
				</div>
				<div style="background:#fff;border:1px solid #e8ecf1;border-radius:14px;padding:20px;">
					<?php for ( $i = 0; $i < 6; $i++ ) : ?>
						<div class="mg-skeleton" style="height:18px;margin:14px 0;"></div>
					<?php endfor; ?>
				</div>
			</div>
		</div>
		<?php
	}
}
