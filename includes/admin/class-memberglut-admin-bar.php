<?php
/**
 * Front-end toolbar: shows whether the current post is restricted (and by what) and protects it in one click.
 *
 * Shown on single posts to users who can edit the post and manage rules. The quick actions write the same
 * per-post setting as the editor panel ("MemberGlut box").
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Admin_Bar class.
 */
class MemberGlut_Admin_Bar {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'admin_bar_menu', array( __CLASS__, 'menu' ), 85 );
		add_action( 'admin_post_memberglut_quick_restrict', array( __CLASS__, 'handle' ) );
	}

	/**
	 * Post of the current front-end view the user may change, or null.
	 *
	 * @return WP_Post|null
	 */
	private static function current_post() {
		if ( is_admin() || ! is_singular() ) {
			return null;
		}
		$post = get_queried_object();
		if ( ! $post instanceof WP_Post || ! in_array( $post->post_type, MemberGlut_Post_Access_Admin::post_types(), true ) ) {
			return null;
		}
		if ( ! current_user_can( 'edit_post', $post->ID ) || ! current_user_can( 'memberglut_manage_rules' ) ) {
			return null;
		}
		return $post;
	}

	/**
	 * Action link.
	 *
	 * @param int    $post_id Post.
	 * @param string $mode    public|logged_in|plan|clear.
	 * @param int    $plan    Plan.
	 * @return string
	 */
	private static function link( $post_id, $mode, $plan = 0 ) {
		return wp_nonce_url(
			add_query_arg(
				array(
					'action' => 'memberglut_quick_restrict',
					'post'   => $post_id,
					'mode'   => $mode,
					'plan'   => $plan,
				),
				admin_url( 'admin-post.php' )
			),
			'memberglut_quick_restrict_' . $post_id
		);
	}

	/**
	 * Add the toolbar menu.
	 *
	 * @param WP_Admin_Bar $bar Toolbar.
	 * @return void
	 */
	public static function menu( $bar ) {
		$post = self::current_post();
		if ( ! $post ) {
			return;
		}
		$own  = MemberGlut_Access::post_settings( $post->ID );
		$rule = $own ? null : MemberGlut_Rules::rule_for_post( $post );
		if ( $own && 'everyone' !== $own['who'] ) {
			$labels = array(
				'logged_in'  => __( 'logged-in users', 'memberglut' ),
				'logged_out' => __( 'logged-out visitors', 'memberglut' ),
				'plans'      => __( 'chosen plans', 'memberglut' ),
				'roles'      => __( 'chosen roles', 'memberglut' ),
			);
			/* translators: %s: audience */
			$title = sprintf( __( 'Restricted: %s', 'memberglut' ), isset( $labels[ $own['who'] ] ) ? $labels[ $own['who'] ] : $own['who'] );
			$icon  = 'dashicons-lock';
		} elseif ( $rule ) {
			/* translators: %s: rule title */
			$title = sprintf( __( 'Restricted by rule: %s', 'memberglut' ), isset( $rule['title'] ) ? $rule['title'] : '#' . ( isset( $rule['id'] ) ? $rule['id'] : '' ) );
			$icon  = 'dashicons-lock';
		} else {
			$title = __( 'Public', 'memberglut' );
			$icon  = 'dashicons-unlock';
		}
		$bar->add_node(
			array(
				'id'    => 'memberglut-access',
				'title' => '<span class="ab-icon dashicons ' . esc_attr( $icon ) . '" style="top:2px"></span><span class="ab-label">' . esc_html( $title ) . '</span>',
				'href'  => get_edit_post_link( $post->ID ),
				'meta'  => array( 'title' => __( 'MemberGlut access for this page', 'memberglut' ) ),
			)
		);
		$bar->add_node( array( 'parent' => 'memberglut-access', 'id' => 'memberglut-access-logged', 'title' => esc_html__( 'Restrict to logged-in users', 'memberglut' ), 'href' => self::link( $post->ID, 'logged_in' ) ) );
		foreach ( MemberGlut_Plans::all( 'active' ) as $plan ) {
			/* translators: %s: plan name */
			$bar->add_node( array( 'parent' => 'memberglut-access', 'id' => 'memberglut-access-plan-' . (int) $plan['id'], 'title' => esc_html( sprintf( __( 'Restrict to %s members', 'memberglut' ), $plan['name'] ) ), 'href' => self::link( $post->ID, 'plan', (int) $plan['id'] ) ) );
		}
		if ( $own ) {
			$bar->add_node( array( 'parent' => 'memberglut-access', 'id' => 'memberglut-access-clear', 'title' => esc_html__( 'Remove this page’s own setting', 'memberglut' ), 'href' => self::link( $post->ID, 'clear' ) ) );
		}
		if ( $rule || ! $own ) {
			$bar->add_node( array( 'parent' => 'memberglut-access', 'id' => 'memberglut-access-public', 'title' => esc_html__( 'Make public (override rules)', 'memberglut' ), 'href' => self::link( $post->ID, 'public' ) ) );
		}
		if ( $rule && ! empty( $rule['id'] ) ) {
			$bar->add_node( array( 'parent' => 'memberglut-access', 'id' => 'memberglut-access-rule', 'title' => esc_html__( 'Edit the rule', 'memberglut' ), 'href' => admin_url( 'admin.php?page=memberglut-rule-editor&id=' . (int) $rule['id'] ) ) );
		}
	}

	/**
	 * Apply a quick action.
	 *
	 * @return void
	 */
	public static function handle() {
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- Verified below.
		$post_id = isset( $_GET['post'] ) ? absint( $_GET['post'] ) : 0;
		$mode    = isset( $_GET['mode'] ) ? sanitize_key( wp_unslash( $_GET['mode'] ) ) : '';
		$plan    = isset( $_GET['plan'] ) ? absint( $_GET['plan'] ) : 0;
		// phpcs:enable
		check_admin_referer( 'memberglut_quick_restrict_' . $post_id );
		if ( ! $post_id || ! current_user_can( 'edit_post', $post_id ) || ! current_user_can( 'memberglut_manage_rules' ) ) {
			wp_die( esc_html__( 'You are not allowed to change this page.', 'memberglut' ), 403 );
		}
		$value = '';
		if ( 'logged_in' === $mode ) {
			$value = array( 'who' => 'logged_in' );
		} elseif ( 'plan' === $mode && $plan && MemberGlut_Plans::get( $plan ) ) {
			$value = array( 'who' => 'plans', 'plans' => array( $plan ) );
		} elseif ( 'public' === $mode ) {
			$value = array( 'who' => 'everyone' );
		}
		$json = $value ? MemberGlut_Post_Access_Admin::sanitize_json( $value ) : '';
		if ( '' === $json ) {
			delete_post_meta( $post_id, MemberGlut_Access::META );
		} else {
			update_post_meta( $post_id, MemberGlut_Access::META, wp_slash( $json ) );
		}
		/* translators: %s: post title */
		memberglut_event( 'post_access', sprintf( __( 'Access of “%s” changed from the toolbar', 'memberglut' ), get_the_title( $post_id ) ), array( 'object_type' => 'post', 'object_id' => $post_id ) );
		wp_safe_redirect( get_permalink( $post_id ) );
		exit;
	}
}
