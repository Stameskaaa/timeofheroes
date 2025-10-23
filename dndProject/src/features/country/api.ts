import { createApi } from '@reduxjs/toolkit/query/react';
import type { GetList, ListQuery } from '../types';
import { Country } from './types';
import { baseQuery } from '../auth/api';

export const countryApi = createApi({
  reducerPath: 'countryApi',
  baseQuery,
  tagTypes: ['countryList'],
  keepUnusedDataFor: Infinity,
  endpoints: (builder) => ({
    getCountries: builder.query<GetList<Country>, ListQuery | void>({
      query: (data) => ({
        url: '/countries/search',
        method: 'POST',
        body: data,
      }),
      providesTags: ['countryList'],
    }),
    createCountry: builder.mutation<Country, Country>({
      query: (data) => ({
        url: '/countries',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['countryList'],
    }),
    deleteCountrys: builder.mutation<Country, Pick<Country, 'id'>>({
      query: (data) => ({
        url: `/countries/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['countryList'],
    }),
    updateCountrys: builder.mutation<Country, Partial<Country>>({
      query: (data) => ({
        url: `/countries/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['countryList'],
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useCreateCountryMutation,
  useDeleteCountrysMutation,
  useUpdateCountrysMutation,
} = countryApi;
