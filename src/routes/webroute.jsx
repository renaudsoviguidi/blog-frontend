import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { myroutes } from './routes';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import VerifyEmailPage from '../pages/VerifyEmailPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import PostsList from '../pages/admin/posts/PostsList';
import PostCreate from '../pages/admin/posts/PostCreate';

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
        <Route path={myroutes.dashboard} name="dashboard" element={<DashboardPage />} />
        <Route path="/admin/posts"         element={<PostsList />} />
        <Route path="/admin/posts/create"  element={<PostCreate />} />
        <Route path="/admin/posts/edit/:id" element={<PostCreate />} />
        {/* End Administration */}


        {/* Public */}
        <Route path={myroutes.homepage} name="homepage" element={<HomePage />} />
        {/* End Public */}
    </Routes>
  </BrowserRouter>
  )
}
export default Webroute
