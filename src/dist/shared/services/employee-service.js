var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Employee } from "../models/Employee.js";
import { PageableResponse } from "../models/PageableResponse.js";
import { http } from "../core/http.js";
const BASE_URL = 'https://dummy.restapiexample.com/api/v1';
export class EmployeeService {
    constructor() {
        this.SAVED_EMPLOYEES = 'saved-employees';
    }
    /**
     * Eu sei que isso daqui é gambiarra, mas a API:
     * 1: Não tem paginação (pelo menos não na documentação), então precisa dessa paginação fake aqui;
     * 2: Só retorna resultado as vezes, por isso em caso de erro, trás os resultados da memória.
     * <3
     */
    fetch(pageIndex = 0, pageSize = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield this.fetchAll();
            const length = employees.length;
            const startIndex = pageIndex * pageSize;
            const records = employees.splice(startIndex, pageSize);
            return new PageableResponse(records, pageIndex, pageSize, (startIndex + pageSize) < length, pageIndex !== 0, length);
        });
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${BASE_URL}/employees`;
            return http.get(url).then(response => {
                const employees = this.updateStorage(response.data);
                return employees;
            }).catch(() => {
                return this.restoreFromStorage();
            });
        });
    }
    restoreFromStorage() {
        let savedEmployees;
        try {
            savedEmployees = JSON.parse(localStorage.getItem(this.SAVED_EMPLOYEES));
            savedEmployees = savedEmployees.map(emp => new Employee(emp));
        }
        catch (e) {
            savedEmployees = [];
        }
        return savedEmployees;
    }
    updateStorage(employees) {
        const savedEmployees = this.restoreFromStorage();
        const ids = savedEmployees.map(emp => emp.id);
        for (const employee of employees) {
            if (!ids.includes(employee.id)) {
                savedEmployees.push(new Employee(employee));
            }
        }
        localStorage.setItem(this.SAVED_EMPLOYEES, JSON.stringify(savedEmployees));
        return savedEmployees;
    }
    createEmployee(name, salary, age) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${BASE_URL}/create`;
            const response = yield http.post(url, { name, salary, age });
            const employee = Employee.fromResponse(response.data);
            this.saveEmployee(employee);
            return employee;
        });
    }
    saveEmployee(employee) {
        const employees = this.restoreFromStorage();
        const ids = employees.map(e => e.id);
        const index = ids.indexOf(employee.id);
        if (index < 0) {
            employees.push(employee);
        }
        else {
            employees[index] = employee;
        }
        localStorage.setItem(this.SAVED_EMPLOYEES, JSON.stringify(employees));
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${BASE_URL}/employee/${id}`;
            return http.get(url)
                .then(response => {
                if (response.data) {
                    return new Employee(response.data);
                }
                else {
                    return this.getFromStorageById(id);
                }
            })
                .catch(() => {
                const employee = this.getFromStorageById(id);
                if (employee) {
                    return employee;
                }
                throw new Error('Não deu :(');
            });
        });
    }
    getFromStorageById(id) {
        const employees = this.restoreFromStorage();
        const ids = employees.map(e => e.id);
        const index = ids.indexOf(id);
        if (id >= 0) {
            return new Employee(employees[index]);
        }
        return null;
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${BASE_URL}/delete/${id}`;
            const response = yield http.delete(url);
            const employees = this.restoreFromStorage();
            const index = employees.map(e => e.id).indexOf(id);
            employees.splice(index, 1);
            localStorage.setItem(this.SAVED_EMPLOYEES, JSON.stringify(employees));
            return response;
        });
    }
    edit(id, name, age, salary) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${BASE_URL}/update/${id}`;
            const response = yield http.put(url, { name, age, salary });
            const employees = this.restoreFromStorage();
            const index = employees.map(e => e.id).indexOf(id);
            if (index >= 0) {
                employees[index] = new Employee(employees[index]);
                employees[index].name = name;
                employees[index].age = age;
                employees[index].salary = salary;
            }
            localStorage.setItem(this.SAVED_EMPLOYEES, JSON.stringify(employees));
            return response;
        });
    }
}
