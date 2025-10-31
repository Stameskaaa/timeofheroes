import { useGetHostileCreaturesListQuery } from '@/features/hostileCreatures/api';
import { useSearchByQuery } from '@/hooks/useSearchByQuery';
import { CreationCardList } from './ui/CreatureCardList';
import { usePagination } from '@/hooks/usePagination';

export const RaidBossListPage = () => {
  const { control, debouncedName } = useSearchByQuery();
  const { onPageChange, currentPage, limit } = usePagination({ defaultLimit: 12 });
  const { data, isError, isLoading } = useGetHostileCreaturesListQuery({
    type: 'raidBoss',
    query: debouncedName,
    page: currentPage,
    limit,
  });

  return (
    <CreationCardList
      isLoading={isLoading}
      isError={isError}
      control={control}
      title="Рейдбоссы"
      creatureData={data?.data}
      meta={data?.meta}
      onPageChange={onPageChange}
      currentPage={currentPage}
      limit={limit}
    />
  );
};
