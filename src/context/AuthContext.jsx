import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const ADMIN_USERS = [
  { email: 'yomna@gmail.com', password: 'BOFELIA ISLAND', name: 'Yomna' },
  { email: 'yomna2008.mm@gmail.com', password: 'BOFELIA ISLAND', name: 'Yomna' },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const match = ADMIN_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (match) {
      const userData = { id: 1, email: match.email, name: match.name, role: 'admin' };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
  };

  const loginWithGoogle = useCallback((googleUser) => {
    const userData = {
      id: 2,
      email: googleUser.email,
      name: googleUser.name || googleUser.email.split('@')[0],
      role: 'admin',
      avatar: googleUser.picture || null,
      provider: 'google',
    };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true };
  }, []);

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
