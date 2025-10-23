import { Button } from '@/components/ui/button';
import { SmartLink } from '@/components/wrappers/navigation/link/SmartLink';
import { Section } from '@/components/wrappers/sections/section/Section';
import { ShadowText } from '@/components/wrappers/typography/ShadowText';
import { useNavigatePath } from '@/hooks/useNavigatePath';

export const NotFound = () => {
  const { navigatePath } = useNavigatePath();

  return (
    <Section
      key="not-found"
      className="flex items-center justify-center"
      paddingY="medium"
      fixedWidth
      screen>
      <div className="flex flex-col gap-8 max-w-[300px] text-center">
        <ShadowText text="Страница не найдена" />
        <SmartLink to="/">
          <Button variant="success">На главную</Button>
        </SmartLink>
      </div>
    </Section>
  );
};
