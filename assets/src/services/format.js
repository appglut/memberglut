import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { __ } from '@wordpress/i18n';

dayjs.extend(relativeTime);

/** Format an amount in the store currency. */
export function money(amount, currency = 'USD') {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency, maximumFractionDigits: amount % 1 ? 2 : 0 }).format(amount || 0);
  } catch (e) {
    return '$' + Number(amount || 0).toFixed(2);
  }
}

export const date = (v) => (v ? dayjs(v).format('MMM D, YYYY') : '—');
export const dateTime = (v) => (v ? dayjs(v).format('MMM D, YYYY · HH:mm') : '—');
export const fromNow = (v) => (v ? dayjs(v).fromNow() : '—');

export const SUB_STATUS = {
  active: __( 'Active', 'memberglut' ),
  trialing: __( 'Trial', 'memberglut' ),
  pending: __( 'Pending', 'memberglut' ),
  on_hold: __( 'On hold', 'memberglut' ),
  canceled: __( 'Canceled', 'memberglut' ),
  expired: __( 'Expired', 'memberglut' ),
};

export const PAY_STATUS = {
  completed: __( 'Completed', 'memberglut' ),
  pending: __( 'Pending', 'memberglut' ),
  failed: __( 'Failed', 'memberglut' ),
  refunded: __( 'Refunded', 'memberglut' ),
};

export const GATEWAY = {
  stripe: 'Stripe',
  paypal: 'PayPal',
  bank: __( 'Bank transfer', 'memberglut' ),
  manual: __( 'Manual', 'memberglut' ),
  free: __( 'Free', 'memberglut' ),
};

/** “1 month”, “Unlimited”, “Until Dec 31” for a plan. */
export function planDuration(p) {
  if (p.duration_type === 'unlimited') return __( 'Lifetime', 'memberglut' );
  if (p.duration_type === 'date') return __( 'Until ', 'memberglut' ) + date(p.end_date);
  const { length = 1, unit = 'month' } = p.duration || {};
  const units = { day: __( 'day', 'memberglut' ), week: __( 'week', 'memberglut' ), month: __( 'month', 'memberglut' ), year: __( 'year', 'memberglut' ) };
  return length === 1 ? units[unit] : `${length} ${units[unit]}s`;
}

/** “$9 / month”, “Free”, “$299 once”. */
export function planPrice(p) {
  if (p.type === 'free' || !p.price) return __( 'Free', 'memberglut' );
  if (p.billing === 'recurring') return `${money(p.price)} / ${planDuration(p)}`;
  return `${money(p.price)} ${__( 'once', 'memberglut' )}`;
}

export function initials(name = '') {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}
