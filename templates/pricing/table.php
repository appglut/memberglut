<?php
/**
 * Pricing table. Override in yourtheme/memberglut/pricing/table.php.
 *
 * @package MemberGlut
 *
 * @var array[] $rows     [ plan, button ].
 * @var string  $layout   cards|compare|list.
 * @var int     $columns  Columns (cards).
 * @var bool    $features Show feature lists.
 * @var bool    $dark     Dark style.
 */

defined( 'ABSPATH' ) || exit;

if ( ! $rows ) {
	echo '<p class="mg-pricing-empty">' . esc_html__( 'No plans are available at the moment.', 'memberglut' ) . '</p>';
	return;
}

$memberglut_button = static function ( $b ) {
	if ( ! $b['url'] ) {
		return '<span class="mg-button is-disabled is-' . esc_attr( $b['state'] ) . '" aria-disabled="true">' . esc_html( $b['label'] ) . '</span>' . ( $b['note'] ? '<span class="mg-help">' . esc_html( $b['note'] ) . '</span>' : '' );
	}
	return '<a class="mg-button is-' . esc_attr( $b['state'] ) . '" href="' . esc_url( $b['url'] ) . '">' . esc_html( $b['label'] ) . '</a>';
};
$memberglut_price = static function ( $memberglut_p ) {
	if ( 'free' === $memberglut_p['type'] || $memberglut_p['price'] <= 0 ) {
		return '<span class="mg-amount">' . esc_html__( 'Free', 'memberglut' ) . '</span>';
	}
	$period = 'recurring' === $memberglut_p['billing'] ? '<span class="mg-period">/ ' . esc_html( MemberGlut_Plans::period_label( $memberglut_p['duration'] ) ) . '</span>' : '<span class="mg-period">' . esc_html( MemberGlut_Plans::access_label( $memberglut_p ) ) . '</span>';
	return '<span class="mg-amount">' . esc_html( memberglut_format_price( $memberglut_p['price'] ) ) . '</span> ' . $period;
};
$memberglut_class = 'mg-pricing mg-pricing-' . $layout . ( $dark ? ' is-dark' : '' );

if ( 'compare' === $layout ) :
	$memberglut_all = array();
	foreach ( $rows as $memberglut_r ) {
		foreach ( (array) $memberglut_r['plan']['features'] as $memberglut_f ) {
			$memberglut_all[ $memberglut_f ] = true;
		}
	}
	?>
	<div class="<?php echo esc_attr( $memberglut_class ); ?>">
		<table>
			<thead>
				<tr>
					<th></th>
					<?php foreach ( $rows as $memberglut_r ) : ?>
						<th class="<?php echo $memberglut_r['plan']['featured'] ? 'is-featured' : ''; ?>" style="--c:<?php echo esc_attr( $memberglut_r['plan']['color'] ); ?>">
							<?php if ( $memberglut_r['plan']['featured'] ) : ?><span class="mg-ribbon"><?php esc_html_e( 'Most popular', 'memberglut' ); ?></span><?php endif; ?>
							<strong><?php echo esc_html( $memberglut_r['plan']['name'] ); ?></strong>
							<div class="mg-price"><?php echo wp_kses_post( $memberglut_price( $memberglut_r['plan'] ) ); ?></div>
						</th>
					<?php endforeach; ?>
				</tr>
			</thead>
			<tbody>
				<?php foreach ( array_keys( $memberglut_all ) as $memberglut_feature ) : ?>
					<tr>
						<th scope="row"><?php echo esc_html( $memberglut_feature ); ?></th>
						<?php foreach ( $rows as $memberglut_r ) : ?>
							<td><?php echo in_array( $memberglut_feature, (array) $memberglut_r['plan']['features'], true ) ? '<span class="mg-yes" aria-label="' . esc_attr__( 'Included', 'memberglut' ) . '">✓</span>' : '<span class="mg-no" aria-label="' . esc_attr__( 'Not included', 'memberglut' ) . '">—</span>'; ?></td>
						<?php endforeach; ?>
					</tr>
				<?php endforeach; ?>
				<tr class="mg-buttons">
					<th></th>
					<?php foreach ( $rows as $memberglut_r ) : ?>
						<td><?php echo $memberglut_button( $memberglut_r['button'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in the closure. ?></td>
					<?php endforeach; ?>
				</tr>
			</tbody>
		</table>
	</div>
<?php else : ?>
	<div class="<?php echo esc_attr( $memberglut_class ); ?>" style="--mg-cols:<?php echo esc_attr( 'list' === $layout ? 1 : $columns ); ?>">
		<?php foreach ( $rows as $memberglut_r ) : $memberglut_p = $memberglut_r['plan']; // phpcs:ignore Squiz.ControlStructures.ControlSignature.NewlineAfterOpenBrace ?>
			<div class="mg-plan<?php echo $memberglut_p['featured'] ? ' is-featured' : ''; ?><?php echo 'current' === $memberglut_r['button']['state'] ? ' is-current' : ''; ?>" style="--c:<?php echo esc_attr( $memberglut_p['color'] ); ?>">
				<?php if ( $memberglut_p['featured'] ) : ?><span class="mg-ribbon"><?php esc_html_e( 'Most popular', 'memberglut' ); ?></span><?php endif; ?>
				<div class="mg-plan-head">
					<h3 class="mg-plan-name"><?php echo esc_html( $memberglut_p['name'] ); ?></h3>
					<div class="mg-price"><?php echo wp_kses_post( $memberglut_price( $memberglut_p ) ); ?></div>
					<?php if ( 'paid' === $memberglut_p['type'] && $memberglut_p['trial'] ) : ?>
						<div class="mg-plan-trial"><?php echo esc_html( sprintf( /* translators: %s: trial length */ __( '%s free trial', 'memberglut' ), MemberGlut_Plans::period_label( $memberglut_p['trial_length'] ) ) ); ?></div>
					<?php endif; ?>
					<?php if ( $memberglut_p['signup_fee'] > 0 ) : ?>
						<div class="mg-plan-fee"><?php echo esc_html( sprintf( /* translators: %s: amount */ __( '+ %s sign-up fee', 'memberglut' ), memberglut_format_price( $memberglut_p['signup_fee'] ) ) ); ?></div>
					<?php endif; ?>
				</div>
				<?php if ( $memberglut_p['description'] ) : ?>
					<p class="mg-plan-desc"><?php echo esc_html( $memberglut_p['description'] ); ?></p>
				<?php endif; ?>
				<?php if ( $features && $memberglut_p['features'] ) : ?>
					<ul class="mg-plan-features">
						<?php foreach ( $memberglut_p['features'] as $memberglut_f ) : ?>
							<li><?php echo esc_html( $memberglut_f ); ?></li>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>
				<div class="mg-plan-cta"><?php echo $memberglut_button( $memberglut_r['button'] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in the closure. ?></div>
			</div>
		<?php endforeach; ?>
	</div>
<?php endif; ?>
