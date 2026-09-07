import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MawaznetyLogo from '../components/ui/MawaznetyLogo';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-surface" dir="rtl">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-800 mb-8">
            <span>←</span>
            <span>العودة للرئيسية</span>
          </Link>

          <MawaznetyLogo size="sm" showText={false} className="mb-6" />

          <h1 className="text-3xl font-bold text-primary-900 mb-2">سياسة الاسترداد</h1>
          <p className="text-sm text-primary-500 mb-8">آخر تحديث: سبتمبر 2026</p>

          <div className="prose prose-primary space-y-6 text-primary-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">خدمة مجانية</h2>
              <p>موقع موازنتي هو خدمة تعليمية مجانية بالكامل. لا نفرض أي رسوم أو اشتراكات على المستخدمين.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">المنتجات الرقمية</h2>
              <p>بما أن الموقع مجاني ولا يبيع أي منتجات رقمية أو خدمات مدفوعة، فإن سياسة الاسترداد لا تنطبق بشكل مباشر.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">حقوقك</h2>
              <p>كمستخدم مجاني، لديك الحق في:</p>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>حذف حسابك في أي وقت</li>
                <li>طلب حذف جميع بياناتك الشخصية</li>
                <li>التوقف عن استخدام الموقع في أي وقت</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">التغييرات على الخدمة</h2>
              <p>نحتفظ بحق تعديل أو إيقاف أي ميزة من ميزات الموقع في أي وقت مع إشعار مسبق عبر الموقع.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-primary-900 mb-3">التواصل</h2>
              <p>لأي استفسارات: <a href="mailto:support@mawaznety.com" className="text-primary-600 underline">support@mawaznety.com</a></p>
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

export default RefundPolicy;
