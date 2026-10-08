<?php
/**
 * Lost password form. Override in yourtheme/memberglut/forms/lost-password.php.
 *
 * @package MemberGlut
 *
 * @var string $notice Notices HTML.
 * @var string $guard  Honeypot / captcha HTML.
 * @var string $hidden Hidden fields.
 * @var string $login  Login URL.
 * @var bool   $done   The request was sent.
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="mg-form-wrap mg-lost">
	<h2 class="mg-form-title"><?php esc_html_e( 'Reset your password', 'memberglut' ); ?></h2>
	<?php echo $notice; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Built with escaping. ?>
	<?php if ( ! $done ) : ?>
		<form class="mg-form" method="post" data-mg-form="lost_password" data-mg-ajax="1">
			<?php echo $hidden; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped. ?>
			<p class="mg-help"><?php esc_html_e( 'Enter your username or email address. We will email you a link to set a new password.', 'memberglut' ); ?></p>
			<div class="mg-field" data-field="user_login">
				<label for="mg-lost-user"><?php esc_html_e( 'Username or email', 'memberglut' ); ?></label>
				<input type="text" id="mg-lost-user" name="user_login" autocomplete="username" required>
				<span class="mg-field-error" role="alert"></span>
			</div>
			<?php echo $guard; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped. ?>
			<div class="mg-actions">
				<button type="submit" class="mg-button mg-submit" data-mg-label="<?php esc_attr_e( 'Send reset link', 'memberglut' ); ?>"><?php esc_html_e( 'Send reset link', 'memberglut' ); ?></button>
			</div>
		</form>
	<?php endif; ?>
	<p class="mg-switch"><a href="<?php echo esc_url( $login ); ?>"><?php esc_html_e( 'Back to log in', 'memberglut' ); ?></a></p>
</div>
