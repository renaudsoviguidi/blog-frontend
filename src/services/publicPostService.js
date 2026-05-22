import publicHttp from './publicHttp';

const BASE = "/v1/posts";

const publicPostService = {
    getAll: (page = 1, filters = {}) => {
    const params = new URLSearchParams({
        page,
        status: "published",
        ...filters,
    });
    return publicHttp.get(`${BASE}?${params}`);
    },

    getOne: (ref) => publicHttp.get(`${BASE}/${ref}`),

    getByCategory: (categoryRef, page = 1) =>
    publicHttp.get(`${BASE}?page=${page}&status=published&category_ref=${categoryRef}`,
),
};

export default publicPostService;
