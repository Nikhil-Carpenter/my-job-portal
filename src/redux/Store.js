import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import HrSlice from "./HrSlice";
import CategoryListSlice from "./CategoryListSlice";
import UpdateHrSlice from "./UpdateHrSlice";
import JobListSlice from "./JobListSlice";
import CandidateListSlice from "./CandidateListSlice";
import AppliedJobSlice from "./AppliedJobSlice";

const store = configureStore({reducer:{
    authInfo: AuthSlice,
    hrList : HrSlice,
    categoryList:CategoryListSlice,
    hrUpdate:UpdateHrSlice,
    jobList:JobListSlice,
    candidateList:CandidateListSlice,
    AppliedJobInfo:AppliedJobSlice
}});

export default store;