import { logger } from '../utils/logger';

export class SettingsViewModel {
    constructor(settings, storageManager, elementBlocker) {
        this.settings = settings;
        this.storageManager = storageManager;
        this.elementBlocker = elementBlocker;
    }

    initUI() {
        // Create and append settings UI elements
        const settingsButton = this.createSettingsButton();
        document.body.appendChild(settingsButton);
    }

    createSettingsButton() {
        const button = document.createElement('button');
        button.textContent = 'Twitter Element Blocker Settings';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.zIndex = '9999';
        button.addEventListener('click', this.openSettingsModal.bind(this));
        return button;
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