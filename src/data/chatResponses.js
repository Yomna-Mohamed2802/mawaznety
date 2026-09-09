const RESPONSES = {
  ar: {
    greeting: {
      keywords: ["hi", "hello", "hey", "مرحبا", "اهلا", "أهلا", "السلام", "صباح", "مساء", "عامل", "ازيك", "ازيكم", "اخبارك"],
      response: `أهلاً بيك! 👋 أنا مساعد موازنتي وأقدر أساعدك في أي سؤال عن الموازنة العامة المصرية 2026/2027.

جرب تسألني عن أي حاجة زي:
• إيه هي الموازنة؟
• فلوس الدولة بتروح فين؟
• التعليم والصحة واخدين كام؟
• 100 جنيه بتتوزع إزاي؟
• الديون وضعها إزاي؟`,
    },
    deficit: {
      keywords: ["عجز", "عجز الموازنة", "عجز الميزانية", "المالية بتقول ايه", "الموازنة贵", "فين العجز", "العجز كام"],
      response: `الموازنة العامة فيها عجز نقدر نقول عنه "عجز نقدي" بقيمة حوالي 1,131,599 مليون جنيه (≈1.13 تريليون جنيه) وده بيمثل 4.6% من الناتج المحلي.

يعني ايه؟ ببساطة: الدولة بتصرف أكتر مما بتجمع. بتصرف 5.2 تريليون جنيه وتدخل 4.1 تريليون جنيه. الفجوة دي هي العجز.

بس في نفس الوقت فيه "فائض أولي" بـ 1,217,181 مليون جنيه (≈1.22 تريليون) وده معناه إن الإيرادات ناقص المصروفات بدون فوائد الدين = فائض. بس أول حاجة من الفائض بتروح لأ فوائد الدين.` },
    education: {
      keywords: ["تعليم", "التعليم", "مدارس", "جامعات", "طلاب", "كتب", "طباعة كتب", "مدرسين", "بحث علمي"],
      response: `مجموع التعليم في موازنة 2026/2027 هو 1,229.7 مليار جنيه وده حوالي 6% من الناتج المحلي — وده أعلى من الحد الأدنى القانوني (4% تعليم قبل جامعي + 2% جامعي).

من أبرز بنود التعليم:
• طباعة الكتب المدرسية: 7.8 مليار جنيه
• التغذية المدرسية: 7 مليار جنيه
• مخصصات البحث العلمي: 205.2 مليار جنيه = 1% من الناتج (الحد الدستوري)

الزيادة عن السنة اللي فاتة حوالي 20%.` },
    health: {
      keywords: ["صحة", "علاج", "أدوية", "مستشفيات", "تأمين صحي", "طبيب", "صحي"],
      response: `مجموع الصحة في موازنة 2026/2027 هو 862.9 مليار جنيه = 4.2% من الناتج المحلي.

من أبرز البند:
• هيئة الشراء الموحد (أدوية ومستلزمات): 90.5 مليار (+25%)
• العلاج على نفقة الدولة والتأمين: 47.5 مليار (+69%)
• دعم التأمين الصحي الشامل: 16.6 مليار (+215.8% لغير القادرين)
• الأدوية: 33.3 مليار (+51.7%)
• المستلزمات الطبية: 15.9 مليار (+44.5%)

الحد الأدنى القانوني 3% — مصر بتصرف أكتر من القانون.` },
    spending100: {
      keywords: ["100 جنيه", "مئة جنيه", "كل 100 جنيه", "100جنيه", "كل مئة", "بينزل فين", "بتروح فين", "بتوزع إزاي"],
      response: `من كل 100 جنيه بتصرفهم الدولة:

• 46.6 جنيه ← فوائد الدين (أكبر بند! وهيبقى كده لحد ما الدين يقل)
• 16.1 جنيه ← دعم (كهرباء + غذاء + مياه + إسكان)
• 15.9 جنيه ← أجور ورواتب (3.4 مليون موظف)
• 10.7 جنيه ← استثمارات (طرق + مشاريع قومية)
• 5.7 جنيه ← سلع وخدمات (شراء أدوية + مستلزمات)
• 5.0 جنيه ← أخرى` },
    debt: {
      keywords: ["دين", "الدين", "قروض", "سندات", "فوائد الدين", "فاتورة الدين", "الدين الخارجي", "السندات", "أذون"],
      response: `الدين العام موضوع كبير في الموازنة دي:

• نسبة الدين/الناتج المحلي (يونيو 2026): 84.2%
• الهدف (يونيو 2027): 78.1% — بيقل!
• كان 82.5% (يونيو 2025) و 96% (يونيو 2023)
• الدين الخارجي: 78.5 مليار دولار
• نسبة فوائد الدين/الإيرادات: 60% (كانت 73% سابقاً) — بتحسّن!
• الهدف: 35% من المصروفات لخدمة الدين

الدولة بتصرف 46.6% من كل جنيه على فوائد الدين بس.` },
    social: {
      keywords: ["دعم", "تكافل", "كرامة", "رمضان", "حياة كريمة", "محدود", "الفقراء", "الاسر", "الدعم النقدي"],
      response: `دعم وحماية اجتماعية في 2026/2027:

• مجموع الدعم والمنح والمزايا: 836.8 مليار (+12.7%)
• السلع التموينية: 178.3 مليار — أكثر من 60 مليون مستفيد
• تكافل وكرامة: 55.2 مليار — 4.7 مليون أسرة مستفيدة
• دعم الكهرباء: 104.2 مليار (+39%)
• شراء القمح: 69.1 مليار
• حزمة رمضان 2026: 40.3 مليار
• حياة كريمة: 1 تريليون جنيه (3 مراحل) — المرحلة الأولى 88% تم إنفاقها` },
    revenue: {
      keywords: ["إيرادات", "ضرائب", "دخل", "السياسات الضريبية", "جمرك", "ضرائب", "الجمارك", "تحصيل"],
      response: `إجمالي الإيرادات في 2026/2027: 4,056,375 مليون جنيه (≈4.1 تريليون)

• الضرائب: 3,529,294 مليون (87% من الإيرادات)
• المنح والمساعدات: 19,761 مليون
• إيرادات أخرى: 507,319 مليون

معظم إيرادات الدولة من الضرائب. ضريبة القيمة المضافة والضرائب على الدخل والكاشات هي أكبر مصادر.` },
    spending: {
      keywords: ["مصروفات", "المصروفات", "مصروف", "انفاق", "الانفاق", "بتصرف", "بتنفق", "إجمالي المصروفات"],
      response: `إجمالي المصروفات 2026/2027: 5,187,975 مليون جنيه (≈5.2 تريليون)

الترتيب من أكبر لبند لأصغر:
1. فوائد الدين: 2,419,823 مليون (47.4%)
2. الدعم والتعويضات الاجتماعية: 836,826 مليون (16.1%)
3. الأجور والرواتب: 822,781 مليون (15.9%)
4. الاستثمارات: 553,693 مليون (10.7%)
5. السلع والخدمات: 293,719 مليون (5.7%)
6. أخرى: 261,132 مليون (5.0%)` },
    wages: {
      keywords: ["أجور", "رواتب", "مرتبات", "راتب", "مرتب", "موظفين", "الجهاز الإداري", "الحد الأدنى", "8000"],
      response: `الأجور والرواتب في 2026/2027: 822.8 مليار جنيه (3.4% من الناتج المحلي)

• نمو الأجور: 21.2% — أعلى نمو من 10 سنين
• الحد الأدنى الجديد: 8,000 جنيه (من يوليو 2026)

معناها إن الدولة رفعت المرتبات أكتر من أي سنة من 10 سنين.` },
    gdp: {
      keywords: ["الناتج", "GDP", "اقتصاد", "النمو", "معدل النمو", "نمو اقتصادي", "التضخم", "البطالة"],
      response: `مؤشرات الاقتصاد الكلي في 2026/2027:

• الناتج المحلي الإجمالي: 24.5 تريليون جنيه
• معدل النمو المستهدف: 5.4%
• معدل التضخم (المكمش): 9.3%
• معدل البطالة المستهدف: 6.2%
• معدل الاستثمار: 17%
• متوسط سعر الفائدة: 18%
• معدل الادخار: 10.5%` },
    overview: {
      keywords: ["موازنة", "الموازنة", "الموازنة العامة", "إجمالي", "مختصر", "ملخص", "إيه الموازنة", "ايه هي"],
      response: `موازنة 2026/2027 في几句:

📊 إجمالي المصروفات: 5.2 تريليون جنيه
💰 إجمالي الإيرادات: 4.1 تريليون جنيه
❌ العجز النقدي: 1.13 تريليون (4.6% من الناتج المحلي)
✅ الفائض الأولي: 1.22 تريليون

أهم حاجة تعرفها:
• 46.6% من كل جنيه بيصرفوا على فوائد الدين
• التعليم 6% من الناتج المحلي
• الصحة 4.2% من الناتج المحلي
• 836.8 مليار لدعم وحماية اجتماعية` },
    jobs: {
      keywords: ["وظائف", "عمالة", "توظيف", "تشغيل", "القطاع الخاص", "القطاع العام"],
      response: `بص، الدولة تستهدف معدل بطالة 6.2% في 2026/2027.

الاستثمار الخاص متوقع 2.2 تريليون جنيه (58.8% من إجمالي الاستثمار). الاستثمار العام 1.56 تريليون.

قطاع الأعمال العام استثماراته 262.9 مليار جنيه. الهيئات الاقتصادية 743.4 مليار.

الاستثمار في النقل أعلى всего: 640.1 مليار.` },
    mega: {
      keywords: ["عاصمة", "قناه", "طريق", "قومي", "مشروع قومي", "المشاريع القومية", "العاصمة الإدارية", "السويس"],
      response: `من أهم المشاريع القومية في الموازنة:

• العاصمة الإدارية الجديدة
• تطوير قناة السويس
• مشروع الطرق القومية

الاستثمار في البنية التحتية والاستثمار متوزع على قطاعات: النقل (640.1 مليار) والصناعة (281.3 مليار) والزراعة (173.2 مليار).` },
  },

  en: {
    greeting: {
      keywords: ["hi", "hello", "hey", "morning", "afternoon", "evening", "how are you", "whats up", "sup"],
      response: `Hi there! 👋 I'm Mawaznety Assistant. I can help you with anything about Egypt's 2026/2027 public budget.

Try asking me things like:
• What is the budget?
• Where does the money go?
• How much for education and health?
• How is 100 EGP distributed?
• What about the debt?`,
    },
    deficit: {
      keywords: ["deficit", "budget deficit", "spending more", "where is deficit", "deficit amount"],
      response: `The 2026/2027 budget has a cash deficit of about 1,131,599 million EGP (≈1.13 trillion), which is 4.6% of GDP.

In simple terms: the government spends more than it collects. It spends 5.2 trillion and collects 4.1 trillion. The gap is the deficit.

But there's also a "primary surplus" of 1,217,181 million EGP — meaning revenue minus spending excluding debt interest = surplus.` },
    education: {
      keywords: ["education", "school", "university", "students", "books", "research", "teacher"],
      response: `Total education budget 2026/2027: 1,229.7 billion EGP = 6% of GDP (above the legal minimum of 6%).

Key items:
• School books printing: 7.8 billion
• School nutrition: 7 billion
• Research: 205.2 billion = 1% of GDP (constitutional minimum)` },
    health: {
      keywords: ["health", "hospital", "medicine", "treatment", "doctors", "health insurance", "medical"],
      response: `Total health budget 2026/2027: 862.9 billion EGP = 4.2% of GDP.

Key items:
• Unified procurement authority (medicine/supplies): 90.5 billion
• State-funded treatment: 47.5 billion
• Health insurance for low income: 16.6 billion
• Medicine: 33.3 billion` },
    spending100: {
      keywords: ["100 egp", "every 100", "where does 100 go", "spending breakdown", "where does money go"],
      response: `From every 100 EGP the government spends:

• 46.6 EGP → Debt interest (largest item!)
• 16.1 EGP → Subsidies (electricity + food + water)
• 15.9 EGP → Wages and salaries
• 10.7 EGP → Investment (roads + national projects)
• 5.7 EGP → Goods and services
• 5.0 EGP → Other` },
    debt: {
      keywords: ["debt", "loans", "bonds", "interest", "external debt", "debt service", "securities"],
      response: `Public debt in 2026/2027:

• Debt/GDP ratio (June 2026): 84.2%
• Target (June 2027): 78.1% — decreasing!
• Was 82.5% (June 2025) and 96% (June 2023)
• External debt: $78.5 billion
• Interest as % of revenue: 60% (was 73%) — improving!` },
    social: {
      keywords: ["subsidies", "support", "takaful", "karama", "ramadan", "life dignity", "low income", "poor"],
      response: `Social protection 2026/2027:

• Total subsidies and grants: 836.8 billion (+12.7%)
• Food subsidies: 178.3 billion — 60+ million beneficiaries
• Takaful & Karama: 55.2 billion — 4.7 million families
• Electricity subsidies: 104.2 billion (+39%)
• Wheat: 69.1 billion
• Ramadan package 2026: 40.3 billion` },
    revenue: {
      keywords: ["revenue", "tax", "income", "customs", "taxation", "collection"],
      response: `Total revenue 2026/2027: 4,056,375 million EGP (≈4.1 trillion)

• Taxes: 3,529,294 million (87% of revenue)
• Grants and aid: 19,761 million
• Other revenue: 507,319 million

Most of Egypt's revenue comes from taxes (VAT, income tax, etc.).` },
    spending: {
      keywords: ["spending", "expenditure", "spends", "total spending", "spending items"],
      response: `Total expenditures 2026/2027: 5,187,975 million EGP (≈5.2 trillion)

From largest to smallest:
1. Debt interest: 2,419,823 million (47.4%)
2. Subsidies/social: 836,826 million (16.1%)
3. Wages/salaries: 822,781 million (15.9%)
4. Investment: 553,693 million (10.7%)
5. Goods/services: 293,719 million (5.7%)
6. Other: 261,132 million (5.0%)` },
    overview: {
      keywords: ["budget", "overview", "summary", "what is the budget", "general budget", "total"],
      response: `2026/2027 Budget at a glance:

📊 Total Spending: 5.2 trillion EGP
💰 Total Revenue: 4.1 trillion EGP
❌ Cash Deficit: 1.13 trillion (4.6% of GDP)
✅ Primary Surplus: 1.22 trillion

Key facts:
• 46.6% of every pound goes to debt interest
• Education: 6% of GDP
• Health: 4.2% of GDP
• 836.8 billion for social protection` },
  },
};

function detectIntent(message, lang = "ar") {
  const normalized = message.toLowerCase().trim();
  const langResponses = RESPONSES[lang] || RESPONSES.ar;

  let bestMatch = null;
  let bestScore = 0;

  for (const [key, data] of Object.entries(langResponses)) {
    const score = data.keywords.filter(kw =>
      normalized.includes(kw.toLowerCase())
    ).length;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = data.response;
    }
  }

  if (bestScore === 0) {
    return lang === "ar"
      ? "أنا آسف، مش فهم سؤالك. جرب تسأل عن:\n• المصروفات أو الإيرادات\n• التعليم أو الصحة\n• العجز أو الدين\n• دعم أو حماية اجتماعية\n• 100 جنيه بتروح فين؟"
      : "I'm sorry, I didn't understand your question. Try asking about:\n• Spending or revenue\n• Education or health\n• Deficit or debt\n• Subsidies or social protection\n• Where does 100 EGP go?";
  }

  return bestMatch;
}

export function getRuleBasedResponse(message, lang = "ar") {
  return detectIntent(message, lang);
}