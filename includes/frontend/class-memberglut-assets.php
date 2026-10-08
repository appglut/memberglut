<?php
/**
 * Front-end CSS / JS (Advanced › Load MemberGlut CSS & JS: only where used, or everywhere).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Assets class.
 */
class MemberGlut_Assets {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'register' ), 5 );
		add_action( 'login_enqueue_scripts', array( __CLASS__, 'register' ), 5 );
	}

	/**
	 * Register the assets; enqueue them everywhere when the setting says so.
	 *
	 * @return void
	 */
	public static function register() {
		wp_register_style( 'memberglut', MEMBERGLUT_PLUGIN_URL . 'assets/frontend/memberglut.css', array(), MEMBERGLUT_VERSION );
		wp_register_script( 'memberglut', MEMBERGLUT_PLUGIN_URL . 'assets/frontend/memberglut.js', array(), MEMBERGLUT_VERSION, true );
		wp_localize_script(
			'memberglut',
			'memberglutFront',
			array(
				'rest'     => esc_url_raw( rest_url( 'memberglut/v1/public/' ) ),
				'nonce'    => wp_create_nonce( 'wp_rest' ),
				'currency' => MemberGlut_Lookups::currency(),
				'i18n'     => array(
					'error'     => __( 'Something went wrong. Please try again.', 'memberglut' ),
					'show'      => __( 'Show password', 'memberglut' ),
					'hide'      => __( 'Hide password', 'memberglut' ),
					'weak'      => __( 'Weak', 'memberglut' ),
					'medium'    => __( 'Medium', 'memberglut' ),
					'strong'    => __( 'Strong', 'memberglut' ),
					'veryWeak'  => __( 'Very weak', 'memberglut' ),
					'mismatch'  => __( 'The passwords do not match.', 'memberglut' ),
					'applying'  => __( 'Checking…', 'memberglut' ),
					'removed'   => __( 'Coupon removed.', 'memberglut' ),
				),
			)
		);
		if ( 'everywhere' === memberglut_setting( 'load_assets', 'needed' ) ) {
			self::need();
		}
	}

	/**
	 * Enqueue the front-end assets (safe to call late: WordPress prints late styles in the footer).
	 *
	 * @param bool $script Also the script.
	 * @return void
	 */
	public static function need( $script = true ) {
		if ( ! did_action( 'wp_enqueue_scripts' ) && ! did_action( 'login_enqueue_scripts' ) ) {
			add_action( 'wp_enqueue_scripts', static function () use ( $script ) {
				self::need( $script );
			}, 20 );
			return;
		}
		wp_enqueue_style( 'memberglut' );
		if ( $script ) {
			wp_enqueue_script( 'memberglut' );
		}
	}
}
