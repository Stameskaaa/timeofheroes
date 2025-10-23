import { createApi } from '@reduxjs/toolkit/query/react';
import type { Rule } from './types';
import type { GetList, ListQuery } from '../types';
import { baseQuery } from '../auth/api';

export const rulesApi = createApi({
  reducerPath: 'rulesApi',
  baseQuery,
  tagTypes: ['ruleList'],
  keepUnusedDataFor: Infinity,
  endpoints: (builder) => ({
    getRulesList: builder.query<
      GetList<Rule>,
      ListQuery<Pick<Rule, 'type'> & { tags?: string[] }> | void
    >({
      query: (data) => ({
        url: '/rules/search',
        method: 'POST',
        body: data,
      }),
      providesTags: ['ruleList'],
    }),
    createRule: builder.mutation<Rule, Rule>({
      query: (data) => ({
        url: '/rules',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ruleList'],
    }),
    deleteRule: builder.mutation<Rule, Pick<Rule, 'id'>>({
      query: (data) => ({
        url: `/rules/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ruleList'],
    }),
    updateRule: builder.mutation<Rule, Partial<Rule>>({
      query: (data) => ({
        url: `/rules/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['ruleList'],
    }),
  }),
});

export const {
  useGetRulesListQuery,
  useCreateRuleMutation,
  useDeleteRuleMutation,
  useUpdateRuleMutation,
} = rulesApi;
