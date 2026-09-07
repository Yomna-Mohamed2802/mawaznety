import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

const monthlyData = [
  { name: 'يناير', users: 400, quizzes: 240, votes: 240 },
  { name: 'فبراير', users: 300, quizzes: 139, votes: 221 },
  { name: 'مارس', users: 200, quizzes: 980, votes: 229 },
  { name: 'أبريل', users: 278, quizzes: 390, votes: 200 },
  { name: 'مايو', users: 189, quizzes: 480, votes: 218 },
  { name: 'يونيو', users: 239, quizzes: 380, votes: 250 },
];

const pieData = [
  { name: 'مكتمل', value: 400, color: '#22c55e' },
  { name: 'قيد التنفيذ', value: 300, color: '#f59e0b' },
  { name: 'لم يبدأ', value: 200, color: '#ef4444' },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">التقارير</h1>
        <p className="text-gray-500">تحليل البيانات والإحصائيات</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">النشاط الشهري</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#3b82f6" name="المستخدمين" />
              <Bar dataKey="quizzes" fill="#22c55e" name="الاختبارات" />
              <Bar dataKey="votes" fill="#8b5cf6" name="التصويتات" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">الاتجاه العام</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="المستخدمين" />
              <Line type="monotone" dataKey="quizzes" stroke="#22c55e" strokeWidth={2} name="الاختبارات" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">حالة المشاريع</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">ملخص سريع</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">إجمالي المستخدمين</span>
              <span className="font-bold text-blue-600">2,543</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">الاختبارات المكتملة</span>
              <span className="font-bold text-green-600">1,823</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700">إجمالي التصويتات</span>
              <span className="font-bold text-purple-600">5,234</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-gray-700">ال المشاركات النشطة</span>
              <span className="font-bold text-orange-600">892</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;
