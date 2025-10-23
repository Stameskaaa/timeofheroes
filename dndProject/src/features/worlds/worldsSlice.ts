import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { World } from './types';

export const worldsSlice = createSlice({
  name: 'worlds',
  initialState: {
    worlds: null,
  } as { worlds: World[] | null },
  reducers: {
    setWorlds: (state, action: PayloadAction<World[]>) => {
      state.worlds = action.payload;
    },
  },
});

export const { setWorlds } = worldsSlice.actions;
export default worldsSlice.reducer;
