<?php
/**
 * Account › Payments and [memberglut_payments]. Override in yourtheme/memberglut/account/payments.php.
 *
 * @package MemberGlut
 *
 * @var array[] $rows payment (row), plan (name), receipt (URL).
 */

defined( 'ABSPATH' ) || exit;

$memberglut_labels = array(
	'completed' => __( 'Paid', 'memberglut' ),
	'pending'   => __( 'Waiting for payment', 'memberglut' ),
	'failed'    => __( 'Failed', 'memberglut' ),
	'refunded'  => __( 'Refunded', 'memberglut' ),
);
?>
<h2 class="mg-account-title"><?php esc_html_e( 'Payments', 'memberglut' ); ?></h2>
<?php if ( ! $rows ) : ?>
	<p><?php esc_html_e( 'No payments yet.', 'memberglut' ); ?></p>
<?php else : ?>
	<div class="mg-table-scroll">
		<table class="mg-table">
			<thead>
				<tr>
					<th><?php esc_html_e( 'Date', 'memberglut' ); ?></th>
					<th><?php esc_html_e( 'Plan', 'memberglut' ); ?></th>
					<th><?php esc_html_e( 'Amount', 'memberglut' ); ?></th>
					<th><?php esc_html_e( 'Status', 'memberglut' ); ?></th>
					<th><span class="screen-reader-text"><?php esc_html_e( 'Receipt', 'memberglut' ); ?></span></th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ( $rows as $memberglut_r ) : ?>
					<?php $memberglut_p = $memberglut_r['payment']; ?>
					<tr>
						<td><?php echo esc_html( memberglut_format_date( $memberglut_p['created_at'] ) ); ?></td>
						<td><?php echo esc_html( $memberglut_r['plan'] ); ?></td>
						<td><?php echo esc_html( memberglut_format_price( $memberglut_p['amount'], $memberglut_p['currency'] ) ); ?></td>
						<td><span class="mg-badge mg-badge-<?php echo esc_attr( $memberglut_p['status'] ); ?>"><?php echo esc_html( isset( $memberglut_labels[ $memberglut_p['status'] ] ) ? $memberglut_labels[ $memberglut_p['status'] ] : $memberglut_p['status'] ); ?></span></td>
						<td><?php if ( $memberglut_r['receipt'] && in_array( $memberglut_p['status'], array( 'completed', 'pending', 'refunded' ), true ) ) : ?><a href="<?php echo esc_url( $memberglut_r['receipt'] ); ?>"><?php esc_html_e( 'Receipt', 'memberglut' ); ?></a><?php endif; ?></td>
					</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	</div>
<?php endif; ?>
