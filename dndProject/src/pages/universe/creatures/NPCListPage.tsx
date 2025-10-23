import { useGetNPCListQuery } from '@/features/npc/api';
import { CreationCardList } from './ui/CreatureCardList';
import { useSearchByQuery } from '@/hooks/useSearchByQuery';
import { usePagination } from '@/hooks/usePagination';

export const NPCListPage = () => {
  const { control, debouncedName } = useSearchByQuery();
  const { onPageChange, currentPage, limit } = usePagination();
  const { data, isLoading, isError } = useGetNPCListQuery({
    query: debouncedName,
    page: currentPage,
    limit,
  });

  return (
    <CreationCardList
      isLoading={isLoading}
      isError={isError}
      control={control}
      title="Личности"
      meta={data?.meta}
      onPageChange={onPageChange}
      currentPage={currentPage}
      limit={limit}
      creatureData={data?.data}
    />
  );
};
