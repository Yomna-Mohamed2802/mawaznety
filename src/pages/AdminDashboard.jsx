import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineUsers, HiOutlineChartBar, HiOutlineCheckCircle,
  HiOutlineMail, HiOutlineCog,
  HiOutlineArrowLeft, HiOutlineEye,
} from 'react-icons/hi';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import { getAdminAnalytics } from '../services/db';

const ADMIN_EMAILS = ['yomna2008.mm@gmail.com', 'yomna@gmail.com'];

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-primary-100/40 p-5 relative overflow-hidden">
      <div className={`absolute top-0 left-0 h-1 w-full ${color}`} />
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color.replace('bg-', 'bg-')}/10`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div>
          <p className="text-2xl font-bold text-primary-800">{value}</p>
          <p className="text-xs text-primary-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const { t } = useLang();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.isAdmin || ADMIN_EMAILS.includes(user?.email);

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    getAdminAnalytics()
      .then(setAnalytics)
      .finally(() => setLoading(false));
  }, [isAdmin]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{t.unauthorized || 'غير مصرح'}</h2>
          <p className="text-gray-500">{t.loginRequired || 'يجب تسجيل الدخول أولاً'}</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{t.unauthorized || 'غير مصرح'}</h2>
          <p className="text-gray-500">{t.adminRequired || 'يجب أن تكون مديراً للوصول لهذه الصفحة'}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-500">{t.loading || 'جاري التحميل...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
          <p className="text-primary-600">إحصائيات الموقع والاستخدام</p>
        </div>
        <a href="/reports" className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-800">
          <HiOutlineArrowLeft className="w-4 h-4" />
          التقارير العامة
        </a>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard icon={HiOutlineUsers} label="الزوار" value={analytics?.eventsByType?.totalVisitors || 0} color="bg-primary-500" />
        <StatCard icon={HiOutlineEye} label="مشاهدات الصفحة" value={analytics?.totalEvents || 0} color="bg-blue-500" />
        <StatCard icon={HiOutlineCheckCircle} label="التصويتات" value={analytics?.totalVotes || 0} color="bg-amber-500" />
        <StatCard icon={HiOutlineCheckCircle} label="اختبارات مكتملة" value={analytics?.totalQuizScores || 0} color="bg-violet-500" />
        <StatCard icon={HiOutlineChatBubbleLeftRight} label="أسئلة الشات بوت" value={analytics?.eventsByType?.questionsAsked || 0} color="bg-emerald-500" />
        <StatCard icon={HiOutlineMail} label="مشتركين البريد" value={analytics?.totalEmails || 0} color="bg-rose-500" />
      </div>

      {/* Events by Type */}
      {analytics?.eventsByType && Object.keys(analytics.eventsByType).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">الأحداث حسب النوع</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(analytics.eventsByType).map(([event, count]) => (
              <div key={event} className="bg-primary-50 rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-primary-700">{count}</p>
                <p className="text-xs text-primary-500">{event}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Events */}
      {analytics?.recentEvents && analytics.recentEvents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">آخر الأحداث</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2 font-medium">الحدث</th>
                  <th className="pb-2 font-medium">الصفحة</th>
                  <th className="pb-2 font-medium">الوقت</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentEvents.slice(0, 20).map((event) => (
                  <tr key={event.id} className="border-b border-gray-100">
                    <td className="py-2 text-primary-700 font-medium">{event.event_name}</td>
                    <td className="py-2 text-gray-500">{event.page || '—'}</td>
                    <td className="py-2 text-gray-400 text-xs">
                      {new Date(event.created_at).toLocaleString('ar-EG')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
