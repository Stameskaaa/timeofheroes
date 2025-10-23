import type { CSSProperties } from 'react';

// Константы с ключами и значениями
export const sizeMap = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
} as const;

export const weightMap = {
  normal: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold',
} as const;

export const fontMap = {
  Cinzel: 'font-cinzel',
  Nunito: 'font-nunito',
} as const;

export const colorMap = {
  'brand-50': 'text-[var(--color-brand-50)]',
  'brand-100': 'text-[var(--color-brand-100)]',
  'brand-200': 'text-[var(--color-brand-200)]',
  'brand-300': 'text-[var(--color-brand-300)]',
  'brand-400': 'text-[var(--color-brand-400)]',
  'brand-500': 'text-[var(--color-brand-500)]',
  'accent-100': 'text-[var(--color-accent-100)]',
  'accent-200': 'text-[var(--color-accent-200)]',
  'accent-300': 'text-[var(--color-accent-300)]',
  'text-primary': 'text-[var(--color-text-primary)]',
  'text-secondary': 'text-[var(--color-text-secondary)]',
  'text-description': 'text-[var(--color-text-description)]',
  'text-muted': 'text-[var(--color-text-muted)]',
  'text-destructive': 'text-[var(--color-error)]',
} as const;

export const gradientMap = {
  none: '',
  'brand-gradient':
    'bg-gradient-to-br from-[var(--color-brand-200)] via-[var(--color-brand-100)] to-[var(--color-brand-50)] bg-clip-text text-transparent',

  'brand-bright':
    'bg-gradient-to-br from-[var(--color-brand-bright-400)] to-[var(--color-brand-bright-100)] bg-clip-text text-transparent',

  'brand-bright-contrast':
    'bg-gradient-to-br from-[var(--color-brand-bright-500)] via-[var(--color-brand-bright-200)] to-[var(--color-brand-bright-50)] bg-clip-text text-transparent',

  'brand-bright-alt':
    'bg-gradient-to-br from-[var(--color-brand-bright-300)] to-[var(--color-brand-bright-50)] bg-clip-text text-transparent',
} as const;

// Типы из ключей констант
export type Size = keyof typeof sizeMap;
export type Weight = keyof typeof weightMap;
export type Font = keyof typeof fontMap;
export type BaseColor = keyof typeof colorMap;
export type Gradient = keyof typeof gradientMap;

export type TypographyProps = {
  style?: CSSProperties;
  children?: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';
  color?: BaseColor;
  gradient?: Gradient;
  size?: Size;
  weight?: Weight;
  font?: Font;
  className?: string;
  maxCount?: number;
  htmlFor?: string;
};
