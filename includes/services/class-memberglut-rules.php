<?php
/**
 * Content rules: storage, validation, client mapping, matching targets and candidate post sets.
 *
 * A rule = content to protect (targets) − exceptions + who can access + what others see.
 * Target types: site, post_type, pages, posts, children, taxonomy, archive, author, template, url.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Rules class.
 */
class MemberGlut_Rules {

	const TARGETS  = array( 'site', 'post_type', 'pages', 'posts', 'children', 'taxonomy', 'archive', 'author', 'template', 'url' );
	const ARCHIVES = array( 'front', 'blog', 'search', '404', 'author_archive', 'pt_archive' );

	/**
	 * Active rules cache.
	 *
	 * @var array|null
	 */
	private static $active = null;

	/**
	 * Rules injected by the access tester (unsaved changes).
	 *
	 * @var array|null
	 */
	public static $override = null;

	/**
	 * Active rules, highest priority first (ties: oldest rule first).
	 *
	 * @return array[]
	 */
	public static function active() {
		if ( null !== self::$override ) {
			return self::$override;
		}
		if ( null === self::$active ) {
			$rows         = memberglut_repo( 'rules' )->query( array( 'where' => array( 'status' => 'active' ), 'orderby' => 'priority DESC, id ASC' ) );
			self::$active = array_map( array( __CLASS__, 'normalize' ), $rows );
		}
		return self::$active;
	}

	/**
	 * Forget caches (rules changed).
	 *
	 * @return void
	 */
	public static function flush() {
		self::$active = null;
		memberglut_clear_cache();
	}

	/**
	 * Row → normalized rule (also the client shape).
	 *
	 * @param array $row Row.
	 * @return array
	 */
	public static function normalize( $row ) {
		$access = is_array( $row['access'] ) ? $row['access'] : array();
		return array(
			'id'               => (int) $row['id'],
			'title'            => (string) $row['title'],
			'status'           => (string) $row['status'],
			'priority'         => (int) $row['priority'],
			'note'             => (string) $row['note'],
			'protect'          => array_values( (array) $row['protect'] ),
			'exclude'          => array_values( (array) $row['exclude'] ),
			'include_children' => (bool) $row['include_children'],
			'who'              => isset( $access['who'] ) ? $access['who'] : 'plans',
			'plans'            => array_map( 'intval', isset( $access['plans'] ) ? (array) $access['plans'] : array() ),
			'roles'            => array_values( isset( $access['roles'] ) ? (array) $access['roles'] : array() ),
			'users'            => array_values( isset( $access['users'] ) ? (array) $access['users'] : array() ),
			'user_ids'         => array_map( 'intval', isset( $access['user_ids'] ) ? (array) $access['user_ids'] : array() ),
			'action'           => (string) $row['action'],
			'redirect'         => (int) $row['redirect'],
			'custom_message'   => (bool) $row['custom_message'],
			'message'          => (string) $row['message'],
			'teaser'           => (string) $row['teaser'],
			'in_lists'         => (string) $row['in_lists'],
			'updated'          => memberglut_iso( $row['updated_at'] ),
		);
	}

	/**
	 * Client list with summaries.
	 *
	 * @param string $search Search.
	 * @return array[]
	 */
	public static function all_for_client( $search = '' ) {
		$rows = memberglut_repo( 'rules' )->query( array( 'search' => $search, 'orderby' => 'priority DESC, id ASC' ) );
		return array_map(
			static function ( $row ) {
				$r            = self::normalize( $row );
				$r['summary'] = array(
					'protect' => array_map( array( __CLASS__, 'target_summary' ), $r['protect'] ),
					'exclude' => array_map( array( __CLASS__, 'target_summary' ), $r['exclude'] ),
				);
				$r['access'] = array( 'who' => $r['who'], 'plans' => $r['plans'], 'roles' => $r['roles'] );
				return $r;
			},
			$rows
		);
	}

	/**
	 * One rule.
	 *
	 * @param int $id ID.
	 * @return array|null
	 */
	public static function get( $id ) {
		$row = memberglut_repo( 'rules' )->find( $id );
		return $row ? self::normalize( $row ) : null;
	}

	/**
	 * Human summary of a target.
	 *
	 * @param array $t Target.
	 * @return string
	 */
	public static function target_summary( $t ) {
		$type = isset( $t['type'] ) ? $t['type'] : '';
		switch ( $type ) {
			case 'site':
				return __( 'Whole site', 'memberglut' );
			case 'post_type':
				$pt = get_post_type_object( isset( $t['post_type'] ) ? $t['post_type'] : '' );
				/* translators: %s: post type */
				return sprintf( __( 'All %s', 'memberglut' ), $pt ? $pt->labels->name : ( isset( $t['post_type'] ) ? $t['post_type'] : '' ) );
			case 'pages':
			case 'posts':
			case 'children':
				$titles = array();
				foreach ( array_slice( (array) ( isset( $t['posts'] ) ? $t['posts'] : array() ), 0, 4 ) as $id ) {
					$titles[] = get_the_title( (int) $id );
				}
				$more = count( (array) ( isset( $t['posts'] ) ? $t['posts'] : array() ) ) - count( $titles );
				$list = implode( ', ', array_filter( $titles ) ) . ( $more > 0 ? ' +' . $more : '' );
				/* translators: %s: page titles */
				return 'children' === $type ? sprintf( __( 'Children of %s', 'memberglut' ), $list ) : $list;
			case 'taxonomy':
				$names = array();
				foreach ( (array) ( isset( $t['terms'] ) ? $t['terms'] : array() ) as $id ) {
					$term = get_term( (int) $id, isset( $t['taxonomy'] ) ? $t['taxonomy'] : '' );
					if ( $term && ! is_wp_error( $term ) ) {
						$names[] = $term->name;
					}
				}
				$tax = get_taxonomy( isset( $t['taxonomy'] ) ? $t['taxonomy'] : '' );
				return ( $tax ? $tax->labels->singular_name : '' ) . ': ' . implode( ', ', $names );
			case 'archive':
				return implode( ', ', array_map( array( __CLASS__, 'archive_label' ), (array) ( isset( $t['archives'] ) ? $t['archives'] : array() ) ) );
			case 'author':
				$names = array();
				foreach ( (array) ( isset( $t['authors'] ) ? $t['authors'] : array() ) as $id ) {
					$u = get_userdata( (int) $id );
					if ( $u ) {
						$names[] = $u->display_name;
					}
				}
				/* translators: %s: authors */
				return sprintf( __( 'Posts by %s', 'memberglut' ), implode( ', ', $names ) );
			case 'template':
				/* translators: %s: template */
				return sprintf( __( 'Template: %s', 'memberglut' ), isset( $t['template'] ) ? $t['template'] : '' );
			case 'url':
				return isset( $t['pattern'] ) ? $t['pattern'] : '';
		}
		return $type;
	}

	/**
	 * Archive label.
	 *
	 * @param string $a Archive key.
	 * @return string
	 */
	public static function archive_label( $a ) {
		$labels = array(
			'front'          => __( 'Front page', 'memberglut' ),
			'blog'           => __( 'Blog page', 'memberglut' ),
			'search'         => __( 'Search results', 'memberglut' ),
			'404'            => __( '404 page', 'memberglut' ),
			'author_archive' => __( 'Author archives', 'memberglut' ),
			'pt_archive'     => __( 'Post type archives', 'memberglut' ),
		);
		return isset( $labels[ $a ] ) ? $labels[ $a ] : $a;
	}

	/* ---------------------------------------------------------------------
	 * Saving
	 * ------------------------------------------------------------------ */

	/**
	 * Clean a target list.
	 *
	 * @param array  $list   Targets.
	 * @param string $field  Field name for errors.
	 * @param array  $errors Errors (by reference).
	 * @return array
	 */
	private static function clean_targets( $list, $field, &$errors ) {
		$out = array();
		foreach ( (array) $list as $i => $t ) {
			if ( ! is_array( $t ) || empty( $t['type'] ) || ! in_array( $t['type'], self::TARGETS, true ) ) {
				continue;
			}
			$c = array( 'type' => $t['type'] );
			switch ( $t['type'] ) {
				case 'post_type':
					$c['post_type'] = sanitize_key( isset( $t['post_type'] ) ? $t['post_type'] : '' );
					if ( ! post_type_exists( $c['post_type'] ) ) {
						$errors[ $field ] = __( 'Choose a post type for every “All of a post type” item.', 'memberglut' );
					}
					break;
				case 'pages':
				case 'posts':
				case 'children':
					$c['posts'] = array_values( array_filter( array_map( 'absint', (array) ( isset( $t['posts'] ) ? $t['posts'] : array() ) ) ) );
					if ( ! $c['posts'] ) {
						$errors[ $field ] = __( 'Choose at least one page or post for every item.', 'memberglut' );
					}
					break;
				case 'taxonomy':
					$c['taxonomy'] = sanitize_key( isset( $t['taxonomy'] ) ? $t['taxonomy'] : 'category' );
					$c['terms']    = array_values( array_filter( array_map( 'absint', (array) ( isset( $t['terms'] ) ? $t['terms'] : array() ) ) ) );
					if ( ! taxonomy_exists( $c['taxonomy'] ) || ! $c['terms'] ) {
						$errors[ $field ] = __( 'Choose the categories or tags for every taxonomy item.', 'memberglut' );
					}
					break;
				case 'archive':
					$c['archives'] = array_values( array_intersect( (array) ( isset( $t['archives'] ) ? $t['archives'] : array() ), self::ARCHIVES ) );
					if ( ! $c['archives'] ) {
						$errors[ $field ] = __( 'Choose at least one archive or special page.', 'memberglut' );
					}
					break;
				case 'author':
					$c['authors'] = array_values( array_filter( array_map( 'absint', (array) ( isset( $t['authors'] ) ? $t['authors'] : array() ) ) ) );
					if ( ! $c['authors'] ) {
						$errors[ $field ] = __( 'Choose at least one author.', 'memberglut' );
					}
					break;
				case 'template':
					$c['template'] = sanitize_text_field( isset( $t['template'] ) ? $t['template'] : '' );
					if ( '' === $c['template'] ) {
						$errors[ $field ] = __( 'Choose a template.', 'memberglut' );
					}
					break;
				case 'url':
					$c['pattern'] = trim( sanitize_text_field( isset( $t['pattern'] ) ? $t['pattern'] : '' ) );
					if ( '' === $c['pattern'] ) {
						$errors[ $field ] = __( 'Enter a URL pattern.', 'memberglut' );
					} elseif ( 0 === strpos( $c['pattern'], '^' ) && false === @preg_match( '#' . str_replace( '#', '\#', $c['pattern'] ) . '#', '' ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged -- Validating an admin-supplied regex.
						$errors[ $field ] = __( 'The regular expression is not valid.', 'memberglut' );
					}
					break;
			}
			$out[] = $c;
		}
		return $out;
	}

	/**
	 * Validate and save.
	 *
	 * @param array $d Client data (with id to update).
	 * @return array|WP_Error Rule.
	 */
	public static function save( $d ) {
		$id       = isset( $d['id'] ) ? (int) $d['id'] : 0;
		$existing = $id ? self::get( $id ) : null;
		if ( $id && ! $existing ) {
			return new WP_Error( 'memberglut_not_found', __( 'Rule not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		$errors  = array();
		$title   = sanitize_text_field( isset( $d['title'] ) ? $d['title'] : '' );
		$protect = self::clean_targets( isset( $d['protect'] ) ? $d['protect'] : array(), 'protect', $errors );
		$exclude = self::clean_targets( isset( $d['exclude'] ) ? $d['exclude'] : array(), 'exclude', $errors );
		if ( '' === $title ) {
			$errors['title'] = __( 'Give the rule a name.', 'memberglut' );
		}
		if ( ! $protect && empty( $errors['protect'] ) ) {
			$errors['protect'] = __( 'Choose the content to protect.', 'memberglut' );
		}
		$who = isset( $d['who'] ) && in_array( $d['who'], array( 'plans', 'roles', 'logged_in', 'logged_out' ), true ) ? $d['who'] : 'plans';
		$plans = array_values( array_filter( array_map( 'intval', (array) ( isset( $d['plans'] ) ? $d['plans'] : array() ) ), array( 'MemberGlut_Plans', 'get' ) ) );
		$roles = array_values( array_filter( array_map( 'sanitize_key', (array) ( isset( $d['roles'] ) ? $d['roles'] : array() ) ), 'get_role' ) );
		if ( 'plans' === $who && ! $plans ) {
			$errors['plans'] = __( 'Choose the plans that can see this content.', 'memberglut' );
		}
		if ( 'roles' === $who && ! $roles ) {
			$errors['roles'] = __( 'Choose the roles that can see this content.', 'memberglut' );
		}
		$usernames = array();
		$user_ids  = array();
		foreach ( (array) ( isset( $d['users'] ) ? $d['users'] : array() ) as $name ) {
			$name = sanitize_user( (string) $name, true );
			$u    = $name ? ( get_user_by( 'login', $name ) ? get_user_by( 'login', $name ) : get_user_by( 'email', $name ) ) : null;
			if ( $u ) {
				$usernames[] = $u->user_login;
				$user_ids[]  = (int) $u->ID;
			} elseif ( $name ) {
				/* translators: %s: username */
				$errors['users'] = sprintf( __( 'No user called “%s”.', 'memberglut' ), $name );
			}
		}
		$action = isset( $d['action'] ) && in_array( $d['action'], array( 'inherit', 'message', 'login', 'redirect', 'pricing' ), true ) ? $d['action'] : 'inherit';
		$redirect = isset( $d['redirect'] ) ? absint( $d['redirect'] ) : 0;
		if ( 'redirect' === $action && ! $redirect ) {
			$errors['redirect'] = __( 'Choose the page to redirect to.', 'memberglut' );
		}
		if ( $errors ) {
			return new WP_Error( 'memberglut_invalid_rule', __( 'Please fix the highlighted fields.', 'memberglut' ), array( 'status' => 400, 'fields' => $errors ) );
		}
		$data = array(
			'title'            => $title,
			'status'           => isset( $d['status'] ) && 'inactive' === $d['status'] ? 'inactive' : 'active',
			'priority'         => max( 0, min( 999, isset( $d['priority'] ) ? (int) $d['priority'] : 10 ) ),
			'note'             => sanitize_textarea_field( isset( $d['note'] ) ? $d['note'] : '' ),
			'protect'          => $protect,
			'exclude'          => $exclude,
			'include_children' => ! empty( $d['include_children'] ),
			'access'           => array( 'who' => $who, 'plans' => $plans, 'roles' => $roles, 'users' => $usernames, 'user_ids' => $user_ids ),
			'action'           => $action,
			'redirect'         => $redirect,
			'custom_message'   => ! empty( $d['custom_message'] ),
			'message'          => wp_kses_post( isset( $d['message'] ) ? $d['message'] : '' ),
			'teaser'           => isset( $d['teaser'] ) && in_array( $d['teaser'], array( 'inherit', 'none', 'excerpt', 'fade' ), true ) ? $d['teaser'] : 'inherit',
			'in_lists'         => isset( $d['in_lists'] ) && in_array( $d['in_lists'], array( 'inherit', 'show_excerpt', 'hide', 'show' ), true ) ? $d['in_lists'] : 'inherit',
		);
		if ( $existing ) {
			memberglut_repo( 'rules' )->update( $id, $data );
		} else {
			$id = memberglut_repo( 'rules' )->insert( $data );
		}
		self::flush();
		$rule = self::get( $id );
		memberglut_event( $existing ? 'rule_updated' : 'rule_created', sprintf( /* translators: %s: rule */ $existing ? __( 'Rule “%s” updated', 'memberglut' ) : __( 'Rule “%s” created', 'memberglut' ), $rule['title'] ), array( 'object_type' => 'rule', 'object_id' => $id ) );
		do_action( 'memberglut_rule_saved', $rule, $existing );
		return $rule;
	}

	/**
	 * Delete.
	 *
	 * @param int $id ID.
	 * @return true|WP_Error
	 */
	public static function delete( $id ) {
		$rule = self::get( $id );
		if ( ! $rule ) {
			return new WP_Error( 'memberglut_not_found', __( 'Rule not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		memberglut_repo( 'rules' )->delete( $id );
		self::flush();
		/* translators: %s: rule */
		memberglut_event( 'rule_deleted', sprintf( __( 'Rule “%s” deleted', 'memberglut' ), $rule['title'] ), array( 'object_type' => 'rule', 'object_id' => $id ) );
		do_action( 'memberglut_rule_deleted', $rule );
		return true;
	}

	/**
	 * Duplicate as inactive.
	 *
	 * @param int $id ID.
	 * @return array|WP_Error
	 */
	public static function duplicate( $id ) {
		$rule = self::get( $id );
		if ( ! $rule ) {
			return new WP_Error( 'memberglut_not_found', __( 'Rule not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		unset( $rule['id'] );
		/* translators: %s: rule */
		$rule['title']  = sprintf( __( '%s (copy)', 'memberglut' ), $rule['title'] );
		$rule['status'] = 'inactive';
		return self::save( $rule );
	}

	/**
	 * Toggle status.
	 *
	 * @param int    $id     ID.
	 * @param string $status Status.
	 * @return array|WP_Error
	 */
	public static function set_status( $id, $status ) {
		if ( ! self::get( $id ) ) {
			return new WP_Error( 'memberglut_not_found', __( 'Rule not found.', 'memberglut' ), array( 'status' => 404 ) );
		}
		memberglut_repo( 'rules' )->update( $id, array( 'status' => 'active' === $status ? 'active' : 'inactive' ) );
		self::flush();
		return self::get( $id );
	}

	/* ---------------------------------------------------------------------
	 * Matching
	 * ------------------------------------------------------------------ */

	/**
	 * Pages that never get protected by the "Whole site" target (auth + joining pages, exceptions).
	 *
	 * @param bool $for_rule True for the rule target (adds pricing, account, thank-you so non-members can join).
	 * @return int[]
	 */
	public static function always_open_pages( $for_rule = false ) {
		$slots = $for_rule ? array( 'login', 'register', 'lost', 'pricing', 'account', 'thanks' ) : array( 'login', 'register', 'lost' );
		$ids   = array();
		foreach ( $slots as $slot ) {
			$id = memberglut_page_id( $slot );
			if ( $id ) {
				$ids[] = $id;
			}
		}
		$ids = array_merge( $ids, array_map( 'intval', (array) memberglut_setting( 'private_site_exceptions', array() ) ) );
		return array_values( array_unique( array_filter( apply_filters( 'memberglut_always_open_pages', $ids, $for_rule ) ) ) );
	}

	/**
	 * Whether a request path matches a URL pattern (glob with * or regex starting with ^).
	 *
	 * @param string $pattern Pattern.
	 * @param string $path    Request path (with leading slash, without the home path).
	 * @return bool
	 */
	public static function url_matches( $pattern, $path ) {
		$pattern = trim( (string) $pattern );
		if ( '' === $pattern ) {
			return false;
		}
		if ( 0 === strpos( $pattern, '^' ) ) {
			return (bool) @preg_match( '#' . str_replace( '#', '\#', $pattern ) . '#i', $path ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged -- Regex validated on save.
		}
		if ( preg_match( '#^https?://#i', $pattern ) ) {
			$pattern = (string) wp_parse_url( $pattern, PHP_URL_PATH );
		}
		$pattern = '/' . ltrim( $pattern, '/' );
		$regex   = '#^' . str_replace( '\*', '.*', preg_quote( $pattern, '#' ) ) . '$#i';
		return (bool) preg_match( $regex, $path ) || (bool) preg_match( $regex, trailingslashit( $path ) ) || (bool) preg_match( $regex, untrailingslashit( $path ) );
	}

	/**
	 * Path of a URL relative to the home path.
	 *
	 * @param string $url URL.
	 * @return string
	 */
	public static function path_of( $url ) {
		$path = (string) wp_parse_url( $url, PHP_URL_PATH );
		$home = (string) wp_parse_url( home_url( '/' ), PHP_URL_PATH );
		if ( $home && '/' !== $home && 0 === strpos( $path, rtrim( $home, '/' ) ) ) {
			$path = substr( $path, strlen( rtrim( $home, '/' ) ) );
		}
		return '/' . ltrim( $path, '/' );
	}

	/**
	 * Whether a target matches a post.
	 *
	 * @param array   $t        Target.
	 * @param WP_Post $post     Post.
	 * @param bool    $children Include child pages for pages targets.
	 * @return bool
	 */
	public static function target_matches_post( $t, $post, $children = true ) {
		switch ( $t['type'] ) {
			case 'site':
				return ! in_array( (int) $post->ID, self::always_open_pages( true ), true );
			case 'post_type':
				return $post->post_type === $t['post_type'];
			case 'pages':
			case 'posts':
				if ( in_array( (int) $post->ID, array_map( 'intval', $t['posts'] ), true ) ) {
					return true;
				}
				return $children && 'pages' === $t['type'] && array_intersect( array_map( 'intval', get_post_ancestors( $post ) ), array_map( 'intval', $t['posts'] ) );
			case 'children':
				return (bool) array_intersect( array_map( 'intval', get_post_ancestors( $post ) ), array_map( 'intval', $t['posts'] ) );
			case 'taxonomy':
				return is_object_in_taxonomy( $post->post_type, $t['taxonomy'] ) && has_term( array_map( 'intval', $t['terms'] ), $t['taxonomy'], $post );
			case 'archive':
				$front = (int) get_option( 'page_on_front' );
				$blog  = (int) get_option( 'page_for_posts' );
				return ( in_array( 'front', $t['archives'], true ) && $front && (int) $post->ID === $front ) || ( in_array( 'blog', $t['archives'], true ) && $blog && (int) $post->ID === $blog );
			case 'author':
				return in_array( (int) $post->post_author, array_map( 'intval', $t['authors'] ), true );
			case 'template':
				$slug = get_page_template_slug( $post );
				return $slug && $slug === $t['template'];
			case 'url':
				return self::url_matches( $t['pattern'], self::path_of( get_permalink( $post ) ) );
		}
		return false;
	}

	/**
	 * Whether a target matches a non-post request context.
	 *
	 * @param array $t   Target.
	 * @param array $ctx Context: kind (front|blog|search|404|author|pt_archive|term|other), post_type, taxonomy, term_id, author, path.
	 * @return bool
	 */
	public static function target_matches_context( $t, $ctx ) {
		switch ( $t['type'] ) {
			case 'site':
				return true;
			case 'post_type':
				return ( 'pt_archive' === $ctx['kind'] && $ctx['post_type'] === $t['post_type'] ) || ( 'blog' === $ctx['kind'] && 'post' === $t['post_type'] );
			case 'taxonomy':
				return 'term' === $ctx['kind'] && $ctx['taxonomy'] === $t['taxonomy'] && in_array( (int) $ctx['term_id'], array_map( 'intval', $t['terms'] ), true );
			case 'archive':
				$map = array( 'front' => 'front', 'blog' => 'blog', 'search' => 'search', '404' => '404', 'author_archive' => 'author', 'pt_archive' => 'pt_archive' );
				foreach ( $t['archives'] as $a ) {
					if ( isset( $map[ $a ] ) && $map[ $a ] === $ctx['kind'] ) {
						return true;
					}
				}
				return false;
			case 'author':
				return 'author' === $ctx['kind'] && in_array( (int) $ctx['author'], array_map( 'intval', $t['authors'] ), true );
			case 'url':
				return self::url_matches( $t['pattern'], $ctx['path'] );
		}
		return false;
	}

	/**
	 * First active rule matching a post.
	 *
	 * @param WP_Post $post Post.
	 * @return array|null
	 */
	public static function rule_for_post( $post ) {
		foreach ( self::active() as $rule ) {
			$hit = false;
			foreach ( $rule['protect'] as $t ) {
				if ( self::target_matches_post( $t, $post, $rule['include_children'] ) ) {
					$hit = true;
					break;
				}
			}
			if ( ! $hit ) {
				continue;
			}
			foreach ( $rule['exclude'] as $t ) {
				if ( self::target_matches_post( $t, $post, $rule['include_children'] ) ) {
					$hit = false;
					break;
				}
			}
			if ( $hit ) {
				return $rule;
			}
		}
		return null;
	}

	/**
	 * First active rule matching a request context.
	 *
	 * @param array $ctx Context.
	 * @return array|null
	 */
	public static function rule_for_context( $ctx ) {
		foreach ( self::active() as $rule ) {
			$hit = false;
			foreach ( $rule['protect'] as $t ) {
				if ( self::target_matches_context( $t, $ctx ) ) {
					$hit = true;
					break;
				}
			}
			if ( ! $hit ) {
				continue;
			}
			foreach ( $rule['exclude'] as $t ) {
				if ( self::target_matches_context( $t, $ctx ) ) {
					$hit = false;
					break;
				}
			}
			if ( $hit ) {
				return $rule;
			}
		}
		return null;
	}

	/* ---------------------------------------------------------------------
	 * Candidate post sets (for lists, REST queries and stats)
	 * ------------------------------------------------------------------ */

	/**
	 * Post IDs a rule may protect (before exceptions), cached. URL / archive / site targets have no post set.
	 *
	 * @param array $rule Rule.
	 * @return int[]
	 */
	public static function candidate_ids( $rule ) {
		$key    = 'memberglut_rule_ids_' . $rule['id'] . '_' . md5( wp_json_encode( array( $rule['protect'], $rule['include_children'], $rule['updated'], MemberGlut_Access_Cache::version() ) ) );
		$cached = get_transient( $key );
		if ( is_array( $cached ) ) {
			return $cached;
		}
		$ids   = array();
		$types = array_column( MemberGlut_Lookups::post_types(), 'value' );
		$base  = array( 'fields' => 'ids', 'posts_per_page' => 5000, 'post_status' => array( 'publish', 'private' ), 'no_found_rows' => true, 'suppress_filters' => true, 'memberglut_skip' => true );
		foreach ( $rule['protect'] as $t ) {
			switch ( $t['type'] ) {
				case 'post_type':
					$ids = array_merge( $ids, get_posts( $base + array( 'post_type' => $t['post_type'] ) ) );
					break;
				case 'pages':
				case 'posts':
					$ids = array_merge( $ids, array_map( 'intval', $t['posts'] ) );
					if ( 'pages' === $t['type'] && $rule['include_children'] ) {
						foreach ( $t['posts'] as $parent ) {
							$ids = array_merge( $ids, get_posts( $base + array( 'post_type' => 'any', 'post_parent__in' => array( (int) $parent ) ) ) );
						}
					}
					break;
				case 'children':
					foreach ( $t['posts'] as $parent ) {
						$ids = array_merge( $ids, wp_list_pluck( get_page_children( (int) $parent, get_pages( array( 'post_type' => get_post_type( (int) $parent ) ? get_post_type( (int) $parent ) : 'page' ) ) ), 'ID' ) );
					}
					break;
				case 'taxonomy':
					$ids = array_merge( $ids, get_posts( $base + array( 'post_type' => $types, 'tax_query' => array( array( 'taxonomy' => $t['taxonomy'], 'terms' => array_map( 'intval', $t['terms'] ) ) ) ) ) ); // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query -- Cached.
					break;
				case 'author':
					$ids = array_merge( $ids, get_posts( $base + array( 'post_type' => $types, 'author__in' => array_map( 'intval', $t['authors'] ) ) ) );
					break;
				case 'template':
					$ids = array_merge( $ids, get_posts( $base + array( 'post_type' => $types, 'meta_key' => '_wp_page_template', 'meta_value' => $t['template'] ) ) ); // phpcs:ignore WordPress.DB.SlowDBQuery -- Cached.
					break;
				case 'site':
					$ids = array_merge( $ids, get_posts( $base + array( 'post_type' => $types ) ) );
					break;
			}
		}
		$ids = array_values( array_unique( array_map( 'intval', $ids ) ) );
		set_transient( $key, $ids, DAY_IN_SECONDS );
		return $ids;
	}

	/**
	 * Posts with their own access settings (Locked one by one).
	 *
	 * @return int[]
	 */
	public static function per_post_ids() {
		$key    = 'memberglut_per_post_ids_' . md5( MemberGlut_Access_Cache::version() );
		$cached = get_transient( $key );
		if ( is_array( $cached ) ) {
			return $cached;
		}
		global $wpdb;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Cached in a transient.
		$ids = array_map( 'intval', $wpdb->get_col( "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = '_memberglut_access' AND meta_value NOT LIKE '%\"who\":\"inherit\"%'" ) );
		set_transient( $key, $ids, DAY_IN_SECONDS );
		return $ids;
	}
}
