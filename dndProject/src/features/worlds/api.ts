import { createApi } from '@reduxjs/toolkit/query/react';
import type { World } from './types';
import type { GetList, ListQuery } from '../types';
import { baseQuery } from '../auth/api';
import { setWorlds } from './worldsSlice';

export const worldApi = createApi({
  reducerPath: 'worldApi',
  baseQuery,
  tagTypes: ['worldList'],
  keepUnusedDataFor: Infinity,
  endpoints: (builder) => ({
    getWorldList: builder.query<GetList<World>, ListQuery<World> | void>({
      query: (data) => ({
        url: '/worlds/search',
        method: 'POST',
        body: data,
      }),
      providesTags: ['worldList'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setWorlds(data.data ?? []));
        } catch (err) {
          dispatch(setWorlds([]));
        }
      },
    }),
    getSimpleWorldList: builder.query<GetList<World>, ListQuery<World> | void>({
      query: (data) => ({
        url: '/simple-worlds/search',
        method: 'POST',
        body: data,
      }),
    }),
    getWorldById: builder.query<World, { id: number }>({
      query: ({ id }) => ({
        url: `/worlds/${id}`,
      }),
    }),
    createWorld: builder.mutation<World, World>({
      query: (data) => ({
        url: '/worlds',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['worldList'],
    }),
    deleteWorld: builder.mutation<World, Pick<World, 'id'>>({
      query: (data) => ({
        url: `/worlds/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['worldList'],
    }),
    updateWorld: builder.mutation<World, Partial<World>>({
      query: (data) => ({
        url: `/worlds/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['worldList'],
    }),
  }),
});

export const {
  useGetWorldListQuery,
  useLazyGetWorldListQuery,
  useGetSimpleWorldListQuery,
  useCreateWorldMutation,
  useDeleteWorldMutation,
  useUpdateWorldMutation,
  useGetWorldByIdQuery,
} = worldApi;
