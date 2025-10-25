import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: null as User | null,
  reducers: {
    setProfile: (_, action: PayloadAction<User | null>) => {
      return action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
