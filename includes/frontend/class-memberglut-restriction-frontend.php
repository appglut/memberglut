<?php
/**
 * Enforces access decisions on the front end, in lists, the REST API, feeds and comments.
 *
 * Controlled by Global Settings › Content restriction (and General › Members-only site), overridable per rule
 * and per post (plans/phase-07-content-restriction.md §7.3).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Restriction_Frontend class.
 */
class MemberGlut_Restriction_Frontend {

	/**
	 * Decision for a full-page wall (archives, URL patterns) rendered by template_include.
	 *
	 * @var array|null
	 */
	private static $page_wall = null;

	/**
	 * Avoid recursion while computing hidden IDs.
	 *
	 * @var bool
	 */
	private static $computing = false;

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'template_redirect', array( __CLASS__, 'private_site' ), 0 );
		add_action( 'template_redirect', array( __CLASS__, 'guard_request' ), 2 );
		add_filter( 'template_include', array( __CLASS__, 'page_wall_template' ), 999 );
		add_filter( 'the_content', array( __CLASS__, 'filter_content' ), 999 );
		add_filter( 'get_the_excerpt', array( __CLASS__, 'filter_excerpt' ), 999, 2 );
		add_action( 'pre_get_posts', array( __CLASS__, 'filter_queries' ), 20 );
		add_filter( 'comments_open', array( __CLASS__, 'comments_open' ), 20, 2 );
		add_filter( 'pings_open', array( __CLASS__, 'comments_open' ), 20, 2 );
		add_filter( 'comments_array', array( __CLASS__, 'comments_array' ), 20, 2 );
		add_filter( 'the_content_feed', array( __CLASS__, 'filter_feed' ), 20 );
		add_filter( 'the_excerpt_rss', array( __CLASS__, 'filter_feed' ), 20 );
		add_action( 'do_feed', array( __CLASS__, 'private_feed' ), 0 );
		add_action( 'do_feed_rss2', array( __CLASS__, 'private_feed' ), 0 );
		add_action( 'do_feed_atom', array( __CLASS__, 'private_feed' ), 0 );
		add_action( 'do_feed_rdf', array( __CLASS__, 'private_feed' ), 0 );
		add_action( 'do_feed_rss', array( __CLASS__, 'private_feed' ), 0 );
		add_action( 'rest_api_init', array( __CLASS__, 'register_rest_filters' ), 99 );
		add_filter( 'wp_sitemaps_posts_query_args', array( __CLASS__, 'sitemap_args' ), 20 );
	}

	/* ---------------------------------------------------------------------
	 * Members-only site
	 * ------------------------------------------------------------------ */

	/**
	 * General › Members-only site: send visitors to the login page.
	 *
	 * @return void
	 */
	public static function private_site() {
		if ( ! memberglut_setting( 'private_site', false ) || is_user_logged_in() ) {
			return;
		}
		if ( self::is_always_open_request() ) {
			return;
		}
		if ( is_feed() ) {
			return; // Handled by private_feed().
		}
		$here  = MemberGlut_Access::current_url();
		$login = memberglut_page_url( 'login' );
		$to    = $login ? add_query_arg( 'redirect_to', rawurlencode( $here ), $login ) : wp_login_url( $here );
		MemberGlut_Cache::no_cache();
		wp_safe_redirect( $to );
		exit;
	}

	/**
	 * Whether the current request stays open on a members-only site.
	 *
	 * @return bool
	 */
	public static function is_always_open_request() {
		$id = is_singular() ? (int) get_queried_object_id() : 0;
		if ( $id && in_array( $id, MemberGlut_Rules::always_open_pages( false ), true ) ) {
			return true;
		}
		$path = MemberGlut_Access::current_context()['path'];
		foreach ( (array) memberglut_setting( 'private_site_paths', array() ) as $pattern ) {
			if ( MemberGlut_Rules::url_matches( $pattern, $path ) ) {
				return true;
			}
		}
		// Activation / email-change links must work for logged-out visitors.
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only check of a query arg name.
		if ( isset( $_GET['mg_activate'] ) || isset( $_GET['mg_confirm_email'] ) ) {
			return true;
		}
		$slug = memberglut_setting( 'custom_login_slug', '' );
		if ( $slug && MemberGlut_Rules::url_matches( '/' . $slug . '*', $path ) ) {
			return true;
		}
		return (bool) apply_filters( 'memberglut_is_always_open_request', false, $path );
	}

	/**
	 * Members-only feeds.
	 *
	 * @return void
	 */
	public static function private_feed() {
		if ( memberglut_setting( 'private_site', false ) && memberglut_setting( 'private_feed', false ) && ! is_user_logged_in() ) {
			status_header( 403 );
			nocache_headers();
			wp_die( esc_html__( 'This feed is only available to members.', 'memberglut' ), '', array( 'response' => 403 ) );
		}
	}

	/* ---------------------------------------------------------------------
	 * Singular and archive pages
	 * ------------------------------------------------------------------ */

	/**
	 * Redirect actions, and full-page walls for archives / URL patterns.
	 *
	 * @return void
	 */
	public static function guard_request() {
		if ( is_admin() || is_feed() || is_robots() || is_trackback() || is_embed() ) {
			return;
		}
		if ( is_singular() ) {
			$post = get_queried_object();
			if ( ! $post instanceof WP_Post ) {
				return;
			}
			$d = MemberGlut_Access::decide_post( $post );
			if ( $d['restricted'] ) {
				MemberGlut_Cache::no_cache();
			}
			if ( $d['allowed'] ) {
				return;
			}
			self::record_denial( $post->ID, $d );
			self::maybe_redirect( $d );
			return;
		}
		$d = MemberGlut_Access::decide_context( MemberGlut_Access::current_context() );
		if ( $d['allowed'] ) {
			return;
		}
		MemberGlut_Cache::no_cache();
		self::record_denial( 0, $d );
		self::maybe_redirect( $d );
		self::$page_wall = $d;
	}

	/**
	 * Redirect / pricing actions.
	 *
	 * @param array $d Decision.
	 * @return void
	 */
	private static function maybe_redirect( $d ) {
		$here = MemberGlut_Access::current_url();
		if ( 'redirect' === $d['action'] && $d['redirect'] ) {
			wp_safe_redirect( add_query_arg( 'redirect_to', rawurlencode( $here ), $d['redirect'] ) );
			exit;
		}
		if ( 'pricing' === $d['action'] ) {
			$pricing = memberglut_page_url( 'pricing' );
			if ( $pricing && untrailingslashit( strtok( $pricing, '?' ) ) !== untrailingslashit( strtok( $here, '?' ) ) ) {
				wp_safe_redirect( add_query_arg( 'redirect_to', rawurlencode( $here ), $pricing ) );
				exit;
			}
		}
	}

	/**
	 * Archive / URL wall template.
	 *
	 * @param string $template Template.
	 * @return string
	 */
	public static function page_wall_template( $template ) {
		if ( ! self::$page_wall ) {
			return $template;
		}
		$GLOBALS['memberglut_wall_html'] = MemberGlut_Access::render_denied( self::$page_wall, null );
		status_header( 403 );
		return memberglut_locate_template( 'restriction/page.php' );
	}

	/**
	 * Single content: teaser + message (+ login form) in place of the content; teaser in lists.
	 *
	 * @param string $content Content.
	 * @return string
	 */
	public static function filter_content( $content ) {
		if ( is_admin() || is_feed() || doing_filter( 'get_the_excerpt' ) ) {
			return $content;
		}
		$post = get_post();
		if ( ! $post ) {
			return $content;
		}
		$d = MemberGlut_Access::decide_post( $post );
		if ( $d['allowed'] ) {
			return $content;
		}
		if ( is_singular() && (int) get_queried_object_id() === (int) $post->ID ) {
			return MemberGlut_Access::render_denied( $d, $post );
		}
		// In lists: teaser with a link (Content restriction › Restricted posts in lists).
		return self::list_teaser( $post, $d );
	}

	/**
	 * Teaser shown for restricted posts in lists.
	 *
	 * @param WP_Post $post Post.
	 * @param array   $d    Decision.
	 * @return string
	 */
	private static function list_teaser( $post, $d ) {
		MemberGlut_Assets::need();
		$teaser = MemberGlut_Access::teaser( $post, 'none' === $d['teaser'] ? 'excerpt' : $d['teaser'] );
		return $teaser . '<p class="memberglut-locked-note"><a href="' . esc_url( get_permalink( $post ) ) . '">' . esc_html__( 'Members only — read more', 'memberglut' ) . '</a></p>';
	}

	/**
	 * Excerpts of restricted posts never show more than the teaser.
	 *
	 * @param string       $excerpt Excerpt.
	 * @param WP_Post|null $post    Post.
	 * @return string
	 */
	public static function filter_excerpt( $excerpt, $post = null ) {
		$post = get_post( $post );
		if ( ! $post || is_admin() ) {
			return $excerpt;
		}
		$d = MemberGlut_Access::decide_post( $post );
		if ( $d['allowed'] ) {
			return $excerpt;
		}
		return wp_trim_words( has_excerpt( $post ) ? $post->post_excerpt : wp_strip_all_tags( strip_shortcodes( excerpt_remove_blocks( $post->post_content ) ) ), min( 30, (int) memberglut_setting( 'teaser_words', 55 ) ), '…' );
	}

	/* ---------------------------------------------------------------------
	 * Lists, search, sitemaps
	 * ------------------------------------------------------------------ */

	/**
	 * IDs the current user must not see in lists (in_lists = hide), and in search when protect_search is on.
	 *
	 * @param bool $search For search results.
	 * @return int[]
	 */
	public static function hidden_ids( $search = false ) {
		$user_id = get_current_user_id();
		if ( memberglut_user_bypasses_restrictions( $user_id ) || self::$computing ) {
			return array();
		}
		$signature = $user_id ? wp_json_encode( array( MemberGlut_Subscription_Service::active_plan_ids( $user_id ), (array) wp_get_current_user()->roles, $user_id ) ) : 'guest';
		$version   = MemberGlut_Access_Cache::version();
		$key       = 'memberglut_hidden_' . md5( $signature . (int) $search . $version . memberglut_setting( 'hide_in_lists' ) . (int) memberglut_setting( 'protect_search' ) );
		$cached    = get_transient( $key );
		if ( is_array( $cached ) ) {
			return $cached;
		}
		self::$computing = true;
		$candidates      = MemberGlut_Rules::per_post_ids();
		foreach ( MemberGlut_Rules::active() as $rule ) {
			if ( MemberGlut_Access::user_passes( $rule, $user_id ) ) {
				continue; // The user may see everything this rule protects.
			}
			$candidates = array_merge( $candidates, MemberGlut_Rules::candidate_ids( $rule ) );
		}
		$hidden = array();
		foreach ( array_unique( $candidates ) as $id ) {
			$d = MemberGlut_Access::decide_post( $id, $user_id );
			if ( $d['allowed'] ) {
				continue;
			}
			if ( 'hide' === $d['in_lists'] || ( $search && memberglut_setting( 'protect_search', false ) ) ) {
				$hidden[] = (int) $id;
			}
		}
		self::$computing = false;
		set_transient( $key, $hidden, HOUR_IN_SECONDS );
		return $hidden;
	}

	/**
	 * Remove hidden posts from front-end queries (blog, archives, search, widgets, query blocks).
	 *
	 * @param WP_Query $q Query.
	 * @return void
	 */
	public static function filter_queries( $q ) {
		if ( is_admin() || $q->get( 'memberglut_skip' ) || $q->is_singular() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) || self::$computing ) {
			return;
		}
		$pt = $q->get( 'post_type' );
		if ( in_array( $pt, array( 'nav_menu_item', 'wp_template', 'wp_template_part', 'wp_navigation', 'wp_global_styles', 'revision' ), true ) ) {
			return;
		}
		$hidden = self::hidden_ids( $q->is_search() );
		if ( ! $hidden ) {
			return;
		}
		$not_in = array_map( 'intval', (array) $q->get( 'post__not_in' ) );
		$q->set( 'post__not_in', array_values( array_unique( array_merge( $not_in, $hidden ) ) ) );
	}

	/**
	 * Keep hidden posts out of the XML sitemaps.
	 *
	 * @param array $args Query args.
	 * @return array
	 */
	public static function sitemap_args( $args ) {
		$hidden = self::hidden_ids();
		if ( $hidden ) {
			$args['post__not_in'] = array_merge( isset( $args['post__not_in'] ) ? (array) $args['post__not_in'] : array(), $hidden );
		}
		return $args;
	}

	/* ---------------------------------------------------------------------
	 * REST API
	 * ------------------------------------------------------------------ */

	/**
	 * Filters for every public post type.
	 *
	 * @return void
	 */
	public static function register_rest_filters() {
		if ( ! memberglut_setting( 'protect_rest', true ) ) {
			return;
		}
		foreach ( get_post_types( array( 'show_in_rest' => true, 'public' => true ) ) as $pt ) {
			if ( 'attachment' === $pt ) {
				continue;
			}
			add_filter( 'rest_prepare_' . $pt, array( __CLASS__, 'rest_prepare' ), 20, 3 );
			add_filter( 'rest_' . $pt . '_query', array( __CLASS__, 'rest_query' ), 20, 2 );
		}
	}

	/**
	 * Replace the content of restricted posts in REST responses (unless the user may edit the post).
	 *
	 * @param WP_REST_Response $response Response.
	 * @param WP_Post          $post     Post.
	 * @param WP_REST_Request  $request  Request.
	 * @return WP_REST_Response
	 */
	public static function rest_prepare( $response, $post, $request ) {
		if ( 'edit' === $request->get_param( 'context' ) && current_user_can( 'edit_post', $post->ID ) ) {
			return $response;
		}
		$d = MemberGlut_Access::decide_post( $post );
		if ( $d['allowed'] ) {
			return $response;
		}
		$data = $response->get_data();
		$teaser = MemberGlut_Access::teaser( $post, 'none' === $d['teaser'] ? 'none' : $d['teaser'] );
		if ( isset( $data['content'] ) ) {
			$data['content']['rendered']  = $teaser . MemberGlut_Access::message_html( $d['message'], $d, $post );
			$data['content']['protected'] = true;
			unset( $data['content']['raw'] );
		}
		if ( isset( $data['excerpt'] ) ) {
			$data['excerpt']['rendered'] = $teaser;
			unset( $data['excerpt']['raw'] );
		}
		$data['memberglut_restricted'] = true;
		$response->set_data( $data );
		return $response;
	}

	/**
	 * Hidden posts are also left out of REST collections.
	 *
	 * @param array           $args    Query args.
	 * @param WP_REST_Request $request Request.
	 * @return array
	 */
	public static function rest_query( $args, $request ) {
		if ( 'edit' === $request->get_param( 'context' ) && current_user_can( 'edit_posts' ) ) {
			return $args;
		}
		$hidden = self::hidden_ids();
		if ( $hidden ) {
			$args['post__not_in'] = array_merge( isset( $args['post__not_in'] ) ? (array) $args['post__not_in'] : array(), $hidden );
		}
		return $args;
	}

	/* ---------------------------------------------------------------------
	 * Feeds & comments
	 * ------------------------------------------------------------------ */

	/**
	 * Feeds show only the teaser of restricted posts.
	 *
	 * @param string $content Content.
	 * @return string
	 */
	public static function filter_feed( $content ) {
		if ( ! memberglut_setting( 'protect_feed', true ) ) {
			return $content;
		}
		$post = get_post();
		if ( ! $post ) {
			return $content;
		}
		$d = MemberGlut_Access::decide_post( $post );
		if ( $d['allowed'] ) {
			return $content;
		}
		$text = wp_trim_words( wp_strip_all_tags( strip_shortcodes( excerpt_remove_blocks( $post->post_content ) ) ), (int) memberglut_setting( 'teaser_words', 55 ), '…' );
		return '<p>' . esc_html( $text ) . '</p><p><a href="' . esc_url( get_permalink( $post ) ) . '">' . esc_html__( 'Members only — read more', 'memberglut' ) . '</a></p>';
	}

	/**
	 * Close comments on locked posts, and for non-members when “Only members can comment” is on.
	 *
	 * @param bool $open    Open.
	 * @param int  $post_id Post.
	 * @return bool
	 */
	public static function comments_open( $open, $post_id ) {
		if ( ! $open || memberglut_user_bypasses_restrictions() ) {
			return $open;
		}
		if ( memberglut_setting( 'restrict_comments', true ) && ! MemberGlut_Access::decide_post( $post_id )['allowed'] ) {
			return false;
		}
		if ( memberglut_setting( 'members_only_comments', false ) && ! MemberGlut_Subscription_Service::is_member( get_current_user_id() ) ) {
			return false;
		}
		return $open;
	}

	/**
	 * Hide the comments of locked posts.
	 *
	 * @param array $comments Comments.
	 * @param int   $post_id  Post.
	 * @return array
	 */
	public static function comments_array( $comments, $post_id ) {
		if ( memberglut_setting( 'restrict_comments', true ) && ! memberglut_user_bypasses_restrictions() && ! MemberGlut_Access::decide_post( $post_id )['allowed'] ) {
			return array();
		}
		return $comments;
	}

	/* ---------------------------------------------------------------------
	 * Paywall statistics
	 * ------------------------------------------------------------------ */

	/**
	 * Count a paywall view (once per visitor, post and day) and remember it for conversion tracking.
	 *
	 * @param int   $post_id Post (0 for archives).
	 * @param array $d       Decision.
	 * @return void
	 */
	private static function record_denial( $post_id, $d ) {
		do_action( 'memberglut_access_denied', $post_id, $d );
		if ( MemberGlut_Stats::is_bot() ) {
			return;
		}
		$seen_key = 'mg_pw_' . $post_id . '_' . gmdate( 'Ymd' );
		if ( empty( $_COOKIE[ $seen_key ] ) ) {
			MemberGlut_Stats::increment( 'paywall_views', $d['rule_id'] );
			if ( ! headers_sent() ) {
				setcookie( $seen_key, '1', time() + DAY_IN_SECONDS, COOKIEPATH ? COOKIEPATH : '/', COOKIE_DOMAIN, is_ssl(), true );
			}
		}
		if ( ! headers_sent() ) {
			setcookie( 'mg_paywall', wp_json_encode( array( 'p' => (int) $post_id, 'r' => (int) $d['rule_id'], 't' => time() ) ), time() + 30 * DAY_IN_SECONDS, COOKIEPATH ? COOKIEPATH : '/', COOKIE_DOMAIN, is_ssl(), true );
		}
	}
}
