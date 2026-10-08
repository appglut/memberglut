<?php
/**
 * Account › Profile. Override in yourtheme/memberglut/account/profile.php.
 *
 * @package MemberGlut
 *
 * @var WP_User $user      Member.
 * @var string  $fields    Profile fields HTML (Forms › Profile form).
 * @var array   $errors    Field errors.
 * @var string  $pending   New email waiting for confirmation.
 * @var bool    $directory Listed in the member directory.
 * @var string  $hidden    Hidden fields.
 * @var string  $cancel    Hidden fields of the “cancel email change” form.
 */

defined( 'ABSPATH' ) || exit;
?>
<h2 class="mg-account-title"><?php esc_html_e( 'Profile', 'memberglut' ); ?></h2>
<form class="mg-form" method="post" data-mg-form="account_profile">
	<?php echo $hidden; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped. ?>
	<div class="mg-field mg-field-email<?php echo isset( $errors['email'] ) ? ' has-error' : ''; ?>" data-field="email">
		<label for="mg-account-email"><?php esc_html_e( 'Email address', 'memberglut' ); ?> <span class="mg-req" aria-hidden="true">*</span></label>
		<input type="email" id="mg-account-email" name="mg[email]" value="<?php echo esc_attr( $user->user_email ); ?>" autocomplete="email" required>
		<?php if ( $pending ) : ?>
			<span class="mg-help">
				<?php
				/* translators: %s: email address */
				echo esc_html( sprintf( __( 'Waiting for confirmation of %s.', 'memberglut' ), $pending ) );
				?>
				<button type="submit" form="mg-cancel-email" class="mg-link-button"><?php esc_html_e( 'Cancel the change', 'memberglut' ); ?></button>
			</span>
		<?php endif; ?>
		<span class="mg-field-error" role="alert"><?php echo isset( $errors['email'] ) ? esc_html( $errors['email'] ) : ''; ?></span>
	</div>
	<?php echo $fields; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped when built. ?>
	<div class="mg-field mg-type-checkbox" data-field="directory">
		<label class="mg-check"><input type="checkbox" name="directory" value="1" <?php checked( $directory ); ?>> <?php esc_html_e( 'Show my name and picture in the member directory', 'memberglut' ); ?></label>
	</div>
	<div class="mg-actions">
		<button type="submit" class="mg-button mg-submit" data-mg-label="<?php esc_attr_e( 'Save changes', 'memberglut' ); ?>"><?php esc_html_e( 'Save changes', 'memberglut' ); ?></button>
	</div>
</form>
<?php if ( $pending ) : ?>
	<form id="mg-cancel-email" method="post" hidden><?php echo $cancel; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped. ?></form>
<?php endif; ?>
