import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LangContext';
import { HiOutlineBell, HiOutlineLogout, HiOutlineMenu, HiOutlineUser } from 'react-icons/hi';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();
  const { lang, toggleLang, t } = useLang();
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-primary-100/40">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-xl hover:bg-primary-50 transition-colors lg:hidden"
            aria-label={t.openMenu}
          >
            <HiOutlineMenu className="w-5 h-5 text-primary-600" />
          </button>
          <div className="hidden lg:block">
            <h2 className="text-sm font-semibold text-primary-800">{t.welcome}</h2>
            <p className="text-xs text-primary-500">{t.subtitle}</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors"
            aria-label={t.language}
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2.5 rounded-xl hover:bg-primary-50 transition-colors"
              aria-label={t.notifications}
            >
              <HiOutlineBell className="w-5 h-5 text-primary-500" />
            </button>
            <AnimatePresence>
              {showNotif && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-primary-100/60 p-4 z-50"
                >
                  <p className="text-sm font-semibold text-primary-800 mb-2">{t.notifications}</p>
                  <p className="text-xs text-primary-500">{t.noNotifications}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User info */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <HiOutlineUser className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-primary-800 leading-tight">{user?.name || 'User'}</p>
              <p className="text-xs text-primary-500 leading-tight">{user?.email || ''}</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="p-2.5 rounded-xl hover:bg-red-50 transition-colors text-primary-500 hover:text-accent-red"
            title={t.logout}
            aria-label={t.logout}
          >
            <HiOutlineLogout className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
