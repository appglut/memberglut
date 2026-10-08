import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import { MembersPage } from '../pages/Members';

createRoot(document.getElementById('memberglut-root')).render(<MembersPage />);
