export class Employee {
    public readonly id?: number;
    
    private employee_name: string;
    private employee_salary: number;
    private employee_age: number;
    private profile_image: string;

    constructor(response?: Employee) {
        if (response) {
            this.id = response.id;
            this.name = response.employee_name;
            this.salary = response.employee_salary;
            this.age = response.employee_age;
            this.profileImage = response.profile_image;
        }
    }

    public set name(name: string) {
        if (name) {
            this.employee_name = name;
        }
    }
    public get name() {
        return this.employee_name;
    }

    public set salary(salary: number) {
        if (salary > 0) {
            this.employee_salary = salary;
        }
    }
    public get salary() {
        return this.employee_salary;
    }
    public get formattedSalary() {
        return this.salary.toFixed(2).replace(/\./g, ',');
    }

    
    public set age(age: number) {
        if (age >= 14) {
            this.employee_age = age;
        }
    }
    public get age() {
        return this.employee_age;
    }

    public set profileImage(resource: string) {
        this.profile_image = resource || '';
    }
    public get profileImage() {
        return this.profile_image || 'assets/portrait-placeholder.png';
    }

    public static fromResponse(response: { id: number, age: number, salary: number, name: string }) {
        return new Employee({
            id: response.id,
            employee_name: response.name,
            employee_salary: response.salary,
            employee_age: response.age,
            profile_image: ''
        } as any);
    }
}