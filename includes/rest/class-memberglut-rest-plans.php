<?php
/**
 * Plan endpoints.
 *
 * GET/POST /plans · GET/PUT/DELETE /plans/{id} · POST /plans/{id}/duplicate · PATCH /plans/{id}/status ·
 * PUT /plans/order · GET /plans/{id}/rules
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Plans class.
 */
class MemberGlut_REST_Plans extends MemberGlut_REST_Controller {

	const CAP = 'memberglut_manage_plans';

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$this->route( '/plans', 'GET', 'index', self::CAP );
		$this->route( '/plans', 'POST', 'create', self::CAP );
		$this->route( '/plans/order', 'PUT,POST', 'order', self::CAP );
		$this->route( '/plans/(?P<id>\d+)', 'GET', 'show', self::CAP );
		$this->route( '/plans/(?P<id>\d+)', 'PUT,POST', 'update', self::CAP );
		$this->route( '/plans/(?P<id>\d+)', 'DELETE', 'destroy', self::CAP );
		$this->route( '/plans/(?P<id>\d+)/duplicate', 'POST', 'duplicate', self::CAP );
		$this->route( '/plans/(?P<id>\d+)/status', 'PATCH,POST', 'status', self::CAP );
		$this->route( '/plans/(?P<id>\d+)/rules', 'GET', 'rules', self::CAP );
	}

	/**
	 * List with stats.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function index( WP_REST_Request $request ) {
		$plans  = MemberGlut_Plans::all_for_client();
		$status = $request->get_param( 'status' );
		if ( $status ) {
			$plans = array_values( array_filter( $plans, static function ( $p ) use ( $status ) {
				return $p['status'] === $status;
			} ) );
		}
		return rest_ensure_response( $plans );
	}

	/**
	 * One plan with stats.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function show( WP_REST_Request $request ) {
		$plan = $this->find_with_stats( (int) $request['id'] );
		return $plan ? rest_ensure_response( $plan ) : $this->error( 'not_found', __( 'Plan not found.', 'memberglut' ), 404 );
	}

	/**
	 * Create.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function create( WP_REST_Request $request ) {
		$data = $this->body( $request );
		unset( $data['id'] );
		$plan = MemberGlut_Plans::save( $data );
		return is_wp_error( $plan ) ? $this->as_rest_error( $plan ) : rest_ensure_response( $this->find_with_stats( $plan['id'] ) );
	}

	/**
	 * Update.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function update( WP_REST_Request $request ) {
		$data       = $this->body( $request );
		$data['id'] = (int) $request['id'];
		$plan       = MemberGlut_Plans::save( $data );
		return is_wp_error( $plan ) ? $this->as_rest_error( $plan ) : rest_ensure_response( $this->find_with_stats( $plan['id'] ) );
	}

	/**
	 * Delete.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function destroy( WP_REST_Request $request ) {
		$result = MemberGlut_Plans::delete( (int) $request['id'] );
		return is_wp_error( $result ) ? $this->as_rest_error( $result ) : rest_ensure_response( array( 'deleted' => true ) );
	}

	/**
	 * Duplicate.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function duplicate( WP_REST_Request $request ) {
		$body = $this->body( $request );
		$plan = MemberGlut_Plans::duplicate( (int) $request['id'], ! empty( $body['with_rules'] ) );
		return is_wp_error( $plan ) ? $this->as_rest_error( $plan ) : rest_ensure_response( $this->find_with_stats( $plan['id'] ) );
	}

	/**
	 * Status toggle.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function status( WP_REST_Request $request ) {
		$body = $this->body( $request );
		$plan = MemberGlut_Plans::set_status( (int) $request['id'], isset( $body['status'] ) ? (string) $body['status'] : 'inactive' );
		return is_wp_error( $plan ) ? $this->as_rest_error( $plan ) : rest_ensure_response( $this->find_with_stats( $plan['id'] ) );
	}

	/**
	 * Save the order of a group.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function order( WP_REST_Request $request ) {
		$body = $this->body( $request );
		MemberGlut_Plans::reorder( isset( $body['group'] ) ? (string) $body['group'] : 'Main', array_map( 'intval', (array) ( isset( $body['ids'] ) ? $body['ids'] : array() ) ) );
		return rest_ensure_response( MemberGlut_Plans::all_for_client() );
	}

	/**
	 * Rules that list the plan.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function rules( WP_REST_Request $request ) {
		$rules = array_map(
			static function ( $r ) {
				return array(
					'id'     => $r['id'],
					'title'  => $r['title'],
					'status' => $r['status'],
				);
			},
			MemberGlut_Plans::rules_for_plan( (int) $request['id'] )
		);
		return rest_ensure_response( $rules );
	}

	/**
	 * Plan with stats.
	 *
	 * @param int $id ID.
	 * @return array|null
	 */
	private function find_with_stats( $id ) {
		foreach ( MemberGlut_Plans::all_for_client() as $plan ) {
			if ( (int) $plan['id'] === (int) $id ) {
				$plan['subscriptions'] = MemberGlut_Plans::subscription_count( $id );
				return $plan;
			}
		}
		return null;
	}
}
