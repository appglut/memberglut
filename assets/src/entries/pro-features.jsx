import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import { ProFeaturesPage } from '../pages/ProFeatures';

createRoot(document.getElementById('memberglut-root')).render(<ProFeaturesPage />);
