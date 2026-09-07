/**
 * Health Sector
 *
 * Budget breakdown for health.
 * Populated from the official Citizen Budget 2026/2027 PDF (Master Data Table).
 *
 * Source: موازنة المواطن 2026/2027 — الإصدار الثالث عشر
 * Publisher: وزارة المالية المصرية | sourceId: MOF_CB_2026_2027
 *
 * Ambiguity: p.26 headline says "~30% زيادة" while p.27 detail says 244.9B / 39.6%.
 * Different baselines. Both preserved as separate verified rows.
 */

import { createFigure, UNITS, VERIFICATION } from "../schema";
import { FISCAL_YEAR, BUDGET_SOURCE_ID } from "../meta";

const health = {
  id: "health",
  label: "الصحة",
  icon: "HeartPulse",
  color: "#DC2626",

  totalBudget: createFigure({
    id: "health_total",
    label: "مخصصات قطاع الصحة",
    value: 862.9,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 26,
    note: "بالمليار جنيه",
  }),

  percentageOfGDP: createFigure({
    id: "health_gdp_pct",
    label: "نسبة الصحة من الناتج المحلي",
    value: 4.2,
    unit: UNITS.PERCENT,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 26,
    note: 'استحقاق دستوري — الحد الأدنى القانوني 3% (تذييل صفحة 26)',
  }),

  increaseApprox: createFigure({
    id: "health_increase_approx",
    label: "الزيادة التقديرية في ميزانية الصحة",
    value: 30,
    unit: UNITS.PERCENT,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 26,
    note: "infographic headline. ملاحظة: هذه قيمة تقريبية تستخدم أساساً مختلفاً عن القيمة الدقيقة 39.6%",
  }),

  increaseAbsolute: createFigure({
    id: "health_increase_absolute",
    label: "الزيادة المطلقة عن العام السابق",
    value: 244.9,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 27,
    note: "بالمليار جنيه",
  }),

  increasePercentage: createFigure({
    id: "health_increase_pct",
    label: "نسبة الزيادة عن العام السابق",
    value: 39.6,
    unit: UNITS.PERCENT,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 27,
    note: "القيمة الدقيقة. ملاحظة: تختلف عن 30% في صفحة 26 بسبب أساس مختلف",
  }),

  insuranceSupportTotal: createFigure({
    id: "health_insurance_support_total",
    label: "دعم برامج التأمين الصحي الشامل (إجمالي)",
    value: 16.6,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 27,
  }),

  insuranceUninsuredSupport: createFigure({
    id: "health_insurance_uninsured_support",
    label: "دعم التأمين الصحي الشامل لغير القادرين",
    value: 15.7,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 27,
    note: "+215.8% سنوياً",
  }),

  procurementAuthority: createFigure({
    id: "health_procurement_authority",
    label: "مخصصات هيئة الشراء الموحد (أدوية ومستلزمات)",
    value: 90.5,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 26,
    note: "+25% سنوياً",
  }),

  treatmentAtStateExpense: createFigure({
    id: "health_treatment_at_state_expense",
    label: "العلاج على نفقة الدولة والتأمين الصحي",
    value: 47.5,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 26,
    note: "+69% سنوياً",
  }),

  medicineAllocation: createFigure({
    id: "health_medicine_allocation",
    label: "مخصصات الأدوية",
    value: 33.3,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 20,
    note: "مقابل 22.0 مليار العام السابق (+51.7%)",
  }),

  medicalSupplies: createFigure({
    id: "health_medical_supplies",
    label: "المستلزمات الطبية",
    value: 15.9,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 21,
    note: "مقابل 11 مليار العام السابق (+44.5%)",
  }),

  subcategories: [
    { id: "hospitals", label: "المستشفيات والمراكز الصحية", figure: createFigure({ id: "health_hospitals", label: "المستشفيات", value: null, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل المستشفيات غير متوفر في الصفحات المقدمة" }) },
    { id: "insurance", label: "التأمين الصحي الشامل", figure: createFigure({ id: "health_insurance", label: "التأمين الصحي", value: null, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل التأمين الصحي غير متوفر بشكل منفصل" }) },
    { id: "prevention", label: "الوقاية والعلاج", figure: createFigure({ id: "health_prevention", label: "الوقاية", value: null, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل الوقاية غير متوفر" }) },
  ],

  description: "الخدمات الصحية والمستشفيات والتأمين الصحي",
};

export default health;
