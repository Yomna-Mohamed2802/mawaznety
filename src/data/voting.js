/**
 * Voting Categories
 *
 * Defines voting OPTIONS only.
 * Actual vote counts will come from Supabase (not in this file).
 *
 * Rule: Do NOT store vote counts in static data.
 */

// Raw options data
const _budgetPrioritiesOptions = [
  { id: "edu_priority", label: "زيادة الإنفاق على التعليم", description: "تحسين جودة التعليم والبنية التحتية للمدارس", icon: "GraduationCap", color: "#3B82F6" },
  { id: "health_priority", label: "تحسين الخدمات الصحية", description: "بناء مستشفيات جديدة وتحسين التأمين الصحي", icon: "HeartPulse", color: "#EF4444" },
  { id: "infra_priority", label: "البنية التحتية والنقل", description: "تطوير الطرق والمواصلات العامة", icon: "Building", color: "#F59E0B" },
  { id: "social_priority", label: "الحماية الاجتماعية", description: "تعزيز الدعم المباشر للمواطنين", icon: "Shield", color: "#8B5CF6" },
  { id: "debt_priority", label: "تقليل الدين العام", description: "تحسين إدارة الدين وتقليص الأعباء", icon: "CreditCard", color: "#6B7280" },
];

const _reformOpinionsOptions = [
  { id: "tax_reform", label: "زيادة الضرائب على الثرياء", description: "فرض ضرائب أعلى على الدخول العالية", icon: "Receipt", color: "#10B981" },
  { id: "spending_reform", label: "تقليل الإنفاق العام", description: "تقليص بعض البنود غير الضرورية", icon: "Scissors", color: "#F59E0B" },
  { id: "privatization", label: "الخصخصة", description: "بيع بعض الشركات الحكومية", icon: "Building", color: "#3B82F6" },
  { id: "investment", label: "جذب الاستثمارات الأجنبية", description: "تسهيل إجراءات الاستثمار", icon: "Globe", color: "#8B5CF6" },
];

/**
 * Add backward-compatibility aliases to voting options.
 * Voting.jsx accesses .name and .votes on options.
 * - name: alias for label
 * - votes: placeholder 0 (real counts come from Supabase)
 */
function addCompatAliases(options) {
  return options.map((opt) => ({
    ...opt,
    name: opt.label,
    votes: 0,
  }));
}

export const votingCategories = [
  {
    id: "budget_priorities",
    label: "أولويات الموازنة",
    description: "صوتك يحدد أولويات إنفاق الدولة",
    icon: "Vote",
    options: addCompatAliases(_budgetPrioritiesOptions),
  },
  {
    id: "reform_opinions",
    label: "آراء الإصلاح",
    description: "ما رأيك في إصلاحات الموازنة؟",
    icon: "Chat",
    options: addCompatAliases(_reformOpinionsOptions),
  },
];

export const votingSettings = {
  maxVotesPerUser: 1,
  showResultsAfterVoting: true,
  allowMultipleCategories: true,
  votingEndDate: null,
  requireAuthentication: false,
};
