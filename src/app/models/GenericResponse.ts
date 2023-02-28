export class GenericResponse<T> {

    public status?: 'string';
    public data?: T;
    public message: string;

}