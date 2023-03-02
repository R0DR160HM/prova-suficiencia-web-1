import { Employee } from "../models/Employee.js";
import { GenericResponse } from "../models/GenericResponse.js";
import { PageableResponse } from "../models/PageableResponse.js";
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
        const length = employees.length;
        const startIndex = pageIndex * pageSize;
        const records = employees.splice(startIndex, pageSize);
        return new PageableResponse<Employee>(
            records,
            pageIndex,
            pageSize,
            (startIndex + pageSize) < length,
            pageIndex !== 0,
            length
        );
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

    public async createEmployee(name: string, salary: number, age: number) {
        const url = `${BASE_URL}/create`;
        const response = await http.post<GenericResponse<any>>(url, { name, salary, age });
        const employee = Employee.fromResponse(response.data);
        this.saveEmployee(employee);
        return employee;
    }

    private saveEmployee(employee: Employee) {
        const employees = this.restoreFromStorage();
        const ids = employees.map(e => e.id);
        const index = ids.indexOf(employee.id);
        if (index < 0) {
            employees.push(employee);
        } else {
            employees[index] = employee;
        }
        localStorage.setItem(this.SAVED_EMPLOYEES, JSON.stringify(employees));
    }

    public async getById(id: number) {
        const url = `${BASE_URL}/employee/${id}`;
        return http.get<GenericResponse<Employee>>(url)
            .then(response => {
                if (response.data) {
                    return new Employee(response.data);
                } else {
                    return this.getFromStorageById(id);
                }
            })
            .catch(() => {
                const employee =this.getFromStorageById(id);
                if (employee) {
                    return employee;
                }
                throw new Error('Não deu :(');
            });
    }

    private getFromStorageById(id: number) {
        const employees = this.restoreFromStorage();
        const ids = employees.map(e => e.id);
        const index = ids.indexOf(id);
        if (id >= 0) {
            return new Employee(employees[index]);
        }
        return null;
    }

    public async delete(id: number) {
        const url = `${BASE_URL}/delete/${id}`;
        const response = await http.delete(url);

        const employees = this.restoreFromStorage();
        const index = employees.map(e => e.id).indexOf(id)
        employees.splice(index, 1);
        localStorage.setItem(this.SAVED_EMPLOYEES, JSON.stringify(employees));
        
        return response;
        
    }
    
    public async edit(id: number, name: string, age: number, salary: number) {
        const url = `${BASE_URL}/update/${id}`;
        const response = await http.put<GenericResponse<{ name: string, age: number, salary: number }>>(url, { name, age, salary });
        
        const employees = this.restoreFromStorage();
        const index = employees.map(e => e.id).indexOf(id)
        if (index >= 0) {
            employees[index] = new Employee(employees[index]);
            employees[index].name = name;
            employees[index].age = age;
            employees[index].salary = salary
        }
        localStorage.setItem(this.SAVED_EMPLOYEES, JSON.stringify(employees));

        return response;
    }

}