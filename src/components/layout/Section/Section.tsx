import { forwardRef, type ReactNode, type CSSProperties } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useScrollAnimation } from '../../../hooks';
import styles from './Section.module.css';

type SectionVariant = 'default' | 'primary' | 'secondary' | 'dark';
type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl';

interface SectionProps extends Omit<HTMLMotionProps<'section'>, 'ref'> {
  variant?: SectionVariant;
  spacing?: SectionSpacing;
  fullHeight?: boolean;
  animate?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      variant = 'default',
      spacing = 'lg',
      fullHeight = false,
      animate = true,
      className = '',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { fadeInUp } = useScrollAnimation();

    const classNames = [
      styles.section,
      styles[variant],
      styles[`spacing-${spacing}`],
      fullHeight ? styles.fullHeight : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const animationProps = animate
      ? {
          initial: 'hidden',
          whileInView: 'visible',
          viewport: { once: false, margin: '-100px' },
          variants: fadeInUp,
        }
      : {};

    return (
      <motion.section
        ref={ref}
        className={classNames}
        style={style}
        {...animationProps}
        {...props}
      >
        {children}
      </motion.section>
    );
  }
);

Section.displayName = 'Section';
