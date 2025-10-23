import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { ShadowText } from '../typography/ShadowText';
import { Section } from '../sections/section/Section';

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Section paddingY="medium" screen className="flex items-center justify-center">
        <ShadowText text={`Ошибка ${error.status}`} />
        <p>{error.statusText}</p>
      </Section>
    );
  }

  return (
    <Section paddingY="medium" screen className="flex items-center justify-center">
      <ShadowText text={`Что-то пошло не так`} />
    </Section>
  );
}
