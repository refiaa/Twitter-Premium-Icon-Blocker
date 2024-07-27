export class DOMObserver {
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