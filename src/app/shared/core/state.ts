let values: any = {};

function store() {
    values = {};
    const elements = document.getElementsByTagName('input');
    for (let i = 0; i < elements.length; i++) {
        const el = elements.item(i);
        values[el.id] = el.value;
    }
}

function restore() {
    for (const key in values) {
        const el = document.getElementById(key);
        if (el instanceof HTMLInputElement) {
            el.value = values[key];
        }
    }
    values = {};
}

export const state = { store, restore };