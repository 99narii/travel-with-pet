import { motion } from 'framer-motion';
import { useLocale } from '../../../hooks';
import { Container } from '../../layout';
import { ArrowLink, ScatterText, ScrollIndicator } from '../../ui';
import styles from './Hero.module.css';

interface HeroProps {
  backgroundImage?: string;
  backgroundVideo?: string;
}

export function Hero({ backgroundImage, backgroundVideo }: HeroProps) {
  const { t } = useLocale();

  // travelshift 스타일: 기본 배경 이미지
  const defaultBg =
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop';

  return (
    <div className={styles.hero}>
      {/* Background */}
      <div className={styles.background}>
        {backgroundVideo ? (
          <video
            className={styles.backgroundVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            src={backgroundImage || defaultBg}
            alt=""
            className={styles.backgroundImage}
            aria-hidden="true"
          />
        )}
        <div className={styles.overlay} aria-hidden="true" />
      </div>

      {/* Content */}
      <Container>
        <div className={styles.content}>
          <h1 className={styles.title}>
            <ScatterText
              text={t('hero.title')}
              delay={0.3}
              duration={1.8}
              staggerDelay={0.05}
            />
          </h1>

          <p className={styles.subtitle}>
            <ScatterText
              text={t('hero.subtitle')}
              delay={1.5}
              duration={1.5}
              staggerDelay={0.03}
            />
          </p>

          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ delay: 3, duration: 0.8, ease: 'easeOut' }}
          >
            <ArrowLink to="/about" className={styles.heroLink}>
              {t('hero.linkText')}
            </ArrowLink>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <ScrollIndicator />
      </div>
    </div>
  );
}
