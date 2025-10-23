import { useState } from 'react';
import { Trait } from '@/features/traits/types';
import { useGetTraitListQuery } from '@/features/traits/api';
import { Filters } from '../ui/Filters';
import { TraitCard } from './components/TraitCard';
import { useTraitsFilters } from './useTraitsFilters';
import { usePagination } from '@/hooks/usePagination';
import { TraitsContent } from './components/TraitsContent';
import { CharacterModalWrapper } from '../ui/CharacterModalWrapper';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { Pagination } from '@/components/wrappers/navigation/pagination/Pagination';
import { AnimatedGridList } from '@/components/wrappers/lists/AnimatedGridList/AnimatedGridList';

export const TraitsPage = () => {
  const [openedTrait, setOpenedTrait] = useState<null | Trait>(null);
  const { control, traitSelector, ...filters } = useTraitsFilters();
  const { currentPage, limit, onPageChange } = usePagination({ defaultLimit: 40 });
  const { data, isLoading, isError } = useGetTraitListQuery({
    ...filters,
    limit,
    page: currentPage,
  });

  return (
    <>
      <Filters selectors={[traitSelector]} control={control} inputName="name" />
      <AsyncWrapper isLoading={isLoading} isError={isError}>
        <AnimatedGridList>
          {data?.data?.map((trait, i) => (
            <TraitCard onClick={() => setOpenedTrait(trait)} key={i} traitData={trait} />
          ))}
        </AnimatedGridList>
        <CharacterModalWrapper
          type="traits"
          currentId={openedTrait?.id}
          closeAction={() => setOpenedTrait(null)}
          open={!!openedTrait}>
          <TraitsContent data={openedTrait} />
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
