<?php
/**
 * Account › Dashboard. Override in yourtheme/memberglut/account/dashboard.php.
 *
 * @package MemberGlut
 *
 * @var WP_User $user    Member.
 * @var array[] $subs    Current memberships (see MemberGlut_Account::subscriptions()).
 * @var array   $tabs    Enabled tabs.
 * @var string  $pricing Pricing page URL.
 */

defined( 'ABSPATH' ) || exit;
?>
<h2 class="mg-account-title">
	<?php
	/* translators: %s: member name */
	echo esc_html( sprintf( __( 'Hello, %s', 'memberglut' ), $user->first_name ? $user->first_name : $user->display_name ) );
	?>
</h2>
<?php if ( $subs ) : ?>
	<div class="mg-cards">
		<?php foreach ( $subs as $memberglut_row ) : ?>
			<div class="mg-card">
				<div class="mg-card-head">
					<strong><?php echo esc_html( $memberglut_row['plan']['name'] ); ?></strong>
					<span class="mg-badge mg-badge-<?php echo esc_attr( $memberglut_row['sub']['status'] ); ?>"><?php echo esc_html( $memberglut_row['status_label'] ); ?></span>
				</div>
				<p class="mg-muted">
					<?php
					if ( 'canceled' === $memberglut_row['sub']['status'] && $memberglut_row['sub']['expires_at'] ) {
						/* translators: %s: date */
						echo esc_html( sprintf( __( 'Access until %s', 'memberglut' ), memberglut_format_date( $memberglut_row['sub']['expires_at'] ) ) );
					} elseif ( $memberglut_row['sub']['next_payment_at'] ) {
						/* translators: %s: date */
						echo esc_html( sprintf( __( 'Renews on %s', 'memberglut' ), memberglut_format_date( $memberglut_row['sub']['next_payment_at'] ) ) );
					} elseif ( $memberglut_row['sub']['expires_at'] ) {
						/* translators: %s: date */
						echo esc_html( sprintf( __( 'Expires on %s', 'memberglut' ), memberglut_format_date( $memberglut_row['sub']['expires_at'] ) ) );
					} elseif ( $memberglut_row['access'] ) {
						esc_html_e( 'No expiry', 'memberglut' );
					}
					?>
				</p>
			</div>
		<?php endforeach; ?>
	</div>
<?php else : ?>
	<p><?php esc_html_e( 'You have no active membership.', 'memberglut' ); ?></p>
	<?php if ( $pricing ) : ?>
		<p><a class="mg-button" href="<?php echo esc_url( $pricing ); ?>"><?php esc_html_e( 'See the plans', 'memberglut' ); ?></a></p>
	<?php endif; ?>
<?php endif; ?>
<ul class="mg-quick-links">
	<?php foreach ( array_diff_key( $tabs, array( 'dashboard' => 1, 'delete' => 1 ) ) as $memberglut_key => $memberglut_label ) : ?>
		<li><a href="<?php echo esc_url( MemberGlut_Account::url( $memberglut_key ) ); ?>"><?php echo esc_html( $memberglut_label ); ?></a></li>
	<?php endforeach; ?>
</ul>
