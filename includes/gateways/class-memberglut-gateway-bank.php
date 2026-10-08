<?php
/**
 * Bank transfer (Payments › Bank transfer): the payment stays pending until an admin marks it paid.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Gateway_Bank class.
 */
class MemberGlut_Gateway_Bank extends MemberGlut_Gateway {

	/**
	 * ID.
	 *
	 * @var string
	 */
	public $id = 'bank';

	/**
	 * Features.
	 *
	 * @var string[]
	 */
	protected $features = array( 'one_time', 'recurring' );

	/**
	 * Title.
	 *
	 * @return string
	 */
	public function title() {
		$t = memberglut_setting( 'bank_title', '' );
		return $t ? $t : __( 'Bank transfer', 'memberglut' );
	}

	/**
	 * Mode (bank transfers are never “test”).
	 *
	 * @return string
	 */
	public function mode() {
		return 'live';
	}

	/**
	 * Leave the payment pending; give access now or on payment (Give access setting).
	 *
	 * @param array $ctx Context.
	 * @return array
	 */
	public function process( $ctx ) {
		$sub = $ctx['subscription'];
		if ( 'now' === memberglut_setting( 'bank_activate', 'on_confirm' ) && $sub && ! MemberGlut_Approval::is_pending( $ctx['user']->ID ) ) {
			MemberGlut_Subscription_Service::activate( $sub['id'] );
		}
		do_action( 'memberglut_bank_payment_pending', $ctx['payment'], $sub ? MemberGlut_Subscription_Service::get( $sub['id'] ) : null );
		return array( 'redirect' => $this->return_url( $ctx['payment'] ) );
	}
}
