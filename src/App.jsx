import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/ui/LoadingScreen';
import { AuthProvider } from './context/AuthContext';
import { LangProvider } from './context/LangContext';

const Login = lazy(() => import('./pages/Login'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Voting = lazy(() => import('./pages/Voting'));
const Reports = lazy(() => import('./pages/Reports'));
const Settings = lazy(() => import('./pages/Settings'));
const Budget100 = lazy(() => import('./pages/Budget100'));
const FinanceMinister = lazy(() => import('./pages/FinanceMinister'));
const MasterDashboard = lazy(() => import('./pages/MasterDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Download = lazy(() => import('./pages/Download'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const CookiesPolicy = lazy(() => import('./pages/CookiesPolicy'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('mawaznety-splash-shown');
  });

  const handleLoadingComplete = useCallback(() => {
    document.documentElement.classList.add('splash-done');
    sessionStorage.setItem('mawaznety-splash-shown', '1');
    setShowSplash(false);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      document.documentElement.classList.add('splash-done');
    }
  }, [showSplash]);

  return (
    <LangProvider>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-surface-warm">
          <Suspense fallback={<LoadingScreen onComplete={() => {}} />}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/download" element={<Download />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/cookies" element={<CookiesPolicy />} />
                <Route path="/refund" element={<RefundPolicy />} />
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
          </Suspense>
        </div>
        {showSplash && <LoadingScreen onComplete={handleLoadingComplete} />}
      </Router>
    </AuthProvider>
    </LangProvider>
  );
}

export default App;
