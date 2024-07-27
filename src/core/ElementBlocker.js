import { logger } from '../utils/logger';

export class ElementBlocker {
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