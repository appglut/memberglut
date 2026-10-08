<?php
/**
 * Restricted content box: teaser, message and (optionally) the login form.
 *
 * Override it by copying this file to yourtheme/memberglut/restriction/message.php.
 *
 * @package MemberGlut
 *
 * @var string       $teaser   Teaser HTML.
 * @var string       $message  Message HTML (tags replaced, kses'd).
 * @var string       $form     Login form HTML.
 * @var array        $decision Access decision.
 * @var WP_Post|null $post     Post.
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="memberglut-restricted">
	<?php echo wp_kses_post( $teaser ); ?>
	<div class="memberglut-paywall">
		<span class="memberglut-paywall-icon" aria-hidden="true">
			<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/></svg>
		</span>
		<div class="memberglut-paywall-message"><?php echo wp_kses_post( $message ); ?></div>
		<?php if ( $form ) : ?>
			<div class="memberglut-paywall-form"><?php echo $form; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Form markup built and escaped by MemberGlut_Shortcodes::login(). ?></div>
		<?php endif; ?>
	</div>
</div>
