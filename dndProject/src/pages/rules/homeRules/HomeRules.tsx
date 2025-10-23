import { RulesSection } from '../ui/RuleSection';
import { useGetRulesListQuery } from '@/features/rules/api';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';

export const HomeRulesPage = () => {
  const { data, isLoading, isError } = useGetRulesListQuery({ type: 'home', limit: 200 });

  return (
    <AsyncWrapper isError={isError} isLoading={isLoading}>
      <RulesSection type="home" data={data?.data} />
    </AsyncWrapper>
  );
};
