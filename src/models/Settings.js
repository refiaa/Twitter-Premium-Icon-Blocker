export class Settings {
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