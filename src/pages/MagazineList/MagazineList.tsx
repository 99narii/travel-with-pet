import { useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Text } from '../../components/ui';
import { useLocale } from '../../hooks';
import styles from './MagazineList.module.css';

const magazineImages: Record<string, string> = {
  'jeju-pet-tour': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
  'gangwon-healing-camping': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop',
  'seoul-pet-cafe': 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2071&auto=format&fit=crop',
  'busan-beach-walk': 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2070&auto=format&fit=crop',
  'pet-friendly-pension': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop',
  'forest-trekking': 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
};

const magazineSlugs = [
  'jeju-pet-tour',
  'gangwon-healing-camping',
  'seoul-pet-cafe',
  'busan-beach-walk',
  'pet-friendly-pension',
  'forest-trekking',
];

export function MagazineList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollState = useRef({
    targetScroll: 0,
    currentScroll: 0,
    isAnimating: false,
  });
  const { data } = useLocale();
  const magazineData = data.magazine;

  const smoothScroll = useCallback(() => {
    const container = containerRef.current;
    const state = scrollState.current;
    if (!container) return;

    const diff = state.targetScroll - state.currentScroll;

    // Easing factor (0.1 = smooth, 0.2 = faster)
    const ease = 0.12;

    if (Math.abs(diff) > 0.5) {
      state.currentScroll += diff * ease;
      container.scrollLeft = state.currentScroll;
      requestAnimationFrame(smoothScroll);
    } else {
      state.currentScroll = state.targetScroll;
      container.scrollLeft = state.targetScroll;
      state.isAnimating = false;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize scroll state
    scrollState.current.currentScroll = container.scrollLeft;
    scrollState.current.targetScroll = container.scrollLeft;

    // Only apply wheel-to-horizontal on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const state = scrollState.current;
      const maxScroll = container.scrollWidth - container.clientWidth;

      // Normalize delta for consistent speed across devices
      // Use a fixed scroll amount based on direction
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 100);
      const scrollAmount = delta * 3;

      // Update target scroll position with bounds
      state.targetScroll = Math.max(0, Math.min(maxScroll, state.targetScroll + scrollAmount));

      // Start animation if not already running
      if (!state.isAnimating) {
        state.isAnimating = true;
        requestAnimationFrame(smoothScroll);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [smoothScroll]);

  return (
    <>
      <Helmet>
        <title>{magazineData.metaTitle}</title>
        <meta name="description" content={magazineData.metaDescription} />
      </Helmet>

      <div className={styles.page}>
        {/* Header */}
        <header className={styles.header}>
          <Text variant="h1" className={styles.pageTitle}>{magazineData.pageTitle}</Text>
          <Text variant="body" color="secondary" className={styles.pageSubtitle}>
            {magazineData.pageSubtitle}
          </Text>
        </header>

        {/* Horizontal Scroll Container */}
        <div className={styles.scrollContainer} ref={containerRef}>
          <div className={styles.cardList}>
            {magazineSlugs.map((slug, index) => {
              const item = magazineData.items[slug as keyof typeof magazineData.items];
              return (
                <motion.div
                  key={slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={`/magazine/${slug}`} className={styles.card}>
                    <div className={styles.cardImageWrapper}>
                      <img
                        src={magazineImages[slug]}
                        alt=""
                        className={styles.cardImage}
                      />
                      <div className={styles.cardOverlay} />
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardMeta}>
                        <span className={styles.category}>{item.category}</span>
                        <span className={styles.date}>{item.date}</span>
                      </div>
                      <h2 className={styles.cardTitle}>
                        <span className={styles.titleText}>{item.title}</span>
                      </h2>
                      <p className={styles.cardSubtitle}>{item.subtitle}</p>
                    </div>
                    <div className={styles.arrow}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>


      </div>
    </>
  );
}
