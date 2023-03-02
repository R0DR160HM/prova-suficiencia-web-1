import { state } from "../shared/core/state.js";
import { DomInjector } from "../shared/decorators/dom-injection-decorator.js";
import { EmployeeService } from "../shared/services/employee-service.js";
import { EmployeeCreateFormView } from "../views/employee-create-form-view.js";
import { Controller } from "./controller.js";

export class EmployeeCreateFormController extends Controller {

    @DomInjector('#new-employee-form')
    private form: HTMLFormElement;

    @DomInjector('#employee-create-name')
    private nameInput: HTMLInputElement;

    @DomInjector('#employee-create-salary')
    private salaryInput: HTMLInputElement;

    @DomInjector('#employee-create-age')
    private ageInput: HTMLInputElement;
    
    protected view = new EmployeeCreateFormView('main');

    private service = new EmployeeService();

    constructor() {
        super();
        this.build();
    }

    protected build(error?: string, success = false): void | Promise<void> {
        this.view.update({ error, success });
        this.setListeners();
        if (error) {
            state.restore();
        }
    }
    
    protected setListeners(): void {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.createEmployee();
        })
    }
    
    private createEmployee() {
        state.store();

        const name = this.nameInput.value;
        if (!name.trim()) {
            this.build('Informe um nome!');
            return;
        }

        const salary = this.salaryInput.value;
        if (!salary) {
            this.build('Informe um salário!');
            return;
        } else if (Number.isNaN(+salary)) {
            this.build('Informe um salário válido!');
            return;
        }

        const age = this.ageInput.value;
        if (!age) {
            this.build('Informe uma idade!');
            return;
        } else if (Number.isNaN(+age)) {
            this.build('Informe uma idade válida!');
            return;
        } else if (+age < 14) {
            this.build('Um funcionário precisa ter ao menos 14 anos!');
            return;
        }

        this.service.createEmployee(name.trim(), +salary, +age).then(response => {
            this.build(null, true);
        }).catch(() => {
            this.build('Houve um erro ao cadastrar funcionário, tente novamente');
        })
    }
}