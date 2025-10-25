import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from './types';
import { baseQuery } from '../auth/api';
import { GetList, ListQuery } from '../types';
import { setProfile } from './profileSlice';

export const profileApi = createApi({
  tagTypes: ['users', 'user'],
  reducerPath: 'profileApi',
  baseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProfile(data));
        } catch (e: any) {}
      },
      providesTags: ['user'],
      query: () => ({ url: '/me', haveRights: true }),
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
  useLazyGetProfileQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useChangeUserRoleMutation,
} = profileApi;
