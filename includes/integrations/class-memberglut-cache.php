<?php
/**
 * Keeps member-specific pages out of page caches (Advanced › Exclude member pages from cache).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Cache class.
 */
class MemberGlut_Cache {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'template_redirect', array( __CLASS__, 'member_pages' ), 1 );
		add_filter( 'rocket_cache_reject_uri', array( __CLASS__, 'rocket_reject' ) );
	}

	/**
	 * Send no-cache headers and tell caching plugins not to cache this page.
	 *
	 * @return void
	 */
	public static function no_cache() {
		if ( ! memberglut_setting( 'exclude_cache', true ) ) {
			return;
		}
		if ( ! defined( 'DONOTCACHEPAGE' ) ) {
			define( 'DONOTCACHEPAGE', true );
		}
		if ( ! defined( 'DONOTCACHEOBJECT' ) ) {
			define( 'DONOTCACHEOBJECT', true );
		}
		if ( ! headers_sent() ) {
			nocache_headers();
		}
		do_action( 'litespeed_control_set_nocache', 'memberglut member page' );
	}

	/**
	 * Account, checkout, login, register, lost password and thank-you pages are never cached.
	 *
	 * @return void
	 */
	public static function member_pages() {
		if ( ! is_singular() ) {
			return;
		}
		$id = (int) get_queried_object_id();
		foreach ( array( 'account', 'register', 'login', 'lost', 'thanks' ) as $slot ) {
			if ( $id && memberglut_page_id( $slot ) === $id ) {
				self::no_cache();
				return;
			}
		}
	}

	/**
	 * WP Rocket: never cache the member pages.
	 *
	 * @param array $uris URIs.
	 * @return array
	 */
	public static function rocket_reject( $uris ) {
		if ( ! memberglut_setting( 'exclude_cache', true ) ) {
			return $uris;
		}
		foreach ( array( 'account', 'register', 'login', 'lost', 'thanks' ) as $slot ) {
			$url = memberglut_page_url( $slot );
			if ( $url ) {
				$uris[] = wp_parse_url( $url, PHP_URL_PATH ) . '(.*)';
			}
		}
		return $uris;
	}
}
