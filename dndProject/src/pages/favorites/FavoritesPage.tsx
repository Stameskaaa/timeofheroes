import { ReactNode } from 'react';
import { useFavoriteFetch } from './useFavoriteFetch';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { ClassContent } from '../character/classes/ClassContent';
import { RaceContent } from '../character/races/components/RaceContent';
import { Section } from '@/components/wrappers/sections/section/Section';
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
            <Container title="Класс">
              <Text color="brand-100" weight="bold" size="2xl" className="text-center mb-2">
                Класс
              </Text>
              <ClassContent data={classData} />
            </Container>
          )}
          {originData && (
            <Container title="Происхождение">
              <Text color="brand-100" size="2xl" className="text-center mb-2">
                Происхождение
              </Text>
              <OriginContent data={originData} />
            </Container>
          )}
          {raceData && (
            <Container title="Раса">
              <RaceContent data={raceData} />
            </Container>
          )}

          {traitsData?.data && traitsData?.data?.length > 0 && (
            <Container title="Черты">
              {traitsData?.data?.map((data) => (
                <TraitsContent key={data.id} data={data} />
              ))}
            </Container>
          )}
          {spellsData?.data && spellsData?.data?.length > 0 && (
            <Container title="Заклинания">
              {spellsData?.data?.map((data) => (
                <SpellContent key={data.id} data={data} />
              ))}
            </Container>
          )}
        </div>
      </AsyncWrapper>
    </Section>
  );
};

const Container = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className="bg-brand-400 border border-brand-200 max-w-[800px] w-full p-4 rounded-sm">
      <Text size="2xl" className="text-center mb-4">
        {title}
      </Text>
      {children}
    </div>
  );
};
