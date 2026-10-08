<?php
/**
 * Lookup lists for the admin screens (plans, roles, pages, post types, …).
 *
 * Localized as memberglut_admin.lookups so the React screens can build their selects at load time, and served by
 * GET /lookups for refreshes.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Lookups class.
 */
class MemberGlut_Lookups {

	/**
	 * Full lookups payload.
	 *
	 * @return array
	 */
	public static function all() {
		return apply_filters(
			'memberglut_lookups',
			array(
				'plans'         => self::plans(),
				'groups'        => self::groups(),
				'roles'         => self::roles(),
				'pages'         => self::pages(),
				'post_types'    => self::post_types(),
				'taxonomies'    => self::taxonomies(),
				'templates'     => self::templates(),
				'gateways'      => self::gateways(),
				'currency'      => self::currency(),
				'custom_fields' => self::custom_fields(),
				'email_tags'    => class_exists( 'MemberGlut_Mailer' ) ? MemberGlut_Mailer::tags_for_client() : array(),
				'statuses'      => self::statuses(),
				'forms'         => class_exists( 'MemberGlut_Plans' ) ? MemberGlut_Plans::registration_forms() : array( 'default' => __( 'Default registration form', 'memberglut' ) ),
				'test_mode'     => class_exists( 'MemberGlut_Gateways' ) ? MemberGlut_Gateways::any_in_test_mode() : (bool) memberglut_setting( 'test_mode' ),
				'site'          => array(
					'url'  => home_url( '/' ),
					'name' => get_bloginfo( 'name' ),
				),
				'signup_base'   => memberglut_page_url( 'register' ),
				'can'           => self::current_caps(),
			)
		);
	}

	/**
	 * Plans as client objects.
	 *
	 * @return array
	 */
	public static function plans() {
		if ( ! class_exists( 'MemberGlut_Plans' ) ) {
			return array();
		}
		return array_map(
			static function ( $p ) {
				$p['value'] = $p['id'];
				$p['label'] = $p['name'];
				return $p;
			},
			MemberGlut_Plans::all_for_client( false )
		);
	}

	/**
	 * Plan groups.
	 *
	 * @return string[]
	 */
	public static function groups() {
		$groups = array( 'Main' );
		foreach ( self::plans() as $p ) {
			$groups[] = $p['group'];
		}
		return array_values( array_unique( array_filter( $groups ) ) );
	}

	/**
	 * Roles with user counts.
	 *
	 * @return array
	 */
	public static function roles() {
		$counts = count_users();
		$out    = array();
		foreach ( wp_roles()->get_names() as $slug => $name ) {
			$out[] = array(
				'value' => $slug,
				'label' => translate_user_role( $name ),
				'slug'  => $slug,
				'name'  => translate_user_role( $name ),
				'users' => isset( $counts['avail_roles'][ $slug ] ) ? (int) $counts['avail_roles'][ $slug ] : 0,
			);
		}
		return $out;
	}

	/**
	 * Published pages.
	 *
	 * @return array
	 */
	public static function pages() {
		$pages = get_posts(
			array(
				'post_type'      => 'page',
				'post_status'    => array( 'publish', 'private' ),
				'posts_per_page' => 500,
				'orderby'        => 'title',
				'order'          => 'ASC',
				'no_found_rows'  => true,
			)
		);
		return array_map(
			static function ( $p ) {
				return array(
					'value' => $p->ID,
					'label' => $p->post_title ? $p->post_title : sprintf( '#%d', $p->ID ),
				);
			},
			$pages
		);
	}

	/**
	 * Public post types (attachments excluded).
	 *
	 * @return array
	 */
	public static function post_types() {
		$out = array();
		foreach ( get_post_types( array( 'public' => true ), 'objects' ) as $pt ) {
			if ( 'attachment' === $pt->name ) {
				continue;
			}
			$out[] = array(
				'value'        => $pt->name,
				'label'        => $pt->labels->name,
				'hierarchical' => (bool) $pt->hierarchical,
			);
		}
		return $out;
	}

	/**
	 * Public taxonomies.
	 *
	 * @return array
	 */
	public static function taxonomies() {
		$out = array();
		foreach ( get_taxonomies( array( 'public' => true ), 'objects' ) as $tax ) {
			if ( 'post_format' === $tax->name ) {
				continue;
			}
			$out[] = array(
				'value'      => $tax->name,
				'label'      => $tax->labels->singular_name,
				'post_types' => array_values( (array) $tax->object_type ),
			);
		}
		return $out;
	}

	/**
	 * Page templates (classic) and custom block templates (block themes).
	 *
	 * @return array
	 */
	public static function templates() {
		$out = array();
		foreach ( wp_get_theme()->get_page_templates( null, 'page' ) as $file => $name ) {
			$out[ $file ] = array( 'value' => $file, 'label' => $name );
		}
		if ( function_exists( 'get_block_templates' ) && function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() ) {
			foreach ( get_block_templates( array(), 'wp_template' ) as $tpl ) {
				if ( empty( $tpl->is_custom ) ) {
					continue;
				}
				$out[ $tpl->slug ] = array( 'value' => $tpl->slug, 'label' => $tpl->title ? $tpl->title : $tpl->slug );
			}
		}
		return array_values( $out );
	}

	/**
	 * Gateways with their enabled state.
	 *
	 * @return array
	 */
	public static function gateways() {
		if ( class_exists( 'MemberGlut_Gateways' ) ) {
			return MemberGlut_Gateways::for_client();
		}
		return array(
			array( 'value' => 'stripe', 'label' => 'Stripe', 'enabled' => (bool) memberglut_setting( 'stripe_enabled' ) ),
			array( 'value' => 'paypal', 'label' => 'PayPal', 'enabled' => (bool) memberglut_setting( 'paypal_enabled' ) ),
			array( 'value' => 'bank', 'label' => __( 'Bank transfer', 'memberglut' ), 'enabled' => (bool) memberglut_setting( 'bank_enabled' ) ),
		);
	}

	/**
	 * Currency format for money() in the admin.
	 *
	 * @return array
	 */
	public static function currency() {
		$code = memberglut_setting( 'currency', 'USD' );
		return array(
			'code'     => $code,
			'symbol'   => memberglut_currency_symbol( $code ),
			'position' => memberglut_setting( 'currency_position', 'before' ),
			'thousand' => memberglut_setting( 'thousand_sep', ',' ),
			'decimal'  => memberglut_setting( 'decimal_sep', '.' ),
			'decimals' => memberglut_currency_decimals( $code ),
		);
	}

	/**
	 * Custom registration fields.
	 *
	 * @return array
	 */
	public static function custom_fields() {
		return array_map(
			static function ( $f ) {
				return array( 'key' => $f['key'], 'label' => $f['label'], 'type' => $f['type'] );
			},
			MemberGlut_Settings::custom_fields()
		);
	}

	/**
	 * Subscription statuses and labels.
	 *
	 * @return array
	 */
	public static function statuses() {
		return array(
			'active'   => __( 'Active', 'memberglut' ),
			'trialing' => __( 'Trial', 'memberglut' ),
			'pending'  => __( 'Pending', 'memberglut' ),
			'on_hold'  => __( 'On hold', 'memberglut' ),
			'canceled' => __( 'Canceled', 'memberglut' ),
			'expired'  => __( 'Expired', 'memberglut' ),
		);
	}

	/**
	 * Which MemberGlut capabilities the current user has.
	 *
	 * @return array
	 */
	public static function current_caps() {
		$out = array();
		foreach ( array_keys( MemberGlut_Permissions::caps() ) as $cap ) {
			$out[ str_replace( 'memberglut_', '', $cap ) ] = current_user_can( $cap );
		}
		return $out;
	}

	/**
	 * Search posts of any public type (async selects).
	 *
	 * @param string $search    Search.
	 * @param string $post_type Post type or 'any'.
	 * @param int[]  $include   IDs to always include (selected values).
	 * @return array
	 */
	public static function search_posts( $search, $post_type = 'any', $include = array() ) {
		$types = 'any' === $post_type ? array_column( self::post_types(), 'value' ) : array( sanitize_key( $post_type ) );
		$posts = array();
		if ( $search || ! $include ) {
			$posts = get_posts(
				array(
					'post_type'      => $types,
					'post_status'    => array( 'publish', 'private', 'draft', 'future' ),
					'posts_per_page' => 30,
					's'              => $search,
					'no_found_rows'  => true,
				)
			);
		}
		if ( $include ) {
			$posts = array_merge(
				$posts,
				get_posts(
					array(
						'post_type'      => 'any',
						'post__in'       => array_map( 'absint', $include ),
						'post_status'    => 'any',
						'posts_per_page' => count( $include ),
					)
				)
			);
		}
		$out = array();
		foreach ( $posts as $p ) {
			$out[ $p->ID ] = array(
				'value' => $p->ID,
				'label' => ( $p->post_title ? $p->post_title : '#' . $p->ID ) . ' (' . $p->post_type . ')',
			);
		}
		return array_values( $out );
	}

	/**
	 * Search terms.
	 *
	 * @param string $taxonomy Taxonomy.
	 * @param string $search   Search.
	 * @param int[]  $include  IDs to include.
	 * @return array
	 */
	public static function search_terms( $taxonomy, $search, $include = array() ) {
		$terms = get_terms(
			array(
				'taxonomy'   => sanitize_key( $taxonomy ),
				'search'     => $search,
				'number'     => 50,
				'hide_empty' => false,
			)
		);
		$terms = is_wp_error( $terms ) ? array() : $terms;
		if ( $include ) {
			$more  = get_terms(
				array(
					'taxonomy'   => sanitize_key( $taxonomy ),
					'include'    => array_map( 'absint', $include ),
					'hide_empty' => false,
				)
			);
			$terms = array_merge( $terms, is_wp_error( $more ) ? array() : $more );
		}
		$out = array();
		foreach ( $terms as $t ) {
			$out[ $t->term_id ] = array( 'value' => $t->term_id, 'label' => $t->name );
		}
		return array_values( $out );
	}

	/**
	 * Search users.
	 *
	 * @param string $search  Search.
	 * @param int[]  $include IDs to include.
	 * @param array  $extra   Extra WP_User_Query args.
	 * @return array
	 */
	public static function search_users( $search, $include = array(), $extra = array() ) {
		$args  = array_merge(
			array(
				'number'  => 30,
				'fields'  => array( 'ID', 'user_login', 'user_email', 'display_name' ),
				'orderby' => 'display_name',
			),
			$extra
		);
		$users = array();
		if ( $search || ! $include ) {
			if ( $search ) {
				$args['search']         = '*' . $search . '*';
				$args['search_columns'] = array( 'user_login', 'user_email', 'display_name' );
			}
			$users = get_users( $args );
		}
		if ( $include ) {
			$users = array_merge(
				$users,
				get_users(
					array(
						'include' => array_map( 'absint', $include ),
						'fields'  => array( 'ID', 'user_login', 'user_email', 'display_name' ),
					)
				)
			);
		}
		$out = array();
		foreach ( $users as $u ) {
			$out[ $u->ID ] = array(
				'value'    => (int) $u->ID,
				'label'    => sprintf( '%s (%s)', $u->display_name ? $u->display_name : $u->user_login, $u->user_email ),
				'username' => $u->user_login,
			);
		}
		return array_values( $out );
	}
}
