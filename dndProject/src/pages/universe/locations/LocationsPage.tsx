import { motion } from 'framer-motion';
import { useGetLocationListQuery } from '@/features/locations/api';
import { useNavigatePath } from '@/hooks/useNavigatePath';
import { useSearchByQuery } from '@/hooks/useSearchByQuery';
import { Separator } from '@/components/ui/separator';
import { usePagination } from '@/hooks/usePagination';
import { Text } from '@/components/wrappers/typography/Text';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Section } from '@/components/wrappers/sections/section/Section';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { PreviewCard } from '@/components/wrappers/cards/PreviewCard/PreviewCard';
import { Pagination } from '@/components/wrappers/navigation/pagination/Pagination';

export const LocationsPage = () => {
  const { navigatePath } = useNavigatePath();
  const { control, debouncedName } = useSearchByQuery();
  const { currentPage, limit, onPageChange } = usePagination({ defaultLimit: 20 });
  const { data, isLoading, isError } = useGetLocationListQuery({
    query: debouncedName,
    page: currentPage,
    limit,
  });

  return (
    <Section paddingY="medium" className="flex flex-col overflow-x-hidden gap-6" screen fixedWidth>
      <Text className="mx-auto" size="3xl">
        Локации
      </Text>

      <Input name="name" placeholder="Введите название локации" control={control} />
      <Separator edgeEffect="block" className="mb-6" edgeColor="brand-200" spacing="empty" />

      <AsyncWrapper isError={isError} isLoading={isLoading}>
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
          {data?.data?.map((data, index) => (
            <motion.div
              className="flex-1 max-w-[600px]"
              key={data?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}>
              <PreviewCard
                name={data?.name}
                src={data?.src}
                onClick={() => navigatePath(`/universe/locations/${data?.id}`, data)}
              />
            </motion.div>
          ))}
        </div>
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
    </Section>
  );
};
