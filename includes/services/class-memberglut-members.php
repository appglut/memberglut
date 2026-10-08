<?php
/**
 * Members admin: list queries, counts, detail payload, notes, bulk actions, broadcasts and CSV export.
 *
 * Rows are subscriptions (decision D1). Accounts waiting for approval without any plan are listed too, as rows with a
 * negative id (−user_id) and no plan, so they can be approved from the Members screen.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared,WordPress.DB.PreparedSQL.NotPrepared -- Plugin tables joined with users; every value is prepared.

/**
 * MemberGlut_Members class.
 */
class MemberGlut_Members {

	const NOTES_META = 'memberglut_notes';

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'memberglut_broadcast_batch', array( __CLASS__, 'broadcast_batch' ) );
		add_action( 'memberglut_bulk_batch', array( __CLASS__, 'bulk_batch' ) );
		add_action( 'wp_login', array( __CLASS__, 'remember_login' ), 10, 2 );
	}

	/**
	 * Store the last login time.
	 *
	 * @param string  $login Username.
	 * @param WP_User $user  User.
	 * @return void
	 */
	public static function remember_login( $login, $user ) {
		if ( $user instanceof WP_User ) {
			update_user_meta( $user->ID, 'memberglut_last_login', memberglut_now() );
		}
	}

	/**
	 * SQL of the member rows (subscriptions + pending accounts without a subscription).
	 *
	 * @param array $f Filters: status, plan, gateway, search, ids (subscription ids, negative = user ids).
	 * @return string SELECT … (no ORDER/LIMIT).
	 */
	private static function rows_sql( $f ) {
		global $wpdb;
		$subs  = memberglut_repo( 'subscriptions' )->table();
		$pay   = memberglut_repo( 'payments' )->table();
		$spent = "(SELECT COALESCE(SUM(p.amount - p.refunded_amount),0) FROM `{$pay}` p WHERE p.user_id = u.ID AND p.status IN ('completed','refunded'))";
		$acct  = $wpdb->prepare( "(SELECT meta_value FROM {$wpdb->usermeta} m WHERE m.user_id = u.ID AND m.meta_key = %s LIMIT 1)", MemberGlut_Approval::META );
		$last  = $wpdb->prepare( "(SELECT meta_value FROM {$wpdb->usermeta} m2 WHERE m2.user_id = u.ID AND m2.meta_key = %s LIMIT 1)", 'memberglut_last_login' );
		$where = array( "s.status != 'abandoned'" );
		$search = '';
		if ( ! empty( $f['search'] ) ) {
			$like   = '%' . $wpdb->esc_like( $f['search'] ) . '%';
			$search = $wpdb->prepare( '(u.display_name LIKE %s OR u.user_email LIKE %s OR u.user_login LIKE %s)', $like, $like, $like );
			$where[] = $search;
		}
		if ( ! empty( $f['status'] ) ) {
			$where[] = $wpdb->prepare( 's.status = %s', $f['status'] );
		}
		if ( ! empty( $f['plan'] ) ) {
			$where[] = $wpdb->prepare( 's.plan_id = %d', $f['plan'] );
		}
		if ( ! empty( $f['gateway'] ) ) {
			$where[] = $wpdb->prepare( 's.gateway = %s', $f['gateway'] );
		}
		if ( ! empty( $f['user'] ) ) {
			$where[] = $wpdb->prepare( 's.user_id = %d', $f['user'] );
		}
		$sub_ids  = array();
		$user_ids = array();
		if ( isset( $f['ids'] ) ) {
			foreach ( (array) $f['ids'] as $id ) {
				$id = (int) $id;
				if ( $id > 0 ) {
					$sub_ids[] = $id;
				} elseif ( $id < 0 ) {
					$user_ids[] = -$id;
				}
			}
			$where[] = $sub_ids ? 's.id IN (' . implode( ',', array_map( 'intval', $sub_ids ) ) . ')' : '1=0';
		}
		$sql = "SELECT s.id, s.user_id, s.plan_id, s.status, s.start_date, s.expires_at, s.next_payment_at, s.trial_ends_at, s.gateway, s.gateway_subscription_id, s.source, s.created_at,
				u.display_name, u.user_email, u.user_login, u.user_registered, {$spent} AS total_spent, {$acct} AS account_status, {$last} AS last_login
			FROM `{$subs}` s JOIN {$wpdb->users} u ON u.ID = s.user_id WHERE " . implode( ' AND ', $where );

		// Accounts waiting for approval that have no subscription at all.
		$with_accounts = ( empty( $f['status'] ) || 'pending' === $f['status'] ) && empty( $f['plan'] ) && empty( $f['gateway'] ) && empty( $f['user'] ) && ( ! isset( $f['ids'] ) || $user_ids );
		if ( $with_accounts ) {
			$aw = array(
				$wpdb->prepare( "pm.meta_key = %s AND pm.meta_value IN ('pending_email','pending_admin')", MemberGlut_Approval::META ),
				"NOT EXISTS (SELECT 1 FROM `{$subs}` sx WHERE sx.user_id = u.ID AND sx.status != 'abandoned')",
			);
			if ( $search ) {
				$aw[] = $search;
			}
			if ( isset( $f['ids'] ) ) {
				$aw[] = 'u.ID IN (' . implode( ',', array_map( 'intval', $user_ids ) ) . ')';
			}
			$sql .= " UNION ALL SELECT -u.ID AS id, u.ID AS user_id, 0 AS plan_id, 'pending' AS status, u.user_registered AS start_date, NULL AS expires_at, NULL AS next_payment_at, NULL AS trial_ends_at, '' AS gateway, '' AS gateway_subscription_id, 'registration' AS source, u.user_registered AS created_at,
				u.display_name, u.user_email, u.user_login, u.user_registered, {$spent} AS total_spent, pm.meta_value AS account_status, {$last} AS last_login
				FROM {$wpdb->users} u JOIN {$wpdb->usermeta} pm ON pm.user_id = u.ID WHERE " . implode( ' AND ', $aw );
		}
		return $sql;
	}

	/**
	 * List members.
	 *
	 * @param array $f Filters + orderby, order, page, per_page.
	 * @return array [ items, total ]
	 */
	public static function query( $f ) {
		global $wpdb;
		$sql   = self::rows_sql( $f );
		$total = (int) $wpdb->get_var( "SELECT COUNT(*) FROM ({$sql}) t" );
		$map   = array( 'name' => 'display_name', 'started' => 'start_date', 'expires' => 'expires_at', 'spent' => 'total_spent', 'plan' => 'plan_id', 'status' => 'status' );
		$col   = isset( $f['orderby'], $map[ $f['orderby'] ] ) ? $map[ $f['orderby'] ] : 'created_at';
		$dir   = isset( $f['order'] ) && 'asc' === strtolower( $f['order'] ) ? 'ASC' : 'DESC';
		$order = "ORDER BY {$col} {$dir}, id DESC";
		$limit = '';
		if ( ! empty( $f['per_page'] ) ) {
			$page  = max( 1, (int) $f['page'] );
			$limit = $wpdb->prepare( 'LIMIT %d OFFSET %d', (int) $f['per_page'], ( $page - 1 ) * (int) $f['per_page'] );
		}
		$rows = $wpdb->get_results( "SELECT * FROM ({$sql}) t {$order} {$limit}", ARRAY_A );
		return array( array_map( array( __CLASS__, 'row' ), (array) $rows ), $total );
	}

	/**
	 * Client shape of a member row.
	 *
	 * @param array $r Raw row.
	 * @return array
	 */
	public static function row( $r ) {
		$plan = (int) $r['plan_id'] ? MemberGlut_Plans::get( (int) $r['plan_id'] ) : null;
		return array(
			'id'             => (int) $r['id'],
			'user_id'        => (int) $r['user_id'],
			'name'           => $r['display_name'] ? $r['display_name'] : $r['user_login'],
			'username'       => $r['user_login'],
			'email'          => $r['user_email'],
			'plan_id'        => (int) $r['plan_id'],
			'plan'           => $plan ? $plan['name'] : ( (int) $r['plan_id'] ? '#' . $r['plan_id'] : '' ),
			'plan_color'     => $plan ? $plan['color'] : '#94a3b8',
			'status'         => $r['status'],
			'gateway'        => $r['gateway'] ? $r['gateway'] : ( $plan && 'free' === $plan['type'] ? 'free' : 'manual' ),
			'gateway_managed' => ! empty( $r['gateway_subscription_id'] ),
			'started'        => memberglut_iso( $r['start_date'] ),
			'expires'        => memberglut_iso( $r['expires_at'] ),
			'next_payment'   => memberglut_iso( $r['next_payment_at'] ),
			'source'         => $r['source'],
			'total_spent'    => round( (float) $r['total_spent'], 2 ),
			'last_login'     => memberglut_iso( $r['last_login'] ),
			'account_status' => $r['account_status'] ? $r['account_status'] : 'approved',
			'approved'       => ! in_array( $r['account_status'], array( 'pending_email', 'pending_admin', 'rejected' ), true ),
			'account_only'   => (int) $r['id'] < 0,
		);
	}

	/**
	 * Counts per status (for tabs and stat cards).
	 *
	 * @param array $f Filters (search, plan, gateway).
	 * @return array
	 */
	public static function counts( $f = array() ) {
		global $wpdb;
		unset( $f['status'], $f['ids'] );
		$rows = $wpdb->get_results( 'SELECT status, COUNT(*) AS n FROM (' . self::rows_sql( $f ) . ') t GROUP BY status', ARRAY_A );
		$out  = array_fill_keys( array( 'active', 'trialing', 'pending', 'on_hold', 'canceled', 'expired' ), 0 );
		foreach ( (array) $rows as $r ) {
			$out[ $r['status'] ] = (int) $r['n'];
		}
		$out['all'] = array_sum( $out );
		return $out;
	}

	/* ---------------------------------------------------------------------
	 * Detail
	 * ------------------------------------------------------------------ */

	/**
	 * Member detail payload.
	 *
	 * @param int $user_id User.
	 * @return array|WP_Error
	 */
	public static function detail( $user_id ) {
		$user = get_userdata( $user_id );
		if ( ! $user ) {
			return new WP_Error( 'memberglut_no_user', __( 'User not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		$subs = array();
		foreach ( MemberGlut_Subscription_Service::for_user( $user_id ) as $sub ) {
			$plan   = MemberGlut_Plans::get( $sub['plan_id'] );
			$subs[] = array(
				'id'              => (int) $sub['id'],
				'plan_id'         => (int) $sub['plan_id'],
				'plan'            => $plan,
				'status'          => $sub['status'],
				'access'          => MemberGlut_Subscription_Service::grants_access( $sub ),
				'started'         => memberglut_iso( $sub['start_date'] ),
				'expires'         => memberglut_iso( $sub['expires_at'] ),
				'trial_ends'      => memberglut_iso( $sub['trial_ends_at'] ),
				'next_payment'    => memberglut_iso( $sub['next_payment_at'] ),
				'billing_amount'  => (float) $sub['billing_amount'],
				'cycles_done'     => (int) $sub['billing_cycles_done'],
				'cycles_total'    => (int) $sub['billing_cycles_total'],
				'gateway'         => $sub['gateway'] ? $sub['gateway'] : ( $plan && 'free' === $plan['type'] ? 'free' : 'manual' ),
				'gateway_managed' => ! empty( $sub['gateway_subscription_id'] ),
				'gateway_subscription_id' => $sub['gateway_subscription_id'],
				'scheduled_plan'  => $sub['scheduled_plan_id'] ? MemberGlut_Plans::get( $sub['scheduled_plan_id'] ) : null,
				'source'          => $sub['source'],
				'canceled_at'     => memberglut_iso( $sub['canceled_at'] ),
			);
		}
		$fields = array();
		foreach ( MemberGlut_Settings::custom_fields() as $f ) {
			$value    = get_user_meta( $user_id, $f['key'], true );
			$fields[] = array( 'key' => $f['key'], 'label' => $f['label'], 'value' => is_array( $value ) ? implode( ', ', $value ) : (string) $value );
		}
		$spent = memberglut_repo( 'payments' )->sum( 'amount', array( 'where' => array( 'user_id' => $user_id, 'status' => array( 'completed', 'refunded' ) ) ) ) - memberglut_repo( 'payments' )->sum( 'refunded_amount', array( 'where' => array( 'user_id' => $user_id ) ) );
		$consents = get_user_meta( $user_id, 'memberglut_consents', true );
		return array(
			'user'           => array(
				'id'         => $user_id,
				'name'       => $user->display_name,
				'first_name' => $user->first_name,
				'last_name'  => $user->last_name,
				'username'   => $user->user_login,
				'email'      => $user->user_email,
				'registered' => memberglut_iso( $user->user_registered ),
				'last_login' => memberglut_iso( get_user_meta( $user_id, 'memberglut_last_login', true ) ),
				'roles'      => array_map( 'memberglut_format_role_name', (array) $user->roles ),
				'avatar'     => get_avatar_url( $user_id, array( 'size' => 128 ) ),
				'is_admin'   => user_can( $user, 'manage_options' ),
				'edit_url'   => get_edit_user_link( $user_id ),
			),
			'account_status' => MemberGlut_Approval::status( $user_id ),
			'ltv'            => round( $spent, 2 ),
			'fields'         => $fields,
			'consents'       => is_array( $consents ) ? array_values( $consents ) : array(),
			'subscriptions'  => $subs,
			'notes'          => self::notes( $user_id ),
			'sessions'       => count( WP_Session_Tokens::get_instance( $user_id )->get_all() ),
		);
	}

	/**
	 * Admin notes of a member.
	 *
	 * @param int $user_id User.
	 * @return array[]
	 */
	public static function notes( $user_id ) {
		$notes = get_user_meta( $user_id, self::NOTES_META, true );
		$notes = is_array( $notes ) ? $notes : array();
		return array_map(
			static function ( $n ) {
				$author = get_userdata( $n['author_id'] );
				return array(
					'id'     => $n['id'],
					'text'   => $n['text'],
					'author' => $author ? $author->display_name : __( 'Deleted user', 'memberglut' ),
					'date'   => memberglut_iso( $n['date'] ),
				);
			},
			array_values( $notes )
		);
	}

	/**
	 * Add a note.
	 *
	 * @param int    $user_id User.
	 * @param string $text    Text.
	 * @return array|WP_Error Notes.
	 */
	public static function add_note( $user_id, $text ) {
		$text = sanitize_textarea_field( $text );
		if ( '' === trim( $text ) ) {
			return new WP_Error( 'memberglut_empty_note', __( 'Write a note first.', 'memberglut' ), array( 'status' => 400 ) );
		}
		$notes   = get_user_meta( $user_id, self::NOTES_META, true );
		$notes   = is_array( $notes ) ? $notes : array();
		$notes[] = array( 'id' => wp_generate_uuid4(), 'text' => $text, 'author_id' => get_current_user_id(), 'date' => memberglut_now() );
		update_user_meta( $user_id, self::NOTES_META, $notes );
		memberglut_event( 'note', __( 'Admin note added', 'memberglut' ), array( 'user_id' => $user_id, 'object_type' => 'user', 'object_id' => $user_id ) );
		return self::notes( $user_id );
	}

	/**
	 * Delete a note.
	 *
	 * @param int    $user_id User.
	 * @param string $note_id Note ID.
	 * @return array Notes.
	 */
	public static function delete_note( $user_id, $note_id ) {
		$notes = get_user_meta( $user_id, self::NOTES_META, true );
		$notes = is_array( $notes ) ? $notes : array();
		$notes = array_values( array_filter( $notes, static function ( $n ) use ( $note_id ) {
			return $n['id'] !== $note_id;
		} ) );
		update_user_meta( $user_id, self::NOTES_META, $notes );
		return self::notes( $user_id );
	}

	/* ---------------------------------------------------------------------
	 * Adding members
	 * ------------------------------------------------------------------ */

	/**
	 * Add member modal: existing or new user + plan.
	 *
	 * @param array $d who, user_id | first_name, last_name, email, username; plan_id, status, start, expiry, expiry_date, send_email.
	 * @return array|WP_Error Subscription row.
	 */
	public static function add( $d ) {
		$plan = MemberGlut_Plans::get( isset( $d['plan_id'] ) ? (int) $d['plan_id'] : 0 );
		if ( ! $plan ) {
			return new WP_Error( 'memberglut_invalid', __( 'Choose a plan.', 'memberglut' ), array( 'status' => 400, 'fields' => array( 'plan_id' => __( 'Choose a plan.', 'memberglut' ) ) ) );
		}
		$send = ! empty( $d['send_email'] );
		$new  = isset( $d['who'] ) && 'new' === $d['who'];
		$link = '';
		if ( $new ) {
			$email = isset( $d['email'] ) ? sanitize_email( $d['email'] ) : '';
			if ( ! is_email( $email ) ) {
				return new WP_Error( 'memberglut_invalid', __( 'Enter a valid email.', 'memberglut' ), array( 'status' => 400, 'fields' => array( 'email' => __( 'Enter a valid email.', 'memberglut' ) ) ) );
			}
			if ( email_exists( $email ) ) {
				return new WP_Error( 'memberglut_invalid', __( 'A user with this email already exists. Choose “Existing user”.', 'memberglut' ), array( 'status' => 409, 'fields' => array( 'email' => __( 'This email is already registered.', 'memberglut' ) ) ) );
			}
			$username = ! empty( $d['username'] ) ? sanitize_user( $d['username'], true ) : self::username_from_email( $email );
			if ( username_exists( $username ) || ! validate_username( $username ) ) {
				return new WP_Error( 'memberglut_invalid', __( 'This username is taken or not valid.', 'memberglut' ), array( 'status' => 409, 'fields' => array( 'username' => __( 'This username is taken or not valid.', 'memberglut' ) ) ) );
			}
			MemberGlut_Subscription_Service::$suppress_default_plan = true;
			$user_id = wp_insert_user(
				array(
					'user_login' => $username,
					'user_email' => $email,
					'user_pass'  => wp_generate_password( 24 ),
					'first_name' => isset( $d['first_name'] ) ? sanitize_text_field( $d['first_name'] ) : '',
					'last_name'  => isset( $d['last_name'] ) ? sanitize_text_field( $d['last_name'] ) : '',
					'display_name' => trim( ( isset( $d['first_name'] ) ? sanitize_text_field( $d['first_name'] ) : '' ) . ' ' . ( isset( $d['last_name'] ) ? sanitize_text_field( $d['last_name'] ) : '' ) ) ?: $username,
					'role'       => get_option( 'default_role', 'subscriber' ),
				)
			);
			MemberGlut_Subscription_Service::$suppress_default_plan = false;
			if ( is_wp_error( $user_id ) ) {
				return new WP_Error( 'memberglut_user_error', $user_id->get_error_message(), array( 'status' => 400 ) );
			}
			if ( $send ) {
				$user = get_userdata( $user_id );
				$key  = get_password_reset_key( $user );
				if ( ! is_wp_error( $key ) ) {
					$link = MemberGlut_Auth::reset_url( $user, $key );
				}
			}
		} else {
			$user_id = isset( $d['user_id'] ) ? (int) $d['user_id'] : 0;
			if ( ! get_userdata( $user_id ) ) {
				return new WP_Error( 'memberglut_invalid', __( 'Choose a user.', 'memberglut' ), array( 'status' => 400, 'fields' => array( 'user_id' => __( 'Choose a user.', 'memberglut' ) ) ) );
			}
		}
		$expiry = isset( $d['expiry'] ) ? $d['expiry'] : 'plan';
		if ( 'date' === $expiry ) {
			$expiry = ! empty( $d['expiry_date'] ) ? memberglut_parse_date( $d['expiry_date'], true ) : 'plan';
		}
		$start  = ! empty( $d['start'] ) ? memberglut_parse_date( $d['start'] ) : memberglut_now();
		$status = isset( $d['status'] ) && in_array( $d['status'], array( 'active', 'trialing', 'pending', 'on_hold' ), true ) ? $d['status'] : 'active';
		$sub    = MemberGlut_Subscription_Service::create(
			$user_id,
			$plan['id'],
			array(
				'status'     => $status,
				'start'      => $start,
				'expires'    => $expiry,
				'source'     => 'admin',
				'trial'      => 'trialing' === $status,
				'send_email' => $send && ! $new, // New users get the welcome email with the set-password link instead.
			)
		);
		if ( is_wp_error( $sub ) ) {
			return $sub;
		}
		if ( $new && $send ) {
			do_action( 'memberglut_user_registered', $user_id, array( 'set_password_link' => $link, 'source' => 'admin' ) );
		}
		return $sub;
	}

	/**
	 * Unique username from an email.
	 *
	 * @param string $email Email.
	 * @return string
	 */
	public static function username_from_email( $email ) {
		$base = sanitize_user( strtolower( current( explode( '@', $email ) ) ), true );
		$base = $base ? $base : 'member';
		$name = $base;
		$i    = 2;
		while ( username_exists( $name ) ) {
			$name = $base . $i++;
		}
		return $name;
	}

	/* ---------------------------------------------------------------------
	 * Bulk actions & broadcasts
	 * ------------------------------------------------------------------ */

	/**
	 * Run a bulk action on rows (subscription ids; negative = account-only rows).
	 *
	 * @param string $action approve|reject|change_plan|extend|expire|remove|cancel.
	 * @param int[]  $ids    Row ids.
	 * @param array  $args   plan_id, days, date.
	 * @return array [ done, failed, queued ]
	 */
	public static function bulk( $action, $ids, $args = array() ) {
		$ids = array_values( array_filter( array_map( 'intval', (array) $ids ) ) );
		if ( count( $ids ) > 100 ) {
			foreach ( array_chunk( $ids, 100 ) as $chunk ) {
				MemberGlut_Scheduler::enqueue( 'memberglut_bulk_batch', array( 'action' => $action, 'ids' => $chunk, 'args' => $args, 'actor' => get_current_user_id() ) );
			}
			return array( 'done' => 0, 'failed' => 0, 'queued' => count( $ids ) );
		}
		return self::run_bulk( $action, $ids, $args );
	}

	/**
	 * Background chunk of a bulk action.
	 *
	 * @param array $job Job.
	 * @return void
	 */
	public static function bulk_batch( $job ) {
		if ( ! empty( $job['actor'] ) ) {
			wp_set_current_user( (int) $job['actor'] );
		}
		self::run_bulk( $job['action'], $job['ids'], isset( $job['args'] ) ? $job['args'] : array() );
	}

	/**
	 * Run a bulk action now.
	 *
	 * @param string $action Action.
	 * @param int[]  $ids    Row ids.
	 * @param array  $args   Args.
	 * @return array
	 */
	private static function run_bulk( $action, $ids, $args ) {
		$done   = 0;
		$failed = 0;
		$users  = array();
		foreach ( $ids as $id ) {
			if ( $id < 0 ) {
				$users[ -$id ] = true;
				continue;
			}
			$sub = MemberGlut_Subscription_Service::get( $id );
			if ( ! $sub ) {
				++$failed;
				continue;
			}
			$users[ (int) $sub['user_id'] ] = true;
			$res = true;
			switch ( $action ) {
				case 'change_plan':
					$res = MemberGlut_Subscription_Service::change_plan( $id, isset( $args['plan_id'] ) ? (int) $args['plan_id'] : 0 );
					break;
				case 'extend':
					$res = ! empty( $args['date'] ) ? MemberGlut_Subscription_Service::admin_update( $id, array( 'expires' => $args['date'] ) ) : MemberGlut_Subscription_Service::admin_update( $id, array( 'extend_days' => max( 1, isset( $args['days'] ) ? (int) $args['days'] : 30 ) ) );
					break;
				case 'expire':
					$res = MemberGlut_Subscription_Service::expire( $id, __( '(by admin)', 'memberglut' ) );
					break;
				case 'cancel':
					$res = MemberGlut_Subscription_Service::cancel( $id );
					break;
				case 'remove':
					$res = MemberGlut_Subscription_Service::delete( $id );
					break;
				case 'activate':
					$res = MemberGlut_Subscription_Service::activate( $id );
					break;
			}
			if ( is_wp_error( $res ) ) {
				++$failed;
			} elseif ( ! in_array( $action, array( 'approve', 'reject' ), true ) ) {
				++$done;
			}
		}
		if ( in_array( $action, array( 'approve', 'reject' ), true ) ) {
			foreach ( array_keys( $users ) as $uid ) {
				$res = 'approve' === $action ? MemberGlut_Approval::approve( $uid ) : MemberGlut_Approval::reject( $uid );
				is_wp_error( $res ) ? ++$failed : ++$done;
			}
		}
		return array( 'done' => $done, 'failed' => $failed, 'queued' => 0 );
	}

	/**
	 * Queue an email to members.
	 *
	 * @param array $d plans, statuses, ids, subject, body.
	 * @return array|WP_Error [ recipients ]
	 */
	public static function broadcast( $d ) {
		$subject = isset( $d['subject'] ) ? sanitize_text_field( $d['subject'] ) : '';
		$body    = isset( $d['body'] ) ? wp_kses_post( $d['body'] ) : '';
		if ( '' === $subject || '' === trim( $body ) ) {
			return new WP_Error( 'memberglut_invalid', __( 'Enter a subject and a message.', 'memberglut' ), array( 'status' => 400 ) );
		}
		$user_ids = array();
		if ( ! empty( $d['ids'] ) ) {
			foreach ( (array) $d['ids'] as $id ) {
				$id = (int) $id;
				if ( $id < 0 ) {
					$user_ids[] = -$id;
				} elseif ( $id > 0 ) {
					$sub = MemberGlut_Subscription_Service::get( $id );
					if ( $sub ) {
						$user_ids[] = (int) $sub['user_id'];
					}
				}
			}
		} else {
			$where = array( 'status' => ! empty( $d['statuses'] ) ? array_map( 'sanitize_key', (array) $d['statuses'] ) : array( 'active', 'trialing' ) );
			if ( ! empty( $d['plans'] ) ) {
				$where['plan_id'] = array_map( 'intval', (array) $d['plans'] );
			}
			foreach ( memberglut_repo( 'subscriptions' )->query( array( 'where' => $where, 'fields' => array( 'user_id' ) ) ) as $row ) {
				$user_ids[] = (int) $row['user_id'];
			}
		}
		$user_ids = array_values( array_unique( $user_ids ) );
		if ( ! $user_ids ) {
			return new WP_Error( 'memberglut_no_recipients', __( 'No member matches these filters.', 'memberglut' ), array( 'status' => 400 ) );
		}
		foreach ( array_chunk( $user_ids, 50 ) as $chunk ) {
			MemberGlut_Scheduler::enqueue( 'memberglut_broadcast_batch', array( 'subject' => $subject, 'body' => $body, 'users' => $chunk ) );
		}
		/* translators: 1: subject, 2: number of members */
		memberglut_event( 'broadcast', sprintf( __( 'Email “%1$s” queued for %2$d members', 'memberglut' ), $subject, count( $user_ids ) ), array( 'object_type' => 'email' ) );
		return array( 'recipients' => count( $user_ids ) );
	}

	/**
	 * Send one broadcast chunk.
	 *
	 * @param array $job subject, body, users.
	 * @return void
	 */
	public static function broadcast_batch( $job ) {
		$sent = 0;
		foreach ( (array) $job['users'] as $uid ) {
			$user = get_userdata( (int) $uid );
			if ( ! $user ) {
				continue;
			}
			$subs = MemberGlut_Subscription_Service::for_user( $user->ID );
			$ctx  = array( 'user' => $user, 'subscription' => $subs ? $subs[0] : null );
			if ( MemberGlut_Mailer::send_custom( $user->user_email, $job['subject'], $job['body'], $ctx ) ) {
				++$sent;
			}
		}
		memberglut_log( 'info', 'email', sprintf( 'Broadcast “%s”: %d of %d sent', $job['subject'], $sent, count( (array) $job['users'] ) ) );
	}

	/* ---------------------------------------------------------------------
	 * Export
	 * ------------------------------------------------------------------ */

	/**
	 * Stream members as CSV (filters as in query(); custom_fields, include_inactive, plans[]).
	 *
	 * @param array $f Filters.
	 * @return void
	 */
	public static function stream_csv( $f ) {
		$custom = ! isset( $f['custom_fields'] ) || rest_sanitize_boolean( $f['custom_fields'] );
		$fields = $custom ? MemberGlut_Settings::custom_fields() : array();
		$cols   = array( 'Subscription ID', 'User ID', 'Username', 'Email', 'First name', 'Last name', 'Plan', 'Status', 'Account', 'Payment method', 'Started', 'Expires', 'Next payment', 'Total spent', 'Last login', 'Registered', 'Consent' );
		foreach ( $fields as $field ) {
			$cols[] = $field['label'];
		}
		$cols = apply_filters( 'memberglut_member_export_columns', $cols );

		nocache_headers();
		header( 'Content-Type: text/csv; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename="memberglut-members-' . gmdate( 'Y-m-d' ) . '.csv"' );
		$out = fopen( 'php://output', 'w' ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fopen -- Streaming the CSV to the browser.
		fwrite( $out, "\xEF\xBB\xBF" ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fwrite -- UTF-8 BOM for Excel.
		fputcsv( $out, $cols );
		$page = 1;
		do {
			list( $rows ) = self::query( array_merge( $f, array( 'per_page' => 500, 'page' => $page ) ) );
			foreach ( $rows as $r ) {
				if ( empty( $f['include_inactive'] ) && isset( $f['include_inactive'] ) && in_array( $r['status'], array( 'expired', 'canceled' ), true ) ) {
					continue;
				}
				if ( ! empty( $f['plans'] ) && ! in_array( $r['plan_id'], array_map( 'intval', (array) $f['plans'] ), true ) ) {
					continue;
				}
				$user     = get_userdata( $r['user_id'] );
				$consents = get_user_meta( $r['user_id'], 'memberglut_consents', true );
				$line     = array(
					$r['id'] > 0 ? $r['id'] : '',
					$r['user_id'],
					$r['username'],
					$r['email'],
					$user ? $user->first_name : '',
					$user ? $user->last_name : '',
					$r['plan'],
					$r['status'],
					$r['account_status'],
					$r['gateway'],
					$r['started'],
					$r['expires'],
					$r['next_payment'],
					$r['total_spent'],
					$r['last_login'],
					$user ? $user->user_registered : '',
					is_array( $consents ) && $consents ? end( $consents )['time'] : '',
				);
				foreach ( $fields as $field ) {
					$v      = get_user_meta( $r['user_id'], $field['key'], true );
					$line[] = is_array( $v ) ? implode( ', ', $v ) : $v;
				}
				fputcsv( $out, array_map( array( __CLASS__, 'csv_safe' ), apply_filters( 'memberglut_member_export_row', $line, $r ) ) );
			}
			++$page;
		} while ( count( $rows ) === 500 );
		fclose( $out ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_fclose -- See above.
		exit;
	}

	/**
	 * Neutralize spreadsheet formulas in CSV cells.
	 *
	 * @param mixed $v Value.
	 * @return string
	 */
	public static function csv_safe( $v ) {
		$v = (string) $v;
		return '' !== $v && in_array( $v[0], array( '=', '+', '-', '@' ), true ) && ! is_numeric( $v ) ? "'" . $v : $v;
	}
}
