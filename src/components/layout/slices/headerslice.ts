import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Header {
    title?: string;
    pageName?: string;
}

const initialState: Header = {
    title: "",
    pageName: ""
};


export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeader: (state, { payload }: PayloadAction<Header>) => {
      if (payload.title !== undefined) state.title = payload.title;
      if (payload.pageName !== undefined) state.pageName = payload.pageName;

      if (payload.title === undefined) state.title = initialState.title;
      if (payload.pageName === undefined) state.pageName = initialState.pageName;
    },
  }
});

export const { setHeader } = headerSlice.actions;
export default headerSlice;