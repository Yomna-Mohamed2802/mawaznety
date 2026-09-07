import { motion } from 'framer-motion';
import { 
  HiOutlineUsers, 
  HiOutlineClipboardCheck, 
  HiOutlineCurrencyDollar,
  HiOutlineTrendingUp 
} from 'react-icons/hi';
import StatsCard from '../components/ui/StatsCard';
import ActivityChart from '../components/charts/ActivityChart';
import RecentActivity from '../components/ui/RecentActivity';
import { budgetOverview, budgetHighlights } from '../data';

const Dashboard = () => {
  const stats = [
    { 
      title: budgetOverview.revenues.label, 
      value: budgetOverview.revenues.value || '0', 
      change: budgetOverview.revenues.change, 
      icon: HiOutlineTrendingUp, 
      color: 'green' 
    },
    { 
      title: budgetOverview.expenditures.label, 
      value: budgetOverview.expenditures.value || '0', 
      change: budgetOverview.expenditures.change, 
      icon: HiOutlineCurrencyDollar, 
      color: 'blue' 
    },
    { 
      title: budgetOverview.primarySurplus.label, 
      value: budgetOverview.primarySurplus.value || '0', 
      change: `+${budgetOverview.primarySurplus.percentage || 0}%`, 
      icon: HiOutlineClipboardCheck, 
      color: 'purple' 
    },
    { 
      title: budgetOverview.gdp.label, 
      value: budgetOverview.gdp.value || '0', 
      change: `+${budgetOverview.gdp.growthRate || 0}%`, 
      icon: HiOutlineUsers, 
      color: 'orange' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
          <p className="text-gray-500">مرحباً بك في نظام مسابقة وزارة التربية</p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
