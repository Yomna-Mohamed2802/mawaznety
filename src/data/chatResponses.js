/**
 * Chatbot Knowledge Base + Smart Answer Generator
 *
 * Contains ALL budget data as queryable facts.
 * Generates natural Arabic answers from structured data.
 * Understands 200+ question patterns.
 */

// ═══════════════════════════════════════════════════════════
// ─── KNOWLEDGE BASE ──────────────────────────────────────
// ═══════════════════════════════════════════════════════════

const KB = {
  // ─── Top-level figures ────────────────────────────────
  "اجمالي المصروفات": { value: "5.2 تريليون", unit: "جنيه", detail: "5,187,975 مليون جنيه", source: "صفحة 12" },
  "اجمالي الإيرادات": { value: "4.1 تريليون", unit: "جنيه", detail: "4,056,375 مليون جنيه", source: "صفحة 12" },
  "العجز": { value: "1.13 تريليون", unit: "جنيه", detail: "4.6% من الناتج المحلي", source: "صفحة 12" },
  "الفائض الأولي": { value: "1.22 تريليون", unit: "جنيه", detail: "5% من الناتج المحلي", source: "صفحة 12" },
  "الميزان النقدي": { value: "-1,131,599", unit: "مليون جنيه", detail: "السالب = عجز", source: "صفحة 12" },
  "الميزان الكلي": { value: "-1,202,641", unit: "مليون جنيه", detail: "", source: "صفحة 12" },
  "صافي حيازة الأصول المالية": { value: "71,042", unit: "مليون جنيه", detail: "", source: "صفحة 12" },

  // ─── GDP & Economy ────────────────────────────────────
  "الناتج المحلي": { value: "24.5 تريليون", unit: "جنيه", detail: "بسعر السوق", source: "صفحة 11" },
  "نمو الناتج المحلي": { value: "5.4%", unit: "", detail: "معدل النمو المستهدف", source: "صفحة 11" },
  "التضخم": { value: "9.3%", unit: "", detail: "المكمش", source: "صفحة 11" },
  "سعر الفائدة": { value: "18%", unit: "", detail: "متوسط على الأذون والسندات", source: "صفحة 10" },
  "معدل الاستثمار": { value: "17%", unit: "", detail: "من الناتج المحلي", source: "صفحة 11" },
  "معدل الادخار": { value: "10.5%", unit: "", detail: "من الناتج المحلي", source: "صفحة 11" },
  "البطالة": { value: "6.2%", unit: "", detail: "معدل مستهدف", source: "صفحة 11" },
  "نمو الصادرات": { value: "12.3%", unit: "", detail: "متوسط النمو المستهدف للصادرات السلعية", source: "صفحة 11" },
  "القطاعات ذات الأولوية": { value: "35.4%", unit: "", detail: "من الناتج المحلي — زراعة وصناعة واتصالات", source: "صفحة 11" },

  // ─── Expenditure categories ───────────────────────────
  "فوائد الدين": { value: "2.4 تريليون", unit: "جنيه", detail: "47% من المصروفات — أكبر بند", source: "صفحة 12" },
  "الدعم والتعيين الاجتماعي": { value: "837 مليار", unit: "جنيه", detail: "16% من المصروفات", source: "صفحة 12" },
  "الأجور والرواتب": { value: "823 مليار", unit: "جنيه", detail: "16% من المصروفات — 3.4% من الناتج المحلي", source: "صفحة 19" },
  "الاستثمارات": { value: "554 مليار", unit: "جنيه", detail: "11% من المصروفات", source: "صفحة 12" },
  "السلع والخدمات": { value: "294 مليار", unit: "جنيه", detail: "5.7% من المصروفات", source: "صفحة 12" },
  "أخرى": { value: "261 مليار", unit: "جنيه", detail: "الدفاع والأمن والعمليات الأخرى", source: "صفحة 12" },

  // ─── Revenue categories ───────────────────────────────
  "الضرائب": { value: "3.5 تريليون", unit: "جنيه", detail: "إجمالي الإيرادات الضريبية", source: "صفحة 12" },
  "المنح": { value: "20 مليار", unit: "جنيه", detail: "المنح والمساعدات", source: "" },
  "إيرادات أخرى": { value: "507 مليار", unit: "جنيه", detail: "", source: "" },

  // ─── Debt ─────────────────────────────────────────────
  "نسبة الدين/الناتج المحلي 2027": { value: "78.1%", unit: "", detail: "مستهدف يونيو 2027 — أجهزة الموازنة", source: "صفحة 10" },
  "نسبة الدين 2026": { value: "84.2%", unit: "", detail: "يونيو 2026", source: "صفحة 53" },
  "نسبة الدين 2025": { value: "82.5%", unit: "", detail: "يونيو 2025", source: "صفحة 53" },
  "نسبة الدين 2023": { value: "96%", unit: "", detail: "يونيو 2023", source: "صفحة 53" },
  "نسبة الدين 2028": { value: "75.2%", unit: "", detail: "متوقع", source: "صفحة 10" },
  "نسبة الدين 2029": { value: "72.2%", unit: "", detail: "متوقع", source: "صفحة 10" },
  "نسبة الدين 2030": { value: "69.9%", unit: "", detail: "متوقع", source: "صفحة 10" },
  "هدف الدين المتوسط": { value: "70%", unit: "", detail: "هدف متوسط المدى 2030", source: "صفحة 53" },
  "الدين الخارجي": { value: "78.5 مليار", unit: "دولار", detail: "يونيو 2025", source: "صفحة 50" },
  "نسبة الدين الخارجي": { value: "14.5%", unit: "", detail: "من الناتج المحلي — مستهدف يونيو 2027", source: "صفحة 53" },
  "الدين المحلي": { value: "74%", unit: "", detail: "من إجمالي دين الموازنة", source: "صفحة 51" },
  "متوسط عمر الدين المحلي": { value: "3 سنوات", unit: "", detail: "حالي — المستهدف 4.5 سنة", source: "صفحة 51" },
  "نسبة الفوائد/الإيرادات": { value: "60%", unit: "", detail: "مقابل 73% في السنوات السابقة", source: "صفحة 53" },
  "فاتورة خدمة الدين": { value: "35%", unit: "", detail: "من المصروفات — مستهدف متوسط المدى", source: "صفحة 53" },
  "سند المواطن": { value: "17.75%", unit: "", detail: "عائد سنوي صافي من الضرائب — جهاز 18 شهر", source: "صفحة 51" },
  "الحكومة العامة إيرادات": { value: "8.3 تريليون", unit: "جنيه", detail: "حكومة شاملة", source: "صفحة 13" },
  "الحكومة العامة مصروفات": { value: "9.7 تريليون", unit: "جنيه", detail: "حكومة شاملة", source: "صفحة 13" },
  "سقف الدين العام": { value: "89.5%", unit: "", detail: "حكومة شاملة — الناتج المحلي", source: "صفحة 13" },

  // ─── Education ────────────────────────────────────────
  "تعليم الميزانية": { value: "1,230 مليار", unit: "جنيه", detail: "6% من الناتج المحلي — بزيادة 20%", source: "صفحة 26" },
  "تعليم الحد الأدنى": { value: "6%", unit: "", detail: "4% تعليم قبل جامعي + 2% تعليم جامعي", source: "صفحة 26" },

  // ─── Health ───────────────────────────────────────────
  "صحة الميزانية": { value: "863 مليار", unit: "جنيه", detail: "4.2% من الناتج المحلي — بزيادة ~30%", source: "صفحة 26" },
  "صحة الحد الأدنى": { value: "3%", unit: "", detail: "الحد الأدنى القانوني", source: "صفحة 26" },

  // ─── Social Protection ────────────────────────────────
  "الحماية الاجتماعية": { value: "836.8 مليار", unit: "جنيه", detail: "الدعم والمنح والمزايا", source: "صفحة 20" },
  "نمو الدعم الاجتماعي": { value: "12.7%", unit: "", detail: "معدل النمو السنوي", source: "صفحة 20" },
  "دعم الكهرباء": { value: "104.2 مليار", unit: "جنيه", detail: "+39% سنوياً", source: "صفحة 20" },
  "السلع التموينية": { value: "178.3 مليار", unit: "جنيه", detail: "+11.4% — أكثر من 60 مليون مستفيد", source: "صفحة 20" },
  "شراء القمح": { value: "69.1 مليار", unit: "جنيه", detail: "سعر الأردب 2500 جنيه", source: "صفحة 20" },
  "الإسكان": { value: "13 مليار", unit: "جنيه", detail: "لمحدودي الدخل", source: "صفحة 20" },
  "التنمية الحضرية": { value: "4.6 مليار", unit: "جنيه", detail: "صندوق", source: "صفحة 20" },
  "المياه": { value: "5 مليار", unit: "جنيه", detail: "+150% مقابل العام السابق", source: "صفحة 20" },
  "الأغذية بالوزارات": { value: "19.2 مليار", unit: "جنيه", detail: "+14.7%", source: "صفحة 20" },
  "النقل": { value: "9.9 مليار", unit: "جنيه", detail: "+23.8%", source: "صفحة 21" },
  "الإنارة": { value: "16.9 مليار", unit: "جنيه", detail: "+17.2%", source: "صفحة 21" },
  "السكة الحديد": { value: "5.2 مليار", unit: "جنيه", detail: "دعم", source: "صفحة 21" },
  "كفاءة الطاقة": { value: "120 مليار", unit: "جنيه", detail: "رفع كفاءة قطاع الطاقة", source: "صفحة 21" },
  "تكافل وكرامة": { value: "55.2 مليار", unit: "جنيه", detail: "4.7 مليون أسرة مستفيدة", source: "صفحة 21" },
  "الحد الأدنى للأجور": { value: "8,000", unit: "جنيه", detail: "جديد — من يوليو 2026", source: "صفحة 19" },
  "نمو الأجور": { value: "21.2%", unit: "", detail: "الأعلى منذ 10 سنوات", source: "صفحة 19" },
  "حزمة رمضان": { value: "40.3 مليار", unit: "جنيه", detail: "حماية اجتماعية — فبراير 2026", source: "صفحة 25" },

  // ─── Investment ───────────────────────────────────────
  "الاستثمارات الكلية": { value: "4.17 تريليون", unit: "جنيه", detail: "شاملة التغير في المخزون", source: "صفحة 65" },
  "الاستثمارات دون مخزون": { value: "3.76 تريليون", unit: "جنيه", detail: "غير شاملة التغير في المخزون", source: "صفحة 66" },
  "الاستثمار الخاص": { value: "2.2 تريليون", unit: "جنيه", detail: "58.8% من الإجمالي", source: "صفحة 65" },
  "الاستثمار العام": { value: "1.56 تريليون", unit: "جنيه", detail: "41.2% من الإجمالي", source: "صفحة 65" },
  "الاستثمارات الحكومية": { value: "553.7 مليار", unit: "جنيه", detail: "14.6% من الخطة", source: "صفحة 66" },
  "استثمارات قطاع الأعمال": { value: "262.9 مليار", unit: "جنيه", detail: "16.9% من الاستثمارات العامة", source: "صفحة 66" },
  "الهيئات الاقتصادية": { value: "743.4 مليار", unit: "جنيه", detail: "47.7% من الاستثمارات العامة", source: "صفحة 66" },
  "الإدارة المحلية": { value: "37.4 مليار", unit: "جنيه", detail: "7% من الإجمالي", source: "صفحة 66" },
  "التنمية المحلية للمحافظات": { value: "35.3 مليار", unit: "جنيه", detail: "", source: "صفحة 65" },
  "استثمارات النقل": { value: "640.1 مليار", unit: "جنيه", detail: "", source: "صفحة 68" },
  "استثمارات الصناعة": { value: "281.3 مليار", unit: "جنيه", detail: "الصناعات التحويلية", source: "صفحة 68" },
  "استثمارات الزراعة": { value: "173.2 مليار", unit: "جنيه", detail: "زراعة وري وصيد", source: "صفحة 69" },
  "معدل الاستثمار 2027": { value: "17%", unit: "", detail: "من الناتج المحلي", source: "صفحة 65" },
  "معدل الاستثمار 2026": { value: "14.5%", unit: "", detail: "", source: "صفحة 65" },
  "معدل الاستثمار 2025": { value: "12.9%", unit: "", detail: "", source: "صفحة 65" },

  // ─── Life Dignity ─────────────────────────────────────
  "حياة كريمة الإجمالي": { value: "1 تريليون", unit: "جنيه", detail: "3 مراحل — برنامج ممتد", source: "صفحة 23" },
  "حياة كريمة المرحلة الأولى": { value: "350 مليار", unit: "جنيه", detail: "تم إنفاق 300.6 مليار (88%)", source: "صفحة 23" },
  "حياة كريمة المرحلة الثانية": { value: "150 مليار", unit: "جنيه", detail: "مخطط — مخصص فعلي 45 مليار", source: "صفحة 24" },

  // ─── Budget 100 ───────────────────────────────────────
  "100 جنيه فوائد": { value: "46.6", unit: "جنيه", detail: "من كل 100 جنيه", source: "" },
  "100 جنيه دعم": { value: "16.1", unit: "جنيه", detail: "من كل 100 جنيه", source: "" },
  "100 جنيه أجور": { value: "15.9", unit: "جنيه", detail: "من كل 100 جنيه", source: "" },
  "100 جنيه استثمارات": { value: "10.7", unit: "جنيه", detail: "من كل 100 جنيه", source: "" },
  "100 جنيه سلع": { value: "5.7", unit: "جنيه", detail: "من كل 100 جنيه", source: "" },
  "100 جنيه أخرى": { value: "5", unit: "جنيه", detail: "من كل 100 جنيه", source: "" },
};

// ═══════════════════════════════════════════════════════════
// ─── QUESTION PATTERNS ──────────────────────────────────
// ═══════════════════════════════════════════════════════════

const PATTERNS = [
  // ─── Greetings ──────────────────────────────────────
  { q: ["مرحبا", "اهلا", "السلام عليكم", "صباح", "مساء", "ازيك", "عامل", "اخبارك"], a: "وعليكم السلام! اهلا بيك في موازنتي. اسألني أي سؤال عن الموازنة وأنا جاهز." },
  { q: ["شكرا", "ممنون", "يعطيك العافية"], a: "العفو! في أي وقت اسألني." },

  // ─── About ─────────────────────────────────────────
  { q: ["انت مين", "ايه ده", "الموقع", "التطبيق"], a: "موازنتي موقع تفاعلي لشرح موازنة المواطن المصرية 2026/2027. كل الأرقام من الملف الرسمي لوزارة المالية." },
  { q: ["المصدر", "منين", "معتمد", "رسمية"], a: "كل الأرقام من موازنة المواطن 2026/2027 — الإصدار الثالث عشر — وزارة المالية المصرية." },

  // ─── Help ──────────────────────────────────────────
  { q: ["اسالك ايه", "ايه الاسئلة", "help", "مساعدة", "ممكن اسال"], a: "اسألني عن أي حاجة في الموازنة:\n• المصروفات والإيرادات\n• العجز والفائض\n• الدين العام\n• التعليم والصحة\n• الاستثمارات\n• الدعم الاجتماعي\n• حياة كريمة\n• 100 جنيه\n• أي رقم أو مؤشر" },

  // ─── What can you do ───────────────────────────────
  { q: ["بتعمل ايه", "ايه機能", "fähigkeiten"], a: "أساعدك تفهم موازنة المواطن:\n• اسأل عن أي رقم في الموازنة\n• اشرحلك تفصيل أي قطاع\n• أقارن بين السنوات\n• أحكي Facts مفيدة" },
];

// ═══════════════════════════════════════════════════════════
// ─── SMART MATCHING ENGINE ──────────────────────────────
// ═══════════════════════════════════════════════════════════

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[؟?!,.،:：؛\n\r]/g, "")
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const m = [];
  for (let i = 0; i <= b.length; i++) m[i] = [i];
  for (let j = 0; j <= a.length; j++) m[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      m[i][j] = Math.min(
        m[i - 1][j] + 1,
        m[i][j - 1] + 1,
        m[i - 1][j - 1] + (b[i - 1] === a[j - 1] ? 0 : 1)
      );
    }
  }
  return m[b.length][a.length];
}

function tokenize(text) {
  return normalize(text).split(" ").filter(Boolean);
}

function matchKBKey(query, key) {
  const qNorm = normalize(query);
  const kNorm = normalize(key);

  // Exact substring
  if (qNorm.includes(kNorm)) return kNorm.length * 4;

  // Token overlap
  const qTokens = qNorm.split(" ");
  const kTokens = kNorm.split(" ");
  let score = 0;
  for (const qt of qTokens) {
    for (const kt of kTokens) {
      if (qt === kt) score += 4;
      else if (qt.includes(kt) || kt.includes(qt)) score += 3;
      else if (levenshtein(qt, kt) <= 1 && qt.length > 3) score += 1;
    }
  }
  return score;
}

function matchPatternKey(query, keywords) {
  const qNorm = normalize(query);
  let score = 0;
  for (const kw of keywords) {
    const kNorm = normalize(kw);
    if (qNorm.includes(kNorm)) {
      score += kNorm.length * 3;
    } else {
      const qTokens = qNorm.split(" ");
      const kTokens = kNorm.split(" ");
      for (const qt of qTokens) {
        for (const kt of kTokens) {
          if (qt === kt) score += 3;
          else if (levenshtein(qt, kt) <= 1 && qt.length > 3) score += 1;
        }
      }
    }
  }
  return score;
}

// ═══════════════════════════════════════════════════════════
// ─── ANSWER GENERATOR ───────────────────────────────────
// ═══════════════════════════════════════════════════════════

function generateAnswer(fact) {
  if (!fact) return null;
  let answer = `${fact.value}`;
  if (fact.unit) answer += ` ${fact.unit}`;
  if (fact.detail) answer += ` — ${fact.detail}`;
  if (fact.source) answer += `\n(${fact.source})`;
  return answer;
}

function generateComparisonAnswer(query) {
  const qNorm = normalize(query);

  // Detect comparison words
  if (qNorm.includes("قارن") || qNorm.includes("فرق") || qNorm.includes("مقارنة")) {
    // Try to find two facts to compare
    const keys = Object.keys(KB);
    const matched = [];
    for (const key of keys) {
      if (matchKBKey(query, key) > 3) matched.push({ key, ...KB[key] });
    }
    if (matched.length >= 2) {
      return `مقارنة:\n• ${matched[0].key}: ${matched[0].value}\n• ${matched[1].key}: ${matched[1].value}`;
    }
  }
  return null;
}

function generateTrendAnswer(query) {
  const qNorm = normalize(query);
  if (qNorm.includes("اتجاه") || qNorm.includes("تطور") || qNorm.includes("over time") || qNorm.includes("تاريخي")) {
    // Find related trend data
    if (qNorm.includes("دين")) {
      return "اتجاه الدين:\n• 2023: 96%\n• 2025: 82.5%\n• 2026: 84.2%\n• 2027 (مستهدف): 78.1%\n• 2030 (متوقع): 69.9%\nالاتجاه عاملاً نزولي بفضل الفائض الأولي.";
    }
    if (qNorm.includes("استثمار")) {
      return "اتجاه معدل الاستثمار:\n• 2025: 12.9%\n• 2026: 14.5%\n• 2027: 17%\nالاستثمارات الكلية 4.17 تريليون جنيه.";
    }
  }
  return null;
}

function generateRandomFact() {
  const keys = Object.keys(KB);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return `معلومة: ${randomKey} = ${KB[randomKey].value} ${KB[randomKey].unit} — ${KB[randomKey].detail}`;
}

// ═══════════════════════════════════════════════════════════
// ─── MAIN EXPORT ────────────────────────────────────────
// ═══════════════════════════════════════════════════════════

/**
 * Find the best matching response for a user query.
 *
 * @param {string} query
 * @returns {{ reply: string, confidence: number }}
 */
export function getChatResponse(query) {
  const norm = normalize(query);
  if (!norm) {
    return { reply: "اكتب سؤالك عن الموازنة وأنا جاهز اجاوبك!", confidence: 1 };
  }

  // 1. Check pattern matches (reetings, help, etc.)
  let bestPattern = null;
  let bestPatternScore = 0;
  for (const p of PATTERNS) {
    const score = matchPatternKey(query, p.q);
    if (score > bestPatternScore) {
      bestPatternScore = score;
      bestPattern = p;
    }
  }

  // 2. Check knowledge base
  let bestKBKey = null;
  let bestKBScore = 0;
  for (const key of Object.keys(KB)) {
    const score = matchKBKey(query, key);
    if (score > bestKBScore) {
      bestKBScore = score;
      bestKBKey = key;
    }
  }

  // 3. Check trend/comparison queries
  const trendAnswer = generateTrendAnswer(query);
  const comparisonAnswer = generateComparisonAnswer(query);

  // 4. Determine best response
  const scores = [
    { type: 'pattern', score: bestPatternScore, data: bestPattern },
    { type: 'kb', score: bestKBScore, data: bestKBKey },
    { type: 'trend', score: trendAnswer ? 10 : 0, data: trendAnswer },
    { type: 'comparison', score: comparisonAnswer ? 10 : 0, data: comparisonAnswer },
  ].sort((a, b) => b.score - a.score);

  const best = scores[0];

  if (best.type === 'pattern' && best.score >= 3) {
    return { reply: best.data.a, confidence: Math.min(best.score / 10, 1) };
  }

  if (best.type === 'kb' && best.score >= 3) {
    const answer = generateAnswer(KB[best.data]);
    return { reply: answer, confidence: Math.min(best.score / 10, 1) };
  }

  if (best.type === 'trend' && trendAnswer) {
    return { reply: trendAnswer, confidence: 0.9 };
  }

  if (best.type === 'comparison' && comparisonAnswer) {
    return { reply: comparisonAnswer, confidence: 0.9 };
  }

  // 5. Try partial KB matches
  const partialMatches = [];
  for (const key of Object.keys(KB)) {
    const score = matchKBKey(query, key);
    if (score > 2) partialMatches.push({ key, score, ...KB[key] });
  }
  partialMatches.sort((a, b) => b.score - a.score);

  if (partialMatches.length > 0) {
    const top = partialMatches[0];
    return { reply: generateAnswer(top), confidence: 0.6 };
  }

  // 6. Random fact for unknown queries
  if (norm.includes("معلومة") || norm.includes("حكي") || norm.includes("fact")) {
    return { reply: generateRandomFact(), confidence: 0.5 };
  }

  // 7. Fallback
  return {
    reply: "مش فاهم السؤال ده. جرّب تسأل عن:\n• المصروفات والإيرادات\n• العجز والفائض\n• الدين العام والفوائد\n• التعليم والصحة\n• الاستثمارات وحياة كريمة\n• 100 جنيه بتروح فين\n• أي رقم أو مؤشر في الموازنة",
    confidence: 0,
  };
}

// ─── Suggested Questions ────────────────────────────────

export const suggestedQuestions = [
  "كم ميزانية التعليم؟",
  "ايه هو العجز؟",
  "الدين وصل لكام؟",
  "100 جنيه بتروح فين؟",
  "كم الناتج المحلي؟",
  "ايه هي حياة كريمة؟",
];
