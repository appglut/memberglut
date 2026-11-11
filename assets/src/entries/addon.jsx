import 'antd/dist/reset.css';
import '../admin.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { __ } from '@wordpress/i18n';
import { Result } from 'antd';
import Page from '../components/Page';
import { expose } from '../services/uiKit';

/**
 * Host of add-on screens (pages added with the memberglut_admin_pages filter and [ 'screen' => key ]).
 *
 * The add-on registers the screen from its own script before this module runs:
 *   memberglutAdmin.registerScreen('pro-downloads', { component: DownloadsScreen, active: 'rules', wide: false });
 * The component reads React, Ant Design and the MemberGlut components from window.memberglutUI.
 */
expose();

const admin = typeof memberglut_admin !== 'undefined' ? memberglut_admin : {};
const key = admin.screen || '';
const def = ((window.memberglutAdmin || {}).screens || {})[key];

function Missing() {
  return (
    <Result
      status="warning"
      title={__( 'This screen could not be loaded', 'memberglut' )}
      subTitle={__( 'The add-on that provides it is not active or its script did not load. Reload the page or reactivate the add-on.', 'memberglut' )}
    />
  );
}

const Screen = def && def.component ? def.component : Missing;

createRoot(document.getElementById('memberglut-root')).render(
  <Page active={def && def.active ? def.active : ''} wide={!!(def && def.wide)}>
    <Screen />
  </Page>,
);
