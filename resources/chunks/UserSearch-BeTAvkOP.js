import { dB as reactExports, dl as jsxRuntimeExports, ag as __ } from "./client-CTTyQOnd.js";
import { S as Select, aY as searchUsers } from "./api-BoF1RtIE.js";
import { S as Spin } from "./index-n8Z4Xk8Z.js";
function UserSearch({ value, onChange, placeholder }) {
  const [options, setOptions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const timer = reactExports.useRef();
  const search = (q) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLoading(true);
      searchUsers(q).then(setOptions).finally(() => setLoading(false));
    }, 250);
  };
  reactExports.useEffect(() => {
    search("");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Select,
    {
      showSearch: true,
      value,
      onChange,
      filterOption: false,
      onSearch: search,
      options,
      notFoundContent: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spin, { size: "small" }) : null,
      placeholder: placeholder || __("Search by name, username or email…", "memberglut")
    }
  );
}
export {
  UserSearch as U
};
