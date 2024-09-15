import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from '../slices/Loading'; 
import userLoginReducer from '../slices/userLoggedInSlice';
const store = configureStore({
    reducer:{
        authSlice : loadingReducer,
        uLogin : userLoginReducer,
    }
});

export default store;