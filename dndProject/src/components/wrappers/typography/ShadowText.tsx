import { motion } from 'framer-motion';

export const ShadowText = ({ text }: { text: string }) => {
  return (
    <>
      <motion.h1
        className={
          'text-3xl md:text-4xl font-extrabold text-text-primary uppercase antialiased ' +
          '[--c1:#ff005e] [--c2:#00d4ff] [--x1:5px] [--y1:5px] [--x2:10px] [--y2:10px] ' +
          '[text-shadow:var(--x1)_var(--y1)_0_var(--c1),var(--x2)_var(--y2)_0_var(--c2)]'
        }
        animate={{
          ['--x1' as any]: ['2px', '-2px'],
          ['--y1' as any]: ['2px', '-2px'],
          ['--x2' as any]: ['4px', '-4px'],
          ['--y2' as any]: ['4px', '-4px'],
          ['--c1' as any]: ['#ff005e', '#00d4ff'],
          ['--c2' as any]: ['#00d4ff', '#ff005e'],
        }}
        transition={{
          duration: 1.5,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'reverse',
        }}>
        {text}
      </motion.h1>
    </>
  );
};
