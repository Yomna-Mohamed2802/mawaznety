import { motion } from 'framer-motion';

/**
 * Mawaznety Coin Component
 *
 * The brand's spinning coin with shield emblem (Meem) on front,
 * "EGP 2026" on back. Used across LoadingScreen, Budget story, etc.
 *
 * Props:
 *   size     — diameter in px (default 120)
 *   spinning — whether the coin auto-rotates (default true)
 *   className — additional classes
 */
export default function Coin({ size = 120, spinning = true, className = '' }) {
  return (
    <div style={{ perspective: 800 }} className={`relative inline-block ${className}`}>
      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-6 rounded-full"
        animate={
          spinning
            ? {
                boxShadow: [
                  '0 0 30px 8px rgba(5,150,105,0.15), 0 0 60px 15px rgba(59,130,246,0.08)',
                  '0 0 50px 15px rgba(5,150,105,0.25), 0 0 80px 25px rgba(59,130,246,0.12)',
                  '0 0 30px 8px rgba(5,150,105,0.15), 0 0 60px 15px rgba(59,130,246,0.08)',
                ],
              }
            : {}
        }
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Spinning coin */}
      <motion.div
        animate={spinning ? { rotateY: [0, 360] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        className="relative"
        style={{ width: size, height: size, transformStyle: 'preserve-3d' }}
      >
        {/* ── Front face (Shield + Meem) ── */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backfaceVisibility: 'hidden',
            background: 'linear-gradient(145deg, #f5d76e 0%, #d4a843 25%, #c49332 50%, #d4a843 75%, #f5d76e 100%)',
            boxShadow:
              'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.2), 0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          {/* Rings */}
          <div className="absolute inset-[6px] rounded-full border-2 border-white/20" />
          <div className="absolute inset-[10px] rounded-full border border-white/10" />

          {/* Shield emblem */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ padding: `${size * 0.18}px` }}>
            <defs>
              <linearGradient id="coinShieldBg" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#102a43" />
                <stop offset="100%" stopColor="#1a3a5c" />
              </linearGradient>
            </defs>
            <path d="M50 10 L85 28 L85 58 Q85 82 50 95 Q15 82 15 58 L15 28 Z" fill="url(#coinShieldBg)" />
            <g transform="translate(50, 50)">
              <path
                d="M-14 -7 Q-14 -16 -5 -16 Q4 -16 4 -7 L4 11 Q4 16 0 16 Q-4 16 -4 11 L-4 -1 L-14 -1 Q-17 -1 -17 2 L-17 11 Q-17 16 -22 16"
                fill="none"
                stroke="#fff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>

          {/* Shine sweep */}
          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden"
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="absolute top-0 left-[-50%] w-[50%] h-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                transform: 'skewX(-20deg)',
              }}
            />
          </motion.div>

          {/* Edge highlight */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(0,0,0,0.1) 100%)',
            }}
          />
        </div>

        {/* ── Back face (EGP 2026) ── */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(145deg, #c49332 0%, #a67c28 25%, #d4a843 50%, #a67c28 75%, #c49332 100%)',
            boxShadow:
              'inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <div className="absolute inset-[6px] rounded-full border-2 border-white/15" />
          <div className="absolute inset-[10px] rounded-full border border-white/10" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ padding: `${size * 0.2}px` }}>
            <text x="50" y="58" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="28" fontWeight="bold" fill="#102a43">
              EGP
            </text>
            <text x="50" y="78" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" fill="#102a43" opacity="0.7">
              2026
            </text>
          </svg>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
