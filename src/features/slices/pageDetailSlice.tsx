import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PageDetailState {
    shownPageName: string
  }
  
  const initialState: PageDetailState = {
    shownPageName: "",
  }

export const pageDetailSlice = createSlice({
  name: 'pageDetail',
  initialState,
  reducers: {
    setShownPageName: (state, action: PayloadAction<string>) => {
      state.shownPageName = action.payload;
    },
  },
});

export const { setShownPageName } = pageDetailSlice.actions;

export default pageDetailSlice.reducer

