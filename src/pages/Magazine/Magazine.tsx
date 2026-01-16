import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Container } from '../../components/layout';
import { ArrowLink, Text } from '../../components/ui';
import { useLocale } from '../../hooks';
import styles from './Magazine.module.css';

// Hero images for each magazine
const heroImages: Record<string, string> = {
  'jeju-pet-tour': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
  'gangwon-healing-camping': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop',
  'seoul-pet-cafe': 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2071&auto=format&fit=crop',
  'busan-beach-walk': 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2070&auto=format&fit=crop',
  'pet-friendly-pension': 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop',
  'forest-trekking': 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
};

// Content images for each magazine (indexed by position)
const contentImages: Record<string, string[]> = {
  'jeju-pet-tour': [
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop',
  ],
  'gangwon-healing-camping': [
    'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop',
  ],
  'seoul-pet-cafe': [
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop',
  ],
  'busan-beach-walk': [
    'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=2076&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
  ],
  'pet-friendly-pension': [
    'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop',
  ],
  'forest-trekking': [
    'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=2074&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2076&auto=format&fit=crop',
  ],
};

export function Magazine() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useLocale();
  const magazineData = data.magazine;

  const magazine = slug ? magazineData.items[slug as keyof typeof magazineData.items] : null;
  const images = slug ? contentImages[slug] : [];

  // Pre-compute image indices for content blocks
  const contentWithImages = useMemo(() => {
    if (!magazine?.content) return [];
    let imgIdx = 0;
    return magazine.content.map((block) => ({
      ...block,
      imageUrl: block.type === 'image' ? images[imgIdx++] : undefined,
    }));
  }, [magazine?.content, images]);

  if (!magazine) {
    return (
      <div className={styles.notFound}>
        <Container>
          <Text variant="h2">{magazineData.notFound}</Text>
          <ArrowLink to="/magazines">{magazineData.backToList}</ArrowLink>
        </Container>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{magazine.title} | TravelWithPets</title>
        <meta name="description" content={magazine.subtitle} />
      </Helmet>

      <article className={styles.article}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <img
            src={slug ? heroImages[slug] : ''}
            alt=""
            className={styles.heroImage}
            aria-hidden="true"
          />
          <div className={styles.heroOverlay} />
          <Container>
            <motion.div
              className={styles.heroContent}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className={styles.date}>{magazine.date}</span>
              <h1 className={styles.title}>{magazine.title}</h1>
              <p className={styles.subtitle}>{magazine.subtitle}</p>
            </motion.div>
          </Container>
        </header>

        {/* Content */}
        <div className={styles.content}>
          <Container>
            <div className={styles.contentInner}>
              {contentWithImages.map((block, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-50px' }}
                  transition={{ duration: 0.6 }}
                >
                  {block.type === 'text' && (
                    <p className={styles.paragraph}>{block.content}</p>
                  )}
                  {block.type === 'image' && (
                    <figure className={styles.figure}>
                      <img
                        src={block.imageUrl || ''}
                        alt={block.caption || ''}
                        className={styles.image}
                      />
                      {block.caption && (
                        <figcaption className={styles.caption}>
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                  {block.type === 'quote' && (
                    <blockquote className={styles.quote}>
                      <p>{block.content}</p>
                    </blockquote>
                  )}
                </motion.div>
              ))}
            </div>
          </Container>
        </div>

        {/* Back Link */}
        <div className={styles.backLink}>
          <Container>
            <ArrowLink to="/magazines">{magazineData.backToList}</ArrowLink>
          </Container>
        </div>
      </article>
    </>
  );
}
