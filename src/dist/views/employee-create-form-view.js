import { View } from "./view.js";
export class EmployeeCreateFormView extends View {
    template(info) {
        return `
        
        <section class="card p-5">
            <h2 class="mb-3">Cadastrar funcionário</h2>

            ${info.error ? `
            <div role="alert" class="alert alert-danger">
                <p class="m-0">
                    <i class="fa fa-exclamation-circle me-2"></i>
                    ${info.error}
                </p>
            </div>
            ` : ''}
            
            ${!info.error && info.success ? `
            <div role="alert" class="alert alert-success">
                <p class="m-0">
                    <i class="fa fa-smile me-2"></i>
                    Funcionário cadastrado com sucesso
                </p>
            </div>
            ` : ''}

            <form id="new-employee-form">

                <div class="row m-0">
                    <div class="col-12 p-2">
                        <label for="employee-create-name">Nome:</label>
                        <input placeholder="Nome do funcionário" id="employee-create-name" type="text" class="form-control">
                    </div>
                    <div class="col-12 col-md-8 col-lg-9 p-2">
                        <label for="employee-create-salary">Salário:</label>
                        <input placeholder="Salário mensal" id="employee-create-salary" type="number" class="form-control">
                    </div>
                    <div class="col-12 col-md-4 col-lg-3 p-2">
                        <label for="employee-create-age">Idade:</label>
                        <input placeholder="Idade do funcionário" id="employee-create-age" min="14" type="number" class="form-control">
                    </div>
                </div>

                <div class="m-2 mt-3 text-center text-md-start">
                    <button class="btn btn-primary" type="submit">Cadastrar</button>
                </div>

            </form>
        </section>

        `;
    }
}
