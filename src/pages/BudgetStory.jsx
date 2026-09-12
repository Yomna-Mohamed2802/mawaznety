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
  HiOutlineArrowDown,
  HiOutlineUsers,
  HiOutlineHeart,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
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
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: -60 },
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

/* ─── Scroll Indicator ──────────────────────────────────── */

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-xs">اسحب للأسفل</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Stat Card ─────────────────────────────────────────── */

function StatCard({ value, label, suffix = '', color = 'white' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
    >
      <p className="text-white/70 text-sm mb-2">{label}</p>
      <p className={`text-4xl sm:text-5xl font-bold text-${color} tabular-nums`}>
        {value}
        {suffix && <span className="text-lg font-normal text-white/70 mr-2">{suffix}</span>}
      </p>
    </motion.div>
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
              ? 'موازنة المواطن المصرية 2027/2026 — الإصدار الثالث عشر'
              : 'Egypt\'s Citizen Budget 2027/2026 — 13th Edition'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-sm text-white/50 mb-8"
          >
            {lang === 'ar'
              ? 'وزارة المالية — أغسطس 2026'
              : 'Ministry of Finance — August 2026'}
          </motion.p>

          <ScrollIndicator />
        </motion.div>
      </section>

      {/* ─── 01 — رسالة الوزير ────────────────────────────── */}
      <ScrollSection
        id="minister-letter"
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
              {lang === 'ar' ? 'الفصل الأول' : 'Chapter 1'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-heading text-3xl sm:text-4xl md:text-5xl"
            >
              {lang === 'ar' ? 'رسالة من الوزير' : 'Message from the Minister'}
            </motion.h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-base p-8 sm:p-10"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
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

              <div className="space-y-4 text-primary-700 leading-relaxed">
                <p>
                  {lang === 'ar'
                    ? 'للعام الثالث عشر على التوالي، تصدر وزارة المالية تقرير موازنة المواطن كأحد أهم الأدوات لمد جسور التواصل ورفع وعي المواطن المصري بأحدث توجهات السياسة المالية وآليات الموازنة التشاركية.'
                    : 'For the thirteenth consecutive year, the Ministry of Finance issues the Citizen Budget report as one of the most important tools for bridging communication and raising awareness of the latest fiscal policy trends and participatory budgeting mechanisms.'}
                </p>
                <p>
                  {lang === 'ar'
                    ? 'أننا نقف اليوم على أسس اقتصادية أفضل وأكثر صلابﺔ تسمح باستكمال مسيرة الإصلاح والقدم ورفع وطن؛ حيث أثبت الاقتصاد المصري مرونة في التصدي للتحديات العالمية بفضل الإصلاحات الهيكلية التي تطبقها الدولة المصرية.'
                    : 'We stand today on better and stronger economic foundations that allow us to continue the path of reform and progress; where the Egyptian economy has shown resilience in facing global challenges thanks to the structural reforms implemented by the Egyptian state.'}
                </p>
                <p>
                  {lang === 'ar'
                    ? 'حيث تنطلق موازنة الدولة لعام 2027/2026 من رؤية واضحة تضع المواطن والمستثمر في قلب الأولويات، وتعكس التزام الدولة بتحقيق معادلة متوازنة بين مساندة المواطنين وتوفير حياة كريمة لهم مع تحفيز ودعم النشاط الاقتصادي والحفاظ على الاستقرار المالي.'
                    : 'The state budget for 2027/2026 launches from a clear vision that places the citizen and investor at the heart of priorities, reflecting the state\'s commitment to achieving a balanced equation between supporting citizens and providing them with a decent life while stimulating and supporting economic activity and maintaining financial stability.'}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-primary-100">
                <p className="text-sm text-primary-500 italic">
                  {lang === 'ar'
                    ? 'وكل ما يهم المواطنين، وإعادة ترتيب الأولويات حتى يكون الإنفاق العام أكثر مراعاة للبعد الاجتماعي.'
                    : 'And everything that concerns citizens, and re-prioritizing so that public expenditure is more socially oriented.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollSection>

      {/* ─── 02 — يعني إيه موازنة؟ ────────────────────────── */}
      <section
        id="what-is-budget"
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
              {lang === 'ar' ? 'الفصل الثاني' : 'Chapter 2'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-heading text-3xl sm:text-4xl md:text-5xl"
            >
              {lang === 'ar' ? 'يعني إيه موازنة؟' : 'What is a Budget?'}
            </motion.h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-base p-8 sm:p-10 mb-8"
            >
              <div className="space-y-4 text-primary-700 leading-relaxed">
                <p>
                  {lang === 'ar'
                    ? 'تُعد الموازنة العامة للدولة الأداة الأساسية لوزارة المالية لتحقيق الأهداف الاقتصادية والاجتماعية للمواطنين، عبر الاستغلال الأمثل لموارد الدولة.'
                    : 'The general state budget is the basic tool for the Ministry of Finance to achieve the economic and social goals of citizens through the optimal exploitation of state resources.'}
                </p>
                <p>
                  {lang === 'ar'
                    ? 'هي وثيقة تُبين الإيرادات المتوقعة للدولة خلال العام المالي، وخطة الحكومة لإعادة ترتيب أولويات الإنفاق بما يُحسّن جودة حياة المواطن في مجالات الحماية الاجتماعية والخدمات العامة مثل الصحة والتعليم والإسكان والتمويين وحماية البيئة.'
                    : 'It is a document that shows the expected revenues of the state during the fiscal year, and the government\'s plan to re-prioritize spending to improve the quality of life of citizens in areas of social protection and public services such as health, education, housing, supply, and environmental protection.'}
                </p>
                <p>
                  {lang === 'ar'
                    ? 'كما تعرض الموازنة خطط وبرامج وزارة المالية التي أعدتها الدولة للتصدي للتحديات الراهنتمهنة الطريق أمام تحقيق مستقبل أفضل، وتُعد كذلك أداة للرقابة والمساءلة تُمكّن المواطنين من التأكيد من توافق خطط الإنفاق الحكومي مع أولوياتهم.'
                    : 'The budget also presents the plans and programs of the Ministry of Finance that the state has prepared to address current challenges and pave the way for a better future, and is also a tool for oversight and accountability that enables citizens to ensure that government spending plans align with their priorities.'}
                </p>
              </div>
            </motion.div>

            {/* مراحل إعداد الموازنة */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-base p-8 sm:p-10"
            >
              <h3 className="text-xl font-bold text-primary-900 mb-6">
                {lang === 'ar' ? 'مراحل إعداد الموازنة' : 'Budget Preparation Stages'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    number: '01',
                    title: lang === 'ar' ? 'تصدر وزارة المالية منشور إعداد الموازنة' : 'Ministry of Finance issues budget preparation bulletin',
                    description: lang === 'ar'
                      ? 'تقوم جهات الدولة بإعداد مشروعات موازناتها'
                      : 'State entities prepare their budget proposals',
                  },
                  {
                    number: '02',
                    title: lang === 'ar' ? 'تناقش وزارة المالية مشروعات الموازنات' : 'Ministry of Finance discusses budget proposals',
                    description: lang === 'ar'
                      ? 'الواردة إليها الخاصة بكل جهة'
                      : 'Received from each entity',
                  },
                  {
                    number: '03',
                    title: lang === 'ar' ? 'يقدم وزير المالية مشروع الموازنة لمجلس الوزراء' : 'Minister of Finance presents budget to Cabinet',
                    description: lang === 'ar'
                      ? 'للمناقشة والتعديل'
                      : 'For discussion and amendment',
                  },
                  {
                    number: '04',
                    title: lang === 'ar' ? 'يعرض مجلس الوزراء مشروع الموازنة على رئيس الجمهورية' : 'Cabinet presents budget to President',
                    description: lang === 'ar'
                      ? 'بعد تعديله للمناقشة والموافقة عليه'
                      : 'After amendment for discussion and approval',
                  },
                  {
                    number: '05',
                    title: lang === 'ar' ? 'يحيل السيد رئيس الجمهورية مشروع الموازنة لمجلس النواب' : 'President refers budget to House of Representatives',
                    description: lang === 'ar'
                      ? 'لمناقشته وتعديله في ضوء القواعد الحاكمة في الدستور والقانون'
                      : 'For discussion and amendment in light of constitutional and legal rules',
                  },
                  {
                    number: '06',
                    title: lang === 'ar' ? 'بعد اعتماد قانون الموازنة من مجلس النواب' : 'After budget law is approved by House of Representatives',
                    description: lang === 'ar'
                      ? 'يتم إرساله مرة أخرى إلى فخامة رئيس الجمهورية لاعتماده بشكل نهائي ثم إلى وزارة المالية للتنفيذ'
                      : 'It is sent again to the President for final approval and then to the Ministry of Finance for implementation',
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 03 — ما تم تحقيقه في 2025/2026 ──────────────── */}
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
              {lang === 'ar' ? 'الفصل الثالث' : 'Chapter 3'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-heading text-3xl sm:text-4xl md:text-5xl text-white"
            >
              {lang === 'ar' ? 'ما تم تحقيقه في 2025/2026' : 'Achievements in 2025/2026'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/70 mt-4 max-w-2xl mx-auto"
            >
              {lang === 'ar'
                ? 'أثبت الاقتصاد المصري صلابة ومرونة في التصدي للتحديات العالمية'
                : 'The Egyptian economy showed strength and resilience in facing global challenges'}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <StatCard
              value="5%"
              label={lang === 'ar' ? 'معدل النمو الاقتصادي' : 'Economic Growth Rate'}
              color="white"
            />
            <StatCard
              value="78%"
              label={lang === 'ar' ? 'نسبة الدين من الناتج المحلي' : 'Debt to GDP Ratio'}
              color="white"
            />
            <StatCard
              value="78.5"
              suffix={lang === 'ar' ? 'مليار دولار' : 'Billion USD'}
              label={lang === 'ar' ? 'الدين الخارجي' : 'External Debt'}
              color="white"
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                {lang === 'ar' ? 'أهم النتائج المحققة' : 'Key Achievements'}
              </h3>

              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  {lang === 'ar'
                    ? 'حققت مصر فائض أولي مستدام خلال السنوات الأخيرة مقارنة بعجز أولي مستمر للدول الناشئة، ومازالت مصر تستهدف فائض أولي يبلغ 5% من الناتج المحلي في موازنة العام المالي 2027/2026.'
                    : 'Egypt achieved a sustained primary surplus in recent years compared to a continued primary deficit in emerging countries, and Egypt still targets a primary surplus of 5% of GDP in the 2027/2026 fiscal year budget.'}
                </p>
                <p>
                  {lang === 'ar'
                    ? 'خفض دين أجهزة الموازنة العامة كنسبة من الناتج المحلي الإجمالي بحوالى 13% خلال عامين فقط، حيث انخفض من حوالى 82.5% من الناتج في يونيو 2025 وصوًاًل إلى 78% من الناتج في ديسمبر 2025.'
                    : 'Reduced the debt of general budget bodies as a percentage of GDP by about 13% in just two years, falling from about 82.5% of output in June 2025 to about 78% of output in December 2025.'}
                </p>
                <p>
                  {lang === 'ar'
                    ? 'كما انخفض الدين الخارجي لأجهزة الموازنة العامة بنحو 4 مليار دولار خلال عامين وصوًاًل إلى 78.5 مليار دولار في يونيو 2025.'
                    : 'External debt of general budget bodies also decreased by about $4 billion in two years to about $78.5 billion in June 2025.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 04 — أهم ركائز الموازنة ──────────────────────── */}
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
              {lang === 'ar' ? 'الفصل الرابع' : 'Chapter 4'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-heading text-3xl sm:text-4xl md:text-5xl"
            >
              {lang === 'ar' ? 'أهم ركائز الموازنة' : 'Key Budget Pillars'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mt-4"
            >
              {lang === 'ar'
                ? 'الموازنة الجديدة تنحاز للمواطن والمستثمر وتعزز النشاط الاقتصادي'
                : 'The new budget favors the citizen and investor and boosts economic activity'}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '⚖️',
                title: lang === 'ar' ? 'سياسة مالية متوازنة' : 'Balanced Fiscal Policy',
                description: lang === 'ar'
                  ? 'تجمع بين دفع النمو الاقتصادي وتعزيز التنافسية والحفاظ على الانضباط المالي'
                  : 'Combines driving economic growth, enhancing competitiveness, and maintaining fiscal discipline',
              },
              {
                icon: '🤝',
                title: lang === 'ar' ? 'استكمال مسار الثقة والشراكة' : 'Completing Trust & Partnership Path',
                description: lang === 'ar'
                  ? 'مع مجتمع الأعمال وتطبيق حزم التسهيلات الضريبية والجمركية والعقارية'
                  : 'With business community and implementing tax, customs, and real estate facilitation packages',
              },
              {
                icon: '💰',
                title: lang === 'ar' ? 'خلق مساحة مالية كافية' : 'Creating Sufficient Fiscal Space',
                description: lang === 'ar'
                  ? 'للإنفاق الإضافي على الصحة والتعليم والحماية الاجتماعية للفئات الأولى بالرعاية'
                  : 'For additional spending on health, education, and social protection for priority groups',
              },
              {
                icon: '📈',
                title: lang === 'ar' ? 'استراتيجية متكاملة للمديونية' : 'Integrated Debt Strategy',
                description: lang === 'ar'
                  ? 'لاستدامة مديونية أجهزة الموازنة بشكل قوي ومؤثر'
                  : 'For sustainability of budget body debt in a strong and effective manner',
              },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-base p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">{pillar.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-900 text-lg mb-2">{pillar.title}</h3>
                    <p className="text-sm text-primary-600 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05 — الحماية الاجتماعية ──────────────────────── */}
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
              {lang === 'ar' ? 'الفصل الخامس' : 'Chapter 5'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-heading text-3xl sm:text-4xl md:text-5xl"
            >
              {lang === 'ar' ? 'الحماية الاجتماعية' : 'Social Protection'}
            </motion.h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-base p-6 text-center"
              >
                <HiOutlineShieldCheck className="w-12 h-12 text-violet-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-primary-900 mb-2">836.8</p>
                <p className="text-sm text-primary-500">
                  {lang === 'ar' ? 'مليار جنيه للدعم والحماية الاجتماعية' : 'Billion EGP for support and social protection'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="card-base p-6 text-center"
              >
                <HiOutlineCurrencyDollar className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-primary-900 mb-2">8,000</p>
                <p className="text-sm text-primary-500">
                  {lang === 'ar' ? 'جنيه الحد الأدنى للدخل' : 'EGP minimum income'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="card-base p-6 text-center"
              >
                <HiOutlineUsers className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-primary-900 mb-2">21.2%</p>
                <p className="text-sm text-primary-500">
                  {lang === 'ar' ? 'زيادة الأجور سنوياً' : 'Annual wage increase'}
                </p>
              </motion.div>
            </div>

            {/* Wage Increases */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-base p-8 mb-8"
            >
              <h3 className="text-xl font-bold text-primary-900 mb-6">
                {lang === 'ar' ? 'زيادة غير مسبوقة لتحسين الدخل' : 'Unprecedented Income Improvement'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">
                        {lang === 'ar' ? '100 مليار جنيه' : '100 Billion EGP'}
                      </p>
                      <p className="text-sm text-primary-600">
                        {lang === 'ar' ? 'تكلفة الزيادة من أول يوليو' : 'Cost of increase from July'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">
                        {lang === 'ar' ? '12% علاوة دورية' : '12% periodic raise'}
                      </p>
                      <p className="text-sm text-primary-600">
                        {lang === 'ar' ? 'للمخاطبين بقانون الخدمة المدنية' : 'For civil service law subjects'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">
                        {lang === 'ar' ? '15% علاوة دورية' : '15% periodic raise'}
                      </p>
                      <p className="text-sm text-primary-600">
                        {lang === 'ar' ? 'لغير المخاطبين' : 'For non-subjects'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">
                        {lang === 'ar' ? '750 جنيه شهرياً' : '750 EGP monthly'}
                      </p>
                      <p className="text-sm text-primary-600">
                        {lang === 'ar' ? 'الحافز الإضافي لكل العاملين' : 'Additional incentive for all workers'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">
                        {lang === 'ar' ? '1,000 جنيه شهرياً' : '1,000 EGP monthly'}
                      </p>
                      <p className="text-sm text-primary-600">
                        {lang === 'ar' ? 'حافز تدريس إضافي للمعلمين' : 'Additional teaching incentive for teachers'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">
                        {lang === 'ar' ? '750 جنيه شهرياً' : '750 EGP monthly'}
                      </p>
                      <p className="text-sm text-primary-600">
                        {lang === 'ar' ? 'زيادة للعاملين في القطاع الطبي' : 'Increase for medical sector workers'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Support Programs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-base p-8"
            >
              <h3 className="text-xl font-bold text-primary-900 mb-6">
                {lang === 'ar' ? 'أهم برامج الدعم' : 'Key Support Programs'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { value: '178.3', label: lang === 'ar' ? 'مليار جنيه لدعم السلع التموينية' : 'Billion EGP for commodity subsidies' },
                  { value: '104.2', label: lang === 'ar' ? 'مليار جنيه لدعم الكهرباء' : 'Billion EGP for electricity support' },
                  { value: '13', label: lang === 'ar' ? 'مليار جنيه للإسكان' : 'Billion EGP for housing' },
                  { value: '69.1', label: lang === 'ar' ? 'مليار جنيه لتمويل شراء القمح' : 'Billion EGP for wheat purchase' },
                  { value: '46', label: lang === 'ar' ? 'مليار جنيه للمناطق العشوائية' : 'Billion EGP for slum areas' },
                  { value: '33.3', label: lang === 'ar' ? 'مليار جنيه للأدوية' : 'Billion EGP for medicines' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-surface-warm rounded-xl p-4"
                  >
                    <p className="text-2xl font-bold text-primary-900">{item.value}</p>
                    <p className="text-xs text-primary-500 mt-1">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 06 — التعليم والصحة ──────────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{
          background: 'linear-gradient(180deg, #dbeafe 0%, #ffffff 100%)',
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
              {lang === 'ar' ? 'الفصل السادس' : 'Chapter 6'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-heading text-3xl sm:text-4xl md:text-5xl"
            >
              {lang === 'ar' ? 'التعليم والصحة' : 'Education & Health'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mt-4"
            >
              {lang === 'ar'
                ? 'الوفاء بالاستحقاقات الدستورية دعمًا للاستثمار في رأس المال البشري'
                : 'Fulfilling constitutional commitments to support human capital investment'}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-base p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center">
                  <HiOutlineAcademicCap className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-900">
                    {lang === 'ar' ? 'التعليم' : 'Education'}
                  </h3>
                  <p className="text-sm text-primary-500">
                    {lang === 'ar' ? 'التعليم العام والجامعي والبحث العلمي' : 'General, university education and scientific research'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-surface-warm rounded-xl p-4">
                  <p className="text-3xl font-bold text-primary-900">1,475.3</p>
                  <p className="text-sm text-primary-500">
                    {lang === 'ar' ? 'مليار جنيه — 7.8% من الناتج المحلي' : 'Billion EGP — 7.8% of GDP'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-warm rounded-xl p-3">
                    <p className="text-lg font-bold text-primary-900">55.5</p>
                    <p className="text-xs text-primary-500">
                      {lang === 'ar' ? 'مليار للكتب الدراسية' : 'Billion for textbooks'}
                    </p>
                  </div>
                  <div className="bg-surface-warm rounded-xl p-3">
                    <p className="text-lg font-bold text-primary-900">47.7</p>
                    <p className="text-xs text-primary-500">
                      {lang === 'ar' ? 'مليار للوجبات المدرسية' : 'Billion for school meals'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Health */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-base p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                  <HiOutlineHeart className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-900">
                    {lang === 'ar' ? 'الصحة' : 'Health'}
                  </h3>
                  <p className="text-sm text-primary-500">
                    {lang === 'ar' ? 'الخدمات الصحية والمستشفيات والتأمين الصحي' : 'Health services, hospitals and health insurance'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-surface-warm rounded-xl p-4">
                  <p className="text-3xl font-bold text-primary-900">617.3</p>
                  <p className="text-sm text-primary-500">
                    {lang === 'ar' ? 'مليار جنيه — 5.8% من الناتج المحلي' : 'Billion EGP — 5.8% of GDP'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-warm rounded-xl p-3">
                    <p className="text-lg font-bold text-primary-900">33.3</p>
                    <p className="text-xs text-primary-500">
                      {lang === 'ar' ? 'مليار للأدوية' : 'Billion for medicines'}
                    </p>
                  </div>
                  <div className="bg-surface-warm rounded-xl p-3">
                    <p className="text-lg font-bold text-primary-900">25.2</p>
                    <p className="text-xs text-primary-500">
                      {lang === 'ar' ? 'مليار للمستلزمات الطبية' : 'Billion for medical supplies'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 07 — الخاتمة ────────────────────────────────── */}
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
                ? 'دلوقتي فاهم يعني إيه موازنة وإزاي بتتعمل وأرقامها كام. ده كان ملخص لموازنة المواطن المصرية 2027/2026.'
                : 'Now you understand what a budget is, how it is prepared, and its numbers. This was a summary of Egypt\'s Citizen Budget 2027/2026.'}
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
