import { useState } from 'react';
import { Class } from '@/features/classes/types';
import { useGetClassListQuery } from '@/features/classes/api';
import { Filters } from '../ui/Filters';
import { ClassCard } from './ClassCard';
import { ClassContent } from './ClassContent';
import { usePagination } from '@/hooks/usePagination';
import { useDefaultFilters } from '../hooks/useDefaultFilters';
import { CharacterModalWrapper } from '../ui/CharacterModalWrapper';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { Pagination } from '@/components/wrappers/navigation/pagination/Pagination';
import { AnimatedGridList } from '@/components/wrappers/lists/AnimatedGridList/AnimatedGridList';

export const ClassesPage = () => {
  const { debouncedName, worldId, control } = useDefaultFilters();
  const [openedClass, setOpenedClass] = useState<null | Class>(null);
  const { currentPage, limit, onPageChange } = usePagination({ defaultLimit: 20 });
  const { data, isLoading, isError } = useGetClassListQuery({
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
          {data?.data?.map((data, i) => (
            <ClassCard classData={data} onClick={() => setOpenedClass(data)} key={i} />
          ))}
        </AnimatedGridList>
        <CharacterModalWrapper
          type="class"
          currentId={openedClass?.id}
          closeAction={() => {
            setOpenedClass(null);
          }}
          open={!!openedClass}>
          <ClassContent data={openedClass} />
        </CharacterModalWrapper>
        {!!data?.meta?.total && (
          <Pagination
            className="mt-auto"
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
