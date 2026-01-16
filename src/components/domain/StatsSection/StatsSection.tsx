import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '../../../hooks';
import { Text, ArrowLink } from '../../ui';
import { Container } from '../../layout';
import styles from './StatsSection.module.css';

interface StatItem {
  number: string;
  label: string;
}

interface StatsProps {
  stats: StatItem[];
  images: string[];
}

export function StatsSection({ stats, images }: StatsProps) {
  const { t } = useLocale();
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...images, ...images, ...images];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 1; // pixels per frame
    const totalWidth = track.scrollWidth / 3; // width of one set of images

    const animate = () => {
      positionRef.current -= speed;

      // Reset position when one full set has scrolled
      if (Math.abs(positionRef.current) >= totalWidth) {
        positionRef.current = 0;
      }

      track.style.transform = `translateX(${positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.section}>
      {/* Stats Content - Top */}
      <div className={styles.content}>
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <span className={styles.statNumber}>{stat.number}</span>
              <Text variant="body" className={styles.statLabel}>
                {stat.label}
              </Text>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee Image Train - Bottom */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack} ref={trackRef}>
          {duplicatedImages.map((image, index) => (
            <div key={index} className={styles.marqueeItem}>
              <img
                src={image}
                alt=""
                className={styles.marqueeImage}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text Button - Bottom Right */}
      <Container>
        <div className={styles.ctaWrapper}>
          <ArrowLink to="/about" className={styles.heroLink}>
            {t('hero.linkText')}
          </ArrowLink>
        </div>
      </Container>
    </section>
  );
}
