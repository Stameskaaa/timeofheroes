import { createApi } from '@reduxjs/toolkit/query/react';
import type { Characteristic } from './types';
import type { GetList, ListQuery } from '../types';
import { baseQuery } from '../auth/api';
import { setCharacteristics } from './characteristicSlice';

export const characteristicApi = createApi({
  reducerPath: 'characteristicApi',
  baseQuery,
  tagTypes: ['characteristicList'],
  keepUnusedDataFor: Infinity,
  endpoints: (builder) => ({
    getCharacteristicList: builder.query<GetList<Characteristic>, ListQuery | void>({
      query: (data) => ({
        url: '/characteristics/search',
        method: 'POST',
        body: data,
      }),
      providesTags: ['characteristicList'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCharacteristics({ data: data?.data ?? [] }));
        } catch (err) {
          console.error('Failed to set characteristics:', err);
        }
      },
    }),
    createCharacteristic: builder.mutation<Characteristic, Characteristic>({
      query: (data) => ({
        url: '/characteristics',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['characteristicList'],
    }),
    deleteCharacteristic: builder.mutation<Characteristic, Pick<Characteristic, 'id'>>({
      query: (data) => ({
        url: `/characteristics/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['characteristicList'],
    }),
    updateCharacteristic: builder.mutation<Characteristic, Partial<Characteristic>>({
      query: (data) => ({
        url: `/characteristics/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['characteristicList'],
    }),
  }),
});

export const {
  useGetCharacteristicListQuery,
  useCreateCharacteristicMutation,
  useDeleteCharacteristicMutation,
  useUpdateCharacteristicMutation,
} = characteristicApi;
