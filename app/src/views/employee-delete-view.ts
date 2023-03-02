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

                <div class="row m-0">
                    <div class="col-12 col-md-10">
                        <label for="employee-id-input">ID:</label>
                        <input placeholder="Identificador do funcionário" id="employee-id-input" type="number" class="form-control">
                    </div>
                    <div class="col-12 col-md-2 text-start text-md-center">
                        <button>Buscar</button>
                    </div>
                </div>

            </form>


        </section>

        
        `;
    }


}