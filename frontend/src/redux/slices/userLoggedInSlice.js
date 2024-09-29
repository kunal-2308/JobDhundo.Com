import { createSlice } from "@reduxjs/toolkit";

let storedUser = localStorage.getItem("userDetails");
let initialState = {
  status: localStorage.getItem("loginStatus") === "true",
  user: storedUser
    ? JSON.parse(storedUser)
    : {
        name: "",
        email: "",
        profile: {
          bio: "",
          skills: [],
        },
        phone: "",
      },
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
    
    clearUserDetails: (state) => {
      state.user = {
        name: "",
        email: "",
        profile: {
          bio: "",
          skills: [],
        },
        phone: "",
      }; // Reset to initial structure
      localStorage.removeItem("userDetails"); // Clear from localStorage
    },
  },
});


// Export actions
export const { updateLoginStatus, updateUserDetails, clearUserDetails } =
  userLoggedInSlice.actions;

// Export reducer
export default userLoggedInSlice.reducer;
