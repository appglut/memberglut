<?php
/**
 * Login form. Override in yourtheme/memberglut/forms/login.php.
 *
 * @package MemberGlut
 *
 * @var string $notice       Notices HTML.
 * @var string $title        Title.
 * @var string $button       Button text.
 * @var string $login_label  Label of the login field.
 * @var string $login_type   text|email.
 * @var string $login_value  Previous value.
 * @var bool   $remember     Show “Remember me”.
 * @var string $lost_url     Lost password URL ('' hides the link).
 * @var string $register_url Registration URL ('' hides the link).
 * @var string $guard        Honeypot / captcha HTML.
 * @var string $hidden       Hidden fields.
 * @var bool   $toggle       Password visibility toggle.
 */

defined( 'ABSPATH' ) || exit;
$memberglut_id = 'mg-login-' . wp_rand( 100, 999 );
?>
<div class="mg-form-wrap mg-login">
	<?php if ( $title ) : ?>
		<h2 class="mg-form-title"><?php echo esc_html( $title ); ?></h2>
	<?php endif; ?>
	<?php echo $notice; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Built with escaping. ?>
	<form class="mg-form" method="post" data-mg-form="login" data-mg-ajax="1">
		<?php echo $hidden; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped. ?>
		<div class="mg-field" data-field="log">
			<label for="<?php echo esc_attr( $memberglut_id ); ?>-user"><?php echo esc_html( $login_label ); ?></label>
			<input type="<?php echo esc_attr( $login_type ); ?>" id="<?php echo esc_attr( $memberglut_id ); ?>-user" name="log" value="<?php echo esc_attr( $login_value ); ?>" autocomplete="username" required>
			<span class="mg-field-error" role="alert"></span>
		</div>
		<div class="mg-field" data-field="pwd">
			<label for="<?php echo esc_attr( $memberglut_id ); ?>-pass"><?php esc_html_e( 'Password', 'memberglut' ); ?></label>
			<span class="mg-password">
				<input type="password" id="<?php echo esc_attr( $memberglut_id ); ?>-pass" name="pwd" autocomplete="current-password" required>
				<?php if ( $toggle ) : ?>
					<button type="button" class="mg-password-toggle" aria-label="<?php esc_attr_e( 'Show password', 'memberglut' ); ?>" data-mg-toggle><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg></button>
				<?php endif; ?>
			</span>
			<span class="mg-field-error" role="alert"></span>
		</div>
		<div class="mg-row">
			<?php if ( $remember ) : ?>
				<label class="mg-check"><input type="checkbox" name="remember" value="1"> <?php esc_html_e( 'Remember me', 'memberglut' ); ?></label>
			<?php endif; ?>
			<?php if ( $lost_url ) : ?>
				<a class="mg-lost-link" href="<?php echo esc_url( $lost_url ); ?>"><?php esc_html_e( 'Lost your password?', 'memberglut' ); ?></a>
			<?php endif; ?>
		</div>
		<?php do_action( 'memberglut_login_form_after_fields' ); ?>
		<?php echo $guard; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped. ?>
		<div class="mg-actions">
			<button type="submit" class="mg-button mg-submit" data-mg-label="<?php echo esc_attr( $button ); ?>"><?php echo esc_html( $button ); ?></button>
		</div>
		<?php if ( $register_url ) : ?>
			<p class="mg-switch"><?php esc_html_e( 'Not a member yet?', 'memberglut' ); ?> <a href="<?php echo esc_url( $register_url ); ?>"><?php esc_html_e( 'Join now', 'memberglut' ); ?></a></p>
		<?php endif; ?>
	</form>
</div>
