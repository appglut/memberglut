import { d8 as reactExports, I as Icon, af as _extends, j as ConfigContext, dJ as useStyle$2, aw as classNames, t as FormItemInputContext, cs as genStyleHooks, c_ as merge, cO as initInputToken, cM as initComponentToken, w as Input$1, dV as wrapperRaf, d3 as pickAttrs, dH as useSize, cD as getMergedStatus, du as useEvent, aq as _toConsumableArray, D as DisabledContext, dD as useRemovePasswordTimeout, d1 as omit, aA as composeRef, dq as useCompactItemContext, ay as cloneElement, c as Button, Z as RefIcon$2, al as _objectWithoutProperties, dB as useMergedState, ao as _slicedToArray, ar as _typeof, dx as useLayoutEffect, ak as _objectSpread2, _ as RefResizeObserver, ae as _defineProperty, R as React, dt as useCount, B as BaseInput, dd as resolveOnChange, dr as useComponentConfig, dk as triggerFocus, dm as useCSSVarCls, dG as useSharedStyle, dL as useVariant, cy as getAllowClear, cI as getStatusClassNames } from "./Page-C9tSda4_.js";
var EyeOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" } }] }, "name": "eye", "theme": "outlined" };
var EyeOutlined = function EyeOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: EyeOutlined$1
  }));
};
var RefIcon$1 = /* @__PURE__ */ reactExports.forwardRef(EyeOutlined);
const Group = (props) => {
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className
  } = props;
  const prefixCls = getPrefixCls("input-group", customizePrefixCls);
  const inputPrefixCls = getPrefixCls("input");
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$2(inputPrefixCls);
  const cls = classNames(prefixCls, cssVarCls, {
    [`${prefixCls}-lg`]: props.size === "large",
    [`${prefixCls}-sm`]: props.size === "small",
    [`${prefixCls}-compact`]: props.compact,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, hashId, className);
  const formItemContext = reactExports.useContext(FormItemInputContext);
  const groupFormItemContext = reactExports.useMemo(() => Object.assign(Object.assign({}, formItemContext), {
    isFormItemInput: false
  }), [formItemContext]);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("span", {
    className: cls,
    style: props.style,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    onFocus: props.onFocus,
    onBlur: props.onBlur
  }, /* @__PURE__ */ reactExports.createElement(FormItemInputContext.Provider, {
    value: groupFormItemContext
  }, props.children)));
};
const genOTPStyle = (token) => {
  const {
    componentCls,
    paddingXS
  } = token;
  return {
    [componentCls]: {
      display: "inline-flex",
      alignItems: "center",
      flexWrap: "nowrap",
      columnGap: paddingXS,
      [`${componentCls}-input-wrapper`]: {
        position: "relative",
        [`${componentCls}-mask-icon`]: {
          position: "absolute",
          zIndex: "1",
          top: "50%",
          right: "50%",
          transform: "translate(50%, -50%)",
          pointerEvents: "none"
        },
        [`${componentCls}-mask-input`]: {
          color: "transparent",
          caretColor: token.colorText
        },
        [`${componentCls}-mask-input[type=number]::-webkit-inner-spin-button`]: {
          "-webkit-appearance": "none",
          margin: 0
        },
        [`${componentCls}-mask-input[type=number]`]: {
          "-moz-appearance": "textfield"
        }
      },
      "&-rtl": {
        direction: "rtl"
      },
      [`${componentCls}-input`]: {
        textAlign: "center",
        paddingInline: token.paddingXXS
      },
      // ================= Size =================
      [`&${componentCls}-sm ${componentCls}-input`]: {
        paddingInline: token.calc(token.paddingXXS).div(2).equal()
      },
      [`&${componentCls}-lg ${componentCls}-input`]: {
        paddingInline: token.paddingXS
      }
    }
  };
};
const useStyle$1 = genStyleHooks(["Input", "OTP"], (token) => {
  const inputToken = merge(token, initInputToken(token));
  return genOTPStyle(inputToken);
}, initComponentToken);
var __rest$4 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const OTPInput = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    className,
    value,
    onChange,
    onActiveChange,
    index,
    mask
  } = props, restProps = __rest$4(props, ["className", "value", "onChange", "onActiveChange", "index", "mask"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("otp");
  const maskValue = typeof mask === "string" ? mask : value;
  const inputRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => inputRef.current);
  const onInternalChange = (e) => {
    onChange(index, e.target.value);
  };
  const syncSelection = () => {
    wrapperRaf(() => {
      var _a;
      const inputEle = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.input;
      if (document.activeElement === inputEle && inputEle) {
        inputEle.select();
      }
    });
  };
  const onInternalKeyDown = (event) => {
    const {
      key,
      ctrlKey,
      metaKey
    } = event;
    if (key === "ArrowLeft") {
      onActiveChange(index - 1);
    } else if (key === "ArrowRight") {
      onActiveChange(index + 1);
    } else if (key === "z" && (ctrlKey || metaKey)) {
      event.preventDefault();
    } else if (key === "Backspace" && !value) {
      onActiveChange(index - 1);
    }
    syncSelection();
  };
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-input-wrapper`,
    role: "presentation"
  }, mask && value !== "" && value !== void 0 && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-mask-icon`,
    "aria-hidden": "true"
  }, maskValue), /* @__PURE__ */ reactExports.createElement(Input$1, Object.assign({
    "aria-label": `OTP Input ${index + 1}`,
    type: mask === true ? "password" : "text"
  }, restProps, {
    ref: inputRef,
    value,
    onInput: onInternalChange,
    onFocus: syncSelection,
    onKeyDown: onInternalKeyDown,
    onMouseDown: syncSelection,
    onMouseUp: syncSelection,
    className: classNames(className, {
      [`${prefixCls}-mask-input`]: mask
    })
  })));
});
var __rest$3 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function strToArr(str) {
  return (str || "").split("");
}
const Separator = (props) => {
  const {
    index,
    prefixCls,
    separator
  } = props;
  const separatorNode = typeof separator === "function" ? separator(index) : separator;
  if (!separatorNode) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-separator`
  }, separatorNode);
};
const OTP = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    length = 6,
    size: customSize,
    defaultValue,
    value,
    onChange,
    formatter,
    separator,
    variant,
    disabled,
    status: customStatus,
    autoFocus,
    mask,
    type,
    onInput,
    inputMode
  } = props, restProps = __rest$3(props, ["prefixCls", "length", "size", "defaultValue", "value", "onChange", "formatter", "separator", "variant", "disabled", "status", "autoFocus", "mask", "type", "onInput", "inputMode"]);
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("otp", customizePrefixCls);
  const domAttrs = pickAttrs(restProps, {
    aria: true,
    data: true,
    attr: true
  });
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$1(prefixCls);
  const mergedSize = useSize((ctx) => customSize !== null && customSize !== void 0 ? customSize : ctx);
  const formContext = reactExports.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(formContext.status, customStatus);
  const proxyFormContext = reactExports.useMemo(() => Object.assign(Object.assign({}, formContext), {
    status: mergedStatus,
    hasFeedback: false,
    feedbackIcon: null
  }), [formContext, mergedStatus]);
  const containerRef = reactExports.useRef(null);
  const refs = reactExports.useRef({});
  reactExports.useImperativeHandle(ref, () => ({
    focus: () => {
      var _a;
      (_a = refs.current[0]) === null || _a === void 0 ? void 0 : _a.focus();
    },
    blur: () => {
      var _a;
      for (let i = 0; i < length; i += 1) {
        (_a = refs.current[i]) === null || _a === void 0 ? void 0 : _a.blur();
      }
    },
    nativeElement: containerRef.current
  }));
  const internalFormatter = (txt) => formatter ? formatter(txt) : txt;
  const [valueCells, setValueCells] = reactExports.useState(() => strToArr(internalFormatter(defaultValue || "")));
  reactExports.useEffect(() => {
    if (value !== void 0) {
      setValueCells(strToArr(value));
    }
  }, [value]);
  const triggerValueCellsChange = useEvent((nextValueCells) => {
    setValueCells(nextValueCells);
    if (onInput) {
      onInput(nextValueCells);
    }
    if (onChange && nextValueCells.length === length && nextValueCells.every((c) => c) && nextValueCells.some((c, index) => valueCells[index] !== c)) {
      onChange(nextValueCells.join(""));
    }
  });
  const patchValue = useEvent((index, txt) => {
    let nextCells = _toConsumableArray(valueCells);
    for (let i = 0; i < index; i += 1) {
      if (!nextCells[i]) {
        nextCells[i] = "";
      }
    }
    if (txt.length <= 1) {
      nextCells[index] = txt;
    } else {
      nextCells = nextCells.slice(0, index).concat(strToArr(txt));
    }
    nextCells = nextCells.slice(0, length);
    for (let i = nextCells.length - 1; i >= 0; i -= 1) {
      if (nextCells[i]) {
        break;
      }
      nextCells.pop();
    }
    const formattedValue = internalFormatter(nextCells.map((c) => c || " ").join(""));
    nextCells = strToArr(formattedValue).map((c, i) => {
      if (c === " " && !nextCells[i]) {
        return nextCells[i];
      }
      return c;
    });
    return nextCells;
  });
  const onInputChange = (index, txt) => {
    var _a;
    const nextCells = patchValue(index, txt);
    const nextIndex = Math.min(index + txt.length, length - 1);
    if (nextIndex !== index && nextCells[index] !== void 0) {
      (_a = refs.current[nextIndex]) === null || _a === void 0 ? void 0 : _a.focus();
    }
    triggerValueCellsChange(nextCells);
  };
  const onInputActiveChange = (nextIndex) => {
    var _a;
    (_a = refs.current[nextIndex]) === null || _a === void 0 ? void 0 : _a.focus();
  };
  const inputSharedProps = {
    variant,
    disabled,
    status: mergedStatus,
    mask,
    type,
    inputMode
  };
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({}, domAttrs, {
    ref: containerRef,
    className: classNames(prefixCls, {
      [`${prefixCls}-sm`]: mergedSize === "small",
      [`${prefixCls}-lg`]: mergedSize === "large",
      [`${prefixCls}-rtl`]: direction === "rtl"
    }, cssVarCls, hashId),
    role: "group"
  }), /* @__PURE__ */ reactExports.createElement(FormItemInputContext.Provider, {
    value: proxyFormContext
  }, Array.from({
    length
  }).map((_, index) => {
    const key = `otp-${index}`;
    const singleValue = valueCells[index] || "";
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, {
      key
    }, /* @__PURE__ */ reactExports.createElement(OTPInput, Object.assign({
      ref: (inputEle) => {
        refs.current[index] = inputEle;
      },
      index,
      size: mergedSize,
      htmlSize: 1,
      className: `${prefixCls}-input`,
      onChange: onInputChange,
      value: singleValue,
      onActiveChange: onInputActiveChange,
      autoFocus: index === 0 && autoFocus
    }, inputSharedProps)), index < length - 1 && /* @__PURE__ */ reactExports.createElement(Separator, {
      separator,
      index,
      prefixCls
    }));
  }))));
});
var EyeInvisibleOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" } }, { "tag": "path", "attrs": { "d": "M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" } }] }, "name": "eye-invisible", "theme": "outlined" };
var EyeInvisibleOutlined = function EyeInvisibleOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: EyeInvisibleOutlined$1
  }));
};
var RefIcon = /* @__PURE__ */ reactExports.forwardRef(EyeInvisibleOutlined);
var __rest$2 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const defaultIconRender = (visible) => visible ? /* @__PURE__ */ reactExports.createElement(RefIcon$1, null) : /* @__PURE__ */ reactExports.createElement(RefIcon, null);
const actionMap = {
  click: "onClick",
  hover: "onMouseOver"
};
const Password = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    disabled: customDisabled,
    action = "click",
    visibilityToggle = true,
    iconRender = defaultIconRender,
    suffix
  } = props;
  const disabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const visibilityControlled = typeof visibilityToggle === "object" && visibilityToggle.visible !== void 0;
  const [visible, setVisible] = reactExports.useState(() => visibilityControlled ? visibilityToggle.visible : false);
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (visibilityControlled) {
      setVisible(visibilityToggle.visible);
    }
  }, [visibilityControlled, visibilityToggle]);
  const removePasswordTimeout = useRemovePasswordTimeout(inputRef);
  const onVisibleChange = () => {
    var _a;
    if (mergedDisabled) {
      return;
    }
    if (visible) {
      removePasswordTimeout();
    }
    const nextVisible = !visible;
    setVisible(nextVisible);
    if (typeof visibilityToggle === "object") {
      (_a = visibilityToggle.onVisibleChange) === null || _a === void 0 ? void 0 : _a.call(visibilityToggle, nextVisible);
    }
  };
  const getIcon = (prefixCls2) => {
    const iconTrigger = actionMap[action] || "";
    const icon = iconRender(visible);
    const iconProps = {
      [iconTrigger]: onVisibleChange,
      className: `${prefixCls2}-icon`,
      key: "passwordIcon",
      onMouseDown: (e) => {
        e.preventDefault();
      },
      onMouseUp: (e) => {
        e.preventDefault();
      }
    };
    return /* @__PURE__ */ reactExports.cloneElement(/* @__PURE__ */ reactExports.isValidElement(icon) ? icon : /* @__PURE__ */ reactExports.createElement("span", null, icon), iconProps);
  };
  const {
    className,
    prefixCls: customizePrefixCls,
    inputPrefixCls: customizeInputPrefixCls,
    size
  } = props, restProps = __rest$2(props, ["className", "prefixCls", "inputPrefixCls", "size"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const inputPrefixCls = getPrefixCls("input", customizeInputPrefixCls);
  const prefixCls = getPrefixCls("input-password", customizePrefixCls);
  const suffixIcon = visibilityToggle && getIcon(prefixCls);
  const inputClassName = classNames(prefixCls, className, {
    [`${prefixCls}-${size}`]: !!size
  });
  const omittedProps = Object.assign(Object.assign({}, omit(restProps, ["suffix", "iconRender", "visibilityToggle"])), {
    type: visible ? "text" : "password",
    className: inputClassName,
    prefixCls: inputPrefixCls,
    suffix: /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, suffixIcon, suffix)
  });
  if (size) {
    omittedProps.size = size;
  }
  return /* @__PURE__ */ reactExports.createElement(Input$1, Object.assign({
    ref: composeRef(ref, inputRef)
  }, omittedProps));
});
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Search = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    inputPrefixCls: customizeInputPrefixCls,
    className,
    size: customizeSize,
    suffix,
    enterButton = false,
    addonAfter,
    loading,
    disabled,
    onSearch: customOnSearch,
    onChange: customOnChange,
    onCompositionStart,
    onCompositionEnd,
    variant,
    onPressEnter: customOnPressEnter
  } = props, restProps = __rest$1(props, ["prefixCls", "inputPrefixCls", "className", "size", "suffix", "enterButton", "addonAfter", "loading", "disabled", "onSearch", "onChange", "onCompositionStart", "onCompositionEnd", "variant", "onPressEnter"]);
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const composedRef = reactExports.useRef(false);
  const prefixCls = getPrefixCls("input-search", customizePrefixCls);
  const inputPrefixCls = getPrefixCls("input", customizeInputPrefixCls);
  const {
    compactSize
  } = useCompactItemContext(prefixCls, direction);
  const size = useSize((ctx) => {
    var _a;
    return (_a = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a !== void 0 ? _a : ctx;
  });
  const inputRef = reactExports.useRef(null);
  const onChange = (e) => {
    if ((e === null || e === void 0 ? void 0 : e.target) && e.type === "click" && customOnSearch) {
      customOnSearch(e.target.value, e, {
        source: "clear"
      });
    }
    customOnChange === null || customOnChange === void 0 ? void 0 : customOnChange(e);
  };
  const onMouseDown = (e) => {
    var _a;
    if (document.activeElement === ((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.input)) {
      e.preventDefault();
    }
  };
  const onSearch = (e) => {
    var _a, _b;
    if (customOnSearch) {
      customOnSearch((_b = (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.value, e, {
        source: "input"
      });
    }
  };
  const onPressEnter = (e) => {
    if (composedRef.current || loading) {
      return;
    }
    customOnPressEnter === null || customOnPressEnter === void 0 ? void 0 : customOnPressEnter(e);
    onSearch(e);
  };
  const searchIcon = typeof enterButton === "boolean" ? /* @__PURE__ */ reactExports.createElement(RefIcon$2, null) : null;
  const btnClassName = `${prefixCls}-button`;
  let button;
  const enterButtonAsElement = enterButton || {};
  const isAntdButton = enterButtonAsElement.type && enterButtonAsElement.type.__ANT_BUTTON === true;
  if (isAntdButton || enterButtonAsElement.type === "button") {
    button = cloneElement(enterButtonAsElement, Object.assign({
      onMouseDown,
      onClick: (e) => {
        var _a, _b;
        (_b = (_a = enterButtonAsElement === null || enterButtonAsElement === void 0 ? void 0 : enterButtonAsElement.props) === null || _a === void 0 ? void 0 : _a.onClick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        onSearch(e);
      },
      key: "enterButton"
    }, isAntdButton ? {
      className: btnClassName,
      size
    } : {}));
  } else {
    button = /* @__PURE__ */ reactExports.createElement(Button, {
      className: btnClassName,
      color: enterButton ? "primary" : "default",
      size,
      disabled,
      key: "enterButton",
      onMouseDown,
      onClick: onSearch,
      loading,
      icon: searchIcon,
      variant: variant === "borderless" || variant === "filled" || variant === "underlined" ? "text" : enterButton ? "solid" : void 0
    }, enterButton);
  }
  if (addonAfter) {
    button = [button, cloneElement(addonAfter, {
      key: "addonAfter"
    })];
  }
  const cls = classNames(prefixCls, {
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-${size}`]: !!size,
    [`${prefixCls}-with-button`]: !!enterButton
  }, className);
  const handleOnCompositionStart = (e) => {
    composedRef.current = true;
    onCompositionStart === null || onCompositionStart === void 0 ? void 0 : onCompositionStart(e);
  };
  const handleOnCompositionEnd = (e) => {
    composedRef.current = false;
    onCompositionEnd === null || onCompositionEnd === void 0 ? void 0 : onCompositionEnd(e);
  };
  const inputProps = Object.assign(Object.assign({}, restProps), {
    className: cls,
    prefixCls: inputPrefixCls,
    type: "search",
    size,
    variant,
    onPressEnter,
    onCompositionStart: handleOnCompositionStart,
    onCompositionEnd: handleOnCompositionEnd,
    addonAfter: button,
    suffix,
    onChange,
    disabled,
    _skipAddonWarning: true
  });
  return /* @__PURE__ */ reactExports.createElement(Input$1, Object.assign({
    ref: composeRef(inputRef, ref)
  }, inputProps));
});
var HIDDEN_TEXTAREA_STYLE = "\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important;\n  pointer-events: none !important;\n";
var SIZING_STYLE = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "font-variant", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing", "word-break", "white-space"];
var computedStyleCache = {};
var hiddenTextarea;
function calculateNodeStyling(node) {
  var useCache = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var nodeRef = node.getAttribute("id") || node.getAttribute("data-reactid") || node.getAttribute("name");
  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }
  var style = window.getComputedStyle(node);
  var boxSizing = style.getPropertyValue("box-sizing") || style.getPropertyValue("-moz-box-sizing") || style.getPropertyValue("-webkit-box-sizing");
  var paddingSize = parseFloat(style.getPropertyValue("padding-bottom")) + parseFloat(style.getPropertyValue("padding-top"));
  var borderSize = parseFloat(style.getPropertyValue("border-bottom-width")) + parseFloat(style.getPropertyValue("border-top-width"));
  var sizingStyle = SIZING_STYLE.map(function(name) {
    return "".concat(name, ":").concat(style.getPropertyValue(name));
  }).join(";");
  var nodeInfo = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing
  };
  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }
  return nodeInfo;
}
function calculateAutoSizeStyle(uiTextNode) {
  var useCache = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var minRows = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
  var maxRows = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    hiddenTextarea.setAttribute("tab-index", "-1");
    hiddenTextarea.setAttribute("aria-hidden", "true");
    hiddenTextarea.setAttribute("name", "hiddenTextarea");
    document.body.appendChild(hiddenTextarea);
  }
  if (uiTextNode.getAttribute("wrap")) {
    hiddenTextarea.setAttribute("wrap", uiTextNode.getAttribute("wrap"));
  } else {
    hiddenTextarea.removeAttribute("wrap");
  }
  var _calculateNodeStyling = calculateNodeStyling(uiTextNode, useCache), paddingSize = _calculateNodeStyling.paddingSize, borderSize = _calculateNodeStyling.borderSize, boxSizing = _calculateNodeStyling.boxSizing, sizingStyle = _calculateNodeStyling.sizingStyle;
  hiddenTextarea.setAttribute("style", "".concat(sizingStyle, ";").concat(HIDDEN_TEXTAREA_STYLE));
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || "";
  var minHeight = void 0;
  var maxHeight = void 0;
  var overflowY;
  var height = hiddenTextarea.scrollHeight;
  if (boxSizing === "border-box") {
    height += borderSize;
  } else if (boxSizing === "content-box") {
    height -= paddingSize;
  }
  if (minRows !== null || maxRows !== null) {
    hiddenTextarea.value = " ";
    var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === "border-box") {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === "border-box") {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      overflowY = height > maxHeight ? "" : "hidden";
      height = Math.min(maxHeight, height);
    }
  }
  var style = {
    height,
    overflowY,
    resize: "none"
  };
  if (minHeight) {
    style.minHeight = minHeight;
  }
  if (maxHeight) {
    style.maxHeight = maxHeight;
  }
  return style;
}
var _excluded$1 = ["prefixCls", "defaultValue", "value", "autoSize", "onResize", "className", "style", "disabled", "onChange", "onInternalAutoSize"];
var RESIZE_START = 0;
var RESIZE_MEASURING = 1;
var RESIZE_STABLE = 2;
var ResizableTextArea = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var _ref = props, prefixCls = _ref.prefixCls, defaultValue = _ref.defaultValue, value = _ref.value, autoSize = _ref.autoSize, onResize = _ref.onResize, className = _ref.className, style = _ref.style, disabled = _ref.disabled, onChange = _ref.onChange;
  _ref.onInternalAutoSize;
  var restProps = _objectWithoutProperties(_ref, _excluded$1);
  var _useMergedState = useMergedState(defaultValue, {
    value,
    postState: function postState(val) {
      return val !== null && val !== void 0 ? val : "";
    }
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedValue = _useMergedState2[0], setMergedValue = _useMergedState2[1];
  var onInternalChange = function onInternalChange2(event) {
    setMergedValue(event.target.value);
    onChange === null || onChange === void 0 || onChange(event);
  };
  var textareaRef = reactExports.useRef();
  reactExports.useImperativeHandle(ref, function() {
    return {
      textArea: textareaRef.current
    };
  });
  var _React$useMemo = reactExports.useMemo(function() {
    if (autoSize && _typeof(autoSize) === "object") {
      return [autoSize.minRows, autoSize.maxRows];
    }
    return [];
  }, [autoSize]), _React$useMemo2 = _slicedToArray(_React$useMemo, 2), minRows = _React$useMemo2[0], maxRows = _React$useMemo2[1];
  var needAutoSize = !!autoSize;
  var _React$useState = reactExports.useState(RESIZE_STABLE), _React$useState2 = _slicedToArray(_React$useState, 2), resizeState = _React$useState2[0], setResizeState = _React$useState2[1];
  var _React$useState3 = reactExports.useState(), _React$useState4 = _slicedToArray(_React$useState3, 2), autoSizeStyle = _React$useState4[0], setAutoSizeStyle = _React$useState4[1];
  var startResize = function startResize2() {
    setResizeState(RESIZE_START);
  };
  useLayoutEffect(function() {
    if (needAutoSize) {
      startResize();
    }
  }, [value, minRows, maxRows, needAutoSize]);
  useLayoutEffect(function() {
    if (resizeState === RESIZE_START) {
      setResizeState(RESIZE_MEASURING);
    } else if (resizeState === RESIZE_MEASURING) {
      var textareaStyles = calculateAutoSizeStyle(textareaRef.current, false, minRows, maxRows);
      setResizeState(RESIZE_STABLE);
      setAutoSizeStyle(textareaStyles);
    } else ;
  }, [resizeState]);
  var resizeRafRef = reactExports.useRef();
  var cleanRaf = function cleanRaf2() {
    wrapperRaf.cancel(resizeRafRef.current);
  };
  var onInternalResize = function onInternalResize2(size) {
    if (resizeState === RESIZE_STABLE) {
      onResize === null || onResize === void 0 || onResize(size);
      if (autoSize) {
        cleanRaf();
        resizeRafRef.current = wrapperRaf(function() {
          startResize();
        });
      }
    }
  };
  reactExports.useEffect(function() {
    return cleanRaf;
  }, []);
  var mergedAutoSizeStyle = needAutoSize ? autoSizeStyle : null;
  var mergedStyle = _objectSpread2(_objectSpread2({}, style), mergedAutoSizeStyle);
  if (resizeState === RESIZE_START || resizeState === RESIZE_MEASURING) {
    mergedStyle.overflowY = "hidden";
    mergedStyle.overflowX = "hidden";
  }
  return /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    onResize: onInternalResize,
    disabled: !(autoSize || onResize)
  }, /* @__PURE__ */ reactExports.createElement("textarea", _extends({}, restProps, {
    ref: textareaRef,
    style: mergedStyle,
    className: classNames(prefixCls, className, _defineProperty({}, "".concat(prefixCls, "-disabled"), disabled)),
    disabled,
    value: mergedValue,
    onChange: onInternalChange
  })));
});
var _excluded = ["defaultValue", "value", "onFocus", "onBlur", "onChange", "allowClear", "maxLength", "onCompositionStart", "onCompositionEnd", "suffix", "prefixCls", "showCount", "count", "className", "style", "disabled", "hidden", "classNames", "styles", "onResize", "onClear", "onPressEnter", "readOnly", "autoSize", "onKeyDown"];
var TextArea$1 = /* @__PURE__ */ React.forwardRef(function(_ref, ref) {
  var _countConfig$max;
  var defaultValue = _ref.defaultValue, customValue = _ref.value, onFocus = _ref.onFocus, onBlur = _ref.onBlur, onChange = _ref.onChange, allowClear = _ref.allowClear, maxLength = _ref.maxLength, onCompositionStart = _ref.onCompositionStart, onCompositionEnd = _ref.onCompositionEnd, suffix = _ref.suffix, _ref$prefixCls = _ref.prefixCls, prefixCls = _ref$prefixCls === void 0 ? "rc-textarea" : _ref$prefixCls, showCount = _ref.showCount, count = _ref.count, className = _ref.className, style = _ref.style, disabled = _ref.disabled, hidden = _ref.hidden, classNames$1 = _ref.classNames, styles = _ref.styles, onResize = _ref.onResize, onClear = _ref.onClear, onPressEnter = _ref.onPressEnter, readOnly = _ref.readOnly, autoSize = _ref.autoSize, onKeyDown = _ref.onKeyDown, rest = _objectWithoutProperties(_ref, _excluded);
  var _useMergedState = useMergedState(defaultValue, {
    value: customValue,
    defaultValue
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), value = _useMergedState2[0], setValue = _useMergedState2[1];
  var formatValue = value === void 0 || value === null ? "" : String(value);
  var _React$useState = React.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), focused = _React$useState2[0], setFocused = _React$useState2[1];
  var compositionRef = React.useRef(false);
  var _React$useState3 = React.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), textareaResized = _React$useState4[0], setTextareaResized = _React$useState4[1];
  var holderRef = reactExports.useRef(null);
  var resizableTextAreaRef = reactExports.useRef(null);
  var getTextArea = function getTextArea2() {
    var _resizableTextAreaRef;
    return (_resizableTextAreaRef = resizableTextAreaRef.current) === null || _resizableTextAreaRef === void 0 ? void 0 : _resizableTextAreaRef.textArea;
  };
  var focus = function focus2() {
    getTextArea().focus();
  };
  reactExports.useImperativeHandle(ref, function() {
    var _holderRef$current;
    return {
      resizableTextArea: resizableTextAreaRef.current,
      focus,
      blur: function blur() {
        getTextArea().blur();
      },
      nativeElement: ((_holderRef$current = holderRef.current) === null || _holderRef$current === void 0 ? void 0 : _holderRef$current.nativeElement) || getTextArea()
    };
  });
  reactExports.useEffect(function() {
    setFocused(function(prev) {
      return !disabled && prev;
    });
  }, [disabled]);
  var _React$useState5 = React.useState(null), _React$useState6 = _slicedToArray(_React$useState5, 2), selection = _React$useState6[0], setSelection = _React$useState6[1];
  React.useEffect(function() {
    if (selection) {
      var _getTextArea;
      (_getTextArea = getTextArea()).setSelectionRange.apply(_getTextArea, _toConsumableArray(selection));
    }
  }, [selection]);
  var countConfig = useCount(count, showCount);
  var mergedMax = (_countConfig$max = countConfig.max) !== null && _countConfig$max !== void 0 ? _countConfig$max : maxLength;
  var hasMaxLength = Number(mergedMax) > 0;
  var valueLength = countConfig.strategy(formatValue);
  var isOutOfRange = !!mergedMax && valueLength > mergedMax;
  var triggerChange = function triggerChange2(e, currentValue) {
    var cutValue = currentValue;
    if (!compositionRef.current && countConfig.exceedFormatter && countConfig.max && countConfig.strategy(currentValue) > countConfig.max) {
      cutValue = countConfig.exceedFormatter(currentValue, {
        max: countConfig.max
      });
      if (currentValue !== cutValue) {
        setSelection([getTextArea().selectionStart || 0, getTextArea().selectionEnd || 0]);
      }
    }
    setValue(cutValue);
    resolveOnChange(e.currentTarget, e, onChange, cutValue);
  };
  var onInternalCompositionStart = function onInternalCompositionStart2(e) {
    compositionRef.current = true;
    onCompositionStart === null || onCompositionStart === void 0 || onCompositionStart(e);
  };
  var onInternalCompositionEnd = function onInternalCompositionEnd2(e) {
    compositionRef.current = false;
    triggerChange(e, e.currentTarget.value);
    onCompositionEnd === null || onCompositionEnd === void 0 || onCompositionEnd(e);
  };
  var onInternalChange = function onInternalChange2(e) {
    triggerChange(e, e.target.value);
  };
  var handleKeyDown = function handleKeyDown2(e) {
    if (e.key === "Enter" && onPressEnter) {
      onPressEnter(e);
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(e);
  };
  var handleFocus = function handleFocus2(e) {
    setFocused(true);
    onFocus === null || onFocus === void 0 || onFocus(e);
  };
  var handleBlur = function handleBlur2(e) {
    setFocused(false);
    onBlur === null || onBlur === void 0 || onBlur(e);
  };
  var handleReset = function handleReset2(e) {
    setValue("");
    focus();
    resolveOnChange(getTextArea(), e, onChange);
  };
  var suffixNode = suffix;
  var dataCount;
  if (countConfig.show) {
    if (countConfig.showFormatter) {
      dataCount = countConfig.showFormatter({
        value: formatValue,
        count: valueLength,
        maxLength: mergedMax
      });
    } else {
      dataCount = "".concat(valueLength).concat(hasMaxLength ? " / ".concat(mergedMax) : "");
    }
    suffixNode = /* @__PURE__ */ React.createElement(React.Fragment, null, suffixNode, /* @__PURE__ */ React.createElement("span", {
      className: classNames("".concat(prefixCls, "-data-count"), classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.count),
      style: styles === null || styles === void 0 ? void 0 : styles.count
    }, dataCount));
  }
  var handleResize = function handleResize2(size) {
    var _getTextArea2;
    onResize === null || onResize === void 0 || onResize(size);
    if ((_getTextArea2 = getTextArea()) !== null && _getTextArea2 !== void 0 && _getTextArea2.style.height) {
      setTextareaResized(true);
    }
  };
  var isPureTextArea = !autoSize && !showCount && !allowClear;
  return /* @__PURE__ */ React.createElement(BaseInput, {
    ref: holderRef,
    value: formatValue,
    allowClear,
    handleReset,
    suffix: suffixNode,
    prefixCls,
    classNames: _objectSpread2(_objectSpread2({}, classNames$1), {}, {
      affixWrapper: classNames(classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.affixWrapper, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-show-count"), showCount), "".concat(prefixCls, "-textarea-allow-clear"), allowClear))
    }),
    disabled,
    focused,
    className: classNames(className, isOutOfRange && "".concat(prefixCls, "-out-of-range")),
    style: _objectSpread2(_objectSpread2({}, style), textareaResized && !isPureTextArea ? {
      height: "auto"
    } : {}),
    dataAttrs: {
      affixWrapper: {
        "data-count": typeof dataCount === "string" ? dataCount : void 0
      }
    },
    hidden,
    readOnly,
    onClear
  }, /* @__PURE__ */ React.createElement(ResizableTextArea, _extends({}, rest, {
    autoSize,
    maxLength,
    onKeyDown: handleKeyDown,
    onChange: onInternalChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onCompositionStart: onInternalCompositionStart,
    onCompositionEnd: onInternalCompositionEnd,
    className: classNames(classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.textarea),
    style: _objectSpread2(_objectSpread2({}, styles === null || styles === void 0 ? void 0 : styles.textarea), {}, {
      resize: style === null || style === void 0 ? void 0 : style.resize
    }),
    disabled,
    prefixCls,
    onResize: handleResize,
    ref: resizableTextAreaRef,
    readOnly
  })));
});
const genTextAreaStyle = (token) => {
  const {
    componentCls,
    paddingLG
  } = token;
  const textareaPrefixCls = `${componentCls}-textarea`;
  return {
    // Raw Textarea
    [`textarea${componentCls}`]: {
      maxWidth: "100%",
      // prevent textarea resize from coming out of its container
      height: "auto",
      minHeight: token.controlHeight,
      lineHeight: token.lineHeight,
      verticalAlign: "bottom",
      transition: `all ${token.motionDurationSlow}`,
      resize: "vertical",
      [`&${componentCls}-mouse-active`]: {
        transition: `all ${token.motionDurationSlow}, height 0s, width 0s`
      }
    },
    // Wrapper for resize
    [`${componentCls}-textarea-affix-wrapper-resize-dirty`]: {
      width: "auto"
    },
    [textareaPrefixCls]: {
      position: "relative",
      "&-show-count": {
        [`${componentCls}-data-count`]: {
          position: "absolute",
          bottom: token.calc(token.fontSize).mul(token.lineHeight).mul(-1).equal(),
          insetInlineEnd: 0,
          color: token.colorTextDescription,
          whiteSpace: "nowrap",
          pointerEvents: "none"
        }
      },
      [`
        &-allow-clear > ${componentCls},
        &-affix-wrapper${textareaPrefixCls}-has-feedback ${componentCls}
      `]: {
        paddingInlineEnd: paddingLG
      },
      [`&-affix-wrapper${componentCls}-affix-wrapper`]: {
        padding: 0,
        [`> textarea${componentCls}`]: {
          fontSize: "inherit",
          border: "none",
          outline: "none",
          background: "transparent",
          minHeight: token.calc(token.controlHeight).sub(token.calc(token.lineWidth).mul(2)).equal(),
          "&:focus": {
            boxShadow: "none !important"
          }
        },
        [`${componentCls}-suffix`]: {
          margin: 0,
          "> *:not(:last-child)": {
            marginInline: 0
          },
          // Clear Icon
          [`${componentCls}-clear-icon`]: {
            position: "absolute",
            insetInlineEnd: token.paddingInline,
            insetBlockStart: token.paddingXS
          },
          // Feedback Icon
          [`${textareaPrefixCls}-suffix`]: {
            position: "absolute",
            top: 0,
            insetInlineEnd: token.paddingInline,
            bottom: 0,
            zIndex: 1,
            display: "inline-flex",
            alignItems: "center",
            margin: "auto",
            pointerEvents: "none"
          }
        }
      },
      [`&-affix-wrapper${componentCls}-affix-wrapper-rtl`]: {
        [`${componentCls}-suffix`]: {
          [`${componentCls}-data-count`]: {
            direction: "ltr",
            insetInlineStart: 0
          }
        }
      },
      [`&-affix-wrapper${componentCls}-affix-wrapper-sm`]: {
        [`${componentCls}-suffix`]: {
          [`${componentCls}-clear-icon`]: {
            insetInlineEnd: token.paddingInlineSM
          }
        }
      }
    }
  };
};
const useStyle = genStyleHooks(["Input", "TextArea"], (token) => {
  const inputToken = merge(token, initInputToken(token));
  return genTextAreaStyle(inputToken);
}, initComponentToken, {
  resetFont: false
});
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const TextArea = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _a;
  const {
    prefixCls: customizePrefixCls,
    bordered = true,
    size: customizeSize,
    disabled: customDisabled,
    status: customStatus,
    allowClear,
    classNames: classes,
    rootClassName,
    className,
    style,
    styles,
    variant: customVariant,
    showCount,
    onMouseDown,
    onResize
  } = props, rest = __rest(props, ["prefixCls", "bordered", "size", "disabled", "status", "allowClear", "classNames", "rootClassName", "className", "style", "styles", "variant", "showCount", "onMouseDown", "onResize"]);
  const {
    getPrefixCls,
    direction,
    allowClear: contextAllowClear,
    autoComplete: contextAutoComplete,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("textArea");
  const disabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const {
    status: contextStatus,
    hasFeedback,
    feedbackIcon
  } = reactExports.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);
  const innerRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => {
    var _a2;
    return {
      resizableTextArea: (_a2 = innerRef.current) === null || _a2 === void 0 ? void 0 : _a2.resizableTextArea,
      focus: (option) => {
        var _a3, _b;
        triggerFocus((_b = (_a3 = innerRef.current) === null || _a3 === void 0 ? void 0 : _a3.resizableTextArea) === null || _b === void 0 ? void 0 : _b.textArea, option);
      },
      blur: () => {
        var _a3;
        return (_a3 = innerRef.current) === null || _a3 === void 0 ? void 0 : _a3.blur();
      }
    };
  });
  const prefixCls = getPrefixCls("input", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapSharedCSSVar, hashId, cssVarCls] = useSharedStyle(prefixCls, rootClassName);
  const [wrapCSSVar] = useStyle(prefixCls, rootCls);
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  const mergedSize = useSize((ctx) => {
    var _a2;
    return (_a2 = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a2 !== void 0 ? _a2 : ctx;
  });
  const [variant, enableVariantCls] = useVariant("textArea", customVariant, bordered);
  const mergedAllowClear = getAllowClear(allowClear !== null && allowClear !== void 0 ? allowClear : contextAllowClear);
  const [isMouseDown, setIsMouseDown] = reactExports.useState(false);
  const [resizeDirty, setResizeDirty] = reactExports.useState(false);
  const onInternalMouseDown = (e) => {
    setIsMouseDown(true);
    onMouseDown === null || onMouseDown === void 0 ? void 0 : onMouseDown(e);
    const onMouseUp = () => {
      setIsMouseDown(false);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mouseup", onMouseUp);
  };
  const onInternalResize = (size) => {
    var _a2, _b;
    onResize === null || onResize === void 0 ? void 0 : onResize(size);
    if (isMouseDown && typeof getComputedStyle === "function") {
      const ele = (_b = (_a2 = innerRef.current) === null || _a2 === void 0 ? void 0 : _a2.nativeElement) === null || _b === void 0 ? void 0 : _b.querySelector("textarea");
      if (ele && getComputedStyle(ele).resize === "both") {
        setResizeDirty(true);
      }
    }
  };
  return wrapSharedCSSVar(wrapCSSVar(/* @__PURE__ */ reactExports.createElement(TextArea$1, Object.assign({
    autoComplete: contextAutoComplete
  }, rest, {
    style: Object.assign(Object.assign({}, contextStyle), style),
    styles: Object.assign(Object.assign({}, contextStyles), styles),
    disabled: mergedDisabled,
    allowClear: mergedAllowClear,
    className: classNames(
      cssVarCls,
      rootCls,
      className,
      rootClassName,
      compactItemClassnames,
      contextClassName,
      // Only for wrapper
      resizeDirty && `${prefixCls}-textarea-affix-wrapper-resize-dirty`
    ),
    classNames: Object.assign(Object.assign(Object.assign({}, classes), contextClassNames), {
      textarea: classNames({
        [`${prefixCls}-sm`]: mergedSize === "small",
        [`${prefixCls}-lg`]: mergedSize === "large"
      }, hashId, classes === null || classes === void 0 ? void 0 : classes.textarea, contextClassNames.textarea, isMouseDown && `${prefixCls}-mouse-active`),
      variant: classNames({
        [`${prefixCls}-${variant}`]: enableVariantCls
      }, getStatusClassNames(prefixCls, mergedStatus)),
      affixWrapper: classNames(`${prefixCls}-textarea-affix-wrapper`, {
        [`${prefixCls}-affix-wrapper-rtl`]: direction === "rtl",
        [`${prefixCls}-affix-wrapper-sm`]: mergedSize === "small",
        [`${prefixCls}-affix-wrapper-lg`]: mergedSize === "large",
        [`${prefixCls}-textarea-show-count`]: showCount || ((_a = props.count) === null || _a === void 0 ? void 0 : _a.show)
      }, hashId)
    }),
    prefixCls,
    suffix: hasFeedback && /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-textarea-suffix`
    }, feedbackIcon),
    showCount,
    ref: innerRef,
    onResize: onInternalResize,
    onMouseDown: onInternalMouseDown
  }))));
});
const Input = Input$1;
Input.Group = Group;
Input.Search = Search;
Input.TextArea = TextArea;
Input.Password = Password;
Input.OTP = OTP;
export {
  Input as I,
  RefIcon$1 as R
};
