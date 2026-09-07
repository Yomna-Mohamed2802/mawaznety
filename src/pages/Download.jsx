import { motion } from 'framer-motion';
import { HiOutlineDocumentDownload, HiOutlineDocumentText, HiOutlineExternalLink } from 'react-icons/hi';

const Download = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full text-center"
      >
        {/* Logo */}
        <div className="w-20 h-20 bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ boxShadow: '0 8px 30px -8px rgb(16 42 67 / 0.3)' }}>
          <HiOutlineDocumentText className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-primary-900 mb-3">تحميل موازنة المواطن</h1>
        <p className="text-primary-500 text-sm leading-relaxed mb-8">
          ملف موازنة المواطن الرسمي 2026/2027 — الإصدار الثالث عشر
          <br />
          وزارة المالية المصرية · 70 صفحة
        </p>

        {/* Download card */}
        <div className="bg-white rounded-2xl shadow-lg border border-primary-100/40 p-6 mb-6">
          <div className="flex items-center gap-4 text-right mb-5">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <HiOutlineDocumentText className="w-6 h-6 text-primary-700" />
            </div>
            <div>
              <h3 className="font-bold text-primary-900 text-sm">موازنة المواطن 2026/2027</h3>
              <p className="text-xs text-primary-500">الإصدار الثالث عشر · وزارة المالية</p>
            </div>
          </div>

          <a
            href="https://www.mof.gov.eg/uploads/CitizenBudget_26-27.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-primary-700 text-white rounded-xl font-semibold text-sm hover:bg-primary-800 transition-colors"
          >
            <HiOutlineDocumentDownload className="w-5 h-5" />
            تحميل الملف PDF
            <HiOutlineExternalLink className="w-4 h-4 opacity-60" />
          </a>

          <p className="text-xs text-primary-400 mt-3">
            المصدر: وزارة المالية المصرية · صفحة رسمية
          </p>
        </div>

        {/* Info */}
        <div className="bg-surface-warm rounded-xl p-4 border border-primary-100/40">
          <p className="text-xs text-primary-600 leading-relaxed">
            هذا الملف هو المصدر الرسمي لجميع الأرقام المعروضة في موازنتي.
            جميع البيانات مأخوذة مباشرة من هذا الملف 및تم التحقق منها.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Download;
