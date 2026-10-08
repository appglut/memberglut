import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import { FormsPagesPage } from '../pages/FormsPages';

createRoot(document.getElementById('memberglut-root')).render(<FormsPagesPage />);
