import { az as commonjsGlobal, cA as getDefaultExportFromCjs, d7 as reactExports, al as _objectWithoutProperties, dA as useMergedState, ao as _slicedToArray, aw as classNames, ae as _defineProperty, af as _extends, ak as _objectSpread2, R as React, dU as wrapperRaf, cr as genStyleHooks, cZ as merge, dk as unit, da as resetComponent, ck as genFocusOutline, j as ConfigContext, aA as composeRef, t as FormItemInputContext, dl as useCSSVarCls, D as DisabledContext, a6 as Wave, a3 as TARGET_CLS, dv as useId, dG as useSize, d2 as pickAttrs } from "./Page-uv7jJYOd.js";
import { ae as toNamePathStr } from "./api-BaJbRTwg.js";
var dayjs_min = { exports: {} };
(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
      var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
      return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
    } }, m = function(t2, e2, n2) {
      var r2 = String(t2);
      return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
    }, v = { s: m, z: function(t2) {
      var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
      return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
    }, m: function t2(e2, n2) {
      if (e2.date() < n2.date()) return -t2(n2, e2);
      var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
      return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
    }, a: function(t2) {
      return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
    }, p: function(t2) {
      return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t2) {
      return void 0 === t2;
    } }, g = "en", D = {};
    D[g] = M;
    var p = "$isDayjsObject", S = function(t2) {
      return t2 instanceof _ || !(!t2 || !t2[p]);
    }, w = function t2(e2, n2, r2) {
      var i2;
      if (!e2) return g;
      if ("string" == typeof e2) {
        var s2 = e2.toLowerCase();
        D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
        var u2 = e2.split("-");
        if (!i2 && u2.length > 1) return t2(u2[0]);
      } else {
        var a2 = e2.name;
        D[a2] = e2, i2 = a2;
      }
      return !r2 && i2 && (g = i2), i2 || !r2 && g;
    }, O = function(t2, e2) {
      if (S(t2)) return t2.clone();
      var n2 = "object" == typeof e2 ? e2 : {};
      return n2.date = t2, n2.args = arguments, new _(n2);
    }, b = v;
    b.l = w, b.i = S, b.w = function(t2, e2) {
      return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var _ = function() {
      function M2(t2) {
        this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
      }
      var m2 = M2.prototype;
      return m2.parse = function(t2) {
        this.$d = function(t3) {
          var e2 = t3.date, n2 = t3.utc;
          if (null === e2) return /* @__PURE__ */ new Date(NaN);
          if (b.u(e2)) return /* @__PURE__ */ new Date();
          if (e2 instanceof Date) return new Date(e2);
          if ("string" == typeof e2 && !/Z$/i.test(e2)) {
            var r2 = e2.match($);
            if (r2) {
              var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
              return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
            }
          }
          return new Date(e2);
        }(t2), this.init();
      }, m2.init = function() {
        var t2 = this.$d;
        this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
      }, m2.$utils = function() {
        return b;
      }, m2.isValid = function() {
        return !(this.$d.toString() === l);
      }, m2.isSame = function(t2, e2) {
        var n2 = O(t2);
        return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
      }, m2.isAfter = function(t2, e2) {
        return O(t2) < this.startOf(e2);
      }, m2.isBefore = function(t2, e2) {
        return this.endOf(e2) < O(t2);
      }, m2.$g = function(t2, e2, n2) {
        return b.u(t2) ? this[e2] : this.set(n2, t2);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t2, e2) {
        var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
          var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
          return r2 ? i2 : i2.endOf(a);
        }, $2 = function(t3, e3) {
          return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
        }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
        switch (f2) {
          case h:
            return r2 ? l2(1, 0) : l2(31, 11);
          case c:
            return r2 ? l2(1, M3) : l2(0, M3 + 1);
          case o:
            var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
            return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
          case a:
          case d:
            return $2(v2 + "Hours", 0);
          case u:
            return $2(v2 + "Minutes", 1);
          case s:
            return $2(v2 + "Seconds", 2);
          case i:
            return $2(v2 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m2.endOf = function(t2) {
        return this.startOf(t2, false);
      }, m2.$set = function(t2, e2) {
        var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
        if (o2 === c || o2 === h) {
          var y2 = this.clone().set(d, 1);
          y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
        } else l2 && this.$d[l2]($2);
        return this.init(), this;
      }, m2.set = function(t2, e2) {
        return this.clone().$set(t2, e2);
      }, m2.get = function(t2) {
        return this[b.p(t2)]();
      }, m2.add = function(r2, f2) {
        var d2, l2 = this;
        r2 = Number(r2);
        var $2 = b.p(f2), y2 = function(t2) {
          var e2 = O(l2);
          return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
        };
        if ($2 === c) return this.set(c, this.$M + r2);
        if ($2 === h) return this.set(h, this.$y + r2);
        if ($2 === a) return y2(1);
        if ($2 === o) return y2(7);
        var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
        return b.w(m3, this);
      }, m2.subtract = function(t2, e2) {
        return this.add(-1 * t2, e2);
      }, m2.format = function(t2) {
        var e2 = this, n2 = this.$locale();
        if (!this.isValid()) return n2.invalidDate || l;
        var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
          return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
        }, d2 = function(t3) {
          return b.s(s2 % 12 || 12, t3, "0");
        }, $2 = f2 || function(t3, e3, n3) {
          var r3 = t3 < 12 ? "AM" : "PM";
          return n3 ? r3.toLowerCase() : r3;
        };
        return r2.replace(y, function(t3, r3) {
          return r3 || function(t4) {
            switch (t4) {
              case "YY":
                return String(e2.$y).slice(-2);
              case "YYYY":
                return b.s(e2.$y, 4, "0");
              case "M":
                return a2 + 1;
              case "MM":
                return b.s(a2 + 1, 2, "0");
              case "MMM":
                return h2(n2.monthsShort, a2, c2, 3);
              case "MMMM":
                return h2(c2, a2);
              case "D":
                return e2.$D;
              case "DD":
                return b.s(e2.$D, 2, "0");
              case "d":
                return String(e2.$W);
              case "dd":
                return h2(n2.weekdaysMin, e2.$W, o2, 2);
              case "ddd":
                return h2(n2.weekdaysShort, e2.$W, o2, 3);
              case "dddd":
                return o2[e2.$W];
              case "H":
                return String(s2);
              case "HH":
                return b.s(s2, 2, "0");
              case "h":
                return d2(1);
              case "hh":
                return d2(2);
              case "a":
                return $2(s2, u2, true);
              case "A":
                return $2(s2, u2, false);
              case "m":
                return String(u2);
              case "mm":
                return b.s(u2, 2, "0");
              case "s":
                return String(e2.$s);
              case "ss":
                return b.s(e2.$s, 2, "0");
              case "SSS":
                return b.s(e2.$ms, 3, "0");
              case "Z":
                return i2;
            }
            return null;
          }(t3) || i2.replace(":", "");
        });
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r2, d2, l2) {
        var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
          return b.m(y2, m3);
        };
        switch (M3) {
          case h:
            $2 = D2() / 12;
            break;
          case c:
            $2 = D2();
            break;
          case f:
            $2 = D2() / 3;
            break;
          case o:
            $2 = (g2 - v2) / 6048e5;
            break;
          case a:
            $2 = (g2 - v2) / 864e5;
            break;
          case u:
            $2 = g2 / n;
            break;
          case s:
            $2 = g2 / e;
            break;
          case i:
            $2 = g2 / t;
            break;
          default:
            $2 = g2;
        }
        return l2 ? $2 : b.a($2);
      }, m2.daysInMonth = function() {
        return this.endOf(c).$D;
      }, m2.$locale = function() {
        return D[this.$L];
      }, m2.locale = function(t2, e2) {
        if (!t2) return this.$L;
        var n2 = this.clone(), r2 = w(t2, e2, true);
        return r2 && (n2.$L = r2), n2;
      }, m2.clone = function() {
        return b.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M2;
    }(), k = _.prototype;
    return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
      k[t2[1]] = function(e2) {
        return this.$g(e2, t2[0], t2[1]);
      };
    }), O.extend = function(t2, e2) {
      return t2.$i || (t2(e2, _, O), t2.$i = true), O;
    }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
      return O(1e3 * t2);
    }, O.en = D[g], O.Ls = D, O.p = {}, O;
  });
})(dayjs_min);
var dayjs_minExports = dayjs_min.exports;
const dayjs = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
const RadioGroupContext = /* @__PURE__ */ reactExports.createContext(null);
const RadioGroupContextProvider = RadioGroupContext.Provider;
const RadioOptionTypeContext = /* @__PURE__ */ reactExports.createContext(null);
const RadioOptionTypeContextProvider = RadioOptionTypeContext.Provider;
var _excluded = ["prefixCls", "className", "style", "checked", "disabled", "defaultChecked", "type", "title", "onChange"];
var Checkbox = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-checkbox" : _props$prefixCls, className = props.className, style = props.style, checked = props.checked, disabled = props.disabled, _props$defaultChecked = props.defaultChecked, defaultChecked = _props$defaultChecked === void 0 ? false : _props$defaultChecked, _props$type = props.type, type = _props$type === void 0 ? "checkbox" : _props$type, title = props.title, onChange = props.onChange, inputProps = _objectWithoutProperties(props, _excluded);
  var inputRef = reactExports.useRef(null);
  var holderRef = reactExports.useRef(null);
  var _useMergedState = useMergedState(defaultChecked, {
    value: checked
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), rawValue = _useMergedState2[0], setRawValue = _useMergedState2[1];
  reactExports.useImperativeHandle(ref, function() {
    return {
      focus: function focus(options) {
        var _inputRef$current;
        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus(options);
      },
      blur: function blur() {
        var _inputRef$current2;
        (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.blur();
      },
      input: inputRef.current,
      nativeElement: holderRef.current
    };
  });
  var classString = classNames(prefixCls, className, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-checked"), rawValue), "".concat(prefixCls, "-disabled"), disabled));
  var handleChange = function handleChange2(e) {
    if (disabled) {
      return;
    }
    if (!("checked" in props)) {
      setRawValue(e.target.checked);
    }
    onChange === null || onChange === void 0 || onChange({
      target: _objectSpread2(_objectSpread2({}, props), {}, {
        type,
        checked: e.target.checked
      }),
      stopPropagation: function stopPropagation() {
        e.stopPropagation();
      },
      preventDefault: function preventDefault() {
        e.preventDefault();
      },
      nativeEvent: e.nativeEvent
    });
  };
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: classString,
    title,
    style,
    ref: holderRef
  }, /* @__PURE__ */ reactExports.createElement("input", _extends({}, inputProps, {
    className: "".concat(prefixCls, "-input"),
    ref: inputRef,
    onChange: handleChange,
    disabled,
    checked: !!rawValue,
    type
  })), /* @__PURE__ */ reactExports.createElement("span", {
    className: "".concat(prefixCls, "-inner")
  }));
});
function useBubbleLock(onOriginInputClick) {
  const labelClickLockRef = React.useRef(null);
  const clearLock = () => {
    wrapperRaf.cancel(labelClickLockRef.current);
    labelClickLockRef.current = null;
  };
  const onLabelClick = () => {
    clearLock();
    labelClickLockRef.current = wrapperRaf(() => {
      labelClickLockRef.current = null;
    });
  };
  const onInputClick = (e) => {
    if (labelClickLockRef.current) {
      e.stopPropagation();
      clearLock();
    }
    onOriginInputClick === null || onOriginInputClick === void 0 ? void 0 : onOriginInputClick(e);
  };
  return [onLabelClick, onInputClick];
}
const getGroupRadioStyle = (token) => {
  const {
    componentCls,
    antCls
  } = token;
  const groupPrefixCls = `${componentCls}-group`;
  return {
    [groupPrefixCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      display: "inline-block",
      fontSize: 0,
      // RTL
      [`&${groupPrefixCls}-rtl`]: {
        direction: "rtl"
      },
      [`&${groupPrefixCls}-block`]: {
        display: "flex"
      },
      [`${antCls}-badge ${antCls}-badge-count`]: {
        zIndex: 1
      },
      [`> ${antCls}-badge:not(:first-child) > ${antCls}-button-wrapper`]: {
        borderInlineStart: "none"
      }
    })
  };
};
const getRadioBasicStyle = (token) => {
  const {
    componentCls,
    wrapperMarginInlineEnd,
    colorPrimary,
    radioSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOutCirc,
    colorBgContainer,
    colorBorder,
    lineWidth,
    colorBgContainerDisabled,
    colorTextDisabled,
    paddingXS,
    dotColorDisabled,
    lineType,
    radioColor,
    radioBgColor,
    calc
  } = token;
  const radioInnerPrefixCls = `${componentCls}-inner`;
  const dotPadding = 4;
  const radioDotDisabledSize = calc(radioSize).sub(calc(dotPadding).mul(2));
  const radioSizeCalc = calc(1).mul(radioSize).equal({
    unit: true
  });
  return {
    [`${componentCls}-wrapper`]: Object.assign(Object.assign({}, resetComponent(token)), {
      display: "inline-flex",
      alignItems: "baseline",
      marginInlineStart: 0,
      marginInlineEnd: wrapperMarginInlineEnd,
      cursor: "pointer",
      "&:last-child": {
        marginInlineEnd: 0
      },
      // RTL
      [`&${componentCls}-wrapper-rtl`]: {
        direction: "rtl"
      },
      "&-disabled": {
        cursor: "not-allowed",
        color: token.colorTextDisabled
      },
      "&::after": {
        display: "inline-block",
        width: 0,
        overflow: "hidden",
        content: '"\\a0"'
      },
      "&-block": {
        flex: 1,
        justifyContent: "center"
      },
      // hashId 在 wrapper 上，只能铺平
      [`${componentCls}-checked::after`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        width: "100%",
        height: "100%",
        border: `${unit(lineWidth)} ${lineType} ${colorPrimary}`,
        borderRadius: "50%",
        visibility: "hidden",
        opacity: 0,
        content: '""'
      },
      [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        position: "relative",
        display: "inline-block",
        outline: "none",
        cursor: "pointer",
        alignSelf: "center",
        borderRadius: "50%"
      }),
      [`${componentCls}-wrapper:hover &,
        &:hover ${radioInnerPrefixCls}`]: {
        borderColor: colorPrimary
      },
      [`${componentCls}-input:focus-visible + ${radioInnerPrefixCls}`]: genFocusOutline(token),
      [`${componentCls}:hover::after, ${componentCls}-wrapper:hover &::after`]: {
        visibility: "visible"
      },
      [`${componentCls}-inner`]: {
        "&::after": {
          boxSizing: "border-box",
          position: "absolute",
          insetBlockStart: "50%",
          insetInlineStart: "50%",
          display: "block",
          width: radioSizeCalc,
          height: radioSizeCalc,
          marginBlockStart: calc(1).mul(radioSize).div(-2).equal({
            unit: true
          }),
          marginInlineStart: calc(1).mul(radioSize).div(-2).equal({
            unit: true
          }),
          backgroundColor: radioColor,
          borderBlockStart: 0,
          borderInlineStart: 0,
          borderRadius: radioSizeCalc,
          transform: "scale(0)",
          opacity: 0,
          transition: `all ${motionDurationSlow} ${motionEaseInOutCirc}`,
          content: '""'
        },
        boxSizing: "border-box",
        position: "relative",
        insetBlockStart: 0,
        insetInlineStart: 0,
        display: "block",
        width: radioSizeCalc,
        height: radioSizeCalc,
        backgroundColor: colorBgContainer,
        borderColor: colorBorder,
        borderStyle: "solid",
        borderWidth: lineWidth,
        borderRadius: "50%",
        transition: `all ${motionDurationMid}`
      },
      [`${componentCls}-input`]: {
        position: "absolute",
        inset: 0,
        zIndex: 1,
        cursor: "pointer",
        opacity: 0
      },
      // 选中状态
      [`${componentCls}-checked`]: {
        [radioInnerPrefixCls]: {
          borderColor: colorPrimary,
          backgroundColor: radioBgColor,
          "&::after": {
            transform: `scale(${token.calc(token.dotSize).div(radioSize).equal()})`,
            opacity: 1,
            transition: `all ${motionDurationSlow} ${motionEaseInOutCirc}`
          }
        }
      },
      [`${componentCls}-disabled`]: {
        cursor: "not-allowed",
        [radioInnerPrefixCls]: {
          backgroundColor: colorBgContainerDisabled,
          borderColor: colorBorder,
          cursor: "not-allowed",
          "&::after": {
            backgroundColor: dotColorDisabled
          }
        },
        [`${componentCls}-input`]: {
          cursor: "not-allowed"
        },
        [`${componentCls}-disabled + span`]: {
          color: colorTextDisabled,
          cursor: "not-allowed"
        },
        [`&${componentCls}-checked`]: {
          [radioInnerPrefixCls]: {
            "&::after": {
              transform: `scale(${calc(radioDotDisabledSize).div(radioSize).equal()})`
            }
          }
        }
      },
      [`span${componentCls} + *`]: {
        paddingInlineStart: paddingXS,
        paddingInlineEnd: paddingXS
      }
    })
  };
};
const getRadioButtonStyle = (token) => {
  const {
    buttonColor,
    controlHeight,
    componentCls,
    lineWidth,
    lineType,
    colorBorder,
    motionDurationMid,
    buttonPaddingInline,
    fontSize,
    buttonBg,
    fontSizeLG,
    controlHeightLG,
    controlHeightSM,
    paddingXS,
    borderRadius,
    borderRadiusSM,
    borderRadiusLG,
    buttonCheckedBg,
    buttonSolidCheckedColor,
    colorTextDisabled,
    colorBgContainerDisabled,
    buttonCheckedBgDisabled,
    buttonCheckedColorDisabled,
    colorPrimary,
    colorPrimaryHover,
    colorPrimaryActive,
    buttonSolidCheckedBg,
    buttonSolidCheckedHoverBg,
    buttonSolidCheckedActiveBg,
    calc
  } = token;
  return {
    [`${componentCls}-button-wrapper`]: {
      position: "relative",
      display: "inline-block",
      height: controlHeight,
      margin: 0,
      paddingInline: buttonPaddingInline,
      paddingBlock: 0,
      color: buttonColor,
      fontSize,
      lineHeight: unit(calc(controlHeight).sub(calc(lineWidth).mul(2)).equal()),
      background: buttonBg,
      border: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
      // strange align fix for chrome but works
      // https://gw.alipayobjects.com/zos/rmsportal/VFTfKXJuogBAXcvfAUWJ.gif
      borderBlockStartWidth: calc(lineWidth).add(0.02).equal(),
      borderInlineEndWidth: lineWidth,
      cursor: "pointer",
      transition: [`color ${motionDurationMid}`, `background ${motionDurationMid}`, `box-shadow ${motionDurationMid}`].join(","),
      a: {
        color: buttonColor
      },
      [`> ${componentCls}-button`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: -1,
        width: "100%",
        height: "100%"
      },
      "&:not(:last-child)": {
        marginInlineEnd: calc(lineWidth).mul(-1).equal()
      },
      "&:first-child": {
        borderInlineStart: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
        borderStartStartRadius: borderRadius,
        borderEndStartRadius: borderRadius
      },
      "&:last-child": {
        borderStartEndRadius: borderRadius,
        borderEndEndRadius: borderRadius
      },
      "&:first-child:last-child": {
        borderRadius
      },
      [`${componentCls}-group-large &`]: {
        height: controlHeightLG,
        fontSize: fontSizeLG,
        lineHeight: unit(calc(controlHeightLG).sub(calc(lineWidth).mul(2)).equal()),
        "&:first-child": {
          borderStartStartRadius: borderRadiusLG,
          borderEndStartRadius: borderRadiusLG
        },
        "&:last-child": {
          borderStartEndRadius: borderRadiusLG,
          borderEndEndRadius: borderRadiusLG
        }
      },
      [`${componentCls}-group-small &`]: {
        height: controlHeightSM,
        paddingInline: calc(paddingXS).sub(lineWidth).equal(),
        paddingBlock: 0,
        lineHeight: unit(calc(controlHeightSM).sub(calc(lineWidth).mul(2)).equal()),
        "&:first-child": {
          borderStartStartRadius: borderRadiusSM,
          borderEndStartRadius: borderRadiusSM
        },
        "&:last-child": {
          borderStartEndRadius: borderRadiusSM,
          borderEndEndRadius: borderRadiusSM
        }
      },
      "&:hover": {
        position: "relative",
        color: colorPrimary
      },
      "&:has(:focus-visible)": genFocusOutline(token),
      [`${componentCls}-inner, input[type='checkbox'], input[type='radio']`]: {
        width: 0,
        height: 0,
        opacity: 0,
        pointerEvents: "none"
      },
      [`&-checked:not(${componentCls}-button-wrapper-disabled)`]: {
        zIndex: 1,
        color: colorPrimary,
        background: buttonCheckedBg,
        borderColor: colorPrimary,
        "&::before": {
          backgroundColor: colorPrimary
        },
        "&:first-child": {
          borderColor: colorPrimary
        },
        "&:hover": {
          color: colorPrimaryHover,
          borderColor: colorPrimaryHover,
          "&::before": {
            backgroundColor: colorPrimaryHover
          }
        },
        "&:active": {
          color: colorPrimaryActive,
          borderColor: colorPrimaryActive,
          "&::before": {
            backgroundColor: colorPrimaryActive
          }
        }
      },
      [`${componentCls}-group-solid &-checked:not(${componentCls}-button-wrapper-disabled)`]: {
        color: buttonSolidCheckedColor,
        background: buttonSolidCheckedBg,
        borderColor: buttonSolidCheckedBg,
        "&:hover": {
          color: buttonSolidCheckedColor,
          background: buttonSolidCheckedHoverBg,
          borderColor: buttonSolidCheckedHoverBg
        },
        "&:active": {
          color: buttonSolidCheckedColor,
          background: buttonSolidCheckedActiveBg,
          borderColor: buttonSolidCheckedActiveBg
        }
      },
      "&-disabled": {
        color: colorTextDisabled,
        backgroundColor: colorBgContainerDisabled,
        borderColor: colorBorder,
        cursor: "not-allowed",
        "&:first-child, &:hover": {
          color: colorTextDisabled,
          backgroundColor: colorBgContainerDisabled,
          borderColor: colorBorder
        }
      },
      [`&-disabled${componentCls}-button-wrapper-checked`]: {
        color: buttonCheckedColorDisabled,
        backgroundColor: buttonCheckedBgDisabled,
        borderColor: colorBorder,
        boxShadow: "none"
      },
      "&-block": {
        flex: 1,
        textAlign: "center"
      }
    }
  };
};
const prepareComponentToken = (token) => {
  const {
    wireframe,
    padding,
    marginXS,
    lineWidth,
    fontSizeLG,
    colorText,
    colorBgContainer,
    colorTextDisabled,
    controlItemBgActiveDisabled,
    colorTextLightSolid,
    colorPrimary,
    colorPrimaryHover,
    colorPrimaryActive,
    colorWhite
  } = token;
  const dotPadding = 4;
  const radioSize = fontSizeLG;
  const radioDotSize = wireframe ? radioSize - dotPadding * 2 : radioSize - (dotPadding + lineWidth) * 2;
  return {
    // Radio
    radioSize,
    dotSize: radioDotSize,
    dotColorDisabled: colorTextDisabled,
    // Radio buttons
    buttonSolidCheckedColor: colorTextLightSolid,
    buttonSolidCheckedBg: colorPrimary,
    buttonSolidCheckedHoverBg: colorPrimaryHover,
    buttonSolidCheckedActiveBg: colorPrimaryActive,
    buttonBg: colorBgContainer,
    buttonCheckedBg: colorBgContainer,
    buttonColor: colorText,
    buttonCheckedBgDisabled: controlItemBgActiveDisabled,
    buttonCheckedColorDisabled: colorTextDisabled,
    buttonPaddingInline: padding - lineWidth,
    wrapperMarginInlineEnd: marginXS,
    // internal
    radioColor: wireframe ? colorPrimary : colorWhite,
    radioBgColor: wireframe ? colorBgContainer : colorPrimary
  };
};
const useStyle = genStyleHooks("Radio", (token) => {
  const {
    controlOutline,
    controlOutlineWidth
  } = token;
  const radioFocusShadow = `0 0 0 ${unit(controlOutlineWidth)} ${controlOutline}`;
  const radioButtonFocusShadow = radioFocusShadow;
  const radioToken = merge(token, {
    radioFocusShadow,
    radioButtonFocusShadow
  });
  return [getGroupRadioStyle(radioToken), getRadioBasicStyle(radioToken), getRadioButtonStyle(radioToken)];
}, prepareComponentToken, {
  unitless: {
    radioSize: true,
    dotSize: true
  }
});
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalRadio = (props, ref) => {
  var _a, _b;
  const groupContext = reactExports.useContext(RadioGroupContext);
  const radioOptionTypeContext = reactExports.useContext(RadioOptionTypeContext);
  const {
    getPrefixCls,
    direction,
    radio
  } = reactExports.useContext(ConfigContext);
  const innerRef = reactExports.useRef(null);
  const mergedRef = composeRef(ref, innerRef);
  const {
    isFormItemInput
  } = reactExports.useContext(FormItemInputContext);
  const onChange = (e) => {
    var _a2, _b2;
    (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, e);
    (_b2 = groupContext === null || groupContext === void 0 ? void 0 : groupContext.onChange) === null || _b2 === void 0 ? void 0 : _b2.call(groupContext, e);
  };
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    style,
    title
  } = props, restProps = __rest$1(props, ["prefixCls", "className", "rootClassName", "children", "style", "title"]);
  const radioPrefixCls = getPrefixCls("radio", customizePrefixCls);
  const isButtonType = ((groupContext === null || groupContext === void 0 ? void 0 : groupContext.optionType) || radioOptionTypeContext) === "button";
  const prefixCls = isButtonType ? `${radioPrefixCls}-button` : radioPrefixCls;
  const rootCls = useCSSVarCls(radioPrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(radioPrefixCls, rootCls);
  const radioProps = Object.assign({}, restProps);
  const disabled = reactExports.useContext(DisabledContext);
  if (groupContext) {
    radioProps.name = groupContext.name;
    radioProps.onChange = onChange;
    radioProps.checked = props.value === groupContext.value;
    radioProps.disabled = (_a = radioProps.disabled) !== null && _a !== void 0 ? _a : groupContext.disabled;
  }
  radioProps.disabled = (_b = radioProps.disabled) !== null && _b !== void 0 ? _b : disabled;
  const wrapperClassString = classNames(`${prefixCls}-wrapper`, {
    [`${prefixCls}-wrapper-checked`]: radioProps.checked,
    [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    [`${prefixCls}-wrapper-rtl`]: direction === "rtl",
    [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput,
    [`${prefixCls}-wrapper-block`]: !!(groupContext === null || groupContext === void 0 ? void 0 : groupContext.block)
  }, radio === null || radio === void 0 ? void 0 : radio.className, className, rootClassName, hashId, cssVarCls, rootCls);
  const [onLabelClick, onInputClick] = useBubbleLock(radioProps.onClick);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Wave, {
    component: "Radio",
    disabled: radioProps.disabled
  }, /* @__PURE__ */ reactExports.createElement("label", {
    className: wrapperClassString,
    style: Object.assign(Object.assign({}, radio === null || radio === void 0 ? void 0 : radio.style), style),
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    title,
    onClick: onLabelClick
  }, /* @__PURE__ */ reactExports.createElement(Checkbox, Object.assign({}, radioProps, {
    className: classNames(radioProps.className, {
      [TARGET_CLS]: !isButtonType
    }),
    type: "radio",
    prefixCls,
    ref: mergedRef,
    onClick: onInputClick
  })), children !== void 0 ? /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-label`
  }, children) : null)));
};
const Radio$1 = /* @__PURE__ */ reactExports.forwardRef(InternalRadio);
const RadioGroup = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    name: formItemName
  } = reactExports.useContext(FormItemInputContext);
  const defaultName = useId(toNamePathStr(formItemName));
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    options,
    buttonStyle = "outline",
    disabled,
    children,
    size: customizeSize,
    style,
    id,
    optionType,
    name = defaultName,
    defaultValue,
    value: customizedValue,
    block = false,
    onChange,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur
  } = props;
  const [value, setValue] = useMergedState(defaultValue, {
    value: customizedValue
  });
  const onRadioChange = reactExports.useCallback((event) => {
    const lastValue = value;
    const val = event.target.value;
    if (!("value" in props)) {
      setValue(val);
    }
    if (val !== lastValue) {
      onChange === null || onChange === void 0 ? void 0 : onChange(event);
    }
  }, [value, setValue, onChange]);
  const prefixCls = getPrefixCls("radio", customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  let childrenToRender = children;
  if (options && options.length > 0) {
    childrenToRender = options.map((option) => {
      if (typeof option === "string" || typeof option === "number") {
        return /* @__PURE__ */ reactExports.createElement(Radio$1, {
          key: option.toString(),
          prefixCls,
          disabled,
          value: option,
          checked: value === option
        }, option);
      }
      return /* @__PURE__ */ reactExports.createElement(Radio$1, {
        key: `radio-group-value-options-${option.value}`,
        prefixCls,
        disabled: option.disabled || disabled,
        value: option.value,
        checked: value === option.value,
        title: option.title,
        style: option.style,
        className: option.className,
        id: option.id,
        required: option.required
      }, option.label);
    });
  }
  const mergedSize = useSize(customizeSize);
  const classString = classNames(groupPrefixCls, `${groupPrefixCls}-${buttonStyle}`, {
    [`${groupPrefixCls}-${mergedSize}`]: mergedSize,
    [`${groupPrefixCls}-rtl`]: direction === "rtl",
    [`${groupPrefixCls}-block`]: block
  }, className, rootClassName, hashId, cssVarCls, rootCls);
  const memoizedValue = reactExports.useMemo(() => ({
    onChange: onRadioChange,
    value,
    disabled,
    name,
    optionType,
    block
  }), [onRadioChange, value, disabled, name, optionType, block]);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({}, pickAttrs(props, {
    aria: true,
    data: true
  }), {
    className: classString,
    style,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    id,
    ref
  }), /* @__PURE__ */ reactExports.createElement(RadioGroupContextProvider, {
    value: memoizedValue
  }, childrenToRender)));
});
const Group = /* @__PURE__ */ reactExports.memo(RadioGroup);
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const RadioButton = (props, ref) => {
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls
  } = props, radioProps = __rest(props, ["prefixCls"]);
  const prefixCls = getPrefixCls("radio", customizePrefixCls);
  return /* @__PURE__ */ reactExports.createElement(RadioOptionTypeContextProvider, {
    value: "button"
  }, /* @__PURE__ */ reactExports.createElement(Radio$1, Object.assign({
    prefixCls
  }, radioProps, {
    type: "radio",
    ref
  })));
};
const Button = /* @__PURE__ */ reactExports.forwardRef(RadioButton);
const Radio = Radio$1;
Radio.Button = Button;
Radio.Group = Group;
Radio.__ANT_RADIO = true;
export {
  Checkbox as C,
  Radio as R,
  dayjs as d,
  useBubbleLock as u
};
