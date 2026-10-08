import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import { RuleEditorPage } from '../pages/RuleEditor';

createRoot(document.getElementById('memberglut-root')).render(<RuleEditorPage />);
