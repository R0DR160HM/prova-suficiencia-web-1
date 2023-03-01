import { Employee } from "../../models/Employee.js";
import { GenericResponse } from "../../models/GenericResponse.js";
import { http } from "../core/http.js";

const BASE_URL = 'https://dummy.restapiexample.com/api/v1';

export class EmployeeService {

    private readonly SAVED_EMPLOYEES = 'saved-employees';

    /**
     * Eu sei que isso daqui é gambiarra, mas a API:
     * 1: Não tem paginação (pelo menos não na documentação), então precisa dessa paginação fake aqui;
     * 2: Só retorna resultado as vezes, por isso em caso de erro, trás os resultados da memória.
     * <3
     */
    public async fetch(pageIndex = 0, pageSize = 10) {
        const employees = await this.fetchAll();
        const startIndex = pageIndex * pageSize;
        return employees.splice(startIndex, pageSize);
    }

    public async fetchAll() {
        const url = `${BASE_URL}/employees`;
        return http.get<GenericResponse<Employee[]>>(url).then(response => {
            const employees = this.updateStorage(response.data);
            return employees;
        }).catch(() => {
            return this.restoreFromStorage();
        })
    }

    private restoreFromStorage() {
        let savedEmployees: Employee[]; 
        try {
            savedEmployees = JSON.parse(localStorage.getItem(this.SAVED_EMPLOYEES));
            savedEmployees = savedEmployees.map(emp => new Employee(emp));
        } catch (e) {
            savedEmployees = [];
        }
        return savedEmployees;
    }
    
    private updateStorage(employees: Employee[]) {
        const savedEmployees = this.restoreFromStorage();
        
        const ids = savedEmployees.map(emp => emp.id);
        for (const employee of employees) {
            if (!ids.includes(employee.id)) {
                savedEmployees.push(new Employee(employee))
            }
        }
        localStorage.setItem(this.SAVED_EMPLOYEES, JSON.stringify(savedEmployees));

        return savedEmployees;
    }

}