import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api, authToken, AdminUser } from './api';

type AuthContextValue = {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Au premier chargement : si un token est déjà stocké (rechargement de
  // page), on vérifie qu'il est toujours valide auprès de l'API.
  useEffect(() => {
    if (!authToken.get()) {
      setLoading(false);
      return;
    }
    api.me()
      .then(setUser)
      .catch(() => authToken.clear())
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const { token, user } = await api.login(email, password);
    authToken.set(token);
    setUser(user);
  }

  async function logout() {
    try {
      await api.logout();
    } finally {
      authToken.clear();
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé à l\'intérieur de <AuthProvider>');
  return ctx;
}
