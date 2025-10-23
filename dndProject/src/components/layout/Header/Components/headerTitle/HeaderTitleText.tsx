import classNames from 'classnames';
import { motion, useAnimation, type HTMLMotionProps } from 'framer-motion';
import { useEffect, useState, type RefObject } from 'react';

interface HeaderTitleProps {
  title: string;
  parentRef: RefObject<HTMLDivElement | null>;
  isScrolled?: boolean;
}

interface Positions {
  start: { top: number; left: number };
}

const debounceMs = 50;

export const AnimatedHeaderTitleText = ({ title, parentRef, isScrolled }: HeaderTitleProps) => {
  const controls = useAnimation();
  const [positions, setPositions] = useState<Positions>({
    start: { top: 0, left: 0 },
  });

  const [debouncedScrolled, setDebouncedScrolled] = useState(isScrolled);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const calculatePositions = () => {
      let start = { top: 0, left: 0 };
      if (parentRef.current) {
        const rect = parentRef.current.getBoundingClientRect();
        start = {
          top: rect.top + rect.height / 2,
          left: rect.left,
        };
      }
      setPositions({ start });
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedScrolled(isScrolled), debounceMs);
    return () => clearTimeout(timer);
  }, [isScrolled]);

  useEffect(() => {
    const config = {
      top: debouncedScrolled ? positions.start.top : window.innerHeight / 2,
      left: debouncedScrolled ? positions.start.left : window.innerWidth / 2,
      scale: debouncedScrolled ? 0.5 : 1,
      x: debouncedScrolled ? 0 : '-50%',
      y: '-50%',
      transition: { duration: 0.3, ease: 'easeInOut' },
    };

    if (!mounted) {
      controls.set(config as any);
      setMounted(true);
    } else {
      controls.start(config as any);
    }
  }, [debouncedScrolled, positions, controls, mounted]);

  return (
    <HeaderTitleText
      className="text-4xl md:text-5xl fixed"
      style={{ transformOrigin: 'left' }}
      initial={false}
      animate={controls}>
      {title}
    </HeaderTitleText>
  );
};

interface TitleProps extends HTMLMotionProps<'h1'> {
  children: any;
}
export const HeaderTitleText: React.FC<TitleProps> = ({ children, ...props }) => {
  return (
    <motion.h1
      {...props}
      style={{
        ...{
          fontFamily: 'Cinzel',
        },
        ...props?.style,
      }}
      className={classNames(
        'text-center leading-[40px] w-max flex items-center gap-4 bg-gradient-to-br bg-text-primary bg-clip-text text-transparent text-2xl md:text-3xl',
        props?.className,
      )}>
      {children}
    </motion.h1>
  );
};
