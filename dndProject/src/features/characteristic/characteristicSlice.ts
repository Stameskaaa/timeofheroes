import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Characteristic } from './types';

export const characteristicSlice = createSlice({
  name: 'characteristic',
  initialState: {
    characteristics: [] as Characteristic[],
  },
  reducers: {
    setCharacteristics: (state, action: PayloadAction<{ data: Characteristic[] }>) => {
      state.characteristics = action.payload.data;
    },
  },
});

export const { setCharacteristics } = characteristicSlice.actions;
export default characteristicSlice.reducer;
