import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSave } from 'react-icons/hi';

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'مسابقة وزارة التربية والتعليم',
    siteDescription: 'نظام إدارة مسابقة وزارة التربية والتعليم 2024',
    allowRegistration: true,
    requireApproval: false,
    emailNotifications: true,
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('تم حفظ الإعدادات بنجاح!');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">الإعدادات</h1>
        <p className="text-gray-500">إدارة إعدادات النظام</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">إعدادات عامة</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم الموقع
              </label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                وصف الموقع
              </label>
              <textarea
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">إعدادات التسجيل</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-gray-800">السماح بالتسجيل</p>
                <p className="text-sm text-gray-500">تمكين المستخدمين الجدد من التسجيل</p>
              </div>
              <input
                type="checkbox"
                name="allowRegistration"
                checked={settings.allowRegistration}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-gray-800">تتطلب الموافقة</p>
                <p className="text-sm text-gray-500">موافقة المدير على حسابات المستخدمين الجدد</p>
              </div>
              <input
                type="checkbox"
                name="requireApproval"
                checked={settings.requireApproval}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">إعدادات أخرى</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-gray-800">إشعارات البريد الإلكتروني</p>
                <p className="text-sm text-gray-500">إرسال إشعارات عبر البريد الإلكتروني</p>
              </div>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-gray-800">وضع الصيانة</p>
                <p className="text-sm text-gray-500">تعطيل الموقع مؤقتاً للصيانة</p>
              </div>
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
          >
            <HiOutlineSave className="w-5 h-5" />
            <span>حفظ الإعدادات</span>
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default Settings;
