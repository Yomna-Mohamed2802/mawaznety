import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MawaznetyLogo from '../components/ui/MawaznetyLogo';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-surface" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-800 mb-8">
            <span>←</span>
            <span>العودة للرئيسية</span>
          </Link>

          <MawaznetyLogo size="sm" showText={false} className="mb-6" />

          <h1 className="text-3xl font-bold text-primary-900 mb-2">الشروط والأحكام</h1>
          <p className="text-sm text-primary-500 mb-8">آخر تحديث: سبتمبر 2026</p>

          <div className="prose prose-primary space-y-6 text-primary-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">١. القبول بالشروط</h2>
              <p>باستخدامك لموقع موازنتي ("الموقع")، أنت توافق على الالتزام بهذه الشروط والأحكام. إذا لا توافق على أي شرط من هذه الشروط، يرجى عدم استخدام الموقع.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٢. وصف الموقع</h2>
              <p>موازنتي هو مشروع تعليمي مستقل يقدم معلومات عن موازنة المواطن المصرية ٢٠٢٦/٢٠٢٧ لأغراض تعليمية وتوعوية. <strong>هذا المشروع ليس تابعاً لأي جهة حكومية أو رسمية.</strong></p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٣. دقة المعلومات</h2>
              <p>نبذل قصارى جهدنا لتقديم معلومات دقيقة ومحدثة. ومع ذلك، لا نضمن دقة أو اكتمال المعلومات المعروضة. المعلومات المأخوذة من موازنة المواطن الرسمية قد تخضع للتعديل.</p>
              <p className="mt-2">البيانات المالية المعروضة مأخوذة من:</p>
              <ul className="list-disc list-inside space-y-1 mr-4 mt-1">
                <li>موازنة المواطن المصرية ٢٠٢٦/٢٠٢٧ (وزارة المالية)</li>
                <li>جهازív الإحصاء المركزي</li>
                <li>البنك المركزي المصري</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٤. الاستخدام المقبول</h2>
              <p>أنت توافق على:</p>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>استخدام الموقع لأغراض تعليمية فقط</li>
                <li>عدم محاولة اختراق الموقع أو تعطيله</li>
                <li>عدم استخدام الموقع لأغراض غير قانونية</li>
                <li>عدم نشر محتوى م misleading أو ضار</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٥. الملكية الفكرية</h2>
              <p>جميع المحتويات الأصلية في هذا الموقع (التصميم، الكود، النصوص غير المأخوذة من مصادر رسمية) محمية بموجب قوانين حقوق الملكية الفكرية. البيانات الحكومية المستخدمة من موازنة المواطن هي بيانات عامة.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٦. إخلاء المسؤولية</h2>
              <p>يُقدم الموقع "كما هو" دون أي ضمانات. لا نتحمل المسؤولية عن أي أضرار ناتجة عن استخدام الموقع أو الاعتماد على المعلومات المعروضة.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٧. تعديل الشروط</h2>
              <p>نحتفظ بحق تعديل هذه الشروط في أي وقت. بمتابعة استخدامك للموقع بعد أي تعديلات، أنت توافق على الشروط المعدلة.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٨. القانون الحاكم</h2>
              <p>تخضع هذه الشروط لقوانين جمهورية مصر العربية.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٩. التواصل</h2>
              <p>لأي استفسارات حول هذه الشروط، يرجى التواصل عبر: <a href="mailto:legal@mawaznety.com" className="text-primary-600 underline">legal@mawaznety.com</a></p>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t border-primary-200/60 flex flex-wrap gap-4 text-sm">
            <Link to="/privacy" className="text-primary-600 hover:text-primary-800 underline">سياسة الخصوصية</Link>
            <Link to="/terms" className="text-primary-600 hover:text-primary-800 underline">الشروط والأحكام</Link>
            <Link to="/cookies" className="text-primary-600 hover:text-primary-800 underline">سياسة ملفات تعريف الارتباط</Link>
            <Link to="/refund" className="text-primary-600 hover:text-primary-800 underline">سياسة الاسترداد</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
