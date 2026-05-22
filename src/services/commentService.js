import http from './http';

const BASE = '/v1/comments';

const commentService = {
    getAll:   (page = 1, filters = {}) => {
        const params = new URLSearchParams({ page });
        Object.entries(filters).forEach(([k, v]) => v && params.set(k, v));
        return http.get(`${BASE}?${params}`);
    },

    getStats: () => http.get(`${BASE}/stats`),

    moderate: (ref, status, rejectionReason = null) =>
        http.patch(`${BASE}/${ref}/moderate`, { status, rejection_reason: rejectionReason }),

    delete: (ref) => http.delete(`${BASE}/${ref}`),
};

export default commentService;