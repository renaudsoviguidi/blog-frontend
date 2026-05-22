export const myroutes = {
  homepage: "/",

  /// - Authentification
  login: "/auth/login",
  register: "/auth/register",
  verifyEmail: "/verify-email",
  forgotpassword: "/forgot-password",

  /// ─ Pages publiques
  articles: '/articles',
  article: (ref) => `/articles/${ref}`,
  publicCategories: '/categories',
  about: '/a-propos',

  /// - Administration
  dashboard: "/admin/dashboard",
  categories: "/admin/categories",
  tags: "/admin/tags",
  posts: "/admin/posts",
  comments: "/admin/comments"
};
