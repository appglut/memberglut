/**
 * Shared UI kit for add-ons (MemberGlut Pro and third parties): window.memberglutUI.
 *
 * Add-on admin scripts are plain scripts that must not bundle their own React. They read React, Ant Design and the
 * MemberGlut components from this object when they render (never at load time). The kit is loaded:
 *  - always on add-on screens (entries/addon.jsx),
 *  - on the built-in screens only when an add-on asks for it with `memberglutAdmin.needsKit = true`.
 */
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as antd from 'antd';
import dayjs from 'dayjs';
import { __, _n, sprintf } from '@wordpress/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Page, { PageHeader, StatCard, StatusBadge, THEME } from '../components/Page';
import SettingsPanel, { FieldRows, FieldControl, CopyCode, SmartTags, UNITS } from '../components/SettingsPanel';
import UserSearch from '../components/UserSearch';
import * as api from './api';
import * as lookups from './lookups';
import * as format from './format';
import { link, queryArg, _pg } from '../components/adminData';

export function expose() {
  if (window.memberglutUI) {
    return window.memberglutUI;
  }
  window.memberglutUI = {
    version: 1,
    React,
    createRoot: ReactDOMClient.createRoot,
    antd,
    dayjs,
    i18n: { __, _n, sprintf },
    FontAwesomeIcon,
    Page,
    PageHeader,
    StatCard,
    StatusBadge,
    THEME,
    SettingsPanel,
    FieldRows,
    FieldControl,
    CopyCode,
    SmartTags,
    UNITS,
    UserSearch,
    api,
    lookups,
    format,
    link,
    queryArg,
    pages: _pg,
  };
  return window.memberglutUI;
}
