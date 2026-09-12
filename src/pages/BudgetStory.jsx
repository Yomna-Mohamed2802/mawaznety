import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { useLang } from '../context/LangContext';
import {
  HiOutlineBookOpen,
  HiOutlineArrowDown,
  HiOutlineTrendingUp,
  HiOutlineCurrencyDollar,
  HiOutlineCheckCircle,
  HiOutlineUsers,
  HiOutlineHeart,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
  HiOutlineOfficeBuilding,
  HiOutlineGlobeAlt,
} from 'react-icons/hi';

/* ─── Animated Counter Hook ─────────────────────────────── */

function useAnimatedCounter(end, duration = 2, startOnView = true) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startOnView || !isInView) return;

    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration, startOnView]);

  return { ref, count };
}

/* ─── Parallax Text Reveal ──────────────────────────────── */

function ParallaxReveal({ children, className = '', direction = 'up' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], direction === 'up' ? [80, -80] : [-80, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Scroll Progress Bar ───────────────────────────────── */

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 z-50 origin-left"
    />
  );
}

/* ─── Floating Card ─────────────────────────────────────── */

function FloatingCard({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Glow Effect ───────────────────────────────────────── */

function GlowCard({ children, className = '', color = '#102a43' }) {
  return (
    <div className="relative group">
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ backgroundColor: `${color}20` }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ─── Scroll Indicator ──────────────────────────────────── */

function ScrollIndicator({ text = 'اسحب للأسفل' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="flex flex-col items-center gap-2"
    >
      <span className="text-white/50 text-xs tracking-wider">{text}</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1 h-2 bg-white/50 rounded-full mt-1.5"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Section Divider ───────────────────────────────────── */

function SectionDivider({ text }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="flex items-center gap-4 max-w-4xl mx-auto px-4"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary-300" />
      <span className="text-sm font-semibold text-primary-500 whitespace-nowrap">{text}</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary-300" />
    </motion.div>
  );
}

/* ─── Stat Number with Animation ────────────────────────── */

function AnimatedStat({ value, suffix = '', label, color = 'primary-900' }) {
  const { ref, count } = useAnimatedCounter(parseFloat(value) || 0, 2);

  return (
    <div ref={ref} className="text-center">
      <p className={`text-4xl sm:text-5xl md:text-6xl font-bold text-${color} tabular-nums`}>
        {count}
        {suffix && <span className="text-lg sm:text-xl font-normal text-primary-500 ml-1">{suffix}</span>}
      </p>
      <p className="text-sm text-primary-500 mt-2">{label}</p>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────── */

export default function BudgetStory() {
  const { lang } = useLang();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-surface" dir="rtl">
      <ScrollProgressBar />

      {/* ─── HERO SECTION ─────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #102a43 30%, #1a3a5c 60%, #243b53 100%)',
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10"
          >
            <HiOutlineBookOpen className="w-12 h-12 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-widest uppercase bg-white/10 text-white/80 rounded-full border border-white/20 backdrop-blur-sm">
              {lang === 'ar' ? 'الإصدار الثالث عشر' : '13th Edition'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1]"
          >
            {lang === 'ar' ? (
              <>
                <span className="block">حكاية</span>
                <span className="block bg-gradient-to-l from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  الموازنة
                </span>
              </>
            ) : (
              <>
                <span className="block">The Budget</span>
                <span className="block bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Story
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-xl sm:text-2xl text-white/60 mb-4 max-w-2xl mx-auto"
          >
            {lang === 'ar'
              ? 'موازنة المواطن المصرية 2027/2026'
              : 'Egypt\'s Citizen Budget 2027/2026'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-sm text-white/40 mb-12"
          >
            {lang === 'ar' ? 'وزارة المالية — أغسطس 2026' : 'Ministry of Finance — August 2026'}
          </motion.p>

          <ScrollIndicator text={lang === 'ar' ? 'اسحب للأسفل' : 'Scroll down'} />
        </motion.div>
      </section>

      {/* ─── 01 — رسالة الوزير ────────────────────────────── */}
      <section className="py-24 sm:py-32 relative">
        <div className="section-container">
          <ParallaxReveal>
            <div className="text-center mb-16">
              <span className="section-eyebrow">
                {lang === 'ar' ? 'الفصل الأول' : 'Chapter 1'}
              </span>
              <h2 className="section-heading text-4xl sm:text-5xl">
                {lang === 'ar' ? 'رسالة من الوزير' : 'Message from the Minister'}
              </h2>
            </div>
          </ParallaxReveal>

          <div className="max-w-4xl mx-auto">
            <FloatingCard>
              <div className="card-base p-8 sm:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-100 to-transparent rounded-bl-full" />
                <div className="relative">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-lg">
                      <span className="text-3xl">👨‍💼</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary-900">
                        {lang === 'ar' ? 'أحمد كجوك' : 'Ahmed Kouchouk'}
                      </h3>
                      <p className="text-primary-500">
                        {lang === 'ar' ? 'وزير المالية' : 'Minister of Finance'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6 text-lg text-primary-700 leading-relaxed">
                    <p className="relative pr-6 before:absolute before:right-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-emerald-500 before:to-blue-500 before:rounded-full">
                      {lang === 'ar'
                        ? 'للعام الثالث عشر على التوالي، تصدر وزارة المالية تقرير موازنة المواطن كأحد أهم الأدوات لمد جسور التواصل ورفع وعي المواطن المصري بأحدث توجهات السياسة المالية وآليات الموازنة التشاركية.'
                        : 'For the thirteenth consecutive year, the Ministry of Finance issues the Citizen Budget report as one of the most important tools for bridging communication and raising awareness of the latest fiscal policy trends and participatory budgeting mechanisms.'}
                    </p>
                    <p className="relative pr-6 before:absolute before:right-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-emerald-500 before:to-blue-500 before:rounded-full">
                      {lang === 'ar'
                        ? 'أننا نقف اليوم على أسس اقتصادية أفضل وأكثر صلابهة تسمح باستكمال مسيرة الإصلاح والقدم ورفع وطن؛ حيث أثبت الاقتصاد المصري مرونة في التصدي للتحديات العالمية بفضل الإصلاحات الهيكلية.'
                        : 'We stand today on better and stronger economic foundations that allow us to continue the path of reform and progress; where the Egyptian economy has shown resilience in facing global challenges thanks to structural reforms.'}
                    </p>
                    <p className="relative pr-6 before:absolute before:right-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-emerald-500 before:to-blue-500 before:rounded-full">
                      {lang === 'ar'
                        ? 'تنطلق موازنة الدولة لعام 2027/2026 من رؤية واضحة تضع المواطن والمستثمر في قلب الأولويات، وتعكس التزام الدولة بتحقيق معادلة متوازنة بين مساندة المواطنين وتحفيز النشاط الاقتصادي.'
                        : 'The state budget for 2027/2026 launches from a clear vision that places the citizen and investor at the heart of priorities, reflecting the state\'s commitment to achieving a balanced equation between supporting citizens and stimulating economic activity.'}
                    </p>
                  </div>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      <SectionDivider text={lang === 'ar' ? 'الفصل الثاني' : 'Chapter 2'} />

      {/* ─── 02 — يعني إيه موازنة؟ ────────────────────────── */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-surface to-white">
        <div className="section-container">
          <ParallaxReveal>
            <div className="text-center mb-16">
              <span className="section-eyebrow">
                {lang === 'ar' ? 'المفاهيم الأساسية' : 'Basic Concepts'}
              </span>
              <h2 className="section-heading text-4xl sm:text-5xl">
                {lang === 'ar' ? 'يعني إيه موازنة؟' : 'What is a Budget?'}
              </h2>
            </div>
          </ParallaxReveal>

          <div className="max-w-5xl mx-auto">
            <FloatingCard delay={0.1}>
              <div className="card-base p-8 sm:p-12 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                        <HiOutlineLightBulb className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary-900">
                        {lang === 'ar' ? 'التعريف' : 'Definition'}
                      </h3>
                    </div>
                    <p className="text-lg text-primary-700 leading-relaxed">
                      {lang === 'ar'
                        ? 'تُعد الموازنة العامة للدولة الأداة الأساسية لوزارة المالية لتحقيق الأهداف الاقتصادية والاجتماعية للمواطنين، عبر الاستغلال الأمثل لموارد الدولة.'
                        : 'The general state budget is the basic tool for the Ministry of Finance to achieve the economic and social goals of citizens through the optimal exploitation of state resources.'}
                    </p>
                    <p className="text-lg text-primary-700 leading-relaxed">
                      {lang === 'ar'
                        ? 'هي وثيقة تُبين الإيرادات المتوقعة للدولة خلال العام المالي، وخطة الحكومة لإعادة ترتيب أولويات الإنفاق بما يُحسّن جودة حياة المواطن.'
                        : 'It is a document that shows the expected revenues of the state during the fiscal year, and the government\'s plan to re-prioritize spending to improve the quality of life of citizens.'}
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-50 rounded-3xl transform rotate-3" />
                    <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                      <div className="space-y-4">
                        {[
                          { icon: '🏥', text: lang === 'ar' ? 'الصحة' : 'Health' },
                          { icon: '🎓', text: lang === 'ar' ? 'التعليم' : 'Education' },
                          { icon: '🏠', text: lang === 'ar' ? 'الإسكان' : 'Housing' },
                          { icon: '🛡️', text: lang === 'ar' ? 'الحماية الاجتماعية' : 'Social Protection' },
                          { icon: '🌱', text: lang === 'ar' ? 'حماية البيئة' : 'Environment' },
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-4 p-3 bg-surface-warm rounded-xl"
                          >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="font-medium text-primary-800">{item.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FloatingCard>

            {/* مراحل إعداد الموازنة */}
            <FloatingCard delay={0.2}>
              <div className="card-base p-8 sm:p-12">
                <h3 className="text-2xl font-bold text-primary-900 mb-8 text-center">
                  {lang === 'ar' ? 'مراحل إعداد الموازنة' : 'Budget Preparation Stages'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      number: '01',
                      title: lang === 'ar' ? 'التخطيط' : 'Planning',
                      desc: lang === 'ar' ? 'تصدر وزارة المالية منشور إعداد الموازنة' : 'Ministry of Finance issues budget preparation bulletin',
                    },
                    {
                      number: '02',
                      title: lang === 'ar' ? 'التنسيق' : 'Coordination',
                      desc: lang === 'ar' ? 'تناقش وزارة المالية مشروعات الموازنات الواردة' : 'Ministry of Finance discusses received budget proposals',
                    },
                    {
                      number: '03',
                      title: lang === 'ar' ? 'العرض' : 'Presentation',
                      desc: lang === 'ar' ? 'يقدم وزير المالية مشروع الموازنة لمجلس الوزراء' : 'Minister of Finance presents budget to Cabinet',
                    },
                    {
                      number: '04',
                      title: lang === 'ar' ? 'الموافقة' : 'Approval',
                      desc: lang === 'ar' ? 'يعرض مجلس الوزراء مشروع الموازنة على رئيس الجمهورية' : 'Cabinet presents budget to President',
                    },
                    {
                      number: '05',
                      title: lang === 'ar' ? 'المناقشة' : 'Discussion',
                      desc: lang === 'ar' ? 'يحيل رئيس الجمهورية مشروع الموازنة لمجلس النواب' : 'President refers budget to House of Representatives',
                    },
                    {
                      number: '06',
                      title: lang === 'ar' ? 'التنفيذ' : 'Implementation',
                      desc: lang === 'ar' ? 'بعد الاعتماد يُرسل للتنفيذ' : 'After approval, it is sent for implementation',
                    },
                  ].map((stage, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative group"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                      <div className="relative bg-white p-6 rounded-2xl border border-primary-100/60 h-full">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold text-lg mb-4">
                          {stage.number}
                        </div>
                        <h4 className="font-bold text-primary-900 mb-2">{stage.title}</h4>
                        <p className="text-sm text-primary-600">{stage.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      <SectionDivider text={lang === 'ar' ? 'الفصل الثالث' : 'Chapter 3'} />

      {/* ─── 03 — الأرقام الرئيسية ────────────────────────── */}
      <section
        className="py-24 sm:py-32 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #102a43 50%, #1a3a5c 100%)',
        }}
      >
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
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
          <ParallaxReveal>
            <div className="text-center mb-16">
              <span className="section-eyebrow text-white/60">
                {lang === 'ar' ? 'الفصل الثالث' : 'Chapter 3'}
              </span>
              <h2 className="section-heading text-4xl sm:text-5xl text-white">
                {lang === 'ar' ? 'الأرقام الرئيسية' : 'Key Numbers'}
              </h2>
            </div>
          </ParallaxReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { value: '5.2', suffix: lang === 'ar' ? 'تريليون' : 'Trillion', label: lang === 'ar' ? 'إجمالي المصروفات' : 'Total Expenditures' },
              { value: '4.1', suffix: lang === 'ar' ? 'تريليون' : 'Trillion', label: lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenues' },
              { value: '1.2', suffix: lang === 'ar' ? 'تريليون' : 'Trillion', label: lang === 'ar' ? 'الفائض الأولي' : 'Primary Surplus' },
              { value: '4.9', suffix: '%', label: lang === 'ar' ? 'العجز المستهدف' : 'Target Deficit' },
            ].map((stat, i) => (
              <FloatingCard key={i} delay={i * 0.1}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                  <AnimatedStat
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    color="white"
                  />
                </div>
              </FloatingCard>
            ))}
          </div>

          <FloatingCard delay={0.4}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                {lang === 'ar' ? 'ما تم تحقيقه في 2025/2026' : 'Achievements in 2025/2026'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {[
                    lang === 'ar' ? 'خفض الدين من 82.5% إلى 78% خلال سنتين فقط' : 'Reduced debt from 82.5% to 78% in just two years',
                    lang === 'ar' ? 'انخفاض الدين الخارجي بنحو 4 مليار دولار' : 'External debt decreased by about $4 billion',
                    lang === 'ar' ? 'تحقيق فائض أولي مستدام' : 'Achieving sustained primary surplus',
                    lang === 'ar' ? 'تحسين مؤشرات النمو الاقتصادي' : 'Improving economic growth indicators',
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
                <div className="space-y-4">
                  {[
                    lang === 'ar' ? 'ارتفاع معدل النمو إلى 5%' : 'Growth rate rose to 5%',
                    lang === 'ar' ? 'توسع الائتمان للقطاع الخاص بنسبة 14.5%' : 'Private sector credit expanded by 14.5%',
                    lang === 'ar' ? 'تحقيق استثمارات بقيمة 637 مليار جنيه' : 'Investments worth 637 billion EGP',
                    lang === 'ar' ? 'تحسين تصنيفات المخاطر الائتمانية' : 'Improved credit risk ratings',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
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
            </div>
          </FloatingCard>
        </div>
      </section>

      <SectionDivider text={lang === 'ar' ? 'الفصل الرابع' : 'Chapter 4'} />

      {/* ─── 04 — الحماية الاجتماعية ──────────────────────── */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-emerald-50">
        <div className="section-container">
          <ParallaxReveal>
            <div className="text-center mb-16">
              <span className="section-eyebrow">
                {lang === 'ar' ? 'الفصل الرابع' : 'Chapter 4'}
              </span>
              <h2 className="section-heading text-4xl sm:text-5xl">
                {lang === 'ar' ? 'الحماية الاجتماعية' : 'Social Protection'}
              </h2>
              <p className="section-subtitle mt-4">
                {lang === 'ar'
                  ? 'زيادة غير مسبوقة لتحسين دخول العاملين بالجهاز الحكومي وأصحاب المعاشات'
                  : 'Unprecedented increase to improve income of government employees and retirees'}
              </p>
            </div>
          </ParallaxReveal>

          <div className="max-w-5xl mx-auto">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { value: '836.8', suffix: lang === 'ar' ? 'مليار' : 'Billion', label: lang === 'ar' ? 'جنيه للدعم والحماية' : 'EGP for Support' },
                { value: '8000', suffix: lang === 'ar' ? 'جنيه' : 'EGP', label: lang === 'ar' ? 'الحد الأدنى للدخل' : 'Minimum Income' },
                { value: '21.2', suffix: '%', label: lang === 'ar' ? 'نمو الأجور السنوي' : 'Annual Wage Growth' },
              ].map((stat, i) => (
                <FloatingCard key={i} delay={i * 0.1}>
                  <GlowCard color={i === 0 ? '#7c3aed' : i === 1 ? '#059669' : '#3b82f6'}>
                    <div className="card-base p-6 text-center hover:shadow-lg transition-shadow duration-300">
                      <AnimatedStat value={stat.value} suffix={stat.suffix} label={stat.label} />
                    </div>
                  </GlowCard>
                </FloatingCard>
              ))}
            </div>

            {/* Wage Details */}
            <FloatingCard delay={0.3}>
              <div className="card-base p-8 sm:p-12">
                <h3 className="text-2xl font-bold text-primary-900 mb-8 text-center">
                  {lang === 'ar' ? 'تفاصيل الزيادات' : 'Increase Details'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-primary-800 text-lg mb-4">
                      {lang === 'ar' ? 'الزيادات العامة' : 'General Increases'}
                    </h4>
                    {[
                      { value: '100 مليار', label: lang === 'ar' ? 'جنيه تكلفة الزيادة من يوليو' : 'EGP cost of increase from July' },
                      { value: '12%', label: lang === 'ar' ? 'علاوة دورية للمخاطبين بقانون الخدمة المدنية' : 'Periodic raise for civil service subjects' },
                      { value: '15%', label: lang === 'ar' ? 'علاوة دورية لغير المخاطبين' : 'Periodic raise for non-subjects' },
                      { value: '750 جنيه', label: lang === 'ar' ? 'حافز إضافي شهرياً لكل العاملين' : 'Additional monthly incentive for all workers' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-surface-warm rounded-xl"
                      >
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <HiOutlineCheckCircle className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-bold text-primary-900">{item.value}</p>
                          <p className="text-sm text-primary-600">{item.label}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-primary-800 text-lg mb-4">
                      {lang === 'ar' ? 'زيادات خاصة' : 'Special Increases'}
                    </h4>
                    {[
                      { value: '1,000 جنيه', label: lang === 'ar' ? 'حافز تدريس شهري للمعلمين' : 'Monthly teaching incentive for teachers' },
                      { value: '2,000 جنيه', label: lang === 'ar' ? 'حافز تميز للإدارة المدرسية' : 'Excellence incentive for school administration' },
                      { value: '750 جنيه', label: lang === 'ar' ? 'زيادة للقطاع الطبي' : 'Increase for medical sector' },
                      { value: '25%', label: lang === 'ar' ? 'زيادة فئات نوبتجيات السهر والمبيت' : 'Increase in night shift categories' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                        className="flex items-center gap-4 p-4 bg-surface-warm rounded-xl"
                      >
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <HiOutlineCheckCircle className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-bold text-primary-900">{item.value}</p>
                          <p className="text-sm text-primary-600">{item.label}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </FloatingCard>

            {/* Support Programs */}
            <FloatingCard delay={0.4}>
              <div className="card-base p-8 sm:p-12 mt-8">
                <h3 className="text-2xl font-bold text-primary-900 mb-8 text-center">
                  {lang === 'ar' ? 'برامج الدعم الحكومية' : 'Government Support Programs'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { value: '178.3', label: lang === 'ar' ? 'مليار جنيه للسلع التموينية' : 'Billion for commodity subsidies' },
                    { value: '104.2', label: lang === 'ar' ? 'مليار جنيه لدعم الكهرباء' : 'Billion for electricity support' },
                    { value: '69.1', label: lang === 'ar' ? 'مليار جنيه لشراء القمح' : 'Billion for wheat purchase' },
                    { value: '46', label: lang === 'ar' ? 'مليار جنيه للمناطق العشوائية' : 'Billion for slum areas' },
                    { value: '33.3', label: lang === 'ar' ? 'مليار جنيه للأدوية' : 'Billion for medicines' },
                    { value: '13', label: lang === 'ar' ? 'مليار جنيه للإسكان' : 'Billion for housing' },
                    { value: '19.2', label: lang === 'ar' ? 'مليار جنيه للأغذية' : 'Billion for food' },
                    { value: '5', label: lang === 'ar' ? 'مليار جنيه للمياه' : 'Billion for water' },
                    { value: '2', label: lang === 'ar' ? 'مليار جنيه للنقل' : 'Billion for transportation' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-gradient-to-br from-surface-warm to-white p-4 rounded-xl border border-primary-100/60 hover:shadow-md transition-shadow"
                    >
                      <p className="text-2xl font-bold text-primary-900">{item.value}</p>
                      <p className="text-sm text-primary-600 mt-1">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      <SectionDivider text={lang === 'ar' ? 'الفصل الخامس' : 'Chapter 5'} />

      {/* ─── 05 — التعليم والصحة ──────────────────────────── */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-emerald-50 to-blue-50">
        <div className="section-container">
          <ParallaxReveal>
            <div className="text-center mb-16">
              <span className="section-eyebrow">
                {lang === 'ar' ? 'الفصل الخامس' : 'Chapter 5'}
              </span>
              <h2 className="section-heading text-4xl sm:text-5xl">
                {lang === 'ar' ? 'التعليم والصحة' : 'Education & Health'}
              </h2>
              <p className="section-subtitle mt-4">
                {lang === 'ar'
                  ? 'الوفاء بالاستحقاقات الدستورية دعمًا للاستثمار في رأس المال البشري'
                  : 'Fulfilling constitutional commitments to support human capital investment'}
              </p>
            </div>
          </ParallaxReveal>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Education */}
            <FloatingCard delay={0.1}>
              <div className="card-base p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
                    <HiOutlineAcademicCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-900">
                      {lang === 'ar' ? 'التعليم' : 'Education'}
                    </h3>
                    <p className="text-primary-500">
                      {lang === 'ar' ? 'التعليم العام والجامعي والبحث العلمي' : 'General, university education and research'}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white mb-6">
                  <p className="text-4xl font-bold">1,475.3</p>
                  <p className="text-white/80">
                    {lang === 'ar' ? 'مليار جنيه' : 'Billion EGP'}
                  </p>
                  <p className="text-sm text-white/60 mt-2">
                    {lang === 'ar' ? '7.8% من الناتج المحلي' : '7.8% of GDP'}
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { value: '55.5', label: lang === 'ar' ? 'مليار للكتب الدراسية' : 'Billion for textbooks' },
                    { value: '47.7', label: lang === 'ar' ? 'مليار للوجبات المدرسية' : 'Billion for school meals' },
                    { value: '45.3', label: lang === 'ar' ? 'مليار للبحث العلمي' : 'Billion for research' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-surface-warm rounded-xl">
                      <span className="text-sm text-primary-600">{item.label}</span>
                      <span className="font-bold text-primary-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FloatingCard>

            {/* Health */}
            <FloatingCard delay={0.2}>
              <div className="card-base p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg">
                    <HiOutlineHeart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-900">
                      {lang === 'ar' ? 'الصحة' : 'Health'}
                    </h3>
                    <p className="text-primary-500">
                      {lang === 'ar' ? 'الخدمات الصحية والمستشفيات' : 'Health services and hospitals'}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-white mb-6">
                  <p className="text-4xl font-bold">617.3</p>
                  <p className="text-white/80">
                    {lang === 'ar' ? 'مليار جنيه' : 'Billion EGP'}
                  </p>
                  <p className="text-sm text-white/60 mt-2">
                    {lang === 'ar' ? '5.8% من الناتج المحلي' : '5.8% of GDP'}
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { value: '33.3', label: lang === 'ar' ? 'مليار للأدوية' : 'Billion for medicines' },
                    { value: '25.2', label: lang === 'ar' ? 'مليار للمستلزمات الطبية' : 'Billion for medical supplies' },
                    { value: '15.9', label: lang === 'ar' ? 'مليار للنقل والانتقالات' : 'Billion for transfers' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-surface-warm rounded-xl">
                      <span className="text-sm text-primary-600">{item.label}</span>
                      <span className="font-bold text-primary-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      <SectionDivider text={lang === 'ar' ? 'الفصل السادس' : 'Chapter 6'} />

      {/* ─── 06 — البرامج الاقتصادية ──────────────────────── */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="section-container">
          <ParallaxReveal>
            <div className="text-center mb-16">
              <span className="section-eyebrow">
                {lang === 'ar' ? 'الفصل السادس' : 'Chapter 6'}
              </span>
              <h2 className="section-heading text-4xl sm:text-5xl">
                {lang === 'ar' ? 'برامج دعم النشاط الاقتصادي' : 'Economic Activity Support Programs'}
              </h2>
            </div>
          </ParallaxReveal>

          <div className="max-w-5xl mx-auto">
            <FloatingCard>
              <div className="card-base p-8 sm:p-12 mb-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl text-white">
                    <HiOutlineCurrencyDollar className="w-10 h-10" />
                    <div className="text-right">
                      <p className="text-4xl font-bold">90</p>
                      <p className="text-white/80">{lang === 'ar' ? 'مليار جنيه مخصصة للبرامج' : 'Billion EGP allocated for programs'}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { value: '48', label: lang === 'ar' ? 'مليار لرد الأعباء التصديرية' : 'Billion for export burden relief' },
                    { value: '6.7', label: lang === 'ar' ? 'مليار لدعم السياحة' : 'Billion for tourism support' },
                    { value: '6', label: lang === 'ar' ? 'مليار للتسهيلات الإنتاجية' : 'Billion for production facilities' },
                    { value: '5.5', label: lang === 'ar' ? 'مليار لصناعة السيارات' : 'Billion for automotive industry' },
                    { value: '5', label: lang === 'ar' ? 'مليار للمشروعات الصغيرة' : 'Billion for SMEs' },
                    { value: '2', label: lang === 'ar' ? 'مليار للصناعات ذات الأولوية' : 'Billion for priority industries' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-gradient-to-br from-surface-warm to-white p-5 rounded-xl border border-primary-100/60"
                    >
                      <p className="text-3xl font-bold text-primary-900">{item.value}</p>
                      <p className="text-sm text-primary-600 mt-1">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      <SectionDivider text={lang === 'ar' ? 'الفصل السابع' : 'Chapter 7'} />

      {/* ─── 07 — الخاتمة ────────────────────────────────── */}
      <section
        className="py-24 sm:py-32 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #102a43 50%, #1a3a5c 100%)',
        }}
      >
        <div className="section-container relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center"
            >
              <HiOutlineCheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            >
              {lang === 'ar' ? 'كده خلصنا!' : 'That\'s It!'}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 mb-12 max-w-2xl mx-auto"
            >
              {lang === 'ar'
                ? 'دلوقتي فاهم يعني إيه موازنة وإزاي بتتعمل وأرقامها كام. ده كان ملخص شامل لموازنة المواطن المصرية 2027/2026.'
                : 'Now you understand what a budget is, how it is prepared, and its numbers. This was a comprehensive summary of Egypt\'s Citizen Budget 2027/2026.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="/budget100" className="btn-primary bg-white text-primary-800 hover:bg-white/90 text-lg px-8 py-4">
                {lang === 'ar' ? 'جرّب ميزانية 100 جنيه' : 'Try 100 EGP Budget'}
              </a>
              <a href="/finance-minister" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-4">
                {lang === 'ar' ? 'كون وزير المالية' : 'Be the Finance Minister'}
              </a>
              <a href="/quiz" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 py-4">
                {lang === 'ar' ? 'اختبر معلوماتك' : 'Test Your Knowledge'}
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
