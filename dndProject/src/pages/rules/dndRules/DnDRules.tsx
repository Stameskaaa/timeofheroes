import React from 'react';
import { useForm } from 'react-hook-form';
import type { Rule } from '@/features/rules/types';
import { dndRuleTags } from '@/features/rules/constant';
import { useGetRulesListQuery } from '@/features/rules/api';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import { HeaderHeight } from '@/constants/heights';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/wrappers/badge/Badge';
import { Text } from '@/components/wrappers/typography/Text';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Selector } from '@/components/wrappers/forms/selector/Selector';
import { Section } from '@/components/wrappers/sections/section/Section';
import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { Pagination } from '@/components/wrappers/navigation/pagination/Pagination';

export const DnDRules = () => {
  const { control, watch } = useForm<{ name: string; tags: string[] }>();
  const name = watch('name');
  const tags = watch('tags');
  const debouncedName = useDebounce(name);
  const { currentPage, limit, onPageChange } = usePagination({ defaultLimit: 30 });

  const { data, isLoading, isError } = useGetRulesListQuery({
    type: 'dnd',
    query: debouncedName,
    page: currentPage,
    limit,
    tags: tags || [],
  });

  const TypeBlock = ({ tags, id }: { tags?: Rule['tags']; id: number }) => {
    if (!Array.isArray(tags) || tags.length === 0) return null;

    return (
      <div key={id} className="flex flex-row pt-2 flex-wrap gap-2">
        {tags.map((data) => {
          const value = dndRuleTags.find(({ id }) => id === data)?.value || '';
          return (
            <Badge size="md" key={value}>
              {value}
            </Badge>
          );
        })}
      </div>
    );
  };

  return (
    <Section paddingY="medium" fixedWidth screen className="flex flex-col">
      <Text as="span" className="mx-auto mb-4" size="3xl">
        Правила D&D
      </Text>
      <div className="flex flex-col bg-brand-500 gap-4 w-full max-w-[800px] mx-auto">
        <div
          style={{ top: HeaderHeight }}
          className="flex gap-2 sticky z-1 bg-brand-500 py-6 -mx-0.5 px-0.5 flex-wrap">
          <Input
            className="flex-2 min-w-[260px]"
            control={control}
            name="name"
            placeholder="Введите название"
          />
          <Selector
            multiple
            className="flex-1"
            placeholder="Введите тег"
            label="Список тегов"
            name="tags"
            control={control}
            options={dndRuleTags}
          />
        </div>

        <AsyncWrapper isError={isError} isLoading={isLoading}>
          {data?.data?.map(({ id, name, mdContent, tags }, i) => (
            <React.Fragment key={id}>
              <div key={id} className="flex flex-col gap-2">
                <Text color="brand-100" size="xl">
                  {name}
                </Text>
                <MarkDownText>{mdContent}</MarkDownText>
                <TypeBlock id={i} tags={tags} />
              </div>{' '}
              {!!(i !== data?.data.length - 1) && (
                <Separator className="bg-brand-300" spacing="empty" />
              )}
            </React.Fragment>
          ))}
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
      </div>
    </Section>
  );
};
