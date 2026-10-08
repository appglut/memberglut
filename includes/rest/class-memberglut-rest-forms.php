<?php
/**
 * Forms & Pages endpoints: GET/PUT /forms, POST /forms/pages/create.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Forms class.
 */
class MemberGlut_REST_Forms extends MemberGlut_REST_Controller {

	const CAP = 'memberglut_manage_settings';

	/**
	 * Page slots: key => [ title, shortcode ].
	 *
	 * @return array
	 */
	public static function slots() {
		return array(
			'page_register' => array( __( 'Register', 'memberglut' ), '[memberglut_register]' ),
			'page_login'    => array( __( 'Login', 'memberglut' ), '[memberglut_login]' ),
			'page_account'  => array( __( 'My Account', 'memberglut' ), '[memberglut_account]' ),
			'page_lost'     => array( __( 'Lost Password', 'memberglut' ), '[memberglut_lost_password]' ),
			'page_pricing'  => array( __( 'Pricing', 'memberglut' ), '[memberglut_plans]' ),
			'page_thanks'   => array( __( 'Thank You', 'memberglut' ), '[memberglut_receipt]' ),
		);
	}

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$this->route( '/forms', 'GET', 'get', self::CAP );
		$this->route( '/forms', 'PUT,POST', 'update', self::CAP );
		$this->route( '/forms/pages/create', 'POST', 'create_pages', self::CAP );
	}

	/**
	 * Values + page health.
	 *
	 * @return WP_REST_Response
	 */
	public function get() {
		return rest_ensure_response( array( 'values' => MemberGlut_Settings::forms(), 'pages' => $this->page_status() ) );
	}

	/**
	 * Whether each selected page contains its shortcode or block.
	 *
	 * @return array
	 */
	private function page_status() {
		$out = array();
		foreach ( self::slots() as $key => $slot ) {
			$id   = (int) memberglut_form_setting( $key, 0 );
			$post = $id ? get_post( $id ) : null;
			$tag  = trim( strtok( $slot[1], ' ]' ), '[' );
			$out[ $key ] = array(
				'id'         => $id,
				'title'      => $post ? $post->post_title : '',
				'status'     => $post ? $post->post_status : '',
				'url'        => $post ? get_permalink( $post ) : '',
				'edit_url'   => $post ? get_edit_post_link( $id, 'raw' ) : '',
				'has_code'   => $post ? ( has_shortcode( $post->post_content, $tag ) || false !== strpos( $post->post_content, '<!-- wp:memberglut/' . str_replace( array( 'memberglut_', '_' ), array( '', '-' ), $tag ) ) ) : false,
				'shortcode'  => $slot[1],
			);
		}
		return $out;
	}

	/**
	 * Save.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function update( WP_REST_Request $request ) {
		$b      = $this->body( $request );
		$values = isset( $b['values'] ) && is_array( $b['values'] ) ? $b['values'] : $b;
		$saved  = MemberGlut_Settings::update_forms( $values );
		if ( is_wp_error( $saved ) ) {
			return $this->as_rest_error( $saved );
		}
		return $this->get();
	}

	/**
	 * Create pages for empty slots.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function create_pages( WP_REST_Request $request ) {
		$b       = $this->body( $request );
		$wanted  = isset( $b['slots'] ) ? array_map( 'sanitize_key', (array) $b['slots'] ) : array_keys( self::slots() );
		$created = array();
		foreach ( self::slots() as $key => $slot ) {
			if ( ! in_array( $key, $wanted, true ) ) {
				continue;
			}
			$current = (int) memberglut_form_setting( $key, 0 );
			if ( $current && 'publish' === get_post_status( $current ) ) {
				continue;
			}
			$id = wp_insert_post(
				array(
					'post_type'    => 'page',
					'post_status'  => 'publish',
					'post_title'   => $slot[0],
					'post_content' => '<!-- wp:shortcode -->' . $slot[1] . '<!-- /wp:shortcode -->',
					'post_author'  => get_current_user_id(),
					'comment_status' => 'closed',
				),
				true
			);
			if ( ! is_wp_error( $id ) ) {
				$created[ $key ] = $id;
			}
		}
		if ( $created ) {
			MemberGlut_Settings::update_forms( $created );
		}
		return rest_ensure_response( array( 'created' => $created, 'values' => MemberGlut_Settings::forms(), 'pages' => $this->page_status(), 'lookups' => MemberGlut_Lookups::pages() ) );
	}
}
