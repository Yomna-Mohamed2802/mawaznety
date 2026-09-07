import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MawaznetyLogo from '../components/ui/MawaznetyLogo';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-surface" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-800 mb-8">
            <span>←</span>
            <span>العودة للرئيسية</span>
          </Link>

          <MawaznetyLogo size="sm" showText={false} className="mb-6" />

          <h1 className="text-3xl font-bold text-primary-900 mb-2">سياسة الخصوصية</h1>
          <p className="text-sm text-primary-500 mb-8">آخر تحديث: سبتمبر 2026</p>

          <div className="prose prose-primary space-y-6 text-primary-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">١. مقدمة</h2>
              <p>مرحباً بك في موازنتي ("الموقع"). نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيف نجمع ونستخدم ونحمي معلوماتك عند استخدامك لهذا الموقع.</p>
              <p className="mt-2 text-sm bg-amber-50 border border-amber-200/60 rounded-xl p-3">
                <strong>تنبيه:</strong> موازنتي مشروع تعليمي مستقل وليس تابعاً لأي جهة حكومية رسمية. البيانات المعروضة مأخوذة من موازنة المواطن الرسمية ';' publishes for educational purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٢. البيانات التي نجمعها</h2>
              <h3 className="font-semibold text-primary-800 mb-2">بيانات نجمعها مباشرة:</h3>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>عنوان البريد الإلكتروني (عند تسجيل الدخول)</li>
                <li>اسم المستخدم</li>
                <li>تفضيلات الإعدادات</li>
              </ul>
              <h3 className="font-semibold text-primary-800 mb-2 mt-3">بيانات نجمعها تلقائياً:</h3>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>نوع المتصفح ونظام التشغيل</li>
                <li>صفحات الموقع التي تزورها</li>
                <li>وقت ومدة الزيارة</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٣. كيف نستخدم بياناتك</h2>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>لتشغيل الموقع وتقديم الخدمات المطلوبة</li>
                <li>لتحسين تجربتك وتطوير المحتوى</li>
                <li>لتحسين أمان الموقع</li>
                <li>ال/Getty بياناتك لأطراف ثالثة إلا إذا وافقت على ذلك</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٤. ملفات تعريف الارتباط (Cookies)</h2>
              <p>نستخدم ملفات تعريف الارتباط الضرورية لتشغيل الموقع. يمكنك مراجعة سياسة ملفات تعريف الارتباط الخاصة بنا لمعرفة المزيد.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٥. حماية البيانات</h2>
              <p>نتخذ إجراءات أمنية مناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح أو الإتلاف. مع ذلك، لا توجد طريقة نقل عبر الإنترنت آ بنسبة ١٠٠٪.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٦. حقوقك</h2>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>حق الوصول إلى بياناتك الشخصية</li>
                <li>right to correct inaccurate data</li>
                <li>حق حذف بياناتك الشخصية</li>
                <li>حق الاعتراض على معالجة بياناتك</li>
                <li>حق نقل بياناتك</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٧. الاحتفاظ بالبيانات</h2>
              <p>نحتفظ ببياناتك الشخصية فقط طالما كانت ضرورية لأغراض هذه السياسة. سنحذف بياناتك عند طلبك أو عند عدم الحاجة إليها.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">٨. التواصل معنا</h2>
              <p>إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر البريد الإلكتروني: <a href="mailto:privacy@mawaznety.com" className="text-primary-600 underline">privacy@mawaznety.com</a></p>
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

export default PrivacyPolicy;
