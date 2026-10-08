<?php
/**
 * Core helper functions used across the plugin.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * Read a global setting.
 *
 * @param string $key     Setting key.
 * @param mixed  $default Fallback for unknown keys.
 * @return mixed
 */
function memberglut_setting( $key, $default = null ) {
	return MemberGlut_Settings::get( $key, $default );
}

/**
 * Read a Forms & Pages value.
 *
 * @param string $key     Key.
 * @param mixed  $default Fallback.
 * @return mixed
 */
function memberglut_form_setting( $key, $default = null ) {
	return MemberGlut_Settings::form( $key, $default );
}

/**
 * Supported currencies: code => [ symbol, zero-decimal ].
 *
 * @return array
 */
function memberglut_currencies() {
	return apply_filters(
		'memberglut_currencies',
		array(
			'USD' => array( '$', false ),
			'EUR' => array( '€', false ),
			'GBP' => array( '£', false ),
			'CAD' => array( 'CA$', false ),
			'AUD' => array( 'A$', false ),
			'NZD' => array( 'NZ$', false ),
			'CHF' => array( 'CHF', false ),
			'SEK' => array( 'kr', false ),
			'NOK' => array( 'kr', false ),
			'DKK' => array( 'kr', false ),
			'PLN' => array( 'zł', false ),
			'CZK' => array( 'Kč', false ),
			'INR' => array( '₹', false ),
			'BDT' => array( '৳', false ),
			'PKR' => array( '₨', false ),
			'SGD' => array( 'S$', false ),
			'HKD' => array( 'HK$', false ),
			'MYR' => array( 'RM', false ),
			'IDR' => array( 'Rp', false ),
			'ZAR' => array( 'R', false ),
			'BRL' => array( 'R$', false ),
			'MXN' => array( 'MX$', false ),
			'AED' => array( 'د.إ', false ),
			'SAR' => array( '﷼', false ),
			'QAR' => array( 'QR', false ),
			'KWD' => array( 'KD', false ),
			'TRY' => array( '₺', false ),
			'EGP' => array( 'E£', false ),
			'NGN' => array( '₦', false ),
			'JPY' => array( '¥', true ),
			'KRW' => array( '₩', true ),
		)
	);
}

/**
 * Whether a currency has no minor unit (JPY, KRW).
 *
 * @param string $currency Currency code.
 * @return bool
 */
function memberglut_is_zero_decimal( $currency = '' ) {
	$currency = $currency ? strtoupper( $currency ) : memberglut_setting( 'currency', 'USD' );
	$list     = memberglut_currencies();
	return isset( $list[ $currency ] ) && $list[ $currency ][1];
}

/**
 * Number of decimals used for a currency.
 *
 * @param string $currency Currency code.
 * @return int
 */
function memberglut_currency_decimals( $currency = '' ) {
	return memberglut_is_zero_decimal( $currency ) ? 0 : (int) memberglut_setting( 'decimals', 2 );
}

/**
 * Currency symbol.
 *
 * @param string $currency Currency code.
 * @return string
 */
function memberglut_currency_symbol( $currency = '' ) {
	$currency = $currency ? strtoupper( $currency ) : memberglut_setting( 'currency', 'USD' );
	$list     = memberglut_currencies();
	return isset( $list[ $currency ] ) ? $list[ $currency ][0] : $currency;
}

/**
 * Format an amount with the store currency settings (plain text, not escaped).
 *
 * @param float  $amount   Amount.
 * @param string $currency Currency code (defaults to the store currency).
 * @return string
 */
function memberglut_format_price( $amount, $currency = '' ) {
	$currency = $currency ? strtoupper( $currency ) : memberglut_setting( 'currency', 'USD' );
	$number   = number_format( (float) $amount, memberglut_currency_decimals( $currency ), memberglut_setting( 'decimal_sep', '.' ), memberglut_setting( 'thousand_sep', ',' ) );
	$symbol   = memberglut_currency_symbol( $currency );
	switch ( memberglut_setting( 'currency_position', 'before' ) ) {
		case 'before_space':
			$out = $symbol . ' ' . $number;
			break;
		case 'after':
			$out = $number . $symbol;
			break;
		case 'after_space':
			$out = $number . ' ' . $symbol;
			break;
		default:
			$out = $symbol . $number;
	}
	return apply_filters( 'memberglut_format_price', $out, $amount, $currency );
}

/**
 * Round an amount to the currency precision.
 *
 * @param float  $amount   Amount.
 * @param string $currency Currency.
 * @return float
 */
function memberglut_round( $amount, $currency = '' ) {
	return round( (float) $amount, memberglut_is_zero_decimal( $currency ) ? 0 : 2 );
}

/**
 * Amount in minor units (cents) for gateways.
 *
 * @param float  $amount   Amount.
 * @param string $currency Currency.
 * @return int
 */
function memberglut_to_minor( $amount, $currency = '' ) {
	return (int) round( (float) $amount * ( memberglut_is_zero_decimal( $currency ) ? 1 : 100 ) );
}

/**
 * Current time in UTC, MySQL format.
 *
 * @return string
 */
function memberglut_now() {
	return gmdate( 'Y-m-d H:i:s' );
}

/**
 * Convert a UTC MySQL date to a site-local formatted date.
 *
 * @param string|null $utc    UTC date.
 * @param string      $format PHP date format (default: site date format).
 * @return string
 */
function memberglut_format_date( $utc, $format = '' ) {
	if ( empty( $utc ) || '0000-00-00 00:00:00' === $utc ) {
		return '';
	}
	$ts = strtotime( $utc . ' UTC' );
	return $ts ? wp_date( $format ? $format : get_option( 'date_format' ), $ts ) : '';
}

/**
 * Add a duration to a UTC date.
 *
 * @param string $utc    Start (UTC, MySQL format).
 * @param int    $length Length.
 * @param string $unit   day|week|month|year.
 * @return string UTC MySQL date.
 */
function memberglut_add_duration( $utc, $length, $unit ) {
	$units = array( 'day' => 'days', 'week' => 'weeks', 'month' => 'months', 'year' => 'years' );
	$unit  = isset( $units[ $unit ] ) ? $units[ $unit ] : 'days';
	$date  = new DateTime( $utc, new DateTimeZone( 'UTC' ) );
	$date->modify( '+' . max( 0, (int) $length ) . ' ' . $unit );
	return $date->format( 'Y-m-d H:i:s' );
}

/**
 * Write a debug log line (only when the debug log is on).
 *
 * @param string $level   debug|info|warning|error.
 * @param string $source  subscription|payment|access|email|login|cron|webhook|system.
 * @param string $message Message.
 * @param array  $context Extra data.
 * @return void
 */
function memberglut_log( $level, $source, $message, $context = array() ) {
	MemberGlut_Logger::log( $level, $source, $message, $context );
}

/**
 * Record an audit event (always stored).
 *
 * @param string $event       Event type (grant, revoke, payment, …).
 * @param string $message     Human readable text.
 * @param array  $args        user_id, object_type, object_id, actor_id, data.
 * @return int Event ID.
 */
function memberglut_event( $event, $message, $args = array() ) {
	return MemberGlut_Logger::event( $event, $message, $args );
}

/**
 * Permalink of a membership page slot (register, login, account, lost, pricing, thanks).
 *
 * @param string $slot Slot name without the page_ prefix.
 * @param array  $args Query args to add.
 * @return string Empty string when the page is not set.
 */
function memberglut_page_url( $slot, $args = array() ) {
	$id  = (int) memberglut_form_setting( 'page_' . $slot, 0 );
	$url = $id && 'publish' === get_post_status( $id ) ? get_permalink( $id ) : '';
	if ( $url && $args ) {
		$url = add_query_arg( $args, $url );
	}
	return (string) apply_filters( 'memberglut_page_url', $url, $slot, $args );
}

/**
 * Page ID of a slot.
 *
 * @param string $slot Slot.
 * @return int
 */
function memberglut_page_id( $slot ) {
	return (int) memberglut_form_setting( 'page_' . $slot, 0 );
}

/**
 * Whether a user bypasses every restriction (administrators).
 *
 * @param int|null $user_id User ID; null = current user, 0 = a logged-out visitor.
 * @return bool
 */
function memberglut_user_bypasses_restrictions( $user_id = null ) {
	$user_id = null === $user_id ? get_current_user_id() : (int) $user_id;
	$bypass  = $user_id && user_can( $user_id, 'manage_options' );
	return (bool) apply_filters( 'memberglut_user_bypasses_restrictions', $bypass, $user_id );
}

/**
 * Whether the Pro add-on is active.
 *
 * @return bool
 */
function memberglut_is_pro_active() {
	return (bool) apply_filters( 'memberglut_is_pro_active', false );
}

/**
 * Locate a template, allowing themes to override it in yourtheme/memberglut/.
 *
 * @param string $name Template path relative to templates/ (e.g. 'restriction/message.php').
 * @return string Absolute path.
 */
function memberglut_locate_template( $name ) {
	$theme = locate_template( array( 'memberglut/' . $name ) );
	$path  = $theme ? $theme : MEMBERGLUT_PLUGIN_PATH . 'templates/' . $name;
	return (string) apply_filters( 'memberglut_template_path', $path, $name );
}

/**
 * Render a template to a string.
 *
 * @param string $name Template name.
 * @param array  $vars Variables available in the template.
 * @return string
 */
function memberglut_get_template( $name, $vars = array() ) {
	$path = memberglut_locate_template( $name );
	if ( ! is_readable( $path ) ) {
		return '';
	}
	ob_start();
	// phpcs:ignore WordPress.PHP.DontExtract.extract_extract -- Template variables, keys controlled by the plugin.
	extract( $vars, EXTR_SKIP );
	include $path;
	return (string) ob_get_clean();
}

/**
 * Client IP address (best effort, not trusted for security decisions beyond rate limiting).
 *
 * @return string
 */
function memberglut_client_ip() {
	$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
	$ip = (string) apply_filters( 'memberglut_client_ip', $ip );
	return filter_var( $ip, FILTER_VALIDATE_IP ) ? $ip : '';
}

/**
 * Repository singleton by short name (plans, subscriptions, payments, coupons, coupon_uses, rules, events, logs, logins).
 *
 * @param string $name Short name.
 * @return MemberGlut_Repository
 */
function memberglut_repo( $name ) {
	static $repos = array();
	if ( ! isset( $repos[ $name ] ) ) {
		$class = 'MemberGlut_' . str_replace( ' ', '_', ucwords( str_replace( '_', ' ', $name ) ) ) . '_Repository';
		$repos[ $name ] = new $class();
	}
	return $repos[ $name ];
}

/**
 * Clear MemberGlut caches (transients and object cache group).
 *
 * @return void
 */
function memberglut_clear_cache() {
	global $wpdb;
	// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching -- Deleting our own transients.
	$wpdb->query( $wpdb->prepare( "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s OR option_name LIKE %s", $wpdb->esc_like( '_transient_memberglut_' ) . '%', $wpdb->esc_like( '_transient_timeout_memberglut_' ) . '%' ) );
	if ( class_exists( 'MemberGlut_Access_Cache' ) ) {
		MemberGlut_Access_Cache::bump();
	}
	if ( function_exists( 'wp_cache_flush_group' ) && wp_cache_supports( 'flush_group' ) ) {
		wp_cache_flush_group( 'memberglut' );
	}
	do_action( 'memberglut_cache_cleared' );
}

/**
 * UTC MySQL date → ISO 8601 (for the REST API), or null.
 *
 * @param string|null $utc UTC date.
 * @return string|null
 */
function memberglut_iso( $utc ) {
	if ( empty( $utc ) || '0000-00-00 00:00:00' === $utc ) {
		return null;
	}
	return str_replace( ' ', 'T', $utc ) . 'Z';
}

/**
 * Client date (ISO 8601, "YYYY-MM-DD" or MySQL) → UTC MySQL date, or null.
 *
 * Date-only values are read in the site timezone (start of day, or end of day when $end_of_day).
 *
 * @param string|null $value      Value.
 * @param bool        $end_of_day Use 23:59:59 for date-only values.
 * @return string|null
 */
function memberglut_parse_date( $value, $end_of_day = false ) {
	if ( empty( $value ) ) {
		return null;
	}
	$value = (string) $value;
	try {
		if ( preg_match( '/^\d{4}-\d{2}-\d{2}$/', $value ) ) {
			$date = new DateTime( $value . ( $end_of_day ? ' 23:59:59' : ' 00:00:00' ), wp_timezone() );
		} elseif ( preg_match( '/(Z|[+-]\d{2}:?\d{2})$/', $value ) ) {
			$date = new DateTime( $value );
		} else {
			$date = new DateTime( $value, new DateTimeZone( 'UTC' ) );
		}
	} catch ( Exception $e ) {
		return null;
	}
	$date->setTimezone( new DateTimeZone( 'UTC' ) );
	return $date->format( 'Y-m-d H:i:s' );
}

/**
 * Queue a one-time front-end message (shown by the next MemberGlut form), stored in a short-lived cookie.
 *
 * @param string $type success|error|info.
 * @param string $text Message (may contain simple HTML links).
 * @return void
 */
function memberglut_flash( $type, $text ) {
	$GLOBALS['memberglut_flash'] = array( 'type' => $type, 'text' => $text );
	if ( ! headers_sent() ) {
		setcookie( 'memberglut_flash', base64_encode( wp_json_encode( $GLOBALS['memberglut_flash'] ) ), time() + 120, COOKIEPATH ? COOKIEPATH : '/', COOKIE_DOMAIN, is_ssl(), true ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode -- Cookie-safe encoding of a JSON message.
	}
}

/**
 * Read and clear the queued front-end message.
 *
 * @return array|null [ type, text ]
 */
function memberglut_get_flash() {
	if ( ! empty( $GLOBALS['memberglut_flash'] ) ) {
		$flash = $GLOBALS['memberglut_flash'];
	} elseif ( ! empty( $_COOKIE['memberglut_flash'] ) ) {
		$flash = json_decode( base64_decode( sanitize_text_field( wp_unslash( $_COOKIE['memberglut_flash'] ) ) ), true ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode -- See memberglut_flash().
	} else {
		return null;
	}
	$GLOBALS['memberglut_flash'] = null;
	if ( ! headers_sent() && isset( $_COOKIE['memberglut_flash'] ) ) {
		setcookie( 'memberglut_flash', '', time() - 3600, COOKIEPATH ? COOKIEPATH : '/', COOKIE_DOMAIN, is_ssl(), true );
	}
	if ( ! is_array( $flash ) || empty( $flash['text'] ) ) {
		return null;
	}
	return array(
		'type' => in_array( isset( $flash['type'] ) ? $flash['type'] : '', array( 'success', 'error', 'info' ), true ) ? $flash['type'] : 'info',
		'text' => wp_kses( (string) $flash['text'], array( 'a' => array( 'href' => true ) ) ),
	);
}

/**
 * Whether the current request is a POST.
 *
 * @return bool
 */
function memberglut_is_post_request() {
	return isset( $_SERVER['REQUEST_METHOD'] ) && 'POST' === strtoupper( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_METHOD'] ) ) );
}
