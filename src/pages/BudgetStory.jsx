import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../context/LangContext';
import Coin from '../components/ui/Coin';

/* ─── Inline Translations ──────────────────────────── */

const T = {
  ar: {
    badge: 'موازنة المواطن 2027/2026',
    title1: 'حكاية',
    title2: 'الجنيه المصري',
    desc: 'شرح مبسط لكل مفهوم في موازنة الدولة — من الإيرادات والمصروفات للدين العام والحماية الاجتماعية.',
    version: 'الإصدار الثالث عشر — أغسطس 2026',
    chapter: 'الفصل',
    ch1Title: 'يعني إيه موازنة؟',
    ch1p1: 'الموازنة هي خطة الدولة المالية لمدة سنة. بتحدد الدولة هتجيب فلوس منين (الإيرادات) وهتها فين (المصروفات).',
    ch1p2: 'زي بالظبط أنت لما بتبص على مرتبك وبتقرر تصرف كام على أكل وكام على مواصلات وكام توفر — الدولة بتعمل نفس الكلام بس بأرقام أكتر بكتير.',
    ch1p3: 'مصر بتعمل الموازنة بتاعتها كل سنة وبتقدمها للبرلمان للمناقشة والتصويت. الموازنة دي مش مجرد أرقام — هي قرارات بتأثر على حياتك كل يوم: تعليمك، صحتك، شوارعك، ومستقبلك.',
    ch1tip: 'معلومة مهمة',
    ch1tipText: 'موازنة 2026/2027 هي الإصدار الثالث عشر من "موازنة المواطن" — ملف إرشادي بيفسر الموازنة للمواطن المصري بأسلوب بسيط.',
    ch2Title: 'الأرقام الكبيرة — الصورة الكاملة',
    ch2p1: 'قبل ما نفصّل، خلينا نشوف الصورة الكبيرة. دي أرقام الموازنة الإجمالية لسنة 2026/2027:',
    ch2stat1: '٤.١ تريليون', ch2label1: 'إجمالي الإيرادات', ch2sub1: 'الفلوس اللي الدولة بتجيبها',
    ch2stat2: '٥.٢ تريليون', ch2label2: 'إجمالي المصروفات', ch2sub2: 'الفلوس اللي الدولة بتصرفها',
    ch2stat3: '١.١٣ تريليون', ch2label3: 'العجز النقدي', ch2sub3: 'الفرق بين الدخل والصرف',
    ch2stat4: '١.٢٢ تريليون', ch2label4: 'الفائض الأولي', ch2sub4: 'قبل فوائد الدين',
    ch2p2: 'يعني الدولة بتصرف أكتر مما بتجيب بحوالي ١.١٣ تريليون جنيه. الفرق ده اسمه العجز النقدي وبيمثل ٤.٦% من الناتج المحلي.',
    ch2p3: 'بس لو شلنا فوائد الدين من المعادلة، هنلاقي إن الدولة عندها فائض أولي بقيمة ١.٢٢ تريليون جنيه (٥% من الناتج المحلي). يعني الإيرادات كفاية تغطي كل المصروفات ما عدا فوائد الدين.',
    ch2tip: 'يعني إيه فائض أولي؟',
    ch2tipText: 'الفائض الأولي هو الفرق بين الإيرادات والمصروفات قبل دفع فوائد الدين. لو الفائض إيجابي، ده معناه إن الدولة بتجيب أكتر مما بتصرف في خدماتها ومشاريعها — المشكلة بس في فوائد الدين.',
    ch3Title: 'الناتج المحلي — قوة الاقتصاد',
    ch3p1: 'الناتج المحلي الإجمالي (GDP) هو قيمة كل البضائع والخدمات اللي انتجتها الدولة في سنة. هو المقياس الرئيسي لقوة الاقتصاد.',
    ch3stat1: '٢٤.٥ تريليون', ch3label1: 'الناتج المحلي', ch3sub1: 'قيمة الإنتاج الكلي',
    ch3stat2: '٥.٤%', ch3label2: 'معدل النمو', ch3sub2: 'النمو الحقيقي المتوقع',
    ch3stat3: '٩.٣%', ch3label3: 'معدل التضخم', ch3sub3: 'الضاغط السعري',
    ch3stat4: '١٧%', ch3label4: 'معدل الاستثمار', ch3sub4: 'نسبة الاستثمارات للناتج',
    ch3p2: 'مصر متوقع يتحقق منها نمو حقيقي ٥.٤% في 2026/2027. النمو ده معناه إن الاقتصاد بيكبر وبيوفر فرص عمل أكتر.',
    ch3p3: 'الناتج المحلي مش بس رقم — هو بيعكس قدرة الدولة على تقديم خدماتها وتحقيق أهدافها. كل ما الناتج أكبر، كل ما الموازنة بقت أقوى.',
    ch3tip: 'ليه النمو مهم؟',
    ch3tipText: 'لما الاقتصاد بينمو، الشركات بتكبر وبتوظف أكتر، الضرائب بتكتر، والدولة بتنفق أكتر على التعليم والصحة والبنية التحتية.',
    ch4Title: 'الإيرادات — الدولة بتجيب فلوس منين؟',
    ch4p1: 'إجمالي إيرادات الدولة ٤.٠٦ تريليون جنيه. الدولة بتجيب فلوسها من مصادر كتير:',
    ch4pct1: '٨٧٪', ch4name1: 'الضرائب', ch4val1: '٣.٥٣ تريليون جنيه', ch4desc1: 'ضريبة الدخل، ضريبة القيمة المضافة، الرسوم الجمركية، الدمغة',
    ch4pct2: '١٢.٥٪', ch4name2: 'إيرادات أخرى', ch4val2: '٥٠٧ مليار جنيه', ch4desc2: 'إيرادات المرافق العامة وصافي أرباح الجهات الحكومية',
    ch4pct3: '٠.٥٪', ch4name3: 'المنح والمساعدات', ch4val3: '١٩.٧ مليار جنيه', ch4desc3: 'منح دولية ومساعدات خارجية',
    ch4p2: 'الضرائب هي المصدر الرئيسي لإيرادات الدولة — ٨٧% من الإجمالي. ضريبة القيمة المضافة (VAT) هي أكبر ضريبة بتحصلها الدولة، وبعدها ضريبة الدخل والرسوم الجمركية.',
    ch4tip: 'ليه الضرائب مهمة؟',
    ch4tipText: 'الضرائب هي الدخل الأساسي للدولة. من غيرها، مفيش فلوس تعليم أو صحة أو شوارع. كل جنيه بتدفعه ضريبة بيرجعلك في خدمات.',
    ch5Title: 'المصروفات — الدولة بتنفق على إيه؟',
    ch5p1: 'إجمالي مصروفات الدولة ٥.١٩ تريليون جنيه. خلينا نشوف كل جنيه بيروح فين:',
    ch5barTitle: 'من كل ١٠٠ جنيه مصري',
    ch5l1: 'فوائد الدين', ch5l2: 'الدعم والحماية الاجتماعية', ch5l3: 'الأجور والرواتب', ch5l4: 'الاستثمارات', ch5l5: 'السلع والخدمات', ch5l6: 'أخرى (دفاع، أمن)',
    ch5p2: 'أكبر بند في المصروفات هو فوائد الدين — ٤٦.٦ جنيه من كل ١٠٠ جنيه. يعني تقريبًا نص الفلوس بتروح لسداد فوائد القروض.',
    ch5p3: 'بعدها comes الدعم والحماية الاجتماعية (١٦.١ جنيه) — وده بيشمل دعم السلع التموينية والكهرباء والإسكان. وبعدها الأجور والرواتب (١٥.٩ جنيه).',
    ch5tip: 'ليه فوائد الدين كبيرة كده؟',
    ch5tipText: 'الدين العام المصري كبير، وفوائده بتأخذ نصيب كبير من الموازنة. الحكومة بتحاول تقليل الدين عشان تحرر فلوس أكتر للصرف على الخدمات والمشاريع.',
    ch6Title: 'الدين العام — الفلوس اللي الدولة مقترضها',
    ch6p1: 'الدين العام هو إجمالي الفلوس اللي الدولة مقترضتها من بنوك وم figureات مالية مصرية ودولية.',
    ch6stat1: '٧٨.١٪', ch6label1: 'نسبة الدين المستهدفة', ch6sub1: 'يونيو 2027',
    ch6stat2: '٩٦٪', ch6label2: 'نسبة الدين ٢٠٢٣', ch6sub2: 'نقطة البداية',
    ch6stat3: '٧٤٪', ch6label3: 'الدين المحلي', ch6sub3: 'من إجمالي الدين',
    ch6stat4: '٧٨.٥ مليار$', ch6label4: 'الدين الخارجي', ch6sub4: 'يونيو 2025',
    ch6p2: 'مصر عندها خطة واضحة لتقليل الدين: من ٩٦% في ٢٠٢٣ لـ ٧٨.١% في ٢٠٢٧، ومنها لـ ٧٠% بحلول ٢٠٣٠.',
    ch6tip: 'الفرق بين دين أجهزة الموازنة ودين الحكومة العامة',
    ch6tipText: 'دين أجهزة الموازنة (٧٨.١%) بيشمل بس الوزارات والجهات الحكومية. دين الحكومة العامة (٨٩.٥%) أوسع.',
    ch6longTitle: 'التوقعات على المدى الطويل:',
    ch6y1: '٢٠٢٧/٢٠٢٨', ch6y2: '٢٠٢٨/٢٠٢٩', ch6y3: '٢٠٢٩/٢٠٣٠', ch6y4: 'هدف ٢٠٣٠',
    ch7Title: 'فوائد الدين — أكتر بند بياخد فلوس',
    ch7p1: 'فوائد الدين هي التكلفة اللي الدولة بتدفعها عشان القروض. زي لما بتاخد قرض من البنك وبتدفع عليه فائدة.',
    ch7stat1: '٢.٤٢ تريليون', ch7label1: 'فوائد الدين 2026/2027', ch7sub1: '٤٦.٦٪ من المصروفات',
    ch7stat2: '٦٠٪', ch7label2: 'نسبة الفوائد للإيرادات', ch7sub2: 'من إجمالي الإيرادات',
    ch7p2: 'فوائد الدين ٢.٤٢ تريليون جنيه — وده أكبر بند واحد في الموازنة كلها. تقريبًا ٦٠% من إيرادات الدولة بتروح لدفع فوائد الدين.',
    ch7p3: 'بس الخبر الحسن: النسبة دي بتقل. كانت ٧٣% وilityت لـ ٦٠%.',
    ch7tip: 'ليه الفوائد بتقل؟',
    ch7tipText: 'لما الدولة بتحسّن مؤشراتها الاقتصادية وبتقلل الدين، الفوائد بتقل. كمان الحكومة بتمتد آجال الدين.',
    ch8Title: 'الدعم والحماية الاجتماعية',
    ch8p1: 'الدولة بتنفق ٨٣٦.٨ مليار جنيه على الدعم والحماية الاجتماعية.',
    ch8stat1: '٨٣٦.٨ مليار', ch8label1: 'إجمالي الدعم', ch8sub1: '١٦.١٪ من المصروفات',
    ch8stat2: '٨,٠٠٠ جنيه', ch8label2: 'الحد الأدنى للدخل', ch8sub2: 'من يوليو 2026',
    ch8detailsTitle: 'تفاصيل الدعم:',
    ch8d1: 'سلع تموينية', ch8d2: 'دعم الكهرباء', ch8d3: 'شراء القمح', ch8d4: 'تحسين المناطق العشوائية', ch8d5: 'أدوية', ch8d6: 'إسكان', ch8d7: 'برنامج تكافل وكرامة', ch8d8: 'حزمة رمضان 2026',
    ch8tip: 'الحد الأدنى للدخل',
    ch8tipText: 'من يوليو 2026، الحد الأدنى للدخل وصل ٨,٠٠٠ جنيه شهريًا.',
    ch9Title: 'الأجور والرواتب — شغل الناس',
    ch9p1: 'الدولة بتصرف ٨٢٢.٨ مليار جنيه على الأجور والرواتب.',
    ch9stat1: '٨٢٢.٨ مليار', ch9label1: 'إجمالي الأجور', ch9sub1: '١٥.٩٪ من المصروفات',
    ch9stat2: '+٢١.٢٪', ch9label2: 'نمو سنوي', ch9sub2: 'مقارنة بالسنة اللي فاتت',
    ch9a1: 'علاوة دورية ١٢٪ للخدمة المدنية',
    ch9a2: 'علاوة ١٥٪ لغير المخاطبين بقانون الخدمة المدنية',
    ch9a3: 'حافز إضافي ٧٥٠ جنيه شهريًا',
    ch9a4: 'حافز تدريس ١,٠٠٠ جنيه للمعلمين',
    ch9a5: 'زيادة ٧٥٠ جنيه للقطاع الطبي',
    ch10Title: 'التعليم — استثمار في المستقبل',
    ch10p1: 'مصر بتصرف ١,٢٢٩.٧ مليار جنيه على التعليم — وده ٦% من الناتج المحلي.',
    ch10stat1: '١,٢٢٩.٧ مليار', ch10label1: 'مoubt التعليم', ch10sub1: '٦٪ من الناتج المحلي',
    ch10stat2: '+٢٠٪', ch10label2: 'نمو سنوي', ch10sub2: 'مقارنة بالسنة اللي فاتت',
    ch10a1: 'طباعة الكتب الدراسية', ch10a1v: '٥٥.٥ مليار',
    ch10a2: 'وجبات مدرسية', ch10a2v: '٧ مليار',
    ch10a3: 'البحث العلمي (١٪ من GDP)', ch10a3v: '٢٠٥.٢ مليار',
    ch10tip: 'ليه التعليم مهم؟',
    ch10tipText: 'التعليم هو الاستثمار الأكبر في مستقبل الدولة. كل جنيه في التعليم بيرجع في شكل كوادر مؤهلة وابتكار.',
    ch11Title: 'الصحة — صحتك على راسنا',
    ch11p1: 'مصر بتصرف ٨٦٢.٩ مليار جنيه على الصحة — وده ٤.٢% من الناتج المحلي.',
    ch11stat1: '٨٦٢.٩ مليار', ch11label1: 'مoubt الصحة', ch11sub1: '٤.٢٪ من الناتج المحلي',
    ch11stat2: '+٣٩.٦٪', ch11label2: 'نمو سنوي', ch11sub2: 'مقارنة بالسنة اللي فاتت',
    ch11a1: 'الشراء الموحد للعقاقير', ch11a1v: '٩٠.٥ مليار',
    ch11a2: 'علاج المواطنين', ch11a2v: '٤٧.٥ مليار',
    ch11a3: 'الأدوية', ch11a3v: '٣٣.٣ مليار',
    ch11a4: 'دعم التأمين الصحي', ch11a4v: '١٦.٦ مليار',
    ch12Title: 'الاستثمارات — بناء المستقبل',
    ch12p1: 'الدولة بتستثمر ٥٥٣.٧ مليار جنيه في مشاريع استثمارية.',
    ch12stat1: '٥٥٣.٧ مليار', ch12label1: 'استثمارات الحكومة', ch12sub1: 'من إجمالي ٤.١٧ تريليون',
    ch12stat2: '٤.١٧ تريليون', ch12label2: 'إجمالي الاستثمارات', ch12sub2: 'خاصة + حكومية',
    ch12a1: 'النقل والمواصلات', ch12a1v: '٦٤٠.١ مليار',
    ch12a2: 'الصناعة والموارد المعدنية', ch12a2v: '٢٨١.٣ مليار',
    ch12a3: 'الزراعة ومصائد الأسماك', ch12a3v: '١٧٣.٢ مليار',
    ch12tip: 'الاستثمارات الخاصة',
    ch12tipText: '٥٨.٨% من الاستثمارات الإجمالية من القطاع الخاص.',
    ch13Title: 'حياة كريمة — مشروع تطوير الريف المصري',
    ch13p1: 'مشروع "حياة كريمة" هو أكبر مشروع تنموي في مصر — ١ تريليون جنيه على ٣ مراحل.',
    ch13stat1: '١ تريليون', ch13label1: 'القيمة الإجمالية', ch13sub1: 'على ٣ مراحل',
    ch13stat2: '٨٨٪', ch13label2: 'نسبة الصرف', ch13sub2: 'المرحلة الأولى',
    ch13p2: 'المرحلة الأولى خلصت بنسبة تنفيذ ٨٨%. المرحلة الثانية متوقع فيها ١٥٠ مليار جنيه.',
    ch14Title: 'البرامج الاقتصادية — دعم الإنتاج',
    ch14p1: 'الدولة بتصرف ٩٠ مليار جنيه في برامج اقتصادية لدعم الشركات والمصانع والصادرات.',
    ch14a1: 'رد الأعباء التصديرية', ch14a1v: '٤٨ مليار',
    ch14a2: 'دعم السياحة', ch14a2v: '٦.٧ مليار',
    ch14a3: 'التسهيلات الإنتاجية', ch14a3v: '٦ مليار',
    ch14a4: 'صناعة السيارات', ch14a4v: '٥.٥ مليار',
    ch14a5: 'المشاريع الصغيرة والمتوسطة', ch14a5v: '٥ مليار',
    ch15Title: 'المشاريع القومية الكبرى',
    ch15p1: 'مصر بتنفذ مشاريع كبرى بتغير شكل الاقتصاد:',
    ch15a1Title: 'العاصمة الإدارية الجديدة', ch15a1Desc: 'مدينة إدارية جديدة بالكامل — مكاتب الحكومة والسفارات والأعمال',
    ch15a2Title: 'تنمية قناة السويس', ch15a2Desc: 'توسعة القناة وتطوير الموانئ والمناطق الصناعية',
    ch15a3Title: 'الطرق الوطنية', ch15a3Desc: 'شبكة طرق جديدة بربط المحافظات وبتقلل وقت السفر',
    ch16Title: 'الخلاصة — الجنيه بيوصلك إزاي',
    ch16p1: 'دلوقتي فاهم يعني إيه موازنة وإزاي جنيهاتك بتوصل لحدك. كل رقم في الموازنة دي قرار — قرار يأثر على مدرستك، مستشفاك، شارعك، ومستقبلك.',
    ch16cta1: 'مش مجرد أرقام.',
    ch16cta2: 'دي موازنة بلدك.',
    ch16p2: 'الموازنة مش شيء بعيد عنك — هي قرارات بتأثر على حياتك كل يوم.',
    ch16btn1: 'شوف حكاية الجنيه',
    ch16btn2: 'جرّب ميزانية ١٠٠ جنيه',
  },
  en: {
    badge: 'Citizen Budget 2027/2026',
    title1: 'The Story',
    title2: 'of the Egyptian Pound',
    desc: 'A simple explanation of every concept in the state budget — from revenues and expenditures to public debt and social protection.',
    version: 'Thirteenth Edition — August 2026',
    chapter: 'Chapter',
    ch1Title: 'What is a Budget?',
    ch1p1: 'The budget is the state\'s financial plan for one year. It determines where the state gets its money (revenues) and where it spends it (expenditures).',
    ch1p2: 'Just like when you look at your salary and decide how much to spend on food, transport, and savings — the state does the same thing, but with much larger numbers.',
    ch1p3: 'Egypt prepares its budget every year and presents it to parliament for discussion and voting. This budget isn\'t just numbers — it\'s decisions that affect your life every day: your education, health, streets, and future.',
    ch1tip: 'Important Fact',
    ch1tipText: 'The 2026/2027 budget is the thirteenth edition of the "Citizen Budget" — an explanatory document that simplifies the budget for Egyptian citizens.',
    ch2Title: 'The Big Numbers — The Full Picture',
    ch2p1: 'Before we dive into details, let\'s look at the big picture. These are the total budget figures for 2026/2027:',
    ch2stat1: '4.1 Trillion', ch2label1: 'Total Revenues', ch2sub1: 'Money the state collects',
    ch2stat2: '5.2 Trillion', ch2label2: 'Total Expenditures', ch2sub2: 'Money the state spends',
    ch2stat3: '1.13 Trillion', ch2label3: 'Cash Deficit', ch2sub3: 'Gap between income and spending',
    ch2stat4: '1.22 Trillion', ch2label4: 'Primary Surplus', ch2sub4: 'Before debt interest',
    ch2p2: 'The state spends about 1.13 trillion EGP more than it earns. This gap is called the cash deficit and represents 4.6% of GDP.',
    ch2p3: 'But if we remove debt interest from the equation, the state has a primary surplus of 1.22 trillion EGP (5% of GDP). This means revenues cover all expenditures except debt interest.',
    ch2tip: 'What is a Primary Surplus?',
    ch2tipText: 'The primary surplus is the difference between revenues and expenditures before paying debt interest. A positive surplus means the state earns more than it spends on services and projects — the issue is only with debt interest.',
    ch3Title: 'GDP — The Economy\'s Strength',
    ch3p1: 'Gross Domestic Product (GDP) is the value of all goods and services produced by the state in one year. It\'s the primary measure of economic strength.',
    ch3stat1: '24.5 Trillion', ch3label1: 'GDP', ch3sub1: 'Total production value',
    ch3stat2: '5.4%', ch3label2: 'Growth Rate', ch3sub2: 'Expected real growth',
    ch3stat3: '9.3%', ch3label3: 'Inflation Rate', ch3sub3: 'Price pressure',
    ch3stat4: '17%', ch3label4: 'Investment Rate', ch3sub4: 'Investment-to-GDP ratio',
    ch3p2: 'Egypt is expected to achieve real growth of 5.4% in 2026/2027. This growth means the economy is expanding and creating more jobs.',
    ch3p3: 'GDP isn\'t just a number — it reflects the state\'s ability to deliver services and achieve its goals. The larger the GDP, the stronger the budget.',
    ch3tip: 'Why Does Growth Matter?',
    ch3tipText: 'When the economy grows, companies expand and hire more, tax revenues increase, and the state spends more on education, health, and infrastructure.',
    ch4Title: 'Revenues — Where Does the State Get Its Money?',
    ch4p1: 'Total state revenues are 4.06 trillion EGP. The state gets its money from multiple sources:',
    ch4pct1: '87%', ch4name1: 'Taxes', ch4val1: '3.53 Trillion EGP', ch4desc1: 'Income tax, VAT, customs duties, stamps',
    ch4pct2: '12.5%', ch4name2: 'Other Revenues', ch4val2: '507 Billion EGP', ch4desc2: 'Public facility revenues and net government entity profits',
    ch4pct3: '0.5%', ch4name3: 'Grants & Aid', ch4val3: '19.7 Billion EGP', ch4desc3: 'International grants and foreign aid',
    ch4p2: 'Taxes are the main source of state revenues — 87% of the total. VAT is the largest tax collected, followed by income tax and customs duties.',
    ch4tip: 'Why Are Taxes Important?',
    ch4tipText: 'Taxes are the state\'s primary income. Without them, there\'s no money for education, health, or roads. Every pound you pay in taxes comes back to you as services.',
    ch5Title: 'Expenditures — Where Does the State Spend?',
    ch5p1: 'Total state expenditures are 5.19 trillion EGP. Let\'s see where each pound goes:',
    ch5barTitle: 'For Every 100 Egyptian Pounds',
    ch5l1: 'Debt Interest', ch5l2: 'Subsidies & Social Protection', ch5l3: 'Wages & Salaries', ch5l4: 'Investments', ch5l5: 'Goods & Services', ch5l6: 'Other (Defense, Security)',
    ch5p2: 'The largest item in expenditures is debt interest — 46.6 pounds out of every 100. This means nearly half the money goes to paying loan interest.',
    ch5p3: 'Next comes subsidies & social protection (16.1 pounds) — covering food subsidies, electricity, and housing. Then wages & salaries (15.9 pounds).',
    ch5tip: 'Why Is Debt Interest So High?',
    ch5tipText: 'Egypt\'s public debt is large, and its interest takes a significant share of the budget. The government is working to reduce debt to free up more funds for services and projects.',
    ch6Title: 'Public Debt — Money the State Has Borrowed',
    ch6p1: 'Public debt is the total money the state has borrowed from banks and financial institutions, both Egyptian and international.',
    ch6stat1: '78.1%', ch6label1: 'Target Debt Ratio', ch6sub1: 'June 2027',
    ch6stat2: '96%', ch6label2: 'Debt Ratio 2023', ch6sub2: 'Starting Point',
    ch6stat3: '74%', ch6label3: 'Local Debt', ch6sub3: 'Of total debt',
    ch6stat4: '$78.5B', ch6label4: 'External Debt', ch6sub4: 'June 2025',
    ch6p2: 'Egypt has a clear plan to reduce debt: from 96% in 2023 to 78.1% in 2027, and then to 70% by 2030.',
    ch6tip: 'Difference Between Budget Agency Debt and General Government Debt',
    ch6tipText: 'Budget agency debt (78.1%) includes only ministries and government entities. General government debt (89.5%) is broader.',
    ch6longTitle: 'Long-term Projections:',
    ch6y1: '2027/2028', ch6y2: '2028/2029', ch6y3: '2029/2030', ch6y4: '2030 Target',
    ch7Title: 'Debt Interest — The Biggest Spending Item',
    ch7p1: 'Debt interest is the cost the state pays for loans. Like when you take a bank loan and pay interest on it.',
    ch7stat1: '2.42 Trillion', ch7label1: 'Debt Interest 2026/2027', ch7sub1: '46.6% of expenditures',
    ch7stat2: '60%', ch7label2: 'Interest-to-Revenue Ratio', ch7sub2: 'Of total revenues',
    ch7p2: 'Debt interest is 2.42 trillion EGP — the single largest item in the entire budget. About 60% of state revenues go to paying debt interest.',
    ch7p3: 'But here\'s the good news: this ratio is declining. It was 73% and has dropped to 60%.',
    ch7tip: 'Why Is Interest Declining?',
    ch7tipText: 'When the state improves its economic indicators and reduces debt, interest costs decrease. The government is also extending debt maturities.',
    ch8Title: 'Subsidies & Social Protection',
    ch8p1: 'The state spends 836.8 billion EGP on subsidies and social protection.',
    ch8stat1: '836.8 Billion', ch8label1: 'Total Subsidies', ch8sub1: '16.1% of expenditures',
    ch8stat2: '8,000 EGP', ch8label2: 'Minimum Income', ch8sub2: 'From July 2026',
    ch8detailsTitle: 'Subsidy Details:',
    ch8d1: 'Subsidized goods', ch8d2: 'Electricity subsidies', ch8d3: 'Wheat purchasing', ch8d4: 'Informal area development', ch8d5: 'Medicines', ch8d6: 'Housing', ch8d7: 'Takaful & Karama program', ch8d8: 'Ramadan 2026 package',
    ch8tip: 'Minimum Income',
    ch8tipText: 'From July 2026, the minimum income reached 8,000 EGP per month.',
    ch9Title: 'Wages & Salaries — People\'s Earnings',
    ch9p1: 'The state spends 822.8 billion EGP on wages and salaries.',
    ch9stat1: '822.8 Billion', ch9label1: 'Total Wages', ch9sub1: '15.9% of expenditures',
    ch9stat2: '+21.2%', ch9label2: 'Annual Growth', ch9sub2: 'Compared to last year',
    ch9a1: 'Periodic 12% raise for civil service',
    ch9a2: '15% raise for those outside civil service law',
    ch9a3: 'Additional 750 EGP monthly incentive',
    ch9a4: '1,000 EGP teaching incentive for teachers',
    ch9a5: '750 EGP increase for medical sector',
    ch10Title: 'Education — Investing in the Future',
    ch10p1: 'Egypt spends 1,229.7 billion EGP on education — that\'s 6% of GDP.',
    ch10stat1: '1,229.7 Billion', ch10label1: 'Education Budget', ch10sub1: '6% of GDP',
    ch10stat2: '+20%', ch10label2: 'Annual Growth', ch10sub2: 'Compared to last year',
    ch10a1: 'Textbook printing', ch10a1v: '55.5 Billion',
    ch10a2: 'School meals', ch10a2v: '7 Billion',
    ch10a3: 'Scientific research (1% of GDP)', ch10a3v: '205.2 Billion',
    ch10tip: 'Why Is Education Important?',
    ch10tipText: 'Education is the largest investment in the state\'s future. Every pound spent on education returns as qualified human capital and innovation.',
    ch11Title: 'Health — Your Health Comes First',
    ch11p1: 'Egypt spends 862.9 billion EGP on health — that\'s 4.2% of GDP.',
    ch11stat1: '862.9 Billion', ch11label1: 'Health Budget', ch11sub1: '4.2% of GDP',
    ch11stat2: '+39.6%', ch11label2: 'Annual Growth', ch11sub2: 'Compared to last year',
    ch11a1: 'Unified medicine procurement', ch11a1v: '90.5 Billion',
    ch11a2: 'Citizen treatment', ch11a2v: '47.5 Billion',
    ch11a3: 'Medicines', ch11a3v: '33.3 Billion',
    ch11a4: 'Health insurance support', ch11a4v: '16.6 Billion',
    ch12Title: 'Investments — Building the Future',
    ch12p1: 'The state invests 553.7 billion EGP in investment projects.',
    ch12stat1: '553.7 Billion', ch12label1: 'Government Investments', ch12sub1: 'Of total 4.17 trillion',
    ch12stat2: '4.17 Trillion', ch12label2: 'Total Investments', ch12sub2: 'Private + Government',
    ch12a1: 'Transport & Communications', ch12a1v: '640.1 Billion',
    ch12a2: 'Industry & Mineral Resources', ch12a2v: '281.3 Billion',
    ch12a3: 'Agriculture & Fisheries', ch12a3v: '173.2 Billion',
    ch12tip: 'Private Investments',
    ch12tipText: '58.8% of total investments are from the private sector.',
    ch13Title: 'Decent Life — Developing Rural Egypt',
    ch13p1: 'The "Decent Life" initiative is Egypt\'s largest development project — 1 trillion EGP across 3 phases.',
    ch13stat1: '1 Trillion', ch13label1: 'Total Value', ch13sub1: 'Across 3 phases',
    ch13stat2: '88%', ch13label2: 'Execution Rate', ch13sub2: 'First Phase',
    ch13p2: 'The first phase was completed with 88% execution. The second phase is expected to receive 150 billion EGP.',
    ch14Title: 'Economic Programs — Supporting Production',
    ch14p1: 'The state spends 90 billion EGP on economic programs to support companies, factories, and exports.',
    ch14a1: 'Export cost reimbursement', ch14a1v: '48 Billion',
    ch14a2: 'Tourism support', ch14a2v: '6.7 Billion',
    ch14a3: 'Production facilities', ch14a3v: '6 Billion',
    ch14a4: 'Automotive industry', ch14a4v: '5.5 Billion',
    ch14a5: 'Small & medium enterprises', ch14a5v: '5 Billion',
    ch15Title: 'Major National Projects',
    ch15p1: 'Egypt is implementing major projects that are transforming the economy:',
    ch15a1Title: 'New Administrative Capital', ch15a1Desc: 'An entirely new administrative city — government offices, embassies, and businesses',
    ch15a2Title: 'Suez Canal Development', ch15a2Desc: 'Canal expansion and port and industrial zone development',
    ch15a3Title: 'National Roads', ch15a3Desc: 'A new road network connecting governorates and reducing travel time',
    ch16Title: 'Conclusion — How the Pound Reaches You',
    ch16p1: 'Now you understand what a budget is and how your pounds reach you. Every number in this budget is a decision — a decision that affects your school, hospital, street, and future.',
    ch16cta1: 'Not just numbers.',
    ch16cta2: 'This is your country\'s budget.',
    ch16p2: 'The budget isn\'t something far from you — it\'s decisions that affect your life every day.',
    ch16btn1: 'See the Story of the Pound',
    ch16btn2: 'Try the 100 Pound Budget',
  },
};

function Section({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}

function Stat({ value, label, sub }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary-100/40 hover:shadow-md transition-shadow">
      <p className="text-3xl font-black text-primary-900 mb-1">{value}</p>
      <p className="text-sm font-bold text-primary-700">{label}</p>
      {sub && <p className="text-xs text-primary-400 mt-1">{sub}</p>}
    </div>
  );
}

function Chapter({ num, title, children, chapterLabel }) {
  return (
    <Section className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary-900 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-black text-lg">{num}</span>
        </div>
        <div>
          <p className="text-primary-400 text-[10px] tracking-[0.3em] uppercase font-medium">{chapterLabel} {num}</p>
          <h2 className="text-2xl sm:text-3xl font-black text-primary-900">{title}</h2>
        </div>
      </div>
      <div className="text-primary-600 leading-[1.9] space-y-4 text-[15px]">{children}</div>
    </Section>
  );
}

function TipBox({ title, children }) {
  return (
    <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-5 mt-4">
      <p className="text-xs text-amber-700 mb-2 font-bold">{title}</p>
      <p className="text-sm text-primary-600">{children}</p>
    </div>
  );
}

function ListItem({ color = 'bg-primary-500', val, label }) {
  const colorMap = {
    'bg-primary-500': 'text-primary-700',
    'bg-emerald-500': 'text-emerald-700',
    'bg-blue-500': 'text-blue-700',
    'bg-violet-500': 'text-violet-700',
    'bg-amber-500': 'text-amber-700',
  };
  return (
    <div className="flex items-center gap-3 p-3 bg-surface-warm rounded-xl">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      {val && <span className={`text-xs font-bold w-24 ${colorMap[color] || 'text-primary-700'}`}>{val}</span>}
      <span className="text-xs text-primary-600">{label}</span>
    </div>
  );
}

export default function BudgetStory() {
  const { lang } = useLang();
  const t = T[lang] || T.ar;

  return (
    <div className="min-h-screen bg-surface" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="fixed top-0 left-0 right-0 h-1 z-[100]">
        <div className="h-full bg-gradient-to-l from-primary-700 to-primary-500" style={{ width: '100%' }} />
      </div>

      <section className="relative py-24 sm:py-32 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary-200/20 blur-[100px]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <Section>
            <div className="flex justify-center mb-8">
              <Coin size={120} spinning={true} />
            </div>
          </Section>
          <Section delay={0.1}>
            <p className="text-primary-400 text-xs tracking-[0.5em] uppercase mb-6 font-medium">{t.badge}</p>
          </Section>
          <Section delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-900 leading-[1.2] mb-6">
              {t.title1}<br />
              <span className="bg-gradient-to-l from-primary-700 to-primary-500 bg-clip-text text-transparent">{t.title2}</span>
            </h1>
          </Section>
          <Section delay={0.3}>
            <p className="text-primary-500 text-lg leading-relaxed max-w-lg mx-auto">
              {t.desc}
            </p>
          </Section>
          <Section delay={0.4}>
            <p className="text-primary-300 text-xs mt-8">{t.version}</p>
          </Section>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-32">

        <Chapter num="١" title={t.ch1Title} chapterLabel={t.chapter}>
          <p>{t.ch1p1}</p>
          <p>{t.ch1p2}</p>
          <p>{t.ch1p3}</p>
          <TipBox title={t.ch1tip}>{t.ch1tipText}</TipBox>
        </Chapter>

        <Chapter num="٢" title={t.ch2Title} chapterLabel={t.chapter}>
          <p>{t.ch2p1}</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value={t.ch2stat1} label={t.ch2label1} sub={t.ch2sub1} />
            <Stat value={t.ch2stat2} label={t.ch2label2} sub={t.ch2sub2} />
            <Stat value={t.ch2stat3} label={t.ch2label3} sub={t.ch2sub3} />
            <Stat value={t.ch2stat4} label={t.ch2label4} sub={t.ch2sub4} />
          </div>
          <p>{t.ch2p2}</p>
          <p>{t.ch2p3}</p>
          <TipBox title={t.ch2tip}>{t.ch2tipText}</TipBox>
        </Chapter>

        <Chapter num="٣" title={t.ch3Title} chapterLabel={t.chapter}>
          <p>{t.ch3p1}</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value={t.ch3stat1} label={t.ch3label1} sub={t.ch3sub1} />
            <Stat value={t.ch3stat2} label={t.ch3label2} sub={t.ch3sub2} />
            <Stat value={t.ch3stat3} label={t.ch3label3} sub={t.ch3sub3} />
            <Stat value={t.ch3stat4} label={t.ch3label4} sub={t.ch3sub4} />
          </div>
          <p>{t.ch3p2}</p>
          <p>{t.ch3p3}</p>
          <TipBox title={t.ch3tip}>{t.ch3tipText}</TipBox>
        </Chapter>

        <Chapter num="٤" title={t.ch4Title} chapterLabel={t.chapter}>
          <p>{t.ch4p1}</p>
          <div className="space-y-3 my-6">
            {[
              { pct: t.ch4pct1, name: t.ch4name1, val: t.ch4val1, desc: t.ch4desc1 },
              { pct: t.ch4pct2, name: t.ch4name2, val: t.ch4val2, desc: t.ch4desc2 },
              { pct: t.ch4pct3, name: t.ch4name3, val: t.ch4val3, desc: t.ch4desc3 },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-primary-100/40">
                <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-900 font-black text-sm">{item.pct}</span>
                </div>
                <div>
                  <p className="font-bold text-primary-900 text-sm">{item.name}</p>
                  <p className="text-xs text-primary-500 mb-1">{item.val}</p>
                  <p className="text-xs text-primary-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p>{t.ch4p2}</p>
          <TipBox title={t.ch4tip}>{t.ch4tipText}</TipBox>
        </Chapter>

        <Chapter num="٥" title={t.ch5Title} chapterLabel={t.chapter}>
          <p>{t.ch5p1}</p>
          <div className="my-8 p-6 bg-white rounded-2xl shadow-sm border border-primary-100/40">
            <p className="text-center text-primary-900 font-bold text-sm mb-6">{t.ch5barTitle}</p>
            <div className="space-y-4">
              {[
                { gp: '٤٦.٦', label: t.ch5l1, color: 'bg-red-500', w: '46.6%' },
                { gp: '١٦.١', label: t.ch5l2, color: 'bg-emerald-500', w: '16.1%' },
                { gp: '١٥.٩', label: t.ch5l3, color: 'bg-blue-500', w: '15.9%' },
                { gp: '١٠.٧', label: t.ch5l4, color: 'bg-violet-500', w: '10.7%' },
                { gp: '٥.٧', label: t.ch5l5, color: 'bg-amber-500', w: '5.7%' },
                { gp: '٥.٠', label: t.ch5l6, color: 'bg-gray-300', w: '5%' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 text-center">
                    <span className="text-primary-900 font-black text-sm">{item.gp}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-primary-600">{item.label}</span>
                    </div>
                    <div className="h-3 bg-primary-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: item.w }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p>{t.ch5p2}</p>
          <p>{t.ch5p3}</p>
          <TipBox title={t.ch5tip}>{t.ch5tipText}</TipBox>
        </Chapter>

        <Chapter num="٦" title={t.ch6Title} chapterLabel={t.chapter}>
          <p>{t.ch6p1}</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value={t.ch6stat1} label={t.ch6label1} sub={t.ch6sub1} />
            <Stat value={t.ch6stat2} label={t.ch6label2} sub={t.ch6sub2} />
            <Stat value={t.ch6stat3} label={t.ch6label3} sub={t.ch6sub3} />
            <Stat value={t.ch6stat4} label={t.ch6label4} sub={t.ch6sub4} />
          </div>
          <p>{t.ch6p2}</p>
          <TipBox title={t.ch6tip}>{t.ch6tipText}</TipBox>
          <div className="mt-6">
            <p className="text-sm font-bold text-primary-800 mb-3">{t.ch6longTitle}</p>
            <div className="space-y-2">
              {[
                { year: t.ch6y1, val: '75.2%' },
                { year: t.ch6y2, val: '72.2%' },
                { year: t.ch6y3, val: '69.9%' },
                { year: t.ch6y4, val: '70%' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-surface-warm rounded-lg">
                  <span className="text-xs text-primary-400 w-20">{item.year}</span>
                  <div className="flex-1 h-2 bg-primary-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-700 rounded-full" style={{ width: item.val }} />
                  </div>
                  <span className="text-xs text-primary-700 font-bold w-12 text-left">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </Chapter>

        <Chapter num="٧" title={t.ch7Title} chapterLabel={t.chapter}>
          <p>{t.ch7p1}</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value={t.ch7stat1} label={t.ch7label1} sub={t.ch7sub1} />
            <Stat value={t.ch7stat2} label={t.ch7label2} sub={t.ch7sub2} />
          </div>
          <p>{t.ch7p2}</p>
          <p>{t.ch7p3}</p>
          <TipBox title={t.ch7tip}>{t.ch7tipText}</TipBox>
        </Chapter>

        <Chapter num="٨" title={t.ch8Title} chapterLabel={t.chapter}>
          <p>{t.ch8p1}</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value={t.ch8stat1} label={t.ch8label1} sub={t.ch8sub1} />
            <Stat value={t.ch8stat2} label={t.ch8label2} sub={t.ch8sub2} />
          </div>
          <p className="font-bold text-primary-800 mb-3">{t.ch8detailsTitle}</p>
          <div className="space-y-2">
            <ListItem color="bg-emerald-500" val="١٧٨.٣ مليار" label={t.ch8d1} />
            <ListItem color="bg-emerald-500" val="١٠٤.٢ مليار" label={t.ch8d2} />
            <ListItem color="bg-emerald-500" val="٦٩.١ مليار" label={t.ch8d3} />
            <ListItem color="bg-emerald-500" val="٤٦ مليار" label={t.ch8d4} />
            <ListItem color="bg-emerald-500" val="٣٣.٣ مليار" label={t.ch8d5} />
            <ListItem color="bg-emerald-500" val="١٣ مليار" label={t.ch8d6} />
            <ListItem color="bg-emerald-500" val="٥٥.٢ مليار" label={t.ch8d7} />
            <ListItem color="bg-emerald-500" val="٤٠.٣ مليار" label={t.ch8d8} />
          </div>
          <TipBox title={t.ch8tip}>{t.ch8tipText}</TipBox>
        </Chapter>

        <Chapter num="٩" title={t.ch9Title} chapterLabel={t.chapter}>
          <p>{t.ch9p1}</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value={t.ch9stat1} label={t.ch9label1} sub={t.ch9sub1} />
            <Stat value={t.ch9stat2} label={t.ch9label2} sub={t.ch9sub2} />
          </div>
          <div className="space-y-2 my-4">
            <ListItem color="bg-blue-500" label={t.ch9a1} />
            <ListItem color="bg-blue-500" label={t.ch9a2} />
            <ListItem color="bg-blue-500" label={t.ch9a3} />
            <ListItem color="bg-blue-500" label={t.ch9a4} />
            <ListItem color="bg-blue-500" label={t.ch9a5} />
          </div>
        </Chapter>

        <Chapter num="١٠" title={t.ch10Title} chapterLabel={t.chapter}>
          <p>{t.ch10p1}</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value={t.ch10stat1} label={t.ch10label1} sub={t.ch10sub1} />
            <Stat value={t.ch10stat2} label={t.ch10label2} sub={t.ch10sub2} />
          </div>
          <div className="space-y-2 my-4">
            <ListItem color="bg-violet-500" val={t.ch10a1v} label={t.ch10a1} />
            <ListItem color="bg-violet-500" val={t.ch10a2v} label={t.ch10a2} />
            <ListItem color="bg-violet-500" val={t.ch10a3v} label={t.ch10a3} />
          </div>
          <TipBox title={t.ch10tip}>{t.ch10tipText}</TipBox>
        </Chapter>

        <Chapter num="١١" title={t.ch11Title} chapterLabel={t.chapter}>
          <p>{t.ch11p1}</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value={t.ch11stat1} label={t.ch11label1} sub={t.ch11sub1} />
            <Stat value={t.ch11stat2} label={t.ch11label2} sub={t.ch11sub2} />
          </div>
          <div className="space-y-2 my-4">
            <ListItem color="bg-blue-500" val={t.ch11a1v} label={t.ch11a1} />
            <ListItem color="bg-blue-500" val={t.ch11a2v} label={t.ch11a2} />
            <ListItem color="bg-blue-500" val={t.ch11a3v} label={t.ch11a3} />
            <ListItem color="bg-blue-500" val={t.ch11a4v} label={t.ch11a4} />
          </div>
        </Chapter>

        <Chapter num="١٢" title={t.ch12Title} chapterLabel={t.chapter}>
          <p>{t.ch12p1}</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value={t.ch12stat1} label={t.ch12label1} sub={t.ch12sub1} />
            <Stat value={t.ch12stat2} label={t.ch12label2} sub={t.ch12sub2} />
          </div>
          <div className="space-y-2 my-4">
            <ListItem color="bg-amber-500" val={t.ch12a1v} label={t.ch12a1} />
            <ListItem color="bg-amber-500" val={t.ch12a2v} label={t.ch12a2} />
            <ListItem color="bg-amber-500" val={t.ch12a3v} label={t.ch12a3} />
          </div>
          <TipBox title={t.ch12tip}>{t.ch12tipText}</TipBox>
        </Chapter>

        <Chapter num="١٣" title={t.ch13Title} chapterLabel={t.chapter}>
          <p>{t.ch13p1}</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value={t.ch13stat1} label={t.ch13label1} sub={t.ch13sub1} />
            <Stat value={t.ch13stat2} label={t.ch13label2} sub={t.ch13sub2} />
          </div>
          <p>{t.ch13p2}</p>
        </Chapter>

        <Chapter num="١٤" title={t.ch14Title} chapterLabel={t.chapter}>
          <p>{t.ch14p1}</p>
          <div className="space-y-2 my-4">
            <ListItem color="bg-emerald-500" val={t.ch14a1v} label={t.ch14a1} />
            <ListItem color="bg-emerald-500" val={t.ch14a2v} label={t.ch14a2} />
            <ListItem color="bg-emerald-500" val={t.ch14a3v} label={t.ch14a3} />
            <ListItem color="bg-emerald-500" val={t.ch14a4v} label={t.ch14a4} />
            <ListItem color="bg-emerald-500" val={t.ch14a5v} label={t.ch14a5} />
          </div>
        </Chapter>

        <Chapter num="١٥" title={t.ch15Title} chapterLabel={t.chapter}>
          <p>{t.ch15p1}</p>
          <div className="space-y-3 my-6">
            <div className="p-4 bg-white rounded-xl shadow-sm border border-primary-100/40">
              <p className="font-bold text-primary-900 text-sm mb-1">{t.ch15a1Title}</p>
              <p className="text-xs text-primary-500">{t.ch15a1Desc}</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-primary-100/40">
              <p className="font-bold text-primary-900 text-sm mb-1">{t.ch15a2Title}</p>
              <p className="text-xs text-primary-500">{t.ch15a2Desc}</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-primary-100/40">
              <p className="font-bold text-primary-900 text-sm mb-1">{t.ch15a3Title}</p>
              <p className="text-xs text-primary-500">{t.ch15a3Desc}</p>
            </div>
          </div>
        </Chapter>

        <Chapter num="١٦" title={t.ch16Title} chapterLabel={t.chapter}>
          <p>{t.ch16p1}</p>
          <div className="my-8 p-6 bg-gradient-to-b from-primary-50 to-transparent border border-primary-200/40 rounded-2xl text-center">
            <div className="flex justify-center mb-4">
              <Coin size={80} spinning={true} />
            </div>
            <p className="text-xl font-black text-primary-900 mb-2">{t.ch16cta1}</p>
            <p className="text-primary-700 font-bold">{t.ch16cta2}</p>
          </div>
          <p>{t.ch16p2}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/budget" className="px-6 py-3 bg-primary-700 text-white font-bold rounded-full text-sm hover:bg-primary-800 transition-colors">{t.ch16btn1}</Link>
            <Link to="/dashboard/budget100" className="px-6 py-3 bg-white text-primary-700 font-bold rounded-full text-sm border border-primary-200 hover:border-primary-400 transition-colors">{t.ch16btn2}</Link>
          </div>
        </Chapter>

      </div>
    </div>
  );
}
