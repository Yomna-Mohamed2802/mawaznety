import { motion } from 'framer-motion';
import SourceBadge from './SourceBadge';
import { formatValue } from '../../data/schema';

const colorStyles = {
  blue: {
    bg: 'bg-primary-50',
    icon: 'text-primary-600',
    bar: 'from-primary-500 to-primary-600',
  },
  green: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    bar: 'from-emerald-500 to-emerald-600',
  },
  purple: {
    bg: 'bg-violet-50',
    icon: 'text-violet-600',
    bar: 'from-violet-500 to-violet-600',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    bar: 'from-amber-500 to-amber-600',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    bar: 'from-red-500 to-red-600',
  },
  teal: {
    bg: 'bg-teal-50',
    icon: 'text-teal-600',
    bar: 'from-teal-500 to-teal-600',
  },
};

export default function StatCard({ figure, icon: Icon, color = 'blue', delay = 0, onClick, label }) {
  const style = colorStyles[color] || colorStyles.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-primary-100/60 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 ${onClick ? 'cursor-pointer' : ''}`}
      style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)' }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-xs font-medium text-primary-500 leading-snug flex-1 min-w-0">{label || figure?.label}</p>
        {Icon && (
          <div className={`${style.bg} rounded-lg p-1.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
            <Icon className={`w-3.5 h-3.5 ${style.icon}`} />
          </div>
        )}
      </div>
      <p className="text-2xl sm:text-[1.7rem] font-bold text-primary-900 tracking-tight leading-none mb-3">
        {figure ? formatValue(figure) : '—'}
      </p>
      {figure && (
        <div className="flex items-center gap-1.5">
          <SourceBadge status={figure.verificationStatus} />
        </div>
      )}
      <div className={`absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r ${style.bar} opacity-80`} />
    </motion.div>
  );
}
