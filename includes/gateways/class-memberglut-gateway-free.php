<?php
/**
 * Checkouts with nothing to pay (100 % coupon, or a free first period that never needs a card).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Gateway_Free class.
 */
class MemberGlut_Gateway_Free extends MemberGlut_Gateway {

	/**
	 * ID.
	 *
	 * @var string
	 */
	public $id = 'free';

	/**
	 * Title.
	 *
	 * @return string
	 */
	public function title() {
		return __( 'Free', 'memberglut' );
	}

	/**
	 * Always enabled.
	 *
	 * @return bool
	 */
	public function is_enabled() {
		return true;
	}

	/**
	 * Live.
	 *
	 * @return string
	 */
	public function mode() {
		return 'live';
	}

	/**
	 * Complete straight away.
	 *
	 * @param array $ctx Context.
	 * @return array
	 */
	public function process( $ctx ) {
		return array( 'complete' => true );
	}
}
