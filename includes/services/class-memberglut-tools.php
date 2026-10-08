<?php
/**
 * Data & Logs: setup export / import (with plan ID remapping), turning users into members, system status and
 * maintenance tasks.
 *
 * Setup file: { plugin, type: "setup", version, site, exported_at, sections: { settings, forms, plans, rules, roles,
 * emails, coupons } }. Secrets and site-specific page IDs are never exported. On import plans are matched by slug,
 * rules by title, coupons by code and roles by slug; rules and coupons get the new IDs of the plans they reference.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Tools class.
 */
class MemberGlut_Tools {

	const SECTIONS = array( 'settings', 'plans', 'rules', 'roles', 'emails', 'coupons' );

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'memberglut_convert_batch', array( __CLASS__, 'convert_batch' ) );
	}

	/* ---------------------------------------------------------------------
	 * Setup export / import
	 * ------------------------------------------------------------------ */

	/**
	 * Settings values without secrets and page IDs.
	 *
	 * @param array $values Values.
	 * @param array $schema Schema.
	 * @return array
	 */
	private static function portable( $values, $schema ) {
		$out = array();
		foreach ( $schema as $key => $def ) {
			if ( in_array( $def['type'], array( 'secret', 'page' ), true ) || ! array_key_exists( $key, $values ) ) {
				continue;
			}
			$out[ $key ] = $values[ $key ];
		}
		return $out;
	}

	/**
	 * Build the setup file.
	 *
	 * @param string[] $sections Sections.
	 * @return array
	 */
	public static function export_setup( $sections = array() ) {
		$sections = $sections ? array_intersect( $sections, self::SECTIONS ) : self::SECTIONS;
		$data     = array();
		if ( in_array( 'settings', $sections, true ) ) {
			$data['settings'] = self::portable( MemberGlut_Settings::all(), MemberGlut_Settings::schema() );
			$data['forms']    = self::portable( MemberGlut_Settings::forms(), MemberGlut_Settings::forms_schema() );
		}
		if ( in_array( 'plans', $sections, true ) ) {
			$data['plans'] = array_map(
				static function ( $p ) {
					unset( $p['members'], $p['revenue'], $p['created_at'], $p['updated_at'], $p['signup_url'] );
					$p['buy_plans'] = array_values( array_filter( array_map( array( __CLASS__, 'plan_slug' ), (array) $p['buy_plans'] ) ) );
					$p['redirect_page'] = 0;
					return $p;
				},
				array_values( MemberGlut_Plans::all() )
			);
		}
		if ( in_array( 'rules', $sections, true ) ) {
			$data['rules'] = array_map(
				static function ( $r ) {
					$r            = MemberGlut_Rules::normalize( $r );
					$r['plans']   = array_values( array_filter( array_map( array( __CLASS__, 'plan_slug' ), $r['plans'] ) ) );
					$r['user_ids'] = array();
					$r['redirect'] = 0;
					unset( $r['updated'] );
					return $r;
				},
				memberglut_repo( 'rules' )->query( array( 'orderby' => 'priority DESC, id ASC' ) )
			);
		}
		if ( in_array( 'roles', $sections, true ) ) {
			$roles         = MemberGlut_Roles_Service::export();
			$data['roles'] = isset( $roles['roles'] ) ? $roles['roles'] : array();
		}
		if ( in_array( 'emails', $sections, true ) ) {
			$overrides      = get_option( MemberGlut_Mailer::OPTION, array() );
			$data['emails'] = is_array( $overrides ) ? $overrides : array();
		}
		if ( in_array( 'coupons', $sections, true ) ) {
			$data['coupons'] = array_map(
				static function ( $c ) {
					$c['plans'] = array_values( array_filter( array_map( array( __CLASS__, 'plan_slug' ), $c['plans'] ) ) );
					unset( $c['uses'], $c['status'], $c['created_at'] );
					return $c;
				},
				MemberGlut_Coupons::all()
			);
		}
		return array(
			'plugin'      => 'memberglut',
			'type'        => 'setup',
			'version'     => MEMBERGLUT_VERSION,
			'site'        => home_url( '/' ),
			'exported_at' => gmdate( 'c' ),
			'sections'    => $data,
		);
	}

	/**
	 * Plan slug of an ID.
	 *
	 * @param int $id ID.
	 * @return string
	 */
	public static function plan_slug( $id ) {
		$p = MemberGlut_Plans::get( (int) $id );
		return $p ? $p['slug'] : '';
	}

	/**
	 * Validate an uploaded setup file.
	 *
	 * @param mixed $data Decoded JSON.
	 * @return array|WP_Error Sections.
	 */
	private static function sections_of( $data ) {
		if ( ! is_array( $data ) || ( isset( $data['plugin'] ) && 'memberglut' !== $data['plugin'] ) || empty( $data['sections'] ) || ! is_array( $data['sections'] ) ) {
			return new WP_Error( 'memberglut_bad_file', __( 'This is not a MemberGlut setup file.', 'memberglut' ), array( 'status' => 400 ) );
		}
		return $data['sections'];
	}

	/**
	 * What an import would change.
	 *
	 * @param mixed $data Decoded JSON.
	 * @return array|WP_Error section => { new: [], changed: [], unchanged: [] } (names)
	 */
	public static function import_preview( $data ) {
		$s = self::sections_of( $data );
		if ( is_wp_error( $s ) ) {
			return $s;
		}
		$out = array();
		$add = static function ( &$bucket, $state, $name ) {
			$bucket[ $state ][] = $name;
		};
		if ( isset( $s['settings'] ) || isset( $s['forms'] ) ) {
			$b       = array( 'new' => array(), 'changed' => array(), 'unchanged' => array() );
			$current = array_merge( MemberGlut_Settings::all(), MemberGlut_Settings::forms() );
			foreach ( array_merge( (array) ( isset( $s['settings'] ) ? $s['settings'] : array() ), (array) ( isset( $s['forms'] ) ? $s['forms'] : array() ) ) as $k => $v ) {
				if ( ! array_key_exists( $k, $current ) ) {
					continue;
				}
				$add( $b, wp_json_encode( $current[ $k ] ) === wp_json_encode( $v ) ? 'unchanged' : 'changed', $k );
			}
			$out['settings'] = $b;
		}
		foreach ( array( 'plans' => 'slug', 'rules' => 'title', 'coupons' => 'code', 'roles' => 'slug' ) as $section => $key ) {
			if ( ! isset( $s[ $section ] ) || ! is_array( $s[ $section ] ) ) {
				continue;
			}
			$b = array( 'new' => array(), 'changed' => array(), 'unchanged' => array() );
			foreach ( $s[ $section ] as $item ) {
				if ( ! is_array( $item ) || empty( $item[ $key ] ) ) {
					continue;
				}
				$existing = self::find_existing( $section, $item[ $key ] );
				$name     = isset( $item['name'] ) ? $item['name'] : $item[ $key ];
				if ( ! $existing ) {
					$add( $b, 'new', $name );
				} elseif ( 'roles' === $section && 'administrator' === $item['slug'] ) {
					$add( $b, 'unchanged', $name ); // Never touched.
				} else {
					$add( $b, self::same( $section, $existing, $item ) ? 'unchanged' : 'changed', $name );
				}
			}
			$out[ $section ] = $b;
		}
		if ( isset( $s['emails'] ) && is_array( $s['emails'] ) ) {
			$cur = get_option( MemberGlut_Mailer::OPTION, array() );
			$b   = array( 'new' => array(), 'changed' => array(), 'unchanged' => array() );
			foreach ( $s['emails'] as $k => $e ) {
				if ( MemberGlut_Mailer::get( $k ) ) {
					$add( $b, isset( $cur[ $k ] ) && wp_json_encode( $cur[ $k ] ) === wp_json_encode( $e ) ? 'unchanged' : 'changed', $k );
				}
			}
			$out['emails'] = $b;
		}
		return $out;
	}

	/**
	 * Existing item matching an imported one.
	 *
	 * @param string $section Section.
	 * @param string $key     Match value.
	 * @return array|null
	 */
	private static function find_existing( $section, $key ) {
		switch ( $section ) {
			case 'plans':
				return MemberGlut_Plans::get( sanitize_title( $key ) );
			case 'rules':
				$r = memberglut_repo( 'rules' )->find_by( array( 'title' => sanitize_text_field( $key ) ) );
				return $r ? MemberGlut_Rules::normalize( $r ) : null;
			case 'coupons':
				$c = MemberGlut_Coupons::find_by_code( $key );
				return $c ? MemberGlut_Coupons::to_client( $c ) : null;
			case 'roles':
				$role = get_role( sanitize_key( $key ) );
				return $role ? array( 'slug' => $role->name, 'caps' => $role->capabilities ) : null;
		}
		return null;
	}

	/**
	 * Whether an imported item equals the existing one (ignoring IDs and plan references by ID).
	 *
	 * @param string $section  Section.
	 * @param array  $existing Existing.
	 * @param array  $item     Imported.
	 * @return bool
	 */
	private static function same( $section, $existing, $item ) {
		if ( 'roles' === $section ) {
			$a = array_filter( (array) $existing['caps'] );
			$b = array_filter( (array) ( isset( $item['caps'] ) ? $item['caps'] : array() ) );
			ksort( $a );
			ksort( $b );
			return $a == $b; // phpcs:ignore Universal.Operators.StrictComparisonOperators -- Order-insensitive compare.
		}
		foreach ( $item as $k => $v ) {
			if ( in_array( $k, array( 'id', 'plans', 'buy_plans', 'redirect_page', 'redirect', 'user_ids' ), true ) ) {
				continue;
			}
			if ( array_key_exists( $k, $existing ) && wp_json_encode( $existing[ $k ] ) !== wp_json_encode( $v ) ) {
				return false;
			}
		}
		return true;
	}

	/**
	 * Apply an import.
	 *
	 * @param mixed    $data     Decoded JSON.
	 * @param string[] $sections Sections to apply (empty = all in the file).
	 * @return array|WP_Error Summary: section => [ created, updated, skipped, errors ].
	 */
	public static function import( $data, $sections = array() ) {
		$s = self::sections_of( $data );
		if ( is_wp_error( $s ) ) {
			return $s;
		}
		$want    = static function ( $name ) use ( $sections ) {
			return ! $sections || in_array( $name, $sections, true );
		};
		$summary = array();
		$blank   = array( 'created' => 0, 'updated' => 0, 'skipped' => 0, 'errors' => array() );

		if ( $want( 'settings' ) && ( isset( $s['settings'] ) || isset( $s['forms'] ) ) ) {
			$sum = $blank;
			if ( ! empty( $s['settings'] ) && is_array( $s['settings'] ) ) {
				MemberGlut_Settings::update( self::portable( $s['settings'], MemberGlut_Settings::schema() ) );
				++$sum['updated'];
			}
			if ( ! empty( $s['forms'] ) && is_array( $s['forms'] ) ) {
				MemberGlut_Settings::update_forms( self::portable( $s['forms'], MemberGlut_Settings::forms_schema() ) );
				++$sum['updated'];
			}
			$summary['settings'] = $sum;
		}

		// Roles before plans (plans give roles).
		if ( $want( 'roles' ) && ! empty( $s['roles'] ) && is_array( $s['roles'] ) ) {
			$choices = array();
			foreach ( $s['roles'] as $r ) {
				if ( empty( $r['slug'] ) || 'administrator' === $r['slug'] ) {
					continue;
				}
				$existing = self::find_existing( 'roles', $r['slug'] );
				if ( $existing && self::same( 'roles', $existing, $r ) ) {
					continue;
				}
				$choices[ $r['slug'] ] = $existing ? 'overwrite' : 'import';
			}
			$res              = MemberGlut_Roles_Service::import( array( 'plugin' => 'memberglut', 'type' => 'roles', 'roles' => $s['roles'] ), $choices );
			$summary['roles'] = is_wp_error( $res ) ? array_merge( $blank, array( 'errors' => array( $res->get_error_message() ) ) ) : array_merge( $blank, (array) $res );
		}

		// Plans: slug → new ID map.
		$map = array();
		foreach ( MemberGlut_Plans::all() as $p ) {
			$map[ $p['slug'] ] = (int) $p['id'];
		}
		if ( $want( 'plans' ) && ! empty( $s['plans'] ) && is_array( $s['plans'] ) ) {
			$sum      = $blank;
			$deferred = array();
			foreach ( $s['plans'] as $p ) {
				if ( empty( $p['slug'] ) ) {
					continue;
				}
				$existing        = MemberGlut_Plans::get( sanitize_title( $p['slug'] ) );
				$buy             = isset( $p['buy_plans'] ) ? (array) $p['buy_plans'] : array();
				$p['id']         = $existing ? (int) $existing['id'] : 0;
				$p['buy_plans']  = array();
				$p['redirect_page'] = $existing ? $existing['redirect_page'] : 0;
				if ( 'members' === ( isset( $p['who_can_buy'] ) ? $p['who_can_buy'] : '' ) ) {
					$p['who_can_buy'] = 'anyone'; // Set again once every plan exists.
					$deferred[ $p['slug'] ] = $buy;
				}
				$saved = MemberGlut_Plans::save( $p );
				if ( is_wp_error( $saved ) ) {
					/* translators: 1: plan, 2: error */
					$sum['errors'][] = sprintf( __( 'Plan %1$s: %2$s', 'memberglut' ), $p['name'], self::error_text( $saved ) );
					continue;
				}
				$map[ $saved['slug'] ] = (int) $saved['id'];
				++$sum[ $existing ? 'updated' : 'created' ];
			}
			foreach ( $deferred as $slug => $buy ) {
				$ids = array_values( array_filter( array_map( static function ( $s ) use ( $map ) { return isset( $map[ $s ] ) ? $map[ $s ] : 0; }, $buy ) ) );
				if ( $ids && isset( $map[ $slug ] ) ) {
					$plan = MemberGlut_Plans::get( $map[ $slug ] );
					MemberGlut_Plans::save( array_merge( $plan, array( 'who_can_buy' => 'members', 'buy_plans' => $ids ) ) );
				}
			}
			$summary['plans'] = $sum;
		}
		$remap = static function ( $slugs ) use ( $map ) {
			return array_values( array_filter( array_map( static function ( $s ) use ( $map ) { return is_numeric( $s ) ? 0 : ( isset( $map[ $s ] ) ? $map[ $s ] : 0 ); }, (array) $slugs ) ) );
		};

		if ( $want( 'rules' ) && ! empty( $s['rules'] ) && is_array( $s['rules'] ) ) {
			$sum = $blank;
			foreach ( $s['rules'] as $r ) {
				if ( empty( $r['title'] ) ) {
					continue;
				}
				$existing   = memberglut_repo( 'rules' )->find_by( array( 'title' => sanitize_text_field( $r['title'] ) ) );
				$r['id']    = $existing ? (int) $existing['id'] : 0;
				$r['plans'] = $remap( isset( $r['plans'] ) ? $r['plans'] : array() );
				$saved      = MemberGlut_Rules::save( $r );
				if ( is_wp_error( $saved ) ) {
					/* translators: 1: rule, 2: error */
					$sum['errors'][] = sprintf( __( 'Rule %1$s: %2$s', 'memberglut' ), $r['title'], self::error_text( $saved ) );
					continue;
				}
				++$sum[ $existing ? 'updated' : 'created' ];
			}
			$summary['rules'] = $sum;
		}

		if ( $want( 'coupons' ) && ! empty( $s['coupons'] ) && is_array( $s['coupons'] ) ) {
			$sum = $blank;
			foreach ( $s['coupons'] as $c ) {
				if ( empty( $c['code'] ) ) {
					continue;
				}
				$existing   = MemberGlut_Coupons::find_by_code( $c['code'] );
				$c['id']    = $existing ? (int) $existing['id'] : 0;
				$c['plans'] = $remap( isset( $c['plans'] ) ? $c['plans'] : array() );
				$saved      = MemberGlut_Coupons::save( $c );
				if ( is_wp_error( $saved ) ) {
					/* translators: 1: code, 2: error */
					$sum['errors'][] = sprintf( __( 'Coupon %1$s: %2$s', 'memberglut' ), $c['code'], self::error_text( $saved ) );
					continue;
				}
				++$sum[ $existing ? 'updated' : 'created' ];
			}
			$summary['coupons'] = $sum;
		}

		if ( $want( 'emails' ) && ! empty( $s['emails'] ) && is_array( $s['emails'] ) ) {
			$list = array();
			foreach ( $s['emails'] as $key => $e ) {
				if ( is_array( $e ) && MemberGlut_Mailer::get( $key ) ) {
					$list[] = array_merge( $e, array( 'key' => $key ) );
				}
			}
			MemberGlut_Mailer::save( $list );
			$summary['emails'] = array_merge( $blank, array( 'updated' => count( $list ) ) );
		}

		memberglut_clear_cache();
		memberglut_log( 'info', 'tools', 'Setup imported: ' . wp_json_encode( array_map( static function ( $x ) { return array( $x['created'], $x['updated'] ); }, $summary ) ) );
		return $summary;
	}

	/**
	 * First field error or the message.
	 *
	 * @param WP_Error $e Error.
	 * @return string
	 */
	private static function error_text( $e ) {
		$d = $e->get_error_data();
		return is_array( $d ) && ! empty( $d['fields'] ) ? (string) reset( $d['fields'] ) : $e->get_error_message();
	}

	/* ---------------------------------------------------------------------
	 * Convert users
	 * ------------------------------------------------------------------ */

	/**
	 * Start giving a plan to every user with a role (batched in the background).
	 *
	 * @param string $role       Role.
	 * @param int    $plan_id    Plan.
	 * @param bool   $send_email Send the activation email.
	 * @return array|WP_Error { queued, total }
	 */
	public static function convert( $role, $plan_id, $send_email = false ) {
		$role = sanitize_key( $role );
		$plan = MemberGlut_Plans::get( (int) $plan_id );
		if ( ! get_role( $role ) ) {
			return new WP_Error( 'memberglut_role', __( 'Choose a role.', 'memberglut' ), array( 'status' => 400, 'fields' => array( 'role' => __( 'Choose a role.', 'memberglut' ) ) ) );
		}
		if ( ! $plan ) {
			return new WP_Error( 'memberglut_plan', __( 'Choose a plan.', 'memberglut' ), array( 'status' => 400, 'fields' => array( 'plan' => __( 'Choose a plan.', 'memberglut' ) ) ) );
		}
		$total = count( get_users( array( 'role' => $role, 'fields' => 'ID' ) ) );
		$args  = array( 'role' => $role, 'plan_id' => (int) $plan['id'], 'send_email' => (bool) $send_email, 'offset' => 0, 'done' => 0 );
		if ( $total <= 200 ) {
			$done = self::convert_batch( $args, true );
			return array( 'queued' => false, 'total' => $total, 'converted' => $done );
		}
		MemberGlut_Scheduler::enqueue( 'memberglut_convert_batch', array( $args ) );
		return array( 'queued' => true, 'total' => $total, 'converted' => 0 );
	}

	/**
	 * One batch of 200 users.
	 *
	 * @param array $args   role, plan_id, send_email, offset, done.
	 * @param bool  $inline Run everything now (small sites).
	 * @return int Converted in this call.
	 */
	public static function convert_batch( $args, $inline = false ) {
		$converted = 0;
		do {
			$ids = get_users( array( 'role' => $args['role'], 'fields' => 'ID', 'number' => 200, 'offset' => (int) $args['offset'], 'orderby' => 'ID' ) );
			foreach ( $ids as $uid ) {
				if ( MemberGlut_Subscription_Service::user_has_plan( (int) $uid, (int) $args['plan_id'] ) ) {
					continue;
				}
				$r = MemberGlut_Subscription_Service::create( (int) $uid, (int) $args['plan_id'], array( 'status' => 'active', 'source' => 'convert', 'send_email' => ! empty( $args['send_email'] ) ) );
				if ( ! is_wp_error( $r ) ) {
					++$converted;
				}
			}
			$args['offset'] += 200;
		} while ( $inline && count( $ids ) === 200 );
		$args['done'] = (int) $args['done'] + $converted;
		if ( ! $inline && 200 === count( $ids ) ) {
			MemberGlut_Scheduler::enqueue( 'memberglut_convert_batch', array( $args ) );
		} elseif ( ! $inline ) {
			memberglut_log( 'info', 'tools', sprintf( 'Converted %d users with role %s', $args['done'], $args['role'] ) );
		}
		memberglut_clear_cache();
		return $converted;
	}

	/* ---------------------------------------------------------------------
	 * System status
	 * ------------------------------------------------------------------ */

	/**
	 * Active caching plugins.
	 *
	 * @return string[]
	 */
	public static function caching_plugins() {
		$known = array(
			'WP_ROCKET_VERSION'      => 'WP Rocket',
			'LSCWP_V'                => 'LiteSpeed Cache',
			'W3TC'                   => 'W3 Total Cache',
			'WPCACHEHOME'            => 'WP Super Cache',
			'WPFC_WP_PLUGIN_DIR'     => 'WP Fastest Cache',
			'SiteGround_Optimizer\\VERSION' => 'SiteGround Optimizer',
			'BREEZE_VERSION'         => 'Breeze',
			'CE_VERSION'             => 'Cache Enabler',
		);
		$out = array();
		foreach ( $known as $const => $name ) {
			if ( defined( $const ) ) {
				$out[] = $name;
			}
		}
		return $out;
	}

	/**
	 * Health checks: [ key, ok, label, note ].
	 *
	 * @return array[]
	 */
	public static function checks() {
		$checks = array();
		$pages  = true;
		foreach ( array( 'register', 'login', 'account', 'lost' ) as $slot ) {
			$pages = $pages && (bool) memberglut_page_url( $slot );
		}
		$checks[] = array( 'key' => 'pages', 'ok' => $pages, 'label' => __( 'Membership pages are set', 'memberglut' ), 'note' => $pages ? '' : __( 'Create them in Forms & Pages.', 'memberglut' ) );

		$next     = MemberGlut_Scheduler::next_run( 'memberglut_hourly' );
		$late     = $next && $next < time() - HOUR_IN_SECONDS;
		$engine   = MemberGlut_Scheduler::uses_action_scheduler() ? 'Action Scheduler' : 'WP-Cron';
		$checks[] = array(
			'key'   => 'scheduler',
			'ok'    => $next && ! $late,
			/* translators: %s: Action Scheduler or WP-Cron */
			'label' => sprintf( __( 'Renewals and expirations are scheduled (%s)', 'memberglut' ), $engine ),
			'note'  => ! $next ? __( 'Nothing is scheduled. Deactivate and activate the plugin to fix it.', 'memberglut' )
				: ( $late ? __( 'The scheduled task is late — WP-Cron may not be running.', 'memberglut' )
				/* translators: %s: time */
				: sprintf( __( 'Next run %s', 'memberglut' ), human_time_diff( time(), $next ) === human_time_diff( time(), time() ) ? __( 'now', 'memberglut' ) : sprintf( __( 'in %s', 'memberglut' ), human_time_diff( time(), $next ) ) ) ),
		);

		foreach ( array( 'stripe' => 'Stripe', 'paypal' => 'PayPal' ) as $id => $name ) {
			$g = MemberGlut_Gateways::get( $id );
			if ( ! $g || ! $g->is_enabled() ) {
				continue;
			}
			$last     = (int) get_option( 'memberglut_last_webhook_' . $id, 0 );
			$recent   = $last > time() - 7 * DAY_IN_SECONDS;
			$checks[] = array(
				'key'   => 'webhook_' . $id,
				'ok'    => $recent,
				/* translators: %s: gateway */
				'label' => sprintf( __( '%s webhook received recently', 'memberglut' ), $name ),
				'note'  => $recent
					/* translators: %s: time ago */
					? sprintf( __( 'Last one %s ago', 'memberglut' ), human_time_diff( $last ) )
					: __( 'No webhook in 7 days — check the webhook URL in the payment provider.', 'memberglut' ),
			);
		}

		$https    = is_ssl() || 0 === strpos( home_url(), 'https://' );
		$checks[] = array( 'key' => 'https', 'ok' => $https, 'label' => __( 'Site uses HTTPS', 'memberglut' ), 'note' => $https ? '' : __( 'Card payments need HTTPS on a live site.', 'memberglut' ) );

		$caches   = self::caching_plugins();
		$checks[] = array(
			'key'   => 'cache',
			'ok'    => ! $caches || memberglut_setting( 'exclude_cache', true ),
			'label' => $caches ? __( 'A caching plugin is active', 'memberglut' ) : __( 'No page caching plugin detected', 'memberglut' ),
			/* translators: %s: plugin names */
			'note'  => $caches ? sprintf( __( '%s — make sure member pages are not cached (Advanced › Exclude member pages from cache).', 'memberglut' ), implode( ', ', $caches ) ) : '',
		);

		$mail     = get_option( 'memberglut_last_mail_error' );
		$mail_bad = is_array( $mail ) && ! empty( $mail['time'] ) && $mail['time'] > time() - DAY_IN_SECONDS;
		$checks[] = array(
			'key'   => 'mail',
			'ok'    => ! $mail_bad,
			'label' => __( 'Emails can be sent', 'memberglut' ),
			/* translators: %s: error */
			'note'  => $mail_bad ? sprintf( __( 'An email failed in the last 24 hours: %s', 'memberglut' ), isset( $mail['error'] ) ? $mail['error'] : '' ) : '',
		);
		return apply_filters( 'memberglut_status_checks', $checks );
	}

	/**
	 * Environment rows.
	 *
	 * @return array label => value
	 */
	public static function environment() {
		global $wpdb;
		$theme = wp_get_theme();
		return array(
			'MemberGlut'     => MEMBERGLUT_VERSION,
			'WordPress'      => get_bloginfo( 'version' ),
			'PHP'            => PHP_VERSION,
			'MySQL'          => $wpdb->db_version(),
			'Memory limit'   => WP_MEMORY_LIMIT,
			'Max upload'     => size_format( wp_max_upload_size() ),
			'WP-Cron'        => defined( 'DISABLE_WP_CRON' ) && DISABLE_WP_CRON ? __( 'Disabled', 'memberglut' ) : __( 'Enabled', 'memberglut' ),
			'Scheduler'      => MemberGlut_Scheduler::uses_action_scheduler() ? 'Action Scheduler' : 'WP-Cron',
			'Active plugins' => (string) count( (array) get_option( 'active_plugins', array() ) ),
			'Theme'          => $theme->get( 'Name' ) . ' ' . $theme->get( 'Version' ),
			'Multisite'      => is_multisite() ? __( 'Yes', 'memberglut' ) : __( 'No', 'memberglut' ),
			'Test mode'      => memberglut_setting( 'test_mode', true ) ? __( 'On', 'memberglut' ) : __( 'Off', 'memberglut' ),
			'Schema version' => (string) get_option( MemberGlut_Install::VERSION_OPTION, 0 ),
		);
	}

	/**
	 * Full status.
	 *
	 * @return array
	 */
	public static function status() {
		return array(
			'counts'      => array(
				'members'  => MemberGlut_Dashboard::active_now(),
				'plans'    => memberglut_repo( 'plans' )->count( array() ),
				'rules'    => memberglut_repo( 'rules' )->count( array() ),
				'payments' => memberglut_repo( 'payments' )->count( array() ),
				'roles'    => count( wp_roles()->roles ),
			),
			'checks'      => self::checks(),
			'environment' => self::environment(),
		);
	}

	/* ---------------------------------------------------------------------
	 * Maintenance
	 * ------------------------------------------------------------------ */

	/**
	 * Run a maintenance task.
	 *
	 * @param string $task Task.
	 * @param array  $data confirm (typed word for danger tasks), include (reset: forms, emails).
	 * @return array|WP_Error { message }
	 */
	public static function maintenance( $task, $data = array() ) {
		$danger = array( 'reset-settings', 'delete-all' );
		if ( in_array( $task, $danger, true ) ) {
			if ( ! current_user_can( 'manage_options' ) ) {
				return new WP_Error( 'memberglut_forbidden', __( 'Only administrators can do this.', 'memberglut' ), array( 'status' => 403 ) );
			}
			$word = 'delete-all' === $task ? 'DELETE' : 'RESET';
			if ( ! isset( $data['confirm'] ) || $word !== $data['confirm'] ) {
				/* translators: %s: word to type */
				return new WP_Error( 'memberglut_confirm', sprintf( __( 'Type %s to confirm.', 'memberglut' ), $word ), array( 'status' => 400, 'fields' => array( 'confirm' => sprintf( __( 'Type %s to confirm.', 'memberglut' ), $word ) ) ) );
			}
		}
		switch ( $task ) {
			case 'expirations':
				$counts = (array) MemberGlut_Subscription_Service::expiration_sweep();
				return array(
					/* translators: %s: summary */
					'message' => sprintf( __( 'Done: %s.', 'memberglut' ), $counts ? implode( ', ', array_map( static function ( $k, $v ) { return $k . ' ' . (int) $v; }, array_keys( $counts ), $counts ) ) : __( 'nothing was due', 'memberglut' ) ),
					'counts'  => $counts,
				);
			case 'recount':
				memberglut_clear_cache();
				MemberGlut_Plans::flush();
				MemberGlut_Dashboard::snapshot();
				MemberGlut_Dashboard::stats( true );
				return array( 'message' => __( 'Member counts and totals were rebuilt.', 'memberglut' ) );
			case 'sync-roles':
				MemberGlut_Scheduler::enqueue( 'memberglut_sync_roles_batch', array( array( 'offset' => 0 ) ) );
				return array( 'message' => __( 'Roles are being synced in the background.', 'memberglut' ) );
			case 'clear-cache':
				memberglut_clear_cache();
				return array( 'message' => __( 'Cached data was cleared.', 'memberglut' ) );
			case 'reset-settings':
				MemberGlut_Settings::reset();
				$include = isset( $data['include'] ) ? (array) $data['include'] : array();
				if ( in_array( 'forms', $include, true ) ) {
					delete_option( MemberGlut_Settings::FORMS_OPTION );
				}
				if ( in_array( 'emails', $include, true ) ) {
					delete_option( MemberGlut_Mailer::OPTION );
				}
				MemberGlut_Settings::flush();
				memberglut_log( 'warning', 'tools', 'Settings reset by user #' . get_current_user_id() );
				return array( 'message' => __( 'Settings were reset to their defaults.', 'memberglut' ) );
			case 'delete-all':
				self::delete_all_data();
				return array( 'message' => __( 'All MemberGlut data was deleted.', 'memberglut' ) );
		}
		return new WP_Error( 'memberglut_unknown', __( 'Unknown task.', 'memberglut' ), array( 'status' => 404 ) );
	}

	/**
	 * Remove every MemberGlut table, option, meta and transient; custom roles created by MemberGlut are removed
	 * and their users moved to the default role. WordPress users stay. Also used by uninstall.php.
	 *
	 * @return void
	 */
	public static function delete_all_data() {
		global $wpdb;
		if ( class_exists( 'MemberGlut_Scheduler' ) ) {
			MemberGlut_Scheduler::unschedule_all();
		}
		// Custom roles created with MemberGlut.
		$created = (array) get_option( 'memberglut_created_roles', array() );
		$default = get_option( 'default_role', 'subscriber' );
		foreach ( $created as $slug ) {
			if ( ! get_role( $slug ) || in_array( $slug, array( 'administrator', $default ), true ) ) {
				continue;
			}
			foreach ( get_users( array( 'role' => $slug, 'fields' => 'ID' ) ) as $uid ) {
				$u = new WP_User( $uid );
				$u->remove_role( $slug );
				if ( ! $u->roles ) {
					$u->add_role( $default );
				}
			}
			remove_role( $slug );
		}
		// MemberGlut capabilities on every role.
		foreach ( wp_roles()->role_objects as $role ) {
			foreach ( array_keys( (array) $role->capabilities ) as $cap ) {
				if ( 0 === strpos( $cap, 'memberglut_' ) ) {
					$role->remove_cap( $cap );
				}
			}
		}
		foreach ( array_merge( MemberGlut_Install::tables(), MemberGlut_Install::legacy_tables() ) as $t ) {
			$table = $wpdb->prefix . 'memberglut_' . $t;
			$wpdb->query( "DROP TABLE IF EXISTS `{$table}`" ); // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.DirectDatabaseQuery.SchemaChange,WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- Removing our own tables.
		}
		// phpcs:disable WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Removing our own data.
		$wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s OR option_name LIKE %s OR option_name LIKE %s", $wpdb->esc_like( 'memberglut_' ) . '%', $wpdb->esc_like( '_transient_memberglut_' ) . '%', $wpdb->esc_like( '_transient_timeout_memberglut_' ) . '%' ) );
		$wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->usermeta} WHERE meta_key LIKE %s", $wpdb->esc_like( 'memberglut_' ) . '%' ) );
		$wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->postmeta} WHERE meta_key LIKE %s", $wpdb->esc_like( '_memberglut_' ) . '%' ) );
		// phpcs:enable
		wp_cache_flush();
		do_action( 'memberglut_data_deleted' );
	}
}
