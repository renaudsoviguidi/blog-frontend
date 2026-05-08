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
      state.token = "";
      state.isAuthenticate = false;

      const payload = action.payload.data;

      state.user = payload.user; // Mettre à jour l'utilisateur avec les données reçues
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.isAuthenticate = true;

      //Recupérer les profils de l'utilisateur
      state.roles = payload.user.roles;

      state.habilitations = payload.user.habilitations;
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
        const decodedToken = jwtDecode(state.token);
        const currentDate = new Date().getTime() / 1000; // Convertir la date actuelle en secondes
        if (decodedToken.exp < currentDate && !state.refreshToken) {
          // Le token a expiré
          statut = false;
        } else {
          statut = true;
        }
      } else {
        statut = false;
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
