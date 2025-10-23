import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Class } from './types';

export const classSlice = createSlice({
  name: 'class',
  initialState: {
    classData: null,
  } as { classData: Class[] | null },
  reducers: {
    setClasses: (state, action: PayloadAction<Class[]>) => {
      state.classData = action.payload;
    },
  },
});

export const { setClasses } = classSlice.actions;
export default classSlice.reducer;
