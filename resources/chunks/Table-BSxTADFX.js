import { dU as wrapperRaf, d7 as reactExports, av as canUseDom, I as Icon, af as _extends, j as ConfigContext, aw as classNames, dh as toArray$1, d0 as omit, ay as cloneElement, de as supportNodeRef, dr as useComposeRef, cD as getNodeRef, n as ContextIsolator, dk as unit, ck as genFocusOutline, dg as textEllipsis, cr as genStyleHooks, cZ as merge, cf as genCollapseMotion, cP as initZoomMotion, ax as clearFix, da as resetComponent, F as FastColor, db as resetIcon, dM as useZIndex, dt as useEvent, dl as useCSSVarCls, cK as initCollapseMotion, cl as genFocusStyle, aG as devUseWarning, dJ as useToken, dA as useMergedState, dV as zIndexContext, Y as RefIcon$e, ar as _typeof, ak as _objectSpread2, dO as warningOnce, aq as _toConsumableArray, al as _objectWithoutProperties, R as React, t as FormItemInputContext, D as DisabledContext, aA as composeRef, a3 as TARGET_CLS, a6 as Wave, dp as useCompactItemContext, c as Button, O as ReactDOM, ao as _slicedToArray, K as KeyCode, ae as _defineProperty, d2 as pickAttrs, cN as initInputToken, cL as initComponentToken$1, cd as genBasicInputStyle, cc as genBaseOutlinedStyle, ch as genDisabledStyle, cn as genInputSmallStyle, cs as genSubStyleComponent, dq as useComponentConfig, dG as useSize, dy as useLocale, cW as locale$1, dw as useLayoutEffect, cR as isEqual, d6 as reactDomExports, df as supportRef, dz as useMemo, cw as get, _ as RefResizeObserver, cT as isVisible, ca as fillRef, cz as getDOM, cF as getScrollBarSize, cI as getTargetScrollBarSize, C as CSSMotion, ah as _inherits, ad as _createSuper, ab as _classCallCheck, a9 as _assertThisInitialized, ac as _createClass, x as Keyframe, X as RefIcon$g, w as Input, Z as RefIcon$h, c_ as mergeProps, d1 as operationUnit, cY as localeValues, k as ConfigProvider } from "./Page-uv7jJYOd.js";
import { as as useForceUpdate, a as Divider, M as MenuItem$1, T as Tooltip, a6 as initSlideMotion, au as useFullPath, i as SubMenu$1, c as ExportMenu, f as RefIcon$d, d as MenuItemGroup, an as slideDownOut, ap as slideUpOut, am as slideDownIn, ao as slideUpIn, y as getArrowStyle, a5 as initMoveMotion, x as getArrowOffsetToken, z as getArrowToken, U as getPlacements, b as Dropdown$2, u as genPurePanel, ar as useBubbleLock, C as Checkbox$2, h as Space, S as Select, L as List, g as RefIcon$f, R as Radio, E as Empty, D as DefaultRenderEmpty } from "./api-BU-mz-0j.js";
import { u as useBreakpoint } from "./useBreakpoint-DPNFZzhM.js";
import { S as Spin } from "./index-CIIETatw.js";
function isWindow(obj) {
  return obj !== null && obj !== void 0 && obj === obj.window;
}
const getScroll = (target) => {
  var _a, _b;
  if (typeof window === "undefined") {
    return 0;
  }
  let result = 0;
  if (isWindow(target)) {
    result = target.pageYOffset;
  } else if (target instanceof Document) {
    result = target.documentElement.scrollTop;
  } else if (target instanceof HTMLElement) {
    result = target.scrollTop;
  } else if (target) {
    result = target["scrollTop"];
  }
  if (target && !isWindow(target) && typeof result !== "number") {
    result = (_b = ((_a = target.ownerDocument) !== null && _a !== void 0 ? _a : target).documentElement) === null || _b === void 0 ? void 0 : _b.scrollTop;
  }
  return result;
};
function easeInOutCubic(t, b, c, d) {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return cc / 2 * t * t * t + b;
  }
  return cc / 2 * ((t -= 2) * t * t + 2) + b;
}
function scrollTo(y, options = {}) {
  const {
    getContainer = () => window,
    callback,
    duration = 450
  } = options;
  const container = getContainer();
  const scrollTop = getScroll(container);
  const startTime = Date.now();
  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);
    if (isWindow(container)) {
      container.scrollTo(window.pageXOffset, nextScrollTop);
    } else if (container instanceof Document || container.constructor.name === "HTMLDocument") {
      container.documentElement.scrollTop = nextScrollTop;
    } else {
      container.scrollTop = nextScrollTop;
    }
    if (time < duration) {
      wrapperRaf(frameFunc);
    } else if (typeof callback === "function") {
      callback();
    }
  };
  wrapperRaf(frameFunc);
}
const useMultipleSelect = (getKey2) => {
  const [prevSelectedIndex, setPrevSelectedIndex] = reactExports.useState(null);
  const multipleSelect = reactExports.useCallback((currentSelectedIndex, data, selectedKeys) => {
    const configPrevSelectedIndex = prevSelectedIndex !== null && prevSelectedIndex !== void 0 ? prevSelectedIndex : currentSelectedIndex;
    const startIndex = Math.min(configPrevSelectedIndex || 0, currentSelectedIndex);
    const endIndex = Math.max(configPrevSelectedIndex || 0, currentSelectedIndex);
    const rangeKeys = data.slice(startIndex, endIndex + 1).map(getKey2);
    const shouldSelected = rangeKeys.some((rangeKey) => !selectedKeys.has(rangeKey));
    const changedKeys = [];
    rangeKeys.forEach((item) => {
      if (shouldSelected) {
        if (!selectedKeys.has(item)) {
          changedKeys.push(item);
        }
        selectedKeys.add(item);
      } else {
        selectedKeys.delete(item);
        changedKeys.push(item);
      }
    });
    setPrevSelectedIndex(shouldSelected ? endIndex : null);
    return changedKeys;
  }, [prevSelectedIndex]);
  return [multipleSelect, setPrevSelectedIndex];
};
function fillProxy(element, handler) {
  element._antProxy = element._antProxy || {};
  Object.keys(handler).forEach((key) => {
    if (!(key in element._antProxy)) {
      const ori = element[key];
      element._antProxy[key] = ori;
      element[key] = handler[key];
    }
  });
  return element;
}
const useProxyImperativeHandle = (ref, init) => {
  return reactExports.useImperativeHandle(ref, () => {
    const refObj = init();
    const {
      nativeElement
    } = refObj;
    if (typeof Proxy !== "undefined") {
      return new Proxy(nativeElement, {
        get(obj, prop) {
          if (refObj[prop]) {
            return refObj[prop];
          }
          return Reflect.get(obj, prop);
        }
      });
    }
    return fillProxy(nativeElement, refObj);
  });
};
const useSyncState = (initialValue) => {
  const ref = reactExports.useRef(initialValue);
  const [, forceUpdate] = useForceUpdate();
  return [() => ref.current, (newValue) => {
    ref.current = newValue;
    forceUpdate();
  }];
};
var isStyleNameSupport = function isStyleNameSupport2(styleName) {
  if (canUseDom() && window.document.documentElement) {
    var styleNameList = Array.isArray(styleName) ? styleName : [styleName];
    var documentElement = window.document.documentElement;
    return styleNameList.some(function(name) {
      return name in documentElement.style;
    });
  }
  return false;
};
var isStyleValueSupport = function isStyleValueSupport2(styleName, value) {
  if (!isStyleNameSupport(styleName)) {
    return false;
  }
  var ele = document.createElement("div");
  var origin = ele.style[styleName];
  ele.style[styleName] = value;
  return ele.style[styleName] !== origin;
};
function isStyleSupport(styleName, styleValue) {
  if (!Array.isArray(styleName) && styleValue !== void 0) {
    return isStyleValueSupport(styleName, styleValue);
  }
  return isStyleNameSupport(styleName);
}
var LeftOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" } }] }, "name": "left", "theme": "outlined" };
var LeftOutlined = function LeftOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: LeftOutlined$1
  }));
};
var RefIcon$c = /* @__PURE__ */ reactExports.forwardRef(LeftOutlined);
const isPrimitive = (value) => typeof value !== "object" && typeof value !== "function" || value === null;
const SiderContext = /* @__PURE__ */ reactExports.createContext({});
const MenuContext = /* @__PURE__ */ reactExports.createContext({
  prefixCls: "",
  firstLevel: true,
  inlineCollapsed: false
});
var __rest$8 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const MenuDivider = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    dashed
  } = props, restProps = __rest$8(props, ["prefixCls", "className", "dashed"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("menu", customizePrefixCls);
  const classString = classNames({
    [`${prefixCls}-item-divider-dashed`]: !!dashed
  }, className);
  return /* @__PURE__ */ reactExports.createElement(Divider, Object.assign({
    className: classString
  }, restProps));
};
const MenuItem = (props) => {
  var _a;
  const {
    className,
    children,
    icon,
    title,
    danger,
    extra
  } = props;
  const {
    prefixCls,
    firstLevel,
    direction,
    disableMenuItemTitleTooltip,
    inlineCollapsed: isInlineCollapsed
  } = reactExports.useContext(MenuContext);
  const renderItemChildren = (inlineCollapsed) => {
    const label = children === null || children === void 0 ? void 0 : children[0];
    const wrapNode = /* @__PURE__ */ reactExports.createElement("span", {
      className: classNames(`${prefixCls}-title-content`, {
        [`${prefixCls}-title-content-with-extra`]: !!extra || extra === 0
      })
    }, children);
    if (!icon || /* @__PURE__ */ reactExports.isValidElement(children) && children.type === "span") {
      if (children && inlineCollapsed && firstLevel && typeof label === "string") {
        return /* @__PURE__ */ reactExports.createElement("div", {
          className: `${prefixCls}-inline-collapsed-noicon`
        }, label.charAt(0));
      }
    }
    return wrapNode;
  };
  const {
    siderCollapsed
  } = reactExports.useContext(SiderContext);
  let tooltipTitle = title;
  if (typeof title === "undefined") {
    tooltipTitle = firstLevel ? children : "";
  } else if (title === false) {
    tooltipTitle = "";
  }
  const tooltipProps = {
    title: tooltipTitle
  };
  if (!siderCollapsed && !isInlineCollapsed) {
    tooltipProps.title = null;
    tooltipProps.open = false;
  }
  const childrenLength = toArray$1(children).length;
  let returnNode = /* @__PURE__ */ reactExports.createElement(MenuItem$1, Object.assign({}, omit(props, ["title", "icon", "danger"]), {
    className: classNames({
      [`${prefixCls}-item-danger`]: danger,
      [`${prefixCls}-item-only-child`]: (icon ? childrenLength + 1 : childrenLength) === 1
    }, className),
    title: typeof title === "string" ? title : void 0
  }), cloneElement(icon, {
    className: classNames(/* @__PURE__ */ reactExports.isValidElement(icon) ? (_a = icon.props) === null || _a === void 0 ? void 0 : _a.className : void 0, `${prefixCls}-item-icon`)
  }), renderItemChildren(isInlineCollapsed));
  if (!disableMenuItemTitleTooltip) {
    returnNode = /* @__PURE__ */ reactExports.createElement(Tooltip, Object.assign({}, tooltipProps, {
      placement: direction === "rtl" ? "left" : "right",
      classNames: {
        root: `${prefixCls}-inline-collapsed-tooltip`
      }
    }), returnNode);
  }
  return returnNode;
};
var __rest$7 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const OverrideContext = /* @__PURE__ */ reactExports.createContext(null);
const OverrideProvider = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    children
  } = props, restProps = __rest$7(props, ["children"]);
  const override = reactExports.useContext(OverrideContext);
  const context = reactExports.useMemo(() => Object.assign(Object.assign({}, override), restProps), [
    override,
    restProps.prefixCls,
    // restProps.expandIcon, Not mark as deps since this is a ReactNode
    restProps.mode,
    restProps.selectable,
    restProps.rootClassName
    // restProps.validator, Not mark as deps since this is a function
  ]);
  const canRef = supportNodeRef(children);
  const mergedRef = useComposeRef(ref, canRef ? getNodeRef(children) : null);
  return /* @__PURE__ */ reactExports.createElement(OverrideContext.Provider, {
    value: context
  }, /* @__PURE__ */ reactExports.createElement(ContextIsolator, {
    space: true
  }, canRef ? /* @__PURE__ */ reactExports.cloneElement(children, {
    ref: mergedRef
  }) : children));
});
const getHorizontalStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    horizontalLineHeight,
    colorSplit,
    lineWidth,
    lineType,
    itemPaddingInline
  } = token;
  return {
    [`${componentCls}-horizontal`]: {
      lineHeight: horizontalLineHeight,
      border: 0,
      borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
      boxShadow: "none",
      "&::after": {
        display: "block",
        clear: "both",
        height: 0,
        content: '"\\20"'
      },
      // ======================= Item =======================
      [`${componentCls}-item, ${componentCls}-submenu`]: {
        position: "relative",
        display: "inline-block",
        verticalAlign: "bottom",
        paddingInline: itemPaddingInline
      },
      [`> ${componentCls}-item:hover,
        > ${componentCls}-item-active,
        > ${componentCls}-submenu ${componentCls}-submenu-title:hover`]: {
        backgroundColor: "transparent"
      },
      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`].join(",")
      },
      // ===================== Sub Menu =====================
      [`${componentCls}-submenu-arrow`]: {
        display: "none"
      }
    }
  };
};
const getRTLStyle = ({
  componentCls,
  menuArrowOffset,
  calc
}) => ({
  [`${componentCls}-rtl`]: {
    direction: "rtl"
  },
  [`${componentCls}-submenu-rtl`]: {
    transformOrigin: "100% 0"
  },
  // Vertical Arrow
  [`${componentCls}-rtl${componentCls}-vertical,
    ${componentCls}-submenu-rtl ${componentCls}-vertical`]: {
    [`${componentCls}-submenu-arrow`]: {
      "&::before": {
        transform: `rotate(-45deg) translateY(${unit(calc(menuArrowOffset).mul(-1).equal())})`
      },
      "&::after": {
        transform: `rotate(45deg) translateY(${unit(menuArrowOffset)})`
      }
    }
  }
});
const accessibilityFocus = (token) => genFocusOutline(token);
const getThemeStyle = (token, themeSuffix) => {
  const {
    componentCls,
    itemColor,
    itemSelectedColor,
    subMenuItemSelectedColor,
    groupTitleColor,
    itemBg,
    subMenuItemBg,
    itemSelectedBg,
    activeBarHeight,
    activeBarWidth,
    activeBarBorderWidth,
    motionDurationSlow,
    motionEaseInOut,
    motionEaseOut,
    itemPaddingInline,
    motionDurationMid,
    itemHoverColor,
    lineType,
    colorSplit,
    // Disabled
    itemDisabledColor,
    // Danger
    dangerItemColor,
    dangerItemHoverColor,
    dangerItemSelectedColor,
    dangerItemActiveBg,
    dangerItemSelectedBg,
    // Bg
    popupBg,
    itemHoverBg,
    itemActiveBg,
    menuSubMenuBg,
    // Horizontal
    horizontalItemSelectedColor,
    horizontalItemSelectedBg,
    horizontalItemBorderRadius,
    horizontalItemHoverBg
  } = token;
  return {
    [`${componentCls}-${themeSuffix}, ${componentCls}-${themeSuffix} > ${componentCls}`]: {
      color: itemColor,
      background: itemBg,
      [`&${componentCls}-root:focus-visible`]: Object.assign({}, accessibilityFocus(token)),
      // ======================== Item ========================
      [`${componentCls}-item`]: {
        "&-group-title, &-extra": {
          color: groupTitleColor
        }
      },
      [`${componentCls}-submenu-selected > ${componentCls}-submenu-title`]: {
        color: subMenuItemSelectedColor
      },
      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        color: itemColor,
        [`&:not(${componentCls}-item-disabled):focus-visible`]: Object.assign({}, accessibilityFocus(token))
      },
      // Disabled
      [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
        color: `${itemDisabledColor} !important`
      },
      // Hover
      [`${componentCls}-item:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
        [`&:hover, > ${componentCls}-submenu-title:hover`]: {
          color: itemHoverColor
        }
      },
      [`&:not(${componentCls}-horizontal)`]: {
        [`${componentCls}-item:not(${componentCls}-item-selected)`]: {
          "&:hover": {
            backgroundColor: itemHoverBg
          },
          "&:active": {
            backgroundColor: itemActiveBg
          }
        },
        [`${componentCls}-submenu-title`]: {
          "&:hover": {
            backgroundColor: itemHoverBg
          },
          "&:active": {
            backgroundColor: itemActiveBg
          }
        }
      },
      // Danger - only Item has
      [`${componentCls}-item-danger`]: {
        color: dangerItemColor,
        [`&${componentCls}-item:hover`]: {
          [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
            color: dangerItemHoverColor
          }
        },
        [`&${componentCls}-item:active`]: {
          background: dangerItemActiveBg
        }
      },
      [`${componentCls}-item a`]: {
        "&, &:hover": {
          color: "inherit"
        }
      },
      [`${componentCls}-item-selected`]: {
        color: itemSelectedColor,
        // Danger
        [`&${componentCls}-item-danger`]: {
          color: dangerItemSelectedColor
        },
        "a, a:hover": {
          color: "inherit"
        }
      },
      [`& ${componentCls}-item-selected`]: {
        backgroundColor: itemSelectedBg,
        // Danger
        [`&${componentCls}-item-danger`]: {
          backgroundColor: dangerItemSelectedBg
        }
      },
      [`&${componentCls}-submenu > ${componentCls}`]: {
        backgroundColor: menuSubMenuBg
      },
      // ===== 设置浮层的颜色 =======
      // ！dark 模式会被popupBg 会被rest 为 darkPopupBg
      [`&${componentCls}-popup > ${componentCls}`]: {
        backgroundColor: popupBg
      },
      [`&${componentCls}-submenu-popup > ${componentCls}`]: {
        backgroundColor: popupBg
      },
      // ===== 设置浮层的颜色 end =======
      // ====================== Horizontal ======================
      [`&${componentCls}-horizontal`]: Object.assign(Object.assign({}, themeSuffix === "dark" ? {
        borderBottom: 0
      } : {}), {
        [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
          top: activeBarBorderWidth,
          marginTop: token.calc(activeBarBorderWidth).mul(-1).equal(),
          marginBottom: 0,
          borderRadius: horizontalItemBorderRadius,
          "&::after": {
            position: "absolute",
            insetInline: itemPaddingInline,
            bottom: 0,
            borderBottom: `${unit(activeBarHeight)} solid transparent`,
            transition: `border-color ${motionDurationSlow} ${motionEaseInOut}`,
            content: '""'
          },
          "&:hover, &-active, &-open": {
            background: horizontalItemHoverBg,
            "&::after": {
              borderBottomWidth: activeBarHeight,
              borderBottomColor: horizontalItemSelectedColor
            }
          },
          "&-selected": {
            color: horizontalItemSelectedColor,
            backgroundColor: horizontalItemSelectedBg,
            "&:hover": {
              backgroundColor: horizontalItemSelectedBg
            },
            "&::after": {
              borderBottomWidth: activeBarHeight,
              borderBottomColor: horizontalItemSelectedColor
            }
          }
        }
      }),
      // ================== Inline & Vertical ===================
      //
      [`&${componentCls}-root`]: {
        [`&${componentCls}-inline, &${componentCls}-vertical`]: {
          borderInlineEnd: `${unit(activeBarBorderWidth)} ${lineType} ${colorSplit}`
        }
      },
      // ======================== Inline ========================
      [`&${componentCls}-inline`]: {
        // Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          background: subMenuItemBg
        },
        [`${componentCls}-item`]: {
          position: "relative",
          "&::after": {
            position: "absolute",
            insetBlock: 0,
            insetInlineEnd: 0,
            borderInlineEnd: `${unit(activeBarWidth)} solid ${itemSelectedColor}`,
            transform: "scaleY(0.0001)",
            opacity: 0,
            transition: [`transform ${motionDurationMid} ${motionEaseOut}`, `opacity ${motionDurationMid} ${motionEaseOut}`].join(","),
            content: '""'
          },
          // Danger
          [`&${componentCls}-item-danger`]: {
            "&::after": {
              borderInlineEndColor: dangerItemSelectedColor
            }
          }
        },
        [`${componentCls}-selected, ${componentCls}-item-selected`]: {
          "&::after": {
            transform: "scaleY(1)",
            opacity: 1,
            transition: [`transform ${motionDurationMid} ${motionEaseInOut}`, `opacity ${motionDurationMid} ${motionEaseInOut}`].join(",")
          }
        }
      }
    }
  };
};
const getVerticalInlineStyle = (token) => {
  const {
    componentCls,
    itemHeight,
    itemMarginInline,
    padding,
    menuArrowSize,
    marginXS,
    itemMarginBlock,
    itemWidth,
    itemPaddingInline
  } = token;
  const paddingWithArrow = token.calc(menuArrowSize).add(padding).add(marginXS).equal();
  return {
    [`${componentCls}-item`]: {
      position: "relative",
      overflow: "hidden"
    },
    [`${componentCls}-item, ${componentCls}-submenu-title`]: {
      height: itemHeight,
      lineHeight: unit(itemHeight),
      paddingInline: itemPaddingInline,
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginInline: itemMarginInline,
      marginBlock: itemMarginBlock,
      width: itemWidth
    },
    [`> ${componentCls}-item,
            > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
      height: itemHeight,
      lineHeight: unit(itemHeight)
    },
    [`${componentCls}-item-group-list ${componentCls}-submenu-title,
            ${componentCls}-submenu-title`]: {
      paddingInlineEnd: paddingWithArrow
    }
  };
};
const getVerticalStyle = (token) => {
  const {
    componentCls,
    iconCls,
    itemHeight,
    colorTextLightSolid,
    dropdownWidth,
    controlHeightLG,
    motionEaseOut,
    paddingXL,
    itemMarginInline,
    fontSizeLG,
    motionDurationFast,
    motionDurationSlow,
    paddingXS,
    boxShadowSecondary,
    collapsedWidth,
    collapsedIconSize
  } = token;
  const inlineItemStyle = {
    height: itemHeight,
    lineHeight: unit(itemHeight),
    listStylePosition: "inside",
    listStyleType: "disc"
  };
  return [
    {
      [componentCls]: {
        "&-inline, &-vertical": Object.assign({
          [`&${componentCls}-root`]: {
            boxShadow: "none"
          }
        }, getVerticalInlineStyle(token))
      },
      [`${componentCls}-submenu-popup`]: {
        [`${componentCls}-vertical`]: Object.assign(Object.assign({}, getVerticalInlineStyle(token)), {
          boxShadow: boxShadowSecondary
        })
      }
    },
    // Vertical only
    {
      [`${componentCls}-submenu-popup ${componentCls}-vertical${componentCls}-sub`]: {
        minWidth: dropdownWidth,
        maxHeight: `calc(100vh - ${unit(token.calc(controlHeightLG).mul(2.5).equal())})`,
        padding: "0",
        overflow: "hidden",
        borderInlineEnd: 0,
        // https://github.com/ant-design/ant-design/issues/22244
        // https://github.com/ant-design/ant-design/issues/26812
        "&:not([class*='-active'])": {
          overflowX: "hidden",
          overflowY: "auto"
        }
      }
    },
    // Inline Only
    {
      [`${componentCls}-inline`]: {
        width: "100%",
        // Motion enhance for first level
        [`&${componentCls}-root`]: {
          [`${componentCls}-item, ${componentCls}-submenu-title`]: {
            display: "flex",
            alignItems: "center",
            transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`, `padding ${motionDurationFast} ${motionEaseOut}`].join(","),
            [`> ${componentCls}-title-content`]: {
              flex: "auto",
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis"
            },
            "> *": {
              flex: "none"
            }
          }
        },
        // >>>>> Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          padding: 0,
          border: 0,
          borderRadius: 0,
          boxShadow: "none",
          [`& > ${componentCls}-submenu > ${componentCls}-submenu-title`]: inlineItemStyle,
          [`& ${componentCls}-item-group-title`]: {
            paddingInlineStart: paddingXL
          }
        },
        // >>>>> Item
        [`${componentCls}-item`]: inlineItemStyle
      }
    },
    // Inline Collapse Only
    {
      [`${componentCls}-inline-collapsed`]: {
        width: collapsedWidth,
        [`&${componentCls}-root`]: {
          [`${componentCls}-item, ${componentCls}-submenu ${componentCls}-submenu-title`]: {
            [`> ${componentCls}-inline-collapsed-noicon`]: {
              fontSize: fontSizeLG,
              textAlign: "center"
            }
          }
        },
        [`> ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-item,
          > ${componentCls}-item-group > ${componentCls}-item-group-list > ${componentCls}-submenu > ${componentCls}-submenu-title,
          > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
          insetInlineStart: 0,
          paddingInline: `calc(50% - ${unit(token.calc(collapsedIconSize).div(2).equal())} - ${unit(itemMarginInline)})`,
          textOverflow: "clip",
          [`
            ${componentCls}-submenu-arrow,
            ${componentCls}-submenu-expand-icon
          `]: {
            opacity: 0
          },
          [`${componentCls}-item-icon, ${iconCls}`]: {
            margin: 0,
            fontSize: collapsedIconSize,
            lineHeight: unit(itemHeight),
            "+ span": {
              display: "inline-block",
              opacity: 0
            }
          }
        },
        [`${componentCls}-item-icon, ${iconCls}`]: {
          display: "inline-block"
        },
        "&-tooltip": {
          pointerEvents: "none",
          [`${componentCls}-item-icon, ${iconCls}`]: {
            display: "none"
          },
          "a, a:hover": {
            color: colorTextLightSolid
          }
        },
        [`${componentCls}-item-group-title`]: Object.assign(Object.assign({}, textEllipsis), {
          paddingInline: paddingXS
        })
      }
    }
  ];
};
const genMenuItemStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOut,
    motionEaseOut,
    iconCls,
    iconSize,
    iconMarginInlineEnd
  } = token;
  return {
    // >>>>> Item
    [`${componentCls}-item, ${componentCls}-submenu-title`]: {
      position: "relative",
      display: "block",
      margin: 0,
      whiteSpace: "nowrap",
      cursor: "pointer",
      transition: [`border-color ${motionDurationSlow}`, `background ${motionDurationSlow}`, `padding calc(${motionDurationSlow} + 0.1s) ${motionEaseInOut}`].join(","),
      [`${componentCls}-item-icon, ${iconCls}`]: {
        minWidth: iconSize,
        fontSize: iconSize,
        transition: [`font-size ${motionDurationMid} ${motionEaseOut}`, `margin ${motionDurationSlow} ${motionEaseInOut}`, `color ${motionDurationSlow}`].join(","),
        "+ span": {
          marginInlineStart: iconMarginInlineEnd,
          opacity: 1,
          transition: [`opacity ${motionDurationSlow} ${motionEaseInOut}`, `margin ${motionDurationSlow}`, `color ${motionDurationSlow}`].join(",")
        }
      },
      [`${componentCls}-item-icon`]: Object.assign({}, resetIcon()),
      [`&${componentCls}-item-only-child`]: {
        [`> ${iconCls}, > ${componentCls}-item-icon`]: {
          marginInlineEnd: 0
        }
      }
    },
    // Disabled state sets text to gray and nukes hover/tab effects
    [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
      background: "none !important",
      cursor: "not-allowed",
      "&::after": {
        borderColor: "transparent !important"
      },
      a: {
        color: "inherit !important",
        cursor: "not-allowed",
        pointerEvents: "none"
      },
      [`> ${componentCls}-submenu-title`]: {
        color: "inherit !important",
        cursor: "not-allowed"
      }
    }
  };
};
const genSubMenuArrowStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    motionEaseInOut,
    borderRadius,
    menuArrowSize,
    menuArrowOffset
  } = token;
  return {
    [`${componentCls}-submenu`]: {
      "&-expand-icon, &-arrow": {
        position: "absolute",
        top: "50%",
        insetInlineEnd: token.margin,
        width: menuArrowSize,
        color: "currentcolor",
        transform: "translateY(-50%)",
        transition: `transform ${motionDurationSlow} ${motionEaseInOut}, opacity ${motionDurationSlow}`
      },
      "&-arrow": {
        // →
        "&::before, &::after": {
          position: "absolute",
          width: token.calc(menuArrowSize).mul(0.6).equal(),
          height: token.calc(menuArrowSize).mul(0.15).equal(),
          backgroundColor: "currentcolor",
          borderRadius,
          transition: [`background ${motionDurationSlow} ${motionEaseInOut}`, `transform ${motionDurationSlow} ${motionEaseInOut}`, `top ${motionDurationSlow} ${motionEaseInOut}`, `color ${motionDurationSlow} ${motionEaseInOut}`].join(","),
          content: '""'
        },
        "&::before": {
          transform: `rotate(45deg) translateY(${unit(token.calc(menuArrowOffset).mul(-1).equal())})`
        },
        "&::after": {
          transform: `rotate(-45deg) translateY(${unit(menuArrowOffset)})`
        }
      }
    }
  };
};
const getBaseStyle = (token) => {
  const {
    antCls,
    componentCls,
    fontSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOut,
    paddingXS,
    padding,
    colorSplit,
    lineWidth,
    zIndexPopup,
    borderRadiusLG,
    subMenuItemBorderRadius,
    menuArrowSize,
    menuArrowOffset,
    lineType,
    groupTitleLineHeight,
    groupTitleFontSize
  } = token;
  return [
    // Misc
    {
      "": {
        [componentCls]: Object.assign(Object.assign({}, clearFix()), {
          // Hidden
          "&-hidden": {
            display: "none"
          }
        })
      },
      [`${componentCls}-submenu-hidden`]: {
        display: "none"
      }
    },
    {
      [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), clearFix()), {
        marginBottom: 0,
        paddingInlineStart: 0,
        // Override default ul/ol
        fontSize,
        lineHeight: 0,
        listStyle: "none",
        outline: "none",
        // Magic cubic here but smooth transition
        transition: `width ${motionDurationSlow} cubic-bezier(0.2, 0, 0, 1) 0s`,
        "ul, ol": {
          margin: 0,
          padding: 0,
          listStyle: "none"
        },
        // Overflow ellipsis
        "&-overflow": {
          display: "flex",
          [`${componentCls}-item`]: {
            flex: "none"
          }
        },
        [`${componentCls}-item, ${componentCls}-submenu, ${componentCls}-submenu-title`]: {
          borderRadius: token.itemBorderRadius
        },
        [`${componentCls}-item-group-title`]: {
          padding: `${unit(paddingXS)} ${unit(padding)}`,
          fontSize: groupTitleFontSize,
          lineHeight: groupTitleLineHeight,
          transition: `all ${motionDurationSlow}`
        },
        [`&-horizontal ${componentCls}-submenu`]: {
          transition: [`border-color ${motionDurationSlow} ${motionEaseInOut}`, `background ${motionDurationSlow} ${motionEaseInOut}`].join(",")
        },
        [`${componentCls}-submenu, ${componentCls}-submenu-inline`]: {
          transition: [`border-color ${motionDurationSlow} ${motionEaseInOut}`, `background ${motionDurationSlow} ${motionEaseInOut}`, `padding ${motionDurationMid} ${motionEaseInOut}`].join(",")
        },
        [`${componentCls}-submenu ${componentCls}-sub`]: {
          cursor: "initial",
          transition: [`background ${motionDurationSlow} ${motionEaseInOut}`, `padding ${motionDurationSlow} ${motionEaseInOut}`].join(",")
        },
        [`${componentCls}-title-content`]: {
          transition: `color ${motionDurationSlow}`,
          "&-with-extra": {
            display: "inline-flex",
            alignItems: "center",
            width: "100%"
          },
          // https://github.com/ant-design/ant-design/issues/41143
          [`> ${antCls}-typography-ellipsis-single-line`]: {
            display: "inline",
            verticalAlign: "unset"
          },
          [`${componentCls}-item-extra`]: {
            marginInlineStart: "auto",
            paddingInlineStart: token.padding
          }
        },
        [`${componentCls}-item a`]: {
          "&::before": {
            position: "absolute",
            inset: 0,
            backgroundColor: "transparent",
            content: '""'
          }
        },
        // Removed a Badge related style seems it's safe
        // https://github.com/ant-design/ant-design/issues/19809
        // >>>>> Divider
        [`${componentCls}-item-divider`]: {
          overflow: "hidden",
          lineHeight: 0,
          borderColor: colorSplit,
          borderStyle: lineType,
          borderWidth: 0,
          borderTopWidth: lineWidth,
          marginBlock: lineWidth,
          padding: 0,
          "&-dashed": {
            borderStyle: "dashed"
          }
        }
      }), genMenuItemStyle(token)), {
        [`${componentCls}-item-group`]: {
          [`${componentCls}-item-group-list`]: {
            margin: 0,
            padding: 0,
            [`${componentCls}-item, ${componentCls}-submenu-title`]: {
              paddingInline: `${unit(token.calc(fontSize).mul(2).equal())} ${unit(padding)}`
            }
          }
        },
        // ======================= Sub Menu =======================
        "&-submenu": {
          "&-popup": {
            position: "absolute",
            zIndex: zIndexPopup,
            borderRadius: borderRadiusLG,
            boxShadow: "none",
            transformOrigin: "0 0",
            [`&${componentCls}-submenu`]: {
              background: "transparent"
            },
            // https://github.com/ant-design/ant-design/issues/13955
            "&::before": {
              position: "absolute",
              inset: 0,
              zIndex: -1,
              width: "100%",
              height: "100%",
              opacity: 0,
              content: '""'
            },
            [`> ${componentCls}`]: Object.assign(Object.assign(Object.assign({
              borderRadius: borderRadiusLG
            }, genMenuItemStyle(token)), genSubMenuArrowStyle(token)), {
              [`${componentCls}-item, ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
                borderRadius: subMenuItemBorderRadius
              },
              [`${componentCls}-submenu-title::after`]: {
                transition: `transform ${motionDurationSlow} ${motionEaseInOut}`
              }
            })
          },
          [`
          &-placement-leftTop,
          &-placement-bottomRight,
          `]: {
            transformOrigin: "100% 0"
          },
          [`
          &-placement-leftBottom,
          &-placement-topRight,
          `]: {
            transformOrigin: "100% 100%"
          },
          [`
          &-placement-rightBottom,
          &-placement-topLeft,
          `]: {
            transformOrigin: "0 100%"
          },
          [`
          &-placement-bottomLeft,
          &-placement-rightTop,
          `]: {
            transformOrigin: "0 0"
          },
          [`
          &-placement-leftTop,
          &-placement-leftBottom
          `]: {
            paddingInlineEnd: token.paddingXS
          },
          [`
          &-placement-rightTop,
          &-placement-rightBottom
          `]: {
            paddingInlineStart: token.paddingXS
          },
          [`
          &-placement-topRight,
          &-placement-topLeft
          `]: {
            paddingBottom: token.paddingXS
          },
          [`
          &-placement-bottomRight,
          &-placement-bottomLeft
          `]: {
            paddingTop: token.paddingXS
          }
        }
      }), genSubMenuArrowStyle(token)), {
        [`&-inline-collapsed ${componentCls}-submenu-arrow,
        &-inline ${componentCls}-submenu-arrow`]: {
          // ↓
          "&::before": {
            transform: `rotate(-45deg) translateX(${unit(menuArrowOffset)})`
          },
          "&::after": {
            transform: `rotate(45deg) translateX(${unit(token.calc(menuArrowOffset).mul(-1).equal())})`
          }
        },
        [`${componentCls}-submenu-open${componentCls}-submenu-inline > ${componentCls}-submenu-title > ${componentCls}-submenu-arrow`]: {
          // ↑
          transform: `translateY(${unit(token.calc(menuArrowSize).mul(0.2).mul(-1).equal())})`,
          "&::after": {
            transform: `rotate(-45deg) translateX(${unit(token.calc(menuArrowOffset).mul(-1).equal())})`
          },
          "&::before": {
            transform: `rotate(45deg) translateX(${unit(menuArrowOffset)})`
          }
        }
      })
    },
    // Integration with header element so menu items have the same height
    {
      [`${antCls}-layout-header`]: {
        [componentCls]: {
          lineHeight: "inherit"
        }
      }
    }
  ];
};
const prepareComponentToken$4 = (token) => {
  var _a, _b, _c;
  const {
    colorPrimary,
    colorError,
    colorTextDisabled,
    colorErrorBg,
    colorText,
    colorTextDescription,
    colorBgContainer,
    colorFillAlter,
    colorFillContent,
    lineWidth,
    lineWidthBold,
    controlItemBgActive,
    colorBgTextHover,
    controlHeightLG,
    lineHeight,
    colorBgElevated,
    marginXXS,
    padding,
    fontSize,
    controlHeightSM,
    fontSizeLG,
    colorTextLightSolid,
    colorErrorHover
  } = token;
  const activeBarWidth = (_a = token.activeBarWidth) !== null && _a !== void 0 ? _a : 0;
  const activeBarBorderWidth = (_b = token.activeBarBorderWidth) !== null && _b !== void 0 ? _b : lineWidth;
  const itemMarginInline = (_c = token.itemMarginInline) !== null && _c !== void 0 ? _c : token.marginXXS;
  const colorTextDark = new FastColor(colorTextLightSolid).setA(0.65).toRgbString();
  return {
    dropdownWidth: 160,
    zIndexPopup: token.zIndexPopupBase + 50,
    radiusItem: token.borderRadiusLG,
    itemBorderRadius: token.borderRadiusLG,
    radiusSubMenuItem: token.borderRadiusSM,
    subMenuItemBorderRadius: token.borderRadiusSM,
    colorItemText: colorText,
    itemColor: colorText,
    colorItemTextHover: colorText,
    itemHoverColor: colorText,
    colorItemTextHoverHorizontal: colorPrimary,
    horizontalItemHoverColor: colorPrimary,
    colorGroupTitle: colorTextDescription,
    groupTitleColor: colorTextDescription,
    colorItemTextSelected: colorPrimary,
    itemSelectedColor: colorPrimary,
    subMenuItemSelectedColor: colorPrimary,
    colorItemTextSelectedHorizontal: colorPrimary,
    horizontalItemSelectedColor: colorPrimary,
    colorItemBg: colorBgContainer,
    itemBg: colorBgContainer,
    colorItemBgHover: colorBgTextHover,
    itemHoverBg: colorBgTextHover,
    colorItemBgActive: colorFillContent,
    itemActiveBg: controlItemBgActive,
    colorSubItemBg: colorFillAlter,
    subMenuItemBg: colorFillAlter,
    colorItemBgSelected: controlItemBgActive,
    itemSelectedBg: controlItemBgActive,
    colorItemBgSelectedHorizontal: "transparent",
    horizontalItemSelectedBg: "transparent",
    colorActiveBarWidth: 0,
    activeBarWidth,
    colorActiveBarHeight: lineWidthBold,
    activeBarHeight: lineWidthBold,
    colorActiveBarBorderSize: lineWidth,
    activeBarBorderWidth,
    // Disabled
    colorItemTextDisabled: colorTextDisabled,
    itemDisabledColor: colorTextDisabled,
    // Danger
    colorDangerItemText: colorError,
    dangerItemColor: colorError,
    colorDangerItemTextHover: colorError,
    dangerItemHoverColor: colorError,
    colorDangerItemTextSelected: colorError,
    dangerItemSelectedColor: colorError,
    colorDangerItemBgActive: colorErrorBg,
    dangerItemActiveBg: colorErrorBg,
    colorDangerItemBgSelected: colorErrorBg,
    dangerItemSelectedBg: colorErrorBg,
    itemMarginInline,
    horizontalItemBorderRadius: 0,
    horizontalItemHoverBg: "transparent",
    itemHeight: controlHeightLG,
    groupTitleLineHeight: lineHeight,
    collapsedWidth: controlHeightLG * 2,
    popupBg: colorBgElevated,
    itemMarginBlock: marginXXS,
    itemPaddingInline: padding,
    horizontalLineHeight: `${controlHeightLG * 1.15}px`,
    iconSize: fontSize,
    iconMarginInlineEnd: controlHeightSM - fontSize,
    collapsedIconSize: fontSizeLG,
    groupTitleFontSize: fontSize,
    // Disabled
    darkItemDisabledColor: new FastColor(colorTextLightSolid).setA(0.25).toRgbString(),
    // Dark
    darkItemColor: colorTextDark,
    darkDangerItemColor: colorError,
    darkItemBg: "#001529",
    darkPopupBg: "#001529",
    darkSubMenuItemBg: "#000c17",
    darkItemSelectedColor: colorTextLightSolid,
    darkItemSelectedBg: colorPrimary,
    darkDangerItemSelectedBg: colorError,
    darkItemHoverBg: "transparent",
    darkGroupTitleColor: colorTextDark,
    darkItemHoverColor: colorTextLightSolid,
    darkDangerItemHoverColor: colorErrorHover,
    darkDangerItemSelectedColor: colorTextLightSolid,
    darkDangerItemActiveBg: colorError,
    // internal
    itemWidth: activeBarWidth ? `calc(100% + ${activeBarBorderWidth}px)` : `calc(100% - ${itemMarginInline * 2}px)`
  };
};
const useStyle$5 = (prefixCls, rootCls = prefixCls, injectStyle = true) => {
  const useStyle2 = genStyleHooks("Menu", (token) => {
    const {
      colorBgElevated,
      controlHeightLG,
      fontSize,
      darkItemColor,
      darkDangerItemColor,
      darkItemBg,
      darkSubMenuItemBg,
      darkItemSelectedColor,
      darkItemSelectedBg,
      darkDangerItemSelectedBg,
      darkItemHoverBg,
      darkGroupTitleColor,
      darkItemHoverColor,
      darkItemDisabledColor,
      darkDangerItemHoverColor,
      darkDangerItemSelectedColor,
      darkDangerItemActiveBg,
      popupBg,
      darkPopupBg
    } = token;
    const menuArrowSize = token.calc(fontSize).div(7).mul(5).equal();
    const menuToken = merge(token, {
      menuArrowSize,
      menuHorizontalHeight: token.calc(controlHeightLG).mul(1.15).equal(),
      menuArrowOffset: token.calc(menuArrowSize).mul(0.25).equal(),
      menuSubMenuBg: colorBgElevated,
      calc: token.calc,
      popupBg
    });
    const menuDarkToken = merge(menuToken, {
      itemColor: darkItemColor,
      itemHoverColor: darkItemHoverColor,
      groupTitleColor: darkGroupTitleColor,
      itemSelectedColor: darkItemSelectedColor,
      subMenuItemSelectedColor: darkItemSelectedColor,
      itemBg: darkItemBg,
      popupBg: darkPopupBg,
      subMenuItemBg: darkSubMenuItemBg,
      itemActiveBg: "transparent",
      itemSelectedBg: darkItemSelectedBg,
      activeBarHeight: 0,
      activeBarBorderWidth: 0,
      itemHoverBg: darkItemHoverBg,
      // Disabled
      itemDisabledColor: darkItemDisabledColor,
      // Danger
      dangerItemColor: darkDangerItemColor,
      dangerItemHoverColor: darkDangerItemHoverColor,
      dangerItemSelectedColor: darkDangerItemSelectedColor,
      dangerItemActiveBg: darkDangerItemActiveBg,
      dangerItemSelectedBg: darkDangerItemSelectedBg,
      menuSubMenuBg: darkSubMenuItemBg,
      // Horizontal
      horizontalItemSelectedColor: darkItemSelectedColor,
      horizontalItemSelectedBg: darkItemSelectedBg
    });
    return [
      // Basic
      getBaseStyle(menuToken),
      // Horizontal
      getHorizontalStyle(menuToken),
      // Hard code for some light style
      // Vertical
      getVerticalStyle(menuToken),
      // Hard code for some light style
      // Theme
      getThemeStyle(menuToken, "light"),
      getThemeStyle(menuDarkToken, "dark"),
      // RTL
      getRTLStyle(menuToken),
      // Motion
      genCollapseMotion(menuToken),
      initSlideMotion(menuToken, "slide-up"),
      initSlideMotion(menuToken, "slide-down"),
      initZoomMotion(menuToken, "zoom-big")
    ];
  }, prepareComponentToken$4, {
    deprecatedTokens: [["colorGroupTitle", "groupTitleColor"], ["radiusItem", "itemBorderRadius"], ["radiusSubMenuItem", "subMenuItemBorderRadius"], ["colorItemText", "itemColor"], ["colorItemTextHover", "itemHoverColor"], ["colorItemTextHoverHorizontal", "horizontalItemHoverColor"], ["colorItemTextSelected", "itemSelectedColor"], ["colorItemTextSelectedHorizontal", "horizontalItemSelectedColor"], ["colorItemTextDisabled", "itemDisabledColor"], ["colorDangerItemText", "dangerItemColor"], ["colorDangerItemTextHover", "dangerItemHoverColor"], ["colorDangerItemTextSelected", "dangerItemSelectedColor"], ["colorDangerItemBgActive", "dangerItemActiveBg"], ["colorDangerItemBgSelected", "dangerItemSelectedBg"], ["colorItemBg", "itemBg"], ["colorItemBgHover", "itemHoverBg"], ["colorSubItemBg", "subMenuItemBg"], ["colorItemBgActive", "itemActiveBg"], ["colorItemBgSelectedHorizontal", "horizontalItemSelectedBg"], ["colorActiveBarWidth", "activeBarWidth"], ["colorActiveBarHeight", "activeBarHeight"], ["colorActiveBarBorderSize", "activeBarBorderWidth"], ["colorItemBgSelected", "itemSelectedBg"]],
    // Dropdown will handle menu style self. We do not need to handle this.
    injectStyle,
    unitless: {
      groupTitleLineHeight: true
    }
  });
  return useStyle2(prefixCls, rootCls);
};
const SubMenu = (props) => {
  var _a;
  const {
    popupClassName,
    icon,
    title,
    theme: customTheme
  } = props;
  const context = reactExports.useContext(MenuContext);
  const {
    prefixCls,
    inlineCollapsed,
    theme: contextTheme
  } = context;
  const parentPath = useFullPath();
  let titleNode;
  if (!icon) {
    titleNode = inlineCollapsed && !parentPath.length && title && typeof title === "string" ? /* @__PURE__ */ reactExports.createElement("div", {
      className: `${prefixCls}-inline-collapsed-noicon`
    }, title.charAt(0)) : /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-title-content`
    }, title);
  } else {
    const titleIsSpan = /* @__PURE__ */ reactExports.isValidElement(title) && title.type === "span";
    titleNode = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, cloneElement(icon, {
      className: classNames(/* @__PURE__ */ reactExports.isValidElement(icon) ? (_a = icon.props) === null || _a === void 0 ? void 0 : _a.className : void 0, `${prefixCls}-item-icon`)
    }), titleIsSpan ? title : /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-title-content`
    }, title));
  }
  const contextValue = reactExports.useMemo(() => Object.assign(Object.assign({}, context), {
    firstLevel: false
  }), [context]);
  const [zIndex] = useZIndex("Menu");
  return /* @__PURE__ */ reactExports.createElement(MenuContext.Provider, {
    value: contextValue
  }, /* @__PURE__ */ reactExports.createElement(SubMenu$1, Object.assign({}, omit(props, ["icon"]), {
    title: titleNode,
    popupClassName: classNames(prefixCls, popupClassName, `${prefixCls}-${customTheme || contextTheme}`),
    popupStyle: Object.assign({
      zIndex
    }, props.popupStyle)
  })));
};
var __rest$6 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function isEmptyIcon(icon) {
  return icon === null || icon === false;
}
const MENU_COMPONENTS = {
  item: MenuItem,
  submenu: SubMenu,
  divider: MenuDivider
};
const InternalMenu = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _a;
  const override = reactExports.useContext(OverrideContext);
  const overrideObj = override || {};
  const {
    getPrefixCls,
    getPopupContainer,
    direction,
    menu
  } = reactExports.useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    theme = "light",
    expandIcon,
    _internalDisableMenuItemTitleTooltip,
    inlineCollapsed,
    siderCollapsed,
    rootClassName,
    mode,
    selectable,
    onClick,
    overflowedIndicatorPopupClassName
  } = props, restProps = __rest$6(props, ["prefixCls", "className", "style", "theme", "expandIcon", "_internalDisableMenuItemTitleTooltip", "inlineCollapsed", "siderCollapsed", "rootClassName", "mode", "selectable", "onClick", "overflowedIndicatorPopupClassName"]);
  const passedProps = omit(restProps, ["collapsedWidth"]);
  (_a = overrideObj.validator) === null || _a === void 0 ? void 0 : _a.call(overrideObj, {
    mode
  });
  const onItemClick = useEvent((...args) => {
    var _a2;
    onClick === null || onClick === void 0 ? void 0 : onClick.apply(void 0, args);
    (_a2 = overrideObj.onClick) === null || _a2 === void 0 ? void 0 : _a2.call(overrideObj);
  });
  const mergedMode = overrideObj.mode || mode;
  const mergedSelectable = selectable !== null && selectable !== void 0 ? selectable : overrideObj.selectable;
  const mergedInlineCollapsed = inlineCollapsed !== null && inlineCollapsed !== void 0 ? inlineCollapsed : siderCollapsed;
  const defaultMotions = {
    horizontal: {
      motionName: `${rootPrefixCls}-slide-up`
    },
    inline: initCollapseMotion(rootPrefixCls),
    other: {
      motionName: `${rootPrefixCls}-zoom-big`
    }
  };
  const prefixCls = getPrefixCls("menu", customizePrefixCls || overrideObj.prefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$5(prefixCls, rootCls, !override);
  const menuClassName = classNames(`${prefixCls}-${theme}`, menu === null || menu === void 0 ? void 0 : menu.className, className);
  const mergedExpandIcon = reactExports.useMemo(() => {
    var _a2, _b;
    if (typeof expandIcon === "function" || isEmptyIcon(expandIcon)) {
      return expandIcon || null;
    }
    if (typeof overrideObj.expandIcon === "function" || isEmptyIcon(overrideObj.expandIcon)) {
      return overrideObj.expandIcon || null;
    }
    if (typeof (menu === null || menu === void 0 ? void 0 : menu.expandIcon) === "function" || isEmptyIcon(menu === null || menu === void 0 ? void 0 : menu.expandIcon)) {
      return (menu === null || menu === void 0 ? void 0 : menu.expandIcon) || null;
    }
    const mergedIcon = (_a2 = expandIcon !== null && expandIcon !== void 0 ? expandIcon : overrideObj === null || overrideObj === void 0 ? void 0 : overrideObj.expandIcon) !== null && _a2 !== void 0 ? _a2 : menu === null || menu === void 0 ? void 0 : menu.expandIcon;
    return cloneElement(mergedIcon, {
      className: classNames(`${prefixCls}-submenu-expand-icon`, /* @__PURE__ */ reactExports.isValidElement(mergedIcon) ? (_b = mergedIcon.props) === null || _b === void 0 ? void 0 : _b.className : void 0)
    });
  }, [expandIcon, overrideObj === null || overrideObj === void 0 ? void 0 : overrideObj.expandIcon, menu === null || menu === void 0 ? void 0 : menu.expandIcon, prefixCls]);
  const contextValue = reactExports.useMemo(() => ({
    prefixCls,
    inlineCollapsed: mergedInlineCollapsed || false,
    direction,
    firstLevel: true,
    theme,
    mode: mergedMode,
    disableMenuItemTitleTooltip: _internalDisableMenuItemTitleTooltip
  }), [prefixCls, mergedInlineCollapsed, direction, _internalDisableMenuItemTitleTooltip, theme]);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(OverrideContext.Provider, {
    value: null
  }, /* @__PURE__ */ reactExports.createElement(MenuContext.Provider, {
    value: contextValue
  }, /* @__PURE__ */ reactExports.createElement(ExportMenu, Object.assign({
    getPopupContainer,
    overflowedIndicator: /* @__PURE__ */ reactExports.createElement(RefIcon$d, null),
    overflowedIndicatorPopupClassName: classNames(prefixCls, `${prefixCls}-${theme}`, overflowedIndicatorPopupClassName),
    mode: mergedMode,
    selectable: mergedSelectable,
    onClick: onItemClick
  }, passedProps, {
    inlineCollapsed: mergedInlineCollapsed,
    style: Object.assign(Object.assign({}, menu === null || menu === void 0 ? void 0 : menu.style), style),
    className: menuClassName,
    prefixCls,
    direction,
    defaultMotions,
    expandIcon: mergedExpandIcon,
    ref,
    rootClassName: classNames(rootClassName, hashId, overrideObj.rootClassName, cssVarCls, rootCls),
    _internalComponents: MENU_COMPONENTS
  })))));
});
const Menu = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const menuRef = reactExports.useRef(null);
  const context = reactExports.useContext(SiderContext);
  reactExports.useImperativeHandle(ref, () => ({
    menu: menuRef.current,
    focus: (options) => {
      var _a;
      (_a = menuRef.current) === null || _a === void 0 ? void 0 : _a.focus(options);
    }
  }));
  return /* @__PURE__ */ reactExports.createElement(InternalMenu, Object.assign({
    ref: menuRef
  }, props, context));
});
Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.Divider = MenuDivider;
Menu.ItemGroup = MenuItemGroup;
const genStatusStyle = (token) => {
  const {
    componentCls,
    menuCls,
    colorError,
    colorTextLightSolid
  } = token;
  const itemCls = `${menuCls}-item`;
  return {
    [`${componentCls}, ${componentCls}-menu-submenu`]: {
      [`${menuCls} ${itemCls}`]: {
        [`&${itemCls}-danger:not(${itemCls}-disabled)`]: {
          color: colorError,
          "&:hover": {
            color: colorTextLightSolid,
            backgroundColor: colorError
          }
        }
      }
    }
  };
};
const genBaseStyle$1 = (token) => {
  const {
    componentCls,
    menuCls,
    zIndexPopup,
    dropdownArrowDistance,
    sizePopupArrow,
    antCls,
    iconCls,
    motionDurationMid,
    paddingBlock,
    fontSize,
    dropdownEdgeChildPadding,
    colorTextDisabled,
    fontSizeIcon,
    controlPaddingHorizontal,
    colorBgElevated
  } = token;
  return [
    {
      [componentCls]: {
        position: "absolute",
        top: -9999,
        left: {
          _skip_check_: true,
          value: -9999
        },
        zIndex: zIndexPopup,
        display: "block",
        // A placeholder out of dropdown visible range to avoid close when user moving
        "&::before": {
          position: "absolute",
          insetBlock: token.calc(sizePopupArrow).div(2).sub(dropdownArrowDistance).equal(),
          // insetInlineStart: -7, // FIXME: Seems not work for hidden element
          zIndex: -9999,
          opacity: 1e-4,
          content: '""'
        },
        // Makes vertical dropdowns have a scrollbar once they become taller than the viewport.
        "&-menu-vertical": {
          maxHeight: "100vh",
          overflowY: "auto"
        },
        [`&-trigger${antCls}-btn`]: {
          [`& > ${iconCls}-down, & > ${antCls}-btn-icon > ${iconCls}-down`]: {
            fontSize: fontSizeIcon
          }
        },
        [`${componentCls}-wrap`]: {
          position: "relative",
          [`${antCls}-btn > ${iconCls}-down`]: {
            fontSize: fontSizeIcon
          },
          [`${iconCls}-down::before`]: {
            transition: `transform ${motionDurationMid}`
          }
        },
        [`${componentCls}-wrap-open`]: {
          [`${iconCls}-down::before`]: {
            transform: `rotate(180deg)`
          }
        },
        [`
        &-hidden,
        &-menu-hidden,
        &-menu-submenu-hidden
      `]: {
          display: "none"
        },
        // =============================================================
        // ==                         Motion                          ==
        // =============================================================
        // When position is not enough for dropdown, the placement will revert.
        // We will handle this with revert motion name.
        [`&${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottomRight,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottomRight`]: {
          animationName: slideUpIn
        },
        [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-top,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-top,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-topRight`]: {
          animationName: slideDownIn
        },
        [`&${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottomRight`]: {
          animationName: slideUpOut
        },
        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-top,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-topRight`]: {
          animationName: slideDownOut
        }
      }
    },
    // =============================================================
    // ==                        Arrow style                      ==
    // =============================================================
    getArrowStyle(token, colorBgElevated, {
      arrowPlacement: {
        top: true,
        bottom: true
      }
    }),
    {
      // =============================================================
      // ==                          Menu                           ==
      // =============================================================
      [`${componentCls} ${menuCls}`]: {
        position: "relative",
        margin: 0
      },
      [`${menuCls}-submenu-popup`]: {
        position: "absolute",
        zIndex: zIndexPopup,
        background: "transparent",
        boxShadow: "none",
        transformOrigin: "0 0",
        "ul, li": {
          listStyle: "none",
          margin: 0
        }
      },
      [`${componentCls}, ${componentCls}-menu-submenu`]: Object.assign(Object.assign({}, resetComponent(token)), {
        [menuCls]: Object.assign(Object.assign({
          padding: dropdownEdgeChildPadding,
          listStyleType: "none",
          backgroundColor: colorBgElevated,
          backgroundClip: "padding-box",
          borderRadius: token.borderRadiusLG,
          outline: "none",
          boxShadow: token.boxShadowSecondary
        }, genFocusStyle(token)), {
          "&:empty": {
            padding: 0,
            boxShadow: "none"
          },
          [`${menuCls}-item-group-title`]: {
            padding: `${unit(paddingBlock)} ${unit(controlPaddingHorizontal)}`,
            color: token.colorTextDescription,
            transition: `all ${motionDurationMid}`
          },
          // ======================= Item Content =======================
          [`${menuCls}-item`]: {
            position: "relative",
            display: "flex",
            alignItems: "center"
          },
          [`${menuCls}-item-icon`]: {
            minWidth: fontSize,
            marginInlineEnd: token.marginXS,
            fontSize: token.fontSizeSM
          },
          [`${menuCls}-title-content`]: {
            flex: "auto",
            "&-with-extra": {
              display: "inline-flex",
              alignItems: "center",
              width: "100%"
            },
            "> a": {
              color: "inherit",
              transition: `all ${motionDurationMid}`,
              "&:hover": {
                color: "inherit"
              },
              "&::after": {
                position: "absolute",
                inset: 0,
                content: '""'
              }
            },
            [`${menuCls}-item-extra`]: {
              paddingInlineStart: token.padding,
              marginInlineStart: "auto",
              fontSize: token.fontSizeSM,
              color: token.colorTextDescription
            }
          },
          // =========================== Item ===========================
          [`${menuCls}-item, ${menuCls}-submenu-title`]: Object.assign(Object.assign({
            display: "flex",
            margin: 0,
            padding: `${unit(paddingBlock)} ${unit(controlPaddingHorizontal)}`,
            color: token.colorText,
            fontWeight: "normal",
            fontSize,
            lineHeight: token.lineHeight,
            cursor: "pointer",
            transition: `all ${motionDurationMid}`,
            borderRadius: token.borderRadiusSM,
            "&:hover, &-active": {
              backgroundColor: token.controlItemBgHover
            }
          }, genFocusStyle(token)), {
            "&-selected": {
              color: token.colorPrimary,
              backgroundColor: token.controlItemBgActive,
              "&:hover, &-active": {
                backgroundColor: token.controlItemBgActiveHover
              }
            },
            "&-disabled": {
              color: colorTextDisabled,
              cursor: "not-allowed",
              "&:hover": {
                color: colorTextDisabled,
                backgroundColor: colorBgElevated,
                cursor: "not-allowed"
              },
              a: {
                pointerEvents: "none"
              }
            },
            "&-divider": {
              height: 1,
              // By design
              margin: `${unit(token.marginXXS)} 0`,
              overflow: "hidden",
              lineHeight: 0,
              backgroundColor: token.colorSplit
            },
            [`${componentCls}-menu-submenu-expand-icon`]: {
              position: "absolute",
              insetInlineEnd: token.paddingXS,
              [`${componentCls}-menu-submenu-arrow-icon`]: {
                marginInlineEnd: "0 !important",
                color: token.colorIcon,
                fontSize: fontSizeIcon,
                fontStyle: "normal"
              }
            }
          }),
          [`${menuCls}-item-group-list`]: {
            margin: `0 ${unit(token.marginXS)}`,
            padding: 0,
            listStyle: "none"
          },
          [`${menuCls}-submenu-title`]: {
            paddingInlineEnd: token.calc(controlPaddingHorizontal).add(token.fontSizeSM).equal()
          },
          [`${menuCls}-submenu-vertical`]: {
            position: "relative"
          },
          [`${menuCls}-submenu${menuCls}-submenu-disabled ${componentCls}-menu-submenu-title`]: {
            [`&, ${componentCls}-menu-submenu-arrow-icon`]: {
              color: colorTextDisabled,
              backgroundColor: colorBgElevated,
              cursor: "not-allowed"
            }
          },
          // https://github.com/ant-design/ant-design/issues/19264
          [`${menuCls}-submenu-selected ${componentCls}-menu-submenu-title`]: {
            color: token.colorPrimary
          }
        })
      })
    },
    // Follow code may reuse in other components
    [initSlideMotion(token, "slide-up"), initSlideMotion(token, "slide-down"), initMoveMotion(token, "move-up"), initMoveMotion(token, "move-down"), initZoomMotion(token, "zoom-big")]
  ];
};
const prepareComponentToken$3 = (token) => Object.assign(Object.assign({
  zIndexPopup: token.zIndexPopupBase + 50,
  paddingBlock: (token.controlHeight - token.fontSize * token.lineHeight) / 2
}, getArrowOffsetToken({
  contentRadius: token.borderRadiusLG,
  limitVerticalRadius: true
})), getArrowToken(token));
const useStyle$4 = genStyleHooks("Dropdown", (token) => {
  const {
    marginXXS,
    sizePopupArrow,
    paddingXXS,
    componentCls
  } = token;
  const dropdownToken = merge(token, {
    menuCls: `${componentCls}-menu`,
    dropdownArrowDistance: token.calc(sizePopupArrow).div(2).add(marginXXS).equal(),
    dropdownEdgeChildPadding: paddingXXS
  });
  return [genBaseStyle$1(dropdownToken), genStatusStyle(dropdownToken)];
}, prepareComponentToken$3, {
  resetStyle: false
});
const Dropdown$1 = (props) => {
  var _a;
  const {
    menu,
    arrow,
    prefixCls: customizePrefixCls,
    children,
    trigger,
    disabled,
    dropdownRender,
    popupRender,
    getPopupContainer,
    overlayClassName,
    rootClassName,
    overlayStyle,
    open,
    onOpenChange,
    // Deprecated
    visible,
    onVisibleChange,
    mouseEnterDelay = 0.15,
    mouseLeaveDelay = 0.1,
    autoAdjustOverflow = true,
    placement = "",
    overlay,
    transitionName,
    destroyOnHidden,
    destroyPopupOnHide
  } = props;
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
    dropdown
  } = reactExports.useContext(ConfigContext);
  const mergedPopupRender = popupRender || dropdownRender;
  devUseWarning();
  const memoTransitionName = reactExports.useMemo(() => {
    const rootPrefixCls = getPrefixCls();
    if (transitionName !== void 0) {
      return transitionName;
    }
    if (placement.includes("top")) {
      return `${rootPrefixCls}-slide-down`;
    }
    return `${rootPrefixCls}-slide-up`;
  }, [getPrefixCls, placement, transitionName]);
  const memoPlacement = reactExports.useMemo(() => {
    if (!placement) {
      return direction === "rtl" ? "bottomRight" : "bottomLeft";
    }
    if (placement.includes("Center")) {
      return placement.slice(0, placement.indexOf("Center"));
    }
    return placement;
  }, [placement, direction]);
  const prefixCls = getPrefixCls("dropdown", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$4(prefixCls, rootCls);
  const [, token] = useToken();
  const child = reactExports.Children.only(isPrimitive(children) ? /* @__PURE__ */ reactExports.createElement("span", null, children) : children);
  const popupTrigger = cloneElement(child, {
    className: classNames(`${prefixCls}-trigger`, {
      [`${prefixCls}-rtl`]: direction === "rtl"
    }, child.props.className),
    disabled: (_a = child.props.disabled) !== null && _a !== void 0 ? _a : disabled
  });
  const triggerActions = disabled ? [] : trigger;
  const alignPoint = !!(triggerActions === null || triggerActions === void 0 ? void 0 : triggerActions.includes("contextMenu"));
  const [mergedOpen, setOpen] = useMergedState(false, {
    value: open !== null && open !== void 0 ? open : visible
  });
  const onInnerOpenChange = useEvent((nextOpen) => {
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(nextOpen, {
      source: "trigger"
    });
    onVisibleChange === null || onVisibleChange === void 0 ? void 0 : onVisibleChange(nextOpen);
    setOpen(nextOpen);
  });
  const overlayClassNameCustomized = classNames(overlayClassName, rootClassName, hashId, cssVarCls, rootCls, dropdown === null || dropdown === void 0 ? void 0 : dropdown.className, {
    [`${prefixCls}-rtl`]: direction === "rtl"
  });
  const builtinPlacements = getPlacements({
    arrowPointAtCenter: typeof arrow === "object" && arrow.pointAtCenter,
    autoAdjustOverflow,
    offset: token.marginXXS,
    arrowWidth: arrow ? token.sizePopupArrow : 0,
    borderRadius: token.borderRadius
  });
  const onMenuClick = useEvent(() => {
    if ((menu === null || menu === void 0 ? void 0 : menu.selectable) && (menu === null || menu === void 0 ? void 0 : menu.multiple)) {
      return;
    }
    onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(false, {
      source: "menu"
    });
    setOpen(false);
  });
  const renderOverlay = () => {
    let overlayNode;
    if (menu === null || menu === void 0 ? void 0 : menu.items) {
      overlayNode = /* @__PURE__ */ reactExports.createElement(Menu, Object.assign({}, menu));
    } else if (typeof overlay === "function") {
      overlayNode = overlay();
    } else {
      overlayNode = overlay;
    }
    if (mergedPopupRender) {
      overlayNode = mergedPopupRender(overlayNode);
    }
    overlayNode = reactExports.Children.only(typeof overlayNode === "string" ? /* @__PURE__ */ reactExports.createElement("span", null, overlayNode) : overlayNode);
    return /* @__PURE__ */ reactExports.createElement(OverrideProvider, {
      prefixCls: `${prefixCls}-menu`,
      rootClassName: classNames(cssVarCls, rootCls),
      expandIcon: /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-menu-submenu-arrow`
      }, direction === "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$c, {
        className: `${prefixCls}-menu-submenu-arrow-icon`
      }) : /* @__PURE__ */ reactExports.createElement(RefIcon$e, {
        className: `${prefixCls}-menu-submenu-arrow-icon`
      })),
      mode: "vertical",
      selectable: false,
      onClick: onMenuClick,
      validator: ({
        mode
      }) => {
      }
    }, overlayNode);
  };
  const [zIndex, contextZIndex] = useZIndex("Dropdown", overlayStyle === null || overlayStyle === void 0 ? void 0 : overlayStyle.zIndex);
  let renderNode = /* @__PURE__ */ reactExports.createElement(Dropdown$2, Object.assign({
    alignPoint
  }, omit(props, ["rootClassName"]), {
    mouseEnterDelay,
    mouseLeaveDelay,
    visible: mergedOpen,
    builtinPlacements,
    arrow: !!arrow,
    overlayClassName: overlayClassNameCustomized,
    prefixCls,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    transitionName: memoTransitionName,
    trigger: triggerActions,
    overlay: renderOverlay,
    placement: memoPlacement,
    onVisibleChange: onInnerOpenChange,
    overlayStyle: Object.assign(Object.assign(Object.assign({}, dropdown === null || dropdown === void 0 ? void 0 : dropdown.style), overlayStyle), {
      zIndex
    }),
    autoDestroy: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : destroyPopupOnHide
  }), popupTrigger);
  if (zIndex) {
    renderNode = /* @__PURE__ */ reactExports.createElement(zIndexContext.Provider, {
      value: contextZIndex
    }, renderNode);
  }
  return wrapCSSVar(renderNode);
};
const PurePanel = genPurePanel(Dropdown$1, "align", void 0, "dropdown", (prefixCls) => prefixCls);
const WrapPurePanel = (props) => /* @__PURE__ */ reactExports.createElement(PurePanel, Object.assign({}, props), /* @__PURE__ */ reactExports.createElement("span", null));
Dropdown$1._InternalPanelDoNotUseOrYouWillBeFired = WrapPurePanel;
function getEntity(keyEntities, key) {
  return keyEntities[key];
}
var _excluded$9 = ["children"];
function getPosition(level, index) {
  return "".concat(level, "-").concat(index);
}
function isTreeNode(node) {
  return node && node.type && node.type.isTreeNode;
}
function getKey(key, pos) {
  if (key !== null && key !== void 0) {
    return key;
  }
  return pos;
}
function fillFieldNames(fieldNames) {
  var _ref = fieldNames || {}, title = _ref.title, _title = _ref._title, key = _ref.key, children = _ref.children;
  var mergedTitle = title || "title";
  return {
    title: mergedTitle,
    _title: _title || [mergedTitle],
    key: key || "key",
    children: children || "children"
  };
}
function convertTreeToData(rootNodes) {
  function dig(node) {
    var treeNodes = toArray$1(node);
    return treeNodes.map(function(treeNode) {
      if (!isTreeNode(treeNode)) {
        warningOnce(!treeNode, "Tree/TreeNode can only accept TreeNode as children.");
        return null;
      }
      var key = treeNode.key;
      var _treeNode$props = treeNode.props, children = _treeNode$props.children, rest = _objectWithoutProperties(_treeNode$props, _excluded$9);
      var dataNode = _objectSpread2({
        key
      }, rest);
      var parsedChildren = dig(children);
      if (parsedChildren.length) {
        dataNode.children = parsedChildren;
      }
      return dataNode;
    }).filter(function(dataNode) {
      return dataNode;
    });
  }
  return dig(rootNodes);
}
function flattenTreeData(treeNodeList, expandedKeys, fieldNames) {
  var _fillFieldNames = fillFieldNames(fieldNames), fieldTitles = _fillFieldNames._title, fieldKey = _fillFieldNames.key, fieldChildren = _fillFieldNames.children;
  var expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
  var flattenList = [];
  function dig(list) {
    var parent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    return list.map(function(treeNode, index) {
      var pos = getPosition(parent ? parent.pos : "0", index);
      var mergedKey = getKey(treeNode[fieldKey], pos);
      var mergedTitle;
      for (var i = 0; i < fieldTitles.length; i += 1) {
        var fieldTitle = fieldTitles[i];
        if (treeNode[fieldTitle] !== void 0) {
          mergedTitle = treeNode[fieldTitle];
          break;
        }
      }
      var flattenNode = Object.assign(omit(treeNode, [].concat(_toConsumableArray(fieldTitles), [fieldKey, fieldChildren])), {
        title: mergedTitle,
        key: mergedKey,
        parent,
        pos,
        children: null,
        data: treeNode,
        isStart: [].concat(_toConsumableArray(parent ? parent.isStart : []), [index === 0]),
        isEnd: [].concat(_toConsumableArray(parent ? parent.isEnd : []), [index === list.length - 1])
      });
      flattenList.push(flattenNode);
      if (expandedKeys === true || expandedKeySet.has(mergedKey)) {
        flattenNode.children = dig(treeNode[fieldChildren] || [], flattenNode);
      } else {
        flattenNode.children = [];
      }
      return flattenNode;
    });
  }
  dig(treeNodeList);
  return flattenList;
}
function traverseDataNodes(dataNodes, callback, config) {
  var mergedConfig = {};
  if (_typeof(config) === "object") {
    mergedConfig = config;
  } else {
    mergedConfig = {
      externalGetKey: config
    };
  }
  mergedConfig = mergedConfig || {};
  var _mergedConfig = mergedConfig, childrenPropName = _mergedConfig.childrenPropName, externalGetKey = _mergedConfig.externalGetKey, fieldNames = _mergedConfig.fieldNames;
  var _fillFieldNames2 = fillFieldNames(fieldNames), fieldKey = _fillFieldNames2.key, fieldChildren = _fillFieldNames2.children;
  var mergeChildrenPropName = childrenPropName || fieldChildren;
  var syntheticGetKey;
  if (externalGetKey) {
    if (typeof externalGetKey === "string") {
      syntheticGetKey = function syntheticGetKey2(node) {
        return node[externalGetKey];
      };
    } else if (typeof externalGetKey === "function") {
      syntheticGetKey = function syntheticGetKey2(node) {
        return externalGetKey(node);
      };
    }
  } else {
    syntheticGetKey = function syntheticGetKey2(node, pos) {
      return getKey(node[fieldKey], pos);
    };
  }
  function processNode(node, index, parent, pathNodes) {
    var children = node ? node[mergeChildrenPropName] : dataNodes;
    var pos = node ? getPosition(parent.pos, index) : "0";
    var connectNodes = node ? [].concat(_toConsumableArray(pathNodes), [node]) : [];
    if (node) {
      var key = syntheticGetKey(node, pos);
      var _data = {
        node,
        index,
        pos,
        key,
        parentPos: parent.node ? parent.pos : null,
        level: parent.level + 1,
        nodes: connectNodes
      };
      callback(_data);
    }
    if (children) {
      children.forEach(function(subNode, subIndex) {
        processNode(subNode, subIndex, {
          node,
          pos,
          level: parent ? parent.level + 1 : -1
        }, connectNodes);
      });
    }
  }
  processNode(null);
}
function convertDataToEntities(dataNodes) {
  var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, initWrapper = _ref2.initWrapper, processEntity = _ref2.processEntity, onProcessFinished = _ref2.onProcessFinished, externalGetKey = _ref2.externalGetKey, childrenPropName = _ref2.childrenPropName, fieldNames = _ref2.fieldNames;
  var legacyExternalGetKey = arguments.length > 2 ? arguments[2] : void 0;
  var mergedExternalGetKey = externalGetKey || legacyExternalGetKey;
  var posEntities = {};
  var keyEntities = {};
  var wrapper = {
    posEntities,
    keyEntities
  };
  if (initWrapper) {
    wrapper = initWrapper(wrapper) || wrapper;
  }
  traverseDataNodes(dataNodes, function(item) {
    var node = item.node, index = item.index, pos = item.pos, key = item.key, parentPos = item.parentPos, level = item.level, nodes = item.nodes;
    var entity = {
      node,
      nodes,
      index,
      key,
      pos,
      level
    };
    var mergedKey = getKey(key, pos);
    posEntities[pos] = entity;
    keyEntities[mergedKey] = entity;
    entity.parent = posEntities[parentPos];
    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }
    if (processEntity) {
      processEntity(entity, wrapper);
    }
  }, {
    externalGetKey: mergedExternalGetKey,
    childrenPropName,
    fieldNames
  });
  if (onProcessFinished) {
    onProcessFinished(wrapper);
  }
  return wrapper;
}
function getTreeNodeProps(key, _ref3) {
  var expandedKeys = _ref3.expandedKeys, selectedKeys = _ref3.selectedKeys, loadedKeys = _ref3.loadedKeys, loadingKeys = _ref3.loadingKeys, checkedKeys = _ref3.checkedKeys, halfCheckedKeys = _ref3.halfCheckedKeys, dragOverNodeKey = _ref3.dragOverNodeKey, dropPosition = _ref3.dropPosition, keyEntities = _ref3.keyEntities;
  var entity = getEntity(keyEntities, key);
  var treeNodeProps = {
    eventKey: key,
    expanded: expandedKeys.indexOf(key) !== -1,
    selected: selectedKeys.indexOf(key) !== -1,
    loaded: loadedKeys.indexOf(key) !== -1,
    loading: loadingKeys.indexOf(key) !== -1,
    checked: checkedKeys.indexOf(key) !== -1,
    halfChecked: halfCheckedKeys.indexOf(key) !== -1,
    pos: String(entity ? entity.pos : ""),
    // [Legacy] Drag props
    // Since the interaction of drag is changed, the semantic of the props are
    // not accuracy, I think it should be finally removed
    dragOver: dragOverNodeKey === key && dropPosition === 0,
    dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
    dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1
  };
  return treeNodeProps;
}
function convertNodePropsToEventData(props) {
  var data = props.data, expanded = props.expanded, selected = props.selected, checked = props.checked, loaded = props.loaded, loading = props.loading, halfChecked = props.halfChecked, dragOver = props.dragOver, dragOverGapTop = props.dragOverGapTop, dragOverGapBottom = props.dragOverGapBottom, pos = props.pos, active = props.active, eventKey = props.eventKey;
  var eventData = _objectSpread2(_objectSpread2({}, data), {}, {
    expanded,
    selected,
    checked,
    loaded,
    loading,
    halfChecked,
    dragOver,
    dragOverGapTop,
    dragOverGapBottom,
    pos,
    active,
    key: eventKey
  });
  if (!("props" in eventData)) {
    Object.defineProperty(eventData, "props", {
      get: function get2() {
        warningOnce(false, "Second param return from event is node data instead of TreeNode instance. Please read value directly instead of reading from `props`.");
        return props;
      }
    });
  }
  return eventData;
}
function removeFromCheckedKeys(halfCheckedKeys, checkedKeys) {
  var filteredKeys = /* @__PURE__ */ new Set();
  halfCheckedKeys.forEach(function(key) {
    if (!checkedKeys.has(key)) {
      filteredKeys.add(key);
    }
  });
  return filteredKeys;
}
function isCheckDisabled(node) {
  var _ref = node || {}, disabled = _ref.disabled, disableCheckbox = _ref.disableCheckbox, checkable = _ref.checkable;
  return !!(disabled || disableCheckbox) || checkable === false;
}
function fillConductCheck(keys, levelEntities, maxLevel, syntheticGetCheckDisabled) {
  var checkedKeys = new Set(keys);
  var halfCheckedKeys = /* @__PURE__ */ new Set();
  for (var level = 0; level <= maxLevel; level += 1) {
    var entities = levelEntities.get(level) || /* @__PURE__ */ new Set();
    entities.forEach(function(entity) {
      var key = entity.key, node = entity.node, _entity$children = entity.children, children = _entity$children === void 0 ? [] : _entity$children;
      if (checkedKeys.has(key) && !syntheticGetCheckDisabled(node)) {
        children.filter(function(childEntity) {
          return !syntheticGetCheckDisabled(childEntity.node);
        }).forEach(function(childEntity) {
          checkedKeys.add(childEntity.key);
        });
      }
    });
  }
  var visitedKeys = /* @__PURE__ */ new Set();
  for (var _level = maxLevel; _level >= 0; _level -= 1) {
    var _entities = levelEntities.get(_level) || /* @__PURE__ */ new Set();
    _entities.forEach(function(entity) {
      var parent = entity.parent, node = entity.node;
      if (syntheticGetCheckDisabled(node) || !entity.parent || visitedKeys.has(entity.parent.key)) {
        return;
      }
      if (syntheticGetCheckDisabled(entity.parent.node)) {
        visitedKeys.add(parent.key);
        return;
      }
      var allChecked = true;
      var partialChecked = false;
      (parent.children || []).filter(function(childEntity) {
        return !syntheticGetCheckDisabled(childEntity.node);
      }).forEach(function(_ref2) {
        var key = _ref2.key;
        var checked = checkedKeys.has(key);
        if (allChecked && !checked) {
          allChecked = false;
        }
        if (!partialChecked && (checked || halfCheckedKeys.has(key))) {
          partialChecked = true;
        }
      });
      if (allChecked) {
        checkedKeys.add(parent.key);
      }
      if (partialChecked) {
        halfCheckedKeys.add(parent.key);
      }
      visitedKeys.add(parent.key);
    });
  }
  return {
    checkedKeys: Array.from(checkedKeys),
    halfCheckedKeys: Array.from(removeFromCheckedKeys(halfCheckedKeys, checkedKeys))
  };
}
function cleanConductCheck(keys, halfKeys, levelEntities, maxLevel, syntheticGetCheckDisabled) {
  var checkedKeys = new Set(keys);
  var halfCheckedKeys = new Set(halfKeys);
  for (var level = 0; level <= maxLevel; level += 1) {
    var entities = levelEntities.get(level) || /* @__PURE__ */ new Set();
    entities.forEach(function(entity) {
      var key = entity.key, node = entity.node, _entity$children2 = entity.children, children = _entity$children2 === void 0 ? [] : _entity$children2;
      if (!checkedKeys.has(key) && !halfCheckedKeys.has(key) && !syntheticGetCheckDisabled(node)) {
        children.filter(function(childEntity) {
          return !syntheticGetCheckDisabled(childEntity.node);
        }).forEach(function(childEntity) {
          checkedKeys.delete(childEntity.key);
        });
      }
    });
  }
  halfCheckedKeys = /* @__PURE__ */ new Set();
  var visitedKeys = /* @__PURE__ */ new Set();
  for (var _level2 = maxLevel; _level2 >= 0; _level2 -= 1) {
    var _entities2 = levelEntities.get(_level2) || /* @__PURE__ */ new Set();
    _entities2.forEach(function(entity) {
      var parent = entity.parent, node = entity.node;
      if (syntheticGetCheckDisabled(node) || !entity.parent || visitedKeys.has(entity.parent.key)) {
        return;
      }
      if (syntheticGetCheckDisabled(entity.parent.node)) {
        visitedKeys.add(parent.key);
        return;
      }
      var allChecked = true;
      var partialChecked = false;
      (parent.children || []).filter(function(childEntity) {
        return !syntheticGetCheckDisabled(childEntity.node);
      }).forEach(function(_ref3) {
        var key = _ref3.key;
        var checked = checkedKeys.has(key);
        if (allChecked && !checked) {
          allChecked = false;
        }
        if (!partialChecked && (checked || halfCheckedKeys.has(key))) {
          partialChecked = true;
        }
      });
      if (!allChecked) {
        checkedKeys.delete(parent.key);
      }
      if (partialChecked) {
        halfCheckedKeys.add(parent.key);
      }
      visitedKeys.add(parent.key);
    });
  }
  return {
    checkedKeys: Array.from(checkedKeys),
    halfCheckedKeys: Array.from(removeFromCheckedKeys(halfCheckedKeys, checkedKeys))
  };
}
function conductCheck(keyList, checked, keyEntities, getCheckDisabled) {
  var warningMissKeys = [];
  var syntheticGetCheckDisabled;
  if (getCheckDisabled) {
    syntheticGetCheckDisabled = getCheckDisabled;
  } else {
    syntheticGetCheckDisabled = isCheckDisabled;
  }
  var keys = new Set(keyList.filter(function(key) {
    var hasEntity = !!getEntity(keyEntities, key);
    if (!hasEntity) {
      warningMissKeys.push(key);
    }
    return hasEntity;
  }));
  var levelEntities = /* @__PURE__ */ new Map();
  var maxLevel = 0;
  Object.keys(keyEntities).forEach(function(key) {
    var entity = keyEntities[key];
    var level = entity.level;
    var levelSet = levelEntities.get(level);
    if (!levelSet) {
      levelSet = /* @__PURE__ */ new Set();
      levelEntities.set(level, levelSet);
    }
    levelSet.add(entity);
    maxLevel = Math.max(maxLevel, level);
  });
  warningOnce(!warningMissKeys.length, "Tree missing follow keys: ".concat(warningMissKeys.slice(0, 100).map(function(key) {
    return "'".concat(key, "'");
  }).join(", ")));
  var result;
  if (checked === true) {
    result = fillConductCheck(keys, levelEntities, maxLevel, syntheticGetCheckDisabled);
  } else {
    result = cleanConductCheck(keys, checked.halfCheckedKeys, levelEntities, maxLevel, syntheticGetCheckDisabled);
  }
  return result;
}
const genCheckboxStyle = (token) => {
  const {
    checkboxCls
  } = token;
  const wrapperCls = `${checkboxCls}-wrapper`;
  return [
    // ===================== Basic =====================
    {
      // Group
      [`${checkboxCls}-group`]: Object.assign(Object.assign({}, resetComponent(token)), {
        display: "inline-flex",
        flexWrap: "wrap",
        columnGap: token.marginXS,
        // Group > Grid
        [`> ${token.antCls}-row`]: {
          flex: 1
        }
      }),
      // Wrapper
      [wrapperCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        display: "inline-flex",
        alignItems: "baseline",
        cursor: "pointer",
        // Fix checkbox & radio in flex align #30260
        "&:after": {
          display: "inline-block",
          width: 0,
          overflow: "hidden",
          content: "'\\a0'"
        },
        // Checkbox near checkbox
        [`& + ${wrapperCls}`]: {
          marginInlineStart: 0
        },
        [`&${wrapperCls}-in-form-item`]: {
          'input[type="checkbox"]': {
            width: 14,
            // FIXME: magic
            height: 14
            // FIXME: magic
          }
        }
      }),
      // Wrapper > Checkbox
      [checkboxCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        position: "relative",
        whiteSpace: "nowrap",
        lineHeight: 1,
        cursor: "pointer",
        borderRadius: token.borderRadiusSM,
        // To make alignment right when `controlHeight` is changed
        // Ref: https://github.com/ant-design/ant-design/issues/41564
        alignSelf: "center",
        // Wrapper > Checkbox > input
        [`${checkboxCls}-input`]: {
          position: "absolute",
          // Since baseline align will get additional space offset,
          // we need to move input to top to make it align with text.
          // Ref: https://github.com/ant-design/ant-design/issues/38926#issuecomment-1486137799
          inset: 0,
          zIndex: 1,
          cursor: "pointer",
          opacity: 0,
          margin: 0,
          [`&:focus-visible + ${checkboxCls}-inner`]: genFocusOutline(token)
        },
        // Wrapper > Checkbox > inner
        [`${checkboxCls}-inner`]: {
          boxSizing: "border-box",
          display: "block",
          width: token.checkboxSize,
          height: token.checkboxSize,
          direction: "ltr",
          backgroundColor: token.colorBgContainer,
          border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderRadius: token.borderRadiusSM,
          borderCollapse: "separate",
          transition: `all ${token.motionDurationSlow}`,
          "&:after": {
            boxSizing: "border-box",
            position: "absolute",
            top: "50%",
            insetInlineStart: "25%",
            display: "table",
            width: token.calc(token.checkboxSize).div(14).mul(5).equal(),
            height: token.calc(token.checkboxSize).div(14).mul(8).equal(),
            border: `${unit(token.lineWidthBold)} solid ${token.colorWhite}`,
            borderTop: 0,
            borderInlineStart: 0,
            transform: "rotate(45deg) scale(0) translate(-50%,-50%)",
            opacity: 0,
            content: '""',
            transition: `all ${token.motionDurationFast} ${token.motionEaseInBack}, opacity ${token.motionDurationFast}`
          }
        },
        // Wrapper > Checkbox + Text
        "& + span": {
          paddingInlineStart: token.paddingXS,
          paddingInlineEnd: token.paddingXS
        }
      })
    },
    // ===================== Hover =====================
    {
      // Wrapper & Wrapper > Checkbox
      [`
        ${wrapperCls}:not(${wrapperCls}-disabled),
        ${checkboxCls}:not(${checkboxCls}-disabled)
      `]: {
        [`&:hover ${checkboxCls}-inner`]: {
          borderColor: token.colorPrimary
        }
      },
      [`${wrapperCls}:not(${wrapperCls}-disabled)`]: {
        [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled) ${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimaryHover,
          borderColor: "transparent"
        },
        [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled):after`]: {
          borderColor: token.colorPrimaryHover
        }
      }
    },
    // ==================== Checked ====================
    {
      // Wrapper > Checkbox
      [`${checkboxCls}-checked`]: {
        [`${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimary,
          borderColor: token.colorPrimary,
          "&:after": {
            opacity: 1,
            transform: "rotate(45deg) scale(1) translate(-50%,-50%)",
            transition: `all ${token.motionDurationMid} ${token.motionEaseOutBack} ${token.motionDurationFast}`
          }
        }
      },
      [`
        ${wrapperCls}-checked:not(${wrapperCls}-disabled),
        ${checkboxCls}-checked:not(${checkboxCls}-disabled)
      `]: {
        [`&:hover ${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimaryHover,
          borderColor: "transparent"
        }
      }
    },
    // ================= Indeterminate =================
    {
      [checkboxCls]: {
        "&-indeterminate": {
          "&": {
            // Wrapper > Checkbox > inner
            [`${checkboxCls}-inner`]: {
              backgroundColor: `${token.colorBgContainer}`,
              borderColor: `${token.colorBorder}`,
              "&:after": {
                top: "50%",
                insetInlineStart: "50%",
                width: token.calc(token.fontSizeLG).div(2).equal(),
                height: token.calc(token.fontSizeLG).div(2).equal(),
                backgroundColor: token.colorPrimary,
                border: 0,
                transform: "translate(-50%, -50%) scale(1)",
                opacity: 1,
                content: '""'
              }
            },
            // https://github.com/ant-design/ant-design/issues/50074
            [`&:hover ${checkboxCls}-inner`]: {
              backgroundColor: `${token.colorBgContainer}`,
              borderColor: `${token.colorPrimary}`
            }
          }
        }
      }
    },
    // ==================== Disable ====================
    {
      // Wrapper
      [`${wrapperCls}-disabled`]: {
        cursor: "not-allowed"
      },
      // Wrapper > Checkbox
      [`${checkboxCls}-disabled`]: {
        // Wrapper > Checkbox > input
        [`&, ${checkboxCls}-input`]: {
          cursor: "not-allowed",
          // Disabled for native input to enable Tooltip event handler
          // ref: https://github.com/ant-design/ant-design/issues/39822#issuecomment-1365075901
          pointerEvents: "none"
        },
        // Wrapper > Checkbox > inner
        [`${checkboxCls}-inner`]: {
          background: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,
          "&:after": {
            borderColor: token.colorTextDisabled
          }
        },
        "&:after": {
          display: "none"
        },
        "& + span": {
          color: token.colorTextDisabled
        },
        [`&${checkboxCls}-indeterminate ${checkboxCls}-inner::after`]: {
          background: token.colorTextDisabled
        }
      }
    }
  ];
};
function getStyle(prefixCls, token) {
  const checkboxToken = merge(token, {
    checkboxCls: `.${prefixCls}`,
    checkboxSize: token.controlInteractiveSize
  });
  return genCheckboxStyle(checkboxToken);
}
const useStyle$3 = genStyleHooks("Checkbox", (token, {
  prefixCls
}) => [getStyle(prefixCls, token)]);
const GroupContext = /* @__PURE__ */ React.createContext(null);
var __rest$5 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalCheckbox = (props, ref) => {
  var _a;
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    indeterminate = false,
    style,
    onMouseEnter,
    onMouseLeave,
    skipGroup = false,
    disabled
  } = props, restProps = __rest$5(props, ["prefixCls", "className", "rootClassName", "children", "indeterminate", "style", "onMouseEnter", "onMouseLeave", "skipGroup", "disabled"]);
  const {
    getPrefixCls,
    direction,
    checkbox
  } = reactExports.useContext(ConfigContext);
  const checkboxGroup = reactExports.useContext(GroupContext);
  const {
    isFormItemInput
  } = reactExports.useContext(FormItemInputContext);
  const contextDisabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = (_a = (checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.disabled) || disabled) !== null && _a !== void 0 ? _a : contextDisabled;
  const prevValue = reactExports.useRef(restProps.value);
  const checkboxRef = reactExports.useRef(null);
  const mergedRef = composeRef(ref, checkboxRef);
  reactExports.useEffect(() => {
    checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.registerValue(restProps.value);
  }, []);
  reactExports.useEffect(() => {
    if (skipGroup) {
      return;
    }
    if (restProps.value !== prevValue.current) {
      checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.cancelValue(prevValue.current);
      checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.registerValue(restProps.value);
      prevValue.current = restProps.value;
    }
    return () => checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.cancelValue(restProps.value);
  }, [restProps.value]);
  reactExports.useEffect(() => {
    var _a2;
    if ((_a2 = checkboxRef.current) === null || _a2 === void 0 ? void 0 : _a2.input) {
      checkboxRef.current.input.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  const prefixCls = getPrefixCls("checkbox", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$3(prefixCls, rootCls);
  const checkboxProps = Object.assign({}, restProps);
  if (checkboxGroup && !skipGroup) {
    checkboxProps.onChange = (...args) => {
      if (restProps.onChange) {
        restProps.onChange.apply(restProps, args);
      }
      if (checkboxGroup.toggleOption) {
        checkboxGroup.toggleOption({
          label: children,
          value: restProps.value
        });
      }
    };
    checkboxProps.name = checkboxGroup.name;
    checkboxProps.checked = checkboxGroup.value.includes(restProps.value);
  }
  const classString = classNames(`${prefixCls}-wrapper`, {
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
    [`${prefixCls}-wrapper-disabled`]: mergedDisabled,
    [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput
  }, checkbox === null || checkbox === void 0 ? void 0 : checkbox.className, className, rootClassName, cssVarCls, rootCls, hashId);
  const checkboxClass = classNames({
    [`${prefixCls}-indeterminate`]: indeterminate
  }, TARGET_CLS, hashId);
  const [onLabelClick, onInputClick] = useBubbleLock(checkboxProps.onClick);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Wave, {
    component: "Checkbox",
    disabled: mergedDisabled
  }, /* @__PURE__ */ reactExports.createElement("label", {
    className: classString,
    style: Object.assign(Object.assign({}, checkbox === null || checkbox === void 0 ? void 0 : checkbox.style), style),
    onMouseEnter,
    onMouseLeave,
    onClick: onLabelClick
  }, /* @__PURE__ */ reactExports.createElement(Checkbox$2, Object.assign({}, checkboxProps, {
    onClick: onInputClick,
    prefixCls,
    className: checkboxClass,
    disabled: mergedDisabled,
    ref: mergedRef
  })), children !== void 0 && children !== null && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-label`
  }, children))));
};
const Checkbox$1 = /* @__PURE__ */ reactExports.forwardRef(InternalCheckbox);
var __rest$4 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const CheckboxGroup = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    defaultValue,
    children,
    options = [],
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    onChange
  } = props, restProps = __rest$4(props, ["defaultValue", "children", "options", "prefixCls", "className", "rootClassName", "style", "onChange"]);
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const [value, setValue] = reactExports.useState(restProps.value || defaultValue || []);
  const [registeredValues, setRegisteredValues] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if ("value" in restProps) {
      setValue(restProps.value || []);
    }
  }, [restProps.value]);
  const memoizedOptions = reactExports.useMemo(() => options.map((option) => {
    if (typeof option === "string" || typeof option === "number") {
      return {
        label: option,
        value: option
      };
    }
    return option;
  }), [options]);
  const cancelValue = (val) => {
    setRegisteredValues((prevValues) => prevValues.filter((v) => v !== val));
  };
  const registerValue = (val) => {
    setRegisteredValues((prevValues) => [].concat(_toConsumableArray(prevValues), [val]));
  };
  const toggleOption = (option) => {
    const optionIndex = value.indexOf(option.value);
    const newValue = _toConsumableArray(value);
    if (optionIndex === -1) {
      newValue.push(option.value);
    } else {
      newValue.splice(optionIndex, 1);
    }
    if (!("value" in restProps)) {
      setValue(newValue);
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(newValue.filter((val) => registeredValues.includes(val)).sort((a, b) => {
      const indexA = memoizedOptions.findIndex((opt) => opt.value === a);
      const indexB = memoizedOptions.findIndex((opt) => opt.value === b);
      return indexA - indexB;
    }));
  };
  const prefixCls = getPrefixCls("checkbox", customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$3(prefixCls, rootCls);
  const domProps = omit(restProps, ["value", "disabled"]);
  const childrenNode = options.length ? memoizedOptions.map((option) => /* @__PURE__ */ reactExports.createElement(Checkbox$1, {
    prefixCls,
    key: option.value.toString(),
    disabled: "disabled" in option ? option.disabled : restProps.disabled,
    value: option.value,
    checked: value.includes(option.value),
    onChange: option.onChange,
    className: classNames(`${groupPrefixCls}-item`, option.className),
    style: option.style,
    title: option.title,
    id: option.id,
    required: option.required
  }, option.label)) : children;
  const memoizedContext = reactExports.useMemo(() => ({
    toggleOption,
    value,
    disabled: restProps.disabled,
    name: restProps.name,
    // https://github.com/ant-design/ant-design/issues/16376
    registerValue,
    cancelValue
  }), [toggleOption, value, restProps.disabled, restProps.name, registerValue, cancelValue]);
  const classString = classNames(groupPrefixCls, {
    [`${groupPrefixCls}-rtl`]: direction === "rtl"
  }, className, rootClassName, cssVarCls, rootCls, hashId);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({
    className: classString,
    style
  }, domProps, {
    ref
  }), /* @__PURE__ */ reactExports.createElement(GroupContext.Provider, {
    value: memoizedContext
  }, childrenNode)));
});
const Checkbox = Checkbox$1;
Checkbox.Group = CheckboxGroup;
Checkbox.__ANT_CHECKBOX = true;
var __rest$3 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const DropdownButton = (props) => {
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    type = "default",
    danger,
    disabled,
    loading,
    onClick,
    htmlType,
    children,
    className,
    menu,
    arrow,
    autoFocus,
    overlay,
    trigger,
    align,
    open,
    onOpenChange,
    placement,
    getPopupContainer,
    href,
    icon = /* @__PURE__ */ reactExports.createElement(RefIcon$d, null),
    title,
    buttonsRender = (buttons) => buttons,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayClassName,
    overlayStyle,
    destroyOnHidden,
    destroyPopupOnHide,
    dropdownRender,
    popupRender
  } = props, restProps = __rest$3(props, ["prefixCls", "type", "danger", "disabled", "loading", "onClick", "htmlType", "children", "className", "menu", "arrow", "autoFocus", "overlay", "trigger", "align", "open", "onOpenChange", "placement", "getPopupContainer", "href", "icon", "title", "buttonsRender", "mouseEnterDelay", "mouseLeaveDelay", "overlayClassName", "overlayStyle", "destroyOnHidden", "destroyPopupOnHide", "dropdownRender", "popupRender"]);
  const prefixCls = getPrefixCls("dropdown", customizePrefixCls);
  const buttonPrefixCls = `${prefixCls}-button`;
  const mergedPopupRender = popupRender || dropdownRender;
  const dropdownProps = {
    menu,
    arrow,
    autoFocus,
    align,
    disabled,
    trigger: disabled ? [] : trigger,
    onOpenChange,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayClassName,
    overlayStyle,
    destroyOnHidden,
    popupRender: mergedPopupRender
  };
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  const classes = classNames(buttonPrefixCls, compactItemClassnames, className);
  if ("destroyPopupOnHide" in props) {
    dropdownProps.destroyPopupOnHide = destroyPopupOnHide;
  }
  if ("overlay" in props) {
    dropdownProps.overlay = overlay;
  }
  if ("open" in props) {
    dropdownProps.open = open;
  }
  if ("placement" in props) {
    dropdownProps.placement = placement;
  } else {
    dropdownProps.placement = direction === "rtl" ? "bottomLeft" : "bottomRight";
  }
  const leftButton = /* @__PURE__ */ reactExports.createElement(Button, {
    type,
    danger,
    disabled,
    loading,
    onClick,
    htmlType,
    href,
    title
  }, children);
  const rightButton = /* @__PURE__ */ reactExports.createElement(Button, {
    type,
    danger,
    icon
  });
  const [leftButtonToRender, rightButtonToRender] = buttonsRender([leftButton, rightButton]);
  return /* @__PURE__ */ reactExports.createElement(Space.Compact, Object.assign({
    className: classes,
    size: compactSize,
    block: true
  }, restProps), leftButtonToRender, /* @__PURE__ */ reactExports.createElement(Dropdown$1, Object.assign({}, dropdownProps), rightButtonToRender));
};
DropdownButton.__ANT_BUTTON = true;
const Dropdown = Dropdown$1;
Dropdown.Button = DropdownButton;
function addEventListenerWrap(target, eventType, cb, option) {
  var callback = ReactDOM.unstable_batchedUpdates ? function run(e) {
    ReactDOM.unstable_batchedUpdates(cb, e);
  } : cb;
  if (target !== null && target !== void 0 && target.addEventListener) {
    target.addEventListener(eventType, callback, option);
  }
  return {
    remove: function remove() {
      if (target !== null && target !== void 0 && target.removeEventListener) {
        target.removeEventListener(eventType, callback, option);
      }
    }
  };
}
var DoubleLeftOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" } }] }, "name": "double-left", "theme": "outlined" };
var DoubleLeftOutlined = function DoubleLeftOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: DoubleLeftOutlined$1
  }));
};
var RefIcon$b = /* @__PURE__ */ reactExports.forwardRef(DoubleLeftOutlined);
var DoubleRightOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" } }] }, "name": "double-right", "theme": "outlined" };
var DoubleRightOutlined = function DoubleRightOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: DoubleRightOutlined$1
  }));
};
var RefIcon$a = /* @__PURE__ */ reactExports.forwardRef(DoubleRightOutlined);
var locale = {
  // Options
  items_per_page: "条/页",
  jump_to: "跳至",
  jump_to_confirm: "确定",
  page: "页",
  // Pagination
  prev_page: "上一页",
  next_page: "下一页",
  prev_5: "向前 5 页",
  next_5: "向后 5 页",
  prev_3: "向前 3 页",
  next_3: "向后 3 页",
  page_size: "页码"
};
var defaultPageSizeOptions = [10, 20, 50, 100];
var Options = function Options2(props) {
  var _props$pageSizeOption = props.pageSizeOptions, pageSizeOptions = _props$pageSizeOption === void 0 ? defaultPageSizeOptions : _props$pageSizeOption, locale2 = props.locale, changeSize = props.changeSize, pageSize = props.pageSize, goButton = props.goButton, quickGo = props.quickGo, rootPrefixCls = props.rootPrefixCls, disabled = props.disabled, buildOptionText = props.buildOptionText, showSizeChanger = props.showSizeChanger, sizeChangerRender = props.sizeChangerRender;
  var _React$useState = React.useState(""), _React$useState2 = _slicedToArray(_React$useState, 2), goInputText = _React$useState2[0], setGoInputText = _React$useState2[1];
  var getValidValue = function getValidValue2() {
    return !goInputText || Number.isNaN(goInputText) ? void 0 : Number(goInputText);
  };
  var mergeBuildOptionText = typeof buildOptionText === "function" ? buildOptionText : function(value) {
    return "".concat(value, " ").concat(locale2.items_per_page);
  };
  var handleChange = function handleChange2(e) {
    setGoInputText(e.target.value);
  };
  var handleBlur = function handleBlur2(e) {
    if (goButton || goInputText === "") {
      return;
    }
    setGoInputText("");
    if (e.relatedTarget && (e.relatedTarget.className.indexOf("".concat(rootPrefixCls, "-item-link")) >= 0 || e.relatedTarget.className.indexOf("".concat(rootPrefixCls, "-item")) >= 0)) {
      return;
    }
    quickGo === null || quickGo === void 0 || quickGo(getValidValue());
  };
  var go = function go2(e) {
    if (goInputText === "") {
      return;
    }
    if (e.keyCode === KeyCode.ENTER || e.type === "click") {
      setGoInputText("");
      quickGo === null || quickGo === void 0 || quickGo(getValidValue());
    }
  };
  var getPageSizeOptions = function getPageSizeOptions2() {
    if (pageSizeOptions.some(function(option) {
      return option.toString() === pageSize.toString();
    })) {
      return pageSizeOptions;
    }
    return pageSizeOptions.concat([pageSize]).sort(function(a, b) {
      var numberA = Number.isNaN(Number(a)) ? 0 : Number(a);
      var numberB = Number.isNaN(Number(b)) ? 0 : Number(b);
      return numberA - numberB;
    });
  };
  var prefixCls = "".concat(rootPrefixCls, "-options");
  if (!showSizeChanger && !quickGo) {
    return null;
  }
  var changeSelect = null;
  var goInput = null;
  var gotoButton = null;
  if (showSizeChanger && sizeChangerRender) {
    changeSelect = sizeChangerRender({
      disabled,
      size: pageSize,
      onSizeChange: function onSizeChange(nextValue) {
        changeSize === null || changeSize === void 0 || changeSize(Number(nextValue));
      },
      "aria-label": locale2.page_size,
      className: "".concat(prefixCls, "-size-changer"),
      options: getPageSizeOptions().map(function(opt) {
        return {
          label: mergeBuildOptionText(opt),
          value: opt
        };
      })
    });
  }
  if (quickGo) {
    if (goButton) {
      gotoButton = typeof goButton === "boolean" ? /* @__PURE__ */ React.createElement("button", {
        type: "button",
        onClick: go,
        onKeyUp: go,
        disabled,
        className: "".concat(prefixCls, "-quick-jumper-button")
      }, locale2.jump_to_confirm) : /* @__PURE__ */ React.createElement("span", {
        onClick: go,
        onKeyUp: go
      }, goButton);
    }
    goInput = /* @__PURE__ */ React.createElement("div", {
      className: "".concat(prefixCls, "-quick-jumper")
    }, locale2.jump_to, /* @__PURE__ */ React.createElement("input", {
      disabled,
      type: "text",
      value: goInputText,
      onChange: handleChange,
      onKeyUp: go,
      onBlur: handleBlur,
      "aria-label": locale2.page
    }), locale2.page, gotoButton);
  }
  return /* @__PURE__ */ React.createElement("li", {
    className: prefixCls
  }, changeSelect, goInput);
};
var Pager = function Pager2(props) {
  var rootPrefixCls = props.rootPrefixCls, page = props.page, active = props.active, className = props.className, showTitle = props.showTitle, onClick = props.onClick, onKeyPress = props.onKeyPress, itemRender = props.itemRender;
  var prefixCls = "".concat(rootPrefixCls, "-item");
  var cls = classNames(prefixCls, "".concat(prefixCls, "-").concat(page), _defineProperty(_defineProperty({}, "".concat(prefixCls, "-active"), active), "".concat(prefixCls, "-disabled"), !page), className);
  var handleClick = function handleClick2() {
    onClick(page);
  };
  var handleKeyPress = function handleKeyPress2(e) {
    onKeyPress(e, onClick, page);
  };
  var pager = itemRender(page, "page", /* @__PURE__ */ React.createElement("a", {
    rel: "nofollow"
  }, page));
  return pager ? /* @__PURE__ */ React.createElement("li", {
    title: showTitle ? String(page) : null,
    className: cls,
    onClick: handleClick,
    onKeyDown: handleKeyPress,
    tabIndex: 0
  }, pager) : null;
};
var defaultItemRender = function defaultItemRender2(page, type, element) {
  return element;
};
function noop$1() {
}
function isInteger(v) {
  var value = Number(v);
  return typeof value === "number" && !Number.isNaN(value) && isFinite(value) && Math.floor(value) === value;
}
function calculatePage(p, pageSize, total) {
  var _pageSize = typeof p === "undefined" ? pageSize : p;
  return Math.floor((total - 1) / _pageSize) + 1;
}
var Pagination$1 = function Pagination2(props) {
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-pagination" : _props$prefixCls, _props$selectPrefixCl = props.selectPrefixCls, selectPrefixCls = _props$selectPrefixCl === void 0 ? "rc-select" : _props$selectPrefixCl, className = props.className, currentProp = props.current, _props$defaultCurrent = props.defaultCurrent, defaultCurrent = _props$defaultCurrent === void 0 ? 1 : _props$defaultCurrent, _props$total = props.total, total = _props$total === void 0 ? 0 : _props$total, pageSizeProp = props.pageSize, _props$defaultPageSiz = props.defaultPageSize, defaultPageSize = _props$defaultPageSiz === void 0 ? 10 : _props$defaultPageSiz, _props$onChange = props.onChange, onChange = _props$onChange === void 0 ? noop$1 : _props$onChange, hideOnSinglePage = props.hideOnSinglePage, align = props.align, _props$showPrevNextJu = props.showPrevNextJumpers, showPrevNextJumpers = _props$showPrevNextJu === void 0 ? true : _props$showPrevNextJu, showQuickJumper = props.showQuickJumper, showLessItems = props.showLessItems, _props$showTitle = props.showTitle, showTitle = _props$showTitle === void 0 ? true : _props$showTitle, _props$onShowSizeChan = props.onShowSizeChange, onShowSizeChange = _props$onShowSizeChan === void 0 ? noop$1 : _props$onShowSizeChan, _props$locale = props.locale, locale$12 = _props$locale === void 0 ? locale : _props$locale, style = props.style, _props$totalBoundaryS = props.totalBoundaryShowSizeChanger, totalBoundaryShowSizeChanger = _props$totalBoundaryS === void 0 ? 50 : _props$totalBoundaryS, disabled = props.disabled, simple = props.simple, showTotal = props.showTotal, _props$showSizeChange = props.showSizeChanger, showSizeChanger = _props$showSizeChange === void 0 ? total > totalBoundaryShowSizeChanger : _props$showSizeChange, sizeChangerRender = props.sizeChangerRender, pageSizeOptions = props.pageSizeOptions, _props$itemRender = props.itemRender, itemRender = _props$itemRender === void 0 ? defaultItemRender : _props$itemRender, jumpPrevIcon = props.jumpPrevIcon, jumpNextIcon = props.jumpNextIcon, prevIcon = props.prevIcon, nextIcon = props.nextIcon;
  var paginationRef = React.useRef(null);
  var _useMergedState = useMergedState(10, {
    value: pageSizeProp,
    defaultValue: defaultPageSize
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), pageSize = _useMergedState2[0], setPageSize = _useMergedState2[1];
  var _useMergedState3 = useMergedState(1, {
    value: currentProp,
    defaultValue: defaultCurrent,
    postState: function postState(c) {
      return Math.max(1, Math.min(c, calculatePage(void 0, pageSize, total)));
    }
  }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), current = _useMergedState4[0], setCurrent = _useMergedState4[1];
  var _React$useState = React.useState(current), _React$useState2 = _slicedToArray(_React$useState, 2), internalInputVal = _React$useState2[0], setInternalInputVal = _React$useState2[1];
  reactExports.useEffect(function() {
    setInternalInputVal(current);
  }, [current]);
  var jumpPrevPage = Math.max(1, current - (showLessItems ? 3 : 5));
  var jumpNextPage = Math.min(calculatePage(void 0, pageSize, total), current + (showLessItems ? 3 : 5));
  function getItemIcon(icon, label) {
    var iconNode = icon || /* @__PURE__ */ React.createElement("button", {
      type: "button",
      "aria-label": label,
      className: "".concat(prefixCls, "-item-link")
    });
    if (typeof icon === "function") {
      iconNode = /* @__PURE__ */ React.createElement(icon, _objectSpread2({}, props));
    }
    return iconNode;
  }
  function getValidValue(e) {
    var inputValue = e.target.value;
    var allPages2 = calculatePage(void 0, pageSize, total);
    var value;
    if (inputValue === "") {
      value = inputValue;
    } else if (Number.isNaN(Number(inputValue))) {
      value = internalInputVal;
    } else if (inputValue >= allPages2) {
      value = allPages2;
    } else {
      value = Number(inputValue);
    }
    return value;
  }
  function isValid(page) {
    return isInteger(page) && page !== current && isInteger(total) && total > 0;
  }
  var shouldDisplayQuickJumper = total > pageSize ? showQuickJumper : false;
  function handleKeyDown(event) {
    if (event.keyCode === KeyCode.UP || event.keyCode === KeyCode.DOWN) {
      event.preventDefault();
    }
  }
  function handleKeyUp(event) {
    var value = getValidValue(event);
    if (value !== internalInputVal) {
      setInternalInputVal(value);
    }
    switch (event.keyCode) {
      case KeyCode.ENTER:
        handleChange(value);
        break;
      case KeyCode.UP:
        handleChange(value - 1);
        break;
      case KeyCode.DOWN:
        handleChange(value + 1);
        break;
    }
  }
  function handleBlur(event) {
    handleChange(getValidValue(event));
  }
  function changePageSize(size) {
    var newCurrent = calculatePage(size, pageSize, total);
    var nextCurrent = current > newCurrent && newCurrent !== 0 ? newCurrent : current;
    setPageSize(size);
    setInternalInputVal(nextCurrent);
    onShowSizeChange === null || onShowSizeChange === void 0 || onShowSizeChange(current, size);
    setCurrent(nextCurrent);
    onChange === null || onChange === void 0 || onChange(nextCurrent, size);
  }
  function handleChange(page) {
    if (isValid(page) && !disabled) {
      var currentPage = calculatePage(void 0, pageSize, total);
      var newPage = page;
      if (page > currentPage) {
        newPage = currentPage;
      } else if (page < 1) {
        newPage = 1;
      }
      if (newPage !== internalInputVal) {
        setInternalInputVal(newPage);
      }
      setCurrent(newPage);
      onChange === null || onChange === void 0 || onChange(newPage, pageSize);
      return newPage;
    }
    return current;
  }
  var hasPrev = current > 1;
  var hasNext = current < calculatePage(void 0, pageSize, total);
  function prevHandle() {
    if (hasPrev) handleChange(current - 1);
  }
  function nextHandle() {
    if (hasNext) handleChange(current + 1);
  }
  function jumpPrevHandle() {
    handleChange(jumpPrevPage);
  }
  function jumpNextHandle() {
    handleChange(jumpNextPage);
  }
  function runIfEnter(event, callback) {
    if (event.key === "Enter" || event.charCode === KeyCode.ENTER || event.keyCode === KeyCode.ENTER) {
      for (var _len = arguments.length, restParams = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        restParams[_key - 2] = arguments[_key];
      }
      callback.apply(void 0, restParams);
    }
  }
  function runIfEnterPrev(event) {
    runIfEnter(event, prevHandle);
  }
  function runIfEnterNext(event) {
    runIfEnter(event, nextHandle);
  }
  function runIfEnterJumpPrev(event) {
    runIfEnter(event, jumpPrevHandle);
  }
  function runIfEnterJumpNext(event) {
    runIfEnter(event, jumpNextHandle);
  }
  function renderPrev(prevPage2) {
    var prevButton = itemRender(prevPage2, "prev", getItemIcon(prevIcon, "prev page"));
    return /* @__PURE__ */ React.isValidElement(prevButton) ? /* @__PURE__ */ React.cloneElement(prevButton, {
      disabled: !hasPrev
    }) : prevButton;
  }
  function renderNext(nextPage2) {
    var nextButton = itemRender(nextPage2, "next", getItemIcon(nextIcon, "next page"));
    return /* @__PURE__ */ React.isValidElement(nextButton) ? /* @__PURE__ */ React.cloneElement(nextButton, {
      disabled: !hasNext
    }) : nextButton;
  }
  function handleGoTO(event) {
    if (event.type === "click" || event.keyCode === KeyCode.ENTER) {
      handleChange(internalInputVal);
    }
  }
  var jumpPrev = null;
  var dataOrAriaAttributeProps = pickAttrs(props, {
    aria: true,
    data: true
  });
  var totalText = showTotal && /* @__PURE__ */ React.createElement("li", {
    className: "".concat(prefixCls, "-total-text")
  }, showTotal(total, [total === 0 ? 0 : (current - 1) * pageSize + 1, current * pageSize > total ? total : current * pageSize]));
  var jumpNext = null;
  var allPages = calculatePage(void 0, pageSize, total);
  if (hideOnSinglePage && total <= pageSize) {
    return null;
  }
  var pagerList = [];
  var pagerProps = {
    rootPrefixCls: prefixCls,
    onClick: handleChange,
    onKeyPress: runIfEnter,
    showTitle,
    itemRender,
    page: -1
  };
  var prevPage = current - 1 > 0 ? current - 1 : 0;
  var nextPage = current + 1 < allPages ? current + 1 : allPages;
  var goButton = showQuickJumper && showQuickJumper.goButton;
  var isReadOnly = _typeof(simple) === "object" ? simple.readOnly : !simple;
  var gotoButton = goButton;
  var simplePager = null;
  if (simple) {
    if (goButton) {
      if (typeof goButton === "boolean") {
        gotoButton = /* @__PURE__ */ React.createElement("button", {
          type: "button",
          onClick: handleGoTO,
          onKeyUp: handleGoTO
        }, locale$12.jump_to_confirm);
      } else {
        gotoButton = /* @__PURE__ */ React.createElement("span", {
          onClick: handleGoTO,
          onKeyUp: handleGoTO
        }, goButton);
      }
      gotoButton = /* @__PURE__ */ React.createElement("li", {
        title: showTitle ? "".concat(locale$12.jump_to).concat(current, "/").concat(allPages) : null,
        className: "".concat(prefixCls, "-simple-pager")
      }, gotoButton);
    }
    simplePager = /* @__PURE__ */ React.createElement("li", {
      title: showTitle ? "".concat(current, "/").concat(allPages) : null,
      className: "".concat(prefixCls, "-simple-pager")
    }, isReadOnly ? internalInputVal : /* @__PURE__ */ React.createElement("input", {
      type: "text",
      "aria-label": locale$12.jump_to,
      value: internalInputVal,
      disabled,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      onChange: handleKeyUp,
      onBlur: handleBlur,
      size: 3
    }), /* @__PURE__ */ React.createElement("span", {
      className: "".concat(prefixCls, "-slash")
    }, "/"), allPages);
  }
  var pageBufferSize = showLessItems ? 1 : 2;
  if (allPages <= 3 + pageBufferSize * 2) {
    if (!allPages) {
      pagerList.push(/* @__PURE__ */ React.createElement(Pager, _extends({}, pagerProps, {
        key: "noPager",
        page: 1,
        className: "".concat(prefixCls, "-item-disabled")
      })));
    }
    for (var i = 1; i <= allPages; i += 1) {
      pagerList.push(/* @__PURE__ */ React.createElement(Pager, _extends({}, pagerProps, {
        key: i,
        page: i,
        active: current === i
      })));
    }
  } else {
    var prevItemTitle = showLessItems ? locale$12.prev_3 : locale$12.prev_5;
    var nextItemTitle = showLessItems ? locale$12.next_3 : locale$12.next_5;
    var jumpPrevContent = itemRender(jumpPrevPage, "jump-prev", getItemIcon(jumpPrevIcon, "prev page"));
    var jumpNextContent = itemRender(jumpNextPage, "jump-next", getItemIcon(jumpNextIcon, "next page"));
    if (showPrevNextJumpers) {
      jumpPrev = jumpPrevContent ? /* @__PURE__ */ React.createElement("li", {
        title: showTitle ? prevItemTitle : null,
        key: "prev",
        onClick: jumpPrevHandle,
        tabIndex: 0,
        onKeyDown: runIfEnterJumpPrev,
        className: classNames("".concat(prefixCls, "-jump-prev"), _defineProperty({}, "".concat(prefixCls, "-jump-prev-custom-icon"), !!jumpPrevIcon))
      }, jumpPrevContent) : null;
      jumpNext = jumpNextContent ? /* @__PURE__ */ React.createElement("li", {
        title: showTitle ? nextItemTitle : null,
        key: "next",
        onClick: jumpNextHandle,
        tabIndex: 0,
        onKeyDown: runIfEnterJumpNext,
        className: classNames("".concat(prefixCls, "-jump-next"), _defineProperty({}, "".concat(prefixCls, "-jump-next-custom-icon"), !!jumpNextIcon))
      }, jumpNextContent) : null;
    }
    var left = Math.max(1, current - pageBufferSize);
    var right = Math.min(current + pageBufferSize, allPages);
    if (current - 1 <= pageBufferSize) {
      right = 1 + pageBufferSize * 2;
    }
    if (allPages - current <= pageBufferSize) {
      left = allPages - pageBufferSize * 2;
    }
    for (var _i = left; _i <= right; _i += 1) {
      pagerList.push(/* @__PURE__ */ React.createElement(Pager, _extends({}, pagerProps, {
        key: _i,
        page: _i,
        active: current === _i
      })));
    }
    if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
      pagerList[0] = /* @__PURE__ */ React.cloneElement(pagerList[0], {
        className: classNames("".concat(prefixCls, "-item-after-jump-prev"), pagerList[0].props.className)
      });
      pagerList.unshift(jumpPrev);
    }
    if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
      var lastOne = pagerList[pagerList.length - 1];
      pagerList[pagerList.length - 1] = /* @__PURE__ */ React.cloneElement(lastOne, {
        className: classNames("".concat(prefixCls, "-item-before-jump-next"), lastOne.props.className)
      });
      pagerList.push(jumpNext);
    }
    if (left !== 1) {
      pagerList.unshift(/* @__PURE__ */ React.createElement(Pager, _extends({}, pagerProps, {
        key: 1,
        page: 1
      })));
    }
    if (right !== allPages) {
      pagerList.push(/* @__PURE__ */ React.createElement(Pager, _extends({}, pagerProps, {
        key: allPages,
        page: allPages
      })));
    }
  }
  var prev = renderPrev(prevPage);
  if (prev) {
    var prevDisabled = !hasPrev || !allPages;
    prev = /* @__PURE__ */ React.createElement("li", {
      title: showTitle ? locale$12.prev_page : null,
      onClick: prevHandle,
      tabIndex: prevDisabled ? null : 0,
      onKeyDown: runIfEnterPrev,
      className: classNames("".concat(prefixCls, "-prev"), _defineProperty({}, "".concat(prefixCls, "-disabled"), prevDisabled)),
      "aria-disabled": prevDisabled
    }, prev);
  }
  var next = renderNext(nextPage);
  if (next) {
    var nextDisabled, nextTabIndex;
    if (simple) {
      nextDisabled = !hasNext;
      nextTabIndex = hasPrev ? 0 : null;
    } else {
      nextDisabled = !hasNext || !allPages;
      nextTabIndex = nextDisabled ? null : 0;
    }
    next = /* @__PURE__ */ React.createElement("li", {
      title: showTitle ? locale$12.next_page : null,
      onClick: nextHandle,
      tabIndex: nextTabIndex,
      onKeyDown: runIfEnterNext,
      className: classNames("".concat(prefixCls, "-next"), _defineProperty({}, "".concat(prefixCls, "-disabled"), nextDisabled)),
      "aria-disabled": nextDisabled
    }, next);
  }
  var cls = classNames(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-start"), align === "start"), "".concat(prefixCls, "-center"), align === "center"), "".concat(prefixCls, "-end"), align === "end"), "".concat(prefixCls, "-simple"), simple), "".concat(prefixCls, "-disabled"), disabled));
  return /* @__PURE__ */ React.createElement("ul", _extends({
    className: cls,
    style,
    ref: paginationRef
  }, dataOrAriaAttributeProps), totalText, prev, simple ? simplePager : pagerList, next, /* @__PURE__ */ React.createElement(Options, {
    locale: locale$12,
    rootPrefixCls: prefixCls,
    disabled,
    selectPrefixCls,
    changeSize: changePageSize,
    pageSize,
    pageSizeOptions,
    quickGo: shouldDisplayQuickJumper ? handleChange : null,
    goButton: gotoButton,
    showSizeChanger,
    sizeChangerRender
  }));
};
const genPaginationDisabledStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-disabled`]: {
      "&, &:hover": {
        cursor: "not-allowed",
        [`${componentCls}-item-link`]: {
          color: token.colorTextDisabled,
          cursor: "not-allowed"
        }
      },
      "&:focus-visible": {
        cursor: "not-allowed",
        [`${componentCls}-item-link`]: {
          color: token.colorTextDisabled,
          cursor: "not-allowed"
        }
      }
    },
    [`&${componentCls}-disabled`]: {
      cursor: "not-allowed",
      [`${componentCls}-item`]: {
        cursor: "not-allowed",
        backgroundColor: "transparent",
        "&:hover, &:active": {
          backgroundColor: "transparent"
        },
        a: {
          color: token.colorTextDisabled,
          backgroundColor: "transparent",
          border: "none",
          cursor: "not-allowed"
        },
        "&-active": {
          borderColor: token.colorBorder,
          backgroundColor: token.itemActiveBgDisabled,
          "&:hover, &:active": {
            backgroundColor: token.itemActiveBgDisabled
          },
          a: {
            color: token.itemActiveColorDisabled
          }
        }
      },
      [`${componentCls}-item-link`]: {
        color: token.colorTextDisabled,
        cursor: "not-allowed",
        "&:hover, &:active": {
          backgroundColor: "transparent"
        },
        [`${componentCls}-simple&`]: {
          backgroundColor: "transparent",
          "&:hover, &:active": {
            backgroundColor: "transparent"
          }
        }
      },
      [`${componentCls}-simple-pager`]: {
        color: token.colorTextDisabled
      },
      [`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
        [`${componentCls}-item-link-icon`]: {
          opacity: 0
        },
        [`${componentCls}-item-ellipsis`]: {
          opacity: 1
        }
      }
    }
  };
};
const genPaginationMiniStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`&${componentCls}-mini ${componentCls}-total-text, &${componentCls}-mini ${componentCls}-simple-pager`]: {
      height: token.itemSizeSM,
      lineHeight: unit(token.itemSizeSM)
    },
    [`&${componentCls}-mini ${componentCls}-item`]: {
      minWidth: token.itemSizeSM,
      height: token.itemSizeSM,
      margin: 0,
      lineHeight: unit(token.calc(token.itemSizeSM).sub(2).equal())
    },
    [`&${componentCls}-mini ${componentCls}-prev, &${componentCls}-mini ${componentCls}-next`]: {
      minWidth: token.itemSizeSM,
      height: token.itemSizeSM,
      margin: 0,
      lineHeight: unit(token.itemSizeSM)
    },
    [`&${componentCls}-mini:not(${componentCls}-disabled)`]: {
      [`${componentCls}-prev, ${componentCls}-next`]: {
        [`&:hover ${componentCls}-item-link`]: {
          backgroundColor: token.colorBgTextHover
        },
        [`&:active ${componentCls}-item-link`]: {
          backgroundColor: token.colorBgTextActive
        },
        [`&${componentCls}-disabled:hover ${componentCls}-item-link`]: {
          backgroundColor: "transparent"
        }
      }
    },
    [`
    &${componentCls}-mini ${componentCls}-prev ${componentCls}-item-link,
    &${componentCls}-mini ${componentCls}-next ${componentCls}-item-link
    `]: {
      backgroundColor: "transparent",
      borderColor: "transparent",
      "&::after": {
        height: token.itemSizeSM,
        lineHeight: unit(token.itemSizeSM)
      }
    },
    [`&${componentCls}-mini ${componentCls}-jump-prev, &${componentCls}-mini ${componentCls}-jump-next`]: {
      height: token.itemSizeSM,
      marginInlineEnd: 0,
      lineHeight: unit(token.itemSizeSM)
    },
    [`&${componentCls}-mini ${componentCls}-options`]: {
      marginInlineStart: token.paginationMiniOptionsMarginInlineStart,
      "&-size-changer": {
        top: token.miniOptionsSizeChangerTop
      },
      "&-quick-jumper": {
        height: token.itemSizeSM,
        lineHeight: unit(token.itemSizeSM),
        input: Object.assign(Object.assign({}, genInputSmallStyle(token)), {
          width: token.paginationMiniQuickJumperInputWidth,
          height: token.controlHeightSM
        })
      }
    }
  };
};
const genPaginationSimpleStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`&${componentCls}-simple`]: {
      [`${componentCls}-prev, ${componentCls}-next`]: {
        height: token.itemSize,
        lineHeight: unit(token.itemSize),
        verticalAlign: "top",
        [`${componentCls}-item-link`]: {
          height: token.itemSize,
          backgroundColor: "transparent",
          border: 0,
          "&:hover": {
            backgroundColor: token.colorBgTextHover
          },
          "&:active": {
            backgroundColor: token.colorBgTextActive
          },
          "&::after": {
            height: token.itemSize,
            lineHeight: unit(token.itemSize)
          }
        }
      },
      [`${componentCls}-simple-pager`]: {
        display: "inline-flex",
        alignItems: "center",
        height: token.itemSize,
        marginInlineEnd: token.marginXS,
        input: {
          boxSizing: "border-box",
          height: "100%",
          width: token.quickJumperInputWidth,
          padding: `0 ${unit(token.paginationItemPaddingInline)}`,
          textAlign: "center",
          backgroundColor: token.itemInputBg,
          border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
          borderRadius: token.borderRadius,
          outline: "none",
          transition: `border-color ${token.motionDurationMid}`,
          color: "inherit",
          "&:hover": {
            borderColor: token.colorPrimary
          },
          "&:focus": {
            borderColor: token.colorPrimaryHover,
            boxShadow: `${unit(token.inputOutlineOffset)} 0 ${unit(token.controlOutlineWidth)} ${token.controlOutline}`
          },
          "&[disabled]": {
            color: token.colorTextDisabled,
            backgroundColor: token.colorBgContainerDisabled,
            borderColor: token.colorBorder,
            cursor: "not-allowed"
          }
        }
      },
      [`&${componentCls}-disabled`]: {
        [`${componentCls}-prev, ${componentCls}-next`]: {
          [`${componentCls}-item-link`]: {
            "&:hover, &:active": {
              backgroundColor: "transparent"
            }
          }
        }
      },
      [`&${componentCls}-mini`]: {
        [`${componentCls}-prev, ${componentCls}-next`]: {
          height: token.itemSizeSM,
          lineHeight: unit(token.itemSizeSM),
          [`${componentCls}-item-link`]: {
            height: token.itemSizeSM,
            "&::after": {
              height: token.itemSizeSM,
              lineHeight: unit(token.itemSizeSM)
            }
          }
        },
        [`${componentCls}-simple-pager`]: {
          height: token.itemSizeSM,
          input: {
            width: token.paginationMiniQuickJumperInputWidth
          }
        }
      }
    }
  };
};
const genPaginationJumpStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
      outline: 0,
      [`${componentCls}-item-container`]: {
        position: "relative",
        [`${componentCls}-item-link-icon`]: {
          color: token.colorPrimary,
          fontSize: token.fontSizeSM,
          opacity: 0,
          transition: `all ${token.motionDurationMid}`,
          "&-svg": {
            top: 0,
            insetInlineEnd: 0,
            bottom: 0,
            insetInlineStart: 0,
            margin: "auto"
          }
        },
        [`${componentCls}-item-ellipsis`]: {
          position: "absolute",
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          display: "block",
          margin: "auto",
          color: token.colorTextDisabled,
          letterSpacing: token.paginationEllipsisLetterSpacing,
          textAlign: "center",
          textIndent: token.paginationEllipsisTextIndent,
          opacity: 1,
          transition: `all ${token.motionDurationMid}`
        }
      },
      "&:hover": {
        [`${componentCls}-item-link-icon`]: {
          opacity: 1
        },
        [`${componentCls}-item-ellipsis`]: {
          opacity: 0
        }
      }
    },
    [`
    ${componentCls}-prev,
    ${componentCls}-jump-prev,
    ${componentCls}-jump-next
    `]: {
      marginInlineEnd: token.marginXS
    },
    [`
    ${componentCls}-prev,
    ${componentCls}-next,
    ${componentCls}-jump-prev,
    ${componentCls}-jump-next
    `]: {
      display: "inline-block",
      minWidth: token.itemSize,
      height: token.itemSize,
      color: token.colorText,
      fontFamily: token.fontFamily,
      lineHeight: unit(token.itemSize),
      textAlign: "center",
      verticalAlign: "middle",
      listStyle: "none",
      borderRadius: token.borderRadius,
      cursor: "pointer",
      transition: `all ${token.motionDurationMid}`
    },
    [`${componentCls}-prev, ${componentCls}-next`]: {
      outline: 0,
      button: {
        color: token.colorText,
        cursor: "pointer",
        userSelect: "none"
      },
      [`${componentCls}-item-link`]: {
        display: "block",
        width: "100%",
        height: "100%",
        padding: 0,
        fontSize: token.fontSizeSM,
        textAlign: "center",
        backgroundColor: "transparent",
        border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
        borderRadius: token.borderRadius,
        outline: "none",
        transition: `all ${token.motionDurationMid}`
      },
      [`&:hover ${componentCls}-item-link`]: {
        backgroundColor: token.colorBgTextHover
      },
      [`&:active ${componentCls}-item-link`]: {
        backgroundColor: token.colorBgTextActive
      },
      [`&${componentCls}-disabled:hover`]: {
        [`${componentCls}-item-link`]: {
          backgroundColor: "transparent"
        }
      }
    },
    [`${componentCls}-slash`]: {
      marginInlineEnd: token.paginationSlashMarginInlineEnd,
      marginInlineStart: token.paginationSlashMarginInlineStart
    },
    [`${componentCls}-options`]: {
      display: "inline-block",
      marginInlineStart: token.margin,
      verticalAlign: "middle",
      "&-size-changer": {
        display: "inline-block",
        width: "auto"
      },
      "&-quick-jumper": {
        display: "inline-block",
        height: token.controlHeight,
        marginInlineStart: token.marginXS,
        lineHeight: unit(token.controlHeight),
        verticalAlign: "top",
        input: Object.assign(Object.assign(Object.assign({}, genBasicInputStyle(token)), genBaseOutlinedStyle(token, {
          borderColor: token.colorBorder,
          hoverBorderColor: token.colorPrimaryHover,
          activeBorderColor: token.colorPrimary,
          activeShadow: token.activeShadow
        })), {
          "&[disabled]": Object.assign({}, genDisabledStyle(token)),
          width: token.quickJumperInputWidth,
          height: token.controlHeight,
          boxSizing: "border-box",
          margin: 0,
          marginInlineStart: token.marginXS,
          marginInlineEnd: token.marginXS
        })
      }
    }
  };
};
const genPaginationItemStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-item`]: {
      display: "inline-block",
      minWidth: token.itemSize,
      height: token.itemSize,
      marginInlineEnd: token.marginXS,
      fontFamily: token.fontFamily,
      lineHeight: unit(token.calc(token.itemSize).sub(2).equal()),
      textAlign: "center",
      verticalAlign: "middle",
      listStyle: "none",
      backgroundColor: token.itemBg,
      border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
      borderRadius: token.borderRadius,
      outline: 0,
      cursor: "pointer",
      userSelect: "none",
      a: {
        display: "block",
        padding: `0 ${unit(token.paginationItemPaddingInline)}`,
        color: token.colorText,
        "&:hover": {
          textDecoration: "none"
        }
      },
      [`&:not(${componentCls}-item-active)`]: {
        "&:hover": {
          transition: `all ${token.motionDurationMid}`,
          backgroundColor: token.colorBgTextHover
        },
        "&:active": {
          backgroundColor: token.colorBgTextActive
        }
      },
      "&-active": {
        fontWeight: token.fontWeightStrong,
        backgroundColor: token.itemActiveBg,
        borderColor: token.colorPrimary,
        a: {
          color: token.itemActiveColor
        },
        "&:hover": {
          borderColor: token.colorPrimaryHover
        },
        "&:hover a": {
          color: token.itemActiveColorHover
        }
      }
    }
  };
};
const genPaginationStyle$1 = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      display: "flex",
      flexWrap: "wrap",
      rowGap: token.paddingXS,
      "&-start": {
        justifyContent: "start"
      },
      "&-center": {
        justifyContent: "center"
      },
      "&-end": {
        justifyContent: "end"
      },
      "ul, ol": {
        margin: 0,
        padding: 0,
        listStyle: "none"
      },
      "&::after": {
        display: "block",
        clear: "both",
        height: 0,
        overflow: "hidden",
        visibility: "hidden",
        content: '""'
      },
      [`${componentCls}-total-text`]: {
        display: "inline-block",
        height: token.itemSize,
        marginInlineEnd: token.marginXS,
        lineHeight: unit(token.calc(token.itemSize).sub(2).equal()),
        verticalAlign: "middle"
      }
    }), genPaginationItemStyle(token)), genPaginationJumpStyle(token)), genPaginationSimpleStyle(token)), genPaginationMiniStyle(token)), genPaginationDisabledStyle(token)), {
      // media query style
      [`@media only screen and (max-width: ${token.screenLG}px)`]: {
        [`${componentCls}-item`]: {
          "&-after-jump-prev, &-before-jump-next": {
            display: "none"
          }
        }
      },
      [`@media only screen and (max-width: ${token.screenSM}px)`]: {
        [`${componentCls}-options`]: {
          display: "none"
        }
      }
    }),
    // rtl style
    [`&${token.componentCls}-rtl`]: {
      direction: "rtl"
    }
  };
};
const genPaginationFocusStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}:not(${componentCls}-disabled)`]: {
      [`${componentCls}-item`]: Object.assign({}, genFocusStyle(token)),
      [`${componentCls}-jump-prev, ${componentCls}-jump-next`]: {
        "&:focus-visible": Object.assign({
          [`${componentCls}-item-link-icon`]: {
            opacity: 1
          },
          [`${componentCls}-item-ellipsis`]: {
            opacity: 0
          }
        }, genFocusOutline(token))
      },
      [`${componentCls}-prev, ${componentCls}-next`]: {
        [`&:focus-visible ${componentCls}-item-link`]: genFocusOutline(token)
      }
    }
  };
};
const prepareComponentToken$2 = (token) => Object.assign({
  itemBg: token.colorBgContainer,
  itemSize: token.controlHeight,
  itemSizeSM: token.controlHeightSM,
  itemActiveBg: token.colorBgContainer,
  itemActiveColor: token.colorPrimary,
  itemActiveColorHover: token.colorPrimaryHover,
  itemLinkBg: token.colorBgContainer,
  itemActiveColorDisabled: token.colorTextDisabled,
  itemActiveBgDisabled: token.controlItemBgActiveDisabled,
  itemInputBg: token.colorBgContainer,
  miniOptionsSizeChangerTop: 0
}, initComponentToken$1(token));
const prepareToken = (token) => merge(token, {
  inputOutlineOffset: 0,
  quickJumperInputWidth: token.calc(token.controlHeightLG).mul(1.25).equal(),
  paginationMiniOptionsMarginInlineStart: token.calc(token.marginXXS).div(2).equal(),
  paginationMiniQuickJumperInputWidth: token.calc(token.controlHeightLG).mul(1.1).equal(),
  paginationItemPaddingInline: token.calc(token.marginXXS).mul(1.5).equal(),
  paginationEllipsisLetterSpacing: token.calc(token.marginXXS).div(2).equal(),
  paginationSlashMarginInlineStart: token.marginSM,
  paginationSlashMarginInlineEnd: token.marginSM,
  paginationEllipsisTextIndent: "0.13em"
  // magic for ui experience
}, initInputToken(token));
const useStyle$2 = genStyleHooks("Pagination", (token) => {
  const paginationToken = prepareToken(token);
  return [genPaginationStyle$1(paginationToken), genPaginationFocusStyle(paginationToken)];
}, prepareComponentToken$2);
const genBorderedStyle$1 = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}${componentCls}-bordered${componentCls}-disabled:not(${componentCls}-mini)`]: {
      "&, &:hover": {
        [`${componentCls}-item-link`]: {
          borderColor: token.colorBorder
        }
      },
      "&:focus-visible": {
        [`${componentCls}-item-link`]: {
          borderColor: token.colorBorder
        }
      },
      [`${componentCls}-item, ${componentCls}-item-link`]: {
        backgroundColor: token.colorBgContainerDisabled,
        borderColor: token.colorBorder,
        [`&:hover:not(${componentCls}-item-active)`]: {
          backgroundColor: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,
          a: {
            color: token.colorTextDisabled
          }
        },
        [`&${componentCls}-item-active`]: {
          backgroundColor: token.itemActiveBgDisabled
        }
      },
      [`${componentCls}-prev, ${componentCls}-next`]: {
        "&:hover button": {
          backgroundColor: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,
          color: token.colorTextDisabled
        },
        [`${componentCls}-item-link`]: {
          backgroundColor: token.colorBgContainerDisabled,
          borderColor: token.colorBorder
        }
      }
    },
    [`${componentCls}${componentCls}-bordered:not(${componentCls}-mini)`]: {
      [`${componentCls}-prev, ${componentCls}-next`]: {
        "&:hover button": {
          borderColor: token.colorPrimaryHover,
          backgroundColor: token.itemBg
        },
        [`${componentCls}-item-link`]: {
          backgroundColor: token.itemLinkBg,
          borderColor: token.colorBorder
        },
        [`&:hover ${componentCls}-item-link`]: {
          borderColor: token.colorPrimary,
          backgroundColor: token.itemBg,
          color: token.colorPrimary
        },
        [`&${componentCls}-disabled`]: {
          [`${componentCls}-item-link`]: {
            borderColor: token.colorBorder,
            color: token.colorTextDisabled
          }
        }
      },
      [`${componentCls}-item`]: {
        backgroundColor: token.itemBg,
        border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
        [`&:hover:not(${componentCls}-item-active)`]: {
          borderColor: token.colorPrimary,
          backgroundColor: token.itemBg,
          a: {
            color: token.colorPrimary
          }
        },
        "&-active": {
          borderColor: token.colorPrimary
        }
      }
    }
  };
};
const BorderedStyle = genSubStyleComponent(["Pagination", "bordered"], (token) => {
  const paginationToken = prepareToken(token);
  return genBorderedStyle$1(paginationToken);
}, prepareComponentToken$2);
function useShowSizeChanger(showSizeChanger) {
  return reactExports.useMemo(() => {
    if (typeof showSizeChanger === "boolean") {
      return [showSizeChanger, {}];
    }
    if (showSizeChanger && typeof showSizeChanger === "object") {
      return [true, showSizeChanger];
    }
    return [void 0, void 0];
  }, [showSizeChanger]);
}
var __rest$2 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Pagination = (props) => {
  const {
    align,
    prefixCls: customizePrefixCls,
    selectPrefixCls: customizeSelectPrefixCls,
    className,
    rootClassName,
    style,
    size: customizeSize,
    locale: customLocale,
    responsive,
    showSizeChanger,
    selectComponentClass,
    pageSizeOptions
  } = props, restProps = __rest$2(props, ["align", "prefixCls", "selectPrefixCls", "className", "rootClassName", "style", "size", "locale", "responsive", "showSizeChanger", "selectComponentClass", "pageSizeOptions"]);
  const {
    xs
  } = useBreakpoint(responsive);
  const [, token] = useToken();
  const {
    getPrefixCls,
    direction,
    showSizeChanger: contextShowSizeChangerConfig,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("pagination");
  const prefixCls = getPrefixCls("pagination", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$2(prefixCls);
  const mergedSize = useSize(customizeSize);
  const isSmall = mergedSize === "small" || !!(xs && !mergedSize && responsive);
  const [contextLocale] = useLocale("Pagination", locale$1);
  const locale2 = Object.assign(Object.assign({}, contextLocale), customLocale);
  const [propShowSizeChanger, propSizeChangerSelectProps] = useShowSizeChanger(showSizeChanger);
  const [contextShowSizeChanger, contextSizeChangerSelectProps] = useShowSizeChanger(contextShowSizeChangerConfig);
  const mergedShowSizeChanger = propShowSizeChanger !== null && propShowSizeChanger !== void 0 ? propShowSizeChanger : contextShowSizeChanger;
  const mergedShowSizeChangerSelectProps = propSizeChangerSelectProps !== null && propSizeChangerSelectProps !== void 0 ? propSizeChangerSelectProps : contextSizeChangerSelectProps;
  const SizeChanger = selectComponentClass || Select;
  const mergedPageSizeOptions = reactExports.useMemo(() => {
    return pageSizeOptions ? pageSizeOptions.map((option) => Number(option)) : void 0;
  }, [pageSizeOptions]);
  const sizeChangerRender = (info) => {
    var _a;
    const {
      disabled,
      size: pageSize,
      onSizeChange,
      "aria-label": ariaLabel,
      className: sizeChangerClassName,
      options
    } = info;
    const {
      className: propSizeChangerClassName,
      onChange: propSizeChangerOnChange
    } = mergedShowSizeChangerSelectProps || {};
    const selectedValue = (_a = options.find((option) => String(option.value) === String(pageSize))) === null || _a === void 0 ? void 0 : _a.value;
    return /* @__PURE__ */ reactExports.createElement(SizeChanger, Object.assign({
      disabled,
      showSearch: true,
      popupMatchSelectWidth: false,
      getPopupContainer: (triggerNode) => triggerNode.parentNode,
      "aria-label": ariaLabel,
      options
    }, mergedShowSizeChangerSelectProps, {
      value: selectedValue,
      onChange: (nextSize, option) => {
        onSizeChange === null || onSizeChange === void 0 ? void 0 : onSizeChange(nextSize);
        propSizeChangerOnChange === null || propSizeChangerOnChange === void 0 ? void 0 : propSizeChangerOnChange(nextSize, option);
      },
      size: isSmall ? "small" : "middle",
      className: classNames(sizeChangerClassName, propSizeChangerClassName)
    }));
  };
  const iconsProps = reactExports.useMemo(() => {
    const ellipsis = /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-item-ellipsis`
    }, "•••");
    const prevIcon = /* @__PURE__ */ reactExports.createElement("button", {
      className: `${prefixCls}-item-link`,
      type: "button",
      tabIndex: -1
    }, direction === "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$e, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$c, null));
    const nextIcon = /* @__PURE__ */ reactExports.createElement("button", {
      className: `${prefixCls}-item-link`,
      type: "button",
      tabIndex: -1
    }, direction === "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$c, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$e, null));
    const jumpPrevIcon = (
      // biome-ignore lint/a11y/useValidAnchor: it is hard to refactor
      /* @__PURE__ */ reactExports.createElement("a", {
        className: `${prefixCls}-item-link`
      }, /* @__PURE__ */ reactExports.createElement("div", {
        className: `${prefixCls}-item-container`
      }, direction === "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$a, {
        className: `${prefixCls}-item-link-icon`
      }) : /* @__PURE__ */ reactExports.createElement(RefIcon$b, {
        className: `${prefixCls}-item-link-icon`
      }), ellipsis))
    );
    const jumpNextIcon = (
      // biome-ignore lint/a11y/useValidAnchor: it is hard to refactor
      /* @__PURE__ */ reactExports.createElement("a", {
        className: `${prefixCls}-item-link`
      }, /* @__PURE__ */ reactExports.createElement("div", {
        className: `${prefixCls}-item-container`
      }, direction === "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$b, {
        className: `${prefixCls}-item-link-icon`
      }) : /* @__PURE__ */ reactExports.createElement(RefIcon$a, {
        className: `${prefixCls}-item-link-icon`
      }), ellipsis))
    );
    return {
      prevIcon,
      nextIcon,
      jumpPrevIcon,
      jumpNextIcon
    };
  }, [direction, prefixCls]);
  const selectPrefixCls = getPrefixCls("select", customizeSelectPrefixCls);
  const extendedClassName = classNames({
    [`${prefixCls}-${align}`]: !!align,
    [`${prefixCls}-mini`]: isSmall,
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-bordered`]: token.wireframe
  }, contextClassName, className, rootClassName, hashId, cssVarCls);
  const mergedStyle = Object.assign(Object.assign({}, contextStyle), style);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, token.wireframe && /* @__PURE__ */ reactExports.createElement(BorderedStyle, {
    prefixCls
  }), /* @__PURE__ */ reactExports.createElement(Pagination$1, Object.assign({}, iconsProps, restProps, {
    style: mergedStyle,
    prefixCls,
    selectPrefixCls,
    className: extendedClassName,
    locale: locale2,
    pageSizeOptions: mergedPageSizeOptions,
    showSizeChanger: mergedShowSizeChanger,
    sizeChangerRender
  }))));
};
var EXPAND_COLUMN = {};
var INTERNAL_HOOKS = "rc-table-internal-hook";
function createContext(defaultValue) {
  var Context = /* @__PURE__ */ reactExports.createContext(void 0);
  var Provider = function Provider2(_ref) {
    var value = _ref.value, children = _ref.children;
    var valueRef = reactExports.useRef(value);
    valueRef.current = value;
    var _React$useState = reactExports.useState(function() {
      return {
        getValue: function getValue() {
          return valueRef.current;
        },
        listeners: /* @__PURE__ */ new Set()
      };
    }), _React$useState2 = _slicedToArray(_React$useState, 1), context = _React$useState2[0];
    useLayoutEffect(function() {
      reactDomExports.unstable_batchedUpdates(function() {
        context.listeners.forEach(function(listener) {
          listener(value);
        });
      });
    }, [value]);
    return /* @__PURE__ */ reactExports.createElement(Context.Provider, {
      value: context
    }, children);
  };
  return {
    Context,
    Provider,
    defaultValue
  };
}
function useContext(holder, selector) {
  var eventSelector = useEvent(typeof selector === "function" ? selector : function(ctx) {
    if (selector === void 0) {
      return ctx;
    }
    if (!Array.isArray(selector)) {
      return ctx[selector];
    }
    var obj = {};
    selector.forEach(function(key) {
      obj[key] = ctx[key];
    });
    return obj;
  });
  var context = reactExports.useContext(holder === null || holder === void 0 ? void 0 : holder.Context);
  var _ref2 = context || {}, listeners = _ref2.listeners, getValue = _ref2.getValue;
  var valueRef = reactExports.useRef();
  valueRef.current = eventSelector(context ? getValue() : holder === null || holder === void 0 ? void 0 : holder.defaultValue);
  var _React$useState3 = reactExports.useState({}), _React$useState4 = _slicedToArray(_React$useState3, 2), forceUpdate = _React$useState4[1];
  useLayoutEffect(function() {
    if (!context) {
      return;
    }
    function trigger(nextValue) {
      var nextSelectorValue = eventSelector(nextValue);
      if (!isEqual(valueRef.current, nextSelectorValue, true)) {
        forceUpdate({});
      }
    }
    listeners.add(trigger);
    return function() {
      listeners.delete(trigger);
    };
  }, [context]);
  return valueRef.current;
}
function createImmutable() {
  var ImmutableContext = /* @__PURE__ */ reactExports.createContext(null);
  function useImmutableMark2() {
    return reactExports.useContext(ImmutableContext);
  }
  function makeImmutable2(Component, shouldTriggerRender) {
    var refAble = supportRef(Component);
    var ImmutableComponent = function ImmutableComponent2(props, ref) {
      var refProps = refAble ? {
        ref
      } : {};
      var renderTimesRef = reactExports.useRef(0);
      var prevProps = reactExports.useRef(props);
      var mark = useImmutableMark2();
      if (mark !== null) {
        return /* @__PURE__ */ reactExports.createElement(Component, _extends({}, props, refProps));
      }
      if (
        // Always trigger re-render if not provide `notTriggerRender`
        !shouldTriggerRender || shouldTriggerRender(prevProps.current, props)
      ) {
        renderTimesRef.current += 1;
      }
      prevProps.current = props;
      return /* @__PURE__ */ reactExports.createElement(ImmutableContext.Provider, {
        value: renderTimesRef.current
      }, /* @__PURE__ */ reactExports.createElement(Component, _extends({}, props, refProps)));
    };
    return refAble ? /* @__PURE__ */ reactExports.forwardRef(ImmutableComponent) : ImmutableComponent;
  }
  function responseImmutable2(Component, propsAreEqual) {
    var refAble = supportRef(Component);
    var ImmutableComponent = function ImmutableComponent2(props, ref) {
      var refProps = refAble ? {
        ref
      } : {};
      useImmutableMark2();
      return /* @__PURE__ */ reactExports.createElement(Component, _extends({}, props, refProps));
    };
    return refAble ? /* @__PURE__ */ reactExports.memo(/* @__PURE__ */ reactExports.forwardRef(ImmutableComponent), propsAreEqual) : /* @__PURE__ */ reactExports.memo(ImmutableComponent, propsAreEqual);
  }
  return {
    makeImmutable: makeImmutable2,
    responseImmutable: responseImmutable2,
    useImmutableMark: useImmutableMark2
  };
}
var _createImmutable = createImmutable(), makeImmutable = _createImmutable.makeImmutable, responseImmutable = _createImmutable.responseImmutable, useImmutableMark = _createImmutable.useImmutableMark;
var TableContext = createContext();
var PerfContext = /* @__PURE__ */ reactExports.createContext({
  renderWithProps: false
});
var INTERNAL_KEY_PREFIX = "RC_TABLE_KEY";
function toArray(arr) {
  if (arr === void 0 || arr === null) {
    return [];
  }
  return Array.isArray(arr) ? arr : [arr];
}
function getColumnsKey(columns) {
  var columnKeys = [];
  var keys = {};
  columns.forEach(function(column) {
    var _ref = column || {}, key = _ref.key, dataIndex = _ref.dataIndex;
    var mergedKey = key || toArray(dataIndex).join("-") || INTERNAL_KEY_PREFIX;
    while (keys[mergedKey]) {
      mergedKey = "".concat(mergedKey, "_next");
    }
    keys[mergedKey] = true;
    columnKeys.push(mergedKey);
  });
  return columnKeys;
}
function validateValue(val) {
  return val !== null && val !== void 0;
}
function validNumberValue(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function isRenderCell(data) {
  return data && _typeof(data) === "object" && !Array.isArray(data) && !/* @__PURE__ */ reactExports.isValidElement(data);
}
function useCellRender(record, dataIndex, renderIndex, children, render, shouldCellUpdate) {
  var perfRecord = reactExports.useContext(PerfContext);
  var mark = useImmutableMark();
  var retData = useMemo(function() {
    if (validateValue(children)) {
      return [children];
    }
    var path = dataIndex === null || dataIndex === void 0 || dataIndex === "" ? [] : Array.isArray(dataIndex) ? dataIndex : [dataIndex];
    var value = get(record, path);
    var returnChildNode = value;
    var returnCellProps = void 0;
    if (render) {
      var renderData = render(value, record, renderIndex);
      if (isRenderCell(renderData)) {
        returnChildNode = renderData.children;
        returnCellProps = renderData.props;
        perfRecord.renderWithProps = true;
      } else {
        returnChildNode = renderData;
      }
    }
    return [returnChildNode, returnCellProps];
  }, [
    // Force update deps
    mark,
    // Normal deps
    record,
    children,
    dataIndex,
    render,
    renderIndex
  ], function(prev, next) {
    if (shouldCellUpdate) {
      var _prev = _slicedToArray(prev, 2), prevRecord = _prev[1];
      var _next = _slicedToArray(next, 2), nextRecord = _next[1];
      return shouldCellUpdate(nextRecord, prevRecord);
    }
    if (perfRecord.renderWithProps) {
      return true;
    }
    return !isEqual(prev, next, true);
  });
  return retData;
}
function inHoverRange(cellStartRow, cellRowSpan, startRow, endRow) {
  var cellEndRow = cellStartRow + cellRowSpan - 1;
  return cellStartRow <= endRow && cellEndRow >= startRow;
}
function useHoverState(rowIndex, rowSpan) {
  return useContext(TableContext, function(ctx) {
    var hovering = inHoverRange(rowIndex, rowSpan || 1, ctx.hoverStartRow, ctx.hoverEndRow);
    return [hovering, ctx.onHover];
  });
}
var getTitleFromCellRenderChildren = function getTitleFromCellRenderChildren2(_ref) {
  var ellipsis = _ref.ellipsis, rowType = _ref.rowType, children = _ref.children;
  var title;
  var ellipsisConfig = ellipsis === true ? {
    showTitle: true
  } : ellipsis;
  if (ellipsisConfig && (ellipsisConfig.showTitle || rowType === "header")) {
    if (typeof children === "string" || typeof children === "number") {
      title = children.toString();
    } else if (/* @__PURE__ */ reactExports.isValidElement(children) && typeof children.props.children === "string") {
      title = children.props.children;
    }
  }
  return title;
};
function Cell(props) {
  var _ref2, _ref3, _legacyCellProps$colS, _ref4, _ref5, _legacyCellProps$rowS, _additionalProps$titl, _classNames;
  var Component = props.component, children = props.children, ellipsis = props.ellipsis, scope = props.scope, prefixCls = props.prefixCls, className = props.className, align = props.align, record = props.record, render = props.render, dataIndex = props.dataIndex, renderIndex = props.renderIndex, shouldCellUpdate = props.shouldCellUpdate, index = props.index, rowType = props.rowType, colSpan = props.colSpan, rowSpan = props.rowSpan, fixLeft = props.fixLeft, fixRight = props.fixRight, firstFixLeft = props.firstFixLeft, lastFixLeft = props.lastFixLeft, firstFixRight = props.firstFixRight, lastFixRight = props.lastFixRight, appendNode = props.appendNode, _props$additionalProp = props.additionalProps, additionalProps = _props$additionalProp === void 0 ? {} : _props$additionalProp, isSticky = props.isSticky;
  var cellPrefixCls = "".concat(prefixCls, "-cell");
  var _useContext = useContext(TableContext, ["supportSticky", "allColumnsFixedLeft", "rowHoverable"]), supportSticky = _useContext.supportSticky, allColumnsFixedLeft = _useContext.allColumnsFixedLeft, rowHoverable = _useContext.rowHoverable;
  var _useCellRender = useCellRender(record, dataIndex, renderIndex, children, render, shouldCellUpdate), _useCellRender2 = _slicedToArray(_useCellRender, 2), childNode = _useCellRender2[0], legacyCellProps = _useCellRender2[1];
  var fixedStyle = {};
  var isFixLeft = typeof fixLeft === "number" && supportSticky;
  var isFixRight = typeof fixRight === "number" && supportSticky;
  if (isFixLeft) {
    fixedStyle.position = "sticky";
    fixedStyle.left = fixLeft;
  }
  if (isFixRight) {
    fixedStyle.position = "sticky";
    fixedStyle.right = fixRight;
  }
  var mergedColSpan = (_ref2 = (_ref3 = (_legacyCellProps$colS = legacyCellProps === null || legacyCellProps === void 0 ? void 0 : legacyCellProps.colSpan) !== null && _legacyCellProps$colS !== void 0 ? _legacyCellProps$colS : additionalProps.colSpan) !== null && _ref3 !== void 0 ? _ref3 : colSpan) !== null && _ref2 !== void 0 ? _ref2 : 1;
  var mergedRowSpan = (_ref4 = (_ref5 = (_legacyCellProps$rowS = legacyCellProps === null || legacyCellProps === void 0 ? void 0 : legacyCellProps.rowSpan) !== null && _legacyCellProps$rowS !== void 0 ? _legacyCellProps$rowS : additionalProps.rowSpan) !== null && _ref5 !== void 0 ? _ref5 : rowSpan) !== null && _ref4 !== void 0 ? _ref4 : 1;
  var _useHoverState = useHoverState(index, mergedRowSpan), _useHoverState2 = _slicedToArray(_useHoverState, 2), hovering = _useHoverState2[0], onHover = _useHoverState2[1];
  var onMouseEnter = useEvent(function(event) {
    var _additionalProps$onMo;
    if (record) {
      onHover(index, index + mergedRowSpan - 1);
    }
    additionalProps === null || additionalProps === void 0 || (_additionalProps$onMo = additionalProps.onMouseEnter) === null || _additionalProps$onMo === void 0 || _additionalProps$onMo.call(additionalProps, event);
  });
  var onMouseLeave = useEvent(function(event) {
    var _additionalProps$onMo2;
    if (record) {
      onHover(-1, -1);
    }
    additionalProps === null || additionalProps === void 0 || (_additionalProps$onMo2 = additionalProps.onMouseLeave) === null || _additionalProps$onMo2 === void 0 || _additionalProps$onMo2.call(additionalProps, event);
  });
  if (mergedColSpan === 0 || mergedRowSpan === 0) {
    return null;
  }
  var title = (_additionalProps$titl = additionalProps.title) !== null && _additionalProps$titl !== void 0 ? _additionalProps$titl : getTitleFromCellRenderChildren({
    rowType,
    ellipsis,
    children: childNode
  });
  var mergedClassName = classNames(cellPrefixCls, className, (_classNames = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_classNames, "".concat(cellPrefixCls, "-fix-left"), isFixLeft && supportSticky), "".concat(cellPrefixCls, "-fix-left-first"), firstFixLeft && supportSticky), "".concat(cellPrefixCls, "-fix-left-last"), lastFixLeft && supportSticky), "".concat(cellPrefixCls, "-fix-left-all"), lastFixLeft && allColumnsFixedLeft && supportSticky), "".concat(cellPrefixCls, "-fix-right"), isFixRight && supportSticky), "".concat(cellPrefixCls, "-fix-right-first"), firstFixRight && supportSticky), "".concat(cellPrefixCls, "-fix-right-last"), lastFixRight && supportSticky), "".concat(cellPrefixCls, "-ellipsis"), ellipsis), "".concat(cellPrefixCls, "-with-append"), appendNode), "".concat(cellPrefixCls, "-fix-sticky"), (isFixLeft || isFixRight) && isSticky && supportSticky), _defineProperty(_classNames, "".concat(cellPrefixCls, "-row-hover"), !legacyCellProps && hovering)), additionalProps.className, legacyCellProps === null || legacyCellProps === void 0 ? void 0 : legacyCellProps.className);
  var alignStyle = {};
  if (align) {
    alignStyle.textAlign = align;
  }
  var mergedStyle = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, legacyCellProps === null || legacyCellProps === void 0 ? void 0 : legacyCellProps.style), fixedStyle), alignStyle), additionalProps.style);
  var mergedChildNode = childNode;
  if (_typeof(mergedChildNode) === "object" && !Array.isArray(mergedChildNode) && !/* @__PURE__ */ reactExports.isValidElement(mergedChildNode)) {
    mergedChildNode = null;
  }
  if (ellipsis && (lastFixLeft || firstFixRight)) {
    mergedChildNode = /* @__PURE__ */ reactExports.createElement("span", {
      className: "".concat(cellPrefixCls, "-content")
    }, mergedChildNode);
  }
  return /* @__PURE__ */ reactExports.createElement(Component, _extends({}, legacyCellProps, additionalProps, {
    className: mergedClassName,
    style: mergedStyle,
    title,
    scope,
    onMouseEnter: rowHoverable ? onMouseEnter : void 0,
    onMouseLeave: rowHoverable ? onMouseLeave : void 0,
    colSpan: mergedColSpan !== 1 ? mergedColSpan : null,
    rowSpan: mergedRowSpan !== 1 ? mergedRowSpan : null
  }), appendNode, mergedChildNode);
}
const Cell$1 = /* @__PURE__ */ reactExports.memo(Cell);
function getCellFixedInfo(colStart, colEnd, columns, stickyOffsets, direction) {
  var startColumn = columns[colStart] || {};
  var endColumn = columns[colEnd] || {};
  var fixLeft;
  var fixRight;
  if (startColumn.fixed === "left") {
    fixLeft = stickyOffsets.left[direction === "rtl" ? colEnd : colStart];
  } else if (endColumn.fixed === "right") {
    fixRight = stickyOffsets.right[direction === "rtl" ? colStart : colEnd];
  }
  var lastFixLeft = false;
  var firstFixRight = false;
  var lastFixRight = false;
  var firstFixLeft = false;
  var nextColumn = columns[colEnd + 1];
  var prevColumn = columns[colStart - 1];
  var canLastFix = nextColumn && !nextColumn.fixed || prevColumn && !prevColumn.fixed || columns.every(function(col) {
    return col.fixed === "left";
  });
  if (direction === "rtl") {
    if (fixLeft !== void 0) {
      var prevFixLeft = prevColumn && prevColumn.fixed === "left";
      firstFixLeft = !prevFixLeft && canLastFix;
    } else if (fixRight !== void 0) {
      var nextFixRight = nextColumn && nextColumn.fixed === "right";
      lastFixRight = !nextFixRight && canLastFix;
    }
  } else if (fixLeft !== void 0) {
    var nextFixLeft = nextColumn && nextColumn.fixed === "left";
    lastFixLeft = !nextFixLeft && canLastFix;
  } else if (fixRight !== void 0) {
    var prevFixRight = prevColumn && prevColumn.fixed === "right";
    firstFixRight = !prevFixRight && canLastFix;
  }
  return {
    fixLeft,
    fixRight,
    lastFixLeft,
    firstFixRight,
    lastFixRight,
    firstFixLeft,
    isSticky: stickyOffsets.isSticky
  };
}
var SummaryContext = /* @__PURE__ */ reactExports.createContext({});
function SummaryCell(_ref) {
  var className = _ref.className, index = _ref.index, children = _ref.children, _ref$colSpan = _ref.colSpan, colSpan = _ref$colSpan === void 0 ? 1 : _ref$colSpan, rowSpan = _ref.rowSpan, align = _ref.align;
  var _useContext = useContext(TableContext, ["prefixCls", "direction"]), prefixCls = _useContext.prefixCls, direction = _useContext.direction;
  var _React$useContext = reactExports.useContext(SummaryContext), scrollColumnIndex = _React$useContext.scrollColumnIndex, stickyOffsets = _React$useContext.stickyOffsets, flattenColumns = _React$useContext.flattenColumns;
  var lastIndex = index + colSpan - 1;
  var mergedColSpan = lastIndex + 1 === scrollColumnIndex ? colSpan + 1 : colSpan;
  var fixedInfo = getCellFixedInfo(index, index + mergedColSpan - 1, flattenColumns, stickyOffsets, direction);
  return /* @__PURE__ */ reactExports.createElement(Cell$1, _extends({
    className,
    index,
    component: "td",
    prefixCls,
    record: null,
    dataIndex: null,
    align,
    colSpan: mergedColSpan,
    rowSpan,
    render: function render() {
      return children;
    }
  }, fixedInfo));
}
var _excluded$8 = ["children"];
function FooterRow(_ref) {
  var children = _ref.children, props = _objectWithoutProperties(_ref, _excluded$8);
  return /* @__PURE__ */ reactExports.createElement("tr", props, children);
}
function Summary(_ref) {
  var children = _ref.children;
  return children;
}
Summary.Row = FooterRow;
Summary.Cell = SummaryCell;
function Footer(props) {
  var children = props.children, stickyOffsets = props.stickyOffsets, flattenColumns = props.flattenColumns;
  var prefixCls = useContext(TableContext, "prefixCls");
  var lastColumnIndex = flattenColumns.length - 1;
  var scrollColumn = flattenColumns[lastColumnIndex];
  var summaryContext = reactExports.useMemo(function() {
    return {
      stickyOffsets,
      flattenColumns,
      scrollColumnIndex: scrollColumn !== null && scrollColumn !== void 0 && scrollColumn.scrollbar ? lastColumnIndex : null
    };
  }, [scrollColumn, flattenColumns, lastColumnIndex, stickyOffsets]);
  return /* @__PURE__ */ reactExports.createElement(SummaryContext.Provider, {
    value: summaryContext
  }, /* @__PURE__ */ reactExports.createElement("tfoot", {
    className: "".concat(prefixCls, "-summary")
  }, children));
}
const Footer$1 = responseImmutable(Footer);
var FooterComponents = Summary;
function Column$1(_) {
  return null;
}
function ColumnGroup$1(_) {
  return null;
}
function fillRecords(list, record, indent, childrenColumnName, expandedKeys, getRowKey, index) {
  var key = getRowKey(record, index);
  list.push({
    record,
    indent,
    index,
    rowKey: key
  });
  var expanded = expandedKeys === null || expandedKeys === void 0 ? void 0 : expandedKeys.has(key);
  if (record && Array.isArray(record[childrenColumnName]) && expanded) {
    for (var i = 0; i < record[childrenColumnName].length; i += 1) {
      fillRecords(list, record[childrenColumnName][i], indent + 1, childrenColumnName, expandedKeys, getRowKey, i);
    }
  }
}
function useFlattenRecords(data, childrenColumnName, expandedKeys, getRowKey) {
  var arr = reactExports.useMemo(function() {
    if (expandedKeys !== null && expandedKeys !== void 0 && expandedKeys.size) {
      var list = [];
      for (var i = 0; i < (data === null || data === void 0 ? void 0 : data.length); i += 1) {
        var record = data[i];
        fillRecords(list, record, 0, childrenColumnName, expandedKeys, getRowKey, i);
      }
      return list;
    }
    return data === null || data === void 0 ? void 0 : data.map(function(item, index) {
      return {
        record: item,
        indent: 0,
        index,
        rowKey: getRowKey(item, index)
      };
    });
  }, [data, childrenColumnName, expandedKeys, getRowKey]);
  return arr;
}
function useRowInfo(record, rowKey, recordIndex, indent) {
  var context = useContext(TableContext, ["prefixCls", "fixedInfoList", "flattenColumns", "expandableType", "expandRowByClick", "onTriggerExpand", "rowClassName", "expandedRowClassName", "indentSize", "expandIcon", "expandedRowRender", "expandIconColumnIndex", "expandedKeys", "childrenColumnName", "rowExpandable", "onRow"]);
  var flattenColumns = context.flattenColumns, expandableType = context.expandableType, expandedKeys = context.expandedKeys, childrenColumnName = context.childrenColumnName, onTriggerExpand = context.onTriggerExpand, rowExpandable = context.rowExpandable, onRow = context.onRow, expandRowByClick = context.expandRowByClick, rowClassName = context.rowClassName;
  var nestExpandable = expandableType === "nest";
  var rowSupportExpand = expandableType === "row" && (!rowExpandable || rowExpandable(record));
  var mergedExpandable = rowSupportExpand || nestExpandable;
  var expanded = expandedKeys && expandedKeys.has(rowKey);
  var hasNestChildren = childrenColumnName && record && record[childrenColumnName];
  var onInternalTriggerExpand = useEvent(onTriggerExpand);
  var rowProps = onRow === null || onRow === void 0 ? void 0 : onRow(record, recordIndex);
  var onRowClick = rowProps === null || rowProps === void 0 ? void 0 : rowProps.onClick;
  var onClick = function onClick2(event) {
    if (expandRowByClick && mergedExpandable) {
      onTriggerExpand(record, event);
    }
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    onRowClick === null || onRowClick === void 0 || onRowClick.apply(void 0, [event].concat(args));
  };
  var computeRowClassName;
  if (typeof rowClassName === "string") {
    computeRowClassName = rowClassName;
  } else if (typeof rowClassName === "function") {
    computeRowClassName = rowClassName(record, recordIndex, indent);
  }
  var columnsKey = getColumnsKey(flattenColumns);
  return _objectSpread2(_objectSpread2({}, context), {}, {
    columnsKey,
    nestExpandable,
    expanded,
    hasNestChildren,
    record,
    onTriggerExpand: onInternalTriggerExpand,
    rowSupportExpand,
    expandable: mergedExpandable,
    rowProps: _objectSpread2(_objectSpread2({}, rowProps), {}, {
      className: classNames(computeRowClassName, rowProps === null || rowProps === void 0 ? void 0 : rowProps.className),
      onClick
    })
  });
}
function ExpandedRow(props) {
  var prefixCls = props.prefixCls, children = props.children, Component = props.component, cellComponent = props.cellComponent, className = props.className, expanded = props.expanded, colSpan = props.colSpan, isEmpty = props.isEmpty, _props$stickyOffset = props.stickyOffset, stickyOffset = _props$stickyOffset === void 0 ? 0 : _props$stickyOffset;
  var _useContext = useContext(TableContext, ["scrollbarSize", "fixHeader", "fixColumn", "componentWidth", "horizonScroll"]), scrollbarSize = _useContext.scrollbarSize, fixHeader = _useContext.fixHeader, fixColumn = _useContext.fixColumn, componentWidth = _useContext.componentWidth, horizonScroll = _useContext.horizonScroll;
  var contentNode = children;
  if (isEmpty ? horizonScroll && componentWidth : fixColumn) {
    contentNode = /* @__PURE__ */ reactExports.createElement("div", {
      style: {
        width: componentWidth - stickyOffset - (fixHeader && !isEmpty ? scrollbarSize : 0),
        position: "sticky",
        left: stickyOffset,
        overflow: "hidden"
      },
      className: "".concat(prefixCls, "-expanded-row-fixed")
    }, contentNode);
  }
  return /* @__PURE__ */ reactExports.createElement(Component, {
    className,
    style: {
      display: expanded ? null : "none"
    }
  }, /* @__PURE__ */ reactExports.createElement(Cell$1, {
    component: cellComponent,
    prefixCls,
    colSpan
  }, contentNode));
}
function renderExpandIcon$1(_ref) {
  var prefixCls = _ref.prefixCls, record = _ref.record, onExpand = _ref.onExpand, expanded = _ref.expanded, expandable = _ref.expandable;
  var expandClassName = "".concat(prefixCls, "-row-expand-icon");
  if (!expandable) {
    return /* @__PURE__ */ reactExports.createElement("span", {
      className: classNames(expandClassName, "".concat(prefixCls, "-row-spaced"))
    });
  }
  var onClick = function onClick2(event) {
    onExpand(record, event);
    event.stopPropagation();
  };
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: classNames(expandClassName, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-row-expanded"), expanded), "".concat(prefixCls, "-row-collapsed"), !expanded)),
    onClick
  });
}
function findAllChildrenKeys(data, getRowKey, childrenColumnName) {
  var keys = [];
  function dig(list) {
    (list || []).forEach(function(item, index) {
      keys.push(getRowKey(item, index));
      dig(item[childrenColumnName]);
    });
  }
  dig(data);
  return keys;
}
function computedExpandedClassName(cls, record, index, indent) {
  if (typeof cls === "string") {
    return cls;
  }
  if (typeof cls === "function") {
    return cls(record, index, indent);
  }
  return "";
}
function getCellProps(rowInfo, column, colIndex, indent, index) {
  var _column$onCell;
  var rowKeys = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
  var expandedRowOffset = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : 0;
  var record = rowInfo.record, prefixCls = rowInfo.prefixCls, columnsKey = rowInfo.columnsKey, fixedInfoList = rowInfo.fixedInfoList, expandIconColumnIndex = rowInfo.expandIconColumnIndex, nestExpandable = rowInfo.nestExpandable, indentSize = rowInfo.indentSize, expandIcon = rowInfo.expandIcon, expanded = rowInfo.expanded, hasNestChildren = rowInfo.hasNestChildren, onTriggerExpand = rowInfo.onTriggerExpand, expandable = rowInfo.expandable, expandedKeys = rowInfo.expandedKeys;
  var key = columnsKey[colIndex];
  var fixedInfo = fixedInfoList[colIndex];
  var appendCellNode;
  if (colIndex === (expandIconColumnIndex || 0) && nestExpandable) {
    appendCellNode = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("span", {
      style: {
        paddingLeft: "".concat(indentSize * indent, "px")
      },
      className: "".concat(prefixCls, "-row-indent indent-level-").concat(indent)
    }), expandIcon({
      prefixCls,
      expanded,
      expandable: hasNestChildren,
      record,
      onExpand: onTriggerExpand
    }));
  }
  var additionalCellProps = ((_column$onCell = column.onCell) === null || _column$onCell === void 0 ? void 0 : _column$onCell.call(column, record, index)) || {};
  if (expandedRowOffset) {
    var _additionalCellProps$ = additionalCellProps.rowSpan, rowSpan = _additionalCellProps$ === void 0 ? 1 : _additionalCellProps$;
    if (expandable && rowSpan && colIndex < expandedRowOffset) {
      var currentRowSpan = rowSpan;
      for (var i = index; i < index + rowSpan; i += 1) {
        var rowKey = rowKeys[i];
        if (expandedKeys.has(rowKey)) {
          currentRowSpan += 1;
        }
      }
      additionalCellProps.rowSpan = currentRowSpan;
    }
  }
  return {
    key,
    fixedInfo,
    appendCellNode,
    additionalCellProps
  };
}
function BodyRow(props) {
  var className = props.className, style = props.style, record = props.record, index = props.index, renderIndex = props.renderIndex, rowKey = props.rowKey, rowKeys = props.rowKeys, _props$indent = props.indent, indent = _props$indent === void 0 ? 0 : _props$indent, RowComponent = props.rowComponent, cellComponent = props.cellComponent, scopeCellComponent = props.scopeCellComponent, expandedRowInfo = props.expandedRowInfo;
  var rowInfo = useRowInfo(record, rowKey, index, indent);
  var prefixCls = rowInfo.prefixCls, flattenColumns = rowInfo.flattenColumns, expandedRowClassName = rowInfo.expandedRowClassName, expandedRowRender = rowInfo.expandedRowRender, rowProps = rowInfo.rowProps, expanded = rowInfo.expanded, rowSupportExpand = rowInfo.rowSupportExpand;
  var expandedRef = reactExports.useRef(false);
  expandedRef.current || (expandedRef.current = expanded);
  var expandedClsName = computedExpandedClassName(expandedRowClassName, record, index, indent);
  var baseRowNode = /* @__PURE__ */ reactExports.createElement(RowComponent, _extends({}, rowProps, {
    "data-row-key": rowKey,
    className: classNames(className, "".concat(prefixCls, "-row"), "".concat(prefixCls, "-row-level-").concat(indent), rowProps === null || rowProps === void 0 ? void 0 : rowProps.className, _defineProperty({}, expandedClsName, indent >= 1)),
    style: _objectSpread2(_objectSpread2({}, style), rowProps === null || rowProps === void 0 ? void 0 : rowProps.style)
  }), flattenColumns.map(function(column, colIndex) {
    var render = column.render, dataIndex = column.dataIndex, columnClassName = column.className;
    var _getCellProps = getCellProps(rowInfo, column, colIndex, indent, index, rowKeys, expandedRowInfo === null || expandedRowInfo === void 0 ? void 0 : expandedRowInfo.offset), key = _getCellProps.key, fixedInfo = _getCellProps.fixedInfo, appendCellNode = _getCellProps.appendCellNode, additionalCellProps = _getCellProps.additionalCellProps;
    return /* @__PURE__ */ reactExports.createElement(Cell$1, _extends({
      className: columnClassName,
      ellipsis: column.ellipsis,
      align: column.align,
      scope: column.rowScope,
      component: column.rowScope ? scopeCellComponent : cellComponent,
      prefixCls,
      key,
      record,
      index,
      renderIndex,
      dataIndex,
      render,
      shouldCellUpdate: column.shouldCellUpdate
    }, fixedInfo, {
      appendNode: appendCellNode,
      additionalProps: additionalCellProps
    }));
  }));
  var expandRowNode;
  if (rowSupportExpand && (expandedRef.current || expanded)) {
    var expandContent = expandedRowRender(record, index, indent + 1, expanded);
    expandRowNode = /* @__PURE__ */ reactExports.createElement(ExpandedRow, {
      expanded,
      className: classNames("".concat(prefixCls, "-expanded-row"), "".concat(prefixCls, "-expanded-row-level-").concat(indent + 1), expandedClsName),
      prefixCls,
      component: RowComponent,
      cellComponent,
      colSpan: expandedRowInfo ? expandedRowInfo.colSpan : flattenColumns.length,
      stickyOffset: expandedRowInfo === null || expandedRowInfo === void 0 ? void 0 : expandedRowInfo.sticky,
      isEmpty: false
    }, expandContent);
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, baseRowNode, expandRowNode);
}
const BodyRow$1 = responseImmutable(BodyRow);
function MeasureCell(_ref) {
  var columnKey = _ref.columnKey, onColumnResize = _ref.onColumnResize, prefixCls = _ref.prefixCls, title = _ref.title;
  var cellRef = reactExports.useRef();
  useLayoutEffect(function() {
    if (cellRef.current) {
      onColumnResize(columnKey, cellRef.current.offsetWidth);
    }
  }, []);
  return /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    data: columnKey
  }, /* @__PURE__ */ reactExports.createElement("th", {
    ref: cellRef,
    className: "".concat(prefixCls, "-measure-cell")
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-measure-cell-content")
  }, title || " ")));
}
function MeasureRow(_ref) {
  var prefixCls = _ref.prefixCls, columnsKey = _ref.columnsKey, onColumnResize = _ref.onColumnResize, columns = _ref.columns;
  var ref = reactExports.useRef(null);
  var _useContext = useContext(TableContext, ["measureRowRender"]), measureRowRender = _useContext.measureRowRender;
  var measureRow = /* @__PURE__ */ reactExports.createElement("tr", {
    "aria-hidden": "true",
    className: "".concat(prefixCls, "-measure-row"),
    ref,
    tabIndex: -1
  }, /* @__PURE__ */ reactExports.createElement(RefResizeObserver.Collection, {
    onBatchResize: function onBatchResize(infoList) {
      if (isVisible(ref.current)) {
        infoList.forEach(function(_ref2) {
          var columnKey = _ref2.data, size = _ref2.size;
          onColumnResize(columnKey, size.offsetWidth);
        });
      }
    }
  }, columnsKey.map(function(columnKey) {
    var column = columns.find(function(col) {
      return col.key === columnKey;
    });
    var rawTitle = column === null || column === void 0 ? void 0 : column.title;
    var titleForMeasure = /* @__PURE__ */ reactExports.isValidElement(rawTitle) ? /* @__PURE__ */ reactExports.cloneElement(rawTitle, {
      ref: null
    }) : rawTitle;
    return /* @__PURE__ */ reactExports.createElement(MeasureCell, {
      prefixCls,
      key: columnKey,
      columnKey,
      onColumnResize,
      title: titleForMeasure
    });
  })));
  return measureRowRender ? measureRowRender(measureRow) : measureRow;
}
function Body(props) {
  var data = props.data, measureColumnWidth = props.measureColumnWidth;
  var _useContext = useContext(TableContext, ["prefixCls", "getComponent", "onColumnResize", "flattenColumns", "getRowKey", "expandedKeys", "childrenColumnName", "emptyNode", "expandedRowOffset", "fixedInfoList", "colWidths"]), prefixCls = _useContext.prefixCls, getComponent = _useContext.getComponent, onColumnResize = _useContext.onColumnResize, flattenColumns = _useContext.flattenColumns, getRowKey = _useContext.getRowKey, expandedKeys = _useContext.expandedKeys, childrenColumnName = _useContext.childrenColumnName, emptyNode = _useContext.emptyNode, _useContext$expandedR = _useContext.expandedRowOffset, expandedRowOffset = _useContext$expandedR === void 0 ? 0 : _useContext$expandedR, colWidths = _useContext.colWidths;
  var flattenData2 = useFlattenRecords(data, childrenColumnName, expandedKeys, getRowKey);
  var rowKeys = reactExports.useMemo(function() {
    return flattenData2.map(function(item) {
      return item.rowKey;
    });
  }, [flattenData2]);
  var perfRef = reactExports.useRef({
    renderWithProps: false
  });
  var expandedRowInfo = reactExports.useMemo(function() {
    var expandedColSpan = flattenColumns.length - expandedRowOffset;
    var expandedStickyStart = 0;
    for (var i = 0; i < expandedRowOffset; i += 1) {
      expandedStickyStart += colWidths[i] || 0;
    }
    return {
      offset: expandedRowOffset,
      colSpan: expandedColSpan,
      sticky: expandedStickyStart
    };
  }, [flattenColumns.length, expandedRowOffset, colWidths]);
  var WrapperComponent = getComponent(["body", "wrapper"], "tbody");
  var trComponent = getComponent(["body", "row"], "tr");
  var tdComponent = getComponent(["body", "cell"], "td");
  var thComponent = getComponent(["body", "cell"], "th");
  var rows;
  if (data.length) {
    rows = flattenData2.map(function(item, idx) {
      var record = item.record, indent = item.indent, renderIndex = item.index, rowKey = item.rowKey;
      return /* @__PURE__ */ reactExports.createElement(BodyRow$1, {
        key: rowKey,
        rowKey,
        rowKeys,
        record,
        index: idx,
        renderIndex,
        rowComponent: trComponent,
        cellComponent: tdComponent,
        scopeCellComponent: thComponent,
        indent,
        expandedRowInfo
      });
    });
  } else {
    rows = /* @__PURE__ */ reactExports.createElement(ExpandedRow, {
      expanded: true,
      className: "".concat(prefixCls, "-placeholder"),
      prefixCls,
      component: trComponent,
      cellComponent: tdComponent,
      colSpan: flattenColumns.length,
      isEmpty: true
    }, emptyNode);
  }
  var columnsKey = getColumnsKey(flattenColumns);
  return /* @__PURE__ */ reactExports.createElement(PerfContext.Provider, {
    value: perfRef.current
  }, /* @__PURE__ */ reactExports.createElement(WrapperComponent, {
    className: "".concat(prefixCls, "-tbody")
  }, measureColumnWidth && /* @__PURE__ */ reactExports.createElement(MeasureRow, {
    prefixCls,
    columnsKey,
    onColumnResize,
    columns: flattenColumns
  }), rows));
}
const Body$1 = responseImmutable(Body);
var _excluded$7 = ["expandable"];
var INTERNAL_COL_DEFINE = "RC_TABLE_INTERNAL_COL_DEFINE";
function getExpandableProps(props) {
  var expandable = props.expandable, legacyExpandableConfig = _objectWithoutProperties(props, _excluded$7);
  var config;
  if ("expandable" in props) {
    config = _objectSpread2(_objectSpread2({}, legacyExpandableConfig), expandable);
  } else {
    config = legacyExpandableConfig;
  }
  if (config.showExpandColumn === false) {
    config.expandIconColumnIndex = -1;
  }
  return config;
}
var _excluded$6 = ["columnType"];
function ColGroup(_ref) {
  var colWidths = _ref.colWidths, columns = _ref.columns, columCount = _ref.columCount;
  var _useContext = useContext(TableContext, ["tableLayout"]), tableLayout = _useContext.tableLayout;
  var cols = [];
  var len = columCount || columns.length;
  var mustInsert = false;
  for (var i = len - 1; i >= 0; i -= 1) {
    var width = colWidths[i];
    var column = columns && columns[i];
    var additionalProps = void 0;
    var minWidth = void 0;
    if (column) {
      additionalProps = column[INTERNAL_COL_DEFINE];
      if (tableLayout === "auto") {
        minWidth = column.minWidth;
      }
    }
    if (width || minWidth || additionalProps || mustInsert) {
      var _ref2 = additionalProps || {};
      _ref2.columnType;
      var restAdditionalProps = _objectWithoutProperties(_ref2, _excluded$6);
      cols.unshift(/* @__PURE__ */ reactExports.createElement("col", _extends({
        key: i,
        style: {
          width,
          minWidth
        }
      }, restAdditionalProps)));
      mustInsert = true;
    }
  }
  return cols.length > 0 ? /* @__PURE__ */ reactExports.createElement("colgroup", null, cols) : null;
}
var _excluded$5 = ["className", "noData", "columns", "flattenColumns", "colWidths", "colGroup", "columCount", "stickyOffsets", "direction", "fixHeader", "stickyTopOffset", "stickyBottomOffset", "stickyClassName", "scrollX", "tableLayout", "onScroll", "children"];
function useColumnWidth(colWidths, columCount) {
  return reactExports.useMemo(function() {
    var cloneColumns = [];
    for (var i = 0; i < columCount; i += 1) {
      var val = colWidths[i];
      if (val !== void 0) {
        cloneColumns[i] = val;
      } else {
        return null;
      }
    }
    return cloneColumns;
  }, [colWidths.join("_"), columCount]);
}
var FixedHolder = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var className = props.className, noData = props.noData, columns = props.columns, flattenColumns = props.flattenColumns, colWidths = props.colWidths, colGroup = props.colGroup, columCount = props.columCount, stickyOffsets = props.stickyOffsets, direction = props.direction, fixHeader = props.fixHeader, stickyTopOffset = props.stickyTopOffset, stickyBottomOffset = props.stickyBottomOffset, stickyClassName = props.stickyClassName, scrollX = props.scrollX, _props$tableLayout = props.tableLayout, tableLayout = _props$tableLayout === void 0 ? "fixed" : _props$tableLayout, onScroll = props.onScroll, children = props.children, restProps = _objectWithoutProperties(props, _excluded$5);
  var _useContext = useContext(TableContext, ["prefixCls", "scrollbarSize", "isSticky", "getComponent"]), prefixCls = _useContext.prefixCls, scrollbarSize = _useContext.scrollbarSize, isSticky = _useContext.isSticky, getComponent = _useContext.getComponent;
  var TableComponent = getComponent(["header", "table"], "table");
  var combinationScrollBarSize = isSticky && !fixHeader ? 0 : scrollbarSize;
  var scrollRef = reactExports.useRef(null);
  var setScrollRef = reactExports.useCallback(function(element) {
    fillRef(ref, element);
    fillRef(scrollRef, element);
  }, []);
  reactExports.useEffect(function() {
    function onWheel(e) {
      var _ref = e, currentTarget = _ref.currentTarget, deltaX = _ref.deltaX;
      if (deltaX) {
        onScroll({
          currentTarget,
          scrollLeft: currentTarget.scrollLeft + deltaX
        });
        e.preventDefault();
      }
    }
    var scrollEle = scrollRef.current;
    scrollEle === null || scrollEle === void 0 || scrollEle.addEventListener("wheel", onWheel, {
      passive: false
    });
    return function() {
      scrollEle === null || scrollEle === void 0 || scrollEle.removeEventListener("wheel", onWheel);
    };
  }, []);
  var lastColumn = flattenColumns[flattenColumns.length - 1];
  var ScrollBarColumn = {
    fixed: lastColumn ? lastColumn.fixed : null,
    scrollbar: true,
    onHeaderCell: function onHeaderCell() {
      return {
        className: "".concat(prefixCls, "-cell-scrollbar")
      };
    }
  };
  var columnsWithScrollbar = reactExports.useMemo(function() {
    return combinationScrollBarSize ? [].concat(_toConsumableArray(columns), [ScrollBarColumn]) : columns;
  }, [combinationScrollBarSize, columns]);
  var flattenColumnsWithScrollbar = reactExports.useMemo(function() {
    return combinationScrollBarSize ? [].concat(_toConsumableArray(flattenColumns), [ScrollBarColumn]) : flattenColumns;
  }, [combinationScrollBarSize, flattenColumns]);
  var headerStickyOffsets = reactExports.useMemo(function() {
    var right = stickyOffsets.right, left = stickyOffsets.left;
    return _objectSpread2(_objectSpread2({}, stickyOffsets), {}, {
      left: direction === "rtl" ? [].concat(_toConsumableArray(left.map(function(width) {
        return width + combinationScrollBarSize;
      })), [0]) : left,
      right: direction === "rtl" ? right : [].concat(_toConsumableArray(right.map(function(width) {
        return width + combinationScrollBarSize;
      })), [0]),
      isSticky
    });
  }, [combinationScrollBarSize, stickyOffsets, isSticky]);
  var mergedColumnWidth = useColumnWidth(colWidths, columCount);
  var isColGroupEmpty = reactExports.useMemo(function() {
    var noWidth = !mergedColumnWidth || !mergedColumnWidth.length || mergedColumnWidth.every(function(w) {
      return !w;
    });
    return noData || noWidth;
  }, [noData, mergedColumnWidth]);
  return /* @__PURE__ */ reactExports.createElement("div", {
    style: _objectSpread2({
      overflow: "hidden"
    }, isSticky ? {
      top: stickyTopOffset,
      bottom: stickyBottomOffset
    } : {}),
    ref: setScrollRef,
    className: classNames(className, _defineProperty({}, stickyClassName, !!stickyClassName))
  }, /* @__PURE__ */ reactExports.createElement(TableComponent, {
    style: {
      tableLayout,
      minWidth: "100%",
      // https://github.com/ant-design/ant-design/issues/54894
      width: scrollX
    }
  }, isColGroupEmpty ? colGroup : /* @__PURE__ */ reactExports.createElement(ColGroup, {
    colWidths: [].concat(_toConsumableArray(mergedColumnWidth), [combinationScrollBarSize]),
    columCount: columCount + 1,
    columns: flattenColumnsWithScrollbar
  }), children(_objectSpread2(_objectSpread2({}, restProps), {}, {
    stickyOffsets: headerStickyOffsets,
    columns: columnsWithScrollbar,
    flattenColumns: flattenColumnsWithScrollbar
  }))));
});
const FixedHolder$1 = /* @__PURE__ */ reactExports.memo(FixedHolder);
var HeaderRow = function HeaderRow2(props) {
  var cells = props.cells, stickyOffsets = props.stickyOffsets, flattenColumns = props.flattenColumns, RowComponent = props.rowComponent, CellComponent = props.cellComponent, onHeaderRow = props.onHeaderRow, index = props.index;
  var _useContext = useContext(TableContext, ["prefixCls", "direction"]), prefixCls = _useContext.prefixCls, direction = _useContext.direction;
  var rowProps;
  if (onHeaderRow) {
    rowProps = onHeaderRow(cells.map(function(cell) {
      return cell.column;
    }), index);
  }
  var columnsKey = getColumnsKey(cells.map(function(cell) {
    return cell.column;
  }));
  return /* @__PURE__ */ reactExports.createElement(RowComponent, rowProps, cells.map(function(cell, cellIndex) {
    var column = cell.column;
    var fixedInfo = getCellFixedInfo(cell.colStart, cell.colEnd, flattenColumns, stickyOffsets, direction);
    var additionalProps;
    if (column && column.onHeaderCell) {
      additionalProps = cell.column.onHeaderCell(column);
    }
    return /* @__PURE__ */ reactExports.createElement(Cell$1, _extends({}, cell, {
      scope: column.title ? cell.colSpan > 1 ? "colgroup" : "col" : null,
      ellipsis: column.ellipsis,
      align: column.align,
      component: CellComponent,
      prefixCls,
      key: columnsKey[cellIndex]
    }, fixedInfo, {
      additionalProps,
      rowType: "header"
    }));
  }));
};
function parseHeaderRows(rootColumns) {
  var rows = [];
  function fillRowCells(columns, colIndex) {
    var rowIndex2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    rows[rowIndex2] = rows[rowIndex2] || [];
    var currentColIndex = colIndex;
    var colSpans = columns.filter(Boolean).map(function(column) {
      var cell = {
        key: column.key,
        className: column.className || "",
        children: column.title,
        column,
        colStart: currentColIndex
      };
      var colSpan = 1;
      var subColumns = column.children;
      if (subColumns && subColumns.length > 0) {
        colSpan = fillRowCells(subColumns, currentColIndex, rowIndex2 + 1).reduce(function(total, count) {
          return total + count;
        }, 0);
        cell.hasSubColumns = true;
      }
      if ("colSpan" in column) {
        colSpan = column.colSpan;
      }
      if ("rowSpan" in column) {
        cell.rowSpan = column.rowSpan;
      }
      cell.colSpan = colSpan;
      cell.colEnd = cell.colStart + colSpan - 1;
      rows[rowIndex2].push(cell);
      currentColIndex += colSpan;
      return colSpan;
    });
    return colSpans;
  }
  fillRowCells(rootColumns, 0);
  var rowCount = rows.length;
  var _loop = function _loop2(rowIndex2) {
    rows[rowIndex2].forEach(function(cell) {
      if (!("rowSpan" in cell) && !cell.hasSubColumns) {
        cell.rowSpan = rowCount - rowIndex2;
      }
    });
  };
  for (var rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    _loop(rowIndex);
  }
  return rows;
}
var Header = function Header2(props) {
  var stickyOffsets = props.stickyOffsets, columns = props.columns, flattenColumns = props.flattenColumns, onHeaderRow = props.onHeaderRow;
  var _useContext = useContext(TableContext, ["prefixCls", "getComponent"]), prefixCls = _useContext.prefixCls, getComponent = _useContext.getComponent;
  var rows = reactExports.useMemo(function() {
    return parseHeaderRows(columns);
  }, [columns]);
  var WrapperComponent = getComponent(["header", "wrapper"], "thead");
  var trComponent = getComponent(["header", "row"], "tr");
  var thComponent = getComponent(["header", "cell"], "th");
  return /* @__PURE__ */ reactExports.createElement(WrapperComponent, {
    className: "".concat(prefixCls, "-thead")
  }, rows.map(function(row, rowIndex) {
    var rowNode = /* @__PURE__ */ reactExports.createElement(HeaderRow, {
      key: rowIndex,
      flattenColumns,
      cells: row,
      stickyOffsets,
      rowComponent: trComponent,
      cellComponent: thComponent,
      onHeaderRow,
      index: rowIndex
    });
    return rowNode;
  }));
};
const Header$1 = responseImmutable(Header);
function parseColWidth(totalWidth) {
  var width = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  if (typeof width === "number") {
    return width;
  }
  if (width.endsWith("%")) {
    return totalWidth * parseFloat(width) / 100;
  }
  return null;
}
function useWidthColumns(flattenColumns, scrollWidth, clientWidth) {
  return reactExports.useMemo(function() {
    if (scrollWidth && scrollWidth > 0) {
      var totalWidth = 0;
      var missWidthCount = 0;
      flattenColumns.forEach(function(col) {
        var colWidth = parseColWidth(scrollWidth, col.width);
        if (colWidth) {
          totalWidth += colWidth;
        } else {
          missWidthCount += 1;
        }
      });
      var maxFitWidth = Math.max(scrollWidth, clientWidth);
      var restWidth = Math.max(maxFitWidth - totalWidth, missWidthCount);
      var restCount = missWidthCount;
      var avgWidth = restWidth / missWidthCount;
      var realTotal = 0;
      var filledColumns = flattenColumns.map(function(col) {
        var clone = _objectSpread2({}, col);
        var colWidth = parseColWidth(scrollWidth, clone.width);
        if (colWidth) {
          clone.width = colWidth;
        } else {
          var colAvgWidth = Math.floor(avgWidth);
          clone.width = restCount === 1 ? restWidth : colAvgWidth;
          restWidth -= colAvgWidth;
          restCount -= 1;
        }
        realTotal += clone.width;
        return clone;
      });
      if (realTotal < maxFitWidth) {
        var scale = maxFitWidth / realTotal;
        restWidth = maxFitWidth;
        filledColumns.forEach(function(col, index) {
          var colWidth = Math.floor(col.width * scale);
          col.width = index === filledColumns.length - 1 ? restWidth : colWidth;
          restWidth -= colWidth;
        });
      }
      return [filledColumns, Math.max(realTotal, maxFitWidth)];
    }
    return [flattenColumns, scrollWidth];
  }, [flattenColumns, scrollWidth, clientWidth]);
}
var _excluded$4 = ["children"], _excluded2 = ["fixed"];
function convertChildrenToColumns(children) {
  return toArray$1(children).filter(function(node) {
    return /* @__PURE__ */ reactExports.isValidElement(node);
  }).map(function(_ref) {
    var key = _ref.key, props = _ref.props;
    var nodeChildren = props.children, restProps = _objectWithoutProperties(props, _excluded$4);
    var column = _objectSpread2({
      key
    }, restProps);
    if (nodeChildren) {
      column.children = convertChildrenToColumns(nodeChildren);
    }
    return column;
  });
}
function filterHiddenColumns(columns) {
  return columns.filter(function(column) {
    return column && _typeof(column) === "object" && !column.hidden;
  }).map(function(column) {
    var subColumns = column.children;
    if (subColumns && subColumns.length > 0) {
      return _objectSpread2(_objectSpread2({}, column), {}, {
        children: filterHiddenColumns(subColumns)
      });
    }
    return column;
  });
}
function flatColumns(columns) {
  var parentKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key";
  return columns.filter(function(column) {
    return column && _typeof(column) === "object";
  }).reduce(function(list, column, index) {
    var fixed = column.fixed;
    var parsedFixed = fixed === true ? "left" : fixed;
    var mergedKey = "".concat(parentKey, "-").concat(index);
    var subColumns = column.children;
    if (subColumns && subColumns.length > 0) {
      return [].concat(_toConsumableArray(list), _toConsumableArray(flatColumns(subColumns, mergedKey).map(function(subColum) {
        var _subColum$fixed;
        return _objectSpread2(_objectSpread2({}, subColum), {}, {
          fixed: (_subColum$fixed = subColum.fixed) !== null && _subColum$fixed !== void 0 ? _subColum$fixed : parsedFixed
        });
      })));
    }
    return [].concat(_toConsumableArray(list), [_objectSpread2(_objectSpread2({
      key: mergedKey
    }, column), {}, {
      fixed: parsedFixed
    })]);
  }, []);
}
function revertForRtl(columns) {
  return columns.map(function(column) {
    var fixed = column.fixed, restProps = _objectWithoutProperties(column, _excluded2);
    var parsedFixed = fixed;
    if (fixed === "left") {
      parsedFixed = "right";
    } else if (fixed === "right") {
      parsedFixed = "left";
    }
    return _objectSpread2({
      fixed: parsedFixed
    }, restProps);
  });
}
function useColumns(_ref2, transformColumns) {
  var prefixCls = _ref2.prefixCls, columns = _ref2.columns, children = _ref2.children, expandable = _ref2.expandable, expandedKeys = _ref2.expandedKeys, columnTitle = _ref2.columnTitle, getRowKey = _ref2.getRowKey, onTriggerExpand = _ref2.onTriggerExpand, expandIcon = _ref2.expandIcon, rowExpandable = _ref2.rowExpandable, expandIconColumnIndex = _ref2.expandIconColumnIndex, _ref2$expandedRowOffs = _ref2.expandedRowOffset, expandedRowOffset = _ref2$expandedRowOffs === void 0 ? 0 : _ref2$expandedRowOffs, direction = _ref2.direction, expandRowByClick = _ref2.expandRowByClick, columnWidth = _ref2.columnWidth, fixed = _ref2.fixed, scrollWidth = _ref2.scrollWidth, clientWidth = _ref2.clientWidth;
  var baseColumns = reactExports.useMemo(function() {
    var newColumns = columns || convertChildrenToColumns(children) || [];
    return filterHiddenColumns(newColumns.slice());
  }, [columns, children]);
  var withExpandColumns = reactExports.useMemo(function() {
    if (expandable) {
      var cloneColumns = baseColumns.slice();
      if (!cloneColumns.includes(EXPAND_COLUMN)) {
        var expandColIndex = expandIconColumnIndex || 0;
        var insertIndex = expandColIndex === 0 && fixed === "right" ? baseColumns.length : expandColIndex;
        if (insertIndex >= 0) {
          cloneColumns.splice(insertIndex, 0, EXPAND_COLUMN);
        }
      }
      var expandColumnIndex = cloneColumns.indexOf(EXPAND_COLUMN);
      cloneColumns = cloneColumns.filter(function(column, index) {
        return column !== EXPAND_COLUMN || index === expandColumnIndex;
      });
      var prevColumn = baseColumns[expandColumnIndex];
      var fixedColumn;
      if (fixed) {
        fixedColumn = fixed;
      } else {
        fixedColumn = prevColumn ? prevColumn.fixed : null;
      }
      var expandColumn = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, INTERNAL_COL_DEFINE, {
        className: "".concat(prefixCls, "-expand-icon-col"),
        columnType: "EXPAND_COLUMN"
      }), "title", columnTitle), "fixed", fixedColumn), "className", "".concat(prefixCls, "-row-expand-icon-cell")), "width", columnWidth), "render", function render(_, record, index) {
        var rowKey = getRowKey(record, index);
        var expanded = expandedKeys.has(rowKey);
        var recordExpandable = rowExpandable ? rowExpandable(record) : true;
        var icon = expandIcon({
          prefixCls,
          expanded,
          expandable: recordExpandable,
          record,
          onExpand: onTriggerExpand
        });
        if (expandRowByClick) {
          return /* @__PURE__ */ reactExports.createElement("span", {
            onClick: function onClick(e) {
              return e.stopPropagation();
            }
          }, icon);
        }
        return icon;
      });
      return cloneColumns.map(function(col, index) {
        var column = col === EXPAND_COLUMN ? expandColumn : col;
        if (index < expandedRowOffset) {
          return _objectSpread2(_objectSpread2({}, column), {}, {
            fixed: column.fixed || "left"
          });
        }
        return column;
      });
    }
    return baseColumns.filter(function(col) {
      return col !== EXPAND_COLUMN;
    });
  }, [expandable, baseColumns, getRowKey, expandedKeys, expandIcon, direction, expandedRowOffset]);
  var mergedColumns = reactExports.useMemo(function() {
    var finalColumns = withExpandColumns;
    if (transformColumns) {
      finalColumns = transformColumns(finalColumns);
    }
    if (!finalColumns.length) {
      finalColumns = [{
        render: function render() {
          return null;
        }
      }];
    }
    return finalColumns;
  }, [transformColumns, withExpandColumns, direction]);
  var flattenColumns = reactExports.useMemo(function() {
    if (direction === "rtl") {
      return revertForRtl(flatColumns(mergedColumns));
    }
    return flatColumns(mergedColumns);
  }, [mergedColumns, direction, scrollWidth]);
  var hasGapFixed = reactExports.useMemo(function() {
    var lastLeftIndex = -1;
    for (var i = flattenColumns.length - 1; i >= 0; i -= 1) {
      var colFixed = flattenColumns[i].fixed;
      if (colFixed === "left" || colFixed === true) {
        lastLeftIndex = i;
        break;
      }
    }
    if (lastLeftIndex >= 0) {
      for (var _i = 0; _i <= lastLeftIndex; _i += 1) {
        var _colFixed = flattenColumns[_i].fixed;
        if (_colFixed !== "left" && _colFixed !== true) {
          return true;
        }
      }
    }
    var firstRightIndex = flattenColumns.findIndex(function(_ref3) {
      var colFixed2 = _ref3.fixed;
      return colFixed2 === "right";
    });
    if (firstRightIndex >= 0) {
      for (var _i2 = firstRightIndex; _i2 < flattenColumns.length; _i2 += 1) {
        var _colFixed2 = flattenColumns[_i2].fixed;
        if (_colFixed2 !== "right") {
          return true;
        }
      }
    }
    return false;
  }, [flattenColumns]);
  var _useWidthColumns = useWidthColumns(flattenColumns, scrollWidth, clientWidth), _useWidthColumns2 = _slicedToArray(_useWidthColumns, 2), filledColumns = _useWidthColumns2[0], realScrollWidth = _useWidthColumns2[1];
  return [mergedColumns, filledColumns, realScrollWidth, hasGapFixed];
}
function useExpand(props, mergedData, getRowKey) {
  var expandableConfig = getExpandableProps(props);
  var expandIcon = expandableConfig.expandIcon, expandedRowKeys = expandableConfig.expandedRowKeys, defaultExpandedRowKeys = expandableConfig.defaultExpandedRowKeys, defaultExpandAllRows = expandableConfig.defaultExpandAllRows, expandedRowRender = expandableConfig.expandedRowRender, onExpand = expandableConfig.onExpand, onExpandedRowsChange = expandableConfig.onExpandedRowsChange, childrenColumnName = expandableConfig.childrenColumnName;
  var mergedExpandIcon = expandIcon || renderExpandIcon$1;
  var mergedChildrenColumnName = childrenColumnName || "children";
  var expandableType = reactExports.useMemo(function() {
    if (expandedRowRender) {
      return "row";
    }
    if (props.expandable && props.internalHooks === INTERNAL_HOOKS && props.expandable.__PARENT_RENDER_ICON__ || mergedData.some(function(record) {
      return record && _typeof(record) === "object" && record[mergedChildrenColumnName];
    })) {
      return "nest";
    }
    return false;
  }, [!!expandedRowRender, mergedData]);
  var _React$useState = reactExports.useState(function() {
    if (defaultExpandedRowKeys) {
      return defaultExpandedRowKeys;
    }
    if (defaultExpandAllRows) {
      return findAllChildrenKeys(mergedData, getRowKey, mergedChildrenColumnName);
    }
    return [];
  }), _React$useState2 = _slicedToArray(_React$useState, 2), innerExpandedKeys = _React$useState2[0], setInnerExpandedKeys = _React$useState2[1];
  var mergedExpandedKeys = reactExports.useMemo(function() {
    return new Set(expandedRowKeys || innerExpandedKeys || []);
  }, [expandedRowKeys, innerExpandedKeys]);
  var onTriggerExpand = reactExports.useCallback(function(record) {
    var key = getRowKey(record, mergedData.indexOf(record));
    var newExpandedKeys;
    var hasKey = mergedExpandedKeys.has(key);
    if (hasKey) {
      mergedExpandedKeys.delete(key);
      newExpandedKeys = _toConsumableArray(mergedExpandedKeys);
    } else {
      newExpandedKeys = [].concat(_toConsumableArray(mergedExpandedKeys), [key]);
    }
    setInnerExpandedKeys(newExpandedKeys);
    if (onExpand) {
      onExpand(!hasKey, record);
    }
    if (onExpandedRowsChange) {
      onExpandedRowsChange(newExpandedKeys);
    }
  }, [getRowKey, mergedExpandedKeys, mergedData, onExpand, onExpandedRowsChange]);
  return [expandableConfig, expandableType, mergedExpandedKeys, mergedExpandIcon, mergedChildrenColumnName, onTriggerExpand];
}
function useFixedInfo(flattenColumns, stickyOffsets, direction) {
  var fixedInfoList = flattenColumns.map(function(_, colIndex) {
    return getCellFixedInfo(colIndex, colIndex, flattenColumns, stickyOffsets, direction);
  });
  return useMemo(function() {
    return fixedInfoList;
  }, [fixedInfoList], function(prev, next) {
    return !isEqual(prev, next);
  });
}
function useLayoutState(defaultState) {
  var stateRef = reactExports.useRef(defaultState);
  var _useState = reactExports.useState({}), _useState2 = _slicedToArray(_useState, 2), forceUpdate = _useState2[1];
  var lastPromiseRef = reactExports.useRef(null);
  var updateBatchRef = reactExports.useRef([]);
  function setFrameState(updater) {
    updateBatchRef.current.push(updater);
    var promise = Promise.resolve();
    lastPromiseRef.current = promise;
    promise.then(function() {
      if (lastPromiseRef.current === promise) {
        var prevBatch = updateBatchRef.current;
        var prevState = stateRef.current;
        updateBatchRef.current = [];
        prevBatch.forEach(function(batchUpdater) {
          stateRef.current = batchUpdater(stateRef.current);
        });
        lastPromiseRef.current = null;
        if (prevState !== stateRef.current) {
          forceUpdate({});
        }
      }
    });
  }
  reactExports.useEffect(function() {
    return function() {
      lastPromiseRef.current = null;
    };
  }, []);
  return [stateRef.current, setFrameState];
}
function useTimeoutLock(defaultState) {
  var frameRef = reactExports.useRef(null);
  var timeoutRef = reactExports.useRef();
  function cleanUp() {
    window.clearTimeout(timeoutRef.current);
  }
  function setState(newState) {
    frameRef.current = newState;
    cleanUp();
    timeoutRef.current = window.setTimeout(function() {
      frameRef.current = null;
      timeoutRef.current = void 0;
    }, 100);
  }
  function getState() {
    return frameRef.current;
  }
  reactExports.useEffect(function() {
    return cleanUp;
  }, []);
  return [setState, getState];
}
function useHover() {
  var _React$useState = reactExports.useState(-1), _React$useState2 = _slicedToArray(_React$useState, 2), startRow = _React$useState2[0], setStartRow = _React$useState2[1];
  var _React$useState3 = reactExports.useState(-1), _React$useState4 = _slicedToArray(_React$useState3, 2), endRow = _React$useState4[0], setEndRow = _React$useState4[1];
  var onHover = reactExports.useCallback(function(start, end) {
    setStartRow(start);
    setEndRow(end);
  }, []);
  return [startRow, endRow, onHover];
}
var defaultContainer = canUseDom() ? window : null;
function useSticky(sticky, prefixCls) {
  var _ref = _typeof(sticky) === "object" ? sticky : {}, _ref$offsetHeader = _ref.offsetHeader, offsetHeader = _ref$offsetHeader === void 0 ? 0 : _ref$offsetHeader, _ref$offsetSummary = _ref.offsetSummary, offsetSummary = _ref$offsetSummary === void 0 ? 0 : _ref$offsetSummary, _ref$offsetScroll = _ref.offsetScroll, offsetScroll = _ref$offsetScroll === void 0 ? 0 : _ref$offsetScroll, _ref$getContainer = _ref.getContainer, getContainer = _ref$getContainer === void 0 ? function() {
    return defaultContainer;
  } : _ref$getContainer;
  var container = getContainer() || defaultContainer;
  var isSticky = !!sticky;
  return reactExports.useMemo(function() {
    return {
      isSticky,
      stickyClassName: isSticky ? "".concat(prefixCls, "-sticky-holder") : "",
      offsetHeader,
      offsetSummary,
      offsetScroll,
      container
    };
  }, [isSticky, offsetScroll, offsetHeader, offsetSummary, prefixCls, container]);
}
function useStickyOffsets(colWidths, flattenColumns, direction) {
  var stickyOffsets = reactExports.useMemo(function() {
    var columnCount = flattenColumns.length;
    var getOffsets = function getOffsets2(startIndex, endIndex, offset2) {
      var offsets = [];
      var total = 0;
      for (var i = startIndex; i !== endIndex; i += offset2) {
        offsets.push(total);
        if (flattenColumns[i].fixed) {
          total += colWidths[i] || 0;
        }
      }
      return offsets;
    };
    var startOffsets = getOffsets(0, columnCount, 1);
    var endOffsets = getOffsets(columnCount - 1, -1, -1).reverse();
    return direction === "rtl" ? {
      left: endOffsets,
      right: startOffsets
    } : {
      left: startOffsets,
      right: endOffsets
    };
  }, [colWidths, flattenColumns, direction]);
  return stickyOffsets;
}
function Panel(_ref) {
  var className = _ref.className, children = _ref.children;
  return /* @__PURE__ */ reactExports.createElement("div", {
    className
  }, children);
}
function getOffset(node) {
  var element = getDOM(node);
  var box = element.getBoundingClientRect();
  var docElem = document.documentElement;
  return {
    left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
    top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
  };
}
var StickyScrollBar = function StickyScrollBar2(_ref, ref) {
  var _scrollBodyRef$curren, _scrollBodyRef$curren2;
  var scrollBodyRef = _ref.scrollBodyRef, onScroll = _ref.onScroll, offsetScroll = _ref.offsetScroll, container = _ref.container, direction = _ref.direction;
  var prefixCls = useContext(TableContext, "prefixCls");
  var bodyScrollWidth = ((_scrollBodyRef$curren = scrollBodyRef.current) === null || _scrollBodyRef$curren === void 0 ? void 0 : _scrollBodyRef$curren.scrollWidth) || 0;
  var bodyWidth = ((_scrollBodyRef$curren2 = scrollBodyRef.current) === null || _scrollBodyRef$curren2 === void 0 ? void 0 : _scrollBodyRef$curren2.clientWidth) || 0;
  var scrollBarWidth = bodyScrollWidth && bodyWidth * (bodyWidth / bodyScrollWidth);
  var scrollBarRef = reactExports.useRef();
  var _useLayoutState = useLayoutState({
    scrollLeft: 0,
    isHiddenScrollBar: true
  }), _useLayoutState2 = _slicedToArray(_useLayoutState, 2), scrollState = _useLayoutState2[0], setScrollState = _useLayoutState2[1];
  var refState = reactExports.useRef({
    delta: 0,
    x: 0
  });
  var _React$useState = reactExports.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), isActive = _React$useState2[0], setActive = _React$useState2[1];
  var rafRef = reactExports.useRef(null);
  reactExports.useEffect(function() {
    return function() {
      wrapperRaf.cancel(rafRef.current);
    };
  }, []);
  var onMouseUp = function onMouseUp2() {
    setActive(false);
  };
  var onMouseDown = function onMouseDown2(event) {
    event.persist();
    refState.current.delta = event.pageX - scrollState.scrollLeft;
    refState.current.x = 0;
    setActive(true);
    event.preventDefault();
  };
  var onMouseMove = function onMouseMove2(event) {
    var _window;
    var _ref2 = event || ((_window = window) === null || _window === void 0 ? void 0 : _window.event), buttons = _ref2.buttons;
    if (!isActive || buttons === 0) {
      if (isActive) {
        setActive(false);
      }
      return;
    }
    var left = refState.current.x + event.pageX - refState.current.x - refState.current.delta;
    var isRTL = direction === "rtl";
    left = Math.max(isRTL ? scrollBarWidth - bodyWidth : 0, Math.min(isRTL ? 0 : bodyWidth - scrollBarWidth, left));
    var shouldScroll = !isRTL || Math.abs(left) + Math.abs(scrollBarWidth) < bodyWidth;
    if (shouldScroll) {
      onScroll({
        scrollLeft: left / bodyWidth * (bodyScrollWidth + 2)
      });
      refState.current.x = event.pageX;
    }
  };
  var checkScrollBarVisible = function checkScrollBarVisible2() {
    wrapperRaf.cancel(rafRef.current);
    rafRef.current = wrapperRaf(function() {
      if (!scrollBodyRef.current) {
        return;
      }
      var tableOffsetTop = getOffset(scrollBodyRef.current).top;
      var tableBottomOffset = tableOffsetTop + scrollBodyRef.current.offsetHeight;
      var currentClientOffset = container === window ? document.documentElement.scrollTop + window.innerHeight : getOffset(container).top + container.clientHeight;
      setScrollState(function(state) {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          isHiddenScrollBar: tableBottomOffset - getScrollBarSize() <= currentClientOffset || tableOffsetTop >= currentClientOffset - offsetScroll
        });
      });
    });
  };
  var setScrollLeft = function setScrollLeft2(left) {
    setScrollState(function(state) {
      return _objectSpread2(_objectSpread2({}, state), {}, {
        scrollLeft: bodyScrollWidth ? left / bodyScrollWidth * bodyWidth : 0
      });
    });
  };
  reactExports.useImperativeHandle(ref, function() {
    return {
      setScrollLeft,
      checkScrollBarVisible
    };
  });
  reactExports.useEffect(function() {
    var onMouseUpListener = addEventListenerWrap(document.body, "mouseup", onMouseUp, false);
    var onMouseMoveListener = addEventListenerWrap(document.body, "mousemove", onMouseMove, false);
    checkScrollBarVisible();
    return function() {
      onMouseUpListener.remove();
      onMouseMoveListener.remove();
    };
  }, [scrollBarWidth, isActive]);
  reactExports.useEffect(function() {
    if (!scrollBodyRef.current) return;
    var scrollParents = [];
    var parent = getDOM(scrollBodyRef.current);
    while (parent) {
      scrollParents.push(parent);
      parent = parent.parentElement;
    }
    scrollParents.forEach(function(p) {
      return p.addEventListener("scroll", checkScrollBarVisible, false);
    });
    window.addEventListener("resize", checkScrollBarVisible, false);
    window.addEventListener("scroll", checkScrollBarVisible, false);
    container.addEventListener("scroll", checkScrollBarVisible, false);
    return function() {
      scrollParents.forEach(function(p) {
        return p.removeEventListener("scroll", checkScrollBarVisible);
      });
      window.removeEventListener("resize", checkScrollBarVisible);
      window.removeEventListener("scroll", checkScrollBarVisible);
      container.removeEventListener("scroll", checkScrollBarVisible);
    };
  }, [container]);
  reactExports.useEffect(function() {
    if (!scrollState.isHiddenScrollBar) {
      setScrollState(function(state) {
        var bodyNode = scrollBodyRef.current;
        if (!bodyNode) {
          return state;
        }
        return _objectSpread2(_objectSpread2({}, state), {}, {
          scrollLeft: bodyNode.scrollLeft / bodyNode.scrollWidth * bodyNode.clientWidth
        });
      });
    }
  }, [scrollState.isHiddenScrollBar]);
  if (bodyScrollWidth <= bodyWidth || !scrollBarWidth || scrollState.isHiddenScrollBar) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    style: {
      height: getScrollBarSize(),
      width: bodyWidth,
      bottom: offsetScroll
    },
    className: "".concat(prefixCls, "-sticky-scroll")
  }, /* @__PURE__ */ reactExports.createElement("div", {
    onMouseDown,
    ref: scrollBarRef,
    className: classNames("".concat(prefixCls, "-sticky-scroll-bar"), _defineProperty({}, "".concat(prefixCls, "-sticky-scroll-bar-active"), isActive)),
    style: {
      width: "".concat(scrollBarWidth, "px"),
      transform: "translate3d(".concat(scrollState.scrollLeft, "px, 0, 0)")
    }
  }));
};
const StickyScrollBar$1 = /* @__PURE__ */ reactExports.forwardRef(StickyScrollBar);
var DEFAULT_PREFIX = "rc-table";
var EMPTY_DATA = [];
var EMPTY_SCROLL_TARGET = {};
function defaultEmpty() {
  return "No Data";
}
function Table$1(tableProps, ref) {
  var props = _objectSpread2({
    rowKey: "key",
    prefixCls: DEFAULT_PREFIX,
    emptyText: defaultEmpty
  }, tableProps);
  var prefixCls = props.prefixCls, className = props.className, rowClassName = props.rowClassName, style = props.style, data = props.data, rowKey = props.rowKey, scroll = props.scroll, tableLayout = props.tableLayout, direction = props.direction, title = props.title, footer = props.footer, summary = props.summary, caption = props.caption, id = props.id, showHeader = props.showHeader, components = props.components, emptyText = props.emptyText, onRow = props.onRow, onHeaderRow = props.onHeaderRow, measureRowRender = props.measureRowRender, onScroll = props.onScroll, internalHooks = props.internalHooks, transformColumns = props.transformColumns, internalRefs = props.internalRefs, tailor = props.tailor, getContainerWidth = props.getContainerWidth, sticky = props.sticky, _props$rowHoverable = props.rowHoverable, rowHoverable = _props$rowHoverable === void 0 ? true : _props$rowHoverable;
  var mergedData = data || EMPTY_DATA;
  var hasData = !!mergedData.length;
  var useInternalHooks = internalHooks === INTERNAL_HOOKS;
  var getComponent = reactExports.useCallback(function(path, defaultComponent) {
    return get(components, path) || defaultComponent;
  }, [components]);
  var getRowKey = reactExports.useMemo(function() {
    if (typeof rowKey === "function") {
      return rowKey;
    }
    return function(record) {
      var key = record && record[rowKey];
      return key;
    };
  }, [rowKey]);
  var customizeScrollBody = getComponent(["body"]);
  var _useHover = useHover(), _useHover2 = _slicedToArray(_useHover, 3), startRow = _useHover2[0], endRow = _useHover2[1], onHover = _useHover2[2];
  var _useExpand = useExpand(props, mergedData, getRowKey), _useExpand2 = _slicedToArray(_useExpand, 6), expandableConfig = _useExpand2[0], expandableType = _useExpand2[1], mergedExpandedKeys = _useExpand2[2], mergedExpandIcon = _useExpand2[3], mergedChildrenColumnName = _useExpand2[4], onTriggerExpand = _useExpand2[5];
  var scrollX = scroll === null || scroll === void 0 ? void 0 : scroll.x;
  var _React$useState = reactExports.useState(0), _React$useState2 = _slicedToArray(_React$useState, 2), componentWidth = _React$useState2[0], setComponentWidth = _React$useState2[1];
  var _useColumns = useColumns(_objectSpread2(_objectSpread2(_objectSpread2({}, props), expandableConfig), {}, {
    expandable: !!expandableConfig.expandedRowRender,
    columnTitle: expandableConfig.columnTitle,
    expandedKeys: mergedExpandedKeys,
    getRowKey,
    // https://github.com/ant-design/ant-design/issues/23894
    onTriggerExpand,
    expandIcon: mergedExpandIcon,
    expandIconColumnIndex: expandableConfig.expandIconColumnIndex,
    direction,
    scrollWidth: useInternalHooks && tailor && typeof scrollX === "number" ? scrollX : null,
    clientWidth: componentWidth
  }), useInternalHooks ? transformColumns : null), _useColumns2 = _slicedToArray(_useColumns, 4), columns = _useColumns2[0], flattenColumns = _useColumns2[1], flattenScrollX = _useColumns2[2], hasGapFixed = _useColumns2[3];
  var mergedScrollX = flattenScrollX !== null && flattenScrollX !== void 0 ? flattenScrollX : scrollX;
  var columnContext = reactExports.useMemo(function() {
    return {
      columns,
      flattenColumns
    };
  }, [columns, flattenColumns]);
  var fullTableRef = reactExports.useRef();
  var scrollHeaderRef = reactExports.useRef();
  var scrollBodyRef = reactExports.useRef();
  var scrollBodyContainerRef = reactExports.useRef();
  reactExports.useImperativeHandle(ref, function() {
    return {
      nativeElement: fullTableRef.current,
      scrollTo: function scrollTo2(config) {
        var _scrollBodyRef$curren3;
        if (scrollBodyRef.current instanceof HTMLElement) {
          var index = config.index, top = config.top, key = config.key;
          if (validNumberValue(top)) {
            var _scrollBodyRef$curren;
            (_scrollBodyRef$curren = scrollBodyRef.current) === null || _scrollBodyRef$curren === void 0 || _scrollBodyRef$curren.scrollTo({
              top
            });
          } else {
            var _scrollBodyRef$curren2;
            var mergedKey = key !== null && key !== void 0 ? key : getRowKey(mergedData[index]);
            (_scrollBodyRef$curren2 = scrollBodyRef.current.querySelector('[data-row-key="'.concat(mergedKey, '"]'))) === null || _scrollBodyRef$curren2 === void 0 || _scrollBodyRef$curren2.scrollIntoView();
          }
        } else if ((_scrollBodyRef$curren3 = scrollBodyRef.current) !== null && _scrollBodyRef$curren3 !== void 0 && _scrollBodyRef$curren3.scrollTo) {
          scrollBodyRef.current.scrollTo(config);
        }
      }
    };
  });
  var scrollSummaryRef = reactExports.useRef();
  var _React$useState3 = reactExports.useState(false), _React$useState4 = _slicedToArray(_React$useState3, 2), pingedLeft = _React$useState4[0], setPingedLeft = _React$useState4[1];
  var _React$useState5 = reactExports.useState(false), _React$useState6 = _slicedToArray(_React$useState5, 2), pingedRight = _React$useState6[0], setPingedRight = _React$useState6[1];
  var _React$useState7 = reactExports.useState(/* @__PURE__ */ new Map()), _React$useState8 = _slicedToArray(_React$useState7, 2), colsWidths = _React$useState8[0], updateColsWidths = _React$useState8[1];
  var colsKeys = getColumnsKey(flattenColumns);
  var pureColWidths = colsKeys.map(function(columnKey) {
    return colsWidths.get(columnKey);
  });
  var colWidths = reactExports.useMemo(function() {
    return pureColWidths;
  }, [pureColWidths.join("_")]);
  var stickyOffsets = useStickyOffsets(colWidths, flattenColumns, direction);
  var fixHeader = scroll && validateValue(scroll.y);
  var horizonScroll = scroll && validateValue(mergedScrollX) || Boolean(expandableConfig.fixed);
  var fixColumn = horizonScroll && flattenColumns.some(function(_ref) {
    var fixed = _ref.fixed;
    return fixed;
  });
  var stickyRef = reactExports.useRef();
  var _useSticky = useSticky(sticky, prefixCls), isSticky = _useSticky.isSticky, offsetHeader = _useSticky.offsetHeader, offsetSummary = _useSticky.offsetSummary, offsetScroll = _useSticky.offsetScroll, stickyClassName = _useSticky.stickyClassName, container = _useSticky.container;
  var summaryNode = reactExports.useMemo(function() {
    return summary === null || summary === void 0 ? void 0 : summary(mergedData);
  }, [summary, mergedData]);
  var fixFooter = (fixHeader || isSticky) && /* @__PURE__ */ reactExports.isValidElement(summaryNode) && summaryNode.type === Summary && summaryNode.props.fixed;
  var scrollXStyle;
  var scrollYStyle;
  var scrollTableStyle;
  if (fixHeader) {
    scrollYStyle = {
      overflowY: hasData ? "scroll" : "auto",
      maxHeight: scroll.y
    };
  }
  if (horizonScroll) {
    scrollXStyle = {
      overflowX: "auto"
    };
    if (!fixHeader) {
      scrollYStyle = {
        overflowY: "hidden"
      };
    }
    scrollTableStyle = {
      width: mergedScrollX === true ? "auto" : mergedScrollX,
      minWidth: "100%"
    };
  }
  var onColumnResize = reactExports.useCallback(function(columnKey, width) {
    updateColsWidths(function(widths) {
      if (widths.get(columnKey) !== width) {
        var newWidths = new Map(widths);
        newWidths.set(columnKey, width);
        return newWidths;
      }
      return widths;
    });
  }, []);
  var _useTimeoutLock = useTimeoutLock(), _useTimeoutLock2 = _slicedToArray(_useTimeoutLock, 2), setScrollTarget = _useTimeoutLock2[0], getScrollTarget = _useTimeoutLock2[1];
  function forceScroll(scrollLeft, target) {
    if (!target) {
      return;
    }
    if (typeof target === "function") {
      target(scrollLeft);
    } else if (target.scrollLeft !== scrollLeft) {
      target.scrollLeft = scrollLeft;
      if (target.scrollLeft !== scrollLeft) {
        setTimeout(function() {
          target.scrollLeft = scrollLeft;
        }, 0);
      }
    }
  }
  var onInternalScroll = useEvent(function(_ref2) {
    var currentTarget = _ref2.currentTarget, scrollLeft = _ref2.scrollLeft;
    var isRTL = direction === "rtl";
    var mergedScrollLeft = typeof scrollLeft === "number" ? scrollLeft : currentTarget.scrollLeft;
    var compareTarget = currentTarget || EMPTY_SCROLL_TARGET;
    if (!getScrollTarget() || getScrollTarget() === compareTarget) {
      var _stickyRef$current;
      setScrollTarget(compareTarget);
      forceScroll(mergedScrollLeft, scrollHeaderRef.current);
      forceScroll(mergedScrollLeft, scrollBodyRef.current);
      forceScroll(mergedScrollLeft, scrollSummaryRef.current);
      forceScroll(mergedScrollLeft, (_stickyRef$current = stickyRef.current) === null || _stickyRef$current === void 0 ? void 0 : _stickyRef$current.setScrollLeft);
    }
    var measureTarget = currentTarget || scrollHeaderRef.current;
    if (measureTarget) {
      var scrollWidth = (
        // Should use mergedScrollX in virtual table(useInternalHooks && tailor === true)
        useInternalHooks && tailor && typeof mergedScrollX === "number" ? mergedScrollX : measureTarget.scrollWidth
      );
      var clientWidth = measureTarget.clientWidth;
      if (scrollWidth === clientWidth) {
        setPingedLeft(false);
        setPingedRight(false);
        return;
      }
      if (isRTL) {
        setPingedLeft(-mergedScrollLeft < scrollWidth - clientWidth);
        setPingedRight(-mergedScrollLeft > 0);
      } else {
        setPingedLeft(mergedScrollLeft > 0);
        setPingedRight(mergedScrollLeft < scrollWidth - clientWidth);
      }
    }
  });
  var onBodyScroll = useEvent(function(e) {
    onInternalScroll(e);
    onScroll === null || onScroll === void 0 || onScroll(e);
  });
  var triggerOnScroll = function triggerOnScroll2() {
    if (horizonScroll && scrollBodyRef.current) {
      var _scrollBodyRef$curren4;
      onInternalScroll({
        currentTarget: getDOM(scrollBodyRef.current),
        scrollLeft: (_scrollBodyRef$curren4 = scrollBodyRef.current) === null || _scrollBodyRef$curren4 === void 0 ? void 0 : _scrollBodyRef$curren4.scrollLeft
      });
    } else {
      setPingedLeft(false);
      setPingedRight(false);
    }
  };
  var onFullTableResize = function onFullTableResize2(_ref3) {
    var _stickyRef$current2;
    var width = _ref3.width;
    (_stickyRef$current2 = stickyRef.current) === null || _stickyRef$current2 === void 0 || _stickyRef$current2.checkScrollBarVisible();
    var mergedWidth = fullTableRef.current ? fullTableRef.current.offsetWidth : width;
    if (useInternalHooks && getContainerWidth && fullTableRef.current) {
      mergedWidth = getContainerWidth(fullTableRef.current, mergedWidth) || mergedWidth;
    }
    if (mergedWidth !== componentWidth) {
      triggerOnScroll();
      setComponentWidth(mergedWidth);
    }
  };
  var mounted = reactExports.useRef(false);
  reactExports.useEffect(function() {
    if (mounted.current) {
      triggerOnScroll();
    }
  }, [horizonScroll, data, columns.length]);
  reactExports.useEffect(function() {
    mounted.current = true;
  }, []);
  var _React$useState9 = reactExports.useState(0), _React$useState10 = _slicedToArray(_React$useState9, 2), scrollbarSize = _React$useState10[0], setScrollbarSize = _React$useState10[1];
  var _React$useState11 = reactExports.useState(true), _React$useState12 = _slicedToArray(_React$useState11, 2), supportSticky = _React$useState12[0], setSupportSticky = _React$useState12[1];
  useLayoutEffect(function() {
    if (!tailor || !useInternalHooks) {
      if (scrollBodyRef.current instanceof Element) {
        setScrollbarSize(getTargetScrollBarSize(scrollBodyRef.current).width);
      } else {
        setScrollbarSize(getTargetScrollBarSize(scrollBodyContainerRef.current).width);
      }
    }
    setSupportSticky(isStyleSupport("position", "sticky"));
  }, []);
  reactExports.useEffect(function() {
    if (useInternalHooks && internalRefs) {
      internalRefs.body.current = scrollBodyRef.current;
    }
  });
  var renderFixedHeaderTable = reactExports.useCallback(function(fixedHolderPassProps) {
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(Header$1, fixedHolderPassProps), fixFooter === "top" && /* @__PURE__ */ reactExports.createElement(Footer$1, fixedHolderPassProps, summaryNode));
  }, [fixFooter, summaryNode]);
  var renderFixedFooterTable = reactExports.useCallback(function(fixedHolderPassProps) {
    return /* @__PURE__ */ reactExports.createElement(Footer$1, fixedHolderPassProps, summaryNode);
  }, [summaryNode]);
  var TableComponent = getComponent(["table"], "table");
  var mergedTableLayout = reactExports.useMemo(function() {
    if (tableLayout) {
      return tableLayout;
    }
    if (fixColumn) {
      return mergedScrollX === "max-content" ? "auto" : "fixed";
    }
    if (fixHeader || isSticky || flattenColumns.some(function(_ref4) {
      var ellipsis = _ref4.ellipsis;
      return ellipsis;
    })) {
      return "fixed";
    }
    return "auto";
  }, [fixHeader, fixColumn, flattenColumns, tableLayout, isSticky]);
  var groupTableNode;
  var headerProps = {
    colWidths,
    columCount: flattenColumns.length,
    stickyOffsets,
    onHeaderRow,
    fixHeader,
    scroll
  };
  var emptyNode = reactExports.useMemo(function() {
    if (hasData) {
      return null;
    }
    if (typeof emptyText === "function") {
      return emptyText();
    }
    return emptyText;
  }, [hasData, emptyText]);
  var bodyTable = /* @__PURE__ */ reactExports.createElement(Body$1, {
    data: mergedData,
    measureColumnWidth: fixHeader || horizonScroll || isSticky
  });
  var bodyColGroup = /* @__PURE__ */ reactExports.createElement(ColGroup, {
    colWidths: flattenColumns.map(function(_ref5) {
      var width = _ref5.width;
      return width;
    }),
    columns: flattenColumns
  });
  var captionElement = caption !== null && caption !== void 0 ? /* @__PURE__ */ reactExports.createElement("caption", {
    className: "".concat(prefixCls, "-caption")
  }, caption) : void 0;
  var dataProps = pickAttrs(props, {
    data: true
  });
  var ariaProps = pickAttrs(props, {
    aria: true
  });
  if (fixHeader || isSticky) {
    var bodyContent;
    if (typeof customizeScrollBody === "function") {
      bodyContent = customizeScrollBody(mergedData, {
        scrollbarSize,
        ref: scrollBodyRef,
        onScroll: onInternalScroll
      });
      headerProps.colWidths = flattenColumns.map(function(_ref6, index) {
        var width = _ref6.width;
        var colWidth = index === flattenColumns.length - 1 ? width - scrollbarSize : width;
        if (typeof colWidth === "number" && !Number.isNaN(colWidth)) {
          return colWidth;
        }
        return 0;
      });
    } else {
      bodyContent = /* @__PURE__ */ reactExports.createElement("div", {
        style: _objectSpread2(_objectSpread2({}, scrollXStyle), scrollYStyle),
        onScroll: onBodyScroll,
        ref: scrollBodyRef,
        className: classNames("".concat(prefixCls, "-body"))
      }, /* @__PURE__ */ reactExports.createElement(TableComponent, _extends({
        style: _objectSpread2(_objectSpread2({}, scrollTableStyle), {}, {
          tableLayout: mergedTableLayout
        })
      }, ariaProps), captionElement, bodyColGroup, bodyTable, !fixFooter && summaryNode && /* @__PURE__ */ reactExports.createElement(Footer$1, {
        stickyOffsets,
        flattenColumns
      }, summaryNode)));
    }
    var fixedHolderProps = _objectSpread2(_objectSpread2(_objectSpread2({
      noData: !mergedData.length
    }, headerProps), columnContext), {}, {
      direction,
      stickyClassName,
      scrollX: mergedScrollX,
      tableLayout: mergedTableLayout,
      onScroll: onInternalScroll
    });
    groupTableNode = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, showHeader !== false && /* @__PURE__ */ reactExports.createElement(FixedHolder$1, _extends({}, fixedHolderProps, {
      stickyTopOffset: offsetHeader,
      className: "".concat(prefixCls, "-header"),
      ref: scrollHeaderRef,
      colGroup: bodyColGroup
    }), renderFixedHeaderTable), bodyContent, fixFooter && fixFooter !== "top" && /* @__PURE__ */ reactExports.createElement(FixedHolder$1, _extends({}, fixedHolderProps, {
      stickyBottomOffset: offsetSummary,
      className: "".concat(prefixCls, "-summary"),
      ref: scrollSummaryRef,
      colGroup: bodyColGroup
    }), renderFixedFooterTable), isSticky && scrollBodyRef.current && scrollBodyRef.current instanceof Element && /* @__PURE__ */ reactExports.createElement(StickyScrollBar$1, {
      ref: stickyRef,
      offsetScroll,
      scrollBodyRef,
      onScroll: onInternalScroll,
      container,
      direction
    }));
  } else {
    groupTableNode = /* @__PURE__ */ reactExports.createElement("div", {
      style: _objectSpread2(_objectSpread2({}, scrollXStyle), scrollYStyle),
      className: classNames("".concat(prefixCls, "-content")),
      onScroll: onInternalScroll,
      ref: scrollBodyRef
    }, /* @__PURE__ */ reactExports.createElement(TableComponent, _extends({
      style: _objectSpread2(_objectSpread2({}, scrollTableStyle), {}, {
        tableLayout: mergedTableLayout
      })
    }, ariaProps), captionElement, bodyColGroup, showHeader !== false && /* @__PURE__ */ reactExports.createElement(Header$1, _extends({}, headerProps, columnContext)), bodyTable, summaryNode && /* @__PURE__ */ reactExports.createElement(Footer$1, {
      stickyOffsets,
      flattenColumns
    }, summaryNode)));
  }
  var fullTable = /* @__PURE__ */ reactExports.createElement("div", _extends({
    className: classNames(prefixCls, className, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-rtl"), direction === "rtl"), "".concat(prefixCls, "-ping-left"), pingedLeft), "".concat(prefixCls, "-ping-right"), pingedRight), "".concat(prefixCls, "-layout-fixed"), tableLayout === "fixed"), "".concat(prefixCls, "-fixed-header"), fixHeader), "".concat(prefixCls, "-fixed-column"), fixColumn), "".concat(prefixCls, "-fixed-column-gapped"), fixColumn && hasGapFixed), "".concat(prefixCls, "-scroll-horizontal"), horizonScroll), "".concat(prefixCls, "-has-fix-left"), flattenColumns[0] && flattenColumns[0].fixed), "".concat(prefixCls, "-has-fix-right"), flattenColumns[flattenColumns.length - 1] && flattenColumns[flattenColumns.length - 1].fixed === "right")),
    style,
    id,
    ref: fullTableRef
  }, dataProps), title && /* @__PURE__ */ reactExports.createElement(Panel, {
    className: "".concat(prefixCls, "-title")
  }, title(mergedData)), /* @__PURE__ */ reactExports.createElement("div", {
    ref: scrollBodyContainerRef,
    className: "".concat(prefixCls, "-container")
  }, groupTableNode), footer && /* @__PURE__ */ reactExports.createElement(Panel, {
    className: "".concat(prefixCls, "-footer")
  }, footer(mergedData)));
  if (horizonScroll) {
    fullTable = /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
      onResize: onFullTableResize
    }, fullTable);
  }
  var fixedInfoList = useFixedInfo(flattenColumns, stickyOffsets, direction);
  var TableContextValue = reactExports.useMemo(function() {
    return {
      // Scroll
      scrollX: mergedScrollX,
      // Table
      prefixCls,
      getComponent,
      scrollbarSize,
      direction,
      fixedInfoList,
      isSticky,
      supportSticky,
      componentWidth,
      fixHeader,
      fixColumn,
      horizonScroll,
      // Body
      tableLayout: mergedTableLayout,
      rowClassName,
      expandedRowClassName: expandableConfig.expandedRowClassName,
      expandIcon: mergedExpandIcon,
      expandableType,
      expandRowByClick: expandableConfig.expandRowByClick,
      expandedRowRender: expandableConfig.expandedRowRender,
      expandedRowOffset: expandableConfig.expandedRowOffset,
      onTriggerExpand,
      expandIconColumnIndex: expandableConfig.expandIconColumnIndex,
      indentSize: expandableConfig.indentSize,
      allColumnsFixedLeft: flattenColumns.every(function(col) {
        return col.fixed === "left";
      }),
      emptyNode,
      // Column
      columns,
      flattenColumns,
      onColumnResize,
      colWidths,
      // Row
      hoverStartRow: startRow,
      hoverEndRow: endRow,
      onHover,
      rowExpandable: expandableConfig.rowExpandable,
      onRow,
      getRowKey,
      expandedKeys: mergedExpandedKeys,
      childrenColumnName: mergedChildrenColumnName,
      rowHoverable,
      // Measure Row
      measureRowRender
    };
  }, [
    // Scroll
    mergedScrollX,
    // Table
    prefixCls,
    getComponent,
    scrollbarSize,
    direction,
    fixedInfoList,
    isSticky,
    supportSticky,
    componentWidth,
    fixHeader,
    fixColumn,
    horizonScroll,
    // Body
    mergedTableLayout,
    rowClassName,
    expandableConfig.expandedRowClassName,
    mergedExpandIcon,
    expandableType,
    expandableConfig.expandRowByClick,
    expandableConfig.expandedRowRender,
    expandableConfig.expandedRowOffset,
    onTriggerExpand,
    expandableConfig.expandIconColumnIndex,
    expandableConfig.indentSize,
    emptyNode,
    // Column
    columns,
    flattenColumns,
    onColumnResize,
    colWidths,
    // Row
    startRow,
    endRow,
    onHover,
    expandableConfig.rowExpandable,
    onRow,
    getRowKey,
    mergedExpandedKeys,
    mergedChildrenColumnName,
    rowHoverable,
    measureRowRender
  ]);
  return /* @__PURE__ */ reactExports.createElement(TableContext.Provider, {
    value: TableContextValue
  }, fullTable);
}
var RefTable = /* @__PURE__ */ reactExports.forwardRef(Table$1);
function genTable(shouldTriggerRender) {
  return makeImmutable(RefTable, shouldTriggerRender);
}
var ImmutableTable = genTable();
ImmutableTable.EXPAND_COLUMN = EXPAND_COLUMN;
ImmutableTable.INTERNAL_HOOKS = INTERNAL_HOOKS;
ImmutableTable.Column = Column$1;
ImmutableTable.ColumnGroup = ColumnGroup$1;
ImmutableTable.Summary = FooterComponents;
var StaticContext = createContext(null);
var GridContext = createContext(null);
function getColumnWidth(colIndex, colSpan, columnsOffset) {
  var mergedColSpan = colSpan || 1;
  return columnsOffset[colIndex + mergedColSpan] - (columnsOffset[colIndex] || 0);
}
function VirtualCell(props) {
  var rowInfo = props.rowInfo, column = props.column, colIndex = props.colIndex, indent = props.indent, index = props.index, component = props.component, renderIndex = props.renderIndex, record = props.record, style = props.style, className = props.className, inverse = props.inverse, getHeight = props.getHeight;
  var render = column.render, dataIndex = column.dataIndex, columnClassName = column.className, colWidth = column.width;
  var _useContext = useContext(GridContext, ["columnsOffset"]), columnsOffset = _useContext.columnsOffset;
  var _getCellProps = getCellProps(rowInfo, column, colIndex, indent, index), key = _getCellProps.key, fixedInfo = _getCellProps.fixedInfo, appendCellNode = _getCellProps.appendCellNode, additionalCellProps = _getCellProps.additionalCellProps;
  var cellStyle = additionalCellProps.style, _additionalCellProps$ = additionalCellProps.colSpan, colSpan = _additionalCellProps$ === void 0 ? 1 : _additionalCellProps$, _additionalCellProps$2 = additionalCellProps.rowSpan, rowSpan = _additionalCellProps$2 === void 0 ? 1 : _additionalCellProps$2;
  var startColIndex = colIndex - 1;
  var concatColWidth = getColumnWidth(startColIndex, colSpan, columnsOffset);
  var marginOffset = colSpan > 1 ? colWidth - concatColWidth : 0;
  var mergedStyle = _objectSpread2(_objectSpread2(_objectSpread2({}, cellStyle), style), {}, {
    flex: "0 0 ".concat(concatColWidth, "px"),
    width: "".concat(concatColWidth, "px"),
    marginRight: marginOffset,
    pointerEvents: "auto"
  });
  var needHide = reactExports.useMemo(function() {
    if (inverse) {
      return rowSpan <= 1;
    } else {
      return colSpan === 0 || rowSpan === 0 || rowSpan > 1;
    }
  }, [rowSpan, colSpan, inverse]);
  if (needHide) {
    mergedStyle.visibility = "hidden";
  } else if (inverse) {
    mergedStyle.height = getHeight === null || getHeight === void 0 ? void 0 : getHeight(rowSpan);
  }
  var mergedRender = needHide ? function() {
    return null;
  } : render;
  var cellSpan = {};
  if (rowSpan === 0 || colSpan === 0) {
    cellSpan.rowSpan = 1;
    cellSpan.colSpan = 1;
  }
  return /* @__PURE__ */ reactExports.createElement(Cell$1, _extends({
    className: classNames(columnClassName, className),
    ellipsis: column.ellipsis,
    align: column.align,
    scope: column.rowScope,
    component,
    prefixCls: rowInfo.prefixCls,
    key,
    record,
    index,
    renderIndex,
    dataIndex,
    render: mergedRender,
    shouldCellUpdate: column.shouldCellUpdate
  }, fixedInfo, {
    appendNode: appendCellNode,
    additionalProps: _objectSpread2(_objectSpread2({}, additionalCellProps), {}, {
      style: mergedStyle
    }, cellSpan)
  }));
}
var _excluded$3 = ["data", "index", "className", "rowKey", "style", "extra", "getHeight"];
var BodyLine = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var data = props.data, index = props.index, className = props.className, rowKey = props.rowKey, style = props.style, extra = props.extra, getHeight = props.getHeight, restProps = _objectWithoutProperties(props, _excluded$3);
  var record = data.record, indent = data.indent, renderIndex = data.index;
  var _useContext = useContext(TableContext, ["prefixCls", "flattenColumns", "fixColumn", "componentWidth", "scrollX"]), scrollX = _useContext.scrollX, flattenColumns = _useContext.flattenColumns, prefixCls = _useContext.prefixCls, fixColumn = _useContext.fixColumn, componentWidth = _useContext.componentWidth;
  var _useContext2 = useContext(StaticContext, ["getComponent"]), getComponent = _useContext2.getComponent;
  var rowInfo = useRowInfo(record, rowKey, index, indent);
  var RowComponent = getComponent(["body", "row"], "div");
  var cellComponent = getComponent(["body", "cell"], "div");
  var rowSupportExpand = rowInfo.rowSupportExpand, expanded = rowInfo.expanded, rowProps = rowInfo.rowProps, expandedRowRender = rowInfo.expandedRowRender, expandedRowClassName = rowInfo.expandedRowClassName;
  var expandRowNode;
  if (rowSupportExpand && expanded) {
    var expandContent = expandedRowRender(record, index, indent + 1, expanded);
    var expandedClsName = computedExpandedClassName(expandedRowClassName, record, index, indent);
    var additionalProps = {};
    if (fixColumn) {
      additionalProps = {
        style: _defineProperty({}, "--virtual-width", "".concat(componentWidth, "px"))
      };
    }
    var rowCellCls = "".concat(prefixCls, "-expanded-row-cell");
    expandRowNode = /* @__PURE__ */ reactExports.createElement(RowComponent, {
      className: classNames("".concat(prefixCls, "-expanded-row"), "".concat(prefixCls, "-expanded-row-level-").concat(indent + 1), expandedClsName)
    }, /* @__PURE__ */ reactExports.createElement(Cell$1, {
      component: cellComponent,
      prefixCls,
      className: classNames(rowCellCls, _defineProperty({}, "".concat(rowCellCls, "-fixed"), fixColumn)),
      additionalProps
    }, expandContent));
  }
  var rowStyle = _objectSpread2(_objectSpread2({}, style), {}, {
    width: scrollX
  });
  if (extra) {
    rowStyle.position = "absolute";
    rowStyle.pointerEvents = "none";
  }
  var rowNode = /* @__PURE__ */ reactExports.createElement(RowComponent, _extends({}, rowProps, restProps, {
    "data-row-key": rowKey,
    ref: rowSupportExpand ? null : ref,
    className: classNames(className, "".concat(prefixCls, "-row"), rowProps === null || rowProps === void 0 ? void 0 : rowProps.className, _defineProperty({}, "".concat(prefixCls, "-row-extra"), extra)),
    style: _objectSpread2(_objectSpread2({}, rowStyle), rowProps === null || rowProps === void 0 ? void 0 : rowProps.style)
  }), flattenColumns.map(function(column, colIndex) {
    return /* @__PURE__ */ reactExports.createElement(VirtualCell, {
      key: colIndex,
      component: cellComponent,
      rowInfo,
      column,
      colIndex,
      indent,
      index,
      renderIndex,
      record,
      inverse: extra,
      getHeight
    });
  }));
  if (rowSupportExpand) {
    return /* @__PURE__ */ reactExports.createElement("div", {
      ref
    }, rowNode, expandRowNode);
  }
  return rowNode;
});
var ResponseBodyLine = responseImmutable(BodyLine);
var Grid = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var data = props.data, onScroll = props.onScroll;
  var _useContext = useContext(TableContext, ["flattenColumns", "onColumnResize", "getRowKey", "prefixCls", "expandedKeys", "childrenColumnName", "scrollX", "direction"]), flattenColumns = _useContext.flattenColumns, onColumnResize = _useContext.onColumnResize, getRowKey = _useContext.getRowKey, expandedKeys = _useContext.expandedKeys, prefixCls = _useContext.prefixCls, childrenColumnName = _useContext.childrenColumnName, scrollX = _useContext.scrollX, direction = _useContext.direction;
  var _useContext2 = useContext(StaticContext), sticky = _useContext2.sticky, scrollY = _useContext2.scrollY, listItemHeight = _useContext2.listItemHeight, getComponent = _useContext2.getComponent, onTablePropScroll = _useContext2.onScroll;
  var listRef = reactExports.useRef();
  var flattenData2 = useFlattenRecords(data, childrenColumnName, expandedKeys, getRowKey);
  var columnsWidth = reactExports.useMemo(function() {
    var total = 0;
    return flattenColumns.map(function(_ref) {
      var width = _ref.width, minWidth = _ref.minWidth, key = _ref.key;
      var finalWidth = Math.max(width || 0, minWidth || 0);
      total += finalWidth;
      return [key, finalWidth, total];
    });
  }, [flattenColumns]);
  var columnsOffset = reactExports.useMemo(function() {
    return columnsWidth.map(function(colWidth) {
      return colWidth[2];
    });
  }, [columnsWidth]);
  reactExports.useEffect(function() {
    columnsWidth.forEach(function(_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2), key = _ref3[0], width = _ref3[1];
      onColumnResize(key, width);
    });
  }, [columnsWidth]);
  reactExports.useImperativeHandle(ref, function() {
    var _listRef$current2;
    var obj = {
      scrollTo: function scrollTo2(config) {
        var _listRef$current;
        (_listRef$current = listRef.current) === null || _listRef$current === void 0 || _listRef$current.scrollTo(config);
      },
      nativeElement: (_listRef$current2 = listRef.current) === null || _listRef$current2 === void 0 ? void 0 : _listRef$current2.nativeElement
    };
    Object.defineProperty(obj, "scrollLeft", {
      get: function get2() {
        var _listRef$current3;
        return ((_listRef$current3 = listRef.current) === null || _listRef$current3 === void 0 ? void 0 : _listRef$current3.getScrollInfo().x) || 0;
      },
      set: function set(value) {
        var _listRef$current4;
        (_listRef$current4 = listRef.current) === null || _listRef$current4 === void 0 || _listRef$current4.scrollTo({
          left: value
        });
      }
    });
    Object.defineProperty(obj, "scrollTop", {
      get: function get2() {
        var _listRef$current5;
        return ((_listRef$current5 = listRef.current) === null || _listRef$current5 === void 0 ? void 0 : _listRef$current5.getScrollInfo().y) || 0;
      },
      set: function set(value) {
        var _listRef$current6;
        (_listRef$current6 = listRef.current) === null || _listRef$current6 === void 0 || _listRef$current6.scrollTo({
          top: value
        });
      }
    });
    return obj;
  });
  var getRowSpan = function getRowSpan2(column, index) {
    var _flattenData$index;
    var record = (_flattenData$index = flattenData2[index]) === null || _flattenData$index === void 0 ? void 0 : _flattenData$index.record;
    var onCell = column.onCell;
    if (onCell) {
      var _cellProps$rowSpan;
      var cellProps = onCell(record, index);
      return (_cellProps$rowSpan = cellProps === null || cellProps === void 0 ? void 0 : cellProps.rowSpan) !== null && _cellProps$rowSpan !== void 0 ? _cellProps$rowSpan : 1;
    }
    return 1;
  };
  var extraRender = function extraRender2(info) {
    var start = info.start, end = info.end, getSize = info.getSize, offsetY = info.offsetY;
    if (end < 0) {
      return null;
    }
    var firstRowSpanColumns = flattenColumns.filter(
      // rowSpan is 0
      function(column) {
        return getRowSpan(column, start) === 0;
      }
    );
    var startIndex = start;
    var _loop = function _loop4(i2) {
      firstRowSpanColumns = firstRowSpanColumns.filter(function(column) {
        return getRowSpan(column, i2) === 0;
      });
      if (!firstRowSpanColumns.length) {
        startIndex = i2;
        return 1;
      }
    };
    for (var i = start; i >= 0; i -= 1) {
      if (_loop(i)) break;
    }
    var lastRowSpanColumns = flattenColumns.filter(
      // rowSpan is not 1
      function(column) {
        return getRowSpan(column, end) !== 1;
      }
    );
    var endIndex = end;
    var _loop2 = function _loop22(_i3) {
      lastRowSpanColumns = lastRowSpanColumns.filter(function(column) {
        return getRowSpan(column, _i3) !== 1;
      });
      if (!lastRowSpanColumns.length) {
        endIndex = Math.max(_i3 - 1, end);
        return 1;
      }
    };
    for (var _i = end; _i < flattenData2.length; _i += 1) {
      if (_loop2(_i)) break;
    }
    var spanLines = [];
    var _loop3 = function _loop32(_i22) {
      var item = flattenData2[_i22];
      if (!item) {
        return 1;
      }
      if (flattenColumns.some(function(column) {
        return getRowSpan(column, _i22) > 1;
      })) {
        spanLines.push(_i22);
      }
    };
    for (var _i2 = startIndex; _i2 <= endIndex; _i2 += 1) {
      if (_loop3(_i2)) continue;
    }
    var nodes = spanLines.map(function(index) {
      var item = flattenData2[index];
      var rowKey = getRowKey(item.record, index);
      var getHeight = function getHeight2(rowSpan) {
        var endItemIndex = index + rowSpan - 1;
        var endItemKey = getRowKey(flattenData2[endItemIndex].record, endItemIndex);
        var sizeInfo2 = getSize(rowKey, endItemKey);
        return sizeInfo2.bottom - sizeInfo2.top;
      };
      var sizeInfo = getSize(rowKey);
      return /* @__PURE__ */ reactExports.createElement(ResponseBodyLine, {
        key: index,
        data: item,
        rowKey,
        index,
        style: {
          top: -offsetY + sizeInfo.top
        },
        extra: true,
        getHeight
      });
    });
    return nodes;
  };
  var gridContext = reactExports.useMemo(function() {
    return {
      columnsOffset
    };
  }, [columnsOffset]);
  var tblPrefixCls = "".concat(prefixCls, "-tbody");
  var wrapperComponent = getComponent(["body", "wrapper"]);
  var horizontalScrollBarStyle = {};
  if (sticky) {
    horizontalScrollBarStyle.position = "sticky";
    horizontalScrollBarStyle.bottom = 0;
    if (_typeof(sticky) === "object" && sticky.offsetScroll) {
      horizontalScrollBarStyle.bottom = sticky.offsetScroll;
    }
  }
  return /* @__PURE__ */ reactExports.createElement(GridContext.Provider, {
    value: gridContext
  }, /* @__PURE__ */ reactExports.createElement(List, {
    fullHeight: false,
    ref: listRef,
    prefixCls: "".concat(tblPrefixCls, "-virtual"),
    styles: {
      horizontalScrollBar: horizontalScrollBarStyle
    },
    className: tblPrefixCls,
    height: scrollY,
    itemHeight: listItemHeight || 24,
    data: flattenData2,
    itemKey: function itemKey2(item) {
      return getRowKey(item.record);
    },
    component: wrapperComponent,
    scrollWidth: scrollX,
    direction,
    onVirtualScroll: function onVirtualScroll(_ref4) {
      var _listRef$current7;
      var x = _ref4.x;
      onScroll({
        currentTarget: (_listRef$current7 = listRef.current) === null || _listRef$current7 === void 0 ? void 0 : _listRef$current7.nativeElement,
        scrollLeft: x
      });
    },
    onScroll: onTablePropScroll,
    extraRender
  }, function(item, index, itemProps) {
    var rowKey = getRowKey(item.record, index);
    return /* @__PURE__ */ reactExports.createElement(ResponseBodyLine, {
      data: item,
      rowKey,
      index,
      style: itemProps.style
    });
  }));
});
var ResponseGrid = responseImmutable(Grid);
var renderBody = function renderBody2(rawData, props) {
  var ref = props.ref, onScroll = props.onScroll;
  return /* @__PURE__ */ reactExports.createElement(ResponseGrid, {
    ref,
    data: rawData,
    onScroll
  });
};
function VirtualTable(props, ref) {
  var data = props.data, columns = props.columns, scroll = props.scroll, sticky = props.sticky, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? DEFAULT_PREFIX : _props$prefixCls, className = props.className, listItemHeight = props.listItemHeight, components = props.components, onScroll = props.onScroll;
  var _ref = scroll || {}, scrollX = _ref.x, scrollY = _ref.y;
  if (typeof scrollX !== "number") {
    scrollX = 1;
  }
  if (typeof scrollY !== "number") {
    scrollY = 500;
  }
  var getComponent = useEvent(function(path, defaultComponent) {
    return get(components, path) || defaultComponent;
  });
  var onInternalScroll = useEvent(onScroll);
  var context = reactExports.useMemo(function() {
    return {
      sticky,
      scrollY,
      listItemHeight,
      getComponent,
      onScroll: onInternalScroll
    };
  }, [sticky, scrollY, listItemHeight, getComponent, onInternalScroll]);
  return /* @__PURE__ */ reactExports.createElement(StaticContext.Provider, {
    value: context
  }, /* @__PURE__ */ reactExports.createElement(ImmutableTable, _extends({}, props, {
    className: classNames(className, "".concat(prefixCls, "-virtual")),
    scroll: _objectSpread2(_objectSpread2({}, scroll), {}, {
      x: scrollX
    }),
    components: _objectSpread2(_objectSpread2({}, components), {}, {
      // fix https://github.com/ant-design/ant-design/issues/48991
      body: data !== null && data !== void 0 && data.length ? renderBody : void 0
    }),
    columns,
    internalHooks: INTERNAL_HOOKS,
    tailor: true,
    ref
  })));
}
var RefVirtualTable = /* @__PURE__ */ reactExports.forwardRef(VirtualTable);
function genVirtualTable(shouldTriggerRender) {
  return makeImmutable(RefVirtualTable, shouldTriggerRender);
}
genVirtualTable();
const Column = (_) => null;
const ColumnGroup = (_) => null;
var TreeContext = /* @__PURE__ */ reactExports.createContext(null);
var UnstableContext = /* @__PURE__ */ reactExports.createContext({});
var Indent = function Indent2(_ref) {
  var prefixCls = _ref.prefixCls, level = _ref.level, isStart = _ref.isStart, isEnd = _ref.isEnd;
  var baseClassName = "".concat(prefixCls, "-indent-unit");
  var list = [];
  for (var i = 0; i < level; i += 1) {
    list.push(/* @__PURE__ */ reactExports.createElement("span", {
      key: i,
      className: classNames(baseClassName, _defineProperty(_defineProperty({}, "".concat(baseClassName, "-start"), isStart[i]), "".concat(baseClassName, "-end"), isEnd[i]))
    }));
  }
  return /* @__PURE__ */ reactExports.createElement("span", {
    "aria-hidden": "true",
    className: "".concat(prefixCls, "-indent")
  }, list);
};
const Indent$1 = /* @__PURE__ */ reactExports.memo(Indent);
var _excluded$2 = ["eventKey", "className", "style", "dragOver", "dragOverGapTop", "dragOverGapBottom", "isLeaf", "isStart", "isEnd", "expanded", "selected", "checked", "halfChecked", "loading", "domRef", "active", "data", "onMouseMove", "selectable"];
var ICON_OPEN = "open";
var ICON_CLOSE = "close";
var defaultTitle = "---";
var TreeNode = function TreeNode2(props) {
  var _unstableContext$node, _context$filterTreeNo, _classNames4;
  var eventKey = props.eventKey, className = props.className, style = props.style, dragOver = props.dragOver, dragOverGapTop = props.dragOverGapTop, dragOverGapBottom = props.dragOverGapBottom, isLeaf = props.isLeaf, isStart = props.isStart, isEnd = props.isEnd, expanded = props.expanded, selected = props.selected, checked = props.checked, halfChecked = props.halfChecked, loading = props.loading, domRef = props.domRef, active = props.active, data = props.data, onMouseMove = props.onMouseMove, selectable = props.selectable, otherProps = _objectWithoutProperties(props, _excluded$2);
  var context = React.useContext(TreeContext);
  var unstableContext = React.useContext(UnstableContext);
  var selectHandleRef = React.useRef(null);
  var _React$useState = React.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), dragNodeHighlight = _React$useState2[0], setDragNodeHighlight = _React$useState2[1];
  var isDisabled = !!(context.disabled || props.disabled || (_unstableContext$node = unstableContext.nodeDisabled) !== null && _unstableContext$node !== void 0 && _unstableContext$node.call(unstableContext, data));
  var isCheckable = React.useMemo(function() {
    if (!context.checkable || props.checkable === false) {
      return false;
    }
    return context.checkable;
  }, [context.checkable, props.checkable]);
  var onSelect = function onSelect2(e) {
    if (isDisabled) {
      return;
    }
    context.onNodeSelect(e, convertNodePropsToEventData(props));
  };
  var onCheck = function onCheck2(e) {
    if (isDisabled) {
      return;
    }
    if (!isCheckable || props.disableCheckbox) {
      return;
    }
    context.onNodeCheck(e, convertNodePropsToEventData(props), !checked);
  };
  var isSelectable = React.useMemo(function() {
    if (typeof selectable === "boolean") {
      return selectable;
    }
    return context.selectable;
  }, [selectable, context.selectable]);
  var onSelectorClick = function onSelectorClick2(e) {
    context.onNodeClick(e, convertNodePropsToEventData(props));
    if (isSelectable) {
      onSelect(e);
    } else {
      onCheck(e);
    }
  };
  var onSelectorDoubleClick = function onSelectorDoubleClick2(e) {
    context.onNodeDoubleClick(e, convertNodePropsToEventData(props));
  };
  var onMouseEnter = function onMouseEnter2(e) {
    context.onNodeMouseEnter(e, convertNodePropsToEventData(props));
  };
  var onMouseLeave = function onMouseLeave2(e) {
    context.onNodeMouseLeave(e, convertNodePropsToEventData(props));
  };
  var onContextMenu = function onContextMenu2(e) {
    context.onNodeContextMenu(e, convertNodePropsToEventData(props));
  };
  var isDraggable = React.useMemo(function() {
    return !!(context.draggable && (!context.draggable.nodeDraggable || context.draggable.nodeDraggable(data)));
  }, [context.draggable, data]);
  var onDragStart = function onDragStart2(e) {
    e.stopPropagation();
    setDragNodeHighlight(true);
    context.onNodeDragStart(e, props);
    try {
      e.dataTransfer.setData("text/plain", "");
    } catch (_unused) {
    }
  };
  var onDragEnter = function onDragEnter2(e) {
    e.preventDefault();
    e.stopPropagation();
    context.onNodeDragEnter(e, props);
  };
  var onDragOver = function onDragOver2(e) {
    e.preventDefault();
    e.stopPropagation();
    context.onNodeDragOver(e, props);
  };
  var onDragLeave = function onDragLeave2(e) {
    e.stopPropagation();
    context.onNodeDragLeave(e, props);
  };
  var onDragEnd = function onDragEnd2(e) {
    e.stopPropagation();
    setDragNodeHighlight(false);
    context.onNodeDragEnd(e, props);
  };
  var onDrop = function onDrop2(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragNodeHighlight(false);
    context.onNodeDrop(e, props);
  };
  var onExpand = function onExpand2(e) {
    if (loading) {
      return;
    }
    context.onNodeExpand(e, convertNodePropsToEventData(props));
  };
  var hasChildren = React.useMemo(function() {
    var _ref = getEntity(context.keyEntities, eventKey) || {}, children = _ref.children;
    return Boolean((children || []).length);
  }, [context.keyEntities, eventKey]);
  var memoizedIsLeaf = React.useMemo(function() {
    if (isLeaf === false) {
      return false;
    }
    return isLeaf || !context.loadData && !hasChildren || context.loadData && props.loaded && !hasChildren;
  }, [isLeaf, context.loadData, hasChildren, props.loaded]);
  React.useEffect(function() {
    if (loading) {
      return;
    }
    if (typeof context.loadData === "function" && expanded && !memoizedIsLeaf && !props.loaded) {
      context.onNodeLoad(convertNodePropsToEventData(props));
    }
  }, [loading, context.loadData, context.onNodeLoad, expanded, memoizedIsLeaf, props]);
  var dragHandlerNode = React.useMemo(function() {
    var _context$draggable;
    if (!((_context$draggable = context.draggable) !== null && _context$draggable !== void 0 && _context$draggable.icon)) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("span", {
      className: "".concat(context.prefixCls, "-draggable-icon")
    }, context.draggable.icon);
  }, [context.draggable]);
  var renderSwitcherIconDom = function renderSwitcherIconDom2(isInternalLeaf) {
    var switcherIcon = props.switcherIcon || context.switcherIcon;
    if (typeof switcherIcon === "function") {
      return switcherIcon(_objectSpread2(_objectSpread2({}, props), {}, {
        isLeaf: isInternalLeaf
      }));
    }
    return switcherIcon;
  };
  var renderSwitcher = function renderSwitcher2() {
    if (memoizedIsLeaf) {
      var _switcherIconDom = renderSwitcherIconDom(true);
      return _switcherIconDom !== false ? /* @__PURE__ */ React.createElement("span", {
        className: classNames("".concat(context.prefixCls, "-switcher"), "".concat(context.prefixCls, "-switcher-noop"))
      }, _switcherIconDom) : null;
    }
    var switcherIconDom = renderSwitcherIconDom(false);
    return switcherIconDom !== false ? /* @__PURE__ */ React.createElement("span", {
      onClick: onExpand,
      className: classNames("".concat(context.prefixCls, "-switcher"), "".concat(context.prefixCls, "-switcher_").concat(expanded ? ICON_OPEN : ICON_CLOSE))
    }, switcherIconDom) : null;
  };
  var checkboxNode = React.useMemo(function() {
    if (!isCheckable) {
      return null;
    }
    var $custom = typeof isCheckable !== "boolean" ? isCheckable : null;
    return /* @__PURE__ */ React.createElement("span", {
      className: classNames("".concat(context.prefixCls, "-checkbox"), _defineProperty(_defineProperty(_defineProperty({}, "".concat(context.prefixCls, "-checkbox-checked"), checked), "".concat(context.prefixCls, "-checkbox-indeterminate"), !checked && halfChecked), "".concat(context.prefixCls, "-checkbox-disabled"), isDisabled || props.disableCheckbox)),
      onClick: onCheck,
      role: "checkbox",
      "aria-checked": halfChecked ? "mixed" : checked,
      "aria-disabled": isDisabled || props.disableCheckbox,
      "aria-label": "Select ".concat(typeof props.title === "string" ? props.title : "tree node")
    }, $custom);
  }, [isCheckable, checked, halfChecked, isDisabled, props.disableCheckbox, props.title]);
  var nodeState = React.useMemo(function() {
    if (memoizedIsLeaf) {
      return null;
    }
    return expanded ? ICON_OPEN : ICON_CLOSE;
  }, [memoizedIsLeaf, expanded]);
  var iconNode = React.useMemo(function() {
    return /* @__PURE__ */ React.createElement("span", {
      className: classNames("".concat(context.prefixCls, "-iconEle"), "".concat(context.prefixCls, "-icon__").concat(nodeState || "docu"), _defineProperty({}, "".concat(context.prefixCls, "-icon_loading"), loading))
    });
  }, [context.prefixCls, nodeState, loading]);
  var dropIndicatorNode = React.useMemo(function() {
    var rootDraggable = Boolean(context.draggable);
    var showIndicator = !props.disabled && rootDraggable && context.dragOverNodeKey === eventKey;
    if (!showIndicator) {
      return null;
    }
    return context.dropIndicatorRender({
      dropPosition: context.dropPosition,
      dropLevelOffset: context.dropLevelOffset,
      indent: context.indent,
      prefixCls: context.prefixCls,
      direction: context.direction
    });
  }, [context.dropPosition, context.dropLevelOffset, context.indent, context.prefixCls, context.direction, context.draggable, context.dragOverNodeKey, context.dropIndicatorRender]);
  var selectorNode = React.useMemo(function() {
    var _props$title = props.title, title = _props$title === void 0 ? defaultTitle : _props$title;
    var wrapClass = "".concat(context.prefixCls, "-node-content-wrapper");
    var $icon;
    if (context.showIcon) {
      var currentIcon = props.icon || context.icon;
      $icon = currentIcon ? /* @__PURE__ */ React.createElement("span", {
        className: classNames("".concat(context.prefixCls, "-iconEle"), "".concat(context.prefixCls, "-icon__customize"))
      }, typeof currentIcon === "function" ? currentIcon(props) : currentIcon) : iconNode;
    } else if (context.loadData && loading) {
      $icon = iconNode;
    }
    var titleNode;
    if (typeof title === "function") {
      titleNode = title(data);
    } else if (context.titleRender) {
      titleNode = context.titleRender(data);
    } else {
      titleNode = title;
    }
    return /* @__PURE__ */ React.createElement("span", {
      ref: selectHandleRef,
      title: typeof title === "string" ? title : "",
      className: classNames(wrapClass, "".concat(wrapClass, "-").concat(nodeState || "normal"), _defineProperty({}, "".concat(context.prefixCls, "-node-selected"), !isDisabled && (selected || dragNodeHighlight))),
      onMouseEnter,
      onMouseLeave,
      onContextMenu,
      onClick: onSelectorClick,
      onDoubleClick: onSelectorDoubleClick
    }, $icon, /* @__PURE__ */ React.createElement("span", {
      className: "".concat(context.prefixCls, "-title")
    }, titleNode), dropIndicatorNode);
  }, [context.prefixCls, context.showIcon, props, context.icon, iconNode, context.titleRender, data, nodeState, onMouseEnter, onMouseLeave, onContextMenu, onSelectorClick, onSelectorDoubleClick]);
  var dataOrAriaAttributeProps = pickAttrs(otherProps, {
    aria: true,
    data: true
  });
  var _ref2 = getEntity(context.keyEntities, eventKey) || {}, level = _ref2.level;
  var isEndNode = isEnd[isEnd.length - 1];
  var draggableWithoutDisabled = !isDisabled && isDraggable;
  var dragging = context.draggingNodeKey === eventKey;
  var ariaSelected = selectable !== void 0 ? {
    "aria-selected": !!selectable
  } : void 0;
  return /* @__PURE__ */ React.createElement("div", _extends({
    ref: domRef,
    role: "treeitem",
    "aria-expanded": isLeaf ? void 0 : expanded,
    className: classNames(className, "".concat(context.prefixCls, "-treenode"), (_classNames4 = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_classNames4, "".concat(context.prefixCls, "-treenode-disabled"), isDisabled), "".concat(context.prefixCls, "-treenode-switcher-").concat(expanded ? "open" : "close"), !isLeaf), "".concat(context.prefixCls, "-treenode-checkbox-checked"), checked), "".concat(context.prefixCls, "-treenode-checkbox-indeterminate"), halfChecked), "".concat(context.prefixCls, "-treenode-selected"), selected), "".concat(context.prefixCls, "-treenode-loading"), loading), "".concat(context.prefixCls, "-treenode-active"), active), "".concat(context.prefixCls, "-treenode-leaf-last"), isEndNode), "".concat(context.prefixCls, "-treenode-draggable"), isDraggable), "dragging", dragging), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_classNames4, "drop-target", context.dropTargetKey === eventKey), "drop-container", context.dropContainerKey === eventKey), "drag-over", !isDisabled && dragOver), "drag-over-gap-top", !isDisabled && dragOverGapTop), "drag-over-gap-bottom", !isDisabled && dragOverGapBottom), "filter-node", (_context$filterTreeNo = context.filterTreeNode) === null || _context$filterTreeNo === void 0 ? void 0 : _context$filterTreeNo.call(context, convertNodePropsToEventData(props))), "".concat(context.prefixCls, "-treenode-leaf"), memoizedIsLeaf))),
    style,
    draggable: draggableWithoutDisabled,
    onDragStart: draggableWithoutDisabled ? onDragStart : void 0,
    onDragEnter: isDraggable ? onDragEnter : void 0,
    onDragOver: isDraggable ? onDragOver : void 0,
    onDragLeave: isDraggable ? onDragLeave : void 0,
    onDrop: isDraggable ? onDrop : void 0,
    onDragEnd: isDraggable ? onDragEnd : void 0,
    onMouseMove
  }, ariaSelected, dataOrAriaAttributeProps), /* @__PURE__ */ React.createElement(Indent$1, {
    prefixCls: context.prefixCls,
    level,
    isStart,
    isEnd
  }), dragHandlerNode, renderSwitcher(), checkboxNode, selectorNode);
};
TreeNode.isTreeNode = 1;
function arrDel(list, value) {
  if (!list) return [];
  var clone = list.slice();
  var index = clone.indexOf(value);
  if (index >= 0) {
    clone.splice(index, 1);
  }
  return clone;
}
function arrAdd(list, value) {
  var clone = (list || []).slice();
  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }
  return clone;
}
function posToArr(pos) {
  return pos.split("-");
}
function getDragChildrenKeys(dragNodeKey, keyEntities) {
  var dragChildrenKeys = [];
  var entity = getEntity(keyEntities, dragNodeKey);
  function dig() {
    var list = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    list.forEach(function(_ref) {
      var key = _ref.key, children = _ref.children;
      dragChildrenKeys.push(key);
      dig(children);
    });
  }
  dig(entity.children);
  return dragChildrenKeys;
}
function isLastChild(treeNodeEntity) {
  if (treeNodeEntity.parent) {
    var posArr = posToArr(treeNodeEntity.pos);
    return Number(posArr[posArr.length - 1]) === treeNodeEntity.parent.children.length - 1;
  }
  return false;
}
function isFirstChild(treeNodeEntity) {
  var posArr = posToArr(treeNodeEntity.pos);
  return Number(posArr[posArr.length - 1]) === 0;
}
function calcDropPosition(event, dragNodeProps, targetNodeProps, indent, startMousePosition, allowDrop2, flattenedNodes, keyEntities, expandKeys, direction) {
  var _abstractDropNodeEnti;
  var clientX = event.clientX, clientY = event.clientY;
  var _getBoundingClientRec = event.target.getBoundingClientRect(), top = _getBoundingClientRec.top, height = _getBoundingClientRec.height;
  var horizontalMouseOffset = (direction === "rtl" ? -1 : 1) * (((startMousePosition === null || startMousePosition === void 0 ? void 0 : startMousePosition.x) || 0) - clientX);
  var rawDropLevelOffset = (horizontalMouseOffset - 12) / indent;
  var filteredExpandKeys = expandKeys.filter(function(key) {
    var _keyEntities$key;
    return (_keyEntities$key = keyEntities[key]) === null || _keyEntities$key === void 0 || (_keyEntities$key = _keyEntities$key.children) === null || _keyEntities$key === void 0 ? void 0 : _keyEntities$key.length;
  });
  var abstractDropNodeEntity = getEntity(keyEntities, targetNodeProps.eventKey);
  if (clientY < top + height / 2) {
    var nodeIndex = flattenedNodes.findIndex(function(flattenedNode) {
      return flattenedNode.key === abstractDropNodeEntity.key;
    });
    var prevNodeIndex = nodeIndex <= 0 ? 0 : nodeIndex - 1;
    var prevNodeKey = flattenedNodes[prevNodeIndex].key;
    abstractDropNodeEntity = getEntity(keyEntities, prevNodeKey);
  }
  var initialAbstractDropNodeKey = abstractDropNodeEntity.key;
  var abstractDragOverEntity = abstractDropNodeEntity;
  var dragOverNodeKey = abstractDropNodeEntity.key;
  var dropPosition = 0;
  var dropLevelOffset = 0;
  if (!filteredExpandKeys.includes(initialAbstractDropNodeKey)) {
    for (var i = 0; i < rawDropLevelOffset; i += 1) {
      if (isLastChild(abstractDropNodeEntity)) {
        abstractDropNodeEntity = abstractDropNodeEntity.parent;
        dropLevelOffset += 1;
      } else {
        break;
      }
    }
  }
  var abstractDragDataNode = dragNodeProps.data;
  var abstractDropDataNode = abstractDropNodeEntity.node;
  var dropAllowed = true;
  if (isFirstChild(abstractDropNodeEntity) && abstractDropNodeEntity.level === 0 && clientY < top + height / 2 && allowDrop2({
    dragNode: abstractDragDataNode,
    dropNode: abstractDropDataNode,
    dropPosition: -1
  }) && abstractDropNodeEntity.key === targetNodeProps.eventKey) {
    dropPosition = -1;
  } else if ((abstractDragOverEntity.children || []).length && filteredExpandKeys.includes(dragOverNodeKey)) {
    if (allowDrop2({
      dragNode: abstractDragDataNode,
      dropNode: abstractDropDataNode,
      dropPosition: 0
    })) {
      dropPosition = 0;
    } else {
      dropAllowed = false;
    }
  } else if (dropLevelOffset === 0) {
    if (rawDropLevelOffset > -1.5) {
      if (allowDrop2({
        dragNode: abstractDragDataNode,
        dropNode: abstractDropDataNode,
        dropPosition: 1
      })) {
        dropPosition = 1;
      } else {
        dropAllowed = false;
      }
    } else {
      if (allowDrop2({
        dragNode: abstractDragDataNode,
        dropNode: abstractDropDataNode,
        dropPosition: 0
      })) {
        dropPosition = 0;
      } else if (allowDrop2({
        dragNode: abstractDragDataNode,
        dropNode: abstractDropDataNode,
        dropPosition: 1
      })) {
        dropPosition = 1;
      } else {
        dropAllowed = false;
      }
    }
  } else {
    if (allowDrop2({
      dragNode: abstractDragDataNode,
      dropNode: abstractDropDataNode,
      dropPosition: 1
    })) {
      dropPosition = 1;
    } else {
      dropAllowed = false;
    }
  }
  return {
    dropPosition,
    dropLevelOffset,
    dropTargetKey: abstractDropNodeEntity.key,
    dropTargetPos: abstractDropNodeEntity.pos,
    dragOverNodeKey,
    dropContainerKey: dropPosition === 0 ? null : ((_abstractDropNodeEnti = abstractDropNodeEntity.parent) === null || _abstractDropNodeEnti === void 0 ? void 0 : _abstractDropNodeEnti.key) || null,
    dropAllowed
  };
}
function calcSelectedKeys(selectedKeys, props) {
  if (!selectedKeys) return void 0;
  var multiple = props.multiple;
  if (multiple) {
    return selectedKeys.slice();
  }
  if (selectedKeys.length) {
    return [selectedKeys[0]];
  }
  return selectedKeys;
}
function parseCheckedKeys(keys) {
  if (!keys) {
    return null;
  }
  var keyProps;
  if (Array.isArray(keys)) {
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: void 0
    };
  } else if (_typeof(keys) === "object") {
    keyProps = {
      checkedKeys: keys.checked || void 0,
      halfCheckedKeys: keys.halfChecked || void 0
    };
  } else {
    warningOnce(false, "`checkedKeys` is not an array or an object");
    return null;
  }
  return keyProps;
}
function conductExpandParent(keyList, keyEntities) {
  var expandedKeys = /* @__PURE__ */ new Set();
  function conductUp(key) {
    if (expandedKeys.has(key)) return;
    var entity = getEntity(keyEntities, key);
    if (!entity) return;
    expandedKeys.add(key);
    var parent = entity.parent, node = entity.node;
    if (node.disabled) return;
    if (parent) {
      conductUp(parent.key);
    }
  }
  (keyList || []).forEach(function(key) {
    conductUp(key);
  });
  return _toConsumableArray(expandedKeys);
}
const SELECTION_COLUMN = {};
const SELECTION_ALL = "SELECT_ALL";
const SELECTION_INVERT = "SELECT_INVERT";
const SELECTION_NONE = "SELECT_NONE";
const EMPTY_LIST$1 = [];
const flattenData = (childrenColumnName, data, list = []) => {
  (data || []).forEach((record) => {
    list.push(record);
    if (record && typeof record === "object" && childrenColumnName in record) {
      flattenData(childrenColumnName, record[childrenColumnName], list);
    }
  });
  return list;
};
const useSelection = (config, rowSelection) => {
  const {
    preserveSelectedRowKeys,
    selectedRowKeys,
    defaultSelectedRowKeys,
    getCheckboxProps,
    getTitleCheckboxProps,
    onChange: onSelectionChange,
    onSelect,
    onSelectAll,
    onSelectInvert,
    onSelectNone,
    onSelectMultiple,
    columnWidth: selectionColWidth,
    type: selectionType,
    selections,
    fixed,
    renderCell: customizeRenderCell,
    hideSelectAll,
    checkStrictly = true
  } = rowSelection || {};
  const {
    prefixCls,
    data,
    pageData,
    getRecordByKey,
    getRowKey,
    expandType,
    childrenColumnName,
    locale: tableLocale,
    getPopupContainer
  } = config;
  const warning = devUseWarning();
  const [multipleSelect, updatePrevSelectedIndex] = useMultipleSelect((item) => item);
  const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState(selectedRowKeys || defaultSelectedRowKeys || EMPTY_LIST$1, {
    value: selectedRowKeys
  });
  const preserveRecordsRef = reactExports.useRef(/* @__PURE__ */ new Map());
  const updatePreserveRecordsCache = reactExports.useCallback((keys) => {
    if (preserveSelectedRowKeys) {
      const newCache = /* @__PURE__ */ new Map();
      keys.forEach((key) => {
        let record = getRecordByKey(key);
        if (!record && preserveRecordsRef.current.has(key)) {
          record = preserveRecordsRef.current.get(key);
        }
        newCache.set(key, record);
      });
      preserveRecordsRef.current = newCache;
    }
  }, [getRecordByKey, preserveSelectedRowKeys]);
  reactExports.useEffect(() => {
    updatePreserveRecordsCache(mergedSelectedKeys);
  }, [mergedSelectedKeys]);
  const flattedData = reactExports.useMemo(() => flattenData(childrenColumnName, pageData), [childrenColumnName, pageData]);
  const {
    keyEntities
  } = reactExports.useMemo(() => {
    if (checkStrictly) {
      return {
        keyEntities: null
      };
    }
    let convertData = data;
    if (preserveSelectedRowKeys) {
      const keysSet = new Set(flattedData.map((record, index) => getRowKey(record, index)));
      const preserveRecords = Array.from(preserveRecordsRef.current).reduce((total, [key, value]) => keysSet.has(key) ? total : total.concat(value), []);
      convertData = [].concat(_toConsumableArray(convertData), _toConsumableArray(preserveRecords));
    }
    return convertDataToEntities(convertData, {
      externalGetKey: getRowKey,
      childrenPropName: childrenColumnName
    });
  }, [data, getRowKey, checkStrictly, childrenColumnName, preserveSelectedRowKeys, flattedData]);
  const checkboxPropsMap = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    flattedData.forEach((record, index) => {
      const key = getRowKey(record, index);
      const checkboxProps = (getCheckboxProps ? getCheckboxProps(record) : null) || {};
      map.set(key, checkboxProps);
    });
    return map;
  }, [flattedData, getRowKey, getCheckboxProps]);
  const isCheckboxDisabled = reactExports.useCallback((r) => {
    const rowKey = getRowKey(r);
    let checkboxProps;
    if (checkboxPropsMap.has(rowKey)) {
      checkboxProps = checkboxPropsMap.get(getRowKey(r));
    } else {
      checkboxProps = getCheckboxProps ? getCheckboxProps(r) : void 0;
    }
    return !!(checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.disabled);
  }, [checkboxPropsMap, getRowKey]);
  const [derivedSelectedKeys, derivedHalfSelectedKeys] = reactExports.useMemo(() => {
    if (checkStrictly) {
      return [mergedSelectedKeys || [], []];
    }
    const {
      checkedKeys,
      halfCheckedKeys
    } = conductCheck(mergedSelectedKeys, true, keyEntities, isCheckboxDisabled);
    return [checkedKeys || [], halfCheckedKeys];
  }, [mergedSelectedKeys, checkStrictly, keyEntities, isCheckboxDisabled]);
  const derivedSelectedKeySet = reactExports.useMemo(() => {
    const keys = selectionType === "radio" ? derivedSelectedKeys.slice(0, 1) : derivedSelectedKeys;
    return new Set(keys);
  }, [derivedSelectedKeys, selectionType]);
  const derivedHalfSelectedKeySet = reactExports.useMemo(() => selectionType === "radio" ? /* @__PURE__ */ new Set() : new Set(derivedHalfSelectedKeys), [derivedHalfSelectedKeys, selectionType]);
  reactExports.useEffect(() => {
    if (!rowSelection) {
      setMergedSelectedKeys(EMPTY_LIST$1);
    }
  }, [!!rowSelection]);
  const setSelectedKeys = reactExports.useCallback((keys, method) => {
    let availableKeys;
    let records;
    updatePreserveRecordsCache(keys);
    if (preserveSelectedRowKeys) {
      availableKeys = keys;
      records = keys.map((key) => preserveRecordsRef.current.get(key));
    } else {
      availableKeys = [];
      records = [];
      keys.forEach((key) => {
        const record = getRecordByKey(key);
        if (record !== void 0) {
          availableKeys.push(key);
          records.push(record);
        }
      });
    }
    setMergedSelectedKeys(availableKeys);
    onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange(availableKeys, records, {
      type: method
    });
  }, [setMergedSelectedKeys, getRecordByKey, onSelectionChange, preserveSelectedRowKeys]);
  const triggerSingleSelection = reactExports.useCallback((key, selected, keys, event) => {
    if (onSelect) {
      const rows = keys.map((k) => getRecordByKey(k));
      onSelect(getRecordByKey(key), selected, rows, event);
    }
    setSelectedKeys(keys, "single");
  }, [onSelect, getRecordByKey, setSelectedKeys]);
  const mergedSelections = reactExports.useMemo(() => {
    if (!selections || hideSelectAll) {
      return null;
    }
    const selectionList = selections === true ? [SELECTION_ALL, SELECTION_INVERT, SELECTION_NONE] : selections;
    return selectionList.map((selection) => {
      if (selection === SELECTION_ALL) {
        return {
          key: "all",
          text: tableLocale.selectionAll,
          onSelect() {
            setSelectedKeys(data.map((record, index) => getRowKey(record, index)).filter((key) => {
              const checkProps = checkboxPropsMap.get(key);
              return !(checkProps === null || checkProps === void 0 ? void 0 : checkProps.disabled) || derivedSelectedKeySet.has(key);
            }), "all");
          }
        };
      }
      if (selection === SELECTION_INVERT) {
        return {
          key: "invert",
          text: tableLocale.selectInvert,
          onSelect() {
            const keySet = new Set(derivedSelectedKeySet);
            pageData.forEach((record, index) => {
              const key = getRowKey(record, index);
              const checkProps = checkboxPropsMap.get(key);
              if (!(checkProps === null || checkProps === void 0 ? void 0 : checkProps.disabled)) {
                if (keySet.has(key)) {
                  keySet.delete(key);
                } else {
                  keySet.add(key);
                }
              }
            });
            const keys = Array.from(keySet);
            if (onSelectInvert) {
              warning.deprecated(false, "onSelectInvert", "onChange");
              onSelectInvert(keys);
            }
            setSelectedKeys(keys, "invert");
          }
        };
      }
      if (selection === SELECTION_NONE) {
        return {
          key: "none",
          text: tableLocale.selectNone,
          onSelect() {
            onSelectNone === null || onSelectNone === void 0 ? void 0 : onSelectNone();
            setSelectedKeys(Array.from(derivedSelectedKeySet).filter((key) => {
              const checkProps = checkboxPropsMap.get(key);
              return checkProps === null || checkProps === void 0 ? void 0 : checkProps.disabled;
            }), "none");
          }
        };
      }
      return selection;
    }).map((selection) => Object.assign(Object.assign({}, selection), {
      onSelect: (...rest) => {
        var _a2;
        var _a;
        (_a = selection.onSelect) === null || _a === void 0 ? void 0 : (_a2 = _a).call.apply(_a2, [selection].concat(rest));
        updatePrevSelectedIndex(null);
      }
    }));
  }, [selections, derivedSelectedKeySet, pageData, getRowKey, onSelectInvert, setSelectedKeys]);
  const transformColumns = reactExports.useCallback((columns) => {
    var _a;
    if (!rowSelection) {
      return columns.filter((col) => col !== SELECTION_COLUMN);
    }
    let cloneColumns = _toConsumableArray(columns);
    const keySet = new Set(derivedSelectedKeySet);
    const recordKeys = flattedData.map(getRowKey).filter((key) => !checkboxPropsMap.get(key).disabled);
    const checkedCurrentAll = recordKeys.every((key) => keySet.has(key));
    const checkedCurrentSome = recordKeys.some((key) => keySet.has(key));
    const onSelectAllChange = () => {
      const changeKeys = [];
      if (checkedCurrentAll) {
        recordKeys.forEach((key) => {
          keySet.delete(key);
          changeKeys.push(key);
        });
      } else {
        recordKeys.forEach((key) => {
          if (!keySet.has(key)) {
            keySet.add(key);
            changeKeys.push(key);
          }
        });
      }
      const keys = Array.from(keySet);
      onSelectAll === null || onSelectAll === void 0 ? void 0 : onSelectAll(!checkedCurrentAll, keys.map((k) => getRecordByKey(k)), changeKeys.map((k) => getRecordByKey(k)));
      setSelectedKeys(keys, "all");
      updatePrevSelectedIndex(null);
    };
    let title;
    let columnTitleCheckbox;
    if (selectionType !== "radio") {
      let customizeSelections;
      if (mergedSelections) {
        const menu = {
          getPopupContainer,
          items: mergedSelections.map((selection, index) => {
            const {
              key,
              text,
              onSelect: onSelectionClick
            } = selection;
            return {
              key: key !== null && key !== void 0 ? key : index,
              onClick: () => {
                onSelectionClick === null || onSelectionClick === void 0 ? void 0 : onSelectionClick(recordKeys);
              },
              label: text
            };
          })
        };
        customizeSelections = /* @__PURE__ */ reactExports.createElement("div", {
          className: `${prefixCls}-selection-extra`
        }, /* @__PURE__ */ reactExports.createElement(Dropdown, {
          menu,
          getPopupContainer
        }, /* @__PURE__ */ reactExports.createElement("span", null, /* @__PURE__ */ reactExports.createElement(RefIcon$f, null))));
      }
      const allDisabledData = flattedData.map((record, index) => {
        const key = getRowKey(record, index);
        const checkboxProps = checkboxPropsMap.get(key) || {};
        return Object.assign({
          checked: keySet.has(key)
        }, checkboxProps);
      }).filter(({
        disabled: disabled2
      }) => disabled2);
      const allDisabled = !!allDisabledData.length && allDisabledData.length === flattedData.length;
      const allDisabledAndChecked = allDisabled && allDisabledData.every(({
        checked
      }) => checked);
      const allDisabledSomeChecked = allDisabled && allDisabledData.some(({
        checked
      }) => checked);
      const customCheckboxProps = (getTitleCheckboxProps === null || getTitleCheckboxProps === void 0 ? void 0 : getTitleCheckboxProps()) || {};
      const {
        onChange,
        disabled
      } = customCheckboxProps;
      columnTitleCheckbox = /* @__PURE__ */ reactExports.createElement(Checkbox, Object.assign({
        "aria-label": customizeSelections ? "Custom selection" : "Select all"
      }, customCheckboxProps, {
        checked: !allDisabled ? !!flattedData.length && checkedCurrentAll : allDisabledAndChecked,
        indeterminate: !allDisabled ? !checkedCurrentAll && checkedCurrentSome : !allDisabledAndChecked && allDisabledSomeChecked,
        onChange: (e) => {
          onSelectAllChange();
          onChange === null || onChange === void 0 ? void 0 : onChange(e);
        },
        disabled: disabled !== null && disabled !== void 0 ? disabled : flattedData.length === 0 || allDisabled,
        skipGroup: true
      }));
      title = !hideSelectAll && /* @__PURE__ */ reactExports.createElement("div", {
        className: `${prefixCls}-selection`
      }, columnTitleCheckbox, customizeSelections);
    }
    let renderCell;
    if (selectionType === "radio") {
      renderCell = (_, record, index) => {
        const key = getRowKey(record, index);
        const checked = keySet.has(key);
        const checkboxProps = checkboxPropsMap.get(key);
        return {
          node: /* @__PURE__ */ reactExports.createElement(Radio, Object.assign({}, checkboxProps, {
            checked,
            onClick: (e) => {
              var _a2;
              e.stopPropagation();
              (_a2 = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.onClick) === null || _a2 === void 0 ? void 0 : _a2.call(checkboxProps, e);
            },
            onChange: (event) => {
              var _a2;
              if (!keySet.has(key)) {
                triggerSingleSelection(key, true, [key], event.nativeEvent);
              }
              (_a2 = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(checkboxProps, event);
            }
          })),
          checked
        };
      };
    } else {
      renderCell = (_, record, index) => {
        var _a2;
        const key = getRowKey(record, index);
        const checked = keySet.has(key);
        const indeterminate = derivedHalfSelectedKeySet.has(key);
        const checkboxProps = checkboxPropsMap.get(key);
        let mergedIndeterminate;
        if (expandType === "nest") {
          mergedIndeterminate = indeterminate;
        } else {
          mergedIndeterminate = (_a2 = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.indeterminate) !== null && _a2 !== void 0 ? _a2 : indeterminate;
        }
        return {
          node: /* @__PURE__ */ reactExports.createElement(Checkbox, Object.assign({}, checkboxProps, {
            indeterminate: mergedIndeterminate,
            checked,
            skipGroup: true,
            onClick: (e) => {
              var _a3;
              e.stopPropagation();
              (_a3 = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.onClick) === null || _a3 === void 0 ? void 0 : _a3.call(checkboxProps, e);
            },
            onChange: (event) => {
              var _a3;
              const {
                nativeEvent
              } = event;
              const {
                shiftKey
              } = nativeEvent;
              const currentSelectedIndex = recordKeys.indexOf(key);
              const isMultiple = derivedSelectedKeys.some((item) => recordKeys.includes(item));
              if (shiftKey && checkStrictly && isMultiple) {
                const changedKeys = multipleSelect(currentSelectedIndex, recordKeys, keySet);
                const keys = Array.from(keySet);
                onSelectMultiple === null || onSelectMultiple === void 0 ? void 0 : onSelectMultiple(!checked, keys.map((recordKey) => getRecordByKey(recordKey)), changedKeys.map((recordKey) => getRecordByKey(recordKey)));
                setSelectedKeys(keys, "multiple");
              } else {
                const originCheckedKeys = derivedSelectedKeys;
                if (checkStrictly) {
                  const checkedKeys = checked ? arrDel(originCheckedKeys, key) : arrAdd(originCheckedKeys, key);
                  triggerSingleSelection(key, !checked, checkedKeys, nativeEvent);
                } else {
                  const result = conductCheck([].concat(_toConsumableArray(originCheckedKeys), [key]), true, keyEntities, isCheckboxDisabled);
                  const {
                    checkedKeys,
                    halfCheckedKeys
                  } = result;
                  let nextCheckedKeys = checkedKeys;
                  if (checked) {
                    const tempKeySet = new Set(checkedKeys);
                    tempKeySet.delete(key);
                    nextCheckedKeys = conductCheck(Array.from(tempKeySet), {
                      halfCheckedKeys
                    }, keyEntities, isCheckboxDisabled).checkedKeys;
                  }
                  triggerSingleSelection(key, !checked, nextCheckedKeys, nativeEvent);
                }
              }
              if (checked) {
                updatePrevSelectedIndex(null);
              } else {
                updatePrevSelectedIndex(currentSelectedIndex);
              }
              (_a3 = checkboxProps === null || checkboxProps === void 0 ? void 0 : checkboxProps.onChange) === null || _a3 === void 0 ? void 0 : _a3.call(checkboxProps, event);
            }
          })),
          checked
        };
      };
    }
    const renderSelectionCell = (_, record, index) => {
      const {
        node,
        checked
      } = renderCell(_, record, index);
      if (customizeRenderCell) {
        return customizeRenderCell(checked, record, index, node);
      }
      return node;
    };
    if (!cloneColumns.includes(SELECTION_COLUMN)) {
      if (cloneColumns.findIndex((col) => {
        var _a2;
        return ((_a2 = col[INTERNAL_COL_DEFINE]) === null || _a2 === void 0 ? void 0 : _a2.columnType) === "EXPAND_COLUMN";
      }) === 0) {
        const [expandColumn, ...restColumns] = cloneColumns;
        cloneColumns = [expandColumn, SELECTION_COLUMN].concat(_toConsumableArray(restColumns));
      } else {
        cloneColumns = [SELECTION_COLUMN].concat(_toConsumableArray(cloneColumns));
      }
    }
    const selectionColumnIndex = cloneColumns.indexOf(SELECTION_COLUMN);
    cloneColumns = cloneColumns.filter((column, index) => column !== SELECTION_COLUMN || index === selectionColumnIndex);
    const prevCol = cloneColumns[selectionColumnIndex - 1];
    const nextCol = cloneColumns[selectionColumnIndex + 1];
    let mergedFixed = fixed;
    if (mergedFixed === void 0) {
      if ((nextCol === null || nextCol === void 0 ? void 0 : nextCol.fixed) !== void 0) {
        mergedFixed = nextCol.fixed;
      } else if ((prevCol === null || prevCol === void 0 ? void 0 : prevCol.fixed) !== void 0) {
        mergedFixed = prevCol.fixed;
      }
    }
    if (mergedFixed && prevCol && ((_a = prevCol[INTERNAL_COL_DEFINE]) === null || _a === void 0 ? void 0 : _a.columnType) === "EXPAND_COLUMN" && prevCol.fixed === void 0) {
      prevCol.fixed = mergedFixed;
    }
    const columnCls = classNames(`${prefixCls}-selection-col`, {
      [`${prefixCls}-selection-col-with-dropdown`]: selections && selectionType === "checkbox"
    });
    const renderColumnTitle2 = () => {
      if (!(rowSelection === null || rowSelection === void 0 ? void 0 : rowSelection.columnTitle)) {
        return title;
      }
      if (typeof rowSelection.columnTitle === "function") {
        return rowSelection.columnTitle(columnTitleCheckbox);
      }
      return rowSelection.columnTitle;
    };
    const selectionColumn = {
      fixed: mergedFixed,
      width: selectionColWidth,
      className: `${prefixCls}-selection-column`,
      title: renderColumnTitle2(),
      render: renderSelectionCell,
      onCell: rowSelection.onCell,
      align: rowSelection.align,
      [INTERNAL_COL_DEFINE]: {
        className: columnCls
      }
    };
    return cloneColumns.map((col) => col === SELECTION_COLUMN ? selectionColumn : col);
  }, [getRowKey, flattedData, rowSelection, derivedSelectedKeys, derivedSelectedKeySet, derivedHalfSelectedKeySet, selectionColWidth, mergedSelections, expandType, checkboxPropsMap, onSelectMultiple, triggerSingleSelection, isCheckboxDisabled]);
  return [transformColumns, derivedSelectedKeySet];
};
function renderExpandIcon(locale2) {
  return (props) => {
    const {
      prefixCls,
      onExpand,
      record,
      expanded,
      expandable
    } = props;
    const iconPrefix = `${prefixCls}-row-expand-icon`;
    return /* @__PURE__ */ reactExports.createElement("button", {
      type: "button",
      onClick: (e) => {
        onExpand(record, e);
        e.stopPropagation();
      },
      className: classNames(iconPrefix, {
        [`${iconPrefix}-spaced`]: !expandable,
        [`${iconPrefix}-expanded`]: expandable && expanded,
        [`${iconPrefix}-collapsed`]: expandable && !expanded
      }),
      "aria-label": expanded ? locale2.collapse : locale2.expand,
      "aria-expanded": expanded
    });
  };
}
function useContainerWidth(prefixCls) {
  const getContainerWidth = (ele, width) => {
    const container = ele.querySelector(`.${prefixCls}-container`);
    let returnWidth = width;
    if (container) {
      const style = getComputedStyle(container);
      const borderLeft = Number.parseInt(style.borderLeftWidth, 10);
      const borderRight = Number.parseInt(style.borderRightWidth, 10);
      returnWidth = width - borderLeft - borderRight;
    }
    return returnWidth;
  };
  return getContainerWidth;
}
const getColumnKey = (column, defaultKey) => {
  if ("key" in column && column.key !== void 0 && column.key !== null) {
    return column.key;
  }
  if (column.dataIndex) {
    return Array.isArray(column.dataIndex) ? column.dataIndex.join(".") : column.dataIndex;
  }
  return defaultKey;
};
function getColumnPos(index, pos) {
  return pos ? `${pos}-${index}` : `${index}`;
}
const renderColumnTitle = (title, props) => {
  if (typeof title === "function") {
    return title(props);
  }
  return title;
};
const safeColumnTitle = (title, props) => {
  const res = renderColumnTitle(title, props);
  if (Object.prototype.toString.call(res) === "[object Object]") {
    return "";
  }
  return res;
};
var FilterFilled$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z" } }] }, "name": "filter", "theme": "filled" };
var FilterFilled = function FilterFilled2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: FilterFilled$1
  }));
};
var RefIcon$9 = /* @__PURE__ */ reactExports.forwardRef(FilterFilled);
var DropIndicator = function DropIndicator2(props) {
  var dropPosition = props.dropPosition, dropLevelOffset = props.dropLevelOffset, indent = props.indent;
  var style = {
    pointerEvents: "none",
    position: "absolute",
    right: 0,
    backgroundColor: "red",
    height: 2
  };
  switch (dropPosition) {
    case -1:
      style.top = 0;
      style.left = -dropLevelOffset * indent;
      break;
    case 1:
      style.bottom = 0;
      style.left = -dropLevelOffset * indent;
      break;
    case 0:
      style.bottom = 0;
      style.left = indent;
      break;
  }
  return /* @__PURE__ */ React.createElement("div", {
    style
  });
};
function _objectDestructuringEmpty(t) {
  if (null == t) throw new TypeError("Cannot destructure " + t);
}
function useUnmount(triggerStart, triggerEnd) {
  var _React$useState = reactExports.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), firstMount = _React$useState2[0], setFirstMount = _React$useState2[1];
  useLayoutEffect(function() {
    if (firstMount) {
      triggerStart();
      return function() {
        triggerEnd();
      };
    }
  }, [firstMount]);
  useLayoutEffect(function() {
    setFirstMount(true);
    return function() {
      setFirstMount(false);
    };
  }, []);
}
var _excluded$1 = ["className", "style", "motion", "motionNodes", "motionType", "onMotionStart", "onMotionEnd", "active", "treeNodeRequiredProps"];
var MotionTreeNode = /* @__PURE__ */ reactExports.forwardRef(function(oriProps, ref) {
  var className = oriProps.className, style = oriProps.style, motion = oriProps.motion, motionNodes = oriProps.motionNodes, motionType = oriProps.motionType, onOriginMotionStart = oriProps.onMotionStart, onOriginMotionEnd = oriProps.onMotionEnd, active = oriProps.active, treeNodeRequiredProps = oriProps.treeNodeRequiredProps, props = _objectWithoutProperties(oriProps, _excluded$1);
  var _React$useState = reactExports.useState(true), _React$useState2 = _slicedToArray(_React$useState, 2), visible = _React$useState2[0], setVisible = _React$useState2[1];
  var _React$useContext = reactExports.useContext(TreeContext), prefixCls = _React$useContext.prefixCls;
  var targetVisible = motionNodes && motionType !== "hide";
  useLayoutEffect(function() {
    if (motionNodes) {
      if (targetVisible !== visible) {
        setVisible(targetVisible);
      }
    }
  }, [motionNodes]);
  var triggerMotionStart = function triggerMotionStart2() {
    if (motionNodes) {
      onOriginMotionStart();
    }
  };
  var triggerMotionEndRef = reactExports.useRef(false);
  var triggerMotionEnd = function triggerMotionEnd2() {
    if (motionNodes && !triggerMotionEndRef.current) {
      triggerMotionEndRef.current = true;
      onOriginMotionEnd();
    }
  };
  useUnmount(triggerMotionStart, triggerMotionEnd);
  var onVisibleChanged = function onVisibleChanged2(nextVisible) {
    if (targetVisible === nextVisible) {
      triggerMotionEnd();
    }
  };
  if (motionNodes) {
    return /* @__PURE__ */ reactExports.createElement(CSSMotion, _extends({
      ref,
      visible
    }, motion, {
      motionAppear: motionType === "show",
      onVisibleChanged
    }), function(_ref, motionRef) {
      var motionClassName = _ref.className, motionStyle = _ref.style;
      return /* @__PURE__ */ reactExports.createElement("div", {
        ref: motionRef,
        className: classNames("".concat(prefixCls, "-treenode-motion"), motionClassName),
        style: motionStyle
      }, motionNodes.map(function(treeNode) {
        var restProps = Object.assign({}, (_objectDestructuringEmpty(treeNode.data), treeNode.data)), title = treeNode.title, key = treeNode.key, isStart = treeNode.isStart, isEnd = treeNode.isEnd;
        delete restProps.children;
        var treeNodeProps = getTreeNodeProps(key, treeNodeRequiredProps);
        return /* @__PURE__ */ reactExports.createElement(TreeNode, _extends({}, restProps, treeNodeProps, {
          title,
          active,
          data: treeNode.data,
          key,
          isStart,
          isEnd
        }));
      }));
    });
  }
  return /* @__PURE__ */ reactExports.createElement(TreeNode, _extends({
    domRef: ref,
    className,
    style
  }, props, {
    active
  }));
});
function findExpandedKeys() {
  var prev = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var next = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  var prevLen = prev.length;
  var nextLen = next.length;
  if (Math.abs(prevLen - nextLen) !== 1) {
    return {
      add: false,
      key: null
    };
  }
  function find(shorter, longer) {
    var cache = /* @__PURE__ */ new Map();
    shorter.forEach(function(key) {
      cache.set(key, true);
    });
    var keys = longer.filter(function(key) {
      return !cache.has(key);
    });
    return keys.length === 1 ? keys[0] : null;
  }
  if (prevLen < nextLen) {
    return {
      add: true,
      key: find(prev, next)
    };
  }
  return {
    add: false,
    key: find(next, prev)
  };
}
function getExpandRange(shorter, longer, key) {
  var shorterStartIndex = shorter.findIndex(function(data) {
    return data.key === key;
  });
  var shorterEndNode = shorter[shorterStartIndex + 1];
  var longerStartIndex = longer.findIndex(function(data) {
    return data.key === key;
  });
  if (shorterEndNode) {
    var longerEndIndex = longer.findIndex(function(data) {
      return data.key === shorterEndNode.key;
    });
    return longer.slice(longerStartIndex + 1, longerEndIndex);
  }
  return longer.slice(longerStartIndex + 1);
}
var _excluded = ["prefixCls", "data", "selectable", "checkable", "expandedKeys", "selectedKeys", "checkedKeys", "loadedKeys", "loadingKeys", "halfCheckedKeys", "keyEntities", "disabled", "dragging", "dragOverNodeKey", "dropPosition", "motion", "height", "itemHeight", "virtual", "scrollWidth", "focusable", "activeItem", "focused", "tabIndex", "onKeyDown", "onFocus", "onBlur", "onActiveChange", "onListChangeStart", "onListChangeEnd"];
var HIDDEN_STYLE = {
  width: 0,
  height: 0,
  display: "flex",
  overflow: "hidden",
  opacity: 0,
  border: 0,
  padding: 0,
  margin: 0
};
var noop = function noop2() {
};
var MOTION_KEY = "RC_TREE_MOTION_".concat(Math.random());
var MotionNode = {
  key: MOTION_KEY
};
var MotionEntity = {
  key: MOTION_KEY,
  level: 0,
  index: 0,
  pos: "0",
  node: MotionNode,
  nodes: [MotionNode]
};
var MotionFlattenData = {
  parent: null,
  children: [],
  pos: MotionEntity.pos,
  data: MotionNode,
  title: null,
  key: MOTION_KEY,
  /** Hold empty list here since we do not use it */
  isStart: [],
  isEnd: []
};
function getMinimumRangeTransitionRange(list, virtual, height, itemHeight) {
  if (virtual === false || !height) {
    return list;
  }
  return list.slice(0, Math.ceil(height / itemHeight) + 1);
}
function itemKey(item) {
  var key = item.key, pos = item.pos;
  return getKey(key, pos);
}
function getAccessibilityPath(item) {
  var path = String(item.data.key);
  var current = item;
  while (current.parent) {
    current = current.parent;
    path = "".concat(current.data.key, " > ").concat(path);
  }
  return path;
}
var NodeList = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, data = props.data;
  props.selectable;
  props.checkable;
  var expandedKeys = props.expandedKeys, selectedKeys = props.selectedKeys, checkedKeys = props.checkedKeys, loadedKeys = props.loadedKeys, loadingKeys = props.loadingKeys, halfCheckedKeys = props.halfCheckedKeys, keyEntities = props.keyEntities, disabled = props.disabled, dragging = props.dragging, dragOverNodeKey = props.dragOverNodeKey, dropPosition = props.dropPosition, motion = props.motion, height = props.height, itemHeight = props.itemHeight, virtual = props.virtual, scrollWidth = props.scrollWidth, focusable = props.focusable, activeItem = props.activeItem, focused = props.focused, tabIndex = props.tabIndex, onKeyDown2 = props.onKeyDown, onFocus = props.onFocus, onBlur = props.onBlur, onActiveChange = props.onActiveChange, onListChangeStart = props.onListChangeStart, onListChangeEnd = props.onListChangeEnd, domProps = _objectWithoutProperties(props, _excluded);
  var listRef = reactExports.useRef(null);
  var indentMeasurerRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, function() {
    return {
      scrollTo: function scrollTo2(scroll) {
        listRef.current.scrollTo(scroll);
      },
      getIndentWidth: function getIndentWidth() {
        return indentMeasurerRef.current.offsetWidth;
      }
    };
  });
  var _React$useState = reactExports.useState(expandedKeys), _React$useState2 = _slicedToArray(_React$useState, 2), prevExpandedKeys = _React$useState2[0], setPrevExpandedKeys = _React$useState2[1];
  var _React$useState3 = reactExports.useState(data), _React$useState4 = _slicedToArray(_React$useState3, 2), prevData = _React$useState4[0], setPrevData = _React$useState4[1];
  var _React$useState5 = reactExports.useState(data), _React$useState6 = _slicedToArray(_React$useState5, 2), transitionData = _React$useState6[0], setTransitionData = _React$useState6[1];
  var _React$useState7 = reactExports.useState([]), _React$useState8 = _slicedToArray(_React$useState7, 2), transitionRange = _React$useState8[0], setTransitionRange = _React$useState8[1];
  var _React$useState9 = reactExports.useState(null), _React$useState10 = _slicedToArray(_React$useState9, 2), motionType = _React$useState10[0], setMotionType = _React$useState10[1];
  var dataRef = reactExports.useRef(data);
  dataRef.current = data;
  function onMotionEnd() {
    var latestData = dataRef.current;
    setPrevData(latestData);
    setTransitionData(latestData);
    setTransitionRange([]);
    setMotionType(null);
    onListChangeEnd();
  }
  useLayoutEffect(function() {
    setPrevExpandedKeys(expandedKeys);
    var diffExpanded = findExpandedKeys(prevExpandedKeys, expandedKeys);
    if (diffExpanded.key !== null) {
      if (diffExpanded.add) {
        var keyIndex = prevData.findIndex(function(_ref) {
          var key = _ref.key;
          return key === diffExpanded.key;
        });
        var rangeNodes = getMinimumRangeTransitionRange(getExpandRange(prevData, data, diffExpanded.key), virtual, height, itemHeight);
        var newTransitionData = prevData.slice();
        newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);
        setTransitionData(newTransitionData);
        setTransitionRange(rangeNodes);
        setMotionType("show");
      } else {
        var _keyIndex = data.findIndex(function(_ref2) {
          var key = _ref2.key;
          return key === diffExpanded.key;
        });
        var _rangeNodes = getMinimumRangeTransitionRange(getExpandRange(data, prevData, diffExpanded.key), virtual, height, itemHeight);
        var _newTransitionData = data.slice();
        _newTransitionData.splice(_keyIndex + 1, 0, MotionFlattenData);
        setTransitionData(_newTransitionData);
        setTransitionRange(_rangeNodes);
        setMotionType("hide");
      }
    } else if (prevData !== data) {
      setPrevData(data);
      setTransitionData(data);
    }
  }, [expandedKeys, data]);
  reactExports.useEffect(function() {
    if (!dragging) {
      onMotionEnd();
    }
  }, [dragging]);
  var mergedData = motion ? transitionData : data;
  var treeNodeRequiredProps = {
    expandedKeys,
    selectedKeys,
    loadedKeys,
    loadingKeys,
    checkedKeys,
    halfCheckedKeys,
    dragOverNodeKey,
    dropPosition,
    keyEntities
  };
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, focused && activeItem && /* @__PURE__ */ reactExports.createElement("span", {
    style: HIDDEN_STYLE,
    "aria-live": "assertive"
  }, getAccessibilityPath(activeItem)), /* @__PURE__ */ reactExports.createElement("div", null, /* @__PURE__ */ reactExports.createElement("input", {
    style: HIDDEN_STYLE,
    disabled: focusable === false || disabled,
    tabIndex: focusable !== false ? tabIndex : null,
    onKeyDown: onKeyDown2,
    onFocus,
    onBlur,
    value: "",
    onChange: noop,
    "aria-label": "for screen reader"
  })), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-treenode"),
    "aria-hidden": true,
    style: {
      position: "absolute",
      pointerEvents: "none",
      visibility: "hidden",
      height: 0,
      overflow: "hidden",
      border: 0,
      padding: 0
    }
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-indent")
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ref: indentMeasurerRef,
    className: "".concat(prefixCls, "-indent-unit")
  }))), /* @__PURE__ */ reactExports.createElement(List, _extends({}, domProps, {
    data: mergedData,
    itemKey,
    height,
    fullHeight: false,
    virtual,
    itemHeight,
    scrollWidth,
    prefixCls: "".concat(prefixCls, "-list"),
    ref: listRef,
    role: "tree",
    onVisibleChange: function onVisibleChange(originList) {
      if (originList.every(function(item) {
        return itemKey(item) !== MOTION_KEY;
      })) {
        onMotionEnd();
      }
    }
  }), function(treeNode) {
    var pos = treeNode.pos, restProps = Object.assign({}, (_objectDestructuringEmpty(treeNode.data), treeNode.data)), title = treeNode.title, key = treeNode.key, isStart = treeNode.isStart, isEnd = treeNode.isEnd;
    var mergedKey = getKey(key, pos);
    delete restProps.key;
    delete restProps.children;
    var treeNodeProps = getTreeNodeProps(mergedKey, treeNodeRequiredProps);
    return /* @__PURE__ */ reactExports.createElement(MotionTreeNode, _extends({}, restProps, treeNodeProps, {
      title,
      active: !!activeItem && key === activeItem.key,
      pos,
      data: treeNode.data,
      isStart,
      isEnd,
      motion,
      motionNodes: key === MOTION_KEY ? transitionRange : null,
      motionType,
      onMotionStart: onListChangeStart,
      onMotionEnd,
      treeNodeRequiredProps,
      onMouseMove: function onMouseMove() {
        onActiveChange(null);
      }
    }));
  }));
});
var MAX_RETRY_TIMES = 10;
var Tree$2 = /* @__PURE__ */ function(_React$Component) {
  _inherits(Tree2, _React$Component);
  var _super = _createSuper(Tree2);
  function Tree2() {
    var _this;
    _classCallCheck(this, Tree2);
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(_args));
    _defineProperty(_assertThisInitialized(_this), "destroyed", false);
    _defineProperty(_assertThisInitialized(_this), "delayedDragEnterLogic", void 0);
    _defineProperty(_assertThisInitialized(_this), "loadingRetryTimes", {});
    _defineProperty(_assertThisInitialized(_this), "state", {
      keyEntities: {},
      indent: null,
      selectedKeys: [],
      checkedKeys: [],
      halfCheckedKeys: [],
      loadedKeys: [],
      loadingKeys: [],
      expandedKeys: [],
      draggingNodeKey: null,
      dragChildrenKeys: [],
      // dropTargetKey is the key of abstract-drop-node
      // the abstract-drop-node is the real drop node when drag and drop
      // not the DOM drag over node
      dropTargetKey: null,
      dropPosition: null,
      // the drop position of abstract-drop-node, inside 0, top -1, bottom 1
      dropContainerKey: null,
      // the container key of abstract-drop-node if dropPosition is -1 or 1
      dropLevelOffset: null,
      // the drop level offset of abstract-drag-over-node
      dropTargetPos: null,
      // the pos of abstract-drop-node
      dropAllowed: true,
      // if drop to abstract-drop-node is allowed
      // the abstract-drag-over-node
      // if mouse is on the bottom of top dom node or no the top of the bottom dom node
      // abstract-drag-over-node is the top node
      dragOverNodeKey: null,
      treeData: [],
      flattenNodes: [],
      focused: false,
      activeKey: null,
      listChanging: false,
      prevProps: null,
      fieldNames: fillFieldNames()
    });
    _defineProperty(_assertThisInitialized(_this), "dragStartMousePosition", null);
    _defineProperty(_assertThisInitialized(_this), "dragNodeProps", null);
    _defineProperty(_assertThisInitialized(_this), "currentMouseOverDroppableNodeKey", null);
    _defineProperty(_assertThisInitialized(_this), "listRef", /* @__PURE__ */ reactExports.createRef());
    _defineProperty(_assertThisInitialized(_this), "onNodeDragStart", function(event, nodeProps) {
      var _this$state = _this.state, expandedKeys = _this$state.expandedKeys, keyEntities = _this$state.keyEntities;
      var onDragStart = _this.props.onDragStart;
      var eventKey = nodeProps.eventKey;
      _this.dragNodeProps = nodeProps;
      _this.dragStartMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      var newExpandedKeys = arrDel(expandedKeys, eventKey);
      _this.setState({
        draggingNodeKey: eventKey,
        dragChildrenKeys: getDragChildrenKeys(eventKey, keyEntities),
        indent: _this.listRef.current.getIndentWidth()
      });
      _this.setExpandedKeys(newExpandedKeys);
      window.addEventListener("dragend", _this.onWindowDragEnd);
      onDragStart === null || onDragStart === void 0 || onDragStart({
        event,
        node: convertNodePropsToEventData(nodeProps)
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeDragEnter", function(event, nodeProps) {
      var _this$state2 = _this.state, expandedKeys = _this$state2.expandedKeys, keyEntities = _this$state2.keyEntities, dragChildrenKeys = _this$state2.dragChildrenKeys, flattenNodes = _this$state2.flattenNodes, indent = _this$state2.indent;
      var _this$props = _this.props, onDragEnter = _this$props.onDragEnter, onExpand = _this$props.onExpand, allowDrop2 = _this$props.allowDrop, direction = _this$props.direction;
      var pos = nodeProps.pos, eventKey = nodeProps.eventKey;
      if (_this.currentMouseOverDroppableNodeKey !== eventKey) {
        _this.currentMouseOverDroppableNodeKey = eventKey;
      }
      if (!_this.dragNodeProps) {
        _this.resetDragState();
        return;
      }
      var _calcDropPosition = calcDropPosition(event, _this.dragNodeProps, nodeProps, indent, _this.dragStartMousePosition, allowDrop2, flattenNodes, keyEntities, expandedKeys, direction), dropPosition = _calcDropPosition.dropPosition, dropLevelOffset = _calcDropPosition.dropLevelOffset, dropTargetKey = _calcDropPosition.dropTargetKey, dropContainerKey = _calcDropPosition.dropContainerKey, dropTargetPos = _calcDropPosition.dropTargetPos, dropAllowed = _calcDropPosition.dropAllowed, dragOverNodeKey = _calcDropPosition.dragOverNodeKey;
      if (
        // don't allow drop inside its children
        dragChildrenKeys.includes(dropTargetKey) || // don't allow drop when drop is not allowed caculated by calcDropPosition
        !dropAllowed
      ) {
        _this.resetDragState();
        return;
      }
      if (!_this.delayedDragEnterLogic) {
        _this.delayedDragEnterLogic = {};
      }
      Object.keys(_this.delayedDragEnterLogic).forEach(function(key) {
        clearTimeout(_this.delayedDragEnterLogic[key]);
      });
      if (_this.dragNodeProps.eventKey !== nodeProps.eventKey) {
        event.persist();
        _this.delayedDragEnterLogic[pos] = window.setTimeout(function() {
          if (_this.state.draggingNodeKey === null) {
            return;
          }
          var newExpandedKeys = _toConsumableArray(expandedKeys);
          var entity = getEntity(keyEntities, nodeProps.eventKey);
          if (entity && (entity.children || []).length) {
            newExpandedKeys = arrAdd(expandedKeys, nodeProps.eventKey);
          }
          if (!_this.props.hasOwnProperty("expandedKeys")) {
            _this.setExpandedKeys(newExpandedKeys);
          }
          onExpand === null || onExpand === void 0 || onExpand(newExpandedKeys, {
            node: convertNodePropsToEventData(nodeProps),
            expanded: true,
            nativeEvent: event.nativeEvent
          });
        }, 800);
      }
      if (_this.dragNodeProps.eventKey === dropTargetKey && dropLevelOffset === 0) {
        _this.resetDragState();
        return;
      }
      _this.setState({
        dragOverNodeKey,
        dropPosition,
        dropLevelOffset,
        dropTargetKey,
        dropContainerKey,
        dropTargetPos,
        dropAllowed
      });
      onDragEnter === null || onDragEnter === void 0 || onDragEnter({
        event,
        node: convertNodePropsToEventData(nodeProps),
        expandedKeys
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeDragOver", function(event, nodeProps) {
      var _this$state3 = _this.state, dragChildrenKeys = _this$state3.dragChildrenKeys, flattenNodes = _this$state3.flattenNodes, keyEntities = _this$state3.keyEntities, expandedKeys = _this$state3.expandedKeys, indent = _this$state3.indent;
      var _this$props2 = _this.props, onDragOver = _this$props2.onDragOver, allowDrop2 = _this$props2.allowDrop, direction = _this$props2.direction;
      if (!_this.dragNodeProps) {
        return;
      }
      var _calcDropPosition2 = calcDropPosition(event, _this.dragNodeProps, nodeProps, indent, _this.dragStartMousePosition, allowDrop2, flattenNodes, keyEntities, expandedKeys, direction), dropPosition = _calcDropPosition2.dropPosition, dropLevelOffset = _calcDropPosition2.dropLevelOffset, dropTargetKey = _calcDropPosition2.dropTargetKey, dropContainerKey = _calcDropPosition2.dropContainerKey, dropTargetPos = _calcDropPosition2.dropTargetPos, dropAllowed = _calcDropPosition2.dropAllowed, dragOverNodeKey = _calcDropPosition2.dragOverNodeKey;
      if (dragChildrenKeys.includes(dropTargetKey) || !dropAllowed) {
        return;
      }
      if (_this.dragNodeProps.eventKey === dropTargetKey && dropLevelOffset === 0) {
        if (!(_this.state.dropPosition === null && _this.state.dropLevelOffset === null && _this.state.dropTargetKey === null && _this.state.dropContainerKey === null && _this.state.dropTargetPos === null && _this.state.dropAllowed === false && _this.state.dragOverNodeKey === null)) {
          _this.resetDragState();
        }
      } else if (!(dropPosition === _this.state.dropPosition && dropLevelOffset === _this.state.dropLevelOffset && dropTargetKey === _this.state.dropTargetKey && dropContainerKey === _this.state.dropContainerKey && dropTargetPos === _this.state.dropTargetPos && dropAllowed === _this.state.dropAllowed && dragOverNodeKey === _this.state.dragOverNodeKey)) {
        _this.setState({
          dropPosition,
          dropLevelOffset,
          dropTargetKey,
          dropContainerKey,
          dropTargetPos,
          dropAllowed,
          dragOverNodeKey
        });
      }
      onDragOver === null || onDragOver === void 0 || onDragOver({
        event,
        node: convertNodePropsToEventData(nodeProps)
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeDragLeave", function(event, nodeProps) {
      if (_this.currentMouseOverDroppableNodeKey === nodeProps.eventKey && !event.currentTarget.contains(event.relatedTarget)) {
        _this.resetDragState();
        _this.currentMouseOverDroppableNodeKey = null;
      }
      var onDragLeave = _this.props.onDragLeave;
      onDragLeave === null || onDragLeave === void 0 || onDragLeave({
        event,
        node: convertNodePropsToEventData(nodeProps)
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onWindowDragEnd", function(event) {
      _this.onNodeDragEnd(event, null, true);
      window.removeEventListener("dragend", _this.onWindowDragEnd);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeDragEnd", function(event, nodeProps) {
      var onDragEnd = _this.props.onDragEnd;
      _this.setState({
        dragOverNodeKey: null
      });
      _this.cleanDragState();
      onDragEnd === null || onDragEnd === void 0 || onDragEnd({
        event,
        node: convertNodePropsToEventData(nodeProps)
      });
      _this.dragNodeProps = null;
      window.removeEventListener("dragend", _this.onWindowDragEnd);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeDrop", function(event, _) {
      var _this$getActiveItem;
      var outsideTree = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var _this$state4 = _this.state, dragChildrenKeys = _this$state4.dragChildrenKeys, dropPosition = _this$state4.dropPosition, dropTargetKey = _this$state4.dropTargetKey, dropTargetPos = _this$state4.dropTargetPos, dropAllowed = _this$state4.dropAllowed;
      if (!dropAllowed) {
        return;
      }
      var onDrop = _this.props.onDrop;
      _this.setState({
        dragOverNodeKey: null
      });
      _this.cleanDragState();
      if (dropTargetKey === null) return;
      var abstractDropNodeProps = _objectSpread2(_objectSpread2({}, getTreeNodeProps(dropTargetKey, _this.getTreeNodeRequiredProps())), {}, {
        active: ((_this$getActiveItem = _this.getActiveItem()) === null || _this$getActiveItem === void 0 ? void 0 : _this$getActiveItem.key) === dropTargetKey,
        data: getEntity(_this.state.keyEntities, dropTargetKey).node
      });
      var dropToChild = dragChildrenKeys.includes(dropTargetKey);
      warningOnce(!dropToChild, "Can not drop to dragNode's children node. This is a bug of rc-tree. Please report an issue.");
      var posArr = posToArr(dropTargetPos);
      var dropResult = {
        event,
        node: convertNodePropsToEventData(abstractDropNodeProps),
        dragNode: _this.dragNodeProps ? convertNodePropsToEventData(_this.dragNodeProps) : null,
        dragNodesKeys: [_this.dragNodeProps.eventKey].concat(dragChildrenKeys),
        dropToGap: dropPosition !== 0,
        dropPosition: dropPosition + Number(posArr[posArr.length - 1])
      };
      if (!outsideTree) {
        onDrop === null || onDrop === void 0 || onDrop(dropResult);
      }
      _this.dragNodeProps = null;
    });
    _defineProperty(_assertThisInitialized(_this), "cleanDragState", function() {
      var draggingNodeKey = _this.state.draggingNodeKey;
      if (draggingNodeKey !== null) {
        _this.setState({
          draggingNodeKey: null,
          dropPosition: null,
          dropContainerKey: null,
          dropTargetKey: null,
          dropLevelOffset: null,
          dropAllowed: true,
          dragOverNodeKey: null
        });
      }
      _this.dragStartMousePosition = null;
      _this.currentMouseOverDroppableNodeKey = null;
    });
    _defineProperty(_assertThisInitialized(_this), "triggerExpandActionExpand", function(e, treeNode) {
      var _this$state5 = _this.state, expandedKeys = _this$state5.expandedKeys, flattenNodes = _this$state5.flattenNodes;
      var expanded = treeNode.expanded, key = treeNode.key, isLeaf = treeNode.isLeaf;
      if (isLeaf || e.shiftKey || e.metaKey || e.ctrlKey) {
        return;
      }
      var node = flattenNodes.filter(function(nodeItem) {
        return nodeItem.key === key;
      })[0];
      var eventNode = convertNodePropsToEventData(_objectSpread2(_objectSpread2({}, getTreeNodeProps(key, _this.getTreeNodeRequiredProps())), {}, {
        data: node.data
      }));
      _this.setExpandedKeys(expanded ? arrDel(expandedKeys, key) : arrAdd(expandedKeys, key));
      _this.onNodeExpand(e, eventNode);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeClick", function(e, treeNode) {
      var _this$props3 = _this.props, onClick = _this$props3.onClick, expandAction = _this$props3.expandAction;
      if (expandAction === "click") {
        _this.triggerExpandActionExpand(e, treeNode);
      }
      onClick === null || onClick === void 0 || onClick(e, treeNode);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeDoubleClick", function(e, treeNode) {
      var _this$props4 = _this.props, onDoubleClick = _this$props4.onDoubleClick, expandAction = _this$props4.expandAction;
      if (expandAction === "doubleClick") {
        _this.triggerExpandActionExpand(e, treeNode);
      }
      onDoubleClick === null || onDoubleClick === void 0 || onDoubleClick(e, treeNode);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeSelect", function(e, treeNode) {
      var selectedKeys = _this.state.selectedKeys;
      var _this$state6 = _this.state, keyEntities = _this$state6.keyEntities, fieldNames = _this$state6.fieldNames;
      var _this$props5 = _this.props, onSelect = _this$props5.onSelect, multiple = _this$props5.multiple;
      var selected = treeNode.selected;
      var key = treeNode[fieldNames.key];
      var targetSelected = !selected;
      if (!targetSelected) {
        selectedKeys = arrDel(selectedKeys, key);
      } else if (!multiple) {
        selectedKeys = [key];
      } else {
        selectedKeys = arrAdd(selectedKeys, key);
      }
      var selectedNodes = selectedKeys.map(function(selectedKey) {
        var entity = getEntity(keyEntities, selectedKey);
        return entity ? entity.node : null;
      }).filter(Boolean);
      _this.setUncontrolledState({
        selectedKeys
      });
      onSelect === null || onSelect === void 0 || onSelect(selectedKeys, {
        event: "select",
        selected: targetSelected,
        node: treeNode,
        selectedNodes,
        nativeEvent: e.nativeEvent
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeCheck", function(e, treeNode, checked) {
      var _this$state7 = _this.state, keyEntities = _this$state7.keyEntities, oriCheckedKeys = _this$state7.checkedKeys, oriHalfCheckedKeys = _this$state7.halfCheckedKeys;
      var _this$props6 = _this.props, checkStrictly = _this$props6.checkStrictly, onCheck = _this$props6.onCheck;
      var key = treeNode.key;
      var checkedObj;
      var eventObj = {
        event: "check",
        node: treeNode,
        checked,
        nativeEvent: e.nativeEvent
      };
      if (checkStrictly) {
        var checkedKeys = checked ? arrAdd(oriCheckedKeys, key) : arrDel(oriCheckedKeys, key);
        var halfCheckedKeys = arrDel(oriHalfCheckedKeys, key);
        checkedObj = {
          checked: checkedKeys,
          halfChecked: halfCheckedKeys
        };
        eventObj.checkedNodes = checkedKeys.map(function(checkedKey) {
          return getEntity(keyEntities, checkedKey);
        }).filter(Boolean).map(function(entity) {
          return entity.node;
        });
        _this.setUncontrolledState({
          checkedKeys
        });
      } else {
        var _conductCheck = conductCheck([].concat(_toConsumableArray(oriCheckedKeys), [key]), true, keyEntities), _checkedKeys = _conductCheck.checkedKeys, _halfCheckedKeys = _conductCheck.halfCheckedKeys;
        if (!checked) {
          var keySet = new Set(_checkedKeys);
          keySet.delete(key);
          var _conductCheck2 = conductCheck(Array.from(keySet), {
            halfCheckedKeys: _halfCheckedKeys
          }, keyEntities);
          _checkedKeys = _conductCheck2.checkedKeys;
          _halfCheckedKeys = _conductCheck2.halfCheckedKeys;
        }
        checkedObj = _checkedKeys;
        eventObj.checkedNodes = [];
        eventObj.checkedNodesPositions = [];
        eventObj.halfCheckedKeys = _halfCheckedKeys;
        _checkedKeys.forEach(function(checkedKey) {
          var entity = getEntity(keyEntities, checkedKey);
          if (!entity) return;
          var node = entity.node, pos = entity.pos;
          eventObj.checkedNodes.push(node);
          eventObj.checkedNodesPositions.push({
            node,
            pos
          });
        });
        _this.setUncontrolledState({
          checkedKeys: _checkedKeys
        }, false, {
          halfCheckedKeys: _halfCheckedKeys
        });
      }
      onCheck === null || onCheck === void 0 || onCheck(checkedObj, eventObj);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeLoad", function(treeNode) {
      var _entity$children;
      var key = treeNode.key;
      var keyEntities = _this.state.keyEntities;
      var entity = getEntity(keyEntities, key);
      if (entity !== null && entity !== void 0 && (_entity$children = entity.children) !== null && _entity$children !== void 0 && _entity$children.length) {
        return;
      }
      var loadPromise = new Promise(function(resolve, reject) {
        _this.setState(function(_ref) {
          var _ref$loadedKeys = _ref.loadedKeys, loadedKeys = _ref$loadedKeys === void 0 ? [] : _ref$loadedKeys, _ref$loadingKeys = _ref.loadingKeys, loadingKeys = _ref$loadingKeys === void 0 ? [] : _ref$loadingKeys;
          var _this$props7 = _this.props, loadData = _this$props7.loadData, onLoad = _this$props7.onLoad;
          if (!loadData || loadedKeys.includes(key) || loadingKeys.includes(key)) {
            return null;
          }
          var promise = loadData(treeNode);
          promise.then(function() {
            var currentLoadedKeys = _this.state.loadedKeys;
            var newLoadedKeys = arrAdd(currentLoadedKeys, key);
            onLoad === null || onLoad === void 0 || onLoad(newLoadedKeys, {
              event: "load",
              node: treeNode
            });
            _this.setUncontrolledState({
              loadedKeys: newLoadedKeys
            });
            _this.setState(function(prevState) {
              return {
                loadingKeys: arrDel(prevState.loadingKeys, key)
              };
            });
            resolve();
          }).catch(function(e) {
            _this.setState(function(prevState) {
              return {
                loadingKeys: arrDel(prevState.loadingKeys, key)
              };
            });
            _this.loadingRetryTimes[key] = (_this.loadingRetryTimes[key] || 0) + 1;
            if (_this.loadingRetryTimes[key] >= MAX_RETRY_TIMES) {
              var currentLoadedKeys = _this.state.loadedKeys;
              warningOnce(false, "Retry for `loadData` many times but still failed. No more retry.");
              _this.setUncontrolledState({
                loadedKeys: arrAdd(currentLoadedKeys, key)
              });
              resolve();
            }
            reject(e);
          });
          return {
            loadingKeys: arrAdd(loadingKeys, key)
          };
        });
      });
      loadPromise.catch(function() {
      });
      return loadPromise;
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeMouseEnter", function(event, node) {
      var onMouseEnter = _this.props.onMouseEnter;
      onMouseEnter === null || onMouseEnter === void 0 || onMouseEnter({
        event,
        node
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeMouseLeave", function(event, node) {
      var onMouseLeave = _this.props.onMouseLeave;
      onMouseLeave === null || onMouseLeave === void 0 || onMouseLeave({
        event,
        node
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeContextMenu", function(event, node) {
      var onRightClick = _this.props.onRightClick;
      if (onRightClick) {
        event.preventDefault();
        onRightClick({
          event,
          node
        });
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onFocus", function() {
      var onFocus = _this.props.onFocus;
      _this.setState({
        focused: true
      });
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      onFocus === null || onFocus === void 0 || onFocus.apply(void 0, args);
    });
    _defineProperty(_assertThisInitialized(_this), "onBlur", function() {
      var onBlur = _this.props.onBlur;
      _this.setState({
        focused: false
      });
      _this.onActiveChange(null);
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      onBlur === null || onBlur === void 0 || onBlur.apply(void 0, args);
    });
    _defineProperty(_assertThisInitialized(_this), "getTreeNodeRequiredProps", function() {
      var _this$state8 = _this.state, expandedKeys = _this$state8.expandedKeys, selectedKeys = _this$state8.selectedKeys, loadedKeys = _this$state8.loadedKeys, loadingKeys = _this$state8.loadingKeys, checkedKeys = _this$state8.checkedKeys, halfCheckedKeys = _this$state8.halfCheckedKeys, dragOverNodeKey = _this$state8.dragOverNodeKey, dropPosition = _this$state8.dropPosition, keyEntities = _this$state8.keyEntities;
      return {
        expandedKeys: expandedKeys || [],
        selectedKeys: selectedKeys || [],
        loadedKeys: loadedKeys || [],
        loadingKeys: loadingKeys || [],
        checkedKeys: checkedKeys || [],
        halfCheckedKeys: halfCheckedKeys || [],
        dragOverNodeKey,
        dropPosition,
        keyEntities
      };
    });
    _defineProperty(_assertThisInitialized(_this), "setExpandedKeys", function(expandedKeys) {
      var _this$state9 = _this.state, treeData = _this$state9.treeData, fieldNames = _this$state9.fieldNames;
      var flattenNodes = flattenTreeData(treeData, expandedKeys, fieldNames);
      _this.setUncontrolledState({
        expandedKeys,
        flattenNodes
      }, true);
    });
    _defineProperty(_assertThisInitialized(_this), "onNodeExpand", function(e, treeNode) {
      var expandedKeys = _this.state.expandedKeys;
      var _this$state10 = _this.state, listChanging = _this$state10.listChanging, fieldNames = _this$state10.fieldNames;
      var _this$props8 = _this.props, onExpand = _this$props8.onExpand, loadData = _this$props8.loadData;
      var expanded = treeNode.expanded;
      var key = treeNode[fieldNames.key];
      if (listChanging) {
        return;
      }
      var certain = expandedKeys.includes(key);
      var targetExpanded = !expanded;
      warningOnce(expanded && certain || !expanded && !certain, "Expand state not sync with index check");
      expandedKeys = targetExpanded ? arrAdd(expandedKeys, key) : arrDel(expandedKeys, key);
      _this.setExpandedKeys(expandedKeys);
      onExpand === null || onExpand === void 0 || onExpand(expandedKeys, {
        node: treeNode,
        expanded: targetExpanded,
        nativeEvent: e.nativeEvent
      });
      if (targetExpanded && loadData) {
        var loadPromise = _this.onNodeLoad(treeNode);
        if (loadPromise) {
          loadPromise.then(function() {
            var newFlattenTreeData = flattenTreeData(_this.state.treeData, expandedKeys, fieldNames);
            _this.setUncontrolledState({
              flattenNodes: newFlattenTreeData
            });
          }).catch(function() {
            var currentExpandedKeys = _this.state.expandedKeys;
            var expandedKeysToRestore = arrDel(currentExpandedKeys, key);
            _this.setExpandedKeys(expandedKeysToRestore);
          });
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onListChangeStart", function() {
      _this.setUncontrolledState({
        listChanging: true
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onListChangeEnd", function() {
      setTimeout(function() {
        _this.setUncontrolledState({
          listChanging: false
        });
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onActiveChange", function(newActiveKey) {
      var activeKey = _this.state.activeKey;
      var _this$props9 = _this.props, onActiveChange = _this$props9.onActiveChange, _this$props9$itemScro = _this$props9.itemScrollOffset, itemScrollOffset = _this$props9$itemScro === void 0 ? 0 : _this$props9$itemScro;
      if (activeKey === newActiveKey) {
        return;
      }
      _this.setState({
        activeKey: newActiveKey
      });
      if (newActiveKey !== null) {
        _this.scrollTo({
          key: newActiveKey,
          offset: itemScrollOffset
        });
      }
      onActiveChange === null || onActiveChange === void 0 || onActiveChange(newActiveKey);
    });
    _defineProperty(_assertThisInitialized(_this), "getActiveItem", function() {
      var _this$state11 = _this.state, activeKey = _this$state11.activeKey, flattenNodes = _this$state11.flattenNodes;
      if (activeKey === null) {
        return null;
      }
      return flattenNodes.find(function(_ref2) {
        var key = _ref2.key;
        return key === activeKey;
      }) || null;
    });
    _defineProperty(_assertThisInitialized(_this), "offsetActiveKey", function(offset2) {
      var _this$state12 = _this.state, flattenNodes = _this$state12.flattenNodes, activeKey = _this$state12.activeKey;
      var index = flattenNodes.findIndex(function(_ref3) {
        var key = _ref3.key;
        return key === activeKey;
      });
      if (index === -1 && offset2 < 0) {
        index = flattenNodes.length;
      }
      index = (index + offset2 + flattenNodes.length) % flattenNodes.length;
      var item = flattenNodes[index];
      if (item) {
        var _key4 = item.key;
        _this.onActiveChange(_key4);
      } else {
        _this.onActiveChange(null);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function(event) {
      var _this$state13 = _this.state, activeKey = _this$state13.activeKey, expandedKeys = _this$state13.expandedKeys, checkedKeys = _this$state13.checkedKeys, fieldNames = _this$state13.fieldNames;
      var _this$props10 = _this.props, onKeyDown2 = _this$props10.onKeyDown, checkable = _this$props10.checkable, selectable = _this$props10.selectable;
      switch (event.which) {
        case KeyCode.UP: {
          _this.offsetActiveKey(-1);
          event.preventDefault();
          break;
        }
        case KeyCode.DOWN: {
          _this.offsetActiveKey(1);
          event.preventDefault();
          break;
        }
      }
      var activeItem = _this.getActiveItem();
      if (activeItem && activeItem.data) {
        var treeNodeRequiredProps = _this.getTreeNodeRequiredProps();
        var expandable = activeItem.data.isLeaf === false || !!(activeItem.data[fieldNames.children] || []).length;
        var eventNode = convertNodePropsToEventData(_objectSpread2(_objectSpread2({}, getTreeNodeProps(activeKey, treeNodeRequiredProps)), {}, {
          data: activeItem.data,
          active: true
        }));
        switch (event.which) {
          case KeyCode.LEFT: {
            if (expandable && expandedKeys.includes(activeKey)) {
              _this.onNodeExpand({}, eventNode);
            } else if (activeItem.parent) {
              _this.onActiveChange(activeItem.parent.key);
            }
            event.preventDefault();
            break;
          }
          case KeyCode.RIGHT: {
            if (expandable && !expandedKeys.includes(activeKey)) {
              _this.onNodeExpand({}, eventNode);
            } else if (activeItem.children && activeItem.children.length) {
              _this.onActiveChange(activeItem.children[0].key);
            }
            event.preventDefault();
            break;
          }
          case KeyCode.ENTER:
          case KeyCode.SPACE: {
            if (checkable && !eventNode.disabled && eventNode.checkable !== false && !eventNode.disableCheckbox) {
              _this.onNodeCheck({}, eventNode, !checkedKeys.includes(activeKey));
            } else if (!checkable && selectable && !eventNode.disabled && eventNode.selectable !== false) {
              _this.onNodeSelect({}, eventNode);
            }
            break;
          }
        }
      }
      onKeyDown2 === null || onKeyDown2 === void 0 || onKeyDown2(event);
    });
    _defineProperty(_assertThisInitialized(_this), "setUncontrolledState", function(state) {
      var atomic = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var forceState = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!_this.destroyed) {
        var needSync = false;
        var allPassed = true;
        var newState = {};
        Object.keys(state).forEach(function(name) {
          if (_this.props.hasOwnProperty(name)) {
            allPassed = false;
            return;
          }
          needSync = true;
          newState[name] = state[name];
        });
        if (needSync && (!atomic || allPassed)) {
          _this.setState(_objectSpread2(_objectSpread2({}, newState), forceState));
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "scrollTo", function(scroll) {
      _this.listRef.current.scrollTo(scroll);
    });
    return _this;
  }
  _createClass(Tree2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.destroyed = false;
      this.onUpdated();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.onUpdated();
    }
  }, {
    key: "onUpdated",
    value: function onUpdated() {
      var _this$props11 = this.props, activeKey = _this$props11.activeKey, _this$props11$itemScr = _this$props11.itemScrollOffset, itemScrollOffset = _this$props11$itemScr === void 0 ? 0 : _this$props11$itemScr;
      if (activeKey !== void 0 && activeKey !== this.state.activeKey) {
        this.setState({
          activeKey
        });
        if (activeKey !== null) {
          this.scrollTo({
            key: activeKey,
            offset: itemScrollOffset
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("dragend", this.onWindowDragEnd);
      this.destroyed = true;
    }
  }, {
    key: "resetDragState",
    value: function resetDragState() {
      this.setState({
        dragOverNodeKey: null,
        dropPosition: null,
        dropLevelOffset: null,
        dropTargetKey: null,
        dropContainerKey: null,
        dropTargetPos: null,
        dropAllowed: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state14 = this.state, focused = _this$state14.focused, flattenNodes = _this$state14.flattenNodes, keyEntities = _this$state14.keyEntities, draggingNodeKey = _this$state14.draggingNodeKey, activeKey = _this$state14.activeKey, dropLevelOffset = _this$state14.dropLevelOffset, dropContainerKey = _this$state14.dropContainerKey, dropTargetKey = _this$state14.dropTargetKey, dropPosition = _this$state14.dropPosition, dragOverNodeKey = _this$state14.dragOverNodeKey, indent = _this$state14.indent;
      var _this$props12 = this.props, prefixCls = _this$props12.prefixCls, className = _this$props12.className, style = _this$props12.style, showLine = _this$props12.showLine, focusable = _this$props12.focusable, _this$props12$tabInde = _this$props12.tabIndex, tabIndex = _this$props12$tabInde === void 0 ? 0 : _this$props12$tabInde, selectable = _this$props12.selectable, showIcon = _this$props12.showIcon, icon = _this$props12.icon, switcherIcon = _this$props12.switcherIcon, draggable = _this$props12.draggable, checkable = _this$props12.checkable, checkStrictly = _this$props12.checkStrictly, disabled = _this$props12.disabled, motion = _this$props12.motion, loadData = _this$props12.loadData, filterTreeNode = _this$props12.filterTreeNode, height = _this$props12.height, itemHeight = _this$props12.itemHeight, scrollWidth = _this$props12.scrollWidth, virtual = _this$props12.virtual, titleRender = _this$props12.titleRender, dropIndicatorRender2 = _this$props12.dropIndicatorRender, onContextMenu = _this$props12.onContextMenu, onScroll = _this$props12.onScroll, direction = _this$props12.direction, rootClassName = _this$props12.rootClassName, rootStyle = _this$props12.rootStyle;
      var domProps = pickAttrs(this.props, {
        aria: true,
        data: true
      });
      var draggableConfig;
      if (draggable) {
        if (_typeof(draggable) === "object") {
          draggableConfig = draggable;
        } else if (typeof draggable === "function") {
          draggableConfig = {
            nodeDraggable: draggable
          };
        } else {
          draggableConfig = {};
        }
      }
      var contextValue = {
        prefixCls,
        selectable,
        showIcon,
        icon,
        switcherIcon,
        draggable: draggableConfig,
        draggingNodeKey,
        checkable,
        checkStrictly,
        disabled,
        keyEntities,
        dropLevelOffset,
        dropContainerKey,
        dropTargetKey,
        dropPosition,
        dragOverNodeKey,
        indent,
        direction,
        dropIndicatorRender: dropIndicatorRender2,
        loadData,
        filterTreeNode,
        titleRender,
        onNodeClick: this.onNodeClick,
        onNodeDoubleClick: this.onNodeDoubleClick,
        onNodeExpand: this.onNodeExpand,
        onNodeSelect: this.onNodeSelect,
        onNodeCheck: this.onNodeCheck,
        onNodeLoad: this.onNodeLoad,
        onNodeMouseEnter: this.onNodeMouseEnter,
        onNodeMouseLeave: this.onNodeMouseLeave,
        onNodeContextMenu: this.onNodeContextMenu,
        onNodeDragStart: this.onNodeDragStart,
        onNodeDragEnter: this.onNodeDragEnter,
        onNodeDragOver: this.onNodeDragOver,
        onNodeDragLeave: this.onNodeDragLeave,
        onNodeDragEnd: this.onNodeDragEnd,
        onNodeDrop: this.onNodeDrop
      };
      return /* @__PURE__ */ reactExports.createElement(TreeContext.Provider, {
        value: contextValue
      }, /* @__PURE__ */ reactExports.createElement("div", {
        className: classNames(prefixCls, className, rootClassName, _defineProperty(_defineProperty(_defineProperty({}, "".concat(prefixCls, "-show-line"), showLine), "".concat(prefixCls, "-focused"), focused), "".concat(prefixCls, "-active-focused"), activeKey !== null)),
        style: rootStyle
      }, /* @__PURE__ */ reactExports.createElement(NodeList, _extends({
        ref: this.listRef,
        prefixCls,
        style,
        data: flattenNodes,
        disabled,
        selectable,
        checkable: !!checkable,
        motion,
        dragging: draggingNodeKey !== null,
        height,
        itemHeight,
        virtual,
        focusable,
        focused,
        tabIndex,
        activeItem: this.getActiveItem(),
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown,
        onActiveChange: this.onActiveChange,
        onListChangeStart: this.onListChangeStart,
        onListChangeEnd: this.onListChangeEnd,
        onContextMenu,
        onScroll,
        scrollWidth
      }, this.getTreeNodeRequiredProps(), domProps))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, prevState) {
      var prevProps = prevState.prevProps;
      var newState = {
        prevProps: props
      };
      function needSync(name) {
        return !prevProps && props.hasOwnProperty(name) || prevProps && prevProps[name] !== props[name];
      }
      var treeData;
      var fieldNames = prevState.fieldNames;
      if (needSync("fieldNames")) {
        fieldNames = fillFieldNames(props.fieldNames);
        newState.fieldNames = fieldNames;
      }
      if (needSync("treeData")) {
        treeData = props.treeData;
      } else if (needSync("children")) {
        warningOnce(false, "`children` of Tree is deprecated. Please use `treeData` instead.");
        treeData = convertTreeToData(props.children);
      }
      if (treeData) {
        newState.treeData = treeData;
        var entitiesMap = convertDataToEntities(treeData, {
          fieldNames
        });
        newState.keyEntities = _objectSpread2(_defineProperty({}, MOTION_KEY, MotionEntity), entitiesMap.keyEntities);
      }
      var keyEntities = newState.keyEntities || prevState.keyEntities;
      if (needSync("expandedKeys") || prevProps && needSync("autoExpandParent")) {
        newState.expandedKeys = props.autoExpandParent || !prevProps && props.defaultExpandParent ? conductExpandParent(props.expandedKeys, keyEntities) : props.expandedKeys;
      } else if (!prevProps && props.defaultExpandAll) {
        var cloneKeyEntities = _objectSpread2({}, keyEntities);
        delete cloneKeyEntities[MOTION_KEY];
        var nextExpandedKeys = [];
        Object.keys(cloneKeyEntities).forEach(function(key) {
          var entity = cloneKeyEntities[key];
          if (entity.children && entity.children.length) {
            nextExpandedKeys.push(entity.key);
          }
        });
        newState.expandedKeys = nextExpandedKeys;
      } else if (!prevProps && props.defaultExpandedKeys) {
        newState.expandedKeys = props.autoExpandParent || props.defaultExpandParent ? conductExpandParent(props.defaultExpandedKeys, keyEntities) : props.defaultExpandedKeys;
      }
      if (!newState.expandedKeys) {
        delete newState.expandedKeys;
      }
      if (treeData || newState.expandedKeys) {
        var flattenNodes = flattenTreeData(treeData || prevState.treeData, newState.expandedKeys || prevState.expandedKeys, fieldNames);
        newState.flattenNodes = flattenNodes;
      }
      if (props.selectable) {
        if (needSync("selectedKeys")) {
          newState.selectedKeys = calcSelectedKeys(props.selectedKeys, props);
        } else if (!prevProps && props.defaultSelectedKeys) {
          newState.selectedKeys = calcSelectedKeys(props.defaultSelectedKeys, props);
        }
      }
      if (props.checkable) {
        var checkedKeyEntity;
        if (needSync("checkedKeys")) {
          checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {};
        } else if (!prevProps && props.defaultCheckedKeys) {
          checkedKeyEntity = parseCheckedKeys(props.defaultCheckedKeys) || {};
        } else if (treeData) {
          checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {
            checkedKeys: prevState.checkedKeys,
            halfCheckedKeys: prevState.halfCheckedKeys
          };
        }
        if (checkedKeyEntity) {
          var _checkedKeyEntity = checkedKeyEntity, _checkedKeyEntity$che = _checkedKeyEntity.checkedKeys, checkedKeys = _checkedKeyEntity$che === void 0 ? [] : _checkedKeyEntity$che, _checkedKeyEntity$hal = _checkedKeyEntity.halfCheckedKeys, halfCheckedKeys = _checkedKeyEntity$hal === void 0 ? [] : _checkedKeyEntity$hal;
          if (!props.checkStrictly) {
            var conductKeys = conductCheck(checkedKeys, true, keyEntities);
            checkedKeys = conductKeys.checkedKeys;
            halfCheckedKeys = conductKeys.halfCheckedKeys;
          }
          newState.checkedKeys = checkedKeys;
          newState.halfCheckedKeys = halfCheckedKeys;
        }
      }
      if (needSync("loadedKeys")) {
        newState.loadedKeys = props.loadedKeys;
      }
      return newState;
    }
  }]);
  return Tree2;
}(reactExports.Component);
_defineProperty(Tree$2, "defaultProps", {
  prefixCls: "rc-tree",
  showLine: false,
  showIcon: true,
  selectable: true,
  multiple: false,
  checkable: false,
  disabled: false,
  checkStrictly: false,
  draggable: false,
  defaultExpandParent: true,
  autoExpandParent: false,
  defaultExpandAll: false,
  defaultExpandedKeys: [],
  defaultCheckedKeys: [],
  defaultSelectedKeys: [],
  dropIndicatorRender: DropIndicator,
  allowDrop: function allowDrop() {
    return true;
  },
  expandAction: false
});
_defineProperty(Tree$2, "TreeNode", TreeNode);
var FileOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" } }] }, "name": "file", "theme": "outlined" };
var FileOutlined = function FileOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: FileOutlined$1
  }));
};
var RefIcon$8 = /* @__PURE__ */ reactExports.forwardRef(FileOutlined);
var FolderOpenOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2a8.15 8.15 0 00-5.5-2.2H96c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h698c13 0 24.8-7.9 29.7-20l134-332c1.5-3.8 2.3-7.9 2.3-12 0-17.7-14.3-32-32-32zM136 256h188.5l119.6 114.4H748V444H238c-13 0-24.8 7.9-29.7 20L136 643.2V256zm635.3 512H159l103.3-256h612.4L771.3 768z" } }] }, "name": "folder-open", "theme": "outlined" };
var FolderOpenOutlined = function FolderOpenOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: FolderOpenOutlined$1
  }));
};
var RefIcon$7 = /* @__PURE__ */ reactExports.forwardRef(FolderOpenOutlined);
var FolderOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M880 298.4H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z" } }] }, "name": "folder", "theme": "outlined" };
var FolderOutlined = function FolderOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: FolderOutlined$1
  }));
};
var RefIcon$6 = /* @__PURE__ */ reactExports.forwardRef(FolderOutlined);
var HolderOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M300 276.5a56 56 0 1056-97 56 56 0 00-56 97zm0 284a56 56 0 1056-97 56 56 0 00-56 97zM640 228a56 56 0 10112 0 56 56 0 00-112 0zm0 284a56 56 0 10112 0 56 56 0 00-112 0zM300 844.5a56 56 0 1056-97 56 56 0 00-56 97zM640 796a56 56 0 10112 0 56 56 0 00-112 0z" } }] }, "name": "holder", "theme": "outlined" };
var HolderOutlined = function HolderOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: HolderOutlined$1
  }));
};
var RefIcon$5 = /* @__PURE__ */ reactExports.forwardRef(HolderOutlined);
const genDirectoryStyle = ({
  treeCls,
  treeNodeCls,
  directoryNodeSelectedBg,
  directoryNodeSelectedColor,
  motionDurationMid,
  borderRadius,
  controlItemBgHover
}) => ({
  [`${treeCls}${treeCls}-directory ${treeNodeCls}`]: {
    // >>> Title
    [`${treeCls}-node-content-wrapper`]: {
      position: "static",
      [`&:has(${treeCls}-drop-indicator)`]: {
        position: "relative"
      },
      [`> *:not(${treeCls}-drop-indicator)`]: {
        position: "relative"
      },
      "&:hover": {
        background: "transparent"
      },
      // Expand interactive area to whole line
      "&:before": {
        position: "absolute",
        inset: 0,
        transition: `background-color ${motionDurationMid}`,
        content: '""',
        borderRadius
      },
      "&:hover:before": {
        background: controlItemBgHover
      }
    },
    [`${treeCls}-switcher, ${treeCls}-checkbox, ${treeCls}-draggable-icon`]: {
      zIndex: 1
    },
    // ============= Selected =============
    "&-selected": {
      background: directoryNodeSelectedBg,
      borderRadius,
      [`${treeCls}-switcher, ${treeCls}-draggable-icon`]: {
        color: directoryNodeSelectedColor
      },
      // >>> Title
      [`${treeCls}-node-content-wrapper`]: {
        color: directoryNodeSelectedColor,
        background: "transparent",
        "&, &:hover": {
          color: directoryNodeSelectedColor
        },
        "&:before, &:hover:before": {
          background: directoryNodeSelectedBg
        }
      }
    }
  }
});
const treeNodeFX = new Keyframe("ant-tree-node-fx-do-not-use", {
  "0%": {
    opacity: 0
  },
  "100%": {
    opacity: 1
  }
});
const getSwitchStyle = (prefixCls, token) => ({
  [`.${prefixCls}-switcher-icon`]: {
    display: "inline-block",
    fontSize: 10,
    verticalAlign: "baseline",
    svg: {
      transition: `transform ${token.motionDurationSlow}`
    }
  }
});
const getDropIndicatorStyle = (prefixCls, token) => ({
  [`.${prefixCls}-drop-indicator`]: {
    position: "absolute",
    // it should displayed over the following node
    zIndex: 1,
    height: 2,
    backgroundColor: token.colorPrimary,
    borderRadius: 1,
    pointerEvents: "none",
    "&:after": {
      position: "absolute",
      top: -3,
      insetInlineStart: -6,
      width: 8,
      height: 8,
      backgroundColor: "transparent",
      border: `${unit(token.lineWidthBold)} solid ${token.colorPrimary}`,
      borderRadius: "50%",
      content: '""'
    }
  }
});
const genBaseStyle = (prefixCls, token) => {
  const {
    treeCls,
    treeNodeCls,
    treeNodePadding,
    titleHeight,
    indentSize,
    nodeSelectedBg,
    nodeHoverBg,
    colorTextQuaternary,
    controlItemBgActiveDisabled
  } = token;
  return {
    [treeCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      // fix https://github.com/ant-design/ant-design/issues/50316
      ["--rc-virtual-list-scrollbar-bg"]: token.colorSplit,
      background: token.colorBgContainer,
      borderRadius: token.borderRadius,
      transition: `background-color ${token.motionDurationSlow}`,
      "&-rtl": {
        direction: "rtl"
      },
      [`&${treeCls}-rtl ${treeCls}-switcher_close ${treeCls}-switcher-icon svg`]: {
        transform: "rotate(90deg)"
      },
      [`&-focused:not(:hover):not(${treeCls}-active-focused)`]: genFocusOutline(token),
      // =================== Virtual List ===================
      [`${treeCls}-list-holder-inner`]: {
        alignItems: "flex-start"
      },
      [`&${treeCls}-block-node`]: {
        [`${treeCls}-list-holder-inner`]: {
          alignItems: "stretch",
          // >>> Title
          [`${treeCls}-node-content-wrapper`]: {
            flex: "auto"
          },
          // >>> Drag
          [`${treeNodeCls}.dragging:after`]: {
            position: "absolute",
            inset: 0,
            border: `1px solid ${token.colorPrimary}`,
            opacity: 0,
            animationName: treeNodeFX,
            animationDuration: token.motionDurationSlow,
            animationPlayState: "running",
            animationFillMode: "forwards",
            content: '""',
            pointerEvents: "none",
            borderRadius: token.borderRadius
          }
        }
      },
      // ===================== TreeNode =====================
      [treeNodeCls]: {
        display: "flex",
        alignItems: "flex-start",
        marginBottom: treeNodePadding,
        lineHeight: unit(titleHeight),
        position: "relative",
        // 非常重要，避免 drop-indicator 在拖拽过程中闪烁
        "&:before": {
          content: '""',
          position: "absolute",
          zIndex: 1,
          insetInlineStart: 0,
          width: "100%",
          top: "100%",
          height: treeNodePadding
        },
        // Disabled
        [`&-disabled ${treeCls}-node-content-wrapper`]: {
          color: token.colorTextDisabled,
          cursor: "not-allowed",
          "&:hover": {
            background: "transparent"
          }
        },
        [`${treeCls}-checkbox-disabled + ${treeCls}-node-selected,&${treeNodeCls}-disabled${treeNodeCls}-selected ${treeCls}-node-content-wrapper`]: {
          backgroundColor: controlItemBgActiveDisabled
        },
        // we can not set pointer-events to none for checkbox in tree
        // ref: https://github.com/ant-design/ant-design/issues/39822#issuecomment-2605234058
        [`${treeCls}-checkbox-disabled`]: {
          pointerEvents: "unset"
        },
        // not disable
        [`&:not(${treeNodeCls}-disabled)`]: {
          // >>> Title
          [`${treeCls}-node-content-wrapper`]: {
            "&:hover": {
              color: token.nodeHoverColor
            }
          }
        },
        [`&-active ${treeCls}-node-content-wrapper`]: {
          background: token.controlItemBgHover
        },
        [`&:not(${treeNodeCls}-disabled).filter-node ${treeCls}-title`]: {
          color: token.colorPrimary,
          fontWeight: token.fontWeightStrong
        },
        "&-draggable": {
          cursor: "grab",
          [`${treeCls}-draggable-icon`]: {
            // https://github.com/ant-design/ant-design/issues/41915
            flexShrink: 0,
            width: titleHeight,
            textAlign: "center",
            visibility: "visible",
            color: colorTextQuaternary
          },
          [`&${treeNodeCls}-disabled ${treeCls}-draggable-icon`]: {
            visibility: "hidden"
          }
        }
      },
      // >>> Indent
      [`${treeCls}-indent`]: {
        alignSelf: "stretch",
        whiteSpace: "nowrap",
        userSelect: "none",
        "&-unit": {
          display: "inline-block",
          width: indentSize
        }
      },
      // >>> Drag Handler
      [`${treeCls}-draggable-icon`]: {
        visibility: "hidden"
      },
      // Switcher / Checkbox
      [`${treeCls}-switcher, ${treeCls}-checkbox`]: {
        marginInlineEnd: token.calc(token.calc(titleHeight).sub(token.controlInteractiveSize)).div(2).equal()
      },
      // >>> Switcher
      [`${treeCls}-switcher`]: Object.assign(Object.assign({}, getSwitchStyle(prefixCls, token)), {
        position: "relative",
        flex: "none",
        alignSelf: "stretch",
        width: titleHeight,
        textAlign: "center",
        cursor: "pointer",
        userSelect: "none",
        transition: `all ${token.motionDurationSlow}`,
        "&-noop": {
          cursor: "unset"
        },
        "&:before": {
          pointerEvents: "none",
          content: '""',
          width: titleHeight,
          height: titleHeight,
          position: "absolute",
          left: {
            _skip_check_: true,
            value: 0
          },
          top: 0,
          borderRadius: token.borderRadius,
          transition: `all ${token.motionDurationSlow}`
        },
        [`&:not(${treeCls}-switcher-noop):hover:before`]: {
          backgroundColor: token.colorBgTextHover
        },
        [`&_close ${treeCls}-switcher-icon svg`]: {
          transform: "rotate(-90deg)"
        },
        "&-loading-icon": {
          color: token.colorPrimary
        },
        "&-leaf-line": {
          position: "relative",
          zIndex: 1,
          display: "inline-block",
          width: "100%",
          height: "100%",
          // https://github.com/ant-design/ant-design/issues/31884
          "&:before": {
            position: "absolute",
            top: 0,
            insetInlineEnd: token.calc(titleHeight).div(2).equal(),
            bottom: token.calc(treeNodePadding).mul(-1).equal(),
            marginInlineStart: -1,
            borderInlineEnd: `1px solid ${token.colorBorder}`,
            content: '""'
          },
          "&:after": {
            position: "absolute",
            width: token.calc(token.calc(titleHeight).div(2).equal()).mul(0.8).equal(),
            height: token.calc(titleHeight).div(2).equal(),
            borderBottom: `1px solid ${token.colorBorder}`,
            content: '""'
          }
        }
      }),
      // >>> Title
      // add `${treeCls}-checkbox + span` to cover checkbox `${checkboxCls} + span`
      [`${treeCls}-node-content-wrapper`]: Object.assign(Object.assign({
        position: "relative",
        minHeight: titleHeight,
        paddingBlock: 0,
        paddingInline: token.paddingXS,
        background: "transparent",
        borderRadius: token.borderRadius,
        cursor: "pointer",
        transition: `all ${token.motionDurationMid}, border 0s, line-height 0s, box-shadow 0s`
      }, getDropIndicatorStyle(prefixCls, token)), {
        "&:hover": {
          backgroundColor: nodeHoverBg
        },
        [`&${treeCls}-node-selected`]: {
          color: token.nodeSelectedColor,
          backgroundColor: nodeSelectedBg
        },
        // Icon
        [`${treeCls}-iconEle`]: {
          display: "inline-block",
          width: titleHeight,
          height: titleHeight,
          textAlign: "center",
          verticalAlign: "top",
          "&:empty": {
            display: "none"
          }
        }
      }),
      // https://github.com/ant-design/ant-design/issues/28217
      [`${treeCls}-unselectable ${treeCls}-node-content-wrapper:hover`]: {
        backgroundColor: "transparent"
      },
      [`${treeNodeCls}.drop-container > [draggable]`]: {
        boxShadow: `0 0 0 2px ${token.colorPrimary}`
      },
      // ==================== Show Line =====================
      "&-show-line": {
        // ================ Indent lines ================
        [`${treeCls}-indent-unit`]: {
          position: "relative",
          height: "100%",
          "&:before": {
            position: "absolute",
            top: 0,
            insetInlineEnd: token.calc(titleHeight).div(2).equal(),
            bottom: token.calc(treeNodePadding).mul(-1).equal(),
            borderInlineEnd: `1px solid ${token.colorBorder}`,
            content: '""'
          },
          "&-end:before": {
            display: "none"
          }
        },
        // ============== Cover Background ==============
        [`${treeCls}-switcher`]: {
          background: "transparent",
          "&-line-icon": {
            // https://github.com/ant-design/ant-design/issues/32813
            verticalAlign: "-0.15em"
          }
        }
      },
      [`${treeNodeCls}-leaf-last ${treeCls}-switcher-leaf-line:before`]: {
        top: "auto !important",
        bottom: "auto !important",
        height: `${unit(token.calc(titleHeight).div(2).equal())} !important`
      }
    })
  };
};
const genTreeStyle = (prefixCls, token, enableDirectory = true) => {
  const treeCls = `.${prefixCls}`;
  const treeNodeCls = `${treeCls}-treenode`;
  const treeNodePadding = token.calc(token.paddingXS).div(2).equal();
  const treeToken = merge(token, {
    treeCls,
    treeNodeCls,
    treeNodePadding
  });
  return [
    // Basic
    genBaseStyle(prefixCls, treeToken),
    // Directory
    enableDirectory && genDirectoryStyle(treeToken)
  ].filter(Boolean);
};
const initComponentToken = (token) => {
  const {
    controlHeightSM,
    controlItemBgHover,
    controlItemBgActive
  } = token;
  const titleHeight = controlHeightSM;
  return {
    titleHeight,
    indentSize: titleHeight,
    nodeHoverBg: controlItemBgHover,
    nodeHoverColor: token.colorText,
    nodeSelectedBg: controlItemBgActive,
    nodeSelectedColor: token.colorText
  };
};
const prepareComponentToken$1 = (token) => {
  const {
    colorTextLightSolid,
    colorPrimary
  } = token;
  return Object.assign(Object.assign({}, initComponentToken(token)), {
    directoryNodeSelectedColor: colorTextLightSolid,
    directoryNodeSelectedBg: colorPrimary
  });
};
const useStyle$1 = genStyleHooks("Tree", (token, {
  prefixCls
}) => [{
  [token.componentCls]: getStyle(`${prefixCls}-checkbox`, token)
}, genTreeStyle(prefixCls, token), genCollapseMotion(token)], prepareComponentToken$1);
const offset = 4;
function dropIndicatorRender(props) {
  const {
    dropPosition,
    dropLevelOffset,
    prefixCls,
    indent,
    direction = "ltr"
  } = props;
  const startPosition = direction === "ltr" ? "left" : "right";
  const endPosition = direction === "ltr" ? "right" : "left";
  const style = {
    [startPosition]: -dropLevelOffset * indent + offset,
    [endPosition]: 0
  };
  switch (dropPosition) {
    case -1:
      style.top = -3;
      break;
    case 1:
      style.bottom = -3;
      break;
    default:
      style.bottom = -3;
      style[startPosition] = indent + offset;
      break;
  }
  return /* @__PURE__ */ React.createElement("div", {
    style,
    className: `${prefixCls}-drop-indicator`
  });
}
var CaretDownFilled$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" } }] }, "name": "caret-down", "theme": "filled" };
var CaretDownFilled = function CaretDownFilled2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: CaretDownFilled$1
  }));
};
var RefIcon$4 = /* @__PURE__ */ reactExports.forwardRef(CaretDownFilled);
var MinusSquareOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M328 544h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" } }, { "tag": "path", "attrs": { "d": "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" } }] }, "name": "minus-square", "theme": "outlined" };
var MinusSquareOutlined = function MinusSquareOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: MinusSquareOutlined$1
  }));
};
var RefIcon$3 = /* @__PURE__ */ reactExports.forwardRef(MinusSquareOutlined);
var PlusSquareOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" } }, { "tag": "path", "attrs": { "d": "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" } }] }, "name": "plus-square", "theme": "outlined" };
var PlusSquareOutlined = function PlusSquareOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: PlusSquareOutlined$1
  }));
};
var RefIcon$2 = /* @__PURE__ */ reactExports.forwardRef(PlusSquareOutlined);
const SwitcherIconCom = (props) => {
  var _a, _b;
  const {
    prefixCls,
    switcherIcon,
    treeNodeProps,
    showLine,
    switcherLoadingIcon
  } = props;
  const {
    isLeaf,
    expanded,
    loading
  } = treeNodeProps;
  if (loading) {
    if (/* @__PURE__ */ reactExports.isValidElement(switcherLoadingIcon)) {
      return switcherLoadingIcon;
    }
    return /* @__PURE__ */ reactExports.createElement(RefIcon$g, {
      className: `${prefixCls}-switcher-loading-icon`
    });
  }
  let showLeafIcon;
  if (showLine && typeof showLine === "object") {
    showLeafIcon = showLine.showLeafIcon;
  }
  if (isLeaf) {
    if (!showLine) {
      return null;
    }
    if (typeof showLeafIcon !== "boolean" && !!showLeafIcon) {
      const leafIcon = typeof showLeafIcon === "function" ? showLeafIcon(treeNodeProps) : showLeafIcon;
      const leafCls = `${prefixCls}-switcher-line-custom-icon`;
      if (/* @__PURE__ */ reactExports.isValidElement(leafIcon)) {
        return cloneElement(leafIcon, {
          className: classNames((_a = leafIcon.props) === null || _a === void 0 ? void 0 : _a.className, leafCls)
        });
      }
      return leafIcon;
    }
    return showLeafIcon ? /* @__PURE__ */ reactExports.createElement(RefIcon$8, {
      className: `${prefixCls}-switcher-line-icon`
    }) : /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-switcher-leaf-line`
    });
  }
  const switcherCls = `${prefixCls}-switcher-icon`;
  const switcher = typeof switcherIcon === "function" ? switcherIcon(treeNodeProps) : switcherIcon;
  if (/* @__PURE__ */ reactExports.isValidElement(switcher)) {
    return cloneElement(switcher, {
      className: classNames((_b = switcher.props) === null || _b === void 0 ? void 0 : _b.className, switcherCls)
    });
  }
  if (switcher !== void 0) {
    return switcher;
  }
  if (showLine) {
    return expanded ? /* @__PURE__ */ reactExports.createElement(RefIcon$3, {
      className: `${prefixCls}-switcher-line-icon`
    }) : /* @__PURE__ */ reactExports.createElement(RefIcon$2, {
      className: `${prefixCls}-switcher-line-icon`
    });
  }
  return /* @__PURE__ */ reactExports.createElement(RefIcon$4, {
    className: switcherCls
  });
};
const Tree$1 = /* @__PURE__ */ React.forwardRef((props, ref) => {
  var _a;
  const {
    getPrefixCls,
    direction,
    virtual,
    tree
  } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    showIcon = false,
    showLine,
    switcherIcon,
    switcherLoadingIcon,
    blockNode = false,
    children,
    checkable = false,
    selectable = true,
    draggable,
    disabled,
    motion: customMotion,
    style
  } = props;
  const prefixCls = getPrefixCls("tree", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const contextDisabled = React.useContext(DisabledContext);
  const mergedDisabled = disabled !== null && disabled !== void 0 ? disabled : contextDisabled;
  const motion = customMotion !== null && customMotion !== void 0 ? customMotion : Object.assign(Object.assign({}, initCollapseMotion(rootPrefixCls)), {
    motionAppear: false
  });
  const newProps = Object.assign(Object.assign({}, props), {
    checkable,
    selectable,
    showIcon,
    motion,
    blockNode,
    disabled: mergedDisabled,
    showLine: Boolean(showLine),
    dropIndicatorRender
  });
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$1(prefixCls);
  const [, token] = useToken();
  const itemHeight = token.paddingXS / 2 + (((_a = token.Tree) === null || _a === void 0 ? void 0 : _a.titleHeight) || token.controlHeightSM);
  const draggableConfig = React.useMemo(() => {
    if (!draggable) {
      return false;
    }
    let mergedDraggable = {};
    switch (typeof draggable) {
      case "function":
        mergedDraggable.nodeDraggable = draggable;
        break;
      case "object":
        mergedDraggable = Object.assign({}, draggable);
        break;
    }
    if (mergedDraggable.icon !== false) {
      mergedDraggable.icon = mergedDraggable.icon || /* @__PURE__ */ React.createElement(RefIcon$5, null);
    }
    return mergedDraggable;
  }, [draggable]);
  const renderSwitcherIcon = (nodeProps) => /* @__PURE__ */ React.createElement(SwitcherIconCom, {
    prefixCls,
    switcherIcon,
    switcherLoadingIcon,
    treeNodeProps: nodeProps,
    showLine
  });
  return wrapCSSVar(
    // @ts-ignore
    /* @__PURE__ */ React.createElement(Tree$2, Object.assign({
      itemHeight,
      ref,
      virtual
    }, newProps, {
      // newProps may contain style so declare style below it
      style: Object.assign(Object.assign({}, tree === null || tree === void 0 ? void 0 : tree.style), style),
      prefixCls,
      className: classNames({
        [`${prefixCls}-icon-hide`]: !showIcon,
        [`${prefixCls}-block-node`]: blockNode,
        [`${prefixCls}-unselectable`]: !selectable,
        [`${prefixCls}-rtl`]: direction === "rtl",
        [`${prefixCls}-disabled`]: mergedDisabled
      }, tree === null || tree === void 0 ? void 0 : tree.className, className, hashId, cssVarCls),
      direction,
      checkable: checkable ? /* @__PURE__ */ React.createElement("span", {
        className: `${prefixCls}-checkbox-inner`
      }) : checkable,
      selectable,
      switcherIcon: renderSwitcherIcon,
      draggable: draggableConfig
    }), children)
  );
});
const RECORD_NONE = 0;
const RECORD_START = 1;
const RECORD_END = 2;
function traverseNodesKey(treeData, callback, fieldNames) {
  const {
    key: fieldKey,
    children: fieldChildren
  } = fieldNames;
  function processNode(dataNode) {
    const key = dataNode[fieldKey];
    const children = dataNode[fieldChildren];
    if (callback(key, dataNode) !== false) {
      traverseNodesKey(children || [], callback, fieldNames);
    }
  }
  treeData.forEach(processNode);
}
function calcRangeKeys({
  treeData,
  expandedKeys,
  startKey,
  endKey,
  fieldNames
}) {
  const keys = [];
  let record = RECORD_NONE;
  if (startKey && startKey === endKey) {
    return [startKey];
  }
  if (!startKey || !endKey) {
    return [];
  }
  function matchKey(key) {
    return key === startKey || key === endKey;
  }
  traverseNodesKey(treeData, (key) => {
    if (record === RECORD_END) {
      return false;
    }
    if (matchKey(key)) {
      keys.push(key);
      if (record === RECORD_NONE) {
        record = RECORD_START;
      } else if (record === RECORD_START) {
        record = RECORD_END;
        return false;
      }
    } else if (record === RECORD_START) {
      keys.push(key);
    }
    return expandedKeys.includes(key);
  }, fillFieldNames(fieldNames));
  return keys;
}
function convertDirectoryKeysToNodes(treeData, keys, fieldNames) {
  const restKeys = _toConsumableArray(keys);
  const nodes = [];
  traverseNodesKey(treeData, (key, node) => {
    const index = restKeys.indexOf(key);
    if (index !== -1) {
      nodes.push(node);
      restKeys.splice(index, 1);
    }
    return !!restKeys.length;
  }, fillFieldNames(fieldNames));
  return nodes;
}
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function getIcon(props) {
  const {
    isLeaf,
    expanded
  } = props;
  if (isLeaf) {
    return /* @__PURE__ */ reactExports.createElement(RefIcon$8, null);
  }
  return expanded ? /* @__PURE__ */ reactExports.createElement(RefIcon$7, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$6, null);
}
function getTreeData({
  treeData,
  children
}) {
  return treeData || convertTreeToData(children);
}
const DirectoryTree = (_a, ref) => {
  var {
    defaultExpandAll,
    defaultExpandParent,
    defaultExpandedKeys
  } = _a, props = __rest$1(_a, ["defaultExpandAll", "defaultExpandParent", "defaultExpandedKeys"]);
  const lastSelectedKey = reactExports.useRef(null);
  const cachedSelectedKeys = reactExports.useRef(null);
  const getInitExpandedKeys = () => {
    const {
      keyEntities
    } = convertDataToEntities(getTreeData(props), {
      fieldNames: props.fieldNames
    });
    let initExpandedKeys;
    if (defaultExpandAll) {
      initExpandedKeys = Object.keys(keyEntities);
    } else if (defaultExpandParent) {
      initExpandedKeys = conductExpandParent(props.expandedKeys || defaultExpandedKeys || [], keyEntities);
    } else {
      initExpandedKeys = props.expandedKeys || defaultExpandedKeys || [];
    }
    return initExpandedKeys;
  };
  const [selectedKeys, setSelectedKeys] = reactExports.useState(props.selectedKeys || props.defaultSelectedKeys || []);
  const [expandedKeys, setExpandedKeys] = reactExports.useState(() => getInitExpandedKeys());
  reactExports.useEffect(() => {
    if ("selectedKeys" in props) {
      setSelectedKeys(props.selectedKeys);
    }
  }, [props.selectedKeys]);
  reactExports.useEffect(() => {
    if ("expandedKeys" in props) {
      setExpandedKeys(props.expandedKeys);
    }
  }, [props.expandedKeys]);
  const onExpand = (keys, info) => {
    var _a2;
    if (!("expandedKeys" in props)) {
      setExpandedKeys(keys);
    }
    return (_a2 = props.onExpand) === null || _a2 === void 0 ? void 0 : _a2.call(props, keys, info);
  };
  const onSelect = (keys, event) => {
    var _a2;
    const {
      multiple,
      fieldNames
    } = props;
    const {
      node,
      nativeEvent
    } = event;
    const {
      key = ""
    } = node;
    const treeData = getTreeData(props);
    const newEvent = Object.assign(Object.assign({}, event), {
      selected: true
    });
    const ctrlPick = (nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.ctrlKey) || (nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.metaKey);
    const shiftPick = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.shiftKey;
    let newSelectedKeys;
    if (multiple && ctrlPick) {
      newSelectedKeys = keys;
      lastSelectedKey.current = key;
      cachedSelectedKeys.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
    } else if (multiple && shiftPick) {
      newSelectedKeys = Array.from(new Set([].concat(_toConsumableArray(cachedSelectedKeys.current || []), _toConsumableArray(calcRangeKeys({
        treeData,
        expandedKeys,
        startKey: key,
        endKey: lastSelectedKey.current,
        fieldNames
      })))));
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
    } else {
      newSelectedKeys = [key];
      lastSelectedKey.current = key;
      cachedSelectedKeys.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData, newSelectedKeys, fieldNames);
    }
    (_a2 = props.onSelect) === null || _a2 === void 0 ? void 0 : _a2.call(props, newSelectedKeys, newEvent);
    if (!("selectedKeys" in props)) {
      setSelectedKeys(newSelectedKeys);
    }
  };
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    showIcon = true,
    expandAction = "click"
  } = props, otherProps = __rest$1(props, ["prefixCls", "className", "showIcon", "expandAction"]);
  const prefixCls = getPrefixCls("tree", customizePrefixCls);
  const connectClassName = classNames(`${prefixCls}-directory`, {
    [`${prefixCls}-directory-rtl`]: direction === "rtl"
  }, className);
  return /* @__PURE__ */ reactExports.createElement(Tree$1, Object.assign({
    icon: getIcon,
    ref,
    blockNode: true
  }, otherProps, {
    showIcon,
    expandAction,
    prefixCls,
    className: connectClassName,
    expandedKeys,
    selectedKeys,
    onSelect,
    onExpand
  }));
};
const ForwardDirectoryTree = /* @__PURE__ */ reactExports.forwardRef(DirectoryTree);
const Tree = Tree$1;
Tree.DirectoryTree = ForwardDirectoryTree;
Tree.TreeNode = TreeNode;
const FilterSearch = (props) => {
  const {
    value,
    filterSearch,
    tablePrefixCls,
    locale: locale2,
    onChange
  } = props;
  if (!filterSearch) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: `${tablePrefixCls}-filter-dropdown-search`
  }, /* @__PURE__ */ reactExports.createElement(Input, {
    prefix: /* @__PURE__ */ reactExports.createElement(RefIcon$h, null),
    placeholder: locale2.filterSearchPlaceholder,
    onChange,
    value,
    // for skip min-width of input
    htmlSize: 1,
    className: `${tablePrefixCls}-filter-dropdown-search-input`
  }));
};
const onKeyDown = (event) => {
  const {
    keyCode
  } = event;
  if (keyCode === KeyCode.ENTER) {
    event.stopPropagation();
  }
};
const FilterDropdownMenuWrapper = /* @__PURE__ */ reactExports.forwardRef((props, ref) => /* @__PURE__ */ reactExports.createElement("div", {
  className: props.className,
  onClick: (e) => e.stopPropagation(),
  onKeyDown,
  ref
}, props.children));
function flattenKeys(filters) {
  let keys = [];
  (filters || []).forEach(({
    value,
    children
  }) => {
    keys.push(value);
    if (children) {
      keys = [].concat(_toConsumableArray(keys), _toConsumableArray(flattenKeys(children)));
    }
  });
  return keys;
}
function hasSubMenu(filters) {
  return filters.some(({
    children
  }) => children);
}
function searchValueMatched(searchValue, text) {
  if (typeof text === "string" || typeof text === "number") {
    return text === null || text === void 0 ? void 0 : text.toString().toLowerCase().includes(searchValue.trim().toLowerCase());
  }
  return false;
}
function renderFilterItems({
  filters,
  prefixCls,
  filteredKeys,
  filterMultiple,
  searchValue,
  filterSearch
}) {
  return filters.map((filter, index) => {
    const key = String(filter.value);
    if (filter.children) {
      return {
        key: key || index,
        label: filter.text,
        popupClassName: `${prefixCls}-dropdown-submenu`,
        children: renderFilterItems({
          filters: filter.children,
          prefixCls,
          filteredKeys,
          filterMultiple,
          searchValue,
          filterSearch
        })
      };
    }
    const Component = filterMultiple ? Checkbox : Radio;
    const item = {
      key: filter.value !== void 0 ? key : index,
      label: /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(Component, {
        checked: filteredKeys.includes(key)
      }), /* @__PURE__ */ reactExports.createElement("span", null, filter.text))
    };
    if (searchValue.trim()) {
      if (typeof filterSearch === "function") {
        return filterSearch(searchValue, filter) ? item : null;
      }
      return searchValueMatched(searchValue, filter.text) ? item : null;
    }
    return item;
  });
}
function wrapStringListType(keys) {
  return keys || [];
}
const FilterDropdown = (props) => {
  var _a, _b, _c, _d;
  const {
    tablePrefixCls,
    prefixCls,
    column,
    dropdownPrefixCls,
    columnKey,
    filterOnClose,
    filterMultiple,
    filterMode = "menu",
    filterSearch = false,
    filterState,
    triggerFilter,
    locale: locale2,
    children,
    getPopupContainer,
    rootClassName
  } = props;
  const {
    filterResetToDefaultFilteredValue,
    defaultFilteredValue,
    filterDropdownProps = {},
    // Deprecated
    filterDropdownOpen,
    filterDropdownVisible,
    onFilterDropdownVisibleChange,
    onFilterDropdownOpenChange
  } = column;
  const [visible, setVisible] = reactExports.useState(false);
  const filtered = !!(filterState && (((_a = filterState.filteredKeys) === null || _a === void 0 ? void 0 : _a.length) || filterState.forceFiltered));
  const triggerVisible = (newVisible) => {
    var _a2;
    setVisible(newVisible);
    (_a2 = filterDropdownProps.onOpenChange) === null || _a2 === void 0 ? void 0 : _a2.call(filterDropdownProps, newVisible);
    onFilterDropdownOpenChange === null || onFilterDropdownOpenChange === void 0 ? void 0 : onFilterDropdownOpenChange(newVisible);
    onFilterDropdownVisibleChange === null || onFilterDropdownVisibleChange === void 0 ? void 0 : onFilterDropdownVisibleChange(newVisible);
  };
  const mergedVisible = (_d = (_c = (_b = filterDropdownProps.open) !== null && _b !== void 0 ? _b : filterDropdownOpen) !== null && _c !== void 0 ? _c : filterDropdownVisible) !== null && _d !== void 0 ? _d : visible;
  const propFilteredKeys = filterState === null || filterState === void 0 ? void 0 : filterState.filteredKeys;
  const [getFilteredKeysSync, setFilteredKeysSync] = useSyncState(wrapStringListType(propFilteredKeys));
  const onSelectKeys = ({
    selectedKeys
  }) => {
    setFilteredKeysSync(selectedKeys);
  };
  const onCheck = (keys, {
    node,
    checked
  }) => {
    if (!filterMultiple) {
      onSelectKeys({
        selectedKeys: checked && node.key ? [node.key] : []
      });
    } else {
      onSelectKeys({
        selectedKeys: keys
      });
    }
  };
  reactExports.useEffect(() => {
    if (!visible) {
      return;
    }
    onSelectKeys({
      selectedKeys: wrapStringListType(propFilteredKeys)
    });
  }, [propFilteredKeys]);
  const [openKeys, setOpenKeys] = reactExports.useState([]);
  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };
  const [searchValue, setSearchValue] = reactExports.useState("");
  const onSearch = (e) => {
    const {
      value
    } = e.target;
    setSearchValue(value);
  };
  reactExports.useEffect(() => {
    if (!visible) {
      setSearchValue("");
    }
  }, [visible]);
  const internalTriggerFilter = (keys) => {
    const mergedKeys = (keys === null || keys === void 0 ? void 0 : keys.length) ? keys : null;
    if (mergedKeys === null && (!filterState || !filterState.filteredKeys)) {
      return null;
    }
    if (isEqual(mergedKeys, filterState === null || filterState === void 0 ? void 0 : filterState.filteredKeys, true)) {
      return null;
    }
    triggerFilter({
      column,
      key: columnKey,
      filteredKeys: mergedKeys
    });
  };
  const onConfirm = () => {
    triggerVisible(false);
    internalTriggerFilter(getFilteredKeysSync());
  };
  const onReset = ({
    confirm,
    closeDropdown
  } = {
    confirm: false,
    closeDropdown: false
  }) => {
    if (confirm) {
      internalTriggerFilter([]);
    }
    if (closeDropdown) {
      triggerVisible(false);
    }
    setSearchValue("");
    if (filterResetToDefaultFilteredValue) {
      setFilteredKeysSync((defaultFilteredValue || []).map((key) => String(key)));
    } else {
      setFilteredKeysSync([]);
    }
  };
  const doFilter = ({
    closeDropdown
  } = {
    closeDropdown: true
  }) => {
    if (closeDropdown) {
      triggerVisible(false);
    }
    internalTriggerFilter(getFilteredKeysSync());
  };
  const onVisibleChange = (newVisible, info) => {
    if (info.source === "trigger") {
      if (newVisible && propFilteredKeys !== void 0) {
        setFilteredKeysSync(wrapStringListType(propFilteredKeys));
      }
      triggerVisible(newVisible);
      if (!newVisible && !column.filterDropdown && filterOnClose) {
        onConfirm();
      }
    }
  };
  const dropdownMenuClass = classNames({
    [`${dropdownPrefixCls}-menu-without-submenu`]: !hasSubMenu(column.filters || [])
  });
  const onCheckAll = (e) => {
    if (e.target.checked) {
      const allFilterKeys = flattenKeys(column === null || column === void 0 ? void 0 : column.filters).map((key) => String(key));
      setFilteredKeysSync(allFilterKeys);
    } else {
      setFilteredKeysSync([]);
    }
  };
  const getTreeData2 = ({
    filters
  }) => (filters || []).map((filter, index) => {
    const key = String(filter.value);
    const item = {
      title: filter.text,
      key: filter.value !== void 0 ? key : String(index)
    };
    if (filter.children) {
      item.children = getTreeData2({
        filters: filter.children
      });
    }
    return item;
  });
  const getFilterData2 = (node) => {
    var _a2;
    return Object.assign(Object.assign({}, node), {
      text: node.title,
      value: node.key,
      children: ((_a2 = node.children) === null || _a2 === void 0 ? void 0 : _a2.map((item) => getFilterData2(item))) || []
    });
  };
  let dropdownContent;
  const {
    direction,
    renderEmpty
  } = reactExports.useContext(ConfigContext);
  if (typeof column.filterDropdown === "function") {
    dropdownContent = column.filterDropdown({
      prefixCls: `${dropdownPrefixCls}-custom`,
      setSelectedKeys: (selectedKeys) => onSelectKeys({
        selectedKeys
      }),
      selectedKeys: getFilteredKeysSync(),
      confirm: doFilter,
      clearFilters: onReset,
      filters: column.filters,
      visible: mergedVisible,
      close: () => {
        triggerVisible(false);
      }
    });
  } else if (column.filterDropdown) {
    dropdownContent = column.filterDropdown;
  } else {
    const selectedKeys = getFilteredKeysSync() || [];
    const getFilterComponent = () => {
      var _a2, _b2;
      const empty = (_a2 = renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty("Table.filter")) !== null && _a2 !== void 0 ? _a2 : /* @__PURE__ */ reactExports.createElement(Empty, {
        image: Empty.PRESENTED_IMAGE_SIMPLE,
        description: locale2.filterEmptyText,
        styles: {
          image: {
            height: 24
          }
        },
        style: {
          margin: 0,
          padding: "16px 0"
        }
      });
      if ((column.filters || []).length === 0) {
        return empty;
      }
      if (filterMode === "tree") {
        return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(FilterSearch, {
          filterSearch,
          value: searchValue,
          onChange: onSearch,
          tablePrefixCls,
          locale: locale2
        }), /* @__PURE__ */ reactExports.createElement("div", {
          className: `${tablePrefixCls}-filter-dropdown-tree`
        }, filterMultiple ? /* @__PURE__ */ reactExports.createElement(Checkbox, {
          checked: selectedKeys.length === flattenKeys(column.filters).length,
          indeterminate: selectedKeys.length > 0 && selectedKeys.length < flattenKeys(column.filters).length,
          className: `${tablePrefixCls}-filter-dropdown-checkall`,
          onChange: onCheckAll
        }, (_b2 = locale2 === null || locale2 === void 0 ? void 0 : locale2.filterCheckall) !== null && _b2 !== void 0 ? _b2 : locale2 === null || locale2 === void 0 ? void 0 : locale2.filterCheckAll) : null, /* @__PURE__ */ reactExports.createElement(Tree, {
          checkable: true,
          selectable: false,
          blockNode: true,
          multiple: filterMultiple,
          checkStrictly: !filterMultiple,
          className: `${dropdownPrefixCls}-menu`,
          onCheck,
          checkedKeys: selectedKeys,
          selectedKeys,
          showIcon: false,
          treeData: getTreeData2({
            filters: column.filters
          }),
          autoExpandParent: true,
          defaultExpandAll: true,
          filterTreeNode: searchValue.trim() ? (node) => {
            if (typeof filterSearch === "function") {
              return filterSearch(searchValue, getFilterData2(node));
            }
            return searchValueMatched(searchValue, node.title);
          } : void 0
        })));
      }
      const items = renderFilterItems({
        filters: column.filters || [],
        filterSearch,
        prefixCls,
        filteredKeys: getFilteredKeysSync(),
        filterMultiple,
        searchValue
      });
      const isEmpty = items.every((item) => item === null);
      return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(FilterSearch, {
        filterSearch,
        value: searchValue,
        onChange: onSearch,
        tablePrefixCls,
        locale: locale2
      }), isEmpty ? empty : /* @__PURE__ */ reactExports.createElement(Menu, {
        selectable: true,
        multiple: filterMultiple,
        prefixCls: `${dropdownPrefixCls}-menu`,
        className: dropdownMenuClass,
        onSelect: onSelectKeys,
        onDeselect: onSelectKeys,
        selectedKeys,
        getPopupContainer,
        openKeys,
        onOpenChange,
        items
      }));
    };
    const getResetDisabled = () => {
      if (filterResetToDefaultFilteredValue) {
        return isEqual((defaultFilteredValue || []).map((key) => String(key)), selectedKeys, true);
      }
      return selectedKeys.length === 0;
    };
    dropdownContent = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, getFilterComponent(), /* @__PURE__ */ reactExports.createElement("div", {
      className: `${prefixCls}-dropdown-btns`
    }, /* @__PURE__ */ reactExports.createElement(Button, {
      type: "link",
      size: "small",
      disabled: getResetDisabled(),
      onClick: () => onReset()
    }, locale2.filterReset), /* @__PURE__ */ reactExports.createElement(Button, {
      type: "primary",
      size: "small",
      onClick: onConfirm
    }, locale2.filterConfirm)));
  }
  if (column.filterDropdown) {
    dropdownContent = /* @__PURE__ */ reactExports.createElement(OverrideProvider, {
      selectable: void 0
    }, dropdownContent);
  }
  dropdownContent = /* @__PURE__ */ reactExports.createElement(FilterDropdownMenuWrapper, {
    className: `${prefixCls}-dropdown`
  }, dropdownContent);
  const getDropdownTrigger = () => {
    let filterIcon;
    if (typeof column.filterIcon === "function") {
      filterIcon = column.filterIcon(filtered);
    } else if (column.filterIcon) {
      filterIcon = column.filterIcon;
    } else {
      filterIcon = /* @__PURE__ */ reactExports.createElement(RefIcon$9, null);
    }
    return /* @__PURE__ */ reactExports.createElement("span", {
      role: "button",
      tabIndex: -1,
      className: classNames(`${prefixCls}-trigger`, {
        active: filtered
      }),
      onClick: (e) => {
        e.stopPropagation();
      }
    }, filterIcon);
  };
  const mergedDropdownProps = mergeProps({
    trigger: ["click"],
    placement: direction === "rtl" ? "bottomLeft" : "bottomRight",
    children: getDropdownTrigger(),
    getPopupContainer
  }, Object.assign(Object.assign({}, filterDropdownProps), {
    rootClassName: classNames(rootClassName, filterDropdownProps.rootClassName),
    open: mergedVisible,
    onOpenChange: onVisibleChange,
    popupRender: () => {
      if (typeof (filterDropdownProps === null || filterDropdownProps === void 0 ? void 0 : filterDropdownProps.dropdownRender) === "function") {
        return filterDropdownProps.dropdownRender(dropdownContent);
      }
      return dropdownContent;
    }
  }));
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-column`
  }, /* @__PURE__ */ reactExports.createElement("span", {
    className: `${tablePrefixCls}-column-title`
  }, children), /* @__PURE__ */ reactExports.createElement(Dropdown, Object.assign({}, mergedDropdownProps)));
};
const collectFilterStates = (columns, init, pos) => {
  let filterStates = [];
  (columns || []).forEach((column, index) => {
    var _a;
    const columnPos = getColumnPos(index, pos);
    const filterDropdownIsDefined = column.filterDropdown !== void 0;
    if (column.filters || filterDropdownIsDefined || "onFilter" in column) {
      if ("filteredValue" in column) {
        let filteredValues = column.filteredValue;
        if (!filterDropdownIsDefined) {
          filteredValues = (_a = filteredValues === null || filteredValues === void 0 ? void 0 : filteredValues.map(String)) !== null && _a !== void 0 ? _a : filteredValues;
        }
        filterStates.push({
          column,
          key: getColumnKey(column, columnPos),
          filteredKeys: filteredValues,
          forceFiltered: column.filtered
        });
      } else {
        filterStates.push({
          column,
          key: getColumnKey(column, columnPos),
          filteredKeys: init && column.defaultFilteredValue ? column.defaultFilteredValue : void 0,
          forceFiltered: column.filtered
        });
      }
    }
    if ("children" in column) {
      filterStates = [].concat(_toConsumableArray(filterStates), _toConsumableArray(collectFilterStates(column.children, init, columnPos)));
    }
  });
  return filterStates;
};
function injectFilter(prefixCls, dropdownPrefixCls, columns, filterStates, locale2, triggerFilter, getPopupContainer, pos, rootClassName) {
  return columns.map((column, index) => {
    const columnPos = getColumnPos(index, pos);
    const {
      filterOnClose = true,
      filterMultiple = true,
      filterMode,
      filterSearch
    } = column;
    let newColumn = column;
    if (newColumn.filters || newColumn.filterDropdown) {
      const columnKey = getColumnKey(newColumn, columnPos);
      const filterState = filterStates.find(({
        key
      }) => columnKey === key);
      newColumn = Object.assign(Object.assign({}, newColumn), {
        title: (renderProps) => /* @__PURE__ */ reactExports.createElement(FilterDropdown, {
          tablePrefixCls: prefixCls,
          prefixCls: `${prefixCls}-filter`,
          dropdownPrefixCls,
          column: newColumn,
          columnKey,
          filterState,
          filterOnClose,
          filterMultiple,
          filterMode,
          filterSearch,
          triggerFilter,
          locale: locale2,
          getPopupContainer,
          rootClassName
        }, renderColumnTitle(column.title, renderProps))
      });
    }
    if ("children" in newColumn) {
      newColumn = Object.assign(Object.assign({}, newColumn), {
        children: injectFilter(prefixCls, dropdownPrefixCls, newColumn.children, filterStates, locale2, triggerFilter, getPopupContainer, columnPos, rootClassName)
      });
    }
    return newColumn;
  });
}
const generateFilterInfo = (filterStates) => {
  const currentFilters = {};
  filterStates.forEach(({
    key,
    filteredKeys,
    column
  }) => {
    const keyAsString = key;
    const {
      filters,
      filterDropdown
    } = column;
    if (filterDropdown) {
      currentFilters[keyAsString] = filteredKeys || null;
    } else if (Array.isArray(filteredKeys)) {
      const keys = flattenKeys(filters);
      currentFilters[keyAsString] = keys.filter((originKey) => filteredKeys.includes(String(originKey)));
    } else {
      currentFilters[keyAsString] = null;
    }
  });
  return currentFilters;
};
const getFilterData = (data, filterStates, childrenColumnName) => {
  const filterDatas = filterStates.reduce((currentData, filterState) => {
    const {
      column: {
        onFilter,
        filters
      },
      filteredKeys
    } = filterState;
    if (onFilter && filteredKeys && filteredKeys.length) {
      return currentData.map((record) => Object.assign({}, record)).filter((record) => filteredKeys.some((key) => {
        const keys = flattenKeys(filters);
        const keyIndex = keys.findIndex((k) => String(k) === String(key));
        const realKey = keyIndex !== -1 ? keys[keyIndex] : key;
        if (record[childrenColumnName]) {
          record[childrenColumnName] = getFilterData(record[childrenColumnName], filterStates, childrenColumnName);
        }
        return onFilter(realKey, record);
      }));
    }
    return currentData;
  }, data);
  return filterDatas;
};
const getMergedColumns = (rawMergedColumns) => rawMergedColumns.flatMap((column) => {
  if ("children" in column) {
    return [column].concat(_toConsumableArray(getMergedColumns(column.children || [])));
  }
  return [column];
});
const useFilter = (props) => {
  const {
    prefixCls,
    dropdownPrefixCls,
    mergedColumns: rawMergedColumns,
    onFilterChange,
    getPopupContainer,
    locale: tableLocale,
    rootClassName
  } = props;
  devUseWarning();
  const mergedColumns = reactExports.useMemo(() => getMergedColumns(rawMergedColumns || []), [rawMergedColumns]);
  const [filterStates, setFilterStates] = reactExports.useState(() => collectFilterStates(mergedColumns, true));
  const mergedFilterStates = reactExports.useMemo(() => {
    const collectedStates = collectFilterStates(mergedColumns, false);
    if (collectedStates.length === 0) {
      return collectedStates;
    }
    let filteredKeysIsAllNotControlled = true;
    collectedStates.forEach(({
      filteredKeys
    }) => {
      if (filteredKeys !== void 0) {
        filteredKeysIsAllNotControlled = false;
      }
    });
    if (filteredKeysIsAllNotControlled) {
      const keyList = (mergedColumns || []).map((column, index) => getColumnKey(column, getColumnPos(index)));
      return filterStates.filter(({
        key
      }) => keyList.includes(key)).map((item) => {
        const col = mergedColumns[keyList.indexOf(item.key)];
        return Object.assign(Object.assign({}, item), {
          column: Object.assign(Object.assign({}, item.column), col),
          forceFiltered: col.filtered
        });
      });
    }
    return collectedStates;
  }, [mergedColumns, filterStates]);
  const filters = reactExports.useMemo(() => generateFilterInfo(mergedFilterStates), [mergedFilterStates]);
  const triggerFilter = (filterState) => {
    const newFilterStates = mergedFilterStates.filter(({
      key
    }) => key !== filterState.key);
    newFilterStates.push(filterState);
    setFilterStates(newFilterStates);
    onFilterChange(generateFilterInfo(newFilterStates), newFilterStates);
  };
  const transformColumns = (innerColumns) => injectFilter(prefixCls, dropdownPrefixCls, innerColumns, mergedFilterStates, tableLocale, triggerFilter, getPopupContainer, void 0, rootClassName);
  return [transformColumns, mergedFilterStates, filters];
};
const useLazyKVMap = (data, childrenColumnName, getRowKey) => {
  const mapCacheRef = reactExports.useRef({});
  function getRecordByKey(key) {
    var _a;
    if (!mapCacheRef.current || mapCacheRef.current.data !== data || mapCacheRef.current.childrenColumnName !== childrenColumnName || mapCacheRef.current.getRowKey !== getRowKey) {
      let dig = function(records) {
        records.forEach((record, index) => {
          const rowKey = getRowKey(record, index);
          kvMap.set(rowKey, record);
          if (record && typeof record === "object" && childrenColumnName in record) {
            dig(record[childrenColumnName] || []);
          }
        });
      };
      const kvMap = /* @__PURE__ */ new Map();
      dig(data);
      mapCacheRef.current = {
        data,
        childrenColumnName,
        kvMap,
        getRowKey
      };
    }
    return (_a = mapCacheRef.current.kvMap) === null || _a === void 0 ? void 0 : _a.get(key);
  }
  return [getRecordByKey];
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const DEFAULT_PAGE_SIZE = 10;
function getPaginationParam(mergedPagination, pagination) {
  const param = {
    current: mergedPagination.current,
    pageSize: mergedPagination.pageSize
  };
  const paginationObj = pagination && typeof pagination === "object" ? pagination : {};
  Object.keys(paginationObj).forEach((pageProp) => {
    const value = mergedPagination[pageProp];
    if (typeof value !== "function") {
      param[pageProp] = value;
    }
  });
  return param;
}
function usePagination(total, onChange, pagination) {
  const _a = pagination && typeof pagination === "object" ? pagination : {}, {
    total: paginationTotal = 0
  } = _a, paginationObj = __rest(_a, ["total"]);
  const [innerPagination, setInnerPagination] = reactExports.useState(() => ({
    current: "defaultCurrent" in paginationObj ? paginationObj.defaultCurrent : 1,
    pageSize: "defaultPageSize" in paginationObj ? paginationObj.defaultPageSize : DEFAULT_PAGE_SIZE
  }));
  const mergedPagination = mergeProps(innerPagination, paginationObj, {
    total: paginationTotal > 0 ? paginationTotal : total
  });
  const maxPage = Math.ceil((paginationTotal || total) / mergedPagination.pageSize);
  if (mergedPagination.current > maxPage) {
    mergedPagination.current = maxPage || 1;
  }
  const refreshPagination = (current, pageSize) => {
    setInnerPagination({
      current: current !== null && current !== void 0 ? current : 1,
      pageSize: pageSize || mergedPagination.pageSize
    });
  };
  const onInternalChange = (current, pageSize) => {
    var _a2;
    if (pagination) {
      (_a2 = pagination.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(pagination, current, pageSize);
    }
    refreshPagination(current, pageSize);
    onChange(current, pageSize || (mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.pageSize));
  };
  if (pagination === false) {
    return [{}, () => {
    }];
  }
  return [Object.assign(Object.assign({}, mergedPagination), {
    onChange: onInternalChange
  }), refreshPagination];
}
var CaretDownOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" } }] }, "name": "caret-down", "theme": "outlined" };
var CaretDownOutlined = function CaretDownOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: CaretDownOutlined$1
  }));
};
var RefIcon$1 = /* @__PURE__ */ reactExports.forwardRef(CaretDownOutlined);
var CaretUpOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" } }] }, "name": "caret-up", "theme": "outlined" };
var CaretUpOutlined = function CaretUpOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon, _extends({}, props, {
    ref,
    icon: CaretUpOutlined$1
  }));
};
var RefIcon = /* @__PURE__ */ reactExports.forwardRef(CaretUpOutlined);
const ASCEND = "ascend";
const DESCEND = "descend";
const getMultiplePriority = (column) => {
  if (typeof column.sorter === "object" && typeof column.sorter.multiple === "number") {
    return column.sorter.multiple;
  }
  return false;
};
const getSortFunction = (sorter) => {
  if (typeof sorter === "function") {
    return sorter;
  }
  if (sorter && typeof sorter === "object" && sorter.compare) {
    return sorter.compare;
  }
  return false;
};
const nextSortDirection = (sortDirections, current) => {
  if (!current) {
    return sortDirections[0];
  }
  return sortDirections[sortDirections.indexOf(current) + 1];
};
const collectSortStates = (columns, init, pos) => {
  let sortStates = [];
  const pushState = (column, columnPos) => {
    sortStates.push({
      column,
      key: getColumnKey(column, columnPos),
      multiplePriority: getMultiplePriority(column),
      sortOrder: column.sortOrder
    });
  };
  (columns || []).forEach((column, index) => {
    const columnPos = getColumnPos(index, pos);
    if (column.children) {
      if ("sortOrder" in column) {
        pushState(column, columnPos);
      }
      sortStates = [].concat(_toConsumableArray(sortStates), _toConsumableArray(collectSortStates(column.children, init, columnPos)));
    } else if (column.sorter) {
      if ("sortOrder" in column) {
        pushState(column, columnPos);
      } else if (init && column.defaultSortOrder) {
        sortStates.push({
          column,
          key: getColumnKey(column, columnPos),
          multiplePriority: getMultiplePriority(column),
          sortOrder: column.defaultSortOrder
        });
      }
    }
  });
  return sortStates;
};
const injectSorter = (prefixCls, columns, sorterStates, triggerSorter, defaultSortDirections, tableLocale, tableShowSorterTooltip, pos) => {
  const finalColumns = (columns || []).map((column, index) => {
    const columnPos = getColumnPos(index, pos);
    let newColumn = column;
    if (newColumn.sorter) {
      const sortDirections = newColumn.sortDirections || defaultSortDirections;
      const showSorterTooltip = newColumn.showSorterTooltip === void 0 ? tableShowSorterTooltip : newColumn.showSorterTooltip;
      const columnKey = getColumnKey(newColumn, columnPos);
      const sorterState = sorterStates.find(({
        key
      }) => key === columnKey);
      const sortOrder = sorterState ? sorterState.sortOrder : null;
      const nextSortOrder = nextSortDirection(sortDirections, sortOrder);
      let sorter;
      if (column.sortIcon) {
        sorter = column.sortIcon({
          sortOrder
        });
      } else {
        const upNode = sortDirections.includes(ASCEND) && /* @__PURE__ */ reactExports.createElement(RefIcon, {
          className: classNames(`${prefixCls}-column-sorter-up`, {
            active: sortOrder === ASCEND
          })
        });
        const downNode = sortDirections.includes(DESCEND) && /* @__PURE__ */ reactExports.createElement(RefIcon$1, {
          className: classNames(`${prefixCls}-column-sorter-down`, {
            active: sortOrder === DESCEND
          })
        });
        sorter = /* @__PURE__ */ reactExports.createElement("span", {
          className: classNames(`${prefixCls}-column-sorter`, {
            [`${prefixCls}-column-sorter-full`]: !!(upNode && downNode)
          })
        }, /* @__PURE__ */ reactExports.createElement("span", {
          className: `${prefixCls}-column-sorter-inner`,
          "aria-hidden": "true"
        }, upNode, downNode));
      }
      const {
        cancelSort,
        triggerAsc,
        triggerDesc
      } = tableLocale || {};
      let sortTip = cancelSort;
      if (nextSortOrder === DESCEND) {
        sortTip = triggerDesc;
      } else if (nextSortOrder === ASCEND) {
        sortTip = triggerAsc;
      }
      const tooltipProps = typeof showSorterTooltip === "object" ? Object.assign({
        title: sortTip
      }, showSorterTooltip) : {
        title: sortTip
      };
      newColumn = Object.assign(Object.assign({}, newColumn), {
        className: classNames(newColumn.className, {
          [`${prefixCls}-column-sort`]: sortOrder
        }),
        title: (renderProps) => {
          const columnSortersClass = `${prefixCls}-column-sorters`;
          const renderColumnTitleWrapper = /* @__PURE__ */ reactExports.createElement("span", {
            className: `${prefixCls}-column-title`
          }, renderColumnTitle(column.title, renderProps));
          const renderSortTitle = /* @__PURE__ */ reactExports.createElement("div", {
            className: columnSortersClass
          }, renderColumnTitleWrapper, sorter);
          if (showSorterTooltip) {
            if (typeof showSorterTooltip !== "boolean" && (showSorterTooltip === null || showSorterTooltip === void 0 ? void 0 : showSorterTooltip.target) === "sorter-icon") {
              return /* @__PURE__ */ reactExports.createElement("div", {
                className: classNames(columnSortersClass, `${columnSortersClass}-tooltip-target-sorter`)
              }, renderColumnTitleWrapper, /* @__PURE__ */ reactExports.createElement(Tooltip, Object.assign({}, tooltipProps), sorter));
            }
            return /* @__PURE__ */ reactExports.createElement(Tooltip, Object.assign({}, tooltipProps), renderSortTitle);
          }
          return renderSortTitle;
        },
        onHeaderCell: (col) => {
          var _a;
          const cell = ((_a = column.onHeaderCell) === null || _a === void 0 ? void 0 : _a.call(column, col)) || {};
          const originOnClick = cell.onClick;
          const originOKeyDown = cell.onKeyDown;
          cell.onClick = (event) => {
            triggerSorter({
              column,
              key: columnKey,
              sortOrder: nextSortOrder,
              multiplePriority: getMultiplePriority(column)
            });
            originOnClick === null || originOnClick === void 0 ? void 0 : originOnClick(event);
          };
          cell.onKeyDown = (event) => {
            if (event.keyCode === KeyCode.ENTER) {
              triggerSorter({
                column,
                key: columnKey,
                sortOrder: nextSortOrder,
                multiplePriority: getMultiplePriority(column)
              });
              originOKeyDown === null || originOKeyDown === void 0 ? void 0 : originOKeyDown(event);
            }
          };
          const renderTitle = safeColumnTitle(column.title, {});
          const displayTitle = renderTitle === null || renderTitle === void 0 ? void 0 : renderTitle.toString();
          if (sortOrder) {
            cell["aria-sort"] = sortOrder === "ascend" ? "ascending" : "descending";
          }
          cell["aria-label"] = displayTitle || "";
          cell.className = classNames(cell.className, `${prefixCls}-column-has-sorters`);
          cell.tabIndex = 0;
          if (column.ellipsis) {
            cell.title = (renderTitle !== null && renderTitle !== void 0 ? renderTitle : "").toString();
          }
          return cell;
        }
      });
    }
    if ("children" in newColumn) {
      newColumn = Object.assign(Object.assign({}, newColumn), {
        children: injectSorter(prefixCls, newColumn.children, sorterStates, triggerSorter, defaultSortDirections, tableLocale, tableShowSorterTooltip, columnPos)
      });
    }
    return newColumn;
  });
  return finalColumns;
};
const stateToInfo = (sorterState) => {
  const {
    column,
    sortOrder
  } = sorterState;
  return {
    column,
    order: sortOrder,
    field: column.dataIndex,
    columnKey: column.key
  };
};
const generateSorterInfo = (sorterStates) => {
  const activeSorters = sorterStates.filter(({
    sortOrder
  }) => sortOrder).map(stateToInfo);
  if (activeSorters.length === 0 && sorterStates.length) {
    const lastIndex = sorterStates.length - 1;
    return Object.assign(Object.assign({}, stateToInfo(sorterStates[lastIndex])), {
      column: void 0,
      order: void 0,
      field: void 0,
      columnKey: void 0
    });
  }
  if (activeSorters.length <= 1) {
    return activeSorters[0] || {};
  }
  return activeSorters;
};
const getSortData = (data, sortStates, childrenColumnName) => {
  const innerSorterStates = sortStates.slice().sort((a, b) => b.multiplePriority - a.multiplePriority);
  const cloneData = data.slice();
  const runningSorters = innerSorterStates.filter(({
    column: {
      sorter
    },
    sortOrder
  }) => getSortFunction(sorter) && sortOrder);
  if (!runningSorters.length) {
    return cloneData;
  }
  return cloneData.sort((record1, record2) => {
    for (let i = 0; i < runningSorters.length; i += 1) {
      const sorterState = runningSorters[i];
      const {
        column: {
          sorter
        },
        sortOrder
      } = sorterState;
      const compareFn = getSortFunction(sorter);
      if (compareFn && sortOrder) {
        const compareResult = compareFn(record1, record2, sortOrder);
        if (compareResult !== 0) {
          return sortOrder === ASCEND ? compareResult : -compareResult;
        }
      }
    }
    return 0;
  }).map((record) => {
    const subRecords = record[childrenColumnName];
    if (subRecords) {
      return Object.assign(Object.assign({}, record), {
        [childrenColumnName]: getSortData(subRecords, sortStates, childrenColumnName)
      });
    }
    return record;
  });
};
const useFilterSorter = (props) => {
  const {
    prefixCls,
    mergedColumns,
    sortDirections,
    tableLocale,
    showSorterTooltip,
    onSorterChange
  } = props;
  const [sortStates, setSortStates] = reactExports.useState(() => collectSortStates(mergedColumns, true));
  const getColumnKeys = (columns, pos) => {
    const newKeys = [];
    columns.forEach((item, index) => {
      const columnPos = getColumnPos(index, pos);
      newKeys.push(getColumnKey(item, columnPos));
      if (Array.isArray(item.children)) {
        const childKeys = getColumnKeys(item.children, columnPos);
        newKeys.push.apply(newKeys, _toConsumableArray(childKeys));
      }
    });
    return newKeys;
  };
  const mergedSorterStates = reactExports.useMemo(() => {
    let validate = true;
    const collectedStates = collectSortStates(mergedColumns, false);
    if (!collectedStates.length) {
      const mergedColumnsKeys = getColumnKeys(mergedColumns);
      return sortStates.filter(({
        key
      }) => mergedColumnsKeys.includes(key));
    }
    const validateStates = [];
    function patchStates(state) {
      if (validate) {
        validateStates.push(state);
      } else {
        validateStates.push(Object.assign(Object.assign({}, state), {
          sortOrder: null
        }));
      }
    }
    let multipleMode = null;
    collectedStates.forEach((state) => {
      if (multipleMode === null) {
        patchStates(state);
        if (state.sortOrder) {
          if (state.multiplePriority === false) {
            validate = false;
          } else {
            multipleMode = true;
          }
        }
      } else if (multipleMode && state.multiplePriority !== false) {
        patchStates(state);
      } else {
        validate = false;
        patchStates(state);
      }
    });
    return validateStates;
  }, [mergedColumns, sortStates]);
  const columnTitleSorterProps = reactExports.useMemo(() => {
    var _a, _b;
    const sortColumns = mergedSorterStates.map(({
      column,
      sortOrder
    }) => ({
      column,
      order: sortOrder
    }));
    return {
      sortColumns,
      // Legacy
      sortColumn: (_a = sortColumns[0]) === null || _a === void 0 ? void 0 : _a.column,
      sortOrder: (_b = sortColumns[0]) === null || _b === void 0 ? void 0 : _b.order
    };
  }, [mergedSorterStates]);
  const triggerSorter = (sortState) => {
    let newSorterStates;
    if (sortState.multiplePriority === false || !mergedSorterStates.length || mergedSorterStates[0].multiplePriority === false) {
      newSorterStates = [sortState];
    } else {
      newSorterStates = [].concat(_toConsumableArray(mergedSorterStates.filter(({
        key
      }) => key !== sortState.key)), [sortState]);
    }
    setSortStates(newSorterStates);
    onSorterChange(generateSorterInfo(newSorterStates), newSorterStates);
  };
  const transformColumns = (innerColumns) => injectSorter(prefixCls, innerColumns, mergedSorterStates, triggerSorter, sortDirections, tableLocale, showSorterTooltip);
  const getSorters = () => generateSorterInfo(mergedSorterStates);
  return [transformColumns, mergedSorterStates, columnTitleSorterProps, getSorters];
};
const fillTitle = (columns, columnTitleProps) => {
  const finalColumns = columns.map((column) => {
    const cloneColumn = Object.assign({}, column);
    cloneColumn.title = renderColumnTitle(column.title, columnTitleProps);
    if ("children" in cloneColumn) {
      cloneColumn.children = fillTitle(cloneColumn.children, columnTitleProps);
    }
    return cloneColumn;
  });
  return finalColumns;
};
const useTitleColumns = (columnTitleProps) => {
  const filledColumns = reactExports.useCallback((columns) => fillTitle(columns, columnTitleProps), [columnTitleProps]);
  return [filledColumns];
};
const RcTable = genTable((prev, next) => {
  const {
    _renderTimes: prevRenderTimes
  } = prev;
  const {
    _renderTimes: nextRenderTimes
  } = next;
  return prevRenderTimes !== nextRenderTimes;
});
const RcVirtualTable = genVirtualTable((prev, next) => {
  const {
    _renderTimes: prevRenderTimes
  } = prev;
  const {
    _renderTimes: nextRenderTimes
  } = next;
  return prevRenderTimes !== nextRenderTimes;
});
const genBorderedStyle = (token) => {
  const {
    componentCls,
    lineWidth,
    lineType,
    tableBorderColor,
    tableHeaderBg,
    tablePaddingVertical,
    tablePaddingHorizontal,
    calc
  } = token;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  const getSizeBorderStyle = (size, paddingVertical, paddingHorizontal) => ({
    [`&${componentCls}-${size}`]: {
      [`> ${componentCls}-container`]: {
        [`> ${componentCls}-content, > ${componentCls}-body`]: {
          [`
            > table > tbody > tr > th,
            > table > tbody > tr > td
          `]: {
            [`> ${componentCls}-expanded-row-fixed`]: {
              margin: `${unit(calc(paddingVertical).mul(-1).equal())}
              ${unit(calc(calc(paddingHorizontal).add(lineWidth)).mul(-1).equal())}`
            }
          }
        }
      }
    }
  });
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}${componentCls}-bordered`]: Object.assign(Object.assign(Object.assign({
        // ============================ Title =============================
        [`> ${componentCls}-title`]: {
          border: tableBorder,
          borderBottom: 0
        },
        // ============================ Content ============================
        [`> ${componentCls}-container`]: {
          borderInlineStart: tableBorder,
          borderTop: tableBorder,
          [`
            > ${componentCls}-content,
            > ${componentCls}-header,
            > ${componentCls}-body,
            > ${componentCls}-summary
          `]: {
            "> table": {
              // ============================= Cell =============================
              [`
                > thead > tr > th,
                > thead > tr > td,
                > tbody > tr > th,
                > tbody > tr > td,
                > tfoot > tr > th,
                > tfoot > tr > td
              `]: {
                borderInlineEnd: tableBorder
              },
              // ============================ Header ============================
              "> thead": {
                "> tr:not(:last-child) > th": {
                  borderBottom: tableBorder
                },
                "> tr > th::before": {
                  backgroundColor: "transparent !important"
                }
              },
              // Fixed right should provides additional border
              [`
                > thead > tr,
                > tbody > tr,
                > tfoot > tr
              `]: {
                [`> ${componentCls}-cell-fix-right-first::after`]: {
                  borderInlineEnd: tableBorder
                }
              },
              // ========================== Expandable ==========================
              [`
                > tbody > tr > th,
                > tbody > tr > td
              `]: {
                [`> ${componentCls}-expanded-row-fixed`]: {
                  margin: `${unit(calc(tablePaddingVertical).mul(-1).equal())} ${unit(calc(calc(tablePaddingHorizontal).add(lineWidth)).mul(-1).equal())}`,
                  "&::after": {
                    position: "absolute",
                    top: 0,
                    insetInlineEnd: lineWidth,
                    bottom: 0,
                    borderInlineEnd: tableBorder,
                    content: '""'
                  }
                }
              }
            }
          }
        },
        // ============================ Scroll ============================
        [`&${componentCls}-scroll-horizontal`]: {
          [`> ${componentCls}-container > ${componentCls}-body`]: {
            "> table > tbody": {
              [`
                > tr${componentCls}-expanded-row,
                > tr${componentCls}-placeholder
              `]: {
                "> th, > td": {
                  borderInlineEnd: 0
                }
              }
            }
          }
        }
      }, getSizeBorderStyle("middle", token.tablePaddingVerticalMiddle, token.tablePaddingHorizontalMiddle)), getSizeBorderStyle("small", token.tablePaddingVerticalSmall, token.tablePaddingHorizontalSmall)), {
        // ============================ Footer ============================
        [`> ${componentCls}-footer`]: {
          border: tableBorder,
          borderTop: 0
        }
      }),
      // ============================ Nested ============================
      [`${componentCls}-cell`]: {
        [`${componentCls}-container:first-child`]: {
          // :first-child to avoid the case when bordered and title is set
          borderTop: 0
        },
        // https://github.com/ant-design/ant-design/issues/35577
        "&-scrollbar:not([rowspan])": {
          boxShadow: `0 ${unit(lineWidth)} 0 ${unit(lineWidth)} ${tableHeaderBg}`
        }
      },
      [`${componentCls}-bordered ${componentCls}-cell-scrollbar`]: {
        borderInlineEnd: tableBorder
      }
    }
  };
};
const genEllipsisStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-cell-ellipsis`]: Object.assign(Object.assign({}, textEllipsis), {
        wordBreak: "keep-all",
        // Fixed first or last should special process
        [`
          &${componentCls}-cell-fix-left-last,
          &${componentCls}-cell-fix-right-first
        `]: {
          overflow: "visible",
          [`${componentCls}-cell-content`]: {
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }
        },
        [`${componentCls}-column-title`]: {
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordBreak: "keep-all"
        }
      })
    }
  };
};
const genEmptyStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-tbody > tr${componentCls}-placeholder`]: {
        textAlign: "center",
        color: token.colorTextDisabled,
        [`
          &:hover > th,
          &:hover > td,
        `]: {
          background: token.colorBgContainer
        }
      }
    }
  };
};
const genExpandStyle = (token) => {
  const {
    componentCls,
    antCls,
    motionDurationSlow,
    lineWidth,
    paddingXS,
    lineType,
    tableBorderColor,
    tableExpandIconBg,
    tableExpandColumnWidth,
    borderRadius,
    tablePaddingVertical,
    tablePaddingHorizontal,
    tableExpandedRowBg,
    paddingXXS,
    expandIconMarginTop,
    expandIconSize,
    expandIconHalfInner,
    expandIconScale,
    calc
  } = token;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  const expandIconLineOffset = calc(paddingXXS).sub(lineWidth).equal();
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-expand-icon-col`]: {
        width: tableExpandColumnWidth
      },
      [`${componentCls}-row-expand-icon-cell`]: {
        textAlign: "center",
        [`${componentCls}-row-expand-icon`]: {
          display: "inline-flex",
          float: "none",
          verticalAlign: "sub"
        }
      },
      [`${componentCls}-row-indent`]: {
        height: 1,
        float: "left"
      },
      [`${componentCls}-row-expand-icon`]: Object.assign(Object.assign({}, operationUnit(token)), {
        position: "relative",
        float: "left",
        width: expandIconSize,
        height: expandIconSize,
        color: "inherit",
        lineHeight: unit(expandIconSize),
        background: tableExpandIconBg,
        border: tableBorder,
        borderRadius,
        transform: `scale(${expandIconScale})`,
        "&:focus, &:hover, &:active": {
          borderColor: "currentcolor"
        },
        "&::before, &::after": {
          position: "absolute",
          background: "currentcolor",
          transition: `transform ${motionDurationSlow} ease-out`,
          content: '""'
        },
        "&::before": {
          top: expandIconHalfInner,
          insetInlineEnd: expandIconLineOffset,
          insetInlineStart: expandIconLineOffset,
          height: lineWidth
        },
        "&::after": {
          top: expandIconLineOffset,
          bottom: expandIconLineOffset,
          insetInlineStart: expandIconHalfInner,
          width: lineWidth,
          transform: "rotate(90deg)"
        },
        // Motion effect
        "&-collapsed::before": {
          transform: "rotate(-180deg)"
        },
        "&-collapsed::after": {
          transform: "rotate(0deg)"
        },
        "&-spaced": {
          "&::before, &::after": {
            display: "none",
            content: "none"
          },
          background: "transparent",
          border: 0,
          visibility: "hidden"
        }
      }),
      [`${componentCls}-row-indent + ${componentCls}-row-expand-icon`]: {
        marginTop: expandIconMarginTop,
        marginInlineEnd: paddingXS
      },
      [`tr${componentCls}-expanded-row`]: {
        "&, &:hover": {
          "> th, > td": {
            background: tableExpandedRowBg
          }
        },
        // https://github.com/ant-design/ant-design/issues/25573
        [`${antCls}-descriptions-view`]: {
          display: "flex",
          table: {
            flex: "auto",
            width: "100%"
          }
        }
      },
      // With fixed
      [`${componentCls}-expanded-row-fixed`]: {
        position: "relative",
        margin: `${unit(calc(tablePaddingVertical).mul(-1).equal())} ${unit(calc(tablePaddingHorizontal).mul(-1).equal())}`,
        padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`
      }
    }
  };
};
const genFilterStyle = (token) => {
  const {
    componentCls,
    antCls,
    iconCls,
    tableFilterDropdownWidth,
    tableFilterDropdownSearchWidth,
    paddingXXS,
    paddingXS,
    colorText,
    lineWidth,
    lineType,
    tableBorderColor,
    headerIconColor,
    fontSizeSM,
    tablePaddingHorizontal,
    borderRadius,
    motionDurationSlow,
    colorIcon,
    colorPrimary,
    tableHeaderFilterActiveBg,
    colorTextDisabled,
    tableFilterDropdownBg,
    tableFilterDropdownHeight,
    controlItemBgHover,
    controlItemBgActive,
    boxShadowSecondary,
    filterDropdownMenuBg,
    calc
  } = token;
  const dropdownPrefixCls = `${antCls}-dropdown`;
  const tableFilterDropdownPrefixCls = `${componentCls}-filter-dropdown`;
  const treePrefixCls = `${antCls}-tree`;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  return [
    {
      [`${componentCls}-wrapper`]: {
        [`${componentCls}-filter-column`]: {
          display: "flex",
          justifyContent: "space-between"
        },
        [`${componentCls}-filter-trigger`]: {
          position: "relative",
          display: "flex",
          alignItems: "center",
          marginBlock: calc(paddingXXS).mul(-1).equal(),
          marginInline: `${unit(paddingXXS)} ${unit(calc(tablePaddingHorizontal).div(2).mul(-1).equal())}`,
          padding: `0 ${unit(paddingXXS)}`,
          color: headerIconColor,
          fontSize: fontSizeSM,
          borderRadius,
          cursor: "pointer",
          transition: `all ${motionDurationSlow}`,
          "&:hover": {
            color: colorIcon,
            background: tableHeaderFilterActiveBg
          },
          "&.active": {
            color: colorPrimary
          }
        }
      }
    },
    {
      // Dropdown
      [`${antCls}-dropdown`]: {
        [tableFilterDropdownPrefixCls]: Object.assign(Object.assign({}, resetComponent(token)), {
          minWidth: tableFilterDropdownWidth,
          backgroundColor: tableFilterDropdownBg,
          borderRadius,
          boxShadow: boxShadowSecondary,
          overflow: "hidden",
          // Reset menu
          [`${dropdownPrefixCls}-menu`]: {
            // https://github.com/ant-design/ant-design/issues/4916
            // https://github.com/ant-design/ant-design/issues/19542
            maxHeight: tableFilterDropdownHeight,
            overflowX: "hidden",
            border: 0,
            boxShadow: "none",
            borderRadius: "unset",
            backgroundColor: filterDropdownMenuBg,
            "&:empty::after": {
              display: "block",
              padding: `${unit(paddingXS)} 0`,
              color: colorTextDisabled,
              fontSize: fontSizeSM,
              textAlign: "center",
              content: '"Not Found"'
            }
          },
          [`${tableFilterDropdownPrefixCls}-tree`]: {
            paddingBlock: `${unit(paddingXS)} 0`,
            paddingInline: paddingXS,
            [treePrefixCls]: {
              padding: 0
            },
            [`${treePrefixCls}-treenode ${treePrefixCls}-node-content-wrapper:hover`]: {
              backgroundColor: controlItemBgHover
            },
            [`${treePrefixCls}-treenode-checkbox-checked ${treePrefixCls}-node-content-wrapper`]: {
              "&, &:hover": {
                backgroundColor: controlItemBgActive
              }
            }
          },
          [`${tableFilterDropdownPrefixCls}-search`]: {
            padding: paddingXS,
            borderBottom: tableBorder,
            "&-input": {
              input: {
                minWidth: tableFilterDropdownSearchWidth
              },
              [iconCls]: {
                color: colorTextDisabled
              }
            }
          },
          [`${tableFilterDropdownPrefixCls}-checkall`]: {
            width: "100%",
            marginBottom: paddingXXS,
            marginInlineStart: paddingXXS
          },
          // Operation
          [`${tableFilterDropdownPrefixCls}-btns`]: {
            display: "flex",
            justifyContent: "space-between",
            padding: `${unit(calc(paddingXS).sub(lineWidth).equal())} ${unit(paddingXS)}`,
            overflow: "hidden",
            borderTop: tableBorder
          }
        })
      }
    },
    // Dropdown Menu & SubMenu
    {
      // submenu of table filter dropdown
      [`${antCls}-dropdown ${tableFilterDropdownPrefixCls}, ${tableFilterDropdownPrefixCls}-submenu`]: {
        // Checkbox
        [`${antCls}-checkbox-wrapper + span`]: {
          paddingInlineStart: paddingXS,
          color: colorText
        },
        "> ul": {
          maxHeight: "calc(100vh - 130px)",
          overflowX: "hidden",
          overflowY: "auto"
        }
      }
    }
  ];
};
const genFixedStyle = (token) => {
  const {
    componentCls,
    lineWidth,
    colorSplit,
    motionDurationSlow,
    zIndexTableFixed: zIndexTableFixed2,
    tableBg,
    zIndexTableSticky,
    calc
  } = token;
  const shadowColor = colorSplit;
  return {
    [`${componentCls}-wrapper`]: {
      [`
        ${componentCls}-cell-fix-left,
        ${componentCls}-cell-fix-right
      `]: {
        position: "sticky !important",
        zIndex: zIndexTableFixed2,
        background: tableBg
      },
      [`
        ${componentCls}-cell-fix-left-first::after,
        ${componentCls}-cell-fix-left-last::after
      `]: {
        position: "absolute",
        top: 0,
        right: {
          _skip_check_: true,
          value: 0
        },
        bottom: calc(lineWidth).mul(-1).equal(),
        width: 30,
        transform: "translateX(100%)",
        transition: `box-shadow ${motionDurationSlow}`,
        content: '""',
        pointerEvents: "none",
        // fix issues: https://github.com/ant-design/ant-design/issues/54587
        willChange: "transform"
      },
      [`${componentCls}-cell-fix-left-all::after`]: {
        display: "none"
      },
      [`
        ${componentCls}-cell-fix-right-first::after,
        ${componentCls}-cell-fix-right-last::after
      `]: {
        position: "absolute",
        top: 0,
        bottom: calc(lineWidth).mul(-1).equal(),
        left: {
          _skip_check_: true,
          value: 0
        },
        width: 30,
        transform: "translateX(-100%)",
        transition: `box-shadow ${motionDurationSlow}`,
        content: '""',
        pointerEvents: "none"
      },
      [`${componentCls}-container`]: {
        position: "relative",
        "&::before, &::after": {
          position: "absolute",
          top: 0,
          bottom: 0,
          zIndex: calc(zIndexTableSticky).add(1).equal({
            unit: false
          }),
          width: 30,
          transition: `box-shadow ${motionDurationSlow}`,
          content: '""',
          pointerEvents: "none"
        },
        "&::before": {
          insetInlineStart: 0
        },
        "&::after": {
          insetInlineEnd: 0
        }
      },
      [`${componentCls}-ping-left`]: {
        [`&:not(${componentCls}-has-fix-left) ${componentCls}-container::before`]: {
          boxShadow: `inset 10px 0 8px -8px ${shadowColor}`
        },
        [`
          ${componentCls}-cell-fix-left-first::after,
          ${componentCls}-cell-fix-left-last::after
        `]: {
          boxShadow: `inset 10px 0 8px -8px ${shadowColor}`
        },
        [`${componentCls}-cell-fix-left-last::before`]: {
          backgroundColor: "transparent !important"
        }
      },
      [`${componentCls}-ping-right`]: {
        [`&:not(${componentCls}-has-fix-right) ${componentCls}-container::after`]: {
          boxShadow: `inset -10px 0 8px -8px ${shadowColor}`
        },
        [`
          ${componentCls}-cell-fix-right-first::after,
          ${componentCls}-cell-fix-right-last::after
        `]: {
          boxShadow: `inset -10px 0 8px -8px ${shadowColor}`
        }
      },
      // Gapped fixed Columns do not show the shadow
      [`${componentCls}-fixed-column-gapped`]: {
        [`
        ${componentCls}-cell-fix-left-first::after,
        ${componentCls}-cell-fix-left-last::after,
        ${componentCls}-cell-fix-right-first::after,
        ${componentCls}-cell-fix-right-last::after
      `]: {
          boxShadow: "none"
        }
      }
    }
  };
};
const genPaginationStyle = (token) => {
  const {
    componentCls,
    antCls,
    margin
  } = token;
  return {
    [`${componentCls}-wrapper ${componentCls}-pagination${antCls}-pagination`]: {
      margin: `${unit(margin)} 0`
    }
  };
};
const genRadiusStyle = (token) => {
  const {
    componentCls,
    tableRadius
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [componentCls]: {
        // https://github.com/ant-design/ant-design/issues/39115#issuecomment-1362314574
        [`${componentCls}-title, ${componentCls}-header`]: {
          borderRadius: `${unit(tableRadius)} ${unit(tableRadius)} 0 0`
        },
        [`${componentCls}-title + ${componentCls}-container`]: {
          borderStartStartRadius: 0,
          borderStartEndRadius: 0,
          // https://github.com/ant-design/ant-design/issues/41975
          [`${componentCls}-header, table`]: {
            borderRadius: 0
          },
          "table > thead > tr:first-child": {
            "th:first-child, th:last-child, td:first-child, td:last-child": {
              borderRadius: 0
            }
          }
        },
        "&-container": {
          borderStartStartRadius: tableRadius,
          borderStartEndRadius: tableRadius,
          "table > thead > tr:first-child": {
            "> *:first-child": {
              borderStartStartRadius: tableRadius
            },
            "> *:last-child": {
              borderStartEndRadius: tableRadius
            }
          }
        },
        "&-footer": {
          borderRadius: `0 0 ${unit(tableRadius)} ${unit(tableRadius)}`
        }
      }
    }
  };
};
const genStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-wrapper-rtl`]: {
      direction: "rtl",
      table: {
        direction: "rtl"
      },
      [`${componentCls}-pagination-left`]: {
        justifyContent: "flex-end"
      },
      [`${componentCls}-pagination-right`]: {
        justifyContent: "flex-start"
      },
      [`${componentCls}-row-expand-icon`]: {
        float: "right",
        "&::after": {
          transform: "rotate(-90deg)"
        },
        "&-collapsed::before": {
          transform: "rotate(180deg)"
        },
        "&-collapsed::after": {
          transform: "rotate(0deg)"
        }
      },
      [`${componentCls}-container`]: {
        "&::before": {
          insetInlineStart: "unset",
          insetInlineEnd: 0
        },
        "&::after": {
          insetInlineStart: 0,
          insetInlineEnd: "unset"
        },
        [`${componentCls}-row-indent`]: {
          float: "right"
        }
      }
    }
  };
};
const genSelectionStyle = (token) => {
  const {
    componentCls,
    antCls,
    iconCls,
    fontSizeIcon,
    padding,
    paddingXS,
    headerIconColor,
    headerIconHoverColor,
    tableSelectionColumnWidth,
    tableSelectedRowBg,
    tableSelectedRowHoverBg,
    tableRowHoverBg,
    tablePaddingHorizontal,
    calc
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      // ========================== Selections ==========================
      [`${componentCls}-selection-col`]: {
        width: tableSelectionColumnWidth,
        [`&${componentCls}-selection-col-with-dropdown`]: {
          width: calc(tableSelectionColumnWidth).add(fontSizeIcon).add(calc(padding).div(4)).equal()
        }
      },
      [`${componentCls}-bordered ${componentCls}-selection-col`]: {
        width: calc(tableSelectionColumnWidth).add(calc(paddingXS).mul(2)).equal(),
        [`&${componentCls}-selection-col-with-dropdown`]: {
          width: calc(tableSelectionColumnWidth).add(fontSizeIcon).add(calc(padding).div(4)).add(calc(paddingXS).mul(2)).equal()
        }
      },
      [`
        table tr th${componentCls}-selection-column,
        table tr td${componentCls}-selection-column,
        ${componentCls}-selection-column
      `]: {
        paddingInlineEnd: token.paddingXS,
        paddingInlineStart: token.paddingXS,
        textAlign: "center",
        [`${antCls}-radio-wrapper`]: {
          marginInlineEnd: 0
        }
      },
      [`table tr th${componentCls}-selection-column${componentCls}-cell-fix-left`]: {
        zIndex: calc(token.zIndexTableFixed).add(1).equal({
          unit: false
        })
      },
      [`table tr th${componentCls}-selection-column::after`]: {
        backgroundColor: "transparent !important"
      },
      [`${componentCls}-selection`]: {
        position: "relative",
        display: "inline-flex",
        flexDirection: "column"
      },
      [`${componentCls}-selection-extra`]: {
        position: "absolute",
        top: 0,
        zIndex: 1,
        cursor: "pointer",
        transition: `all ${token.motionDurationSlow}`,
        marginInlineStart: "100%",
        paddingInlineStart: unit(calc(tablePaddingHorizontal).div(4).equal()),
        [iconCls]: {
          color: headerIconColor,
          fontSize: fontSizeIcon,
          verticalAlign: "baseline",
          "&:hover": {
            color: headerIconHoverColor
          }
        }
      },
      // ============================= Rows =============================
      [`${componentCls}-tbody`]: {
        [`${componentCls}-row`]: {
          [`&${componentCls}-row-selected`]: {
            [`> ${componentCls}-cell`]: {
              background: tableSelectedRowBg,
              "&-row-hover": {
                background: tableSelectedRowHoverBg
              }
            }
          },
          [`> ${componentCls}-cell-row-hover`]: {
            background: tableRowHoverBg
          }
        }
      }
    }
  };
};
const genSizeStyle = (token) => {
  const {
    componentCls,
    tableExpandColumnWidth,
    calc
  } = token;
  const getSizeStyle = (size, paddingVertical, paddingHorizontal, fontSize) => ({
    [`${componentCls}${componentCls}-${size}`]: {
      fontSize,
      [`
        ${componentCls}-title,
        ${componentCls}-footer,
        ${componentCls}-cell,
        ${componentCls}-thead > tr > th,
        ${componentCls}-tbody > tr > th,
        ${componentCls}-tbody > tr > td,
        tfoot > tr > th,
        tfoot > tr > td
      `]: {
        padding: `${unit(paddingVertical)} ${unit(paddingHorizontal)}`
      },
      [`${componentCls}-filter-trigger`]: {
        marginInlineEnd: unit(calc(paddingHorizontal).div(2).mul(-1).equal())
      },
      [`${componentCls}-expanded-row-fixed`]: {
        margin: `${unit(calc(paddingVertical).mul(-1).equal())} ${unit(calc(paddingHorizontal).mul(-1).equal())}`
      },
      [`${componentCls}-tbody`]: {
        // ========================= Nest Table ===========================
        [`${componentCls}-wrapper:only-child ${componentCls}`]: {
          marginBlock: unit(calc(paddingVertical).mul(-1).equal()),
          marginInline: `${unit(calc(tableExpandColumnWidth).sub(paddingHorizontal).equal())} ${unit(calc(paddingHorizontal).mul(-1).equal())}`
        }
      },
      // https://github.com/ant-design/ant-design/issues/35167
      [`${componentCls}-selection-extra`]: {
        paddingInlineStart: unit(calc(paddingHorizontal).div(4).equal())
      }
    }
  });
  return {
    [`${componentCls}-wrapper`]: Object.assign(Object.assign({}, getSizeStyle("middle", token.tablePaddingVerticalMiddle, token.tablePaddingHorizontalMiddle, token.tableFontSizeMiddle)), getSizeStyle("small", token.tablePaddingVerticalSmall, token.tablePaddingHorizontalSmall, token.tableFontSizeSmall))
  };
};
const genSorterStyle = (token) => {
  const {
    componentCls,
    marginXXS,
    fontSizeIcon,
    headerIconColor,
    headerIconHoverColor
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-thead th${componentCls}-column-has-sorters`]: {
        outline: "none",
        cursor: "pointer",
        // why left 0s? Avoid column header move with transition when left is changed
        // https://github.com/ant-design/ant-design/issues/50588
        transition: `all ${token.motionDurationSlow}, left 0s`,
        "&:hover": {
          background: token.tableHeaderSortHoverBg,
          "&::before": {
            backgroundColor: "transparent !important"
          }
        },
        "&:focus-visible": {
          color: token.colorPrimary
        },
        // https://github.com/ant-design/ant-design/issues/30969
        [`
          &${componentCls}-cell-fix-left:hover,
          &${componentCls}-cell-fix-right:hover
        `]: {
          background: token.tableFixedHeaderSortActiveBg
        }
      },
      [`${componentCls}-thead th${componentCls}-column-sort`]: {
        background: token.tableHeaderSortBg,
        "&::before": {
          backgroundColor: "transparent !important"
        }
      },
      [`td${componentCls}-column-sort`]: {
        background: token.tableBodySortBg
      },
      [`${componentCls}-column-title`]: {
        position: "relative",
        zIndex: 1,
        flex: 1,
        minWidth: 0
      },
      [`${componentCls}-column-sorters`]: {
        display: "flex",
        flex: "auto",
        alignItems: "center",
        justifyContent: "space-between",
        "&::after": {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          content: '""'
        }
      },
      [`${componentCls}-column-sorters-tooltip-target-sorter`]: {
        "&::after": {
          content: "none"
        }
      },
      [`${componentCls}-column-sorter`]: {
        marginInlineStart: marginXXS,
        color: headerIconColor,
        fontSize: 0,
        transition: `color ${token.motionDurationSlow}`,
        "&-inner": {
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center"
        },
        "&-up, &-down": {
          fontSize: fontSizeIcon,
          "&.active": {
            color: token.colorPrimary
          }
        },
        [`${componentCls}-column-sorter-up + ${componentCls}-column-sorter-down`]: {
          marginTop: "-0.3em"
        }
      },
      [`${componentCls}-column-sorters:hover ${componentCls}-column-sorter`]: {
        color: headerIconHoverColor
      }
    }
  };
};
const genStickyStyle = (token) => {
  const {
    componentCls,
    opacityLoading,
    tableScrollThumbBg,
    tableScrollThumbBgHover,
    tableScrollThumbSize,
    tableScrollBg,
    zIndexTableSticky,
    stickyScrollBarBorderRadius,
    lineWidth,
    lineType,
    tableBorderColor
  } = token;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-sticky`]: {
        "&-holder": {
          position: "sticky",
          zIndex: zIndexTableSticky,
          background: token.colorBgContainer
        },
        "&-scroll": {
          position: "sticky",
          bottom: 0,
          height: `${unit(tableScrollThumbSize)} !important`,
          zIndex: zIndexTableSticky,
          display: "flex",
          alignItems: "center",
          background: tableScrollBg,
          borderTop: tableBorder,
          opacity: opacityLoading,
          "&:hover": {
            transformOrigin: "center bottom"
          },
          // fake scrollbar style of sticky
          "&-bar": {
            height: tableScrollThumbSize,
            backgroundColor: tableScrollThumbBg,
            borderRadius: stickyScrollBarBorderRadius,
            transition: `all ${token.motionDurationSlow}, transform 0s`,
            position: "absolute",
            bottom: 0,
            "&:hover, &-active": {
              backgroundColor: tableScrollThumbBgHover
            }
          }
        }
      }
    }
  };
};
const genSummaryStyle = (token) => {
  const {
    componentCls,
    lineWidth,
    tableBorderColor,
    calc
  } = token;
  const tableBorder = `${unit(lineWidth)} ${token.lineType} ${tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: {
      [`${componentCls}-summary`]: {
        position: "relative",
        zIndex: token.zIndexTableFixed,
        background: token.tableBg,
        "> tr": {
          "> th, > td": {
            borderBottom: tableBorder
          }
        }
      },
      [`div${componentCls}-summary`]: {
        boxShadow: `0 ${unit(calc(lineWidth).mul(-1).equal())} 0 ${tableBorderColor}`
      }
    }
  };
};
const genVirtualStyle = (token) => {
  const {
    componentCls,
    motionDurationMid,
    lineWidth,
    lineType,
    tableBorderColor,
    calc
  } = token;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  const rowCellCls = `${componentCls}-expanded-row-cell`;
  return {
    [`${componentCls}-wrapper`]: {
      // ========================== Row ==========================
      [`${componentCls}-tbody-virtual`]: {
        [`${componentCls}-tbody-virtual-holder-inner`]: {
          [`
            & > ${componentCls}-row, 
            & > div:not(${componentCls}-row) > ${componentCls}-row
          `]: {
            display: "flex",
            boxSizing: "border-box",
            width: "100%"
          }
        },
        [`${componentCls}-cell`]: {
          borderBottom: tableBorder,
          transition: `background ${motionDurationMid}`
        },
        [`${componentCls}-expanded-row`]: {
          [`${rowCellCls}${rowCellCls}-fixed`]: {
            position: "sticky",
            insetInlineStart: 0,
            overflow: "hidden",
            width: `calc(var(--virtual-width) - ${unit(lineWidth)})`,
            borderInlineEnd: "none"
          }
        }
      },
      // ======================== Border =========================
      [`${componentCls}-bordered`]: {
        [`${componentCls}-tbody-virtual`]: {
          "&:after": {
            content: '""',
            insetInline: 0,
            bottom: 0,
            borderBottom: tableBorder,
            position: "absolute"
          },
          [`${componentCls}-cell`]: {
            borderInlineEnd: tableBorder,
            [`&${componentCls}-cell-fix-right-first:before`]: {
              content: '""',
              position: "absolute",
              insetBlock: 0,
              insetInlineStart: calc(lineWidth).mul(-1).equal(),
              borderInlineStart: tableBorder
            }
          }
        },
        // Empty placeholder
        [`&${componentCls}-virtual`]: {
          [`${componentCls}-placeholder ${componentCls}-cell`]: {
            borderInlineEnd: tableBorder,
            borderBottom: tableBorder
          }
        }
      }
    }
  };
};
const genTableStyle = (token) => {
  const {
    componentCls,
    fontWeightStrong,
    tablePaddingVertical,
    tablePaddingHorizontal,
    tableExpandColumnWidth,
    lineWidth,
    lineType,
    tableBorderColor,
    tableFontSize,
    tableBg,
    tableRadius,
    tableHeaderTextColor,
    motionDurationMid,
    tableHeaderBg,
    tableHeaderCellSplitColor,
    tableFooterTextColor,
    tableFooterBg,
    calc
  } = token;
  const tableBorder = `${unit(lineWidth)} ${lineType} ${tableBorderColor}`;
  return {
    [`${componentCls}-wrapper`]: Object.assign(Object.assign({
      clear: "both",
      maxWidth: "100%",
      // fix https://github.com/ant-design/ant-design/issues/46177
      ["--rc-virtual-list-scrollbar-bg"]: token.tableScrollBg
    }, clearFix()), {
      [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        fontSize: tableFontSize,
        background: tableBg,
        borderRadius: `${unit(tableRadius)} ${unit(tableRadius)} 0 0`,
        // https://github.com/ant-design/ant-design/issues/47486
        scrollbarColor: `${token.tableScrollThumbBg} ${token.tableScrollBg}`
      }),
      // https://github.com/ant-design/ant-design/issues/17611
      table: {
        width: "100%",
        textAlign: "start",
        borderRadius: `${unit(tableRadius)} ${unit(tableRadius)} 0 0`,
        borderCollapse: "separate",
        borderSpacing: 0
      },
      // ============================= Cell ==============================
      [`
          ${componentCls}-cell,
          ${componentCls}-thead > tr > th,
          ${componentCls}-tbody > tr > th,
          ${componentCls}-tbody > tr > td,
          tfoot > tr > th,
          tfoot > tr > td
        `]: {
        position: "relative",
        padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`,
        overflowWrap: "break-word"
      },
      // ============================ Title =============================
      [`${componentCls}-title`]: {
        padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`
      },
      // ============================ Header ============================
      [`${componentCls}-thead`]: {
        [`
          > tr > th,
          > tr > td
        `]: {
          position: "relative",
          color: tableHeaderTextColor,
          fontWeight: fontWeightStrong,
          textAlign: "start",
          background: tableHeaderBg,
          borderBottom: tableBorder,
          transition: `background ${motionDurationMid} ease`,
          "&[colspan]:not([colspan='1'])": {
            textAlign: "center"
          },
          [`&:not(:last-child):not(${componentCls}-selection-column):not(${componentCls}-row-expand-icon-cell):not([colspan])::before`]: {
            position: "absolute",
            top: "50%",
            insetInlineEnd: 0,
            width: 1,
            height: "1.6em",
            backgroundColor: tableHeaderCellSplitColor,
            transform: "translateY(-50%)",
            transition: `background-color ${motionDurationMid}`,
            content: '""'
          }
        },
        "> tr:not(:last-child) > th[colspan]": {
          borderBottom: 0
        }
      },
      // ============================ Body ============================
      [`${componentCls}-tbody`]: {
        "> tr": {
          "> th, > td": {
            transition: `background ${motionDurationMid}, border-color ${motionDurationMid}`,
            borderBottom: tableBorder,
            // ========================= Nest Table ===========================
            [`
              > ${componentCls}-wrapper:only-child,
              > ${componentCls}-expanded-row-fixed > ${componentCls}-wrapper:only-child
            `]: {
              [componentCls]: {
                marginBlock: unit(calc(tablePaddingVertical).mul(-1).equal()),
                marginInline: `${unit(calc(tableExpandColumnWidth).sub(tablePaddingHorizontal).equal())}
                ${unit(calc(tablePaddingHorizontal).mul(-1).equal())}`,
                [`${componentCls}-tbody > tr:last-child > td`]: {
                  borderBottomWidth: 0,
                  "&:first-child, &:last-child": {
                    borderRadius: 0
                  }
                }
              }
            }
          },
          "> th": {
            position: "relative",
            color: tableHeaderTextColor,
            fontWeight: fontWeightStrong,
            textAlign: "start",
            background: tableHeaderBg,
            borderBottom: tableBorder,
            transition: `background ${motionDurationMid} ease`
          },
          // measure cell styles
          [`& > ${componentCls}-measure-cell`]: {
            paddingBlock: `0 !important`,
            borderBlock: `0 !important`,
            [`${componentCls}-measure-cell-content`]: {
              height: 0,
              overflow: "hidden",
              pointerEvents: "none"
            }
          }
        }
      },
      // ============================ Footer ============================
      [`${componentCls}-footer`]: {
        padding: `${unit(tablePaddingVertical)} ${unit(tablePaddingHorizontal)}`,
        color: tableFooterTextColor,
        background: tableFooterBg
      }
    })
  };
};
const prepareComponentToken = (token) => {
  const {
    colorFillAlter,
    colorBgContainer,
    colorTextHeading,
    colorFillSecondary,
    colorFillContent,
    controlItemBgActive,
    controlItemBgActiveHover,
    padding,
    paddingSM,
    paddingXS,
    colorBorderSecondary,
    borderRadiusLG,
    controlHeight,
    colorTextPlaceholder,
    fontSize,
    fontSizeSM,
    lineHeight,
    lineWidth,
    colorIcon,
    colorIconHover,
    opacityLoading,
    controlInteractiveSize
  } = token;
  const colorFillSecondarySolid = new FastColor(colorFillSecondary).onBackground(colorBgContainer).toHexString();
  const colorFillContentSolid = new FastColor(colorFillContent).onBackground(colorBgContainer).toHexString();
  const colorFillAlterSolid = new FastColor(colorFillAlter).onBackground(colorBgContainer).toHexString();
  const baseColorAction = new FastColor(colorIcon);
  const baseColorActionHover = new FastColor(colorIconHover);
  const expandIconHalfInner = controlInteractiveSize / 2 - lineWidth;
  const expandIconSize = expandIconHalfInner * 2 + lineWidth * 3;
  return {
    headerBg: colorFillAlterSolid,
    headerColor: colorTextHeading,
    headerSortActiveBg: colorFillSecondarySolid,
    headerSortHoverBg: colorFillContentSolid,
    bodySortBg: colorFillAlterSolid,
    rowHoverBg: colorFillAlterSolid,
    rowSelectedBg: controlItemBgActive,
    rowSelectedHoverBg: controlItemBgActiveHover,
    rowExpandedBg: colorFillAlter,
    cellPaddingBlock: padding,
    cellPaddingInline: padding,
    cellPaddingBlockMD: paddingSM,
    cellPaddingInlineMD: paddingXS,
    cellPaddingBlockSM: paddingXS,
    cellPaddingInlineSM: paddingXS,
    borderColor: colorBorderSecondary,
    headerBorderRadius: borderRadiusLG,
    footerBg: colorFillAlterSolid,
    footerColor: colorTextHeading,
    cellFontSize: fontSize,
    cellFontSizeMD: fontSize,
    cellFontSizeSM: fontSize,
    headerSplitColor: colorBorderSecondary,
    fixedHeaderSortActiveBg: colorFillSecondarySolid,
    headerFilterHoverBg: colorFillContent,
    filterDropdownMenuBg: colorBgContainer,
    filterDropdownBg: colorBgContainer,
    expandIconBg: colorBgContainer,
    selectionColumnWidth: controlHeight,
    stickyScrollBarBg: colorTextPlaceholder,
    stickyScrollBarBorderRadius: 100,
    expandIconMarginTop: (fontSize * lineHeight - lineWidth * 3) / 2 - Math.ceil((fontSizeSM * 1.4 - lineWidth * 3) / 2),
    headerIconColor: baseColorAction.clone().setA(baseColorAction.a * opacityLoading).toRgbString(),
    headerIconHoverColor: baseColorActionHover.clone().setA(baseColorActionHover.a * opacityLoading).toRgbString(),
    expandIconHalfInner,
    expandIconSize,
    expandIconScale: controlInteractiveSize / expandIconSize
  };
};
const zIndexTableFixed = 2;
const useStyle = genStyleHooks("Table", (token) => {
  const {
    colorTextHeading,
    colorSplit,
    colorBgContainer,
    controlInteractiveSize: checkboxSize,
    headerBg,
    headerColor,
    headerSortActiveBg,
    headerSortHoverBg,
    bodySortBg,
    rowHoverBg,
    rowSelectedBg,
    rowSelectedHoverBg,
    rowExpandedBg,
    cellPaddingBlock,
    cellPaddingInline,
    cellPaddingBlockMD,
    cellPaddingInlineMD,
    cellPaddingBlockSM,
    cellPaddingInlineSM,
    borderColor,
    footerBg,
    footerColor,
    headerBorderRadius,
    cellFontSize,
    cellFontSizeMD,
    cellFontSizeSM,
    headerSplitColor,
    fixedHeaderSortActiveBg,
    headerFilterHoverBg,
    filterDropdownBg,
    expandIconBg,
    selectionColumnWidth,
    stickyScrollBarBg,
    calc
  } = token;
  const tableToken = merge(token, {
    tableFontSize: cellFontSize,
    tableBg: colorBgContainer,
    tableRadius: headerBorderRadius,
    tablePaddingVertical: cellPaddingBlock,
    tablePaddingHorizontal: cellPaddingInline,
    tablePaddingVerticalMiddle: cellPaddingBlockMD,
    tablePaddingHorizontalMiddle: cellPaddingInlineMD,
    tablePaddingVerticalSmall: cellPaddingBlockSM,
    tablePaddingHorizontalSmall: cellPaddingInlineSM,
    tableBorderColor: borderColor,
    tableHeaderTextColor: headerColor,
    tableHeaderBg: headerBg,
    tableFooterTextColor: footerColor,
    tableFooterBg: footerBg,
    tableHeaderCellSplitColor: headerSplitColor,
    tableHeaderSortBg: headerSortActiveBg,
    tableHeaderSortHoverBg: headerSortHoverBg,
    tableBodySortBg: bodySortBg,
    tableFixedHeaderSortActiveBg: fixedHeaderSortActiveBg,
    tableHeaderFilterActiveBg: headerFilterHoverBg,
    tableFilterDropdownBg: filterDropdownBg,
    tableRowHoverBg: rowHoverBg,
    tableSelectedRowBg: rowSelectedBg,
    tableSelectedRowHoverBg: rowSelectedHoverBg,
    zIndexTableFixed,
    zIndexTableSticky: calc(zIndexTableFixed).add(1).equal({
      unit: false
    }),
    tableFontSizeMiddle: cellFontSizeMD,
    tableFontSizeSmall: cellFontSizeSM,
    tableSelectionColumnWidth: selectionColumnWidth,
    tableExpandIconBg: expandIconBg,
    tableExpandColumnWidth: calc(checkboxSize).add(calc(token.padding).mul(2)).equal(),
    tableExpandedRowBg: rowExpandedBg,
    // Dropdown
    tableFilterDropdownWidth: 120,
    tableFilterDropdownHeight: 264,
    tableFilterDropdownSearchWidth: 140,
    // Virtual Scroll Bar
    tableScrollThumbSize: 8,
    // Mac scroll bar size
    tableScrollThumbBg: stickyScrollBarBg,
    tableScrollThumbBgHover: colorTextHeading,
    tableScrollBg: colorSplit
  });
  return [genTableStyle(tableToken), genPaginationStyle(tableToken), genSummaryStyle(tableToken), genSorterStyle(tableToken), genFilterStyle(tableToken), genBorderedStyle(tableToken), genRadiusStyle(tableToken), genExpandStyle(tableToken), genSummaryStyle(tableToken), genEmptyStyle(tableToken), genSelectionStyle(tableToken), genFixedStyle(tableToken), genStickyStyle(tableToken), genEllipsisStyle(tableToken), genSizeStyle(tableToken), genStyle(tableToken), genVirtualStyle(tableToken)];
}, prepareComponentToken, {
  unitless: {
    expandIconScale: true
  }
});
const EMPTY_LIST = [];
const InternalTable = (props, ref) => {
  var _a, _b;
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    size: customizeSize,
    bordered,
    dropdownPrefixCls: customizeDropdownPrefixCls,
    dataSource,
    pagination,
    rowSelection,
    rowKey = "key",
    rowClassName,
    columns,
    children,
    childrenColumnName: legacyChildrenColumnName,
    onChange,
    getPopupContainer,
    loading,
    expandIcon,
    expandable,
    expandedRowRender,
    expandIconColumnIndex,
    indentSize,
    scroll,
    sortDirections,
    locale: locale2,
    showSorterTooltip = {
      target: "full-header"
    },
    virtual
  } = props;
  devUseWarning();
  const baseColumns = reactExports.useMemo(() => columns || convertChildrenToColumns(children), [columns, children]);
  const needResponsive = reactExports.useMemo(() => baseColumns.some((col) => col.responsive), [baseColumns]);
  const screens = useBreakpoint(needResponsive);
  const mergedColumns = reactExports.useMemo(() => {
    const matched = new Set(Object.keys(screens).filter((m) => screens[m]));
    return baseColumns.filter((c) => !c.responsive || c.responsive.some((r) => matched.has(r)));
  }, [baseColumns, screens]);
  const tableProps = omit(props, ["className", "style", "columns"]);
  const {
    locale: contextLocale = localeValues,
    direction,
    table,
    renderEmpty,
    getPrefixCls,
    getPopupContainer: getContextPopupContainer
  } = reactExports.useContext(ConfigContext);
  const mergedSize = useSize(customizeSize);
  const tableLocale = Object.assign(Object.assign({}, contextLocale.Table), locale2);
  const rawData = dataSource || EMPTY_LIST;
  const prefixCls = getPrefixCls("table", customizePrefixCls);
  const dropdownPrefixCls = getPrefixCls("dropdown", customizeDropdownPrefixCls);
  const [, token] = useToken();
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const mergedExpandable = Object.assign(Object.assign({
    childrenColumnName: legacyChildrenColumnName,
    expandIconColumnIndex
  }, expandable), {
    expandIcon: (_a = expandable === null || expandable === void 0 ? void 0 : expandable.expandIcon) !== null && _a !== void 0 ? _a : (_b = table === null || table === void 0 ? void 0 : table.expandable) === null || _b === void 0 ? void 0 : _b.expandIcon
  });
  const {
    childrenColumnName = "children"
  } = mergedExpandable;
  const expandType = reactExports.useMemo(() => {
    if (rawData.some((item) => item === null || item === void 0 ? void 0 : item[childrenColumnName])) {
      return "nest";
    }
    if (expandedRowRender || (expandable === null || expandable === void 0 ? void 0 : expandable.expandedRowRender)) {
      return "row";
    }
    return null;
  }, [rawData]);
  const internalRefs = {
    body: reactExports.useRef(null)
  };
  const getContainerWidth = useContainerWidth(prefixCls);
  const rootRef = reactExports.useRef(null);
  const tblRef = reactExports.useRef(null);
  useProxyImperativeHandle(ref, () => Object.assign(Object.assign({}, tblRef.current), {
    nativeElement: rootRef.current
  }));
  const getRowKey = reactExports.useMemo(() => {
    if (typeof rowKey === "function") {
      return rowKey;
    }
    return (record) => record === null || record === void 0 ? void 0 : record[rowKey];
  }, [rowKey]);
  const [getRecordByKey] = useLazyKVMap(rawData, childrenColumnName, getRowKey);
  const changeEventInfo = {};
  const triggerOnChange = (info, action, reset = false) => {
    var _a2, _b2, _c, _d;
    const changeInfo = Object.assign(Object.assign({}, changeEventInfo), info);
    if (reset) {
      (_a2 = changeEventInfo.resetPagination) === null || _a2 === void 0 ? void 0 : _a2.call(changeEventInfo);
      if ((_b2 = changeInfo.pagination) === null || _b2 === void 0 ? void 0 : _b2.current) {
        changeInfo.pagination.current = 1;
      }
      if (pagination) {
        (_c = pagination.onChange) === null || _c === void 0 ? void 0 : _c.call(pagination, 1, (_d = changeInfo.pagination) === null || _d === void 0 ? void 0 : _d.pageSize);
      }
    }
    if (scroll && scroll.scrollToFirstRowOnChange !== false && internalRefs.body.current) {
      scrollTo(0, {
        getContainer: () => internalRefs.body.current
      });
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(changeInfo.pagination, changeInfo.filters, changeInfo.sorter, {
      currentDataSource: getFilterData(getSortData(rawData, changeInfo.sorterStates, childrenColumnName), changeInfo.filterStates, childrenColumnName),
      action
    });
  };
  const onSorterChange = (sorter, sorterStates) => {
    triggerOnChange({
      sorter,
      sorterStates
    }, "sort", false);
  };
  const [transformSorterColumns, sortStates, sorterTitleProps, getSorters] = useFilterSorter({
    prefixCls,
    mergedColumns,
    onSorterChange,
    sortDirections: sortDirections || ["ascend", "descend"],
    tableLocale,
    showSorterTooltip
  });
  const sortedData = reactExports.useMemo(() => getSortData(rawData, sortStates, childrenColumnName), [rawData, sortStates]);
  changeEventInfo.sorter = getSorters();
  changeEventInfo.sorterStates = sortStates;
  const onFilterChange = (filters2, filterStates2) => {
    triggerOnChange({
      filters: filters2,
      filterStates: filterStates2
    }, "filter", true);
  };
  const [transformFilterColumns, filterStates, filters] = useFilter({
    prefixCls,
    locale: tableLocale,
    dropdownPrefixCls,
    mergedColumns,
    onFilterChange,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    rootClassName: classNames(rootClassName, rootCls)
  });
  const mergedData = getFilterData(sortedData, filterStates, childrenColumnName);
  changeEventInfo.filters = filters;
  changeEventInfo.filterStates = filterStates;
  const columnTitleProps = reactExports.useMemo(() => {
    const mergedFilters = {};
    Object.keys(filters).forEach((filterKey) => {
      if (filters[filterKey] !== null) {
        mergedFilters[filterKey] = filters[filterKey];
      }
    });
    return Object.assign(Object.assign({}, sorterTitleProps), {
      filters: mergedFilters
    });
  }, [sorterTitleProps, filters]);
  const [transformTitleColumns] = useTitleColumns(columnTitleProps);
  const onPaginationChange = (current, pageSize) => {
    triggerOnChange({
      pagination: Object.assign(Object.assign({}, changeEventInfo.pagination), {
        current,
        pageSize
      })
    }, "paginate");
  };
  const [mergedPagination, resetPagination] = usePagination(mergedData.length, onPaginationChange, pagination);
  changeEventInfo.pagination = pagination === false ? {} : getPaginationParam(mergedPagination, pagination);
  changeEventInfo.resetPagination = resetPagination;
  const pageData = reactExports.useMemo(() => {
    if (pagination === false || !mergedPagination.pageSize) {
      return mergedData;
    }
    const {
      current = 1,
      total,
      pageSize = DEFAULT_PAGE_SIZE
    } = mergedPagination;
    if (mergedData.length < total) {
      if (mergedData.length > pageSize) {
        return mergedData.slice((current - 1) * pageSize, current * pageSize);
      }
      return mergedData;
    }
    return mergedData.slice((current - 1) * pageSize, current * pageSize);
  }, [!!pagination, mergedData, mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.current, mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.pageSize, mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.total]);
  const [transformSelectionColumns, selectedKeySet] = useSelection({
    prefixCls,
    data: mergedData,
    pageData,
    getRowKey,
    getRecordByKey,
    expandType,
    childrenColumnName,
    locale: tableLocale,
    getPopupContainer: getPopupContainer || getContextPopupContainer
  }, rowSelection);
  const internalRowClassName = (record, index, indent) => {
    let mergedRowClassName;
    if (typeof rowClassName === "function") {
      mergedRowClassName = classNames(rowClassName(record, index, indent));
    } else {
      mergedRowClassName = classNames(rowClassName);
    }
    return classNames({
      [`${prefixCls}-row-selected`]: selectedKeySet.has(getRowKey(record, index))
    }, mergedRowClassName);
  };
  mergedExpandable.__PARENT_RENDER_ICON__ = mergedExpandable.expandIcon;
  mergedExpandable.expandIcon = mergedExpandable.expandIcon || expandIcon || renderExpandIcon(tableLocale);
  if (expandType === "nest" && mergedExpandable.expandIconColumnIndex === void 0) {
    mergedExpandable.expandIconColumnIndex = rowSelection ? 1 : 0;
  } else if (mergedExpandable.expandIconColumnIndex > 0 && rowSelection) {
    mergedExpandable.expandIconColumnIndex -= 1;
  }
  if (typeof mergedExpandable.indentSize !== "number") {
    mergedExpandable.indentSize = typeof indentSize === "number" ? indentSize : 15;
  }
  const transformColumns = reactExports.useCallback((innerColumns) => transformTitleColumns(transformSelectionColumns(transformFilterColumns(transformSorterColumns(innerColumns)))), [transformSorterColumns, transformFilterColumns, transformSelectionColumns]);
  const getPaginationNodes = () => {
    if (pagination === false || !(mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.total)) {
      return {};
    }
    const getPaginationSize = () => mergedPagination.size || (mergedSize === "small" || mergedSize === "middle" ? "small" : void 0);
    const renderPagination = (position) => {
      const align = position === "left" ? "start" : position === "right" ? "end" : position;
      return /* @__PURE__ */ reactExports.createElement(Pagination, Object.assign({}, mergedPagination, {
        align: mergedPagination.align || align,
        className: classNames(`${prefixCls}-pagination`, mergedPagination.className),
        size: getPaginationSize()
      }));
    };
    const defaultPosition = direction === "rtl" ? "left" : "right";
    const positions = mergedPagination.position;
    if (positions === null || !Array.isArray(positions)) {
      return {
        bottom: renderPagination(defaultPosition)
      };
    }
    const topPosition = positions.find((pos) => typeof pos === "string" && pos.toLowerCase().includes("top"));
    const bottomPosition = positions.find((pos) => typeof pos === "string" && pos.toLowerCase().includes("bottom"));
    const isNone = positions.every((pos) => `${pos}` === "none");
    const topAlign = topPosition ? topPosition.toLowerCase().replace("top", "") : "";
    const bottomAlign = bottomPosition ? bottomPosition.toLowerCase().replace("bottom", "") : "";
    const shouldDefaultBottom = !topPosition && !bottomPosition && !isNone;
    const renderTop = () => topAlign ? renderPagination(topAlign) : void 0;
    const renderBottom = () => {
      if (bottomAlign) {
        return renderPagination(bottomAlign);
      }
      if (shouldDefaultBottom) {
        return renderPagination(defaultPosition);
      }
      return void 0;
    };
    return {
      top: renderTop(),
      bottom: renderBottom()
    };
  };
  const spinProps = reactExports.useMemo(() => {
    if (typeof loading === "boolean") {
      return {
        spinning: loading
      };
    } else if (typeof loading === "object" && loading !== null) {
      return Object.assign({
        spinning: true
      }, loading);
    } else {
      return void 0;
    }
  }, [loading]);
  const wrapperClassNames = classNames(cssVarCls, rootCls, `${prefixCls}-wrapper`, table === null || table === void 0 ? void 0 : table.className, {
    [`${prefixCls}-wrapper-rtl`]: direction === "rtl"
  }, className, rootClassName, hashId);
  const mergedStyle = Object.assign(Object.assign({}, table === null || table === void 0 ? void 0 : table.style), style);
  const mergedEmptyNode = reactExports.useMemo(() => {
    if ((spinProps === null || spinProps === void 0 ? void 0 : spinProps.spinning) && rawData === EMPTY_LIST) {
      return null;
    }
    if (typeof (locale2 === null || locale2 === void 0 ? void 0 : locale2.emptyText) !== "undefined") {
      return locale2.emptyText;
    }
    return (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty("Table")) || /* @__PURE__ */ reactExports.createElement(DefaultRenderEmpty, {
      componentName: "Table"
    });
  }, [spinProps === null || spinProps === void 0 ? void 0 : spinProps.spinning, rawData, locale2 === null || locale2 === void 0 ? void 0 : locale2.emptyText, renderEmpty]);
  const TableComponent = virtual ? RcVirtualTable : RcTable;
  const virtualProps = {};
  const listItemHeight = reactExports.useMemo(() => {
    const {
      fontSize,
      lineHeight,
      lineWidth,
      padding,
      paddingXS,
      paddingSM
    } = token;
    const fontHeight = Math.floor(fontSize * lineHeight);
    switch (mergedSize) {
      case "middle":
        return paddingSM * 2 + fontHeight + lineWidth;
      case "small":
        return paddingXS * 2 + fontHeight + lineWidth;
      default:
        return padding * 2 + fontHeight + lineWidth;
    }
  }, [token, mergedSize]);
  if (virtual) {
    virtualProps.listItemHeight = listItemHeight;
  }
  const {
    top: topPaginationNode,
    bottom: bottomPaginationNode
  } = getPaginationNodes();
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
    ref: rootRef,
    className: wrapperClassNames,
    style: mergedStyle
  }, /* @__PURE__ */ reactExports.createElement(Spin, Object.assign({
    spinning: false
  }, spinProps), topPaginationNode, /* @__PURE__ */ reactExports.createElement(TableComponent, Object.assign({}, virtualProps, tableProps, {
    ref: tblRef,
    columns: mergedColumns,
    direction,
    expandable: mergedExpandable,
    prefixCls,
    className: classNames({
      [`${prefixCls}-middle`]: mergedSize === "middle",
      [`${prefixCls}-small`]: mergedSize === "small",
      [`${prefixCls}-bordered`]: bordered,
      [`${prefixCls}-empty`]: rawData.length === 0
    }, cssVarCls, rootCls, hashId),
    data: pageData,
    rowKey: getRowKey,
    rowClassName: internalRowClassName,
    emptyText: mergedEmptyNode,
    // Internal
    internalHooks: INTERNAL_HOOKS,
    internalRefs,
    transformColumns,
    getContainerWidth,
    measureRowRender: (measureRow) => /* @__PURE__ */ reactExports.createElement(ConfigProvider, {
      getPopupContainer: (node) => node
    }, measureRow)
  })), bottomPaginationNode)));
};
const InternalTable$1 = /* @__PURE__ */ reactExports.forwardRef(InternalTable);
const Table = (props, ref) => {
  const renderTimesRef = reactExports.useRef(0);
  renderTimesRef.current += 1;
  return /* @__PURE__ */ reactExports.createElement(InternalTable$1, Object.assign({}, props, {
    ref,
    _renderTimes: renderTimesRef.current
  }));
};
const ForwardTable = /* @__PURE__ */ reactExports.forwardRef(Table);
ForwardTable.SELECTION_COLUMN = SELECTION_COLUMN;
ForwardTable.EXPAND_COLUMN = EXPAND_COLUMN;
ForwardTable.SELECTION_ALL = SELECTION_ALL;
ForwardTable.SELECTION_INVERT = SELECTION_INVERT;
ForwardTable.SELECTION_NONE = SELECTION_NONE;
ForwardTable.Column = Column;
ForwardTable.ColumnGroup = ColumnGroup;
ForwardTable.Summary = FooterComponents;
export {
  Checkbox as C,
  Dropdown as D,
  ForwardTable as F
};
