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
		add_action( 'init', array( __CLASS__, 'register' ) );
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
			)
		);
	}

	/**
	 * Register all shortcodes.
	 *
	 * @return void
	 */
	public static function register() {
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
}
