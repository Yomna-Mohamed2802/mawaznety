import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCheck } from 'react-icons/hi';
import { votingCategories } from '../data';

const Voting = () => {
  const [selectedCategory, setSelectedCategory] = useState('budget_priorities');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  const currentCategory = votingCategories.find(c => c.id === selectedCategory);
  const candidates = currentCategory?.options || [];
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  const handleVote = () => {
    if (selectedCandidate !== null && consentGiven) {
      setHasVoted(true);
      setShowResults(true);
    }
  };

  const getPercentage = (votes) => {
    return ((votes / totalVotes) * 100).toFixed(1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">التصويت</h1>
        <p className="text-primary-600">اختر مرشحك المفضل</p>
      </div>

      {!showResults ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCandidate(candidate.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedCandidate(candidate.id); } }}
              role="radio"
              aria-checked={selectedCandidate === candidate.id}
              tabIndex={0}
              className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer border-2 transition-all ${
                selectedCandidate === candidate.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {candidate.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{candidate.name}</h3>
                    <p className="text-sm text-gray-500">{candidate.description}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedCandidate === candidate.id
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300'
                }`}>
                  {selectedCandidate === candidate.id && (
                    <HiOutlineCheck className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {candidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    candidate.id === selectedCandidate
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    <span className="text-xl font-bold">{candidate.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{candidate.name}</h3>
                    <p className="text-sm text-gray-500">{candidate.description}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-primary-600">{getPercentage(candidate.votes)}%</p>
                  <p className="text-sm text-gray-500">{candidate.votes} صوت</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getPercentage(candidate.votes)}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`h-3 rounded-full ${
                    candidate.id === selectedCandidate ? 'bg-primary-500' : 'bg-gray-400'
                  }`}
                />
              </div>
            </motion.div>
          ))}
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-gray-500 mb-4">إجمالي الأصوات: {totalVotes}</p>
            <button
              onClick={() => {
                setShowResults(false);
                setHasVoted(false);
                setSelectedCandidate(null);
              }}
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              إعادة التصويت
            </button>
          </div>
        </div>
      )}

      {!showResults && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6"
        >
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-1 w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-xs text-primary-600 leading-relaxed">
                أوافق على{' '}
                <a href="/terms" className="underline hover:text-primary-800">الشروط والأحكام</a>
                {' '}وأؤكد أن بياناتي لن تُستخدم لأغراض أخرى
              </span>
            </label>
          </div>
          <button
            onClick={handleVote}
            disabled={selectedCandidate === null || !consentGiven}
            className="w-full bg-primary-600 text-white py-4 rounded-xl font-medium text-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            تأيد التصويت
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Voting;
