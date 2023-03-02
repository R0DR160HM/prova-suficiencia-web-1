export function DomInjector(selector) {
    return function (target, propKey) {
        const get = function () {
            return document.querySelector(selector);
        };
        Object.defineProperty(target, propKey, { get });
    };
}
