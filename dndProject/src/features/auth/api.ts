import { toast } from 'sonner';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY, setToken } from './authSlice';
import { profileApi } from '../profile/api';
import { Auth, AuthResponse } from './types';
import { clearUrl } from './../../constants/api';
import { RootState } from '@/store/store';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: clearUrl,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState)?.auth?.accessToken ||
      localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export async function baseQuery(args: any, api: any, extraOptions: any) {
  const state = api.getState() as RootState;
  const token = state?.auth?.accessToken || localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  const refreshToken = state?.auth?.refreshToken || localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

  const url = args.fullUrl ?? `${clearUrl}${token ? '/management' : '/api'}${args.url ?? ''}`;

  const requestArgs = {
    ...args,
    url,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  };

  let response = await rawBaseQuery(requestArgs, api, extraOptions);

  if (response?.error?.status === 401 && refreshToken) {
    try {
      const refreshResponse = await rawBaseQuery(
        { url: `${clearUrl}/management/refresh`, body: { refreshToken }, method: 'POST' },
        api,
        extraOptions,
      );

      const refreshData = refreshResponse?.data as AuthResponse;

      const newToken = refreshData?.accessToken;
      if (!newToken) throw new Error('No token in refresh response');

      api.dispatch(setToken({ access: newToken, refresh: refreshData.refreshToken }));
      response = await rawBaseQuery(
        { ...requestArgs, headers: { Authorization: `Bearer ${newToken}` } },
        api,
        extraOptions,
      );
    } catch (err) {
      console.error('Token refresh failed:', err);
      api.dispatch(setToken({ access: '', refresh: '' }));
    }
  }

  return response;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: clearUrl + '/management' }),
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, Auth>({
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success('Регистрация прошла успешно');
        } catch (e: any) {
          if (e?.data?.errors?.email?.[0] === 'The email has already been taken.') {
            toast.error('Такой email уже занят');
          } else {
            toast.error('Ошибка при регистрации');
          }
        }
      },
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<AuthResponse, Omit<Auth, 'name'>>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success('Авторизация прошла успешно');
          dispatch(setToken({ access: data.accessToken, refresh: data.refreshToken }));
          dispatch(profileApi.util.invalidateTags(['users']));
        } catch (err) {
          toast.error('Ошибка при авторизации');
        }
      },
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
