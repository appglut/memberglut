<?php
/**
 * Payment endpoints.
 *
 * GET /payments · GET /payments/summary · GET /payments/export · GET /payments/{id} · POST /payments (manual) ·
 * POST /payments/{id}/mark-paid|refund|resend-receipt
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Payments class.
 */
class MemberGlut_REST_Payments extends MemberGlut_REST_Controller {

	const VIEW   = 'memberglut_view_payments';
	const MANAGE = 'memberglut_manage_payments';

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$this->route( '/payments', 'GET', 'index', self::VIEW );
		$this->route( '/payments', 'POST', 'create', self::MANAGE );
		$this->route( '/payments/summary', 'GET', 'summary', self::VIEW );
		$this->route( '/payments/export', 'GET', 'export', self::VIEW );
		$this->route( '/payments/(?P<id>\d+)', 'GET', 'show', self::VIEW );
		$this->route( '/payments/(?P<id>\d+)/(?P<action>mark-paid|refund|resend-receipt)', 'POST', 'action', self::MANAGE );
	}

	/**
	 * Filters.
	 *
	 * @param WP_REST_Request $r Request.
	 * @return array
	 */
	private function filters( WP_REST_Request $r ) {
		return array(
			'status'  => sanitize_key( (string) $r->get_param( 'status' ) ),
			'gateway' => sanitize_key( (string) $r->get_param( 'gateway' ) ),
			'search'  => sanitize_text_field( (string) $r->get_param( 'search' ) ),
			'from'    => sanitize_text_field( (string) $r->get_param( 'from' ) ),
			'to'      => sanitize_text_field( (string) $r->get_param( 'to' ) ),
			'user'    => absint( $r->get_param( 'user' ) ),
			'plan'    => absint( $r->get_param( 'plan' ) ),
		);
	}

	/**
	 * List.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function index( WP_REST_Request $request ) {
		list( $page, $per_page ) = $this->pagination( $request, 10 );
		$args                    = MemberGlut_Payments::filter_args( $this->filters( $request ) );
		$map                     = array( 'date' => 'created_at', 'amount' => 'amount', 'id' => 'id' );
		$orderby                 = isset( $map[ (string) $request->get_param( 'orderby' ) ] ) ? $map[ (string) $request->get_param( 'orderby' ) ] : 'id';
		$order                   = 'asc' === strtolower( (string) $request->get_param( 'order' ) ) ? 'ASC' : 'DESC';
		$repo                    = memberglut_repo( 'payments' );
		$rows                    = $repo->query( array_merge( $args, array( 'orderby' => $orderby . ' ' . $order . ', id DESC', 'page' => $page, 'per_page' => $per_page ) ) );
		return $this->paginated( array_map( array( 'MemberGlut_Payments', 'to_client' ), $rows ), $repo->count( $args ), $page, $per_page, array( 'summary' => MemberGlut_Payments::summary( $this->filters( $request ) ) ) );
	}

	/**
	 * Summary.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function summary( WP_REST_Request $request ) {
		return rest_ensure_response( MemberGlut_Payments::summary( $this->filters( $request ) ) );
	}

	/**
	 * Export.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return void
	 */
	public function export( WP_REST_Request $request ) {
		MemberGlut_Payments::stream_csv( $this->filters( $request ) );
	}

	/**
	 * Detail with the payment log.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function show( WP_REST_Request $request ) {
		$p = MemberGlut_Payments::get( (int) $request['id'] );
		if ( ! $p ) {
			return $this->error( 'not_found', __( 'Payment not found.', 'memberglut' ), 404 );
		}
		$out        = MemberGlut_Payments::to_client( $p );
		$out['log'] = array_map(
			static function ( $e ) {
				return array( 'type' => $e['event'], 'text' => $e['message'], 'date' => memberglut_iso( $e['created_at'] ) );
			},
			memberglut_repo( 'events' )->query( array( 'where' => array( 'object_type' => 'payment', 'object_id' => $p['id'] ), 'orderby' => 'id ASC' ) )
		);
		return rest_ensure_response( $out );
	}

	/**
	 * Manual payment.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function create( WP_REST_Request $request ) {
		$p = MemberGlut_Payments::add_manual( $this->body( $request ) );
		return is_wp_error( $p ) ? $this->as_rest_error( $p ) : rest_ensure_response( MemberGlut_Payments::to_client( $p ) );
	}

	/**
	 * Actions.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function action( WP_REST_Request $request ) {
		$id = (int) $request['id'];
		$p  = MemberGlut_Payments::get( $id );
		if ( ! $p ) {
			return $this->error( 'not_found', __( 'Payment not found.', 'memberglut' ), 404 );
		}
		$b = $this->body( $request );
		switch ( $request['action'] ) {
			case 'mark-paid':
				if ( 'pending' !== $p['status'] ) {
					return $this->error( 'not_pending', __( 'Only pending payments can be marked as paid.', 'memberglut' ) );
				}
				$res = MemberGlut_Payments::complete( $id, array( 'transaction_id' => isset( $b['reference'] ) ? sanitize_text_field( $b['reference'] ) : '' ) );
				break;
			case 'refund':
				$res = MemberGlut_Payments::refund( $id, isset( $b['amount'] ) && '' !== $b['amount'] ? (float) $b['amount'] : null );
				break;
			case 'resend-receipt':
				$sub = $p['subscription_id'] ? MemberGlut_Subscription_Service::get( $p['subscription_id'] ) : null;
				$ok  = MemberGlut_Mailer::send( 'pending' === $p['status'] && 'bank' === $p['gateway'] ? 'pending_manual' : 'receipt', $p['email'] ? $p['email'] : null, array( 'user_id' => $p['user_id'], 'payment' => $p, 'subscription' => $sub ), null, true );
				$res = $ok ? $p : $this->error( 'mail_failed', __( 'The email could not be sent.', 'memberglut' ), 500 );
				if ( $ok ) {
					MemberGlut_Payments::log( $id, 'receipt', __( 'Receipt sent again', 'memberglut' ) );
				}
				break;
			default:
				$res = $this->error( 'invalid_action', __( 'Unknown action.', 'memberglut' ) );
		}
		if ( is_wp_error( $res ) ) {
			return $this->as_rest_error( $res );
		}
		return $this->show( $request );
	}
}
