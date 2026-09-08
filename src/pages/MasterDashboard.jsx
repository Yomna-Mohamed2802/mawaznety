import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  HiOutlineArrowDown, HiOutlineArrowUp, HiOutlineChartBar,
  HiOutlineChevronDown, HiOutlineDocumentText,
  HiOutlineExternalLink, HiOutlineGlobeAlt, HiOutlineHeart, HiOutlineLightBulb,
  HiOutlineLocationMarker, HiOutlineOfficeBuilding, HiOutlineShieldCheck,
  HiOutlineTrendingUp, HiOutlineUsers, HiOutlineX
} from 'react-icons/hi';
import SourceBadge from '../components/dashboard/SourceBadge';
import SourceDrawer from '../components/dashboard/SourceDrawer';
import StatCard from '../components/dashboard/StatCard';
import ExpenditureDonut from '../components/charts/ExpenditureDonut';
import DebtTrendChart from '../components/charts/DebtTrendChart';
import InvestmentChart from '../components/charts/InvestmentChart';
import ChatBot from '../components/chatbot/ChatBot';
import {
  budgetOverview, budget100, revenues, expenditures, debt,
  education, health, social, infrastructure, economy,
  formatValue, FISCAL_YEAR, BUDGET_SOURCE_ID, VERIFICATION
} from '../data';
import { totalTaxes } from '../data/budget';

/* ─── Helpers ──────────────────────────────────────────── */

function fmt(val, unit = 'billion_EGP') {
  return formatValue({ value: val, unit });
}

function fmtT(val) {
  if (val == null) return '—';
  return `${(val / 1000).toFixed(2)} تريليون جنيه`;
}

function fmtB(val) {
  if (val == null) return '—';
  return `${val.toLocaleString('ar-EG')} مليار جنيه`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function Section({ children, className = '', id }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Colors ───────────────────────────────────────────── */

const DONUT_COLORS = ['#102a43', '#7c3aed', '#059669', '#d97706', '#dc2626', '#627d98'];

/* ─── Main Component ───────────────────────────────────── */

export default function MasterDashboard() {
  const [drawerFigure, setDrawerFigure] = useState(null);
  const [activeSector, setActiveSector] = useState(null);
  const [activeExpenditure, setActiveExpenditure] = useState(null);
  const [citizenProfile, setCitizenProfile] = useState(null);
  const [allocations, setAllocations] = useState({ interest: 47, subsidies: 16, wages: 16, investments: 11, goods: 6, other: 4 });
  const [toast, setToast] = useState(null);

  const openSource = (figure) => figure && setDrawerFigure(figure);
  const showToast = (msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  };

  /* ─── Budget 100 data for donut ──────────────────────── */

  const expData = budget100.map((item) => ({
    id: item.id,
    label: item.name,
    value: item.amountM,
    pct: item.percentage,
    figure: item.figure,
    description: item.description,
  }));

  const totalExp = expData.reduce((s, d) => s + d.value, 0);

  /* ─── Revenue data ───────────────────────────────────── */

  const revCategories = revenues.categories.filter((c) => c.figure.value != null);
  const revTotal = revenues.total;

  /* ─── Debt trend data ────────────────────────────────── */

  const debtTrend = debt.trends.map((t) => ({
    id: t.figure.id,
    year: t.year,
    value: t.figure.value,
    figure: t.figure,
  }));

  /* ─── Investment data ────────────────────────────────── */

  const investSectors = [
    { label: 'النقل', value: 640.1 },
    { label: 'الصناعة التحويلية', value: 281.3 },
    { label: 'الزراعة والري', value: 173.2 },
  ];

  const investPublic = [
    { label: 'الهيئات الاقتصادية', value: 743.4 },
    { label: 'الجهاز الحكومي', value: 553.7 },
    { label: 'قطاع الأعمال العام', value: 262.9 },
    { label: 'الإدارة المحلية', value: 37.4 },
  ];

  /* ─── Citizen profiles ───────────────────────────────── */

  const profiles = [
    { id: 'student', icon: '🎓', label: 'طالب', figures: [education.totalBudget, education.percentageOfGDP, education.textbooks, education.schoolMeals, education.research.totalBudget] },
    { id: 'worker', icon: '💼', label: 'شاب عامل', figures: [social.wagesTotal, social.wagesGrowth, social.minimumWage, budgetOverview.primarySurplus] },
    { id: 'family', icon: '👨‍👩‍👧', label: 'أسرة', figures: [social.totalBudget, social.foodCommodity, social.takafulKarama, social.minimumWage, social.ramadanPackage] },
    { id: 'entrepreneur', icon: '🚀', label: 'صاحب مشروع', figures: [infrastructure.totalInvestmentInclStock, economy.indicators.investmentRate, economy.indicators.savingsRate, economy.indicators.exportGrowth] },
    { id: 'health_interested', icon: '🏥', label: 'مهتم بالصحة', figures: [health.totalBudget, health.percentageOfGDP, health.procurementAuthority, health.treatmentAtStateExpense, health.medicineAllocation] },
    { id: 'environment', icon: '🌱', label: 'مهتم بالبيئة', figures: [infrastructure.agricultureSector, social.water, social.energyEfficiency, economy.indicators.prioritySectorsShare] },
  ];

  const selectedProfile = profiles.find((p) => p.id === citizenProfile);

  /* ─── Expenditure allocation game ────────────────────── */

  const totalAlloc = Object.values(allocations).reduce((s, v) => s + v, 0);
  const remaining = 100 - totalAlloc;

  const handleAllocation = (key, val) => {
    const v = parseInt(val) || 0;
    const diff = v - allocations[key];
    if (remaining - diff >= 0) {
      setAllocations({ ...allocations, [key]: v });
    }
  };

  const actualPcts = expData.map((d) => ({ label: d.label, actual: d.pct }));

  /* ─── Render ─────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-surface" dir="rtl">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #102a43 0%, #243b53 50%, #334e68 100%)' }}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #486581 0%, transparent 50%), radial-gradient(circle at 75% 20%, #059669 0%, transparent 50%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent" />
        </div>
        <div className="section-container relative py-16 sm:py-20 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-1.5 mb-7 text-xs sm:text-sm font-medium bg-white/8 rounded-full border border-white/15 backdrop-blur-sm text-white/85"
            >
              موازنة المواطن {FISCAL_YEAR} · الإصدار الثالث عشر
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-5 leading-[1.1] tracking-tight text-balance"
            >
              الموازنة في دقيقة
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-9 leading-relaxed"
            >
              شوف الصورة الكبيرة لموازنة الدولة {FISCAL_YEAR}، وافهم فلوس الدولة بتروح فين وبتأثر عليك إزاي.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a href="#kpi" className="btn-primary bg-primary-900 text-white hover:bg-primary-800" style={{ boxShadow: '0 10px 30px -10px rgb(0 0 0 / 0.3)' }}>
                ابدأ الاستكشاف
              </a>
              <button
                onClick={() => {
                  window.location.href = '/download';
                }}
                className="btn-secondary bg-white/15 text-white border-white/30 hover:bg-white/25"
              >
                <HiOutlineDocumentText className="w-4 h-4" />
                تحميل موازنة المواطن
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── 01 — KPI SECTION ────────────────────────────── */}
      <Section id="kpi" className="section-container py-10 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {[
            { figure: budgetOverview.expenditures, icon: HiOutlineArrowDown, color: 'red' },
            { figure: budgetOverview.revenues, icon: HiOutlineArrowUp, color: 'green' },
            { figure: budgetOverview.deficit, icon: HiOutlineChartBar, color: 'amber' },
            { figure: totalTaxes, icon: HiOutlineOfficeBuilding, color: 'blue' },
            { figure: budgetOverview.primarySurplus, icon: HiOutlineTrendingUp, color: 'purple' },
          ].map((item, i) => (
            <motion.div
              key={item.figure.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
            >
              <StatCard
                figure={item.figure}
                icon={item.icon}
                color={item.color}
                onClick={() => openSource(item.figure)}
              />
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs text-primary-500 mt-4">المصدر: موازنة المواطن {FISCAL_YEAR} — صفحة 12</p>
      </Section>

      {/* ─── 02 — فلوس الدولة بتروح فين؟ ────────────────── */}
      <Section className="section-container py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <span className="section-eyebrow">المصروفات</span>
          <h2 className="section-heading">فلوس الدولة بتروح فين؟</h2>
          <p className="section-subtitle">توزيع 100 جنيه من مصروفات الموازنة</p>
          <p className="text-xs text-amber-700 mt-2">⚠ النسب محسوبة من بيانات التقرير — ليست نسب رسمية</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <ExpenditureDonut data={expData} onSliceClick={(d) => setActiveExpenditure(d.id === activeExpenditure ? null : d.id)} activeId={activeExpenditure} />
          </div>

          <div className="space-y-2.5">
            {expData.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveExpenditure(item.id === activeExpenditure ? null : item.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-right ${
                  activeExpenditure === item.id
                    ? 'border-primary-700 bg-primary-800/[0.04]'
                    : 'border-primary-100/60 bg-white hover:border-primary-300 hover:bg-primary-50/30'
                }`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: DONUT_COLORS[i] }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className={`font-semibold text-sm ${activeExpenditure === item.id ? 'text-primary-900' : 'text-primary-700'}`}>
                      {item.label}
                    </span>
                    <span className={`text-sm font-bold tabular-nums ${activeExpenditure === item.id ? 'text-primary-900' : 'text-primary-500'}`}>
                      {item.pct}%
                    </span>
                  </div>
                  <div className="w-full bg-primary-100/60 rounded-full h-1.5 mt-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(item.pct * 2, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.05 }}
                      className="h-1.5 rounded-full"
                      style={{ backgroundColor: DONUT_COLORS[i] }}
                    />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {activeExpenditure && (() => {
            const item = expData.find((d) => d.id === activeExpenditure);
            if (!item) return null;
            return (
              <motion.div
                key="exp-detail"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-8 card-base p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-primary-900">{item.label}</h3>
                    <p className="text-sm text-primary-600 mt-1">{item.description}</p>
                  </div>
                  <button onClick={() => setActiveExpenditure(null)} className="p-1.5 rounded-lg hover:bg-primary-50 transition-colors">
                    <HiOutlineX className="w-4 h-4 text-primary-500" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-surface-warm rounded-xl p-3.5">
                    <p className="text-xs text-primary-500 mb-1">القيمة</p>
                    <p className="text-base font-bold text-primary-900">{fmtB(item.value)}</p>
                  </div>
                  <div className="bg-surface-warm rounded-xl p-3.5">
                    <p className="text-xs text-primary-500 mb-1">النسبة</p>
                    <p className="text-base font-bold text-primary-900">{item.pct}%</p>
                  </div>
                  <div className="bg-surface-warm rounded-xl p-3.5">
                    <p className="text-xs text-primary-500 mb-1">الحالة</p>
                    <SourceBadge status={item.figure.verificationStatus} showLabel />
                  </div>
                  <div className="bg-surface-warm rounded-xl p-3.5">
                    <p className="text-xs text-primary-500 mb-1">المصدر</p>
                    <button onClick={() => openSource(item.figure)} className="text-sm text-primary-600 hover:text-primary-800 hover:underline flex items-center gap-1 transition-colors">
                      صفحة {item.figure.page || '—'}
                      <HiOutlineExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                {item.figure.note && (
                  <p className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200/60 rounded-xl p-3">{item.figure.note}</p>
                )}
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </Section>

      {/* ─── 03 — منين بتيجي فلوس الدولة؟ ───────────────── */}
      <Section className="bg-white py-16 sm:py-20">
        <div className="section-container">
          <div className="text-center mb-10 sm:mb-12">
            <span className="section-eyebrow">الإيرادات</span>
            <h2 className="section-heading">منين بتيجي فلوس الدولة؟</h2>
            <p className="section-subtitle">مصادر الإيرادات الرئيسية للموازنة</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {revCategories.map((cat, i) => {
              const pct = revTotal.value > 0 ? ((cat.figure.value / revTotal.value) * 100).toFixed(1) : 0;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card-interactive p-5"
                  onClick={() => openSource(cat.figure)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#102a43', '#059669', '#d97706'][i] }} />
                      <span className="font-semibold text-primary-800">{cat.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-primary-900">{fmtB(cat.figure.value)}</span>
                      <SourceBadge status={cat.figure.verificationStatus} />
                    </div>
                  </div>
                  <div className="w-full bg-primary-100/60 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-2 rounded-full"
                      style={{ backgroundColor: ['#102a43', '#059669', '#d97706'][i] }}
                    />
                  </div>
                  <div className="flex justify-between mt-2.5 text-xs text-primary-500">
                    <span className="font-medium text-primary-600">{pct}% من إجمالي الإيرادات</span>
                    <span>صفحة {cat.figure.page || '—'}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8 p-4 bg-amber-50 border border-amber-200/60 rounded-xl max-w-2xl mx-auto">
            <p className="text-sm text-amber-700">⚠ تفاصيل الضرائب (دخل، ضريبة قيمة مضافة، جمارك، دمغة) غير متاحة في المصدر الرسمي الحالي.</p>
          </div>
        </div>
      </Section>

      {/* ─── 04 — مؤشرات الاقتصاد ───────────────────────── */}
      <Section className="section-container py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <span className="section-eyebrow">المؤشرات</span>
          <h2 className="section-heading">الاقتصاد رايح فين؟</h2>
          <p className="section-subtitle">المؤشرات الاقتصادية الرئيسية للموازنة</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { label: 'النمو المستهدف', figure: economy.indicators.growthRate, color: 'green', icon: HiOutlineTrendingUp },
            { label: 'التضخم', figure: economy.indicators.inflation, color: 'amber', icon: HiOutlineChartBar },
            { label: 'البطالة المستهدفة', figure: economy.indicators.unemployment, color: 'red', icon: HiOutlineUsers },
            { label: 'معدل الاستثمار', figure: economy.indicators.investmentRate, color: 'blue', icon: HiOutlineOfficeBuilding },
            { label: 'الادخار', figure: economy.indicators.savingsRate, color: 'teal', icon: HiOutlineShieldCheck },
            { label: 'سعر الفائدة', figure: economy.indicators.interestRate, color: 'purple', icon: HiOutlineLightBulb },
            { label: 'نمو الصادرات', figure: economy.indicators.exportGrowth, color: 'green', icon: HiOutlineGlobeAlt },
            { label: 'حصة القطاعات الأولوية', figure: economy.indicators.prioritySectorsShare, color: 'blue', icon: HiOutlineLocationMarker },
          ].map((item, i) => {
            const colorMap = {
              green: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
              amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
              red: { bg: 'bg-red-50', text: 'text-red-600' },
              blue: { bg: 'bg-primary-50', text: 'text-primary-600' },
              teal: { bg: 'bg-teal-50', text: 'text-teal-600' },
              purple: { bg: 'bg-violet-50', text: 'text-violet-600' },
            };
            const c = colorMap[item.color] || colorMap.blue;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="card-interactive p-4"
                onClick={() => openSource(item.figure)}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-3.5 h-3.5 ${c.text}`} />
                  </div>
                  <span className="text-xs text-primary-600 font-medium">{item.label}</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-primary-900 tabular-nums">
                  {item.figure.value != null ? `${item.figure.value}%` : '—'}
                </p>
                <div className="mt-2">
                  <SourceBadge status={item.figure.verificationStatus} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl p-10 sm:p-12 text-white text-center transition-shadow duration-300"
          style={{ background: 'linear-gradient(135deg, #102a43 0%, #243b53 50%, #334e68 100%)', boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.15), inset 0 1px 0 rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs sm:text-sm text-white/70 mb-2.5 tracking-wide">الناتج المحلي الإجمالي · بسعر السوق</p>
          <p className="text-5xl sm:text-6xl font-bold tracking-tight leading-none">
            24.5
            <span className="text-base sm:text-lg font-normal text-white/70 mr-2">تريليون جنيه</span>
          </p>
          <div className="mt-5 flex justify-center items-center gap-3 text-xs">
            <button onClick={() => openSource(economy.indicators.gdp)} className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <SourceBadge status={economy.indicators.gdp.verificationStatus} showLabel />
            </button>
            <span className="text-white/50">·</span>
            <span className="text-white/70">صفحة 11</span>
          </div>
        </motion.div>
      </Section>

      {/* ─── 05 — القطاعات الأهم ────────────────────────── */}
      <Section className="bg-white py-16 sm:py-20">
        <div className="section-container">
          <div className="text-center mb-10 sm:mb-12">
            <span className="section-eyebrow">القطاعات</span>
            <h2 className="section-heading">القطاعات الأهم</h2>
            <p className="section-subtitle">القطاعات اللي فلوس الضرائب بتروح فيها</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              { id: 'health', figure: health.totalBudget, gdpFigure: health.percentageOfGDP, icon: HiOutlineHeart, iconBg: 'bg-red-50', iconText: 'text-red-600', label: 'الصحة', desc: 'الخدمات الصحية والمستشفيات والتأمين الصحي', extra: [
                { label: 'هيئة الشراء الموحد', figure: health.procurementAuthority },
                { label: 'العلاج على نفقة الدولة', figure: health.treatmentAtStateExpense },
                { label: 'الأدوية', figure: health.medicineAllocation },
                { label: 'المستلزمات الطبية', figure: health.medicalSupplies },
              ]},
              { id: 'education', figure: education.totalBudget, gdpFigure: education.percentageOfGDP, icon: HiOutlineUsers, iconBg: 'bg-primary-50', iconText: 'text-primary-600', label: 'التعليم', desc: 'التعليم العام والجامعي والبحث العلمي', extra: [
                { label: 'زيادة الموازنة', figure: education.increasePercentage, suffix: '%' },
                { label: 'الكتب الدراسية', figure: education.textbooks },
                { label: 'الوجبات المدرسية', figure: education.schoolMeals },
                { label: 'البحث العلمي', figure: education.research.totalBudget },
              ]},
              { id: 'social', figure: social.totalBudget, gdpFigure: null, icon: HiOutlineShieldCheck, iconBg: 'bg-violet-50', iconText: 'text-violet-600', label: 'الحماية الاجتماعية', desc: 'الدعم المباشر والتأمينات الاجتماعية', extra: [
                { label: 'دعم السلع التموينية', figure: social.foodCommodity },
                { label: 'دعم الكهرباء', figure: social.electricity },
                { label: 'تكافل وكرامة', figure: social.takafulKarama },
                { label: 'الحد الأدنى للأجور', figure: social.minimumWage, suffix: ' جنيه' },
              ]},
              { id: 'research', figure: education.research.totalBudget, gdpFigure: education.research.percentageOfGDP, icon: HiOutlineLightBulb, iconBg: 'bg-amber-50', iconText: 'text-amber-600', label: 'البحث العلمي', desc: 'البحث العلمي والتطوير', extra: [] },
              { id: 'investment', figure: infrastructure.totalInvestmentInclStock, gdpFigure: null, icon: HiOutlineOfficeBuilding, iconBg: 'bg-teal-50', iconText: 'text-teal-600', label: 'الاستثمار', desc: 'الاستثمارات الكلية متضمنة التغير في المخزون', extra: [
                { label: 'استثمارات خاصة', value: '2.2 تريليون جنيه' },
                { label: 'استثمارات عامة', value: '1.56 تريليون جنيه' },
              ]},
            ].map((sector, i) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-base overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${sector.iconBg}`}>
                      <sector.icon className={`w-5 h-5 ${sector.iconText}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-900">{sector.label}</h3>
                      <p className="text-xs text-primary-500 mt-0.5">{sector.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl sm:text-3xl font-bold text-primary-900">{sector.figure.value != null ? sector.figure.value.toLocaleString('ar-EG') : '—'}</span>
                    <span className="text-xs text-primary-500">مليار جنيه</span>
                  </div>
                  {sector.gdpFigure && (
                    <p className="text-xs text-primary-500">{sector.gdpFigure.value}% من الناتج المحلي</p>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <SourceBadge status={sector.figure.verificationStatus} />
                    <button onClick={() => openSource(sector.figure)} className="text-xs text-primary-500 hover:text-primary-700 hover:underline transition-colors">عرض المصدر</button>
                  </div>
                </div>
                {sector.extra.length > 0 && (
                  <div className="border-t border-primary-100/40 px-5 py-3 bg-surface-warm/50">
                    <button
                      onClick={() => setActiveSector(activeSector === sector.id ? null : sector.id)}
                      className="w-full flex items-center justify-between text-sm text-primary-500 hover:text-primary-700 transition-colors"
                    >
                      <span className="font-medium">تفاصيل أكتر</span>
                      <HiOutlineChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeSector === sector.id ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeSector === sector.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 space-y-2.5">
                            {sector.extra.map((ex) => (
                              <div key={ex.label} className="flex justify-between items-center text-sm">
                                <span className="text-primary-600">{ex.label}</span>
                                <span className="font-semibold text-primary-900">
                                  {ex.figure ? formatValue(ex.figure) : ex.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 bg-amber-50 border border-amber-200/60 rounded-xl p-4 max-w-2xl mx-auto text-center">
            <p className="text-sm text-amber-700">⚠ وردت نسبتان للزيادة في صفحات مختلفة من المصدر (30% تقريبية في صفحة 26، و39.6% دقيقة في صفحة 27)، لذلك يتم عرضهما منفصلتين حفاظًا على دقة المصدر.</p>
          </div>
        </div>
      </Section>

      {/* ─── 06 — الدين العام ───────────────────────────── */}
      <Section className="section-container py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <span className="section-eyebrow">الدين العام</span>
          <h2 className="section-heading">الدين بيتغير إزاي؟</h2>
          <p className="section-subtitle">نسبة الدين للناتج المحلي عبر الزمن</p>
        </div>

        <div className="card-base p-6 mb-6">
          <DebtTrendChart data={debtTrend} />
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 justify-center text-xs text-primary-500">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-900" />
              النسبة الفعلية للدين / الناتج المحلي
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-green" />
              هدف 2030 (70%)
            </span>
          </div>
          <p className="text-center text-xs text-amber-700 mt-3">⚠ نسب الدين 2018/19–2023/24 غير مدخلة — تتطلب التحقق البصري من صفحة 50</p>
        </div>

        <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-amber-700">⚠ تباين: النص يذكر 84.2% (يونيو 2026) والرسم البياني يظهر 82.4%. قد يكون بسبب تاريخ مرجعي مختلف.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { label: 'الدين الخارجي', value: '78.5 مليار دولار', figure: debt.externalDebt },
            { label: 'حصة الدين المحلي', value: '74%', figure: debt.localDebtShare },
            { label: 'متوسط أجل الدين المحلي', value: '3 سنوات', figure: debt.localAvgMaturityCurrent },
            { label: 'المستهدف', value: '4.5–5 سنوات', figure: debt.localAvgMaturityTarget },
            { label: 'الفوائد / الإيرادات', value: '60%', figure: debt.interestToRevenue },
            { label: 'خدمة الدين / المصروفات', value: '35% (مستهدف)', figure: debt.debtServiceToExpenditureTarget },
            { label: 'فوائد الدين', value: fmtT(debt.interestPayments.value), figure: debt.interestPayments },
            { label: 'عائد سند المواطن', value: '17.75%', figure: debt.citizenBondYield },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="card-interactive p-4"
              onClick={() => openSource(item.figure)}
            >
              <p className="text-xs text-primary-500 mb-1">{item.label}</p>
              <p className="text-base font-bold text-primary-900">{item.value}</p>
              <div className="mt-2">
                <SourceBadge status={item.figure?.verificationStatus} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-l from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200/40">
          <h3 className="font-bold text-primary-900 mb-4 flex items-center gap-2">
            <HiOutlineHeart className="w-5 h-5 text-accent-green" />
            مشروع حياة كريمة
          </h3>
          <p className="text-xs text-amber-700 mb-3">⚠ أرقام متعددة السنوات — ليست ميزانية سنة مالية واحدة</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'إجمالي المراحل الثلاث', value: '≈1.0 تريليون' },
              { label: 'المرحلة الأولى', value: '350 مليار' },
              { label: 'المنفذ من الأولى', value: '300.6 مليار (88%)' },
              { label: 'مخصص 2026/27 للثانية', value: '45 مليار' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-3.5" style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04)' }}>
                <p className="text-xs text-primary-500">{item.label}</p>
                <p className="text-sm font-bold text-primary-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── 07 — الاستثمار ─────────────────────────────── */}
      <Section className="bg-white py-16 sm:py-20">
        <div className="section-container">
          <div className="text-center mb-10 sm:mb-12">
            <span className="section-eyebrow">الاستثمار</span>
            <h2 className="section-heading">الاستثمار رايح فين؟</h2>
            <p className="section-subtitle">خطة الاستثمارات لعام المالية {FISCAL_YEAR}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-interactive p-6"
              onClick={() => openSource(infrastructure.totalInvestmentInclStock)}
            >
              <p className="text-xs text-primary-500 mb-1">جدول الافتراضات (صفحة 11)</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary-900">4.2 <span className="text-sm font-normal text-primary-500">تريليون جنيه</span></p>
              <p className="text-xs text-primary-500 mt-2">قيمة تقريبية</p>
              <div className="mt-2"><SourceBadge status={infrastructure.totalInvestmentInclStock.verificationStatus} /></div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-interactive p-6"
              onClick={() => openSource(infrastructure.totalInvestmentInclStock)}
            >
              <p className="text-xs text-primary-500 mb-1">ملحق الاستثمارات (صفحة 65)</p>
              <p className="text-2xl sm:text-3xl font-bold text-primary-900">4.17 <span className="text-sm font-normal text-primary-500">تريليون جنيه</span></p>
              <p className="text-xs text-primary-500 mt-2">شاملة التغير في المخزون</p>
              <div className="mt-2"><SourceBadge status={infrastructure.totalInvestmentInclStock.verificationStatus} /></div>
            </motion.div>
          </div>

          <div className="card-base p-6 mb-8">
            <h3 className="font-bold text-primary-900 mb-4">الاستثمارات الخاصة والعامة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl sm:text-3xl font-bold text-primary-700">2.2</span>
                  <span className="text-xs text-primary-600">تريليون — استثمارات خاصة</span>
                </div>
                <div className="w-full bg-primary-100/60 rounded-full h-2.5">
                  <div className="bg-primary-700 h-2.5 rounded-full transition-all duration-700" style={{ width: '58.5%' }} />
                </div>
                <p className="text-xs text-primary-500 mt-1.5">58.5% — نسبة محسوبة من القيم المطلقة (2.2/3.76)</p>
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl sm:text-3xl font-bold text-accent-green">1.56</span>
                  <span className="text-xs text-primary-600">تريليون — استثمارات عامة</span>
                </div>
                <div className="w-full bg-primary-100/60 rounded-full h-2.5">
                  <div className="bg-accent-green h-2.5 rounded-full transition-all duration-700" style={{ width: '41.5%' }} />
                </div>
                <p className="text-xs text-primary-500 mt-1.5">41.5% — نسبة محسوبة من القيم المطلقة (1.56/3.76)</p>
              </div>
            </div>
            <p className="text-xs text-amber-700 mt-3">⚠ تباين: صفحة 65 تذكر 58.8%/41.2% وصفحة 66 تذكر 58.5%/41.5%. النسب المحسوبة أعلاه من القيم المطلقة.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-base p-5 overflow-visible">
              <div className="mb-4">
                <h3 className="font-bold text-primary-900 text-sm">الاستثمارات حسب القطاع</h3>
                <p className="text-xs text-primary-500 mt-1">توزيع الاستثمارات على القطاعات الرئيسية خلال عام المالية {FISCAL_YEAR}</p>
              </div>
              <InvestmentChart data={investSectors} />
              <p className="text-xs text-primary-500 mt-3 leading-relaxed">القيم بالمليار جنيه · المصدر: ملحق الاستثمارات، صفحة 65</p>
            </div>
            <div className="card-base p-5 overflow-visible">
              <div className="mb-4">
                <h3 className="font-bold text-primary-900 text-sm">الاستثمارات العامة حسب الجهة</h3>
                <p className="text-xs text-primary-500 mt-1">توزيع الاستثمارات العامة على الجهات الحكومية</p>
              </div>
              <InvestmentChart data={investPublic} />
              <p className="text-xs text-primary-500 mt-3 leading-relaxed">القيم بالمليار جنيه · المصدر: ملحق الاستثمارات، صفحة 65</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 08 — الموازنة بتخصني إزاي؟ ─────────────────── */}
      <Section className="section-container py-16 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <span className="section-eyebrow">المواطن</span>
          <h2 className="section-heading">طيب... الكلام ده يخصني أنا إزاي؟</h2>
          <p className="section-subtitle">اختار هويتك واشوف الموازنة بتأثر عليك إزاي</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => setCitizenProfile(citizenProfile === p.id ? null : p.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl border transition-all duration-200 text-sm font-medium flex items-center gap-2.5 ${
                citizenProfile === p.id
                  ? 'border-primary-800 bg-primary-800 text-white'
                  : 'border-primary-200 bg-white text-primary-700 hover:border-primary-400 hover:bg-primary-50'
              }`}
            >
              <span className="text-base leading-none">{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selectedProfile && (
            <motion.div
              key={selectedProfile.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="card-base p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{selectedProfile.icon}</span>
                <h3 className="text-lg font-bold text-primary-900">{selectedProfile.label}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedProfile.figures.map((fig) => (
                  <div
                    key={fig.id}
                    className="bg-surface-warm rounded-xl p-4 cursor-pointer hover:bg-primary-50 transition-colors"
                    onClick={() => openSource(fig)}
                  >
                    <p className="text-xs text-primary-500 mb-1">{fig.label}</p>
                    <p className="text-lg font-bold text-primary-900">{formatValue(fig)}</p>
                    <div className="mt-2">
                      <SourceBadge status={fig.verificationStatus} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {/* ─── 09 — لو إنت مكان وزير المالية ──────────────── */}
      <Section className="relative py-14 sm:py-20" style={{ background: 'linear-gradient(180deg, #f5f5f4 0%, #ececea 100%)' }}>
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 0%, #bcccdc 0%, transparent 40%), radial-gradient(circle at 80% 100%, #d9e2ec 0%, transparent 40%)' }} />
        <div className="section-container relative">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-white/80 text-primary-700 rounded-full border border-primary-200/60 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
              تجربة تفاعلية
            </span>
            <h2 className="section-heading">لو معاك 100 جنيه من الموازنة...</h2>
            <p className="section-subtitle">هتوزعهم إزاي؟ جرّب بنفسك وشوف التوزيع الفعلي للمصروفات</p>
          </div>

          <div className="card-base border-primary-200/80" style={{ boxShadow: '0 10px 40px -8px rgb(16 42 67 / 0.12), 0 4px 12px -2px rgb(16 42 67 / 0.05)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-primary-100/40">
              {/* Sliders column */}
              <div className="lg:col-span-3 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-primary-800">اختار توزيعك</h3>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    remaining === 0 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' :
                    remaining > 0 ? 'bg-primary-50 text-primary-700 border border-primary-200/60' :
                    'bg-red-50 text-red-700 border border-red-200/60'
                  }`}>
                    {remaining === 0 ? '✓ تم التوزيع بالكامل' : remaining > 0 ? `متبقي ${remaining} جنيه` : `زيادة ${Math.abs(remaining)} جنيه`}
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    { key: 'interest', label: 'فوائد الدين', color: '#102a43' },
                    { key: 'subsidies', label: 'الدعم والحماية الاجتماعية', color: '#7c3aed' },
                    { key: 'wages', label: 'الأجور', color: '#059669' },
                    { key: 'investments', label: 'الاستثمارات', color: '#d97706' },
                    { key: 'goods', label: 'السلع والخدمات', color: '#dc2626' },
                    { key: 'other', label: 'أخرى', color: '#627d98' },
                  ].map((item) => (
                    <div key={item.key}>
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-sm font-medium text-primary-700">{item.label}</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-bold tabular-nums" style={{ color: item.color }}>{allocations[item.key]}</span>
                          <span className="text-xs text-primary-500">جنيه</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="60"
                        value={allocations[item.key]}
                        onChange={(e) => handleAllocation(item.key, e.target.value)}
                        className="input-range w-full"
                        style={{ background: `linear-gradient(to left, ${item.color} ${(allocations[item.key] / 60) * 100}%, #e5e7eb ${(allocations[item.key] / 60) * 100}%)` }}
                        aria-label={item.label}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison column */}
              <div className="lg:col-span-2 p-6 sm:p-8 bg-surface-warm/40">
                <h3 className="text-sm font-semibold text-primary-800 mb-1">مقارنة بالتوزيع الفعلي</h3>
                <p className="text-xs text-primary-500 mb-5">النسب الفعلية من التقرير</p>
                <div className="space-y-3.5">
                  {Object.entries(allocations).map(([key, val]) => {
                    const actual = actualPcts.find((a) => {
                      const map = { interest: 'فوائد الدين', subsidies: 'الدعم والحماية الاجتماعية', wages: 'الأجور', investments: 'الاستثمارات', goods: 'السلع والخدمات', other: 'أخرى' };
                      return a.label === map[key];
                    });
                    const actualVal = actual?.actual || 0;
                    return (
                      <div key={key} className="space-y-1.5">
                        <div className="flex justify-between items-baseline text-xs">
                          <span className="text-primary-700 font-medium">{key === 'interest' ? 'فوائد الدين' : key === 'subsidies' ? 'الدعم' : key === 'wages' ? 'الأجور' : key === 'investments' ? 'الاستثمارات' : key === 'goods' ? 'السلع' : 'أخرى'}</span>
                          <div className="flex items-center gap-1.5 tabular-nums">
                            <span className="font-bold text-primary-900">{val}</span>
                            <span className="text-primary-600 text-xs">توزيعك</span>
                            <span className="text-primary-400">·</span>
                            <span className="text-primary-600 font-medium">{actualVal}%</span>
                            <span className="text-primary-600 text-xs">فعلي</span>
                          </div>
                        </div>
                        <div className="relative h-2 bg-primary-100/60 rounded-full overflow-hidden">
                          <div className="absolute h-full opacity-25 rounded-full bg-primary-700" style={{ width: `${actualVal * 2}%` }} />
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${val * 2}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="absolute h-full rounded-full bg-primary-700"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-primary-500 mt-5 leading-relaxed">نسب محسوبة من التصنيف الاقتصادي للمصروفات في التقرير الرسمي</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── 11 — المصادر ────────────────────────────────── */}
      <Section id="sources" className="bg-white py-14 sm:py-20">
        <div className="section-container text-center">
          <span className="section-eyebrow">المصادر</span>
          <h2 className="section-heading mb-3">كل رقم له مصدر</h2>
          <p className="section-subtitle mb-8">جميع البيانات مأخوذة من ملف موازنة المواطن الرسمي</p>

          <div className="inline-flex flex-col items-center gap-4 bg-surface-warm/60 rounded-2xl p-6 sm:p-8 border border-primary-100/50 max-w-md mx-auto" style={{ boxShadow: '0 2px 8px -2px rgb(16 42 67 / 0.04)' }}>
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <HiOutlineDocumentText className="w-6 h-6 text-primary-700" />
            </div>
            <div>
              <h3 className="font-bold text-primary-900 text-sm">موازنة المواطن {FISCAL_YEAR}</h3>
              <p className="text-xs text-primary-500 mt-1">وزارة المالية المصرية · الإصدار الثالث عشر · 70 صفحة</p>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              <SourceBadge status={VERIFICATION.VERIFIED} showLabel />
              <SourceBadge status={VERIFICATION.UNVERIFIED} showLabel />
              <SourceBadge status={VERIFICATION.UNAVAILABLE} showLabel />
            </div>
            <p className="text-xs text-primary-500 leading-relaxed max-w-xs">النسب المحسوبة موضحة بوضوح · أي تباين في الأرقام يتم توضيحه من المصدر</p>
          </div>
        </div>
      </Section>

      {/* ─── Source Drawer ───────────────────────────────── */}
      <SourceDrawer figure={drawerFigure} onClose={() => setDrawerFigure(null)} />

      {/* ─── ChatBot ──────────────────────────────────────── */}
      <ChatBot />

      {/* Lightweight toast — no new dep, no redesign */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] max-w-[90vw]"
            role="status"
            aria-live="polite"
          >
            <div className="bg-primary-900 text-white text-sm px-4 py-3 rounded-xl border border-white/10 backdrop-blur-sm text-center leading-relaxed" style={{ boxShadow: '0 10px 30px -10px rgb(0 0 0 / 0.35)' }}>
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
