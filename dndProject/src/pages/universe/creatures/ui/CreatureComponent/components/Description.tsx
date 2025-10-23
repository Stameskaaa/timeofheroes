import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { Text } from '@/components/wrappers/typography/Text';

type DescriptionProps = {
  title?: string;
  desc?: string | number;
  variant?: 'block' | 'inline';
};

export function Description({ title, desc, variant = 'inline' }: DescriptionProps) {
  if (!desc) return null;

  if (variant === 'block') {
    return (
      <div>
        {title && (
          <Text className="mb-1" size="2xl" color="brand-100">
            {title}
          </Text>
        )}
        <MarkDownText>{String(desc)}</MarkDownText>
      </div>
    );
  }

  return (
    <p className="flex gap-2 h-[28px] items-center">
      {title && (
        <Text
          style={{ lineHeight: '100%', fontWeight: 500 }}
          color="text-secondary"
          size="lg"
          as="span">
          {title}:
        </Text>
      )}
      <Text style={{ lineHeight: '100%' }} color="text-description" size="sm" as="span">
        {desc}
      </Text>
    </p>
  );
}
