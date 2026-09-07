/**
 * Economy Sector - Economic Indicators
 *
 * Key economic metrics from the official Citizen Budget 2026/2027 PDF.
 *
 * Source: موازنة المواطن 2026/2027 — الإصدار الثالث عشر
 * Publisher: وزارة المالية المصرية | sourceId: MOF_CB_2026_2027
 *
 * Investment shares:
 *   Page 65: private 58.8%, public 41.2%
 *   Page 66: private 58.5%, public 41.5%
 *   Discrepancy documented. Use absolute values as authoritative.
 */

import { createFigure, UNITS, VERIFICATION } from "../schema";
import { FISCAL_YEAR, BUDGET_SOURCE_ID } from "../meta";

const economy = {
  id: "economy",
  label: "الاقتصاد",
  icon: "TrendingUp",
  color: "#059669",

  indicators: {
    gdp: createFigure({ id: "econ_gdp", label: "الناتج المحلي الإجمالي (بسعر السوق)", value: 24.5, unit: UNITS.TRILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 11, note: "من جدول الافتراضات المالية" }),
    growthRate: createFigure({ id: "econ_growth", label: "معدل النمو المستهدف", value: 5.4, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 11, note: "مطابق للنمو الحقيقي صفحة 10" }),
    inflation: createFigure({ id: "econ_inflation", label: "معدل التضخم (المكمش)", value: 9.3, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 11, note: "مطابق لجدول الافتراضات صفحة 10" }),
    interestRate: createFigure({ id: "econ_interest_rate", label: "متوسط سعر الفائدة على الأذون والسندات", value: 18, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 10, note: "يظهر في كلا الجدولين" }),
    investmentRate: createFigure({ id: "econ_investment_rate", label: "معدل الاستثمار", value: 17, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 11 }),
    savingsRate: createFigure({ id: "econ_savings_rate", label: "معدل الادخار", value: 10.5, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 11 }),
    unemployment: createFigure({ id: "econ_unemployment", label: "معدل البطالة المستهدف", value: 6.2, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 11 }),
    exportGrowth: createFigure({ id: "econ_export_growth", label: "متوسط معدل النمو المستهدف للصادرات السلعية", value: 12.3, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 11 }),
    prioritySectorsShare: createFigure({ id: "econ_priority_sectors", label: "نصيب القطاعات ذات الأولوية من الناتج المحلي", value: 35.4, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 11, note: "زراعة-صناعة-اتصالات" }),
    gdpPerCapita: createFigure({ id: "econ_gdp_capita", label: "الناتج المحلي للفرد", value: null, unit: UNITS.EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "غير متوفر في الصفحات المقدمة" }),
    exchangeRate: createFigure({ id: "econ_exchange", label: "سعر الصرف", value: null, unit: UNITS.EGP_PER_USD, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "غير متوفر في الصفحات المقدمة" }),
    foreignReserves: createFigure({ id: "econ_reserves", label: "الاحتياطي من النقد الأجنبي", value: null, unit: UNITS.USD_BILLION, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "غير متوفر في الصفحات المقدمة" }),
    remittances: createFigure({ id: "econ_remittances", label: "التحويلات من الخارج", value: null, unit: UNITS.USD_BILLION, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "غير متوفر في الصفحات المقدمة" }),
  },

  investmentShares: {
    page65: {
      private: createFigure({ id: "invest_private_65", label: "الاستثمار الخاص (صفحة 65)", value: 58.8, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 65, note: "نسبة الاستثمار الخاص 58.8%" }),
      public: createFigure({ id: "invest_public_65", label: "الاستثمار العام (صفحة 65)", value: 41.2, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 65, note: "نسبة الاستثمار العام 41.2%" }),
    },
    page66: {
      private: createFigure({ id: "invest_private_66", label: "الاستثمار الخاص (صفحة 66)", value: 58.5, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 66, note: "58.5% — تباين مع صفحة 65 (58.8%)" }),
      public: createFigure({ id: "invest_public_66", label: "الاستثمار العام (صفحة 66)", value: 41.5, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 66, note: "41.5% — تباين مع صفحة 65 (41.2%)" }),
    },
    note: "هناك تباين بين صفحة 65 و66. القيم المطلقة (2.2T خاصة / 1.56T عامة) هي الأكثر رسمية",
  },

  trends: {
    gdpGrowth: [
      { year: "2022/2023", figure: createFigure({ id: "gdp_growth_22", label: "نمو 2022/2023", value: null, unit: UNITS.PERCENT, fiscalYear: "2022/2023", figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "بيانات تاريخية غير متوفرة في الصفحات المقدمة" }) },
      { year: "2023/2024", figure: createFigure({ id: "gdp_growth_23", label: "نمو 2023/2024", value: null, unit: UNITS.PERCENT, fiscalYear: "2023/2024", figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "بيانات تاريخية غير متوفرة" }) },
      { year: "2024/2025", figure: createFigure({ id: "gdp_growth_24", label: "نمو 2024/2025", value: null, unit: UNITS.PERCENT, fiscalYear: "2024/2025", figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "بيانات تاريخية غير متوفرة" }) },
      { year: "2025/2026", figure: createFigure({ id: "gdp_growth_25", label: "نمو 2025/2026", value: null, unit: UNITS.PERCENT, fiscalYear: "2025/2026", figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "بيانات تاريخية غير متوفرة" }) },
      { year: "2026/2027", figure: createFigure({ id: "gdp_growth_26", label: "نمو 2026/2027", value: 5.4, unit: UNITS.PERCENT, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 11 }) },
    ],
  },

  description: "المؤشرات الاقتصادية الرئيسية ودعم النمو والاستثمارات",
};

export default economy;
