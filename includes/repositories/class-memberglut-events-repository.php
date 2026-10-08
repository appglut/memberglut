<?php
/**
 * Repository for the events table.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Events_Repository class.
 */
class MemberGlut_Events_Repository extends MemberGlut_Repository {

	/**
	 * Table.
	 *
	 * @var string
	 */
	protected $table = 'events';

	/**
	 * Columns.
	 *
	 * @var array
	 */
	protected $columns = array( 'id' => '%d', 'user_id' => '%d', 'object_type' => '%s', 'object_id' => '%d', 'event' => '%s', 'message' => '%s', 'actor_id' => '%d', 'data' => '%s', 'created_at' => '%s' );

	/**
	 * JSON columns.
	 *
	 * @var string[]
	 */
	protected $json = array( 'data' );

	/**
	 * Searchable columns.
	 *
	 * @var string[]
	 */
	protected $searchable = array( 'message' );
}
