import { state } from "../shared/core/state.js";
import { DomInjector } from "../shared/decorators/dom-injection-decorator.js";
import { Employee } from "../shared/models/Employee.js";
import { EmployeeService } from "../shared/services/employee-service.js";
import { EditEmployeeView } from "../views/edit-employee-view.js";
import { Controller } from "./controller.js";

export class EditEmployeeController extends Controller {

    @DomInjector('#find-employee-form')
    private searchForm: HTMLFormElement;

    @DomInjector('#employee-id-input')
    private idInput: HTMLInputElement;

    // Actual form
    @DomInjector('#edit-employee-form')
    private editForm: HTMLFormElement;

    @DomInjector('#input-editar-nome')
    private nameInput: HTMLInputElement;

    @DomInjector('#input-editar-idade')
    private ageInput: HTMLInputElement;

    @DomInjector('#input-editar-salario')
    private salaryInput: HTMLInputElement

    protected view = new EditEmployeeView('main');

    private service = new EmployeeService();
    private selectedEmployee: Employee;

    constructor() {
        super();
        this.build();
    }

    protected build(error?: string, employee?: Employee, edited = false): void | Promise<void> {
        this.view.update({ employee, error, edited });
        this.setListeners();
    }

    protected setListeners(): void {
        this.searchForm.addEventListener('submit', e => {
            e.preventDefault();
            this.fetchEmployee();
        });
        if (this.editForm) {
            this.editForm.addEventListener('submit', e => {
                e.preventDefault();
                this.deleteEmployee();
            });
        }
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

    private async deleteEmployee() {
        state.store();

        const name = this.nameInput.value;
        if (!name.trim()) {
            this.build('Informe um nome!', this.selectedEmployee);
            return;
        }

        const salary = this.salaryInput.value;
        if (!salary) {
            this.build('Informe um salário!', this.selectedEmployee);
            return;
        } else if (Number.isNaN(+salary)) {
            this.build('Informe um salário válido!', this.selectedEmployee);
            return;
        }

        const age = this.ageInput.value;
        if (!age) {
            this.build('Informe uma idade!', this.selectedEmployee);
            return;
        } else if (Number.isNaN(+age)) {
            this.build('Informe uma idade válida!', this.selectedEmployee);
            return;
        } else if (+age < 14) {
            this.build('Um funcionário precisa ter ao menos 14 anos!', this.selectedEmployee);
            return;
        }

        this.service.edit(this.selectedEmployee.id, name, +age, +salary)
            .then(() => this.build(null, null, true))
            .catch(() => {
                this.build('Houve um erro ao alterar funcionário, tente novamente', this.selectedEmployee);
                state.restore();
            })
        // this.service.createEmployee(name.trim(), +salary, +age).then(response => {
        //     this.build(null, true);
        // }).catch(() => {
        //     this.build('Houve um erro ao cadastrar funcionário, tente novamente');
        // })
    }
}