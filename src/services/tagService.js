import http from './http';

const BASE = '/v1/tags';

const tagService = {
    getAll: (page = 1) =>
        http.get(`${BASE}?page=${page}`),

    create: (data) =>
        http.post(BASE, data),

    update: (ref, data) =>
        http.put(`${BASE}/${ref}`, data),

    delete: (ref) =>
        http.delete(`${BASE}/${ref}`),
};

export default tagService;