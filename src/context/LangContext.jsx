import { createContext, useContext, useState, useCallback } from 'react';

const translations = {
  ar: {
    welcome: 'مرحباً بك في موازنتي',
    subtitle: 'استكشف الموازنة العامة للدولة',
    notifications: 'الإشعارات',
    noNotifications: 'لا توجد إشعارات جديدة',
    logout: 'تسجيل الخروج',
    home: 'لوحة التحكم',
    budget100: 'الموازنة من 100',
    financeMinister: 'وزير المالية',
    quiz: 'الاختبارات',
    voting: 'التصويت',
    reports: 'التقارير',
    settings: 'الإعدادات',
    settingsTitle: 'الإعدادات',
    settingsDesc: 'إدارة إعدادات النظام',
    generalSettings: 'إعدادات عامة',
    siteName: 'اسم الموقع',
    siteDescription: 'وصف الموقع',
    registrationSettings: 'إعدادات التسجيل',
    allowRegistration: 'السماح بالتسجيل',
    allowRegistrationDesc: 'تمكين المستخدمين الجدد من التسجيل',
    requireApproval: 'تتطلب الموافقة',
    requireApprovalDesc: 'موافقة المدير على حسابات المستخدمين الجدد',
    otherSettings: 'إعدادات أخرى',
    emailNotifications: 'إشعارات البريد الإلكتروني',
    emailNotificationsDesc: 'إرسال إشعارات عبر البريد الإلكتروني',
    maintenanceMode: 'وضع الصيانة',
    maintenanceModeDesc: 'تعطيل الموقع مؤقتاً للصيانة',
    save: 'حفظ الإعدادات',
    saving: 'جاري الحفظ...',
    saved: 'تم حفظ الإعدادات بنجاح!',
    saveError: 'حدث خطأ أثناء الحفظ',
    loading: 'جاري التحميل...',
    unauthorized: 'غير مصرح',
    loginRequired: 'يجب تسجيل الدخول أولاً',
    admin: 'مدير',
    language: 'اللغة',
  },
  en: {
    welcome: 'Welcome to Mawaznety',
    subtitle: 'Explore the national budget',
    notifications: 'Notifications',
    noNotifications: 'No new notifications',
    logout: 'Logout',
    home: 'Dashboard',
    budget100: 'Budget from 100',
    financeMinister: 'Finance Minister',
    quiz: 'Quiz',
    voting: 'Voting',
    reports: 'Reports',
    settings: 'Settings',
    settingsTitle: 'Settings',
    settingsDesc: 'Manage system settings',
    generalSettings: 'General Settings',
    siteName: 'Site Name',
    siteDescription: 'Site Description',
    registrationSettings: 'Registration Settings',
    allowRegistration: 'Allow Registration',
    allowRegistrationDesc: 'Enable new users to register',
    requireApproval: 'Require Approval',
    requireApprovalDesc: 'Admin approval for new accounts',
    otherSettings: 'Other Settings',
    emailNotifications: 'Email Notifications',
    emailNotificationsDesc: 'Send notifications via email',
    maintenanceMode: 'Maintenance Mode',
    maintenanceModeDesc: 'Temporarily disable the site',
    save: 'Save Settings',
    saving: 'Saving...',
    saved: 'Settings saved successfully!',
    saveError: 'Error saving settings',
    loading: 'Loading...',
    unauthorized: 'Unauthorized',
    loginRequired: 'Please login first',
    admin: 'Admin',
    language: 'Language',
  },
};

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'ar');

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'ar' ? 'en' : 'ar';
      localStorage.setItem('lang', next);
      document.documentElement.lang = next;
      document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
      return next;
    });
  }, []);

  const t = translations[lang] || translations.ar;

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) throw new Error('useLang must be used within LangProvider');
  return context;
};
