import { DomInjector } from "../shared/decorators/dom-injection-decorator.js";
import { ISidebarItem } from "../shared/models/SidebarItem.js";
import { SidebarView } from "../views/sidebar-view.js";
import { Controller } from "./controller.js";
import { EditEmployeeController } from "./edit-employee-controller.js";
import { EmployeeCreateFormController } from "./employee-create-form-controller.js";
import { EmployeeDeleteController } from "./employee-delete-controller.js";
import { EmployeesListController } from "./employees-list-controller.js";

export class SidebarController extends Controller {

    @DomInjector('#menu-list')
    private listButton: HTMLAnchorElement;

    @DomInjector('#menu-create')
    private createButton: HTMLAnchorElement;

    @DomInjector('#menu-delete')
    private deleteButton: HTMLAnchorElement;

    @DomInjector('#menu-edit')
    private editButton: HTMLAnchorElement;

    protected view = new SidebarView('#navigation-bar');
    
    private items: ISidebarItem[] = [
        { id: 'menu-list', icon: 'fa fa-list', description: 'Listar' },
        { id: 'menu-create', icon: 'fa fa-plus-square', description: 'Cadastrar' },
        { id: 'menu-delete', icon: 'fa fa-trash', description: 'Excluir' },
        { id: 'menu-edit', icon: 'fa fa-pen', description: 'Alterar' }
    ]
    private onPageChangeFn: (controller: Controller) => void

    constructor() {
        super();
        this.build();
    }

    protected build(): void | Promise<void> {
        this.view.update(this.items);
        this.setListeners();
    }

    protected setListeners(): void {
        this.listButton.addEventListener('click', e => {
            e.preventDefault();
            this.changePage(new EmployeesListController());
        });
        this.createButton.addEventListener('click', e => {
            e.preventDefault();
            this.changePage(new EmployeeCreateFormController());
        });
        this.deleteButton.addEventListener('click', e => {
            e.preventDefault();
            this.changePage(new EmployeeDeleteController());
        });
        this.editButton.addEventListener('click', e => {
            e.preventDefault();
            this.changePage(new EditEmployeeController());
        });
    }

    public onPageChange(callback: (controller: Controller) => void) {
        this.onPageChangeFn = callback;
    }

    private changePage(controller: Controller) {
        if (this.onPageChangeFn) {
            this.onPageChangeFn(controller);
        }
    }

}