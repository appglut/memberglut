import { d8 as reactExports, ao as _slicedToArray, dx as useLayoutEffect, C as CSSMotion, ak as _objectSpread2, aw as classNames, aA as composeRef, al as _objectWithoutProperties, dB as useMergedState, d1 as omit, af as _extends, ae as _defineProperty, ar as _typeof, cs as genStyleHooks, c_ as merge, db as resetComponent, cm as genFocusStyle, dl as unit, cl as genFocusOutline, dh as textEllipsis, dw as useId, dr as useComponentConfig, dH as useSize } from "./Page-BUA-PWqe.js";
var calcThumbStyle = function calcThumbStyle2(targetElement, vertical) {
  if (!targetElement) return null;
  var style = {
    left: targetElement.offsetLeft,
    right: targetElement.parentElement.clientWidth - targetElement.clientWidth - targetElement.offsetLeft,
    width: targetElement.clientWidth,
    top: targetElement.offsetTop,
    bottom: targetElement.parentElement.clientHeight - targetElement.clientHeight - targetElement.offsetTop,
    height: targetElement.clientHeight
  };
  if (vertical) {
    return {
      left: 0,
      right: 0,
      width: 0,
      top: style.top,
      bottom: style.bottom,
      height: style.height
    };
  }
  return {
    left: style.left,
    right: style.right,
    width: style.width,
    top: 0,
    bottom: 0,
    height: 0
  };
};
var toPX = function toPX2(value) {
  return value !== void 0 ? "".concat(value, "px") : void 0;
};
function MotionThumb(props) {
  var prefixCls = props.prefixCls, containerRef = props.containerRef, value = props.value, getValueIndex = props.getValueIndex, motionName = props.motionName, onMotionStart = props.onMotionStart, onMotionEnd = props.onMotionEnd, direction = props.direction, _props$vertical = props.vertical, vertical = _props$vertical === void 0 ? false : _props$vertical;
  var thumbRef = reactExports.useRef(null);
  var _React$useState = reactExports.useState(value), _React$useState2 = _slicedToArray(_React$useState, 2), prevValue = _React$useState2[0], setPrevValue = _React$useState2[1];
  var findValueElement = function findValueElement2(val) {
    var _containerRef$current;
    var index = getValueIndex(val);
    var ele = (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.querySelectorAll(".".concat(prefixCls, "-item"))[index];
    return (ele === null || ele === void 0 ? void 0 : ele.offsetParent) && ele;
  };
  var _React$useState3 = reactExports.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), prevStyle = _React$useState4[0], setPrevStyle = _React$useState4[1];
  var _React$useState5 = reactExports.useState(null), _React$useState6 = _slicedToArray(_React$useState5, 2), nextStyle = _React$useState6[0], setNextStyle = _React$useState6[1];
  useLayoutEffect(function() {
    if (prevValue !== value) {
      var prev = findValueElement(prevValue);
      var next = findValueElement(value);
      var calcPrevStyle = calcThumbStyle(prev, vertical);
      var calcNextStyle = calcThumbStyle(next, vertical);
      setPrevValue(value);
      setPrevStyle(calcPrevStyle);
      setNextStyle(calcNextStyle);
      if (prev && next) {
        onMotionStart();
      } else {
        onMotionEnd();
      }
    }
  }, [value]);
  var thumbStart = reactExports.useMemo(function() {
    if (vertical) {
      var _prevStyle$top;
      return toPX((_prevStyle$top = prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.top) !== null && _prevStyle$top !== void 0 ? _prevStyle$top : 0);
    }
    if (direction === "rtl") {
      return toPX(-(prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.right));
    }
    return toPX(prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.left);
  }, [vertical, direction, prevStyle]);
  var thumbActive = reactExports.useMemo(function() {
    if (vertical) {
      var _nextStyle$top;
      return toPX((_nextStyle$top = nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.top) !== null && _nextStyle$top !== void 0 ? _nextStyle$top : 0);
    }
    if (direction === "rtl") {
      return toPX(-(nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.right));
    }
    return toPX(nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.left);
  }, [vertical, direction, nextStyle]);
  var onAppearStart = function onAppearStart2() {
    if (vertical) {
      return {
        transform: "translateY(var(--thumb-start-top))",
        height: "var(--thumb-start-height)"
      };
    }
    return {
      transform: "translateX(var(--thumb-start-left))",
      width: "var(--thumb-start-width)"
    };
  };
  var onAppearActive = function onAppearActive2() {
    if (vertical) {
      return {
        transform: "translateY(var(--thumb-active-top))",
        height: "var(--thumb-active-height)"
      };
    }
    return {
      transform: "translateX(var(--thumb-active-left))",
      width: "var(--thumb-active-width)"
    };
  };
  var onVisibleChanged = function onVisibleChanged2() {
    setPrevStyle(null);
    setNextStyle(null);
    onMotionEnd();
  };
  if (!prevStyle || !nextStyle) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(CSSMotion, {
    visible: true,
    motionName,
    motionAppear: true,
    onAppearStart,
    onAppearActive,
    onVisibleChanged
  }, function(_ref, ref) {
    var motionClassName = _ref.className, motionStyle = _ref.style;
    var mergedStyle = _objectSpread2(_objectSpread2({}, motionStyle), {}, {
      "--thumb-start-left": thumbStart,
      "--thumb-start-width": toPX(prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.width),
      "--thumb-active-left": thumbActive,
      "--thumb-active-width": toPX(nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.width),
      "--thumb-start-top": thumbStart,
      "--thumb-start-height": toPX(prevStyle === null || prevStyle === void 0 ? void 0 : prevStyle.height),
      "--thumb-active-top": thumbActive,
      "--thumb-active-height": toPX(nextStyle === null || nextStyle === void 0 ? void 0 : nextStyle.height)
    });
    var motionProps = {
      ref: composeRef(thumbRef, ref),
      style: mergedStyle,
      className: classNames("".concat(prefixCls, "-thumb"), motionClassName)
    };
    return /* @__PURE__ */ reactExports.createElement("div", motionProps);
  });
}
var _excluded = ["prefixCls", "direction", "vertical", "options", "disabled", "defaultValue", "value", "name", "onChange", "className", "motionName"];
function getValidTitle(option) {
  if (typeof option.title !== "undefined") {
    return option.title;
  }
  if (_typeof(option.label) !== "object") {
    var _option$label;
    return (_option$label = option.label) === null || _option$label === void 0 ? void 0 : _option$label.toString();
  }
}
function normalizeOptions(options) {
  return options.map(function(option) {
    if (_typeof(option) === "object" && option !== null) {
      var validTitle = getValidTitle(option);
      return _objectSpread2(_objectSpread2({}, option), {}, {
        title: validTitle
      });
    }
    return {
      label: option === null || option === void 0 ? void 0 : option.toString(),
      title: option === null || option === void 0 ? void 0 : option.toString(),
      value: option
    };
  });
}
var InternalSegmentedOption = function InternalSegmentedOption2(_ref) {
  var prefixCls = _ref.prefixCls, className = _ref.className, disabled = _ref.disabled, checked = _ref.checked, label = _ref.label, title = _ref.title, value = _ref.value, name = _ref.name, onChange = _ref.onChange, onFocus = _ref.onFocus, onBlur = _ref.onBlur, onKeyDown = _ref.onKeyDown, onKeyUp = _ref.onKeyUp, onMouseDown = _ref.onMouseDown;
  var handleChange = function handleChange2(event) {
    if (disabled) {
      return;
    }
    onChange(event, value);
  };
  return /* @__PURE__ */ reactExports.createElement("label", {
    className: classNames(className, _defineProperty({}, "".concat(prefixCls, "-item-disabled"), disabled)),
    onMouseDown
  }, /* @__PURE__ */ reactExports.createElement("input", {
    name,
    className: "".concat(prefixCls, "-item-input"),
    type: "radio",
    disabled,
    checked,
    onChange: handleChange,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp
  }), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-item-label"),
    title
  }, label));
};
var Segmented$1 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var _segmentedOptions$;
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-segmented" : _props$prefixCls, direction = props.direction, vertical = props.vertical, _props$options = props.options, options = _props$options === void 0 ? [] : _props$options, disabled = props.disabled, defaultValue = props.defaultValue, value = props.value, name = props.name, onChange = props.onChange, _props$className = props.className, className = _props$className === void 0 ? "" : _props$className, _props$motionName = props.motionName, motionName = _props$motionName === void 0 ? "thumb-motion" : _props$motionName, restProps = _objectWithoutProperties(props, _excluded);
  var containerRef = reactExports.useRef(null);
  var mergedRef = reactExports.useMemo(function() {
    return composeRef(containerRef, ref);
  }, [containerRef, ref]);
  var segmentedOptions = reactExports.useMemo(function() {
    return normalizeOptions(options);
  }, [options]);
  var _useMergedState = useMergedState((_segmentedOptions$ = segmentedOptions[0]) === null || _segmentedOptions$ === void 0 ? void 0 : _segmentedOptions$.value, {
    value,
    defaultValue
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), rawValue = _useMergedState2[0], setRawValue = _useMergedState2[1];
  var _React$useState = reactExports.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), thumbShow = _React$useState2[0], setThumbShow = _React$useState2[1];
  var handleChange = function handleChange2(event, val) {
    setRawValue(val);
    onChange === null || onChange === void 0 || onChange(val);
  };
  var divProps = omit(restProps, ["children"]);
  var _React$useState3 = reactExports.useState(false), _React$useState4 = _slicedToArray(_React$useState3, 2), isKeyboard = _React$useState4[0], setIsKeyboard = _React$useState4[1];
  var _React$useState5 = reactExports.useState(false), _React$useState6 = _slicedToArray(_React$useState5, 2), isFocused = _React$useState6[0], setIsFocused = _React$useState6[1];
  var handleFocus = function handleFocus2() {
    setIsFocused(true);
  };
  var handleBlur = function handleBlur2() {
    setIsFocused(false);
  };
  var handleMouseDown = function handleMouseDown2() {
    setIsKeyboard(false);
  };
  var handleKeyUp = function handleKeyUp2(event) {
    if (event.key === "Tab") {
      setIsKeyboard(true);
    }
  };
  var onOffset = function onOffset2(offset) {
    var currentIndex = segmentedOptions.findIndex(function(option) {
      return option.value === rawValue;
    });
    var total = segmentedOptions.length;
    var nextIndex = (currentIndex + offset + total) % total;
    var nextOption = segmentedOptions[nextIndex];
    if (nextOption) {
      setRawValue(nextOption.value);
      onChange === null || onChange === void 0 || onChange(nextOption.value);
    }
  };
  var handleKeyDown = function handleKeyDown2(event) {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        onOffset(-1);
        break;
      case "ArrowRight":
      case "ArrowDown":
        onOffset(1);
        break;
    }
  };
  return /* @__PURE__ */ reactExports.createElement("div", _extends({
    role: "radiogroup",
    "aria-label": "segmented control",
    tabIndex: disabled ? void 0 : 0,
    "aria-orientation": vertical ? "vertical" : "horizontal"
  }, divProps, {
    className: classNames(prefixCls, _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-rtl"), direction === "rtl"), "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-vertical"), vertical), className),
    ref: mergedRef
  }), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-group")
  }, /* @__PURE__ */ reactExports.createElement(MotionThumb, {
    vertical,
    prefixCls,
    value: rawValue,
    containerRef,
    motionName: "".concat(prefixCls, "-").concat(motionName),
    direction,
    getValueIndex: function getValueIndex(val) {
      return segmentedOptions.findIndex(function(n) {
        return n.value === val;
      });
    },
    onMotionStart: function onMotionStart() {
      setThumbShow(true);
    },
    onMotionEnd: function onMotionEnd() {
      setThumbShow(false);
    }
  }), segmentedOptions.map(function(segmentedOption) {
    return /* @__PURE__ */ reactExports.createElement(InternalSegmentedOption, _extends({}, segmentedOption, {
      name,
      key: segmentedOption.value,
      prefixCls,
      className: classNames(segmentedOption.className, "".concat(prefixCls, "-item"), _defineProperty(_defineProperty({}, "".concat(prefixCls, "-item-selected"), segmentedOption.value === rawValue && !thumbShow), "".concat(prefixCls, "-item-focused"), isFocused && isKeyboard && segmentedOption.value === rawValue)),
      checked: segmentedOption.value === rawValue,
      onChange: handleChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onMouseDown: handleMouseDown,
      disabled: !!disabled || !!segmentedOption.disabled
    }));
  })));
});
var TypedSegmented = Segmented$1;
function getItemDisabledStyle(cls, token) {
  return {
    [`${cls}, ${cls}:hover, ${cls}:focus`]: {
      color: token.colorTextDisabled,
      cursor: "not-allowed"
    }
  };
}
function getItemSelectedStyle(token) {
  return {
    background: token.itemSelectedBg,
    boxShadow: token.boxShadowTertiary
  };
}
const segmentedTextEllipsisCss = Object.assign({
  overflow: "hidden"
}, textEllipsis);
const genSegmentedStyle = (token) => {
  const {
    componentCls
  } = token;
  const labelHeight = token.calc(token.controlHeight).sub(token.calc(token.trackPadding).mul(2)).equal();
  const labelHeightLG = token.calc(token.controlHeightLG).sub(token.calc(token.trackPadding).mul(2)).equal();
  const labelHeightSM = token.calc(token.controlHeightSM).sub(token.calc(token.trackPadding).mul(2)).equal();
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      display: "inline-block",
      padding: token.trackPadding,
      color: token.itemColor,
      background: token.trackBg,
      borderRadius: token.borderRadius,
      transition: `all ${token.motionDurationMid}`
    }), genFocusStyle(token)), {
      [`${componentCls}-group`]: {
        position: "relative",
        display: "flex",
        alignItems: "stretch",
        justifyItems: "flex-start",
        flexDirection: "row",
        width: "100%"
      },
      // RTL styles
      [`&${componentCls}-rtl`]: {
        direction: "rtl"
      },
      [`&${componentCls}-vertical`]: {
        [`${componentCls}-group`]: {
          flexDirection: "column"
        },
        [`${componentCls}-thumb`]: {
          width: "100%",
          height: 0,
          padding: `0 ${unit(token.paddingXXS)}`
        }
      },
      // block styles
      [`&${componentCls}-block`]: {
        display: "flex"
      },
      [`&${componentCls}-block ${componentCls}-item`]: {
        flex: 1,
        minWidth: 0
      },
      // item styles
      [`${componentCls}-item`]: {
        position: "relative",
        textAlign: "center",
        cursor: "pointer",
        transition: `color ${token.motionDurationMid}`,
        borderRadius: token.borderRadiusSM,
        // Fix Safari render bug
        // https://github.com/ant-design/ant-design/issues/45250
        transform: "translateZ(0)",
        "&-selected": Object.assign(Object.assign({}, getItemSelectedStyle(token)), {
          color: token.itemSelectedColor
        }),
        "&-focused": genFocusOutline(token),
        "&::after": {
          content: '""',
          position: "absolute",
          zIndex: -1,
          width: "100%",
          height: "100%",
          top: 0,
          insetInlineStart: 0,
          borderRadius: "inherit",
          opacity: 0,
          transition: `opacity ${token.motionDurationMid}, background-color ${token.motionDurationMid}`,
          // This is mandatory to make it not clickable or hoverable
          // Ref: https://github.com/ant-design/ant-design/issues/40888
          pointerEvents: "none"
        },
        [`&:not(${componentCls}-item-selected):not(${componentCls}-item-disabled)`]: {
          "&:hover, &:active": {
            color: token.itemHoverColor
          },
          "&:hover::after": {
            opacity: 1,
            backgroundColor: token.itemHoverBg
          },
          "&:active::after": {
            opacity: 1,
            backgroundColor: token.itemActiveBg
          }
        },
        "&-label": Object.assign({
          minHeight: labelHeight,
          lineHeight: unit(labelHeight),
          padding: `0 ${unit(token.segmentedPaddingHorizontal)}`
        }, segmentedTextEllipsisCss),
        // syntactic sugar to add `icon` for Segmented Item
        "&-icon + *": {
          marginInlineStart: token.calc(token.marginSM).div(2).equal()
        },
        "&-input": {
          position: "absolute",
          insetBlockStart: 0,
          insetInlineStart: 0,
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: "none"
        }
      },
      // thumb styles
      [`${componentCls}-thumb`]: Object.assign(Object.assign({}, getItemSelectedStyle(token)), {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        width: 0,
        height: "100%",
        padding: `${unit(token.paddingXXS)} 0`,
        borderRadius: token.borderRadiusSM,
        [`& ~ ${componentCls}-item:not(${componentCls}-item-selected):not(${componentCls}-item-disabled)::after`]: {
          backgroundColor: "transparent"
        }
      }),
      // size styles
      [`&${componentCls}-lg`]: {
        borderRadius: token.borderRadiusLG,
        [`${componentCls}-item-label`]: {
          minHeight: labelHeightLG,
          lineHeight: unit(labelHeightLG),
          padding: `0 ${unit(token.segmentedPaddingHorizontal)}`,
          fontSize: token.fontSizeLG
        },
        [`${componentCls}-item, ${componentCls}-thumb`]: {
          borderRadius: token.borderRadius
        }
      },
      [`&${componentCls}-sm`]: {
        borderRadius: token.borderRadiusSM,
        [`${componentCls}-item-label`]: {
          minHeight: labelHeightSM,
          lineHeight: unit(labelHeightSM),
          padding: `0 ${unit(token.segmentedPaddingHorizontalSM)}`
        },
        [`${componentCls}-item, ${componentCls}-thumb`]: {
          borderRadius: token.borderRadiusXS
        }
      }
    }), getItemDisabledStyle(`&-disabled ${componentCls}-item`, token)), getItemDisabledStyle(`${componentCls}-item-disabled`, token)), {
      // transition effect when `appear-active`
      [`${componentCls}-thumb-motion-appear-active`]: {
        transition: `transform ${token.motionDurationSlow} ${token.motionEaseInOut}, width ${token.motionDurationSlow} ${token.motionEaseInOut}`,
        willChange: "transform, width"
      },
      [`&${componentCls}-shape-round`]: {
        borderRadius: 9999,
        [`${componentCls}-item, ${componentCls}-thumb`]: {
          borderRadius: 9999
        }
      }
    })
  };
};
const prepareComponentToken = (token) => {
  const {
    colorTextLabel,
    colorText,
    colorFillSecondary,
    colorBgElevated,
    colorFill,
    lineWidthBold,
    colorBgLayout
  } = token;
  return {
    trackPadding: lineWidthBold,
    trackBg: colorBgLayout,
    itemColor: colorTextLabel,
    itemHoverColor: colorText,
    itemHoverBg: colorFillSecondary,
    itemSelectedBg: colorBgElevated,
    itemActiveBg: colorFill,
    itemSelectedColor: colorText
  };
};
const useStyle = genStyleHooks("Segmented", (token) => {
  const {
    lineWidth,
    calc
  } = token;
  const segmentedToken = merge(token, {
    segmentedPaddingHorizontal: calc(token.controlPaddingHorizontal).sub(lineWidth).equal(),
    segmentedPaddingHorizontalSM: calc(token.controlPaddingHorizontalSM).sub(lineWidth).equal()
  });
  return genSegmentedStyle(segmentedToken);
}, prepareComponentToken);
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function isSegmentedLabeledOptionWithIcon(option) {
  return typeof option === "object" && !!(option === null || option === void 0 ? void 0 : option.icon);
}
const InternalSegmented = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const defaultName = useId();
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    block,
    options = [],
    size: customSize = "middle",
    style,
    vertical,
    shape = "default",
    name = defaultName
  } = props, restProps = __rest(props, ["prefixCls", "className", "rootClassName", "block", "options", "size", "style", "vertical", "shape", "name"]);
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("segmented");
  const prefixCls = getPrefixCls("segmented", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const mergedSize = useSize(customSize);
  const extendedOptions = reactExports.useMemo(() => options.map((option) => {
    if (isSegmentedLabeledOptionWithIcon(option)) {
      const {
        icon,
        label
      } = option, restOption = __rest(option, ["icon", "label"]);
      return Object.assign(Object.assign({}, restOption), {
        label: /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("span", {
          className: `${prefixCls}-item-icon`
        }, icon), label && /* @__PURE__ */ reactExports.createElement("span", null, label))
      });
    }
    return option;
  }), [options, prefixCls]);
  const cls = classNames(className, rootClassName, contextClassName, {
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-sm`]: mergedSize === "small",
    [`${prefixCls}-lg`]: mergedSize === "large",
    [`${prefixCls}-vertical`]: vertical,
    [`${prefixCls}-shape-${shape}`]: shape === "round"
  }, hashId, cssVarCls);
  const mergedStyle = Object.assign(Object.assign({}, contextStyle), style);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(TypedSegmented, Object.assign({}, restProps, {
    name,
    className: cls,
    style: mergedStyle,
    options: extendedOptions,
    ref,
    prefixCls,
    direction,
    vertical
  })));
});
const Segmented = InternalSegmented;
export {
  Segmented as S
};
