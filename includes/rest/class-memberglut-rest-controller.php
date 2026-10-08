<?php
/**
 * Base REST controller for the memberglut/v1 namespace.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Controller class.
 */
abstract class MemberGlut_REST_Controller {

	const NS = 'memberglut/v1';

	/**
	 * Register the routes of this controller.
	 *
	 * @return void
	 */
	abstract public function register_routes();

	/**
	 * Register one route.
	 *
	 * @param string       $path     Path (regex allowed).
	 * @param string       $methods  HTTP methods.
	 * @param string       $callback Method name on this controller.
	 * @param string|false $cap      Capability, or false for a public route (the callback must check itself).
	 * @param array        $args     Arg schema.
	 * @return void
	 */
	protected function route( $path, $methods, $callback, $cap, $args = array() ) {
		register_rest_route(
			self::NS,
			$path,
			array(
				'methods'             => $methods,
				'callback'            => array( $this, $callback ),
				'permission_callback' => false === $cap ? '__return_true' : static function () use ( $cap ) {
					return current_user_can( $cap );
				},
				'args'                => $args,
			)
		);
	}

	/**
	 * Paginated list response with X-WP-Total headers.
	 *
	 * @param array $items    Items.
	 * @param int   $total    Total rows.
	 * @param int   $page     Page.
	 * @param int   $per_page Per page.
	 * @param array $extra    Extra keys for the body.
	 * @return WP_REST_Response
	 */
	protected function paginated( $items, $total, $page, $per_page, $extra = array() ) {
		$response = rest_ensure_response(
			array_merge(
				array(
					'items'    => array_values( $items ),
					'total'    => (int) $total,
					'page'     => (int) $page,
					'per_page' => (int) $per_page,
				),
				$extra
			)
		);
		$response->header( 'X-WP-Total', (int) $total );
		$response->header( 'X-WP-TotalPages', $per_page ? (int) ceil( $total / $per_page ) : 1 );
		return $response;
	}

	/**
	 * Error response.
	 *
	 * @param string $code    Code.
	 * @param string $message Message.
	 * @param int    $status  HTTP status.
	 * @param array  $data    Extra data (e.g. fields => [ key => message ]).
	 * @return WP_Error
	 */
	protected function error( $code, $message, $status = 400, $data = array() ) {
		return new WP_Error( 'memberglut_' . $code, $message, array_merge( array( 'status' => $status ), $data ) );
	}

	/**
	 * Page / per_page from a request.
	 *
	 * @param WP_REST_Request $request Request.
	 * @param int             $default Default per page.
	 * @return int[] [ page, per_page ]
	 */
	protected function pagination( WP_REST_Request $request, $default = 20 ) {
		$page     = max( 1, (int) $request->get_param( 'page' ) );
		$per_page = (int) $request->get_param( 'per_page' );
		$per_page = $per_page > 0 ? min( 500, $per_page ) : $default;
		return array( $page, $per_page );
	}

	/**
	 * JSON body (or params) as array.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return array
	 */
	protected function body( WP_REST_Request $request ) {
		$json = $request->get_json_params();
		return is_array( $json ) ? $json : (array) $request->get_body_params();
	}

	/**
	 * Turn a WP_Error from a service into a REST error with a status.
	 *
	 * @param WP_Error $error  Error.
	 * @param int      $status Default status.
	 * @return WP_Error
	 */
	protected function as_rest_error( WP_Error $error, $status = 400 ) {
		$data = $error->get_error_data();
		$data = is_array( $data ) ? $data : array();
		if ( empty( $data['status'] ) ) {
			$data['status'] = $status;
		}
		return new WP_Error( $error->get_error_code(), $error->get_error_message(), $data );
	}
}
