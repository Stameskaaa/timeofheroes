import { useState } from 'react';
import { Origin } from '@/features/origin/types';
import { useGetOriginListQuery } from '@/features/origin/api';
import { Filters } from '../ui/Filters';
import { OriginCard } from './components/OriginCard';
import { usePagination } from '@/hooks/usePagination';
import { OriginContent } from './components/OriginContent';
import { useDefaultFilters } from '../hooks/useDefaultFilters';
import { CharacterModalWrapper } from '../ui/CharacterModalWrapper';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { Pagination } from '@/components/wrappers/navigation/pagination/Pagination';
import { AnimatedGridList } from '@/components/wrappers/lists/AnimatedGridList/AnimatedGridList';

export const OriginPage = () => {
  const { debouncedName, worldId, control } = useDefaultFilters();
  const [openedOrigin, setOpenedOrigin] = useState<null | Origin>(null);
  const { currentPage, limit, onPageChange } = usePagination({ defaultLimit: 40 });
  const { data, isError, isLoading } = useGetOriginListQuery({
    query: debouncedName,
    worldId,
    limit,
    page: currentPage,
  });

  return (
    <>
      <Filters control={control} inputName="name" />
      <AsyncWrapper isLoading={isLoading} isError={isError}>
        <AnimatedGridList>
          {data?.data?.map((origin, i) => (
            <OriginCard onClick={() => setOpenedOrigin(origin)} key={i} originData={origin} />
          ))}
        </AnimatedGridList>
        <CharacterModalWrapper
          type="origin"
          currentId={openedOrigin?.id}
          open={!!openedOrigin}
          closeAction={() => setOpenedOrigin(null)}>
          <OriginContent data={openedOrigin} />
        </CharacterModalWrapper>
        {!!data?.meta?.total && (
          <Pagination
            className="mt-10"
            onPageChange={onPageChange}
            total={data.meta.total}
            currentPage={currentPage}
            limit={limit}
          />
        )}
      </AsyncWrapper>
    </>
  );
};
