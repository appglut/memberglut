import { d9 as reactExports, j as ConfigContext, dn as useCSSVarCls, dJ as useStyle, l as ConfirmContent, r as Footer, G as Panel, aw as classNames, da as renderCloseIcon, M as Modal$1, dD as useModal, aB as confirm, dT as withInfo, dU as withSuccess, dS as withError, dR as withConfirm, aF as destroyFns, d1 as modalGlobalConfig, dV as withWarn } from "./Page-Ch8DcxYv.js";
import { b5 as withPureRenderTheme } from "./api-C3opcxY4.js";
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const PurePanel = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    closeIcon,
    closable,
    type,
    title,
    children,
    footer
  } = props, restProps = __rest(props, ["prefixCls", "className", "closeIcon", "closable", "type", "title", "children", "footer"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const prefixCls = customizePrefixCls || getPrefixCls("modal");
  const rootCls = useCSSVarCls(rootPrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const confirmPrefixCls = `${prefixCls}-confirm`;
  let additionalProps = {};
  if (type) {
    additionalProps = {
      closable: closable !== null && closable !== void 0 ? closable : false,
      title: "",
      footer: "",
      children: /* @__PURE__ */ reactExports.createElement(ConfirmContent, Object.assign({}, props, {
        prefixCls,
        confirmPrefixCls,
        rootPrefixCls,
        content: children
      }))
    };
  } else {
    additionalProps = {
      closable: closable !== null && closable !== void 0 ? closable : true,
      title,
      footer: footer !== null && /* @__PURE__ */ reactExports.createElement(Footer, Object.assign({}, props)),
      children
    };
  }
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(Panel, Object.assign({
    prefixCls,
    className: classNames(hashId, `${prefixCls}-pure-panel`, type && confirmPrefixCls, type && `${confirmPrefixCls}-${type}`, className, cssVarCls, rootCls)
  }, restProps, {
    closeIcon: renderCloseIcon(prefixCls, closeIcon),
    closable
  }, additionalProps)));
};
const PurePanel$1 = withPureRenderTheme(PurePanel);
function modalWarn(props) {
  return confirm(withWarn(props));
}
const Modal = Modal$1;
Modal.useModal = useModal;
Modal.info = function infoFn(props) {
  return confirm(withInfo(props));
};
Modal.success = function successFn(props) {
  return confirm(withSuccess(props));
};
Modal.error = function errorFn(props) {
  return confirm(withError(props));
};
Modal.warning = modalWarn;
Modal.warn = modalWarn;
Modal.confirm = function confirmFn(props) {
  return confirm(withConfirm(props));
};
Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};
Modal.config = modalGlobalConfig;
Modal._InternalPanelDoNotUseOrYouWillBeFired = PurePanel$1;
export {
  Modal as M
};
