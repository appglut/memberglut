<?php
/**
 * Content rule endpoints.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_REST_Rules class.
 */
class MemberGlut_REST_Rules extends MemberGlut_REST_Controller {

	const CAP = 'memberglut_manage_rules';

	/**
	 * Routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		$this->route( '/rules', 'GET', 'index', self::CAP );
		$this->route( '/rules', 'POST', 'create', self::CAP );
		$this->route( '/rules/per-post', 'GET', 'per_post', self::CAP );
		$this->route( '/rules/stats', 'GET', 'stats', self::CAP );
		$this->route( '/rules/test', 'POST', 'test', self::CAP );
		register_rest_route(
			self::NS,
			'/rules/applies',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'applies' ),
				'permission_callback' => static function ( WP_REST_Request $r ) {
					return current_user_can( 'edit_post', absint( $r->get_param( 'post' ) ) );
				},
			)
		);
		$this->route( '/rules/(?P<id>\d+)', 'GET', 'show', self::CAP );
		$this->route( '/rules/(?P<id>\d+)', 'PUT,POST', 'update', self::CAP );
		$this->route( '/rules/(?P<id>\d+)', 'DELETE', 'destroy', self::CAP );
		$this->route( '/rules/(?P<id>\d+)/duplicate', 'POST', 'duplicate', self::CAP );
		$this->route( '/rules/(?P<id>\d+)/status', 'PATCH,POST', 'status', self::CAP );
	}

	/**
	 * List.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function index( WP_REST_Request $request ) {
		return rest_ensure_response( MemberGlut_Rules::all_for_client( sanitize_text_field( (string) $request->get_param( 'search' ) ) ) );
	}

	/**
	 * One rule, with labels for the selected posts/terms/authors so the pickers can show them.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function show( WP_REST_Request $request ) {
		$rule = MemberGlut_Rules::get( (int) $request['id'] );
		if ( ! $rule ) {
			return $this->error( 'not_found', __( 'Rule not found.', 'memberglut' ), 404 );
		}
		$rule['labels'] = $this->labels( array_merge( $rule['protect'], $rule['exclude'] ) );
		return rest_ensure_response( $rule );
	}

	/**
	 * Option labels for the targets of a rule.
	 *
	 * @param array $targets Targets.
	 * @return array [ posts => [id => label], terms => [id => label], authors => [id => label] ]
	 */
	private function labels( $targets ) {
		$out = array( 'posts' => array(), 'terms' => array(), 'authors' => array() );
		foreach ( $targets as $t ) {
			foreach ( isset( $t['posts'] ) ? $t['posts'] : array() as $id ) {
				$p                       = get_post( $id );
				$out['posts'][ (int) $id ] = $p ? ( $p->post_title ? $p->post_title : '#' . $id ) . ' (' . $p->post_type . ')' : '#' . $id;
			}
			foreach ( isset( $t['terms'] ) ? $t['terms'] : array() as $id ) {
				$term                    = get_term( $id );
				$out['terms'][ (int) $id ] = $term && ! is_wp_error( $term ) ? $term->name : '#' . $id;
			}
			foreach ( isset( $t['authors'] ) ? $t['authors'] : array() as $id ) {
				$u                         = get_userdata( $id );
				$out['authors'][ (int) $id ] = $u ? $u->display_name : '#' . $id;
			}
		}
		return $out;
	}

	/**
	 * Create.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function create( WP_REST_Request $request ) {
		$d = $this->body( $request );
		unset( $d['id'] );
		$rule = MemberGlut_Rules::save( $d );
		return is_wp_error( $rule ) ? $this->as_rest_error( $rule ) : rest_ensure_response( $rule );
	}

	/**
	 * Update.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function update( WP_REST_Request $request ) {
		$d       = $this->body( $request );
		$d['id'] = (int) $request['id'];
		$rule    = MemberGlut_Rules::save( $d );
		return is_wp_error( $rule ) ? $this->as_rest_error( $rule ) : rest_ensure_response( $rule );
	}

	/**
	 * Delete.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function destroy( WP_REST_Request $request ) {
		$res = MemberGlut_Rules::delete( (int) $request['id'] );
		return is_wp_error( $res ) ? $this->as_rest_error( $res ) : rest_ensure_response( array( 'deleted' => true ) );
	}

	/**
	 * Duplicate.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function duplicate( WP_REST_Request $request ) {
		$rule = MemberGlut_Rules::duplicate( (int) $request['id'] );
		return is_wp_error( $rule ) ? $this->as_rest_error( $rule ) : rest_ensure_response( $rule );
	}

	/**
	 * Status.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function status( WP_REST_Request $request ) {
		$b    = $this->body( $request );
		$rule = MemberGlut_Rules::set_status( (int) $request['id'], isset( $b['status'] ) ? (string) $b['status'] : 'inactive' );
		return is_wp_error( $rule ) ? $this->as_rest_error( $rule ) : rest_ensure_response( $rule );
	}

	/**
	 * Posts locked one by one.
	 *
	 * @return WP_REST_Response
	 */
	public function per_post() {
		$out = array();
		foreach ( MemberGlut_Rules::per_post_ids() as $id ) {
			$post = get_post( $id );
			$a    = MemberGlut_Access::post_settings( $id );
			if ( ! $post || ! $a || 'trash' === $post->post_status ) {
				continue;
			}
			$actions = array(
				'inherit'  => __( 'Global setting', 'memberglut' ),
				'message'  => __( 'Message', 'memberglut' ),
				'login'    => __( 'Login form', 'memberglut' ),
				'redirect' => __( 'Redirect', 'memberglut' ),
				'pricing'  => __( 'Pricing page', 'memberglut' ),
			);
			$out[] = array(
				'id'       => $id,
				'title'    => $post->post_title ? $post->post_title : '#' . $id,
				'type'     => $post->post_type,
				'status'   => $post->post_status,
				'access'   => MemberGlut_Post_Access_Admin::who_label( $a ),
				'action'   => 'everyone' === $a['who'] ? '—' : $actions[ $a['action'] ],
				'edit_url' => get_edit_post_link( $id, 'raw' ),
				'view_url' => get_permalink( $id ),
			);
		}
		return rest_ensure_response( $out );
	}

	/**
	 * Stat cards.
	 *
	 * @return WP_REST_Response
	 */
	public function stats() {
		$key   = 'memberglut_rule_stats_' . md5( MemberGlut_Access_Cache::version() );
		$cache = get_transient( $key );
		if ( ! is_array( $cache ) ) {
			$ids = MemberGlut_Rules::per_post_ids();
			foreach ( MemberGlut_Rules::active() as $rule ) {
				$ids = array_merge( $ids, MemberGlut_Rules::candidate_ids( $rule ) );
			}
			$protected = 0;
			foreach ( array_unique( $ids ) as $id ) {
				$post = get_post( $id );
				if ( ! $post ) {
					continue;
				}
				$own = MemberGlut_Access::post_settings( $id );
				if ( ( $own && 'everyone' !== $own['who'] ) || ( ! $own && MemberGlut_Rules::rule_for_post( $post ) ) ) {
					++$protected;
				}
			}
			$cache = array( 'protected' => $protected );
			set_transient( $key, $cache, HOUR_IN_SECONDS );
		}
		$to          = wp_date( 'Y-m-d' );
		$from        = wp_date( 'Y-m-d', time() - 6 * DAY_IN_SECONDS );
		$views       = MemberGlut_Stats::sum( 'paywall_views', $from, $to );
		$conversions = MemberGlut_Stats::sum( 'paywall_conversions', $from, $to );
		return rest_ensure_response(
			array(
				'active'      => count( MemberGlut_Rules::active() ),
				'protected'   => (int) $cache['protected'],
				'views'       => (int) $views,
				'conversions' => (int) $conversions,
				'rate'        => $views ? round( $conversions / $views * 100, 1 ) : 0,
			)
		);
	}

	/**
	 * Which rule / setting protects a post (block editor panel).
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response
	 */
	public function applies( WP_REST_Request $request ) {
		$post = get_post( absint( $request->get_param( 'post' ) ) );
		$rule = $post ? MemberGlut_Rules::rule_for_post( $post ) : null;
		return rest_ensure_response( $rule ? array( 'id' => $rule['id'], 'title' => $rule['title'] ) : array( 'id' => 0 ) );
	}

	/**
	 * Access tester: what would a user see on a URL with the rule as it is in the editor (unsaved changes included)?
	 *
	 * @param WP_REST_Request $request Request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function test( WP_REST_Request $request ) {
		$b       = $this->body( $request );
		$url     = isset( $b['url'] ) ? trim( (string) $b['url'] ) : '';
		$user_id = isset( $b['user'] ) && 'guest' !== $b['user'] ? absint( $b['user'] ) : 0;
		if ( '' === $url ) {
			return $this->error( 'invalid', __( 'Enter a URL to check.', 'memberglut' ) );
		}
		if ( 0 === strpos( $url, '/' ) ) {
			$url = home_url( $url );
		}
		$draft = isset( $b['rule'] ) && is_array( $b['rule'] ) ? $b['rule'] : array();

		// Rules as they would be with the draft saved.
		$rules = array();
		foreach ( MemberGlut_Rules::active() as $r ) {
			if ( empty( $draft['id'] ) || (int) $draft['id'] !== (int) $r['id'] ) {
				$rules[] = $r;
			}
		}
		if ( $draft && ( ! isset( $draft['status'] ) || 'active' === $draft['status'] ) ) {
			$errors                  = array();
			$rules[]                 = array(
				'id'               => isset( $draft['id'] ) ? (int) $draft['id'] : -1,
				'title'            => isset( $draft['title'] ) && $draft['title'] ? sanitize_text_field( $draft['title'] ) : __( 'this rule', 'memberglut' ),
				'priority'         => isset( $draft['priority'] ) ? (int) $draft['priority'] : 10,
				'protect'          => $this->clean_targets( isset( $draft['protect'] ) ? $draft['protect'] : array() ),
				'exclude'          => $this->clean_targets( isset( $draft['exclude'] ) ? $draft['exclude'] : array() ), // phpcs:ignore WordPressVIPMinimum.Performance.WPQueryParams.PostNotIn_exclude -- “exclude” is the rule’s exclusion list, not a query argument.
				'include_children' => ! empty( $draft['include_children'] ),
				'who'              => isset( $draft['who'] ) ? sanitize_key( $draft['who'] ) : 'plans',
				'plans'            => array_map( 'intval', isset( $draft['plans'] ) ? (array) $draft['plans'] : array() ),
				'roles'            => array_map( 'sanitize_key', isset( $draft['roles'] ) ? (array) $draft['roles'] : array() ),
				'user_ids'         => array(),
				'action'           => isset( $draft['action'] ) ? sanitize_key( $draft['action'] ) : 'inherit',
				'redirect'         => isset( $draft['redirect'] ) ? absint( $draft['redirect'] ) : 0,
				'custom_message'   => ! empty( $draft['custom_message'] ),
				'message'          => isset( $draft['message'] ) ? wp_kses_post( $draft['message'] ) : '',
				'teaser'           => isset( $draft['teaser'] ) ? sanitize_key( $draft['teaser'] ) : 'inherit',
				'in_lists'         => isset( $draft['in_lists'] ) ? sanitize_key( $draft['in_lists'] ) : 'inherit',
				'updated'          => '',
			);
			foreach ( isset( $draft['users'] ) ? (array) $draft['users'] : array() as $name ) {
				$u = get_user_by( 'login', sanitize_user( $name ) );
				if ( $u ) {
					$rules[ count( $rules ) - 1 ]['user_ids'][] = (int) $u->ID;
				}
			}
		}
		usort(
			$rules,
			static function ( $a, $b ) {
				return $b['priority'] <=> $a['priority'] ?: ( $a['id'] <=> $b['id'] );
			}
		);
		MemberGlut_Rules::$override = $rules;
		MemberGlut_Access::flush();

		$post_id = url_to_postid( $url );
		$target  = '';
		if ( $post_id ) {
			$d      = MemberGlut_Access::decide_post( $post_id, $user_id );
			$target = get_the_title( $post_id );
		} else {
			$d      = MemberGlut_Access::decide_context( $this->context_for_url( $url ), $user_id );
			$target = MemberGlut_Rules::path_of( $url );
		}
		MemberGlut_Rules::$override = null;
		MemberGlut_Access::flush();

		$who  = $user_id ? get_userdata( $user_id ) : null;
		$name = $who ? $who->display_name : __( 'A logged-out visitor', 'memberglut' );
		if ( $user_id && memberglut_user_bypasses_restrictions( $user_id ) ) {
			/* translators: %s: user */
			return rest_ensure_response( array( 'allowed' => true, 'text' => sprintf( __( 'Allowed: %s is an administrator and always has access.', 'memberglut' ), $name ) ) );
		}
		if ( $d['allowed'] ) {
			$text = $d['restricted']
				/* translators: 1: user, 2: page, 3: rule */
				? sprintf( __( 'Allowed: %1$s can see “%2$s” (%3$s).', 'memberglut' ), $name, $target, 'post' === $d['source'] ? __( 'its own access settings', 'memberglut' ) : sprintf( __( 'rule “%s”', 'memberglut' ), $d['rule_title'] ) )
				/* translators: 1: user, 2: page */
				: sprintf( __( 'Allowed: no rule protects “%2$s”, so %1$s can see it.', 'memberglut' ), $name, $target );
			return rest_ensure_response( array( 'allowed' => true, 'text' => $text ) );
		}
		$actions = array(
			'message'  => __( 'the restriction message', 'memberglut' ),
			'login'    => __( 'the login form', 'memberglut' ),
			'redirect' => __( 'a redirect to', 'memberglut' ) . ' ' . $d['redirect'],
			'pricing'  => __( 'the pricing page', 'memberglut' ),
		);
		$source = 'post' === $d['source'] ? __( 'the post’s own access settings', 'memberglut' ) : sprintf( /* translators: %s: rule */ __( 'the rule “%s”', 'memberglut' ), $d['rule_title'] );
		return rest_ensure_response(
			array(
				'allowed' => false,
				/* translators: 1: user, 2: page, 3: source, 4: what they see */
				'text'    => sprintf( __( 'Blocked: %1$s cannot see “%2$s” because of %3$s. They see %4$s.', 'memberglut' ), $name, $target, $source, isset( $actions[ $d['action'] ] ) ? $actions[ $d['action'] ] : $d['action'] ),
			)
		);
	}

	/**
	 * Light clean-up of draft targets (no validation errors in the tester).
	 *
	 * @param array $list Targets.
	 * @return array
	 */
	private function clean_targets( $list ) {
		$out = array();
		foreach ( (array) $list as $t ) {
			if ( ! is_array( $t ) || empty( $t['type'] ) || ! in_array( $t['type'], MemberGlut_Rules::targets(), true ) ) {
				continue;
			}
			if ( ! in_array( $t['type'], MemberGlut_Rules::TARGETS, true ) ) {
				$out[] = (array) apply_filters( 'memberglut_sanitize_rule_target', array( 'type' => sanitize_key( $t['type'] ) ), $t );
				continue;
			}
			$out[] = array(
				'type'      => $t['type'],
				'post_type' => isset( $t['post_type'] ) ? sanitize_key( $t['post_type'] ) : '',
				'posts'     => array_map( 'absint', isset( $t['posts'] ) ? (array) $t['posts'] : array() ),
				'taxonomy'  => isset( $t['taxonomy'] ) ? sanitize_key( $t['taxonomy'] ) : '',
				'terms'     => array_map( 'absint', isset( $t['terms'] ) ? (array) $t['terms'] : array() ),
				'archives'  => array_map( 'sanitize_key', isset( $t['archives'] ) ? (array) $t['archives'] : array() ),
				'authors'   => array_map( 'absint', isset( $t['authors'] ) ? (array) $t['authors'] : array() ),
				'template'  => isset( $t['template'] ) ? sanitize_text_field( $t['template'] ) : '',
				'pattern'   => isset( $t['pattern'] ) ? sanitize_text_field( $t['pattern'] ) : '',
			);
		}
		return $out;
	}

	/**
	 * Request context for a URL that is not a single post (archives, search, custom paths).
	 *
	 * @param string $url URL.
	 * @return array
	 */
	private function context_for_url( $url ) {
		$path  = MemberGlut_Rules::path_of( $url );
		$query = (string) wp_parse_url( $url, PHP_URL_QUERY );
		$saved = isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : null; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- Restored below.
		$saved_info             = isset( $_SERVER['PATH_INFO'] ) ? $_SERVER['PATH_INFO'] : null; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- Restored below.
		$req_path               = (string) wp_parse_url( $url, PHP_URL_PATH );
		$_SERVER['REQUEST_URI'] = $req_path . ( $query ? '?' . $query : '' );
		if ( false !== strpos( $req_path, '/index.php/' ) ) {
			$_SERVER['PATH_INFO'] = substr( $req_path, strpos( $req_path, '/index.php/' ) + 10 );
		}
		if ( $query ) {
			parse_str( $query, $qv );
			foreach ( $qv as $k => $v ) {
				$_GET[ $k ] = $v;
			}
		}
		$wp = new WP();
		$wp->parse_request();
		$q = new WP_Query();
		$q->parse_query( $wp->query_vars );
		$_SERVER['REQUEST_URI'] = $saved;
		if ( null === $saved_info ) {
			unset( $_SERVER['PATH_INFO'] );
		} else {
			$_SERVER['PATH_INFO'] = $saved_info;
		}
		if ( $q->is_category() || $q->is_tag() || $q->is_tax() ) {
			$q->get_posts();
		}
		return MemberGlut_Access::current_context( $q, $path );
	}
}
