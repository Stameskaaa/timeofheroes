import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FavoriteTypes = 'class' | 'origin' | 'race' | 'traits' | 'spells';

export interface FavoritesState {
  class: number | null;
  origin: number | null;
  race: number | null;
  traits: number[];
  spells: number[];
}

const MAX = { traits: 10, spells: 20 };
const KEY = 'favorites';

const initialState: FavoritesState = (() => {
  try {
    return (
      JSON.parse(localStorage.getItem(KEY) || 'null') ?? {
        class: null,
        origin: null,
        race: null,
        traits: [],
        spells: [],
      }
    );
  } catch {
    return { class: null, origin: null, race: null, traits: [], spells: [] };
  }
})();

const save = (state: FavoritesState) => localStorage.setItem(KEY, JSON.stringify(state));

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggle(state, { payload }: PayloadAction<{ type: FavoriteTypes; id: number }>) {
      const { type, id } = payload;
      if (['class', 'origin', 'race'].includes(type)) {
        state[type as 'class' | 'origin' | 'race'] =
          state[type as 'class' | 'origin' | 'race'] === id ? null : id;
      } else {
        const arr = state[type as 'traits' | 'spells'];
        const idx = arr.indexOf(id);
        if (idx !== -1) arr.splice(idx, 1);
        else {
          if (arr.length >= MAX[type as 'traits' | 'spells']) arr.shift();
          arr.push(id);
        }
      }
      localStorage.setItem(KEY, JSON.stringify(state));
    },
    clearSingle(state, { payload: { type } }: PayloadAction<{ type: FavoriteTypes }>) {
      if (type === 'traits' || type === 'spells') state[type] = [];
      else state[type] = null;
      save(state);
    },
  },
});

export const { toggle, clearSingle } = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const useFavorites = () => useAppSelector((state) => state.favorites);
export const useFavoritesActions = () => useAppDispatch();
