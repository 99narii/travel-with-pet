import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Text } from '../../ui';
import { Container } from '../../layout';
import styles from './SemicircleSlider.module.css';

interface SlideData {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

interface SemicircleSliderProps {
  slides: SlideData[];
}

export function SemicircleSlider({ slides }: SemicircleSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = slides[currentIndex];
  const displayNumber = String(currentIndex + 1).padStart(2, '0');

  // Only get current, prev, and next dots
  const getVisibleDots = () => {
    const totalDots = slides.length;
    const angleStep = 35;

    const prevIndex = currentIndex === 0 ? totalDots - 1 : currentIndex - 1;
    const nextIndex = currentIndex === totalDots - 1 ? 0 : currentIndex + 1;

    return [
      { ...slides[prevIndex], index: prevIndex, angle: -angleStep, isActive: false },
      { ...slides[currentIndex], index: currentIndex, angle: 0, isActive: true },
      { ...slides[nextIndex], index: nextIndex, angle: angleStep, isActive: false },
    ];
  };

  const visibleDots = getVisibleDots();

  return (
    <section className={styles.section}>
      <Container className={styles.container}>
        <div className={styles.content}>
          <motion.span
            key={currentIndex}
            className={styles.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {displayNumber}
          </motion.span>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={styles.textGroup}
            >
              <Text variant="h2" className={styles.title}>
                {currentSlide.title}
              </Text>
              <Text variant="body" className={styles.description}>
                {currentSlide.description}
              </Text>
            </motion.div>
          </AnimatePresence>

          <div className={styles.controls}>
            <button
              className={styles.arrowButton}
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className={styles.arrowButton}
              onClick={handleNext}
              aria-label="Next slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.semicircleWrapper}>
          {/* Semicircle outline */}
          <div className={styles.semicircleOutline} aria-hidden="true" />

          {/* Rotating dots on the arc - only 3 visible */}
          <div className={styles.arcContainer}>
            <AnimatePresence mode="popLayout">
              {visibleDots.map((dot) => (
                <motion.div
                  key={dot.index}
                  className={styles.dotWrapper}
                  initial={{ rotate: dot.angle, opacity: 0 }}
                  animate={{ rotate: dot.angle, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <motion.div
                    className={styles.dot}
                    animate={{
                      scale: dot.isActive ? 1 : 0.06,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    {dot.isActive ? (
                      <motion.img
                        key={dot.index}
                        src={dot.image}
                        alt={dot.imageAlt}
                        className={styles.dotImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      />
                    ) : (
                      <div className={styles.dotBlack} />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
