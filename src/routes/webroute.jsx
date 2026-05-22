import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { myroutes } from './routes';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import VerifyEmailPage from '../pages/VerifyEmailPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import CategoriesPage from '../features/categories/CategoriesPage';
import { useSelector } from 'react-redux';
import { selectHasPermission, selectIsAuthenticate } from '../app/providers/authSlice';
import TagsPage from '../features/tags/TagPage';
import PostsPage from '../features/posts/PostsPage';
import ArticlesPage from '../pages/public/ArticlesPage';
import ArticleDetailPage from '../pages/public/ArticleDetailPage';
import CategoriesPublicPage from '../pages/public/CategoriesPublicPage';
import AboutPage from '../pages/public/AboutPage';
import CommentsPage from '../features/comments/CommentsPage';


const PrivateRoute = ({ children, permission }) => {

    const isAuthenticate  = useSelector(selectIsAuthenticate);
    const hasPermission   = useSelector(selectHasPermission(permission));

    if (!isAuthenticate) return <Navigate to={myroutes.login} replace />;
    if (permission && !hasPermission) return <Navigate to={myroutes.dashboard} replace />;

    return children;
};

const Webroute = () => {

  return (
  <BrowserRouter>
    <Routes>

        {/* Authentification */}
        <Route path={myroutes.login} name="login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path={myroutes.forgotpassword} name="forgotpassword" element={<ForgotPasswordPage />} />
        {/* End Authentification */}

        {/* Administration */}
        <Route path={myroutes.dashboard} element={
            <PrivateRoute>
                <DashboardPage />
            </PrivateRoute>
        } />

        <Route path={myroutes.categories} element={
            <PrivateRoute permission="category.read">
                <CategoriesPage />
            </PrivateRoute>
        } />

        <Route path={myroutes.tags} element={
            <PrivateRoute permission="tag.read">
                <TagsPage />
            </PrivateRoute>
        } />

        <Route path={myroutes.posts} element={
            <PrivateRoute permission="post.read">
                <PostsPage />
            </PrivateRoute>
        } />


        <Route path={myroutes.comments} element={
            <PrivateRoute permission="comment.moderate">
                <CommentsPage />
            </PrivateRoute>
        } />

        {/* <Route path={myroutes.categories} name="categories" element={<CategoriesPage />} /> */}
        {/* End Administration */}


        {/* Public */}
        <Route path={myroutes.homepage} name="homepage" element={<HomePage />} />
        <Route path={myroutes.articles} element={<ArticlesPage />} />
        <Route path="/articles/:ref" element={<ArticleDetailPage />} />
        <Route path={myroutes.publicCategories} element={<CategoriesPublicPage />} />
        <Route path={myroutes.about} element={<AboutPage />} />
        {/* End Public */}
    </Routes>
  </BrowserRouter>
  )
}
export default Webroute
