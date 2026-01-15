import { Link } from 'react-router-dom';
import styles from './ArrowLink.module.css';

interface ArrowLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export function ArrowLink({ to, children, className = '' }: ArrowLinkProps) {
  return (
    <Link to={to} className={`${styles.link} ${className}`}>
      {children}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={styles.arrow}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
