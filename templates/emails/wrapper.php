<?php
/**
 * HTML wrapper for MemberGlut emails.
 *
 * Override it by copying this file to yourtheme/memberglut/emails/wrapper.php.
 *
 * @package MemberGlut
 *
 * @var string $heading Heading (escaped).
 * @var string $content Body HTML.
 * @var string $logo    Logo URL.
 * @var string $color   Accent colour.
 * @var string $footer  Footer HTML (escaped).
 * @var string $site    Site name.
 * @var string $url     Site URL.
 */

defined( 'ABSPATH' ) || exit;

$memberglut_color = sanitize_hex_color( $color ) ? sanitize_hex_color( $color ) : '#e94560';
?>
<!DOCTYPE html>
<html lang="<?php echo esc_attr( get_bloginfo( 'language' ) ); ?>">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php echo esc_html( wp_strip_all_tags( $heading ) ); ?></title>
<style>
	body { margin: 0; padding: 0; background: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; }
	.mg-wrap { width: 100%; background: #f4f5f7; padding: 32px 12px; box-sizing: border-box; }
	.mg-inner { max-width: 600px; margin: 0 auto; }
	.mg-brand { text-align: center; padding: 0 0 20px; font-size: 20px; font-weight: 700; color: #111827; }
	.mg-brand img { max-height: 56px; max-width: 220px; }
	.mg-card { background: #ffffff; border-radius: 12px; padding: 32px; border-top: 4px solid <?php echo esc_attr( $memberglut_color ); ?>; }
	.mg-card h1 { margin: 0 0 18px; font-size: 22px; line-height: 1.3; color: #111827; }
	.mg-card p { margin: 0 0 14px; font-size: 15px; line-height: 1.6; }
	.mg-card a { color: <?php echo esc_attr( $memberglut_color ); ?>; word-break: break-all; }
	.mg-card a.mg-btn { display: inline-block; background: <?php echo esc_attr( $memberglut_color ); ?>; color: #ffffff !important; text-decoration: none; padding: 11px 22px; border-radius: 8px; font-weight: 600; word-break: normal; }
	.mg-foot { text-align: center; color: #6b7280; font-size: 12.5px; line-height: 1.6; padding: 20px 10px 0; }
</style>
</head>
<body>
	<div class="mg-wrap">
		<div class="mg-inner">
			<div class="mg-brand">
				<a href="<?php echo esc_url( $url ); ?>" style="color:#111827;text-decoration:none">
					<?php if ( $logo ) : ?>
						<img src="<?php echo esc_url( $logo ); ?>" alt="<?php echo esc_attr( $site ); ?>">
					<?php else : ?>
						<?php echo esc_html( $site ); ?>
					<?php endif; ?>
				</a>
			</div>
			<div class="mg-card">
				<h1><?php echo wp_kses_post( $heading ); ?></h1>
				<?php echo wp_kses_post( $content ); ?>
			</div>
			<?php if ( $footer ) : ?>
				<div class="mg-foot"><?php echo wp_kses_post( $footer ); ?></div>
			<?php endif; ?>
		</div>
	</div>
</body>
</html>
