<?php
/**
 * Email endpoints: GET/PUT /emails · POST /emails/{key}/reset|test|preview.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Emails class.
 */
class MemberGlut_REST_Emails extends MemberGlut_REST_Controller {

	const CAP = 'memberglut_manage_emails';

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$this->route( '/emails', 'GET', 'index', self::CAP );
		$this->route( '/emails', 'PUT,POST', 'save', self::CAP );
		$this->route( '/emails/(?P<key>[a-z_]+)/reset', 'POST', 'reset', self::CAP );
		$this->route( '/emails/(?P<key>[a-z_]+)/test', 'POST', 'test', self::CAP );
		$this->route( '/emails/(?P<key>[a-z_]+)/preview', 'POST', 'preview', self::CAP );
	}

	/**
	 * All emails + tags.
	 *
	 * @return WP_REST_Response
	 */
	public function index() {
		return rest_ensure_response(
			array(
				'emails'   => array_values( MemberGlut_Mailer::all() ),
				'defaults' => array_values( MemberGlut_Mailer::registry() ),
				'tags'     => MemberGlut_Mailer::tags_for_client(),
			)
		);
	}

	/**
	 * Save.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function save( WP_REST_Request $request ) {
		$b = $this->body( $request );
		MemberGlut_Mailer::save( (array) ( isset( $b['emails'] ) ? $b['emails'] : array() ) );
		return $this->index();
	}

	/**
	 * Restore default text.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function reset( WP_REST_Request $request ) {
		$email = MemberGlut_Mailer::reset( (string) $request['key'] );
		return $email ? rest_ensure_response( $email ) : $this->error( 'not_found', __( 'Email not found.', 'memberglut' ), 404 );
	}

	/**
	 * Unsaved edits from the editor.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return array|null
	 */
	private function draft( WP_REST_Request $request ) {
		$b     = $this->body( $request );
		$email = MemberGlut_Mailer::get( (string) $request['key'] );
		if ( ! $email ) {
			return null;
		}
		foreach ( array( 'subject', 'heading' ) as $f ) {
			if ( isset( $b[ $f ] ) ) {
				$email[ $f ] = sanitize_text_field( (string) $b[ $f ] );
			}
		}
		if ( isset( $b['body'] ) ) {
			$email['body'] = wp_kses_post( (string) $b['body'] );
		}
		return $email;
	}

	/**
	 * Send a test with sample data.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function test( WP_REST_Request $request ) {
		$b     = $this->body( $request );
		$to    = isset( $b['to'] ) ? sanitize_email( (string) $b['to'] ) : '';
		$email = $this->draft( $request );
		if ( ! $email ) {
			return $this->error( 'not_found', __( 'Email not found.', 'memberglut' ), 404 );
		}
		if ( ! is_email( $to ) ) {
			return $this->error( 'invalid_email', __( 'Enter a valid email address.', 'memberglut' ), 400 );
		}
		$ok = MemberGlut_Mailer::send( $email['key'], $to, MemberGlut_Mailer::sample_context(), $email, true );
		if ( ! $ok ) {
			$err = get_option( 'memberglut_last_mail_error', array() );
			/* translators: %s: error */
			return $this->error( 'mail_failed', sprintf( __( 'The email could not be sent: %s', 'memberglut' ), ! empty( $err['error'] ) ? $err['error'] : __( 'wp_mail returned false. Check your mail settings or an SMTP plugin.', 'memberglut' ) ), 500 );
		}
		return rest_ensure_response( array( 'sent' => true ) );
	}

	/**
	 * Render with sample data.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function preview( WP_REST_Request $request ) {
		$email = $this->draft( $request );
		if ( ! $email ) {
			return $this->error( 'not_found', __( 'Email not found.', 'memberglut' ), 404 );
		}
		list( $subject, $body, $html ) = MemberGlut_Mailer::render( $email, MemberGlut_Mailer::sample_context() );
		return rest_ensure_response(
			array(
				'subject' => $subject,
				'html'    => $html ? $body : '<pre style="white-space:pre-wrap;font-family:inherit;padding:24px">' . esc_html( $body ) . '</pre>',
			)
		);
	}
}
