import publicHttp from './publicHttp';

const publicCommentService = {
    getByPost: (postRef) =>
        publicHttp.get(`/v1/posts/${postRef}/comments`),

    create: (postRef, data) =>
        publicHttp.post(`/v1/posts/${postRef}/comments`, data),
};

export default publicCommentService;