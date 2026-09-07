/**
 * Mawaznety Data - Single Barrel Export
 *
 * All data is imported from here:
 *   import { budgetOverview, budget100 } from '../data';
 *
 * Canonical source of truth: this directory.
 * Components should NOT import from individual data files directly.
 */

// Schema & helpers
export {
  createFigure,
  createDerivedFigure,
  createExplanatory,
  placeholder,
  formatValue,
  getUnitLabel,
  hasValue,
  isVerified,
  UNITS,
  VERIFICATION,
  FIGURE_TYPE,
} from "./schema";

// Metadata
export { APP_NAME, FISCAL_YEAR, CURRENCY, CURRENCY_SYMBOL, BUDGET_SOURCE_ID } from "./meta";

// Budget overview
export { budgetOverview, budgetHighlights, revenues as budgetRevenues, expenditures as budgetExpenditures, primarySurplus, gdp, growthRate, deficit, deficitToGdp, surplusToGdp } from "./budget";

// Budget 100
export { default as budget100, getTotalPercentage, getRemainingPercentage } from "./budget100";

// Revenues & Expenditures
export { revenues, revenueTrends } from "./revenues";
export { expenditures, expenditureTrends } from "./expenditures";

// Debt
export { debt } from "./debt";

// Sectors
export { education, health, social, infrastructure, economy } from "./sectors";
export { allSectors } from "./sectors";

// Interactive features
export { quizQuestions, quizCategories, quizSettings } from "./quiz";
export { votingCategories, votingSettings } from "./voting";

// Timeline
export { budgetTimeline, timelineColors } from "./timeline";

// Sources
export { sources, getSource, formatCitation } from "./sources";
