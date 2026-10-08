import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import { ContentRulesPage } from '../pages/ContentRules';

createRoot(document.getElementById('memberglut-root')).render(<ContentRulesPage />);
