import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  googleLogin as apiGoogleLogin,
} from "./api";
import {
  checkAuthenticate,
  loginUser,
  resetAuthData,
} from "../../app/providers/authSlice";

// Hook principal
export function useAuth() {
  const dispatch = useDispatch();
  const { user, token, isAuthenticate, loading } = useSelector(
    (state) => state.auth,
  );

  async function login(email, password) {
    const response = await apiLogin(email, password);
    dispatch(loginUser({ data: response.data }));
    /// - On retourne le message du backend pour que LoginForm puisse l'afficher
    return response.message;
  }

  async function register(name, email, password, passwordConfirmation) {
    const response = await apiRegister(
      name,
      email,
      password,
      passwordConfirmation,
    );
    return response.message;
  }

  async function loginWithGoogle(googleToken) {
    const response = await apiGoogleLogin(googleToken);
    dispatch(loginUser({ data: response.data }));
    return response.message;
  }

  async function logout() {
    await apiLogout();
    dispatch(resetAuthData());
  }

  return {
    user,
    token,
    isAuthenticate,
    loading,
    login,
    register,
    logout,
    loginWithGoogle,
  };
}

// Hook utilisateur courant
export function useCurrentUser() {
  return useSelector((state) => state.auth.user);
}

// Hook guard de navigation
export function useRequireAuth(redirectTo = "/auth/login") {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticate, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthenticate()); // vérifie expiration du JWT
    if (!loading && !isAuthenticate) {
      navigate(redirectTo);
    }
  }, [isAuthenticate, loading, navigate, redirectTo, dispatch]);

  return { isAuthenticate, loading };
}
