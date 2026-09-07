/**
 * Quiz Questions Bank
 *
 * Educational questions about the budget.
 * Factual claims in questions/explanations are EXPLANATORY figures.
 * They are NOT official budget figures.
 *
 * Rule: Do NOT treat quiz content as official facts until verified.
 */

import { FISCAL_YEAR, BUDGET_SOURCE_ID } from "./meta";


export const quizQuestions = [
  {
    id: "q1",
    question: "ما هو إجمالي موازنة الدولة للسنة المالية 2026/2027؟",
    options: [
      "أقل من 3 تريليون جنيه",
      "بين 3 و 4 تريليون جنيه",
      "أكثر من 4 تريليون جنيه",
      "لا أعرف",
    ],
    correct: 2,
    explanation: "يتم تحديده بعد التحقق من ملف الموازنة",
    category: "budget_overview",
    difficulty: "easy",
    sourceId: BUDGET_SOURCE_ID,
    page: null,
  },
  {
    id: "q2",
    question: "ما هي أكبر بند في مصروفات الدولة؟",
    options: ["التعليم", "الدفاع", "خدمة الدين", "الصحة"],
    correct: 2,
    explanation: "خدمة الدين (أصل الدين + الفوائد) عادة ما تكون أكبر بند",
    category: "expenditures",
    difficulty: "medium",
    sourceId: BUDGET_SOURCE_ID,
    page: null,
  },
  {
    id: "q3",
    question: "ما هو الفائض الأولي في الموازنة؟",
    options: [
      "الإيرادات ناقص المصروفات الإجمالية",
      "الإيرادات ناقص المصروفات الجارية",
      "المصروفات ناقص الإيرادات",
      "الفرق بين الإيرادات والمصروفات",
    ],
    correct: 1,
    explanation: "الفائض الأولي = الإيرادات - المصروفات الجارية (باستثناء خدمة الدين)",
    category: "budget_overview",
    difficulty: "hard",
    sourceId: BUDGET_SOURCE_ID,
    page: null,
  },
  {
    id: "q4",
    question: "ما هي مصادر الإيرادات الرئيسية للدولة؟",
    options: [
      "الضرائب فقط",
      "الضرائب والإيرادات غير الضريبية",
      "البترول فقط",
      "الضرائب والبترول والمنح",
    ],
    correct: 3,
    explanation: "مصادر الإيرادات تشمل الضرائب والإيرادات غير الضريبية وعائدات الموارد والمنح",
    category: "revenues",
    difficulty: "easy",
    sourceId: BUDGET_SOURCE_ID,
    page: null,
  },
  {
    id: "q5",
    question: "ما هو نظام التأمين الصحي الشامل؟",
    options: [
      "نظام للعاملين في القطاع العام فقط",
      "نظام يغطي جميع المواطنين",
      "نظام للحالات الطارئة فقط",
      "نظام اختياري للمواطنين",
    ],
    correct: 1,
    explanation: "التأمين الصحي الشامل يهدف لتغطية جميع المواطنين",
    category: "health",
    difficulty: "easy",
    sourceId: BUDGET_SOURCE_ID,
    page: null,
  },
  {
    id: "q6",
    question: "ما هي المشاريع القومية الكبرى؟",
    options: [
      "مشاريع محلية صغيرة",
      "مشاريع حيوية تخدم مصر والمنطقة",
      "مشاريع خاصة بالشركات",
      "مشاريع لا تتعلق بالموازنة",
    ],
    correct: 1,
    explanation: "المشاريع القومية الكبرى مثل العاصمة الإدارية وتطوير قناة السويس",
    category: "infrastructure",
    difficulty: "easy",
    sourceId: BUDGET_SOURCE_ID,
    page: null,
  },
  {
    id: "q7",
    question: "ما هو برنامج التضامن الاجتماعي؟",
    options: [
      "برنامج للدعم المادي للمواطنين",
      "برنامج للتأمين الصحي",
      "برنامج للتعليم",
      "برنامج للدفاع",
    ],
    correct: 0,
    explanation: "برنامج التضامن الاجتماعي يهدف للدعم المادي للمواطنين الأشد حاجة",
    category: "social_protection",
    difficulty: "medium",
    sourceId: BUDGET_SOURCE_ID,
    page: null,
  },
  {
    id: "q8",
    question: "ما هي نموذج الموازنة الذي تتبعه مصر؟",
    options: [
      "موازنة استثمارية",
      "موازنة جارية",
      "موازنة مجمعة",
      "موازنة تنموية",
    ],
    correct: 2,
    explanation: "مصر تتبع نموذج الموازنة المجمعة التي تجمع بين الجارية والاستثمارية",
    category: "budget_overview",
    difficulty: "hard",
    sourceId: BUDGET_SOURCE_ID,
    page: null,
  },
];

export const quizCategories = [
  { id: "budget_overview", label: "نظرة عامة على الموازنة", icon: "Eye" },
  { id: "revenues", label: "الإيرادات", icon: "TrendingUp" },
  { id: "expenditures", label: "المصروفات", icon: "TrendingDown" },
  { id: "education", label: "التعليم", icon: "GraduationCap" },
  { id: "health", label: "الصحة", icon: "HeartPulse" },
  { id: "social_protection", label: "الحماية الاجتماعية", icon: "Shield" },
  { id: "infrastructure", label: "البنية التحتية", icon: "Building" },
];

export const quizSettings = {
  timePerQuestion: 30,
  passingScore: 60,
  showExplanation: true,
  randomizeQuestions: true,
  maxAttempts: 3,
};
