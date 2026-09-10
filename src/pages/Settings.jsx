import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSave } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import { getSettings, saveSettingsAdmin } from '../services/db';

const Settings = () => {
  const { lang, t } = useLang();
  const { user, isAuthenticated } = useAuth();
  const [settings, setSettings] = useState({
    siteName: 'موازنتي',
    siteDescription: 'مشروع تعليمي مستقل لموازنة المواطن المصرية 2026/2027',
    allowRegistration: true,
    requireApproval: false,
    emailNotifications: true,
    maintenanceMode: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();
        if (data) setSettings(data);
      } catch (err) {
        console.warn('Settings load failed, using defaults:', err);
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await saveSettingsAdmin(settings);
      setMessage(t.saved);
    } catch (err) {
      setMessage(t.saveError);
    }
    setSaving(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{t.unauthorized}</h2>
          <p className="text-gray-500">{t.loginRequired}</p>
        </div>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{t.unauthorized}</h2>
          <p className="text-gray-500">{t.adminRequired || 'يجب أن تكون مديراً للوصول لهذه الصفحة'}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-500">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t.settingsTitle}</h1>
        <p className="text-primary-600">{t.settingsDesc}</p>
        {user?.isAdmin && (
          <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">{t.admin}</span>
        )}
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-xl text-sm text-center ${
          message.includes('خطأ') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.generalSettings}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.siteName}
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
                {t.siteDescLabel}
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.regSettings}</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-gray-800">{t.allowReg}</p>
                <p className="text-sm text-gray-500">{t.allowRegDesc}</p>
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
                <p className="font-medium text-gray-800">{t.requireApproval}</p>
                <p className="text-sm text-gray-500">{t.requireApprovalDesc}</p>
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.otherSettings}</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
              <div>
                <p className="font-medium text-gray-800">{t.emailNotif}</p>
                <p className="text-sm text-gray-500">{t.emailNotifDesc}</p>
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
                <p className="font-medium text-gray-800">{t.maintMode}</p>
                <p className="text-sm text-gray-500">{t.maintModeDesc}</p>
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
            disabled={saving}
            className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
          >
            <HiOutlineSave className="w-5 h-5" />
            <span>{saving ? t.saving : t.saveSettings}</span>
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default Settings;
