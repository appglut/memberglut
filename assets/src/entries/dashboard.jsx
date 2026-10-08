import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import { DashboardPage } from '../pages/Dashboard';

createRoot(document.getElementById('memberglut-root')).render(<DashboardPage />);
