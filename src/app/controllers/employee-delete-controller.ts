import { state } from "../shared/core/state.js";
import { DomInjector } from "../shared/decorators/dom-injection-decorator.js";
import { Employee } from "../shared/models/Employee.js";
import { EmployeeService } from "../shared/services/employee-service.js";
import { EmployeeDeleteView } from "../views/employee-delete-view.js";
import { Controller } from "./controller.js";

export class EmployeeDeleteController extends Controller {

    @DomInjector('#find-employee-form')
    private searchForm: HTMLFormElement;

    @DomInjector('#employee-id-input')
    private idInput: HTMLInputElement;

    @DomInjector('#delete-employee-form')
    private deleteForm: HTMLInputElement;

    protected view = new EmployeeDeleteView('main');

    private service = new EmployeeService();
    private selectedEmployee: Employee;

    constructor() {
        super();
        this.build();
    }

    protected build(error?: string, employee?: Employee, deleted = false): void | Promise<void> {
        this.view.update({ employee, error, deleted });
        this.setListeners();
    }

    protected setListeners(): void {
        this.searchForm.addEventListener('submit', e => {
            e.preventDefault();
            this.fetchEmployee();
        });
        this.deleteForm.addEventListener('submit', e => {
            e.preventDefault();
            const wantToDelete = confirm('Tem certeza que deseja excluir o funcionário selecionado?');
            if (wantToDelete) {
                this.deleteEmployee();
            }
        })
    }

    private async deleteEmployee() {
        state.store();
        this.service.delete(this.selectedEmployee.id)
            .then(() => this.build(null, null, true))
            .catch(() => {
                this.build('Houve um erro ao excluir funcionário, tente novamente', this.selectedEmployee)
                state.restore();
            });
    }

    private async fetchEmployee() {
        state.store();
        const id = +this.idInput.value;
        this.service.getById(id)
            .then(e => {
                this.selectedEmployee = e;
                this.build(null, e);
            })
            .catch(() => this.build('Houve um erro ao buscar funcionário, tente novamente'))
            .finally(() => state.restore());
    }
}