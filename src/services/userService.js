import http from './http';

const BASE = '/v1/users';

const buildParams = (page, filters) => {
    const params = new URLSearchParams({ page });
    Object.entries(filters).forEach(([k, v]) => v !== '' && v !== null && params.set(k, v));
    return params.toString();
};

const userService = {
    getAll: (page = 1, filters = {}) => http.get(`${BASE}?${buildParams(page, filters)}`),
    getStats: () => http.get(`${BASE}/stats`),
    getOne: (ref) => http.get(`${BASE}/${ref}`),
    create: (data) => http.post(BASE, data),
    update: (ref, data) => http.put(`${BASE}/${ref}`, data),
    toggleActive: (ref) => http.patch(`${BASE}/${ref}/toggle-active`),
    delete: (ref) => http.delete(`${BASE}/${ref}`),
};

export default userService;