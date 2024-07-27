// ==UserScript==
// @name         Twitter Element Blocker
// @namespace    https://github.com/refiaa
// @version      0.1
// @description  Block specific elements on Twitter
// @match        https://twitter.com/*
// @match        https://x.com/*
// @author       refiaa
// @grant        none
// @license      MIT
// ==/UserScript==

import { ElementBlocker } from './core/ElementBlocker';
import { DOMObserver } from './core/DOMObserver';
import { StorageManager } from './core/StorageManager';
import { SettingsViewModel } from './ui/SettingsViewModel';
import { defaultConfig } from './config/defaultConfig';
import { logger } from './utils/logger';

(function() {
    'use strict';

    const storageManager = new StorageManager();
    const settings = storageManager.getSettings() || defaultConfig;

    const elementBlocker = new ElementBlocker(settings);
    const domObserver = new DOMObserver(elementBlocker.applyRules.bind(elementBlocker));

    const settingsViewModel = new SettingsViewModel(settings, storageManager, elementBlocker);

    // Initialize
    domObserver.observe();
    settingsViewModel.initUI();

    logger.info('Twitter Element Blocker initialized');
})();