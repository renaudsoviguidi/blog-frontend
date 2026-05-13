import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  token: "",
  refreshToken: "",
  isAuthenticate: false,
  roles: [],
  habilitations: [],
};

export const auth = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // authentification
    loginUser(state, action) {
      const { user, token, refreshToken } = action.payload.data;

      Object.assign(state, {
          user,
          token,
          refreshToken,
          isAuthenticate: true,
          roles: user.roles,
          habilitations: user.habilitations,
      });
    },

    /// - Mettre à jour le token
    updateToken(state, action) {
      state.token = "";
      state.isAuthenticate = false;
      const payload = action.payload.data;

      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.isAuthenticate = true;
    },

    /// - Authentification
    resetAuthData(state) {
      state.user = null;
      state.token = "";
      state.isAuthenticate = false;
      state.roles = [];
      state.habilitations = [];
      state.refreshToken = "";
    },

    /// - Check authentification
    checkAuthenticate(state) {
      let statut = false;
      if (state.token) {
        try {
          const decodedToken = jwtDecode(state.token);
          const currentDate = new Date().getTime() / 1000; // Convertir la date actuelle en secondes
          
          const isExpired = decodedToken.exp < currentDate;
          if (isExpired && !state.refreshToken) {
              statut = false;
          } else if (isExpired && state.refreshToken) {
              statut = true;
          } else {
              statut = true;
          }
        } catch {
          statut = false;
        }
      }
      state.isAuthenticate = statut;

      if (!statut) {
        state.user = null;
        state.token = "";
        state.isAuthenticate = false;
        state.roles = [];
        state.habilitations = [];
        state.refreshToken = "";
      }
    },
  },
});

export const { loginUser, checkAuthenticate, resetAuthData, updateToken } =
  auth.actions;

export default auth.reducer;


// ─── Selectors ───────────────────────────────────────────────────────────────

export const selectIsAuthenticate = (state) => state.auth.isAuthenticate;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectRoles = (state) => state.auth.roles;
export const selectHabilitations = (state) => state.auth.habilitations;

/// - Selector dérivé — vérifie si l'utilisateur possède une permission précise
export const selectHasPermission = (permission) => (state) =>
  state.auth.habilitations.includes(permission);

/// - Selector dérivé — vérifie si l'utilisateur possède un rôle précis
export const selectHasRole = (role) => (state) =>
  state.auth.roles.includes(role);