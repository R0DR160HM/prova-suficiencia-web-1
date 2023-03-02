var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { state } from "../shared/core/state.js";
import { DomInjector } from "../shared/decorators/dom-injection-decorator.js";
import { EmployeeService } from "../shared/services/employee-service.js";
import { EditEmployeeView } from "../views/edit-employee-view.js";
import { Controller } from "./controller.js";
export class EditEmployeeController extends Controller {
    constructor() {
        super();
        this.view = new EditEmployeeView('main');
        this.service = new EmployeeService();
        this.build();
    }
    build(error, employee, edited = false) {
        this.view.update({ employee, error, edited });
        this.setListeners();
    }
    setListeners() {
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
    fetchEmployee() {
        return __awaiter(this, void 0, void 0, function* () {
            state.store();
            const id = +this.idInput.value;
            this.service.getById(id)
                .then(e => {
                this.selectedEmployee = e;
                this.build(null, e);
            })
                .catch(() => this.build('Houve um erro ao buscar funcionário, tente novamente'))
                .finally(() => state.restore());
        });
    }
    deleteEmployee() {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            else if (Number.isNaN(+salary)) {
                this.build('Informe um salário válido!', this.selectedEmployee);
                return;
            }
            const age = this.ageInput.value;
            if (!age) {
                this.build('Informe uma idade!', this.selectedEmployee);
                return;
            }
            else if (Number.isNaN(+age)) {
                this.build('Informe uma idade válida!', this.selectedEmployee);
                return;
            }
            else if (+age < 14) {
                this.build('Um funcionário precisa ter ao menos 14 anos!', this.selectedEmployee);
                return;
            }
            this.service.edit(this.selectedEmployee.id, name, +age, +salary)
                .then(() => this.build(null, null, true))
                .catch(() => {
                this.build('Houve um erro ao alterar funcionário, tente novamente', this.selectedEmployee);
                state.restore();
            });
            // this.service.createEmployee(name.trim(), +salary, +age).then(response => {
            //     this.build(null, true);
            // }).catch(() => {
            //     this.build('Houve um erro ao cadastrar funcionário, tente novamente');
            // })
        });
    }
}
__decorate([
    DomInjector('#find-employee-form')
], EditEmployeeController.prototype, "searchForm", void 0);
__decorate([
    DomInjector('#employee-id-input')
], EditEmployeeController.prototype, "idInput", void 0);
__decorate([
    DomInjector('#edit-employee-form')
], EditEmployeeController.prototype, "editForm", void 0);
__decorate([
    DomInjector('#input-editar-nome')
], EditEmployeeController.prototype, "nameInput", void 0);
__decorate([
    DomInjector('#input-editar-idade')
], EditEmployeeController.prototype, "ageInput", void 0);
__decorate([
    DomInjector('#input-editar-salario')
], EditEmployeeController.prototype, "salaryInput", void 0);
