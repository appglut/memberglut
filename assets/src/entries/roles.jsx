import React from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import '../admin.css';
import { RolesPage } from '../pages/Roles';

createRoot(document.getElementById('memberglut-root')).render(<RolesPage />);
