import { EmployeeService } from "./shared/services/employee-service.js";
import { EmployeeCreateFormView } from "./views/employee-create-form-view.js";
import { EmployeesListView } from "./views/employees-list-view.js";

// new EmployeeCreateFormView('main').update();
new EmployeeService().fetch().then(response => {
    new EmployeesListView('main').update(response)
}).catch(() => {
    new EmployeesListView('main').update([1,2,3,4,5] as any);
})