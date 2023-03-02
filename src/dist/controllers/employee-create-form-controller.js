var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { state } from "../shared/core/state.js";
import { DomInjector } from "../shared/decorators/dom-injection-decorator.js";
import { EmployeeService } from "../shared/services/employee-service.js";
import { EmployeeCreateFormView } from "../views/employee-create-form-view.js";
import { Controller } from "./controller.js";
export class EmployeeCreateFormController extends Controller {
    constructor() {
        super();
        this.view = new EmployeeCreateFormView('main');
        this.service = new EmployeeService();
        this.build();
    }
    build(error, success = false) {
        this.view.update({ error, success });
        this.setListeners();
        if (error) {
            state.restore();
        }
    }
    setListeners() {
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.createEmployee();
        });
    }
    createEmployee() {
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
        }
        else if (Number.isNaN(+salary)) {
            this.build('Informe um salário válido!');
            return;
        }
        const age = this.ageInput.value;
        if (!age) {
            this.build('Informe uma idade!');
            return;
        }
        else if (Number.isNaN(+age)) {
            this.build('Informe uma idade válida!');
            return;
        }
        else if (+age < 14) {
            this.build('Um funcionário precisa ter ao menos 14 anos!');
            return;
        }
        this.service.createEmployee(name.trim(), +salary, +age).then(response => {
            this.build(null, true);
        }).catch(() => {
            this.build('Houve um erro ao cadastrar funcionário, tente novamente');
        });
    }
}
__decorate([
    DomInjector('#new-employee-form')
], EmployeeCreateFormController.prototype, "form", void 0);
__decorate([
    DomInjector('#employee-create-name')
], EmployeeCreateFormController.prototype, "nameInput", void 0);
__decorate([
    DomInjector('#employee-create-salary')
], EmployeeCreateFormController.prototype, "salaryInput", void 0);
__decorate([
    DomInjector('#employee-create-age')
], EmployeeCreateFormController.prototype, "ageInput", void 0);
