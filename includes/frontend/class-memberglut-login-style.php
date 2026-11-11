<?php
/**
 * Branding of wp-login.php (Global Settings › Login page design): logo, colours, background and form style.
 *
 * Only prints CSS when "Customize the WordPress login page" is on. The MemberGlut front-end forms are not affected.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Login_Style class.
 */
class MemberGlut_Login_Style {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'login_enqueue_scripts', array( __CLASS__, 'css' ), 20 );
		add_filter( 'login_headerurl', array( __CLASS__, 'logo_url' ) );
		add_filter( 'login_headertext', array( __CLASS__, 'logo_text' ) );
	}

	/**
	 * Whether the customizer is on.
	 *
	 * @return bool
	 */
	private static function on() {
		return (bool) memberglut_setting( 'login_style', false );
	}

	/**
	 * The logo links to the home page instead of wordpress.org.
	 *
	 * @param string $url URL.
	 * @return string
	 */
	public static function logo_url( $url ) {
		return self::on() ? home_url( '/' ) : $url;
	}

	/**
	 * The logo text is the site name.
	 *
	 * @param string $text Text.
	 * @return string
	 */
	public static function logo_text( $text ) {
		return self::on() ? get_bloginfo( 'name' ) : $text;
	}

	/**
	 * A safe hex colour or ''.
	 *
	 * @param string $key Setting.
	 * @return string
	 */
	private static function color( $key ) {
		$c = sanitize_hex_color( (string) memberglut_setting( $key, '' ) );
		return $c ? $c : '';
	}

	/**
	 * Build the CSS.
	 *
	 * @return string
	 */
	public static function build() {
		$css   = array();
		$logo  = esc_url_raw( (string) memberglut_setting( 'login_logo', '' ) );
		$width = max( 40, min( 320, (int) memberglut_setting( 'login_logo_width', 84 ) ) );
		if ( $logo ) {
			$css[] = sprintf( '#login h1 a,.login h1 a{background-image:url("%s");background-size:contain;background-position:center;width:%dpx;height:%dpx;max-width:100%%}', esc_url( $logo ), $width, (int) round( $width * 0.75 ) );
		} elseif ( memberglut_setting( 'login_hide_logo', false ) ) {
			$css[] = '#login h1{display:none}';
		}
		$bg    = self::color( 'login_bg_color' );
		$image = esc_url_raw( (string) memberglut_setting( 'login_bg_image', '' ) );
		if ( $bg || $image ) {
			$css[] = 'body.login{' . ( $bg ? 'background-color:' . $bg . ';' : '' ) . ( $image ? 'background-image:url("' . esc_url( $image ) . '");background-size:cover;background-position:center;background-attachment:fixed;' : '' ) . '}';
		}
		$form = self::color( 'login_form_bg' );
		if ( memberglut_setting( 'login_form_transparent', false ) ) {
			$css[] = '.login form{background:transparent;box-shadow:none;border:0}';
		} elseif ( $form ) {
			$css[] = '.login form{background:' . $form . '}';
		}
		$radius = max( 0, min( 32, (int) memberglut_setting( 'login_radius', 8 ) ) );
		$css[]  = '.login form,.login .message,.login .notice,.login #login_error{border-radius:' . $radius . 'px}';
		$text   = self::color( 'login_text_color' );
		if ( $text ) {
			$css[] = '.login label,.login #nav a,.login #backtonav a,.login #backtoblog a,.login .privacy-policy-page-link a{color:' . $text . '}';
		}
		$btn = self::color( 'login_button_color' );
		if ( $btn ) {
			$css[] = '.login .button-primary,.wp-core-ui .button-primary{background:' . $btn . ';border-color:' . $btn . ';box-shadow:none;text-shadow:none}';
			$css[] = '.login .button-primary:hover,.login .button-primary:focus{filter:brightness(.92);background:' . $btn . ';border-color:' . $btn . '}';
			$css[] = '.login input[type=text]:focus,.login input[type=password]:focus,.login input[type=email]:focus{border-color:' . $btn . ';box-shadow:0 0 0 1px ' . $btn . '}';
		}
		if ( memberglut_setting( 'login_hide_back', false ) ) {
			$css[] = '#backtoblog{display:none}';
		}
		$custom = (string) memberglut_setting( 'login_custom_css', '' );
		if ( '' !== trim( $custom ) ) {
			$css[] = wp_strip_all_tags( $custom );
		}
		return implode( "\n", $css );
	}

	/**
	 * Print the CSS on wp-login.php.
	 *
	 * @return void
	 */
	public static function css() {
		if ( ! self::on() ) {
			return;
		}
		wp_register_style( 'memberglut-login-style', false, array(), MEMBERGLUT_VERSION );
		wp_enqueue_style( 'memberglut-login-style' );
		wp_add_inline_style( 'memberglut-login-style', self::build() );
	}
}
