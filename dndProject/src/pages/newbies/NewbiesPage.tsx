import { Text } from '@/components/wrappers/typography/Text';
import { Section } from '@/components/wrappers/sections/section/Section';
import { NewbieCard } from './ui/NewbieCard';
import { ArrowDown } from 'lucide-react';
import React from 'react';

export const cardHeight = 334;

export const NewbiesPage = () => {
  const gap = cardHeight;
  const cardsCount = 4;

  return (
    <Section paddingY="large" className="flex flex-col" fixedWidth screen>
      <Text color="brand-100" className="!text-3xl md:text-[50px] mx-auto mb-15">
        Новым игрокам
      </Text>

      <div
        style={{ paddingTop: cardHeight / 2 }}
        className=" gap-18 mx-auto hidden lg:flex justify-center">
        <div style={{ marginTop: gap, gap }} className={`flex flex-col`}>
          {Array.from({ length: cardsCount }).map((_, i) => (
            <NewbieCard key={i} />
          ))}
        </div>
        <div
          style={{
            marginTop: `${-(cardHeight / 2)}px`,
            height: `${cardsCount * 2 * cardHeight}px`,
          }}
          className="w-[1px] relative h-full bg-brand-200">
          {Array.from({ length: cardsCount * 2 + 1 }).map((_, i) => (
            <div
              key={i}
              style={{
                top: i * cardHeight,
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              className="w-[36px] flex justify-center items-center h-[36px] rounded-full border border-brand-200 bg-brand-400 absolute">
              <Text color="brand-100" as="span" size="md">
                {i === 0 ? <ArrowDown size={18} /> : `0${i}`}
              </Text>
            </div>
          ))}
        </div>

        <div style={{ gap }} className="flex flex-col">
          {Array.from({ length: cardsCount }).map((_, i) => (
            <NewbieCard key={i} />
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:hidden gap-2 items-center">
        {Array.from({ length: cardsCount * 2 }).map((_, i) => (
          <React.Fragment key={i}>
            <NewbieCard />

            {i !== cardsCount * 2 - 1 && (
              <div className="w-[1px] relative bg-brand-200 h-[100px]" />
            )}
          </React.Fragment>
        ))}
      </div>
    </Section>
  );
};
