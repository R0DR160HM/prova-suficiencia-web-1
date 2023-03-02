export class Employee {
    constructor(response) {
        if (response) {
            this.id = response.id;
            this.name = response.employee_name;
            this.salary = response.employee_salary;
            this.age = response.employee_age;
            this.profileImage = response.profile_image;
        }
    }
    set name(name) {
        if (name) {
            this.employee_name = name;
        }
    }
    get name() {
        return this.employee_name;
    }
    set salary(salary) {
        if (salary > 0) {
            this.employee_salary = salary;
        }
    }
    get salary() {
        return this.employee_salary;
    }
    get formattedSalary() {
        return this.salary.toFixed(2).replace(/\./g, ',');
    }
    set age(age) {
        if (age >= 14) {
            this.employee_age = age;
        }
    }
    get age() {
        return this.employee_age;
    }
    set profileImage(resource) {
        this.profile_image = resource || '';
    }
    get profileImage() {
        return this.profile_image || 'assets/portrait-placeholder.png';
    }
    static fromResponse(response) {
        return new Employee({
            id: response.id,
            employee_name: response.name,
            employee_salary: response.salary,
            employee_age: response.age,
            profile_image: ''
        });
    }
}
