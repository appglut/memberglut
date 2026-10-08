<?php
/**
 * Repository for the logins table.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Logins_Repository class.
 */
class MemberGlut_Logins_Repository extends MemberGlut_Repository {

	/**
	 * Table.
	 *
	 * @var string
	 */
	protected $table = 'logins';

	/**
	 * Columns.
	 *
	 * @var array
	 */
	protected $columns = array( 'id' => '%d', 'user_id' => '%d', 'ip' => '%s', 'user_agent' => '%s', 'device_label' => '%s', 'session_verifier' => '%s', 'created_at' => '%s', 'last_seen_at' => '%s', 'ended_at' => '%s' );

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
	protected $searchable = array( 'ip' );
}
