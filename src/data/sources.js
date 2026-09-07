/**
 * Sources / References
 *
 * Every official figure references a source by ID from this list.
 * Do NOT repeat source metadata inside figure objects.
 */

export const sources = [
  {
    id: "budget_pdf",
    name: "موازنة المواطن 2026/2027",
    publisher: "وزارة المالية",
    url: "https://www.mof.gov.eg",
    year: "2026/2027",
    description: "الملف الإرشادي لموازنة المواطنة",
    type: "official",
  },
  {
    id: "budget_statement",
    name: "بيان الموازنة العامة للدولة",
    publisher: "جهاز الموازنة",
    url: "https://www.budget.gov.eg",
    year: "2026/2027",
    description: "البيان التفصيلي لمشروع الموازنة",
    type: "official",
  },
  {
    id: "capmas",
    name: "جهاز الإحصاء المركزي",
    publisher: "جهاز الإحصاء المركزي",
    url: "https://www.capmas.gov.eg",
    year: "2025",
    description: "البيانات الإحصائية الرسمية",
    type: "official",
  },
  {
    id: "central_bank",
    name: "البنك المركزي المصري",
    publisher: "البنك المركزي المصري",
    url: "https://www.centralbank.gov.eg",
    year: "2025",
    description: "التقرير السنوي للبنك المركزي",
    type: "official",
  },
  {
    id: "imf",
    name: "تقرير صندوق النقد الدولي",
    publisher: "صندوق النقد الدولي",
    url: "https://www.imf.org",
    year: "2025",
    description: "التقرير السنوي لمصر",
    type: "international",
  },
  {
    id: "world_bank",
    name: "تقرير البنك الدولي",
    publisher: "البنك الدولي",
    url: "https://www.worldbank.org",
    year: "2025",
    description: "تقرير النيل",
    type: "international",
  },
];

/**
 * Get a source by its ID.
 * @param {string} sourceId
 * @returns {object|null}
 */
export function getSource(sourceId) {
  return sources.find((s) => s.id === sourceId) || null;
}

/**
 * Format a citation string for a source.
 * @param {string} sourceId
 * @param {number|null} [page]
 * @returns {string}
 */
export function formatCitation(sourceId, page = null) {
  const source = getSource(sourceId);
  if (!source) return "";
  let citation = `${source.publisher}. (${source.year}). ${source.name}.`;
  if (page) citation += ` صفحة ${page}.`;
  return citation;
}
