import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { type ReactNode } from 'react';

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

export const AnimatedGridList = ({
  children,
  minW = 250,
  gap = 4,
}: {
  children: ReactNode;
  minW?: number;
  gap?: number;
}) => {
  const childrenArray = React.Children.toArray(children);
  const childrenKey = childrenArray.map((child) => (child as any)?.key || '').join('-');

  return (
    <motion.div
      key={childrenKey}
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
};
