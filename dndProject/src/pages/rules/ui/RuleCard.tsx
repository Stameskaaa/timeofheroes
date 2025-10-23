import React from 'react';
import { Text } from '@/components/wrappers/typography/Text';
import { Separator } from '@/components/ui/separator';

export interface RuleCardProps {
  onClick: (data: Omit<RuleCardProps, 'onClick'>) => void;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  title?: string;
  description?: string;
  mdContent?: string;
}

export const RuleCard: React.FC<RuleCardProps> = ({
  title,
  description,
  mdContent,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick({ title, description, icon: Icon, mdContent })}
      className="cursor-pointer hover:bg-brand-300 active:bg-brand-300/70 duration-300 transition-colors h-[180px] p-4 rounded-md bg-brand-400 w-full flex flex-col gap-3 justify-between">
      {Icon && (
        <div className="bg-brand-300 w-[40px] h-[40px] text-text-secondary rounded-full shadow-sm shadow-black p-2 grid place-items-center">
          <Icon />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <Text color="text-secondary" size="lg" className="leading-tight">
          {title}
        </Text>
        <Text color="text-description" size="sm" className="line-clamp-3">
          {description}
        </Text>
      </div>

      <Separator edgeEffect="block" edgeColor="brand-200" spacing="empty" />
    </div>
  );
};
