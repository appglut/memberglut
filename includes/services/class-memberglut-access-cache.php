<?php
/**
 * Version number for cached access data (rule post sets, hidden IDs). Bumping it invalidates them cheaply.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Access_Cache class.
 */
class MemberGlut_Access_Cache {

	const OPTION = 'memberglut_access_version';

	/**
	 * Current version.
	 *
	 * @return string
	 */
	public static function version() {
		return (string) get_option( self::OPTION, '1' );
	}

	/**
	 * Invalidate cached access data.
	 *
	 * @return void
	 */
	public static function bump() {
		update_option( self::OPTION, (string) microtime( true ), true );
		MemberGlut_Access::flush();
	}
}
