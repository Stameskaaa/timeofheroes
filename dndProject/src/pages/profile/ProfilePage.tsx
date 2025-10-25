import { useState } from 'react';
import { LogOutIcon } from 'lucide-react';
import {
  useChangeUserRoleMutation,
  useDeleteUserMutation,
  useGetProfileQuery,
  useGetUsersQuery,
} from '@/features/profile/api';
import { setToken } from '@/features/auth/authSlice';
import { setProfile } from '@/features/profile/profileSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { usePagination } from '@/hooks/usePagination';
import { Text } from '@/components/wrappers/typography/Text';
import { Spinner } from '@/components/wrappers/loaders/spinner/Spinner';
import { Section } from '@/components/wrappers/sections/section/Section';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { ModalWindow } from '@/components/wrappers/modals/modalWindow/ModalWindow';
import { Pagination } from '@/components/wrappers/navigation/pagination/Pagination';

const ProfilePage = () => {
  const { currentPage, limit, onPageChange } = usePagination({ defaultLimit: 8 });
  const { data: profile, isLoading } = useGetProfileQuery();
  const { data: users, isLoading: usersLoading } = useGetUsersQuery(
    { limit, page: currentPage },
    { skip: !(profile?.role === 'admin') },
  );
  const token = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();
  const [changeRole, { isLoading: chageLoading }] = useChangeUserRoleMutation();
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
  const [deletedEmail, setDeletedEmail] = useState<string>('');

  function logout() {
    dispatch(setToken({ access: '', refresh: '' }));
    dispatch(setProfile(null));
  }

  return (
    <Section className="flex justify-center" fixedWidth screen>
      <AsyncWrapper isLoading={isLoading}>
        <div className="flex flex-wrap gap-4 flex-1 py-4">
          <div className="sticky top-22 bg-brand-400 flex-1 max-w-[400px] rounded-sm p-4 max-h-max flex flex-col gap-2 min-w-[300px]">
            <Text>Имя: {profile?.name}</Text>
            <Text>Роль: {profile?.role}</Text>
            {token && (
              <Button variant="secondary" onClick={logout}>
                Выйти
                <LogOutIcon />
              </Button>
            )}
          </div>

          {profile?.role === 'admin' && (
            <div className="bg-brand-400 flex-1 rounded-sm h-max p-4 min-w-[300px]">
              {usersLoading ? (
                <Spinner className="m-auto" />
              ) : (
                <div>
                  <Text size="lg">Пользователи </Text>
                  <Text size="sm" color="text-description">
                    Пользователи с правами отображаются первыми в списке
                  </Text>
                  <Separator spacing="equalSmall" />
                  {!users?.data || users?.data?.length === 0 ? (
                    <Text>Пользователей нет</Text>
                  ) : (
                    <div className="space-y-2">
                      {users?.data?.map(({ id, name, role, email }) => (
                        <div key={id} className="p-2 rounded-sm bg-brand-300 flex flex-col gap-1">
                          <Text>
                            Имя -{` `}
                            <Text as="span" weight="bold">
                              {name ?? 'Без имени'} {email === profile?.email ? '(Вы)' : ''}
                            </Text>
                          </Text>
                          {role && (
                            <Text size="sm">
                              Роль -{` `}
                              <Text
                                as="span"
                                size="sm"
                                className={
                                  role === 'admin'
                                    ? 'text-rose-500 drop-shadow-md'
                                    : role === 'editor'
                                    ? 'text-blue-600 drop-shadow-sm'
                                    : 'text-secondary'
                                }>
                                {role}
                              </Text>
                            </Text>
                          )}
                          {email && (
                            <Text size="sm" color="text-secondary">
                              почта - {email}
                            </Text>
                          )}
                          {role !== 'admin' && (
                            <div className="flex gap-4">
                              <Button
                                isLoading={chageLoading}
                                onClick={() => {
                                  changeRole({ email, role: role === 'user' ? 'editor' : 'user' });
                                }}>
                                {role === 'user'
                                  ? 'Повысить до редактора'
                                  : 'Понизить до пользователя'}
                              </Button>
                              <Button
                                isLoading={deleteLoading}
                                onClick={() => {
                                  setDeletedEmail(email);
                                }}>
                                Удалить аккаунт
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <ModalWindow
                    contentClassname="h-max"
                    open={!!deletedEmail}
                    setOpen={() => setDeletedEmail('')}>
                    <Text className="mb-4">Точно хотите удалить аккаунт?</Text>
                    <div className="flex gap-2">
                      {' '}
                      <Button
                        variant="destructive"
                        isLoading={deleteLoading}
                        onClick={() => {
                          deleteUser({ email: deletedEmail! });
                          setDeletedEmail('');
                        }}>
                        Удалить
                      </Button>
                      <Button variant="secondary" onClick={() => setDeletedEmail('')}>
                        Отменить
                      </Button>
                    </div>
                  </ModalWindow>

                  {!!users?.meta?.total && (
                    <Pagination
                      className="mt-10"
                      onPageChange={onPageChange}
                      total={users?.meta?.total}
                      currentPage={currentPage}
                      limit={limit}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </AsyncWrapper>
    </Section>
  );
};

export default ProfilePage;
