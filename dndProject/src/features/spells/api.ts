import { createApi } from '@reduxjs/toolkit/query/react';
import type { GetList, ListQuery } from '../types';
import type { Spell } from './types';
import { baseQuery } from '../auth/api';

export const spellsApi = createApi({
  reducerPath: 'spellsApi',
  baseQuery,
  tagTypes: ['spellsList'],
  keepUnusedDataFor: Infinity,
  endpoints: (builder) => ({
    getSpellsList: builder.query<
      GetList<Spell>,
      (ListQuery<Spell> & { ids?: number[]; characterClassId?: number }) | void
    >({
      query: (data) => ({
        url: '/spells/search',
        method: 'POST',
        body: data,
      }),
      providesTags: ['spellsList'],
    }),
    getSpellById: builder.query<Spell, { id: number }>({
      query: ({ id }) => ({
        url: `/spells/${id}`,
      }),
    }),
    createSpell: builder.mutation<Spell, Spell>({
      query: (data) => ({
        url: '/spells',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['spellsList'],
    }),
    deleteSpell: builder.mutation<Spell, Pick<Spell, 'id'>>({
      query: (data) => ({
        url: `/spells/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['spellsList'],
    }),
    updateSpell: builder.mutation<Spell, Partial<Spell>>({
      query: (data) => ({
        url: `/spells/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['spellsList'],
    }),
  }),
});

export const {
  useGetSpellsListQuery,
  useGetSpellByIdQuery,
  useCreateSpellMutation,
  useDeleteSpellMutation,
  useUpdateSpellMutation,
} = spellsApi;
