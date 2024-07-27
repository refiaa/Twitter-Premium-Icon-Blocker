export class StorageManager {
    getSettings() {
        const settings = localStorage.getItem('twitterElementBlockerSettings');
        return settings ? JSON.parse(settings) : null;
    }

    saveSettings(settings) {
        localStorage.setItem('twitterElementBlockerSettings', JSON.stringify(settings));
    }
}