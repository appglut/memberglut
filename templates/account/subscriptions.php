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
<?php foreach ( $rows as $memberglut_row ) : ?>
	<?php
	$memberglut_s    = $memberglut_row['sub'];
	$memberglut_plan = $memberglut_row['plan'];
	?>
	<div class="mg-card mg-sub mg-sub-<?php echo esc_attr( $memberglut_s['status'] ); ?>">
		<div class="mg-card-head">
			<strong><?php echo esc_html( $memberglut_plan['name'] ); ?></strong>
			<span class="mg-badge mg-badge-<?php echo esc_attr( $memberglut_s['status'] ); ?>"><?php echo esc_html( $memberglut_row['status_label'] ); ?></span>
		</div>
		<dl class="mg-sub-details">
			<dt><?php esc_html_e( 'Price', 'memberglut' ); ?></dt>
			<dd><?php echo esc_html( MemberGlut_Plans::price_label( $memberglut_plan ) ); ?></dd>
			<?php if ( $memberglut_s['start_date'] ) : ?>
				<dt><?php esc_html_e( 'Started', 'memberglut' ); ?></dt>
				<dd><?php echo esc_html( memberglut_format_date( $memberglut_s['start_date'] ) ); ?></dd>
			<?php endif; ?>
			<?php if ( $memberglut_s['trial_ends_at'] && 'trialing' === $memberglut_s['status'] ) : ?>
				<dt><?php esc_html_e( 'Trial ends', 'memberglut' ); ?></dt>
				<dd><?php echo esc_html( memberglut_format_date( $memberglut_s['trial_ends_at'] ) ); ?></dd>
			<?php endif; ?>
			<?php if ( $memberglut_s['next_payment_at'] && in_array( $memberglut_s['status'], array( 'active', 'trialing', 'on_hold' ), true ) ) : ?>
				<dt><?php esc_html_e( 'Next payment', 'memberglut' ); ?></dt>
				<dd><?php echo esc_html( memberglut_format_date( $memberglut_s['next_payment_at'] ) ); ?></dd>
			<?php elseif ( $memberglut_s['expires_at'] ) : ?>
				<dt><?php echo esc_html( $memberglut_row['access'] ? __( 'Access until', 'memberglut' ) : __( 'Ended', 'memberglut' ) ); ?></dt>
				<dd><?php echo esc_html( memberglut_format_date( $memberglut_s['expires_at'] ) ); ?></dd>
			<?php elseif ( $memberglut_row['access'] ) : ?>
				<dt><?php esc_html_e( 'Access until', 'memberglut' ); ?></dt>
				<dd><?php esc_html_e( 'No expiry', 'memberglut' ); ?></dd>
			<?php endif; ?>
			<?php if ( (int) $memberglut_s['billing_cycles_total'] > 0 ) : ?>
				<dt><?php esc_html_e( 'Payments', 'memberglut' ); ?></dt>
				<dd>
					<?php
					/* translators: 1: payments made, 2: total payments */
					echo esc_html( sprintf( __( '%1$d of %2$d', 'memberglut' ), (int) $memberglut_s['billing_cycles_done'], (int) $memberglut_s['billing_cycles_total'] ) );
					?>
				</dd>
			<?php endif; ?>
		</dl>
		<?php if ( $memberglut_row['scheduled'] ) : ?>
			<p class="mg-notice mg-notice-info">
				<?php
				/* translators: 1: plan, 2: date */
				echo esc_html( sprintf( __( 'Changes to %1$memberglut_s on %2$memberglut_s.', 'memberglut' ), $memberglut_row['scheduled']['name'], $memberglut_s['expires_at'] ? memberglut_format_date( $memberglut_s['expires_at'] ) : __( 'the next renewal', 'memberglut' ) ) );
				?>
			</p>
		<?php endif; ?>
		<?php if ( 'on_hold' === $memberglut_s['status'] ) : ?>
			<p class="mg-notice mg-notice-error"><?php esc_html_e( 'Your last payment failed. Update your payment method to keep your access.', 'memberglut' ); ?></p>
		<?php endif; ?>
		<?php if ( $memberglut_row['actions'] ) : ?>
			<div class="mg-sub-actions">
				<?php foreach ( $memberglut_row['actions'] as $memberglut_key => $memberglut_a ) : ?>
					<?php if ( ! empty( $memberglut_a['url'] ) ) : ?>
						<a class="mg-button mg-button-secondary" href="<?php echo esc_url( $memberglut_a['url'] ); ?>"><?php echo esc_html( $memberglut_a['label'] ); ?></a>
					<?php elseif ( ! empty( $memberglut_a['op'] ) ) : ?>
						<form method="post" class="mg-inline-form"<?php echo ! empty( $memberglut_a['confirm'] ) ? ' data-mg-confirm="' . esc_attr( $memberglut_a['confirm'] ) . '"' : ''; ?>>
							<input type="hidden" name="mg_action" value="account_sub">
							<input type="hidden" name="_mgnonce" value="<?php echo esc_attr( $nonce ); ?>">
							<input type="hidden" name="sub" value="<?php echo (int) $memberglut_s['id']; ?>">
							<input type="hidden" name="op" value="<?php echo esc_attr( $memberglut_a['op'] ); ?>">
							<button type="submit" class="mg-button <?php echo in_array( $memberglut_a['op'], array( 'cancel', 'abandon' ), true ) ? 'mg-button-danger' : 'mg-button-secondary'; ?>"><?php echo esc_html( $memberglut_a['label'] ); ?></button>
						</form>
					<?php endif; ?>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
		<?php if ( (int) $card === (int) $memberglut_s['id'] ) : ?>
			<div id="mg-card" class="mg-card-update" data-mg-card-form>
				<h3><?php esc_html_e( 'New payment method', 'memberglut' ); ?></h3>
				<div class="mg-pay-element"></div>
				<p class="mg-pay-error" role="alert"></p>
				<button type="button" class="mg-button mg-submit"><?php esc_html_e( 'Save card', 'memberglut' ); ?></button>
			</div>
		<?php endif; ?>
	</div>
<?php endforeach; ?>
