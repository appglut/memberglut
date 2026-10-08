<?php
/**
 * Access decision engine (plans/01-dependency-map.md §2.8).
 *
 * Order: administrators → per-post settings (win over rules) → highest-priority matching rule → public.
 * What a denied visitor sees is resolved field by field: per-post override → rule → Global Settings.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Access class.
 */
class MemberGlut_Access {

	const META = '_memberglut_access';

	/**
	 * Per-request decision cache.
	 *
	 * @var array
	 */
	private static $cache = array();

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'memberglut_user_roles_synced', array( __CLASS__, 'flush' ) );
		add_action( 'memberglut_subscription_status_changed', array( __CLASS__, 'flush' ) );
	}

	/**
	 * Forget cached decisions.
	 *
	 * @return void
	 */
	public static function flush() {
		self::$cache = array();
	}

	/**
	 * Per-post access settings (normalized), or null when the post follows the rules.
	 *
	 * @param int $post_id Post.
	 * @return array|null
	 */
	public static function post_settings( $post_id ) {
		$raw = get_post_meta( $post_id, self::META, true );
		$a   = is_array( $raw ) ? $raw : json_decode( (string) $raw, true );
		if ( ! is_array( $a ) || empty( $a['who'] ) || 'inherit' === $a['who'] ) {
			return null;
		}
		return wp_parse_args(
			$a,
			array(
				'who'            => 'inherit',
				'plans'          => array(),
				'roles'          => array(),
				'action'         => 'inherit',
				'redirect_url'   => '',
				'msg_logged_out' => '',
				'msg_logged_in'  => '',
				'teaser'         => 'inherit',
				'in_lists'       => 'inherit',
				'hide_in_menus'  => false,
			)
		);
	}

	/**
	 * Whether a user passes a "who can access" definition.
	 *
	 * @param array $who     who, plans, roles, user_ids.
	 * @param int   $user_id User (0 = visitor).
	 * @return bool
	 */
	public static function user_passes( $who, $user_id ) {
		if ( $user_id && ! empty( $who['user_ids'] ) && in_array( (int) $user_id, array_map( 'intval', $who['user_ids'] ), true ) && 'logged_out' !== $who['who'] ) {
			return true;
		}
		switch ( $who['who'] ) {
			case 'everyone':
				return true;
			case 'logged_in':
				return $user_id > 0;
			case 'logged_out':
				return 0 === (int) $user_id;
			case 'roles':
				if ( ! $user_id ) {
					return false;
				}
				$user = get_userdata( $user_id );
				return $user && array_intersect( (array) $user->roles, (array) $who['roles'] );
			case 'plans':
				if ( ! $user_id ) {
					return false;
				}
				$plans = MemberGlut_Subscription_Service::active_plan_ids( $user_id );
				// Access while retrying = Keep access: on-hold members keep their plans.
				if ( 'active' === memberglut_setting( 'retry_status', 'on_hold' ) ) {
					foreach ( MemberGlut_Subscription_Service::for_user( $user_id ) as $sub ) {
						if ( 'on_hold' === $sub['status'] ) {
							$plans[] = (int) $sub['plan_id'];
						}
					}
				}
				return (bool) array_intersect( array_map( 'intval', (array) $who['plans'] ), $plans );
		}
		// Add-on conditions (memberglut_rule_conditions).
		return (bool) apply_filters( 'memberglut_user_passes_condition', false, $who, (int) $user_id );
	}

	/**
	 * Decision for a post.
	 *
	 * @param int|WP_Post $post    Post.
	 * @param int|null    $user_id User (null = current).
	 * @return array
	 */
	public static function decide_post( $post, $user_id = null ) {
		$post    = get_post( $post );
		$user_id = null === $user_id ? get_current_user_id() : (int) $user_id;
		if ( ! $post ) {
			return self::allow();
		}
		$key = $post->ID . ':' . $user_id . ':' . ( null === MemberGlut_Rules::$override ? '' : 'o' );
		if ( isset( self::$cache[ $key ] ) ) {
			return self::$cache[ $key ];
		}
		$decision = self::compute_post( $post, $user_id );
		$decision = apply_filters( 'memberglut_access_decision', $decision, $post, $user_id );
		self::$cache[ $key ] = $decision;
		return $decision;
	}

	/**
	 * Compute a post decision.
	 *
	 * @param WP_Post $post    Post.
	 * @param int     $user_id User.
	 * @return array
	 */
	private static function compute_post( $post, $user_id ) {
		if ( memberglut_user_bypasses_restrictions( $user_id ) ) {
			$d                  = self::allow();
			$d['bypass']        = true;
			$d['restricted']    = (bool) ( self::post_settings( $post->ID ) || MemberGlut_Rules::rule_for_post( $post ) );
			return $d;
		}
		$own = self::post_settings( $post->ID );
		if ( $own ) {
			if ( 'everyone' === $own['who'] ) {
				return self::allow();
			}
			$allowed = self::user_passes( $own, $user_id );
			return self::build( $allowed, 'post', null, $own, $own, $user_id );
		}
		$rule = MemberGlut_Rules::rule_for_post( $post );
		if ( $rule ) {
			return self::build( self::user_passes( $rule, $user_id ), 'rule', $rule, null, $rule, $user_id );
		}
		return self::allow();
	}

	/**
	 * Decision for a non-post request context (archives, search, 404, URL patterns).
	 *
	 * @param array    $ctx     Context (see MemberGlut_Rules::target_matches_context()).
	 * @param int|null $user_id User.
	 * @return array
	 */
	public static function decide_context( $ctx, $user_id = null ) {
		$user_id = null === $user_id ? get_current_user_id() : (int) $user_id;
		if ( memberglut_user_bypasses_restrictions( $user_id ) ) {
			return self::allow();
		}
		$rule = MemberGlut_Rules::rule_for_context( $ctx );
		if ( ! $rule ) {
			return self::allow();
		}
		return apply_filters( 'memberglut_access_decision', self::build( self::user_passes( $rule, $user_id ), 'rule', $rule, null, $rule, $user_id ), null, $user_id );
	}

	/**
	 * "Allowed, nothing protects it".
	 *
	 * @return array
	 */
	private static function allow() {
		return array(
			'allowed'    => true,
			'restricted' => false,
			'source'     => 'none',
			'rule_id'    => 0,
			'rule_title' => '',
		);
	}

	/**
	 * Resolve the full decision.
	 *
	 * @param bool       $allowed  Allowed.
	 * @param string     $source   post|rule.
	 * @param array|null $rule     Rule.
	 * @param array|null $own      Per-post settings.
	 * @param array      $who      Who definition (for {plans}).
	 * @param int        $user_id  User.
	 * @return array
	 */
	private static function build( $allowed, $source, $rule, $own, $who, $user_id ) {
		$d = array(
			'allowed'    => (bool) $allowed,
			'restricted' => true,
			'source'     => $source,
			'rule_id'    => $rule ? (int) $rule['id'] : 0,
			'rule_title' => $rule ? $rule['title'] : '',
			'plans'      => 'plans' === $who['who'] ? array_map( 'intval', (array) $who['plans'] ) : array(),
			'who'        => $who['who'],
		);
		if ( $allowed ) {
			return $d;
		}
		// Action: per post → rule → global.
		$action = $own && 'inherit' !== $own['action'] ? $own['action'] : ( $rule && 'inherit' !== $rule['action'] ? $rule['action'] : memberglut_setting( 'restrict_action', 'message' ) );
		// Logged-out-only content: visitors that are logged in simply get the message.
		$d['action'] = $action;

		$redirect = '';
		if ( 'redirect' === $action ) {
			if ( $own && $own['redirect_url'] ) {
				$redirect = $own['redirect_url'];
			} elseif ( $rule && $rule['redirect'] ) {
				$redirect = get_permalink( $rule['redirect'] );
			}
			if ( ! $redirect ) {
				$redirect = memberglut_setting( 'restrict_redirect_url', '' );
			}
			if ( ! $redirect ) {
				$d['action'] = 'message';
			}
		}
		$d['redirect'] = $redirect;

		// Message.
		$logged_in = $user_id > 0;
		$message   = '';
		if ( $own ) {
			$message = $logged_in ? $own['msg_logged_in'] : $own['msg_logged_out'];
		}
		if ( ! $message && $rule && $rule['custom_message'] && $rule['message'] ) {
			$message = $rule['message'];
		}
		if ( ! $message ) {
			$message = $logged_in ? memberglut_setting( 'msg_logged_in' ) : memberglut_setting( 'msg_logged_out' );
		}
		if ( 'logged_out' === $who['who'] && $logged_in ) {
			$message = '<p>' . esc_html__( 'This content is only for visitors who are not logged in.', 'memberglut' ) . '</p>';
		}
		$d['message'] = $message;

		$teaser          = $own && 'inherit' !== $own['teaser'] ? $own['teaser'] : ( $rule && 'inherit' !== $rule['teaser'] ? $rule['teaser'] : memberglut_setting( 'teaser', 'excerpt' ) );
		$d['teaser']     = in_array( $action, array( 'redirect', 'pricing' ), true ) ? 'none' : $teaser;
		$d['in_lists']   = $own && 'inherit' !== $own['in_lists'] ? $own['in_lists'] : ( $rule && 'inherit' !== $rule['in_lists'] ? $rule['in_lists'] : memberglut_setting( 'hide_in_lists', 'show_excerpt' ) );
		$d['hide_menus'] = $own ? ! empty( $own['hide_in_menus'] ) : false;
		return $d;
	}

	/**
	 * Request context of the current main query (for non-singular views).
	 *
	 * @param WP_Query|null $q    Query (default main query).
	 * @param string        $path Request path (default current).
	 * @return array
	 */
	public static function current_context( $q = null, $path = null ) {
		global $wp_query;
		$q    = $q ? $q : $wp_query;
		$ctx  = array( 'kind' => 'other', 'post_type' => '', 'taxonomy' => '', 'term_id' => 0, 'author' => 0, 'path' => '/' );
		if ( null === $path ) {
			$uri  = isset( $_SERVER['REQUEST_URI'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '/';
			$path = MemberGlut_Rules::path_of( home_url( $uri ) );
		}
		$ctx['path'] = $path;
		if ( ! $q ) {
			return $ctx;
		}
		if ( $q->is_front_page() ) {
			$ctx['kind'] = 'front';
		} elseif ( $q->is_home() ) {
			$ctx['kind'] = 'blog';
		} elseif ( $q->is_search() ) {
			$ctx['kind'] = 'search';
		} elseif ( $q->is_404() ) {
			$ctx['kind'] = '404';
		} elseif ( $q->is_author() ) {
			$ctx['kind']   = 'author';
			$ctx['author'] = (int) $q->get( 'author' );
			if ( ! $ctx['author'] && $q->get_queried_object() instanceof WP_User ) {
				$ctx['author'] = (int) $q->get_queried_object()->ID;
			}
		} elseif ( $q->is_post_type_archive() ) {
			$ctx['kind']      = 'pt_archive';
			$pt               = $q->get( 'post_type' );
			$ctx['post_type'] = is_array( $pt ) ? reset( $pt ) : $pt;
		} elseif ( $q->is_category() || $q->is_tag() || $q->is_tax() ) {
			$term = $q->get_queried_object();
			if ( $term instanceof WP_Term ) {
				$ctx['kind']     = 'term';
				$ctx['taxonomy'] = $term->taxonomy;
				$ctx['term_id']  = (int) $term->term_id;
			}
		}
		return $ctx;
	}

	/**
	 * Teaser of a post.
	 *
	 * @param WP_Post $post  Post.
	 * @param string  $style none|excerpt|fade.
	 * @return string HTML.
	 */
	public static function teaser( $post, $style ) {
		if ( 'none' === $style || ! $post ) {
			return '';
		}
		$words = (int) memberglut_setting( 'teaser_words', 55 );
		$text  = has_excerpt( $post ) ? $post->post_excerpt : wp_strip_all_tags( strip_shortcodes( excerpt_remove_blocks( $post->post_content ) ) );
		$text  = wp_trim_words( $text, $words, '…' );
		if ( '' === trim( $text ) ) {
			return '';
		}
		$html = '<div class="memberglut-teaser' . ( 'fade' === $style ? ' is-fade' : '' ) . '"><p>' . esc_html( $text ) . '</p></div>';
		return (string) apply_filters( 'memberglut_teaser', $html, $post, $style );
	}

	/**
	 * Replace message tags.
	 *
	 * @param string       $message  Message HTML.
	 * @param array        $decision Decision.
	 * @param WP_Post|null $post     Post.
	 * @return string
	 */
	public static function message_html( $message, $decision, $post = null ) {
		$here     = self::current_url();
		$login    = memberglut_page_url( 'login' ) ? add_query_arg( 'redirect_to', rawurlencode( $here ), memberglut_page_url( 'login' ) ) : wp_login_url( $here );
		$register = memberglut_page_url( 'register' ) ? add_query_arg( 'redirect_to', rawurlencode( $here ), memberglut_page_url( 'register' ) ) : wp_registration_url();
		$pricing  = memberglut_page_url( 'pricing' ) ? add_query_arg( 'redirect_to', rawurlencode( $here ), memberglut_page_url( 'pricing' ) ) : $register;
		$names    = array();
		foreach ( (array) ( isset( $decision['plans'] ) ? $decision['plans'] : array() ) as $id ) {
			$p = MemberGlut_Plans::get( $id );
			if ( $p && 'active' === $p['status'] ) {
				$names[] = $p['name'];
			}
		}
		$tags = array(
			'{login_link}'    => '<a href="' . esc_url( $login ) . '">' . esc_html__( 'Log in', 'memberglut' ) . '</a>',
			'{register_link}' => memberglut_setting( 'allow_registration', true ) ? '<a href="' . esc_url( $register ) . '">' . esc_html__( 'join now', 'memberglut' ) . '</a>' : '',
			'{pricing_link}'  => '<a href="' . esc_url( $pricing ) . '">' . esc_html__( 'See the plans', 'memberglut' ) . '</a>',
			'{post_title}'    => $post ? esc_html( get_the_title( $post ) ) : '',
			'{plans}'         => esc_html( implode( ', ', $names ) ),
			'{login_url}'     => esc_url( $login ),
			'{register_url}'  => esc_url( $register ),
			'{pricing_url}'   => esc_url( $pricing ),
		);
		$html = strtr( (string) $message, $tags );
		return (string) apply_filters( 'memberglut_restriction_message', wp_kses_post( $html ), $post ? $post->ID : 0, $decision );
	}

	/**
	 * Current URL.
	 *
	 * @return string
	 */
	public static function current_url() {
		$uri = isset( $_SERVER['REQUEST_URI'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '/';
		return home_url( $uri );
	}

	/**
	 * Full restriction box (teaser + message [+ login form]).
	 *
	 * @param array        $decision Decision.
	 * @param WP_Post|null $post     Post.
	 * @return string
	 */
	public static function render_denied( $decision, $post = null ) {
		MemberGlut_Assets::need();
		$teaser = $post ? self::teaser( $post, $decision['teaser'] ) : '';
		$form   = '';
		if ( 'login' === $decision['action'] && ! is_user_logged_in() ) {
			$form = class_exists( 'MemberGlut_Shortcodes' ) && method_exists( 'MemberGlut_Shortcodes', 'login' ) ? MemberGlut_Shortcodes::login( array( 'redirect' => self::current_url(), 'title' => '' ) ) : wp_login_form( array( 'echo' => false, 'redirect' => self::current_url() ) );
		}
		return memberglut_get_template(
			'restriction/message.php',
			array(
				'teaser'   => $teaser,
				'message'  => self::message_html( $decision['message'], $decision, $post ),
				'form'     => $form,
				'decision' => $decision,
				'post'     => $post,
			)
		);
	}
}
