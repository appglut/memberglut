<?php
/**
 * Account › Memberships. Override in yourtheme/memberglut/account/subscriptions.php.
 *
 * @package MemberGlut
 *
 * @var WP_User $user    Member.
 * @var array[] $rows    Memberships: sub, plan, status_label, access, actions, scheduled.
 * @var int     $card    Subscription whose card is being updated (0 = none).
 * @var string  $pricing Pricing page URL.
 * @var string  $nonce   Nonce of the account_sub action.
 */

defined( 'ABSPATH' ) || exit;
?>
<h2 class="mg-account-title"><?php esc_html_e( 'Memberships', 'memberglut' ); ?></h2>
<?php if ( ! $rows ) : ?>
	<p><?php esc_html_e( 'You have no memberships yet.', 'memberglut' ); ?></p>
	<?php if ( $pricing ) : ?>
		<p><a class="mg-button" href="<?php echo esc_url( $pricing ); ?>"><?php esc_html_e( 'See the plans', 'memberglut' ); ?></a></p>
	<?php endif; ?>
<?php endif; ?>
<?php foreach ( $rows as $row ) : ?>
	<?php
	$s    = $row['sub'];
	$plan = $row['plan'];
	?>
	<div class="mg-card mg-sub mg-sub-<?php echo esc_attr( $s['status'] ); ?>">
		<div class="mg-card-head">
			<strong><?php echo esc_html( $plan['name'] ); ?></strong>
			<span class="mg-badge mg-badge-<?php echo esc_attr( $s['status'] ); ?>"><?php echo esc_html( $row['status_label'] ); ?></span>
		</div>
		<dl class="mg-sub-details">
			<dt><?php esc_html_e( 'Price', 'memberglut' ); ?></dt>
			<dd><?php echo esc_html( MemberGlut_Plans::price_label( $plan ) ); ?></dd>
			<?php if ( $s['start_date'] ) : ?>
				<dt><?php esc_html_e( 'Started', 'memberglut' ); ?></dt>
				<dd><?php echo esc_html( memberglut_format_date( $s['start_date'] ) ); ?></dd>
			<?php endif; ?>
			<?php if ( $s['trial_ends_at'] && 'trialing' === $s['status'] ) : ?>
				<dt><?php esc_html_e( 'Trial ends', 'memberglut' ); ?></dt>
				<dd><?php echo esc_html( memberglut_format_date( $s['trial_ends_at'] ) ); ?></dd>
			<?php endif; ?>
			<?php if ( $s['next_payment_at'] && in_array( $s['status'], array( 'active', 'trialing', 'on_hold' ), true ) ) : ?>
				<dt><?php esc_html_e( 'Next payment', 'memberglut' ); ?></dt>
				<dd><?php echo esc_html( memberglut_format_date( $s['next_payment_at'] ) ); ?></dd>
			<?php elseif ( $s['expires_at'] ) : ?>
				<dt><?php echo esc_html( $row['access'] ? __( 'Access until', 'memberglut' ) : __( 'Ended', 'memberglut' ) ); ?></dt>
				<dd><?php echo esc_html( memberglut_format_date( $s['expires_at'] ) ); ?></dd>
			<?php elseif ( $row['access'] ) : ?>
				<dt><?php esc_html_e( 'Access until', 'memberglut' ); ?></dt>
				<dd><?php esc_html_e( 'No expiry', 'memberglut' ); ?></dd>
			<?php endif; ?>
			<?php if ( (int) $s['billing_cycles_total'] > 0 ) : ?>
				<dt><?php esc_html_e( 'Payments', 'memberglut' ); ?></dt>
				<dd>
					<?php
					/* translators: 1: payments made, 2: total payments */
					echo esc_html( sprintf( __( '%1$d of %2$d', 'memberglut' ), (int) $s['billing_cycles_done'], (int) $s['billing_cycles_total'] ) );
					?>
				</dd>
			<?php endif; ?>
		</dl>
		<?php if ( $row['scheduled'] ) : ?>
			<p class="mg-notice mg-notice-info">
				<?php
				/* translators: 1: plan, 2: date */
				echo esc_html( sprintf( __( 'Changes to %1$s on %2$s.', 'memberglut' ), $row['scheduled']['name'], $s['expires_at'] ? memberglut_format_date( $s['expires_at'] ) : __( 'the next renewal', 'memberglut' ) ) );
				?>
			</p>
		<?php endif; ?>
		<?php if ( 'on_hold' === $s['status'] ) : ?>
			<p class="mg-notice mg-notice-error"><?php esc_html_e( 'Your last payment failed. Update your payment method to keep your access.', 'memberglut' ); ?></p>
		<?php endif; ?>
		<?php if ( $row['actions'] ) : ?>
			<div class="mg-sub-actions">
				<?php foreach ( $row['actions'] as $key => $a ) : ?>
					<?php if ( ! empty( $a['url'] ) ) : ?>
						<a class="mg-button mg-button-secondary" href="<?php echo esc_url( $a['url'] ); ?>"><?php echo esc_html( $a['label'] ); ?></a>
					<?php elseif ( ! empty( $a['op'] ) ) : ?>
						<form method="post" class="mg-inline-form"<?php echo ! empty( $a['confirm'] ) ? ' data-mg-confirm="' . esc_attr( $a['confirm'] ) . '"' : ''; ?>>
							<input type="hidden" name="mg_action" value="account_sub">
							<input type="hidden" name="_mgnonce" value="<?php echo esc_attr( $nonce ); ?>">
							<input type="hidden" name="sub" value="<?php echo (int) $s['id']; ?>">
							<input type="hidden" name="op" value="<?php echo esc_attr( $a['op'] ); ?>">
							<button type="submit" class="mg-button <?php echo in_array( $a['op'], array( 'cancel', 'abandon' ), true ) ? 'mg-button-danger' : 'mg-button-secondary'; ?>"><?php echo esc_html( $a['label'] ); ?></button>
						</form>
					<?php endif; ?>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
		<?php if ( (int) $card === (int) $s['id'] ) : ?>
			<div id="mg-card" class="mg-card-update" data-mg-card-form>
				<h3><?php esc_html_e( 'New payment method', 'memberglut' ); ?></h3>
				<div class="mg-pay-element"></div>
				<p class="mg-pay-error" role="alert"></p>
				<button type="button" class="mg-button mg-submit"><?php esc_html_e( 'Save card', 'memberglut' ); ?></button>
			</div>
		<?php endif; ?>
	</div>
<?php endforeach; ?>
