import { useState } from 'react';
import { Spell } from '@/features/spells/types';
import { useGetSpellsListQuery } from '@/features/spells/api';
import { Filters } from '../ui/Filters';
import { usePagination } from '@/hooks/usePagination';
import { useSpellsFilters } from './useSpellsFilters';
import { CharacterModalWrapper } from '../ui/CharacterModalWrapper';
import { SpellContent } from './components/spellContent/SpellContent';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { SpellCard } from '@/pages/character/spells/components/spellCard/SpellCard';
import { Pagination } from '@/components/wrappers/navigation/pagination/Pagination';
import { AnimatedGridList } from '@/components/wrappers/lists/AnimatedGridList/AnimatedGridList';

export const SpellsPage = () => {
  const { control, spellSelectors, ...filters } = useSpellsFilters();
  const { currentPage, limit, onPageChange } = usePagination({ defaultLimit: 40 });
  const [openedSpell, setOpenedSpell] = useState<null | Spell>(null);
  const { data, isLoading, isError } = useGetSpellsListQuery({
    ...filters,
    limit,
    page: currentPage,
  });

  return (
    <>
      <Filters selectors={spellSelectors} control={control} inputName="name" />
      <AsyncWrapper isLoading={isLoading} isError={isError}>
        <AnimatedGridList gap={8} minW={280}>
          {data?.data?.map((spell, i) => (
            <SpellCard key={i} onClick={() => setOpenedSpell(spell)} data={spell} />
          ))}
        </AnimatedGridList>
        <CharacterModalWrapper
          type="spells"
          currentId={openedSpell?.id}
          open={!!openedSpell}
          closeAction={() => setOpenedSpell(null)}>
          <SpellContent data={openedSpell} />
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
