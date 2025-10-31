import { ReactNode } from 'react';
import classNames from 'classnames';
import { AccordionContent, AccordionItem } from '@radix-ui/react-accordion';
import { useFavoriteFetch } from './useFavoriteFetch';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { ClassContent } from '../character/classes/ClassContent';
import { RaceContent } from '../character/races/components/RaceContent';
import { Section } from '@/components/wrappers/sections/section/Section';
import { AccordionRoot, AccordionTrigger } from '@/components/ui/accordion';
import { TraitsContent } from '../character/traits/components/TraitsContent';
import { OriginContent } from '../character/origin/components/OriginContent';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { SpellContent } from '../character/spells/components/spellContent/SpellContent';

export const FavoritesPage = () => {
  const { isLoading, classData, originData, raceData, traitsData, spellsData } = useFavoriteFetch();

  return (
    <Section paddingY="large" fixedWidth screen>
      <Text size="2xl" className="text-center mb-2">
        Избранное
      </Text>
      <Separator edgeEffect="gradient" className="mb-10" edgeColor="brand-500" />

      <AsyncWrapper isLoading={isLoading}>
        <div className="flex items-center flex-col gap-10 flex-wrap">
          {classData && (
            <AccordionRoot type="single" id="1" collapsible className="w-full">
              <AccordionItem value={'1'}>
                <AccordionTrigger
                  className={
                    'hover:bg-brand-300 duration-300 px-3 cursor-pointer bg-brand-400 flex justify-between items-center'
                  }>
                  <Text size="xl">Класс</Text>
                </AccordionTrigger>
                <AccordionContent className={'flex flex-col p-4 gap-4 bg-brand-400'}>
                  <ItemWrapper>
                    <ClassContent data={classData} />
                  </ItemWrapper>
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          )}
          {originData && (
            <AccordionRoot type="single" id="1" collapsible className="w-full">
              <AccordionItem value={'1'}>
                <AccordionTrigger
                  className={
                    'hover:bg-brand-300 duration-300 px-3 cursor-pointer bg-brand-400 flex justify-between items-center'
                  }>
                  <Text size="xl">Происхождение</Text>
                </AccordionTrigger>
                <AccordionContent className={'flex flex-col p-4 gap-4 bg-brand-400'}>
                  <ItemWrapper>
                    <OriginContent data={originData} />
                  </ItemWrapper>
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          )}
          {raceData && (
            <AccordionRoot type="single" id="1" collapsible className="w-full">
              <AccordionItem value={'1'}>
                <AccordionTrigger
                  className={
                    'hover:bg-brand-300 duration-300 px-3 cursor-pointer bg-brand-400 flex justify-between items-center'
                  }>
                  <Text size="xl">Раса</Text>
                </AccordionTrigger>
                <AccordionContent className={'flex flex-col p-4 gap-4 bg-brand-400'}>
                  <ItemWrapper className="min-h-[800px]">
                    <RaceContent data={raceData} />
                  </ItemWrapper>
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          )}

          {traitsData?.data && traitsData?.data?.length > 0 && (
            <AccordionRoot type="single" id="1" collapsible className="w-full">
              <AccordionItem value={'1'}>
                <AccordionTrigger
                  className={
                    'hover:bg-brand-300 duration-300 px-3 cursor-pointer bg-brand-400 flex justify-between items-center'
                  }>
                  <Text size="xl">Черты</Text>
                </AccordionTrigger>
                <AccordionContent className={'flex flex-col p-4 gap-4 bg-brand-400'}>
                  {traitsData?.data?.map((data) => (
                    <ItemWrapper key={data.id}>
                      <TraitsContent data={data} />
                    </ItemWrapper>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          )}

          {spellsData?.data && spellsData?.data?.length > 0 && (
            <AccordionRoot type="single" id="2" collapsible className="w-full">
              <AccordionItem value={'2'}>
                <AccordionTrigger
                  className={
                    'hover:bg-brand-300 duration-300 px-3 cursor-pointer bg-brand-400 flex justify-between items-center'
                  }>
                  <Text size="xl">Заклинания</Text>
                </AccordionTrigger>
                <AccordionContent className={'flex flex-col p-4 gap-4 bg-brand-400'}>
                  {spellsData?.data?.map((data) => (
                    <ItemWrapper key={data.id}>
                      <SpellContent data={data} />
                    </ItemWrapper>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          )}
        </div>
      </AsyncWrapper>
    </Section>
  );
};

const ItemWrapper = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={classNames('bg-brand-500 border border-brand-200 p-4 rounded-sm', className)}>
      {children}
    </div>
  );
};
