import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'; // Import default
import userLoginReducer from '../slices/userLoggedInSlice';
const store = configureStore({
    reducer:{
        authSlice : authReducer,
        uLogin : userLoginReducer,
    }
});

export default store;