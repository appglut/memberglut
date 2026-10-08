<?php
/**
 * Coupons: storage, validation at checkout, computed status, usage tracking and CSV import.
 *
 * Rules (Coupons drawer): % or fixed amount; plans (empty = every paid plan); first payment or every payment;
 * start / expiry dates (site timezone); total uses and uses per member (0 = unlimited); new customers only.
 * A coupon discounts the plan price, never the sign-up fee.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Coupons class.
 */
class MemberGlut_Coupons {

	/**
	 * Row → client shape.
	 *
	 * @param array $row Row.
	 * @return array
	 */
	public static function to_client( $row ) {
		return array(
			'id'             => (int) $row['id'],
			'code'           => $row['code'],
			'type'           => $row['type'],
			'amount'         => (float) $row['amount'],
			'plans'          => array_map( 'intval', (array) $row['plans'] ),
			'recurring'      => (bool) $row['recurring'],
			'starts'         => $row['starts_at'] ? $row['starts_at'] : '',
			'expires'        => $row['expires_at'] ? $row['expires_at'] : '',
			'max_uses'       => (int) $row['max_uses'],
			'per_user'       => (int) $row['per_user'],
			'new_users_only' => (bool) $row['new_users_only'],
			'enabled'        => (bool) $row['enabled'],
			'uses'           => (int) $row['uses'],
			'status'         => self::status( $row ),
			'created_at'     => memberglut_iso( $row['created_at'] ),
		);
	}

	/**
	 * Computed status: inactive → scheduled → expired → active.
	 *
	 * @param array $row Row.
	 * @return string
	 */
	public static function status( $row ) {
		if ( empty( $row['enabled'] ) ) {
			return 'inactive';
		}
		$today = wp_date( 'Y-m-d' );
		if ( ! empty( $row['starts_at'] ) && $row['starts_at'] > $today ) {
			return 'scheduled';
		}
		if ( ( ! empty( $row['expires_at'] ) && $row['expires_at'] < $today ) || ( (int) $row['max_uses'] > 0 && (int) $row['uses'] >= (int) $row['max_uses'] ) ) {
			return 'expired';
		}
		return 'active';
	}

	/**
	 * All coupons.
	 *
	 * @param string $search Search.
	 * @return array[]
	 */
	public static function all( $search = '' ) {
		return array_map( array( __CLASS__, 'to_client' ), memberglut_repo( 'coupons' )->query( array( 'search' => $search, 'orderby' => 'id DESC' ) ) );
	}

	/**
	 * Find by code (case-insensitive).
	 *
	 * @param string $code Code.
	 * @return array|null Row.
	 */
	public static function find_by_code( $code ) {
		$code = strtoupper( trim( (string) $code ) );
		return '' === $code ? null : memberglut_repo( 'coupons' )->find_by( array( 'code' => $code ) );
	}

	/**
	 * Validate and save.
	 *
	 * @param array $d Client data.
	 * @return array|WP_Error
	 */
	public static function save( $d ) {
		$id     = isset( $d['id'] ) ? (int) $d['id'] : 0;
		$errors = array();
		$code   = strtoupper( preg_replace( '/[^A-Za-z0-9_\-]/', '', (string) ( isset( $d['code'] ) ? $d['code'] : '' ) ) );
		if ( '' === $code ) {
			$errors['code'] = __( 'Enter a code (letters, numbers, - and _).', 'memberglut' );
		} else {
			$other = self::find_by_code( $code );
			if ( $other && (int) $other['id'] !== $id ) {
				$errors['code'] = __( 'Another coupon already uses this code.', 'memberglut' );
			}
		}
		$type   = isset( $d['type'] ) && 'fixed' === $d['type'] ? 'fixed' : 'percent';
		$amount = round( (float) ( isset( $d['amount'] ) ? $d['amount'] : 0 ), 4 );
		if ( $amount <= 0 || ( 'percent' === $type && $amount > 100 ) ) {
			$errors['amount'] = 'percent' === $type ? __( 'Enter a percentage between 1 and 100.', 'memberglut' ) : __( 'Enter an amount above zero.', 'memberglut' );
		}
		$starts  = ! empty( $d['starts'] ) ? substr( sanitize_text_field( $d['starts'] ), 0, 10 ) : null;
		$expires = ! empty( $d['expires'] ) ? substr( sanitize_text_field( $d['expires'] ), 0, 10 ) : null;
		if ( $starts && $expires && $expires < $starts ) {
			$errors['expires'] = __( 'The expiry date is before the start date.', 'memberglut' );
		}
		if ( $errors ) {
			return new WP_Error( 'memberglut_invalid_coupon', reset( $errors ), array( 'status' => 400, 'fields' => $errors ) );
		}
		$data = array(
			'code'           => $code,
			'type'           => $type,
			'amount'         => $amount,
			'plans'          => array_values( array_filter( array_map( 'intval', (array) ( isset( $d['plans'] ) ? $d['plans'] : array() ) ) ) ),
			'recurring'      => ! empty( $d['recurring'] ),
			'starts_at'      => $starts,
			'expires_at'     => $expires,
			'max_uses'       => max( 0, (int) ( isset( $d['max_uses'] ) ? $d['max_uses'] : 0 ) ),
			'per_user'       => max( 0, (int) ( isset( $d['per_user'] ) ? $d['per_user'] : 1 ) ),
			'new_users_only' => ! empty( $d['new_users_only'] ),
			'enabled'        => ! isset( $d['enabled'] ) || ! empty( $d['enabled'] ),
		);
		if ( $id ) {
			if ( ! memberglut_repo( 'coupons' )->find( $id ) ) {
				return new WP_Error( 'memberglut_not_found', __( 'Coupon not found.', 'memberglut' ), array( 'status' => 404 ) );
			}
			memberglut_repo( 'coupons' )->update( $id, $data );
		} else {
			$id = memberglut_repo( 'coupons' )->insert( $data );
		}
		return self::to_client( memberglut_repo( 'coupons' )->find( $id ) );
	}

	/**
	 * Delete.
	 *
	 * @param int $id ID.
	 * @return bool
	 */
	public static function delete( $id ) {
		return memberglut_repo( 'coupons' )->delete( $id );
	}

	/**
	 * Whether a coupon can be used.
	 *
	 * @param array  $row     Coupon row.
	 * @param array  $plan    Plan.
	 * @param int    $user_id User (0 = new customer at checkout).
	 * @param string $email   Email (guests).
	 * @return true|WP_Error
	 */
	public static function check( $row, $plan, $user_id = 0, $email = '' ) {
		$invalid = static function ( $msg ) {
			return new WP_Error( 'memberglut_coupon', $msg, array( 'status' => 400, 'fields' => array( 'coupon' => $msg ) ) );
		};
		if ( ! $row ) {
			return $invalid( __( 'This coupon code is not valid.', 'memberglut' ) );
		}
		switch ( self::status( $row ) ) {
			case 'inactive':
				return $invalid( __( 'This coupon code is not valid.', 'memberglut' ) );
			case 'scheduled':
				return $invalid( __( 'This coupon is not active yet.', 'memberglut' ) );
			case 'expired':
				return $invalid( __( 'This coupon has expired.', 'memberglut' ) );
		}
		if ( 'paid' !== $plan['type'] ) {
			return $invalid( __( 'Coupons only apply to paid plans.', 'memberglut' ) );
		}
		$plans = array_map( 'intval', (array) $row['plans'] );
		if ( $plans && ! in_array( (int) $plan['id'], $plans, true ) ) {
			return $invalid( __( 'This coupon does not apply to this plan.', 'memberglut' ) );
		}
		if ( $row['new_users_only'] && $user_id && memberglut_repo( 'payments' )->count( array( 'where' => array( 'user_id' => $user_id, 'status' => array( 'completed', 'refunded' ) ) ) ) ) {
			return $invalid( __( 'This coupon is for new customers only.', 'memberglut' ) );
		}
		if ( (int) $row['per_user'] > 0 ) {
			$used = 0;
			if ( $user_id ) {
				$used = memberglut_repo( 'coupon_uses' )->count( array( 'where' => array( 'coupon_id' => (int) $row['id'], 'user_id' => $user_id ) ) );
			} elseif ( $email ) {
				$used = memberglut_repo( 'coupon_uses' )->count( array( 'where' => array( 'coupon_id' => (int) $row['id'], 'email' => strtolower( $email ) ) ) );
			}
			if ( $used >= (int) $row['per_user'] ) {
				return $invalid( __( 'You have already used this coupon.', 'memberglut' ) );
			}
		}
		$trial = MemberGlut_Pricing::has_trial( $plan, $user_id );
		if ( $trial && ! $row['recurring'] ) {
			return $invalid( __( 'This coupon cannot be combined with a free trial.', 'memberglut' ) );
		}
		return apply_filters( 'memberglut_coupon_is_valid', true, $row, $plan, $user_id );
	}

	/**
	 * Discount of a coupon on an amount.
	 *
	 * @param array $row    Coupon row.
	 * @param float $amount Amount.
	 * @return float
	 */
	public static function discount( $row, $amount ) {
		$d = 'percent' === $row['type'] ? $amount * (float) $row['amount'] / 100 : (float) $row['amount'];
		return memberglut_round( min( $amount, max( 0, $d ) ) );
	}

	/**
	 * Count a use (on completed payment).
	 *
	 * @param int    $coupon_id  Coupon.
	 * @param int    $user_id    User.
	 * @param string $email      Email.
	 * @param int    $payment_id Payment.
	 * @return void
	 */
	public static function record_use( $coupon_id, $user_id, $email, $payment_id ) {
		if ( memberglut_repo( 'coupon_uses' )->count( array( 'where' => array( 'payment_id' => (int) $payment_id ) ) ) ) {
			return;
		}
		memberglut_repo( 'coupon_uses' )->insert( array( 'coupon_id' => (int) $coupon_id, 'user_id' => (int) $user_id, 'email' => strtolower( (string) $email ), 'payment_id' => (int) $payment_id ) );
		global $wpdb;
		$table = memberglut_repo( 'coupons' )->table();
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery,WordPress.DB.DirectDatabaseQuery.NoCaching,WordPress.DB.PreparedSQL.InterpolatedNotPrepared, PluginCheck.Security.DirectDB.UnescapedDBParameter -- Atomic counter on a plugin table.
		$wpdb->query( $wpdb->prepare( "UPDATE `{$table}` SET uses = uses + 1 WHERE id = %d", $coupon_id ) );
	}

	/**
	 * Import coupons from CSV text.
	 *
	 * Columns: code,type,amount,plans,recurring,starts,expires,max_uses,per_user,new_users_only,enabled (header row
	 * optional; plans as slugs or IDs separated by ; or |).
	 *
	 * @param string $csv CSV text.
	 * @return array [ created, updated, errors[] ]
	 */
	public static function import( $csv ) {
		$lines  = preg_split( '/\r\n|\r|\n/', trim( (string) $csv ) );
		$cols   = array( 'code', 'type', 'amount', 'plans', 'recurring', 'starts', 'expires', 'max_uses', 'per_user', 'new_users_only', 'enabled' );
		$out    = array( 'created' => 0, 'updated' => 0, 'errors' => array() );
		$header = null;
		foreach ( $lines as $n => $line ) {
			if ( '' === trim( $line ) ) {
				continue;
			}
			$row = str_getcsv( $line );
			if ( 0 === $n && in_array( 'code', array_map( 'strtolower', array_map( 'trim', $row ) ), true ) ) {
				$header = array_map( 'strtolower', array_map( 'trim', $row ) );
				continue;
			}
			$keys = $header ? $header : array_slice( $cols, 0, count( $row ) );
			$d    = array();
			foreach ( $keys as $i => $k ) {
				$d[ $k ] = isset( $row[ $i ] ) ? trim( $row[ $i ] ) : '';
			}
			$plans = array();
			foreach ( preg_split( '/[;|]/', isset( $d['plans'] ) ? $d['plans'] : '' ) as $p ) {
				$plan = $p ? MemberGlut_Plans::get( is_numeric( $p ) ? (int) $p : sanitize_title( $p ) ) : null;
				if ( $plan ) {
					$plans[] = $plan['id'];
				}
			}
			$bool          = static function ( $v, $default ) {
				return '' === $v ? $default : in_array( strtolower( $v ), array( '1', 'yes', 'true', 'y' ), true );
			};
			$data          = array(
				'code'           => isset( $d['code'] ) ? $d['code'] : '',
				'type'           => isset( $d['type'] ) && in_array( strtolower( $d['type'] ), array( 'fixed', 'amount' ), true ) ? 'fixed' : 'percent',
				'amount'         => isset( $d['amount'] ) ? (float) str_replace( '%', '', $d['amount'] ) : 0,
				'plans'          => $plans,
				'recurring'      => $bool( isset( $d['recurring'] ) ? $d['recurring'] : '', false ),
				'starts'         => isset( $d['starts'] ) ? $d['starts'] : '',
				'expires'        => isset( $d['expires'] ) ? $d['expires'] : '',
				'max_uses'       => isset( $d['max_uses'] ) && '' !== $d['max_uses'] ? (int) $d['max_uses'] : 0,
				'per_user'       => isset( $d['per_user'] ) && '' !== $d['per_user'] ? (int) $d['per_user'] : 1,
				'new_users_only' => $bool( isset( $d['new_users_only'] ) ? $d['new_users_only'] : '', false ),
				'enabled'        => $bool( isset( $d['enabled'] ) ? $d['enabled'] : '', true ),
			);
			$existing = self::find_by_code( $data['code'] );
			if ( $existing ) {
				$data['id'] = $existing['id'];
			}
			$res = self::save( $data );
			if ( is_wp_error( $res ) ) {
				/* translators: 1: line number, 2: error */
				$out['errors'][] = sprintf( __( 'Line %1$d: %2$s', 'memberglut' ), $n + 1, $res->get_error_message() );
			} else {
				$existing ? ++$out['updated'] : ++$out['created'];
			}
		}
		return $out;
	}
}
