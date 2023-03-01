import { DomInjector } from "../shared/decorators/dom-injection-decorator.js";
import { Employee } from "../shared/models/Employee.js";
import { PageableResponse } from "../shared/models/PageableResponse.js";
import { EmployeeService } from "../shared/services/employee-service.js";
import { EmployeesListView } from "../views/employees-list-view.js";

export class EmployeesListController {
    
    @DomInjector('#paginator-previous')
    private paginatorPrevious: HTMLElement;

    @DomInjector('#paginator-next')
    private paginatorNext: HTMLElement;

    private employees: PageableResponse<Employee>;
    private view = new EmployeesListView('main');
    private service = new EmployeeService;

    constructor() {
        this.build(0);
    }
    
    private setListeners() {
        this.paginatorPrevious.addEventListener('click', e => {
            e.preventDefault();
            if (this.employees?.hasPrevious) {
                this.build(this.employees.pageIndex - 1);
            }
        });
        this.paginatorNext.addEventListener('click', e => {
            e.preventDefault();
            if (this.employees?.hasNext) {
                this.build(this.employees.pageIndex + 1);
            }
        });
    }

    private async build(pageIndex: number) {
        this.employees = await this.service.fetch(pageIndex, 5)
        this.view.update(this.employees);
        this.setListeners();
    }

}