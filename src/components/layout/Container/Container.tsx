import type { ReactNode, CSSProperties } from 'react';
import styles from './Container.module.css';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps {
  size?: ContainerSize;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Container({
  size = 'xl',
  className = '',
  style,
  children,
}: ContainerProps) {
  const classNames = [styles.container, styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
}
