import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { createUserProfile, updateUserProfile } from '../services/db';

const ADMIN_EMAILS = ['yomna2008.mm@gmail.com', 'yomna@gmail.com'];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsAuthenticated(true);

        const profileData = {
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          avatar: firebaseUser.photoURL || null,
          provider: firebaseUser.providerData?.[0]?.providerId || 'unknown',
          emailVerified: firebaseUser.emailVerified,
        };

        const isAdmin = ADMIN_EMAILS.includes(firebaseUser.email);
        setUser({ uid: firebaseUser.uid, ...profileData, isAdmin });
        setLoading(false);

        // Sync profile to Supabase in background (INSERT/UPDATE work, SELECT denied by RLS)
        try {
          await createUserProfile(firebaseUser.uid, profileData);
          await updateUserProfile(firebaseUser.uid, profileData);
        } catch (e) {
          console.warn('Profile sync error:', e);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.emailVerified) {
        await sendEmailVerification(result.user);
        return { success: false, error: 'يجب تأكيد بريدك الإلكتروني أولاً. تم إرسال رابط التأكيد مرة أخرى.' };
      }
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
      await sendEmailVerification(result.user);
      return { success: true, message: 'تم إرسال رابط التأكيد على بريدك الإلكتروني. يجب تأكيد البريد قبل تسجيل الدخول.' };
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
      if (error.code === 'auth/account-exists-with-different-credential') {
        return { success: false, error: 'الحساب موجود بوسيلة تسجيل دخول مختلفة' };
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
