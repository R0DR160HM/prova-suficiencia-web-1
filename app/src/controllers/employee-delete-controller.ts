import { DomInjector } from "../shared/decorators/dom-injection-decorator.js";
import { EmployeeDeleteView } from "../views/employee-delete-view.js";
import { Controller } from "./controller.js";

export class EmployeeDeleteController extends Controller {

    @DomInjector('#find-employee-form')
    private searchForm: HTMLFormElement;

    protected view = new EmployeeDeleteView('main');

    constructor() {
        super();
        this.build();
    }

    protected build(...info: any): void | Promise<void> {
        this.view.update({});
        this.setListeners();
    }

    protected setListeners(): void {
        this.searchForm.addEventListener('submit', e => {
            e.preventDefault();
        });
    }
}