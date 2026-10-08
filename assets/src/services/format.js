import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { __ } from '@wordpress/i18n';
import { L } from './lookups';

dayjs.extend(relativeTime);

/** Format an amount with the store currency settings (Global Settings › Payments). */
export function money(amount, currency) {
  const c = L.currency || {};
  const code = currency || c.code || 'USD';
  const decimals = code === c.code ? (c.decimals ?? 2) : 2;
  const n = Number(amount || 0);
  const fixed = Math.abs(n).toFixed(decimals);
  const [int, frac] = fixed.split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, c.thousand ?? ',');
  const number = (n < 0 ? '-' : '') + grouped + (frac ? (c.decimal ?? '.') + frac : '');
  const symbol = code === c.code ? (c.symbol || code) : code;
  switch (c.position) {
    case 'before_space': return `${symbol} ${number}`;
    case 'after': return `${number}${symbol}`;
    case 'after_space': return `${number} ${symbol}`;
    default: return `${symbol}${number}`;
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
