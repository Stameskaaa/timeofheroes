import { createApi } from '@reduxjs/toolkit/query/react';
import type { Trait } from './types';
import type { GetList, ListQuery } from '../types';
import { baseQuery } from '../auth/api';

export const traitsApi = createApi({
  reducerPath: 'traitApi',
  baseQuery,
  tagTypes: ['traitList'],
  keepUnusedDataFor: Infinity,
  endpoints: (builder) => ({
    getTraitList: builder.query<GetList<Trait>, (ListQuery & { ids?: number[] }) | void>({
      query: (data) => ({
        url: '/features/search',
        method: 'POST',
        body: data,
      }),
      providesTags: ['traitList'],
    }),
    getTraitById: builder.query<Trait, { id: number }>({
      query: ({ id }) => ({
        url: `/features/${id}`,
      }),
    }),
    createTrait: builder.mutation<Trait, Trait>({
      query: (data) => ({
        url: '/features',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['traitList'],
    }),
    deleteTrait: builder.mutation<Trait, Pick<Trait, 'id'>>({
      query: (data) => ({
        url: `/features/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['traitList'],
    }),
    updateTrait: builder.mutation<Trait, Partial<Trait>>({
      query: (data) => ({
        url: `/features/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['traitList'],
    }),
  }),
});

export const {
  useGetTraitListQuery,
  useGetTraitByIdQuery,
  useCreateTraitMutation,
  useDeleteTraitMutation,
  useUpdateTraitMutation,
} = traitsApi;
