import React, { useEffect, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Select, Spin } from 'antd';
import * as api from '../services/api';

/** Async user search select (value = user ID). */
export default function UserSearch({ value, onChange, placeholder }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef();
  const search = (q) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLoading(true);
      api.searchUsers(q).then(setOptions).finally(() => setLoading(false));
    }, 250);
  };
  useEffect(() => { search(''); }, []);
  return (
    <Select showSearch value={value} onChange={onChange} filterOption={false} onSearch={search} options={options}
      notFoundContent={loading ? <Spin size="small" /> : null} placeholder={placeholder || __( 'Search by name, username or email…', 'memberglut' )} />
  );
}
