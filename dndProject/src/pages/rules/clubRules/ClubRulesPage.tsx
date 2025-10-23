import { useGetRulesListQuery } from '@/features/rules/api';
import { RulesSection } from '../ui/RuleSection';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';

export const ClubRulesPage = () => {
  const { data, isLoading, isError } = useGetRulesListQuery({ type: 'club', limit: 200 });

  return (
    <AsyncWrapper isError={isError} isLoading={isLoading}>
      <RulesSection type="club" data={data?.data} />
    </AsyncWrapper>
  );
};
