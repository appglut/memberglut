<?php
/**
 * Form field engine: renders, validates and saves the registration / profile fields (Forms & Pages › Fields).
 *
 * Core fields map to the WordPress user; custom fields are saved as user meta under their key
 * (plans/01-dependency-map.md §2.10).
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Fields class.
 */
class MemberGlut_Fields {

	/**
	 * Registration fields that are switched on, in order.
	 *
	 * @return array[]
	 */
	public static function registration_fields() {
		return array_values( array_filter( (array) memberglut_form_setting( 'reg_fields', array() ), static function ( $f ) {
			return ! empty( $f['on'] ) || ! empty( $f['locked'] );
		} ) );
	}

	/**
	 * Field definition by key.
	 *
	 * @param string $key Key.
	 * @return array|null
	 */
	public static function get( $key ) {
		foreach ( (array) memberglut_form_setting( 'reg_fields', array() ) as $f ) {
			if ( $f['key'] === $key ) {
				return $f;
			}
		}
		return null;
	}

	/**
	 * Choices of a select/radio/checkbox field.
	 *
	 * @param array $f Field.
	 * @return array value => label
	 */
	public static function choices( $f ) {
		if ( 'country' === $f['type'] ) {
			return self::countries();
		}
		$out = array();
		foreach ( array_filter( array_map( 'trim', explode( "\n", (string) ( isset( $f['options'] ) ? $f['options'] : '' ) ) ) ) as $line ) {
			if ( false !== strpos( $line, '|' ) ) {
				list( $v, $l ) = array_map( 'trim', explode( '|', $line, 2 ) );
			} else {
				$v = $line;
				$l = $line;
			}
			$out[ $v ] = $l;
		}
		return $out;
	}

	/**
	 * Render one field.
	 *
	 * @param array  $f      Field.
	 * @param mixed  $value  Current value.
	 * @param string $prefix Input name prefix (e.g. "mg").
	 * @return string
	 */
	public static function render( $f, $value = '', $prefix = 'mg' ) {
		$type     = $f['type'];
		$key      = $f['key'];
		$name     = $prefix . '[' . $key . ']';
		$id       = 'mg-' . $key . '-' . wp_rand( 100, 999 );
		$required = ! empty( $f['required'] );
		$req_attr = $required ? ' required' : '';
		$label    = esc_html( $f['label'] ) . ( $required ? ' <span class="mg-req" aria-hidden="true">*</span>' : '' );
		$input    = '';
		switch ( $type ) {
			case 'textarea':
				$input = '<textarea id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '" rows="4"' . $req_attr . '>' . esc_textarea( (string) $value ) . '</textarea>';
				break;
			case 'select':
			case 'country':
				$input = '<select id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '"' . $req_attr . '><option value="">' . esc_html__( '— Choose —', 'memberglut' ) . '</option>';
				foreach ( self::choices( $f ) as $v => $l ) {
					$input .= '<option value="' . esc_attr( $v ) . '"' . selected( (string) $value, (string) $v, false ) . '>' . esc_html( $l ) . '</option>';
				}
				$input .= '</select>';
				break;
			case 'radio':
				$input = '<span class="mg-choices">';
				foreach ( self::choices( $f ) as $v => $l ) {
					$input .= '<label><input type="radio" name="' . esc_attr( $name ) . '" value="' . esc_attr( $v ) . '"' . checked( (string) $value, (string) $v, false ) . $req_attr . '> ' . esc_html( $l ) . '</label>';
				}
				$input .= '</span>';
				break;
			case 'checkbox':
				$choices = self::choices( $f );
				$values  = (array) $value;
				$input   = '<span class="mg-choices">';
				if ( ! $choices ) {
					$input .= '<label><input type="checkbox" name="' . esc_attr( $name ) . '" value="1"' . checked( ! empty( $value ), true, false ) . $req_attr . '> ' . esc_html( $f['label'] ) . '</label>';
				} else {
					foreach ( $choices as $v => $l ) {
						$input .= '<label><input type="checkbox" name="' . esc_attr( $name ) . '[]" value="' . esc_attr( $v ) . '"' . checked( in_array( (string) $v, array_map( 'strval', $values ), true ), true, false ) . '> ' . esc_html( $l ) . '</label>';
					}
				}
				$input .= '</span>';
				break;
			case 'hidden':
				return '<input type="hidden" name="' . esc_attr( $name ) . '" value="' . esc_attr( (string) $value ) . '">';
			case 'password':
				$input = '<span class="mg-password"><input type="password" id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '" autocomplete="' . ( 'password' === $key ? 'new-password' : 'new-password' ) . '"' . $req_attr . ( 'password' === $key ? ' data-mg-strength="' . esc_attr( memberglut_setting( 'password_strength', 'medium' ) ) . '" minlength="' . (int) memberglut_setting( 'password_min', 8 ) . '"' : '' ) . '>';
				if ( memberglut_setting( 'show_password_toggle', true ) ) {
					$input .= '<button type="button" class="mg-password-toggle" aria-label="' . esc_attr__( 'Show password', 'memberglut' ) . '" data-mg-toggle><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg></button>';
				}
				$input .= '</span>';
				if ( 'password' === $key && 'any' !== memberglut_setting( 'password_strength', 'medium' ) ) {
					$input .= '<span class="mg-strength" aria-live="polite"><span class="mg-strength-bar"><i></i></span><span class="mg-strength-text"></span></span>';
				}
				/* translators: %d: number of characters */
				$input .= 'password' === $key ? '<span class="mg-help">' . esc_html( sprintf( __( 'At least %d characters.', 'memberglut' ), (int) memberglut_setting( 'password_min', 8 ) ) ) . ( 'strong' === memberglut_setting( 'password_strength' ) ? ' ' . esc_html__( 'Mix upper and lower case letters, numbers and symbols.', 'memberglut' ) : '' ) . '</span>' : '';
				break;
			default:
				$html_type = in_array( $type, array( 'email', 'url', 'tel', 'number', 'date' ), true ) ? $type : 'text';
				$auto      = array( 'email' => 'email', 'username' => 'username', 'first_name' => 'given-name', 'last_name' => 'family-name', 'phone' => 'tel', 'website' => 'url' );
				$input     = '<input type="' . esc_attr( $html_type ) . '" id="' . esc_attr( $id ) . '" name="' . esc_attr( $name ) . '" value="' . esc_attr( (string) $value ) . '"' . ( isset( $auto[ $key ] ) ? ' autocomplete="' . esc_attr( $auto[ $key ] ) . '"' : '' ) . $req_attr . '>';
		}
		if ( 'checkbox' === $type && ! self::choices( $f ) ) {
			return '<div class="mg-field mg-field-' . esc_attr( $key ) . ' mg-type-checkbox" data-field="' . esc_attr( $key ) . '">' . $input . '<span class="mg-field-error" role="alert"></span></div>';
		}
		return '<div class="mg-field mg-field-' . esc_attr( $key ) . ' mg-type-' . esc_attr( $type ) . '" data-field="' . esc_attr( $key ) . '"><label for="' . esc_attr( $id ) . '">' . $label . '</label>' . $input . '<span class="mg-field-error" role="alert"></span></div>';
	}

	/**
	 * Validate submitted values for a list of fields.
	 *
	 * @param array[] $fields Fields.
	 * @param array   $input  Submitted values (key => raw).
	 * @param int     $user_id Editing user (0 = registration).
	 * @return array [ clean values, errors ]
	 */
	public static function validate( $fields, $input, $user_id = 0 ) {
		$clean  = array();
		$errors = array();
		foreach ( $fields as $f ) {
			$key = $f['key'];
			$raw = isset( $input[ $key ] ) ? $input[ $key ] : '';
			if ( in_array( $f['type'], array( 'password' ), true ) ) {
				$value = is_string( $raw ) ? $raw : '';
			} elseif ( 'checkbox' === $f['type'] ) {
				$value = self::choices( $f ) ? array_values( array_intersect( array_map( 'strval', (array) $raw ), array_map( 'strval', array_keys( self::choices( $f ) ) ) ) ) : ( $raw ? '1' : '' );
			} elseif ( 'textarea' === $f['type'] ) {
				$value = sanitize_textarea_field( is_string( $raw ) ? $raw : '' );
			} elseif ( 'email' === $f['type'] ) {
				$value = sanitize_email( is_string( $raw ) ? $raw : '' );
			} elseif ( 'url' === $f['type'] ) {
				$value = esc_url_raw( is_string( $raw ) ? trim( $raw ) : '' );
			} else {
				$value = sanitize_text_field( is_string( $raw ) ? $raw : '' );
			}
			$empty = ( is_array( $value ) && ! $value ) || ( ! is_array( $value ) && '' === trim( (string) $value ) );
			if ( ! empty( $f['required'] ) && $empty ) {
				/* translators: %s: field label */
				$errors[ $key ] = sprintf( __( '%s is required.', 'memberglut' ), $f['label'] );
				continue;
			}
			if ( ! $empty ) {
				switch ( $f['type'] ) {
					case 'email':
						if ( ! is_email( $value ) ) {
							$errors[ $key ] = __( 'Enter a valid email address.', 'memberglut' );
						}
						break;
					case 'url':
						if ( ! wp_http_validate_url( $value ) ) {
							$errors[ $key ] = __( 'Enter a valid web address.', 'memberglut' );
						}
						break;
					case 'number':
						if ( ! is_numeric( $value ) ) {
							$errors[ $key ] = __( 'Enter a number.', 'memberglut' );
						}
						break;
					case 'date':
						if ( ! preg_match( '/^\d{4}-\d{2}-\d{2}$/', $value ) ) {
							$errors[ $key ] = __( 'Enter a valid date.', 'memberglut' );
						}
						break;
					case 'tel':
						if ( ! preg_match( '/^[0-9+().\-\s]{5,30}$/', $value ) ) {
							$errors[ $key ] = __( 'Enter a valid phone number.', 'memberglut' );
						}
						break;
					case 'select':
					case 'radio':
					case 'country':
						if ( ! array_key_exists( $value, self::choices( $f ) ) ) {
							$errors[ $key ] = __( 'Choose one of the options.', 'memberglut' );
						}
						break;
				}
			}
			$clean[ $key ] = $value;
		}
		return array( $clean, $errors );
	}

	/**
	 * Save core and custom field values to a user.
	 *
	 * @param int   $user_id User.
	 * @param array $values  Clean values.
	 * @return void
	 */
	public static function save( $user_id, $values ) {
		$core = array();
		$map  = array( 'first_name' => 'first_name', 'last_name' => 'last_name', 'display_name' => 'display_name', 'website' => 'user_url', 'bio' => 'description' );
		foreach ( $map as $key => $prop ) {
			if ( array_key_exists( $key, $values ) ) {
				$core[ $prop ] = $values[ $key ];
			}
		}
		if ( $core ) {
			$core['ID'] = $user_id;
			wp_update_user( $core );
		}
		foreach ( MemberGlut_Settings::custom_fields() as $f ) {
			if ( array_key_exists( $f['key'], $values ) ) {
				update_user_meta( $user_id, $f['key'], $values[ $f['key'] ] );
			}
		}
	}

	/**
	 * Current value of a field for a user.
	 *
	 * @param WP_User $user User.
	 * @param string  $key  Key.
	 * @return mixed
	 */
	public static function user_value( $user, $key ) {
		$map = array( 'email' => 'user_email', 'username' => 'user_login', 'first_name' => 'first_name', 'last_name' => 'last_name', 'display_name' => 'display_name', 'website' => 'user_url', 'bio' => 'description' );
		if ( isset( $map[ $key ] ) ) {
			return $user->{$map[ $key ]};
		}
		return get_user_meta( $user->ID, $key, true );
	}

	/**
	 * Password policy (Login & registration › Passwords).
	 *
	 * @param string $password Password.
	 * @return true|string Error message.
	 */
	public static function check_password( $password ) {
		$min = (int) memberglut_setting( 'password_min', 8 );
		if ( strlen( $password ) < $min ) {
			/* translators: %d: number of characters */
			return sprintf( __( 'The password must have at least %d characters.', 'memberglut' ), $min );
		}
		$classes = 0;
		foreach ( array( '/[a-z]/', '/[A-Z]/', '/[0-9]/', '/[^a-zA-Z0-9]/' ) as $re ) {
			$classes += preg_match( $re, $password ) ? 1 : 0;
		}
		$level = memberglut_setting( 'password_strength', 'medium' );
		if ( 'medium' === $level && $classes < 2 ) {
			return __( 'This password is too weak. Mix letters with numbers or symbols.', 'memberglut' );
		}
		if ( 'strong' === $level && ( $classes < 3 || strlen( $password ) < max( $min, 10 ) ) ) {
			return __( 'This password is too weak. Use at least 10 characters with upper and lower case letters, numbers and symbols.', 'memberglut' );
		}
		return true;
	}

	/**
	 * Countries (ISO code => name).
	 *
	 * @return array
	 */
	public static function countries() {
		static $list = null;
		if ( null !== $list ) {
			return $list;
		}
		$codes = 'AF:Afghanistan|AL:Albania|DZ:Algeria|AD:Andorra|AO:Angola|AR:Argentina|AM:Armenia|AU:Australia|AT:Austria|AZ:Azerbaijan|BS:Bahamas|BH:Bahrain|BD:Bangladesh|BB:Barbados|BY:Belarus|BE:Belgium|BZ:Belize|BJ:Benin|BT:Bhutan|BO:Bolivia|BA:Bosnia and Herzegovina|BW:Botswana|BR:Brazil|BN:Brunei|BG:Bulgaria|BF:Burkina Faso|BI:Burundi|KH:Cambodia|CM:Cameroon|CA:Canada|CV:Cape Verde|CF:Central African Republic|TD:Chad|CL:Chile|CN:China|CO:Colombia|KM:Comoros|CG:Congo|CD:Congo (DRC)|CR:Costa Rica|CI:Côte d’Ivoire|HR:Croatia|CU:Cuba|CY:Cyprus|CZ:Czechia|DK:Denmark|DJ:Djibouti|DM:Dominica|DO:Dominican Republic|EC:Ecuador|EG:Egypt|SV:El Salvador|GQ:Equatorial Guinea|ER:Eritrea|EE:Estonia|SZ:Eswatini|ET:Ethiopia|FJ:Fiji|FI:Finland|FR:France|GA:Gabon|GM:Gambia|GE:Georgia|DE:Germany|GH:Ghana|GR:Greece|GD:Grenada|GT:Guatemala|GN:Guinea|GW:Guinea-Bissau|GY:Guyana|HT:Haiti|HN:Honduras|HK:Hong Kong|HU:Hungary|IS:Iceland|IN:India|ID:Indonesia|IR:Iran|IQ:Iraq|IE:Ireland|IL:Israel|IT:Italy|JM:Jamaica|JP:Japan|JO:Jordan|KZ:Kazakhstan|KE:Kenya|KI:Kiribati|KW:Kuwait|KG:Kyrgyzstan|LA:Laos|LV:Latvia|LB:Lebanon|LS:Lesotho|LR:Liberia|LY:Libya|LI:Liechtenstein|LT:Lithuania|LU:Luxembourg|MO:Macao|MG:Madagascar|MW:Malawi|MY:Malaysia|MV:Maldives|ML:Mali|MT:Malta|MH:Marshall Islands|MR:Mauritania|MU:Mauritius|MX:Mexico|FM:Micronesia|MD:Moldova|MC:Monaco|MN:Mongolia|ME:Montenegro|MA:Morocco|MZ:Mozambique|MM:Myanmar|NA:Namibia|NR:Nauru|NP:Nepal|NL:Netherlands|NZ:New Zealand|NI:Nicaragua|NE:Niger|NG:Nigeria|KP:North Korea|MK:North Macedonia|NO:Norway|OM:Oman|PK:Pakistan|PW:Palau|PS:Palestine|PA:Panama|PG:Papua New Guinea|PY:Paraguay|PE:Peru|PH:Philippines|PL:Poland|PT:Portugal|PR:Puerto Rico|QA:Qatar|RO:Romania|RU:Russia|RW:Rwanda|KN:Saint Kitts and Nevis|LC:Saint Lucia|VC:Saint Vincent and the Grenadines|WS:Samoa|SM:San Marino|ST:São Tomé and Príncipe|SA:Saudi Arabia|SN:Senegal|RS:Serbia|SC:Seychelles|SL:Sierra Leone|SG:Singapore|SK:Slovakia|SI:Slovenia|SB:Solomon Islands|SO:Somalia|ZA:South Africa|KR:South Korea|SS:South Sudan|ES:Spain|LK:Sri Lanka|SD:Sudan|SR:Suriname|SE:Sweden|CH:Switzerland|SY:Syria|TW:Taiwan|TJ:Tajikistan|TZ:Tanzania|TH:Thailand|TL:Timor-Leste|TG:Togo|TO:Tonga|TT:Trinidad and Tobago|TN:Tunisia|TR:Türkiye|TM:Turkmenistan|TV:Tuvalu|UG:Uganda|UA:Ukraine|AE:United Arab Emirates|GB:United Kingdom|US:United States|UY:Uruguay|UZ:Uzbekistan|VU:Vanuatu|VA:Vatican City|VE:Venezuela|VN:Vietnam|YE:Yemen|ZM:Zambia|ZW:Zimbabwe';
		$list  = array();
		foreach ( explode( '|', $codes ) as $pair ) {
			list( $code, $name ) = explode( ':', $pair, 2 );
			$list[ $code ]       = $name;
		}
		return apply_filters( 'memberglut_countries', $list );
	}
}
