import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { useLocale } from './hooks';
import { useUIStore } from './store';
import { Header, Footer } from './components/layout';
import { ContactModal } from './components/domain';
import { IntroLoader } from './components/ui';
import { ScrollToTop } from './components/utils';
import { About, Home, Magazine, MagazineList, NotFound } from './pages';
import './styles/global.css';

function AppContent() {
  const { t } = useLocale();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const isFirstRender = useRef(true);
  const { isContactModalOpen, closeContactModal } = useUIStore();

  // Show loader on route change (not on first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Don't show loader if already loading
    if (isLoading) return;

    setIsNavigating(true);
  }, [location.pathname]);

  const handleLoadComplete = () => {
    setIsLoading(false);
    setIsNavigating(false);
  };

  const showLoader = isLoading || isNavigating;
  const loaderDuration = isLoading ? 2800 : 1500; // Shorter for navigation

  return (
    <>
      <ScrollToTop />

      {/* Intro Loader */}
      {showLoader && (
        <IntroLoader
          duration={loaderDuration}
          onComplete={handleLoadComplete}
        />
      )}

      {/* Skip Link */}
      <a href="#main-content" className="skip-link">
        {t('a11y.skipToContent')}
      </a>

      <Header />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/magazines" element={<MagazineList />} />
          <Route path="/magazine/:slug" element={<Magazine />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </MotionConfig>
    </HelmetProvider>
  );
}
