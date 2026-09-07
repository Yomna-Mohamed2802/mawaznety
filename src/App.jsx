import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Voting from './pages/Voting';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Budget100 from './pages/Budget100';
import FinanceMinister from './pages/FinanceMinister';
import MasterDashboard from './pages/MasterDashboard';
import NotFound from './pages/NotFound';
import Download from './pages/Download';
import LoadingScreen from './components/ui/LoadingScreen';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    document.documentElement.classList.add('splash-done');
    setShowSplash(false);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      document.documentElement.classList.add('splash-done');
    }
  }, [showSplash]);

  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-surface-warm">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/download" element={<Download />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<MasterDashboard />} />
                <Route path="budget100" element={<Budget100 />} />
                <Route path="finance-minister" element={<FinanceMinister />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="voting" element={<Voting />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </div>
        {showSplash && <LoadingScreen onComplete={handleLoadingComplete} />}
      </Router>
    </AuthProvider>
  );
}

export default App;
