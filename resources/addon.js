import { aN as createRoot, dl as jsxRuntimeExports, P as Page, ag as __ } from "./chunks/client-CTTyQOnd.js";
import { e as expose, R as Result } from "./chunks/uiKit-CAJFtRfb.js";
import "./chunks/index-DBTNcr8l.js";
import "./chunks/api-BoF1RtIE.js";
import "./chunks/Table-DscmDL3I.js";
import "./chunks/useBreakpoint-CN6HiEl_.js";
import "./chunks/index-n8Z4Xk8Z.js";
import "./chunks/index-BgqMaPE8.js";
import "./chunks/index-BjzJaiPN.js";
import "./chunks/index-d8vYGx8q.js";
import "./chunks/index-DLAXZnY0.js";
import "./chunks/lookups-2moJUDPH.js";
import "./chunks/index-BedyQTUQ.js";
import "./chunks/SettingsPanel-CL4JwW_5.js";
import "./chunks/registry-Cs5PTTmS.js";
import "./chunks/index-D-VkJOw2.js";
import "./chunks/index-BoUobS93.js";
import "./chunks/index-C6h9-TWP.js";
import "./chunks/index-DNVHX8xZ.js";
import "./chunks/index-42CDOxMR.js";
import "./chunks/Timeline-BZkA49tz.js";
import "./chunks/index-Cb3PZqfZ.js";
import "./chunks/index-BYeBYKdc.js";
import "./chunks/index-CmZYsh7n.js";
import "./chunks/progress-Dds9qb8O.js";
import "./chunks/index-B04HEf0N.js";
import "./chunks/sprintf-DmNrJSYG.js";
import "./chunks/UserSearch-BeTAvkOP.js";
import "./chunks/format-CXuEAMXg.js";
expose();
const admin = typeof memberglut_admin !== "undefined" ? memberglut_admin : {};
const key = admin.screen || "";
const def = ((window.memberglutAdmin || {}).screens || {})[key];
function Missing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Result,
    {
      status: "warning",
      title: __("This screen could not be loaded", "memberglut"),
      subTitle: __("The add-on that provides it is not active or its script did not load. Reload the page or reactivate the add-on.", "memberglut")
    }
  );
}
const Screen = def && def.component ? def.component : Missing;
createRoot(document.getElementById("memberglut-root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { active: def && def.active ? def.active : "", wide: !!(def && def.wide), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Screen, {}) })
);
