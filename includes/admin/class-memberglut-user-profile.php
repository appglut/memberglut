<?php
/**
 * WordPress user screens: custom registration fields on the profile, and a Membership column + plan filter on
 * the Users list (plans/01-dependency-map.md §2.10, appendix E).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_User_Profile class.
 */
class MemberGlut_User_Profile {

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'show_user_profile', array( __CLASS__, 'render_fields' ), 20 );
		add_action( 'edit_user_profile', array( __CLASS__, 'render_fields' ), 20 );
		add_action( 'personal_options_update', array( __CLASS__, 'save_fields' ) );
		add_action( 'edit_user_profile_update', array( __CLASS__, 'save_fields' ) );
		add_filter( 'manage_users_columns', array( __CLASS__, 'columns' ) );
		add_filter( 'manage_users_custom_column', array( __CLASS__, 'column' ), 10, 3 );
		add_action( 'restrict_manage_users', array( __CLASS__, 'plan_filter' ) );
		add_action( 'pre_get_users', array( __CLASS__, 'filter_users' ) );
		add_filter( 'user_row_actions', array( __CLASS__, 'row_actions' ), 10, 2 );
	}

	/**
	 * Custom fields + membership summary on the profile screen.
	 *
	 * @param WP_User $user User.
	 * @return void
	 */
	public static function render_fields( $user ) {
		$fields = MemberGlut_Settings::custom_fields();
		echo '<h2>' . esc_html__( 'Membership', 'memberglut' ) . '</h2><table class="form-table" role="presentation">';
		if ( current_user_can( 'memberglut_manage_members' ) ) {
			$plans = array();
			foreach ( MemberGlut_Subscription_Service::for_user( $user->ID ) as $sub ) {
				$p       = MemberGlut_Plans::get( $sub['plan_id'] );
				$plans[] = esc_html( ( $p ? $p['name'] : '#' . $sub['plan_id'] ) . ' (' . $sub['status'] . ')' );
			}
			echo '<tr><th>' . esc_html__( 'Plans', 'memberglut' ) . '</th><td>' . ( $plans ? implode( ', ', $plans ) : '—' ) . ' &nbsp; <a href="' . esc_url( admin_url( 'admin.php?page=memberglut-member&user=' . $user->ID ) ) . '">' . esc_html__( 'Manage membership', 'memberglut' ) . '</a></td></tr>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped above.
		}
		wp_nonce_field( 'memberglut_profile_fields', 'memberglut_profile_nonce' );
		foreach ( $fields as $f ) {
			$value = get_user_meta( $user->ID, $f['key'], true );
			$name  = 'memberglut_fields[' . $f['key'] . ']';
			echo '<tr><th><label for="mgf-' . esc_attr( $f['key'] ) . '">' . esc_html( $f['label'] ) . '</label></th><td>';
			switch ( $f['type'] ) {
				case 'textarea':
					echo '<textarea id="mgf-' . esc_attr( $f['key'] ) . '" name="' . esc_attr( $name ) . '" rows="3" class="regular-text">' . esc_textarea( (string) $value ) . '</textarea>';
					break;
				case 'select':
				case 'radio':
				case 'country':
					echo '<select id="mgf-' . esc_attr( $f['key'] ) . '" name="' . esc_attr( $name ) . '"><option value="">—</option>';
					foreach ( MemberGlut_Fields::choices( $f ) as $v => $l ) {
						echo '<option value="' . esc_attr( $v ) . '" ' . selected( (string) $value, (string) $v, false ) . '>' . esc_html( $l ) . '</option>';
					}
					echo '</select>';
					break;
				case 'checkbox':
					$choices = MemberGlut_Fields::choices( $f );
					if ( ! $choices ) {
						echo '<label><input type="checkbox" name="' . esc_attr( $name ) . '" value="1" ' . checked( ! empty( $value ), true, false ) . '> ' . esc_html__( 'Yes', 'memberglut' ) . '</label>';
					} else {
						foreach ( $choices as $v => $l ) {
							echo '<label style="margin-right:12px"><input type="checkbox" name="' . esc_attr( $name ) . '[]" value="' . esc_attr( $v ) . '" ' . checked( in_array( (string) $v, array_map( 'strval', (array) $value ), true ), true, false ) . '> ' . esc_html( $l ) . '</label>';
						}
					}
					break;
				default:
					$type = in_array( $f['type'], array( 'email', 'url', 'tel', 'number', 'date' ), true ) ? $f['type'] : 'text';
					echo '<input type="' . esc_attr( $type ) . '" id="mgf-' . esc_attr( $f['key'] ) . '" name="' . esc_attr( $name ) . '" value="' . esc_attr( (string) $value ) . '" class="regular-text">';
			}
			echo '</td></tr>';
		}
		echo '</table>';
	}

	/**
	 * Save the custom fields.
	 *
	 * @param int $user_id User.
	 * @return void
	 */
	public static function save_fields( $user_id ) {
		if ( ! current_user_can( 'edit_user', $user_id ) || ! isset( $_POST['memberglut_profile_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['memberglut_profile_nonce'] ) ), 'memberglut_profile_fields' ) ) {
			return;
		}
		$raw    = isset( $_POST['memberglut_fields'] ) ? (array) wp_unslash( $_POST['memberglut_fields'] ) : array(); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- Sanitized by MemberGlut_Fields::validate().
		$fields = array_map(
			static function ( $f ) {
				$f['required'] = false; // Admins may leave fields empty.
				return $f;
			},
			MemberGlut_Settings::custom_fields()
		);
		list( $clean ) = MemberGlut_Fields::validate( $fields, $raw, $user_id );
		foreach ( $fields as $f ) {
			if ( 'checkbox' === $f['type'] && ! isset( $raw[ $f['key'] ] ) ) {
				$clean[ $f['key'] ] = MemberGlut_Fields::choices( $f ) ? array() : '';
			}
		}
		MemberGlut_Fields::save( $user_id, $clean );
	}

	/**
	 * Membership column.
	 *
	 * @param array $cols Columns.
	 * @return array
	 */
	public static function columns( $cols ) {
		if ( current_user_can( 'memberglut_manage_members' ) ) {
			$cols['memberglut'] = __( 'Membership', 'memberglut' );
		}
		return $cols;
	}

	/**
	 * Column content.
	 *
	 * @param string $out     Output.
	 * @param string $col     Column.
	 * @param int    $user_id User.
	 * @return string
	 */
	public static function column( $out, $col, $user_id ) {
		if ( 'memberglut' !== $col ) {
			return $out;
		}
		$parts = array();
		foreach ( MemberGlut_Subscription_Service::for_user( $user_id ) as $sub ) {
			$p       = MemberGlut_Plans::get( $sub['plan_id'] );
			$color   = $p ? $p['color'] : '#94a3b8';
			$parts[] = '<span style="display:inline-block;margin:0 4px 2px 0;padding:1px 8px;border-radius:10px;background:' . esc_attr( $color ) . '1a;color:#1f2937;border:1px solid ' . esc_attr( $color ) . '55">' . esc_html( $p ? $p['name'] : '#' . $sub['plan_id'] ) . ' · ' . esc_html( $sub['status'] ) . '</span>';
		}
		$status = MemberGlut_Approval::status( $user_id );
		if ( 'approved' !== $status ) {
			$parts[] = '<em>' . esc_html( 'rejected' === $status ? __( 'Rejected', 'memberglut' ) : __( 'Awaiting approval', 'memberglut' ) ) . '</em>';
		}
		return $parts ? implode( '', $parts ) : '<span style="color:#94a3b8">—</span>';
	}

	/**
	 * Plan filter above the Users list.
	 *
	 * @param string $which top|bottom.
	 * @return void
	 */
	public static function plan_filter( $which = 'top' ) {
		if ( 'top' !== $which || ! current_user_can( 'memberglut_manage_members' ) ) {
			return;
		}
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- List filter.
		$current = isset( $_GET['memberglut_plan'] ) ? absint( $_GET['memberglut_plan'] ) : 0;
		echo '<label class="screen-reader-text" for="memberglut_plan">' . esc_html__( 'Filter by plan', 'memberglut' ) . '</label>';
		echo '<select name="memberglut_plan" id="memberglut_plan" style="float:none;margin-left:8px"><option value="">' . esc_html__( 'All plans', 'memberglut' ) . '</option>';
		foreach ( MemberGlut_Plans::all() as $p ) {
			echo '<option value="' . esc_attr( $p['id'] ) . '" ' . selected( $current, $p['id'], false ) . '>' . esc_html( $p['name'] ) . '</option>';
		}
		echo '</select>';
		submit_button( __( 'Filter', 'memberglut' ), '', 'memberglut_filter', false );
	}

	/**
	 * Apply the plan filter.
	 *
	 * @param WP_User_Query $q Query.
	 * @return void
	 */
	public static function filter_users( $q ) {
		global $pagenow;
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- List filter.
		if ( ! is_admin() || 'users.php' !== $pagenow || empty( $_GET['memberglut_plan'] ) ) {
			return;
		}
		$plan = absint( $_GET['memberglut_plan'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$ids  = wp_list_pluck( memberglut_repo( 'subscriptions' )->query( array( 'where' => array( 'plan_id' => $plan, 'status' => array( 'active', 'trialing', 'canceled', 'pending', 'on_hold' ) ), 'fields' => array( 'user_id' ) ) ), 'user_id' );
		$q->set( 'include', $ids ? array_map( 'intval', $ids ) : array( 0 ) );
	}

	/**
	 * “Membership” row action.
	 *
	 * @param array   $actions Actions.
	 * @param WP_User $user    User.
	 * @return array
	 */
	public static function row_actions( $actions, $user ) {
		if ( current_user_can( 'memberglut_manage_members' ) ) {
			$actions['memberglut'] = '<a href="' . esc_url( admin_url( 'admin.php?page=memberglut-member&user=' . $user->ID ) ) . '">' . esc_html__( 'Membership', 'memberglut' ) . '</a>';
		}
		return $actions;
	}
}
