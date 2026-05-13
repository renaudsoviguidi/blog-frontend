import axios from 'axios';
import { store } from '../app/store';
import { resetAuthData, updateToken } from '../app/providers/authSlice';

/// ─ Config
export const app_url = import.meta.env.VITE_API_URL;

const AUTH_ROUTES = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/google'];

const isAuthRoute = (url = '') => AUTH_ROUTES.some(route => url.includes(route));

/// ─ Instance principale
const http = axios.create({
    baseURL: app_url,
    withCredentials: false,
    timeout: 15_000, // 15s — évite les requêtes qui pendent indéfiniment
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

/// ─ File d'attente pour les requêtes bloquées pendant le refresh
// Problème sans ça : si 3 requêtes reçoivent un 401 simultanément,
// on ferait 3 appels /refresh. Ici on n'en fait qu'un seul et on
// rejoue toutes les requêtes en attente une fois le token obtenu.
let isRefreshing = false;
let pendingQueue  = []; // [{ resolve, reject }]

const processPendingQueue = (error, token = null) => {
    pendingQueue.forEach(({ resolve, reject }) =>
        error ? reject(error) : resolve(token)
    );
    pendingQueue = [];
};

/// ─ Intercepteur requête : injecter le token
http.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        /// - Si la requête envoie un FormData, laisser Axios définir
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/// ─ Intercepteur réponse : refresh token + erreurs
http.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        // ── Cas 401 : token expiré → tenter un refresh ──
        if (status === 401 && !originalRequest._retry && !isAuthRoute(originalRequest.url)) {
            originalRequest._retry = true;

            // Si un refresh est déjà en cours, mettre cette requête en attente
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueue.push({ resolve, reject });
                })
                .then(newToken => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return http(originalRequest);
                })
                .catch(err => Promise.reject(err));
            }

            // Démarrer le refresh
            isRefreshing = true;

            try {
                const refreshToken = store.getState().auth.refreshToken;

                // Utiliser une instance axios brute pour éviter de repasser dans nos intercepteurs
                const { data } = await axios.post(
                    `${app_url}/auth/refresh`,
                    { refreshToken },
                    { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }
                );

                store.dispatch(updateToken({ data }));

                const newToken = data.token;
                http.defaults.headers.common.Authorization = `Bearer ${newToken}`;
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                processPendingQueue(null, newToken);

                return http(originalRequest);

            } catch (refreshError) {
                processPendingQueue(refreshError, null);
                store.dispatch(resetAuthData());
                window.location.href = '/auth/login';
                return Promise.reject(refreshError);

            } finally {
                isRefreshing = false;
            }
        }

        // ── Normaliser l'erreur pour un usage uniforme dans les services
        return Promise.reject(normalizeError(error));
    }
);

const normalizeError = (error) => {
    if (error.response) {
        // Erreur serveur (4xx, 5xx)
        const { status, data } = error.response;
        const message = data?.message ?? getDefaultMessage(status);
        const normalized = new Error(message);
        normalized.status = status;
        normalized.errors = data?.errors ?? null; // erreurs de validation Laravel
        return normalized;
    }

    if (error.request) {
        // Requête envoyée mais pas de réponse
        const normalized = new Error('Impossible de contacter le serveur. Vérifiez votre connexion.');
        normalized.status = 0;
        return normalized;
    }

    // Erreur de configuration Axios
    return error;
};

const getDefaultMessage = (status) => {
    const messages = {
        400: 'Requête invalide.',
        401: 'Non authentifié.',
        403: 'Accès non autorisé.',
        404: 'Ressource introuvable.',
        422: 'Les données envoyées sont invalides.',
        429: 'Trop de requêtes. Veuillez patienter.',
        500: 'Erreur interne du serveur.',
        503: 'Service temporairement indisponible.',
    };
    return messages[status] ?? `Erreur inattendue (${status}).`;
};

export default http;