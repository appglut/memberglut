import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import { EmailsPage } from '../pages/Emails';

createRoot(document.getElementById('memberglut-root')).render(<EmailsPage />);
