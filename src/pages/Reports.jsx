import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineChartBar } from 'react-icons/hi';
import { useLang } from '../context/LangContext';
import { getPublicStats } from '../services/db';

const Reports = () => {
  const { lang, t } = useLang();
  const [analytics, setAnalytics] = useState({
    totalVisitors: 0,
    questionsAsked: 0,
    quizzesCompleted: 0,
    totalVotes: 0,
  });

  useEffect(() => {
    getPublicStats()
      .then(setAnalytics)
      .catch(() => {});
  }, []);

  const stats = [
    { label: t.reportsVisitors, value: analytics.totalVisitors || 0, color: 'bg-primary-500' },
    { label: t.reportsQuestions, value: analytics.questionsAsked || 0, color: 'bg-emerald-500' },
    { label: t.reportsQuizzes, value: analytics.quizzesCompleted || 0, color: 'bg-violet-500' },
    { label: t.reportsVotes, value: analytics.totalVotes || 0, color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{t.reportsTitle}</h1>
        <p className="text-gray-500">{t.reportsSubtitle}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 mb-5">
          <HiOutlineChartBar className="w-8 h-8 text-primary-400" />
        </div>
        <h2 className="text-xl font-bold text-primary-900 mb-2">{t.reportsStats}</h2>
        <p className="text-primary-500 text-sm max-w-md mx-auto leading-relaxed">
          {t.reportsDesc}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-xl shadow-sm border border-primary-100/40 p-5 text-center relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 h-1 w-full ${stat.color}`} />
            <p className="text-3xl font-bold text-primary-800">{stat.value}</p>
            <p className="text-xs text-primary-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
