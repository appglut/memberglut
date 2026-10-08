<?php
/**
 * Set a new password (from the reset link). Override in yourtheme/memberglut/forms/reset-password.php.
 *
 * @package MemberGlut
 *
 * @var string $notice Notices HTML.
 * @var bool   $valid  The link is valid.
 * @var string $key    Reset key.
 * @var string $login  User login.
 * @var array  $errors Field errors.
 * @var string $hidden Hidden fields.
 * @var string $lost   Request-a-new-link URL.
 * @var string $pass   New password field HTML.
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="mg-form-wrap mg-reset">
	<h2 class="mg-form-title"><?php esc_html_e( 'Choose a new password', 'memberglut' ); ?></h2>
	<?php echo $notice; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Built with escaping. ?>
	<?php if ( ! $valid ) : ?>
		<div class="mg-notice mg-notice-error" role="alert"><?php esc_html_e( 'This password reset link is invalid or has expired.', 'memberglut' ); ?></div>
		<p><a class="mg-button" href="<?php echo esc_url( $lost ); ?>"><?php esc_html_e( 'Request a new link', 'memberglut' ); ?></a></p>
	<?php else : ?>
		<form class="mg-form" method="post" data-mg-form="reset_password" data-mg-ajax="1">
			<?php echo $hidden; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped. ?>
			<input type="hidden" name="key" value="<?php echo esc_attr( $key ); ?>">
			<input type="hidden" name="login" value="<?php echo esc_attr( $login ); ?>">
			<?php echo str_replace( array( 'name="mgreset[password]"', 'data-field="password"' ), array( 'name="pass1"', 'data-field="pass1"' ), $pass ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in MemberGlut_Fields::render(). ?>
			<div class="mg-field" data-field="pass2">
				<label for="mg-pass2"><?php esc_html_e( 'Confirm new password', 'memberglut' ); ?></label>
				<input type="password" id="mg-pass2" name="pass2" autocomplete="new-password" required>
				<span class="mg-field-error" role="alert"><?php echo isset( $errors['pass2'] ) ? esc_html( $errors['pass2'] ) : ''; ?></span>
			</div>
			<div class="mg-actions">
				<button type="submit" class="mg-button mg-submit" data-mg-label="<?php esc_attr_e( 'Save password', 'memberglut' ); ?>"><?php esc_html_e( 'Save password', 'memberglut' ); ?></button>
			</div>
		</form>
	<?php endif; ?>
</div>
