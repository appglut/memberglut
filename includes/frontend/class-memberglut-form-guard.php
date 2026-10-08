<?php
/**
 * Anti-bot protection for every MemberGlut form: honeypot + minimum fill time (Security › Honeypot) and the
 * captcha chosen in Global Settings › Captcha for the forms listed in “Protect these forms”.
 *
 * Form keys: register, login, lost_password, checkout.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Form_Guard class.
 */
class MemberGlut_Form_Guard {

	const MIN_SECONDS = 2;

	/**
	 * Whether the captcha protects a form.
	 *
	 * @param string $form Form key.
	 * @return bool
	 */
	public static function captcha_on( $form ) {
		$provider = memberglut_setting( 'captcha_provider', 'none' );
		if ( 'none' === $provider || ! self::site_key() ) {
			return false;
		}
		return in_array( $form, (array) memberglut_setting( 'captcha_on', array() ), true );
	}

	/**
	 * Site key of the chosen provider.
	 *
	 * @return string
	 */
	public static function site_key() {
		$p = memberglut_setting( 'captcha_provider', 'none' );
		return 'none' === $p ? '' : (string) memberglut_setting( $p . '_site_key', '' );
	}

	/**
	 * Hidden fields + captcha widget for a form.
	 *
	 * @param string $form Form key.
	 * @return string
	 */
	public static function render( $form ) {
		$html = '';
		if ( memberglut_setting( 'honeypot', true ) ) {
			$html .= '<div class="mg-hp" aria-hidden="true"><label>' . esc_html__( 'Leave this field empty', 'memberglut' ) . '<input type="text" name="mg_hp_website" value="" tabindex="-1" autocomplete="off"></label></div>';
			$html .= '<input type="hidden" name="mg_hp_time" value="' . esc_attr( self::sign_time() ) . '">';
		}
		if ( self::captcha_on( $form ) ) {
			$html .= self::captcha_widget( $form );
		}
		return $html;
	}

	/**
	 * Signed form-render timestamp.
	 *
	 * @return string
	 */
	private static function sign_time() {
		$t = time();
		return $t . '.' . substr( wp_hash( 'mg_hp_' . $t ), 0, 12 );
	}

	/**
	 * Captcha markup and script.
	 *
	 * @param string $form Form key.
	 * @return string
	 */
	private static function captcha_widget( $form ) {
		$provider = memberglut_setting( 'captcha_provider' );
		$key      = self::site_key();
		switch ( $provider ) {
			case 'recaptcha':
				if ( 'v3' === memberglut_setting( 'recaptcha_version', 'v3' ) ) {
					wp_enqueue_script( 'memberglut-recaptcha', 'https://www.google.com/recaptcha/api.js?render=' . rawurlencode( $key ), array(), null, true ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion -- External service script.
					return '<input type="hidden" name="mg_captcha" data-mg-recaptcha-v3="' . esc_attr( $key ) . '" data-action="' . esc_attr( $form ) . '">';
				}
				wp_enqueue_script( 'memberglut-recaptcha', 'https://www.google.com/recaptcha/api.js', array(), null, true ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion -- External service script.
				return '<div class="mg-captcha g-recaptcha" data-sitekey="' . esc_attr( $key ) . '"></div>';
			case 'hcaptcha':
				wp_enqueue_script( 'memberglut-hcaptcha', 'https://js.hcaptcha.com/1/api.js', array(), null, true ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion -- External service script.
				return '<div class="mg-captcha h-captcha" data-sitekey="' . esc_attr( $key ) . '"></div>';
			case 'turnstile':
				wp_enqueue_script( 'memberglut-turnstile', 'https://challenges.cloudflare.com/turnstile/v0/api.js', array(), null, true ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion -- External service script.
				return '<div class="mg-captcha cf-turnstile" data-sitekey="' . esc_attr( $key ) . '"></div>';
		}
		return '';
	}

	/**
	 * Verify a submission.
	 *
	 * @param string $form Form key.
	 * @param array  $data Submitted data (raw $_POST / JSON body).
	 * @return true|WP_Error
	 */
	public static function verify( $form, $data ) {
		if ( memberglut_setting( 'honeypot', true ) ) {
			if ( ! empty( $data['mg_hp_website'] ) ) {
				memberglut_log( 'warning', 'login', sprintf( 'Honeypot caught a bot on the %s form', $form ), array( 'ip' => memberglut_client_ip() ) );
				return new WP_Error( 'memberglut_spam', __( 'Your submission looks automated. Please try again.', 'memberglut' ) );
			}
			$parts = explode( '.', isset( $data['mg_hp_time'] ) ? (string) $data['mg_hp_time'] : '' );
			if ( 2 !== count( $parts ) || ! hash_equals( substr( wp_hash( 'mg_hp_' . $parts[0] ), 0, 12 ), $parts[1] ) ) {
				return new WP_Error( 'memberglut_spam', __( 'The form expired. Reload the page and try again.', 'memberglut' ) );
			}
			if ( time() - (int) $parts[0] < self::MIN_SECONDS ) {
				return new WP_Error( 'memberglut_spam', __( 'That was a bit fast. Please try again.', 'memberglut' ) );
			}
		}
		if ( self::captcha_on( $form ) ) {
			return self::verify_captcha( $form, $data );
		}
		return true;
	}

	/**
	 * Ask the provider whether the captcha was solved.
	 *
	 * @param string $form Form key.
	 * @param array  $data Data.
	 * @return true|WP_Error
	 */
	private static function verify_captcha( $form, $data ) {
		$provider = memberglut_setting( 'captcha_provider' );
		$fields   = array( 'recaptcha' => array( 'g-recaptcha-response', 'mg_captcha' ), 'hcaptcha' => array( 'h-captcha-response' ), 'turnstile' => array( 'cf-turnstile-response' ) );
		$token    = '';
		foreach ( isset( $fields[ $provider ] ) ? $fields[ $provider ] : array() as $f ) {
			if ( ! empty( $data[ $f ] ) ) {
				$token = sanitize_text_field( (string) $data[ $f ] );
				break;
			}
		}
		$fail = new WP_Error( 'memberglut_captcha', __( 'Please confirm that you are not a robot.', 'memberglut' ) );
		if ( '' === $token ) {
			return $fail;
		}
		$urls = array(
			'recaptcha' => 'https://www.google.com/recaptcha/api/siteverify',
			'hcaptcha'  => 'https://api.hcaptcha.com/siteverify',
			'turnstile' => 'https://challenges.cloudflare.com/turnstile/v0/siteverify',
		);
		$res = wp_remote_post(
			$urls[ $provider ],
			array(
				'timeout' => 10,
				'body'    => array(
					'secret'   => memberglut_setting( $provider . '_secret_key', '' ),
					'response' => $token,
					'remoteip' => memberglut_client_ip(),
				),
			)
		);
		if ( is_wp_error( $res ) ) {
			memberglut_log( 'error', 'login', 'Captcha verification request failed: ' . $res->get_error_message() );
			return new WP_Error( 'memberglut_captcha', __( 'The captcha could not be checked. Please try again.', 'memberglut' ) );
		}
		$body = json_decode( wp_remote_retrieve_body( $res ), true );
		if ( empty( $body['success'] ) ) {
			return $fail;
		}
		if ( 'recaptcha' === $provider && 'v3' === memberglut_setting( 'recaptcha_version', 'v3' ) ) {
			if ( isset( $body['score'] ) && (float) $body['score'] < (float) memberglut_setting( 'recaptcha_score', 0.5 ) ) {
				return $fail;
			}
		}
		return true;
	}
}
