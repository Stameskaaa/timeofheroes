import { createApi } from '@reduxjs/toolkit/query/react';
import type { NPC } from './types';
import type { GetList, ListQuery } from '../types';
import { baseQuery } from '../auth/api';

export const npcApi = createApi({
  reducerPath: 'npcApi',
  baseQuery,
  tagTypes: ['npcList'],
  keepUnusedDataFor: Infinity,
  endpoints: (builder) => ({
    getNPCList: builder.query<GetList<NPC>, ListQuery | void>({
      query: (data) => ({
        url: '/npc/search',
        method: 'POST',
        body: data,
      }),
      providesTags: ['npcList'],
    }),
    getNpcById: builder.query<NPC, { id: number }>({
      query: ({ id }) => ({
        url: `/npc/${id}`,
      }),
    }),
    createNPC: builder.mutation<NPC, NPC>({
      query: (data) => ({
        url: '/npc',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['npcList'],
    }),
    deleteNPC: builder.mutation<NPC, Pick<NPC, 'id'>>({
      query: (data) => ({
        url: `/npc/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['npcList'],
    }),
    updateNPC: builder.mutation<NPC, Partial<NPC>>({
      query: (data) => ({
        url: `/npc/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['npcList'],
    }),
  }),
});

export const {
  useGetNPCListQuery,
  useGetNpcByIdQuery,
  useCreateNPCMutation,
  useDeleteNPCMutation,
  useUpdateNPCMutation,
} = npcApi;
