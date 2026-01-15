import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks';
import { Text } from '../../ui';
import styles from './SplitSection.module.css';

interface SplitSectionProps {
  image: string;
  imageAlt: string;
  title: string;
  imagePosition?: 'left' | 'right';
}

export function SplitSection({
  image,
  imageAlt,
  title,
  imagePosition = 'left',
}: SplitSectionProps) {
  const { fadeInUp, slideInLeft, slideInRight } = useScrollAnimation();

  const isImageLeft = imagePosition === 'left';

  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${isImageLeft ? styles.imageLeft : styles.imageRight}`}>
        {/* 이미지 영역 */}
        <motion.div
          className={styles.imageWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-100px' }}
          variants={isImageLeft ? slideInLeft : slideInRight}
        >
          <img
            src={image}
            alt={imageAlt}
            className={styles.image}
          />
        </motion.div>

        {/* 텍스트 영역 */}
        <motion.div
          className={styles.content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-100px' }}
          variants={fadeInUp}
        >
          <Text variant="h2" className={styles.title}>
            {title}
          </Text>
        </motion.div>
      </div>
    </section>
  );
}
