import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ScrollLockState {
  blockers: string[];
}

const initialState: ScrollLockState = {
  blockers: [],
};

export const scrollLockSlice = createSlice({
  name: 'scrollLock',
  initialState,
  reducers: {
    addBlocker: (state, action: PayloadAction<string>) => {
      if (!state.blockers.includes(action.payload)) {
        state.blockers.push(action.payload);
      }
    },
    removeBlocker: (state, action: PayloadAction<string>) => {
      state.blockers = state.blockers.filter((id) => id !== action.payload);
    },
  },
});

export const { addBlocker, removeBlocker } = scrollLockSlice.actions;
export default scrollLockSlice.reducer;
