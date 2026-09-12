import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useLang } from '../context/LangContext';

/* ─── The Coin Component (from LoadingScreen) ──────────── */

function Coin({ size = 120, spinning = true }) {
  return (
    <div style={{ perspective: 800 }} className="relative">
      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-6 rounded-full"
        animate={spinning ? {
          boxShadow: [
            '0 0 30px 8px rgba(5,150,105,0.15), 0 0 60px 15px rgba(59,130,246,0.08)',
            '0 0 50px 15px rgba(5,150,105,0.25), 0 0 80px 25px rgba(59,130,246,0.12)',
            '0 0 30px 8px rgba(5,150,105,0.15), 0 0 60px 15px rgba(59,130,246,0.08)',
          ],
        } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Spinning coin */}
      <motion.div
        animate={spinning ? { rotateY: [0, 360] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        className="relative"
        style={{ width: size, height: size, transformStyle: 'preserve-3d' }}
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
          <div className="absolute inset-[6px] rounded-full border-2 border-white/20" />
          <div className="absolute inset-[10px] rounded-full border border-white/10" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ padding: `${size * 0.18}px` }}>
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
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ padding: `${size * 0.2}px` }}>
            <text x="50" y="58" textAnchor="middle" fontFamily="Arial" fontSize="28" fontWeight="bold" fill="#102a43">EGP</text>
            <text x="50" y="78" textAnchor="middle" fontFamily="Arial" fontSize="10" fill="#102a43" opacity="0.7">2026</text>
          </svg>
          <div className="absolute inset-0 rounded-full" style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)',
          }} />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── SVG Path Drawing ──────────────────────────────────── */

function SVGPathDrawing({ path, color = '#10b981', strokeWidth = 2 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <svg ref={ref} className="w-full h-full" viewBox="0 0 100 100">
      <motion.path d={path} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" style={{ pathLength }} />
    </svg>
  );
}

/* ─── Word Reveal ───────────────────────────────────────── */

function WordReveal({ text, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.4'] });
  const words = text.split(' ');
  return (
    <div ref={ref} className={`flex flex-wrap gap-x-3 ${className}`} style={{ direction: 'rtl' }}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
        const y = useTransform(scrollYProgress, [start, end], [40, 0]);
        return <motion.span key={i} style={{ opacity, y }} className="inline-block">{word}</motion.span>;
      })}
    </div>
  );
}

/* ─── Floating Blob ─────────────────────────────────────── */

function FloatingBlob({ color, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  return <motion.div ref={ref} className={`absolute rounded-full blur-3xl ${className}`} style={{ background: color, y, rotate, scale, opacity: 0.6 }} />;
}

/* ─── Moving Coin (replaces airplane) ───────────────────── */

function MovingCoin() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const x = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1], ['80vw', '50vw', '10vw', '50vw', '80vw', '30vw', '50vw']);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], ['50vh', '30vh', '60vh', '25vh', '55vh', '50vh']);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.6, 1, 1.3, 1, 0.6]);
  const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 90, 180, 270, 360]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -15, 0, 15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} className="fixed top-0 left-0 w-full h-full pointer-events-none z-10" style={{ perspective: 1000 }}>
      <motion.div style={{ x, y, scale, rotateX, rotateZ, opacity, transformStyle: 'preserve-3d' }} className="absolute">
        <Coin size={140} spinning={true} />
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────── */

export default function BudgetStory() {
  const { lang } = useLang();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const progressWidth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div ref={containerRef} className="bg-white" dir="rtl">
      <motion.div style={{ scaleX: progressWidth }} className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 z-[100] origin-left" />
      <MovingCoin />

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50" />
        <FloatingBlob color="linear-gradient(135deg, #f59e0b, #eab308)" className="w-[500px] h-[500px] -right-40 top-20" />
        <FloatingBlob color="linear-gradient(135deg, #d97706, #f59e0b)" className="w-[400px] h-[400px] -left-32 bottom-20" />

        <div className="relative z-20 text-center px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} className="mb-8 flex justify-center">
            <div className="relative">
              <Coin size={160} spinning={true} />
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-primary-900 leading-[0.9] tracking-tighter mb-6">
            <span className="block">حكاية</span>
            <span className="block bg-gradient-to-l from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">الجنيه المصري</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-xl sm:text-2xl text-primary-600 mb-4">
            من الخزينة لحدك — موازنة Citizen 2027/2026
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-sm text-primary-400 tracking-[0.3em] uppercase">
            الإصدار الثالث عشر — أغسطس 2026
          </motion.p>

          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity }} className="mt-16 flex flex-col items-center gap-2">
            <span className="text-primary-400 text-xs tracking-[0.3em]">اسحب للأسفل</span>
            <div className="w-8 h-12 border-2 border-primary-300 rounded-full flex justify-center">
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 bg-primary-400 rounded-full mt-2" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ LETTER ═══════ */}
      <section className="relative min-h-screen flex items-center bg-white py-32 overflow-hidden">
        <FloatingBlob color="linear-gradient(135deg, #f59e0b20, #eab30820)" className="w-[400px] h-[400px] -right-48 top-1/4" />
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                رسالة من الوزير
              </motion.div>
              <WordReveal text="رؤية واضحة للمستقبل" className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-900 mb-6" />
              <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-lg text-primary-600 leading-relaxed mb-6">
                للعام الثالث عشر على التوالي، تصدر وزارة المالية تقرير موازنة المواطن كأحد أهم الأدوات لمد جسور التواصل ورفع وعي المواطن المصري.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-lg text-primary-600 leading-relaxed">
                تنطلق موازنة الدولة من رؤية واضحة تضع المواطن والمستثمر في قلب الأولويات.
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl opacity-20 blur-2xl" />
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-primary-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <Coin size={50} spinning={true} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-900 text-lg">أحمد كجوك</h3>
                    <p className="text-sm text-primary-500">وزير المالية</p>
                  </div>
                </div>
                <p className="text-primary-700 leading-relaxed italic border-r-4 border-amber-500 pr-4">
                  "أننا نقف اليوم على أسس اقتصادية أفضل وأكثر صلابهة تسمح باستكمال مسيرة الإصلاح والقدم."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ BLUEPRINT (SVG Drawing) ═══════ */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  <SVGPathDrawing path="M 10 80 L 90 80" color="#f59e0b" strokeWidth={0.5} />
                  <SVGPathDrawing path="M 10 50 L 40 35 M 60 35 L 90 50" color="#eab308" strokeWidth={0.5} />
                  <SVGPathDrawing path="M 60 60 m -15 0 a 15 15 0 1 0 30 0 a 15 15 0 1 0 -30 0" color="#d97706" strokeWidth={0.5} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Coin size={120} spinning={true} />
                </div>
              </div>
            </div>
            <div>
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-300 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                المفاهيم الأساسية
              </motion.div>
              <WordReveal text="يعني إيه موازنة؟" className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6" />
              <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-lg text-slate-300 leading-relaxed mb-8">
                الموازنة هي خطة الدولة للدخل والصرف لمدة سنة. بتحدد الدولة هتجيب فلوس منين وه_tensorsها فين.
              </motion.p>
              <div className="space-y-4">
                {[
                  { icon: '📊', title: 'وثيقة رسمية', desc: 'تُبين الإيرادات المتوقعة للدولة خلال العام المالي' },
                  { icon: '🎯', title: 'خطة الأولويات', desc: 'خطة الحكومة لإعادة ترتيب أولويات الإنفاق' },
                  { icon: '🔍', title: 'أداة الرقابة', desc: 'تمكّن المواطنين من التأكيد من توافق الخطط' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-sm text-slate-300">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ BIG NUMBERS (Horizontal Scroll) ═══════ */}
      <section className="relative h-[250vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-br from-amber-50 to-white">
          <motion.div style={{ x: useTransform(useScroll({ offset: ['start start', 'end end'] }).scrollYProgress, [0, 1], ['0%', '-60%']) }} className="flex h-full items-center gap-8 px-8">
            {[
              { value: '5.2', label: 'تريليون جنيه', desc: 'إجمالي المصروفات', icon: '💸', bg: 'bg-gradient-to-br from-amber-500 to-orange-600' },
              { value: '4.1', label: 'تريليون جنيه', desc: 'إجمالي الإيرادات', icon: '💵', bg: 'bg-gradient-to-br from-emerald-500 to-emerald-700' },
              { value: '1.2', label: 'تريليون جنيه', desc: 'الفائض الأولي', icon: '📈', bg: 'bg-gradient-to-br from-blue-500 to-blue-700' },
              { value: '4.9%', label: '', desc: 'العجز المستهدف', icon: '📊', bg: 'bg-gradient-to-br from-purple-500 to-purple-700' },
              { value: '78.1%', label: '', desc: 'نسبة الدين المستهدفة', icon: '📉', bg: 'bg-gradient-to-br from-red-500 to-red-700' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className={`flex-shrink-0 w-[75vw] h-[65vh] rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden ${item.bg}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="text-6xl mb-4 block">{item.icon}</span>
                  <p className="text-6xl font-bold mb-2">{item.value}</p>
                  <p className="text-2xl opacity-90">{item.label}</p>
                  <p className="text-base opacity-70 mt-2">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ ACHIEVEMENTS ═══════ */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-32 overflow-hidden">
        <FloatingBlob color="linear-gradient(135deg, #05966930, #10b98130)" className="w-[500px] h-[500px] -right-64 top-1/4" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                ما تم تحقيقه
              </motion.div>
              <WordReveal text="أرقام بتتكلم" className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-900 mb-6" />
              <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-lg text-primary-600 leading-relaxed mb-8">
                أثبت الاقتصاد المصري صلابة ومرونة في التصدي للتحديات العالمية بفضل الإصلاحات الهيكلية.
              </motion.p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { from: '82.5%', to: '78%', label: 'انخفاض الدين' },
                  { from: '4$', to: 'B$', label: 'انخفاض الدين الخارجي' },
                  { from: '5%', to: '', label: 'معدل النمو' },
                  { from: '14.5%', to: '', label: 'توسع الائتمان' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-4 rounded-xl shadow-sm border border-primary-100">
                    <p className="text-2xl font-bold text-primary-900">{item.from}{item.to && <span className="text-emerald-500"> → {item.to}</span>}</p>
                    <p className="text-sm text-primary-500">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-500/30">
                  <p className="text-sm opacity-80 mb-2">النتائج الرئيسية</p>
                  <p className="text-6xl font-black mb-4">2025/2026</p>
                  <div className="space-y-3">
                    {['✅ خفض الدين من 82.5% إلى 78%', '✅ انخفاض الدين الخارجي 4 مليار دولار', '✅ تحقيق فائض أولي مستدام', '✅ ارتفاع معدل النمو إلى 5%', '✅ توسع الائتمان 14.5%', '✅ استثمارات 637 مليار جنيه'].map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-2 text-white/90">{item}</motion.div>
                    ))}
                  </div>
                </div>
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-primary-100">
                  <p className="text-3xl font-bold text-primary-900">5%</p>
                  <p className="text-xs text-primary-500">نمو اقتصادي</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SOCIAL PROTECTION ═══════ */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-violet-50 via-white to-purple-50 py-32 overflow-hidden">
        <FloatingBlob color="linear-gradient(135deg, #8b5cf630, #a855f730)" className="w-[500px] h-[500px] -left-64 top-1/4" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '836.8', label: 'مليار جنيه', sub: 'للدعم والحماية', icon: '🛡️', color: 'from-violet-500 to-purple-600' },
                  { value: '8,000', label: 'جنيه', sub: 'الحد الأدنى للدخل', icon: '💰', color: 'from-emerald-500 to-green-600' },
                  { value: '21.2%', label: 'نمو سنوي', sub: 'في الأجور', icon: '📈', color: 'from-blue-500 to-cyan-600' },
                  { value: '100', label: 'مليار جنيه', sub: 'تكلفة الزيادة', icon: '💵', color: 'from-amber-500 to-orange-600' },
                ].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative group">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                    <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <span className="text-3xl mb-3 block">{stat.icon}</span>
                      <p className="text-3xl font-black text-primary-900">{stat.value}</p>
                      <p className="text-sm text-primary-500">{stat.label}</p>
                      <p className="text-xs text-primary-400 mt-1">{stat.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 bg-white p-6 rounded-2xl shadow-lg border border-primary-100">
                <h4 className="font-bold text-primary-900 mb-4">برامج الدعم</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[{ val: '178.3', label: 'سلع تموينية', icon: '🍞' }, { val: '104.2', label: 'كهرباء', icon: '⚡' }, { val: '69.1', label: 'قمح', icon: '🌾' }, { val: '46', label: 'مناطق عشوائية', icon: '🏘️' }, { val: '33.3', label: 'أدوية', icon: '💊' }, { val: '13', label: 'إسكان', icon: '🏠' }].map((item, i) => (
                    <div key={i} className="text-center p-2 bg-surface-warm rounded-xl">
                      <span className="text-xl">{item.icon}</span>
                      <p className="text-sm font-bold text-primary-900">{item.val}</p>
                      <p className="text-xs text-primary-500">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="order-1 lg:order-2">
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-violet-500 rounded-full" />
                الحماية الاجتماعية
              </motion.div>
              <WordReveal text="حياة كريمة للمواطن" className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-900 mb-6" />
              <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-lg text-primary-600 leading-relaxed mb-8">
                زيادة غير مسبوقة لتحسين دخول العاملين بالجهاز الحكومي وأصحاب المعاشات. الحد الأدنى للدخل وصل 8,000 جنيه.
              </motion.p>
              <div className="space-y-4">
                {[{ val: '12%', label: 'علاوة دورية للخدمة المدنية' }, { val: '15%', label: 'علاوة دورية لغير المخاطبين' }, { val: '750 جنيه', label: 'حافز إضافي شهرياً' }, { val: '1,000 جنيه', label: 'حافز تدريس للمعلمين' }, { val: '750 جنيه', label: 'زيادة للقطاع الطبي' }].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-primary-100">
                    <div className="w-2 h-2 bg-violet-500 rounded-full" />
                    <p className="font-bold text-primary-900 text-sm">{item.val}</p>
                    <p className="text-sm text-primary-600">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ EDUCATION & HEALTH (Horizontal Scroll) ═══════ */}
      <section className="relative h-[250vh]">
        <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-white">
          <motion.div style={{ x: useTransform(useScroll({ offset: ['start start', 'end end'] }).scrollYProgress, [0, 1], ['0%', '-60%']) }} className="flex h-full items-center gap-8 px-8">
            {[
              { value: '1,475.3', label: 'مليار جنيه للتعليم', desc: '7.8% من الناتج المحلي', icon: '🎓', bg: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
              { value: '617.3', label: 'مليار جنيه للصحة', desc: '5.8% من الناتج المحلي', icon: '🏥', bg: 'bg-gradient-to-br from-red-500 to-rose-600' },
              { value: '55.5', label: 'مليار للكتب الدراسية', desc: 'تعليم مجاني', icon: '📚', bg: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
              { value: '33.3', label: 'مليار للأدوية', desc: 'صحة للجميع', icon: '💊', bg: 'bg-gradient-to-br from-purple-500 to-violet-600' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className={`flex-shrink-0 w-[75vw] h-[65vh] rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden ${item.bg}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="text-6xl mb-4 block">{item.icon}</span>
                  <p className="text-6xl font-bold mb-2">{item.value}</p>
                  <p className="text-2xl opacity-90">{item.label}</p>
                  <p className="text-base opacity-70 mt-2">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ ECONOMIC PROGRAMS ═══════ */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-32 overflow-hidden">
        <FloatingBlob color="linear-gradient(135deg, #05966930, #10b98130)" className="w-[500px] h-[500px] -right-64 top-1/4" />
        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              البرامج الاقتصادية
            </motion.div>
            <WordReveal text="90 مليار جنيه للدعم" className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-900" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { value: '48', label: 'مليار لرد الأعباء التصديرية', icon: '📦', color: 'from-emerald-500 to-green-600' },
              { value: '6.7', label: 'مليار لدعم السياحة', icon: '✈️', color: 'from-blue-500 to-cyan-600' },
              { value: '6', label: 'مليار للتسهيلات الإنتاجية', icon: '🏭', color: 'from-purple-500 to-violet-600' },
              { value: '5.5', label: 'مليار لصناعة السيارات', icon: '🚗', color: 'from-amber-500 to-orange-600' },
              { value: '5', label: 'مليار للمشروعات الصغيرة', icon: '💼', color: 'from-pink-500 to-rose-600' },
              { value: '2', label: 'مليار للصناعات ذات الأولوية', icon: '⚡', color: 'from-red-500 to-red-600' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative group">
                <div className={`absolute -inset-1 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-primary-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <p className="text-4xl font-black text-primary-900 mb-2">{item.value}</p>
                  <p className="text-primary-600">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CLOSING ═══════ */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 overflow-hidden">
        <FloatingBlob color="linear-gradient(135deg, #f59e0b20, #eab30820)" className="w-[600px] h-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="section-container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center mb-8">
            <Coin size={100} spinning={true} />
          </motion.div>
          <WordReveal text="كده خلصنا!" className="text-5xl sm:text-6xl md:text-7xl font-black text-primary-900 mb-6" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-xl text-primary-600 mb-12 max-w-2xl mx-auto">
            دلوقتي فاهم يعني إيه موازنة وإزاي الجنيه المصري بيوصل لحدك.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-4">
            <a href="/budget100" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1">جرّب ميزانية 100 جنيه</a>
            <a href="/finance-minister" className="px-8 py-4 bg-white text-primary-800 font-bold rounded-full border-2 border-primary-200 hover:border-primary-400 hover:shadow-lg transition-all duration-300">كون وزير المالية</a>
            <a href="/quiz" className="px-8 py-4 bg-white text-primary-800 font-bold rounded-full border-2 border-primary-200 hover:border-primary-400 hover:shadow-lg transition-all duration-300">اختبر معلوماتك</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
