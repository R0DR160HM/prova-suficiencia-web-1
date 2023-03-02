import { Employee } from "../shared/models/Employee.js";
import { View } from "./view.js";

export class EmployeeDeleteView extends View<{ error?: string, employee?: Employee, deleted?: boolean }> {
    
    protected template(model?: { error?: string, employee?: Employee, deleted: boolean }): string {
        return `
        
        <section class="card p-5">
            <h2 class="mb-3">Excluir funcionário</h2>

            ${ model?.error ? `
            <div role="alert" class="alert alert-danger">
                <p class="m-0">
                    <i class="fa fa-exclamation-circle me-2"></i>
                    ${ model.error }
                </p>
            </div>
            ` : '' }

            ${ (model?.employee && !model.employee.id) ? `
            <div role="alert" class="alert alert-warning">
                <p class="m-0">
                    <i class="fa fa-user-slash me-2"></i>
                    Funcionário não existe
                </p>
            ` : '' }

            ${ model?.deleted ? `
            <div role="alert" class="alert alert-success">
                <p class="m-0">
                    <i class="fa fa-smile me-2"></i>
                    Funcionário excluído com sucesso
                </p>
            ` : '' }

            <form id="find-employee-form">

                <label for="employee-id-input">ID:</label>
                <input placeholder="Identificador do funcionário" id="employee-id-input" type="number" class="form-control">
                <button class="btn ${ model?.employee?.id ? 'btn-secondary' : 'btn-primary' } mt-3" type="submit">Buscar</button>

            </form>

            ${ model?.employee?.id ? `
            <hr class="mt-3">
            <form id="delete-employee-form">

                <div class="row m-0">
                    <div class="col-12 p-2">
                        <label>Nome:</label>
                        <input class="form-control" value="${ model.employee.name }" disabled>
                    </div>
                    <div class="col-6 p-2">
                        <label>Idade:</label>
                        <input class="form-control" value="${ model.employee.age }" disabled>
                    </div>
                    <div class="col-6 p-2">
                        <label>Salário:</label>
                        <input class="form-control" value="R$ ${ model.employee.formattedSalary }" disabled>
                    </div>
                </div>

                <div class="p-2 mt-3">
                    <button class="btn btn-danger w-100">Excluir</button>
                </div>
                
            </form>
            ` : '' }


        </section>

        
        `;
    }


}