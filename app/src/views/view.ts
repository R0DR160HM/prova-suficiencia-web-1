export abstract class View<T> {

    protected parent: HTMLElement;

    constructor(selector: string) {
        this.parent = document.querySelector(selector);
        if (!this.parent) {
            throw new Error(`Class ${this.constructor.name} não conseguiu encontrar o elemento ${selector}!`);
        }
    }

    protected abstract template(model?: T): string;

    public update(model?: T) {
        const template = this.template(model);
        this.parent.innerHTML = template;
    }

}