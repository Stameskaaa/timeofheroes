import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import type { Race } from '@/features/races/types';
import { useGetRaceByIdQuery } from '@/features/races/api';
import { Separator } from '@/components/ui/separator';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { Text } from '@/components/wrappers/typography/Text';
import { Tabs } from '@/components/wrappers/navigation/tabs/Tabs';
import { Section } from '@/components/wrappers/sections/section/Section';
import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { DescriptionList } from '@/components/wrappers/typography/DescriptionList';

export const RaceContent = ({ data }: { data?: Race | null }) => {
  const width = useWindowWidth();
  const { id: paramsId } = useParams();
  const id = Number(paramsId);
  const { data: classData, isError, isLoading } = useGetRaceByIdQuery(!data ? { id } : skipToken);

  const resultData = classData || data;

  return (
    <AsyncWrapper isError={isError} isLoading={isLoading}>
      <Section className="flex-1 flex flex-col">
        <div className="pb-3 flex">
          <Text className="mx-auto" size="xl">
            {resultData?.name}
          </Text>
        </div>
        <Separator spacing="equalSmall" edgeEffect="block" edgeColor="brand-200" className="mt-0" />
        <Tabs
          bgClassName="flex-1 !bg-transparent"
          defaultTabId={1}
          activeColor="bg-brand-300"
          headerClassName="max-w-[800px] overflow-hidden m-0 !mr-auto"
          items={[
            {
              id: 1,
              title: 'Описание',
              cardContent: <MarkDownText>{resultData?.mdDescription || ''}</MarkDownText>,
            },
            {
              id: 2,
              title: width > 700 ? 'Игровые особенности' : 'Особенности',
              cardContent: <RaceFeatures features={resultData?.features} />,
            },
            {
              id: 3,
              title: 'История',
              cardContent: <MarkDownText>{resultData?.mdHistory || ''}</MarkDownText>,
            },
          ]}
        />
      </Section>
    </AsyncWrapper>
  );
};

const RaceFeatures = ({ features }: { features?: Race['features'] }) => {
  if (!features) return null;

  return (
    <div>
      <DescriptionList
        options={{ background: true }}
        data={[
          { title: 'Тип существа', value: features?.type },
          { title: 'Размер', value: features?.size },
          { title: 'Скорость', value: features?.speed },
        ]}
      />
      <Separator />
      <MarkDownText>{features?.mdContent || ''}</MarkDownText>
    </div>
  );
};
