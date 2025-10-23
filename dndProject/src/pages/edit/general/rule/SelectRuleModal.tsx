import { CubeLoader } from '@/components/wrappers/loaders/cubeLoader/CubeLoader';
import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { Text } from '@/components/wrappers/typography/Text';
import { useGetRulesListQuery } from '@/features/rules/api';

export const SelectRuleModal = () => {
  const { data, isLoading } = useGetRulesListQuery();

  if (isLoading) {
    return <CubeLoader />;
  }

  return (
    <div className="flex flex-col gap-4">
      {Array.isArray(data) &&
        data.length > 0 &&
        data?.map(({ title, short_description, md_content, type }) => {
          const typeTitle =
            type === 'club' ? 'Правила клуба' : type === 'dnd' ? 'Правило днд' : 'Домашнее правило';
          return (
            <div className="flex flex-col border-b-2 border-accent-100">
              <Text>
                {title} ({typeTitle})
              </Text>
              <Text>{short_description}</Text>
              <MarkDownText>{md_content}</MarkDownText>
            </div>
          );
        })}
    </div>
  );
};
