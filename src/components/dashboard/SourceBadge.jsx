import { VERIFICATION } from '../../data/schema';
import { useLang } from '../../context/LangContext';

const useBadgeLabels = () => {
  const { t } = useLang();
  return {
    [VERIFICATION.VERIFIED]: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200/60',
      dot: 'bg-emerald-500',
      label: t.badgeVerified,
    },
    [VERIFICATION.UNVERIFIED]: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200/60',
      dot: 'bg-amber-500',
      label: t.badgeUnverified,
    },
    [VERIFICATION.UNAVAILABLE]: {
      bg: 'bg-gray-50',
      text: 'text-gray-500',
      border: 'border-gray-200/60',
      dot: 'bg-gray-400',
      label: t.badgeUnavailable,
    },
  };
};

export default function SourceBadge({ status, showLabel = false, size = 'sm' }) {
  const badgeStyles = useBadgeLabels();
  const style = badgeStyles[status] || badgeStyles[VERIFICATION.UNAVAILABLE];

  const sizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${style.bg} ${style.text} ${style.border}`}
      title={style.label}
    >
      <span className={`${sizeClasses[size]} ${style.dot} rounded-full`} />
      {showLabel && <span>{style.label}</span>}
    </span>
  );
}
