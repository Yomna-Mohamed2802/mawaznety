import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineChartBar, HiOutlineClock } from 'react-icons/hi';
import { subscribeToAnalytics } from '../services/firestore';

const Reports = () => {
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    questionsAsked: 0,
    quizzesCompleted: 0,
    totalVotes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAnalytics((data) => {
      setAnalytics(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const stats = [
    { label: 'إجمالي الزوار', value: analytics.totalVisitors || 0, color: 'blue' },
    { label: 'الأسئلة المطروحة', value: analytics.questionsAsked || 0, color: 'green' },
    { label: 'الاختبارات المكتملة', value: analytics.quizzesCompleted || 0, color: 'purple' },
    { label: 'التصويتات', value: analytics.totalVotes || 0, color: 'amber' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">التقارير</h1>
        <p className="text-gray-500">تحليل البيانات والإحصائيات</p>
      </div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-12 text-center"
        >
          <p className="text-gray-500">جاري تحميل البيانات...</p>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 mb-5">
              <HiOutlineChartBar className="w-8 h-8 text-primary-400" />
            </div>
            <h2 className="text-xl font-bold text-primary-900 mb-2">إحصائيات الموقع</h2>
            <p className="text-primary-500 text-sm max-w-md mx-auto leading-relaxed">
              البيانات الفعلية من استخدام المستخدمين على الموقع
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl shadow-sm border border-primary-100/40 p-5 text-center"
              >
                <p className="text-3xl font-bold text-primary-800">{stat.value}</p>
                <p className="text-xs text-primary-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
