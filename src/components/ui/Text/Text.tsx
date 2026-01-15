import { createElement, type ReactNode, type CSSProperties, type ElementType } from 'react';
import styles from './Text.module.css';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'overline';

type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';
type TextColor = 'default' | 'secondary' | 'tertiary' | 'primary' | 'accent' | 'inverse';
type TextAlign = 'left' | 'center' | 'right';
type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

interface TextProps {
  variant?: TextVariant;
  as?: TextElement;
  color?: TextColor;
  align?: TextAlign;
  weight?: TextWeight;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const variantElementMap: Record<TextVariant, TextElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  'body-sm': 'p',
  caption: 'span',
  overline: 'span',
};

export function Text({
  variant = 'body',
  as,
  color = 'default',
  align,
  weight,
  className = '',
  style,
  children,
}: TextProps) {
  const element: ElementType = as || variantElementMap[variant];

  const classNames = [
    styles.text,
    styles[variant],
    styles[`color-${color}`],
    align ? styles[`align-${align}`] : '',
    weight ? styles[`weight-${weight}`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return createElement(element, { className: classNames, style }, children);
}
