import { dB as reactExports, dM as toArray, l as ConfigContext, ej as useZIndex, du as omit, aG as classNames } from "./client-CTTyQOnd.js";
import { S as Select, _ as genPurePanel } from "./api-BoF1RtIE.js";
const {
  Option: Option$1
} = Select;
function isSelectOptionOrSelectOptGroup(child) {
  return (child === null || child === void 0 ? void 0 : child.type) && (child.type.isSelectOption || child.type.isSelectOptGroup);
}
const AutoComplete$1 = (props, ref) => {
  var _a, _b;
  const {
    prefixCls: customizePrefixCls,
    className,
    popupClassName,
    dropdownClassName,
    children,
    dataSource,
    dropdownStyle,
    dropdownRender,
    popupRender,
    onDropdownVisibleChange,
    onOpenChange,
    styles,
    classNames: classNames$1
  } = props;
  const childNodes = toArray(children);
  const mergedPopupStyle = ((_a = styles === null || styles === void 0 ? void 0 : styles.popup) === null || _a === void 0 ? void 0 : _a.root) || dropdownStyle;
  const mergedPopupClassName = ((_b = classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.popup) === null || _b === void 0 ? void 0 : _b.root) || popupClassName || dropdownClassName;
  const mergedPopupRender = popupRender || dropdownRender;
  const mergedOnOpenChange = onOpenChange || onDropdownVisibleChange;
  let customizeInput;
  if (childNodes.length === 1 && /* @__PURE__ */ reactExports.isValidElement(childNodes[0]) && !isSelectOptionOrSelectOptGroup(childNodes[0])) {
    [customizeInput] = childNodes;
  }
  const getInputElement = customizeInput ? () => customizeInput : void 0;
  let optionChildren;
  if (childNodes.length && isSelectOptionOrSelectOptGroup(childNodes[0])) {
    optionChildren = children;
  } else {
    optionChildren = dataSource ? dataSource.map((item) => {
      if (/* @__PURE__ */ reactExports.isValidElement(item)) {
        return item;
      }
      switch (typeof item) {
        case "string":
          return /* @__PURE__ */ reactExports.createElement(Option$1, {
            key: item,
            value: item
          }, item);
        case "object": {
          const {
            value: optionValue
          } = item;
          return /* @__PURE__ */ reactExports.createElement(Option$1, {
            key: optionValue,
            value: optionValue
          }, item.text);
        }
        default:
          return void 0;
      }
    }) : [];
  }
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("select", customizePrefixCls);
  const [zIndex] = useZIndex("SelectLike", mergedPopupStyle === null || mergedPopupStyle === void 0 ? void 0 : mergedPopupStyle.zIndex);
  return /* @__PURE__ */ reactExports.createElement(Select, Object.assign({
    ref,
    suffixIcon: null
  }, omit(props, ["dataSource", "dropdownClassName", "popupClassName"]), {
    prefixCls,
    classNames: {
      popup: {
        root: mergedPopupClassName
      },
      root: classNames$1 === null || classNames$1 === void 0 ? void 0 : classNames$1.root
    },
    styles: {
      popup: {
        root: Object.assign(Object.assign({}, mergedPopupStyle), {
          zIndex
        })
      },
      root: styles === null || styles === void 0 ? void 0 : styles.root
    },
    className: classNames(`${prefixCls}-auto-complete`, className),
    mode: Select.SECRET_COMBOBOX_MODE_DO_NOT_USE,
    popupRender: mergedPopupRender,
    onOpenChange: mergedOnOpenChange,
    // Internal api
    getInputElement
  }), optionChildren);
};
const RefAutoComplete = /* @__PURE__ */ reactExports.forwardRef(AutoComplete$1);
const {
  Option
} = Select;
const PurePanel = genPurePanel(RefAutoComplete, "dropdownAlign", (props) => omit(props, ["visible"]));
const AutoComplete = RefAutoComplete;
AutoComplete.Option = Option;
AutoComplete._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
export {
  AutoComplete as A
};
