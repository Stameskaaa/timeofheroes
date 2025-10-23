import { useForm } from 'react-hook-form';
import { Auth } from '@/features/auth/types';
import { useLoginMutation } from '@/features/auth/api';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Section } from '@/components/wrappers/sections/section/Section';
import { DragonIcon } from '@/assets/icons/main/DragonIcon';
import { SmartLink } from '@/components/wrappers/navigation/link/SmartLink';

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { control, handleSubmit, getValues } = useForm<Omit<Auth, 'name'>>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function authorize() {
    const data = getValues();
    login(data);
  }

  return (
    <Section screen fixedWidth className="grid place-items-center">
      <div className="w-full p-8 bg-brand-500 border-brand-200 border-1 rounded-sm flex flex-col gap-4 max-w-[500px]">
        <DragonIcon className="w-[60px] h-[60px]" />
        <Text className="text-center" size="xl">
          Авторизация
        </Text>
        <Separator spacing="equalSmall" />
        <Input
          control={control}
          message="Почта"
          placeholder="example@mail.ru"
          required
          name="email"
          type="text"
        />
        <Input
          control={control}
          message="Пароль"
          placeholder="********"
          required
          name="password"
          type="password"
        />
        <Separator spacing="equalSmall" />
        <Button isLoading={isLoading} variant="success" onClick={handleSubmit(authorize)}>
          Войти
        </Button>
        <SmartLink to="/registration">
          <Button className="w-full">Создать аккаунт</Button>
        </SmartLink>
      </div>
    </Section>
  );
};

export default LoginPage;
