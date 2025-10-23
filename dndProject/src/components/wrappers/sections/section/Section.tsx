import classNames from 'classnames';
import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

type PaddingSize = 'empty' | 'medium' | 'large';

interface SectionProps extends HTMLMotionProps<'section'> {
  screen?: boolean;
  fixedWidth?: boolean;
  paddingX?: PaddingSize;
  paddingY?: PaddingSize;
}

const getPaddingClass = (size: PaddingSize, axis: 'x' | 'y') => {
  switch (size) {
    case 'large':
      return axis === 'x' ? 'px-4 sm:px-6 md:px-8 lg:px-16' : 'py-4 sm:py-6 md:py-8 lg:py-16';
    case 'medium':
      return axis === 'x' ? 'px-2 sm:px-4 md:px-6' : 'py-2 sm:py-4 md:py-6';
    case 'empty':
    default:
      return '';
  }
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      className = '',
      screen = false,
      fixedWidth = false,
      paddingX = 'medium',
      paddingY = 'empty',
      ...props
    },
    ref,
  ) => {
    return (
      <motion.section
        {...props}
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={classNames(
          'w-full',
          fixedWidth && 'max-w-[var(--width-max-container)]',
          getPaddingClass(paddingX, 'x'),
          getPaddingClass(paddingY, 'y'),
          screen && 'min-h-screen',
          className,
        )}>
        {children}
      </motion.section>
    );
  },
);
