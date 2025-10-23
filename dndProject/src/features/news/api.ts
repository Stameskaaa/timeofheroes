import { createApi } from '@reduxjs/toolkit/query/react';
import type { News } from './types';
import type { GetList, ListQuery } from '../types';
import { baseQuery } from '../auth/api';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery,
  tagTypes: ['newsList'],
  keepUnusedDataFor: Infinity,
  endpoints: (builder) => ({
    getNewsList: builder.query<GetList<News>, ListQuery | void>({
      query: (data) => ({
        url: '/news/search',
        method: 'POST',
        body: data,
      }),
      providesTags: ['newsList'],
    }),
    getNewsById: builder.query<News, { id: number }>({
      query: ({ id }) => ({
        url: `/news/${id}`,
      }),
    }),
    createNews: builder.mutation<News, News>({
      query: (data) => ({
        url: '/news',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['newsList'],
    }),
    deleteNews: builder.mutation<News, Pick<News, 'id'>>({
      query: (data) => ({
        url: `/news/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['newsList'],
    }),
    updateNews: builder.mutation<News, Partial<News>>({
      query: (data) => ({
        url: `/news/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['newsList'],
    }),
  }),
});

export const {
  useGetNewsListQuery,
  useGetNewsByIdQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
