import { motion } from 'framer-motion';
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
  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...images, ...images];

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
        <div className={styles.marqueeTrack}>
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
              Travel with pets
            </ArrowLink>        </div>
      </Container>
    </section>
  );
}
