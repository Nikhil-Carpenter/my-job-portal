import { createSlice } from "@reduxjs/toolkit";

const categoryListSlice = createSlice({
  name: "categoryList",
  initialState: {
    value: [],
  },
  reducers: {
    categoryListReducer: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { categoryListReducer } = categoryListSlice.actions;
export default categoryListSlice.reducer;