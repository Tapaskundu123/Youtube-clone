import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    checkSidebar: false,
    CheckCatogeries: 0,
  },
  reducers: {
      Sidebar: state => {
      state.checkSidebar = !state.checkSidebar;
    },
      CheckCatogeries: (state,action)=>{
          state.CheckCatogeries= action.payload;
      }
  },
});

export const { Sidebar,CheckCatogeries } = counterSlice.actions;
export default counterSlice.reducer;
