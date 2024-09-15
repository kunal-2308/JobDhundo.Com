import { createSlice } from "@reduxjs/toolkit";

let storedUser = localStorage.getItem("userDetails");
let initialState = {
  status: localStorage.getItem("loginStatus") === "true" ? true : false,
  user: storedUser ? JSON.parse(storedUser) : {}, 
};

export const userLoggedInSlice = createSlice({
  name: "uLogin",
  initialState,
  reducers: {
    updateLoginStatus: (state, action) => {
      state.status = action.payload;
      localStorage.setItem("loginStatus", action.payload);
    },
    updateUserDetails: (state, action) => {
      state.user = action.payload;
      // Store the user object in localStorage as a JSON string
      localStorage.setItem("userDetails", JSON.stringify(state.user));
    },
  },
});

export const { updateLoginStatus, updateUserDetails } = userLoggedInSlice.actions;
export default userLoggedInSlice.reducer;
