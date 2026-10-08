<?php
/**
 * Account › Payments and [memberglut_payments]. Override in yourtheme/memberglut/account/payments.php.
 *
 * @package MemberGlut
 *
 * @var array[] $rows payment (row), plan (name), receipt (URL).
 */

defined( 'ABSPATH' ) || exit;

$labels = array(
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
				<?php foreach ( $rows as $r ) : ?>
					<?php $p = $r['payment']; ?>
					<tr>
						<td><?php echo esc_html( memberglut_format_date( $p['created_at'] ) ); ?></td>
						<td><?php echo esc_html( $r['plan'] ); ?></td>
						<td><?php echo esc_html( memberglut_format_price( $p['amount'], $p['currency'] ) ); ?></td>
						<td><span class="mg-badge mg-badge-<?php echo esc_attr( $p['status'] ); ?>"><?php echo esc_html( isset( $labels[ $p['status'] ] ) ? $labels[ $p['status'] ] : $p['status'] ); ?></span></td>
						<td><?php if ( $r['receipt'] && in_array( $p['status'], array( 'completed', 'pending', 'refunded' ), true ) ) : ?><a href="<?php echo esc_url( $r['receipt'] ); ?>"><?php esc_html_e( 'Receipt', 'memberglut' ); ?></a><?php endif; ?></td>
					</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	</div>
<?php endif; ?>
