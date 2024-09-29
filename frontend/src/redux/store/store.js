import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from '../slices/Loading'; 
import userLoginReducer from '../slices/userLoggedInSlice';
import AppliedJobs from "../slices/AppliedJobs";

const store = configureStore({
    reducer:{
        authSlice : loadingReducer,
        uLogin : userLoginReducer,
        jobSlice: AppliedJobs,
    }
});

export default store;