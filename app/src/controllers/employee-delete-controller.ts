import { EmployeeDeleteView } from "../views/employee-delete-view.js";
import { Controller } from "./controller.js";

export class EmployeeDeleteController extends Controller {

    protected view = new EmployeeDeleteView('main');

    constructor() {
        super();
        this.build();
    }

    protected build(...info: any): void | Promise<void> {
        this.view.update();
    }

    protected setListeners(): void {
        throw new Error("Method not implemented.");
    }
}