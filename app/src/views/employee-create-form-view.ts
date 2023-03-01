import { View } from "./view.js";

export class EmployeeCreateFormView extends View<undefined> {
    
    protected template(): string {
        return `
        
        <section class="card p-5">
            <h2 class="mb-3">Cadastrar funcionário</h2>
            <form>

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
                    <button class="btn btn-primary">Cadastrar</button>
                </div>

            </form>
        </section>

        `;
    }
}