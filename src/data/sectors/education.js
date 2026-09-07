/**
 * Education Sector
 *
 * Budget breakdown for education + scientific research.
 * Populated from the official Citizen Budget 2026/2027 PDF (Master Data Table).
 *
 * Source: موازنة المواطن 2026/2027 — الإصدار الثالث عشر
 * Publisher: وزارة المالية المصرية | sourceId: MOF_CB_2026_2027
 */

import { createFigure, UNITS, VERIFICATION } from "../schema";
import { FISCAL_YEAR, BUDGET_SOURCE_ID } from "../meta";

const education = {
  id: "education",
  label: "التعليم",
  icon: "GraduationCap",
  color: "#2563EB",

  totalBudget: createFigure({
    id: "education_total",
    label: "مخصصات قطاع التعليم",
    value: 1229.7,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 26,
    note: "بالمليار جنيه. الحد الأدنى القانوني 4% تعليم قبل جامعي + 2% تعليم جامعي (تذييل صفحة 26)",
  }),

  percentageOfGDP: createFigure({
    id: "education_gdp_pct",
    label: "نسبة التعليم من الناتج المحلي",
    value: 6,
    unit: UNITS.PERCENT,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 26,
    note: "تعليم قبل جامعي + تعليم جامعي معاً",
  }),

  increasePercentage: createFigure({
    id: "education_budget_increase_pct",
    label: "نسبة الزيادة في ميزانية التعليم",
    value: 20,
    unit: UNITS.PERCENT,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 26,
    note: "مقابل 13% نمو عام في المصروفات",
  }),

  textbooks: createFigure({
    id: "education_textbooks",
    label: "مخصصات طباعة الكتب المدرسية",
    value: 7.8,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 26,
    note: "تعليم قبل جامعي",
  }),

  schoolMeals: createFigure({
    id: "education_school_meals",
    label: "مخصصات التغذية المدرسية",
    value: 7,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 26,
  }),

  // ─── Scientific Research (separate sector) ────────────

  research: {
    totalBudget: createFigure({
      id: "research_total",
      label: "مخصصات البحث العلمي",
      value: 205.2,
      unit: UNITS.BILLION_EGP,
      fiscalYear: FISCAL_YEAR,
      figureType: "official",
      verificationStatus: VERIFICATION.VERIFIED,
      sourceId: BUDGET_SOURCE_ID,
      page: 26,
      note: "بالمليار جنيه",
    }),

    percentageOfGDP: createFigure({
      id: "research_gdp_pct",
      label: "نسبة البحث العلمي من الناتج المحلي",
      value: 1,
      unit: UNITS.PERCENT,
      fiscalYear: FISCAL_YEAR,
      figureType: "official",
      verificationStatus: VERIFICATION.VERIFIED,
      sourceId: BUDGET_SOURCE_ID,
      page: 26,
      note: "مطابق للحد الدستوري 1% بالضبط",
    }),
  },

  subcategories: [
    { id: "pre_university", label: "التعليم قبل الجامعي", figure: createFigure({ id: "edu_pre_uni", label: "التعليم قبل الجامعي", value: null, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل التعليم غير متوفر في الصفحات المقدمة" }) },
    { id: "university", label: "التعليم الجامعي", figure: createFigure({ id: "edu_uni", label: "التعليم الجامعي", value: null, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل التعليم غير متوفر" }) },
    { id: "vocational", label: "التدريب المهني", figure: createFigure({ id: "edu_vocational", label: "التدريب المهني", value: null, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل التدريب المهني غير متوفر" }) },
  ],

  description: "التعليم العام والجامعي والبحث العلمي والتدريب المهني",
};

export default education;
