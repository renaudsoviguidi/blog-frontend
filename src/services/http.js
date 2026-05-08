import axios from "axios";
import { store } from "../app/store";
import { resetAuthData, updateToken } from "../app/providers/authSlice";

const app_url = import.meta.env.VITE_API_URL;

export { app_url };

const http = axios.create({
  baseURL: app_url,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur requête — lit le token depuis Redux
http.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur réponse — gère 401 et refresh token
// services/http.js
http.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    /// - Exclure les routes d'auth — un 401 sur /login ou /refresh
    /// - est une erreur métier, pas une expiration de token
    const isAuthRoute = originalRequest.url?.includes("/auth/");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute  // ← la clé du fix
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = store.getState().auth.refreshToken;
        const { data } = await axios.post(
          `${app_url}/auth/refresh`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        store.dispatch(updateToken({ data }));
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return http(originalRequest);

      } catch {
        store.dispatch(resetAuthData());
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default http;
