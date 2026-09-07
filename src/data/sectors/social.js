/**
 * Social Protection Sector
 *
 * Detailed breakdown of social support, subsidies, and wages.
 * Populated from the official Citizen Budget 2026/2027 PDF (Master Data Table).
 *
 * Source: موازنة المواطن 2026/2027 — الإصدار الثالث عشر
 * Publisher: وزارة المالية المصرية | sourceId: MOF_CB_2026_2027
 * Pages: 19-25
 */

import { createFigure, UNITS, VERIFICATION } from "../schema";
import { FISCAL_YEAR, BUDGET_SOURCE_ID } from "../meta";

const social = {
  id: "social",
  label: "الحماية الاجتماعية",
  icon: "Shield",
  color: "#7C3AED",

  totalBudget: createFigure({
    id: "social_total",
    label: "إجمالي الدعم والمنح والمزايا الاجتماعية",
    value: 836.8,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 20,
    note: "بالمليار جنيه. مطابق لـ exp_subsidies_social",
  }),

  growthRate: createFigure({
    id: "social_growth_pct",
    label: "معدل النمو السنوي للدعم الاجتماعي",
    value: 12.7,
    unit: UNITS.PERCENT,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 20,
  }),

  // ─── Individual Subsidy Line Items ────────────────────

  electricity: createFigure({
    id: "electricity_subsidy",
    label: "دعم الكهرباء",
    value: 104.2,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 20,
    note: "+39% سنوياً",
  }),

  foodCommodity: createFigure({
    id: "food_commodity_subsidy",
    label: "دعم السلع التموينية",
    value: 178.3,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 20,
    note: "+11.4% سنوياً. أكثر من 60 مليون مستفيد",
  }),

  wheatPurchase: createFigure({
    id: "wheat_purchase_subsidy",
    label: "دعم شراء القمح المحلي",
    value: 69.1,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 20,
    note: "سعر توريد الأردب رفع إلى 2500 جنيه",
  }),

  housing: createFigure({
    id: "housing_subsidy",
    label: "دعم الإسكان لمحدودي الدخل",
    value: 13,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 20,
  }),

  urbanDevelopmentFund: createFigure({
    id: "urban_development_fund",
    label: "صندوق التنمية الحضرية",
    value: 4.6,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 20,
  }),

  water: createFigure({
    id: "water_subsidy",
    label: "مخصصات دعم المياه",
    value: 5,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 20,
    note: "مقابل 2 مليار العام السابق (+150%)",
  }),

  foodAllocationMinistries: createFigure({
    id: "food_allocation_ministries",
    label: "مخصصات الأغذية بالوزارات",
    value: 19.2,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 20,
    note: "مقابل 16.8 مليار (+14.7%)",
  }),

  transport: createFigure({
    id: "transport_subsidy",
    label: "مخصصات النقل والانتقالات العامة",
    value: 9.9,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 21,
    note: "مقابل 8.1 مليار (+23.8%)",
  }),

  lighting: createFigure({
    id: "lighting_allocation",
    label: "مخصصات الإنارة",
    value: 16.9,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 21,
    note: "مقابل 14.4 مليار (+17.2%)",
  }),

  railway: createFigure({
    id: "railway_subsidy",
    label: "دعم السكة الحديد",
    value: 5.2,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 21,
  }),

  energyEfficiency: createFigure({
    id: "energy_efficiency_allocation",
    label: "رفع كفاءة قطاع الطاقة",
    value: 120,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 21,
  }),

  takafulKarama: createFigure({
    id: "takaful_karama_amount",
    label: "برنامج تكافل وكرامة وتكافؤ الفرص",
    value: 55.2,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 21,
  }),

  takafulKaramaFamilies: createFigure({
    id: "takaful_karama_families",
    label: "عدد الأسر المستفيدة من تكافل وكرامة",
    value: 4.7,
    unit: UNITS.COUNT,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 21,
    note: "مليون أسرة",
  }),

  // ─── Wages ────────────────────────────────────────────

  wagesTotal: createFigure({
    id: "wages_total_allocation",
    label: "الأجور وتعويضات العاملين",
    value: 822.8,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 19,
    note: "بالمليار جنيه. مطابق لـ exp_wages. 3.4% من الناتج المحلي",
  }),

  wagesGrowth: createFigure({
    id: "wages_growth_pct",
    label: "معدل نمو الأجور السنوي",
    value: 21.2,
    unit: UNITS.PERCENT,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 19,
    note: "الأعلى منذ 10 سنوات",
  }),

  minimumWage: createFigure({
    id: "min_wage_new",
    label: "الحد الأدنى الجديد للأجور",
    value: 8000,
    unit: UNITS.EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 19,
    note: "بدءاً من يوليو 2026",
  }),

  // ─── Ramadan Package ──────────────────────────────────

  ramadanPackage: createFigure({
    id: "ramadan_package_total",
    label: "حزمة الحماية الاجتماعية رمضان 2026",
    value: 40.3,
    unit: UNITS.BILLION_EGP,
    fiscalYear: "2026",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 25,
    note: "أعلنت فبراير 2026",
  }),

  subcategories: [
    { id: "subsidies", label: "الدعم المباشر", figure: createFigure({ id: "social_subsidies", label: "الدعم المباشر", value: null, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "التفصيل غير متوفر بشكل منفصل عن البنود أعلاه" }) },
    { id: "pensions", label: "المعاشات", figure: createFigure({ id: "social_pensions", label: "المعاشات", value: null, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل المعاشات غير متوفر في الصفحات المقدمة" }) },
    { id: "social_insurance", label: "التأمينات الاجتماعية", figure: createFigure({ id: "social_insurance", label: "التأمينات الاجتماعية", value: null, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل التأمينات غير متوفر" }) },
  ],

  programs: [
    { id: "takaful", label: "برنامج التضامن الاجتماعي" },
    { id: "supplements", label: "مكملات الدعم" },
    { id: "pensions_program", label: "معاشات التأمينات" },
  ],

  description: "الدعم المباشر والتأمينات الاجتماعية والمعاشات",
};

export default social;
