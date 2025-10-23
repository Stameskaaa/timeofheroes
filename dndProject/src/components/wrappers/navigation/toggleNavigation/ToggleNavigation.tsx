import { useId, useRef } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion, useCycle, type Variants } from 'framer-motion';
import { Navigation } from './Navigation';
import { MenuToggle } from './MenuToggle';
import { useDimensions } from './use-dimensions';
import { ModalHeaderIndex } from '@/constants/zIndex';
import { useScrollLock } from '@/features/scroll/hooks';
import { Blanket } from '../../background/blanket/Blanket';

const sidebar: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
    boxShadow: 'md',
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(25px at calc(100% - 40px) 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const shadowVariants: Variants = {
  open: {
    boxShadow: '-4px 0 6px rgba(0,0,0,0.5)',
    transition: { duration: 0.3 },
  },
  closed: {
    boxShadow: 'none',
    transition: { duration: 0.3 },
  },
};

export const ToggleNavigation = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const id = useId();
  useScrollLock(id, isOpen);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <>
      <motion.nav
        style={{ zIndex: ModalHeaderIndex }}
        className={`absolute top-0 right-0 max-w-[310px] w-[300px] h-screen overflow-hidden  ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        custom={height}
        variants={shadowVariants}
        ref={containerRef}>
        <motion.div
          className={classNames('absolute bottom-0 h-full w-[300px] bg-brand-400')}
          variants={sidebar}
        />
        <AnimatePresence mode="wait">
          {isOpen && (
            <Blanket
              duration={0.3}
              onClick={() => toggleOpen()}
              key="blanket"
              style={{ zIndex: -1 }}
            />
          )}
        </AnimatePresence>
        <Navigation open={isOpen} toggle={toggleOpen} />
        <MenuToggle toggle={toggleOpen} />
      </motion.nav>
    </>
  );
};
