const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./uiKit-CAJFtRfb.js","./client-CTTyQOnd.js","../assets/client.css","./index-DBTNcr8l.js","./api-BoF1RtIE.js","./Table-DscmDL3I.js","./useBreakpoint-CN6HiEl_.js","./index-n8Z4Xk8Z.js","./index-BgqMaPE8.js","./index-BjzJaiPN.js","./index-d8vYGx8q.js","./index-DLAXZnY0.js","./lookups-2moJUDPH.js","./index-BedyQTUQ.js","./SettingsPanel-CL4JwW_5.js","./registry-Cs5PTTmS.js","./index-D-VkJOw2.js","./index-BoUobS93.js","./index-C6h9-TWP.js","./index-DNVHX8xZ.js","./index-42CDOxMR.js","./Timeline-BZkA49tz.js","./index-Cb3PZqfZ.js","./index-BYeBYKdc.js","./index-CmZYsh7n.js","./progress-Dds9qb8O.js","./index-B04HEf0N.js","./sprintf-DmNrJSYG.js","./UserSearch-BeTAvkOP.js","./format-CXuEAMXg.js"])))=>i.map(i=>d[i]);
import { aN as createRoot, dl as jsxRuntimeExports } from "./client-CTTyQOnd.js";
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
function boot(Screen) {
  const start = () => createRoot(document.getElementById("memberglut-root")).render(/* @__PURE__ */ jsxRuntimeExports.jsx(Screen, {}));
  const reg = window.memberglutAdmin || {};
  if (reg.needsKit) {
    __vitePreload(() => import("./uiKit-CAJFtRfb.js").then((n) => n.u), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]) : void 0, import.meta.url).then((m) => {
      m.expose();
      start();
    }).catch(start);
  } else {
    start();
  }
}
export {
  boot as b
};
