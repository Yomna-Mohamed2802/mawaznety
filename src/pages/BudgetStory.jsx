import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useLang } from '../context/LangContext';
import {
  HiOutlineBookOpen,
  HiOutlineLightBulb,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
  HiOutlineCheckCircle,
} from 'react-icons/hi';

/* ─── Animation Variants ────────────────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Scroll Section Component ──────────────────────────── */

function ScrollSection({ children, className = '', id, variant = fadeInUp }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variant}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Counter Animation ─────────────────────────────────── */

function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tabular-nums"
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.span>
      ) : (
        '0'
      )}
      {suffix && <span className="text-lg sm:text-xl font-normal text-white/70 mr-2">{suffix}</span>}
    </motion.span>
  );
}

/* ─── Timeline Item ─────────────────────────────────────── */

function TimelineItem({ number, title, description, isLast = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      className="flex gap-4 sm:gap-6"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary-800 font-bold text-lg border-2 border-primary-200"
        >
          {number}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-0.5 bg-primary-200 flex-1 mt-2"
          />
        )}
      </div>
      <div className="pb-8">
        <h3 className="text-lg font-bold text-primary-900 mb-2">{title}</h3>
        <p className="text-sm text-primary-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

/* ─── Distribution Card ─────────────────────────────────── */

function DistributionCard({ percentage, label, color, description, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={scaleIn}
      transition={{ delay }}
      className="card-base p-5 text-center"
    >
      <div
        className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold"
        style={{ backgroundColor: color }}
      >
        {percentage}%
      </div>
      <h4 className="font-bold text-primary-900 mb-2">{label}</h4>
      <p className="text-xs text-primary-500">{description}</p>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────── */

export default function BudgetStory() {
  const { lang, t } = useLang();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  return (
    <div ref={containerRef} className="min-h-screen bg-surface" dir="rtl">
      {/* ─── HERO SECTION ─────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #102a43 0%, #243b53 50%, #334e68 100%)',
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 25% 50%, #486581 0%, transparent 50%), radial-gradient(circle at 75% 20%, #059669 0%, transparent 50%)',
            }}
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative text-center px-4 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <HiOutlineBookOpen className="w-16 h-16 text-white/80 mx-auto mb-6" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {lang === 'ar' ? 'حكاية الموازنة' : 'The Budget Story'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {lang === 'ar'
              ? 'رحلة تفاعلية لفهم موازنة المواطن المصرية 2027/2026'
              : 'An interactive journey to understand Egypt\'s Citizen Budget 2027/2026'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#what-is-budget"
              className="btn-primary bg-white text-primary-800 hover:bg-white/90"
            >
              {lang === 'ar' ? 'ابدأ الرحلة' : 'Start Journey'}
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── 01 — يعني إيه موازنة؟ ────────────────────────── */}
      <ScrollSection
        id="what-is-budget"
        className="py-20 sm:py-28"
        variant={fadeInUp}
      >
        <div className="section-container">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-eyebrow"
            >
              {lang === 'ar' ? 'المشهد الأول' : 'Scene 1'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-heading text-3xl sm:text-4xl md:text-5xl"
            >
              {lang === 'ar' ? 'يعني إيه موازنة أصلاً؟' : 'What is a Budget?'}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Explanation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <div className="card-base p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🏠</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-900 mb-2">
                        {lang === 'ar' ? 'مثل البيت' : 'Like a Household'}
                      </h3>
                      <p className="text-sm text-primary-600 leading-relaxed">
                        {lang === 'ar'
                          ? 'لما أنت بتحط ميزانية البيت، بتحسب الدخل والصرف. الموازنة بالظبط كده بس للدولة!'
                          : 'When you plan your household budget, you calculate income and expenses. The national budget is exactly the same, but for the state!'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-base p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🏛️</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-900 mb-2">
                        {lang === 'ar' ? 'وده إيه بالظبط؟' : 'What Exactly Is It?'}
                      </h3>
                      <p className="text-sm text-primary-600 leading-relaxed">
                        {lang === 'ar'
                          ? 'الموازنة هي خطة الدولة للدخل والصرف لمدة سنة. بتحدد الدولة هتجيب فلوس منين وهتصرفها فين.'
                          : 'The budget is the state\'s plan for revenue and expenditure for one year. It determines where the state gets its money and where it spends it.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card-base p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-900 mb-2">
                        {lang === 'ar' ? 'ليه مهمة؟' : 'Why Is It Important?'}
                      </h3>
                      <p className="text-sm text-primary-600 leading-relaxed">
                        {lang === 'ar'
                          ? 'الموازنة بتوضح للناس فلوس الدولة بتروح فين. هل بتروح للتعليم؟ الصحة؟ البنية التحتية؟'
                          : 'The budget shows people where the state\'s money goes. Does it go to education? Health? Infrastructure?'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div
                className="aspect-square rounded-3xl p-8 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #102a43 0%, #243b53 100%)',
                }}
              >
                <div className="text-center text-white">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-8xl mb-6"
                  >
                    💰
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-2xl font-bold mb-2"
                  >
                    {lang === 'ar' ? '5.2 تريليون جنيه' : '5.2 Trillion EGP'}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-white/70"
                  >
                    {lang === 'ar' ? 'إجمالي مصروفات الموازنة 2027/2026' : 'Total Budget Expenditures 2027/2026'}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollSection>

      {/* ─── 02 — مراحل إعداد الموازنة ─────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{
          background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)',
        }}
      >
        <div className="section-container">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-eyebrow"
            >
              {lang === 'ar' ? 'المشهد الثاني' : 'Scene 2'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-heading text-3xl sm:text-4xl md:text-5xl"
            >
              {lang === 'ar' ? 'إزاي الدولة بتعد الموازنة؟' : 'How Does the State Prepare the Budget?'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mt-4"
            >
              {lang === 'ar'
                ? 'الموازنة بتتعمل في 6 مراحل رئيسية'
                : 'The budget is prepared in 6 main stages'}
            </motion.p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                number: '01',
                title: lang === 'ar' ? 'التخطيط' : 'Planning',
                description: lang === 'ar'
                  ? 'الدولة بتحدد أولوياتها: إيه الأهم؟ التعليم؟ الصحة؟ البنية التحتية؟'
                  : 'The state sets its priorities: What is most important? Education? Health? Infrastructure?',
              },
              {
                number: '02',
                title: lang === 'ar' ? 'الجمع' : 'Collection',
                description: lang === 'ar'
                  ? 'الجهات الحكومية بتبعت مقترحاتها للوزارة المعنية.'
                  : 'Government bodies send their proposals to the relevant ministry.',
              },
              {
                number: '03',
                title: lang === 'ar' ? 'التنسيق' : 'Coordination',
                description: lang === 'ar'
                  ? 'وزارة المالية بtnzn المقترحات وبtmopzها مع الأولويات.'
                  : 'The Ministry of Finance organizes the proposals and aligns them with priorities.',
              },
              {
                number: '04',
                title: lang === 'ar' ? 'الاعتماد' : 'Approval',
                description: lang === 'ar'
                  ? 'الموازنة بتtnzl لمجلس النواب للموافقة عليها.'
                  : 'The budget is presented to the House of Representatives for approval.',
              },
              {
                number: '05',
                title: lang === 'ar' ? 'التنفيذ' : 'Execution',
                description: lang === 'ar'
                  ? 'الstate بتbd2 tfdil el mawazna w el sdkat el makhaseb.'
                  : 'The state begins implementing the budget and financial commitments.',
              },
              {
                number: '06',
                title: lang === 'ar' ? 'المراجعة' : 'Review',
                description: lang === 'ar'
                  ? 'جهاز الرقابة المالية بيhrer el tfdil w by3ml tqrir.'
                  : 'The Financial Control Authority reviews the implementation and prepares a report.',
              },
            ].map((stage, i) => (
              <TimelineItem
                key={stage.number}
                number={stage.number}
                title={stage.title}
                description={stage.description}
                isLast={i === 5}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 03 — أرقام الموازنة ─────────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{
          background: 'linear-gradient(135deg, #102a43 0%, #243b53 50%, #334e68 100%)',
        }}
      >
        <div className="section-container">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-eyebrow text-white/70"
            >
              {lang === 'ar' ? 'المشهد الثالث' : 'Scene 3'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-heading text-3xl sm:text-4xl md:text-5xl text-white"
            >
              {lang === 'ar' ? 'أرقام الموازنة' : 'Budget Numbers'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/70 mt-4 max-w-2xl mx-auto"
            >
              {lang === 'ar'
                ? 'الدفعة 2027/2026 أوصلت لأرقام كبيرة جداً'
                : 'The 2027/2026 fiscal year reached record numbers'}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Expenditures */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <p className="text-white/70 text-sm mb-2">
                {lang === 'ar' ? 'إجمالي المصروفات' : 'Total Expenditures'}
              </p>
              <AnimatedCounter value="5.2" suffix={lang === 'ar' ? 'تريليون جنيه' : 'Trillion EGP'} />
              <p className="text-white/50 text-xs mt-3">
                {lang === 'ar' ? 'زيادة 13.4% عن السنة السابقة' : '13.4% increase from previous year'}
              </p>
            </motion.div>

            {/* Total Revenues */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <p className="text-white/70 text-sm mb-2">
                {lang === 'ar' ? 'إجمالي الإيرادات' : 'Total Revenues'}
              </p>
              <AnimatedCounter value="4.1" suffix={lang === 'ar' ? 'تريليون جنيه' : 'Trillion EGP'} />
              <p className="text-white/50 text-xs mt-3">
                {lang === 'ar' ? 'زيادة 30% عن السنة السابقة' : '30% increase from previous year'}
              </p>
            </motion.div>

            {/* Primary Surplus */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <p className="text-white/70 text-sm mb-2">
                {lang === 'ar' ? 'الفائض الأولي' : 'Primary Surplus'}
              </p>
              <AnimatedCounter value="1.2" suffix={lang === 'ar' ? 'تريليون جنيه' : 'Trillion EGP'} />
              <p className="text-white/50 text-xs mt-3">
                {lang === 'ar' ? '5% من الناتج المحلي' : '5% of GDP'}
              </p>
            </motion.div>

            {/* Deficit */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <p className="text-white/70 text-sm mb-2">
                {lang === 'ar' ? 'العجز المستهدف' : 'Target Deficit'}
              </p>
              <AnimatedCounter value="4.9" suffix="%" />
              <p className="text-white/50 text-xs mt-3">
                {lang === 'ar' ? 'من الناتج المحلي الإجمالي' : 'of GDP'}
              </p>
            </motion.div>

            {/* Debt Ratio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <p className="text-white/70 text-sm mb-2">
                {lang === 'ar' ? 'نسبة الدين المستهدفة' : 'Target Debt Ratio'}
              </p>
              <AnimatedCounter value="78.1" suffix="%" />
              <p className="text-white/50 text-xs mt-3">
                {lang === 'ar' ? 'بحلول يونيو 2027' : 'By June 2027'}
              </p>
            </motion.div>

            {/* Government Budget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <p className="text-white/70 text-sm mb-2">
                {lang === 'ar' ? 'الموازنة العامة للحكومة' : 'General Government Budget'}
              </p>
              <AnimatedCounter value="9.7" suffix={lang === 'ar' ? 'تريليون جنيه' : 'Trillion EGP'} />
              <p className="text-white/50 text-xs mt-3">
                {lang === 'ar' ? 'إجمالي مصروفات الحكومة العامة' : 'Total general government expenditures'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 04 — 100 جنيه بتروح فين؟ ────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{
          background: 'linear-gradient(180deg, #fef3c7 0%, #ffffff 100%)',
        }}
      >
        <div className="section-container">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-eyebrow"
            >
              {lang === 'ar' ? 'المشهد الرابع' : 'Scene 4'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-heading text-3xl sm:text-4xl md:text-5xl"
            >
              {lang === 'ar' ? '100 جنيه من فلوسك بتروح فين؟' : 'Where Does Your 100 EGP Go?'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mt-4"
            >
              {lang === 'ar'
                ? 'لو عندك 100 جنيه من ضرائبك، هتت窕ع كده'
                : 'If you have 100 EGP from your taxes, here is how it is distributed'}
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <DistributionCard
              percentage={47}
              label={lang === 'ar' ? 'فوائد الدين' : 'Debt Interest'}
              color="#102a43"
              description={lang === 'ar' ? 'خدمة الدين وفوائده' : 'Debt service and interest'}
              delay={0.1}
            />
            <DistributionCard
              percentage={16}
              label={lang === 'ar' ? 'الدعم والحماية' : 'Subsidies & Protection'}
              color="#7c3aed"
              description={lang === 'ar' ? 'الدعم الاجتماعي والحماية' : 'Social support and protection'}
              delay={0.2}
            />
            <DistributionCard
              percentage={16}
              label={lang === 'ar' ? 'الأجور' : 'Wages'}
              color="#059669"
              description={lang === 'ar' ? 'رواتب الموظفين' : 'Employee salaries'}
              delay={0.3}
            />
            <DistributionCard
              percentage={11}
              label={lang === 'ar' ? 'الاستثمارات' : 'Investments'}
              color="#d97706"
              description={lang === 'ar' ? 'المشاريع التنموية' : 'Development projects'}
              delay={0.4}
            />
            <DistributionCard
              percentage={6}
              label={lang === 'ar' ? 'السلع والخدمات' : 'Goods & Services'}
              color="#dc2626"
              description={lang === 'ar' ? 'احتياجات الجهاز الحكومي' : 'Government needs'}
              delay={0.5}
            />
            <DistributionCard
              percentage={4}
              label={lang === 'ar' ? 'أخرى' : 'Other'}
              color="#627d98"
              description={lang === 'ar' ? 'مصاريف متنوعة' : 'Miscellaneous expenses'}
              delay={0.6}
            />
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-amber-50 border border-amber-200/60 rounded-xl p-4 max-w-2xl mx-auto text-center"
          >
            <p className="text-sm text-amber-700">
              {lang === 'ar'
                ? '⚠ النسب محسوبة من بيانات التقرير — ليست نسب رسمية'
                : '⚠ Percentages are calculated from report data — not official percentages'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 05 — القطاعات الأهم ─────────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{
          background: 'linear-gradient(180deg, #d1fae5 0%, #ffffff 100%)',
        }}
      >
        <div className="section-container">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-eyebrow"
            >
              {lang === 'ar' ? 'المشهد الخامس' : 'Scene 5'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-heading text-3xl sm:text-4xl md:text-5xl"
            >
              {lang === 'ar' ? 'فلوس الضرائب بتروح فين؟' : 'Where Do Tax Revenues Go?'}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Health */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-base p-6"
            >
              <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                <span className="text-3xl">🏥</span>
              </div>
              <h3 className="font-bold text-primary-900 text-lg mb-2">
                {lang === 'ar' ? 'الصحة' : 'Health'}
              </h3>
              <p className="text-3xl font-bold text-primary-900 mb-2">
                {lang === 'ar' ? '617.3 مليار جنيه' : '617.3 Billion EGP'}
              </p>
              <p className="text-xs text-primary-500">
                {lang === 'ar' ? '5.8% من الناتج المحلي' : '5.8% of GDP'}
              </p>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-base p-6"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="font-bold text-primary-900 text-lg mb-2">
                {lang === 'ar' ? 'التعليم' : 'Education'}
              </h3>
              <p className="text-3xl font-bold text-primary-900 mb-2">
                {lang === 'ar' ? '1,475.3 مليار جنيه' : '1,475.3 Billion EGP'}
              </p>
              <p className="text-xs text-primary-500">
                {lang === 'ar' ? '7.8% من الناتج المحلي' : '7.8% of GDP'}
              </p>
            </motion.div>

            {/* Social Protection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card-base p-6"
            >
              <div className="w-14 h-14 rounded-xl bg-violet-50 flex items-center justify-center mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="font-bold text-primary-900 text-lg mb-2">
                {lang === 'ar' ? 'الحماية الاجتماعية' : 'Social Protection'}
              </h3>
              <p className="text-3xl font-bold text-primary-900 mb-2">
                {lang === 'ar' ? '836.8 مليار جنيه' : '836.8 Billion EGP'}
              </p>
              <p className="text-xs text-primary-500">
                {lang === 'ar' ? 'الحد الأدنى للأجور 6,000 جنيه' : 'Minimum wage 6,000 EGP'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 06 — الخاتمة ────────────────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{
          background: 'linear-gradient(135deg, #102a43 0%, #243b53 50%, #334e68 100%)',
        }}
      >
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <HiOutlineCheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              {lang === 'ar' ? 'كده خلصنا!' : 'That\'s It!'}
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'دلوقتي فاهم يعني إيه موازنة وإزاي بتتعد وأرقامها كام. ممكن تكتشف أكتر من خلال الأقسام التانية في الموقع.'
                : 'Now you understand what a budget is, how it is prepared, and its numbers. You can explore more through other sections on the site.'}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a href="/budget100" className="btn-primary bg-white text-primary-800 hover:bg-white/90">
                {lang === 'ar' ? 'جرّب ميزانية 100 جنيه' : 'Try 100 EGP Budget'}
              </a>
              <a href="/finance-minister" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20">
                {lang === 'ar' ? 'كون وزير المالية' : 'Be the Finance Minister'}
              </a>
              <a href="/quiz" className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20">
                {lang === 'ar' ? 'اختبر معلوماتك' : 'Test Your Knowledge'}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
