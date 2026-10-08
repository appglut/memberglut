<?php
/**
 * Account › Delete account. Override in yourtheme/memberglut/account/delete.php.
 *
 * @package MemberGlut
 *
 * @var WP_User $user   Member.
 * @var array   $errors Field errors.
 * @var string  $hidden Hidden fields.
 */

defined( 'ABSPATH' ) || exit;
?>
<h2 class="mg-account-title"><?php esc_html_e( 'Delete account', 'memberglut' ); ?></h2>
<p><?php esc_html_e( 'Deleting your account ends your memberships and recurring payments right away and removes your profile. This cannot be undone.', 'memberglut' ); ?></p>
<form class="mg-form" method="post" data-mg-form="account_delete" data-mg-confirm="<?php esc_attr_e( 'Delete your account for good?', 'memberglut' ); ?>">
	<?php echo $hidden; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped. ?>
	<input type="text" name="username" value="<?php echo esc_attr( $user->user_login ); ?>" autocomplete="username" hidden>
	<div class="mg-field<?php echo isset( $errors['password'] ) ? ' has-error' : ''; ?>" data-field="password">
		<label for="mg-delete-password"><?php esc_html_e( 'Your password', 'memberglut' ); ?></label>
		<span class="mg-password"><input type="password" id="mg-delete-password" name="password" autocomplete="current-password" required></span>
		<span class="mg-field-error" role="alert"><?php echo isset( $errors['password'] ) ? esc_html( $errors['password'] ) : ''; ?></span>
	</div>
	<div class="mg-field mg-type-checkbox<?php echo isset( $errors['confirm'] ) ? ' has-error' : ''; ?>" data-field="confirm">
		<label class="mg-check"><input type="checkbox" name="confirm" value="1" required> <?php esc_html_e( 'I understand that my account and memberships will be deleted.', 'memberglut' ); ?></label>
		<span class="mg-field-error" role="alert"><?php echo isset( $errors['confirm'] ) ? esc_html( $errors['confirm'] ) : ''; ?></span>
	</div>
	<div class="mg-actions">
		<button type="submit" class="mg-button mg-button-danger"><?php esc_html_e( 'Delete my account', 'memberglut' ); ?></button>
	</div>
</form>
