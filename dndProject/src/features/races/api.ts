import { createApi } from '@reduxjs/toolkit/query/react';
import type { GetList, ListQuery } from '../types';
import type { Race } from './types';
import { baseQuery } from '../auth/api';

export const racesApi = createApi({
  reducerPath: 'racesApi',
  baseQuery,
  tagTypes: ['racesList'],
  keepUnusedDataFor: Infinity,
  endpoints: (builder) => ({
    getRaceList: builder.query<GetList<Race>, ListQuery | void>({
      query: (data) => ({
        url: '/races/search',
        method: 'POST',
        body: data,
      }),
      providesTags: ['racesList'],
    }),
    getRaceById: builder.query<Race, { id: number }>({
      query: ({ id }) => ({
        url: `/races/${id}`,
      }),
    }),
    createRace: builder.mutation<Race, Race>({
      query: (data) => ({
        url: '/races',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['racesList'],
    }),
    deleteRace: builder.mutation<Race, Pick<Race, 'id'>>({
      query: (data) => ({
        url: `/races/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['racesList'],
    }),
    updateRace: builder.mutation<Race, Partial<Race>>({
      query: (data) => ({
        url: `/races/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['racesList'],
    }),
  }),
});

export const {
  useGetRaceListQuery,
  useGetRaceByIdQuery,
  useCreateRaceMutation,
  useUpdateRaceMutation,
  useDeleteRaceMutation,
} = racesApi;
