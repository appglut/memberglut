<?php
/**
 * Example Pro Extension for MemberGlut
 * This file demonstrates how Pro features can extend the base plugin
 *
 * @package MemberGlut Pro
 * @since 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// This file would be included in the Pro version plugin

/**
 * Example: Advanced Role Creation Hook
 */
add_action( 'memberglut_before_role_creation', function( $role_slug, $role_name, $capabilities, $description ) {
	// Pro feature: Log role creation with additional metadata
	if ( function_exists( 'error_log' ) && WP_DEBUG === true ) {
		error_log( sprintf( 'Pro: Creating role %s with advanced logging', sanitize_text_field( $role_name ) ) ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
	}

	// Pro feature: Send notification to admin
	$admin_email = get_option( 'admin_email' );
	if ( is_email( $admin_email ) ) {
		wp_mail(
			$admin_email,
			sprintf( 'New Role Created: %s', sanitize_text_field( $role_name ) ),
			sprintf( 'Role "%s" was created with %d capabilities.', sanitize_text_field( $role_name ), intval( count( $capabilities ) ) )
		);
	}
} );

/**
 * Example: Enhanced Content Restriction
 */
add_filter( 'memberglut_restriction_message', function( $message, $post_id ) {
	// Pro feature: Add time-based restrictions
	$restriction_start = get_post_meta( $post_id, '_memberglut_pro_restriction_start', true );
	$restriction_end   = get_post_meta( $post_id, '_memberglut_pro_restriction_end', true );

	if ( $restriction_start && $restriction_end ) {
		$current_time = current_time( 'timestamp' );
		$start_time   = strtotime( $restriction_start );
		$end_time     = strtotime( $restriction_end );

		if ( $current_time < $start_time ) {
			$message .= '<p><strong>Available from:</strong> ' . esc_html( date_i18n( get_option( 'date_format' ), $start_time ) ) . '</p>';
		} elseif ( $current_time > $end_time ) {
			$message .= '<p><strong>This content has expired.</strong></p>';
		}
	}

	return $message;
}, 10, 2 );

/**
 * Example: Register Pro Features
 */
add_action( 'memberglut_init', function() {
	$extensions = MemberGlut_Extensions::get_instance();

	// Register time-based restrictions feature
	$extensions->register_feature( 'time_based_restrictions', array(
		'name'        => __( 'Time-Based Restrictions', 'memberglut' ),
		'description' => __( 'Restrict content based on date and time ranges', 'memberglut' ),
		'type'        => 'pro',
		'status'      => 'active',
		'version'     => '1.0.0',
		'callback'    => 'memberglut_pro_init_time_restrictions',
	) );

	// Register advanced analytics feature
	$extensions->register_feature( 'advanced_analytics', array(
		'name'        => __( 'Advanced Analytics', 'memberglut' ),
		'description' => __( 'Detailed member activity and content access reports', 'memberglut' ),
		'type'        => 'pro',
		'status'      => 'active',
		'version'     => '1.0.0',
		'class'       => 'MemberGlut_Pro_Analytics',
		'file'        => 'pro/class-memberglut-pro-analytics.php',
	) );
} );

/**
 * Example: Pro-only admin tab
 */
add_action( 'memberglut_after_content_restricted', function( $post_id, $restriction_message ) {
	// Pro feature: Track restriction events for analytics
	global $wpdb;

	$table_name = $wpdb->prefix . 'memberglut_pro_restriction_logs';

	// Sanitize and validate server variables
	$ip_address = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
	$user_agent = isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '';

	// Insert with proper sanitization
	// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery -- Example code for demonstration purposes.
	$wpdb->insert(
		$table_name,
		array(
			'post_id'    => intval( $post_id ),
			'user_id'    => intval( get_current_user_id() ),
			'ip_address' => $ip_address,
			'user_agent' => $user_agent,
			'timestamp'  => current_time( 'mysql' ),
		),
		array( '%d', '%d', '%s', '%s', '%s' )
	);
} );

/**
 * Example: Override free version limitations
 */
add_filter( 'memberglut_is_pro_active', '__return_true' );

/**
 * Example: Add Pro-specific capabilities
 */
add_filter( 'memberglut_available_capabilities', function( $capabilities ) {
	$pro_capabilities = array(
		'memberglut_pro_analytics_access'       => __( 'Access Pro Analytics', 'memberglut' ),
		'memberglut_pro_bulk_operations'        => __( 'Bulk Member Operations', 'memberglut' ),
		'memberglut_pro_advanced_restrictions'  => __( 'Advanced Content Restrictions', 'memberglut' ),
		'memberglut_pro_email_campaigns'        => __( 'Email Campaign Management', 'memberglut' ),
		'memberglut_pro_export_data'            => __( 'Export Member Data', 'memberglut' ),
	);

	return array_merge( $capabilities, $pro_capabilities );
} );

/**
 * Example: Add Pro settings to roles page
 */
add_action( 'memberglut_after_role_created', function( $role_slug, $role_name, $capabilities, $description ) {
	// Pro feature: Set up default expiration settings for new roles
	$default_expiration = get_option( 'memberglut_pro_default_expiration', 365 ); // days
	update_option( 'memberglut_pro_role_expiration_' . sanitize_key( $role_slug ), intval( $default_expiration ) );
} );

/**
 * Example Pro function that can be called
 */
function memberglut_pro_init_time_restrictions() {
	// Initialize time-based restrictions functionality
	add_action( 'wp_enqueue_scripts', function() {
		// Enqueue inline JavaScript for client-side time checking
		$js_code = '// Pro feature: Real-time content unlocking
		setInterval(function() {
			// Check if any time-restricted content should now be available
			// This would make AJAX calls to check restriction status
		}, 60000); // Check every minute';

		wp_add_inline_script( 'jquery', $js_code );
	} );
}

/**
 * Example: Pro shortcode
 */
add_action( 'memberglut_register_pro_shortcodes', function() {
	add_shortcode( 'memberglut_pro_analytics', function( $atts ) {
		$atts = shortcode_atts( array(
			'type'   => 'member_growth',
			'period' => '30_days',
		), $atts );

		// Pro feature: Display analytics charts
		return '<div class="memberglut-pro-analytics" data-type="' . esc_attr( $atts['type'] ) . '" data-period="' . esc_attr( $atts['period'] ) . '">Loading analytics...</div>';
	} );
} );
