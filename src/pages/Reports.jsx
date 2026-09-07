import { motion } from 'framer-motion';
import { HiOutlineChartBar, HiOutlineClock } from 'react-icons/hi';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">التقارير</h1>
        <p className="text-gray-500">تحليل البيانات والإحصائيات</p>
      </div>

      {/* Coming soon placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-12 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 mb-5">
          <HiOutlineClock className="w-8 h-8 text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-primary-900 mb-2">التقارير قادمة قريباً</h2>
        <p className="text-primary-500 text-sm max-w-md mx-auto leading-relaxed">
          إحصائيات الموقع هتظهر هنا بناءً على استخدام المستخدمين الفعليين. شكراً لاستخدامك موازنتي!
        </p>
      </motion.div>

      {/* Stats overview — real zero values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي الزوار', value: '0', color: 'blue' },
          { label: 'الأسئلة المطروحة', value: '0', color: 'green' },
          { label: 'الاختبارات المكتملة', value: '0', color: 'purple' },
          { label: 'التصويتات', value: '0', color: 'amber' },
        ].map((stat, i) => (
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
    </div>
  );
};

export default Reports;
