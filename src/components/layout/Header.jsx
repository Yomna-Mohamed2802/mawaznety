import { useAuth } from '../../context/AuthContext';
import { HiOutlineBell, HiOutlineLogout, HiOutlineMenu, HiOutlineUser } from 'react-icons/hi';

const Header = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-primary-100/40">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-xl hover:bg-primary-50 transition-colors lg:hidden"
            aria-label="فتح القائمة"
          >
            <HiOutlineMenu className="w-5 h-5 text-primary-600" />
          </button>
          <div className="hidden lg:block">
            <h2 className="text-sm font-semibold text-primary-800">مرحباً بك في موازنتي</h2>
            <p className="text-xs text-primary-500">استكشف الموازنة العامة للدولة</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            className="relative p-2.5 rounded-xl hover:bg-primary-50 transition-colors"
            aria-label="الإشعارات"
          >
            <HiOutlineBell className="w-5 h-5 text-primary-500" />
            <span className="absolute top-2 left-2 w-2 h-2 bg-accent-red rounded-full ring-2 ring-white" />
          </button>

          <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-primary-50 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <HiOutlineUser className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-primary-800 leading-tight">{user?.name || 'Admin'}</p>
              <p className="text-xs text-primary-500 leading-tight">{user?.email || 'admin@example.com'}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2.5 rounded-xl hover:bg-red-50 transition-colors text-primary-500 hover:text-accent-red"
            title="تسجيل الخروج"
            aria-label="تسجيل الخروج"
          >
            <HiOutlineLogout className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
