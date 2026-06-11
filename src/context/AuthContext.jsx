import { createContext, useContext, useMemo, useState } from 'react';
import { authApi } from '../api/endpoints';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('vyapar_admin_token'));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vyapar_admin_user') || 'null'); } catch { return null; }
  });

  const login = async (payload) => {
    const { data } = await authApi.login(payload);
    const authToken = data.token || data.data?.token;
    const authUser = data.user || data.data?.user || data.data;
    if (!authToken) throw new Error('Login response did not include token');
    localStorage.setItem('vyapar_admin_token', authToken);
    localStorage.setItem('vyapar_admin_user', JSON.stringify(authUser || {}));
    setToken(authToken);
    setUser(authUser || {});
  };

  const logout = () => {
    localStorage.removeItem('vyapar_admin_token');
    localStorage.removeItem('vyapar_admin_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, login, logout, setUser }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
