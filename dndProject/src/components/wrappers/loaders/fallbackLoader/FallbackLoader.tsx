import { Section } from '../../sections/section/Section';
import { Spinner } from '../spinner/Spinner';

export const FallbackLoader = () => {
  return (
    <Section screen className="w-full flex items-center justify-center h-full bg-brand-500">
      <Spinner className="!text-brand-100" />
    </Section>
  );
};
