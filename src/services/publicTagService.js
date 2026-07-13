import publicHttp from './publicHttp';


const BASE = "/v1/tags";
const publicTagService = {
    getPopular: () => publicHttp.get(`${BASE}/popular`),
};

export default publicTagService;