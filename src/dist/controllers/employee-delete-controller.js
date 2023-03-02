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
import { EmployeeDeleteView } from "../views/employee-delete-view.js";
import { Controller } from "./controller.js";
export class EmployeeDeleteController extends Controller {
    constructor() {
        super();
        this.view = new EmployeeDeleteView('main');
        this.service = new EmployeeService();
        this.build();
    }
    build(error, employee, deleted = false) {
        this.view.update({ employee, error, deleted });
        this.setListeners();
    }
    setListeners() {
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
        });
    }
    deleteEmployee() {
        return __awaiter(this, void 0, void 0, function* () {
            state.store();
            this.service.delete(this.selectedEmployee.id)
                .then(() => this.build(null, null, true))
                .catch(() => {
                this.build('Houve um erro ao excluir funcionário, tente novamente', this.selectedEmployee);
                state.restore();
            });
        });
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
}
__decorate([
    DomInjector('#find-employee-form')
], EmployeeDeleteController.prototype, "searchForm", void 0);
__decorate([
    DomInjector('#employee-id-input')
], EmployeeDeleteController.prototype, "idInput", void 0);
__decorate([
    DomInjector('#delete-employee-form')
], EmployeeDeleteController.prototype, "deleteForm", void 0);
