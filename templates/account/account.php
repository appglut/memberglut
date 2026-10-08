<?php
/**
 * My account layout. Override in yourtheme/memberglut/account/account.php.
 *
 * @package MemberGlut
 *
 * @var WP_User $user    Member.
 * @var array   $tabs    key => label.
 * @var array   $urls    key => URL.
 * @var string  $current Current tab.
 * @var string  $notice  Notices HTML.
 * @var string  $content Tab HTML.
 * @var string  $logout  Logout URL.
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="mg-account" data-tab="<?php echo esc_attr( $current ); ?>">
	<nav class="mg-account-nav" aria-label="<?php esc_attr_e( 'Account', 'memberglut' ); ?>">
		<div class="mg-account-user">
			<?php echo get_avatar( $user->ID, 48 ); ?>
			<span><?php echo esc_html( $user->display_name ); ?></span>
		</div>
		<ul>
			<?php foreach ( $tabs as $memberglut_key => $memberglut_label ) : ?>
				<li class="<?php echo $memberglut_key === $current ? 'is-active' : ''; ?>"><a href="<?php echo esc_url( $urls[ $memberglut_key ] ); ?>"<?php echo $memberglut_key === $current ? ' aria-current="page"' : ''; ?>><?php echo esc_html( $memberglut_label ); ?></a></li>
			<?php endforeach; ?>
			<li class="mg-account-logout"><a href="<?php echo esc_url( $logout ); ?>"><?php esc_html_e( 'Log out', 'memberglut' ); ?></a></li>
		</ul>
	</nav>
	<div class="mg-account-content">
		<?php echo $notice; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Built with escaping. ?>
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Templates escape their output. ?>
	</div>
</div>
