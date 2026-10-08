import { d7 as reactExports, cr as genStyleHooks, cZ as merge, da as resetComponent, dk as unit, aA as composeRef, j as ConfigContext, dG as useSize, dl as useCSSVarCls, aw as classNames, _ as RefResizeObserver, dh as toArray, ay as cloneElement, cU as jsxRuntimeExports, aj as _n, a8 as __ } from "./Page-uv7jJYOd.js";
import { u as useBreakpoint, r as responsiveArray } from "./useBreakpoint-D8Ns16_a.js";
import { P as Popover } from "./index-BgGiENMb.js";
import { s as sprintf } from "./sprintf-DmNrJSYG.js";
import { d as dayjs } from "./dayjs.min-Cgo1VKL0.js";
import { a as planOptions } from "./lookups-CFy9Aj1i.js";
import { M as Modal } from "./index-C1Nz3hrP.js";
import { A as Alert } from "./index-Dxdfeq7i.js";
import { S as Select, R as Radio } from "./api-Bis6erdL.js";
import { T as TypedInputNumber, D as DatePicker } from "./index-DEtLiZPs.js";
import { F as Form } from "./index-sZSO_VI9.js";
const AvatarContext = /* @__PURE__ */ reactExports.createContext({});
const genBaseStyle = (token) => {
  const {
    antCls,
    componentCls,
    iconCls,
    avatarBg,
    avatarColor,
    containerSize,
    containerSizeLG,
    containerSizeSM,
    textFontSize,
    textFontSizeLG,
    textFontSizeSM,
    iconFontSize,
    iconFontSizeLG,
    iconFontSizeSM,
    borderRadius,
    borderRadiusLG,
    borderRadiusSM,
    lineWidth,
    lineType
  } = token;
  const avatarSizeStyle = (size, fontSize, iconFontSize2, radius) => ({
    width: size,
    height: size,
    borderRadius: "50%",
    fontSize,
    [`&${componentCls}-square`]: {
      borderRadius: radius
    },
    [`&${componentCls}-icon`]: {
      fontSize: iconFontSize2,
      [`> ${iconCls}`]: {
        margin: 0
      }
    }
  });
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, resetComponent(token)), {
      position: "relative",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      color: avatarColor,
      whiteSpace: "nowrap",
      textAlign: "center",
      verticalAlign: "middle",
      background: avatarBg,
      border: `${unit(lineWidth)} ${lineType} transparent`,
      "&-image": {
        background: "transparent"
      },
      [`${antCls}-image-img`]: {
        display: "block"
      }
    }), avatarSizeStyle(containerSize, textFontSize, iconFontSize, borderRadius)), {
      "&-lg": Object.assign({}, avatarSizeStyle(containerSizeLG, textFontSizeLG, iconFontSizeLG, borderRadiusLG)),
      "&-sm": Object.assign({}, avatarSizeStyle(containerSizeSM, textFontSizeSM, iconFontSizeSM, borderRadiusSM)),
      "> img": {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    })
  };
};
const genGroupStyle = (token) => {
  const {
    componentCls,
    groupBorderColor,
    groupOverlapping,
    groupSpace
  } = token;
  return {
    [`${componentCls}-group`]: {
      display: "inline-flex",
      [componentCls]: {
        borderColor: groupBorderColor
      },
      "> *:not(:first-child)": {
        marginInlineStart: groupOverlapping
      }
    },
    [`${componentCls}-group-popover`]: {
      [`${componentCls} + ${componentCls}`]: {
        marginInlineStart: groupSpace
      }
    }
  };
};
const prepareComponentToken = (token) => {
  const {
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    fontSize,
    fontSizeLG,
    fontSizeXL,
    fontSizeHeading3,
    marginXS,
    marginXXS,
    colorBorderBg
  } = token;
  return {
    containerSize: controlHeight,
    containerSizeLG: controlHeightLG,
    containerSizeSM: controlHeightSM,
    textFontSize: fontSize,
    textFontSizeLG: fontSize,
    textFontSizeSM: fontSize,
    iconFontSize: Math.round((fontSizeLG + fontSizeXL) / 2),
    iconFontSizeLG: fontSizeHeading3,
    iconFontSizeSM: fontSize,
    groupSpace: marginXXS,
    groupOverlapping: -marginXS,
    groupBorderColor: colorBorderBg
  };
};
const useStyle = genStyleHooks("Avatar", (token) => {
  const {
    colorTextLightSolid,
    colorTextPlaceholder
  } = token;
  const avatarToken = merge(token, {
    avatarBg: colorTextPlaceholder,
    avatarColor: colorTextLightSolid
  });
  return [genBaseStyle(avatarToken), genGroupStyle(avatarToken)];
}, prepareComponentToken);
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Avatar$1 = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    shape,
    size: customSize,
    src,
    srcSet,
    icon,
    className,
    rootClassName,
    style,
    alt,
    draggable,
    children,
    crossOrigin,
    gap = 4,
    onError
  } = props, others = __rest(props, ["prefixCls", "shape", "size", "src", "srcSet", "icon", "className", "rootClassName", "style", "alt", "draggable", "children", "crossOrigin", "gap", "onError"]);
  const [scale, setScale] = reactExports.useState(1);
  const [mounted, setMounted] = reactExports.useState(false);
  const [isImgExist, setIsImgExist] = reactExports.useState(true);
  const avatarNodeRef = reactExports.useRef(null);
  const avatarChildrenRef = reactExports.useRef(null);
  const avatarNodeMergedRef = composeRef(ref, avatarNodeRef);
  const {
    getPrefixCls,
    avatar
  } = reactExports.useContext(ConfigContext);
  const avatarCtx = reactExports.useContext(AvatarContext);
  const setScaleParam = () => {
    if (!avatarChildrenRef.current || !avatarNodeRef.current) {
      return;
    }
    const childrenWidth = avatarChildrenRef.current.offsetWidth;
    const nodeWidth = avatarNodeRef.current.offsetWidth;
    if (childrenWidth !== 0 && nodeWidth !== 0) {
      if (gap * 2 < nodeWidth) {
        setScale(nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1);
      }
    }
  };
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  reactExports.useEffect(() => {
    setIsImgExist(true);
    setScale(1);
  }, [src]);
  reactExports.useEffect(setScaleParam, [gap]);
  const handleImgLoadError = () => {
    const errorFlag = onError === null || onError === void 0 ? void 0 : onError();
    if (errorFlag !== false) {
      setIsImgExist(false);
    }
  };
  const size = useSize((ctxSize) => {
    var _a, _b;
    return (_b = (_a = customSize !== null && customSize !== void 0 ? customSize : avatarCtx === null || avatarCtx === void 0 ? void 0 : avatarCtx.size) !== null && _a !== void 0 ? _a : ctxSize) !== null && _b !== void 0 ? _b : "default";
  });
  const needResponsive = Object.keys(typeof size === "object" ? size || {} : {}).some((key) => ["xs", "sm", "md", "lg", "xl", "xxl"].includes(key));
  const screens = useBreakpoint(needResponsive);
  const responsiveSizeStyle = reactExports.useMemo(() => {
    if (typeof size !== "object") {
      return {};
    }
    const currentBreakpoint = responsiveArray.find((screen) => screens[screen]);
    const currentSize = size[currentBreakpoint];
    return currentSize ? {
      width: currentSize,
      height: currentSize,
      fontSize: currentSize && (icon || children) ? currentSize / 2 : 18
    } : {};
  }, [screens, size, icon, children]);
  const prefixCls = getPrefixCls("avatar", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const sizeCls = classNames({
    [`${prefixCls}-lg`]: size === "large",
    [`${prefixCls}-sm`]: size === "small"
  });
  const hasImageElement = /* @__PURE__ */ reactExports.isValidElement(src);
  const mergedShape = shape || (avatarCtx === null || avatarCtx === void 0 ? void 0 : avatarCtx.shape) || "circle";
  const classString = classNames(prefixCls, sizeCls, avatar === null || avatar === void 0 ? void 0 : avatar.className, `${prefixCls}-${mergedShape}`, {
    [`${prefixCls}-image`]: hasImageElement || src && isImgExist,
    [`${prefixCls}-icon`]: !!icon
  }, cssVarCls, rootCls, className, rootClassName, hashId);
  const sizeStyle = typeof size === "number" ? {
    width: size,
    height: size,
    fontSize: icon ? size / 2 : 18
  } : {};
  let childrenToRender;
  if (typeof src === "string" && isImgExist) {
    childrenToRender = /* @__PURE__ */ reactExports.createElement("img", {
      src,
      draggable,
      srcSet,
      onError: handleImgLoadError,
      alt,
      crossOrigin
    });
  } else if (hasImageElement) {
    childrenToRender = src;
  } else if (icon) {
    childrenToRender = icon;
  } else if (mounted || scale !== 1) {
    const transformString = `scale(${scale})`;
    const childrenStyle = {
      msTransform: transformString,
      WebkitTransform: transformString,
      transform: transformString
    };
    childrenToRender = /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
      onResize: setScaleParam
    }, /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-string`,
      ref: avatarChildrenRef,
      style: childrenStyle
    }, children));
  } else {
    childrenToRender = /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-string`,
      style: {
        opacity: 0
      },
      ref: avatarChildrenRef
    }, children);
  }
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement("span", Object.assign({}, others, {
    style: Object.assign(Object.assign(Object.assign(Object.assign({}, sizeStyle), responsiveSizeStyle), avatar === null || avatar === void 0 ? void 0 : avatar.style), style),
    className: classString,
    ref: avatarNodeMergedRef
  }), childrenToRender));
});
const AvatarContextProvider = (props) => {
  const {
    size,
    shape
  } = reactExports.useContext(AvatarContext);
  const avatarContextValue = reactExports.useMemo(() => ({
    size: props.size || size,
    shape: props.shape || shape
  }), [props.size, props.shape, size, shape]);
  return /* @__PURE__ */ reactExports.createElement(AvatarContext.Provider, {
    value: avatarContextValue
  }, props.children);
};
const AvatarGroup = (props) => {
  var _a, _b, _c, _d;
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    maxCount,
    maxStyle,
    size,
    shape,
    maxPopoverPlacement,
    maxPopoverTrigger,
    children,
    max
  } = props;
  const prefixCls = getPrefixCls("avatar", customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const cls = classNames(groupPrefixCls, {
    [`${groupPrefixCls}-rtl`]: direction === "rtl"
  }, cssVarCls, rootCls, className, rootClassName, hashId);
  const childrenWithProps = toArray(children).map((child, index) => cloneElement(child, {
    // eslint-disable-next-line react/no-array-index-key
    key: `avatar-key-${index}`
  }));
  const mergeCount = (max === null || max === void 0 ? void 0 : max.count) || maxCount;
  const numOfChildren = childrenWithProps.length;
  if (mergeCount && mergeCount < numOfChildren) {
    const childrenShow = childrenWithProps.slice(0, mergeCount);
    const childrenHidden = childrenWithProps.slice(mergeCount, numOfChildren);
    const mergeStyle = (max === null || max === void 0 ? void 0 : max.style) || maxStyle;
    const mergePopoverTrigger = ((_a = max === null || max === void 0 ? void 0 : max.popover) === null || _a === void 0 ? void 0 : _a.trigger) || maxPopoverTrigger || "hover";
    const mergePopoverPlacement = ((_b = max === null || max === void 0 ? void 0 : max.popover) === null || _b === void 0 ? void 0 : _b.placement) || maxPopoverPlacement || "top";
    const mergeProps = Object.assign(Object.assign({
      content: childrenHidden
    }, max === null || max === void 0 ? void 0 : max.popover), {
      classNames: {
        root: classNames(`${groupPrefixCls}-popover`, (_d = (_c = max === null || max === void 0 ? void 0 : max.popover) === null || _c === void 0 ? void 0 : _c.classNames) === null || _d === void 0 ? void 0 : _d.root)
      },
      placement: mergePopoverPlacement,
      trigger: mergePopoverTrigger
    });
    childrenShow.push(/* @__PURE__ */ reactExports.createElement(Popover, Object.assign({
      key: "avatar-popover-key",
      destroyOnHidden: true
    }, mergeProps), /* @__PURE__ */ reactExports.createElement(Avatar$1, {
      style: mergeStyle
    }, `+${numOfChildren - mergeCount}`)));
    return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(AvatarContextProvider, {
      shape,
      size
    }, /* @__PURE__ */ reactExports.createElement("div", {
      className: cls,
      style
    }, childrenShow)));
  }
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(AvatarContextProvider, {
    shape,
    size
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: cls,
    style
  }, childrenWithProps)));
};
const Avatar = Avatar$1;
Avatar.Group = AvatarGroup;
function ChangePlanModal({ open, count = 1, gatewayManaged, onCancel, onOk }) {
  const [plan, setPlan] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open) setPlan(null);
  }, [open]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      open,
      title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Change plan", "memberglut") }),
      onCancel,
      okButtonProps: { disabled: !plan },
      confirmLoading: saving,
      okText: __("Change plan", "memberglut"),
      onOk: async () => {
        setSaving(true);
        try {
          await onOk(plan);
        } finally {
          setSaving(false);
        }
      },
      destroyOnClose: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-modal-intro", children: sprintf(_n("The member keeps their dates; only the plan (and its role) changes.", "The %d members keep their dates; only the plan (and its role) changes.", count, "memberglut"), count) }),
        gatewayManaged && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { type: "warning", showIcon: true, style: { marginBottom: 12 }, message: __("This subscription is billed by a payment gateway. The change is made in MemberGlut only — the amount charged at the gateway stays the same.", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { value: plan, onChange: setPlan, options: planOptions(), placeholder: __("Choose a plan", "memberglut"), style: { width: "100%" } })
      ]
    }
  );
}
function ExtendModal({ open, count = 1, onCancel, onOk }) {
  const [mode, setMode] = reactExports.useState("days");
  const [days, setDays] = reactExports.useState(30);
  const [date, setDate] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open) {
      setMode("days");
      setDays(30);
      setDate(null);
    }
  }, [open]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      open,
      title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: __("Extend expiry", "memberglut") }),
      onCancel,
      confirmLoading: saving,
      okButtonProps: { disabled: mode === "date" && !date },
      okText: __("Extend", "memberglut"),
      onOk: async () => {
        setSaving(true);
        try {
          await onOk(mode === "days" ? { days } : { date: date.format("YYYY-MM-DD") });
        } finally {
          setSaving(false);
        }
      },
      destroyOnClose: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mg-modal-intro", children: sprintf(_n("Applies to %d subscription.", "Applies to %d subscriptions.", count, "memberglut"), count) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Radio.Group, { value: mode, onChange: (e) => setMode(e.target.value), style: { marginBottom: 14 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "days", children: __("Add days", "memberglut") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "date", children: __("Set a new date", "memberglut") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: mode === "days" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TypedInputNumber, { min: 1, max: 3650, value: days, onChange: (v) => setDays(v || 1), addonAfter: __("days", "memberglut") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { value: date, onChange: setDate, disabledDate: (d) => d && d < dayjs().startOf("day") }) })
      ]
    }
  );
}
function EditSubscriptionModal({ open, sub, isNew, onCancel, onOk, statuses }) {
  const [form] = Form.useForm();
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (open) {
      form.setFieldsValue(sub && !isNew ? { plan_id: sub.plan_id, status: sub.status, start: sub.started ? dayjs(sub.started) : null, expires: sub.expires ? dayjs(sub.expires) : null } : { plan_id: null, status: "active", start: dayjs(), expiry: "plan" });
    }
  }, [open]);
  const expiry = Form.useWatch("expiry", form);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Modal,
    {
      open,
      onCancel,
      confirmLoading: saving,
      title: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mg-modal-title", children: isNew ? __("Add a plan", "memberglut") : __("Edit subscription", "memberglut") }),
      okText: __("Save", "memberglut"),
      onOk: async () => {
        const v = await form.validateFields();
        setSaving(true);
        try {
          await onOk(v);
        } finally {
          setSaving(false);
        }
      },
      destroyOnClose: true,
      children: [
        sub && sub.gateway_managed && !isNew && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { type: "warning", showIcon: true, style: { marginBottom: 12 }, message: __("Billed by a payment gateway: plan and date changes are made in MemberGlut only. Cancel and Expire also stop the gateway subscription.", "memberglut") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { form, layout: "vertical", requiredMark: false, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "plan_id", label: __("Plan", "memberglut"), rules: [{ required: true, message: __("Choose a plan.", "memberglut") }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: planOptions() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "status", label: __("Status", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: Object.entries(statuses).filter(([k]) => !isNew || ["active", "trialing", "pending", "on_hold"].includes(k)).map(([value, label]) => ({ value, label })) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mg-form-grid", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "start", label: __("Start", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" } }) }),
            isNew ? /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "expiry", label: __("Expires", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { options: [{ value: "plan", label: __("From the plan’s duration", "memberglut") }, { value: "never", label: __("Never", "memberglut") }, { value: "date", label: __("On a date…", "memberglut") }] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "expires", label: __("Expires", "memberglut"), extra: __("Empty = never. A past date ends access now.", "memberglut"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" }, allowClear: true }) }),
            isNew && expiry === "date" && /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "expiry_date", label: __("Expiry date", "memberglut"), rules: [{ required: true }], children: /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { style: { width: "100%" } }) })
          ] })
        ] })
      ]
    }
  );
}
export {
  Avatar as A,
  ChangePlanModal as C,
  EditSubscriptionModal as E,
  ExtendModal as a
};
