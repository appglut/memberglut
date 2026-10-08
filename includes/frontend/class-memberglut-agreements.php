<?php
/**
 * Agreements on registration and checkout: Terms, Privacy Policy and the GDPR consent (decision D10).
 *
 * Consents are stored in `memberglut_consents` user meta: [ { type, label, text, page_id, time, ip } ].
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Agreements class.
 */
class MemberGlut_Agreements {

	/**
	 * Agreement checkboxes for a context.
	 *
	 * @param string $context register|checkout.
	 * @param int    $user_id Logged-in user (skip what they already accepted).
	 * @return array[] [ type, html_label, label, text, page_id ]
	 */
	public static function items( $context, $user_id = 0 ) {
		$items    = array();
		$accepted = $user_id ? wp_list_pluck( self::consents( $user_id ), 'type' ) : array();
		if ( memberglut_setting( 'terms_required', false ) && ! in_array( 'terms', $accepted, true ) ) {
			$page = (int) memberglut_setting( 'terms_page', 0 );
			$link = $page ? '<a href="' . esc_url( get_permalink( $page ) ) . '" target="_blank" rel="noopener">' . esc_html__( 'Terms & Conditions', 'memberglut' ) . '</a>' : esc_html__( 'Terms & Conditions', 'memberglut' );
			/* translators: %s: link */
			$items[] = array( 'type' => 'terms', 'html' => sprintf( __( 'I accept the %s', 'memberglut' ), $link ), 'label' => __( 'Terms & Conditions', 'memberglut' ), 'page_id' => $page );
		}
		$privacy_page = (int) memberglut_setting( 'privacy_page', 0 );
		$privacy_page = $privacy_page ? $privacy_page : (int) get_option( 'wp_page_for_privacy_policy' );
		$privacy_link = $privacy_page ? '<a href="' . esc_url( get_permalink( $privacy_page ) ) . '" target="_blank" rel="noopener">' . esc_html__( 'Privacy Policy', 'memberglut' ) . '</a>' : esc_html__( 'Privacy Policy', 'memberglut' );
		if ( memberglut_setting( 'privacy_required', true ) && ! in_array( 'privacy', $accepted, true ) ) {
			/* translators: %s: link */
			$items[] = array( 'type' => 'privacy', 'html' => sprintf( __( 'I have read the %s', 'memberglut' ), $privacy_link ), 'label' => __( 'Privacy Policy', 'memberglut' ), 'page_id' => $privacy_page );
		}
		// GDPR storage consent at checkout, unless already given (at registration or before).
		if ( 'checkout' === $context && memberglut_setting( 'gdpr_consent', true ) && ! in_array( 'gdpr', $accepted, true ) ) {
			$text    = (string) memberglut_setting( 'gdpr_consent_text', '' );
			$html    = str_replace( '{privacy_policy}', $privacy_link, esc_html( $text ) );
			$items[] = array( 'type' => 'gdpr', 'html' => $html, 'label' => __( 'Data storage consent', 'memberglut' ), 'page_id' => $privacy_page, 'text' => $text );
		}
		return apply_filters( 'memberglut_agreements', $items, $context, $user_id );
	}

	/**
	 * Render the checkboxes.
	 *
	 * @param string $context Context.
	 * @param int    $user_id User.
	 * @return string
	 */
	public static function render( $context, $user_id = 0 ) {
		$html = '';
		foreach ( self::items( $context, $user_id ) as $item ) {
			$html .= '<div class="mg-field mg-agreement" data-field="agree_' . esc_attr( $item['type'] ) . '"><label class="mg-check"><input type="checkbox" name="mg[agree_' . esc_attr( $item['type'] ) . ']" value="1" required> <span>' . wp_kses( $item['html'], array( 'a' => array( 'href' => true, 'target' => true, 'rel' => true ) ) ) . '</span></label><span class="mg-field-error" role="alert"></span></div>';
		}
		return $html;
	}

	/**
	 * Validate the checkboxes.
	 *
	 * @param string $context Context.
	 * @param array  $input   Submitted mg[] values.
	 * @param int    $user_id User.
	 * @return array Errors keyed by field.
	 */
	public static function validate( $context, $input, $user_id = 0 ) {
		$errors = array();
		foreach ( self::items( $context, $user_id ) as $item ) {
			if ( empty( $input[ 'agree_' . $item['type'] ] ) ) {
				/* translators: %s: agreement */
				$errors[ 'agree_' . $item['type'] ] = sprintf( __( 'Please accept the %s.', 'memberglut' ), $item['label'] );
			}
		}
		return $errors;
	}

	/**
	 * Store the consents that were shown.
	 *
	 * @param string $context Context.
	 * @param int    $user_id User.
	 * @param int    $shown_for User whose already-accepted items were skipped (0 at registration).
	 * @return void
	 */
	public static function record( $context, $user_id, $shown_for = 0 ) {
		$consents = self::consents( $user_id );
		foreach ( self::items( $context, $shown_for ) as $item ) {
			$consents[] = array(
				'type'    => $item['type'],
				'label'   => $item['label'],
				'text'    => isset( $item['text'] ) ? $item['text'] : wp_strip_all_tags( $item['html'] ),
				'page_id' => (int) $item['page_id'],
				'time'    => gmdate( 'c' ),
				'ip'      => memberglut_client_ip(),
				'context' => $context,
			);
		}
		update_user_meta( $user_id, 'memberglut_consents', $consents );
	}

	/**
	 * Stored consents.
	 *
	 * @param int $user_id User.
	 * @return array[]
	 */
	public static function consents( $user_id ) {
		$c = get_user_meta( $user_id, 'memberglut_consents', true );
		return is_array( $c ) ? array_values( $c ) : array();
	}
}
