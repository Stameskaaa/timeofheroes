import { useState } from 'react';
import { Race } from '@/features/races/types';
import { useGetRaceListQuery } from '@/features/races/api';
import { Filters } from '../ui/Filters';
import { RaceCard } from './components/RaceCard';
import { usePagination } from '@/hooks/usePagination';
import { RaceContent } from './components/RaceContent';
import { useDefaultFilters } from '../hooks/useDefaultFilters';
import { CharacterModalWrapper } from '../ui/CharacterModalWrapper';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { Pagination } from '@/components/wrappers/navigation/pagination/Pagination';
import { AnimatedGridList } from '@/components/wrappers/lists/AnimatedGridList/AnimatedGridList';

export const RacesPage = () => {
  const { debouncedName, worldId, control } = useDefaultFilters();
  const { currentPage, limit, onPageChange } = usePagination({ defaultLimit: 40 });
  const { data, isLoading, isError } = useGetRaceListQuery({
    query: debouncedName,
    worldId,
    limit,
    page: currentPage,
  });
  const [openRace, setOpenRace] = useState<Race | null>(null);

  return (
    <>
      <Filters inputName="name" control={control} />
      <AsyncWrapper isError={isError} isLoading={isLoading}>
        <AnimatedGridList>
          {data?.data?.map((race, i) => (
            <RaceCard onClick={() => setOpenRace(race)} key={i} raceData={race} />
          ))}
        </AnimatedGridList>
        <CharacterModalWrapper
          type="race"
          currentId={openRace?.id}
          open={!!openRace}
          closeAction={() => setOpenRace(null)}>
          <RaceContent data={openRace} />
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
