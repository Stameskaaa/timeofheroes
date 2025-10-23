import classNames from 'classnames';
import { type ReactNode } from 'react';
import { Text } from '../typography/Text';
import type { Size } from '../typography/constants';

type BadgeSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5',
  md: 'px-3 py-1',
  lg: 'px-4 py-1.5',
};

const textSize: Record<BadgeSize, Size> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const Badge = ({
  children,
  size = 'sm',
  className,
  onClick,
}: {
  children: ReactNode;
  size?: BadgeSize;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames(`w-max bg-brand-300 rounded-2xl ${sizeClasses[size]}`, className)}>
      <Text color="text-secondary" size={textSize[size]} className="leading-5">
        {children}
      </Text>
    </div>
  );
};
