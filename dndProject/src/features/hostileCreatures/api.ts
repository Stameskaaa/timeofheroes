import { createApi } from '@reduxjs/toolkit/query/react';
import type { GetList, ListQuery } from '../types';
import { HostileCreatures } from './types';
import { baseQuery } from '../auth/api';

export const hostileCreaturesApi = createApi({
  reducerPath: 'hostileCreaturesApi',
  baseQuery,
  tagTypes: ['hostileCreaturesList'],
  keepUnusedDataFor: Infinity,
  endpoints: (builder) => ({
    getHostileCreaturesList: builder.query<
      GetList<HostileCreatures>,
      (ListQuery & { type?: HostileCreatures['type'] }) | void
    >({
      query: (data) => ({
        url: '/hostile-creatures/search',
        method: 'POST',
        body: data,
      }),
      providesTags: ['hostileCreaturesList'],
    }),
    getHostileCreatureById: builder.query<HostileCreatures, { id: number }>({
      query: ({ id }) => ({
        url: `/hostile-creatures/${id}`,
      }),
    }),
    createHostileCreatures: builder.mutation<HostileCreatures, HostileCreatures>({
      query: (data) => ({
        url: '/hostile-creatures',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['hostileCreaturesList'],
    }),
    deleteHostileCreatures: builder.mutation<HostileCreatures, Pick<HostileCreatures, 'id'>>({
      query: (data) => ({
        url: `/hostile-creatures/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['hostileCreaturesList'],
    }),
    updateHostileCreatures: builder.mutation<HostileCreatures, Partial<HostileCreatures>>({
      query: (data) => ({
        url: `/hostile-creatures/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['hostileCreaturesList'],
    }),
  }),
});

export const {
  useGetHostileCreaturesListQuery,
  useGetHostileCreatureByIdQuery,
  useCreateHostileCreaturesMutation,
  useDeleteHostileCreaturesMutation,
  useUpdateHostileCreaturesMutation,
} = hostileCreaturesApi;
