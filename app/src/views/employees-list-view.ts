import { Employee } from "../shared/models/Employee.js";
import { PageableResponse } from "../shared/models/PageableResponse.js";
import { View } from "./view.js";

export class EmployeesListView extends View<PageableResponse<Employee>> {

    protected template(model: PageableResponse<Employee>): string {
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
                    ${ model.records.map(employee => `
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
                    <li class="page-item ${ model.hasPrevious ? '' : 'disabled' }" role="button" id="paginator-previous">
                        <a class="page-link"> \<\< </a>
                    </li>
                    <li class="page-item active" aria-current="page">
                        <a class="page-link" href="#">${ model.pageIndex + 1 }</a>
                    </li>
                    <li class="page-item ${ model.hasNext ? '' : 'disabled' }" role="button" id="paginator-next">
                        <a class="page-link" href="#"> \>\> </a>
                    </li>
                </ul>
            </nav>

        </section>

        
        `
    }
}