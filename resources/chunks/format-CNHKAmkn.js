import { d as dayjs, L } from "./lookups-DN25OZmC.js";
import { az as commonjsGlobal, cB as getDefaultExportFromCjs, a8 as __ } from "./Page-C9tSda4_.js";
var relativeTime$1 = { exports: {} };
(function(module, exports) {
  !function(r, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    return function(r, e, t) {
      r = r || {};
      var n = e.prototype, o = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function i(r2, e2, t2, o2) {
        return n.fromToBase(r2, e2, t2, o2);
      }
      t.en.relativeTime = o, n.fromToBase = function(e2, n2, i2, d2, u) {
        for (var f, a, s, l = i2.$locale().relativeTime || o, h = r.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], m = h.length, c = 0; c < m; c += 1) {
          var y = h[c];
          y.d && (f = d2 ? t(e2).diff(i2, y.d, true) : i2.diff(e2, y.d, true));
          var p = (r.rounding || Math.round)(Math.abs(f));
          if (s = f > 0, p <= y.r || !y.r) {
            p <= 1 && c > 0 && (y = h[c - 1]);
            var v = l[y.l];
            u && (p = u("" + p)), a = "string" == typeof v ? v.replace("%d", p) : v(p, n2, y.l, s);
            break;
          }
        }
        if (n2) return a;
        var M = s ? l.future : l.past;
        return "function" == typeof M ? M(a) : M.replace("%s", a);
      }, n.to = function(r2, e2) {
        return i(r2, e2, this, true);
      }, n.from = function(r2, e2) {
        return i(r2, e2, this);
      };
      var d = function(r2) {
        return r2.$u ? t.utc() : t();
      };
      n.toNow = function(r2) {
        return this.to(d(this), r2);
      }, n.fromNow = function(r2) {
        return this.from(d(this), r2);
      };
    };
  });
})(relativeTime$1);
var relativeTimeExports = relativeTime$1.exports;
const relativeTime = /* @__PURE__ */ getDefaultExportFromCjs(relativeTimeExports);
dayjs.extend(relativeTime);
function money(amount, currency) {
  const c = L.currency || {};
  const code = currency || c.code || "USD";
  const decimals = code === c.code ? c.decimals ?? 2 : 2;
  const n = Number(amount || 0);
  const fixed = Math.abs(n).toFixed(decimals);
  const [int, frac] = fixed.split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, c.thousand ?? ",");
  const number = (n < 0 ? "-" : "") + grouped + (frac ? (c.decimal ?? ".") + frac : "");
  const symbol = code === c.code ? c.symbol || code : code;
  switch (c.position) {
    case "before_space":
      return `${symbol} ${number}`;
    case "after":
      return `${number}${symbol}`;
    case "after_space":
      return `${number} ${symbol}`;
    default:
      return `${symbol}${number}`;
  }
}
const date = (v) => v ? dayjs(v).format("MMM D, YYYY") : "—";
const dateTime = (v) => v ? dayjs(v).format("MMM D, YYYY · HH:mm") : "—";
const fromNow = (v) => v ? dayjs(v).fromNow() : "—";
const SUB_STATUS = {
  active: __("Active", "memberglut"),
  trialing: __("Trial", "memberglut"),
  pending: __("Pending", "memberglut"),
  on_hold: __("On hold", "memberglut"),
  canceled: __("Canceled", "memberglut"),
  expired: __("Expired", "memberglut")
};
const PAY_STATUS = {
  completed: __("Completed", "memberglut"),
  pending: __("Pending", "memberglut"),
  failed: __("Failed", "memberglut"),
  refunded: __("Refunded", "memberglut")
};
const GATEWAY = {
  stripe: "Stripe",
  paypal: "PayPal",
  bank: __("Bank transfer", "memberglut"),
  manual: __("Manual", "memberglut"),
  free: __("Free", "memberglut")
};
function periodLabel(d) {
  const { length = 1, unit = "month" } = d || {};
  const one = { day: __("day", "memberglut"), week: __("week", "memberglut"), month: __("month", "memberglut"), year: __("year", "memberglut") };
  const many = { day: __("days", "memberglut"), week: __("weeks", "memberglut"), month: __("months", "memberglut"), year: __("years", "memberglut") };
  return Number(length) === 1 ? one[unit] : `${length} ${many[unit]}`;
}
function planDuration(p) {
  if (p.type === "paid" && p.billing === "recurring") return __("Until canceled", "memberglut");
  if (p.duration_type === "date") return __("Until ", "memberglut") + date(p.end_date);
  if (p.duration_type === "calendar") return __("Calendar year", "memberglut");
  if (p.duration_type === "fixed") return periodLabel(p.duration);
  return __("Lifetime", "memberglut");
}
function planPrice(p) {
  if (!p) return "";
  if (p.type === "free" || !p.price) return __("Free", "memberglut");
  if (p.billing === "recurring") return `${money(p.price)} / ${periodLabel(p.duration)}`;
  return `${money(p.price)} ${__("once", "memberglut")}`;
}
function initials(name = "") {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}
export {
  GATEWAY as G,
  PAY_STATUS as P,
  SUB_STATUS as S,
  dateTime as a,
  planPrice as b,
  date as d,
  fromNow as f,
  initials as i,
  money as m,
  planDuration as p
};
