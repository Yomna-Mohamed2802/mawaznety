import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="text-9xl font-bold text-primary-600 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">الصفحة غير موجودة</h1>
        <p className="text-gray-500 mb-6">عذراً، الصفحة التي تبحث عنها غير موجودة</p>
        <Link
          to="/"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
        >
          العودة للرئيسية
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
