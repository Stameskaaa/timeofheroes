import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { Trait } from '@/features/traits/types';
import { useGetTraitByIdQuery } from '@/features/traits/api';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { DescriptionList } from '@/components/wrappers/typography/DescriptionList';

export const TraitsContent = ({ data }: { data?: Trait | null }) => {
  const { id: paramsId } = useParams();
  const id = Number(paramsId);
  const { data: traitData, isError, isLoading } = useGetTraitByIdQuery(!data ? { id } : skipToken);

  const resultData = traitData || data;

  return (
    <AsyncWrapper isLoading={isLoading} isError={isError}>
      <div className="flex flex-col w-full min-w-0">
        <div className="pb-3 flex">
          <Text className="mx-auto" size="xl">
            {resultData?.name}
          </Text>
        </div>
        <Separator className="mt-0" edgeEffect="block" edgeColor="brand-200" />
        {resultData?.requirements ? (
          <>
            <DescriptionList data={[{ title: 'Требования', value: resultData?.requirements }]} />
            <Separator spacing="equalSmall" edgeEffect="block" edgeColor="brand-200" />
          </>
        ) : null}
        <MarkDownText>{resultData?.mdDescription || ''}</MarkDownText>
      </div>
    </AsyncWrapper>
  );
};
