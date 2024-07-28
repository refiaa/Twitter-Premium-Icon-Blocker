// ==UserScript==
// @name         Twitter Element Blocker
// @namespace    https://github.com/refiaa
// @version      0.1
// @description
// @match        https://twitter.com/*
// @match        https://x.com/*
// @author       refiaa
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const logger = {
        info: (message) => console.log(`[Twitter Element Blocker] ${message}`),
        error: (message) => console.error(`[Twitter Element Blocker] ${message}`)
    };

    const selectors = {
        premiumSignup: 'a[href="/i/premium_sign_up"][data-testid="premium-signup-tab"]',
        verifiedOrgsSignup: 'a[href="/i/verified-orgs-signup"][data-testid="vo-signup-tab"]'
    };

    class BlockRule {
        constructor(selector, description) {
            this.selector = selector;
            this.description = description;
        }
    }

    class Settings {
        constructor(blockRules = []) {
            this.blockRules = blockRules;
        }

        addRule(rule) {
            this.blockRules.push(rule);
        }

        removeRule(index) {
            this.blockRules.splice(index, 1);
        }

        updateRule(index, newRule) {
            this.blockRules[index] = newRule;
        }
    }

    const defaultConfig = {
        blockRules: [
            new BlockRule(selectors.premiumSignup, 'Premium Signup'),
            new BlockRule(selectors.verifiedOrgsSignup, 'Verified Orgs Signup')
        ]
    };

    class ElementBlocker {
        constructor(settings) {
            this.settings = settings;
        }

        applyRules() {
            this.settings.blockRules.forEach(rule => {
                const elements = document.querySelectorAll(rule.selector);
                elements.forEach(element => {
                    element.style.display = 'none';
                    logger.info(`Blocked element: ${rule.selector}`);
                });
            });
        }

        updateSettings(newSettings) {
            this.settings = newSettings;
            this.applyRules();
        }
    }

    class DOMObserver {
        constructor(callback) {
            this.callback = callback;
            this.observer = new MutationObserver(this.handleMutations.bind(this));
        }

        observe() {
            this.observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        handleMutations(mutations) {
            for (let mutation of mutations) {
                if (mutation.type === 'childList') {
                    this.callback();
                    break;
                }
            }
        }

        disconnect() {
            this.observer.disconnect();
        }
    }

    class StorageManager {
        getSettings() {
            const settings = localStorage.getItem('twitterElementBlockerSettings');
            return settings ? JSON.parse(settings) : null;
        }

        saveSettings(settings) {
            localStorage.setItem('twitterElementBlockerSettings', JSON.stringify(settings));
        }
    }

    class SettingsViewModel {
        constructor(settings, storageManager, elementBlocker) {
            this.settings = settings;
            this.storageManager = storageManager;
            this.elementBlocker = elementBlocker;
        }

        initUI() {
            const settingsButton = this.createSettingsButton();
            document.body.appendChild(settingsButton);
        }

        createSettingsButton() {
            /*
                const button = document.createElement('button');
                button.textContent = 'Twitter Element Blocker Settings';
                button.style.position = 'fixed';
                button.style.bottom = '20px';
                button.style.right = '20px';
                button.style.zIndex = '9999';
                button.addEventListener('click', this.openSettingsModal.bind(this));
                return button;
            */
        }

        openSettingsModal() {
            // Implement settings modal UI
            logger.info('Settings modal opened');
        }

        saveSettings() {
            this.storageManager.saveSettings(this.settings);
            this.elementBlocker.updateSettings(this.settings);
            logger.info('Settings saved and applied');
        }
    }

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