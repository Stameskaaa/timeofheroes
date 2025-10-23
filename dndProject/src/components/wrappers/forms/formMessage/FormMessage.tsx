import { Text } from '../../typography/Text';
import type { TypographyProps } from '../../typography/constants';

interface FormMessageProps extends TypographyProps {
  type?: 'error' | 'default';
}

export const FormMessage: React.FC<FormMessageProps> = ({
  type = 'default',
  children,
  ...props
}) => {
  return (
    <Text color={type === 'default' ? 'text-secondary' : 'text-destructive'} {...props}>
      {children}
    </Text>
  );
};
