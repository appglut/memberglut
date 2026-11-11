<?php
/**
 * Security alerts: “new device” email to the member and “suspicious activity” email to the admin.
 *
 *  - new_device  (Security › new_device_alert): a login from a device + IP the account never used before.
 *                The very first login of an account never alerts.
 *  - suspicious  (Security › suspicious_alert): an account or IP locked after too many failed logins, or one
 *                account logging in from SUSPICIOUS_IPS different IP addresses within an hour (account sharing).
 *                One alert per account / IP per hour.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Security_Alerts class.
 */
class MemberGlut_Security_Alerts {

	/**
	 * Distinct IPs in one hour that count as suspicious.
	 */
	const SUSPICIOUS_IPS = 4;

	/**
	 * Hook into WordPress.
	 *
	 * @return void
	 */
	public static function init() {
		add_filter( 'memberglut_email_triggers', array( __CLASS__, 'emails' ) );
		add_action( 'wp_login', array( __CLASS__, 'on_login' ), 30, 2 );
		add_action( 'memberglut_login_locked', array( __CLASS__, 'on_locked' ), 10, 4 );
	}

	/**
	 * Register the two emails (editable in Emails like the others).
	 *
	 * @param array $emails Emails.
	 * @return array
	 */
	public static function emails( $emails ) {
		$base = array( 'heading' => '', 'days' => null, 'enabled' => true );
		$emails['new_device'] = array_merge(
			$base,
			array(
				'key'       => 'new_device',
				'group'     => 'account',
				'recipient' => 'member',
				'name'      => __( 'New device login', 'memberglut' ),
				'desc'      => __( 'Sent when an account logs in from a device or network it never used before (Global Settings › Security).', 'memberglut' ),
				'subject'   => 'New login to your {site_name} account',
				'body'      => "Hi {first_name},\n\nYour account was just used to log in from a new device.\n\nDevice: {login_device}\nIP address: {login_ip}\nTime: {login_time}\n\nIf this was you, nothing to do. If not, change your password right away: {lost_password_url}\nYou can also log out every other device from your account: {account_url}\n\n{site_name}",
			)
		);
		$emails['admin_suspicious'] = array_merge(
			$base,
			array(
				'key'       => 'admin_suspicious',
				'group'     => 'admin',
				'recipient' => 'admin',
				'name'      => __( 'Suspicious account activity', 'memberglut' ),
				'desc'      => __( 'Sent to the admin when a login is locked after failed attempts, or an account logs in from many IP addresses in an hour.', 'memberglut' ),
				'subject'   => '[{site_name}] Suspicious account activity',
				'body'      => "Suspicious activity on {site_name}:\n\n{alert_details}\n\nIP address: {login_ip}\nTime: {login_time}\n\nReview the member: {admin_member_url}",
			)
		);
		return $emails;
	}

	/**
	 * Login: check for a new device and for many IPs.
	 *
	 * @param string  $login Username.
	 * @param WP_User $user  User.
	 * @return void
	 */
	public static function on_login( $login, $user ) {
		if ( ! $user instanceof WP_User ) {
			return;
		}
		$repo   = memberglut_repo( 'logins' );
		$ip     = memberglut_client_ip();
		$agent  = isset( $_SERVER['HTTP_USER_AGENT'] ) ? substr( sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ), 0, 255 ) : '';
		$device = MemberGlut_Security::device_label( $agent );

		if ( memberglut_setting( 'new_device_alert', false ) ) {
			$total = $repo->count( array( 'where' => array( 'user_id' => $user->ID ) ) );
			$same  = $repo->count( array( 'where' => array( 'user_id' => $user->ID, 'ip' => $ip, 'device_label' => $device ) ) );
			// The row of this login is already stored (MemberGlut_Security::on_login runs first).
			if ( $total > 1 && $same <= 1 ) {
				MemberGlut_Mailer::send( 'new_device', null, self::context( $user, $ip, $device ) );
				memberglut_event( 'new_device', __( 'Login from a new device', 'memberglut' ), array( 'user_id' => $user->ID, 'object_type' => 'user', 'object_id' => $user->ID, 'data' => array( 'ip' => $ip, 'device' => $device ) ) );
			}
		}

		if ( memberglut_setting( 'suspicious_alert', true ) && ! user_can( $user, 'manage_options' ) ) {
			$since = gmdate( 'Y-m-d H:i:s', time() - HOUR_IN_SECONDS );
			$ips   = $repo->count_distinct( 'ip', array( 'where' => array( 'user_id' => $user->ID, 'created_at >=' => $since ) ) );
			if ( $ips >= self::SUSPICIOUS_IPS ) {
				/* translators: 1: user login, 2: number of IP addresses */
				self::suspicious( 'user_' . $user->ID, sprintf( __( 'The account %1$s logged in from %2$d different IP addresses in the last hour. The account may be shared.', 'memberglut' ), $user->user_login, $ips ), $user, $ip );
			}
		}
	}

	/**
	 * Lockout after failed logins.
	 *
	 * @param string       $username Username tried.
	 * @param string       $scope    username|ip.
	 * @param int          $count    Attempts.
	 * @param WP_User|null $user     User.
	 * @return void
	 */
	public static function on_locked( $username, $scope, $count, $user ) {
		if ( ! memberglut_setting( 'suspicious_alert', true ) ) {
			return;
		}
		$ip = memberglut_client_ip();
		if ( 'ip' === $scope ) {
			/* translators: 1: IP, 2: attempts */
			self::suspicious( 'ip_' . md5( $ip ), sprintf( __( 'The IP address %1$s was locked after %2$d failed logins.', 'memberglut' ), $ip, $count ), null, $ip );
			return;
		}
		/* translators: 1: username, 2: attempts */
		$text = sprintf( __( 'Logins to %1$s were locked after %2$d wrong passwords.', 'memberglut' ), sanitize_user( $username ), $count );
		self::suspicious( 'user_' . ( $user ? $user->ID : md5( $username ) ), $text, $user instanceof WP_User ? $user : null, $ip );
	}

	/**
	 * Send the admin alert once an hour per key.
	 *
	 * @param string       $key  Throttle key.
	 * @param string       $text Details.
	 * @param WP_User|null $user User.
	 * @param string       $ip   IP.
	 * @return void
	 */
	private static function suspicious( $key, $text, $user, $ip ) {
		$throttle = 'memberglut_alert_' . md5( $key );
		if ( get_transient( $throttle ) ) {
			return;
		}
		set_transient( $throttle, 1, HOUR_IN_SECONDS );
		$context                  = self::context( $user, $ip, '' );
		$context['alert_details'] = $text;
		MemberGlut_Mailer::send( 'admin_suspicious', null, $context );
		memberglut_log( 'warning', 'security', $text, array( 'ip' => $ip ) );
	}

	/**
	 * Email context.
	 *
	 * @param WP_User|null $user   User.
	 * @param string       $ip     IP.
	 * @param string       $device Device.
	 * @return array
	 */
	private static function context( $user, $ip, $device ) {
		$c = array(
			'login_ip'     => $ip,
			'login_device' => $device,
			'login_time'   => wp_date( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ) ),
		);
		if ( $user instanceof WP_User ) {
			$c['user'] = $user;
		}
		return $c;
	}
}
