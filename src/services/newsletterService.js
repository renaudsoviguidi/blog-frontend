import http from './http';
import publicHttp from './publicHttp';

const BASE = '/v1/newsletter';

const newsletterService = {
    // Public — s'abonner
    subscribe: (email) =>
        publicHttp.post(`${BASE}/subscribe`, { email }),

    // Admin
    getAll: (page = 1, filters = {}) => {
        const params = new URLSearchParams({ page });
        Object.entries(filters).forEach(([k, v]) => v && params.set(k, v));
        return http.get(`${BASE}?${params}`);
    },

    delete: (ref) => http.delete(`${BASE}/${ref}`),
};

export default newsletterService;