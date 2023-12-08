import { createSlice } from "@reduxjs/toolkit";

const jobListSlice = createSlice({
  name: "categoryList",
  initialState: {
    value: [],
    job_to_update:undefined,
    // status_of_job:undefined
  },
  reducers: {
    jobListReducer: (state, action) => {
      state.value = action.payload;
    },
    saveJobByHr: (state, action) => {
      state.value = [...state.value,action.payload];
    },
    updateJobByHr:(state,action)  =>{
      state.job_to_update = action.payload;
    },
    changeStatusByHr:(state,action)  =>{
      state.value= action.payload;
    },
    jobListByCatId:(state,action)  =>{
      state.value= action.payload;
    }
  
  },
});
export const { jobListReducer,saveJobByHr,updateJobByHr,changeStatusByHr,jobListByCatId } = jobListSlice.actions;
export default jobListSlice.reducer;