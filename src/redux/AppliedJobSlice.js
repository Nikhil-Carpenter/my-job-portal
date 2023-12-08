import { createSlice } from "@reduxjs/toolkit";

const AppliedJobSlice = createSlice({
  name: "AppliedJOb",
  initialState: {
    value: [],
  },
  reducers: {
    AppliedListReducer: (state, action) => {
      state.value = action.payload;
    },
    jobDetail: (state, action) => {
      state.value = action.payload;
    },
    jobAppliedByCandidate: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { AppliedListReducer,jobDetail,jobAppliedByCandidate } = AppliedJobSlice.actions;
export default AppliedJobSlice.reducer;