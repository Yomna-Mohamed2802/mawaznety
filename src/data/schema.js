/**
 * Mawaznety Data Schema
 *
 * Canonical type definitions and helper utilities for all budget data.
 * Every official financial figure in the app MUST conform to BudgetFigure.
 *
 * Rules:
 * - Do NOT invent, estimate, or guess official numbers.
 * - Use null for any value not yet verified against an authoritative source.
 * - verificationStatus must be explicitly set, never auto-calculated.
 * - figureType must accurately describe the nature of the data.
 * - derived figures MUST reference their source figures via derivedFrom.
 */


// ─── Verification Status ─────────────────────────────────

/**
 * @typedef {"verified"|"unverified"|"unavailable"} VerificationStatus
 *
 * - "verified":     Confirmed against an authoritative source (e.g., official PDF).
 * - "unverified":   Value exists but has NOT been confirmed against a source.
 *                   May come from a mockup, draft, or secondary source.
 * - "unavailable":  Value is not known at all. No source provides it.
 */

export const VERIFICATION = Object.freeze({
  VERIFIED: "verified",
  UNVERIFIED: "unverified",
  UNAVAILABLE: "unavailable",
});


// ─── Figure Type ─────────────────────────────────────────

/**
 * @typedef {"official"|"derived"|"explanatory"} FigureType
 *
 * - "official":      Directly stated in an authoritative source.
 * - "derived":       Calculated from one or more official figures.
 *                    MUST include derivedFrom and formula.
 * - "explanatory":   Educational or contextual information.
 *                    NOT an official budget figure. Used for labels,
 *                    descriptions, categories, and non-numeric context.
 */

export const FIGURE_TYPE = Object.freeze({
  OFFICIAL: "official",
  DERIVED: "derived",
  EXPLANATORY: "explanatory",
});


// ─── Controlled Units ────────────────────────────────────

/**
 * @typedef {string} Unit
 *
 * Controlled unit enum. All figures MUST use one of these values.
 * Display formatting is handled by formatValue(), NOT stored in data.
 */

export const UNITS = Object.freeze({
  EGP: "EGP",
  MILLION_EGP: "million_EGP",
  BILLION_EGP: "billion_EGP",
  TRILLION_EGP: "trillion_EGP",
  PERCENT: "percent",
  USD_BILLION: "USD_billion",
  EGP_PER_USD: "EGP_per_USD",
  COUNT: "count",
  TEXT: "text",
});


// ─── BudgetFigure ────────────────────────────────────────

/**
 * @typedef {Object} BudgetFigure
 *
 * The canonical shape for every financial figure in Mawaznety.
 * All data files MUST return figures in this exact shape.
 *
 * @property {string} id                    - Unique identifier (snake_case)
 * @property {string} label                 - Arabic display name
 * @property {number|null} value            - The numeric value (null = unavailable)
 * @property {Unit} unit                    - Controlled unit from UNITS enum
 * @property {string} fiscalYear            - e.g., "2026/2027"
 * @property {FigureType} figureType        - official | derived | explanatory
 * @property {VerificationStatus} verificationStatus - verified | unverified | unavailable
 * @property {string|null} sourceId         - Reference to sources.js ID (null if no source)
 * @property {number|null} page             - Page number in source document (null if unknown)
 * @property {string[]|null} derivedFrom    - IDs of figures this is derived from (null if not derived)
 * @property {string|null} formula          - Human-readable formula (null if not derived)
 * @property {string|null} note             - Optional clarification note
 */


// ─── Helper: Create a BudgetFigure ───────────────────────

/**
 * Creates a BudgetFigure with sensible defaults.
 *
 * @param {Partial<BudgetFigure> & {id: string, label: string}} params
 * @returns {BudgetFigure}
 */
export function createFigure({
  id,
  label,
  value = null,
  unit = UNITS.TEXT,
  fiscalYear = "2026/2027",
  figureType = FIGURE_TYPE.OFFICIAL,
  verificationStatus = VERIFICATION.UNAVAILABLE,
  sourceId = null,
  page = null,
  derivedFrom = null,
  formula = null,
  note = null,
}) {
  return {
    id,
    label,
    value,
    unit,
    fiscalYear,
    figureType,
    verificationStatus,
    sourceId,
    page,
    derivedFrom,
    formula,
    note,
  };
}


// ─── Helper: Derived Figure ──────────────────────────────

/**
 * Creates a derived BudgetFigure (calculated from other figures).
 *
 * @param {Partial<BudgetFigure> & {id: string, label: string, derivedFrom: string[], formula: string}} params
 * @returns {BudgetFigure}
 */
export function createDerivedFigure({
  id,
  label,
  value = null,
  unit = UNITS.PERCENT,
  fiscalYear = "2026/2027",
  verificationStatus = VERIFICATION.UNAVAILABLE,
  sourceId = null,
  page = null,
  derivedFrom,
  formula,
  note = null,
}) {
  return createFigure({
    id,
    label,
    value,
    unit,
    fiscalYear,
    figureType: FIGURE_TYPE.DERIVED,
    verificationStatus,
    sourceId,
    page,
    derivedFrom,
    formula,
    note,
  });
}


// ─── Helper: Explanatory Content ─────────────────────────

/**
 * Creates an explanatory figure (non-financial context).
 *
 * @param {Partial<BudgetFigure> & {id: string, label: string}} params
 * @returns {BudgetFigure}
 */
export function createExplanatory({
  id,
  label,
  value = null,
  unit = UNITS.TEXT,
  fiscalYear = "2026/2027",
  sourceId = null,
  page = null,
  note = null,
}) {
  return createFigure({
    id,
    label,
    value,
    unit,
    fiscalYear,
    figureType: FIGURE_TYPE.EXPLANATORY,
    verificationStatus: VERIFICATION.UNAVAILABLE,
    sourceId,
    page,
    derivedFrom: null,
    formula: null,
    note,
  });
}


// ─── Helper: Unavailable Placeholder ─────────────────────

/**
 * Creates a placeholder for a figure that will be filled later.
 * Use this when you know a figure SHOULD exist but don't have the value yet.
 *
 * @param {string} id
 * @param {string} label
 * @param {Unit} [unit]
 * @param {string} [fiscalYear]
 * @returns {BudgetFigure}
 */
export function placeholder(id, label, unit = UNITS.TEXT, fiscalYear = "2026/2027") {
  return createFigure({
    id,
    label,
    value: null,
    unit,
    fiscalYear,
    figureType: FIGURE_TYPE.OFFICIAL,
    verificationStatus: VERIFICATION.UNAVAILABLE,
  });
}


// ─── Formatting Utilities ────────────────────────────────

/**
 * Unit display labels in Arabic and English.
 */
const UNIT_LABELS = {
  ar: {
    [UNITS.EGP]: "جنيه",
    [UNITS.MILLION_EGP]: "مليون جنيه",
    [UNITS.BILLION_EGP]: "مليار جنيه",
    [UNITS.TRILLION_EGP]: "تريليون جنيه",
    [UNITS.PERCENT]: "%",
    [UNITS.USD_BILLION]: "مليار دولار",
    [UNITS.EGP_PER_USD]: "جنيه/دولار",
    [UNITS.COUNT]: "",
    [UNITS.TEXT]: "",
  },
  en: {
    [UNITS.EGP]: "EGP",
    [UNITS.MILLION_EGP]: "million EGP",
    [UNITS.BILLION_EGP]: "billion EGP",
    [UNITS.TRILLION_EGP]: "trillion EGP",
    [UNITS.PERCENT]: "%",
    [UNITS.USD_BILLION]: "billion USD",
    [UNITS.EGP_PER_USD]: "EGP/USD",
    [UNITS.COUNT]: "",
    [UNITS.TEXT]: "",
  },
};

const UNAVAILABLE_MESSAGES = { ar: "بيانات غير متوفرة", en: "Data unavailable" };

// Canonical magnitude of each EGP unit, expressed in million EGP.
const EGP_UNIT_IN_MILLIONS = {
  [UNITS.MILLION_EGP]: 1,
  [UNITS.BILLION_EGP]: 1e3,
  [UNITS.TRILLION_EGP]: 1e6,
};

/**
 * Scale an EGP amount (given in its figure unit) to the most readable
 * human unit: trillions ≥ 1T, billions ≥ 10B, otherwise millions.
 *
 * @param {number} value   - Raw value in the figure's own unit
 * @param {string} unit    - One of MILLION/BILLION/TRILLION_EGP
 * @param {string} lang    - "ar" | "en"
 * @returns {string} e.g. "٥٫١٩ تريليون جنيه" / "5.19 trillion EGP"
 */
export function formatEGP(value, unit, lang = "ar") {
  const inMillions = value * (EGP_UNIT_IN_MILLIONS[unit] || 1);
  const abs = Math.abs(inMillions);
  const locale = lang === "en" ? "en-US" : "ar-EG";
  const labels = UNIT_LABELS[lang] || UNIT_LABELS.ar;

  const fmt = (n, maxFrac) =>
    n.toLocaleString(locale, { maximumFractionDigits: maxFrac });

  if (abs >= 1e6) return `${fmt(inMillions / 1e6, 2)} ${labels[UNITS.TRILLION_EGP]}`;
  if (abs >= 1e4) return `${fmt(inMillions / 1e3, 0)} ${labels[UNITS.BILLION_EGP]}`;
  if (abs >= 1e3) return `${fmt(inMillions / 1e3, 1)} ${labels[UNITS.BILLION_EGP]}`;
  return `${fmt(inMillions, 0)} ${labels[UNITS.MILLION_EGP]}`;
}

/**
 * Exact raw value with its stored unit — for tooltips and source drawers,
 * so the citizen can always verify the official number.
 */
export function formatExactValue(figure, lang = "ar") {
  if (figure.value === null) return UNAVAILABLE_MESSAGES[lang] || UNAVAILABLE_MESSAGES.ar;
  const labels = UNIT_LABELS[lang] || UNIT_LABELS.ar;
  const locale = lang === "en" ? "en-US" : "ar-EG";
  return `${figure.value.toLocaleString(locale)} ${labels[figure.unit] || figure.unit}`;
}

/**
 * Format a BudgetFigure value for display.
 *
 * @param {BudgetFigure} figure
 * @param {string} [lang="ar"] - Current language ("ar" or "en")
 * @returns {string}
 */
export function formatValue(figure, lang = "ar") {
  if (figure.value === null) return UNAVAILABLE_MESSAGES[lang] || UNAVAILABLE_MESSAGES.ar;

  const labels = UNIT_LABELS[lang] || UNIT_LABELS.ar;
  const unitLabel = labels[figure.unit] || figure.unit;
  const locale = lang === "en" ? "en-US" : "ar-EG";

  if (figure.unit === UNITS.PERCENT) {
    return `${figure.value.toLocaleString(locale)}%`;
  }

  if (
    figure.unit === UNITS.MILLION_EGP ||
    figure.unit === UNITS.BILLION_EGP ||
    figure.unit === UNITS.TRILLION_EGP
  ) {
    return formatEGP(figure.value, figure.unit, lang);
  }

  if (figure.unit === UNITS.USD_BILLION || figure.unit === UNITS.EGP_PER_USD) {
    return `${figure.value.toLocaleString(locale)} ${unitLabel}`;
  }

  if (figure.unit === UNITS.COUNT) {
    return figure.value.toLocaleString(locale);
  }

  return `${figure.value.toLocaleString(locale)} ${unitLabel}`;
}

/**
 * Get the label for a unit.
 *
 * @param {Unit} unit
 * @param {string} [lang="ar"]
 * @returns {string}
 */
export function getUnitLabel(unit, lang = "ar") {
  const labels = UNIT_LABELS[lang] || UNIT_LABELS.ar;
  return labels[unit] || unit;
}

/**
 * Check if a figure is ready for display (has a value).
 *
 * @param {BudgetFigure} figure
 * @returns {boolean}
 */
export function hasValue(figure) {
  return figure.value !== null;
}

/**
 * Check if a figure is verified.
 *
 * @param {BudgetFigure} figure
 * @returns {boolean}
 */
export function isVerified(figure) {
  return figure.verificationStatus === VERIFICATION.VERIFIED;
}
