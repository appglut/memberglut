<?php
/**
 * Repository for the payments table.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Payments_Repository class.
 */
class MemberGlut_Payments_Repository extends MemberGlut_Repository {

	/**
	 * Table.
	 *
	 * @var string
	 */
	protected $table = 'payments';

	/**
	 * Columns.
	 *
	 * @var array
	 */
	protected $columns = array( 'id' => '%d', 'user_id' => '%d', 'subscription_id' => '%d', 'plan_id' => '%d', 'type' => '%s', 'status' => '%s', 'currency' => '%s', 'subtotal' => '%f', 'discount' => '%f', 'signup_fee' => '%f', 'tax' => '%f', 'amount' => '%f', 'refunded_amount' => '%f', 'gateway' => '%s', 'transaction_id' => '%s', 'coupon_code' => '%s', 'email' => '%s', 'note' => '%s', 'ip' => '%s', 'meta' => '%s', 'created_at' => '%s', 'updated_at' => '%s' );

	/**
	 * JSON columns.
	 *
	 * @var string[]
	 */
	protected $json = array( 'meta' );

	/**
	 * Searchable columns.
	 *
	 * @var string[]
	 */
	protected $searchable = array( 'transaction_id', 'email', 'coupon_code' );
}
