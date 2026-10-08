<?php
/**
 * Repository for the subscriptions table.
 *
 * @package MemberGlut
 */

defined( 'ABSPATH' ) || exit;

/**
 * MemberGlut_Subscriptions_Repository class.
 */
class MemberGlut_Subscriptions_Repository extends MemberGlut_Repository {

	/**
	 * Table.
	 *
	 * @var string
	 */
	protected $table = 'subscriptions';

	/**
	 * Columns.
	 *
	 * @var array
	 */
	protected $columns = array( 'id' => '%d', 'user_id' => '%d', 'plan_id' => '%d', 'status' => '%s', 'start_date' => '%s', 'expires_at' => '%s', 'trial_ends_at' => '%s', 'canceled_at' => '%s', 'next_payment_at' => '%s', 'scheduled_plan_id' => '%d', 'gateway' => '%s', 'gateway_customer_id' => '%s', 'gateway_subscription_id' => '%s', 'billing_amount' => '%f', 'billing_cycles_done' => '%d', 'billing_cycles_total' => '%d', 'retry_count' => '%d', 'coupon_id' => '%d', 'source' => '%s', 'meta' => '%s', 'created_at' => '%s', 'updated_at' => '%s' );

	/**
	 * JSON columns.
	 *
	 * @var string[]
	 */
	protected $json = array( 'meta' );

	/**
	 * Searchable columns.
	 *
	 * @var string[]
	 */
	protected $searchable = array(  );
}
