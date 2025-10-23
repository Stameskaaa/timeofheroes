import { useParams } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { skipToken } from '@reduxjs/toolkit/query';
import { Class } from '@/features/classes/types';
import { useGetClassByIdQuery } from '@/features/classes/api';
import { armors } from '@/mock/mock';
import { Equipment } from '../ui/Equipment';
import { useAppSelector } from '@/hooks/reduxHooks';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { DescriptionList } from '@/components/wrappers/typography/DescriptionList';

export const ClassContent = ({ data }: { data?: Class | null }) => {
  const characteristics = useAppSelector((state) => state.characteristic.characteristics);
  const { id: paramsId } = useParams();
  const id = Number(paramsId);
  const { data: classData, isError, isLoading } = useGetClassByIdQuery(!data ? { id } : skipToken);

  const resultData = classData || data;

  return (
    <AsyncWrapper isError={isError} isLoading={isLoading}>
      <div className="flex flex-col w-full min-w-0">
        <div className="pb-3 flex">
          <Text className="mx-auto" size="xl">
            {resultData?.name}
          </Text>
        </div>
        <Separator spacing="equalSmall" edgeEffect="block" edgeColor="brand-200" className="mt-0" />
        <Text color="text-secondary">{resultData?.mdDescription}</Text>
        <Separator spacing="equalSmall" edgeEffect="block" edgeColor="brand-200" />

        <DescriptionList
          options={{ background: true }}
          data={[
            {
              title: 'Кость хитов',
              value: `${resultData?.diceHit || 'Неизвестно сколько'} за каждый уровень класса - ${
                resultData?.name
              }`,
            },
            {
              title: 'Основные характеристики',
              value:
                resultData?.characteristicIds
                  ?.map((id) => characteristics?.find((c) => c?.id === id)?.name)
                  ?.filter(Boolean)
                  ?.join(', ') || '',
            },
            {
              title: 'Владение спасбросками',
              value:
                resultData?.savingThrowsIds
                  ?.map((id) => characteristics?.find((c) => c?.id === id)?.name)
                  ?.filter(Boolean)
                  ?.join(', ') || '',
            },
            { title: 'Владение навыками', value: resultData?.skills },
            { title: 'Владение оружием', value: resultData?.weaponSkills },
            {
              title: 'Владение броней',
              value: resultData?.armorId
                ?.map((armorId) => armors.find(({ id }) => id == armorId)?.name)
                .join(', '),
            },
            { title: 'Владение инструментами', value: resultData?.toolSkills },
            {
              title: 'Стартовое снаряжение (Выберите А или Б)',
              value: (
                <Equipment
                  first={resultData?.startEquipment?.[0]}
                  second={resultData?.startEquipment?.[1]}
                />
              ),
            },
          ]}
        />
        <Separator spacing="equalSmall" edgeEffect="block" edgeColor="brand-200" />
        <div className="w-full overflow-auto">
          <MarkDownText>{resultData?.mdTableData || ''}</MarkDownText>
        </div>

        {resultData?.subclassSkills && resultData?.subclassSkills?.length > 0 && (
          <>
            <Separator spacing="equalSmall" edgeEffect="block" edgeColor="brand-200" />
            <div className="flex flex-col gap-4">
              <Text size="lg" className="text-center">
                Подклассы
              </Text>

              <div>
                {resultData?.subclassSkills?.map(({ title, mdDescription }, i) => (
                  <Fragment key={i}>
                    <div>
                      <Text>
                        {i + 1}. {title}
                      </Text>
                      <MarkDownText>{mdDescription || ''}</MarkDownText>
                      <Separator spacing="equalSmall" edgeEffect="gradient" edgeColor="brand-400" />
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AsyncWrapper>
  );
};
