import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 400);
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #070e1a 0%, #0d1b2e 40%, #102a43 100%)' }}
        >
          {/* Subtle radial glow behind coin */}
          <div className="absolute" style={{
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(5,150,105,0.12) 0%, rgba(59,130,246,0.06) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }} />

          {/* Coin container with 3D perspective */}
          <div style={{ perspective: 800 }} className="relative">
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-6 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 30px 8px rgba(5,150,105,0.15), 0 0 60px 15px rgba(59,130,246,0.08)',
                  '0 0 50px 15px rgba(5,150,105,0.25), 0 0 80px 25px rgba(59,130,246,0.12)',
                  '0 0 30px 8px rgba(5,150,105,0.15), 0 0 60px 15px rgba(59,130,246,0.08)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Spinning coin */}
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
              style={{ width: 120, height: 120, transformStyle: 'preserve-3d' }}
            >
              {/* Front face */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  backfaceVisibility: 'hidden',
                  background: 'linear-gradient(145deg, #f5d76e 0%, #d4a843 25%, #c49332 50%, #d4a843 75%, #f5d76e 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.2), 0 8px 32px rgba(0,0,0,0.5)',
                }}
              >
                {/* Inner ring */}
                <div className="absolute inset-[6px] rounded-full border-2 border-white/20" />
                <div className="absolute inset-[10px] rounded-full border border-white/10" />

                {/* Shield emblem */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-[18px]">
                  <defs>
                    <linearGradient id="shieldGold" x1="0" y1="0" x2="100" y2="100">
                      <stop offset="0%" stopColor="#102a43" />
                      <stop offset="100%" stopColor="#1a3a5c" />
                    </linearGradient>
                  </defs>
                  <path d="M50 10 L85 28 L85 58 Q85 82 50 95 Q15 82 15 58 L15 28 Z" fill="url(#shieldGold)" />
                  <g transform="translate(50, 50)">
                    <path d="M-14 -7 Q-14 -16 -5 -16 Q4 -16 4 -7 L4 11 Q4 16 0 16 Q-4 16 -4 11 L-4 -1 L-14 -1 Q-17 -1 -17 2 L-17 11 Q-17 16 -22 16" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
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
                      animation: 'sweep 2.5s ease-in-out infinite',
                    }}
                  />
                </motion.div>

                {/* Edge highlight */}
                <div className="absolute inset-0 rounded-full" style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 40%, rgba(0,0,0,0.1) 100%)',
                }} />
              </div>

              {/* Back face */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(145deg, #c49332 0%, #a67c28 25%, #d4a843 50%, #a67c28 75%, #c49332 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.5)',
                }}
              >
                <div className="absolute inset-[6px] rounded-full border-2 border-white/15" />
                <div className="absolute inset-[10px] rounded-full border border-white/10" />

                {/* Egyptian eagle simplified */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-[20px]">
                  <text x="50" y="58" textAnchor="middle" fontFamily="Arial" fontSize="28" fontWeight="bold" fill="#102a43">ج.م</text>
                  <text x="50" y="78" textAnchor="middle" fontFamily="Arial" fontSize="10" fill="#102a43" opacity="0.7">2026</text>
                </svg>

                <div className="absolute inset-0 rounded-full" style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)',
                }} />
              </div>
            </motion.div>
          </div>

          {/* Text */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-white/90 text-lg font-bold tracking-wide" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
              موازنتي
            </h2>
          </motion.div>

          {/* Loading dots */}
          <div className="mt-6 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>

          <style>{`
            @keyframes sweep {
              0% { left: -50%; }
              100% { left: 150%; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
