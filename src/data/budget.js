/**
 * Budget Overview
 *
 * Top-level figures for the entire state budget.
 * Populated from the official Citizen Budget 2026/2027 PDF (Master Data Table).
 *
 * Source: موازنة المواطن 2026/2027 — الإصدار الثالث عشر، أغسطس 2026
 * Publisher: وزارة المالية المصرية | sourceId: MOF_CB_2026_2027
 * Unit: million EGP (M EGP) unless otherwise noted
 */

import { createFigure, createDerivedFigure, UNITS, VERIFICATION } from "./schema";
import { FISCAL_YEAR, BUDGET_SOURCE_ID } from "./meta";


// ─── Official Figures (directly from PDF, page 12) ──────

export const revenues = createFigure({
  id: "total_revenues",
  label: "إيرادات الدولة",
  value: 4056375,
  unit: UNITS.BILLION_EGP,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 12,
  note: "القيمة بالمليون جنيه. يُ rounded إلى 4.1 تريليون في صندوق صفحة 13",
});

export const expenditures = createFigure({
  id: "total_expenditures",
  label: "المصروفات الإجمالية",
  value: 5187975,
  unit: UNITS.BILLION_EGP,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 12,
  note: "القيمة بالمليون جنيه. يُ rounded إلى 5.2 تريليون في صندوق صفحة 13",
});

export const totalTaxes = createFigure({
  id: "total_taxes",
  label: "إجمالي الإيرادات الضريبية",
  value: 3529294,
  unit: UNITS.BILLION_EGP,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 12,
  note: "القيمة بالمليون جنيه. مطابق لـ 3.5 تريليون في صندوق صفحة 13",
});

export const cashBalance = createFigure({
  id: "cash_balance",
  label: "الميزان النقدي",
  value: -1131599,
  unit: UNITS.BILLION_EGP,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 12,
  note: "القيمة بالمليون جنيه. السالب = عجز",
});

export const netFinancialAssets = createFigure({
  id: "net_financial_assets",
  label: "صافي حيازة الأصول المالية",
  value: 71042,
  unit: UNITS.BILLION_EGP,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 12,
  note: "القيمة بالمليون جنيه",
});

export const overallBalance = createFigure({
  id: "overall_balance",
  label: "الميزان الكلي",
  value: -1202641,
  unit: UNITS.BILLION_EGP,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 12,
  note: "القيمة بالمليون جنيه",
});

export const primarySurplus = createFigure({
  id: "primary_surplus",
  label: "الفائض الأولي (الميزان الأولي)",
  value: 1217181,
  unit: UNITS.BILLION_EGP,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 12,
  note: "القيمة بالمليون جنيه. يُ rounded إلى 1.2 تريليون بنسبة 5% في صفحة 13",
});

export const gdp = createFigure({
  id: "gdp",
  label: "الناتج المحلي الإجمالي (بسعر السوق)",
  value: 24.5,
  unit: UNITS.TRILLION_EGP,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 11,
  note: "القيمة بالتريليون جنيه. من جدول الافتراضات المالية",
});

export const growthRate = createFigure({
  id: "growth_rate",
  label: "معدل النمو الاقتصادي المستهدف",
  value: 5.4,
  unit: UNITS.PERCENT,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 11,
  note: "مطابق لـ النمو الحقيقي في جدول الافتراضات صفحة 10",
});

export const inflationDeflator = createFigure({
  id: "inflation_deflator",
  label: "معدل التضخم (المكمش)",
  value: 9.3,
  unit: UNITS.PERCENT,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 11,
  note: "مطابق لـ 9.3% في جدول الافتراضات المالية صفحة 10",
});

export const interestRateAvg = createFigure({
  id: "interest_rate_avg",
  label: "متوسط سعر الفائدة على الأذون والسندات",
  value: 18,
  unit: UNITS.PERCENT,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 10,
  note: "يظهر بشكل متطابق في كلا الجدولين",
});

export const investmentRate = createFigure({
  id: "investment_rate",
  label: "معدل الاستثمار",
  value: 17,
  unit: UNITS.PERCENT,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 11,
});

export const savingsRate = createFigure({
  id: "savings_rate",
  label: "معدل الادخار",
  value: 10.5,
  unit: UNITS.PERCENT,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 11,
});

export const unemploymentTarget = createFigure({
  id: "unemployment_target",
  label: "معدل البطالة المستهدف",
  value: 6.2,
  unit: UNITS.PERCENT,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 11,
});

export const exportGrowthTarget = createFigure({
  id: "export_growth_target",
  label: "متوسط معدل النمو المستهدف للصادرات السلعية",
  value: 12.3,
  unit: UNITS.PERCENT,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 11,
});

export const prioritySectorsGdpShare = createFigure({
  id: "priority_sectors_gdp_share",
  label: "نصيب القطاعات ذات الأولوية من الناتج المحلي",
  value: 35.4,
  unit: UNITS.PERCENT,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 11,
  note: "زراعة-صناعة-اتصالات",
});

export const totalInvestmentTarget = createFigure({
  id: "total_investment_target",
  label: "حجم الاستثمارات الكلية المستهدفة بالخطة",
  value: 4.2,
  unit: UNITS.TRILLION_EGP,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 11,
  note: "ملاحظة: هذا تقريبي. الملحق يذكر 4.17 تريليون. انظر الغموض #3",
});

// Government General (broader consolidation)
export const govGeneralRevenues = createFigure({
  id: "gov_general_revenues",
  label: "جملة إيرادات الحكومة العامة",
  value: 8300,
  unit: UNITS.BILLION_EGP,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 13,
  note: "القيمة بالتريليون جنيه (8.3). من منظور الحكومة العامة — تكامل أوسع من جوهر الموازنة",
});

export const govGeneralExpenditures = createFigure({
  id: "gov_general_expenditures",
  label: "جملة مصروفات الحكومة العامة",
  value: 9700,
  unit: UNITS.BILLION_EGP,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 13,
  note: "القيمة بالتريليون جنيه (9.7). من منظور الحكومة العامة",
});

export const govGeneralDebtCeiling = createFigure({
  id: "gov_general_debt_ceiling",
  label: "سقف دين الحكومة العامة / الناتج المحلي",
  value: 89.5,
  unit: UNITS.PERCENT,
  fiscalYear: FISCAL_YEAR,
  figureType: "official",
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 13,
  note: "ملاحظة: هذا نطاق مختلف عن 'دين أجهزة الموازنة' (78.1%) — لا تخلط بينهما",
});


// ─── Derived Figures ─────────────────────────────────────

export const deficit = createDerivedFigure({
  id: "budget_deficit",
  label: "العجز",
  value: -1131599,
  unit: UNITS.BILLION_EGP,
  fiscalYear: FISCAL_YEAR,
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 12,
  derivedFrom: ["total_revenues", "total_expenditures"],
  formula: "cash_balance = -1,131,599 M EGP (official PDF figure)",
  note: "العجز كما ورد صراحةً في ملف المواzنة. القيمة بالمليون جنيه",
});

export const deficitToGdp = createDerivedFigure({
  id: "deficit_to_gdp",
  label: "نسبة العجز للناتج المحلي",
  value: -4.6,
  unit: UNITS.PERCENT,
  fiscalYear: FISCAL_YEAR,
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 12,
  derivedFrom: ["cash_balance", "gdp"],
  formula: "cash_balance / gdp × 100",
});

export const overallBalanceToGdp = createDerivedFigure({
  id: "overall_balance_to_gdp",
  label: "نسبة الميزان الكلي للناتج المحلي",
  value: -4.9,
  unit: UNITS.PERCENT,
  fiscalYear: FISCAL_YEAR,
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 12,
  derivedFrom: ["overall_balance", "gdp"],
  formula: "overall_balance / gdp × 100",
  note: "مطابق لـ 4.9% في السرد صفحة 13",
});

export const surplusToGdp = createDerivedFigure({
  id: "surplus_to_gdp",
  label: "نسبة الفائض الأولي للناتج المحلي",
  value: 5.0,
  unit: UNITS.PERCENT,
  fiscalYear: FISCAL_YEAR,
  verificationStatus: VERIFICATION.VERIFIED,
  sourceId: BUDGET_SOURCE_ID,
  page: 12,
  derivedFrom: ["primary_surplus", "gdp"],
  formula: "primary_surplus / gdp × 100",
  note: "مطابق لـ الرسم البياني صفحة 10",
});


// ─── Budget Overview Object (backward-compatible shape) ──

export const budgetOverview = {
  fiscalYear: FISCAL_YEAR,
  revenues,
  expenditures,
  primarySurplus,
  gdp,
  growthRate,
  deficit,
  deficitToGdp,
  surplusToGdp,
};

// Backward-compat aliases for Dashboard.jsx
Object.defineProperty(revenues, "change", {
  get() { return null; },
  configurable: true,
});
Object.defineProperty(expenditures, "change", {
  get() { return null; },
  configurable: true,
});
Object.defineProperty(primarySurplus, "percentage", {
  get() { return 5.0; },
  configurable: true,
});
Object.defineProperty(gdp, "growthRate", {
  get() { return growthRate.value; },
  configurable: true,
});


// ─── Highlights (non-financial metadata for UI) ──────────

export const budgetHighlights = [
  {
    id: "highlight_growth",
    figureId: "growth_rate",
    icon: "TrendingUp",
    color: "green",
    description: "نسبة نمو الناتج المحلي المتوقعة",
  },
  {
    id: "highlight_revenue",
    figureId: "total_revenues",
    icon: "Banknotes",
    color: "blue",
    description: "إجمالي إيرادات الدولة",
  },
  {
    id: "highlight_surplus",
    figureId: "primary_surplus",
    icon: "ArrowTrendingUp",
    color: "purple",
    description: "الفائض الأولي بعد خصم المصروفات الجارية",
  },
];
