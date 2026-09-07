import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineArrowRight } from 'react-icons/hi';
import { quizQuestions as questions, quizSettings } from '../data';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === questions[currentQuestion].correct;
    if (isCorrect) setScore(score + 1);
    
    setAnswers([...answers, { questionId: questions[currentQuestion].id, answer: index, isCorrect }]);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const isFinished = currentQuestion === questions.length - 1 && showResult;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">اختبار المعرفة</h1>
        <p className="text-primary-600">اختبر معلوماتك في موازنة المواطن المصرية</p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>السؤال {currentQuestion + 1} من {questions.length}</span>
          <span>النتيجة: {score}/{questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-primary-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3" role="radiogroup" aria-label="خيارات الإجابة">
              {questions[currentQuestion].options.map((option, index) => {
                const isCorrect = index === questions[currentQuestion].correct;
                const isSelected = selectedAnswer === index;
                const showCorrect = showResult && isCorrect;
                const showWrong = showResult && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                    onClick={() => handleAnswer(index)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleAnswer(index); } }}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={option}
                    className={`w-full p-4 rounded-xl border-2 text-right transition-all flex items-center justify-between ${
                      showCorrect
                        ? 'border-green-500 bg-green-50'
                        : showWrong
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    disabled={showResult}
                  >
                    <span className="font-medium">{option}</span>
                    <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                      {showCorrect && <HiOutlineCheckCircle className="w-5 h-5 text-green-500" />}
                      {showWrong && <HiOutlineXCircle className="w-5 h-5 text-red-500" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <button
                  onClick={nextQuestion}
                  className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>السؤال التالي</span>
                  <HiOutlineArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl font-bold text-primary-600">{score}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">انتهى الاختبار!</h2>
            <p className="text-gray-500 mb-6">
              نتيجتك: {score} من {questions.length}
            </p>
            <p className="text-lg mb-6">
              {score === questions.length
                ? 'ممتاز! أداء رائع!'
                : score >= questions.length / 2
                ? 'جيد! واصل التقدم!'
                : 'حاول مرة أخرى!'}
            </p>
            <button
              onClick={restartQuiz}
              className="bg-primary-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              إعادة الاختبار
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
