import http from './http';

const BASE = '/v1/categories';

const categoryService = {
    getAll: (page = 1) =>
        http.get(`${BASE}?page=${page}`),

    create: (data) =>
        http.post(BASE, data),

    update: (ref, data) =>
        http.put(`${BASE}/${ref}`, data),

    delete: (ref) =>
        http.delete(`${BASE}/${ref}`),
};

export default categoryService;