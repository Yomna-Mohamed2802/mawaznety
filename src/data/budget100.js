/**
 * Budget 100 - Where does 1 EGP of tax money go?
 *
 * Based on the official economic expenditure classification:
 *   Wages: 822,781M | Goods & Services: 293,719M | Interest: 2,419,823M
 *   Subsidies & Social Protection: 836,826M | Other: 261,132M | Investments: 553,693M
 *   Total: 5,187,975M EGP
 *
 * Percentage values are DERIVED from the official M EGP figures.
 * They are NOT directly stated in the PDF as percentages.
 *
 * Note: Component sum = 5,187,974M vs official total = 5,187,975M (1M rounding).
 */

import { createFigure, UNITS, VERIFICATION } from "./schema";
import { FISCAL_YEAR, BUDGET_SOURCE_ID } from "./meta";


// Official M EGP values from economic classification
const TOTAL_EXPENDITURE = 5187975;

const _rawCategories = [
  {
    id: "debt_interest",
    name: "فوائد الدين",
    description: "سداد فوائد الدين العام وخدمة القروض",
    icon: "CreditCard",
    color: "#1E3A8A",
    amountM: 2419823,
    details: { localDebt: "الدين المحلي", externalDebt: "الدين الخارجي" },
  },
  {
    id: "salaries",
    name: "الأجور والرواتب",
    description: "رواتب الموظفين والأجور في القطاع العام",
    icon: "Users",
    color: "#059669",
    amountM: 822781,
    details: { wages: "الأجور", bonuses: "المكافآت", socialInsurance: "التأمينات الاجتماعية" },
  },
  {
    id: "social_solidarity",
    name: "الدعم والتعيين اجتماعي",
    description: "الدعم المباشر والتأمينات الاجتماعية والمعاشات",
    icon: "Shield",
    color: "#7C3AED",
    amountM: 836826,
    details: { subsidies: "الدعم", pensions: "المعاشات", socialInsurance: "التأمينات الاجتماعية" },
  },
  {
    id: "investments",
    name: "الاستثمارات",
    description: "المشاريع القومية والبنية التحتية",
    icon: "Building",
    color: "#D97706",
    amountM: 553693,
    details: { infrastructure: "البنية التحتية", housing: "الإسكان", utilities: "المرافق" },
  },
  {
    id: "goods_services",
    name: "السلع والخدمات",
    description: "مشتريات السلع والخدمات المختلفة",
    icon: "ShoppingCart",
    color: "#DC2626",
    amountM: 293719,
    details: { health: "الصحة", education: "التعليم" },
  },
  {
    id: "other",
    name: "أخرى",
    description: "الدفاع والأمن والعمليات الأخرى",
    icon: "MoreHorizontal",
    color: "#6B7280",
    amountM: 261132,
    details: { defense: "الدفاع", security: "الأمن", otherOps: "عمليات أخرى" },
  },
];

/**
 * Flat array of Budget 100 categories.
 * Each item has:
 *   - figure: canonical BudgetFigure (percentage derived from M EGP)
 *   - percentage: backward-compat alias for figure.value
 *   - source: backward-compat alias for figure.sourceId
 *   - page: backward-compat alias for figure.page
 *   - details: object (key -> label) for Budget100.jsx
 */
const budget100 = _rawCategories.map((cat) => {
  const percentageValue = +((cat.amountM / TOTAL_EXPENDITURE) * 100).toFixed(2);

  return {
    id: cat.id,
    name: cat.name,
    description: cat.description,
    icon: cat.icon,
    color: cat.color,
    figure: createFigure({
      id: `budget100_${cat.id}`,
      label: cat.name,
      value: percentageValue,
      unit: UNITS.PERCENT,
      fiscalYear: FISCAL_YEAR,
      figureType: "derived",
      verificationStatus: VERIFICATION.UNVERIFIED,
      sourceId: BUDGET_SOURCE_ID,
      page: null,
      derivedFrom: ["total_expenditures"],
      formula: `(${cat.amountM.toLocaleString()} / ${TOTAL_EXPENDITURE.toLocaleString()}) * 100 = ${percentageValue}%`,
      note: `النسبة م derives من القيمة الرسمية ${cat.amountM.toLocaleString()} من أصل ${TOTAL_EXPENDITURE.toLocaleString()} مليون جنيه`,
    }),
    amountM: cat.amountM,
    details: cat.details,
  };
});

// Backward-compat aliases
budget100.forEach((item) => {
  Object.defineProperty(item, "percentage", {
    get() { return item.figure.value; },
    configurable: true,
  });
  Object.defineProperty(item, "source", {
    get() { return item.figure.sourceId; },
    configurable: true,
  });
  Object.defineProperty(item, "page", {
    get() { return item.figure.page; },
    configurable: true,
  });
});

export default budget100;

/**
 * Get total percentage across all categories.
 * @returns {number}
 */
export function getTotalPercentage() {
  return budget100.reduce((sum, cat) => sum + (cat.figure.value || 0), 0);
}

/**
 * Get remaining percentage from 100.
 * @returns {number}
 */
export function getRemainingPercentage() {
  return 100 - getTotalPercentage();
}

/**
 * Official total expenditure in M EGP (for reference).
 */
export const OFFICIAL_TOTAL_EXPENDITURE = TOTAL_EXPENDITURE;
