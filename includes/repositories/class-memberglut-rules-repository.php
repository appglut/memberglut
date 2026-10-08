<?php
/**
 * Repository for the rules table.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Rules_Repository class.
 */
class MemberGlut_Rules_Repository extends MemberGlut_Repository {

	/**
	 * Table.
	 *
	 * @var string
	 */
	protected $table = 'rules';

	/**
	 * Columns.
	 *
	 * @var array
	 */
	protected $columns = array( 'id' => '%d', 'title' => '%s', 'status' => '%s', 'priority' => '%d', 'note' => '%s', 'protect' => '%s', 'exclude' => '%s', 'include_children' => '%d', 'access' => '%s', 'action' => '%s', 'redirect' => '%d', 'custom_message' => '%d', 'message' => '%s', 'teaser' => '%s', 'in_lists' => '%s', 'created_at' => '%s', 'updated_at' => '%s' ); // phpcs:ignore WordPressVIPMinimum.Performance.WPQueryParams.PostNotIn_exclude -- “exclude” is a column of the rules table, not a query argument.

	/**
	 * JSON columns.
	 *
	 * @var string[]
	 */
	protected $json = array( 'protect', 'exclude', 'access' );

	/**
	 * Searchable columns.
	 *
	 * @var string[]
	 */
	protected $searchable = array( 'title', 'note' );
}
