import { Text } from '@/components/wrappers/typography/Text';

export const Equipment = ({ first, second }: { first?: string; second?: string }) => {
  return (
    <ul className="list-none text-xl text-brand-100 space-y-2">
      {first && (
        <li className="flex gap-2">
          <Text as="span" size="md" weight="bold" className="mt-[-1px]  text-nowrap text-brand-100">
            А)
          </Text>
          <Text color="text-secondary" as="span">
            {first}
          </Text>
        </li>
      )}
      {second && (
        <li className="flex gap-2">
          <Text weight="bold" as="span" size="md" className="mt-[-1px] text-nowrap text-brand-100">
            Б)
          </Text>
          <Text color="text-secondary" as="span">
            {second}
          </Text>
        </li>
      )}
    </ul>
  );
};
