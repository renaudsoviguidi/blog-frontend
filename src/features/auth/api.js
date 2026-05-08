import http from "../../services/http";

export async function login(email, password) {
  const { data } = await http.post("/api/auth/login", { email, password });
  return data; // { user, token, refreshToken }
}

export async function register(name, email, password, passwordConfirmation) {
  const { data } = await http.post("/api/auth/register", { name, email, password, password_confirmation: passwordConfirmation, });
  return data;
}

export async function googleLogin(googleToken) {
  const { data } = await http.post("/api/auth/google", { token: googleToken });
  return data; // { user, token }
}

export async function forgotPassword(email) {
  const { data } = await http.post("/api/auth/forgot-password", { email });
  return data;
}

export async function verifyOtp(email, otp) {
  const { data } = await http.post("/api/auth/verify-otp", { email, otp });
  return data;
}

export async function resetPassword(email, otp, password, password_confirmation) {
  const { data } = await http.post("/api/auth/reset-password", {
    email, otp, password, password_confirmation,
  });
  return data;
}

export async function logout() {
  await http.post("/api/auth/logout");
  localStorage.removeItem("token");
  delete http.defaults.headers.common["Authorization"];
}

export async function fetchCurrentUser() {
  const { data } = await http.get("/api/auth/me");
  return data;
}