import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { Origin } from '@/features/origin/types';
import { useGetOriginByIdQuery } from '@/features/origin/api';
import { Equipment } from '../../ui/Equipment';
import { useAppSelector } from '@/hooks/reduxHooks';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { DescriptionList } from '@/components/wrappers/typography/DescriptionList';

export const OriginContent = ({ data }: { data?: Origin | null }) => {
  const characteristics = useAppSelector((state) => state.characteristic.characteristics);
  const { id: paramsId } = useParams();
  const id = Number(paramsId);
  const { data: classData, isError, isLoading } = useGetOriginByIdQuery(!data ? { id } : skipToken);

  const resultData = classData || data;

  return (
    <AsyncWrapper isLoading={isLoading} isError={isError}>
      <div className="pb-3 flex">
        <Text className="mx-auto" size="xl">
          {resultData?.name}
        </Text>
      </div>
      <div className="flex flex-col w-full min-w-0">
        <Separator spacing="equalSmall" className="mt-0" edgeEffect="block" edgeColor="brand-200" />
        <DescriptionList
          options={{ gap: 4, background: true }}
          data={[
            {
              title: 'Характеристики',
              value:
                resultData?.characteristicIds
                  ?.map((id) => characteristics?.find((c) => c?.id === id)?.name)
                  .filter(Boolean)
                  .join(', ') || '',
            },

            {
              title: 'Черты',
              value: resultData?.features
                ?.map((f) => f?.name)
                .filter(Boolean)
                .join(', '),
            },
            { title: 'Навыки', value: resultData?.skills },
            ...(resultData?.toolSkills
              ? [
                  {
                    title: 'Владение инструментами',
                    value: resultData.toolSkills,
                  },
                ]
              : []),
            {
              title: 'Снаряжение (Выберите А или Б)',
              value: (
                <Equipment
                  first={resultData?.startEquipment?.[0] || ''}
                  second={resultData?.startEquipment?.[1] || ''}
                />
              ),
            },
          ]}
        />
        {resultData?.mdDescription && (
          <>
            {' '}
            <Separator spacing="equalSmall" edgeEffect="block" edgeColor="brand-200" />
            <MarkDownText>{resultData?.mdDescription}</MarkDownText>{' '}
          </>
        )}
      </div>
    </AsyncWrapper>
  );
};
