import { motion } from 'framer-motion';
import { useLocale } from '../../../hooks';
import styles from './ScrollIndicator.module.css';

interface ScrollIndicatorProps {
  className?: string;
}

export function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  const { t } = useLocale();

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      className={`${styles.indicator} ${className}`}
      onClick={handleClick}
      aria-label={t('hero.scrollDown')}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <span className={styles.text}>{t('hero.scrollDown')}</span>
      <motion.div
        className={styles.arrow}
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </motion.button>
  );
}
