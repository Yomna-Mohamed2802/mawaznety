import { useState } from 'react';
import { motion } from 'framer-motion';
import { budget100 } from '../data';
import { useLang } from '../context/LangContext';

const FinanceMinister = () => {
  const { lang, t } = useLang();
  const [allocations, setAllocations] = useState({
    education: 25,
    health: 25,
    social: 20,
    infrastructure: 15,
    defense: 10,
    other: 5
  });

  const total = Object.values(allocations).reduce((sum, val) => sum + val, 0);
  const remaining = 100 - total;

  const categories = [
    { id: 'education', name: t.fmCatEducation, icon: '🎓', color: '#2563EB', actual: 5.6 },
    { id: 'health', name: t.fmCatHealth, icon: '🏥', color: '#DC2626', actual: 5.6 },
    { id: 'social', name: t.fmCatSocial, icon: '🛡️', color: '#7C3AED', actual: 10.7 },
    { id: 'infrastructure', name: t.fmCatInfrastructure, icon: '🏗️', color: '#D97706', actual: 10.6 },
    { id: 'defense', name: t.fmCatDefense, icon: '⚔️', color: '#6B7280', actual: 8 },
    { id: 'other', name: t.fmCatOther, icon: '📋', color: '#10B981', actual: 10.5 }
  ];

  const handleAllocation = (id, value) => {
    const newValue = parseInt(value) || 0;
    const oldValue = allocations[id];
    const diff = newValue - oldValue;
    
    if (remaining - diff >= 0) {
      setAllocations({ ...allocations, [id]: newValue });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.fmTitle}</h1>
          <p className="text-gray-600">{t.fmSubtitle}</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className={`px-6 py-3 rounded-full ${remaining >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              <span className="font-bold text-xl">{remaining}</span>
              <span className="mr-1">{t.currency} {remaining >= 0 ? t.fmRemaining : t.fmExcess}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Allocation Panel */}
          <div className="space-y-4">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{cat.name}</h3>
                      <p className="text-xs text-gray-500">{t.fmReal}: {cat.actual}%</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-2xl font-bold" style={{ color: cat.color }}>
                      {allocations[cat.id]}%
                    </span>
                  </div>
                </div>
                
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={allocations[cat.id]}
                    onChange={(e) => handleAllocation(cat.id, e.target.value)}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${cat.color} ${allocations[cat.id] * 2}%, #e5e7eb ${allocations[cat.id] * 2}%)`
                    }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">0%</span>
                    <span className="text-xs text-gray-500">50%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            {/* Comparison Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.fmComparison}</h3>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{cat.name}</span>
                      <span className="text-gray-800">
                        <span className="font-bold">{allocations[cat.id]}%</span>
                        <span className="text-gray-500 mr-2">vs {cat.actual}%</span>
                      </span>
                    </div>
                    <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                      {/* Actual bar */}
                      <div
                        className="absolute h-full opacity-30 rounded-full"
                        style={{ width: `${cat.actual * 2}%`, backgroundColor: cat.color }}
                      />
                      {/* User allocation bar */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${allocations[cat.id] * 2}%` }}
                        className="absolute h-full rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{t.fmScore}</h3>
              <div className="text-6xl font-bold text-primary-600 mb-2">
                {calculateScore(allocations, categories)}
              </div>
              <p className="text-gray-500">{t.fmPoints}</p>
              <p className="text-sm text-gray-500 mt-2">
                {getScoreMessage(calculateScore(allocations, categories), t)}
              </p>
            </motion.div>

            {/* Share */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                const text = `${t.fmShare} ${Object.entries(allocations).map(([k,v])=> `${k}:${v}%`).join(' | ')}`;
                try {
                  if (navigator.share) { await navigator.share({ title: t.fmShareTitle, text }); return; }
                  if (navigator.clipboard) { await navigator.clipboard.writeText(text); return; }
                } catch {}
              }}
              className="w-full bg-primary-600 text-white py-4 rounded-xl font-medium text-lg hover:bg-primary-700 transition-colors"
            >
              {t.fmShareBtn} 📤
            </motion.button>
          </div>
        </div>

        {/* Source */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>{t.fmSource}</p>
        </div>
      </div>
    </div>
  );
};

const calculateScore = (allocations, categories) => {
  let score = 100;
  categories.forEach(cat => {
    const diff = Math.abs(allocations[cat.id] - cat.actual);
    score -= diff;
  });
  return Math.max(0, Math.min(100, score));
};

const getScoreMessage = (score, t) => {
  if (score >= 80) return t.fmScoreExcellent;
  if (score >= 60) return t.fmScoreGood;
  if (score >= 40) return t.fmScoreOk;
  return t.fmScoreBad;
};

export default FinanceMinister;
