<?php
/**
 * Membership plans: mapping, validation, stats, expiry maths and purchase rules.
 *
 * Searchable/structural fields are columns of the plans table; everything else lives in the `settings` JSON column.
 * The client shape is the one used by assets/src/pages/PlanEditor.jsx.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Plans class.
 */
class MemberGlut_Plans {

	/**
	 * Statuses that grant access (see plans/01-dependency-map.md §2.7). Canceled grants access until expires_at.
	 */
	const ACCESS_STATUSES = array( 'active', 'trialing' );

	/**
	 * Per-request cache of rows.
	 *
	 * @var array|null
	 */
	private static $rows = null;

	/**
	 * Add-on plan settings: key => [ type, default, … ] (memberglut_plan_settings_schema).
	 *
	 * @return array
	 */
	public static function extra_schema() {
		$out = array();
		foreach ( (array) apply_filters( 'memberglut_plan_settings_schema', array() ) as $key => $def ) {
			if ( is_array( $def ) && ! empty( $def['type'] ) && array_key_exists( 'default', $def ) && ! array_key_exists( $key, self::settings_defaults() ) ) {
				$out[ sanitize_key( $key ) ] = $def;
			}
		}
		return $out;
	}

	/**
	 * Defaults of the settings JSON column.
	 *
	 * @return array
	 */
	public static function settings_defaults() {
		return array(
			'features'        => array(),
			'limit_cycles'    => false,
			'cycles'          => 12,
			'after_cycles'    => 'expire',
			'one_trial'       => true,
			'gateways'        => array( 'stripe', 'paypal', 'bank' ),
			'keep_roles'      => true,
			'expire_role'     => '',
			'who_can_buy'     => 'anyone',
			'buy_plans'       => array(),
			'hide_in_table'   => false,
			'allow_upgrade'   => true,
			'allow_downgrade' => true,
			'fee_on_change'   => false,
			'approval'        => 'inherit',
			'form'            => 'default',
			'redirect'        => 'inherit',
			'redirect_page'   => 0,
			'send_welcome'    => true,
			'gateway_ids'     => array(),
		);
	}

	/**
	 * All plan rows (cached per request).
	 *
	 * @return array[]
	 */
	public static function rows() {
		if ( null === self::$rows ) {
			self::$rows = memberglut_repo( 'plans' )->query( array( 'orderby' => 'plan_group ASC, plan_order ASC, id ASC' ) );
		}
		return self::$rows;
	}

	/**
	 * Forget cached rows.
	 *
	 * @return void
	 */
	public static function flush() {
		self::$rows = null;
	}

	/**
	 * All plans in client shape.
	 *
	 * @param string|null $status Only this status.
	 * @return array[]
	 */
	public static function all( $status = null ) {
		$out = array();
		foreach ( self::rows() as $row ) {
			if ( $status && $row['plan_status'] !== $status ) {
				continue;
			}
			$out[] = self::to_client( $row );
		}
		return $out;
	}

	/**
	 * All plans with stats (members, revenue, sold out, signup URL).
	 *
	 * @param bool $stats Include stats.
	 * @return array[]
	 */
	public static function all_for_client( $stats = true ) {
		$plans = self::all();
		if ( ! $stats ) {
			return $plans;
		}
		$members = self::member_counts();
		$revenue = self::revenue_by_plan();
		$subs    = memberglut_repo( 'subscriptions' )->count_by( 'plan_id', array( 'where' => array( 'status !=' => 'abandoned' ) ) );
		foreach ( $plans as &$p ) {
			$p['members']       = isset( $members[ $p['id'] ] ) ? $members[ $p['id'] ] : 0;
			$p['subscriptions'] = isset( $subs[ $p['id'] ] ) ? (int) $subs[ $p['id'] ] : 0;
			$p['revenue']  = isset( $revenue[ $p['id'] ] ) ? $revenue[ $p['id'] ] : 0;
			$p['sold_out'] = self::is_sold_out( $p );
		}
		return $plans;
	}

	/**
	 * One plan in client shape.
	 *
	 * @param int|string $id_or_slug ID or slug.
	 * @return array|null
	 */
	public static function get( $id_or_slug ) {
		foreach ( self::rows() as $row ) {
			if ( ( is_numeric( $id_or_slug ) && (int) $row['id'] === (int) $id_or_slug ) || ( ! is_numeric( $id_or_slug ) && $row['plan_slug'] === $id_or_slug ) ) {
				return self::to_client( $row );
			}
		}
		return null;
	}

	/**
	 * Row → client shape.
	 *
	 * @param array $row DB row.
	 * @return array
	 */
	public static function to_client( $row ) {
		$s = array_merge( self::settings_defaults(), is_array( $row['settings'] ) ? $row['settings'] : array() );
		$plan = array(
			'id'              => (int) $row['id'],
			'name'            => (string) $row['plan_name'],
			'slug'            => (string) $row['plan_slug'],
			'description'     => (string) $row['plan_description'],
			'features'        => array_values( (array) $s['features'] ),
			'status'          => (string) $row['plan_status'],
			'color'           => (string) $row['plan_color'],
			'featured'        => (bool) $row['featured'],
			'group'           => (string) $row['plan_group'],
			'tier'            => (int) $row['plan_order'],
			'type'            => (string) $row['plan_type'],
			'price'           => (float) $row['plan_price'],
			'billing'         => (string) $row['billing'],
			'duration'        => array(
				'length' => (int) $row['duration_length'],
				'unit'   => (string) $row['duration_unit'],
			),
			'limit_cycles'    => (bool) $s['limit_cycles'],
			'cycles'          => (int) $s['cycles'],
			'after_cycles'    => (string) $s['after_cycles'],
			'trial'           => (bool) $row['trial_enabled'],
			'trial_length'    => array(
				'length' => (int) $row['trial_length'],
				'unit'   => (string) $row['trial_unit'],
			),
			'one_trial'       => (bool) $s['one_trial'],
			'signup_fee'      => (float) $row['signup_fee'],
			'gateways'        => array_values( (array) $s['gateways'] ),
			'duration_type'   => (string) $row['duration_type'],
			'end_date'        => $row['end_date'] ? (string) $row['end_date'] : '',
			'calendar_start'  => (string) $row['calendar_start'],
			'role'            => (string) $row['role'],
			'keep_roles'      => (bool) $s['keep_roles'],
			'expire_role'     => (string) $s['expire_role'],
			'who_can_buy'     => (string) $s['who_can_buy'],
			'buy_plans'       => array_map( 'intval', (array) $s['buy_plans'] ),
			'hide_in_table'   => (bool) $s['hide_in_table'],
			'max_members'     => (int) $row['max_members'],
			'allow_upgrade'   => (bool) $s['allow_upgrade'],
			'allow_downgrade' => (bool) $s['allow_downgrade'],
			'fee_on_change'   => (bool) $s['fee_on_change'],
			'approval'        => (string) $s['approval'],
			'form'            => (string) $s['form'],
			'redirect'        => (string) $s['redirect'],
			'redirect_page'   => (int) $s['redirect_page'],
			'send_welcome'    => (bool) $s['send_welcome'],
			'signup_url'      => self::signup_url( $row['plan_slug'] ),
			'created_at'      => memberglut_iso( $row['created_at'] ),
			'updated_at'      => memberglut_iso( $row['updated_at'] ),
		);
		foreach ( self::extra_schema() as $key => $def ) {
			$plan[ $key ] = isset( $s[ $key ] ) ? $s[ $key ] : $def['default'];
		}
		return apply_filters( 'memberglut_plan', $plan, $row );
	}

	/**
	 * Gateway object IDs stored on the plan (Stripe product/price…), keyed by gateway + mode.
	 *
	 * @param int $plan_id Plan ID.
	 * @return array
	 */
	public static function gateway_ids( $plan_id ) {
		$row = memberglut_repo( 'plans' )->find( $plan_id );
		return $row && isset( $row['settings']['gateway_ids'] ) ? (array) $row['settings']['gateway_ids'] : array();
	}

	/**
	 * Store gateway object IDs.
	 *
	 * @param int   $plan_id Plan ID.
	 * @param array $ids     IDs.
	 * @return void
	 */
	public static function set_gateway_ids( $plan_id, $ids ) {
		$row = memberglut_repo( 'plans' )->find( $plan_id );
		if ( ! $row ) {
			return;
		}
		$settings                = is_array( $row['settings'] ) ? $row['settings'] : array();
		$settings['gateway_ids'] = $ids;
		memberglut_repo( 'plans' )->update( $plan_id, array( 'settings' => $settings ) );
		self::flush();
	}

	/**
	 * Signup link for a plan.
	 *
	 * @param string $slug Slug.
	 * @return string
	 */
	public static function signup_url( $slug ) {
		$base = memberglut_page_url( 'register' );
		if ( ! $base ) {
			$base = home_url( '/register/' );
		}
		return add_query_arg( 'plan', rawurlencode( $slug ), $base );
	}

	/**
	 * Validate client data and turn it into columns.
	 *
	 * @param array      $data     Client data.
	 * @param array|null $existing Existing plan (client shape) when updating.
	 * @return array|WP_Error Columns.
	 */
	public static function prepare( array $data, $existing = null ) {
		$base   = $existing ? $existing : self::client_defaults();
		$v      = array_merge( $base, array_intersect_key( $data, $base ) );
		$errors = array();

		$v['name'] = sanitize_text_field( (string) $v['name'] );
		if ( '' === $v['name'] ) {
			$errors['name'] = __( 'Give the plan a name.', 'memberglut' );
		}
		$v['slug'] = sanitize_title( (string) $v['slug'] );
		if ( '' === $v['slug'] ) {
			$v['slug'] = sanitize_title( $v['name'] );
		}
		$v['slug'] = self::unique_slug( $v['slug'], $existing ? $existing['id'] : 0 );

		$v['type']    = in_array( $v['type'], array( 'free', 'paid' ), true ) ? $v['type'] : 'paid';
		$v['billing'] = in_array( $v['billing'], array( 'one_time', 'recurring' ), true ) ? $v['billing'] : 'one_time';
		$v['price']   = round( max( 0, (float) $v['price'] ), 4 );
		if ( 'free' === $v['type'] ) {
			$v['price']      = 0;
			$v['signup_fee'] = 0;
			$v['billing']    = 'one_time';
			$v['trial']      = false;
		} elseif ( $v['price'] <= 0 ) {
			$errors['price'] = __( 'A paid plan needs a price above zero. Choose “Free” for a free plan.', 'memberglut' );
		}
		$units = array( 'day', 'week', 'month', 'year' );
		foreach ( array( 'duration', 'trial_length' ) as $k ) {
			$d       = is_array( $v[ $k ] ) ? $v[ $k ] : array();
			$v[ $k ] = array(
				'length' => max( 1, (int) ( isset( $d['length'] ) ? $d['length'] : 1 ) ),
				'unit'   => isset( $d['unit'] ) && in_array( $d['unit'], $units, true ) ? $d['unit'] : 'month',
			);
		}
		$recurring = 'paid' === $v['type'] && 'recurring' === $v['billing'];
		if ( ! $recurring ) {
			$v['trial']        = false;
			$v['limit_cycles'] = false;
		}
		$v['cycles'] = (int) $v['cycles'];
		if ( $recurring && ! empty( $v['limit_cycles'] ) && ( $v['cycles'] < 2 || $v['cycles'] > 120 ) ) {
			$errors['cycles'] = __( 'Enter between 2 and 120 payments.', 'memberglut' );
		}
		$v['after_cycles'] = in_array( $v['after_cycles'], array( 'keep', 'expire' ), true ) ? $v['after_cycles'] : 'expire';
		$v['signup_fee']   = round( max( 0, (float) $v['signup_fee'] ), 4 );

		$v['duration_type'] = in_array( $v['duration_type'], array( 'unlimited', 'fixed', 'date', 'calendar' ), true ) ? $v['duration_type'] : 'unlimited';
		if ( $recurring ) {
			$v['duration_type'] = 'unlimited'; // Access follows the payments.
		}
		$v['end_date'] = $v['end_date'] ? substr( sanitize_text_field( (string) $v['end_date'] ), 0, 10 ) : '';
		if ( 'date' === $v['duration_type'] ) {
			if ( ! preg_match( '/^\d{4}-\d{2}-\d{2}$/', $v['end_date'] ) ) {
				$errors['end_date'] = __( 'Choose the date access ends.', 'memberglut' );
			} elseif ( ( ! $existing || $existing['end_date'] !== $v['end_date'] ) && $v['end_date'] < wp_date( 'Y-m-d' ) ) {
				$errors['end_date'] = __( 'The end date is in the past.', 'memberglut' );
			}
		}
		$v['calendar_start'] = sanitize_text_field( (string) $v['calendar_start'] );
		if ( 'calendar' === $v['duration_type'] && ! self::valid_month_day( $v['calendar_start'] ) ) {
			$errors['calendar_start'] = __( 'Use the format MM-DD, e.g. 01-01 or 07-01.', 'memberglut' );
		}

		$v['role'] = sanitize_key( (string) $v['role'] );
		if ( $v['role'] && ! get_role( $v['role'] ) ) {
			$errors['role'] = __( 'This role does not exist.', 'memberglut' );
		}
		if ( 'administrator' === $v['role'] ) {
			$errors['role'] = __( 'Plans cannot give the Administrator role.', 'memberglut' );
		}
		$v['expire_role'] = sanitize_key( (string) $v['expire_role'] );
		if ( $v['expire_role'] && ( ! get_role( $v['expire_role'] ) || 'administrator' === $v['expire_role'] ) ) {
			$errors['expire_role'] = __( 'Choose an existing role.', 'memberglut' );
		}

		$known       = array_column( MemberGlut_Lookups::gateways(), 'value' );
		$v['gateways'] = array_values( array_intersect( array_map( 'sanitize_key', (array) $v['gateways'] ), $known ) );
		if ( 'paid' === $v['type'] && ! $v['gateways'] ) {
			$errors['gateways'] = __( 'Choose at least one payment method.', 'memberglut' );
		}

		$v['who_can_buy'] = in_array( $v['who_can_buy'], array( 'anyone', 'new', 'members' ), true ) ? $v['who_can_buy'] : 'anyone';
		$v['buy_plans']   = array_values( array_filter( array_map( 'intval', (array) $v['buy_plans'] ) ) );
		if ( 'members' === $v['who_can_buy'] && ! $v['buy_plans'] ) {
			$errors['buy_plans'] = __( 'Choose the plans whose members can join.', 'memberglut' );
		}
		$v['max_members'] = max( 0, (int) $v['max_members'] );
		$v['status']      = in_array( $v['status'], array( 'active', 'inactive' ), true ) ? $v['status'] : 'active';
		$v['color']       = sanitize_hex_color( (string) $v['color'] ) ? sanitize_hex_color( (string) $v['color'] ) : '#e94560';
		$v['group']       = sanitize_text_field( (string) $v['group'] );
		$v['group']       = '' === $v['group'] ? 'Main' : $v['group'];
		$v['approval']    = in_array( $v['approval'], array( 'inherit', 'auto', 'email', 'admin' ), true ) ? $v['approval'] : 'inherit';
		$forms            = array_keys( self::registration_forms() );
		$v['form']        = in_array( $v['form'], $forms, true ) ? $v['form'] : 'default';
		$v['redirect']    = in_array( $v['redirect'], array( 'inherit', 'page' ), true ) ? $v['redirect'] : 'inherit';
		$v['redirect_page'] = absint( $v['redirect_page'] );
		if ( 'page' === $v['redirect'] && ( ! $v['redirect_page'] || 'page' !== get_post_type( $v['redirect_page'] ) ) ) {
			$errors['redirect_page'] = __( 'Choose the page members go to after joining.', 'memberglut' );
		}
		$v['features']    = array_values( array_filter( array_map( 'sanitize_text_field', (array) $v['features'] ) ) );
		$v['description'] = sanitize_textarea_field( (string) $v['description'] );

		$errors = apply_filters( 'memberglut_plan_validation_errors', $errors, $v, $existing );
		if ( $errors ) {
			return new WP_Error( 'memberglut_invalid_plan', __( 'Please fix the highlighted fields.', 'memberglut' ), array( 'status' => 400, 'fields' => $errors ) );
		}

		$settings = $existing ? self::stored_settings( $existing['id'] ) : array();
		foreach ( array_keys( self::settings_defaults() ) as $key ) {
			if ( 'gateway_ids' === $key ) {
				continue;
			}
			$settings[ $key ] = $v[ $key ];
		}
		// Add-on plan settings (memberglut_plan_settings_schema), shown in the Plan editor through the JS registry.
		foreach ( self::extra_schema() as $key => $def ) {
			$raw              = array_key_exists( $key, $data ) ? $data[ $key ] : ( isset( $settings[ $key ] ) ? $settings[ $key ] : $def['default'] );
			$settings[ $key ] = MemberGlut_Settings::sanitize( $raw, $def, $key );
		}
		$columns = array(
			'plan_name'        => $v['name'],
			'plan_slug'        => $v['slug'],
			'plan_description' => $v['description'],
			'plan_status'      => $v['status'],
			'plan_color'       => $v['color'],
			'plan_group'       => $v['group'],
			'plan_type'        => $v['type'],
			'billing'          => $v['billing'],
			'plan_price'       => $v['price'],
			'duration_length'  => $v['duration']['length'],
			'duration_unit'    => $v['duration']['unit'],
			'duration_type'    => $v['duration_type'],
			'end_date'         => 'date' === $v['duration_type'] ? $v['end_date'] : null,
			'calendar_start'   => self::valid_month_day( $v['calendar_start'] ) ? $v['calendar_start'] : '01-01',
			'signup_fee'       => $v['signup_fee'],
			'trial_enabled'    => ! empty( $v['trial'] ),
			'trial_length'     => $v['trial_length']['length'],
			'trial_unit'       => $v['trial_length']['unit'],
			'role'             => $v['role'],
			'featured'         => ! empty( $v['featured'] ),
			'max_members'      => $v['max_members'],
			'settings'         => $settings,
		);
		if ( isset( $data['tier'] ) ) {
			$columns['plan_order'] = (int) $data['tier'];
		}
		return apply_filters( 'memberglut_plan_columns', $columns, $v, $existing );
	}

	/**
	 * Defaults of a new plan (client shape).
	 *
	 * @return array
	 */
	public static function client_defaults() {
		return array(
			'name'            => '',
			'slug'            => '',
			'description'     => '',
			'features'        => array(),
			'status'          => 'active',
			'color'           => '#e94560',
			'featured'        => false,
			'group'           => 'Main',
			'type'            => 'paid',
			'price'           => 10,
			'billing'         => 'recurring',
			'duration'        => array( 'length' => 1, 'unit' => 'month' ),
			'limit_cycles'    => false,
			'cycles'          => 12,
			'after_cycles'    => 'expire',
			'trial'           => false,
			'trial_length'    => array( 'length' => 7, 'unit' => 'day' ),
			'one_trial'       => true,
			'signup_fee'      => 0,
			'gateways'        => array( 'stripe', 'paypal', 'bank' ),
			'duration_type'   => 'unlimited',
			'end_date'        => '',
			'calendar_start'  => '01-01',
			'role'            => get_option( 'default_role', 'subscriber' ),
			'keep_roles'      => true,
			'expire_role'     => '',
			'who_can_buy'     => 'anyone',
			'buy_plans'       => array(),
			'hide_in_table'   => false,
			'max_members'     => 0,
			'allow_upgrade'   => true,
			'allow_downgrade' => true,
			'fee_on_change'   => false,
			'approval'        => 'inherit',
			'form'            => 'default',
			'redirect'        => 'inherit',
			'redirect_page'   => 0,
			'send_welcome'    => true,
		);
	}

	/**
	 * Stored settings JSON of a plan.
	 *
	 * @param int $id Plan ID.
	 * @return array
	 */
	private static function stored_settings( $id ) {
		$row = memberglut_repo( 'plans' )->find( $id );
		return $row && is_array( $row['settings'] ) ? $row['settings'] : array();
	}

	/**
	 * Registration forms offered in the plan editor (free: only the default form; Pro adds more — decision D2).
	 *
	 * @return array key => label
	 */
	public static function registration_forms() {
		return apply_filters( 'memberglut_registration_forms', array( 'default' => __( 'Default registration form', 'memberglut' ) ) );
	}

	/**
	 * Create or update a plan.
	 *
	 * @param array $data Client data (with id to update).
	 * @return array|WP_Error Saved plan.
	 */
	public static function save( array $data ) {
		$id       = isset( $data['id'] ) ? (int) $data['id'] : 0;
		$existing = $id ? self::get( $id ) : null;
		if ( $id && ! $existing ) {
			return new WP_Error( 'memberglut_not_found', __( 'Plan not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		$columns = self::prepare( $data, $existing );
		if ( is_wp_error( $columns ) ) {
			return $columns;
		}
		if ( $existing ) {
			memberglut_repo( 'plans' )->update( $id, $columns );
		} else {
			if ( ! isset( $columns['plan_order'] ) ) {
				$columns['plan_order'] = self::next_order( $columns['plan_group'] );
			}
			$id = memberglut_repo( 'plans' )->insert( $columns );
			if ( ! $id ) {
				return new WP_Error( 'memberglut_db_error', __( 'The plan could not be saved.', 'memberglut' ), array( 'status' => 500 ) );
			}
		}
		self::flush();
		$plan = self::get( $id );
		memberglut_event( $existing ? 'plan_updated' : 'plan_created', sprintf( /* translators: %s: plan name */ $existing ? __( 'Plan “%s” updated', 'memberglut' ) : __( 'Plan “%s” created', 'memberglut' ), $plan['name'] ), array( 'object_type' => 'plan', 'object_id' => $id ) );
		do_action( 'memberglut_plan_saved', $plan, $existing );
		memberglut_clear_cache();
		return $plan;
	}

	/**
	 * Next order number in a group.
	 *
	 * @param string $group Group.
	 * @return int
	 */
	private static function next_order( $group ) {
		$max = 0;
		foreach ( self::rows() as $row ) {
			if ( $row['plan_group'] === $group ) {
				$max = max( $max, (int) $row['plan_order'] );
			}
		}
		return $max + 1;
	}

	/**
	 * Unique slug.
	 *
	 * @param string $slug    Wanted slug.
	 * @param int    $exclude Plan ID to ignore.
	 * @return string
	 */
	public static function unique_slug( $slug, $exclude = 0 ) {
		$slug  = $slug ? $slug : 'plan';
		$taken = array();
		foreach ( self::rows() as $row ) {
			if ( (int) $row['id'] !== (int) $exclude ) {
				$taken[] = $row['plan_slug'];
			}
		}
		$try = $slug;
		$i   = 2;
		while ( in_array( $try, $taken, true ) ) {
			$try = $slug . '-' . $i++;
		}
		return $try;
	}

	/**
	 * Change status.
	 *
	 * @param int    $id     ID.
	 * @param string $status active|inactive.
	 * @return array|WP_Error
	 */
	public static function set_status( $id, $status ) {
		$plan = self::get( $id );
		if ( ! $plan ) {
			return new WP_Error( 'memberglut_not_found', __( 'Plan not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		$status = 'active' === $status ? 'active' : 'inactive';
		memberglut_repo( 'plans' )->update( $id, array( 'plan_status' => $status ) );
		self::flush();
		$new = self::get( $id );
		do_action( 'memberglut_plan_saved', $new, $plan );
		memberglut_clear_cache();
		return $new;
	}

	/**
	 * Save the order of the plans in a group.
	 *
	 * @param string $group Group.
	 * @param int[]  $ids   Plan IDs, lowest tier first.
	 * @return void
	 */
	public static function reorder( $group, array $ids ) {
		$order = 1;
		foreach ( $ids as $id ) {
			$plan = self::get( (int) $id );
			if ( $plan ) {
				memberglut_repo( 'plans' )->update( (int) $id, array( 'plan_order' => $order++, 'plan_group' => sanitize_text_field( $group ) ) );
			}
		}
		self::flush();
		memberglut_clear_cache();
	}

	/**
	 * Duplicate a plan as an inactive copy (decision D15).
	 *
	 * @param int  $id         ID.
	 * @param bool $with_rules Also give the copy access to the rules of the original.
	 * @return array|WP_Error
	 */
	public static function duplicate( $id, $with_rules = false ) {
		$plan = self::get( $id );
		if ( ! $plan ) {
			return new WP_Error( 'memberglut_not_found', __( 'Plan not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		$copy = $plan;
		unset( $copy['id'] );
		/* translators: %s: plan name */
		$copy['name']   = sprintf( __( '%s (copy)', 'memberglut' ), $plan['name'] );
		$copy['slug']   = $plan['slug'] . '-copy';
		$copy['status'] = 'inactive';
		$new            = self::save( $copy );
		if ( is_wp_error( $new ) ) {
			return $new;
		}
		if ( $with_rules ) {
			foreach ( self::rules_for_plan( $id ) as $rule ) {
				$access          = $rule['access'];
				$access['plans'] = array_values( array_unique( array_merge( (array) $access['plans'], array( $new['id'] ) ) ) );
				memberglut_repo( 'rules' )->update( $rule['id'], array( 'access' => $access ) );
			}
			memberglut_clear_cache();
		}
		return $new;
	}

	/**
	 * Number of subscriptions of a plan (any status).
	 *
	 * @param int $id Plan ID.
	 * @return int
	 */
	public static function subscription_count( $id ) {
		return memberglut_repo( 'subscriptions' )->count( array( 'where' => array( 'plan_id' => (int) $id, 'status !=' => 'abandoned' ) ) );
	}

	/**
	 * Delete a plan (decision D16): refused while any subscription uses it; references are cleaned up.
	 *
	 * @param int $id ID.
	 * @return true|WP_Error
	 */
	public static function delete( $id ) {
		$plan = self::get( $id );
		if ( ! $plan ) {
			return new WP_Error( 'memberglut_not_found', __( 'Plan not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		$count = self::subscription_count( $id );
		if ( $count > 0 ) {
			/* translators: %d: number of subscriptions */
			return new WP_Error( 'memberglut_plan_in_use', sprintf( _n( '%d member has this plan. Make it inactive instead to keep them.', '%d members have this plan. Make it inactive instead to keep them.', $count, 'memberglut' ), $count ), array( 'status' => 409 ) );
		}
		memberglut_repo( 'plans' )->delete( $id );
		self::remove_references( (int) $id );
		self::flush();
		memberglut_event( 'plan_deleted', sprintf( /* translators: %s: plan name */ __( 'Plan “%s” deleted', 'memberglut' ), $plan['name'] ), array( 'object_type' => 'plan', 'object_id' => $id ) );
		do_action( 'memberglut_plan_deleted', $plan );
		memberglut_clear_cache();
		return true;
	}

	/**
	 * Remove a deleted plan from rules, coupons, pricing table, default plan, other plans and post settings.
	 *
	 * @param int $id Plan ID.
	 * @return void
	 */
	private static function remove_references( $id ) {
		$strip = static function ( $list ) use ( $id ) {
			return array_values( array_diff( array_map( 'intval', (array) $list ), array( $id ) ) );
		};
		foreach ( memberglut_repo( 'rules' )->query() as $rule ) {
			if ( in_array( $id, array_map( 'intval', (array) ( isset( $rule['access']['plans'] ) ? $rule['access']['plans'] : array() ) ), true ) ) {
				$access          = $rule['access'];
				$access['plans'] = $strip( $access['plans'] );
				memberglut_repo( 'rules' )->update( $rule['id'], array( 'access' => $access ) );
			}
		}
		foreach ( memberglut_repo( 'coupons' )->query() as $coupon ) {
			if ( in_array( $id, array_map( 'intval', (array) $coupon['plans'] ), true ) ) {
				memberglut_repo( 'coupons' )->update( $coupon['id'], array( 'plans' => $strip( $coupon['plans'] ) ) );
			}
		}
		$pricing = (array) memberglut_form_setting( 'pricing_plans', array() );
		if ( in_array( $id, array_map( 'intval', $pricing ), true ) ) {
			MemberGlut_Settings::update_forms( array( 'pricing_plans' => $strip( $pricing ) ) );
		}
		if ( (int) memberglut_setting( 'default_plan' ) === $id ) {
			MemberGlut_Settings::update( array( 'default_plan' => 0 ) );
		}
		foreach ( memberglut_repo( 'plans' )->query() as $row ) {
			$s = is_array( $row['settings'] ) ? $row['settings'] : array();
			if ( ! empty( $s['buy_plans'] ) && in_array( $id, array_map( 'intval', $s['buy_plans'] ), true ) ) {
				$s['buy_plans'] = $strip( $s['buy_plans'] );
				memberglut_repo( 'plans' )->update( $row['id'], array( 'settings' => $s ) );
			}
		}
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Finding posts whose access settings mention the plan.
		$post_ids = $wpdb->get_col( $wpdb->prepare( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_memberglut_access' AND meta_value LIKE %s", '%"plans"%' ) );
		foreach ( $post_ids as $post_id ) {
			$access = json_decode( (string) get_post_meta( $post_id, '_memberglut_access', true ), true );
			if ( is_array( $access ) && ! empty( $access['plans'] ) && in_array( $id, array_map( 'intval', $access['plans'] ), true ) ) {
				$access['plans'] = $strip( $access['plans'] );
				update_post_meta( $post_id, '_memberglut_access', wp_slash( wp_json_encode( $access ) ) );
			}
		}
	}

	/**
	 * Rules whose “who can access” lists this plan.
	 *
	 * @param int $id Plan ID.
	 * @return array[]
	 */
	public static function rules_for_plan( $id ) {
		$out = array();
		foreach ( memberglut_repo( 'rules' )->query( array( 'orderby' => 'priority DESC' ) ) as $rule ) {
			$plans = isset( $rule['access']['plans'] ) ? array_map( 'intval', (array) $rule['access']['plans'] ) : array();
			if ( isset( $rule['access']['who'] ) && 'plans' === $rule['access']['who'] && in_array( (int) $id, $plans, true ) ) {
				$out[] = $rule;
			}
		}
		return $out;
	}

	/**
	 * SQL fragment: subscription rows that currently grant access.
	 *
	 * @return string
	 */
	public static function access_sql() {
		global $wpdb;
		return $wpdb->prepare( "(status IN ('active','trialing') OR (status = 'canceled' AND expires_at IS NOT NULL AND expires_at > %s))", memberglut_now() );
	}

	/**
	 * Members per plan (subscriptions that grant access).
	 *
	 * @return array plan_id => count
	 */
	public static function member_counts() {
		global $wpdb;
		$table = memberglut_repo( 'subscriptions' )->table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared,WordPress.DB.PreparedSQL.NotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Plugin table; access_sql() is prepared.
		$rows = $wpdb->get_results( "SELECT plan_id, COUNT(*) AS n FROM `{$table}` WHERE " . self::access_sql() . ' GROUP BY plan_id', ARRAY_A );
		$out  = array();
		foreach ( (array) $rows as $r ) {
			$out[ (int) $r['plan_id'] ] = (int) $r['n'];
		}
		return $out;
	}

	/**
	 * Net revenue per plan.
	 *
	 * @return array plan_id => amount
	 */
	public static function revenue_by_plan() {
		global $wpdb;
		$table = memberglut_repo( 'payments' )->table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Plugin table.
		$rows = $wpdb->get_results( "SELECT plan_id, SUM(amount - refunded_amount) AS total FROM `{$table}` WHERE status IN ('completed','refunded') GROUP BY plan_id", ARRAY_A );
		$out  = array();
		foreach ( (array) $rows as $r ) {
			$out[ (int) $r['plan_id'] ] = round( (float) $r['total'], 2 );
		}
		return $out;
	}

	/**
	 * Whether the member limit is reached (access + pending subscriptions count).
	 *
	 * @param array $plan Plan (client shape).
	 * @return bool
	 */
	public static function is_sold_out( $plan ) {
		if ( empty( $plan['max_members'] ) ) {
			return false;
		}
		global $wpdb;
		$table = memberglut_repo( 'subscriptions' )->table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared,WordPress.DB.PreparedSQL.NotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Plugin table; access_sql() is prepared.
		$n = (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM `{$table}` WHERE plan_id = %d AND (" . self::access_sql() . " OR status = 'pending')", $plan['id'] ) );
		return $n >= (int) $plan['max_members'];
	}

	/**
	 * Expiry date for a new period of a non-recurring plan, or for recurring the end of the first period.
	 *
	 * @param array  $plan  Plan (client shape).
	 * @param string $start UTC start date (default now).
	 * @return string|null UTC date or null (never).
	 */
	public static function calculate_expiry( $plan, $start = '' ) {
		$start = $start ? $start : memberglut_now();
		if ( 'paid' === $plan['type'] && 'recurring' === $plan['billing'] ) {
			return memberglut_add_duration( $start, $plan['duration']['length'], $plan['duration']['unit'] );
		}
		switch ( $plan['duration_type'] ) {
			case 'fixed':
				return memberglut_add_duration( $start, $plan['duration']['length'], $plan['duration']['unit'] );
			case 'date':
				return $plan['end_date'] ? memberglut_parse_date( $plan['end_date'], true ) : null;
			case 'calendar':
				return self::next_calendar_date( $plan['calendar_start'], $start );
		}
		return null;
	}

	/**
	 * Next occurrence of MM-DD (site timezone, start of day) strictly after a UTC date.
	 *
	 * @param string $month_day MM-DD.
	 * @param string $after     UTC date.
	 * @return string UTC date.
	 */
	public static function next_calendar_date( $month_day, $after ) {
		$month_day = self::valid_month_day( $month_day ) ? $month_day : '01-01';
		$tz        = wp_timezone();
		$from      = new DateTime( $after, new DateTimeZone( 'UTC' ) );
		$from->setTimezone( $tz );
		$year = (int) $from->format( 'Y' );
		$date = new DateTime( $year . '-' . $month_day . ' 00:00:00', $tz );
		if ( $date <= $from ) {
			$date = new DateTime( ( $year + 1 ) . '-' . $month_day . ' 00:00:00', $tz );
		}
		$date->setTimezone( new DateTimeZone( 'UTC' ) );
		return $date->format( 'Y-m-d H:i:s' );
	}

	/**
	 * Valid MM-DD.
	 *
	 * @param string $value Value.
	 * @return bool
	 */
	public static function valid_month_day( $value ) {
		if ( ! preg_match( '/^(\d{2})-(\d{2})$/', (string) $value, $m ) ) {
			return false;
		}
		return checkdate( (int) $m[1], (int) $m[2], 2024 );
	}

	/**
	 * Payment methods usable for a plan: the plan's choice ∩ globally enabled gateways.
	 *
	 * @param array $plan Plan.
	 * @return string[]
	 */
	public static function available_gateways( $plan ) {
		if ( 'free' === $plan['type'] ) {
			return array();
		}
		$enabled = array();
		foreach ( MemberGlut_Lookups::gateways() as $g ) {
			if ( ! empty( $g['enabled'] ) ) {
				$enabled[] = $g['value'];
			}
		}
		return array_values( array_intersect( $plan['gateways'], $enabled ) );
	}

	/**
	 * Whether a user (or a guest) may buy/join a plan.
	 *
	 * @param array $plan    Plan.
	 * @param int   $user_id User ID (0 = guest).
	 * @return true|WP_Error
	 */
	public static function can_join( $plan, $user_id = 0 ) {
		if ( 'active' !== $plan['status'] ) {
			return new WP_Error( 'memberglut_plan_inactive', __( 'This plan is not available.', 'memberglut' ) );
		}
		if ( self::is_sold_out( $plan ) ) {
			return new WP_Error( 'memberglut_plan_sold_out', __( 'This plan is sold out.', 'memberglut' ) );
		}
		if ( 'new' === $plan['who_can_buy'] && $user_id && memberglut_repo( 'subscriptions' )->count( array( 'where' => array( 'user_id' => $user_id ) ) ) ) {
			return new WP_Error( 'memberglut_plan_new_only', __( 'This plan is only for new members.', 'memberglut' ) );
		}
		if ( 'members' === $plan['who_can_buy'] ) {
			$ok = false;
			if ( $user_id && class_exists( 'MemberGlut_Subscription_Service' ) ) {
				$ok = (bool) array_intersect( $plan['buy_plans'], MemberGlut_Subscription_Service::active_plan_ids( $user_id ) );
			}
			if ( ! $ok ) {
				return new WP_Error( 'memberglut_plan_members_only', __( 'This plan is only for members of certain plans.', 'memberglut' ) );
			}
		}
		if ( 'paid' === $plan['type'] && ! self::available_gateways( $plan ) ) {
			return new WP_Error( 'memberglut_plan_no_gateway', __( 'No payment method is available for this plan yet.', 'memberglut' ) );
		}
		return apply_filters( 'memberglut_can_join_plan', true, $plan, $user_id );
	}

	/**
	 * Price label, e.g. “$9.00 / month”, “Free”, “$299.00 once”.
	 *
	 * @param array $plan Plan.
	 * @return string
	 */
	public static function price_label( $plan ) {
		if ( 'free' === $plan['type'] || $plan['price'] <= 0 ) {
			return __( 'Free', 'memberglut' );
		}
		if ( 'recurring' === $plan['billing'] ) {
			/* translators: 1: price, 2: period such as "month" or "3 months" */
			return sprintf( __( '%1$s / %2$s', 'memberglut' ), memberglut_format_price( $plan['price'] ), self::period_label( $plan['duration'] ) );
		}
		/* translators: %s: price */
		return sprintf( __( '%s once', 'memberglut' ), memberglut_format_price( $plan['price'] ) );
	}

	/**
	 * “month”, “3 months”.
	 *
	 * @param array $duration [ length, unit ].
	 * @return string
	 */
	public static function period_label( $duration ) {
		$n = max( 1, (int) $duration['length'] );
		if ( 1 === $n ) {
			$single = array( 'day' => __( 'day', 'memberglut' ), 'week' => __( 'week', 'memberglut' ), 'month' => __( 'month', 'memberglut' ), 'year' => __( 'year', 'memberglut' ) );
			return isset( $single[ $duration['unit'] ] ) ? $single[ $duration['unit'] ] : $duration['unit'];
		}
		switch ( $duration['unit'] ) {
			case 'day':
				/* translators: %d: number of days */
				return sprintf( _n( '%d day', '%d days', $n, 'memberglut' ), $n );
			case 'week':
				/* translators: %d: number of weeks */
				return sprintf( _n( '%d week', '%d weeks', $n, 'memberglut' ), $n );
			case 'month':
				/* translators: %d: number of months */
				return sprintf( _n( '%d month', '%d months', $n, 'memberglut' ), $n );
			case 'year':
				/* translators: %d: number of years */
				return sprintf( _n( '%d year', '%d years', $n, 'memberglut' ), $n );
		}
		return $n . ' ' . $duration['unit'];
	}

	/**
	 * Access length label for non-recurring plans.
	 *
	 * @param array $plan Plan.
	 * @return string
	 */
	public static function access_label( $plan ) {
		if ( 'paid' === $plan['type'] && 'recurring' === $plan['billing'] ) {
			return __( 'Until canceled', 'memberglut' );
		}
		switch ( $plan['duration_type'] ) {
			case 'fixed':
				return self::period_label( $plan['duration'] );
			case 'date':
				/* translators: %s: date */
				return sprintf( __( 'Until %s', 'memberglut' ), wp_date( get_option( 'date_format' ), strtotime( $plan['end_date'] ) ) );
			case 'calendar':
				return __( 'Calendar year', 'memberglut' );
		}
		return __( 'Lifetime', 'memberglut' );
	}
}
