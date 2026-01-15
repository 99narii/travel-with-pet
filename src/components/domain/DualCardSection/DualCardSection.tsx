import { Link } from 'react-router-dom';
import { Text } from '../../ui';
import styles from './DualCardSection.module.css';

interface CardData {
  image: string;
  imageAlt: string;
  date: string;
  title: string;
  description: string;
  href?: string;
}

interface DualCardSectionProps {
  leftCard: CardData;
  rightCard: CardData;
}

function ArticleCard({ card }: { card: CardData }) {
  const content = (
    <>
      <img
        src={card.image}
        alt={card.imageAlt}
        className={styles.cardImage}
      />
      <div className={styles.cardOverlay} aria-hidden="true" />
      <div className={styles.cardContent}>
        <span className={styles.date}>{card.date}</span>
        <div className={styles.textGroup}>
          <Text variant="h3" color="inverse" className={styles.title}>
            <span className={styles.titleText}>{card.title}</span>
          </Text>
          <Text variant="body" color="inverse" className={styles.description}>
            {card.description}
          </Text>
        </div>
      </div>
      {/* Arrow Icon */}
      <div className={styles.arrow} aria-hidden="true">
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
    </>
  );

  if (card.href) {
    return (
      <Link to={card.href} className={styles.card}>
        {content}
      </Link>
    );
  }

  return (
    <article className={styles.card}>
      {content}
    </article>
  );
}

export function DualCardSection({ leftCard, rightCard }: DualCardSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ArticleCard card={leftCard} />
        <ArticleCard card={rightCard} />
      </div>
    </section>
  );
}
