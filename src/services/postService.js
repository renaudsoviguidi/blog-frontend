import http from './http';

const BASE = '/v1/posts';

const buildParams = (page, filters) => {
    const params = new URLSearchParams({ page });
    Object.entries(filters).forEach(([k, v]) => v && params.set(k, v));
    return params.toString();
};

const postService = {
    getAll: (page = 1, filters = {}) =>
        http.get(`${BASE}?${buildParams(page, filters)}`),

    create: (formData) =>
        http.post(BASE, formData),

    update: (ref, formData) =>
        http.patch(`${BASE}/${ref}`, formData),

    delete: (ref) =>
        http.delete(`${BASE}/${ref}`),

    publish: (ref) =>
        http.patch(`${BASE}/${ref}/publish`),

    reject: (ref) =>
        http.patch(`${BASE}/${ref}/reject`),
};

export default postService;