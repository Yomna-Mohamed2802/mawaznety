import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineHome,
  HiOutlineClipboardCheck,
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineX,
  HiOutlineDocumentText,
  HiOutlineChevronLeft,
} from 'react-icons/hi';
import MawaznetyLogo from '../ui/MawaznetyLogo';
import { useLang } from '../../context/LangContext';

const Sidebar = ({ isOpen, onClose, collapsed, onToggleCollapse }) => {
  const location = useLocation();
  const { t } = useLang();

  const menuItems = [
    { path: '/', label: t.home, icon: HiOutlineHome },
    { path: '/budget100', label: t.budget100, icon: HiOutlineChartBar },
    { path: '/finance-minister', label: t.financeMinister, icon: HiOutlineDocumentText },
    { path: '/quiz', label: t.quiz, icon: HiOutlineClipboardCheck },
    { path: '/voting', label: t.voting, icon: HiOutlineSparkles },
    { path: '/reports', label: t.reports, icon: HiOutlineChartBar },
    { path: '/settings', label: t.settings, icon: HiOutlineCog },
  ];

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-primary-900/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full bg-white border-l border-primary-100/60 z-50 lg:translate-x-0 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        } ${collapsed ? 'lg:w-[4.5rem]' : 'lg:w-64'}`}
        style={{ boxShadow: '0 0 30px -10px rgb(16 42 67 / 0.06)' }}
      >
        {/* Logo + Toggle */}
        <div className={`border-b border-primary-100/60 flex items-center ${collapsed ? 'px-2 py-4 flex-col gap-2' : 'px-5 py-5 justify-between'}`}>
          <div className={`${collapsed ? 'flex justify-center' : ''}`}>
            <MawaznetyLogo size="sm" showText={!collapsed} />
          </div>

          {/* Toggle + Close buttons */}
          <div className={`flex items-center ${collapsed ? 'flex-col gap-1' : 'gap-1'}`}>
            {/* Desktop toggle */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-primary-100 transition-colors"
              title={collapsed ? 'Expand' : 'Collapse'}
              aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
            >
              <HiOutlineChevronLeft className={`w-4 h-4 text-primary-500 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} />
            </button>
            {/* Mobile close */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg hover:bg-primary-100 transition-colors"
              aria-label="Close menu"
            >
              <HiOutlineX className="w-4 h-4 text-primary-500" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    title={collapsed ? item.label : undefined}
                    className={`relative flex items-center gap-3 rounded-xl transition-all duration-200 text-sm ${
                      collapsed ? 'px-0 py-2.5 justify-center' : 'px-3.5 py-2.5'
                    } ${
                      isActive
                        ? 'bg-primary-800 text-white font-semibold'
                        : 'text-primary-600 hover:bg-primary-50 hover:text-primary-800'
                    }`}
                  >
                    <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-white/90' : 'text-primary-500'}`} />
                    {!collapsed && <span>{item.label}</span>}
                    {isActive && !collapsed && (
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-white/30 rounded-full" />
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer badge */}
        {!collapsed && (
          <div className="p-3 border-t border-primary-100/60">
            <div className="bg-gradient-to-l from-primary-50 to-surface-warm rounded-xl p-3.5 border border-primary-100/40">
              <p className="text-xs font-semibold text-primary-700">{t.sidebarProject}</p>
              <p className="text-xs text-primary-500 mt-0.5">{t.sidebarBudget}</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
