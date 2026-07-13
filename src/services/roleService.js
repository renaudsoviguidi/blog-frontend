import http from './http';

const BASE = '/v1/roles';

const roleService = {
    getAll: (page = 1, filters = {}) => {
        const params = new URLSearchParams({ page });
        Object.entries(filters).forEach(([k, v]) => v && params.set(k, v));
        return http.get(`${BASE}?${params}`);
    },
    getAllNoPagination: () => http.get(`${BASE}/all`),
    getHabilitations: () => http.get(`${BASE}/habilitations`),
    create: (data) => http.post(BASE, data),
    update: (ref, data) => http.put(`${BASE}/${ref}`, data),
    delete: (ref) => http.delete(`${BASE}/${ref}`),
};

export default roleService;