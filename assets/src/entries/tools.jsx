import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import { ToolsPage } from '../pages/Tools';

createRoot(document.getElementById('memberglut-root')).render(<ToolsPage />);
