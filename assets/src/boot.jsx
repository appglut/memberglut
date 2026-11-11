import React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Mount a screen into #memberglut-root. When an add-on registered sections or rule items that render their own
 * components (memberglutAdmin.needsKit), the shared UI kit (window.memberglutUI) is loaded first.
 *
 * @param {Function} Screen Page component.
 */
export default function boot(Screen) {
  const start = () => createRoot(document.getElementById('memberglut-root')).render(<Screen />);
  const reg = window.memberglutAdmin || {};
  if (reg.needsKit) {
    import('./services/uiKit').then((m) => { m.expose(); start(); }).catch(start);
  } else {
    start();
  }
}
