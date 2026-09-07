import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          dir="rtl"
          role="dialog"
          aria-label="إشعار ملفات تعريف الارتباط"
        >
          <div className="max-w-2xl mx-auto bg-primary-900 text-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1">ملفات تعريف الارتباط</h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  نستخدم ملفات تعريف الارتباط الضرورية لتشغيل الموقع وتحسين تجربتك. بمتابعة استخدامك للموقع، أنت توافق على استخدامنا لملفات تعريف الارتباط وفقاً لـ{' '}
                  <Link to="/cookies" className="underline hover:text-white" aria-label="سياسة ملفات تعريف الارتباط">سياسة ملفات تعريف الارتباط</Link>{' '}
                  و{' '}
                  <Link to="/privacy" className="underline hover:text-white" aria-label="سياسة الخصوصية">سياسة الخصوصية</Link>.
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={accept}
                  className="px-4 py-2 bg-white text-primary-900 rounded-lg text-xs font-semibold hover:bg-white/90 transition-colors"
                  aria-label="قبول ملفات تعريف الارتباط"
                >
                  أقبل
                </button>
                <button
                  onClick={decline}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg text-xs font-medium hover:bg-white/20 transition-colors"
                  aria-label="رفض ملفات تعريف الارتباط"
                >
                  أرفض
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
