import { Employee } from "../models/Employee.js";
import { View } from "./view.js";

export class EmployeesListView extends View<Employee[]> {

    protected template(model: Employee[]): string {
        return `
        
        <section class="card p-5">
            <h2 class="mb-3">Funcionários</h2>

            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col" class="d-none d-sm-table-cell"> # </th>
                        <th scope="col" class="text-center"> Foto </th>
                        <th scope="col"> Nome </th>
                        <th scope="col"> Idade </th>
                    </tr>
                </thead>
                <tbody>
                    ${ model.map(employee => `
                    <tr>
                        <th class="d-none d-sm-table-cell align-middle">${ employee?.id || -1 }</th>
                        <th class="align-middle text-center">
                            <img class="img-thumbnail" width="50" height="50" src="${ employee?.profileImage || '../../assets/portrait-placeholder.png' }">
                        </th>
                        <th class="align-middle">${ employee?.name }</th>
                        <th class="align-middle">${ employee?.age }<span class="d-none d-sm-inline"> anos</span></th>
                    </tr>
                    `).join(' ') }
                </tbody>
            </table>

            <nav aria-label="Teste paginação">
                <ul class="pagination">
                    <li class="page-item disabled">
                        <a class="page-link"> \<\< </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item active" aria-current="page">
                        <a class="page-link" href="#">2</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#"> \>\> </a>
                    </li>
                </ul>
            </nav>

        </section>

        
        `
    }
}