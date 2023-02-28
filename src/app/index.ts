import { http } from "./core/http.js";

http.get('https://dummy.restapiexample.com/api/v1/employees').then(a => console.log(a));