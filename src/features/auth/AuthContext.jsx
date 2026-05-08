import { createContext, useState, useEffect } from 'react';
import { fetchCurrentUser, login as apiLogin, logout as apiLogout } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifie la session au démarrage
  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const { user } = await apiLogin(email, password);
    setUser(user);
  }

  async function logout() {
    await apiLogout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook interne — on l'exporte aussi pour simplicité
export { AuthContext }