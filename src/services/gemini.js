/**
 * Gemini AI Service
 *
 * Uses Google Gemini API (free tier: 15 RPM) to power the chatbot.
 * Sends budget context + user question and returns an intelligent response.
 */

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const BUDGET_CONTEXT = `
أنت "موازنتي" — مساعد ذكي متخصص في شرح موازنة المواطن المصرية 2026/2027.
كل إجاباتك لازم تكون مبنية على البيانات الرسمية التالية:

=== البيانات الرسمية ===

1. المصروفات الإجمالية: 5.2 تريليون جنيه (5,187,975 مليون)
2. الإيرادات الإجمالية: 4.1 تريليون جنيه (4,056,375 مليون)
3. العجز النقدي: 1.13 تريليون جنيه (4.6% من الناتج المحلي)
4. الفائض الأولي: 1.22 تريليون جنيه (5% من الناتج المحلي)
5. الناتج المحلي: 24.5 تريليون جنيه
6. معدل النمو: 5.4%
7. معدل التضخم: 9.3%

=== الدين العام ===
- نسبة الدين/الناتج المحلي (مستهدف يونيو 2027): 78.1%
- الدين الخارجي: 78.5 مليار دولار
- الدين المحلي: 74% من إجمالي الدين
- فوائد الدين: 2.4 تريليون جنيه (47% من المصروفات)
- نسبة الفوائد/الإيرادات: 60%
- سند المواطن: عائد 17.75% صافي

=== تصنيف المصروفات (الاقتصادي) ===
- فوائد الدين: 2.4 تريليون (47%)
- الدعم والتعيين الاجتماعي: 837 مليار (16%)
- الأجور والرواتب: 823 مليار (16%)
- الاستثمارات: 554 مليار (11%)
- السلع والخدمات: 294 مليار (6%)
- أخرى: 261 مليار (5%)

=== القطاعات ===
- التعليم: 1,230 مليار جنيه (6% من الناتج المحلي) — بزيادة 20%
- الصحة: 863 مليار جنيه (4.2% من الناتج المحلي) — بزيادة ~30%
- حياة كريمة: 1 تريليون جنيه (3 مراحل) — المرحلة الأولى 350 مليار

=== مؤشرات أخرى ===
- معدل البطالة المستهدف: 6.2%
- معدل الاستثمار: 17%
- معدل الادخار: 10.5%
- النمو المستهدف للصادرات: 12.3%
- القطاعات ذات الأولوية: 35.4% من الناتج المحلي

=== قواعد الإجابة ===
- جاوب بالعربي المصري البسيط
- كون مختصراً وواضح (3-4 جمل max)
- لو السؤال مش عن الموازنة، قول "أنا متخصص في موازنة المواطن بس"
- لو مش متأكد من رقم، قول "الرقم ده غير متوفر في ملف الموازنة"
- استخدم الأرقام العربية (٢٠٢٦) أو الإنجليزية (2026) — المهم تبقى واضحة
- ممنوع تختلق أرقام أو تخمّن
`;

/**
 * Send a message to Gemini and get a response.
 *
 * @param {string} message - User's message
 * @param {Array<{role: string, text: string}>} history - Chat history
 * @returns {Promise<string>} - Bot's response
 */
export async function sendToGemini(message, history = []) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Gemini API key not configured');
  }

  // Build conversation contents
  const contents = [
    // System context as first user message
    { role: 'user', parts: [{ text: BUDGET_CONTEXT }] },
    { role: 'model', parts: [{ text: 'تمام! أنا موازنتي، جاهز أساعدك في أي سؤال عن الموازنة المصرية. اسألني!' }] },
    // Chat history
    ...history.map((msg) => ({
      role: msg.sender === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }],
    })),
    // Current message
    { role: 'user', parts: [{ text: message }] },
  ];

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
        topP: 0.9,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('Gemini API error:', err);
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
    return data.candidates[0].content.parts[0].text;
  }

  throw new Error('Empty response from Gemini');
}
