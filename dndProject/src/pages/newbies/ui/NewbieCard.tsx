import { Text } from '@/components/wrappers/typography/Text';
import React from 'react';
import { cardHeight } from '../NewbiesPage';

export const NewbieCard = () => {
  return (
    <div
      style={{ '--card-height': `${cardHeight}px` } as React.CSSProperties}
      className={`w-[300px] h-auto md:[height:var(--card-height)] md:w-[400px] p-6 flex flex-col gap-4 bg-brand-400 border-[1px] border-brand-200`}>
      <Text color="brand-100" size="2xl">
        Заголовок
      </Text>
      <div className="w-full h-[1px] bg-brand-200"></div>
      <Text size="lg" color="text-secondary">
        Познакомьтесь с сутью и нашими предложениями по формату проведения игр Классические игры
        новичков Закрытые кампании для своих друзей Индивидуальные отыгрыши
      </Text>
    </div>
  );
};
