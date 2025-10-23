import { createApi } from '@reduxjs/toolkit/query/react';
import type { GetList, ListQuery } from '../types';
import { Location } from './types';
import { baseQuery } from '../auth/api';

export const locationApi = createApi({
  reducerPath: 'locationApi',
  baseQuery,
  tagTypes: ['locationList'],
  keepUnusedDataFor: Infinity,
  endpoints: (builder) => ({
    getLocationList: builder.query<GetList<Location>, (ListQuery & { ids?: number[] }) | void>({
      query: (type) => ({
        url: '/locations/search',
        method: 'POST',
        body: type,
      }),
      providesTags: ['locationList'],
    }),
    getLocationById: builder.query<Location, { id: number }>({
      query: ({ id }) => ({
        url: `/locations/${id}`,
      }),
    }),
    createLocation: builder.mutation<Location, Location>({
      query: (data) => ({
        url: '/locations',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['locationList'],
    }),
    deleteLocation: builder.mutation<Location, Pick<Location, 'id'>>({
      query: (data) => ({
        url: `/locations/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['locationList'],
    }),
    updateLocation: builder.mutation<Location, Partial<Location>>({
      query: (data) => ({
        url: `/locations/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['locationList'],
    }),
  }),
});

export const {
  useGetLocationListQuery,
  useGetLocationByIdQuery,
  useCreateLocationMutation,
  useDeleteLocationMutation,
  useUpdateLocationMutation,
} = locationApi;
