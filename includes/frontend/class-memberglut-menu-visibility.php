<?php
/**
 * Menu item visibility (Appearance › Menus) and legacy widget visibility.
 *
 * Menu item meta `_memberglut_visibility` = { who: everyone|logged_in|logged_out|plans|roles, plans, roles }.
 * Items pointing to posts with “Hide from menus” are removed for people without access to the post.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Menu_Visibility class.
 */
class MemberGlut_Menu_Visibility {

	const META = '_memberglut_visibility';

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'wp_nav_menu_item_custom_fields', array( __CLASS__, 'fields' ), 10, 2 );
		add_action( 'wp_update_nav_menu_item', array( __CLASS__, 'save' ), 10, 2 );
		add_filter( 'wp_nav_menu_objects', array( __CLASS__, 'filter_items' ), 20 );
		add_action( 'in_widget_form', array( __CLASS__, 'widget_field' ), 10, 3 );
		add_filter( 'widget_update_callback', array( __CLASS__, 'widget_save' ), 10, 2 );
		add_filter( 'widget_display_callback', array( __CLASS__, 'widget_display' ), 10, 3 );
	}

	/**
	 * Options of the "visible to" select.
	 *
	 * @return array
	 */
	private static function choices() {
		return array(
			'everyone'   => __( 'Everyone', 'memberglut' ),
			'logged_in'  => __( 'Logged-in users', 'memberglut' ),
			'logged_out' => __( 'Logged-out visitors', 'memberglut' ),
			'plans'      => __( 'Members of plans', 'memberglut' ),
			'roles'      => __( 'User roles', 'memberglut' ),
		);
	}

	/**
	 * Fields under each menu item.
	 *
	 * @param int     $item_id Item ID.
	 * @param WP_Post $item    Item.
	 * @return void
	 */
	public static function fields( $item_id, $item ) {
		$v = get_post_meta( $item_id, self::META, true );
		$v = is_array( $v ) ? $v : array( 'who' => 'everyone', 'plans' => array(), 'roles' => array() );
		wp_nonce_field( 'memberglut_menu_' . $item_id, 'memberglut_menu_nonce_' . $item_id );
		?>
		<div class="field-memberglut description description-wide" style="margin:6px 0 10px">
			<label for="mg-vis-<?php echo esc_attr( $item_id ); ?>"><?php esc_html_e( 'Visible to (MemberGlut)', 'memberglut' ); ?><br>
				<select id="mg-vis-<?php echo esc_attr( $item_id ); ?>" name="memberglut_vis[<?php echo esc_attr( $item_id ); ?>][who]" class="widefat" onchange="this.closest('.field-memberglut').dataset.who=this.value">
					<?php foreach ( self::choices() as $k => $l ) : ?>
						<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $v['who'], $k ); ?>><?php echo esc_html( $l ); ?></option>
					<?php endforeach; ?>
				</select>
			</label>
			<span class="mg-vis-plans" style="display:block;margin-top:4px">
				<?php foreach ( MemberGlut_Plans::all() as $p ) : ?>
					<label style="margin-right:10px"><input type="checkbox" name="memberglut_vis[<?php echo esc_attr( $item_id ); ?>][plans][]" value="<?php echo esc_attr( $p['id'] ); ?>" <?php checked( in_array( (int) $p['id'], array_map( 'intval', (array) $v['plans'] ), true ) ); ?>> <?php echo esc_html( $p['name'] ); ?></label>
				<?php endforeach; ?>
			</span>
			<span class="mg-vis-roles" style="display:block;margin-top:4px">
				<?php foreach ( wp_roles()->get_names() as $slug => $name ) : ?>
					<label style="margin-right:10px"><input type="checkbox" name="memberglut_vis[<?php echo esc_attr( $item_id ); ?>][roles][]" value="<?php echo esc_attr( $slug ); ?>" <?php checked( in_array( $slug, (array) $v['roles'], true ) ); ?>> <?php echo esc_html( translate_user_role( $name ) ); ?></label>
				<?php endforeach; ?>
			</span>
			<span class="description"><?php esc_html_e( 'Plans apply when “Members of plans” is chosen, roles when “User roles” is chosen.', 'memberglut' ); ?></span>
		</div>
		<?php
	}

	/**
	 * Save a menu item's visibility.
	 *
	 * @param int $menu_id Menu.
	 * @param int $item_id Item.
	 * @return void
	 */
	public static function save( $menu_id, $item_id ) {
		$nonce = 'memberglut_menu_nonce_' . $item_id;
		if ( ! isset( $_POST[ $nonce ] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST[ $nonce ] ) ), 'memberglut_menu_' . $item_id ) || ! current_user_can( 'edit_theme_options' ) ) {
			return;
		}
		$raw = isset( $_POST['memberglut_vis'][ $item_id ] ) ? wp_unslash( $_POST['memberglut_vis'][ $item_id ] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Sanitized below.
		$who = isset( $raw['who'] ) && isset( self::choices()[ $raw['who'] ] ) ? $raw['who'] : 'everyone';
		if ( 'everyone' === $who ) {
			delete_post_meta( $item_id, self::META );
			return;
		}
		update_post_meta(
			$item_id,
			self::META,
			array(
				'who'   => $who,
				'plans' => array_values( array_filter( array_map( 'intval', isset( $raw['plans'] ) ? (array) $raw['plans'] : array() ) ) ),
				'roles' => array_values( array_filter( array_map( 'sanitize_key', isset( $raw['roles'] ) ? (array) $raw['roles'] : array() ) ) ),
			)
		);
	}

	/**
	 * Remove menu items the user may not see (and their children).
	 *
	 * @param WP_Post[] $items Items.
	 * @return WP_Post[]
	 */
	public static function filter_items( $items ) {
		if ( is_admin() ) {
			return $items;
		}
		$user_id = get_current_user_id();
		$removed = array();
		foreach ( $items as $i => $item ) {
			$hide = false;
			$v    = get_post_meta( $item->ID, self::META, true );
			if ( is_array( $v ) && ! empty( $v['who'] ) && 'everyone' !== $v['who'] ) {
				$bypass = in_array( $v['who'], array( 'plans', 'roles' ), true ) && memberglut_user_bypasses_restrictions( $user_id );
				$hide   = ! $bypass && ! MemberGlut_Access::user_passes( $v, $user_id );
			}
			if ( ! $hide && 'post_type' === $item->type && $item->object_id ) {
				$d = MemberGlut_Access::decide_post( (int) $item->object_id, $user_id );
				if ( ! $d['allowed'] && ( ! empty( $d['hide_menus'] ) || 'hide' === ( isset( $d['in_lists'] ) ? $d['in_lists'] : '' ) ) ) {
					$hide = true;
				}
			}
			if ( $hide || in_array( (int) $item->menu_item_parent, $removed, true ) ) {
				$removed[] = (int) $item->ID;
				unset( $items[ $i ] );
			}
		}
		if ( $removed ) {
			MemberGlut_Cache::no_cache();
		}
		return $items;
	}

	/**
	 * Visibility select in classic widget forms.
	 *
	 * @param WP_Widget $widget   Widget.
	 * @param null      $return   Return.
	 * @param array     $instance Instance.
	 * @return void
	 */
	public static function widget_field( $widget, $return, $instance ) {
		$who = isset( $instance['memberglut_who'] ) ? $instance['memberglut_who'] : 'everyone';
		$sel = isset( $instance['memberglut_targets'] ) ? (array) $instance['memberglut_targets'] : array();
		?>
		<p>
			<label for="<?php echo esc_attr( $widget->get_field_id( 'memberglut_who' ) ); ?>"><?php esc_html_e( 'Visible to (MemberGlut)', 'memberglut' ); ?></label>
			<select class="widefat" id="<?php echo esc_attr( $widget->get_field_id( 'memberglut_who' ) ); ?>" name="<?php echo esc_attr( $widget->get_field_name( 'memberglut_who' ) ); ?>">
				<?php foreach ( self::choices() as $k => $l ) : ?>
					<option value="<?php echo esc_attr( $k ); ?>" <?php selected( $who, $k ); ?>><?php echo esc_html( $l ); ?></option>
				<?php endforeach; ?>
			</select>
			<select multiple class="widefat" style="margin-top:4px;height:6em" name="<?php echo esc_attr( $widget->get_field_name( 'memberglut_targets' ) ); ?>[]">
				<optgroup label="<?php esc_attr_e( 'Plans', 'memberglut' ); ?>">
					<?php foreach ( MemberGlut_Plans::all() as $p ) : ?>
						<option value="plan:<?php echo esc_attr( $p['id'] ); ?>" <?php selected( in_array( 'plan:' . $p['id'], $sel, true ) ); ?>><?php echo esc_html( $p['name'] ); ?></option>
					<?php endforeach; ?>
				</optgroup>
				<optgroup label="<?php esc_attr_e( 'Roles', 'memberglut' ); ?>">
					<?php foreach ( wp_roles()->get_names() as $slug => $name ) : ?>
						<option value="role:<?php echo esc_attr( $slug ); ?>" <?php selected( in_array( 'role:' . $slug, $sel, true ) ); ?>><?php echo esc_html( translate_user_role( $name ) ); ?></option>
					<?php endforeach; ?>
				</optgroup>
			</select>
		</p>
		<?php
	}

	/**
	 * Save the widget field.
	 *
	 * @param array $instance New instance.
	 * @param array $new      Submitted values.
	 * @return array
	 */
	public static function widget_save( $instance, $new ) {
		$instance['memberglut_who']     = isset( $new['memberglut_who'] ) && isset( self::choices()[ $new['memberglut_who'] ] ) ? $new['memberglut_who'] : 'everyone';
		$instance['memberglut_targets'] = array_values( array_filter( array_map( 'sanitize_text_field', isset( $new['memberglut_targets'] ) ? (array) $new['memberglut_targets'] : array() ) ) );
		return $instance;
	}

	/**
	 * Hide widgets the user may not see.
	 *
	 * @param array     $instance Instance.
	 * @param WP_Widget $widget   Widget.
	 * @param array     $args     Args.
	 * @return array|false
	 */
	public static function widget_display( $instance, $widget, $args ) {
		if ( ! is_array( $instance ) || empty( $instance['memberglut_who'] ) || 'everyone' === $instance['memberglut_who'] ) {
			return $instance;
		}
		$who = array( 'who' => $instance['memberglut_who'], 'plans' => array(), 'roles' => array() );
		foreach ( (array) ( isset( $instance['memberglut_targets'] ) ? $instance['memberglut_targets'] : array() ) as $t ) {
			if ( 0 === strpos( $t, 'plan:' ) ) {
				$who['plans'][] = (int) substr( $t, 5 );
			} elseif ( 0 === strpos( $t, 'role:' ) ) {
				$who['roles'][] = substr( $t, 5 );
			}
		}
		$user_id = get_current_user_id();
		if ( in_array( $who['who'], array( 'plans', 'roles' ), true ) && memberglut_user_bypasses_restrictions( $user_id ) ) {
			return $instance;
		}
		return MemberGlut_Access::user_passes( $who, $user_id ) ? $instance : false;
	}
}
