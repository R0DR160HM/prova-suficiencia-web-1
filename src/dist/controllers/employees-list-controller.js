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
import { DomInjector } from "../shared/decorators/dom-injection-decorator.js";
import { EmployeeService } from "../shared/services/employee-service.js";
import { EmployeesListView } from "../views/employees-list-view.js";
import { Controller } from "./controller.js";
export class EmployeesListController extends Controller {
    constructor() {
        super();
        this.service = new EmployeeService;
        this.view = new EmployeesListView('main');
        this.build(0);
    }
    setListeners() {
        this.paginatorPrevious.addEventListener('click', e => {
            var _a;
            e.preventDefault();
            if ((_a = this.employees) === null || _a === void 0 ? void 0 : _a.hasPrevious) {
                this.build(this.employees.pageIndex - 1);
            }
        });
        this.paginatorNext.addEventListener('click', e => {
            var _a;
            e.preventDefault();
            if ((_a = this.employees) === null || _a === void 0 ? void 0 : _a.hasNext) {
                this.build(this.employees.pageIndex + 1);
            }
        });
    }
    build(pageIndex = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            this.employees = yield this.service.fetch(pageIndex, 5);
            this.view.update(this.employees);
            this.setListeners();
        });
    }
}
__decorate([
    DomInjector('#paginator-previous')
], EmployeesListController.prototype, "paginatorPrevious", void 0);
__decorate([
    DomInjector('#paginator-next')
], EmployeesListController.prototype, "paginatorNext", void 0);
