import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import { MemberDetailPage } from '../pages/MemberDetail';

createRoot(document.getElementById('memberglut-root')).render(<MemberDetailPage />);
