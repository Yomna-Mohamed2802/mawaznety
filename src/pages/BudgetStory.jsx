import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../context/LangContext';
import Coin from '../components/ui/Coin';

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

function Chapter({ num, title, children }) {
  return (
    <Section className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary-900 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-black text-lg">{num}</span>
        </div>
        <div>
          <p className="text-primary-400 text-[10px] tracking-[0.3em] uppercase font-medium">الفصل {num}</p>
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

  return (
    <div className="min-h-screen bg-surface" dir="rtl">
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
            <p className="text-primary-400 text-xs tracking-[0.5em] uppercase mb-6 font-medium">موازنة المواطن 2027/2026</p>
          </Section>
          <Section delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-primary-900 leading-[1.2] mb-6">
              حكاية<br />
              <span className="bg-gradient-to-l from-primary-700 to-primary-500 bg-clip-text text-transparent">الجنيه المصري</span>
            </h1>
          </Section>
          <Section delay={0.3}>
            <p className="text-primary-500 text-lg leading-relaxed max-w-lg mx-auto">
              شرح مبسط لكل مفهوم في موازنة الدولة — من الإيرادات والمصروفات للدين العام والحماية الاجتماعية.
            </p>
          </Section>
          <Section delay={0.4}>
            <p className="text-primary-300 text-xs mt-8">الإصدار الثالث عشر — أغسطس 2026</p>
          </Section>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 pb-32">

        <Chapter num="١" title="يعني إيه موازنة؟">
          <p>الموازنة هي <strong className="text-primary-900">خطة الدولة المالية لمدة سنة</strong>. بتحدد الدولة هتجيب فلوس منين (الإيرادات) وهتها فين (المصروفات).</p>
          <p>زي بالظبط أنت لما بتبص على مرتبك وبتقرر تصرف كام على أكل وكام على مواصلات وكام توفر — الدولة بتعمل نفس الكلام بس بأرقام أكتر بكتير.</p>
          <p>مصر بتعمل الموازنة بتاعتها كل سنة وبتقدمها للبرلمان للمناقشة والتصويت. الموازنة دي مش مجرد أرقام — هي <strong className="text-primary-900">قرارات بتأثر على حياتك كل يوم</strong>: تعليمك، صحتك، شوارعك، ومستقبلك.</p>
          <TipBox title="معلومة مهمة">موازنة 2026/2027 هي الإصدار الثالث عشر من "موازنة المواطن" — ملف إرشادي بيفسر الموازنة للمواطن المصري بأسلوب بسيط.</TipBox>
        </Chapter>

        <Chapter num="٢" title="الأرقام الكبيرة — الصورة الكاملة">
          <p>قبل ما نفصّل، خلينا نشوف الصورة الكبيرة. دي أرقام الموازنة الإجمالية لسنة 2026/2027:</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value="٤.١ تريليون" label="إجمالي الإيرادات" sub="الفلوس اللي الدولة بتجيبها" />
            <Stat value="٥.٢ تريليون" label="إجمالي المصروفات" sub="الفلوس اللي الدولة بتصرفها" />
            <Stat value="١.١٣ تريليون" label="العجز النقدي" sub="الفرق بين الدخل والصرف" />
            <Stat value="١.٢٢ تريليون" label="الفائض الأولي" sub="قبل فوائد الدين" />
          </div>
          <p>يعني الدولة بتصرف أكتر مما بتجيب بحوالي ١.١٣ تريليون جنيه. الفرق ده اسمه <strong className="text-primary-900">العجز النقدي</strong> وبيمثل ٤.٦% من الناتج المحلي.</p>
          <p>بس لو شلنا فوائد الدين من المعادلة، هنلاقي إن الدولة عندها <strong className="text-primary-900">فائض أولي</strong> بقيمة ١.٢٢ تريليون جنيه (٥% من الناتج المحلي). يعني الإيرادات كفاية تغطي كل المصروفات ما عدا فوائد الدين.</p>
          <TipBox title="يعني إيه فائض أولي؟">الفائض الأولي هو الفرق بين الإيرادات والمصروفات <strong>قبل</strong> دفع فوائد الدين. لو الفائض إيجابي، ده معناه إن الدولة بتجيب أكتر مما بتصرف في خدماتها ومشاريعها — المشكلة بس في فوائد الدين.</TipBox>
        </Chapter>

        <Chapter num="٣" title="الناتج المحلي — قوة الاقتصاد">
          <p>الناتج المحلي الإجمالي (GDP) هو <strong className="text-primary-900">قيمة كل البضائع والخدمات اللي انتجتها الدولة في سنة</strong>. هو المقياس الرئيسي لقوة الاقتصاد.</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value="٢٤.٥ تريليون" label="الناتج المحلي" sub="قيمة الإنتاج الكلي" />
            <Stat value="٥.٤%" label="معدل النمو" sub="النمو الحقيقي المتوقع" />
            <Stat value="٩.٣%" label="معدل التضخم" sub="الضاغط السعري" />
            <Stat value="١٧%" label="معدل الاستثمار" sub="نسبة الاستثمارات للناتج" />
          </div>
          <p>مصر متوقع يتحقق منها نمو حقيقي ٥.٤% في 2026/2027. النمو ده معناه إن الاقتصاد بيكبر وبيوفر فرص عمل أكتر.</p>
          <p>الناتج المحلي مش بس رقم — هو بيعكس قدرة الدولة على تقديم خدماتها وتحقيق أهدافها. كل ما الناتج أكبر، كل ما الموازنة بقت أقوى.</p>
          <TipBox title="ليه النمو مهم؟">لما الاقتصاد بينمو، الشركات بتكبر وبتوظف أكتر، الضرائب بتكتر، والدولة بتنفق أكتر على التعليم والصحة والبنية التحتية.</TipBox>
        </Chapter>

        <Chapter num="٤" title="الإيرادات — الدولة بتجيب فلوس منين؟">
          <p>إجمالي إيرادات الدولة ٤.٠٦ تريليون جنيه. الدولة بتجيب فلوسها من مصادر كتير:</p>
          <div className="space-y-3 my-6">
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-primary-100/40">
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-900 font-black text-sm">٨٧٪</span>
              </div>
              <div>
                <p className="font-bold text-primary-900 text-sm">الضرائب</p>
                <p className="text-xs text-primary-500 mb-1">٣.٥٣ تريليون جنيه</p>
                <p className="text-xs text-primary-400">ضريبة الدخل، ضريبة القيمة المضافة، الرسوم الجمركية، الدمغة</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-primary-100/40">
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-900 font-black text-sm">١٢.٥٪</span>
              </div>
              <div>
                <p className="font-bold text-primary-900 text-sm">إيرادات أخرى</p>
                <p className="text-xs text-primary-500 mb-1">٥٠٧ مليار جنيه</p>
                <p className="text-xs text-primary-400">إيرادات المرافق العامة وصافي أرباح الجهات الحكومية</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-primary-100/40">
              <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-900 font-black text-sm">٠.٥٪</span>
              </div>
              <div>
                <p className="font-bold text-primary-900 text-sm">المنح والمساعدات</p>
                <p className="text-xs text-primary-500 mb-1">١٩.٧ مليار جنيه</p>
                <p className="text-xs text-primary-400">منح دولية ومساعدات خارجية</p>
              </div>
            </div>
          </div>
          <p>الضرائب هي المصدر الرئيسي لإيرادات الدولة — ٨٧% من الإجمالي. ضريبة القيمة المضافة (VAT) هي أكبر ضريبة بتحصلها الدولة، وبعدها ضريبة الدخل والرسوم الجمركية.</p>
          <TipBox title="ليه الضرائب مهمة؟">الضرائب هي الدخل الأساسي للدولة. من غيرها، مفيش فلوس تعليم أو صحة أو شوارع. كل جنيه بتدفعه ضريبة بيرجعلك في خدمات.</TipBox>
        </Chapter>

        <Chapter num="٥" title="المصروفات — الدولة بتنفق على إيه؟">
          <p>إجمالي مصروفات الدولة ٥.١٩ تريليون جنيه. خلينا نشوف كل جنيه بيروح فين:</p>
          <div className="my-8 p-6 bg-white rounded-2xl shadow-sm border border-primary-100/40">
            <p className="text-center text-primary-900 font-bold text-sm mb-6">من كل ١٠٠ جنيه مصري</p>
            <div className="space-y-4">
              {[
                { gp: '٤٦.٦', label: 'فوائد الدين', color: 'bg-red-500', w: '46.6%' },
                { gp: '١٦.١', label: 'الدعم والحماية الاجتماعية', color: 'bg-emerald-500', w: '16.1%' },
                { gp: '١٥.٩', label: 'الأجور والرواتب', color: 'bg-blue-500', w: '15.9%' },
                { gp: '١٠.٧', label: 'الاستثمارات', color: 'bg-violet-500', w: '10.7%' },
                { gp: '٥.٧', label: 'السلع والخدمات', color: 'bg-amber-500', w: '5.7%' },
                { gp: '٥.٠', label: 'أخرى (دفاع، أمن)', color: 'bg-gray-300', w: '5%' },
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
          <p>أكبر بند في المصروفات هو <strong className="text-primary-900">فوائد الدين</strong> — ٤٦.٦ جنيه من كل ١٠٠ جنيه. يعني تقريبًا نص الفلوس بتروح لسداد فوائد القروض.</p>
          <p>بعدها comes <strong className="text-primary-900">الدعم والحماية الاجتماعية</strong> (١٦.١ جنيه) — وده بيشمل دعم السلع التموينية والكهرباء والإسكان. وبعدها <strong className="text-primary-900">الأجور والرواتب</strong> (١٥.٩ جنيه).</p>
          <TipBox title="ليه فوائد الدين كبيرة كده؟">الدين العام المصري كبير، وفوائده بتأخذ نصيب كبير من الموازنة. الحكومة بتحاول تقليل الدين عشان تحرر فلوس أكتر للصرف على الخدمات والمشاريع.</TipBox>
        </Chapter>

        <Chapter num="٦" title="الدين العام — الفلوس اللي الدولة مقترضها">
          <p>الدين العام هو <strong className="text-primary-900">إجمالي الفلوس اللي الدولة مقترضتها</strong> من بنوك ومfigureات مالية مصرية ودولية.</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value="٧٨.١٪" label="نسبة الدين المستهدفة" sub="يونيو 2027" />
            <Stat value="٩٦٪" label="نسبة الدين ٢٠٢٣" sub="نقطة البداية" />
            <Stat value="٧٤٪" label="الدين المحلي" sub="من إجمالي الدين" />
            <Stat value="٧٨.٥ مليار$" label="الدين الخارجي" sub="يونيو 2025" />
          </div>
          <p>مصر عندها خطة واضحة لتقليل الدين: من ٩٦% في ٢٠٢٣ لـ ٧٨.١% في ٢٠٢٧، ومنها لـ ٧٠% بحلول ٢٠٣٠.</p>
          <TipBox title="الفرق بين دين أجهزة الموازنة ودين الحكومة العامة">دين أجهزة الموازنة (٧٨.١%) بيشمل بس الوزارات والجهات الحكومية. دين الحكومة العامة (٨٩.٥%) أوسع.</TipBox>
          <div className="mt-6">
            <p className="text-sm font-bold text-primary-800 mb-3">التوقعات على المدى الطويل:</p>
            <div className="space-y-2">
              {[
                { year: '٢٠٢٧/٢٠٢٨', val: '75.2%' },
                { year: '٢٠٢٨/٢٠٢٩', val: '72.2%' },
                { year: '٢٠٢٩/٢٠٣٠', val: '69.9%' },
                { year: 'هدف ٢٠٣٠', val: '70%' },
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

        <Chapter num="٧" title="فوائد الدين — أكتر بند بياخد فلوس">
          <p>فوائد الدين هي <strong className="text-primary-900">التكلفة اللي الدولة بتدفعها عشان القروض</strong>. زي لما بتاخد قرض من البنك وبتدفع عليه فائدة.</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value="٢.٤٢ تريليون" label="فوائد الدين 2026/2027" sub="٤٦.٦٪ من المصروفات" />
            <Stat value="٦٠٪" label="نسبة الفوائد للإيرادات" sub="من إجمالي الإيرادات" />
          </div>
          <p>فوائد الدين ٢.٤٢ تريليون جنيه — وده أكبر بند واحد في الموازنة كلها. تقريبًا ٦٠% من إيرادات الدولة بتروح لدفع فوائد الدين.</p>
          <p>بس الخبر الحسن: النسبة دي بتقل. كانت ٧٣% وностьюت لـ ٦٠%.</p>
          <TipBox title="ليه الفوائد بتقل؟">لما الدولة بتحسّن مؤشراتها الاقتصادية وبتقلل الدين، الفوائد بتقل. كمان الحكومة بتمتد آجال الدين.</TipBox>
        </Chapter>

        <Chapter num="٨" title="الدعم والحماية الاجتماعية">
          <p>الدولة بتنفق ٨٣٦.٨ مليار جنيه على <strong className="text-primary-900">الدعم والحماية الاجتماعية</strong>.</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value="٨٣٦.٨ مليار" label="إجمالي الدعم" sub="١٦.١٪ من المصروفات" />
            <Stat value="٨,٠٠٠ جنيه" label="الحد الأدنى للدخل" sub="من يوليو 2026" />
          </div>
          <p className="font-bold text-primary-800 mb-3">تفاصيل الدعم:</p>
          <div className="space-y-2">
            <ListItem color="bg-emerald-500" val="١٧٨.٣ مليار" label="سلع تموينية" />
            <ListItem color="bg-emerald-500" val="١٠٤.٢ مليار" label="دعم الكهرباء" />
            <ListItem color="bg-emerald-500" val="٦٩.١ مليار" label="شراء القمح" />
            <ListItem color="bg-emerald-500" val="٤٦ مليار" label="تحسين المناطق العشوائية" />
            <ListItem color="bg-emerald-500" val="٣٣.٣ مليار" label="أدوية" />
            <ListItem color="bg-emerald-500" val="١٣ مليار" label="إسكان" />
            <ListItem color="bg-emerald-500" val="٥٥.٢ مليار" label="برنامج تكافل وكرامة" />
            <ListItem color="bg-emerald-500" val="٤٠.٣ مليار" label="حزمة رمضان 2026" />
          </div>
          <TipBox title="الحد الأدنى للدخل">من يوليو 2026، الحد الأدنى للدخل وصل ٨,٠٠٠ جنيه شهريًا.</TipBox>
        </Chapter>

        <Chapter num="٩" title="الأجور والرواتب — شغل الناس">
          <p>الدولة بتصرف ٨٢٢.٨ مليار جنيه على <strong className="text-primary-900">الأجور والرواتب</strong>.</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value="٨٢٢.٨ مليار" label="إجمالي الأجور" sub="١٥.٩٪ من المصروفات" />
            <Stat value="+٢١.٢٪" label="نمو سنوي" sub="مقارنة بالسنة اللي فاتت" />
          </div>
          <div className="space-y-2 my-4">
            <ListItem color="bg-blue-500" label="علاوة دورية ١٢٪ للخدمة المدنية" />
            <ListItem color="bg-blue-500" label="علاوة ١٥٪ لغير المخاطبين بقانون الخدمة المدنية" />
            <ListItem color="bg-blue-500" label="حافز إضافي ٧٥٠ جنيه شهريًا" />
            <ListItem color="bg-blue-500" label="حافز تدريس ١,٠٠٠ جنيه للمعلمين" />
            <ListItem color="bg-blue-500" label="زيادة ٧٥٠ جنيه للقطاع الطبي" />
          </div>
        </Chapter>

        <Chapter num="١٠" title="التعليم — استثمار في المستقبل">
          <p>مصر بتصرف ١,٢٢٩.٧ مليار جنيه على التعليم — وده <strong className="text-primary-900">٦% من الناتج المحلي</strong>.</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value="١,٢٢٩.٧ مليار" label="مoubt التعليم" sub="٦٪ من الناتج المحلي" />
            <Stat value="+٢٠٪" label="نمو سنوي" sub="مقارنة بالسنة اللي فاتت" />
          </div>
          <div className="space-y-2 my-4">
            <ListItem color="bg-violet-500" val="٥٥.٥ مليار" label="طباعة الكتب الدراسية" />
            <ListItem color="bg-violet-500" val="٧ مليار" label="وجبات مدرسية" />
            <ListItem color="bg-violet-500" val="٢٠٥.٢ مليار" label="البحث العلمي (١٪ من GDP)" />
          </div>
          <TipBox title="ليه التعليم مهم؟">التعليم هو الاستثمار الأكبر في مستقبل الدولة. كل جنيه في التعليم بيرجع في شكل كوادر مؤهلة وابتكار.</TipBox>
        </Chapter>

        <Chapter num="١١" title="الصحة — صحتك على راسنا">
          <p>مصر بتصرف ٨٦٢.٩ مليار جنيه على الصحة — وده <strong className="text-primary-900">٤.٢% من الناتج المحلي</strong>.</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value="٨٦٢.٩ مليار" label="مoubt الصحة" sub="٤.٢٪ من الناتج المحلي" />
            <Stat value="+٣٩.٦٪" label="نمو سنوي" sub="مقارنة بالسنة اللي فاتت" />
          </div>
          <div className="space-y-2 my-4">
            <ListItem color="bg-blue-500" val="٩٠.٥ مليار" label="الشراء الموحد للعقاقير" />
            <ListItem color="bg-blue-500" val="٤٧.٥ مليار" label="علاج المواطنين" />
            <ListItem color="bg-blue-500" val="٣٣.٣ مليار" label="الأدوية" />
            <ListItem color="bg-blue-500" val="١٦.٦ مليار" label="دعم التأمين الصحي" />
          </div>
        </Chapter>

        <Chapter num="١٢" title="الاستثمارات — بناء المستقبل">
          <p>الدولة بتستثمر ٥٥٣.٧ مليار جنيه في <strong className="text-primary-900">مشاريع استثمارية</strong>.</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value="٥٥٣.٧ مليار" label="استثمارات الحكومة" sub="من إجمالي ٤.١٧ تريليون" />
            <Stat value="٤.١٧ تريليون" label="إجمالي الاستثمارات" sub="خاصة + حكومية" />
          </div>
          <div className="space-y-2 my-4">
            <ListItem color="bg-amber-500" val="٦٤٠.١ مليار" label="النقل والمواصلات" />
            <ListItem color="bg-amber-500" val="٢٨١.٣ مليار" label="الصناعة والموارد المعدنية" />
            <ListItem color="bg-amber-500" val="١٧٣.٢ مليار" label="الزراعة ومصائد الأسماك" />
          </div>
          <TipBox title="الاستثمارات الخاصة">٥٨.٨% من الاستثمارات الإجمالية من القطاع الخاص.</TipBox>
        </Chapter>

        <Chapter num="١٣" title="حياة كريمة — مشروع تطوير الريف المصري">
          <p>مشروع "حياة كريمة" هو أكبر مشروع تنموي في مصر — <strong className="text-primary-900">١ تريليون جنيه</strong> على ٣ مراحل.</p>
          <div className="grid grid-cols-2 gap-3 my-6">
            <Stat value="١ تريليون" label="القيمة الإجمالية" sub="على ٣ مراحل" />
            <Stat value="٨٨٪" label="نسبة الصرف" sub="المرحلة الأولى" />
          </div>
          <p>المرحلة الأولى خلصت بنسبة تنفيذ ٨٨%. المرحلة الثانية متوقع فيها ١٥٠ مليار جنيه.</p>
        </Chapter>

        <Chapter num="١٤" title="البرامج الاقتصادية — دعم الإنتاج">
          <p>الدولة بتصرف ٩٠ مليار جنيه في <strong className="text-primary-900">برامج اقتصادية</strong> لدعم الشركات والمصانع والصادرات.</p>
          <div className="space-y-2 my-4">
            <ListItem color="bg-emerald-500" val="٤٨ مليار" label="رد الأعباء التصديرية" />
            <ListItem color="bg-emerald-500" val="٦.٧ مليار" label="دعم السياحة" />
            <ListItem color="bg-emerald-500" val="٦ مليار" label="التسهيلات الإنتاجية" />
            <ListItem color="bg-emerald-500" val="٥.٥ مليار" label="صناعة السيارات" />
            <ListItem color="bg-emerald-500" val="٥ مليار" label="المشاريع الصغيرة والمتوسطة" />
          </div>
        </Chapter>

        <Chapter num="١٥" title="المشاريع القومية الكبرى">
          <p>مصر بتنفذ مشاريع كبرى بتغير شكل الاقتصاد:</p>
          <div className="space-y-3 my-6">
            <div className="p-4 bg-white rounded-xl shadow-sm border border-primary-100/40">
              <p className="font-bold text-primary-900 text-sm mb-1">العاصمة الإدارية الجديدة</p>
              <p className="text-xs text-primary-500">مدينة إدارية جديدة بالكامل — مكاتب الحكومة والسفارات والأعمال</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-primary-100/40">
              <p className="font-bold text-primary-900 text-sm mb-1">تنمية قناة السويس</p>
              <p className="text-xs text-primary-500">توسعة القناة وتطوير الموانئ والمناطق الصناعية</p>
            </div>
            <div className="p-4 bg-white rounded-xl shadow-sm border border-primary-100/40">
              <p className="font-bold text-primary-900 text-sm mb-1">الطرق الوطنية</p>
              <p className="text-xs text-primary-500">شبكة طرق جديدة بربط المحافظات وبتقلل وقت السفر</p>
            </div>
          </div>
        </Chapter>

        <Chapter num="١٦" title="الخلاصة — الجنيه بيوصلك إزاي">
          <p>دلوقتي فاهم يعني إيه موازنة وإزاي جنيهاتك بتوصل لحدك. كل رقم في الموازنة دي قرار — قرار يأثر على مدرستك، مستشفاك، شارعك، ومستقبلك.</p>
          <div className="my-8 p-6 bg-gradient-to-b from-primary-50 to-transparent border border-primary-200/40 rounded-2xl text-center">
            <div className="flex justify-center mb-4">
              <Coin size={80} spinning={true} />
            </div>
            <p className="text-xl font-black text-primary-900 mb-2">مش مجرد أرقام.</p>
            <p className="text-primary-700 font-bold">دي موازنة بلدك.</p>
          </div>
          <p>الموازنة مش شيء بعيد عنك — هي <strong className="text-primary-900">قرارات بتأثر على حياتك كل يوم</strong>.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="/budget" className="px-6 py-3 bg-primary-700 text-white font-bold rounded-full text-sm hover:bg-primary-800 transition-colors">شوف حكاية الجنيه</a>
            <a href="/budget100" className="px-6 py-3 bg-white text-primary-700 font-bold rounded-full text-sm border border-primary-200 hover:border-primary-400 transition-colors">جرّب ميزانية ١٠٠ جنيه</a>
          </div>
        </Chapter>

      </div>
    </div>
  );
}
