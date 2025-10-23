import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Auth, AuthResponse } from '@/features/auth/types';
import { setToken } from '@/features/auth/authSlice';
import { useRegisterMutation } from '@/features/auth/api';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DragonIcon } from '@/assets/icons/main/DragonIcon';
import { Text } from '@/components/wrappers/typography/Text';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Section } from '@/components/wrappers/sections/section/Section';
import { SmartLink } from '@/components/wrappers/navigation/link/SmartLink';

const RegistrationPage = () => {
  const dispatch = useAppDispatch();
  const [registration, { isLoading }] = useRegisterMutation();
  const { control, setError, handleSubmit, getValues } = useForm<Auth>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function register() {
    const data = getValues();
    if (data.password.length < 6) {
      setError('password', { message: 'Длина пароля должна быть не менее 6 символов' });
    }

    registration(data)
      .unwrap()
      .then((data) => {
        const responseData = data as AuthResponse;
        toast.success('Регистрация прошла успешно');
        dispatch(
          setToken({ access: responseData.accessToken, refresh: responseData.refreshToken }),
        );
      })
      .catch((e) => {
        if (e?.data?.errors?.email?.[0] === 'The email has already been taken.') {
          toast.error('Такой email уже занят');
        } else {
          toast.error('Ошибка при регистрации');
        }
      });
  }

  return (
    <Section screen fixedWidth className="grid place-items-center">
      <div className="w-full p-8 bg-brand-500 border-brand-200 border-1 rounded-sm flex flex-col gap-4 max-w-[500px]">
        <DragonIcon className="w-[60px] h-[60px]" />
        <Text className="text-center" size="xl">
          Регистрация
        </Text>
        <Separator spacing="equalSmall" />
        <Input
          control={control}
          message="Имя"
          placeholder="Олег"
          required
          name="name"
          type="text"
        />
        <Input
          control={control}
          message="Почта"
          placeholder="oleg@mail.ru"
          required
          name="email"
          type="email"
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
        <Button isLoading={isLoading} variant="success" onClick={handleSubmit(register)}>
          Зарегестрироваться
        </Button>
        <SmartLink to="/login">
          <Button className="w-full">Уже есть аккаунт</Button>
        </SmartLink>
      </div>
    </Section>
  );
};

export default RegistrationPage;
