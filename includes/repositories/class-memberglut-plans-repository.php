<?php
/**
 * Repository for the plans table.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Plans_Repository class.
 */
class MemberGlut_Plans_Repository extends MemberGlut_Repository {

	/**
	 * Table.
	 *
	 * @var string
	 */
	protected $table = 'plans';

	/**
	 * Columns.
	 *
	 * @var array
	 */
	protected $columns = array( 'id' => '%d', 'plan_name' => '%s', 'plan_slug' => '%s', 'plan_description' => '%s', 'plan_status' => '%s', 'plan_order' => '%d', 'plan_color' => '%s', 'plan_group' => '%s', 'plan_type' => '%s', 'billing' => '%s', 'plan_price' => '%f', 'duration_length' => '%d', 'duration_unit' => '%s', 'duration_type' => '%s', 'end_date' => '%s', 'calendar_start' => '%s', 'signup_fee' => '%f', 'trial_enabled' => '%d', 'trial_length' => '%d', 'trial_unit' => '%s', 'role' => '%s', 'featured' => '%d', 'max_members' => '%d', 'settings' => '%s', 'created_at' => '%s', 'updated_at' => '%s' );

	/**
	 * JSON columns.
	 *
	 * @var string[]
	 */
	protected $json = array( 'settings' );

	/**
	 * Searchable columns.
	 *
	 * @var string[]
	 */
	protected $searchable = array( 'plan_name', 'plan_slug' );
}
