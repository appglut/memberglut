<?php
/**
 * Class autoloader.
 *
 * MemberGlut_Foo_Bar is loaded from class-memberglut-foo-bar.php in one of the include folders.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Autoloader class.
 */
class MemberGlut_Autoloader {

	/**
	 * Folders searched, relative to includes/.
	 *
	 * @var string[]
	 */
	private static $dirs = array( 'core', 'models', 'repositories', 'services', 'rest', 'gateways', 'frontend', 'admin', 'integrations', '' );

	/**
	 * Register the autoloader.
	 *
	 * @return void
	 */
	public static function register() {
		spl_autoload_register( array( __CLASS__, 'load' ) );
	}

	/**
	 * Load a class file.
	 *
	 * @param string $class Class name.
	 * @return void
	 */
	public static function load( $class ) {
		if ( 0 !== strpos( $class, 'MemberGlut_' ) ) {
			return;
		}
		$file = 'class-' . strtolower( str_replace( '_', '-', $class ) ) . '.php';
		foreach ( self::$dirs as $dir ) {
			$path = MEMBERGLUT_PLUGIN_PATH . 'includes/' . ( $dir ? $dir . '/' : '' ) . $file;
			if ( is_readable( $path ) ) {
				require_once $path;
				return;
			}
		}
	}
}
