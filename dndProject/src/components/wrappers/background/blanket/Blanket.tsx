import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

type BlanketProps = HTMLMotionProps<'div'> & { duration?: number };

const defaultStyle: React.CSSProperties = {
  background: 'rgba(0,0,0,0.35)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
};

export const Blanket: React.FC<BlanketProps> = ({ className, style, duration = 0.3, ...props }) => {
  return (
    <motion.div
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
      style={{ ...defaultStyle, ...style }}
      className={`w-full h-screen fixed inset-0 ${className ?? ''}`}
    />
  );
};
