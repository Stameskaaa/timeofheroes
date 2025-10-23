import { useGetHostileCreaturesListQuery } from '@/features/hostileCreatures/api';
import { usePagination } from '@/hooks/usePagination';
import { CreationCardList } from './ui/CreatureCardList';
import { useSearchByQuery } from '@/hooks/useSearchByQuery';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';

export const BeastListPage = () => {
  const { control, debouncedName } = useSearchByQuery();
  const { onPageChange, currentPage, limit } = usePagination();
  const { data, isError, isLoading } = useGetHostileCreaturesListQuery({
    type: 'monster',
    query: debouncedName,
    page: currentPage,
    limit,
  });

  return (
    <AsyncWrapper isError={isError} isLoading={isLoading}>
      <CreationCardList
        isLoading={isLoading}
        isError={isError}
        control={control}
        title="Бестиарий"
        creatureData={data?.data}
        meta={data?.meta}
        onPageChange={onPageChange}
        currentPage={currentPage}
        limit={limit}
      />
    </AsyncWrapper>
  );
};
