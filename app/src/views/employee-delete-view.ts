import { Employee } from "../shared/models/Employee.js";
import { View } from "./view.js";

export class EmployeeDeleteView extends View<{ error?: string, employee?: Employee }> {
    
    protected template(model?: { error?: string, employee?: Employee }): string {
        return `
        
        <section class="card p-5">
            <h2 class="mb-3">Excluir funcionário</h2>

            ${ model.error ? `
            <div role="alert" class="alert alert-danger">
                <p class="m-0">
                    <i class="fa fa-exclamation-circle me-2"></i>
                    ${ model.error }
                </p>
            </div>
            ` : '' }

            ${ (model.employee && !model.employee.id) ? `
            <div role="alert" class="alert alert-warning">
                <p class="m-0">
                    <i class="fa fa-user-slash me-2"></i>
                    Usuário não existente
                </p>
            ` : '' }

            <form id="find-employee-form">

                <label for="employee-id-input">ID:</label>
                <input placeholder="Identificador do funcionário" id="employee-id-input" type="number" class="form-control">
                <button class="btn btn-primary mt-3" type="submit">Buscar</button>

            </form>


        </section>

        
        `;
    }


}