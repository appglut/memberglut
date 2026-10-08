<?php
/**
 * Tools › Site Health: a MemberGlut section in Info and a test per status check (Data & Logs › System status).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Site_Health class.
 */
class MemberGlut_Site_Health {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_filter( 'debug_information', array( __CLASS__, 'info' ) );
		add_filter( 'site_status_tests', array( __CLASS__, 'tests' ) );
	}

	/**
	 * Info tab section.
	 *
	 * @param array $info Info.
	 * @return array
	 */
	public static function info( $info ) {
		$fields = array();
		foreach ( MemberGlut_Tools::environment() as $label => $value ) {
			$fields[ sanitize_key( $label ) ] = array( 'label' => $label, 'value' => $value );
		}
		foreach ( MemberGlut_Tools::status()['counts'] as $key => $n ) {
			$fields[ 'count_' . $key ] = array( 'label' => ucfirst( $key ), 'value' => (string) $n );
		}
		foreach ( MemberGlut_Gateways::all() as $g ) {
			if ( $g->is_enabled() ) {
				/* translators: %s: gateway */
				$fields[ 'gateway_' . $g->id ] = array( 'label' => sprintf( __( 'Gateway: %s', 'memberglut' ), $g->title() ), 'value' => $g->is_configured() ? $g->mode() : __( 'Missing keys', 'memberglut' ) );
			}
		}
		$info['memberglut'] = array( 'label' => 'MemberGlut', 'fields' => $fields );
		return $info;
	}

	/**
	 * Register direct tests.
	 *
	 * @param array $tests Tests.
	 * @return array
	 */
	public static function tests( $tests ) {
		foreach ( array( 'pages', 'scheduler', 'mail' ) as $key ) {
			$tests['direct'][ 'memberglut_' . $key ] = array(
				'label' => 'MemberGlut',
				'test'  => static function () use ( $key ) {
					return MemberGlut_Site_Health::result( $key );
				},
			);
		}
		return $tests;
	}

	/**
	 * Result of one check in Site Health format.
	 *
	 * @param string $key Check key.
	 * @return array
	 */
	public static function result( $key ) {
		$check = null;
		foreach ( MemberGlut_Tools::checks() as $c ) {
			if ( $c['key'] === $key ) {
				$check = $c;
			}
		}
		if ( ! $check ) {
			$check = array( 'ok' => true, 'label' => $key, 'note' => '' );
		}
		return array(
			'label'       => $check['label'],
			'status'      => $check['ok'] ? 'good' : 'recommended',
			'badge'       => array( 'label' => 'MemberGlut', 'color' => $check['ok'] ? 'blue' : 'orange' ),
			'description' => '<p>' . esc_html( $check['note'] ? $check['note'] : __( 'Everything looks fine.', 'memberglut' ) ) . '</p>',
			'actions'     => '<p><a href="' . esc_url( admin_url( 'admin.php?page=memberglut-tools&tab=status' ) ) . '">' . esc_html__( 'Open MemberGlut system status', 'memberglut' ) . '</a></p>',
			'test'        => 'memberglut_' . $key,
		);
	}
}
