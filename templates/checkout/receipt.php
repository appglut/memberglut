<?php
/**
 * Receipt on the Thank-you page. Override in yourtheme/memberglut/checkout/receipt.php.
 *
 * @package MemberGlut
 *
 * @var array                   $payment Payment row.
 * @var array|null              $plan    Plan.
 * @var array|null              $sub     Subscription.
 * @var string                  $notice  Notices HTML.
 * @var MemberGlut_Gateway|null $gateway Gateway.
 */

defined( 'ABSPATH' ) || exit;
$memberglut_status = array(
	'completed' => __( 'Paid', 'memberglut' ),
	'pending'   => __( 'Awaiting payment', 'memberglut' ),
	'failed'    => __( 'Failed', 'memberglut' ),
	'refunded'  => __( 'Refunded', 'memberglut' ),
);
?>
<div class="mg-receipt">
	<?php echo $notice; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped. ?>
	<?php if ( 'completed' === $payment['status'] ) : ?>
		<h2><?php esc_html_e( 'Thank you! Your payment was received.', 'memberglut' ); ?></h2>
		<?php if ( $sub && 'pending' === $sub['status'] && MemberGlut_Approval::is_pending( (int) $payment['user_id'] ) ) : ?>
			<p><?php esc_html_e( 'Your membership starts as soon as your account is approved. We will email you.', 'memberglut' ); ?></p>
		<?php elseif ( $plan ) : ?>
			<p><?php echo esc_html( sprintf( /* translators: %s: plan */ __( 'Your %s membership is active.', 'memberglut' ), $plan['name'] ) ); ?></p>
		<?php endif; ?>
	<?php elseif ( 'pending' === $payment['status'] && 'bank' === $payment['gateway'] ) : ?>
		<h2><?php esc_html_e( 'Thank you! Please complete your bank transfer.', 'memberglut' ); ?></h2>
		<div class="mg-bank-details">
			<p><strong><?php echo esc_html( sprintf( /* translators: %s: amount */ __( 'Amount: %s', 'memberglut' ), memberglut_format_price( $payment['amount'], $payment['currency'] ) ) ); ?></strong><br>
			<?php echo esc_html( sprintf( /* translators: %d: order number */ __( 'Reference: #%d', 'memberglut' ), $payment['id'] ) ); ?></p>
			<?php echo wp_kses_post( wpautop( esc_html( memberglut_setting( 'bank_instructions', '' ) ) ) ); ?>
		</div>
		<p class="mg-help"><?php echo 'now' === memberglut_setting( 'bank_activate', 'on_confirm' ) ? esc_html__( 'Your membership is already active.', 'memberglut' ) : esc_html__( 'Your membership starts as soon as we receive the payment.', 'memberglut' ); ?></p>
	<?php elseif ( 'pending' === $payment['status'] ) : ?>
		<h2><?php esc_html_e( 'We are confirming your payment…', 'memberglut' ); ?></h2>
		<p><?php esc_html_e( 'This usually takes a few seconds. Refresh this page in a moment.', 'memberglut' ); ?></p>
	<?php else : ?>
		<h2><?php esc_html_e( 'Your order', 'memberglut' ); ?></h2>
	<?php endif; ?>

	<table class="mg-receipt-table">
		<tbody>
			<tr><th><?php esc_html_e( 'Order', 'memberglut' ); ?></th><td>#<?php echo esc_html( $payment['id'] ); ?></td></tr>
			<tr><th><?php esc_html_e( 'Date', 'memberglut' ); ?></th><td><?php echo esc_html( memberglut_format_date( $payment['created_at'] ) ); ?></td></tr>
			<?php if ( $plan ) : ?>
				<tr><th><?php esc_html_e( 'Plan', 'memberglut' ); ?></th><td><?php echo esc_html( $plan['name'] ); ?></td></tr>
			<?php endif; ?>
			<tr><th><?php esc_html_e( 'Subtotal', 'memberglut' ); ?></th><td><?php echo esc_html( memberglut_format_price( $payment['subtotal'], $payment['currency'] ) ); ?></td></tr>
			<?php if ( (float) $payment['signup_fee'] > 0 ) : ?>
				<tr><th><?php esc_html_e( 'Sign-up fee', 'memberglut' ); ?></th><td><?php echo esc_html( memberglut_format_price( $payment['signup_fee'], $payment['currency'] ) ); ?></td></tr>
			<?php endif; ?>
			<?php if ( (float) $payment['discount'] > 0 ) : ?>
				<tr><th><?php echo esc_html( sprintf( /* translators: %s: code */ __( 'Discount %s', 'memberglut' ), $payment['coupon_code'] ) ); ?></th><td>−<?php echo esc_html( memberglut_format_price( $payment['discount'], $payment['currency'] ) ); ?></td></tr>
			<?php endif; ?>
			<tr class="mg-total"><th><?php esc_html_e( 'Total', 'memberglut' ); ?></th><td><?php echo esc_html( memberglut_format_price( $payment['amount'], $payment['currency'] ) ); ?></td></tr>
			<tr><th><?php esc_html_e( 'Payment method', 'memberglut' ); ?></th><td><?php echo esc_html( $gateway ? $gateway->title() : $payment['gateway'] ); ?></td></tr>
			<tr><th><?php esc_html_e( 'Status', 'memberglut' ); ?></th><td><?php echo esc_html( isset( $memberglut_status[ $payment['status'] ] ) ? $memberglut_status[ $payment['status'] ] : $payment['status'] ); ?></td></tr>
		</tbody>
	</table>
	<?php if ( memberglut_page_url( 'account' ) && is_user_logged_in() ) : ?>
		<p><a class="mg-button" href="<?php echo esc_url( memberglut_page_url( 'account' ) ); ?>"><?php esc_html_e( 'Go to my account', 'memberglut' ); ?></a></p>
	<?php endif; ?>
</div>
