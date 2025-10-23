import React, { forwardRef } from 'react';
import {
  colorMap,
  fontMap,
  gradientMap,
  sizeMap,
  weightMap,
  type TypographyProps,
} from './constants';
import { motion } from 'framer-motion';

export const Text: React.FC<TypographyProps> = forwardRef<any, TypographyProps>(
  (
    {
      style,
      children,
      as = 'p',
      color = 'text-primary',
      gradient = 'none',
      size = 'md',
      weight = 'normal',
      font = 'Nunito',
      className = '',
      maxCount,
      ...props
    },
    ref,
  ) => {
    const Tag = as;
    const colorClass = gradient === 'none' ? colorMap[color] : '';
    const gradientClass = gradientMap[gradient];
    const maxCountClass = maxCount ? `line-clamp-${maxCount}` : '';

    return (
      <Tag
        ref={ref}
        className={`${sizeMap[size]} ${weightMap[weight]} ${fontMap[font]} ${colorClass} ${gradientClass} ${maxCountClass} ${className}`}
        style={{
          ...(maxCount ? { WebkitLineClamp: maxCount } : {}),
          ...style,
        }}
        {...props}>
        {children}
      </Tag>
    );
  },
);

export const MotionText = motion.create(Text);
