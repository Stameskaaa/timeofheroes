import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { Spell } from '@/features/spells/types';
import { useGetSpellByIdQuery } from '@/features/spells/api';
import { schoolList } from '@/mock/mock';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/wrappers/badge/Badge';
import { Text } from '../../../../../components/wrappers/typography/Text';
import { SmartLink } from '@/components/wrappers/navigation/link/SmartLink';
import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { SpellDescription } from '@/pages/character/spells/components/spellDescription/SpellDescription';

export const SpellContent = ({ data }: { data?: Spell | null }) => {
  const { id: paramsId } = useParams();
  const id = Number(paramsId);
  const { data: spellData, isError, isLoading } = useGetSpellByIdQuery(!data ? { id } : skipToken);

  const resultData = spellData || data;

  const school = schoolList.find(({ id }) => id == resultData?.schoolId);
  return (
    <AsyncWrapper isLoading={isError} isError={isLoading}>
      <div className="flex flex-col gap-1 items-center pb-3">
        <Text size="2xl" weight="bold" color="brand-100">
          {data?.name}
        </Text>

        <Text size="md" color="text-secondary">
          {data?.level === 0
            ? 'Кантрип'
            : data?.level
            ? `Уровень ${data.level} · ${school?.title}`
            : school?.title}
        </Text>
      </div>
      <div className="flex flex-col gap-3">
        <Separator spacing="empty" edgeEffect="block" edgeColor="brand-200" />
        <SpellDescription type="full" data={data} />
        <Separator spacing="empty" edgeEffect="block" edgeColor="brand-200" />
        <MarkDownText>{data?.mdDescription}</MarkDownText>
        {data?.characterClasses && data?.characterClasses?.length > 0 ? (
          <div className="mt-auto flex gap-2 items-center flex-wrap">
            <Text color="text-muted" as="span">
              Доступно классам:
            </Text>
            {data?.characterClasses.map(({ name, id }) => (
              <SmartLink key={id} to={`/character/classes/${id}`}>
                <Badge>{name}</Badge>
              </SmartLink>
            ))}
          </div>
        ) : null}
      </div>
    </AsyncWrapper>
  );
};
