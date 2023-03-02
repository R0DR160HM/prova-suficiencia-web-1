var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["POST"] = "POST";
    HttpMethod["PATCH"] = "PATCH";
    HttpMethod["GET"] = "GET";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
})(HttpMethod || (HttpMethod = {}));
function request(url, method, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = { method, headers: { 'Content-Type': 'application/json' } };
        if (body) {
            Object.assign(options, { body: JSON.stringify(body) });
        }
        const response = yield fetch(url, options);
        return response.json();
    });
}
function get(url) {
    return request(url, HttpMethod.GET);
}
function remove(url) {
    return request(url, HttpMethod.DELETE);
}
function post(url, body) {
    return request(url, HttpMethod.POST, body);
}
function put(url, body) {
    return request(url, HttpMethod.PUT, body);
}
function patch(url, body) {
    return request(url, HttpMethod.PATCH, body);
}
export const http = { get, post, put, patch, delete: remove };
