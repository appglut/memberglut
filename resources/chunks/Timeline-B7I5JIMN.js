import { R as React, d8 as reactExports, di as toArray, aw as classNames, cs as genStyleHooks, c_ as merge, db as resetComponent, dl as unit, dh as textEllipsis, dr as useComponentConfig, dH as useSize, j as ConfigContext, aq as _toConsumableArray, X as RefIcon, dm as useCSSVarCls } from "./Page-BUA-PWqe.js";
import { m as matchScreen, u as useBreakpoint } from "./useBreakpoint-CSmdvqeW.js";
const DEFAULT_COLUMN_MAP = {
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1
};
const DescriptionsContext = /* @__PURE__ */ React.createContext({});
var __rest$5 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const transChildren2Items = (childNodes) => toArray(childNodes).map((node) => Object.assign(Object.assign({}, node === null || node === void 0 ? void 0 : node.props), {
  key: node.key
}));
function useItems$1(screens, items, children) {
  const mergedItems = reactExports.useMemo(() => (
    // Take `items` first or convert `children` into items
    items || transChildren2Items(children)
  ), [items, children]);
  const responsiveItems = reactExports.useMemo(() => mergedItems.map((_a) => {
    var {
      span
    } = _a, restItem = __rest$5(_a, ["span"]);
    if (span === "filled") {
      return Object.assign(Object.assign({}, restItem), {
        filled: true
      });
    }
    return Object.assign(Object.assign({}, restItem), {
      span: typeof span === "number" ? span : matchScreen(screens, span)
    });
  }), [mergedItems, screens]);
  return responsiveItems;
}
var __rest$4 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function getCalcRows(rowItems, mergedColumn) {
  let rows = [];
  let tmpRow = [];
  let exceed = false;
  let count = 0;
  rowItems.filter((n) => n).forEach((rowItem) => {
    const {
      filled
    } = rowItem, restItem = __rest$4(rowItem, ["filled"]);
    if (filled) {
      tmpRow.push(restItem);
      rows.push(tmpRow);
      tmpRow = [];
      count = 0;
      return;
    }
    const restSpan = mergedColumn - count;
    count += rowItem.span || 1;
    if (count >= mergedColumn) {
      if (count > mergedColumn) {
        exceed = true;
        tmpRow.push(Object.assign(Object.assign({}, restItem), {
          span: restSpan
        }));
      } else {
        tmpRow.push(restItem);
      }
      rows.push(tmpRow);
      tmpRow = [];
      count = 0;
    } else {
      tmpRow.push(restItem);
    }
  });
  if (tmpRow.length > 0) {
    rows.push(tmpRow);
  }
  rows = rows.map((rows2) => {
    const count2 = rows2.reduce((acc, item) => acc + (item.span || 1), 0);
    if (count2 < mergedColumn) {
      const last = rows2[rows2.length - 1];
      last.span = mergedColumn - (count2 - (last.span || 1));
      return rows2;
    }
    return rows2;
  });
  return [rows, exceed];
}
const useRow = (mergedColumn, items) => {
  const [rows, exceed] = reactExports.useMemo(() => getCalcRows(items, mergedColumn), [items, mergedColumn]);
  return rows;
};
const DescriptionsItem = ({
  children
}) => children;
const isNonNullable = (val) => {
  return val !== void 0 && val !== null;
};
const Cell = (props) => {
  const {
    itemPrefixCls,
    component,
    span,
    className,
    style,
    labelStyle,
    contentStyle,
    bordered,
    label,
    content,
    colon,
    type,
    styles
  } = props;
  const Component = component;
  const {
    classNames: ctxClassNames
  } = reactExports.useContext(DescriptionsContext);
  const mergedLabelStyle = Object.assign(Object.assign({}, labelStyle), styles === null || styles === void 0 ? void 0 : styles.label);
  const mergedContentStyle = Object.assign(Object.assign({}, contentStyle), styles === null || styles === void 0 ? void 0 : styles.content);
  if (bordered) {
    return /* @__PURE__ */ reactExports.createElement(Component, {
      colSpan: span,
      style,
      className: classNames(className, {
        [`${itemPrefixCls}-item-${type}`]: type === "label" || type === "content",
        [ctxClassNames === null || ctxClassNames === void 0 ? void 0 : ctxClassNames.label]: (ctxClassNames === null || ctxClassNames === void 0 ? void 0 : ctxClassNames.label) && type === "label",
        [ctxClassNames === null || ctxClassNames === void 0 ? void 0 : ctxClassNames.content]: (ctxClassNames === null || ctxClassNames === void 0 ? void 0 : ctxClassNames.content) && type === "content"
      })
    }, isNonNullable(label) && /* @__PURE__ */ reactExports.createElement("span", {
      style: mergedLabelStyle
    }, label), isNonNullable(content) && /* @__PURE__ */ reactExports.createElement("span", {
      style: mergedContentStyle
    }, content));
  }
  return /* @__PURE__ */ reactExports.createElement(Component, {
    colSpan: span,
    style,
    className: classNames(`${itemPrefixCls}-item`, className)
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: `${itemPrefixCls}-item-container`
  }, isNonNullable(label) && /* @__PURE__ */ reactExports.createElement("span", {
    style: mergedLabelStyle,
    className: classNames(`${itemPrefixCls}-item-label`, ctxClassNames === null || ctxClassNames === void 0 ? void 0 : ctxClassNames.label, {
      [`${itemPrefixCls}-item-no-colon`]: !colon
    })
  }, label), isNonNullable(content) && /* @__PURE__ */ reactExports.createElement("span", {
    style: mergedContentStyle,
    className: classNames(`${itemPrefixCls}-item-content`, ctxClassNames === null || ctxClassNames === void 0 ? void 0 : ctxClassNames.content)
  }, content)));
};
function renderCells(items, {
  colon,
  prefixCls,
  bordered
}, {
  component,
  type,
  showLabel,
  showContent,
  labelStyle: rootLabelStyle,
  contentStyle: rootContentStyle,
  styles: rootStyles
}) {
  return items.map(({
    label,
    children,
    prefixCls: itemPrefixCls = prefixCls,
    className,
    style,
    labelStyle,
    contentStyle,
    span = 1,
    key,
    styles
  }, index) => {
    if (typeof component === "string") {
      return /* @__PURE__ */ reactExports.createElement(Cell, {
        key: `${type}-${key || index}`,
        className,
        style,
        styles: {
          label: Object.assign(Object.assign(Object.assign(Object.assign({}, rootLabelStyle), rootStyles === null || rootStyles === void 0 ? void 0 : rootStyles.label), labelStyle), styles === null || styles === void 0 ? void 0 : styles.label),
          content: Object.assign(Object.assign(Object.assign(Object.assign({}, rootContentStyle), rootStyles === null || rootStyles === void 0 ? void 0 : rootStyles.content), contentStyle), styles === null || styles === void 0 ? void 0 : styles.content)
        },
        span,
        colon,
        component,
        itemPrefixCls,
        bordered,
        label: showLabel ? label : null,
        content: showContent ? children : null,
        type
      });
    }
    return [/* @__PURE__ */ reactExports.createElement(Cell, {
      key: `label-${key || index}`,
      className,
      style: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, rootLabelStyle), rootStyles === null || rootStyles === void 0 ? void 0 : rootStyles.label), style), labelStyle), styles === null || styles === void 0 ? void 0 : styles.label),
      span: 1,
      colon,
      component: component[0],
      itemPrefixCls,
      bordered,
      label,
      type: "label"
    }), /* @__PURE__ */ reactExports.createElement(Cell, {
      key: `content-${key || index}`,
      className,
      style: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, rootContentStyle), rootStyles === null || rootStyles === void 0 ? void 0 : rootStyles.content), style), contentStyle), styles === null || styles === void 0 ? void 0 : styles.content),
      span: span * 2 - 1,
      component: component[1],
      itemPrefixCls,
      bordered,
      content: children,
      type: "content"
    })];
  });
}
const Row = (props) => {
  const descContext = reactExports.useContext(DescriptionsContext);
  const {
    prefixCls,
    vertical,
    row,
    index,
    bordered
  } = props;
  if (vertical) {
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("tr", {
      key: `label-${index}`,
      className: `${prefixCls}-row`
    }, renderCells(row, props, Object.assign({
      component: "th",
      type: "label",
      showLabel: true
    }, descContext))), /* @__PURE__ */ reactExports.createElement("tr", {
      key: `content-${index}`,
      className: `${prefixCls}-row`
    }, renderCells(row, props, Object.assign({
      component: "td",
      type: "content",
      showContent: true
    }, descContext))));
  }
  return /* @__PURE__ */ reactExports.createElement("tr", {
    key: index,
    className: `${prefixCls}-row`
  }, renderCells(row, props, Object.assign({
    component: bordered ? ["th", "td"] : "td",
    type: "item",
    showLabel: true,
    showContent: true
  }, descContext)));
};
const genBorderedStyle = (token) => {
  const {
    componentCls,
    labelBg
  } = token;
  return {
    [`&${componentCls}-bordered`]: {
      [`> ${componentCls}-view`]: {
        border: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
        "> table": {
          tableLayout: "auto"
        },
        [`${componentCls}-row`]: {
          borderBottom: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
          "&:first-child": {
            "> th:first-child, > td:first-child": {
              borderStartStartRadius: token.borderRadiusLG
            }
          },
          "&:last-child": {
            borderBottom: "none",
            "> th:first-child, > td:first-child": {
              borderEndStartRadius: token.borderRadiusLG
            }
          },
          [`> ${componentCls}-item-label, > ${componentCls}-item-content`]: {
            padding: `${unit(token.padding)} ${unit(token.paddingLG)}`,
            borderInlineEnd: `${unit(token.lineWidth)} ${token.lineType} ${token.colorSplit}`,
            "&:last-child": {
              borderInlineEnd: "none"
            }
          },
          [`> ${componentCls}-item-label`]: {
            color: token.colorTextSecondary,
            backgroundColor: labelBg,
            "&::after": {
              display: "none"
            }
          }
        }
      },
      [`&${componentCls}-middle`]: {
        [`${componentCls}-row`]: {
          [`> ${componentCls}-item-label, > ${componentCls}-item-content`]: {
            padding: `${unit(token.paddingSM)} ${unit(token.paddingLG)}`
          }
        }
      },
      [`&${componentCls}-small`]: {
        [`${componentCls}-row`]: {
          [`> ${componentCls}-item-label, > ${componentCls}-item-content`]: {
            padding: `${unit(token.paddingXS)} ${unit(token.padding)}`
          }
        }
      }
    }
  };
};
const genDescriptionStyles = (token) => {
  const {
    componentCls,
    extraColor,
    itemPaddingBottom,
    itemPaddingEnd,
    colonMarginRight,
    colonMarginLeft,
    titleMarginBottom
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign(Object.assign({}, resetComponent(token)), genBorderedStyle(token)), {
      "&-rtl": {
        direction: "rtl"
      },
      [`${componentCls}-header`]: {
        display: "flex",
        alignItems: "center",
        marginBottom: titleMarginBottom
      },
      [`${componentCls}-title`]: Object.assign(Object.assign({}, textEllipsis), {
        flex: "auto",
        color: token.titleColor,
        fontWeight: token.fontWeightStrong,
        fontSize: token.fontSizeLG,
        lineHeight: token.lineHeightLG
      }),
      [`${componentCls}-extra`]: {
        marginInlineStart: "auto",
        color: extraColor,
        fontSize: token.fontSize
      },
      [`${componentCls}-view`]: {
        width: "100%",
        borderRadius: token.borderRadiusLG,
        table: {
          width: "100%",
          tableLayout: "fixed",
          borderCollapse: "collapse"
        }
      },
      [`${componentCls}-row`]: {
        "> th, > td": {
          paddingBottom: itemPaddingBottom,
          paddingInlineEnd: itemPaddingEnd
        },
        "> th:last-child, > td:last-child": {
          paddingInlineEnd: 0
        },
        "&:last-child": {
          borderBottom: "none",
          "> th, > td": {
            paddingBottom: 0
          }
        }
      },
      [`${componentCls}-item-label`]: {
        color: token.labelColor,
        fontWeight: "normal",
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        textAlign: "start",
        "&::after": {
          content: '":"',
          position: "relative",
          top: -0.5,
          // magic for position
          marginInline: `${unit(colonMarginLeft)} ${unit(colonMarginRight)}`
        },
        [`&${componentCls}-item-no-colon::after`]: {
          content: '""'
        }
      },
      [`${componentCls}-item-no-label`]: {
        "&::after": {
          margin: 0,
          content: '""'
        }
      },
      [`${componentCls}-item-content`]: {
        display: "table-cell",
        flex: 1,
        color: token.contentColor,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        wordBreak: "break-word",
        overflowWrap: "break-word"
      },
      [`${componentCls}-item`]: {
        paddingBottom: 0,
        verticalAlign: "top",
        "&-container": {
          display: "flex",
          [`${componentCls}-item-label`]: {
            display: "inline-flex",
            alignItems: "baseline"
          },
          [`${componentCls}-item-content`]: {
            display: "inline-flex",
            alignItems: "baseline",
            minWidth: "1em"
          }
        }
      },
      "&-middle": {
        [`${componentCls}-row`]: {
          "> th, > td": {
            paddingBottom: token.paddingSM
          }
        }
      },
      "&-small": {
        [`${componentCls}-row`]: {
          "> th, > td": {
            paddingBottom: token.paddingXS
          }
        }
      }
    })
  };
};
const prepareComponentToken$1 = (token) => ({
  labelBg: token.colorFillAlter,
  labelColor: token.colorTextTertiary,
  titleColor: token.colorText,
  titleMarginBottom: token.fontSizeSM * token.lineHeightSM,
  itemPaddingBottom: token.padding,
  itemPaddingEnd: token.padding,
  colonMarginRight: token.marginXS,
  colonMarginLeft: token.marginXXS / 2,
  contentColor: token.colorText,
  extraColor: token.colorText
});
const useStyle$1 = genStyleHooks("Descriptions", (token) => {
  const descriptionToken = merge(token, {});
  return genDescriptionStyles(descriptionToken);
}, prepareComponentToken$1);
var __rest$3 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Descriptions = (props) => {
  const {
    prefixCls: customizePrefixCls,
    title,
    extra,
    column,
    colon = true,
    bordered,
    layout,
    children,
    className,
    rootClassName,
    style,
    size: customizeSize,
    labelStyle,
    contentStyle,
    styles,
    items,
    classNames: descriptionsClassNames
  } = props, restProps = __rest$3(props, ["prefixCls", "title", "extra", "column", "colon", "bordered", "layout", "children", "className", "rootClassName", "style", "size", "labelStyle", "contentStyle", "styles", "items", "classNames"]);
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles
  } = useComponentConfig("descriptions");
  const prefixCls = getPrefixCls("descriptions", customizePrefixCls);
  const screens = useBreakpoint();
  const mergedColumn = reactExports.useMemo(() => {
    var _a;
    if (typeof column === "number") {
      return column;
    }
    return (_a = matchScreen(screens, Object.assign(Object.assign({}, DEFAULT_COLUMN_MAP), column))) !== null && _a !== void 0 ? _a : 3;
  }, [screens, column]);
  const mergedItems = useItems$1(screens, items, children);
  const mergedSize = useSize(customizeSize);
  const rows = useRow(mergedColumn, mergedItems);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle$1(prefixCls);
  const contextValue = reactExports.useMemo(() => ({
    labelStyle,
    contentStyle,
    styles: {
      content: Object.assign(Object.assign({}, contextStyles.content), styles === null || styles === void 0 ? void 0 : styles.content),
      label: Object.assign(Object.assign({}, contextStyles.label), styles === null || styles === void 0 ? void 0 : styles.label)
    },
    classNames: {
      label: classNames(contextClassNames.label, descriptionsClassNames === null || descriptionsClassNames === void 0 ? void 0 : descriptionsClassNames.label),
      content: classNames(contextClassNames.content, descriptionsClassNames === null || descriptionsClassNames === void 0 ? void 0 : descriptionsClassNames.content)
    }
  }), [labelStyle, contentStyle, styles, descriptionsClassNames, contextClassNames, contextStyles]);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(DescriptionsContext.Provider, {
    value: contextValue
  }, /* @__PURE__ */ reactExports.createElement("div", Object.assign({
    className: classNames(prefixCls, contextClassName, contextClassNames.root, descriptionsClassNames === null || descriptionsClassNames === void 0 ? void 0 : descriptionsClassNames.root, {
      [`${prefixCls}-${mergedSize}`]: mergedSize && mergedSize !== "default",
      [`${prefixCls}-bordered`]: !!bordered,
      [`${prefixCls}-rtl`]: direction === "rtl"
    }, className, rootClassName, hashId, cssVarCls),
    style: Object.assign(Object.assign(Object.assign(Object.assign({}, contextStyle), contextStyles.root), styles === null || styles === void 0 ? void 0 : styles.root), style)
  }, restProps), (title || extra) && /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(`${prefixCls}-header`, contextClassNames.header, descriptionsClassNames === null || descriptionsClassNames === void 0 ? void 0 : descriptionsClassNames.header),
    style: Object.assign(Object.assign({}, contextStyles.header), styles === null || styles === void 0 ? void 0 : styles.header)
  }, title && /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(`${prefixCls}-title`, contextClassNames.title, descriptionsClassNames === null || descriptionsClassNames === void 0 ? void 0 : descriptionsClassNames.title),
    style: Object.assign(Object.assign({}, contextStyles.title), styles === null || styles === void 0 ? void 0 : styles.title)
  }, title), extra && /* @__PURE__ */ reactExports.createElement("div", {
    className: classNames(`${prefixCls}-extra`, contextClassNames.extra, descriptionsClassNames === null || descriptionsClassNames === void 0 ? void 0 : descriptionsClassNames.extra),
    style: Object.assign(Object.assign({}, contextStyles.extra), styles === null || styles === void 0 ? void 0 : styles.extra)
  }, extra)), /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-view`
  }, /* @__PURE__ */ reactExports.createElement("table", null, /* @__PURE__ */ reactExports.createElement("tbody", null, rows.map((row, index) => /* @__PURE__ */ reactExports.createElement(Row, {
    key: index,
    index,
    colon,
    prefixCls,
    vertical: layout === "vertical",
    bordered,
    row
  }))))))));
};
Descriptions.Item = DescriptionsItem;
const genTimelineStyle = (token) => {
  const {
    componentCls,
    calc
  } = token;
  return {
    [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      margin: 0,
      padding: 0,
      listStyle: "none",
      [`${componentCls}-item`]: {
        position: "relative",
        margin: 0,
        paddingBottom: token.itemPaddingBottom,
        fontSize: token.fontSize,
        listStyle: "none",
        "&-tail": {
          position: "absolute",
          insetBlockStart: token.itemHeadSize,
          insetInlineStart: calc(calc(token.itemHeadSize).sub(token.tailWidth)).div(2).equal(),
          height: `calc(100% - ${unit(token.itemHeadSize)})`,
          borderInlineStart: `${unit(token.tailWidth)} ${token.lineType} ${token.tailColor}`
        },
        "&-pending": {
          [`${componentCls}-item-head`]: {
            fontSize: token.fontSizeSM,
            backgroundColor: "transparent"
          },
          [`${componentCls}-item-tail`]: {
            display: "none"
          }
        },
        "&-head": {
          position: "absolute",
          width: token.itemHeadSize,
          height: token.itemHeadSize,
          backgroundColor: token.dotBg,
          border: `${unit(token.dotBorderWidth)} ${token.lineType} transparent`,
          borderRadius: "50%",
          "&-blue": {
            color: token.colorPrimary,
            borderColor: token.colorPrimary
          },
          "&-red": {
            color: token.colorError,
            borderColor: token.colorError
          },
          "&-green": {
            color: token.colorSuccess,
            borderColor: token.colorSuccess
          },
          "&-gray": {
            color: token.colorTextDisabled,
            borderColor: token.colorTextDisabled
          }
        },
        "&-head-custom": {
          position: "absolute",
          insetBlockStart: calc(token.itemHeadSize).div(2).equal(),
          insetInlineStart: calc(token.itemHeadSize).div(2).equal(),
          width: "auto",
          height: "auto",
          marginBlockStart: 0,
          paddingBlock: token.customHeadPaddingVertical,
          lineHeight: 1,
          textAlign: "center",
          border: 0,
          borderRadius: 0,
          transform: "translate(-50%, -50%)"
        },
        "&-content": {
          position: "relative",
          insetBlockStart: calc(calc(token.fontSize).mul(token.lineHeight).sub(token.fontSize)).mul(-1).add(token.lineWidth).equal(),
          marginInlineStart: calc(token.margin).add(token.itemHeadSize).equal(),
          marginInlineEnd: 0,
          marginBlockStart: 0,
          marginBlockEnd: 0,
          wordBreak: "break-word"
        },
        "&-last": {
          [`> ${componentCls}-item-tail`]: {
            display: "none"
          },
          [`> ${componentCls}-item-content`]: {
            minHeight: calc(token.controlHeightLG).mul(1.2).equal()
          }
        }
      },
      [`&${componentCls}-alternate,
        &${componentCls}-right,
        &${componentCls}-label`]: {
        [`${componentCls}-item`]: {
          "&-tail, &-head, &-head-custom": {
            insetInlineStart: "50%"
          },
          "&-head": {
            marginInlineStart: calc(token.marginXXS).mul(-1).equal(),
            "&-custom": {
              marginInlineStart: calc(token.tailWidth).div(2).equal()
            }
          },
          "&-left": {
            [`${componentCls}-item-content`]: {
              insetInlineStart: `calc(50% - ${unit(token.marginXXS)})`,
              width: `calc(50% - ${unit(token.marginSM)})`,
              textAlign: "start"
            }
          },
          "&-right": {
            [`${componentCls}-item-content`]: {
              width: `calc(50% - ${unit(token.marginSM)})`,
              margin: 0,
              textAlign: "end"
            }
          }
        }
      },
      [`&${componentCls}-right`]: {
        [`${componentCls}-item-right`]: {
          [`${componentCls}-item-tail,
            ${componentCls}-item-head,
            ${componentCls}-item-head-custom`]: {
            insetInlineStart: `calc(100% - ${unit(calc(calc(token.itemHeadSize).add(token.tailWidth)).div(2).equal())})`
          },
          [`${componentCls}-item-content`]: {
            width: `calc(100% - ${unit(calc(token.itemHeadSize).add(token.marginXS).equal())})`
          }
        }
      },
      [`&${componentCls}-pending
        ${componentCls}-item-last
        ${componentCls}-item-tail`]: {
        display: "block",
        height: `calc(100% - ${unit(token.margin)})`,
        borderInlineStart: `${unit(token.tailWidth)} dotted ${token.tailColor}`
      },
      [`&${componentCls}-reverse
        ${componentCls}-item-last
        ${componentCls}-item-tail`]: {
        display: "none"
      },
      [`&${componentCls}-reverse ${componentCls}-item-pending`]: {
        [`${componentCls}-item-tail`]: {
          insetBlockStart: token.margin,
          display: "block",
          height: `calc(100% - ${unit(token.margin)})`,
          borderInlineStart: `${unit(token.tailWidth)} dotted ${token.tailColor}`
        },
        [`${componentCls}-item-content`]: {
          minHeight: calc(token.controlHeightLG).mul(1.2).equal()
        }
      },
      [`&${componentCls}-label`]: {
        [`${componentCls}-item-label`]: {
          position: "absolute",
          insetBlockStart: calc(calc(token.fontSize).mul(token.lineHeight).sub(token.fontSize)).mul(-1).add(token.tailWidth).equal(),
          width: `calc(50% - ${unit(token.marginSM)})`,
          textAlign: "end"
        },
        [`${componentCls}-item-right`]: {
          [`${componentCls}-item-label`]: {
            insetInlineStart: `calc(50% + ${unit(token.marginSM)})`,
            width: `calc(50% - ${unit(token.marginSM)})`,
            textAlign: "start"
          }
        }
      },
      // ====================== RTL =======================
      "&-rtl": {
        direction: "rtl",
        [`${componentCls}-item-head-custom`]: {
          transform: `translate(50%, -50%)`
        }
      }
    })
  };
};
const prepareComponentToken = (token) => ({
  tailColor: token.colorSplit,
  tailWidth: token.lineWidthBold,
  dotBorderWidth: token.wireframe ? token.lineWidthBold : token.lineWidth * 3,
  dotBg: token.colorBgContainer,
  itemPaddingBottom: token.padding * 1.25
});
const useStyle = genStyleHooks("Timeline", (token) => {
  const timeLineToken = merge(token, {
    itemHeadSize: 10,
    customHeadPaddingVertical: token.paddingXXS,
    paddingInlineEnd: 2
  });
  return genTimelineStyle(timeLineToken);
}, prepareComponentToken);
var __rest$2 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const TimelineItem = (_a) => {
  var {
    prefixCls: customizePrefixCls,
    className,
    color = "blue",
    dot,
    pending = false,
    position,
    label,
    children
  } = _a, restProps = __rest$2(_a, ["prefixCls", "className", "color", "dot", "pending", "position", "label", "children"]);
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const prefixCls = getPrefixCls("timeline", customizePrefixCls);
  const itemClassName = classNames(`${prefixCls}-item`, {
    [`${prefixCls}-item-pending`]: pending
  }, className);
  const customColor = /blue|red|green|gray/.test(color || "") ? void 0 : color;
  const dotClassName = classNames(`${prefixCls}-item-head`, {
    [`${prefixCls}-item-head-custom`]: !!dot,
    [`${prefixCls}-item-head-${color}`]: !customColor
  });
  return /* @__PURE__ */ reactExports.createElement("li", Object.assign({}, restProps, {
    className: itemClassName
  }), label && /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-item-label`
  }, label), /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-item-tail`
  }), /* @__PURE__ */ reactExports.createElement("div", {
    className: dotClassName,
    style: {
      borderColor: customColor,
      color: customColor
    }
  }, dot), /* @__PURE__ */ reactExports.createElement("div", {
    className: `${prefixCls}-item-content`
  }, children));
};
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const TimelineItemList = (_a) => {
  var {
    prefixCls,
    className,
    pending = false,
    children,
    items,
    rootClassName,
    reverse = false,
    direction,
    hashId,
    pendingDot,
    mode = ""
  } = _a, restProps = __rest$1(_a, ["prefixCls", "className", "pending", "children", "items", "rootClassName", "reverse", "direction", "hashId", "pendingDot", "mode"]);
  const getPositionCls = (position, idx) => {
    if (mode === "alternate") {
      if (position === "right") {
        return `${prefixCls}-item-right`;
      }
      if (position === "left") {
        return `${prefixCls}-item-left`;
      }
      return idx % 2 === 0 ? `${prefixCls}-item-left` : `${prefixCls}-item-right`;
    }
    if (mode === "left") {
      return `${prefixCls}-item-left`;
    }
    if (mode === "right") {
      return `${prefixCls}-item-right`;
    }
    if (position === "right") {
      return `${prefixCls}-item-right`;
    }
    return "";
  };
  const mergedItems = _toConsumableArray(items || []);
  const pendingNode = typeof pending === "boolean" ? null : pending;
  if (pending) {
    mergedItems.push({
      pending: !!pending,
      dot: pendingDot || /* @__PURE__ */ reactExports.createElement(RefIcon, null),
      children: pendingNode
    });
  }
  if (reverse) {
    mergedItems.reverse();
  }
  const itemsCount = mergedItems.length;
  const lastCls = `${prefixCls}-item-last`;
  const itemsList = mergedItems.filter((item) => !!item).map((item, idx) => {
    var _a2;
    const pendingClass = idx === itemsCount - 2 ? lastCls : "";
    const readyClass = idx === itemsCount - 1 ? lastCls : "";
    const {
      className: itemClassName
    } = item, itemProps = __rest$1(item, ["className"]);
    return /* @__PURE__ */ reactExports.createElement(TimelineItem, Object.assign({}, itemProps, {
      className: classNames([itemClassName, !reverse && !!pending ? pendingClass : readyClass, getPositionCls((_a2 = item === null || item === void 0 ? void 0 : item.position) !== null && _a2 !== void 0 ? _a2 : "", idx)]),
      key: (item === null || item === void 0 ? void 0 : item.key) || idx
    }));
  });
  const hasLabelItem = mergedItems.some((item) => !!(item === null || item === void 0 ? void 0 : item.label));
  const classString = classNames(prefixCls, {
    [`${prefixCls}-pending`]: !!pending,
    [`${prefixCls}-reverse`]: !!reverse,
    [`${prefixCls}-${mode}`]: !!mode && !hasLabelItem,
    [`${prefixCls}-label`]: hasLabelItem,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, rootClassName, hashId);
  return /* @__PURE__ */ reactExports.createElement("ol", Object.assign({}, restProps, {
    className: classString
  }), itemsList);
};
function useItems(items, children) {
  if (items && Array.isArray(items)) {
    return items;
  }
  return toArray(children).map((ele) => {
    var _a, _b;
    return Object.assign({
      children: (_b = (_a = ele === null || ele === void 0 ? void 0 : ele.props) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : ""
    }, ele.props);
  });
}
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Timeline = (props) => {
  const {
    getPrefixCls,
    direction,
    timeline
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    children,
    items,
    className,
    style
  } = props, restProps = __rest(props, ["prefixCls", "children", "items", "className", "style"]);
  const prefixCls = getPrefixCls("timeline", customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);
  const mergedItems = useItems(items, children);
  return wrapCSSVar(/* @__PURE__ */ reactExports.createElement(TimelineItemList, Object.assign({}, restProps, {
    className: classNames(timeline === null || timeline === void 0 ? void 0 : timeline.className, className, cssVarCls, rootCls),
    style: Object.assign(Object.assign({}, timeline === null || timeline === void 0 ? void 0 : timeline.style), style),
    prefixCls,
    direction,
    items: mergedItems,
    hashId
  })));
};
Timeline.Item = TimelineItem;
export {
  Descriptions as D,
  Timeline as T
};
