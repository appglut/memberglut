<?php
/**
 * Account › Password. Override in yourtheme/memberglut/account/password.php.
 *
 * @package MemberGlut
 *
 * @var WP_User $user   Member.
 * @var string  $fields New password fields HTML.
 * @var array   $errors Field errors.
 * @var string  $hidden Hidden fields.
 */

defined( 'ABSPATH' ) || exit;
?>
<h2 class="mg-account-title"><?php esc_html_e( 'Change password', 'memberglut' ); ?></h2>
<form class="mg-form" method="post" data-mg-form="account_password">
	<?php echo $hidden; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped. ?>
	<input type="text" name="username" value="<?php echo esc_attr( $user->user_login ); ?>" autocomplete="username" hidden>
	<div class="mg-field<?php echo isset( $errors['current_password'] ) ? ' has-error' : ''; ?>" data-field="current_password">
		<label for="mg-current-password"><?php esc_html_e( 'Current password', 'memberglut' ); ?></label>
		<span class="mg-password"><input type="password" id="mg-current-password" name="current_password" autocomplete="current-password" required></span>
		<span class="mg-field-error" role="alert"><?php echo isset( $errors['current_password'] ) ? esc_html( $errors['current_password'] ) : ''; ?></span>
	</div>
	<?php echo $fields; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped when built. ?>
	<div class="mg-actions">
		<button type="submit" class="mg-button mg-submit" data-mg-label="<?php esc_attr_e( 'Change password', 'memberglut' ); ?>"><?php esc_html_e( 'Change password', 'memberglut' ); ?></button>
	</div>
</form>
