<?php
/**
 * Repository for the coupon_uses table.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Coupon_Uses_Repository class.
 */
class MemberGlut_Coupon_Uses_Repository extends MemberGlut_Repository {

	/**
	 * Table.
	 *
	 * @var string
	 */
	protected $table = 'coupon_uses';

	/**
	 * Columns.
	 *
	 * @var array
	 */
	protected $columns = array( 'id' => '%d', 'coupon_id' => '%d', 'user_id' => '%d', 'email' => '%s', 'payment_id' => '%d', 'created_at' => '%s' );

	/**
	 * JSON columns.
	 *
	 * @var string[]
	 */
	protected $json = array(  );

	/**
	 * Searchable columns.
	 *
	 * @var string[]
	 */
	protected $searchable = array(  );
}
