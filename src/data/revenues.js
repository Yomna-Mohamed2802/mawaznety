/**
 * Revenue Categories
 *
 * Breakdown of state revenue sources.
 * Populated from the official Citizen Budget 2026/2027 PDF.
 *
 * Source: موازنة المواطن 2026/2027 (budget_pdf)
 * Unit: million EGP (M EGP)
 *
 * Note: Total = 4,056,375M. Component sum (3,529,294 + 19,761 + 507,319) = 4,056,374M.
 *       1M rounding difference documented.
 */

import { createFigure, UNITS, VERIFICATION } from "./schema";
import { FISCAL_YEAR, BUDGET_SOURCE_ID } from "./meta";


export const revenues = {
  fiscalYear: FISCAL_YEAR,
  sourceId: BUDGET_SOURCE_ID,

  total: createFigure({
    id: "revenues_total",
    label: "إجمالي الإيرادات",
    value: 4056375,
    unit: UNITS.MILLION_EGP,
    fiscalYear: FISCAL_YEAR,
    figureType: "official",
    verificationStatus: VERIFICATION.VERIFIED,
    sourceId: BUDGET_SOURCE_ID,
    page: null,
    note: "القيمة بالمليون جنيه. الإجمالي كما ورد في ملف الموازنة",
  }),

  categories: [
    {
      id: "taxes",
      label: "الضرائب",
      description: "الضرائب المباشرة وغير المباشرة",
      icon: "Receipt",
      figure: createFigure({
        id: "revenue_taxes",
        label: "الضرائب",
        value: 3529294,
        unit: UNITS.MILLION_EGP,
        fiscalYear: FISCAL_YEAR,
        figureType: "official",
        verificationStatus: VERIFICATION.VERIFIED,
        sourceId: BUDGET_SOURCE_ID,
        page: null,
        note: "القيمة بالمليون جنيه. ككل الضرائب كما ورد في ملف الموازنة",
      }),
      children: [
        { id: "income_tax", label: "ضريبة الدخل", figure: createFigure({ id: "rev_income_tax", label: "ضريبة الدخل", value: null, unit: UNITS.MILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل الضرائب غير متوفر في ملف الموازنة" }) },
        { id: "vat", label: "ضريبة القيمة المضافة", figure: createFigure({ id: "rev_vat", label: "ضريبة القيمة المضافة", value: null, unit: UNITS.MILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل الضرائب غير متوفر في ملف الموازنة" }) },
        { id: "customs", label: "الرسوم الجمركية", figure: createFigure({ id: "rev_customs", label: "الرسوم الجمركية", value: null, unit: UNITS.MILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل الضرائب غير متوفر في ملف الموازنة" }) },
        { id: "stamp", label: "الدمغة", figure: createFigure({ id: "rev_stamp", label: "الدمغة", value: null, unit: UNITS.MILLION_EGP, fiscalYear: FISCAL_YEAR, figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "تفصيل الضرائب غير متوفر في ملف الموازنة" }) },
      ],
    },
    {
      id: "non_tax",
      label: "إيرادات غير ضريبية",
      description: "الإيرادات من الخدمات والرسوم",
      icon: "Banknotes",
      figure: createFigure({
        id: "revenue_non_tax",
        label: "إيرادات غير ضريبية",
        value: null,
        unit: UNITS.MILLION_EGP,
        fiscalYear: FISCAL_YEAR,
        figureType: "official",
        verificationStatus: VERIFICATION.UNAVAILABLE,
        sourceId: BUDGET_SOURCE_ID,
        page: null,
        note: "الإيرادات غير الضريبية غير محددة بشكل منفصل في ملف الموازنة. تشمل 'إيرادات أخرى' بقيمة 507,319M",
      }),
      children: [],
    },
    {
      id: "resource_rents",
      label: "إيرادات عائدات الموارد",
      description: "البترول والغاز الطبيعي والتعدين",
      icon: "Fire",
      figure: createFigure({
        id: "revenue_resources",
        label: "إيرادات عائدات الموارد",
        value: null,
        unit: UNITS.MILLION_EGP,
        fiscalYear: FISCAL_YEAR,
        figureType: "official",
        verificationStatus: VERIFICATION.UNAVAILABLE,
        sourceId: BUDGET_SOURCE_ID,
        page: null,
        note: "تفصيل عائدات الموارد غير متوفر في ملف الموازنة",
      }),
      children: [],
    },
    {
      id: "grants",
      label: "المنح والمساعدات",
      description: "المنح الدولية والإقليمية",
      icon: "Gift",
      figure: createFigure({
        id: "revenue_grants",
        label: "المنح والمساعدات",
        value: 19761,
        unit: UNITS.MILLION_EGP,
        fiscalYear: FISCAL_YEAR,
        figureType: "official",
        verificationStatus: VERIFICATION.VERIFIED,
        sourceId: BUDGET_SOURCE_ID,
        page: null,
        note: "القيمة بالمليون جنيه. المنح كما وردت في ملف الموازنة",
      }),
      children: [],
    },
    {
      id: "other_revenues",
      label: "إيرادات أخرى",
      description: "إيرادات مختلفة غير مصنفة",
      icon: "EllipsisHorizontal",
      figure: createFigure({
        id: "revenue_other",
        label: "إيرادات أخرى",
        value: 507319,
        unit: UNITS.MILLION_EGP,
        fiscalYear: FISCAL_YEAR,
        figureType: "official",
        verificationStatus: VERIFICATION.VERIFIED,
        sourceId: BUDGET_SOURCE_ID,
        page: null,
        note: "القيمة بالمليون جنيه. كإجمالي 'إيرادات أخرى' كما ورد في ملف الموازنة",
      }),
      children: [],
    },
  ],
};

export const revenueTrends = {
  sourceId: BUDGET_SOURCE_ID,
  data: [
    { year: "2022/2023", figure: createFigure({ id: "rev_2022", label: "إيرادات 2022/2023", value: null, unit: UNITS.MILLION_EGP, fiscalYear: "2022/2023", figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "بيانات تاريخية غير متوفرة في ملف الموازنة" }) },
    { year: "2023/2024", figure: createFigure({ id: "rev_2023", label: "إيرادات 2023/2024", value: null, unit: UNITS.MILLION_EGP, fiscalYear: "2023/2024", figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "بيانات تاريخية غير متوفرة في ملف الموازنة" }) },
    { year: "2024/2025", figure: createFigure({ id: "rev_2024", label: "إيرادات 2024/2025", value: null, unit: UNITS.MILLION_EGP, fiscalYear: "2024/2025", figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "بيانات تاريخية غير متوفرة في ملف الموازنة" }) },
    { year: "2025/2026", figure: createFigure({ id: "rev_2025", label: "إيرادات 2025/2026", value: null, unit: UNITS.MILLION_EGP, fiscalYear: "2025/2026", figureType: "official", verificationStatus: VERIFICATION.UNAVAILABLE, sourceId: BUDGET_SOURCE_ID, page: null, note: "بيانات تاريخية غير متوفرة في ملف الموازنة" }) },
    { year: "2026/2027", figure: createFigure({ id: "rev_2026", label: "إيرادات 2026/2027", value: 4056375, unit: UNITS.MILLION_EGP, fiscalYear: "2026/2027", figureType: "official", verificationStatus: VERIFICATION.VERIFIED, sourceId: BUDGET_SOURCE_ID, page: null, note: "القيمة بالمليون جنيه" }) },
  ],
};
