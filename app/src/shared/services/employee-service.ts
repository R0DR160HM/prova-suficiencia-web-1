import { Employee } from "../../models/Employee.js";
import { GenericResponse } from "../../models/GenericResponse.js";
import { http } from "../http.js";

const BASE_URL = 'https://dummy.restapiexample.com/api/v1';

export class EmployeeService {

    public async fetchAll() {
        const url = `${BASE_URL}/employees`;
        const response = await http.get<GenericResponse<Employee[]>>(url)
        return response.data.map(employee => new Employee(employee));
    }

}