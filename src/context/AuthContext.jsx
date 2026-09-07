import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          avatar: firebaseUser.photoURL || null,
          provider: firebaseUser.providerData?.[0]?.providerId || 'password',
        };
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      const messages = {
        'auth/user-not-found': 'البريد الإلكتروني غير مسجل',
        'auth/wrong-password': 'كلمة المرور غير صحيحة',
        'auth/invalid-email': 'البريد الإلكتروني غير صالح',
        'auth/too-many-requests': 'تم حظر الحساب مؤقتاً بسبب محاولات كثيرة',
        'auth/invalid-credential': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
      };
      return { success: false, error: messages[error.code] || 'حدث خطأ في تسجيل الدخول' };
    }
  };

  const register = async (email, password, name) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(result.user, { displayName: name });
      }
      return { success: true };
    } catch (error) {
      const messages = {
        'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل',
        'auth/weak-password': 'كلمة المرور ضعيفة (٦ أحرف على الأقل)',
        'auth/invalid-email': 'البريد الإلكتروني غير صالح',
      };
      return { success: false, error: messages[error.code] || 'حدث خطأ في التسجيل' };
    }
  };

  const loginWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      return { success: true };
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'تم إغلاق نافذة تسجيل الدخول' };
      }
      return { success: false, error: 'حدث خطأ في تسجيل الدخول بـ Google' };
    }
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, loginWithGoogle, logout }}>
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
