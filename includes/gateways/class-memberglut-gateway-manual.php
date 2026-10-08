<?php
/**
 * Manual payments recorded by an admin (cash, invoice, another shop). Not offered at checkout.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Gateway_Manual class.
 */
class MemberGlut_Gateway_Manual extends MemberGlut_Gateway {

	/**
	 * ID.
	 *
	 * @var string
	 */
	public $id = 'manual';

	/**
	 * Features.
	 *
	 * @var string[]
	 */
	protected $features = array( 'one_time', 'refunds' );

	/**
	 * Title.
	 *
	 * @return string
	 */
	public function title() {
		return __( 'Manual', 'memberglut' );
	}

	/**
	 * Always available for admins.
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

	/**
	 * Refunds of manual payments are recorded only (the admin pays the customer back).
	 *
	 * @param array $payment Payment.
	 * @param float $amount  Amount.
	 * @return true
	 */
	public function refund( $payment, $amount ) {
		return true;
	}
}
