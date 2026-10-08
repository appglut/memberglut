<?php
/**
 * WPML / Polylang: plan names, descriptions and features (stored in the plans table) are registered as strings
 * and shown translated on the front end. Settings, form labels and emails are covered by wpml-config.xml.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_WPML class.
 */
class MemberGlut_WPML {

	const CONTEXT = 'MemberGlut plans';

	/**
	 * Hook into WordPress when a multilingual plugin is active.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'plugins_loaded', array( __CLASS__, 'setup' ), 20 );
	}

	/**
	 * Register hooks once plugins are loaded.
	 *
	 * @return void
	 */
	public static function setup() {
		if ( ! defined( 'ICL_SITEPRESS_VERSION' ) && ! function_exists( 'pll_register_string' ) ) {
			return;
		}
		add_action( 'memberglut_plan_saved', array( __CLASS__, 'register' ) );
		if ( ! is_admin() ) {
			add_filter( 'memberglut_plan', array( __CLASS__, 'translate' ) );
		}
	}

	/**
	 * Strings of a plan: name => value.
	 *
	 * @param array $plan Plan.
	 * @return array
	 */
	private static function strings( $plan ) {
		$out = array(
			'plan_' . $plan['id'] . '_name'        => $plan['name'],
			'plan_' . $plan['id'] . '_description' => (string) $plan['description'],
		);
		foreach ( array_values( (array) $plan['features'] ) as $i => $f ) {
			$out[ 'plan_' . $plan['id'] . '_feature_' . $i ] = is_array( $f ) ? (string) ( isset( $f['text'] ) ? $f['text'] : '' ) : (string) $f;
		}
		return array_filter( $out, 'strlen' );
	}

	/**
	 * Register a plan's strings.
	 *
	 * @param array $plan Plan.
	 * @return void
	 */
	public static function register( $plan ) {
		foreach ( self::strings( $plan ) as $name => $value ) {
			if ( function_exists( 'pll_register_string' ) ) {
				pll_register_string( $name, $value, self::CONTEXT, false );
			} else {
				// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- Core / third-party hook fired on purpose.
				do_action( 'wpml_register_single_string', self::CONTEXT, $name, $value );
			}
		}
	}

	/**
	 * Translate one string.
	 *
	 * @param string $name  Name.
	 * @param string $value Original.
	 * @return string
	 */
	private static function t( $name, $value ) {
		if ( function_exists( 'pll__' ) ) {
			return pll__( $value );
		}
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- Core / third-party hook fired on purpose.
		return (string) apply_filters( 'wpml_translate_single_string', $value, self::CONTEXT, $name );
	}

	/**
	 * Translated plan.
	 *
	 * @param array $plan Plan.
	 * @return array
	 */
	public static function translate( $plan ) {
		$plan['name']        = self::t( 'plan_' . $plan['id'] . '_name', $plan['name'] );
		$plan['description'] = self::t( 'plan_' . $plan['id'] . '_description', (string) $plan['description'] );
		$features            = array_values( (array) $plan['features'] );
		foreach ( $features as $i => $f ) {
			if ( is_array( $f ) && isset( $f['text'] ) ) {
				$features[ $i ]['text'] = self::t( 'plan_' . $plan['id'] . '_feature_' . $i, $f['text'] );
			} elseif ( is_string( $f ) ) {
				$features[ $i ] = self::t( 'plan_' . $plan['id'] . '_feature_' . $i, $f );
			}
		}
		$plan['features'] = $features;
		return $plan;
	}
}
