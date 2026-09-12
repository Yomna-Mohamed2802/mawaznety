import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValueEvent } from 'framer-motion';
import { useLang } from '../context/LangContext';
import {
  HiOutlineBookOpen,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHeart,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
  HiOutlineTrendingUp,
  HiOutlineUsers,
  HiOutlineGlobeAlt,
} from 'react-icons/hi';

/* ─── Animated Counter ──────────────────────────────────── */

function AnimatedCounter({ end, duration = 2, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

/* ─── Text Reveal Animation ─────────────────────────────── */

function TextReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── Scale Reveal ──────────────────────────────────────── */

function ScaleReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Slide Reveal ──────────────────────────────────────── */

function SlideReveal({ children, className = '', direction = 'right', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const x = direction === 'right' ? 100 : direction === 'left' ? -100 : 0;
  const y = direction === 'up' ? 100 : direction === 'down' ? -100 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ x, y, opacity: 0 }}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Floating Element ──────────────────────────────────── */

function FloatingElement({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: 20 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ perspective: '1000px' }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Parallax Layer ────────────────────────────────────── */

function ParallaxLayer({ children, speed = 0.5, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Glitch Text ───────────────────────────────────────── */

function GlitchText({ text, className = '' }) {
  const [glitch, setGlitch] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 100);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {glitch && (
        <>
          <span className="absolute top-0 left-0 text-cyan-500 opacity-70 animate-pulse" aria-hidden="true">
            {text}
          </span>
          <span className="absolute top-0 left-0 text-red-500 opacity-70 animate-pulse" aria-hidden="true" style={{ transform: 'translate(2px, -2px)' }}>
            {text}
          </span>
        </>
      )}
    </span>
  );
}

/* ─── Magnetic Button ───────────────────────────────────── */

function MagneticButton({ children, className = '', href }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: 'transform 0.2s ease-out' }}
    >
      {children}
    </a>
  );
}

/* ─── Main Component ────────────────────────────────────── */

export default function BudgetStory() {
  const { lang } = useLang();
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -150]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.15], [0, 10]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.15) setActiveSection(0);
    else if (latest < 0.3) setActiveSection(1);
    else if (latest < 0.5) setActiveSection(2);
    else if (latest < 0.65) setActiveSection(3);
    else if (latest < 0.8) setActiveSection(4);
    else setActiveSection(5);
  });

  return (
    <div ref={containerRef} className="min-h-[600vh] bg-surface" dir="rtl">
      {/* ─── PROGRESS BAR ──────────────────────────────────── */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 z-[100] origin-left"
      />

      {/* ─── NAVIGATION DOTS ───────────────────────────────── */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="relative"
            animate={{
              scale: activeSection === i ? 1.5 : 1,
            }}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === i
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-500 shadow-lg shadow-emerald-500/50'
                  : 'bg-primary-300 hover:bg-primary-400'
              }`}
            />
            {activeSection === i && (
              <motion.div
                layoutId="activeDot"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                style={{ filter: 'blur(8px)', opacity: 0.5 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* ─── HERO SECTION ─────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#102a43] to-[#1a3a5c]" />
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 200 + 20,
                height: Math.random() * 200 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${
                  ['rgba(5,150,105,0.3)', 'rgba(59,130,246,0.3)', 'rgba(168,85,247,0.3)'][i % 3]
                } 0%, transparent 70%)`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 30 - 15, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY, filter: `blur(${heroBlur}px)` }}
          className="relative text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-500/30 to-blue-500/30 flex items-center justify-center backdrop-blur-sm border border-white/20"
          >
            <HiOutlineBookOpen className="w-14 h-14 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-6 py-2 mb-8 text-xs font-semibold tracking-[0.3em] uppercase bg-white/10 text-white/80 rounded-full border border-white/20 backdrop-blur-sm">
              {lang === 'ar' ? 'الإصدار الثالث عشر — أغسطس 2026' : '13th Edition — August 2026'}
            </span>
          </motion.div>

          <TextReveal delay={0.5}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-[0.95] tracking-tight">
              {lang === 'ar' ? 'حكاية' : 'The'}
            </h1>
          </TextReveal>

          <TextReveal delay={0.7}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] tracking-tight bg-gradient-to-l from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {lang === 'ar' ? 'الموازنة' : 'Budget Story'}
            </h1>
          </TextReveal>

          <TextReveal delay={0.9}>
            <p className="text-xl sm:text-2xl text-white/60 mt-8 max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'موازنة المواطن المصرية 2027/2026'
                : 'Egypt\'s Citizen Budget 2027/2026'}
            </p>
          </TextReveal>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-white/40 text-xs tracking-widest">
                {lang === 'ar' ? 'اسحب للأسفل' : 'SCROLL DOWN'}
              </span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SECTION 1 — رسالة الوزير ────────────────────── */}
      <section className="relative min-h-screen flex items-center py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SlideReveal direction="right">
              <div>
                <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-widest uppercase bg-emerald-100 text-emerald-700 rounded-full">
                  {lang === 'ar' ? 'رسالة من الوزير' : 'Minister\'s Message'}
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-900 mb-6 leading-tight">
                  {lang === 'ar' ? 'رؤية واضحة' : 'A Clear Vision'}
                </h2>
                <p className="text-lg text-primary-600 leading-relaxed mb-6">
                  {lang === 'ar'
                    ? 'للعام الثالث عشر على التوالي، تصدر وزارة المالية تقرير موازنة المواطن كأحد أهم الأدوات لمد جسور التواصل.'
                    : 'For the thirteenth consecutive year, the Ministry of Finance issues the Citizen Budget report as one of the most important tools for bridging communication.'}
                </p>
                <p className="text-lg text-primary-600 leading-relaxed">
                  {lang === 'ar'
                    ? 'تنطلق موازنة الدولة من رؤية واضحة تضع المواطن والمستثمر في قلب الأولويات.'
                    : 'The state budget launches from a clear vision that places the citizen and investor at the heart of priorities.'}
                </p>
              </div>
            </SlideReveal>

            <SlideReveal direction="left" delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-primary-100/60">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                      <span className="text-2xl">👨‍💼</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-900 text-lg">
                        {lang === 'ar' ? 'أحمد كجوك' : 'Ahmed Kouchouk'}
                      </h3>
                      <p className="text-sm text-primary-500">
                        {lang === 'ar' ? 'وزير المالية' : 'Minister of Finance'}
                      </p>
                    </div>
                  </div>
                  <p className="text-primary-700 leading-relaxed italic">
                    "{lang === 'ar'
                      ? 'أننا نقف اليوم على أسس اقتصادية أفضل وأكثر صلابهة تسمح باستكمال مسيرة الإصلاح.'
                      : 'We stand today on better and stronger economic foundations that allow us to continue the path of reform.'}"
                  </p>
                </div>
              </div>
            </SlideReveal>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2 — يعني إيه موازنة ──────────────────── */}
      <section className="relative min-h-screen flex items-center py-20 bg-gradient-to-b from-surface to-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <TextReveal>
              <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-widest uppercase bg-blue-100 text-blue-700 rounded-full">
                {lang === 'ar' ? 'المفاهيم الأساسية' : 'Basic Concepts'}
              </span>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-900 mb-6">
                {lang === 'ar' ? 'يعني إيه موازنة؟' : 'What is a Budget?'}
              </h2>
            </TextReveal>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: lang === 'ar' ? 'وثيقة رسمية' : 'Official Document',
                desc: lang === 'ar' ? 'تُبين الإيرادات المتوقعة للدولة خلال العام المالي' : 'Shows expected state revenues during the fiscal year',
                color: 'from-emerald-500 to-emerald-600',
              },
              {
                icon: '🎯',
                title: lang === 'ar' ? 'خطة الأولويات' : 'Priority Plan',
                desc: lang === 'ar' ? 'خطة الحكومة لإعادة ترتيب أولويات الإنفاق' : 'Government plan to re-prioritize spending',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: '🔍',
                title: lang === 'ar' ? 'أداة الرقابة' : 'Oversight Tool',
                desc: lang === 'ar' ? 'تمكّن المواطنين من التأكيد من توافق الخطط' : 'Enables citizens to ensure plan alignment',
                color: 'from-purple-500 to-purple-600',
              },
            ].map((card, i) => (
              <FloatingElement key={i} delay={i * 0.15}>
                <div className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${card.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                  <div className="relative bg-white p-8 rounded-2xl border border-primary-100/60 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <span className="text-2xl">{card.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary-900 mb-3">{card.title}</h3>
                    <p className="text-primary-600 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </FloatingElement>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-20 max-w-4xl mx-auto">
            <TextReveal>
              <h3 className="text-2xl font-bold text-primary-900 mb-12 text-center">
                {lang === 'ar' ? 'مراحل إعداد الموازنة' : 'Budget Preparation Stages'}
              </h3>
            </TextReveal>

            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 hidden md:block" />

              {[
                { num: '01', title: lang === 'ar' ? 'التخطيط' : 'Planning', desc: lang === 'ar' ? 'تصدر وزارة المالية منشور إعداد الموازنة' : 'Ministry issues budget preparation bulletin' },
                { num: '02', title: lang === 'ar' ? 'التنسيق' : 'Coordination', desc: lang === 'ar' ? 'تناقش وزارة المالية مشروعات الموازنات' : 'Ministry discusses budget proposals' },
                { num: '03', title: lang === 'ar' ? 'العرض' : 'Presentation', desc: lang === 'ar' ? 'يقدم وزير المالية مشروع الموازنة' : 'Minister presents the budget' },
                { num: '04', title: lang === 'ar' ? 'الموافقة' : 'Approval', desc: lang === 'ar' ? 'يعرض مجلس الوزراء على رئيس الجمهورية' : 'Cabinet presents to President' },
                { num: '05', title: lang === 'ar' ? 'المناقشة' : 'Discussion', desc: lang === 'ar' ? 'يحيل رئيس الجمهورية لمجلس النواب' : 'President refers to Parliament' },
                { num: '06', title: lang === 'ar' ? 'التنفيذ' : 'Implementation', desc: lang === 'ar' ? 'بعد الاعتماد يُرسل للتنفيذ' : 'After approval, implementation begins' },
              ].map((stage, i) => (
                <SlideReveal
                  key={i}
                  direction={i % 2 === 0 ? 'right' : 'left'}
                  delay={i * 0.1}
                  className={`flex items-center gap-8 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-white p-6 rounded-2xl border border-primary-100/60 shadow-lg hover:shadow-xl transition-shadow">
                      <div className={`flex items-center gap-4 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold">
                          {stage.num}
                        </div>
                        <div>
                          <h4 className="font-bold text-primary-900">{stage.title}</h4>
                          <p className="text-sm text-primary-600">{stage.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex-shrink-0 z-10" />
                  <div className="flex-1 hidden md:block" />
                </SlideReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3 — الأرقام الرئيسية ────────────────── */}
      <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#102a43] to-[#1a3a5c]" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="section-container relative">
          <div className="text-center mb-16">
            <TextReveal>
              <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-widest uppercase bg-white/10 text-white/80 rounded-full border border-white/20">
                {lang === 'ar' ? 'الأرقام الرئيسية' : 'Key Numbers'}
              </span>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                {lang === 'ar' ? 'موازنة 2027/2026 بالأرقام' : 'Budget 2027/2026 in Numbers'}
              </h2>
            </TextReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { value: 5.2, suffix: lang === 'ar' ? ' تريليون' : 'T', label: lang === 'ar' ? 'المصروفات' : 'Expenditures', color: 'from-red-500 to-red-600' },
              { value: 4.1, suffix: lang === 'ar' ? ' تريليون' : 'T', label: lang === 'ar' ? 'الإيرادات' : 'Revenues', color: 'from-emerald-500 to-emerald-600' },
              { value: 1.2, suffix: lang === 'ar' ? ' تريليون' : 'T', label: lang === 'ar' ? 'الفائض الأولي' : 'Primary Surplus', color: 'from-blue-500 to-blue-600' },
              { value: 4.9, suffix: '%', label: lang === 'ar' ? 'العجز' : 'Deficit', color: 'from-amber-500 to-amber-600' },
            ].map((stat, i) => (
              <ScaleReveal key={i} delay={i * 0.1}>
                <div className="relative group">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl`} />
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
                    <p className="text-4xl sm:text-5xl font-bold text-white mb-2">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-white/70">{stat.label}</p>
                  </div>
                </div>
              </ScaleReveal>
            ))}
          </div>

          <SlideReveal direction="up" delay={0.4}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                {lang === 'ar' ? 'ما تم تحقيقه في 2025/2026' : 'Achievements in 2025/2026'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  lang === 'ar' ? 'خفض الدين من 82.5% إلى 78% خلال سنتين' : 'Reduced debt from 82.5% to 78% in two years',
                  lang === 'ar' ? 'انخفاض الدين الخارجي بنحو 4 مليار دولار' : 'External debt decreased by $4 billion',
                  lang === 'ar' ? 'تحقيق فائض أولي مستدام' : 'Achieved sustained primary surplus',
                  lang === 'ar' ? 'ارتفاع معدل النمو إلى 5%' : 'Growth rate rose to 5%',
                  lang === 'ar' ? 'توسع الائتمان للقطاع الخاص 14.5%' : 'Private sector credit expanded 14.5%',
                  lang === 'ar' ? 'تحقيق استثمارات 637 مليار جنيه' : 'Investments worth 637 billion EGP',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <HiOutlineCheckCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </SlideReveal>
        </div>
      </section>

      {/* ─── SECTION 4 — الحماية الاجتماعية ──────────────── */}
      <section className="relative min-h-screen flex items-center py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <TextReveal>
              <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-widest uppercase bg-violet-100 text-violet-700 rounded-full">
                {lang === 'ar' ? 'الحماية الاجتماعية' : 'Social Protection'}
              </span>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-900 mb-6">
                {lang === 'ar' ? 'حياة كريمة للمواطن' : 'A Decent Life for Citizens'}
              </h2>
            </TextReveal>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { value: '836.8', suffix: lang === 'ar' ? ' مليار جنيه' : 'B', label: lang === 'ar' ? 'للدعم والحماية' : 'For Support', icon: '🛡️' },
                { value: '8000', suffix: lang === 'ar' ? ' جنيه' : ' EGP', label: lang === 'ar' ? 'الحد الأدنى للدخل' : 'Minimum Income', icon: '💰' },
                { value: '21.2', suffix: '%', label: lang === 'ar' ? 'نمو الأجور' : 'Wage Growth', icon: '📈' },
              ].map((stat, i) => (
                <ScaleReveal key={i} delay={i * 0.1}>
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                    <div className="relative bg-white p-8 rounded-2xl border border-primary-100/60 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                      <span className="text-4xl mb-4 block">{stat.icon}</span>
                      <p className="text-3xl sm:text-4xl font-bold text-primary-900 mb-2">
                        {stat.value}
                        <span className="text-lg font-normal text-primary-500">{stat.suffix}</span>
                      </p>
                      <p className="text-sm text-primary-500">{stat.label}</p>
                    </div>
                  </div>
                </ScaleReveal>
              ))}
            </div>

            {/* Wage Details */}
            <SlideReveal direction="right" delay={0.3}>
              <div className="bg-white rounded-2xl p-8 border border-primary-100/60 shadow-xl">
                <h3 className="text-2xl font-bold text-primary-900 mb-8 text-center">
                  {lang === 'ar' ? 'تفاصيل الزيادات' : 'Increase Details'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { val: '100 مليار جنيه', label: lang === 'ar' ? 'تكلفة الزيادة من يوليو' : 'Cost of increase from July', icon: '💵' },
                    { val: '12%', label: lang === 'ar' ? 'علاوة دورية للمخاطبين بالخدمة المدنية' : 'Periodic raise for civil service', icon: '📊' },
                    { val: '15%', label: lang === 'ar' ? 'علاوة دورية لغير المخاطبين' : 'Periodic raise for others', icon: '📊' },
                    { val: '750 جنيه', label: lang === 'ar' ? 'حافز إضافي شهرياً' : 'Additional monthly incentive', icon: '🎁' },
                    { val: '1,000 جنيه', label: lang === 'ar' ? 'حافز تدريس للمعلمين' : 'Teaching incentive', icon: '🎓' },
                    { val: '750 جنيه', label: lang === 'ar' ? 'زيادة للقطاع الطبي' : 'Medical sector increase', icon: '🏥' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-surface-warm rounded-xl hover:bg-primary-50 transition-colors"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-bold text-primary-900">{item.val}</p>
                        <p className="text-sm text-primary-600">{item.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SlideReveal>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5 — التعليم والصحة ──────────────────── */}
      <section className="relative min-h-screen flex items-center py-20 bg-gradient-to-b from-emerald-50 to-blue-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <TextReveal>
              <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-widest uppercase bg-blue-100 text-blue-700 rounded-full">
                {lang === 'ar' ? 'رأس المال البشري' : 'Human Capital'}
              </span>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-900 mb-6">
                {lang === 'ar' ? 'التعليم والصحة' : 'Education & Health'}
              </h2>
            </TextReveal>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Education */}
            <SlideReveal direction="right" delay={0.2}>
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative bg-white rounded-3xl p-8 border border-primary-100/60 hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
                      <HiOutlineAcademicCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary-900">
                        {lang === 'ar' ? 'التعليم' : 'Education'}
                      </h3>
                      <p className="text-primary-500">
                        {lang === 'ar' ? 'التعليم العام والجامعي' : 'General & University'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white mb-6">
                    <p className="text-5xl font-bold">1,475.3</p>
                    <p className="text-white/80 text-lg">{lang === 'ar' ? 'مليار جنيه' : 'Billion EGP'}</p>
                    <p className="text-sm text-white/60 mt-2">{lang === 'ar' ? '7.8% من الناتج المحلي' : '7.8% of GDP'}</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { val: '55.5', label: lang === 'ar' ? 'مليار للكتب الدراسية' : 'Billion for textbooks' },
                      { val: '47.7', label: lang === 'ar' ? 'مليار للوجبات المدرسية' : 'Billion for school meals' },
                      { val: '45.3', label: lang === 'ar' ? 'مليار للبحث العلمي' : 'Billion for research' },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-surface-warm rounded-xl">
                        <span className="text-sm text-primary-600">{item.label}</span>
                        <span className="font-bold text-primary-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SlideReveal>

            {/* Health */}
            <SlideReveal direction="left" delay={0.3}>
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <div className="relative bg-white rounded-3xl p-8 border border-primary-100/60 hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg">
                      <HiOutlineHeart className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary-900">
                        {lang === 'ar' ? 'الصحة' : 'Health'}
                      </h3>
                      <p className="text-primary-500">
                        {lang === 'ar' ? 'الخدمات الصحية والمستشفيات' : 'Health Services & Hospitals'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-white mb-6">
                    <p className="text-5xl font-bold">617.3</p>
                    <p className="text-white/80 text-lg">{lang === 'ar' ? 'مليار جنيه' : 'Billion EGP'}</p>
                    <p className="text-sm text-white/60 mt-2">{lang === 'ar' ? '5.8% من الناتج المحلي' : '5.8% of GDP'}</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { val: '33.3', label: lang === 'ar' ? 'مليار للأدوية' : 'Billion for medicines' },
                      { val: '25.2', label: lang === 'ar' ? 'مليار للمستلزمات الطبية' : 'Billion for medical supplies' },
                      { val: '15.9', label: lang === 'ar' ? 'مليار للنقل والانتقالات' : 'Billion for transfers' },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-surface-warm rounded-xl">
                        <span className="text-sm text-primary-600">{item.label}</span>
                        <span className="font-bold text-primary-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SlideReveal>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6 — البرامج الاقتصادية ──────────────── */}
      <section className="relative min-h-screen flex items-center py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <TextReveal>
              <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-widest uppercase bg-emerald-100 text-emerald-700 rounded-full">
                {lang === 'ar' ? 'البرامج الاقتصادية' : 'Economic Programs'}
              </span>
            </TextReveal>
            <TextReveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-900 mb-6">
                {lang === 'ar' ? 'دعم النشاط الاقتصادي' : 'Supporting Economic Activity'}
              </h2>
            </TextReveal>
          </div>

          <div className="max-w-6xl mx-auto">
            <ScaleReveal delay={0.2}>
              <div className="relative group mb-12">
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
                <div className="relative bg-gradient-to-br from-emerald-500 to-blue-500 rounded-3xl p-8 text-white text-center">
                  <HiOutlineCurrencyDollar className="w-16 h-16 mx-auto mb-4 opacity-80" />
                  <p className="text-6xl font-bold mb-2">90</p>
                  <p className="text-xl text-white/80">{lang === 'ar' ? 'مليار جنيه مخصصة للبرامج' : 'Billion EGP Allocated for Programs'}</p>
                </div>
              </div>
            </ScaleReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { value: '48', label: lang === 'ar' ? 'مليار لرد الأعباء التصديرية' : 'Billion for export support' },
                { value: '6.7', label: lang === 'ar' ? 'مليار لدعم السياحة' : 'Billion for tourism' },
                { value: '6', label: lang === 'ar' ? 'مليار للتسهيلات الإنتاجية' : 'Billion for production' },
                { value: '5.5', label: lang === 'ar' ? 'مليار لصناعة السيارات' : 'Billion for automotive' },
                { value: '5', label: lang === 'ar' ? 'مليار للمشروعات الصغيرة' : 'Billion for SMEs' },
                { value: '2', label: lang === 'ar' ? 'مليار للصناعات ذات الأولوية' : 'Billion for priority industries' },
              ].map((item, i) => (
                <FloatingElement key={i} delay={i * 0.1}>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                    <div className="relative bg-white p-6 rounded-2xl border border-primary-100/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <p className="text-4xl font-bold text-primary-900 mb-2">{item.value}</p>
                      <p className="text-sm text-primary-600">{item.label}</p>
                    </div>
                  </div>
                </FloatingElement>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING ──────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#102a43] to-[#1a3a5c]" />
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 150 + 30,
                height: Math.random() * 150 + 30,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, ${
                  ['rgba(5,150,105,0.4)', 'rgba(59,130,246,0.4)', 'rgba(168,85,247,0.4)'][i % 3]
                } 0%, transparent 70%)`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 20 - 10, 0],
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="section-container relative text-center">
          <ScaleReveal>
            <motion.div
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(5,150,105,0.5)',
                  '0 0 40px rgba(59,130,246,0.5)',
                  '0 0 20px rgba(5,150,105,0.5)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <HiOutlineCheckCircle className="w-12 h-12 text-white" />
            </motion.div>
          </ScaleReveal>

          <TextReveal delay={0.2}>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
              {lang === 'ar' ? 'كده خلصنا!' : 'That\'s It!'}
            </h2>
          </TextReveal>

          <TextReveal delay={0.4}>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'دلوقتي فاهم يعني إيه موازنة وإزاي بتتعمل وأرقامها كام.'
                : 'Now you understand what a budget is, how it is prepared, and its numbers.'}
            </p>
          </TextReveal>

          <SlideReveal direction="up" delay={0.6}>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton href="/budget100" className="btn-primary bg-white text-primary-800 hover:bg-white/90 text-lg px-8 py-4">
                {lang === 'ar' ? 'جرّب ميزانية 100 جنيه' : 'Try 100 EGP Budget'}
              </MagneticButton>
              <MagneticButton href="/finance-minister" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-4">
                {lang === 'ar' ? 'كون وزير المالية' : 'Be the Finance Minister'}
              </MagneticButton>
              <MagneticButton href="/quiz" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-4">
                {lang === 'ar' ? 'اختبر معلوماتك' : 'Test Your Knowledge'}
              </MagneticButton>
            </div>
          </SlideReveal>
        </div>
      </section>
    </div>
  );
}
