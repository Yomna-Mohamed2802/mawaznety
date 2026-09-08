import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import CookieConsent from '../ui/CookieConsent';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LangContext';
import { incrementCounter } from '../../services/firestore';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const { isAuthenticated, loading } = useAuth();
  const { t } = useLang();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      incrementCounter('totalVisitors').catch(() => {});
    }
  }, [isAuthenticated]);

  if (loading) {
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
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:mr-16' : 'lg:mr-64'}`}>
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="pt-2 pb-8">
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
            <p className="text-[10px] text-primary-400">{t.footerCopyright}</p>
          </div>
        </footer>
      </div>
      <CookieConsent />
    </div>
  );
};

export default Layout;
