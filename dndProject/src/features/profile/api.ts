import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../auth/api';
import { User } from './types';
import { GetList, ListQuery } from '../types';

export const profileApi = createApi({
  tagTypes: ['users'],
  reducerPath: 'profileApi',
  baseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => ({ url: '/me' }),
    }),
    getUsers: builder.query<GetList<User & { id: number }>, ListQuery | void>({
      providesTags: ['users'],
      query: (body) => ({ url: '/users/search', method: 'POST', body }),
    }),
    changeUserRole: builder.mutation<
      (User & { id: number })[],
      { email: string; role: User['role'] }
    >({
      invalidatesTags: ['users'],
      query: (body) => ({ url: '/role', method: 'POST', body }),
    }),
    deleteUser: builder.mutation<(User & { id: number })[], { email: string }>({
      invalidatesTags: ['users'],
      query: (body) => ({ url: '/users', method: 'DELETE', body }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useChangeUserRoleMutation,
} = profileApi;
