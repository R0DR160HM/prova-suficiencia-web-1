enum HttpMethod {
    POST = 'POST',
    PATCH = 'PATCH',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

async function request<T>(url: string, method: HttpMethod, body?: any) {
    const options = { method, headers: { 'Content-Type': 'application/json' } };
    if (body) {
        Object.assign(options, { body });
    }

    const response = await fetch(url, options);
    return response.json() as Promise<T>;
}

function get<T>(url: string) {
    return request<T>(url, HttpMethod.GET);
}

function remove<T>(url: string) {
    return request<T>(url, HttpMethod.DELETE);
}

function post<T>(url: string, body: any) {
    return request(url, HttpMethod.POST, body);
}

function put<T>(url: string, body: any) {
    return request<T>(url, HttpMethod.PUT, body);
}

function patch<T>(url: string, body: any) {
    return request<T>(url, HttpMethod.PATCH, body);
}

export const http = { get, post, put, patch, delete: remove };