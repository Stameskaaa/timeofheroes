import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import classNames from 'classnames';

interface TabItem {
  id: string | number;
  title: string;
  icon?: LucideIcon;
  content?: React.ReactNode;
  cardContent?: React.ReactNode;
  color?: string;
}

interface SmoothTabProps {
  items?: TabItem[];
  defaultTabId?: string | number | null;
  bgClassName?: string;
  headerClassName?: string;
  activeColor?: string;
  onChange?: (tabId: string) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    filter: 'blur(8px)',
    scale: 0.95,
    position: 'absolute' as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    position: 'absolute' as const,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    filter: 'blur(8px)',
    scale: 0.95,
    position: 'absolute' as const,
  }),
};

const transition = {
  duration: 0.4,
  ease: [0.32, 0.72, 0, 1],
};

export function Tabs({
  items,
  defaultTabId = null,
  headerClassName,
  bgClassName,
  activeColor = 'bg-[#1F9CFE]',
  onChange,
}: SmoothTabProps) {
  const [selected, setSelected] = React.useState<string | number | null>(defaultTabId);
  const [direction, setDirection] = React.useState(0);
  const [dimensions, setDimensions] = React.useState({ width: 0, left: 0 });

  const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const updateDimensions = () => {
      const selectedButton = buttonRefs.current.get(String(selected));
      const container = containerRef.current;

      if (selectedButton && container) {
        const rect = selectedButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setDimensions({
          width: rect.width,
          left: rect.left - containerRect.left,
        });
      }
    };

    updateDimensions();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    window.addEventListener('resize', updateDimensions);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [selected]);

  const handleTabClick = (tabId: string) => {
    const currentIndex = items?.findIndex((item) => item.id == selected) || 0;
    const newIndex = items?.findIndex((item) => item.id == tabId) || 0;
    setDirection(newIndex > currentIndex ? 1 : -1);
    setSelected(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, tabId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTabClick(tabId);
    }
  };

  const selectedItem = items?.find((item) => item.id == selected);

  return (
    <div className={classNames('flex flex-col h-full gap-4 bg-brand-400 rounded-lg', bgClassName)}>
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Smooth tabs"
        className={cn(
          'flex items-center justify-between gap-1 py-1 mt-auto relative',
          'bg-brand-400 w-full mx-auto',
          'border rounded-xl border-brand-200',
          'transition-all duration-200',
          headerClassName,
        )}>
        <motion.div
          className={cn('absolute rounded-lg z-[1]', selectedItem?.color || activeColor)}
          initial={false}
          animate={{
            width: dimensions.width - 8,
            x: dimensions.left + 4,
            opacity: 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
          style={{ height: 'calc(100% - 8px)', top: '4px' }}
        />

        <div
          style={{ gridTemplateColumns: `repeat(${items?.length || 1}, minmax(0, 1fr))` }}
          className={classNames('grid w-full gap-1 relative z-[2]')}>
          {items?.map((item) => {
            const isSelected = selected == item.id;

            return (
              <motion.button
                key={item.id}
                ref={(el) => {
                  if (el) buttonRefs.current.set(String(item.id), el);
                  else buttonRefs.current.delete(String(item.id));
                }}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`panel-${item.id}`}
                id={`tab-${item.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleTabClick(String(item.id))}
                onKeyDown={(e) => handleKeyDown(e, String(item.id))}
                className={cn(
                  'relative cursor-pointer flex items-center justify-center gap-0.5 rounded-lg px-2 py-1.5',
                  'text-xs md:text-sm  font-medium  transition-all duration-300 hover:text-brand-100',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'truncate',
                  isSelected ? 'text-text-primary' : 'text-text-secondary',
                )}>
                <span className="truncate">{item.title}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 mb-4 relative h-full">
        <div className="h-full w-full relative">
          <div className="absolute inset-0 overflow-hidden h-full">
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
              <motion.div
                key={`card-${selected}`}
                custom={direction}
                variants={slideVariants as any}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition as any}
                className="absolute inset-0 w-full h-full overflow-auto will-change-transform "
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}>
                {selectedItem?.cardContent}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
