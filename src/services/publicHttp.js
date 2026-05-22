import axios from "axios";

export const app_url = import.meta.env.VITE_API_URL;

const publicHttp = axios.create({
    baseURL: app_url,
    withCredentials: false,
    timeout: 15_000,
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
},
});

// Normalisation des erreurs — sans gestion de token
publicHttp.interceptors.response.use(
    (response) => response,
    (error) => {
    if (error.response) {
        const { status, data } = error.response;
        const normalized = new Error(data?.message ?? `Erreur ${status}`);
        normalized.status = status;
        normalized.errors = data?.errors ?? null;
        return Promise.reject(normalized);
    }
    if (error.request) {
        return Promise.reject(new Error("Impossible de contacter le serveur."));
    }
    return Promise.reject(error);
},
);

export default publicHttp;
