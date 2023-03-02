export class View {
    constructor(selector) {
        this.parent = document.querySelector(selector);
        if (!this.parent) {
            throw new Error(`Class ${this.constructor.name} não conseguiu encontrar o elemento ${selector}!`);
        }
    }
    update(model) {
        const template = this.template(model);
        this.parent.innerHTML = template;
    }
}
