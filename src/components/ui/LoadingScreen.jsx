import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #0a1628 0%, #102a43 40%, #1a3a5c 70%, #0d2137 100%)' }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 1,
                  height: Math.random() * 4 + 1,
                  background: `rgba(5, 150, 105, ${Math.random() * 0.3 + 0.1})`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Outer glow ring */}
          <div className="relative">
            <motion.div
              className="absolute -inset-16 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(5, 150, 105, 0.15) 0%, rgba(16, 42, 67, 0.05) 50%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Blue glow pulse */}
            <motion.div
              className="absolute -inset-10"
              animate={{
                boxShadow: [
                  '0 0 40px 10px rgba(5, 150, 105, 0.2), 0 0 80px 20px rgba(16, 42, 67, 0.3)',
                  '0 0 60px 20px rgba(5, 150, 105, 0.4), 0 0 100px 40px rgba(16, 42, 67, 0.4)',
                  '0 0 40px 10px rgba(5, 150, 105, 0.2), 0 0 80px 20px rgba(16, 42, 67, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Coin logo - spinning */}
            <motion.div
              className="relative z-10"
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ perspective: 1000 }}
            >
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 h-28" style={{ filter: 'drop-shadow(0 0 20px rgba(5, 150, 105, 0.5))' }}>
                <defs>
                  <linearGradient id="loadBg" x1="0" y1="0" x2="120" y2="120">
                    <stop offset="0%" stopColor="#102a43" />
                    <stop offset="100%" stopColor="#243b53" />
                  </linearGradient>
                  <linearGradient id="loadAccent" x1="0" y1="0" x2="80" y2="80">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <linearGradient id="loadGold" x1="0" y1="0" x2="80" y2="0">
                    <stop offset="0%" stopColor="#d4a843" />
                    <stop offset="100%" stopColor="#f0c75e" />
                  </linearGradient>
                </defs>
                {/* Shield */}
                <path d="M60 8 L105 30 L105 65 Q105 95 60 112 Q15 95 15 65 L15 30 Z" fill="url(#loadBg)" />
                <path d="M60 12 L101 32 L101 65 Q101 92 60 108 Q19 92 19 65 L19 32 Z" fill="none" stroke="#fff" strokeWidth="1.2" strokeOpacity="0.15" />
                {/* Top arc */}
                <path d="M36 26 Q60 14 84 26" fill="none" stroke="url(#loadAccent)" strokeWidth="2.5" strokeLinecap="round" />
                {/* Letter Meem */}
                <g transform="translate(60, 56)">
                  <path
                    d="M-18 -9 Q-18 -20 -7 -20 Q4 -20 4 -9 L4 14 Q4 20 0 20 Q-4 20 -4 14 L-4 -2 L-18 -2 Q-22 -2 -22 1 L-22 14 Q-22 20 -28 20"
                    fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
                  />
                </g>
                {/* Coin */}
                <circle cx="60" cy="90" r="13" fill="url(#loadGold)" opacity="0.9" />
                <circle cx="60" cy="90" r="9.5" fill="none" stroke="#fff" strokeWidth="1" strokeOpacity="0.3" />
                <text x="60" y="94.5" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="bold" fill="#102a43">ج.م</text>
              </svg>
            </motion.div>
          </div>

          {/* Loading text */}
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-white text-xl font-bold mb-2" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
              موازنتي
            </h2>
            <p className="text-primary-400 text-sm">نظام موازنة المواطن 2026/2027</p>
          </motion.div>

          {/* Loading bar */}
          <motion.div className="mt-8 w-48 h-1 bg-primary-800/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #059669, #10b981, #059669)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Spinning dots around coin */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: i % 2 === 0 ? '#059669' : '#3b82f6',
              }}
              animate={{
                rotate: [0, 360],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.33,
                ease: 'linear',
              }}
              style={{
                transformOrigin: '0 0',
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 60}deg) translateX(90px)`,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
