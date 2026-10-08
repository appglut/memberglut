import { cs as genStyleHooks, db as resetComponent, dl as unit, d8 as reactExports, dr as useComponentConfig, ax as classNames, d3 as pickAttrs, C as CSSMotion, aB as composeRef, da as replaceElement, S as RefIcon, T as RefIcon$1, U as RefIcon$2, V as RefIcon$3, W as RefIcon$4, ag as _getPrototypeOf, am as _possibleConstructorReturn, ai as _isNativeReflectConstruct, ah as _inherits, ac as _createClass, ab as _classCallCheck, a8 as __, bP as faSliders, bO as faShieldHalved, bs as faLayerGroup, c5 as faUserTag, bJ as faRightToBracket, c3 as faUserSecret, bZ as faUserCheck, bw as faMessage, aK as faArrowRightFromBracket, bV as faTags, be as faEyeSlash, c8 as faVial, cV as jsxRuntimeExports, c as Button, q as FontAwesomeIcon, ca as faXmark, bF as faPlus, P as Page, b as App, d6 as queryArg, a_ as faChevronLeft, cW as link, aE as createRoot } from "./chunks/Page-DwAue1bn.js";
import { s as sprintf } from "./chunks/sprintf-DmNrJSYG.js";
import { S as SettingsPanel } from "./chunks/SettingsPanel-XQcr7b1d.js";
import { S as Select, g as Space, I as getRule, a2 as saveRule } from "./chunks/api-BB7d3L8U.js";
import { P as PAGES, b as PLANS, R as ROLES } from "./chunks/demoData-DdpKZU_N.js";
import { I as Input } from "./chunks/index-DR_RfPho.js";
import { S as Spin } from "./chunks/index-DYg9RGnF.js";
import "./chunks/index-CeeYjpwl.js";
import "./chunks/index-7xpZ3r7T.js";
import "./chunks/index-DAwOKiJ9.js";
import "./chunks/index-wzDtlKHr.js";
import "./chunks/index-jcrWDM9i.js";
import "./chunks/index-D6__SY_c.js";
import "./chunks/index-D0vDDvb0.js";
import "./chunks/index-BdHVDZgL.js";
const genAlertTypeStyle = (bgColor, borderColor, iconColor, token, alertCls) => ({
  background: bgColor,
  border: `${unit(token.lineWidth)} ${token.lineType} ${borderColor}`,
  [`${alertCls}-icon`]: {
    color: iconColor
  }
});
const genBaseStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow: duration,
    marginXS,
    marginSM,
    fontSize,
    fontSizeLG,
    lineHeight,
    borderRadiusLG: borderRadius,
    motionEaseInOutCirc,
    withDescriptionIconSize,
    colorText,
    colorTextHeading,
    withDescriptionPadding,
    defaultPadding
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      position: "relative",
      display: "flex",
      alignItems: "center",
      padding: defaultPadding,
      wordWrap: "break-word",
      borderRadius,
      [`&${componentCls}-rtl`]: {
        direction: "rtl"
      },
      [`${componentCls}-content`]: {
        flex: 1,
        minWidth: 0
      },
      [`${componentCls}-icon`]: {
        marginInlineEnd: marginXS,
        lineHeight: 0
      },
      "&-description": {
        display: "none",
        fontSize,
        lineHeight
      },
      "&-message": {
        color: colorTextHeading
      },
      [`&${componentCls}-motion-leave`]: {
        overflow: "hidden",
        opacity: 1,
        transition: `max-height ${duration} ${motionEaseInOutCirc}, opacity ${duration} ${motionEaseInOutCirc},
        padding-top ${duration} ${motionEaseInOutCirc}, padding-bottom ${duration} ${motionEaseInOutCirc},
        margin-bottom ${duration} ${motionEaseInOutCirc}`
      },
      [`&${componentCls}-motion-leave-active`]: {
        maxHeight: 0,
        marginBottom: "0 !important",
        paddingTop: 0,
        paddingBottom: 0,
        opacity: 0
      }
    }),
    [`${componentCls}-with-description`]: {
      alignItems: "flex-start",
      padding: withDescriptionPadding,
      [`${componentCls}-icon`]: {
        marginInlineEnd: marginSM,
        fontSize: withDescriptionIconSize,
        lineHeight: 0
      },
      [`${componentCls}-message`]: {
        display: "block",
        marginBottom: marginXS,
        color: colorTextHeading,
        fontSize: fontSizeLG
      },
      [`${componentCls}-description`]: {
        display: "block",
        color: colorText
      }
    },
    [`${componentCls}-banner`]: {
      marginBottom: 0,
      border: "0 !important",
      borderRadius: 0
    }
  };
};
const genTypeStyle = (token) => {
  const {
    componentCls,
    colorSuccess,
    colorSuccessBorder,
    colorSuccessBg,
    colorWarning,
    colorWarningBorder,
    colorWarningBg,
    colorError,
    colorErrorBorder,
    colorErrorBg,
    colorInfo,
    colorInfoBorder,
    colorInfoBg
  } = token;
  return {
    [componentCls]: {
      "&-success": genAlertTypeStyle(colorSuccessBg, colorSuccessBorder, colorSuccess, token, componentCls),
      "&-info": genAlertTypeStyle(colorInfoBg, colorInfoBorder, colorInfo, token, componentCls),
      "&-warning": genAlertTypeStyle(colorWarningBg, colorWarningBorder, colorWarning, token, componentCls),
      "&-error": Object.assign(Object.assign({}, genAlertTypeStyle(colorErrorBg, colorErrorBorder, colorError, token, componentCls)), {
        [`${componentCls}-description > pre`]: {
          margin: 0,
          padding: 0
        }
      })
    }
  };
};
const genActionStyle = (token) => {
  const {
    componentCls,
    iconCls,
    motionDurationMid,
    marginXS,
    fontSizeIcon,
    colorIcon,
    colorIconHover
  } = token;
  return {
    [componentCls]: {
      "&-action": {
        marginInlineStart: marginXS
      },
      [`${componentCls}-close-icon`]: {
        marginInlineStart: marginXS,
        padding: 0,
        overflow: "hidden",
        fontSize: fontSizeIcon,
        lineHeight: unit(fontSizeIcon),
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        cursor: "pointer",
        [`${iconCls}-close`]: {
          color: colorIcon,
          transition: `color ${motionDurationMid}`,
          "&:hover": {
            color: colorIconHover
          }
        }
      },
      "&-close-text": {
        color: colorIcon,
        transition: `color ${motionDurationMid}`,
        "&:hover": {
          color: colorIconHover
        }
      }
    }
  };
};
const prepareComponentToken = (token) => {
  const paddingHorizontal = 12;
  return {
    withDescriptionIconSize: token.fontSizeHeading3,
    defaultPadding: `${token.paddingContentVerticalSM}px ${paddingHorizontal}px`,
    withDescriptionPadding: `${token.paddingMD}px ${token.paddingContentHorizontalLG}px`
  };
};
const useStyle = genStyleHooks("Alert", (token) => [genBaseStyle(token), genTypeStyle(token), genActionStyle(token)], prepareComponentToken);
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const iconMapFilled = {
  success: RefIcon$3,
  info: RefIcon$2,
  error: RefIcon$1,
  warning: RefIcon
};
const IconNode = (props) => {
  const {
    icon,
    prefixCls,
    type
  } = props;
  const iconType = iconMapFilled[type] || null;
  if (icon) {
    return replaceElement(icon, /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-icon`
    }, icon), () => ({
      className: classNames(`${prefixCls}-icon`, icon.props.className)
    }));
  }
  return /* @__PURE__ */ reactExports.createElement(iconType, {
    className: `${prefixCls}-icon`
  });
};
const CloseIconNode = (props) => {
  const {
    isClosable,
    prefixCls,
    closeIcon,
    handleClose,
    ariaProps
  } = props;
  const mergedCloseIcon = closeIcon === true || closeIcon === void 0 ? /* @__PURE__ */ reactExports.createElement(RefIcon$4, null) : closeIcon;
  return isClosable ? /* @__PURE__ */ reactExports.createElement("button", Object.assign({
    type: "button",
    onClick: handleClose,
    className: `${prefixCls}-close-icon`,
    tabIndex: 0
  }, ariaProps), mergedCloseIcon) : null;
};
const Alert$1 = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    description,
    prefixCls: customizePrefixCls,
    message,
    banner,
    className,
    rootClassName,
    style,
    onMouseEnter,
    onMouseLeave,
    onClick,
    afterClose,
    showIcon,
    closable,
    closeText,
    closeIcon,
    action,
    id
  } = props, otherProps = __rest(props, ["description", "prefixCls", "message", "banner", "className", "rootClassName", "style", "onMouseEnter", "onMouseLeave", "onClick", "afterClose", "showIcon", "closable", "closeText", "closeIcon", "action", "id"]);
  const [closed, setClosed] = reactExports.useState(false);
  const internalRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => ({
    nativeElement: internalRef.current
  }));
  const {
    getPrefixCls,
    direction,
    closable: contextClosable,
    closeIcon: contextCloseIcon,
    className: contextClassName,
    style: contextStyle
  } = useComponentConfig("alert");
  const prefixCls = getPrefixCls("alert", customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const handleClose = (e) => {
    var _a;
    setClosed(true);
    (_a = props.onClose) === null || _a === void 0 ? void 0 : _a.call(props, e);
  };
  const type = reactExports.useMemo(() => {
    if (props.type !== void 0) {
      return props.type;
    }
    return banner ? "warning" : "info";
  }, [props.type, banner]);
  const isClosable = reactExports.useMemo(() => {
    if (typeof closable === "object" && closable.closeIcon) {
      return true;
    }
    if (closeText) {
      return true;
    }
    if (typeof closable === "boolean") {
      return closable;
    }
    if (closeIcon !== false && closeIcon !== null && closeIcon !== void 0) {
      return true;
    }
    return !!contextClosable;
  }, [closeText, closeIcon, closable, contextClosable]);
  const isShowIcon = banner && showIcon === void 0 ? true : showIcon;
  const alertCls = classNames(prefixCls, `${prefixCls}-${type}`, {
    [`${prefixCls}-with-description`]: !!description,
    [`${prefixCls}-no-icon`]: !isShowIcon,
    [`${prefixCls}-banner`]: !!banner,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, contextClassName, className, rootClassName, cssVarCls, hashId);
  const restProps = pickAttrs(otherProps, {
    aria: true,
    data: true
  });
  const mergedCloseIcon = reactExports.useMemo(() => {
    if (typeof closable === "object" && closable.closeIcon) {
      return closable.closeIcon;
    }
    if (closeText) {
      return closeText;
    }
    if (closeIcon !== void 0) {
      return closeIcon;
    }
    if (typeof contextClosable === "object" && contextClosable.closeIcon) {
      return contextClosable.closeIcon;
    }
    return contextCloseIcon;
  }, [closeIcon, closable, contextClosable, closeText, contextCloseIcon]);
  const mergedAriaProps = reactExports.useMemo(() => {
    const merged = closable !== null && closable !== void 0 ? closable : contextClosable;
    if (typeof merged === "object") {
      const {
        closeIcon: _
      } = merged, ariaProps = __rest(merged, ["closeIcon"]);
      return ariaProps;
    }
    return {};
  }, [closable, contextClosable]);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(CSSMotion, {
    visible: !closed,
    motionName: `${prefixCls}-motion`,
    motionAppear: false,
    motionEnter: false,
    onLeaveStart: (node) => ({
      maxHeight: node.offsetHeight
    }),
    onLeaveEnd: afterClose
  }, ({
    className: motionClassName,
    style: motionStyle
  }, setRef) => /* @__PURE__ */ reactExports.createElement("div", Object.assign({
    id,
    ref: composeRef(internalRef, setRef),
    "data-show": !closed,
    className: classNames(alertCls, motionClassName),
    style: Object.assign(Object.assign(Object.assign({}, contextStyle), style), motionStyle),
    onMouseEnter,
    onMouseLeave,
    onClick,
    role: "alert"
  }, restProps), isShowIcon ? /* @__PURE__ */ reactExports.createElement(IconNode, {
    description,
    icon: props.icon,
    prefixCls,
    type
  }) : null, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-content`
  }, message ? /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-message`
  }, message) : null, description ? /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-description`
  }, description) : null), action ? /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-action`
  }, action) : null, /* @__PURE__ */ reactExports.createElement(CloseIconNode, {
    isClosable,
    prefixCls,
    closeIcon: mergedCloseIcon,
    handleClose,
    ariaProps: mergedAriaProps
  }))));
});
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
let ErrorBoundary = /* @__PURE__ */ function(_React$Component) {
  function ErrorBoundary2() {
    var _this;
    _classCallCheck(this, ErrorBoundary2);
    _this = _callSuper(this, ErrorBoundary2, arguments);
    _this.state = {
      error: void 0,
      info: {
        componentStack: ""
      }
    };
    return _this;
  }
  _inherits(ErrorBoundary2, _React$Component);
  return _createClass(ErrorBoundary2, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      this.setState({
        error,
        info
      });
    }
  }, {
    key: "render",
    value: function render() {
      const {
        message,
        description,
        id,
        children
      } = this.props;
      const {
        error,
        info
      } = this.state;
      const componentStack = (info === null || info === void 0 ? void 0 : info.componentStack) || null;
      const errorMessage = typeof message === "undefined" ? (error || "").toString() : message;
      const errorDescription = typeof description === "undefined" ? componentStack : description;
      if (error) {
        return /* @__PURE__ */ reactExports.createElement(Alert$1, {
          id,
          type: "error",
          message: errorMessage,
          description: /* @__PURE__ */ reactExports.createElement("pre", {
            style: {
              fontSize: "0.9em",
              overflowX: "auto"
            }
          }, errorDescription)
        });
      }
      return children;
    }
  }]);
}(reactExports.Component);
const Alert = Alert$1;
Alert.ErrorBoundary = ErrorBoundary;
const TARGETS = [
  { value: "site", label: __("Whole site", "memberglut") },
  { value: "post_type", label: __("All of a post type", "memberglut") },
  { value: "pages", label: __("Specific pages", "memberglut") },
  { value: "posts", label: __("Specific posts", "memberglut") },
  { value: "children", label: __("Child pages of", "memberglut") },
  { value: "taxonomy", label: __("Posts in a category / tag", "memberglut") },
  { value: "archive", label: __("Archive & special pages", "memberglut") },
  { value: "author", label: __("Posts by author", "memberglut") },
  { value: "template", label: __("Page template", "memberglut") },
  { value: "url", label: __("URL pattern", "memberglut") }
];
const POST_TYPES = [{ value: "post", label: __("Posts", "memberglut") }, { value: "page", label: __("Pages", "memberglut") }, { value: "course", label: "Courses" }, { value: "lesson", label: "Lessons" }, { value: "download", label: "Downloads" }];
const POSTS = ["Ultimate Productivity Guide", "Live Q&A — March recording", "Members Lounge", "Course intro (free)", "Downloads", "Members Area"].map((t) => ({ value: t, label: t }));
const TERMS = ["Premium", "Tutorials", "Interviews", "News"].map((t) => ({ value: t, label: t }));
const ARCHIVES = [
  { value: "front", label: __("Front page", "memberglut") },
  { value: "blog", label: __("Blog page", "memberglut") },
  { value: "search", label: __("Search results", "memberglut") },
  { value: "404", label: __("404 page", "memberglut") },
  { value: "author_archive", label: __("Author archives", "memberglut") },
  { value: "pt_archive", label: __("Post type archives", "memberglut") }
];
function TargetList({ value = [], onChange, addLabel, empty }) {
  const set = (i, patch) => onChange(value.map((t, j) => j === i ? { ...t, ...patch } : t));
  const control = (t, i) => {
    switch (t.type) {
      case "site":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-muted", children: __("Everything except login, registration and password pages.", "memberglut") });
      case "post_type":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: t.post_type, onChange: (v) => set(i, { post_type: v }), options: POST_TYPES, placeholder: __("Post type", "memberglut"), style: { width: "100%" } });
      case "pages":
      case "posts":
      case "children":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", value: t.posts || [], onChange: (v) => set(i, { posts: v }), options: POSTS, placeholder: __("Search titles…", "memberglut"), style: { width: "100%" } });
      case "taxonomy":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Space.Compact, { style: { width: "100%" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: t.taxonomy || "category", onChange: (v) => set(i, { taxonomy: v }), options: [{ value: "category", label: __("Category", "memberglut") }, { value: "post_tag", label: __("Tag", "memberglut") }, { value: "course_cat", label: "Course category" }], style: { width: 150 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", value: t.terms || [], onChange: (v) => set(i, { terms: v }), options: TERMS, placeholder: __("Terms", "memberglut"), style: { flex: 1 } })
        ] });
      case "archive":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", value: t.archives || [], onChange: (v) => set(i, { archives: v }), options: ARCHIVES, style: { width: "100%" } });
      case "author":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { mode: "multiple", value: t.authors || [], onChange: (v) => set(i, { authors: v }), options: [{ value: "admin", label: "admin" }, { value: "editor", label: "editor" }], style: { width: "100%" } });
      case "template":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: t.template, onChange: (v) => set(i, { template: v }), options: [{ value: "full-width", label: "Full width" }, { value: "landing", label: "Landing" }], style: { width: "100%" } });
      case "url":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: t.pattern, onChange: (e) => set(i, { pattern: e.target.value }), placeholder: "/members/*  or  ^/course/[0-9]+/$" });
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-target-list", children: [
    value.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-fs-note", style: { marginTop: 0 }, children: empty }),
    value.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-target-row", children: [
      i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-or", children: __("OR", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: t.type, onChange: (v) => set(i, { type: v }), options: TARGETS, style: { width: 230 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-target-value", children: control(t, i) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "text", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faXmark }), onClick: () => onChange(value.filter((x, j) => j !== i)) })
    ] }, i)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faPlus }), onClick: () => onChange([...value, { type: "pages", posts: [] }]), children: addLabel })
  ] });
}
function AccessTester({ values }) {
  const [user, setUser] = reactExports.useState("guest");
  const [url, setUrl] = reactExports.useState("/premium/how-to-start/");
  const [result, setResult] = reactExports.useState(null);
  const check = () => {
    const allowed = user === "admin" || user === "gold" && values.who === "plans" && values.plans.includes(3);
    setResult(allowed ? { type: "success", text: __("Allowed: this user can see the content.", "memberglut") } : { type: "warning", text: sprintf(__("Blocked by “%s”. The visitor sees: %s.", "memberglut"), values.title || __("this rule", "memberglut"), values.action) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-tester", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: user, onChange: setUser, style: { width: 240 }, options: [
        { value: "guest", label: __("A logged-out visitor", "memberglut") },
        { value: "free", label: "aisha0 (Free)" },
        { value: "gold", label: "yusuf3 (Gold)" },
        { value: "admin", label: "admin (Administrator)" }
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: url, onChange: (e) => setUrl(e.target.value), addonBefore: __("URL", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "primary", onClick: check, children: __("Check", "memberglut") })
    ] }),
    result && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { style: { marginTop: 14 }, showIcon: true, type: result.type, message: result.text })
  ] });
}
const NEW_RULE = {
  title: "",
  status: "active",
  priority: 10,
  note: "",
  protect: [{ type: "taxonomy", taxonomy: "category", terms: [] }],
  exclude: [],
  include_children: true,
  who: "plans",
  plans: [],
  roles: [],
  users: [],
  logged_in_note: "",
  action: "inherit",
  redirect: "",
  custom_message: false,
  message: "",
  teaser: "inherit",
  in_lists: "inherit"
};
const SECTIONS = [
  {
    key: "rule",
    title: __("Rule", "memberglut"),
    icon: faSliders,
    desc: __("Name and priority. Only admins see the name.", "memberglut"),
    fields: [
      { key: "title", type: "text", label: __("Rule name", "memberglut"), placeholder: __("e.g. Premium articles", "memberglut") },
      { key: "status", type: "radio", label: __("Status", "memberglut"), options: [{ value: "active", label: __("Active", "memberglut") }, { value: "inactive", label: __("Inactive", "memberglut") }] },
      { key: "priority", type: "number", label: __("Priority", "memberglut"), tip: __("When two rules match the same content, the higher number decides.", "memberglut"), min: 0, max: 999 },
      { key: "note", type: "textarea", label: __("Admin note", "memberglut"), rows: 2 }
    ]
  },
  {
    key: "protect",
    title: __("Content to protect", "memberglut"),
    icon: faShieldHalved,
    desc: __("Matches any of the items below.", "memberglut"),
    renderTop: ({ values, update }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TargetList, { value: values.protect, onChange: (v) => update("protect", v), addLabel: __("Add content", "memberglut"), empty: __("Nothing selected yet.", "memberglut") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-fs-subhead", style: { marginTop: 26 }, children: [
        __("Except", "memberglut"),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: __("Leave these open even though they match above, e.g. a free first lesson.", "memberglut") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TargetList, { value: values.exclude, onChange: (v) => update("exclude", v), addLabel: __("Add exception", "memberglut"), empty: __("No exceptions.", "memberglut") })
    ] }),
    fields: [
      { key: "include_children", type: "switch", label: __("Include child pages", "memberglut"), tip: __("Child pages of a protected page are protected too.", "memberglut") }
    ]
  },
  {
    key: "access",
    title: __("Who can access", "memberglut"),
    icon: faUserCheck,
    desc: __("Everyone else is shown the action in “What others see”. Administrators always have access.", "memberglut"),
    fields: [
      {
        key: "who",
        type: "cards",
        label: __("Allow", "memberglut"),
        options: [
          { value: "plans", label: __("Members of plans", "memberglut"), icon: faLayerGroup, desc: __("Active or trialing members.", "memberglut") },
          { value: "roles", label: __("User roles", "memberglut"), icon: faUserTag, desc: __("Any user with one of the roles.", "memberglut") },
          { value: "logged_in", label: __("Logged-in users", "memberglut"), icon: faRightToBracket, desc: __("Any account, no plan needed.", "memberglut") },
          { value: "logged_out", label: __("Logged-out visitors", "memberglut"), icon: faUserSecret, desc: __("e.g. a “join now” landing page.", "memberglut") }
        ]
      },
      { key: "plans", type: "multiselect", label: __("Plans", "memberglut"), options: PLANS.map((p) => ({ value: p.id, label: p.name })), show: (v) => v.who === "plans" },
      { key: "roles", type: "multiselect", label: __("Roles", "memberglut"), options: ROLES.map((r) => ({ value: r.slug, label: r.name })), show: (v) => v.who === "roles" },
      { key: "users", type: "tags", label: __("Also allow these users", "memberglut"), tip: __("Usernames that always have access, whatever their plan.", "memberglut"), placeholder: "username", show: (v) => v.who !== "logged_out" }
    ]
  },
  {
    key: "action",
    title: __("What others see", "memberglut"),
    icon: faEyeSlash,
    desc: __("Leave on “Use global setting” to follow Global Settings › Content restriction.", "memberglut"),
    fields: [
      {
        key: "action",
        type: "cards",
        label: __("Action", "memberglut"),
        options: [
          { value: "inherit", label: __("Use global setting", "memberglut"), icon: faSliders },
          { value: "message", label: __("Show a message", "memberglut"), icon: faMessage },
          { value: "login", label: __("Show login form", "memberglut"), icon: faRightToBracket },
          { value: "redirect", label: __("Redirect", "memberglut"), icon: faArrowRightFromBracket },
          { value: "pricing", label: __("Pricing page", "memberglut"), icon: faTags }
        ]
      },
      { key: "redirect", type: "select", label: __("Redirect to", "memberglut"), options: PAGES, show: (v) => v.action === "redirect" },
      { key: "custom_message", type: "switch", label: __("Custom message for this rule", "memberglut"), show: (v) => ["message", "login", "inherit"].includes(v.action) },
      { key: "message", type: "editor", label: __("Message", "memberglut"), tip: __("Tags: {login_link}, {register_link}, {pricing_link}, {plans}.", "memberglut"), show: (v) => v.custom_message && ["message", "login", "inherit"].includes(v.action) },
      { key: "teaser", type: "select", label: __("Teaser", "memberglut"), options: [{ value: "inherit", label: __("Use global setting", "memberglut") }, { value: "none", label: __("None", "memberglut") }, { value: "excerpt", label: __("Excerpt", "memberglut") }, { value: "fade", label: __("Excerpt with fade", "memberglut") }], show: (v) => v.action !== "redirect" && v.action !== "pricing" },
      { key: "in_lists", type: "select", label: __("In blog, archives & search", "memberglut"), options: [{ value: "inherit", label: __("Use global setting", "memberglut") }, { value: "show_excerpt", label: __("Show with teaser only", "memberglut") }, { value: "hide", label: __("Hide", "memberglut") }] }
    ]
  },
  {
    key: "test",
    title: __("Test access", "memberglut"),
    icon: faVial,
    desc: __("Check what a user would see on a URL with the rule as it is now (unsaved changes included).", "memberglut"),
    render: (ctx) => /* @__PURE__ */ jsxRuntimeExports.jsx(AccessTester, { ...ctx })
  }
];
function RuleEditor() {
  const { message } = App.useApp();
  const id = queryArg("id");
  const plan = queryArg("plan");
  const [values, setValues] = reactExports.useState({ ...NEW_RULE, plans: plan ? [Number(plan)] : [] });
  const [loading, setLoading] = reactExports.useState(!!id);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!id) return;
    getRule(id).then((r) => {
      if (r) setValues({ ...NEW_RULE, ...r, who: r.access.who, plans: r.access.plans, roles: r.access.roles });
    }).finally(() => setLoading(false));
  }, [id]);
  const save = async (v) => {
    if (!v.title.trim()) {
      message.error(__("Give the rule a name.", "memberglut"));
      return false;
    }
    if (!v.protect.length) {
      message.error(__("Choose the content to protect.", "memberglut"));
      return false;
    }
    setSaving(true);
    await saveRule(v);
    setSaving(false);
    message.success(__("Rule saved.", "memberglut"));
    return true;
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mg-loading", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, { size: "large" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SettingsPanel,
    {
      back: { href: link("rules"), label: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FontAwesomeIcon, { icon: faChevronLeft }),
        " ",
        __("All rules", "memberglut")
      ] }) },
      title: id ? sprintf(__("Edit rule: %s", "memberglut"), values.title) : __("New content rule", "memberglut"),
      subtitle: __("Choose what to protect, who may see it, and what everyone else gets.", "memberglut"),
      sections: SECTIONS,
      initialSection: id ? "rule" : "protect",
      values,
      setValues,
      onSave: save,
      saving,
      saveLabel: __("Save rule", "memberglut")
    }
  );
}
function RuleEditorPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: "rules", wide: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RuleEditor, {}) });
}
createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(RuleEditorPage, {}));
