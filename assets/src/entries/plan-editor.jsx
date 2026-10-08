import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import { PlanEditorPage } from '../pages/PlanEditor';

createRoot(document.getElementById('memberglut-root')).render(<PlanEditorPage />);
