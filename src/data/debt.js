/**
 * Public Debt
 *
 * Debt stock, interest payments, and debt-to-GDP ratio.
 * Populated from the official Citizen Budget 2026/2027 PDF (Master Data Table).
 *
 * Source: موازنة المواطن 2026/2027 — الإصدار الثالث عشر
 * Publisher: وزارة المالية المصرية | sourceId: MOF_CB_2026_2027
 *
 * Ambiguity notes:
 *   - June 2026 narrative says 84.2%, chart p.10 may show 82.4%. Preserved as separate figures.
 *   - "دين أجهزة الموازنة" (78.1% target) ≠ "دين الحكومة العامة" (89.5% ceiling). Two different scopes.
 *   - Middle-year historical debt/GDP (2018/19–2023/24) NOT populated — requires visual re-verification of p.50 chart.
 */

import { createFigure, createDerivedFigure, UNITS, VERIFICATION } from "./schema";
import { FISCAL_YEAR, BUDGET_SOURCE_ID } from "./meta";


export const debt = {
  fiscalYear: FISCAL_YEAR,
  sourceId: BUDGET_SOURCE_ID,

  // ─── Current Debt/GDP ────────────────────────────────

  debtToGDPTarget: createFigure({
    id: "debt_gdp_target",
    label: "دين أجهزة الموازنة / الناتج المحلي (مستهدف يونيو 2027)",
    value: 78.1,
    unit: UNITS.PERCENT,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 10,
    note: "مذكور 3 مرات بشكل متسق في صفحات 10 و 12 و 53",
  }),

  debtToGDPJune2026: createFigure({
    id: "debt_gdp_2026_june",
    label: "دين أجهزة الموازنة / الناتج المحلي (يونيو 2026)",
    value: 84.2,
    unit: UNITS.PERCENT,
    fiscalYear: "2025/2026",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 53,
    note: "ملاحظة: الرسم البياني صفحة 10 قد يظهر 82.4% لنفس الفترة. قد يكون بسبب تاريخ مرجعي مختلف",
  }),

  debtToGDPJune2025: createFigure({
    id: "debt_gdp_2025_june",
    label: "دين أجهزة الموازنة / الناتج المحلي (يونيو 2025)",
    value: 82.5,
    unit: UNITS.PERCENT,
    fiscalYear: "2024/2025",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 53,
  }),

  debtToGDPDec2025: createFigure({
    id: "debt_gdp_2025_dec",
    label: "دين أجهزة الموازنة / الناتج المحلي (ديسمبر 2025)",
    value: 78,
    unit: UNITS.PERCENT,
    fiscalYear: "2025/2026",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 53,
    note: "Snapshot منتصف السنة المالية، ليس رقم نهاية السنة",
  }),

  debtToGDPJune2023: createFigure({
    id: "debt_gdp_2023_june",
    label: "دين أجهزة الموازنة / الناتج المحلي (يونيو 2023)",
    value: 96,
    unit: UNITS.PERCENT,
    fiscalYear: "2022/2023",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 53,
    note: "الخط الأساسي التاريخي المذكور في السرد",
  }),

  // ─── Projections ──────────────────────────────────────

  debtToGDP2028: createFigure({
    id: "debt_gdp_2028",
    label: "دين أجهزة الموازنة / الناتج المحلي (متوقع 2027/2028)",
    value: 75.2,
    unit: UNITS.PERCENT,
    fiscalYear: "2027/2028",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 10,
    note: "من الرسم البياني الخطي المكون من 5 أعمدة",
  }),

  debtToGDP2029: createFigure({
    id: "debt_gdp_2029",
    label: "دين أجهزة الموازنة / الناتج المحلي (متوقع 2028/2029)",
    value: 72.2,
    unit: UNITS.PERCENT,
    fiscalYear: "2028/2029",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 10,
  }),

  debtToGDP2030: createFigure({
    id: "debt_gdp_2030",
    label: "دين أجهزة الموازنة / الناتج المحلي (متوقع 2029/2030)",
    value: 69.9,
    unit: UNITS.PERCENT,
    fiscalYear: "2029/2030",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 10,
  }),

  debtToGDP2030Target: createFigure({
    id: "debt_gdp_2030_target",
    label: "دين أجهزة الموازنة / الناتج المحلي (هدف متوسط المدى 2030)",
    value: 70,
    unit: UNITS.PERCENT,
    fiscalYear: "2030",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 53,
    note: "هدف متوسط المدى وليس نقطة سنة مالية محددة",
  }),

  // ─── External Debt ────────────────────────────────────

  externalDebt: createFigure({
    id: "external_debt",
    label: "الدين الخارجي لأجهزة الموازنة",
    value: 78.5,
    unit: UNITS.USD_BILLION,
    fiscalYear: "2024/2025",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 50,
    note: "يونيو 2025. انخفاض نحو 4 مليار دولار خلال سنتين",
  }),

  externalDebtToGDP: createFigure({
    id: "external_debt_gdp_target",
    label: "الدين الخارجي / الناتج المحلي (مستهدف يونيو 2027)",
    value: 14.5,
    unit: UNITS.PERCENT,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 53,
    note: "قيمة تقريبية (~14.5%)",
  }),

  // ─── Local Debt ───────────────────────────────────────

  localDebtShare: createFigure({
    id: "local_debt_share",
    label: "الدين المحلي / إجمالي دين الموازنة",
    value: 74,
    unit: UNITS.PERCENT,
    fiscalYear: "2024/2025",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 51,
    note: "يونيو 2025",
  }),

  localAvgMaturityCurrent: createFigure({
    id: "local_avg_maturity_current",
    label: "متوسط عمر الدين المحلي (حالي)",
    value: 3,
    unit: UNITS.COUNT,
    fiscalYear: "2024/2025",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 51,
    note: "سنوات",
  }),

  localAvgMaturityTarget: createFigure({
    id: "local_avg_maturity_target",
    label: "متوسط عمر الدين المحلي (مستهدف 2028/2029)",
    value: 4.5,
    unit: UNITS.COUNT,
    fiscalYear: "2028/2029",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 51,
    note: "نطاق 4.5-5 سنوات. القيمة المذكورة 4.5 كحد أدنى",
  }),

  // ─── Interest Ratios ──────────────────────────────────

  interestToRevenue: createFigure({
    id: "interest_to_revenue",
    label: "نسبة الفوائد إلى الإيرادات العامة",
    value: 60,
    unit: UNITS.PERCENT,
    fiscalYear: "2025/2026",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 53,
    note: "مقابل 73% في السنوات السابقة (بلا سنة محددة)",
  }),

  debtServiceToExpenditureTarget: createFigure({
    id: "debt_service_to_expenditure_target",
    label: "فاتورة خدمة الدين / مصروفات الموازنة (مستهدف متوسط المدى)",
    value: 35,
    unit: UNITS.PERCENT,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 53,
    note: "لا توجد سنة محددة مرفقة",
  }),

  citizenBondYield: createFigure({
    id: "citizen_bond_yield",
    label: "عائد سند المواطن السنوي (صافي من الضرائب)",
    value: 17.75,
    unit: UNITS.PERCENT,
    fiscalYear: "2026",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 51,
    note: "جهاز أداء لمدة 18 شهر",
  }),

  // ─── Interest Payments (from economic classification) ─

  interestPayments: createFigure({
    id: "interest_payments",
    label: "الفوائد (التصنيف الاقتصادي)",
    value: 2419823,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 12,
    note: "القيمة بالمليون جنيه. مطابق لـ exp_interest",
  }),

  // ─── Hayah Karima ─────────────────────────────────────

  hayahKarimaTotal: createFigure({
    id: "hayah_karima_total",
    label: "إجمالي استثمارات حياة كريمة (3 مراحل)",
    value: 1000,
    unit: UNITS.BILLION_EGP,
    fiscalYear: "multi-year",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 23,
    note: "نحو 1.0 تريليون جنيه. برنامج ممتد وليس رقم سنة مالية واحدة",
  }),

  hayahKarimaPhase1: createFigure({
    id: "hayah_karima_phase1",
    label: "إجمالي استثمارات المرحلة الأولى",
    value: 350,
    unit: UNITS.BILLION_EGP,
    fiscalYear: "2021/22-2025/26",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 23,
    note: "تم إنفاق 300.6 مليار (%88)",
  }),

  hayahKarimaPhase2: createFigure({
    id: "hayah_karima_phase2",
    label: "إجمالي استثمارات المرحلة الثانية (مخطط)",
    value: 150,
    unit: UNITS.BILLION_EGP,
    fiscalYear: "2025/26-2027/28",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 24,
    note: "مخصص فعلي بموازنة 27/26 = 45 مليار جنيه. القيمة تقريبية",
  }),

  // ─── Historical (safe endpoints only) ─────────────────

  trends: [
    { year: "2022/2023", figure: createFigure({ id: "debt_gdp_2023", label: "نسبة الدين 2022/2023", value: 96, unit: UNITS.PERCENT, fiscalYear: "2022/2023", figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 53, note: "يونيو 2023" }) },
    { year: "2024/2025", figure: createFigure({ id: "debt_gdp_2025", label: "نسبة الدين 2024/2025", value: 82.5, unit: UNITS.PERCENT, fiscalYear: "2024/2025", figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 53, note: "يونيو 2025" }) },
    { year: "2025/2026", figure: createFigure({ id: "debt_gdp_2026", label: "نسبة الدين 2025/2026", value: 84.2, unit: UNITS.PERCENT, fiscalYear: "2025/2026", figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 53, note: "يونيو 2026. ملاحظة: الرسم البياني صفحة 10 قد يظهر 82.4%" }) },
    { year: "2026/2027", figure: createFigure({ id: "debt_gdp_2027", label: "نسبة الدين 2026/2027", value: 78.1, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 53, note: "هدف يونيو 2027" }) },
    { year: "2027/2028", figure: createFigure({ id: "debt_gdp_2028_proj", label: "نسبة الدين 2027/2028 (متوقع)", value: 75.2, unit: UNITS.PERCENT, fiscalYear: "2027/2028", figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 10 }) },
    { year: "2028/2029", figure: createFigure({ id: "debt_gdp_2029_proj", label: "نسبة الدين 2028/2029 (متوقع)", value: 72.2, unit: UNITS.PERCENT, fiscalYear: "2028/2029", figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 10 }) },
    { year: "2029/2030", figure: createFigure({ id: "debt_gdp_2030_proj", label: "نسبة الدين 2029/2030 (متوقع)", value: 69.9, unit: UNITS.PERCENT, fiscalYear: "2029/2030", figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 10 }) },
  ],
};
