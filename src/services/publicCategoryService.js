import publicHttp from './publicHttp';

const BASE = "/v1/categories";

const publicCategoryService = {
    getAll: () => publicHttp.get(`${BASE}?per_page=100`),
};

export default publicCategoryService;
