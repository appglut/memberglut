<?php
/**
 * Account › Activity. Override in yourtheme/memberglut/account/activity.php.
 *
 * @package MemberGlut
 *
 * @var WP_User $user   Member.
 * @var array[] $rows   date, last, ip, device, active, current.
 * @var int     $others Other active sessions.
 * @var string  $hidden Hidden fields of the “log out other devices” form.
 */

defined( 'ABSPATH' ) || exit;
?>
<h2 class="mg-account-title"><?php esc_html_e( 'Recent logins', 'memberglut' ); ?></h2>
<?php if ( ! $rows ) : ?>
	<p><?php esc_html_e( 'No logins recorded yet.', 'memberglut' ); ?></p>
<?php else : ?>
	<ul class="mg-logins">
		<?php foreach ( $rows as $memberglut_r ) : ?>
			<li class="<?php echo $memberglut_r['active'] ? 'is-active' : ''; ?>">
				<strong><?php echo esc_html( $memberglut_r['device'] ); ?></strong>
				<?php if ( $memberglut_r['current'] ) : ?>
					<span class="mg-badge mg-badge-active"><?php esc_html_e( 'This device', 'memberglut' ); ?></span>
				<?php elseif ( $memberglut_r['active'] ) : ?>
					<span class="mg-badge"><?php esc_html_e( 'Logged in', 'memberglut' ); ?></span>
				<?php endif; ?>
				<div class="mg-muted">
					<?php echo esc_html( memberglut_format_date( $memberglut_r['date'], get_option( 'date_format' ) . ' ' . get_option( 'time_format' ) ) ); ?>
					· <?php echo esc_html( $memberglut_r['ip'] ); ?>
				</div>
			</li>
		<?php endforeach; ?>
	</ul>
<?php endif; ?>
<?php if ( $others ) : ?>
	<form method="post" class="mg-form">
		<?php echo $hidden; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped. ?>
		<p>
			<?php
			/* translators: %d: number of devices */
			echo esc_html( sprintf( _n( 'You are also logged in on %d other device.', 'You are also logged in on %d other devices.', $others, 'memberglut' ), $others ) );
			?>
		</p>
		<button type="submit" class="mg-button mg-button-secondary"><?php esc_html_e( 'Log out other devices', 'memberglut' ); ?></button>
	</form>
<?php endif; ?>
