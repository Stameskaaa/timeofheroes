import { createApi } from '@reduxjs/toolkit/query/react';
import type { GetList, ListQuery } from '../types';
import type { Class } from './types';
import { baseQuery } from '../auth/api';
import { setClasses } from './classesSlice';

export const classesApi = createApi({
  reducerPath: 'classesApi',
  baseQuery,
  tagTypes: ['classesList'],
  keepUnusedDataFor: Infinity,
  endpoints: (builder) => ({
    getClassList: builder.query<GetList<Class>, ListQuery | void>({
      query: (data) => ({
        url: '/character/classes/search',
        method: 'POST',
        body: data,
      }),
      providesTags: ['classesList'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (arg === undefined) {
            dispatch(setClasses(data.data ?? []));
          }
        } catch (err) {
          if (arg === undefined) {
            dispatch(setClasses([]));
          }
        }
      },
    }),
    getClassById: builder.query<Class, { id: number }>({
      query: ({ id }) => ({
        url: `/character/classes/${id}`,
      }),
    }),
    createClass: builder.mutation<Class, Class>({
      query: (data) => ({
        url: '/character/classes',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['classesList'],
    }),
    deleteClass: builder.mutation<Class, Pick<Class, 'id'>>({
      query: (data) => ({
        url: `/character/classes/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['classesList'],
    }),
    updateClass: builder.mutation<Class, Partial<Class>>({
      query: (data) => ({
        url: `/character/classes/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['classesList'],
    }),
  }),
});

export const {
  useGetClassListQuery,
  useLazyGetClassListQuery,
  useGetClassByIdQuery,
  useCreateClassMutation,
  useDeleteClassMutation,
  useUpdateClassMutation,
} = classesApi;
