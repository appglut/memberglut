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

/** “month”, “3 months” for a { length, unit } duration. */
export function periodLabel(d) {
  const { length = 1, unit = 'month' } = d || {};
  const one = { day: __( 'day', 'memberglut' ), week: __( 'week', 'memberglut' ), month: __( 'month', 'memberglut' ), year: __( 'year', 'memberglut' ) };
  const many = { day: __( 'days', 'memberglut' ), week: __( 'weeks', 'memberglut' ), month: __( 'months', 'memberglut' ), year: __( 'years', 'memberglut' ) };
  return Number(length) === 1 ? one[unit] : `${length} ${many[unit]}`;
}

/** How long access lasts: “Until canceled”, “Lifetime”, “1 year”, “Until Dec 31”, “Calendar year”. */
export function planDuration(p) {
  if (p.type === 'paid' && p.billing === 'recurring') return __( 'Until canceled', 'memberglut' );
  if (p.duration_type === 'date') return __( 'Until ', 'memberglut' ) + date(p.end_date);
  if (p.duration_type === 'calendar') return __( 'Calendar year', 'memberglut' );
  if (p.duration_type === 'fixed') return periodLabel(p.duration);
  return __( 'Lifetime', 'memberglut' );
}

/** “$9 / month”, “Free”, “$299 once”. */
export function planPrice(p) {
  if (!p) return '';
  if (p.type === 'free' || !p.price) return __( 'Free', 'memberglut' );
  if (p.billing === 'recurring') return `${money(p.price)} / ${periodLabel(p.duration)}`;
  return `${money(p.price)} ${__( 'once', 'memberglut' )}`;
}

export function initials(name = '') {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}
