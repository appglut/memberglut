import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import { CouponsPage } from '../pages/Coupons';

createRoot(document.getElementById('memberglut-root')).render(<CouponsPage />);
