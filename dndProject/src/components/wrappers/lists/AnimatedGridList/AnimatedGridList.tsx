import classNames from 'classnames';
import { memo, type ReactNode } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const cardTransition = { type: 'spring', stiffness: 300, damping: 15 } as const;

export const AnimatedGridList = memo(
  ({ children, minW = 250, gap = 4 }: { children: ReactNode; minW?: number; gap?: number }) => {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={classNames('w-full grid justify-items-center')}
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(${minW}px, 1fr))`,
          gap: `${gap * 0.25}rem`,
        }}>
        {children}
      </motion.div>
    );
  },
);
