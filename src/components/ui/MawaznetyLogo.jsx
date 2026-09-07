const MawaznetyLogo = ({ size = 'md', showText = true, className = '' }) => {
  const sizes = {
    sm: { icon: 40, text: 'text-lg', sub: 'text-[10px]' },
    md: { icon: 56, text: 'text-xl', sub: 'text-xs' },
    lg: { icon: 80, text: 'text-2xl', sub: 'text-sm' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="relative flex-shrink-0"
        style={{ width: s.icon, height: s.icon }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="logoBg" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stopColor="#102a43" />
              <stop offset="100%" stopColor="#243b53" />
            </linearGradient>
            <linearGradient id="logoAccent" x1="0" y1="0" x2="60" y2="60">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="logoGold" x1="0" y1="0" x2="60" y2="0">
              <stop offset="0%" stopColor="#d4a843" />
              <stop offset="100%" stopColor="#f0c75e" />
            </linearGradient>
          </defs>
          {/* Shield */}
          <path d="M50 5 L90 25 L90 55 Q90 80 50 95 Q10 80 10 55 L10 25 Z" fill="url(#logoBg)" />
          <path d="M50 9 L86 27 L86 55 Q86 77 50 91 Q14 77 14 55 L14 27 Z" fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.15" />
          {/* Top arc */}
          <path d="M30 22 Q50 12 70 22" fill="none" stroke="url(#logoAccent)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Letter Meem */}
          <g transform="translate(50, 46)">
            <path
              d="M-16 -8 Q-16 -18 -6 -18 Q4 -18 4 -8 L4 12 Q4 18 0 18 Q-4 18 -4 12 L-4 -2 L-16 -2 Q-19 -2 -19 1 L-19 12 Q-19 18 -24 18"
              fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </g>
          {/* Coin */}
          <circle cx="50" cy="75" r="11" fill="url(#logoGold)" opacity="0.9" />
          <circle cx="50" cy="75" r="8" fill="none" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.3" />
          <text x="50" y="79" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="bold" fill="#102a43">ج.م</text>
        </svg>
      </div>
      {showText && (
        <div>
          <h1 className={`font-bold text-primary-900 ${s.text}`} style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
            موازنتي
          </h1>
          <p className={`text-primary-500 ${s.sub}`}>نظام موازنة المواطن 2026/2027</p>
        </div>
      )}
    </div>
  );
};

export default MawaznetyLogo;
