import { useEffect } from 'react';
import { useGetRaceByIdQuery } from '@/features/races/api';
import { useGetTraitListQuery } from '@/features/traits/api';
import { useGetClassByIdQuery } from '@/features/classes/api';
import { useGetOriginByIdQuery } from '@/features/origin/api';
import { useGetSpellsListQuery } from '@/features/spells/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { clearSingle, useFavorites, useFavoritesActions } from '@/features/favorite/favoriteSlice';

export const useFavoriteFetch = () => {
  const dispatch = useFavoritesActions();

  const {
    class: classId,
    origin: originId,
    race: raceId,
    traits: traitsIds,
    spells: spellsIds,
  } = useFavorites();
  const {
    data: classData,
    error: classError,
    isLoading: classLoading,
  } = useGetClassByIdQuery({ id: classId! }, { skip: !classId });
  const {
    data: originData,
    error: originError,
    isLoading: originLoading,
  } = useGetOriginByIdQuery({ id: originId! }, { skip: !originId });
  const {
    data: raceData,
    error: raceError,
    isLoading: raceLoading,
  } = useGetRaceByIdQuery({ id: raceId! }, { skip: !raceId });
  const { data: traitsData } = useGetTraitListQuery(
    { ids: traitsIds },
    { skip: traitsIds?.length === 0 },
  );
  const { data: spellsData } = useGetSpellsListQuery(
    { ids: spellsIds },
    { skip: spellsIds?.length === 0 },
  );

  useEffect(() => {
    if ((classError as FetchBaseQueryError)?.status === 404)
      dispatch(clearSingle({ type: 'class' }));
    if ((originError as FetchBaseQueryError)?.status === 404)
      dispatch(clearSingle({ type: 'origin' }));
    if ((raceError as FetchBaseQueryError)?.status === 404) dispatch(clearSingle({ type: 'race' }));
  }, [classError, originError, raceError, dispatch]);

  const isLoading = classLoading || originLoading || raceLoading;

  return {
    classData,
    originData,
    raceData,
    traitsData,
    spellsData,
    isLoading,
  };
};
