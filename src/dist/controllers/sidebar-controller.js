var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DomInjector } from "../shared/decorators/dom-injection-decorator.js";
import { SidebarView } from "../views/sidebar-view.js";
import { Controller } from "./controller.js";
import { EditEmployeeController } from "./edit-employee-controller.js";
import { EmployeeCreateFormController } from "./employee-create-form-controller.js";
import { EmployeeDeleteController } from "./employee-delete-controller.js";
import { EmployeesListController } from "./employees-list-controller.js";
export class SidebarController extends Controller {
    constructor() {
        super();
        this.view = new SidebarView('#navigation-bar');
        this.items = [
            { id: 'menu-list', icon: 'fa fa-list', description: 'Listar' },
            { id: 'menu-create', icon: 'fa fa-plus-square', description: 'Cadastrar' },
            { id: 'menu-delete', icon: 'fa fa-trash', description: 'Excluir' },
            { id: 'menu-edit', icon: 'fa fa-pen', description: 'Alterar' }
        ];
        this.build();
    }
    build() {
        this.view.update(this.items);
        this.setListeners();
    }
    setListeners() {
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
    onPageChange(callback) {
        this.onPageChangeFn = callback;
    }
    changePage(controller) {
        if (this.onPageChangeFn) {
            this.onPageChangeFn(controller);
        }
    }
}
__decorate([
    DomInjector('#menu-list')
], SidebarController.prototype, "listButton", void 0);
__decorate([
    DomInjector('#menu-create')
], SidebarController.prototype, "createButton", void 0);
__decorate([
    DomInjector('#menu-delete')
], SidebarController.prototype, "deleteButton", void 0);
__decorate([
    DomInjector('#menu-edit')
], SidebarController.prototype, "editButton", void 0);
