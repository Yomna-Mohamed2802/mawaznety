import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { budget100 } from '../data';
import { useLang } from '../context/LangContext';

const Budget100 = () => {
  const { lang, t } = useLang();
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const totalPercentage = budget100.reduce((sum, item) => sum + item.percentage, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.budget100Title}</h1>
        <p className="text-gray-600">{t.budget100Subtitle}</p>
        <div className="mt-4 inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
          <span className="text-4xl font-bold text-primary-600">100</span>
          <span className="text-lg text-gray-600">{t.egp}</span>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart / Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="relative">
            {/* Circular Progress */}
            <svg viewBox="0 0 200 200" className="w-full h-80">
              {budget100.map((item, index) => {
                const startAngle = budget100
                  .slice(0, index)
                  .reduce((sum, i) => sum + (i.percentage / 100) * 360, 0);
                const endAngle = startAngle + (item.percentage / 100) * 360;
                const startRad = (startAngle - 90) * (Math.PI / 180);
                const endRad = (endAngle - 90) * (Math.PI / 180);
                const x1 = 100 + 80 * Math.cos(startRad);
                const y1 = 100 + 80 * Math.sin(startRad);
                const x2 = 100 + 80 * Math.cos(endRad);
                const y2 = 100 + 80 * Math.sin(endRad);
                const largeArc = item.percentage > 50 ? 1 : 0;

                const isHovered = hoveredItem === item.id;
                const scale = isHovered ? 1.05 : 1;
                const opacity = selectedItem && selectedItem !== item.id ? 0.5 : 1;

                return (
                  <motion.path
                    key={item.id}
                    d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={item.color}
                    opacity={opacity}
                    animate={{ scale }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    className="cursor-pointer transition-all"
                  />
                );
              })}
              {/* Center circle */}
              <circle cx="100" cy="100" r="50" fill="white" />
              <text x="100" y="95" textAnchor="middle" className="text-2xl font-bold fill-gray-800">
                100
              </text>
              <text x="100" y="115" textAnchor="middle" className="text-sm fill-gray-500">
                {t.egp}
              </text>
            </svg>
          </div>
        </motion.div>

        {/* Details Panel */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <motion.div
                key={selectedItem}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                {(() => {
                  const item = budget100.find(i => i.id === selectedItem);
                  return (
                    <>
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.percentage}%
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                          <p className="text-gray-500">{item.description}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {Object.entries(item.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">{formatDetailKey(key, t)}</span>
                            <span className="font-semibold text-gray-800">{value} {t.egp}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {t.close}
                      </button>
                    </>
                  );
                })()}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.budget100Dist}</h3>
                <div className="space-y-3">
                  {budget100.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedItem(item.id)}
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-800">{item.name}</span>
                          <span className="font-bold text-gray-800">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Source */}
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>{t.budget100Source}</p>
            <p>{t.expPage} 12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatDetailKey = (key, t) => {
  const keyMap = {
    localDebt: t.budgetLocalDebt,
    externalDebt: t.budgetExternalDebt,
    wages: t.budgetWages,
    bonuses: t.budgetBonuses,
    socialInsurance: t.budgetSocialInsurance,
    subsidies: t.budgetSubsidies,
    pensions: t.budgetPensions,
    infrastructure: t.budgetInfrastructure,
    housing: t.budgetHousing,
    utilities: t.budgetUtilities,
    health: t.budgetHealth,
    education: t.budgetEducation,
    defense: t.budgetDefense,
    security: t.budgetSecurity,
    other: t.budgetOther
  };
  return keyMap[key] || key;
};

export default Budget100;
