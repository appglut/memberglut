import { et as wrapperRaf, az as _toConsumableArray, cP as genStyleHooks, V as React, l as ConfigContext, aG as classNames, a4 as RefResizeObserver, dB as reactExports, dr as merge, dP as unit, dE as resetComponent, dL as textEllipsis, dV as useComponentConfig, dR as useCSSVarCls, dY as useEvent, I as Icon$1, an as _extends, du as omit, C as CSSMotion, aI as cloneElement, G as Keyframe, dw as pickAttrs, cH as genFocusStyle, dM as toArray$1, x as FormItemInputContext, e5 as useMergedState, e3 as useLocale, dn as locale, aH as clearFix, eh as useVariant, ed as useSize, a6 as Skeleton, as as _objectSpread2, ap as _inherits, ak as _createClass, aj as _classCallCheck, am as _defineProperty, ao as _getPrototypeOf, av as _possibleConstructorReturn, aq as _isNativeReflectConstruct, aA as _typeof, da as index$2, at as _objectWithoutProperties, c_ as getDefaultExportFromCjs, ax as _slicedToArray, K as KeyCode, Y as RefIcon$e, Z as RefIcon$g, cA as genCompactItemStyle, cB as genComponentStyleHook, r as DisabledContext, dU as useCompactItemContext, ej as useZIndex, d5 as getStatusClassNames, d7 as getTransitionName, d0 as getMergedStatus, df as initMotion, dd as initFadeMotion, aK as composeRef, _ as RefIcon$h, R as Portal, di as isEqual, q as DialogWrap, F as FastColor, cL as genModalMaskStyle, dg as initZoomMotion, ds as mergeProps, B as BaseInput, de as initInputToken, cw as genBasicInputStyle, cN as genOutlinedStyle, cF as genFilledStyle, cx as genBorderlessStyle, cR as genUnderlinedStyle, cO as genPlaceholderStyle, cD as genDisabledStyle, dc as initComponentToken, cW as getAllowClear, T as PurePanel$7, e6 as useMessage, es as wrapPromiseFn, dQ as unstableSetRender, m as ConfigProvider, d8 as globalConfig, c as AppConfigContext, d$ as useInternalMessage, U as PurePanel$8, e8 as useNotification, e0 as useInternalNotification, aB as _unsupportedIterableToArray, d as Button$1, eg as useToken$1, $ as RefIcon$j, a0 as RefIcon$k, a1 as RefIcon$l, e1 as useLayoutEffect, cG as genFocusOutline, aO as createTheme, aS as defaultTheme, dH as seedToken, cY as getComputedToken, ct as formatToken, aT as derivative$2, cI as genFontMapToken, cC as genControlHeight, cS as generate, aR as defaultPresetColors, cz as genColorMapToken, D as DesignTokenContext, aQ as defaultConfig, d_ as useId$1, dq as localeValues, dS as useClosable$1, eu as zIndexContext, E as Input, a2 as RefIcon$p, dv as operationUnit, dF as resetIcon, em as warningOnce, e4 as useMemo, d9 as gold, al as _createSuper, aF as canUseDom, ad as WatermarkContext, b as App, f as Collapse, t as Drawer, ek as version, au as _pg, dz as queryArg, dm as link, aa as THEME, a8 as StatusBadge, a7 as StatCard, O as PageHeader, P as Page, u as FontAwesomeIcon, ar as _n, ag as __, aN as createRoot } from "./client-CTTyQOnd.js";
import { A as Alert } from "./index-DBTNcr8l.js";
import { Q as e, Z as genPresetColor, aB as isPresetColor, g as RefIcon$d, S as Select, G as Group$1, a as Button, b8 as useBaseProps, be as useId, B as BaseSelect, D as DefaultRenderEmpty, bg as useSelectStyle, bf as usePopupRender, bh as useShowArrow, bd as useIcons, aG as mergedBuiltinPlacements, _ as genPurePanel, aC as isPresetSize, T as Tooltip, d as ExportMenu, e as MenuItem, l as Trigger, h as RefIcon$n, M as MAX_VERTICAL_CONTENT_RADIUS, a1 as getArrowStyle, a0 as getArrowOffsetToken, a2 as getArrowToken, bi as withPureRenderTheme, ah as getPlacements$1, E as Empty, R as Radio, j as Space, q as api } from "./api-BoF1RtIE.js";
import { i as getScroll$1, s as scrollTo, a as Dropdown, g as convertDataToEntities, f as conductCheck, R as RefIcon$f, j as getStyle$1, e as addEventListenerWrap, S as Sider, m as useStyle$o, L as LayoutContext, b as SiderContext, P as Pagination, C as Checkbox$1, D as Dropdown$1, u as useMultipleSelect, U as UnstableContext, T as Tree, k as initComponentToken$1, h as genTreeStyle, c as SwitcherIconCom, l as isStyleSupport, M as Menu, F as ForwardTable, d as Tree$1 } from "./Table-DscmDL3I.js";
import { A as AutoComplete } from "./index-BgqMaPE8.js";
import { A as Avatar } from "./index-BjzJaiPN.js";
import { b as initPickerPanelToken, g as genPanelStyle$1, i as initPanelComponentToken, R as RefPanelPicker, a as generateConfig, D as DatePicker } from "./index-DLAXZnY0.js";
import { T as Tabs } from "./index-BedyQTUQ.js";
import { d as debounce, S as Spin } from "./index-n8Z4Xk8Z.js";
import { u as useBreakpoint$1, b as responsiveArray } from "./useBreakpoint-CN6HiEl_.js";
import { C as ColorPicker, D as Divider, c as Slider$1, U as UNITS, d as SmartTags, a as CopyCode, F as FieldControl, b as FieldRows, S as SettingsPanel } from "./SettingsPanel-CL4JwW_5.js";
import { D as Descriptions, T as Timeline } from "./Timeline-BZkA49tz.js";
import { c as convertToTooltipProps, C as Col, R as Row, F as Form } from "./index-Cb3PZqfZ.js";
import { R as RefIcon$i, T as TextArea, a as TextArea$1, I as Input$1 } from "./index-D-VkJOw2.js";
import { R as RefIcon$m, T as TypedInputNumber } from "./index-C6h9-TWP.js";
import { M as Modal } from "./index-BYeBYKdc.js";
import { P as Popconfirm } from "./index-CmZYsh7n.js";
import { R as RawPurePanel, P as Popover } from "./index-d8vYGx8q.js";
import { P as Progress } from "./progress-Dds9qb8O.js";
import { S as Segmented } from "./index-BoUobS93.js";
import { S as Switch } from "./index-DNVHX8xZ.js";
import { T as Tag } from "./index-42CDOxMR.js";
import { R as RefIcon$o, U as Upload } from "./index-B04HEf0N.js";
import { l as lookups, d as dayjs } from "./lookups-2moJUDPH.js";
import { s as sprintf } from "./sprintf-DmNrJSYG.js";
import { U as UserSearch } from "./UserSearch-BeTAvkOP.js";
import { f as format$1 } from "./format-CXuEAMXg.js";
function throttleByAnimationFrame(fn) {
  let requestId = null;
  const later = (args) => () => {
    requestId = null;
    fn.apply(void 0, _toConsumableArray(args));
  };
  const throttled = (...args) => {
    if (requestId === null) {
      requestId = wrapperRaf(later(args));
    }
  };
  throttled.cancel = () => {
    wrapperRaf.cancel(requestId);
    requestId = null;
  };
  return throttled;
}
const genSharedAffixStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      position: "fixed",
      zIndex: token.zIndexPopup
    }
  };
};
const prepareComponentToken$m = (token) => ({
  zIndexPopup: token.zIndexBase + 10
});
const useStyle$n = genStyleHooks("Affix", genSharedAffixStyle, prepareComponentToken$m);
function getTargetRect(target) {
  return target !== window ? target.getBoundingClientRect() : {
    top: 0,
    bottom: window.innerHeight
  };
}
function getFixedTop(placeholderRect, targetRect, offsetTop) {
  if (offsetTop !== void 0 && Math.round(targetRect.top) > Math.round(placeholderRect.top) - offsetTop) {
    return offsetTop + targetRect.top;
  }
  return void 0;
}
function getFixedBottom(placeholderRect, targetRect, offsetBottom) {
  if (offsetBottom !== void 0 && Math.round(targetRect.bottom) < Math.round(placeholderRect.bottom) + offsetBottom) {
    const targetBottomOffset = window.innerHeight - targetRect.bottom;
    return offsetBottom + targetBottomOffset;
  }
  return void 0;
}
var __rest$D = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const TRIGGER_EVENTS = ["resize", "scroll", "touchstart", "touchmove", "touchend", "pageshow", "load"];
function getDefaultTarget() {
  return typeof window !== "undefined" ? window : null;
}
const AFFIX_STATUS_NONE = 0;
const AFFIX_STATUS_PREPARE = 1;
const Affix = /* @__PURE__ */ React.forwardRef((props, ref) => {
  var _a;
  const {
    style,
    offsetTop,
    offsetBottom,
    prefixCls,
    className,
    rootClassName,
    children,
    target,
    onChange,
    onTestUpdatePosition
  } = props, restProps = __rest$D(props, ["style", "offsetTop", "offsetBottom", "prefixCls", "className", "rootClassName", "children", "target", "onChange", "onTestUpdatePosition"]);
  const {
    getPrefixCls,
    getTargetContainer
  } = React.useContext(ConfigContext);
  const affixPrefixCls = getPrefixCls("affix", prefixCls);
  const [lastAffix, setLastAffix] = React.useState(false);
  const [affixStyle, setAffixStyle] = React.useState();
  const [placeholderStyle, setPlaceholderStyle] = React.useState();
  const status = React.useRef(AFFIX_STATUS_NONE);
  const prevTarget = React.useRef(null);
  const prevListener = React.useRef(null);
  const placeholderNodeRef = React.useRef(null);
  const fixedNodeRef = React.useRef(null);
  const timer = React.useRef(null);
  const targetFunc = (_a = target !== null && target !== void 0 ? target : getTargetContainer) !== null && _a !== void 0 ? _a : getDefaultTarget;
  const internalOffsetTop = offsetBottom === void 0 && offsetTop === void 0 ? 0 : offsetTop;
  const measure = () => {
    if (status.current !== AFFIX_STATUS_PREPARE || !fixedNodeRef.current || !placeholderNodeRef.current || !targetFunc) {
      return;
    }
    const targetNode = targetFunc();
    if (targetNode) {
      const newState = {
        status: AFFIX_STATUS_NONE
      };
      const placeholderRect = getTargetRect(placeholderNodeRef.current);
      if (placeholderRect.top === 0 && placeholderRect.left === 0 && placeholderRect.width === 0 && placeholderRect.height === 0) {
        return;
      }
      const targetRect = getTargetRect(targetNode);
      const fixedTop = getFixedTop(placeholderRect, targetRect, internalOffsetTop);
      const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom);
      if (fixedTop !== void 0) {
        newState.affixStyle = {
          position: "fixed",
          top: fixedTop,
          width: placeholderRect.width,
          height: placeholderRect.height
        };
        newState.placeholderStyle = {
          width: placeholderRect.width,
          height: placeholderRect.height
        };
      } else if (fixedBottom !== void 0) {
        newState.affixStyle = {
          position: "fixed",
          bottom: fixedBottom,
          width: placeholderRect.width,
          height: placeholderRect.height
        };
        newState.placeholderStyle = {
          width: placeholderRect.width,
          height: placeholderRect.height
        };
      }
      newState.lastAffix = !!newState.affixStyle;
      if (lastAffix !== newState.lastAffix) {
        onChange === null || onChange === void 0 ? void 0 : onChange(newState.lastAffix);
      }
      status.current = newState.status;
      setAffixStyle(newState.affixStyle);
      setPlaceholderStyle(newState.placeholderStyle);
      setLastAffix(newState.lastAffix);
    }
  };
  const prepareMeasure = () => {
    status.current = AFFIX_STATUS_PREPARE;
    measure();
  };
  const updatePosition = throttleByAnimationFrame(() => {
    prepareMeasure();
  });
  const lazyUpdatePosition = throttleByAnimationFrame(() => {
    if (targetFunc && affixStyle) {
      const targetNode = targetFunc();
      if (targetNode && placeholderNodeRef.current) {
        const targetRect = getTargetRect(targetNode);
        const placeholderRect = getTargetRect(placeholderNodeRef.current);
        const fixedTop = getFixedTop(placeholderRect, targetRect, internalOffsetTop);
        const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom);
        if (fixedTop !== void 0 && affixStyle.top === fixedTop || fixedBottom !== void 0 && affixStyle.bottom === fixedBottom) {
          return;
        }
      }
    }
    prepareMeasure();
  });
  const addListeners = () => {
    const listenerTarget = targetFunc === null || targetFunc === void 0 ? void 0 : targetFunc();
    if (!listenerTarget) {
      return;
    }
    TRIGGER_EVENTS.forEach((eventName) => {
      var _a2;
      if (prevListener.current) {
        (_a2 = prevTarget.current) === null || _a2 === void 0 ? void 0 : _a2.removeEventListener(eventName, prevListener.current);
      }
      listenerTarget === null || listenerTarget === void 0 ? void 0 : listenerTarget.addEventListener(eventName, lazyUpdatePosition);
    });
    prevTarget.current = listenerTarget;
    prevListener.current = lazyUpdatePosition;
  };
  const removeListeners = () => {
    const newTarget = targetFunc === null || targetFunc === void 0 ? void 0 : targetFunc();
    TRIGGER_EVENTS.forEach((eventName) => {
      var _a2;
      newTarget === null || newTarget === void 0 ? void 0 : newTarget.removeEventListener(eventName, lazyUpdatePosition);
      if (prevListener.current) {
        (_a2 = prevTarget.current) === null || _a2 === void 0 ? void 0 : _a2.removeEventListener(eventName, prevListener.current);
      }
    });
    updatePosition.cancel();
    lazyUpdatePosition.cancel();
  };
  React.useImperativeHandle(ref, () => ({
    updatePosition
  }));
  React.useEffect(() => {
    timer.current = setTimeout(addListeners);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      removeListeners();
    };
  }, []);
  React.useEffect(() => {
    addListeners();
    return () => removeListeners();
  }, [target, affixStyle, lastAffix, offsetTop, offsetBottom]);
  React.useEffect(() => {
    updatePosition();
  }, [target, offsetTop, offsetBottom]);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$n(affixPrefixCls);
  const rootCls = classNames(rootClassName, hashId, affixPrefixCls, cssVarCls);
  const mergedCls = classNames({
    [rootCls]: affixStyle
  });
  return wrapCSSVar(/* @__PURE__ */ React.createElement(RefResizeObserver, {
    onResize: updatePosition
  }, /* @__PURE__ */ React.createElement("div", Object.assign({
    style,
    className,
    ref: placeholderNodeRef
  }, restProps), affixStyle && /* @__PURE__ */ React.createElement("div", {
    style: placeholderStyle,
    "aria-hidden": "true"
  }), /* @__PURE__ */ React.createElement("div", {
    className: mergedCls,
    ref: fixedNodeRef,
    style: affixStyle
  }, /* @__PURE__ */ React.createElement(RefResizeObserver, {
    onResize: updatePosition
  }, children)))));
});
const AnchorContext = /* @__PURE__ */ reactExports.createContext(void 0);
const AnchorLink = (props) => {
  const {
    href,
    title,
    prefixCls: customizePrefixCls,
    children,
    className,
    target,
    replace
  } = props;
  const context = reactExports.useContext(AnchorContext);
  const {
    registerLink,
    unregisterLink,
    scrollTo: scrollTo2,
    onClick,
    activeLink,
    direction
  } = context || {};
  reactExports.useEffect(() => {
    registerLink === null || registerLink === void 0 ? void 0 : registerLink(href);
    return () => {
      unregisterLink === null || unregisterLink === void 0 ? void 0 : unregisterLink(href);
    };
  }, [href]);
  const handleClick = (e2) => {
    onClick === null || onClick === void 0 ? void 0 : onClick(e2, {
      title,
      href
    });
    scrollTo2 === null || scrollTo2 === void 0 ? void 0 : scrollTo2(href);
    if (e2.defaultPrevented) {
      return;
    }
    const isExternalLink = href.startsWith("http://") || href.startsWith("https://");
    if (isExternalLink) {
      if (replace) {
        e2.preventDefault();
        window.location.replace(href);
      }
      return;
    }
    e2.preventDefault();
    const historyMethod = replace ? "replaceState" : "pushState";
    window.history[historyMethod](null, "", href);
  };
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("anchor", customizePrefixCls);
  const active = activeLink === href;
  const wrapperClassName = classNames(`${prefixCls}-link`, className, {
    [`${prefixCls}-link-active`]: active
  });
  const titleClassName = classNames(`${prefixCls}-link-title`, {
    [`${prefixCls}-link-title-active`]: active
  });
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: wrapperClassName
  }, /* @__PURE__ */ reactExports.createElement("a", {
    className: titleClassName,
    href,
    title: typeof title === "string" ? title : "",
    target,
    onClick: handleClick
  }, title), direction !== "horizontal" ? children : null);
};
const genSharedAnchorStyle = (token) => {
  const {
    componentCls,
    holderOffsetBlock,
    motionDurationSlow,
    lineWidthBold,
    colorPrimary,
    lineType,
    colorSplit,
    calc
  } = token;
  return {
    [`${componentCls}-wrapper`]: {
      marginBlockStart: calc(holderOffsetBlock).mul(-1).equal(),
      paddingBlockStart: holderOffsetBlock,
      // delete overflow: auto
      // overflow: 'auto',
      [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        position: "relative",
        paddingInlineStart: lineWidthBold,
        [`${componentCls}-link`]: {
          paddingBlock: token.linkPaddingBlock,
          paddingInline: `${unit(token.linkPaddingInlineStart)} 0`,
          "&-title": Object.assign(Object.assign({}, textEllipsis), {
            position: "relative",
            display: "block",
            marginBlockEnd: token.anchorTitleBlock,
            color: token.colorText,
            transition: `all ${token.motionDurationSlow}`,
            "&:only-child": {
              marginBlockEnd: 0
            }
          }),
          [`&-active > ${componentCls}-link-title`]: {
            color: token.colorPrimary
          },
          // link link
          [`${componentCls}-link`]: {
            paddingBlock: token.anchorPaddingBlockSecondary
          }
        }
      }),
      [`&:not(${componentCls}-wrapper-horizontal)`]: {
        [componentCls]: {
          "&::before": {
            position: "absolute",
            insetInlineStart: 0,
            top: 0,
            height: "100%",
            borderInlineStart: `${unit(lineWidthBold)} ${lineType} ${colorSplit}`,
            content: '" "'
          },
          [`${componentCls}-ink`]: {
            position: "absolute",
            insetInlineStart: 0,
            display: "none",
            transform: "translateY(-50%)",
            transition: `top ${motionDurationSlow} ease-in-out`,
            width: lineWidthBold,
            backgroundColor: colorPrimary,
            [`&${componentCls}-ink-visible`]: {
              display: "inline-block"
            }
          }
        }
      },
      [`${componentCls}-fixed ${componentCls}-ink ${componentCls}-ink`]: {
        display: "none"
      }
    }
  };
};
const genSharedAnchorHorizontalStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    lineWidthBold,
    colorPrimary
  } = token;
  return {
    [`${componentCls}-wrapper-horizontal`]: {
      position: "relative",
      "&::before": {
        position: "absolute",
        left: {
          _skip_check_: true,
          value: 0
        },
        right: {
          _skip_check_: true,
          value: 0
        },
        bottom: 0,
        borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
        content: '" "'
      },
      [componentCls]: {
        overflowX: "scroll",
        position: "relative",
        display: "flex",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none"
          /* Safari and Chrome */
        },
        [`${componentCls}-link:first-of-type`]: {
          paddingInline: 0
        },
        [`${componentCls}-ink`]: {
          position: "absolute",
          bottom: 0,
          transition: `left ${motionDurationSlow} ease-in-out, width ${motionDurationSlow} ease-in-out`,
          height: lineWidthBold,
          backgroundColor: colorPrimary
        }
      }
    }
  };
};
const prepareComponentToken$l = (token) => ({
  linkPaddingBlock: token.paddingXXS,
  linkPaddingInlineStart: token.padding
});
const useStyle$m = genStyleHooks("Anchor", (token) => {
  const {
    fontSize,
    fontSizeLG,
    paddingXXS,
    calc
  } = token;
  const anchorToken = merge(token, {
    holderOffsetBlock: paddingXXS,
    anchorPaddingBlockSecondary: calc(paddingXXS).div(2).equal(),
    anchorTitleBlock: calc(fontSize).div(14).mul(3).equal(),
    anchorBallSize: calc(fontSizeLG).div(2).equal()
  });
  return [genSharedAnchorStyle(anchorToken), genSharedAnchorHorizontalStyle(anchorToken)];
}, prepareComponentToken$l);
function getDefaultContainer() {
  return window;
}
function getOffsetTop(element, container) {
  if (!element.getClientRects().length) {
    return 0;
  }
  const rect = element.getBoundingClientRect();
  if (rect.width || rect.height) {
    if (container === window) {
      return rect.top - element.ownerDocument.documentElement.clientTop;
    }
    return rect.top - container.getBoundingClientRect().top;
  }
  return rect.top;
}
const sharpMatcherRegex = /#([\S ]+)$/;
const Anchor$1 = (props) => {
  var _a;
  const {
    rootClassName,
    prefixCls: customPrefixCls,
    className,
    style,
    offsetTop,
    affix = true,
    showInkInFixed = false,
    children,
    items,
    direction: anchorDirection = "vertical",
    bounds,
    targetOffset: targetOffset2,
    onClick,
    onChange,
    getContainer,
    getCurrentAnchor,
    replace
  } = props;
  const [links, setLinks] = reactExports.useState([]);
  const [activeLink, setActiveLink] = reactExports.useState(null);
  const activeLinkRef = reactExports.useRef(activeLink);
  const wrapperRef = reactExports.useRef(null);
  const spanLinkNode = reactExports.useRef(null);
  const animating = reactExports.useRef(false);
  const {
    direction,
    getPrefixCls,
    className: anchorClassName,
    style: anchorStyle
  } = useComponentConfig("anchor");
  const {
    getTargetContainer
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("anchor", customPrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$m(prefixCls, rootCls);
  const getCurrentContainer = (_a = getContainer !== null && getContainer !== void 0 ? getContainer : getTargetContainer) !== null && _a !== void 0 ? _a : getDefaultContainer;
  const dependencyListItem = JSON.stringify(links);
  const registerLink = useEvent((link2) => {
    if (!links.includes(link2)) {
      setLinks((prev) => [].concat(_toConsumableArray(prev), [link2]));
    }
  });
  const unregisterLink = useEvent((link2) => {
    if (links.includes(link2)) {
      setLinks((prev) => prev.filter((i) => i !== link2));
    }
  });
  const updateInk = () => {
    var _a2;
    const linkNode = (_a2 = wrapperRef.current) === null || _a2 === void 0 ? void 0 : _a2.querySelector(`.${prefixCls}-link-title-active`);
    if (linkNode && spanLinkNode.current) {
      const {
        style: inkStyle
      } = spanLinkNode.current;
      const horizontalAnchor = anchorDirection === "horizontal";
      inkStyle.top = horizontalAnchor ? "" : `${linkNode.offsetTop + linkNode.clientHeight / 2}px`;
      inkStyle.height = horizontalAnchor ? "" : `${linkNode.clientHeight}px`;
      inkStyle.left = horizontalAnchor ? `${linkNode.offsetLeft}px` : "";
      inkStyle.width = horizontalAnchor ? `${linkNode.clientWidth}px` : "";
      if (horizontalAnchor) {
        e(linkNode, {
          scrollMode: "if-needed",
          block: "nearest"
        });
      }
    }
  };
  const getInternalCurrentAnchor = (_links, _offsetTop = 0, _bounds = 5) => {
    const linkSections = [];
    const container = getCurrentContainer();
    _links.forEach((link2) => {
      const sharpLinkMatch = sharpMatcherRegex.exec(link2 === null || link2 === void 0 ? void 0 : link2.toString());
      if (!sharpLinkMatch) {
        return;
      }
      const target = document.getElementById(sharpLinkMatch[1]);
      if (target) {
        const top = getOffsetTop(target, container);
        if (top <= _offsetTop + _bounds) {
          linkSections.push({
            link: link2,
            top
          });
        }
      }
    });
    if (linkSections.length) {
      const maxSection = linkSections.reduce((prev, curr) => curr.top > prev.top ? curr : prev);
      return maxSection.link;
    }
    return "";
  };
  const setCurrentActiveLink = useEvent((link2) => {
    if (activeLinkRef.current === link2) {
      return;
    }
    const newLink = typeof getCurrentAnchor === "function" ? getCurrentAnchor(link2) : link2;
    setActiveLink(newLink);
    activeLinkRef.current = newLink;
    onChange === null || onChange === void 0 ? void 0 : onChange(link2);
  });
  const handleScroll = reactExports.useCallback(() => {
    if (animating.current) {
      return;
    }
    const currentActiveLink = getInternalCurrentAnchor(links, targetOffset2 !== void 0 ? targetOffset2 : offsetTop || 0, bounds);
    setCurrentActiveLink(currentActiveLink);
  }, [links, targetOffset2, offsetTop, bounds]);
  const handleScrollTo = reactExports.useCallback((link2) => {
    setCurrentActiveLink(link2);
    const sharpLinkMatch = sharpMatcherRegex.exec(link2);
    if (!sharpLinkMatch) {
      return;
    }
    const targetElement = document.getElementById(sharpLinkMatch[1]);
    if (!targetElement) {
      return;
    }
    const container = getCurrentContainer();
    const scrollTop = getScroll$1(container);
    const eleOffsetTop = getOffsetTop(targetElement, container);
    let y = scrollTop + eleOffsetTop;
    y -= targetOffset2 !== void 0 ? targetOffset2 : offsetTop || 0;
    animating.current = true;
    scrollTo(y, {
      getContainer: getCurrentContainer,
      callback() {
        animating.current = false;
      }
    });
  }, [targetOffset2, offsetTop]);
  const wrapperClass = classNames(hashId, cssVarCls, rootCls, rootClassName, `${prefixCls}-wrapper`, {
    [`${prefixCls}-wrapper-horizontal`]: anchorDirection === "horizontal",
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, anchorClassName);
  const anchorClass = classNames(prefixCls, {
    [`${prefixCls}-fixed`]: !affix && !showInkInFixed
  });
  const inkClass = classNames(`${prefixCls}-ink`, {
    [`${prefixCls}-ink-visible`]: activeLink
  });
  const wrapperStyle = Object.assign(Object.assign({
    maxHeight: offsetTop ? `calc(100vh - ${offsetTop}px)` : "100vh"
  }, anchorStyle), style);
  const createNestedLink = (options) => Array.isArray(options) ? options.map((item) => /* @__PURE__ */ reactExports.createElement(AnchorLink, Object.assign({
    replace
  }, item, {
    key: item.key
  }), anchorDirection === "vertical" && createNestedLink(item.children))) : null;
  const anchorContent = /* @__PURE__ */ reactExports.createElement("div", {
    ref: wrapperRef,
    className: wrapperClass,
    style: wrapperStyle
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: anchorClass
  }, /* @__PURE__ */ reactExports.createElement("span", {
    className: inkClass,
    ref: spanLinkNode
  }), "items" in props ? createNestedLink(items) : children));
  reactExports.useEffect(() => {
    const scrollContainer = getCurrentContainer();
    handleScroll();
    scrollContainer === null || scrollContainer === void 0 ? void 0 : scrollContainer.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer === null || scrollContainer === void 0 ? void 0 : scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [dependencyListItem]);
  reactExports.useEffect(() => {
    if (typeof getCurrentAnchor === "function") {
      setCurrentActiveLink(getCurrentAnchor(activeLinkRef.current || ""));
    }
  }, [getCurrentAnchor]);
  reactExports.useEffect(() => {
    updateInk();
  }, [anchorDirection, getCurrentAnchor, dependencyListItem, activeLink]);
  const memoizedContextValue = reactExports.useMemo(() => ({
    registerLink,
    unregisterLink,
    scrollTo: handleScrollTo,
    activeLink,
    onClick,
    direction: anchorDirection
  }), [activeLink, onClick, handleScrollTo, anchorDirection]);
  const affixProps = affix && typeof affix === "object" ? affix : void 0;
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(AnchorContext.Provider, {
    value: memoizedContextValue
  }, affix ? /* @__PURE__ */ reactExports.createElement(Affix, Object.assign({
    offsetTop,
    target: getCurrentContainer
  }, affixProps), anchorContent) : anchorContent));
};
const Anchor = Anchor$1;
Anchor.Link = AnchorLink;
var VerticalAlignTopOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z" } }] }, "name": "vertical-align-top", "theme": "outlined" };
var VerticalAlignTopOutlined = function VerticalAlignTopOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: VerticalAlignTopOutlined$1
  }));
};
var RefIcon$c = /* @__PURE__ */ reactExports.forwardRef(VerticalAlignTopOutlined);
const genSharedBackTopStyle = (token) => {
  const {
    componentCls,
    backTopFontSize,
    backTopSize,
    zIndexPopup
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      position: "fixed",
      insetInlineEnd: token.backTopInlineEnd,
      insetBlockEnd: token.backTopBlockEnd,
      zIndex: zIndexPopup,
      width: 40,
      height: 40,
      cursor: "pointer",
      "&:empty": {
        display: "none"
      },
      [`${componentCls}-content`]: {
        width: backTopSize,
        height: backTopSize,
        overflow: "hidden",
        color: token.backTopColor,
        textAlign: "center",
        backgroundColor: token.backTopBackground,
        borderRadius: backTopSize,
        transition: `all ${token.motionDurationMid}`,
        "&:hover": {
          backgroundColor: token.backTopHoverBackground,
          transition: `all ${token.motionDurationMid}`
        }
      },
      // change to .backtop .backtop-icon
      [`${componentCls}-icon`]: {
        fontSize: backTopFontSize,
        lineHeight: unit(backTopSize)
      }
    })
  };
};
const genMediaBackTopStyle = (token) => {
  const {
    componentCls,
    screenMD,
    screenXS,
    backTopInlineEndMD,
    backTopInlineEndXS
  } = token;
  return {
    [`@media (max-width: ${unit(screenMD)})`]: {
      [componentCls]: {
        insetInlineEnd: backTopInlineEndMD
      }
    },
    [`@media (max-width: ${unit(screenXS)})`]: {
      [componentCls]: {
        insetInlineEnd: backTopInlineEndXS
      }
    }
  };
};
const prepareComponentToken$k = (token) => ({
  zIndexPopup: token.zIndexBase + 10
});
const useStyle$l = genStyleHooks("BackTop", (token) => {
  const {
    fontSizeHeading3,
    colorTextDescription,
    colorTextLightSolid,
    colorText,
    controlHeightLG,
    calc
  } = token;
  const backTopToken = merge(token, {
    backTopBackground: colorTextDescription,
    backTopColor: colorTextLightSolid,
    backTopHoverBackground: colorText,
    backTopFontSize: fontSizeHeading3,
    backTopSize: controlHeightLG,
    backTopBlockEnd: calc(controlHeightLG).mul(1.25).equal(),
    backTopInlineEnd: calc(controlHeightLG).mul(2.5).equal(),
    backTopInlineEndMD: calc(controlHeightLG).mul(1.5).equal(),
    backTopInlineEndXS: calc(controlHeightLG).mul(0.5).equal()
  });
  return [genSharedBackTopStyle(backTopToken), genMediaBackTopStyle(backTopToken)];
}, prepareComponentToken$k);
const BackTop$1 = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    visibilityHeight = 400,
    target,
    onClick,
    duration = 450
  } = props;
  const [visible, setVisible] = reactExports.useState(visibilityHeight === 0);
  const ref = reactExports.useRef(null);
  const getDefaultTarget2 = () => {
    var _a;
    return ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.ownerDocument) || window;
  };
  const handleScroll = throttleByAnimationFrame((e2) => {
    const scrollTop = getScroll$1(e2.target);
    setVisible(scrollTop >= visibilityHeight);
  });
  reactExports.useEffect(() => {
    const getTarget = target || getDefaultTarget2;
    const container = getTarget();
    handleScroll({
      target: container
    });
    container === null || container === void 0 ? void 0 : container.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      container === null || container === void 0 ? void 0 : container.removeEventListener("scroll", handleScroll);
    };
  }, [target]);
  const scrollToTop = (e2) => {
    scrollTo(0, {
      getContainer: target || getDefaultTarget2,
      duration
    });
    onClick === null || onClick === void 0 ? void 0 : onClick(e2);
  };
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("back-top", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$l(prefixCls);
  const classString = classNames(hashId, cssVarCls, prefixCls, {
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, rootClassName);
  const divProps = omit(props, ["prefixCls", "className", "rootClassName", "children", "visibilityHeight", "target"]);
  const defaultElement = /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-content`
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-icon`
  }, /* @__PURE__ */ reactExports.createElement(RefIcon$c, null)));
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({}, divProps, {
    className: classString,
    onClick: scrollToTop,
    ref
  }), /* @__PURE__ */ reactExports.createElement(CSSMotion, {
    visible,
    motionName: `${rootPrefixCls}-fade`
  }, ({
    className: motionClassName
  }) => cloneElement(props.children || defaultElement, ({
    className: cloneCls
  }) => ({
    className: classNames(motionClassName, cloneCls)
  })))));
};
const antStatusProcessing = new Keyframe("antStatusProcessing", {
  "0%": {
    transform: "scale(0.8)",
    opacity: 0.5
  },
  "100%": {
    transform: "scale(2.4)",
    opacity: 0
  }
});
const antZoomBadgeIn = new Keyframe("antZoomBadgeIn", {
  "0%": {
    transform: "scale(0) translate(50%, -50%)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1) translate(50%, -50%)"
  }
});
const antZoomBadgeOut = new Keyframe("antZoomBadgeOut", {
  "0%": {
    transform: "scale(1) translate(50%, -50%)"
  },
  "100%": {
    transform: "scale(0) translate(50%, -50%)",
    opacity: 0
  }
});
const antNoWrapperZoomBadgeIn = new Keyframe("antNoWrapperZoomBadgeIn", {
  "0%": {
    transform: "scale(0)",
    opacity: 0
  },
  "100%": {
    transform: "scale(1)"
  }
});
const antNoWrapperZoomBadgeOut = new Keyframe("antNoWrapperZoomBadgeOut", {
  "0%": {
    transform: "scale(1)"
  },
  "100%": {
    transform: "scale(0)",
    opacity: 0
  }
});
const antBadgeLoadingCircle = new Keyframe("antBadgeLoadingCircle", {
  "0%": {
    transformOrigin: "50%"
  },
  "100%": {
    transform: "translate(50%, -50%) rotate(360deg)",
    transformOrigin: "50%"
  }
});
const genSharedBadgeStyle = (token) => {
  const {
    componentCls,
    iconCls,
    antCls,
    badgeShadowSize,
    textFontSize,
    textFontSizeSM,
    statusSize,
    dotSize,
    textFontWeight,
    indicatorHeight,
    indicatorHeightSM,
    marginXS,
    calc
  } = token;
  const numberPrefixCls = `${antCls}-scroll-number`;
  const colorPreset = genPresetColor(token, (colorKey, {
    darkColor
  }) => ({
    [`&${componentCls} ${componentCls}-color-${colorKey}`]: {
      background: darkColor,
      [`&:not(${componentCls}-count)`]: {
        color: darkColor
      },
      "a:hover &": {
        background: darkColor
      }
    }
  }));
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      position: "relative",
      display: "inline-block",
      width: "fit-content",
      lineHeight: 1,
      [`${componentCls}-count`]: {
        display: "inline-flex",
        justifyContent: "center",
        zIndex: token.indicatorZIndex,
        minWidth: indicatorHeight,
        height: indicatorHeight,
        color: token.badgeTextColor,
        fontWeight: textFontWeight,
        fontSize: textFontSize,
        lineHeight: unit(indicatorHeight),
        whiteSpace: "nowrap",
        textAlign: "center",
        background: token.badgeColor,
        borderRadius: calc(indicatorHeight).div(2).equal(),
        boxShadow: `0 0 0 ${unit(badgeShadowSize)} ${token.badgeShadowColor}`,
        transition: `background ${token.motionDurationMid}`,
        a: {
          color: token.badgeTextColor
        },
        "a:hover": {
          color: token.badgeTextColor
        },
        "a:hover &": {
          background: token.badgeColorHover
        }
      },
      [`${componentCls}-count-sm`]: {
        minWidth: indicatorHeightSM,
        height: indicatorHeightSM,
        fontSize: textFontSizeSM,
        lineHeight: unit(indicatorHeightSM),
        borderRadius: calc(indicatorHeightSM).div(2).equal()
      },
      [`${componentCls}-multiple-words`]: {
        padding: `0 ${unit(token.paddingXS)}`,
        bdi: {
          unicodeBidi: "plaintext"
        }
      },
      [`${componentCls}-dot`]: {
        zIndex: token.indicatorZIndex,
        width: dotSize,
        minWidth: dotSize,
        height: dotSize,
        background: token.badgeColor,
        borderRadius: "100%",
        boxShadow: `0 0 0 ${unit(badgeShadowSize)} ${token.badgeShadowColor}`
      },
      [`${componentCls}-count, ${componentCls}-dot, ${numberPrefixCls}-custom-component`]: {
        position: "absolute",
        top: 0,
        insetInlineEnd: 0,
        transform: "translate(50%, -50%)",
        transformOrigin: "100% 0%",
        [`&${iconCls}-spin`]: {
          animationName: antBadgeLoadingCircle,
          animationDuration: "1s",
          animationIterationCount: "infinite",
          animationTimingFunction: "linear"
        }
      },
      [`&${componentCls}-status`]: {
        lineHeight: "inherit",
        verticalAlign: "baseline",
        [`${componentCls}-status-dot`]: {
          position: "relative",
          top: -1,
          // Magic number, but seems better experience
          display: "inline-block",
          width: statusSize,
          height: statusSize,
          verticalAlign: "middle",
          borderRadius: "50%"
        },
        [`${componentCls}-status-success`]: {
          backgroundColor: token.colorSuccess
        },
        [`${componentCls}-status-processing`]: {
          overflow: "visible",
          color: token.colorInfo,
          backgroundColor: token.colorInfo,
          borderColor: "currentcolor",
          "&::after": {
            position: "absolute",
            top: 0,
            insetInlineStart: 0,
            width: "100%",
            height: "100%",
            borderWidth: badgeShadowSize,
            borderStyle: "solid",
            borderColor: "inherit",
            borderRadius: "50%",
            animationName: antStatusProcessing,
            animationDuration: token.badgeProcessingDuration,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
            content: '""'
          }
        },
        [`${componentCls}-status-default`]: {
          backgroundColor: token.colorTextPlaceholder
        },
        [`${componentCls}-status-error`]: {
          backgroundColor: token.colorError
        },
        [`${componentCls}-status-warning`]: {
          backgroundColor: token.colorWarning
        },
        [`${componentCls}-status-text`]: {
          marginInlineStart: marginXS,
          color: token.colorText,
          fontSize: token.fontSize
        }
      }
    }), colorPreset), {
      [`${componentCls}-zoom-appear, ${componentCls}-zoom-enter`]: {
        animationName: antZoomBadgeIn,
        animationDuration: token.motionDurationSlow,
        animationTimingFunction: token.motionEaseOutBack,
        animationFillMode: "both"
      },
      [`${componentCls}-zoom-leave`]: {
        animationName: antZoomBadgeOut,
        animationDuration: token.motionDurationSlow,
        animationTimingFunction: token.motionEaseOutBack,
        animationFillMode: "both"
      },
      [`&${componentCls}-not-a-wrapper`]: {
        [`${componentCls}-zoom-appear, ${componentCls}-zoom-enter`]: {
          animationName: antNoWrapperZoomBadgeIn,
          animationDuration: token.motionDurationSlow,
          animationTimingFunction: token.motionEaseOutBack
        },
        [`${componentCls}-zoom-leave`]: {
          animationName: antNoWrapperZoomBadgeOut,
          animationDuration: token.motionDurationSlow,
          animationTimingFunction: token.motionEaseOutBack
        },
        [`&:not(${componentCls}-status)`]: {
          verticalAlign: "middle"
        },
        [`${numberPrefixCls}-custom-component, ${componentCls}-count`]: {
          transform: "none"
        },
        [`${numberPrefixCls}-custom-component, ${numberPrefixCls}`]: {
          position: "relative",
          top: "auto",
          display: "block",
          transformOrigin: "50% 50%"
        }
      },
      [numberPrefixCls]: {
        overflow: "hidden",
        transition: `all ${token.motionDurationMid} ${token.motionEaseOutBack}`,
        [`${numberPrefixCls}-only`]: {
          position: "relative",
          display: "inline-block",
          height: indicatorHeight,
          transition: `all ${token.motionDurationSlow} ${token.motionEaseOutBack}`,
          WebkitTransformStyle: "preserve-3d",
          WebkitBackfaceVisibility: "hidden",
          [`> p${numberPrefixCls}-only-unit`]: {
            height: indicatorHeight,
            margin: 0,
            WebkitTransformStyle: "preserve-3d",
            WebkitBackfaceVisibility: "hidden"
          }
        },
        [`${numberPrefixCls}-symbol`]: {
          verticalAlign: "top"
        }
      },
      // ====================== RTL =======================
      "&-rtl": {
        direction: "rtl",
        [`${componentCls}-count, ${componentCls}-dot, ${numberPrefixCls}-custom-component`]: {
          transform: "translate(-50%, -50%)"
        }
      }
    })
  };
};
const prepareToken = (token) => {
  const {
    fontHeight,
    lineWidth,
    marginXS,
    colorBorderBg
  } = token;
  const badgeFontHeight = fontHeight;
  const badgeShadowSize = lineWidth;
  const badgeTextColor = token.colorTextLightSolid;
  const badgeColor = token.colorError;
  const badgeColorHover = token.colorErrorHover;
  const badgeToken = merge(token, {
    badgeFontHeight,
    badgeShadowSize,
    badgeTextColor,
    badgeColor,
    badgeColorHover,
    badgeShadowColor: colorBorderBg,
    badgeProcessingDuration: "1.2s",
    badgeRibbonOffset: marginXS,
    // Follow token just by Design. Not related with token
    badgeRibbonCornerTransform: "scaleY(0.75)",
    badgeRibbonCornerFilter: `brightness(75%)`
  });
  return badgeToken;
};
const prepareComponentToken$j = (token) => {
  const {
    fontSize,
    lineHeight,
    fontSizeSM,
    lineWidth
  } = token;
  return {
    indicatorZIndex: "auto",
    indicatorHeight: Math.round(fontSize * lineHeight) - 2 * lineWidth,
    indicatorHeightSM: fontSize,
    dotSize: fontSizeSM / 2,
    textFontSize: fontSizeSM,
    textFontSizeSM: fontSizeSM,
    textFontWeight: "normal",
    statusSize: fontSizeSM / 2
  };
};
const useStyle$k = genStyleHooks("Badge", (token) => {
  const badgeToken = prepareToken(token);
  return genSharedBadgeStyle(badgeToken);
}, prepareComponentToken$j);
const genRibbonStyle = (token) => {
  const {
    antCls,
    badgeFontHeight,
    marginXS,
    badgeRibbonOffset,
    calc
  } = token;
  const ribbonPrefixCls = `${antCls}-ribbon`;
  const ribbonWrapperPrefixCls = `${antCls}-ribbon-wrapper`;
  const statusRibbonPreset = genPresetColor(token, (colorKey, {
    darkColor
  }) => ({
    [`&${ribbonPrefixCls}-color-${colorKey}`]: {
      background: darkColor,
      color: darkColor
    }
  }));
  return {
    [ribbonWrapperPrefixCls]: {
      position: "relative"
    },
    [ribbonPrefixCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      position: "absolute",
      top: marginXS,
      padding: `0 ${unit(token.paddingXS)}`,
      color: token.colorPrimary,
      lineHeight: unit(badgeFontHeight),
      whiteSpace: "nowrap",
      backgroundColor: token.colorPrimary,
      borderRadius: token.borderRadiusSM,
      [`${ribbonPrefixCls}-text`]: {
        color: token.badgeTextColor
      },
      [`${ribbonPrefixCls}-corner`]: {
        position: "absolute",
        top: "100%",
        width: badgeRibbonOffset,
        height: badgeRibbonOffset,
        color: "currentcolor",
        border: `${unit(calc(badgeRibbonOffset).div(2).equal())} solid`,
        transform: token.badgeRibbonCornerTransform,
        transformOrigin: "top",
        filter: token.badgeRibbonCornerFilter
      }
    }), statusRibbonPreset), {
      [`&${ribbonPrefixCls}-placement-end`]: {
        insetInlineEnd: calc(badgeRibbonOffset).mul(-1).equal(),
        borderEndEndRadius: 0,
        [`${ribbonPrefixCls}-corner`]: {
          insetInlineEnd: 0,
          borderInlineEndColor: "transparent",
          borderBlockEndColor: "transparent"
        }
      },
      [`&${ribbonPrefixCls}-placement-start`]: {
        insetInlineStart: calc(badgeRibbonOffset).mul(-1).equal(),
        borderEndStartRadius: 0,
        [`${ribbonPrefixCls}-corner`]: {
          insetInlineStart: 0,
          borderBlockEndColor: "transparent",
          borderInlineStartColor: "transparent"
        }
      },
      // ====================== RTL =======================
      "&-rtl": {
        direction: "rtl"
      }
    })
  };
};
const useStyle$j = genStyleHooks(["Badge", "Ribbon"], (token) => {
  const badgeToken = prepareToken(token);
  return genRibbonStyle(badgeToken);
}, prepareComponentToken$j);
const Ribbon = (props) => {
  const {
    className,
    prefixCls: customizePrefixCls,
    style,
    color,
    children,
    text,
    placement = "end",
    rootClassName
  } = props;
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("ribbon", customizePrefixCls);
  const wrapperCls = `${prefixCls}-wrapper`;
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$j(prefixCls, wrapperCls);
  const colorInPreset = isPresetColor(color, false);
  const ribbonCls = classNames(prefixCls, `${prefixCls}-placement-${placement}`, {
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-color-${color}`]: colorInPreset
  }, className);
  const colorStyle = {};
  const cornerColorStyle = {};
  if (color && !colorInPreset) {
    colorStyle.background = color;
    cornerColorStyle.color = color;
  }
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(wrapperCls, rootClassName, hashId, cssVarCls)
  }, children, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(ribbonCls, hashId),
    style: Object.assign(Object.assign({}, colorStyle), style)
  }, /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-text`
  }, text), /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-corner`,
    style: cornerColorStyle
  }))));
};
const UnitNumber = (props) => {
  const {
    prefixCls,
    value,
    current,
    offset = 0
  } = props;
  let style;
  if (offset) {
    style = {
      position: "absolute",
      top: `${offset}00%`,
      left: 0
    };
  }
  return /* @__PURE__ */ reactExports.createElement("span", {
    style,
    className: classNames(`${prefixCls}-only-unit`, {
      current
    })
  }, value);
};
function getOffset$2(start, end, unit2) {
  let index2 = start;
  let offset = 0;
  while ((index2 + 10) % 10 !== end) {
    index2 += unit2;
    offset += unit2;
  }
  return offset;
}
const SingleNumber = (props) => {
  const {
    prefixCls,
    count: originCount,
    value: originValue
  } = props;
  const value = Number(originValue);
  const count = Math.abs(originCount);
  const [prevValue, setPrevValue] = reactExports.useState(value);
  const [prevCount, setPrevCount] = reactExports.useState(count);
  const onTransitionEnd = () => {
    setPrevValue(value);
    setPrevCount(count);
  };
  reactExports.useEffect(() => {
    const timer = setTimeout(onTransitionEnd, 1e3);
    return () => clearTimeout(timer);
  }, [value]);
  let unitNodes;
  let offsetStyle;
  if (prevValue === value || Number.isNaN(value) || Number.isNaN(prevValue)) {
    unitNodes = [/* @__PURE__ */ reactExports.createElement(UnitNumber, Object.assign({}, props, {
      key: value,
      current: true
    }))];
    offsetStyle = {
      transition: "none"
    };
  } else {
    unitNodes = [];
    const end = value + 10;
    const unitNumberList = [];
    for (let index2 = value; index2 <= end; index2 += 1) {
      unitNumberList.push(index2);
    }
    const unit2 = prevCount < count ? 1 : -1;
    const prevIndex = unitNumberList.findIndex((n) => n % 10 === prevValue);
    const cutUnitNumberList = unit2 < 0 ? unitNumberList.slice(0, prevIndex + 1) : unitNumberList.slice(prevIndex);
    unitNodes = cutUnitNumberList.map((n, index2) => {
      const singleUnit = n % 10;
      return /* @__PURE__ */ reactExports.createElement(UnitNumber, Object.assign({}, props, {
        key: n,
        value: singleUnit,
        offset: unit2 < 0 ? index2 - prevIndex : index2,
        current: index2 === prevIndex
      }));
    });
    offsetStyle = {
      transform: `translateY(${-getOffset$2(prevValue, value, unit2)}00%)`
    };
  }
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-only`,
    style: offsetStyle,
    onTransitionEnd
  }, unitNodes);
};
var __rest$C = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const ScrollNumber = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    count,
    className,
    motionClassName,
    style,
    title,
    show,
    component: Component = "sup",
    children
  } = props, restProps = __rest$C(props, ["prefixCls", "count", "className", "motionClassName", "style", "title", "show", "component", "children"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("scroll-number", customizePrefixCls);
  const newProps = Object.assign(Object.assign({}, restProps), {
    "data-show": show,
    style,
    className: classNames(prefixCls, className, motionClassName),
    title
  });
  let numberNodes = count;
  if (count && Number(count) % 1 === 0) {
    const numberList = String(count).split("");
    numberNodes = /* @__PURE__ */ reactExports.createElement("bdi", null, numberList.map((num, i) => /* @__PURE__ */ reactExports.createElement(SingleNumber, {
      prefixCls,
      count: Number(count),
      value: num,
      // eslint-disable-next-line react/no-array-index-key
      key: numberList.length - i
    })));
  }
  if (style === null || style === void 0 ? void 0 : style.borderColor) {
    newProps.style = Object.assign(Object.assign({}, style), {
      boxShadow: `0 0 0 1px ${style.borderColor} inset`
    });
  }
  if (children) {
    return cloneElement(children, (oriProps) => ({
      className: classNames(`${prefixCls}-custom-component`, oriProps === null || oriProps === void 0 ? void 0 : oriProps.className, motionClassName)
    }));
  }
  return /* @__PURE__ */ reactExports.createElement(Component, Object.assign({}, newProps, {
    ref
  }), numberNodes);
});
var __rest$B = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalBadge = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _a, _b, _c, _d, _e;
  const {
    prefixCls: customizePrefixCls,
    scrollNumberPrefixCls: customizeScrollNumberPrefixCls,
    children,
    status,
    text,
    color,
    count = null,
    overflowCount = 99,
    dot = false,
    size = "default",
    title,
    offset,
    style,
    className,
    rootClassName,
    classNames: classNames$1,
    styles,
    showZero = false
  } = props, restProps = __rest$B(props, ["prefixCls", "scrollNumberPrefixCls", "children", "status", "text", "color", "count", "overflowCount", "dot", "size", "title", "offset", "style", "className", "rootClassName", "classNames", "styles", "showZero"]);
  const {
    getPrefixCls,
    direction,
    badge
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("badge", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$k(prefixCls);
  const numberedDisplayCount = count > overflowCount ? `${overflowCount}+` : count;
  const isZero = numberedDisplayCount === "0" || numberedDisplayCount === 0 || text === "0" || text === 0;
  const ignoreCount = count === null || isZero && !showZero;
  const hasStatus = (status !== null && status !== void 0 || color !== null && color !== void 0) && ignoreCount;
  const hasStatusValue = status !== null && status !== void 0 || !isZero;
  const showAsDot = dot && !isZero;
  const mergedCount = showAsDot ? "" : numberedDisplayCount;
  const isHidden = reactExports.useMemo(() => {
    const isEmpty = (mergedCount === null || mergedCount === void 0 || mergedCount === "") && (text === void 0 || text === null || text === "");
    return (isEmpty || isZero && !showZero) && !showAsDot;
  }, [mergedCount, isZero, showZero, showAsDot, text]);
  const countRef = reactExports.useRef(count);
  if (!isHidden) {
    countRef.current = count;
  }
  const livingCount = countRef.current;
  const displayCountRef = reactExports.useRef(mergedCount);
  if (!isHidden) {
    displayCountRef.current = mergedCount;
  }
  const displayCount = displayCountRef.current;
  const isDotRef = reactExports.useRef(showAsDot);
  if (!isHidden) {
    isDotRef.current = showAsDot;
  }
  const mergedStyle = reactExports.useMemo(() => {
    if (!offset) {
      return Object.assign(Object.assign({}, badge === null || badge === void 0 ? void 0 : badge.style), style);
    }
    const offsetStyle = {
      marginTop: offset[1]
    };
    if (direction === "rtl") {
      offsetStyle.left = Number.parseInt(offset[0], 10);
    } else {
      offsetStyle.right = -Number.parseInt(offset[0], 10);
    }
    return Object.assign(Object.assign(Object.assign({}, offsetStyle), badge === null || badge === void 0 ? void 0 : badge.style), style);
  }, [direction, offset, style, badge === null || badge === void 0 ? void 0 : badge.style]);
  const titleNode = title !== null && title !== void 0 ? title : typeof livingCount === "string" || typeof livingCount === "number" ? livingCount : void 0;
  const showStatusTextNode = !isHidden && (text === 0 ? showZero : !!text && text !== true);
  const statusTextNode = !showStatusTextNode ? null : /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-status-text`
  }, text);
  const displayNode = !livingCount || typeof livingCount !== "object" ? void 0 : cloneElement(livingCount, (oriProps) => ({
    style: Object.assign(Object.assign({}, mergedStyle), oriProps.style)
  }));
  const isInternalColor = isPresetColor(color, false);
  const statusCls = classNames(classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.indicator, (_a = badge === null || badge === void 0 ? void 0 : badge.classNames) === null || _a === void 0 ? void 0 : _a.indicator, {
    [`${prefixCls}-status-dot`]: hasStatus,
    [`${prefixCls}-status-${status}`]: !!status,
    [`${prefixCls}-color-${color}`]: isInternalColor
  });
  const statusStyle = {};
  if (color && !isInternalColor) {
    statusStyle.color = color;
    statusStyle.background = color;
  }
  const badgeClassName = classNames(prefixCls, {
    [`${prefixCls}-status`]: hasStatus,
    [`${prefixCls}-not-a-wrapper`]: !children,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, rootClassName, badge === null || badge === void 0 ? void 0 : badge.className, (_b = badge === null || badge === void 0 ? void 0 : badge.classNames) === null || _b === void 0 ? void 0 : _b.root, classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.root, hashId, cssVarCls);
  if (!children && hasStatus && (text || hasStatusValue || !ignoreCount)) {
    const statusTextColor = mergedStyle.color;
    return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("span", Object.assign({}, restProps, {
      className: badgeClassName,
      style: Object.assign(Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.root), (_c = badge === null || badge === void 0 ? void 0 : badge.styles) === null || _c === void 0 ? void 0 : _c.root), mergedStyle)
    }), /* @__PURE__ */ reactExports.createElement("span", {
      className: statusCls,
      style: Object.assign(Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.indicator), (_d = badge === null || badge === void 0 ? void 0 : badge.styles) === null || _d === void 0 ? void 0 : _d.indicator), statusStyle)
    }), showStatusTextNode && /* @__PURE__ */ reactExports.createElement("span", {
      style: {
        color: statusTextColor
      },
      className: `${prefixCls}-status-text`
    }, text)));
  }
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("span", Object.assign({
    ref
  }, restProps, {
    className: badgeClassName,
    style: Object.assign(Object.assign({}, (_e = badge === null || badge === void 0 ? void 0 : badge.styles) === null || _e === void 0 ? void 0 : _e.root), styles === null || styles === void 0 ? void 0 : styles.root)
  }), children, /* @__PURE__ */ reactExports.createElement(CSSMotion, {
    visible: !isHidden,
    motionName: `${prefixCls}-zoom`,
    motionAppear: false,
    motionDeadline: 1e3
  }, ({
    className: motionClassName
  }) => {
    var _a2, _b2;
    const scrollNumberPrefixCls = getPrefixCls("scroll-number", customizeScrollNumberPrefixCls);
    const isDot = isDotRef.current;
    const scrollNumberCls = classNames(classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.indicator, (_a2 = badge === null || badge === void 0 ? void 0 : badge.classNames) === null || _a2 === void 0 ? void 0 : _a2.indicator, {
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot,
      [`${prefixCls}-count-sm`]: size === "small",
      [`${prefixCls}-multiple-words`]: !isDot && displayCount && displayCount.toString().length > 1,
      [`${prefixCls}-status-${status}`]: !!status,
      [`${prefixCls}-color-${color}`]: isInternalColor
    });
    let scrollNumberStyle = Object.assign(Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.indicator), (_b2 = badge === null || badge === void 0 ? void 0 : badge.styles) === null || _b2 === void 0 ? void 0 : _b2.indicator), mergedStyle);
    if (color && !isInternalColor) {
      scrollNumberStyle = scrollNumberStyle || {};
      scrollNumberStyle.background = color;
    }
    return /* @__PURE__ */ reactExports.createElement(ScrollNumber, {
      prefixCls: scrollNumberPrefixCls,
      show: !isHidden,
      motionClassName,
      className: scrollNumberCls,
      count: displayCount,
      title: titleNode,
      style: scrollNumberStyle,
      key: "scrollNumber"
    }, displayNode);
  }), statusTextNode));
});
const Badge = InternalBadge;
Badge.Ribbon = Ribbon;
const BreadcrumbSeparator = ({
  children
}) => {
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("breadcrumb");
  return /* @__PURE__ */ reactExports.createElement("li", {
    className: `${prefixCls}-separator`,
    "aria-hidden": "true"
  }, children === "" ? children : children || "/");
};
BreadcrumbSeparator.__ANT_BREADCRUMB_SEPARATOR = true;
var __rest$A = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function getBreadcrumbName(route, params) {
  if (route.title === void 0 || route.title === null) {
    return null;
  }
  const paramsKeys = Object.keys(params).join("|");
  return typeof route.title === "object" ? route.title : String(route.title).replace(new RegExp(`:(${paramsKeys})`, "g"), (replacement, key) => params[key] || replacement);
}
function renderItem(prefixCls, item, children, href) {
  if (children === null || children === void 0) {
    return null;
  }
  const {
    className,
    onClick
  } = item, restItem = __rest$A(item, ["className", "onClick"]);
  const passedProps = Object.assign(Object.assign({}, pickAttrs(restItem, {
    data: true,
    aria: true
  })), {
    onClick
  });
  if (href !== void 0) {
    return /* @__PURE__ */ reactExports.createElement("a", Object.assign({}, passedProps, {
      className: classNames(`${prefixCls}-link`, className),
      href
    }), children);
  }
  return /* @__PURE__ */ reactExports.createElement("span", Object.assign({}, passedProps, {
    className: classNames(`${prefixCls}-link`, className)
  }), children);
}
function useItemRender(prefixCls, itemRender) {
  const mergedItemRender = (item, params, routes, path, href) => {
    if (itemRender) {
      return itemRender(item, params, routes, path);
    }
    const name = getBreadcrumbName(item, params);
    return renderItem(prefixCls, item, name, href);
  };
  return mergedItemRender;
}
var __rest$z = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalBreadcrumbItem = (props) => {
  const {
    prefixCls,
    separator = "/",
    children,
    menu,
    overlay,
    dropdownProps,
    href
  } = props;
  const renderBreadcrumbNode = (breadcrumbItem) => {
    if (menu || overlay) {
      const mergeDropDownProps = Object.assign({}, dropdownProps);
      if (menu) {
        const _a = menu || {}, {
          items
        } = _a, menuProps = __rest$z(_a, ["items"]);
        mergeDropDownProps.menu = Object.assign(Object.assign({}, menuProps), {
          items: items === null || items === void 0 ? void 0 : items.map((_a2, index2) => {
            var {
              key,
              title,
              label,
              path
            } = _a2, itemProps = __rest$z(_a2, ["key", "title", "label", "path"]);
            let mergedLabel = label !== null && label !== void 0 ? label : title;
            if (path) {
              mergedLabel = /* @__PURE__ */ reactExports.createElement("a", {
                href: `${href}${path}`
              }, mergedLabel);
            }
            return Object.assign(Object.assign({}, itemProps), {
              key: key !== null && key !== void 0 ? key : index2,
              label: mergedLabel
            });
          })
        });
      } else if (overlay) {
        mergeDropDownProps.overlay = overlay;
      }
      return /* @__PURE__ */ reactExports.createElement(Dropdown, Object.assign({
        placement: "bottom"
      }, mergeDropDownProps), /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-overlay-link`
      }, breadcrumbItem, /* @__PURE__ */ reactExports.createElement(RefIcon$d, null)));
    }
    return breadcrumbItem;
  };
  const link2 = renderBreadcrumbNode(children);
  if (link2 !== void 0 && link2 !== null) {
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("li", {
      className: `${prefixCls}-item`
    }, link2), separator && /* @__PURE__ */ reactExports.createElement(BreadcrumbSeparator, null, separator));
  }
  return null;
};
const BreadcrumbItem = (props) => {
  const {
    prefixCls: customizePrefixCls,
    children,
    href
  } = props, restProps = __rest$z(props, ["prefixCls", "children", "href"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("breadcrumb", customizePrefixCls);
  return /* @__PURE__ */ reactExports.createElement(InternalBreadcrumbItem, Object.assign({}, restProps, {
    prefixCls
  }), renderItem(prefixCls, restProps, children, href));
};
BreadcrumbItem.__ANT_BREADCRUMB_ITEM = true;
const genBreadcrumbStyle = (token) => {
  const {
    componentCls,
    iconCls,
    calc
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      color: token.itemColor,
      fontSize: token.fontSize,
      [iconCls]: {
        fontSize: token.iconFontSize
      },
      ol: {
        display: "flex",
        flexWrap: "wrap",
        margin: 0,
        padding: 0,
        listStyle: "none"
      },
      [`${componentCls}-item a`]: Object.assign({
        color: token.linkColor,
        transition: `color ${token.motionDurationMid}`,
        padding: `0 ${unit(token.paddingXXS)}`,
        borderRadius: token.borderRadiusSM,
        height: token.fontHeight,
        display: "inline-block",
        marginInline: calc(token.marginXXS).mul(-1).equal(),
        "&:hover": {
          color: token.linkHoverColor,
          backgroundColor: token.colorBgTextHover
        }
      }, genFocusStyle(token)),
      [`${componentCls}-item:last-child`]: {
        color: token.lastItemColor
      },
      [`${componentCls}-separator`]: {
        marginInline: token.separatorMargin,
        color: token.separatorColor
      },
      [`${componentCls}-link`]: {
        [`
          > ${iconCls} + span,
          > ${iconCls} + a
        `]: {
          marginInlineStart: token.marginXXS
        }
      },
      [`${componentCls}-overlay-link`]: {
        borderRadius: token.borderRadiusSM,
        height: token.fontHeight,
        display: "inline-block",
        padding: `0 ${unit(token.paddingXXS)}`,
        marginInline: calc(token.marginXXS).mul(-1).equal(),
        [`> ${iconCls}`]: {
          marginInlineStart: token.marginXXS,
          fontSize: token.fontSizeIcon
        },
        "&:hover": {
          color: token.linkHoverColor,
          backgroundColor: token.colorBgTextHover,
          a: {
            color: token.linkHoverColor
          }
        },
        a: {
          "&:hover": {
            backgroundColor: "transparent"
          }
        }
      },
      // rtl style
      [`&${token.componentCls}-rtl`]: {
        direction: "rtl"
      }
    })
  };
};
const prepareComponentToken$i = (token) => ({
  itemColor: token.colorTextDescription,
  lastItemColor: token.colorText,
  iconFontSize: token.fontSize,
  linkColor: token.colorTextDescription,
  linkHoverColor: token.colorText,
  separatorColor: token.colorTextDescription,
  separatorMargin: token.marginXS
});
const useStyle$i = genStyleHooks("Breadcrumb", (token) => {
  const breadcrumbToken = merge(token, {});
  return genBreadcrumbStyle(breadcrumbToken);
}, prepareComponentToken$i);
var __rest$y = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function route2item(route) {
  const {
    breadcrumbName,
    children
  } = route, rest = __rest$y(route, ["breadcrumbName", "children"]);
  const clone = Object.assign({
    title: breadcrumbName
  }, rest);
  if (children) {
    clone.menu = {
      items: children.map((_a) => {
        var {
          breadcrumbName: itemBreadcrumbName
        } = _a, itemProps = __rest$y(_a, ["breadcrumbName"]);
        return Object.assign(Object.assign({}, itemProps), {
          title: itemBreadcrumbName
        });
      })
    };
  }
  return clone;
}
function useItems$1(items, routes) {
  return reactExports.useMemo(() => {
    if (items) {
      return items;
    }
    if (routes) {
      return routes.map(route2item);
    }
    return null;
  }, [items, routes]);
}
var __rest$x = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const getPath = (params, path) => {
  if (path === void 0) {
    return path;
  }
  let mergedPath = (path || "").replace(/^\//, "");
  Object.keys(params).forEach((key) => {
    mergedPath = mergedPath.replace(`:${key}`, params[key]);
  });
  return mergedPath;
};
const Breadcrumb = (props) => {
  const {
    prefixCls: customizePrefixCls,
    separator = "/",
    style,
    className,
    rootClassName,
    routes: legacyRoutes,
    items,
    children,
    itemRender,
    params = {}
  } = props, restProps = __rest$x(props, ["prefixCls", "separator", "style", "className", "rootClassName", "routes", "items", "children", "itemRender", "params"]);
  const {
    getPrefixCls,
    direction,
    breadcrumb
  } = reactExports.useContext(ConfigContext);
  let crumbs;
  const prefixCls = getPrefixCls("breadcrumb", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$i(prefixCls);
  const mergedItems = useItems$1(items, legacyRoutes);
  const mergedItemRender = useItemRender(prefixCls, itemRender);
  if (mergedItems && mergedItems.length > 0) {
    const paths = [];
    const itemRenderRoutes = items || legacyRoutes;
    crumbs = mergedItems.map((item, index2) => {
      const {
        path,
        key,
        type,
        menu,
        overlay,
        onClick,
        className: itemClassName,
        separator: itemSeparator,
        dropdownProps
      } = item;
      const mergedPath = getPath(params, path);
      if (mergedPath !== void 0) {
        paths.push(mergedPath);
      }
      const mergedKey = key !== null && key !== void 0 ? key : index2;
      if (type === "separator") {
        return /* @__PURE__ */ reactExports.createElement(BreadcrumbSeparator, {
          key: mergedKey
        }, itemSeparator);
      }
      const itemProps = {};
      const isLastItem = index2 === mergedItems.length - 1;
      if (menu) {
        itemProps.menu = menu;
      } else if (overlay) {
        itemProps.overlay = overlay;
      }
      let {
        href
      } = item;
      if (paths.length && mergedPath !== void 0) {
        href = `#/${paths.join("/")}`;
      }
      return /* @__PURE__ */ reactExports.createElement(InternalBreadcrumbItem, Object.assign({
        key: mergedKey
      }, itemProps, pickAttrs(item, {
        data: true,
        aria: true
      }), {
        className: itemClassName,
        dropdownProps,
        href,
        separator: isLastItem ? "" : separator,
        onClick,
        prefixCls
      }), mergedItemRender(item, params, itemRenderRoutes, paths, href));
    });
  } else if (children) {
    const childrenLength = toArray$1(children).length;
    crumbs = toArray$1(children).map((element, index2) => {
      if (!element) {
        return element;
      }
      const isLastItem = index2 === childrenLength - 1;
      return cloneElement(element, {
        separator: isLastItem ? "" : separator,
        // eslint-disable-next-line react/no-array-index-key
        key: index2
      });
    });
  }
  const breadcrumbClassName = classNames(prefixCls, breadcrumb === null || breadcrumb === void 0 ? void 0 : breadcrumb.className, {
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, rootClassName, hashId, cssVarCls);
  const mergedStyle = Object.assign(Object.assign({}, breadcrumb === null || breadcrumb === void 0 ? void 0 : breadcrumb.style), style);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("nav", Object.assign({
    className: breadcrumbClassName,
    style: mergedStyle
  }, restProps), /* @__PURE__ */ reactExports.createElement("ol", null, crumbs)));
};
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Separator = BreadcrumbSeparator;
const YEAR_SELECT_OFFSET = 10;
const YEAR_SELECT_TOTAL = 20;
function YearSelect(props) {
  const {
    fullscreen,
    validRange,
    generateConfig: generateConfig2,
    locale: locale2,
    prefixCls,
    value,
    onChange,
    divRef
  } = props;
  const year = generateConfig2.getYear(value || generateConfig2.getNow());
  let start = year - YEAR_SELECT_OFFSET;
  let end = start + YEAR_SELECT_TOTAL;
  if (validRange) {
    start = generateConfig2.getYear(validRange[0]);
    end = generateConfig2.getYear(validRange[1]) + 1;
  }
  const suffix = locale2 && locale2.year === "年" ? "年" : "";
  const options = [];
  for (let index2 = start; index2 < end; index2++) {
    options.push({
      label: `${index2}${suffix}`,
      value: index2
    });
  }
  return /* @__PURE__ */ reactExports.createElement(Select, {
    size: fullscreen ? void 0 : "small",
    options,
    value: year,
    className: `${prefixCls}-year-select`,
    onChange: (numYear) => {
      let newDate = generateConfig2.setYear(value, numYear);
      if (validRange) {
        const [startDate, endDate] = validRange;
        const newYear = generateConfig2.getYear(newDate);
        const newMonth = generateConfig2.getMonth(newDate);
        if (newYear === generateConfig2.getYear(endDate) && newMonth > generateConfig2.getMonth(endDate)) {
          newDate = generateConfig2.setMonth(newDate, generateConfig2.getMonth(endDate));
        }
        if (newYear === generateConfig2.getYear(startDate) && newMonth < generateConfig2.getMonth(startDate)) {
          newDate = generateConfig2.setMonth(newDate, generateConfig2.getMonth(startDate));
        }
      }
      onChange(newDate);
    },
    getPopupContainer: () => divRef.current
  });
}
function MonthSelect(props) {
  const {
    prefixCls,
    fullscreen,
    validRange,
    value,
    generateConfig: generateConfig2,
    locale: locale2,
    onChange,
    divRef
  } = props;
  const month = generateConfig2.getMonth(value || generateConfig2.getNow());
  let start = 0;
  let end = 11;
  if (validRange) {
    const [rangeStart, rangeEnd] = validRange;
    const currentYear = generateConfig2.getYear(value);
    if (generateConfig2.getYear(rangeEnd) === currentYear) {
      end = generateConfig2.getMonth(rangeEnd);
    }
    if (generateConfig2.getYear(rangeStart) === currentYear) {
      start = generateConfig2.getMonth(rangeStart);
    }
  }
  const months = locale2.shortMonths || generateConfig2.locale.getShortMonths(locale2.locale);
  const options = [];
  for (let index2 = start; index2 <= end; index2 += 1) {
    options.push({
      label: months[index2],
      value: index2
    });
  }
  return /* @__PURE__ */ reactExports.createElement(Select, {
    size: fullscreen ? void 0 : "small",
    className: `${prefixCls}-month-select`,
    value: month,
    options,
    onChange: (newMonth) => {
      onChange(generateConfig2.setMonth(value, newMonth));
    },
    getPopupContainer: () => divRef.current
  });
}
function ModeSwitch(props) {
  const {
    prefixCls,
    locale: locale2,
    mode,
    fullscreen,
    onModeChange
  } = props;
  return /* @__PURE__ */ reactExports.createElement(Group$1, {
    onChange: ({
      target: {
        value
      }
    }) => {
      onModeChange(value);
    },
    value: mode,
    size: fullscreen ? void 0 : "small",
    className: `${prefixCls}-mode-switch`
  }, /* @__PURE__ */ reactExports.createElement(Button, {
    value: "month"
  }, locale2.month), /* @__PURE__ */ reactExports.createElement(Button, {
    value: "year"
  }, locale2.year));
}
function CalendarHeader(props) {
  const {
    prefixCls,
    fullscreen,
    mode,
    onChange,
    onModeChange
  } = props;
  const divRef = reactExports.useRef(null);
  const formItemInputContext = reactExports.useContext(FormItemInputContext);
  const mergedFormItemInputContext = reactExports.useMemo(() => Object.assign(Object.assign({}, formItemInputContext), {
    isFormItemInput: false
  }), [formItemInputContext]);
  const sharedProps = Object.assign(Object.assign({}, props), {
    fullscreen,
    divRef
  });
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-header`,
    ref: divRef
  }, /* @__PURE__ */ reactExports.createElement(FormItemInputContext.Provider, {
    value: mergedFormItemInputContext
  }, /* @__PURE__ */ reactExports.createElement(YearSelect, Object.assign({}, sharedProps, {
    onChange: (v) => {
      onChange(v, "year");
    }
  })), mode === "month" && /* @__PURE__ */ reactExports.createElement(MonthSelect, Object.assign({}, sharedProps, {
    onChange: (v) => {
      onChange(v, "month");
    }
  }))), /* @__PURE__ */ reactExports.createElement(ModeSwitch, Object.assign({}, sharedProps, {
    onModeChange
  })));
}
const genCalendarStyles = (token) => {
  const {
    calendarCls,
    componentCls,
    fullBg,
    fullPanelBg,
    itemActiveBg
  } = token;
  return {
    [calendarCls]: Object.assign(Object.assign(Object.assign({}, genPanelStyle$1(token)), resetComponent(token)), {
      background: fullBg,
      "&-rtl": {
        direction: "rtl"
      },
      [`${calendarCls}-header`]: {
        display: "flex",
        justifyContent: "flex-end",
        padding: `${unit(token.paddingSM)} 0`,
        [`${calendarCls}-year-select`]: {
          minWidth: token.yearControlWidth
        },
        [`${calendarCls}-month-select`]: {
          minWidth: token.monthControlWidth,
          marginInlineStart: token.marginXS
        },
        [`${calendarCls}-mode-switch`]: {
          marginInlineStart: token.marginXS
        }
      }
    }),
    [`${calendarCls} ${componentCls}-panel`]: {
      background: fullPanelBg,
      border: 0,
      borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
      borderRadius: 0,
      [`${componentCls}-month-panel, ${componentCls}-date-panel`]: {
        width: "auto"
      },
      [`${componentCls}-body`]: {
        padding: `${unit(token.paddingXS)} 0`
      },
      [`${componentCls}-content`]: {
        width: "100%"
      }
    },
    [`${calendarCls}-mini`]: {
      borderRadius: token.borderRadiusLG,
      [`${calendarCls}-header`]: {
        paddingInlineEnd: token.paddingXS,
        paddingInlineStart: token.paddingXS
      },
      [`${componentCls}-panel`]: {
        borderRadius: `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}`
      },
      [`${componentCls}-content`]: {
        height: token.miniContentHeight,
        th: {
          height: "auto",
          padding: 0,
          lineHeight: unit(token.weekHeight)
        }
      },
      [`${componentCls}-cell::before`]: {
        pointerEvents: "none"
      }
    },
    [`${calendarCls}${calendarCls}-full`]: {
      [`${componentCls}-panel`]: {
        display: "block",
        width: "100%",
        textAlign: "end",
        background: fullBg,
        border: 0,
        [`${componentCls}-body`]: {
          "th, td": {
            padding: 0
          },
          th: {
            height: "auto",
            paddingInlineEnd: token.paddingSM,
            paddingBottom: token.paddingXXS,
            lineHeight: unit(token.weekHeight)
          }
        }
      },
      [`${componentCls}-cell-week ${componentCls}-cell-inner`]: {
        display: "block",
        borderRadius: 0,
        borderTop: `${unit(token.lineWidthBold)} ${token.lineType} ${token.colorSplit}`,
        width: "100%",
        height: token.calc(token.dateValueHeight).add(token.dateContentHeight).add(token.calc(token.paddingXS).div(2)).add(token.lineWidthBold).equal()
      },
      [`${componentCls}-cell`]: {
        "&::before": {
          display: "none"
        },
        "&:hover": {
          [`${calendarCls}-date`]: {
            background: token.controlItemBgHover
          }
        },
        [`${calendarCls}-date-today::before`]: {
          display: "none"
        },
        // >>> Selected
        [`&-in-view${componentCls}-cell-selected`]: {
          [`${calendarCls}-date, ${calendarCls}-date-today`]: {
            background: itemActiveBg
          }
        },
        "&-selected, &-selected:hover": {
          [`${calendarCls}-date, ${calendarCls}-date-today`]: {
            [`${calendarCls}-date-value`]: {
              color: token.colorPrimary
            }
          }
        }
      },
      [`${calendarCls}-date`]: {
        display: "block",
        width: "auto",
        height: "auto",
        margin: `0 ${unit(token.calc(token.marginXS).div(2).equal())}`,
        padding: `${unit(token.calc(token.paddingXS).div(2).equal())} ${unit(token.paddingXS)} 0`,
        border: 0,
        borderTop: `${unit(token.lineWidthBold)} ${token.lineType} ${token.colorSplit}`,
        borderRadius: 0,
        transition: `background ${token.motionDurationSlow}`,
        "&-value": {
          lineHeight: unit(token.dateValueHeight),
          transition: `color ${token.motionDurationSlow}`
        },
        "&-content": {
          position: "static",
          width: "auto",
          height: token.dateContentHeight,
          overflowY: "auto",
          color: token.colorText,
          lineHeight: token.lineHeight,
          textAlign: "start"
        },
        "&-today": {
          borderColor: token.colorPrimary,
          [`${calendarCls}-date-value`]: {
            color: token.colorText
          }
        }
      }
    },
    [`@media only screen and (max-width: ${unit(token.screenXS)}) `]: {
      [calendarCls]: {
        [`${calendarCls}-header`]: {
          display: "block",
          [`${calendarCls}-year-select`]: {
            width: "50%"
          },
          [`${calendarCls}-month-select`]: {
            width: `calc(50% - ${unit(token.paddingXS)})`
          },
          [`${calendarCls}-mode-switch`]: {
            width: "100%",
            marginTop: token.marginXS,
            marginInlineStart: 0,
            "> label": {
              width: "50%",
              textAlign: "center"
            }
          }
        }
      }
    }
  };
};
const prepareComponentToken$h = (token) => Object.assign({
  fullBg: token.colorBgContainer,
  fullPanelBg: token.colorBgContainer,
  itemActiveBg: token.controlItemBgActive,
  yearControlWidth: 80,
  monthControlWidth: 70,
  miniContentHeight: 256
}, initPanelComponentToken(token));
const useStyle$h = genStyleHooks("Calendar", (token) => {
  const calendarCls = `${token.componentCls}-calendar`;
  const calendarToken = merge(token, initPickerPanelToken(token), {
    calendarCls,
    pickerCellInnerCls: `${token.componentCls}-cell-inner`,
    dateValueHeight: token.controlHeightSM,
    weekHeight: token.calc(token.controlHeightSM).mul(0.75).equal(),
    dateContentHeight: token.calc(token.calc(token.fontHeightSM).add(token.marginXS)).mul(3).add(token.calc(token.lineWidth).mul(2)).equal()
  });
  return genCalendarStyles(calendarToken);
}, prepareComponentToken$h);
const isSameYear = (date1, date2, config) => {
  const {
    getYear
  } = config;
  return date1 && date2 && getYear(date1) === getYear(date2);
};
const isSameMonth = (date1, date2, config) => {
  const {
    getMonth
  } = config;
  return isSameYear(date1, date2, config) && getMonth(date1) === getMonth(date2);
};
const isSameDate = (date1, date2, config) => {
  const {
    getDate
  } = config;
  return isSameMonth(date1, date2, config) && getDate(date1) === getDate(date2);
};
const generateCalendar = (generateConfig2) => {
  const Calendar2 = (props) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      style,
      dateFullCellRender,
      dateCellRender,
      monthFullCellRender,
      monthCellRender,
      cellRender,
      fullCellRender,
      headerRender,
      value,
      defaultValue,
      disabledDate,
      mode,
      validRange,
      fullscreen = true,
      showWeek,
      onChange,
      onPanelChange,
      onSelect
    } = props;
    const {
      getPrefixCls,
      direction,
      className: contextClassName,
      style: contextStyle
    } = useComponentConfig("calendar");
    const prefixCls = getPrefixCls("picker", customizePrefixCls);
    const calendarPrefixCls = `${prefixCls}-calendar`;
    const [wrapCSSVar, hashId, cssVarCls] = useStyle$h(prefixCls, calendarPrefixCls);
    const today = generateConfig2.getNow();
    const [mergedValue, setMergedValue] = useMergedState(() => value || generateConfig2.getNow(), {
      defaultValue,
      value
    });
    const [mergedMode, setMergedMode] = useMergedState("month", {
      value: mode
    });
    const panelMode = reactExports.useMemo(() => mergedMode === "year" ? "month" : "date", [mergedMode]);
    const mergedDisabledDate = reactExports.useCallback((date) => {
      const notInRange = validRange ? generateConfig2.isAfter(validRange[0], date) || generateConfig2.isAfter(date, validRange[1]) : false;
      return notInRange || !!(disabledDate === null || disabledDate === void 0 ? void 0 : disabledDate(date));
    }, [disabledDate, validRange]);
    const triggerPanelChange = (date, newMode) => {
      onPanelChange === null || onPanelChange === void 0 ? void 0 : onPanelChange(date, newMode);
    };
    const triggerChange = (date) => {
      setMergedValue(date);
      if (!isSameDate(date, mergedValue, generateConfig2)) {
        if (panelMode === "date" && !isSameMonth(date, mergedValue, generateConfig2) || panelMode === "month" && !isSameYear(date, mergedValue, generateConfig2)) {
          triggerPanelChange(date, mergedMode);
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(date);
      }
    };
    const triggerModeChange = (newMode) => {
      setMergedMode(newMode);
      triggerPanelChange(mergedValue, newMode);
    };
    const onInternalSelect = (date, source) => {
      triggerChange(date);
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(date, {
        source
      });
    };
    const dateRender = reactExports.useCallback((date, info) => {
      if (fullCellRender) {
        return fullCellRender(date, info);
      }
      if (dateFullCellRender) {
        return dateFullCellRender(date);
      }
      return /* @__PURE__ */ reactExports.createElement("div", {
        className: classNames(`${prefixCls}-cell-inner`, `${calendarPrefixCls}-date`, {
          [`${calendarPrefixCls}-date-today`]: isSameDate(today, date, generateConfig2)
        })
      }, /* @__PURE__ */ reactExports.createElement("div", {
        className: `${calendarPrefixCls}-date-value`
      }, String(generateConfig2.getDate(date)).padStart(2, "0")), /* @__PURE__ */ reactExports.createElement("div", {
        className: `${calendarPrefixCls}-date-content`
      }, typeof cellRender === "function" ? cellRender(date, info) : dateCellRender === null || dateCellRender === void 0 ? void 0 : dateCellRender(date)));
    }, [today, prefixCls, calendarPrefixCls, fullCellRender, dateFullCellRender, cellRender, dateCellRender]);
    const monthRender = reactExports.useCallback((date, info) => {
      if (fullCellRender) {
        return fullCellRender(date, info);
      }
      if (monthFullCellRender) {
        return monthFullCellRender(date);
      }
      const months = info.locale.shortMonths || generateConfig2.locale.getShortMonths(info.locale.locale);
      return /* @__PURE__ */ reactExports.createElement("div", {
        className: classNames(`${prefixCls}-cell-inner`, `${calendarPrefixCls}-date`, {
          [`${calendarPrefixCls}-date-today`]: isSameMonth(today, date, generateConfig2)
        })
      }, /* @__PURE__ */ reactExports.createElement("div", {
        className: `${calendarPrefixCls}-date-value`
      }, months[generateConfig2.getMonth(date)]), /* @__PURE__ */ reactExports.createElement("div", {
        className: `${calendarPrefixCls}-date-content`
      }, typeof cellRender === "function" ? cellRender(date, info) : monthCellRender === null || monthCellRender === void 0 ? void 0 : monthCellRender(date)));
    }, [today, prefixCls, calendarPrefixCls, fullCellRender, monthFullCellRender, cellRender, monthCellRender]);
    const [contextLocale] = useLocale("Calendar", locale);
    const locale$1 = Object.assign(Object.assign({}, contextLocale), props.locale);
    const mergedCellRender = (current, info) => {
      if (info.type === "date") {
        return dateRender(current, info);
      }
      if (info.type === "month") {
        return monthRender(current, Object.assign(Object.assign({}, info), {
          locale: locale$1 === null || locale$1 === void 0 ? void 0 : locale$1.lang
        }));
      }
    };
    return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
      className: classNames(calendarPrefixCls, {
        [`${calendarPrefixCls}-full`]: fullscreen,
        [`${calendarPrefixCls}-mini`]: !fullscreen,
        [`${calendarPrefixCls}-rtl`]: direction === "rtl"
      }, contextClassName, className, rootClassName, hashId, cssVarCls),
      style: Object.assign(Object.assign({}, contextStyle), style)
    }, headerRender ? headerRender({
      value: mergedValue,
      type: mergedMode,
      onChange: (nextDate) => {
        onInternalSelect(nextDate, "customize");
      },
      onTypeChange: triggerModeChange
    }) : /* @__PURE__ */ reactExports.createElement(CalendarHeader, {
      prefixCls: calendarPrefixCls,
      value: mergedValue,
      generateConfig: generateConfig2,
      mode: mergedMode,
      fullscreen,
      locale: locale$1 === null || locale$1 === void 0 ? void 0 : locale$1.lang,
      validRange,
      onChange: onInternalSelect,
      onModeChange: triggerModeChange
    }), /* @__PURE__ */ reactExports.createElement(RefPanelPicker, {
      value: mergedValue,
      prefixCls,
      locale: locale$1 === null || locale$1 === void 0 ? void 0 : locale$1.lang,
      generateConfig: generateConfig2,
      cellRender: mergedCellRender,
      onSelect: (nextDate) => {
        onInternalSelect(nextDate, panelMode);
      },
      mode: panelMode,
      picker: panelMode,
      disabledDate: mergedDisabledDate,
      hideHeader: true,
      showWeek
    })));
  };
  return Calendar2;
};
const Calendar = generateCalendar(generateConfig);
Calendar.generateCalendar = generateCalendar;
var __rest$w = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Grid = (_a) => {
  var {
    prefixCls,
    className,
    hoverable = true
  } = _a, props = __rest$w(_a, ["prefixCls", "className", "hoverable"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefix = getPrefixCls("card", prefixCls);
  const classString = classNames(`${prefix}-grid`, className, {
    [`${prefix}-grid-hoverable`]: hoverable
  });
  return /* @__PURE__ */ reactExports.createElement("div", Object.assign({}, props, {
    className: classString
  }));
};
const genCardHeadStyle = (token) => {
  const {
    antCls,
    componentCls,
    headerHeight,
    headerPadding,
    tabsMarginBottom
  } = token;
  return Object.assign(Object.assign({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: headerHeight,
    marginBottom: -1,
    padding: `0 ${unit(headerPadding)}`,
    color: token.colorTextHeading,
    fontWeight: token.fontWeightStrong,
    fontSize: token.headerFontSize,
    background: token.headerBg,
    borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorderSecondary}`,
    borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0`
  }, clearFix()), {
    "&-wrapper": {
      width: "100%",
      display: "flex",
      alignItems: "center"
    },
    "&-title": Object.assign(Object.assign({
      display: "inline-block",
      flex: 1
    }, textEllipsis), {
      [`
          > ${componentCls}-typography,
          > ${componentCls}-typography-edit-content
        `]: {
        insetInlineStart: 0,
        marginTop: 0,
        marginBottom: 0
      }
    }),
    [`${antCls}-tabs-top`]: {
      clear: "both",
      marginBottom: tabsMarginBottom,
      color: token.colorText,
      fontWeight: "normal",
      fontSize: token.fontSize,
      "&-bar": {
        borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorderSecondary}`
      }
    }
  });
};
const genCardGridStyle = (token) => {
  const {
    cardPaddingBase,
    colorBorderSecondary,
    cardShadow,
    lineWidth
  } = token;
  return {
    width: "33.33%",
    padding: cardPaddingBase,
    border: 0,
    borderRadius: 0,
    boxShadow: `
      ${unit(lineWidth)} 0 0 0 ${colorBorderSecondary},
      0 ${unit(lineWidth)} 0 0 ${colorBorderSecondary},
      ${unit(lineWidth)} ${unit(lineWidth)} 0 0 ${colorBorderSecondary},
      ${unit(lineWidth)} 0 0 0 ${colorBorderSecondary} inset,
      0 ${unit(lineWidth)} 0 0 ${colorBorderSecondary} inset;
    `,
    transition: `all ${token.motionDurationMid}`,
    "&-hoverable:hover": {
      position: "relative",
      zIndex: 1,
      boxShadow: cardShadow
    }
  };
};
const genCardActionsStyle = (token) => {
  const {
    componentCls,
    iconCls,
    actionsLiMargin,
    cardActionsIconSize,
    colorBorderSecondary,
    actionsBg
  } = token;
  return Object.assign(Object.assign({
    margin: 0,
    padding: 0,
    listStyle: "none",
    background: actionsBg,
    borderTop: `${unit(token.lineWidth)} ${token.lineType} ${colorBorderSecondary}`,
    display: "flex",
    borderRadius: `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}`
  }, clearFix()), {
    "& > li": {
      margin: actionsLiMargin,
      color: token.colorTextDescription,
      textAlign: "center",
      "> span": {
        position: "relative",
        display: "block",
        minWidth: token.calc(token.cardActionsIconSize).mul(2).equal(),
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        cursor: "pointer",
        "&:hover": {
          color: token.colorPrimary,
          transition: `color ${token.motionDurationMid}`
        },
        [`a:not(${componentCls}-btn), > ${iconCls}`]: {
          display: "inline-block",
          width: "100%",
          color: token.colorIcon,
          lineHeight: unit(token.fontHeight),
          transition: `color ${token.motionDurationMid}`,
          "&:hover": {
            color: token.colorPrimary
          }
        },
        [`> ${iconCls}`]: {
          fontSize: cardActionsIconSize,
          lineHeight: unit(token.calc(cardActionsIconSize).mul(token.lineHeight).equal())
        }
      },
      "&:not(:last-child)": {
        borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${colorBorderSecondary}`
      }
    }
  });
};
const genCardMetaStyle = (token) => Object.assign(Object.assign({
  margin: `${unit(token.calc(token.marginXXS).mul(-1).equal())} 0`,
  display: "flex"
}, clearFix()), {
  "&-avatar": {
    paddingInlineEnd: token.padding
  },
  "&-detail": {
    overflow: "hidden",
    flex: 1,
    "> div:not(:last-child)": {
      marginBottom: token.marginXS
    }
  },
  "&-title": Object.assign({
    color: token.colorTextHeading,
    fontWeight: token.fontWeightStrong,
    fontSize: token.fontSizeLG
  }, textEllipsis),
  "&-description": {
    color: token.colorTextDescription
  }
});
const genCardTypeInnerStyle = (token) => {
  const {
    componentCls,
    colorFillAlter,
    headerPadding,
    bodyPadding
  } = token;
  return {
    [`${componentCls}-head`]: {
      padding: `0 ${unit(headerPadding)}`,
      background: colorFillAlter,
      "&-title": {
        fontSize: token.fontSize
      }
    },
    [`${componentCls}-body`]: {
      padding: `${unit(token.padding)} ${unit(bodyPadding)}`
    }
  };
};
const genCardLoadingStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    overflow: "hidden",
    [`${componentCls}-body`]: {
      userSelect: "none"
    }
  };
};
const genCardStyle = (token) => {
  const {
    componentCls,
    cardShadow,
    cardHeadPadding,
    colorBorderSecondary,
    boxShadowTertiary,
    bodyPadding,
    extraColor
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      position: "relative",
      background: token.colorBgContainer,
      borderRadius: token.borderRadiusLG,
      [`&:not(${componentCls}-bordered)`]: {
        boxShadow: boxShadowTertiary
      },
      [`${componentCls}-head`]: genCardHeadStyle(token),
      [`${componentCls}-extra`]: {
        // https://stackoverflow.com/a/22429853/3040605
        marginInlineStart: "auto",
        color: extraColor,
        fontWeight: "normal",
        fontSize: token.fontSize
      },
      [`${componentCls}-body`]: {
        padding: bodyPadding,
        borderRadius: `0 0 ${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)}`
      },
      [`${componentCls}-grid`]: genCardGridStyle(token),
      [`${componentCls}-cover`]: {
        "> *": {
          display: "block",
          width: "100%",
          borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0`
        }
      },
      [`${componentCls}-actions`]: genCardActionsStyle(token),
      [`${componentCls}-meta`]: genCardMetaStyle(token)
    }),
    [`${componentCls}-bordered`]: {
      border: `${unit(token.lineWidth)} ${token.lineType} ${colorBorderSecondary}`,
      [`${componentCls}-cover`]: {
        marginTop: -1,
        marginInlineStart: -1,
        marginInlineEnd: -1
      }
    },
    [`${componentCls}-hoverable`]: {
      cursor: "pointer",
      transition: `box-shadow ${token.motionDurationMid}, border-color ${token.motionDurationMid}`,
      "&:hover": {
        borderColor: "transparent",
        boxShadow: cardShadow
      }
    },
    [`${componentCls}-contain-grid`]: {
      borderRadius: `${unit(token.borderRadiusLG)} ${unit(token.borderRadiusLG)} 0 0 `,
      [`${componentCls}-body`]: {
        display: "flex",
        flexWrap: "wrap"
      },
      [`&:not(${componentCls}-loading) ${componentCls}-body`]: {
        marginBlockStart: token.calc(token.lineWidth).mul(-1).equal(),
        marginInlineStart: token.calc(token.lineWidth).mul(-1).equal(),
        padding: 0
      }
    },
    [`${componentCls}-contain-tabs`]: {
      [`> div${componentCls}-head`]: {
        minHeight: 0,
        [`${componentCls}-head-title, ${componentCls}-extra`]: {
          paddingTop: cardHeadPadding
        }
      }
    },
    [`${componentCls}-type-inner`]: genCardTypeInnerStyle(token),
    [`${componentCls}-loading`]: genCardLoadingStyle(token),
    [`${componentCls}-rtl`]: {
      direction: "rtl"
    }
  };
};
const genCardSizeStyle = (token) => {
  const {
    componentCls,
    bodyPaddingSM,
    headerPaddingSM,
    headerHeightSM,
    headerFontSizeSM
  } = token;
  return {
    [`${componentCls}-small`]: {
      [`> ${componentCls}-head`]: {
        minHeight: headerHeightSM,
        padding: `0 ${unit(headerPaddingSM)}`,
        fontSize: headerFontSizeSM,
        [`> ${componentCls}-head-wrapper`]: {
          [`> ${componentCls}-extra`]: {
            fontSize: token.fontSize
          }
        }
      },
      [`> ${componentCls}-body`]: {
        padding: bodyPaddingSM
      }
    },
    [`${componentCls}-small${componentCls}-contain-tabs`]: {
      [`> ${componentCls}-head`]: {
        [`${componentCls}-head-title, ${componentCls}-extra`]: {
          paddingTop: 0,
          display: "flex",
          alignItems: "center"
        }
      }
    }
  };
};
const prepareComponentToken$g = (token) => {
  var _a, _b;
  return {
    headerBg: "transparent",
    headerFontSize: token.fontSizeLG,
    headerFontSizeSM: token.fontSize,
    headerHeight: token.fontSizeLG * token.lineHeightLG + token.padding * 2,
    headerHeightSM: token.fontSize * token.lineHeight + token.paddingXS * 2,
    actionsBg: token.colorBgContainer,
    actionsLiMargin: `${token.paddingSM}px 0`,
    tabsMarginBottom: -token.padding - token.lineWidth,
    extraColor: token.colorText,
    bodyPaddingSM: 12,
    // Fixed padding.
    headerPaddingSM: 12,
    bodyPadding: (_a = token.bodyPadding) !== null && _a !== void 0 ? _a : token.paddingLG,
    headerPadding: (_b = token.headerPadding) !== null && _b !== void 0 ? _b : token.paddingLG
  };
};
const useStyle$g = genStyleHooks("Card", (token) => {
  const cardToken = merge(token, {
    cardShadow: token.boxShadowCard,
    cardHeadPadding: token.padding,
    cardPaddingBase: token.paddingLG,
    cardActionsIconSize: token.fontSize
  });
  return [
    // Style
    genCardStyle(cardToken),
    // Size
    genCardSizeStyle(cardToken)
  ];
}, prepareComponentToken$g);
var __rest$v = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const ActionNode = (props) => {
  const {
    actionClasses,
    actions = [],
    actionStyle
  } = props;
  return /* @__PURE__ */ reactExports.createElement("ul", {
    className: actionClasses,
    style: actionStyle
  }, actions.map((action, index2) => {
    const key = `action-${index2}`;
    return /* @__PURE__ */ reactExports.createElement("li", {
      style: {
        width: `${100 / actions.length}%`
      },
      key
    }, /* @__PURE__ */ reactExports.createElement("span", null, action));
  }));
};
const Card$1 = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    extra,
    headStyle = {},
    bodyStyle = {},
    title,
    loading,
    bordered,
    variant: customVariant,
    size: customizeSize,
    type,
    cover,
    actions,
    tabList,
    children,
    activeTabKey,
    defaultActiveTabKey,
    tabBarExtraContent,
    hoverable,
    tabProps = {},
    classNames: customClassNames,
    styles: customStyles
  } = props, others = __rest$v(props, ["prefixCls", "className", "rootClassName", "style", "extra", "headStyle", "bodyStyle", "title", "loading", "bordered", "variant", "size", "type", "cover", "actions", "tabList", "children", "activeTabKey", "defaultActiveTabKey", "tabBarExtraContent", "hoverable", "tabProps", "classNames", "styles"]);
  const {
    getPrefixCls,
    direction,
    card
  } = reactExports.useContext(ConfigContext);
  const [variant] = useVariant("card", customVariant, bordered);
  const onTabChange = (key) => {
    var _a;
    (_a = props.onTabChange) === null || _a === void 0 ? void 0 : _a.call(props, key);
  };
  const moduleClass = (moduleName) => {
    var _a;
    return classNames((_a = card === null || card === void 0 ? void 0 : card.classNames) === null || _a === void 0 ? void 0 : _a[moduleName], customClassNames === null || customClassNames === void 0 ? void 0 : customClassNames[moduleName]);
  };
  const moduleStyle = (moduleName) => {
    var _a;
    return Object.assign(Object.assign({}, (_a = card === null || card === void 0 ? void 0 : card.styles) === null || _a === void 0 ? void 0 : _a[moduleName]), customStyles === null || customStyles === void 0 ? void 0 : customStyles[moduleName]);
  };
  const isContainGrid = reactExports.useMemo(() => {
    let containGrid = false;
    reactExports.Children.forEach(children, (element) => {
      if ((element === null || element === void 0 ? void 0 : element.type) === Grid) {
        containGrid = true;
      }
    });
    return containGrid;
  }, [children]);
  const prefixCls = getPrefixCls("card", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$g(prefixCls);
  const loadingBlock = /* @__PURE__ */ reactExports.createElement(Skeleton, {
    loading: true,
    active: true,
    paragraph: {
      rows: 4
    },
    title: false
  }, children);
  const hasActiveTabKey = activeTabKey !== void 0;
  const extraProps = Object.assign(Object.assign({}, tabProps), {
    [hasActiveTabKey ? "activeKey" : "defaultActiveKey"]: hasActiveTabKey ? activeTabKey : defaultActiveTabKey,
    tabBarExtraContent
  });
  let head;
  const mergedSize = useSize(customizeSize);
  const tabSize = !mergedSize || mergedSize === "default" ? "large" : mergedSize;
  const tabs = tabList ? /* @__PURE__ */ reactExports.createElement(Tabs, Object.assign({
    size: tabSize
  }, extraProps, {
    className: `${prefixCls}-head-tabs`,
    onChange: onTabChange,
    items: tabList.map((_a) => {
      var {
        tab
      } = _a, item = __rest$v(_a, ["tab"]);
      return Object.assign({
        label: tab
      }, item);
    })
  })) : null;
  if (title || extra || tabs) {
    const headClasses = classNames(`${prefixCls}-head`, moduleClass("header"));
    const titleClasses = classNames(`${prefixCls}-head-title`, moduleClass("title"));
    const extraClasses = classNames(`${prefixCls}-extra`, moduleClass("extra"));
    const mergedHeadStyle = Object.assign(Object.assign({}, headStyle), moduleStyle("header"));
    head = /* @__PURE__ */ reactExports.createElement("div", {
      className: headClasses,
      style: mergedHeadStyle
    }, /* @__PURE__ */ reactExports.createElement("div", {
      className: `${prefixCls}-head-wrapper`
    }, title && /* @__PURE__ */ reactExports.createElement("div", {
      className: titleClasses,
      style: moduleStyle("title")
    }, title), extra && /* @__PURE__ */ reactExports.createElement("div", {
      className: extraClasses,
      style: moduleStyle("extra")
    }, extra)), tabs);
  }
  const coverClasses = classNames(`${prefixCls}-cover`, moduleClass("cover"));
  const coverDom = cover ? /* @__PURE__ */ reactExports.createElement("div", {
    className: coverClasses,
    style: moduleStyle("cover")
  }, cover) : null;
  const bodyClasses = classNames(`${prefixCls}-body`, moduleClass("body"));
  const mergedBodyStyle = Object.assign(Object.assign({}, bodyStyle), moduleStyle("body"));
  const body = /* @__PURE__ */ reactExports.createElement("div", {
    className: bodyClasses,
    style: mergedBodyStyle
  }, loading ? loadingBlock : children);
  const actionClasses = classNames(`${prefixCls}-actions`, moduleClass("actions"));
  const actionDom = (actions === null || actions === void 0 ? void 0 : actions.length) ? /* @__PURE__ */ reactExports.createElement(ActionNode, {
    actionClasses,
    actionStyle: moduleStyle("actions"),
    actions
  }) : null;
  const divProps = omit(others, ["onTabChange"]);
  const classString = classNames(prefixCls, card === null || card === void 0 ? void 0 : card.className, {
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-bordered`]: variant !== "borderless",
    [`${prefixCls}-hoverable`]: hoverable,
    [`${prefixCls}-contain-grid`]: isContainGrid,
    [`${prefixCls}-contain-tabs`]: tabList === null || tabList === void 0 ? void 0 : tabList.length,
    [`${prefixCls}-${mergedSize}`]: mergedSize,
    [`${prefixCls}-type-${type}`]: !!type,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, rootClassName, hashId, cssVarCls);
  const mergedStyle = Object.assign(Object.assign({}, card === null || card === void 0 ? void 0 : card.style), style);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({
    ref
  }, divProps, {
    className: classString,
    style: mergedStyle
  }), head, coverDom, body, actionDom));
});
var __rest$u = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Meta$1 = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    avatar,
    title,
    description
  } = props, others = __rest$u(props, ["prefixCls", "className", "avatar", "title", "description"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("card", customizePrefixCls);
  const classString = classNames(`${prefixCls}-meta`, className);
  const avatarDom = avatar ? /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-meta-avatar`
  }, avatar) : null;
  const titleDom = title ? /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-meta-title`
  }, title) : null;
  const descriptionDom = description ? /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-meta-description`
  }, description) : null;
  const MetaDetail = titleDom || descriptionDom ? /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-meta-detail`
  }, titleDom, descriptionDom) : null;
  return /* @__PURE__ */ reactExports.createElement("div", Object.assign({}, others, {
    className: classString
  }), avatarDom, MetaDetail);
};
const Card = Card$1;
Card.Grid = Grid;
Card.Meta = Meta$1;
var initialState = {
  animating: false,
  autoplaying: null,
  currentDirection: 0,
  currentLeft: null,
  currentSlide: 0,
  direction: 1,
  dragging: false,
  edgeDragged: false,
  initialized: false,
  lazyLoadedList: [],
  listHeight: null,
  listWidth: null,
  scrolling: false,
  slideCount: null,
  slideHeight: null,
  slideWidth: null,
  swipeLeft: null,
  swiped: false,
  // used by swipeEvent. differentites between touch and swipe.
  swiping: false,
  touchObject: {
    startX: 0,
    startY: 0,
    curX: 0,
    curY: 0
  },
  trackStyle: {},
  trackWidth: 0,
  targetSlide: 0
};
var defaultProps = {
  accessibility: true,
  adaptiveHeight: false,
  afterChange: null,
  appendDots: function appendDots(dots) {
    return /* @__PURE__ */ React.createElement("ul", {
      style: {
        display: "block"
      }
    }, dots);
  },
  arrows: true,
  autoplay: false,
  autoplaySpeed: 3e3,
  beforeChange: null,
  centerMode: false,
  centerPadding: "50px",
  className: "",
  cssEase: "ease",
  customPaging: function customPaging(i) {
    return /* @__PURE__ */ React.createElement("button", null, i + 1);
  },
  dots: false,
  dotsClass: "slick-dots",
  draggable: true,
  easing: "linear",
  edgeFriction: 0.35,
  fade: false,
  focusOnSelect: false,
  infinite: true,
  initialSlide: 0,
  lazyLoad: null,
  nextArrow: null,
  onEdge: null,
  onInit: null,
  onLazyLoadError: null,
  onReInit: null,
  pauseOnDotsHover: false,
  pauseOnFocus: false,
  pauseOnHover: true,
  prevArrow: null,
  responsive: null,
  rows: 1,
  rtl: false,
  slide: "div",
  slidesPerRow: 1,
  slidesToScroll: 1,
  slidesToShow: 1,
  speed: 500,
  swipe: true,
  swipeEvent: null,
  swipeToSlide: false,
  touchMove: true,
  touchThreshold: 5,
  useCSS: true,
  useTransform: true,
  variableWidth: false,
  vertical: false,
  waitForAnimate: true,
  asNavFor: null
};
function clamp(number, lowerBound, upperBound) {
  return Math.max(lowerBound, Math.min(number, upperBound));
}
var safePreventDefault = function safePreventDefault2(event) {
  var passiveEvents = ["onTouchStart", "onTouchMove", "onWheel"];
  if (!passiveEvents.includes(event._reactName)) {
    event.preventDefault();
  }
};
var getOnDemandLazySlides = function getOnDemandLazySlides2(spec) {
  var onDemandSlides = [];
  var startIndex = lazyStartIndex(spec);
  var endIndex = lazyEndIndex(spec);
  for (var slideIndex = startIndex; slideIndex < endIndex; slideIndex++) {
    if (spec.lazyLoadedList.indexOf(slideIndex) < 0) {
      onDemandSlides.push(slideIndex);
    }
  }
  return onDemandSlides;
};
var lazyStartIndex = function lazyStartIndex2(spec) {
  return spec.currentSlide - lazySlidesOnLeft(spec);
};
var lazyEndIndex = function lazyEndIndex2(spec) {
  return spec.currentSlide + lazySlidesOnRight(spec);
};
var lazySlidesOnLeft = function lazySlidesOnLeft2(spec) {
  return spec.centerMode ? Math.floor(spec.slidesToShow / 2) + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : 0;
};
var lazySlidesOnRight = function lazySlidesOnRight2(spec) {
  return spec.centerMode ? Math.floor((spec.slidesToShow - 1) / 2) + 1 + (parseInt(spec.centerPadding) > 0 ? 1 : 0) : spec.slidesToShow;
};
var getWidth = function getWidth2(elem) {
  return elem && elem.offsetWidth || 0;
};
var getHeight = function getHeight2(elem) {
  return elem && elem.offsetHeight || 0;
};
var getSwipeDirection = function getSwipeDirection2(touchObject) {
  var verticalSwiping = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var xDist, yDist, r, swipeAngle;
  xDist = touchObject.startX - touchObject.curX;
  yDist = touchObject.startY - touchObject.curY;
  r = Math.atan2(yDist, xDist);
  swipeAngle = Math.round(r * 180 / Math.PI);
  if (swipeAngle < 0) {
    swipeAngle = 360 - Math.abs(swipeAngle);
  }
  if (swipeAngle <= 45 && swipeAngle >= 0 || swipeAngle <= 360 && swipeAngle >= 315) {
    return "left";
  }
  if (swipeAngle >= 135 && swipeAngle <= 225) {
    return "right";
  }
  if (verticalSwiping === true) {
    if (swipeAngle >= 35 && swipeAngle <= 135) {
      return "up";
    } else {
      return "down";
    }
  }
  return "vertical";
};
var canGoNext = function canGoNext2(spec) {
  var canGo = true;
  if (!spec.infinite) {
    if (spec.centerMode && spec.currentSlide >= spec.slideCount - 1) {
      canGo = false;
    } else if (spec.slideCount <= spec.slidesToShow || spec.currentSlide >= spec.slideCount - spec.slidesToShow) {
      canGo = false;
    }
  }
  return canGo;
};
var extractObject = function extractObject2(spec, keys) {
  var newObject = {};
  keys.forEach(function(key) {
    return newObject[key] = spec[key];
  });
  return newObject;
};
var initializedState = function initializedState2(spec) {
  var slideCount = React.Children.count(spec.children);
  var listNode = spec.listRef;
  var listWidth = Math.ceil(getWidth(listNode));
  var trackNode = spec.trackRef && spec.trackRef.node;
  var trackWidth = Math.ceil(getWidth(trackNode));
  var slideWidth;
  if (!spec.vertical) {
    var centerPaddingAdj = spec.centerMode && parseInt(spec.centerPadding) * 2;
    if (typeof spec.centerPadding === "string" && spec.centerPadding.slice(-1) === "%") {
      centerPaddingAdj *= listWidth / 100;
    }
    slideWidth = Math.ceil((listWidth - centerPaddingAdj) / spec.slidesToShow);
  } else {
    slideWidth = listWidth;
  }
  var slideHeight = listNode && getHeight(listNode.querySelector('[data-index="0"]'));
  var listHeight = slideHeight * spec.slidesToShow;
  var currentSlide = spec.currentSlide === void 0 ? spec.initialSlide : spec.currentSlide;
  if (spec.rtl && spec.currentSlide === void 0) {
    currentSlide = slideCount - 1 - spec.initialSlide;
  }
  var lazyLoadedList = spec.lazyLoadedList || [];
  var slidesToLoad = getOnDemandLazySlides(_objectSpread2(_objectSpread2({}, spec), {}, {
    currentSlide,
    lazyLoadedList
  }));
  lazyLoadedList = lazyLoadedList.concat(slidesToLoad);
  var state = {
    slideCount,
    slideWidth,
    listWidth,
    trackWidth,
    currentSlide,
    slideHeight,
    listHeight,
    lazyLoadedList
  };
  if (spec.autoplaying === null && spec.autoplay) {
    state["autoplaying"] = "playing";
  }
  return state;
};
var slideHandler = function slideHandler2(spec) {
  var waitForAnimate = spec.waitForAnimate, animating = spec.animating, fade = spec.fade, infinite = spec.infinite, index2 = spec.index, slideCount = spec.slideCount, lazyLoad = spec.lazyLoad, currentSlide = spec.currentSlide, centerMode = spec.centerMode, slidesToScroll = spec.slidesToScroll, slidesToShow = spec.slidesToShow, useCSS = spec.useCSS;
  var lazyLoadedList = spec.lazyLoadedList;
  if (waitForAnimate && animating) return {};
  var animationSlide = index2, finalSlide, animationLeft, finalLeft;
  var state = {}, nextState = {};
  var targetSlide = infinite ? index2 : clamp(index2, 0, slideCount - 1);
  if (fade) {
    if (!infinite && (index2 < 0 || index2 >= slideCount)) return {};
    if (index2 < 0) {
      animationSlide = index2 + slideCount;
    } else if (index2 >= slideCount) {
      animationSlide = index2 - slideCount;
    }
    if (lazyLoad && lazyLoadedList.indexOf(animationSlide) < 0) {
      lazyLoadedList = lazyLoadedList.concat(animationSlide);
    }
    state = {
      animating: true,
      currentSlide: animationSlide,
      lazyLoadedList,
      targetSlide: animationSlide
    };
    nextState = {
      animating: false,
      targetSlide: animationSlide
    };
  } else {
    finalSlide = animationSlide;
    if (animationSlide < 0) {
      finalSlide = animationSlide + slideCount;
      if (!infinite) finalSlide = 0;
      else if (slideCount % slidesToScroll !== 0) finalSlide = slideCount - slideCount % slidesToScroll;
    } else if (!canGoNext(spec) && animationSlide > currentSlide) {
      animationSlide = finalSlide = currentSlide;
    } else if (centerMode && animationSlide >= slideCount) {
      animationSlide = infinite ? slideCount : slideCount - 1;
      finalSlide = infinite ? 0 : slideCount - 1;
    } else if (animationSlide >= slideCount) {
      finalSlide = animationSlide - slideCount;
      if (!infinite) finalSlide = slideCount - slidesToShow;
      else if (slideCount % slidesToScroll !== 0) finalSlide = 0;
    }
    if (!infinite && animationSlide + slidesToShow >= slideCount) {
      finalSlide = slideCount - slidesToShow;
    }
    animationLeft = getTrackLeft(_objectSpread2(_objectSpread2({}, spec), {}, {
      slideIndex: animationSlide
    }));
    finalLeft = getTrackLeft(_objectSpread2(_objectSpread2({}, spec), {}, {
      slideIndex: finalSlide
    }));
    if (!infinite) {
      if (animationLeft === finalLeft) animationSlide = finalSlide;
      animationLeft = finalLeft;
    }
    if (lazyLoad) {
      lazyLoadedList = lazyLoadedList.concat(getOnDemandLazySlides(_objectSpread2(_objectSpread2({}, spec), {}, {
        currentSlide: animationSlide
      })));
    }
    if (!useCSS) {
      state = {
        currentSlide: finalSlide,
        trackStyle: getTrackCSS(_objectSpread2(_objectSpread2({}, spec), {}, {
          left: finalLeft
        })),
        lazyLoadedList,
        targetSlide
      };
    } else {
      state = {
        animating: true,
        currentSlide: finalSlide,
        trackStyle: getTrackAnimateCSS(_objectSpread2(_objectSpread2({}, spec), {}, {
          left: animationLeft
        })),
        lazyLoadedList,
        targetSlide
      };
      nextState = {
        animating: false,
        currentSlide: finalSlide,
        trackStyle: getTrackCSS(_objectSpread2(_objectSpread2({}, spec), {}, {
          left: finalLeft
        })),
        swipeLeft: null,
        targetSlide
      };
    }
  }
  return {
    state,
    nextState
  };
};
var changeSlide = function changeSlide2(spec, options) {
  var indexOffset, previousInt, slideOffset, unevenOffset, targetSlide;
  var slidesToScroll = spec.slidesToScroll, slidesToShow = spec.slidesToShow, slideCount = spec.slideCount, currentSlide = spec.currentSlide, previousTargetSlide = spec.targetSlide, lazyLoad = spec.lazyLoad, infinite = spec.infinite;
  unevenOffset = slideCount % slidesToScroll !== 0;
  indexOffset = unevenOffset ? 0 : (slideCount - currentSlide) % slidesToScroll;
  if (options.message === "previous") {
    slideOffset = indexOffset === 0 ? slidesToScroll : slidesToShow - indexOffset;
    targetSlide = currentSlide - slideOffset;
    if (lazyLoad && !infinite) {
      previousInt = currentSlide - slideOffset;
      targetSlide = previousInt === -1 ? slideCount - 1 : previousInt;
    }
    if (!infinite) {
      targetSlide = previousTargetSlide - slidesToScroll;
    }
  } else if (options.message === "next") {
    slideOffset = indexOffset === 0 ? slidesToScroll : indexOffset;
    targetSlide = currentSlide + slideOffset;
    if (lazyLoad && !infinite) {
      targetSlide = (currentSlide + slidesToScroll) % slideCount + indexOffset;
    }
    if (!infinite) {
      targetSlide = previousTargetSlide + slidesToScroll;
    }
  } else if (options.message === "dots") {
    targetSlide = options.index * options.slidesToScroll;
  } else if (options.message === "children") {
    targetSlide = options.index;
    if (infinite) {
      var direction = siblingDirection(_objectSpread2(_objectSpread2({}, spec), {}, {
        targetSlide
      }));
      if (targetSlide > options.currentSlide && direction === "left") {
        targetSlide = targetSlide - slideCount;
      } else if (targetSlide < options.currentSlide && direction === "right") {
        targetSlide = targetSlide + slideCount;
      }
    }
  } else if (options.message === "index") {
    targetSlide = Number(options.index);
  }
  return targetSlide;
};
var keyHandler = function keyHandler2(e2, accessibility, rtl) {
  if (e2.target.tagName.match("TEXTAREA|INPUT|SELECT") || !accessibility) return "";
  if (e2.keyCode === 37) return rtl ? "next" : "previous";
  if (e2.keyCode === 39) return rtl ? "previous" : "next";
  return "";
};
var swipeStart = function swipeStart2(e2, swipe, draggable) {
  e2.target.tagName === "IMG" && safePreventDefault(e2);
  if (!swipe || !draggable && e2.type.indexOf("mouse") !== -1) return "";
  return {
    dragging: true,
    touchObject: {
      startX: e2.touches ? e2.touches[0].pageX : e2.clientX,
      startY: e2.touches ? e2.touches[0].pageY : e2.clientY,
      curX: e2.touches ? e2.touches[0].pageX : e2.clientX,
      curY: e2.touches ? e2.touches[0].pageY : e2.clientY
    }
  };
};
var swipeMove = function swipeMove2(e2, spec) {
  var scrolling = spec.scrolling, animating = spec.animating, vertical = spec.vertical, swipeToSlide = spec.swipeToSlide, verticalSwiping = spec.verticalSwiping, rtl = spec.rtl, currentSlide = spec.currentSlide, edgeFriction = spec.edgeFriction, edgeDragged = spec.edgeDragged, onEdge = spec.onEdge, swiped = spec.swiped, swiping = spec.swiping, slideCount = spec.slideCount, slidesToScroll = spec.slidesToScroll, infinite = spec.infinite, touchObject = spec.touchObject, swipeEvent = spec.swipeEvent, listHeight = spec.listHeight, listWidth = spec.listWidth;
  if (scrolling) return;
  if (animating) return safePreventDefault(e2);
  if (vertical && swipeToSlide && verticalSwiping) safePreventDefault(e2);
  var swipeLeft, state = {};
  var curLeft = getTrackLeft(spec);
  touchObject.curX = e2.touches ? e2.touches[0].pageX : e2.clientX;
  touchObject.curY = e2.touches ? e2.touches[0].pageY : e2.clientY;
  touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)));
  var verticalSwipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curY - touchObject.startY, 2)));
  if (!verticalSwiping && !swiping && verticalSwipeLength > 10) {
    return {
      scrolling: true
    };
  }
  if (verticalSwiping) touchObject.swipeLength = verticalSwipeLength;
  var positionOffset = (!rtl ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1);
  if (verticalSwiping) positionOffset = touchObject.curY > touchObject.startY ? 1 : -1;
  var dotCount = Math.ceil(slideCount / slidesToScroll);
  var swipeDirection = getSwipeDirection(spec.touchObject, verticalSwiping);
  var touchSwipeLength = touchObject.swipeLength;
  if (!infinite) {
    if (currentSlide === 0 && (swipeDirection === "right" || swipeDirection === "down") || currentSlide + 1 >= dotCount && (swipeDirection === "left" || swipeDirection === "up") || !canGoNext(spec) && (swipeDirection === "left" || swipeDirection === "up")) {
      touchSwipeLength = touchObject.swipeLength * edgeFriction;
      if (edgeDragged === false && onEdge) {
        onEdge(swipeDirection);
        state["edgeDragged"] = true;
      }
    }
  }
  if (!swiped && swipeEvent) {
    swipeEvent(swipeDirection);
    state["swiped"] = true;
  }
  if (!vertical) {
    if (!rtl) {
      swipeLeft = curLeft + touchSwipeLength * positionOffset;
    } else {
      swipeLeft = curLeft - touchSwipeLength * positionOffset;
    }
  } else {
    swipeLeft = curLeft + touchSwipeLength * (listHeight / listWidth) * positionOffset;
  }
  if (verticalSwiping) {
    swipeLeft = curLeft + touchSwipeLength * positionOffset;
  }
  state = _objectSpread2(_objectSpread2({}, state), {}, {
    touchObject,
    swipeLeft,
    trackStyle: getTrackCSS(_objectSpread2(_objectSpread2({}, spec), {}, {
      left: swipeLeft
    }))
  });
  if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8) {
    return state;
  }
  if (touchObject.swipeLength > 10) {
    state["swiping"] = true;
    safePreventDefault(e2);
  }
  return state;
};
var swipeEnd = function swipeEnd2(e2, spec) {
  var dragging = spec.dragging, swipe = spec.swipe, touchObject = spec.touchObject, listWidth = spec.listWidth, touchThreshold = spec.touchThreshold, verticalSwiping = spec.verticalSwiping, listHeight = spec.listHeight, swipeToSlide = spec.swipeToSlide, scrolling = spec.scrolling, onSwipe = spec.onSwipe, targetSlide = spec.targetSlide, currentSlide = spec.currentSlide, infinite = spec.infinite;
  if (!dragging) {
    if (swipe) safePreventDefault(e2);
    return {};
  }
  var minSwipe = verticalSwiping ? listHeight / touchThreshold : listWidth / touchThreshold;
  var swipeDirection = getSwipeDirection(touchObject, verticalSwiping);
  var state = {
    dragging: false,
    edgeDragged: false,
    scrolling: false,
    swiping: false,
    swiped: false,
    swipeLeft: null,
    touchObject: {}
  };
  if (scrolling) {
    return state;
  }
  if (!touchObject.swipeLength) {
    return state;
  }
  if (touchObject.swipeLength > minSwipe) {
    safePreventDefault(e2);
    if (onSwipe) {
      onSwipe(swipeDirection);
    }
    var slideCount, newSlide;
    var activeSlide = infinite ? currentSlide : targetSlide;
    switch (swipeDirection) {
      case "left":
      case "up":
        newSlide = activeSlide + getSlideCount(spec);
        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
        state["currentDirection"] = 0;
        break;
      case "right":
      case "down":
        newSlide = activeSlide - getSlideCount(spec);
        slideCount = swipeToSlide ? checkNavigable(spec, newSlide) : newSlide;
        state["currentDirection"] = 1;
        break;
      default:
        slideCount = activeSlide;
    }
    state["triggerSlideHandler"] = slideCount;
  } else {
    var currentLeft = getTrackLeft(spec);
    state["trackStyle"] = getTrackAnimateCSS(_objectSpread2(_objectSpread2({}, spec), {}, {
      left: currentLeft
    }));
  }
  return state;
};
var getNavigableIndexes = function getNavigableIndexes2(spec) {
  var max = spec.infinite ? spec.slideCount * 2 : spec.slideCount;
  var breakpoint = spec.infinite ? spec.slidesToShow * -1 : 0;
  var counter = spec.infinite ? spec.slidesToShow * -1 : 0;
  var indexes = [];
  while (breakpoint < max) {
    indexes.push(breakpoint);
    breakpoint = counter + spec.slidesToScroll;
    counter += Math.min(spec.slidesToScroll, spec.slidesToShow);
  }
  return indexes;
};
var checkNavigable = function checkNavigable2(spec, index2) {
  var navigables = getNavigableIndexes(spec);
  var prevNavigable = 0;
  if (index2 > navigables[navigables.length - 1]) {
    index2 = navigables[navigables.length - 1];
  } else {
    for (var n in navigables) {
      if (index2 < navigables[n]) {
        index2 = prevNavigable;
        break;
      }
      prevNavigable = navigables[n];
    }
  }
  return index2;
};
var getSlideCount = function getSlideCount2(spec) {
  var centerOffset = spec.centerMode ? spec.slideWidth * Math.floor(spec.slidesToShow / 2) : 0;
  if (spec.swipeToSlide) {
    var swipedSlide;
    var slickList = spec.listRef;
    var slides = slickList.querySelectorAll && slickList.querySelectorAll(".slick-slide") || [];
    Array.from(slides).every(function(slide) {
      if (!spec.vertical) {
        if (slide.offsetLeft - centerOffset + getWidth(slide) / 2 > spec.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      } else {
        if (slide.offsetTop + getHeight(slide) / 2 > spec.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      }
      return true;
    });
    if (!swipedSlide) {
      return 0;
    }
    var currentIndex = spec.rtl === true ? spec.slideCount - spec.currentSlide : spec.currentSlide;
    var slidesTraversed = Math.abs(swipedSlide.dataset.index - currentIndex) || 1;
    return slidesTraversed;
  } else {
    return spec.slidesToScroll;
  }
};
var checkSpecKeys = function checkSpecKeys2(spec, keysArray) {
  return (
    // eslint-disable-next-line no-prototype-builtins
    keysArray.reduce(function(value, key) {
      return value && spec.hasOwnProperty(key);
    }, true) ? null : console.error("Keys Missing:", spec)
  );
};
var getTrackCSS = function getTrackCSS2(spec) {
  checkSpecKeys(spec, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth"]);
  var trackWidth, trackHeight;
  if (!spec.vertical) {
    trackWidth = getTotalSlides(spec) * spec.slideWidth;
  } else {
    var trackChildren = spec.unslick ? spec.slideCount : spec.slideCount + 2 * spec.slidesToShow;
    trackHeight = trackChildren * spec.slideHeight;
  }
  var style = {
    opacity: 1,
    transition: "",
    WebkitTransition: ""
  };
  if (spec.useTransform) {
    var WebkitTransform = !spec.vertical ? "translate3d(" + spec.left + "px, 0px, 0px)" : "translate3d(0px, " + spec.left + "px, 0px)";
    var transform = !spec.vertical ? "translate3d(" + spec.left + "px, 0px, 0px)" : "translate3d(0px, " + spec.left + "px, 0px)";
    var msTransform = !spec.vertical ? "translateX(" + spec.left + "px)" : "translateY(" + spec.left + "px)";
    style = _objectSpread2(_objectSpread2({}, style), {}, {
      WebkitTransform,
      transform,
      msTransform
    });
  } else {
    if (spec.vertical) {
      style["top"] = spec.left;
    } else {
      style["left"] = spec.left;
    }
  }
  if (spec.fade) style = {
    opacity: 1
  };
  if (trackWidth) style.width = trackWidth;
  if (trackHeight) style.height = trackHeight;
  if (window && !window.addEventListener && window.attachEvent) {
    if (!spec.vertical) {
      style.marginLeft = spec.left + "px";
    } else {
      style.marginTop = spec.left + "px";
    }
  }
  return style;
};
var getTrackAnimateCSS = function getTrackAnimateCSS2(spec) {
  checkSpecKeys(spec, ["left", "variableWidth", "slideCount", "slidesToShow", "slideWidth", "speed", "cssEase"]);
  var style = getTrackCSS(spec);
  if (spec.useTransform) {
    style.WebkitTransition = "-webkit-transform " + spec.speed + "ms " + spec.cssEase;
    style.transition = "transform " + spec.speed + "ms " + spec.cssEase;
  } else {
    if (spec.vertical) {
      style.transition = "top " + spec.speed + "ms " + spec.cssEase;
    } else {
      style.transition = "left " + spec.speed + "ms " + spec.cssEase;
    }
  }
  return style;
};
var getTrackLeft = function getTrackLeft2(spec) {
  if (spec.unslick) {
    return 0;
  }
  checkSpecKeys(spec, ["slideIndex", "trackRef", "infinite", "centerMode", "slideCount", "slidesToShow", "slidesToScroll", "slideWidth", "listWidth", "variableWidth", "slideHeight"]);
  var slideIndex = spec.slideIndex, trackRef = spec.trackRef, infinite = spec.infinite, centerMode = spec.centerMode, slideCount = spec.slideCount, slidesToShow = spec.slidesToShow, slidesToScroll = spec.slidesToScroll, slideWidth = spec.slideWidth, listWidth = spec.listWidth, variableWidth = spec.variableWidth, slideHeight = spec.slideHeight, fade = spec.fade, vertical = spec.vertical;
  var slideOffset = 0;
  var targetLeft;
  var targetSlide;
  var verticalOffset = 0;
  if (fade || spec.slideCount === 1) {
    return 0;
  }
  var slidesToOffset = 0;
  if (infinite) {
    slidesToOffset = -getPreClones(spec);
    if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) {
      slidesToOffset = -(slideIndex > slideCount ? slidesToShow - (slideIndex - slideCount) : slideCount % slidesToScroll);
    }
    if (centerMode) {
      slidesToOffset += parseInt(slidesToShow / 2);
    }
  } else {
    if (slideCount % slidesToScroll !== 0 && slideIndex + slidesToScroll > slideCount) {
      slidesToOffset = slidesToShow - slideCount % slidesToScroll;
    }
    if (centerMode) {
      slidesToOffset = parseInt(slidesToShow / 2);
    }
  }
  slideOffset = slidesToOffset * slideWidth;
  verticalOffset = slidesToOffset * slideHeight;
  if (!vertical) {
    targetLeft = slideIndex * slideWidth * -1 + slideOffset;
  } else {
    targetLeft = slideIndex * slideHeight * -1 + verticalOffset;
  }
  if (variableWidth === true) {
    var targetSlideIndex;
    var trackElem = trackRef && trackRef.node;
    targetSlideIndex = slideIndex + getPreClones(spec);
    targetSlide = trackElem && trackElem.childNodes[targetSlideIndex];
    targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
    if (centerMode === true) {
      targetSlideIndex = infinite ? slideIndex + getPreClones(spec) : slideIndex;
      targetSlide = trackElem && trackElem.children[targetSlideIndex];
      targetLeft = 0;
      for (var slide = 0; slide < targetSlideIndex; slide++) {
        targetLeft -= trackElem && trackElem.children[slide] && trackElem.children[slide].offsetWidth;
      }
      targetLeft -= parseInt(spec.centerPadding);
      targetLeft += targetSlide && (listWidth - targetSlide.offsetWidth) / 2;
    }
  }
  return targetLeft;
};
var getPreClones = function getPreClones2(spec) {
  if (spec.unslick || !spec.infinite) {
    return 0;
  }
  if (spec.variableWidth) {
    return spec.slideCount;
  }
  return spec.slidesToShow + (spec.centerMode ? 1 : 0);
};
var getPostClones = function getPostClones2(spec) {
  if (spec.unslick || !spec.infinite) {
    return 0;
  }
  return spec.slideCount;
};
var getTotalSlides = function getTotalSlides2(spec) {
  return spec.slideCount === 1 ? 1 : getPreClones(spec) + spec.slideCount + getPostClones(spec);
};
var siblingDirection = function siblingDirection2(spec) {
  if (spec.targetSlide > spec.currentSlide) {
    if (spec.targetSlide > spec.currentSlide + slidesOnRight(spec)) {
      return "left";
    }
    return "right";
  } else {
    if (spec.targetSlide < spec.currentSlide - slidesOnLeft(spec)) {
      return "right";
    }
    return "left";
  }
};
var slidesOnRight = function slidesOnRight2(_ref) {
  var slidesToShow = _ref.slidesToShow, centerMode = _ref.centerMode, rtl = _ref.rtl, centerPadding = _ref.centerPadding;
  if (centerMode) {
    var right = (slidesToShow - 1) / 2 + 1;
    if (parseInt(centerPadding) > 0) right += 1;
    if (rtl && slidesToShow % 2 === 0) right += 1;
    return right;
  }
  if (rtl) {
    return 0;
  }
  return slidesToShow - 1;
};
var slidesOnLeft = function slidesOnLeft2(_ref2) {
  var slidesToShow = _ref2.slidesToShow, centerMode = _ref2.centerMode, rtl = _ref2.rtl, centerPadding = _ref2.centerPadding;
  if (centerMode) {
    var left = (slidesToShow - 1) / 2 + 1;
    if (parseInt(centerPadding) > 0) left += 1;
    if (!rtl && slidesToShow % 2 === 0) left += 1;
    return left;
  }
  if (rtl) {
    return slidesToShow - 1;
  }
  return 0;
};
var canUseDOM = function canUseDOM2() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
};
var validSettings = Object.keys(defaultProps);
function filterSettings(settings) {
  return validSettings.reduce(function(acc, settingName) {
    if (settings.hasOwnProperty(settingName)) {
      acc[settingName] = settings[settingName];
    }
    return acc;
  }, {});
}
function _callSuper$4(t, o, e2) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e2 || [], _getPrototypeOf(t).constructor) : o.apply(t, e2));
}
var getSlideClasses = function getSlideClasses2(spec) {
  var slickActive, slickCenter, slickCloned;
  var centerOffset, index2;
  if (spec.rtl) {
    index2 = spec.slideCount - 1 - spec.index;
  } else {
    index2 = spec.index;
  }
  slickCloned = index2 < 0 || index2 >= spec.slideCount;
  if (spec.centerMode) {
    centerOffset = Math.floor(spec.slidesToShow / 2);
    slickCenter = (index2 - spec.currentSlide) % spec.slideCount === 0;
    if (index2 > spec.currentSlide - centerOffset - 1 && index2 <= spec.currentSlide + centerOffset) {
      slickActive = true;
    }
  } else {
    slickActive = spec.currentSlide <= index2 && index2 < spec.currentSlide + spec.slidesToShow;
  }
  var focusedSlide;
  if (spec.targetSlide < 0) {
    focusedSlide = spec.targetSlide + spec.slideCount;
  } else if (spec.targetSlide >= spec.slideCount) {
    focusedSlide = spec.targetSlide - spec.slideCount;
  } else {
    focusedSlide = spec.targetSlide;
  }
  var slickCurrent = index2 === focusedSlide;
  return {
    "slick-slide": true,
    "slick-active": slickActive,
    "slick-center": slickCenter,
    "slick-cloned": slickCloned,
    "slick-current": slickCurrent
    // dubious in case of RTL
  };
};
var getSlideStyle = function getSlideStyle2(spec) {
  var style = {};
  if (spec.variableWidth === void 0 || spec.variableWidth === false) {
    style.width = spec.slideWidth;
  }
  if (spec.fade) {
    style.position = "relative";
    if (spec.vertical && spec.slideHeight) {
      style.top = -spec.index * parseInt(spec.slideHeight);
    } else {
      style.left = -spec.index * parseInt(spec.slideWidth);
    }
    style.opacity = spec.currentSlide === spec.index ? 1 : 0;
    style.zIndex = spec.currentSlide === spec.index ? 999 : 998;
    if (spec.useCSS) {
      style.transition = "opacity " + spec.speed + "ms " + spec.cssEase + ", visibility " + spec.speed + "ms " + spec.cssEase;
    }
  }
  return style;
};
var getKey = function getKey2(child, fallbackKey) {
  return child.key + "-" + fallbackKey;
};
var renderSlides = function renderSlides2(spec) {
  var key;
  var slides = [];
  var preCloneSlides = [];
  var postCloneSlides = [];
  var childrenCount = React.Children.count(spec.children);
  var startIndex = lazyStartIndex(spec);
  var endIndex = lazyEndIndex(spec);
  React.Children.forEach(spec.children, function(elem, index2) {
    var child;
    var childOnClickOptions = {
      message: "children",
      index: index2,
      slidesToScroll: spec.slidesToScroll,
      currentSlide: spec.currentSlide
    };
    if (!spec.lazyLoad || spec.lazyLoad && spec.lazyLoadedList.indexOf(index2) >= 0) {
      child = elem;
    } else {
      child = /* @__PURE__ */ React.createElement("div", null);
    }
    var childStyle = getSlideStyle(_objectSpread2(_objectSpread2({}, spec), {}, {
      index: index2
    }));
    var slideClass = child.props.className || "";
    var slideClasses = getSlideClasses(_objectSpread2(_objectSpread2({}, spec), {}, {
      index: index2
    }));
    slides.push(/* @__PURE__ */ React.cloneElement(child, {
      key: "original" + getKey(child, index2),
      "data-index": index2,
      className: classNames(slideClasses, slideClass),
      tabIndex: "-1",
      "aria-hidden": !slideClasses["slick-active"],
      style: _objectSpread2(_objectSpread2({
        outline: "none"
      }, child.props.style || {}), childStyle),
      onClick: function onClick(e2) {
        child.props && child.props.onClick && child.props.onClick(e2);
        if (spec.focusOnSelect) {
          spec.focusOnSelect(childOnClickOptions);
        }
      }
    }));
    if (spec.infinite && childrenCount > 1 && spec.fade === false && !spec.unslick) {
      var preCloneNo = childrenCount - index2;
      if (preCloneNo <= getPreClones(spec)) {
        key = -preCloneNo;
        if (key >= startIndex) {
          child = elem;
        }
        slideClasses = getSlideClasses(_objectSpread2(_objectSpread2({}, spec), {}, {
          index: key
        }));
        preCloneSlides.push(/* @__PURE__ */ React.cloneElement(child, {
          key: "precloned" + getKey(child, key),
          "data-index": key,
          tabIndex: "-1",
          className: classNames(slideClasses, slideClass),
          "aria-hidden": !slideClasses["slick-active"],
          style: _objectSpread2(_objectSpread2({}, child.props.style || {}), childStyle),
          onClick: function onClick(e2) {
            child.props && child.props.onClick && child.props.onClick(e2);
            if (spec.focusOnSelect) {
              spec.focusOnSelect(childOnClickOptions);
            }
          }
        }));
      }
      key = childrenCount + index2;
      if (key < endIndex) {
        child = elem;
      }
      slideClasses = getSlideClasses(_objectSpread2(_objectSpread2({}, spec), {}, {
        index: key
      }));
      postCloneSlides.push(/* @__PURE__ */ React.cloneElement(child, {
        key: "postcloned" + getKey(child, key),
        "data-index": key,
        tabIndex: "-1",
        className: classNames(slideClasses, slideClass),
        "aria-hidden": !slideClasses["slick-active"],
        style: _objectSpread2(_objectSpread2({}, child.props.style || {}), childStyle),
        onClick: function onClick(e2) {
          child.props && child.props.onClick && child.props.onClick(e2);
          if (spec.focusOnSelect) {
            spec.focusOnSelect(childOnClickOptions);
          }
        }
      }));
    }
  });
  if (spec.rtl) {
    return preCloneSlides.concat(slides, postCloneSlides).reverse();
  } else {
    return preCloneSlides.concat(slides, postCloneSlides);
  }
};
var Track = /* @__PURE__ */ function(_React$PureComponent) {
  function Track2() {
    var _this;
    _classCallCheck(this, Track2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$4(this, Track2, [].concat(args));
    _defineProperty(_this, "node", null);
    _defineProperty(_this, "handleRef", function(ref) {
      _this.node = ref;
    });
    return _this;
  }
  _inherits(Track2, _React$PureComponent);
  return _createClass(Track2, [{
    key: "render",
    value: function render() {
      var slides = renderSlides(this.props);
      var _this$props = this.props, onMouseEnter = _this$props.onMouseEnter, onMouseOver = _this$props.onMouseOver, onMouseLeave = _this$props.onMouseLeave;
      var mouseEvents = {
        onMouseEnter,
        onMouseOver,
        onMouseLeave
      };
      return /* @__PURE__ */ React.createElement("div", _extends({
        ref: this.handleRef,
        className: "slick-track",
        style: this.props.trackStyle
      }, mouseEvents), slides);
    }
  }]);
}(React.PureComponent);
function _callSuper$3(t, o, e2) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e2 || [], _getPrototypeOf(t).constructor) : o.apply(t, e2));
}
var getDotCount = function getDotCount2(spec) {
  var dots;
  if (spec.infinite) {
    dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
  } else {
    dots = Math.ceil((spec.slideCount - spec.slidesToShow) / spec.slidesToScroll) + 1;
  }
  return dots;
};
var Dots = /* @__PURE__ */ function(_React$PureComponent) {
  function Dots2() {
    _classCallCheck(this, Dots2);
    return _callSuper$3(this, Dots2, arguments);
  }
  _inherits(Dots2, _React$PureComponent);
  return _createClass(Dots2, [{
    key: "clickHandler",
    value: function clickHandler(options, e2) {
      e2.preventDefault();
      this.props.clickHandler(options);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props, onMouseEnter = _this$props.onMouseEnter, onMouseOver = _this$props.onMouseOver, onMouseLeave = _this$props.onMouseLeave, infinite = _this$props.infinite, slidesToScroll = _this$props.slidesToScroll, slidesToShow = _this$props.slidesToShow, slideCount = _this$props.slideCount, currentSlide = _this$props.currentSlide;
      var dotCount = getDotCount({
        slideCount,
        slidesToScroll,
        slidesToShow,
        infinite
      });
      var mouseEvents = {
        onMouseEnter,
        onMouseOver,
        onMouseLeave
      };
      var dots = [];
      for (var i = 0; i < dotCount; i++) {
        var _rightBound = (i + 1) * slidesToScroll - 1;
        var rightBound = infinite ? _rightBound : clamp(_rightBound, 0, slideCount - 1);
        var _leftBound = rightBound - (slidesToScroll - 1);
        var leftBound = infinite ? _leftBound : clamp(_leftBound, 0, slideCount - 1);
        var className = classNames({
          "slick-active": infinite ? currentSlide >= leftBound && currentSlide <= rightBound : currentSlide === leftBound
        });
        var dotOptions = {
          message: "dots",
          index: i,
          slidesToScroll,
          currentSlide
        };
        var onClick = this.clickHandler.bind(this, dotOptions);
        dots = dots.concat(/* @__PURE__ */ React.createElement("li", {
          key: i,
          className
        }, /* @__PURE__ */ React.cloneElement(this.props.customPaging(i), {
          onClick
        })));
      }
      return /* @__PURE__ */ React.cloneElement(this.props.appendDots(dots), _objectSpread2({
        className: this.props.dotsClass
      }, mouseEvents));
    }
  }]);
}(React.PureComponent);
function _callSuper$2(t, o, e2) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e2 || [], _getPrototypeOf(t).constructor) : o.apply(t, e2));
}
var PrevArrow = /* @__PURE__ */ function(_React$PureComponent) {
  function PrevArrow2() {
    _classCallCheck(this, PrevArrow2);
    return _callSuper$2(this, PrevArrow2, arguments);
  }
  _inherits(PrevArrow2, _React$PureComponent);
  return _createClass(PrevArrow2, [{
    key: "clickHandler",
    value: function clickHandler(options, e2) {
      if (e2) {
        e2.preventDefault();
      }
      this.props.clickHandler(options, e2);
    }
  }, {
    key: "render",
    value: function render() {
      var prevClasses = {
        "slick-arrow": true,
        "slick-prev": true
      };
      var prevHandler = this.clickHandler.bind(this, {
        message: "previous"
      });
      if (!this.props.infinite && (this.props.currentSlide === 0 || this.props.slideCount <= this.props.slidesToShow)) {
        prevClasses["slick-disabled"] = true;
        prevHandler = null;
      }
      var prevArrowProps = {
        key: "0",
        "data-role": "none",
        className: classNames(prevClasses),
        style: {
          display: "block"
        },
        onClick: prevHandler
      };
      var customProps = {
        currentSlide: this.props.currentSlide,
        slideCount: this.props.slideCount
      };
      var prevArrow;
      if (this.props.prevArrow) {
        prevArrow = /* @__PURE__ */ React.cloneElement(this.props.prevArrow, _objectSpread2(_objectSpread2({}, prevArrowProps), customProps));
      } else {
        prevArrow = /* @__PURE__ */ React.createElement("button", _extends({
          key: "0",
          type: "button"
        }, prevArrowProps), " ", "Previous");
      }
      return prevArrow;
    }
  }]);
}(React.PureComponent);
var NextArrow = /* @__PURE__ */ function(_React$PureComponent2) {
  function NextArrow2() {
    _classCallCheck(this, NextArrow2);
    return _callSuper$2(this, NextArrow2, arguments);
  }
  _inherits(NextArrow2, _React$PureComponent2);
  return _createClass(NextArrow2, [{
    key: "clickHandler",
    value: function clickHandler(options, e2) {
      if (e2) {
        e2.preventDefault();
      }
      this.props.clickHandler(options, e2);
    }
  }, {
    key: "render",
    value: function render() {
      var nextClasses = {
        "slick-arrow": true,
        "slick-next": true
      };
      var nextHandler = this.clickHandler.bind(this, {
        message: "next"
      });
      if (!canGoNext(this.props)) {
        nextClasses["slick-disabled"] = true;
        nextHandler = null;
      }
      var nextArrowProps = {
        key: "1",
        "data-role": "none",
        className: classNames(nextClasses),
        style: {
          display: "block"
        },
        onClick: nextHandler
      };
      var customProps = {
        currentSlide: this.props.currentSlide,
        slideCount: this.props.slideCount
      };
      var nextArrow;
      if (this.props.nextArrow) {
        nextArrow = /* @__PURE__ */ React.cloneElement(this.props.nextArrow, _objectSpread2(_objectSpread2({}, nextArrowProps), customProps));
      } else {
        nextArrow = /* @__PURE__ */ React.createElement("button", _extends({
          key: "1",
          type: "button"
        }, nextArrowProps), " ", "Next");
      }
      return nextArrow;
    }
  }]);
}(React.PureComponent);
var _excluded$d = ["animating"];
function _callSuper$1(t, o, e2) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e2 || [], _getPrototypeOf(t).constructor) : o.apply(t, e2));
}
var InnerSlider = /* @__PURE__ */ function(_React$Component) {
  function InnerSlider2(props) {
    var _this;
    _classCallCheck(this, InnerSlider2);
    _this = _callSuper$1(this, InnerSlider2, [props]);
    _defineProperty(_this, "listRefHandler", function(ref) {
      return _this.list = ref;
    });
    _defineProperty(_this, "trackRefHandler", function(ref) {
      return _this.track = ref;
    });
    _defineProperty(_this, "adaptHeight", function() {
      if (_this.props.adaptiveHeight && _this.list) {
        var elem = _this.list.querySelector('[data-index="'.concat(_this.state.currentSlide, '"]'));
        _this.list.style.height = getHeight(elem) + "px";
      }
    });
    _defineProperty(_this, "componentDidMount", function() {
      _this.props.onInit && _this.props.onInit();
      if (_this.props.lazyLoad) {
        var slidesToLoad = getOnDemandLazySlides(_objectSpread2(_objectSpread2({}, _this.props), _this.state));
        if (slidesToLoad.length > 0) {
          _this.setState(function(prevState) {
            return {
              lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad)
            };
          });
          if (_this.props.onLazyLoad) {
            _this.props.onLazyLoad(slidesToLoad);
          }
        }
      }
      var spec = _objectSpread2({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props);
      _this.updateState(spec, true, function() {
        _this.adaptHeight();
        _this.props.autoplay && _this.autoPlay("playing");
      });
      if (_this.props.lazyLoad === "progressive") {
        _this.lazyLoadTimer = setInterval(_this.progressiveLazyLoad, 1e3);
      }
      _this.ro = new index$2(function() {
        if (_this.state.animating) {
          _this.onWindowResized(false);
          _this.callbackTimers.push(setTimeout(function() {
            return _this.onWindowResized();
          }, _this.props.speed));
        } else {
          _this.onWindowResized();
        }
      });
      _this.ro.observe(_this.list);
      document.querySelectorAll && Array.prototype.forEach.call(document.querySelectorAll(".slick-slide"), function(slide) {
        slide.onfocus = _this.props.pauseOnFocus ? _this.onSlideFocus : null;
        slide.onblur = _this.props.pauseOnFocus ? _this.onSlideBlur : null;
      });
      if (window.addEventListener) {
        window.addEventListener("resize", _this.onWindowResized);
      } else {
        window.attachEvent("onresize", _this.onWindowResized);
      }
    });
    _defineProperty(_this, "componentWillUnmount", function() {
      if (_this.animationEndCallback) {
        clearTimeout(_this.animationEndCallback);
      }
      if (_this.lazyLoadTimer) {
        clearInterval(_this.lazyLoadTimer);
      }
      if (_this.callbackTimers.length) {
        _this.callbackTimers.forEach(function(timer) {
          return clearTimeout(timer);
        });
        _this.callbackTimers = [];
      }
      if (window.addEventListener) {
        window.removeEventListener("resize", _this.onWindowResized);
      } else {
        window.detachEvent("onresize", _this.onWindowResized);
      }
      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
      }
      _this.ro.disconnect();
    });
    _defineProperty(_this, "componentDidUpdate", function(prevProps) {
      _this.checkImagesLoad();
      _this.props.onReInit && _this.props.onReInit();
      if (_this.props.lazyLoad) {
        var slidesToLoad = getOnDemandLazySlides(_objectSpread2(_objectSpread2({}, _this.props), _this.state));
        if (slidesToLoad.length > 0) {
          _this.setState(function(prevState) {
            return {
              lazyLoadedList: prevState.lazyLoadedList.concat(slidesToLoad)
            };
          });
          if (_this.props.onLazyLoad) {
            _this.props.onLazyLoad(slidesToLoad);
          }
        }
      }
      _this.adaptHeight();
      var spec = _objectSpread2(_objectSpread2({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props), _this.state);
      var setTrackStyle = _this.didPropsChange(prevProps);
      setTrackStyle && _this.updateState(spec, setTrackStyle, function() {
        if (_this.state.currentSlide >= React.Children.count(_this.props.children)) {
          _this.changeSlide({
            message: "index",
            index: React.Children.count(_this.props.children) - _this.props.slidesToShow,
            currentSlide: _this.state.currentSlide
          });
        }
        if (prevProps.autoplay !== _this.props.autoplay || prevProps.autoplaySpeed !== _this.props.autoplaySpeed) {
          if (!prevProps.autoplay && _this.props.autoplay) {
            _this.autoPlay("playing");
          } else if (_this.props.autoplay) {
            _this.autoPlay("update");
          } else {
            _this.pause("paused");
          }
        }
      });
    });
    _defineProperty(_this, "onWindowResized", function(setTrackStyle) {
      if (_this.debouncedResize) _this.debouncedResize.cancel();
      _this.debouncedResize = debounce(50, function() {
        return _this.resizeWindow(setTrackStyle);
      });
      _this.debouncedResize();
    });
    _defineProperty(_this, "resizeWindow", function() {
      var setTrackStyle = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      var isTrackMounted = Boolean(_this.track && _this.track.node);
      if (!isTrackMounted) return;
      var spec = _objectSpread2(_objectSpread2({
        listRef: _this.list,
        trackRef: _this.track
      }, _this.props), _this.state);
      _this.updateState(spec, setTrackStyle, function() {
        if (_this.props.autoplay) _this.autoPlay("update");
        else _this.pause("paused");
      });
      _this.setState({
        animating: false
      });
      clearTimeout(_this.animationEndCallback);
      delete _this.animationEndCallback;
    });
    _defineProperty(_this, "updateState", function(spec, setTrackStyle, callback) {
      var updatedState = initializedState(spec);
      spec = _objectSpread2(_objectSpread2(_objectSpread2({}, spec), updatedState), {}, {
        slideIndex: updatedState.currentSlide
      });
      var targetLeft = getTrackLeft(spec);
      spec = _objectSpread2(_objectSpread2({}, spec), {}, {
        left: targetLeft
      });
      var trackStyle = getTrackCSS(spec);
      if (setTrackStyle || React.Children.count(_this.props.children) !== React.Children.count(spec.children)) {
        updatedState["trackStyle"] = trackStyle;
      }
      _this.setState(updatedState, callback);
    });
    _defineProperty(_this, "ssrInit", function() {
      if (_this.props.variableWidth) {
        var _trackWidth = 0, _trackLeft = 0;
        var childrenWidths = [];
        var preClones = getPreClones(_objectSpread2(_objectSpread2(_objectSpread2({}, _this.props), _this.state), {}, {
          slideCount: _this.props.children.length
        }));
        var postClones = getPostClones(_objectSpread2(_objectSpread2(_objectSpread2({}, _this.props), _this.state), {}, {
          slideCount: _this.props.children.length
        }));
        _this.props.children.forEach(function(child) {
          childrenWidths.push(child.props.style.width);
          _trackWidth += child.props.style.width;
        });
        for (var i = 0; i < preClones; i++) {
          _trackLeft += childrenWidths[childrenWidths.length - 1 - i];
          _trackWidth += childrenWidths[childrenWidths.length - 1 - i];
        }
        for (var _i = 0; _i < postClones; _i++) {
          _trackWidth += childrenWidths[_i];
        }
        for (var _i2 = 0; _i2 < _this.state.currentSlide; _i2++) {
          _trackLeft += childrenWidths[_i2];
        }
        var _trackStyle = {
          width: _trackWidth + "px",
          left: -_trackLeft + "px"
        };
        if (_this.props.centerMode) {
          var currentWidth = "".concat(childrenWidths[_this.state.currentSlide], "px");
          _trackStyle.left = "calc(".concat(_trackStyle.left, " + (100% - ").concat(currentWidth, ") / 2 ) ");
        }
        return {
          trackStyle: _trackStyle
        };
      }
      var childrenCount = React.Children.count(_this.props.children);
      var spec = _objectSpread2(_objectSpread2(_objectSpread2({}, _this.props), _this.state), {}, {
        slideCount: childrenCount
      });
      var slideCount = getPreClones(spec) + getPostClones(spec) + childrenCount;
      var trackWidth = 100 / _this.props.slidesToShow * slideCount;
      var slideWidth = 100 / slideCount;
      var trackLeft = -slideWidth * (getPreClones(spec) + _this.state.currentSlide) * trackWidth / 100;
      if (_this.props.centerMode) {
        trackLeft += (100 - slideWidth * trackWidth / 100) / 2;
      }
      var trackStyle = {
        width: trackWidth + "%",
        left: trackLeft + "%"
      };
      return {
        slideWidth: slideWidth + "%",
        trackStyle
      };
    });
    _defineProperty(_this, "checkImagesLoad", function() {
      var images = _this.list && _this.list.querySelectorAll && _this.list.querySelectorAll(".slick-slide img") || [];
      var imagesCount = images.length, loadedCount = 0;
      Array.prototype.forEach.call(images, function(image) {
        var handler = function handler2() {
          return ++loadedCount && loadedCount >= imagesCount && _this.onWindowResized();
        };
        if (!image.onclick) {
          image.onclick = function() {
            return image.parentNode.focus();
          };
        } else {
          var prevClickHandler = image.onclick;
          image.onclick = function(e2) {
            prevClickHandler(e2);
            image.parentNode.focus();
          };
        }
        if (!image.onload) {
          if (_this.props.lazyLoad) {
            image.onload = function() {
              _this.adaptHeight();
              _this.callbackTimers.push(setTimeout(_this.onWindowResized, _this.props.speed));
            };
          } else {
            image.onload = handler;
            image.onerror = function() {
              handler();
              _this.props.onLazyLoadError && _this.props.onLazyLoadError();
            };
          }
        }
      });
    });
    _defineProperty(_this, "progressiveLazyLoad", function() {
      var slidesToLoad = [];
      var spec = _objectSpread2(_objectSpread2({}, _this.props), _this.state);
      for (var index2 = _this.state.currentSlide; index2 < _this.state.slideCount + getPostClones(spec); index2++) {
        if (_this.state.lazyLoadedList.indexOf(index2) < 0) {
          slidesToLoad.push(index2);
          break;
        }
      }
      for (var _index = _this.state.currentSlide - 1; _index >= -getPreClones(spec); _index--) {
        if (_this.state.lazyLoadedList.indexOf(_index) < 0) {
          slidesToLoad.push(_index);
          break;
        }
      }
      if (slidesToLoad.length > 0) {
        _this.setState(function(state) {
          return {
            lazyLoadedList: state.lazyLoadedList.concat(slidesToLoad)
          };
        });
        if (_this.props.onLazyLoad) {
          _this.props.onLazyLoad(slidesToLoad);
        }
      } else {
        if (_this.lazyLoadTimer) {
          clearInterval(_this.lazyLoadTimer);
          delete _this.lazyLoadTimer;
        }
      }
    });
    _defineProperty(_this, "slideHandler", function(index2) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var _this$props = _this.props, asNavFor = _this$props.asNavFor, beforeChange = _this$props.beforeChange, onLazyLoad = _this$props.onLazyLoad, speed = _this$props.speed, afterChange = _this$props.afterChange;
      var currentSlide = _this.state.currentSlide;
      var _slideHandler = slideHandler(_objectSpread2(_objectSpread2(_objectSpread2({
        index: index2
      }, _this.props), _this.state), {}, {
        trackRef: _this.track,
        useCSS: _this.props.useCSS && !dontAnimate
      })), state = _slideHandler.state, nextState = _slideHandler.nextState;
      if (!state) return;
      beforeChange && beforeChange(currentSlide, state.currentSlide);
      var slidesToLoad = state.lazyLoadedList.filter(function(value) {
        return _this.state.lazyLoadedList.indexOf(value) < 0;
      });
      onLazyLoad && slidesToLoad.length > 0 && onLazyLoad(slidesToLoad);
      if (!_this.props.waitForAnimate && _this.animationEndCallback) {
        clearTimeout(_this.animationEndCallback);
        afterChange && afterChange(currentSlide);
        delete _this.animationEndCallback;
      }
      _this.setState(state, function() {
        if (asNavFor && _this.asNavForIndex !== index2) {
          _this.asNavForIndex = index2;
          asNavFor.innerSlider.slideHandler(index2);
        }
        if (!nextState) return;
        _this.animationEndCallback = setTimeout(function() {
          var animating = nextState.animating, firstBatch = _objectWithoutProperties(nextState, _excluded$d);
          _this.setState(firstBatch, function() {
            _this.callbackTimers.push(setTimeout(function() {
              return _this.setState({
                animating
              });
            }, 10));
            afterChange && afterChange(state.currentSlide);
            delete _this.animationEndCallback;
          });
        }, speed);
      });
    });
    _defineProperty(_this, "changeSlide", function(options) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var spec = _objectSpread2(_objectSpread2({}, _this.props), _this.state);
      var targetSlide = changeSlide(spec, options);
      if (targetSlide !== 0 && !targetSlide) return;
      if (dontAnimate === true) {
        _this.slideHandler(targetSlide, dontAnimate);
      } else {
        _this.slideHandler(targetSlide);
      }
      _this.props.autoplay && _this.autoPlay("update");
      if (_this.props.focusOnSelect) {
        var nodes = _this.list.querySelectorAll(".slick-current");
        nodes[0] && nodes[0].focus();
      }
    });
    _defineProperty(_this, "clickHandler", function(e2) {
      if (_this.clickable === false) {
        e2.stopPropagation();
        e2.preventDefault();
      }
      _this.clickable = true;
    });
    _defineProperty(_this, "keyHandler", function(e2) {
      var dir = keyHandler(e2, _this.props.accessibility, _this.props.rtl);
      dir !== "" && _this.changeSlide({
        message: dir
      });
    });
    _defineProperty(_this, "selectHandler", function(options) {
      _this.changeSlide(options);
    });
    _defineProperty(_this, "disableBodyScroll", function() {
      var preventDefault = function preventDefault2(e2) {
        e2 = e2 || window.event;
        if (e2.preventDefault) e2.preventDefault();
        e2.returnValue = false;
      };
      window.ontouchmove = preventDefault;
    });
    _defineProperty(_this, "enableBodyScroll", function() {
      window.ontouchmove = null;
    });
    _defineProperty(_this, "swipeStart", function(e2) {
      if (_this.props.verticalSwiping) {
        _this.disableBodyScroll();
      }
      var state = swipeStart(e2, _this.props.swipe, _this.props.draggable);
      state !== "" && _this.setState(state);
    });
    _defineProperty(_this, "swipeMove", function(e2) {
      var state = swipeMove(e2, _objectSpread2(_objectSpread2(_objectSpread2({}, _this.props), _this.state), {}, {
        trackRef: _this.track,
        listRef: _this.list,
        slideIndex: _this.state.currentSlide
      }));
      if (!state) return;
      if (state["swiping"]) {
        _this.clickable = false;
      }
      _this.setState(state);
    });
    _defineProperty(_this, "swipeEnd", function(e2) {
      var state = swipeEnd(e2, _objectSpread2(_objectSpread2(_objectSpread2({}, _this.props), _this.state), {}, {
        trackRef: _this.track,
        listRef: _this.list,
        slideIndex: _this.state.currentSlide
      }));
      if (!state) return;
      var triggerSlideHandler = state["triggerSlideHandler"];
      delete state["triggerSlideHandler"];
      _this.setState(state);
      if (triggerSlideHandler === void 0) return;
      _this.slideHandler(triggerSlideHandler);
      if (_this.props.verticalSwiping) {
        _this.enableBodyScroll();
      }
    });
    _defineProperty(_this, "touchEnd", function(e2) {
      _this.swipeEnd(e2);
      _this.clickable = true;
    });
    _defineProperty(_this, "slickPrev", function() {
      _this.callbackTimers.push(setTimeout(function() {
        return _this.changeSlide({
          message: "previous"
        });
      }, 0));
    });
    _defineProperty(_this, "slickNext", function() {
      _this.callbackTimers.push(setTimeout(function() {
        return _this.changeSlide({
          message: "next"
        });
      }, 0));
    });
    _defineProperty(_this, "slickGoTo", function(slide) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      slide = Number(slide);
      if (isNaN(slide)) return "";
      _this.callbackTimers.push(setTimeout(function() {
        return _this.changeSlide({
          message: "index",
          index: slide,
          currentSlide: _this.state.currentSlide
        }, dontAnimate);
      }, 0));
    });
    _defineProperty(_this, "play", function() {
      var nextIndex;
      if (_this.props.rtl) {
        nextIndex = _this.state.currentSlide - _this.props.slidesToScroll;
      } else {
        if (canGoNext(_objectSpread2(_objectSpread2({}, _this.props), _this.state))) {
          nextIndex = _this.state.currentSlide + _this.props.slidesToScroll;
        } else {
          return false;
        }
      }
      _this.slideHandler(nextIndex);
    });
    _defineProperty(_this, "autoPlay", function(playType) {
      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
      }
      var autoplaying = _this.state.autoplaying;
      if (playType === "update") {
        if (autoplaying === "hovered" || autoplaying === "focused" || autoplaying === "paused") {
          return;
        }
      } else if (playType === "leave") {
        if (autoplaying === "paused" || autoplaying === "focused") {
          return;
        }
      } else if (playType === "blur") {
        if (autoplaying === "paused" || autoplaying === "hovered") {
          return;
        }
      }
      _this.autoplayTimer = setInterval(_this.play, _this.props.autoplaySpeed + 50);
      _this.setState({
        autoplaying: "playing"
      });
    });
    _defineProperty(_this, "pause", function(pauseType) {
      if (_this.autoplayTimer) {
        clearInterval(_this.autoplayTimer);
        _this.autoplayTimer = null;
      }
      var autoplaying = _this.state.autoplaying;
      if (pauseType === "paused") {
        _this.setState({
          autoplaying: "paused"
        });
      } else if (pauseType === "focused") {
        if (autoplaying === "hovered" || autoplaying === "playing") {
          _this.setState({
            autoplaying: "focused"
          });
        }
      } else {
        if (autoplaying === "playing") {
          _this.setState({
            autoplaying: "hovered"
          });
        }
      }
    });
    _defineProperty(_this, "onDotsOver", function() {
      return _this.props.autoplay && _this.pause("hovered");
    });
    _defineProperty(_this, "onDotsLeave", function() {
      return _this.props.autoplay && _this.state.autoplaying === "hovered" && _this.autoPlay("leave");
    });
    _defineProperty(_this, "onTrackOver", function() {
      return _this.props.autoplay && _this.pause("hovered");
    });
    _defineProperty(_this, "onTrackLeave", function() {
      return _this.props.autoplay && _this.state.autoplaying === "hovered" && _this.autoPlay("leave");
    });
    _defineProperty(_this, "onSlideFocus", function() {
      return _this.props.autoplay && _this.pause("focused");
    });
    _defineProperty(_this, "onSlideBlur", function() {
      return _this.props.autoplay && _this.state.autoplaying === "focused" && _this.autoPlay("blur");
    });
    _defineProperty(_this, "render", function() {
      var className = classNames("slick-slider", _this.props.className, {
        "slick-vertical": _this.props.vertical,
        "slick-initialized": true
      });
      var spec = _objectSpread2(_objectSpread2({}, _this.props), _this.state);
      var trackProps = extractObject(spec, ["fade", "cssEase", "speed", "infinite", "centerMode", "focusOnSelect", "currentSlide", "lazyLoad", "lazyLoadedList", "rtl", "slideWidth", "slideHeight", "listHeight", "vertical", "slidesToShow", "slidesToScroll", "slideCount", "trackStyle", "variableWidth", "unslick", "centerPadding", "targetSlide", "useCSS"]);
      var pauseOnHover = _this.props.pauseOnHover;
      trackProps = _objectSpread2(_objectSpread2({}, trackProps), {}, {
        onMouseEnter: pauseOnHover ? _this.onTrackOver : null,
        onMouseLeave: pauseOnHover ? _this.onTrackLeave : null,
        onMouseOver: pauseOnHover ? _this.onTrackOver : null,
        focusOnSelect: _this.props.focusOnSelect && _this.clickable ? _this.selectHandler : null
      });
      var dots;
      if (_this.props.dots === true && _this.state.slideCount >= _this.props.slidesToShow) {
        var dotProps = extractObject(spec, ["dotsClass", "slideCount", "slidesToShow", "currentSlide", "slidesToScroll", "clickHandler", "children", "customPaging", "infinite", "appendDots"]);
        var pauseOnDotsHover = _this.props.pauseOnDotsHover;
        dotProps = _objectSpread2(_objectSpread2({}, dotProps), {}, {
          clickHandler: _this.changeSlide,
          onMouseEnter: pauseOnDotsHover ? _this.onDotsLeave : null,
          onMouseOver: pauseOnDotsHover ? _this.onDotsOver : null,
          onMouseLeave: pauseOnDotsHover ? _this.onDotsLeave : null
        });
        dots = /* @__PURE__ */ React.createElement(Dots, dotProps);
      }
      var prevArrow, nextArrow;
      var arrowProps = extractObject(spec, ["infinite", "centerMode", "currentSlide", "slideCount", "slidesToShow", "prevArrow", "nextArrow"]);
      arrowProps.clickHandler = _this.changeSlide;
      if (_this.props.arrows) {
        prevArrow = /* @__PURE__ */ React.createElement(PrevArrow, arrowProps);
        nextArrow = /* @__PURE__ */ React.createElement(NextArrow, arrowProps);
      }
      var verticalHeightStyle = null;
      if (_this.props.vertical) {
        verticalHeightStyle = {
          height: _this.state.listHeight
        };
      }
      var centerPaddingStyle = null;
      if (_this.props.vertical === false) {
        if (_this.props.centerMode === true) {
          centerPaddingStyle = {
            padding: "0px " + _this.props.centerPadding
          };
        }
      } else {
        if (_this.props.centerMode === true) {
          centerPaddingStyle = {
            padding: _this.props.centerPadding + " 0px"
          };
        }
      }
      var listStyle = _objectSpread2(_objectSpread2({}, verticalHeightStyle), centerPaddingStyle);
      var touchMove = _this.props.touchMove;
      var listProps = {
        className: "slick-list",
        style: listStyle,
        onClick: _this.clickHandler,
        onMouseDown: touchMove ? _this.swipeStart : null,
        onMouseMove: _this.state.dragging && touchMove ? _this.swipeMove : null,
        onMouseUp: touchMove ? _this.swipeEnd : null,
        onMouseLeave: _this.state.dragging && touchMove ? _this.swipeEnd : null,
        onTouchStart: touchMove ? _this.swipeStart : null,
        onTouchMove: _this.state.dragging && touchMove ? _this.swipeMove : null,
        onTouchEnd: touchMove ? _this.touchEnd : null,
        onTouchCancel: _this.state.dragging && touchMove ? _this.swipeEnd : null,
        onKeyDown: _this.props.accessibility ? _this.keyHandler : null
      };
      var innerSliderProps = {
        className,
        dir: "ltr",
        style: _this.props.style
      };
      if (_this.props.unslick) {
        listProps = {
          className: "slick-list"
        };
        innerSliderProps = {
          className,
          style: _this.props.style
        };
      }
      return /* @__PURE__ */ React.createElement("div", innerSliderProps, !_this.props.unslick ? prevArrow : "", /* @__PURE__ */ React.createElement("div", _extends({
        ref: _this.listRefHandler
      }, listProps), /* @__PURE__ */ React.createElement(Track, _extends({
        ref: _this.trackRefHandler
      }, trackProps), _this.props.children)), !_this.props.unslick ? nextArrow : "", !_this.props.unslick ? dots : "");
    });
    _this.list = null;
    _this.track = null;
    _this.state = _objectSpread2(_objectSpread2({}, initialState), {}, {
      currentSlide: _this.props.initialSlide,
      targetSlide: _this.props.initialSlide ? _this.props.initialSlide : 0,
      slideCount: React.Children.count(_this.props.children)
    });
    _this.callbackTimers = [];
    _this.clickable = true;
    _this.debouncedResize = null;
    var ssrState = _this.ssrInit();
    _this.state = _objectSpread2(_objectSpread2({}, _this.state), ssrState);
    return _this;
  }
  _inherits(InnerSlider2, _React$Component);
  return _createClass(InnerSlider2, [{
    key: "didPropsChange",
    value: function didPropsChange(prevProps) {
      var setTrackStyle = false;
      for (var _i3 = 0, _Object$keys = Object.keys(this.props); _i3 < _Object$keys.length; _i3++) {
        var key = _Object$keys[_i3];
        if (!prevProps.hasOwnProperty(key)) {
          setTrackStyle = true;
          break;
        }
        if (_typeof(prevProps[key]) === "object" || typeof prevProps[key] === "function" || isNaN(prevProps[key])) {
          continue;
        }
        if (prevProps[key] !== this.props[key]) {
          setTrackStyle = true;
          break;
        }
      }
      return setTrackStyle || React.Children.count(this.props.children) !== React.Children.count(prevProps.children);
    }
  }]);
}(React.Component);
var camel2hyphen$1 = function(str) {
  return str.replace(/[A-Z]/g, function(match) {
    return "-" + match.toLowerCase();
  }).toLowerCase();
};
var camel2hyphen_1 = camel2hyphen$1;
var camel2hyphen = camel2hyphen_1;
var isDimension = function(feature) {
  var re = /[height|width]$/;
  return re.test(feature);
};
var obj2mq = function(obj) {
  var mq = "";
  var features = Object.keys(obj);
  features.forEach(function(feature, index2) {
    var value = obj[feature];
    feature = camel2hyphen(feature);
    if (isDimension(feature) && typeof value === "number") {
      value = value + "px";
    }
    if (value === true) {
      mq += feature;
    } else if (value === false) {
      mq += "not " + feature;
    } else {
      mq += "(" + feature + ": " + value + ")";
    }
    if (index2 < features.length - 1) {
      mq += " and ";
    }
  });
  return mq;
};
var json2mq = function(query) {
  var mq = "";
  if (typeof query === "string") {
    return query;
  }
  if (query instanceof Array) {
    query.forEach(function(q, index2) {
      mq += obj2mq(q);
      if (index2 < query.length - 1) {
        mq += ", ";
      }
    });
    return mq;
  }
  return obj2mq(query);
};
var json2mq_1 = json2mq;
const json2mq$1 = /* @__PURE__ */ getDefaultExportFromCjs(json2mq_1);
function _callSuper(t, o, e2) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e2 || [], _getPrototypeOf(t).constructor) : o.apply(t, e2));
}
var Slider = /* @__PURE__ */ function(_React$Component) {
  function Slider2(props) {
    var _this;
    _classCallCheck(this, Slider2);
    _this = _callSuper(this, Slider2, [props]);
    _defineProperty(_this, "innerSliderRefHandler", function(ref) {
      return _this.innerSlider = ref;
    });
    _defineProperty(_this, "slickPrev", function() {
      return _this.innerSlider.slickPrev();
    });
    _defineProperty(_this, "slickNext", function() {
      return _this.innerSlider.slickNext();
    });
    _defineProperty(_this, "slickGoTo", function(slide) {
      var dontAnimate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      return _this.innerSlider.slickGoTo(slide, dontAnimate);
    });
    _defineProperty(_this, "slickPause", function() {
      return _this.innerSlider.pause("paused");
    });
    _defineProperty(_this, "slickPlay", function() {
      return _this.innerSlider.autoPlay("play");
    });
    _this.state = {
      breakpoint: null
    };
    _this._responsiveMediaHandlers = [];
    return _this;
  }
  _inherits(Slider2, _React$Component);
  return _createClass(Slider2, [{
    key: "media",
    value: function media(query, handler) {
      var mql = window.matchMedia(query);
      var listener = function listener2(_ref) {
        var matches = _ref.matches;
        if (matches) {
          handler();
        }
      };
      mql.addListener(listener);
      listener(mql);
      this._responsiveMediaHandlers.push({
        mql,
        query,
        listener
      });
    }
    // handles responsive breakpoints
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      if (this.props.responsive) {
        var breakpoints = this.props.responsive.map(function(breakpt) {
          return breakpt.breakpoint;
        });
        breakpoints.sort(function(x, y) {
          return x - y;
        });
        breakpoints.forEach(function(breakpoint, index2) {
          var bQuery;
          if (index2 === 0) {
            bQuery = json2mq$1({
              minWidth: 0,
              maxWidth: breakpoint
            });
          } else {
            bQuery = json2mq$1({
              minWidth: breakpoints[index2 - 1] + 1,
              maxWidth: breakpoint
            });
          }
          canUseDOM() && _this2.media(bQuery, function() {
            _this2.setState({
              breakpoint
            });
          });
        });
        var query = json2mq$1({
          minWidth: breakpoints.slice(-1)[0]
        });
        canUseDOM() && this.media(query, function() {
          _this2.setState({
            breakpoint: null
          });
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._responsiveMediaHandlers.forEach(function(obj) {
        obj.mql.removeListener(obj.listener);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var settings;
      var newProps;
      if (this.state.breakpoint) {
        newProps = this.props.responsive.filter(function(resp) {
          return resp.breakpoint === _this3.state.breakpoint;
        });
        settings = newProps[0].settings === "unslick" ? "unslick" : _objectSpread2(_objectSpread2(_objectSpread2({}, defaultProps), this.props), newProps[0].settings);
      } else {
        settings = _objectSpread2(_objectSpread2({}, defaultProps), this.props);
      }
      if (settings.centerMode) {
        if (settings.slidesToScroll > 1 && false) ;
        settings.slidesToScroll = 1;
      }
      if (settings.fade) {
        if (settings.slidesToShow > 1 && false) ;
        if (settings.slidesToScroll > 1 && false) ;
        settings.slidesToShow = 1;
        settings.slidesToScroll = 1;
      }
      var children = React.Children.toArray(this.props.children);
      children = children.filter(function(child) {
        if (typeof child === "string") {
          return !!child.trim();
        }
        return !!child;
      });
      if (settings.variableWidth && (settings.rows > 1 || settings.slidesPerRow > 1)) {
        console.warn("variableWidth is not supported in case of rows > 1 or slidesPerRow > 1");
        settings.variableWidth = false;
      }
      var newChildren = [];
      var currentWidth = null;
      for (var i = 0; i < children.length; i += settings.rows * settings.slidesPerRow) {
        var newSlide = [];
        for (var j = i; j < i + settings.rows * settings.slidesPerRow; j += settings.slidesPerRow) {
          var row = [];
          for (var k = j; k < j + settings.slidesPerRow; k += 1) {
            if (settings.variableWidth && children[k].props.style) {
              currentWidth = children[k].props.style.width;
            }
            if (k >= children.length) break;
            row.push(/* @__PURE__ */ React.cloneElement(children[k], {
              key: 100 * i + 10 * j + k,
              tabIndex: -1,
              style: {
                width: "".concat(100 / settings.slidesPerRow, "%"),
                display: "inline-block"
              }
            }));
          }
          newSlide.push(/* @__PURE__ */ React.createElement("div", {
            key: 10 * i + j
          }, row));
        }
        if (settings.variableWidth) {
          newChildren.push(/* @__PURE__ */ React.createElement("div", {
            key: i,
            style: {
              width: currentWidth
            }
          }, newSlide));
        } else {
          newChildren.push(/* @__PURE__ */ React.createElement("div", {
            key: i
          }, newSlide));
        }
      }
      if (settings === "unslick") {
        var className = "regular slider " + (this.props.className || "");
        return /* @__PURE__ */ React.createElement("div", {
          className
        }, children);
      } else if (newChildren.length <= settings.slidesToShow && !settings.infinite) {
        settings.unslick = true;
      }
      return /* @__PURE__ */ React.createElement(InnerSlider, _extends({
        style: this.props.style,
        ref: this.innerSliderRefHandler
      }, filterSettings(settings)), newChildren);
    }
  }]);
}(React.Component);
const DotDuration = "--dot-duration";
const genCarouselStyle = (token) => {
  const {
    componentCls,
    antCls
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      ".slick-slider": {
        position: "relative",
        display: "block",
        boxSizing: "border-box",
        touchAction: "pan-y",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
        ".slick-track, .slick-list": {
          transform: "translate3d(0, 0, 0)",
          touchAction: "pan-y"
        }
      },
      ".slick-list": {
        position: "relative",
        display: "block",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        "&:focus": {
          outline: "none"
        },
        "&.dragging": {
          cursor: "pointer"
        },
        ".slick-slide": {
          pointerEvents: "none",
          // https://github.com/ant-design/ant-design/issues/23294
          [`input${antCls}-radio-input, input${antCls}-checkbox-input`]: {
            visibility: "hidden"
          },
          "&.slick-active": {
            pointerEvents: "auto",
            [`input${antCls}-radio-input, input${antCls}-checkbox-input`]: {
              visibility: "visible"
            }
          },
          // fix Carousel content height not match parent node
          // when children is empty node
          // https://github.com/ant-design/ant-design/issues/25878
          "> div > div": {
            verticalAlign: "bottom"
          }
        }
      },
      ".slick-track": {
        position: "relative",
        top: 0,
        insetInlineStart: 0,
        display: "block",
        "&::before, &::after": {
          display: "table",
          content: '""'
        },
        "&::after": {
          clear: "both"
        }
      },
      ".slick-slide": {
        display: "none",
        float: "left",
        height: "100%",
        minHeight: 1,
        img: {
          display: "block"
        },
        "&.dragging img": {
          pointerEvents: "none"
        }
      },
      ".slick-initialized .slick-slide": {
        display: "block"
      },
      ".slick-vertical .slick-slide": {
        display: "block",
        height: "auto"
      }
    })
  };
};
const genArrowsStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow,
    arrowSize,
    arrowOffset
  } = token;
  const arrowLength = token.calc(arrowSize).div(Math.SQRT2).equal();
  return {
    [componentCls]: {
      // Arrows
      ".slick-prev, .slick-next": {
        position: "absolute",
        top: "50%",
        width: arrowSize,
        height: arrowSize,
        transform: "translateY(-50%)",
        color: "#fff",
        opacity: 0.4,
        background: "transparent",
        padding: 0,
        lineHeight: 0,
        border: 0,
        outline: "none",
        cursor: "pointer",
        zIndex: 1,
        transition: `opacity ${motionDurationSlow}`,
        "&:hover, &:focus": {
          opacity: 1
        },
        "&.slick-disabled": {
          pointerEvents: "none",
          opacity: 0
        },
        "&::after": {
          boxSizing: "border-box",
          position: "absolute",
          top: token.calc(arrowSize).sub(arrowLength).div(2).equal(),
          insetInlineStart: token.calc(arrowSize).sub(arrowLength).div(2).equal(),
          display: "inline-block",
          width: arrowLength,
          height: arrowLength,
          border: `0 solid currentcolor`,
          borderInlineStartWidth: 2,
          borderBlockStartWidth: 2,
          borderRadius: 1,
          content: '""'
        }
      },
      ".slick-prev": {
        insetInlineStart: arrowOffset,
        "&::after": {
          transform: "rotate(-45deg)"
        }
      },
      ".slick-next": {
        insetInlineEnd: arrowOffset,
        "&::after": {
          transform: "rotate(135deg)"
        }
      }
    }
  };
};
const genDotsStyle = (token) => {
  const {
    componentCls,
    dotOffset,
    dotWidth,
    dotHeight,
    dotGap,
    colorBgContainer,
    motionDurationSlow
  } = token;
  const animation = new Keyframe(`${token.prefixCls}-dot-animation`, {
    from: {
      width: 0
    },
    to: {
      width: token.dotActiveWidth
    }
  });
  return {
    [componentCls]: {
      ".slick-dots": {
        position: "absolute",
        insetInlineEnd: 0,
        bottom: 0,
        insetInlineStart: 0,
        zIndex: 15,
        display: "flex !important",
        justifyContent: "center",
        paddingInlineStart: 0,
        margin: 0,
        listStyle: "none",
        "&-bottom": {
          bottom: dotOffset
        },
        "&-top": {
          top: dotOffset,
          bottom: "auto"
        },
        li: {
          position: "relative",
          display: "inline-block",
          flex: "0 1 auto",
          boxSizing: "content-box",
          width: dotWidth,
          height: dotHeight,
          marginInline: dotGap,
          padding: 0,
          textAlign: "center",
          textIndent: -999,
          verticalAlign: "top",
          transition: `all ${motionDurationSlow}`,
          borderRadius: dotHeight,
          overflow: "hidden",
          "&::after": {
            display: "block",
            position: "absolute",
            top: 0,
            insetInlineStart: 0,
            width: 0,
            height: dotHeight,
            content: '""',
            background: "transparent",
            borderRadius: dotHeight,
            opacity: 1,
            outline: "none",
            cursor: "pointer",
            overflow: "hidden"
          },
          button: {
            position: "relative",
            display: "block",
            width: "100%",
            height: dotHeight,
            padding: 0,
            color: "transparent",
            fontSize: 0,
            background: colorBgContainer,
            border: 0,
            borderRadius: dotHeight,
            outline: "none",
            cursor: "pointer",
            opacity: 0.2,
            transition: `all ${motionDurationSlow}`,
            overflow: "hidden",
            "&:hover": {
              opacity: 0.75
            },
            "&::after": {
              position: "absolute",
              inset: token.calc(dotGap).mul(-1).equal(),
              content: '""'
            }
          },
          "&.slick-active": {
            width: token.dotActiveWidth,
            position: "relative",
            "&:hover": {
              opacity: 1
            },
            "&::after": {
              background: colorBgContainer,
              animationName: animation,
              animationDuration: `var(${DotDuration})`,
              animationTimingFunction: "ease-out",
              animationFillMode: "forwards"
            }
          }
        }
      }
    }
  };
};
const genCarouselVerticalStyle = (token) => {
  const {
    componentCls,
    dotOffset,
    arrowOffset,
    marginXXS
  } = token;
  const animation = new Keyframe(`${token.prefixCls}-dot-vertical-animation`, {
    from: {
      height: 0
    },
    to: {
      height: token.dotActiveWidth
    }
  });
  const reverseSizeOfDot = {
    width: token.dotHeight,
    height: token.dotWidth
  };
  return {
    [`${componentCls}-vertical`]: {
      ".slick-prev, .slick-next": {
        insetInlineStart: "50%",
        marginBlockStart: "unset",
        transform: "translateX(-50%)"
      },
      ".slick-prev": {
        insetBlockStart: arrowOffset,
        insetInlineStart: "50%",
        "&::after": {
          transform: "rotate(45deg)"
        }
      },
      ".slick-next": {
        insetBlockStart: "auto",
        insetBlockEnd: arrowOffset,
        "&::after": {
          transform: "rotate(-135deg)"
        }
      },
      ".slick-dots": {
        top: "50%",
        bottom: "auto",
        flexDirection: "column",
        width: token.dotHeight,
        height: "auto",
        margin: 0,
        transform: "translateY(-50%)",
        "&-left": {
          insetInlineEnd: "auto",
          insetInlineStart: dotOffset
        },
        "&-right": {
          insetInlineEnd: dotOffset,
          insetInlineStart: "auto"
        },
        li: Object.assign(Object.assign({}, reverseSizeOfDot), {
          margin: `${unit(marginXXS)} 0`,
          verticalAlign: "baseline",
          button: reverseSizeOfDot,
          "&::after": Object.assign(Object.assign({}, reverseSizeOfDot), {
            height: 0
          }),
          "&.slick-active": Object.assign(Object.assign({}, reverseSizeOfDot), {
            height: token.dotActiveWidth,
            button: Object.assign(Object.assign({}, reverseSizeOfDot), {
              height: token.dotActiveWidth
            }),
            "&::after": Object.assign(Object.assign({}, reverseSizeOfDot), {
              animationName: animation,
              animationDuration: `var(${DotDuration})`,
              animationTimingFunction: "ease-out",
              animationFillMode: "forwards"
            })
          })
        })
      }
    }
  };
};
const genCarouselRtlStyle = (token) => {
  const {
    componentCls
  } = token;
  return [{
    [`${componentCls}-rtl`]: {
      direction: "rtl"
    }
  }, {
    [`${componentCls}-vertical`]: {
      ".slick-dots": {
        [`${componentCls}-rtl&`]: {
          flexDirection: "column"
        }
      }
    }
  }];
};
const prepareComponentToken$f = (token) => {
  const dotActiveWidth = 24;
  return {
    arrowSize: 16,
    arrowOffset: token.marginXS,
    dotWidth: 16,
    dotHeight: 3,
    dotGap: token.marginXXS,
    dotOffset: 12,
    dotWidthActive: dotActiveWidth,
    dotActiveWidth
  };
};
const useStyle$f = genStyleHooks("Carousel", (token) => [genCarouselStyle(token), genArrowsStyle(token), genDotsStyle(token), genCarouselVerticalStyle(token), genCarouselRtlStyle(token)], prepareComponentToken$f, {
  deprecatedTokens: [["dotWidthActive", "dotActiveWidth"]]
});
var __rest$t = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const dotsClass = "slick-dots";
const ArrowButton = (_a) => {
  var {
    currentSlide,
    slideCount
  } = _a, rest = __rest$t(_a, ["currentSlide", "slideCount"]);
  return /* @__PURE__ */ reactExports.createElement("button", Object.assign({
    type: "button"
  }, rest));
};
const Carousel = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    dots = true,
    arrows = false,
    prevArrow,
    nextArrow,
    draggable = false,
    waitForAnimate = false,
    dotPosition = "bottom",
    vertical = dotPosition === "left" || dotPosition === "right",
    rootClassName,
    className: customClassName,
    style,
    id,
    autoplay = false,
    autoplaySpeed = 3e3,
    rtl
  } = props, otherProps = __rest$t(props, ["dots", "arrows", "prevArrow", "nextArrow", "draggable", "waitForAnimate", "dotPosition", "vertical", "rootClassName", "className", "style", "id", "autoplay", "autoplaySpeed", "rtl"]);
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("carousel");
  const slickRef = reactExports.useRef(null);
  const goTo = (slide, dontAnimate = false) => {
    slickRef.current.slickGoTo(slide, dontAnimate);
  };
  reactExports.useImperativeHandle(ref, () => ({
    goTo,
    autoPlay: slickRef.current.innerSlider.autoPlay,
    innerSlider: slickRef.current.innerSlider,
    prev: slickRef.current.slickPrev,
    next: slickRef.current.slickNext
  }), [slickRef.current]);
  const {
    children,
    initialSlide = 0
  } = props;
  const count = reactExports.Children.count(children);
  const isRTL = (rtl !== null && rtl !== void 0 ? rtl : direction === "rtl") && !vertical;
  reactExports.useEffect(() => {
    if (count > 0) {
      const newIndex = isRTL ? count - initialSlide - 1 : initialSlide;
      goTo(newIndex, false);
    }
  }, [count, initialSlide, isRTL]);
  const newProps = Object.assign({
    vertical,
    className: classNames(customClassName, contextClassName),
    style: Object.assign(Object.assign({}, contextStyle), style),
    autoplay: !!autoplay
  }, otherProps);
  if (newProps.effect === "fade") {
    newProps.fade = true;
  }
  const prefixCls = getPrefixCls("carousel", newProps.prefixCls);
  const enableDots = !!dots;
  const dsClass = classNames(dotsClass, `${dotsClass}-${dotPosition}`, typeof dots === "boolean" ? false : dots === null || dots === void 0 ? void 0 : dots.className);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$f(prefixCls);
  const className = classNames(prefixCls, {
    [`${prefixCls}-rtl`]: isRTL,
    [`${prefixCls}-vertical`]: newProps.vertical
  }, hashId, cssVarCls, rootClassName);
  const mergedShowDuration = autoplay && (typeof autoplay === "object" ? autoplay.dotDuration : false);
  const dotDurationStyle = mergedShowDuration ? {
    [DotDuration]: `${autoplaySpeed}ms`
  } : {};
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
    className,
    id,
    style: dotDurationStyle
  }, /* @__PURE__ */ reactExports.createElement(Slider, Object.assign({
    ref: slickRef
  }, newProps, {
    dots: enableDots,
    dotsClass: dsClass,
    arrows,
    prevArrow: prevArrow !== null && prevArrow !== void 0 ? prevArrow : /* @__PURE__ */ reactExports.createElement(ArrowButton, {
      "aria-label": isRTL ? "next" : "prev"
    }),
    nextArrow: nextArrow !== null && nextArrow !== void 0 ? nextArrow : /* @__PURE__ */ reactExports.createElement(ArrowButton, {
      "aria-label": isRTL ? "prev" : "next"
    }),
    draggable,
    verticalSwiping: vertical,
    autoplaySpeed,
    waitForAnimate,
    rtl: isRTL
  }))));
});
var CascaderContext = /* @__PURE__ */ reactExports.createContext({});
var SEARCH_MARK = "__rc_cascader_search_mark__";
var defaultFilter = function defaultFilter2(search, options, _ref) {
  var _ref$label = _ref.label, label = _ref$label === void 0 ? "" : _ref$label;
  return options.some(function(opt) {
    return String(opt[label]).toLowerCase().includes(search.toLowerCase());
  });
};
var defaultRender$1 = function defaultRender(inputValue, path, prefixCls, fieldNames) {
  return path.map(function(opt) {
    return opt[fieldNames.label];
  }).join(" / ");
};
var useSearchOptions = function useSearchOptions2(search, options, fieldNames, prefixCls, config, enableHalfPath) {
  var _config$filter = config.filter, filter2 = _config$filter === void 0 ? defaultFilter : _config$filter, _config$render = config.render, render = _config$render === void 0 ? defaultRender$1 : _config$render, _config$limit = config.limit, limit = _config$limit === void 0 ? 50 : _config$limit, sort = config.sort;
  return reactExports.useMemo(function() {
    var filteredOptions = [];
    if (!search) {
      return [];
    }
    function dig(list, pathOptions) {
      var parentDisabled = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      list.forEach(function(option) {
        if (!sort && limit !== false && limit > 0 && filteredOptions.length >= limit) {
          return;
        }
        var connectedPathOptions = [].concat(_toConsumableArray(pathOptions), [option]);
        var children = option[fieldNames.children];
        var mergedDisabled = parentDisabled || option.disabled;
        if (
          // If is leaf option
          !children || children.length === 0 || // If is changeOnSelect or multiple
          enableHalfPath
        ) {
          if (filter2(search, connectedPathOptions, {
            label: fieldNames.label
          })) {
            var _objectSpread2$1;
            filteredOptions.push(_objectSpread2(_objectSpread2({}, option), {}, (_objectSpread2$1 = {
              disabled: mergedDisabled
            }, _defineProperty(_objectSpread2$1, fieldNames.label, render(search, connectedPathOptions, prefixCls, fieldNames)), _defineProperty(_objectSpread2$1, SEARCH_MARK, connectedPathOptions), _defineProperty(_objectSpread2$1, fieldNames.children, void 0), _objectSpread2$1)));
          }
        }
        if (children) {
          dig(option[fieldNames.children], connectedPathOptions, mergedDisabled);
        }
      });
    }
    dig(options, []);
    if (sort) {
      filteredOptions.sort(function(a, b) {
        return sort(a[SEARCH_MARK], b[SEARCH_MARK], search, fieldNames);
      });
    }
    return limit !== false && limit > 0 ? filteredOptions.slice(0, limit) : filteredOptions;
  }, [search, options, fieldNames, prefixCls, render, enableHalfPath, filter2, sort, limit]);
};
var VALUE_SPLIT = "__RC_CASCADER_SPLIT__";
var SHOW_PARENT$2 = "SHOW_PARENT";
var SHOW_CHILD$2 = "SHOW_CHILD";
function toPathKey(value) {
  return value.join(VALUE_SPLIT);
}
function toPathKeys(value) {
  return value.map(toPathKey);
}
function toPathValueStr(pathKey) {
  return pathKey.split(VALUE_SPLIT);
}
function fillFieldNames$1(fieldNames) {
  var _ref = fieldNames || {}, label = _ref.label, value = _ref.value, children = _ref.children;
  var val = value || "value";
  return {
    label: label || "label",
    value: val,
    key: val,
    children: children || "children"
  };
}
function isLeaf(option, fieldNames) {
  var _option$isLeaf, _option;
  return (_option$isLeaf = option.isLeaf) !== null && _option$isLeaf !== void 0 ? _option$isLeaf : !((_option = option[fieldNames.children]) !== null && _option !== void 0 && _option.length);
}
function scrollIntoParentView(element) {
  var parent = element.parentElement;
  if (!parent) {
    return;
  }
  var elementToParent = element.offsetTop - parent.offsetTop;
  if (elementToParent - parent.scrollTop < 0) {
    parent.scrollTo({
      top: elementToParent
    });
  } else if (elementToParent + element.offsetHeight - parent.scrollTop > parent.offsetHeight) {
    parent.scrollTo({
      top: elementToParent + element.offsetHeight - parent.offsetHeight
    });
  }
}
function getFullPathKeys(options, fieldNames) {
  return options.map(function(item) {
    var _item$SEARCH_MARK;
    return (_item$SEARCH_MARK = item[SEARCH_MARK]) === null || _item$SEARCH_MARK === void 0 ? void 0 : _item$SEARCH_MARK.map(function(opt) {
      return opt[fieldNames.value];
    });
  });
}
function isMultipleValue(value) {
  return Array.isArray(value) && Array.isArray(value[0]);
}
function toRawValues(value) {
  if (!value) {
    return [];
  }
  if (isMultipleValue(value)) {
    return value;
  }
  return (value.length === 0 ? [] : [value]).map(function(val) {
    return Array.isArray(val) ? val : [val];
  });
}
function formatStrategyValues$1(pathKeys, getKeyPathEntities, showCheckedStrategy) {
  var valueSet = new Set(pathKeys);
  var keyPathEntities = getKeyPathEntities();
  return pathKeys.filter(function(key) {
    var entity = keyPathEntities[key];
    var parent = entity ? entity.parent : null;
    var children = entity ? entity.children : null;
    if (entity && entity.node.disabled) {
      return true;
    }
    return showCheckedStrategy === SHOW_CHILD$2 ? !(children && children.some(function(child) {
      return child.key && valueSet.has(child.key);
    })) : !(parent && !parent.node.disabled && valueSet.has(parent.key));
  });
}
function toPathOptions(valueCells, options, fieldNames) {
  var stringMode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  var currentList = options;
  var valueOptions = [];
  var _loop = function _loop2() {
    var _currentList, _currentList2, _foundOption$fieldNam;
    var valueCell = valueCells[i];
    var foundIndex = (_currentList = currentList) === null || _currentList === void 0 ? void 0 : _currentList.findIndex(function(option) {
      var val = option[fieldNames.value];
      return stringMode ? String(val) === String(valueCell) : val === valueCell;
    });
    var foundOption = foundIndex !== -1 ? (_currentList2 = currentList) === null || _currentList2 === void 0 ? void 0 : _currentList2[foundIndex] : null;
    valueOptions.push({
      value: (_foundOption$fieldNam = foundOption === null || foundOption === void 0 ? void 0 : foundOption[fieldNames.value]) !== null && _foundOption$fieldNam !== void 0 ? _foundOption$fieldNam : valueCell,
      index: foundIndex,
      option: foundOption
    });
    currentList = foundOption === null || foundOption === void 0 ? void 0 : foundOption[fieldNames.children];
  };
  for (var i = 0; i < valueCells.length; i += 1) {
    _loop();
  }
  return valueOptions;
}
const useDisplayValues = function(rawValues, options, fieldNames, multiple, displayRender) {
  return reactExports.useMemo(function() {
    var mergedDisplayRender = displayRender || // Default displayRender
    function(labels) {
      var mergedLabels = multiple ? labels.slice(-1) : labels;
      var SPLIT = " / ";
      if (mergedLabels.every(function(label) {
        return ["string", "number"].includes(_typeof(label));
      })) {
        return mergedLabels.join(SPLIT);
      }
      return mergedLabels.reduce(function(list, label, index2) {
        var keyedLabel = /* @__PURE__ */ reactExports.isValidElement(label) ? /* @__PURE__ */ reactExports.cloneElement(label, {
          key: index2
        }) : label;
        if (index2 === 0) {
          return [keyedLabel];
        }
        return [].concat(_toConsumableArray(list), [SPLIT, keyedLabel]);
      }, []);
    };
    return rawValues.map(function(valueCells) {
      var _valueOptions;
      var valueOptions = toPathOptions(valueCells, options, fieldNames);
      var label = mergedDisplayRender(valueOptions.map(function(_ref) {
        var _option$fieldNames$la;
        var option = _ref.option, value2 = _ref.value;
        return (_option$fieldNames$la = option === null || option === void 0 ? void 0 : option[fieldNames.label]) !== null && _option$fieldNames$la !== void 0 ? _option$fieldNames$la : value2;
      }), valueOptions.map(function(_ref2) {
        var option = _ref2.option;
        return option;
      }));
      var value = toPathKey(valueCells);
      return {
        label,
        value,
        key: value,
        valueCells,
        disabled: (_valueOptions = valueOptions[valueOptions.length - 1]) === null || _valueOptions === void 0 || (_valueOptions = _valueOptions.option) === null || _valueOptions === void 0 ? void 0 : _valueOptions.disabled
      };
    });
  }, [rawValues, options, fieldNames, displayRender, multiple]);
};
function useMissingValues(options, fieldNames) {
  return reactExports.useCallback(function(rawValues) {
    var missingValues = [];
    var existsValues = [];
    rawValues.forEach(function(valueCell) {
      var pathOptions = toPathOptions(valueCell, options, fieldNames);
      if (pathOptions.every(function(opt) {
        return opt.option;
      })) {
        existsValues.push(valueCell);
      } else {
        missingValues.push(valueCell);
      }
    });
    return [existsValues, missingValues];
  }, [options, fieldNames]);
}
const useEntities = function(options, fieldNames) {
  var cacheRef = reactExports.useRef({
    options: [],
    info: {
      keyEntities: {},
      pathKeyEntities: {}
    }
  });
  var getEntities = reactExports.useCallback(function() {
    if (cacheRef.current.options !== options) {
      cacheRef.current.options = options;
      cacheRef.current.info = convertDataToEntities(options, {
        fieldNames,
        initWrapper: function initWrapper(wrapper) {
          return _objectSpread2(_objectSpread2({}, wrapper), {}, {
            pathKeyEntities: {}
          });
        },
        processEntity: function processEntity(entity, wrapper) {
          var pathKey = entity.nodes.map(function(node) {
            return node[fieldNames.value];
          }).join(VALUE_SPLIT);
          wrapper.pathKeyEntities[pathKey] = entity;
          entity.key = pathKey;
        }
      });
    }
    return cacheRef.current.info.pathKeyEntities;
  }, [fieldNames, options]);
  return getEntities;
};
function useOptions(mergedFieldNames, options) {
  var mergedOptions = reactExports.useMemo(function() {
    return options || [];
  }, [options]);
  var getPathKeyEntities = useEntities(mergedOptions, mergedFieldNames);
  var getValueByKeyPath = reactExports.useCallback(function(pathKeys) {
    var keyPathEntities = getPathKeyEntities();
    return pathKeys.map(function(pathKey) {
      var nodes = keyPathEntities[pathKey].nodes;
      return nodes.map(function(node) {
        return node[mergedFieldNames.value];
      });
    });
  }, [getPathKeyEntities, mergedFieldNames]);
  return [mergedOptions, getPathKeyEntities, getValueByKeyPath];
}
function useSearchConfig(showSearch) {
  return reactExports.useMemo(function() {
    if (!showSearch) {
      return [false, {}];
    }
    var searchConfig = {
      matchInputWidth: true,
      limit: 50
    };
    if (showSearch && _typeof(showSearch) === "object") {
      searchConfig = _objectSpread2(_objectSpread2({}, searchConfig), showSearch);
    }
    if (searchConfig.limit <= 0) {
      searchConfig.limit = false;
    }
    return [true, searchConfig];
  }, [showSearch]);
}
function useSelect(multiple, triggerChange, checkedValues, halfCheckedValues, missingCheckedValues, getPathKeyEntities, getValueByKeyPath, showCheckedStrategy) {
  return function(valuePath) {
    if (!multiple) {
      triggerChange(valuePath);
    } else {
      var pathKey = toPathKey(valuePath);
      var checkedPathKeys = toPathKeys(checkedValues);
      var halfCheckedPathKeys = toPathKeys(halfCheckedValues);
      var existInChecked = checkedPathKeys.includes(pathKey);
      var existInMissing = missingCheckedValues.some(function(valueCells) {
        return toPathKey(valueCells) === pathKey;
      });
      var nextCheckedValues = checkedValues;
      var nextMissingValues = missingCheckedValues;
      if (existInMissing && !existInChecked) {
        nextMissingValues = missingCheckedValues.filter(function(valueCells) {
          return toPathKey(valueCells) !== pathKey;
        });
      } else {
        var nextRawCheckedKeys = existInChecked ? checkedPathKeys.filter(function(key) {
          return key !== pathKey;
        }) : [].concat(_toConsumableArray(checkedPathKeys), [pathKey]);
        var pathKeyEntities = getPathKeyEntities();
        var checkedKeys;
        if (existInChecked) {
          var _conductCheck = conductCheck(nextRawCheckedKeys, {
            halfCheckedKeys: halfCheckedPathKeys
          }, pathKeyEntities);
          checkedKeys = _conductCheck.checkedKeys;
        } else {
          var _conductCheck2 = conductCheck(nextRawCheckedKeys, true, pathKeyEntities);
          checkedKeys = _conductCheck2.checkedKeys;
        }
        var deDuplicatedKeys = formatStrategyValues$1(checkedKeys, getPathKeyEntities, showCheckedStrategy);
        nextCheckedValues = getValueByKeyPath(deDuplicatedKeys);
      }
      triggerChange([].concat(_toConsumableArray(nextMissingValues), _toConsumableArray(nextCheckedValues)));
    }
  };
}
function useValues(multiple, rawValues, getPathKeyEntities, getValueByKeyPath, getMissingValues) {
  return reactExports.useMemo(function() {
    var _getMissingValues = getMissingValues(rawValues), _getMissingValues2 = _slicedToArray(_getMissingValues, 2), existValues = _getMissingValues2[0], missingValues = _getMissingValues2[1];
    if (!multiple || !rawValues.length) {
      return [existValues, [], missingValues];
    }
    var keyPathValues = toPathKeys(existValues);
    var keyPathEntities = getPathKeyEntities();
    var _conductCheck = conductCheck(keyPathValues, true, keyPathEntities), checkedKeys = _conductCheck.checkedKeys, halfCheckedKeys = _conductCheck.halfCheckedKeys;
    return [getValueByKeyPath(checkedKeys), getValueByKeyPath(halfCheckedKeys), missingValues];
  }, [multiple, rawValues, getPathKeyEntities, getValueByKeyPath, getMissingValues]);
}
var CacheContent = /* @__PURE__ */ reactExports.memo(function(_ref) {
  var children = _ref.children;
  return children;
}, function(_, next) {
  return !next.open;
});
function Checkbox(_ref) {
  var _classNames;
  var prefixCls = _ref.prefixCls, checked = _ref.checked, halfChecked = _ref.halfChecked, disabled = _ref.disabled, onClick = _ref.onClick, disableCheckbox = _ref.disableCheckbox;
  var _React$useContext = reactExports.useContext(CascaderContext), checkable = _React$useContext.checkable;
  var customCheckbox = typeof checkable !== "boolean" ? checkable : null;
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: classNames("".concat(prefixCls), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-checked"), checked), _defineProperty(_classNames, "".concat(prefixCls, "-indeterminate"), !checked && halfChecked), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled || disableCheckbox), _classNames)),
    onClick
  }, customCheckbox);
}
var FIX_LABEL = "__cascader_fix_label__";
function Column(_ref) {
  var prefixCls = _ref.prefixCls, multiple = _ref.multiple, options = _ref.options, activeValue = _ref.activeValue, prevValuePath = _ref.prevValuePath, onToggleOpen = _ref.onToggleOpen, onSelect = _ref.onSelect, onActive = _ref.onActive, checkedSet = _ref.checkedSet, halfCheckedSet = _ref.halfCheckedSet, loadingKeys = _ref.loadingKeys, isSelectable = _ref.isSelectable, propsDisabled = _ref.disabled;
  var menuPrefixCls = "".concat(prefixCls, "-menu");
  var menuItemPrefixCls = "".concat(prefixCls, "-menu-item");
  var _React$useContext = reactExports.useContext(CascaderContext), fieldNames = _React$useContext.fieldNames, changeOnSelect = _React$useContext.changeOnSelect, expandTrigger = _React$useContext.expandTrigger, expandIcon = _React$useContext.expandIcon, loadingIcon = _React$useContext.loadingIcon, dropdownMenuColumnStyle = _React$useContext.dropdownMenuColumnStyle, optionRender = _React$useContext.optionRender;
  var hoverOpen = expandTrigger === "hover";
  var isOptionDisabled = function isOptionDisabled2(disabled) {
    return propsDisabled || disabled;
  };
  var optionInfoList = reactExports.useMemo(function() {
    return options.map(function(option) {
      var _option$FIX_LABEL;
      var disabled = option.disabled, disableCheckbox = option.disableCheckbox;
      var searchOptions = option[SEARCH_MARK];
      var label = (_option$FIX_LABEL = option[FIX_LABEL]) !== null && _option$FIX_LABEL !== void 0 ? _option$FIX_LABEL : option[fieldNames.label];
      var value = option[fieldNames.value];
      var isMergedLeaf = isLeaf(option, fieldNames);
      var fullPath = searchOptions ? searchOptions.map(function(opt) {
        return opt[fieldNames.value];
      }) : [].concat(_toConsumableArray(prevValuePath), [value]);
      var fullPathKey = toPathKey(fullPath);
      var isLoading = loadingKeys.includes(fullPathKey);
      var checked = checkedSet.has(fullPathKey);
      var halfChecked = halfCheckedSet.has(fullPathKey);
      return {
        disabled,
        label,
        value,
        isLeaf: isMergedLeaf,
        isLoading,
        checked,
        halfChecked,
        option,
        disableCheckbox,
        fullPath,
        fullPathKey
      };
    });
  }, [options, checkedSet, fieldNames, halfCheckedSet, loadingKeys, prevValuePath]);
  return /* @__PURE__ */ reactExports.createElement("ul", {
    className: menuPrefixCls,
    role: "menu"
  }, optionInfoList.map(function(_ref2) {
    var _classNames;
    var disabled = _ref2.disabled, label = _ref2.label, value = _ref2.value, isMergedLeaf = _ref2.isLeaf, isLoading = _ref2.isLoading, checked = _ref2.checked, halfChecked = _ref2.halfChecked, option = _ref2.option, fullPath = _ref2.fullPath, fullPathKey = _ref2.fullPathKey, disableCheckbox = _ref2.disableCheckbox;
    var triggerOpenPath = function triggerOpenPath2() {
      if (isOptionDisabled(disabled)) {
        return;
      }
      var nextValueCells = _toConsumableArray(fullPath);
      if (hoverOpen && isMergedLeaf) {
        nextValueCells.pop();
      }
      onActive(nextValueCells);
    };
    var triggerSelect = function triggerSelect2() {
      if (isSelectable(option) && !isOptionDisabled(disabled)) {
        onSelect(fullPath, isMergedLeaf);
      }
    };
    var title;
    if (typeof option.title === "string") {
      title = option.title;
    } else if (typeof label === "string") {
      title = label;
    }
    return /* @__PURE__ */ reactExports.createElement("li", {
      key: fullPathKey,
      className: classNames(menuItemPrefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(menuItemPrefixCls, "-expand"), !isMergedLeaf), _defineProperty(_classNames, "".concat(menuItemPrefixCls, "-active"), activeValue === value || activeValue === fullPathKey), _defineProperty(_classNames, "".concat(menuItemPrefixCls, "-disabled"), isOptionDisabled(disabled)), _defineProperty(_classNames, "".concat(menuItemPrefixCls, "-loading"), isLoading), _classNames)),
      style: dropdownMenuColumnStyle,
      role: "menuitemcheckbox",
      title,
      "aria-checked": checked,
      "data-path-key": fullPathKey,
      onClick: function onClick() {
        triggerOpenPath();
        if (disableCheckbox) {
          return;
        }
        if (!multiple || isMergedLeaf) {
          triggerSelect();
        }
      },
      onDoubleClick: function onDoubleClick() {
        if (changeOnSelect) {
          onToggleOpen(false);
        }
      },
      onMouseEnter: function onMouseEnter() {
        if (hoverOpen) {
          triggerOpenPath();
        }
      },
      onMouseDown: function onMouseDown(e2) {
        e2.preventDefault();
      }
    }, multiple && /* @__PURE__ */ reactExports.createElement(Checkbox, {
      prefixCls: "".concat(prefixCls, "-checkbox"),
      checked,
      halfChecked,
      disabled: isOptionDisabled(disabled) || disableCheckbox,
      disableCheckbox,
      onClick: function onClick(e2) {
        if (disableCheckbox) {
          return;
        }
        e2.stopPropagation();
        triggerSelect();
      }
    }), /* @__PURE__ */ reactExports.createElement("div", {
      className: "".concat(menuItemPrefixCls, "-content")
    }, optionRender ? optionRender(option) : label), !isLoading && expandIcon && !isMergedLeaf && /* @__PURE__ */ reactExports.createElement("div", {
      className: "".concat(menuItemPrefixCls, "-expand-icon")
    }, expandIcon), isLoading && loadingIcon && /* @__PURE__ */ reactExports.createElement("div", {
      className: "".concat(menuItemPrefixCls, "-loading-icon")
    }, loadingIcon));
  }));
}
var useActive = function useActive2(multiple, open2) {
  var _React$useContext = reactExports.useContext(CascaderContext), values = _React$useContext.values;
  var firstValueCells = values[0];
  var _React$useState = reactExports.useState([]), _React$useState2 = _slicedToArray(_React$useState, 2), activeValueCells = _React$useState2[0], setActiveValueCells = _React$useState2[1];
  reactExports.useEffect(
    function() {
      if (!multiple) {
        setActiveValueCells(firstValueCells || []);
      }
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [open2, firstValueCells]
    /* eslint-enable react-hooks/exhaustive-deps */
  );
  return [activeValueCells, setActiveValueCells];
};
const useKeyboard = function(ref, options, fieldNames, activeValueCells, setActiveValueCells, onKeyBoardSelect, contextProps) {
  var direction = contextProps.direction, searchValue = contextProps.searchValue, toggleOpen = contextProps.toggleOpen, open2 = contextProps.open;
  var rtl = direction === "rtl";
  var _React$useMemo = reactExports.useMemo(function() {
    var activeIndex = -1;
    var currentOptions = options;
    var mergedActiveIndexes = [];
    var mergedActiveValueCells = [];
    var len = activeValueCells.length;
    var pathKeys = getFullPathKeys(options, fieldNames);
    var _loop = function _loop2(i2) {
      var nextActiveIndex = currentOptions.findIndex(function(option, index2) {
        return (pathKeys[index2] ? toPathKey(pathKeys[index2]) : option[fieldNames.value]) === activeValueCells[i2];
      });
      if (nextActiveIndex === -1) {
        return 1;
      }
      activeIndex = nextActiveIndex;
      mergedActiveIndexes.push(activeIndex);
      mergedActiveValueCells.push(activeValueCells[i2]);
      currentOptions = currentOptions[activeIndex][fieldNames.children];
    };
    for (var i = 0; i < len && currentOptions; i += 1) {
      if (_loop(i)) break;
    }
    var activeOptions = options;
    for (var _i = 0; _i < mergedActiveIndexes.length - 1; _i += 1) {
      activeOptions = activeOptions[mergedActiveIndexes[_i]][fieldNames.children];
    }
    return [mergedActiveValueCells, activeIndex, activeOptions, pathKeys];
  }, [activeValueCells, fieldNames, options]), _React$useMemo2 = _slicedToArray(_React$useMemo, 4), validActiveValueCells = _React$useMemo2[0], lastActiveIndex = _React$useMemo2[1], lastActiveOptions = _React$useMemo2[2], fullPathKeys = _React$useMemo2[3];
  var internalSetActiveValueCells = function internalSetActiveValueCells2(next) {
    setActiveValueCells(next);
  };
  var offsetActiveOption = function offsetActiveOption2(offset) {
    var len = lastActiveOptions.length;
    var currentIndex = lastActiveIndex;
    if (currentIndex === -1 && offset < 0) {
      currentIndex = len;
    }
    for (var i = 0; i < len; i += 1) {
      currentIndex = (currentIndex + offset + len) % len;
      var _option = lastActiveOptions[currentIndex];
      if (_option && !_option.disabled) {
        var nextActiveCells = validActiveValueCells.slice(0, -1).concat(fullPathKeys[currentIndex] ? toPathKey(fullPathKeys[currentIndex]) : _option[fieldNames.value]);
        internalSetActiveValueCells(nextActiveCells);
        return;
      }
    }
  };
  var prevColumn = function prevColumn2() {
    if (validActiveValueCells.length > 1) {
      var nextActiveCells = validActiveValueCells.slice(0, -1);
      internalSetActiveValueCells(nextActiveCells);
    } else {
      toggleOpen(false);
    }
  };
  var nextColumn = function nextColumn2() {
    var _lastActiveOptions$la;
    var nextOptions = ((_lastActiveOptions$la = lastActiveOptions[lastActiveIndex]) === null || _lastActiveOptions$la === void 0 ? void 0 : _lastActiveOptions$la[fieldNames.children]) || [];
    var nextOption = nextOptions.find(function(option) {
      return !option.disabled;
    });
    if (nextOption) {
      var nextActiveCells = [].concat(_toConsumableArray(validActiveValueCells), [nextOption[fieldNames.value]]);
      internalSetActiveValueCells(nextActiveCells);
    }
  };
  reactExports.useImperativeHandle(ref, function() {
    return {
      // scrollTo: treeRef.current?.scrollTo,
      onKeyDown: function onKeyDown(event) {
        var which = event.which;
        switch (which) {
          case KeyCode.UP:
          case KeyCode.DOWN: {
            var offset = 0;
            if (which === KeyCode.UP) {
              offset = -1;
            } else if (which === KeyCode.DOWN) {
              offset = 1;
            }
            if (offset !== 0) {
              offsetActiveOption(offset);
            }
            break;
          }
          case KeyCode.LEFT: {
            if (searchValue) {
              break;
            }
            if (rtl) {
              nextColumn();
            } else {
              prevColumn();
            }
            break;
          }
          case KeyCode.RIGHT: {
            if (searchValue) {
              break;
            }
            if (rtl) {
              prevColumn();
            } else {
              nextColumn();
            }
            break;
          }
          case KeyCode.BACKSPACE: {
            if (!searchValue) {
              prevColumn();
            }
            break;
          }
          case KeyCode.ENTER: {
            if (validActiveValueCells.length) {
              var _option2 = lastActiveOptions[lastActiveIndex];
              var originOptions = (_option2 === null || _option2 === void 0 ? void 0 : _option2[SEARCH_MARK]) || [];
              if (originOptions.length) {
                onKeyBoardSelect(originOptions.map(function(opt) {
                  return opt[fieldNames.value];
                }), originOptions[originOptions.length - 1]);
              } else {
                onKeyBoardSelect(validActiveValueCells, lastActiveOptions[lastActiveIndex]);
              }
            }
            break;
          }
          case KeyCode.ESC: {
            toggleOpen(false);
            if (open2) {
              event.stopPropagation();
            }
          }
        }
      },
      onKeyUp: function onKeyUp() {
      }
    };
  });
};
var RawOptionList = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var _optionColumns$, _ref3, _classNames;
  var prefixCls = props.prefixCls, multiple = props.multiple, searchValue = props.searchValue, toggleOpen = props.toggleOpen, notFoundContent = props.notFoundContent, direction = props.direction, open2 = props.open, disabled = props.disabled;
  var containerRef = reactExports.useRef(null);
  var rtl = direction === "rtl";
  var _React$useContext = reactExports.useContext(CascaderContext), options = _React$useContext.options, values = _React$useContext.values, halfValues = _React$useContext.halfValues, fieldNames = _React$useContext.fieldNames, changeOnSelect = _React$useContext.changeOnSelect, onSelect = _React$useContext.onSelect, searchOptions = _React$useContext.searchOptions, dropdownPrefixCls = _React$useContext.dropdownPrefixCls, loadData = _React$useContext.loadData, expandTrigger = _React$useContext.expandTrigger;
  var mergedPrefixCls = dropdownPrefixCls || prefixCls;
  var _React$useState = reactExports.useState([]), _React$useState2 = _slicedToArray(_React$useState, 2), loadingKeys = _React$useState2[0], setLoadingKeys = _React$useState2[1];
  var internalLoadData = function internalLoadData2(valueCells) {
    if (!loadData || searchValue) {
      return;
    }
    var optionList = toPathOptions(valueCells, options, fieldNames);
    var rawOptions = optionList.map(function(_ref) {
      var option = _ref.option;
      return option;
    });
    var lastOption = rawOptions[rawOptions.length - 1];
    if (lastOption && !isLeaf(lastOption, fieldNames)) {
      var pathKey = toPathKey(valueCells);
      setLoadingKeys(function(keys) {
        return [].concat(_toConsumableArray(keys), [pathKey]);
      });
      loadData(rawOptions);
    }
  };
  reactExports.useEffect(function() {
    if (loadingKeys.length) {
      loadingKeys.forEach(function(loadingKey) {
        var valueStrCells = toPathValueStr(loadingKey);
        var optionList = toPathOptions(valueStrCells, options, fieldNames, true).map(function(_ref2) {
          var option = _ref2.option;
          return option;
        });
        var lastOption = optionList[optionList.length - 1];
        if (!lastOption || lastOption[fieldNames.children] || isLeaf(lastOption, fieldNames)) {
          setLoadingKeys(function(keys) {
            return keys.filter(function(key) {
              return key !== loadingKey;
            });
          });
        }
      });
    }
  }, [options, loadingKeys, fieldNames]);
  var checkedSet = reactExports.useMemo(function() {
    return new Set(toPathKeys(values));
  }, [values]);
  var halfCheckedSet = reactExports.useMemo(function() {
    return new Set(toPathKeys(halfValues));
  }, [halfValues]);
  var _useActive = useActive(multiple, open2), _useActive2 = _slicedToArray(_useActive, 2), activeValueCells = _useActive2[0], setActiveValueCells = _useActive2[1];
  var onPathOpen = function onPathOpen2(nextValueCells) {
    setActiveValueCells(nextValueCells);
    internalLoadData(nextValueCells);
  };
  var isSelectable = function isSelectable2(option) {
    if (disabled) {
      return false;
    }
    var optionDisabled = option.disabled;
    var isMergedLeaf = isLeaf(option, fieldNames);
    return !optionDisabled && (isMergedLeaf || changeOnSelect || multiple);
  };
  var onPathSelect = function onPathSelect2(valuePath, leaf) {
    var fromKeyboard = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    onSelect(valuePath);
    if (!multiple && (leaf || changeOnSelect && (expandTrigger === "hover" || fromKeyboard))) {
      toggleOpen(false);
    }
  };
  var mergedOptions = reactExports.useMemo(function() {
    if (searchValue) {
      return searchOptions;
    }
    return options;
  }, [searchValue, searchOptions, options]);
  var optionColumns = reactExports.useMemo(function() {
    var optionList = [{
      options: mergedOptions
    }];
    var currentList = mergedOptions;
    var fullPathKeys = getFullPathKeys(currentList, fieldNames);
    var _loop = function _loop2() {
      var activeValueCell = activeValueCells[i];
      var currentOption = currentList.find(function(option, index2) {
        return (fullPathKeys[index2] ? toPathKey(fullPathKeys[index2]) : option[fieldNames.value]) === activeValueCell;
      });
      var subOptions = currentOption === null || currentOption === void 0 ? void 0 : currentOption[fieldNames.children];
      if (!(subOptions !== null && subOptions !== void 0 && subOptions.length)) {
        return 1;
      }
      currentList = subOptions;
      optionList.push({
        options: subOptions
      });
    };
    for (var i = 0; i < activeValueCells.length; i += 1) {
      if (_loop()) break;
    }
    return optionList;
  }, [mergedOptions, activeValueCells, fieldNames]);
  var onKeyboardSelect = function onKeyboardSelect2(selectValueCells, option) {
    if (isSelectable(option)) {
      onPathSelect(selectValueCells, isLeaf(option, fieldNames), true);
    }
  };
  useKeyboard(ref, mergedOptions, fieldNames, activeValueCells, onPathOpen, onKeyboardSelect, {
    direction,
    searchValue,
    toggleOpen,
    open: open2
  });
  reactExports.useEffect(function() {
    if (searchValue) {
      return;
    }
    for (var i = 0; i < activeValueCells.length; i += 1) {
      var _containerRef$current;
      var cellPath = activeValueCells.slice(0, i + 1);
      var cellKeyPath = toPathKey(cellPath);
      var ele = (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.querySelector(
        'li[data-path-key="'.concat(cellKeyPath.replace(/\\{0,2}"/g, '\\"'), '"]')
        // matches unescaped double quotes
      );
      if (ele) {
        scrollIntoParentView(ele);
      }
    }
  }, [activeValueCells, searchValue]);
  var isEmpty = !((_optionColumns$ = optionColumns[0]) !== null && _optionColumns$ !== void 0 && (_optionColumns$ = _optionColumns$.options) !== null && _optionColumns$ !== void 0 && _optionColumns$.length);
  var emptyList = [(_ref3 = {}, _defineProperty(_ref3, fieldNames.value, "__EMPTY__"), _defineProperty(_ref3, FIX_LABEL, notFoundContent), _defineProperty(_ref3, "disabled", true), _ref3)];
  var columnProps = _objectSpread2(_objectSpread2({}, props), {}, {
    multiple: !isEmpty && multiple,
    onSelect: onPathSelect,
    onActive: onPathOpen,
    onToggleOpen: toggleOpen,
    checkedSet,
    halfCheckedSet,
    loadingKeys,
    isSelectable
  });
  var mergedOptionColumns = isEmpty ? [{
    options: emptyList
  }] : optionColumns;
  var columnNodes = mergedOptionColumns.map(function(col, index2) {
    var prevValuePath = activeValueCells.slice(0, index2);
    var activeValue = activeValueCells[index2];
    return /* @__PURE__ */ reactExports.createElement(Column, _extends({
      key: index2
    }, columnProps, {
      prefixCls: mergedPrefixCls,
      options: col.options,
      prevValuePath,
      activeValue
    }));
  });
  return /* @__PURE__ */ reactExports.createElement(CacheContent, {
    open: open2
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames("".concat(mergedPrefixCls, "-menus"), (_classNames = {}, _defineProperty(_classNames, "".concat(mergedPrefixCls, "-menu-empty"), isEmpty), _defineProperty(_classNames, "".concat(mergedPrefixCls, "-rtl"), rtl), _classNames)),
    ref: containerRef
  }, columnNodes));
});
var RefOptionList$1 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var baseProps = useBaseProps();
  return /* @__PURE__ */ reactExports.createElement(RawOptionList, _extends({}, props, baseProps, {
    ref
  }));
});
function noop() {
}
function Panel$1(props) {
  var _classNames;
  var _ref = props, _ref$prefixCls = _ref.prefixCls, prefixCls = _ref$prefixCls === void 0 ? "rc-cascader" : _ref$prefixCls, style = _ref.style, className = _ref.className, options = _ref.options, checkable = _ref.checkable, defaultValue = _ref.defaultValue, value = _ref.value, fieldNames = _ref.fieldNames, changeOnSelect = _ref.changeOnSelect, onChange = _ref.onChange, showCheckedStrategy = _ref.showCheckedStrategy, loadData = _ref.loadData, expandTrigger = _ref.expandTrigger, _ref$expandIcon = _ref.expandIcon, expandIcon = _ref$expandIcon === void 0 ? ">" : _ref$expandIcon, loadingIcon = _ref.loadingIcon, direction = _ref.direction, _ref$notFoundContent = _ref.notFoundContent, notFoundContent = _ref$notFoundContent === void 0 ? "Not Found" : _ref$notFoundContent, disabled = _ref.disabled;
  var multiple = !!checkable;
  var _useMergedState = useMergedState(defaultValue, {
    value,
    postState: toRawValues
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), rawValues = _useMergedState2[0], setRawValues = _useMergedState2[1];
  var mergedFieldNames = reactExports.useMemo(
    function() {
      return fillFieldNames$1(fieldNames);
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [JSON.stringify(fieldNames)]
    /* eslint-enable react-hooks/exhaustive-deps */
  );
  var _useOptions = useOptions(mergedFieldNames, options), _useOptions2 = _slicedToArray(_useOptions, 3), mergedOptions = _useOptions2[0], getPathKeyEntities = _useOptions2[1], getValueByKeyPath = _useOptions2[2];
  var getMissingValues = useMissingValues(mergedOptions, mergedFieldNames);
  var _useValues = useValues(multiple, rawValues, getPathKeyEntities, getValueByKeyPath, getMissingValues), _useValues2 = _slicedToArray(_useValues, 3), checkedValues = _useValues2[0], halfCheckedValues = _useValues2[1], missingCheckedValues = _useValues2[2];
  var triggerChange = useEvent(function(nextValues) {
    setRawValues(nextValues);
    if (onChange) {
      var nextRawValues = toRawValues(nextValues);
      var valueOptions = nextRawValues.map(function(valueCells) {
        return toPathOptions(valueCells, mergedOptions, mergedFieldNames).map(function(valueOpt) {
          return valueOpt.option;
        });
      });
      var triggerValues = multiple ? nextRawValues : nextRawValues[0];
      var triggerOptions = multiple ? valueOptions : valueOptions[0];
      onChange(triggerValues, triggerOptions);
    }
  });
  var handleSelection = useSelect(multiple, triggerChange, checkedValues, halfCheckedValues, missingCheckedValues, getPathKeyEntities, getValueByKeyPath, showCheckedStrategy);
  var onInternalSelect = useEvent(function(valuePath) {
    handleSelection(valuePath);
  });
  var cascaderContext = reactExports.useMemo(function() {
    return {
      options: mergedOptions,
      fieldNames: mergedFieldNames,
      values: checkedValues,
      halfValues: halfCheckedValues,
      changeOnSelect,
      onSelect: onInternalSelect,
      checkable,
      searchOptions: [],
      dropdownPrefixCls: void 0,
      loadData,
      expandTrigger,
      expandIcon,
      loadingIcon,
      dropdownMenuColumnStyle: void 0
    };
  }, [mergedOptions, mergedFieldNames, checkedValues, halfCheckedValues, changeOnSelect, onInternalSelect, checkable, loadData, expandTrigger, expandIcon, loadingIcon]);
  var panelPrefixCls = "".concat(prefixCls, "-panel");
  var isEmpty = !mergedOptions.length;
  return /* @__PURE__ */ reactExports.createElement(CascaderContext.Provider, {
    value: cascaderContext
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(panelPrefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(panelPrefixCls, "-rtl"), direction === "rtl"), _defineProperty(_classNames, "".concat(panelPrefixCls, "-empty"), isEmpty), _classNames), className),
    style
  }, isEmpty ? notFoundContent : /* @__PURE__ */ reactExports.createElement(RawOptionList, {
    prefixCls,
    searchValue: "",
    multiple,
    toggleOpen: noop,
    open: true,
    direction,
    disabled
  })));
}
var _excluded$c = ["id", "prefixCls", "fieldNames", "defaultValue", "value", "changeOnSelect", "onChange", "displayRender", "checkable", "autoClearSearchValue", "searchValue", "onSearch", "showSearch", "expandTrigger", "options", "dropdownPrefixCls", "loadData", "popupVisible", "open", "popupClassName", "dropdownClassName", "dropdownMenuColumnStyle", "dropdownStyle", "popupPlacement", "placement", "onDropdownVisibleChange", "onPopupVisibleChange", "onOpenChange", "expandIcon", "loadingIcon", "children", "dropdownMatchSelectWidth", "showCheckedStrategy", "optionRender"];
var Cascader$1 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var id = props.id, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-cascader" : _props$prefixCls, fieldNames = props.fieldNames, defaultValue = props.defaultValue, value = props.value, changeOnSelect = props.changeOnSelect, onChange = props.onChange, displayRender = props.displayRender, checkable = props.checkable, _props$autoClearSearc = props.autoClearSearchValue, autoClearSearchValue = _props$autoClearSearc === void 0 ? true : _props$autoClearSearc, searchValue = props.searchValue, onSearch = props.onSearch, showSearch = props.showSearch, expandTrigger = props.expandTrigger, options = props.options, dropdownPrefixCls = props.dropdownPrefixCls, loadData = props.loadData, popupVisible = props.popupVisible, open2 = props.open, popupClassName = props.popupClassName, dropdownClassName = props.dropdownClassName, dropdownMenuColumnStyle = props.dropdownMenuColumnStyle, customDropdownStyle = props.dropdownStyle, popupPlacement = props.popupPlacement, placement = props.placement, onDropdownVisibleChange = props.onDropdownVisibleChange, onPopupVisibleChange = props.onPopupVisibleChange, onOpenChange = props.onOpenChange, _props$expandIcon = props.expandIcon, expandIcon = _props$expandIcon === void 0 ? ">" : _props$expandIcon, loadingIcon = props.loadingIcon, children = props.children, _props$dropdownMatchS = props.dropdownMatchSelectWidth, dropdownMatchSelectWidth = _props$dropdownMatchS === void 0 ? false : _props$dropdownMatchS, _props$showCheckedStr = props.showCheckedStrategy, showCheckedStrategy = _props$showCheckedStr === void 0 ? SHOW_PARENT$2 : _props$showCheckedStr, optionRender = props.optionRender, restProps = _objectWithoutProperties(props, _excluded$c);
  var mergedId = useId(id);
  var multiple = !!checkable;
  var _useMergedState = useMergedState(defaultValue, {
    value,
    postState: toRawValues
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), rawValues = _useMergedState2[0], setRawValues = _useMergedState2[1];
  var mergedFieldNames = reactExports.useMemo(
    function() {
      return fillFieldNames$1(fieldNames);
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [JSON.stringify(fieldNames)]
    /* eslint-enable react-hooks/exhaustive-deps */
  );
  var _useOptions = useOptions(mergedFieldNames, options), _useOptions2 = _slicedToArray(_useOptions, 3), mergedOptions = _useOptions2[0], getPathKeyEntities = _useOptions2[1], getValueByKeyPath = _useOptions2[2];
  var _useMergedState3 = useMergedState("", {
    value: searchValue,
    postState: function postState(search) {
      return search || "";
    }
  }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), mergedSearchValue = _useMergedState4[0], setSearchValue = _useMergedState4[1];
  var onInternalSearch = function onInternalSearch2(searchText, info) {
    setSearchValue(searchText);
    if (info.source !== "blur" && onSearch) {
      onSearch(searchText);
    }
  };
  var _useSearchConfig = useSearchConfig(showSearch), _useSearchConfig2 = _slicedToArray(_useSearchConfig, 2), mergedShowSearch = _useSearchConfig2[0], searchConfig = _useSearchConfig2[1];
  var searchOptions = useSearchOptions(mergedSearchValue, mergedOptions, mergedFieldNames, dropdownPrefixCls || prefixCls, searchConfig, changeOnSelect || multiple);
  var getMissingValues = useMissingValues(mergedOptions, mergedFieldNames);
  var _useValues = useValues(multiple, rawValues, getPathKeyEntities, getValueByKeyPath, getMissingValues), _useValues2 = _slicedToArray(_useValues, 3), checkedValues = _useValues2[0], halfCheckedValues = _useValues2[1], missingCheckedValues = _useValues2[2];
  var deDuplicatedValues = reactExports.useMemo(function() {
    var checkedKeys = toPathKeys(checkedValues);
    var deduplicateKeys = formatStrategyValues$1(checkedKeys, getPathKeyEntities, showCheckedStrategy);
    return [].concat(_toConsumableArray(missingCheckedValues), _toConsumableArray(getValueByKeyPath(deduplicateKeys)));
  }, [checkedValues, getPathKeyEntities, getValueByKeyPath, missingCheckedValues, showCheckedStrategy]);
  var displayValues = useDisplayValues(deDuplicatedValues, mergedOptions, mergedFieldNames, multiple, displayRender);
  var triggerChange = useEvent(function(nextValues) {
    setRawValues(nextValues);
    if (onChange) {
      var nextRawValues = toRawValues(nextValues);
      var valueOptions = nextRawValues.map(function(valueCells) {
        return toPathOptions(valueCells, mergedOptions, mergedFieldNames).map(function(valueOpt) {
          return valueOpt.option;
        });
      });
      var triggerValues = multiple ? nextRawValues : nextRawValues[0];
      var triggerOptions = multiple ? valueOptions : valueOptions[0];
      onChange(triggerValues, triggerOptions);
    }
  });
  var handleSelection = useSelect(multiple, triggerChange, checkedValues, halfCheckedValues, missingCheckedValues, getPathKeyEntities, getValueByKeyPath, showCheckedStrategy);
  var onInternalSelect = useEvent(function(valuePath) {
    if (!multiple || autoClearSearchValue) {
      setSearchValue("");
    }
    handleSelection(valuePath);
  });
  var onDisplayValuesChange = function onDisplayValuesChange2(_, info) {
    if (info.type === "clear") {
      triggerChange([]);
      return;
    }
    var _ref = info.values[0], valueCells = _ref.valueCells;
    onInternalSelect(valueCells);
  };
  var mergedOpen = open2 !== void 0 ? open2 : popupVisible;
  var mergedDropdownClassName = dropdownClassName || popupClassName;
  var mergedPlacement = placement || popupPlacement;
  var onInternalDropdownVisibleChange = function onInternalDropdownVisibleChange2(nextVisible) {
    onOpenChange === null || onOpenChange === void 0 || onOpenChange(nextVisible);
    onDropdownVisibleChange === null || onDropdownVisibleChange === void 0 || onDropdownVisibleChange(nextVisible);
    onPopupVisibleChange === null || onPopupVisibleChange === void 0 || onPopupVisibleChange(nextVisible);
  };
  var cascaderContext = reactExports.useMemo(function() {
    return {
      options: mergedOptions,
      fieldNames: mergedFieldNames,
      values: checkedValues,
      halfValues: halfCheckedValues,
      changeOnSelect,
      onSelect: onInternalSelect,
      checkable,
      searchOptions,
      dropdownPrefixCls,
      loadData,
      expandTrigger,
      expandIcon,
      loadingIcon,
      dropdownMenuColumnStyle,
      optionRender
    };
  }, [mergedOptions, mergedFieldNames, checkedValues, halfCheckedValues, changeOnSelect, onInternalSelect, checkable, searchOptions, dropdownPrefixCls, loadData, expandTrigger, expandIcon, loadingIcon, dropdownMenuColumnStyle, optionRender]);
  var emptyOptions = !(mergedSearchValue ? searchOptions : mergedOptions).length;
  var dropdownStyle = (
    // Search to match width
    mergedSearchValue && searchConfig.matchInputWidth || // Empty keep the width
    emptyOptions ? {} : {
      minWidth: "auto"
    }
  );
  return /* @__PURE__ */ reactExports.createElement(CascaderContext.Provider, {
    value: cascaderContext
  }, /* @__PURE__ */ reactExports.createElement(BaseSelect, _extends({}, restProps, {
    // MISC
    ref,
    id: mergedId,
    prefixCls,
    autoClearSearchValue,
    dropdownMatchSelectWidth,
    dropdownStyle: _objectSpread2(_objectSpread2({}, dropdownStyle), customDropdownStyle),
    displayValues,
    onDisplayValuesChange,
    mode: multiple ? "multiple" : void 0,
    searchValue: mergedSearchValue,
    onSearch: onInternalSearch,
    showSearch: mergedShowSearch,
    OptionList: RefOptionList$1,
    emptyOptions,
    open: mergedOpen,
    dropdownClassName: mergedDropdownClassName,
    placement: mergedPlacement,
    onDropdownVisibleChange: onInternalDropdownVisibleChange,
    getRawInputElement: function getRawInputElement() {
      return children;
    }
  })));
});
Cascader$1.SHOW_PARENT = SHOW_PARENT$2;
Cascader$1.SHOW_CHILD = SHOW_CHILD$2;
Cascader$1.Panel = Panel$1;
function useBase(customizePrefixCls, direction) {
  const {
    getPrefixCls,
    direction: rootDirection,
    renderEmpty
  } = reactExports.useContext(ConfigContext);
  const mergedDirection = direction || rootDirection;
  const prefixCls = getPrefixCls("select", customizePrefixCls);
  const cascaderPrefixCls = getPrefixCls("cascader", customizePrefixCls);
  return [prefixCls, cascaderPrefixCls, mergedDirection, renderEmpty];
}
function useCheckable(cascaderPrefixCls, multiple) {
  return reactExports.useMemo(() => multiple ? /* @__PURE__ */ reactExports.createElement("span", {
    className: `${cascaderPrefixCls}-checkbox-inner`
  }) : false, [cascaderPrefixCls, multiple]);
}
const useColumnIcons = (prefixCls, rtl, expandIcon) => {
  let mergedExpandIcon = expandIcon;
  if (!expandIcon) {
    mergedExpandIcon = rtl ? /* @__PURE__ */ reactExports.createElement(RefIcon$f, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$g, null);
  }
  const loadingIcon = reactExports.useMemo(() => /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-menu-item-loading-icon`
  }, /* @__PURE__ */ reactExports.createElement(RefIcon$e, {
    spin: true
  })), [prefixCls]);
  return reactExports.useMemo(() => [mergedExpandIcon, loadingIcon], [mergedExpandIcon, loadingIcon]);
};
const getColumnsStyle = (token) => {
  const {
    prefixCls,
    componentCls
  } = token;
  const cascaderMenuItemCls = `${componentCls}-menu-item`;
  const iconCls = `
  &${cascaderMenuItemCls}-expand ${cascaderMenuItemCls}-expand-icon,
  ${cascaderMenuItemCls}-loading-icon
`;
  return [
    // ==================== Checkbox ====================
    getStyle$1(`${prefixCls}-checkbox`, token),
    {
      [componentCls]: {
        // ================== Checkbox ==================
        "&-checkbox": {
          top: 0,
          marginInlineEnd: token.paddingXS,
          pointerEvents: "unset"
        },
        // ==================== Menu ====================
        // >>> Menus
        "&-menus": {
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "flex-start",
          [`&${componentCls}-menu-empty`]: {
            [`${componentCls}-menu`]: {
              width: "100%",
              height: "auto",
              [cascaderMenuItemCls]: {
                color: token.colorTextDisabled
              }
            }
          }
        },
        // >>> Menu
        "&-menu": {
          flexGrow: 1,
          flexShrink: 0,
          minWidth: token.controlItemWidth,
          height: token.dropdownHeight,
          margin: 0,
          padding: token.menuPadding,
          overflow: "auto",
          verticalAlign: "top",
          listStyle: "none",
          "-ms-overflow-style": "-ms-autohiding-scrollbar",
          // https://github.com/ant-design/ant-design/issues/11857
          "&:not(:last-child)": {
            borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
          },
          "&-item": Object.assign(Object.assign({}, textEllipsis), {
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            padding: token.optionPadding,
            lineHeight: token.lineHeight,
            cursor: "pointer",
            transition: `all ${token.motionDurationMid}`,
            borderRadius: token.borderRadiusSM,
            "&:hover": {
              background: token.controlItemBgHover
            },
            "&-disabled": {
              color: token.colorTextDisabled,
              cursor: "not-allowed",
              "&:hover": {
                background: "transparent"
              },
              [iconCls]: {
                color: token.colorTextDisabled
              }
            },
            [`&-active:not(${cascaderMenuItemCls}-disabled)`]: {
              "&, &:hover": {
                color: token.optionSelectedColor,
                fontWeight: token.optionSelectedFontWeight,
                backgroundColor: token.optionSelectedBg
              }
            },
            "&-content": {
              flex: "auto"
            },
            [iconCls]: {
              marginInlineStart: token.paddingXXS,
              color: token.colorIcon,
              fontSize: token.fontSizeIcon
            },
            "&-keyword": {
              color: token.colorHighlight
            }
          })
        }
      }
    }
  ];
};
const genBaseStyle$4 = (token) => {
  const {
    componentCls,
    antCls
  } = token;
  return [
    // =====================================================
    // ==                     Control                     ==
    // =====================================================
    {
      [componentCls]: {
        width: token.controlWidth
      }
    },
    // =====================================================
    // ==                      Popup                      ==
    // =====================================================
    {
      [`${componentCls}-dropdown`]: [{
        [`&${antCls}-select-dropdown`]: {
          padding: 0
        }
      }, getColumnsStyle(token)]
    },
    // =====================================================
    // ==                       RTL                       ==
    // =====================================================
    {
      [`${componentCls}-dropdown-rtl`]: {
        direction: "rtl"
      }
    },
    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    genCompactItemStyle(token)
  ];
};
const prepareComponentToken$e = (token) => {
  const itemPaddingVertical = Math.round((token.controlHeight - token.fontSize * token.lineHeight) / 2);
  return {
    controlWidth: 184,
    controlItemWidth: 111,
    dropdownHeight: 180,
    optionSelectedBg: token.controlItemBgActive,
    optionSelectedFontWeight: token.fontWeightStrong,
    optionPadding: `${itemPaddingVertical}px ${token.paddingSM}px`,
    menuPadding: token.paddingXXS,
    optionSelectedColor: token.colorText
  };
};
const useStyle$e = genStyleHooks("Cascader", genBaseStyle$4, prepareComponentToken$e, {
  unitless: {
    optionSelectedFontWeight: true
  }
});
const genPanelStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-panel`]: [getColumnsStyle(token), {
      display: "inline-flex",
      border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
      borderRadius: token.borderRadiusLG,
      overflowX: "auto",
      maxWidth: "100%",
      [`${componentCls}-menus`]: {
        alignItems: "stretch"
      },
      [`${componentCls}-menu`]: {
        height: "auto"
      },
      "&-empty": {
        padding: token.paddingXXS
      }
    }]
  };
};
const usePanelStyle = genComponentStyleHook(["Cascader", "Panel"], genPanelStyle, prepareComponentToken$e);
function CascaderPanel(props) {
  const {
    prefixCls: customizePrefixCls,
    className,
    multiple,
    rootClassName,
    notFoundContent,
    direction,
    expandIcon,
    disabled: customDisabled
  } = props;
  const disabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const [prefixCls, cascaderPrefixCls, mergedDirection, renderEmpty] = useBase(customizePrefixCls, direction);
  const rootCls = useCSSVarCls(cascaderPrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$e(cascaderPrefixCls, rootCls);
  usePanelStyle(cascaderPrefixCls);
  const isRtl = mergedDirection === "rtl";
  const [mergedExpandIcon, loadingIcon] = useColumnIcons(prefixCls, isRtl, expandIcon);
  const mergedNotFoundContent = notFoundContent || (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty("Cascader")) || /* @__PURE__ */ reactExports.createElement(DefaultRenderEmpty, {
    componentName: "Cascader"
  });
  const checkable = useCheckable(cascaderPrefixCls, multiple);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Panel$1, Object.assign({}, props, {
    checkable,
    prefixCls: cascaderPrefixCls,
    className: classNames(className, hashId, rootClassName, cssVarCls, rootCls),
    notFoundContent: mergedNotFoundContent,
    direction: mergedDirection,
    expandIcon: mergedExpandIcon,
    loadingIcon,
    disabled: mergedDisabled
  })));
}
var __rest$s = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const {
  SHOW_CHILD: SHOW_CHILD$1,
  SHOW_PARENT: SHOW_PARENT$1
} = Cascader$1;
function highlightKeyword(str, lowerKeyword, prefixCls) {
  const cells = str.toLowerCase().split(lowerKeyword).reduce((list, cur, index2) => index2 === 0 ? [cur] : [].concat(_toConsumableArray(list), [lowerKeyword, cur]), []);
  const fillCells = [];
  let start = 0;
  cells.forEach((cell, index2) => {
    const end = start + cell.length;
    let originWorld = str.slice(start, end);
    start = end;
    if (index2 % 2 === 1) {
      originWorld = // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ reactExports.createElement("span", {
        className: `${prefixCls}-menu-item-keyword`,
        key: `separator-${index2}`
      }, originWorld);
    }
    fillCells.push(originWorld);
  });
  return fillCells;
}
const defaultSearchRender = (inputValue, path, prefixCls, fieldNames) => {
  const optionList = [];
  const lower2 = inputValue.toLowerCase();
  path.forEach((node, index2) => {
    if (index2 !== 0) {
      optionList.push(" / ");
    }
    let label = node[fieldNames.label];
    const type = typeof label;
    if (type === "string" || type === "number") {
      label = highlightKeyword(String(label), lower2, prefixCls);
    }
    optionList.push(label);
  });
  return optionList;
};
const Cascader = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _a, _b, _c, _d;
  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    disabled: customDisabled,
    className,
    rootClassName,
    multiple,
    bordered = true,
    transitionName,
    choiceTransitionName = "",
    popupClassName,
    dropdownClassName,
    expandIcon,
    placement,
    showSearch,
    allowClear = true,
    notFoundContent,
    direction,
    getPopupContainer,
    status: customStatus,
    showArrow,
    builtinPlacements,
    style,
    variant: customVariant,
    dropdownRender,
    onDropdownVisibleChange,
    dropdownMenuColumnStyle,
    popupRender,
    dropdownStyle,
    popupMenuColumnStyle,
    onOpenChange,
    styles,
    classNames: classNames$1
  } = props, rest = __rest$s(props, ["prefixCls", "size", "disabled", "className", "rootClassName", "multiple", "bordered", "transitionName", "choiceTransitionName", "popupClassName", "dropdownClassName", "expandIcon", "placement", "showSearch", "allowClear", "notFoundContent", "direction", "getPopupContainer", "status", "showArrow", "builtinPlacements", "style", "variant", "dropdownRender", "onDropdownVisibleChange", "dropdownMenuColumnStyle", "popupRender", "dropdownStyle", "popupMenuColumnStyle", "onOpenChange", "styles", "classNames"]);
  const restProps = omit(rest, ["suffixIcon"]);
  const {
    getPrefixCls,
    getPopupContainer: getContextPopupContainer,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("cascader");
  const {
    popupOverflow
  } = reactExports.useContext(ConfigContext);
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon
  } = reactExports.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);
  const [prefixCls, cascaderPrefixCls, mergedDirection, renderEmpty] = useBase(customizePrefixCls, direction);
  const isRtl = mergedDirection === "rtl";
  const rootPrefixCls = getPrefixCls();
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapSelectCSSVar, hashId, cssVarCls] = useSelectStyle(prefixCls, rootCls);
  const cascaderRootCls = useCSSVarCls(cascaderPrefixCls);
  const [wrapCascaderCSSVar] = useStyle$e(cascaderPrefixCls, cascaderRootCls);
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  const [variant, enableVariantCls] = useVariant("cascader", customVariant, bordered);
  const mergedNotFoundContent = notFoundContent || (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty("Cascader")) || /* @__PURE__ */ reactExports.createElement(DefaultRenderEmpty, {
    componentName: "Cascader"
  });
  const mergedPopupClassName = classNames(((_a = classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.popup) === null || _a === void 0 ? void 0 : _a.root) || ((_b = contextClassNames.popup) === null || _b === void 0 ? void 0 : _b.root) || popupClassName || dropdownClassName, `${cascaderPrefixCls}-dropdown`, {
    [`${cascaderPrefixCls}-dropdown-rtl`]: mergedDirection === "rtl"
  }, rootClassName, rootCls, contextClassNames.root, classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.root, cascaderRootCls, hashId, cssVarCls);
  const mergedPopupRender = usePopupRender(popupRender || dropdownRender);
  const mergedPopupMenuColumnStyle = popupMenuColumnStyle || dropdownMenuColumnStyle;
  const mergedOnOpenChange = onOpenChange || onDropdownVisibleChange;
  const mergedPopupStyle = ((_c = styles === null || styles === void 0 ? void 0 : styles.popup) === null || _c === void 0 ? void 0 : _c.root) || ((_d = contextStyles.popup) === null || _d === void 0 ? void 0 : _d.root) || dropdownStyle;
  const mergedShowSearch = reactExports.useMemo(() => {
    if (!showSearch) {
      return showSearch;
    }
    let searchConfig = {
      render: defaultSearchRender
    };
    if (typeof showSearch === "object") {
      searchConfig = Object.assign(Object.assign({}, searchConfig), showSearch);
    }
    return searchConfig;
  }, [showSearch]);
  const mergedSize = useSize((ctx) => {
    var _a2;
    return (_a2 = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a2 !== void 0 ? _a2 : ctx;
  });
  const disabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const [mergedExpandIcon, loadingIcon] = useColumnIcons(prefixCls, isRtl, expandIcon);
  const checkable = useCheckable(cascaderPrefixCls, multiple);
  const showSuffixIcon = useShowArrow(props.suffixIcon, showArrow);
  const {
    suffixIcon,
    removeIcon,
    clearIcon
  } = useIcons(Object.assign(Object.assign({}, props), {
    hasFeedback,
    feedbackIcon,
    showSuffixIcon,
    multiple,
    prefixCls,
    componentName: "Cascader"
  }));
  const memoPlacement = reactExports.useMemo(() => {
    if (placement !== void 0) {
      return placement;
    }
    return isRtl ? "bottomRight" : "bottomLeft";
  }, [placement, isRtl]);
  const mergedAllowClear = allowClear === true ? {
    clearIcon
  } : allowClear;
  const [zIndex] = useZIndex("SelectLike", mergedPopupStyle === null || mergedPopupStyle === void 0 ? void 0 : mergedPopupStyle.zIndex);
  const renderNode = /* @__PURE__ */ reactExports.createElement(Cascader$1, Object.assign({
    prefixCls,
    className: classNames(!customizePrefixCls && cascaderPrefixCls, {
      [`${prefixCls}-lg`]: mergedSize === "large",
      [`${prefixCls}-sm`]: mergedSize === "small",
      [`${prefixCls}-rtl`]: isRtl,
      [`${prefixCls}-${variant}`]: enableVariantCls,
      [`${prefixCls}-in-form-item`]: isFormItemInput
    }, getStatusClassNames(prefixCls, mergedStatus, hasFeedback), compactItemClassnames, contextClassName, className, rootClassName, classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.root, contextClassNames.root, rootCls, cascaderRootCls, hashId, cssVarCls),
    disabled: mergedDisabled,
    style: Object.assign(Object.assign(Object.assign(Object.assign({}, contextStyles.root), styles === null || styles === void 0 ? void 0 : styles.root), contextStyle), style)
  }, restProps, {
    builtinPlacements: mergedBuiltinPlacements(builtinPlacements, popupOverflow),
    direction: mergedDirection,
    placement: memoPlacement,
    notFoundContent: mergedNotFoundContent,
    allowClear: mergedAllowClear,
    showSearch: mergedShowSearch,
    expandIcon: mergedExpandIcon,
    suffixIcon,
    removeIcon,
    loadingIcon,
    checkable,
    dropdownClassName: mergedPopupClassName,
    dropdownPrefixCls: customizePrefixCls || cascaderPrefixCls,
    dropdownStyle: Object.assign(Object.assign({}, mergedPopupStyle), {
      zIndex
    }),
    dropdownRender: mergedPopupRender,
    dropdownMenuColumnStyle: mergedPopupMenuColumnStyle,
    onOpenChange: mergedOnOpenChange,
    choiceTransitionName: getTransitionName(rootPrefixCls, "", choiceTransitionName),
    transitionName: getTransitionName(rootPrefixCls, "slide-up", transitionName),
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    ref
  }));
  return wrapCascaderCSSVar(wrapSelectCSSVar(renderNode));
});
const PurePanel$6 = genPurePanel(Cascader, "dropdownAlign", (props) => omit(props, ["visible"]));
Cascader.SHOW_PARENT = SHOW_PARENT$1;
Cascader.SHOW_CHILD = SHOW_CHILD$1;
Cascader.Panel = CascaderPanel;
Cascader._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$6;
function useBreakpoint() {
  return useBreakpoint$1();
}
const index$1 = {
  useBreakpoint
};
const flexWrapValues = ["wrap", "nowrap", "wrap-reverse"];
const justifyContentValues = ["flex-start", "flex-end", "start", "end", "center", "space-between", "space-around", "space-evenly", "stretch", "normal", "left", "right"];
const alignItemsValues = ["center", "start", "end", "flex-start", "flex-end", "self-start", "self-end", "baseline", "normal", "stretch"];
const genClsWrap = (prefixCls, props) => {
  const wrap = props.wrap === true ? "wrap" : props.wrap;
  return {
    [`${prefixCls}-wrap-${wrap}`]: wrap && flexWrapValues.includes(wrap)
  };
};
const genClsAlign = (prefixCls, props) => {
  const alignCls = {};
  alignItemsValues.forEach((cssKey) => {
    alignCls[`${prefixCls}-align-${cssKey}`] = props.align === cssKey;
  });
  alignCls[`${prefixCls}-align-stretch`] = !props.align && !!props.vertical;
  return alignCls;
};
const genClsJustify = (prefixCls, props) => {
  const justifyCls = {};
  justifyContentValues.forEach((cssKey) => {
    justifyCls[`${prefixCls}-justify-${cssKey}`] = props.justify === cssKey;
  });
  return justifyCls;
};
function createFlexClassNames(prefixCls, props) {
  return classNames(Object.assign(Object.assign(Object.assign({}, genClsWrap(prefixCls, props)), genClsAlign(prefixCls, props)), genClsJustify(prefixCls, props)));
}
const genFlexStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      display: "flex",
      margin: 0,
      padding: 0,
      "&-vertical": {
        flexDirection: "column"
      },
      "&-rtl": {
        direction: "rtl"
      },
      "&:empty": {
        display: "none"
      }
    }
  };
};
const genFlexGapStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      "&-gap-small": {
        gap: token.flexGapSM
      },
      "&-gap-middle": {
        gap: token.flexGap
      },
      "&-gap-large": {
        gap: token.flexGapLG
      }
    }
  };
};
const genFlexWrapStyle = (token) => {
  const {
    componentCls
  } = token;
  const wrapStyle = {};
  flexWrapValues.forEach((value) => {
    wrapStyle[`${componentCls}-wrap-${value}`] = {
      flexWrap: value
    };
  });
  return wrapStyle;
};
const genAlignItemsStyle = (token) => {
  const {
    componentCls
  } = token;
  const alignStyle = {};
  alignItemsValues.forEach((value) => {
    alignStyle[`${componentCls}-align-${value}`] = {
      alignItems: value
    };
  });
  return alignStyle;
};
const genJustifyContentStyle = (token) => {
  const {
    componentCls
  } = token;
  const justifyStyle = {};
  justifyContentValues.forEach((value) => {
    justifyStyle[`${componentCls}-justify-${value}`] = {
      justifyContent: value
    };
  });
  return justifyStyle;
};
const prepareComponentToken$d = () => ({});
const useStyle$d = genStyleHooks("Flex", (token) => {
  const {
    paddingXS,
    padding,
    paddingLG
  } = token;
  const flexToken = merge(token, {
    flexGapSM: paddingXS,
    flexGap: padding,
    flexGapLG: paddingLG
  });
  return [genFlexStyle(flexToken), genFlexGapStyle(flexToken), genFlexWrapStyle(flexToken), genAlignItemsStyle(flexToken), genJustifyContentStyle(flexToken)];
}, prepareComponentToken$d, {
  // Flex component don't apply extra font style
  // https://github.com/ant-design/ant-design/issues/46403
  resetStyle: false
});
var __rest$r = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Flex = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    rootClassName,
    className,
    style,
    flex,
    gap,
    vertical = false,
    component: Component = "div",
    children
  } = props, othersProps = __rest$r(props, ["prefixCls", "rootClassName", "className", "style", "flex", "gap", "vertical", "component", "children"]);
  const {
    flex: ctxFlex,
    direction: ctxDirection,
    getPrefixCls
  } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls("flex", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$d(prefixCls);
  const mergedVertical = vertical !== null && vertical !== void 0 ? vertical : ctxFlex === null || ctxFlex === void 0 ? void 0 : ctxFlex.vertical;
  const mergedCls = classNames(className, rootClassName, ctxFlex === null || ctxFlex === void 0 ? void 0 : ctxFlex.className, prefixCls, hashId, cssVarCls, createFlexClassNames(prefixCls, props), {
    [`${prefixCls}-rtl`]: ctxDirection === "rtl",
    [`${prefixCls}-gap-${gap}`]: isPresetSize(gap),
    [`${prefixCls}-vertical`]: mergedVertical
  });
  const mergedStyle = Object.assign(Object.assign({}, ctxFlex === null || ctxFlex === void 0 ? void 0 : ctxFlex.style), style);
  if (flex) {
    mergedStyle.flex = flex;
  }
  if (gap && !isPresetSize(gap)) {
    mergedStyle.gap = gap;
  }
  return wrapCSSVar(/* @__PURE__ */ React.createElement(Component, Object.assign({
    ref,
    className: mergedCls,
    style: mergedStyle
  }, omit(othersProps, ["justify", "wrap", "align"])), children));
});
const FloatButtonGroupContext = /* @__PURE__ */ React.createContext(void 0);
const {
  Provider: FloatButtonGroupProvider
} = FloatButtonGroupContext;
var FileTextOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494zM504 618H320c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zM312 490v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H320c-4.4 0-8 3.6-8 8z" } }] }, "name": "file-text", "theme": "outlined" };
var FileTextOutlined = function FileTextOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: FileTextOutlined$1
  }));
};
var RefIcon$b = /* @__PURE__ */ reactExports.forwardRef(FileTextOutlined);
var __rest$q = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const FloatButtonContent = (props) => {
  const {
    icon,
    description,
    prefixCls,
    className
  } = props, rest = __rest$q(props, ["icon", "description", "prefixCls", "className"]);
  const defaultElement = /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-icon`
  }, /* @__PURE__ */ React.createElement(RefIcon$b, null));
  return /* @__PURE__ */ React.createElement("div", Object.assign({}, rest, {
    className: classNames(className, `${prefixCls}-content`)
  }), icon || description ? /* @__PURE__ */ React.createElement(React.Fragment, null, icon && /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-icon`
  }, icon), description && /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-description`
  }, description)) : defaultElement);
};
const Content$1 = /* @__PURE__ */ reactExports.memo(FloatButtonContent);
const getOffset$1 = (radius) => {
  if (radius === 0) {
    return 0;
  }
  return radius - Math.sqrt(Math.pow(radius, 2) / 2);
};
const floatButtonGroupMotion = (token) => {
  const {
    componentCls,
    floatButtonSize,
    motionDurationSlow,
    motionEaseInOutCirc,
    calc
  } = token;
  const moveTopIn = new Keyframe("antFloatButtonMoveTopIn", {
    "0%": {
      transform: `translate3d(0, ${unit(floatButtonSize)}, 0)`,
      transformOrigin: "0 0",
      opacity: 0
    },
    "100%": {
      transform: "translate3d(0, 0, 0)",
      transformOrigin: "0 0",
      opacity: 1
    }
  });
  const moveTopOut = new Keyframe("antFloatButtonMoveTopOut", {
    "0%": {
      transform: "translate3d(0, 0, 0)",
      transformOrigin: "0 0",
      opacity: 1
    },
    "100%": {
      transform: `translate3d(0, ${unit(floatButtonSize)}, 0)`,
      transformOrigin: "0 0",
      opacity: 0
    }
  });
  const moveRightIn = new Keyframe("antFloatButtonMoveRightIn", {
    "0%": {
      transform: `translate3d(${unit(calc(floatButtonSize).mul(-1).equal())}, 0, 0)`,
      transformOrigin: "0 0",
      opacity: 0
    },
    "100%": {
      transform: "translate3d(0, 0, 0)",
      transformOrigin: "0 0",
      opacity: 1
    }
  });
  const moveRightOut = new Keyframe("antFloatButtonMoveRightOut", {
    "0%": {
      transform: "translate3d(0, 0, 0)",
      transformOrigin: "0 0",
      opacity: 1
    },
    "100%": {
      transform: `translate3d(${unit(calc(floatButtonSize).mul(-1).equal())}, 0, 0)`,
      transformOrigin: "0 0",
      opacity: 0
    }
  });
  const moveBottomIn = new Keyframe("antFloatButtonMoveBottomIn", {
    "0%": {
      transform: `translate3d(0, ${unit(calc(floatButtonSize).mul(-1).equal())}, 0)`,
      transformOrigin: "0 0",
      opacity: 0
    },
    "100%": {
      transform: "translate3d(0, 0, 0)",
      transformOrigin: "0 0",
      opacity: 1
    }
  });
  const moveBottomOut = new Keyframe("antFloatButtonMoveBottomOut", {
    "0%": {
      transform: "translate3d(0, 0, 0)",
      transformOrigin: "0 0",
      opacity: 1
    },
    "100%": {
      transform: `translate3d(0, ${unit(calc(floatButtonSize).mul(-1).equal())}, 0)`,
      transformOrigin: "0 0",
      opacity: 0
    }
  });
  const moveLeftIn = new Keyframe("antFloatButtonMoveLeftIn", {
    "0%": {
      transform: `translate3d(${unit(floatButtonSize)}, 0, 0)`,
      transformOrigin: "0 0",
      opacity: 0
    },
    "100%": {
      transform: "translate3d(0, 0, 0)",
      transformOrigin: "0 0",
      opacity: 1
    }
  });
  const moveLeftOut = new Keyframe("antFloatButtonMoveLeftOut", {
    "0%": {
      transform: "translate3d(0, 0, 0)",
      transformOrigin: "0 0",
      opacity: 1
    },
    "100%": {
      transform: `translate3d(${unit(floatButtonSize)}, 0, 0)`,
      transformOrigin: "0 0",
      opacity: 0
    }
  });
  const groupPrefixCls = `${componentCls}-group`;
  return [{
    [groupPrefixCls]: {
      [`&${groupPrefixCls}-top ${groupPrefixCls}-wrap`]: initMotion(`${groupPrefixCls}-wrap`, moveTopIn, moveTopOut, motionDurationSlow, true),
      [`&${groupPrefixCls}-bottom ${groupPrefixCls}-wrap`]: initMotion(`${groupPrefixCls}-wrap`, moveBottomIn, moveBottomOut, motionDurationSlow, true),
      [`&${groupPrefixCls}-left ${groupPrefixCls}-wrap`]: initMotion(`${groupPrefixCls}-wrap`, moveLeftIn, moveLeftOut, motionDurationSlow, true),
      [`&${groupPrefixCls}-right ${groupPrefixCls}-wrap`]: initMotion(`${groupPrefixCls}-wrap`, moveRightIn, moveRightOut, motionDurationSlow, true)
    }
  }, {
    [`${groupPrefixCls}-wrap`]: {
      [`&${groupPrefixCls}-wrap-enter, &${groupPrefixCls}-wrap-appear`]: {
        opacity: 0,
        animationTimingFunction: motionEaseInOutCirc
      },
      [`&${groupPrefixCls}-wrap-leave`]: {
        opacity: 1,
        animationTimingFunction: motionEaseInOutCirc
      }
    }
  }];
};
const floatButtonGroupStyle = (token) => {
  const {
    antCls,
    componentCls,
    floatButtonSize,
    margin,
    borderRadiusLG,
    borderRadiusSM,
    badgeOffset,
    floatButtonBodyPadding,
    zIndexPopupBase,
    calc
  } = token;
  const groupPrefixCls = `${componentCls}-group`;
  return {
    [groupPrefixCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      zIndex: zIndexPopupBase,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      position: "fixed",
      height: "auto",
      boxShadow: "none",
      minWidth: floatButtonSize,
      minHeight: floatButtonSize,
      insetInlineEnd: token.floatButtonInsetInlineEnd,
      bottom: token.floatButtonInsetBlockEnd,
      borderRadius: borderRadiusLG,
      [`${groupPrefixCls}-wrap`]: {
        zIndex: -1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute"
      },
      [`&${groupPrefixCls}-rtl`]: {
        direction: "rtl"
      },
      [componentCls]: {
        position: "static"
      }
    }),
    [`${groupPrefixCls}-top > ${groupPrefixCls}-wrap`]: {
      flexDirection: "column",
      top: "auto",
      bottom: calc(floatButtonSize).add(margin).equal(),
      "&::after": {
        content: '""',
        position: "absolute",
        width: "100%",
        height: margin,
        bottom: calc(margin).mul(-1).equal()
      }
    },
    [`${groupPrefixCls}-bottom > ${groupPrefixCls}-wrap`]: {
      flexDirection: "column",
      top: calc(floatButtonSize).add(margin).equal(),
      bottom: "auto",
      "&::after": {
        content: '""',
        position: "absolute",
        width: "100%",
        height: margin,
        top: calc(margin).mul(-1).equal()
      }
    },
    [`${groupPrefixCls}-right > ${groupPrefixCls}-wrap`]: {
      flexDirection: "row",
      left: {
        _skip_check_: true,
        value: calc(floatButtonSize).add(margin).equal()
      },
      right: {
        _skip_check_: true,
        value: "auto"
      },
      "&::after": {
        content: '""',
        position: "absolute",
        width: margin,
        height: "100%",
        left: {
          _skip_check_: true,
          value: calc(margin).mul(-1).equal()
        }
      }
    },
    [`${groupPrefixCls}-left > ${groupPrefixCls}-wrap`]: {
      flexDirection: "row",
      left: {
        _skip_check_: true,
        value: "auto"
      },
      right: {
        _skip_check_: true,
        value: calc(floatButtonSize).add(margin).equal()
      },
      "&::after": {
        content: '""',
        position: "absolute",
        width: margin,
        height: "100%",
        right: {
          _skip_check_: true,
          value: calc(margin).mul(-1).equal()
        }
      }
    },
    [`${groupPrefixCls}-circle`]: {
      gap: margin,
      [`${groupPrefixCls}-wrap`]: {
        gap: margin
      }
    },
    [`${groupPrefixCls}-square`]: {
      [`${componentCls}-square`]: {
        padding: 0,
        borderRadius: 0,
        [`&${groupPrefixCls}-trigger`]: {
          borderRadius: borderRadiusLG
        },
        "&:first-child": {
          borderStartStartRadius: borderRadiusLG,
          borderStartEndRadius: borderRadiusLG
        },
        "&:last-child": {
          borderEndStartRadius: borderRadiusLG,
          borderEndEndRadius: borderRadiusLG
        },
        "&:not(:last-child)": {
          borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
        },
        [`${antCls}-badge`]: {
          [`${antCls}-badge-count`]: {
            top: calc(calc(floatButtonBodyPadding).add(badgeOffset)).mul(-1).equal(),
            insetInlineEnd: calc(calc(floatButtonBodyPadding).add(badgeOffset)).mul(-1).equal()
          }
        }
      },
      [`${groupPrefixCls}-wrap`]: {
        borderRadius: borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        [`${componentCls}-square`]: {
          boxShadow: "none",
          borderRadius: 0,
          padding: floatButtonBodyPadding,
          [`${componentCls}-body`]: {
            width: token.floatButtonBodySize,
            height: token.floatButtonBodySize,
            borderRadius: borderRadiusSM
          }
        }
      }
    },
    [`${groupPrefixCls}-top > ${groupPrefixCls}-wrap, ${groupPrefixCls}-bottom > ${groupPrefixCls}-wrap`]: {
      [`> ${componentCls}-square`]: {
        "&:first-child": {
          borderStartStartRadius: borderRadiusLG,
          borderStartEndRadius: borderRadiusLG
        },
        "&:last-child": {
          borderEndStartRadius: borderRadiusLG,
          borderEndEndRadius: borderRadiusLG
        },
        "&:not(:last-child)": {
          borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
        }
      }
    },
    [`${groupPrefixCls}-left > ${groupPrefixCls}-wrap, ${groupPrefixCls}-right > ${groupPrefixCls}-wrap`]: {
      [`> ${componentCls}-square`]: {
        "&:first-child": {
          borderStartStartRadius: borderRadiusLG,
          borderEndStartRadius: borderRadiusLG
        },
        "&:last-child": {
          borderStartEndRadius: borderRadiusLG,
          borderEndEndRadius: borderRadiusLG
        },
        "&:not(:last-child)": {
          borderBottom: "none",
          borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
        }
      }
    },
    [`${groupPrefixCls}-circle-shadow`]: {
      boxShadow: "none"
    },
    [`${groupPrefixCls}-square-shadow`]: {
      boxShadow: token.boxShadowSecondary,
      [`${componentCls}-square`]: {
        boxShadow: "none",
        padding: floatButtonBodyPadding,
        [`${componentCls}-body`]: {
          width: token.floatButtonBodySize,
          height: token.floatButtonBodySize,
          borderRadius: borderRadiusSM
        }
      }
    }
  };
};
const sharedFloatButtonStyle = (token) => {
  const {
    antCls,
    componentCls,
    floatButtonBodyPadding,
    floatButtonIconSize,
    floatButtonSize,
    borderRadiusLG,
    badgeOffset,
    dotOffsetInSquare,
    dotOffsetInCircle,
    zIndexPopupBase,
    calc
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      border: "none",
      position: "fixed",
      cursor: "pointer",
      zIndex: zIndexPopupBase,
      // Do not remove the 'display: block' here.
      // Deleting it will cause marginBottom to become ineffective.
      // Ref: https://github.com/ant-design/ant-design/issues/44700
      display: "block",
      width: floatButtonSize,
      height: floatButtonSize,
      insetInlineEnd: token.floatButtonInsetInlineEnd,
      bottom: token.floatButtonInsetBlockEnd,
      boxShadow: token.boxShadowSecondary,
      // Pure Panel
      "&-pure": {
        position: "relative",
        inset: "auto"
      },
      "&:empty": {
        display: "none"
      },
      [`${antCls}-badge`]: {
        width: "100%",
        height: "100%",
        [`${antCls}-badge-count`]: {
          transform: "translate(0, 0)",
          transformOrigin: "center",
          top: calc(badgeOffset).mul(-1).equal(),
          insetInlineEnd: calc(badgeOffset).mul(-1).equal()
        }
      },
      [`${componentCls}-body`]: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: `all ${token.motionDurationMid}`,
        [`${componentCls}-content`]: {
          overflow: "hidden",
          textAlign: "center",
          minHeight: floatButtonSize,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: `${unit(calc(floatButtonBodyPadding).div(2).equal())} ${unit(floatButtonBodyPadding)}`,
          [`${componentCls}-icon`]: {
            textAlign: "center",
            margin: "auto",
            width: floatButtonIconSize,
            fontSize: floatButtonIconSize,
            lineHeight: 1
          }
        }
      }
    }),
    [`${componentCls}-rtl`]: {
      direction: "rtl"
    },
    [`${componentCls}-circle`]: {
      height: floatButtonSize,
      borderRadius: "50%",
      [`${antCls}-badge`]: {
        [`${antCls}-badge-dot`]: {
          top: dotOffsetInCircle,
          insetInlineEnd: dotOffsetInCircle
        }
      },
      [`${componentCls}-body`]: {
        borderRadius: "50%"
      }
    },
    [`${componentCls}-square`]: {
      height: "auto",
      minHeight: floatButtonSize,
      borderRadius: borderRadiusLG,
      [`${antCls}-badge`]: {
        [`${antCls}-badge-dot`]: {
          top: dotOffsetInSquare,
          insetInlineEnd: dotOffsetInSquare
        }
      },
      [`${componentCls}-body`]: {
        height: "auto",
        borderRadius: borderRadiusLG
      }
    },
    [`${componentCls}-default`]: {
      backgroundColor: token.floatButtonBackgroundColor,
      transition: `background-color ${token.motionDurationMid}`,
      [`${componentCls}-body`]: {
        backgroundColor: token.floatButtonBackgroundColor,
        transition: `background-color ${token.motionDurationMid}`,
        "&:hover": {
          backgroundColor: token.colorFillContent
        },
        [`${componentCls}-content`]: {
          [`${componentCls}-icon`]: {
            color: token.colorText
          },
          [`${componentCls}-description`]: {
            display: "flex",
            alignItems: "center",
            lineHeight: unit(token.fontSizeLG),
            color: token.colorText,
            fontSize: token.fontSizeSM
          }
        }
      }
    },
    [`${componentCls}-primary`]: {
      backgroundColor: token.colorPrimary,
      [`${componentCls}-body`]: {
        backgroundColor: token.colorPrimary,
        transition: `background-color ${token.motionDurationMid}`,
        "&:hover": {
          backgroundColor: token.colorPrimaryHover
        },
        [`${componentCls}-content`]: {
          [`${componentCls}-icon`]: {
            color: token.colorTextLightSolid
          },
          [`${componentCls}-description`]: {
            display: "flex",
            alignItems: "center",
            lineHeight: unit(token.fontSizeLG),
            color: token.colorTextLightSolid,
            fontSize: token.fontSizeSM
          }
        }
      }
    }
  };
};
const prepareComponentToken$c = (token) => ({
  dotOffsetInCircle: getOffset$1(token.controlHeightLG / 2),
  dotOffsetInSquare: getOffset$1(token.borderRadiusLG)
});
const useStyle$c = genStyleHooks("FloatButton", (token) => {
  const {
    colorTextLightSolid,
    colorBgElevated,
    controlHeightLG,
    marginXXL,
    marginLG,
    fontSize,
    fontSizeIcon,
    controlItemBgHover,
    paddingXXS,
    calc
  } = token;
  const floatButtonToken = merge(token, {
    floatButtonBackgroundColor: colorBgElevated,
    floatButtonColor: colorTextLightSolid,
    floatButtonHoverBackgroundColor: controlItemBgHover,
    floatButtonFontSize: fontSize,
    floatButtonIconSize: calc(fontSizeIcon).mul(1.5).equal(),
    floatButtonSize: controlHeightLG,
    floatButtonInsetBlockEnd: marginXXL,
    floatButtonInsetInlineEnd: marginLG,
    floatButtonBodySize: calc(controlHeightLG).sub(calc(paddingXXS).mul(2)).equal(),
    // 这里的 paddingXXS 是简写，完整逻辑是 (controlHeightLG - (controlHeightLG - paddingXXS * 2)) / 2,
    floatButtonBodyPadding: paddingXXS,
    badgeOffset: calc(paddingXXS).mul(1.5).equal()
  });
  return [floatButtonGroupStyle(floatButtonToken), sharedFloatButtonStyle(floatButtonToken), initFadeMotion(token), floatButtonGroupMotion(floatButtonToken)];
}, prepareComponentToken$c);
var __rest$p = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const floatButtonPrefixCls = "float-btn";
const InternalFloatButton = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    type = "default",
    shape = "circle",
    icon,
    description,
    tooltip,
    htmlType = "button",
    badge = {}
  } = props, restProps = __rest$p(props, ["prefixCls", "className", "rootClassName", "style", "type", "shape", "icon", "description", "tooltip", "htmlType", "badge"]);
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const groupShape = reactExports.useContext(FloatButtonGroupContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$c(prefixCls, rootCls);
  const mergedShape = groupShape || shape;
  const classString = classNames(hashId, cssVarCls, rootCls, prefixCls, className, rootClassName, `${prefixCls}-${type}`, `${prefixCls}-${mergedShape}`, {
    [`${prefixCls}-rtl`]: direction === "rtl"
  });
  const [zIndex] = useZIndex("FloatButton", style === null || style === void 0 ? void 0 : style.zIndex);
  const mergedStyle = Object.assign(Object.assign({}, style), {
    zIndex
  });
  const badgeProps = omit(badge, ["title", "children", "status", "text"]);
  let buttonNode = /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-body`
  }, /* @__PURE__ */ React.createElement(Content$1, {
    prefixCls,
    description,
    icon
  }));
  if ("badge" in props) {
    buttonNode = /* @__PURE__ */ React.createElement(Badge, Object.assign({}, badgeProps), buttonNode);
  }
  const tooltipProps = convertToTooltipProps(tooltip);
  if (tooltipProps) {
    buttonNode = /* @__PURE__ */ React.createElement(Tooltip, Object.assign({}, tooltipProps), buttonNode);
  }
  return wrapCSSVar(props.href ? /* @__PURE__ */ React.createElement("a", Object.assign({
    ref
  }, restProps, {
    className: classString,
    style: mergedStyle
  }), buttonNode) : /* @__PURE__ */ React.createElement("button", Object.assign({
    ref
  }, restProps, {
    className: classString,
    style: mergedStyle,
    type: htmlType
  }), buttonNode));
});
const FloatButton = InternalFloatButton;
var __rest$o = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const defaultIcon = /* @__PURE__ */ React.createElement(RefIcon$c, null);
const BackTop = /* @__PURE__ */ React.forwardRef((props, ref) => {
  var _a;
  const {
    backTopIcon: contextIcon
  } = useComponentConfig("floatButton");
  const {
    prefixCls: customizePrefixCls,
    className,
    type = "default",
    shape = "circle",
    visibilityHeight = 400,
    icon,
    target,
    onClick,
    duration = 450
  } = props, restProps = __rest$o(props, ["prefixCls", "className", "type", "shape", "visibilityHeight", "icon", "target", "onClick", "duration"]);
  const mergedIcon = (_a = icon !== null && icon !== void 0 ? icon : contextIcon) !== null && _a !== void 0 ? _a : defaultIcon;
  const [visible, setVisible] = reactExports.useState(visibilityHeight === 0);
  const internalRef = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    nativeElement: internalRef.current
  }));
  const getDefaultTarget2 = () => {
    var _a2;
    return ((_a2 = internalRef.current) === null || _a2 === void 0 ? void 0 : _a2.ownerDocument) || window;
  };
  const handleScroll = throttleByAnimationFrame((e2) => {
    const scrollTop = getScroll$1(e2.target);
    setVisible(scrollTop >= visibilityHeight);
  });
  reactExports.useEffect(() => {
    const getTarget = target || getDefaultTarget2;
    const container = getTarget();
    handleScroll({
      target: container
    });
    container === null || container === void 0 ? void 0 : container.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      container === null || container === void 0 ? void 0 : container.removeEventListener("scroll", handleScroll);
    };
  }, [target]);
  const scrollToTop = (e2) => {
    scrollTo(0, {
      getContainer: target || getDefaultTarget2,
      duration
    });
    onClick === null || onClick === void 0 ? void 0 : onClick(e2);
  };
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const groupShape = reactExports.useContext(FloatButtonGroupContext);
  const mergedShape = groupShape || shape;
  const contentProps = Object.assign({
    prefixCls,
    icon: mergedIcon,
    type,
    shape: mergedShape
  }, restProps);
  return /* @__PURE__ */ React.createElement(CSSMotion, {
    visible,
    motionName: `${rootPrefixCls}-fade`
  }, ({
    className: motionClassName
  }, setRef) => /* @__PURE__ */ React.createElement(FloatButton, Object.assign({
    ref: composeRef(internalRef, setRef)
  }, contentProps, {
    onClick: scrollToTop,
    className: classNames(className, motionClassName)
  })));
});
var __rest$n = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const FloatButtonGroup = (props) => {
  var _a;
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    shape = "circle",
    type = "default",
    placement = "top",
    icon = /* @__PURE__ */ React.createElement(RefIcon$b, null),
    closeIcon,
    description,
    trigger,
    children,
    onOpenChange,
    open: customOpen,
    onClick: onTriggerButtonClick
  } = props, floatButtonProps = __rest$n(props, ["prefixCls", "className", "style", "shape", "type", "placement", "icon", "closeIcon", "description", "trigger", "children", "onOpenChange", "open", "onClick"]);
  const {
    direction,
    getPrefixCls,
    closeIcon: contextCloseIcon
  } = useComponentConfig("floatButtonGroup");
  const mergedCloseIcon = (_a = closeIcon !== null && closeIcon !== void 0 ? closeIcon : contextCloseIcon) !== null && _a !== void 0 ? _a : /* @__PURE__ */ React.createElement(RefIcon$h, null);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$c(prefixCls, rootCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const isMenuMode = trigger && ["click", "hover"].includes(trigger);
  const isValidPlacement = placement && ["top", "left", "right", "bottom"].includes(placement);
  const groupCls = classNames(groupPrefixCls, hashId, cssVarCls, rootCls, className, {
    [`${groupPrefixCls}-rtl`]: direction === "rtl",
    [`${groupPrefixCls}-${shape}`]: shape,
    [`${groupPrefixCls}-${shape}-shadow`]: !isMenuMode,
    [`${groupPrefixCls}-${placement}`]: isMenuMode && isValidPlacement
    // 只有菜单模式才支持弹出方向
  });
  const [zIndex] = useZIndex("FloatButton", style === null || style === void 0 ? void 0 : style.zIndex);
  const mergedStyle = Object.assign(Object.assign({}, style), {
    zIndex
  });
  const wrapperCls = classNames(hashId, `${groupPrefixCls}-wrap`);
  const [open2, setOpen] = useMergedState(false, {
    value: customOpen
  });
  const floatButtonGroupRef = React.useRef(null);
  const hoverTrigger = trigger === "hover";
  const clickTrigger = trigger === "click";
  const triggerOpen = useEvent((nextOpen) => {
    if (open2 !== nextOpen) {
      setOpen(nextOpen);
      onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(nextOpen);
    }
  });
  const onMouseEnter = () => {
    if (hoverTrigger) {
      triggerOpen(true);
    }
  };
  const onMouseLeave = () => {
    if (hoverTrigger) {
      triggerOpen(false);
    }
  };
  const onInternalTriggerButtonClick = (e2) => {
    if (clickTrigger) {
      triggerOpen(!open2);
    }
    onTriggerButtonClick === null || onTriggerButtonClick === void 0 ? void 0 : onTriggerButtonClick(e2);
  };
  React.useEffect(() => {
    if (clickTrigger) {
      const onDocClick = (e2) => {
        var _a2;
        if ((_a2 = floatButtonGroupRef.current) === null || _a2 === void 0 ? void 0 : _a2.contains(e2.target)) {
          return;
        }
        triggerOpen(false);
      };
      document.addEventListener("click", onDocClick, {
        capture: true
      });
      return () => document.removeEventListener("click", onDocClick, {
        capture: true
      });
    }
  }, [clickTrigger]);
  return wrapCSSVar(/* @__PURE__ */ React.createElement(FloatButtonGroupProvider, {
    value: shape
  }, /* @__PURE__ */ React.createElement("div", {
    ref: floatButtonGroupRef,
    className: groupCls,
    style: mergedStyle,
    // Hover trigger
    onMouseEnter,
    onMouseLeave
  }, isMenuMode ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(CSSMotion, {
    visible: open2,
    motionName: `${groupPrefixCls}-wrap`
  }, ({
    className: motionClassName
  }) => /* @__PURE__ */ React.createElement("div", {
    className: classNames(motionClassName, wrapperCls)
  }, children)), /* @__PURE__ */ React.createElement(FloatButton, Object.assign({
    type,
    icon: open2 ? mergedCloseIcon : icon,
    description,
    "aria-label": props["aria-label"],
    className: `${groupPrefixCls}-trigger`,
    onClick: onInternalTriggerButtonClick
  }, floatButtonProps))) : children)));
};
var __rest$m = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const PureFloatButton = (_a) => {
  var {
    backTop
  } = _a, props = __rest$m(_a, ["backTop"]);
  return backTop ? /* @__PURE__ */ reactExports.createElement(BackTop, Object.assign({}, props, {
    visibilityHeight: 0
  })) : /* @__PURE__ */ reactExports.createElement(FloatButton, Object.assign({}, props));
};
const PurePanel$5 = (_a) => {
  var {
    className,
    items
  } = _a, props = __rest$m(_a, ["className", "items"]);
  const {
    prefixCls: customizePrefixCls
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const pureCls = `${prefixCls}-pure`;
  if (items) {
    return /* @__PURE__ */ reactExports.createElement(FloatButtonGroup, Object.assign({
      className: classNames(className, pureCls)
    }, props), items.map((item, index2) => /* @__PURE__ */ reactExports.createElement(PureFloatButton, Object.assign({
      key: index2
    }, item))));
  }
  return /* @__PURE__ */ reactExports.createElement(PureFloatButton, Object.assign({
    className: classNames(className, pureCls)
  }, props));
};
FloatButton.BackTop = BackTop;
FloatButton.Group = FloatButtonGroup;
FloatButton._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$5;
function getClientSize() {
  var width = document.documentElement.clientWidth;
  var height = window.innerHeight || document.documentElement.clientHeight;
  return {
    width,
    height
  };
}
function getOffset(node) {
  var box = node.getBoundingClientRect();
  var docElem = document.documentElement;
  return {
    left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
    top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
  };
}
var PreviewGroupContext = /* @__PURE__ */ reactExports.createContext(null);
var Operations = function Operations2(props) {
  var visible = props.visible, maskTransitionName = props.maskTransitionName, getContainer = props.getContainer, prefixCls = props.prefixCls, rootClassName = props.rootClassName, icons2 = props.icons, countRender = props.countRender, showSwitch = props.showSwitch, showProgress = props.showProgress, current = props.current, transform = props.transform, count = props.count, scale = props.scale, minScale = props.minScale, maxScale = props.maxScale, closeIcon = props.closeIcon, onActive = props.onActive, onClose = props.onClose, onZoomIn = props.onZoomIn, onZoomOut = props.onZoomOut, onRotateRight = props.onRotateRight, onRotateLeft = props.onRotateLeft, onFlipX = props.onFlipX, onFlipY = props.onFlipY, onReset = props.onReset, toolbarRender = props.toolbarRender, zIndex = props.zIndex, image = props.image;
  var groupContext = reactExports.useContext(PreviewGroupContext);
  var rotateLeft = icons2.rotateLeft, rotateRight = icons2.rotateRight, zoomIn = icons2.zoomIn, zoomOut = icons2.zoomOut, close = icons2.close, left = icons2.left, right = icons2.right, flipX = icons2.flipX, flipY = icons2.flipY;
  var toolClassName = "".concat(prefixCls, "-operations-operation");
  reactExports.useEffect(function() {
    var onKeyDown = function onKeyDown2(e2) {
      if (e2.keyCode === KeyCode.ESC) {
        onClose();
      }
    };
    if (visible) {
      window.addEventListener("keydown", onKeyDown);
    }
    return function() {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [visible]);
  var handleActive = function handleActive2(e2, offset) {
    e2.preventDefault();
    e2.stopPropagation();
    onActive(offset);
  };
  var renderOperation = reactExports.useCallback(function(_ref) {
    var type = _ref.type, disabled = _ref.disabled, onClick = _ref.onClick, icon = _ref.icon;
    return /* @__PURE__ */ reactExports.createElement("div", {
      key: type,
      className: classNames(toolClassName, "".concat(prefixCls, "-operations-operation-").concat(type), _defineProperty({}, "".concat(prefixCls, "-operations-operation-disabled"), !!disabled)),
      onClick
    }, icon);
  }, [toolClassName, prefixCls]);
  var switchPrevNode = showSwitch ? renderOperation({
    icon: left,
    onClick: function onClick(e2) {
      return handleActive(e2, -1);
    },
    type: "prev",
    disabled: current === 0
  }) : void 0;
  var switchNextNode = showSwitch ? renderOperation({
    icon: right,
    onClick: function onClick(e2) {
      return handleActive(e2, 1);
    },
    type: "next",
    disabled: current === count - 1
  }) : void 0;
  var flipYNode = renderOperation({
    icon: flipY,
    onClick: onFlipY,
    type: "flipY"
  });
  var flipXNode = renderOperation({
    icon: flipX,
    onClick: onFlipX,
    type: "flipX"
  });
  var rotateLeftNode = renderOperation({
    icon: rotateLeft,
    onClick: onRotateLeft,
    type: "rotateLeft"
  });
  var rotateRightNode = renderOperation({
    icon: rotateRight,
    onClick: onRotateRight,
    type: "rotateRight"
  });
  var zoomOutNode = renderOperation({
    icon: zoomOut,
    onClick: onZoomOut,
    type: "zoomOut",
    disabled: scale <= minScale
  });
  var zoomInNode = renderOperation({
    icon: zoomIn,
    onClick: onZoomIn,
    type: "zoomIn",
    disabled: scale === maxScale
  });
  var toolbarNode = /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-operations")
  }, flipYNode, flipXNode, rotateLeftNode, rotateRightNode, zoomOutNode, zoomInNode);
  return /* @__PURE__ */ reactExports.createElement(CSSMotion, {
    visible,
    motionName: maskTransitionName
  }, function(_ref2) {
    var className = _ref2.className, style = _ref2.style;
    return /* @__PURE__ */ reactExports.createElement(Portal, {
      open: true,
      getContainer: getContainer !== null && getContainer !== void 0 ? getContainer : document.body
    }, /* @__PURE__ */ reactExports.createElement("div", {
      className: classNames("".concat(prefixCls, "-operations-wrapper"), className, rootClassName),
      style: _objectSpread2(_objectSpread2({}, style), {}, {
        zIndex
      })
    }, closeIcon === null ? null : /* @__PURE__ */ reactExports.createElement("button", {
      className: "".concat(prefixCls, "-close"),
      onClick: onClose
    }, closeIcon || close), showSwitch && /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("div", {
      className: classNames("".concat(prefixCls, "-switch-left"), _defineProperty({}, "".concat(prefixCls, "-switch-left-disabled"), current === 0)),
      onClick: function onClick(e2) {
        return handleActive(e2, -1);
      }
    }, left), /* @__PURE__ */ reactExports.createElement("div", {
      className: classNames("".concat(prefixCls, "-switch-right"), _defineProperty({}, "".concat(prefixCls, "-switch-right-disabled"), current === count - 1)),
      onClick: function onClick(e2) {
        return handleActive(e2, 1);
      }
    }, right)), /* @__PURE__ */ reactExports.createElement("div", {
      className: "".concat(prefixCls, "-footer")
    }, showProgress && /* @__PURE__ */ reactExports.createElement("div", {
      className: "".concat(prefixCls, "-progress")
    }, countRender ? countRender(current + 1, count) : /* @__PURE__ */ reactExports.createElement("bdi", null, "".concat(current + 1, " / ").concat(count))), toolbarRender ? toolbarRender(toolbarNode, _objectSpread2(_objectSpread2({
      icons: {
        prevIcon: switchPrevNode,
        nextIcon: switchNextNode,
        flipYIcon: flipYNode,
        flipXIcon: flipXNode,
        rotateLeftIcon: rotateLeftNode,
        rotateRightIcon: rotateRightNode,
        zoomOutIcon: zoomOutNode,
        zoomInIcon: zoomInNode
      },
      actions: {
        onActive,
        onFlipY,
        onFlipX,
        onRotateLeft,
        onRotateRight,
        onZoomOut,
        onZoomIn,
        onReset,
        onClose
      },
      transform
    }, groupContext ? {
      current,
      total: count
    } : {}), {}, {
      image
    })) : toolbarNode)));
  });
};
var initialTransform = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  flipX: false,
  flipY: false
};
function useImageTransform(imgRef, minScale, maxScale, onTransform) {
  var frame = reactExports.useRef(null);
  var queue = reactExports.useRef([]);
  var _useState = reactExports.useState(initialTransform), _useState2 = _slicedToArray(_useState, 2), transform = _useState2[0], setTransform = _useState2[1];
  var resetTransform = function resetTransform2(action) {
    setTransform(initialTransform);
    if (!isEqual(initialTransform, transform)) {
      onTransform === null || onTransform === void 0 || onTransform({
        transform: initialTransform,
        action
      });
    }
  };
  var updateTransform = function updateTransform2(newTransform, action) {
    if (frame.current === null) {
      queue.current = [];
      frame.current = wrapperRaf(function() {
        setTransform(function(preState) {
          var memoState = preState;
          queue.current.forEach(function(queueState) {
            memoState = _objectSpread2(_objectSpread2({}, memoState), queueState);
          });
          frame.current = null;
          onTransform === null || onTransform === void 0 || onTransform({
            transform: memoState,
            action
          });
          return memoState;
        });
      });
    }
    queue.current.push(_objectSpread2(_objectSpread2({}, transform), newTransform));
  };
  var dispatchZoomChange = function dispatchZoomChange2(ratio, action, centerX, centerY, isTouch) {
    var _imgRef$current = imgRef.current, width = _imgRef$current.width, height = _imgRef$current.height, offsetWidth = _imgRef$current.offsetWidth, offsetHeight = _imgRef$current.offsetHeight, offsetLeft = _imgRef$current.offsetLeft, offsetTop = _imgRef$current.offsetTop;
    var newRatio = ratio;
    var newScale = transform.scale * ratio;
    if (newScale > maxScale) {
      newScale = maxScale;
      newRatio = maxScale / transform.scale;
    } else if (newScale < minScale) {
      newScale = isTouch ? newScale : minScale;
      newRatio = newScale / transform.scale;
    }
    var mergedCenterX = centerX !== null && centerX !== void 0 ? centerX : innerWidth / 2;
    var mergedCenterY = centerY !== null && centerY !== void 0 ? centerY : innerHeight / 2;
    var diffRatio = newRatio - 1;
    var diffImgX = diffRatio * width * 0.5;
    var diffImgY = diffRatio * height * 0.5;
    var diffOffsetLeft = diffRatio * (mergedCenterX - transform.x - offsetLeft);
    var diffOffsetTop = diffRatio * (mergedCenterY - transform.y - offsetTop);
    var newX = transform.x - (diffOffsetLeft - diffImgX);
    var newY = transform.y - (diffOffsetTop - diffImgY);
    if (ratio < 1 && newScale === 1) {
      var mergedWidth = offsetWidth * newScale;
      var mergedHeight = offsetHeight * newScale;
      var _getClientSize = getClientSize(), clientWidth = _getClientSize.width, clientHeight = _getClientSize.height;
      if (mergedWidth <= clientWidth && mergedHeight <= clientHeight) {
        newX = 0;
        newY = 0;
      }
    }
    updateTransform({
      x: newX,
      y: newY,
      scale: newScale
    }, action);
  };
  return {
    transform,
    resetTransform,
    updateTransform,
    dispatchZoomChange
  };
}
function fixPoint(key, start, width, clientWidth) {
  var startAddWidth = start + width;
  var offsetStart = (width - clientWidth) / 2;
  if (width > clientWidth) {
    if (start > 0) {
      return _defineProperty({}, key, offsetStart);
    }
    if (start < 0 && startAddWidth < clientWidth) {
      return _defineProperty({}, key, -offsetStart);
    }
  } else if (start < 0 || startAddWidth > clientWidth) {
    return _defineProperty({}, key, start < 0 ? offsetStart : -offsetStart);
  }
  return {};
}
function getFixScaleEleTransPosition(width, height, left, top) {
  var _getClientSize = getClientSize(), clientWidth = _getClientSize.width, clientHeight = _getClientSize.height;
  var fixPos = null;
  if (width <= clientWidth && height <= clientHeight) {
    fixPos = {
      x: 0,
      y: 0
    };
  } else if (width > clientWidth || height > clientHeight) {
    fixPos = _objectSpread2(_objectSpread2({}, fixPoint("x", left, width, clientWidth)), fixPoint("y", top, height, clientHeight));
  }
  return fixPos;
}
var BASE_SCALE_RATIO = 1;
var WHEEL_MAX_SCALE_RATIO = 1;
function useMouseEvent(imgRef, movable, visible, scaleStep, transform, updateTransform, dispatchZoomChange) {
  var rotate = transform.rotate, scale = transform.scale, x = transform.x, y = transform.y;
  var _useState = reactExports.useState(false), _useState2 = _slicedToArray(_useState, 2), isMoving = _useState2[0], setMoving = _useState2[1];
  var startPositionInfo = reactExports.useRef({
    diffX: 0,
    diffY: 0,
    transformX: 0,
    transformY: 0
  });
  var onMouseDown = function onMouseDown2(event) {
    if (!movable || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    startPositionInfo.current = {
      diffX: event.pageX - x,
      diffY: event.pageY - y,
      transformX: x,
      transformY: y
    };
    setMoving(true);
  };
  var onMouseMove = function onMouseMove2(event) {
    if (visible && isMoving) {
      updateTransform({
        x: event.pageX - startPositionInfo.current.diffX,
        y: event.pageY - startPositionInfo.current.diffY
      }, "move");
    }
  };
  var onMouseUp = function onMouseUp2() {
    if (visible && isMoving) {
      setMoving(false);
      var _startPositionInfo$cu = startPositionInfo.current, transformX = _startPositionInfo$cu.transformX, transformY = _startPositionInfo$cu.transformY;
      var hasChangedPosition = x !== transformX && y !== transformY;
      if (!hasChangedPosition) return;
      var width = imgRef.current.offsetWidth * scale;
      var height = imgRef.current.offsetHeight * scale;
      var _imgRef$current$getBo = imgRef.current.getBoundingClientRect(), left = _imgRef$current$getBo.left, top = _imgRef$current$getBo.top;
      var isRotate = rotate % 180 !== 0;
      var fixState = getFixScaleEleTransPosition(isRotate ? height : width, isRotate ? width : height, left, top);
      if (fixState) {
        updateTransform(_objectSpread2({}, fixState), "dragRebound");
      }
    }
  };
  var onWheel = function onWheel2(event) {
    if (!visible || event.deltaY == 0) return;
    var scaleRatio = Math.abs(event.deltaY / 100);
    var mergedScaleRatio = Math.min(scaleRatio, WHEEL_MAX_SCALE_RATIO);
    var ratio = BASE_SCALE_RATIO + mergedScaleRatio * scaleStep;
    if (event.deltaY > 0) {
      ratio = BASE_SCALE_RATIO / ratio;
    }
    dispatchZoomChange(ratio, "wheel", event.clientX, event.clientY);
  };
  reactExports.useEffect(function() {
    var onTopMouseUpListener;
    var onTopMouseMoveListener;
    var onMouseUpListener;
    var onMouseMoveListener;
    if (movable) {
      onMouseUpListener = addEventListenerWrap(window, "mouseup", onMouseUp, false);
      onMouseMoveListener = addEventListenerWrap(window, "mousemove", onMouseMove, false);
      try {
        if (window.top !== window.self) {
          onTopMouseUpListener = addEventListenerWrap(window.top, "mouseup", onMouseUp, false);
          onTopMouseMoveListener = addEventListenerWrap(window.top, "mousemove", onMouseMove, false);
        }
      } catch (error) {
      }
    }
    return function() {
      var _onMouseUpListener, _onMouseMoveListener, _onTopMouseUpListener, _onTopMouseMoveListen;
      (_onMouseUpListener = onMouseUpListener) === null || _onMouseUpListener === void 0 || _onMouseUpListener.remove();
      (_onMouseMoveListener = onMouseMoveListener) === null || _onMouseMoveListener === void 0 || _onMouseMoveListener.remove();
      (_onTopMouseUpListener = onTopMouseUpListener) === null || _onTopMouseUpListener === void 0 || _onTopMouseUpListener.remove();
      (_onTopMouseMoveListen = onTopMouseMoveListener) === null || _onTopMouseMoveListen === void 0 || _onTopMouseMoveListen.remove();
    };
  }, [visible, isMoving, x, y, rotate, movable]);
  return {
    isMoving,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onWheel
  };
}
function isImageValid(src) {
  return new Promise(function(resolve) {
    if (!src) {
      resolve(false);
      return;
    }
    var img = document.createElement("img");
    img.onerror = function() {
      return resolve(false);
    };
    img.onload = function() {
      return resolve(true);
    };
    img.src = src;
  });
}
function useStatus(_ref) {
  var src = _ref.src, isCustomPlaceholder = _ref.isCustomPlaceholder, fallback = _ref.fallback;
  var _useState = reactExports.useState(isCustomPlaceholder ? "loading" : "normal"), _useState2 = _slicedToArray(_useState, 2), status = _useState2[0], setStatus = _useState2[1];
  var isLoaded = reactExports.useRef(false);
  var isError = status === "error";
  reactExports.useEffect(function() {
    var isCurrentSrc = true;
    isImageValid(src).then(function(isValid) {
      if (!isValid && isCurrentSrc) {
        setStatus("error");
      }
    });
    return function() {
      isCurrentSrc = false;
    };
  }, [src]);
  reactExports.useEffect(function() {
    if (isCustomPlaceholder && !isLoaded.current) {
      setStatus("loading");
    } else if (isError) {
      setStatus("normal");
    }
  }, [src]);
  var onLoad = function onLoad2() {
    setStatus("normal");
  };
  var getImgRef = function getImgRef2(img) {
    isLoaded.current = false;
    if (status === "loading" && img !== null && img !== void 0 && img.complete && (img.naturalWidth || img.naturalHeight)) {
      isLoaded.current = true;
      onLoad();
    }
  };
  var srcAndOnload = isError && fallback ? {
    src: fallback
  } : {
    onLoad,
    src
  };
  return [getImgRef, srcAndOnload, status];
}
function getDistance(a, b) {
  var x = a.x - b.x;
  var y = a.y - b.y;
  return Math.hypot(x, y);
}
function getCenter(oldPoint1, oldPoint2, newPoint1, newPoint2) {
  var distance1 = getDistance(oldPoint1, newPoint1);
  var distance2 = getDistance(oldPoint2, newPoint2);
  if (distance1 === 0 && distance2 === 0) {
    return [oldPoint1.x, oldPoint1.y];
  }
  var ratio = distance1 / (distance1 + distance2);
  var x = oldPoint1.x + ratio * (oldPoint2.x - oldPoint1.x);
  var y = oldPoint1.y + ratio * (oldPoint2.y - oldPoint1.y);
  return [x, y];
}
function useTouchEvent(imgRef, movable, visible, minScale, transform, updateTransform, dispatchZoomChange) {
  var rotate = transform.rotate, scale = transform.scale, x = transform.x, y = transform.y;
  var _useState = reactExports.useState(false), _useState2 = _slicedToArray(_useState, 2), isTouching = _useState2[0], setIsTouching = _useState2[1];
  var touchPointInfo = reactExports.useRef({
    point1: {
      x: 0,
      y: 0
    },
    point2: {
      x: 0,
      y: 0
    },
    eventType: "none"
  });
  var updateTouchPointInfo = function updateTouchPointInfo2(values) {
    touchPointInfo.current = _objectSpread2(_objectSpread2({}, touchPointInfo.current), values);
  };
  var onTouchStart = function onTouchStart2(event) {
    if (!movable) return;
    event.stopPropagation();
    setIsTouching(true);
    var _event$touches = event.touches, touches = _event$touches === void 0 ? [] : _event$touches;
    if (touches.length > 1) {
      updateTouchPointInfo({
        point1: {
          x: touches[0].clientX,
          y: touches[0].clientY
        },
        point2: {
          x: touches[1].clientX,
          y: touches[1].clientY
        },
        eventType: "touchZoom"
      });
    } else {
      updateTouchPointInfo({
        point1: {
          x: touches[0].clientX - x,
          y: touches[0].clientY - y
        },
        eventType: "move"
      });
    }
  };
  var onTouchMove = function onTouchMove2(event) {
    var _event$touches2 = event.touches, touches = _event$touches2 === void 0 ? [] : _event$touches2;
    var _touchPointInfo$curre = touchPointInfo.current, point1 = _touchPointInfo$curre.point1, point2 = _touchPointInfo$curre.point2, eventType = _touchPointInfo$curre.eventType;
    if (touches.length > 1 && eventType === "touchZoom") {
      var newPoint1 = {
        x: touches[0].clientX,
        y: touches[0].clientY
      };
      var newPoint2 = {
        x: touches[1].clientX,
        y: touches[1].clientY
      };
      var _getCenter = getCenter(point1, point2, newPoint1, newPoint2), _getCenter2 = _slicedToArray(_getCenter, 2), centerX = _getCenter2[0], centerY = _getCenter2[1];
      var ratio = getDistance(newPoint1, newPoint2) / getDistance(point1, point2);
      dispatchZoomChange(ratio, "touchZoom", centerX, centerY, true);
      updateTouchPointInfo({
        point1: newPoint1,
        point2: newPoint2,
        eventType: "touchZoom"
      });
    } else if (eventType === "move") {
      updateTransform({
        x: touches[0].clientX - point1.x,
        y: touches[0].clientY - point1.y
      }, "move");
      updateTouchPointInfo({
        eventType: "move"
      });
    }
  };
  var onTouchEnd = function onTouchEnd2() {
    if (!visible) return;
    if (isTouching) {
      setIsTouching(false);
    }
    updateTouchPointInfo({
      eventType: "none"
    });
    if (minScale > scale) {
      return updateTransform({
        x: 0,
        y: 0,
        scale: minScale
      }, "touchZoom");
    }
    var width = imgRef.current.offsetWidth * scale;
    var height = imgRef.current.offsetHeight * scale;
    var _imgRef$current$getBo = imgRef.current.getBoundingClientRect(), left = _imgRef$current$getBo.left, top = _imgRef$current$getBo.top;
    var isRotate = rotate % 180 !== 0;
    var fixState = getFixScaleEleTransPosition(isRotate ? height : width, isRotate ? width : height, left, top);
    if (fixState) {
      updateTransform(_objectSpread2({}, fixState), "dragRebound");
    }
  };
  reactExports.useEffect(function() {
    var onTouchMoveListener;
    if (visible && movable) {
      onTouchMoveListener = addEventListenerWrap(window, "touchmove", function(e2) {
        return e2.preventDefault();
      }, {
        passive: false
      });
    }
    return function() {
      var _onTouchMoveListener;
      (_onTouchMoveListener = onTouchMoveListener) === null || _onTouchMoveListener === void 0 || _onTouchMoveListener.remove();
    };
  }, [visible, movable]);
  return {
    isTouching,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
}
var _excluded$b = ["fallback", "src", "imgRef"], _excluded2$3 = ["prefixCls", "src", "alt", "imageInfo", "fallback", "movable", "onClose", "visible", "icons", "rootClassName", "closeIcon", "getContainer", "current", "count", "countRender", "scaleStep", "minScale", "maxScale", "transitionName", "maskTransitionName", "imageRender", "imgCommonProps", "toolbarRender", "onTransform", "onChange"];
var PreviewImage = function PreviewImage2(_ref) {
  var fallback = _ref.fallback, src = _ref.src, imgRef = _ref.imgRef, props = _objectWithoutProperties(_ref, _excluded$b);
  var _useStatus = useStatus({
    src,
    fallback
  }), _useStatus2 = _slicedToArray(_useStatus, 2), getImgRef = _useStatus2[0], srcAndOnload = _useStatus2[1];
  return /* @__PURE__ */ React.createElement("img", _extends({
    ref: function ref(_ref2) {
      imgRef.current = _ref2;
      getImgRef(_ref2);
    }
  }, props, srcAndOnload));
};
var Preview = function Preview2(props) {
  var prefixCls = props.prefixCls, src = props.src, alt = props.alt, imageInfo = props.imageInfo, fallback = props.fallback, _props$movable = props.movable, movable = _props$movable === void 0 ? true : _props$movable, onClose = props.onClose, visible = props.visible, _props$icons = props.icons, icons2 = _props$icons === void 0 ? {} : _props$icons, rootClassName = props.rootClassName, closeIcon = props.closeIcon, getContainer = props.getContainer, _props$current = props.current, current = _props$current === void 0 ? 0 : _props$current, _props$count = props.count, count = _props$count === void 0 ? 1 : _props$count, countRender = props.countRender, _props$scaleStep = props.scaleStep, scaleStep = _props$scaleStep === void 0 ? 0.5 : _props$scaleStep, _props$minScale = props.minScale, minScale = _props$minScale === void 0 ? 1 : _props$minScale, _props$maxScale = props.maxScale, maxScale = _props$maxScale === void 0 ? 50 : _props$maxScale, _props$transitionName = props.transitionName, transitionName = _props$transitionName === void 0 ? "zoom" : _props$transitionName, _props$maskTransition = props.maskTransitionName, maskTransitionName = _props$maskTransition === void 0 ? "fade" : _props$maskTransition, imageRender = props.imageRender, imgCommonProps = props.imgCommonProps, toolbarRender = props.toolbarRender, onTransform = props.onTransform, onChange = props.onChange, restProps = _objectWithoutProperties(props, _excluded2$3);
  var imgRef = reactExports.useRef();
  var groupContext = reactExports.useContext(PreviewGroupContext);
  var showLeftOrRightSwitches = groupContext && count > 1;
  var showOperationsProgress = groupContext && count >= 1;
  var _useState = reactExports.useState(true), _useState2 = _slicedToArray(_useState, 2), enableTransition = _useState2[0], setEnableTransition = _useState2[1];
  var _useImageTransform = useImageTransform(imgRef, minScale, maxScale, onTransform), transform = _useImageTransform.transform, resetTransform = _useImageTransform.resetTransform, updateTransform = _useImageTransform.updateTransform, dispatchZoomChange = _useImageTransform.dispatchZoomChange;
  var _useMouseEvent = useMouseEvent(imgRef, movable, visible, scaleStep, transform, updateTransform, dispatchZoomChange), isMoving = _useMouseEvent.isMoving, onMouseDown = _useMouseEvent.onMouseDown, onWheel = _useMouseEvent.onWheel;
  var _useTouchEvent = useTouchEvent(imgRef, movable, visible, minScale, transform, updateTransform, dispatchZoomChange), isTouching = _useTouchEvent.isTouching, onTouchStart = _useTouchEvent.onTouchStart, onTouchMove = _useTouchEvent.onTouchMove, onTouchEnd = _useTouchEvent.onTouchEnd;
  var rotate = transform.rotate, scale = transform.scale;
  var wrapClassName = classNames(_defineProperty({}, "".concat(prefixCls, "-moving"), isMoving));
  reactExports.useEffect(function() {
    if (!enableTransition) {
      setEnableTransition(true);
    }
  }, [enableTransition]);
  var onAfterClose = function onAfterClose2() {
    resetTransform("close");
  };
  var onZoomIn = function onZoomIn2() {
    dispatchZoomChange(BASE_SCALE_RATIO + scaleStep, "zoomIn");
  };
  var onZoomOut = function onZoomOut2() {
    dispatchZoomChange(BASE_SCALE_RATIO / (BASE_SCALE_RATIO + scaleStep), "zoomOut");
  };
  var onRotateRight = function onRotateRight2() {
    updateTransform({
      rotate: rotate + 90
    }, "rotateRight");
  };
  var onRotateLeft = function onRotateLeft2() {
    updateTransform({
      rotate: rotate - 90
    }, "rotateLeft");
  };
  var onFlipX = function onFlipX2() {
    updateTransform({
      flipX: !transform.flipX
    }, "flipX");
  };
  var onFlipY = function onFlipY2() {
    updateTransform({
      flipY: !transform.flipY
    }, "flipY");
  };
  var onReset = function onReset2() {
    resetTransform("reset");
  };
  var onActive = function onActive2(offset) {
    var position = current + offset;
    if (!Number.isInteger(position) || position < 0 || position > count - 1) {
      return;
    }
    setEnableTransition(false);
    resetTransform(offset < 0 ? "prev" : "next");
    onChange === null || onChange === void 0 || onChange(position, current);
  };
  var onKeyDown = function onKeyDown2(event) {
    if (!visible || !showLeftOrRightSwitches) return;
    if (event.keyCode === KeyCode.LEFT) {
      onActive(-1);
    } else if (event.keyCode === KeyCode.RIGHT) {
      onActive(1);
    }
  };
  var onDoubleClick = function onDoubleClick2(event) {
    if (visible) {
      if (scale !== 1) {
        updateTransform({
          x: 0,
          y: 0,
          scale: 1
        }, "doubleClick");
      } else {
        dispatchZoomChange(BASE_SCALE_RATIO + scaleStep, "doubleClick", event.clientX, event.clientY);
      }
    }
  };
  reactExports.useEffect(function() {
    var onKeyDownListener = addEventListenerWrap(window, "keydown", onKeyDown, false);
    return function() {
      onKeyDownListener.remove();
    };
  }, [visible, showLeftOrRightSwitches, current]);
  var imgNode = /* @__PURE__ */ React.createElement(PreviewImage, _extends({}, imgCommonProps, {
    width: props.width,
    height: props.height,
    imgRef,
    className: "".concat(prefixCls, "-img"),
    alt,
    style: {
      transform: "translate3d(".concat(transform.x, "px, ").concat(transform.y, "px, 0) scale3d(").concat(transform.flipX ? "-" : "").concat(scale, ", ").concat(transform.flipY ? "-" : "").concat(scale, ", 1) rotate(").concat(rotate, "deg)"),
      transitionDuration: (!enableTransition || isTouching) && "0s"
    },
    fallback,
    src,
    onWheel,
    onMouseDown,
    onDoubleClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel: onTouchEnd
  }));
  var image = _objectSpread2({
    url: src,
    alt
  }, imageInfo);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DialogWrap, _extends({
    transitionName,
    maskTransitionName,
    closable: false,
    keyboard: true,
    prefixCls,
    onClose,
    visible,
    classNames: {
      wrapper: wrapClassName
    },
    rootClassName,
    getContainer
  }, restProps, {
    afterClose: onAfterClose
  }), /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-img-wrapper")
  }, imageRender ? imageRender(imgNode, _objectSpread2({
    transform,
    image
  }, groupContext ? {
    current
  } : {})) : imgNode)), /* @__PURE__ */ React.createElement(Operations, {
    visible,
    transform,
    maskTransitionName,
    closeIcon,
    getContainer,
    prefixCls,
    rootClassName,
    icons: icons2,
    countRender,
    showSwitch: showLeftOrRightSwitches,
    showProgress: showOperationsProgress,
    current,
    count,
    scale,
    minScale,
    maxScale,
    toolbarRender,
    onActive,
    onZoomIn,
    onZoomOut,
    onRotateRight,
    onRotateLeft,
    onFlipX,
    onFlipY,
    onClose,
    onReset,
    zIndex: restProps.zIndex !== void 0 ? restProps.zIndex + 1 : void 0,
    image
  }));
};
var COMMON_PROPS = ["crossOrigin", "decoding", "draggable", "loading", "referrerPolicy", "sizes", "srcSet", "useMap", "alt"];
function usePreviewItems(items) {
  var _React$useState = reactExports.useState({}), _React$useState2 = _slicedToArray(_React$useState, 2), images = _React$useState2[0], setImages = _React$useState2[1];
  var registerImage = reactExports.useCallback(function(id, data) {
    setImages(function(imgs) {
      return _objectSpread2(_objectSpread2({}, imgs), {}, _defineProperty({}, id, data));
    });
    return function() {
      setImages(function(imgs) {
        var cloneImgs = _objectSpread2({}, imgs);
        delete cloneImgs[id];
        return cloneImgs;
      });
    };
  }, []);
  var mergedItems = reactExports.useMemo(function() {
    if (items) {
      return items.map(function(item) {
        if (typeof item === "string") {
          return {
            data: {
              src: item
            }
          };
        }
        var data = {};
        Object.keys(item).forEach(function(key) {
          if (["src"].concat(_toConsumableArray(COMMON_PROPS)).includes(key)) {
            data[key] = item[key];
          }
        });
        return {
          data
        };
      });
    }
    return Object.keys(images).reduce(function(total, id) {
      var _images$id = images[id], canPreview = _images$id.canPreview, data = _images$id.data;
      if (canPreview) {
        total.push({
          data,
          id
        });
      }
      return total;
    }, []);
  }, [items, images]);
  return [mergedItems, registerImage, !!items];
}
var _excluded$a = ["visible", "onVisibleChange", "getContainer", "current", "movable", "minScale", "maxScale", "countRender", "closeIcon", "onChange", "onTransform", "toolbarRender", "imageRender"], _excluded2$2 = ["src"];
var Group = function Group2(_ref) {
  var _mergedItems$current;
  var _ref$previewPrefixCls = _ref.previewPrefixCls, previewPrefixCls = _ref$previewPrefixCls === void 0 ? "rc-image-preview" : _ref$previewPrefixCls, children = _ref.children, _ref$icons = _ref.icons, icons2 = _ref$icons === void 0 ? {} : _ref$icons, items = _ref.items, preview = _ref.preview, fallback = _ref.fallback;
  var _ref2 = _typeof(preview) === "object" ? preview : {}, previewVisible = _ref2.visible, onVisibleChange = _ref2.onVisibleChange, getContainer = _ref2.getContainer, currentIndex = _ref2.current, movable = _ref2.movable, minScale = _ref2.minScale, maxScale = _ref2.maxScale, countRender = _ref2.countRender, closeIcon = _ref2.closeIcon, onChange = _ref2.onChange, onTransform = _ref2.onTransform, toolbarRender = _ref2.toolbarRender, imageRender = _ref2.imageRender, dialogProps = _objectWithoutProperties(_ref2, _excluded$a);
  var _usePreviewItems = usePreviewItems(items), _usePreviewItems2 = _slicedToArray(_usePreviewItems, 3), mergedItems = _usePreviewItems2[0], register = _usePreviewItems2[1], fromItems = _usePreviewItems2[2];
  var _useMergedState = useMergedState(0, {
    value: currentIndex
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), current = _useMergedState2[0], setCurrent = _useMergedState2[1];
  var _useState = reactExports.useState(false), _useState2 = _slicedToArray(_useState, 2), keepOpenIndex = _useState2[0], setKeepOpenIndex = _useState2[1];
  var _ref3 = ((_mergedItems$current = mergedItems[current]) === null || _mergedItems$current === void 0 ? void 0 : _mergedItems$current.data) || {}, src = _ref3.src, imgCommonProps = _objectWithoutProperties(_ref3, _excluded2$2);
  var _useMergedState3 = useMergedState(!!previewVisible, {
    value: previewVisible,
    onChange: function onChange2(val, prevVal) {
      onVisibleChange === null || onVisibleChange === void 0 || onVisibleChange(val, prevVal, current);
    }
  }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), isShowPreview = _useMergedState4[0], setShowPreview = _useMergedState4[1];
  var _useState3 = reactExports.useState(null), _useState4 = _slicedToArray(_useState3, 2), mousePosition = _useState4[0], setMousePosition = _useState4[1];
  var onPreviewFromImage = reactExports.useCallback(function(id, imageSrc, mouseX, mouseY) {
    var index2 = fromItems ? mergedItems.findIndex(function(item) {
      return item.data.src === imageSrc;
    }) : mergedItems.findIndex(function(item) {
      return item.id === id;
    });
    setCurrent(index2 < 0 ? 0 : index2);
    setShowPreview(true);
    setMousePosition({
      x: mouseX,
      y: mouseY
    });
    setKeepOpenIndex(true);
  }, [mergedItems, fromItems]);
  reactExports.useEffect(function() {
    if (isShowPreview) {
      if (!keepOpenIndex) {
        setCurrent(0);
      }
    } else {
      setKeepOpenIndex(false);
    }
  }, [isShowPreview]);
  var onInternalChange = function onInternalChange2(next, prev) {
    setCurrent(next);
    onChange === null || onChange === void 0 || onChange(next, prev);
  };
  var onPreviewClose = function onPreviewClose2() {
    setShowPreview(false);
    setMousePosition(null);
  };
  var previewGroupContext = reactExports.useMemo(function() {
    return {
      register,
      onPreview: onPreviewFromImage
    };
  }, [register, onPreviewFromImage]);
  return /* @__PURE__ */ reactExports.createElement(PreviewGroupContext.Provider, {
    value: previewGroupContext
  }, children, /* @__PURE__ */ reactExports.createElement(Preview, _extends({
    "aria-hidden": !isShowPreview,
    movable,
    visible: isShowPreview,
    prefixCls: previewPrefixCls,
    closeIcon,
    onClose: onPreviewClose,
    mousePosition,
    imgCommonProps,
    src,
    fallback,
    icons: icons2,
    minScale,
    maxScale,
    getContainer,
    current,
    count: mergedItems.length,
    countRender,
    onTransform,
    toolbarRender,
    imageRender,
    onChange: onInternalChange
  }, dialogProps)));
};
var uid = 0;
function useRegisterImage(canPreview, data) {
  var _React$useState = reactExports.useState(function() {
    uid += 1;
    return String(uid);
  }), _React$useState2 = _slicedToArray(_React$useState, 1), id = _React$useState2[0];
  var groupContext = reactExports.useContext(PreviewGroupContext);
  var registerData = {
    data,
    canPreview
  };
  reactExports.useEffect(function() {
    if (groupContext) {
      return groupContext.register(id, registerData);
    }
  }, []);
  reactExports.useEffect(function() {
    if (groupContext) {
      groupContext.register(id, registerData);
    }
  }, [canPreview, data]);
  return id;
}
var _excluded$9 = ["src", "alt", "onPreviewClose", "prefixCls", "previewPrefixCls", "placeholder", "fallback", "width", "height", "style", "preview", "className", "onClick", "onError", "wrapperClassName", "wrapperStyle", "rootClassName"], _excluded2$1 = ["src", "visible", "onVisibleChange", "getContainer", "mask", "maskClassName", "movable", "icons", "scaleStep", "minScale", "maxScale", "imageRender", "toolbarRender"];
var ImageInternal = function ImageInternal2(props) {
  var imgSrc = props.src, alt = props.alt, onInitialPreviewClose = props.onPreviewClose, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-image" : _props$prefixCls, _props$previewPrefixC = props.previewPrefixCls, previewPrefixCls = _props$previewPrefixC === void 0 ? "".concat(prefixCls, "-preview") : _props$previewPrefixC, placeholder = props.placeholder, fallback = props.fallback, width = props.width, height = props.height, style = props.style, _props$preview = props.preview, preview = _props$preview === void 0 ? true : _props$preview, className = props.className, onClick = props.onClick, onError = props.onError, wrapperClassName = props.wrapperClassName, wrapperStyle = props.wrapperStyle, rootClassName = props.rootClassName, otherProps = _objectWithoutProperties(props, _excluded$9);
  var isCustomPlaceholder = placeholder && placeholder !== true;
  var _ref = _typeof(preview) === "object" ? preview : {}, previewSrc = _ref.src, _ref$visible = _ref.visible, previewVisible = _ref$visible === void 0 ? void 0 : _ref$visible, _ref$onVisibleChange = _ref.onVisibleChange, onPreviewVisibleChange = _ref$onVisibleChange === void 0 ? onInitialPreviewClose : _ref$onVisibleChange, _ref$getContainer = _ref.getContainer, getPreviewContainer = _ref$getContainer === void 0 ? void 0 : _ref$getContainer, previewMask = _ref.mask, maskClassName = _ref.maskClassName, movable = _ref.movable, icons2 = _ref.icons, scaleStep = _ref.scaleStep, minScale = _ref.minScale, maxScale = _ref.maxScale, imageRender = _ref.imageRender, toolbarRender = _ref.toolbarRender, dialogProps = _objectWithoutProperties(_ref, _excluded2$1);
  var src = previewSrc !== null && previewSrc !== void 0 ? previewSrc : imgSrc;
  var _useMergedState = useMergedState(!!previewVisible, {
    value: previewVisible,
    onChange: onPreviewVisibleChange
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), isShowPreview = _useMergedState2[0], setShowPreview = _useMergedState2[1];
  var _useStatus = useStatus({
    src: imgSrc,
    isCustomPlaceholder,
    fallback
  }), _useStatus2 = _slicedToArray(_useStatus, 3), getImgRef = _useStatus2[0], srcAndOnload = _useStatus2[1], status = _useStatus2[2];
  var _useState = reactExports.useState(null), _useState2 = _slicedToArray(_useState, 2), mousePosition = _useState2[0], setMousePosition = _useState2[1];
  var groupContext = reactExports.useContext(PreviewGroupContext);
  var canPreview = !!preview;
  var onPreviewClose = function onPreviewClose2() {
    setShowPreview(false);
    setMousePosition(null);
  };
  var wrapperClass = classNames(prefixCls, wrapperClassName, rootClassName, _defineProperty({}, "".concat(prefixCls, "-error"), status === "error"));
  var imgCommonProps = reactExports.useMemo(function() {
    var obj = {};
    COMMON_PROPS.forEach(function(prop) {
      if (props[prop] !== void 0) {
        obj[prop] = props[prop];
      }
    });
    return obj;
  }, COMMON_PROPS.map(function(prop) {
    return props[prop];
  }));
  var registerData = reactExports.useMemo(function() {
    return _objectSpread2(_objectSpread2({}, imgCommonProps), {}, {
      src
    });
  }, [src, imgCommonProps]);
  var imageId = useRegisterImage(canPreview, registerData);
  var onPreview = function onPreview2(e2) {
    var _getOffset = getOffset(e2.target), left = _getOffset.left, top = _getOffset.top;
    if (groupContext) {
      groupContext.onPreview(imageId, src, left, top);
    } else {
      setMousePosition({
        x: left,
        y: top
      });
      setShowPreview(true);
    }
    onClick === null || onClick === void 0 || onClick(e2);
  };
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("div", _extends({}, otherProps, {
    className: wrapperClass,
    onClick: canPreview ? onPreview : onClick,
    style: _objectSpread2({
      width,
      height
    }, wrapperStyle)
  }), /* @__PURE__ */ reactExports.createElement("img", _extends({}, imgCommonProps, {
    className: classNames("".concat(prefixCls, "-img"), _defineProperty({}, "".concat(prefixCls, "-img-placeholder"), placeholder === true), className),
    style: _objectSpread2({
      height
    }, style),
    ref: getImgRef
  }, srcAndOnload, {
    width,
    height,
    onError
  })), status === "loading" && /* @__PURE__ */ reactExports.createElement("div", {
    "aria-hidden": "true",
    className: "".concat(prefixCls, "-placeholder")
  }, placeholder), previewMask && canPreview && /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames("".concat(prefixCls, "-mask"), maskClassName),
    style: {
      display: (style === null || style === void 0 ? void 0 : style.display) === "none" ? "none" : void 0
    }
  }, previewMask)), !groupContext && canPreview && /* @__PURE__ */ reactExports.createElement(Preview, _extends({
    "aria-hidden": !isShowPreview,
    visible: isShowPreview,
    prefixCls: previewPrefixCls,
    onClose: onPreviewClose,
    mousePosition,
    src,
    alt,
    imageInfo: {
      width,
      height
    },
    fallback,
    getContainer: getPreviewContainer,
    icons: icons2,
    movable,
    scaleStep,
    minScale,
    maxScale,
    rootClassName,
    imageRender,
    imgCommonProps,
    toolbarRender
  }, dialogProps)));
};
ImageInternal.PreviewGroup = Group;
var RotateLeftOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "defs", "attrs": {}, "children": [{ "tag": "style", "attrs": {} }] }, { "tag": "path", "attrs": { "d": "M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z" } }, { "tag": "path", "attrs": { "d": "M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z" } }] }, "name": "rotate-left", "theme": "outlined" };
var RotateLeftOutlined = function RotateLeftOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: RotateLeftOutlined$1
  }));
};
var RefIcon$a = /* @__PURE__ */ reactExports.forwardRef(RotateLeftOutlined);
var RotateRightOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "defs", "attrs": {}, "children": [{ "tag": "style", "attrs": {} }] }, { "tag": "path", "attrs": { "d": "M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z" } }, { "tag": "path", "attrs": { "d": "M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z" } }] }, "name": "rotate-right", "theme": "outlined" };
var RotateRightOutlined = function RotateRightOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: RotateRightOutlined$1
  }));
};
var RefIcon$9 = /* @__PURE__ */ reactExports.forwardRef(RotateRightOutlined);
var SwapOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" } }] }, "name": "swap", "theme": "outlined" };
var SwapOutlined = function SwapOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: SwapOutlined$1
  }));
};
var RefIcon$8 = /* @__PURE__ */ reactExports.forwardRef(SwapOutlined);
var ZoomInOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" } }] }, "name": "zoom-in", "theme": "outlined" };
var ZoomInOutlined = function ZoomInOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: ZoomInOutlined$1
  }));
};
var RefIcon$7 = /* @__PURE__ */ reactExports.forwardRef(ZoomInOutlined);
var ZoomOutOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" } }] }, "name": "zoom-out", "theme": "outlined" };
var ZoomOutOutlined = function ZoomOutOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: ZoomOutOutlined$1
  }));
};
var RefIcon$6 = /* @__PURE__ */ reactExports.forwardRef(ZoomOutOutlined);
const genBoxStyle = (position) => ({
  position: position || "absolute",
  inset: 0
});
const genImageMaskStyle = (token) => {
  const {
    iconCls,
    motionDurationSlow,
    paddingXXS,
    marginXXS,
    prefixCls,
    colorTextLightSolid
  } = token;
  return {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colorTextLightSolid,
    background: new FastColor("#000").setA(0.5).toRgbString(),
    cursor: "pointer",
    opacity: 0,
    transition: `opacity ${motionDurationSlow}`,
    [`.${prefixCls}-mask-info`]: Object.assign(Object.assign({}, textEllipsis), {
      padding: `0 ${unit(paddingXXS)}`,
      [iconCls]: {
        marginInlineEnd: marginXXS,
        svg: {
          verticalAlign: "baseline"
        }
      }
    })
  };
};
const genPreviewOperationsStyle = (token) => {
  const {
    previewCls,
    modalMaskBg,
    paddingSM,
    marginXL,
    margin,
    paddingLG,
    previewOperationColorDisabled,
    previewOperationHoverColor,
    motionDurationSlow,
    iconCls,
    colorTextLightSolid
  } = token;
  const operationBg = new FastColor(modalMaskBg).setA(0.1);
  const operationBgHover = operationBg.clone().setA(0.2);
  return {
    [`${previewCls}-footer`]: {
      position: "fixed",
      bottom: marginXL,
      left: {
        _skip_check_: true,
        value: "50%"
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: token.previewOperationColor,
      transform: "translateX(-50%)"
    },
    [`${previewCls}-progress`]: {
      marginBottom: margin
    },
    [`${previewCls}-close`]: {
      position: "fixed",
      top: marginXL,
      right: {
        _skip_check_: true,
        value: marginXL
      },
      display: "flex",
      color: colorTextLightSolid,
      backgroundColor: operationBg.toRgbString(),
      borderRadius: "50%",
      padding: paddingSM,
      outline: 0,
      border: 0,
      cursor: "pointer",
      transition: `all ${motionDurationSlow}`,
      "&:hover": {
        backgroundColor: operationBgHover.toRgbString()
      },
      [`& > ${iconCls}`]: {
        fontSize: token.previewOperationSize
      }
    },
    [`${previewCls}-operations`]: {
      display: "flex",
      alignItems: "center",
      padding: `0 ${unit(paddingLG)}`,
      backgroundColor: operationBg.toRgbString(),
      borderRadius: 100,
      "&-operation": {
        marginInlineStart: paddingSM,
        padding: paddingSM,
        cursor: "pointer",
        transition: `all ${motionDurationSlow}`,
        userSelect: "none",
        [`&:not(${previewCls}-operations-operation-disabled):hover > ${iconCls}`]: {
          color: previewOperationHoverColor
        },
        "&-disabled": {
          color: previewOperationColorDisabled,
          cursor: "not-allowed"
        },
        "&:first-of-type": {
          marginInlineStart: 0
        },
        [`& > ${iconCls}`]: {
          fontSize: token.previewOperationSize
        }
      }
    }
  };
};
const genPreviewSwitchStyle = (token) => {
  const {
    modalMaskBg,
    iconCls,
    previewOperationColorDisabled,
    previewCls,
    zIndexPopup,
    motionDurationSlow
  } = token;
  const operationBg = new FastColor(modalMaskBg).setA(0.1);
  const operationBgHover = operationBg.clone().setA(0.2);
  return {
    [`${previewCls}-switch-left, ${previewCls}-switch-right`]: {
      position: "fixed",
      insetBlockStart: "50%",
      zIndex: token.calc(zIndexPopup).add(1).equal(),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: token.imagePreviewSwitchSize,
      height: token.imagePreviewSwitchSize,
      marginTop: token.calc(token.imagePreviewSwitchSize).mul(-1).div(2).equal(),
      color: token.previewOperationColor,
      background: operationBg.toRgbString(),
      borderRadius: "50%",
      transform: `translateY(-50%)`,
      cursor: "pointer",
      transition: `all ${motionDurationSlow}`,
      userSelect: "none",
      "&:hover": {
        background: operationBgHover.toRgbString()
      },
      "&-disabled": {
        "&, &:hover": {
          color: previewOperationColorDisabled,
          background: "transparent",
          cursor: "not-allowed",
          [`> ${iconCls}`]: {
            cursor: "not-allowed"
          }
        }
      },
      [`> ${iconCls}`]: {
        fontSize: token.previewOperationSize
      }
    },
    [`${previewCls}-switch-left`]: {
      insetInlineStart: token.marginSM
    },
    [`${previewCls}-switch-right`]: {
      insetInlineEnd: token.marginSM
    }
  };
};
const genImagePreviewStyle = (token) => {
  const {
    motionEaseOut,
    previewCls,
    motionDurationSlow,
    componentCls
  } = token;
  return [
    {
      [`${componentCls}-preview-root`]: {
        [previewCls]: {
          height: "100%",
          textAlign: "center",
          pointerEvents: "none"
        },
        [`${previewCls}-body`]: Object.assign(Object.assign({}, genBoxStyle()), {
          overflow: "hidden"
        }),
        [`${previewCls}-img`]: {
          maxWidth: "100%",
          maxHeight: "70%",
          verticalAlign: "middle",
          transform: "scale3d(1, 1, 1)",
          cursor: "grab",
          transition: `transform ${motionDurationSlow} ${motionEaseOut} 0s`,
          userSelect: "none",
          "&-wrapper": Object.assign(Object.assign({}, genBoxStyle()), {
            transition: `transform ${motionDurationSlow} ${motionEaseOut} 0s`,
            // https://github.com/ant-design/ant-design/issues/39913
            // TailwindCSS will reset img default style.
            // Let's set back.
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& > *": {
              pointerEvents: "auto"
            },
            "&::before": {
              display: "inline-block",
              width: 1,
              height: "50%",
              marginInlineEnd: -1,
              content: '""'
            }
          })
        },
        [`${previewCls}-moving`]: {
          [`${previewCls}-preview-img`]: {
            cursor: "grabbing",
            "&-wrapper": {
              transitionDuration: "0s"
            }
          }
        }
      }
    },
    // Override
    {
      [`${componentCls}-preview-root`]: {
        [`${previewCls}-wrap`]: {
          zIndex: token.zIndexPopup
        }
      }
    },
    // Preview operations & switch
    {
      [`${componentCls}-preview-operations-wrapper`]: {
        position: "fixed",
        zIndex: token.calc(token.zIndexPopup).add(1).equal()
      },
      "&": [genPreviewOperationsStyle(token), genPreviewSwitchStyle(token)]
    }
  ];
};
const genImageStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    // ============================== image ==============================
    [componentCls]: {
      position: "relative",
      display: "inline-block",
      [`${componentCls}-img`]: {
        width: "100%",
        height: "auto",
        verticalAlign: "middle"
      },
      [`${componentCls}-img-placeholder`]: {
        backgroundColor: token.colorBgContainerDisabled,
        backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTQuNSAyLjVoLTEzQS41LjUgMCAwIDAgMSAzdjEwYS41LjUgMCAwIDAgLjUuNWgxM2EuNS41IDAgMCAwIC41LS41VjNhLjUuNSAwIDAgMC0uNS0uNXpNNS4yODEgNC43NWExIDEgMCAwIDEgMCAyIDEgMSAwIDAgMSAwLTJ6bTguMDMgNi44M2EuMTI3LjEyNyAwIDAgMS0uMDgxLjAzSDIuNzY5YS4xMjUuMTI1IDAgMCAxLS4wOTYtLjIwN2wyLjY2MS0zLjE1NmEuMTI2LjEyNiAwIDAgMSAuMTc3LS4wMTZsLjAxNi4wMTZMNy4wOCAxMC4wOWwyLjQ3LTIuOTNhLjEyNi4xMjYgMCAwIDEgLjE3Ny0uMDE2bC4wMTUuMDE2IDMuNTg4IDQuMjQ0YS4xMjcuMTI3IDAgMCAxLS4wMi4xNzV6IiBmaWxsPSIjOEM4QzhDIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "30%"
      },
      [`${componentCls}-mask`]: Object.assign({}, genImageMaskStyle(token)),
      [`${componentCls}-mask:hover`]: {
        opacity: 1
      },
      [`${componentCls}-placeholder`]: Object.assign({}, genBoxStyle())
    }
  };
};
const genPreviewMotion = (token) => {
  const {
    previewCls
  } = token;
  return {
    [`${previewCls}-root`]: initZoomMotion(token, "zoom"),
    "&": initFadeMotion(token, true)
  };
};
const prepareComponentToken$b = (token) => ({
  zIndexPopup: token.zIndexPopupBase + 80,
  previewOperationColor: new FastColor(token.colorTextLightSolid).setA(0.65).toRgbString(),
  previewOperationHoverColor: new FastColor(token.colorTextLightSolid).setA(0.85).toRgbString(),
  previewOperationColorDisabled: new FastColor(token.colorTextLightSolid).setA(0.25).toRgbString(),
  previewOperationSize: token.fontSizeIcon * 1.5
  // FIXME: fontSizeIconLG
});
const useStyle$b = genStyleHooks("Image", (token) => {
  const previewCls = `${token.componentCls}-preview`;
  const imageToken = merge(token, {
    previewCls,
    modalMaskBg: new FastColor("#000").setA(0.45).toRgbString(),
    // FIXME: Shared Token
    imagePreviewSwitchSize: token.controlHeightLG
  });
  return [genImageStyle(imageToken), genImagePreviewStyle(imageToken), genModalMaskStyle(merge(imageToken, {
    componentCls: previewCls
  })), genPreviewMotion(imageToken)];
}, prepareComponentToken$b);
var __rest$l = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const icons = {
  rotateLeft: /* @__PURE__ */ reactExports.createElement(RefIcon$a, null),
  rotateRight: /* @__PURE__ */ reactExports.createElement(RefIcon$9, null),
  zoomIn: /* @__PURE__ */ reactExports.createElement(RefIcon$7, null),
  zoomOut: /* @__PURE__ */ reactExports.createElement(RefIcon$6, null),
  close: /* @__PURE__ */ reactExports.createElement(RefIcon$h, null),
  left: /* @__PURE__ */ reactExports.createElement(RefIcon$f, null),
  right: /* @__PURE__ */ reactExports.createElement(RefIcon$g, null),
  flipX: /* @__PURE__ */ reactExports.createElement(RefIcon$8, null),
  flipY: /* @__PURE__ */ reactExports.createElement(RefIcon$8, {
    rotate: 90
  })
};
const InternalPreviewGroup = (_a) => {
  var {
    previewPrefixCls: customizePrefixCls,
    preview
  } = _a, otherProps = __rest$l(_a, ["previewPrefixCls", "preview"]);
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("image", customizePrefixCls);
  const previewPrefixCls = `${prefixCls}-preview`;
  const rootPrefixCls = getPrefixCls();
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$b(prefixCls, rootCls);
  const [zIndex] = useZIndex("ImagePreview", typeof preview === "object" ? preview.zIndex : void 0);
  const memoizedIcons = reactExports.useMemo(() => Object.assign(Object.assign({}, icons), {
    left: direction === "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$g, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$f, null),
    right: direction === "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$f, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$g, null)
  }), [direction]);
  const mergedPreview = reactExports.useMemo(() => {
    var _a2;
    if (preview === false) {
      return preview;
    }
    const _preview = typeof preview === "object" ? preview : {};
    const mergedRootClassName = classNames(hashId, cssVarCls, rootCls, (_a2 = _preview.rootClassName) !== null && _a2 !== void 0 ? _a2 : "");
    return Object.assign(Object.assign({}, _preview), {
      transitionName: getTransitionName(rootPrefixCls, "zoom", _preview.transitionName),
      maskTransitionName: getTransitionName(rootPrefixCls, "fade", _preview.maskTransitionName),
      rootClassName: mergedRootClassName,
      zIndex
    });
  }, [preview, rootPrefixCls, zIndex, hashId, cssVarCls, rootCls]);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(ImageInternal.PreviewGroup, Object.assign({
    preview: mergedPreview,
    previewPrefixCls,
    icons: memoizedIcons
  }, otherProps)));
};
var __rest$k = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Image$1 = (props) => {
  const {
    prefixCls: customizePrefixCls,
    preview,
    className,
    rootClassName,
    style,
    fallback
  } = props, otherProps = __rest$k(props, ["prefixCls", "preview", "className", "rootClassName", "style", "fallback"]);
  const {
    getPrefixCls,
    getPopupContainer: getContextPopupContainer,
    className: contextClassName,
    style: contextStyle,
    preview: contextPreview,
    fallback: contextFallback
  } = useComponentConfig("image");
  const [imageLocale] = useLocale("Image");
  const prefixCls = getPrefixCls("image", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$b(prefixCls, rootCls);
  const mergedRootClassName = classNames(rootClassName, hashId, cssVarCls, rootCls);
  const mergedClassName = classNames(className, hashId, contextClassName);
  const [zIndex] = useZIndex("ImagePreview", typeof preview === "object" ? preview.zIndex : void 0);
  const mergedPreview = reactExports.useMemo(() => {
    if (preview === false) {
      return preview;
    }
    const _preview = typeof preview === "object" ? preview : {};
    const {
      getContainer,
      closeIcon,
      rootClassName: rootClassName2,
      destroyOnClose,
      destroyOnHidden
    } = _preview, restPreviewProps = __rest$k(_preview, ["getContainer", "closeIcon", "rootClassName", "destroyOnClose", "destroyOnHidden"]);
    return Object.assign(Object.assign({
      mask: /* @__PURE__ */ reactExports.createElement("div", {
        className: `${prefixCls}-mask-info`
      }, /* @__PURE__ */ reactExports.createElement(RefIcon$i, null), imageLocale === null || imageLocale === void 0 ? void 0 : imageLocale.preview),
      icons
    }, restPreviewProps), {
      // TODO: In the future, destroyOnClose in rc-image needs to be upgrade to destroyOnHidden
      destroyOnClose: destroyOnHidden !== null && destroyOnHidden !== void 0 ? destroyOnHidden : destroyOnClose,
      rootClassName: classNames(mergedRootClassName, rootClassName2),
      getContainer: getContainer !== null && getContainer !== void 0 ? getContainer : getContextPopupContainer,
      transitionName: getTransitionName(rootPrefixCls, "zoom", _preview.transitionName),
      maskTransitionName: getTransitionName(rootPrefixCls, "fade", _preview.maskTransitionName),
      zIndex,
      closeIcon: closeIcon !== null && closeIcon !== void 0 ? closeIcon : contextPreview === null || contextPreview === void 0 ? void 0 : contextPreview.closeIcon
    });
  }, [preview, imageLocale, contextPreview === null || contextPreview === void 0 ? void 0 : contextPreview.closeIcon]);
  const mergedStyle = Object.assign(Object.assign({}, contextStyle), style);
  const mergedFallback = fallback !== null && fallback !== void 0 ? fallback : contextFallback;
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(ImageInternal, Object.assign({
    prefixCls,
    preview: mergedPreview,
    rootClassName: mergedRootClassName,
    className: mergedClassName,
    style: mergedStyle,
    fallback: mergedFallback
  }, otherProps)));
};
Image$1.PreviewGroup = InternalPreviewGroup;
function useHasSider(siders, children, hasSider) {
  if (typeof hasSider === "boolean") {
    return hasSider;
  }
  if (siders.length) {
    return true;
  }
  const childNodes = toArray$1(children);
  return childNodes.some((node) => node.type === Sider);
}
var __rest$j = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function generator({
  suffixCls,
  tagName,
  displayName
}) {
  return (BasicComponent) => {
    const Adapter = /* @__PURE__ */ reactExports.forwardRef((props, ref) => /* @__PURE__ */ reactExports.createElement(BasicComponent, Object.assign({
      ref,
      suffixCls,
      tagName
    }, props)));
    return Adapter;
  };
}
const Basic = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    suffixCls,
    className,
    tagName: TagName
  } = props, others = __rest$j(props, ["prefixCls", "suffixCls", "className", "tagName"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("layout", customizePrefixCls);
  const [wrapSSR, hashId, cssVarCls] = useStyle$o(prefixCls);
  const prefixWithSuffixCls = suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
  return wrapSSR(/* @__PURE__ */ reactExports.createElement(TagName, Object.assign({
    className: classNames(customizePrefixCls || prefixWithSuffixCls, className, hashId, cssVarCls),
    ref
  }, others)));
});
const BasicLayout = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    direction
  } = reactExports.useContext(ConfigContext);
  const [siders, setSiders] = reactExports.useState([]);
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    hasSider,
    tagName: Tag2,
    style
  } = props, others = __rest$j(props, ["prefixCls", "className", "rootClassName", "children", "hasSider", "tagName", "style"]);
  const passedProps = omit(others, ["suffixCls"]);
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("layout");
  const prefixCls = getPrefixCls("layout", customizePrefixCls);
  const mergedHasSider = useHasSider(siders, children, hasSider);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$o(prefixCls);
  const classString = classNames(prefixCls, {
    [`${prefixCls}-has-sider`]: mergedHasSider,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, contextClassName, className, rootClassName, hashId, cssVarCls);
  const contextValue = reactExports.useMemo(() => ({
    siderHook: {
      addSider: (id) => {
        setSiders((prev) => [].concat(_toConsumableArray(prev), [id]));
      },
      removeSider: (id) => {
        setSiders((prev) => prev.filter((currentId) => currentId !== id));
      }
    }
  }), []);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(LayoutContext.Provider, {
    value: contextValue
  }, /* @__PURE__ */ reactExports.createElement(Tag2, Object.assign({
    ref,
    className: classString,
    style: Object.assign(Object.assign({}, contextStyle), style)
  }, passedProps), children)));
});
const Layout$1 = generator({
  tagName: "div",
  displayName: "Layout"
})(BasicLayout);
const Header = generator({
  suffixCls: "header",
  tagName: "header",
  displayName: "Header"
})(Basic);
const Footer = generator({
  suffixCls: "footer",
  tagName: "footer",
  displayName: "Footer"
})(Basic);
const Content = generator({
  suffixCls: "content",
  tagName: "main",
  displayName: "Content"
})(Basic);
const Layout = Layout$1;
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;
Layout._InternalSiderContext = SiderContext;
const ListContext = /* @__PURE__ */ React.createContext({});
ListContext.Consumer;
var __rest$i = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Meta = (_a) => {
  var {
    prefixCls: customizePrefixCls,
    className,
    avatar,
    title,
    description
  } = _a, others = __rest$i(_a, ["prefixCls", "className", "avatar", "title", "description"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("list", customizePrefixCls);
  const classString = classNames(`${prefixCls}-item-meta`, className);
  const content = /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-item-meta-content`
  }, title && /* @__PURE__ */ React.createElement("h4", {
    className: `${prefixCls}-item-meta-title`
  }, title), description && /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-item-meta-description`
  }, description));
  return /* @__PURE__ */ React.createElement("div", Object.assign({}, others, {
    className: classString
  }), avatar && /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-item-meta-avatar`
  }, avatar), (title || description) && content);
};
const InternalItem = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    children,
    actions,
    extra,
    styles,
    className,
    classNames: customizeClassNames,
    colStyle
  } = props, others = __rest$i(props, ["prefixCls", "children", "actions", "extra", "styles", "className", "classNames", "colStyle"]);
  const {
    grid,
    itemLayout
  } = reactExports.useContext(ListContext);
  const {
    getPrefixCls,
    list
  } = reactExports.useContext(ConfigContext);
  const moduleClass = (moduleName) => {
    var _a, _b;
    return classNames((_b = (_a = list === null || list === void 0 ? void 0 : list.item) === null || _a === void 0 ? void 0 : _a.classNames) === null || _b === void 0 ? void 0 : _b[moduleName], customizeClassNames === null || customizeClassNames === void 0 ? void 0 : customizeClassNames[moduleName]);
  };
  const moduleStyle = (moduleName) => {
    var _a, _b;
    return Object.assign(Object.assign({}, (_b = (_a = list === null || list === void 0 ? void 0 : list.item) === null || _a === void 0 ? void 0 : _a.styles) === null || _b === void 0 ? void 0 : _b[moduleName]), styles === null || styles === void 0 ? void 0 : styles[moduleName]);
  };
  const isItemContainsTextNodeAndNotSingular = () => {
    let result = false;
    reactExports.Children.forEach(children, (element) => {
      if (typeof element === "string") {
        result = true;
      }
    });
    return result && reactExports.Children.count(children) > 1;
  };
  const isFlexMode = () => {
    if (itemLayout === "vertical") {
      return !!extra;
    }
    return !isItemContainsTextNodeAndNotSingular();
  };
  const prefixCls = getPrefixCls("list", customizePrefixCls);
  const actionsContent = actions && actions.length > 0 && /* @__PURE__ */ React.createElement("ul", {
    className: classNames(`${prefixCls}-item-action`, moduleClass("actions")),
    key: "actions",
    style: moduleStyle("actions")
  }, actions.map((action, i) => (
    // eslint-disable-next-line react/no-array-index-key
    /* @__PURE__ */ React.createElement("li", {
      key: `${prefixCls}-item-action-${i}`
    }, action, i !== actions.length - 1 && /* @__PURE__ */ React.createElement("em", {
      className: `${prefixCls}-item-action-split`
    }))
  )));
  const Element = grid ? "div" : "li";
  const itemChildren = /* @__PURE__ */ React.createElement(Element, Object.assign({}, others, !grid ? {
    ref
  } : {}, {
    className: classNames(`${prefixCls}-item`, {
      [`${prefixCls}-item-no-flex`]: !isFlexMode()
    }, className)
  }), itemLayout === "vertical" && extra ? [/* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-item-main`,
    key: "content"
  }, children, actionsContent), /* @__PURE__ */ React.createElement("div", {
    className: classNames(`${prefixCls}-item-extra`, moduleClass("extra")),
    key: "extra",
    style: moduleStyle("extra")
  }, extra)] : [children, actionsContent, cloneElement(extra, {
    key: "extra"
  })]);
  return grid ? /* @__PURE__ */ React.createElement(Col, {
    ref,
    flex: 1,
    style: colStyle
  }, itemChildren) : itemChildren;
});
const Item = InternalItem;
Item.Meta = Meta;
const genBorderedStyle = (token) => {
  const {
    listBorderedCls,
    componentCls,
    paddingLG,
    margin,
    itemPaddingSM,
    itemPaddingLG,
    marginLG,
    borderRadiusLG
  } = token;
  const innerCornerBorderRadius = unit(token.calc(borderRadiusLG).sub(token.lineWidth).equal());
  return {
    [listBorderedCls]: {
      border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorBorder}`,
      borderRadius: borderRadiusLG,
      [`${componentCls}-header`]: {
        borderRadius: `${innerCornerBorderRadius} ${innerCornerBorderRadius} 0 0`
      },
      [`${componentCls}-footer`]: {
        borderRadius: `0 0 ${innerCornerBorderRadius} ${innerCornerBorderRadius}`
      },
      [`${componentCls}-header,${componentCls}-footer,${componentCls}-item`]: {
        paddingInline: paddingLG
      },
      [`${componentCls}-pagination`]: {
        margin: `${unit(margin)} ${unit(marginLG)}`
      }
    },
    [`${listBorderedCls}${componentCls}-sm`]: {
      [`${componentCls}-item,${componentCls}-header,${componentCls}-footer`]: {
        padding: itemPaddingSM
      }
    },
    [`${listBorderedCls}${componentCls}-lg`]: {
      [`${componentCls}-item,${componentCls}-header,${componentCls}-footer`]: {
        padding: itemPaddingLG
      }
    }
  };
};
const genResponsiveStyle = (token) => {
  const {
    componentCls,
    screenSM,
    screenMD,
    marginLG,
    marginSM,
    margin
  } = token;
  return {
    [`@media screen and (max-width:${screenMD}px)`]: {
      [componentCls]: {
        [`${componentCls}-item`]: {
          [`${componentCls}-item-action`]: {
            marginInlineStart: marginLG
          }
        }
      },
      [`${componentCls}-vertical`]: {
        [`${componentCls}-item`]: {
          [`${componentCls}-item-extra`]: {
            marginInlineStart: marginLG
          }
        }
      }
    },
    [`@media screen and (max-width: ${screenSM}px)`]: {
      [componentCls]: {
        [`${componentCls}-item`]: {
          flexWrap: "wrap",
          [`${componentCls}-action`]: {
            marginInlineStart: marginSM
          }
        }
      },
      [`${componentCls}-vertical`]: {
        [`${componentCls}-item`]: {
          flexWrap: "wrap-reverse",
          [`${componentCls}-item-main`]: {
            minWidth: token.contentWidth
          },
          [`${componentCls}-item-extra`]: {
            margin: `auto auto ${unit(margin)}`
          }
        }
      }
    }
  };
};
const genBaseStyle$3 = (token) => {
  const {
    componentCls,
    antCls,
    controlHeight,
    minHeight,
    paddingSM,
    marginLG,
    padding,
    itemPadding,
    colorPrimary,
    itemPaddingSM,
    itemPaddingLG,
    paddingXS,
    margin,
    colorText,
    colorTextDescription,
    motionDurationSlow,
    lineWidth,
    headerBg,
    footerBg,
    emptyTextPadding,
    metaMarginBottom,
    avatarMarginRight,
    titleMarginBottom,
    descriptionFontSize
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      position: "relative",
      // fix https://github.com/ant-design/ant-design/issues/46177
      ["--rc-virtual-list-scrollbar-bg"]: token.colorSplit,
      "*": {
        outline: "none"
      },
      [`${componentCls}-header`]: {
        background: headerBg
      },
      [`${componentCls}-footer`]: {
        background: footerBg
      },
      [`${componentCls}-header, ${componentCls}-footer`]: {
        paddingBlock: paddingSM
      },
      [`${componentCls}-pagination`]: {
        marginBlockStart: marginLG,
        // https://github.com/ant-design/ant-design/issues/20037
        [`${antCls}-pagination-options`]: {
          textAlign: "start"
        }
      },
      [`${componentCls}-spin`]: {
        minHeight,
        textAlign: "center"
      },
      [`${componentCls}-items`]: {
        margin: 0,
        padding: 0,
        listStyle: "none"
      },
      [`${componentCls}-item`]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: itemPadding,
        color: colorText,
        [`${componentCls}-item-meta`]: {
          display: "flex",
          flex: 1,
          alignItems: "flex-start",
          maxWidth: "100%",
          [`${componentCls}-item-meta-avatar`]: {
            marginInlineEnd: avatarMarginRight
          },
          [`${componentCls}-item-meta-content`]: {
            flex: "1 0",
            width: 0,
            color: colorText
          },
          [`${componentCls}-item-meta-title`]: {
            margin: `0 0 ${unit(token.marginXXS)} 0`,
            color: colorText,
            fontSize: token.fontSize,
            lineHeight: token.lineHeight,
            "> a": {
              color: colorText,
              transition: `all ${motionDurationSlow}`,
              "&:hover": {
                color: colorPrimary
              }
            }
          },
          [`${componentCls}-item-meta-description`]: {
            color: colorTextDescription,
            fontSize: descriptionFontSize,
            lineHeight: token.lineHeight
          }
        },
        [`${componentCls}-item-action`]: {
          flex: "0 0 auto",
          marginInlineStart: token.marginXXL,
          padding: 0,
          fontSize: 0,
          listStyle: "none",
          "& > li": {
            position: "relative",
            display: "inline-block",
            padding: `0 ${unit(paddingXS)}`,
            color: colorTextDescription,
            fontSize: token.fontSize,
            lineHeight: token.lineHeight,
            textAlign: "center",
            "&:first-child": {
              paddingInlineStart: 0
            }
          },
          [`${componentCls}-item-action-split`]: {
            position: "absolute",
            insetBlockStart: "50%",
            insetInlineEnd: 0,
            width: lineWidth,
            height: token.calc(token.fontHeight).sub(token.calc(token.marginXXS).mul(2)).equal(),
            transform: "translateY(-50%)",
            backgroundColor: token.colorSplit
          }
        }
      },
      [`${componentCls}-empty`]: {
        padding: `${unit(padding)} 0`,
        color: colorTextDescription,
        fontSize: token.fontSizeSM,
        textAlign: "center"
      },
      [`${componentCls}-empty-text`]: {
        padding: emptyTextPadding,
        color: token.colorTextDisabled,
        fontSize: token.fontSize,
        textAlign: "center"
      },
      // ============================ without flex ============================
      [`${componentCls}-item-no-flex`]: {
        display: "block"
      }
    }),
    [`${componentCls}-grid ${antCls}-col > ${componentCls}-item`]: {
      display: "block",
      maxWidth: "100%",
      marginBlockEnd: margin,
      paddingBlock: 0,
      borderBlockEnd: "none"
    },
    [`${componentCls}-vertical ${componentCls}-item`]: {
      alignItems: "initial",
      [`${componentCls}-item-main`]: {
        display: "block",
        flex: 1
      },
      [`${componentCls}-item-extra`]: {
        marginInlineStart: marginLG
      },
      [`${componentCls}-item-meta`]: {
        marginBlockEnd: metaMarginBottom,
        [`${componentCls}-item-meta-title`]: {
          marginBlockStart: 0,
          marginBlockEnd: titleMarginBottom,
          color: colorText,
          fontSize: token.fontSizeLG,
          lineHeight: token.lineHeightLG
        }
      },
      [`${componentCls}-item-action`]: {
        marginBlockStart: padding,
        marginInlineStart: "auto",
        "> li": {
          padding: `0 ${unit(padding)}`,
          "&:first-child": {
            paddingInlineStart: 0
          }
        }
      }
    },
    [`${componentCls}-split ${componentCls}-item`]: {
      borderBlockEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
      "&:last-child": {
        borderBlockEnd: "none"
      }
    },
    [`${componentCls}-split ${componentCls}-header`]: {
      borderBlockEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
    },
    [`${componentCls}-split${componentCls}-empty ${componentCls}-footer`]: {
      borderTop: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
    },
    [`${componentCls}-loading ${componentCls}-spin-nested-loading`]: {
      minHeight: controlHeight
    },
    [`${componentCls}-split${componentCls}-something-after-last-item ${antCls}-spin-container > ${componentCls}-items > ${componentCls}-item:last-child`]: {
      borderBlockEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`
    },
    [`${componentCls}-lg ${componentCls}-item`]: {
      padding: itemPaddingLG
    },
    [`${componentCls}-sm ${componentCls}-item`]: {
      padding: itemPaddingSM
    },
    // Horizontal
    [`${componentCls}:not(${componentCls}-vertical)`]: {
      [`${componentCls}-item-no-flex`]: {
        [`${componentCls}-item-action`]: {
          float: "right"
        }
      }
    }
  };
};
const prepareComponentToken$a = (token) => ({
  contentWidth: 220,
  itemPadding: `${unit(token.paddingContentVertical)} 0`,
  itemPaddingSM: `${unit(token.paddingContentVerticalSM)} ${unit(token.paddingContentHorizontal)}`,
  itemPaddingLG: `${unit(token.paddingContentVerticalLG)} ${unit(token.paddingContentHorizontalLG)}`,
  headerBg: "transparent",
  footerBg: "transparent",
  emptyTextPadding: token.padding,
  metaMarginBottom: token.padding,
  avatarMarginRight: token.padding,
  titleMarginBottom: token.paddingSM,
  descriptionFontSize: token.fontSize
});
const useStyle$a = genStyleHooks("List", (token) => {
  const listToken = merge(token, {
    listBorderedCls: `${token.componentCls}-bordered`,
    minHeight: token.controlHeightLG
  });
  return [genBaseStyle$3(listToken), genBorderedStyle(listToken), genResponsiveStyle(listToken)];
}, prepareComponentToken$a);
var __rest$h = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function InternalList(props, ref) {
  const {
    pagination = false,
    prefixCls: customizePrefixCls,
    bordered = false,
    split = true,
    className,
    rootClassName,
    style,
    children,
    itemLayout,
    loadMore,
    grid,
    dataSource = [],
    size: customizeSize,
    header,
    footer,
    loading = false,
    rowKey,
    renderItem: renderItem2,
    locale: locale2
  } = props, rest = __rest$h(props, ["pagination", "prefixCls", "bordered", "split", "className", "rootClassName", "style", "children", "itemLayout", "loadMore", "grid", "dataSource", "size", "header", "footer", "loading", "rowKey", "renderItem", "locale"]);
  const paginationObj = pagination && typeof pagination === "object" ? pagination : {};
  const [paginationCurrent, setPaginationCurrent] = reactExports.useState(paginationObj.defaultCurrent || 1);
  const [paginationSize, setPaginationSize] = reactExports.useState(paginationObj.defaultPageSize || 10);
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("list");
  const {
    renderEmpty
  } = reactExports.useContext(ConfigContext);
  const defaultPaginationProps = {
    current: 1,
    total: 0,
    position: "bottom"
  };
  const triggerPaginationEvent = (eventName) => (page, pageSize) => {
    var _a;
    setPaginationCurrent(page);
    setPaginationSize(pageSize);
    if (pagination) {
      (_a = pagination === null || pagination === void 0 ? void 0 : pagination[eventName]) === null || _a === void 0 ? void 0 : _a.call(pagination, page, pageSize);
    }
  };
  const onPaginationChange = triggerPaginationEvent("onChange");
  const onPaginationShowSizeChange = triggerPaginationEvent("onShowSizeChange");
  const renderInternalItem = (item, index2) => {
    if (!renderItem2) {
      return null;
    }
    let key;
    if (typeof rowKey === "function") {
      key = rowKey(item);
    } else if (rowKey) {
      key = item[rowKey];
    } else {
      key = item.key;
    }
    if (!key) {
      key = `list-item-${index2}`;
    }
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, {
      key
    }, renderItem2(item, index2));
  };
  const isSomethingAfterLastItem = !!(loadMore || pagination || footer);
  const prefixCls = getPrefixCls("list", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$a(prefixCls);
  let loadingProp = loading;
  if (typeof loadingProp === "boolean") {
    loadingProp = {
      spinning: loadingProp
    };
  }
  const isLoading = !!(loadingProp === null || loadingProp === void 0 ? void 0 : loadingProp.spinning);
  const mergedSize = useSize(customizeSize);
  let sizeCls = "";
  switch (mergedSize) {
    case "large":
      sizeCls = "lg";
      break;
    case "small":
      sizeCls = "sm";
      break;
  }
  const classString = classNames(prefixCls, {
    [`${prefixCls}-vertical`]: itemLayout === "vertical",
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-split`]: split,
    [`${prefixCls}-bordered`]: bordered,
    [`${prefixCls}-loading`]: isLoading,
    [`${prefixCls}-grid`]: !!grid,
    [`${prefixCls}-something-after-last-item`]: isSomethingAfterLastItem,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, contextClassName, className, rootClassName, hashId, cssVarCls);
  const paginationProps = mergeProps(defaultPaginationProps, {
    total: dataSource.length,
    current: paginationCurrent,
    pageSize: paginationSize
  }, pagination || {});
  const largestPage = Math.ceil(paginationProps.total / paginationProps.pageSize);
  paginationProps.current = Math.min(paginationProps.current, largestPage);
  const paginationContent = pagination && /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(`${prefixCls}-pagination`)
  }, /* @__PURE__ */ reactExports.createElement(Pagination, Object.assign({
    align: "end"
  }, paginationProps, {
    onChange: onPaginationChange,
    onShowSizeChange: onPaginationShowSizeChange
  })));
  let splitDataSource = _toConsumableArray(dataSource);
  if (pagination) {
    if (dataSource.length > (paginationProps.current - 1) * paginationProps.pageSize) {
      splitDataSource = _toConsumableArray(dataSource).splice((paginationProps.current - 1) * paginationProps.pageSize, paginationProps.pageSize);
    }
  }
  const needResponsive = Object.keys(grid || {}).some((key) => ["xs", "sm", "md", "lg", "xl", "xxl"].includes(key));
  const screens = useBreakpoint$1(needResponsive);
  const currentBreakpoint = reactExports.useMemo(() => {
    for (let i = 0; i < responsiveArray.length; i += 1) {
      const breakpoint = responsiveArray[i];
      if (screens[breakpoint]) {
        return breakpoint;
      }
    }
    return void 0;
  }, [screens]);
  const colStyle = reactExports.useMemo(() => {
    if (!grid) {
      return void 0;
    }
    const columnCount = currentBreakpoint && grid[currentBreakpoint] ? grid[currentBreakpoint] : grid.column;
    if (columnCount) {
      return {
        width: `${100 / columnCount}%`,
        maxWidth: `${100 / columnCount}%`
      };
    }
  }, [JSON.stringify(grid), currentBreakpoint]);
  let childrenContent = isLoading && /* @__PURE__ */ reactExports.createElement("div", {
    style: {
      minHeight: 53
    }
  });
  if (splitDataSource.length > 0) {
    const items = splitDataSource.map(renderInternalItem);
    childrenContent = grid ? /* @__PURE__ */ reactExports.createElement(Row, {
      gutter: grid.gutter
    }, reactExports.Children.map(items, (child) => /* @__PURE__ */ reactExports.createElement("div", {
      key: child === null || child === void 0 ? void 0 : child.key,
      style: colStyle
    }, child))) : /* @__PURE__ */ reactExports.createElement("ul", {
      className: `${prefixCls}-items`
    }, items);
  } else if (!children && !isLoading) {
    childrenContent = /* @__PURE__ */ reactExports.createElement("div", {
      className: `${prefixCls}-empty-text`
    }, (locale2 === null || locale2 === void 0 ? void 0 : locale2.emptyText) || (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty("List")) || /* @__PURE__ */ reactExports.createElement(DefaultRenderEmpty, {
      componentName: "List"
    }));
  }
  const paginationPosition = paginationProps.position;
  const contextValue = reactExports.useMemo(() => ({
    grid,
    itemLayout
  }), [JSON.stringify(grid), itemLayout]);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(ListContext.Provider, {
    value: contextValue
  }, /* @__PURE__ */ reactExports.createElement("div", Object.assign({
    ref,
    style: Object.assign(Object.assign({}, contextStyle), style),
    className: classString
  }, rest), (paginationPosition === "top" || paginationPosition === "both") && paginationContent, header && /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-header`
  }, header), /* @__PURE__ */ reactExports.createElement(Spin, Object.assign({}, loadingProp), childrenContent, children), footer && /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-footer`
  }, footer), loadMore || (paginationPosition === "bottom" || paginationPosition === "both") && paginationContent)));
}
const ListWithForwardRef = /* @__PURE__ */ reactExports.forwardRef(InternalList);
const List = ListWithForwardRef;
List.Item = Item;
function useEffectState() {
  var _useState = reactExports.useState({
    id: 0,
    callback: null
  }), _useState2 = _slicedToArray(_useState, 2), effectId = _useState2[0], setEffectId = _useState2[1];
  var update = reactExports.useCallback(function(callback) {
    setEffectId(function(_ref) {
      var id = _ref.id;
      return {
        id: id + 1,
        callback
      };
    });
  }, []);
  reactExports.useEffect(function() {
    var _effectId$callback;
    (_effectId$callback = effectId.callback) === null || _effectId$callback === void 0 || _effectId$callback.call(effectId);
  }, [effectId]);
  return update;
}
var MentionsContext = /* @__PURE__ */ reactExports.createContext(null);
function DropdownMenu(props) {
  var _React$useContext = reactExports.useContext(MentionsContext), notFoundContent = _React$useContext.notFoundContent, activeIndex = _React$useContext.activeIndex, setActiveIndex = _React$useContext.setActiveIndex, selectOption = _React$useContext.selectOption, onFocus = _React$useContext.onFocus, onBlur = _React$useContext.onBlur, onScroll = _React$useContext.onScroll;
  var prefixCls = props.prefixCls, options = props.options;
  var activeOption = options[activeIndex] || {};
  return /* @__PURE__ */ reactExports.createElement(ExportMenu, {
    prefixCls: "".concat(prefixCls, "-menu"),
    activeKey: activeOption.key,
    onSelect: function onSelect(_ref) {
      var key = _ref.key;
      var option = options.find(function(_ref2) {
        var optionKey = _ref2.key;
        return optionKey === key;
      });
      selectOption(option);
    },
    onFocus,
    onBlur,
    onScroll
  }, options.map(function(option, index2) {
    var key = option.key, disabled = option.disabled, className = option.className, style = option.style, label = option.label;
    return /* @__PURE__ */ reactExports.createElement(MenuItem, {
      key,
      disabled,
      className,
      style,
      onMouseEnter: function onMouseEnter() {
        setActiveIndex(index2);
      }
    }, label);
  }), !options.length && /* @__PURE__ */ reactExports.createElement(MenuItem, {
    disabled: true
  }, notFoundContent));
}
var BUILT_IN_PLACEMENTS = {
  bottomRight: {
    points: ["tl", "br"],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  bottomLeft: {
    points: ["tr", "bl"],
    offset: [0, 4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topRight: {
    points: ["bl", "tr"],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  },
  topLeft: {
    points: ["br", "tl"],
    offset: [0, -4],
    overflow: {
      adjustX: 1,
      adjustY: 1
    }
  }
};
var KeywordTrigger = function KeywordTrigger2(props) {
  var prefixCls = props.prefixCls, options = props.options, children = props.children, visible = props.visible, transitionName = props.transitionName, getPopupContainer = props.getPopupContainer, dropdownClassName = props.dropdownClassName, direction = props.direction, placement = props.placement;
  var dropdownPrefix = "".concat(prefixCls, "-dropdown");
  var dropdownElement = /* @__PURE__ */ reactExports.createElement(DropdownMenu, {
    prefixCls: dropdownPrefix,
    options
  });
  var dropdownPlacement = reactExports.useMemo(function() {
    var popupPlacement;
    if (direction === "rtl") {
      popupPlacement = placement === "top" ? "topLeft" : "bottomLeft";
    } else {
      popupPlacement = placement === "top" ? "topRight" : "bottomRight";
    }
    return popupPlacement;
  }, [direction, placement]);
  return /* @__PURE__ */ reactExports.createElement(Trigger, {
    prefixCls: dropdownPrefix,
    popupVisible: visible,
    popup: dropdownElement,
    popupPlacement: dropdownPlacement,
    popupTransitionName: transitionName,
    builtinPlacements: BUILT_IN_PLACEMENTS,
    getPopupContainer,
    popupClassName: dropdownClassName
  }, children);
};
var Option$1 = function Option() {
  return null;
};
function getBeforeSelectionText(input) {
  var selectionStart = input.selectionStart;
  return input.value.slice(0, selectionStart);
}
function getLastMeasureIndex(text, prefix) {
  return prefix.reduce(function(lastMatch, prefixStr) {
    var lastIndex = text.lastIndexOf(prefixStr);
    if (lastIndex > lastMatch.location) {
      return {
        location: lastIndex,
        prefix: prefixStr
      };
    }
    return lastMatch;
  }, {
    location: -1,
    prefix: ""
  });
}
function lower(char) {
  return (char || "").toLowerCase();
}
function reduceText(text, targetText, split) {
  var firstChar = text[0];
  if (!firstChar || firstChar === split) {
    return text;
  }
  var restText = text;
  var targetTextLen = targetText.length;
  for (var i = 0; i < targetTextLen; i += 1) {
    if (lower(restText[i]) !== lower(targetText[i])) {
      restText = restText.slice(i);
      break;
    } else if (i === targetTextLen - 1) {
      restText = restText.slice(targetTextLen);
    }
  }
  return restText;
}
function replaceWithMeasure(text, measureConfig) {
  var measureLocation = measureConfig.measureLocation, prefix = measureConfig.prefix, targetText = measureConfig.targetText, selectionStart = measureConfig.selectionStart, split = measureConfig.split;
  var beforeMeasureText = text.slice(0, measureLocation);
  if (beforeMeasureText[beforeMeasureText.length - split.length] === split) {
    beforeMeasureText = beforeMeasureText.slice(0, beforeMeasureText.length - split.length);
  }
  if (beforeMeasureText) {
    beforeMeasureText = "".concat(beforeMeasureText).concat(split);
  }
  var restText = reduceText(text.slice(selectionStart), targetText.slice(selectionStart - measureLocation - prefix.length), split);
  if (restText.slice(0, split.length) === split) {
    restText = restText.slice(split.length);
  }
  var connectedStartText = "".concat(beforeMeasureText).concat(prefix).concat(targetText).concat(split);
  return {
    text: "".concat(connectedStartText).concat(restText),
    selectionLocation: connectedStartText.length
  };
}
function setInputSelection(input, location) {
  input.setSelectionRange(location, location);
  input.blur();
  input.focus();
}
function validateSearch(text, split) {
  return !split || text.indexOf(split) === -1;
}
function filterOption(input, _ref) {
  var _ref$value = _ref.value, value = _ref$value === void 0 ? "" : _ref$value;
  var lowerCase = input.toLowerCase();
  return value.toLowerCase().indexOf(lowerCase) !== -1;
}
var _excluded$8 = ["prefixCls", "className", "style", "prefix", "split", "notFoundContent", "value", "defaultValue", "children", "options", "open", "allowClear", "silent", "validateSearch", "filterOption", "onChange", "onKeyDown", "onKeyUp", "onPressEnter", "onSearch", "onSelect", "onFocus", "onBlur", "transitionName", "placement", "direction", "getPopupContainer", "dropdownClassName", "rows", "visible", "onPopupScroll"], _excluded2 = ["suffix", "prefixCls", "defaultValue", "value", "allowClear", "onChange", "classNames", "className", "disabled", "onClear"];
var InternalMentions$1 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, className = props.className, style = props.style, _props$prefix = props.prefix, prefix = _props$prefix === void 0 ? "@" : _props$prefix, _props$split = props.split, split = _props$split === void 0 ? " " : _props$split, _props$notFoundConten = props.notFoundContent, notFoundContent = _props$notFoundConten === void 0 ? "Not Found" : _props$notFoundConten, value = props.value, defaultValue = props.defaultValue, children = props.children, options = props.options, open2 = props.open;
  props.allowClear;
  var silent = props.silent, _props$validateSearch = props.validateSearch, validateSearch$1 = _props$validateSearch === void 0 ? validateSearch : _props$validateSearch, _props$filterOption = props.filterOption, filterOption$1 = _props$filterOption === void 0 ? filterOption : _props$filterOption, onChange = props.onChange, onKeyDown = props.onKeyDown, onKeyUp = props.onKeyUp, onPressEnter = props.onPressEnter, onSearch = props.onSearch, onSelect = props.onSelect, onFocus = props.onFocus, onBlur = props.onBlur, transitionName = props.transitionName, placement = props.placement, direction = props.direction, getPopupContainer = props.getPopupContainer, dropdownClassName = props.dropdownClassName, _props$rows = props.rows, rows = _props$rows === void 0 ? 1 : _props$rows;
  props.visible;
  var onPopupScroll = props.onPopupScroll, restProps = _objectWithoutProperties(props, _excluded$8);
  var mergedPrefix = reactExports.useMemo(function() {
    return Array.isArray(prefix) ? prefix : [prefix];
  }, [prefix]);
  var containerRef = reactExports.useRef(null);
  var textareaRef = reactExports.useRef(null);
  var measureRef = reactExports.useRef(null);
  var getTextArea = function getTextArea2() {
    var _textareaRef$current;
    return (_textareaRef$current = textareaRef.current) === null || _textareaRef$current === void 0 || (_textareaRef$current = _textareaRef$current.resizableTextArea) === null || _textareaRef$current === void 0 ? void 0 : _textareaRef$current.textArea;
  };
  React.useImperativeHandle(ref, function() {
    var _textareaRef$current4;
    return {
      focus: function focus() {
        var _textareaRef$current2;
        return (_textareaRef$current2 = textareaRef.current) === null || _textareaRef$current2 === void 0 ? void 0 : _textareaRef$current2.focus();
      },
      blur: function blur() {
        var _textareaRef$current3;
        return (_textareaRef$current3 = textareaRef.current) === null || _textareaRef$current3 === void 0 ? void 0 : _textareaRef$current3.blur();
      },
      textarea: (_textareaRef$current4 = textareaRef.current) === null || _textareaRef$current4 === void 0 || (_textareaRef$current4 = _textareaRef$current4.resizableTextArea) === null || _textareaRef$current4 === void 0 ? void 0 : _textareaRef$current4.textArea,
      nativeElement: containerRef.current
    };
  });
  var _useState = reactExports.useState(false), _useState2 = _slicedToArray(_useState, 2), measuring = _useState2[0], setMeasuring = _useState2[1];
  var _useState3 = reactExports.useState(""), _useState4 = _slicedToArray(_useState3, 2), measureText = _useState4[0], setMeasureText = _useState4[1];
  var _useState5 = reactExports.useState(""), _useState6 = _slicedToArray(_useState5, 2), measurePrefix = _useState6[0], setMeasurePrefix = _useState6[1];
  var _useState7 = reactExports.useState(0), _useState8 = _slicedToArray(_useState7, 2), measureLocation = _useState8[0], setMeasureLocation = _useState8[1];
  var _useState9 = reactExports.useState(0), _useState10 = _slicedToArray(_useState9, 2), activeIndex = _useState10[0], setActiveIndex = _useState10[1];
  var _useState11 = reactExports.useState(false), _useState12 = _slicedToArray(_useState11, 2), isFocus = _useState12[0], setIsFocus = _useState12[1];
  var _useMergedState = useMergedState("", {
    defaultValue,
    value
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedValue = _useMergedState2[0], setMergedValue = _useMergedState2[1];
  reactExports.useEffect(function() {
    if (measuring && measureRef.current) {
      measureRef.current.scrollTop = getTextArea().scrollTop;
    }
  }, [measuring]);
  var _React$useMemo = React.useMemo(function() {
    if (open2) {
      for (var i = 0; i < mergedPrefix.length; i += 1) {
        var curPrefix = mergedPrefix[i];
        var index2 = mergedValue.lastIndexOf(curPrefix);
        if (index2 >= 0) {
          return [true, "", curPrefix, index2];
        }
      }
    }
    return [measuring, measureText, measurePrefix, measureLocation];
  }, [open2, measuring, mergedPrefix, mergedValue, measureText, measurePrefix, measureLocation]), _React$useMemo2 = _slicedToArray(_React$useMemo, 4), mergedMeasuring = _React$useMemo2[0], mergedMeasureText = _React$useMemo2[1], mergedMeasurePrefix = _React$useMemo2[2], mergedMeasureLocation = _React$useMemo2[3];
  var getOptions = React.useCallback(function(targetMeasureText) {
    var list;
    if (options && options.length > 0) {
      list = options.map(function(item) {
        var _item$key;
        return _objectSpread2(_objectSpread2({}, item), {}, {
          key: (_item$key = item === null || item === void 0 ? void 0 : item.key) !== null && _item$key !== void 0 ? _item$key : item.value
        });
      });
    } else {
      list = toArray$1(children).map(function(_ref) {
        var optionProps = _ref.props, key = _ref.key;
        return _objectSpread2(_objectSpread2({}, optionProps), {}, {
          label: optionProps.children,
          key: key || optionProps.value
        });
      });
    }
    return list.filter(function(option) {
      if (filterOption$1 === false) {
        return true;
      }
      return filterOption$1(targetMeasureText, option);
    });
  }, [children, options, filterOption$1]);
  var mergedOptions = React.useMemo(function() {
    return getOptions(mergedMeasureText);
  }, [getOptions, mergedMeasureText]);
  var onSelectionEffect = useEffectState();
  var startMeasure = function startMeasure2(nextMeasureText, nextMeasurePrefix, nextMeasureLocation) {
    setMeasuring(true);
    setMeasureText(nextMeasureText);
    setMeasurePrefix(nextMeasurePrefix);
    setMeasureLocation(nextMeasureLocation);
    setActiveIndex(0);
  };
  var stopMeasure = function stopMeasure2(callback) {
    setMeasuring(false);
    setMeasureLocation(0);
    setMeasureText("");
    onSelectionEffect(callback);
  };
  var triggerChange = function triggerChange2(nextValue) {
    setMergedValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue);
  };
  var onInternalChange = function onInternalChange2(_ref2) {
    var nextValue = _ref2.target.value;
    triggerChange(nextValue);
  };
  var selectOption = function selectOption2(option) {
    var _getTextArea;
    var _option$value = option.value, mentionValue = _option$value === void 0 ? "" : _option$value;
    var _replaceWithMeasure = replaceWithMeasure(mergedValue, {
      measureLocation: mergedMeasureLocation,
      targetText: mentionValue,
      prefix: mergedMeasurePrefix,
      selectionStart: (_getTextArea = getTextArea()) === null || _getTextArea === void 0 ? void 0 : _getTextArea.selectionStart,
      split
    }), text = _replaceWithMeasure.text, selectionLocation = _replaceWithMeasure.selectionLocation;
    triggerChange(text);
    stopMeasure(function() {
      setInputSelection(getTextArea(), selectionLocation);
    });
    onSelect === null || onSelect === void 0 || onSelect(option, mergedMeasurePrefix);
  };
  var onInternalKeyDown = function onInternalKeyDown2(event) {
    var which = event.which;
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(event);
    if (!mergedMeasuring) {
      return;
    }
    if (which === KeyCode.UP || which === KeyCode.DOWN) {
      var optionLen = mergedOptions.length;
      var offset = which === KeyCode.UP ? -1 : 1;
      var newActiveIndex = (activeIndex + offset + optionLen) % optionLen;
      setActiveIndex(newActiveIndex);
      event.preventDefault();
    } else if (which === KeyCode.ESC) {
      stopMeasure();
    } else if (which === KeyCode.ENTER) {
      event.preventDefault();
      if (silent) {
        return;
      }
      if (!mergedOptions.length) {
        stopMeasure();
        return;
      }
      var _option = mergedOptions[activeIndex];
      selectOption(_option);
    }
  };
  var onInternalKeyUp = function onInternalKeyUp2(event) {
    var key = event.key, which = event.which;
    var target = event.target;
    var selectionStartText = getBeforeSelectionText(target);
    var _getLastMeasureIndex = getLastMeasureIndex(selectionStartText, mergedPrefix), measureIndex = _getLastMeasureIndex.location, nextMeasurePrefix = _getLastMeasureIndex.prefix;
    onKeyUp === null || onKeyUp === void 0 || onKeyUp(event);
    if ([KeyCode.ESC, KeyCode.UP, KeyCode.DOWN, KeyCode.ENTER].indexOf(which) !== -1) {
      return;
    }
    if (measureIndex !== -1) {
      var nextMeasureText = selectionStartText.slice(measureIndex + nextMeasurePrefix.length);
      var validateMeasure = validateSearch$1(nextMeasureText, split);
      var matchOption = !!getOptions(nextMeasureText).length;
      if (validateMeasure) {
        if (key === nextMeasurePrefix || key === "Shift" || which === KeyCode.ALT || key === "AltGraph" || mergedMeasuring || nextMeasureText !== mergedMeasureText && matchOption) {
          startMeasure(nextMeasureText, nextMeasurePrefix, measureIndex);
        }
      } else if (mergedMeasuring) {
        stopMeasure();
      }
      if (onSearch && validateMeasure) {
        onSearch(nextMeasureText, nextMeasurePrefix);
      }
    } else if (mergedMeasuring) {
      stopMeasure();
    }
  };
  var onInternalPressEnter = function onInternalPressEnter2(event) {
    if (!mergedMeasuring && onPressEnter) {
      onPressEnter(event);
    }
  };
  var focusRef = reactExports.useRef();
  var onInternalFocus = function onInternalFocus2(event) {
    window.clearTimeout(focusRef.current);
    if (!isFocus && event && onFocus) {
      onFocus(event);
    }
    setIsFocus(true);
  };
  var onInternalBlur = function onInternalBlur2(event) {
    focusRef.current = window.setTimeout(function() {
      setIsFocus(false);
      stopMeasure();
      onBlur === null || onBlur === void 0 || onBlur(event);
    }, 0);
  };
  var onDropdownFocus = function onDropdownFocus2() {
    onInternalFocus();
  };
  var onDropdownBlur = function onDropdownBlur2() {
    onInternalBlur();
  };
  var onInternalPopupScroll = function onInternalPopupScroll2(event) {
    onPopupScroll === null || onPopupScroll === void 0 || onPopupScroll(event);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: classNames(prefixCls, className),
    style,
    ref: containerRef
  }, /* @__PURE__ */ React.createElement(TextArea, _extends({
    ref: textareaRef,
    value: mergedValue
  }, restProps, {
    rows,
    onChange: onInternalChange,
    onKeyDown: onInternalKeyDown,
    onKeyUp: onInternalKeyUp,
    onPressEnter: onInternalPressEnter,
    onFocus: onInternalFocus,
    onBlur: onInternalBlur
  })), mergedMeasuring && /* @__PURE__ */ React.createElement("div", {
    ref: measureRef,
    className: "".concat(prefixCls, "-measure")
  }, mergedValue.slice(0, mergedMeasureLocation), /* @__PURE__ */ React.createElement(MentionsContext.Provider, {
    value: {
      notFoundContent,
      activeIndex,
      setActiveIndex,
      selectOption,
      onFocus: onDropdownFocus,
      onBlur: onDropdownBlur,
      onScroll: onInternalPopupScroll
    }
  }, /* @__PURE__ */ React.createElement(KeywordTrigger, {
    prefixCls,
    transitionName,
    placement,
    direction,
    options: mergedOptions,
    visible: true,
    getPopupContainer,
    dropdownClassName
  }, /* @__PURE__ */ React.createElement("span", null, mergedMeasurePrefix))), mergedValue.slice(mergedMeasureLocation + mergedMeasurePrefix.length)));
});
var Mentions$1 = /* @__PURE__ */ reactExports.forwardRef(function(_ref3, ref) {
  var suffix = _ref3.suffix, _ref3$prefixCls = _ref3.prefixCls, prefixCls = _ref3$prefixCls === void 0 ? "rc-mentions" : _ref3$prefixCls, defaultValue = _ref3.defaultValue, customValue = _ref3.value, allowClear = _ref3.allowClear, onChange = _ref3.onChange, classes = _ref3.classNames, className = _ref3.className, disabled = _ref3.disabled, onClear = _ref3.onClear, rest = _objectWithoutProperties(_ref3, _excluded2);
  var holderRef = reactExports.useRef(null);
  var mentionRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, function() {
    var _holderRef$current, _mentionRef$current;
    return _objectSpread2(_objectSpread2({}, mentionRef.current), {}, {
      nativeElement: ((_holderRef$current = holderRef.current) === null || _holderRef$current === void 0 ? void 0 : _holderRef$current.nativeElement) || ((_mentionRef$current = mentionRef.current) === null || _mentionRef$current === void 0 ? void 0 : _mentionRef$current.nativeElement)
    });
  });
  var _useMergedState3 = useMergedState("", {
    defaultValue,
    value: customValue
  }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), mergedValue = _useMergedState4[0], setMergedValue = _useMergedState4[1];
  var triggerChange = function triggerChange2(currentValue) {
    setMergedValue(currentValue);
    onChange === null || onChange === void 0 || onChange(currentValue);
  };
  var handleReset = function handleReset2() {
    triggerChange("");
  };
  return /* @__PURE__ */ React.createElement(BaseInput, {
    suffix,
    prefixCls,
    value: mergedValue,
    allowClear,
    handleReset,
    className,
    classNames: classes,
    disabled,
    ref: holderRef,
    onClear
  }, /* @__PURE__ */ React.createElement(InternalMentions$1, _extends({
    className: classes === null || classes === void 0 ? void 0 : classes.mentions,
    prefixCls,
    ref: mentionRef,
    onChange: triggerChange,
    disabled
  }, rest)));
});
Mentions$1.Option = Option$1;
const toList$1 = (candidate, skipEmpty = false) => {
  if (skipEmpty && (candidate === void 0 || candidate === null)) {
    return [];
  }
  return Array.isArray(candidate) ? candidate : [candidate];
};
const genMentionsStyle = (token) => {
  const {
    componentCls,
    antCls,
    colorTextDisabled,
    controlItemBgHover,
    controlPaddingHorizontal,
    colorText,
    motionDurationSlow,
    lineHeight,
    controlHeight,
    paddingInline,
    paddingBlock,
    fontSize,
    fontSizeIcon,
    colorIcon,
    colorTextQuaternary,
    colorBgElevated,
    paddingXXS,
    borderRadius,
    borderRadiusLG,
    boxShadowSecondary,
    itemPaddingVertical,
    calc
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), genBasicInputStyle(token)), {
      position: "relative",
      display: "inline-block",
      height: "auto",
      padding: `0 ${unit(token.paddingInline)}`,
      overflow: "hidden",
      lineHeight,
      whiteSpace: "pre-wrap",
      verticalAlign: "bottom"
    }), genOutlinedStyle(token)), genFilledStyle(token)), genBorderlessStyle(token)), {
      "&-affix-wrapper": Object.assign(Object.assign({}, genBasicInputStyle(token)), {
        display: "inline-flex",
        paddingBlock: 0,
        paddingInlineStart: 0,
        paddingInlineEnd: token.paddingInline,
        "&::before": {
          display: "inline-block",
          width: 0,
          visibility: "hidden",
          content: '"\\a0"'
        },
        [`${componentCls}-suffix`]: {
          display: "inline-flex",
          alignItems: "center",
          // 当页面中存在 feedback-icon 时，给 clear-icon 添加右边距
          [`&:has(${antCls}-form-item-feedback-icon) ${componentCls}-clear-icon`]: {
            marginInlineEnd: token.marginXS
          },
          [`${antCls}-form-item-feedback-icon`]: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center"
          }
        },
        [`${componentCls}-clear-icon`]: {
          insetInlineEnd: 0,
          insetBlockStart: calc(fontSize).mul(lineHeight).mul(0.5).add(paddingBlock).equal(),
          padding: 0,
          lineHeight: 0,
          color: colorTextQuaternary,
          fontSize: fontSizeIcon,
          verticalAlign: -1,
          // https://github.com/ant-design/ant-design/pull/18151
          // https://codesandbox.io/s/wizardly-sun-u10br
          cursor: "pointer",
          transition: `color ${motionDurationSlow}`,
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          "&:hover": {
            color: colorIcon
          },
          "&:active": {
            color: colorText
          },
          "&-hidden": {
            visibility: "hidden"
          }
        }
      })
    }), genUnderlinedStyle(token)), {
      "&-disabled": {
        "> textarea": Object.assign({}, genDisabledStyle(token))
      },
      // ================= Input Area =================
      [`&, &-affix-wrapper > ${componentCls}`]: {
        [`> textarea, ${componentCls}-measure`]: {
          color: colorText,
          boxSizing: "border-box",
          minHeight: token.calc(controlHeight).sub(2).equal(),
          margin: 0,
          padding: `${unit(paddingBlock)} ${unit(paddingInline)}`,
          overflow: "inherit",
          overflowX: "hidden",
          overflowY: "auto",
          fontWeight: "inherit",
          fontSize: "inherit",
          fontFamily: "inherit",
          fontStyle: "inherit",
          fontVariant: "inherit",
          fontSizeAdjust: "inherit",
          fontStretch: "inherit",
          lineHeight: "inherit",
          direction: "inherit",
          letterSpacing: "inherit",
          whiteSpace: "inherit",
          textAlign: "inherit",
          verticalAlign: "top",
          wordWrap: "break-word",
          wordBreak: "inherit",
          tabSize: "inherit"
        },
        "> textarea:disabled": {
          color: colorTextDisabled
        },
        "> textarea": Object.assign(Object.assign({
          width: "100%",
          border: "none",
          outline: "none",
          resize: "none",
          backgroundColor: "transparent"
        }, genPlaceholderStyle(token.colorTextPlaceholder)), {
          padding: `${unit(token.paddingBlock)} 0`
        }),
        [`${componentCls}-measure`]: {
          position: "absolute",
          top: 0,
          insetInlineEnd: 0,
          bottom: 0,
          insetInlineStart: 0,
          zIndex: -1,
          color: "transparent",
          pointerEvents: "none",
          "> span": {
            display: "inline-block",
            minHeight: "1em"
          }
        }
      },
      // ================== Dropdown ==================
      "&-dropdown": Object.assign(Object.assign({}, resetComponent(token)), {
        position: "absolute",
        top: -9999,
        insetInlineStart: -9999,
        zIndex: token.zIndexPopup,
        boxSizing: "border-box",
        fontSize,
        fontVariant: "initial",
        padding: paddingXXS,
        backgroundColor: colorBgElevated,
        borderRadius: borderRadiusLG,
        outline: "none",
        boxShadow: boxShadowSecondary,
        "&-hidden": {
          display: "none"
        },
        [`${componentCls}-dropdown-menu`]: {
          maxHeight: token.dropdownHeight,
          margin: 0,
          paddingInlineStart: 0,
          // Override default ul/ol
          overflow: "auto",
          listStyle: "none",
          outline: "none",
          "&-item": Object.assign(Object.assign({}, textEllipsis), {
            position: "relative",
            display: "block",
            minWidth: token.controlItemWidth,
            padding: `${unit(itemPaddingVertical)} ${unit(controlPaddingHorizontal)}`,
            color: colorText,
            borderRadius,
            fontWeight: "normal",
            lineHeight,
            cursor: "pointer",
            transition: `background ${motionDurationSlow} ease`,
            "&:hover": {
              backgroundColor: controlItemBgHover
            },
            "&-disabled": {
              color: colorTextDisabled,
              cursor: "not-allowed",
              "&:hover": {
                color: colorTextDisabled,
                backgroundColor: controlItemBgHover,
                cursor: "not-allowed"
              }
            },
            "&-selected": {
              color: colorText,
              fontWeight: token.fontWeightStrong,
              backgroundColor: controlItemBgHover
            },
            "&-active": {
              backgroundColor: controlItemBgHover
            }
          })
        }
      })
    })
  };
};
const prepareComponentToken$9 = (token) => Object.assign(Object.assign({}, initComponentToken(token)), {
  dropdownHeight: 250,
  controlItemWidth: 100,
  zIndexPopup: token.zIndexPopupBase + 50,
  itemPaddingVertical: (token.controlHeight - token.fontHeight) / 2
});
const useStyle$9 = genStyleHooks("Mentions", (token) => {
  const mentionsToken = merge(token, initInputToken(token));
  return genMentionsStyle(mentionsToken);
}, prepareComponentToken$9);
var __rest$g = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const {
  Option: Option2
} = Mentions$1;
function loadingFilterOption() {
  return true;
}
const InternalMentions = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    disabled: customDisabled,
    loading,
    filterOption: filterOption2,
    children,
    notFoundContent,
    options,
    status: customStatus,
    allowClear = false,
    popupClassName,
    style,
    variant: customVariant
  } = props, restProps = __rest$g(props, ["prefixCls", "className", "rootClassName", "disabled", "loading", "filterOption", "children", "notFoundContent", "options", "status", "allowClear", "popupClassName", "style", "variant"]);
  const [focused, setFocused] = reactExports.useState(false);
  const innerRef = reactExports.useRef(null);
  const mergedRef = composeRef(ref, innerRef);
  const {
    getPrefixCls,
    renderEmpty,
    direction,
    mentions: contextMentions
  } = reactExports.useContext(ConfigContext);
  const {
    status: contextStatus,
    hasFeedback,
    feedbackIcon
  } = reactExports.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);
  const contextDisabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : contextDisabled;
  const onFocus = (...args) => {
    if (restProps.onFocus) {
      restProps.onFocus.apply(restProps, args);
    }
    setFocused(true);
  };
  const onBlur = (...args) => {
    if (restProps.onBlur) {
      restProps.onBlur.apply(restProps, args);
    }
    setFocused(false);
  };
  const notFoundContentEle = reactExports.useMemo(() => {
    if (notFoundContent !== void 0) {
      return notFoundContent;
    }
    return (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty("Select")) || /* @__PURE__ */ reactExports.createElement(DefaultRenderEmpty, {
      componentName: "Select"
    });
  }, [notFoundContent, renderEmpty]);
  const mentionOptions = reactExports.useMemo(() => {
    if (loading) {
      return /* @__PURE__ */ reactExports.createElement(Option2, {
        value: "ANTD_SEARCHING",
        disabled: true
      }, /* @__PURE__ */ reactExports.createElement(Spin, {
        size: "small"
      }));
    }
    return children;
  }, [loading, children]);
  const mergedOptions = loading ? [{
    value: "ANTD_SEARCHING",
    disabled: true,
    label: /* @__PURE__ */ reactExports.createElement(Spin, {
      size: "small"
    })
  }] : options;
  const mentionsfilterOption = loading ? loadingFilterOption : filterOption2;
  const prefixCls = getPrefixCls("mentions", customizePrefixCls);
  const mergedAllowClear = getAllowClear(allowClear);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$9(prefixCls, rootCls);
  const [variant, enableVariantCls] = useVariant("mentions", customVariant);
  const suffixNode = hasFeedback && /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, feedbackIcon);
  const mergedClassName = classNames(contextMentions === null || contextMentions === void 0 ? void 0 : contextMentions.className, className, rootClassName, cssVarCls, rootCls);
  const mentions = /* @__PURE__ */ reactExports.createElement(Mentions$1, Object.assign({
    silent: loading,
    prefixCls,
    notFoundContent: notFoundContentEle,
    className: mergedClassName,
    disabled: mergedDisabled,
    allowClear: mergedAllowClear,
    direction,
    style: Object.assign(Object.assign({}, contextMentions === null || contextMentions === void 0 ? void 0 : contextMentions.style), style)
  }, restProps, {
    filterOption: mentionsfilterOption,
    onFocus,
    onBlur,
    dropdownClassName: classNames(popupClassName, rootClassName, hashId, cssVarCls, rootCls),
    ref: mergedRef,
    options: mergedOptions,
    suffix: suffixNode,
    classNames: {
      mentions: classNames({
        [`${prefixCls}-disabled`]: mergedDisabled,
        [`${prefixCls}-focused`]: focused,
        [`${prefixCls}-rtl`]: direction === "rtl"
      }, hashId),
      variant: classNames({
        [`${prefixCls}-${variant}`]: enableVariantCls
      }, getStatusClassNames(prefixCls, mergedStatus)),
      affixWrapper: hashId
    }
  }), mentionOptions);
  return wrapCSSVar(mentions);
});
const Mentions = InternalMentions;
Mentions.Option = Option2;
const PurePanel$4 = genPurePanel(Mentions, void 0, void 0, "mentions");
Mentions._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$4;
Mentions.getMentions = (value = "", config = {}) => {
  const {
    prefix = "@",
    split = " "
  } = config;
  const prefixList = toList$1(prefix);
  return value.split(split).map((str = "") => {
    let hitPrefix = null;
    prefixList.some((prefixStr) => {
      const startStr = str.slice(0, prefixStr.length);
      if (startStr === prefixStr) {
        hitPrefix = prefixStr;
        return true;
      }
      return false;
    });
    if (hitPrefix !== null) {
      return {
        prefix: hitPrefix,
        value: str.slice(hitPrefix.length)
      };
    }
    return null;
  }).filter((entity) => !!entity && !!entity.value);
};
let message = null;
let act$1 = (callback) => callback();
let taskQueue$1 = [];
let defaultGlobalConfig$1 = {};
function getGlobalContext$1() {
  const {
    getContainer,
    duration,
    rtl,
    maxCount,
    top
  } = defaultGlobalConfig$1;
  const mergedContainer = (getContainer === null || getContainer === void 0 ? void 0 : getContainer()) || document.body;
  return {
    getContainer: () => mergedContainer,
    duration,
    rtl,
    maxCount,
    top
  };
}
const GlobalHolder$1 = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    messageConfig,
    sync
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = defaultGlobalConfig$1.prefixCls || getPrefixCls("message");
  const appConfig = reactExports.useContext(AppConfigContext);
  const [api2, holder] = useInternalMessage(Object.assign(Object.assign(Object.assign({}, messageConfig), {
    prefixCls
  }), appConfig.message));
  React.useImperativeHandle(ref, () => {
    const instance = Object.assign({}, api2);
    Object.keys(instance).forEach((method) => {
      instance[method] = (...args) => {
        sync();
        return api2[method].apply(api2, args);
      };
    });
    return {
      instance,
      sync
    };
  });
  return holder;
});
const GlobalHolderWrapper$1 = /* @__PURE__ */ React.forwardRef((_, ref) => {
  const [messageConfig, setMessageConfig] = React.useState(getGlobalContext$1);
  const sync = () => {
    setMessageConfig(getGlobalContext$1);
  };
  React.useEffect(sync, []);
  const global = globalConfig();
  const rootPrefixCls = global.getRootPrefixCls();
  const rootIconPrefixCls = global.getIconPrefixCls();
  const theme = global.getTheme();
  const dom = /* @__PURE__ */ React.createElement(GlobalHolder$1, {
    ref,
    sync,
    messageConfig
  });
  return /* @__PURE__ */ React.createElement(ConfigProvider, {
    prefixCls: rootPrefixCls,
    iconPrefixCls: rootIconPrefixCls,
    theme
  }, global.holderRender ? global.holderRender(dom) : dom);
});
const flushMessageQueue = () => {
  if (!message) {
    const holderFragment = document.createDocumentFragment();
    const newMessage = {
      fragment: holderFragment
    };
    message = newMessage;
    act$1(() => {
      const reactRender = unstableSetRender();
      reactRender(/* @__PURE__ */ React.createElement(GlobalHolderWrapper$1, {
        ref: (node) => {
          const {
            instance,
            sync
          } = node || {};
          Promise.resolve().then(() => {
            if (!newMessage.instance && instance) {
              newMessage.instance = instance;
              newMessage.sync = sync;
              flushMessageQueue();
            }
          });
        }
      }), holderFragment);
    });
    return;
  }
  if (!message.instance) {
    return;
  }
  taskQueue$1.forEach((task) => {
    const {
      type,
      skipped
    } = task;
    if (!skipped) {
      switch (type) {
        case "open": {
          act$1(() => {
            const closeFn = message.instance.open(Object.assign(Object.assign({}, defaultGlobalConfig$1), task.config));
            closeFn === null || closeFn === void 0 ? void 0 : closeFn.then(task.resolve);
            task.setCloseFn(closeFn);
          });
          break;
        }
        case "destroy":
          act$1(() => {
            message === null || message === void 0 ? void 0 : message.instance.destroy(task.key);
          });
          break;
        default: {
          act$1(() => {
            var _message$instance;
            const closeFn = (_message$instance = message.instance)[type].apply(_message$instance, _toConsumableArray(task.args));
            closeFn === null || closeFn === void 0 ? void 0 : closeFn.then(task.resolve);
            task.setCloseFn(closeFn);
          });
        }
      }
    }
  });
  taskQueue$1 = [];
};
function setMessageGlobalConfig(config) {
  defaultGlobalConfig$1 = Object.assign(Object.assign({}, defaultGlobalConfig$1), config);
  act$1(() => {
    var _a;
    (_a = message === null || message === void 0 ? void 0 : message.sync) === null || _a === void 0 ? void 0 : _a.call(message);
  });
}
function open$1(config) {
  const result = wrapPromiseFn((resolve) => {
    let closeFn;
    const task = {
      type: "open",
      config,
      resolve,
      setCloseFn: (fn) => {
        closeFn = fn;
      }
    };
    taskQueue$1.push(task);
    return () => {
      if (closeFn) {
        act$1(() => {
          closeFn();
        });
      } else {
        task.skipped = true;
      }
    };
  });
  flushMessageQueue();
  return result;
}
function typeOpen(type, args) {
  const result = wrapPromiseFn((resolve) => {
    let closeFn;
    const task = {
      type,
      args,
      resolve,
      setCloseFn: (fn) => {
        closeFn = fn;
      }
    };
    taskQueue$1.push(task);
    return () => {
      if (closeFn) {
        act$1(() => {
          closeFn();
        });
      } else {
        task.skipped = true;
      }
    };
  });
  flushMessageQueue();
  return result;
}
const destroy$1 = (key) => {
  taskQueue$1.push({
    type: "destroy",
    key
  });
  flushMessageQueue();
};
const methods$1 = ["success", "info", "warning", "error", "loading"];
const baseStaticMethods$1 = {
  open: open$1,
  destroy: destroy$1,
  config: setMessageGlobalConfig,
  useMessage,
  _InternalPanelDoNotUseOrYouWillBeFired: PurePanel$7
};
const staticMethods$1 = baseStaticMethods$1;
methods$1.forEach((type) => {
  staticMethods$1[type] = (...args) => typeOpen(type, args);
});
let notification = null;
let act = (callback) => callback();
let taskQueue = [];
let defaultGlobalConfig = {};
function getGlobalContext() {
  const {
    getContainer,
    rtl,
    maxCount,
    top,
    bottom,
    showProgress,
    pauseOnHover
  } = defaultGlobalConfig;
  const mergedContainer = (getContainer === null || getContainer === void 0 ? void 0 : getContainer()) || document.body;
  return {
    getContainer: () => mergedContainer,
    rtl,
    maxCount,
    top,
    bottom,
    showProgress,
    pauseOnHover
  };
}
const GlobalHolder = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    notificationConfig,
    sync
  } = props;
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = defaultGlobalConfig.prefixCls || getPrefixCls("notification");
  const appConfig = reactExports.useContext(AppConfigContext);
  const [api2, holder] = useInternalNotification(Object.assign(Object.assign(Object.assign({}, notificationConfig), {
    prefixCls
  }), appConfig.notification));
  React.useEffect(sync, []);
  React.useImperativeHandle(ref, () => {
    const instance = Object.assign({}, api2);
    Object.keys(instance).forEach((method) => {
      instance[method] = (...args) => {
        sync();
        return api2[method].apply(api2, args);
      };
    });
    return {
      instance,
      sync
    };
  });
  return holder;
});
const GlobalHolderWrapper = /* @__PURE__ */ React.forwardRef((_, ref) => {
  const [notificationConfig, setNotificationConfig] = React.useState(getGlobalContext);
  const sync = () => {
    setNotificationConfig(getGlobalContext);
  };
  React.useEffect(sync, []);
  const global = globalConfig();
  const rootPrefixCls = global.getRootPrefixCls();
  const rootIconPrefixCls = global.getIconPrefixCls();
  const theme = global.getTheme();
  const dom = /* @__PURE__ */ React.createElement(GlobalHolder, {
    ref,
    sync,
    notificationConfig
  });
  return /* @__PURE__ */ React.createElement(ConfigProvider, {
    prefixCls: rootPrefixCls,
    iconPrefixCls: rootIconPrefixCls,
    theme
  }, global.holderRender ? global.holderRender(dom) : dom);
});
const flushNotificationQueue = () => {
  if (!notification) {
    const holderFragment = document.createDocumentFragment();
    const newNotification = {
      fragment: holderFragment
    };
    notification = newNotification;
    act(() => {
      const reactRender = unstableSetRender();
      reactRender(/* @__PURE__ */ React.createElement(GlobalHolderWrapper, {
        ref: (node) => {
          const {
            instance,
            sync
          } = node || {};
          Promise.resolve().then(() => {
            if (!newNotification.instance && instance) {
              newNotification.instance = instance;
              newNotification.sync = sync;
              flushNotificationQueue();
            }
          });
        }
      }), holderFragment);
    });
    return;
  }
  if (!notification.instance) {
    return;
  }
  taskQueue.forEach((task) => {
    switch (task.type) {
      case "open": {
        act(() => {
          notification.instance.open(Object.assign(Object.assign({}, defaultGlobalConfig), task.config));
        });
        break;
      }
      case "destroy":
        act(() => {
          var _a;
          (_a = notification === null || notification === void 0 ? void 0 : notification.instance) === null || _a === void 0 ? void 0 : _a.destroy(task.key);
        });
        break;
    }
  });
  taskQueue = [];
};
function setNotificationGlobalConfig(config) {
  defaultGlobalConfig = Object.assign(Object.assign({}, defaultGlobalConfig), config);
  act(() => {
    var _a;
    (_a = notification === null || notification === void 0 ? void 0 : notification.sync) === null || _a === void 0 ? void 0 : _a.call(notification);
  });
}
function open(config) {
  taskQueue.push({
    type: "open",
    config
  });
  flushNotificationQueue();
}
const destroy = (key) => {
  taskQueue.push({
    type: "destroy",
    key
  });
  flushNotificationQueue();
};
const methods = ["success", "info", "warning", "error"];
const baseStaticMethods = {
  open,
  destroy,
  config: setNotificationGlobalConfig,
  useNotification,
  _InternalPanelDoNotUseOrYouWillBeFired: PurePanel$8
};
const staticMethods = baseStaticMethods;
methods.forEach((type) => {
  staticMethods[type] = (config) => open(Object.assign(Object.assign({}, config), {
    type
  }));
});
function _createForOfIteratorHelper(r, e2) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e2) {
      t && (r = t);
      var _n2 = 0, F = function F2() {
      };
      return {
        s: F,
        n: function n() {
          return _n2 >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[_n2++]
          };
        },
        e: function e3(r2) {
          throw r2;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = true, u = false;
  return {
    s: function s() {
      t = t.call(r);
    },
    n: function n() {
      var r2 = t.next();
      return a = r2.done, r2;
    },
    e: function e3(r2) {
      u = true, o = r2;
    },
    f: function f() {
      try {
        a || null == t["return"] || t["return"]();
      } finally {
        if (u) throw o;
      }
    }
  };
}
var _class, _class2;
function appendBits(val, len, bb) {
  if (len < 0 || len > 31 || val >>> len != 0) {
    throw new RangeError("Value out of range");
  }
  for (var i = len - 1; i >= 0; i--) {
    bb.push(val >>> i & 1);
  }
}
function getBit(x, i) {
  return (x >>> i & 1) != 0;
}
function assert(cond) {
  if (!cond) {
    throw new Error("Assertion error");
  }
}
var Mode = /* @__PURE__ */ function() {
  function Mode2(modeBits, numBitsCharCount) {
    _classCallCheck(this, Mode2);
    _defineProperty(this, "modeBits", void 0);
    _defineProperty(this, "numBitsCharCount", void 0);
    this.modeBits = modeBits;
    this.numBitsCharCount = numBitsCharCount;
  }
  _createClass(Mode2, [{
    key: "numCharCountBits",
    value: function numCharCountBits(ver) {
      return this.numBitsCharCount[Math.floor((ver + 7) / 17)];
    }
  }]);
  return Mode2;
}();
_class = Mode;
_defineProperty(Mode, "NUMERIC", new _class(1, [10, 12, 14]));
_defineProperty(Mode, "ALPHANUMERIC", new _class(2, [9, 11, 13]));
_defineProperty(Mode, "BYTE", new _class(4, [8, 16, 16]));
_defineProperty(Mode, "KANJI", new _class(8, [8, 10, 12]));
_defineProperty(Mode, "ECI", new _class(7, [0, 0, 0]));
var Ecc = /* @__PURE__ */ _createClass(function Ecc2(ordinal, formatBits) {
  _classCallCheck(this, Ecc2);
  _defineProperty(this, "ordinal", void 0);
  _defineProperty(this, "formatBits", void 0);
  this.ordinal = ordinal;
  this.formatBits = formatBits;
});
_class2 = Ecc;
_defineProperty(Ecc, "LOW", new _class2(0, 1));
_defineProperty(Ecc, "MEDIUM", new _class2(1, 0));
_defineProperty(Ecc, "QUARTILE", new _class2(2, 3));
_defineProperty(Ecc, "HIGH", new _class2(3, 2));
var QrSegment = /* @__PURE__ */ function() {
  function QrSegment2(mode, numChars, bitData) {
    _classCallCheck(this, QrSegment2);
    _defineProperty(this, "mode", void 0);
    _defineProperty(this, "numChars", void 0);
    _defineProperty(this, "bitData", void 0);
    this.mode = mode;
    this.numChars = numChars;
    this.bitData = bitData;
    if (numChars < 0) {
      throw new RangeError("Invalid argument");
    }
    this.bitData = bitData.slice();
  }
  _createClass(QrSegment2, [{
    key: "getData",
    value: function getData() {
      return this.bitData.slice();
    }
    // (Package-private) Calculates and returns the number of bits needed to encode the given segments at
    // the given version. The result is infinity if a segment has too many characters to fit its length field.
  }], [{
    key: "makeBytes",
    value: (
      /*-- Static factory functions (mid level) --*/
      // Returns a segment representing the given binary data encoded in
      // byte mode. All input byte arrays are acceptable. Any text string
      // can be converted to UTF-8 bytes and encoded as a byte mode segment.
      function makeBytes(data) {
        var bb = [];
        var _iterator = _createForOfIteratorHelper(data), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var b = _step.value;
            appendBits(b, 8, bb);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return new QrSegment2(Mode.BYTE, data.length, bb);
      }
    )
    // Returns a segment representing the given string of decimal digits encoded in numeric mode.
  }, {
    key: "makeNumeric",
    value: function makeNumeric(digits) {
      if (!QrSegment2.isNumeric(digits)) {
        throw new RangeError("String contains non-numeric characters");
      }
      var bb = [];
      for (var i = 0; i < digits.length; ) {
        var n = Math.min(digits.length - i, 3);
        appendBits(parseInt(digits.substring(i, i + n), 10), n * 3 + 1, bb);
        i += n;
      }
      return new QrSegment2(Mode.NUMERIC, digits.length, bb);
    }
    // Returns a segment representing the given text string encoded in alphanumeric mode.
    // The characters allowed are: 0 to 9, A to Z (uppercase only), space,
    // dollar, percent, asterisk, plus, hyphen, period, slash, colon.
  }, {
    key: "makeAlphanumeric",
    value: function makeAlphanumeric(text) {
      if (!QrSegment2.isAlphanumeric(text)) {
        throw new RangeError("String contains unencodable characters in alphanumeric mode");
      }
      var bb = [];
      var i;
      for (i = 0; i + 2 <= text.length; i += 2) {
        var temp = QrSegment2.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)) * 45;
        temp += QrSegment2.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i + 1));
        appendBits(temp, 11, bb);
      }
      if (i < text.length) {
        appendBits(QrSegment2.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)), 6, bb);
      }
      return new QrSegment2(Mode.ALPHANUMERIC, text.length, bb);
    }
    // Returns a new mutable list of zero or more segments to represent the given Unicode text string.
    // The result may use various segment modes and switch modes to optimize the length of the bit stream.
  }, {
    key: "makeSegments",
    value: function makeSegments(text) {
      if (text == "") {
        return [];
      } else if (QrSegment2.isNumeric(text)) {
        return [QrSegment2.makeNumeric(text)];
      } else if (QrSegment2.isAlphanumeric(text)) {
        return [QrSegment2.makeAlphanumeric(text)];
      } else {
        return [QrSegment2.makeBytes(QrSegment2.toUtf8ByteArray(text))];
      }
    }
    // Returns a segment representing an Extended Channel Interpretation
    // (ECI) designator with the given assignment value.
  }, {
    key: "makeEci",
    value: function makeEci(assignVal) {
      var bb = [];
      if (assignVal < 0) {
        throw new RangeError("ECI assignment value out of range");
      } else if (assignVal < 1 << 7) {
        appendBits(assignVal, 8, bb);
      } else if (assignVal < 1 << 14) {
        appendBits(2, 2, bb);
        appendBits(assignVal, 14, bb);
      } else if (assignVal < 1e6) {
        appendBits(6, 3, bb);
        appendBits(assignVal, 21, bb);
      } else {
        throw new RangeError("ECI assignment value out of range");
      }
      return new QrSegment2(Mode.ECI, 0, bb);
    }
    // Tests whether the given string can be encoded as a segment in numeric mode.
    // A string is encodable iff each character is in the range 0 to 9.
  }, {
    key: "isNumeric",
    value: function isNumeric(text) {
      return QrSegment2.NUMERIC_REGEX.test(text);
    }
    // Tests whether the given string can be encoded as a segment in alphanumeric mode.
    // A string is encodable iff each character is in the following set: 0 to 9, A to Z
    // (uppercase only), space, dollar, percent, asterisk, plus, hyphen, period, slash, colon.
  }, {
    key: "isAlphanumeric",
    value: function isAlphanumeric(text) {
      return QrSegment2.ALPHANUMERIC_REGEX.test(text);
    }
  }, {
    key: "getTotalBits",
    value: function getTotalBits(segs, version2) {
      var result = 0;
      var _iterator2 = _createForOfIteratorHelper(segs), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var seg = _step2.value;
          var ccbits = seg.mode.numCharCountBits(version2);
          if (seg.numChars >= 1 << ccbits) {
            return Infinity;
          }
          result += 4 + ccbits + seg.bitData.length;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return result;
    }
    // Returns a new array of bytes representing the given string encoded in UTF-8.
  }, {
    key: "toUtf8ByteArray",
    value: function toUtf8ByteArray(input) {
      var str = encodeURI(input);
      var result = [];
      for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) != "%") {
          result.push(str.charCodeAt(i));
        } else {
          result.push(parseInt(str.substring(i + 1, i + 3), 16));
          i += 2;
        }
      }
      return result;
    }
    /*-- Constants --*/
    // Describes precisely all strings that are encodable in numeric mode.
  }]);
  return QrSegment2;
}();
_defineProperty(QrSegment, "NUMERIC_REGEX", /^[0-9]*$/);
_defineProperty(QrSegment, "ALPHANUMERIC_REGEX", /^[A-Z0-9 $%*+.\/:-]*$/);
_defineProperty(QrSegment, "ALPHANUMERIC_CHARSET", "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:");
var QrCode = /* @__PURE__ */ function() {
  function QrCode2(version2, errorCorrectionLevel, dataCodewords, oriMsk) {
    _classCallCheck(this, QrCode2);
    _defineProperty(this, "size", void 0);
    _defineProperty(this, "mask", void 0);
    _defineProperty(this, "modules", []);
    _defineProperty(this, "isFunction", []);
    _defineProperty(this, "version", void 0);
    _defineProperty(this, "errorCorrectionLevel", void 0);
    var msk = oriMsk;
    this.version = version2;
    this.errorCorrectionLevel = errorCorrectionLevel;
    if (version2 < QrCode2.MIN_VERSION || version2 > QrCode2.MAX_VERSION) {
      throw new RangeError("Version value out of range");
    }
    if (msk < -1 || msk > 7) {
      throw new RangeError("Mask value out of range");
    }
    this.size = version2 * 4 + 17;
    var row = [];
    for (var i = 0; i < this.size; i++) {
      row.push(false);
    }
    for (var _i = 0; _i < this.size; _i++) {
      this.modules.push(row.slice());
      this.isFunction.push(row.slice());
    }
    this.drawFunctionPatterns();
    var allCodewords = this.addEccAndInterleave(dataCodewords);
    this.drawCodewords(allCodewords);
    if (msk == -1) {
      var minPenalty = 1e9;
      for (var _i2 = 0; _i2 < 8; _i2++) {
        this.applyMask(_i2);
        this.drawFormatBits(_i2);
        var penalty = this.getPenaltyScore();
        if (penalty < minPenalty) {
          msk = _i2;
          minPenalty = penalty;
        }
        this.applyMask(_i2);
      }
    }
    assert(0 <= msk && msk <= 7);
    this.mask = msk;
    this.applyMask(msk);
    this.drawFormatBits(msk);
    this.isFunction = [];
  }
  _createClass(QrCode2, [{
    key: "getModule",
    value: function getModule(x, y) {
      return 0 <= x && x < this.size && 0 <= y && y < this.size && this.modules[y][x];
    }
    // Modified to expose modules for easy access
  }, {
    key: "getModules",
    value: function getModules() {
      return this.modules;
    }
    /*-- Private helper methods for constructor: Drawing function modules --*/
    // Reads this object's version field, and draws and marks all function modules.
  }, {
    key: "drawFunctionPatterns",
    value: function drawFunctionPatterns() {
      for (var i = 0; i < this.size; i++) {
        this.setFunctionModule(6, i, i % 2 == 0);
        this.setFunctionModule(i, 6, i % 2 == 0);
      }
      this.drawFinderPattern(3, 3);
      this.drawFinderPattern(this.size - 4, 3);
      this.drawFinderPattern(3, this.size - 4);
      var alignPatPos = this.getAlignmentPatternPositions();
      var numAlign = alignPatPos.length;
      for (var _i3 = 0; _i3 < numAlign; _i3++) {
        for (var j = 0; j < numAlign; j++) {
          if (!(_i3 == 0 && j == 0 || _i3 == 0 && j == numAlign - 1 || _i3 == numAlign - 1 && j == 0)) {
            this.drawAlignmentPattern(alignPatPos[_i3], alignPatPos[j]);
          }
        }
      }
      this.drawFormatBits(0);
      this.drawVersion();
    }
    // Draws two copies of the format bits (with its own error correction code)
    // based on the given mask and this object's error correction level field.
  }, {
    key: "drawFormatBits",
    value: function drawFormatBits(mask) {
      var data = this.errorCorrectionLevel.formatBits << 3 | mask;
      var rem = data;
      for (var i = 0; i < 10; i++) {
        rem = rem << 1 ^ (rem >>> 9) * 1335;
      }
      var bits = (data << 10 | rem) ^ 21522;
      assert(bits >>> 15 == 0);
      for (var _i4 = 0; _i4 <= 5; _i4++) {
        this.setFunctionModule(8, _i4, getBit(bits, _i4));
      }
      this.setFunctionModule(8, 7, getBit(bits, 6));
      this.setFunctionModule(8, 8, getBit(bits, 7));
      this.setFunctionModule(7, 8, getBit(bits, 8));
      for (var _i5 = 9; _i5 < 15; _i5++) {
        this.setFunctionModule(14 - _i5, 8, getBit(bits, _i5));
      }
      for (var _i6 = 0; _i6 < 8; _i6++) {
        this.setFunctionModule(this.size - 1 - _i6, 8, getBit(bits, _i6));
      }
      for (var _i7 = 8; _i7 < 15; _i7++) {
        this.setFunctionModule(8, this.size - 15 + _i7, getBit(bits, _i7));
      }
      this.setFunctionModule(8, this.size - 8, true);
    }
    // Draws two copies of the version bits (with its own error correction code),
    // based on this object's version field, iff 7 <= version <= 40.
  }, {
    key: "drawVersion",
    value: function drawVersion() {
      if (this.version < 7) {
        return;
      }
      var rem = this.version;
      for (var i = 0; i < 12; i++) {
        rem = rem << 1 ^ (rem >>> 11) * 7973;
      }
      var bits = this.version << 12 | rem;
      assert(bits >>> 18 == 0);
      for (var _i8 = 0; _i8 < 18; _i8++) {
        var color = getBit(bits, _i8);
        var a = this.size - 11 + _i8 % 3;
        var b = Math.floor(_i8 / 3);
        this.setFunctionModule(a, b, color);
        this.setFunctionModule(b, a, color);
      }
    }
    // Draws a 9*9 finder pattern including the border separator,
    // with the center module at (x, y). Modules can be out of bounds.
  }, {
    key: "drawFinderPattern",
    value: function drawFinderPattern(x, y) {
      for (var dy = -4; dy <= 4; dy++) {
        for (var dx = -4; dx <= 4; dx++) {
          var dist = Math.max(Math.abs(dx), Math.abs(dy));
          var xx = x + dx;
          var yy = y + dy;
          if (0 <= xx && xx < this.size && 0 <= yy && yy < this.size) {
            this.setFunctionModule(xx, yy, dist != 2 && dist != 4);
          }
        }
      }
    }
    // Draws a 5*5 alignment pattern, with the center module
    // at (x, y). All modules must be in bounds.
  }, {
    key: "drawAlignmentPattern",
    value: function drawAlignmentPattern(x, y) {
      for (var dy = -2; dy <= 2; dy++) {
        for (var dx = -2; dx <= 2; dx++) this.setFunctionModule(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) != 1);
      }
    }
    // Sets the color of a module and marks it as a function module.
    // Only used by the constructor. Coordinates must be in bounds.
  }, {
    key: "setFunctionModule",
    value: function setFunctionModule(x, y, isDark) {
      this.modules[y][x] = isDark;
      this.isFunction[y][x] = true;
    }
    /*-- Private helper methods for constructor: Codewords and masking --*/
    // Returns a new byte string representing the given data with the appropriate error correction
    // codewords appended to it, based on this object's version and error correction level.
  }, {
    key: "addEccAndInterleave",
    value: function addEccAndInterleave(data) {
      var ver = this.version;
      var ecl = this.errorCorrectionLevel;
      if (data.length != QrCode2.getNumDataCodewords(ver, ecl)) {
        throw new RangeError("Invalid argument");
      }
      var numBlocks = QrCode2.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
      var blockEccLen = QrCode2.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver];
      var rawCodewords = Math.floor(QrCode2.getNumRawDataModules(ver) / 8);
      var numShortBlocks = numBlocks - rawCodewords % numBlocks;
      var shortBlockLen = Math.floor(rawCodewords / numBlocks);
      var blocks = [];
      var rsDiv = QrCode2.reedSolomonComputeDivisor(blockEccLen);
      for (var i = 0, k = 0; i < numBlocks; i++) {
        var dat = data.slice(k, k + shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1));
        k += dat.length;
        var ecc = QrCode2.reedSolomonComputeRemainder(dat, rsDiv);
        if (i < numShortBlocks) {
          dat.push(0);
        }
        blocks.push(dat.concat(ecc));
      }
      var result = [];
      var _loop = function _loop2(_i92) {
        blocks.forEach(function(block, j) {
          if (_i92 != shortBlockLen - blockEccLen || j >= numShortBlocks) {
            result.push(block[_i92]);
          }
        });
      };
      for (var _i9 = 0; _i9 < blocks[0].length; _i9++) {
        _loop(_i9);
      }
      assert(result.length == rawCodewords);
      return result;
    }
    // Draws the given sequence of 8-bit codewords (data and error correction) onto the entire
    // data area of this QR Code. Function modules need to be marked off before this is called.
  }, {
    key: "drawCodewords",
    value: function drawCodewords(data) {
      if (data.length != Math.floor(QrCode2.getNumRawDataModules(this.version) / 8)) {
        throw new RangeError("Invalid argument");
      }
      var i = 0;
      for (var right = this.size - 1; right >= 1; right -= 2) {
        if (right == 6) {
          right = 5;
        }
        for (var vert = 0; vert < this.size; vert++) {
          for (var j = 0; j < 2; j++) {
            var x = right - j;
            var upward = (right + 1 & 2) == 0;
            var y = upward ? this.size - 1 - vert : vert;
            if (!this.isFunction[y][x] && i < data.length * 8) {
              this.modules[y][x] = getBit(data[i >>> 3], 7 - (i & 7));
              i++;
            }
          }
        }
      }
      assert(i == data.length * 8);
    }
    // XORs the codeword modules in this QR Code with the given mask pattern.
    // The function modules must be marked and the codeword bits must be drawn
    // before masking. Due to the arithmetic of XOR, calling applyMask() with
    // the same mask value a second time will undo the mask. A final well-formed
    // QR Code needs exactly one (not zero, two, etc.) mask applied.
  }, {
    key: "applyMask",
    value: function applyMask(mask) {
      if (mask < 0 || mask > 7) {
        throw new RangeError("Mask value out of range");
      }
      for (var y = 0; y < this.size; y++) {
        for (var x = 0; x < this.size; x++) {
          var invert = void 0;
          switch (mask) {
            case 0:
              invert = (x + y) % 2 == 0;
              break;
            case 1:
              invert = y % 2 == 0;
              break;
            case 2:
              invert = x % 3 == 0;
              break;
            case 3:
              invert = (x + y) % 3 == 0;
              break;
            case 4:
              invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 == 0;
              break;
            case 5:
              invert = x * y % 2 + x * y % 3 == 0;
              break;
            case 6:
              invert = (x * y % 2 + x * y % 3) % 2 == 0;
              break;
            case 7:
              invert = ((x + y) % 2 + x * y % 3) % 2 == 0;
              break;
            default:
              throw new Error("Unreachable");
          }
          if (!this.isFunction[y][x] && invert) {
            this.modules[y][x] = !this.modules[y][x];
          }
        }
      }
    }
    // Calculates and returns the penalty score based on state of this QR Code's current modules.
    // This is used by the automatic mask choice algorithm to find the mask pattern that yields the lowest score.
  }, {
    key: "getPenaltyScore",
    value: function getPenaltyScore() {
      var result = 0;
      for (var y = 0; y < this.size; y++) {
        var runColor = false;
        var runX = 0;
        var runHistory = [0, 0, 0, 0, 0, 0, 0];
        for (var x = 0; x < this.size; x++) {
          if (this.modules[y][x] == runColor) {
            runX++;
            if (runX == 5) {
              result += QrCode2.PENALTY_N1;
            } else if (runX > 5) {
              result++;
            }
          } else {
            this.finderPenaltyAddHistory(runX, runHistory);
            if (!runColor) {
              result += this.finderPenaltyCountPatterns(runHistory) * QrCode2.PENALTY_N3;
            }
            runColor = this.modules[y][x];
            runX = 1;
          }
        }
        result += this.finderPenaltyTerminateAndCount(runColor, runX, runHistory) * QrCode2.PENALTY_N3;
      }
      for (var _x = 0; _x < this.size; _x++) {
        var _runColor = false;
        var runY = 0;
        var _runHistory = [0, 0, 0, 0, 0, 0, 0];
        for (var _y = 0; _y < this.size; _y++) {
          if (this.modules[_y][_x] == _runColor) {
            runY++;
            if (runY == 5) {
              result += QrCode2.PENALTY_N1;
            } else if (runY > 5) {
              result++;
            }
          } else {
            this.finderPenaltyAddHistory(runY, _runHistory);
            if (!_runColor) {
              result += this.finderPenaltyCountPatterns(_runHistory) * QrCode2.PENALTY_N3;
            }
            _runColor = this.modules[_y][_x];
            runY = 1;
          }
        }
        result += this.finderPenaltyTerminateAndCount(_runColor, runY, _runHistory) * QrCode2.PENALTY_N3;
      }
      for (var _y2 = 0; _y2 < this.size - 1; _y2++) {
        for (var _x2 = 0; _x2 < this.size - 1; _x2++) {
          var color = this.modules[_y2][_x2];
          if (color == this.modules[_y2][_x2 + 1] && color == this.modules[_y2 + 1][_x2] && color == this.modules[_y2 + 1][_x2 + 1]) {
            result += QrCode2.PENALTY_N2;
          }
        }
      }
      var dark = 0;
      var _iterator3 = _createForOfIteratorHelper(this.modules), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var row = _step3.value;
          dark = row.reduce(function(sum, color2) {
            return sum + (color2 ? 1 : 0);
          }, dark);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      var total = this.size * this.size;
      var k = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
      assert(0 <= k && k <= 9);
      result += k * QrCode2.PENALTY_N4;
      assert(0 <= result && result <= 2568888);
      return result;
    }
    /*-- Private helper functions --*/
    // Returns an ascending list of positions of alignment patterns for this version number.
    // Each position is in the range [0,177), and are used on both the x and y axes.
    // This could be implemented as lookup table of 40 variable-length lists of numberegers.
  }, {
    key: "getAlignmentPatternPositions",
    value: function getAlignmentPatternPositions() {
      if (this.version == 1) {
        return [];
      } else {
        var numAlign = Math.floor(this.version / 7) + 2;
        var step = this.version == 32 ? 26 : Math.ceil((this.version * 4 + 4) / (numAlign * 2 - 2)) * 2;
        var result = [6];
        for (var pos = this.size - 7; result.length < numAlign; pos -= step) {
          result.splice(1, 0, pos);
        }
        return result;
      }
    }
    // Returns the number of data bits that can be stored in a QR Code of the given version number, after
    // all function modules are excluded. This includes remainder bits, so it might not be a multiple of 8.
    // The result is in the range [208, 29648]. This could be implemented as a 40-entry lookup table.
  }, {
    key: "finderPenaltyCountPatterns",
    value: (
      // Can only be called immediately after a light run is added, and
      // returns either 0, 1, or 2. A helper function for getPenaltyScore().
      function finderPenaltyCountPatterns(runHistory) {
        var n = runHistory[1];
        assert(n <= this.size * 3);
        var core = n > 0 && runHistory[2] == n && runHistory[3] == n * 3 && runHistory[4] == n && runHistory[5] == n;
        return (core && runHistory[0] >= n * 4 && runHistory[6] >= n ? 1 : 0) + (core && runHistory[6] >= n * 4 && runHistory[0] >= n ? 1 : 0);
      }
    )
    // Must be called at the end of a line (row or column) of modules. A helper function for getPenaltyScore().
  }, {
    key: "finderPenaltyTerminateAndCount",
    value: function finderPenaltyTerminateAndCount(currentRunColor, oriCurrentRunLength, runHistory) {
      var currentRunLength = oriCurrentRunLength;
      if (currentRunColor) {
        this.finderPenaltyAddHistory(currentRunLength, runHistory);
        currentRunLength = 0;
      }
      currentRunLength += this.size;
      this.finderPenaltyAddHistory(currentRunLength, runHistory);
      return this.finderPenaltyCountPatterns(runHistory);
    }
    // Pushes the given value to the front and drops the last value. A helper function for getPenaltyScore().
  }, {
    key: "finderPenaltyAddHistory",
    value: function finderPenaltyAddHistory(oriCurrentRunLength, runHistory) {
      var currentRunLength = oriCurrentRunLength;
      if (runHistory[0] == 0) {
        currentRunLength += this.size;
      }
      runHistory.pop();
      runHistory.unshift(currentRunLength);
    }
    /*-- Constants and tables --*/
    // The minimum version number supported in the QR Code Model 2 standard.
  }], [{
    key: "encodeText",
    value: (
      /*-- Static factory functions (high level) --*/
      // Returns a QR Code representing the given Unicode text string at the given error correction level.
      // As a conservative upper bound, this function is guaranteed to succeed for strings that have 738 or fewer
      // Unicode code ponumbers (not UTF-16 code units) if the low error correction level is used. The smallest possible
      // QR Code version is automatically chosen for the output. The ECC level of the result may be higher than the
      // ecl argument if it can be done without increasing the version.
      function encodeText(text, ecl) {
        var segs = QrSegment.makeSegments(text);
        return QrCode2.encodeSegments(segs, ecl);
      }
    )
    // Returns a QR Code representing the given binary data at the given error correction level.
    // This function always encodes using the binary segment mode, not any text mode. The maximum number of
    // bytes allowed is 2953. The smallest possible QR Code version is automatically chosen for the output.
    // The ECC level of the result may be higher than the ecl argument if it can be done without increasing the version.
  }, {
    key: "encodeBinary",
    value: function encodeBinary(data, ecl) {
      var seg = QrSegment.makeBytes(data);
      return QrCode2.encodeSegments([seg], ecl);
    }
    /*-- Static factory functions (mid level) --*/
    // Returns a QR Code representing the given segments with the given encoding parameters.
    // The smallest possible QR Code version within the given range is automatically
    // chosen for the output. Iff boostEcl is true, then the ECC level of the result
    // may be higher than the ecl argument if it can be done without increasing the
    // version. The mask number is either between 0 to 7 (inclusive) to force that
    // mask, or -1 to automatically choose an appropriate mask (which may be slow).
    // This function allows the user to create a custom sequence of segments that switches
    // between modes (such as alphanumeric and byte) to encode text in less space.
    // This is a mid-level API; the high-level API is encodeText() and encodeBinary().
  }, {
    key: "encodeSegments",
    value: function encodeSegments(segs, oriEcl) {
      var minVersion = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
      var maxVersion = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 40;
      var mask = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : -1;
      var boostEcl = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : true;
      if (!(QrCode2.MIN_VERSION <= minVersion && minVersion <= maxVersion && maxVersion <= QrCode2.MAX_VERSION) || mask < -1 || mask > 7) {
        throw new RangeError("Invalid value");
      }
      var version2;
      var dataUsedBits;
      for (version2 = minVersion; ; version2++) {
        var _dataCapacityBits = QrCode2.getNumDataCodewords(version2, oriEcl) * 8;
        var usedBits = QrSegment.getTotalBits(segs, version2);
        if (usedBits <= _dataCapacityBits) {
          dataUsedBits = usedBits;
          break;
        }
        if (version2 >= maxVersion) {
          throw new RangeError("Data too long");
        }
      }
      var ecl = oriEcl;
      for (var _i10 = 0, _arr = [Ecc.MEDIUM, Ecc.QUARTILE, Ecc.HIGH]; _i10 < _arr.length; _i10++) {
        var newEcl = _arr[_i10];
        if (boostEcl && dataUsedBits <= QrCode2.getNumDataCodewords(version2, newEcl) * 8) {
          ecl = newEcl;
        }
      }
      var bb = [];
      var _iterator4 = _createForOfIteratorHelper(segs), _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
          var seg = _step4.value;
          appendBits(seg.mode.modeBits, 4, bb);
          appendBits(seg.numChars, seg.mode.numCharCountBits(version2), bb);
          var _iterator5 = _createForOfIteratorHelper(seg.getData()), _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
              var b = _step5.value;
              bb.push(b);
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      assert(bb.length == dataUsedBits);
      var dataCapacityBits = QrCode2.getNumDataCodewords(version2, ecl) * 8;
      assert(bb.length <= dataCapacityBits);
      appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb);
      appendBits(0, (8 - bb.length % 8) % 8, bb);
      assert(bb.length % 8 == 0);
      for (var padByte = 236; bb.length < dataCapacityBits; padByte ^= 236 ^ 17) {
        appendBits(padByte, 8, bb);
      }
      var dataCodewords = [];
      while (dataCodewords.length * 8 < bb.length) {
        dataCodewords.push(0);
      }
      bb.forEach(function(b2, i) {
        dataCodewords[i >>> 3] |= b2 << 7 - (i & 7);
      });
      return new QrCode2(version2, ecl, dataCodewords, mask);
    }
  }, {
    key: "getNumRawDataModules",
    value: function getNumRawDataModules(ver) {
      if (ver < QrCode2.MIN_VERSION || ver > QrCode2.MAX_VERSION) {
        throw new RangeError("Version number out of range");
      }
      var result = (16 * ver + 128) * ver + 64;
      if (ver >= 2) {
        var numAlign = Math.floor(ver / 7) + 2;
        result -= (25 * numAlign - 10) * numAlign - 55;
        if (ver >= 7) {
          result -= 36;
        }
      }
      assert(208 <= result && result <= 29648);
      return result;
    }
    // Returns the number of 8-bit data (i.e. not error correction) codewords contained in any
    // QR Code of the given version number and error correction level, with remainder bits discarded.
    // This stateless pure function could be implemented as a (40*4)-cell lookup table.
  }, {
    key: "getNumDataCodewords",
    value: function getNumDataCodewords(ver, ecl) {
      return Math.floor(QrCode2.getNumRawDataModules(ver) / 8) - QrCode2.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver] * QrCode2.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
    }
    // Returns a Reed-Solomon ECC generator polynomial for the given degree. This could be
    // implemented as a lookup table over all possible parameter values, instead of as an algorithm.
  }, {
    key: "reedSolomonComputeDivisor",
    value: function reedSolomonComputeDivisor(degree) {
      if (degree < 1 || degree > 255) {
        throw new RangeError("Degree out of range");
      }
      var result = [];
      for (var i = 0; i < degree - 1; i++) {
        result.push(0);
      }
      result.push(1);
      var root = 1;
      for (var _i11 = 0; _i11 < degree; _i11++) {
        for (var j = 0; j < result.length; j++) {
          result[j] = QrCode2.reedSolomonMultiply(result[j], root);
          if (j + 1 < result.length) {
            result[j] ^= result[j + 1];
          }
        }
        root = QrCode2.reedSolomonMultiply(root, 2);
      }
      return result;
    }
    // Returns the Reed-Solomon error correction codeword for the given data and divisor polynomials.
  }, {
    key: "reedSolomonComputeRemainder",
    value: function reedSolomonComputeRemainder(data, divisor) {
      var result = divisor.map(function() {
        return 0;
      });
      var _iterator6 = _createForOfIteratorHelper(data), _step6;
      try {
        var _loop2 = function _loop22() {
          var b = _step6.value;
          var factor = b ^ result.shift();
          result.push(0);
          divisor.forEach(function(coef, i) {
            result[i] ^= QrCode2.reedSolomonMultiply(coef, factor);
          });
        };
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
          _loop2();
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      return result;
    }
    // Returns the product of the two given field elements modulo GF(2^8/0x11D). The arguments and result
    // are unsigned 8-bit numberegers. This could be implemented as a lookup table of 256*256 entries of unumber8.
  }, {
    key: "reedSolomonMultiply",
    value: function reedSolomonMultiply(x, y) {
      if (x >>> 8 != 0 || y >>> 8 != 0) {
        throw new RangeError("Byte out of range");
      }
      var z = 0;
      for (var i = 7; i >= 0; i--) {
        z = z << 1 ^ (z >>> 7) * 285;
        z ^= (y >>> i & 1) * x;
      }
      assert(z >>> 8 == 0);
      return z;
    }
  }]);
  return QrCode2;
}();
_defineProperty(QrCode, "MIN_VERSION", 1);
_defineProperty(QrCode, "MAX_VERSION", 40);
_defineProperty(QrCode, "PENALTY_N1", 3);
_defineProperty(QrCode, "PENALTY_N2", 3);
_defineProperty(QrCode, "PENALTY_N3", 40);
_defineProperty(QrCode, "PENALTY_N4", 10);
_defineProperty(QrCode, "ECC_CODEWORDS_PER_BLOCK", [
  // Version: (note that index 0 is for padding, and is set to an illegal value)
  //0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40    Error correction level
  [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  // Low
  [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
  // Medium
  [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  // Quartile
  [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
  // High
]);
_defineProperty(QrCode, "NUM_ERROR_CORRECTION_BLOCKS", [
  // Version: (note that index 0 is for padding, and is set to an illegal value)
  //0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40    Error correction level
  [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
  // Low
  [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
  // Medium
  [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
  // Quartile
  [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
  // High
]);
var ERROR_LEVEL_MAP = {
  L: Ecc.LOW,
  M: Ecc.MEDIUM,
  Q: Ecc.QUARTILE,
  H: Ecc.HIGH
};
var DEFAULT_SIZE = 128;
var DEFAULT_LEVEL = "L";
var DEFAULT_BACKGROUND_COLOR = "#FFFFFF";
var DEFAULT_FRONT_COLOR = "#000000";
var DEFAULT_NEED_MARGIN = false;
var DEFAULT_MINVERSION = 1;
var SPEC_MARGIN_SIZE = 4;
var DEFAULT_MARGIN_SIZE = 0;
var DEFAULT_IMG_SCALE = 0.1;
var generatePath = function generatePath2(modules) {
  var margin = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var ops = [];
  modules.forEach(function(row, y) {
    var start = null;
    row.forEach(function(cell, x) {
      if (!cell && start !== null) {
        ops.push("M".concat(start + margin, " ").concat(y + margin, "h").concat(x - start, "v1H").concat(start + margin, "z"));
        start = null;
        return;
      }
      if (x === row.length - 1) {
        if (!cell) {
          return;
        }
        if (start === null) {
          ops.push("M".concat(x + margin, ",").concat(y + margin, " h1v1H").concat(x + margin, "z"));
        } else {
          ops.push("M".concat(start + margin, ",").concat(y + margin, " h").concat(x + 1 - start, "v1H").concat(start + margin, "z"));
        }
        return;
      }
      if (cell && start === null) {
        start = x;
      }
    });
  });
  return ops.join("");
};
var excavateModules = function excavateModules2(modules, excavation) {
  return modules.slice().map(function(row, y) {
    if (y < excavation.y || y >= excavation.y + excavation.h) {
      return row;
    }
    return row.map(function(cell, x) {
      if (x < excavation.x || x >= excavation.x + excavation.w) {
        return cell;
      }
      return false;
    });
  });
};
var getImageSettings = function getImageSettings2(cells, size, margin, imageSettings) {
  if (imageSettings == null) {
    return null;
  }
  var numCells = cells.length + margin * 2;
  var defaultSize = Math.floor(size * DEFAULT_IMG_SCALE);
  var scale = numCells / size;
  var w = (imageSettings.width || defaultSize) * scale;
  var h = (imageSettings.height || defaultSize) * scale;
  var x = imageSettings.x == null ? cells.length / 2 - w / 2 : imageSettings.x * scale;
  var y = imageSettings.y == null ? cells.length / 2 - h / 2 : imageSettings.y * scale;
  var opacity = imageSettings.opacity == null ? 1 : imageSettings.opacity;
  var excavation = null;
  if (imageSettings.excavate) {
    var floorX = Math.floor(x);
    var floorY = Math.floor(y);
    var ceilW = Math.ceil(w + x - floorX);
    var ceilH = Math.ceil(h + y - floorY);
    excavation = {
      x: floorX,
      y: floorY,
      w: ceilW,
      h: ceilH
    };
  }
  var crossOrigin = imageSettings.crossOrigin;
  return {
    x,
    y,
    h,
    w,
    excavation,
    opacity,
    crossOrigin
  };
};
var getMarginSize = function getMarginSize2(needMargin, marginSize) {
  if (marginSize != null) {
    return Math.max(Math.floor(marginSize), 0);
  }
  return needMargin ? SPEC_MARGIN_SIZE : DEFAULT_MARGIN_SIZE;
};
var isSupportPath2d = function() {
  try {
    new Path2D().addPath(new Path2D());
  } catch (_unused) {
    return false;
  }
  return true;
}();
var useQRCode = function useQRCode2(opt) {
  var value = opt.value, level = opt.level, minVersion = opt.minVersion, includeMargin = opt.includeMargin, marginSize = opt.marginSize, imageSettings = opt.imageSettings, size = opt.size, boostLevel = opt.boostLevel;
  var memoizedQrcode = React.useMemo(function() {
    var values = Array.isArray(value) ? value : [value];
    var segments = values.reduce(function(acc, val) {
      acc.push.apply(acc, _toConsumableArray(QrSegment.makeSegments(val)));
      return acc;
    }, []);
    return QrCode.encodeSegments(segments, ERROR_LEVEL_MAP[level], minVersion, void 0, void 0, boostLevel);
  }, [value, level, minVersion, boostLevel]);
  return React.useMemo(function() {
    var cs = memoizedQrcode.getModules();
    var mg = getMarginSize(includeMargin, marginSize);
    var ncs = cs.length + mg * 2;
    var cis = getImageSettings(cs, size, mg, imageSettings);
    return {
      cells: cs,
      margin: mg,
      numCells: ncs,
      calculatedImageSettings: cis,
      qrcode: memoizedQrcode
    };
  }, [memoizedQrcode, size, imageSettings, includeMargin, marginSize]);
};
var _excluded$7 = ["value", "size", "level", "bgColor", "fgColor", "includeMargin", "minVersion", "marginSize", "style", "imageSettings", "boostLevel"];
var QRCodeCanvas = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  var value = props.value, _props$size = props.size, size = _props$size === void 0 ? DEFAULT_SIZE : _props$size, _props$level = props.level, level = _props$level === void 0 ? DEFAULT_LEVEL : _props$level, _props$bgColor = props.bgColor, bgColor = _props$bgColor === void 0 ? DEFAULT_BACKGROUND_COLOR : _props$bgColor, _props$fgColor = props.fgColor, fgColor = _props$fgColor === void 0 ? DEFAULT_FRONT_COLOR : _props$fgColor, _props$includeMargin = props.includeMargin, includeMargin = _props$includeMargin === void 0 ? DEFAULT_NEED_MARGIN : _props$includeMargin, _props$minVersion = props.minVersion, minVersion = _props$minVersion === void 0 ? DEFAULT_MINVERSION : _props$minVersion, marginSize = props.marginSize, style = props.style, imageSettings = props.imageSettings, boostLevel = props.boostLevel, otherProps = _objectWithoutProperties(props, _excluded$7);
  var imgSrc = imageSettings === null || imageSettings === void 0 ? void 0 : imageSettings.src;
  var _canvas = React.useRef(null);
  var _image = React.useRef(null);
  var setCanvasRef = React.useCallback(function(node) {
    _canvas.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }, [ref]);
  var _React$useState = React.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), setIsImageLoaded = _React$useState2[1];
  var _useQRCode = useQRCode({
    value,
    level,
    minVersion,
    includeMargin,
    marginSize,
    imageSettings,
    size,
    boostLevel
  }), margin = _useQRCode.margin, cells = _useQRCode.cells, numCells = _useQRCode.numCells, calculatedImageSettings = _useQRCode.calculatedImageSettings;
  React.useEffect(function() {
    if (_canvas.current) {
      var canvas = _canvas.current;
      var ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      var cellsToDraw = cells;
      var image = _image.current;
      var haveImageToRender = calculatedImageSettings != null && image !== null && image.complete && image.naturalHeight !== 0 && image.naturalWidth !== 0;
      if (haveImageToRender) {
        if (calculatedImageSettings.excavation != null) {
          cellsToDraw = excavateModules(cells, calculatedImageSettings.excavation);
        }
      }
      var pixelRatio = window.devicePixelRatio || 1;
      canvas.height = canvas.width = size * pixelRatio;
      var scale = size / numCells * pixelRatio;
      ctx.scale(scale, scale);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, numCells, numCells);
      ctx.fillStyle = fgColor;
      if (isSupportPath2d) {
        ctx.fill(new Path2D(generatePath(cellsToDraw, margin)));
      } else {
        cells.forEach(function(row, rdx) {
          row.forEach(function(cell, cdx) {
            if (cell) {
              ctx.fillRect(cdx + margin, rdx + margin, 1, 1);
            }
          });
        });
      }
      if (calculatedImageSettings) {
        ctx.globalAlpha = calculatedImageSettings.opacity;
      }
      if (haveImageToRender) {
        ctx.drawImage(image, calculatedImageSettings.x + margin, calculatedImageSettings.y + margin, calculatedImageSettings.w, calculatedImageSettings.h);
      }
    }
  });
  React.useEffect(function() {
    setIsImageLoaded(false);
  }, [imgSrc]);
  var canvasStyle = _objectSpread2({
    height: size,
    width: size
  }, style);
  var img = null;
  if (imgSrc != null) {
    img = /* @__PURE__ */ React.createElement("img", {
      alt: "QR-Code",
      src: imgSrc,
      key: imgSrc,
      style: {
        display: "none"
      },
      onLoad: function onLoad() {
        setIsImageLoaded(true);
      },
      ref: _image,
      crossOrigin: calculatedImageSettings === null || calculatedImageSettings === void 0 ? void 0 : calculatedImageSettings.crossOrigin
    });
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("canvas", _extends({
    style: canvasStyle,
    height: size,
    width: size,
    ref: setCanvasRef,
    role: "img"
  }, otherProps)), img);
});
var _excluded$6 = ["value", "size", "level", "bgColor", "fgColor", "includeMargin", "minVersion", "title", "marginSize", "imageSettings", "boostLevel"];
var QRCodeSVG = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  var value = props.value, _props$size = props.size, size = _props$size === void 0 ? DEFAULT_SIZE : _props$size, _props$level = props.level, level = _props$level === void 0 ? DEFAULT_LEVEL : _props$level, _props$bgColor = props.bgColor, bgColor = _props$bgColor === void 0 ? DEFAULT_BACKGROUND_COLOR : _props$bgColor, _props$fgColor = props.fgColor, fgColor = _props$fgColor === void 0 ? DEFAULT_FRONT_COLOR : _props$fgColor, _props$includeMargin = props.includeMargin, includeMargin = _props$includeMargin === void 0 ? DEFAULT_NEED_MARGIN : _props$includeMargin, _props$minVersion = props.minVersion, minVersion = _props$minVersion === void 0 ? DEFAULT_MINVERSION : _props$minVersion, title = props.title, marginSize = props.marginSize, imageSettings = props.imageSettings, boostLevel = props.boostLevel, otherProps = _objectWithoutProperties(props, _excluded$6);
  var _useQRCode = useQRCode({
    value,
    level,
    minVersion,
    includeMargin,
    marginSize,
    imageSettings,
    size,
    boostLevel
  }), margin = _useQRCode.margin, cells = _useQRCode.cells, numCells = _useQRCode.numCells, calculatedImageSettings = _useQRCode.calculatedImageSettings;
  var cellsToDraw = cells;
  var image = null;
  if (imageSettings != null && calculatedImageSettings != null) {
    if (calculatedImageSettings.excavation != null) {
      cellsToDraw = excavateModules(cells, calculatedImageSettings.excavation);
    }
    image = /* @__PURE__ */ React.createElement("image", {
      href: imageSettings.src,
      height: calculatedImageSettings.h,
      width: calculatedImageSettings.w,
      x: calculatedImageSettings.x + margin,
      y: calculatedImageSettings.y + margin,
      preserveAspectRatio: "none",
      opacity: calculatedImageSettings.opacity,
      crossOrigin: calculatedImageSettings.crossOrigin
    });
  }
  var fgPath = generatePath(cellsToDraw, margin);
  return /* @__PURE__ */ React.createElement("svg", _extends({
    height: size,
    width: size,
    viewBox: "0 0 ".concat(numCells, " ").concat(numCells),
    ref,
    role: "img"
  }, otherProps), !!title && /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("path", {
    fill: bgColor,
    d: "M0,0 h".concat(numCells, "v").concat(numCells, "H0z"),
    shapeRendering: "crispEdges"
  }), /* @__PURE__ */ React.createElement("path", {
    fill: fgColor,
    d: fgPath,
    shapeRendering: "crispEdges"
  }), image);
});
var ReloadOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-.7-8.9-4.9-10.3l-56.7-19.5a8 8 0 00-10.1 4.8c-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4A344.77 344.77 0 01655.9 829c-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27A341.5 341.5 0 01279 755.2a342.16 342.16 0 01-73.7-109.4c-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27a341.5 341.5 0 01109.3 73.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 003 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c-.1-6.6-7.8-10.3-13-6.2z" } }] }, "name": "reload", "theme": "outlined" };
var ReloadOutlined = function ReloadOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: ReloadOutlined$1
  }));
};
var RefIcon$5 = /* @__PURE__ */ reactExports.forwardRef(ReloadOutlined);
const defaultSpin = /* @__PURE__ */ React.createElement(Spin, null);
function QRcodeStatus({
  prefixCls,
  locale: locale2,
  onRefresh,
  statusRender,
  status
}) {
  const defaultExpiredNode = /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", {
    className: `${prefixCls}-expired`
  }, locale2 === null || locale2 === void 0 ? void 0 : locale2.expired), onRefresh && /* @__PURE__ */ React.createElement(Button$1, {
    type: "link",
    icon: /* @__PURE__ */ React.createElement(RefIcon$5, null),
    onClick: onRefresh
  }, locale2 === null || locale2 === void 0 ? void 0 : locale2.refresh));
  const defaultScannedNode = /* @__PURE__ */ React.createElement("p", {
    className: `${prefixCls}-scanned`
  }, locale2 === null || locale2 === void 0 ? void 0 : locale2.scanned);
  const defaultNodes = {
    expired: defaultExpiredNode,
    loading: defaultSpin,
    scanned: defaultScannedNode
  };
  const defaultStatusRender = (info) => defaultNodes[info.status];
  const mergedStatusRender = statusRender !== null && statusRender !== void 0 ? statusRender : defaultStatusRender;
  return mergedStatusRender({
    status,
    locale: locale2,
    onRefresh
  });
}
const genQRCodeStyle = (token) => {
  const {
    componentCls,
    lineWidth,
    lineType,
    colorSplit
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: token.paddingSM,
      backgroundColor: token.colorWhite,
      borderRadius: token.borderRadiusLG,
      border: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
      position: "relative",
      overflow: "hidden",
      [`& > ${componentCls}-mask`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        color: token.colorText,
        lineHeight: token.lineHeight,
        background: token.QRCodeMaskBackgroundColor,
        textAlign: "center",
        [`& > ${componentCls}-expired, & > ${componentCls}-scanned`]: {
          color: token.QRCodeTextColor
        }
      },
      "> canvas": {
        alignSelf: "stretch",
        flex: "auto",
        minWidth: 0
      },
      "&-icon": {
        marginBlockEnd: token.marginXS,
        fontSize: token.controlHeight
      }
    }),
    [`${componentCls}-borderless`]: {
      borderColor: "transparent",
      padding: 0,
      borderRadius: 0
    }
  };
};
const prepareComponentToken$8 = (token) => ({
  QRCodeMaskBackgroundColor: new FastColor(token.colorBgContainer).setA(0.96).toRgbString()
});
const useStyle$8 = genStyleHooks("QRCode", (token) => {
  const mergedToken = merge(token, {
    QRCodeTextColor: token.colorText
  });
  return genQRCodeStyle(mergedToken);
}, prepareComponentToken$8);
var __rest$f = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const QRCode = (props) => {
  var _a, _b, _c, _d;
  const [, token] = useToken$1();
  const {
    value,
    type = "canvas",
    icon = "",
    size = 160,
    iconSize,
    color = token.colorText,
    errorLevel = "M",
    status = "active",
    bordered = true,
    onRefresh,
    style,
    className,
    rootClassName,
    prefixCls: customizePrefixCls,
    bgColor = "transparent",
    statusRender,
    boostLevel
    /* 👈 5.28.0+ */
  } = props, rest = __rest$f(props, ["value", "type", "icon", "size", "iconSize", "color", "errorLevel", "status", "bordered", "onRefresh", "style", "className", "rootClassName", "prefixCls", "bgColor", "statusRender", "boostLevel"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("qrcode", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$8(prefixCls);
  const imageSettings = {
    src: icon,
    x: void 0,
    y: void 0,
    height: typeof iconSize === "number" ? iconSize : (_a = iconSize === null || iconSize === void 0 ? void 0 : iconSize.height) !== null && _a !== void 0 ? _a : 40,
    width: typeof iconSize === "number" ? iconSize : (_b = iconSize === null || iconSize === void 0 ? void 0 : iconSize.width) !== null && _b !== void 0 ? _b : 40,
    excavate: true,
    crossOrigin: "anonymous"
  };
  const a11yProps = pickAttrs(rest, true);
  const restProps = omit(rest, Object.keys(a11yProps));
  const qrCodeProps = Object.assign({
    value,
    size,
    level: errorLevel,
    bgColor,
    fgColor: color,
    style: {
      width: style === null || style === void 0 ? void 0 : style.width,
      height: style === null || style === void 0 ? void 0 : style.height
    },
    imageSettings: icon ? imageSettings : void 0,
    boostLevel
  }, a11yProps);
  const [locale2] = useLocale("QRCode");
  if (!value) {
    return null;
  }
  const mergedCls = classNames(prefixCls, className, rootClassName, hashId, cssVarCls, {
    [`${prefixCls}-borderless`]: !bordered
  });
  const mergedStyle = Object.assign(Object.assign({
    backgroundColor: bgColor
  }, style), {
    width: (_c = style === null || style === void 0 ? void 0 : style.width) !== null && _c !== void 0 ? _c : size,
    height: (_d = style === null || style === void 0 ? void 0 : style.height) !== null && _d !== void 0 ? _d : size
  });
  return wrapCSSVar(/* @__PURE__ */ React.createElement("div", Object.assign({}, restProps, {
    className: mergedCls,
    style: mergedStyle
  }), status !== "active" && /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-mask`
  }, /* @__PURE__ */ React.createElement(QRcodeStatus, {
    prefixCls,
    locale: locale2,
    status,
    onRefresh,
    statusRender
  })), type === "canvas" ? /* @__PURE__ */ React.createElement(QRCodeCanvas, Object.assign({}, qrCodeProps)) : /* @__PURE__ */ React.createElement(QRCodeSVG, Object.assign({}, qrCodeProps))));
};
var StarFilled$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" } }] }, "name": "star", "theme": "filled" };
var StarFilled = function StarFilled2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: StarFilled$1
  }));
};
var RefIcon$4 = /* @__PURE__ */ reactExports.forwardRef(StarFilled);
function Star(props, ref) {
  var disabled = props.disabled, prefixCls = props.prefixCls, character = props.character, characterRender = props.characterRender, index2 = props.index, count = props.count, value = props.value, allowHalf = props.allowHalf, focused = props.focused, onHover = props.onHover, onClick = props.onClick;
  var onInternalHover = function onInternalHover2(e2) {
    onHover(e2, index2);
  };
  var onInternalClick = function onInternalClick2(e2) {
    onClick(e2, index2);
  };
  var onInternalKeyDown = function onInternalKeyDown2(e2) {
    if (e2.keyCode === KeyCode.ENTER) {
      onClick(e2, index2);
    }
  };
  var starValue = index2 + 1;
  var classNameList = /* @__PURE__ */ new Set([prefixCls]);
  if (value === 0 && index2 === 0 && focused) {
    classNameList.add("".concat(prefixCls, "-focused"));
  } else if (allowHalf && value + 0.5 >= starValue && value < starValue) {
    classNameList.add("".concat(prefixCls, "-half"));
    classNameList.add("".concat(prefixCls, "-active"));
    if (focused) {
      classNameList.add("".concat(prefixCls, "-focused"));
    }
  } else {
    if (starValue <= value) {
      classNameList.add("".concat(prefixCls, "-full"));
    } else {
      classNameList.add("".concat(prefixCls, "-zero"));
    }
    if (starValue === value && focused) {
      classNameList.add("".concat(prefixCls, "-focused"));
    }
  }
  var characterNode = typeof character === "function" ? character(props) : character;
  var start = /* @__PURE__ */ React.createElement("li", {
    className: classNames(Array.from(classNameList)),
    ref
  }, /* @__PURE__ */ React.createElement("div", {
    onClick: disabled ? null : onInternalClick,
    onKeyDown: disabled ? null : onInternalKeyDown,
    onMouseMove: disabled ? null : onInternalHover,
    role: "radio",
    "aria-checked": value > index2 ? "true" : "false",
    "aria-posinset": index2 + 1,
    "aria-setsize": count,
    tabIndex: disabled ? -1 : 0
  }, /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-first")
  }, characterNode), /* @__PURE__ */ React.createElement("div", {
    className: "".concat(prefixCls, "-second")
  }, characterNode)));
  if (characterRender) {
    start = characterRender(start, props);
  }
  return start;
}
const Star$1 = /* @__PURE__ */ React.forwardRef(Star);
function useRefs() {
  var nodeRef = reactExports.useRef({});
  function getRef(index2) {
    return nodeRef.current[index2];
  }
  function setRef(index2) {
    return function(node) {
      nodeRef.current[index2] = node;
    };
  }
  return [getRef, setRef];
}
function getScroll(w) {
  var ret = w.pageXOffset;
  var method = "scrollLeft";
  if (typeof ret !== "number") {
    var d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== "number") {
      ret = d.body[method];
    }
  }
  return ret;
}
function getClientPosition(elem) {
  var x;
  var y;
  var doc = elem.ownerDocument;
  var body = doc.body;
  var docElem = doc && doc.documentElement;
  var box = elem.getBoundingClientRect();
  x = box.left;
  y = box.top;
  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;
  return {
    left: x,
    top: y
  };
}
function getOffsetLeft(el) {
  var pos = getClientPosition(el);
  var doc = el.ownerDocument;
  var w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  return pos.left;
}
var _excluded$5 = ["prefixCls", "className", "defaultValue", "value", "count", "allowHalf", "allowClear", "keyboard", "character", "characterRender", "disabled", "direction", "tabIndex", "autoFocus", "onHoverChange", "onChange", "onFocus", "onBlur", "onKeyDown", "onMouseLeave"];
function Rate$1(props, ref) {
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-rate" : _props$prefixCls, className = props.className, defaultValue = props.defaultValue, propValue = props.value, _props$count = props.count, count = _props$count === void 0 ? 5 : _props$count, _props$allowHalf = props.allowHalf, allowHalf = _props$allowHalf === void 0 ? false : _props$allowHalf, _props$allowClear = props.allowClear, allowClear = _props$allowClear === void 0 ? true : _props$allowClear, _props$keyboard = props.keyboard, keyboard = _props$keyboard === void 0 ? true : _props$keyboard, _props$character = props.character, character = _props$character === void 0 ? "★" : _props$character, characterRender = props.characterRender, disabled = props.disabled, _props$direction = props.direction, direction = _props$direction === void 0 ? "ltr" : _props$direction, _props$tabIndex = props.tabIndex, tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex, autoFocus = props.autoFocus, onHoverChange = props.onHoverChange, onChange = props.onChange, onFocus = props.onFocus, onBlur = props.onBlur, onKeyDown = props.onKeyDown, onMouseLeave = props.onMouseLeave, restProps = _objectWithoutProperties(props, _excluded$5);
  var _useRefs = useRefs(), _useRefs2 = _slicedToArray(_useRefs, 2), getStarRef = _useRefs2[0], setStarRef = _useRefs2[1];
  var rateRef = React.useRef(null);
  var triggerFocus = function triggerFocus2() {
    if (!disabled) {
      var _rateRef$current;
      (_rateRef$current = rateRef.current) === null || _rateRef$current === void 0 || _rateRef$current.focus();
    }
  };
  React.useImperativeHandle(ref, function() {
    return {
      focus: triggerFocus,
      blur: function blur() {
        if (!disabled) {
          var _rateRef$current2;
          (_rateRef$current2 = rateRef.current) === null || _rateRef$current2 === void 0 || _rateRef$current2.blur();
        }
      }
    };
  });
  var _useMergedState = useMergedState(defaultValue || 0, {
    value: propValue
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), value = _useMergedState2[0], setValue = _useMergedState2[1];
  var _useMergedState3 = useMergedState(null), _useMergedState4 = _slicedToArray(_useMergedState3, 2), cleanedValue = _useMergedState4[0], setCleanedValue = _useMergedState4[1];
  var getStarValue = function getStarValue2(index2, x) {
    var reverse = direction === "rtl";
    var starValue = index2 + 1;
    if (allowHalf) {
      var starEle = getStarRef(index2);
      var leftDis = getOffsetLeft(starEle);
      var width = starEle.clientWidth;
      if (reverse && x - leftDis > width / 2) {
        starValue -= 0.5;
      } else if (!reverse && x - leftDis < width / 2) {
        starValue -= 0.5;
      }
    }
    return starValue;
  };
  var changeValue = function changeValue2(nextValue) {
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue);
  };
  var _React$useState = React.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), focused = _React$useState2[0], setFocused = _React$useState2[1];
  var onInternalFocus = function onInternalFocus2() {
    setFocused(true);
    onFocus === null || onFocus === void 0 || onFocus();
  };
  var onInternalBlur = function onInternalBlur2() {
    setFocused(false);
    onBlur === null || onBlur === void 0 || onBlur();
  };
  var _React$useState3 = React.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), hoverValue = _React$useState4[0], setHoverValue = _React$useState4[1];
  var onHover = function onHover2(event, index2) {
    var nextHoverValue = getStarValue(index2, event.pageX);
    if (nextHoverValue !== cleanedValue) {
      setHoverValue(nextHoverValue);
      setCleanedValue(null);
    }
    onHoverChange === null || onHoverChange === void 0 || onHoverChange(nextHoverValue);
  };
  var onMouseLeaveCallback = function onMouseLeaveCallback2(event) {
    if (!disabled) {
      setHoverValue(null);
      setCleanedValue(null);
      onHoverChange === null || onHoverChange === void 0 || onHoverChange(void 0);
    }
    if (event) {
      onMouseLeave === null || onMouseLeave === void 0 || onMouseLeave(event);
    }
  };
  var onClick = function onClick2(event, index2) {
    var newValue = getStarValue(index2, event.pageX);
    var isReset = false;
    if (allowClear) {
      isReset = newValue === value;
    }
    onMouseLeaveCallback();
    changeValue(isReset ? 0 : newValue);
    setCleanedValue(isReset ? newValue : null);
  };
  var onInternalKeyDown = function onInternalKeyDown2(event) {
    var keyCode = event.keyCode;
    var reverse = direction === "rtl";
    var step = allowHalf ? 0.5 : 1;
    if (keyboard) {
      if (keyCode === KeyCode.RIGHT && value < count && !reverse) {
        changeValue(value + step);
        event.preventDefault();
      } else if (keyCode === KeyCode.LEFT && value > 0 && !reverse) {
        changeValue(value - step);
        event.preventDefault();
      } else if (keyCode === KeyCode.RIGHT && value > 0 && reverse) {
        changeValue(value - step);
        event.preventDefault();
      } else if (keyCode === KeyCode.LEFT && value < count && reverse) {
        changeValue(value + step);
        event.preventDefault();
      }
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(event);
  };
  React.useEffect(function() {
    if (autoFocus && !disabled) {
      triggerFocus();
    }
  }, []);
  var starNodes = new Array(count).fill(0).map(function(item, index2) {
    return /* @__PURE__ */ React.createElement(Star$1, {
      ref: setStarRef(index2),
      index: index2,
      count,
      disabled,
      prefixCls: "".concat(prefixCls, "-star"),
      allowHalf,
      value: hoverValue === null ? value : hoverValue,
      onClick,
      onHover,
      key: item || index2,
      character,
      characterRender,
      focused
    });
  });
  var classString = classNames(prefixCls, className, _defineProperty(_defineProperty({}, "".concat(prefixCls, "-disabled"), disabled), "".concat(prefixCls, "-rtl"), direction === "rtl"));
  return /* @__PURE__ */ React.createElement("ul", _extends({
    className: classString,
    onMouseLeave: onMouseLeaveCallback,
    tabIndex: disabled ? -1 : tabIndex,
    onFocus: disabled ? null : onInternalFocus,
    onBlur: disabled ? null : onInternalBlur,
    onKeyDown: disabled ? null : onInternalKeyDown,
    ref: rateRef
  }, pickAttrs(restProps, {
    aria: true,
    data: true,
    attr: true
  })), starNodes);
}
const Rate$2 = /* @__PURE__ */ React.forwardRef(Rate$1);
const genRateStarStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-star`]: {
      position: "relative",
      display: "inline-block",
      color: "inherit",
      cursor: "pointer",
      "&:not(:last-child)": {
        marginInlineEnd: token.marginXS
      },
      "> div": {
        transition: `all ${token.motionDurationMid}, outline 0s`,
        "&:hover": {
          transform: token.starHoverScale
        },
        "&:focus": {
          outline: 0
        },
        "&:focus-visible": {
          outline: `${unit(token.lineWidth)} dashed ${token.starColor}`,
          transform: token.starHoverScale
        }
      },
      "&-first, &-second": {
        color: token.starBg,
        transition: `all ${token.motionDurationMid}`,
        userSelect: "none"
      },
      "&-first": {
        position: "absolute",
        top: 0,
        insetInlineStart: 0,
        width: "50%",
        height: "100%",
        overflow: "hidden",
        opacity: 0
      },
      [`&-half ${componentCls}-star-first, &-half ${componentCls}-star-second`]: {
        opacity: 1
      },
      [`&-half ${componentCls}-star-first, &-full ${componentCls}-star-second`]: {
        color: "inherit"
      }
    }
  };
};
const genRateRtlStyle = (token) => ({
  [`&-rtl${token.componentCls}`]: {
    direction: "rtl"
  }
});
const genRateStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      display: "inline-block",
      margin: 0,
      padding: 0,
      color: token.starColor,
      fontSize: token.starSize,
      lineHeight: 1,
      listStyle: "none",
      outline: "none",
      // disable styles
      [`&-disabled${componentCls} ${componentCls}-star`]: {
        cursor: "default",
        "> div:hover": {
          transform: "scale(1)"
        }
      }
    }), genRateStarStyle(token)), genRateRtlStyle(token))
  };
};
const prepareComponentToken$7 = (token) => ({
  starColor: token.yellow6,
  starSize: token.controlHeightLG * 0.5,
  starHoverScale: "scale(1.1)",
  starBg: token.colorFillContent
});
const useStyle$7 = genStyleHooks("Rate", (token) => {
  const rateToken = merge(token, {});
  return genRateStyle(rateToken);
}, prepareComponentToken$7);
var __rest$e = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Rate = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls,
    className,
    rootClassName,
    style,
    tooltips,
    character = /* @__PURE__ */ reactExports.createElement(RefIcon$4, null),
    disabled: customDisabled
  } = props, rest = __rest$e(props, ["prefixCls", "className", "rootClassName", "style", "tooltips", "character", "disabled"]);
  const characterRender = (node, {
    index: index2
  }) => {
    if (!tooltips) {
      return node;
    }
    return /* @__PURE__ */ reactExports.createElement(Tooltip, {
      title: tooltips[index2]
    }, node);
  };
  const {
    getPrefixCls,
    direction,
    rate
  } = reactExports.useContext(ConfigContext);
  const ratePrefixCls = getPrefixCls("rate", prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$7(ratePrefixCls);
  const mergedStyle = Object.assign(Object.assign({}, rate === null || rate === void 0 ? void 0 : rate.style), style);
  const disabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Rate$2, Object.assign({
    ref,
    character,
    characterRender,
    disabled: mergedDisabled
  }, rest, {
    className: classNames(className, rootClassName, hashId, cssVarCls, rate === null || rate === void 0 ? void 0 : rate.className),
    style: mergedStyle,
    prefixCls: ratePrefixCls,
    direction
  })));
});
var WarningFilled$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" } }] }, "name": "warning", "theme": "filled" };
var WarningFilled = function WarningFilled2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: WarningFilled$1
  }));
};
var RefIcon$3 = /* @__PURE__ */ reactExports.forwardRef(WarningFilled);
const NoFound = () => /* @__PURE__ */ reactExports.createElement("svg", {
  width: "252",
  height: "294"
}, /* @__PURE__ */ reactExports.createElement("title", null, "No Found"), /* @__PURE__ */ reactExports.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, /* @__PURE__ */ reactExports.createElement("circle", {
  cx: "126.75",
  cy: "128.1",
  r: "126",
  fill: "#E4EBF7"
}), /* @__PURE__ */ reactExports.createElement("circle", {
  cx: "31.55",
  cy: "130.8",
  r: "8.3",
  fill: "#FFF"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#FFF",
  d: "m37 134.3 10.5 6m.9 6.2-12.7 10.8",
  strokeWidth: "2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M39.9 159.4a5.7 5.7 0 1 1-11.3-1.2 5.7 5.7 0 0 1 11.3 1.2m17.7-16.2a5.7 5.7 0 1 1-11.4-1.1 5.7 5.7 0 0 1 11.4 1.1M99 27h29.8a4.6 4.6 0 1 0 0-9.2H99a4.6 4.6 0 1 0 0 9.2m11.4 18.3h29.8a4.6 4.6 0 0 0 0-9.2h-29.8a4.6 4.6 0 1 0 0 9.2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M112.8 26.9h15.8a4.6 4.6 0 1 0 0 9.1h-15.8a4.6 4.6 0 0 0 0-9.1m71.7 108.8a10 10 0 1 1-19.8-2 10 10 0 0 1 19.8 2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#FFF",
  d: "m179.3 141.8 12.6 7.1m1.1 7.6-15.2 13",
  strokeWidth: "2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M184.7 170a6.8 6.8 0 1 1-13.6-1.3 6.8 6.8 0 0 1 13.6 1.4m18.6-16.8a6.9 6.9 0 1 1-13.7-1.4 6.9 6.9 0 0 1 13.7 1.4"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#FFF",
  d: "M152 192.3a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.4 0zm73.3-76.2a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.5 0zm-9 35a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.5 0zM177 107.6a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zm18.4-15.4a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.5 0zm6.8 88.5a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.5 0z",
  strokeWidth: "2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#FFF",
  d: "m214.4 153.3-2 20.2-10.8 6m-28-4.7-6.3 9.8H156l-4.5 6.5m23.5-66v-15.7m46 7.8-13 8-15.2-8V94.4",
  strokeWidth: "2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M166.6 66h-4a4.8 4.8 0 0 1-4.7-4.8 4.8 4.8 0 0 1 4.7-4.7h4a4.8 4.8 0 0 1 4.7 4.7 4.8 4.8 0 0 1-4.7 4.7"
}), /* @__PURE__ */ reactExports.createElement("circle", {
  cx: "204.3",
  cy: "30",
  r: "29.5",
  fill: "#1677ff"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M206 38.4c.5.5.7 1.1.7 2s-.2 1.4-.7 1.9a3 3 0 0 1-2 .7c-.8 0-1.5-.3-2-.8s-.8-1.1-.8-1.9.3-1.4.8-2c.5-.4 1.2-.7 2-.7.7 0 1.4.3 2 .8m4.2-19.5c1.5 1.3 2.2 3 2.2 5.2a7.2 7.2 0 0 1-1.5 4.5l-3 2.7a5 5 0 0 0-1.3 1.7 5.2 5.2 0 0 0-.6 2.4v.5h-4v-.5c0-1.4.1-2.5.6-3.5s1.9-2.5 4.2-4.5l.4-.5a4 4 0 0 0 1-2.6c0-1.2-.4-2-1-2.8-.7-.6-1.6-1-2.9-1-1.5 0-2.6.5-3.3 1.5-.4.5-.6 1-.8 1.9a2 2 0 0 1-2 1.6 2 2 0 0 1-2-2.4c.4-1.6 1-2.8 2.1-3.8a8.5 8.5 0 0 1 6.3-2.3c2.3 0 4.2.6 5.6 2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFB594",
  d: "M52 76.1s21.8 5.4 27.3 16c5.6 10.7-6.3 9.2-15.7 5C52.8 92 39 85 52 76"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "m90.5 67.5-.5 2.9c-.7.5-4.7-2.7-4.7-2.7l-1.7.8-1.3-5.7s6.8-4.6 9-5c2.4-.5 9.8 1 10.6 2.3 0 0 1.3.4-2.2.6-3.6.3-5 .5-6.8 3.2l-2.4 3.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M128 111.4a36.7 36.7 0 0 0-8.9-15.5c-3.5-3-9.3-2.2-11.3-4.2-1.3-1.2-3.2-1.2-3.2-1.2L87.7 87c-2.3-.4-2.1-.7-6-1.4-1.6-1.9-3-1.1-3-1.1l-7-1.4c-1-1.5-2.5-1-2.5-1l-2.4-.9C65 91.2 59 95 59 95c1.8 1.1 15.7 8.3 15.7 8.3l5.1 37.1s-3.3 5.7 1.4 9.1c0 0 19.9-3.7 34.9-.3 0 0 3-2.6 1-8.8.5-3 1.4-8.3 1.7-11.6.4.7 2 1.9 3.1 3.4 0 0 9.4-7.3 11-14a17 17 0 0 1-2.2-2.4c-.5-.8-.3-2-.7-2.8-.7-1-1.8-1.3-2-1.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#CBD1D1",
  d: "M101 290s4.4 2 7.4 1c2.9-1 4.6.7 7.1 1.2 2.6.5 6.9 1.1 11.7-1.3 0-5.5-6.9-4-12-6.7-2.5-1.4-3.7-4.7-3.5-8.8h-9.5s-1.2 10.6-1 14.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#2B0849",
  d: "M101 289.8s2.5 1.3 6.8.7c3-.5 3.7.5 7.4 1 3.8.6 10.8 0 11.9-.9.4 1.1-.4 2-.4 2s-1.5.7-4.8.9c-2 .1-5.8.3-7.6-.5-1.8-1.4-5.2-1.9-5.7-.2-4 1-7.4-.3-7.4-.3l-.1-2.7z"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#A4AABA",
  d: "M108.3 276h3.1s0 6.7 4.6 8.6c-4.7.6-8.6-2.3-7.7-8.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#CBD1D1",
  d: "M57.5 272.4s-2 7.4-4.4 12.3c-1.8 3.7-4.3 7.5 5.4 7.5 6.7 0 9-.5 7.4-6.6-1.5-6.1.3-13.2.3-13.2h-8.7z"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#2B0849",
  d: "M51.5 289.8s2 1.2 6.6 1.2c6 0 8.3-1.7 8.3-1.7s.6 1.1-.7 2.2c-1 .8-3.6 1.6-7.4 1.5-4.1 0-5.8-.5-6.7-1.1-.8-.6-.7-1.6-.1-2.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#A4AABA",
  d: "M58.4 274.3s0 1.5-.3 3c-.3 1.4-1 3-1.1 4 0 1.2 4.5 1.7 5.1.1.6-1.5 1.3-6.4 2-7.2.6-.9-5-2.2-5.7.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#7BB2F9",
  d: "m99.7 278.5 13.3.1s1.3-54.5 1.9-64.4c.5-9.9 3.8-43.4 1-63.1l-12.6-.7-22.8.8-1.2 10c0 .5-.7.8-.7 1.4-.1.5.4 1.3.3 2-2.4 14-6.4 33-8.8 46.6 0 .7-1.2 1-1.4 2.7 0 .3.2 1.5 0 1.8-6.8 18.7-10.9 47.8-14.2 61.9h14.6s2.2-8.6 4-17c2.9-12.9 23.2-85 23.2-85l3-.5 1 46.3s-.2 1.2.4 2c.5.8-.6 1.1-.4 2.3l.4 1.8-1 11.8c-.4 4.8 0 39.2 0 39.2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#648BD8",
  d: "M76 221.6c1.2.1 4.1-2 7-5m23.4 8.5s2.7-1 6-3.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#648BD8",
  d: "M107.3 222.1s2.7-1.1 6-3.9",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#648BD8",
  d: "M74.7 224.8s2.7-.6 6.5-3.4m4.8-69.8c-.2 3.1.3 8.6-4.3 9.2m22-11s0 14-1.4 15.1a15 15 0 0 1-3 2m.5-16.5s0 13-1.2 24.4m-5 1.1s7.3-1.7 9.5-1.7M74.3 206a212 212 0 0 1-1 4.5s-1.4 1.9-1 3.8c.5 2-1 2-5 15.4A353 353 0 0 0 61 257l-.2 1.2m14.9-60.5a321 321 0 0 1-.9 4.8m7.8-50.4-1.2 10.5s-1.1.1-.5 2.2c.1 1.4-2.7 15.8-5.2 30.5m-19.6 79h13.3",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#192064",
  d: "M116.2 148.2s-17-3-35.9.2c.2 2.5 0 4.2 0 4.2s14.7-2.8 35.7-.3c.3-2.4.2-4 .2-4"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M106.3 151.2v-5a.8.8 0 0 0-.8-.8h-7.8a.8.8 0 0 0-.8.8v5a.8.8 0 0 0 .8.8h7.8a.8.8 0 0 0 .8-.8"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#192064",
  d: "M105.2 150.2v-3a.6.6 0 0 0-.6-.7 94.3 94.3 0 0 0-5.9 0 .7.7 0 0 0-.6.6v3.1a.6.6 0 0 0 .6.7 121.1 121.1 0 0 1 5.8 0c.4 0 .7-.3.7-.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#648BD8",
  d: "M100.3 275.4h12.3m-11.2-4.9.1 6.5m0-12.5a915.8 915.8 0 0 0 0 4.4m-.5-94 .9 44.7s.7 1.6-.2 2.7c-1 1.1 2.4.7.9 2.2-1.6 1.6.9 1.2 0 3.4-.6 1.5-1 21.1-1.1 35.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "M46.9 83.4s-.5 6 7.2 5.6c11.2-.7 9.2-9.4 31.5-21.7-.7-2.7-2.4-4.7-2.4-4.7s-11 3-22.6 8c-6.8 3-13.4 6.4-13.7 12.8m57.6 7.7.9-5.4-8.9-11.4-5 5.3-1.8 7.9a.3.3 0 0 0 .1.3c1 .8 6.5 5 14.4 3.5a.3.3 0 0 0 .3-.2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "M94 79.4s-4.6-2.9-2.5-6.9c1.6-3 4.5 1.2 4.5 1.2s.5-3.7 3.1-3.7c.6-1 1.6-4.1 1.6-4.1l13.5 3c0 5.3-2.3 19.5-7.8 20-8.9.6-12.5-9.5-12.5-9.5"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#520038",
  d: "M113.9 73.4c2.6-2 3.4-9.7 3.4-9.7s-2.4-.5-6.6-2c-4.7-2.1-12.8-4.8-17.5 1-9.6 3.2-2 19.8-2 19.8l2.7-3s-4-3.3-2-6.3c2-3.5 3.8 1 3.8 1s.7-2.3 3.6-3.3c.4-.7 1-2.6 1.4-3.8a1 1 0 0 1 1.3-.7l11.4 2.6c.5.2.8.7.8 1.2l-.3 3.2z"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#552950",
  d: "M105 76c-.1.7-.6 1.1-1 1-.6 0-.9-.6-.8-1.2.1-.6.6-1 1-1 .6 0 .9.7.8 1.3m7.1 1.6c0 .6-.5 1-1 1-.5-.1-.8-.7-.7-1.3 0-.6.5-1 1-1 .5.1.8.7.7 1.3"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "m110.1 74.8-.9 1.7-.3 4.3h-2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#5C2552",
  d: "M110.8 74.5s1.8-.7 2.6.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "M92.4 74.3s.5-1.1 1.1-.7c.6.4 1.3 1.4.6 2-.8.5.1 1.6.1 1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#5C2552",
  d: "M103.3 73s1.8 1 4.1.9",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "M103.7 81.8s2.2 1.2 4.4 1.2m-3.5 1.3s1 .4 1.6.3m-11.5-3.4s2.3 7.4 10.4 7.6",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#E4EBF7",
  d: "M81.5 89.4s.4 5.6-5 12.8M69 82.7s-.7 9.2-8.2 14.2m68.6 26s-5.3 7.4-9.4 10.7m-.7-26.3s.5 4.4-2.1 32",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#F2D7AD",
  d: "M150 151.2h-49.8a1 1 0 0 1-1-1v-31.7c0-.5.4-1 1-1H150c.6 0 1 .5 1 1v31.7a1 1 0 0 1-1 1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#F4D19D",
  d: "M150.3 151.2h-19.9v-33.7h20.8v32.8a1 1 0 0 1-1 1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#F2D7AD",
  d: "M123.6 127.9H92.9a.5.5 0 0 1-.4-.8l6.4-9.1c.2-.3.5-.5.8-.5h31.1l-7.2 10.4z"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#CC9B6E",
  d: "M123.7 128.4H99.2v-.5h24.2l7.2-10.2.4.3z"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#F4D19D",
  d: "M158.3 127.9h-18.7a2 2 0 0 1-1.6-.8l-7.2-9.6h20c.5 0 1 .3 1.2.6l6.7 9a.5.5 0 0 1-.4.8"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#CC9B6E",
  d: "M157.8 128.5h-19.3l-7.9-10.5.4-.3 7.7 10.3h19.1zm-27.2 22.2v-8.2h.4v8.2zm-.1-10.9v-21.4h.4l.1 21.4zm-18.6 1.1-.5-.1 1.5-5.2.5.2zm-3.5.2-2.6-3 2.6-3.4.4.3-2.4 3.1 2.4 2.6zm8.2 0-.4-.4 2.4-2.6-2.4-3 .4-.4 2.7 3.4z"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "m154.3 131.9-3.1-2v3.5l-1 .1a85 85 0 0 1-4.8.3c-1.9 0-2.7 2.2 2.2 2.6l-2.6-.6s-2.2 1.3.5 2.3c0 0-1.6 1.2.6 2.6-.6 3.5 5.2 4 7 3.6a6.1 6.1 0 0 0 4.6-5.2 8 8 0 0 0-3.4-7.2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "M153.7 133.6s-6.5.4-8.4.3c-1.8 0-1.9 2.2 2.4 2.3 3.7.2 5.4 0 5.4 0",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "M145.2 135.9c-1.9 1.3.5 2.3.5 2.3s3.5 1 6.8.6m-.6 2.9s-6.3.1-6.7-2.1c-.3-1.4.4-1.4.4-1.4m.5 2.7s-1 3.1 5.5 3.5m-.4-14.5v3.5M52.8 89.3a18 18 0 0 0 13.6-7.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#5BA02E",
  d: "M168.6 248.3a6.6 6.6 0 0 1-6.7-6.6v-66.5a6.6 6.6 0 1 1 13.3 0v66.5a6.6 6.6 0 0 1-6.6 6.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#92C110",
  d: "M176.5 247.7a6.6 6.6 0 0 1-6.6-6.7v-33.2a6.6 6.6 0 1 1 13.3 0V241a6.6 6.6 0 0 1-6.7 6.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#F2D7AD",
  d: "M186.4 293.6H159a3.2 3.2 0 0 1-3.2-3.2v-46.1a3.2 3.2 0 0 1 3.2-3.2h27.5a3.2 3.2 0 0 1 3.2 3.2v46.1a3.2 3.2 0 0 1-3.2 3.2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#E4EBF7",
  d: "M89 89.5s7.8 5.4 16.6 2.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
})));
const ServerError = () => /* @__PURE__ */ reactExports.createElement("svg", {
  width: "254",
  height: "294"
}, /* @__PURE__ */ reactExports.createElement("title", null, "Server Error"), /* @__PURE__ */ reactExports.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#E4EBF7",
  d: "M0 128.1v-2C0 56.5 56.3.2 125.7.2h2.1C197.2.3 253.5 56.6 253.5 126v2.1c0 69.5-56.3 125.7-125.7 125.7h-2.1A125.7 125.7 0 0 1 0 128.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M40 132.1a8.3 8.3 0 1 1-16.6-1.7 8.3 8.3 0 0 1 16.6 1.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#FFF",
  d: "m37.2 135.6 10.5 6m1 6.3-12.8 10.8",
  strokeWidth: "2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M40.1 160.8a5.7 5.7 0 1 1-11.3-1.1 5.7 5.7 0 0 1 11.3 1.1M58 144.6a5.7 5.7 0 1 1-11.4-1.2 5.7 5.7 0 0 1 11.4 1.2M99.7 27.4h30a4.6 4.6 0 1 0 0-9.2h-30a4.6 4.6 0 0 0 0 9.2M111 46h30a4.6 4.6 0 1 0 0-9.3h-30a4.6 4.6 0 1 0 0 9.3m2.5-18.6h16a4.6 4.6 0 1 0 0 9.3h-16a4.6 4.6 0 0 0 0-9.3m36.7 42.7h-4a4.8 4.8 0 0 1-4.8-4.8 4.8 4.8 0 0 1 4.8-4.8h4a4.8 4.8 0 0 1 4.7 4.8 4.8 4.8 0 0 1-4.7 4.8"
}), /* @__PURE__ */ reactExports.createElement("circle", {
  cx: "201.35",
  cy: "30.2",
  r: "29.7",
  fill: "#FF603B"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "m203.6 19.4-.7 15a1.5 1.5 0 0 1-3 0l-.7-15a2.2 2.2 0 1 1 4.4 0m-.3 19.4c.5.5.8 1.1.8 1.9s-.3 1.4-.8 1.9a3 3 0 0 1-2 .7 2.5 2.5 0 0 1-1.8-.7c-.6-.6-.8-1.2-.8-2 0-.7.2-1.3.8-1.8.5-.5 1.1-.7 1.8-.7.8 0 1.5.2 2 .7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFB594",
  d: "M119.3 133.3c4.4-.6 3.6-1.2 4-4.8.8-5.2-3-17-8.2-25.1-1-10.7-12.6-11.3-12.6-11.3s4.3 5 4.2 16.2c1.4 5.3.8 14.5.8 14.5s5.3 11.4 11.8 10.5"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M101 91.6s1.4-.6 3.2.6c8 1.4 10.3 6.7 11.3 11.4 1.8 1.2 1.8 2.3 1.8 3.5l1.5 3s-7.2 1.7-11 6.7c-1.3-6.4-6.9-25.2-6.9-25.2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFB594",
  d: "m94 90.5 1-5.8-9.2-11.9-5.2 5.6-2.6 9.9s8.4 5 16 2.2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "M83 78.2s-4.6-2.9-2.5-6.9c1.6-3 4.5 1.2 4.5 1.2s.5-3.7 3.2-3.7c.5-1 1.5-4.2 1.5-4.2l13.6 3.2c0 5.2-2.3 19.5-7.9 20-8.9.6-12.5-9.6-12.5-9.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#520038",
  d: "M103 72.2c2.6-2 3.5-9.7 3.5-9.7s-2.5-.5-6.7-2c-4.7-2.2-12.9-4.9-17.6.9-9.5 4.4-2 20-2 20l2.7-3.1s-4-3.3-2.1-6.3c2.2-3.5 4 1 4 1s.6-2.3 3.5-3.3c.4-.7 1-2.7 1.5-3.8A1 1 0 0 1 91 65l11.5 2.7c.5.1.8.6.8 1.2l-.3 3.2z"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#552950",
  d: "M101.2 76.5c0 .6-.6 1-1 1-.5-.1-.9-.7-.8-1.3.1-.6.6-1 1.1-1 .5.1.8.7.7 1.3m-7-1.4c0 .6-.5 1-1 1-.5-.1-.8-.7-.7-1.3 0-.6.6-1 1-1 .5.1.9.7.8 1.3"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "m99.2 73.6-.9 1.7-.3 4.3h-2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#5C2552",
  d: "M100 73.3s1.7-.7 2.4.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "M81.4 73s.4-1 1-.6c.7.4 1.4 1.4.6 2s.2 1.6.2 1.6",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#5C2552",
  d: "M92.3 71.7s1.9 1.1 4.2 1",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "M92.7 80.6s2.3 1.2 4.4 1.2m-3.4 1.4s1 .4 1.5.3M83.7 80s1.8 6.6 9.2 8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#E4EBF7",
  d: "M95.5 91.7s-1 2.8-8.2 2c-7.3-.6-10.3-5-10.3-5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M78.1 87.5s6.6 5 16.5 2.5c0 0 9.6 1 11.5 5.3 5.4 11.8.6 36.8 0 40 3.5 4-.4 8.4-.4 8.4-15.7-3.5-35.8-.6-35.8-.6-4.9-3.5-1.3-9-1.3-9l-6.2-23.8c-2.5-15.2.8-19.8 3.5-20.7 3-1 8-1.3 8-1.3.6 0 1.1 0 1.4-.2 2.4-1.3 2.8-.6 2.8-.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "M65.8 89.8s-6.8.5-7.6 8.2c-.4 8.8 3 11 3 11s6.1 22 16.9 22.9c8.4-2.2 4.7-6.7 4.6-11.4-.2-11.3-7-17-7-17s-4.3-13.7-9.9-13.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "M71.7 124.2s.9 11.3 9.8 6.5c4.8-2.5 7.6-13.8 9.8-22.6A201 201 0 0 0 94 96l-5-1.7s-2.4 5.6-7.7 12.3c-4.4 5.5-9.2 11.1-9.5 17.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#E4EBF7",
  d: "M108.5 105.2s1.7 2.7-2.4 30.5c2.4 2.2 1 6-.2 7.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "M123.3 131.5s-.5 2.8-11.8 2c-15.2-1-25.3-3.2-25.3-3.2l.9-5.8s.7.2 9.7-.1c11.9-.4 18.7-6 25-1 4 3.2 1.5 8.1 1.5 8.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M70.2 91s-5.6-4.8-11 2.7c-3.3 7.2.5 15.2 2.6 19.5-.3 3.8 2.4 4.3 2.4 4.3s0 1 1.5 2.7c4-7 6.7-9.1 13.7-12.5-.3-.7-1.9-3.3-1.8-3.8.2-1.7-1.3-2.6-1.3-2.6s-.3-.2-1.2-2.8c-.8-2.3-2-5.1-4.9-7.5"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#CBD1D1",
  d: "M90.2 288s4.9 2.3 8.3 1.2c3.2-1 5.2.7 8 1.3a20 20 0 0 0 13.3-1.4c-.2-6.2-7.8-4.5-13.6-7.6-2.9-1.6-4.2-5.3-4-10H91.5s-1.5 12-1.3 16.5"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#2B0849",
  d: "M90.2 287.8s2.8 1.5 7.6.8c3.5-.5 3.3.6 7.5 1.3 4.2.6 13-.2 14.3-1.2.5 1.3-.4 2.4-.4 2.4s-1.7.6-5.4.9c-2.3.1-8.1.3-10.2-.6-2-1.6-4.9-1.5-6-.3-4.5 1.1-7.2-.3-7.2-.3l-.2-3z"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#A4AABA",
  d: "M98.4 272.3h3.5s0 7.5 5.2 9.6c-5.3.7-9.7-2.6-8.7-9.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#CBD1D1",
  d: "M44.4 272s-2.2 7.8-4.7 13c-1.9 3.8-4.4 7.8 5.8 7.8 7 0 9.3-.5 7.7-7-1.6-6.3.3-13.8.3-13.8h-9z"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#2B0849",
  d: "M38 290.3s2.3 1.2 7 1.2c6.4 0 8.7-1.7 8.7-1.7s.6 1.1-.7 2.2c-1 1-3.8 1.7-7.7 1.7-4.4 0-6.1-.6-7-1.3-1-.5-.8-1.6-.2-2.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#A4AABA",
  d: "M45.3 274s0 1.6-.3 3.1-1.1 3.3-1.2 4.4c0 1.2 4.8 1.6 5.4 0 .7-1.6 1.4-6.8 2-7.6.7-.9-5.1-2.2-5.9.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#7BB2F9",
  d: "M89.5 277.6h13.9s1.3-56.6 1.9-66.8c.6-10.3 4-45.1 1-65.6l-13-.7-23.7.8-1.3 10.4c0 .5-.7.9-.8 1.4 0 .6.5 1.4.4 2L59.6 206c-.1.7-1.3 1-1.5 2.8 0 .3.2 1.6.1 1.8-7.1 19.5-12.2 52.6-15.6 67.2h15.1L62 259c3-13.3 24-88.3 24-88.3l3.2-1-.2 48.6s-.2 1.3.4 2.1c.5.8-.6 1.2-.4 2.4l.4 1.8-1 12.4c-.4 4.9 1.2 40.7 1.2 40.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#648BD8",
  d: "M64.6 218.9c1.2 0 4.2-2.1 7.2-5.1m24.2 8.7s3-1.1 6.4-4",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#648BD8",
  d: "M97 219.4s2.9-1.2 6.3-4",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#648BD8",
  d: "M63.2 222.1s2.7-.6 6.7-3.5m5-72.4c-.3 3.2.3 8.8-4.5 9.4m22.8-11.3s.1 14.6-1.4 15.7c-2.3 1.7-3 2-3 2m.4-17s.3 13-1 25m-4.7.7s6.8-1 9.1-1M46 270l-.9 4.6m1.8-11.3-.8 4.1m16.6-64.9c-.3 1.6 0 2-.4 3.4 0 0-2.8 2-2.3 4s-.3 3.4-4.5 17.2c-1.8 5.8-4.3 19-6.2 28.3l-1.1 5.8m16-67-1 4.9m8.1-52.3-1.2 10.9s-1.2.1-.5 2.3c0 1.4-2.8 16.4-5.4 31.6m-20 82.1h13.9",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#192064",
  d: "M106.2 142.1c-3-.5-18.8-2.7-36.2.2a.6.6 0 0 0-.6.7v3a.6.6 0 0 0 .8.6c3.3-.5 17-2.4 35.6-.3.4 0 .7-.2.7-.5.2-1.4.2-2.5.2-3a.6.6 0 0 0-.5-.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M96.4 145.3v-5.1a.8.8 0 0 0-.8-.9 114.1 114.1 0 0 0-8.1 0 .8.8 0 0 0-.9.8v5.1c0 .5.4.9.9.9h8a.8.8 0 0 0 .9-.8"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#192064",
  d: "M95.2 144.3v-3.2a.7.7 0 0 0-.6-.7h-6.1a.7.7 0 0 0-.6.7v3.2c0 .4.3.7.6.7h6c.4 0 .7-.3.7-.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#648BD8",
  d: "M90.1 273.5h12.8m-11.7-3.7v6.3m-.3-12.6v4.5m-.5-97.6 1 46.4s.7 1.6-.3 2.8c-.9 1.1 2.6.7 1 2.3-1.7 1.6.9 1.2 0 3.5-.6 1.6-1 22-1.2 36.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#E4EBF7",
  d: "M73.7 98.7 76 103s2 .8 1.8 2.7l.8 2.2m-14.3 8.7c.2-1 2.2-7.1 12.6-10.5m.7-16s7.7 6 16.5 2.7",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "M92 87s5.5-.9 7.5-4.6c1.3-.3.8 2.2-.3 3.7l-1 1.5s.2.3.2.9c0 .6-.2.6-.3 1v1l-.4 1c-.1.2 0 .6-.2.9-.2.4-1.6 1.8-2.6 2.8-3.8 3.6-5 1.7-6-.4-1-1.8-.7-5.1-.9-6.9-.3-2.9-2.6-3-2-4.4.4-.7 3 .7 3.4 1.8.7 2 2.9 1.8 2.6 1.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "M99.8 82.4c-.5.1-.3.3-1 1.3-.6 1-4.8 2.9-6.4 3.2-2.5.5-2.2-1.6-4.2-2.9-1.7-1-3.6-.6-1.4 1.4 1 1 1 1.1 1.4 3.2.3 1.5-.7 3.7.7 5.6",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: ".8"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#E59788",
  d: "M79.5 108.7c-2 2.9-4.2 6.1-5.5 8.7",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: ".8"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "M87.7 124.8s-2-2-5.1-2.8c-3-.7-3.6-.1-5.5.1-2 .3-4-.9-3.7.7.3 1.7 5 1 5.2 2.1.2 1.1-6.3 2.8-8.3 2.2-.8.8.5 1.9 2 2.2.3 1.5 2.3 1.5 2.3 1.5s.7 1 2.6 1.1c2.5 1.3 9-.7 11-1.5 2-.9-.5-5.6-.5-5.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#E59788",
  d: "M73.4 122.8s.7 1.2 3.2 1.4c2.3.3 2.6.6 2.6.6s-2.6 3-9.1 2.3m2.3 2.2s3.8 0 5-.7m-2.4 2.2s2 0 3.3-.6m-1 1.7s1.7 0 2.8-.5m-6.8-9s-.6-1.1 1.3-.5c1.7.5 2.8 0 5.1.1 1.4.1 3-.2 4 .2 1.6.8 3.6 2.2 3.6 2.2s10.6 1.2 19-1.1M79 108s-8.4 2.8-13.2 12.1",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: ".8"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#E4EBF7",
  d: "M109.3 112.5s3.4-3.6 7.6-4.6",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#E59788",
  d: "M107.4 123s9.7-2.7 11.4-.9",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: ".8"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#BFCDDD",
  d: "m194.6 83.7 4-4M187.2 91l3.7-3.6m.9-3-4.5-4.7m11.2 11.5-4.2-4.3m-65 76.3 3.7-3.7M122.3 170l3.5-3.5m.8-2.9-4.3-4.2M133 170l-4-4",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#A3B4C6",
  d: "M190.2 211.8h-1.6a4 4 0 0 1-4-4v-32.1a4 4 0 0 1 4-4h1.6a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#A3B4C6",
  d: "M237.8 213a4.8 4.8 0 0 1-4.8 4.8h-86.6a4.8 4.8 0 0 1 0-9.6H233a4.8 4.8 0 0 1 4.8 4.8"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#A3B4C6",
  d: "M154.1 190.1h70.5v-84.6h-70.5z"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#BFCDDD",
  d: "M225 190.1h-71.2a3.2 3.2 0 0 1-3.2-3.2v-19a3.2 3.2 0 0 1 3.2-3.2h71.1a3.2 3.2 0 0 1 3.2 3.2v19a3.2 3.2 0 0 1-3.2 3.2m0-59.3h-71.1a3.2 3.2 0 0 1-3.2-3.2v-19a3.2 3.2 0 0 1 3.2-3.2h71.1a3.2 3.2 0 0 1 3.2 3.3v19a3.2 3.2 0 0 1-3.2 3.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M159.6 120.5a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m48.1 0h-22.4a.8.8 0 0 1-.8-.8v-3.2c0-.4.3-.8.8-.8h22.4c.5 0 .8.4.8.8v3.2c0 .5-.3.8-.8.8"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#BFCDDD",
  d: "M225 160.5h-71.2a3.2 3.2 0 0 1-3.2-3.2v-19a3.2 3.2 0 0 1 3.2-3.2h71.1a3.2 3.2 0 0 1 3.2 3.2v19a3.2 3.2 0 0 1-3.2 3.2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#7C90A5",
  d: "M173.5 130.8h49.3m-57.8 0h6m-15 0h6.7m11.1 29.8h49.3m-57.7 0h6m-15.8 0h6.7",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M159.6 151a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m48.1 0h-22.4a.8.8 0 0 1-.8-.8V147c0-.4.3-.8.8-.8h22.4c.5 0 .8.4.8.8v3.2c0 .5-.3.8-.8.8m-63 29a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.5 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m7.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m48.1 0h-22.4a.8.8 0 0 1-.8-.8V176c0-.5.3-.8.8-.8h22.4c.5 0 .8.3.8.8v3.2c0 .4-.3.8-.8.8"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#BFCDDD",
  d: "M203 221.1h-27.3a2.4 2.4 0 0 1-2.4-2.4v-11.4a2.4 2.4 0 0 1 2.4-2.5H203a2.4 2.4 0 0 1 2.4 2.5v11.4a2.4 2.4 0 0 1-2.4 2.4"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#A3B4C6",
  d: "M177.3 207.2v11.5m23.8-11.5v11.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#5BA02E",
  d: "M162.9 267.9a9.4 9.4 0 0 1-9.4-9.4v-14.8a9.4 9.4 0 0 1 18.8 0v14.8a9.4 9.4 0 0 1-9.4 9.4"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#92C110",
  d: "M171.2 267.8a9.4 9.4 0 0 1-9.4-9.4V255a9.4 9.4 0 0 1 18.8 0v3.4a9.4 9.4 0 0 1-9.4 9.4"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#F2D7AD",
  d: "M181.3 293.7h-27.7a3.2 3.2 0 0 1-3.2-3.2v-20.7a3.2 3.2 0 0 1 3.2-3.2h27.7a3.2 3.2 0 0 1 3.2 3.2v20.7a3.2 3.2 0 0 1-3.2 3.2"
})));
const genBaseStyle$2 = (token) => {
  const {
    componentCls,
    lineHeightHeading3,
    iconCls,
    padding,
    paddingXL,
    paddingXS,
    paddingLG,
    marginXS,
    lineHeight
  } = token;
  return {
    // Result
    [componentCls]: {
      padding: `${unit(token.calc(paddingLG).mul(2).equal())} ${unit(paddingXL)}`,
      // RTL
      "&-rtl": {
        direction: "rtl"
      }
    },
    // Exception Status image
    [`${componentCls} ${componentCls}-image`]: {
      width: token.imageWidth,
      height: token.imageHeight,
      margin: "auto"
    },
    [`${componentCls} ${componentCls}-icon`]: {
      marginBottom: paddingLG,
      textAlign: "center",
      [`& > ${iconCls}`]: {
        fontSize: token.iconFontSize
      }
    },
    [`${componentCls} ${componentCls}-title`]: {
      color: token.colorTextHeading,
      fontSize: token.titleFontSize,
      lineHeight: lineHeightHeading3,
      marginBlock: marginXS,
      textAlign: "center"
    },
    [`${componentCls} ${componentCls}-subtitle`]: {
      color: token.colorTextDescription,
      fontSize: token.subtitleFontSize,
      lineHeight,
      textAlign: "center"
    },
    [`${componentCls} ${componentCls}-content`]: {
      marginTop: paddingLG,
      padding: `${unit(paddingLG)} ${unit(token.calc(padding).mul(2.5).equal())}`,
      backgroundColor: token.colorFillAlter
    },
    [`${componentCls} ${componentCls}-extra`]: {
      margin: token.extraMargin,
      textAlign: "center",
      "& > *": {
        marginInlineEnd: paddingXS,
        "&:last-child": {
          marginInlineEnd: 0
        }
      }
    }
  };
};
const genStatusIconStyle = (token) => {
  const {
    componentCls,
    iconCls
  } = token;
  return {
    [`${componentCls}-success ${componentCls}-icon > ${iconCls}`]: {
      color: token.resultSuccessIconColor
    },
    [`${componentCls}-error ${componentCls}-icon > ${iconCls}`]: {
      color: token.resultErrorIconColor
    },
    [`${componentCls}-info ${componentCls}-icon > ${iconCls}`]: {
      color: token.resultInfoIconColor
    },
    [`${componentCls}-warning ${componentCls}-icon > ${iconCls}`]: {
      color: token.resultWarningIconColor
    }
  };
};
const genResultStyle = (token) => [genBaseStyle$2(token), genStatusIconStyle(token)];
const getStyle = (token) => genResultStyle(token);
const prepareComponentToken$6 = (token) => ({
  titleFontSize: token.fontSizeHeading3,
  subtitleFontSize: token.fontSize,
  iconFontSize: token.fontSizeHeading3 * 3,
  extraMargin: `${token.paddingLG}px 0 0 0`
});
const useStyle$6 = genStyleHooks("Result", (token) => {
  const resultInfoIconColor = token.colorInfo;
  const resultErrorIconColor = token.colorError;
  const resultSuccessIconColor = token.colorSuccess;
  const resultWarningIconColor = token.colorWarning;
  const resultToken = merge(token, {
    resultInfoIconColor,
    resultErrorIconColor,
    resultSuccessIconColor,
    resultWarningIconColor,
    imageWidth: 250,
    imageHeight: 295
  });
  return [getStyle(resultToken)];
}, prepareComponentToken$6);
const Unauthorized = () => /* @__PURE__ */ reactExports.createElement("svg", {
  width: "251",
  height: "294"
}, /* @__PURE__ */ reactExports.createElement("title", null, "Unauthorized"), /* @__PURE__ */ reactExports.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#E4EBF7",
  d: "M0 129v-2C0 58.3 55.6 2.7 124.2 2.7h2c68.6 0 124.2 55.6 124.2 124.1v2.1c0 68.6-55.6 124.2-124.1 124.2h-2.1A124.2 124.2 0 0 1 0 129"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M41.4 133a8.2 8.2 0 1 1-16.4-1.7 8.2 8.2 0 0 1 16.4 1.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#FFF",
  d: "m38.7 136.4 10.4 5.9m.9 6.2-12.6 10.7",
  strokeWidth: "2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M41.5 161.3a5.6 5.6 0 1 1-11.2-1.2 5.6 5.6 0 0 1 11.2 1.2m17.7-16a5.7 5.7 0 1 1-11.3-1.2 5.7 5.7 0 0 1 11.3 1.2m41.2-115.8H130a4.6 4.6 0 1 0 0-9.1h-29.6a4.6 4.6 0 0 0 0 9.1m11.3 18.3h29.7a4.6 4.6 0 1 0 0-9.2h-29.7a4.6 4.6 0 1 0 0 9.2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M114 29.5h15.8a4.6 4.6 0 1 0 0 9.1H114a4.6 4.6 0 0 0 0-9.1m71.3 108.2a10 10 0 1 1-19.8-2 10 10 0 0 1 19.8 2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#FFF",
  d: "m180.2 143.8 12.5 7.1m1.1 7.5-15.1 13",
  strokeWidth: "2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M185.6 172a6.8 6.8 0 1 1-13.6-1.4 6.8 6.8 0 0 1 13.5 1.3m18.6-16.6a6.8 6.8 0 1 1-13.6-1.4 6.8 6.8 0 0 1 13.6 1.4"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#FFF",
  d: "M153 194a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zm73-75.8a2.2 2.2 0 1 1-4.5 0 2.2 2.2 0 0 1 4.4 0zm-9 34.9a2.2 2.2 0 1 1-4.3 0 2.2 2.2 0 0 1 4.4 0zm-39.2-43.3a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zm18.3-15.3a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0zm6.7 88a2.2 2.2 0 1 1-4.4 0 2.2 2.2 0 0 1 4.4 0z",
  strokeWidth: "2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#FFF",
  d: "m215.1 155.3-1.9 20-10.8 6m-27.8-4.7-6.3 9.8H157l-4.5 6.4m23.4-65.5v-15.7m45.6 7.8-12.8 7.9-15.2-7.9V96.7",
  strokeWidth: "2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#A26EF4",
  d: "M180.7 29.3a29.3 29.3 0 1 1 58.6 0 29.3 29.3 0 0 1-58.6 0"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "m221.4 41.7-21.5-.1a1.7 1.7 0 0 1-1.7-1.8V27.6a1.7 1.7 0 0 1 1.8-1.7h21.5c1 0 1.8.9 1.8 1.8l-.1 12.3a1.7 1.7 0 0 1-1.7 1.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M215.1 29.2c0 2.6-2 4.6-4.5 4.6a4.6 4.6 0 0 1-4.5-4.7v-6.9c0-2.6 2-4.6 4.6-4.6 2.5 0 4.5 2 4.4 4.7v6.9zm-4.5-14a6.9 6.9 0 0 0-7 6.8v7.3a6.9 6.9 0 0 0 13.8.1V22a6.9 6.9 0 0 0-6.8-6.9zm-43 53.2h-4a4.7 4.7 0 0 1-4.7-4.8 4.7 4.7 0 0 1 4.7-4.7h4a4.7 4.7 0 0 1 4.7 4.8 4.7 4.7 0 0 1-4.7 4.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#5BA02E",
  d: "M168.2 248.8a6.6 6.6 0 0 1-6.6-6.6v-66a6.6 6.6 0 0 1 13.2 0v66a6.6 6.6 0 0 1-6.6 6.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#92C110",
  d: "M176.1 248.2a6.6 6.6 0 0 1-6.6-6.6v-33a6.6 6.6 0 1 1 13.3 0v33a6.6 6.6 0 0 1-6.7 6.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#F2D7AD",
  d: "M186 293.9h-27.4a3.2 3.2 0 0 1-3.2-3.2v-45.9a3.2 3.2 0 0 1 3.2-3.1H186a3.2 3.2 0 0 1 3.2 3.1v46a3.2 3.2 0 0 1-3.2 3"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M82 147.7s6.3-1 17.5-1.3c11.8-.4 17.6 1 17.6 1s3.7-3.8 1-8.3c1.3-12.1 6-32.9.3-48.3-1.1-1.4-3.7-1.5-7.5-.6-1.4.3-7.2-.2-8-.1l-15.3-.4-8-.5c-1.6-.1-4.3-1.7-5.5-.3-.4.4-2.4 5.6-2 16l8.7 35.7s-3.2 3.6 1.2 7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "m75.8 73.3-1-6.4 12-6.5s7.4-.1 8 1.2c.8 1.3-5.5 1-5.5 1s-1.9 1.4-2.6 2.5c-1.7 2.4-1 6.5-8.4 6-1.7.3-2.5 2.2-2.5 2.2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFB594",
  d: "M52.4 77.7S66.7 87 77.4 92c1 .5-2 16.2-11.9 11.8-7.4-3.3-20.1-8.4-21.5-14.5-.7-3.2 2.6-7.6 8.4-11.7M142 80s-6.7 3-13.9 6.9c-3.9 2.1-10.1 4.7-12.3 8-6.2 9.3 3.5 11.2 13 7.5 6.6-2.7 29-12.1 13.2-22.4"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "m76.2 66.4 3 3.8S76.4 73 73 76c-7 6.2-12.8 14.3-16 16.4-4 2.7-9.7 3.3-12.2 0-3.5-5.1.5-14.7 31.5-26"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M64.7 85.1s-2.4 8.4-9 14.5c.7.5 18.6 10.5 22.2 10 5.2-.6 6.4-19 1.2-20.5-.8-.2-6-1.3-8.9-2.2-.9-.2-1.6-1.7-3.5-1l-2-.8zm63.7.7s5.3 2 7.3 13.8c-.6.2-17.6 12.3-21.8 7.8-6.6-7-.8-17.4 4.2-18.6 4.7-1.2 5-1.4 10.3-3"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#E4EBF7",
  d: "M78.2 94.7s.9 7.4-5 13",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#E4EBF7",
  d: "M87.4 94.7s3.1 2.6 10.3 2.6c7.1 0 9-3.5 9-3.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: ".9"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "m117.2 68.6-6.8-6.1s-5.4-4.4-9.2-1c-3.9 3.5 4.4 2.2 5.6 4.2 1.2 2.1.9 1.2-2 .5-5.7-1.4-2.1.9 3 5.3 2 1.9 7 1 7 1l2.4-3.9z"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFB594",
  d: "m105.3 91.3-.3-11H89l-.5 10.5c0 .4.2.8.6 1 2 1.3 9.3 5 15.8.4.2-.2.4-.5.4-.9"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#5C2552",
  d: "M107.6 74.2c.8-1.1 1-9 1-11.9a1 1 0 0 0-1-1l-4.6-.4c-7.7-1-17 .6-18.3 6.3-5.4 5.9-.4 13.3-.4 13.3s2 3.5 4.3 6.8c.8 1 .4-3.8 3-6a47.9 47.9 0 0 1 16-7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "M88.4 83.2s2.7 6.2 11.6 6.5c7.8.3 9-7 7.5-17.5l-1-5.5c-6-2.9-15.4.6-15.4.6s-.6 2-.2 5.5c-2.3 2-1.8 5.6-1.8 5.6s-1-2-2-2.3c-.9-.3-2 0-2.3 2-1 4.6 3.6 5.1 3.6 5.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "m100.8 77.1 1.7-1-1-4.3.7-1.4",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#552950",
  d: "M105.5 74c0 .8-.4 1.4-1 1.4-.4 0-.8-.7-.8-1.4s.5-1.2 1-1.2.9.6.8 1.3m-8 .2c0 .8-.4 1.3-.9 1.3s-.9-.6-.9-1.3c0-.7.5-1.3 1-1.3s1 .6.9 1.3"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "M91.1 86.8s5.3 5 12.7 2.3",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#DB836E",
  d: "M99.8 81.9s-3.6.2-1.5-2.8c1.6-1.5 5-.4 5-.4s1 3.9-3.5 3.2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#5C2552",
  d: "M102.9 70.6s2.5.8 3.4.7m-12.4.7s2.5-1.2 4.8-1.1",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.5"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "M86.3 77.4s1 .9 1.5 2c-.4.6-1 1.2-.3 1.9m11.8 2.4s2 .2 2.5-.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#E4EBF7",
  d: "m87.8 115.8 15.7-3m-3.3 3 10-2m-43.7-27s-1.6 8.8-6.7 14M128.3 88s3 4 4 11.7",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "M64 84.8s-6 10-13.5 10",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: ".8"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFC6A0",
  d: "m112.4 66-.2 5.2 12 9.2c4.5 3.6 8.9 7.5 11 8.7 4.8 2.8 8.9 3.3 11 1.8 4.1-2.9 4.4-9.9-8.1-15.3-4.3-1.8-16.1-6.3-25.7-9.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#DB836E",
  d: "M130.5 85.5s4.6 5.7 11.7 6.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: ".8"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#E4EBF7",
  d: "M121.7 105.7s-.4 8.6-1.3 13.6",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#648BD8",
  d: "M115.8 161.5s-3.6-1.5-2.7-7.1",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#CBD1D1",
  d: "M101.5 290.2s4.3 2.1 7.4 1c2.9-.9 4.6.7 7.2 1.3 2.5.5 6.9 1 11.7-1.3 0-5.6-7-4-12-6.8-2.6-1.4-3.8-4.7-3.6-8.8h-9.5s-1.4 10.6-1.2 14.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#2B0849",
  d: "M101.5 290s2.4 1.4 6.8.7c3-.4 3.7.5 7.5 1 3.7.6 10.8 0 11.9-.8.4 1-.4 2-.4 2s-1.5.7-4.8.9c-2 .1-5.8.3-7.7-.5-1.8-1.4-5.2-2-5.7-.3-4 1-7.4-.3-7.4-.3l-.2-2.6z"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#A4AABA",
  d: "M108.8 276.2h3.1s0 6.7 4.6 8.6c-4.7.6-8.6-2.3-7.7-8.6"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#CBD1D1",
  d: "M57.6 272.5s-2 7.5-4.5 12.4c-1.8 3.7-4.2 7.6 5.5 7.6 6.7 0 9-.5 7.5-6.7-1.5-6.1.3-13.3.3-13.3h-8.8z"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#2B0849",
  d: "M51.5 290s2.2 1.2 6.7 1.2c6.1 0 8.3-1.6 8.3-1.6s.6 1-.6 2.1c-1 .9-3.6 1.6-7.4 1.6-4.2 0-6-.6-6.8-1.2-.9-.5-.7-1.6-.2-2"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#A4AABA",
  d: "M58.5 274.4s0 1.6-.3 3-1 3.1-1.1 4.2c0 1.1 4.5 1.5 5.2 0 .6-1.6 1.3-6.5 1.9-7.3.6-.8-5-2.1-5.7.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#7BB2F9",
  d: "m100.9 277 13.3.1s1.3-54.2 1.8-64c.6-9.9 3.8-43.2 1-62.8l-12.4-.7-22.8.8-1.2 10c0 .4-.6.8-.7 1.3 0 .6.4 1.3.3 2-2.3 14-6.3 32.9-8.7 46.4-.1.6-1.2 1-1.4 2.6 0 .3.2 1.6 0 1.8-6.8 18.7-10.8 47.6-14.1 61.6h14.5s2.2-8.6 4-17a3984 3984 0 0 1 23-84.5l3-.5 1 46.1s-.2 1.2.4 2c.5.8-.6 1.1-.4 2.3l.4 1.7-1 11.9c-.4 4.6 0 39 0 39"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#648BD8",
  d: "M77.4 220.4c1.2.1 4-2 7-4.9m23.1 8.4s2.8-1 6.1-3.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#648BD8",
  d: "M108.5 221s2.7-1.2 6-4",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#648BD8",
  d: "M76.1 223.6s2.6-.6 6.5-3.4m4.7-69.4c-.2 3.1.3 8.5-4.3 9m21.8-10.7s.1 14-1.3 15c-2.2 1.6-3 1.9-3 1.9m.5-16.4s0 12.8-1.2 24.3m-4.9 1s7.2-1.6 9.4-1.6m-28.6 31.5-1 4.5s-1.5 1.8-1 3.7c.4 2-1 2-5 15.3-1.7 5.6-4.4 18.5-6.3 27.5l-4 18.4M77 196.7a313.3 313.3 0 0 1-.8 4.8m7.7-50-1.2 10.3s-1 .2-.5 2.3c.1 1.3-2.6 15.6-5.1 30.2M57.6 273h13.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#192064",
  d: "M117.4 147.4s-17-3-35.7.2v4.2s14.6-2.9 35.5-.4l.2-4"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#FFF",
  d: "M107.5 150.4v-5a.8.8 0 0 0-.8-.7H99a.8.8 0 0 0-.7.8v4.8c0 .5.3.9.8.8a140.8 140.8 0 0 1 7.7 0 .8.8 0 0 0 .8-.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  fill: "#192064",
  d: "M106.4 149.4v-3a.6.6 0 0 0-.6-.7 94.1 94.1 0 0 0-5.8 0 .6.6 0 0 0-.7.7v3c0 .4.3.7.7.7h5.7c.4 0 .7-.3.7-.7"
}), /* @__PURE__ */ reactExports.createElement("path", {
  stroke: "#648BD8",
  d: "M101.5 274h12.3m-11.1-5v6.5m0-12.4v4.3m-.5-93.4.9 44.4s.7 1.6-.2 2.7c-1 1.1 2.4.7.9 2.2-1.6 1.6.9 1.1 0 3.4-.6 1.5-1 21-1.1 35",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "1.1"
})));
const IconMap = {
  success: RefIcon$l,
  error: RefIcon$k,
  info: RefIcon$j,
  warning: RefIcon$3
};
const ExceptionMap = {
  "404": NoFound,
  "500": ServerError,
  "403": Unauthorized
};
const ExceptionStatus = Object.keys(ExceptionMap);
const Icon = ({
  prefixCls,
  icon,
  status
}) => {
  const className = classNames(`${prefixCls}-icon`);
  if (ExceptionStatus.includes(`${status}`)) {
    const SVGComponent = ExceptionMap[status];
    return /* @__PURE__ */ reactExports.createElement("div", {
      className: `${className} ${prefixCls}-image`
    }, /* @__PURE__ */ reactExports.createElement(SVGComponent, null));
  }
  const iconNode = /* @__PURE__ */ reactExports.createElement(IconMap[status]);
  if (icon === null || icon === false) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className
  }, icon || iconNode);
};
const Extra = ({
  prefixCls,
  extra
}) => {
  if (!extra) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-extra`
  }, extra);
};
const Result = ({
  prefixCls: customizePrefixCls,
  className: customizeClassName,
  rootClassName,
  subTitle,
  title,
  style,
  children,
  status = "info",
  icon,
  extra
}) => {
  const {
    getPrefixCls,
    direction,
    result
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("result", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$6(prefixCls);
  const className = classNames(prefixCls, `${prefixCls}-${status}`, customizeClassName, result === null || result === void 0 ? void 0 : result.className, rootClassName, {
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, hashId, cssVarCls);
  const mergedStyle = Object.assign(Object.assign({}, result === null || result === void 0 ? void 0 : result.style), style);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
    className,
    style: mergedStyle
  }, /* @__PURE__ */ reactExports.createElement(Icon, {
    prefixCls,
    status,
    icon
  }), /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-title`
  }, title), subTitle && /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-subtitle`
  }, subTitle), /* @__PURE__ */ reactExports.createElement(Extra, {
    prefixCls,
    extra
  }), children && /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-content`
  }, children)));
};
Result.PRESENTED_IMAGE_403 = ExceptionMap["403"];
Result.PRESENTED_IMAGE_404 = ExceptionMap["404"];
Result.PRESENTED_IMAGE_500 = ExceptionMap["500"];
const InternalPanel = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls,
    className,
    children,
    size,
    style = {}
  } = props;
  const panelClassName = classNames(`${prefixCls}-panel`, {
    [`${prefixCls}-panel-hidden`]: size === 0
  }, className);
  const hasSize = size !== void 0;
  return /* @__PURE__ */ React.createElement("div", {
    ref,
    className: panelClassName,
    style: Object.assign(Object.assign({}, style), {
      // Use auto when start from ssr
      flexBasis: hasSize ? size : "auto",
      flexGrow: hasSize ? 0 : 1
    })
  }, children);
});
const Panel = () => null;
var __rest$d = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function getCollapsible(collapsible) {
  if (collapsible && typeof collapsible === "object") {
    return Object.assign(Object.assign({}, collapsible), {
      showCollapsibleIcon: collapsible.showCollapsibleIcon === void 0 ? "auto" : collapsible.showCollapsibleIcon
    });
  }
  const mergedCollapsible = !!collapsible;
  return {
    start: mergedCollapsible,
    end: mergedCollapsible,
    showCollapsibleIcon: "auto"
  };
}
function useItems(children) {
  const items = reactExports.useMemo(() => toArray$1(children).filter((item) => /* @__PURE__ */ reactExports.isValidElement(item)).map((node) => {
    const {
      props
    } = node;
    const {
      collapsible
    } = props, restProps = __rest$d(props, ["collapsible"]);
    return Object.assign(Object.assign({}, restProps), {
      collapsible: getCollapsible(collapsible)
    });
  }), [children]);
  return items;
}
function getShowCollapsibleIcon(prev, next) {
  if (prev.collapsible && next.collapsible) {
    if (prev.showCollapsibleIcon === true || next.showCollapsibleIcon === true) {
      return true;
    }
    if (prev.showCollapsibleIcon === "auto" || next.showCollapsibleIcon === "auto") {
      return "auto";
    }
    return false;
  }
  if (prev.collapsible) {
    return prev.showCollapsibleIcon;
  }
  if (next.collapsible) {
    return next.showCollapsibleIcon;
  }
  return false;
}
function useResizable(items, pxSizes, isRTL) {
  return reactExports.useMemo(() => {
    const resizeInfos = [];
    for (let i = 0; i < items.length - 1; i += 1) {
      const prevItem = items[i];
      const nextItem = items[i + 1];
      const prevSize = pxSizes[i];
      const nextSize = pxSizes[i + 1];
      const {
        resizable: prevResizable = true,
        min: prevMin,
        collapsible: prevCollapsible
      } = prevItem;
      const {
        resizable: nextResizable = true,
        min: nextMin,
        collapsible: nextCollapsible
      } = nextItem;
      const mergedResizable = (
        // Both need to be resizable
        prevResizable && nextResizable && // Prev is not collapsed and limit min size
        (prevSize !== 0 || !prevMin) && // Next is not collapsed and limit min size
        (nextSize !== 0 || !nextMin)
      );
      const prevEndCollapsible = !!prevCollapsible.end && prevSize > 0;
      const nextStartExpandable = !!nextCollapsible.start && nextSize === 0 && prevSize > 0;
      const startCollapsible = prevEndCollapsible || nextStartExpandable;
      const nextStartCollapsible = !!nextCollapsible.start && nextSize > 0;
      const prevEndExpandable = !!prevCollapsible.end && prevSize === 0 && nextSize > 0;
      const endCollapsible = nextStartCollapsible || prevEndExpandable;
      const showStartCollapsibleIcon = getShowCollapsibleIcon({
        collapsible: prevEndCollapsible,
        showCollapsibleIcon: prevCollapsible.showCollapsibleIcon
      }, {
        collapsible: nextStartExpandable,
        showCollapsibleIcon: nextCollapsible.showCollapsibleIcon
      });
      const showEndCollapsibleIcon = getShowCollapsibleIcon({
        collapsible: nextStartCollapsible,
        showCollapsibleIcon: nextCollapsible.showCollapsibleIcon
      }, {
        collapsible: prevEndExpandable,
        showCollapsibleIcon: prevCollapsible.showCollapsibleIcon
      });
      resizeInfos[i] = {
        resizable: mergedResizable,
        startCollapsible: !!(isRTL ? endCollapsible : startCollapsible),
        endCollapsible: !!(isRTL ? startCollapsible : endCollapsible),
        showStartCollapsibleIcon: isRTL ? showEndCollapsibleIcon : showStartCollapsibleIcon,
        showEndCollapsibleIcon: isRTL ? showStartCollapsibleIcon : showEndCollapsibleIcon
      };
    }
    return resizeInfos;
  }, [pxSizes, items, isRTL]);
}
function autoPtgSizes(ptgSizes, minPtgSizes, maxPtgSizes) {
  let currentTotalPtg = 0;
  const undefinedIndexes = [];
  ptgSizes.forEach((size, index2) => {
    if (size === void 0) {
      undefinedIndexes.push(index2);
    } else {
      currentTotalPtg += size;
    }
  });
  const restPtg = 1 - currentTotalPtg;
  const undefinedCount = undefinedIndexes.length;
  if (ptgSizes.length && !undefinedIndexes.length && currentTotalPtg !== 1) {
    if (currentTotalPtg === 0) {
      const avg = 1 / ptgSizes.length;
      return ptgSizes.map(() => avg);
    }
    const scale = 1 / currentTotalPtg;
    return ptgSizes.map((size) => size * scale);
  }
  if (restPtg < 0) {
    const scale = 1 / currentTotalPtg;
    return ptgSizes.map((size) => size === void 0 ? 0 : size * scale);
  }
  let sumMin = 0;
  let sumMax = 0;
  let limitMin = 0;
  let limitMax = 1;
  for (const index2 of undefinedIndexes) {
    const min = minPtgSizes[index2] || 0;
    const max = maxPtgSizes[index2] || 1;
    sumMin += min;
    sumMax += max;
    limitMin = Math.max(limitMin, min);
    limitMax = Math.min(limitMax, max);
  }
  if (sumMin > 1 && sumMax < 1) {
    const avg = 1 / undefinedCount;
    return ptgSizes.map((size) => size === void 0 ? avg : size);
  }
  const restAvg = restPtg / undefinedCount;
  if (limitMin <= restAvg && restAvg <= limitMax) {
    return ptgSizes.map((size) => size === void 0 ? restAvg : size);
  }
  const result = _toConsumableArray(ptgSizes);
  let remain = restPtg - sumMin;
  for (let i = 0; i < undefinedCount; i += 1) {
    const index2 = undefinedIndexes[i];
    const min = minPtgSizes[index2] || 0;
    const max = maxPtgSizes[index2] || 1;
    result[index2] = min;
    const canAdd = max - min;
    const add = Math.min(canAdd, remain);
    result[index2] += add;
    remain -= add;
  }
  return result;
}
function getPtg(str) {
  return Number(str.slice(0, -1)) / 100;
}
function isPtg(itemSize) {
  return typeof itemSize === "string" && itemSize.endsWith("%");
}
function useSizes(items, containerSize) {
  const propSizes = items.map((item) => item.size);
  const itemsCount = items.length;
  const mergedContainerSize = containerSize || 0;
  const ptg2px = (ptg) => ptg * mergedContainerSize;
  const [innerSizes, setInnerSizes] = React.useState(() => items.map((item) => item.defaultSize));
  const sizes = React.useMemo(() => {
    var _a;
    const mergedSizes = [];
    for (let i = 0; i < itemsCount; i += 1) {
      mergedSizes[i] = (_a = propSizes[i]) !== null && _a !== void 0 ? _a : innerSizes[i];
    }
    return mergedSizes;
  }, [itemsCount, innerSizes, propSizes]);
  const postPercentMinSizes = React.useMemo(() => items.map((item) => {
    if (isPtg(item.min)) {
      return getPtg(item.min);
    }
    return (item.min || 0) / mergedContainerSize;
  }), [items, mergedContainerSize]);
  const postPercentMaxSizes = React.useMemo(() => items.map((item) => {
    if (isPtg(item.max)) {
      return getPtg(item.max);
    }
    return (item.max || mergedContainerSize) / mergedContainerSize;
  }), [items, mergedContainerSize]);
  const postPercentSizes = React.useMemo(() => {
    const ptgList = [];
    for (let i = 0; i < itemsCount; i += 1) {
      const itemSize = sizes[i];
      if (isPtg(itemSize)) {
        ptgList[i] = getPtg(itemSize);
      } else if (itemSize || itemSize === 0) {
        const num = Number(itemSize);
        if (!Number.isNaN(num)) {
          ptgList[i] = num / mergedContainerSize;
        }
      } else {
        ptgList[i] = void 0;
      }
    }
    return autoPtgSizes(ptgList, postPercentMinSizes, postPercentMaxSizes);
  }, [sizes, mergedContainerSize, postPercentMinSizes, postPercentMaxSizes]);
  const postPxSizes = React.useMemo(() => postPercentSizes.map(ptg2px), [postPercentSizes, mergedContainerSize]);
  const panelSizes = React.useMemo(() => containerSize ? postPxSizes : sizes, [postPxSizes, containerSize]);
  return [panelSizes, postPxSizes, postPercentSizes, postPercentMinSizes, postPercentMaxSizes, setInnerSizes];
}
function useResize(items, resizableInfos, percentSizes, containerSize, updateSizes, isRTL) {
  const limitSizes = items.map((item) => [item.min, item.max]);
  const mergedContainerSize = containerSize || 0;
  const ptg2px = (ptg) => ptg * mergedContainerSize;
  function getLimitSize(str, defaultLimit) {
    if (typeof str === "string") {
      return ptg2px(getPtg(str));
    }
    return str !== null && str !== void 0 ? str : defaultLimit;
  }
  const [cacheSizes, setCacheSizes] = reactExports.useState([]);
  const cacheCollapsedSize = reactExports.useRef([]);
  const [movingIndex, setMovingIndex] = reactExports.useState(null);
  const getPxSizes = () => percentSizes.map(ptg2px);
  const onOffsetStart = (index2) => {
    setCacheSizes(getPxSizes());
    setMovingIndex({
      index: index2,
      confirmed: false
    });
  };
  const onOffsetUpdate = (index2, offset) => {
    var _a;
    let confirmedIndex = null;
    if ((!movingIndex || !movingIndex.confirmed) && offset !== 0) {
      if (offset > 0) {
        confirmedIndex = index2;
        setMovingIndex({
          index: index2,
          confirmed: true
        });
      } else {
        for (let i = index2; i >= 0; i -= 1) {
          if (cacheSizes[i] > 0 && resizableInfos[i].resizable) {
            confirmedIndex = i;
            setMovingIndex({
              index: i,
              confirmed: true
            });
            break;
          }
        }
      }
    }
    const mergedIndex = (_a = confirmedIndex !== null && confirmedIndex !== void 0 ? confirmedIndex : movingIndex === null || movingIndex === void 0 ? void 0 : movingIndex.index) !== null && _a !== void 0 ? _a : index2;
    const numSizes = _toConsumableArray(cacheSizes);
    const nextIndex = mergedIndex + 1;
    const startMinSize = getLimitSize(limitSizes[mergedIndex][0], 0);
    const endMinSize = getLimitSize(limitSizes[nextIndex][0], 0);
    const startMaxSize = getLimitSize(limitSizes[mergedIndex][1], mergedContainerSize);
    const endMaxSize = getLimitSize(limitSizes[nextIndex][1], mergedContainerSize);
    let mergedOffset = offset;
    if (numSizes[mergedIndex] + mergedOffset < startMinSize) {
      mergedOffset = startMinSize - numSizes[mergedIndex];
    }
    if (numSizes[nextIndex] - mergedOffset < endMinSize) {
      mergedOffset = numSizes[nextIndex] - endMinSize;
    }
    if (numSizes[mergedIndex] + mergedOffset > startMaxSize) {
      mergedOffset = startMaxSize - numSizes[mergedIndex];
    }
    if (numSizes[nextIndex] - mergedOffset > endMaxSize) {
      mergedOffset = numSizes[nextIndex] - endMaxSize;
    }
    numSizes[mergedIndex] += mergedOffset;
    numSizes[nextIndex] -= mergedOffset;
    updateSizes(numSizes);
    return numSizes;
  };
  const onOffsetEnd = () => {
    setMovingIndex(null);
  };
  const onCollapse = (index2, type) => {
    const currentSizes = getPxSizes();
    const adjustedType = isRTL ? type === "start" ? "end" : "start" : type;
    const currentIndex = adjustedType === "start" ? index2 : index2 + 1;
    const targetIndex = adjustedType === "start" ? index2 + 1 : index2;
    const currentSize = currentSizes[currentIndex];
    const targetSize = currentSizes[targetIndex];
    if (currentSize !== 0 && targetSize !== 0) {
      currentSizes[currentIndex] = 0;
      currentSizes[targetIndex] += currentSize;
      cacheCollapsedSize.current[index2] = currentSize;
    } else {
      const totalSize = currentSize + targetSize;
      const currentSizeMin = getLimitSize(limitSizes[currentIndex][0], 0);
      const currentSizeMax = getLimitSize(limitSizes[currentIndex][1], mergedContainerSize);
      const targetSizeMin = getLimitSize(limitSizes[targetIndex][0], 0);
      const targetSizeMax = getLimitSize(limitSizes[targetIndex][1], mergedContainerSize);
      const limitStart = Math.max(currentSizeMin, totalSize - targetSizeMax);
      const limitEnd = Math.min(currentSizeMax, totalSize - targetSizeMin);
      const halfOffset = targetSizeMin || (limitEnd - limitStart) / 2;
      const targetCacheCollapsedSize = cacheCollapsedSize.current[index2];
      const currentCacheCollapsedSize = totalSize - targetCacheCollapsedSize;
      const shouldUseCache = targetCacheCollapsedSize && targetCacheCollapsedSize <= targetSizeMax && targetCacheCollapsedSize >= targetSizeMin && currentCacheCollapsedSize <= currentSizeMax && currentCacheCollapsedSize >= currentSizeMin;
      if (shouldUseCache) {
        currentSizes[targetIndex] = targetCacheCollapsedSize;
        currentSizes[currentIndex] = currentCacheCollapsedSize;
      } else {
        currentSizes[currentIndex] -= halfOffset;
        currentSizes[targetIndex] += halfOffset;
      }
    }
    updateSizes(currentSizes);
    return currentSizes;
  };
  return [onOffsetStart, onOffsetUpdate, onOffsetEnd, onCollapse, movingIndex === null || movingIndex === void 0 ? void 0 : movingIndex.index];
}
function getValidNumber(num) {
  return typeof num === "number" && !Number.isNaN(num) && Number.isFinite(num) ? Math.round(num) : 0;
}
const SplitBar = (props) => {
  const {
    prefixCls,
    vertical,
    index: index2,
    active,
    ariaNow,
    ariaMin,
    ariaMax,
    resizable,
    startCollapsible,
    endCollapsible,
    onOffsetStart,
    onOffsetUpdate,
    onOffsetEnd,
    onCollapse,
    lazy,
    containerSize,
    showStartCollapsibleIcon,
    showEndCollapsibleIcon
  } = props;
  const splitBarPrefixCls = `${prefixCls}-bar`;
  const [startPos, setStartPos] = reactExports.useState(null);
  const [constrainedOffset, setConstrainedOffset] = reactExports.useState(0);
  const constrainedOffsetX = vertical ? 0 : constrainedOffset;
  const constrainedOffsetY = vertical ? constrainedOffset : 0;
  const onMouseDown = (e2) => {
    if (resizable && e2.currentTarget) {
      setStartPos([e2.pageX, e2.pageY]);
      onOffsetStart(index2);
    }
  };
  const onTouchStart = (e2) => {
    if (resizable && e2.touches.length === 1) {
      const touch = e2.touches[0];
      setStartPos([touch.pageX, touch.pageY]);
      onOffsetStart(index2);
    }
  };
  const getConstrainedOffset = (rawOffset) => {
    const currentPos = containerSize * ariaNow / 100;
    const newPos = currentPos + rawOffset;
    const minAllowed = Math.max(0, containerSize * ariaMin / 100);
    const maxAllowed = Math.min(containerSize, containerSize * ariaMax / 100);
    const clampedPos = Math.max(minAllowed, Math.min(maxAllowed, newPos));
    return clampedPos - currentPos;
  };
  const handleLazyMove = useEvent((offsetX, offsetY) => {
    const constrainedOffsetValue = getConstrainedOffset(vertical ? offsetY : offsetX);
    setConstrainedOffset(constrainedOffsetValue);
  });
  const handleLazyEnd = useEvent(() => {
    onOffsetUpdate(index2, constrainedOffsetX, constrainedOffsetY, true);
    setConstrainedOffset(0);
    onOffsetEnd(true);
  });
  const getVisibilityClass = (mode) => {
    switch (mode) {
      case true:
        return `${splitBarPrefixCls}-collapse-bar-always-visible`;
      case false:
        return `${splitBarPrefixCls}-collapse-bar-always-hidden`;
      case "auto":
        return `${splitBarPrefixCls}-collapse-bar-hover-only`;
    }
  };
  useLayoutEffect(() => {
    if (!startPos) {
      return;
    }
    const onMouseMove = (e2) => {
      const {
        pageX,
        pageY
      } = e2;
      const offsetX = pageX - startPos[0];
      const offsetY = pageY - startPos[1];
      if (lazy) {
        handleLazyMove(offsetX, offsetY);
      } else {
        onOffsetUpdate(index2, offsetX, offsetY);
      }
    };
    const onMouseUp = () => {
      if (lazy) {
        handleLazyEnd();
      } else {
        onOffsetEnd();
      }
      setStartPos(null);
    };
    const handleTouchMove = (e2) => {
      if (e2.touches.length === 1) {
        const touch = e2.touches[0];
        const offsetX = touch.pageX - startPos[0];
        const offsetY = touch.pageY - startPos[1];
        if (lazy) {
          handleLazyMove(offsetX, offsetY);
        } else {
          onOffsetUpdate(index2, offsetX, offsetY);
        }
      }
    };
    const handleTouchEnd = () => {
      if (lazy) {
        handleLazyEnd();
      } else {
        onOffsetEnd();
      }
      setStartPos(null);
    };
    const eventHandlerMap = {
      mousemove: onMouseMove,
      mouseup: onMouseUp,
      touchmove: handleTouchMove,
      touchend: handleTouchEnd
    };
    for (const [event, handler] of Object.entries(eventHandlerMap)) {
      window.addEventListener(event, handler);
    }
    return () => {
      for (const [event, handler] of Object.entries(eventHandlerMap)) {
        window.removeEventListener(event, handler);
      }
    };
  }, [startPos, index2, lazy]);
  const transformStyle = {
    [`--${splitBarPrefixCls}-preview-offset`]: `${constrainedOffset}px`
  };
  const StartIcon = vertical ? RefIcon$m : RefIcon$f;
  const EndIcon = vertical ? RefIcon$d : RefIcon$g;
  return /* @__PURE__ */ React.createElement("div", {
    className: splitBarPrefixCls,
    role: "separator",
    "aria-valuenow": getValidNumber(ariaNow),
    "aria-valuemin": getValidNumber(ariaMin),
    "aria-valuemax": getValidNumber(ariaMax)
  }, lazy && /* @__PURE__ */ React.createElement("div", {
    className: classNames(`${splitBarPrefixCls}-preview`, {
      [`${splitBarPrefixCls}-preview-active`]: !!constrainedOffset
    }),
    style: transformStyle
  }), /* @__PURE__ */ React.createElement("div", {
    className: classNames(`${splitBarPrefixCls}-dragger`, {
      [`${splitBarPrefixCls}-dragger-disabled`]: !resizable,
      [`${splitBarPrefixCls}-dragger-active`]: active
    }),
    onMouseDown,
    onTouchStart
  }), startCollapsible && /* @__PURE__ */ React.createElement("div", {
    className: classNames(`${splitBarPrefixCls}-collapse-bar`, `${splitBarPrefixCls}-collapse-bar-start`, getVisibilityClass(showStartCollapsibleIcon)),
    onClick: () => onCollapse(index2, "start")
  }, /* @__PURE__ */ React.createElement(StartIcon, {
    className: classNames(`${splitBarPrefixCls}-collapse-icon`, `${splitBarPrefixCls}-collapse-start`)
  })), endCollapsible && /* @__PURE__ */ React.createElement("div", {
    className: classNames(`${splitBarPrefixCls}-collapse-bar`, `${splitBarPrefixCls}-collapse-bar-end`, getVisibilityClass(showEndCollapsibleIcon)),
    onClick: () => onCollapse(index2, "end")
  }, /* @__PURE__ */ React.createElement(EndIcon, {
    className: classNames(`${splitBarPrefixCls}-collapse-icon`, `${splitBarPrefixCls}-collapse-end`)
  })));
};
const genRtlStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`&-rtl${componentCls}-horizontal`]: {
      [`> ${componentCls}-bar`]: {
        [`${componentCls}-bar-collapse-previous`]: {
          insetInlineEnd: 0,
          insetInlineStart: "unset"
        },
        [`${componentCls}-bar-collapse-next`]: {
          insetInlineEnd: "unset",
          insetInlineStart: 0
        }
      }
    },
    [`&-rtl${componentCls}-vertical`]: {
      [`> ${componentCls}-bar`]: {
        [`${componentCls}-bar-collapse-previous`]: {
          insetInlineEnd: "50%",
          insetInlineStart: "unset"
        },
        [`${componentCls}-bar-collapse-next`]: {
          insetInlineEnd: "50%",
          insetInlineStart: "unset"
        }
      }
    }
  };
};
const centerStyle = {
  position: "absolute",
  top: "50%",
  left: {
    _skip_check_: true,
    value: "50%"
  },
  transform: "translate(-50%, -50%)"
};
const genSplitterStyle = (token) => {
  const {
    componentCls,
    colorFill,
    splitBarDraggableSize,
    splitBarSize,
    splitTriggerSize,
    controlItemBgHover,
    controlItemBgActive,
    controlItemBgActiveHover,
    prefixCls
  } = token;
  const splitBarCls = `${componentCls}-bar`;
  const splitMaskCls = `${componentCls}-mask`;
  const splitPanelCls = `${componentCls}-panel`;
  const halfTriggerSize = token.calc(splitTriggerSize).div(2).equal();
  const splitterBarPreviewOffsetVar = `${prefixCls}-bar-preview-offset`;
  const splitterBarPreviewStyle = {
    position: "absolute",
    background: token.colorPrimary,
    opacity: 0.2,
    pointerEvents: "none",
    transition: "none",
    zIndex: 1,
    display: "none"
  };
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: "stretch",
      // ======================== SplitBar ========================
      // Use `>` to avoid conflict with mix layout
      [`> ${splitBarCls}`]: {
        flex: "none",
        position: "relative",
        userSelect: "none",
        // ======================= Dragger =======================
        [`${splitBarCls}-dragger`]: Object.assign(Object.assign({}, centerStyle), {
          zIndex: 1,
          // Hover background
          "&::before": Object.assign({
            content: '""',
            background: controlItemBgHover
          }, centerStyle),
          // Spinner
          "&::after": Object.assign({
            content: '""',
            background: colorFill
          }, centerStyle),
          // Hover
          [`&:hover:not(${splitBarCls}-dragger-active)`]: {
            "&::before": {
              background: controlItemBgActive
            }
          },
          // Active
          "&-active": {
            zIndex: 2,
            "&::before": {
              background: controlItemBgActiveHover
            }
          },
          // Disabled, not use `pointer-events: none` since still need trigger collapse
          [`&-disabled${splitBarCls}-dragger`]: {
            zIndex: 0,
            "&, &:hover, &-active": {
              cursor: "default",
              "&::before": {
                background: controlItemBgHover
              }
            },
            "&::after": {
              display: "none"
            }
          }
        }),
        // ======================= Collapse =======================
        [`${splitBarCls}-collapse-bar`]: Object.assign(Object.assign({}, centerStyle), {
          zIndex: token.zIndexPopupBase,
          background: controlItemBgHover,
          fontSize: token.fontSizeSM,
          borderRadius: token.borderRadiusXS,
          color: token.colorText,
          cursor: "pointer",
          opacity: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // Hover
          "&:hover": {
            background: controlItemBgActive
          },
          // Active
          "&:active": {
            background: controlItemBgActiveHover
          }
        }),
        "&:hover, &:active": {
          [`${splitBarCls}-collapse-bar-hover-only`]: {
            opacity: 1
          }
        },
        [`${splitBarCls}-collapse-bar-hover-only`]: {
          "@media(hover:none)": {
            opacity: 1
          }
        },
        [`${splitBarCls}-collapse-bar-always-hidden`]: {
          display: "none"
        },
        [`${splitBarCls}-collapse-bar-always-visible`]: {
          opacity: 1
        }
      },
      // =========================== Mask =========================
      // Util dom for handle cursor
      [splitMaskCls]: {
        position: "fixed",
        zIndex: token.zIndexPopupBase,
        inset: 0,
        "&-horizontal": {
          cursor: "col-resize"
        },
        "&-vertical": {
          cursor: "row-resize"
        }
      },
      // ==========================================================
      // ==                        Layout                        ==
      // ==========================================================
      "&-horizontal": {
        flexDirection: "row",
        [`> ${splitBarCls}`]: {
          width: 0,
          // ======================= Preview =======================
          [`${splitBarCls}-preview`]: Object.assign(Object.assign({
            height: "100%",
            width: splitBarSize
          }, splitterBarPreviewStyle), {
            [`&${splitBarCls}-preview-active`]: {
              display: "block",
              transform: `translateX(var(--${splitterBarPreviewOffsetVar}))`
            }
          }),
          // ======================= Dragger =======================
          [`${splitBarCls}-dragger`]: {
            cursor: "col-resize",
            height: "100%",
            width: splitTriggerSize,
            "&::before": {
              height: "100%",
              width: splitBarSize
            },
            "&::after": {
              height: splitBarDraggableSize,
              width: splitBarSize
            }
          },
          // ======================= Collapse =======================
          [`${splitBarCls}-collapse-bar`]: {
            width: token.fontSizeSM,
            height: token.controlHeightSM,
            "&-start": {
              left: {
                _skip_check_: true,
                value: "auto"
              },
              right: {
                _skip_check_: true,
                value: halfTriggerSize
              },
              transform: "translateY(-50%)"
            },
            "&-end": {
              left: {
                _skip_check_: true,
                value: halfTriggerSize
              },
              right: {
                _skip_check_: true,
                value: "auto"
              },
              transform: "translateY(-50%)"
            }
          }
        }
      },
      "&-vertical": {
        flexDirection: "column",
        [`> ${splitBarCls}`]: {
          height: 0,
          // ======================= Preview =======================
          [`${splitBarCls}-preview`]: Object.assign(Object.assign({
            height: splitBarSize,
            width: "100%"
          }, splitterBarPreviewStyle), {
            [`&${splitBarCls}-preview-active`]: {
              display: "block",
              transform: `translateY(var(--${splitterBarPreviewOffsetVar}))`
            }
          }),
          // ======================= Dragger =======================
          [`${splitBarCls}-dragger`]: {
            cursor: "row-resize",
            width: "100%",
            height: splitTriggerSize,
            "&::before": {
              width: "100%",
              height: splitBarSize
            },
            "&::after": {
              width: splitBarDraggableSize,
              height: splitBarSize
            }
          },
          // ======================= Collapse =======================
          [`${splitBarCls}-collapse-bar`]: {
            height: token.fontSizeSM,
            width: token.controlHeightSM,
            "&-start": {
              top: "auto",
              bottom: halfTriggerSize,
              transform: "translateX(-50%)"
            },
            "&-end": {
              top: halfTriggerSize,
              bottom: "auto",
              transform: "translateX(-50%)"
            }
          }
        }
      },
      // ========================= Panels =========================
      [splitPanelCls]: {
        overflow: "auto",
        padding: "0 1px",
        scrollbarWidth: "thin",
        boxSizing: "border-box",
        "&-hidden": {
          padding: 0,
          overflow: "hidden"
        },
        [`&:has(${componentCls}:only-child)`]: {
          overflow: "hidden"
        }
      }
    }), genRtlStyle(token))
  };
};
const prepareComponentToken$5 = (token) => {
  var _a;
  const splitBarSize = token.splitBarSize || 2;
  const splitTriggerSize = token.splitTriggerSize || 6;
  const resizeSpinnerSize = token.resizeSpinnerSize || 20;
  const splitBarDraggableSize = (_a = token.splitBarDraggableSize) !== null && _a !== void 0 ? _a : resizeSpinnerSize;
  return {
    splitBarSize,
    splitTriggerSize,
    splitBarDraggableSize,
    resizeSpinnerSize
  };
};
const useStyle$5 = genStyleHooks("Splitter", genSplitterStyle, prepareComponentToken$5);
const Splitter$1 = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    layout = "horizontal",
    children,
    rootClassName,
    onResizeStart,
    onResize,
    onResizeEnd,
    lazy
  } = props;
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("splitter");
  const prefixCls = getPrefixCls("splitter", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$5(prefixCls, rootCls);
  const isVertical = layout === "vertical";
  const isRTL = direction === "rtl";
  const reverse = !isVertical && isRTL;
  const items = useItems(children);
  const [containerSize, setContainerSize] = reactExports.useState();
  const onContainerResize = (size) => {
    const {
      offsetWidth,
      offsetHeight
    } = size;
    const containerSize2 = isVertical ? offsetHeight : offsetWidth;
    if (containerSize2 === 0) {
      return;
    }
    setContainerSize(containerSize2);
  };
  const [panelSizes, itemPxSizes, itemPtgSizes, itemPtgMinSizes, itemPtgMaxSizes, updateSizes] = useSizes(items, containerSize);
  const resizableInfos = useResizable(items, itemPxSizes, isRTL);
  const [onOffsetStart, onOffsetUpdate, onOffsetEnd, onCollapse, movingIndex] = useResize(items, resizableInfos, itemPtgSizes, containerSize, updateSizes, isRTL);
  const onInternalResizeStart = useEvent((index2) => {
    onOffsetStart(index2);
    onResizeStart === null || onResizeStart === void 0 ? void 0 : onResizeStart(itemPxSizes);
  });
  const onInternalResizeUpdate = useEvent((index2, offset, lazyEnd) => {
    const nextSizes = onOffsetUpdate(index2, offset);
    if (lazyEnd) {
      onResizeEnd === null || onResizeEnd === void 0 ? void 0 : onResizeEnd(nextSizes);
    } else {
      onResize === null || onResize === void 0 ? void 0 : onResize(nextSizes);
    }
  });
  const onInternalResizeEnd = useEvent((lazyEnd) => {
    onOffsetEnd();
    if (!lazyEnd) {
      onResizeEnd === null || onResizeEnd === void 0 ? void 0 : onResizeEnd(itemPxSizes);
    }
  });
  const onInternalCollapse = useEvent((index2, type) => {
    var _a;
    const nextSizes = onCollapse(index2, type);
    onResize === null || onResize === void 0 ? void 0 : onResize(nextSizes);
    onResizeEnd === null || onResizeEnd === void 0 ? void 0 : onResizeEnd(nextSizes);
    const collapsed = nextSizes.map((size) => Math.abs(size) < Number.EPSILON);
    (_a = props.onCollapse) === null || _a === void 0 ? void 0 : _a.call(props, collapsed, nextSizes);
  });
  const containerClassName = classNames(prefixCls, className, `${prefixCls}-${layout}`, {
    [`${prefixCls}-rtl`]: isRTL
  }, rootClassName, contextClassName, cssVarCls, rootCls, hashId);
  const maskCls = `${prefixCls}-mask`;
  const stackSizes = React.useMemo(() => {
    const mergedSizes = [];
    let stack = 0;
    const len = items.length;
    for (let i = 0; i < len; i += 1) {
      stack += itemPtgSizes[i];
      mergedSizes.push(stack);
    }
    return mergedSizes;
  }, [itemPtgSizes, items.length]);
  const mergedStyle = Object.assign(Object.assign({}, contextStyle), style);
  return wrapCSSVar(/* @__PURE__ */ React.createElement(RefResizeObserver, {
    onResize: onContainerResize
  }, /* @__PURE__ */ React.createElement("div", {
    style: mergedStyle,
    className: containerClassName
  }, items.map((item, idx) => {
    const panel = /* @__PURE__ */ React.createElement(InternalPanel, Object.assign({}, item, {
      prefixCls,
      size: panelSizes[idx]
    }));
    let splitBar = null;
    const resizableInfo = resizableInfos[idx];
    if (resizableInfo) {
      const ariaMinStart = (stackSizes[idx - 1] || 0) + itemPtgMinSizes[idx];
      const ariaMinEnd = (stackSizes[idx + 1] || 100) - itemPtgMaxSizes[idx + 1];
      const ariaMaxStart = (stackSizes[idx - 1] || 0) + itemPtgMaxSizes[idx];
      const ariaMaxEnd = (stackSizes[idx + 1] || 100) - itemPtgMinSizes[idx + 1];
      splitBar = /* @__PURE__ */ React.createElement(SplitBar, {
        lazy,
        index: idx,
        active: movingIndex === idx,
        prefixCls,
        vertical: isVertical,
        resizable: resizableInfo.resizable,
        ariaNow: stackSizes[idx] * 100,
        ariaMin: Math.max(ariaMinStart, ariaMinEnd) * 100,
        ariaMax: Math.min(ariaMaxStart, ariaMaxEnd) * 100,
        startCollapsible: resizableInfo.startCollapsible,
        endCollapsible: resizableInfo.endCollapsible,
        showStartCollapsibleIcon: resizableInfo.showStartCollapsibleIcon,
        showEndCollapsibleIcon: resizableInfo.showEndCollapsibleIcon,
        onOffsetStart: onInternalResizeStart,
        onOffsetUpdate: (index2, offsetX, offsetY, lazyEnd) => {
          let offset = isVertical ? offsetY : offsetX;
          if (reverse) {
            offset = -offset;
          }
          onInternalResizeUpdate(index2, offset, lazyEnd);
        },
        onOffsetEnd: onInternalResizeEnd,
        onCollapse: onInternalCollapse,
        containerSize: containerSize || 0
      });
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, {
      key: `split-panel-${idx}`
    }, panel, splitBar);
  }), typeof movingIndex === "number" && /* @__PURE__ */ React.createElement("div", {
    "aria-hidden": true,
    className: classNames(maskCls, `${maskCls}-${layout}`)
  }))));
};
const Splitter = Splitter$1;
Splitter.Panel = Panel;
const StatisticNumber = (props) => {
  const {
    value,
    formatter,
    precision,
    decimalSeparator,
    groupSeparator = "",
    prefixCls
  } = props;
  let valueNode;
  if (typeof formatter === "function") {
    valueNode = formatter(value);
  } else {
    const val = String(value);
    const cells = val.match(/^(-?)(\d*)(\.(\d+))?$/);
    if (!cells || val === "-") {
      valueNode = val;
    } else {
      const negative = cells[1];
      let int = cells[2] || "0";
      let decimal = cells[4] || "";
      int = int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
      if (typeof precision === "number") {
        decimal = decimal.padEnd(precision, "0").slice(0, precision > 0 ? precision : 0);
      }
      if (decimal) {
        decimal = `${decimalSeparator}${decimal}`;
      }
      valueNode = [/* @__PURE__ */ reactExports.createElement("span", {
        key: "int",
        className: `${prefixCls}-content-value-int`
      }, negative, int), decimal && /* @__PURE__ */ reactExports.createElement("span", {
        key: "decimal",
        className: `${prefixCls}-content-value-decimal`
      }, decimal)];
    }
  }
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-content-value`
  }, valueNode);
};
const genStatisticStyle = (token) => {
  const {
    componentCls,
    marginXXS,
    padding,
    colorTextDescription,
    titleFontSize,
    colorTextHeading,
    contentFontSize,
    fontFamily
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      [`${componentCls}-title`]: {
        marginBottom: marginXXS,
        color: colorTextDescription,
        fontSize: titleFontSize
      },
      [`${componentCls}-skeleton`]: {
        paddingTop: padding
      },
      [`${componentCls}-content`]: {
        color: colorTextHeading,
        fontSize: contentFontSize,
        fontFamily,
        [`${componentCls}-content-value`]: {
          display: "inline-block",
          direction: "ltr"
        },
        [`${componentCls}-content-prefix, ${componentCls}-content-suffix`]: {
          display: "inline-block"
        },
        [`${componentCls}-content-prefix`]: {
          marginInlineEnd: marginXXS
        },
        [`${componentCls}-content-suffix`]: {
          marginInlineStart: marginXXS
        }
      }
    })
  };
};
const prepareComponentToken$4 = (token) => {
  const {
    fontSizeHeading3,
    fontSize
  } = token;
  return {
    titleFontSize: fontSize,
    contentFontSize: fontSizeHeading3
  };
};
const useStyle$4 = genStyleHooks("Statistic", (token) => {
  const statisticToken = merge(token, {});
  return genStatisticStyle(statisticToken);
}, prepareComponentToken$4);
var __rest$c = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Statistic = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    valueStyle,
    value = 0,
    title,
    valueRender,
    prefix,
    suffix,
    loading = false,
    /* --- FormatConfig starts --- */
    formatter,
    precision,
    decimalSeparator = ".",
    groupSeparator = ",",
    /* --- FormatConfig starts --- */
    onMouseEnter,
    onMouseLeave
  } = props, rest = __rest$c(props, ["prefixCls", "className", "rootClassName", "style", "valueStyle", "value", "title", "valueRender", "prefix", "suffix", "loading", "formatter", "precision", "decimalSeparator", "groupSeparator", "onMouseEnter", "onMouseLeave"]);
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("statistic");
  const prefixCls = getPrefixCls("statistic", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$4(prefixCls);
  const valueNode = /* @__PURE__ */ reactExports.createElement(StatisticNumber, {
    decimalSeparator,
    groupSeparator,
    prefixCls,
    formatter,
    precision,
    value
  });
  const cls = classNames(prefixCls, {
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, contextClassName, className, rootClassName, hashId, cssVarCls);
  const internalRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => ({
    nativeElement: internalRef.current
  }));
  const restProps = pickAttrs(rest, {
    aria: true,
    data: true
  });
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", Object.assign({}, restProps, {
    ref: internalRef,
    className: cls,
    style: Object.assign(Object.assign({}, contextStyle), style),
    onMouseEnter,
    onMouseLeave
  }), title && /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-title`
  }, title), /* @__PURE__ */ reactExports.createElement(Skeleton, {
    paragraph: false,
    loading,
    className: `${prefixCls}-skeleton`,
    active: true
  }, /* @__PURE__ */ reactExports.createElement("div", {
    style: valueStyle,
    className: `${prefixCls}-content`
  }, prefix && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-content-prefix`
  }, prefix), valueRender ? valueRender(valueNode) : valueNode, suffix && /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-content-suffix`
  }, suffix)))));
});
const timeUnits = [
  ["Y", 1e3 * 60 * 60 * 24 * 365],
  // years
  ["M", 1e3 * 60 * 60 * 24 * 30],
  // months
  ["D", 1e3 * 60 * 60 * 24],
  // days
  ["H", 1e3 * 60 * 60],
  // hours
  ["m", 1e3 * 60],
  // minutes
  ["s", 1e3],
  // seconds
  ["S", 1]
  // million seconds
];
function formatTimeStr(duration, format2) {
  let leftDuration = duration;
  const escapeRegex = /\[[^\]]*]/g;
  const keepList = (format2.match(escapeRegex) || []).map((str) => str.slice(1, -1));
  const templateText = format2.replace(escapeRegex, "[]");
  const replacedText = timeUnits.reduce((current, [name, unit2]) => {
    if (current.includes(name)) {
      const value = Math.floor(leftDuration / unit2);
      leftDuration -= value * unit2;
      return current.replace(new RegExp(`${name}+`, "g"), (match) => {
        const len = match.length;
        return value.toString().padStart(len, "0");
      });
    }
    return current;
  }, templateText);
  let index2 = 0;
  return replacedText.replace(escapeRegex, () => {
    const match = keepList[index2];
    index2 += 1;
    return match;
  });
}
function formatCounter(value, config, down) {
  const {
    format: format2 = ""
  } = config;
  const target = new Date(value).getTime();
  const current = Date.now();
  const diff = down ? Math.max(target - current, 0) : Math.max(current - target, 0);
  return formatTimeStr(diff, format2);
}
var __rest$b = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function getTime(value) {
  return new Date(value).getTime();
}
const StatisticTimer = (props) => {
  const {
    value,
    format: format2 = "HH:mm:ss",
    onChange,
    onFinish,
    type
  } = props, rest = __rest$b(props, ["value", "format", "onChange", "onFinish", "type"]);
  const down = type === "countdown";
  const [showTime, setShowTime] = reactExports.useState(null);
  const update = useEvent(() => {
    const now = Date.now();
    const timestamp = getTime(value);
    setShowTime({});
    const timeDiff = !down ? now - timestamp : timestamp - now;
    onChange === null || onChange === void 0 ? void 0 : onChange(timeDiff);
    if (down && timestamp < now) {
      onFinish === null || onFinish === void 0 ? void 0 : onFinish();
      return false;
    }
    return true;
  });
  reactExports.useEffect(() => {
    let rafId;
    const clear = () => wrapperRaf.cancel(rafId);
    const rafUpdate = () => {
      rafId = wrapperRaf(() => {
        if (update()) {
          rafUpdate();
        }
      });
    };
    rafUpdate();
    return clear;
  }, [value, down]);
  reactExports.useEffect(() => {
    setShowTime({});
  }, []);
  const formatter = (formatValue, config) => showTime ? formatCounter(formatValue, Object.assign(Object.assign({}, config), {
    format: format2
  }), down) : "-";
  const valueRender = (node) => cloneElement(node, {
    title: void 0
  });
  return /* @__PURE__ */ reactExports.createElement(Statistic, Object.assign({}, rest, {
    value,
    valueRender,
    formatter
  }));
};
const Countdown = (props) => {
  return /* @__PURE__ */ reactExports.createElement(StatisticTimer, Object.assign({}, props, {
    type: "countdown"
  }));
};
const Countdown$1 = /* @__PURE__ */ reactExports.memo(Countdown);
Statistic.Timer = StatisticTimer;
Statistic.Countdown = Countdown$1;
var _excluded$4 = ["className", "prefixCls", "style", "active", "status", "iconPrefix", "icon", "wrapperStyle", "stepNumber", "disabled", "description", "title", "subTitle", "progressDot", "stepIcon", "tailContent", "icons", "stepIndex", "onStepClick", "onClick", "render"];
function isString(str) {
  return typeof str === "string";
}
function Step(props) {
  var _classNames2;
  var className = props.className, prefixCls = props.prefixCls, style = props.style, active = props.active, status = props.status, iconPrefix = props.iconPrefix, icon = props.icon;
  props.wrapperStyle;
  var stepNumber = props.stepNumber, disabled = props.disabled, description = props.description, title = props.title, subTitle = props.subTitle, progressDot = props.progressDot, stepIcon = props.stepIcon, tailContent = props.tailContent, icons2 = props.icons, stepIndex = props.stepIndex, onStepClick = props.onStepClick, onClick = props.onClick, render = props.render, restProps = _objectWithoutProperties(props, _excluded$4);
  var clickable = !!onStepClick && !disabled;
  var accessibilityProps = {};
  if (clickable) {
    accessibilityProps.role = "button";
    accessibilityProps.tabIndex = 0;
    accessibilityProps.onClick = function(e2) {
      onClick === null || onClick === void 0 ? void 0 : onClick(e2);
      onStepClick(stepIndex);
    };
    accessibilityProps.onKeyDown = function(e2) {
      var which = e2.which;
      if (which === KeyCode.ENTER || which === KeyCode.SPACE) {
        onStepClick(stepIndex);
      }
    };
  }
  var renderIconNode = function renderIconNode2() {
    var _classNames;
    var iconNode;
    var iconClassName = classNames("".concat(prefixCls, "-icon"), "".concat(iconPrefix, "icon"), (_classNames = {}, _defineProperty(_classNames, "".concat(iconPrefix, "icon-").concat(icon), icon && isString(icon)), _defineProperty(_classNames, "".concat(iconPrefix, "icon-check"), !icon && status === "finish" && (icons2 && !icons2.finish || !icons2)), _defineProperty(_classNames, "".concat(iconPrefix, "icon-cross"), !icon && status === "error" && (icons2 && !icons2.error || !icons2)), _classNames));
    var iconDot = /* @__PURE__ */ reactExports.createElement("span", {
      className: "".concat(prefixCls, "-icon-dot")
    });
    if (progressDot) {
      if (typeof progressDot === "function") {
        iconNode = /* @__PURE__ */ reactExports.createElement("span", {
          className: "".concat(prefixCls, "-icon")
        }, progressDot(iconDot, {
          index: stepNumber - 1,
          status,
          title,
          description
        }));
      } else {
        iconNode = /* @__PURE__ */ reactExports.createElement("span", {
          className: "".concat(prefixCls, "-icon")
        }, iconDot);
      }
    } else if (icon && !isString(icon)) {
      iconNode = /* @__PURE__ */ reactExports.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }, icon);
    } else if (icons2 && icons2.finish && status === "finish") {
      iconNode = /* @__PURE__ */ reactExports.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }, icons2.finish);
    } else if (icons2 && icons2.error && status === "error") {
      iconNode = /* @__PURE__ */ reactExports.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }, icons2.error);
    } else if (icon || status === "finish" || status === "error") {
      iconNode = /* @__PURE__ */ reactExports.createElement("span", {
        className: iconClassName
      });
    } else {
      iconNode = /* @__PURE__ */ reactExports.createElement("span", {
        className: "".concat(prefixCls, "-icon")
      }, stepNumber);
    }
    if (stepIcon) {
      iconNode = stepIcon({
        index: stepNumber - 1,
        status,
        title,
        description,
        node: iconNode
      });
    }
    return iconNode;
  };
  var mergedStatus = status || "wait";
  var classString = classNames("".concat(prefixCls, "-item"), "".concat(prefixCls, "-item-").concat(mergedStatus), className, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-item-custom"), icon), _defineProperty(_classNames2, "".concat(prefixCls, "-item-active"), active), _defineProperty(_classNames2, "".concat(prefixCls, "-item-disabled"), disabled === true), _classNames2));
  var stepItemStyle = _objectSpread2({}, style);
  var stepNode = /* @__PURE__ */ reactExports.createElement("div", _extends({}, restProps, {
    className: classString,
    style: stepItemStyle
  }), /* @__PURE__ */ reactExports.createElement("div", _extends({
    onClick
  }, accessibilityProps, {
    className: "".concat(prefixCls, "-item-container")
  }), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-item-tail")
  }, tailContent), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-item-icon")
  }, renderIconNode()), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-item-content")
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-item-title")
  }, title, subTitle && /* @__PURE__ */ reactExports.createElement("div", {
    title: typeof subTitle === "string" ? subTitle : void 0,
    className: "".concat(prefixCls, "-item-subtitle")
  }, subTitle)), description && /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-item-description")
  }, description))));
  if (render) {
    stepNode = render(stepNode) || null;
  }
  return stepNode;
}
var _excluded$3 = ["prefixCls", "style", "className", "children", "direction", "type", "labelPlacement", "iconPrefix", "status", "size", "current", "progressDot", "stepIcon", "initial", "icons", "onChange", "itemRender", "items"];
function Steps$1(props) {
  var _classNames;
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-steps" : _props$prefixCls, _props$style = props.style, style = _props$style === void 0 ? {} : _props$style, className = props.className;
  props.children;
  var _props$direction = props.direction, direction = _props$direction === void 0 ? "horizontal" : _props$direction, _props$type = props.type, type = _props$type === void 0 ? "default" : _props$type, _props$labelPlacement = props.labelPlacement, labelPlacement = _props$labelPlacement === void 0 ? "horizontal" : _props$labelPlacement, _props$iconPrefix = props.iconPrefix, iconPrefix = _props$iconPrefix === void 0 ? "rc" : _props$iconPrefix, _props$status = props.status, status = _props$status === void 0 ? "process" : _props$status, size = props.size, _props$current = props.current, current = _props$current === void 0 ? 0 : _props$current, _props$progressDot = props.progressDot, progressDot = _props$progressDot === void 0 ? false : _props$progressDot, stepIcon = props.stepIcon, _props$initial = props.initial, initial = _props$initial === void 0 ? 0 : _props$initial, icons2 = props.icons, onChange = props.onChange, itemRender = props.itemRender, _props$items = props.items, items = _props$items === void 0 ? [] : _props$items, restProps = _objectWithoutProperties(props, _excluded$3);
  var isNav = type === "navigation";
  var isInline = type === "inline";
  var mergedProgressDot = isInline || progressDot;
  var mergedDirection = isInline ? "horizontal" : direction;
  var mergedSize = isInline ? void 0 : size;
  var adjustedLabelPlacement = mergedProgressDot ? "vertical" : labelPlacement;
  var classString = classNames(prefixCls, "".concat(prefixCls, "-").concat(mergedDirection), className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(mergedSize), mergedSize), _defineProperty(_classNames, "".concat(prefixCls, "-label-").concat(adjustedLabelPlacement), mergedDirection === "horizontal"), _defineProperty(_classNames, "".concat(prefixCls, "-dot"), !!mergedProgressDot), _defineProperty(_classNames, "".concat(prefixCls, "-navigation"), isNav), _defineProperty(_classNames, "".concat(prefixCls, "-inline"), isInline), _classNames));
  var onStepClick = function onStepClick2(next) {
    if (onChange && current !== next) {
      onChange(next);
    }
  };
  var renderStep = function renderStep2(item, index2) {
    var mergedItem = _objectSpread2({}, item);
    var stepNumber = initial + index2;
    if (status === "error" && index2 === current - 1) {
      mergedItem.className = "".concat(prefixCls, "-next-error");
    }
    if (!mergedItem.status) {
      if (stepNumber === current) {
        mergedItem.status = status;
      } else if (stepNumber < current) {
        mergedItem.status = "finish";
      } else {
        mergedItem.status = "wait";
      }
    }
    if (isInline) {
      mergedItem.icon = void 0;
      mergedItem.subTitle = void 0;
    }
    if (!mergedItem.render && itemRender) {
      mergedItem.render = function(stepItem) {
        return itemRender(mergedItem, stepItem);
      };
    }
    return /* @__PURE__ */ React.createElement(Step, _extends({}, mergedItem, {
      active: stepNumber === current,
      stepNumber: stepNumber + 1,
      stepIndex: stepNumber,
      key: stepNumber,
      prefixCls,
      iconPrefix,
      wrapperStyle: style,
      progressDot: mergedProgressDot,
      stepIcon,
      icons: icons2,
      onStepClick: onChange && onStepClick
    }));
  };
  return /* @__PURE__ */ React.createElement("div", _extends({
    className: classString,
    style
  }, restProps), items.filter(function(item) {
    return item;
  }).map(renderStep));
}
Steps$1.Step = Step;
const genStepsCustomIconStyle = (token) => {
  const {
    componentCls,
    customIconTop,
    customIconSize,
    customIconFontSize
  } = token;
  return {
    [`${componentCls}-item-custom`]: {
      [`> ${componentCls}-item-container > ${componentCls}-item-icon`]: {
        height: "auto",
        background: "none",
        border: 0,
        [`> ${componentCls}-icon`]: {
          top: customIconTop,
          width: customIconSize,
          height: customIconSize,
          fontSize: customIconFontSize,
          lineHeight: unit(customIconSize)
        }
      }
    },
    // Only adjust horizontal customize icon width
    [`&:not(${componentCls}-vertical)`]: {
      [`${componentCls}-item-custom`]: {
        [`${componentCls}-item-icon`]: {
          width: "auto",
          background: "none"
        }
      }
    }
  };
};
const genHorizontalStyle = (token) => {
  const {
    componentCls
  } = token;
  const stepsItemCls = `${componentCls}-item`;
  return {
    [`${componentCls}-horizontal`]: {
      [`${stepsItemCls}-tail`]: {
        transform: "translateY(-50%)"
      }
    }
  };
};
const genStepsInlineStyle = (token) => {
  const {
    componentCls,
    inlineDotSize,
    inlineTitleColor,
    inlineTailColor
  } = token;
  const containerPaddingTop = token.calc(token.paddingXS).add(token.lineWidth).equal();
  const titleStyle = {
    [`${componentCls}-item-container ${componentCls}-item-content ${componentCls}-item-title`]: {
      color: inlineTitleColor
    }
  };
  return {
    [`&${componentCls}-inline`]: {
      width: "auto",
      display: "inline-flex",
      [`${componentCls}-item`]: {
        flex: "none",
        "&-container": {
          padding: `${unit(containerPaddingTop)} ${unit(token.paddingXXS)} 0`,
          margin: `0 ${unit(token.calc(token.marginXXS).div(2).equal())}`,
          borderRadius: token.borderRadiusSM,
          cursor: "pointer",
          transition: `background-color ${token.motionDurationMid}`,
          "&:hover": {
            background: token.controlItemBgHover
          },
          "&[role='button']:hover": {
            opacity: 1
          }
        },
        "&-icon": {
          width: inlineDotSize,
          height: inlineDotSize,
          marginInlineStart: `calc(50% - ${unit(token.calc(inlineDotSize).div(2).equal())})`,
          [`> ${componentCls}-icon`]: {
            top: 0
          },
          [`${componentCls}-icon-dot`]: {
            borderRadius: token.calc(token.fontSizeSM).div(4).equal(),
            "&::after": {
              display: "none"
            }
          }
        },
        "&-content": {
          width: "auto",
          marginTop: token.calc(token.marginXS).sub(token.lineWidth).equal()
        },
        "&-title": {
          color: inlineTitleColor,
          fontSize: token.fontSizeSM,
          lineHeight: token.lineHeightSM,
          fontWeight: "normal",
          marginBottom: token.calc(token.marginXXS).div(2).equal()
        },
        "&-description": {
          display: "none"
        },
        "&-tail": {
          marginInlineStart: 0,
          top: token.calc(inlineDotSize).div(2).add(containerPaddingTop).equal(),
          transform: `translateY(-50%)`,
          "&:after": {
            width: "100%",
            height: token.lineWidth,
            borderRadius: 0,
            marginInlineStart: 0,
            background: inlineTailColor
          }
        },
        [`&:first-child ${componentCls}-item-tail`]: {
          width: "50%",
          marginInlineStart: "50%"
        },
        [`&:last-child ${componentCls}-item-tail`]: {
          display: "block",
          width: "50%"
        },
        "&-wait": Object.assign({
          [`${componentCls}-item-icon ${componentCls}-icon ${componentCls}-icon-dot`]: {
            backgroundColor: token.colorBorderBg,
            border: `${unit(token.lineWidth)} ${token.lineType} ${inlineTailColor}`
          }
        }, titleStyle),
        "&-finish": Object.assign({
          [`${componentCls}-item-tail::after`]: {
            backgroundColor: inlineTailColor
          },
          [`${componentCls}-item-icon ${componentCls}-icon ${componentCls}-icon-dot`]: {
            backgroundColor: inlineTailColor,
            border: `${unit(token.lineWidth)} ${token.lineType} ${inlineTailColor}`
          }
        }, titleStyle),
        "&-error": titleStyle,
        "&-active, &-process": Object.assign({
          [`${componentCls}-item-icon`]: {
            width: inlineDotSize,
            height: inlineDotSize,
            marginInlineStart: `calc(50% - ${unit(token.calc(inlineDotSize).div(2).equal())})`,
            top: 0
          }
        }, titleStyle),
        [`&:not(${componentCls}-item-active) > ${componentCls}-item-container[role='button']:hover`]: {
          [`${componentCls}-item-title`]: {
            color: inlineTitleColor
          }
        }
      }
    }
  };
};
const genStepsLabelPlacementStyle = (token) => {
  const {
    componentCls,
    iconSize,
    lineHeight,
    iconSizeSM
  } = token;
  return {
    [`&${componentCls}-label-vertical`]: {
      [`${componentCls}-item`]: {
        overflow: "visible",
        "&-tail": {
          marginInlineStart: token.calc(iconSize).div(2).add(token.controlHeightLG).equal(),
          padding: `0 ${unit(token.paddingLG)}`
        },
        "&-content": {
          display: "block",
          width: token.calc(iconSize).div(2).add(token.controlHeightLG).mul(2).equal(),
          marginTop: token.marginSM,
          textAlign: "center"
        },
        "&-icon": {
          display: "inline-block",
          marginInlineStart: token.controlHeightLG
        },
        "&-title": {
          paddingInlineEnd: 0,
          paddingInlineStart: 0,
          "&::after": {
            display: "none"
          }
        },
        "&-subtitle": {
          display: "block",
          marginBottom: token.marginXXS,
          marginInlineStart: 0,
          lineHeight
        }
      },
      [`&${componentCls}-small:not(${componentCls}-dot)`]: {
        [`${componentCls}-item`]: {
          "&-icon": {
            marginInlineStart: token.calc(iconSize).sub(iconSizeSM).div(2).add(token.controlHeightLG).equal()
          }
        }
      }
    }
  };
};
const genStepsNavStyle = (token) => {
  const {
    componentCls,
    navContentMaxWidth,
    navArrowColor,
    stepsNavActiveColor,
    motionDurationSlow
  } = token;
  return {
    [`&${componentCls}-navigation`]: {
      paddingTop: token.paddingSM,
      [`&${componentCls}-small`]: {
        [`${componentCls}-item`]: {
          "&-container": {
            marginInlineStart: token.calc(token.marginSM).mul(-1).equal()
          }
        }
      },
      [`${componentCls}-item`]: {
        overflow: "visible",
        textAlign: "center",
        "&-container": {
          display: "inline-block",
          height: "100%",
          marginInlineStart: token.calc(token.margin).mul(-1).equal(),
          paddingBottom: token.paddingSM,
          textAlign: "start",
          transition: `opacity ${motionDurationSlow}`,
          [`${componentCls}-item-content`]: {
            maxWidth: navContentMaxWidth
          },
          [`${componentCls}-item-title`]: Object.assign(Object.assign({
            maxWidth: "100%",
            paddingInlineEnd: 0
          }, textEllipsis), {
            "&::after": {
              display: "none"
            }
          })
        },
        [`&:not(${componentCls}-item-active)`]: {
          [`${componentCls}-item-container[role='button']`]: {
            cursor: "pointer",
            "&:hover": {
              opacity: 0.85
            }
          }
        },
        "&:last-child": {
          flex: 1,
          "&::after": {
            display: "none"
          }
        },
        "&::after": {
          position: "absolute",
          top: `calc(50% - ${unit(token.calc(token.paddingSM).div(2).equal())})`,
          insetInlineStart: "100%",
          display: "inline-block",
          width: token.fontSizeIcon,
          height: token.fontSizeIcon,
          borderTop: `${unit(token.lineWidth)} ${token.lineType} ${navArrowColor}`,
          borderBottom: "none",
          borderInlineStart: "none",
          borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${navArrowColor}`,
          transform: "translateY(-50%) translateX(-50%) rotate(45deg)",
          content: '""'
        },
        "&::before": {
          position: "absolute",
          bottom: 0,
          insetInlineStart: "50%",
          display: "inline-block",
          width: 0,
          height: token.lineWidthBold,
          backgroundColor: stepsNavActiveColor,
          transition: `width ${motionDurationSlow}, inset-inline-start ${motionDurationSlow}`,
          transitionTimingFunction: "ease-out",
          content: '""'
        }
      },
      [`${componentCls}-item${componentCls}-item-active::before`]: {
        insetInlineStart: 0,
        width: "100%"
      }
    },
    [`&${componentCls}-navigation${componentCls}-vertical`]: {
      [`> ${componentCls}-item`]: {
        marginInlineEnd: 0,
        "&::before": {
          display: "none"
        },
        [`&${componentCls}-item-active::before`]: {
          top: 0,
          insetInlineEnd: 0,
          insetInlineStart: "unset",
          display: "block",
          width: token.calc(token.lineWidth).mul(3).equal(),
          height: `calc(100% - ${unit(token.marginLG)})`
        },
        "&::after": {
          position: "relative",
          insetInlineStart: "50%",
          display: "block",
          width: token.calc(token.controlHeight).mul(0.25).equal(),
          height: token.calc(token.controlHeight).mul(0.25).equal(),
          marginBottom: token.marginXS,
          textAlign: "center",
          transform: "translateY(-50%) translateX(-50%) rotate(135deg)"
        },
        "&:last-child": {
          "&::after": {
            display: "none"
          }
        },
        [`> ${componentCls}-item-container > ${componentCls}-item-tail`]: {
          visibility: "hidden"
        }
      }
    },
    [`&${componentCls}-navigation${componentCls}-horizontal`]: {
      [`> ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        visibility: "hidden"
      }
    }
  };
};
const genStepsProgressStyle = (token) => {
  const {
    antCls,
    componentCls,
    iconSize,
    iconSizeSM,
    processIconColor,
    marginXXS,
    lineWidthBold,
    lineWidth,
    paddingXXS
  } = token;
  const progressSize = token.calc(iconSize).add(token.calc(lineWidthBold).mul(4).equal()).equal();
  const progressSizeSM = token.calc(iconSizeSM).add(token.calc(token.lineWidth).mul(4).equal()).equal();
  return {
    [`&${componentCls}-with-progress`]: {
      [`${componentCls}-item`]: {
        paddingTop: paddingXXS,
        [`&-process ${componentCls}-item-container ${componentCls}-item-icon ${componentCls}-icon`]: {
          color: processIconColor
        }
      },
      [`&${componentCls}-vertical > ${componentCls}-item `]: {
        paddingInlineStart: paddingXXS,
        [`> ${componentCls}-item-container > ${componentCls}-item-tail`]: {
          top: marginXXS,
          insetInlineStart: token.calc(iconSize).div(2).sub(lineWidth).add(paddingXXS).equal()
        }
      },
      [`&, &${componentCls}-small`]: {
        [`&${componentCls}-horizontal ${componentCls}-item:first-child`]: {
          paddingBottom: paddingXXS,
          paddingInlineStart: paddingXXS
        }
      },
      [`&${componentCls}-small${componentCls}-vertical > ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        insetInlineStart: token.calc(iconSizeSM).div(2).sub(lineWidth).add(paddingXXS).equal()
      },
      [`&${componentCls}-label-vertical ${componentCls}-item ${componentCls}-item-tail`]: {
        top: token.calc(iconSize).div(2).add(paddingXXS).equal()
      },
      [`${componentCls}-item-icon`]: {
        position: "relative",
        [`${antCls}-progress`]: {
          position: "absolute",
          insetInlineStart: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          "&-inner": {
            width: `${unit(progressSize)} !important`,
            height: `${unit(progressSize)} !important`
          }
        }
      },
      // ============================== Small size ==============================
      [`&${componentCls}-small`]: {
        [`&${componentCls}-label-vertical ${componentCls}-item ${componentCls}-item-tail`]: {
          top: token.calc(iconSizeSM).div(2).add(paddingXXS).equal()
        },
        [`${componentCls}-item-icon ${antCls}-progress-inner`]: {
          width: `${unit(progressSizeSM)} !important`,
          height: `${unit(progressSizeSM)} !important`
        }
      }
    }
  };
};
const genStepsProgressDotStyle = (token) => {
  const {
    componentCls,
    descriptionMaxWidth,
    lineHeight,
    dotCurrentSize,
    dotSize,
    motionDurationSlow
  } = token;
  return {
    [`&${componentCls}-dot, &${componentCls}-dot${componentCls}-small`]: {
      [`${componentCls}-item`]: {
        "&-title": {
          lineHeight
        },
        "&-tail": {
          // Math.floor((token.size - token.lineWidth * 3) / 2)
          top: token.calc(token.dotSize).sub(token.calc(token.lineWidth).mul(3).equal()).div(2).equal(),
          width: "100%",
          marginTop: 0,
          marginBottom: 0,
          marginInline: `${unit(token.calc(descriptionMaxWidth).div(2).equal())} 0`,
          padding: 0,
          "&::after": {
            width: `calc(100% - ${unit(token.calc(token.marginSM).mul(2).equal())})`,
            height: token.calc(token.lineWidth).mul(3).equal(),
            marginInlineStart: token.marginSM
          }
        },
        "&-icon": {
          width: dotSize,
          height: dotSize,
          marginInlineStart: token.calc(token.descriptionMaxWidth).sub(dotSize).div(2).equal(),
          paddingInlineEnd: 0,
          lineHeight: unit(dotSize),
          background: "transparent",
          border: 0,
          [`${componentCls}-icon-dot`]: {
            position: "relative",
            float: "left",
            width: "100%",
            height: "100%",
            borderRadius: 100,
            // very large number
            transition: `all ${motionDurationSlow}`,
            /* expand hover area */
            "&::after": {
              position: "absolute",
              top: token.calc(token.marginSM).mul(-1).equal(),
              insetInlineStart: token.calc(dotSize).sub(token.calc(token.controlHeightLG).mul(1.5).equal()).div(2).equal(),
              width: token.calc(token.controlHeightLG).mul(1.5).equal(),
              height: token.controlHeight,
              background: "transparent",
              content: '""'
            }
          }
        },
        "&-content": {
          width: descriptionMaxWidth
        },
        [`&-process ${componentCls}-item-icon`]: {
          position: "relative",
          top: token.calc(dotSize).sub(dotCurrentSize).div(2).equal(),
          width: dotCurrentSize,
          height: dotCurrentSize,
          lineHeight: unit(dotCurrentSize),
          background: "none",
          marginInlineStart: token.calc(token.descriptionMaxWidth).sub(dotCurrentSize).div(2).equal()
        },
        [`&-process ${componentCls}-icon`]: {
          [`&:first-child ${componentCls}-icon-dot`]: {
            insetInlineStart: 0
          }
        }
      }
    },
    [`&${componentCls}-vertical${componentCls}-dot`]: {
      [`${componentCls}-item-icon`]: {
        marginTop: token.calc(token.controlHeight).sub(dotSize).div(2).equal(),
        marginInlineStart: 0,
        background: "none"
      },
      [`${componentCls}-item-process ${componentCls}-item-icon`]: {
        marginTop: token.calc(token.controlHeight).sub(dotCurrentSize).div(2).equal(),
        top: 0,
        insetInlineStart: token.calc(dotSize).sub(dotCurrentSize).div(2).equal(),
        marginInlineStart: 0
      },
      // https://github.com/ant-design/ant-design/issues/18354
      [`${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        top: token.calc(token.controlHeight).sub(dotSize).div(2).equal(),
        insetInlineStart: 0,
        margin: 0,
        padding: `${unit(token.calc(dotSize).add(token.paddingXS).equal())} 0 ${unit(token.paddingXS)}`,
        "&::after": {
          marginInlineStart: token.calc(dotSize).sub(token.lineWidth).div(2).equal()
        }
      },
      [`&${componentCls}-small`]: {
        [`${componentCls}-item-icon`]: {
          marginTop: token.calc(token.controlHeightSM).sub(dotSize).div(2).equal()
        },
        [`${componentCls}-item-process ${componentCls}-item-icon`]: {
          marginTop: token.calc(token.controlHeightSM).sub(dotCurrentSize).div(2).equal()
        },
        [`${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
          top: token.calc(token.controlHeightSM).sub(dotSize).div(2).equal()
        }
      },
      [`${componentCls}-item:first-child ${componentCls}-icon-dot`]: {
        insetInlineStart: 0
      },
      [`${componentCls}-item-content`]: {
        width: "inherit"
      }
    }
  };
};
const genStepsRTLStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`&${componentCls}-rtl`]: {
      direction: "rtl",
      [`${componentCls}-item`]: {
        "&-subtitle": {
          float: "left"
        }
      },
      // nav
      [`&${componentCls}-navigation`]: {
        [`${componentCls}-item::after`]: {
          transform: "rotate(-45deg)"
        }
      },
      // vertical
      [`&${componentCls}-vertical`]: {
        [`> ${componentCls}-item`]: {
          "&::after": {
            transform: "rotate(225deg)"
          },
          [`${componentCls}-item-icon`]: {
            float: "right"
          }
        }
      },
      // progress-dot
      [`&${componentCls}-dot`]: {
        [`${componentCls}-item-icon ${componentCls}-icon-dot, &${componentCls}-small ${componentCls}-item-icon ${componentCls}-icon-dot`]: {
          float: "right"
        }
      }
    }
  };
};
const genStepsSmallStyle = (token) => {
  const {
    componentCls,
    iconSizeSM,
    // stepsSmallIconMargin,
    fontSizeSM,
    fontSize,
    colorTextDescription
  } = token;
  return {
    [`&${componentCls}-small`]: {
      [`&${componentCls}-horizontal:not(${componentCls}-label-vertical) ${componentCls}-item`]: {
        paddingInlineStart: token.paddingSM,
        "&:first-child": {
          paddingInlineStart: 0
        }
      },
      [`${componentCls}-item-icon`]: {
        width: iconSizeSM,
        height: iconSizeSM,
        // margin: stepsSmallIconMargin,
        marginTop: 0,
        marginBottom: 0,
        marginInline: `0 ${unit(token.marginXS)}`,
        fontSize: fontSizeSM,
        lineHeight: unit(iconSizeSM),
        textAlign: "center",
        borderRadius: iconSizeSM
      },
      [`${componentCls}-item-title`]: {
        paddingInlineEnd: token.paddingSM,
        fontSize,
        lineHeight: unit(iconSizeSM),
        "&::after": {
          top: token.calc(iconSizeSM).div(2).equal()
        }
      },
      [`${componentCls}-item-description`]: {
        color: colorTextDescription,
        fontSize
      },
      [`${componentCls}-item-tail`]: {
        top: token.calc(iconSizeSM).div(2).sub(token.paddingXXS).equal()
      },
      [`${componentCls}-item-custom ${componentCls}-item-icon`]: {
        width: "inherit",
        height: "inherit",
        lineHeight: "inherit",
        background: "none",
        border: 0,
        borderRadius: 0,
        [`> ${componentCls}-icon`]: {
          fontSize: iconSizeSM,
          lineHeight: unit(iconSizeSM),
          transform: "none"
        }
      }
    }
  };
};
const genStepsVerticalStyle = (token) => {
  const {
    componentCls,
    iconSizeSM,
    iconSize
  } = token;
  return {
    [`&${componentCls}-vertical`]: {
      display: "flex",
      flexDirection: "column",
      [`> ${componentCls}-item`]: {
        display: "block",
        flex: "1 0 auto",
        paddingInlineStart: 0,
        overflow: "visible",
        [`${componentCls}-item-icon`]: {
          float: "left",
          marginInlineEnd: token.margin
        },
        [`${componentCls}-item-content`]: {
          display: "block",
          minHeight: token.calc(token.controlHeight).mul(1.5).equal(),
          overflow: "hidden"
        },
        [`${componentCls}-item-title`]: {
          lineHeight: unit(iconSize)
        },
        [`${componentCls}-item-description`]: {
          paddingBottom: token.paddingSM
        }
      },
      [`> ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        position: "absolute",
        top: 0,
        insetInlineStart: token.calc(iconSize).div(2).sub(token.lineWidth).equal(),
        width: token.lineWidth,
        height: "100%",
        padding: `${unit(token.calc(token.marginXXS).mul(1.5).add(iconSize).equal())} 0 ${unit(token.calc(token.marginXXS).mul(1.5).equal())}`,
        "&::after": {
          width: token.lineWidth,
          height: "100%"
        }
      },
      [`> ${componentCls}-item:not(:last-child) > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        display: "block"
      },
      [` > ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-content > ${componentCls}-item-title`]: {
        "&::after": {
          display: "none"
        }
      },
      [`&${componentCls}-small ${componentCls}-item-container`]: {
        [`${componentCls}-item-tail`]: {
          position: "absolute",
          top: 0,
          insetInlineStart: token.calc(iconSizeSM).div(2).sub(token.lineWidth).equal(),
          padding: `${unit(token.calc(token.marginXXS).mul(1.5).add(iconSizeSM).equal())} 0 ${unit(token.calc(token.marginXXS).mul(1.5).equal())}`
        },
        [`${componentCls}-item-title`]: {
          lineHeight: unit(iconSizeSM)
        }
      }
    }
  };
};
const STEP_ITEM_STATUS_WAIT = "wait";
const STEP_ITEM_STATUS_PROCESS = "process";
const STEP_ITEM_STATUS_FINISH = "finish";
const STEP_ITEM_STATUS_ERROR = "error";
const genStepsItemStatusStyle = (status, token) => {
  const prefix = `${token.componentCls}-item`;
  const iconColorKey = `${status}IconColor`;
  const titleColorKey = `${status}TitleColor`;
  const descriptionColorKey = `${status}DescriptionColor`;
  const tailColorKey = `${status}TailColor`;
  const iconBgColorKey = `${status}IconBgColor`;
  const iconBorderColorKey = `${status}IconBorderColor`;
  const dotColorKey = `${status}DotColor`;
  return {
    [`${prefix}-${status} ${prefix}-icon`]: {
      backgroundColor: token[iconBgColorKey],
      borderColor: token[iconBorderColorKey],
      [`> ${token.componentCls}-icon`]: {
        color: token[iconColorKey],
        [`${token.componentCls}-icon-dot`]: {
          background: token[dotColorKey]
        }
      }
    },
    [`${prefix}-${status}${prefix}-custom ${prefix}-icon`]: {
      [`> ${token.componentCls}-icon`]: {
        color: token[dotColorKey]
      }
    },
    [`${prefix}-${status} > ${prefix}-container > ${prefix}-content > ${prefix}-title`]: {
      color: token[titleColorKey],
      "&::after": {
        backgroundColor: token[tailColorKey]
      }
    },
    [`${prefix}-${status} > ${prefix}-container > ${prefix}-content > ${prefix}-description`]: {
      color: token[descriptionColorKey]
    },
    [`${prefix}-${status} > ${prefix}-container > ${prefix}-tail::after`]: {
      backgroundColor: token[tailColorKey]
    }
  };
};
const genStepsItemStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow
  } = token;
  const stepsItemCls = `${componentCls}-item`;
  const stepItemIconCls = `${stepsItemCls}-icon`;
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
    [stepsItemCls]: {
      position: "relative",
      display: "inline-block",
      flex: 1,
      overflow: "hidden",
      verticalAlign: "top",
      "&:last-child": {
        flex: "none",
        [`> ${stepsItemCls}-container > ${stepsItemCls}-tail, > ${stepsItemCls}-container >  ${stepsItemCls}-content > ${stepsItemCls}-title::after`]: {
          display: "none"
        }
      }
    },
    [`${stepsItemCls}-container`]: {
      outline: "none",
      [`&:focus-visible ${stepItemIconCls}`]: genFocusOutline(token)
    },
    [`${stepItemIconCls}, ${stepsItemCls}-content`]: {
      display: "inline-block",
      verticalAlign: "top"
    },
    [stepItemIconCls]: {
      width: token.iconSize,
      height: token.iconSize,
      marginTop: 0,
      marginBottom: 0,
      marginInlineStart: 0,
      marginInlineEnd: token.marginXS,
      fontSize: token.iconFontSize,
      fontFamily: token.fontFamily,
      lineHeight: unit(token.iconSize),
      textAlign: "center",
      borderRadius: token.iconSize,
      border: `${unit(token.lineWidth)} ${token.lineType} transparent`,
      transition: `background-color ${motionDurationSlow}, border-color ${motionDurationSlow}`,
      [`${componentCls}-icon`]: {
        position: "relative",
        top: token.iconTop,
        color: token.colorPrimary,
        lineHeight: 1
      }
    },
    [`${stepsItemCls}-tail`]: {
      position: "absolute",
      top: token.calc(token.iconSize).div(2).equal(),
      insetInlineStart: 0,
      width: "100%",
      "&::after": {
        display: "inline-block",
        width: "100%",
        height: token.lineWidth,
        background: token.colorSplit,
        borderRadius: token.lineWidth,
        transition: `background ${motionDurationSlow}`,
        content: '""'
      }
    },
    [`${stepsItemCls}-title`]: {
      position: "relative",
      display: "inline-block",
      paddingInlineEnd: token.padding,
      color: token.colorText,
      fontSize: token.fontSizeLG,
      lineHeight: unit(token.titleLineHeight),
      "&::after": {
        position: "absolute",
        top: token.calc(token.titleLineHeight).div(2).equal(),
        insetInlineStart: "100%",
        display: "block",
        width: 9999,
        height: token.lineWidth,
        background: token.processTailColor,
        content: '""'
      }
    },
    [`${stepsItemCls}-subtitle`]: {
      display: "inline",
      marginInlineStart: token.marginXS,
      color: token.colorTextDescription,
      fontWeight: "normal",
      fontSize: token.fontSize
    },
    [`${stepsItemCls}-description`]: {
      color: token.colorTextDescription,
      fontSize: token.fontSize
    }
  }, genStepsItemStatusStyle(STEP_ITEM_STATUS_WAIT, token)), genStepsItemStatusStyle(STEP_ITEM_STATUS_PROCESS, token)), {
    [`${stepsItemCls}-process > ${stepsItemCls}-container > ${stepsItemCls}-title`]: {
      fontWeight: token.fontWeightStrong
    }
  }), genStepsItemStatusStyle(STEP_ITEM_STATUS_FINISH, token)), genStepsItemStatusStyle(STEP_ITEM_STATUS_ERROR, token)), {
    [`${stepsItemCls}${componentCls}-next-error > ${componentCls}-item-title::after`]: {
      background: token.colorError
    },
    [`${stepsItemCls}-disabled`]: {
      cursor: "not-allowed"
    }
  });
};
const genStepsClickableStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow
  } = token;
  return {
    [`& ${componentCls}-item`]: {
      [`&:not(${componentCls}-item-active)`]: {
        [`& > ${componentCls}-item-container[role='button']`]: {
          cursor: "pointer",
          [`${componentCls}-item`]: {
            [`&-title, &-subtitle, &-description, &-icon ${componentCls}-icon`]: {
              transition: `color ${motionDurationSlow}`
            }
          },
          "&:hover": {
            [`${componentCls}-item`]: {
              "&-title, &-subtitle, &-description": {
                color: token.colorPrimary
              }
            }
          }
        },
        [`&:not(${componentCls}-item-process)`]: {
          [`& > ${componentCls}-item-container[role='button']:hover`]: {
            [`${componentCls}-item`]: {
              "&-icon": {
                borderColor: token.colorPrimary,
                [`${componentCls}-icon`]: {
                  color: token.colorPrimary
                }
              }
            }
          }
        }
      }
    },
    [`&${componentCls}-horizontal:not(${componentCls}-label-vertical)`]: {
      [`${componentCls}-item`]: {
        paddingInlineStart: token.padding,
        whiteSpace: "nowrap",
        "&:first-child": {
          paddingInlineStart: 0
        },
        [`&:last-child ${componentCls}-item-title`]: {
          paddingInlineEnd: 0
        },
        "&-tail": {
          display: "none"
        },
        "&-description": {
          maxWidth: token.descriptionMaxWidth,
          whiteSpace: "normal"
        }
      }
    }
  };
};
const genStepsStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      display: "flex",
      width: "100%",
      fontSize: 0,
      textAlign: "initial"
    }), genStepsItemStyle(token)), genStepsClickableStyle(token)), genStepsCustomIconStyle(token)), genStepsSmallStyle(token)), genStepsVerticalStyle(token)), genHorizontalStyle(token)), genStepsLabelPlacementStyle(token)), genStepsProgressDotStyle(token)), genStepsNavStyle(token)), genStepsRTLStyle(token)), genStepsProgressStyle(token)), genStepsInlineStyle(token))
  };
};
const prepareComponentToken$3 = (token) => ({
  titleLineHeight: token.controlHeight,
  customIconSize: token.controlHeight,
  customIconTop: 0,
  customIconFontSize: token.controlHeightSM,
  iconSize: token.controlHeight,
  iconTop: -0.5,
  // magic for ui experience
  iconFontSize: token.fontSize,
  iconSizeSM: token.fontSizeHeading3,
  dotSize: token.controlHeight / 4,
  dotCurrentSize: token.controlHeightLG / 4,
  navArrowColor: token.colorTextDisabled,
  navContentMaxWidth: "unset",
  descriptionMaxWidth: 140,
  waitIconColor: token.wireframe ? token.colorTextDisabled : token.colorTextLabel,
  waitIconBgColor: token.wireframe ? token.colorBgContainer : token.colorFillContent,
  waitIconBorderColor: token.wireframe ? token.colorTextDisabled : "transparent",
  finishIconBgColor: token.wireframe ? token.colorBgContainer : token.controlItemBgActive,
  finishIconBorderColor: token.wireframe ? token.colorPrimary : token.controlItemBgActive
});
const useStyle$3 = genStyleHooks("Steps", (token) => {
  const {
    colorTextDisabled,
    controlHeightLG,
    colorTextLightSolid,
    colorText,
    colorPrimary,
    colorTextDescription,
    colorTextQuaternary,
    colorError,
    colorBorderSecondary,
    colorSplit
  } = token;
  const stepsToken = merge(token, {
    // Steps component less variable
    processIconColor: colorTextLightSolid,
    processTitleColor: colorText,
    processDescriptionColor: colorText,
    processIconBgColor: colorPrimary,
    processIconBorderColor: colorPrimary,
    processDotColor: colorPrimary,
    processTailColor: colorSplit,
    waitTitleColor: colorTextDescription,
    waitDescriptionColor: colorTextDescription,
    waitTailColor: colorSplit,
    waitDotColor: colorTextDisabled,
    finishIconColor: colorPrimary,
    finishTitleColor: colorText,
    finishDescriptionColor: colorTextDescription,
    finishTailColor: colorPrimary,
    finishDotColor: colorPrimary,
    errorIconColor: colorTextLightSolid,
    errorTitleColor: colorError,
    errorDescriptionColor: colorError,
    errorTailColor: colorSplit,
    errorIconBgColor: colorError,
    errorIconBorderColor: colorError,
    errorDotColor: colorError,
    stepsNavActiveColor: colorPrimary,
    stepsProgressSize: controlHeightLG,
    // Steps inline variable
    inlineDotSize: 6,
    inlineTitleColor: colorTextQuaternary,
    inlineTailColor: colorBorderSecondary
  });
  return genStepsStyle(stepsToken);
}, prepareComponentToken$3);
function filter(items) {
  return items.filter((item) => item);
}
function useLegacyItems(items, children) {
  if (items) {
    return items;
  }
  const childrenItems = toArray$1(children).map((node) => {
    if (/* @__PURE__ */ reactExports.isValidElement(node)) {
      const {
        props
      } = node;
      const item = Object.assign({}, props);
      return item;
    }
    return null;
  });
  return filter(childrenItems);
}
var __rest$a = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Steps = (props) => {
  const {
    percent,
    size: customizeSize,
    className,
    rootClassName,
    direction,
    items,
    responsive = true,
    current = 0,
    children,
    style
  } = props, restProps = __rest$a(props, ["percent", "size", "className", "rootClassName", "direction", "items", "responsive", "current", "children", "style"]);
  const {
    xs
  } = useBreakpoint$1(responsive);
  const {
    getPrefixCls,
    direction: rtlDirection,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("steps");
  const realDirectionValue = reactExports.useMemo(() => responsive && xs ? "vertical" : direction, [responsive, xs, direction]);
  const size = useSize(customizeSize);
  const prefixCls = getPrefixCls("steps", props.prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$3(prefixCls);
  const isInline = props.type === "inline";
  const iconPrefix = getPrefixCls("", props.iconPrefix);
  const mergedItems = useLegacyItems(items, children);
  const mergedPercent = isInline ? void 0 : percent;
  const mergedStyle = Object.assign(Object.assign({}, contextStyle), style);
  const stepsClassName = classNames(contextClassName, {
    [`${prefixCls}-rtl`]: rtlDirection === "rtl",
    [`${prefixCls}-with-progress`]: mergedPercent !== void 0
  }, className, rootClassName, hashId, cssVarCls);
  const icons2 = {
    finish: /* @__PURE__ */ reactExports.createElement(RefIcon$n, {
      className: `${prefixCls}-finish-icon`
    }),
    error: /* @__PURE__ */ reactExports.createElement(RefIcon$h, {
      className: `${prefixCls}-error-icon`
    })
  };
  const stepIconRender = ({
    node,
    status
  }) => {
    if (status === "process" && mergedPercent !== void 0) {
      const progressWidth = size === "small" ? 32 : 40;
      return /* @__PURE__ */ reactExports.createElement("div", {
        className: `${prefixCls}-progress-icon`
      }, /* @__PURE__ */ reactExports.createElement(Progress, {
        type: "circle",
        percent: mergedPercent,
        size: progressWidth,
        strokeWidth: 4,
        format: () => null
      }), node);
    }
    return node;
  };
  const itemRender = (item, stepItem) => item.description ? /* @__PURE__ */ reactExports.createElement(Tooltip, {
    title: item.description
  }, stepItem) : stepItem;
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Steps$1, Object.assign({
    icons: icons2
  }, restProps, {
    style: mergedStyle,
    current,
    size,
    items: mergedItems,
    itemRender: isInline ? itemRender : void 0,
    stepIcon: stepIconRender,
    direction: realDirectionValue,
    prefixCls,
    iconPrefix,
    className: stepsClassName
  })));
};
Steps.Step = Steps$1.Step;
const getDesignToken = (config) => {
  const theme = (config === null || config === void 0 ? void 0 : config.algorithm) ? createTheme(config.algorithm) : defaultTheme;
  const mergedToken = Object.assign(Object.assign({}, seedToken), config === null || config === void 0 ? void 0 : config.token);
  return getComputedToken(mergedToken, {
    override: config === null || config === void 0 ? void 0 : config.token
  }, theme, formatToken);
};
function genSizeMapToken(token) {
  const {
    sizeUnit,
    sizeStep
  } = token;
  const compactSizeStep = sizeStep - 2;
  return {
    sizeXXL: sizeUnit * (compactSizeStep + 10),
    sizeXL: sizeUnit * (compactSizeStep + 6),
    sizeLG: sizeUnit * (compactSizeStep + 2),
    sizeMD: sizeUnit * (compactSizeStep + 2),
    sizeMS: sizeUnit * (compactSizeStep + 1),
    size: sizeUnit * compactSizeStep,
    sizeSM: sizeUnit * compactSizeStep,
    sizeXS: sizeUnit * (compactSizeStep - 1),
    sizeXXS: sizeUnit * (compactSizeStep - 1)
  };
}
const derivative$1 = (token, mapToken) => {
  const mergedMapToken = mapToken !== null && mapToken !== void 0 ? mapToken : derivative$2(token);
  const fontSize = mergedMapToken.fontSizeSM;
  const controlHeight = mergedMapToken.controlHeight - 4;
  return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, mergedMapToken), genSizeMapToken(mapToken !== null && mapToken !== void 0 ? mapToken : token)), genFontMapToken(fontSize)), {
    // controlHeight
    controlHeight
  }), genControlHeight(Object.assign(Object.assign({}, mergedMapToken), {
    controlHeight
  })));
};
const getAlphaColor = (baseColor, alpha) => new FastColor(baseColor).setA(alpha).toRgbString();
const getSolidColor = (baseColor, brightness) => {
  const instance = new FastColor(baseColor);
  return instance.lighten(brightness).toHexString();
};
const generateColorPalettes = (baseColor) => {
  const colors = generate(baseColor, {
    theme: "dark"
  });
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[6],
    6: colors[5],
    7: colors[4],
    8: colors[6],
    9: colors[5],
    10: colors[4]
    // 8: colors[9],
    // 9: colors[8],
    // 10: colors[7],
  };
};
const generateNeutralColorPalettes = (bgBaseColor, textBaseColor) => {
  const colorBgBase = bgBaseColor || "#000";
  const colorTextBase = textBaseColor || "#fff";
  return {
    colorBgBase,
    colorTextBase,
    colorText: getAlphaColor(colorTextBase, 0.85),
    colorTextSecondary: getAlphaColor(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),
    colorFill: getAlphaColor(colorTextBase, 0.18),
    colorFillSecondary: getAlphaColor(colorTextBase, 0.12),
    colorFillTertiary: getAlphaColor(colorTextBase, 0.08),
    colorFillQuaternary: getAlphaColor(colorTextBase, 0.04),
    colorBgSolid: getAlphaColor(colorTextBase, 0.95),
    colorBgSolidHover: getAlphaColor(colorTextBase, 1),
    colorBgSolidActive: getAlphaColor(colorTextBase, 0.9),
    colorBgElevated: getSolidColor(colorBgBase, 12),
    colorBgContainer: getSolidColor(colorBgBase, 8),
    colorBgLayout: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getSolidColor(colorBgBase, 26),
    colorBgBlur: getAlphaColor(colorTextBase, 0.04),
    colorBorder: getSolidColor(colorBgBase, 26),
    colorBorderSecondary: getSolidColor(colorBgBase, 19)
  };
};
const derivative = (token, mapToken) => {
  const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
    const colors = generate(token[colorKey], {
      theme: "dark"
    });
    return Array.from({
      length: 10
    }, () => 1).reduce((prev, _, i) => {
      prev[`${colorKey}-${i + 1}`] = colors[i];
      prev[`${colorKey}${i + 1}`] = colors[i];
      return prev;
    }, {});
  }).reduce((prev, cur) => {
    prev = Object.assign(Object.assign({}, prev), cur);
    return prev;
  }, {});
  const mergedMapToken = mapToken !== null && mapToken !== void 0 ? mapToken : derivative$2(token);
  const colorMapToken = genColorMapToken(token, {
    generateColorPalettes,
    generateNeutralColorPalettes
  });
  return Object.assign(Object.assign(Object.assign(Object.assign({}, mergedMapToken), colorPalettes), colorMapToken), {
    // Customize selected item background color
    // https://github.com/ant-design/ant-design/issues/30524#issuecomment-871961867
    colorPrimaryBg: colorMapToken.colorPrimaryBorder,
    colorPrimaryBgHover: colorMapToken.colorPrimaryBorderHover
  });
};
function useToken() {
  const [theme, token, hashId] = useToken$1();
  return {
    theme,
    token,
    hashId
  };
}
const index = {
  /** Default seedToken */
  defaultSeed: defaultConfig.token,
  useToken,
  defaultAlgorithm: derivative$2,
  darkAlgorithm: derivative,
  compactAlgorithm: derivative$1,
  getDesignToken,
  /**
   * @private Private variable
   * @warring 🔥 Do not use in production. 🔥
   */
  defaultConfig,
  /**
   * @private Private variable
   * @warring 🔥 Do not use in production. 🔥
   */
  _internalContext: DesignTokenContext
};
var __rest$9 = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const {
  TimePicker: InternalTimePicker,
  RangePicker: InternalRangePicker
} = DatePicker;
const RangePicker = /* @__PURE__ */ reactExports.forwardRef((props, ref) => /* @__PURE__ */ reactExports.createElement(InternalRangePicker, Object.assign({}, props, {
  picker: "time",
  mode: void 0,
  ref
})));
const TimePicker = /* @__PURE__ */ reactExports.forwardRef((_a, ref) => {
  var {
    addon,
    renderExtraFooter,
    variant,
    bordered
  } = _a, restProps = __rest$9(_a, ["addon", "renderExtraFooter", "variant", "bordered"]);
  const [mergedVariant] = useVariant("timePicker", variant, bordered);
  const internalRenderExtraFooter = reactExports.useMemo(() => {
    if (renderExtraFooter) {
      return renderExtraFooter;
    }
    if (addon) {
      return addon;
    }
    return void 0;
  }, [addon, renderExtraFooter]);
  return /* @__PURE__ */ reactExports.createElement(InternalTimePicker, Object.assign({}, restProps, {
    mode: void 0,
    ref,
    renderExtraFooter: internalRenderExtraFooter,
    variant: mergedVariant
  }));
});
const PurePanel$3 = genPurePanel(TimePicker, "popupAlign", void 0, "picker");
TimePicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$3;
TimePicker.RangePicker = RangePicker;
TimePicker._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$3;
function isConfigObj(closable) {
  return closable !== null && _typeof(closable) === "object";
}
function getClosableConfig(closable, closeIcon, preset) {
  if (closable === false || closeIcon === false && (!isConfigObj(closable) || !closable.closeIcon)) {
    return null;
  }
  var mergedCloseIcon = typeof closeIcon !== "boolean" ? closeIcon : void 0;
  if (isConfigObj(closable)) {
    var _closable$closeIcon;
    return _objectSpread2(_objectSpread2({}, closable), {}, {
      closeIcon: (_closable$closeIcon = closable.closeIcon) !== null && _closable$closeIcon !== void 0 ? _closable$closeIcon : mergedCloseIcon
    });
  }
  return preset || closable || closeIcon ? {
    closeIcon: mergedCloseIcon
  } : "empty";
}
function useClosable(stepClosable, stepCloseIcon, closable, closeIcon) {
  return reactExports.useMemo(function() {
    var stepClosableConfig = getClosableConfig(stepClosable, stepCloseIcon, false);
    var rootClosableConfig = getClosableConfig(closable, closeIcon, true);
    if (stepClosableConfig !== "empty") {
      return stepClosableConfig;
    }
    return rootClosableConfig;
  }, [closable, closeIcon, stepClosable, stepCloseIcon]);
}
function isInViewPort(element) {
  var viewWidth = window.innerWidth || document.documentElement.clientWidth;
  var viewHeight = window.innerHeight || document.documentElement.clientHeight;
  var _element$getBoundingC = element.getBoundingClientRect(), top = _element$getBoundingC.top, right = _element$getBoundingC.right, bottom = _element$getBoundingC.bottom, left = _element$getBoundingC.left;
  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}
function getPlacement(targetElement, placement, stepPlacement) {
  var _ref;
  return (_ref = stepPlacement !== null && stepPlacement !== void 0 ? stepPlacement : placement) !== null && _ref !== void 0 ? _ref : targetElement === null ? "center" : "bottom";
}
function isValidNumber(val) {
  return typeof val === "number" && !Number.isNaN(val);
}
function useTarget(target, open2, gap, scrollIntoViewOptions) {
  var _useState = reactExports.useState(void 0), _useState2 = _slicedToArray(_useState, 2), targetElement = _useState2[0], setTargetElement = _useState2[1];
  useLayoutEffect(function() {
    var nextElement = typeof target === "function" ? target() : target;
    setTargetElement(nextElement || null);
  });
  var _useState3 = reactExports.useState(null), _useState4 = _slicedToArray(_useState3, 2), posInfo = _useState4[0], setPosInfo = _useState4[1];
  var updatePos = useEvent(function() {
    if (targetElement) {
      if (!isInViewPort(targetElement) && open2) {
        targetElement.scrollIntoView(scrollIntoViewOptions);
      }
      var _targetElement$getBou = targetElement.getBoundingClientRect(), left = _targetElement$getBou.left, top = _targetElement$getBou.top, width = _targetElement$getBou.width, height = _targetElement$getBou.height;
      var nextPosInfo = {
        left,
        top,
        width,
        height,
        radius: 0
      };
      setPosInfo(function(origin) {
        if (JSON.stringify(origin) !== JSON.stringify(nextPosInfo)) {
          return nextPosInfo;
        }
        return origin;
      });
    } else {
      setPosInfo(null);
    }
  });
  var getGapOffset = function getGapOffset2(index2) {
    var _ref;
    return (_ref = Array.isArray(gap === null || gap === void 0 ? void 0 : gap.offset) ? gap === null || gap === void 0 ? void 0 : gap.offset[index2] : gap === null || gap === void 0 ? void 0 : gap.offset) !== null && _ref !== void 0 ? _ref : 6;
  };
  useLayoutEffect(function() {
    updatePos();
    window.addEventListener("resize", updatePos);
    return function() {
      window.removeEventListener("resize", updatePos);
    };
  }, [targetElement, open2, updatePos]);
  var mergedPosInfo = reactExports.useMemo(function() {
    if (!posInfo) {
      return posInfo;
    }
    var gapOffsetX = getGapOffset(0);
    var gapOffsetY = getGapOffset(1);
    var gapRadius = isValidNumber(gap === null || gap === void 0 ? void 0 : gap.radius) ? gap === null || gap === void 0 ? void 0 : gap.radius : 2;
    return {
      left: posInfo.left - gapOffsetX,
      top: posInfo.top - gapOffsetY,
      width: posInfo.width + gapOffsetX * 2,
      height: posInfo.height + gapOffsetY * 2,
      radius: gapRadius
    };
  }, [posInfo, gap]);
  return [mergedPosInfo, targetElement];
}
var COVER_PROPS = {
  fill: "transparent",
  pointerEvents: "auto"
};
var Mask = function Mask2(props) {
  var prefixCls = props.prefixCls, rootClassName = props.rootClassName, pos = props.pos, showMask = props.showMask, _props$style = props.style, style = _props$style === void 0 ? {} : _props$style, _props$fill = props.fill, fill = _props$fill === void 0 ? "rgba(0,0,0,0.5)" : _props$fill, open2 = props.open, animated = props.animated, zIndex = props.zIndex, disabledInteraction = props.disabledInteraction;
  var id = useId$1();
  var maskId = "".concat(prefixCls, "-mask-").concat(id);
  var mergedAnimated = _typeof(animated) === "object" ? animated === null || animated === void 0 ? void 0 : animated.placeholder : animated;
  var isSafari = typeof navigator !== "undefined" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  var maskRectSize = isSafari ? {
    width: "100%",
    height: "100%"
  } : {
    width: "100vw",
    height: "100vh"
  };
  return /* @__PURE__ */ React.createElement(Portal, {
    open: open2,
    autoLock: true
  }, /* @__PURE__ */ React.createElement("div", {
    className: classNames("".concat(prefixCls, "-mask"), rootClassName),
    style: _objectSpread2({
      position: "fixed",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex,
      pointerEvents: pos && !disabledInteraction ? "none" : "auto"
    }, style)
  }, showMask ? /* @__PURE__ */ React.createElement("svg", {
    style: {
      width: "100%",
      height: "100%"
    }
  }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("mask", {
    id: maskId
  }, /* @__PURE__ */ React.createElement("rect", _extends({
    x: "0",
    y: "0"
  }, maskRectSize, {
    fill: "white"
  })), pos && /* @__PURE__ */ React.createElement("rect", {
    x: pos.left,
    y: pos.top,
    rx: pos.radius,
    width: pos.width,
    height: pos.height,
    fill: "black",
    className: mergedAnimated ? "".concat(prefixCls, "-placeholder-animated") : ""
  }))), /* @__PURE__ */ React.createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill,
    mask: "url(#".concat(maskId, ")")
  }), pos && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", _extends({}, COVER_PROPS, {
    x: "0",
    y: "0",
    width: "100%",
    height: pos.top
  })), /* @__PURE__ */ React.createElement("rect", _extends({}, COVER_PROPS, {
    x: "0",
    y: "0",
    width: pos.left,
    height: "100%"
  })), /* @__PURE__ */ React.createElement("rect", _extends({}, COVER_PROPS, {
    x: "0",
    y: pos.top + pos.height,
    width: "100%",
    height: "calc(100vh - ".concat(pos.top + pos.height, "px)")
  })), /* @__PURE__ */ React.createElement("rect", _extends({}, COVER_PROPS, {
    x: pos.left + pos.width,
    y: "0",
    width: "calc(100vw - ".concat(pos.left + pos.width, "px)"),
    height: "100%"
  })))) : null));
};
var targetOffset = [0, 0];
var basePlacements = {
  left: {
    points: ["cr", "cl"],
    offset: [-8, 0]
  },
  right: {
    points: ["cl", "cr"],
    offset: [8, 0]
  },
  top: {
    points: ["bc", "tc"],
    offset: [0, -8]
  },
  bottom: {
    points: ["tc", "bc"],
    offset: [0, 8]
  },
  topLeft: {
    points: ["bl", "tl"],
    offset: [0, -8]
  },
  leftTop: {
    points: ["tr", "tl"],
    offset: [-8, 0]
  },
  topRight: {
    points: ["br", "tr"],
    offset: [0, -8]
  },
  rightTop: {
    points: ["tl", "tr"],
    offset: [8, 0]
  },
  bottomRight: {
    points: ["tr", "br"],
    offset: [0, 8]
  },
  rightBottom: {
    points: ["bl", "br"],
    offset: [8, 0]
  },
  bottomLeft: {
    points: ["tl", "bl"],
    offset: [0, 8]
  },
  leftBottom: {
    points: ["br", "bl"],
    offset: [-8, 0]
  }
};
function getPlacements() {
  var arrowPointAtCenter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
  var placements = {};
  Object.keys(basePlacements).forEach(function(key) {
    placements[key] = _objectSpread2(_objectSpread2({}, basePlacements[key]), {}, {
      autoArrow: arrowPointAtCenter,
      targetOffset
    });
  });
  return placements;
}
getPlacements();
function DefaultPanel(props) {
  var _closable$closeIcon;
  var prefixCls = props.prefixCls, current = props.current, total = props.total, title = props.title, description = props.description, onClose = props.onClose, onPrev = props.onPrev, onNext = props.onNext, onFinish = props.onFinish, className = props.className, closable = props.closable;
  var ariaProps = pickAttrs(closable || {}, true);
  var closeIcon = (_closable$closeIcon = closable === null || closable === void 0 ? void 0 : closable.closeIcon) !== null && _closable$closeIcon !== void 0 ? _closable$closeIcon : /* @__PURE__ */ reactExports.createElement("span", {
    className: "".concat(prefixCls, "-close-x")
  }, "×");
  var mergedClosable = !!closable;
  return /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames("".concat(prefixCls, "-content"), className)
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-inner")
  }, mergedClosable && /* @__PURE__ */ reactExports.createElement("button", _extends({
    type: "button",
    onClick: onClose,
    "aria-label": "Close"
  }, ariaProps, {
    className: "".concat(prefixCls, "-close")
  }), closeIcon), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-header")
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-title")
  }, title)), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-description")
  }, description), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-footer")
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-sliders")
  }, total > 1 ? _toConsumableArray(Array.from({
    length: total
  }).keys()).map(function(item, index2) {
    return /* @__PURE__ */ reactExports.createElement("span", {
      key: item,
      className: index2 === current ? "active" : ""
    });
  }) : null), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-buttons")
  }, current !== 0 ? /* @__PURE__ */ reactExports.createElement("button", {
    className: "".concat(prefixCls, "-prev-btn"),
    onClick: onPrev
  }, "Prev") : null, current === total - 1 ? /* @__PURE__ */ reactExports.createElement("button", {
    className: "".concat(prefixCls, "-finish-btn"),
    onClick: onFinish
  }, "Finish") : /* @__PURE__ */ reactExports.createElement("button", {
    className: "".concat(prefixCls, "-next-btn"),
    onClick: onNext
  }, "Next")))));
}
var TourStep = function TourStep2(props) {
  var current = props.current, renderPanel = props.renderPanel;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, typeof renderPanel === "function" ? renderPanel(props, current) : /* @__PURE__ */ reactExports.createElement(DefaultPanel, props));
};
var _excluded$2 = ["prefixCls", "steps", "defaultCurrent", "current", "onChange", "onClose", "onFinish", "open", "mask", "arrow", "rootClassName", "placement", "renderPanel", "gap", "animated", "scrollIntoViewOptions", "zIndex", "closeIcon", "closable", "builtinPlacements", "disabledInteraction"];
var CENTER_PLACEHOLDER = {
  left: "50%",
  top: "50%",
  width: 1,
  height: 1
};
var defaultScrollIntoViewOptions = {
  block: "center",
  inline: "center"
};
var Tour$1 = function Tour(props) {
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-tour" : _props$prefixCls, _props$steps = props.steps, steps = _props$steps === void 0 ? [] : _props$steps, defaultCurrent = props.defaultCurrent, current = props.current, onChange = props.onChange, onClose = props.onClose, _onFinish = props.onFinish, open2 = props.open, _props$mask = props.mask, mask = _props$mask === void 0 ? true : _props$mask, _props$arrow = props.arrow, arrow = _props$arrow === void 0 ? true : _props$arrow, rootClassName = props.rootClassName, placement = props.placement, renderPanel = props.renderPanel, gap = props.gap, animated = props.animated, _props$scrollIntoView = props.scrollIntoViewOptions, scrollIntoViewOptions = _props$scrollIntoView === void 0 ? defaultScrollIntoViewOptions : _props$scrollIntoView, _props$zIndex = props.zIndex, zIndex = _props$zIndex === void 0 ? 1001 : _props$zIndex, closeIcon = props.closeIcon, closable = props.closable, builtinPlacements = props.builtinPlacements, disabledInteraction = props.disabledInteraction, restProps = _objectWithoutProperties(props, _excluded$2);
  var triggerRef = reactExports.useRef();
  var _useMergedState = useMergedState(0, {
    value: current,
    defaultValue: defaultCurrent
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), mergedCurrent = _useMergedState2[0], setMergedCurrent = _useMergedState2[1];
  var _useMergedState3 = useMergedState(void 0, {
    value: open2,
    postState: function postState(origin) {
      return mergedCurrent < 0 || mergedCurrent >= steps.length ? false : origin !== null && origin !== void 0 ? origin : true;
    }
  }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), mergedOpen = _useMergedState4[0], setMergedOpen = _useMergedState4[1];
  var _React$useState = reactExports.useState(mergedOpen), _React$useState2 = _slicedToArray(_React$useState, 2), hasOpened = _React$useState2[0], setHasOpened = _React$useState2[1];
  var openRef = reactExports.useRef(mergedOpen);
  useLayoutEffect(function() {
    if (mergedOpen) {
      if (!openRef.current) {
        setMergedCurrent(0);
      }
      setHasOpened(true);
    }
    openRef.current = mergedOpen;
  }, [mergedOpen]);
  var _ref = steps[mergedCurrent] || {}, target = _ref.target, stepPlacement = _ref.placement, stepStyle = _ref.style, stepArrow = _ref.arrow, stepClassName = _ref.className, stepMask = _ref.mask, _ref$scrollIntoViewOp = _ref.scrollIntoViewOptions, stepScrollIntoViewOptions = _ref$scrollIntoViewOp === void 0 ? defaultScrollIntoViewOptions : _ref$scrollIntoViewOp, stepCloseIcon = _ref.closeIcon, stepClosable = _ref.closable;
  var mergedClosable = useClosable(stepClosable, stepCloseIcon, closable, closeIcon);
  var mergedMask = mergedOpen && (stepMask !== null && stepMask !== void 0 ? stepMask : mask);
  var mergedScrollIntoViewOptions = stepScrollIntoViewOptions !== null && stepScrollIntoViewOptions !== void 0 ? stepScrollIntoViewOptions : scrollIntoViewOptions;
  var _useTarget = useTarget(target, open2, gap, mergedScrollIntoViewOptions), _useTarget2 = _slicedToArray(_useTarget, 2), posInfo = _useTarget2[0], targetElement = _useTarget2[1];
  var mergedPlacement = getPlacement(targetElement, placement, stepPlacement);
  var mergedArrow = targetElement ? typeof stepArrow === "undefined" ? arrow : stepArrow : false;
  var arrowPointAtCenter = _typeof(mergedArrow) === "object" ? mergedArrow.pointAtCenter : false;
  useLayoutEffect(function() {
    var _triggerRef$current;
    (_triggerRef$current = triggerRef.current) === null || _triggerRef$current === void 0 ? void 0 : _triggerRef$current.forceAlign();
  }, [arrowPointAtCenter, mergedCurrent]);
  var onInternalChange = function onInternalChange2(nextCurrent) {
    setMergedCurrent(nextCurrent);
    onChange === null || onChange === void 0 ? void 0 : onChange(nextCurrent);
  };
  var mergedBuiltinPlacements2 = reactExports.useMemo(function() {
    if (builtinPlacements) {
      return typeof builtinPlacements === "function" ? builtinPlacements({
        arrowPointAtCenter
      }) : builtinPlacements;
    }
    return getPlacements(arrowPointAtCenter);
  }, [builtinPlacements, arrowPointAtCenter]);
  if (targetElement === void 0 || !hasOpened) {
    return null;
  }
  var handleClose = function handleClose2() {
    setMergedOpen(false);
    onClose === null || onClose === void 0 ? void 0 : onClose(mergedCurrent);
  };
  var getPopupElement = function getPopupElement2() {
    return /* @__PURE__ */ reactExports.createElement(TourStep, _extends({
      arrow: mergedArrow,
      key: "content",
      prefixCls,
      total: steps.length,
      renderPanel,
      onPrev: function onPrev() {
        onInternalChange(mergedCurrent - 1);
      },
      onNext: function onNext() {
        onInternalChange(mergedCurrent + 1);
      },
      onClose: handleClose,
      current: mergedCurrent,
      onFinish: function onFinish() {
        handleClose();
        _onFinish === null || _onFinish === void 0 ? void 0 : _onFinish();
      }
    }, steps[mergedCurrent], {
      closable: mergedClosable
    }));
  };
  var mergedShowMask = typeof mergedMask === "boolean" ? mergedMask : !!mergedMask;
  var mergedMaskStyle = typeof mergedMask === "boolean" ? void 0 : mergedMask;
  var getTriggerDOMNode = function getTriggerDOMNode2(node) {
    return node || targetElement || document.body;
  };
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(Mask, {
    zIndex,
    prefixCls,
    pos: posInfo,
    showMask: mergedShowMask,
    style: mergedMaskStyle === null || mergedMaskStyle === void 0 ? void 0 : mergedMaskStyle.style,
    fill: mergedMaskStyle === null || mergedMaskStyle === void 0 ? void 0 : mergedMaskStyle.color,
    open: mergedOpen,
    animated,
    rootClassName,
    disabledInteraction
  }), /* @__PURE__ */ reactExports.createElement(Trigger, _extends({}, restProps, {
    builtinPlacements: mergedBuiltinPlacements2,
    ref: triggerRef,
    popupStyle: stepStyle,
    popupPlacement: mergedPlacement,
    popupVisible: mergedOpen,
    popupClassName: classNames(rootClassName, stepClassName),
    prefixCls,
    popup: getPopupElement,
    forceRender: false,
    destroyPopupOnHide: true,
    zIndex,
    getTriggerDOMNode,
    arrow: !!mergedArrow
  }), /* @__PURE__ */ reactExports.createElement(Portal, {
    open: mergedOpen,
    autoLock: true
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(rootClassName, "".concat(prefixCls, "-target-placeholder")),
    style: _objectSpread2(_objectSpread2({}, posInfo || CENTER_PLACEHOLDER), {}, {
      position: "fixed",
      pointerEvents: "none"
    })
  }))));
};
const isNonNullable = (val) => {
  return val !== void 0 && val !== null;
};
const TourPanel = (props) => {
  var _a, _b;
  const {
    stepProps,
    current,
    type,
    indicatorsRender,
    actionsRender
  } = props;
  const {
    prefixCls,
    total = 1,
    title,
    onClose,
    onPrev,
    onNext,
    onFinish,
    cover,
    description,
    nextButtonProps,
    prevButtonProps,
    type: stepType,
    closable
  } = stepProps;
  const mergedType = stepType !== null && stepType !== void 0 ? stepType : type;
  const ariaProps = pickAttrs(closable !== null && closable !== void 0 ? closable : {}, true);
  const [contextLocaleGlobal] = useLocale("global", localeValues.global);
  const [contextLocaleTour] = useLocale("Tour", localeValues.Tour);
  const mergedCloseIcon = /* @__PURE__ */ React.createElement("button", Object.assign({
    type: "button",
    onClick: onClose,
    className: `${prefixCls}-close`,
    "aria-label": contextLocaleGlobal === null || contextLocaleGlobal === void 0 ? void 0 : contextLocaleGlobal.close
  }, ariaProps), (closable === null || closable === void 0 ? void 0 : closable.closeIcon) || /* @__PURE__ */ React.createElement(RefIcon$h, {
    className: `${prefixCls}-close-icon`
  }));
  const isLastStep = current === total - 1;
  const prevBtnClick = () => {
    var _a2;
    onPrev === null || onPrev === void 0 ? void 0 : onPrev();
    (_a2 = prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.onClick) === null || _a2 === void 0 ? void 0 : _a2.call(prevButtonProps);
  };
  const nextBtnClick = () => {
    var _a2;
    if (isLastStep) {
      onFinish === null || onFinish === void 0 ? void 0 : onFinish();
    } else {
      onNext === null || onNext === void 0 ? void 0 : onNext();
    }
    (_a2 = nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.onClick) === null || _a2 === void 0 ? void 0 : _a2.call(nextButtonProps);
  };
  const headerNode = isNonNullable(title) ? /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-header`
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-title`
  }, title)) : null;
  const descriptionNode = isNonNullable(description) ? /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-description`
  }, description) : null;
  const coverNode = isNonNullable(cover) ? /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-cover`
  }, cover) : null;
  let mergedIndicatorNode;
  if (indicatorsRender) {
    mergedIndicatorNode = indicatorsRender(current, total);
  } else {
    mergedIndicatorNode = _toConsumableArray(Array.from({
      length: total
    }).keys()).map((stepItem, index2) => /* @__PURE__ */ React.createElement("span", {
      key: stepItem,
      className: classNames(index2 === current && `${prefixCls}-indicator-active`, `${prefixCls}-indicator`)
    }));
  }
  const mainBtnType = mergedType === "primary" ? "default" : "primary";
  const secondaryBtnProps = {
    type: "default",
    ghost: mergedType === "primary"
  };
  const defaultActionsNode = /* @__PURE__ */ React.createElement(React.Fragment, null, current !== 0 ? /* @__PURE__ */ React.createElement(Button$1, Object.assign({
    size: "small"
  }, secondaryBtnProps, prevButtonProps, {
    onClick: prevBtnClick,
    className: classNames(`${prefixCls}-prev-btn`, prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.className)
  }), (_a = prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.children) !== null && _a !== void 0 ? _a : contextLocaleTour === null || contextLocaleTour === void 0 ? void 0 : contextLocaleTour.Previous) : null, /* @__PURE__ */ React.createElement(Button$1, Object.assign({
    size: "small",
    type: mainBtnType
  }, nextButtonProps, {
    onClick: nextBtnClick,
    className: classNames(`${prefixCls}-next-btn`, nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.className)
  }), (_b = nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.children) !== null && _b !== void 0 ? _b : isLastStep ? contextLocaleTour === null || contextLocaleTour === void 0 ? void 0 : contextLocaleTour.Finish : contextLocaleTour === null || contextLocaleTour === void 0 ? void 0 : contextLocaleTour.Next));
  return /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-content`
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-inner`
  }, closable && mergedCloseIcon, coverNode, headerNode, descriptionNode, /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-footer`
  }, total > 1 && /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-indicators`
  }, mergedIndicatorNode), /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-buttons`
  }, actionsRender ? actionsRender(defaultActionsNode, {
    current,
    total
  }) : defaultActionsNode))));
};
const genBaseStyle$1 = (token) => {
  const {
    componentCls,
    padding,
    paddingXS,
    borderRadius,
    borderRadiusXS,
    colorPrimary,
    colorFill,
    indicatorHeight,
    indicatorWidth,
    boxShadowTertiary,
    zIndexPopup,
    colorBgElevated,
    fontWeightStrong,
    marginXS,
    colorTextLightSolid,
    tourBorderRadius,
    colorWhite,
    primaryNextBtnHoverBg,
    closeBtnSize,
    motionDurationSlow,
    antCls,
    primaryPrevBtnBg
  } = token;
  return [
    {
      [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        position: "absolute",
        zIndex: zIndexPopup,
        maxWidth: "fit-content",
        visibility: "visible",
        width: 520,
        "--antd-arrow-background-color": colorBgElevated,
        "&-pure": {
          maxWidth: "100%",
          position: "relative"
        },
        [`&${componentCls}-hidden`]: {
          display: "none"
        },
        // ============================= panel content ============================
        [`${componentCls}-content`]: {
          position: "relative"
        },
        [`${componentCls}-inner`]: {
          textAlign: "start",
          textDecoration: "none",
          borderRadius: tourBorderRadius,
          boxShadow: boxShadowTertiary,
          position: "relative",
          backgroundColor: colorBgElevated,
          border: "none",
          backgroundClip: "padding-box",
          [`${componentCls}-close`]: Object.assign({
            position: "absolute",
            top: padding,
            insetInlineEnd: padding,
            color: token.colorIcon,
            background: "none",
            border: "none",
            width: closeBtnSize,
            height: closeBtnSize,
            borderRadius: token.borderRadiusSM,
            transition: `background-color ${token.motionDurationMid}, color ${token.motionDurationMid}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              color: token.colorIconHover,
              backgroundColor: token.colorBgTextHover
            },
            "&:active": {
              backgroundColor: token.colorBgTextActive
            }
          }, genFocusStyle(token)),
          [`${componentCls}-cover`]: {
            textAlign: "center",
            padding: `${unit(token.calc(padding).add(closeBtnSize).add(paddingXS).equal())} ${unit(padding)} 0`,
            img: {
              width: "100%"
            }
          },
          [`${componentCls}-header`]: {
            padding: `${unit(padding)} ${unit(padding)} ${unit(paddingXS)}`,
            width: `calc(100% - ${unit(closeBtnSize)})`,
            wordBreak: "break-word",
            [`${componentCls}-title`]: {
              fontWeight: fontWeightStrong
            }
          },
          [`${componentCls}-description`]: {
            padding: `0 ${unit(padding)}`,
            wordWrap: "break-word"
          },
          [`${componentCls}-footer`]: {
            padding: `${unit(paddingXS)} ${unit(padding)} ${unit(padding)}`,
            textAlign: "end",
            borderRadius: `0 0 ${unit(borderRadiusXS)} ${unit(borderRadiusXS)}`,
            display: "flex",
            [`${componentCls}-indicators`]: {
              display: "inline-block",
              [`${componentCls}-indicator`]: {
                width: indicatorWidth,
                height: indicatorHeight,
                display: "inline-block",
                borderRadius: "50%",
                background: colorFill,
                "&:not(:last-child)": {
                  marginInlineEnd: indicatorHeight
                },
                "&-active": {
                  background: colorPrimary
                }
              }
            },
            [`${componentCls}-buttons`]: {
              marginInlineStart: "auto",
              [`${antCls}-btn`]: {
                marginInlineStart: marginXS
              }
            }
          }
        },
        // =============================  primary type  ===========================
        // `$` for panel, `&$` for pure panel
        [`${componentCls}-primary, &${componentCls}-primary`]: {
          "--antd-arrow-background-color": colorPrimary,
          [`${componentCls}-inner`]: {
            color: colorTextLightSolid,
            textAlign: "start",
            textDecoration: "none",
            backgroundColor: colorPrimary,
            borderRadius,
            boxShadow: boxShadowTertiary,
            [`${componentCls}-close`]: {
              color: colorTextLightSolid
            },
            [`${componentCls}-indicators`]: {
              [`${componentCls}-indicator`]: {
                background: primaryPrevBtnBg,
                "&-active": {
                  background: colorTextLightSolid
                }
              }
            },
            [`${componentCls}-prev-btn`]: {
              color: colorTextLightSolid,
              borderColor: primaryPrevBtnBg,
              backgroundColor: colorPrimary,
              "&:hover": {
                backgroundColor: primaryPrevBtnBg,
                borderColor: "transparent"
              }
            },
            [`${componentCls}-next-btn`]: {
              color: colorPrimary,
              borderColor: "transparent",
              background: colorWhite,
              "&:hover": {
                background: primaryNextBtnHoverBg
              }
            }
          }
        }
      }),
      // ============================= mask ===========================
      [`${componentCls}-mask`]: {
        [`${componentCls}-placeholder-animated`]: {
          transition: `all ${motionDurationSlow}`
        }
      },
      // =========== Limit left and right placement radius ==============
      [["&-placement-left", "&-placement-leftTop", "&-placement-leftBottom", "&-placement-right", "&-placement-rightTop", "&-placement-rightBottom"].join(",")]: {
        [`${componentCls}-inner`]: {
          borderRadius: token.min(tourBorderRadius, MAX_VERTICAL_CONTENT_RADIUS)
        }
      }
    },
    // ============================= Arrow ===========================
    getArrowStyle(token, "var(--antd-arrow-background-color)")
  ];
};
const prepareComponentToken$2 = (token) => Object.assign(Object.assign({
  zIndexPopup: token.zIndexPopupBase + 70,
  closeBtnSize: token.fontSize * token.lineHeight,
  primaryPrevBtnBg: new FastColor(token.colorTextLightSolid).setA(0.15).toRgbString(),
  primaryNextBtnHoverBg: new FastColor(token.colorBgTextHover).onBackground(token.colorWhite).toRgbString()
}, getArrowOffsetToken({
  contentRadius: token.borderRadiusLG,
  limitVerticalRadius: true
})), getArrowToken(token));
const useStyle$2 = genStyleHooks("Tour", (token) => {
  const {
    borderRadiusLG
  } = token;
  const TourToken = merge(token, {
    indicatorWidth: 6,
    indicatorHeight: 6,
    tourBorderRadius: borderRadiusLG
  });
  return genBaseStyle$1(TourToken);
}, prepareComponentToken$2);
var __rest$8 = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const PurePanel$1 = (props) => {
  const {
    prefixCls: customizePrefixCls,
    current = 0,
    total = 6,
    className,
    style,
    type,
    closable,
    closeIcon
  } = props, restProps = __rest$8(props, ["prefixCls", "current", "total", "className", "style", "type", "closable", "closeIcon"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("tour", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$2(prefixCls);
  const [mergedClosable, mergedCloseIcon] = useClosable$1({
    closable,
    closeIcon
  }, null, {
    closable: true,
    closeIconRender: (icon) => {
      var _a;
      return /* @__PURE__ */ reactExports.isValidElement(icon) ? cloneElement(icon, {
        className: classNames((_a = icon.props) === null || _a === void 0 ? void 0 : _a.className, `${prefixCls}-close-icon`)
      }) : icon;
    }
  });
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(RawPurePanel, {
    prefixCls,
    hashId,
    className: classNames(className, `${prefixCls}-pure`, type && `${prefixCls}-${type}`, cssVarCls),
    style
  }, /* @__PURE__ */ reactExports.createElement(TourPanel, {
    stepProps: Object.assign(Object.assign({}, restProps), {
      prefixCls,
      total,
      closable: mergedClosable ? {
        closeIcon: mergedCloseIcon
      } : void 0
    }),
    current,
    type
  })));
};
const PurePanel$2 = withPureRenderTheme(PurePanel$1);
var __rest$7 = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Tour2 = (props) => {
  const {
    prefixCls: customizePrefixCls,
    type,
    rootClassName,
    indicatorsRender,
    actionsRender,
    steps,
    closeIcon
  } = props, restProps = __rest$7(props, ["prefixCls", "type", "rootClassName", "indicatorsRender", "actionsRender", "steps", "closeIcon"]);
  const {
    getPrefixCls,
    direction,
    tour
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("tour", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$2(prefixCls);
  const [, token] = useToken$1();
  const mergedSteps = React.useMemo(() => steps === null || steps === void 0 ? void 0 : steps.map((step) => {
    var _a;
    return Object.assign(Object.assign({}, step), {
      className: classNames(step.className, {
        [`${prefixCls}-primary`]: ((_a = step.type) !== null && _a !== void 0 ? _a : type) === "primary"
      })
    });
  }), [prefixCls, steps, type]);
  const builtinPlacements = (config) => {
    var _a;
    return getPlacements$1({
      arrowPointAtCenter: (_a = config === null || config === void 0 ? void 0 : config.arrowPointAtCenter) !== null && _a !== void 0 ? _a : true,
      autoAdjustOverflow: true,
      offset: token.marginXXS,
      arrowWidth: token.sizePopupArrow,
      borderRadius: token.borderRadius
    });
  };
  const customClassName = classNames({
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, hashId, cssVarCls, rootClassName);
  const mergedRenderPanel = (stepProps, stepCurrent) => /* @__PURE__ */ React.createElement(TourPanel, {
    type,
    stepProps,
    current: stepCurrent,
    indicatorsRender,
    actionsRender
  });
  const [zIndex, contextZIndex] = useZIndex("Tour", restProps.zIndex);
  return wrapCSSVar(/* @__PURE__ */ React.createElement(zIndexContext.Provider, {
    value: contextZIndex
  }, /* @__PURE__ */ React.createElement(Tour$1, Object.assign({}, restProps, {
    closeIcon: closeIcon !== null && closeIcon !== void 0 ? closeIcon : tour === null || tour === void 0 ? void 0 : tour.closeIcon,
    zIndex,
    rootClassName: customClassName,
    prefixCls,
    animated: true,
    renderPanel: mergedRenderPanel,
    builtinPlacements,
    steps: mergedSteps
  }))));
};
Tour2._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$2;
const groupKeysMap = (keys) => {
  const map = /* @__PURE__ */ new Map();
  keys.forEach((key, index2) => {
    map.set(key, index2);
  });
  return map;
};
const groupDisabledKeysMap = (dataSource) => {
  const map = /* @__PURE__ */ new Map();
  dataSource.forEach(({
    disabled,
    key
  }, index2) => {
    if (disabled) {
      map.set(key, index2);
    }
  });
  return map;
};
const useData = (dataSource, rowKey, targetKeys) => {
  const mergedDataSource = reactExports.useMemo(() => (dataSource || []).map((record) => {
    if (rowKey) {
      return Object.assign(Object.assign({}, record), {
        key: rowKey(record)
      });
    }
    return record;
  }), [dataSource, rowKey]);
  const [leftDataSource, rightDataSource] = reactExports.useMemo(() => {
    var _a;
    const leftData = [];
    const rightData = Array.from({
      length: (_a = targetKeys === null || targetKeys === void 0 ? void 0 : targetKeys.length) !== null && _a !== void 0 ? _a : 0
    });
    const targetKeysMap = groupKeysMap(targetKeys || []);
    mergedDataSource.forEach((record) => {
      if (targetKeysMap.has(record.key)) {
        const idx = targetKeysMap.get(record.key);
        rightData[idx] = record;
      } else {
        leftData.push(record);
      }
    });
    return [leftData, rightData];
  }, [mergedDataSource, targetKeys]);
  return [mergedDataSource, leftDataSource.filter(Boolean), rightDataSource.filter(Boolean)];
};
const EMPTY_KEYS = [];
function filterKeys(keys, dataKeys) {
  const filteredKeys = keys.filter((key) => dataKeys.has(key));
  return keys.length === filteredKeys.length ? keys : filteredKeys;
}
function flattenKeys(keys) {
  return Array.from(keys).join(";");
}
function useSelection(leftDataSource, rightDataSource, selectedKeys) {
  const [leftKeys, rightKeys] = reactExports.useMemo(() => [new Set(leftDataSource.map((src) => src === null || src === void 0 ? void 0 : src.key)), new Set(rightDataSource.map((src) => src === null || src === void 0 ? void 0 : src.key))], [leftDataSource, rightDataSource]);
  const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState(EMPTY_KEYS, {
    value: selectedKeys
  });
  const sourceSelectedKeys = reactExports.useMemo(() => filterKeys(mergedSelectedKeys, leftKeys), [mergedSelectedKeys, leftKeys]);
  const targetSelectedKeys = reactExports.useMemo(() => filterKeys(mergedSelectedKeys, rightKeys), [mergedSelectedKeys, rightKeys]);
  reactExports.useEffect(() => {
    setMergedSelectedKeys([].concat(_toConsumableArray(filterKeys(mergedSelectedKeys, leftKeys)), _toConsumableArray(filterKeys(mergedSelectedKeys, rightKeys))));
  }, [flattenKeys(leftKeys), flattenKeys(rightKeys)]);
  const setSourceSelectedKeys = useEvent((nextSrcKeys) => {
    setMergedSelectedKeys([].concat(_toConsumableArray(nextSrcKeys), _toConsumableArray(targetSelectedKeys)));
  });
  const setTargetSelectedKeys = useEvent((nextTargetKeys) => {
    setMergedSelectedKeys([].concat(_toConsumableArray(sourceSelectedKeys), _toConsumableArray(nextTargetKeys)));
  });
  return [
    // Keys
    sourceSelectedKeys,
    targetSelectedKeys,
    // Updater
    setSourceSelectedKeys,
    setTargetSelectedKeys
  ];
}
const ListItem = (props) => {
  const {
    renderedText,
    renderedEl,
    item,
    checked,
    disabled,
    prefixCls,
    onClick,
    onRemove,
    showRemove
  } = props;
  const className = classNames(`${prefixCls}-content-item`, {
    [`${prefixCls}-content-item-disabled`]: disabled || item.disabled,
    [`${prefixCls}-content-item-checked`]: checked && !item.disabled
  });
  let title;
  if (typeof renderedText === "string" || typeof renderedText === "number") {
    title = String(renderedText);
  }
  const [contextLocale] = useLocale("Transfer", localeValues.Transfer);
  const liProps = {
    className,
    title
  };
  const labelNode = /* @__PURE__ */ reactExports.createElement("span", {
    className: `${prefixCls}-content-item-text`
  }, renderedEl);
  if (showRemove) {
    return /* @__PURE__ */ reactExports.createElement("li", Object.assign({}, liProps), labelNode, /* @__PURE__ */ reactExports.createElement("button", {
      type: "button",
      disabled: disabled || item.disabled,
      className: `${prefixCls}-content-item-remove`,
      "aria-label": contextLocale === null || contextLocale === void 0 ? void 0 : contextLocale.remove,
      onClick: () => onRemove === null || onRemove === void 0 ? void 0 : onRemove(item)
    }, /* @__PURE__ */ reactExports.createElement(RefIcon$o, null)));
  }
  liProps.onClick = disabled || item.disabled ? void 0 : (event) => onClick(item, event);
  return /* @__PURE__ */ reactExports.createElement("li", Object.assign({}, liProps), /* @__PURE__ */ reactExports.createElement(Checkbox$1, {
    className: `${prefixCls}-checkbox`,
    checked,
    disabled: disabled || item.disabled
  }), labelNode);
};
const ListItem$1 = /* @__PURE__ */ reactExports.memo(ListItem);
const OmitProps = ["handleFilter", "handleClear", "checkedKeys"];
const parsePagination = (pagination) => {
  const defaultPagination = {
    simple: true,
    showSizeChanger: false,
    showLessItems: false
  };
  return Object.assign(Object.assign({}, defaultPagination), pagination);
};
const TransferListBody = (props, ref) => {
  const {
    prefixCls,
    filteredRenderItems,
    selectedKeys,
    disabled: globalDisabled,
    showRemove,
    pagination,
    onScroll,
    onItemSelect,
    onItemRemove
  } = props;
  const [current, setCurrent] = reactExports.useState(1);
  const mergedPagination = reactExports.useMemo(() => {
    if (!pagination) {
      return null;
    }
    const convertPagination = typeof pagination === "object" ? pagination : {};
    return parsePagination(convertPagination);
  }, [pagination]);
  const [pageSize, setPageSize] = useMergedState(10, {
    value: mergedPagination === null || mergedPagination === void 0 ? void 0 : mergedPagination.pageSize
  });
  reactExports.useEffect(() => {
    if (mergedPagination) {
      const maxPageCount = Math.ceil(filteredRenderItems.length / pageSize);
      setCurrent(Math.min(current, maxPageCount));
    }
  }, [filteredRenderItems, mergedPagination, pageSize]);
  const onInternalClick = (item, e2) => {
    onItemSelect(item.key, !selectedKeys.includes(item.key), e2);
  };
  const onRemove = (item) => {
    onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove([item.key]);
  };
  const onPageChange = (cur) => {
    setCurrent(cur);
  };
  const onSizeChange = (cur, size) => {
    setCurrent(cur);
    setPageSize(size);
  };
  const memoizedItems = reactExports.useMemo(() => {
    const displayItems = mergedPagination ? filteredRenderItems.slice((current - 1) * pageSize, current * pageSize) : filteredRenderItems;
    return displayItems;
  }, [current, filteredRenderItems, mergedPagination, pageSize]);
  reactExports.useImperativeHandle(ref, () => ({
    items: memoizedItems
  }));
  const paginationNode = mergedPagination ? /* @__PURE__ */ reactExports.createElement(Pagination, {
    size: "small",
    disabled: globalDisabled,
    simple: mergedPagination.simple,
    pageSize,
    showLessItems: mergedPagination.showLessItems,
    showSizeChanger: mergedPagination.showSizeChanger,
    className: `${prefixCls}-pagination`,
    total: filteredRenderItems.length,
    current,
    onChange: onPageChange,
    onShowSizeChange: onSizeChange
  }) : null;
  const cls = classNames(`${prefixCls}-content`, {
    [`${prefixCls}-content-show-remove`]: showRemove
  });
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("ul", {
    className: cls,
    onScroll
  }, (memoizedItems || []).map(({
    renderedEl,
    renderedText,
    item
  }) => /* @__PURE__ */ reactExports.createElement(ListItem$1, {
    key: item.key,
    item,
    renderedText,
    renderedEl,
    prefixCls,
    showRemove,
    onClick: onInternalClick,
    onRemove,
    checked: selectedKeys.includes(item.key),
    disabled: globalDisabled || item.disabled
  }))), paginationNode);
};
const DefaultListBody = /* @__PURE__ */ reactExports.forwardRef(TransferListBody);
const Search = (props) => {
  const {
    placeholder = "",
    value,
    prefixCls,
    disabled,
    onChange,
    handleClear
  } = props;
  const handleChange = reactExports.useCallback((e2) => {
    onChange === null || onChange === void 0 ? void 0 : onChange(e2);
    if (e2.target.value === "") {
      handleClear === null || handleClear === void 0 ? void 0 : handleClear();
    }
  }, [onChange]);
  return /* @__PURE__ */ reactExports.createElement(Input, {
    placeholder,
    className: prefixCls,
    value,
    onChange: handleChange,
    disabled,
    allowClear: true,
    prefix: /* @__PURE__ */ reactExports.createElement(RefIcon$p, null)
  });
};
const defaultRender2 = () => null;
function isRenderResultPlainObject(result) {
  return !!(result && !/* @__PURE__ */ React.isValidElement(result) && Object.prototype.toString.call(result) === "[object Object]");
}
function getEnabledItemKeys(items) {
  return items.filter((data) => !data.disabled).map((data) => data.key);
}
const isValidIcon = (icon) => icon !== void 0;
const getShowSearchOption = (showSearch) => {
  if (showSearch && typeof showSearch === "object") {
    return Object.assign(Object.assign({}, showSearch), {
      defaultValue: showSearch.defaultValue || ""
    });
  }
  return {
    defaultValue: "",
    placeholder: ""
  };
};
const TransferList = (props) => {
  const {
    prefixCls,
    dataSource = [],
    titleText = "",
    checkedKeys,
    disabled,
    showSearch = false,
    style,
    searchPlaceholder,
    notFoundContent,
    selectAll,
    deselectAll,
    selectCurrent,
    selectInvert,
    removeAll,
    removeCurrent,
    showSelectAll = true,
    showRemove,
    pagination,
    direction,
    itemsUnit,
    itemUnit,
    selectAllLabel,
    selectionsIcon,
    footer,
    renderList,
    onItemSelectAll,
    onItemRemove,
    handleFilter,
    handleClear,
    filterOption: filterOption2,
    render = defaultRender2
  } = props;
  const searchOptions = getShowSearchOption(showSearch);
  const [filterValue, setFilterValue] = reactExports.useState(searchOptions.defaultValue);
  const listBodyRef = reactExports.useRef({});
  const internalHandleFilter = (e2) => {
    setFilterValue(e2.target.value);
    handleFilter(e2);
  };
  const internalHandleClear = () => {
    setFilterValue("");
    handleClear();
  };
  const matchFilter = (text, item) => {
    if (typeof filterOption2 === "function") {
      return filterOption2(filterValue, item, direction);
    }
    return text.includes(filterValue);
  };
  const customRenderListBody = (listProps) => {
    let bodyContent = renderList ? renderList(Object.assign(Object.assign({}, listProps), {
      onItemSelect: (key, check) => listProps.onItemSelect(key, check)
    })) : null;
    const customize = !!bodyContent;
    if (!customize) {
      bodyContent = /* @__PURE__ */ React.createElement(DefaultListBody, Object.assign({
        ref: listBodyRef
      }, listProps));
    }
    return {
      customize,
      bodyContent
    };
  };
  const renderItem2 = (item) => {
    const renderResult = render(item);
    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
    return {
      item,
      renderedEl: isRenderResultPlain ? renderResult.label : renderResult,
      renderedText: isRenderResultPlain ? renderResult.value : renderResult
    };
  };
  const notFoundContentEle = reactExports.useMemo(() => Array.isArray(notFoundContent) ? notFoundContent[direction === "left" ? 0 : 1] : notFoundContent, [notFoundContent, direction]);
  const [filteredItems, filteredRenderItems] = reactExports.useMemo(() => {
    const filterItems = [];
    const filterRenderItems = [];
    dataSource.forEach((item) => {
      const renderedItem = renderItem2(item);
      if (filterValue && !matchFilter(renderedItem.renderedText, item)) {
        return;
      }
      filterItems.push(item);
      filterRenderItems.push(renderedItem);
    });
    return [filterItems, filterRenderItems];
  }, [dataSource, filterValue]);
  const checkedActiveItems = reactExports.useMemo(() => {
    return filteredItems.filter((item) => checkedKeys.includes(item.key) && !item.disabled);
  }, [checkedKeys, filteredItems]);
  const checkStatus = reactExports.useMemo(() => {
    if (checkedActiveItems.length === 0) {
      return "none";
    }
    const checkedKeysMap = groupKeysMap(checkedKeys);
    if (filteredItems.every((item) => checkedKeysMap.has(item.key) || !!item.disabled)) {
      return "all";
    }
    return "part";
  }, [checkedActiveItems.length, checkedKeys, filteredItems]);
  const renderListBody = () => {
    const search = showSearch ? /* @__PURE__ */ React.createElement("div", {
      className: `${prefixCls}-body-search-wrapper`
    }, /* @__PURE__ */ React.createElement(Search, {
      prefixCls: `${prefixCls}-search`,
      onChange: internalHandleFilter,
      handleClear: internalHandleClear,
      placeholder: searchOptions.placeholder || searchPlaceholder,
      value: filterValue,
      disabled
    })) : null;
    const {
      customize,
      bodyContent
    } = customRenderListBody(Object.assign(Object.assign({}, omit(props, OmitProps)), {
      filteredItems,
      filteredRenderItems,
      selectedKeys: checkedKeys
    }));
    let bodyNode;
    if (customize) {
      bodyNode = /* @__PURE__ */ React.createElement("div", {
        className: `${prefixCls}-body-customize-wrapper`
      }, bodyContent);
    } else {
      bodyNode = filteredItems.length ? bodyContent : /* @__PURE__ */ React.createElement("div", {
        className: `${prefixCls}-body-not-found`
      }, notFoundContentEle);
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: classNames(`${prefixCls}-body`, {
        [`${prefixCls}-body-with-search`]: showSearch
      })
    }, search, bodyNode);
  };
  const checkBox = /* @__PURE__ */ React.createElement(Checkbox$1, {
    disabled: dataSource.filter((d) => !d.disabled).length === 0 || disabled,
    checked: checkStatus === "all",
    indeterminate: checkStatus === "part",
    className: `${prefixCls}-checkbox`,
    onChange: () => {
      onItemSelectAll === null || onItemSelectAll === void 0 ? void 0 : onItemSelectAll(filteredItems.filter((item) => !item.disabled).map(({
        key
      }) => key), checkStatus !== "all");
    }
  });
  const getSelectAllLabel = (selectedCount, totalCount) => {
    if (selectAllLabel) {
      return typeof selectAllLabel === "function" ? selectAllLabel({
        selectedCount,
        totalCount
      }) : selectAllLabel;
    }
    const unit2 = totalCount > 1 ? itemsUnit : itemUnit;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, (selectedCount > 0 ? `${selectedCount}/` : "") + totalCount, " ", unit2);
  };
  const footerDom = footer && (footer.length < 2 ? footer(props) : footer(props, {
    direction
  }));
  const listCls = classNames(prefixCls, {
    [`${prefixCls}-with-pagination`]: !!pagination,
    [`${prefixCls}-with-footer`]: !!footerDom
  });
  const listFooter = footerDom ? /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-footer`
  }, footerDom) : null;
  const checkAllCheckbox = !showRemove && !pagination && checkBox;
  let items;
  if (showRemove) {
    items = [
      /* Remove Current Page */
      pagination ? {
        key: "removeCurrent",
        label: removeCurrent,
        onClick() {
          var _a;
          const pageKeys = getEnabledItemKeys((((_a = listBodyRef.current) === null || _a === void 0 ? void 0 : _a.items) || []).map((entity) => entity.item));
          onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove(pageKeys);
        }
      } : null,
      /* Remove All */
      {
        key: "removeAll",
        label: removeAll,
        onClick() {
          onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove(getEnabledItemKeys(filteredItems));
        }
      }
    ].filter(Boolean);
  } else {
    items = [{
      key: "selectAll",
      label: checkStatus === "all" ? deselectAll : selectAll,
      onClick() {
        const keys = getEnabledItemKeys(filteredItems);
        onItemSelectAll === null || onItemSelectAll === void 0 ? void 0 : onItemSelectAll(keys, keys.length !== checkedKeys.length);
      }
    }, pagination ? {
      key: "selectCurrent",
      label: selectCurrent,
      onClick() {
        var _a;
        const pageItems = ((_a = listBodyRef.current) === null || _a === void 0 ? void 0 : _a.items) || [];
        onItemSelectAll === null || onItemSelectAll === void 0 ? void 0 : onItemSelectAll(getEnabledItemKeys(pageItems.map((entity) => entity.item)), true);
      }
    } : null, {
      key: "selectInvert",
      label: selectInvert,
      onClick() {
        var _a;
        const availablePageItemKeys = getEnabledItemKeys((((_a = listBodyRef.current) === null || _a === void 0 ? void 0 : _a.items) || []).map((entity) => entity.item));
        const checkedKeySet = new Set(checkedKeys);
        const newCheckedKeysSet = new Set(checkedKeySet);
        availablePageItemKeys.forEach((key) => {
          if (checkedKeySet.has(key)) {
            newCheckedKeysSet.delete(key);
          } else {
            newCheckedKeysSet.add(key);
          }
        });
        onItemSelectAll === null || onItemSelectAll === void 0 ? void 0 : onItemSelectAll(Array.from(newCheckedKeysSet), "replace");
      }
    }];
  }
  const dropdown = /* @__PURE__ */ React.createElement(Dropdown$1, {
    className: `${prefixCls}-header-dropdown`,
    menu: {
      items
    },
    disabled
  }, isValidIcon(selectionsIcon) ? selectionsIcon : /* @__PURE__ */ React.createElement(RefIcon$d, null));
  return /* @__PURE__ */ React.createElement("div", {
    className: listCls,
    style
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${prefixCls}-header`
  }, showSelectAll ? /* @__PURE__ */ React.createElement(React.Fragment, null, checkAllCheckbox, dropdown) : null, /* @__PURE__ */ React.createElement("span", {
    className: `${prefixCls}-header-selected`
  }, getSelectAllLabel(checkedActiveItems.length, filteredItems.length)), /* @__PURE__ */ React.createElement("span", {
    className: `${prefixCls}-header-title`
  }, titleText)), renderListBody(), listFooter);
};
const Operation = (props) => {
  const {
    disabled,
    moveToLeft,
    moveToRight,
    leftArrowText = "",
    rightArrowText = "",
    leftActive,
    rightActive,
    className,
    style,
    direction,
    oneWay
  } = props;
  return /* @__PURE__ */ reactExports.createElement("div", {
    className,
    style
  }, /* @__PURE__ */ reactExports.createElement(Button$1, {
    type: "primary",
    size: "small",
    disabled: disabled || !rightActive,
    onClick: moveToRight,
    icon: direction !== "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$g, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$f, null)
  }, rightArrowText), !oneWay && /* @__PURE__ */ reactExports.createElement(Button$1, {
    type: "primary",
    size: "small",
    disabled: disabled || !leftActive,
    onClick: moveToLeft,
    icon: direction !== "rtl" ? /* @__PURE__ */ reactExports.createElement(RefIcon$f, null) : /* @__PURE__ */ reactExports.createElement(RefIcon$g, null)
  }, leftArrowText));
};
const genTransferCustomizeStyle = (token) => {
  const {
    antCls,
    componentCls,
    listHeight,
    controlHeightLG
  } = token;
  const tableCls = `${antCls}-table`;
  const inputCls = `${antCls}-input`;
  return {
    [`${componentCls}-customize-list`]: {
      [`${componentCls}-list`]: {
        flex: "1 1 50%",
        width: "auto",
        height: "auto",
        minHeight: listHeight,
        minWidth: 0
      },
      // =================== Hook Components ===================
      [`${tableCls}-wrapper`]: {
        [`${tableCls}-small`]: {
          border: 0,
          borderRadius: 0,
          [`${tableCls}-selection-column`]: {
            width: controlHeightLG,
            minWidth: controlHeightLG
          }
        },
        [`${tableCls}-pagination${tableCls}-pagination`]: {
          margin: 0,
          padding: token.paddingXS
        }
      },
      [`${inputCls}[disabled]`]: {
        backgroundColor: "transparent"
      }
    }
  };
};
const genTransferStatusColor = (token, color) => {
  const {
    componentCls,
    colorBorder
  } = token;
  return {
    [`${componentCls}-list`]: {
      borderColor: color,
      "&-search:not([disabled])": {
        borderColor: colorBorder
      }
    }
  };
};
const genTransferStatusStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-status-error`]: Object.assign({}, genTransferStatusColor(token, token.colorError)),
    [`${componentCls}-status-warning`]: Object.assign({}, genTransferStatusColor(token, token.colorWarning))
  };
};
const genTransferListStyle = (token) => {
  const {
    componentCls,
    colorBorder,
    colorSplit,
    lineWidth,
    itemHeight,
    headerHeight,
    transferHeaderVerticalPadding,
    itemPaddingBlock,
    controlItemBgActive,
    colorTextDisabled,
    colorTextSecondary,
    listHeight,
    listWidth,
    listWidthLG,
    fontSizeIcon,
    marginXS,
    paddingSM,
    lineType,
    antCls,
    iconCls,
    motionDurationSlow,
    controlItemBgHover,
    borderRadiusLG,
    colorBgContainer,
    colorText,
    controlItemBgActiveHover
  } = token;
  const contentBorderRadius = unit(token.calc(borderRadiusLG).sub(lineWidth).equal());
  return {
    display: "flex",
    flexDirection: "column",
    width: listWidth,
    height: listHeight,
    border: `${unit(lineWidth)} ${lineType} ${colorBorder}`,
    borderRadius: token.borderRadiusLG,
    "&-with-pagination": {
      width: listWidthLG,
      height: "auto"
    },
    "&-search": {
      [`${iconCls}-search`]: {
        color: colorTextDisabled
      }
    },
    "&-header": {
      display: "flex",
      flex: "none",
      alignItems: "center",
      height: headerHeight,
      // border-top is on the transfer dom. We should minus 1px for this
      padding: `${unit(token.calc(transferHeaderVerticalPadding).sub(lineWidth).equal())} ${unit(paddingSM)} ${unit(transferHeaderVerticalPadding)}`,
      color: colorText,
      background: colorBgContainer,
      borderBottom: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
      borderRadius: `${unit(borderRadiusLG)} ${unit(borderRadiusLG)} 0 0`,
      "> *:not(:last-child)": {
        marginInlineEnd: 4
        // This is magic and fixed number, DO NOT use token since it may change.
      },
      "> *": {
        flex: "none"
      },
      "&-title": Object.assign(Object.assign({}, textEllipsis), {
        flex: "auto",
        textAlign: "end"
      }),
      "&-dropdown": Object.assign(Object.assign({}, resetIcon()), {
        fontSize: fontSizeIcon,
        transform: "translateY(10%)",
        cursor: "pointer",
        "&[disabled]": {
          cursor: "not-allowed"
        }
      })
    },
    "&-body": {
      display: "flex",
      flex: "auto",
      flexDirection: "column",
      fontSize: token.fontSize,
      // https://blog.csdn.net/qq449245884/article/details/107373672/
      minHeight: 0,
      "&-search-wrapper": {
        position: "relative",
        flex: "none",
        padding: paddingSM
      }
    },
    "&-content": {
      flex: "auto",
      margin: 0,
      padding: 0,
      overflow: "auto",
      listStyle: "none",
      borderRadius: `0 0 ${contentBorderRadius} ${contentBorderRadius}`,
      "&-item": {
        display: "flex",
        alignItems: "center",
        minHeight: itemHeight,
        padding: `${unit(itemPaddingBlock)} ${unit(paddingSM)}`,
        transition: `all ${motionDurationSlow}`,
        "> *:not(:last-child)": {
          marginInlineEnd: marginXS
        },
        "> *": {
          flex: "none"
        },
        "&-text": Object.assign(Object.assign({}, textEllipsis), {
          flex: "auto"
        }),
        "&-remove": Object.assign(Object.assign({}, operationUnit(token)), {
          color: colorBorder,
          "&:hover, &:focus": {
            color: colorTextSecondary
          }
        }),
        [`&:not(${componentCls}-list-content-item-disabled)`]: {
          "&:hover": {
            backgroundColor: controlItemBgHover,
            cursor: "pointer"
          },
          [`&${componentCls}-list-content-item-checked:hover`]: {
            backgroundColor: controlItemBgActiveHover
          }
        },
        "&-checked": {
          backgroundColor: controlItemBgActive
        },
        "&-disabled": {
          color: colorTextDisabled,
          cursor: "not-allowed"
        }
      },
      // Do not change hover style when `oneWay` mode
      [`&-show-remove ${componentCls}-list-content-item:not(${componentCls}-list-content-item-disabled):hover`]: {
        background: "transparent",
        cursor: "default"
      }
    },
    "&-pagination": {
      padding: token.paddingXS,
      textAlign: "end",
      borderTop: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
      [`${antCls}-pagination-options`]: {
        paddingInlineEnd: token.paddingXS
      }
    },
    "&-body-not-found": {
      flex: "none",
      width: "100%",
      margin: "auto 0",
      color: colorTextDisabled,
      textAlign: "center"
    },
    "&-footer": {
      borderTop: `${unit(lineWidth)} ${lineType} ${colorSplit}`
    },
    // fix: https://github.com/ant-design/ant-design/issues/44489
    "&-checkbox": {
      lineHeight: 1
    }
  };
};
const genTransferStyle = (token) => {
  const {
    antCls,
    iconCls,
    componentCls,
    marginXS,
    marginXXS,
    fontSizeIcon,
    colorBgContainerDisabled
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      position: "relative",
      display: "flex",
      alignItems: "stretch",
      [`${componentCls}-disabled`]: {
        [`${componentCls}-list`]: {
          background: colorBgContainerDisabled
        }
      },
      [`${componentCls}-list`]: genTransferListStyle(token),
      [`${componentCls}-operation`]: {
        display: "flex",
        flex: "none",
        flexDirection: "column",
        alignSelf: "center",
        margin: `0 ${unit(marginXS)}`,
        verticalAlign: "middle",
        gap: marginXXS,
        [`${antCls}-btn ${iconCls}`]: {
          fontSize: fontSizeIcon
        }
      }
    })
  };
};
const genTransferRTLStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-rtl`]: {
      direction: "rtl"
    }
  };
};
const prepareComponentToken$1 = (token) => {
  const {
    fontSize,
    lineHeight,
    controlHeight,
    controlHeightLG,
    lineWidth
  } = token;
  const fontHeight = Math.round(fontSize * lineHeight);
  return {
    listWidth: 180,
    listHeight: 200,
    listWidthLG: 250,
    headerHeight: controlHeightLG,
    itemHeight: controlHeight,
    itemPaddingBlock: (controlHeight - fontHeight) / 2,
    transferHeaderVerticalPadding: Math.ceil((controlHeightLG - lineWidth - fontHeight) / 2)
  };
};
const useStyle$1 = genStyleHooks("Transfer", (token) => {
  const transferToken = merge(token);
  return [genTransferStyle(transferToken), genTransferCustomizeStyle(transferToken), genTransferStatusStyle(transferToken), genTransferRTLStyle(transferToken)];
}, prepareComponentToken$1);
const Transfer = (props) => {
  const {
    dataSource,
    targetKeys = [],
    selectedKeys,
    selectAllLabels = [],
    operations = [],
    style = {},
    listStyle = {},
    locale: locale2 = {},
    titles,
    disabled,
    showSearch = false,
    operationStyle,
    showSelectAll,
    oneWay,
    pagination,
    status: customStatus,
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    selectionsIcon,
    filterOption: filterOption2,
    render,
    footer,
    children,
    rowKey,
    onScroll,
    onChange,
    onSearch,
    onSelectChange
  } = props;
  const {
    getPrefixCls,
    renderEmpty,
    direction: dir,
    transfer
  } = reactExports.useContext(ConfigContext);
  const contextDisabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = disabled !== null && disabled !== void 0 ? disabled : contextDisabled;
  const prefixCls = getPrefixCls("transfer", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$1(prefixCls);
  const [mergedDataSource, leftDataSource, rightDataSource] = useData(dataSource, rowKey, targetKeys);
  const [
    // Keys
    sourceSelectedKeys,
    targetSelectedKeys,
    // Setters
    setSourceSelectedKeys,
    setTargetSelectedKeys
  ] = useSelection(leftDataSource, rightDataSource, selectedKeys);
  const [leftMultipleSelect, updateLeftPrevSelectedIndex] = useMultipleSelect((item) => item.key);
  const [rightMultipleSelect, updateRightPrevSelectedIndex] = useMultipleSelect((item) => item.key);
  const setStateKeys = reactExports.useCallback((direction, keys) => {
    if (direction === "left") {
      const nextKeys = typeof keys === "function" ? keys(sourceSelectedKeys || []) : keys;
      setSourceSelectedKeys(nextKeys);
    } else {
      const nextKeys = typeof keys === "function" ? keys(targetSelectedKeys || []) : keys;
      setTargetSelectedKeys(nextKeys);
    }
  }, [sourceSelectedKeys, targetSelectedKeys]);
  const setPrevSelectedIndex = (direction, value) => {
    const isLeftDirection = direction === "left";
    const updatePrevSelectedIndex = isLeftDirection ? updateLeftPrevSelectedIndex : updateRightPrevSelectedIndex;
    updatePrevSelectedIndex(value);
  };
  const handleSelectChange = reactExports.useCallback((direction, holder) => {
    if (direction === "left") {
      onSelectChange === null || onSelectChange === void 0 ? void 0 : onSelectChange(holder, targetSelectedKeys);
    } else {
      onSelectChange === null || onSelectChange === void 0 ? void 0 : onSelectChange(sourceSelectedKeys, holder);
    }
  }, [sourceSelectedKeys, targetSelectedKeys]);
  const getTitles = (transferLocale) => {
    var _a;
    return (_a = titles !== null && titles !== void 0 ? titles : transferLocale.titles) !== null && _a !== void 0 ? _a : [];
  };
  const handleLeftScroll = (e2) => {
    onScroll === null || onScroll === void 0 ? void 0 : onScroll("left", e2);
  };
  const handleRightScroll = (e2) => {
    onScroll === null || onScroll === void 0 ? void 0 : onScroll("right", e2);
  };
  const moveTo = (direction) => {
    const moveKeys = direction === "right" ? sourceSelectedKeys : targetSelectedKeys;
    const dataSourceDisabledKeysMap = groupDisabledKeysMap(mergedDataSource);
    const newMoveKeys = moveKeys.filter((key) => !dataSourceDisabledKeysMap.has(key));
    const newMoveKeysMap = groupKeysMap(newMoveKeys);
    const newTargetKeys = direction === "right" ? newMoveKeys.concat(targetKeys) : targetKeys.filter((targetKey) => !newMoveKeysMap.has(targetKey));
    const oppositeDirection = direction === "right" ? "left" : "right";
    setStateKeys(oppositeDirection, []);
    handleSelectChange(oppositeDirection, []);
    onChange === null || onChange === void 0 ? void 0 : onChange(newTargetKeys, direction, newMoveKeys);
  };
  const moveToLeft = () => {
    moveTo("left");
    setPrevSelectedIndex("left", null);
  };
  const moveToRight = () => {
    moveTo("right");
    setPrevSelectedIndex("right", null);
  };
  const onItemSelectAll = (direction, keys, checkAll) => {
    setStateKeys(direction, (prevKeys) => {
      let mergedCheckedKeys = [];
      if (checkAll === "replace") {
        mergedCheckedKeys = keys;
      } else if (checkAll) {
        mergedCheckedKeys = Array.from(new Set([].concat(_toConsumableArray(prevKeys), _toConsumableArray(keys))));
      } else {
        const selectedKeysMap = groupKeysMap(keys);
        mergedCheckedKeys = prevKeys.filter((key) => !selectedKeysMap.has(key));
      }
      handleSelectChange(direction, mergedCheckedKeys);
      return mergedCheckedKeys;
    });
    setPrevSelectedIndex(direction, null);
  };
  const onLeftItemSelectAll = (keys, checkAll) => {
    onItemSelectAll("left", keys, checkAll);
  };
  const onRightItemSelectAll = (keys, checkAll) => {
    onItemSelectAll("right", keys, checkAll);
  };
  const leftFilter = (e2) => onSearch === null || onSearch === void 0 ? void 0 : onSearch("left", e2.target.value);
  const rightFilter = (e2) => onSearch === null || onSearch === void 0 ? void 0 : onSearch("right", e2.target.value);
  const handleLeftClear = () => onSearch === null || onSearch === void 0 ? void 0 : onSearch("left", "");
  const handleRightClear = () => onSearch === null || onSearch === void 0 ? void 0 : onSearch("right", "");
  const handleSingleSelect = (direction, holder, selectedKey, checked, currentSelectedIndex) => {
    const isSelected = holder.has(selectedKey);
    if (isSelected) {
      holder.delete(selectedKey);
      setPrevSelectedIndex(direction, null);
    }
    if (checked) {
      holder.add(selectedKey);
      setPrevSelectedIndex(direction, currentSelectedIndex);
    }
  };
  const handleMultipleSelect = (direction, data, holder, currentSelectedIndex) => {
    const isLeftDirection = direction === "left";
    const multipleSelect = isLeftDirection ? leftMultipleSelect : rightMultipleSelect;
    multipleSelect(currentSelectedIndex, data, holder);
  };
  const onItemSelect = (direction, selectedKey, checked, multiple) => {
    const isLeftDirection = direction === "left";
    const holder = _toConsumableArray(isLeftDirection ? sourceSelectedKeys : targetSelectedKeys);
    const holderSet = new Set(holder);
    const data = _toConsumableArray(isLeftDirection ? leftDataSource : rightDataSource).filter((item) => !(item === null || item === void 0 ? void 0 : item.disabled));
    const currentSelectedIndex = data.findIndex((item) => item.key === selectedKey);
    if (multiple && holder.length > 0) {
      handleMultipleSelect(direction, data, holderSet, currentSelectedIndex);
    } else {
      handleSingleSelect(direction, holderSet, selectedKey, checked, currentSelectedIndex);
    }
    const holderArr = Array.from(holderSet);
    handleSelectChange(direction, holderArr);
    if (!props.selectedKeys) {
      setStateKeys(direction, holderArr);
    }
  };
  const onLeftItemSelect = (selectedKey, checked, e2) => {
    onItemSelect("left", selectedKey, checked, e2 === null || e2 === void 0 ? void 0 : e2.shiftKey);
  };
  const onRightItemSelect = (selectedKey, checked, e2) => {
    onItemSelect("right", selectedKey, checked, e2 === null || e2 === void 0 ? void 0 : e2.shiftKey);
  };
  const onRightItemRemove = (keys) => {
    setStateKeys("right", []);
    onChange === null || onChange === void 0 ? void 0 : onChange(targetKeys.filter((key) => !keys.includes(key)), "left", _toConsumableArray(keys));
  };
  const handleListStyle = (direction) => {
    if (typeof listStyle === "function") {
      return listStyle({
        direction
      });
    }
    return listStyle || {};
  };
  const formItemContext = reactExports.useContext(FormItemInputContext);
  const {
    hasFeedback,
    status
  } = formItemContext;
  const getLocale = (transferLocale) => Object.assign(Object.assign(Object.assign({}, transferLocale), {
    notFoundContent: (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty("Transfer")) || /* @__PURE__ */ React.createElement(DefaultRenderEmpty, {
      componentName: "Transfer"
    })
  }), locale2);
  const mergedStatus = getMergedStatus(status, customStatus);
  const mergedPagination = !children && pagination;
  const leftActive = rightDataSource.filter((d) => targetSelectedKeys.includes(d.key) && !d.disabled).length > 0;
  const rightActive = leftDataSource.filter((d) => sourceSelectedKeys.includes(d.key) && !d.disabled).length > 0;
  const cls = classNames(prefixCls, {
    [`${prefixCls}-disabled`]: mergedDisabled,
    [`${prefixCls}-customize-list`]: !!children,
    [`${prefixCls}-rtl`]: dir === "rtl"
  }, getStatusClassNames(prefixCls, mergedStatus, hasFeedback), transfer === null || transfer === void 0 ? void 0 : transfer.className, className, rootClassName, hashId, cssVarCls);
  const [contextLocale] = useLocale("Transfer", localeValues.Transfer);
  const listLocale = getLocale(contextLocale);
  const [leftTitle, rightTitle] = getTitles(listLocale);
  const mergedSelectionsIcon = selectionsIcon !== null && selectionsIcon !== void 0 ? selectionsIcon : transfer === null || transfer === void 0 ? void 0 : transfer.selectionsIcon;
  return wrapCSSVar(/* @__PURE__ */ React.createElement("div", {
    className: cls,
    style: Object.assign(Object.assign({}, transfer === null || transfer === void 0 ? void 0 : transfer.style), style)
  }, /* @__PURE__ */ React.createElement(TransferList, Object.assign({
    prefixCls: `${prefixCls}-list`,
    titleText: leftTitle,
    dataSource: leftDataSource,
    filterOption: filterOption2,
    style: handleListStyle("left"),
    checkedKeys: sourceSelectedKeys,
    handleFilter: leftFilter,
    handleClear: handleLeftClear,
    onItemSelect: onLeftItemSelect,
    onItemSelectAll: onLeftItemSelectAll,
    render,
    showSearch,
    renderList: children,
    footer,
    onScroll: handleLeftScroll,
    disabled: mergedDisabled,
    direction: dir === "rtl" ? "right" : "left",
    showSelectAll,
    selectAllLabel: selectAllLabels[0],
    pagination: mergedPagination,
    selectionsIcon: mergedSelectionsIcon
  }, listLocale)), /* @__PURE__ */ React.createElement(Operation, {
    className: `${prefixCls}-operation`,
    rightActive,
    rightArrowText: operations[0],
    moveToRight,
    leftActive,
    leftArrowText: operations[1],
    moveToLeft,
    style: operationStyle,
    disabled: mergedDisabled,
    direction: dir,
    oneWay
  }), /* @__PURE__ */ React.createElement(TransferList, Object.assign({
    prefixCls: `${prefixCls}-list`,
    titleText: rightTitle,
    dataSource: rightDataSource,
    filterOption: filterOption2,
    style: handleListStyle("right"),
    checkedKeys: targetSelectedKeys,
    handleFilter: rightFilter,
    handleClear: handleRightClear,
    onItemSelect: onRightItemSelect,
    onItemSelectAll: onRightItemSelectAll,
    onItemRemove: onRightItemRemove,
    render,
    showSearch,
    renderList: children,
    footer,
    onScroll: handleRightScroll,
    disabled: mergedDisabled,
    direction: dir === "rtl" ? "left" : "right",
    showSelectAll,
    selectAllLabel: selectAllLabels[1],
    showRemove: oneWay,
    pagination: mergedPagination,
    selectionsIcon: mergedSelectionsIcon
  }, listLocale))));
};
Transfer.List = TransferList;
Transfer.Search = Search;
Transfer.Operation = Operation;
const useCache = function(values) {
  var cacheRef = reactExports.useRef({
    valueLabels: /* @__PURE__ */ new Map()
  });
  return reactExports.useMemo(function() {
    var valueLabels = cacheRef.current.valueLabels;
    var valueLabelsCache = /* @__PURE__ */ new Map();
    var filledValues = values.map(function(item) {
      var value = item.value, label = item.label;
      var mergedLabel = label !== null && label !== void 0 ? label : valueLabels.get(value);
      valueLabelsCache.set(value, mergedLabel);
      return _objectSpread2(_objectSpread2({}, item), {}, {
        label: mergedLabel
      });
    });
    cacheRef.current.valueLabels = valueLabelsCache;
    return [filledValues];
  }, [values]);
};
var useCheckedKeys = function useCheckedKeys2(rawLabeledValues, rawHalfCheckedValues, treeConduction, keyEntities) {
  return reactExports.useMemo(function() {
    var extractValues = function extractValues2(values) {
      return values.map(function(_ref) {
        var value = _ref.value;
        return value;
      });
    };
    var checkedKeys = extractValues(rawLabeledValues);
    var halfCheckedKeys = extractValues(rawHalfCheckedValues);
    var missingValues = checkedKeys.filter(function(key) {
      return !keyEntities[key];
    });
    var finalCheckedKeys = checkedKeys;
    var finalHalfCheckedKeys = halfCheckedKeys;
    if (treeConduction) {
      var conductResult = conductCheck(checkedKeys, true, keyEntities);
      finalCheckedKeys = conductResult.checkedKeys;
      finalHalfCheckedKeys = conductResult.halfCheckedKeys;
    }
    return [Array.from(new Set([].concat(_toConsumableArray(missingValues), _toConsumableArray(finalCheckedKeys)))), finalHalfCheckedKeys];
  }, [rawLabeledValues, rawHalfCheckedValues, treeConduction, keyEntities]);
};
var toArray = function toArray2(value) {
  return Array.isArray(value) ? value : value !== void 0 ? [value] : [];
};
var fillFieldNames = function fillFieldNames2(fieldNames) {
  var _ref = fieldNames || {}, label = _ref.label, value = _ref.value, children = _ref.children;
  return {
    _title: label ? [label] : ["title", "label"],
    value: value || "value",
    key: value || "value",
    children: children || "children"
  };
};
var isCheckDisabled = function isCheckDisabled2(node) {
  return !node || node.disabled || node.disableCheckbox || node.checkable === false;
};
var getAllKeys = function getAllKeys2(treeData, fieldNames) {
  var keys = [];
  var dig = function dig2(list) {
    list.forEach(function(item) {
      var children = item[fieldNames.children];
      if (children) {
        keys.push(item[fieldNames.value]);
        dig2(children);
      }
    });
  };
  dig(treeData);
  return keys;
};
var isNil = function isNil2(val) {
  return val === null || val === void 0;
};
const useDataEntities = function(treeData, fieldNames) {
  return reactExports.useMemo(function() {
    var collection = convertDataToEntities(treeData, {
      fieldNames,
      initWrapper: function initWrapper(wrapper) {
        return _objectSpread2(_objectSpread2({}, wrapper), {}, {
          valueEntities: /* @__PURE__ */ new Map()
        });
      },
      processEntity: function processEntity(entity, wrapper) {
        var val = entity.node[fieldNames.value];
        wrapper.valueEntities.set(val, entity);
      }
    });
    return collection;
  }, [treeData, fieldNames]);
};
var TreeNode = function TreeNode2() {
  return null;
};
var _excluded$1 = ["children", "value"];
function convertChildrenToData(nodes) {
  return toArray$1(nodes).map(function(node) {
    if (!/* @__PURE__ */ reactExports.isValidElement(node) || !node.type) {
      return null;
    }
    var _ref = node, key = _ref.key, _ref$props = _ref.props, children = _ref$props.children, value = _ref$props.value, restProps = _objectWithoutProperties(_ref$props, _excluded$1);
    var data = _objectSpread2({
      key,
      value
    }, restProps);
    var childData = convertChildrenToData(children);
    if (childData.length) {
      data.children = childData;
    }
    return data;
  }).filter(function(data) {
    return data;
  });
}
function fillLegacyProps(dataNode) {
  if (!dataNode) {
    return dataNode;
  }
  var cloneNode = _objectSpread2({}, dataNode);
  if (!("props" in cloneNode)) {
    Object.defineProperty(cloneNode, "props", {
      get: function get() {
        warningOnce(false, "New `rc-tree-select` not support return node instance as argument anymore. Please consider to remove `props` access.");
        return cloneNode;
      }
    });
  }
  return cloneNode;
}
function fillAdditionalInfo(extra, triggerValue, checkedValues, treeData, showPosition, fieldNames) {
  var triggerNode = null;
  var nodeList = null;
  function generateMap() {
    function dig(list) {
      var level = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "0";
      var parentIncluded = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      return list.map(function(option, index2) {
        var pos = "".concat(level, "-").concat(index2);
        var value = option[fieldNames.value];
        var included = checkedValues.includes(value);
        var children = dig(option[fieldNames.children] || [], pos, included);
        var node = /* @__PURE__ */ reactExports.createElement(TreeNode, option, children.map(function(child) {
          return child.node;
        }));
        if (triggerValue === value) {
          triggerNode = node;
        }
        if (included) {
          var checkedNode = {
            pos,
            node,
            children
          };
          if (!parentIncluded) {
            nodeList.push(checkedNode);
          }
          return checkedNode;
        }
        return null;
      }).filter(function(node) {
        return node;
      });
    }
    if (!nodeList) {
      nodeList = [];
      dig(treeData);
      nodeList.sort(function(_ref2, _ref3) {
        var val1 = _ref2.node.props.value;
        var val2 = _ref3.node.props.value;
        var index1 = checkedValues.indexOf(val1);
        var index2 = checkedValues.indexOf(val2);
        return index1 - index2;
      });
    }
  }
  Object.defineProperty(extra, "triggerNode", {
    get: function get() {
      warningOnce(false, "`triggerNode` is deprecated. Please consider decoupling data with node.");
      generateMap();
      return triggerNode;
    }
  });
  Object.defineProperty(extra, "allCheckedNodes", {
    get: function get() {
      warningOnce(false, "`allCheckedNodes` is deprecated. Please consider decoupling data with node.");
      generateMap();
      if (showPosition) {
        return nodeList;
      }
      return nodeList.map(function(_ref4) {
        var node = _ref4.node;
        return node;
      });
    }
  });
}
var useFilterTreeData = function useFilterTreeData2(treeData, searchValue, options) {
  var fieldNames = options.fieldNames, treeNodeFilterProp = options.treeNodeFilterProp, filterTreeNode = options.filterTreeNode;
  var fieldChildren = fieldNames.children;
  return reactExports.useMemo(function() {
    if (!searchValue || filterTreeNode === false) {
      return treeData;
    }
    var filterOptionFunc = typeof filterTreeNode === "function" ? filterTreeNode : function(_, dataNode) {
      return String(dataNode[treeNodeFilterProp]).toUpperCase().includes(searchValue.toUpperCase());
    };
    var filterTreeNodes = function filterTreeNodes2(nodes) {
      var keepAll = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      return nodes.reduce(function(filtered, node) {
        var children = node[fieldChildren];
        var isMatch = keepAll || filterOptionFunc(searchValue, fillLegacyProps(node));
        var filteredChildren = filterTreeNodes2(children || [], isMatch);
        if (isMatch || filteredChildren.length) {
          filtered.push(_objectSpread2(_objectSpread2({}, node), {}, _defineProperty({
            isLeaf: void 0
          }, fieldChildren, filteredChildren)));
        }
        return filtered;
      }, []);
    };
    return filterTreeNodes(treeData);
  }, [treeData, searchValue, fieldChildren, treeNodeFilterProp, filterTreeNode]);
};
function useRefFunc(callback) {
  var funcRef = reactExports.useRef();
  funcRef.current = callback;
  var cacheFn = reactExports.useCallback(function() {
    return funcRef.current.apply(funcRef, arguments);
  }, []);
  return cacheFn;
}
function buildTreeStructure(nodes, config) {
  var id = config.id, pId = config.pId, rootPId = config.rootPId;
  var nodeMap = /* @__PURE__ */ new Map();
  var rootNodes = [];
  nodes.forEach(function(node) {
    var nodeKey = node[id];
    var clonedNode = _objectSpread2(_objectSpread2({}, node), {}, {
      key: node.key || nodeKey
    });
    nodeMap.set(nodeKey, clonedNode);
  });
  nodeMap.forEach(function(node) {
    var parentKey = node[pId];
    var parent = nodeMap.get(parentKey);
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(node);
    } else if (parentKey === rootPId || rootPId === null) {
      rootNodes.push(node);
    }
  });
  return rootNodes;
}
function useTreeData(treeData, children, simpleMode) {
  return reactExports.useMemo(function() {
    if (treeData) {
      if (simpleMode) {
        var config = _objectSpread2({
          id: "id",
          pId: "pId",
          rootPId: null
        }, _typeof(simpleMode) === "object" ? simpleMode : {});
        return buildTreeStructure(treeData, config);
      }
      return treeData;
    }
    return convertChildrenToData(children);
  }, [children, simpleMode, treeData]);
}
var LegacySelectContext = /* @__PURE__ */ reactExports.createContext(null);
var TreeSelectContext = /* @__PURE__ */ reactExports.createContext(null);
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
var OptionList = function OptionList2(_, ref) {
  var _useBaseProps = useBaseProps(), prefixCls = _useBaseProps.prefixCls, multiple = _useBaseProps.multiple, searchValue = _useBaseProps.searchValue, toggleOpen = _useBaseProps.toggleOpen, open2 = _useBaseProps.open, notFoundContent = _useBaseProps.notFoundContent;
  var _React$useContext = reactExports.useContext(TreeSelectContext), virtual = _React$useContext.virtual, listHeight = _React$useContext.listHeight, listItemHeight = _React$useContext.listItemHeight, listItemScrollOffset = _React$useContext.listItemScrollOffset, treeData = _React$useContext.treeData, fieldNames = _React$useContext.fieldNames, onSelect = _React$useContext.onSelect, dropdownMatchSelectWidth = _React$useContext.dropdownMatchSelectWidth, treeExpandAction = _React$useContext.treeExpandAction, treeTitleRender = _React$useContext.treeTitleRender, onPopupScroll = _React$useContext.onPopupScroll, leftMaxCount = _React$useContext.leftMaxCount, leafCountOnly = _React$useContext.leafCountOnly, valueEntities = _React$useContext.valueEntities;
  var _React$useContext2 = reactExports.useContext(LegacySelectContext), checkable = _React$useContext2.checkable, checkedKeys = _React$useContext2.checkedKeys, halfCheckedKeys = _React$useContext2.halfCheckedKeys, treeExpandedKeys = _React$useContext2.treeExpandedKeys, treeDefaultExpandAll = _React$useContext2.treeDefaultExpandAll, treeDefaultExpandedKeys = _React$useContext2.treeDefaultExpandedKeys, onTreeExpand = _React$useContext2.onTreeExpand, treeIcon = _React$useContext2.treeIcon, showTreeIcon = _React$useContext2.showTreeIcon, switcherIcon = _React$useContext2.switcherIcon, treeLine = _React$useContext2.treeLine, treeNodeFilterProp = _React$useContext2.treeNodeFilterProp, loadData = _React$useContext2.loadData, treeLoadedKeys = _React$useContext2.treeLoadedKeys, treeMotion = _React$useContext2.treeMotion, onTreeLoad = _React$useContext2.onTreeLoad, keyEntities = _React$useContext2.keyEntities;
  var treeRef = reactExports.useRef();
  var memoTreeData = useMemo(
    function() {
      return treeData;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open2, treeData],
    function(prev, next) {
      return next[0] && prev[1] !== next[1];
    }
  );
  var mergedCheckedKeys = reactExports.useMemo(function() {
    if (!checkable) {
      return null;
    }
    return {
      checked: checkedKeys,
      halfChecked: halfCheckedKeys
    };
  }, [checkable, checkedKeys, halfCheckedKeys]);
  reactExports.useEffect(function() {
    if (open2 && !multiple && checkedKeys.length) {
      var _treeRef$current;
      (_treeRef$current = treeRef.current) === null || _treeRef$current === void 0 || _treeRef$current.scrollTo({
        key: checkedKeys[0]
      });
    }
  }, [open2]);
  var onListMouseDown = function onListMouseDown2(event) {
    event.preventDefault();
  };
  var onInternalSelect = function onInternalSelect2(__2, info) {
    var node = info.node;
    if (checkable && isCheckDisabled(node)) {
      return;
    }
    onSelect(node.key, {
      selected: !checkedKeys.includes(node.key)
    });
    if (!multiple) {
      toggleOpen(false);
    }
  };
  var _React$useState = reactExports.useState(treeDefaultExpandedKeys), _React$useState2 = _slicedToArray(_React$useState, 2), expandedKeys = _React$useState2[0], setExpandedKeys = _React$useState2[1];
  var _React$useState3 = reactExports.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), searchExpandedKeys = _React$useState4[0], setSearchExpandedKeys = _React$useState4[1];
  var mergedExpandedKeys = reactExports.useMemo(function() {
    if (treeExpandedKeys) {
      return _toConsumableArray(treeExpandedKeys);
    }
    return searchValue ? searchExpandedKeys : expandedKeys;
  }, [expandedKeys, searchExpandedKeys, treeExpandedKeys, searchValue]);
  var onInternalExpand = function onInternalExpand2(keys) {
    setExpandedKeys(keys);
    setSearchExpandedKeys(keys);
    if (onTreeExpand) {
      onTreeExpand(keys);
    }
  };
  var lowerSearchValue = String(searchValue).toLowerCase();
  var filterTreeNode = function filterTreeNode2(treeNode) {
    if (!lowerSearchValue) {
      return false;
    }
    return String(treeNode[treeNodeFilterProp]).toLowerCase().includes(lowerSearchValue);
  };
  reactExports.useEffect(function() {
    if (searchValue) {
      setSearchExpandedKeys(getAllKeys(treeData, fieldNames));
    }
  }, [searchValue]);
  var _React$useState5 = reactExports.useState(function() {
    return /* @__PURE__ */ new Map();
  }), _React$useState6 = _slicedToArray(_React$useState5, 2), disabledCache = _React$useState6[0], setDisabledCache = _React$useState6[1];
  reactExports.useEffect(function() {
    if (leftMaxCount) {
      setDisabledCache(/* @__PURE__ */ new Map());
    }
  }, [leftMaxCount]);
  function getDisabledWithCache(node) {
    var value = node[fieldNames.value];
    if (!disabledCache.has(value)) {
      var entity = valueEntities.get(value);
      var isLeaf2 = (entity.children || []).length === 0;
      if (!isLeaf2) {
        var checkableChildren = entity.children.filter(function(childTreeNode) {
          return !childTreeNode.node.disabled && !childTreeNode.node.disableCheckbox && !checkedKeys.includes(childTreeNode.node[fieldNames.value]);
        });
        var checkableChildrenCount = checkableChildren.length;
        disabledCache.set(value, checkableChildrenCount > leftMaxCount);
      } else {
        disabledCache.set(value, false);
      }
    }
    return disabledCache.get(value);
  }
  var nodeDisabled = useEvent(function(node) {
    var nodeValue = node[fieldNames.value];
    if (checkedKeys.includes(nodeValue)) {
      return false;
    }
    if (leftMaxCount === null) {
      return false;
    }
    if (leftMaxCount <= 0) {
      return true;
    }
    if (leafCountOnly && leftMaxCount) {
      return getDisabledWithCache(node);
    }
    return false;
  });
  var getFirstMatchingNode = function getFirstMatchingNode2(nodes) {
    var _iterator = _createForOfIteratorHelper(nodes), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var node = _step.value;
        if (node.disabled || node.selectable === false) {
          continue;
        }
        if (searchValue) {
          if (filterTreeNode(node)) {
            return node;
          }
        } else {
          return node;
        }
        if (node[fieldNames.children]) {
          var matchInChildren = getFirstMatchingNode2(node[fieldNames.children]);
          if (matchInChildren) {
            return matchInChildren;
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return null;
  };
  var _React$useState7 = reactExports.useState(null), _React$useState8 = _slicedToArray(_React$useState7, 2), activeKey = _React$useState8[0], setActiveKey = _React$useState8[1];
  var activeEntity = keyEntities[activeKey];
  reactExports.useEffect(function() {
    if (!open2) {
      return;
    }
    var nextActiveKey = null;
    var getFirstNode = function getFirstNode2() {
      var firstNode = getFirstMatchingNode(memoTreeData);
      return firstNode ? firstNode[fieldNames.value] : null;
    };
    if (!multiple && checkedKeys.length && !searchValue) {
      nextActiveKey = checkedKeys[0];
    } else {
      nextActiveKey = getFirstNode();
    }
    setActiveKey(nextActiveKey);
  }, [open2, searchValue]);
  reactExports.useImperativeHandle(ref, function() {
    var _treeRef$current2;
    return {
      scrollTo: (_treeRef$current2 = treeRef.current) === null || _treeRef$current2 === void 0 ? void 0 : _treeRef$current2.scrollTo,
      onKeyDown: function onKeyDown(event) {
        var _treeRef$current3;
        var which = event.which;
        switch (which) {
          case KeyCode.UP:
          case KeyCode.DOWN:
          case KeyCode.LEFT:
          case KeyCode.RIGHT:
            (_treeRef$current3 = treeRef.current) === null || _treeRef$current3 === void 0 || _treeRef$current3.onKeyDown(event);
            break;
          case KeyCode.ENTER: {
            if (activeEntity) {
              var isNodeDisabled = nodeDisabled(activeEntity.node);
              var _ref = (activeEntity === null || activeEntity === void 0 ? void 0 : activeEntity.node) || {}, selectable = _ref.selectable, value = _ref.value, disabled = _ref.disabled;
              if (selectable !== false && !disabled && !isNodeDisabled) {
                onInternalSelect(null, {
                  node: {
                    key: activeKey
                  },
                  selected: !checkedKeys.includes(value)
                });
              }
            }
            break;
          }
          case KeyCode.ESC: {
            toggleOpen(false);
          }
        }
      },
      onKeyUp: function onKeyUp() {
      }
    };
  });
  var hasLoadDataFn = useMemo(function() {
    return searchValue ? false : true;
  }, [searchValue, treeExpandedKeys || expandedKeys], function(_ref2, _ref3) {
    var _ref4 = _slicedToArray(_ref2, 1), preSearchValue = _ref4[0];
    var _ref5 = _slicedToArray(_ref3, 2), nextSearchValue = _ref5[0], nextExcludeSearchExpandedKeys = _ref5[1];
    return preSearchValue !== nextSearchValue && !!(nextSearchValue || nextExcludeSearchExpandedKeys);
  });
  var syncLoadData = hasLoadDataFn ? loadData : null;
  if (memoTreeData.length === 0) {
    return /* @__PURE__ */ reactExports.createElement("div", {
      role: "listbox",
      className: "".concat(prefixCls, "-empty"),
      onMouseDown: onListMouseDown
    }, notFoundContent);
  }
  var treeProps = {
    fieldNames
  };
  if (treeLoadedKeys) {
    treeProps.loadedKeys = treeLoadedKeys;
  }
  if (mergedExpandedKeys) {
    treeProps.expandedKeys = mergedExpandedKeys;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    onMouseDown: onListMouseDown
  }, activeEntity && open2 && /* @__PURE__ */ reactExports.createElement("span", {
    style: HIDDEN_STYLE,
    "aria-live": "assertive"
  }, activeEntity.node.value), /* @__PURE__ */ reactExports.createElement(UnstableContext.Provider, {
    value: {
      nodeDisabled
    }
  }, /* @__PURE__ */ reactExports.createElement(Tree, _extends({
    ref: treeRef,
    focusable: false,
    prefixCls: "".concat(prefixCls, "-tree"),
    treeData: memoTreeData,
    height: listHeight,
    itemHeight: listItemHeight,
    itemScrollOffset: listItemScrollOffset,
    virtual: virtual !== false && dropdownMatchSelectWidth !== false,
    multiple,
    icon: treeIcon,
    showIcon: showTreeIcon,
    switcherIcon,
    showLine: treeLine,
    loadData: syncLoadData,
    motion: treeMotion,
    activeKey,
    checkable,
    checkStrictly: true,
    checkedKeys: mergedCheckedKeys,
    selectedKeys: !checkable ? checkedKeys : [],
    defaultExpandAll: treeDefaultExpandAll,
    titleRender: treeTitleRender
  }, treeProps, {
    // Proxy event out
    onActiveChange: setActiveKey,
    onSelect: onInternalSelect,
    onCheck: onInternalSelect,
    onExpand: onInternalExpand,
    onLoad: onTreeLoad,
    filterTreeNode,
    expandAction: treeExpandAction,
    onScroll: onPopupScroll
  }))));
};
var RefOptionList = /* @__PURE__ */ reactExports.forwardRef(OptionList);
var SHOW_ALL = "SHOW_ALL";
var SHOW_PARENT = "SHOW_PARENT";
var SHOW_CHILD = "SHOW_CHILD";
function formatStrategyValues(values, strategy, keyEntities, fieldNames) {
  var valueSet = new Set(values);
  if (strategy === SHOW_CHILD) {
    return values.filter(function(key) {
      var entity = keyEntities[key];
      return !entity || !entity.children || !entity.children.some(function(_ref) {
        var node = _ref.node;
        return valueSet.has(node[fieldNames.value]);
      }) || !entity.children.every(function(_ref2) {
        var node = _ref2.node;
        return isCheckDisabled(node) || valueSet.has(node[fieldNames.value]);
      });
    });
  }
  if (strategy === SHOW_PARENT) {
    return values.filter(function(key) {
      var entity = keyEntities[key];
      var parent = entity ? entity.parent : null;
      return !parent || isCheckDisabled(parent.node) || !valueSet.has(parent.key);
    });
  }
  return values;
}
var _excluded = ["id", "prefixCls", "value", "defaultValue", "onChange", "onSelect", "onDeselect", "searchValue", "inputValue", "onSearch", "autoClearSearchValue", "filterTreeNode", "treeNodeFilterProp", "showCheckedStrategy", "treeNodeLabelProp", "multiple", "treeCheckable", "treeCheckStrictly", "labelInValue", "maxCount", "fieldNames", "treeDataSimpleMode", "treeData", "children", "loadData", "treeLoadedKeys", "onTreeLoad", "treeDefaultExpandAll", "treeExpandedKeys", "treeDefaultExpandedKeys", "onTreeExpand", "treeExpandAction", "virtual", "listHeight", "listItemHeight", "listItemScrollOffset", "onDropdownVisibleChange", "dropdownMatchSelectWidth", "treeLine", "treeIcon", "showTreeIcon", "switcherIcon", "treeMotion", "treeTitleRender", "onPopupScroll"];
function isRawValue(value) {
  return !value || _typeof(value) !== "object";
}
var TreeSelect$1 = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var id = props.id, _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-tree-select" : _props$prefixCls, value = props.value, defaultValue = props.defaultValue, onChange = props.onChange, onSelect = props.onSelect, onDeselect = props.onDeselect, searchValue = props.searchValue, inputValue = props.inputValue, onSearch = props.onSearch, _props$autoClearSearc = props.autoClearSearchValue, autoClearSearchValue = _props$autoClearSearc === void 0 ? true : _props$autoClearSearc, filterTreeNode = props.filterTreeNode, _props$treeNodeFilter = props.treeNodeFilterProp, treeNodeFilterProp = _props$treeNodeFilter === void 0 ? "value" : _props$treeNodeFilter, showCheckedStrategy = props.showCheckedStrategy, treeNodeLabelProp = props.treeNodeLabelProp, multiple = props.multiple, treeCheckable = props.treeCheckable, treeCheckStrictly = props.treeCheckStrictly, labelInValue = props.labelInValue, maxCount = props.maxCount, fieldNames = props.fieldNames, treeDataSimpleMode = props.treeDataSimpleMode, treeData = props.treeData, children = props.children, loadData = props.loadData, treeLoadedKeys = props.treeLoadedKeys, onTreeLoad = props.onTreeLoad, treeDefaultExpandAll = props.treeDefaultExpandAll, treeExpandedKeys = props.treeExpandedKeys, treeDefaultExpandedKeys = props.treeDefaultExpandedKeys, onTreeExpand = props.onTreeExpand, treeExpandAction = props.treeExpandAction, virtual = props.virtual, _props$listHeight = props.listHeight, listHeight = _props$listHeight === void 0 ? 200 : _props$listHeight, _props$listItemHeight = props.listItemHeight, listItemHeight = _props$listItemHeight === void 0 ? 20 : _props$listItemHeight, _props$listItemScroll = props.listItemScrollOffset, listItemScrollOffset = _props$listItemScroll === void 0 ? 0 : _props$listItemScroll, onDropdownVisibleChange = props.onDropdownVisibleChange, _props$dropdownMatchS = props.dropdownMatchSelectWidth, dropdownMatchSelectWidth = _props$dropdownMatchS === void 0 ? true : _props$dropdownMatchS, treeLine = props.treeLine, treeIcon = props.treeIcon, showTreeIcon = props.showTreeIcon, switcherIcon = props.switcherIcon, treeMotion = props.treeMotion, treeTitleRender = props.treeTitleRender, onPopupScroll = props.onPopupScroll, restProps = _objectWithoutProperties(props, _excluded);
  var mergedId = useId(id);
  var treeConduction = treeCheckable && !treeCheckStrictly;
  var mergedCheckable = treeCheckable || treeCheckStrictly;
  var mergedLabelInValue = treeCheckStrictly || labelInValue;
  var mergedMultiple = mergedCheckable || multiple;
  var _useMergedState = useMergedState(defaultValue, {
    value
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), internalValue = _useMergedState2[0], setInternalValue = _useMergedState2[1];
  var mergedShowCheckedStrategy = reactExports.useMemo(function() {
    if (!treeCheckable) {
      return SHOW_ALL;
    }
    return showCheckedStrategy || SHOW_CHILD;
  }, [showCheckedStrategy, treeCheckable]);
  var mergedFieldNames = reactExports.useMemo(
    function() {
      return fillFieldNames(fieldNames);
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [JSON.stringify(fieldNames)]
    /* eslint-enable react-hooks/exhaustive-deps */
  );
  var _useMergedState3 = useMergedState("", {
    value: searchValue !== void 0 ? searchValue : inputValue,
    postState: function postState(search) {
      return search || "";
    }
  }), _useMergedState4 = _slicedToArray(_useMergedState3, 2), mergedSearchValue = _useMergedState4[0], setSearchValue = _useMergedState4[1];
  var onInternalSearch = function onInternalSearch2(searchText) {
    setSearchValue(searchText);
    onSearch === null || onSearch === void 0 || onSearch(searchText);
  };
  var mergedTreeData = useTreeData(treeData, children, treeDataSimpleMode);
  var _useDataEntities = useDataEntities(mergedTreeData, mergedFieldNames), keyEntities = _useDataEntities.keyEntities, valueEntities = _useDataEntities.valueEntities;
  var splitRawValues = reactExports.useCallback(function(newRawValues) {
    var missingRawValues = [];
    var existRawValues = [];
    newRawValues.forEach(function(val) {
      if (valueEntities.has(val)) {
        existRawValues.push(val);
      } else {
        missingRawValues.push(val);
      }
    });
    return {
      missingRawValues,
      existRawValues
    };
  }, [valueEntities]);
  var filteredTreeData = useFilterTreeData(mergedTreeData, mergedSearchValue, {
    fieldNames: mergedFieldNames,
    treeNodeFilterProp,
    filterTreeNode
  });
  var getLabel = reactExports.useCallback(function(item) {
    if (item) {
      if (treeNodeLabelProp) {
        return item[treeNodeLabelProp];
      }
      var titleList = mergedFieldNames._title;
      for (var i = 0; i < titleList.length; i += 1) {
        var title = item[titleList[i]];
        if (title !== void 0) {
          return title;
        }
      }
    }
  }, [mergedFieldNames, treeNodeLabelProp]);
  var toLabeledValues = reactExports.useCallback(function(draftValues) {
    var values = toArray(draftValues);
    return values.map(function(val) {
      if (isRawValue(val)) {
        return {
          value: val
        };
      }
      return val;
    });
  }, []);
  var convert2LabelValues = reactExports.useCallback(function(draftValues) {
    var values = toLabeledValues(draftValues);
    return values.map(function(item) {
      var rawLabel = item.label;
      var rawValue = item.value, rawHalfChecked = item.halfChecked;
      var rawDisabled;
      var entity = valueEntities.get(rawValue);
      if (entity) {
        var _rawLabel;
        rawLabel = treeTitleRender ? treeTitleRender(entity.node) : (_rawLabel = rawLabel) !== null && _rawLabel !== void 0 ? _rawLabel : getLabel(entity.node);
        rawDisabled = entity.node.disabled;
      } else if (rawLabel === void 0) {
        var labelInValueItem = toLabeledValues(internalValue).find(function(labeledItem) {
          return labeledItem.value === rawValue;
        });
        rawLabel = labelInValueItem.label;
      }
      return {
        label: rawLabel,
        value: rawValue,
        halfChecked: rawHalfChecked,
        disabled: rawDisabled
      };
    });
  }, [valueEntities, getLabel, toLabeledValues, internalValue]);
  var rawMixedLabeledValues = reactExports.useMemo(function() {
    return toLabeledValues(internalValue === null ? [] : internalValue);
  }, [toLabeledValues, internalValue]);
  var _React$useMemo = reactExports.useMemo(function() {
    var fullCheckValues = [];
    var halfCheckValues = [];
    rawMixedLabeledValues.forEach(function(item) {
      if (item.halfChecked) {
        halfCheckValues.push(item);
      } else {
        fullCheckValues.push(item);
      }
    });
    return [fullCheckValues, halfCheckValues];
  }, [rawMixedLabeledValues]), _React$useMemo2 = _slicedToArray(_React$useMemo, 2), rawLabeledValues = _React$useMemo2[0], rawHalfLabeledValues = _React$useMemo2[1];
  var rawValues = reactExports.useMemo(function() {
    return rawLabeledValues.map(function(item) {
      return item.value;
    });
  }, [rawLabeledValues]);
  var _useCheckedKeys = useCheckedKeys(rawLabeledValues, rawHalfLabeledValues, treeConduction, keyEntities), _useCheckedKeys2 = _slicedToArray(_useCheckedKeys, 2), rawCheckedValues = _useCheckedKeys2[0], rawHalfCheckedValues = _useCheckedKeys2[1];
  var displayValues = reactExports.useMemo(function() {
    var displayKeys = formatStrategyValues(rawCheckedValues, mergedShowCheckedStrategy, keyEntities, mergedFieldNames);
    var values = displayKeys.map(function(key) {
      var _keyEntities$key$node, _keyEntities$key;
      return (_keyEntities$key$node = (_keyEntities$key = keyEntities[key]) === null || _keyEntities$key === void 0 || (_keyEntities$key = _keyEntities$key.node) === null || _keyEntities$key === void 0 ? void 0 : _keyEntities$key[mergedFieldNames.value]) !== null && _keyEntities$key$node !== void 0 ? _keyEntities$key$node : key;
    });
    var labeledValues = values.map(function(val) {
      var targetItem = rawLabeledValues.find(function(item) {
        return item.value === val;
      });
      var label = labelInValue ? targetItem === null || targetItem === void 0 ? void 0 : targetItem.label : treeTitleRender === null || treeTitleRender === void 0 ? void 0 : treeTitleRender(targetItem);
      return {
        value: val,
        label
      };
    });
    var rawDisplayValues = convert2LabelValues(labeledValues);
    var firstVal = rawDisplayValues[0];
    if (!mergedMultiple && firstVal && isNil(firstVal.value) && isNil(firstVal.label)) {
      return [];
    }
    return rawDisplayValues.map(function(item) {
      var _item$label;
      return _objectSpread2(_objectSpread2({}, item), {}, {
        label: (_item$label = item.label) !== null && _item$label !== void 0 ? _item$label : item.value
      });
    });
  }, [mergedFieldNames, mergedMultiple, rawCheckedValues, rawLabeledValues, convert2LabelValues, mergedShowCheckedStrategy, keyEntities]);
  var _useCache = useCache(displayValues), _useCache2 = _slicedToArray(_useCache, 1), cachedDisplayValues = _useCache2[0];
  var mergedMaxCount = reactExports.useMemo(function() {
    if (mergedMultiple && (mergedShowCheckedStrategy === "SHOW_CHILD" || treeCheckStrictly || !treeCheckable)) {
      return maxCount;
    }
    return null;
  }, [maxCount, mergedMultiple, treeCheckStrictly, mergedShowCheckedStrategy, treeCheckable]);
  var triggerChange = useRefFunc(function(newRawValues, extra, source) {
    var formattedKeyList = formatStrategyValues(newRawValues, mergedShowCheckedStrategy, keyEntities, mergedFieldNames);
    if (mergedMaxCount && formattedKeyList.length > mergedMaxCount) {
      return;
    }
    var labeledValues = convert2LabelValues(newRawValues);
    setInternalValue(labeledValues);
    if (autoClearSearchValue) {
      setSearchValue("");
    }
    if (onChange) {
      var eventValues = newRawValues;
      if (treeConduction) {
        eventValues = formattedKeyList.map(function(key) {
          var entity = valueEntities.get(key);
          return entity ? entity.node[mergedFieldNames.value] : key;
        });
      }
      var _ref = extra || {
        triggerValue: void 0,
        selected: void 0
      }, triggerValue = _ref.triggerValue, selected = _ref.selected;
      var returnRawValues = eventValues;
      if (treeCheckStrictly) {
        var halfValues = rawHalfLabeledValues.filter(function(item) {
          return !eventValues.includes(item.value);
        });
        returnRawValues = [].concat(_toConsumableArray(returnRawValues), _toConsumableArray(halfValues));
      }
      var returnLabeledValues = convert2LabelValues(returnRawValues);
      var additionalInfo = {
        // [Legacy] Always return as array contains label & value
        preValue: rawLabeledValues,
        triggerValue
      };
      var showPosition = true;
      if (treeCheckStrictly || source === "selection" && !selected) {
        showPosition = false;
      }
      fillAdditionalInfo(additionalInfo, triggerValue, newRawValues, mergedTreeData, showPosition, mergedFieldNames);
      if (mergedCheckable) {
        additionalInfo.checked = selected;
      } else {
        additionalInfo.selected = selected;
      }
      var returnValues = mergedLabelInValue ? returnLabeledValues : returnLabeledValues.map(function(item) {
        return item.value;
      });
      onChange(mergedMultiple ? returnValues : returnValues[0], mergedLabelInValue ? null : returnLabeledValues.map(function(item) {
        return item.label;
      }), additionalInfo);
    }
  });
  var onOptionSelect = reactExports.useCallback(function(selectedKey, _ref2) {
    var _node$mergedFieldName;
    var selected = _ref2.selected, source = _ref2.source;
    var entity = keyEntities[selectedKey];
    var node = entity === null || entity === void 0 ? void 0 : entity.node;
    var selectedValue = (_node$mergedFieldName = node === null || node === void 0 ? void 0 : node[mergedFieldNames.value]) !== null && _node$mergedFieldName !== void 0 ? _node$mergedFieldName : selectedKey;
    if (!mergedMultiple) {
      triggerChange([selectedValue], {
        selected: true,
        triggerValue: selectedValue
      }, "option");
    } else {
      var newRawValues = selected ? [].concat(_toConsumableArray(rawValues), [selectedValue]) : rawCheckedValues.filter(function(v) {
        return v !== selectedValue;
      });
      if (treeConduction) {
        var _splitRawValues = splitRawValues(newRawValues), missingRawValues = _splitRawValues.missingRawValues, existRawValues = _splitRawValues.existRawValues;
        var keyList = existRawValues.map(function(val) {
          return valueEntities.get(val).key;
        });
        var checkedKeys;
        if (selected) {
          var _conductCheck = conductCheck(keyList, true, keyEntities);
          checkedKeys = _conductCheck.checkedKeys;
        } else {
          var _conductCheck2 = conductCheck(keyList, {
            halfCheckedKeys: rawHalfCheckedValues
          }, keyEntities);
          checkedKeys = _conductCheck2.checkedKeys;
        }
        newRawValues = [].concat(_toConsumableArray(missingRawValues), _toConsumableArray(checkedKeys.map(function(key) {
          return keyEntities[key].node[mergedFieldNames.value];
        })));
      }
      triggerChange(newRawValues, {
        selected,
        triggerValue: selectedValue
      }, source || "option");
    }
    if (selected || !mergedMultiple) {
      onSelect === null || onSelect === void 0 || onSelect(selectedValue, fillLegacyProps(node));
    } else {
      onDeselect === null || onDeselect === void 0 || onDeselect(selectedValue, fillLegacyProps(node));
    }
  }, [splitRawValues, valueEntities, keyEntities, mergedFieldNames, mergedMultiple, rawValues, triggerChange, treeConduction, onSelect, onDeselect, rawCheckedValues, rawHalfCheckedValues, maxCount]);
  var onInternalDropdownVisibleChange = reactExports.useCallback(function(open2) {
    if (onDropdownVisibleChange) {
      var legacyParam = {};
      Object.defineProperty(legacyParam, "documentClickClose", {
        get: function get() {
          warningOnce(false, "Second param of `onDropdownVisibleChange` has been removed.");
          return false;
        }
      });
      onDropdownVisibleChange(open2, legacyParam);
    }
  }, [onDropdownVisibleChange]);
  var onDisplayValuesChange = useRefFunc(function(newValues, info) {
    var newRawValues = newValues.map(function(item) {
      return item.value;
    });
    if (info.type === "clear") {
      triggerChange(newRawValues, {}, "selection");
      return;
    }
    if (info.values.length) {
      onOptionSelect(info.values[0].value, {
        selected: false,
        source: "selection"
      });
    }
  });
  var treeSelectContext = reactExports.useMemo(function() {
    return {
      virtual,
      dropdownMatchSelectWidth,
      listHeight,
      listItemHeight,
      listItemScrollOffset,
      treeData: filteredTreeData,
      fieldNames: mergedFieldNames,
      onSelect: onOptionSelect,
      treeExpandAction,
      treeTitleRender,
      onPopupScroll,
      leftMaxCount: maxCount === void 0 ? null : maxCount - cachedDisplayValues.length,
      leafCountOnly: mergedShowCheckedStrategy === "SHOW_CHILD" && !treeCheckStrictly && !!treeCheckable,
      valueEntities
    };
  }, [virtual, dropdownMatchSelectWidth, listHeight, listItemHeight, listItemScrollOffset, filteredTreeData, mergedFieldNames, onOptionSelect, treeExpandAction, treeTitleRender, onPopupScroll, maxCount, cachedDisplayValues.length, mergedShowCheckedStrategy, treeCheckStrictly, treeCheckable, valueEntities]);
  var legacyContext = reactExports.useMemo(function() {
    return {
      checkable: mergedCheckable,
      loadData,
      treeLoadedKeys,
      onTreeLoad,
      checkedKeys: rawCheckedValues,
      halfCheckedKeys: rawHalfCheckedValues,
      treeDefaultExpandAll,
      treeExpandedKeys,
      treeDefaultExpandedKeys,
      onTreeExpand,
      treeIcon,
      treeMotion,
      showTreeIcon,
      switcherIcon,
      treeLine,
      treeNodeFilterProp,
      keyEntities
    };
  }, [mergedCheckable, loadData, treeLoadedKeys, onTreeLoad, rawCheckedValues, rawHalfCheckedValues, treeDefaultExpandAll, treeExpandedKeys, treeDefaultExpandedKeys, onTreeExpand, treeIcon, treeMotion, showTreeIcon, switcherIcon, treeLine, treeNodeFilterProp, keyEntities]);
  return /* @__PURE__ */ reactExports.createElement(TreeSelectContext.Provider, {
    value: treeSelectContext
  }, /* @__PURE__ */ reactExports.createElement(LegacySelectContext.Provider, {
    value: legacyContext
  }, /* @__PURE__ */ reactExports.createElement(BaseSelect, _extends({
    ref
  }, restProps, {
    // >>> MISC
    id: mergedId,
    prefixCls,
    mode: mergedMultiple ? "multiple" : void 0,
    displayValues: cachedDisplayValues,
    onDisplayValuesChange,
    searchValue: mergedSearchValue,
    onSearch: onInternalSearch,
    OptionList: RefOptionList,
    emptyOptions: !mergedTreeData.length,
    onDropdownVisibleChange: onInternalDropdownVisibleChange,
    dropdownMatchSelectWidth
  }))));
});
var GenericTreeSelect = TreeSelect$1;
GenericTreeSelect.TreeNode = TreeNode;
GenericTreeSelect.SHOW_ALL = SHOW_ALL;
GenericTreeSelect.SHOW_PARENT = SHOW_PARENT;
GenericTreeSelect.SHOW_CHILD = SHOW_CHILD;
const genBaseStyle = (token) => {
  const {
    componentCls,
    treePrefixCls,
    colorBgElevated
  } = token;
  const treeCls = `.${treePrefixCls}`;
  return [
    // ======================================================
    // ==                     Dropdown                     ==
    // ======================================================
    {
      [`${componentCls}-dropdown`]: [
        {
          padding: `${unit(token.paddingXS)} ${unit(token.calc(token.paddingXS).div(2).equal())}`
        },
        // ====================== Tree ======================
        genTreeStyle(treePrefixCls, merge(token, {
          colorBgContainer: colorBgElevated
        }), false),
        {
          [treeCls]: {
            borderRadius: 0,
            [`${treeCls}-list-holder-inner`]: {
              alignItems: "stretch",
              [`${treeCls}-treenode`]: {
                [`${treeCls}-node-content-wrapper`]: {
                  flex: "auto"
                }
              }
            }
          }
        },
        // ==================== Checkbox ====================
        getStyle$1(`${treePrefixCls}-checkbox`, token),
        // ====================== RTL =======================
        {
          "&-rtl": {
            direction: "rtl",
            [`${treeCls}-switcher${treeCls}-switcher_close`]: {
              [`${treeCls}-switcher-icon svg`]: {
                transform: "rotate(90deg)"
              }
            }
          }
        }
      ]
    }
  ];
};
function useTreeSelectStyle(prefixCls, treePrefixCls, rootCls) {
  return genStyleHooks("TreeSelect", (token) => {
    const treeSelectToken = merge(token, {
      treePrefixCls
    });
    return genBaseStyle(treeSelectToken);
  }, initComponentToken$1)(prefixCls, rootCls);
}
var __rest$6 = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const InternalTreeSelect = (props, ref) => {
  var _a, _b, _c, _d, _e;
  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    disabled: customDisabled,
    bordered = true,
    style,
    className,
    rootClassName,
    treeCheckable,
    multiple,
    listHeight = 256,
    listItemHeight: customListItemHeight,
    placement,
    notFoundContent,
    switcherIcon: customSwitcherIcon,
    treeLine,
    getPopupContainer,
    popupClassName,
    dropdownClassName,
    treeIcon = false,
    transitionName,
    choiceTransitionName = "",
    status: customStatus,
    treeExpandAction,
    builtinPlacements,
    dropdownMatchSelectWidth,
    popupMatchSelectWidth,
    allowClear,
    variant: customVariant,
    dropdownStyle,
    dropdownRender,
    popupRender,
    onDropdownVisibleChange,
    onOpenChange,
    tagRender,
    maxCount,
    showCheckedStrategy,
    treeCheckStrictly,
    styles,
    classNames: classNames$1
  } = props, restProps = __rest$6(props, ["prefixCls", "size", "disabled", "bordered", "style", "className", "rootClassName", "treeCheckable", "multiple", "listHeight", "listItemHeight", "placement", "notFoundContent", "switcherIcon", "treeLine", "getPopupContainer", "popupClassName", "dropdownClassName", "treeIcon", "transitionName", "choiceTransitionName", "status", "treeExpandAction", "builtinPlacements", "dropdownMatchSelectWidth", "popupMatchSelectWidth", "allowClear", "variant", "dropdownStyle", "dropdownRender", "popupRender", "onDropdownVisibleChange", "onOpenChange", "tagRender", "maxCount", "showCheckedStrategy", "treeCheckStrictly", "styles", "classNames"]);
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction,
    virtual,
    popupMatchSelectWidth: contextPopupMatchSelectWidth,
    popupOverflow
  } = reactExports.useContext(ConfigContext);
  const {
    styles: contextStyles,
    classNames: contextClassNames,
    switcherIcon
  } = useComponentConfig("treeSelect");
  const [, token] = useToken$1();
  const listItemHeight = customListItemHeight !== null && customListItemHeight !== void 0 ? customListItemHeight : (token === null || token === void 0 ? void 0 : token.controlHeightSM) + (token === null || token === void 0 ? void 0 : token.paddingXXS);
  const rootPrefixCls = getPrefixCls();
  const prefixCls = getPrefixCls("select", customizePrefixCls);
  const treePrefixCls = getPrefixCls("select-tree", customizePrefixCls);
  const treeSelectPrefixCls = getPrefixCls("tree-select", customizePrefixCls);
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  const rootCls = useCSSVarCls(prefixCls);
  const treeSelectRootCls = useCSSVarCls(treeSelectPrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useSelectStyle(prefixCls, rootCls);
  const [treeSelectWrapCSSVar] = useTreeSelectStyle(treeSelectPrefixCls, treePrefixCls, treeSelectRootCls);
  const [variant, enableVariantCls] = useVariant("treeSelect", customVariant, bordered);
  const mergedPopupClassName = classNames(((_a = classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.popup) === null || _a === void 0 ? void 0 : _a.root) || ((_b = contextClassNames === null || contextClassNames === void 0 ? void 0 : contextClassNames.popup) === null || _b === void 0 ? void 0 : _b.root) || popupClassName || dropdownClassName, `${treeSelectPrefixCls}-dropdown`, {
    [`${treeSelectPrefixCls}-dropdown-rtl`]: direction === "rtl"
  }, rootClassName, contextClassNames.root, classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.root, cssVarCls, rootCls, treeSelectRootCls, hashId);
  const mergedPopupStyle = ((_c = styles === null || styles === void 0 ? void 0 : styles.popup) === null || _c === void 0 ? void 0 : _c.root) || ((_d = contextStyles === null || contextStyles === void 0 ? void 0 : contextStyles.popup) === null || _d === void 0 ? void 0 : _d.root) || dropdownStyle;
  const mergedPopupRender = usePopupRender(popupRender || dropdownRender);
  const mergedOnOpenChange = onOpenChange || onDropdownVisibleChange;
  const isMultiple = !!(treeCheckable || multiple);
  const mergedMaxCount = reactExports.useMemo(() => {
    if (maxCount && (showCheckedStrategy === "SHOW_ALL" && !treeCheckStrictly || showCheckedStrategy === "SHOW_PARENT")) {
      return void 0;
    }
    return maxCount;
  }, [maxCount, showCheckedStrategy, treeCheckStrictly]);
  const showSuffixIcon = useShowArrow(props.suffixIcon, props.showArrow);
  const mergedPopupMatchSelectWidth = (_e = popupMatchSelectWidth !== null && popupMatchSelectWidth !== void 0 ? popupMatchSelectWidth : dropdownMatchSelectWidth) !== null && _e !== void 0 ? _e : contextPopupMatchSelectWidth;
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon
  } = reactExports.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);
  const {
    suffixIcon,
    removeIcon,
    clearIcon
  } = useIcons(Object.assign(Object.assign({}, restProps), {
    multiple: isMultiple,
    showSuffixIcon,
    hasFeedback,
    feedbackIcon,
    prefixCls,
    componentName: "TreeSelect"
  }));
  const mergedAllowClear = allowClear === true ? {
    clearIcon
  } : allowClear;
  let mergedNotFound;
  if (notFoundContent !== void 0) {
    mergedNotFound = notFoundContent;
  } else {
    mergedNotFound = (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty("Select")) || /* @__PURE__ */ reactExports.createElement(DefaultRenderEmpty, {
      componentName: "Select"
    });
  }
  const selectProps = omit(restProps, ["suffixIcon", "removeIcon", "clearIcon", "itemIcon", "switcherIcon", "style"]);
  const memoizedPlacement = reactExports.useMemo(() => {
    if (placement !== void 0) {
      return placement;
    }
    return direction === "rtl" ? "bottomRight" : "bottomLeft";
  }, [placement, direction]);
  const mergedSize = useSize((ctx) => {
    var _a2;
    return (_a2 = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a2 !== void 0 ? _a2 : ctx;
  });
  const disabled = reactExports.useContext(DisabledContext);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  const mergedClassName = classNames(!customizePrefixCls && treeSelectPrefixCls, {
    [`${prefixCls}-lg`]: mergedSize === "large",
    [`${prefixCls}-sm`]: mergedSize === "small",
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-${variant}`]: enableVariantCls,
    [`${prefixCls}-in-form-item`]: isFormItemInput
  }, getStatusClassNames(prefixCls, mergedStatus, hasFeedback), compactItemClassnames, className, rootClassName, contextClassNames.root, classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.root, cssVarCls, rootCls, treeSelectRootCls, hashId);
  const mergedSwitcherIcon = customSwitcherIcon !== null && customSwitcherIcon !== void 0 ? customSwitcherIcon : switcherIcon;
  const renderSwitcherIcon = (nodeProps) => /* @__PURE__ */ reactExports.createElement(SwitcherIconCom, {
    prefixCls: treePrefixCls,
    switcherIcon: mergedSwitcherIcon,
    treeNodeProps: nodeProps,
    showLine: treeLine
  });
  const [zIndex] = useZIndex("SelectLike", mergedPopupStyle === null || mergedPopupStyle === void 0 ? void 0 : mergedPopupStyle.zIndex);
  const returnNode = /* @__PURE__ */ reactExports.createElement(GenericTreeSelect, Object.assign({
    virtual,
    disabled: mergedDisabled
  }, selectProps, {
    dropdownMatchSelectWidth: mergedPopupMatchSelectWidth,
    builtinPlacements: mergedBuiltinPlacements(builtinPlacements, popupOverflow),
    ref,
    prefixCls,
    className: mergedClassName,
    style: Object.assign(Object.assign({}, styles === null || styles === void 0 ? void 0 : styles.root), style),
    listHeight,
    listItemHeight,
    treeCheckable: treeCheckable ? /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-tree-checkbox-inner`
    }) : treeCheckable,
    treeLine: !!treeLine,
    suffixIcon,
    multiple: isMultiple,
    placement: memoizedPlacement,
    removeIcon,
    allowClear: mergedAllowClear,
    switcherIcon: renderSwitcherIcon,
    showTreeIcon: treeIcon,
    notFoundContent: mergedNotFound,
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    treeMotion: null,
    dropdownClassName: mergedPopupClassName,
    dropdownStyle: Object.assign(Object.assign({}, mergedPopupStyle), {
      zIndex
    }),
    dropdownRender: mergedPopupRender,
    onDropdownVisibleChange: mergedOnOpenChange,
    choiceTransitionName: getTransitionName(rootPrefixCls, "", choiceTransitionName),
    transitionName: getTransitionName(rootPrefixCls, "slide-up", transitionName),
    treeExpandAction,
    tagRender: isMultiple ? tagRender : void 0,
    maxCount: mergedMaxCount,
    showCheckedStrategy,
    treeCheckStrictly
  }));
  return wrapCSSVar(treeSelectWrapCSSVar(returnNode));
};
const TreeSelectRef = /* @__PURE__ */ reactExports.forwardRef(InternalTreeSelect);
const TreeSelect = TreeSelectRef;
const PurePanel = genPurePanel(TreeSelect, "dropdownAlign", (props) => omit(props, ["visible"]));
TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;
TreeSelect._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
var EditOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" } }] }, "name": "edit", "theme": "outlined" };
var EditOutlined = function EditOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: EditOutlined$1
  }));
};
var RefIcon$2 = /* @__PURE__ */ reactExports.forwardRef(EditOutlined);
var EnterOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 000 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z" } }] }, "name": "enter", "theme": "outlined" };
var EnterOutlined = function EnterOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: EnterOutlined$1
  }));
};
var RefIcon$1 = /* @__PURE__ */ reactExports.forwardRef(EnterOutlined);
const getTitleStyle = (fontSize, lineHeight, color, token) => {
  const {
    titleMarginBottom,
    fontWeightStrong
  } = token;
  return {
    marginBottom: titleMarginBottom,
    color,
    fontWeight: fontWeightStrong,
    fontSize,
    lineHeight
  };
};
const getTitleStyles = (token) => {
  const headings = [1, 2, 3, 4, 5];
  const styles = {};
  headings.forEach((headingLevel) => {
    styles[`
      h${headingLevel}&,
      div&-h${headingLevel},
      div&-h${headingLevel} > textarea,
      h${headingLevel}
    `] = getTitleStyle(token[`fontSizeHeading${headingLevel}`], token[`lineHeightHeading${headingLevel}`], token.colorTextHeading, token);
  });
  return styles;
};
const getLinkStyles = (token) => {
  const {
    componentCls
  } = token;
  return {
    "a&, a": Object.assign(Object.assign({}, operationUnit(token)), {
      userSelect: "text",
      [`&[disabled], &${componentCls}-disabled`]: {
        color: token.colorTextDisabled,
        cursor: "not-allowed",
        "&:active, &:hover": {
          color: token.colorTextDisabled
        },
        "&:active": {
          pointerEvents: "none"
        }
      }
    })
  };
};
const getResetStyles = (token) => ({
  code: {
    margin: "0 0.2em",
    paddingInline: "0.4em",
    paddingBlock: "0.2em 0.1em",
    fontSize: "85%",
    fontFamily: token.fontFamilyCode,
    background: "rgba(150, 150, 150, 0.1)",
    border: "1px solid rgba(100, 100, 100, 0.2)",
    borderRadius: 3
  },
  kbd: {
    margin: "0 0.2em",
    paddingInline: "0.4em",
    paddingBlock: "0.15em 0.1em",
    fontSize: "90%",
    fontFamily: token.fontFamilyCode,
    background: "rgba(150, 150, 150, 0.06)",
    border: "1px solid rgba(100, 100, 100, 0.2)",
    borderBottomWidth: 2,
    borderRadius: 3
  },
  mark: {
    padding: 0,
    // FIXME hardcode in v4
    backgroundColor: gold[2]
  },
  "u, ins": {
    textDecoration: "underline",
    textDecorationSkipInk: "auto"
  },
  "s, del": {
    textDecoration: "line-through"
  },
  strong: {
    fontWeight: token.fontWeightStrong
  },
  // list
  "ul, ol": {
    marginInline: 0,
    marginBlock: "0 1em",
    padding: 0,
    li: {
      marginInline: "20px 0",
      marginBlock: 0,
      paddingInline: "4px 0",
      paddingBlock: 0
    }
  },
  ul: {
    listStyleType: "circle",
    ul: {
      listStyleType: "disc"
    }
  },
  ol: {
    listStyleType: "decimal"
  },
  // pre & block
  "pre, blockquote": {
    margin: "1em 0"
  },
  pre: {
    padding: "0.4em 0.6em",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    background: "rgba(150, 150, 150, 0.1)",
    border: "1px solid rgba(100, 100, 100, 0.2)",
    borderRadius: 3,
    fontFamily: token.fontFamilyCode,
    // Compatible for marked
    code: {
      display: "inline",
      margin: 0,
      padding: 0,
      fontSize: "inherit",
      fontFamily: "inherit",
      background: "transparent",
      border: 0
    }
  },
  blockquote: {
    paddingInline: "0.6em 0",
    paddingBlock: 0,
    borderInlineStart: "4px solid rgba(100, 100, 100, 0.2)",
    opacity: 0.85
  }
});
const getEditableStyles = (token) => {
  const {
    componentCls,
    paddingSM
  } = token;
  const inputShift = paddingSM;
  return {
    "&-edit-content": {
      position: "relative",
      "div&": {
        insetInlineStart: token.calc(token.paddingSM).mul(-1).equal(),
        insetBlockStart: token.calc(inputShift).div(-2).add(1).equal(),
        marginBottom: token.calc(inputShift).div(2).sub(2).equal()
      },
      [`${componentCls}-edit-content-confirm`]: {
        position: "absolute",
        insetInlineEnd: token.calc(token.marginXS).add(2).equal(),
        insetBlockEnd: token.marginXS,
        color: token.colorIcon,
        // default style
        fontWeight: "normal",
        fontSize: token.fontSize,
        fontStyle: "normal",
        pointerEvents: "none"
      },
      textarea: {
        margin: "0!important",
        // Fix Editable Textarea flash in Firefox
        MozTransition: "none",
        height: "1em"
      }
    }
  };
};
const getCopyableStyles = (token) => ({
  [`${token.componentCls}-copy-success`]: {
    [`
    &,
    &:hover,
    &:focus`]: {
      color: token.colorSuccess
    }
  },
  [`${token.componentCls}-copy-icon-only`]: {
    marginInlineStart: 0
  }
});
const getEllipsisStyles = () => ({
  [`
  a&-ellipsis,
  span&-ellipsis
  `]: {
    display: "inline-block",
    maxWidth: "100%"
  },
  "&-ellipsis-single-line": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // https://blog.csdn.net/iefreer/article/details/50421025
    "a&, span&": {
      verticalAlign: "bottom"
    },
    "> code": {
      paddingBlock: 0,
      maxWidth: "calc(100% - 1.2em)",
      display: "inline-block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      verticalAlign: "bottom",
      // https://github.com/ant-design/ant-design/issues/45953
      boxSizing: "content-box"
    }
  },
  "&-ellipsis-multiple-line": {
    display: "-webkit-box",
    overflow: "hidden",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical"
  }
});
const genTypographyStyle = (token) => {
  const {
    componentCls,
    titleMarginTop
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
      color: token.colorText,
      wordBreak: "break-word",
      lineHeight: token.lineHeight,
      [`&${componentCls}-secondary`]: {
        color: token.colorTextDescription
      },
      [`&${componentCls}-success`]: {
        color: token.colorSuccessText
      },
      [`&${componentCls}-warning`]: {
        color: token.colorWarningText
      },
      [`&${componentCls}-danger`]: {
        color: token.colorErrorText,
        "a&:active, a&:focus": {
          color: token.colorErrorTextActive
        },
        "a&:hover": {
          color: token.colorErrorTextHover
        }
      },
      [`&${componentCls}-disabled`]: {
        color: token.colorTextDisabled,
        cursor: "not-allowed",
        userSelect: "none"
      },
      [`
        div&,
        p
      `]: {
        marginBottom: "1em"
      }
    }, getTitleStyles(token)), {
      [`
      & + h1${componentCls},
      & + h2${componentCls},
      & + h3${componentCls},
      & + h4${componentCls},
      & + h5${componentCls}
      `]: {
        marginTop: titleMarginTop
      },
      [`
      div,
      ul,
      li,
      p,
      h1,
      h2,
      h3,
      h4,
      h5`]: {
        [`
        + h1,
        + h2,
        + h3,
        + h4,
        + h5
        `]: {
          marginTop: titleMarginTop
        }
      }
    }), getResetStyles(token)), getLinkStyles(token)), {
      // Operation
      [`
        ${componentCls}-expand,
        ${componentCls}-collapse,
        ${componentCls}-edit,
        ${componentCls}-copy
      `]: Object.assign(Object.assign({}, operationUnit(token)), {
        marginInlineStart: token.marginXXS
      })
    }), getEditableStyles(token)), getCopyableStyles(token)), getEllipsisStyles()), {
      "&-rtl": {
        direction: "rtl"
      }
    })
  };
};
const prepareComponentToken = () => ({
  titleMarginTop: "1.2em",
  titleMarginBottom: "0.5em"
});
const useStyle = genStyleHooks("Typography", genTypographyStyle, prepareComponentToken);
const Editable = (props) => {
  const {
    prefixCls,
    "aria-label": ariaLabel,
    className,
    style,
    direction,
    maxLength,
    autoSize = true,
    value,
    onSave,
    onCancel,
    onEnd,
    component,
    enterIcon = /* @__PURE__ */ reactExports.createElement(RefIcon$1, null)
  } = props;
  const ref = reactExports.useRef(null);
  const inComposition = reactExports.useRef(false);
  const lastKeyCode = reactExports.useRef(null);
  const [current, setCurrent] = reactExports.useState(value);
  reactExports.useEffect(() => {
    setCurrent(value);
  }, [value]);
  reactExports.useEffect(() => {
    var _a;
    if ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.resizableTextArea) {
      const {
        textArea
      } = ref.current.resizableTextArea;
      textArea.focus();
      const {
        length
      } = textArea.value;
      textArea.setSelectionRange(length, length);
    }
  }, []);
  const onChange = ({
    target
  }) => {
    setCurrent(target.value.replace(/[\n\r]/g, ""));
  };
  const onCompositionStart = () => {
    inComposition.current = true;
  };
  const onCompositionEnd = () => {
    inComposition.current = false;
  };
  const onKeyDown = ({
    keyCode
  }) => {
    if (inComposition.current) {
      return;
    }
    lastKeyCode.current = keyCode;
  };
  const confirmChange = () => {
    onSave(current.trim());
  };
  const onKeyUp = ({
    keyCode,
    ctrlKey,
    altKey,
    metaKey,
    shiftKey
  }) => {
    if (lastKeyCode.current !== keyCode || inComposition.current || ctrlKey || altKey || metaKey || shiftKey) {
      return;
    }
    if (keyCode === KeyCode.ENTER) {
      confirmChange();
      onEnd === null || onEnd === void 0 ? void 0 : onEnd();
    } else if (keyCode === KeyCode.ESC) {
      onCancel();
    }
  };
  const onBlur = () => {
    confirmChange();
  };
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const textAreaClassName = classNames(prefixCls, `${prefixCls}-edit-content`, {
    [`${prefixCls}-rtl`]: direction === "rtl",
    [`${prefixCls}-${component}`]: !!component
  }, className, hashId, cssVarCls);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("div", {
    className: textAreaClassName,
    style
  }, /* @__PURE__ */ reactExports.createElement(TextArea$1, {
    ref,
    maxLength,
    value: current,
    onChange,
    onKeyDown,
    onKeyUp,
    onCompositionStart,
    onCompositionEnd,
    onBlur,
    "aria-label": ariaLabel,
    rows: 1,
    autoSize
  }), enterIcon !== null ? cloneElement(enterIcon, {
    className: `${prefixCls}-edit-content-confirm`
  }) : null));
};
var toggleSelection = function() {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function() {
    };
  }
  var active = document.activeElement;
  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }
  switch (active.tagName.toUpperCase()) {
    case "INPUT":
    case "TEXTAREA":
      active.blur();
      break;
    default:
      active = null;
      break;
  }
  selection.removeAllRanges();
  return function() {
    selection.type === "Caret" && selection.removeAllRanges();
    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }
    active && active.focus();
  };
};
var deselectCurrent = toggleSelection;
var clipboardToIE11Formatting = {
  "text/plain": "Text",
  "text/html": "Url",
  "default": "Text"
};
var defaultMessage = "Copy to clipboard: #{key}, Enter";
function format(message2) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message2.replace(/#{\s*key\s*}/g, copyKey);
}
function copy(text, options) {
  var debug, message2, reselectPrevious, range, selection, mark, success = false;
  if (!options) {
    options = {};
  }
  debug = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();
    range = document.createRange();
    selection = document.getSelection();
    mark = document.createElement("span");
    mark.textContent = text;
    mark.ariaHidden = "true";
    mark.style.all = "unset";
    mark.style.position = "fixed";
    mark.style.top = 0;
    mark.style.clip = "rect(0, 0, 0, 0)";
    mark.style.whiteSpace = "pre";
    mark.style.webkitUserSelect = "text";
    mark.style.MozUserSelect = "text";
    mark.style.msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function(e2) {
      e2.stopPropagation();
      if (options.format) {
        e2.preventDefault();
        if (typeof e2.clipboardData === "undefined") {
          debug && console.warn("unable to use e.clipboardData");
          debug && console.warn("trying IE specific stuff");
          window.clipboardData.clearData();
          var format2 = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
          window.clipboardData.setData(format2, text);
        } else {
          e2.clipboardData.clearData();
          e2.clipboardData.setData(options.format, text);
        }
      }
      if (options.onCopy) {
        e2.preventDefault();
        options.onCopy(e2.clipboardData);
      }
    });
    document.body.appendChild(mark);
    range.selectNodeContents(mark);
    selection.addRange(range);
    var successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
    success = true;
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
    debug && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(options.format || "text", text);
      options.onCopy && options.onCopy(window.clipboardData);
      success = true;
    } catch (err2) {
      debug && console.error("unable to copy using clipboardData: ", err2);
      debug && console.error("falling back to prompt");
      message2 = format("message" in options ? options.message : defaultMessage);
      window.prompt(message2, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }
    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }
  return success;
}
var copyToClipboard = copy;
const copy$1 = /* @__PURE__ */ getDefaultExportFromCjs(copyToClipboard);
var __awaiter = function(thisArg, _arguments, P, generator2) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator2.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator2["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator2 = generator2.apply(thisArg, _arguments || [])).next());
  });
};
const useCopyClick = ({
  copyConfig,
  children
}) => {
  const [copied, setCopied] = reactExports.useState(false);
  const [copyLoading, setCopyLoading] = reactExports.useState(false);
  const copyIdRef = reactExports.useRef(null);
  const cleanCopyId = () => {
    if (copyIdRef.current) {
      clearTimeout(copyIdRef.current);
    }
  };
  const copyOptions = {};
  if (copyConfig.format) {
    copyOptions.format = copyConfig.format;
  }
  reactExports.useEffect(() => cleanCopyId, []);
  const onClick = useEvent((e2) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    e2 === null || e2 === void 0 ? void 0 : e2.preventDefault();
    e2 === null || e2 === void 0 ? void 0 : e2.stopPropagation();
    setCopyLoading(true);
    try {
      const text = typeof copyConfig.text === "function" ? yield copyConfig.text() : copyConfig.text;
      copy$1(text || toList$1(children, true).join("") || "", copyOptions);
      setCopyLoading(false);
      setCopied(true);
      cleanCopyId();
      copyIdRef.current = setTimeout(() => {
        setCopied(false);
      }, 3e3);
      (_a = copyConfig.onCopy) === null || _a === void 0 ? void 0 : _a.call(copyConfig, e2);
    } catch (error) {
      setCopyLoading(false);
      throw error;
    }
  }));
  return {
    copied,
    copyLoading,
    onClick
  };
};
function useMergedConfig(propConfig, templateConfig) {
  return reactExports.useMemo(() => {
    const support = !!propConfig;
    return [support, Object.assign(Object.assign({}, templateConfig), support && typeof propConfig === "object" ? propConfig : null)];
  }, [propConfig]);
}
const usePrevious = (value) => {
  const ref = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
const useTooltipProps = (tooltip, editConfigText, children) => reactExports.useMemo(() => {
  if (tooltip === true) {
    return {
      title: editConfigText !== null && editConfigText !== void 0 ? editConfigText : children
    };
  }
  if (/* @__PURE__ */ reactExports.isValidElement(tooltip)) {
    return {
      title: tooltip
    };
  }
  if (typeof tooltip === "object") {
    return Object.assign({
      title: editConfigText !== null && editConfigText !== void 0 ? editConfigText : children
    }, tooltip);
  }
  return {
    title: tooltip
  };
}, [tooltip, editConfigText, children]);
var __rest$5 = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Typography$1 = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    component: Component = "article",
    className,
    rootClassName,
    setContentRef,
    children,
    direction: typographyDirection,
    style
  } = props, restProps = __rest$5(props, ["prefixCls", "component", "className", "rootClassName", "setContentRef", "children", "direction", "style"]);
  const {
    getPrefixCls,
    direction: contextDirection,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("typography");
  const direction = typographyDirection !== null && typographyDirection !== void 0 ? typographyDirection : contextDirection;
  const mergedRef = setContentRef ? composeRef(ref, setContentRef) : ref;
  const prefixCls = getPrefixCls("typography", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const componentClassName = classNames(prefixCls, contextClassName, {
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, rootClassName, hashId, cssVarCls);
  const mergedStyle = Object.assign(Object.assign({}, contextStyle), style);
  return wrapCSSVar(
    // @ts-expect-error: Expression produces a union type that is too complex to represent.
    /* @__PURE__ */ reactExports.createElement(Component, Object.assign({
      className: componentClassName,
      style: mergedStyle,
      ref: mergedRef
    }, restProps), children)
  );
});
var CopyOutlined$1 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z" } }] }, "name": "copy", "theme": "outlined" };
var CopyOutlined = function CopyOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(Icon$1, _extends({}, props, {
    ref,
    icon: CopyOutlined$1
  }));
};
var RefIcon = /* @__PURE__ */ reactExports.forwardRef(CopyOutlined);
function toList(val) {
  if (val === false) {
    return [false, false];
  }
  return Array.isArray(val) ? val : [val];
}
function getNode(dom, defaultNode, needDom) {
  if (dom === true || dom === void 0) {
    return defaultNode;
  }
  return dom || needDom && defaultNode;
}
function isEleEllipsis(ele) {
  const childDiv = document.createElement("em");
  ele.appendChild(childDiv);
  const rect = ele.getBoundingClientRect();
  const childRect = childDiv.getBoundingClientRect();
  ele.removeChild(childDiv);
  return (
    // Horizontal out of range
    rect.left > childRect.left || childRect.right > rect.right || // Vertical out of range
    rect.top > childRect.top || childRect.bottom > rect.bottom
  );
}
const isValidText = (val) => ["string", "number"].includes(typeof val);
const CopyBtn = ({
  prefixCls,
  copied,
  locale: locale2,
  iconOnly,
  tooltips,
  icon,
  tabIndex,
  onCopy,
  loading: btnLoading
}) => {
  const tooltipNodes = toList(tooltips);
  const iconNodes = toList(icon);
  const {
    copied: copiedText,
    copy: copyText
  } = locale2 !== null && locale2 !== void 0 ? locale2 : {};
  const systemStr = copied ? copiedText : copyText;
  const copyTitle = getNode(tooltipNodes[copied ? 1 : 0], systemStr);
  const ariaLabel = typeof copyTitle === "string" ? copyTitle : systemStr;
  return /* @__PURE__ */ reactExports.createElement(Tooltip, {
    title: copyTitle
  }, /* @__PURE__ */ reactExports.createElement("button", {
    type: "button",
    className: classNames(`${prefixCls}-copy`, {
      [`${prefixCls}-copy-success`]: copied,
      [`${prefixCls}-copy-icon-only`]: iconOnly
    }),
    onClick: onCopy,
    "aria-label": ariaLabel,
    tabIndex
  }, copied ? getNode(iconNodes[1], /* @__PURE__ */ reactExports.createElement(RefIcon$n, null), true) : getNode(iconNodes[0], btnLoading ? /* @__PURE__ */ reactExports.createElement(RefIcon$e, null) : /* @__PURE__ */ reactExports.createElement(RefIcon, null), true)));
};
const MeasureText = /* @__PURE__ */ reactExports.forwardRef(({
  style,
  children
}, ref) => {
  const spanRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => ({
    isExceed: () => {
      const span = spanRef.current;
      return span.scrollHeight > span.clientHeight;
    },
    getHeight: () => spanRef.current.clientHeight
  }));
  return /* @__PURE__ */ reactExports.createElement("span", {
    "aria-hidden": true,
    ref: spanRef,
    style: Object.assign({
      position: "fixed",
      display: "block",
      left: 0,
      top: 0,
      pointerEvents: "none",
      backgroundColor: "rgba(255, 0, 0, 0.65)"
    }, style)
  }, children);
});
const getNodesLen = (nodeList) => nodeList.reduce((totalLen, node) => totalLen + (isValidText(node) ? String(node).length : 1), 0);
function sliceNodes(nodeList, len) {
  let currLen = 0;
  const currentNodeList = [];
  for (let i = 0; i < nodeList.length; i += 1) {
    if (currLen === len) {
      return currentNodeList;
    }
    const node = nodeList[i];
    const canCut = isValidText(node);
    const nodeLen = canCut ? String(node).length : 1;
    const nextLen = currLen + nodeLen;
    if (nextLen > len) {
      const restLen = len - currLen;
      currentNodeList.push(String(node).slice(0, restLen));
      return currentNodeList;
    }
    currentNodeList.push(node);
    currLen = nextLen;
  }
  return nodeList;
}
const STATUS_MEASURE_NONE = 0;
const STATUS_MEASURE_PREPARE = 1;
const STATUS_MEASURE_START = 2;
const STATUS_MEASURE_NEED_ELLIPSIS = 3;
const STATUS_MEASURE_NO_NEED_ELLIPSIS = 4;
const lineClipStyle = {
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical"
};
function EllipsisMeasure(props) {
  const {
    enableMeasure,
    width,
    text,
    children,
    rows,
    expanded,
    miscDeps,
    onEllipsis
  } = props;
  const nodeList = reactExports.useMemo(() => toArray$1(text), [text]);
  const nodeLen = reactExports.useMemo(() => getNodesLen(nodeList), [text]);
  const fullContent = reactExports.useMemo(() => children(nodeList, false), [text]);
  const [ellipsisCutIndex, setEllipsisCutIndex] = reactExports.useState(null);
  const cutMidRef = reactExports.useRef(null);
  const measureWhiteSpaceRef = reactExports.useRef(null);
  const needEllipsisRef = reactExports.useRef(null);
  const descRowsEllipsisRef = reactExports.useRef(null);
  const symbolRowEllipsisRef = reactExports.useRef(null);
  const [canEllipsis, setCanEllipsis] = reactExports.useState(false);
  const [needEllipsis, setNeedEllipsis] = reactExports.useState(STATUS_MEASURE_NONE);
  const [ellipsisHeight, setEllipsisHeight] = reactExports.useState(0);
  const [parentWhiteSpace, setParentWhiteSpace] = reactExports.useState(null);
  useLayoutEffect(() => {
    if (enableMeasure && width && nodeLen) {
      setNeedEllipsis(STATUS_MEASURE_PREPARE);
    } else {
      setNeedEllipsis(STATUS_MEASURE_NONE);
    }
  }, [width, text, rows, enableMeasure, nodeList]);
  useLayoutEffect(() => {
    var _a, _b, _c, _d;
    if (needEllipsis === STATUS_MEASURE_PREPARE) {
      setNeedEllipsis(STATUS_MEASURE_START);
      const nextWhiteSpace = measureWhiteSpaceRef.current && getComputedStyle(measureWhiteSpaceRef.current).whiteSpace;
      setParentWhiteSpace(nextWhiteSpace);
    } else if (needEllipsis === STATUS_MEASURE_START) {
      const isOverflow = !!((_a = needEllipsisRef.current) === null || _a === void 0 ? void 0 : _a.isExceed());
      setNeedEllipsis(isOverflow ? STATUS_MEASURE_NEED_ELLIPSIS : STATUS_MEASURE_NO_NEED_ELLIPSIS);
      setEllipsisCutIndex(isOverflow ? [0, nodeLen] : null);
      setCanEllipsis(isOverflow);
      const baseRowsEllipsisHeight = ((_b = needEllipsisRef.current) === null || _b === void 0 ? void 0 : _b.getHeight()) || 0;
      const descRowsEllipsisHeight = rows === 1 ? 0 : ((_c = descRowsEllipsisRef.current) === null || _c === void 0 ? void 0 : _c.getHeight()) || 0;
      const symbolRowEllipsisHeight = ((_d = symbolRowEllipsisRef.current) === null || _d === void 0 ? void 0 : _d.getHeight()) || 0;
      const maxRowsHeight = Math.max(
        baseRowsEllipsisHeight,
        // height of rows with ellipsis
        descRowsEllipsisHeight + symbolRowEllipsisHeight
      );
      setEllipsisHeight(maxRowsHeight + 1);
      onEllipsis(isOverflow);
    }
  }, [needEllipsis]);
  const cutMidIndex = ellipsisCutIndex ? Math.ceil((ellipsisCutIndex[0] + ellipsisCutIndex[1]) / 2) : 0;
  useLayoutEffect(() => {
    var _a;
    const [minIndex, maxIndex] = ellipsisCutIndex || [0, 0];
    if (minIndex !== maxIndex) {
      const midHeight = ((_a = cutMidRef.current) === null || _a === void 0 ? void 0 : _a.getHeight()) || 0;
      const isOverflow = midHeight > ellipsisHeight;
      let targetMidIndex = cutMidIndex;
      if (maxIndex - minIndex === 1) {
        targetMidIndex = isOverflow ? minIndex : maxIndex;
      }
      setEllipsisCutIndex(isOverflow ? [minIndex, targetMidIndex] : [targetMidIndex, maxIndex]);
    }
  }, [ellipsisCutIndex, cutMidIndex]);
  const finalContent = reactExports.useMemo(() => {
    if (!enableMeasure) {
      return children(nodeList, false);
    }
    if (needEllipsis !== STATUS_MEASURE_NEED_ELLIPSIS || !ellipsisCutIndex || ellipsisCutIndex[0] !== ellipsisCutIndex[1]) {
      const content = children(nodeList, false);
      if ([STATUS_MEASURE_NO_NEED_ELLIPSIS, STATUS_MEASURE_NONE].includes(needEllipsis)) {
        return content;
      }
      return /* @__PURE__ */ reactExports.createElement("span", {
        style: Object.assign(Object.assign({}, lineClipStyle), {
          WebkitLineClamp: rows
        })
      }, content);
    }
    return children(expanded ? nodeList : sliceNodes(nodeList, ellipsisCutIndex[0]), canEllipsis);
  }, [expanded, needEllipsis, ellipsisCutIndex, nodeList].concat(_toConsumableArray(miscDeps)));
  const measureStyle = {
    width,
    margin: 0,
    padding: 0,
    whiteSpace: parentWhiteSpace === "nowrap" ? "normal" : "inherit"
  };
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, finalContent, needEllipsis === STATUS_MEASURE_START && /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(MeasureText, {
    style: Object.assign(Object.assign(Object.assign({}, measureStyle), lineClipStyle), {
      WebkitLineClamp: rows
    }),
    ref: needEllipsisRef
  }, fullContent), /* @__PURE__ */ reactExports.createElement(MeasureText, {
    style: Object.assign(Object.assign(Object.assign({}, measureStyle), lineClipStyle), {
      WebkitLineClamp: rows - 1
    }),
    ref: descRowsEllipsisRef
  }, fullContent), /* @__PURE__ */ reactExports.createElement(MeasureText, {
    style: Object.assign(Object.assign(Object.assign({}, measureStyle), lineClipStyle), {
      WebkitLineClamp: 1
    }),
    ref: symbolRowEllipsisRef
  }, children([], true))), needEllipsis === STATUS_MEASURE_NEED_ELLIPSIS && ellipsisCutIndex && ellipsisCutIndex[0] !== ellipsisCutIndex[1] && /* @__PURE__ */ reactExports.createElement(MeasureText, {
    style: Object.assign(Object.assign({}, measureStyle), {
      top: 400
    }),
    ref: cutMidRef
  }, children(sliceNodes(nodeList, cutMidIndex), true)), needEllipsis === STATUS_MEASURE_PREPARE && /* @__PURE__ */ reactExports.createElement("span", {
    style: {
      whiteSpace: "inherit"
    },
    ref: measureWhiteSpaceRef
  }));
}
const EllipsisTooltip = ({
  enableEllipsis,
  isEllipsis,
  children,
  tooltipProps
}) => {
  if (!(tooltipProps === null || tooltipProps === void 0 ? void 0 : tooltipProps.title) || !enableEllipsis) {
    return children;
  }
  return /* @__PURE__ */ reactExports.createElement(Tooltip, Object.assign({
    open: isEllipsis ? void 0 : false
  }, tooltipProps), children);
};
var __rest$4 = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function wrapperDecorations({
  mark,
  code,
  underline,
  delete: del,
  strong,
  keyboard,
  italic
}, content) {
  let currentContent = content;
  function wrap(tag, needed) {
    if (!needed) {
      return;
    }
    currentContent = /* @__PURE__ */ reactExports.createElement(tag, {}, currentContent);
  }
  wrap("strong", strong);
  wrap("u", underline);
  wrap("del", del);
  wrap("code", code);
  wrap("mark", mark);
  wrap("kbd", keyboard);
  wrap("i", italic);
  return currentContent;
}
const ELLIPSIS_STR = "...";
const DECORATION_PROPS = ["delete", "mark", "code", "underline", "strong", "keyboard", "italic"];
const Base = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _a;
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    type,
    disabled,
    children,
    ellipsis,
    editable,
    copyable,
    component,
    title
  } = props, restProps = __rest$4(props, ["prefixCls", "className", "style", "type", "disabled", "children", "ellipsis", "editable", "copyable", "component", "title"]);
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const [textLocale] = useLocale("Text");
  const typographyRef = reactExports.useRef(null);
  const editIconRef = reactExports.useRef(null);
  const prefixCls = getPrefixCls("typography", customizePrefixCls);
  const textProps = omit(restProps, DECORATION_PROPS);
  const [enableEdit, editConfig] = useMergedConfig(editable);
  const [editing, setEditing] = useMergedState(false, {
    value: editConfig.editing
  });
  const {
    triggerType = ["icon"]
  } = editConfig;
  const triggerEdit = (edit) => {
    var _a2;
    if (edit) {
      (_a2 = editConfig.onStart) === null || _a2 === void 0 ? void 0 : _a2.call(editConfig);
    }
    setEditing(edit);
  };
  const prevEditing = usePrevious(editing);
  useLayoutEffect(() => {
    var _a2;
    if (!editing && prevEditing) {
      (_a2 = editIconRef.current) === null || _a2 === void 0 ? void 0 : _a2.focus();
    }
  }, [editing]);
  const onEditClick = (e2) => {
    e2 === null || e2 === void 0 ? void 0 : e2.preventDefault();
    triggerEdit(true);
  };
  const onEditChange = (value) => {
    var _a2;
    (_a2 = editConfig.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(editConfig, value);
    triggerEdit(false);
  };
  const onEditCancel = () => {
    var _a2;
    (_a2 = editConfig.onCancel) === null || _a2 === void 0 ? void 0 : _a2.call(editConfig);
    triggerEdit(false);
  };
  const [enableCopy, copyConfig] = useMergedConfig(copyable);
  const {
    copied,
    copyLoading,
    onClick: onCopyClick
  } = useCopyClick({
    copyConfig,
    children
  });
  const [isLineClampSupport, setIsLineClampSupport] = reactExports.useState(false);
  const [isTextOverflowSupport, setIsTextOverflowSupport] = reactExports.useState(false);
  const [isJsEllipsis, setIsJsEllipsis] = reactExports.useState(false);
  const [isNativeEllipsis, setIsNativeEllipsis] = reactExports.useState(false);
  const [isNativeVisible, setIsNativeVisible] = reactExports.useState(true);
  const [enableEllipsis, ellipsisConfig] = useMergedConfig(ellipsis, {
    expandable: false,
    symbol: (isExpanded) => isExpanded ? textLocale === null || textLocale === void 0 ? void 0 : textLocale.collapse : textLocale === null || textLocale === void 0 ? void 0 : textLocale.expand
  });
  const [expanded, setExpanded] = useMergedState(ellipsisConfig.defaultExpanded || false, {
    value: ellipsisConfig.expanded
  });
  const mergedEnableEllipsis = enableEllipsis && (!expanded || ellipsisConfig.expandable === "collapsible");
  const {
    rows = 1
  } = ellipsisConfig;
  const needMeasureEllipsis = reactExports.useMemo(() => (
    // Disable ellipsis
    mergedEnableEllipsis && // Provide suffix
    (ellipsisConfig.suffix !== void 0 || ellipsisConfig.onEllipsis || // Can't use css ellipsis since we need to provide the place for button
    ellipsisConfig.expandable || enableEdit || enableCopy)
  ), [mergedEnableEllipsis, ellipsisConfig, enableEdit, enableCopy]);
  useLayoutEffect(() => {
    if (enableEllipsis && !needMeasureEllipsis) {
      setIsLineClampSupport(isStyleSupport("webkitLineClamp"));
      setIsTextOverflowSupport(isStyleSupport("textOverflow"));
    }
  }, [needMeasureEllipsis, enableEllipsis]);
  const [cssEllipsis, setCssEllipsis] = reactExports.useState(mergedEnableEllipsis);
  const canUseCssEllipsis = reactExports.useMemo(() => {
    if (needMeasureEllipsis) {
      return false;
    }
    if (rows === 1) {
      return isTextOverflowSupport;
    }
    return isLineClampSupport;
  }, [needMeasureEllipsis, isTextOverflowSupport, isLineClampSupport]);
  useLayoutEffect(() => {
    setCssEllipsis(canUseCssEllipsis && mergedEnableEllipsis);
  }, [canUseCssEllipsis, mergedEnableEllipsis]);
  const isMergedEllipsis = mergedEnableEllipsis && (cssEllipsis ? isNativeEllipsis : isJsEllipsis);
  const cssTextOverflow = mergedEnableEllipsis && rows === 1 && cssEllipsis;
  const cssLineClamp = mergedEnableEllipsis && rows > 1 && cssEllipsis;
  const onExpandClick = (e2, info) => {
    var _a2;
    setExpanded(info.expanded);
    (_a2 = ellipsisConfig.onExpand) === null || _a2 === void 0 ? void 0 : _a2.call(ellipsisConfig, e2, info);
  };
  const [ellipsisWidth, setEllipsisWidth] = reactExports.useState(0);
  const onResize = ({
    offsetWidth
  }) => {
    setEllipsisWidth(offsetWidth);
  };
  const onJsEllipsis = (jsEllipsis) => {
    var _a2;
    setIsJsEllipsis(jsEllipsis);
    if (isJsEllipsis !== jsEllipsis) {
      (_a2 = ellipsisConfig.onEllipsis) === null || _a2 === void 0 ? void 0 : _a2.call(ellipsisConfig, jsEllipsis);
    }
  };
  reactExports.useEffect(() => {
    const textEle = typographyRef.current;
    if (enableEllipsis && cssEllipsis && textEle) {
      const currentEllipsis = isEleEllipsis(textEle);
      if (isNativeEllipsis !== currentEllipsis) {
        setIsNativeEllipsis(currentEllipsis);
      }
    }
  }, [enableEllipsis, cssEllipsis, children, cssLineClamp, isNativeVisible, ellipsisWidth]);
  reactExports.useEffect(() => {
    const textEle = typographyRef.current;
    if (typeof IntersectionObserver === "undefined" || !textEle || !cssEllipsis || !mergedEnableEllipsis) {
      return;
    }
    const observer = new IntersectionObserver(() => {
      setIsNativeVisible(!!textEle.offsetParent);
    });
    observer.observe(textEle);
    return () => {
      observer.disconnect();
    };
  }, [cssEllipsis, mergedEnableEllipsis]);
  const tooltipProps = useTooltipProps(ellipsisConfig.tooltip, editConfig.text, children);
  const topAriaLabel = reactExports.useMemo(() => {
    if (!enableEllipsis || cssEllipsis) {
      return void 0;
    }
    return [editConfig.text, children, title, tooltipProps.title].find(isValidText);
  }, [enableEllipsis, cssEllipsis, title, tooltipProps.title, isMergedEllipsis]);
  if (editing) {
    return /* @__PURE__ */ reactExports.createElement(Editable, {
      value: (_a = editConfig.text) !== null && _a !== void 0 ? _a : typeof children === "string" ? children : "",
      onSave: onEditChange,
      onCancel: onEditCancel,
      onEnd: editConfig.onEnd,
      prefixCls,
      className,
      style,
      direction,
      component,
      maxLength: editConfig.maxLength,
      autoSize: editConfig.autoSize,
      enterIcon: editConfig.enterIcon
    });
  }
  const renderExpand = () => {
    const {
      expandable,
      symbol
    } = ellipsisConfig;
    return expandable ? /* @__PURE__ */ reactExports.createElement("button", {
      type: "button",
      key: "expand",
      className: `${prefixCls}-${expanded ? "collapse" : "expand"}`,
      onClick: (e2) => onExpandClick(e2, {
        expanded: !expanded
      }),
      "aria-label": expanded ? textLocale.collapse : textLocale === null || textLocale === void 0 ? void 0 : textLocale.expand
    }, typeof symbol === "function" ? symbol(expanded) : symbol) : null;
  };
  const renderEdit = () => {
    if (!enableEdit) {
      return;
    }
    const {
      icon,
      tooltip,
      tabIndex
    } = editConfig;
    const editTitle = toArray$1(tooltip)[0] || (textLocale === null || textLocale === void 0 ? void 0 : textLocale.edit);
    const ariaLabel = typeof editTitle === "string" ? editTitle : "";
    return triggerType.includes("icon") ? /* @__PURE__ */ reactExports.createElement(Tooltip, {
      key: "edit",
      title: tooltip === false ? "" : editTitle
    }, /* @__PURE__ */ reactExports.createElement("button", {
      type: "button",
      ref: editIconRef,
      className: `${prefixCls}-edit`,
      onClick: onEditClick,
      "aria-label": ariaLabel,
      tabIndex
    }, icon || /* @__PURE__ */ reactExports.createElement(RefIcon$2, {
      role: "button"
    }))) : null;
  };
  const renderCopy = () => {
    if (!enableCopy) {
      return null;
    }
    return /* @__PURE__ */ reactExports.createElement(CopyBtn, Object.assign({
      key: "copy"
    }, copyConfig, {
      prefixCls,
      copied,
      locale: textLocale,
      onCopy: onCopyClick,
      loading: copyLoading,
      iconOnly: children === null || children === void 0
    }));
  };
  const renderOperations = (canEllipsis) => [canEllipsis && renderExpand(), renderEdit(), renderCopy()];
  const renderEllipsis = (canEllipsis) => [canEllipsis && !expanded && /* @__PURE__ */ reactExports.createElement("span", {
    "aria-hidden": true,
    key: "ellipsis"
  }, ELLIPSIS_STR), ellipsisConfig.suffix, renderOperations(canEllipsis)];
  return /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    onResize,
    disabled: !mergedEnableEllipsis
  }, (resizeRef) => /* @__PURE__ */ reactExports.createElement(EllipsisTooltip, {
    tooltipProps,
    enableEllipsis: mergedEnableEllipsis,
    isEllipsis: isMergedEllipsis
  }, /* @__PURE__ */ reactExports.createElement(Typography$1, Object.assign({
    className: classNames({
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-ellipsis`]: enableEllipsis,
      [`${prefixCls}-ellipsis-single-line`]: cssTextOverflow,
      [`${prefixCls}-ellipsis-multiple-line`]: cssLineClamp
    }, className),
    prefixCls: customizePrefixCls,
    style: Object.assign(Object.assign({}, style), {
      WebkitLineClamp: cssLineClamp ? rows : void 0
    }),
    component,
    ref: composeRef(resizeRef, typographyRef, ref),
    direction,
    onClick: triggerType.includes("text") ? onEditClick : void 0,
    "aria-label": topAriaLabel === null || topAriaLabel === void 0 ? void 0 : topAriaLabel.toString(),
    title
  }, textProps), /* @__PURE__ */ reactExports.createElement(EllipsisMeasure, {
    enableMeasure: mergedEnableEllipsis && !cssEllipsis,
    text: children,
    rows,
    width: ellipsisWidth,
    onEllipsis: onJsEllipsis,
    expanded,
    miscDeps: [copied, expanded, copyLoading, enableEdit, enableCopy, textLocale].concat(_toConsumableArray(DECORATION_PROPS.map((key) => props[key])))
  }, (node, canEllipsis) => wrapperDecorations(props, /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, node.length > 0 && canEllipsis && !expanded && topAriaLabel ? /* @__PURE__ */ reactExports.createElement("span", {
    key: "show-content",
    "aria-hidden": true
  }, node) : node, renderEllipsis(canEllipsis)))))));
});
var __rest$3 = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Link = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    ellipsis,
    rel,
    children,
    // @ts-expect-error: https://github.com/ant-design/ant-design/issues/26622
    navigate: _navigate
  } = props, restProps = __rest$3(props, ["ellipsis", "rel", "children", "navigate"]);
  const mergedProps = Object.assign(Object.assign({}, restProps), {
    rel: rel === void 0 && restProps.target === "_blank" ? "noopener noreferrer" : rel
  });
  return /* @__PURE__ */ reactExports.createElement(Base, Object.assign({}, mergedProps, {
    ref,
    ellipsis: !!ellipsis,
    component: "a"
  }), children);
});
var __rest$2 = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Paragraph = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    children
  } = props, restProps = __rest$2(props, ["children"]);
  return /* @__PURE__ */ reactExports.createElement(Base, Object.assign({
    ref
  }, restProps, {
    component: "div"
  }), children);
});
var __rest$1 = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Text = (props, ref) => {
  const {
    ellipsis,
    children
  } = props, restProps = __rest$1(props, ["ellipsis", "children"]);
  const mergedEllipsis = reactExports.useMemo(() => {
    if (ellipsis && typeof ellipsis === "object") {
      return omit(ellipsis, ["expandable", "rows"]);
    }
    return ellipsis;
  }, [ellipsis]);
  return /* @__PURE__ */ reactExports.createElement(Base, Object.assign({
    ref
  }, restProps, {
    ellipsis: mergedEllipsis,
    component: "span"
  }), children);
};
const Text$1 = /* @__PURE__ */ reactExports.forwardRef(Text);
var __rest = function(s, e2) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const TITLE_ELE_LIST = [1, 2, 3, 4, 5];
const Title = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    level = 1,
    children
  } = props, restProps = __rest(props, ["level", "children"]);
  const component = TITLE_ELE_LIST.includes(level) ? `h${level}` : `h1`;
  return /* @__PURE__ */ reactExports.createElement(Base, Object.assign({
    ref
  }, restProps, {
    component
  }), children);
});
const Typography = Typography$1;
Typography.Text = Text$1;
Typography.Link = Link;
Typography.Title = Title;
Typography.Paragraph = Paragraph;
/* @__PURE__ */ (function(_React$Component) {
  _inherits(DomWrapper, _React$Component);
  var _super = _createSuper(DomWrapper);
  function DomWrapper() {
    _classCallCheck(this, DomWrapper);
    return _super.apply(this, arguments);
  }
  _createClass(DomWrapper, [{
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return DomWrapper;
})(React.Component);
var defaultOptions = {
  subtree: true,
  childList: true,
  attributeFilter: ["style", "class"]
};
function useMutateObserver(nodeOrList, callback) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultOptions;
  reactExports.useEffect(function() {
    if (!canUseDom() || !nodeOrList) {
      return;
    }
    var instance;
    var nodeList = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList];
    if ("MutationObserver" in window) {
      instance = new MutationObserver(callback);
      nodeList.forEach(function(element) {
        instance.observe(element, options);
      });
    }
    return function() {
      var _instance, _instance2;
      (_instance = instance) === null || _instance === void 0 ? void 0 : _instance.takeRecords();
      (_instance2 = instance) === null || _instance2 === void 0 ? void 0 : _instance2.disconnect();
    };
  }, [options, nodeOrList]);
}
const FontGap = 3;
const prepareCanvas = (width, height, ratio = 1) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const realWidth = width * ratio;
  const realHeight = height * ratio;
  canvas.setAttribute("width", `${realWidth}px`);
  canvas.setAttribute("height", `${realHeight}px`);
  ctx.save();
  return [ctx, canvas, realWidth, realHeight];
};
const getRotatePos = (x, y, angle) => {
  const targetX = x * Math.cos(angle) - y * Math.sin(angle);
  const targetY = x * Math.sin(angle) + y * Math.cos(angle);
  return [targetX, targetY];
};
const useClips = () => {
  const getClips = (content, rotate, ratio, width, height, font, gapX, gapY) => {
    const [ctx, canvas, contentWidth, contentHeight] = prepareCanvas(width, height, ratio);
    if (content instanceof HTMLImageElement) {
      ctx.drawImage(content, 0, 0, contentWidth, contentHeight);
    } else {
      const {
        color,
        fontSize,
        fontStyle,
        fontWeight,
        fontFamily,
        textAlign
      } = font;
      const mergedFontSize = Number(fontSize) * ratio;
      ctx.font = `${fontStyle} normal ${fontWeight} ${mergedFontSize}px/${height}px ${fontFamily}`;
      ctx.fillStyle = color;
      ctx.textAlign = textAlign;
      ctx.textBaseline = "top";
      const contents = toList$1(content);
      contents === null || contents === void 0 ? void 0 : contents.forEach((item, index2) => {
        ctx.fillText(item !== null && item !== void 0 ? item : "", contentWidth / 2, index2 * (mergedFontSize + FontGap * ratio));
      });
    }
    const angle = Math.PI / 180 * Number(rotate);
    const maxSize = Math.max(width, height);
    const [rCtx, rCanvas, realMaxSize] = prepareCanvas(maxSize, maxSize, ratio);
    rCtx.translate(realMaxSize / 2, realMaxSize / 2);
    rCtx.rotate(angle);
    if (contentWidth > 0 && contentHeight > 0) {
      rCtx.drawImage(canvas, -contentWidth / 2, -contentHeight / 2);
    }
    let left = 0;
    let right = 0;
    let top = 0;
    let bottom = 0;
    const halfWidth = contentWidth / 2;
    const halfHeight = contentHeight / 2;
    const points = [[0 - halfWidth, 0 - halfHeight], [0 + halfWidth, 0 - halfHeight], [0 + halfWidth, 0 + halfHeight], [0 - halfWidth, 0 + halfHeight]];
    points.forEach(([x, y]) => {
      const [targetX, targetY] = getRotatePos(x, y, angle);
      left = Math.min(left, targetX);
      right = Math.max(right, targetX);
      top = Math.min(top, targetY);
      bottom = Math.max(bottom, targetY);
    });
    const cutLeft = left + realMaxSize / 2;
    const cutTop = top + realMaxSize / 2;
    const cutWidth = right - left;
    const cutHeight = bottom - top;
    const realGapX = gapX * ratio;
    const realGapY = gapY * ratio;
    const filledWidth = (cutWidth + realGapX) * 2;
    const filledHeight = cutHeight + realGapY;
    const [fCtx, fCanvas] = prepareCanvas(filledWidth, filledHeight);
    const drawImg = (targetX = 0, targetY = 0) => {
      fCtx.drawImage(rCanvas, cutLeft, cutTop, cutWidth, cutHeight, targetX, targetY, cutWidth, cutHeight);
    };
    drawImg();
    drawImg(cutWidth + realGapX, -cutHeight / 2 - realGapY / 2);
    drawImg(cutWidth + realGapX, +cutHeight / 2 + realGapY / 2);
    return [fCanvas.toDataURL(), filledWidth / ratio, filledHeight / ratio];
  };
  return React.useCallback(getClips, []);
};
function useRafDebounce(callback) {
  const executeRef = React.useRef(false);
  const rafRef = React.useRef(null);
  const wrapperCallback = useEvent(callback);
  return () => {
    if (executeRef.current) {
      return;
    }
    executeRef.current = true;
    wrapperCallback();
    rafRef.current = wrapperRaf(() => {
      executeRef.current = false;
    });
  };
}
function useSingletonCache() {
  const cacheRef = reactExports.useRef([null, null]);
  const getCache = (cacheKeys, callback) => {
    const filteredKeys = cacheKeys.map((item) => item instanceof HTMLElement || Number.isNaN(item) ? "" : item);
    if (!isEqual(cacheRef.current[0], filteredKeys)) {
      cacheRef.current = [filteredKeys, callback()];
    }
    return cacheRef.current[1];
  };
  return getCache;
}
function toLowercaseSeparator(key) {
  return key.replace(/([A-Z])/g, "-$1").toLowerCase();
}
function getStyleStr(style) {
  return Object.keys(style).map((key) => `${toLowercaseSeparator(key)}: ${style[key]};`).join(" ");
}
function getPixelRatio() {
  return window.devicePixelRatio || 1;
}
const reRendering = (mutation, isWatermarkEle) => {
  let flag = false;
  if (mutation.removedNodes.length) {
    flag = Array.from(mutation.removedNodes).some((node) => isWatermarkEle(node));
  }
  if (mutation.type === "attributes" && isWatermarkEle(mutation.target)) {
    flag = true;
  }
  return flag;
};
const emphasizedStyle = {
  visibility: "visible !important"
};
function useWatermark(markStyle) {
  const watermarkMap = reactExports.useRef(/* @__PURE__ */ new Map());
  const appendWatermark = (base64Url, markWidth, container) => {
    if (container) {
      if (!watermarkMap.current.get(container)) {
        const newWatermarkEle = document.createElement("div");
        watermarkMap.current.set(container, newWatermarkEle);
      }
      const watermarkEle = watermarkMap.current.get(container);
      watermarkEle.setAttribute("style", getStyleStr(Object.assign(Object.assign(Object.assign({}, markStyle), {
        backgroundImage: `url('${base64Url}')`,
        backgroundSize: `${Math.floor(markWidth)}px`
      }), emphasizedStyle)));
      watermarkEle.removeAttribute("class");
      watermarkEle.removeAttribute("hidden");
      if (watermarkEle.parentElement !== container) {
        container.append(watermarkEle);
      }
    }
    return watermarkMap.current.get(container);
  };
  const removeWatermark = (container) => {
    const watermarkEle = watermarkMap.current.get(container);
    if (watermarkEle && container) {
      container.removeChild(watermarkEle);
    }
    watermarkMap.current.delete(container);
  };
  const isWatermarkEle = (ele) => Array.from(watermarkMap.current.values()).includes(ele);
  return [appendWatermark, removeWatermark, isWatermarkEle];
}
function getSizeDiff(prev, next) {
  return prev.size === next.size ? prev : next;
}
const DEFAULT_GAP_X = 100;
const DEFAULT_GAP_Y = 100;
const fixedStyle = {
  position: "relative",
  overflow: "hidden"
};
const Watermark = (props) => {
  var _a, _b;
  const {
    /**
     * The antd content layer zIndex is basically below 10
     * https://github.com/ant-design/ant-design/blob/6192403b2ce517c017f9e58a32d58774921c10cd/components/style/themes/default.less#L335
     */
    zIndex = 9,
    rotate = -22,
    width,
    height,
    image,
    content,
    font = {},
    style,
    className,
    rootClassName,
    gap = [DEFAULT_GAP_X, DEFAULT_GAP_Y],
    offset,
    children,
    inherit = true
  } = props;
  const mergedStyle = Object.assign(Object.assign({}, fixedStyle), style);
  const [, token] = useToken$1();
  const {
    color = token.colorFill,
    fontSize = token.fontSizeLG,
    fontWeight = "normal",
    fontStyle = "normal",
    fontFamily = "sans-serif",
    textAlign = "center"
  } = font;
  const [gapX = DEFAULT_GAP_X, gapY = DEFAULT_GAP_Y] = gap;
  const gapXCenter = gapX / 2;
  const gapYCenter = gapY / 2;
  const offsetLeft = (_a = offset === null || offset === void 0 ? void 0 : offset[0]) !== null && _a !== void 0 ? _a : gapXCenter;
  const offsetTop = (_b = offset === null || offset === void 0 ? void 0 : offset[1]) !== null && _b !== void 0 ? _b : gapYCenter;
  const markStyle = React.useMemo(() => {
    const mergedMarkStyle = {
      zIndex,
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      backgroundRepeat: "repeat"
    };
    let positionLeft = offsetLeft - gapXCenter;
    let positionTop = offsetTop - gapYCenter;
    if (positionLeft > 0) {
      mergedMarkStyle.left = `${positionLeft}px`;
      mergedMarkStyle.width = `calc(100% - ${positionLeft}px)`;
      positionLeft = 0;
    }
    if (positionTop > 0) {
      mergedMarkStyle.top = `${positionTop}px`;
      mergedMarkStyle.height = `calc(100% - ${positionTop}px)`;
      positionTop = 0;
    }
    mergedMarkStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;
    return mergedMarkStyle;
  }, [zIndex, offsetLeft, gapXCenter, offsetTop, gapYCenter]);
  const [container, setContainer] = React.useState();
  const [subElements, setSubElements] = React.useState(() => /* @__PURE__ */ new Set());
  const targetElements = React.useMemo(() => {
    const list = container ? [container] : [];
    return [].concat(list, _toConsumableArray(Array.from(subElements)));
  }, [container, subElements]);
  const getMarkSize = (ctx) => {
    let defaultWidth = 120;
    let defaultHeight = 64;
    if (!image && ctx.measureText) {
      ctx.font = `${Number(fontSize)}px ${fontFamily}`;
      const contents = toList$1(content);
      const sizes = contents.map((item) => {
        const metrics = ctx.measureText(item);
        return [metrics.width, metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent];
      });
      defaultWidth = Math.ceil(Math.max.apply(Math, _toConsumableArray(sizes.map((size) => size[0]))));
      defaultHeight = Math.ceil(Math.max.apply(Math, _toConsumableArray(sizes.map((size) => size[1])))) * contents.length + (contents.length - 1) * FontGap;
    }
    return [width !== null && width !== void 0 ? width : defaultWidth, height !== null && height !== void 0 ? height : defaultHeight];
  };
  const getClips = useClips();
  const getClipsCache = useSingletonCache();
  const [watermarkInfo, setWatermarkInfo] = React.useState(null);
  const renderWatermark = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const ratio = getPixelRatio();
      const [markWidth, markHeight] = getMarkSize(ctx);
      const drawCanvas = (drawContent) => {
        const params = [drawContent || "", rotate, ratio, markWidth, markHeight, {
          color,
          fontSize,
          fontStyle,
          fontWeight,
          fontFamily,
          textAlign
        }, gapX, gapY];
        const [nextClips, clipWidth] = getClipsCache(params, () => getClips.apply(void 0, params));
        setWatermarkInfo([nextClips, clipWidth]);
      };
      if (image) {
        const img = new Image();
        img.onload = () => {
          drawCanvas(img);
        };
        img.onerror = () => {
          drawCanvas(content);
        };
        img.crossOrigin = "anonymous";
        img.referrerPolicy = "no-referrer";
        img.src = image;
      } else {
        drawCanvas(content);
      }
    }
  };
  const syncWatermark = useRafDebounce(renderWatermark);
  const [appendWatermark, removeWatermark, isWatermarkEle] = useWatermark(markStyle);
  reactExports.useEffect(() => {
    if (watermarkInfo) {
      targetElements.forEach((holder) => {
        appendWatermark(watermarkInfo[0], watermarkInfo[1], holder);
      });
    }
  }, [watermarkInfo, targetElements]);
  const onMutate = useEvent((mutations) => {
    mutations.forEach((mutation) => {
      if (reRendering(mutation, isWatermarkEle)) {
        syncWatermark();
      } else if (mutation.target === container && mutation.attributeName === "style") {
        const keyStyles = Object.keys(fixedStyle);
        for (let i = 0; i < keyStyles.length; i += 1) {
          const key = keyStyles[i];
          const oriValue = mergedStyle[key];
          const currentValue = container.style[key];
          if (oriValue && oriValue !== currentValue) {
            container.style[key] = oriValue;
          }
        }
      }
    });
  });
  useMutateObserver(targetElements, onMutate);
  reactExports.useEffect(syncWatermark, [rotate, zIndex, width, height, image, content, color, fontSize, fontWeight, fontStyle, fontFamily, textAlign, gapX, gapY, offsetLeft, offsetTop]);
  const watermarkContext = React.useMemo(() => ({
    add: (ele) => {
      setSubElements((prev) => {
        const clone = new Set(prev);
        clone.add(ele);
        return getSizeDiff(prev, clone);
      });
    },
    remove: (ele) => {
      removeWatermark(ele);
      setSubElements((prev) => {
        const clone = new Set(prev);
        clone.delete(ele);
        return getSizeDiff(prev, clone);
      });
    }
  }), []);
  const childNode = inherit ? /* @__PURE__ */ React.createElement(WatermarkContext.Provider, {
    value: watermarkContext
  }, children) : children;
  return /* @__PURE__ */ React.createElement("div", {
    ref: setContainer,
    className: classNames(className, rootClassName),
    style: mergedStyle
  }, childNode);
};
const antd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Affix,
  Alert,
  Anchor,
  App,
  AutoComplete,
  Avatar,
  BackTop: BackTop$1,
  Badge,
  Breadcrumb,
  Button: Button$1,
  Calendar,
  Card,
  Carousel,
  Cascader,
  Checkbox: Checkbox$1,
  Col,
  Collapse,
  ColorPicker,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown: Dropdown$1,
  Empty,
  Flex,
  FloatButton,
  Form,
  Grid: index$1,
  Image: Image$1,
  Input: Input$1,
  InputNumber: TypedInputNumber,
  Layout,
  List,
  Mentions,
  Menu,
  Modal,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  QRCode,
  Radio,
  Rate,
  Result,
  Row,
  Segmented,
  Select,
  Skeleton,
  Slider: Slider$1,
  Space,
  Spin,
  Splitter,
  Statistic,
  Steps,
  Switch,
  Table: ForwardTable,
  Tabs,
  Tag,
  TimePicker,
  Timeline,
  Tooltip,
  Tour: Tour2,
  Transfer,
  Tree: Tree$1,
  TreeSelect,
  Typography,
  Upload,
  Watermark,
  message: staticMethods$1,
  notification: staticMethods,
  theme: index,
  unstableSetRender,
  version
}, Symbol.toStringTag, { value: "Module" }));
function expose() {
  if (window.memberglutUI) {
    return window.memberglutUI;
  }
  window.memberglutUI = {
    version: 1,
    React,
    createRoot,
    antd,
    dayjs,
    i18n: { __, _n, sprintf },
    FontAwesomeIcon,
    Page,
    PageHeader,
    StatCard,
    StatusBadge,
    THEME,
    SettingsPanel,
    FieldRows,
    FieldControl,
    CopyCode,
    SmartTags,
    UNITS,
    UserSearch,
    api,
    lookups,
    format: format$1,
    link,
    queryArg,
    pages: _pg
  };
  return window.memberglutUI;
}
const uiKit = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  expose
}, Symbol.toStringTag, { value: "Module" }));
export {
  Result as R,
  expose as e,
  uiKit as u
};
