import { d8 as reactExports, cV as jsxRuntimeExports, a8 as __ } from "./Page-IjLhTpkA.js";
import { S as Select, aQ as searchUsers } from "./api-bTN0wgJl.js";
import { S as Spin } from "./index-Cx3mrKAm.js";
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
