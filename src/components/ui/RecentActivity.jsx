import { motion } from 'framer-motion';

const activities = [
  { id: 1, user: 'أحمد محمد', action: 'أكمل اختبار', time: 'منذ 5 دقائق', type: 'quiz' },
  { id: 2, user: 'سارة علي', action: 'صووت لمرشح', time: 'منذ 10 دقائق', type: 'vote' },
  { id: 3, user: 'محمد حسن', action: 'سجل حساب جديد', time: 'منذ 15 دقيقة', type: 'register' },
  { id: 4, user: 'فاطمة أحمد', action: 'أكمل اختبار', time: 'منذ 20 دقيقة', type: 'quiz' },
  { id: 5, user: 'علي محمود', action: 'صووت لمرشح', time: 'منذ 25 دقيقة', type: 'vote' },
];

const RecentActivity = () => {
  const typeColors = {
    quiz: 'bg-blue-100 text-blue-600',
    vote: 'bg-purple-100 text-purple-600',
    register: 'bg-green-100 text-green-600',
  };

  const typeLabels = {
    quiz: 'اختبار',
    vote: 'تصويت',
    register: 'تسجيل',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">النشاط الأخير</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${typeColors[activity.type]}`}>
              {typeLabels[activity.type]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{activity.user}</p>
              <p className="text-xs text-gray-500">{activity.action}</p>
            </div>
            <span className="text-xs text-gray-400">{activity.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
