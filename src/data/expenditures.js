/**
 * Expenditure Categories
 *
 * Breakdown of state spending by economic classification.
 * Populated from the official Citizen Budget 2026/2027 PDF.
 *
 * Source: موازنة المواطن 2026/2027 (budget_pdf)
 * Unit: million EGP (M EGP)
 *
 * The PDF provides the ECONOMIC classification (wages, goods, interest, etc.).
 * The FUNCTIONAL classification (education, health, defense, etc.) is NOT
 * explicitly broken down in the provided PDF pages.
 *
 * Note: Component sum = 5,187,974M vs official total = 5,187,975M (1M rounding).
 */

import { createFigure, UNITS, VERIFICATION } from "./schema";
import { FISCAL_YEAR, BUDGET_SOURCE_ID } from "./meta";


export const expenditures = {
  fiscalYear: FISCAL_YEAR,
  sourceId: BUDGET_SOURCE_ID,

  total: createFigure({
    id: "expenditures_total",
    label: "المصروفات الإجمالية",
    value: 5187975,
    unit: UNITS.BILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: null,
    note: "القيمة بالمليون جنيه. الإجمالي كما ورد في التصنيف الاقتصادي للمصروفات",
  }),

  categories: [
    {
      id: "exp_cat_interest",
      label: "فوائد الدين",
      description: "مدفوعات فوائد الدين العام",
      icon: "CreditCard",
      color: "#1E3A8A",
      figure: createFigure({ id: "exp_interest", label: "فوائد الدين", value: 2419823, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 12, note: "القيمة بالمليون جنيه. فوائد الدين كما وردت في التصنيف الاقتصادي" }),
      children: [],
    },
    {
      id: "subsidies_social",
      label: "الدعم والتعيين الاجتماعي",
      description: "الدعم المباشر والتأمينات الاجتماعية والمعاشات",
      icon: "Shield",
      color: "#7C3AED",
      figure: createFigure({ id: "exp_subsidies", label: "الدعم والتعيين الاجتماعي", value: 836826, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 12, note: "القيمة بالمليون جنيه. الدعم والتعيين الاجتماعي كما ورد في التصنيف الاقتصادي" }),
      children: [],
    },
    {
      id: "wages",
      label: "الأجور والرواتب",
      description: "رواتب الموظفين والأجور في القطاع العام",
      icon: "Users",
      color: "#059669",
      figure: createFigure({ id: "exp_wages", label: "الأجور والرواتب", value: 822781, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 12, note: "القيمة بالمليون جنيه. الأجور والرواتب كما وردت في التصنيف الاقتصادي" }),
      children: [],
    },
    {
      id: "investments",
      label: "الاستثمارات",
      description: "المشاريع القومية والبنية التحتية",
      icon: "Building",
      color: "#D97706",
      figure: createFigure({ id: "exp_investments", label: "الاستثمارات", value: 553693, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 12, note: "القيمة بالمليون جنيه. الاستثمارات كما وردت في التصنيف الاقتصادي" }),
      children: [],
    },
    {
      id: "goods_services",
      label: "السلع والخدمات",
      description: "مشتريات السلع والخدمات المختلفة",
      icon: "ShoppingCart",
      color: "#DC2626",
      figure: createFigure({ id: "exp_goods", label: "السلع والخدمات", value: 293719, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 12, note: "القيمة بالمليون جنيه. السلع والخدمات كما وردت في التصنيف الاقتصادي" }),
      children: [],
    },
    {
      id: "other",
      label: "أخرى",
      description: "الدفاع والأمن والعمليات الأخرى",
      icon: "MoreHorizontal",
      color: "#6B7280",
      figure: createFigure({ id: "exp_other", label: "أخرى", value: 261132, unit: UNITS.BILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: 12, note: "القيمة بالمليون جنيه. بنود أخرى كما وردت في التصنيف الاقتصادي" }),
      children: [],
    },
  ],
};

export const expenditureTrends = {
  sourceId: BUDGET_SOURCE_ID,
  data: [
    { year: "2022/2023", social: null, economic: null, defense: null, general: null, debt: null },
    { year: "2023/2024", social: null, economic: null, defense: null, general: null, debt: null },
    { year: "2024/2025", social: null, economic: null, defense: null, general: null, debt: null },
    { year: "2025/2026", social: null, economic: null, defense: null, general: null, debt: null },
    { year: "2026/2027", social: null, economic: null, defense: null, general: null, debt: null },
  ],
};
