import { EmployeesListController } from "./controllers/employees-list-controller.js";
import { SidebarController } from "./controllers/sidebar-controller.js";
const navigationHandler = new SidebarController();
let currentPage = new EmployeesListController();
navigationHandler.onPageChange(controller => {
    currentPage = controller;
});
