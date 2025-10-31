import { motion } from 'framer-motion';
import { useGetNewsListQuery } from '@/features/news/api';
import { useSearchByQuery } from '@/hooks/useSearchByQuery';
import { NewsCard } from './ui/NewsCard';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Section } from '@/components/wrappers/sections/section/Section';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { Pagination } from '@/components/wrappers/navigation/pagination/Pagination';
import { usePagination } from '@/hooks/usePagination';

export const NewsPage = () => {
  const { control, debouncedName } = useSearchByQuery();
  const { currentPage, limit, onPageChange } = usePagination({ defaultLimit: 12 });
  const { data, isLoading, isError } = useGetNewsListQuery({
    query: debouncedName,
    limit,
    page: currentPage,
  });

  return (
    <AsyncWrapper isError={isError} isLoading={isLoading}>
      <Section paddingY="medium" fixedWidth screen className="flex flex-col  gap-6">
        <Text as="span" className="mx-auto" size="3xl">
          Новости
        </Text>
        <Input name="name" placeholder="Введите название новости" control={control} />
        <Separator edgeEffect="block" className="mb-6" edgeColor="brand-200" spacing="empty" />

        <div className="flex flex-wrap gap-6">
          {data?.data?.map((news, index) => (
            <motion.div
              className="grow basis-[300px] max-w-[600px]"
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}>
              <NewsCard {...news} />
            </motion.div>
          ))}
        </div>

        {!!data?.meta?.total && (
          <Pagination
            className="mt-auto"
            onPageChange={onPageChange}
            total={data.meta.total}
            currentPage={currentPage}
            limit={limit}
          />
        )}
      </Section>
    </AsyncWrapper>
  );
};
