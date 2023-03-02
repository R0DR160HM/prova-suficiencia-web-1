import { View } from "../views/view.js";

export abstract class Controller {

    protected abstract view: View<any>;
    protected abstract build(...info: any): Promise<void> | void;
    protected abstract setListeners(): void;

}