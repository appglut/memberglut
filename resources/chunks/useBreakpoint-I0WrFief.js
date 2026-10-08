import { dJ as useToken, R as React, d7 as reactExports, dw as useLayoutEffect } from "./Page-uv7jJYOd.js";
import { av as useForceUpdate } from "./api-fY3e1Vcq.js";
const addMediaQueryListener = (mql, handler) => {
  if (typeof (mql === null || mql === void 0 ? void 0 : mql.addEventListener) !== "undefined") {
    mql.addEventListener("change", handler);
  } else if (typeof (mql === null || mql === void 0 ? void 0 : mql.addListener) !== "undefined") {
    mql.addListener(handler);
  }
};
const removeMediaQueryListener = (mql, handler) => {
  if (typeof (mql === null || mql === void 0 ? void 0 : mql.removeEventListener) !== "undefined") {
    mql.removeEventListener("change", handler);
  } else if (typeof (mql === null || mql === void 0 ? void 0 : mql.removeListener) !== "undefined") {
    mql.removeListener(handler);
  }
};
const responsiveArray = ["xxl", "xl", "lg", "md", "sm", "xs"];
const getResponsiveMap = (token) => ({
  xs: `(max-width: ${token.screenXSMax}px)`,
  sm: `(min-width: ${token.screenSM}px)`,
  md: `(min-width: ${token.screenMD}px)`,
  lg: `(min-width: ${token.screenLG}px)`,
  xl: `(min-width: ${token.screenXL}px)`,
  xxl: `(min-width: ${token.screenXXL}px)`
});
const validateBreakpoints = (token) => {
  const indexableToken = token;
  const revBreakpoints = [].concat(responsiveArray).reverse();
  revBreakpoints.forEach((breakpoint, i) => {
    const breakpointUpper = breakpoint.toUpperCase();
    const screenMin = `screen${breakpointUpper}Min`;
    const screen = `screen${breakpointUpper}`;
    if (!(indexableToken[screenMin] <= indexableToken[screen])) {
      throw new Error(`${screenMin}<=${screen} fails : !(${indexableToken[screenMin]}<=${indexableToken[screen]})`);
    }
    if (i < revBreakpoints.length - 1) {
      const screenMax = `screen${breakpointUpper}Max`;
      if (!(indexableToken[screen] <= indexableToken[screenMax])) {
        throw new Error(`${screen}<=${screenMax} fails : !(${indexableToken[screen]}<=${indexableToken[screenMax]})`);
      }
      const nextBreakpointUpperMin = revBreakpoints[i + 1].toUpperCase();
      const nextScreenMin = `screen${nextBreakpointUpperMin}Min`;
      if (!(indexableToken[screenMax] <= indexableToken[nextScreenMin])) {
        throw new Error(`${screenMax}<=${nextScreenMin} fails : !(${indexableToken[screenMax]}<=${indexableToken[nextScreenMin]})`);
      }
    }
  });
  return token;
};
const matchScreen = (screens, screenSizes) => {
  if (!screenSizes) {
    return;
  }
  for (const breakpoint of responsiveArray) {
    if (screens[breakpoint] && (screenSizes === null || screenSizes === void 0 ? void 0 : screenSizes[breakpoint]) !== void 0) {
      return screenSizes[breakpoint];
    }
  }
};
const useResponsiveObserver = () => {
  const [, token] = useToken();
  const responsiveMap = getResponsiveMap(validateBreakpoints(token));
  return React.useMemo(() => {
    const subscribers = /* @__PURE__ */ new Map();
    let subUid = -1;
    let screens = {};
    return {
      responsiveMap,
      matchHandlers: {},
      dispatch(pointMap) {
        screens = pointMap;
        subscribers.forEach((func) => func(screens));
        return subscribers.size >= 1;
      },
      subscribe(func) {
        if (!subscribers.size) {
          this.register();
        }
        subUid += 1;
        subscribers.set(subUid, func);
        func(screens);
        return subUid;
      },
      unsubscribe(paramToken) {
        subscribers.delete(paramToken);
        if (!subscribers.size) {
          this.unregister();
        }
      },
      register() {
        Object.entries(responsiveMap).forEach(([screen, mediaQuery]) => {
          const listener = ({
            matches
          }) => {
            this.dispatch(Object.assign(Object.assign({}, screens), {
              [screen]: matches
            }));
          };
          const mql = window.matchMedia(mediaQuery);
          addMediaQueryListener(mql, listener);
          this.matchHandlers[mediaQuery] = {
            mql,
            listener
          };
          listener(mql);
        });
      },
      unregister() {
        Object.values(responsiveMap).forEach((mediaQuery) => {
          const handler = this.matchHandlers[mediaQuery];
          removeMediaQueryListener(handler === null || handler === void 0 ? void 0 : handler.mql, handler === null || handler === void 0 ? void 0 : handler.listener);
        });
        subscribers.clear();
      }
    };
  }, [responsiveMap]);
};
function useBreakpoint(refreshOnChange = true, defaultScreens = {}) {
  const screensRef = reactExports.useRef(defaultScreens);
  const [, forceUpdate] = useForceUpdate();
  const responsiveObserver = useResponsiveObserver();
  useLayoutEffect(() => {
    const token = responsiveObserver.subscribe((supportScreens) => {
      screensRef.current = supportScreens;
      if (refreshOnChange) {
        forceUpdate();
      }
    });
    return () => responsiveObserver.unsubscribe(token);
  }, []);
  return screensRef.current;
}
export {
  matchScreen as m,
  responsiveArray as r,
  useBreakpoint as u
};
