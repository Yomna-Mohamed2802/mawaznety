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
  HiOutlineChevronRight,
} from 'react-icons/hi';

const menuItems = [
  { path: '/', label: 'لوحة التحكم', icon: HiOutlineHome },
  { path: '/budget100', label: 'الموازنة من 100', icon: HiOutlineChartBar },
  { path: '/finance-minister', label: 'وزير المالية', icon: HiOutlineDocumentText },
  { path: '/quiz', label: 'الاختبارات', icon: HiOutlineClipboardCheck },
  { path: '/voting', label: 'التصويت', icon: HiOutlineSparkles },
  { path: '/reports', label: 'التقارير', icon: HiOutlineChartBar },
  { path: '/settings', label: 'الإعدادات', icon: HiOutlineCog },
];

const Sidebar = ({ isOpen, onClose, collapsed, onToggleCollapse }) => {
  const location = useLocation();

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

      {/* Desktop collapse toggle */}
      <button
        onClick={onToggleCollapse}
        className="hidden lg:flex fixed top-4 z-50 items-center justify-center w-8 h-8 rounded-lg bg-white border border-primary-200/60 hover:bg-primary-50 transition-colors shadow-sm"
        style={{ right: collapsed ? '0.5rem' : '16.5rem' }}
        aria-label={collapsed ? 'توسيع القائمة' : 'طي القائمة'}
      >
        <HiOutlineChevronRight className={`w-4 h-4 text-primary-600 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '100%',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 35 }}
        className={`fixed right-0 top-0 h-full bg-white border-l border-primary-100/60 z-50 lg:translate-x-0 flex flex-col transition-all duration-300 ${collapsed ? 'lg:w-16' : 'lg:w-64'}`}
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)', width: collapsed ? undefined : undefined, boxShadow: '0 0 30px -10px rgb(16 42 67 / 0.06)' }}
      >
        {/* Logo */}
        <div className={`border-b border-primary-100/60 flex items-center ${collapsed ? 'px-2 py-4 justify-center' : 'px-5 py-5 justify-between'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-primary-900 rounded-xl flex items-center justify-center flex-shrink-0" style={{ boxShadow: '0 2px 8px -2px rgb(16 42 67 / 0.3)' }}>
              <span className="text-white font-bold text-lg">م</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-primary-900 text-base">موازنتي</h1>
                <p className="text-xs text-primary-500">موازنة المواطن 2026/2027</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg hover:bg-primary-50 transition-colors"
            >
              <HiOutlineX className="w-4 h-4 text-primary-500" />
            </button>
          )}
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
                      collapsed ? 'px-3 py-2.5 justify-center' : 'px-3.5 py-2.5'
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
              <p className="text-xs font-semibold text-primary-700">وزارة التربية والتعليم</p>
              <p className="text-xs text-primary-500 mt-0.5">مسابقة 2026</p>
            </div>
          </div>
        )}
      </motion.aside>
    </>
  );
};

export default Sidebar;
