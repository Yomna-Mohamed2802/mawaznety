import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import MawaznetyLogo from '../components/ui/MawaznetyLogo';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle, logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'حدث خطأ في تسجيل الدخول');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    setEmail('');
    setPassword('');
    setError('');
  };

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !window.google?.accounts?.id) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        try {
          const payload = JSON.parse(atob(response.credential.split('.')[1]));
          loginWithGoogle({
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
          });
          navigate('/');
        } catch {
          setError('فشل التسجيل عبر Google');
        }
      },
    });

    if (googleBtnRef.current) {
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'outline',
        size: 'large',
        width: '100%',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        lang: 'ar',
      });
    }
  }, [loginWithGoogle, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #102a43 0%, #243b53 50%, #334e68 100%)' }}>
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #486581 0%, transparent 50%), radial-gradient(circle at 75% 20%, #059669 0%, transparent 50%)' }} />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md relative"
      >
        <div className="bg-white rounded-3xl p-8" style={{ boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.1)' }}>
          <div className="text-center mb-8">
            <div className="flex justify-center mb-2">
              <MawaznetyLogo size="lg" showText={false} />
            </div>
            <h1 className="text-xl font-bold text-primary-900" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>موازنتي</h1>
            <p className="text-sm text-primary-500 mt-1">نظام مسابقة 2026</p>
          </div>

          {isAuthenticated ? (
            <div className="text-center space-y-4">
              <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-4">
                <p className="text-sm text-emerald-700 font-medium">أنت مسجل الدخول بالفعل</p>
                <p className="text-xs text-emerald-600 mt-1">{user?.email}</p>
              </div>

              <button
                onClick={() => navigate('/')}
                className="w-full btn-primary justify-center py-3.5"
              >
                الذهاب للوحة التحكم
              </button>

              <button
                onClick={handleLogout}
                className="w-full btn-secondary justify-center py-3.5 text-red-600 border-red-200 hover:bg-red-50"
              >
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-200/60 mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-primary-600 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-warm/50 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all text-sm text-primary-900 placeholder-primary-400"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-primary-600 mb-2">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-warm/50 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all text-sm text-primary-900 placeholder-primary-400"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-primary-200/60"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-primary-400">أو</span>
                </div>
              </div>

              {GOOGLE_CLIENT_ID ? (
                <div ref={googleBtnRef} className="w-full flex justify-center"></div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const mockGoogleUser = { email: 'yomna2008.mm@gmail.com', name: 'Yomna' };
                    loginWithGoogle(mockGoogleUser);
                    navigate('/');
                  }}
                  className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-primary-200 rounded-xl hover:bg-primary-50 transition-colors text-sm font-medium text-primary-700"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  تسجيل الدخول بحساب Google
                </button>
              )}

              <p className="text-center text-xs text-primary-500 mt-6">
                سجّل دخولك بالمعلومات الصحيحة للوصول للوحة التحكم
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
