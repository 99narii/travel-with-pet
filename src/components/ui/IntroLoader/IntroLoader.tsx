import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/loading.json';
import styles from './IntroLoader.module.css';

interface IntroLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

export function IntroLoader({ onComplete, duration = 1000 }: IntroLoaderProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // 2초 후 exit 애니메이션 시작
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration);

    return () => clearTimeout(exitTimer);
  }, [duration]);

  // exit 애니메이션이 완료되면 컴포넌트 숨기고 onComplete 호출
  const handleAnimationComplete = () => {
    if (isExiting) {
      setIsHidden(true);
      onComplete?.();
    }
  };

  if (isHidden) return null;

  return (
    <motion.div
      className={styles.loader}
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onAnimationComplete={handleAnimationComplete}
    >
      {/* Lottie Animation */}
      <motion.div
        className={styles.lottieWrapper}
        initial={{ y: 0, opacity: 1 }}
        animate={isExiting ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{
          y: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
          opacity: { duration: 0.5, ease: 'easeOut' },
        }}
      >
        <Lottie
          animationData={loadingAnimation}
          loop={false}
          className={styles.lottie}
        />
      </motion.div>
    </motion.div>
  );
}
