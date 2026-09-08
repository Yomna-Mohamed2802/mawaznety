import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineArrowRight } from 'react-icons/hi';
import { quizQuestions as originalQuestions, quizSettings } from '../data';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import { getDataLabel } from '../data/translateData';
import { saveQuizScore, getUserQuizScores, getLeaderboard, incrementCounter } from '../services/firestore';

const Quiz = () => {
  const { lang, t } = useLang();
  const { user, isAuthenticated } = useAuth();

  const translatedQuestions = originalQuestions.map((q) => {
    const translation = getDataLabel(lang, 'quiz', q.id);
    return {
      ...q,
      question: translation?.q || q.question,
      options: translation?.options || q.options,
      explanation: translation?.explanation || q.explanation,
    };
  });
  const questions = translatedQuestions;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    if (user) {
      getUserQuizScores(user.uid).then(setUserStats);
    }
    getLeaderboard(10).then(setLeaderboard);
  }, [user]);

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
    setShowLeaderboard(false);
  };

  const finishQuiz = async () => {
    if (isAuthenticated && user) {
      setSaving(true);
      try {
        await saveQuizScore(user.uid, { score, total: questions.length });
        await incrementCounter('quizzesCompleted');
        const updated = await getUserQuizScores(user.uid);
        setUserStats(updated);
        const board = await getLeaderboard(10);
        setLeaderboard(board);
      } catch (err) {
        console.error('Failed to save score:', err);
      }
      setSaving(false);
    }
    setShowLeaderboard(true);
  };

  const isFinished = currentQuestion === questions.length - 1 && showResult;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t.quizTitle}</h1>
        <p className="text-primary-600">{t.quizSubtitle}</p>
      </div>

      {isAuthenticated && userStats && !showLeaderboard && (
        <div className="mb-4 bg-primary-50 rounded-xl p-4 flex justify-between text-sm">
          <span className="text-primary-700">{t.quizBestScore} <strong>{userStats.bestScore}/{questions.length}</strong></span>
          <span className="text-primary-700">{t.quizAttempts} <strong>{userStats.totalAttempts}</strong></span>
        </div>
      )}

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{t.quizQuestion} {currentQuestion + 1} {t.quizFrom} {questions.length}</span>
          <span>{t.quizScore}: {score}/{questions.length}</span>
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
        {!showLeaderboard && !isFinished ? (
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
                  onClick={currentQuestion === questions.length - 1 ? finishQuiz : nextQuestion}
                  disabled={saving}
                  className="w-full bg-primary-600 text-white py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>{currentQuestion === questions.length - 1 ? (saving ? t.saving : t.quizFinish) : t.quizNext}</span>
                  <HiOutlineArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : showLeaderboard ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-primary-600">{score}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.quizEnded}</h2>
              <p className="text-gray-500 mb-2">
                {t.quizResult} {score} {t.quizFrom} {questions.length}
              </p>
              <p className="text-lg mb-4">
                {score === questions.length
                  ? t.quizExcellent
                  : score >= questions.length / 2
                  ? t.quizGood
                  : t.quizRetry}
              </p>
              {isAuthenticated && userStats && (
                <p className="text-sm text-primary-600 mb-4">
                  {t.quizBestScore} {userStats.bestScore}/{questions.length}
                </p>
              )}
            </div>

            {leaderboard.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-center">{t.quizLeaderboard}</h3>
                <div className="space-y-2">
                  {leaderboard.map((entry, i) => (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        entry.id === user?.uid ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                          i === 0 ? 'bg-yellow-400 text-white' : i === 1 ? 'bg-gray-400 text-white' : i === 2 ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {i + 1}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {entry.id === user?.uid ? t.quizYou : `مستخدم ${entry.id.slice(0, 4)}`}
                        </span>
                      </div>
                      <span className="font-bold text-primary-600">{entry.bestScore}/{questions.length}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={restartQuiz}
              className="w-full bg-primary-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              {t.quizRestart}
            </button>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.quizEnded}</h2>
            <p className="text-gray-500 mb-6">
              {t.quizResult} {score} {t.quizFrom} {questions.length}
            </p>
            <p className="text-lg mb-6">
              {score === questions.length
                ? t.quizExcellent
                : score >= questions.length / 2
                ? t.quizGood
                : t.quizRetry}
            </p>
            <button
              onClick={restartQuiz}
              className="bg-primary-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              {t.quizRestart}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
