import { useState, type CSSProperties } from 'react';
import styles from './Image.module.css';

type ImageFit = 'cover' | 'contain' | 'fill';

interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fit?: ImageFit;
  className?: string;
  style?: CSSProperties;
  loading?: 'lazy' | 'eager';
}

export function Image({
  src,
  alt,
  width,
  height,
  fit = 'cover',
  className = '',
  style,
  loading = 'lazy',
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const classNames = [
    styles.wrapper,
    isLoaded ? styles.loaded : '',
    hasError ? styles.error : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={{
        width,
        height,
        ...style,
      }}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          className={styles.image}
          style={{ objectFit: fit }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className={styles.placeholder} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
      )}
      {!isLoaded && !hasError && <div className={styles.skeleton} />}
    </div>
  );
}
