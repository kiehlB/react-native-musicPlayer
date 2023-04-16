import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

export interface IsLoadingState {
  isLoading: string;
}
const initialState: IsLoadingState = {
  isLoading: 'idle',
};

const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setLoadingState(state, { payload }: PayloadAction<string>) {
      state.isLoading = payload;
    },
  },
});

export const { setLoadingState } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
