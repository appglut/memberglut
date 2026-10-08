<?php
/**
 * Role & capability endpoints.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Roles class.
 */
class MemberGlut_REST_Roles extends MemberGlut_REST_Controller {

	const CAP = 'memberglut_manage_roles';

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$role = '(?P<slug>[a-z0-9_\-]+)';
		$this->route( '/roles', 'GET', 'index', self::CAP );
		$this->route( '/roles', 'POST', 'create', self::CAP );
		$this->route( '/roles/options', 'GET', 'get_options', self::CAP );
		$this->route( '/roles/options', 'PUT,POST', 'save_options', self::CAP );
		$this->route( '/roles/export', 'GET', 'export', self::CAP );
		$this->route( '/roles/import/preview', 'POST', 'import_preview', self::CAP );
		$this->route( '/roles/import', 'POST', 'import', self::CAP );
		$this->route( '/roles/' . $role, 'PUT,POST', 'update', self::CAP );
		$this->route( '/roles/' . $role, 'DELETE', 'destroy', self::CAP );
		$this->route( '/roles/' . $role . '/clone', 'POST', 'clone_role', self::CAP );
		$this->route( '/roles/' . $role . '/default', 'POST', 'make_default', self::CAP );
		$this->route( '/capabilities', 'GET', 'capabilities', self::CAP );
		$this->route( '/capabilities', 'POST', 'add_capability', self::CAP );
		$this->route( '/capabilities/(?P<cap>[a-z0-9_]+)', 'DELETE', 'remove_capability', self::CAP );
	}

	/**
	 * Roles.
	 *
	 * @return WP_REST_Response
	 */
	public function index() {
		return rest_ensure_response( MemberGlut_Roles_Service::roles() );
	}

	/**
	 * Groups and caps per role.
	 *
	 * @return WP_REST_Response
	 */
	public function capabilities() {
		return rest_ensure_response(
			array(
				'groups'   => MemberGlut_Roles_Service::capability_groups(),
				'roleCaps' => MemberGlut_Roles_Service::role_caps(),
				'custom'   => array_keys( MemberGlut_Roles_Service::registry() ),
			)
		);
	}

	/**
	 * Save caps of a role.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function update( WP_REST_Request $request ) {
		$body = $this->body( $request );
		$res  = MemberGlut_Roles_Service::save_caps( (string) $request['slug'], (array) ( isset( $body['caps'] ) ? $body['caps'] : array() ) );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( array( 'caps' => $res, 'roles' => MemberGlut_Roles_Service::roles() ) );
	}

	/**
	 * Create.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function create( WP_REST_Request $request ) {
		$b   = $this->body( $request );
		$res = MemberGlut_Roles_Service::create( isset( $b['name'] ) ? $b['name'] : '', isset( $b['slug'] ) ? $b['slug'] : '', isset( $b['clone'] ) ? sanitize_key( $b['clone'] ) : '' );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( $this->role_payload( $res['slug'] ) );
	}

	/**
	 * Clone.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function clone_role( WP_REST_Request $request ) {
		$b    = $this->body( $request );
		$from = (string) $request['slug'];
		if ( ! get_role( $from ) ) {
			return $this->error( 'not_found', __( 'Role not found.', 'memberglut' ), 404 );
		}
		/* translators: %s: role name */
		$name = ! empty( $b['name'] ) ? $b['name'] : sprintf( __( '%s (copy)', 'memberglut' ), translate_user_role( wp_roles()->roles[ $from ]['name'] ) );
		$res  = MemberGlut_Roles_Service::create( $name, isset( $b['slug'] ) ? $b['slug'] : $from . '_copy', $from );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( $this->role_payload( $res['slug'] ) );
	}

	/**
	 * Make default.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function make_default( WP_REST_Request $request ) {
		$res = MemberGlut_Roles_Service::set_default( (string) $request['slug'] );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( MemberGlut_Roles_Service::roles() );
	}

	/**
	 * Delete.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function destroy( WP_REST_Request $request ) {
		$res = MemberGlut_Roles_Service::delete( (string) $request['slug'], sanitize_key( (string) $request->get_param( 'replacement' ) ) );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( MemberGlut_Roles_Service::roles() );
	}

	/**
	 * Add a custom capability.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function add_capability( WP_REST_Request $request ) {
		$b   = $this->body( $request );
		$cap = MemberGlut_Roles_Service::add_capability( isset( $b['cap'] ) ? $b['cap'] : '', isset( $b['role'] ) ? sanitize_key( $b['role'] ) : '' );
		return is_wp_error( $cap ) ? $this->as_rest_error( $cap ) : rest_ensure_response( array( 'cap' => $cap ) + $this->capabilities()->get_data() );
	}

	/**
	 * Remove a custom capability.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function remove_capability( WP_REST_Request $request ) {
		$res = MemberGlut_Roles_Service::remove_capability( (string) $request['cap'] );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : $this->capabilities();
	}

	/**
	 * Export as a JSON download.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function export( WP_REST_Request $request ) {
		$slugs    = array_filter( array_map( 'sanitize_key', (array) $request->get_param( 'roles' ) ) );
		$response = rest_ensure_response( MemberGlut_Roles_Service::export( $slugs ) );
		$response->header( 'Content-Disposition', 'attachment; filename="memberglut-roles-' . gmdate( 'Y-m-d' ) . '.json"' );
		return $response;
	}

	/**
	 * Import preview.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function import_preview( WP_REST_Request $request ) {
		$b   = $this->body( $request );
		$res = MemberGlut_Roles_Service::import_preview( isset( $b['data'] ) ? $b['data'] : null );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( $res );
	}

	/**
	 * Import.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function import( WP_REST_Request $request ) {
		$b       = $this->body( $request );
		$choices = array();
		foreach ( (array) ( isset( $b['choices'] ) ? $b['choices'] : array() ) as $slug => $choice ) {
			$choices[ sanitize_key( $slug ) ] = in_array( $choice, array( 'import', 'overwrite', 'rename', 'skip' ), true ) ? $choice : 'skip';
		}
		$res = MemberGlut_Roles_Service::import( isset( $b['data'] ) ? $b['data'] : null, $choices );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( array( 'summary' => $res, 'roles' => MemberGlut_Roles_Service::roles() ) + $this->capabilities()->get_data() );
	}

	/**
	 * Options.
	 *
	 * @return WP_REST_Response
	 */
	public function get_options() {
		return rest_ensure_response( MemberGlut_Roles_Service::options() );
	}

	/**
	 * Save options.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function save_options( WP_REST_Request $request ) {
		return rest_ensure_response( MemberGlut_Roles_Service::save_options( $this->body( $request ) ) );
	}

	/**
	 * Roles + caps after a change, with the slug of the changed role.
	 *
	 * @param string $slug Role.
	 * @return array
	 */
	private function role_payload( $slug ) {
		return array(
			'slug'  => $slug,
			'roles' => MemberGlut_Roles_Service::roles(),
		) + $this->capabilities()->get_data();
	}
}
