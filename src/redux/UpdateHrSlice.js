import { createSlice } from "@reduxjs/toolkit";

const updateHrSlice = createSlice({
  name: "hrUpdate",
  initialState: {
    value: undefined,
  },
  reducers: {
    hrUpdateReducer: (state, action) => {
      state.value = action.payload;
    },
    categoryUpdateReducer:(state,action)=>{
      state.value = action.payload;
    }
  },
});
export const { hrUpdateReducer,categoryUpdateReducer } = updateHrSlice.actions;
export default updateHrSlice.reducer;