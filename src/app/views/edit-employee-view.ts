import { Employee } from "../shared/models/Employee";
import { View } from "./view.js";

export class EditEmployeeView extends View<{ error?: string, employee?: Employee, edited?: boolean }> {

    protected template(model?: { error?: string, employee?: Employee, edited: boolean }): string {
        return `
        
        <section class="card p-5">
            <h2 class="mb-3">Alterar funcionário</h2>

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
            </div>
            ` : '' }

            ${ model?.edited ? `
            <div role="alert" class="alert alert-success">
                <p class="m-0">
                    <i class="fa fa-smile me-2"></i>
                    Funcionário alterado com sucesso
                </p>
            </div>
            ` : '' }

            <form id="find-employee-form">

                <label for="employee-id-input">ID:</label>
                <input placeholder="Identificador do funcionário" id="employee-id-input" type="number" class="form-control">
                <button class="btn ${ model?.employee?.id ? 'btn-secondary' : 'btn-primary' } mt-3" type="submit">Buscar</button>

            </form>

            ${ model?.employee?.id ? `
            <hr class="mt-3">
            <form id="edit-employee-form">

                <div class="row m-0">
                    <div class="col-12 p-2">
                        <label for="input-editar-nome">Nome:</label>
                        <input id="input-editar-nome" class="form-control" value="${ model.employee.name }">
                    </div>
                    <div class="col-6 p-2">
                        <label for="input-editar-idade">Idade:</label>
                        <input id="input-editar-idade" class="form-control" value="${ model.employee.age }" type="number">
                    </div>
                    <div class="col-6 p-2">
                        <label for="input-editar-salario">Salário:</label>
                        <input id="input-editar-salario" class="form-control" value="${ model.employee.salary }" type="number">
                    </div>
                </div>

                <div class="p-2 mt-3">
                    <button class="btn btn-primary w-100">Editar</button>
                </div>
                
            </form>
            ` : '' }


        </section>

        
        `;
    }

}