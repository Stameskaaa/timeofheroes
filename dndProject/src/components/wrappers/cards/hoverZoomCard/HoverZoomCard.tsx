import classNames from 'classnames';
import { motion } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';
import { Image } from '../../image/Image';

interface HoverZoomCardProps {
  title: ReactNode;
  description: ReactNode;
  src: string;
  onClick: () => void;
  className?: string;
  animateIndex?: number;
}

export const HoverZoomCard = forwardRef<HTMLDivElement, HoverZoomCardProps>(
  ({ onClick, title, description, src, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        {...props}
        className={classNames(
          'relative cursor-pointer  group w-full transition-colors duration-300 bg-brand-400 shadow-md shadow-black h-[160px] rounded-lg flex flex-col justify-between',
          !src ? 'hover:bg-brand-300 active:bg-brand-300/70' : '',
          className,
        )}>
        <div className="absolute pointer-events-none inset-0 rounded-lg z-0 overflow-hidden">
          {src && (
            <>
              <Image
                alt="Картинка карточки"
                src={src}
                className="absolute inset-0 w-full h-full transition-transform duration-300 transform-gpu group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, #1c2224 5%, transparent 100%)',
                }}
              />
            </>
          )}
        </div>
        <div className="z-0 p-4 h-full flex flex-col gap-1">
          {title}
          {description}
        </div>
      </div>
    );
  },
);

HoverZoomCard.displayName = 'HoverZoomCard';

export const MotionHoverZoomCard = motion.create(HoverZoomCard);
