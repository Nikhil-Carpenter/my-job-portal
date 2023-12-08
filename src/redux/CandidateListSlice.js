import { createSlice } from "@reduxjs/toolkit";

const CandidateListSlice = createSlice({
    name:"CandidateData",
    initialState:{
        value:[],
        profile:JSON.parse(localStorage.getItem("userProfile"))
    },
    reducers:{
        saveCandidateList:(state,actions)=>{
            var data = actions.payload;
            state.value = data;
        },
        saveCandidateData:(state,actions)=>{
            var data = actions.payload;
            state.profile = data
            localStorage.setItem('userProfile',JSON.stringify(data));

        }
    }
})

export const { saveCandidateList ,saveCandidateData} = CandidateListSlice.actions;
export default CandidateListSlice.reducer