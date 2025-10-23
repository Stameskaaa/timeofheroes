import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PageTransitionState {
  sectionLoading: boolean;
}

const initialState: PageTransitionState = {
  sectionLoading: false,
};

export const pageTransitionSlice = createSlice({
  name: 'pageTransition',
  initialState,
  reducers: {
    setPageTransitionDuration: (state, action: PayloadAction<boolean>) => {
      state.sectionLoading = action.payload;
    },
  },
});

export const { setPageTransitionDuration } = pageTransitionSlice.actions;
export default pageTransitionSlice.reducer;
