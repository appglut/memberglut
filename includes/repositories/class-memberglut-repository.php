<?php
/**
 * Base repository: safe CRUD and filtered queries on one plugin table.
 *
 * Column names are always checked against the whitelist in `$columns`; values always go through $wpdb->prepare.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared,WordPress.DB.PreparedSQL.NotPrepared,PluginCheck.Security.DirectDB.UnescapedDBParameter -- Custom tables; table and column names come from the class whitelist, values are prepared.

/**
 * MemberGlut_Repository class.
 */
abstract class MemberGlut_Repository {

	/**
	 * Short table name (without prefix).
	 *
	 * @var string
	 */
	protected $table = '';

	/**
	 * Column => format (%d, %f, %s). Columns not listed here can't be read or written.
	 *
	 * @var array
	 */
	protected $columns = array();

	/**
	 * Columns stored as JSON.
	 *
	 * @var string[]
	 */
	protected $json = array();

	/**
	 * Columns searched by the `search` query arg.
	 *
	 * @var string[]
	 */
	protected $searchable = array();

	/**
	 * Whether the table has created_at / updated_at columns maintained automatically.
	 *
	 * @var bool
	 */
	protected $timestamps = true;

	/**
	 * Primary key.
	 *
	 * @var string
	 */
	protected $primary = 'id';

	/**
	 * Full table name.
	 *
	 * @return string
	 */
	public function table() {
		global $wpdb;
		return $wpdb->prefix . 'memberglut_' . $this->table;
	}

	/**
	 * Find one row by primary key.
	 *
	 * @param int $id ID.
	 * @return array|null
	 */
	public function find( $id ) {
		global $wpdb;
		$row = $wpdb->get_row( $wpdb->prepare( "SELECT * FROM `{$this->table()}` WHERE `{$this->primary}` = %d", $id ), ARRAY_A );
		return $row ? $this->hydrate( $row ) : null;
	}

	/**
	 * Find the first row matching conditions.
	 *
	 * @param array $where Conditions (see build_where()).
	 * @return array|null
	 */
	public function find_by( array $where ) {
		$rows = $this->query( array( 'where' => $where, 'per_page' => 1 ) );
		return $rows ? $rows[0] : null;
	}

	/**
	 * Insert a row.
	 *
	 * @param array $data Column values.
	 * @return int Insert ID (0 on failure).
	 */
	public function insert( array $data ) {
		global $wpdb;
		if ( $this->timestamps ) {
			$now = memberglut_now();
			if ( isset( $this->columns['created_at'] ) && empty( $data['created_at'] ) ) {
				$data['created_at'] = $now;
			}
			if ( isset( $this->columns['updated_at'] ) && empty( $data['updated_at'] ) ) {
				$data['updated_at'] = $now;
			}
		}
		list( $data, $formats ) = $this->prepare_data( $data );
		$ok = $wpdb->insert( $this->table(), $data, $formats );
		return $ok ? (int) $wpdb->insert_id : 0;
	}

	/**
	 * Update a row.
	 *
	 * @param int   $id   ID.
	 * @param array $data Column values.
	 * @return bool
	 */
	public function update( $id, array $data ) {
		global $wpdb;
		if ( $this->timestamps && isset( $this->columns['updated_at'] ) && ! isset( $data['updated_at'] ) ) {
			$data['updated_at'] = memberglut_now();
		}
		list( $data, $formats ) = $this->prepare_data( $data );
		if ( ! $data ) {
			return true;
		}
		return false !== $wpdb->update( $this->table(), $data, array( $this->primary => (int) $id ), $formats, array( '%d' ) );
	}

	/**
	 * Delete a row.
	 *
	 * @param int $id ID.
	 * @return bool
	 */
	public function delete( $id ) {
		global $wpdb;
		return (bool) $wpdb->delete( $this->table(), array( $this->primary => (int) $id ), array( '%d' ) );
	}

	/**
	 * Delete every row matching conditions.
	 *
	 * @param array $where Conditions.
	 * @return int Rows deleted.
	 */
	public function delete_where( array $where ) {
		global $wpdb;
		$sql = $this->build_where( $where );
		if ( '1=1' === $sql ) {
			return 0; // Never delete everything by accident.
		}
		return (int) $wpdb->query( "DELETE FROM `{$this->table()}` WHERE {$sql}" );
	}

	/**
	 * Update every row matching conditions.
	 *
	 * @param array $where Conditions.
	 * @param array $data  Values.
	 * @return int Rows changed.
	 */
	public function update_where( array $where, array $data ) {
		global $wpdb;
		list( $data, $formats ) = $this->prepare_data( $data );
		if ( ! $data ) {
			return 0;
		}
		$sets = array();
		$vals = array();
		$i    = 0;
		foreach ( $data as $col => $value ) {
			if ( null === $value ) {
				$sets[] = "`{$col}` = NULL";
			} else {
				$sets[] = "`{$col}` = {$formats[ $i ]}";
				$vals[] = $value;
			}
			++$i;
		}
		$set = implode( ', ', $sets );
		$set = $vals ? $wpdb->prepare( $set, $vals ) : $set;
		return (int) $wpdb->query( "UPDATE `{$this->table()}` SET {$set} WHERE " . $this->build_where( $where ) );
	}

	/**
	 * Query rows.
	 *
	 * Args: where (array), search (string), orderby (column or "column DESC, other ASC"), order (ASC|DESC),
	 * page (1-based), per_page (0 = all), fields (column list).
	 *
	 * @param array $args Args.
	 * @return array[]
	 */
	public function query( array $args = array() ) {
		global $wpdb;
		$sql  = 'SELECT ' . $this->select_fields( $args ) . " FROM `{$this->table()}` WHERE " . $this->where_sql( $args );
		$sql .= $this->order_sql( $args );
		$sql .= $this->limit_sql( $args );
		$rows = $wpdb->get_results( $sql, ARRAY_A );
		return array_map( array( $this, 'hydrate' ), (array) $rows );
	}

	/**
	 * Count rows.
	 *
	 * @param array $args Same as query().
	 * @return int
	 */
	public function count( array $args = array() ) {
		global $wpdb;
		return (int) $wpdb->get_var( "SELECT COUNT(*) FROM `{$this->table()}` WHERE " . $this->where_sql( $args ) );
	}

	/**
	 * Count rows grouped by a column.
	 *
	 * @param string $column Column.
	 * @param array  $args   Filters.
	 * @return array value => count
	 */
	public function count_by( $column, array $args = array() ) {
		global $wpdb;
		if ( ! isset( $this->columns[ $column ] ) ) {
			return array();
		}
		$rows = $wpdb->get_results( "SELECT `{$column}` AS k, COUNT(*) AS n FROM `{$this->table()}` WHERE " . $this->where_sql( $args ) . " GROUP BY `{$column}`", ARRAY_A );
		$out  = array();
		foreach ( (array) $rows as $r ) {
			$out[ $r['k'] ] = (int) $r['n'];
		}
		return $out;
	}

	/**
	 * Sum a numeric column.
	 *
	 * @param string $column Column.
	 * @param array  $args   Filters.
	 * @return float
	 */
	public function sum( $column, array $args = array() ) {
		global $wpdb;
		if ( ! isset( $this->columns[ $column ] ) ) {
			return 0.0;
		}
		return (float) $wpdb->get_var( "SELECT COALESCE(SUM(`{$column}`),0) FROM `{$this->table()}` WHERE " . $this->where_sql( $args ) );
	}

	/**
	 * Delete everything (maintenance only).
	 *
	 * @return void
	 */
	public function truncate() {
		global $wpdb;
		$wpdb->query( "TRUNCATE TABLE `{$this->table()}`" );
	}

	/**
	 * WHERE clause for query args.
	 *
	 * @param array $args Args.
	 * @return string
	 */
	protected function where_sql( array $args ) {
		global $wpdb;
		$parts = array( $this->build_where( isset( $args['where'] ) ? (array) $args['where'] : array() ) );
		if ( ! empty( $args['search'] ) && $this->searchable ) {
			$like = '%' . $wpdb->esc_like( (string) $args['search'] ) . '%';
			$ors  = array();
			foreach ( $this->searchable as $col ) {
				$ors[] = $wpdb->prepare( "`{$col}` LIKE %s", $like );
			}
			$parts[] = '(' . implode( ' OR ', $ors ) . ')';
		}
		if ( ! empty( $args['raw_where'] ) ) {
			$parts[] = '(' . $args['raw_where'] . ')'; // Already prepared by the caller.
		}
		return implode( ' AND ', $parts );
	}

	/**
	 * Build a WHERE fragment.
	 *
	 * Keys: "column" (equals, or IN for arrays), "column !=", "column <", "column <=", "column >", "column >=",
	 * "column LIKE", "column NOT IN", "column IS NULL" (value ignored), "column IS NOT NULL".
	 *
	 * @param array $where Conditions.
	 * @return string
	 */
	public function build_where( array $where ) {
		global $wpdb;
		$parts = array();
		foreach ( $where as $key => $value ) {
			if ( ! preg_match( '/^([a-z_]+)(?:\s+(=|!=|<|<=|>|>=|LIKE|NOT IN|IN|IS NULL|IS NOT NULL))?$/', trim( $key ), $m ) ) {
				continue;
			}
			$col = $m[1];
			$op  = isset( $m[2] ) ? $m[2] : '=';
			if ( ! isset( $this->columns[ $col ] ) ) {
				continue;
			}
			$fmt = $this->columns[ $col ];
			if ( 'IS NULL' === $op || 'IS NOT NULL' === $op ) {
				$parts[] = "`{$col}` {$op}";
				continue;
			}
			if ( is_array( $value ) || 'IN' === $op || 'NOT IN' === $op ) {
				$value = array_values( (array) $value );
				if ( ! $value ) {
					$parts[] = 'NOT IN' === $op ? '1=1' : '1=0';
					continue;
				}
				$in      = implode( ',', array_fill( 0, count( $value ), $fmt ) );
				$parts[] = $wpdb->prepare( "`{$col}` " . ( 'NOT IN' === $op || '!=' === $op ? 'NOT IN' : 'IN' ) . " ({$in})", $value );
				continue;
			}
			if ( null === $value ) {
				$parts[] = '!=' === $op ? "`{$col}` IS NOT NULL" : "`{$col}` IS NULL";
				continue;
			}
			$parts[] = $wpdb->prepare( "`{$col}` {$op} {$fmt}", $value );
		}
		return $parts ? implode( ' AND ', $parts ) : '1=1';
	}

	/**
	 * Selected fields.
	 *
	 * @param array $args Args.
	 * @return string
	 */
	protected function select_fields( array $args ) {
		if ( empty( $args['fields'] ) ) {
			return '*';
		}
		$cols = array_filter( (array) $args['fields'], function ( $c ) {
			return isset( $this->columns[ $c ] ) || $c === $this->primary;
		} );
		return $cols ? '`' . implode( '`,`', $cols ) . '`' : '*';
	}

	/**
	 * ORDER BY clause.
	 *
	 * @param array $args Args.
	 * @return string
	 */
	protected function order_sql( array $args ) {
		$orderby = isset( $args['orderby'] ) ? (string) $args['orderby'] : $this->primary;
		$default = isset( $args['order'] ) && 'ASC' === strtoupper( $args['order'] ) ? 'ASC' : 'DESC';
		$parts   = array();
		foreach ( explode( ',', $orderby ) as $piece ) {
			$bits = preg_split( '/\s+/', trim( $piece ) );
			$col  = $bits[0];
			if ( ! isset( $this->columns[ $col ] ) && $col !== $this->primary ) {
				continue;
			}
			$dir     = isset( $bits[1] ) && in_array( strtoupper( $bits[1] ), array( 'ASC', 'DESC' ), true ) ? strtoupper( $bits[1] ) : $default;
			$parts[] = "`{$col}` {$dir}";
		}
		return $parts ? ' ORDER BY ' . implode( ', ', $parts ) : '';
	}

	/**
	 * LIMIT clause.
	 *
	 * @param array $args Args.
	 * @return string
	 */
	protected function limit_sql( array $args ) {
		$per_page = isset( $args['per_page'] ) ? (int) $args['per_page'] : 0;
		if ( $per_page <= 0 ) {
			return '';
		}
		$page = max( 1, isset( $args['page'] ) ? (int) $args['page'] : 1 );
		return sprintf( ' LIMIT %d OFFSET %d', $per_page, ( $page - 1 ) * $per_page );
	}

	/**
	 * Keep known columns, encode JSON, build formats.
	 *
	 * @param array $data Data.
	 * @return array [ data, formats ]
	 */
	protected function prepare_data( array $data ) {
		$out     = array();
		$formats = array();
		foreach ( $data as $col => $value ) {
			if ( ! isset( $this->columns[ $col ] ) ) {
				continue;
			}
			if ( in_array( $col, $this->json, true ) && ! is_string( $value ) && null !== $value ) {
				$value = wp_json_encode( $value );
			}
			if ( is_bool( $value ) ) {
				$value = (int) $value;
			}
			$out[ $col ] = $value;
			$formats[]   = $this->columns[ $col ];
		}
		return array( $out, $formats );
	}

	/**
	 * Decode JSON and cast numbers.
	 *
	 * @param array $row Raw row.
	 * @return array
	 */
	public function hydrate( $row ) {
		foreach ( $row as $col => $value ) {
			if ( in_array( $col, $this->json, true ) ) {
				$decoded     = null === $value || '' === $value ? array() : json_decode( $value, true );
				$row[ $col ] = is_array( $decoded ) ? $decoded : array();
			} elseif ( null !== $value && isset( $this->columns[ $col ] ) ) {
				if ( '%d' === $this->columns[ $col ] ) {
					$row[ $col ] = (int) $value;
				} elseif ( '%f' === $this->columns[ $col ] ) {
					$row[ $col ] = (float) $value;
				}
			} elseif ( $col === $this->primary ) {
				$row[ $col ] = (int) $value;
			}
		}
		return $row;
	}
}
