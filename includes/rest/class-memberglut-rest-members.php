<?php
/**
 * Members, subscriptions, events (access log) and logins endpoints.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Members class.
 */
class MemberGlut_REST_Members extends MemberGlut_REST_Controller {

	const CAP = 'memberglut_manage_members';

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$this->route( '/members', 'GET', 'index', self::CAP );
		$this->route( '/members', 'POST', 'create', self::CAP );
		$this->route( '/members/counts', 'GET', 'counts', self::CAP );
		$this->route( '/members/bulk', 'POST', 'bulk', self::CAP );
		$this->route( '/members/broadcast', 'POST', 'broadcast', self::CAP );
		$this->route( '/members/export', 'GET', 'export', self::CAP );
		$this->route( '/members/user/(?P<user>\d+)', 'GET', 'show', self::CAP );
		$this->route( '/members/user/(?P<user>\d+)/notes', 'GET', 'notes', self::CAP );
		$this->route( '/members/user/(?P<user>\d+)/notes', 'POST', 'add_note', self::CAP );
		$this->route( '/members/user/(?P<user>\d+)/notes/(?P<note>[a-z0-9\-]+)', 'DELETE', 'delete_note', self::CAP );
		$this->route( '/members/user/(?P<user>\d+)/(?P<action>approve|reject|password-reset|logout-all|remove-all|resend-activation)', 'POST', 'user_action', self::CAP );
		$this->route( '/subscriptions/(?P<id>\d+)', 'PATCH,PUT', 'update_subscription', self::CAP );
		$this->route( '/subscriptions/(?P<id>\d+)', 'DELETE', 'delete_subscription', self::CAP );
		$this->route( '/subscriptions/(?P<id>\d+)/(?P<action>cancel|expire|activate|change-plan|extend)', 'POST', 'subscription_action', self::CAP );
		register_rest_route(
			self::NS,
			'/events',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'events' ),
				'permission_callback' => static function () {
					return current_user_can( 'memberglut_manage_members' ) || current_user_can( 'memberglut_manage_settings' ) || current_user_can( 'memberglut_view_payments' );
				},
			)
		);
		$this->route( '/logins', 'GET', 'logins', self::CAP );
	}

	/**
	 * Filters from the request.
	 *
	 * @param WP_REST_Request $r Request.
	 * @return array
	 */
	private function filters( WP_REST_Request $r ) {
		return array(
			'status'   => sanitize_key( (string) $r->get_param( 'status' ) ),
			'plan'     => absint( $r->get_param( 'plan' ) ),
			'gateway'  => sanitize_key( (string) $r->get_param( 'gateway' ) ),
			'search'   => sanitize_text_field( (string) $r->get_param( 'search' ) ),
			'orderby'  => sanitize_key( (string) $r->get_param( 'orderby' ) ),
			'order'    => sanitize_key( (string) $r->get_param( 'order' ) ),
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
		$f                       = $this->filters( $request );
		$f['page']               = $page;
		$f['per_page']           = $per_page;
		list( $items, $total )   = MemberGlut_Members::query( $f );
		return $this->paginated( $items, $total, $page, $per_page, array( 'counts' => MemberGlut_Members::counts( $f ) ) );
	}

	/**
	 * Counts.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function counts( WP_REST_Request $request ) {
		return rest_ensure_response( MemberGlut_Members::counts( $this->filters( $request ) ) );
	}

	/**
	 * Add member.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function create( WP_REST_Request $request ) {
		$sub = MemberGlut_Members::add( $this->body( $request ) );
		if ( is_wp_error( $sub ) ) {
			return $this->as_rest_error( $sub );
		}
		list( $items ) = MemberGlut_Members::query( array( 'ids' => array( $sub['id'] ) ) );
		return rest_ensure_response( $items ? $items[0] : $sub );
	}

	/**
	 * Bulk action.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function bulk( WP_REST_Request $request ) {
		$b      = $this->body( $request );
		$action = isset( $b['action'] ) ? sanitize_key( $b['action'] ) : '';
		if ( ! in_array( $action, array( 'approve', 'reject', 'change_plan', 'extend', 'expire', 'remove', 'cancel', 'activate' ), true ) ) {
			return $this->error( 'invalid_action', __( 'Unknown bulk action.', 'memberglut' ) );
		}
		$args = isset( $b['args'] ) && is_array( $b['args'] ) ? $b['args'] : array();
		if ( 'change_plan' === $action && ! MemberGlut_Plans::get( isset( $args['plan_id'] ) ? (int) $args['plan_id'] : 0 ) ) {
			return $this->error( 'invalid_plan', __( 'Choose a plan.', 'memberglut' ) );
		}
		return rest_ensure_response( MemberGlut_Members::bulk( $action, isset( $b['ids'] ) ? (array) $b['ids'] : array(), $args ) );
	}

	/**
	 * Broadcast.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function broadcast( WP_REST_Request $request ) {
		$res = MemberGlut_Members::broadcast( $this->body( $request ) );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( $res );
	}

	/**
	 * CSV export (streams and exits).
	 *
	 * @param WP_REST_Request $request Request.
	 * @return void
	 */
	public function export( WP_REST_Request $request ) {
		$f                     = $this->filters( $request );
		$f['plans']            = array_filter( array_map( 'absint', (array) $request->get_param( 'plans' ) ) );
		if ( null !== $request->get_param( 'custom_fields' ) ) {
			$f['custom_fields'] = $request->get_param( 'custom_fields' );
		}
		if ( null !== $request->get_param( 'include_inactive' ) ) {
			$f['include_inactive'] = rest_sanitize_boolean( $request->get_param( 'include_inactive' ) );
		}
		MemberGlut_Members::stream_csv( $f );
	}

	/**
	 * Member detail.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function show( WP_REST_Request $request ) {
		$d = MemberGlut_Members::detail( (int) $request['user'] );
		return is_wp_error( $d ) ? $this->as_rest_error( $d ) : rest_ensure_response( $d );
	}

	/**
	 * Notes.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function notes( WP_REST_Request $request ) {
		return rest_ensure_response( MemberGlut_Members::notes( (int) $request['user'] ) );
	}

	/**
	 * Add note.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function add_note( WP_REST_Request $request ) {
		$b   = $this->body( $request );
		$res = MemberGlut_Members::add_note( (int) $request['user'], isset( $b['text'] ) ? (string) $b['text'] : '' );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( $res );
	}

	/**
	 * Delete note.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function delete_note( WP_REST_Request $request ) {
		return rest_ensure_response( MemberGlut_Members::delete_note( (int) $request['user'], (string) $request['note'] ) );
	}

	/**
	 * Account actions.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function user_action( WP_REST_Request $request ) {
		$uid  = (int) $request['user'];
		$user = get_userdata( $uid );
		if ( ! $user ) {
			return $this->error( 'not_found', __( 'User not found.', 'memberglut' ), 404 );
		}
		switch ( $request['action'] ) {
			case 'approve':
				$res = MemberGlut_Approval::approve( $uid );
				break;
			case 'reject':
				$res = MemberGlut_Approval::reject( $uid );
				break;
			case 'resend-activation':
				delete_transient( 'memberglut_resend_' . $uid );
				$res = MemberGlut_Approval::resend( $uid ) ? true : $this->error( 'not_pending', __( 'This account is not waiting for email confirmation.', 'memberglut' ) );
				break;
			case 'password-reset':
				$res = MemberGlut_Auth::send_reset( $user );
				break;
			case 'logout-all':
				MemberGlut_Security::end_all_sessions( $uid );
				memberglut_event( 'logout_all', __( 'Logged out of all devices by an admin', 'memberglut' ), array( 'user_id' => $uid, 'object_type' => 'user', 'object_id' => $uid ) );
				$res = true;
				break;
			case 'remove-all':
				foreach ( MemberGlut_Subscription_Service::for_user( $uid ) as $sub ) {
					MemberGlut_Subscription_Service::delete( $sub['id'] );
				}
				$res = true;
				break;
			default:
				$res = $this->error( 'invalid_action', __( 'Unknown action.', 'memberglut' ) );
		}
		if ( is_wp_error( $res ) ) {
			return $this->as_rest_error( $res );
		}
		return rest_ensure_response( MemberGlut_Members::detail( $uid ) );
	}

	/**
	 * Edit a subscription.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function update_subscription( WP_REST_Request $request ) {
		$b    = $this->body( $request );
		$data = array();
		foreach ( array( 'plan_id', 'status', 'start', 'expires', 'extend_days' ) as $k ) {
			if ( array_key_exists( $k, $b ) ) {
				$data[ $k ] = is_string( $b[ $k ] ) ? sanitize_text_field( $b[ $k ] ) : $b[ $k ];
			}
		}
		$res = MemberGlut_Subscription_Service::admin_update( (int) $request['id'], $data );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( MemberGlut_Members::detail( $res['user_id'] ) );
	}

	/**
	 * Subscription actions.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function subscription_action( WP_REST_Request $request ) {
		$id  = (int) $request['id'];
		$b   = $this->body( $request );
		$sub = MemberGlut_Subscription_Service::get( $id );
		if ( ! $sub ) {
			return $this->error( 'not_found', __( 'Subscription not found.', 'memberglut' ), 404 );
		}
		switch ( $request['action'] ) {
			case 'cancel':
				$res = MemberGlut_Subscription_Service::cancel( $id, ! empty( $b['immediately'] ) );
				break;
			case 'expire':
				$res = MemberGlut_Subscription_Service::expire( $id, __( '(by admin)', 'memberglut' ) );
				break;
			case 'activate':
				$res = MemberGlut_Subscription_Service::activate( $id );
				break;
			case 'change-plan':
				$res = MemberGlut_Subscription_Service::change_plan( $id, isset( $b['plan_id'] ) ? (int) $b['plan_id'] : 0 );
				break;
			case 'extend':
				$res = ! empty( $b['date'] ) ? MemberGlut_Subscription_Service::admin_update( $id, array( 'expires' => sanitize_text_field( $b['date'] ) ) ) : MemberGlut_Subscription_Service::admin_update( $id, array( 'extend_days' => max( 1, isset( $b['days'] ) ? (int) $b['days'] : 30 ) ) );
				break;
			default:
				$res = $this->error( 'invalid_action', __( 'Unknown action.', 'memberglut' ) );
		}
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( MemberGlut_Members::detail( $sub['user_id'] ) );
	}

	/**
	 * Delete a subscription.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function delete_subscription( WP_REST_Request $request ) {
		$res = MemberGlut_Subscription_Service::delete( (int) $request['id'] );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( array( 'deleted' => true ) );
	}

	/**
	 * Audit events (member activity, payment log, dashboard activity, Tools › Access log).
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function events( WP_REST_Request $request ) {
		list( $page, $per_page ) = $this->pagination( $request, 20 );
		$where                   = array();
		if ( $request->get_param( 'user' ) ) {
			$where['user_id'] = absint( $request->get_param( 'user' ) );
		}
		if ( $request->get_param( 'object_type' ) ) {
			$where['object_type'] = sanitize_key( $request->get_param( 'object_type' ) );
		}
		if ( $request->get_param( 'object_id' ) ) {
			$where['object_id'] = absint( $request->get_param( 'object_id' ) );
		}
		if ( $request->get_param( 'type' ) ) {
			$types         = $request->get_param( 'type' );
			$where['event'] = array_map( 'sanitize_key', is_array( $types ) ? $types : explode( ',', (string) $types ) );
		}
		if ( $request->get_param( 'from' ) ) {
			$where['created_at >='] = memberglut_parse_date( sanitize_text_field( $request->get_param( 'from' ) ) );
		}
		if ( $request->get_param( 'to' ) ) {
			$where['created_at <='] = memberglut_parse_date( sanitize_text_field( $request->get_param( 'to' ) ), true );
		}
		// Payment viewers only see payment events unless they also manage members.
		if ( ! current_user_can( 'memberglut_manage_members' ) && ! current_user_can( 'memberglut_manage_settings' ) ) {
			$where['object_type'] = 'payment';
		}
		$args  = array( 'where' => $where, 'search' => sanitize_text_field( (string) $request->get_param( 'search' ) ), 'orderby' => 'id DESC', 'page' => $page, 'per_page' => $per_page );
		$repo  = memberglut_repo( 'events' );
		$names = array();
		$items = array_map(
			static function ( $e ) use ( &$names ) {
				$actor = (int) $e['actor_id'];
				if ( $actor && ! isset( $names[ $actor ] ) ) {
					$u               = get_userdata( $actor );
					$names[ $actor ] = $u ? $u->display_name : '#' . $actor;
				}
				return array(
					'id'          => (int) $e['id'],
					'type'        => $e['event'],
					'text'        => $e['message'],
					'user_id'     => $e['user_id'],
					'object_type' => $e['object_type'],
					'object_id'   => $e['object_id'],
					'by'          => $actor ? $names[ $actor ] : __( 'system', 'memberglut' ),
					'data'        => $e['data'],
					'date'        => memberglut_iso( $e['created_at'] ),
				);
			},
			$repo->query( $args )
		);
		return $this->paginated( $items, $repo->count( $args ), $page, $per_page );
	}

	/**
	 * Login history of a user.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function logins( WP_REST_Request $request ) {
		$uid  = absint( $request->get_param( 'user' ) );
		$rows = memberglut_repo( 'logins' )->query( array( 'where' => array( 'user_id' => $uid ), 'orderby' => 'id DESC', 'per_page' => 20 ) );
		$live = array_keys( MemberGlut_Security::sessions( $uid ) );
		return rest_ensure_response(
			array_map(
				static function ( $l ) use ( $live ) {
					return array(
						'id'      => (int) $l['id'],
						'date'    => memberglut_iso( $l['created_at'] ),
						'last'    => memberglut_iso( $l['last_seen_at'] ),
						'ip'      => $l['ip'],
						'device'  => $l['device_label'],
						'current' => ! $l['ended_at'] && in_array( $l['session_verifier'], $live, true ),
					);
				},
				$rows
			)
		);
	}
}
