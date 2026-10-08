<?php
/**
 * Repository for the coupons table.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Coupons_Repository class.
 */
class MemberGlut_Coupons_Repository extends MemberGlut_Repository {

	/**
	 * Table.
	 *
	 * @var string
	 */
	protected $table = 'coupons';

	/**
	 * Columns.
	 *
	 * @var array
	 */
	protected $columns = array( 'id' => '%d', 'code' => '%s', 'type' => '%s', 'amount' => '%f', 'plans' => '%s', 'recurring' => '%d', 'starts_at' => '%s', 'expires_at' => '%s', 'max_uses' => '%d', 'per_user' => '%d', 'new_users_only' => '%d', 'enabled' => '%d', 'uses' => '%d', 'meta' => '%s', 'created_at' => '%s', 'updated_at' => '%s' );

	/**
	 * JSON columns.
	 *
	 * @var string[]
	 */
	protected $json = array( 'plans', 'meta' );

	/**
	 * Searchable columns.
	 *
	 * @var string[]
	 */
	protected $searchable = array( 'code' );
}
