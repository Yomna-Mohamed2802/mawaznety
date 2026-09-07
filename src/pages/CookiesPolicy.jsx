import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MawaznetyLogo from '../components/ui/MawaznetyLogo';

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen bg-surface" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-800 mb-8">
            <span>←</span>
            <span>العودة للرئيسية</span>
          </Link>

          <MawaznetyLogo size="sm" showText={false} className="mb-6" />

          <h1 className="text-3xl font-bold text-primary-900 mb-2">سياسة ملفات تعريف الارتباط</h1>
          <p className="text-sm text-primary-500 mb-8">آخر تحديث: سبتمبر 2026</p>

          <div className="prose prose-primary space-y-6 text-primary-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">ما هي ملفات تعريف الارتباط؟</h2>
              <p>ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة تُخزن على جهازك عندما تزور موقع إلكتروني. تساعد المواقع على تذكر تفضيلاتك وتحسين تجربتك.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">الملفات التي نستخدمها</h2>

              <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-4 mb-3">
                <h3 className="font-semibold text-emerald-800 mb-2">ملفات ضرورية (always active)</h3>
                <p>ضرورية لتشغيل الموقع بشكل صحيح:</p>
                <ul className="list-disc list-inside space-y-1 mr-4 mt-1">
                  <li>ملفات الجلسة (session) لتسجيل الدخول</li>
                  <li>تفضيلات المستخدم (الإعدادات، اللغة)</li>
                  <li> حالة الموافقة على ملفات تعريف الارتباط</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200/60 rounded-xl p-4 mb-3">
                <h3 className="font-semibold text-blue-800 mb-2">ملفات التحليلات (Analytics)</h3>
                <p>تساعدنا في فهم كيفية استخدام الموقع:</p>
                <ul className="list-disc list-inside space-y-1 mr-4 mt-1">
                  <li>Google Fonts — لتحليل طلبات الخطوط</li>
                </ul>
                <p className="mt-2 text-sm text-blue-600">ملاحظة: لا نستخدم Google Analytics أو أي أدوات تحليلات خارجية حالياً.</p>
              </div>

              <div className="bg-gray-50 border border-gray-200/60 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-2">ملفات أطراف ثالثة</h3>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>Google Sign-In — للتسجيل عبر حساب Google (فقط عند استخدام هذه الميزة)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">كيف تدير ملفات تعريف الارتباط</h2>
              <p>يمكنك إدارة أو حذف ملفات تعريف الارتباط من إعدادات متصفحك. ملاحظة: تعطيل ملفات تعريف الارتباط قد يؤثر على وظائف الموقع.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">التعديلات على السياسة</h2>
              <p>نحتفظ بحق تعديل هذه السياسة في أي وقت. سيتم عرض تاريخ آخر تحديث في أعلى الصفحة.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">التواصل</h2>
              <p>لأي استفسارات: <a href="mailto:privacy@mawaznety.com" className="text-primary-600 underline">privacy@mawaznety.com</a></p>
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

export default CookiesPolicy;
