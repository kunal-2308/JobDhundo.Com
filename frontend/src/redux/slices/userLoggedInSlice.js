import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  status: localStorage.getItem("loginStatus") === "true" ? true : false,
};
export const userLoggedInSlice = createSlice({
  name: "uLogin",
  initialState,
  reducers: {
    updateLoginStatus: (state, action) => {
      state.status = action.payload;
      localStorage.setItem('loginStatus',state.status);
    },
    logoutUser : (state) =>{
        state.status = false;
        localStorage.removeItem('loginStatus');
    }
  },
});

export const { updateLoginStatus, logoutUser } = userLoggedInSlice.actions;
export default userLoggedInSlice.reducer;
