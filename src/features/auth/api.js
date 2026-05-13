import http from "../../services/http";

const BASE = "/auth";

/// ─ Authentification

/**
 * @returns {{ user, token, refreshToken }}
 */
export const login = async (email, password) => {
  const { data } = await http.post(`${BASE}/login`, { email, password });
  return data;
};

/**
 * @returns {{ user, token, refreshToken }}
 */
export const register = async (name, email, password, passwordConfirmation) => {
  const { data } = await http.post(`${BASE}/register`, {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
  return data;
};

/**
 * Connexion via Google OAuth
 * @returns {{ user, token }}
 */
export const googleLogin = async (googleToken) => {
  const { data } = await http.post(`${BASE}/google`, { token: googleToken });
  return data;
};

/// ─ Mot de passe oublié
/**
 * Envoie un OTP par email
 * @returns {{ message: string }}
 */
export const forgotPassword = async (email) => {
  const { data } = await http.post(`${BASE}/forgot-password`, { email });
  return data;
};

/**
 * Vérifie le code OTP
 * @returns {{ message: string, valid: boolean }}
 */
export const verifyOtp = async (email, otp) => {
  const { data } = await http.post(`${BASE}/verify-otp`, { email, otp });
  return data;
};

/**
 * Réinitialise le mot de passe
 * @returns {{ message: string }}
 */
export const resetPassword = async (
  email,
  otp,
  password,
  passwordConfirmation,
) => {
  const { data } = await http.post(`${BASE}/reset-password`, {
    email,
    otp,
    password,
    password_confirmation: passwordConfirmation,
  });
  return data;
};

/// ─ Session 

/**
 * Déconnexion — révoque le token côté serveur
 */
export const logout = async () => {
  await http.post(`${BASE}/logout`);
};

/**
 * Récupère l'utilisateur connecté
 * @returns {{ user }}
 */
export const fetchCurrentUser = async () => {
  const { data } = await http.get(`${BASE}/me`);
  return data;
};
