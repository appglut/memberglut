<?php
/**
 * Full-page wall for protected archives and URL patterns.
 *
 * Override it by copying this file to yourtheme/memberglut/restriction/page.php.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

$memberglut_html = isset( $GLOBALS['memberglut_wall_html'] ) ? $GLOBALS['memberglut_wall_html'] : '';

if ( function_exists( 'wp_is_block_theme' ) && wp_is_block_theme() ) :
	?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class( 'memberglut-wall' ); ?>>
	<?php wp_body_open(); ?>
	<div class="wp-site-blocks">
		<?php block_template_part( 'header' ); ?>
		<main class="memberglut-wall-main" style="max-width:720px;margin:48px auto;padding:0 20px;">
			<?php echo $memberglut_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Built by MemberGlut_Access::render_denied() from escaped parts. ?>
		</main>
		<?php block_template_part( 'footer' ); ?>
	</div>
	<?php wp_footer(); ?>
</body>
</html>
	<?php
else :
	get_header();
	?>
	<main class="memberglut-wall-main" style="max-width:720px;margin:48px auto;padding:0 20px;">
		<?php echo $memberglut_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- See above. ?>
	</main>
	<?php
	get_footer();
endif;
