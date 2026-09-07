import { motion } from 'framer-motion';

const StatsCard = ({ title, value, change, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-green-600 mt-1">{change}</p>
        </div>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
