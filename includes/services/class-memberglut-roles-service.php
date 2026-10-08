<?php
/**
 * Roles & capabilities: the role editor backend, deny capabilities, multiple roles per user and the
 * administrator rescue link.
 *
 * A capability has three states per role: grant (true), deny (false) and not set (absent). Deny is stored in the
 * WordPress role as `false`, and enforced here so it wins over grants from the user's other roles.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Roles_Service class.
 */
class MemberGlut_Roles_Service {

	const OPTIONS          = 'memberglut_role_options';
	const REGISTRY         = 'memberglut_registered_capabilities';
	const ADMIN_IDS        = 'memberglut_admin_ids';
	const BUILTIN          = array( 'administrator', 'editor', 'author', 'contributor', 'subscriber' );
	const RESCUE_LIFETIME  = 900;

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_filter( 'user_has_cap', array( __CLASS__, 'enforce_denies' ), 999, 4 );
		add_action( 'set_user_role', array( __CLASS__, 'remember_admins' ), 10, 3 );
		add_action( 'add_user_role', array( __CLASS__, 'remember_admin_on_add' ), 10, 2 );
		add_action( 'login_form_memberglut_rescue', array( __CLASS__, 'rescue_screen' ) );

		if ( self::option( 'multi_roles' ) ) {
			add_action( 'show_user_profile', array( __CLASS__, 'render_role_checkboxes' ), 1 );
			add_action( 'edit_user_profile', array( __CLASS__, 'render_role_checkboxes' ), 1 );
			add_action( 'user_new_form', array( __CLASS__, 'render_role_checkboxes' ), 1 );
			add_action( 'profile_update', array( __CLASS__, 'save_role_checkboxes' ), 20 );
			add_action( 'user_register', array( __CLASS__, 'save_role_checkboxes' ), 20 );
			add_action( 'admin_head-user-edit.php', array( __CLASS__, 'hide_core_role_select' ) );
			add_action( 'admin_head-user-new.php', array( __CLASS__, 'hide_core_role_select' ) );
			add_action( 'admin_head-profile.php', array( __CLASS__, 'hide_core_role_select' ) );
		}
	}

	/* ---------------------------------------------------------------------
	 * Options
	 * ------------------------------------------------------------------ */

	/**
	 * Role screen options (multi_roles, rescue).
	 *
	 * @return array
	 */
	public static function options() {
		$stored = get_option( self::OPTIONS, array() );
		return array_merge( array( 'multi_roles' => true, 'rescue' => true ), is_array( $stored ) ? $stored : array() );
	}

	/**
	 * One option.
	 *
	 * @param string $key Key.
	 * @return bool
	 */
	public static function option( $key ) {
		$o = self::options();
		return ! empty( $o[ $key ] );
	}

	/**
	 * Save options.
	 *
	 * @param array $input Input.
	 * @return array
	 */
	public static function save_options( $input ) {
		$o = self::options();
		foreach ( array( 'multi_roles', 'rescue' ) as $k ) {
			if ( isset( $input[ $k ] ) ) {
				$o[ $k ] = (bool) rest_sanitize_boolean( $input[ $k ] );
			}
		}
		update_option( self::OPTIONS, $o );
		return $o;
	}

	/* ---------------------------------------------------------------------
	 * Reading
	 * ------------------------------------------------------------------ */

	/**
	 * Roles for the editor.
	 *
	 * @return array[]
	 */
	public static function roles() {
		$counts  = count_users();
		$default = get_option( 'default_role', 'subscriber' );
		$usage   = self::plan_usage();
		$out     = array();
		foreach ( wp_roles()->roles as $slug => $role ) {
			$caps    = (array) $role['capabilities'];
			$out[]   = array(
				'slug'          => $slug,
				'name'          => translate_user_role( $role['name'] ),
				'users'         => isset( $counts['avail_roles'][ $slug ] ) ? (int) $counts['avail_roles'][ $slug ] : 0,
				'builtin'       => in_array( $slug, self::BUILTIN, true ),
				'protected'     => 'administrator' === $slug,
				'isDefault'     => $slug === $default,
				'used_by_plans' => isset( $usage[ $slug ] ) ? $usage[ $slug ] : array(),
				'granted'       => count( array_filter( $caps ) ),
				'denied'        => count( $caps ) - count( array_filter( $caps ) ),
			);
		}
		return $out;
	}

	/**
	 * Plans using each role (as plan role or role after expiry).
	 *
	 * @return array role => [ { id, name } ]
	 */
	public static function plan_usage() {
		$out = array();
		foreach ( MemberGlut_Plans::all() as $plan ) {
			foreach ( array_unique( array_filter( array( $plan['role'], $plan['expire_role'] ) ) ) as $role ) {
				$out[ $role ][] = array( 'id' => $plan['id'], 'name' => $plan['name'] );
			}
		}
		return $out;
	}

	/**
	 * grant/deny map per role.
	 *
	 * @return array role => [ cap => grant|deny ]
	 */
	public static function role_caps() {
		$out = array();
		foreach ( wp_roles()->roles as $slug => $role ) {
			$out[ $slug ] = array();
			foreach ( (array) $role['capabilities'] as $cap => $grant ) {
				$out[ $slug ][ $cap ] = $grant ? 'grant' : 'deny';
			}
		}
		return $out;
	}

	/**
	 * Capability groups shown in the editor.
	 *
	 * @return array[] [ key, label, caps[] ]
	 */
	public static function capability_groups() {
		$groups = array(
			'general'    => array( __( 'General', 'memberglut' ), array( 'read', 'edit_dashboard', 'upload_files', 'unfiltered_html', 'unfiltered_upload', 'manage_options', 'moderate_comments', 'manage_links', 'export', 'import', 'update_core', 'edit_files' ) ),
			'posts'      => array( __( 'Posts', 'memberglut' ), array( 'edit_posts', 'edit_others_posts', 'edit_published_posts', 'edit_private_posts', 'publish_posts', 'delete_posts', 'delete_others_posts', 'delete_published_posts', 'delete_private_posts', 'read_private_posts', 'manage_categories' ) ),
			'pages'      => array( __( 'Pages', 'memberglut' ), array( 'edit_pages', 'edit_others_pages', 'edit_published_pages', 'edit_private_pages', 'publish_pages', 'delete_pages', 'delete_others_pages', 'delete_published_pages', 'delete_private_pages', 'read_private_pages' ) ),
			'users'      => array( __( 'Users', 'memberglut' ), array( 'list_users', 'create_users', 'edit_users', 'delete_users', 'promote_users', 'remove_users' ) ),
			'appearance' => array( __( 'Appearance', 'memberglut' ), array( 'switch_themes', 'edit_theme_options', 'edit_themes', 'install_themes', 'update_themes', 'delete_themes', 'customize' ) ),
			'plugins'    => array( __( 'Plugins', 'memberglut' ), array( 'activate_plugins', 'install_plugins', 'edit_plugins', 'update_plugins', 'delete_plugins' ) ),
			'memberglut' => array( 'MemberGlut', array_merge( array_keys( MemberGlut_Permissions::caps() ), MemberGlut_Permissions::access_caps() ) ),
		);

		// One group per post type with its own capabilities (WooCommerce products, courses…).
		foreach ( get_post_types( array( 'show_ui' => true ), 'objects' ) as $pt ) {
			if ( in_array( $pt->name, array( 'post', 'page', 'attachment', 'wp_block', 'wp_template', 'wp_template_part', 'wp_navigation', 'wp_font_family', 'wp_font_face', 'wp_global_styles' ), true ) ) {
				continue;
			}
			$meta = array( $pt->cap->edit_post, $pt->cap->read_post, $pt->cap->delete_post );
			$core = array( 'read', 'edit_posts', 'edit_others_posts', 'edit_private_posts', 'edit_published_posts', 'publish_posts', 'read_private_posts', 'delete_posts', 'delete_private_posts', 'delete_published_posts', 'delete_others_posts', 'create_posts', 'manage_options', 'edit_pages', 'edit_others_pages', 'edit_private_pages', 'edit_published_pages', 'publish_pages', 'read_private_pages', 'delete_pages', 'delete_private_pages', 'delete_published_pages', 'delete_others_pages' );
			$caps = array_values( array_unique( array_diff( array_values( (array) $pt->cap ), $meta, $core ) ) );
			if ( $caps ) {
				$groups[ 'pt_' . $pt->name ] = array( $pt->labels->name, $caps );
			}
		}
		$seen = array();
		foreach ( $groups as $g ) {
			$seen = array_merge( $seen, $g[1] );
		}
		foreach ( get_taxonomies( array( 'show_ui' => true ), 'objects' ) as $tax ) {
			$caps = array_values( array_unique( array_diff( array_values( (array) $tax->cap ), array( 'manage_categories', 'edit_posts', 'assign_terms' ), $seen ) ) );
			$seen = array_merge( $seen, $caps );
			if ( $caps ) {
				$groups[ 'tax_' . $tax->name ] = array( $tax->labels->name, $caps );
			}
		}

		$groups = apply_filters( 'memberglut_capability_groups', $groups );

		// Every capability that exists in a role but is not in a group yet → "Other".
		$known = array();
		foreach ( $groups as $g ) {
			$known = array_merge( $known, $g[1] );
		}
		$custom = array_keys( self::registry() );
		$other  = array();
		foreach ( wp_roles()->roles as $role ) {
			foreach ( array_keys( (array) $role['capabilities'] ) as $cap ) {
				if ( ! in_array( $cap, $known, true ) && ! in_array( $cap, $custom, true ) && ! preg_match( '/^level_\d+$/', $cap ) ) {
					$other[] = $cap;
				}
			}
		}
		$other = array_values( array_unique( $other ) );
		sort( $other );
		if ( $other ) {
			$groups['other'] = array( __( 'Other', 'memberglut' ), $other );
		}
		$groups['custom'] = array( __( 'Custom', 'memberglut' ), $custom );

		$out = array();
		foreach ( $groups as $key => $g ) {
			$out[] = array( 'key' => $key, 'label' => $g[0], 'caps' => array_values( array_unique( $g[1] ) ) );
		}
		return $out;
	}

	/**
	 * Custom capability registry: cap => label.
	 *
	 * @return array
	 */
	public static function registry() {
		$reg = get_option( self::REGISTRY, array() );
		if ( ! is_array( $reg ) ) {
			return array();
		}
		$out = array();
		foreach ( $reg as $key => $value ) {
			// 1.x stored [ cap => [ label, description, … ] ].
			$cap         = is_string( $key ) ? $key : ( is_string( $value ) ? $value : '' );
			$out[ $cap ] = is_array( $value ) && isset( $value['label'] ) ? $value['label'] : $cap;
		}
		unset( $out[''] );
		return $out;
	}

	/* ---------------------------------------------------------------------
	 * Writing
	 * ------------------------------------------------------------------ */

	/**
	 * Sanitize a capability or role key.
	 *
	 * @param string $key Key.
	 * @return string
	 */
	public static function clean_key( $key ) {
		return substr( preg_replace( '/[^a-z0-9_]/', '_', strtolower( trim( (string) $key ) ) ), 0, 100 );
	}

	/**
	 * Replace the capabilities of a role.
	 *
	 * @param string $slug Role.
	 * @param array  $caps cap => grant|deny (missing = not set).
	 * @return array|WP_Error Role caps map.
	 */
	public static function save_caps( $slug, array $caps ) {
		$role = get_role( $slug );
		if ( ! $role ) {
			return new WP_Error( 'memberglut_not_found', __( 'Role not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( 'administrator' === $slug ) {
			return new WP_Error( 'memberglut_protected', __( 'The Administrator role is protected and cannot be changed.', 'memberglut' ), array( 'status' => 403 ) );
		}
		$wanted = array();
		foreach ( $caps as $cap => $state ) {
			$cap = self::clean_key( $cap );
			if ( '' === $cap || preg_match( '/^level_\d+$/', $cap ) ) {
				continue;
			}
			if ( 'grant' === $state || true === $state ) {
				$wanted[ $cap ] = true;
			} elseif ( 'deny' === $state || false === $state ) {
				$wanted[ $cap ] = false;
			}
		}
		// Don't let someone take manage_options or MemberGlut role management away from their only role.
		$me = wp_get_current_user();
		if ( in_array( $slug, (array) $me->roles, true ) && ! is_super_admin() ) {
			foreach ( array( 'memberglut_manage_roles' ) as $keep ) {
				if ( $role->has_cap( $keep ) && empty( $wanted[ $keep ] ) && ! self::other_role_grants( $me, $slug, $keep ) ) {
					return new WP_Error( 'memberglut_lockout', __( 'This change would remove your own access to Roles & Capabilities. Give the capability to another of your roles first.', 'memberglut' ), array( 'status' => 409 ) );
				}
			}
		}
		$old     = (array) $role->capabilities;
		$changes = array();
		foreach ( $old as $cap => $grant ) {
			if ( preg_match( '/^level_\d+$/', $cap ) ) {
				continue;
			}
			if ( ! array_key_exists( $cap, $wanted ) ) {
				$role->remove_cap( $cap );
				$changes[] = sprintf( 'unset %s', $cap );
			}
		}
		foreach ( $wanted as $cap => $grant ) {
			if ( ! array_key_exists( $cap, $old ) || (bool) $old[ $cap ] !== $grant ) {
				$role->add_cap( $cap, $grant );
				$changes[] = sprintf( '%s %s', $grant ? 'grant' : 'deny', $cap );
			}
		}
		if ( $changes ) {
			memberglut_event(
				'cap_change',
				/* translators: 1: role, 2: list of changes */
				sprintf( __( 'Role %1$s: %2$s', 'memberglut' ), $slug, implode( ', ', array_slice( $changes, 0, 30 ) ) . ( count( $changes ) > 30 ? '…' : '' ) ),
				array( 'object_type' => 'role', 'data' => array( 'role' => $slug, 'changes' => $changes ) )
			);
			do_action( 'memberglut_role_saved', $slug, $wanted, $old );
		}
		$map = self::role_caps();
		return isset( $map[ $slug ] ) ? $map[ $slug ] : array();
	}

	/**
	 * Whether a role of the user other than $except grants a cap.
	 *
	 * @param WP_User $user   User.
	 * @param string  $except Role to ignore.
	 * @param string  $cap    Capability.
	 * @return bool
	 */
	private static function other_role_grants( $user, $except, $cap ) {
		foreach ( (array) $user->roles as $r ) {
			if ( $r !== $except && get_role( $r ) && get_role( $r )->has_cap( $cap ) ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Create a role.
	 *
	 * @param string $name  Display name.
	 * @param string $slug  Key (empty = from the name).
	 * @param string $clone Role to copy capabilities from.
	 * @return array|WP_Error New role.
	 */
	public static function create( $name, $slug = '', $clone = '' ) {
		$name = sanitize_text_field( $name );
		if ( '' === $name ) {
			return new WP_Error( 'memberglut_invalid_role', __( 'Enter a role name.', 'memberglut' ), array( 'status' => 400, 'fields' => array( 'name' => __( 'Enter a role name.', 'memberglut' ) ) ) );
		}
		$slug = self::clean_key( $slug ? $slug : $name );
		$slug = trim( $slug, '_' );
		if ( '' === $slug ) {
			return new WP_Error( 'memberglut_invalid_role', __( 'Enter a role key.', 'memberglut' ), array( 'status' => 400, 'fields' => array( 'slug' => __( 'Use letters, numbers and underscores.', 'memberglut' ) ) ) );
		}
		if ( get_role( $slug ) ) {
			return new WP_Error( 'memberglut_role_exists', __( 'A role with this key already exists.', 'memberglut' ), array( 'status' => 409, 'fields' => array( 'slug' => __( 'A role with this key already exists.', 'memberglut' ) ) ) );
		}
		$caps = array();
		if ( $clone && get_role( $clone ) ) {
			$caps = (array) get_role( $clone )->capabilities;
			if ( 'administrator' === $clone ) {
				// A copy of the administrator never carries the plugin's role-management cap unless explicitly granted later.
				unset( $caps['memberglut_manage_roles'] );
			}
		}
		$role = add_role( $slug, $name, $caps );
		if ( ! $role ) {
			return new WP_Error( 'memberglut_role_error', __( 'The role could not be created.', 'memberglut' ), array( 'status' => 500 ) );
		}
		self::remember_created( $slug );
		/* translators: 1: role name, 2: source role */
		memberglut_event( 'role_created', $clone ? sprintf( __( 'Role %1$s created from %2$s', 'memberglut' ), $slug, $clone ) : sprintf( __( 'Role %s created', 'memberglut' ), $slug ), array( 'object_type' => 'role' ) );
		do_action( 'memberglut_role_created', $slug, $clone );
		foreach ( self::roles() as $r ) {
			if ( $r['slug'] === $slug ) {
				return $r;
			}
		}
		return array( 'slug' => $slug, 'name' => $name );
	}

	/**
	 * Make a role the default for new users (WordPress default_role, decision D3).
	 *
	 * @param string $slug Role.
	 * @return true|WP_Error
	 */
	public static function set_default( $slug ) {
		if ( ! get_role( $slug ) ) {
			return new WP_Error( 'memberglut_not_found', __( 'Role not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( 'administrator' === $slug ) {
			return new WP_Error( 'memberglut_protected', __( 'New users can never be administrators by default.', 'memberglut' ), array( 'status' => 400 ) );
		}
		update_option( 'default_role', $slug );
		/* translators: %s: role */
		memberglut_event( 'role_default', sprintf( __( 'Default role for new users set to %s', 'memberglut' ), $slug ), array( 'object_type' => 'role' ) );
		return true;
	}

	/**
	 * Delete a role. Built-in, default and plan roles need care.
	 *
	 * @param string $slug        Role.
	 * @param string $replacement Role that replaces it in plans (required when a plan uses it).
	 * @return true|WP_Error
	 */
	public static function delete( $slug, $replacement = '' ) {
		if ( ! get_role( $slug ) ) {
			return new WP_Error( 'memberglut_not_found', __( 'Role not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		if ( in_array( $slug, self::BUILTIN, true ) ) {
			return new WP_Error( 'memberglut_protected', __( 'WordPress roles cannot be deleted.', 'memberglut' ), array( 'status' => 403 ) );
		}
		$default = get_option( 'default_role', 'subscriber' );
		if ( $slug === $default ) {
			return new WP_Error( 'memberglut_protected', __( 'This is the default role for new users. Make another role the default first.', 'memberglut' ), array( 'status' => 409 ) );
		}
		$usage = self::plan_usage();
		if ( ! empty( $usage[ $slug ] ) ) {
			if ( ! $replacement || ! get_role( $replacement ) || $replacement === $slug || 'administrator' === $replacement ) {
				/* translators: %s: plan names */
				return new WP_Error( 'memberglut_role_in_use', sprintf( __( 'Used by the plans %s. Choose a role to use in those plans instead.', 'memberglut' ), implode( ', ', wp_list_pluck( $usage[ $slug ], 'name' ) ) ), array( 'status' => 409, 'plans' => $usage[ $slug ] ) );
			}
			foreach ( $usage[ $slug ] as $plan ) {
				$row = memberglut_repo( 'plans' )->find( $plan['id'] );
				$set = is_array( $row['settings'] ) ? $row['settings'] : array();
				$upd = array();
				if ( $row['role'] === $slug ) {
					$upd['role'] = $replacement;
				}
				if ( isset( $set['expire_role'] ) && $set['expire_role'] === $slug ) {
					$set['expire_role'] = $replacement;
					$upd['settings']    = $set;
				}
				memberglut_repo( 'plans' )->update( $plan['id'], $upd );
			}
			MemberGlut_Plans::flush();
		}
		// Move users: give them the replacement (or the default role) when this was their only role.
		$move_to = $replacement ? $replacement : $default;
		$users   = get_users( array( 'role' => $slug, 'fields' => 'all' ) );
		foreach ( $users as $user ) {
			$user->remove_role( $slug );
			if ( ! $user->roles ) {
				$user->add_role( $move_to );
			}
		}
		remove_role( $slug );
		/* translators: 1: role, 2: number of users, 3: role */
		memberglut_event( 'role_deleted', sprintf( __( 'Role %1$s deleted; %2$d users moved to %3$s', 'memberglut' ), $slug, count( $users ), $move_to ), array( 'object_type' => 'role' ) );
		do_action( 'memberglut_role_deleted', $slug, $move_to );
		return true;
	}

	/**
	 * Register a custom capability and optionally grant it to a role.
	 *
	 * @param string $cap  Capability.
	 * @param string $role Role to grant it to.
	 * @return string|WP_Error The clean capability.
	 */
	public static function add_capability( $cap, $role = '' ) {
		$cap = trim( self::clean_key( $cap ), '_' );
		if ( '' === $cap ) {
			return new WP_Error( 'memberglut_invalid_cap', __( 'Use lowercase letters, numbers and underscores.', 'memberglut' ), array( 'status' => 400 ) );
		}
		$reg         = self::registry();
		$reg[ $cap ] = $cap;
		update_option( self::REGISTRY, $reg );
		if ( $role && 'administrator' !== $role && get_role( $role ) ) {
			get_role( $role )->add_cap( $cap, true );
		}
		// Administrators always get custom capabilities so they can use what they create.
		if ( get_role( 'administrator' ) ) {
			get_role( 'administrator' )->add_cap( $cap, true );
		}
		/* translators: %s: capability */
		memberglut_event( 'cap_change', sprintf( __( 'Custom capability %s added', 'memberglut' ), $cap ), array( 'object_type' => 'role' ) );
		return $cap;
	}

	/**
	 * Remove a custom capability from the registry and every role.
	 *
	 * @param string $cap Capability.
	 * @return true|WP_Error
	 */
	public static function remove_capability( $cap ) {
		$reg = self::registry();
		if ( ! isset( $reg[ $cap ] ) ) {
			return new WP_Error( 'memberglut_not_custom', __( 'Only custom capabilities can be removed.', 'memberglut' ), array( 'status' => 400 ) );
		}
		unset( $reg[ $cap ] );
		update_option( self::REGISTRY, $reg );
		foreach ( array_keys( wp_roles()->roles ) as $slug ) {
			get_role( $slug )->remove_cap( $cap );
		}
		/* translators: %s: capability */
		memberglut_event( 'cap_change', sprintf( __( 'Custom capability %s removed', 'memberglut' ), $cap ), array( 'object_type' => 'role' ) );
		return true;
	}

	/**
	 * Remember a role MemberGlut created (only those are removed by “Delete all data” / uninstall).
	 *
	 * @param string $slug Role.
	 * @return void
	 */
	private static function remember_created( $slug ) {
		$created          = (array) get_option( 'memberglut_created_roles', array() );
		$created[ $slug ] = $slug;
		update_option( 'memberglut_created_roles', $created, false );
	}

	/* ---------------------------------------------------------------------
	 * Import / export
	 * ------------------------------------------------------------------ */

	/**
	 * Export roles.
	 *
	 * @param string[] $slugs Roles (empty = all).
	 * @return array
	 */
	public static function export( $slugs = array() ) {
		$out = array();
		foreach ( wp_roles()->roles as $slug => $role ) {
			if ( $slugs && ! in_array( $slug, $slugs, true ) ) {
				continue;
			}
			$out[] = array(
				'slug' => $slug,
				'name' => $role['name'],
				'caps' => (array) $role['capabilities'],
			);
		}
		return array(
			'plugin'      => 'memberglut',
			'type'        => 'roles',
			'version'     => MEMBERGLUT_VERSION,
			'exported_at' => gmdate( 'c' ),
			'site'        => home_url(),
			'roles'       => $out,
			'custom_caps' => array_keys( self::registry() ),
		);
	}

	/**
	 * Validate an import file.
	 *
	 * @param mixed $data Decoded JSON.
	 * @return array|WP_Error Roles list.
	 */
	private static function read_import( $data ) {
		if ( ! is_array( $data ) || empty( $data['roles'] ) || ! is_array( $data['roles'] ) ) {
			return new WP_Error( 'memberglut_invalid_file', __( 'This is not a MemberGlut roles file.', 'memberglut' ), array( 'status' => 400 ) );
		}
		$roles = array();
		foreach ( $data['roles'] as $r ) {
			if ( ! is_array( $r ) || empty( $r['slug'] ) ) {
				continue;
			}
			$caps = array();
			foreach ( (array) ( isset( $r['caps'] ) ? $r['caps'] : array() ) as $cap => $grant ) {
				$c = self::clean_key( $cap );
				if ( $c ) {
					$caps[ $c ] = (bool) $grant;
				}
			}
			$roles[] = array(
				'slug' => self::clean_key( $r['slug'] ),
				'name' => sanitize_text_field( isset( $r['name'] ) ? $r['name'] : $r['slug'] ),
				'caps' => $caps,
			);
		}
		return $roles;
	}

	/**
	 * Preview what an import would do.
	 *
	 * @param mixed $data Decoded JSON.
	 * @return array|WP_Error
	 */
	public static function import_preview( $data ) {
		$roles = self::read_import( $data );
		if ( is_wp_error( $roles ) ) {
			return $roles;
		}
		$out = array();
		foreach ( $roles as $r ) {
			$existing = get_role( $r['slug'] );
			$state    = 'new';
			$diff     = array( 'added' => array(), 'removed' => array(), 'changed' => array() );
			if ( 'administrator' === $r['slug'] ) {
				$state = 'protected';
			} elseif ( $existing ) {
				$old = (array) $existing->capabilities;
				foreach ( $r['caps'] as $cap => $grant ) {
					if ( ! array_key_exists( $cap, $old ) ) {
						$diff['added'][] = $cap;
					} elseif ( (bool) $old[ $cap ] !== $grant ) {
						$diff['changed'][] = $cap;
					}
				}
				foreach ( $old as $cap => $g ) {
					if ( ! array_key_exists( $cap, $r['caps'] ) && ! preg_match( '/^level_\d+$/', $cap ) ) {
						$diff['removed'][] = $cap;
					}
				}
				$state = ( $diff['added'] || $diff['removed'] || $diff['changed'] ) ? 'changed' : 'same';
			}
			$out[] = array(
				'slug'  => $r['slug'],
				'name'  => $r['name'],
				'caps'  => count( $r['caps'] ),
				'state' => $state,
				'diff'  => $diff,
			);
		}
		return $out;
	}

	/**
	 * Import roles with a choice per role: import (new), overwrite, rename, skip.
	 *
	 * @param mixed $data    Decoded JSON.
	 * @param array $choices slug => import|overwrite|rename|skip.
	 * @return array|WP_Error Summary.
	 */
	public static function import( $data, $choices ) {
		$roles = self::read_import( $data );
		if ( is_wp_error( $roles ) ) {
			return $roles;
		}
		$done = array( 'created' => 0, 'updated' => 0, 'skipped' => 0 );
		foreach ( $roles as $r ) {
			$choice = isset( $choices[ $r['slug'] ] ) ? $choices[ $r['slug'] ] : 'skip';
			if ( 'administrator' === $r['slug'] || 'skip' === $choice ) {
				++$done['skipped'];
				continue;
			}
			$exists = (bool) get_role( $r['slug'] );
			if ( 'rename' === $choice || ( $exists && 'import' === $choice ) ) {
				$slug = $r['slug'] . '_imported';
				$i    = 2;
				while ( get_role( $slug ) ) {
					$slug = $r['slug'] . '_imported_' . $i++;
				}
				add_role( $slug, $r['name'] . ' ' . __( '(imported)', 'memberglut' ), $r['caps'] );
				self::remember_created( $slug );
				++$done['created'];
				continue;
			}
			if ( $exists ) {
				$caps = array();
				foreach ( $r['caps'] as $cap => $grant ) {
					$caps[ $cap ] = $grant ? 'grant' : 'deny';
				}
				$res = self::save_caps( $r['slug'], $caps );
				if ( ! is_wp_error( $res ) ) {
					++$done['updated'];
				}
				continue;
			}
			add_role( $r['slug'], $r['name'], $r['caps'] );
			self::remember_created( $r['slug'] );
			++$done['created'];
		}
		if ( ! empty( $data['custom_caps'] ) ) {
			$reg = self::registry();
			foreach ( (array) $data['custom_caps'] as $cap ) {
				$cap = self::clean_key( $cap );
				if ( $cap ) {
					$reg[ $cap ] = $cap;
				}
			}
			update_option( self::REGISTRY, $reg );
		}
		/* translators: 1: created, 2: updated, 3: skipped */
		memberglut_event( 'roles_imported', sprintf( __( 'Roles imported: %1$d created, %2$d updated, %3$d skipped', 'memberglut' ), $done['created'], $done['updated'], $done['skipped'] ), array( 'object_type' => 'role' ) );
		return $done;
	}

	/* ---------------------------------------------------------------------
	 * Deny enforcement
	 * ------------------------------------------------------------------ */

	/**
	 * Denied capabilities win over grants from the user's other roles.
	 *
	 * @param array   $allcaps All caps of the user.
	 * @param array   $caps    Required caps.
	 * @param array   $args    Args.
	 * @param WP_User $user    User.
	 * @return array
	 */
	public static function enforce_denies( $allcaps, $caps, $args, $user ) {
		if ( ! $user instanceof WP_User || empty( $user->roles ) || count( $user->roles ) < 2 ) {
			return $allcaps; // A single role already has its own denies applied by WordPress.
		}
		if ( is_multisite() && is_super_admin( $user->ID ) ) {
			return $allcaps;
		}
		$roles = wp_roles();
		foreach ( (array) $user->roles as $slug ) {
			if ( 'administrator' === $slug || empty( $roles->roles[ $slug ]['capabilities'] ) ) {
				continue;
			}
			foreach ( $roles->roles[ $slug ]['capabilities'] as $cap => $grant ) {
				if ( ! $grant ) {
					$allcaps[ $cap ] = false;
				}
			}
		}
		return $allcaps;
	}

	/* ---------------------------------------------------------------------
	 * Multiple roles on the user screens
	 * ------------------------------------------------------------------ */

	/**
	 * Role checkboxes on the user edit / new user screen.
	 *
	 * @param WP_User|string $user User or context string on user-new.php.
	 * @return void
	 */
	public static function render_role_checkboxes( $user ) {
		if ( ! current_user_can( 'promote_users' ) ) {
			return;
		}
		$is_user = $user instanceof WP_User;
		if ( $is_user && IS_PROFILE_PAGE && ! current_user_can( 'manage_options' ) ) {
			return; // People can't change their own roles.
		}
		$editable = get_editable_roles();
		$current  = $is_user ? (array) $user->roles : array( get_option( 'default_role', 'subscriber' ) );
		wp_nonce_field( 'memberglut_user_roles', 'memberglut_user_roles_nonce' );
		?>
		<h2><?php esc_html_e( 'Roles', 'memberglut' ); ?></h2>
		<table class="form-table" role="presentation">
			<tr>
				<th><?php esc_html_e( 'Roles', 'memberglut' ); ?></th>
				<td>
					<fieldset>
						<input type="hidden" name="memberglut_roles_submitted" value="1" />
						<?php foreach ( $editable as $slug => $details ) : ?>
							<label style="display:block;margin:0 0 6px">
								<input type="checkbox" name="memberglut_roles[]" value="<?php echo esc_attr( $slug ); ?>" <?php checked( in_array( $slug, $current, true ) ); ?> />
								<?php echo esc_html( translate_user_role( $details['name'] ) ); ?>
							</label>
						<?php endforeach; ?>
						<p class="description"><?php esc_html_e( 'The first checked role is the primary role. Membership plans may add more roles automatically.', 'memberglut' ); ?></p>
					</fieldset>
				</td>
			</tr>
		</table>
		<?php
	}

	/**
	 * Save the role checkboxes.
	 *
	 * @param int $user_id User ID.
	 * @return void
	 */
	public static function save_role_checkboxes( $user_id ) {
		if ( ! is_admin() || empty( $_POST['memberglut_roles_submitted'] ) || ! current_user_can( 'promote_users' ) || ! current_user_can( 'edit_user', $user_id ) ) {
			return;
		}
		$nonce = isset( $_POST['memberglut_user_roles_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['memberglut_user_roles_nonce'] ) ) : '';
		if ( ! wp_verify_nonce( $nonce, 'memberglut_user_roles' ) ) {
			return;
		}
		$editable = array_keys( get_editable_roles() );
		$wanted   = isset( $_POST['memberglut_roles'] ) ? array_map( 'sanitize_key', (array) wp_unslash( $_POST['memberglut_roles'] ) ) : array();
		$wanted   = array_values( array_intersect( $wanted, $editable ) );
		// Never let an admin remove their own administrator role here.
		if ( (int) $user_id === get_current_user_id() && in_array( 'administrator', wp_get_current_user()->roles, true ) && ! in_array( 'administrator', $wanted, true ) ) {
			$wanted[] = 'administrator';
		}
		$user = new WP_User( $user_id );
		foreach ( (array) $user->roles as $role ) {
			if ( in_array( $role, $editable, true ) && ! in_array( $role, $wanted, true ) ) {
				$user->remove_role( $role );
			}
		}
		foreach ( $wanted as $i => $role ) {
			if ( 0 === $i ) {
				// Primary role first in wp_capabilities.
				$others = array_diff( (array) $user->roles, array( $role ) );
				$user->set_role( $role );
				foreach ( $others as $o ) {
					$user->add_role( $o );
				}
			} elseif ( ! in_array( $role, (array) $user->roles, true ) ) {
				$user->add_role( $role );
			}
		}
	}

	/**
	 * Hide the core single-role select when the checkboxes are shown.
	 *
	 * @return void
	 */
	public static function hide_core_role_select() {
		if ( current_user_can( 'promote_users' ) ) {
			echo '<style>.user-role-wrap{display:none}</style>';
		}
	}

	/* ---------------------------------------------------------------------
	 * Administrator rescue
	 * ------------------------------------------------------------------ */

	/**
	 * Remember who is (or was) an administrator, so a locked-out admin can still use the rescue link.
	 *
	 * @param int      $user_id   User.
	 * @param string   $role      New role.
	 * @param string[] $old_roles Old roles.
	 * @return void
	 */
	public static function remember_admins( $user_id, $role, $old_roles = array() ) {
		if ( 'administrator' === $role || in_array( 'administrator', (array) $old_roles, true ) ) {
			self::add_admin_id( $user_id );
		}
	}

	/**
	 * Remember administrators added with add_role().
	 *
	 * @param int    $user_id User.
	 * @param string $role    Role.
	 * @return void
	 */
	public static function remember_admin_on_add( $user_id, $role ) {
		if ( 'administrator' === $role ) {
			self::add_admin_id( $user_id );
		}
	}

	/**
	 * Add to the admin list.
	 *
	 * @param int $user_id User.
	 * @return void
	 */
	private static function add_admin_id( $user_id ) {
		$ids = (array) get_option( self::ADMIN_IDS, array() );
		if ( ! in_array( (int) $user_id, $ids, true ) ) {
			$ids[] = (int) $user_id;
			update_option( self::ADMIN_IDS, $ids, false );
		}
	}

	/**
	 * Users eligible for the rescue link.
	 *
	 * @return int[]
	 */
	public static function eligible_admin_ids() {
		$ids = array_map( 'intval', (array) get_option( self::ADMIN_IDS, array() ) );
		foreach ( get_users( array( 'role' => 'administrator', 'fields' => 'ID' ) ) as $id ) {
			$ids[] = (int) $id;
		}
		if ( is_multisite() ) {
			foreach ( get_super_admins() as $login ) {
				$u = get_user_by( 'login', $login );
				if ( $u ) {
					$ids[] = (int) $u->ID;
				}
			}
		}
		return array_values( array_unique( $ids ) );
	}

	/**
	 * wp-login.php?action=memberglut_rescue — request form, email and link handling.
	 *
	 * @return void
	 */
	public static function rescue_screen() {
		if ( ! self::option( 'rescue' ) ) {
			wp_safe_redirect( wp_login_url() );
			exit;
		}
		$message = '';
		$errors  = new WP_Error();

		// Step 2: the emailed link.
		// phpcs:disable WordPress.Security.NonceVerification.Recommended -- The emailed key is the proof.
		if ( isset( $_GET['key'], $_GET['uid'] ) ) {
			$uid  = absint( $_GET['uid'] );
			$key  = sanitize_text_field( wp_unslash( $_GET['key'] ) );
			$data = get_user_meta( $uid, 'memberglut_rescue', true );
			// phpcs:enable
			if ( is_array( $data ) && ! empty( $data['hash'] ) && $data['expires'] > time() && wp_check_password( $key, $data['hash'] ) && in_array( $uid, self::eligible_admin_ids(), true ) ) {
				delete_user_meta( $uid, 'memberglut_rescue' );
				self::restore_administrator( $uid );
				memberglut_event( 'admin_rescued', __( 'Administrator access restored with the rescue link', 'memberglut' ), array( 'user_id' => $uid, 'object_type' => 'user', 'object_id' => $uid, 'actor_id' => $uid ) );
				$message = __( 'Your administrator access has been restored. You can log in now.', 'memberglut' );
			} else {
				$errors->add( 'invalid', __( 'This rescue link is invalid or has expired. Request a new one.', 'memberglut' ) );
			}
		} elseif ( memberglut_is_post_request() ) {
			// Step 1: request a link.
			$nonce = isset( $_POST['memberglut_rescue_nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['memberglut_rescue_nonce'] ) ) : '';
			$email = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
			$ip    = memberglut_client_ip();
			$tkey  = 'memberglut_rescue_' . md5( $ip );
			$tries = (int) get_transient( $tkey );
			if ( ! wp_verify_nonce( $nonce, 'memberglut_rescue' ) ) {
				$errors->add( 'nonce', __( 'Your session expired. Please try again.', 'memberglut' ) );
			} elseif ( $tries >= 3 ) {
				$errors->add( 'limit', __( 'Too many requests. Try again in an hour.', 'memberglut' ) );
			} else {
				set_transient( $tkey, $tries + 1, HOUR_IN_SECONDS );
				$user = get_user_by( 'email', $email );
				if ( $user && in_array( (int) $user->ID, self::eligible_admin_ids(), true ) ) {
					$key = wp_generate_password( 32, false );
					update_user_meta( $user->ID, 'memberglut_rescue', array( 'hash' => wp_hash_password( $key ), 'expires' => time() + self::RESCUE_LIFETIME ) );
					$link = add_query_arg( array( 'action' => 'memberglut_rescue', 'uid' => $user->ID, 'key' => rawurlencode( $key ) ), site_url( 'wp-login.php', 'login' ) );
					wp_mail(
						$user->user_email,
						/* translators: %s: site name */
						sprintf( __( '[%s] Administrator rescue link', 'memberglut' ), wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES ) ),
						/* translators: %s: link */
						sprintf( __( "Someone asked to restore administrator access for your account.\n\nOpen this link within 15 minutes to restore it:\n%s\n\nIf this was not you, ignore this email.", 'memberglut' ), $link )
					);
					memberglut_log( 'warning', 'login', 'Administrator rescue link requested', array( 'user_id' => $user->ID, 'ip' => $ip ) );
				}
				// Same answer whether or not the email matched, to avoid revealing accounts.
				$message = __( 'If this email belongs to an administrator, a rescue link is on its way. It works for 15 minutes.', 'memberglut' );
			}
		}

		login_header( __( 'Administrator rescue', 'memberglut' ), $message ? '<p class="message">' . esc_html( $message ) . '</p>' : '', $errors );
		?>
		<form name="memberglut_rescue" method="post" action="<?php echo esc_url( add_query_arg( 'action', 'memberglut_rescue', site_url( 'wp-login.php', 'login_post' ) ) ); ?>">
			<p><?php esc_html_e( 'Locked out after changing roles? Enter the email of your administrator account and we will send a link that restores the Administrator role.', 'memberglut' ); ?></p>
			<p>
				<label for="memberglut_rescue_email"><?php esc_html_e( 'Email', 'memberglut' ); ?></label>
				<input type="email" name="email" id="memberglut_rescue_email" class="input" required autocomplete="email" />
			</p>
			<?php wp_nonce_field( 'memberglut_rescue', 'memberglut_rescue_nonce' ); ?>
			<p class="submit"><input type="submit" class="button button-primary button-large" value="<?php esc_attr_e( 'Send rescue link', 'memberglut' ); ?>" /></p>
		</form>
		<p id="nav"><a href="<?php echo esc_url( wp_login_url() ); ?>"><?php esc_html_e( 'Log in', 'memberglut' ); ?></a></p>
		<?php
		login_footer();
		exit;
	}

	/**
	 * Give a user the administrator role back, recreating the role if it was broken.
	 *
	 * @param int $user_id User.
	 * @return void
	 */
	public static function restore_administrator( $user_id ) {
		$role = get_role( 'administrator' );
		if ( ! $role || ! $role->has_cap( 'manage_options' ) ) {
			$caps = array();
			foreach ( wp_roles()->roles as $r ) {
				foreach ( (array) $r['capabilities'] as $cap => $grant ) {
					$caps[ $cap ] = true;
				}
			}
			foreach ( array( 'manage_options', 'activate_plugins', 'edit_users', 'promote_users', 'list_users', 'create_users', 'delete_users', 'edit_theme_options', 'switch_themes', 'install_plugins', 'update_plugins', 'edit_plugins', 'unfiltered_html', 'update_core' ) as $cap ) {
				$caps[ $cap ] = true;
			}
			if ( ! $role ) {
				add_role( 'administrator', 'Administrator', $caps );
			} else {
				foreach ( $caps as $cap => $g ) {
					$role->add_cap( $cap, true );
				}
			}
		}
		MemberGlut_Permissions::grant_admin_caps();
		$user = new WP_User( $user_id );
		$user->add_role( 'administrator' );
	}
}
