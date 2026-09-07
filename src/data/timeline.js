/**
 * Budget Timeline
 *
 * Key milestones in the budget cycle.
 * Dates and descriptions are EXPLANATORY, not official financial figures.
 *
 * Rule: Do NOT treat timeline dates as official until verified.
 */

import { FISCAL_YEAR, BUDGET_SOURCE_ID } from "./meta";


export const budgetTimeline = [
  { id: "tl1", date: "2026-01", label: "بداية إعداد موازنة 2026/2027", description: "بداية العمل على مشروع موازنة السنة المالية الجديدة", type: "preparation", icon: "FileText", sourceId: BUDGET_SOURCE_ID, page: null },
  { id: "tl2", date: "2026-03", label: "تقديم مشروع الموازنة للبرلمان", description: "تقديم مشروع قانون الموازنة العامة للدولة لمجلس النواب", type: "submission", icon: "Send", sourceId: BUDGET_SOURCE_ID, page: null },
  { id: "tl3", date: "2026-04", label: "مناقشة اللجان البرلمانية", description: "مناقشة مشروع الموازنة في اللجان الدائمة", type: "discussion", icon: "MessageSquare", sourceId: BUDGET_SOURCE_ID, page: null },
  { id: "tl4", date: "2026-05", label: "التصويت على الموازنة", description: "التصويت على مشروع قانون الموازنة العامة", type: "voting", icon: "Vote", sourceId: BUDGET_SOURCE_ID, page: null },
  { id: "tl5", date: "2026-06", label: "اعتماد الموازنة", description: "اعتماد الموازنة من رئيس الجمهورية", type: "approval", icon: "CheckCircle", sourceId: BUDGET_SOURCE_ID, page: null },
  { id: "tl6", date: "2026-07-01", label: "بداية السنة المالية", description: "بداية تنفيذ الموازنة العامة للدولة", type: "start", icon: "Play", sourceId: BUDGET_SOURCE_ID, page: null },
  { id: "tl7", date: "2026-12", label: "مراجعة منتصف الفترة", description: "مراجعة تنفيذ الموازنة في أول 6 أشهر", type: "review", icon: "Search", sourceId: BUDGET_SOURCE_ID, page: null },
  { id: "tl8", date: "2027-06-30", label: "نهاية السنة المالية", description: "نهاية الفترة المالية وغلق الحسابات", type: "end", icon: "Calendar", sourceId: BUDGET_SOURCE_ID, page: null },
  { id: "tl9", date: "2027-09", label: "تقديم حساب الختام", description: "تقديم حساب الختام للسنة المالية المنقضية", type: "report", icon: "FileText", sourceId: BUDGET_SOURCE_ID, page: null },
];

export const timelineColors = {
  preparation: "#3B82F6",
  submission: "#8B5CF6",
  discussion: "#F59E0B",
  voting: "#EF4444",
  approval: "#10B981",
  start: "#06B6D4",
  review: "#8B5CF6",
  end: "#6B7280",
  report: "#3B82F6",
};
