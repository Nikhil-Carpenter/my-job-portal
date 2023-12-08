import { createSlice } from "@reduxjs/toolkit";

const HrSlice = createSlice({
  name: "hrList",
  initialState: {
    value: [],
  },
  reducers: {
    hrReducer: (state, action) => {
      state.value = action.payload;
    },
    hrDeleteReducer:(state,action)=>{
      state.value = action.payload;
    }
  },
});
export const { hrReducer, hrDeleteReducer} = HrSlice.actions;
export default HrSlice.reducer;