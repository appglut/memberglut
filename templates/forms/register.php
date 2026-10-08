<?php
/**
 * Registration / checkout form. Override in yourtheme/memberglut/forms/register.php.
 *
 * @package MemberGlut
 *
 * @var int        $user_id    Logged-in user (0 = visitor).
 * @var array[]    $fields     Account fields.
 * @var array      $values     Submitted values.
 * @var array      $errors     Field errors.
 * @var string     $notice     Notices HTML.
 * @var array|null $plan       Preselected plan.
 * @var array[]    $plans      Plans for the picker.
 * @var string     $plan_error Why the requested plan is not available.
 * @var string     $picker     cards|radio|select.
 * @var string     $title      Title.
 * @var string     $button     Button text.
 * @var string     $login_link Login link HTML.
 * @var string     $agreements Agreements HTML.
 * @var string     $checkout   Payment section HTML.
 * @var string     $guard      Honeypot / captcha HTML.
 * @var string     $hidden     Hidden fields.
 * @var bool       $ajax       Submit with JavaScript.
 * @var string     $selected   Selected plan ID.
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="mg-form-wrap mg-register">
	<?php if ( $title ) : ?>
		<h2 class="mg-form-title"><?php echo esc_html( $title ); ?></h2>
	<?php endif; ?>
	<?php echo $notice; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Built with escaping in MemberGlut_Shortcodes::notice(). ?>
	<?php if ( $plan_error ) : ?>
		<div class="mg-notice mg-notice-error" role="alert"><?php echo esc_html( $plan_error ); ?></div>
	<?php endif; ?>
	<form class="mg-form" method="post" novalidate data-mg-form="register"<?php echo $ajax ? ' data-mg-ajax="1"' : ''; ?>>
		<?php echo $hidden; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in form_hidden(). ?>

		<?php if ( $plan ) : ?>
			<input type="hidden" name="plan" value="<?php echo esc_attr( $plan['id'] ); ?>" data-mg-plan-type="<?php echo esc_attr( $plan['type'] ); ?>">
			<div class="mg-chosen-plan" style="--c:<?php echo esc_attr( $plan['color'] ); ?>">
				<div><strong><?php echo esc_html( $plan['name'] ); ?></strong> <span class="mg-plan-price"><?php echo esc_html( MemberGlut_Plans::price_label( $plan ) ); ?></span></div>
				<?php if ( $plan['description'] ) : ?>
					<p><?php echo esc_html( $plan['description'] ); ?></p>
				<?php endif; ?>
				<?php if ( count( (array) $plans ) > 1 || memberglut_page_url( 'pricing' ) ) : ?>
					<a class="mg-change-plan" href="<?php echo esc_url( memberglut_page_url( 'pricing' ) ? memberglut_page_url( 'pricing' ) : remove_query_arg( 'plan' ) ); ?>"><?php esc_html_e( 'Change plan', 'memberglut' ); ?></a>
				<?php endif; ?>
			</div>
		<?php elseif ( $plans ) : ?>
			<div class="mg-field mg-plan-picker mg-picker-<?php echo esc_attr( $picker ); ?>" data-field="plan">
				<span class="mg-label"><?php esc_html_e( 'Plan', 'memberglut' ); ?> <span class="mg-req" aria-hidden="true">*</span></span>
				<?php if ( 'select' === $picker ) : ?>
					<select name="plan" required data-mg-plan-select>
						<option value=""><?php esc_html_e( '— Choose a plan —', 'memberglut' ); ?></option>
						<?php foreach ( $plans as $memberglut_p ) : ?>
							<option value="<?php echo esc_attr( $memberglut_p['id'] ); ?>" data-mg-plan-type="<?php echo esc_attr( $memberglut_p['type'] ); ?>" <?php selected( (string) $selected, (string) $memberglut_p['id'] ); ?>><?php echo esc_html( $memberglut_p['name'] . ' — ' . MemberGlut_Plans::price_label( $memberglut_p ) ); ?></option>
						<?php endforeach; ?>
					</select>
				<?php else : ?>
					<div class="mg-plan-options">
						<?php foreach ( $plans as $memberglut_i => $memberglut_p ) : ?>
							<label class="mg-plan-option<?php echo $memberglut_p['featured'] ? ' is-featured' : ''; ?>" style="--c:<?php echo esc_attr( $memberglut_p['color'] ); ?>">
								<input type="radio" name="plan" value="<?php echo esc_attr( $memberglut_p['id'] ); ?>" data-mg-plan-type="<?php echo esc_attr( $memberglut_p['type'] ); ?>" <?php checked( (string) $selected ? (string) $selected : ( 0 === $memberglut_i && 1 === count( $plans ) ? (string) $memberglut_p['id'] : '' ), (string) $memberglut_p['id'] ); ?> required>
								<span class="mg-plan-option-body">
									<strong><?php echo esc_html( $memberglut_p['name'] ); ?></strong>
									<span class="mg-plan-price"><?php echo esc_html( MemberGlut_Plans::price_label( $memberglut_p ) ); ?></span>
									<?php if ( 'cards' === $picker && $memberglut_p['description'] ) : ?>
										<span class="mg-plan-desc"><?php echo esc_html( $memberglut_p['description'] ); ?></span>
									<?php endif; ?>
									<?php if ( 'paid' === $memberglut_p['type'] && $memberglut_p['trial'] ) : ?>
										<span class="mg-plan-trial"><?php echo esc_html( sprintf( /* translators: %s: trial length */ __( '%s free trial', 'memberglut' ), MemberGlut_Plans::period_label( $memberglut_p['trial_length'] ) ) ); ?></span>
									<?php endif; ?>
								</span>
							</label>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>
				<span class="mg-field-error" role="alert"><?php echo isset( $errors['plan'] ) ? esc_html( $errors['plan'] ) : ''; ?></span>
			</div>
		<?php endif; ?>

		<?php if ( $fields ) : ?>
			<div class="mg-fields">
				<?php
				foreach ( $fields as $memberglut_f ) {
					$memberglut_html = MemberGlut_Fields::render( $memberglut_f, isset( $values[ $memberglut_f['key'] ] ) ? $values[ $memberglut_f['key'] ] : '' );
					if ( isset( $errors[ $memberglut_f['key'] ] ) ) {
						$memberglut_html = str_replace( '<span class="mg-field-error" role="alert"></span>', '<span class="mg-field-error" role="alert">' . wp_kses( $errors[ $memberglut_f['key'] ], array( 'a' => array( 'href' => true ) ) ) . '</span>', $memberglut_html );
						$memberglut_html = str_replace( 'class="mg-field ', 'class="mg-field has-error ', $memberglut_html );
					}
					echo $memberglut_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in MemberGlut_Fields::render().
				}
				?>
			</div>
		<?php endif; ?>

		<?php echo $checkout; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in MemberGlut_Checkout::render_section(). ?>
		<?php echo $agreements; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in MemberGlut_Agreements::render(). ?>
		<?php echo $guard; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in MemberGlut_Form_Guard::render(). ?>

		<div class="mg-actions">
			<button type="submit" class="mg-button mg-submit" data-mg-label="<?php echo esc_attr( $button ); ?>"><?php echo esc_html( $button ); ?></button>
		</div>
		<?php echo $login_link; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in login_link(). ?>
	</form>
</div>
