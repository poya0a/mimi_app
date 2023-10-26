import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Loading = {
  loading: boolean;
};

const initialState: Loading = {
  loading: false
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    actIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    }
  }
});

export const { actIsLoading } = loadingSlice.actions;
export default loadingSlice;
