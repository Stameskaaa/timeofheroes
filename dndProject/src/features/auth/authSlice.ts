import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
export const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) || '',
    refreshToken: localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY) || '',
  },
  reducers: {
    setToken: (state, action: PayloadAction<{ access: string; refresh: string }>) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, action.payload.access);
      localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, action.payload.refresh);
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
