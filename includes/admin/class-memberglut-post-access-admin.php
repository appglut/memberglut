<?php
/**
 * Per-post access settings ("MemberGlut box"): block editor panel, classic meta box, post list column.
 * Per-post settings win over rules (plans/01-dependency-map.md §2.8).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Post_Access_Admin class.
 */
class MemberGlut_Post_Access_Admin {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'init', array( __CLASS__, 'register_meta' ), 20 );
		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'editor_assets' ) );
		add_action( 'add_meta_boxes', array( __CLASS__, 'meta_boxes' ) );
		add_action( 'save_post', array( __CLASS__, 'save_meta_box' ), 10, 2 );
		add_action( 'updated_post_meta', array( __CLASS__, 'meta_changed' ), 10, 3 );
		add_action( 'added_post_meta', array( __CLASS__, 'meta_changed' ), 10, 3 );
		add_action( 'deleted_post_meta', array( __CLASS__, 'meta_changed' ), 10, 3 );
		add_action( 'save_post', array( __CLASS__, 'post_saved' ), 20 );
		add_action( 'set_object_terms', array( 'MemberGlut_Access_Cache', 'bump' ) );
		add_action( 'admin_init', array( __CLASS__, 'list_columns' ) );
	}

	/**
	 * Post types that get the box.
	 *
	 * @return string[]
	 */
	public static function post_types() {
		$types = array_diff( get_post_types( array( 'public' => true ) ), array( 'attachment' ) );
		return array_values( apply_filters( 'memberglut_restricted_post_types', $types ) );
	}

	/**
	 * Register the meta for the REST API (block editor).
	 *
	 * @return void
	 */
	public static function register_meta() {
		foreach ( self::post_types() as $pt ) {
			register_post_meta(
				$pt,
				MemberGlut_Access::META,
				array(
					'type'              => 'string',
					'single'            => true,
					'show_in_rest'      => true,
					'default'           => '',
					'sanitize_callback' => array( __CLASS__, 'sanitize_json' ),
					'auth_callback'     => static function ( $allowed, $key, $post_id ) {
						return current_user_can( 'edit_post', $post_id ) && current_user_can( 'memberglut_manage_rules' );
					},
				)
			);
		}
	}

	/**
	 * Sanitize the JSON settings.
	 *
	 * @param mixed $value Raw value.
	 * @return string
	 */
	public static function sanitize_json( $value ) {
		$a = is_array( $value ) ? $value : json_decode( (string) $value, true );
		if ( ! is_array( $a ) || empty( $a['who'] ) || 'inherit' === $a['who'] ) {
			return '';
		}
		$clean = array(
			'who'            => in_array( $a['who'], array( 'everyone', 'logged_in', 'logged_out', 'plans', 'roles' ), true ) ? $a['who'] : 'inherit',
			'plans'          => array_values( array_filter( array_map( 'intval', isset( $a['plans'] ) ? (array) $a['plans'] : array() ) ) ),
			'roles'          => array_values( array_filter( array_map( 'sanitize_key', isset( $a['roles'] ) ? (array) $a['roles'] : array() ) ) ),
			'action'         => isset( $a['action'] ) && in_array( $a['action'], array( 'inherit', 'message', 'login', 'redirect', 'pricing' ), true ) ? $a['action'] : 'inherit',
			'redirect_url'   => isset( $a['redirect_url'] ) ? esc_url_raw( MemberGlut_Settings::url_or_path( $a['redirect_url'] ) ) : '',
			'msg_logged_out' => isset( $a['msg_logged_out'] ) ? wp_kses_post( $a['msg_logged_out'] ) : '',
			'msg_logged_in'  => isset( $a['msg_logged_in'] ) ? wp_kses_post( $a['msg_logged_in'] ) : '',
			'teaser'         => isset( $a['teaser'] ) && in_array( $a['teaser'], array( 'inherit', 'none', 'excerpt', 'fade' ), true ) ? $a['teaser'] : 'inherit',
			'in_lists'       => isset( $a['in_lists'] ) && in_array( $a['in_lists'], array( 'inherit', 'show_excerpt', 'hide', 'show' ), true ) ? $a['in_lists'] : 'inherit',
			'hide_in_menus'  => ! empty( $a['hide_in_menus'] ),
		);
		return 'inherit' === $clean['who'] ? '' : wp_json_encode( $clean );
	}

	/**
	 * Block editor script (no build step: uses the wp.* globals).
	 *
	 * @return void
	 */
	public static function editor_assets() {
		wp_enqueue_script(
			'memberglut-editor',
			MEMBERGLUT_PLUGIN_URL . 'assets/editor/memberglut-editor.js',
			array( 'wp-plugins', 'wp-editor', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-core-data', 'wp-i18n', 'wp-hooks', 'wp-compose', 'wp-block-editor', 'wp-api-fetch' ),
			MEMBERGLUT_VERSION,
			true
		);
		wp_set_script_translations( 'memberglut-editor', 'memberglut', MEMBERGLUT_PLUGIN_PATH . 'languages' );
		wp_register_style( 'memberglut-editor', false, array(), MEMBERGLUT_VERSION );
		wp_enqueue_style( 'memberglut-editor' );
		wp_add_inline_style( 'memberglut-editor', '.memberglut-has-visibility{outline:1px dashed rgba(233,69,96,.55);outline-offset:2px}.memberglut-access-panel .mg-rule-note{background:#fff7f8;border-radius:4px;padding:8px 10px;margin:0 0 12px}.memberglut-access-panel .mg-checks,.block-editor-block-inspector .mg-checks{margin:-4px 0 14px}' );
		$plans = array();
		foreach ( MemberGlut_Plans::all() as $p ) {
			$plans[] = array( 'id' => $p['id'], 'name' => $p['name'], 'status' => $p['status'] );
		}
		$roles = array();
		foreach ( wp_roles()->get_names() as $slug => $name ) {
			$roles[] = array( 'slug' => $slug, 'name' => translate_user_role( $name ) );
		}
		wp_localize_script(
			'memberglut-editor',
			'memberglutEditor',
			array(
				'plans'      => $plans,
				'roles'      => $roles,
				'postTypes'  => self::post_types(),
				'canManage'  => current_user_can( 'memberglut_manage_rules' ),
				'rulesUrl'   => admin_url( 'admin.php?page=memberglut-rules' ),
				'ruleEditor' => admin_url( 'admin.php?page=memberglut-rule-editor' ),
				'global'     => array(
					'action'   => memberglut_setting( 'restrict_action' ),
					'teaser'   => memberglut_setting( 'teaser' ),
					'in_lists' => memberglut_setting( 'hide_in_lists' ),
				),
			)
		);
	}

	/**
	 * Classic meta box (hidden in the block editor, which has the panel).
	 *
	 * @return void
	 */
	public static function meta_boxes() {
		if ( ! current_user_can( 'memberglut_manage_rules' ) ) {
			return;
		}
		foreach ( self::post_types() as $pt ) {
			add_meta_box( 'memberglut_access', __( 'MemberGlut access', 'memberglut' ), array( __CLASS__, 'render_meta_box' ), $pt, 'side', 'high', array( '__back_compat_meta_box' => true ) );
		}
	}

	/**
	 * Render the classic meta box.
	 *
	 * @param WP_Post $post Post.
	 * @return void
	 */
	public static function render_meta_box( $post ) {
		$a = MemberGlut_Access::post_settings( $post->ID );
		$a = $a ? $a : array( 'who' => 'inherit', 'plans' => array(), 'roles' => array(), 'action' => 'inherit', 'redirect_url' => '', 'msg_logged_out' => '', 'msg_logged_in' => '', 'teaser' => 'inherit', 'in_lists' => 'inherit', 'hide_in_menus' => false );
		$rule = MemberGlut_Rules::rule_for_post( $post );
		wp_nonce_field( 'memberglut_access_box', 'memberglut_access_nonce' );
		$who = array(
			'inherit'    => __( 'Follow content rules', 'memberglut' ),
			'everyone'   => __( 'Everyone (public, ignore rules)', 'memberglut' ),
			'logged_in'  => __( 'Logged-in users', 'memberglut' ),
			'logged_out' => __( 'Logged-out visitors', 'memberglut' ),
			'plans'      => __( 'Members of plans', 'memberglut' ),
			'roles'      => __( 'User roles', 'memberglut' ),
		);
		?>
		<p>
			<?php if ( $rule ) : ?>
				<?php
				/* translators: %s: rule name */
				printf( esc_html__( 'Protected by the rule “%s”.', 'memberglut' ), esc_html( $rule['title'] ) );
				?>
			<?php else : ?>
				<?php esc_html_e( 'No content rule protects this item.', 'memberglut' ); ?>
			<?php endif; ?>
		</p>
		<p><label for="mg_who"><strong><?php esc_html_e( 'Who can see it', 'memberglut' ); ?></strong></label>
			<select name="memberglut_access[who]" id="mg_who" class="widefat">
				<?php foreach ( $who as $k => $label ) : ?>
					<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $a['who'], $k ); ?>><?php echo esc_html( $label ); ?></option>
				<?php endforeach; ?>
			</select>
		</p>
		<div class="mg-box-plans">
			<strong><?php esc_html_e( 'Plans', 'memberglut' ); ?></strong><br>
			<?php foreach ( MemberGlut_Plans::all() as $p ) : ?>
				<label style="display:block"><input type="checkbox" name="memberglut_access[plans][]" value="<?php echo esc_attr( $p['id'] ); ?>" <?php checked( in_array( (int) $p['id'], array_map( 'intval', $a['plans'] ), true ) ); ?>> <?php echo esc_html( $p['name'] ); ?></label>
			<?php endforeach; ?>
		</div>
		<div class="mg-box-roles" style="margin-top:8px">
			<strong><?php esc_html_e( 'Roles', 'memberglut' ); ?></strong><br>
			<?php foreach ( wp_roles()->get_names() as $slug => $name ) : ?>
				<label style="display:block"><input type="checkbox" name="memberglut_access[roles][]" value="<?php echo esc_attr( $slug ); ?>" <?php checked( in_array( $slug, (array) $a['roles'], true ) ); ?>> <?php echo esc_html( translate_user_role( $name ) ); ?></label>
			<?php endforeach; ?>
		</div>
		<p><label><strong><?php esc_html_e( 'Others see', 'memberglut' ); ?></strong>
			<select name="memberglut_access[action]" class="widefat">
				<option value="inherit" <?php selected( $a['action'], 'inherit' ); ?>><?php esc_html_e( 'Use the rule / global setting', 'memberglut' ); ?></option>
				<option value="message" <?php selected( $a['action'], 'message' ); ?>><?php esc_html_e( 'A message', 'memberglut' ); ?></option>
				<option value="login" <?php selected( $a['action'], 'login' ); ?>><?php esc_html_e( 'The login form', 'memberglut' ); ?></option>
				<option value="redirect" <?php selected( $a['action'], 'redirect' ); ?>><?php esc_html_e( 'A redirect', 'memberglut' ); ?></option>
				<option value="pricing" <?php selected( $a['action'], 'pricing' ); ?>><?php esc_html_e( 'The pricing page', 'memberglut' ); ?></option>
			</select></label></p>
		<p><label><?php esc_html_e( 'Redirect URL', 'memberglut' ); ?><input type="text" class="widefat" name="memberglut_access[redirect_url]" value="<?php echo esc_attr( $a['redirect_url'] ); ?>" placeholder="/join/"></label></p>
		<p><label><?php esc_html_e( 'Message for visitors', 'memberglut' ); ?><textarea class="widefat" rows="2" name="memberglut_access[msg_logged_out]" placeholder="<?php esc_attr_e( 'Empty uses the global message', 'memberglut' ); ?>"><?php echo esc_textarea( $a['msg_logged_out'] ); ?></textarea></label></p>
		<p><label><?php esc_html_e( 'Message for logged-in users without access', 'memberglut' ); ?><textarea class="widefat" rows="2" name="memberglut_access[msg_logged_in]"><?php echo esc_textarea( $a['msg_logged_in'] ); ?></textarea></label></p>
		<p><label><?php esc_html_e( 'Teaser', 'memberglut' ); ?>
			<select name="memberglut_access[teaser]" class="widefat">
				<?php foreach ( array( 'inherit' => __( 'Use the rule / global setting', 'memberglut' ), 'none' => __( 'None', 'memberglut' ), 'excerpt' => __( 'Excerpt', 'memberglut' ), 'fade' => __( 'Excerpt with fade', 'memberglut' ) ) as $k => $l ) : ?>
					<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $a['teaser'], $k ); ?>><?php echo esc_html( $l ); ?></option>
				<?php endforeach; ?>
			</select></label></p>
		<p><label><?php esc_html_e( 'In blog, archives & search', 'memberglut' ); ?>
			<select name="memberglut_access[in_lists]" class="widefat">
				<?php foreach ( array( 'inherit' => __( 'Use the rule / global setting', 'memberglut' ), 'show_excerpt' => __( 'Show with teaser only', 'memberglut' ), 'hide' => __( 'Hide', 'memberglut' ), 'show' => __( 'Show normally', 'memberglut' ) ) as $k => $l ) : ?>
					<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $a['in_lists'], $k ); ?>><?php echo esc_html( $l ); ?></option>
				<?php endforeach; ?>
			</select></label></p>
		<p><label><input type="checkbox" name="memberglut_access[hide_in_menus]" value="1" <?php checked( ! empty( $a['hide_in_menus'] ) ); ?>> <?php esc_html_e( 'Hide from menus for people without access', 'memberglut' ); ?></label></p>
		<?php
	}

	/**
	 * Save the classic meta box.
	 *
	 * @param int     $post_id Post.
	 * @param WP_Post $post    Post.
	 * @return void
	 */
	public static function save_meta_box( $post_id, $post ) {
		if ( ! isset( $_POST['memberglut_access_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['memberglut_access_nonce'] ) ), 'memberglut_access_box' ) ) {
			return;
		}
		if ( ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) || wp_is_post_revision( $post_id ) || ! current_user_can( 'edit_post', $post_id ) || ! current_user_can( 'memberglut_manage_rules' ) ) {
			return;
		}
		$raw = isset( $_POST['memberglut_access'] ) && is_array( $_POST['memberglut_access'] ) ? wp_unslash( $_POST['memberglut_access'] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Sanitized in sanitize_json().
		$json = self::sanitize_json( $raw );
		if ( $json ) {
			update_post_meta( $post_id, MemberGlut_Access::META, wp_slash( $json ) );
		} else {
			delete_post_meta( $post_id, MemberGlut_Access::META );
		}
	}

	/**
	 * Clear caches when access settings change.
	 *
	 * @param int    $meta_id Meta ID.
	 * @param int    $post_id Post.
	 * @param string $key     Meta key.
	 * @return void
	 */
	public static function meta_changed( $meta_id, $post_id, $key ) {
		if ( MemberGlut_Access::META === $key ) {
			memberglut_clear_cache();
		}
	}

	/**
	 * A post was saved: rule candidate sets may have changed.
	 *
	 * @param int $post_id Post.
	 * @return void
	 */
	public static function post_saved( $post_id ) {
		if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
			return;
		}
		if ( in_array( get_post_type( $post_id ), self::post_types(), true ) && MemberGlut_Rules::active() ) {
			MemberGlut_Access_Cache::bump();
		}
	}

	/**
	 * "Access" column in the post lists.
	 *
	 * @return void
	 */
	public static function list_columns() {
		if ( ! current_user_can( 'memberglut_manage_rules' ) ) {
			return;
		}
		foreach ( self::post_types() as $pt ) {
			add_filter( "manage_{$pt}_posts_columns", array( __CLASS__, 'add_column' ) );
			add_action( "manage_{$pt}_posts_custom_column", array( __CLASS__, 'render_column' ), 10, 2 );
		}
	}

	/**
	 * Add the column.
	 *
	 * @param array $cols Columns.
	 * @return array
	 */
	public static function add_column( $cols ) {
		$cols['memberglut_access'] = __( 'Access', 'memberglut' );
		return $cols;
	}

	/**
	 * Column content.
	 *
	 * @param string $col     Column.
	 * @param int    $post_id Post.
	 * @return void
	 */
	public static function render_column( $col, $post_id ) {
		if ( 'memberglut_access' !== $col ) {
			return;
		}
		$own = MemberGlut_Access::post_settings( $post_id );
		if ( $own ) {
			echo esc_html( self::who_label( $own ) );
			return;
		}
		$rule = MemberGlut_Rules::rule_for_post( get_post( $post_id ) );
		if ( $rule ) {
			/* translators: %s: rule */
			echo '<span title="' . esc_attr( sprintf( __( 'Rule: %s', 'memberglut' ), $rule['title'] ) ) . '">🔒 ' . esc_html( self::who_label( $rule ) ) . '</span>';
			return;
		}
		echo '<span style="color:#94a3b8">' . esc_html__( 'Public', 'memberglut' ) . '</span>';
	}

	/**
	 * Short label of a who definition.
	 *
	 * @param array $w Who.
	 * @return string
	 */
	public static function who_label( $w ) {
		switch ( $w['who'] ) {
			case 'everyone':
				return __( 'Public (overrides rules)', 'memberglut' );
			case 'logged_in':
				return __( 'Logged-in users', 'memberglut' );
			case 'logged_out':
				return __( 'Logged-out visitors', 'memberglut' );
			case 'roles':
				return implode( ', ', array_map( 'memberglut_format_role_name', (array) $w['roles'] ) );
			case 'plans':
				$names = array();
				foreach ( (array) $w['plans'] as $id ) {
					$p = MemberGlut_Plans::get( $id );
					if ( $p ) {
						$names[] = $p['name'];
					}
				}
				return implode( ', ', $names );
		}
		return '';
	}
}
