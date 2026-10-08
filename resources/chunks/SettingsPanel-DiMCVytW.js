import { d7 as reactExports, ao as _slicedToArray, R as React, aw as classNames, ae as _defineProperty, ak as _objectSpread2, dt as useEvent, au as calculateColor, at as calcOffset, dA as useMergedState, cu as generateColor, e as Color, g as ColorPickerPrefixCls, af as _extends, f as ColorBlock, aE as defaultColor, cr as genStyleHooks, cZ as merge, da as resetComponent, dk as unit, dq as useComponentConfig, dG as useSize, cv as generateColor$1, cy as getColorAlpha, di as toHexFormat, w as Input, cE as getRoundNumber, al as _objectWithoutProperties, K as KeyCode, d6 as reactDomExports, dw as useLayoutEffect, aq as _toConsumableArray, ar as _typeof, cR as isEqual, dO as warningOnce, aA as composeRef, dU as wrapperRaf, F as FastColor, D as DisabledContext, cB as getGradientPercentColor, a as AggregationColor, cb as genAlphaColor, h as ColorPresets, dy as useLocale, d2 as pickAttrs, cg as genCompactItemStyle, j as ConfigContext, t as FormItemInputContext, dp as useCompactItemContext, dl as useCSSVarCls, cH as getStatusClassNames, n as ContextIsolator, a8 as __, cU as jsxRuntimeExports, q as FontAwesomeIcon, aY as faCheck, b4 as faCopy, c as Button, bh as faFloppyDisk, bU as faTags } from "./Page-uv7jJYOd.js";
import { d as dayjs } from "./dayjs.min-Cgo1VKL0.js";
import { T as Tabs } from "./index-BLJyNKCC.js";
import { T as Tag } from "./index-C-39T1aj.js";
import { I as Input$1 } from "./index-B1n7UfX_.js";
import { S as Select, T as Tooltip, as as useForceUpdate, u as genPurePanel, R as Radio, h as Space } from "./api-BU-mz-0j.js";
import { P as Popover } from "./index-Bb5iF4J6.js";
import { S as Segmented } from "./index-wYjIfrAo.js";
import { T as TypedInputNumber } from "./index-CzvwyE0L.js";
import { D as DatePicker } from "./index-CLOt1R7U.js";
import { S as Switch } from "./index-Dfx4LXY8.js";
function getPosition$1(e) {
  var obj = "touches" in e ? e.touches[0] : e;
  var scrollXOffset = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
  var scrollYOffset = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
  return {
    pageX: obj.pageX - scrollXOffset,
    pageY: obj.pageY - scrollYOffset
  };
}
function useColorDrag(props) {
  var targetRef = props.targetRef, containerRef = props.containerRef, direction = props.direction, onDragChange = props.onDragChange, onDragChangeComplete = props.onDragChangeComplete, calculate = props.calculate, color = props.color, disabledDrag = props.disabledDrag;
  var _useState = reactExports.useState({
    x: 0,
    y: 0
  }), _useState2 = _slicedToArray(_useState, 2), offsetValue = _useState2[0], setOffsetValue = _useState2[1];
  var mouseMoveRef = reactExports.useRef(null);
  var mouseUpRef = reactExports.useRef(null);
  reactExports.useEffect(function() {
    setOffsetValue(calculate());
  }, [color]);
  reactExports.useEffect(function() {
    return function() {
      document.removeEventListener("mousemove", mouseMoveRef.current);
      document.removeEventListener("mouseup", mouseUpRef.current);
      document.removeEventListener("touchmove", mouseMoveRef.current);
      document.removeEventListener("touchend", mouseUpRef.current);
      mouseMoveRef.current = null;
      mouseUpRef.current = null;
    };
  }, []);
  var updateOffset = function updateOffset2(e) {
    var _getPosition = getPosition$1(e), pageX = _getPosition.pageX, pageY = _getPosition.pageY;
    var _containerRef$current = containerRef.current.getBoundingClientRect(), rectX = _containerRef$current.x, rectY = _containerRef$current.y, width = _containerRef$current.width, height = _containerRef$current.height;
    var _targetRef$current$ge = targetRef.current.getBoundingClientRect(), targetWidth = _targetRef$current$ge.width, targetHeight = _targetRef$current$ge.height;
    var centerOffsetX = targetWidth / 2;
    var centerOffsetY = targetHeight / 2;
    var offsetX = Math.max(0, Math.min(pageX - rectX, width)) - centerOffsetX;
    var offsetY = Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY;
    var calcOffset2 = {
      x: offsetX,
      y: direction === "x" ? offsetValue.y : offsetY
    };
    if (targetWidth === 0 && targetHeight === 0 || targetWidth !== targetHeight) {
      return false;
    }
    onDragChange === null || onDragChange === void 0 || onDragChange(calcOffset2);
  };
  var onDragMove = function onDragMove2(e) {
    e.preventDefault();
    updateOffset(e);
  };
  var onDragStop = function onDragStop2(e) {
    e.preventDefault();
    document.removeEventListener("mousemove", mouseMoveRef.current);
    document.removeEventListener("mouseup", mouseUpRef.current);
    document.removeEventListener("touchmove", mouseMoveRef.current);
    document.removeEventListener("touchend", mouseUpRef.current);
    mouseMoveRef.current = null;
    mouseUpRef.current = null;
    onDragChangeComplete === null || onDragChangeComplete === void 0 || onDragChangeComplete();
  };
  var onDragStart = function onDragStart2(e) {
    document.removeEventListener("mousemove", mouseMoveRef.current);
    document.removeEventListener("mouseup", mouseUpRef.current);
    if (disabledDrag) {
      return;
    }
    updateOffset(e);
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragStop);
    document.addEventListener("touchmove", onDragMove);
    document.addEventListener("touchend", onDragStop);
    mouseMoveRef.current = onDragMove;
    mouseUpRef.current = onDragStop;
  };
  return [offsetValue, onDragStart];
}
var Handler = function Handler2(_ref) {
  var _ref$size = _ref.size, size = _ref$size === void 0 ? "default" : _ref$size, color = _ref.color, prefixCls = _ref.prefixCls;
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames("".concat(prefixCls, "-handler"), _defineProperty({}, "".concat(prefixCls, "-handler-sm"), size === "small")),
    style: {
      backgroundColor: color
    }
  });
};
var Palette = function Palette2(_ref) {
  var children = _ref.children, style = _ref.style, prefixCls = _ref.prefixCls;
  return /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-palette"),
    style: _objectSpread2({
      position: "relative"
    }, style)
  }, children);
};
var Transform = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var children = props.children, x = props.x, y = props.y;
  return /* @__PURE__ */ React.createElement("div", {
    ref,
    style: {
      position: "absolute",
      left: "".concat(x, "%"),
      top: "".concat(y, "%"),
      zIndex: 1,
      transform: "translate(-50%, -50%)"
    }
  }, children);
});
var Picker = function Picker2(_ref) {
  var color = _ref.color, onChange = _ref.onChange, prefixCls = _ref.prefixCls, onChangeComplete = _ref.onChangeComplete, disabled = _ref.disabled;
  var pickerRef = reactExports.useRef();
  var transformRef = reactExports.useRef();
  var colorRef = reactExports.useRef(color);
  var onDragChange = useEvent(function(offsetValue) {
    var calcColor = calculateColor({
      offset: offsetValue,
      targetRef: transformRef,
      containerRef: pickerRef,
      color
    });
    colorRef.current = calcColor;
    onChange(calcColor);
  });
  var _useColorDrag = useColorDrag({
    color,
    containerRef: pickerRef,
    targetRef: transformRef,
    calculate: function calculate() {
      return calcOffset(color);
    },
    onDragChange,
    onDragChangeComplete: function onDragChangeComplete() {
      return onChangeComplete === null || onChangeComplete === void 0 ? void 0 : onChangeComplete(colorRef.current);
    },
    disabledDrag: disabled
  }), _useColorDrag2 = _slicedToArray(_useColorDrag, 2), offset = _useColorDrag2[0], dragStartHandle = _useColorDrag2[1];
  return /* @__PURE__ */ React.createElement("div", {
    ref: pickerRef,
    className: "".concat(prefixCls, "-select"),
    onMouseDown: dragStartHandle,
    onTouchStart: dragStartHandle
  }, /* @__PURE__ */ React.createElement(Palette, {
    prefixCls
  }, /* @__PURE__ */ React.createElement(Transform, {
    x: offset.x,
    y: offset.y,
    ref: transformRef
  }, /* @__PURE__ */ React.createElement(Handler, {
    color: color.toRgbString(),
    prefixCls
  })), /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-saturation"),
    style: {
      backgroundColor: "hsl(".concat(color.toHsb().h, ",100%, 50%)"),
      backgroundImage: "linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))"
    }
  })));
};
var useColorState = function useColorState2(defaultValue, value) {
  var _useMergedState = useMergedState(defaultValue, {
    value
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedValue = _useMergedState2[0], setValue = _useMergedState2[1];
  var color = reactExports.useMemo(function() {
    return generateColor(mergedValue);
  }, [mergedValue]);
  return [color, setValue];
};
var Gradient = function Gradient2(_ref) {
  var colors = _ref.colors, children = _ref.children, _ref$direction = _ref.direction, direction = _ref$direction === void 0 ? "to right" : _ref$direction, type = _ref.type, prefixCls = _ref.prefixCls;
  var gradientColors = reactExports.useMemo(function() {
    return colors.map(function(color, idx) {
      var result = generateColor(color);
      if (type === "alpha" && idx === colors.length - 1) {
        result = new Color(result.setA(1));
      }
      return result.toRgbString();
    }).join(",");
  }, [colors, type]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-gradient"),
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(".concat(direction, ", ").concat(gradientColors, ")")
    }
  }, children);
};
var Slider$2 = function Slider(props) {
  var prefixCls = props.prefixCls, colors = props.colors, disabled = props.disabled, onChange = props.onChange, onChangeComplete = props.onChangeComplete, color = props.color, type = props.type;
  var sliderRef = reactExports.useRef();
  var transformRef = reactExports.useRef();
  var colorRef = reactExports.useRef(color);
  var getValue = function getValue2(c) {
    return type === "hue" ? c.getHue() : c.a * 100;
  };
  var onDragChange = useEvent(function(offsetValue) {
    var calcColor = calculateColor({
      offset: offsetValue,
      targetRef: transformRef,
      containerRef: sliderRef,
      color,
      type
    });
    colorRef.current = calcColor;
    onChange(getValue(calcColor));
  });
  var _useColorDrag = useColorDrag({
    color,
    targetRef: transformRef,
    containerRef: sliderRef,
    calculate: function calculate() {
      return calcOffset(color, type);
    },
    onDragChange,
    onDragChangeComplete: function onDragChangeComplete() {
      onChangeComplete(getValue(colorRef.current));
    },
    direction: "x",
    disabledDrag: disabled
  }), _useColorDrag2 = _slicedToArray(_useColorDrag, 2), offset = _useColorDrag2[0], dragStartHandle = _useColorDrag2[1];
  var handleColor = React.useMemo(function() {
    if (type === "hue") {
      var hsb = color.toHsb();
      hsb.s = 1;
      hsb.b = 1;
      hsb.a = 1;
      var lightColor = new Color(hsb);
      return lightColor;
    }
    return color;
  }, [color, type]);
  var gradientList = React.useMemo(function() {
    return colors.map(function(info) {
      return "".concat(info.color, " ").concat(info.percent, "%");
    });
  }, [colors]);
  return /* @__PURE__ */ React.createElement("div", {
    ref: sliderRef,
    className: classNames("".concat(prefixCls, "-slider"), "".concat(prefixCls, "-slider-").concat(type)),
    onMouseDown: dragStartHandle,
    onTouchStart: dragStartHandle
  }, /* @__PURE__ */ React.createElement(Palette, {
    prefixCls
  }, /* @__PURE__ */ React.createElement(Transform, {
    x: offset.x,
    y: offset.y,
    ref: transformRef
  }, /* @__PURE__ */ React.createElement(Handler, {
    size: "small",
    color: handleColor.toHexString(),
    prefixCls
  })), /* @__PURE__ */ React.createElement(Gradient, {
    colors: gradientList,
    type,
    prefixCls
  })));
};
function useComponent(components2) {
  return reactExports.useMemo(function() {
    var _ref = components2 || {}, slider = _ref.slider;
    return [slider || Slider$2];
  }, [components2]);
}
var HUE_COLORS = [{
  color: "rgb(255, 0, 0)",
  percent: 0
}, {
  color: "rgb(255, 255, 0)",
  percent: 17
}, {
  color: "rgb(0, 255, 0)",
  percent: 33
}, {
  color: "rgb(0, 255, 255)",
  percent: 50
}, {
  color: "rgb(0, 0, 255)",
  percent: 67
}, {
  color: "rgb(255, 0, 255)",
  percent: 83
}, {
  color: "rgb(255, 0, 0)",
  percent: 100
}];
var ColorPicker$1 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var value = props.value, defaultValue = props.defaultValue, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? ColorPickerPrefixCls : _props$prefixCls, onChange = props.onChange, onChangeComplete = props.onChangeComplete, className = props.className, style = props.style, panelRender = props.panelRender, _props$disabledAlpha = props.disabledAlpha, disabledAlpha = _props$disabledAlpha === void 0 ? false : _props$disabledAlpha, _props$disabled = props.disabled, disabled = _props$disabled === void 0 ? false : _props$disabled, components2 = props.components;
  var _useComponent = useComponent(components2), _useComponent2 = _slicedToArray(_useComponent, 1), Slider3 = _useComponent2[0];
  var _useColorState = useColorState(defaultValue || defaultColor, value), _useColorState2 = _slicedToArray(_useColorState, 2), colorValue = _useColorState2[0], setColorValue = _useColorState2[1];
  var alphaColor = reactExports.useMemo(function() {
    return colorValue.setA(1).toRgbString();
  }, [colorValue]);
  var handleChange = function handleChange2(data, type) {
    if (!value) {
      setColorValue(data);
    }
    onChange === null || onChange === void 0 || onChange(data, type);
  };
  var getHueColor = function getHueColor2(hue) {
    return new Color(colorValue.setHue(hue));
  };
  var getAlphaColor = function getAlphaColor2(alpha) {
    return new Color(colorValue.setA(alpha / 100));
  };
  var onHueChange = function onHueChange2(hue) {
    handleChange(getHueColor(hue), {
      type: "hue",
      value: hue
    });
  };
  var onAlphaChange = function onAlphaChange2(alpha) {
    handleChange(getAlphaColor(alpha), {
      type: "alpha",
      value: alpha
    });
  };
  var onHueChangeComplete = function onHueChangeComplete2(hue) {
    if (onChangeComplete) {
      onChangeComplete(getHueColor(hue));
    }
  };
  var onAlphaChangeComplete = function onAlphaChangeComplete2(alpha) {
    if (onChangeComplete) {
      onChangeComplete(getAlphaColor(alpha));
    }
  };
  var mergeCls = classNames("".concat(prefixCls, "-panel"), className, _defineProperty({}, "".concat(prefixCls, "-panel-disabled"), disabled));
  var sharedSliderProps = {
    prefixCls,
    disabled,
    color: colorValue
  };
  var defaultPanel = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Picker, _extends({
    onChange: handleChange
  }, sharedSliderProps, {
    onChangeComplete
  })), /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-slider-container")
  }, /* @__PURE__ */ React.createElement("div", {
    className: classNames("".concat(prefixCls, "-slider-group"), _defineProperty({}, "".concat(prefixCls, "-slider-group-disabled-alpha"), disabledAlpha))
  }, /* @__PURE__ */ React.createElement(Slider3, _extends({}, sharedSliderProps, {
    type: "hue",
    colors: HUE_COLORS,
    min: 0,
    max: 359,
    value: colorValue.getHue(),
    onChange: onHueChange,
    onChangeComplete: onHueChangeComplete
  })), !disabledAlpha && /* @__PURE__ */ React.createElement(Slider3, _extends({}, sharedSliderProps, {
    type: "alpha",
    colors: [{
      percent: 0,
      color: "rgba(255, 0, 4, 0)"
    }, {
      percent: 100,
      color: alphaColor
    }],
    min: 0,
    max: 100,
    value: colorValue.a * 100,
    onChange: onAlphaChange,
    onChangeComplete: onAlphaChangeComplete
  }))), /* @__PURE__ */ React.createElement(ColorBlock, {
    color: colorValue.toRgbString(),
    prefixCls
  })));
  return /* @__PURE__ */ React.createElement("div", {
    className: mergeCls,
    style,
    ref
  }, typeof panelRender === "function" ? panelRender(defaultPanel) : defaultPanel);
});
const genSizeDividerStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      "&-horizontal": {
        [`&${componentCls}`]: {
          "&-sm": {
            marginBlock: token.marginXS
          },
          "&-md": {
            marginBlock: token.margin
          }
        }
      }
    }
  };
};
const genSharedDividerStyle = (token) => {
  const {
    componentCls,
    sizePaddingEdgeHorizontal,
    colorSplit,
    lineWidth,
    textPaddingInline,
    orientationMargin,
    verticalMarginInline
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      borderBlockStart: `${unit(lineWidth)} solid ${colorSplit}`,
      // vertical
      "&-vertical": {
        position: "relative",
        top: "-0.06em",
        display: "inline-block",
        height: "0.9em",
        marginInline: verticalMarginInline,
        marginBlock: 0,
        verticalAlign: "middle",
        borderTop: 0,
        borderInlineStart: `${unit(lineWidth)} solid ${colorSplit}`
      },
      "&-horizontal": {
        display: "flex",
        clear: "both",
        width: "100%",
        minWidth: "100%",
        // Fix https://github.com/ant-design/ant-design/issues/10914
        margin: `${unit(token.marginLG)} 0`
      },
      [`&-horizontal${componentCls}-with-text`]: {
        display: "flex",
        alignItems: "center",
        margin: `${unit(token.dividerHorizontalWithTextGutterMargin)} 0`,
        color: token.colorTextHeading,
        fontWeight: 500,
        fontSize: token.fontSizeLG,
        whiteSpace: "nowrap",
        textAlign: "center",
        borderBlockStart: `0 ${colorSplit}`,
        "&::before, &::after": {
          position: "relative",
          width: "50%",
          borderBlockStart: `${unit(lineWidth)} solid transparent`,
          // Chrome not accept `inherit` in `border-top`
          borderBlockStartColor: "inherit",
          borderBlockEnd: 0,
          transform: "translateY(50%)",
          content: "''"
        }
      },
      [`&-horizontal${componentCls}-with-text-start`]: {
        "&::before": {
          width: `calc(${orientationMargin} * 100%)`
        },
        "&::after": {
          width: `calc(100% - ${orientationMargin} * 100%)`
        }
      },
      [`&-horizontal${componentCls}-with-text-end`]: {
        "&::before": {
          width: `calc(100% - ${orientationMargin} * 100%)`
        },
        "&::after": {
          width: `calc(${orientationMargin} * 100%)`
        }
      },
      [`${componentCls}-inner-text`]: {
        display: "inline-block",
        paddingBlock: 0,
        paddingInline: textPaddingInline
      },
      "&-dashed": {
        background: "none",
        borderColor: colorSplit,
        borderStyle: "dashed",
        borderWidth: `${unit(lineWidth)} 0 0`
      },
      [`&-horizontal${componentCls}-with-text${componentCls}-dashed`]: {
        "&::before, &::after": {
          borderStyle: "dashed none none"
        }
      },
      [`&-vertical${componentCls}-dashed`]: {
        borderInlineStartWidth: lineWidth,
        borderInlineEnd: 0,
        borderBlockStart: 0,
        borderBlockEnd: 0
      },
      "&-dotted": {
        background: "none",
        borderColor: colorSplit,
        borderStyle: "dotted",
        borderWidth: `${unit(lineWidth)} 0 0`
      },
      [`&-horizontal${componentCls}-with-text${componentCls}-dotted`]: {
        "&::before, &::after": {
          borderStyle: "dotted none none"
        }
      },
      [`&-vertical${componentCls}-dotted`]: {
        borderInlineStartWidth: lineWidth,
        borderInlineEnd: 0,
        borderBlockStart: 0,
        borderBlockEnd: 0
      },
      [`&-plain${componentCls}-with-text`]: {
        color: token.colorText,
        fontWeight: "normal",
        fontSize: token.fontSize
      },
      [`&-horizontal${componentCls}-with-text-start${componentCls}-no-default-orientation-margin-start`]: {
        "&::before": {
          width: 0
        },
        "&::after": {
          width: "100%"
        },
        [`${componentCls}-inner-text`]: {
          paddingInlineStart: sizePaddingEdgeHorizontal
        }
      },
      [`&-horizontal${componentCls}-with-text-end${componentCls}-no-default-orientation-margin-end`]: {
        "&::before": {
          width: "100%"
        },
        "&::after": {
          width: 0
        },
        [`${componentCls}-inner-text`]: {
          paddingInlineEnd: sizePaddingEdgeHorizontal
        }
      }
    })
  };
};
const prepareComponentToken$1 = (token) => ({
  textPaddingInline: "1em",
  orientationMargin: 0.05,
  verticalMarginInline: token.marginXS
});
const useStyle$2 = genStyleHooks("Divider", (token) => {
  const dividerToken = merge(token, {
    dividerHorizontalWithTextGutterMargin: token.margin,
    sizePaddingEdgeHorizontal: 0
  });
  return [genSharedDividerStyle(dividerToken), genSizeDividerStyle(dividerToken)];
}, prepareComponentToken$1, {
  unitless: {
    orientationMargin: true
  }
});
var __rest$5 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const sizeClassNameMap = {
  small: "sm",
  middle: "md"
};
const Divider = (props) => {
  const {
    getPrefixCls,
    direction,
    className: dividerClassName,
    style: dividerStyle
  } = useComponentConfig("divider");
  const {
    prefixCls: customizePrefixCls,
    type = "horizontal",
    orientation = "center",
    orientationMargin,
    className,
    rootClassName,
    children,
    dashed,
    variant = "solid",
    plain,
    style,
    size: customSize
  } = props, restProps = __rest$5(props, ["prefixCls", "type", "orientation", "orientationMargin", "className", "rootClassName", "children", "dashed", "variant", "plain", "style", "size"]);
  const prefixCls = getPrefixCls("divider", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$2(prefixCls);
  const sizeFullName = useSize(customSize);
  const sizeCls = sizeClassNameMap[sizeFullName];
  const hasChildren = !!children;
  const mergedOrientation = reactExports.useMemo(() => {
    if (orientation === "left") {
      return direction === "rtl" ? "end" : "start";
    }
    if (orientation === "right") {
      return direction === "rtl" ? "start" : "end";
    }
    return orientation;
  }, [direction, orientation]);
  const hasMarginStart = mergedOrientation === "start" && orientationMargin != null;
  const hasMarginEnd = mergedOrientation === "end" && orientationMargin != null;
  const classString = classNames(prefixCls, dividerClassName, hashId, cssVarCls, `${prefixCls}-${type}`, {
    [`${prefixCls}-with-text`]: hasChildren,
    [`${prefixCls}-with-text-${mergedOrientation}`]: hasChildren,
    [`${prefixCls}-dashed`]: !!dashed,
    [`${prefixCls}-${variant}`]: variant !== "solid",
    [`${prefixCls}-plain`]: !!plain,
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-no-default-orientation-margin-start`]: hasMarginStart,
    [`${prefixCls}-no-default-orientation-margin-end`]: hasMarginEnd,
    [`${prefixCls}-${sizeCls}`]: !!sizeCls
  }, className, rootClassName);
  const memoizedOrientationMargin = reactExports.useMemo(() => {
    if (typeof orientationMargin === "number") {
      return orientationMargin;
    }
    if (/^\d+$/.test(orientationMargin)) {
      return Number(orientationMargin);
    }
    return orientationMargin;
  }, [orientationMargin]);
  const innerStyle = {
    marginInlineStart: hasMarginStart ? memoizedOrientationMargin : void 0,
    marginInlineEnd: hasMarginEnd ? memoizedOrientationMargin : void 0
  };
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({
    className: classString,
    style: Object.assign(Object.assign({}, dividerStyle), style)
  }, restProps, {
    role: "separator"
  }), children && type !== "vertical" && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-inner-text`,
    style: innerStyle
  }, children)));
};
const PanelPickerContext = /* @__PURE__ */ React.createContext({});
const PanelPresetsContext = /* @__PURE__ */ React.createContext({});
const ColorClear = ({
  prefixCls,
  value,
  onChange
}) => {
  const handleClick = () => {
    if (onChange && value && !value.cleared) {
      const hsba = value.toHsb();
      hsba.a = 0;
      const genColor = generateColor$1(hsba);
      genColor.cleared = true;
      onChange(genColor);
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-clear`,
    onClick: handleClick
  });
};
const FORMAT_HEX = "hex";
const FORMAT_RGB = "rgb";
const FORMAT_HSB = "hsb";
const ColorSteppers = ({
  prefixCls,
  min = 0,
  max = 100,
  value,
  onChange,
  className,
  formatter
}) => {
  const colorSteppersPrefixCls = `${prefixCls}-steppers`;
  const [internalValue, setInternalValue] = reactExports.useState(0);
  const stepValue = !Number.isNaN(value) ? value : internalValue;
  return /* @__PURE__ */ React.createElement(TypedInputNumber, {
    className: classNames(colorSteppersPrefixCls, className),
    min,
    max,
    value: stepValue,
    formatter,
    size: "small",
    onChange: (step) => {
      setInternalValue(step || 0);
      onChange === null || onChange === void 0 ? void 0 : onChange(step);
    }
  });
};
const ColorAlphaInput = ({
  prefixCls,
  value,
  onChange
}) => {
  const colorAlphaInputPrefixCls = `${prefixCls}-alpha-input`;
  const [internalValue, setInternalValue] = reactExports.useState(() => generateColor$1(value || "#000"));
  const alphaValue = value || internalValue;
  const handleAlphaChange = (step) => {
    const hsba = alphaValue.toHsb();
    hsba.a = (step || 0) / 100;
    const genColor = generateColor$1(hsba);
    setInternalValue(genColor);
    onChange === null || onChange === void 0 ? void 0 : onChange(genColor);
  };
  return /* @__PURE__ */ React.createElement(ColorSteppers, {
    value: getColorAlpha(alphaValue),
    prefixCls,
    formatter: (step) => `${step}%`,
    className: colorAlphaInputPrefixCls,
    onChange: handleAlphaChange
  });
};
const hexReg = /(^#[\da-f]{6}$)|(^#[\da-f]{8}$)/i;
const isHexString = (hex) => hexReg.test(`#${hex}`);
const ColorHexInput = ({
  prefixCls,
  value,
  onChange
}) => {
  const colorHexInputPrefixCls = `${prefixCls}-hex-input`;
  const [hexValue, setHexValue] = reactExports.useState(() => value ? toHexFormat(value.toHexString()) : void 0);
  reactExports.useEffect(() => {
    if (value) {
      setHexValue(toHexFormat(value.toHexString()));
    }
  }, [value]);
  const handleHexChange = (e) => {
    const originValue = e.target.value;
    setHexValue(toHexFormat(originValue));
    if (isHexString(toHexFormat(originValue, true))) {
      onChange === null || onChange === void 0 ? void 0 : onChange(generateColor$1(originValue));
    }
  };
  return /* @__PURE__ */ React.createElement(Input, {
    className: colorHexInputPrefixCls,
    value: hexValue,
    prefix: "#",
    onChange: handleHexChange,
    size: "small"
  });
};
const ColorHsbInput = ({
  prefixCls,
  value,
  onChange
}) => {
  const colorHsbInputPrefixCls = `${prefixCls}-hsb-input`;
  const [internalValue, setInternalValue] = reactExports.useState(() => generateColor$1(value || "#000"));
  const hsbValue = value || internalValue;
  const handleHsbChange = (step, type) => {
    const hsb = hsbValue.toHsb();
    hsb[type] = type === "h" ? step : (step || 0) / 100;
    const genColor = generateColor$1(hsb);
    setInternalValue(genColor);
    onChange === null || onChange === void 0 ? void 0 : onChange(genColor);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: colorHsbInputPrefixCls
  }, /* @__PURE__ */ React.createElement(ColorSteppers, {
    max: 360,
    min: 0,
    value: Number(hsbValue.toHsb().h),
    prefixCls,
    className: colorHsbInputPrefixCls,
    formatter: (step) => getRoundNumber(step || 0).toString(),
    onChange: (step) => handleHsbChange(Number(step), "h")
  }), /* @__PURE__ */ React.createElement(ColorSteppers, {
    max: 100,
    min: 0,
    value: Number(hsbValue.toHsb().s) * 100,
    prefixCls,
    className: colorHsbInputPrefixCls,
    formatter: (step) => `${getRoundNumber(step || 0)}%`,
    onChange: (step) => handleHsbChange(Number(step), "s")
  }), /* @__PURE__ */ React.createElement(ColorSteppers, {
    max: 100,
    min: 0,
    value: Number(hsbValue.toHsb().b) * 100,
    prefixCls,
    className: colorHsbInputPrefixCls,
    formatter: (step) => `${getRoundNumber(step || 0)}%`,
    onChange: (step) => handleHsbChange(Number(step), "b")
  }));
};
const ColorRgbInput = ({
  prefixCls,
  value,
  onChange
}) => {
  const colorRgbInputPrefixCls = `${prefixCls}-rgb-input`;
  const [internalValue, setInternalValue] = reactExports.useState(() => generateColor$1(value || "#000"));
  const rgbValue = value || internalValue;
  const handleRgbChange = (step, type) => {
    const rgb = rgbValue.toRgb();
    rgb[type] = step || 0;
    const genColor = generateColor$1(rgb);
    setInternalValue(genColor);
    onChange === null || onChange === void 0 ? void 0 : onChange(genColor);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: colorRgbInputPrefixCls
  }, /* @__PURE__ */ React.createElement(ColorSteppers, {
    max: 255,
    min: 0,
    value: Number(rgbValue.toRgb().r),
    prefixCls,
    className: colorRgbInputPrefixCls,
    onChange: (step) => handleRgbChange(Number(step), "r")
  }), /* @__PURE__ */ React.createElement(ColorSteppers, {
    max: 255,
    min: 0,
    value: Number(rgbValue.toRgb().g),
    prefixCls,
    className: colorRgbInputPrefixCls,
    onChange: (step) => handleRgbChange(Number(step), "g")
  }), /* @__PURE__ */ React.createElement(ColorSteppers, {
    max: 255,
    min: 0,
    value: Number(rgbValue.toRgb().b),
    prefixCls,
    className: colorRgbInputPrefixCls,
    onChange: (step) => handleRgbChange(Number(step), "b")
  }));
};
const selectOptions = [FORMAT_HEX, FORMAT_HSB, FORMAT_RGB].map((format) => ({
  value: format,
  label: format.toUpperCase()
}));
const ColorInput = (props) => {
  const {
    prefixCls,
    format,
    value,
    disabledAlpha,
    onFormatChange,
    onChange,
    disabledFormat
  } = props;
  const [colorFormat, setColorFormat] = useMergedState(FORMAT_HEX, {
    value: format,
    onChange: onFormatChange
  });
  const colorInputPrefixCls = `${prefixCls}-input`;
  const handleFormatChange = (newFormat) => {
    setColorFormat(newFormat);
  };
  const steppersNode = reactExports.useMemo(() => {
    const inputProps = {
      value,
      prefixCls,
      onChange
    };
    switch (colorFormat) {
      case FORMAT_HSB:
        return /* @__PURE__ */ React.createElement(ColorHsbInput, Object.assign({}, inputProps));
      case FORMAT_RGB:
        return /* @__PURE__ */ React.createElement(ColorRgbInput, Object.assign({}, inputProps));
      default:
        return /* @__PURE__ */ React.createElement(ColorHexInput, Object.assign({}, inputProps));
    }
  }, [colorFormat, prefixCls, value, onChange]);
  return /* @__PURE__ */ React.createElement("div", {
    className: `${colorInputPrefixCls}-container`
  }, !disabledFormat && /* @__PURE__ */ React.createElement(Select, {
    value: colorFormat,
    variant: "borderless",
    getPopupContainer: (current) => current,
    popupMatchSelectWidth: 68,
    placement: "bottomRight",
    onChange: handleFormatChange,
    className: `${prefixCls}-format-select`,
    size: "small",
    options: selectOptions
  }), /* @__PURE__ */ React.createElement("div", {
    className: colorInputPrefixCls
  }, steppersNode), !disabledAlpha && /* @__PURE__ */ React.createElement(ColorAlphaInput, {
    prefixCls,
    value,
    onChange
  }));
};
function getOffset(value, min, max) {
  return (value - min) / (max - min);
}
function getDirectionStyle(direction, value, min, max) {
  var offset = getOffset(value, min, max);
  var positionStyle = {};
  switch (direction) {
    case "rtl":
      positionStyle.right = "".concat(offset * 100, "%");
      positionStyle.transform = "translateX(50%)";
      break;
    case "btt":
      positionStyle.bottom = "".concat(offset * 100, "%");
      positionStyle.transform = "translateY(50%)";
      break;
    case "ttb":
      positionStyle.top = "".concat(offset * 100, "%");
      positionStyle.transform = "translateY(-50%)";
      break;
    default:
      positionStyle.left = "".concat(offset * 100, "%");
      positionStyle.transform = "translateX(-50%)";
      break;
  }
  return positionStyle;
}
function getIndex(value, index) {
  return Array.isArray(value) ? value[index] : value;
}
var SliderContext = /* @__PURE__ */ reactExports.createContext({
  min: 0,
  max: 0,
  direction: "ltr",
  step: 1,
  includedStart: 0,
  includedEnd: 0,
  tabIndex: 0,
  keyboard: true,
  styles: {},
  classNames: {}
});
var UnstableContext = /* @__PURE__ */ reactExports.createContext({});
var _excluded$1 = ["prefixCls", "value", "valueIndex", "onStartMove", "onDelete", "style", "render", "dragging", "draggingDelete", "onOffsetChange", "onChangeComplete", "onFocus", "onMouseEnter"];
var Handle = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, value = props.value, valueIndex = props.valueIndex, onStartMove = props.onStartMove, onDelete = props.onDelete, style = props.style, render = props.render, dragging = props.dragging, draggingDelete = props.draggingDelete, onOffsetChange = props.onOffsetChange, onChangeComplete = props.onChangeComplete, onFocus = props.onFocus, onMouseEnter = props.onMouseEnter, restProps = _objectWithoutProperties(props, _excluded$1);
  var _React$useContext = reactExports.useContext(SliderContext), min = _React$useContext.min, max = _React$useContext.max, direction = _React$useContext.direction, disabled = _React$useContext.disabled, keyboard = _React$useContext.keyboard, range = _React$useContext.range, tabIndex = _React$useContext.tabIndex, ariaLabelForHandle = _React$useContext.ariaLabelForHandle, ariaLabelledByForHandle = _React$useContext.ariaLabelledByForHandle, ariaRequired = _React$useContext.ariaRequired, ariaValueTextFormatterForHandle = _React$useContext.ariaValueTextFormatterForHandle, styles = _React$useContext.styles, classNames$1 = _React$useContext.classNames;
  var handlePrefixCls = "".concat(prefixCls, "-handle");
  var onInternalStartMove = function onInternalStartMove2(e) {
    if (!disabled) {
      onStartMove(e, valueIndex);
    }
  };
  var onInternalFocus = function onInternalFocus2(e) {
    onFocus === null || onFocus === void 0 || onFocus(e, valueIndex);
  };
  var onInternalMouseEnter = function onInternalMouseEnter2(e) {
    onMouseEnter(e, valueIndex);
  };
  var onKeyDown = function onKeyDown2(e) {
    if (!disabled && keyboard) {
      var offset = null;
      switch (e.which || e.keyCode) {
        case KeyCode.LEFT:
          offset = direction === "ltr" || direction === "btt" ? -1 : 1;
          break;
        case KeyCode.RIGHT:
          offset = direction === "ltr" || direction === "btt" ? 1 : -1;
          break;
        case KeyCode.UP:
          offset = direction !== "ttb" ? 1 : -1;
          break;
        case KeyCode.DOWN:
          offset = direction !== "ttb" ? -1 : 1;
          break;
        case KeyCode.HOME:
          offset = "min";
          break;
        case KeyCode.END:
          offset = "max";
          break;
        case KeyCode.PAGE_UP:
          offset = 2;
          break;
        case KeyCode.PAGE_DOWN:
          offset = -2;
          break;
        case KeyCode.BACKSPACE:
        case KeyCode.DELETE:
          onDelete === null || onDelete === void 0 || onDelete(valueIndex);
          break;
      }
      if (offset !== null) {
        e.preventDefault();
        onOffsetChange(offset, valueIndex);
      }
    }
  };
  var handleKeyUp = function handleKeyUp2(e) {
    switch (e.which || e.keyCode) {
      case KeyCode.LEFT:
      case KeyCode.RIGHT:
      case KeyCode.UP:
      case KeyCode.DOWN:
      case KeyCode.HOME:
      case KeyCode.END:
      case KeyCode.PAGE_UP:
      case KeyCode.PAGE_DOWN:
        onChangeComplete === null || onChangeComplete === void 0 || onChangeComplete();
        break;
    }
  };
  var positionStyle = getDirectionStyle(direction, value, min, max);
  var divProps = {};
  if (valueIndex !== null) {
    var _getIndex;
    divProps = {
      tabIndex: disabled ? null : getIndex(tabIndex, valueIndex),
      role: "slider",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-disabled": disabled,
      "aria-label": getIndex(ariaLabelForHandle, valueIndex),
      "aria-labelledby": getIndex(ariaLabelledByForHandle, valueIndex),
      "aria-required": getIndex(ariaRequired, valueIndex),
      "aria-valuetext": (_getIndex = getIndex(ariaValueTextFormatterForHandle, valueIndex)) === null || _getIndex === void 0 ? void 0 : _getIndex(value),
      "aria-orientation": direction === "ltr" || direction === "rtl" ? "horizontal" : "vertical",
      onMouseDown: onInternalStartMove,
      onTouchStart: onInternalStartMove,
      onFocus: onInternalFocus,
      onMouseEnter: onInternalMouseEnter,
      onKeyDown,
      onKeyUp: handleKeyUp
    };
  }
  var handleNode = /* @__PURE__ */ reactExports.createElement("div", _extends({
    ref,
    className: classNames(handlePrefixCls, _defineProperty(_defineProperty(_defineProperty({}, "".concat(handlePrefixCls, "-").concat(valueIndex + 1), valueIndex !== null && range), "".concat(handlePrefixCls, "-dragging"), dragging), "".concat(handlePrefixCls, "-dragging-delete"), draggingDelete), classNames$1.handle),
    style: _objectSpread2(_objectSpread2(_objectSpread2({}, positionStyle), style), styles.handle)
  }, divProps, restProps));
  if (render) {
    handleNode = render(handleNode, {
      index: valueIndex,
      prefixCls,
      value,
      dragging,
      draggingDelete
    });
  }
  return handleNode;
});
var _excluded = ["prefixCls", "style", "onStartMove", "onOffsetChange", "values", "handleRender", "activeHandleRender", "draggingIndex", "draggingDelete", "onFocus"];
var Handles = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, style = props.style, onStartMove = props.onStartMove, onOffsetChange = props.onOffsetChange, values = props.values, handleRender = props.handleRender, activeHandleRender = props.activeHandleRender, draggingIndex = props.draggingIndex, draggingDelete = props.draggingDelete, onFocus = props.onFocus, restProps = _objectWithoutProperties(props, _excluded);
  var handlesRef = reactExports.useRef({});
  var _React$useState = reactExports.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), activeVisible = _React$useState2[0], setActiveVisible = _React$useState2[1];
  var _React$useState3 = reactExports.useState(-1), _React$useState4 = _slicedToArray(_React$useState3, 2), activeIndex = _React$useState4[0], setActiveIndex = _React$useState4[1];
  var onActive = function onActive2(index) {
    setActiveIndex(index);
    setActiveVisible(true);
  };
  var onHandleFocus = function onHandleFocus2(e, index) {
    onActive(index);
    onFocus === null || onFocus === void 0 || onFocus(e);
  };
  var onHandleMouseEnter = function onHandleMouseEnter2(e, index) {
    onActive(index);
  };
  reactExports.useImperativeHandle(ref, function() {
    return {
      focus: function focus(index) {
        var _handlesRef$current$i;
        (_handlesRef$current$i = handlesRef.current[index]) === null || _handlesRef$current$i === void 0 || _handlesRef$current$i.focus();
      },
      hideHelp: function hideHelp() {
        reactDomExports.flushSync(function() {
          setActiveVisible(false);
        });
      }
    };
  });
  var handleProps = _objectSpread2({
    prefixCls,
    onStartMove,
    onOffsetChange,
    render: handleRender,
    onFocus: onHandleFocus,
    onMouseEnter: onHandleMouseEnter
  }, restProps);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, values.map(function(value, index) {
    var dragging = draggingIndex === index;
    return /* @__PURE__ */ reactExports.createElement(Handle, _extends({
      ref: function ref2(node) {
        if (!node) {
          delete handlesRef.current[index];
        } else {
          handlesRef.current[index] = node;
        }
      },
      dragging,
      draggingDelete: dragging && draggingDelete,
      style: getIndex(style, index),
      key: index,
      value,
      valueIndex: index
    }, handleProps));
  }), activeHandleRender && activeVisible && /* @__PURE__ */ reactExports.createElement(Handle, _extends({
    key: "a11y"
  }, handleProps, {
    value: values[activeIndex],
    valueIndex: null,
    dragging: draggingIndex !== -1,
    draggingDelete,
    render: activeHandleRender,
    style: {
      pointerEvents: "none"
    },
    tabIndex: null,
    "aria-hidden": true
  })));
});
var Mark = function Mark2(props) {
  var prefixCls = props.prefixCls, style = props.style, children = props.children, value = props.value, _onClick = props.onClick;
  var _React$useContext = reactExports.useContext(SliderContext), min = _React$useContext.min, max = _React$useContext.max, direction = _React$useContext.direction, includedStart = _React$useContext.includedStart, includedEnd = _React$useContext.includedEnd, included = _React$useContext.included;
  var textCls = "".concat(prefixCls, "-text");
  var positionStyle = getDirectionStyle(direction, value, min, max);
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: classNames(textCls, _defineProperty({}, "".concat(textCls, "-active"), included && includedStart <= value && value <= includedEnd)),
    style: _objectSpread2(_objectSpread2({}, positionStyle), style),
    onMouseDown: function onMouseDown(e) {
      e.stopPropagation();
    },
    onClick: function onClick() {
      _onClick(value);
    }
  }, children);
};
var Marks = function Marks2(props) {
  var prefixCls = props.prefixCls, marks = props.marks, onClick = props.onClick;
  var markPrefixCls = "".concat(prefixCls, "-mark");
  if (!marks.length) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: markPrefixCls
  }, marks.map(function(_ref) {
    var value = _ref.value, style = _ref.style, label = _ref.label;
    return /* @__PURE__ */ reactExports.createElement(Mark, {
      key: value,
      prefixCls: markPrefixCls,
      style,
      value,
      onClick
    }, label);
  }));
};
var Dot = function Dot2(props) {
  var prefixCls = props.prefixCls, value = props.value, style = props.style, activeStyle = props.activeStyle;
  var _React$useContext = reactExports.useContext(SliderContext), min = _React$useContext.min, max = _React$useContext.max, direction = _React$useContext.direction, included = _React$useContext.included, includedStart = _React$useContext.includedStart, includedEnd = _React$useContext.includedEnd;
  var dotClassName = "".concat(prefixCls, "-dot");
  var active = included && includedStart <= value && value <= includedEnd;
  var mergedStyle = _objectSpread2(_objectSpread2({}, getDirectionStyle(direction, value, min, max)), typeof style === "function" ? style(value) : style);
  if (active) {
    mergedStyle = _objectSpread2(_objectSpread2({}, mergedStyle), typeof activeStyle === "function" ? activeStyle(value) : activeStyle);
  }
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: classNames(dotClassName, _defineProperty({}, "".concat(dotClassName, "-active"), active)),
    style: mergedStyle
  });
};
var Steps = function Steps2(props) {
  var prefixCls = props.prefixCls, marks = props.marks, dots = props.dots, style = props.style, activeStyle = props.activeStyle;
  var _React$useContext = reactExports.useContext(SliderContext), min = _React$useContext.min, max = _React$useContext.max, step = _React$useContext.step;
  var stepDots = reactExports.useMemo(function() {
    var dotSet = /* @__PURE__ */ new Set();
    marks.forEach(function(mark) {
      dotSet.add(mark.value);
    });
    if (dots && step !== null) {
      var current = min;
      while (current <= max) {
        dotSet.add(current);
        current += step;
      }
    }
    return Array.from(dotSet);
  }, [min, max, step, dots, marks]);
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-step")
  }, stepDots.map(function(dotValue) {
    return /* @__PURE__ */ reactExports.createElement(Dot, {
      prefixCls,
      key: dotValue,
      value: dotValue,
      style,
      activeStyle
    });
  }));
};
var Track = function Track2(props) {
  var prefixCls = props.prefixCls, style = props.style, start = props.start, end = props.end, index = props.index, onStartMove = props.onStartMove, replaceCls = props.replaceCls;
  var _React$useContext = reactExports.useContext(SliderContext), direction = _React$useContext.direction, min = _React$useContext.min, max = _React$useContext.max, disabled = _React$useContext.disabled, range = _React$useContext.range, classNames$1 = _React$useContext.classNames;
  var trackPrefixCls = "".concat(prefixCls, "-track");
  var offsetStart = getOffset(start, min, max);
  var offsetEnd = getOffset(end, min, max);
  var onInternalStartMove = function onInternalStartMove2(e) {
    if (!disabled && onStartMove) {
      onStartMove(e, -1);
    }
  };
  var positionStyle = {};
  switch (direction) {
    case "rtl":
      positionStyle.right = "".concat(offsetStart * 100, "%");
      positionStyle.width = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
      break;
    case "btt":
      positionStyle.bottom = "".concat(offsetStart * 100, "%");
      positionStyle.height = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
      break;
    case "ttb":
      positionStyle.top = "".concat(offsetStart * 100, "%");
      positionStyle.height = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
      break;
    default:
      positionStyle.left = "".concat(offsetStart * 100, "%");
      positionStyle.width = "".concat(offsetEnd * 100 - offsetStart * 100, "%");
  }
  var className = replaceCls || classNames(trackPrefixCls, _defineProperty(_defineProperty({}, "".concat(trackPrefixCls, "-").concat(index + 1), index !== null && range), "".concat(prefixCls, "-track-draggable"), onStartMove), classNames$1.track);
  return /* @__PURE__ */ reactExports.createElement("div", {
    className,
    style: _objectSpread2(_objectSpread2({}, positionStyle), style),
    onMouseDown: onInternalStartMove,
    onTouchStart: onInternalStartMove
  });
};
var Tracks = function Tracks2(props) {
  var prefixCls = props.prefixCls, style = props.style, values = props.values, startPoint = props.startPoint, onStartMove = props.onStartMove;
  var _React$useContext = reactExports.useContext(SliderContext), included = _React$useContext.included, range = _React$useContext.range, min = _React$useContext.min, styles = _React$useContext.styles, classNames$1 = _React$useContext.classNames;
  var trackList = reactExports.useMemo(function() {
    if (!range) {
      if (values.length === 0) {
        return [];
      }
      var startValue = startPoint !== null && startPoint !== void 0 ? startPoint : min;
      var endValue = values[0];
      return [{
        start: Math.min(startValue, endValue),
        end: Math.max(startValue, endValue)
      }];
    }
    var list = [];
    for (var i = 0; i < values.length - 1; i += 1) {
      list.push({
        start: values[i],
        end: values[i + 1]
      });
    }
    return list;
  }, [values, range, startPoint, min]);
  if (!included) {
    return null;
  }
  var tracksNode = trackList !== null && trackList !== void 0 && trackList.length && (classNames$1.tracks || styles.tracks) ? /* @__PURE__ */ reactExports.createElement(Track, {
    index: null,
    prefixCls,
    start: trackList[0].start,
    end: trackList[trackList.length - 1].end,
    replaceCls: classNames(classNames$1.tracks, "".concat(prefixCls, "-tracks")),
    style: styles.tracks
  }) : null;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, tracksNode, trackList.map(function(_ref, index) {
    var start = _ref.start, end = _ref.end;
    return /* @__PURE__ */ reactExports.createElement(Track, {
      index,
      prefixCls,
      style: _objectSpread2(_objectSpread2({}, getIndex(style, index)), styles.track),
      start,
      end,
      key: index,
      onStartMove
    });
  }));
};
var REMOVE_DIST = 130;
function getPosition(e) {
  var obj = "targetTouches" in e ? e.targetTouches[0] : e;
  return {
    pageX: obj.pageX,
    pageY: obj.pageY
  };
}
function useDrag(containerRef, direction, rawValues, min, max, formatValue, triggerChange, finishChange, offsetValues, editable, minCount) {
  var _React$useState = reactExports.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), draggingValue = _React$useState2[0], setDraggingValue = _React$useState2[1];
  var _React$useState3 = reactExports.useState(-1), _React$useState4 = _slicedToArray(_React$useState3, 2), draggingIndex = _React$useState4[0], setDraggingIndex = _React$useState4[1];
  var _React$useState5 = reactExports.useState(false), _React$useState6 = _slicedToArray(_React$useState5, 2), draggingDelete = _React$useState6[0], setDraggingDelete = _React$useState6[1];
  var _React$useState7 = reactExports.useState(rawValues), _React$useState8 = _slicedToArray(_React$useState7, 2), cacheValues = _React$useState8[0], setCacheValues = _React$useState8[1];
  var _React$useState9 = reactExports.useState(rawValues), _React$useState10 = _slicedToArray(_React$useState9, 2), originValues = _React$useState10[0], setOriginValues = _React$useState10[1];
  var mouseMoveEventRef = reactExports.useRef(null);
  var mouseUpEventRef = reactExports.useRef(null);
  var touchEventTargetRef = reactExports.useRef(null);
  var _React$useContext = reactExports.useContext(UnstableContext), onDragStart = _React$useContext.onDragStart, onDragChange = _React$useContext.onDragChange;
  useLayoutEffect(function() {
    if (draggingIndex === -1) {
      setCacheValues(rawValues);
    }
  }, [rawValues, draggingIndex]);
  reactExports.useEffect(function() {
    return function() {
      document.removeEventListener("mousemove", mouseMoveEventRef.current);
      document.removeEventListener("mouseup", mouseUpEventRef.current);
      if (touchEventTargetRef.current) {
        touchEventTargetRef.current.removeEventListener("touchmove", mouseMoveEventRef.current);
        touchEventTargetRef.current.removeEventListener("touchend", mouseUpEventRef.current);
      }
    };
  }, []);
  var flushValues = function flushValues2(nextValues, nextValue, deleteMark) {
    if (nextValue !== void 0) {
      setDraggingValue(nextValue);
    }
    setCacheValues(nextValues);
    var changeValues = nextValues;
    if (deleteMark) {
      changeValues = nextValues.filter(function(_, i) {
        return i !== draggingIndex;
      });
    }
    triggerChange(changeValues);
    if (onDragChange) {
      onDragChange({
        rawValues: nextValues,
        deleteIndex: deleteMark ? draggingIndex : -1,
        draggingIndex,
        draggingValue: nextValue
      });
    }
  };
  var updateCacheValue = useEvent(function(valueIndex, offsetPercent, deleteMark) {
    if (valueIndex === -1) {
      var startValue = originValues[0];
      var endValue = originValues[originValues.length - 1];
      var maxStartOffset = min - startValue;
      var maxEndOffset = max - endValue;
      var offset = offsetPercent * (max - min);
      offset = Math.max(offset, maxStartOffset);
      offset = Math.min(offset, maxEndOffset);
      var formatStartValue = formatValue(startValue + offset);
      offset = formatStartValue - startValue;
      var cloneCacheValues = originValues.map(function(val) {
        return val + offset;
      });
      flushValues(cloneCacheValues);
    } else {
      var offsetDist = (max - min) * offsetPercent;
      var cloneValues = _toConsumableArray(cacheValues);
      cloneValues[valueIndex] = originValues[valueIndex];
      var next = offsetValues(cloneValues, offsetDist, valueIndex, "dist");
      flushValues(next.values, next.value, deleteMark);
    }
  });
  var onStartMove = function onStartMove2(e, valueIndex, startValues) {
    e.stopPropagation();
    var initialValues = startValues || rawValues;
    var originValue = initialValues[valueIndex];
    setDraggingIndex(valueIndex);
    setDraggingValue(originValue);
    setOriginValues(initialValues);
    setCacheValues(initialValues);
    setDraggingDelete(false);
    var _getPosition = getPosition(e), startX = _getPosition.pageX, startY = _getPosition.pageY;
    var deleteMark = false;
    if (onDragStart) {
      onDragStart({
        rawValues: initialValues,
        draggingIndex: valueIndex,
        draggingValue: originValue
      });
    }
    var onMouseMove = function onMouseMove2(event) {
      event.preventDefault();
      var _getPosition2 = getPosition(event), moveX = _getPosition2.pageX, moveY = _getPosition2.pageY;
      var offsetX = moveX - startX;
      var offsetY = moveY - startY;
      var _containerRef$current = containerRef.current.getBoundingClientRect(), width = _containerRef$current.width, height = _containerRef$current.height;
      var offSetPercent;
      var removeDist;
      switch (direction) {
        case "btt":
          offSetPercent = -offsetY / height;
          removeDist = offsetX;
          break;
        case "ttb":
          offSetPercent = offsetY / height;
          removeDist = offsetX;
          break;
        case "rtl":
          offSetPercent = -offsetX / width;
          removeDist = offsetY;
          break;
        default:
          offSetPercent = offsetX / width;
          removeDist = offsetY;
      }
      deleteMark = editable ? Math.abs(removeDist) > REMOVE_DIST && minCount < cacheValues.length : false;
      setDraggingDelete(deleteMark);
      updateCacheValue(valueIndex, offSetPercent, deleteMark);
    };
    var onMouseUp = function onMouseUp2(event) {
      event.preventDefault();
      document.removeEventListener("mouseup", onMouseUp2);
      document.removeEventListener("mousemove", onMouseMove);
      if (touchEventTargetRef.current) {
        touchEventTargetRef.current.removeEventListener("touchmove", mouseMoveEventRef.current);
        touchEventTargetRef.current.removeEventListener("touchend", mouseUpEventRef.current);
      }
      mouseMoveEventRef.current = null;
      mouseUpEventRef.current = null;
      touchEventTargetRef.current = null;
      finishChange(deleteMark);
      setDraggingIndex(-1);
      setDraggingDelete(false);
    };
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    e.currentTarget.addEventListener("touchend", onMouseUp);
    e.currentTarget.addEventListener("touchmove", onMouseMove);
    mouseMoveEventRef.current = onMouseMove;
    mouseUpEventRef.current = onMouseUp;
    touchEventTargetRef.current = e.currentTarget;
  };
  var returnValues = reactExports.useMemo(function() {
    var sourceValues = _toConsumableArray(rawValues).sort(function(a, b) {
      return a - b;
    });
    var targetValues = _toConsumableArray(cacheValues).sort(function(a, b) {
      return a - b;
    });
    var counts = {};
    targetValues.forEach(function(val) {
      counts[val] = (counts[val] || 0) + 1;
    });
    sourceValues.forEach(function(val) {
      counts[val] = (counts[val] || 0) - 1;
    });
    var maxDiffCount = editable ? 1 : 0;
    var diffCount = Object.values(counts).reduce(function(prev, next) {
      return prev + Math.abs(next);
    }, 0);
    return diffCount <= maxDiffCount ? cacheValues : rawValues;
  }, [rawValues, cacheValues, editable]);
  return [draggingIndex, draggingValue, draggingDelete, returnValues, onStartMove];
}
function useOffset(min, max, step, markList, allowCross, pushable) {
  var formatRangeValue = reactExports.useCallback(function(val) {
    return Math.max(min, Math.min(max, val));
  }, [min, max]);
  var formatStepValue = reactExports.useCallback(function(val) {
    if (step !== null) {
      var stepValue = min + Math.round((formatRangeValue(val) - min) / step) * step;
      var getDecimal = function getDecimal2(num) {
        return (String(num).split(".")[1] || "").length;
      };
      var maxDecimal = Math.max(getDecimal(step), getDecimal(max), getDecimal(min));
      var fixedValue = Number(stepValue.toFixed(maxDecimal));
      return min <= fixedValue && fixedValue <= max ? fixedValue : null;
    }
    return null;
  }, [step, min, max, formatRangeValue]);
  var formatValue = reactExports.useCallback(function(val) {
    var formatNextValue = formatRangeValue(val);
    var alignValues = markList.map(function(mark) {
      return mark.value;
    });
    if (step !== null) {
      alignValues.push(formatStepValue(val));
    }
    alignValues.push(min, max);
    var closeValue = alignValues[0];
    var closeDist = max - min;
    alignValues.forEach(function(alignValue) {
      var dist = Math.abs(formatNextValue - alignValue);
      if (dist <= closeDist) {
        closeValue = alignValue;
        closeDist = dist;
      }
    });
    return closeValue;
  }, [min, max, markList, step, formatRangeValue, formatStepValue]);
  var offsetValue = function offsetValue2(values, offset, valueIndex) {
    var mode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit";
    if (typeof offset === "number") {
      var nextValue;
      var originValue = values[valueIndex];
      var targetDistValue = originValue + offset;
      var potentialValues = [];
      markList.forEach(function(mark) {
        potentialValues.push(mark.value);
      });
      potentialValues.push(min, max);
      potentialValues.push(formatStepValue(originValue));
      var sign = offset > 0 ? 1 : -1;
      if (mode === "unit") {
        potentialValues.push(formatStepValue(originValue + sign * step));
      } else {
        potentialValues.push(formatStepValue(targetDistValue));
      }
      potentialValues = potentialValues.filter(function(val) {
        return val !== null;
      }).filter(function(val) {
        return offset < 0 ? val <= originValue : val >= originValue;
      });
      if (mode === "unit") {
        potentialValues = potentialValues.filter(function(val) {
          return val !== originValue;
        });
      }
      var compareValue = mode === "unit" ? originValue : targetDistValue;
      nextValue = potentialValues[0];
      var valueDist = Math.abs(nextValue - compareValue);
      potentialValues.forEach(function(potentialValue) {
        var dist = Math.abs(potentialValue - compareValue);
        if (dist < valueDist) {
          nextValue = potentialValue;
          valueDist = dist;
        }
      });
      if (nextValue === void 0) {
        return offset < 0 ? min : max;
      }
      if (mode === "dist") {
        return nextValue;
      }
      if (Math.abs(offset) > 1) {
        var cloneValues = _toConsumableArray(values);
        cloneValues[valueIndex] = nextValue;
        return offsetValue2(cloneValues, offset - sign, valueIndex, mode);
      }
      return nextValue;
    } else if (offset === "min") {
      return min;
    } else if (offset === "max") {
      return max;
    }
  };
  var offsetChangedValue = function offsetChangedValue2(values, offset, valueIndex) {
    var mode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit";
    var originValue = values[valueIndex];
    var nextValue = offsetValue(values, offset, valueIndex, mode);
    return {
      value: nextValue,
      changed: nextValue !== originValue
    };
  };
  var needPush = function needPush2(dist) {
    return pushable === null && dist === 0 || typeof pushable === "number" && dist < pushable;
  };
  var offsetValues = function offsetValues2(values, offset, valueIndex) {
    var mode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "unit";
    var nextValues = values.map(formatValue);
    var originValue = nextValues[valueIndex];
    var nextValue = offsetValue(nextValues, offset, valueIndex, mode);
    nextValues[valueIndex] = nextValue;
    if (allowCross === false) {
      var pushNum = pushable || 0;
      if (valueIndex > 0 && nextValues[valueIndex - 1] !== originValue) {
        nextValues[valueIndex] = Math.max(nextValues[valueIndex], nextValues[valueIndex - 1] + pushNum);
      }
      if (valueIndex < nextValues.length - 1 && nextValues[valueIndex + 1] !== originValue) {
        nextValues[valueIndex] = Math.min(nextValues[valueIndex], nextValues[valueIndex + 1] - pushNum);
      }
    } else if (typeof pushable === "number" || pushable === null) {
      for (var i = valueIndex + 1; i < nextValues.length; i += 1) {
        var changed = true;
        while (needPush(nextValues[i] - nextValues[i - 1]) && changed) {
          var _offsetChangedValue = offsetChangedValue(nextValues, 1, i);
          nextValues[i] = _offsetChangedValue.value;
          changed = _offsetChangedValue.changed;
        }
      }
      for (var _i = valueIndex; _i > 0; _i -= 1) {
        var _changed = true;
        while (needPush(nextValues[_i] - nextValues[_i - 1]) && _changed) {
          var _offsetChangedValue2 = offsetChangedValue(nextValues, -1, _i - 1);
          nextValues[_i - 1] = _offsetChangedValue2.value;
          _changed = _offsetChangedValue2.changed;
        }
      }
      for (var _i2 = nextValues.length - 1; _i2 > 0; _i2 -= 1) {
        var _changed2 = true;
        while (needPush(nextValues[_i2] - nextValues[_i2 - 1]) && _changed2) {
          var _offsetChangedValue3 = offsetChangedValue(nextValues, -1, _i2 - 1);
          nextValues[_i2 - 1] = _offsetChangedValue3.value;
          _changed2 = _offsetChangedValue3.changed;
        }
      }
      for (var _i3 = 0; _i3 < nextValues.length - 1; _i3 += 1) {
        var _changed3 = true;
        while (needPush(nextValues[_i3 + 1] - nextValues[_i3]) && _changed3) {
          var _offsetChangedValue4 = offsetChangedValue(nextValues, 1, _i3 + 1);
          nextValues[_i3 + 1] = _offsetChangedValue4.value;
          _changed3 = _offsetChangedValue4.changed;
        }
      }
    }
    return {
      value: nextValues[valueIndex],
      values: nextValues
    };
  };
  return [formatValue, offsetValues];
}
function useRange(range) {
  return reactExports.useMemo(function() {
    if (range === true || !range) {
      return [!!range, false, false, 0];
    }
    var editable = range.editable, draggableTrack = range.draggableTrack, minCount = range.minCount, maxCount = range.maxCount;
    return [true, editable, !editable && draggableTrack, minCount || 0, maxCount];
  }, [range]);
}
var Slider$1 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-slider" : _props$prefixCls, className = props.className, style = props.style, classNames$1 = props.classNames, styles = props.styles, id = props.id, _props$disabled = props.disabled, disabled = _props$disabled === void 0 ? false : _props$disabled, _props$keyboard = props.keyboard, keyboard = _props$keyboard === void 0 ? true : _props$keyboard, autoFocus = props.autoFocus, onFocus = props.onFocus, onBlur = props.onBlur, _props$min = props.min, min = _props$min === void 0 ? 0 : _props$min, _props$max = props.max, max = _props$max === void 0 ? 100 : _props$max, _props$step = props.step, step = _props$step === void 0 ? 1 : _props$step, value = props.value, defaultValue = props.defaultValue, range = props.range, count = props.count, onChange = props.onChange, onBeforeChange = props.onBeforeChange, onAfterChange = props.onAfterChange, onChangeComplete = props.onChangeComplete, _props$allowCross = props.allowCross, allowCross = _props$allowCross === void 0 ? true : _props$allowCross, _props$pushable = props.pushable, pushable = _props$pushable === void 0 ? false : _props$pushable, reverse = props.reverse, vertical = props.vertical, _props$included = props.included, included = _props$included === void 0 ? true : _props$included, startPoint = props.startPoint, trackStyle = props.trackStyle, handleStyle = props.handleStyle, railStyle = props.railStyle, dotStyle = props.dotStyle, activeDotStyle = props.activeDotStyle, marks = props.marks, dots = props.dots, handleRender = props.handleRender, activeHandleRender = props.activeHandleRender, track = props.track, _props$tabIndex = props.tabIndex, tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex, ariaLabelForHandle = props.ariaLabelForHandle, ariaLabelledByForHandle = props.ariaLabelledByForHandle, ariaRequired = props.ariaRequired, ariaValueTextFormatterForHandle = props.ariaValueTextFormatterForHandle;
  var handlesRef = reactExports.useRef(null);
  var containerRef = reactExports.useRef(null);
  var direction = reactExports.useMemo(function() {
    if (vertical) {
      return reverse ? "ttb" : "btt";
    }
    return reverse ? "rtl" : "ltr";
  }, [reverse, vertical]);
  var _useRange = useRange(range), _useRange2 = _slicedToArray(_useRange, 5), rangeEnabled = _useRange2[0], rangeEditable = _useRange2[1], rangeDraggableTrack = _useRange2[2], minCount = _useRange2[3], maxCount = _useRange2[4];
  var mergedMin = reactExports.useMemo(function() {
    return isFinite(min) ? min : 0;
  }, [min]);
  var mergedMax = reactExports.useMemo(function() {
    return isFinite(max) ? max : 100;
  }, [max]);
  var mergedStep = reactExports.useMemo(function() {
    return step !== null && step <= 0 ? 1 : step;
  }, [step]);
  var mergedPush = reactExports.useMemo(function() {
    if (typeof pushable === "boolean") {
      return pushable ? mergedStep : false;
    }
    return pushable >= 0 ? pushable : false;
  }, [pushable, mergedStep]);
  var markList = reactExports.useMemo(function() {
    return Object.keys(marks || {}).map(function(key) {
      var mark = marks[key];
      var markObj = {
        value: Number(key)
      };
      if (mark && _typeof(mark) === "object" && !/* @__PURE__ */ reactExports.isValidElement(mark) && ("label" in mark || "style" in mark)) {
        markObj.style = mark.style;
        markObj.label = mark.label;
      } else {
        markObj.label = mark;
      }
      return markObj;
    }).filter(function(_ref) {
      var label = _ref.label;
      return label || typeof label === "number";
    }).sort(function(a, b) {
      return a.value - b.value;
    });
  }, [marks]);
  var _useOffset = useOffset(mergedMin, mergedMax, mergedStep, markList, allowCross, mergedPush), _useOffset2 = _slicedToArray(_useOffset, 2), formatValue = _useOffset2[0], offsetValues = _useOffset2[1];
  var _useMergedState = useMergedState(defaultValue, {
    value
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedValue = _useMergedState2[0], setValue = _useMergedState2[1];
  var rawValues = reactExports.useMemo(function() {
    var valueList = mergedValue === null || mergedValue === void 0 ? [] : Array.isArray(mergedValue) ? mergedValue : [mergedValue];
    var _valueList = _slicedToArray(valueList, 1), _valueList$ = _valueList[0], val0 = _valueList$ === void 0 ? mergedMin : _valueList$;
    var returnValues = mergedValue === null ? [] : [val0];
    if (rangeEnabled) {
      returnValues = _toConsumableArray(valueList);
      if (count || mergedValue === void 0) {
        var pointCount = count >= 0 ? count + 1 : 2;
        returnValues = returnValues.slice(0, pointCount);
        while (returnValues.length < pointCount) {
          var _returnValues;
          returnValues.push((_returnValues = returnValues[returnValues.length - 1]) !== null && _returnValues !== void 0 ? _returnValues : mergedMin);
        }
      }
      returnValues.sort(function(a, b) {
        return a - b;
      });
    }
    returnValues.forEach(function(val, index) {
      returnValues[index] = formatValue(val);
    });
    return returnValues;
  }, [mergedValue, rangeEnabled, mergedMin, count, formatValue]);
  var getTriggerValue = function getTriggerValue2(triggerValues) {
    return rangeEnabled ? triggerValues : triggerValues[0];
  };
  var triggerChange = useEvent(function(nextValues) {
    var cloneNextValues = _toConsumableArray(nextValues).sort(function(a, b) {
      return a - b;
    });
    if (onChange && !isEqual(cloneNextValues, rawValues, true)) {
      onChange(getTriggerValue(cloneNextValues));
    }
    setValue(cloneNextValues);
  });
  var finishChange = useEvent(function(draggingDelete2) {
    if (draggingDelete2) {
      handlesRef.current.hideHelp();
    }
    var finishValue = getTriggerValue(rawValues);
    onAfterChange === null || onAfterChange === void 0 || onAfterChange(finishValue);
    warningOnce(!onAfterChange, "[rc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead.");
    onChangeComplete === null || onChangeComplete === void 0 || onChangeComplete(finishValue);
  });
  var onDelete = function onDelete2(index) {
    if (disabled || !rangeEditable || rawValues.length <= minCount) {
      return;
    }
    var cloneNextValues = _toConsumableArray(rawValues);
    cloneNextValues.splice(index, 1);
    onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(getTriggerValue(cloneNextValues));
    triggerChange(cloneNextValues);
    var nextFocusIndex = Math.max(0, index - 1);
    handlesRef.current.hideHelp();
    handlesRef.current.focus(nextFocusIndex);
  };
  var _useDrag = useDrag(containerRef, direction, rawValues, mergedMin, mergedMax, formatValue, triggerChange, finishChange, offsetValues, rangeEditable, minCount), _useDrag2 = _slicedToArray(_useDrag, 5), draggingIndex = _useDrag2[0], draggingValue = _useDrag2[1], draggingDelete = _useDrag2[2], cacheValues = _useDrag2[3], onStartDrag = _useDrag2[4];
  var changeToCloseValue = function changeToCloseValue2(newValue, e) {
    if (!disabled) {
      var cloneNextValues = _toConsumableArray(rawValues);
      var valueIndex = 0;
      var valueBeforeIndex = 0;
      var valueDist = mergedMax - mergedMin;
      rawValues.forEach(function(val, index) {
        var dist = Math.abs(newValue - val);
        if (dist <= valueDist) {
          valueDist = dist;
          valueIndex = index;
        }
        if (val < newValue) {
          valueBeforeIndex = index;
        }
      });
      var focusIndex = valueIndex;
      if (rangeEditable && valueDist !== 0 && (!maxCount || rawValues.length < maxCount)) {
        cloneNextValues.splice(valueBeforeIndex + 1, 0, newValue);
        focusIndex = valueBeforeIndex + 1;
      } else {
        cloneNextValues[valueIndex] = newValue;
      }
      if (rangeEnabled && !rawValues.length && count === void 0) {
        cloneNextValues.push(newValue);
      }
      var nextValue = getTriggerValue(cloneNextValues);
      onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(nextValue);
      triggerChange(cloneNextValues);
      if (e) {
        var _document$activeEleme, _document$activeEleme2;
        (_document$activeEleme = document.activeElement) === null || _document$activeEleme === void 0 || (_document$activeEleme2 = _document$activeEleme.blur) === null || _document$activeEleme2 === void 0 || _document$activeEleme2.call(_document$activeEleme);
        handlesRef.current.focus(focusIndex);
        onStartDrag(e, focusIndex, cloneNextValues);
      } else {
        onAfterChange === null || onAfterChange === void 0 || onAfterChange(nextValue);
        warningOnce(!onAfterChange, "[rc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead.");
        onChangeComplete === null || onChangeComplete === void 0 || onChangeComplete(nextValue);
      }
    }
  };
  var onSliderMouseDown = function onSliderMouseDown2(e) {
    e.preventDefault();
    var _containerRef$current = containerRef.current.getBoundingClientRect(), width = _containerRef$current.width, height = _containerRef$current.height, left = _containerRef$current.left, top = _containerRef$current.top, bottom = _containerRef$current.bottom, right = _containerRef$current.right;
    var clientX = e.clientX, clientY = e.clientY;
    var percent;
    switch (direction) {
      case "btt":
        percent = (bottom - clientY) / height;
        break;
      case "ttb":
        percent = (clientY - top) / height;
        break;
      case "rtl":
        percent = (right - clientX) / width;
        break;
      default:
        percent = (clientX - left) / width;
    }
    var nextValue = mergedMin + percent * (mergedMax - mergedMin);
    changeToCloseValue(formatValue(nextValue), e);
  };
  var _React$useState = reactExports.useState(null), _React$useState2 = _slicedToArray(_React$useState, 2), keyboardValue = _React$useState2[0], setKeyboardValue = _React$useState2[1];
  var onHandleOffsetChange = function onHandleOffsetChange2(offset, valueIndex) {
    if (!disabled) {
      var next = offsetValues(rawValues, offset, valueIndex);
      onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(getTriggerValue(rawValues));
      triggerChange(next.values);
      setKeyboardValue(next.value);
    }
  };
  reactExports.useEffect(function() {
    if (keyboardValue !== null) {
      var valueIndex = rawValues.indexOf(keyboardValue);
      if (valueIndex >= 0) {
        handlesRef.current.focus(valueIndex);
      }
    }
    setKeyboardValue(null);
  }, [keyboardValue]);
  var mergedDraggableTrack = reactExports.useMemo(function() {
    if (rangeDraggableTrack && mergedStep === null) {
      return false;
    }
    return rangeDraggableTrack;
  }, [rangeDraggableTrack, mergedStep]);
  var onStartMove = useEvent(function(e, valueIndex) {
    onStartDrag(e, valueIndex);
    onBeforeChange === null || onBeforeChange === void 0 || onBeforeChange(getTriggerValue(rawValues));
  });
  var dragging = draggingIndex !== -1;
  reactExports.useEffect(function() {
    if (!dragging) {
      var valueIndex = rawValues.lastIndexOf(draggingValue);
      handlesRef.current.focus(valueIndex);
    }
  }, [dragging]);
  var sortedCacheValues = reactExports.useMemo(function() {
    return _toConsumableArray(cacheValues).sort(function(a, b) {
      return a - b;
    });
  }, [cacheValues]);
  var _React$useMemo = reactExports.useMemo(function() {
    if (!rangeEnabled) {
      return [mergedMin, sortedCacheValues[0]];
    }
    return [sortedCacheValues[0], sortedCacheValues[sortedCacheValues.length - 1]];
  }, [sortedCacheValues, rangeEnabled, mergedMin]), _React$useMemo2 = _slicedToArray(_React$useMemo, 2), includedStart = _React$useMemo2[0], includedEnd = _React$useMemo2[1];
  reactExports.useImperativeHandle(ref, function() {
    return {
      focus: function focus() {
        handlesRef.current.focus(0);
      },
      blur: function blur() {
        var _containerRef$current2;
        var _document = document, activeElement = _document.activeElement;
        if ((_containerRef$current2 = containerRef.current) !== null && _containerRef$current2 !== void 0 && _containerRef$current2.contains(activeElement)) {
          activeElement === null || activeElement === void 0 || activeElement.blur();
        }
      }
    };
  });
  reactExports.useEffect(function() {
    if (autoFocus) {
      handlesRef.current.focus(0);
    }
  }, []);
  var context = reactExports.useMemo(function() {
    return {
      min: mergedMin,
      max: mergedMax,
      direction,
      disabled,
      keyboard,
      step: mergedStep,
      included,
      includedStart,
      includedEnd,
      range: rangeEnabled,
      tabIndex,
      ariaLabelForHandle,
      ariaLabelledByForHandle,
      ariaRequired,
      ariaValueTextFormatterForHandle,
      styles: styles || {},
      classNames: classNames$1 || {}
    };
  }, [mergedMin, mergedMax, direction, disabled, keyboard, mergedStep, included, includedStart, includedEnd, rangeEnabled, tabIndex, ariaLabelForHandle, ariaLabelledByForHandle, ariaRequired, ariaValueTextFormatterForHandle, styles, classNames$1]);
  return /* @__PURE__ */ reactExports.createElement(SliderContext.Provider, {
    value: context
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ref: containerRef,
    className: classNames(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-vertical"), vertical), "".concat(prefixCls, "-horizontal"), !vertical), "".concat(prefixCls, "-with-marks"), markList.length)),
    style,
    onMouseDown: onSliderMouseDown,
    id
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames("".concat(prefixCls, "-rail"), classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.rail),
    style: _objectSpread2(_objectSpread2({}, railStyle), styles === null || styles === void 0 ? void 0 : styles.rail)
  }), track !== false && /* @__PURE__ */ reactExports.createElement(Tracks, {
    prefixCls,
    style: trackStyle,
    values: rawValues,
    startPoint,
    onStartMove: mergedDraggableTrack ? onStartMove : void 0
  }), /* @__PURE__ */ reactExports.createElement(Steps, {
    prefixCls,
    marks: markList,
    dots,
    style: dotStyle,
    activeStyle: activeDotStyle
  }), /* @__PURE__ */ reactExports.createElement(Handles, {
    ref: handlesRef,
    prefixCls,
    style: handleStyle,
    values: cacheValues,
    draggingIndex,
    draggingDelete,
    onStartMove,
    onOffsetChange: onHandleOffsetChange,
    onFocus,
    onBlur,
    handleRender,
    activeHandleRender,
    onChangeComplete: finishChange,
    onDelete: rangeEditable ? onDelete : void 0
  }), /* @__PURE__ */ reactExports.createElement(Marks, {
    prefixCls,
    marks: markList,
    onClick: changeToCloseValue
  })));
});
const SliderInternalContext = /* @__PURE__ */ reactExports.createContext({});
const SliderTooltip = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    open,
    draggingDelete,
    value
  } = props;
  const innerRef = reactExports.useRef(null);
  const mergedOpen = open && !draggingDelete;
  const rafRef = reactExports.useRef(null);
  function cancelKeepAlign() {
    wrapperRaf.cancel(rafRef.current);
    rafRef.current = null;
  }
  function keepAlign() {
    rafRef.current = wrapperRaf(() => {
      var _a;
      (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.forceAlign();
      rafRef.current = null;
    });
  }
  reactExports.useEffect(() => {
    if (mergedOpen) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }
    return cancelKeepAlign;
  }, [mergedOpen, props.title, value]);
  return /* @__PURE__ */ reactExports.createElement(Tooltip, Object.assign({
    ref: composeRef(innerRef, ref)
  }, props, {
    open: mergedOpen
  }));
});
const genBaseStyle = (token) => {
  const {
    componentCls,
    antCls,
    controlSize,
    dotSize,
    marginFull,
    marginPart,
    colorFillContentHover,
    handleColorDisabled,
    calc,
    handleSize,
    handleSizeHover,
    handleActiveColor,
    handleActiveOutlineColor,
    handleLineWidth,
    handleLineWidthHover,
    motionDurationMid
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      position: "relative",
      height: controlSize,
      margin: `${unit(marginPart)} ${unit(marginFull)}`,
      padding: 0,
      cursor: "pointer",
      touchAction: "none",
      "&-vertical": {
        margin: `${unit(marginFull)} ${unit(marginPart)}`
      },
      [`${componentCls}-rail`]: {
        position: "absolute",
        backgroundColor: token.railBg,
        borderRadius: token.borderRadiusXS,
        transition: `background-color ${motionDurationMid}`
      },
      [`${componentCls}-track,${componentCls}-tracks`]: {
        position: "absolute",
        transition: `background-color ${motionDurationMid}`
      },
      [`${componentCls}-track`]: {
        backgroundColor: token.trackBg,
        borderRadius: token.borderRadiusXS
      },
      [`${componentCls}-track-draggable`]: {
        boxSizing: "content-box",
        backgroundClip: "content-box",
        border: "solid rgba(0,0,0,0)"
      },
      "&:hover": {
        [`${componentCls}-rail`]: {
          backgroundColor: token.railHoverBg
        },
        [`${componentCls}-track`]: {
          backgroundColor: token.trackHoverBg
        },
        [`${componentCls}-dot`]: {
          borderColor: colorFillContentHover
        },
        [`${componentCls}-handle::after`]: {
          boxShadow: `0 0 0 ${unit(handleLineWidth)} ${token.colorPrimaryBorderHover}`
        },
        [`${componentCls}-dot-active`]: {
          borderColor: token.dotActiveBorderColor
        }
      },
      [`${componentCls}-handle`]: {
        position: "absolute",
        width: handleSize,
        height: handleSize,
        outline: "none",
        userSelect: "none",
        // Dragging status
        "&-dragging-delete": {
          opacity: 0
        },
        // 扩大选区
        "&::before": {
          content: '""',
          position: "absolute",
          insetInlineStart: calc(handleLineWidth).mul(-1).equal(),
          insetBlockStart: calc(handleLineWidth).mul(-1).equal(),
          width: calc(handleSize).add(calc(handleLineWidth).mul(2)).equal(),
          height: calc(handleSize).add(calc(handleLineWidth).mul(2)).equal(),
          backgroundColor: "transparent"
        },
        "&::after": {
          content: '""',
          position: "absolute",
          insetBlockStart: 0,
          insetInlineStart: 0,
          width: handleSize,
          height: handleSize,
          backgroundColor: token.colorBgElevated,
          boxShadow: `0 0 0 ${unit(handleLineWidth)} ${token.handleColor}`,
          outline: `0px solid transparent`,
          borderRadius: "50%",
          cursor: "pointer",
          transition: `
            inset-inline-start ${motionDurationMid},
            inset-block-start ${motionDurationMid},
            width ${motionDurationMid},
            height ${motionDurationMid},
            box-shadow ${motionDurationMid},
            outline ${motionDurationMid}
          `
        },
        "&:hover, &:active, &:focus": {
          "&::before": {
            insetInlineStart: calc(handleSizeHover).sub(handleSize).div(2).add(handleLineWidthHover).mul(-1).equal(),
            insetBlockStart: calc(handleSizeHover).sub(handleSize).div(2).add(handleLineWidthHover).mul(-1).equal(),
            width: calc(handleSizeHover).add(calc(handleLineWidthHover).mul(2)).equal(),
            height: calc(handleSizeHover).add(calc(handleLineWidthHover).mul(2)).equal()
          },
          "&::after": {
            boxShadow: `0 0 0 ${unit(handleLineWidthHover)} ${handleActiveColor}`,
            outline: `6px solid ${handleActiveOutlineColor}`,
            width: handleSizeHover,
            height: handleSizeHover,
            insetInlineStart: token.calc(handleSize).sub(handleSizeHover).div(2).equal(),
            insetBlockStart: token.calc(handleSize).sub(handleSizeHover).div(2).equal()
          }
        }
      },
      [`&-lock ${componentCls}-handle`]: {
        "&::before, &::after": {
          transition: "none"
        }
      },
      [`${componentCls}-mark`]: {
        position: "absolute",
        fontSize: token.fontSize
      },
      [`${componentCls}-mark-text`]: {
        position: "absolute",
        display: "inline-block",
        color: token.colorTextDescription,
        textAlign: "center",
        wordBreak: "keep-all",
        cursor: "pointer",
        userSelect: "none",
        "&-active": {
          color: token.colorText
        }
      },
      [`${componentCls}-step`]: {
        position: "absolute",
        background: "transparent",
        pointerEvents: "none"
      },
      [`${componentCls}-dot`]: {
        position: "absolute",
        width: dotSize,
        height: dotSize,
        backgroundColor: token.colorBgElevated,
        border: `${unit(handleLineWidth)} solid ${token.dotBorderColor}`,
        borderRadius: "50%",
        cursor: "pointer",
        transition: `border-color ${token.motionDurationSlow}`,
        pointerEvents: "auto",
        "&-active": {
          borderColor: token.dotActiveBorderColor
        }
      },
      [`&${componentCls}-disabled`]: {
        cursor: "not-allowed",
        [`${componentCls}-rail`]: {
          backgroundColor: `${token.railBg} !important`
        },
        [`${componentCls}-track`]: {
          backgroundColor: `${token.trackBgDisabled} !important`
        },
        [`
          ${componentCls}-dot
        `]: {
          backgroundColor: token.colorBgElevated,
          borderColor: token.trackBgDisabled,
          boxShadow: "none",
          cursor: "not-allowed"
        },
        [`${componentCls}-handle::after`]: {
          backgroundColor: token.colorBgElevated,
          cursor: "not-allowed",
          width: handleSize,
          height: handleSize,
          boxShadow: `0 0 0 ${unit(handleLineWidth)} ${handleColorDisabled}`,
          insetInlineStart: 0,
          insetBlockStart: 0
        },
        [`
          ${componentCls}-mark-text,
          ${componentCls}-dot
        `]: {
          cursor: `not-allowed !important`
        }
      },
      [`&-tooltip ${antCls}-tooltip-inner`]: {
        minWidth: "unset"
      }
    })
  };
};
const genDirectionStyle = (token, horizontal) => {
  const {
    componentCls,
    railSize,
    handleSize,
    dotSize,
    marginFull,
    calc
  } = token;
  const railPadding = horizontal ? "paddingBlock" : "paddingInline";
  const full = horizontal ? "width" : "height";
  const part = horizontal ? "height" : "width";
  const handlePos = horizontal ? "insetBlockStart" : "insetInlineStart";
  const markInset = horizontal ? "top" : "insetInlineStart";
  const handlePosSize = calc(railSize).mul(3).sub(handleSize).div(2).equal();
  const draggableBorderSize = calc(handleSize).sub(railSize).div(2).equal();
  const draggableBorder = horizontal ? {
    borderWidth: `${unit(draggableBorderSize)} 0`,
    transform: `translateY(${unit(calc(draggableBorderSize).mul(-1).equal())})`
  } : {
    borderWidth: `0 ${unit(draggableBorderSize)}`,
    transform: `translateX(${unit(token.calc(draggableBorderSize).mul(-1).equal())})`
  };
  return {
    [railPadding]: railSize,
    [part]: calc(railSize).mul(3).equal(),
    [`${componentCls}-rail`]: {
      [full]: "100%",
      [part]: railSize
    },
    [`${componentCls}-track,${componentCls}-tracks`]: {
      [part]: railSize
    },
    [`${componentCls}-track-draggable`]: Object.assign({}, draggableBorder),
    [`${componentCls}-handle`]: {
      [handlePos]: handlePosSize
    },
    [`${componentCls}-mark`]: {
      // Reset all
      insetInlineStart: 0,
      top: 0,
      // https://github.com/ant-design/ant-design/issues/43731
      [markInset]: calc(railSize).mul(3).add(horizontal ? 0 : marginFull).equal(),
      [full]: "100%"
    },
    [`${componentCls}-step`]: {
      // Reset all
      insetInlineStart: 0,
      top: 0,
      [markInset]: railSize,
      [full]: "100%",
      [part]: railSize
    },
    [`${componentCls}-dot`]: {
      position: "absolute",
      [handlePos]: calc(railSize).sub(dotSize).div(2).equal()
    }
  };
};
const genHorizontalStyle = (token) => {
  const {
    componentCls,
    marginPartWithMark
  } = token;
  return {
    [`${componentCls}-horizontal`]: Object.assign(Object.assign({}, genDirectionStyle(token, true)), {
      [`&${componentCls}-with-marks`]: {
        marginBottom: marginPartWithMark
      }
    })
  };
};
const genVerticalStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-vertical`]: Object.assign(Object.assign({}, genDirectionStyle(token, false)), {
      height: "100%"
    })
  };
};
const prepareComponentToken = (token) => {
  const increaseHandleWidth = 1;
  const controlSize = token.controlHeightLG / 4;
  const controlSizeHover = token.controlHeightSM / 2;
  const handleLineWidth = token.lineWidth + increaseHandleWidth;
  const handleLineWidthHover = token.lineWidth + increaseHandleWidth * 1.5;
  const handleActiveColor = token.colorPrimary;
  const handleActiveOutlineColor = new FastColor(handleActiveColor).setA(0.2).toRgbString();
  return {
    controlSize,
    railSize: 4,
    handleSize: controlSize,
    handleSizeHover: controlSizeHover,
    dotSize: 8,
    handleLineWidth,
    handleLineWidthHover,
    railBg: token.colorFillTertiary,
    railHoverBg: token.colorFillSecondary,
    trackBg: token.colorPrimaryBorder,
    trackHoverBg: token.colorPrimaryBorderHover,
    handleColor: token.colorPrimaryBorder,
    handleActiveColor,
    handleActiveOutlineColor,
    handleColorDisabled: new FastColor(token.colorTextDisabled).onBackground(token.colorBgContainer).toHexString(),
    dotBorderColor: token.colorBorderSecondary,
    dotActiveBorderColor: token.colorPrimaryBorder,
    trackBgDisabled: token.colorBgContainerDisabled
  };
};
const useStyle$1 = genStyleHooks("Slider", (token) => {
  const sliderToken = merge(token, {
    marginPart: token.calc(token.controlHeight).sub(token.controlSize).div(2).equal(),
    marginFull: token.calc(token.controlSize).div(2).equal(),
    marginPartWithMark: token.calc(token.controlHeightLG).sub(token.controlSize).equal()
  });
  return [genBaseStyle(sliderToken), genHorizontalStyle(sliderToken), genVerticalStyle(sliderToken)];
}, prepareComponentToken);
function useRafLock() {
  const [state, setState] = reactExports.useState(false);
  const rafRef = reactExports.useRef(null);
  const cleanup = () => {
    wrapperRaf.cancel(rafRef.current);
  };
  const setDelayState = (nextState) => {
    cleanup();
    if (nextState) {
      setState(nextState);
    } else {
      rafRef.current = wrapperRaf(() => {
        setState(nextState);
      });
    }
  };
  reactExports.useEffect(() => cleanup, []);
  return [state, setDelayState];
}
var __rest$4 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function getTipFormatter(tipFormatter, legacyTipFormatter) {
  if (tipFormatter || tipFormatter === null) {
    return tipFormatter;
  }
  if (legacyTipFormatter || legacyTipFormatter === null) {
    return legacyTipFormatter;
  }
  return (val) => typeof val === "number" ? val.toString() : "";
}
const Slider2 = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    range,
    className,
    rootClassName,
    style,
    disabled,
    // Deprecated Props
    tooltipPrefixCls: legacyTooltipPrefixCls,
    tipFormatter: legacyTipFormatter,
    tooltipVisible: legacyTooltipVisible,
    getTooltipPopupContainer: legacyGetTooltipPopupContainer,
    tooltipPlacement: legacyTooltipPlacement,
    tooltip = {},
    onChangeComplete,
    classNames: sliderClassNames,
    styles
  } = props, restProps = __rest$4(props, ["prefixCls", "range", "className", "rootClassName", "style", "disabled", "tooltipPrefixCls", "tipFormatter", "tooltipVisible", "getTooltipPopupContainer", "tooltipPlacement", "tooltip", "onChangeComplete", "classNames", "styles"]);
  const {
    vertical
  } = props;
  const {
    getPrefixCls,
    direction: contextDirection,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    getPopupContainer
  } = useComponentConfig("slider");
  const contextDisabled = React.useContext(DisabledContext);
  const mergedDisabled = disabled !== null && disabled !== void 0 ? disabled : contextDisabled;
  const {
    handleRender: contextHandleRender,
    direction: internalContextDirection
  } = React.useContext(SliderInternalContext);
  const mergedDirection = internalContextDirection || contextDirection;
  const isRTL = mergedDirection === "rtl";
  const [hoverOpen, setHoverOpen] = useRafLock();
  const [focusOpen, setFocusOpen] = useRafLock();
  const tooltipProps = Object.assign({}, tooltip);
  const {
    open: tooltipOpen,
    placement: tooltipPlacement,
    getPopupContainer: getTooltipPopupContainer,
    prefixCls: customizeTooltipPrefixCls,
    formatter: tipFormatter
  } = tooltipProps;
  const lockOpen = tooltipOpen !== null && tooltipOpen !== void 0 ? tooltipOpen : legacyTooltipVisible;
  const activeOpen = (hoverOpen || focusOpen) && lockOpen !== false;
  const mergedTipFormatter = getTipFormatter(tipFormatter, legacyTipFormatter);
  const [dragging, setDragging] = useRafLock();
  const onInternalChangeComplete = (nextValues) => {
    onChangeComplete === null || onChangeComplete === void 0 ? void 0 : onChangeComplete(nextValues);
    setDragging(false);
  };
  const getTooltipPlacement = (placement, vert) => {
    if (placement) {
      return placement;
    }
    if (!vert) {
      return "top";
    }
    return isRTL ? "left" : "right";
  };
  const prefixCls = getPrefixCls("slider", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$1(prefixCls);
  const rootClassNames = classNames(className, contextClassName, contextClassNames.root, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.root, rootClassName, {
    [`${prefixCls}-rtl`]: isRTL,
    [`${prefixCls}-lock`]: dragging
  }, hashId, cssVarCls);
  if (isRTL && !restProps.vertical) {
    restProps.reverse = !restProps.reverse;
  }
  React.useEffect(() => {
    const onMouseUp = () => {
      wrapperRaf(() => {
        setFocusOpen(false);
      }, 1);
    };
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);
  const useActiveTooltipHandle = range && !lockOpen;
  const handleRender = contextHandleRender || ((node, info) => {
    const {
      index
    } = info;
    const nodeProps = node.props;
    function proxyEvent(eventName, event, triggerRestPropsEvent) {
      var _a, _b, _c, _d;
      if (triggerRestPropsEvent) {
        (_b = (_a = restProps)[eventName]) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      }
      (_d = (_c = nodeProps)[eventName]) === null || _d === void 0 ? void 0 : _d.call(_c, event);
    }
    const passedProps = Object.assign(Object.assign({}, nodeProps), {
      onMouseEnter: (e) => {
        setHoverOpen(true);
        proxyEvent("onMouseEnter", e);
      },
      onMouseLeave: (e) => {
        setHoverOpen(false);
        proxyEvent("onMouseLeave", e);
      },
      onMouseDown: (e) => {
        setFocusOpen(true);
        setDragging(true);
        proxyEvent("onMouseDown", e);
      },
      onFocus: (e) => {
        var _a;
        setFocusOpen(true);
        (_a = restProps.onFocus) === null || _a === void 0 ? void 0 : _a.call(restProps, e);
        proxyEvent("onFocus", e, true);
      },
      onBlur: (e) => {
        var _a;
        setFocusOpen(false);
        (_a = restProps.onBlur) === null || _a === void 0 ? void 0 : _a.call(restProps, e);
        proxyEvent("onBlur", e, true);
      }
    });
    const cloneNode = /* @__PURE__ */ React.cloneElement(node, passedProps);
    const open = (!!lockOpen || activeOpen) && mergedTipFormatter !== null;
    if (!useActiveTooltipHandle) {
      return /* @__PURE__ */ React.createElement(SliderTooltip, Object.assign({}, tooltipProps, {
        prefixCls: getPrefixCls("tooltip", customizeTooltipPrefixCls !== null && customizeTooltipPrefixCls !== void 0 ? customizeTooltipPrefixCls : legacyTooltipPrefixCls),
        title: mergedTipFormatter ? mergedTipFormatter(info.value) : "",
        value: info.value,
        open,
        placement: getTooltipPlacement(tooltipPlacement !== null && tooltipPlacement !== void 0 ? tooltipPlacement : legacyTooltipPlacement, vertical),
        key: index,
        classNames: {
          root: `${prefixCls}-tooltip`
        },
        getPopupContainer: getTooltipPopupContainer || legacyGetTooltipPopupContainer || getPopupContainer
      }), cloneNode);
    }
    return cloneNode;
  });
  const activeHandleRender = useActiveTooltipHandle ? (handle, info) => {
    const cloneNode = /* @__PURE__ */ React.cloneElement(handle, {
      style: Object.assign(Object.assign({}, handle.props.style), {
        visibility: "hidden"
      })
    });
    return /* @__PURE__ */ React.createElement(SliderTooltip, Object.assign({}, tooltipProps, {
      prefixCls: getPrefixCls("tooltip", customizeTooltipPrefixCls !== null && customizeTooltipPrefixCls !== void 0 ? customizeTooltipPrefixCls : legacyTooltipPrefixCls),
      title: mergedTipFormatter ? mergedTipFormatter(info.value) : "",
      open: mergedTipFormatter !== null && activeOpen,
      placement: getTooltipPlacement(tooltipPlacement !== null && tooltipPlacement !== void 0 ? tooltipPlacement : legacyTooltipPlacement, vertical),
      key: "tooltip",
      classNames: {
        root: `${prefixCls}-tooltip`
      },
      getPopupContainer: getTooltipPopupContainer || legacyGetTooltipPopupContainer || getPopupContainer,
      draggingDelete: info.draggingDelete
    }), cloneNode);
  } : void 0;
  const rootStyle = Object.assign(Object.assign(Object.assign(Object.assign({}, contextStyles.root), contextStyle), styles === null || styles === void 0 ? void 0 : styles.root), style);
  const mergedTracks = Object.assign(Object.assign({}, contextStyles.tracks), styles === null || styles === void 0 ? void 0 : styles.tracks);
  const mergedTracksClassNames = classNames(contextClassNames.tracks, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.tracks);
  return wrapCSSVar(
    // @ts-ignore
    /* @__PURE__ */ React.createElement(Slider$1, Object.assign({}, restProps, {
      classNames: Object.assign({
        handle: classNames(contextClassNames.handle, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.handle),
        rail: classNames(contextClassNames.rail, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.rail),
        track: classNames(contextClassNames.track, sliderClassNames === null || sliderClassNames === void 0 ? void 0 : sliderClassNames.track)
      }, mergedTracksClassNames ? {
        tracks: mergedTracksClassNames
      } : {}),
      styles: Object.assign({
        handle: Object.assign(Object.assign({}, contextStyles.handle), styles === null || styles === void 0 ? void 0 : styles.handle),
        rail: Object.assign(Object.assign({}, contextStyles.rail), styles === null || styles === void 0 ? void 0 : styles.rail),
        track: Object.assign(Object.assign({}, contextStyles.track), styles === null || styles === void 0 ? void 0 : styles.track)
      }, Object.keys(mergedTracks).length ? {
        tracks: mergedTracks
      } : {}),
      step: restProps.step,
      range,
      className: rootClassNames,
      style: rootStyle,
      disabled: mergedDisabled,
      ref,
      prefixCls,
      handleRender,
      activeHandleRender,
      onChangeComplete: onInternalChangeComplete
    }))
  );
});
var __rest$3 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const GradientColorSlider = (props) => {
  const {
    prefixCls,
    colors,
    type,
    color,
    range = false,
    className,
    activeIndex,
    onActive,
    onDragStart,
    onDragChange,
    onKeyDelete
  } = props, restProps = __rest$3(props, ["prefixCls", "colors", "type", "color", "range", "className", "activeIndex", "onActive", "onDragStart", "onDragChange", "onKeyDelete"]);
  const sliderProps = Object.assign(Object.assign({}, restProps), {
    track: false
  });
  const linearCss = reactExports.useMemo(() => {
    const colorsStr = colors.map((c) => `${c.color} ${c.percent}%`).join(", ");
    return `linear-gradient(90deg, ${colorsStr})`;
  }, [colors]);
  const pointColor = reactExports.useMemo(() => {
    if (!color || !type) {
      return null;
    }
    if (type === "alpha") {
      return color.toRgbString();
    }
    return `hsl(${color.toHsb().h}, 100%, 50%)`;
  }, [color, type]);
  const onInternalDragStart = useEvent(onDragStart);
  const onInternalDragChange = useEvent(onDragChange);
  const unstableContext = reactExports.useMemo(() => ({
    onDragStart: onInternalDragStart,
    onDragChange: onInternalDragChange
  }), []);
  const handleRender = useEvent((ori, info) => {
    const {
      onFocus,
      style,
      className: handleCls,
      onKeyDown
    } = ori.props;
    const mergedStyle = Object.assign({}, style);
    if (type === "gradient") {
      mergedStyle.background = getGradientPercentColor(colors, info.value);
    }
    return /* @__PURE__ */ reactExports.cloneElement(ori, {
      onFocus: (e) => {
        onActive === null || onActive === void 0 ? void 0 : onActive(info.index);
        onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
      },
      style: mergedStyle,
      className: classNames(handleCls, {
        [`${prefixCls}-slider-handle-active`]: activeIndex === info.index
      }),
      onKeyDown: (e) => {
        if ((e.key === "Delete" || e.key === "Backspace") && onKeyDelete) {
          onKeyDelete(info.index);
        }
        onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
      }
    });
  });
  const sliderContext = reactExports.useMemo(() => ({
    direction: "ltr",
    handleRender
  }), []);
  return /* @__PURE__ */ reactExports.createElement(SliderInternalContext.Provider, {
    value: sliderContext
  }, /* @__PURE__ */ reactExports.createElement(UnstableContext.Provider, {
    value: unstableContext
  }, /* @__PURE__ */ reactExports.createElement(Slider2, Object.assign({}, sliderProps, {
    className: classNames(className, `${prefixCls}-slider`),
    tooltip: {
      open: false
    },
    range: {
      editable: range,
      minCount: 2
    },
    styles: {
      rail: {
        background: linearCss
      },
      handle: pointColor ? {
        background: pointColor
      } : {}
    },
    classNames: {
      rail: `${prefixCls}-slider-rail`,
      handle: `${prefixCls}-slider-handle`
    }
  }))));
};
const SingleColorSlider = (props) => {
  const {
    value,
    onChange,
    onChangeComplete
  } = props;
  const singleOnChange = (v) => onChange(v[0]);
  const singleOnChangeComplete = (v) => onChangeComplete(v[0]);
  return /* @__PURE__ */ reactExports.createElement(GradientColorSlider, Object.assign({}, props, {
    value: [value],
    onChange: singleOnChange,
    onChangeComplete: singleOnChangeComplete
  }));
};
function sortColors(colors) {
  return _toConsumableArray(colors).sort((a, b) => a.percent - b.percent);
}
const GradientColorBar = (props) => {
  const {
    prefixCls,
    mode,
    onChange,
    onChangeComplete,
    onActive,
    activeIndex,
    onGradientDragging,
    colors
  } = props;
  const isGradient = mode === "gradient";
  const colorList = reactExports.useMemo(() => colors.map((info) => ({
    percent: info.percent,
    color: info.color.toRgbString()
  })), [colors]);
  const values = reactExports.useMemo(() => colorList.map((info) => info.percent), [colorList]);
  const colorsRef = reactExports.useRef(colorList);
  const onDragStart = ({
    rawValues,
    draggingIndex,
    draggingValue
  }) => {
    if (rawValues.length > colorList.length) {
      const newPointColor = getGradientPercentColor(colorList, draggingValue);
      const nextColors = _toConsumableArray(colorList);
      nextColors.splice(draggingIndex, 0, {
        percent: draggingValue,
        color: newPointColor
      });
      colorsRef.current = nextColors;
    } else {
      colorsRef.current = colorList;
    }
    onGradientDragging(true);
    onChange(new AggregationColor(sortColors(colorsRef.current)), true);
  };
  const onDragChange = ({
    deleteIndex,
    draggingIndex,
    draggingValue
  }) => {
    let nextColors = _toConsumableArray(colorsRef.current);
    if (deleteIndex !== -1) {
      nextColors.splice(deleteIndex, 1);
    } else {
      nextColors[draggingIndex] = Object.assign(Object.assign({}, nextColors[draggingIndex]), {
        percent: draggingValue
      });
      nextColors = sortColors(nextColors);
    }
    onChange(new AggregationColor(nextColors), true);
  };
  const onKeyDelete = (index) => {
    const nextColors = _toConsumableArray(colorList);
    nextColors.splice(index, 1);
    const nextColor = new AggregationColor(nextColors);
    onChange(nextColor);
    onChangeComplete(nextColor);
  };
  const onInternalChangeComplete = (nextValues) => {
    onChangeComplete(new AggregationColor(colorList));
    if (activeIndex >= nextValues.length) {
      onActive(nextValues.length - 1);
    }
    onGradientDragging(false);
  };
  if (!isGradient) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(GradientColorSlider, {
    min: 0,
    max: 100,
    prefixCls,
    className: `${prefixCls}-gradient-slider`,
    colors: colorList,
    color: null,
    value: values,
    range: true,
    onChangeComplete: onInternalChangeComplete,
    disabled: false,
    type: "gradient",
    // Active
    activeIndex,
    onActive,
    // Drag
    onDragStart,
    onDragChange,
    onKeyDelete
  });
};
const GradientColorBar$1 = /* @__PURE__ */ reactExports.memo(GradientColorBar);
var __rest$2 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const components = {
  slider: SingleColorSlider
};
const PanelPicker = () => {
  const panelPickerContext = reactExports.useContext(PanelPickerContext);
  const {
    mode,
    onModeChange,
    modeOptions,
    prefixCls,
    allowClear,
    value,
    disabledAlpha,
    onChange,
    onClear,
    onChangeComplete,
    activeIndex,
    gradientDragging
  } = panelPickerContext, injectProps = __rest$2(panelPickerContext, ["mode", "onModeChange", "modeOptions", "prefixCls", "allowClear", "value", "disabledAlpha", "onChange", "onClear", "onChangeComplete", "activeIndex", "gradientDragging"]);
  const colors = React.useMemo(() => {
    if (!value.cleared) {
      return value.getColors();
    }
    return [{
      percent: 0,
      color: new AggregationColor("")
    }, {
      percent: 100,
      color: new AggregationColor("")
    }];
  }, [value]);
  const isSingle = !value.isGradient();
  const [lockedColor, setLockedColor] = React.useState(value);
  useLayoutEffect(() => {
    var _a;
    if (!isSingle) {
      setLockedColor((_a = colors[activeIndex]) === null || _a === void 0 ? void 0 : _a.color);
    }
  }, [isSingle, colors, gradientDragging, activeIndex]);
  const activeColor = React.useMemo(() => {
    var _a;
    if (isSingle) {
      return value;
    }
    if (gradientDragging) {
      return lockedColor;
    }
    return (_a = colors[activeIndex]) === null || _a === void 0 ? void 0 : _a.color;
  }, [colors, value, activeIndex, isSingle, lockedColor, gradientDragging]);
  const [pickerColor, setPickerColor] = React.useState(activeColor);
  const [forceSync, setForceSync] = useForceUpdate();
  const mergedPickerColor = (pickerColor === null || pickerColor === void 0 ? void 0 : pickerColor.equals(activeColor)) ? activeColor : pickerColor;
  useLayoutEffect(() => {
    setPickerColor(activeColor);
  }, [forceSync, activeColor === null || activeColor === void 0 ? void 0 : activeColor.toHexString()]);
  const fillColor = (nextColor, info) => {
    let submitColor = generateColor$1(nextColor);
    if (value.cleared) {
      const rgb = submitColor.toRgb();
      if (!rgb.r && !rgb.g && !rgb.b && info) {
        const {
          type: infoType,
          value: infoValue = 0
        } = info;
        submitColor = new AggregationColor({
          h: infoType === "hue" ? infoValue : 0,
          s: 1,
          b: 1,
          a: infoType === "alpha" ? infoValue / 100 : 1
        });
      } else {
        submitColor = genAlphaColor(submitColor);
      }
    }
    if (mode === "single") {
      return submitColor;
    }
    const nextColors = _toConsumableArray(colors);
    nextColors[activeIndex] = Object.assign(Object.assign({}, nextColors[activeIndex]), {
      color: submitColor
    });
    return new AggregationColor(nextColors);
  };
  const onPickerChange = (colorValue, fromPicker, info) => {
    const nextColor = fillColor(colorValue, info);
    setPickerColor(nextColor.isGradient() ? nextColor.getColors()[activeIndex].color : nextColor);
    onChange(nextColor, fromPicker);
  };
  const onInternalChangeComplete = (nextColor, info) => {
    onChangeComplete(fillColor(nextColor, info));
    setForceSync();
  };
  const onInputChange = (colorValue) => {
    onChange(fillColor(colorValue));
  };
  let operationNode = null;
  const showMode = modeOptions.length > 1;
  if (allowClear || showMode) {
    operationNode = /* @__PURE__ */ React.createElement("div", {
      className: `${prefixCls}-operation`
    }, showMode && /* @__PURE__ */ React.createElement(Segmented, {
      size: "small",
      options: modeOptions,
      value: mode,
      onChange: onModeChange
    }), /* @__PURE__ */ React.createElement(ColorClear, Object.assign({
      prefixCls,
      value,
      onChange: (clearColor) => {
        onChange(clearColor);
        onClear === null || onClear === void 0 ? void 0 : onClear();
      }
    }, injectProps)));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, operationNode, /* @__PURE__ */ React.createElement(GradientColorBar$1, Object.assign({}, panelPickerContext, {
    colors
  })), /* @__PURE__ */ React.createElement(ColorPicker$1, {
    prefixCls,
    value: mergedPickerColor === null || mergedPickerColor === void 0 ? void 0 : mergedPickerColor.toHsb(),
    disabledAlpha,
    onChange: (colorValue, info) => {
      onPickerChange(colorValue, true, info);
    },
    onChangeComplete: (colorValue, info) => {
      onInternalChangeComplete(colorValue, info);
    },
    components
  }), /* @__PURE__ */ React.createElement(ColorInput, Object.assign({
    value: activeColor,
    onChange: onInputChange,
    prefixCls,
    disabledAlpha
  }, injectProps)));
};
const PanelPresets = () => {
  const {
    prefixCls,
    value,
    presets,
    onChange
  } = reactExports.useContext(PanelPresetsContext);
  return Array.isArray(presets) ? /* @__PURE__ */ React.createElement(ColorPresets, {
    value,
    presets,
    prefixCls,
    onChange
  }) : null;
};
const ColorPickerPanel = (props) => {
  const {
    prefixCls,
    presets,
    panelRender,
    value,
    onChange,
    onClear,
    allowClear,
    disabledAlpha,
    mode,
    onModeChange,
    modeOptions,
    onChangeComplete,
    activeIndex,
    onActive,
    format,
    onFormatChange,
    gradientDragging,
    onGradientDragging,
    disabledFormat
  } = props;
  const colorPickerPanelPrefixCls = `${prefixCls}-inner`;
  const panelContext = React.useMemo(() => ({
    prefixCls,
    value,
    onChange,
    onClear,
    allowClear,
    disabledAlpha,
    mode,
    onModeChange,
    modeOptions,
    onChangeComplete,
    activeIndex,
    onActive,
    format,
    onFormatChange,
    gradientDragging,
    onGradientDragging,
    disabledFormat
  }), [prefixCls, value, onChange, onClear, allowClear, disabledAlpha, mode, onModeChange, modeOptions, onChangeComplete, activeIndex, onActive, format, onFormatChange, gradientDragging, onGradientDragging, disabledFormat]);
  const presetContext = React.useMemo(() => ({
    prefixCls,
    value,
    presets,
    onChange
  }), [prefixCls, value, presets, onChange]);
  const innerPanel = /* @__PURE__ */ React.createElement("div", {
    className: `${colorPickerPanelPrefixCls}-content`
  }, /* @__PURE__ */ React.createElement(PanelPicker, null), Array.isArray(presets) && /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(PanelPresets, null));
  return /* @__PURE__ */ React.createElement(PanelPickerContext.Provider, {
    value: panelContext
  }, /* @__PURE__ */ React.createElement(PanelPresetsContext.Provider, {
    value: presetContext
  }, /* @__PURE__ */ React.createElement("div", {
    className: colorPickerPanelPrefixCls
  }, typeof panelRender === "function" ? panelRender(innerPanel, {
    components: {
      Picker: PanelPicker,
      Presets: PanelPresets
    }
  }) : innerPanel)));
};
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const ColorTrigger = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    color,
    prefixCls,
    open,
    disabled,
    format,
    className,
    showText,
    activeIndex
  } = props, rest = __rest$1(props, ["color", "prefixCls", "open", "disabled", "format", "className", "showText", "activeIndex"]);
  const colorTriggerPrefixCls = `${prefixCls}-trigger`;
  const colorTextPrefixCls = `${colorTriggerPrefixCls}-text`;
  const colorTextCellPrefixCls = `${colorTextPrefixCls}-cell`;
  const [locale] = useLocale("ColorPicker");
  const desc = React.useMemo(() => {
    if (!showText) {
      return "";
    }
    if (typeof showText === "function") {
      return showText(color);
    }
    if (color.cleared) {
      return locale.transparent;
    }
    if (color.isGradient()) {
      return color.getColors().map((c, index) => {
        const inactive = activeIndex !== -1 && activeIndex !== index;
        return /* @__PURE__ */ React.createElement("span", {
          key: index,
          className: classNames(colorTextCellPrefixCls, inactive && `${colorTextCellPrefixCls}-inactive`)
        }, c.color.toRgbString(), " ", c.percent, "%");
      });
    }
    const hexString = color.toHexString().toUpperCase();
    const alpha = getColorAlpha(color);
    switch (format) {
      case "rgb":
        return color.toRgbString();
      case "hsb":
        return color.toHsbString();
      default:
        return alpha < 100 ? `${hexString.slice(0, 7)},${alpha}%` : hexString;
    }
  }, [color, format, showText, activeIndex, locale.transparent, colorTextCellPrefixCls]);
  const containerNode = reactExports.useMemo(() => color.cleared ? /* @__PURE__ */ React.createElement(ColorClear, {
    prefixCls
  }) : /* @__PURE__ */ React.createElement(ColorBlock, {
    prefixCls,
    color: color.toCssString()
  }), [color, prefixCls]);
  return /* @__PURE__ */ React.createElement("div", Object.assign({
    ref,
    className: classNames(colorTriggerPrefixCls, className, {
      [`${colorTriggerPrefixCls}-active`]: open,
      [`${colorTriggerPrefixCls}-disabled`]: disabled
    })
  }, pickAttrs(rest)), containerNode, showText && /* @__PURE__ */ React.createElement("div", {
    className: colorTextPrefixCls
  }, desc));
});
function useModeColor(defaultValue, value, mode) {
  const [locale] = useLocale("ColorPicker");
  const [mergedColor, setMergedColor] = useMergedState(defaultValue, {
    value
  });
  const [modeState, setModeState] = reactExports.useState("single");
  const [modeOptionList, modeSet] = reactExports.useMemo(() => {
    const list = (Array.isArray(mode) ? mode : [mode]).filter((m) => m);
    if (!list.length) {
      list.push("single");
    }
    const modes = new Set(list);
    const optionList = [];
    const pushOption = (modeType, localeTxt) => {
      if (modes.has(modeType)) {
        optionList.push({
          label: localeTxt,
          value: modeType
        });
      }
    };
    pushOption("single", locale.singleColor);
    pushOption("gradient", locale.gradientColor);
    return [optionList, modes];
  }, [mode, locale.singleColor, locale.gradientColor]);
  const [cacheColor, setCacheColor] = reactExports.useState(null);
  const setColor = useEvent((nextColor) => {
    setCacheColor(nextColor);
    setMergedColor(nextColor);
  });
  const postColor = reactExports.useMemo(() => {
    const colorObj = generateColor$1(mergedColor || "");
    return colorObj.equals(cacheColor) ? cacheColor : colorObj;
  }, [mergedColor, cacheColor]);
  const postMode = reactExports.useMemo(() => {
    var _a;
    if (modeSet.has(modeState)) {
      return modeState;
    }
    return (_a = modeOptionList[0]) === null || _a === void 0 ? void 0 : _a.value;
  }, [modeSet, modeState, modeOptionList]);
  reactExports.useEffect(() => {
    setModeState(postColor.isGradient() ? "gradient" : "single");
  }, [postColor]);
  return [postColor, setColor, postMode, setModeState, modeOptionList];
}
const getTransBg = (size, colorFill) => ({
  backgroundImage: `conic-gradient(${colorFill} 25%, transparent 25% 50%, ${colorFill} 50% 75%, transparent 75% 100%)`,
  backgroundSize: `${size} ${size}`
});
const genColorBlockStyle = (token, size) => {
  const {
    componentCls,
    borderRadiusSM,
    colorPickerInsetShadow,
    lineWidth,
    colorFillSecondary
  } = token;
  return {
    [`${componentCls}-color-block`]: Object.assign(Object.assign({
      position: "relative",
      borderRadius: borderRadiusSM,
      width: size,
      height: size,
      boxShadow: colorPickerInsetShadow,
      flex: "none"
    }, getTransBg("50%", token.colorFillSecondary)), {
      [`${componentCls}-color-block-inner`]: {
        width: "100%",
        height: "100%",
        boxShadow: `inset 0 0 0 ${unit(lineWidth)} ${colorFillSecondary}`,
        borderRadius: "inherit"
      }
    })
  };
};
const genInputStyle = (token) => {
  const {
    componentCls,
    antCls,
    fontSizeSM,
    lineHeightSM,
    colorPickerAlphaInputWidth,
    marginXXS,
    paddingXXS,
    controlHeightSM,
    marginXS,
    fontSizeIcon,
    paddingXS,
    colorTextPlaceholder,
    colorPickerInputNumberHandleWidth,
    lineWidth
  } = token;
  return {
    [`${componentCls}-input-container`]: {
      display: "flex",
      [`${componentCls}-steppers${antCls}-input-number`]: {
        fontSize: fontSizeSM,
        lineHeight: lineHeightSM,
        [`${antCls}-input-number-input`]: {
          paddingInlineStart: paddingXXS,
          paddingInlineEnd: 0
        },
        [`${antCls}-input-number-handler-wrap`]: {
          width: colorPickerInputNumberHandleWidth
        }
      },
      [`${componentCls}-steppers${componentCls}-alpha-input`]: {
        flex: `0 0 ${unit(colorPickerAlphaInputWidth)}`,
        marginInlineStart: marginXXS
      },
      [`${componentCls}-format-select${antCls}-select`]: {
        marginInlineEnd: marginXS,
        width: "auto",
        "&-single": {
          [`${antCls}-select-selector`]: {
            padding: 0,
            border: 0
          },
          [`${antCls}-select-arrow`]: {
            insetInlineEnd: 0
          },
          [`${antCls}-select-selection-item`]: {
            paddingInlineEnd: token.calc(fontSizeIcon).add(marginXXS).equal(),
            fontSize: fontSizeSM,
            lineHeight: unit(controlHeightSM)
          },
          [`${antCls}-select-item-option-content`]: {
            fontSize: fontSizeSM,
            lineHeight: lineHeightSM
          },
          [`${antCls}-select-dropdown`]: {
            [`${antCls}-select-item`]: {
              minHeight: "auto"
            }
          }
        }
      },
      [`${componentCls}-input`]: {
        gap: marginXXS,
        alignItems: "center",
        flex: 1,
        width: 0,
        [`${componentCls}-hsb-input,${componentCls}-rgb-input`]: {
          display: "flex",
          gap: marginXXS,
          alignItems: "center"
        },
        [`${componentCls}-steppers`]: {
          flex: 1
        },
        [`${componentCls}-hex-input${antCls}-input-affix-wrapper`]: {
          flex: 1,
          padding: `0 ${unit(paddingXS)}`,
          [`${antCls}-input`]: {
            fontSize: fontSizeSM,
            textTransform: "uppercase",
            lineHeight: unit(token.calc(controlHeightSM).sub(token.calc(lineWidth).mul(2)).equal())
          },
          [`${antCls}-input-prefix`]: {
            color: colorTextPlaceholder
          }
        }
      }
    }
  };
};
const genPickerStyle = (token) => {
  const {
    componentCls,
    controlHeightLG,
    borderRadiusSM,
    colorPickerInsetShadow,
    marginSM,
    colorBgElevated,
    colorFillSecondary,
    lineWidthBold,
    colorPickerHandlerSize
  } = token;
  return {
    userSelect: "none",
    [`${componentCls}-select`]: {
      [`${componentCls}-palette`]: {
        minHeight: token.calc(controlHeightLG).mul(4).equal(),
        overflow: "hidden",
        borderRadius: borderRadiusSM
      },
      [`${componentCls}-saturation`]: {
        position: "absolute",
        borderRadius: "inherit",
        boxShadow: colorPickerInsetShadow,
        inset: 0
      },
      marginBottom: marginSM
    },
    // ======================== Panel =========================
    [`${componentCls}-handler`]: {
      width: colorPickerHandlerSize,
      height: colorPickerHandlerSize,
      border: `${unit(lineWidthBold)} solid ${colorBgElevated}`,
      position: "relative",
      borderRadius: "50%",
      cursor: "pointer",
      boxShadow: `${colorPickerInsetShadow}, 0 0 0 1px ${colorFillSecondary}`
    }
  };
};
const genPresetsStyle = (token) => {
  const {
    componentCls,
    antCls,
    colorTextQuaternary,
    paddingXXS,
    colorPickerPresetColorSize,
    fontSizeSM,
    colorText,
    lineHeightSM,
    lineWidth,
    borderRadius,
    colorFill,
    colorWhite,
    marginXXS,
    paddingXS,
    fontHeightSM
  } = token;
  return {
    [`${componentCls}-presets`]: {
      [`${antCls}-collapse-item > ${antCls}-collapse-header`]: {
        padding: 0,
        [`${antCls}-collapse-expand-icon`]: {
          height: fontHeightSM,
          color: colorTextQuaternary,
          paddingInlineEnd: paddingXXS
        }
      },
      [`${antCls}-collapse`]: {
        display: "flex",
        flexDirection: "column",
        gap: marginXXS
      },
      [`${antCls}-collapse-item > ${antCls}-collapse-content > ${antCls}-collapse-content-box`]: {
        padding: `${unit(paddingXS)} 0`
      },
      "&-label": {
        fontSize: fontSizeSM,
        color: colorText,
        lineHeight: lineHeightSM
      },
      "&-items": {
        display: "flex",
        flexWrap: "wrap",
        gap: token.calc(marginXXS).mul(1.5).equal(),
        [`${componentCls}-presets-color`]: {
          position: "relative",
          cursor: "pointer",
          width: colorPickerPresetColorSize,
          height: colorPickerPresetColorSize,
          "&::before": {
            content: '""',
            pointerEvents: "none",
            width: token.calc(colorPickerPresetColorSize).add(token.calc(lineWidth).mul(4)).equal(),
            height: token.calc(colorPickerPresetColorSize).add(token.calc(lineWidth).mul(4)).equal(),
            position: "absolute",
            top: token.calc(lineWidth).mul(-2).equal(),
            insetInlineStart: token.calc(lineWidth).mul(-2).equal(),
            borderRadius,
            border: `${unit(lineWidth)} solid transparent`,
            transition: `border-color ${token.motionDurationMid} ${token.motionEaseInBack}`
          },
          "&:hover::before": {
            borderColor: colorFill
          },
          "&::after": {
            boxSizing: "border-box",
            position: "absolute",
            top: "50%",
            insetInlineStart: "21.5%",
            display: "table",
            width: token.calc(colorPickerPresetColorSize).div(13).mul(5).equal(),
            height: token.calc(colorPickerPresetColorSize).div(13).mul(8).equal(),
            border: `${unit(token.lineWidthBold)} solid ${token.colorWhite}`,
            borderTop: 0,
            borderInlineStart: 0,
            transform: "rotate(45deg) scale(0) translate(-50%,-50%)",
            opacity: 0,
            content: '""',
            transition: `all ${token.motionDurationFast} ${token.motionEaseInBack}, opacity ${token.motionDurationFast}`
          },
          [`&${componentCls}-presets-color-checked`]: {
            "&::after": {
              opacity: 1,
              borderColor: colorWhite,
              transform: "rotate(45deg) scale(1) translate(-50%,-50%)",
              transition: `transform ${token.motionDurationMid} ${token.motionEaseOutBack} ${token.motionDurationFast}`
            },
            [`&${componentCls}-presets-color-bright`]: {
              "&::after": {
                borderColor: "rgba(0, 0, 0, 0.45)"
              }
            }
          }
        }
      },
      "&-empty": {
        fontSize: fontSizeSM,
        color: colorTextQuaternary
      }
    }
  };
};
const genSliderStyle = (token) => {
  const {
    componentCls,
    colorPickerInsetShadow,
    colorBgElevated,
    colorFillSecondary,
    lineWidthBold,
    colorPickerHandlerSizeSM,
    colorPickerSliderHeight,
    marginSM,
    marginXS
  } = token;
  const handleInnerSize = token.calc(colorPickerHandlerSizeSM).sub(token.calc(lineWidthBold).mul(2).equal()).equal();
  const handleHoverSize = token.calc(colorPickerHandlerSizeSM).add(token.calc(lineWidthBold).mul(2).equal()).equal();
  const activeHandleStyle = {
    "&:after": {
      transform: "scale(1)",
      boxShadow: `${colorPickerInsetShadow}, 0 0 0 1px ${token.colorPrimaryActive}`
    }
  };
  return {
    // ======================== Slider ========================
    [`${componentCls}-slider`]: [getTransBg(unit(colorPickerSliderHeight), token.colorFillSecondary), {
      margin: 0,
      padding: 0,
      height: colorPickerSliderHeight,
      borderRadius: token.calc(colorPickerSliderHeight).div(2).equal(),
      "&-rail": {
        height: colorPickerSliderHeight,
        borderRadius: token.calc(colorPickerSliderHeight).div(2).equal(),
        boxShadow: colorPickerInsetShadow
      },
      [`& ${componentCls}-slider-handle`]: {
        width: handleInnerSize,
        height: handleInnerSize,
        top: 0,
        borderRadius: "100%",
        "&:before": {
          display: "block",
          position: "absolute",
          background: "transparent",
          left: {
            _skip_check_: true,
            value: "50%"
          },
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: handleHoverSize,
          height: handleHoverSize,
          borderRadius: "100%"
        },
        "&:after": {
          width: colorPickerHandlerSizeSM,
          height: colorPickerHandlerSizeSM,
          border: `${unit(lineWidthBold)} solid ${colorBgElevated}`,
          boxShadow: `${colorPickerInsetShadow}, 0 0 0 1px ${colorFillSecondary}`,
          outline: "none",
          insetInlineStart: token.calc(lineWidthBold).mul(-1).equal(),
          top: token.calc(lineWidthBold).mul(-1).equal(),
          background: "transparent",
          transition: "none"
        },
        "&:focus": activeHandleStyle
      }
    }],
    // ======================== Layout ========================
    [`${componentCls}-slider-container`]: {
      display: "flex",
      gap: marginSM,
      marginBottom: marginSM,
      // Group
      [`${componentCls}-slider-group`]: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        display: "flex",
        "&-disabled-alpha": {
          justifyContent: "center"
        }
      }
    },
    [`${componentCls}-gradient-slider`]: {
      marginBottom: marginXS,
      [`& ${componentCls}-slider-handle`]: {
        "&:after": {
          transform: "scale(0.8)"
        },
        "&-active, &:focus": activeHandleStyle
      }
    }
  };
};
const genActiveStyle = (token, borderColor, outlineColor) => ({
  borderInlineEndWidth: token.lineWidth,
  borderColor,
  boxShadow: `0 0 0 ${unit(token.controlOutlineWidth)} ${outlineColor}`,
  outline: 0
});
const genRtlStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    "&-rtl": {
      [`${componentCls}-presets-color`]: {
        "&::after": {
          direction: "ltr"
        }
      },
      [`${componentCls}-clear`]: {
        "&::after": {
          direction: "ltr"
        }
      }
    }
  };
};
const genClearStyle = (token, size, extraStyle) => {
  const {
    componentCls,
    borderRadiusSM,
    lineWidth,
    colorSplit,
    colorBorder,
    red6
  } = token;
  return {
    [`${componentCls}-clear`]: Object.assign(Object.assign({
      width: size,
      height: size,
      borderRadius: borderRadiusSM,
      border: `${unit(lineWidth)} solid ${colorSplit}`,
      position: "relative",
      overflow: "hidden",
      cursor: "inherit",
      transition: `all ${token.motionDurationFast}`
    }, extraStyle), {
      "&::after": {
        content: '""',
        position: "absolute",
        insetInlineEnd: token.calc(lineWidth).mul(-1).equal(),
        top: token.calc(lineWidth).mul(-1).equal(),
        display: "block",
        width: 40,
        // maximum
        height: 2,
        // fixed
        transformOrigin: `calc(100% - 1px) 1px`,
        transform: "rotate(-45deg)",
        backgroundColor: red6
      },
      "&:hover": {
        borderColor: colorBorder
      }
    })
  };
};
const genStatusStyle = (token) => {
  const {
    componentCls,
    colorError,
    colorWarning,
    colorErrorHover,
    colorWarningHover,
    colorErrorOutline,
    colorWarningOutline
  } = token;
  return {
    [`&${componentCls}-status-error`]: {
      borderColor: colorError,
      "&:hover": {
        borderColor: colorErrorHover
      },
      [`&${componentCls}-trigger-active`]: Object.assign({}, genActiveStyle(token, colorError, colorErrorOutline))
    },
    [`&${componentCls}-status-warning`]: {
      borderColor: colorWarning,
      "&:hover": {
        borderColor: colorWarningHover
      },
      [`&${componentCls}-trigger-active`]: Object.assign({}, genActiveStyle(token, colorWarning, colorWarningOutline))
    }
  };
};
const genSizeStyle = (token) => {
  const {
    componentCls,
    controlHeightLG,
    controlHeightSM,
    controlHeight,
    controlHeightXS,
    borderRadius,
    borderRadiusSM,
    borderRadiusXS,
    borderRadiusLG,
    fontSizeLG
  } = token;
  return {
    [`&${componentCls}-lg`]: {
      minWidth: controlHeightLG,
      minHeight: controlHeightLG,
      borderRadius: borderRadiusLG,
      [`${componentCls}-color-block, ${componentCls}-clear`]: {
        width: controlHeight,
        height: controlHeight,
        borderRadius
      },
      [`${componentCls}-trigger-text`]: {
        fontSize: fontSizeLG
      }
    },
    [`&${componentCls}-sm`]: {
      minWidth: controlHeightSM,
      minHeight: controlHeightSM,
      borderRadius: borderRadiusSM,
      [`${componentCls}-color-block, ${componentCls}-clear`]: {
        width: controlHeightXS,
        height: controlHeightXS,
        borderRadius: borderRadiusXS
      },
      [`${componentCls}-trigger-text`]: {
        lineHeight: unit(controlHeightXS)
      }
    }
  };
};
const genColorPickerStyle = (token) => {
  const {
    antCls,
    componentCls,
    colorPickerWidth,
    colorPrimary,
    motionDurationMid,
    colorBgElevated,
    colorTextDisabled,
    colorText,
    colorBgContainerDisabled,
    borderRadius,
    marginXS,
    marginSM,
    controlHeight,
    controlHeightSM,
    colorBgTextActive,
    colorPickerPresetColorSize,
    colorPickerPreviewSize,
    lineWidth,
    colorBorder,
    paddingXXS,
    fontSize,
    colorPrimaryHover,
    controlOutline
  } = token;
  return [{
    [componentCls]: Object.assign({
      [`${componentCls}-inner`]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
        "&-content": {
          display: "flex",
          flexDirection: "column",
          width: colorPickerWidth,
          [`& > ${antCls}-divider`]: {
            margin: `${unit(marginSM)} 0 ${unit(marginXS)}`
          }
        },
        [`${componentCls}-panel`]: Object.assign({}, genPickerStyle(token))
      }, genSliderStyle(token)), genColorBlockStyle(token, colorPickerPreviewSize)), genInputStyle(token)), genPresetsStyle(token)), genClearStyle(token, colorPickerPresetColorSize, {
        marginInlineStart: "auto"
      })), {
        // Operation bar
        [`${componentCls}-operation`]: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: marginXS
        }
      }),
      "&-trigger": Object.assign(Object.assign(Object.assign(Object.assign({
        minWidth: controlHeight,
        minHeight: controlHeight,
        borderRadius,
        border: `${unit(lineWidth)} solid ${colorBorder}`,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "flex-start",
        justifyContent: "center",
        transition: `all ${motionDurationMid}`,
        background: colorBgElevated,
        padding: token.calc(paddingXXS).sub(lineWidth).equal(),
        [`${componentCls}-trigger-text`]: {
          marginInlineStart: marginXS,
          marginInlineEnd: token.calc(marginXS).sub(token.calc(paddingXXS).sub(lineWidth)).equal(),
          fontSize,
          color: colorText,
          alignSelf: "center",
          "&-cell": {
            "&:not(:last-child):after": {
              content: '", "'
            },
            "&-inactive": {
              color: colorTextDisabled
            }
          }
        },
        "&:hover": {
          borderColor: colorPrimaryHover
        },
        [`&${componentCls}-trigger-active`]: Object.assign({}, genActiveStyle(token, colorPrimary, controlOutline)),
        "&-disabled": {
          color: colorTextDisabled,
          background: colorBgContainerDisabled,
          cursor: "not-allowed",
          "&:hover": {
            borderColor: colorBgTextActive
          },
          [`${componentCls}-trigger-text`]: {
            color: colorTextDisabled
          }
        }
      }, genClearStyle(token, controlHeightSM)), genColorBlockStyle(token, controlHeightSM)), genStatusStyle(token)), genSizeStyle(token))
    }, genRtlStyle(token))
  }, genCompactItemStyle(token, {
    focusElCls: `${componentCls}-trigger-active`
  })];
};
const useStyle = genStyleHooks("ColorPicker", (token) => {
  const {
    colorTextQuaternary,
    marginSM
  } = token;
  const colorPickerSliderHeight = 8;
  const colorPickerToken = merge(token, {
    colorPickerWidth: 234,
    colorPickerHandlerSize: 16,
    colorPickerHandlerSizeSM: 12,
    colorPickerAlphaInputWidth: 44,
    colorPickerInputNumberHandleWidth: 16,
    colorPickerPresetColorSize: 24,
    colorPickerInsetShadow: `inset 0 0 1px 0 ${colorTextQuaternary}`,
    colorPickerSliderHeight,
    colorPickerPreviewSize: token.calc(colorPickerSliderHeight).mul(2).add(marginSM).equal()
  });
  return genColorPickerStyle(colorPickerToken);
});
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const ColorPicker = (props) => {
  const {
    mode,
    value,
    defaultValue,
    format,
    defaultFormat,
    allowClear = false,
    presets,
    children,
    trigger = "click",
    open,
    disabled,
    placement = "bottomLeft",
    arrow = true,
    panelRender,
    showText,
    style,
    className,
    size: customizeSize,
    rootClassName,
    prefixCls: customizePrefixCls,
    styles,
    disabledAlpha = false,
    onFormatChange,
    onChange,
    onClear,
    onOpenChange,
    onChangeComplete,
    getPopupContainer,
    autoAdjustOverflow = true,
    destroyTooltipOnHide,
    destroyOnHidden,
    disabledFormat
  } = props, rest = __rest(props, ["mode", "value", "defaultValue", "format", "defaultFormat", "allowClear", "presets", "children", "trigger", "open", "disabled", "placement", "arrow", "panelRender", "showText", "style", "className", "size", "rootClassName", "prefixCls", "styles", "disabledAlpha", "onFormatChange", "onChange", "onClear", "onOpenChange", "onChangeComplete", "getPopupContainer", "autoAdjustOverflow", "destroyTooltipOnHide", "destroyOnHidden", "disabledFormat"]);
  const {
    getPrefixCls,
    direction,
    colorPicker
  } = reactExports.useContext(ConfigContext);
  const contextDisabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = disabled !== null && disabled !== void 0 ? disabled : contextDisabled;
  const [popupOpen, setPopupOpen] = useMergedState(false, {
    value: open,
    postState: (openData) => !mergedDisabled && openData,
    onChange: onOpenChange
  });
  const [formatValue, setFormatValue] = useMergedState(format, {
    value: format,
    defaultValue: defaultFormat,
    onChange: onFormatChange
  });
  const prefixCls = getPrefixCls("color-picker", customizePrefixCls);
  const [mergedColor, setColor, modeState, setModeState, modeOptions] = useModeColor(defaultValue, value, mode);
  const isAlphaColor = reactExports.useMemo(() => getColorAlpha(mergedColor) < 100, [mergedColor]);
  const [cachedGradientColor, setCachedGradientColor] = React.useState(null);
  const onInternalChangeComplete = (color) => {
    if (onChangeComplete) {
      let changeColor = generateColor$1(color);
      if (disabledAlpha && isAlphaColor) {
        changeColor = genAlphaColor(color);
      }
      onChangeComplete(changeColor);
    }
  };
  const onInternalChange = (data, changeFromPickerDrag) => {
    let color = generateColor$1(data);
    if (disabledAlpha && isAlphaColor) {
      color = genAlphaColor(color);
    }
    setColor(color);
    setCachedGradientColor(null);
    if (onChange) {
      onChange(color, color.toCssString());
    }
    if (!changeFromPickerDrag) {
      onInternalChangeComplete(color);
    }
  };
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [gradientDragging, setGradientDragging] = React.useState(false);
  const onInternalModeChange = (newMode) => {
    setModeState(newMode);
    if (newMode === "single" && mergedColor.isGradient()) {
      setActiveIndex(0);
      onInternalChange(new AggregationColor(mergedColor.getColors()[0].color));
      setCachedGradientColor(mergedColor);
    } else if (newMode === "gradient" && !mergedColor.isGradient()) {
      const baseColor = isAlphaColor ? genAlphaColor(mergedColor) : mergedColor;
      onInternalChange(new AggregationColor(cachedGradientColor || [{
        percent: 0,
        color: baseColor
      }, {
        percent: 100,
        color: baseColor
      }]));
    }
  };
  const {
    status: contextStatus
  } = React.useContext(FormItemInputContext);
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  const mergedSize = useSize((ctx) => {
    var _a;
    return (_a = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a !== void 0 ? _a : ctx;
  });
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const rtlCls = {
    [`${prefixCls}-rtl`]: direction
  };
  const mergedRootCls = classNames(rootClassName, cssVarCls, rootCls, rtlCls);
  const mergedCls = classNames(getStatusClassNames(prefixCls, contextStatus), {
    [`${prefixCls}-sm`]: mergedSize === "small",
    [`${prefixCls}-lg`]: mergedSize === "large"
  }, compactItemClassnames, colorPicker === null || colorPicker === void 0 ? void 0 : colorPicker.className, mergedRootCls, className, hashId);
  const mergedPopupCls = classNames(prefixCls, mergedRootCls);
  const popoverProps = {
    open: popupOpen,
    trigger,
    placement,
    arrow,
    rootClassName,
    getPopupContainer,
    autoAdjustOverflow,
    destroyOnHidden: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : !!destroyTooltipOnHide
  };
  const mergedStyle = Object.assign(Object.assign({}, colorPicker === null || colorPicker === void 0 ? void 0 : colorPicker.style), style);
  return wrapCSSVar(/* @__PURE__ */ React.createElement(Popover, Object.assign({
    style: styles === null || styles === void 0 ? void 0 : styles.popup,
    styles: {
      body: styles === null || styles === void 0 ? void 0 : styles.popupOverlayInner
    },
    onOpenChange: (visible) => {
      if (!visible || !mergedDisabled) {
        setPopupOpen(visible);
      }
    },
    content: /* @__PURE__ */ React.createElement(ContextIsolator, {
      form: true
    }, /* @__PURE__ */ React.createElement(ColorPickerPanel, {
      mode: modeState,
      onModeChange: onInternalModeChange,
      modeOptions,
      prefixCls,
      value: mergedColor,
      allowClear,
      disabled: mergedDisabled,
      disabledAlpha,
      presets,
      panelRender,
      format: formatValue,
      onFormatChange: setFormatValue,
      onChange: onInternalChange,
      onChangeComplete: onInternalChangeComplete,
      onClear,
      activeIndex,
      onActive: setActiveIndex,
      gradientDragging,
      onGradientDragging: setGradientDragging,
      disabledFormat
    })),
    classNames: {
      root: mergedPopupCls
    }
  }, popoverProps), children || /* @__PURE__ */ React.createElement(ColorTrigger, Object.assign({
    activeIndex: popupOpen ? activeIndex : -1,
    open: popupOpen,
    className: mergedCls,
    style: mergedStyle,
    prefixCls,
    disabled: mergedDisabled,
    showText,
    format: formatValue
  }, rest, {
    color: mergedColor
  }))));
};
const PurePanel = genPurePanel(
  ColorPicker,
  void 0,
  (props) => Object.assign(Object.assign({}, props), {
    placement: "bottom",
    autoAdjustOverflow: false
  }),
  "color-picker",
  /* istanbul ignore next */
  (prefixCls) => prefixCls
);
ColorPicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
function CopyCode({ code }) {
  const [done, setDone] = reactExports.useState(false);
  const copy = () => {
    var _a;
    (_a = navigator.clipboard) == null ? void 0 : _a.writeText(code).then(() => {
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "mg-fs-code", onClick: copy, title: __("Click to copy", "memberglut"), children: [
    code,
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: done ? faCheck : faCopy })
  ] });
}
function SmartTags({ tags, title }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-tags", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-tags-title", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faTags }),
      " ",
      title || __("Smart tags", "memberglut"),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("click to copy", "memberglut") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-chips", children: tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: t.label, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
      var _a;
      return (_a = navigator.clipboard) == null ? void 0 : _a.writeText(t.tag);
    }, children: t.tag }) }, t.tag)) })
  ] });
}
function FieldControl({ f, value, onChange, values }) {
  switch (f.type) {
    case "switch":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: !!value, onChange });
    case "select":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value, onChange, options: f.options, placeholder: f.placeholder, style: { width: "100%" }, showSearch: f.options && f.options.length > 8, optionFilterProp: "label" });
    case "multiselect":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", value: value || [], onChange, options: f.options, placeholder: f.placeholder, style: { width: "100%" }, optionFilterProp: "label", allowClear: true });
    case "tags":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "tags", value: value || [], onChange, placeholder: f.placeholder, style: { width: "100%" }, tokenSeparators: [",", " "], open: false, suffixIcon: null });
    case "textarea":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Input$1.TextArea, { rows: f.rows || 3, value, placeholder: f.placeholder, onChange: (e) => onChange(e.target.value) });
    case "editor":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Input$1.TextArea, { className: "mg-editor", rows: f.rows || 6, value, placeholder: f.placeholder, onChange: (e) => onChange(e.target.value) });
    case "code":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Input$1.TextArea, { className: "mg-code-input", rows: f.rows || 5, value, placeholder: f.placeholder, onChange: (e) => onChange(e.target.value), spellCheck: false });
    case "password":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Input$1.Password, { value, placeholder: f.placeholder, autoComplete: "new-password", onChange: (e) => onChange(e.target.value) });
    case "number":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: f.min, max: f.max, step: f.step, value, addonAfter: f.suffix, addonBefore: f.prefix, onChange: (v) => onChange(v ?? 0), style: { width: f.width || 200 } });
    case "price":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 0, step: 0.01, precision: 2, value, addonBefore: f.prefix || values && values.currency_symbol || "$", onChange: (v) => onChange(v ?? 0), style: { width: 220 } });
    case "duration":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Space.Compact, { style: { width: "100%" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 1, value: value == null ? void 0 : value.length, onChange: (v) => onChange({ ...value, length: v ?? 1 }), style: { width: 110 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: value == null ? void 0 : value.unit, onChange: (u) => onChange({ ...value, unit: u }), style: { flex: 1 }, options: f.units || UNITS })
      ] });
    case "radio":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Radio.Group, { value, onChange: (e) => onChange(e.target.value), optionType: "button", buttonStyle: "solid", children: f.options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(Radio.Button, { value: o.value, children: o.label }, o.value)) });
    case "cards":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-choice-cards", children: f.options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: value === o.value ? "active" : "", onClick: () => onChange(o.value), children: [
        o.icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: o.icon }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "t", children: o.label }),
        o.desc && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "d", children: o.desc })
      ] }, o.value)) });
    case "date":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { value: value ? dayjs(value) : null, onChange: (d) => onChange(d ? d.format("YYYY-MM-DD") : ""), style: { width: 220 } });
    case "color":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ColorPicker, { value, onChange: (c) => onChange(c.toHexString()), showText: true });
    case "info":
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-help", children: f.text });
    case "custom":
      return f.render({ value, onChange, values });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Input$1, { type: f.type === "email" ? "email" : "text", value, placeholder: f.placeholder, prefix: f.prefix, suffix: f.suffix, onChange: (e) => onChange(e.target.value) });
  }
}
const UNITS = [
  { value: "day", label: __("Day(s)", "memberglut") },
  { value: "week", label: __("Week(s)", "memberglut") },
  { value: "month", label: __("Month(s)", "memberglut") },
  { value: "year", label: __("Year(s)", "memberglut") }
];
const WIDE_TYPES = ["textarea", "editor", "code", "cards", "custom"];
function FieldRows({ fields, values, update, errors = {} }) {
  return fields.filter((f) => !f.show || f.show(values)).map((f) => {
    if (f.type === "heading") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-subhead", children: [
        f.label,
        f.tip && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f.tip })
      ] }, f.key);
    }
    const wide = WIDE_TYPES.includes(f.type) || f.wide;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mg-fs-row ${f.type === "switch" ? "is-switch" : ""} ${wide ? "is-wide" : ""} ${f.full ? "is-full" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-label", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-label-line", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: f.label }),
          f.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { color: "pink", bordered: false, children: f.badge })
        ] }),
        f.tip && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-help", children: f.tip })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldControl, { f, value: values[f.key], values, onChange: (v) => update(f.key, v) }),
        errors[f.key] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-error", children: errors[f.key] }),
        f.after && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-after", children: typeof f.after === "function" ? f.after(values) : f.after })
      ] })
    ] }, f.key);
  });
}
function SettingsPanel({
  title,
  subtitle,
  titleExtra,
  back,
  sections,
  values,
  setValues,
  onSave,
  saving,
  saveLabel,
  initialSection,
  headerActions,
  errors = {}
}) {
  const [dirty, setDirty] = reactExports.useState(false);
  const [active, setActive] = reactExports.useState(initialSection || new URLSearchParams(window.location.search).get("tab") || sections[0].key);
  const [subs, setSubs] = reactExports.useState(() => {
    const sub = new URLSearchParams(window.location.search).get("sub");
    return sub ? { [initialSection || new URLSearchParams(window.location.search).get("tab") || sections[0].key]: sub } : {};
  });
  const sectionKeys = (s) => [...s.fields || [], ...(s.subs || []).flatMap((x) => x.fields || [])].map((f) => f.key).concat(s.errorKeys || []);
  const hasError = (s) => sectionKeys(s).some((k) => errors[k]);
  const subHasError = (x) => (x.fields || []).some((f) => errors[f.key]);
  reactExports.useEffect(() => {
    const first = sections.find(hasError);
    if (first && !hasError(sections.find((s) => s.key === active) || {})) {
      setActive(first.key);
      if (first.subs) {
        const sub = first.subs.find(subHasError);
        if (sub) setSubs((p) => ({ ...p, [first.key]: sub.key }));
      }
    }
  }, [errors]);
  reactExports.useEffect(() => {
    const warn = (e) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
  const update = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    setDirty(true);
  };
  const save = async () => {
    const ok = await onSave(values);
    if (ok !== false) setDirty(false);
  };
  const section = sections.find((s) => s.key === active) || sections[0];
  const subSection = section.subs ? section.subs.find((x) => x.key === subs[section.key]) || section.subs[0] : null;
  const fields = (subSection || section).fields || [];
  const ctx = { values, update, setValues: (fn) => {
    setValues(fn);
    setDirty(true);
  } };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-top", children: [
      back && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: back.href, className: "mg-fs-back", children: back.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-titlebar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-page-title", children: title }),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-page-subtitle", children: subtitle }),
          titleExtra
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-actions", children: [
          headerActions,
          dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-fs-unsaved", children: __("Unsaved changes", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", size: "large", loading: saving, disabled: !dirty, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faFloppyDisk }), onClick: save, className: "mg-save-btn", children: saveLabel || __("Save settings", "memberglut") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-layout", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mg-fs-nav", children: sections.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: s.key === section.key ? "active" : "", onClick: () => setActive(s.key), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: s.icon }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.title }),
        hasError(s) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-fs-nav-error" })
      ] }, s.key)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mg-fs-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-card-head", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: section.icon }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: section.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: section.desc })
          ] })
        ] }),
        section.subs && /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { activeKey: subSection.key, onChange: (k) => setSubs((p) => ({ ...p, [section.key]: k })), items: section.subs.map((x) => ({ key: x.key, label: subHasError(x) ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-fs-tab-error", children: x.title }) : x.title })) }),
        subSection && subSection.desc && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-note", style: { margin: "0 0 14px" }, children: subSection.desc }),
        section.renderTop && section.renderTop(ctx),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldRows, { fields, values, update, errors }),
        (subSection || section).render && (subSection || section).render(ctx),
        section.hint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-note", style: { margin: "4px 0 18px" }, children: section.hint })
      ] })
    ] })
  ] });
}
export {
  CopyCode as C,
  SettingsPanel as S,
  SmartTags as a
};
