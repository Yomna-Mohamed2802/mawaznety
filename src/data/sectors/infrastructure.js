/**
 * Infrastructure / Investment Sector
 *
 * Investment plan appendix and infrastructure data.
 * Populated from the official Citizen Budget 2026/2027 PDF (Master Data Table).
 *
 * Source: موازنة المواطن 2026/2027 — الإصدار الثالث عشر
 * Publisher: وزارة المالية المصرية | sourceId: MOF_CB_2026_2027
 * Pages: 65-69 (sourced to Ministry of Planning)
 *
 * Ambiguity: p.11 says 4.2T (rounded), p.65 says 4.17T (including stock change).
 * Both preserved as separate verified figures.
 */

import { createFigure, UNITS, VERIFICATION } from "../schema";
import { FISCAL_YEAR, BUDGET_SOURCE_ID } from "../meta";

const infrastructure = {
  id: "infrastructure",
  label: "البنية التحتية والاستثمارات",
  icon: "Building",
  color: "#D97706",

  // ─── Total Investment Figures ──────────────────────────

  totalInvestmentInclStock: createFigure({
    id: "investment_total_incl_stock",
    label: "الاستثمارات الكلية شاملة التغير في المخزون",
    value: 4.17,
    unit: UNITS.TRILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 65,
    note: "ملاحظة: جدول الافتراضات صفحة 11 يذكر 4.2 تريليون (تقريبي).อาจ be from different drafts",
  }),

  totalInvestmentExclStock: createFigure({
    id: "investment_total_excl_stock",
    label: "الاستثمارات الكلية غير شاملة التغير في المخزون",
    value: 3.76,
    unit: UNITS.TRILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 66,
  }),

  investmentTargetMacro: createFigure({
    id: "investment_target_macro",
    label: "الاستثمارات الكلية المستهدفة (جدول الافتراضات)",
    value: 4.2,
    unit: UNITS.TRILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 11,
    note: "قيمة تقريبية من جدول الافتراضات المالية. الملحق يذكر 4.17",
  }),

  // ─── Private vs Public Split ──────────────────────────

  privateInvestment: createFigure({
    id: "investment_private",
    label: "استثمارات خاصة",
    value: 2.2,
    unit: UNITS.TRILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 65,
    note: ".Urlboth 58.8% (p.65) و 58.5% (p.66) — التباين في النسب وليس في القيم المطلقة",
  }),

  publicInvestment: createFigure({
    id: "investment_public",
    label: "استثمارات عامة",
    value: 1.56,
    unit: UNITS.TRILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 65,
    note: " reported as both 41.2% (p.65) and 41.5% (p.66)",
  }),

  publicInvestmentCeiling: createFigure({
    id: "investment_public_ceiling",
    label: "سقف الاستثمارات العامة",
    value: 1.56,
    unit: UNITS.TRILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 65,
    note: "نفس قيمة investment_public",
  }),

  // ─── Investment Rates ─────────────────────────────────

  investmentRate2027: createFigure({
    id: "investment_rate_2027",
    label: "معدل الاستثمار / الناتج المحلي 2026/2027",
    value: 17,
    unit: UNITS.PERCENT,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 65,
    note: "مطابق لـ investment_rate في جدول الافتراضات",
  }),

  investmentRate2026: createFigure({
    id: "investment_rate_2026",
    label: "معدل الاستثمار / الناتج المحلي 2025/2026",
    value: 14.5,
    unit: UNITS.PERCENT,
    fiscalYear: "2025/2026",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 65,
  }),

  investmentRate2025: createFigure({
    id: "investment_rate_2025",
    label: "معدل الاستثمار / الناتج المحلي 2024/2025",
    value: 12.9,
    unit: UNITS.PERCENT,
    fiscalYear: "2024/2025",
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 65,
  }),

  // ─── Public Investment Breakdown ──────────────────────

  govApparatus: createFigure({
    id: "investment_gov_apparatus",
    label: "الاستثمارات الحكومية (الجهاز الإداري للدولة)",
    value: 553.7,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 66,
    note: "14.6% من إجمالي استثمارات الخطة. مطابق لـ exp_investments",
  }),

  publicBusinessSector: createFigure({
    id: "investment_public_business_sector",
    label: "استثمارات قطاع الأعمال العام",
    value: 262.9,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 66,
    note: "16.9% من الاستثمارات العامة",
  }),

  economicAuthorities: createFigure({
    id: "investment_economic_authorities",
    label: "استثمارات الهيئات الاقتصادية العامة",
    value: 743.4,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 66,
    note: "47.7% من الاستثمارات العامة",
  }),

  localAdmin: createFigure({
    id: "investment_local_admin",
    label: "الاستثمارات الموجهة للإدارة المحلية",
    value: 37.4,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 66,
    note: "7% من إجمالي الاستثمارات",
  }),

  localDevGovernorates: createFigure({
    id: "investment_local_dev_governorates",
    label: "الاستثمارات المخصصة للتنمية المحلية للمحافظات",
    value: 35.3,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 65,
  }),

  // ─── Sectoral Investment ──────────────────────────────

  manufacturingSector: createFigure({
    id: "investment_manufacturing_sector",
    label: "استثمارات قطاع الصناعات التحويلية",
    value: 281.3,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 68,
  }),

  transportSector: createFigure({
    id: "investment_transport_sector",
    label: "استثمارات قطاع النقل",
    value: 640.1,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 68,
  }),

  agricultureSector: createFigure({
    id: "investment_agriculture_sector",
    label: "استثمارات قطاع الزراعة والري والصيد",
    value: 173.2,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: 69,
  }),

  subcategories: [
    { id: "roads", label: "الطرق والجسور", figure: createFigure({ id: "infra_roads", label: "الطرق", value: null, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل الطرق غير متوفر في الصفحات المقدمة" }) },
    { id: "mega_projects", label: "المشاريع القومية", figure: createFigure({ id: "infra_mega", label: "المشاريع القومية", value: null, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل المشاريع القومية غير متوفر" }) },
  ],

  megaProjects: [
    "العاصمة الإدارية الجديدة",
    "تطوير قناة السويس",
    "مشروع الطرق القومية",
  ],

  description: "المشاريع الحيوية والطرق والجسور والمواصلات والاستثمارات",
};

export default infrastructure;
