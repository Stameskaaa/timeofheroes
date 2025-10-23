import type { ReactNode } from 'react';
import { Text } from './Text';
import classNames from 'classnames';
import type { BaseColor, Size } from './constants';
import type { LucideIcon } from 'lucide-react';

interface DescriptionListProps {
  data: { title: ReactNode; value: ReactNode; icon?: LucideIcon }[];
  options?: {
    background?: boolean;
    className?: string;
    size?: Size;
    secondaryColor?: BaseColor;
    titleColor?: BaseColor;
    gap?: number;
  };
}

export const DescriptionList: React.FC<DescriptionListProps> = ({ data, options }) => {
  const { size, secondaryColor, titleColor, gap } = options || {};

  return (
    <div
      style={{ width: '100%', ...{ gap: `${gap}px` } }}
      className={classNames(
        'flex flex-col w-full',
        options?.background ? 'bg-brand-300 py-3 px-4 rounded-md' : '',
        options?.className,
      )}>
      {data.map(({ title, value, icon: Icon }, i) => {
        return (
          <div key={i} style={{ wordWrap: 'break-word' }} className="flex w-full items-start">
            {Icon && (
              <Text style={{ lineHeight: '100%' }} size={size} className="mt-[5px] mr-[6px]">
                <Icon size={14} />
              </Text>
            )}
            <Text
              style={{ lineHeight: '100%' }}
              as="span"
              className="flex-1 !text-sm min-w-0 break-words break-all hyphens-auto items-start vertical-center"
              color={secondaryColor || 'text-secondary'}>
              <Text
                size={size}
                as="span"
                weight="bold"
                color={titleColor || 'text-secondary'}
                className="flex-shrink-0 inline-flex gap-x-1 items-center pr-1">
                {title}:
              </Text>
              {value}
            </Text>
          </div>
        );
      })}
    </div>
  );
};
