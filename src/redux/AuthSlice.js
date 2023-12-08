import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:JSON.parse(localStorage.getItem("userInfo"))|| { isLogin: false, token: undefined, username: undefined, type: undefined }
}


const AuthSlice = createSlice({
  name: "authInfo",
  initialState,
  reducers: {
    authReducer: (state, action) => {
      state.value = action.payload;
      localStorage.setItem('userInfo',JSON.stringify(action.payload));
    },
  },
});
export const { authReducer } = AuthSlice.actions;
export default AuthSlice.reducer;
