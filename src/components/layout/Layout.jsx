import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import CookieConsent from '../ui/CookieConsent';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LangContext';
import { incrementCounter, trackEvent, subscribeEmail } from '../../services/db';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [email, setEmail] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const { isAuthenticated, loading } = useAuth();
  const { t } = useLang();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      incrementCounter('totalVisitors').catch(() => {});
    }
  }, [isAuthenticated]);

  useEffect(() => {
    trackEvent('page_view', location.pathname).catch(() => {});
  }, [location.pathname]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const result = await subscribeEmail(email.trim());
      if (result.success) {
        setEmailMsg('تم الاشتراك بنجاح!');
        setEmail('');
      } else {
        setEmailMsg(result.error);
      }
    } catch {
      setEmailMsg('حدث خطأ، حاول مرة أخرى');
    }
    setTimeout(() => setEmailMsg(''), 3000);
  };

  if (loading) {;
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-primary-200 border-t-primary-700 rounded-full animate-spin" />
          <p className="text-sm text-primary-500 font-medium">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-surface">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-primary-700"
      >
        {t.skipToContent || 'Skip to content'}
      </a>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:mr-16' : 'lg:mr-64'}`}>
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main id="main-content" className="pt-2 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </main>
        <footer className="border-t border-primary-100/60 bg-white/50 py-6 px-4">
          <div className="max-w-6xl mx-auto text-center space-y-3">
            <p className="text-xs text-primary-500 leading-relaxed">
              {t.footerDisclaimer}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <Link to="/privacy" className="text-primary-500 hover:text-primary-700 underline">{t.footerPrivacy}</Link>
              <Link to="/terms" className="text-primary-500 hover:text-primary-700 underline">{t.footerTerms}</Link>
              <Link to="/cookies" className="text-primary-500 hover:text-primary-700 underline">{t.footerCookies}</Link>
              <Link to="/refund" className="text-primary-500 hover:text-primary-700 underline">{t.footerRefund}</Link>
            </div>
            <form onSubmit={handleEmailSubmit} className="flex items-center justify-center gap-2 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="اشترك في التحديثات"
                className="flex-1 px-3 py-2 text-xs border border-primary-200 rounded-lg focus:ring-1 focus:ring-primary-400 outline-none"
              />
              <button type="submit" className="px-3 py-2 text-xs bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                اشتراك
              </button>
            </form>
            {emailMsg && <p className="text-xs text-primary-600">{emailMsg}</p>}
            <p className="text-[10px] text-primary-400">{t.footerCopyright}</p>
          </div>
        </footer>
      </div>
      <CookieConsent />
    </div>
  );
};

export default Layout;
