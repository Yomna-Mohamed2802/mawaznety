import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCheck } from 'react-icons/hi';
import { votingCategories } from '../data';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LangContext';
import {
  saveVote,
  getUserVote,
  subscribeToVoteCounts,
  incrementCounter,
} from '../services/firestore';

const Voting = () => {
  const { lang, t } = useLang();
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('budget_priorities');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [voteCounts, setVoteCounts] = useState({});
  const [userVotes, setUserVotes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currentCategory = votingCategories.find(c => c.id === selectedCategory);
  const candidates = currentCategory?.options || [];
  const totalVotes = voteCounts.total || 0;

  useEffect(() => {
    const unsub = subscribeToVoteCounts(selectedCategory, (data) => {
      setVoteCounts(data);
    });
    return () => unsub();
  }, [selectedCategory]);

  useEffect(() => {
    if (!user) return;
    const checkUserVote = async () => {
      const vote = await getUserVote(selectedCategory, user.uid);
      if (vote) {
        setUserVotes((prev) => ({ ...prev, [selectedCategory]: vote }));
        setHasVoted(true);
        setShowResults(true);
      }
    };
    checkUserVote();
  }, [selectedCategory, user]);

  const handleVote = useCallback(async () => {
    if (!isAuthenticated) {
      setError(t.loginRequired);
      return;
    }
    if (selectedCandidate === null || !consentGiven) return;

    setLoading(true);
    setError('');
    try {
      const result = await saveVote(selectedCategory, selectedCandidate, user.uid);
      if (result.success) {
        setHasVoted(true);
        setShowResults(true);
        setUserVotes((prev) => ({ ...prev, [selectedCategory]: selectedCandidate }));
        await incrementCounter('totalVotes');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(t.voteError);
    }
    setLoading(false);
  }, [selectedCategory, selectedCandidate, consentGiven, user, isAuthenticated]);

  const getPercentage = (optionId) => {
    const votes = voteCounts[optionId] || 0;
    return totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : '0.0';
  };

  const getVotes = (optionId) => voteCounts[optionId] || 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t.voteTitle}</h1>
        <p className="text-primary-600">{t.voteSubtitle}</p>
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
                    candidate.id === userVotes[selectedCategory]
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
                  <p className="text-2xl font-bold text-primary-600">{getPercentage(candidate.id)}%</p>
                  <p className="text-sm text-gray-500">{getVotes(candidate.id)} صوت</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getPercentage(candidate.id)}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`h-3 rounded-full ${
                    candidate.id === userVotes[selectedCategory] ? 'bg-primary-500' : 'bg-gray-400'
                  }`}
                />
              </div>
            </motion.div>
          ))}
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-gray-500 mb-4">{t.voteTotal} {totalVotes}</p>
            <button
              onClick={() => {
                setShowResults(false);
                setHasVoted(false);
                setSelectedCandidate(null);
                setError('');
              }}
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
            >
              {t.voteAgain}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-50 text-red-700 p-3 rounded-xl text-sm text-center">
          {error}
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
                {t.voteConsent}
              </span>
            </label>
          </div>

          {!isAuthenticated && (
            <div className="mb-4 bg-yellow-50 text-yellow-700 p-3 rounded-xl text-sm text-center">
              {t.voteLogin}
            </div>
          )}

          <button
            onClick={handleVote}
            disabled={selectedCandidate === null || !consentGiven || loading || !isAuthenticated}
            className="w-full bg-primary-600 text-white py-4 rounded-xl font-medium text-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t.voteSaving : t.voteConfirm}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Voting;
