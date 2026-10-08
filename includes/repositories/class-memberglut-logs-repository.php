<?php
/**
 * Repository for the logs table.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Logs_Repository class.
 */
class MemberGlut_Logs_Repository extends MemberGlut_Repository {

	/**
	 * Table.
	 *
	 * @var string
	 */
	protected $table = 'logs';

	/**
	 * Columns.
	 *
	 * @var array
	 */
	protected $columns = array( 'id' => '%d', 'level' => '%s', 'source' => '%s', 'message' => '%s', 'context' => '%s', 'created_at' => '%s' );

	/**
	 * JSON columns.
	 *
	 * @var string[]
	 */
	protected $json = array( 'context' );

	/**
	 * Searchable columns.
	 *
	 * @var string[]
	 */
	protected $searchable = array( 'message' );
}
