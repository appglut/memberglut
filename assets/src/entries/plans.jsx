import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import { PlansPage } from '../pages/Plans';

createRoot(document.getElementById('memberglut-root')).render(<PlansPage />);
