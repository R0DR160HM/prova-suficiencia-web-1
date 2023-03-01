export function DomInjector(selector: string) {

    return function(target: any, propKey: string) {
        const get = function() {
            return document.querySelector(selector);
        }

        Object.defineProperty(target, propKey, { get });
    }

}