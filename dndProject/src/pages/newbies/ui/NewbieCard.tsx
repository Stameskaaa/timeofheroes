import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cardHeight } from '../NewbiesPage';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';

interface NewbieCardProps {
  title: string;
  description: string;
  links?: { text: string; url: string }[];
}

export const NewbieCard = ({ title, description, links }: NewbieCardProps) => {
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    const isExternal = url?.startsWith('http') || url?.startsWith('//');

    if (isExternal) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(url);
    }
  };

  return (
    <div
      style={{ '--card-height': `${cardHeight}px` } as React.CSSProperties}
      className={`w-[330px] h-auto md:h-(--card-height) md:w-[410px] p-3 md:p-5 flex flex-col gap-4 bg-brand-400 border border-brand-200`}>
      <Text color="brand-100" weight="bold" size="xl">
        {title}
      </Text>
      <Separator edgeEffect="block" spacing="empty" edgeColor="brand-200" />
      <Text color="text-secondary">{description}</Text>

      {links && links?.length > 0 && (
        <div className="flex gap-2 flex-wrap w-full mt-auto">
          {links?.map(({ text, url }, i) => (
            <Button size="sm" key={i} variant="secondary" onClick={() => handleClick(url)}>
              {text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
